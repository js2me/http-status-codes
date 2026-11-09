import { withViewModel } from 'mobx-view-model-react';
import { lazy, Suspense } from 'react';

import { ContentLoader } from '@/shared/ui/content-loader';

const LazyPage = lazy(async () => {
  const [{ CodePageVM }, { CodePageView }] = await Promise.all([
    import('./model'),
    import('./ui'),
  ]);

  return { default: withViewModel(CodePageVM, CodePageView) };
});

export const CodePage = () => (
  <Suspense fallback={<ContentLoader />}>
    <LazyPage />
  </Suspense>
);
