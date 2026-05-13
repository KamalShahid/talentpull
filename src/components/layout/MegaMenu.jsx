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
        {/* Left zone — image card with tagline + CTA */}
        <div className="relative rounded-2xl overflow-hidden bg-tp-darker text-white shadow-tp-soft">
          <img
            src={left.image}
            alt={left.imageAlt}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            loading="lazy"
          />
          <div className="relative p-7 flex flex-col gap-4 min-h-[280px]">
            <div className="flex-1 flex flex-col justify-end">
              <p className="font-display text-xl leading-tight font-semibold tracking-display-tight">
                {left.tagline}
              </p>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                {left.body}
              </p>
            </div>
            <Link
              to={left.cta.to}
              className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full bg-white text-tp-dark text-sm font-semibold hover:bg-tp-teal hover:text-white transition-colors"
            >
              {left.cta.label}
              <ArrowRight className="h-4 w-4" />
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
