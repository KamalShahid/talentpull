import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function MegaMenu({ dropdown }) {
  const { left, groups, right } = dropdown;
  const hasRight = Boolean(right);

  return (
    <div className="container-tp py-10">
      <div
        className={
          'grid gap-10 ' +
          (hasRight ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,0.95fr)]'
                    : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]')
        }
      >
        {/* Left zone — squircle photo with brand ring floating over a warm beige blob */}
        <div className="relative">
          {/* Floating photo — squircle, brand-color ring, sits on the top-left of the beige card */}
          <img
            src={left.image}
            alt={left.imageAlt}
            loading="lazy"
            className="absolute top-0 left-0 z-10 h-32 w-32 md:h-36 md:w-36 object-cover object-top rounded-3xl ring-4 ring-tp-red bg-white shadow-tp-soft"
          />

          {/* Warm beige blob — large rounded shape, no border, no shadow */}
          <div className="rounded-[2rem] bg-[#f5f4f2] pt-36 md:pt-40 pb-7 px-7 min-h-[320px] flex flex-col gap-5">
            <p className="font-display text-[20px] md:text-[22px] leading-snug font-bold tracking-display-tight text-tp-dark text-balance">
              {left.tagline}
            </p>
            <Link
              to={left.cta.to}
              className="mt-auto inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-[#1a3a3a] text-white text-sm font-semibold hover:bg-tp-darker transition-colors"
            >
              {left.cta.label}
            </Link>
          </div>
        </div>

        {/* Center zone — link groups */}
        <div className={'grid gap-8 ' + (groups.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1')}>
          {groups.map((g, gi) => (
            <div key={gi}>
              {g.heading && (
                <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-tp-red mb-4">
                  {g.heading}
                </h3>
              )}
              <ul className="space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-2 text-tp-dark hover:text-tp-teal transition-colors text-[15px] leading-snug"
                    >
                      <span className="border-b border-transparent group-hover:border-tp-teal pb-0.5">
                        {l.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right zone — quick-access card */}
        {hasRight && (
          <aside className="rounded-2xl bg-tp-mist p-7">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-tp-dark/70 mb-4">
              {right.heading}
            </h3>
            <ul className="space-y-2.5">
              {right.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-[14px] text-tp-teal-700 hover:text-tp-red transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            {right.bottomLink && (
              <Link
                to={right.bottomLink.to}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-tp-dark border-t border-tp-fog pt-4 w-full hover:text-tp-red transition-colors"
              >
                {right.bottomLink.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
