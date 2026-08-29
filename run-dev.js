const { spawn } = require('child_process');
const path = require('path');

const binPath = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');
const port = process.env.PORT || '3005';

console.log('Starting Next.js dev server on port ' + port + '...');

const child = spawn(process.execPath, [binPath, 'dev', '-H', '0.0.0.0', '-p', port], {
  stdio: 'inherit',
  cwd: __dirname,
  env: {
    ...process.env,
    WATCHPACK_POLLING: 'true',
    CHOKIDAR_USEPOLLING: 'true',
  },
});

child.on('exit', (code, signal) => {
  console.log(`Next.js process exited with code ${code}, signal: ${signal}`);
  // If it exited prematurely, restart or log
});

process.on('SIGINT', () => {
  child.kill('SIGINT');
  process.exit(0);
});

// Keep parent loop active
setInterval(() => {}, 1000 * 60 * 60);
