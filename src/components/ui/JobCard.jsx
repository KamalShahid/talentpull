import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, DollarSign, Briefcase, ChevronDown, ArrowRight, Check } from 'lucide-react';
import { diversityStatement } from '../../data/jobs.js';

const CATEGORY_COLOR = {
  professional: { bg: 'bg-tp-red-50',  text: 'text-tp-red',       label: 'Professional' },
  industrial:   { bg: 'bg-tp-teal-50', text: 'text-tp-teal-700',  label: 'Industrial' },
  trades:       { bg: 'bg-tp-red-50',  text: 'text-tp-red',       label: 'Skilled Trades' },
};

export default function JobCard({ job, index = 0, onApply }) {
  const [open, setOpen] = useState(false);
  const cat = CATEGORY_COLOR[job.category] || CATEGORY_COLOR.professional;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3) }}
      className={
        'rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 ' +
        (open ? 'border-tp-red/30 shadow-tp-elevated' : 'border-tp-fog hover:border-tp-dark/15 hover:shadow-tp-soft')
      }
    >
      {/* Compact header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left p-6 md:p-7 flex flex-col gap-4"
        aria-expanded={open}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${cat.bg} ${cat.text}`}>
                {cat.label}
              </span>
              <span className="text-xs text-tp-dark/50">{job.industry}</span>
            </div>
            <h3 className="font-display text-xl md:text-[22px] font-bold text-tp-dark tracking-display-tight leading-snug">
              {job.title}
            </h3>
          </div>
          <ChevronDown
            className={'h-5 w-5 mt-2 flex-shrink-0 text-tp-dark/40 transition-transform duration-300 ' + (open ? 'rotate-180 text-tp-red' : '')}
          />
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-tp-dark/70">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
          <span className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{job.type}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{job.mode}</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-tp-dark"><DollarSign className="h-4 w-4 text-tp-red" />{job.pay}</span>
        </div>
      </button>

      {/* Expanded body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-7 pb-7 pt-1 border-t border-tp-fog">
              <p className="text-tp-dark/75 leading-relaxed mt-5 mb-7">
                {job.intro}
              </p>

              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-tp-red mb-3">
                Key Responsibilities
              </h4>
              <ul className="space-y-2.5 mb-7">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-tp-dark/75 text-[15px] leading-relaxed">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-tp-red flex-shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-tp-teal-700 mb-3">
                Requirements
              </h4>
              <ul className="space-y-2 mb-7">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-tp-dark/75 text-[15px] leading-relaxed">
                    <Check className="h-4 w-4 mt-1 text-tp-teal-700 flex-shrink-0" strokeWidth={2.5} />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              {job.shift && (
                <p className="text-sm text-tp-dark/60 mb-5">
                  <strong className="text-tp-dark">Shift:</strong> {job.shift}
                </p>
              )}

              <div className="rounded-xl bg-tp-mist p-5 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-tp-dark/70 mb-2">
                  Diversity & Inclusion
                </h4>
                <p className="text-[14px] text-tp-dark/70 leading-relaxed">
                  {diversityStatement}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onApply?.(job)}
                className="btn-primary w-full sm:w-auto"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
