'use client';

import { useState } from 'react';
import type { ApiKey } from '@/lib/types';

interface ApiKeyListProps {
  keys: ApiKey[];
  onRevoke: (keyId: string) => Promise<void>;
}

export default function ApiKeyList({ keys, onRevoke }: ApiKeyListProps) {
  const [revoking, setRevoking] = useState<string | null>(null);

  const handleRevoke = async (keyId: string) => {
    if (!confirm('Are you sure you want to revoke this key? Applications using it will stop working.')) {
      return;
    }

    try {
      setRevoking(keyId);
      await onRevoke(keyId);
    } finally {
      setRevoking(null);
    }
  };

  if (keys.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">No API keys yet. Create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="table-header">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Prefix</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Last Used</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {keys.map((key) => (
              <tr key={key.id} className="table-row">
                <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">{key.name}</td>
                <td className="px-6 py-4 text-sm">
                  <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono text-slate-600 dark:text-slate-300">{key.prefix}...</code>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                  {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never'}
                </td>
                <td className="px-6 py-4 text-sm">
                  {key.revokedAt ? (
                    <span className="badge-error">Revoked</span>
                  ) : (
                    <span className="badge-success">Active</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {!key.revokedAt && (
                    <button
                      onClick={() => handleRevoke(key.id)}
                      disabled={revoking === key.id}
                      className="btn-danger disabled:opacity-50"
                    >
                      {revoking === key.id ? 'Revoking...' : 'Revoke'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
