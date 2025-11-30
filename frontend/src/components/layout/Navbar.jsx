// src/components/layout/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode.jsx';

export default function Navbar() {
  const { pathname } = useLocation();
  const { dark, toggleDark } = useDarkMode();

  const isActive = (path) =>
    pathname === path
      ? 'text-sky-500 border-b-2 border-sky-500'
      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100';

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <nav className="mx-auto flex max-w-5xl items-center px-4 py-3 text-sm">
        {/* Left spacer for centering */}
        <div className="flex-1"></div>
        
        {/* Centered heading */}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Employee Onboarding
          </h1>
        </div>
        
        {/* Right navigation */}
        <div className="flex flex-1 items-center justify-end gap-4 text-xs">
          <Link to="/" className={isActive('/')}>
            Form
          </Link>
          <Link to="/submissions" className={isActive('/submissions')}>
            Submissions
          </Link>
          <button
            onClick={toggleDark}
            className="rounded px-2 py-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {dark ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
    </header>
  );
}
