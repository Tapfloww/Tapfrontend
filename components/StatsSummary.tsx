interface StatItem {
  label: string;
  value: string;
  change?: {
    value: number;
    direction: 'up' | 'down';
  };
}

interface StatsSummaryProps {
  stats: StatItem[];
  title: string;
}

export default function StatsSummary({ stats, title }: StatsSummaryProps) {
  return (
    <div className="card p-6">
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {stat.label}
            </p>
            <div className="flex items-baseline justify-between mt-2 gap-2">
              <p className="text-lg font-bold text-slate-900 dark:text-white truncate">
                {stat.value}
              </p>
              {stat.change && (
                <span
                  className={`text-xs font-semibold flex-shrink-0 ${
                    stat.change.direction === 'up'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-red-500 dark:text-red-400'
                  }`}
                >
                  {stat.change.direction === 'up' ? '↑' : '↓'} {stat.change.value}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
