import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { useScrollLock } from '../../hooks/useScrollLock.js';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export default function ApplyModal({ open, onClose, jobTitle = null }) {
  useScrollLock(open);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [formKey, setFormKey] = useState(0); // bumping remounts the form, clearing every field incl. file names
  const dialogRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    if (!open) return;
    setSubmitStatus((s) => (s === 'error' ? 'idle' : s));
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Auto-dismiss the success toast
  useEffect(() => {
    if (submitStatus !== 'success') return;
    const t = setTimeout(() => setSubmitStatus('idle'), 6000);
    return () => clearTimeout(t);
  }, [submitStatus]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const resetForm = () => setFormKey((k) => k + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = jobTitle || 'General Application';
    const resumeFile = form.get('resume');
    const certificationsFile = form.get('certs');

    const payload = new FormData();
    // Web3Forms fields
    payload.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY ?? '');
    payload.append('subject', `New Job Application - ${title}`);
    payload.append('from_name', 'TalentPull Website');
    payload.append('botcheck', form.get('botcheck') ? 'on' : ''); // honeypot: bots tick it, Web3Forms rejects
    // Application data
    payload.append('Job Title', title);
    payload.append('Applicant Name', form.get('fullName'));
    payload.append('Email Address', form.get('email'));
    payload.append('Contact Number', form.get('phone'));
    payload.append('Cover Letter', form.get('cover')?.trim() || 'Not provided');
    payload.append('Email Marketing Consent', form.get('emailConsent') ? 'Yes' : 'No');
    // Attachments: an empty file input still yields a 0-byte File, so check size
    if (resumeFile?.size) payload.append('resume', resumeFile, resumeFile.name);
    if (certificationsFile?.size) payload.append('certifications', certificationsFile, certificationsFile.name);

    setSubmitStatus('loading');
    try {
      // No Content-Type header: the browser sets the multipart boundary itself
      const response = await fetch(WEB3FORMS_ENDPOINT, { method: 'POST', body: payload });
      const result = await response.json();
      if (!result.success) {
        console.error('Web3Forms error:', result);
        setSubmitStatus('error');
        return;
      }
      setSubmitStatus('success');
      resetForm();
      closeTimer.current = setTimeout(onClose, 2500);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
    }
  };

  return (
    <>
    <AnimatePresence>
      {submitStatus === 'success' && (
        <motion.div
          key="apply-toast"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-md flex items-start gap-3 rounded-2xl bg-white border border-tp-fog shadow-tp-elevated p-4 pr-10"
        >
          <CheckCircle2 className="h-5 w-5 mt-0.5 text-tp-teal-700 flex-shrink-0" strokeWidth={2} />
          <p className="text-sm text-tp-dark leading-relaxed">
            Your application has been submitted successfully. We will be in touch shortly.
          </p>
          <button
            type="button"
            onClick={() => setSubmitStatus('idle')}
            className="absolute top-3 right-3 p-1 rounded-full text-tp-dark/50 hover:bg-tp-mist hover:text-tp-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-red active:scale-95 transition-[color,background-color,transform]"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
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

              <form key={formKey} onSubmit={handleSubmit} className="p-7 md:p-10">
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
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

                    <Field label="Short description / cover letter">
                      <textarea
                        name="cover"
                        rows={4}
                        className="form-input"
                        placeholder="Briefly tell us about your background and what you're looking for"
                      />
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FileField label="Resume" accept=".pdf,.doc,.docx" name="resume" />
                      <FileField label="Additional certifications" accept=".pdf,.doc,.docx,.jpg,.png" name="certs" />
                    </div>
                    <p className="text-xs text-tp-dark/55 -mt-1">
                      Attach your CV/resume and any certifications. Files are sent directly to our team.
                    </p>

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

                  {/* Privacy consent text - verbatim */}
                  <div className="mt-7 rounded-xl bg-tp-mist p-5 text-[13px] text-tp-dark/70 leading-relaxed space-y-3">
                    <p>
                      By submitting your contact details, you agree that Talent Pull Inc. may contact you regarding job opportunities, hiring updates, and relevant career-related information.
                    </p>
                    <p>
                      <strong className="text-tp-dark">Email Communications</strong> <em>(checkbox, must be ticked to consent)</em>: You consent to receive emails from Talent Pull containing job alerts, hiring insights, and occasional promotional content. You may unsubscribe at any time using the link provided in our emails or by contacting us directly.
                    </p>
                    <p>
                      <strong className="text-tp-dark">Phone & Text Communications</strong>: By providing your phone number, you agree that Talent Pull may contact you via calls or text messages about employment opportunities and related services. Standard message and data rates may apply. You can opt out at any time by replying "STOP" to text messages or notifying us directly.
                    </p>
                    <p>
                      <strong className="text-tp-dark">Privacy & Data Use</strong>: By proceeding, you confirm that you have reviewed and agree to our Terms of Use and Privacy Policy. You consent to Talent Pull collecting, using, and storing your personal information for recruitment and placement purposes, including sharing your profile with potential employers where appropriate. You may request access to, correction of, or deletion of your personal information at any time by contacting us. This consent includes communications sent directly by Talent Pull or through trusted partners acting on our behalf, using automated or manual methods.
                    </p>
                  </div>

                  {submitStatus === 'error' && (
                    <div
                      role="alert"
                      className="mt-7 flex items-start gap-2.5 rounded-xl border border-tp-red/25 bg-tp-red-50 p-4 text-sm text-tp-red leading-relaxed"
                    >
                      <AlertCircle className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                      <span>
                        Something went wrong. Please email us directly at{' '}
                        <a href="mailto:info@talentpull.ca" className="font-semibold underline underline-offset-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-red rounded-sm">
                          info@talentpull.ca
                        </a>
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitStatus === 'loading' || submitStatus === 'success'}
                    className="btn-primary w-full justify-center mt-7 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitStatus === 'loading' ? 'Submitting…' : 'Submit Application'}
                  </button>
                </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
    </>
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
