import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Check, Quote, TrendingUp, Sparkles, Scale, Star,
  PackageOpen, Settings2, Wrench, Zap, Truck, Hammer,
  ClipboardList, Database, HardHat,
  Timer, UserCheck, RefreshCw, ShieldCheck,
  Users, CalendarCheck, FolderOpen, FileText,
  UserPlus, Landmark, BarChart3,
  CheckCircle2, BadgeCheck, Clock, FolderCheck,
  BookOpen, ArrowLeftRight, CreditCard, BarChart2,
  Stethoscope, Settings, LineChart,
  PiggyBank,
  GraduationCap, ClipboardCheck, AlertTriangle,
  Search, FileEdit,
  HeartPulse, TrendingDown,
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

// Lucide icons referenced by whatWeCover items by string slug. Hammer
// stands in for the no-longer-shipped lucide "Tool" glyph.
const ITEM_ICON_MAP = {
  'package-open':     PackageOpen,
  'settings-2':       Settings2,
  'wrench':           Wrench,
  'zap':              Zap,
  'truck':            Truck,
  'hammer':           Hammer,
  'users':            Users,
  'calendar-check':   CalendarCheck,
  'folder-open':      FolderOpen,
  'shield-check':     ShieldCheck,
  'file-text':        FileText,
  'book-open':        BookOpen,
  'arrow-left-right': ArrowLeftRight,
  'credit-card':      CreditCard,
  'bar-chart-2':      BarChart2,
  'trending-up':      TrendingUp,
  'graduation-cap':   GraduationCap,
  'scale':            Scale,
  'clipboard-check':  ClipboardCheck,
};

// Badges shown bottom-left of a whatWeCover card. Each variant fully defines
// its own colors, icon, and label so we can mix multiple variants per page.
const BADGE_MAP = {
  regulatory: { bg: '#eff6ff', text: '#2563eb', icon: Scale,          label: 'Regulatory' },
  advisory:   { bg: '#fffbeb', text: '#d97706', icon: Star,           label: 'Advisory Service' },
  quickbooks: { bg: '#f0fdf4', text: '#16a34a', icon: Check,          label: 'QuickBooks Supported' },
  ohsa:       { bg: '#fffbeb', text: '#d97706', icon: AlertTriangle,  label: 'OHSA Aligned' },
  verified:   { bg: '#f0fdf4', text: '#16a34a', icon: Check,          label: 'Pre-Verified Workers' },
};

// Lucide icons used inside How-We-Work step cards. Optional per step.
const STEP_ICON_MAP = {
  'clipboard-list': ClipboardList,
  'database':       Database,
  'hard-hat':       HardHat,
  'user-plus':      UserPlus,
  'calendar-check': CalendarCheck,
  'landmark':       Landmark,
  'bar-chart-3':    BarChart3,
  'stethoscope':    Stethoscope,
  'settings':       Settings,
  'refresh-cw':     RefreshCw,
  'line-chart':     LineChart,
  'search':         Search,
  'file-edit':      FileEdit,
  'graduation-cap': GraduationCap,
  'shield-check':   ShieldCheck,
};

// Lucide icons used inside Key Outcomes (bold variant) stat cards.
const STAT_ICON_MAP = {
  'timer':           Timer,
  'user-check':      UserCheck,
  'refresh-cw':      RefreshCw,
  'shield-check':    ShieldCheck,
  'check-circle-2':  CheckCircle2,
  'badge-check':     BadgeCheck,
  'clock':           Clock,
  'folder-check':    FolderCheck,
  'trending-up':     TrendingUp,
  'piggy-bank':      PiggyBank,
  'clipboard-check': ClipboardCheck,
  'heart-pulse':     HeartPulse,
  'trending-down':   TrendingDown,
};

// ── New Key Outcomes design - used when keyMetrics is an object array ─────

function CountUp({ target, start, duration = 1800 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    let startTime = null;
    function frame(t) {
      if (startTime === null) startTime = t;
      const p = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [start, target, duration]);
  return <>{count}</>;
}

function Typewriter({ text, start, duration = 800 }) {
  const [visible, setVisible] = useState('');
  useEffect(() => {
    if (!start) { setVisible(''); return; }
    let raf;
    let startTime = null;
    function frame(t) {
      if (startTime === null) startTime = t;
      const p = Math.min((t - startTime) / duration, 1);
      setVisible(text.slice(0, Math.ceil(p * text.length)));
      if (p < 1) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [start, text, duration]);
  return <>{visible}</>;
}

function StatCard({ metric, index, isRed }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  // Brief: count-up / typewriter begin 200ms *after* the card finishes its
  // entrance - entrance is 0.5s + 0.12s × index of stagger.
  const startDelay = 500 + index * 120 + 200;
  const [animStart, setAnimStart] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAnimStart(true), startDelay);
    return () => clearTimeout(t);
  }, [inView, startDelay]);

  const isNumeric = typeof metric.value === 'number';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      className={cn(
        'group relative bg-white border border-gray-100 rounded-[14px] overflow-hidden',
        'px-7 py-8',
        'shadow-[0_2px_12px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]',
        'transition-[transform,box-shadow,border-color] duration-200 ease-out',
        'hover:-translate-y-[5px]',
        'hover:shadow-[0_12px_28px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.06)]',
        isRed ? 'hover:border-tp-red/20' : 'hover:border-tp-teal/20'
      )}
    >
      {/* Top accent line - 3px tall × 40px wide, expands to 100% on hover */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-0 left-0 h-[3px] w-10 rounded-[2px]',
          'transition-[width] duration-300 ease-out group-hover:w-full',
          isRed ? 'bg-tp-red' : 'bg-tp-teal'
        )}
      />

      {/* Stat value - big bold brand-colored number or static text */}
      <div
        className={cn(
          'font-display font-extrabold tracking-[-0.02em] leading-none',
          'text-[2.2rem] md:text-[3rem] tabular-nums',
          isRed ? 'text-tp-red' : 'text-tp-teal-700'
        )}
      >
        {isNumeric ? (
          <>
            <CountUp target={metric.value} start={animStart} />
            {metric.suffix || ''}
          </>
        ) : (
          <Typewriter text={metric.value} start={animStart} />
        )}
      </div>

      {/* Label */}
      <p className="mt-3 text-[0.9rem] text-gray-600 leading-[1.5]">
        {metric.label}
      </p>
    </motion.div>
  );
}

