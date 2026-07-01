import { z } from 'zod';

const usernameSchema = z
  .string()
  .trim()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username must be at most 30 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
  .transform((value) => value.toLowerCase());

const optionalTrimmedString = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .optional()
    .transform((value) => (value === '' ? undefined : value));

export const registerUserSchema = z.object({
  avatar: z.string().trim().url('Avatar must be a valid URL').optional().or(z.literal('').transform(() => undefined)),
  bio: optionalTrimmedString(280),
  email: z.string().trim().email('Email must be valid').transform((value) => value.toLowerCase()),
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  phoneNumber: optionalTrimmedString(30),
  username: usernameSchema,
});

export const loginUserSchema = z.object({
  identifier: z.string().trim().min(1, 'Email or username is required').transform((value) => value.toLowerCase()),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterUserRequestBody = z.infer<typeof registerUserSchema>;
export type LoginUserRequestBody = z.infer<typeof loginUserSchema>;