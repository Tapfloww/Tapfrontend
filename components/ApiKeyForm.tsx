'use client';

import { useState } from 'react';

interface ApiKeyFormProps {
  onCreate: (name: string) => Promise<void>;
}

export default function ApiKeyForm({ onCreate }: ApiKeyFormProps) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      setError(null);
      await onCreate(name);
      setName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create key');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Create New API Key</h2>

      {error && (
        <div className="card p-3 mb-4 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Key Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Production API Key"
            className="input"
            disabled={loading}
          />
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1.5">
            Give this key a descriptive name to remember its purpose
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create API Key'}
        </button>
      </form>
    </div>
  );
}
