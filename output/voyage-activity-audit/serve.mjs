import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(import.meta.dirname, process.argv[2] ?? 'full-build/browser');
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.webm': 'video/webm', '.vtt': 'text/vtt' };
createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    if (pathname === '/mobile.html') {
      const lesson = Math.max(1, Math.min(8, Number(url.searchParams.get('lesson')) || 1));
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(`<!doctype html><title>Voyage audit · 390 × 844</title><body style="margin:0;background:#888"><iframe title="Voyage at 390 × 844" src="/projects/race-around-the-world/lessons?lesson=${lesson}" style="width:390px;height:844px;border:0"></iframe></body>`);
      return;
    }
    let target = resolve(root, '.' + pathname);
    if (target !== root && !target.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    try { if (!(await stat(target)).isFile()) target = resolve(root, 'index.html'); }
    catch { if (extname(pathname)) { response.writeHead(404).end(); return; } target = resolve(root, 'index.html'); }
    response.writeHead(200, { 'Content-Type': types[extname(target)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(await readFile(target));
  } catch { response.writeHead(500).end('Preview unavailable'); }
}).listen(4319, '127.0.0.1', () => console.log('Voyage audit: http://127.0.0.1:4319/projects/race-around-the-world/lessons?lesson=1'));
