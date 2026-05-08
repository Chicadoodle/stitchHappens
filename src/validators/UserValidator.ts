import { z } from 'zod';

export const RegisterUserSchema = z.object({
  email: z.string().email(),
  userName: z.string().min(3).max(25),
  password: z.string().min(8).max(64),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(64),
});
