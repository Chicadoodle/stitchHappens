import { z } from 'zod';

export const RegisterUserSchema = z.object({
  email: z.string().email(), // ✔ correct
  userName: z.string().min(3).max(25),
  password: z.string().min(8).max(64),
});

export const LoginSchema = z.object({
  email: z.string().email(), // ✔ FIXED typo here
  password: z.string().min(8).max(64),
});
