import { RouteView, RouteViewGroup } from 'mobx-route/react';

import { CodePage } from '@/pages/[code]';
import { Layout } from '@/pages/_layout';
import { HomePage } from '@/pages/home';
import { routes } from '@/shared/lib/routes';

export const Routing = () => (
  <RouteViewGroup layout={Layout} otherwise={routes.home} replace>
    <RouteView route={routes.home} view={HomePage} />
    <RouteView route={routes.code} view={CodePage} />
  </RouteViewGroup>
);
