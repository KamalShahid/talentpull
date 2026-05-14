import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu } from 'lucide-react';
import { nav } from '../../data/nav.js';
import MegaMenu from './MegaMenu.jsx';
import MobileDrawer from './MobileDrawer.jsx';

export default function Navbar() {
  const [openId, setOpenId] = useState(null);   // dropdown id currently open
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef(null);
  const location = useLocation();

  // Close mega menu when route changes.
  useEffect(() => { setOpenId(null); setDrawerOpen(false); }, [location.pathname, location.hash]);

  // Escape closes the menu.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpenId(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const open  = (id) => { clearTimeout(closeTimer.current); setOpenId(id); };
  const queueClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenId(null), 140);
  };
  const cancelClose = () => clearTimeout(closeTimer.current);

  const activeDropdown = nav.dropdowns.find((d) => d.id === openId);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-tp-fog">
        <div className="container-tp flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="Talent Pull home">
            <img
              src="/brand_assets/talent%20pull%20logo.png"
              alt="Talent Pull Inc."
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav — label is a clickable Link; hover still opens the panel */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {nav.dropdowns.map((d) => (
              <div
                key={d.id}
                onMouseEnter={() => open(d.id)}
                onMouseLeave={queueClose}
                className="relative"
              >
                <Link
                  to={d.left.cta.to}
                  onFocus={() => open(d.id)}
                  className={
                    'inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ' +
                    (openId === d.id
                      ? 'text-tp-red bg-tp-red-50'
                      : 'text-tp-dark/80 hover:text-tp-red')
                  }
                  aria-haspopup="true"
                  aria-expanded={openId === d.id}
                >
                  {d.label}
                  <ChevronDown
                    className={'h-4 w-4 transition-transform duration-200 ' + (openId === d.id ? 'rotate-180' : '')}
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
                  className={({ isActive }) =>
                    'nav-link px-2' + (isActive ? ' text-tp-red' : '')
                  }
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

        {/* Desktop mega menu — full-width panel */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              key={activeDropdown.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={cancelClose}
              onMouseLeave={queueClose}
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
