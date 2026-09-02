import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { StatItem } from '../types';

interface StatCardProps {
  stat: StatItem;
}

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const isUp = stat.trend === 'up';
  const Icon = stat.icon;

  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}
        >
          {isUp ? (
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {stat.change}
        </span>
      </div>
      <p className="mt-5 text-sm text-slate-500">{stat.label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{stat.value}</p>
    </article>
  );
};

export default StatCard;