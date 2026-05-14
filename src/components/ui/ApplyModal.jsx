import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle2 } from 'lucide-react';
import { useScrollLock } from '../../hooks/useScrollLock.js';

export default function ApplyModal({ open, onClose, jobTitle = null }) {
  useScrollLock(open);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setSubmitted(false);
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder — wire up to backend / form service later
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-tp-darker/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="dialog"
              ref={dialogRef}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-3xl shadow-tp-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="apply-modal-title"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-tp-dark/60 hover:bg-tp-mist hover:text-tp-dark transition-colors z-10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {submitted ? (
                <div className="p-12 text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-tp-teal-50 text-tp-teal-700 mb-5">
                    <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-tp-dark mb-3 tracking-display-tight">
                    Application received
                  </h2>
                  <p className="text-tp-dark/70 leading-relaxed max-w-md mx-auto mb-7">
                    Thank you. A Talent Pull recruiter will review your application and reach out within one business day.
                  </p>
                  <button type="button" onClick={onClose} className="btn-outline">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-7 md:p-10">
                  <div className="mb-7">
                    <span className="eyebrow">APPLY</span>
                    <h2
                      id="apply-modal-title"
                      className="font-display text-2xl md:text-3xl font-bold text-tp-dark mt-2 tracking-display-tight"
                    >
                      We find the best fit for you
                    </h2>
                    {jobTitle && (
                      <p className="text-sm text-tp-dark/60 mt-2">
                        Applying for: <span className="font-semibold text-tp-dark">{jobTitle}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Field label="Full Name" required>
                      <input
                        type="text"
                        name="fullName"
                        required
                        className="form-input"
                        placeholder="Your full name"
                      />
                    </Field>

                    <Field label="Short description / cover letter" required>
                      <textarea
                        name="cover"
                        required
                        rows={4}
                        className="form-input"
                        placeholder="Briefly tell us about your background and what you're looking for"
                      />
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FileField label="Resume" required accept=".pdf,.doc,.docx" name="resume" />
                      <FileField label="Additional certifications" accept=".pdf,.doc,.docx,.jpg,.png" name="certs" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Contact number" required>
                        <input type="tel" name="phone" required className="form-input" placeholder="(555) 555-5555" />
                      </Field>
                      <Field label="Email address" required>
                        <input type="email" name="email" required className="form-input" placeholder="you@example.com" />
                      </Field>
                    </div>

                    <label className="flex items-start gap-3 mt-4 cursor-pointer">
                      <input
                        type="checkbox"
                        name="emailConsent"
                        className="mt-1 h-4 w-4 rounded border-tp-fog text-tp-red focus:ring-tp-red"
                      />
                      <span className="text-sm text-tp-dark/75 leading-relaxed">
                        I agree to receive emails from Talent Pull
                      </span>
                    </label>
                  </div>

                  {/* Privacy consent text — verbatim */}
                  <div className="mt-7 rounded-xl bg-tp-mist p-5 text-[13px] text-tp-dark/70 leading-relaxed space-y-3">
                    <p>
                      By submitting your contact details, you agree that Talent Pull Inc. may contact you regarding job opportunities, hiring updates, and relevant career-related information.
                    </p>
                    <p>
                      <strong className="text-tp-dark">Email Communications</strong> <em>(checkbox — must be ticked to consent)</em>: You consent to receive emails from Talent Pull containing job alerts, hiring insights, and occasional promotional content. You may unsubscribe at any time using the link provided in our emails or by contacting us directly.
                    </p>
                    <p>
                      <strong className="text-tp-dark">Phone & Text Communications</strong>: By providing your phone number, you agree that Talent Pull may contact you via calls or text messages about employment opportunities and related services. Standard message and data rates may apply. You can opt out at any time by replying "STOP" to text messages or notifying us directly.
                    </p>
                    <p>
                      <strong className="text-tp-dark">Privacy & Data Use</strong>: By proceeding, you confirm that you have reviewed and agree to our Terms of Use and Privacy Policy. You consent to Talent Pull collecting, using, and storing your personal information for recruitment and placement purposes, including sharing your profile with potential employers where appropriate. You may request access to, correction of, or deletion of your personal information at any time by contacting us. This consent includes communications sent directly by Talent Pull or through trusted partners acting on our behalf, using automated or manual methods.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center mt-7 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting…' : 'Submit Application'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-semibold text-tp-dark mb-1.5">
        {label} {required && <span className="text-tp-red">*</span>}
      </span>
      {children}
    </label>
  );
}

function FileField({ label, required, accept, name }) {
  const [filename, setFilename] = useState('');
  return (
    <Field label={label} required={required}>
      <label className="relative flex items-center gap-2 h-11 px-3 rounded-lg border border-tp-fog bg-white cursor-pointer hover:border-tp-dark/30 transition-colors">
        <Upload className="h-4 w-4 text-tp-dark/50 flex-shrink-0" />
        <span className={'text-sm truncate ' + (filename ? 'text-tp-dark' : 'text-tp-dark/40')}>
          {filename || 'Choose file'}
        </span>
        <input
          type="file"
          name={name}
          accept={accept}
          required={required}
          onChange={(e) => setFilename(e.target.files?.[0]?.name || '')}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
    </Field>
  );
}
