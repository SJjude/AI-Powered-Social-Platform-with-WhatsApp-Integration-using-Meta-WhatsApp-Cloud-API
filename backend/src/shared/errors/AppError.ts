import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  public readonly code: string;

  public readonly isOperational = true;

  public readonly statusCode: number;

  public constructor(
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    code = 'APPLICATION_ERROR',
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
