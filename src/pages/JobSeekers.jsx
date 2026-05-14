import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Sparkles, Search, FileText, MessageSquare, BadgeCheck,
  Zap, Target, Heart, Eye, Send,
} from 'lucide-react';

import SectionHeader from '../components/ui/SectionHeader.jsx';
import JobCard from '../components/ui/JobCard.jsx';
import ApplyModal from '../components/ui/ApplyModal.jsx';
import FAQAccordion from '../components/ui/FAQAccordion.jsx';
import { jobs } from '../data/jobs.js';
import { jobSeekerFaqs } from '../data/faqs.js';

const benefits = [
  'Personalized job matching based on your experience and goals',
  'Access to exclusive roles not posted publicly',
  'Faster hiring process through direct employer connections',
  'Resume and interview support to improve your chances',
  'Ongoing career guidance even after placement',
];

const jobTypes = [
  'Accounting & Finance',
  'HR, Safety & Compliance',
  'Technology (Frontend, Backend, Full Stack, DevOps)',
  'Administrative & Office Support',
  'Skilled Trades & Industrial',
  'Customer Service & Operations',
  'General Labour',
];

const whyChoose = [
  { icon: Zap,    title: 'Faster Results',     body: 'Our streamlined process reduces time-to-hire so you can start working sooner.' },
  { icon: Target, title: 'Better Matches',     body: 'Quality over quantity — sending you roles that actually fit.' },
  { icon: Heart,  title: 'Real Human Support', body: 'No bots pushing resumes. Our recruiters guide you at every step.' },
  { icon: Eye,    title: 'Transparent Process',body: 'You\'ll always know where you stand and what comes next.' },
];

const howToApply = [
  { icon: FileText,      title: 'Submit your resume' },
  { icon: MessageSquare, title: 'Speak with one of our recruiters' },
  { icon: Search,        title: 'Get matched with relevant opportunities' },
  { icon: BadgeCheck,    title: 'Interview and get hired' },
];

const CATEGORY_FILTERS = [
  { id: 'all',           label: 'All Jobs' },
  { id: 'professional',  label: 'Professional' },
  { id: 'industrial',    label: 'Industrial' },
  { id: 'trades',        label: 'Skilled Trades' },
];

