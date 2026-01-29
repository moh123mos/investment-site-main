import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
  title: {
    ar: { type: String, required: true },
    de: { type: String, required: true },
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    ar: String,
    de: String,
  },
  thumbnail: {
    type: String, 
  },
}, {
  timestamps: true,
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
