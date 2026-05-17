// Navigation data — drives the desktop mega menu and mobile drawer.

export const nav = {
  // Always-visible right-side items
  rightLinks: [
    { label: 'Contact', to: '/contact', kind: 'link' },
    { label: 'Find Talent', to: '/workforce-solutions', kind: 'cta' },
  ],

  // Dropdowns (each opens a full-width mega menu panel)
  dropdowns: [
    {
      id: 'workforce-solutions',
      label: 'Workforce Solutions',
      left: {
        image: '/brand_assets/NavBar1.jpeg',
        imageAlt: 'Professional workplace and hiring scene',
        tagline: 'Hire Smarter. Scale Faster.',
        body: 'At Talent Pull, we provide tailored hiring and workforce solutions from professional roles to high-volume industrial staffing.',
        cta: { label: 'Explore Workforce Solutions', to: '/workforce-solutions' },
      },
      groups: [
        {
          heading: 'STAFFING',
          links: [
            { label: 'Professional Staffing',                to: '/workforce-solutions/professional-staffing' },
            { label: 'Industrial & Skilled Trades Staffing', to: '/workforce-solutions/industrial-staffing' },
            { label: 'Learn how we work with you',           to: '/workforce-solutions' },
          ],
        },
        {
          heading: 'OTHER SERVICES',
          links: [
            { label: 'Workforce & Payroll Solutions',  to: '/workforce-solutions/payroll-solutions' },
            { label: 'Financial & Operational Support', to: '/workforce-solutions/financial-support' },
            { label: 'Health & Safety Support',         to: '/workforce-solutions/health-safety' },
          ],
        },
      ],
      right: {
        heading: 'INDUSTRIES WE SERVE',
        links: [
          { label: 'Manufacturing & Industrial',   to: '/industries' },
          { label: 'Warehousing & Logistics',      to: '/industries' },
          { label: 'Construction & Skilled Trades',to: '/industries' },
          { label: 'Energy & Utilities',           to: '/industries' },
          { label: 'Retail & Consumer',            to: '/industries' },
          { label: 'Professional Services',        to: '/industries' },
        ],
        bottomLink: { label: 'Explore All Industries', to: '/industries' },
      },
    },

    {
      id: 'job-seekers',
      label: 'Job Seekers',
      left: {
        image: '/brand_assets/NavBar2.jpg',
        imageAlt: 'Candidate exploring job opportunities',
        tagline: 'Find the right opportunity — faster.',
        body: 'Browse roles that match your skills, experience, and goals across professional, industrial, and skilled trades.',
        cta: { label: 'Browse Jobs', to: '/job-seekers' },
      },
      groups: [
        {
          heading: 'FIND WORK',
          links: [
            { label: 'Browse All Jobs',                   to: '/job-seekers#jobs' },
            { label: 'Submit Your Resume',                to: '/job-seekers#apply' },
            { label: 'Professional Opportunities',        to: '/job-seekers#professional' },
            { label: 'Industrial & General Labour Jobs',  to: '/job-seekers#industrial' },
            { label: 'Skilled Trades Jobs',               to: '/job-seekers#trades' },
            { label: 'Temporary & Contract Work',         to: '/job-seekers#contract' },
          ],
        },
        {
          heading: 'HOW IT WORKS',
          links: [
            { label: 'How We Match You',           to: '/job-seekers#how-we-help' },
            { label: 'Resume & Interview Support', to: '/job-seekers#how-we-help' },
            { label: 'Faster Hiring Process',      to: '/job-seekers#how-we-help' },
            { label: 'Why Job Seekers Choose Us',  to: '/job-seekers#why-choose' },
          ],
        },
      ],
      right: {
        heading: 'JOB CATEGORIES',
        links: [
          { label: 'Accounting & Finance',          to: '/job-seekers#jobs' },
          { label: 'Technology & IT',               to: '/job-seekers#jobs' },
          { label: 'Administrative & Office',       to: '/job-seekers#jobs' },
          { label: 'Skilled Trades & Industrial',   to: '/job-seekers#jobs' },
          { label: 'General Labour',                to: '/job-seekers#jobs' },
        ],
        bottomLink: { label: 'Browse All Jobs', to: '/job-seekers#jobs' },
      },
    },

    {
      id: 'about',
      label: 'About',
      left: {
        image: '/brand_assets/NavBar3.jpg',
        imageAlt: 'Talent Pull recruiting team',
        tagline: 'Built on responsiveness, reliability, and results.',
        body: 'We focus on long-term partnerships, not transactional staffing.',
        cta: { label: 'Learn About Us', to: '/#about' },
      },
      groups: [
        {
          heading: null,
          links: [
            { label: 'About Talent Pull',  to: '/#about' },
            { label: 'Why Talent Pull',    to: '/#why' },
            { label: 'Our Process',        to: '/#process' },
            { label: 'AI-Powered Hiring',  to: '/#ai' },
          ],
        },
        {
          heading: 'WHAT SETS US APART',
          links: [
            { label: 'Responsive & Hands-On Support', to: '/#why' },
            { label: 'Quality-Focused Recruiting',    to: '/#why' },
            { label: 'AI-Powered Sourcing',           to: '/#ai' },
            { label: 'Flexible Workforce Solutions',  to: '/#why' },
          ],
        },
      ],
      right: {
        heading: 'OUR APPROACH',
        body: [
          'We don\'t send volume — we send the right people.',
          'Shortlists typically within 2–5 days.',
          'Human-led recruiting, not just algorithms.',
        ],
      },
    },

    {
      id: 'resources',
      label: 'Resources',
      left: {
        image: '/brand_assets/NavBar4.jpg',
        imageAlt: 'Professional reading hiring insights',
        tagline: 'Make smarter hiring decisions with practical workforce insights.',
        body: 'Real guidance from real recruiters — no fluff.',
        cta: { label: 'Discover Insights', to: '/insights' },
      },
      groups: [
        {
          heading: 'RESOURCES',
          links: [
            { label: 'Hiring Insights',  to: '/insights' },
            { label: 'Candidate Tips',   to: '/candidate-tips' },
            { label: 'FAQs',             to: '/faq' },
          ],
        },
        {
          heading: 'FOR EMPLOYERS',
          links: [
            { label: 'How to Reduce Hiring Delays', to: '/insights/reduce-hiring-delays' },
            { label: 'Temp vs Permanent Staffing',  to: '/insights/temp-vs-permanent' },
            { label: 'Effective Hiring Strategies', to: '/insights/effective-hiring' },
          ],
        },
        {
          heading: 'FOR JOB SEEKERS',
          links: [
            { label: 'Resume Tips',           to: '/candidate-tips/resume-tips' },
            { label: 'Interview Preparation', to: '/candidate-tips/interview-prep' },
            { label: 'What Employers Look For', to: '/candidate-tips/what-employers-want' },
          ],
        },
      ],
      right: {
        heading: 'DIVE DEEPER',
        links: [
          { label: 'How to Reduce Hiring Delays', to: '/insights/reduce-hiring-delays' },
          { label: 'Temp vs Permanent Staffing',  to: '/insights/temp-vs-permanent' },
          { label: 'Building a Retention Strategy', to: '/insights/retention-strategy' },
          { label: 'Effective Hiring Strategies', to: '/insights/effective-hiring' },
          { label: 'Payroll Mistakes to Avoid',   to: '/insights/payroll-mistakes' },
        ],
        bottomLink: null,
      },
    },
  ],
};
