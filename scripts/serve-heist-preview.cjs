const fs = require('node:fs');
const path = require('node:path');
const { createServer } = require('node:http');

async function serveGalleryBuild(port = 4300) {
  const root = process.env.HEIST_PREVIEW_ROOT ? path.resolve(process.env.HEIST_PREVIEW_ROOT) : path.resolve(__dirname, '../../output/heist-review-build/browser');
  if (!fs.existsSync(path.join(root, 'index.html'))) throw new Error('Build first: npm run build -- --output-path=../output/heist-review-build');
  const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.m4a': 'audio/mp4' };
  const server = createServer((req, res) => {
    let requested;
    try { requested = path.resolve(root, '.' + decodeURIComponent((req.url || '/').split('?')[0])); }
    catch { res.writeHead(400).end(); return; }
    if (requested !== root && !requested.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    const file = fs.existsSync(requested) && fs.statSync(requested).isFile() ? requested : path.join(root, 'index.html');
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(port, '127.0.0.1', resolve); });
  return server;
}
module.exports = serveGalleryBuild;
if (require.main === module) serveGalleryBuild().then(server => console.log(`Shadow Gallery preview: http://127.0.0.1:${server.address().port}/projects/shadow-gallery`)).catch(error => { console.error(error.message); process.exitCode = 1; });
