interface LoadingStateProps {
  variant?: 'dashboard' | 'table' | 'cards' | 'inline';
}

export default function LoadingState({ variant = 'inline' }: LoadingStateProps) {
  if (variant === 'dashboard') {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-6 h-28" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-6 h-64" />
          <div className="card p-6 h-64" />
        </div>
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className="card overflow-hidden animate-pulse">
        <div className="h-12 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-14 border-b border-slate-100 dark:border-slate-800 last:border-0" />
        ))}
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-6 h-36" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
        <div className="spinner" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </div>
  );
}
