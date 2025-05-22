import { container, tag, Tag } from 'mobidic';
import { TwoColorThemeStore } from 'mobx-shared-entities/theme';
import { ViewModelStore, ViewModelStoreBase } from 'mobx-view-model';
import { IRouter, Router } from 'mobx-wouter';

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
    value: () => new ViewModelStoreBase(),
  }),
  /**
   * Роутер приложения
   */
  router: tag<IRouter>({
    scope: 'singleton',
    value: () =>
      new Router({
        type: 'hash',
        baseUrl: buildEnvs.BASE_URL || '/',
        useStartViewTransition: true,
      }),
  }),
} as const;

console.info(tags, container, Tag.tagsSet);
