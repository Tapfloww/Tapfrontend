'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import type { App, Transaction } from '@/lib/types';
import TransactionTable from '@/components/TransactionTable';
import PageHeader from '@/components/PageHeader';
import LoadingState from '@/components/LoadingState';

export default function TransactionsContent() {
  const searchParams = useSearchParams();
  const selectedAppId = searchParams.get('app');

  const [apps, setApps] = useState<App[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [appId, setAppId] = useState<string>(selectedAppId || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [searchUserId, setSearchUserId] = useState('');

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const data = await api.getApps();
        setApps(data);
        if (!appId && data.length > 0) {
          setAppId(data[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load apps');
      }
    };

    fetchApps();
  }, []);

  useEffect(() => {
    if (!appId) return;

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await api.getTransactions(appId, {
          status: filterStatus || undefined,
          userId: searchUserId || undefined,
        });
        setTransactions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [appId, filterStatus, searchUserId]);

  const getContractLink = (txHash: string) => {
    const network = process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'testnet';
    const domain = network === 'mainnet' ? 'stellar.expert' : 'testnet.stellar.expert';
    return `https://${domain}/tx/${txHash}`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transaction Log"
        description="Monitor sponsored transactions in real-time"
      />

      {error && (
        <div className="card p-4 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <label className="label">Select App</label>
          <select
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            className="input"
          >
            <option value="">Choose an app...</option>
            {apps.map((app) => (
              <option key={app.id} value={app.id}>
                {app.name}
              </option>
            ))}
          </select>
        </div>

        <div className="card p-5">
          <label className="label">Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="card p-5">
          <label className="label">Search User ID</label>
          <input
            type="text"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            placeholder="Filter by user ID..."
            className="input"
          />
        </div>
      </div>

      {loading ? (
        <LoadingState variant="table" />
      ) : (
        <TransactionTable
          transactions={transactions}
          getContractLink={getContractLink}
        />
      )}
    </div>
  );
}
