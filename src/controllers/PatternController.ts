import { Request, Response } from 'express';
import { addPattern, getAllPatterns } from '../models/PatternModel.js';
import { uploadPatternSchema } from '../validators/PatternsValidators.js';

export async function getPatterns(req: Request, res: Response): Promise<void> {
  const patterns = await getAllPatterns();
  res.json({ patterns });
}

export async function uploadPattern(req: Request, res: Response): Promise<void> {
  const result = uploadPatternSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: result.error });
    return;
  }
  const {
    title,
    skillLevel,
    skiensNeeded,
    yarnSize,
    originalName,
    filename,
    mimetype,
    size,
    path,
    crochetOrKnit,
    createdAt,
  } = result.data;
  const newPattern = await addPattern(
    title,
    skillLevel,
    skiensNeeded,
    yarnSize,
    originalName,
    filename,
    mimetype,
    size,
    path,
    crochetOrKnit,
    createdAt,
  );

  res.status(201).json({ newPattern });
}
