import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Linkedin, Sparkles, Send, CheckCircle2 } from 'lucide-react';

const inquiryTypes = [
  { id: 'hire',       label: 'I need to hire' },
  { id: 'job',        label: 'I\'m looking for work' },
  { id: 'payroll',    label: 'Payroll & workforce admin' },
  { id: 'consulting', label: 'Financial / operational support' },
  { id: 'other',      label: 'Other' },
];

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-tp-darker text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(23,184,206,0.16) 0%, transparent 60%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(217,27,78,0.18) 0%, transparent 60%)' }}
        />
        <div className="container-tp relative z-10 pt-16 pb-16 md:pt-24 md:pb-20 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.18em] font-semibold"
          >
            <Sparkles className="h-3 w-3 text-tp-teal" /> Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-bold tracking-display-tight mt-5 text-4xl md:text-6xl leading-[1.05]"
          >
            Let's talk about your{' '}
            <span className="gradient-text">workforce needs</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg text-white/80 leading-relaxed"
          >
            Whether you need one key hire, a full workforce solution, or operational support, our team responds within one business day.
          </motion.p>
        </div>
      </section>

      {/* Form + contact info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-tp">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
            {/* Form */}
            <div className="rounded-3xl bg-white border border-tp-fog shadow-tp-soft p-7 md:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-tp-teal-50 text-tp-teal-700 mb-5">
                    <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-tp-dark mb-3 tracking-display-tight">
                    Message received
                  </h2>
                  <p className="text-tp-dark/70 max-w-md mx-auto">
                    Thank you. A Talent Pull team member will follow up within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <h2 className="font-display text-2xl font-bold text-tp-dark mb-2 tracking-display-tight">
                    Send us a message
                  </h2>
                  <p className="text-tp-dark/60 text-sm mb-7">All fields with * are required.</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-tp-dark mb-1.5">
                        What can we help with? <span className="text-tp-red">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {inquiryTypes.map((t) => (
                          <label key={t.id} className="inline-flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="inquiry"
                              value={t.id}
                              required
                              className="peer sr-only"
                            />
                            <span className="px-3 py-1.5 rounded-full border border-tp-fog bg-white text-tp-dark/75 text-sm font-medium hover:border-tp-dark/30 transition-colors peer-checked:bg-tp-red peer-checked:text-white peer-checked:border-tp-red">
                              {t.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="block text-[13px] font-semibold text-tp-dark mb-1.5">First name <span className="text-tp-red">*</span></span>
                        <input type="text" name="firstName" required className="form-input" />
                      </label>
                      <label className="block">
                        <span className="block text-[13px] font-semibold text-tp-dark mb-1.5">Last name <span className="text-tp-red">*</span></span>
                        <input type="text" name="lastName" required className="form-input" />
                      </label>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="block text-[13px] font-semibold text-tp-dark mb-1.5">Email <span className="text-tp-red">*</span></span>
                        <input type="email" name="email" required className="form-input" placeholder="you@company.com" />
                      </label>
                      <label className="block">
                        <span className="block text-[13px] font-semibold text-tp-dark mb-1.5">Phone</span>
                        <input type="tel" name="phone" className="form-input" placeholder="(555) 555-5555" />
                      </label>
                    </div>

                    <label className="block">
                      <span className="block text-[13px] font-semibold text-tp-dark mb-1.5">Company</span>
                      <input type="text" name="company" className="form-input" placeholder="Your company name" />
                    </label>

                    <label className="block">
                      <span className="block text-[13px] font-semibold text-tp-dark mb-1.5">Message <span className="text-tp-red">*</span></span>
                      <textarea name="message" required rows={5} className="form-input" placeholder="Tell us about your needs and timing" />
                    </label>
                  </div>

                  <button type="submit" disabled={submitting} className="btn-primary w-full justify-center mt-7 disabled:opacity-60">
                    {submitting ? 'Sending…' : (<>Send Message <Send className="h-4 w-4" /></>)}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info sidebar */}
            <div className="lg:pl-6">
              <h3 className="font-display text-xl font-bold text-tp-dark mb-5 tracking-display-tight">
                Get in touch directly
              </h3>
              <ul className="space-y-5">
                <li>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-tp-red-50 text-tp-red flex-shrink-0">
                      <Mail className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-tp-dark/50 font-semibold">Email</div>
                      <a href="mailto:info@talentpull.ca" className="text-tp-dark font-semibold hover:text-tp-red transition-colors">
                        info@talentpull.ca
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-tp-teal-50 text-tp-teal-700 flex-shrink-0">
                      <Phone className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-tp-dark/50 font-semibold">Phone</div>
                      <div className="text-tp-dark/70 text-sm">Available on request</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-tp-red-50 text-tp-red flex-shrink-0">
                      <MapPin className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-tp-dark/50 font-semibold">Location</div>
                      <div className="text-tp-dark font-semibold">Ontario, Canada</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-tp-teal-50 text-tp-teal-700 flex-shrink-0">
                      <Linkedin className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-tp-dark/50 font-semibold">Connect</div>
                      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="text-tp-dark font-semibold hover:text-tp-teal-700 transition-colors">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-10 rounded-2xl bg-tp-mist p-6">
                <h4 className="font-display font-bold text-tp-dark mb-2">Response time</h4>
                <p className="text-sm text-tp-dark/70 leading-relaxed">
                  Our team typically responds to all inquiries within one business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
