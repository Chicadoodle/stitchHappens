import { AppDataSource } from '../dataSource.js';
import { Pattern } from '../entities/Patterns.js';

const patternRepository = AppDataSource.getRepository(Pattern);

export async function getAllPatterns(): Promise<Pattern[]> {
  return patternRepository.find();
}

export async function addPattern(
  title: string,
  skillLevel: string,
  skiensNeeded: number,
  yarnSize: number,
  originalName: string,
  filename: string,
  mimetype: string,
  size: number,
  path: string,
  crochetOrKnit: string,
  createdAt: Date,
): Promise<Pattern> {
  const newPattern = new Pattern();
  newPattern.title = title;
  newPattern.skillLevel = skillLevel;
  newPattern.skiensNeeded = skiensNeeded;
  newPattern.yarnSize = yarnSize;
  newPattern.originalName = originalName;
  newPattern.filename = filename;
  newPattern.mimetype = mimetype;
  newPattern.size = size;
  newPattern.path = path;
  newPattern.crochetOrKnit = crochetOrKnit;
  newPattern.createdAt = createdAt;

  return patternRepository.save(newPattern);
}
