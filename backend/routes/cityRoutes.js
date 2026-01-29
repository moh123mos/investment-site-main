import express from 'express';
import City from '../models/City.js';

const router = express.Router();

const localize = (obj, lang) => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj['ar'] || '';
};

const flattenCity = (city, lang) => {
  const c = city.toObject();
  return {
    ...c,
    name: localize(c.name, lang),
    introText: localize(c.introText, lang),
    sections: c.sections.map(s => ({
      ...s,
      title: localize(s.title, lang),
      content: localize(s.content, lang),
    })),
    activities: c.activities.map(a => ({
      ...a,
      day: localize(a.day, lang),
      activity: localize(a.activity, lang),
    })),
  };
};

// @desc    Get all cities
// @route   GET /api/cities
router.get('/', async (req, res) => {
  try {
    const cities = await City.find({});
    const lang = req.headers['accept-language']?.split(',')[0].substring(0, 2) || 'ar';
    const isFull = req.query.full === 'true';

    if (isFull) {
      res.json(cities);
    } else {
      res.json(cities.map(city => flattenCity(city, lang)));
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get city by slug
// @route   GET /api/cities/:slug
router.get('/:slug', async (req, res) => {
  try {
    const city = await City.findOne({ slug: req.params.slug });
    if (city) {
      const lang = req.headers['accept-language']?.split(',')[0].substring(0, 2) || 'ar';
      const isFull = req.query.full === 'true';

      if (isFull) {
        res.json(city);
      } else {
        res.json(flattenCity(city, lang));
      }
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a city
// @route   POST /api/cities
router.post('/', async (req, res) => {
  try {
    const city = new City(req.body);
    const createdCity = await city.save();
    res.status(201).json(createdCity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a city
// @route   PUT /api/cities/:id
router.put('/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (city) {
      city.name = req.body.name || city.name;
      city.slug = req.body.slug || city.slug;
      city.heroImage = req.body.heroImage || city.heroImage;
      city.introText = req.body.introText || city.introText;
      city.sections = req.body.sections || city.sections;
      city.activities = req.body.activities || city.activities;

      const updatedCity = await city.save();
      res.json(updatedCity);
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a city
// @route   DELETE /api/cities/:id
router.delete('/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (city) {
      await city.deleteOne();
      res.json({ message: 'City removed' });
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
