import { useState } from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { Avatar } from './Avatar';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onMenuClick }) => {
  const [query, setQuery] = useState('');

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-6 py-4 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Abrir menú"
            className="rounded-xl p-2 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-slate-900">{title}</h1>
            {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="relative hidden md:block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar..."
              aria-label="Buscar"
              className="h-9 w-56 rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition-colors duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            type="button"
            aria-label="Notificaciones"
            className="relative rounded-xl p-2 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2.5">
            <Avatar name="Laura Sánchez" status="online" />
            <div className="hidden text-left xl:block">
              <p className="text-sm font-medium text-slate-900">Laura Sánchez</p>
              <p className="text-xs text-slate-500">Administradora</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;