import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils.js';
import {
  ArrowRight, Zap, Factory, Truck, HardHat, ShoppingBag, Briefcase,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import { industries } from '../data/industries.js';

const ICON_MAP = {
  'energy-utilities':      Zap,
  'manufacturing-industrial': Factory,
  'warehousing-logistics': Truck,
  'construction-trades':   HardHat,
  'retail-consumer':       ShoppingBag,
  'professional-services': Briefcase,
};

// Each card's root id matches what the Home page industry tiles link to.
// Some labels (real-estate, recycling-waste, etc.) intentionally have no
// matching card right now - those hashes simply find nothing.
const SLUG_TO_HASH = {
  'energy-utilities':         'energy-utilities',
  'manufacturing-industrial': 'manufacturing',
  'warehousing-logistics':    'warehousing-logistics',
  'construction-trades':      'construction-skilled-trades',
  'retail-consumer':          'retail-consumer',
  'professional-services':    'professional-services',
};

// Existing navbar links use the data-file slug as the hash. Translate those
// to the new card ids so the navbar keeps working.
const HASH_ALIASES = {
  'manufacturing-industrial': 'manufacturing',
  'construction-trades':      'construction-skilled-trades',
};

const quickLinks = [
  { label: 'Staffing Solutions',     to: '/workforce-solutions' },
  { label: 'Payroll and Compliance', to: '/workforce-solutions/payroll-solutions' },
  { label: 'Bookkeeping',            to: '/workforce-solutions/financial-support' },
  { label: 'Health & Safety',        to: '/workforce-solutions/health-safety' },
];

export default function Industries() {
  const { hash } = useLocation();
  // Temporary highlight that self-clears after 2.5s - see the useEffect below.
  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    const rawHash = hash ? hash.slice(1) : '';
    if (!rawHash) { setHighlightedId(null); return; }

    const resolved = HASH_ALIASES[rawHash] || rawHash;
    const exists = Object.values(SLUG_TO_HASH).includes(resolved);
    if (!exists) return;   // hash like #real-estate has no card → no-op

    setHighlightedId(resolved);

    // Wait for layout to settle, then smooth-scroll the matched card into the
    // viewport center, then fade the highlight back out at the 2.5s mark.
    const scrollTimer = setTimeout(() => {
      document.getElementById(resolved)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 300);
    const clearTimer = setTimeout(() => setHighlightedId(null), 2500);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(clearTimer);
    };
  }, [hash]);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-tp-darker text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(23,184,206,0.18) 0%, transparent 60%)' }}
        />
        <div className="container-tp relative z-10 pt-16 pb-20 md:pt-24 md:pb-28">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-bold tracking-display-tight text-4xl md:text-6xl leading-[1.05] max-w-3xl"
          >
            Industries <span className="gradient-text">We Serve</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-xl text-white/80 max-w-2xl leading-relaxed"
          >
            At Talent Pull, we work with businesses across the following sectors:
          </motion.p>
        </div>
      </section>

      {/* Industry cards */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-tp">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => {
              const Icon = ICON_MAP[ind.slug] || Factory;
              const isRed = i % 2 === 0;
              const cardId = SLUG_TO_HASH[ind.slug] || ind.slug;
              const isHighlighted = highlightedId === cardId;
              return (
                <motion.div
                  key={ind.slug}
                  id={cardId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className={cn(
                    'group relative rounded-2xl p-7 border overflow-hidden scroll-mt-24',
                    'transition-[border-color,box-shadow,transform,background-color] duration-[600ms] ease-out',
                    'hover:-translate-y-1 hover:shadow-tp-elevated',
                    isHighlighted
                      ? 'border-tp-red bg-tp-red/[0.06]'
                      : 'border-tp-fog bg-white hover:border-tp-dark/15'
                  )}
                >
                  <div
                    aria-hidden="true"
                    className={
                      'absolute -top-10 -right-10 h-32 w-32 rounded-full transition-opacity duration-500 blur-2xl ' +
                      (isRed ? 'bg-tp-red/20' : 'bg-tp-teal/20') +
                      ' opacity-0 group-hover:opacity-100'
                    }
                  />
                  <div
                    className={
                      'relative inline-flex h-14 w-14 items-center justify-center rounded-xl mb-5 ' +
                      (isRed ? 'bg-tp-red-50 text-tp-red' : 'bg-tp-teal-50 text-tp-teal-700')
                    }
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.6} />
                  </div>
                  <h3 className="relative font-display text-xl font-bold text-tp-dark mb-3 tracking-display-tight">
                    {ind.title}
                  </h3>
                  <p className="relative text-[15px] text-tp-dark/70 leading-relaxed">
                    {ind.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <Link to="/contact" className="btn-primary">
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick-links panel */}
      <section className="py-16 md:py-20 bg-tp-mist">
        <div className="container-tp">
          <SectionHeader
            eyebrow="QUICK LINKS"
            title="Looking for something specific?"
            sub="Jump directly to the workforce solution that fits your need."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {quickLinks.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  to={l.to}
                  className="group flex items-center justify-between gap-3 rounded-xl bg-white border border-tp-fog p-5 hover:border-tp-teal hover:shadow-tp-soft transition-[border-color,box-shadow,transform] hover:-translate-y-0.5"
                >
                  <span className="font-semibold text-tp-dark leading-snug">{l.label}</span>
                  <ArrowRight className="h-4 w-4 text-tp-dark/40 group-hover:text-tp-teal group-hover:translate-x-0.5 transition-[color,transform]" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
