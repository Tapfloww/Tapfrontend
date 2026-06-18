import { Suspense } from 'react';
import WalletsContent from '@/components/WalletsContent';

export default function WalletsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WalletsContent />
    </Suspense>
  );
}
