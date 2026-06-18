'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { ActivityItem } from '@/lib/api';
import type { Dashboard } from '@/lib/types';
import MetricCard from '@/components/MetricCard';
import WalletAlert from '@/components/WalletAlert';
import ActivityFeed from '@/components/ActivityFeed';
import StatsSummary from '@/components/StatsSummary';
import PageHeader from '@/components/PageHeader';
import LoadingState from '@/components/LoadingState';
import { ChartIcon, CoinIcon, PolicyIcon, AppIcon } from '@/components/Icons';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const [data, recentActivity] = await Promise.all([
          api.getDashboard(),
          api.getRecentActivity(),
        ]);
        setDashboard(data);
        setActivity(recentActivity);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <LoadingState variant="dashboard" />;
  }

  if (error) {
    return (
      <div className="card p-4 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-sm">
        {error}
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description={`Organization: ${dashboard.org.name}`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Transactions"
          value={dashboard.totalTxCount.toLocaleString()}
          icon={<ChartIcon />}
          accent="blue"
        />
        <MetricCard
          label="Total Fee Spent"
          value={`${dashboard.totalFeeSpent.toFixed(2)} XLM`}
          icon={<CoinIcon />}
          accent="emerald"
        />
        <MetricCard
          label="Active Policies"
          value={dashboard.activePolicies.toString()}
          icon={<PolicyIcon />}
          accent="violet"
        />
        <MetricCard
          label="Apps"
          value={dashboard.apps.length.toString()}
          icon={<AppIcon />}
          accent="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatsSummary
          title="24h Performance"
          stats={[
            { label: 'Transactions Today', value: '124', change: { value: 12, direction: 'up' } },
            { label: 'Fees Today', value: '45.2 XLM', change: { value: 8, direction: 'up' } },
            { label: 'Success Rate', value: '99.8%', change: { value: 0.2, direction: 'down' } },
            { label: 'Avg Fee per Tx', value: '0.364 XLM', change: { value: 2, direction: 'down' } },
          ]}
        />

        <ActivityFeed isLive items={activity} />
      </div>

      {dashboard.lowBalanceWallets.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Low Balance Alerts
          </h2>
          <div className="space-y-3">
            {dashboard.lowBalanceWallets.map((wallet) => (
              <WalletAlert key={wallet.id} wallet={wallet} />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Apps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dashboard.apps.map((app) => (
            <div key={app.id} className="card p-5 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-white truncate">{app.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Created {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="badge badge-info flex-shrink-0">Active</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
                API Key Prefix
              </p>
              <code className="block mt-1 text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 truncate">
                {app.apiKeyPrefix}...
              </code>
              <a href={`/api-keys?app=${app.id}`} className="btn-primary w-full mt-4">
                Manage Keys
              </a>
            </div>
          ))}
        </div>
      </section>

      <div className="card p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">Quick Start</h2>
        <ol className="space-y-4">
          {[
            { step: 1, text: <>Create an API key in the <a href="/api-keys" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">API Keys</a> section</> },
            { step: 2, text: <>Set up a sponsor wallet in <a href="/wallets" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Wallets</a></> },
            { step: 3, text: 'Define sponsorship policies to control fee limits' },
            { step: 4, text: <>Monitor transactions in the <a href="/transactions" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Transaction Log</a></> },
          ].map(({ step, text }) => (
            <li key={step} className="flex gap-3 items-start">
              <span className="step-number">{step}</span>
              <span className="text-slate-600 dark:text-slate-300 text-sm pt-1">{text}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
