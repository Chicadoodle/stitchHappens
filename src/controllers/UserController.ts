import argon2 from 'argon2';
import { Request, Response } from 'express';
import {
  addFavoritePattern,
  addFavoriteVideo,
  addUser,
  getUserByEmail,
  getUserById,
  removeFavoritePattern,
  removeFavoriteVideo,
} from '../models/UserModel.js';
import { LoginSchema, RegisterUserSchema } from '../validators/UserValidator.js';

export async function registerUser(req: Request, res: Response): Promise<void> {
  const parsed = RegisterUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.format());
    return;
  }

  const { email, password, userName } = parsed.data;

  try {
    const hash = await argon2.hash(password);
    await addUser(email, hash, userName);
    res.sendStatus(201);
  } catch {
    res.status(500).json({ error: 'Database error' });
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.format());
    return;
  }

  const { email, password } = parsed.data;

  const user = await getUserByEmail(email);
  if (!user) {
    res.sendStatus(403);
    return;
  }

  const valid = await argon2.verify(user.passwordHash, password);
  if (!valid) {
    res.sendStatus(403);
    return;
  }

  req.session.authenticatedUser = {
    userId: user.userId,
    email: user.email,
    displayName: user.userName,
  };
  req.session.isLoggedIn = true;

  res.sendStatus(200);
}

export async function logoutUser(req: Request, res: Response): Promise<void> {
  await req.session.clearSession();
  res.sendStatus(204);
}

export async function getMe(req: Request, res: Response): Promise<void> {
  if (!req.session.isLoggedIn) {
    res.sendStatus(401);
    return;
  }
  const userId = req.session.authenticatedUser?.userId;

  if (!userId) {
    res.sendStatus(401);
    return;
  }

  const user = await getUserById(userId);

  if (!user) {
    res.sendStatus(404);
    return;
  }

  res.json(user);
}

export async function favoriteVideo(req: Request, res: Response): Promise<void> {
  const userId = req.session.authenticatedUser?.userId;
  if (!userId) {
    res.sendStatus(401);
    return;
  }

  const videoId = req.params.videoId as string;
  await addFavoriteVideo(userId, videoId);

  res.sendStatus(200);
}

export async function unfavoriteVideo(req: Request, res: Response): Promise<void> {
  const userId = req.session.authenticatedUser?.userId;
  if (!userId) {
    res.sendStatus(401);
    return;
  }

  const videoId = req.params.videoId as string;
  await removeFavoriteVideo(userId, videoId);

  res.sendStatus(200);
}

export async function favoritePattern(req: Request, res: Response): Promise<void> {
  const userId = req.session.authenticatedUser?.userId;
  if (!userId) {
    res.sendStatus(401);
    return;
  }

  const patternId = req.params.patternId as string;
  await addFavoritePattern(userId, patternId);

  res.sendStatus(200);
}

export async function unfavoritePattern(req: Request, res: Response): Promise<void> {
  const userId = req.session.authenticatedUser?.userId;
  if (!userId) {
    res.sendStatus(401);
    return;
  }

  const patternId = req.params.patternId as string;
  await removeFavoritePattern(userId, patternId);

  res.sendStatus(200);
}
