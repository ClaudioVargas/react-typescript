import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

interface AlertProps {
  variant?: AlertVariant;
  title: string;
  children?: ReactNode;
  onClose?: () => void;
}

const VARIANT_STYLES: Record<AlertVariant, { wrapper: string; icon: string; title: string; body: string }> = {
  info: {
    wrapper: 'border-sky-200 bg-sky-50 text-sky-800',
    icon: 'text-sky-500',
    title: 'text-sky-900',
    body: 'text-sky-700',
  },
  success: {
    wrapper: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    icon: 'text-emerald-500',
    title: 'text-emerald-900',
    body: 'text-emerald-700',
  },
  warning: {
    wrapper: 'border-amber-200 bg-amber-50 text-amber-800',
    icon: 'text-amber-500',
    title: 'text-amber-900',
    body: 'text-amber-700',
  },
  danger: {
    wrapper: 'border-rose-200 bg-rose-50 text-rose-800',
    icon: 'text-rose-500',
    title: 'text-rose-900',
    body: 'text-rose-700',
  },
};

const VARIANT_ICONS: Record<AlertVariant, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
}) => {
  const styles = VARIANT_STYLES[variant];
  const Icon = VARIANT_ICONS[variant];

  return (
    <div className={`flex items-start gap-3 rounded-2xl border p-4 ${styles.wrapper}`} role="alert">
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${styles.icon}`} aria-hidden="true" />
      <div className="flex-1 space-y-1">
        <p className={`text-sm font-semibold ${styles.title}`}>{title}</p>
        {children && <div className={`text-sm ${styles.body}`}>{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar alerta"
          className="rounded-lg p-1 transition-colors duration-200 hover:bg-white/60"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;