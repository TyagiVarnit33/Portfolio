import { createApp } from './app.js';
import { initDb } from './db/index.js';
import { config } from './config.js';

async function startServer() {
  await initDb();

  const app = createApp();

  app.listen(config.port, () => {
    console.log(`🚀 Varnit Tyagi Portfolio API server running on port ${config.port} (${config.env})`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup failure:', err);
  process.exit(1);
});
