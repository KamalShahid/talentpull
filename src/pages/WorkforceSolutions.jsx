import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import ServiceCard from '../components/ui/ServiceCard.jsx';
import AnchorCard from '../components/ui/AnchorCard.jsx';
import IndustryTile from '../components/ui/IndustryTile.jsx';
import { services } from '../data/services.js';

const workforceIndustries = [
  { label: 'Energy & Utilities',                                       icon: 'zap' },
  { label: 'Manufacturing & Industrial (incl. Furniture & Cabinetry)', icon: 'factory' },
  { label: 'Warehousing & Logistics',                                  icon: 'truck' },
  { label: 'Construction & Skilled Trades',                            icon: 'hard-hat' },
  { label: 'Retail & Consumer',                                        icon: 'shopping-bag' },
  { label: 'Professional Services',                                    icon: 'briefcase' },
];

export default function WorkforceSolutions() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-tp-darker text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(217,27,78,0.18) 0%, transparent 60%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(23,184,206,0.14) 0%, transparent 60%)' }}
        />
        <div className="container-tp relative z-10 pt-16 pb-20 md:pt-24 md:pb-28">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.18em] font-semibold"
          >
            <Sparkles className="h-3 w-3 text-tp-red" /> Workforce Solutions
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-bold tracking-display-tight text-balance mt-5 text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl"
          >
            Workforce Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-xl text-white/80 max-w-2xl leading-relaxed"
          >
            We handle hiring, workforce management, payroll, and compliance — so you don't have to.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8"
          >
            <Link to="/contact" className="btn-primary">
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service tiles */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-tp">
          <SectionHeader
            eyebrow="OUR SERVICES"
            title="Five ways we support your workforce"
            sub="Each service is independent or works in combination — choose what fits your business needs."
          />
          {/* 3 + (2 + brand anchor) asymmetric grid so the 5 tiles fill 6 cells */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard service={services[0]} index={0} />
            <ServiceCard service={services[1]} index={1} />
            <ServiceCard service={services[2]} index={2} />
            <ServiceCard service={services[3]} index={3} />
            <AnchorCard className="md:col-span-2 lg:col-span-1" delay={0.4} />
            <ServiceCard service={services[4]} index={5} />
          </div>

          {/* Mid-page CTA */}
          <div className="mt-16 rounded-3xl bg-gradient-to-br from-tp-red-50 via-white to-tp-teal-50 border border-tp-fog p-10 text-center">
            <p className="font-display text-xl md:text-2xl font-bold text-tp-dark tracking-display-tight max-w-2xl mx-auto text-balance">
              Ready to hire? Book a consultation and get qualified candidates quickly.
            </p>
            <div className="mt-6">
              <Link to="/contact" className="btn-primary">
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries we serve */}
      <section className="py-20 md:py-28 bg-tp-mist">
        <div className="container-tp">
          <SectionHeader
            eyebrow="INDUSTRIES WE SERVE"
            title="Workforce solutions across every sector"
            sub="We support businesses across diverse industries with tailored hiring and workforce solutions."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {workforceIndustries.map((tile, i) => (
              <IndustryTile key={tile.label} tile={tile} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/industries" className="btn-outline">
              Explore Industries <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
