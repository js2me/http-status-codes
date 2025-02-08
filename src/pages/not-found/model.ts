import { PageViewModelBase } from 'mobx-wouter';

import { container, tag, tags } from '@/shared/lib/di';

export class NotFoundPageVM extends PageViewModelBase {
  private router = container.inject(tags.router);

  mount(): void {
    this.router.navigate('/', { replace: true });
  }
}

tag({ token: NotFoundPageVM, scope: 'container' });
