import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import type { SelectOption } from '../types';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  hint?: string;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  hint,
  error,
  className = '',
  ...rest
}) => {
  const id = useId();

  const selectClasses = [
    'w-full appearance-none rounded-xl border bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2',
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
        <select id={id} className={selectClasses} {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
      </div>
      {error ? (
        <p className="mt-1.5 text-xs text-rose-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
};

export default Select;