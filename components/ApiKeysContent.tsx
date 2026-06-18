'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import type { App, ApiKey } from '@/lib/types';
import ApiKeyForm from '@/components/ApiKeyForm';
import ApiKeyList from '@/components/ApiKeyList';
import PageHeader from '@/components/PageHeader';
import LoadingState from '@/components/LoadingState';

export default function ApiKeysContent() {
  const searchParams = useSearchParams();
  const selectedAppId = searchParams.get('app');

  const [apps, setApps] = useState<App[]>([]);
  const [keys, setKeys] = useState<ApiKey[]>([]);
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

    const fetchKeys = async () => {
      try {
        setLoading(true);
        const data = await api.getApiKeys(appId);
        setKeys(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load API keys');
      } finally {
        setLoading(false);
      }
    };

    fetchKeys();
  }, [appId]);

  const handleCreateKey = async (name: string) => {
    if (!appId) return;
    try {
      const newKey = await api.createApiKey(appId, { name });
      setKeys([...keys, newKey]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create key');
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    if (!appId) return;
    try {
      await api.revokeApiKey(appId, keyId);
      setKeys(keys.filter((k) => k.id !== keyId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke key');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="API Keys"
        description="Create and manage API keys for your integrations"
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
          <ApiKeyForm onCreate={handleCreateKey} />

          {loading ? (
            <LoadingState variant="table" />
          ) : (
            <ApiKeyList keys={keys} onRevoke={handleRevokeKey} />
          )}
        </>
      )}
    </div>
  );
}
