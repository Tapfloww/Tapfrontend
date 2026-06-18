import { Suspense } from 'react';
import ApiKeysContent from '@/components/ApiKeysContent';

export default function ApiKeysPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApiKeysContent />
    </Suspense>
  );
}
