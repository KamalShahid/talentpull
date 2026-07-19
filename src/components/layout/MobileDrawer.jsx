import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { nav } from '../../data/nav.js';
import { useScrollLock } from '../../hooks/useScrollLock.js';

export default function MobileDrawer({ open, onClose }) {
  useScrollLock(open);
  const [expandedId, setExpandedId] = useState(null);
  const location = useLocation();

  // Every tappable element inside the drawer routes its onClick through
  // this so the drawer closes AND the accordion collapses in one step,
  // preventing a previously-expanded section from re-appearing when the
  // user reopens the drawer later.
  const closeMenu = useCallback(() => {
    setExpandedId(null);
    onClose();
  }, [onClose]);

  // Safety net: force-close on any route change. Navbar already has a
  // similar effect, but this covers cases where the drawer is opened
  // from a component that doesn't sit next to Navbar's state (or where
  // a bundle refresh loses state) - belt-and-suspenders per the brief.
  useEffect(() => {
    setExpandedId(null);
    if (open) onClose();
    // Intentionally listening only to pathname/hash - running when `open`
    // or `onClose` change would create a close loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);

  // Collapse any expanded accordion the moment the drawer starts closing
  // so it starts fresh on next open.
  useEffect(() => {
    if (!open) setExpandedId(null);
  }, [open]);

  // Aside + overlay are ALWAYS mounted and slide via Tailwind's
  // transition-transform / transition-opacity keyed off `open`. CSS-based
  // transitions can't be interrupted by Framer's animate state getting
  // out of sync with React state during route changes — a real bug that
  // showed up on link taps that also navigated. Since the aside is
  // always in DOM, we rely on pointer-events + aria-hidden + translate
  // to keep it visually and interactively hidden when closed.
  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={
          'fixed inset-0 z-50 bg-tp-darker/40 backdrop-blur-sm lg:hidden ' +
          'transition-opacity duration-200 ease-out ' +
          (open ? 'opacity-100' : 'opacity-0 pointer-events-none')
        }
      />
      <aside
        className={
          'fixed top-0 right-0 bottom-0 z-50 w-[min(420px,92vw)] bg-white shadow-tp-elevated overflow-y-auto lg:hidden ' +
          'transition-transform duration-300 ease-out will-change-transform ' +
          (open ? 'translate-x-0' : 'translate-x-full pointer-events-none')
        }
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-20 border-b border-tp-fog">
              <Link to="/" onClick={closeMenu}>
                <img src="/brand_assets/talent%20pull%20logo.png" alt="Talent Pull" className="h-10 w-auto" />
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                className="p-2 rounded-lg text-tp-dark hover:bg-tp-mist active:bg-tp-fog transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Accordion dropdowns */}
            <nav className="px-2 py-4">
              {nav.dropdowns.map((d) => {
                const isExpanded = expandedId === d.id;
                return (
                  <div key={d.id} className="border-b border-tp-fog last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : d.id)}
                      className="w-full flex items-center justify-between px-3 py-4 text-left text-tp-dark font-semibold"
                      aria-expanded={isExpanded}
                    >
                      {d.label}
                      <ChevronDown
                        className={'h-5 w-5 transition-transform duration-200 ' + (isExpanded ? 'rotate-180 text-tp-red' : '')}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="expanded"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-5 space-y-5">
                            {d.groups.map((g, gi) => (
                              <div key={gi}>
                                {g.heading && (
                                  <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-tp-red mb-2">
                                    {g.heading}
                                  </h3>
                                )}
                                <ul className="space-y-2.5">
                                  {g.links.map((l) => (
                                    <li key={l.label}>
                                      <Link to={l.to} onClick={closeMenu} className="text-tp-dark/80 hover:text-tp-teal text-[15px]">
                                        {l.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            {d.right && (
                              <div className="rounded-xl bg-tp-mist p-4">
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-tp-dark/70 mb-2">
                                  {d.right.heading}
                                </h3>
                                {d.right.items ? (
                                  // Plain non-clickable text list (Job Seekers "JOB CATEGORIES" shape)
                                  <ul className="space-y-2 mb-3">
                                    {d.right.items.map((label) => (
                                      <li key={label} className="text-[14px] text-tp-dark/70">
                                        {label}
                                      </li>
                                    ))}
                                  </ul>
                                ) : d.right.links ? (
                                  <ul className="space-y-2">
                                    {d.right.links.map((l) => (
                                      <li key={l.label}>
                                        <Link to={l.to} onClick={closeMenu} className="text-[14px] text-tp-teal-700 hover:text-tp-red">
                                          {l.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                                {d.right.bottomLink && (
                                  <Link
                                    to={d.right.bottomLink.to}
                                    onClick={closeMenu}
                                    className="mt-1 inline-block text-[14px] font-semibold text-tp-red"
                                  >
                                    {d.right.bottomLink.label}
                                  </Link>
                                )}
                              </div>
                            )}
                            <Link
                              to={d.left.cta.to}
                              onClick={closeMenu}
                              className="btn-primary w-full justify-center text-sm"
                            >
                              {d.left.cta.label}
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Bottom CTAs */}
            <div className="px-5 py-5 mt-2 border-t border-tp-fog space-y-3">
              {nav.rightLinks.map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  onClick={closeMenu}
                  className={l.kind === 'cta' ? 'btn-primary w-full justify-center' : 'btn-outline w-full justify-center'}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
      </aside>
    </>
  );
}
