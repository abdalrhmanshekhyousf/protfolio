import { Boxes, Languages, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from './Section';

const ICONS = [Languages, Boxes, ShieldCheck];

export default function About() {
  const { t } = useTranslation();
  const points = t('about.points', { returnObjects: true });
  return (
    <Section id="about" title={t('about.title')}>
      <p className="max-w-3xl text-lg leading-loose text-muted">{t('about.body')}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {points.map((p, i) => {
          const Icon = ICONS[i];
          return (
            <div key={p.title} className="rounded-3xl border border-line bg-surface p-6 transition hover:-translate-y-1 hover:border-tint">
              <span className="grid size-11 place-items-center rounded-xl bg-accent/15 text-accent"><Icon size={22} aria-hidden="true" /></span>
              <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
