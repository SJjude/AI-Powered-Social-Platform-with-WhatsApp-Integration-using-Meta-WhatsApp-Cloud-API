import { Router } from 'express';

import { createAuthRouter } from './authRoutes';
import { createHealthRouter } from './healthRoutes';

export const createApiRouter = (): Router => {
  const router = Router();

  router.use('/auth', createAuthRouter());
  router.use('/health', createHealthRouter());

  return router;
};
