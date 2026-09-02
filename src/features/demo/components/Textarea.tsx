import { useId } from 'react';
import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  hint,
  error,
  className = '',
  ...rest
}) => {
  const id = useId();

  const textareaClasses = [
    'w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2',
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
      <textarea id={id} rows={4} className={textareaClasses} {...rest} />
      {error ? (
        <p className="mt-1.5 text-xs text-rose-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
};

export default Textarea;