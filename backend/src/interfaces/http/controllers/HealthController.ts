import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { env } from '../../../config/env';

export class HealthController {
  public check(_request: Request, response: Response): void {
    response.status(StatusCodes.OK).json({
      data: {
        environment: env.NODE_ENV,
        service: 'socialconnect-api',
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: env.API_VERSION,
      },
    });
  }
}
