import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Section from './Section';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

export default function Projects() {
  const { t } = useTranslation();
  return (
    <Section id="projects" title={t('projects.title')} subtitle={t('projects.subtitle')}>
      <motion.div
        className="grid gap-6 md:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
      >
        {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
      </motion.div>
    </Section>
  );
}
