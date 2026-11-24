import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Loader from './components/Loader';
import CursorGlow from './components/CursorGlow';
import Footer from './components/Footer';
import { useDirection } from './hooks/useDirection';

// task 61: below-the-fold sections load lazily
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

export default function App() {
  const { t } = useTranslation();
  const { lang } = useDirection();
  const [loading, setLoading] = useState(
    () => !matchMedia('(prefers-reduced-motion: reduce)').matches && !sessionStorage.getItem('seenLoader'),
  );

  useEffect(() => {
    if (!loading) return;
    const id = setTimeout(() => { setLoading(false); sessionStorage.setItem('seenLoader', '1'); }, 2300);
    return () => clearTimeout(id);
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#projects" className="sr-only z-[60] rounded-full bg-accent px-4 py-2 text-[#15181c] focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
        {t('a11y.skip')}
      </a>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <CursorGlow />
      <Navbar />
      {/* task 46: content re-enters softly when the language changes */}
      <motion.main
        key={lang}
        initial={{ opacity: 0, filter: 'blur(6px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.45 }}
        className="relative"
      >
        <Hero />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Projects />
          <Skills />
          <About />
          <Contact />
        </Suspense>
      </motion.main>
      <Footer />
    </MotionConfig>
  );
}
