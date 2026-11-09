import { ViewModelBase } from 'mobx-view-model';

import { appTheme } from '@/shared/lib/mobx/theme';
import { routes } from '@/shared/lib/routes';

export class LayoutVM extends ViewModelBase {
  private themeStore = appTheme;

  get theme() {
    return this.themeStore.theme;
  }

  switchTheme = this.themeStore.switchTheme;

  get headerAppendText() {
    return routes.code.isOpened ? (routes.code.params?.code ?? '') : '';
  }
}
