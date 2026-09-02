import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className = '',
}) => (
  <div
    className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-12 text-center ${className}`}
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
      <Icon className="h-6 w-6" aria-hidden="true" />
    </div>
    <h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3>
    {description && <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;