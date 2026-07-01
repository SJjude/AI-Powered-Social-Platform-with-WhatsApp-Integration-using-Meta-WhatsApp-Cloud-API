export type AccessTokenPayload = {
  email: string;
  userId: string;
  username: string;
};

export type VerifiedAccessTokenPayload = AccessTokenPayload & {
  expiresAt?: number;
  issuedAt?: number;
};

export interface TokenService {
  signAccessToken(payload: AccessTokenPayload): string;
  verifyAccessToken(token: string): VerifiedAccessTokenPayload;
}