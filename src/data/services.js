// Full content for the 5 service pages.
// Each entry is referenced by its slug, which matches its route under /workforce-solutions/:slug

export const services = [
  {
    slug: 'professional-staffing',
    route: '/workforce-solutions/professional-staffing',
    title: 'Professional Staffing',
    icon: 'briefcase',
    accent: 'red',
    summary: 'Find the right talent for long-term and project-based roles.',
    tileBullets: [
      'Permanent Recruitment',
      'Contract & Temporary Staffing',
      'Temp-to-Perm Hiring',
    ],
    tileCta: { label: 'Explore Professional Staffing', to: '/workforce-solutions/professional-staffing' },

    hero: {
      headline: 'Professional Staffing',
      subtext: 'Hire the right talent — faster and with confidence.',
      body: 'We combine AI-powered sourcing with hands-on recruiting to help you find professionals who are not just qualified, but the right fit for your team. Whether it\'s a key hire or ongoing support, the focus is on quality, speed, and long-term alignment.',
    },
    whatWeCover: [
      'Permanent Recruitment',
      'Contract & Temporary Staffing',
      'Temp-to-Perm Hiring',
    ],
    howWeWork: {
      pullQuote: 'We don\'t send volume. We send the right people.',
      body: 'Each candidate is screened for experience, fit, and reliability — so you spend time interviewing the right profiles, not filtering through resumes.',
    },
    keyMetrics: [
      'Shortlists typically shared within 2 to 5 days',
      'Reduced time spent screening candidates',
      'Improved hiring efficiency and fit',
    ],
    faq: [
      { q: 'How quickly can you provide candidates?',   a: 'Most shortlists are shared within a few days, depending on the role and requirements.' },
      { q: 'Do you only provide permanent hires?',      a: 'No. We support permanent, contract, and temp-to-perm hiring.' },
      { q: 'How do you ensure candidate quality?',      a: 'We screen candidates based on experience, role fit, and reliability before sharing profiles.' },
      { q: 'Can you support specialized or senior roles?', a: 'Yes. We support mid to senior-level hiring across finance, technology, and operations.' },
    ],
    cta: { label: 'Book a Consultation', to: '/contact' },
  },

  {
    slug: 'industrial-staffing',
    route: '/workforce-solutions/industrial-staffing',
    title: 'Industrial & Skilled Trades Staffing',
    icon: 'hard-hat',
    accent: 'teal',
    summary: 'Build a reliable workforce across general labour and skilled roles.',
    tileBullets: [
      'General Labour & Warehouse Staff',
      'Machine & CNC Operators',
      'Electricians, Plumbers, Carpenters',
      'Mechanical & Skilled Trades',
    ],
    tileCta: { label: 'Explore Workforce Solutions', to: '/workforce-solutions/industrial-staffing' },

    hero: {
      headline: 'Industrial & Skilled Trades Staffing',
      subtext: 'Reliable workforce solutions that keep your operations moving.',
      body: 'We provide general labour and skilled trades with a focus on speed, consistency, and reliability — so your operations don\'t slow down.',
    },
    whatWeCover: [
      'General Labour & Warehouse Staff',
      'Machine & CNC Operators',
      'Electricians, Plumbers, Carpenters',
      'Mechanical & Skilled Trades',
    ],
    howWeWork: {
      pullQuote: 'We focus on people who show up and perform.',
      body: 'Candidates are screened for availability, basic skills, and reliability — ensuring you get workers who are ready to contribute from day one.',
    },
    keyMetrics: [
      'Workforce deployment within 24–72 hours',
      'Reduced operational downtime',
      'Improved attendance and workforce consistency',
    ],
    faq: [
      { q: 'How quickly can you provide workers?',                 a: 'In many cases, we can deploy workers within 24–72 hours depending on availability.' },
      { q: 'Do you provide both general labour and skilled trades?', a: 'Yes. We cover general labour, machine operators, CNC operators, and skilled trades.' },
      { q: 'Can you handle bulk or shift-based hiring?',            a: 'Yes. We support high-volume and ongoing workforce requirements.' },
      { q: 'How do you ensure reliability of workers?',             a: 'Candidates are screened for availability, basic skills, and attendance reliability.' },
    ],
    cta: { label: 'Request Workforce', to: '/contact' },
  },

  {
    slug: 'payroll-solutions',
    route: '/workforce-solutions/payroll-solutions',
    title: 'Workforce & Payroll Solutions',
    icon: 'wrench',
    accent: 'red',
    summary: 'Simplify contractor management and stay compliant.',
    tileBullets: null,
    tileCta: { label: 'Learn More', to: '/workforce-solutions/payroll-solutions' },

    hero: {
      headline: 'Workforce & Payroll Solutions',
      subtext: 'Simplify how you manage people, payroll, and compliance.',
      body: 'We take care of the administrative side of your workforce — so you don\'t have to.',
    },
    whatWeCover: [
      'Contractor payroll management',
      'Employee payrolling',
      'Compliance support',
      'Record keeping and reporting',
    ],
    howWeWork: {
      pullQuote: 'Less admin. More confidence.',
      body: 'We reduce internal workload, ensure payments are accurate and on time, and keep you aligned with compliance requirements.',
    },
    keyMetrics: [
      'Reduced administrative effort by at least 10%',
      'Improved payroll accuracy and timeliness',
    ],
    faq: [
      { q: 'Do you handle payroll for contract workers?',     a: 'Yes. We manage contractor payroll, including payments and related documentation.' },
      { q: 'Can you support compliance requirements?',        a: 'Yes. We help ensure workforce setup aligns with applicable standards and requirements.' },
      { q: 'Do you only support payroll for your placements?', a: 'No. We can also support payroll for your existing workforce.' },
      { q: 'How does this reduce our internal workload?',     a: 'We take care of payroll processing and record keeping, reducing administrative effort on your side.' },
    ],
    cta: { label: 'Simplify Your Workforce', to: '/contact' },
  },

  {
    slug: 'financial-support',
    route: '/workforce-solutions/financial-support',
    title: 'Financial & Operational Support',
    icon: 'calculator',
    accent: 'teal',
    summary: 'Support your business with bookkeeping and accounting expertise.',
    tileBullets: null,
    tileCta: { label: 'Learn More', to: '/workforce-solutions/financial-support' },

    hero: {
      headline: 'Financial & Operational Support',
      subtext: 'Practical financial support that keeps your business on track.',
      body: 'We provide structured bookkeeping and accounting support — helping you maintain accurate records and make better decisions.',
    },
    additionalServices: [
      'Financial Consultancy',
      'Expertise in setting up a new finance department',
      'Assisting with financial and operational audits',
    ],
    whatWeCover: [
      'Bookkeeping',
      'Accounts Payable & Receivable',
      'Bank & Credit Card Reconciliations',
      'Financial Reporting',
      'Interim Finance Support',
    ],
    howWeWork: {
      pullQuote: 'Simple, consistent, and reliable.',
      body: 'The goal is to give you clean numbers you can trust — without overcomplicating the process.',
    },
    keyMetrics: [
      'Improved reporting accuracy',
      'Better visibility on cash and expenses',
    ],
    faq: [
      { q: 'Do you only provide bookkeeping?',           a: 'No. We also support accounts payable/receivable, reconciliations, and financial reporting.' },
      { q: 'Can you support growing businesses?',        a: 'Yes. Our services are designed for businesses that need structure without a full finance team.' },
      { q: 'Do you offer temporary or interim support?', a: 'Yes. We can support during transitions or periods of growth.' },
      { q: 'How do you ensure accuracy?',                a: 'Work is done in a structured and consistent manner to maintain reliable financial records.' },
    ],
    cta: { label: 'Get Financial Support', to: '/contact' },
  },

  {
    slug: 'health-safety',
    route: '/workforce-solutions/health-safety',
    title: 'Health & Safety Support',
    icon: 'shield',
    accent: 'red',
    summary: 'Ensure workplace compliance and workforce readiness.',
    tileBullets: null,
    tileCta: { label: 'Learn More', to: '/workforce-solutions/health-safety' },

    hero: {
      headline: 'Health & Safety Support',
      subtext: 'Keep your workforce safe and compliant.',
      body: 'We support businesses in maintaining safe working environments and meeting required standards.',
    },
    whatWeCover: [
      'Safety training coordination',
      'Compliance support',
      'Pre-placement safety screening',
      'Documentation support',
    ],
    howWeWork: {
      pullQuote: 'Safer workplaces, stronger operations.',
      body: 'A safer workplace reduces risk, improves workforce readiness, and supports operational consistency.',
    },
    keyMetrics: [
      'Reduced safety-related risks by average 20%',
      'Improved audit and compliance readiness',
    ],
    faq: [
      { q: 'Do you provide safety training?',                a: 'We coordinate and support training based on your requirements.' },
      { q: 'Can you help with compliance and documentation?', a: 'Yes. We assist with documentation and audit readiness.' },
      { q: 'Is this only for industrial environments?',       a: 'Primarily, but we can support any workplace with safety requirements.' },
      { q: 'How does this improve operations?',               a: 'A safer workplace reduces risk and improves workforce readiness and consistency.' },
    ],
    cta: { label: 'Improve Workplace Safety', to: '/contact' },
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
