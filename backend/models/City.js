import mongoose from 'mongoose';

const citySchema = mongoose.Schema({
  name: {
    ar: { type: String, required: true },
    de: { type: String, required: true },
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  heroImage: {
    type: String,
    required: true,
  },
  introText: {
    ar: { type: String, required: true },
    de: { type: String, required: true },
  },
  sections: [
    {
      title: {
        ar: String,
        de: String,
      },
      content: {
        ar: String,
        de: String,
      },
      image: String,
      order: Number,
    },
  ],
  activities: [
    {
      day: {
        ar: String,
        de: String,
      },
      activity: {
        ar: String,
        de: String,
      },
    },
  ],
}, {
  timestamps: true,
});

const City = mongoose.model('City', citySchema);

export default City;
