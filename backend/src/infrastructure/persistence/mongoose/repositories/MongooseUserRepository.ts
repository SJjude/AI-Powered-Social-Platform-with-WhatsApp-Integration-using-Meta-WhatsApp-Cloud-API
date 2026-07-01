import type {
  CreateUserRepositoryInput,
  UserRepository,
} from '../../../../domain/repositories/UserRepository';
import type { UserEntity, UserWithPasswordEntity } from '../../../../domain/entities/User';
import { toUserEntity, toUserWithPasswordEntity } from '../mappers/userMapper';
import { UserModel } from '../models/UserModel';

export class MongooseUserRepository implements UserRepository {
  public async create(input: CreateUserRepositoryInput): Promise<UserEntity> {
    const user = await UserModel.create(input);

    return toUserEntity(user);
  }

  public async existsByEmail(email: string): Promise<boolean> {
    const user = await UserModel.exists({ email });

    return user !== null;
  }

  public async existsByUsername(username: string): Promise<boolean> {
    const user = await UserModel.exists({ username });

    return user !== null;
  }

  public async findByEmailOrUsernameWithPassword(
    identifier: string,
  ): Promise<UserWithPasswordEntity | null> {
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select('+password');

    return user ? toUserWithPasswordEntity(user) : null;
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const user = await UserModel.findById(id);

    return user ? toUserEntity(user) : null;
  }
}