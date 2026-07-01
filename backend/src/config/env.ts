import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  API_VERSION: z.string().default('v1'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
  JWT_COOKIE_NAME: z.string().default('socialconnect_access_token'),
  JWT_COOKIE_SECURE: z.coerce.boolean().default(false),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'debug']).default('info'),
  MONGODB_URI: z
    .string()
    .startsWith('mongodb://', 'MONGODB_URI must start with mongodb:// or mongodb+srv://')
    .or(z.string().startsWith('mongodb+srv://')),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const formattedErrors = parsedEnv.error.flatten().fieldErrors;

  console.error('Invalid backend environment configuration:', formattedErrors);
  process.exit(1);
}

const toAllowedOrigins = (originList: string): string[] =>
  originList
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

export const env = {
  ...parsedEnv.data,
  CORS_ORIGINS: toAllowedOrigins(parsedEnv.data.CORS_ORIGIN),
} as const;

export type Environment = typeof env;
