import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  description,
  action,
  className = '',
  bodyClassName = '',
}) => (
  <section className={`rounded-2xl border border-slate-100 bg-white shadow-sm ${className}`}>
    {(title || action) && (
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-4">
        <div>
          {title && <h3 className="text-sm font-semibold text-slate-900">{title}</h3>}
          {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
        </div>
        {action}
      </header>
    )}
    <div className={`p-6 ${bodyClassName}`}>{children}</div>
  </section>
);

export default Card;