import { Request, Response } from 'express';
import { getUserById } from '../models/UserModel.js';
import {
  addVideo,
  deleteVideo,
  getAllVideos,
  getVideoById,
  searchVideos,
  updateVideo,
} from '../models/VideoModel.js';
import { videoSchema } from '../validators/VideoValidators.js';

export async function getVideos(req: Request, res: Response): Promise<void> {
  const videos = await getAllVideos();
  res.json(videos);
}

export async function createVideo(req: Request, res: Response): Promise<void> {
  const userId = req.session.authenticatedUser?.userId;
  if (!userId) {
    res.sendStatus(401);
    return;
  }

  const parsed = videoSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.format());
    return;
  }

  const user = await getUserById(userId);
  if (!user) {
    res.sendStatus(404);
    return;
  }

  const video = await addVideo(parsed.data, user);
  res.status(201).json(video);
}

export async function getVideo(req: Request, res: Response): Promise<void> {
  const videoId = req.params.videoId as string;
  const video = await getVideoById(videoId);

  if (!video) {
    res.sendStatus(404);
    return;
  }

  res.json(video);
}

export async function updateVideoController(req: Request, res: Response): Promise<void> {
  const userId = req.session.authenticatedUser?.userId;
  if (!userId) {
    res.sendStatus(401);
    return;
  }

  const videoId = req.params.videoId as string;
  const video = await getVideoById(videoId);

  if (!video) {
    res.sendStatus(404);
    return;
  }

  if (video.createdBy.userId !== userId) {
    res.sendStatus(403);
    return;
  }

  const updated = await updateVideo(video, req.body);
  res.json(updated);
}

export async function deleteVideoController(req: Request, res: Response): Promise<void> {
  const userId = req.session.authenticatedUser?.userId;
  if (!userId) {
    res.sendStatus(401);
    return;
  }

  const videoId = req.params.videoId as string;
  const video = await getVideoById(videoId);

  if (!video) {
    res.sendStatus(404);
    return;
  }

  if (video.createdBy.userId !== userId) {
    res.sendStatus(403);
    return;
  }

  await deleteVideo(video);
  res.sendStatus(204);
}

export async function searchVideosController(req: Request, res: Response): Promise<void> {
  const q = (req.query.q as string) || '';

  if (!q.trim()) {
    res.status(400).json({ error: "Query 'q' required" });
    return;
  }

  const results = await searchVideos(q);
  res.json(results);
}
