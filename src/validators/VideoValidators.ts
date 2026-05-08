import { z } from 'zod';

export const videoSchema = z.object({
  title: z.string().min(1).max(30),
  videoUrl: z.string().url(),
  skillLevel: z.enum(['beginner', 'intermediate', 'pro']),
  skiensNeeded: z.coerce.number().positive(),
  yarnSize: z.coerce.number().positive(),
  crochetOrKnit: z.enum(['crochet', 'knit']),
});
