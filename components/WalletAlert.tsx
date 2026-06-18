import type { SponsorWallet } from '@/lib/types';
import { AlertIcon } from './Icons';

interface WalletAlertProps {
  wallet: SponsorWallet;
}

export default function WalletAlert({ wallet }: WalletAlertProps) {
  const percentUsed = (wallet.balance / wallet.lowBalanceThreshold) * 100;
  const isCritical = percentUsed < 50;

  return (
    <div className={`card p-4 alert-warning ${isCritical ? 'border-red-400 dark:border-red-500 bg-red-50/80 dark:bg-red-950/20' : ''}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <AlertIcon className={`w-4 h-4 flex-shrink-0 ${isCritical ? 'text-red-500' : 'text-amber-500'}`} />
            <p className="font-mono text-sm text-slate-900 dark:text-white truncate">{wallet.address}</p>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Balance: <span className="font-semibold text-slate-900 dark:text-white">{wallet.balance.toFixed(4)}</span> {wallet.asset}
            <span className="text-slate-400 dark:text-slate-500 mx-2">·</span>
            Threshold: {wallet.lowBalanceThreshold}
          </p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-3">
            <div
              className={`h-1.5 rounded-full transition-all ${isCritical ? 'bg-red-500' : 'bg-amber-500'}`}
              style={{ width: `${Math.min(percentUsed, 100)}%` }}
            />
          </div>
        </div>
        <a href="/wallets" className="btn-primary text-sm flex-shrink-0">
          Top Up
        </a>
      </div>
    </div>
  );
}
