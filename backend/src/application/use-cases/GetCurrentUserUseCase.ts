import { StatusCodes } from 'http-status-codes';

import type { UserEntity } from '../../domain/entities/User';
import type { UserRepository } from '../../domain/repositories/UserRepository';
import { AppError } from '../../shared/errors/AppError';

export class GetCurrentUserUseCase {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Authenticated user no longer exists.', StatusCodes.UNAUTHORIZED, 'USER_NOT_FOUND');
    }

    return user;
  }
}