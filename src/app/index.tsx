import { observer } from 'mobx-react-lite';
import { ViewModelsProvider } from 'mobx-view-model';
import { ErrorBoundary } from 'react-simple-error-boundary';

import { container, tags } from '@/shared/lib/di';

import { Routing } from './routing';

export const App = observer(() => {
  const router = container.inject(tags.router);
  const viewModels = container.inject(tags.viewModels);

  return (
    <ViewModelsProvider value={viewModels}>
      <ErrorBoundary>
        <Routing
          useHashRouting={router.type === 'hash'}
          baseUrl={router.baseUrl}
        />
      </ErrorBoundary>
    </ViewModelsProvider>
  );
});
