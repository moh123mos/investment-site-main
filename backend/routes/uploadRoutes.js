import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';

const router = express.Router();

// Use Cloudinary storage instead of local disk storage
const upload = multer({ storage });

// Upload image to Cloudinary
router.post('/', upload.single('image'), (req, res) => {
  // Cloudinary returns the full URL in req.file.path
  res.send(req.file.path);
});

export default router;
