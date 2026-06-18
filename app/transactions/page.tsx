import { Suspense } from 'react';
import TransactionsContent from '@/components/TransactionsContent';

export default function TransactionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionsContent />
    </Suspense>
  );
}
