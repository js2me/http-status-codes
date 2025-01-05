import { reaction } from 'mobx';
import { TwoColorThemeStore } from 'mobx-shared-entities/theme';

import { htmlElement } from '@/shared/config/dom';

export class ThemeStoreImpl extends TwoColorThemeStore {
  constructor() {
    super({
      localStorageKey: 'theme',
    });

    reaction(
      () => this.colorScheme,
      (colorScheme) => {
        htmlElement.dataset.theme = colorScheme;
      },
      {
        fireImmediately: true,
        signal: this.abortSignal,
      },
    );
  }
}
