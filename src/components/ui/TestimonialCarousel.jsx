import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialCarousel({ testimonials, autoplayMs = 6000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const timer = useRef(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(() => setIndex((i) => (i + 1) % total), autoplayMs);
    return () => clearTimeout(timer.current);
  }, [index, paused, autoplayMs, total]);

  const go = (dir) => setIndex((i) => (i + dir + total) % total);
  const current = testimonials[index];

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative rounded-3xl bg-white border border-tp-fog shadow-tp-elevated p-8 md:p-12 overflow-hidden">
        <Quote
          className="absolute -top-4 -right-2 h-32 w-32 text-tp-red/5"
          strokeWidth={1}
          aria-hidden="true"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="flex items-center gap-1 mb-5" aria-label={`${current.rating} out of 5 stars`}>
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-tp-red fill-tp-red" strokeWidth={0} />
              ))}
            </div>
            <p className="font-display text-xl md:text-2xl text-tp-dark leading-relaxed tracking-display-tight text-balance">
              “{current.quote}”
            </p>
            <div className="mt-7 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-tp-red to-tp-teal flex items-center justify-center text-white font-bold text-lg">
                {current.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-tp-dark">{current.name}</div>
                <div className="text-sm text-tp-dark/60">{current.label}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={
                'h-2 rounded-full transition-all duration-300 ' +
                (i === index ? 'w-8 bg-tp-red' : 'w-2 bg-tp-fog hover:bg-tp-dark/30')
              }
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-tp-fog hover:border-tp-red hover:text-tp-red text-tp-dark transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-tp-fog hover:border-tp-red hover:text-tp-red text-tp-dark transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
