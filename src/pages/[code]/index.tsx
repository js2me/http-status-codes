import { lazy, Suspense } from 'react';

import { ContentLoader } from '@/shared/ui/content-loader';

const LazyPage = lazy(async () => {
  const { CodePageContent } = await import('./ui');
  return { default: CodePageContent };
});

export const CodePage = () => (
  <Suspense fallback={<ContentLoader />}>
    <LazyPage />
  </Suspense>
);
