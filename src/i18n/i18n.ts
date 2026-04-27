import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import hu from '@/src/i18n/langs/hu.json';

i18n.use(initReactI18next).init({
  lng: 'hu',
  fallbackLng: 'hu',
  resources: {
    hu: {
      translation: hu,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
