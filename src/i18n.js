import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ar from './locales/ar.json';
import en from './locales/en.json';

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: { ar: { translation: ar }, en: { translation: en } },
  fallbackLng: 'ar',
  supportedLngs: ['ar', 'en'],
  nonExplicitSupportedLngs: true,
  load: 'languageOnly',
  detection: {
    order: ['querystring', 'localStorage', 'navigator'],
    lookupQuerystring: 'lng',
    caches: ['localStorage'],
  },
  interpolation: { escapeValue: false },
});

const applyDir = (lng) => {
  const l = lng?.startsWith('en') ? 'en' : 'ar';
  const html = document.documentElement;
  html.lang = l;
  html.dir = i18n.dir(l);
  const title = i18n.t('meta.title', { lng: l });
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.t('meta.description', { lng: l }));
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
  document.querySelector('meta[property="og:image"]')?.setAttribute('content', `/og-${l}.png`);
};
// task 60: hreflang alternates
['ar', 'en'].forEach((l) => {
  const link = document.createElement('link');
  link.rel = 'alternate';
  link.hreflang = l;
  link.href = `${location.origin}/?lng=${l}`;
  document.head.appendChild(link);
});

applyDir(i18n.resolvedLanguage);
i18n.on('languageChanged', applyDir);

/** Pick the text for the current language from { ar, en } */
export const pick = (obj) =>
  obj == null || typeof obj === 'string' ? obj : obj[i18n.resolvedLanguage] ?? obj.ar;

export default i18n;
