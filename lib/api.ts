import type {
  Organization,
  App,
  ApiKey,
  SponsorPolicy,
  SponsorWallet,
  Transaction,
  Dashboard,
} from './types';
import { mockApi } from './mock-data';

export type { ActivityItem } from './mock-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false';

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

async function withBackend<T>(
  endpoint: string,
  options: RequestInit,
  mockFn: () => Promise<T>
): Promise<T> {
  if (USE_MOCK) {
    return mockFn();
  }

  try {
    return await apiCall<T>(endpoint, options);
  } catch {
    return mockFn();
  }
}

export const api = {
  getDashboard: () =>
    withBackend('/v1/dashboard', { method: 'GET' }, () => mockApi.getDashboard()),

  getRecentActivity: () =>
    withBackend('/v1/activity', { method: 'GET' }, () => mockApi.getRecentActivity()),

  getOrganization: () =>
    withBackend('/v1/organization', { method: 'GET' }, () => mockApi.getOrganization()),

  getApps: () =>
    withBackend('/v1/apps', { method: 'GET' }, () => mockApi.getApps()),

  createApp: (data: { name: string }) =>
    withBackend(
      '/v1/apps',
      { method: 'POST', body: JSON.stringify(data) },
      () => mockApi.createApp(data)
    ),

  getApiKeys: (appId: string) =>
    withBackend(
      `/v1/apps/${appId}/keys`,
      { method: 'GET' },
      () => mockApi.getApiKeys(appId)
    ),

  createApiKey: (appId: string, data: { name: string }) =>
    withBackend(
      `/v1/apps/${appId}/keys`,
      { method: 'POST', body: JSON.stringify(data) },
      () => mockApi.createApiKey(appId, data)
    ),

  revokeApiKey: (appId: string, keyId: string) =>
    withBackend(
      `/v1/apps/${appId}/keys/${keyId}`,
      { method: 'DELETE' },
      () => mockApi.revokeApiKey(appId, keyId)
    ),

  getPolicies: (appId: string) =>
    withBackend(
      `/v1/apps/${appId}/policies`,
      { method: 'GET' },
      () => mockApi.getPolicies(appId)
    ),

  createPolicy: (
    appId: string,
    data: { asset: string; maxFeePerTx: number; dailyCap: number }
  ) =>
    withBackend(
      `/v1/apps/${appId}/policies`,
      { method: 'POST', body: JSON.stringify(data) },
      () => mockApi.createPolicy(appId, data)
    ),

  getWallets: (appId: string) =>
    withBackend(
      `/v1/apps/${appId}/wallets`,
      { method: 'GET' },
      () => mockApi.getWallets(appId)
    ),

  createWallet: (
    appId: string,
    data: { address: string; asset: string; lowBalanceThreshold: number }
  ) =>
    withBackend(
      `/v1/apps/${appId}/wallets`,
      { method: 'POST', body: JSON.stringify(data) },
      () => mockApi.createWallet(appId, data)
    ),

  topUpWallet: (appId: string, walletId: string, data: { amount: number }) =>
    withBackend(
      `/v1/apps/${appId}/wallets/${walletId}/topup`,
      { method: 'POST', body: JSON.stringify(data) },
      () => mockApi.topUpWallet(appId, walletId, data)
    ),

  getTransactions: (appId: string, filters?: { userId?: string; status?: string }) =>
    withBackend(
      `/v1/apps/${appId}/transactions`,
      { method: 'GET' },
      () => mockApi.getTransactions(appId, filters)
    ),

  getTransaction: (appId: string, txId: string) =>
    withBackend(
      `/v1/apps/${appId}/transactions/${txId}`,
      { method: 'GET' },
      () => mockApi.getTransaction(appId, txId)
    ),
};
