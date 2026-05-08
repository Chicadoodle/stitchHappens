import dotenv from 'dotenv';
import 'dotenv/config';
dotenv.config();

import express, { Express } from 'express';
import './config.js';
import { sessionMiddleware } from './sessionConfig.js';

import {
  createPattern,
  deletePatternController,
  getPattern,
  getPatterns,
  searchPatternsController,
  updatePatternController,
} from './controllers/PatternController.js';
import {
  favoritePattern,
  favoriteVideo,
  getMe,
  loginUser,
  logoutUser,
  registerUser,
  unfavoritePattern,
  unfavoriteVideo,
} from './controllers/UserController.js';
import {
  createVideo,
  deleteVideoController,
  getVideo,
  getVideos,
  searchVideosController,
  updateVideoController,
} from './controllers/VideoController.js';

const app: Express = express();
const { PORT } = process.env;

app.use(sessionMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public', { extensions: ['html'] }));

// -- Routes --------------------------------------------------

app.post('/api/users/register', registerUser);
app.post('/api/users/login', loginUser);
app.delete('/api/users/logout', logoutUser);
app.get('/api/users/me', getMe);

app.post('/api/favorites/videos/:videoId', favoriteVideo);
app.delete('/api/favorites/videos/:videoId', unfavoriteVideo);
app.post('/api/favorites/patterns/:patternId', favoritePattern);
app.delete('/api/favorites/patterns/:patternId', unfavoritePattern);

app.get('/api/videos', getVideos);
app.get('/api/videos/:videoId', getVideo);
app.post('/api/videos', createVideo);
app.put('/api/videos/:videoId', updateVideoController);
app.delete('/api/videos/:videoId', deleteVideoController);
app.get('/api/videos/search', searchVideosController);

app.get('/api/patterns', getPatterns);
app.get('/api/patterns/:patternId', getPattern);
app.post('/api/patterns', createPattern);
app.put('/api/patterns/:patternId', updatePatternController);
app.delete('/api/patterns/:patternId', deletePatternController);
app.get('/api/patterns/search', searchPatternsController);

// Register your routes below this line

app.listen(Number(PORT), () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
