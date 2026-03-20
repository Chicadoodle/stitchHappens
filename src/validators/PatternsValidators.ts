import { z } from 'zod';

export const uploadPatternSchema = z.object({
  title: z.string().min(1, 'Title is Required').max(30, 'Title must be 30 characters or less'),
  skillLevel: z.enum(['beginner', 'intermediate', 'pro']),
  //im not sure what type of validators i need
  //or constraints for originalName->path
  originalName: z.string(),
  filename: z.string(),
  mimetype: z.string(),
  size: z.string().transform(Number),
  path: z.string(),
  createdAt: z.string().transform(Date),
  skiensNeeded: z.number().positive(),
  yarnSize: z.number().positive(),
  crochetOrKnit: z.enum(['crochet', 'knit']),
});
