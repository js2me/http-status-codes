import { container, tag } from 'mobidic';
import { TwoColorThemeStore } from 'mobx-shared-entities/theme';
import { ViewModelStore, ViewModelStoreImpl } from 'mobx-vm-entities';
import { IMobxRouter, MobxRouter } from 'mobx-wouter';

import { ToastStore } from '@/shared/_entities/toast';

import { ThemeStoreImpl } from '../mobx/theme';

export * from 'mobidic';

tag({
  token: AbortController,
  scope: 'container',
  destroy: (value) => {
    value.abort();
  },
});

export const tags = {
  /**
   * Тема приложения
   */
  theme: tag<TwoColorThemeStore>({
    scope: 'singleton',
    value: () => new ThemeStoreImpl(),
  }),
  toasts: tag({
    scope: 'singleton',
    value: () => new ToastStore(),
  }),
  /**
   * Модель для работы со вьюшками
   */
  viewModels: tag<ViewModelStore>({
    scope: 'singleton',
    value: () => new ViewModelStoreImpl(),
  }),
  /**
   * Роутер приложения
   */
  router: tag<IMobxRouter>({
    scope: 'singleton',
    value: () =>
      new MobxRouter({
        type: 'hash',
        baseUrl: buildEnvs.BASE_URL || '/',
        useStartViewTransition: true,
      }),
  }),
} as const;

console.info(tags, container);
