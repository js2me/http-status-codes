import { createHashHistory } from 'mobx-location-history';
import { Router } from 'mobx-wouter';

export const appRouter = new Router({
  history: createHashHistory(),
  baseUrl: buildEnvs.BASE_URL || '/',
  useStartViewTransition: true,
});
