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

export const CodePage = ({ params }: { params: { code: string } }) => (
  <Suspense fallback={<ContentLoader />}>
    <LazyPage key={params.code} payload={params} />
  </Suspense>
);
