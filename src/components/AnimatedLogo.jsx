import { motion, useAnimationControls } from 'motion/react';

export const LOGO_A = 'M64 374 L156 140 L248 374';
export const LOGO_S =
  'M440 182 C426 154 398 140 366 140 C328 140 302 162 302 196 C302 232 334 246 370 256 C410 268 448 284 448 322 C448 356 418 374 378 374 C344 374 314 360 298 332';

/**
 * mode="draw": A draws, then S, then the dot springs in (Loader, task 34)
 * mode="static": tile logo; the dot bounces on hover (Navbar, task 58)
 */
export default function AnimatedLogo({ size = 40, mode = 'static', className = '' }) {
  const dot = useAnimationControls();
  const draw = mode === 'draw';
  const stroke = { fill: 'none', stroke: '#fff', strokeWidth: 46, strokeLinecap: 'round', strokeLinejoin: 'round' };

  return (
    <motion.svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      onHoverStart={() => !draw && dot.start({ y: [0, -70, 0, -24, 0], transition: { duration: 0.7 } })}
    >
      <defs>
        <linearGradient id={`lg-${mode}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#11858d" />
          <stop offset="1" stopColor="#083b40" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill={`url(#lg-${mode})`} />
      <motion.path
        d={LOGO_A}
        {...stroke}
        initial={draw ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.path
        d={LOGO_S}
        {...stroke}
        initial={draw ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.75, ease: 'easeInOut' }}
      />
      <motion.g animate={dot}>
        <motion.circle
          cx={156}
          cy={296}
          r={22}
          fill="#ff7a4d"
          style={{ originX: '156px', originY: '296px' }}
          initial={draw ? { scale: 0 } : false}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6, type: 'spring', stiffness: 400, damping: 9 }}
        />
      </motion.g>
    </motion.svg>
  );
}
