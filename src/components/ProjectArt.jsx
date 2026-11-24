import { motion, useReducedMotion } from 'motion/react';

/**
 * Animated illustration per project (task 47).
 * Built with motion SVG instead of Lottie JSON: no extra files, follows the theme colours.
 */
export default function ProjectArt({ kind, active }) {
  const reduce = useReducedMotion();
  const loop = (t) => (reduce ? { duration: 0 } : { repeat: Infinity, ...t });
  const speed = active ? 1 : 1.6;
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 6, strokeLinecap: 'round', strokeLinejoin: 'round' };

  const arts = {
    heart: (
      <>
        <motion.path
          d="M160 92 C140 60 92 64 92 104 C92 140 160 172 160 172 C160 172 228 140 228 104 C228 64 180 60 160 92 Z"
          fill="#ff7a4d" stroke="none"
          style={{ originX: '160px', originY: '120px' }}
          animate={reduce ? undefined : { scale: [1, 1.12, 1, 1.08, 1] }}
          transition={loop({ duration: 1.2 * speed })}
        />
        <motion.path
          d="M20 150 H110 L128 118 L146 182 L164 98 L182 168 L196 150 H300"
          {...common}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={loop({ duration: 2 * speed, times: [0, 0.7, 1] })}
        />
      </>
    ),
    diagram: (
      <>
        {[[40, 40], [200, 40], [120, 140]].map(([x, y], i) => (
          <motion.rect
            key={i} x={x} y={y} width="84" height="52" rx="10" {...common}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          />
        ))}
        <motion.path
          d="M124 66 H200 M82 92 V166 H120 M242 92 V166 H204"
          {...common} stroke="#ff7a4d" strokeDasharray="8 8"
          animate={reduce ? undefined : { strokeDashoffset: [0, -32] }}
          transition={loop({ duration: 1 * speed, ease: 'linear' })}
        />
      </>
    ),
    receipt: (
      <>
        <motion.g
          animate={reduce ? undefined : { y: [24, 0, 0, 24] }}
          transition={loop({ duration: 3 * speed, times: [0, 0.3, 0.8, 1] })}
        >
          <path d="M110 30 H210 V180 L195 170 L180 180 L165 170 L150 180 L135 170 L120 180 L110 172 Z" {...common} />
          {[60, 84, 108].map((y, i) => (
            <motion.line
              key={y} x1="128" y1={y} x2="192" y2={y} {...common} strokeWidth={5}
              initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }}
              transition={loop({ duration: 3 * speed, delay: i * 0.15, times: [0.1, 0.35, 0.85, 1] })}
            />
          ))}
          <line x1="128" y1="140" x2="192" y2="140" stroke="#ff7a4d" strokeWidth="7" strokeLinecap="round" />
        </motion.g>
        <rect x="80" y="20" width="160" height="14" rx="7" fill="currentColor" />
      </>
    ),
    cap: (
      <motion.g
        animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, -3, 0] }}
        transition={loop({ duration: 2.4 * speed })}
        style={{ originX: '160px', originY: '110px' }}
      >
        <path d="M60 90 L160 50 L260 90 L160 130 Z" {...common} fill="currentColor" fillOpacity="0.15" />
        <path d="M105 110 V150 C105 166 215 166 215 150 V110" {...common} />
        <motion.g
          animate={reduce ? undefined : { rotate: [10, -10, 10] }}
          transition={loop({ duration: 1.6 * speed })}
          style={{ originX: '250px', originY: '94px' }}
        >
          <line x1="250" y1="94" x2="250" y2="150" {...common} strokeWidth={4} />
          <circle cx="250" cy="156" r="9" fill="#ff7a4d" />
        </motion.g>
      </motion.g>
    ),
  };

  return (
    <svg viewBox="0 0 320 210" className="h-full w-full text-tint" aria-hidden="true">
      {arts[kind]}
    </svg>
  );
}