// ── Bold Stat Card - used when a metric has `icon` or `detail` (Industrial). ─
// Visually heavier than StatCard: left accent bar that draws in, icon tile
// top-left, large stat, label, divider, italic supporting detail.
// Optional hazardStripe prop adds a hazard-tape top accent (Health & Safety).
function BoldStatCard({ metric, index, isRed, hazardStripe = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  // Same cadence as StatCard: count-up/typewriter begins 200ms after the
  // card entrance (0.5s + 0.12s × index) lands.
  const startDelay = 500 + index * 120 + 200;
  const [animStart, setAnimStart] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAnimStart(true), startDelay);
    return () => clearTimeout(t);
  }, [inView, startDelay]);

  const Icon = metric.icon ? STAT_ICON_MAP[metric.icon] : null;
  const isNumeric = typeof metric.value === 'number';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      className={cn(
        'group relative bg-white border border-gray-100 rounded-[14px] overflow-hidden h-full',
        'px-6 py-7 pl-7',
        'shadow-[0_2px_12px_rgba(0,0,0,0.06)]',
        'transition-[transform,box-shadow,border-color] duration-200 ease-out',
        'hover:-translate-y-[5px]',
        'hover:shadow-[0_14px_28px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.06)]',
        isRed ? 'hover:border-tp-red/20' : 'hover:border-tp-teal/20'
      )}
    >
      {/* Left accent bar - draws from top to bottom on entrance, widens on hover */}
      <motion.span
        aria-hidden="true"
        initial={{ height: '0%' }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.12 + 0.1 }}
        className={cn(
          'absolute top-0 left-0 w-[3px] rounded-tl-[14px] rounded-bl-[14px]',
          'transition-[width] duration-200 ease-out group-hover:w-[5px]',
          isRed ? 'bg-tp-red' : 'bg-tp-teal'
        )}
      />

      {/* Hazard-stripe top accent - Health & Safety only. Drawn L→R on entry. */}
      {hazardStripe && (
        <motion.span
          aria-hidden="true"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.12 + 0.15 }}
          className="absolute top-0 left-0 h-[3px] rounded-tr-[14px]"
          style={{
            background: isRed
              ? 'repeating-linear-gradient(90deg, rgb(217 27 78) 0px, rgb(217 27 78) 12px, rgba(217,27,78,0.2) 12px, rgba(217,27,78,0.2) 24px)'
              : 'repeating-linear-gradient(90deg, rgb(23 184 206) 0px, rgb(23 184 206) 12px, rgba(23,184,206,0.2) 12px, rgba(23,184,206,0.2) 24px)',
          }}
        />
      )}

      {/* Icon tile - top-left. Hazard variant deepens the tile on hover. */}
      {Icon && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.3, delay: index * 0.12 + 0.25 }}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-[8px] mb-4',
            'transition-[background-color] duration-200 ease-out',
            isRed ? 'bg-tp-red/10 text-tp-red' : 'bg-tp-teal/10 text-tp-teal-700',
            hazardStripe && (isRed
              ? 'group-hover:bg-tp-red/[0.18]'
              : 'group-hover:bg-tp-teal/[0.18]')
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </motion.span>
      )}

      {/* Big bold stat value */}
      <div
        className={cn(
          'font-display font-extrabold tracking-[-0.02em] leading-none',
          'text-[2rem] md:text-[2.8rem] tabular-nums',
          isRed ? 'text-tp-red' : 'text-tp-teal-700'
        )}
      >
        {isNumeric ? (
          <>
            <CountUp target={metric.value} start={animStart} />
            {metric.suffix || ''}
          </>
        ) : (
          <Typewriter text={metric.value} start={animStart} duration={600} />
        )}
      </div>

      {/* Label */}
      <p className="mt-3 text-base font-bold text-tp-dark leading-snug">
        {metric.label}
      </p>

      {/* Divider + supporting detail */}
      {metric.detail && (
        <>
          <hr className="border-t border-gray-100 my-[10px]" />
          <p className="text-[0.8rem] italic text-gray-500 leading-[1.6]">
            {metric.detail}
          </p>
        </>
      )}

      {/* Trust indicator chip - pinned to the bottom of the card.
          Supports two shapes:
            - string:  legacy green chip with ✓ Check icon (Payroll)
            - object:  per-card custom colors + emoji-prefixed label (Financial) */}
      {metric.trustChip && (() => {
        const chip = typeof metric.trustChip === 'string'
          ? { label: metric.trustChip, bg: '#f0fdf4', text: '#16a34a', withCheck: true }
          : { ...metric.trustChip, withCheck: false };
        return (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.3, delay: index * 0.12 + 0.45 }}
            className="mt-auto pt-4"
          >
            <span
              className="inline-flex items-center gap-1 text-[0.7rem] font-medium rounded-full"
              style={{ backgroundColor: chip.bg, color: chip.text, padding: '3px 10px' }}
            >
              {chip.withCheck && <Check className="h-3 w-3" strokeWidth={3} />}
              {chip.label}
            </span>
          </motion.div>
        );
      })()}
    </motion.div>
  );
}

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

            {/* Hero photo - replaces the old icon card. Same position, square aspect,
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
          {/* whatWeCover items support four shapes:
              - 'string'                                  → simple checkmark bullet (Payroll, Financial, Health)
              - { label, description }                    → titled tile with body copy (legacy)
              - { label, description, bullets }           → rich card with bullets (Professional)
              - { label, description, icon, verified? }   → icon-rich card with optional verified badge (Industrial)
              When any item is a rich shape (object) we switch to a comfortable
              3-col layout; pure-string arrays keep the 6-col centering grid. */}
          {(() => {
            const hasObjectItems = service.whatWeCover.some((it) => typeof it === 'object');
            const allStackedIconBullets = service.whatWeCover.every(
              (it) => typeof it === 'object' && it.icon && Array.isArray(it.bullets) && it.bullets.length > 0
            );
            // Five stacked cards (Payroll, Financial) → 6-col grid so the
            // last 2 cards can re-center via col-span-2 + col-start-2.
            const isFiveStackedIconBullets = service.whatWeCover.length === 5 && allStackedIconBullets;
            // Four stacked cards (Health & Safety) → 2×2 grid on desktop.
            const isFourStackedIconBullets = service.whatWeCover.length === 4 && allStackedIconBullets;
            const gridClass = isFiveStackedIconBullets
              ? 'grid md:grid-cols-2 lg:grid-cols-6 gap-6 items-stretch'
              : isFourStackedIconBullets
              ? 'grid md:grid-cols-2 gap-6 items-stretch max-w-5xl mx-auto'
              : hasObjectItems
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'
              : 'grid md:grid-cols-2 lg:grid-cols-6 gap-4 max-w-5xl';
            return (
              <div className={gridClass}>
                {service.whatWeCover.map((item, i) => {
                  const isString = typeof item === 'string';
                  const label = isString ? item : item.label;
                  const description = isString ? null : item.description;
                  const bullets = isString ? null : (Array.isArray(item.bullets) ? item.bullets : null);
                  const iconKey = isString ? null : item.icon;
                  const verified = !isString && item.verified === true;

                  // Icon-rich card variant - items with an icon string but no bullets (Industrial)
                  if (iconKey && !bullets) {
                    const Icon = ITEM_ICON_MAP[iconKey] || PackageOpen;
                    return (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                        className={cn(
                          'group relative bg-white border border-gray-100 rounded-[14px] overflow-hidden',
                          'px-6 py-7 h-full flex flex-col',
                          'shadow-[0_2px_12px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.04)]',
                          'transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out',
                          'hover:-translate-y-[5px]',
                          'hover:shadow-[0_14px_28px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.06)]',
                          isRed ? 'hover:border-tp-red/25' : 'hover:border-tp-teal/25'
                        )}
                      >
                        {/* 3px brand accent bar pinned to the top */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute top-0 left-0 right-0 h-[3px] rounded-t-[14px]',
                            isRed ? 'bg-tp-red' : 'bg-tp-teal'
                          )}
                        />

                        {/* Icon - scales in shortly after the card lands */}
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ duration: 0.3, delay: i * 0.08 + 0.2 }}
                          className={cn(
                            'inline-flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0',
                            'transition-[background-color] duration-200 ease-out',
                            isRed
                              ? 'bg-tp-red/10 text-tp-red group-hover:bg-tp-red/[0.18]'
                              : 'bg-tp-teal/10 text-tp-teal-700 group-hover:bg-tp-teal/[0.18]'
                          )}
                          style={{
                            boxShadow: isRed
                              ? '0 2px 8px rgba(217, 27, 78, 0.15)'
                              : '0 2px 8px rgba(23, 184, 206, 0.15)',
                          }}
                        >
                          <Icon className="h-6 w-6" strokeWidth={1.8} />
                        </motion.span>

                        {/* Title */}
                        <h3 className="mt-4 font-display text-base font-bold text-tp-dark leading-snug">
                          {label}
                        </h3>
                        {/* Body */}
                        <p className="mt-2 text-sm text-gray-600 leading-[1.7]">
                          {description}
                        </p>

                        {/* Credentials Verified badge - pinned to bottom-left */}
                        {verified && (
                          <div className="mt-auto pt-4">
                            <span className="inline-flex items-center gap-1 bg-[#f0fdf4] text-[#16a34a] text-[0.7rem] font-medium px-2 py-0.5 rounded-full">
                              <Check className="h-3 w-3" strokeWidth={3} />
                              Credentials Verified
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  }

                  // Rich card variant - used when the item has its own bullet list
                  if (bullets) {
                    const StackedIcon = iconKey ? ITEM_ICON_MAP[iconKey] : null;
                    const badgeConfig = !isString && item.badge ? BADGE_MAP[item.badge] : null;

                    // ── Stacked icon-block variant (Payroll / Financial / Health & Safety) -
                    // icon ABOVE the title, animated top accent, optional bullets and bottom badge.
                    if (StackedIcon) {
                      // Centering for 5-card layout: 6-col grid w/ col-span-2; last 2 cards re-centered.
                      const total = service.whatWeCover.length;
                      const isFiveCardCentered = total === 5;
                      const colClasses = isFiveCardCentered
                        ? cn('lg:col-span-2', i === 3 && 'lg:col-start-2')
                        : '';

                      // Per-card opt-in for hazard-tape accent and shield-style bullets (Health & Safety).
                      const isWarningStripe = item.accentStyle === 'warning-stripe';
                      const BulletIcon = item.bulletIcon === 'shield-check' ? ShieldCheck : Check;
                      const accentBg = isWarningStripe
                        ? (isRed
                            ? 'repeating-linear-gradient(90deg, rgb(217 27 78) 0px, rgb(217 27 78) 16px, rgba(217,27,78,0.3) 16px, rgba(217,27,78,0.3) 32px)'
                            : 'repeating-linear-gradient(90deg, rgb(23 184 206) 0px, rgb(23 184 206) 16px, rgba(23,184,206,0.3) 16px, rgba(23,184,206,0.3) 32px)')
                        : undefined;

                      return (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, y: 28 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                          className={cn(
                            'group relative bg-white border border-gray-100 rounded-[14px] overflow-hidden',
                            'px-6 py-7 h-full flex flex-col',
                            'shadow-[0_2px_12px_rgba(0,0,0,0.06)]',
                            'transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out',
                            'hover:-translate-y-[5px]',
                            'hover:shadow-[0_14px_28px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.06)]',
                            isRed ? 'hover:border-tp-red/25' : 'hover:border-tp-teal/25',
                            colClasses
                          )}
                        >
                          {/* Top accent bar - draws L→R on entrance. Warning-stripe
                              variant swaps the solid color for hazard tape. */}
                          <motion.span
                            aria-hidden="true"
                            initial={{ width: '0%' }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: isWarningStripe ? 0.5 : 0.4, ease: 'easeOut', delay: i * 0.12 + 0.1 }}
                            className={cn(
                              'absolute top-0 left-0',
                              isWarningStripe
                                ? 'h-[4px] rounded-t-[14px]'
                                : 'h-[3px] rounded-t-[14px]',
                              !isWarningStripe && (isRed ? 'bg-tp-red' : 'bg-tp-teal')
                            )}
                            style={isWarningStripe ? { background: accentBg } : undefined}
                          />

                          {/* Icon tile - scales in after the card lands */}
                          <motion.span
                            initial={{ opacity: 0, scale: 0.75 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                            className={cn(
                              'inline-flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0',
                              'transition-[background-color] duration-200 ease-out',
                              isRed
                                ? 'bg-tp-red/10 text-tp-red group-hover:bg-tp-red/[0.18]'
                                : 'bg-tp-teal/10 text-tp-teal-700 group-hover:bg-tp-teal/[0.18]'
                            )}
                            style={{
                              boxShadow: isRed
                                ? '0 2px 8px rgba(217, 27, 78, 0.15)'
                                : '0 2px 8px rgba(23, 184, 206, 0.15)',
                            }}
                          >
                            <StackedIcon className="h-6 w-6" strokeWidth={1.8} />
                          </motion.span>

                          {/* Title */}
                          <h3 className="mt-[14px] font-display text-[1.05rem] font-bold text-tp-dark leading-snug">
                            {label}
                          </h3>
                          {/* Body */}
                          <p className="mt-2 text-[0.875rem] text-gray-600 leading-[1.7]">
                            {description}
                          </p>
                          {/* Divider */}
                          <hr className="my-[14px] border-t border-gray-100" />
                          {/* Bullets - 13px icon (Check default, ShieldCheck for Health & Safety) */}
                          <ul className="space-y-2">
                            {bullets.map((b) => (
                              <li
                                key={b}
                                className="flex items-start gap-2 text-[0.825rem] text-gray-700 leading-[1.5]"
                              >
                                <BulletIcon
                                  className={cn(
                                    'h-[13px] w-[13px] mt-1 flex-shrink-0',
                                    isRed ? 'text-tp-red' : 'text-tp-teal-700'
                                  )}
                                  strokeWidth={2.25}
                                />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Badge pill - pinned bottom-left. Variant configured in BADGE_MAP. */}
                          {badgeConfig && (() => {
                            const BadgeIcon = badgeConfig.icon;
                            return (
                              <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.3, delay: i * 0.1 + 0.4 }}
                                className="mt-auto pt-4"
                              >
                                <span
                                  className="inline-flex items-center gap-1 text-[0.7rem] font-medium px-2 py-0.5 rounded-full"
                                  style={{ backgroundColor: badgeConfig.bg, color: badgeConfig.text }}
                                >
                                  <BadgeIcon className="h-3 w-3" strokeWidth={2.5} />
                                  {badgeConfig.label}
                                </span>
                              </motion.div>
                            );
                          })()}
                        </motion.div>
                      );
                    }

                    // ── Inline Check + title variant (Professional Staffing) - unchanged.
                    return (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                        className={cn(
                          'relative bg-white border border-gray-100 rounded-xl p-7 h-full flex flex-col overflow-hidden',
                          'transition-[transform,box-shadow,border-color] duration-200 ease-out',
                          'hover:-translate-y-[5px] hover:shadow-[0_16px_32px_-12px_rgba(28,43,58,0.18)]',
                          isRed ? 'hover:border-tp-red/25' : 'hover:border-tp-teal/25'
                        )}
                      >
                        {/* 3px brand accent bar pinned to the top */}
                        <div
                          aria-hidden="true"
                          className={cn(
                            'absolute top-0 left-0 right-0 h-[3px] rounded-t-xl',
                            isRed ? 'bg-tp-red' : 'bg-tp-teal'
                          )}
                        />
                        {/* Icon + title row */}
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              'inline-flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0',
                              isRed ? 'bg-tp-red-50 text-tp-red' : 'bg-tp-teal-50 text-tp-teal-700'
                            )}
                            style={{
                              boxShadow: isRed
                                ? '0 2px 8px rgba(217, 27, 78, 0.15)'
                                : '0 2px 8px rgba(23, 184, 206, 0.15)',
                            }}
                          >
                            <Check className="h-4 w-4" strokeWidth={2.5} />
                          </span>
                          <h3 className="font-display text-[1.1rem] font-bold text-tp-dark leading-snug">
                            {label}
                          </h3>
                        </div>
                        {/* Body */}
                        <p className="mt-3 text-[0.95rem] text-gray-600 leading-[1.7]">
                          {description}
                        </p>
                        {/* Divider */}
                        <hr className="my-4 border-t border-gray-100" />
                        {/* Bullets */}
                        <ul className="space-y-2">
                          {bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2 text-sm text-gray-700 leading-[1.5]"
                            >
                              <Check
                                className={cn(
                                  'h-3.5 w-3.5 mt-1 flex-shrink-0',
                                  isRed ? 'text-tp-red' : 'text-tp-teal-700'
                                )}
                                strokeWidth={2.5}
                              />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  }

                  // Simple checkmark variant - used for string bullets and
                  // legacy { label, description } items without their own bullets.
                  const total = service.whatWeCover.length;
                  const tilesInLastRow = total % 3 === 0 ? 3 : total % 3;
                  const lastRowStartIdx = total - tilesInLastRow;
                  let lgStart = '';
                  if (i === lastRowStartIdx) {
                    if (tilesInLastRow === 1) lgStart = 'lg:col-start-3';
                    else if (tilesInLastRow === 2) lgStart = 'lg:col-start-2';
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
            );
          })()}

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

      {/* ── How We Work - n-step process flow (only when steps are provided).
          When there are exactly 4 steps we switch into a more compact card
          design with dashed-line + traveling-dot connectors (Payroll). For
          any other count we keep the existing 3-step layout (Professional /
          Industrial). ─────────────────────────────────────────────────── */}
      {service.howWeWork.steps && (() => {
        const stepCount = service.howWeWork.steps.length;
        const isCompact4 = stepCount === 4;
        // Financial Support uses dashed outer rings, one-shot pulses, and a
        // shimmer-line connector instead of Payroll's dashed-dot connector.
        const isFinancialVariant = service.howWeWork.variant === 'financial';
        // Health & Safety uses a hazard-stripe top accent, dashed 30%-opacity
        // outer ring, one-shot pulse, and a solid line with a traveling Check
        // icon. Each step optionally carries a regulatoryTag chip at the bottom.
        const isSafetyVariant = service.howWeWork.variant === 'safety';
        // One-shot pulse applies to both Financial and Safety variants.
        const oneShotPulse = isFinancialVariant || isSafetyVariant;

        return (
        <section className="py-16 md:py-20 bg-tp-mist">
          <div className={cn('container-tp', isCompact4 ? 'max-w-6xl' : 'max-w-5xl')}>
            <div className={cn(
              'flex flex-col md:flex-row md:items-stretch',
              isCompact4 ? 'gap-4 md:gap-1' : 'gap-6 md:gap-2'
            )}>
              {service.howWeWork.steps.map((s, i) => {
                // Entrance animation:
                //   compact4 (Payroll): uniform fade-up, stagger 0.1s
                //   3-step:            from-left / from-below / from-right
                const stepAnim = isCompact4
                  ? { initial: { y: 32, opacity: 0 }, transition: { duration: 0.45, delay: i * 0.1 } }
                  : i === 0 ? { initial: { x: -30, opacity: 0 }, transition: { duration: 0.5, delay: 0 } }
                  : i === 1 ? { initial: { y:  30, opacity: 0 }, transition: { duration: 0.5, delay: 0.2 } }
                  :           { initial: { x:  30, opacity: 0 }, transition: { duration: 0.5, delay: 0.4 } };
                // Connector starts shortly after its preceding card lands.
                const connectorDelay = isCompact4
                  ? i * 0.1 + 0.3
                  : (i === 0 ? 0.5 : 0.7);
                // Pulse stagger: 0.5s for compact4, 0.6s otherwise.
                const pulseDelay = i * (isCompact4 ? 0.5 : 0.6);

                const StepIcon = s.icon ? STEP_ICON_MAP[s.icon] : null;

                return (
                  <Fragment key={s.step}>
                    {/* Step card */}
                    <motion.div
                      initial={stepAnim.initial}
                      whileInView={{ x: 0, y: 0, opacity: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={stepAnim.transition}
                      className={cn(
                        'group relative bg-white border border-gray-100 rounded-2xl text-center md:flex-1 md:min-w-0',
                        'flex flex-col items-center overflow-hidden',
                        isCompact4 ? 'px-5 py-6' : 'px-7 py-8',
                        'transition-[transform,box-shadow,border-color] duration-200 ease-out',
                        isCompact4
                          ? 'hover:-translate-y-1 hover:shadow-tp-elevated'
                          : StepIcon
                            ? 'hover:-translate-y-[5px] hover:shadow-tp-elevated'
                            : 'hover:-translate-y-1 hover:shadow-tp-soft',
                        (isCompact4 || StepIcon)
                          ? (isRed ? 'hover:border-tp-red/25' : 'hover:border-tp-teal/25')
                          : (isRed ? 'hover:border-tp-red/20' : 'hover:border-tp-teal/20')
                      )}
                    >
                      {/* Top accent bar. Safety variant uses hazard-stripe
                          tape (4px tall, drawn L→R); other variants render
                          a solid 3px brand bar (Industrial/Payroll/Financial). */}
                      {isSafetyVariant ? (
                        <motion.span
                          aria-hidden="true"
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.12 + 0.1 }}
                          className="absolute top-0 left-0 h-[4px] rounded-t-[16px]"
                          style={{
                            background: isRed
                              ? 'repeating-linear-gradient(90deg, rgb(217 27 78) 0px, rgb(217 27 78) 14px, rgba(217,27,78,0.25) 14px, rgba(217,27,78,0.25) 28px)'
                              : 'repeating-linear-gradient(90deg, rgb(23 184 206) 0px, rgb(23 184 206) 14px, rgba(23,184,206,0.25) 14px, rgba(23,184,206,0.25) 28px)',
                          }}
                        />
                      ) : (StepIcon || isCompact4) && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute top-0 left-0 right-0 h-[3px] rounded-t-[16px]',
                            isRed ? 'bg-tp-red' : 'bg-tp-teal'
                          )}
                        />
                      )}

                      {/* Step number circle with continuous pulse ring + optional outer ring (compact4) */}
                      <div className={cn(
                        'relative mb-5',
                        isCompact4 ? 'w-14 h-14' : 'w-16 h-16'
                      )}>
                        {/* Outer ring - compact4 only. Three styles:
                              Payroll  → static solid 2px ring, 5px gap
                              Financial → dashed 2px ring, 4px gap, solid on hover
                              Safety   → dashed 3px ring at 30% opacity, 6px gap */}
                        {isCompact4 && (
                          <span
                            aria-hidden="true"
                            className={cn(
                              'absolute rounded-full',
                              isSafetyVariant
                                ? 'border-[3px] border-dashed -inset-[6px]'
                                : isFinancialVariant
                                  ? 'border-2 border-dashed -inset-1 group-hover:border-solid'
                                  : 'border-2 -inset-[5px]',
                              isSafetyVariant
                                ? (isRed ? 'border-tp-red/30' : 'border-tp-teal/30')
                                : isFinancialVariant
                                  ? (isRed ? 'border-tp-red/25' : 'border-tp-teal/25')
                                  : (isRed ? 'border-tp-red/20' : 'border-tp-teal/20')
                            )}
                          />
                        )}
                        {/* Pulse ring - Financial / Safety variants fire once on
                            entry; Payroll loops continuously. */}
                        {oneShotPulse ? (
                          <motion.span
                            aria-hidden="true"
                            className={cn(
                              'absolute inset-0 rounded-full',
                              isRed ? 'bg-tp-red' : 'bg-tp-teal'
                            )}
                            initial={{ scale: 1, opacity: isSafetyVariant ? 0.4 : 0.3 }}
                            whileInView={{ scale: 2, opacity: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{
                              duration: isSafetyVariant ? 0.9 : 0.8,
                              ease: 'easeOut',
                              delay: i * 0.12 + 0.3,
                            }}
                          />
                        ) : (
                          <motion.span
                            aria-hidden="true"
                            className={cn(
                              'absolute inset-0 rounded-full',
                              isRed ? 'bg-tp-red' : 'bg-tp-teal'
                            )}
                            animate={
                              isCompact4
                                ? { scale: [1, 1.7, 1.7], opacity: [0.25, 0, 0] }
                                : { scale: [1, 1.5, 1.5], opacity: [0.4, 0, 0] }
                            }
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeOut',
                              delay: pulseDelay,
                            }}
                          />
                        )}
                        {/* Visible numbered circle */}
                        <span
                          className={cn(
                            'relative inline-flex items-center justify-center rounded-full text-white font-bold shadow-tp-soft',
                            isCompact4 ? 'h-14 w-14 text-xl' : 'h-16 w-16 text-2xl',
                            isRed ? 'bg-tp-red' : 'bg-tp-teal'
                          )}
                        >
                          {s.step}
                        </span>
                      </div>

                      {/* Icon tile - appears between the number circle and the title */}
                      {StepIcon && (
                        <motion.span
                          initial={isCompact4 ? { opacity: 0, scale: 0.7 } : false}
                          whileInView={isCompact4 ? { opacity: 1, scale: 1 } : undefined}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={isCompact4 ? { duration: 0.3, delay: i * 0.1 + 0.2 } : undefined}
                          className={cn(
                            'inline-flex items-center justify-center rounded-[10px]',
                            isCompact4 ? 'h-10 w-10 mb-3' : 'h-11 w-11 mb-4',
                            'transition-[background-color] duration-200 ease-out',
                            isRed
                              ? 'bg-tp-red/10 text-tp-red'
                              : 'bg-tp-teal/10 text-tp-teal-700'
                          )}
                        >
                          <StepIcon className={isCompact4 ? 'h-5 w-5' : 'h-5 w-5'} strokeWidth={1.8} />
                        </motion.span>
                      )}

                      <h4 className={cn(
                        'font-display font-bold text-tp-dark leading-snug',
                        isCompact4 ? 'text-[0.95rem] mt-[14px] mb-0' : 'text-[1.05rem] mb-2'
                      )}>
                        {s.title}
                      </h4>
                      {/* Eyebrow only on the legacy (no-icon) variant - keeps Professional unchanged */}
                      {!StepIcon && !isCompact4 && (
                        <p
                          className={cn(
                            'text-[0.7rem] uppercase tracking-[0.1em] font-semibold mb-3',
                            isRed ? 'text-tp-red' : 'text-tp-teal-700'
                          )}
                        >
                          What we do
                        </p>
                      )}
                      <p className={cn(
                        'text-gray-600',
                        isCompact4
                          ? 'text-[0.8rem] leading-[1.7] mt-2'
                          : (StepIcon ? 'text-[0.875rem] leading-[1.7] mt-2' : 'text-[0.875rem] leading-[1.7]')
                      )}>
                        {s.body}
                      </p>

                      {/* Regulatory tag pill - pinned to the bottom (Safety variant) */}
                      {s.regulatoryTag && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.3, delay: i * 0.12 + 0.4 }}
                          className="mt-auto pt-4"
                        >
                          <span
                            className="inline-flex items-center text-[0.65rem] font-medium rounded-full whitespace-nowrap"
                            style={{
                              backgroundColor: s.regulatoryTag.bg,
                              color: s.regulatoryTag.text,
                              padding: '2px 8px',
                            }}
                          >
                            {s.regulatoryTag.label}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Connector between this step and the next */}
                    {i < service.howWeWork.steps.length - 1 && (
                      <>
                        {/* Mobile: vertical line (+ optional pill above) */}
                        <div className="md:hidden flex flex-col items-center gap-2">
                          {s.connectorLabel && (
                            <motion.span
                              initial={{ opacity: 0, y: -4 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: '-40px' }}
                              transition={{ duration: 0.3, delay: connectorDelay + 0.4 }}
                              className={cn(
                                'inline-flex items-center font-semibold rounded-full',
                                isCompact4 ? 'text-[0.65rem] px-2 py-[2px]' : 'text-[0.7rem] px-2.5 py-0.5',
                                isRed
                                  ? 'bg-tp-red/10 text-tp-red'
                                  : 'bg-tp-teal/10 text-tp-teal-700'
                              )}
                            >
                              {s.connectorLabel}
                            </motion.span>
                          )}
                          <motion.span
                            aria-hidden="true"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, ease: 'easeInOut', delay: connectorDelay }}
                            className={cn(
                              'block w-px h-8 origin-top',
                              isRed ? 'bg-tp-red/30' : 'bg-tp-teal/30'
                            )}
                          />
                        </div>

                        {/* Desktop connector */}
                        <div
                          aria-hidden="true"
                          className={cn(
                            'hidden md:flex md:items-center md:justify-center flex-shrink-0 relative',
                            isCompact4 ? 'md:w-10' : 'md:w-12'
                          )}
                        >
                          {s.connectorLabel && (
                            <motion.span
                              initial={{ opacity: 0, y: -4 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: '-60px' }}
                              transition={{ duration: 0.3, delay: connectorDelay + 0.6 }}
                              className={cn(
                                'absolute left-1/2 -translate-x-1/2 top-[calc(50%-22px)]',
                                'inline-flex items-center font-semibold rounded-full whitespace-nowrap z-10',
                                isCompact4 ? 'text-[0.65rem] px-2 py-[2px]' : 'text-[0.7rem] px-2.5 py-0.5',
                                isRed
                                  ? 'bg-tp-red/10 text-tp-red'
                                  : 'bg-tp-teal/10 text-tp-teal-700'
                              )}
                            >
                              {s.connectorLabel}
                            </motion.span>
                          )}

                          {isCompact4 && isSafetyVariant ? (
                            // Solid 20%-opacity line + traveling Check icon (Health & Safety)
                            <div className="relative w-full h-[2px]">
                              {/* Base line - draws L→R on entry */}
                              <motion.span
                                aria-hidden="true"
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, ease: 'easeOut', delay: connectorDelay }}
                                className={cn(
                                  'absolute left-0 top-0 h-full',
                                  isRed ? 'bg-tp-red/20' : 'bg-tp-teal/20'
                                )}
                              />
                              {/* Traveling Check - loops left to right as a moving checklist signal */}
                              <motion.span
                                aria-hidden="true"
                                initial={{ left: '0%', opacity: 0 }}
                                animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                                transition={{
                                  left:    { duration: 3, repeat: Infinity, ease: 'linear', delay: connectorDelay + 0.6 },
                                  opacity: { duration: 3, repeat: Infinity, ease: 'linear', delay: connectorDelay + 0.6, times: [0, 0.1, 0.9, 1] },
                                }}
                                className={cn(
                                  'absolute top-1/2 -translate-x-1/2 -translate-y-1/2',
                                  isRed ? 'text-tp-red' : 'text-tp-teal'
                                )}
                              >
                                <Check className="h-[14px] w-[14px]" strokeWidth={3} />
                              </motion.span>
                            </div>
                          ) : isCompact4 && isFinancialVariant ? (
                            // Solid 20%-opacity line + shimmer overlay (Financial Support)
                            <div className="relative w-full h-[2px] overflow-hidden">
                              {/* Base line - draws L→R on entry */}
                              <motion.span
                                aria-hidden="true"
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, ease: 'easeOut', delay: connectorDelay }}
                                className={cn(
                                  'absolute left-0 top-0 h-full origin-left',
                                  isRed ? 'bg-tp-red/20' : 'bg-tp-teal/20'
                                )}
                              />
                              {/* Shimmer - gradient travels across continuously */}
                              <motion.span
                                aria-hidden="true"
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  ease: 'linear',
                                  delay: connectorDelay + 0.6,
                                }}
                                className="absolute left-0 top-0 h-full w-full"
                                style={{
                                  background: isRed
                                    ? 'linear-gradient(90deg, transparent, rgba(217,27,78,0.6), transparent)'
                                    : 'linear-gradient(90deg, transparent, rgba(23,184,206,0.6), transparent)',
                                }}
                              />
                            </div>
                          ) : isCompact4 ? (
                            // Dashed line + traveling dot (Payroll)
                            <svg
                              width="60"
                              height="22"
                              viewBox="0 0 60 22"
                              className={isRed ? 'text-tp-red' : 'text-tp-teal'}
                              overflow="visible"
                            >
                              <motion.line
                                x1="2"
                                y1="11"
                                x2="58"
                                y2="11"
                                stroke="currentColor"
                                strokeOpacity="0.3"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, ease: 'easeInOut', delay: connectorDelay }}
                              />
                              {/* Traveling dot - loops left to right */}
                              <motion.circle
                                cy="11"
                                r="3"
                                fill="currentColor"
                                initial={{ cx: 2, opacity: 0 }}
                                animate={{ cx: [2, 58], opacity: [0, 1, 1, 0] }}
                                transition={{
                                  cx: { duration: 2, repeat: Infinity, ease: 'linear', delay: connectorDelay + 0.6 },
                                  opacity: { duration: 2, repeat: Infinity, ease: 'linear', delay: connectorDelay + 0.6, times: [0, 0.1, 0.9, 1] },
                                }}
                              />
                            </svg>
                          ) : (
                            // Solid line + arrowhead (Professional / Industrial)
                            <svg
                              width="60"
                              height="22"
                              viewBox="0 0 60 22"
                              className={isRed ? 'text-tp-red' : 'text-tp-teal'}
                            >
                              <motion.line
                                x1="0"
                                y1="11"
                                x2="50"
                                y2="11"
                                stroke="currentColor"
                                strokeOpacity="0.3"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.8, ease: 'easeInOut', delay: connectorDelay }}
                              />
                              <motion.polyline
                                points="45,5 56,11 45,17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.3, delay: connectorDelay + 0.8 }}
                              />
                            </svg>
                          )}
                        </div>
                      </>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </section>
        );
      })()}

      {/* ── Key Metrics ──────────────────────────────────────── */}
      {(() => {
        // Three shapes coexist:
        //   - object w/ icon or detail  → bold variant (Industrial)
        //   - object w/o icon/detail    → existing StatCard (Professional)
        //   - string                    → simple TrendingUp tiles (others)
        const hasObjectMetrics = service.keyMetrics.some((m) => typeof m === 'object');
        const hasBoldMetrics = service.keyMetrics.some(
          (m) => typeof m === 'object' && (m.icon || m.detail)
        );
        return (
          <section
            className={cn(
              'py-20 md:py-24',
              hasBoldMetrics
                ? (isRed
                    ? 'bg-gradient-to-br from-tp-red/[0.05] to-white'
                    : 'bg-gradient-to-br from-tp-teal/[0.06] to-white')
                : hasObjectMetrics
                ? (isRed
                    ? 'bg-gradient-to-b from-white to-tp-red/[0.04]'
                    : 'bg-gradient-to-b from-white to-tp-teal/[0.04]')
                : 'bg-white'
            )}
          >
            <div className="container-tp">
              <SectionHeader eyebrow="KEY OUTCOMES" title="What our partners typically see" />

              {hasBoldMetrics ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto items-stretch">
                  {service.keyMetrics.map((m, i) => (
                    <BoldStatCard
                      key={m.label}
                      metric={m}
                      index={i}
                      isRed={isRed}
                      hazardStripe={service.keyMetricsAccent === 'hazard-stripe'}
                    />
                  ))}
                </div>
              ) : hasObjectMetrics ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                  {service.keyMetrics.map((m, i) => (
                    <StatCard
                      key={typeof m === 'object' ? m.label : m}
                      metric={m}
                      index={i}
                      isRed={isRed}
                    />
                  ))}
                </div>
              ) : (
                // Existing simple variant - centered for 2 metrics, else 3-col
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
              )}
            </div>
          </section>
        );
      })()}

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
