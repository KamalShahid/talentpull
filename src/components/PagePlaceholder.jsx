import { Link } from 'react-router-dom';

export default function PagePlaceholder({ title, route }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tp-red-50 text-tp-red text-xs font-semibold uppercase tracking-[0.18em] mb-6">
          Coming in Stage 4
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-display-tight text-tp-dark mb-4">
          {title}
        </h1>
        <p className="text-tp-dark/60 mb-2">
          This route renders correctly. The page contents are being built page-by-page in Stage 4 of the migration.
        </p>
        <p className="text-tp-dark/40 text-sm font-mono mb-8">{route}</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    </main>
  );
}
