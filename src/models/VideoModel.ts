import { AppDataSource } from '../dataSource.js';
import { User } from '../entities/User.js';
import { Video } from '../entities/Videos.js';

const videoRepository = AppDataSource.getRepository(Video);

export async function getAllVideos(): Promise<Video[]> {
  return videoRepository.find();
}

export async function addVideo(data: Record<string, unknown>, user: User): Promise<Video> {
  const video = videoRepository.create({ ...data, createdBy: user });
  return videoRepository.save(video);
}

export async function getVideoById(videoId: string): Promise<Video | null> {
  return videoRepository.findOne({
    where: { videoId },
    relations: ['createdBy'],
  });
}

export async function updateVideo(video: Video, updates: Partial<Video>): Promise<Video> {
  Object.assign(video, updates);
  return videoRepository.save(video);
}

export async function deleteVideo(video: Video): Promise<boolean> {
  await videoRepository.remove(video);
  return true;
}

export async function searchVideos(q: string): Promise<Video[]> {
  return videoRepository
    .createQueryBuilder('video')
    .where('LOWER(video.title) LIKE LOWER(:q)', { q: `%${q}%` })
    .getMany();
}
