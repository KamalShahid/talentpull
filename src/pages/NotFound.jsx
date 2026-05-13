import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-md text-center">
        <div className="font-display text-7xl font-bold gradient-text mb-2">404</div>
        <h1 className="font-display text-2xl font-bold text-tp-dark mb-3">Page not found</h1>
        <p className="text-tp-dark/60 mb-8">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    </main>
  );
}
