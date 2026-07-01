import { StatusCodes } from 'http-status-codes';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { z } from 'zod';

import type {
  AccessTokenPayload,
  TokenService,
  VerifiedAccessTokenPayload,
} from '../../application/services/TokenService';
import { env } from '../../config/env';
import { AppError } from '../../shared/errors/AppError';

const verifiedPayloadSchema = z.object({
  email: z.string().email(),
  exp: z.number().optional(),
  iat: z.number().optional(),
  sub: z.string().min(1),
  username: z.string().min(1),
});

export class JwtTokenService implements TokenService {
  public signAccessToken(payload: AccessTokenPayload): string {
    const options: SignOptions = {
      expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions['expiresIn'],
      subject: payload.userId,
    };

    return jwt.sign(
      {
        email: payload.email,
        username: payload.username,
      },
      env.JWT_ACCESS_SECRET,
      options,
    );
  }

  public verifyAccessToken(token: string): VerifiedAccessTokenPayload {
    try {
      const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
      const payload = verifiedPayloadSchema.parse(decoded);

      return {
        email: payload.email,
        expiresAt: payload.exp,
        issuedAt: payload.iat,
        userId: payload.sub,
        username: payload.username,
      };
    } catch {
      throw new AppError('Invalid or expired authentication token.', StatusCodes.UNAUTHORIZED, 'INVALID_TOKEN');
    }
  }
}