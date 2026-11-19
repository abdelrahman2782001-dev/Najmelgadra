const { createServer } = require('node:http');
const { createReadStream, existsSync, statSync } = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.NAGM_PREVIEW_PORT || process.env.PORT || 4173);
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
};

const server = createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
  const filePath = path.resolve(root, relativePath);

  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403).end('Forbidden');
    return;
  }
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404).end('Not found');
    return;
  }

  response.writeHead(200, { 'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream' });
  createReadStream(filePath).pipe(response);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE' && !server.listening) {
    process.stdout.write(`Port ${port} is busy; choosing an available port.\n`);
    server.listen(0, '127.0.0.1');
    return;
  }
  process.stderr.write(`Preview server failed: ${error.message}\n`);
  process.exitCode = 1;
});

server.on('listening', () => {
  process.stdout.write(`NAGM local preview: http://127.0.0.1:${server.address().port}\n`);
});

server.listen(port, '127.0.0.1');
