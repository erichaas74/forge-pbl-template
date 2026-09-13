import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const appMode = process.argv.includes('--app');
const port = appMode ? 4203 : 4202;
const root = resolve(import.meta.dirname, appMode ? '../dist/forge-pbl-template/browser' : '../dist/time-repair-preview/browser');
const types = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};
createServer(async (request, response) => {
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405);
      response.end();
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
    let target = resolve(root, `.${pathname}`);
    if (target !== root && !target.startsWith(root + sep)) {
      response.writeHead(403);
      response.end();
      return;
    }
    try {
      if (!(await stat(target)).isFile()) target = resolve(root, 'index.html');
    } catch {
      if (extname(pathname)) {
        response.writeHead(404);
        response.end();
        return;
      }
      target = resolve(root, 'index.html');
    }
    const content = await readFile(target);
    response.writeHead(200, {
      'Content-Type': types[extname(target)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch {
    response.writeHead(500);
    response.end('Build the Time Repair preview first.');
  }
}).listen(port, '127.0.0.1', () =>
  console.log(`Time Repair preview: http://127.0.0.1:${port}/projects/exploration-time-repair`),
);
