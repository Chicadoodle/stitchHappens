import { z } from 'zod';

export const PatternSchema = z.object({
  title: z.string().min(1).max(50),
  instructions: z.string().min(10),
  skillLevel: z.enum(['beginner', 'intermediate', 'pro']),
  skiensNeeded: z.coerce.number().positive(),
  yarnSize: z.coerce.number().positive(),
  crochetOrKnit: z.enum(['crochet', 'knit']),
});