export default function JobSeekers() {
  const [filter, setFilter] = useState('all');
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyJob, setApplyJob] = useState(null);

  const filtered = useMemo(
    () => (filter === 'all' ? jobs : jobs.filter((j) => j.category === filter)),
    [filter]
  );

  const openApply = (job = null) => { setApplyJob(job); setApplyOpen(true); };

  return (
    <>
      {/* ── Section 2.1 + intro CTA cards ──────────────────────── */}
      <section className="relative bg-tp-darker text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(23,184,206,0.18) 0%, transparent 60%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(217,27,78,0.18) 0%, transparent 60%)' }}
        />
        <div className="container-tp relative z-10 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.18em] font-semibold"
              >
                <Sparkles className="h-3 w-3 text-tp-teal" /> For Job Seekers
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="font-display font-bold tracking-display-tight text-balance mt-5 text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
              >
                Find the Right Opportunity{' '}
                <span className="gradient-text">Faster</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-5 text-lg text-white/80 leading-relaxed max-w-xl"
              >
                At Talent Pull, we help job seekers connect with opportunities that match their skills, experience, and career goals. Whether you're actively looking or just exploring options, our approach combines smart technology with real human insight to get you hired faster.
              </motion.p>
            </div>

            {/* Right CTA cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-4"
            >
              <a
                href="#jobs"
                className="group block rounded-2xl bg-white/5 backdrop-blur-sm border border-white/15 p-6 hover:bg-white/10 hover:border-tp-teal transition-[background,border-color]"
              >
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-tp-teal/20 text-tp-teal flex items-center justify-center flex-shrink-0">
                    <Search className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold mb-1">Browse Open Jobs</h3>
                    <p className="text-sm text-white/65 mb-3 leading-relaxed">
                      Explore {jobs.length} current openings across professional, industrial, and skilled trades roles.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-tp-teal group-hover:gap-2.5 transition-all">
                      View Jobs <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
              <button
                type="button"
                onClick={() => openApply()}
                className="group block w-full text-left rounded-2xl bg-white/5 backdrop-blur-sm border border-white/15 p-6 hover:bg-white/10 hover:border-tp-red transition-[background,border-color]"
              >
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-tp-red/20 text-tp-red flex items-center justify-center flex-shrink-0">
                    <Send className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold mb-1">Submit Your Resume</h3>
                    <p className="text-sm text-white/65 mb-3 leading-relaxed">
                      Not sure which role fits? Submit your resume and we'll match you with the right opportunities.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-tp-red group-hover:gap-2.5 transition-all">
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2.2 — Browse Jobs ──────────────────────────── */}
      <section id="jobs" className="py-20 md:py-24 bg-white scroll-mt-20">
        <div className="container-tp">
          <SectionHeader
            eyebrow="OPEN POSITIONS"
            title="Browse Open Jobs"
            sub={`${jobs.length} active roles across professional, industrial, and skilled trades.`}
          />

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORY_FILTERS.map((c) => {
              const isActive = filter === c.id;
              const count = c.id === 'all' ? jobs.length : jobs.filter((j) => j.category === c.id).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilter(c.id)}
                  className={
                    'inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-colors duration-200 ' +
                    (isActive
                      ? 'bg-tp-dark text-white border-tp-dark'
                      : 'bg-white text-tp-dark/75 border-tp-fog hover:border-tp-dark/30 hover:text-tp-dark')
                  }
                >
                  {c.label}
                  <span className={'rounded-full px-1.5 py-0.5 text-[11px] ' + (isActive ? 'bg-white/15' : 'bg-tp-mist')}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {filtered.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} onApply={openApply} />
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-tp-dark/60 py-10">No jobs in this category right now.</p>
            )}
          </div>
        </div>
      </section>

      {/* ── Section 2.4 — How Talent Pull Helps You Get Hired ──── */}
      <section className="py-20 md:py-28 bg-tp-mist">
        <div className="container-tp">
          <SectionHeader
            eyebrow="HOW WE HELP"
            title="How Talent Pull Helps You Get Hired"
            sub="We go beyond job boards. Our recruiters work closely with employers to understand exactly what they need — so when we match you with a role, it's a meaningful fit."
          />

          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            {/* Benefits */}
            <div>
              <h3 className="font-display text-xl font-bold text-tp-dark mb-5 tracking-display-tight">
                What you get
              </h3>
              <ul className="space-y-3">
                {benefits.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-start gap-3 bg-white rounded-xl p-4 border border-tp-fog"
                  >
                    <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-tp-teal-50 text-tp-teal-700 flex-shrink-0">
                      <BadgeCheck className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    <span className="text-tp-dark/80 leading-snug text-[15px]">{b}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Job types */}
            <div>
              <h3 className="font-display text-xl font-bold text-tp-dark mb-5 tracking-display-tight">
                Types of jobs we recruit for
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {jobTypes.map((t) => (
                  <span
                    key={t}
                    className="inline-flex px-3 py-1.5 rounded-full bg-white border border-tp-fog text-[13.5px] font-medium text-tp-dark/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-sm text-tp-dark/60 italic">Contract, temporary, or full-time</p>
            </div>
          </div>

          {/* Why job seekers choose Talent Pull */}
          <h3 className="text-center font-display text-2xl md:text-3xl font-bold text-tp-dark mb-8 tracking-display-tight">
            Why Job Seekers Choose Talent Pull
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChoose.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="rounded-2xl bg-white border border-tp-fog p-6 hover:shadow-tp-soft transition-shadow"
                >
                  <div className={'inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4 ' + (i % 2 === 0 ? 'bg-tp-red-50 text-tp-red' : 'bg-tp-teal-50 text-tp-teal-700')}>
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h4 className="font-display font-bold text-tp-dark mb-2 text-lg">{w.title}</h4>
                  <p className="text-sm text-tp-dark/65 leading-relaxed">{w.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How to Apply numbered steps ────────────────────────── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-tp">
          <SectionHeader eyebrow="HOW TO APPLY" title="Four steps to get started" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 max-w-6xl mx-auto">
            {howToApply.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="text-center"
                >
                  <div className="relative inline-block mb-5">
                    <div className="h-14 w-14 rounded-full bg-tp-darker text-white flex items-center justify-center font-display text-lg font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-tp-red text-white flex items-center justify-center">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </div>
                  </div>
                  <p className="font-display font-bold text-tp-dark text-base max-w-[200px] mx-auto leading-snug">
                    {s.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-tp-mist">
        <div className="container-tp max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
          <FAQAccordion items={jobSeekerFaqs} />
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-tp-darker text-white text-center">
        <div className="container-tp">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="font-display text-3xl md:text-5xl font-bold tracking-display-tight text-balance"
          >
            Apply now and get matched with{' '}
            <span className="gradient-text">top employers</span>
          </motion.h2>
          <div className="mt-8">
            <button type="button" onClick={() => openApply()} className="btn-primary">
              Submit Your Resume <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} jobTitle={applyJob?.title} />
    </>
  );
}
