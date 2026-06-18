'use client';

import { useState } from 'react';
import type { SponsorWallet } from '@/lib/types';

interface WalletListProps {
  wallets: SponsorWallet[];
  onTopUp: (walletId: string, amount: number) => Promise<void>;
}

function getBalanceColor(balance: number, threshold: number): string {
  if (balance < threshold) return 'bg-red-500';
  if (balance < threshold * 1.5) return 'bg-amber-500';
  return 'bg-emerald-500';
}

export default function WalletList({ wallets, onTopUp }: WalletListProps) {
  const [topUpWalletId, setTopUpWalletId] = useState<string | null>(null);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [topuping, setTopuping] = useState<string | null>(null);

  const handleTopUp = async (walletId: string) => {
    const amount = parseFloat(topUpAmount);
    if (isNaN(amount) || amount <= 0) return;

    try {
      setTopuping(walletId);
      await onTopUp(walletId, amount);
      setTopUpWalletId(null);
      setTopUpAmount('');
    } finally {
      setTopuping(null);
    }
  };

  if (wallets.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">No wallets yet. Add one to start sponsoring transactions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {wallets.map((wallet) => {
        const percent = Math.min((wallet.balance / wallet.lowBalanceThreshold) * 100, 100);
        const isLow = wallet.balance < wallet.lowBalanceThreshold;

        return (
          <div key={wallet.id} className="card p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="min-w-0">
                <p className="font-mono text-sm text-slate-600 dark:text-slate-400 truncate">{wallet.address}</p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                  Asset: <span className="font-medium text-slate-700 dark:text-slate-300">{wallet.asset}</span>
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-2xl font-bold tracking-tight ${isLow ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
                  {wallet.balance.toFixed(4)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                  Threshold: {wallet.lowBalanceThreshold}
                </p>
              </div>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mb-4">
              <div
                className={`h-1.5 rounded-full transition-all ${getBalanceColor(wallet.balance, wallet.lowBalanceThreshold)}`}
                style={{ width: `${percent}%` }}
              />
            </div>

            {topUpWalletId === wallet.id ? (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  placeholder="Amount to add"
                  className="input flex-1"
                  step="0.01"
                  min="0"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleTopUp(wallet.id)}
                    disabled={topuping === wallet.id}
                    className="btn-primary flex-1 sm:flex-none disabled:opacity-50"
                  >
                    {topuping === wallet.id ? 'Topping...' : 'Confirm'}
                  </button>
                  <button
                    onClick={() => setTopUpWalletId(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setTopUpWalletId(wallet.id)}
                className="btn-primary"
              >
                Top Up Wallet
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
