import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Check, Quote, TrendingUp, Sparkles,
} from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import FAQAccordion from '../ui/FAQAccordion.jsx';
import { cn } from '../../lib/utils.js';

// Slug → real hero photo. Lives in the template so services.js doesn't need
// a new field. URL-encoded paths because the files live in /public.
const HERO_IMAGE_MAP = {
  'professional-staffing': '/brand_assets/ProfessionalStaffing.jpg',
  'industrial-staffing':   '/brand_assets/SkilledTrades.jpg',
  'payroll-solutions':     '/brand_assets/Payroll.jpg',
  'financial-support':     '/brand_assets/Financial.png',
  'health-safety':         '/brand_assets/HealthSafety.png',
};

export default function ServicePageTemplate({ service }) {
  const isRed = service.accent === 'red';
  const heroImage = HERO_IMAGE_MAP[service.slug];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-tp-darker text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(217,27,78,0.18) 0%, transparent 60%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(23,184,206,0.14) 0%, transparent 60%)' }}
        />
        <div className="container-tp relative z-10 pt-16 pb-20 md:pt-20 md:pb-28">
          <Link
            to="/workforce-solutions"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> All Workforce Solutions
          </Link>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.18em] font-semibold"
              >
                <Sparkles className="h-3 w-3 text-tp-red" /> Workforce Solution
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="font-display font-bold tracking-display-tight text-balance mt-5 text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
              >
                {service.hero.headline}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="mt-5 text-xl text-white/85 font-display leading-snug"
              >
                {service.hero.subtext}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="mt-4 text-white/70 leading-relaxed max-w-xl"
              >
                {service.hero.body}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24 }}
                className="mt-8"
              >
                <Link to={service.cta.to} className="btn-primary">
                  {service.cta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>

            {/* Hero photo — replaces the old icon card. Same position, square aspect,
                same 2.5rem rounded corners, no overlay / filter / blend / border. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative aspect-square max-w-sm mx-auto rounded-[2.5rem] overflow-hidden">
                <img
                  src={heroImage}
                  alt={service.hero.headline}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What We Cover ────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-tp">
          <SectionHeader eyebrow="WHAT WE COVER" title="Services we support" align="left" />
          {/* lg uses a 6-col grid where each tile spans 2 cols (visually 3 per row
              at the same width as a 3-col layout). The 6-col base lets us
              col-start-shift the first tile of an incomplete last row so 1
              or 2 leftover tiles are centered rather than left-justified. */}
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4 max-w-5xl">
            {service.whatWeCover.map((item, i) => {
              // Support both shapes:
              //   - 'string'  → single-line bullet (industrial / payroll / etc.)
              //   - { label, description }  → titled tile with body copy (professional)
              const label = typeof item === 'string' ? item : item.label;
              const description = typeof item === 'string' ? null : item.description;

              // Center the first tile of an incomplete last row.
              const total = service.whatWeCover.length;
              const tilesInLastRow = total % 3 === 0 ? 3 : total % 3;
              const lastRowStartIdx = total - tilesInLastRow;
              let lgStart = '';
              if (i === lastRowStartIdx) {
                if (tilesInLastRow === 1) lgStart = 'lg:col-start-3'; // 1 lone tile → middle (cols 3-4)
                else if (tilesInLastRow === 2) lgStart = 'lg:col-start-2'; // 2 tiles → cols 2-3 and 4-5
              }
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={cn(
                    'lg:col-span-2 flex items-start gap-3 rounded-xl border border-tp-fog bg-white p-5 hover:border-tp-red/20 hover:shadow-tp-soft transition-[border-color,box-shadow]',
                    lgStart
                  )}
                >
                  <span className={'mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg flex-shrink-0 ' + (isRed ? 'bg-tp-red-50 text-tp-red' : 'bg-tp-teal-50 text-tp-teal-700')}>
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <div className="flex-1">
                    <p className="text-tp-dark font-semibold leading-snug">{label}</p>
                    {description && (
                      <p className="mt-1.5 text-[14px] text-tp-dark/65 leading-relaxed">
                        {description}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional services (only some pages) */}
          {service.additionalServices && (
            <div className="mt-12 rounded-2xl bg-tp-mist p-8 max-w-5xl">
              <h3 className="font-display text-lg font-bold text-tp-dark mb-4">Additional services</h3>
              <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                {service.additionalServices.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-tp-dark/80">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tp-red flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ── How We Work ──────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-tp-mist">
        <div className="container-tp">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="eyebrow">HOW WE WORK</span>
            <Quote className="h-12 w-12 text-tp-red/30 mx-auto mt-6" strokeWidth={1} />
            <p className="font-display text-3xl md:text-4xl font-bold tracking-display-tight text-tp-dark mt-4 text-balance leading-tight">
              "{service.howWeWork.pullQuote}"
            </p>
            <p className="mt-6 text-lg text-tp-dark/70 leading-relaxed text-balance">
              {service.howWeWork.body}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Key Metrics ──────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-tp">
          <SectionHeader eyebrow="KEY OUTCOMES" title="What our partners typically see" />
          {/* Center the grid when there are only 2 metrics (Payroll, Financial) so they
              don't sit awkwardly in the first two cells of a 3-col grid. */}
          <div
            className={
              service.keyMetrics.length === 2
                ? 'grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto'
                : 'grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto'
            }
          >
            {service.keyMetrics.map((m, i) => (
              <motion.div
                key={m}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-tp-fog bg-gradient-to-br from-white to-tp-mist p-6 hover:shadow-tp-soft transition-shadow"
              >
                <TrendingUp className={'h-6 w-6 mb-3 ' + (isRed ? 'text-tp-red' : 'text-tp-teal-700')} strokeWidth={2} />
                <p className="text-[15px] font-semibold text-tp-dark leading-snug">{m}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-tp-mist">
        <div className="container-tp max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
          <FAQAccordion items={service.faq} />
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-tp-darker text-white">
        <div className="container-tp text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="font-display text-3xl md:text-5xl font-bold tracking-display-tight text-balance"
          >
            Ready to move forward with{' '}
            <span className="gradient-text">{service.title}?</span>
          </motion.h2>
          <p className="mt-5 text-white/70 max-w-2xl mx-auto leading-relaxed">
            Tell us about your workforce needs and we'll get back within one business day.
          </p>
          <div className="mt-8">
            <Link to={service.cta.to} className="btn-primary">
              {service.cta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
