import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { type Express } from 'express';
import helmet from 'helmet';

import { corsMiddleware } from './config/cors';
import { env } from './config/env';
import { errorHandler } from './interfaces/http/middleware/errorHandler';
import { notFoundHandler } from './interfaces/http/middleware/notFoundHandler';
import { requestLogger } from './interfaces/http/middleware/requestLogger';
import { createApiRouter } from './interfaces/http/routes';

export const createApp = (): Express => {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(corsMiddleware);
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(requestLogger);

  app.use(`/api/${env.API_VERSION}`, createApiRouter());

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
