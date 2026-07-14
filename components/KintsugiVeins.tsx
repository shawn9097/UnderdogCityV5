'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Kintsugi crack veins — thin, slow, elegant gold fractures that draw
 * themselves in as the section scrolls into view. Decorative only.
 */
export default function KintsugiVeins({
  className = '',
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  const reduce = useReducedMotion();

  const paths = [
    'M0 34 L96 30 L142 44 L198 38 L236 52 L318 46 L364 60 L460 54',
    'M142 44 L156 18 L214 8',
    'M236 52 L252 78 L330 92 L392 86',
    'M318 46 L336 24 L404 16 L460 22',
  ];

  return (
    <svg
      viewBox="0 0 460 100"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={`${className} ${flip ? '-scale-x-100' : ''}`}
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={i === 0 ? 'var(--gold)' : 'var(--gold)'}
          strokeWidth={i === 0 ? 1.2 : 0.7}
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 2.4 + i * 0.5, delay: i * 0.35, ease: 'easeInOut' }}
          style={{ opacity: i === 0 ? 0.7 : 0.45 }}
        />
      ))}
      {/* faint molten highlights where the fracture is deepest */}
      <motion.circle
        cx="236"
        cy="52"
        r="1.4"
        fill="var(--gold-glow)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 2 }}
      />
    </svg>
  );
}
