import mongoose from 'mongoose';

import { databaseConfig } from '../../config/database';
import { logger } from '../logging/logger';

export const connectDatabase = async (): Promise<void> => {
  mongoose.connection.on('connected', () => {
    logger.info('MongoDB connection established.');
  });

  mongoose.connection.on('error', (error) => {
    logger.error('MongoDB connection error.', { error });
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB connection disconnected.');
  });

  await mongoose.connect(databaseConfig.uri, databaseConfig.options);
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};
