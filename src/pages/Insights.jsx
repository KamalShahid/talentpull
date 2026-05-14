import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import ArticleCard from '../components/ui/ArticleCard.jsx';
import { insights } from '../data/insights.js';

export default function Insights() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-tp-darker text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(217,27,78,0.18) 0%, transparent 60%)' }}
        />
        <div className="container-tp relative z-10 pt-16 pb-16 md:pt-24 md:pb-20 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.18em] font-semibold"
          >
            <Sparkles className="h-3 w-3 text-tp-red" /> Hiring Insights
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-bold tracking-display-tight mt-5 text-4xl md:text-6xl leading-[1.05]"
          >
            Insights & <span className="gradient-text">Resources</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg text-white/80 leading-relaxed"
          >
            Practical hiring insights, workforce guidance, payroll strategies, and operational support designed to help businesses build stronger teams and operate more efficiently.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-4 text-white/65 leading-relaxed"
          >
            At Talent Pull, we share straightforward, experience-driven insights focused on hiring efficiency, workforce planning, candidate retention, payroll coordination, staffing challenges, and operational growth — without unnecessary complexity. Whether you're scaling your workforce, improving internal processes, or navigating hiring challenges, our goal is to provide practical information businesses can actually use.
          </motion.p>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-tp">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((a, i) => (
              <ArticleCard key={a.slug} article={a} basePath="/insights" index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Page CTA */}
      <section className="py-16 md:py-24 bg-tp-mist">
        <div className="container-tp max-w-3xl text-center">
          <SectionHeader
            eyebrow="WORKFORCE SUPPORT"
            title="Looking for Workforce & Operational Support?"
            sub="Talent Pull helps businesses improve hiring efficiency, workforce coordination, payroll administration, and operational support through practical, responsive workforce solutions."
          />
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/workforce-solutions" className="btn-primary">
              Explore Employer Solutions <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-outline">
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
