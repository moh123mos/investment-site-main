import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de.json';
import ar from './locales/ar.json';

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    ar: { translation: ar },
  },
  lng: localStorage.getItem('i18nextLng') || 'de',
  fallbackLng: 'de',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
