import { AppDataSource } from '../dataSource.js';
import { Pattern } from '../entities/Patterns.js';
import { User } from '../entities/User.js';

const patternRepository = AppDataSource.getRepository(Pattern);

export async function getAllPatterns(): Promise<Pattern[]> {
  return patternRepository.find();
}

export async function addPattern(data: Record<string, unknown>, user: User): Promise<Pattern> {
  const pattern = patternRepository.create({ ...data, createdBy: user });
  return patternRepository.save(pattern);
}

export async function getPatternById(patternId: string): Promise<Pattern | null> {
  return patternRepository.findOne({
    where: { patternId },
    relations: ['createdBy'],
  });
}

export async function updatePattern(pattern: Pattern, updates: Partial<Pattern>): Promise<Pattern> {
  Object.assign(pattern, updates);
  return patternRepository.save(pattern);
}

export async function deletePattern(pattern: Pattern): Promise<boolean> {
  await patternRepository.remove(pattern);
  return true;
}

export async function searchPatterns(q: string): Promise<Pattern[]> {
  return patternRepository
    .createQueryBuilder('pattern')
    .where('LOWER(pattern.title) LIKE LOWER(:q)', { q: `%${q}%` })
    .getMany();
}
