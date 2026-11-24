import { motion } from 'motion/react';
import { useDirection } from '../hooks/useDirection';

/** Section that reveals from the reading side (task 40) */
export default function Section({ id, title, subtitle, children, className = '' }) {
  const { dir } = useDirection();
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 ${className}`}>
      <motion.div
        initial={{ opacity: 0, x: 40 * dir }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {title && (
          <header className="mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {title}
              <span className="text-accent">.</span>
            </h2>
            {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
          </header>
        )}
        {children}
      </motion.div>
    </section>
  );
}
