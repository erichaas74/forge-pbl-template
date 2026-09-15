import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve(import.meta.dirname, 'build/browser');
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4' };
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
    if (pathname === '/mobile.html') {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end('<!doctype html><title>390 × 844 debate audit</title><body style="margin:0;background:#888"><iframe title="390 pixel debate viewport" src="/projects/the-fate-of-the-republic/lessons?lesson=8" style="width:390px;height:844px;border:0"></iframe></body>');
      return;
    }
    let target = resolve(root, '.' + pathname);
    if (target !== root && !target.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    try { if (!(await stat(target)).isFile()) target = resolve(root, 'index.html'); }
    catch { if (extname(pathname)) { response.writeHead(404).end(); return; } target = resolve(root, 'index.html'); }
    response.writeHead(200, { 'Content-Type': types[extname(target)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(await readFile(target));
  } catch { response.writeHead(500).end('Preview unavailable'); }
}).listen(4317, '127.0.0.1', () => console.log('Debate audit preview: http://127.0.0.1:4317/projects/the-fate-of-the-republic/lessons?lesson=1'));
