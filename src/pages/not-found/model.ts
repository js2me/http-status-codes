import { PageViewModelBase } from 'mobx-wouter/page-view-model';

import { appRouter } from '@/shared/lib/app-router';

export class NotFoundPageVM extends PageViewModelBase {
  private router = appRouter;

  mount(): void {
    this.router.navigate('/', { replace: true });
  }
}
