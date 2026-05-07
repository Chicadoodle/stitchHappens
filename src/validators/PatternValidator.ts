import { z } from 'zod';

export const PatternSchema = z.object({
  title: z.string().min(1).max(50),
  instructions: z.string().min(10),
  skillLevel: z.enum(['beginner', 'intermediate', 'pro']),
  skiensNeeded: z.number().positive(),
  yarnSize: z.number().positive(),
  crochetOrKnit: z.enum(['crochet', 'knit']),
});
