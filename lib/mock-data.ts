import type {
  App,
  ApiKey,
  Dashboard,
  Organization,
  SponsorPolicy,
  SponsorWallet,
  Transaction,
} from './types';

const ORG: Organization = {
  id: 'org_1',
  name: 'Acme Payments',
  createdAt: '2025-11-01T00:00:00Z',
};

const APPS: App[] = [
  {
    id: 'app_1',
    organizationId: 'org_1',
    name: 'MyApp',
    apiKeyPrefix: 'tap_live_a1b2',
    createdAt: '2025-11-15T00:00:00Z',
  },
  {
    id: 'app_2',
    organizationId: 'org_1',
    name: 'Checkout Widget',
    apiKeyPrefix: 'tap_live_c3d4',
    createdAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'app_3',
    organizationId: 'org_1',
    name: 'Mobile Wallet SDK',
    apiKeyPrefix: 'tap_live_m7n8',
    createdAt: '2026-02-20T00:00:00Z',
  },
  {
    id: 'app_4',
    organizationId: 'org_1',
    name: 'Remittance Portal',
    apiKeyPrefix: 'tap_live_r5t6',
    createdAt: '2026-04-05T00:00:00Z',
  },
  {
    id: 'app_5',
    organizationId: 'org_1',
    name: 'NFT Marketplace',
    apiKeyPrefix: 'tap_live_n9p0',
    createdAt: '2026-05-18T00:00:00Z',
  },
];

let apiKeys: ApiKey[] = [
  // app_1
  {
    id: 'key_1',
    appId: 'app_1',
    name: 'Production API Key',
    prefix: 'tap_live_a1b2',
    lastUsed: '2026-06-17T14:30:00Z',
    createdAt: '2025-11-15T00:00:00Z',
    revokedAt: null,
  },
  {
    id: 'key_2',
    appId: 'app_1',
    name: 'Staging Key',
    prefix: 'tap_test_x9y8',
    lastUsed: '2026-06-16T09:12:00Z',
    createdAt: '2026-02-01T00:00:00Z',
    revokedAt: null,
  },
  {
    id: 'key_3',
    appId: 'app_1',
    name: 'CI/CD Integration',
    prefix: 'tap_test_ci42',
    lastUsed: '2026-06-15T18:45:00Z',
    createdAt: '2026-03-10T00:00:00Z',
    revokedAt: null,
  },
  {
    id: 'key_4',
    appId: 'app_1',
    name: 'Legacy Production Key',
    prefix: 'tap_live_old1',
    lastUsed: '2026-01-20T11:00:00Z',
    createdAt: '2025-11-15T00:00:00Z',
    revokedAt: '2026-02-15T08:00:00Z',
  },
  // app_2
  {
    id: 'key_5',
    appId: 'app_2',
    name: 'Widget Production',
    prefix: 'tap_live_c3d4',
    lastUsed: '2026-06-18T10:22:00Z',
    createdAt: '2026-01-10T00:00:00Z',
    revokedAt: null,
  },
  {
    id: 'key_6',
    appId: 'app_2',
    name: 'Widget Sandbox',
    prefix: 'tap_test_wdgt',
    lastUsed: null,
    createdAt: '2026-01-12T00:00:00Z',
    revokedAt: null,
  },
  // app_3
  {
    id: 'key_7',
    appId: 'app_3',
    name: 'iOS SDK Key',
    prefix: 'tap_live_m7n8',
    lastUsed: '2026-06-18T07:55:00Z',
    createdAt: '2026-02-20T00:00:00Z',
    revokedAt: null,
  },
  {
    id: 'key_8',
    appId: 'app_3',
    name: 'Android SDK Key',
    prefix: 'tap_live_andr',
    lastUsed: '2026-06-17T22:10:00Z',
    createdAt: '2026-02-22T00:00:00Z',
    revokedAt: null,
  },
  {
    id: 'key_9',
    appId: 'app_3',
    name: 'Deprecated v1 Key',
    prefix: 'tap_live_v1xx',
    lastUsed: '2026-04-01T00:00:00Z',
    createdAt: '2026-02-20T00:00:00Z',
    revokedAt: '2026-05-01T12:00:00Z',
  },
  // app_4
  {
    id: 'key_10',
    appId: 'app_4',
    name: 'Remittance Production',
    prefix: 'tap_live_r5t6',
    lastUsed: '2026-06-18T06:30:00Z',
    createdAt: '2026-04-05T00:00:00Z',
    revokedAt: null,
  },
  {
    id: 'key_11',
    appId: 'app_4',
    name: 'Partner Integration',
    prefix: 'tap_live_ptr9',
    lastUsed: '2026-06-16T15:40:00Z',
    createdAt: '2026-04-20T00:00:00Z',
    revokedAt: null,
  },
  // app_5
  {
    id: 'key_12',
    appId: 'app_5',
    name: 'Marketplace Main',
    prefix: 'tap_live_n9p0',
    lastUsed: '2026-06-17T19:05:00Z',
    createdAt: '2026-05-18T00:00:00Z',
    revokedAt: null,
  },
];

