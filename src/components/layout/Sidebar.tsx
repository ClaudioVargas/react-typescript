import { Boxes, X } from 'lucide-react';
import { Avatar } from './Avatar';
// import { Badge } from './Badge';
import type { NavItem } from '../types';
import Badge from '../../features/demo/components/Badge';

interface SidebarProps {
  items: NavItem[];
  secondaryItems?: NavItem[];
  activeId: string;
  onChange: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NAV_CLASSES = (isActive: boolean) =>
  [
    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200',
    isActive
      ? 'bg-indigo-50 text-indigo-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  ].join(' ');

const NAV_GROUP_LABEL = 'px-3 pb-2 pt-5 text-xs font-semibold uppercase tracking-wide text-slate-400';

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  secondaryItems = [],
  activeId,
  onChange,
  isOpen,
  onClose,
}) => {
  const content = (
    <nav className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 pb-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-slate-700 text-white shadow-sm">
          <Boxes className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">Demo UI</p>
          <p className="text-xs text-slate-500">Kit de componentes</p>
        </div>
      </div>

      {/* Navegación principal */}
      <div className="flex-1">
        <p className={NAV_GROUP_LABEL}>General</p>
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = item.id === activeId;
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(item.id);
                    onClose();
                  }}
                  className={NAV_CLASSES(isActive)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        <p className={NAV_GROUP_LABEL}>Sistema</p>
        <ul className="space-y-1">
          {secondaryItems.map((item) => {
            const isActive = item.id === activeId;
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(item.id);
                    onClose();
                  }}
                  className={NAV_CLASSES(isActive)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Usuario */}
      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <Avatar name="Laura Sánchez" status="online" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900">Laura Sánchez</p>
          <Badge variant="primary" className="mt-0.5">
            Administradora
          </Badge>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Sidebar fijo en desktop: primera columna del grid */}
      <aside className="hidden border-r border-slate-200 bg-white lg:col-span-1 lg:block">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:px-5 lg:py-6">
          {content}
        </div>
      </aside>

      {/* Overlay en móvil */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-white px-5 py-6 shadow-sm">
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
            {content}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;