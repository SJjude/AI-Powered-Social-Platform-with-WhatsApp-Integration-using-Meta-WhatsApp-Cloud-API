import type { UserEntity, UserWithPasswordEntity } from '../entities/User';

export type CreateUserRepositoryInput = {
  avatar?: string;
  bio?: string;
  email: string;
  name: string;
  password: string;
  phoneNumber?: string;
  username: string;
};

export interface UserRepository {
  create(input: CreateUserRepositoryInput): Promise<UserEntity>;
  existsByEmail(email: string): Promise<boolean>;
  existsByUsername(username: string): Promise<boolean>;
  findByEmailOrUsernameWithPassword(identifier: string): Promise<UserWithPasswordEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
}