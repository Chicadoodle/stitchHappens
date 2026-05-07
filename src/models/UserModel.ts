import { AppDataSource } from '../dataSource.js';
import { User } from '../entities/User.js';

const userRepository = AppDataSource.getRepository(User);

export async function addUser(
  email: string,
  passwordHash: string,
  userName: string,
): Promise<User> {
  const newUser = userRepository.create({ email, passwordHash, userName });
  return userRepository.save(newUser);
}

export async function getUserById(userId: string): Promise<User | null> {
  return userRepository.findOne({ where: { userId } });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return userRepository.findOne({ where: { email } });
}

export async function addFavoriteVideo(userId: string, videoId: string): Promise<User | null> {
  const user = await getUserById(userId);
  if (!user) return null;

  if (!user.favoriteVideoIds.includes(videoId)) {
    user.favoriteVideoIds.push(videoId);
  }

  return userRepository.save(user);
}

export async function removeFavoriteVideo(userId: string, videoId: string): Promise<User | null> {
  const user = await getUserById(userId);
  if (!user) return null;

  user.favoriteVideoIds = user.favoriteVideoIds.filter((id) => id !== videoId);
  return userRepository.save(user);
}

export async function addFavoritePattern(userId: string, patternId: string): Promise<User | null> {
  const user = await getUserById(userId);
  if (!user) return null;

  if (!user.favoritePatternIds.includes(patternId)) {
    user.favoritePatternIds.push(patternId);
  }

  return userRepository.save(user);
}

export async function removeFavoritePattern(
  userId: string,
  patternId: string,
): Promise<User | null> {
  const user = await getUserById(userId);
  if (!user) return null;

  user.favoritePatternIds = user.favoritePatternIds.filter((id) => id !== patternId);
  return userRepository.save(user);
}
