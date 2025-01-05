import { ViewModelImpl } from 'mobx-vm-entities';

import { rootStore } from '@/store';

export class LayoutVM extends ViewModelImpl {
  get theme() {
    return rootStore.theme.theme;
  }
  switchTheme = rootStore.theme.switchTheme;
}
