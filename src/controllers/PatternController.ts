import { Request, Response } from 'express';
import {
  addPattern,
  deletePattern,
  getAllPatterns,
  getPatternById,
  searchPatterns,
  updatePattern,
} from '../models/PatternModel.js';
import { getUserById } from '../models/UserModel.js';
import { PatternSchema } from '../validators/PatternValidator.js';

export async function getPatterns(req: Request, res: Response): Promise<void> {
  const patterns = await getAllPatterns();
  res.json(patterns);
}

export async function createPattern(req: Request, res: Response): Promise<void> {
  const userId = req.session.authenticatedUser?.userId;
  if (!userId) {
    res.sendStatus(401);
    return;
  }

  const parsed = PatternSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.format());
    return;
  }

  const user = await getUserById(userId);
  if (!user) {
    res.sendStatus(404);
    return;
  }

  const pattern = await addPattern(parsed.data, user);
  res.status(201).json(pattern);
}

export async function getPattern(req: Request, res: Response): Promise<void> {
  const patternId = req.params.patternId as string;
  const pattern = await getPatternById(patternId);

  if (!pattern) {
    res.sendStatus(404);
    return;
  }

  res.json(pattern);
}

export async function updatePatternController(req: Request, res: Response): Promise<void> {
  const userId = req.session.authenticatedUser?.userId;
  if (!userId) {
    res.sendStatus(401);
    return;
  }

  const patternId = req.params.patternId as string;
  const pattern = await getPatternById(patternId);

  if (!pattern) {
    res.sendStatus(404);
    return;
  }

  if (pattern.createdBy.userId !== userId) {
    res.sendStatus(403);
    return;
  }

  const updated = await updatePattern(pattern, req.body);
  res.json(updated);
}

export async function deletePatternController(req: Request, res: Response): Promise<void> {
  const userId = req.session.authenticatedUser?.userId;
  if (!userId) {
    res.sendStatus(401);
    return;
  }

  const patternId = req.params.patternId as string;
  const pattern = await getPatternById(patternId);

  if (!pattern) {
    res.sendStatus(404);
    return;
  }

  if (pattern.createdBy.userId !== userId) {
    res.sendStatus(403);
    return;
  }

  await deletePattern(pattern);
  res.sendStatus(204);
}

export async function searchPatternsController(req: Request, res: Response): Promise<void> {
  const q = (req.query.q as string) || '';

  if (!q.trim()) {
    res.status(400).json({ error: "Query 'q' required" });
    return;
  }

  const results = await searchPatterns(q);
  res.json(results);
}
