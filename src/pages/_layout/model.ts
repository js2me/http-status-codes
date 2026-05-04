import { makeObservable, observable } from 'mobx';
import { ViewModelBase } from 'mobx-view-model';

import { appTheme } from '@/shared/lib/mobx/theme';

export class LayoutVM extends ViewModelBase {
  private themeStore = appTheme;

  get theme() {
    return this.themeStore.theme;
  }

  switchTheme = this.themeStore.switchTheme;

  @observable
  headerAppendText = '';

  willMount(): void {
    makeObservable(this);
  }
}
