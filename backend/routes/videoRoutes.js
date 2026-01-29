import express from 'express';
import Video from '../models/Video.js';

const router = express.Router();

const localize = (obj, lang) => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj['ar'] || '';
};

const flattenVideo = (video, lang) => {
  const v = video.toObject();
  return {
    ...v,
    title: localize(v.title, lang),
    description: localize(v.description, lang),
  };
};

// @desc    Get all videos
// @route   GET /api/videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find({});
    const lang = req.headers['accept-language']?.split(',')[0].substring(0, 2) || 'ar';
    const isFull = req.query.full === 'true';

    if (isFull) {
      res.json(videos);
    } else {
      res.json(videos.map(video => flattenVideo(video, lang)));
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a video
// @route   POST /api/videos
router.post('/', async (req, res) => {
  try {
    const video = new Video(req.body);
    const createdVideo = await video.save();
    res.status(201).json(createdVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a video
// @route   DELETE /api/videos/:id
router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (video) {
      await video.deleteOne();
      res.json({ message: 'Video removed' });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
