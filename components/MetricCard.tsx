import type { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  accent?: 'blue' | 'emerald' | 'violet' | 'amber';
}

const accentClasses = {
  blue: 'metric-accent-blue',
  emerald: 'metric-accent-emerald',
  violet: 'metric-accent-violet',
  amber: 'metric-accent-amber',
};

export default function MetricCard({ label, value, icon, accent = 'blue' }: MetricCardProps) {
  return (
    <div className="card p-5 sm:p-6 hover:shadow-md dark:hover:shadow-slate-900/50 transition-shadow duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1.5 truncate">
            {value}
          </p>
        </div>
        {icon && (
          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${accentClasses[accent]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
