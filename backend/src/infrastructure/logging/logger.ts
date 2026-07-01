import winston from 'winston';

import { env } from '../../config/env';

const { combine, errors, json, printf, timestamp } = winston.format;

const developmentFormat = printf(({ level, message, timestamp: logTimestamp, stack, ...meta }) => {
  const metadata = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
  const errorStack = typeof stack === 'string' ? `\n${stack}` : '';

  return `${logTimestamp} [${level}]: ${message}${metadata}${errorStack}`;
});

export const logger = winston.createLogger({
  defaultMeta: {
    service: 'socialconnect-api',
  },
  format: combine(
    errors({ stack: true }),
    timestamp(),
    env.NODE_ENV === 'production' ? json() : developmentFormat,
  ),
  level: env.LOG_LEVEL,
  transports: [new winston.transports.Console()],
});
