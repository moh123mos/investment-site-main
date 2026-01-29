import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import City from './models/City.js';
import Video from './models/Video.js';
import connectDB from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ar = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/i18n/locales/ar.json'), 'utf-8'));
const de = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/i18n/locales/de.json'), 'utf-8'));

connectDB();

const resolve = (obj, path) => path.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);

const getSectionText = (obj, slug, sectionKey) => {
  const section = obj[slug][sectionKey];
  if (!section) return '';
  return Object.keys(section)
    .filter(k => k.startsWith('text'))
    .sort()
    .map(k => section[k])
    .join('\n\n');
};

const getIntroText = (obj, slug, keyOverride) => {
  const target = keyOverride ? resolve(obj[slug], keyOverride) : obj[slug].intro;
  
  if (!target) return 'Welcome to ' + slug; 

  if (typeof target === 'string') return target;
  if (target.text) return target.text;
  
  // Combine all text keys
  return Object.keys(target)
    .filter(k => k.startsWith('text'))
    .sort()
    .map(k => target[k])
    .join('\n\n');
}

const cityConfigs = [
  {
    slug: 'salzgitter',
    heroImage: '/salzgitter.jpg',
    sections: [
      { key: 'metropole', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&fit=crop' },
      { key: 'vw', image: '/vw-factory.jpg' },
      { key: 'central', image: '/germany-map.jpg' }
    ]
  },
  {
    slug: 'goslar',
    heroImage: '/goslar-1.jpg',
    sections: [
      { key: 'authenticity', image: '/goslar-2.jpg' },
      { key: 'christmas', image: '/goslar-3.jpg' }
    ],
    activities: {
        key: 'week',
        count: 7
    }
  },
  {
    slug: 'halberstadt',
    heroImage: '/halberstadt.jpg',
    introKey: 'history',
    sections: [
        { key: 'medical', image: '/hospital.jpg' },
        { key: 'wagon', image: '/wagon.jpg' },
        { key: 'heart', image: '/heart.jpg' },
        { key: 'transport', image: '/transport.jpg' }
    ]
  },
  {
    slug: 'kothen',
    heroImage: '/kothen.jpg',
    introKey: 'helios',
    sections: [
        { key: 'helios', image: '/helios.jpg' },
        { key: 'jakob', image: '/church.jpg' },
        { key: 'bach', image: '/bach.jpg' },
        { key: 'transport', image: '/transport-kothen.jpg' }
    ]
  },
  {
      slug: 'hannover',
      heroImage: '/hannover.jpg',
      sections: [
          { key: 'business', image: '/business.jpg' },
          { key: 'culture', image: '/culture.jpg' },
          { key: 'transport', image: '/hannover-transport.jpg' }
      ],
      activities: {
          key: 'highlights',
          count: 6,
          isItems: true
      }
  },
  {
      slug: 'agypten',
      heroImage: '/egypt.jpg',
      introKey: 'tarek',
      sections: [
          { key: 'tarek', image: '/tarek-gardens.jpg' },
          { key: 'amarna', image: '/amarna.jpg' },
          { key: 'tuna', image: '/tuna.jpg' },
          { key: 'harmony', image: '/harmony.jpg' }
      ]
  }
];

const videoConfigs = [
  {
      titleKey: 'section5.title',
      url: 'https://www.youtube.com/watch?v=6mRbDEtDoyA',
      descKey: 'section5.title', 
  },
  {
      titleKey: 'section6.title1',
      url: 'https://www.youtube.com/watch?v=pGIBJHQJcR8',
      descKey: 'section6.title1',
  },
  {
      titleKey: 'section6.title2',
      url: 'https://www.youtube.com/watch?v=azq0S0DKS50',
      descKey: 'section6.title2',
  },
  {
      titleKey: 'section7.title',
      url: 'https://www.youtube.com/watch?v=82Hkshs8VyE',
      descKey: 'section7.text',
  },
  {
      titleKey: 'section8.title',
      url: 'https://www.youtube.com/watch?v=9RJpIqD8MGg',
      descKey: 'section8.title',
  },
  {
      titleKey: 'section9.title1',
      url: 'https://www.youtube.com/watch?v=AnTdJs0k2Q8',
      descKey: 'section9.title1',
  },
  {
      titleKey: 'section9.title2',
      url: 'https://www.youtube.com/watch?v=73_3icYYnT8',
      descKey: 'section9.title2',
  }
];

const seedDB = async () => {
    try {
      await City.deleteMany();
      await Video.deleteMany();
  
      const cities = cityConfigs.map(config => {
          const arCity = ar[config.slug] || {}; // fallback blank obj
          const deCity = de[config.slug] || {};
          
          const sections = config.sections.map((sect, index) => ({
              title: {
                  ar: resolve(arCity, sect.key + '.title') || 'Title Missing',
                  de: resolve(deCity, sect.key + '.title') || 'Title Missing'
              },
              content: {
                  ar: getSectionText(ar, config.slug, sect.key),
                  de: getSectionText(de, config.slug, sect.key)
              },
              image: sect.image,
              order: index + 1
          }));
  
          let activities = [];
          if (config.activities) {
              for (let i = 1; i <= config.activities.count; i++) {
                  const key = config.activities.isItems ? `item${i}` : `day${i}`;
                  // Safety check
                  const arGroup = arCity[config.activities.key] || {};
                  const deGroup = deCity[config.activities.key] || {};
                  const arAct = arGroup[key] || {};
                  const deAct = deGroup[key] || {};
                  
                  const arDesc = arAct.activity || arAct.description || '';
                  const deDesc = deAct.activity || deAct.description || '';
                  const arTitle = arAct.title || arAct.day || `Day ${i}`;
                  const deTitle = deAct.title || deAct.day || `Tag ${i}`;

                  activities.push({
                      day: { ar: arTitle, de: deTitle },
                      activity: { ar: arDesc, de: deDesc }
                  });
              }
          }
  
          return {
              name: {
                  ar: ar.nav[config.slug],
                  de: de.nav[config.slug]
              },
              slug: config.slug,
              heroImage: config.heroImage,
              introText: {
                  ar: getIntroText(ar, config.slug, config.introKey),
                  de: getIntroText(de, config.slug, config.introKey)
              },
              sections,
              activities
          };
      });
  
      const videos = videoConfigs.map(config => {
          return {
              title: {
                  ar: resolve(ar.home, config.titleKey) || 'Video',
                  de: resolve(de.home, config.titleKey) || 'Video'
              },
              url: config.url,
              description: {
                  ar: resolve(ar.home, config.descKey) || '',
                  de: resolve(de.home, config.descKey) || ''
              }
          };
      });
  
      await City.insertMany(cities);
      await Video.insertMany(videos);
  
      console.log('Data Imported with Bilingual Support!');
      process.exit();
    } catch (error) {
      console.error(`${error}`);
      process.exit(1);
    }
  };
  
seedDB();