let wallets: SponsorWallet[] = [
  // app_1 — low balance alert
  {
    id: 'wallet_1',
    appId: 'app_1',
    address: 'GBZXN7PIRZGNMHGA7MUUUF4GWJQSI5TNUCQQKILXVLXWCV2P7AUUQ73C',
    balance: 42.5,
    asset: 'XLM',
    lowBalanceThreshold: 100,
    createdAt: '2025-11-20T00:00:00Z',
  },
  {
    id: 'wallet_2',
    appId: 'app_1',
    address: 'GCKFBEIYTKP6QXQGVHBR7NGK4AAGRNJ7AAOAFPDKRDY3MZJOXRAWARD',
    balance: 1250.0,
    asset: 'USDC',
    lowBalanceThreshold: 500,
    createdAt: '2025-12-01T00:00:00Z',
  },
  {
    id: 'wallet_3',
    appId: 'app_1',
    address: 'GDQPXKPQGKAFYIJNRBXDXNB2COPMVGDJCD5XHIOMLI4LFFBX7GCCWC46',
    balance: 87.3,
    asset: 'EURC',
    lowBalanceThreshold: 200,
    createdAt: '2026-01-15T00:00:00Z',
  },
  // app_2
  {
    id: 'wallet_4',
    appId: 'app_2',
    address: 'GA5ZSEJYB37JRC5I4JPLNXNMWKRXPZA33TKGEQIETA3IHDMDBILO2A27',
    balance: 3200.75,
    asset: 'USDC',
    lowBalanceThreshold: 1000,
    createdAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'wallet_5',
    appId: 'app_2',
    address: 'GCQTGZQQ5G4PTM2RN7XZJMH5O77IVH2K6N5RRKJ73G4FQYQL2E4TR',
    balance: 18.2,
    asset: 'XLM',
    lowBalanceThreshold: 50,
    createdAt: '2026-01-12T00:00:00Z',
  },
  // app_3
  {
    id: 'wallet_6',
    appId: 'app_3',
    address: 'GAAZI4TCR3TY5OJHCTJC2A4QSY6CJWJH5IAJTGKIN2HVNDAEHYMWXEP',
    balance: 890.0,
    asset: 'USDC',
    lowBalanceThreshold: 300,
    createdAt: '2026-02-20T00:00:00Z',
  },
  {
    id: 'wallet_7',
    appId: 'app_3',
    address: 'GBY77ZMGKLTQEQERZDR7QZG4GYPTXNIS3WZHUR3K64JC5H2WQJI3XGD',
    balance: 450.0,
    asset: 'XLM',
    lowBalanceThreshold: 200,
    createdAt: '2026-02-22T00:00:00Z',
  },
  // app_4 — critical low balance
  {
    id: 'wallet_8',
    appId: 'app_4',
    address: 'GAXN3L4BGYBZCPTUHFRPAJ4ZY3G4K2VDP7R16HEL3HOA4HZLMLR5',
    balance: 12.8,
    asset: 'USDC',
    lowBalanceThreshold: 500,
    createdAt: '2026-04-05T00:00:00Z',
  },
  {
    id: 'wallet_9',
    appId: 'app_4',
    address: 'GCOVNH4CDRZJMOR3P3F6FEK5L5K4ZV5ZP3F6FEK5L5K4ZV5ZP3F6FEK',
    balance: 5600.0,
    asset: 'EURC',
    lowBalanceThreshold: 2000,
    createdAt: '2026-04-10T00:00:00Z',
  },
  // app_5
  {
    id: 'wallet_10',
    appId: 'app_5',
    address: 'GDR2F6X6PGB2P55QNGVC23DF6DBGT4TDF3TGAKMTUK3UYH5E7OGQ',
    balance: 2100.5,
    asset: 'USDC',
    lowBalanceThreshold: 800,
    createdAt: '2026-05-18T00:00:00Z',
  },
];

