// Candidate tip articles for /candidate-tips and /candidate-tips/:slug.
// NOTE: Full bodies will be filled in when the truncated portion of the
// brief is re-supplied. Titles + short descriptions are final.

const placeholderSections = [
  {
    heading: 'Content coming soon',
    body: 'The full body of this article is being written. The intro and short description above are final copy.',
  },
];

export const candidateTips = [
  {
    slug: 'resume-tips',
    title: 'Resume Tips for Industrial & Warehouse Roles',
    shortDescription: 'Practical guidance on how to structure your resume for industrial, warehouse, and skilled trades positions — what employers actually look for.',
    intro: 'A clean, scannable resume gets you noticed in industrial and warehouse roles. Here\'s what hiring managers prioritize when reviewing candidates.',
    sections: placeholderSections,
    image: 'https://placehold.co/800x500/D91B4E/FFFFFF?text=Resume+Tips',
  },
  {
    slug: 'interview-prep',
    title: 'How to Prepare for a Job Interview',
    shortDescription: 'Step-by-step interview preparation guidance for candidates entering temporary, contract, or permanent roles.',
    intro: 'Preparation is the single biggest factor in interview success. This guide walks through what to do the day before, the morning of, and during the interview.',
    sections: placeholderSections,
    image: 'https://placehold.co/800x500/17B8CE/FFFFFF?text=Interview+Prep',
  },
  {
    slug: 'what-employers-want',
    title: 'What Employers Look for in Temporary Workers',
    shortDescription: 'Understand what hiring managers value most when selecting candidates for temporary and contract roles.',
    intro: 'Temporary roles are often a foot in the door. Here\'s what employers consistently look for when evaluating temporary workers.',
    sections: placeholderSections,
    image: 'https://placehold.co/800x500/1C2B3A/FFFFFF?text=What+Employers+Want',
  },
  {
    slug: 'workplace-reliability',
    title: 'Workplace Reliability & Attendance Tips',
    shortDescription: 'Practical habits that build a reputation for reliability and help candidates earn ongoing assignments and long-term placements.',
    intro: 'Reliability is the most-valued trait in operational and industrial roles. Here\'s how to demonstrate it consistently.',
    sections: placeholderSections,
    image: 'https://placehold.co/800x500/0F1A24/FFFFFF?text=Workplace+Reliability',
  },
];

export const getCandidateTipBySlug = (slug) => candidateTips.find((t) => t.slug === slug);
