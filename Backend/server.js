const app = require('./app');
const PORT = 3001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server errors (e.g., port already in use)
server.on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});

// Handle uncaught exceptions to prevent silent crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});