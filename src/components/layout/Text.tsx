import type { ReactNode } from 'react';

export type TextVariant = 'body' | 'lead' | 'muted' | 'small' | 'label';

interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  className?: string;
}

const TEXT_STYLES: Record<TextVariant, string> = {
  body: 'text-sm text-slate-700',
  lead: 'text-base text-slate-600',
  muted: 'text-sm text-slate-500',
  small: 'text-xs text-slate-500',
  label: 'text-xs font-medium uppercase tracking-wide text-slate-500',
};

export const Text: React.FC<TextProps> = ({ children, variant = 'body', className = '' }) => (
  <p className={`${TEXT_STYLES[variant]} ${className}`}>{children}</p>
);

export default Text;