const STELLAR_ACCOUNT = /^G[A-Z2-7]{55}$/;
const STELLAR_CONTRACT = /^C[A-Z2-7]{55}$/;

export type StellarNetwork = 'testnet' | 'public' | 'mainnet';

function normalizeNetwork(value: string | undefined): 'testnet' | 'public' {
  const v = (value || 'testnet').toLowerCase();
  return v === 'public' || v === 'mainnet' ? 'public' : 'testnet';
}

export const stellar = {
  network: normalizeNetwork(process.env.NEXT_PUBLIC_STELLAR_NETWORK),
  get horizonUrl() {
    if (process.env.NEXT_PUBLIC_HORIZON_URL) return process.env.NEXT_PUBLIC_HORIZON_URL;
    return this.network === 'public'
      ? 'https://horizon.stellar.org'
      : 'https://horizon-testnet.stellar.org';
  },
  get explorerBase() {
    return this.network === 'public'
      ? 'https://stellar.expert/explorer/public'
      : 'https://stellar.expert/explorer/testnet';
  },
  contractId: process.env.NEXT_PUBLIC_CONTRACT_ID || '',
};

export function isStellarPublicKey(value: string): boolean {
  return Boolean(value) && STELLAR_ACCOUNT.test(value.trim());
}

export function isStellarContractId(value: string): boolean {
  return Boolean(value) && STELLAR_CONTRACT.test(value.trim());
}

export function shortenAddress(address: string, head = 4, tail = 4): string {
  if (!address || address.length < head + tail + 3) return address;
  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}

export function explorerAccountUrl(address: string): string {
  return `${stellar.explorerBase}/account/${address}`;
}

export function explorerTxUrl(hash: string): string {
  if (!hash || hash.startsWith('pending_')) return '';
  return `${stellar.explorerBase}/tx/${hash}`;
}

export function explorerContractUrl(contractId = stellar.contractId): string {
  if (!contractId) return '';
  return `${stellar.explorerBase}/contract/${contractId}`;
}

export function quoteFee(amount: number, policyBps: number, maxFee: number): number {
  if (!(amount > 0) || policyBps < 0) return 0;
  const quoted = Math.floor((amount * policyBps) / 10_000);
  return quoted > maxFee ? maxFee : quoted;
}

export async function pingHorizon(timeoutMs = 2500): Promise<boolean> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${stellar.horizonUrl.replace(/\/$/, '')}/`, {
      signal: ctrl.signal,
      cache: 'no-store',
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
