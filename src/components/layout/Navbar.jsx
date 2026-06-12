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
 * Anti-stuck rules:
 *   - Nav labels are real <Link>s. Hover (enter on a wrapper) opens
 *     the panel; click navigates. There is no click-toggle.
 *   - Each nav item gets its OWN wrapper with both onMouseEnter and
 *     onMouseLeave. The shared mega-menu panel also gets the same pair.
 *     A single shared closeTimer ref coordinates: any enter clears
 *     a pending close; any leave queues a 120ms close. This means the
 *     menu only stays open while the cursor is actually on a trigger
 *     or the panel - not on the logo, Contact Us, or empty space
 *     elsewhere in the header.
 *   - A per-item invisible bridge fills the small gap between the
 *     bottom of a nav link and the top of the panel so the cursor
 *     can travel down without dropping into "no element" space.
 *   - Escape, focus leaving the header, any window scroll, route
 *     change, and a pointer-down outside the header all close
 *     immediately.
 *   - When the panel exits via AnimatePresence its pointer-events
 *     are forced to none for the duration of the exit animation.
 *   - Mobile uses a separate drawer with its own click-only logic;
 *     desktop hover handlers are inside `hidden lg:flex/lg:block`
 *     so they cannot fire below the lg breakpoint.
 */
export default function Navbar() {
  const [openId, setOpenId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef(null);
  const headerRef = useRef(null);
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
    }, 120);
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

  // Click anywhere outside the header dismisses the menu.
  // Covers the case where the user clicks a nav link for the page they're
  // already on (React Router treats it as a no-op so the route-change
  // useEffect doesn't fire) and then clicks somewhere else on the page.
  useEffect(() => {
    const onDocPointerDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) closeAll();
    };
    document.addEventListener('mousedown', onDocPointerDown);
    document.addEventListener('touchstart', onDocPointerDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onDocPointerDown);
      document.removeEventListener('touchstart', onDocPointerDown);
    };
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
        ref={headerRef}
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

          {/* Desktop nav - labels are real <Link>s. Hover (mouseenter on the
              wrapper) opens the panel; click navigates. Each item owns its
              own mouseenter/mouseleave + an invisible bridge so the cursor
              can traverse the small gap to the panel without dropping into
              non-trigger space (logo, Contact Us, etc.) which would otherwise
              leave the panel stuck open. */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {nav.dropdowns.map((d) => {
              const isOpen = openId === d.id;
              return (
                <div
                  key={d.id}
                  onMouseEnter={() => openMenu(d.id)}
                  onMouseLeave={queueClose}
                  className="relative"
                >
                  <Link
                    to={d.left.cta.to}
                    onFocus={() => openMenu(d.id)}
                    onClick={closeAll}
                    className={cn(
                      'inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                      isOpen
                        ? 'text-tp-red bg-tp-red-50'
                        : 'text-tp-dark/80 hover:text-tp-red'
                    )}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    {d.label}
                    <ChevronDown
                      className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
                    />
                  </Link>

                  {/* Per-item bridge. Only catches the cursor while this
                      item's panel is open, so it can't intercept events
                      from neighbouring items when closed. The link is
                      ~32px tall and centered in the 80px header, so the
                      gap from link-bottom to panel-top is ~24px. h-7
                      (28px) reaches past the header edge into the panel,
                      so the cursor's trip from link to panel is unbroken
                      even at slow speeds. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute left-0 right-0 top-full h-7',
                      isOpen ? '' : 'pointer-events-none'
                    )}
                  />
                </div>
              );
            })}
          </nav>

          {/* Desktop right-side: Contact Us CTA */}
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

        {/* Desktop mega menu - single shared full-width panel. Owns its
            own mouseenter/mouseleave that feed the same closeTimer ref:
            hovering the panel clears any pending close, leaving it queues
            one. pointer-events are gated TWICE: once via Framer's exit
            target so they drop the moment exit begins, and once via a
            class toggle keyed off openId so the panel can never silently
            intercept a hover during the 180ms fade-out. */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              key={activeDropdown.id}
              onMouseEnter={() => openMenu(activeDropdown.id)}
              onMouseLeave={queueClose}
              initial={{ opacity: 0, y: -6, pointerEvents: 'none' }}
              animate={{ opacity: 1, y: 0, pointerEvents: openId === activeDropdown.id ? 'auto' : 'none' }}
              exit={{ opacity: 0, y: -6, pointerEvents: 'none' }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'hidden lg:block absolute inset-x-0 top-full bg-white border-t border-tp-fog shadow-tp-elevated',
                openId === activeDropdown.id ? '' : 'pointer-events-none'
              )}
            >
              <MegaMenu dropdown={activeDropdown} onLinkClick={closeAll} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
