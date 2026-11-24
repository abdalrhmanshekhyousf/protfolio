import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

/** Counts up when it scrolls into view (task 39) */
export default function Counter({ to, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) { ref.current.textContent = to; return; }
    const ctrl = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v); },
    });
    return () => ctrl.stop();
  }, [inView, to, duration, reduce]);

  return <span ref={ref} className="tabular-nums">0</span>;
}
