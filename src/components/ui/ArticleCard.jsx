import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ArticleCard({ article, basePath, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group rounded-2xl overflow-hidden bg-white border border-tp-fog hover:border-tp-dark/15 hover:shadow-tp-elevated transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 flex flex-col"
    >
      <Link to={`${basePath}/${article.slug}`} className="block aspect-[16/10] overflow-hidden bg-tp-mist">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-lg md:text-xl font-bold text-tp-dark mb-3 tracking-display-tight leading-snug">
          <Link to={`${basePath}/${article.slug}`} className="hover:text-tp-red transition-colors">
            {article.title}
          </Link>
        </h3>
        <p className="text-[14.5px] text-tp-dark/65 leading-relaxed mb-5 flex-1">
          {article.shortDescription}
        </p>
        <Link
          to={`${basePath}/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-tp-red hover:gap-2.5 transition-all"
        >
          Read More <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
