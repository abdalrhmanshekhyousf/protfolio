import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

/** Soft light following the mouse — desktop only (task 50) */
export default function CursorGlow() {
  const reduce = useReducedMotion();
  const [fine] = useState(() => matchMedia('(pointer: fine)').matches);
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 150, damping: 25 });
  const sy = useSpring(y, { stiffness: 150, damping: 25 });

  useEffect(() => {
    if (!fine || reduce) return;
    const move = (e) => { x.set(e.clientX - 200); y.set(e.clientY - 200); };
    addEventListener('pointermove', move);
    return () => removeEventListener('pointermove', move);
  }, [fine, reduce, x, y]);

  if (!fine || reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 -z-0 size-[400px] rounded-full bg-brand-glow/10 blur-3xl dark:bg-brand-glow/[0.07]"
      style={{ x: sx, y: sy }}
    />
  );
}
