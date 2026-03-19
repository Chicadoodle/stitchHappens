import { z } from 'zod';
import { Users } from 'models/UserModel.js';
import { argon2 } from 'argon2';

export const CreateNewUser = z.object({
  email: z.string().email(),
  userName: z.string().max(25).min(3),
  password: z.string().min(8).max(64),
});

export type CreateNewUser =z.infer<typeof CreateNewUser>;

export const LogIn = z.object({
  email: z.string().email(),
  userName: z.string().max(25).min(3).optional, // zod .refine() make on or the other optional?
  password: z.string().min(8).max(64),

})

export type logIn =z.infer<typeof Login>;

export const GetUserByEmail = z.object({
  email: z.string().email(),

})

export type GetUserByEmail =z.infer<typeof GetUserByEmail>;