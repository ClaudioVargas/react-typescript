interface CheckboxProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}) => (
  <label
    className={`flex items-start gap-3 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
  >
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(event) => onChange(event.target.checked)}
      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500"
    />
    <span>
      <span className="block text-sm font-medium text-slate-700">{label}</span>
      {description && <span className="block text-xs text-slate-500">{description}</span>}
    </span>
  </label>
);

export default Checkbox;