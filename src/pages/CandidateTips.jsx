import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import ArticleCard from '../components/ui/ArticleCard.jsx';
import { candidateTips } from '../data/candidateTips.js';

export default function CandidateTips() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-tp-darker text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(23,184,206,0.18) 0%, transparent 60%)' }}
        />
        <div className="container-tp relative z-10 pt-16 pb-16 md:pt-24 md:pb-20 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.18em] font-semibold"
          >
            <Sparkles className="h-3 w-3 text-tp-teal" /> Career Resources
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-bold tracking-display-tight mt-5 text-4xl md:text-6xl leading-[1.05]"
          >
            Candidate Tips & <span className="gradient-text">Career Resources</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg text-white/80 leading-relaxed"
          >
            Helpful guidance for candidates looking to improve resumes, prepare for interviews, and succeed in temporary, contract, or permanent roles.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-4 text-white/65 leading-relaxed"
          >
            Talent Pull shares practical workplace and job search tips designed to help candidates feel more prepared, confident, and job-ready.
          </motion.p>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-tp">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {candidateTips.map((a, i) => (
              <ArticleCard key={a.slug} article={a} basePath="/candidate-tips" index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Page CTA */}
      <section className="py-16 md:py-24 bg-tp-mist">
        <div className="container-tp max-w-3xl text-center">
          <SectionHeader
            eyebrow="GET HIRED"
            title="Looking for Your Next Opportunity?"
            sub="Browse current openings or submit your resume and let us match you with the right roles."
          />
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/job-seekers#jobs" className="btn-primary">
              Browse Jobs <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/job-seekers#apply" className="btn-outline">
              Submit Your Resume <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
