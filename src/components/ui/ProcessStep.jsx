import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Users, Handshake, LifeBuoy } from 'lucide-react';

const ICON_MAP = {
  search: Search,
  users: Users,
  handshake: Handshake,
  'life-buoy': LifeBuoy,
};

export default function ProcessStep({ step, isLast = false }) {
  const Icon = ICON_MAP[step.icon] || Search;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    let start = null;
    const duration = 700;
    const target = step.step;
    function frame(t) {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [inView, step.step]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (step.step - 1) * 0.15 }}
      className="relative"
    >
      {/* Connecting line on desktop (horizontal layout) */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-7 left-[calc(50%+44px)] right-[-50%] h-px bg-gradient-to-r from-tp-fog via-tp-fog to-transparent"
        />
      )}

      <div className="flex flex-col items-center text-center">
        {/* Step number badge with count-up */}
        <div className="relative mb-5">
          <div className="h-14 w-14 rounded-full bg-tp-darker text-white flex items-center justify-center font-display text-xl font-bold shadow-tp-soft tabular-nums">
            {String(count).padStart(2, '0')}
          </div>
          <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-tp-red text-white flex items-center justify-center">
            <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
          </div>
        </div>

        <h3 className="font-display text-lg font-bold text-tp-dark mb-2 max-w-xs">
          {step.title}
        </h3>
        <p className="text-[14.5px] text-tp-dark/65 leading-relaxed max-w-xs">
          {step.body}
        </p>
      </div>
    </motion.div>
  );
}
