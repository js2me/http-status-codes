import { LinkedAbortController } from 'linked-abort-controller';
import { TwoColorThemeStore } from 'mobx-shared-entities/theme';
import { ViewModelStoreImpl } from 'mobx-vm-entities';
import { IMobxRouter, MobxRouter } from 'mobx-wouter';

import { ToastStore } from '@/shared/_entities/toast';

import { ThemeStoreImpl } from '../mobx/theme';

import { tag } from './tag';

export * from './container.js';
export * from './container.types.js';
export * from './tag.js';
export * from './tag.types.js';

tag({
  token: LinkedAbortController,
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
  viewModels: tag<ViewModelStoreImpl>({
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
