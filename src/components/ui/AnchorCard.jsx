import { motion } from 'framer-motion';

/**
 * Brand-statement anchor card used in the 5-tile service grid to fill
 * the otherwise-empty 6th cell. Matches the surrounding ServiceCard
 * dimensions (rounded-2xl) but has no border / no CTA - purely a visual
 * brand moment with the TalentPull logo (the logo already carries the
 * "Smart Way of Hiring" tagline).
 *
 * Layers, bottom → top:
 *   1. tp-darker base panel
 *   2. talent-acquisition photo @ opacity 0.35, mix-blend-mode: luminosity
 *      (drifts vertically on a slow loop; lifts to 0.50 on hover)
 *   3. dark→light vertical gradient (heavier at the bottom for legibility;
 *      thins at the top on hover so the photo breathes through more)
 *   4. radial ambient glow behind the logo (pulses on loop)
 *   5. centered white logo (fades + scales in, then bobs gently;
 *      scales 1.04 on hover)
 *   6. diagonal shimmer sweep that crosses the card every ~5s
 *
 * Hover transitions use Tailwind's group-hover with explicit 400ms
 * timing so they coexist cleanly with the looping Framer animations
 * without fighting the variant propagation chain.
 */
export default function AnchorCard({ className = '', delay = 0.4 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={
        'group relative overflow-hidden rounded-2xl bg-tp-darker text-white h-full min-h-[260px] ' +
        'border border-white/5 transition-colors duration-[400ms] ease-out hover:border-tp-red/30 ' +
        className
      }
    >
      {/* ── Layer 2: photo, mixed to luminosity, slow vertical parallax drift.
              The drift wrapper handles the looping translate; the inner <img>
              owns the hover-driven opacity transition. ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src="/brand_assets/talent-acquisition-ima.jpeg"
          alt=""
          loading="lazy"
          className={
            'absolute inset-0 h-full w-full object-cover object-[center_top] ' +
            'opacity-[0.35] group-hover:opacity-50 transition-opacity duration-[400ms] ease-out'
          }
          style={{ mixBlendMode: 'luminosity' }}
        />
      </motion.div>

      {/* ── Layer 3: dark vertical gradient. Two stacked gradients - the rest
              one is always visible; the hover one fades in on hover, giving
              a softer top stop without animating a background-image property
              (which CSS can't smoothly interpolate). ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-[400ms] ease-out"
        style={{
          background:
            'linear-gradient(to top, rgba(15,26,36,0.92) 0%, rgba(15,26,36,0.55) 50%, rgba(15,26,36,0.30) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] ease-out"
        style={{
          background:
            'linear-gradient(to top, rgba(15,26,36,0.92) 0%, rgba(15,26,36,0.50) 50%, rgba(15,26,36,0.15) 100%)',
        }}
      />

      {/* ── Layer 4: ambient radial glow behind the logo - slow scale+opacity pulse ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="h-3/4 w-3/4"
          style={{
            background:
              'radial-gradient(circle, rgba(217,27,78,0.15) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* ── Layer 5: centered logo. Outer motion handles the one-shot entrance
              (fade + scale-up). Middle <div> takes the group-hover scale so
              it doesn't fight the entrance scale. Inner motion handles the
              continuous bobbing float. ── */}
      <div className="relative h-full w-full flex items-center justify-center px-8 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          className="relative w-[65%] max-w-[260px]"
        >
          <div className="transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]">
            <motion.img
              src="/brand_assets/talent%20pull%20logo%20white.png"
              alt="Talent Pull, The Smart Way of Hiring"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="block h-auto w-full object-contain"
            />
          </div>
        </motion.div>
      </div>

      {/* ── Layer 6: diagonal shimmer sweep - 1.2s travel, 3.8s pause,
              giving a ~5s overall cycle. ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-y-0 -left-1/2 w-[200%] pointer-events-none"
        initial={{ x: '-75%' }}
        animate={{ x: ['-75%', '75%'] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatDelay: 3.8,
          ease: 'linear',
        }}
        style={{
          background:
            'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
