import { observer } from 'mobx-react-lite';
import { ViewModelsProvider } from 'mobx-view-model-react';
import { ErrorBoundary } from 'react-simple-error-boundary';

import { appViewModels } from '@/shared/lib/app-view-models';

import { Routing } from './routing';

export const App = observer(() => {
  return (
    <ViewModelsProvider value={appViewModels}>
      <ErrorBoundary>
        <Routing />
      </ErrorBoundary>
    </ViewModelsProvider>
  );
});
