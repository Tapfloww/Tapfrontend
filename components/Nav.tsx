'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import HorizonStatus from './HorizonStatus';
import { explorerContractUrl, stellar } from '@/lib/stellar';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/api-keys', label: 'API Keys' },
  { href: '/wallets', label: 'Wallets' },
  { href: '/transactions', label: 'Transactions' },
];

export default function Nav() {
  const pathname = usePathname();
  const contractUrl = explorerContractUrl();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              TapFlow
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <div className="flex items-center gap-0.5 sm:gap-1 mr-2 overflow-x-auto">
              {links.map(({ href, label }) => {
                const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
            <HorizonStatus />
            {contractUrl ? (
              <a
                href={contractUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden lg:inline text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
                title={stellar.contractId}
              >
                Contract
              </a>
            ) : null}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
