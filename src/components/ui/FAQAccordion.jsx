import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="divide-y divide-tp-fog border-y border-tp-fog">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-start justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display font-semibold text-tp-dark text-[17px] md:text-lg leading-snug">
                {item.q}
              </span>
              <Plus
                className={
                  'h-5 w-5 mt-1 flex-shrink-0 transition-transform duration-300 ' +
                  (isOpen ? 'rotate-45 text-tp-red' : 'text-tp-dark/60')
                }
                strokeWidth={2}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-10 text-tp-dark/75 leading-relaxed text-[15px]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
