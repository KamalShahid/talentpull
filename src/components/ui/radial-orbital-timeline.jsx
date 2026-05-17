import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils.js';
import { Badge } from './badge.jsx';

/**
 * RadialOrbitalTimeline (light theme)
 *
 * Renders an array of timeline items as nodes arranged in an orbit
 * around a glowing center hub, with a detail card below the orbit
 * showing the currently-selected node's content.
 *
 * Item shape:
 *   { id, title, date, content, category, icon, relatedIds, status, energy }
 *
 * Status → badge palette:
 *   completed   -> brand red bg + white text   (solid)
 *   in-progress -> light brand tint bg + red text
 *   pending     -> gray-100 bg + gray-500 text
 *
 * Container has no background of its own — callers provide bg + height
 * via the className prop so the timeline can sit on any section color.
 */
export default function RadialOrbitalTimeline({
  items,
  label,
  className,
  orbitRadius = 130,
  innerRingRadius = 64,
}) {
  const initial = items[0]?.id ?? null;
  const [activeId, setActiveId] = useState(initial);
  const active = items.find((it) => it.id === activeId) ?? null;
  const relatedIds = active?.relatedIds ?? [];

  return (
    <div className={cn('relative overflow-hidden rounded-2xl text-tp-dark flex flex-col', className)}>
      <div className="relative p-6 flex flex-col h-full">
        {label && (
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tp-red mb-2">
            {label}
          </p>
        )}

        {/* Orbital area */}
        <div className="relative flex-1 min-h-[260px]">
          {/* Outer dashed orbit ring */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gray-200"
            style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
          />
          {/* Inner ring */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200"
            style={{ width: innerRingRadius * 2, height: innerRingRadius * 2 }}
          />

          {/* Center hub — brand gradient with subtle pulse */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-tp-red via-tp-red to-tp-teal flex items-center justify-center shadow-[0_0_28px_rgba(217,27,78,0.32)]">
              <span className="h-3 w-3 rounded-full bg-white animate-pulse" />
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-gray-300/60"
                style={{ animation: 'orbit-pulse 2.4s ease-out infinite' }}
              />
            </div>
          </div>

          {/* Orbital nodes */}
          {items.map((item, i) => {
            const angle = (i * 360) / items.length - 90; // start at top, go clockwise
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * orbitRadius;
            const y = Math.sin(rad) * orbitRadius;
            const isActive = item.id === activeId;
            const isRelated = relatedIds.includes(item.id);
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                aria-label={`${item.date}: ${item.title}`}
                aria-pressed={isActive}
                className={cn(
                  'absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center focus:outline-none',
                  'transition-[transform,opacity] duration-300 ease-out',
                  isActive ? 'z-20 scale-110' : isRelated ? 'z-10' : 'z-0'
                )}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <div
                  className={cn(
                    'relative h-12 w-12 rounded-full flex items-center justify-center transition-[background-color,color,box-shadow,border-color] duration-300 ease-out border-2',
                    isActive
                      ? 'bg-tp-red text-white border-tp-red shadow-[0_8px_24px_rgba(217,27,78,0.35)]'
                      : isRelated
                      ? 'bg-tp-red/15 text-tp-red border-tp-red'
                      : 'bg-white text-gray-700 border-gray-300 shadow-sm hover:border-gray-400 hover:shadow'
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                  {/* Status dot */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-tp-mist',
                      item.status === 'completed' && 'bg-tp-teal',
                      item.status === 'in-progress' && 'bg-tp-red',
                      item.status === 'pending' && 'bg-gray-300'
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'mt-2 text-[10px] font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors',
                    isActive ? 'text-gray-900' : 'text-gray-600'
                  )}
                >
                  {item.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail card for the active node — light theme */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-5 mx-auto w-full max-w-xl rounded-xl bg-white border border-gray-200 shadow-[0_8px_24px_rgba(28,43,58,0.06)] p-5"
            >
              {/* Connector line above the popup card */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 -top-3 h-3 w-px -translate-x-1/2 bg-gray-300"
              />

              <div className="flex items-center flex-wrap gap-2 mb-2.5">
                <Badge
                  className={cn(
                    'border-transparent text-[10px] tracking-[0.12em] px-2 py-0.5',
                    active.status === 'completed'   && 'bg-tp-red text-white',
                    active.status === 'in-progress' && 'bg-tp-red-50 text-tp-red',
                    active.status === 'pending'     && 'bg-gray-100 text-gray-500'
                  )}
                >
                  {active.category}
                </Badge>
                <span className="text-[10px] uppercase tracking-[0.14em] text-gray-500">
                  {active.status.replace('-', ' ')}
                </span>
              </div>
              <h4 className="font-display text-base md:text-lg font-bold text-gray-900 tracking-display-tight mb-1.5">
                {active.title}
              </h4>
              <p className="text-[13.5px] text-gray-700 leading-relaxed">
                {active.content}
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                <span className="text-[10px] uppercase tracking-[0.14em] text-gray-500">
                  Energy
                </span>
                <div className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden">
                  <motion.div
                    key={`energy-${active.id}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${active.energy}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
                <span className="text-[10px] text-gray-600 tabular-nums">
                  {active.energy}%
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
