export type UserEntity = {
  avatar?: string;
  bio?: string;
  createdAt: Date;
  email: string;
  followers: string[];
  following: string[];
  id: string;
  name: string;
  phoneNumber?: string;
  username: string;
};

export type UserWithPasswordEntity = UserEntity & {
  password: string;
};