import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, HardHat, Wrench, Calculator, Shield } from 'lucide-react';

const ICON_MAP = {
  briefcase: Briefcase,
  'hard-hat': HardHat,
  wrench: Wrench,
  calculator: Calculator,
  shield: Shield,
};

export default function ServiceCard({ service, index = 0 }) {
  const Icon = ICON_MAP[service.icon] || Briefcase;
  const isRed = service.accent === 'red';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className="group relative rounded-2xl bg-white border border-tp-fog p-7 hover:border-tp-dark/15 hover:shadow-tp-elevated transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1"
    >
      <div
        className={
          'inline-flex h-12 w-12 items-center justify-center rounded-xl mb-5 ' +
          (isRed
            ? 'bg-gradient-to-br from-tp-red-50 to-tp-red-100 text-tp-red'
            : 'bg-gradient-to-br from-tp-teal-50 to-tp-teal-100 text-tp-teal-700')
        }
      >
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </div>

      <h3 className="font-display text-xl font-bold text-tp-dark mb-2 tracking-display-tight">
        {service.title}
      </h3>
      <p className="text-[15px] text-tp-dark/70 leading-relaxed mb-5">
        {service.summary}
      </p>

      {service.tileBullets && (
        <ul className="space-y-1.5 mb-6 text-sm text-tp-dark/70">
          {service.tileBullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className={'mt-1.5 h-1 w-1 rounded-full flex-shrink-0 ' + (isRed ? 'bg-tp-red' : 'bg-tp-teal')} />
              {b}
            </li>
          ))}
        </ul>
      )}

      <Link
        to={service.tileCta.to}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-tp-dark hover:text-tp-red transition-colors"
      >
        {service.tileCta.label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}
