import { useTranslation } from 'react-i18next';
import AnimatedLogo from './AnimatedLogo';

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <AnimatedLogo size={26} />
          <span>© {YEAR} {t('hero.name')} — {t('footer.rights')}</span>
        </div>
        <span>{t('footer.built')}</span>
      </div>
    </footer>
  );
}
