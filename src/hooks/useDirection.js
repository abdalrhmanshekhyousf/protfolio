import { useTranslation } from 'react-i18next';

/** dir = 1 in LTR, -1 in RTL — multiply horizontal motion by it (task 17) */
export function useDirection() {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage;
  const isRtl = i18n.dir(lang) === 'rtl';
  return { isRtl, dir: isRtl ? -1 : 1, lang };
}
