import { observable } from 'mobx';
import { ViewModelImpl } from 'mobx-vm-entities';

import { container, tag, tags } from '@/shared/lib/di';

export class LayoutVM extends ViewModelImpl {
  private themeStore = container.inject(tags.theme);

  get theme() {
    return this.themeStore.theme;
  }

  switchTheme = this.themeStore.switchTheme;

  @observable
  accessor headerAppendText = '';
}

tag({ token: LayoutVM, scope: 'container' });
