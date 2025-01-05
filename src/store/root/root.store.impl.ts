import { TwoColorThemeStore } from 'mobx-shared-entities/theme';
import {
  AnyViewModel,
  ViewModelStore,
  ViewModelStoreImpl,
} from 'mobx-vm-entities';
import { IMobxRouter, MobxRouter } from 'mobx-wouter';

import { ToastStore } from '@/shared/_entities/toast';
import { ThemeStoreImpl } from '@/shared/lib/mobx/theme';

export class RootStoreImpl implements RootStore {
  router: IMobxRouter;
  theme: TwoColorThemeStore;
  viewModels: ViewModelStore<AnyViewModel>;
  toasts: ToastStore;

  constructor() {
    this.theme = new ThemeStoreImpl();
    this.toasts = new ToastStore();
    this.viewModels = new ViewModelStoreImpl();
    this.router = new MobxRouter({});
  }
}
