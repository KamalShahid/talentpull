import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Check, Sparkles, Zap, Users, Clock, Heart, ShieldCheck,
  Bot, Rocket, UserCheck, Layers,
  ClipboardList, Search, Briefcase, HeartHandshake,
} from 'lucide-react';

import SectionHeader from '../components/ui/SectionHeader.jsx';
import ServiceCard from '../components/ui/ServiceCard.jsx';
import AnchorCard from '../components/ui/AnchorCard.jsx';
import RadialOrbitalTimeline from '../components/ui/radial-orbital-timeline.jsx';
import ProcessStep from '../components/ui/ProcessStep.jsx';
import IndustryTile from '../components/ui/IndustryTile.jsx';
import TestimonialCarousel from '../components/ui/TestimonialCarousel.jsx';

import { services } from '../data/services.js';
import { testimonials } from '../data/testimonials.js';
import { process as steps } from '../data/process.js';
import { homeIndustryTiles } from '../data/industries.js';

const aiFeatures = [
  { icon: Bot,        title: 'Smarter Candidate Screening',   body: 'AI-assisted sourcing helps identify stronger candidate matches faster.' },
  { icon: Rocket,     title: 'Faster Workforce Deployment',   body: 'Reduce hiring delays and fill important positions more efficiently.' },
  { icon: Users,      title: 'Human-Led Recruiting',          body: 'Every shortlist is reviewed by experienced recruiters — not just algorithms.' },
  { icon: Layers,     title: 'Flexible Hiring Support',       body: 'From individual hires to ongoing workforce needs, we scale with your business.' },
];

const trustItems = [
  'Faster hiring turnaround',
  'Flexible workforce support',
  'Dedicated recruiter communication',
  'Professional and industrial staffing expertise',
  'Scalable hiring support for growing businesses',
];

// 5-step orbital timeline rendered inside the Advantage section grid.
const hiringProcessTimeline = [
  { id: 1, title: 'Understand', date: 'Step 1', category: 'Discovery',
    content: 'We work closely with clients to understand hiring needs, workforce expectations, timelines, and operational requirements.',
    icon: ClipboardList, relatedIds: [2], status: 'completed',  energy: 100 },
  { id: 2, title: 'Source',     date: 'Step 2', category: 'Sourcing',
    content: 'Using AI-powered sourcing and hands-on recruiting, candidates are screened based on experience, reliability, availability, and role fit.',
    icon: Search,          relatedIds: [1, 3], status: 'completed',  energy: 85  },
  { id: 3, title: 'Screen',     date: 'Step 3', category: 'Screening',
    content: 'Every shortlist is reviewed by experienced recruiters — not just algorithms — to ensure quality and long-term fit.',
    icon: UserCheck,       relatedIds: [2, 4], status: 'in-progress', energy: 70 },
  { id: 4, title: 'Place',      date: 'Step 4', category: 'Placement',
    content: 'We help streamline interviews, communication, workforce coordination, and placement timelines to move fast without losing quality.',
    icon: Briefcase,       relatedIds: [3, 5], status: 'pending',     energy: 50 },
  { id: 5, title: 'Support',    date: 'Step 5', category: 'Support',
    content: 'From workforce coordination to payroll and operational support, we help businesses maintain workforce consistency after placement.',
    icon: HeartHandshake,  relatedIds: [4],    status: 'pending',     energy: 30 },
];

