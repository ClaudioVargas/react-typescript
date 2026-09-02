interface ProgressBarProps {
  label?: string;
  value: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={className}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-slate-700">{label}</span>
          <span className="text-sm font-semibold text-slate-900">{clamped}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;