import { Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

import { CodePage } from '@/pages/[code]';
import { Layout } from '@/pages/_layout';
import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';

export const Routing = ({
  useHashRouting,
  baseUrl,
}: {
  useHashRouting?: boolean;
  baseUrl?: string;
}) => (
  <Router base={baseUrl}>
    <Router hook={useHashRouting ? useHashLocation : undefined}>
      <Layout>
        <Switch>
          <Route path={'/'} component={HomePage} />
          <Route path={'/:code'} component={CodePage} />
          <Route path={'*'} component={NotFoundPage} />
        </Switch>
      </Layout>
    </Router>
  </Router>
);
