import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Check } from 'lucide-react';

export default function ArticlePageTemplate({ article, backLabel = 'All Articles', backTo = '/insights' }) {
  if (!article) {
    return (
      <section className="py-24 text-center">
        <div className="container-tp">
          <h1 className="font-display text-3xl font-bold text-tp-dark mb-3">Article not found</h1>
          <p className="text-tp-dark/60 mb-8">The article you're looking for doesn't exist or has moved.</p>
          <Link to={backTo} className="btn-primary">{backLabel}</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero with image */}
      <section className="relative bg-tp-darker text-white">
        {article.image && (
          <div className="absolute inset-0">
            <img
              src={article.image}
              alt=""
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tp-darker via-tp-darker/80 to-tp-darker/40" />
          </div>
        )}
        <div className="container-tp relative z-10 pt-16 pb-12 md:pt-20 md:pb-16">
          <Link
            to={backTo}
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {backLabel}
          </Link>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.18em] font-semibold"
          >
            <BookOpen className="h-3 w-3 text-tp-teal" /> Article
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-bold tracking-display-tight mt-5 text-3xl md:text-5xl leading-[1.1] text-balance max-w-4xl"
          >
            {article.title}
          </motion.h1>
        </div>
      </section>

      {/* Article body */}
      <article className="py-16 md:py-20 bg-white">
        <div className="container-tp max-w-3xl">
          <p className="text-xl text-tp-dark/80 leading-relaxed font-display mb-12 text-balance">
            {article.intro}
          </p>

          <div className="space-y-12">
            {article.sections.map((s, i) => (
              <motion.section
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.2) }}
              >
                <h2 className="font-display text-2xl md:text-[28px] font-bold text-tp-dark mb-4 tracking-display-tight">
                  {s.heading}
                </h2>

                {s.body && (
                  <p className="text-tp-dark/75 leading-relaxed text-[16.5px] mb-5">
                    {s.body}
                  </p>
                )}

                {s.bulletsHeading && (
                  <p className="font-semibold text-tp-dark mt-5 mb-3 text-[15.5px]">
                    {s.bulletsHeading}:
                  </p>
                )}
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="space-y-2.5 mb-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-tp-dark/75 leading-relaxed text-[16px]">
                        <Check className="h-4 w-4 mt-1 text-tp-teal-700 flex-shrink-0" strokeWidth={2.5} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.items && s.items.length > 0 && (
                  <div className="space-y-5 mt-2">
                    {s.items.map((item, idx) => (
                      <div key={idx} className="border-l-2 border-tp-red/30 pl-5">
                        <h3 className="font-display text-[17px] font-bold text-tp-dark mb-1.5">
                          {item.subheading}
                        </h3>
                        <p className="text-tp-dark/75 leading-relaxed text-[16px]">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.section>
            ))}
          </div>
        </div>
      </article>

      {/* CTA (supports new {headline, body, buttons[]} shape and legacy {label, to}) */}
      {article.cta && (
        <section className="py-16 md:py-20 bg-tp-mist">
          <div className="container-tp max-w-3xl text-center">
            <motion.h3
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="font-display text-2xl md:text-3xl font-bold text-tp-dark mb-3 tracking-display-tight text-balance"
            >
              {article.cta.headline || 'Looking for workforce support?'}
            </motion.h3>
            {article.cta.body && (
              <p className="text-tp-dark/70 mb-7 max-w-xl mx-auto leading-relaxed">
                {article.cta.body}
              </p>
            )}
            <div className="flex flex-wrap gap-3 justify-center">
              {Array.isArray(article.cta.buttons) ? (
                article.cta.buttons.map((b, i) => (
                  <Link
                    key={b.label}
                    to={b.to}
                    className={i === 0 ? 'btn-primary' : 'btn-outline'}
                  >
                    {b.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                ))
              ) : (
                <Link to={article.cta.to} className="btn-primary">
                  {article.cta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
