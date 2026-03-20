import { z } from 'zod';

export const uploadPatternSchema = z.object({
  patternTitle: z
    .string()
    .min(1, 'Title is Required')
    .max(30, 'Title must be 30 characters or less'),
  skillLevel: z.enum('beginner', 'intermediate', 'pro'),
  //im not sure what type of validators i need
  //or constraints for originalName->path
  originalName: z.string(),
  filename: z.string(),
  mimetype: z.number().nonnegative(),
  path: z.string(),
  skiensNeeded: z.number().positive(),
  yarnSize: z.number().positive(),
  crochetOrKnit: z.enum('crochet', 'knit'),
});
