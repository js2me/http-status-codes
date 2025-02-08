import { observable } from 'mobx';
import { ViewModelBase } from 'mobx-view-model';

import { container, tag, tags } from '@/shared/lib/di';

export class LayoutVM extends ViewModelBase {
  private themeStore = container.inject(tags.theme);

  get theme() {
    return this.themeStore.theme;
  }

  switchTheme = this.themeStore.switchTheme;

  @observable
  accessor headerAppendText = '';
}

tag({ token: LayoutVM, scope: 'container' });
