import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LangSwitch() {
  const { i18n, t } = useTranslation();
  const isAr = i18n.resolvedLanguage === 'ar';

  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(isAr ? 'en' : 'ar')}
      aria-label={t('a11y.switchLang')}
      title={t('a11y.switchLang')}
      className="flex h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-sm font-semibold text-ink transition-colors hover:border-tint hover:text-tint"
    >
      <Languages size={16} aria-hidden="true" />
      <span lang={isAr ? 'en' : 'ar'} className={isAr ? 'font-[Poppins]' : 'font-ar-body'}>
        {isAr ? 'EN' : 'ع'}
      </span>
    </button>
  );
}
