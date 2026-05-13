// Insight articles for /insights and /insights/:slug.
// NOTE: Full article bodies will be populated when the truncated portion
// of the brief is re-supplied. For now each article has its title +
// short description from the brief, plus a placeholder body.

const placeholderSections = [
  {
    heading: 'Content coming soon',
    body: 'The full body of this article is being written. The intro and short description above are final copy.',
  },
];

export const insights = [
  {
    slug: 'reduce-hiring-delays',
    title: 'How to Reduce Hiring Delays in Manufacturing',
    shortDescription: 'Learn practical ways businesses can improve hiring speed, reduce operational downtime, and strengthen workforce reliability across manufacturing and industrial environments.',
    intro: 'Hiring delays can slow down production, increase overtime costs, and create operational pressure. In manufacturing environments, even small workforce gaps can impact production timelines, shift coverage, and operational efficiency. Businesses often face delays because hiring becomes reactive or because internal screening processes take longer than expected.',
    sections: placeholderSections,
    cta: { label: 'Book a Consultation', to: '/contact' },
    image: 'https://placehold.co/800x500/1C2B3A/FFFFFF?text=Hiring+Delays',
  },
  {
    slug: 'temp-vs-permanent',
    title: 'Temporary vs Permanent Staffing: Which Is Right for Your Business?',
    shortDescription: 'Understand when temporary staffing, contract hiring, or permanent recruitment makes the most sense based on operational needs and long-term growth.',
    intro: 'Choosing between temporary, contract, and permanent staffing depends on operational pressure, budget, and the long-term role of the position. This guide helps clarify when each makes sense.',
    sections: placeholderSections,
    cta: { label: 'Book a Consultation', to: '/contact' },
    image: 'https://placehold.co/800x500/D91B4E/FFFFFF?text=Temp+vs+Permanent',
  },
  {
    slug: 'retention-strategy',
    title: 'Building a Strong Candidate Retention Strategy',
    shortDescription: 'Explore practical ways businesses can improve employee retention, reduce turnover, and strengthen workforce consistency across operational environments.',
    intro: 'Retention is more cost-effective than re-hiring. Yet many businesses focus more on the hire than on what happens after. This article shares retention strategies that work in operational and industrial environments.',
    sections: placeholderSections,
    cta: { label: 'Book a Consultation', to: '/contact' },
    image: 'https://placehold.co/800x500/17B8CE/FFFFFF?text=Retention',
  },
  {
    slug: 'payroll-mistakes',
    title: 'Common Payroll Mistakes That Create Workforce Issues',
    shortDescription: 'Learn how payroll inaccuracies, delayed payments, and inconsistent workforce administration can impact employee trust, retention, and operational stability.',
    intro: 'Payroll inaccuracies erode employee trust quickly. This article walks through common mistakes and how to prevent them.',
    sections: placeholderSections,
    cta: { label: 'Book a Consultation', to: '/contact' },
    image: 'https://placehold.co/800x500/0F1A24/FFFFFF?text=Payroll',
  },
  {
    slug: 'effective-hiring',
    title: 'Effective Hiring Strategies for Growing Businesses',
    shortDescription: 'Understand how structured hiring processes can improve workforce quality, reduce hiring delays, and support long-term business growth.',
    intro: 'A structured hiring process is one of the highest-leverage operational improvements a growing business can make. Here\'s a practical playbook.',
    sections: placeholderSections,
    cta: { label: 'Book a Consultation', to: '/contact' },
    image: 'https://placehold.co/800x500/A8143B/FFFFFF?text=Hiring+Strategies',
  },
  {
    slug: 'financial-support-article',
    title: 'Financial & Operational Support for Growing Businesses',
    shortDescription: 'Explore how structured bookkeeping, reporting, and operational finance support can improve visibility, efficiency, and business decision-making.',
    intro: 'Strong financial visibility is the foundation of confident business decisions. This article covers what structured financial support actually looks like.',
    sections: placeholderSections,
    cta: { label: 'Book a Consultation', to: '/contact' },
    image: 'https://placehold.co/800x500/0E8C9D/FFFFFF?text=Financial+Support',
  },
];

export const getInsightBySlug = (slug) => insights.find((a) => a.slug === slug);
