import type { Request } from 'express';

import type { VerifiedAccessTokenPayload } from '../../../application/services/TokenService';

export type AuthenticatedRequest = Request & {
  auth: VerifiedAccessTokenPayload;
};