import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  className = '',
  ...rest
}) => {
  const id = useId();

  const inputClasses = [
    'w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2',
    leftIcon ? 'pl-10' : '',
    rightIcon ? 'pr-10' : '',
    error
      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
      : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-100',
  ].join(' ');

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            {leftIcon}
          </span>
        )}
        <input id={id} className={inputClasses} {...rest} />
        {rightIcon && (
          <span className="absolute inset-y-0 right-3 flex items-center text-slate-400">
            {rightIcon}
          </span>
        )}
      </div>
      {error ? (
        <p className="mt-1.5 text-xs text-rose-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
};

export default TextInput;