import { ViewModelStoreImpl } from 'mobx-vm-entities';
import { MobxRouter } from 'mobx-wouter';

import { ToastStore } from '@/shared/_entities/toast';

import { Disposer } from '../common/disposer';
import { ThemeStoreImpl } from '../mobx/theme';

import { tag } from './tag';

export * from './container.js';
export * from './container.types.js';
export * from './tag.js';
export * from './tag.types.js';

export const tags = {
  disposer: tag({
    scope: 'container',
    value: () => {
      const value = new Disposer();
      console.info('create new disposer');
      return value;
    },
    destroy: (value) => {
      console.info('destroy disposer');
      value.dispose();
    },
  }),
  /**
   * Тема приложения
   */
  theme: tag({
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
  viewModels: tag({
    scope: 'singleton',
    value: () => new ViewModelStoreImpl(),
  }),
  /**
   * Роутер приложения
   */
  router: tag({
    scope: 'singleton',
    value: () =>
      new MobxRouter({
        type: 'hash',
        baseUrl: buildEnvs.BASE_URL || '/',
        useStartViewTransition: true,
      }),
  }),
} as const;
