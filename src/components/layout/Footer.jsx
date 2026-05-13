import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin } from 'lucide-react';

const footerLinks = {
  Solutions: [
    { label: 'Professional Staffing',           to: '/workforce-solutions/professional-staffing' },
    { label: 'Industrial Staffing',             to: '/workforce-solutions/industrial-staffing' },
    { label: 'Workforce & Payroll',             to: '/workforce-solutions/payroll-solutions' },
    { label: 'Financial & Operational Support', to: '/workforce-solutions/financial-support' },
    { label: 'Health & Safety',                 to: '/workforce-solutions/health-safety' },
  ],
  'Job Seekers': [
    { label: 'Browse Jobs',         to: '/job-seekers#jobs' },
    { label: 'Submit Your Resume',  to: '/job-seekers#apply' },
    { label: 'Candidate Tips',      to: '/candidate-tips' },
  ],
  Company: [
    { label: 'About Talent Pull', to: '/#about' },
    { label: 'Why Talent Pull',   to: '/#why' },
    { label: 'Our Process',       to: '/#process' },
    { label: 'Industries',        to: '/industries' },
  ],
  Resources: [
    { label: 'Insights',       to: '/insights' },
    { label: 'FAQs',           to: '/faq' },
    { label: 'Contact',        to: '/contact' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-tp-darker text-white">
      <div className="container-tp py-16">
        <div className="grid lg:grid-cols-[1.4fr_3fr] gap-12">
          {/* Brand block */}
          <div>
            <img
              src="/brand_assets/talent%20pull%20logo%20white.png"
              alt="Talent Pull Inc."
              className="h-12 w-auto mb-5"
              onError={(e) => { e.currentTarget.src = '/brand_assets/talent%20pull%20logo.png'; }}
            />
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Canadian staffing and workforce solutions partner. We help businesses hire faster, operate efficiently, and scale with confidence.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/80">
              <a href="mailto:info@talentpull.ca" className="inline-flex items-center gap-2 hover:text-tp-teal transition-colors">
                <Mail className="h-4 w-4" /> info@talentpull.ca
              </a>
              <div className="inline-flex items-center gap-2 text-white/70">
                <MapPin className="h-4 w-4" /> Ontario, Canada
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-tp-red transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white/60 mb-4">
                  {heading}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-[14px] text-white/80 hover:text-tp-teal transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-white/50">
          <p>© {year} Talent Pull Inc. All rights reserved.</p>
          <p>Built around responsiveness, reliability, and results.</p>
        </div>
      </div>
    </footer>
  );
}
