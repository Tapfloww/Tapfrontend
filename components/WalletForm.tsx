'use client';

import { useState } from 'react';

interface WalletFormProps {
  onCreate: (data: {
    address: string;
    asset: string;
    lowBalanceThreshold: number;
  }) => Promise<void>;
}

export default function WalletForm({ onCreate }: WalletFormProps) {
  const [address, setAddress] = useState('');
  const [asset, setAsset] = useState('USDC');
  const [threshold, setThreshold] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    try {
      setLoading(true);
      setError(null);
      await onCreate({
        address: address.trim(),
        asset,
        lowBalanceThreshold: threshold,
      });
      setAddress('');
      setThreshold(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create wallet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Add Sponsor Wallet</h2>

      {error && (
        <div className="card p-3 mb-4 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Wallet Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            className="input font-mono"
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Asset</label>
            <input
              type="text"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="input"
              disabled={loading}
            />
          </div>

          <div>
            <label className="label">Low Balance Threshold</label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="input"
              disabled={loading}
              min="1"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !address.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Wallet'}
        </button>
      </form>
    </div>
  );
}
