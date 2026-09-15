import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(import.meta.dirname, process.argv[2] ?? '../output/time-repair-week-build/browser');
const port = Number(process.argv[3] ?? 4324);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid preview port');
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
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
};
createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405).end();
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
    let target = resolve(root, `.${pathname}`);
    if (target !== root && !target.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    try {
      if (!(await stat(target)).isFile()) target = resolve(root, 'index.html');
    } catch {
      if (extname(pathname)) {
        response.writeHead(404).end();
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
    response.writeHead(500).end('Build the Time Repair weekly preview first.');
  }
}).listen(port, '127.0.0.1', () =>
  console.log(
    `Time Repair: http://127.0.0.1:${port}/projects/exploration-time-repair/lessons?lesson=1`,
  ),
);
