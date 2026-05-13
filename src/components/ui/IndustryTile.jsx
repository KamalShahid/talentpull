import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Factory, Package, Building2, HardHat, Recycle, Truck, Landmark, Zap, ShoppingBag,
} from 'lucide-react';

const ICON_MAP = {
  factory: Factory,
  package: Package,
  building: Building2,
  'hard-hat': HardHat,
  recycle: Recycle,
  truck: Truck,
  landmark: Landmark,
  zap: Zap,
  'shopping-bag': ShoppingBag,
};

export default function IndustryTile({ tile, index = 0, to = '/industries' }) {
  const Icon = ICON_MAP[tile.icon] || Factory;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (index % 9) * 0.04 }}
    >
      <Link
        to={to}
        className="group flex items-center gap-4 rounded-xl border border-tp-fog bg-white p-5 hover:border-tp-teal hover:shadow-tp-soft transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-tp-teal-50 text-tp-teal-700 group-hover:bg-tp-teal group-hover:text-white transition-colors flex-shrink-0">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <span className="text-[15px] font-semibold text-tp-dark leading-snug">
          {tile.label || tile.title}
        </span>
      </Link>
    </motion.div>
  );
}
