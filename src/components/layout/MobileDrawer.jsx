import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { nav } from '../../data/nav.js';
import { useScrollLock } from '../../hooks/useScrollLock.js';

export default function MobileDrawer({ open, onClose }) {
  useScrollLock(open);
  const [expandedId, setExpandedId] = useState(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-tp-darker/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[min(420px,92vw)] bg-white shadow-tp-elevated overflow-y-auto lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-20 border-b border-tp-fog">
              <Link to="/" onClick={onClose}>
                <img src="/brand_assets/talent%20pull%20logo.png" alt="Talent Pull" className="h-10 w-auto" />
              </Link>
              <button
                type="button"
                onClick={onClose}
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
                                      <Link to={l.to} onClick={onClose} className="text-tp-dark/80 hover:text-tp-teal text-[15px]">
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
                                <ul className="space-y-2">
                                  {d.right.links.map((l) => (
                                    <li key={l.label}>
                                      <Link to={l.to} onClick={onClose} className="text-[14px] text-tp-teal-700 hover:text-tp-red">
                                        {l.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <Link
                              to={d.left.cta.to}
                              onClick={onClose}
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
                  onClick={onClose}
                  className={l.kind === 'cta' ? 'btn-primary w-full justify-center' : 'btn-outline w-full justify-center'}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
