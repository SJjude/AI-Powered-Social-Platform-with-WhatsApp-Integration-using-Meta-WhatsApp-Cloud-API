import { StatusCodes } from 'http-status-codes';

import type { UserEntity } from '../../domain/entities/User';
import type { UserRepository } from '../../domain/repositories/UserRepository';
import { AppError } from '../../shared/errors/AppError';
import type { PasswordHasher } from '../services/PasswordHasher';
import type { TokenService } from '../services/TokenService';

export type RegisterUserInput = {
  avatar?: string;
  bio?: string;
  email: string;
  name: string;
  password: string;
  phoneNumber?: string;
  username: string;
};

export type AuthenticatedUserResult = {
  accessToken: string;
  user: UserEntity;
};

export class RegisterUserUseCase {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService,
  ) {}

  public async execute(input: RegisterUserInput): Promise<AuthenticatedUserResult> {
    const email = input.email.trim().toLowerCase();
    const username = input.username.trim().toLowerCase();

    const [emailExists, usernameExists] = await Promise.all([
      this.userRepository.existsByEmail(email),
      this.userRepository.existsByUsername(username),
    ]);

    if (emailExists) {
      throw new AppError('Email is already registered.', StatusCodes.CONFLICT, 'EMAIL_ALREADY_EXISTS');
    }

    if (usernameExists) {
      throw new AppError('Username is already taken.', StatusCodes.CONFLICT, 'USERNAME_ALREADY_EXISTS');
    }

    const password = await this.passwordHasher.hash(input.password);
    const user = await this.userRepository.create({
      avatar: input.avatar,
      bio: input.bio,
      email,
      name: input.name.trim(),
      password,
      phoneNumber: input.phoneNumber,
      username,
    });

    const accessToken = this.tokenService.signAccessToken({
      email: user.email,
      userId: user.id,
      username: user.username,
    });

    return { accessToken, user };
  }
}