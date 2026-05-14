// Candidate tip articles for /candidate-tips and /candidate-tips/:slug.
// Uses the same section + CTA schema as src/data/insights.js:
//   section: { heading, body?, bulletsHeading?, bullets?, items? }
//   cta:     { headline, body, buttons: [{ label, to }, ...] }

export const candidateTips = [
  {
    slug: 'resume-tips',
    title: 'Resume Tips for Industrial & Warehouse Roles',
    shortDescription:
      'Learn how to present your experience clearly and improve your chances of getting shortlisted.',
    intro:
      'A clear and organized resume can improve your chances of getting shortlisted. Many employers hiring for warehouse, manufacturing, and industrial positions review resumes quickly. Candidates who clearly present their experience, availability, and reliability often stand out during the screening process.',
    image: 'https://placehold.co/800x500/D91B4E/FFFFFF?text=Resume+Tips',
    sections: [
      {
        heading: 'What Employers Commonly Look For',
        items: [
          { subheading: 'Relevant Work Experience',         body: 'Clearly include warehouse experience, shipping & receiving, machine operation, forklift certification, production work, or general labour experience.' },
          { subheading: 'Reliability & Attendance',         body: 'Employers often value consistent attendance, punctuality, flexibility, and long-term reliability.' },
          { subheading: 'Certifications & Safety Training', body: 'Include forklift licenses, WHMIS, working at heights, or workplace safety training.' },
        ],
      },
      {
        heading: 'Common Resume Mistakes',
        bullets: [
          'Too much unrelated information — keep your resume focused on relevant work experience and operational skills.',
          'Missing contact information — always ensure your phone number and email are current.',
          'Unclear employment dates — employers prefer clear timelines and recent work history.',
        ],
      },
      {
        heading: 'Final Thoughts',
        body: 'A strong resume does not need to be complicated. Clear formatting, relevant experience, and consistency often improve your chances of getting shortlisted.',
      },
    ],
    cta: {
      headline: 'Looking for Work Opportunities?',
      body: 'Talent Pull connects candidates with professional, industrial, warehouse, and skilled trades opportunities across multiple industries.',
      buttons: [
        { label: 'Browse Opportunities', to: '/job-seekers#jobs' },
        { label: 'Submit Your Resume',   to: '/job-seekers#apply' },
      ],
    },
  },

  {
    slug: 'interview-prep',
    title: 'How to Prepare for a Job Interview',
    shortDescription:
      'Simple interview preparation tips to help candidates feel more confident and ready.',
    intro:
      'Preparation can make a strong first impression. Whether you are applying for a temporary, contract, or permanent role, arriving prepared helps demonstrate professionalism, reliability, and interest in the opportunity.',
    image: 'https://placehold.co/800x500/17B8CE/FFFFFF?text=Interview+Prep',
    sections: [
      {
        heading: 'Simple Ways to Prepare',
        items: [
          { subheading: 'Research the Position',                 body: 'Understand job responsibilities, shift timing, workplace expectations, and required experience.' },
          { subheading: 'Arrive On Time',                        body: 'Punctuality is often one of the first things employers evaluate.' },
          { subheading: 'Dress Appropriately',                   body: 'You do not always need formal business attire, but clean and professional presentation matters.' },
          { subheading: 'Be Ready to Discuss Your Experience',   body: 'Be prepared to explain previous work experience, availability, certifications, and workplace strengths.' },
        ],
      },
      {
        heading: 'Common Interview Mistakes',
        bullets: [
          'Lack of preparation — not understanding the position may create a poor first impression.',
          'Poor communication — clear and professional communication is important during interviews.',
          'Negative discussion about previous employers — keep responses professional and focused on your experience.',
        ],
      },
      {
        heading: 'Final Thoughts',
        body: 'Interviews are an opportunity to demonstrate reliability, communication, and readiness to work. Simple preparation often improves confidence and interview performance significantly.',
      },
    ],
    cta: {
      headline: 'Ready for Your Next Opportunity?',
      body: 'Talent Pull supports candidates across professional, industrial, and skilled trades opportunities.',
      buttons: [
        { label: 'Browse Jobs',         to: '/job-seekers#jobs' },
        { label: 'Submit Your Resume', to: '/job-seekers#apply' },
      ],
    },
  },

  {
    slug: 'what-employers-want',
    title: 'What Employers Look for in Temporary Workers',
    shortDescription:
      'Understand the qualities businesses commonly value when hiring temporary and contract employees.',
    intro:
      'Temporary roles often lead to long-term opportunities. Many businesses use temporary staffing to support operations during busy periods, workforce shortages, or project-based work. Candidates who demonstrate reliability and professionalism often improve their chances of future opportunities.',
    image: 'https://placehold.co/800x500/1C2B3A/FFFFFF?text=What+Employers+Want',
    sections: [
      {
        heading: 'Qualities Employers Commonly Value',
        items: [
          { subheading: 'Reliability & Attendance',     body: 'Consistent attendance remains one of the most important factors for temporary roles.' },
          { subheading: 'Positive Work Attitude',       body: 'Employers value workers who communicate professionally, follow instructions, and contribute positively to the workplace.' },
          { subheading: 'Flexibility',                  body: 'Being open to different shifts, schedules, or responsibilities may improve opportunities.' },
          { subheading: 'Workplace Safety Awareness',   body: 'Following workplace safety expectations is especially important in warehouse, industrial, and production environments.' },
        ],
      },
      {
        heading: 'Final Thoughts',
        body: 'Temporary work can help candidates build experience, improve workplace skills, and access future long-term opportunities. Professionalism and reliability often create the strongest long-term impression.',
      },
    ],
    cta: {
      headline: 'Explore Temporary & Permanent Opportunities',
      body: 'Talent Pull connects candidates with opportunities across warehousing, manufacturing, administration, skilled trades, and professional environments.',
      buttons: [
        { label: 'Browse Opportunities', to: '/job-seekers#jobs' },
        { label: 'Apply Today',          to: '/job-seekers#apply' },
      ],
    },
  },

  {
    slug: 'workplace-reliability',
    title: 'Workplace Reliability & Attendance Tips',
    shortDescription:
      'Explore practical ways to improve attendance, communication, and long-term workplace success.',
    intro:
      'Reliability plays a major role in long-term workplace success. Employers across industrial, warehouse, and professional environments consistently value employees who communicate well, arrive on time, and maintain consistent attendance.',
    image: 'https://placehold.co/800x500/0F1A24/FFFFFF?text=Workplace+Reliability',
    sections: [
      {
        heading: 'Ways to Improve Workplace Reliability',
        items: [
          { subheading: 'Arrive Early When Possible',        body: 'Being prepared before shifts begin helps create a positive impression.' },
          { subheading: 'Communicate Clearly',                body: 'If issues arise, communicate with supervisors as early as possible.' },
          { subheading: 'Understand Workplace Expectations', body: 'Review schedules, safety procedures, and operational expectations carefully.' },
          { subheading: 'Maintain Consistency',               body: 'Reliable attendance and workplace professionalism often improve long-term opportunities and advancement potential.' },
        ],
      },
      {
        heading: 'Final Thoughts',
        body: 'Workplace reliability is one of the most valuable qualities employers look for across temporary, contract, and permanent positions. Strong communication and consistency can positively impact long-term career opportunities.',
      },
    ],
    cta: {
      headline: 'Looking for New Opportunities?',
      body: 'Talent Pull supports candidates across professional, industrial, warehouse, and skilled trades roles.',
      buttons: [
        { label: 'Browse Jobs',         to: '/job-seekers#jobs' },
        { label: 'Submit Your Resume', to: '/job-seekers#apply' },
      ],
    },
  },
];

export const getCandidateTipBySlug = (slug) => candidateTips.find((t) => t.slug === slug);
