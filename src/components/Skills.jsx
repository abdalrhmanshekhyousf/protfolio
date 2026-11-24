import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Section from './Section';
import { skills } from '../data/skills';
import { pick } from '../i18n';

const list = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const badge = { hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 14 } } };

export default function Skills() {
  const { t } = useTranslation();
  return (
    <Section id="skills" title={t('skills.title')} subtitle={t('skills.subtitle')}>
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map(({ id, icon: Icon, title, items }) => (
          <div key={id} className="rounded-3xl border border-line bg-surface p-6">
            <h3 className="mb-4 flex items-center gap-3 text-lg font-bold text-ink">
              <span className="grid size-10 place-items-center rounded-xl bg-tint/10 text-tint"><Icon size={20} aria-hidden="true" /></span>
              {pick(title)}
            </h3>
            <motion.ul className="flex flex-wrap gap-2" variants={list} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
              {items.map((s) => (
                <motion.li
                  key={s} variants={badge} whileHover={{ y: -3 }}
                  dir="ltr"
                  className="rounded-full border border-line bg-bg px-3.5 py-1.5 font-[Poppins] text-sm font-medium text-ink"
                >
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
