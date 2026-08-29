const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT || '3005', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname: '0.0.0.0', port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(port, '0.0.0.0', (err) => {
    if (err) throw err;
    console.log('\n======================================================');
    console.log('🚀 SHREE RENUKA BOOKSTORE & STATIONERY IS LIVE!');
    console.log(`📍 Local:   http://localhost:${port}`);
    console.log(`📍 Network: http://127.0.0.1:${port}`);
    console.log(`📍 Admin:   http://localhost:${port}/admin (PIN: admin123)`);
    console.log('======================================================\n');
  });
}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
