import { Router } from 'express';

import { GetCurrentUserUseCase } from '../../../application/use-cases/GetCurrentUserUseCase';
import { LoginUserUseCase } from '../../../application/use-cases/LoginUserUseCase';
import { RegisterUserUseCase } from '../../../application/use-cases/RegisterUserUseCase';
import { MongooseUserRepository } from '../../../infrastructure/persistence/mongoose/repositories/MongooseUserRepository';
import { BcryptPasswordHasher } from '../../../infrastructure/security/BcryptPasswordHasher';
import { JwtTokenService } from '../../../infrastructure/security/JwtTokenService';
import { AuthController } from '../controllers/AuthController';
import { createAuthenticateMiddleware } from '../middleware/authenticate';

export const createAuthRouter = (): Router => {
  const router = Router();

  const userRepository = new MongooseUserRepository();
  const passwordHasher = new BcryptPasswordHasher();
  const tokenService = new JwtTokenService();

  const authController = new AuthController(
    new RegisterUserUseCase(userRepository, passwordHasher, tokenService),
    new LoginUserUseCase(userRepository, passwordHasher, tokenService),
    new GetCurrentUserUseCase(userRepository),
  );
  const authenticate = createAuthenticateMiddleware(tokenService);

  router.post('/register', authController.register.bind(authController));
  router.post('/login', authController.login.bind(authController));
  router.get('/me', authenticate, authController.me.bind(authController));

  return router;
};