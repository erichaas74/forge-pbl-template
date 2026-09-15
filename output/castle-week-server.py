"""Loopback-only SPA server for this task's full production verification build."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, unquote

root = (Path(__file__).parent / 'castle-week-production-build' / 'browser').resolve()
assert (root / 'index.html').is_file(), 'Build the Castle preview first'

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(root), **kwargs)
    def do_GET(self):
        target = (root / unquote(urlsplit(self.path).path).lstrip('/')).resolve()
        if not target.is_relative_to(root):
            self.send_error(403)
            return
        if not target.is_file() and not target.suffix:
            self.path = '/index.html'
        super().do_GET()

server = ThreadingHTTPServer(('127.0.0.1', 52102), Handler)
print(f'Castle verification: http://127.0.0.1:{server.server_port}/projects/castle-archive-rescue/experience?lesson=1', flush=True)
server.serve_forever()
