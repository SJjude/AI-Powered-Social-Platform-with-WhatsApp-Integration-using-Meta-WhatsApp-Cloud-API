export interface PasswordHasher {
  compare(plainTextPassword: string, passwordHash: string): Promise<boolean>;
  hash(plainTextPassword: string): Promise<string>;
}