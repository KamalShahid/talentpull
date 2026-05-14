import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Building2, UserSearch } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import FAQAccordion from '../components/ui/FAQAccordion.jsx';
import { employerFaqs, jobSeekerFaqs } from '../data/faqs.js';

export default function FAQ() {
  const [tab, setTab] = useState('employers');
  const items = tab === 'employers' ? employerFaqs : jobSeekerFaqs;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-tp-darker text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(217,27,78,0.18) 0%, transparent 60%)' }}
        />
        <div className="container-tp relative z-10 pt-16 pb-16 md:pt-24 md:pb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.18em] font-semibold"
          >
            <Sparkles className="h-3 w-3 text-tp-red" /> Help Center
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-bold tracking-display-tight mt-5 text-4xl md:text-6xl leading-[1.05] max-w-3xl"
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg text-white/80 max-w-2xl leading-relaxed"
          >
            Common questions about working with Talent Pull as an employer or job seeker.
          </motion.p>
        </div>
      </section>

      {/* FAQ content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-tp max-w-3xl">
          {/* Tab switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-tp-mist rounded-full">
              <button
                type="button"
                onClick={() => setTab('employers')}
                className={
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ' +
                  (tab === 'employers' ? 'bg-white text-tp-dark shadow-tp-soft' : 'text-tp-dark/60 hover:text-tp-dark')
                }
              >
                <Building2 className="h-4 w-4" /> For Employers
              </button>
              <button
                type="button"
                onClick={() => setTab('jobSeekers')}
                className={
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ' +
                  (tab === 'jobSeekers' ? 'bg-white text-tp-dark shadow-tp-soft' : 'text-tp-dark/60 hover:text-tp-dark')
                }
              >
                <UserSearch className="h-4 w-4" /> For Job Seekers
              </button>
            </div>
          </div>

          <FAQAccordion items={items} />

          <div className="mt-14 rounded-2xl bg-gradient-to-br from-tp-red-50 via-white to-tp-teal-50 border border-tp-fog p-8 md:p-10 text-center">
            <h3 className="font-display text-2xl font-bold text-tp-dark mb-3 tracking-display-tight">
              Still have questions?
            </h3>
            <p className="text-tp-dark/70 mb-6 max-w-md mx-auto">
              Our team is happy to walk through your specific workforce or career needs.
            </p>
            <Link to="/contact" className="btn-primary">
              Contact Talent Pull <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
