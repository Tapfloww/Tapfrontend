export interface Organization {
  id: string;
  name: string;
  createdAt: string;
}

export interface App {
  id: string;
  organizationId: string;
  name: string;
  apiKeyPrefix: string;
  createdAt: string;
}

export interface ApiKey {
  id: string;
  appId: string;
  name: string;
  prefix: string;
  lastUsed: string | null;
  createdAt: string;
  revokedAt: string | null;
}

export interface SponsorPolicy {
  id: string;
  appId: string;
  asset: string;
  maxFeePerTx: number;
  dailyCap: number;
  dailyUsed: number;
  createdAt: string;
}

export interface SponsorWallet {
  id: string;
  appId: string;
  address: string;
  balance: number;
  asset: string;
  lowBalanceThreshold: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  appId: string;
  userId: string | null;
  txHash: string;
  amount: number;
  fee: number;
  asset: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: string;
}

export interface Dashboard {
  org: Organization;
  apps: App[];
  totalTxCount: number;
  totalFeeSpent: number;
  activePolicies: number;
  lowBalanceWallets: SponsorWallet[];
}
