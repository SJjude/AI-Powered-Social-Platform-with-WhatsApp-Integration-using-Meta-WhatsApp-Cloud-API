import type { UserEntity, UserWithPasswordEntity } from '../../../../domain/entities/User';
import type { UserDocument } from '../models/UserModel';

export const toUserEntity = (document: UserDocument): UserEntity => ({
  avatar: document.avatar,
  bio: document.bio,
  createdAt: document.createdAt,
  email: document.email,
  followers: document.followers.map((followerId) => followerId.toString()),
  following: document.following.map((followingId) => followingId.toString()),
  id: document.id,
  name: document.name,
  phoneNumber: document.phoneNumber,
  username: document.username,
});

export const toUserWithPasswordEntity = (document: UserDocument): UserWithPasswordEntity => ({
  ...toUserEntity(document),
  password: document.password,
});