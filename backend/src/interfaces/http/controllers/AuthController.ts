import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { GetCurrentUserUseCase } from '../../../application/use-cases/GetCurrentUserUseCase';
import type { LoginUserUseCase } from '../../../application/use-cases/LoginUserUseCase';
import type { RegisterUserUseCase } from '../../../application/use-cases/RegisterUserUseCase';
import { env } from '../../../config/env';
import type { AuthenticatedRequest } from '../types/authenticatedRequest';
import { loginUserSchema, registerUserSchema } from '../validators/authValidators';

const ACCESS_TOKEN_COOKIE_MAX_AGE_MS = 15 * 60 * 1000;

export class AuthController {
  public constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
  ) {}

  public async register(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const input = registerUserSchema.parse(request.body);
      const result = await this.registerUserUseCase.execute(input);

      this.setAccessTokenCookie(response, result.accessToken);

      response.status(StatusCodes.CREATED).json({
        data: {
          user: result.user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async login(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const input = loginUserSchema.parse(request.body);
      const result = await this.loginUserUseCase.execute(input);

      this.setAccessTokenCookie(response, result.accessToken);

      response.status(StatusCodes.OK).json({
        data: {
          user: result.user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async me(request: AuthenticatedRequest, response: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.getCurrentUserUseCase.execute(request.auth.userId);

      response.status(StatusCodes.OK).json({
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  private setAccessTokenCookie(response: Response, accessToken: string): void {
    response.cookie(env.JWT_COOKIE_NAME, accessToken, {
      httpOnly: true,
      maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE_MS,
      sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: env.JWT_COOKIE_SECURE,
    });
  }
}