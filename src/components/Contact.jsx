import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Copy, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from './Section';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { profile } from '../data/profile';

export default function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked */ }
  };

  const social = 'grid size-12 place-items-center rounded-full border border-line bg-bg text-ink transition hover:border-tint hover:text-tint';

  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-deep p-8 text-center text-white sm:p-14">
        <div aria-hidden="true" className="absolute -end-20 -top-20 size-64 rounded-full bg-accent/25 blur-3xl" />
        <h2 className="relative text-3xl font-extrabold sm:text-4xl">{t('contact.title')}<span className="text-accent">.</span></h2>
        <p className="relative mx-auto mt-3 max-w-xl text-white/85">{t('contact.subtitle')}</p>

        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-[#15181c] transition hover:brightness-110">
            <Mail size={18} /> {t('contact.cta')}
          </a>
          <button type="button" onClick={copy} className="relative inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
            <Copy size={18} /> {t('contact.copy')}
            <AnimatePresence>
              {copied && (
                <motion.span
                  role="status"
                  initial={{ opacity: 0, y: 6, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -6, x: '-50%' }}
                  className="absolute -top-10 left-1/2 rounded-full bg-white px-3 py-1 text-xs font-semibold whitespace-nowrap text-brand"
                >
                  {t('contact.copied')}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
        <p className="relative mt-4 font-[Poppins] text-sm text-white/80" dir="ltr">{profile.email}</p>

        <div className="relative mt-8 flex justify-center gap-3 [&_a]:border-white/30 [&_a]:bg-white/10 [&_a]:text-white">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={social}><GitHubIcon size={20} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={social}><LinkedInIcon size={20} /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className={social}><Mail size={20} /></a>
        </div>
      </div>
    </Section>
  );
}
