import { observer } from 'mobx-react-lite';
import { ViewModelsProvider } from 'mobx-vm-entities';
import { ErrorBoundary } from 'react-simple-error-boundary';
import { Route, Router, Switch } from 'wouter';

import { CodePage } from '@/pages/[code]';
import { Layout } from '@/pages/_layout';
import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import { useRootStore } from '@/shared/lib/mobx/root-store';

export const App = observer(() => {
  const { viewModels } = useRootStore();

  return (
    <ViewModelsProvider value={viewModels}>
      <ErrorBoundary>
        <Router base={buildEnvs.BASE_URL}>
          <Switch>
            <Route path={'/'}>
              <Layout>
                <HomePage />
              </Layout>
            </Route>
            <Route path={'/:code'} component={CodePage} />
            <Route path={'*'}>
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </ErrorBoundary>
    </ViewModelsProvider>
  );
});
