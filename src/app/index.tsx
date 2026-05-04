import { observer } from 'mobx-react-lite';
import { ViewModelsProvider } from 'mobx-view-model';
import { ErrorBoundary } from 'react-simple-error-boundary';

import { appRouter } from '@/shared/lib/app-router';
import { appViewModels } from '@/shared/lib/app-view-models';

import { Routing } from './routing';

export const App = observer(() => {
  return (
    <ViewModelsProvider value={appViewModels}>
      <ErrorBoundary>
        <Routing useHashRouting baseUrl={appRouter.baseUrl} />
      </ErrorBoundary>
    </ViewModelsProvider>
  );
});
