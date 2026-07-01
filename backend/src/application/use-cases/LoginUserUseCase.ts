import { StatusCodes } from 'http-status-codes';

import type { UserEntity } from '../../domain/entities/User';
import type { UserRepository } from '../../domain/repositories/UserRepository';
import { AppError } from '../../shared/errors/AppError';
import type { PasswordHasher } from '../services/PasswordHasher';
import type { TokenService } from '../services/TokenService';

export type LoginUserInput = {
  identifier: string;
  password: string;
};

export type LoginUserResult = {
  accessToken: string;
  user: UserEntity;
};

export class LoginUserUseCase {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService,
  ) {}

  public async execute(input: LoginUserInput): Promise<LoginUserResult> {
    const user = await this.userRepository.findByEmailOrUsernameWithPassword(
      input.identifier.trim().toLowerCase(),
    );

    if (!user) {
      throw new AppError('Invalid email/username or password.', StatusCodes.UNAUTHORIZED, 'INVALID_CREDENTIALS');
    }

    const passwordMatches = await this.passwordHasher.compare(input.password, user.password);

    if (!passwordMatches) {
      throw new AppError('Invalid email/username or password.', StatusCodes.UNAUTHORIZED, 'INVALID_CREDENTIALS');
    }

    const { password: _password, ...safeUser } = user;
    void _password;

    const accessToken = this.tokenService.signAccessToken({
      email: safeUser.email,
      userId: safeUser.id,
      username: safeUser.username,
    });

    return { accessToken, user: safeUser };
  }
}