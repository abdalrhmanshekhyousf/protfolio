import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { Check, ExternalLink, PlayCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProjectArt from './ProjectArt';
import { GitHubIcon } from './Icons';
import { pick } from '../i18n';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function ProjectCard({ project }) {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const videoRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [videoOk, setVideoOk] = useState(Boolean(project.preview));

  // task 42: 3D tilt + moving shine
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const shineX = useTransform(px, (v) => `${v * 100}%`);
  const shineY = useTransform(py, (v) => `${v * 100}%`);
  const shine = useMotionTemplate`radial-gradient(420px circle at ${shineX} ${shineY}, rgb(255 255 255 / 0.14), transparent 45%)`;

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const enter = () => {
    setHover(true);
    videoRef.current?.play().catch(() => {}); // task 43
  };
  const leave = () => {
    setHover(false);
    px.set(0.5); py.set(0.5);
    videoRef.current?.pause();
  };

  return (
    <motion.article
      variants={cardVariants}
      onPointerMove={onMove}
      onPointerEnter={enter}
      onPointerLeave={leave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-sm transition-shadow hover:shadow-xl hover:shadow-brand/10 dark:hover:shadow-black/40"
    >
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: shine }} />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-gradient-to-br from-brand/10 via-transparent to-accent/10">
        {videoOk ? (
          <video
            ref={videoRef}
            src={project.preview}
            poster={project.poster ?? undefined}
            muted loop playsInline preload="none"
            onError={() => setVideoOk(false)}
            className="h-full w-full object-cover"
            aria-label={pick(project.name)}
          />
        ) : (
          <div className="h-full w-full p-6"><ProjectArt kind={project.art} active={hover} /></div>
        )}
        {videoOk && (
          <span className="absolute bottom-3 start-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white opacity-100 transition-opacity group-hover:opacity-0">
            <PlayCircle size={14} /> {t('projects.hoverHint')}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-bold text-ink">{pick(project.name)}</h3>
        <p className="mt-2 text-muted">{pick(project.desc)}</p>

        <ul className="mt-4 space-y-1.5">
          {pick(project.features).map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-ink">
              <Check size={16} className="mt-0.5 shrink-0 text-tint" aria-hidden="true" /> {f}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2" dir="ltr">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full border border-line bg-bg px-3 py-1 font-[Poppins] text-xs font-medium text-muted">{s}</li>
          ))}
        </ul>

        <div className="relative z-20 mt-auto flex flex-wrap gap-3 pt-6">
          {project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-light">
              <ExternalLink size={16} /> {t('projects.live')}
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-line px-4 py-2 text-sm text-muted">
              <PlayCircle size={16} /> {t('projects.noLive')}
            </span>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition hover:border-tint hover:text-tint">
              <GitHubIcon size={16} /> {t('projects.repo')}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
