import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import Counter from './Counter';
import ProjectGraph from './ProjectGraph';
import { GitHubIcon } from './Icons';
import { profile } from '../data/profile';
import { useDirection } from '../hooks/useDirection';

const words = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const word = { hidden: { y: '110%', opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export default function Hero() {
  const { t } = useTranslation();
  const { lang } = useDirection();
  const reduce = useReducedMotion();

  // task 38: grid parallax with the mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const gx = useTransform(sx, (v) => v * -24);
  const gy = useTransform(sy, (v) => v * -24);
  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const typing = t('hero.typing', { returnObjects: true });
  const sequence = typing.flatMap((s) => [s, 1600]);

  return (
    <section id="home" onMouseMove={onMove} className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <motion.div aria-hidden="true" className="grid-bg absolute -inset-10 -z-10" style={{ x: gx, y: gy }} />
      <div aria-hidden="true" className="absolute -top-40 start-1/2 -z-10 size-[36rem] rounded-full bg-brand-glow/15 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-3 font-medium text-tint">{t('hero.hello')}</p>
          <motion.h1
            variants={words} initial="hidden" animate="show"
            className="text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {t('hero.name').split(' ').map((w, i) => (
              <span key={i} className="me-3 inline-block overflow-hidden pb-1 align-bottom">
                <motion.span variants={word} className="inline-block">{w}</motion.span>
              </span>
            ))}
          </motion.h1>

          <div className="mt-4 h-9 text-xl font-semibold text-accent sm:text-2xl" aria-live="off">
            <TypeAnimation key={lang} sequence={sequence} repeat={Infinity} speed={55} deletionSpeed={70} cursor />
          </div>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{t('hero.bio')}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-light">
              {t('hero.cta')}
              <ArrowLeft size={18} className="rotate-180 transition-transform group-hover:translate-x-1 rtl:rotate-0 rtl:group-hover:-translate-x-1" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-semibold text-ink transition hover:border-tint hover:text-tint">
              <GitHubIcon /> {t('hero.github')}
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {Object.entries(profile.stats).map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-line bg-surface p-4">
                <dt className="sr-only">{t(`hero.stats.${k}`)}</dt>
                <dd className="text-2xl font-bold text-ink" dir="ltr"><Counter to={v} />{k !== 'projects' && '+'}</dd>
                <dd className="mt-1 text-xs text-muted" aria-hidden="true">{t(`hero.stats.${k}`)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex justify-center">
          <ProjectGraph label={t('hero.graph')} />
        </div>
      </div>
    </section>
  );
}
