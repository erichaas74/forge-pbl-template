const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../dist/forge-pbl-template/browser');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4', '.woff2': 'font/woff2' };
http.createServer((request, response) => {
  const requested = path.resolve(root, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
  if (requested !== root && !requested.startsWith(root + path.sep)) {
    response.writeHead(403).end();
    return;
  }
  const file = fs.existsSync(requested) && fs.statSync(requested).isFile()
    ? requested : !path.extname(requested) ? path.join(root, 'index.html') : null;
  if (!file) { response.writeHead(404).end(); return; }
  response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(response);
}).listen(4217, '127.0.0.1', () => console.log('Production preview: http://127.0.0.1:4217'));
