import { motion } from 'framer-motion';

/**
 * Brand-statement anchor card used in the 5-tile service grid to fill
 * the otherwise-empty 6th cell. Matches the surrounding ServiceCard
 * dimensions (rounded-2xl, p-7) but has no border / no CTA — purely a
 * visual brand moment with the white logo and tagline on a dark panel.
 */
export default function AnchorCard({ className = '', delay = 0.4 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className={
        'relative overflow-hidden rounded-2xl p-7 flex flex-col items-center justify-center text-center bg-tp-darker text-white h-full min-h-[260px] ' +
        className
      }
    >
      {/* Subtle brand-gradient glow so the panel reads rich, not flat */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 28% 22%, rgba(217,27,78,0.22) 0%, transparent 55%), radial-gradient(circle at 78% 82%, rgba(23,184,206,0.18) 0%, transparent 55%)',
        }}
      />
      <img
        src="/brand_assets/talent%20pull%20logo%20white.png"
        alt="Talent Pull"
        className="relative h-12 md:h-14 w-auto mb-5"
      />
      <p className="relative font-display text-lg md:text-xl font-semibold italic tracking-display-tight text-white/95 max-w-[15ch]">
        The Smart Way of Hiring
      </p>
    </motion.div>
  );
}
