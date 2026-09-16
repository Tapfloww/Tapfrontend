import type { Transaction } from '@/lib/types';

interface TransactionTableProps {
  transactions: Transaction[];
  getContractLink: (hash: string) => string;
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'success':
      return <span className="badge-success">Success</span>;
    case 'failed':
      return <span className="badge-error">Failed</span>;
    case 'pending':
    case 'pending_onchain':
      return <span className="badge-warning">Pending</span>;
    default:
      return <span className="badge">{status}</span>;
  }
}

export default function TransactionTable({
  transactions,
  getContractLink,
}: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="table-header">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Fee
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                TX Hash
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {transactions.map((tx) => (
              <tr key={tx.id} className="table-row">
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {new Date(tx.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-mono">
                  {tx.userId || '—'}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium whitespace-nowrap">
                  {tx.amount.toFixed(4)} {tx.asset}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {tx.fee.toFixed(7)} XLM
                </td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge status={tx.status} />
                </td>
                <td className="px-6 py-4 text-sm">
                  {tx.txHash.startsWith('pending_') || !getContractLink(tx.txHash) ? (
                    <span className="font-mono text-xs text-slate-500">{tx.txHash.substring(0, 16)}…</span>
                  ) : (
                    <a
                      href={getContractLink(tx.txHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-mono text-xs"
                    >
                      {tx.txHash.substring(0, 8)}...
                    </a>
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
