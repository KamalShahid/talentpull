import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { nav } from '../../data/nav.js';
import MegaMenu from './MegaMenu.jsx';
import MobileDrawer from './MobileDrawer.jsx';

/**
 * Hover-only mega menu.
 *
 * Anti-stuck rules (per brief):
 *   - No click handler on the nav link toggles the menu. The label
 *     itself is a real Link; click navigates. Hover opens the panel.
 *   - A single onMouseLeave on the <header> wrapper closes after 150ms.
 *     Because the panel is a DOM descendant of the header, cursor on
 *     the panel keeps the menu open without needing a per-element
 *     mouseenter handler.
 *   - An invisible bridge div fills the gap at the bottom of the header
 *     to safely catch the cursor on its way down to the panel.
 *   - Escape, focus leaving the header, and any scroll on the window
 *     all close the menu immediately.
 *   - The panel is unmounted by AnimatePresence when closed; while it
 *     animates out, its pointer-events are forced to none so it can't
 *     intercept clicks/hovers during the exit.
 */
export default function Navbar() {
  const [openId, setOpenId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef(null);
  const location = useLocation();

  // ── State helpers ───────────────────────────────────────────
  const openMenu = useCallback((id) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setOpenId(id);
  }, []);

  const queueClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenId(null);
      closeTimer.current = null;
    }, 150);
  }, []);

  const closeAll = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setOpenId(null);
  }, []);

  // ── Effects: route change, escape, scroll, blur, cleanup ────
  useEffect(() => { setOpenId(null); setDrawerOpen(false); }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeAll(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeAll]);

  useEffect(() => {
    // Any user scroll dismisses an open mega menu immediately
    window.addEventListener('scroll', closeAll, { passive: true });
    return () => window.removeEventListener('scroll', closeAll);
  }, [closeAll]);

  // Clear any pending timer if the component unmounts
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // Close when focus leaves the entire header
  const handleHeaderBlur = useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) closeAll();
  }, [closeAll]);

  const activeDropdown = nav.dropdowns.find((d) => d.id === openId);

  return (
    <>
      <header
        onMouseLeave={queueClose}
        onBlur={handleHeaderBlur}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-tp-fog"
      >
        <div className="container-tp flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="Talent Pull home">
            <img
              src="/brand_assets/talent%20pull%20logo.png"
              alt="Talent Pull Inc."
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav — labels are real <Link>s; hover opens panel, click navigates */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {nav.dropdowns.map((d) => (
              <div
                key={d.id}
                onMouseEnter={() => openMenu(d.id)}
                className="relative"
              >
                <Link
                  to={d.left.cta.to}
                  onFocus={() => openMenu(d.id)}
                  className={cn(
                    'inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                    openId === d.id
                      ? 'text-tp-red bg-tp-red-50'
                      : 'text-tp-dark/80 hover:text-tp-red'
                  )}
                  aria-haspopup="true"
                  aria-expanded={openId === d.id}
                >
                  {d.label}
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform duration-200', openId === d.id && 'rotate-180')}
                  />
                </Link>
              </div>
            ))}
          </nav>

          {/* Desktop right-side: Contact + Find Talent */}
          <div className="hidden lg:flex items-center gap-3">
            {nav.rightLinks.map((l) =>
              l.kind === 'cta' ? (
                <NavLink key={l.label} to={l.to} className="btn-primary px-5 py-2.5 text-sm">
                  {l.label}
                </NavLink>
              ) : (
                <NavLink
                  key={l.label}
                  to={l.to}
                  className={({ isActive }) => cn('nav-link px-2', isActive && 'text-tp-red')}
                >
                  {l.label}
                </NavLink>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden p-2 rounded-lg text-tp-dark hover:bg-tp-mist active:bg-tp-fog transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/*
          Shared invisible bridge — sits in the empty space at the bottom of the
          header below the nav-link wrappers (y=64..80). It's a descendant of
          <header>, so cursor presence on it keeps the header's mouseleave from
          firing during the nav→panel transition. Pointer-events only when a
          menu is actually open, so it can't intercept anything otherwise.
        */}
        <div
          aria-hidden="true"
          className={cn(
            'hidden lg:block absolute inset-x-0 bottom-0 h-4',
            activeDropdown ? '' : 'pointer-events-none'
          )}
        />

        {/* Desktop mega menu — full-width panel */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              key={activeDropdown.id}
              initial={{ opacity: 0, y: -6, pointerEvents: 'none' }}
              animate={{ opacity: 1, y: 0, pointerEvents: 'auto' }}
              exit={{ opacity: 0, y: -6, pointerEvents: 'none' }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute inset-x-0 top-full bg-white border-t border-tp-fog shadow-tp-elevated"
            >
              <MegaMenu dropdown={activeDropdown} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
