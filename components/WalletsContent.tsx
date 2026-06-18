'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import type { App, SponsorWallet } from '@/lib/types';
import WalletForm from '@/components/WalletForm';
import WalletList from '@/components/WalletList';
import PageHeader from '@/components/PageHeader';
import LoadingState from '@/components/LoadingState';

export default function WalletsContent() {
  const searchParams = useSearchParams();
  const selectedAppId = searchParams.get('app');

  const [apps, setApps] = useState<App[]>([]);
  const [wallets, setWallets] = useState<SponsorWallet[]>([]);
  const [appId, setAppId] = useState<string>(selectedAppId || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    const fetchWallets = async () => {
      try {
        setLoading(true);
        const data = await api.getWallets(appId);
        setWallets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load wallets');
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, [appId]);

  const handleCreateWallet = async (data: {
    address: string;
    asset: string;
    lowBalanceThreshold: number;
  }) => {
    if (!appId) return;
    try {
      const newWallet = await api.createWallet(appId, data);
      setWallets([...wallets, newWallet]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create wallet');
    }
  };

  const handleTopUp = async (walletId: string, amount: number) => {
    if (!appId) return;
    try {
      const updated = await api.topUpWallet(appId, walletId, { amount });
      setWallets(wallets.map((w) => (w.id === walletId ? updated : w)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to top up wallet');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sponsor Wallets"
        description="Manage wallet balances and set low-balance alerts"
      />

      {error && (
        <div className="card p-4 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

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

      {appId && (
        <>
          <WalletForm onCreate={handleCreateWallet} />

          {loading ? (
            <LoadingState variant="cards" />
          ) : (
            <WalletList wallets={wallets} onTopUp={handleTopUp} />
          )}
        </>
      )}
    </div>
  );
}
