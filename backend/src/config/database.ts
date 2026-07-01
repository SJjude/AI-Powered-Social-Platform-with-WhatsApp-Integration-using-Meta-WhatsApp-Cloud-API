import { env } from './env';

export const databaseConfig = {
  options: {
    autoIndex: env.NODE_ENV !== 'production',
  },
  uri: env.MONGODB_URI,
} as const;
