const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0'; // Changed from 'localhost' for cPanel compatibility
const port = parseInt(process.env.PORT, 10) || 3000;

// Initialize Next.js
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = parse(req.url, true);

      // Handle the request
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`> Server ready on http://${hostname}:${port}`);
    console.log(`> Press Ctrl+C to stop`);
  });
}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});