const policies: SponsorPolicy[] = [
  {
    id: 'policy_1',
    appId: 'app_1',
    asset: 'USDC',
    maxFeePerTx: 0.5,
    dailyCap: 100,
    dailyUsed: 45.2,
    createdAt: '2025-11-20T00:00:00Z',
  },
  {
    id: 'policy_2',
    appId: 'app_1',
    asset: 'XLM',
    maxFeePerTx: 1.0,
    dailyCap: 200,
    dailyUsed: 78.5,
    createdAt: '2025-11-20T00:00:00Z',
  },
  {
    id: 'policy_3',
    appId: 'app_1',
    asset: 'EURC',
    maxFeePerTx: 0.5,
    dailyCap: 75,
    dailyUsed: 22.1,
    createdAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'policy_4',
    appId: 'app_2',
    asset: 'USDC',
    maxFeePerTx: 0.25,
    dailyCap: 500,
    dailyUsed: 312.8,
    createdAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'policy_5',
    appId: 'app_3',
    asset: 'USDC',
    maxFeePerTx: 0.5,
    dailyCap: 150,
    dailyUsed: 89.4,
    createdAt: '2026-02-20T00:00:00Z',
  },
  {
    id: 'policy_6',
    appId: 'app_3',
    asset: 'XLM',
    maxFeePerTx: 2.0,
    dailyCap: 300,
    dailyUsed: 145.0,
    createdAt: '2026-02-20T00:00:00Z',
  },
  {
    id: 'policy_7',
    appId: 'app_4',
    asset: 'USDC',
    maxFeePerTx: 1.0,
    dailyCap: 1000,
    dailyUsed: 678.3,
    createdAt: '2026-04-05T00:00:00Z',
  },
  {
    id: 'policy_8',
    appId: 'app_4',
    asset: 'EURC',
    maxFeePerTx: 0.75,
    dailyCap: 800,
    dailyUsed: 420.5,
    createdAt: '2026-04-10T00:00:00Z',
  },
  {
    id: 'policy_9',
    appId: 'app_5',
    asset: 'USDC',
    maxFeePerTx: 0.1,
    dailyCap: 50,
    dailyUsed: 38.7,
    createdAt: '2026-05-18T00:00:00Z',
  },
];

const USER_IDS = [
  'user_0x12a3', 'user_0x45b6', 'user_0x78c9', 'user_0xdead',
  'user_0xbeef', 'user_0xcafe', 'user_0xface', 'user_0xfeed',
  'user_alice', 'user_bob', 'user_carol', 'user_dave',
  'user_eve', 'user_frank', 'user_grace', 'user_henry',
];

const ASSETS = ['USDC', 'XLM', 'EURC'] as const;
const STATUSES = ['success', 'success', 'success', 'success', 'pending', 'failed'] as const;