// ── Decorative drifting background shape used on the Home page only ──
function FloatingBlob({ style, animate, duration, delay = 0 }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full"
      style={{ filter: 'blur(60px)', zIndex: 0, ...style }}
      animate={animate}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

// Split a string into words so each word can animate independently.
function splitWords(s) { return s.split(' '); }


export default function Home() {
  return (
    <>
      {/* ── Section 1 — Hero (Robert Half-style: dark left panel + photo right half) ── */}
      <section className="relative bg-tp-darker text-white overflow-hidden min-h-[85vh] flex items-center">
        {/* Photo on right half — desktop only, edge-to-edge */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2">
          <motion.img
            src="/brand_assets/HeroPic.jpg"
            alt=""
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'linear' }}
            className="w-full h-full object-cover object-top"
          />
          {/* Horizontal fade: dark bleeds from the left edge of the photo into transparent */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, #0F1A24 0%, rgba(15,26,36,0.55) 22%, transparent 48%)',
            }}
          />
        </div>

        {/* Mobile: photo as full-width background under a heavy dark overlay */}
        <div className="lg:hidden absolute inset-0">
          <motion.img
            src="/brand_assets/HeroPic.jpg"
            alt=""
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'linear' }}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-tp-darker/85" />
        </div>

        {/* Decorative brand-color glows on the dark text panel */}
        <div
          aria-hidden="true"
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(217,27,78,0.18) 0%, transparent 60%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(23,184,206,0.14) 0%, transparent 60%)' }}
        />

        <div className="container-tp relative z-10 w-full py-20 md:py-24">
          <div className="max-w-xl lg:max-w-[34rem]">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-xs uppercase tracking-[0.18em] font-semibold text-white/90"
            >
              <Sparkles className="h-3 w-3 text-tp-red" />
              Canadian Workforce Partner
            </motion.span>

            {/* Word-stagger headline (each word fades + lifts in sequence with spring easing) */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
              className="font-display font-bold tracking-display-tight text-balance mt-6 text-4xl md:text-6xl lg:text-7xl leading-[1.05]"
            >
              {[
                ...splitWords('Fast, Reliable Hiring for').map((w) => ({ text: w, gradient: false })),
                ...splitWords('Growing Businesses').map((w) => ({ text: w, gradient: true })),
              ].map((w, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden:  { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 18, stiffness: 110 } },
                  }}
                  className={'inline-block mr-[0.25em] ' + (w.gradient ? 'gradient-text' : '')}
                >
                  {w.text}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 space-y-3 max-w-2xl text-white/80 text-lg leading-relaxed"
            >
              <p>
                Talent Pull delivers professional, industrial, and skilled trades staffing solutions
                with the speed, responsiveness, and personalized service businesses need to scale with confidence.
              </p>
              <p>
                We combine AI-powered sourcing with hands-on recruiting to help employers
                hire faster without sacrificing quality or fit.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link to="/workforce-solutions" className="btn-primary">
                Find Talent <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/job-seekers"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 hover:border-white/50 transition-colors"
              >
                Get Hired
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2 — Employer / Job Seeker Split ────────────────── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-tp grid lg:grid-cols-2 gap-6 lg:gap-8">
          {[
            {
              label: 'FOR EMPLOYERS',
              title: 'Hire Smarter. Scale Faster.',
              body: 'From professional recruitment to industrial workforce solutions, Talent Pull helps businesses hire efficiently, reduce delays, and build reliable teams.',
              cta: { label: 'Explore Employer Solutions', to: '/workforce-solutions' },
              accent: 'red',
            },
            {
              label: 'FOR JOB SEEKERS',
              title: 'Find Work That Fits Your Skills and Goals',
              body: 'Explore temporary, contract, and permanent opportunities across professional, industrial, and skilled trades roles.',
              cta: { label: 'Explore Opportunities', to: '/job-seekers' },
              accent: 'teal',
            },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
              className={
                'relative rounded-3xl p-9 md:p-12 overflow-hidden ' +
                (card.accent === 'red'
                  ? 'bg-gradient-to-br from-tp-red-50 via-white to-white border border-tp-red/15'
                  : 'bg-gradient-to-br from-tp-teal-50 via-white to-white border border-tp-teal/15')
              }
            >
              <span className={'eyebrow ' + (card.accent === 'red' ? 'text-tp-red' : 'text-tp-teal-700')}>
                {card.label}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-display-tight text-tp-dark mt-4 max-w-md">
                {card.title}
              </h3>
              <p className="mt-4 text-tp-dark/70 leading-relaxed max-w-md">{card.body}</p>
              <Link
                to={card.cta.to}
                className={
                  'mt-7 inline-flex items-center gap-2 font-semibold ' +
                  (card.accent === 'red' ? 'text-tp-red hover:text-tp-red-700' : 'text-tp-teal-700 hover:text-tp-teal-900')
                }
              >
                {card.cta.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Section 3 — About Talent Pull ──────────────────────────── */}
      <section id="about" className="relative py-20 md:py-28 bg-tp-mist overflow-hidden">
        <FloatingBlob
          style={{ top: '8%', right: '-100px', width: 300, height: 300, background: 'rgba(217,27,78,0.06)' }}
          animate={{ y: [0, -22, 0], x: [0, 12, 0] }}
          duration={10}
        />
        <div className="container-tp relative z-10">
          <SectionHeader
            eyebrow="ABOUT TALENT PULL"
            title="Built Around Speed, Quality, and Long-Term Partnerships"
          />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-lg md:text-xl text-tp-dark/75 leading-relaxed text-balance">
              Talent Pull is a Canadian staffing and workforce solutions partner helping businesses hire faster,
              operate efficiently, and scale with confidence. From professional recruitment to industrial and
              skilled trades staffing, we provide tailored workforce solutions designed around responsiveness,
              reliability, and personalized support. Rather than operating as a high-volume staffing agency,
              our approach focuses on building strong client relationships, understanding workforce needs in detail,
              and delivering practical hiring solutions that support long-term success.
            </p>
            <div className="mt-9 text-center">
              <Link to="/#why" className="btn-primary">
                Learn More About Talent Pull <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4 — Workforce Solutions tiles ──────────────────── */}
      <section id="services" className="relative py-20 md:py-28 bg-white overflow-hidden">
        <FloatingBlob
          style={{ bottom: '8%', left: '-120px', width: 360, height: 360, background: 'rgba(23,184,206,0.05)' }}
          animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
          duration={12}
          delay={2}
        />
        <div className="container-tp relative z-10">
          <SectionHeader
            eyebrow="WORKFORCE SOLUTIONS"
            title="Workforce Solutions Designed Around Your Business"
            sub="We handle hiring, workforce management, payroll, and compliance — so you don't have to."
          />
          {/* 3 + (2 + brand anchor) asymmetric grid so the 5 tiles fill 6 cells */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard service={services[0]} index={0} />
            <ServiceCard service={services[1]} index={1} />
            <ServiceCard service={services[2]} index={2} />
            <ServiceCard service={services[3]} index={3} />
            <AnchorCard className="md:col-span-2 lg:col-span-1" delay={0.4} />
            <ServiceCard service={services[4]} index={5} />
          </div>
        </div>
      </section>

      {/* ── Section 5 — Why Businesses Choose Talent Pull ──────────── */}
      <section id="why" className="relative py-20 md:py-28 bg-tp-mist overflow-hidden">
        <FloatingBlob
          style={{ top: '20%', right: '-80px', width: 320, height: 320, background: 'rgba(217,27,78,0.05)' }}
          animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
          duration={11}
        />
        <div className="container-tp relative z-10">
          <SectionHeader
            eyebrow="WHY BUSINESSES CHOOSE TALENT PULL"
            title={<>Responsive. Reliable. <span className="gradient-text">Relationship-Driven.</span></>}
          />
          {/* Full-width orbital timeline — replaces the previous 5-card grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            <RadialOrbitalTimeline
              items={hiringProcessTimeline}
              className="bg-transparent h-[420px] md:h-[500px] lg:h-[600px]"
              orbitRadius={140}
            />
          </motion.div>
          <div className="mt-12 text-center">
            <Link to="/contact" className="btn-primary">
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 6 — Testimonials ───────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-tp">
          <SectionHeader
            eyebrow="SUCCESS STORIES"
            title="Employers and job seekers trust Talent Pull to deliver results — every time"
            sub="Built around speed, quality, and workforce reliability. Talent Pull combines AI-powered sourcing with hands-on recruiting to help businesses reduce hiring delays and connect with qualified talent faster."
          />
          <TestimonialCarousel testimonials={testimonials} autoplayMs={5000} />
        </div>
      </section>

      {/* ── Section 7 — Our Process ────────────────────────────────── */}
      <section id="process" className="py-20 md:py-28 bg-tp-mist">
        <div className="container-tp">
          <SectionHeader
            eyebrow="OUR PROCESS"
            title="A Structured Approach to Better Hiring"
            sub="We combine technology, workforce insight, and hands-on recruiting to help businesses hire efficiently and build stronger teams."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 max-w-6xl mx-auto">
            {steps.map((s, i) => (
              <ProcessStep key={s.step} step={s} isLast={i === steps.length - 1} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/workforce-solutions" className="btn-outline">
              Learn More About Our Process <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 8 — Industries We Serve ────────────────────────── */}
      <section id="industries" className="relative py-20 md:py-28 bg-white overflow-hidden">
        <FloatingBlob
          style={{ top: '15%', left: '6%', width: 280, height: 280, background: 'rgba(23,184,206,0.06)' }}
          animate={{ y: [0, -18, 0], x: [0, 14, 0] }}
          duration={9}
          delay={1}
        />
        <div className="container-tp relative z-10">
          <SectionHeader
            eyebrow="INDUSTRIES WE SUPPORT"
            title="Industries We Support"
            sub="Talent Pull provides staffing and workforce solutions across a wide range of industries."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {homeIndustryTiles.map((tile, i) => (
              <IndustryTile key={tile.label} tile={tile} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 9 — AI-Powered Hiring ──────────────────────────── */}
      <section id="ai" className="py-20 md:py-28 bg-tp-darker text-white relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(217,27,78,0.18) 0%, transparent 60%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(23,184,206,0.16) 0%, transparent 60%)' }}
        />
        <div className="container-tp relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-14"
          >
            <span className="inline-block uppercase tracking-[0.18em] text-xs font-semibold text-tp-teal">
              AI-POWERED HIRING
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-display-tight mt-4">
              Faster Hiring, <span className="gradient-text">Powered by People</span>
            </h2>
            <p className="mt-5 text-white/70 text-lg leading-relaxed">
              Talent Pull combines AI-powered sourcing with hands-on recruiting to help employers
              move faster while maintaining hiring quality.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {aiFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 hover:bg-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-tp-red to-tp-teal text-white mb-4">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-base font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{f.body}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link to="/contact" className="btn-primary">
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 10 — Trust / Metrics Strip ─────────────────────── */}
      <section className="py-16 bg-white border-y border-tp-fog">
        <div className="container-tp">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="text-center font-display text-xl md:text-2xl font-bold text-tp-dark mb-8"
          >
            Built Around Responsiveness, Reliability, and Results
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {trustItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="inline-flex items-center gap-2 text-sm font-medium text-tp-dark/75"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-tp-teal text-white flex-shrink-0">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 11 — Final CTA ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-tp-mist">
        <div className="container-tp">
          <SectionHeader
            eyebrow="GET STARTED"
            title="Ready to Hire or Looking for Work?"
            sub="Whether you need one key hire or a full workforce solution, Talent Pull is ready to help."
          />
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'For Employers',
                body: 'Tell us what role you need to fill and we\'ll help you find the right people quickly.',
                cta: { label: 'Find Talent', to: '/workforce-solutions' },
                icon: Zap,
                accent: 'red',
              },
              {
                title: 'For Job Seekers',
                body: 'Looking for your next opportunity? Submit your resume and connect with our team.',
                cta: { label: 'Get Hired', to: '/job-seekers' },
                icon: UserCheck,
                accent: 'teal',
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl bg-white border border-tp-fog p-9 hover:shadow-tp-elevated transition-shadow"
                >
                  <div
                    className={
                      'inline-flex h-12 w-12 items-center justify-center rounded-xl mb-5 ' +
                      (c.accent === 'red' ? 'bg-tp-red-50 text-tp-red' : 'bg-tp-teal-50 text-tp-teal-700')
                    }
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-tp-dark mb-3 tracking-display-tight">
                    {c.title}
                  </h3>
                  <p className="text-tp-dark/70 leading-relaxed mb-6">{c.body}</p>
                  {/* Gentle infinite pulse on the CTA to draw the eye */}
                  <motion.span
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-block"
                  >
                    <Link to={c.cta.to} className={c.accent === 'red' ? 'btn-primary' : 'btn-outline'}>
                      {c.cta.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
