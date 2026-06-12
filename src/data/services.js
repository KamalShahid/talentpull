// Full content for the 5 service pages.
// Each entry is referenced by its slug, which matches its route under /workforce-solutions/:slug

export const services = [
  {
    slug: 'professional-staffing',
    route: '/workforce-solutions/professional-staffing',
    title: 'Professional Staffing',
    icon: 'briefcase',
    accent: 'red',
    summary: 'Find the right talent for permanent, contract, and project-based roles across professional functions.',
    tileBullets: [
      'Permanent & direct hire recruitment',
      'Contract & temporary staffing',
      'Temp-to-perm hiring',
      'Executive and mid-level search',
    ],
    bestFor: 'Companies scaling their office or professional teams',
    tileCta: { label: 'Explore Professional Staffing', to: '/workforce-solutions/professional-staffing' },

    hero: {
      headline: 'Professional Staffing',
      subtext: 'Hire the right talent, faster and with confidence.',
      body: 'We combine AI-powered sourcing with hands-on recruiting to help you find professionals who are not just qualified, but the right fit for your team. Whether it\'s a key hire or ongoing support, the focus is on quality, speed, and long-term alignment.',
    },
    whatWeCover: [
      {
        label: 'Permanent Recruitment',
        description:
          'Find professionals who stay. We run full-cycle recruitment: sourcing, screening, reference checks, and offer support so your next permanent hire is someone you\'d choose again.',
        bullets: [
          'Office & administrative professionals',
          'Finance, HR, and operations roles',
          'Management and team lead positions',
          'Direct hire with a replacement guarantee',
        ],
      },
      {
        label: 'Contract & Temporary Staffing',
        description:
          'Scale your team up or down without the overhead. We supply vetted contract and temporary professionals ready to step in for seasonal demand, project surges, parental leaves, or short-notice gaps.',
        bullets: [
          'Flexible contracts',
          'Pre-screened, reference-checked candidates',
          'Fast turnaround. Candidates within 24-48 hrs',
          'We handle payroll and employer obligations',
        ],
      },
      {
        label: 'Temp-to-Perm Hiring',
        description:
          'Try before you commit. Bring someone on in a temporary capacity and evaluate their fit in your actual work environment, then convert to permanent when you\'re confident. It\'s the lowest-risk way to hire.',
        bullets: [
          'Reduces costly mis-hires',
          'Candidate already knows your systems and culture on day one of permanency',
          'Conversion handled seamlessly, with no gap in employment',
        ],
      },
    ],
    howWeWork: {
      pullQuote: 'We don\'t send volume. We send the right people.',
      body: 'Each candidate is screened for experience, fit, and reliability. You spend time interviewing the right profiles, not filtering through resumes.',
      steps: [
        {
          step: 1,
          title: 'Intake Call',
          body: 'We learn the role, the team dynamic, the dealbreakers, and the culture, not just the job description.',
        },
        {
          step: 2,
          title: 'Active Sourcing',
          body: 'We reach into our talent network, job boards, and referral pipeline, not just whoever applies first.',
        },
        {
          step: 3,
          title: 'Structured Screening',
          body: 'Every shortlisted candidate goes through a live recruiter interview and reference verification.',
        },
      ],
    },
    keyMetrics: [
      { value: '2–3 days',                    label: 'Average time to first shortlist' },
      { value: 80,        suffix: '%+',       label: 'Of clients hire from the first shortlist presented' },
      { value: 30,        suffix: '+ hrs',    label: 'Saved per hire in screening and coordination' },
      { value: '90-day',                      label: 'Replacement guarantee on all permanent placements' },
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
    summary: 'Build a reliable frontline and skilled workforce from general labour to specialized tradespeople.',
    tileBullets: [
      'General labour & warehouse staff',
      'Machine & CNC operators',
      'Electricians, plumbers, carpenters',
      'Mechanical & skilled trades',
      'Forklift operators & material handlers (Counterbalance, Reach)',
    ],
    bestFor: 'Manufacturers, construction firms, and logistics operators',
    tileCta: { label: 'Explore Workforce Solutions', to: '/workforce-solutions/industrial-staffing' },

    hero: {
      headline: 'Industrial & Skilled Trades Staffing',
      subtext: 'Reliable workforce solutions that keep your operations moving.',
      body: 'We provide general labour and skilled trades with a focus on speed, consistency, and reliability, so your operations don\'t slow down.',
    },
    whatWeCover: [
      {
        icon: 'package-open',
        label: 'General Labour & Warehouse Staff',
        description:
          'Dependable general labourers for production lines, loading docks, packing, and warehouse operations. Available for day, afternoon, and night shifts.',
      },
      {
        icon: 'settings-2',
        label: 'Machine & CNC Operators',
        description:
          'Experienced operators across lathes, mills, and CNC equipment. We verify machine-specific experience before placing, not just "familiar with CNC."',
        verified: true,
      },
      {
        icon: 'wrench',
        label: 'Electricians, Plumbers, Carpenters',
        description:
          'Licensed and Red Seal tradespeople for commercial and industrial projects. We confirm certifications before submission.',
        verified: true,
      },
      {
        icon: 'zap',
        label: 'Mechanical & Skilled Trades',
        description:
          'Industrial Electrician (309A), Construction Electrician (442A), PLC Technician, Electrical Maintenance Technician for plant maintenance and project-based work.',
      },
      {
        icon: 'truck',
        label: 'Forklift Operators',
        description:
          'Certified counterbalance, reach truck, and order picker operators. All candidates hold valid licence documentation, verified before placement.',
        verified: true,
      },
      {
        icon: 'hammer',
        label: 'Millwrights & Maintenance Technicians',
        description:
          'Industrial millwrights and maintenance techs for preventive maintenance programs, shutdowns, and equipment installation. Available for contract and permanent roles.',
      },
    ],
    howWeWork: {
      pullQuote: 'We focus on people who show up and perform.',
      body: 'Candidates are screened for availability, basic skills, and reliability, ensuring you get workers who are ready to contribute from day one.',
      steps: [
        {
          step: 1,
          icon: 'clipboard-list',
          title: 'You Tell Us What You Need',
          body: 'Role, shift, start date, site requirements, and any certifications needed.',
          connectorLabel: 'Fast Turnaround',
        },
        {
          step: 2,
          icon: 'database',
          title: 'We Pull From Our Active Database',
          body: 'We contact pre-screened candidates already in our pipeline who match your profile.',
          connectorLabel: 'Pre-Briefed',
        },
        {
          step: 3,
          icon: 'hard-hat',
          title: 'Workers Arrive Ready',
          body: 'Candidates are briefed on the site, shift expectations, PPE requirements, and safety rules before day one.',
        },
      ],
    },
    keyMetrics: [
      {
        value:  '24–48 hrs',
        label:  'Average deployment time',
        detail: 'For most industrial roles',
        icon:   'timer',
      },
      {
        value:  85,
        suffix: '%+',
        label:  'Assignment completion rate',
        detail: 'Placed workers complete their full assignment without incident or no-show',
        icon:   'user-check',
      },
      {
        value:  'Same-day',
        label:  'Backup guarantee',
        detail: 'When a placed worker can\'t make a shift, we find a replacement the same day at no extra charge',
        icon:   'refresh-cw',
      },
      {
        value:  'Zero',
        label:  'Admin burden',
        detail: 'We handle timesheets, payroll, WSIB, and compliance, so you can focus on the work, not the paperwork',
        icon:   'shield-check',
      },
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
    summary: 'Simplify contractor management, payroll processing, and workforce compliance under one roof.',
    tileBullets: [
      'Contractor and contingent workforce management',
      'Payroll administration',
      'ROE, T4, and year-end processing',
      'WSIB and compliance management',
    ],
    bestFor: 'Businesses using high volumes of temporary or contract workers',
    tileCta: { label: 'Learn More', to: '/workforce-solutions/payroll-solutions' },

    hero: {
      headline: 'Workforce & Payroll Solutions',
      subtext: 'Simplify how you manage people, payroll, and compliance.',
      body: 'We take care of the administrative side of your workforce, so you don\'t have to.',
    },
    whatWeCover: [
      {
        icon:  'users',
        label: 'Contractor Payroll Management',
        description:
          'We act as employer of record for your contract and temporary workers, processing pay, deductions, and remittances so you carry none of the liability.',
        bullets: [
          'Source deductions (CPP, EI, income tax)',
          'Direct deposit and pay stub issuance',
          'Accurate classification of contractors vs. employees',
        ],
      },
      {
        icon:  'calendar-check',
        label: 'Employee Payrolling',
        description:
          'Full payroll processing for your permanent staff, done bi-weekly with zero errors and on-time deposits every cycle.',
        bullets: [
          'Multi-province payroll support',
          'Overtime, vacation, and statutory holiday calculations',
          'Integration with your existing HR or accounting software',
        ],
      },
      {
        icon:  'folder-open',
        label: 'Record Keeping & Reporting',
        description:
          'Organized, audit-ready records for every worker, including employment history, hours, deductions, and documentation available when you need them.',
        bullets: [
          'Digital record maintenance',
          'Custom workforce reports on demand',
          'Year-end T4 and summary preparation',
        ],
      },
      {
        icon:  'shield-check',
        label: 'Compliance Support',
        description:
          'Stay aligned with Ontario and federal employment standards without needing an in-house compliance specialist.',
        bullets: [
          'Employment Standards Act (ESA) compliance',
          'WSIB registration, premiums, and claims support',
        ],
        badge: 'regulatory',
      },
      {
        icon:  'file-text',
        label: 'ROE & Year-End Processing',
        description:
          'We handle Records of Employment for departing employees and manage all year-end filings: T4s, summaries, and CRA remittances accurately and on time.',
        bullets: [
          'T4s, summaries, and CRA remittances accurately and on time',
        ],
        badge: 'regulatory',
      },
    ],
    howWeWork: {
      pullQuote: 'Less admin. More confidence.',
      body: 'We reduce internal workload, ensure payments are accurate and on time, and keep you aligned with compliance requirements.',
      steps: [
        {
          step: 1,
          icon: 'user-plus',
          title: 'Onboarding Your Workforce',
          body: 'We set up payroll profiles for each employee (classification, pay rate, deductions, and banking details) within 24 hours of engagement.',
          connectorLabel: '24 hrs setup',
        },
        {
          step: 2,
          icon: 'calendar-check',
          title: 'Weekly Processing',
          body: 'Timesheets are collected, verified, and processed. Pay is deposited on schedule without you chasing approvals.',
          connectorLabel: 'On schedule',
        },
        {
          step: 3,
          icon: 'landmark',
          title: 'Remittances & Filings',
          body: 'CPP, EI, income tax, and WSIB premiums are remitted to the appropriate authorities on time, every period.',
          connectorLabel: 'Every period',
        },
        {
          step: 4,
          icon: 'bar-chart-3',
          title: 'Reporting & Year-End',
          body: 'You receive regular workforce cost reports and we handle all year-end obligations: T4s, ROEs, and CRA summaries.',
        },
      ],
    },
    keyMetrics: [
      {
        value:     'Zero',
        label:     'Late Remittances',
        detail:    'Every source deduction, WSIB premium, and CRA filing processed on time',
        icon:      'check-circle-2',
        trustChip: 'CRA Compliant',
      },
      {
        value:     100,
        suffix:    '%',
        label:     'Payroll Accuracy Target',
        detail:    'Dual-review processing catches errors before they reach your employees or the CRA',
        icon:      'badge-check',
        trustChip: 'Dual-Review Process',
      },
      {
        value:     '24-hr',
        label:     'Worker Onboarding',
        detail:    'New contractor or temp worker? Payroll profile set up and ready within one business day',
        icon:      'clock',
        trustChip: 'Same Business Day',
      },
      {
        value:     'Always',
        label:     'Audit-Ready',
        detail:    'Complete, organized records maintained for every worker, accessible immediately',
        icon:      'folder-check',
        trustChip: 'Audit Ready',
      },
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
    summary: 'Keep your business financially healthy with bookkeeping, reporting, and back-office expertise.',
    tileBullets: [
      'Full-cycle bookkeeping and accounts payable/receivable',
      'Monthly financial reporting and reconciliation',
      'QuickBooks and accounting software support',
      'Budgeting and cash flow tracking support',
    ],
    bestFor: 'SMBs that need financial support without a full-time hire',
    tileCta: { label: 'Learn More', to: '/workforce-solutions/financial-support' },

    hero: {
      headline: 'Financial & Operational Support',
      subtext: 'Practical financial support that keeps your business on track.',
      body: 'We provide structured bookkeeping and accounting support, helping you maintain accurate records and make better decisions.',
    },
    whatWeCover: [
      {
        icon:  'book-open',
        label: 'Bookkeeping',
        description: 'Accurate, up-to-date books maintained on a weekly or monthly basis.',
        bullets: [
          'Daily/weekly transaction recording',
          'Chart of accounts setup and maintenance',
          'Month-end close support',
          'QuickBooks supported',
        ],
        badge: 'quickbooks',
      },
      {
        icon:  'arrow-left-right',
        label: 'Accounts Payable & Receivable',
        description:
          'Stay on top of what you owe and what you\'re owed. We manage vendor payments, client invoicing, and collections follow-up to keep your cash flow predictable.',
        bullets: [
          'Vendor invoice processing and payment scheduling',
          'Customer invoicing and follow-up',
          'AR aging reports and collections support',
          'Payment reconciliation',
        ],
      },
      {
        icon:  'credit-card',
        label: 'Bank & Credit Card Reconciliations',
        description:
          'Every transaction matched, every discrepancy flagged. Monthly reconciliations across all your bank and credit card accounts so your records reflect reality and audits hold no surprises.',
        bullets: [
          'Multi-account reconciliation',
          'Discrepancy identification and resolution',
          'Reconciliation reports for your records',
        ],
      },
      {
        icon:  'bar-chart-2',
        label: 'Financial Reporting',
        description:
          'Monthly and quarterly financial statements (income statements, balance sheets, and cash flow statements) prepared in plain language so you actually understand where your business stands.',
        bullets: [
          'Monthly P&L and balance sheet',
          'Cash flow statements',
          'Budget vs. actual variance reporting',
        ],
      },
      {
        icon:  'trending-up',
        label: 'Financial Consultancy',
        description: 'Strategic financial guidance for business owners making growth decisions.',
        bullets: [
          'Pricing models',
          'Cost structure analysis and profitability review',
          'Scenario planning',
        ],
        badge: 'advisory',
      },
    ],
    howWeWork: {
      pullQuote: 'Simple, consistent, and reliable.',
      body: 'The goal is to give you clean numbers you can trust, without overcomplicating the process.',
      variant: 'financial',
      steps: [
        {
          step: 1,
          icon: 'stethoscope',
          title: 'Financial Health Check',
          body: 'We review your current books, identify gaps, errors, or backlogs, and give you an honest picture of where things stand before we start.',
          connectorLabel: 'Honest assessment',
        },
        {
          step: 2,
          icon: 'settings',
          title: 'Setup & Catch-Up',
          body: 'We organize your chart of accounts and reconcile any backlog, so you start clean, not patched.',
          connectorLabel: 'Clean start',
        },
        {
          step: 3,
          icon: 'refresh-cw',
          title: 'Ongoing Monthly Support',
          body: 'Regular bookkeeping, reconciliations, and reporting on a consistent schedule. No chasing, no surprises.',
          connectorLabel: 'On schedule',
        },
        {
          step: 4,
          icon: 'line-chart',
          title: 'Reporting & Insights',
          body: 'Monthly statements delivered with plain-language commentary. Not just numbers, but what they mean for your business.',
        },
      ],
    },
    keyMetrics: [
      {
        value:     'Always',
        label:     'Tax-Ready',
        detail:    'Year-round organized records mean no scramble at tax time and nothing to fear in a CRA review',
        icon:      'shield-check',
        trustChip: { label: '✓ CRA Ready',              bg: '#f0fdf4', text: '#16a34a' },
      },
      {
        value:     'Full',
        label:     'Cash Flow Clarity',
        detail:    'Know exactly what\'s coming in and going out, so you make decisions based on facts',
        icon:      'trending-up',
        trustChip: { label: '📊 Real-Time Visibility',  bg: '#eff6ff', text: '#2563eb' },
      },
      {
        value:     60,
        suffix:    ' days',
        label:     'To Recover Missed Revenue',
        detail:    'Systematic AR tracking means outstanding invoices get followed up. Most clients recover missed revenue within the first 60 days',
        icon:      'clock',
        trustChip: { label: '⚡ Fast Recovery',          bg: '#fffbeb', text: '#d97706' },
      },
      {
        value:     'Fraction',
        label:     'Of the Cost',
        detail:    'Access experienced bookkeeping and finance expertise at a fraction of the cost of an in-house hire',
        icon:      'piggy-bank',
        trustChip: { label: '💼 No Full-Time Hire Needed', bg: '#faf5ff', text: '#7c3aed' },
      },
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
    summary: 'Ensure your workplace meets regulatory standards and your workforce is prepared and protected.',
    tileBullets: [
      'Workplace safety policy development',
      'WSIB claim support and return-to-work programs',
      'Safety orientation and onboarding documentation',
      'Incident reporting and investigation support',
    ],
    bestFor: 'Industrial, construction, and manufacturing environments',
    tileCta: { label: 'Learn More', to: '/workforce-solutions/health-safety' },

    hero: {
      headline: 'Health & Safety Support',
      subtext: 'Keep your workforce safe and compliant.',
      body: 'We support businesses in maintaining safe working environments and meeting required standards.',
    },
    whatWeCover: [
      {
        icon:        'graduation-cap',
        label:       'Safety Training Coordination',
        description:
          'We organize, schedule, and track mandatory and site-specific safety training for your workforce, so certifications don\'t lapse and new workers are trained before they set foot on the floor.',
        bullets: [
          'WHMIS 2015 training organization',
          'OHSA Worker Instruction',
          'Forklift certification',
          'Training records and expiry tracking',
        ],
        accentStyle: 'warning-stripe',
        bulletIcon:  'shield-check',
      },
      {
        icon:        'scale',
        label:       'Compliance Support',
        description:
          'Stay aligned with the Occupational Health and Safety Act (OHSA) and sector-specific requirements.',
        bullets: [
          'OHSA compliance gap assessments',
          'Ministry of Labour (MOL) inspection preparation',
          'Workplace safety audit coordination',
        ],
        accentStyle: 'warning-stripe',
        bulletIcon:  'shield-check',
        badge:       'ohsa',
      },
      {
        icon:        'file-text',
        label:       'Documentation Support',
        description:
          'Proper safety documentation is your first line of defense in an MOL inspection or workplace injury claim.',
        bullets: [
          'Safety policy and procedure writing',
          'Safe Work Procedures (SWPs) development',
          'Hazard identification and risk assessment documentation',
          'Lockout/Tagout (LOTO) procedures',
        ],
        accentStyle: 'warning-stripe',
        bulletIcon:  'shield-check',
        badge:       'ohsa',
      },
      {
        icon:        'clipboard-check',
        label:       'Pre-Placement Safety Screening',
        description:
          'Before a worker steps onto your site, we verify they have the certifications, safety awareness, and site-specific knowledge your environment requires.',
        bullets: [
          'Certification verification (WHMIS, forklift, etc.)',
          'Site-specific safety orientation delivery',
          'PPE requirement briefing',
          'Safety history review',
        ],
        accentStyle: 'warning-stripe',
        bulletIcon:  'shield-check',
        badge:       'verified',
      },
    ],
    howWeWork: {
      pullQuote: 'Safer workplaces, stronger operations.',
      body: 'A safer workplace reduces risk, improves workforce readiness, and supports operational consistency.',
      variant: 'safety',
      steps: [
        {
          step: 1,
          icon: 'search',
          title: 'Safety Gap Assessment',
          body: 'We review your current safety program, documentation, training records, and site conditions against OHSA requirements, then give you a plain-language report of what\'s missing and what\'s at risk.',
          connectorLabel: 'Gap identified',
          regulatoryTag: { label: '⚠ OHSA Requirement',    bg: '#fffbeb', text: '#d97706' },
        },
        {
          step: 2,
          icon: 'file-edit',
          title: 'Program Development',
          body: 'We build or strengthen your written safety policies, safe work procedures, hazard assessments, and emergency response plans, all tailored to your specific operations.',
          connectorLabel: 'Program built',
          regulatoryTag: { label: '📄 Custom to Your Site', bg: '#eff6ff', text: '#2563eb' },
        },
        {
          step: 3,
          icon: 'graduation-cap',
          title: 'Training & Orientation',
          body: 'We coordinate mandatory training for your team, deliver site-specific safety orientations for new workers, and set up a tracking system so nothing lapses.',
          connectorLabel: 'Team trained',
          regulatoryTag: { label: '✓ Certification Tracked', bg: '#f0fdf4', text: '#16a34a' },
        },
        {
          step: 4,
          icon: 'shield-check',
          title: 'Ongoing Compliance Support',
          body: 'We help you stay current as regulations change, support your JHSC, and prepare you for MOL inspections before they happen, not after.',
          regulatoryTag: { label: '🛡 MOL Inspection Ready', bg: 'rgba(217,27,78,0.08)', text: '#D91B4E' },
        },
      ],
    },
    keyMetricsAccent: 'hazard-stripe',
    keyMetrics: [
      {
        value:     'Always',
        label:     'MOL-Ready',
        detail:    'Organized documentation, current training records, and written procedures mean you\'re never caught unprepared during an inspection',
        icon:      'clipboard-check',
        trustChip: { label: '⚠ MOL Inspection Ready', bg: '#fffbeb', text: '#d97706' },
      },
      {
        value:     'Fewer',
        label:     'Lost-Time Injuries',
        detail:    'Proactive hazard identification and proper worker orientation directly reduce the incidents that cost you the most',
        icon:      'heart-pulse',
        trustChip: { label: '🛡 Reduced Incident Rate', bg: '#fef2f2', text: '#dc2626' },
      },
      {
        value:     'Lower',
        label:     'WSIB Premiums Over Time',
        detail:    'A strong safety record and effective return-to-work programs reduce your WSIB experience rating and your annual premiums',
        icon:      'trending-down',
        trustChip: { label: '✓ WSIB Experience Rating', bg: '#f0fdf4', text: '#16a34a' },
      },
      {
        value:     'Day One',
        label:     'Worker Site-Readiness',
        detail:    'Pre-placement screening and standardized safety orientation mean new workers are site-ready from day one',
        icon:      'user-check',
        trustChip: { label: '⚡ Pre-Screened & Briefed', bg: '#eff6ff', text: '#2563eb' },
      },
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
