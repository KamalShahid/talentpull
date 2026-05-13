import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { useScrollToTopOnRouteChange } from '../../hooks/useScrollToTopOnRouteChange.js';

export default function Layout() {
  useScrollToTopOnRouteChange();
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
