'use client';

import { useEffect, useState } from 'react';
import { pingHorizon, stellar } from '@/lib/stellar';

export default function HorizonStatus() {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    pingHorizon().then((reachable) => {
      if (!cancelled) setOk(reachable);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const label =
    ok === null
      ? 'Checking Horizon…'
      : ok
        ? `Horizon ${stellar.network}`
        : 'Horizon unreachable';

  return (
    <span
      className={`hidden md:inline-flex items-center gap-1.5 text-xs font-medium ${
        ok === true
          ? 'text-emerald-700 dark:text-emerald-400'
          : ok === false
            ? 'text-amber-700 dark:text-amber-400'
            : 'text-slate-500'
      }`}
      title={stellar.horizonUrl}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          ok === true ? 'bg-emerald-500' : ok === false ? 'bg-amber-500' : 'bg-slate-400'
        }`}
      />
      {label}
    </span>
  );
}
