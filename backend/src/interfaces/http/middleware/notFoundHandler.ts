import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '../../../shared/errors/AppError';

export const notFoundHandler = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  next(
    new AppError(
      `Route not found: ${request.method} ${request.originalUrl}`,
      StatusCodes.NOT_FOUND,
    ),
  );
};
