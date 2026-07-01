import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

import { env } from '../../../config/env';
import { logger } from '../../../infrastructure/logging/logger';
import { AppError } from '../../../shared/errors/AppError';

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  void _next;

  if (error instanceof ZodError) {
    response.status(StatusCodes.BAD_REQUEST).json({
      error: {
        code: 'VALIDATION_ERROR',
        details: error.flatten().fieldErrors,
        message: 'Validation failed.',
      },
    });
    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
      },
    });
    return;
  }

  logger.error('Unhandled application error.', { error });

  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message:
        env.NODE_ENV === 'production'
          ? 'An unexpected error occurred.'
          : error instanceof Error
            ? error.message
            : 'Unknown error',
    },
  });
};