function hash(seed: number): string {
  const hex = seed.toString(16).padStart(8, '0');
  return `${hex}f6789012345678901234567890abcdef1234567890abcdef1234567ab${seed % 10}`;
}

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60000).toISOString();
}

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 3600000).toISOString();
}

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 86400000).toISOString();
}

function generateTransactions(): Transaction[] {
  const txs: Transaction[] = [];
  let id = 1;

  const appDistribution = [
    { appId: 'app_1', count: 18 },
    { appId: 'app_2', count: 12 },
    { appId: 'app_3', count: 10 },
    { appId: 'app_4', count: 8 },
    { appId: 'app_5', count: 6 },
  ];

  for (const { appId, count } of appDistribution) {
    for (let i = 0; i < count; i++) {
      const status = STATUSES[(id + i) % STATUSES.length];
      const asset = ASSETS[(id + i) % ASSETS.length];
      const amount = Math.round((Math.random() * 500 + 5) * 100) / 100;
      const fee = Math.round((Math.random() * 0.001 + 0.00001) * 1e7) / 1e7;

      let createdAt: string;
      if (i < 3) createdAt = minutesAgo(i + 1);
      else if (i < 8) createdAt = hoursAgo(i - 2);
      else createdAt = daysAgo(Math.floor(i / 2));

      txs.push({
        id: `tx_${id}`,
        appId,
        userId: USER_IDS[(id + i) % USER_IDS.length],
        txHash: hash(id * 7919 + i * 104729),
        amount,
        fee,
        asset,
        status,
        createdAt,
      });
      id++;
    }
  }

  return txs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

let transactions: Transaction[] = generateTransactions();

// Historical volume beyond seeded transactions (simulates months of production traffic)
const HISTORICAL_TX_COUNT = 12400;
const HISTORICAL_FEE_SPENT = 4520.18;

function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export interface ActivityItem {
  id: string;
  type: 'transaction' | 'key_created' | 'wallet_added' | 'policy_updated';
  title: string;
  description: string;
  timestamp: string;
}

function buildRecentActivity(): ActivityItem[] {
  const recentTxs = transactions.slice(0, 4);
  const txActivity: ActivityItem[] = recentTxs.map((tx) => ({
    id: `act_tx_${tx.id}`,
    type: 'transaction' as const,
    title: tx.status === 'success' ? 'Transaction Sponsored' : tx.status === 'pending' ? 'Transaction Pending' : 'Transaction Failed',
    description: `${tx.userId} sent ${tx.amount} ${tx.asset} — fee ${tx.fee.toFixed(7)} XLM`,
    timestamp: tx.createdAt,
  }));

  return [
    ...txActivity,
    {
      id: 'act_key_1',
      type: 'key_created' as const,
      title: 'API Key Created',
      description: 'New "Partner Integration" key generated for Remittance Portal',
      timestamp: daysAgo(2),
    },
    {
      id: 'act_wallet_1',
      type: 'wallet_added' as const,
      title: 'Wallet Funded',
      description: 'Sponsor wallet topped up with 500 USDC for Checkout Widget',
      timestamp: daysAgo(3),
    },
    {
      id: 'act_policy_1',
      type: 'policy_updated' as const,
      title: 'Policy Updated',
      description: 'Daily cap raised to 1000 USDC for Remittance Portal',
      timestamp: daysAgo(5),
    },
    {
      id: 'act_key_2',
      type: 'key_created' as const,
      title: 'API Key Revoked',
      description: 'Deprecated v1 key revoked for Mobile Wallet SDK',
      timestamp: daysAgo(7),
    },
  ].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export const mockApi = {
  async getDashboard(): Promise<Dashboard> {
    await delay();
    const lowBalanceWallets = wallets.filter(
      (w) => w.balance < w.lowBalanceThreshold
    );
    const seededFees = transactions.reduce((sum, tx) => sum + tx.fee, 0);
    return {
      org: ORG,
      apps: APPS,
      totalTxCount: HISTORICAL_TX_COUNT + transactions.length,
      totalFeeSpent: HISTORICAL_FEE_SPENT + seededFees,
      activePolicies: policies.length,
      lowBalanceWallets,
    };
  },

  async getRecentActivity(): Promise<ActivityItem[]> {
    await delay(150);
    return buildRecentActivity();
  },

  async getOrganization(): Promise<Organization> {
    await delay();
    return ORG;
  },

  async getApps(): Promise<App[]> {
    await delay();
    return [...APPS];
  },

  async createApp(data: { name: string }): Promise<App> {
    await delay();
    const app: App = {
      id: generateId('app'),
      organizationId: ORG.id,
      name: data.name,
      apiKeyPrefix: `tap_live_${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    APPS.push(app);
    return app;
  },

  async getApiKeys(appId: string): Promise<ApiKey[]> {
    await delay();
    return apiKeys.filter((k) => k.appId === appId);
  },

  async createApiKey(appId: string, data: { name: string }): Promise<ApiKey> {
    await delay();
    const prefix = `tap_live_${Math.random().toString(36).slice(2, 6)}`;
    const key: ApiKey = {
      id: generateId('key'),
      appId,
      name: data.name,
      prefix,
      lastUsed: null,
      createdAt: new Date().toISOString(),
      revokedAt: null,
    };
    apiKeys.push(key);
    return key;
  },

  async revokeApiKey(appId: string, keyId: string): Promise<void> {
    await delay();
    apiKeys = apiKeys.map((k) =>
      k.id === keyId && k.appId === appId
        ? { ...k, revokedAt: new Date().toISOString() }
        : k
    );
  },

  async getPolicies(appId: string): Promise<SponsorPolicy[]> {
    await delay();
    return policies.filter((p) => p.appId === appId);
  },

  async createPolicy(
    appId: string,
    data: { asset: string; maxFeePerTx: number; dailyCap: number }
  ): Promise<SponsorPolicy> {
    await delay();
    const policy: SponsorPolicy = {
      id: generateId('policy'),
      appId,
      asset: data.asset,
      maxFeePerTx: data.maxFeePerTx,
      dailyCap: data.dailyCap,
      dailyUsed: 0,
      createdAt: new Date().toISOString(),
    };
    policies.push(policy);
    return policy;
  },

  async getWallets(appId: string): Promise<SponsorWallet[]> {
    await delay();
    return wallets.filter((w) => w.appId === appId);
  },

  async createWallet(
    appId: string,
    data: { address: string; asset: string; lowBalanceThreshold: number }
  ): Promise<SponsorWallet> {
    await delay();
    const wallet: SponsorWallet = {
      id: generateId('wallet'),
      appId,
      address: data.address,
      balance: 0,
      asset: data.asset,
      lowBalanceThreshold: data.lowBalanceThreshold,
      createdAt: new Date().toISOString(),
    };
    wallets.push(wallet);
    return wallet;
  },

  async topUpWallet(
    appId: string,
    walletId: string,
    data: { amount: number }
  ): Promise<SponsorWallet> {
    await delay();
    const wallet = wallets.find((w) => w.id === walletId && w.appId === appId);
    if (!wallet) throw new Error('Wallet not found');
    wallet.balance += data.amount;
    return { ...wallet };
  },

  async getTransactions(
    appId: string,
    filters?: { userId?: string; status?: string }
  ): Promise<Transaction[]> {
    await delay();
    return transactions.filter((tx) => {
      if (tx.appId !== appId) return false;
      if (filters?.userId && !tx.userId?.includes(filters.userId)) return false;
      if (filters?.status && tx.status !== filters.status) return false;
      return true;
    });
  },

  async getTransaction(appId: string, txId: string): Promise<Transaction> {
    await delay();
    const tx = transactions.find((t) => t.id === txId && t.appId === appId);
    if (!tx) throw new Error('Transaction not found');
    return tx;
  },
};
