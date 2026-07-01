import http from 'node:http';

import { createApp } from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './infrastructure/database/mongooseConnection';
import { logger } from './infrastructure/logging/logger';

const startServer = async (): Promise<void> => {
  await connectDatabase();

  const app = createApp();
  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    logger.info(`SocialConnect API listening on port ${env.PORT}`);
  });

  const shutdown = async (signal: NodeJS.Signals): Promise<void> => {
    logger.info(`${signal} received. Shutting down gracefully...`);

    server.close(async () => {
      await disconnectDatabase();
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer().catch((error: unknown) => {
  logger.error('Failed to start SocialConnect API.', { error });
  process.exit(1);
});
