import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonVariant, ComponentSize } from '../types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ComponentSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
  secondary:
    'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:outline-slate-400',
  outline:
    'border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-slate-400',
  ghost:
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-slate-400',
  danger:
    'bg-rose-600 text-white shadow-sm hover:bg-rose-500 focus-visible:outline-rose-600',
};

const SIZE_CLASSES: Record<ComponentSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  type = 'button',
  ...rest
}) => {
  const classes = [
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

export default Button;