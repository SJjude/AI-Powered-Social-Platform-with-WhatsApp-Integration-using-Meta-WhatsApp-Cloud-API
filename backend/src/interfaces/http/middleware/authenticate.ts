import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { TokenService } from '../../../application/services/TokenService';
import { env } from '../../../config/env';
import { AppError } from '../../../shared/errors/AppError';

export const createAuthenticateMiddleware = (tokenService: TokenService) => {
  return (request: Request, _response: Response, next: NextFunction): void => {
    const cookieToken = request.cookies?.[env.JWT_COOKIE_NAME];
    const headerValue = request.headers.authorization;
    const bearerToken = headerValue?.startsWith('Bearer ') ? headerValue.slice('Bearer '.length) : undefined;
    const token = typeof cookieToken === 'string' ? cookieToken : bearerToken;

    if (!token) {
      next(new AppError('Authentication is required.', StatusCodes.UNAUTHORIZED, 'AUTHENTICATION_REQUIRED'));
      return;
    }

    const auth = tokenService.verifyAccessToken(token);
    Object.assign(request, { auth });

    next();
  };
};