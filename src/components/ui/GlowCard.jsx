import { useEffect, useRef } from 'react';

/**
 * Per-card spotlight glow with cursor-tracked radial gradient.
 * Hue sweeps from brand red (340°) to brand teal (188°) as the
 * pointer moves horizontally across the card.
 */
export default function GlowCard({ children, className = '', style = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--x',  x.toFixed(2));
      el.style.setProperty('--y',  y.toFixed(2));
      el.style.setProperty('--xp', (x / rect.width).toFixed(2));
      el.style.setProperty('--yp', (y / rect.height).toFixed(2));
    };
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div ref={ref} className={'glow-card ' + className} style={style}>
      <div className="glow-card-inner" aria-hidden="true" />
      {children}
    </div>
  );
}
