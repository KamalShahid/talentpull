import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Sparkles, Zap, Factory, Truck, HardHat, ShoppingBag, Briefcase,
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

const quickLinks = [
  { label: 'Staffing Solutions',     to: '/workforce-solutions' },
  { label: 'Payroll and Compliance', to: '/workforce-solutions/payroll-solutions' },
  { label: 'Bookkeeping',            to: '/workforce-solutions/financial-support' },
  { label: 'Health & Safety',        to: '/workforce-solutions/health-safety' },
];

export default function Industries() {
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
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.18em] font-semibold"
          >
            <Sparkles className="h-3 w-3 text-tp-teal" /> Sectors We Serve
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-bold tracking-display-tight mt-5 text-4xl md:text-6xl leading-[1.05] max-w-3xl"
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
              return (
                <motion.div
                  key={ind.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="group relative rounded-2xl bg-white border border-tp-fog p-7 hover:border-tp-dark/15 hover:shadow-tp-elevated transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div
                    aria-hidden="true"
                    className={
                      'absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl ' +
                      (isRed ? 'bg-tp-red/20' : 'bg-tp-teal/20')
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
