import { withLazyPageViewModel } from 'mobx-wouter';

import { Layout } from '../_layout';

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
    fallback: () => <Layout loading />,
  },
);
