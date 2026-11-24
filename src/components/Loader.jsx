import { motion } from 'motion/react';
import AnimatedLogo from './AnimatedLogo';

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.45, ease: 'easeIn' } }}
      role="status"
      aria-label="Loading"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-[28%] shadow-2xl shadow-brand/30"
      >
        <AnimatedLogo size={120} mode="draw" />
      </motion.div>
    </motion.div>
  );
}
