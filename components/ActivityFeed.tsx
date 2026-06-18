interface ActivityItem {
  id: string;
  type: 'transaction' | 'key_created' | 'wallet_added' | 'policy_updated';
  title: string;
  description: string;
  timestamp: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
  isLive?: boolean;
}

const typeLabels: Record<ActivityItem['type'], string> = {
  transaction: 'Transaction',
  key_created: 'API Key',
  wallet_added: 'Wallet',
  policy_updated: 'Policy',
};

const typeColors: Record<ActivityItem['type'], string> = {
  transaction: 'badge-success',
  key_created: 'badge-info',
  wallet_added: 'bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400 ring-1 ring-violet-600/20',
  policy_updated: 'badge-warning',
};

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(timestamp).toLocaleDateString();
}

export default function ActivityFeed({ items, isLive = false }: ActivityFeedProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Recent Activity
        </h2>
        {isLive && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Live
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <p className="empty-state-text text-center py-8">
          No recent activity
        </p>
      ) : (
        <div className="space-y-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 py-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-slate-900 dark:text-white text-sm">
                    {item.title}
                  </p>
                  <span className={`badge ${typeColors[item.type]}`}>
                    {typeLabels[item.type]}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
              <time className="text-slate-400 dark:text-slate-500 text-xs flex-shrink-0 pt-0.5" title={new Date(item.timestamp).toLocaleString()}>
                {timeAgo(item.timestamp)}
              </time>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
