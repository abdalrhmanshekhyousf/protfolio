import { useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedLogo from './AnimatedLogo';
import LangSwitch from './LangSwitch';
import ThemeToggle from './ThemeToggle';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useDirection } from '../hooks/useDirection';

const SECTIONS = ['home', 'projects', 'skills', 'about', 'contact'];

export default function Navbar() {
  const { t } = useTranslation();
  const { isRtl } = useDirection();
  const active = useScrollSpy(SECTIONS);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  const link = (id, onClick) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={onClick}
      aria-current={active === id ? 'true' : undefined}
      className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
        active === id ? 'text-tint' : 'text-muted hover:text-ink'
      }`}
    >
      {active === id && (
        <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-tint/10" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
      )}
      {t(`nav.${id}`)}
    </a>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/75 backdrop-blur-xl">
      {/* task 49: reading progress, starts from the reading side */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-accent"
        style={{ scaleX: progress, originX: isRtl ? 1 : 0 }}
      />
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#home" className="flex items-center gap-2.5" aria-label={t('hero.name')}>
          <AnimatedLogo size={34} />
          <span className="font-[Poppins] text-lg font-bold tracking-tight text-ink" dir="ltr">
            Abdalrhman<span className="text-accent">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">{SECTIONS.map((id) => link(id))}</div>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? t('nav.close') : t('nav.menu')}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {SECTIONS.map((id) => link(id, () => setOpen(false)))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
