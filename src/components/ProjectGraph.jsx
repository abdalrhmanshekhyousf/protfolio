import { motion, useReducedMotion } from 'motion/react';
import { projects } from '../data/projects';
import { pick } from '../i18n';

const NODES = [
  { x: 70, y: 70 },
  { x: 330, y: 70 },
  { x: 70, y: 290 },
  { x: 330, y: 290 },
];
const C = { x: 200, y: 180 };

/** SVG map linking the projects; the links "pulse" (task 37) */
export default function ProjectGraph({ label }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 400 360" className="h-auto w-full max-w-md" role="img" aria-label={label}>
      {NODES.map((n, i) => (
        <g key={i}>
          <line x1={C.x} y1={C.y} x2={n.x} y2={n.y} stroke="var(--line)" strokeWidth="2" />
          <motion.line
            x1={C.x} y1={C.y} x2={n.x} y2={n.y}
            stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray="14 220"
            initial={{ strokeDashoffset: 0 }}
            animate={reduce ? undefined : { strokeDashoffset: -234 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: i * 0.45 }}
          />
        </g>
      ))}
      {/* dashed ring between neighbours */}
      <motion.path
        d="M70 70 L330 70 L330 290 L70 290 Z"
        fill="none" stroke="var(--tint)" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 8"
        animate={reduce ? undefined : { strokeDashoffset: [0, -48] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      <motion.g
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }}
        style={{ originX: `${C.x}px`, originY: `${C.y}px` }}
      >
        <circle cx={C.x} cy={C.y} r="40" fill="#0b5d63" />
        <text x={C.x} y={C.y + 8} textAnchor="middle" fill="#fff" fontSize="24" fontWeight="700" fontFamily="Poppins">AS</text>
        <circle cx={C.x + 22} cy={C.y - 22} r="6" fill="#ff7a4d" />
      </motion.g>
      {NODES.map((n, i) => (
        <motion.g
          key={projects[i].id}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
          style={{ originX: `${n.x}px`, originY: `${n.y}px` }}
        >
          <motion.circle
            cx={n.x} cy={n.y} r="42" fill="var(--surface)" stroke="var(--tint)" strokeWidth="2"
            animate={reduce ? undefined : { r: [42, 45, 42] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.45 + 1 }}
          />
          {(() => {
            // one word per line so long names stay inside the circle
            const words = pick(projects[i].name).split(' ');
            const lh = 15;
            const y0 = n.y + 4.5 - ((words.length - 1) * lh) / 2;
            return (
              <text textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="600" fontFamily="Poppins">
                {words.map((w, k) => (
                  <tspan key={k} x={n.x} y={y0 + k * lh}>{w}</tspan>
                ))}
              </text>
            );
          })()}
        </motion.g>
      ))}
    </svg>
  );
}
