import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Full-bleed dark stats strip with count-up numbers and a continuous diagonal
 * shimmer sweep. Used on the Workforce Solutions page directly under the hero.
 *
 *   Each stat's number counts from 0 → target over 2000ms with ease-out cubic
 *   when the bar first enters the viewport (once only).
 *
 *   On md+ a soft white diagonal light sweep loops across the bar starting
 *   ~3s after entry (count-up duration + a 1s rest). Decorative only:
 *   pointer-events-none, max ~6% opacity.
 */

const STATS = [
  { value: 500, suffix: '+',      label: 'Placements per year' },
  { value: 48,  suffix: ' hours', label: 'Average time-to-shortlist' },
  { value: 95,  suffix: '%',      label: 'Client retention rate' },
  { value: 12,  suffix: '+',      label: 'Industries served' },
];

const COUNTUP_MS = 2000;

function CountUp({ target, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    let start = null;
    function frame(t) {
      if (start === null) start = t;
      const p = Math.min((t - start) / COUNTUP_MS, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [inView, target]);

  return <>{count}{suffix}</>;
}

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative bg-tp-darker text-white overflow-hidden py-8 md:py-12"
    >
      {/* Diagonal light sweep - desktop only, kicks in once the count-up is done */}
      <motion.div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
        }}
        initial={{ x: '-100%', opacity: 0 }}
        animate={
          inView
            ? { x: '100%', opacity: [0, 0.06, 0] }
            : { x: '-100%', opacity: 0 }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
          delay: 3, // 2s count-up + 1s pause
        }}
      />

      <div className="relative grid grid-cols-2 md:grid-cols-4">
        {STATS.map((stat, i) => {
          // Item at index 2 starts a new row on mobile (no left border there),
          // but sits in col 3 of row 1 on desktop (with left border).
          const borderClass =
            i === 0
              ? ''
              : i === 2
                ? 'md:border-l md:border-white/15'
                : 'border-l border-white/15';
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
              className={`text-center px-6 ${borderClass}`}
            >
              <div className="font-display text-[2rem] md:text-[2.5rem] font-extrabold tracking-[-0.02em] leading-none">
                <CountUp target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="mt-2 text-sm font-normal text-white/70 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
