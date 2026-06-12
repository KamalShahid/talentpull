import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Briefcase, HardHat, Wrench, Calculator, Shield, Check,
} from 'lucide-react';
import { cn } from '../../lib/utils.js';

const ICON_MAP = {
  briefcase: Briefcase,
  'hard-hat': HardHat,
  wrench: Wrench,
  calculator: Calculator,
  shield: Shield,
};

export default function ServiceCard({ service, index = 0 }) {
  const Icon = ICON_MAP[service.icon] || Briefcase;
  const isRed = service.accent === 'red';

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className={cn(
        'group relative rounded-2xl bg-white border border-gray-100 p-7 flex flex-col h-full',
        'transition-[transform,box-shadow,border-color] duration-200 ease-out',
        'hover:-translate-y-1 hover:shadow-tp-elevated',
        isRed ? 'hover:border-tp-red/20' : 'hover:border-tp-teal/20'
      )}
    >
      {/* Icon - 56×56 with subtle brand-tinted lift shadow */}
      <div
        className={cn(
          'inline-flex h-14 w-14 items-center justify-center rounded-xl mb-5',
          isRed
            ? 'bg-gradient-to-br from-tp-red-50 to-tp-red-100 text-tp-red'
            : 'bg-gradient-to-br from-tp-teal-50 to-tp-teal-100 text-tp-teal-700'
        )}
        style={{
          boxShadow: isRed
            ? '0 2px 8px rgba(217, 27, 78, 0.15)'
            : '0 2px 8px rgba(23, 184, 206, 0.15)',
        }}
      >
        <Icon className="h-7 w-7" strokeWidth={1.8} />
      </div>

      <h3 className="font-display text-xl font-bold text-tp-dark mb-2 tracking-display-tight">
        {service.title}
      </h3>
      <p className="text-[15px] text-tp-dark/70 leading-relaxed mb-5">
        {service.summary}
      </p>

      {/* Bullets with brand-colored check icons */}
      {service.tileBullets && (
        <ul className="space-y-2 mb-5 text-sm text-tp-dark/75">
          {service.tileBullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <Check
                className={cn(
                  'h-3.5 w-3.5 mt-1 flex-shrink-0',
                  isRed ? 'text-tp-red' : 'text-tp-teal-700'
                )}
                strokeWidth={2.5}
              />
              <span className="leading-snug">{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA - brand color on hover, animated arrow */}
      <Link
        to={service.tileCta.to}
        className={cn(
          'inline-flex items-center gap-1.5 text-sm font-semibold text-tp-dark transition-colors',
          isRed ? 'group-hover:text-tp-red' : 'group-hover:text-tp-teal-700'
        )}
      >
        {service.tileCta.label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>

      {/* Best For - pinned to the bottom, separated by a divider */}
      {service.bestFor && (
        <div className="mt-auto pt-5 border-t border-gray-100 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span className="text-[10px] uppercase tracking-[0.16em] text-tp-dark/45 font-semibold">
            Best for
          </span>
          <span
            className={cn(
              'inline-block text-xs font-medium px-2.5 py-1 rounded-full',
              isRed ? 'bg-tp-red/[0.06] text-tp-red' : 'bg-tp-teal/[0.06] text-tp-teal-700'
            )}
          >
            {service.bestFor}
          </span>
        </div>
      )}
    </motion.div>
  );
}
