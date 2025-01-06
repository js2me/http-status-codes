import { observer } from 'mobx-react-lite';
import { ViewModelsProvider } from 'mobx-vm-entities';
import { ErrorBoundary } from 'react-simple-error-boundary';

import { useRootStore } from '@/shared/lib/mobx/root-store';

import { Routing } from './routing';

export const App = observer(() => {
  const { viewModels, router } = useRootStore();

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
