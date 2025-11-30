// src/server.js
const app = require('./app');

const PORT = process.env.PORT || 5600;

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please stop the other process or set PORT env var to a different port.`);
  }
  process.exit(1);
});
