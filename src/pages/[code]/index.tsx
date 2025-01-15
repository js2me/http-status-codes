import { withLazyPageViewModel } from 'mobx-wouter';

import { ContentLoader } from '@/shared/ui/content-loader';

export const CodePage = withLazyPageViewModel(
  async () => {
    const [{ CodePageVM }, { CodePageView }] = await Promise.all([
      import('./model'),
      import('./ui'),
    ]);

    return {
      Model: CodePageVM,
      View: CodePageView,
    };
  },
  {
    fallback: () => <ContentLoader />,
  },
);
