import bcrypt from 'bcrypt';

import type { PasswordHasher } from '../../application/services/PasswordHasher';

const SALT_ROUNDS = 12;

export class BcryptPasswordHasher implements PasswordHasher {
  public async compare(plainTextPassword: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, passwordHash);
  }

  public async hash(plainTextPassword: string): Promise<string> {
    return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
  }
}