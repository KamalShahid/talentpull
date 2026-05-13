import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, sub, align = 'center', children }) {
  const wrapClass = align === 'left'
    ? 'max-w-3xl'
    : 'max-w-3xl mx-auto text-center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={wrapClass + ' mb-12 md:mb-16'}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={'section-title' + (eyebrow ? ' mt-3' : '')}>{title}</h2>
      {sub && <p className="section-sub mt-4 text-balance">{sub}</p>}
      {children && <div className="mt-6">{children}</div>}
    </motion.div>
  );
}
