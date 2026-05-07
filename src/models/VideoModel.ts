import { AppDataSource } from '../dataSource.js';
import { Video } from '../entities/Videos.js';

const videoRepository = AppDataSource.getRepository(Video);

export async function getAllVideos(): Promise<Video[]> {
  return videoRepository.find();
}

export async function addVideo(
  title: string,
  skillLevel: string,
  skiensNeeded: number,
  yarnSize: number,
  crochetOrKnit: string,
): Promise<Video> {
  const newVideo = videoRepository.create({
    //here at .create
    /*No overload matches this call.
  Overload 1 of 3, '(entityLikeArray: DeepPartial<Video>[]): Video[]', gave the following error.
    Object literal may only specify known properties, and 'title' does not exist in type 'DeepPartial<Video>[]'.
  Overload 2 of 3, '(entityLike: DeepPartial<Video>): Video', gave the following error.
    Object literal may only specify known properties, and 'skillLevel' does not exist in type 'DeepPartial<Video>'.ts(2769)
(method) Repository<Video>.create(): Video (+2 overloads)*/
    title,
    skillLevel,
    skiensNeeded,
    yarnSize,
    crochetOrKnit,
  });
  return videoRepository.save(newVideo);
}
