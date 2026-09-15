// Local-only static preview of this task's production build, with video range support.
// Run from the repository root after building to output/shadow-coastal-build.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('output/shadow-coastal-build/browser');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.webm': 'video/webm', '.vtt': 'text/vtt', '.m4a': 'audio/mp4', '.woff2': 'font/woff2' };
http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname); } catch { res.writeHead(400).end(); return; }
  let file = path.resolve(root, '.' + pathname);
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (!path.extname(file) || file === root) file = path.join(root, 'index.html');
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end('Preview asset is not available yet.'); return; }
  const size = fs.statSync(file).size, range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  const start = range ? Number(range[1]) : 0, end = range?.[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
  if (start > end || start >= size) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }).end(); return; }
  res.writeHead(range ? 206 : 200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream', 'Content-Length': end - start + 1, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store', ...(range ? { 'Content-Range': `bytes ${start}-${end}/${size}` } : {}) });
  if (req.method === 'HEAD') { res.end(); return; }
  const stream = fs.createReadStream(file, { start, end }); stream.on('error', () => res.destroy()); stream.pipe(res); res.on('close', () => stream.destroy());
}).listen(4369, '127.0.0.1', () => console.log('Restoration preview: http://127.0.0.1:4369/projects/shadow-gallery/experience?lesson=1'));
