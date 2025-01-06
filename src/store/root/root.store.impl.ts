import { TwoColorThemeStore } from 'mobx-shared-entities/theme';
import {
  AnyViewModel,
  ViewModelStore,
  ViewModelStoreImpl,
} from 'mobx-vm-entities';
import { IMobxRouter, MobxRouter, RouterNavigateParams, RouterToConfig } from 'mobx-wouter';

import { ToastStore } from '@/shared/_entities/toast';
import { ThemeStoreImpl } from '@/shared/lib/mobx/theme';

class MobxRouterImpl extends MobxRouter {
  navigate(to: RouterToConfig, options?: RouterNavigateParams): void {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        super.navigate(to, options)
      }).ready.then(() => {
        super.navigate(to, options)
      })
    } else{
      super.navigate(to, options); 
    }
  }
}

export class RootStoreImpl implements RootStore {
  router: IMobxRouter;
  theme: TwoColorThemeStore;
  viewModels: ViewModelStore<AnyViewModel>;
  toasts: ToastStore;

  constructor() {
    this.theme = new ThemeStoreImpl();
    this.toasts = new ToastStore();
    this.viewModels = new ViewModelStoreImpl();
    this.router = new MobxRouterImpl({
      type: 'hash',
      baseUrl: buildEnvs.BASE_URL || '/',
    });
  }
}
