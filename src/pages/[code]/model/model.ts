import { reaction, runInAction } from 'mobx';
import { PageViewModelImpl } from 'mobx-wouter';

import { StatusCodesModel } from '@/entities/status-codes/model';
import { Layout } from '@/pages/_layout';

export class CodePageVM extends PageViewModelImpl<{ code: string }> {
  private statusCodes = new StatusCodesModel();

  get data() {
    return this.statusCodes.fullData;
  }

  private get layout() {
    return this.viewModels.get(Layout);
  }

  mount(): void {
    super.mount();

    this.statusCodes.loadFullData(+this.pathParams.code);

    reaction(
      () => this.layout,
      (layout) => {
        if (layout) {
          runInAction(() => {
            layout.headerAppendText = `${this.pathParams.code}`
          })
        }
      },
      {
        fireImmediately: true,
        signal: this.unmountSignal,
      },
    );
  }

  unmount(): void {
    super.unmount();

    if (this.layout) {
      runInAction(() => {
        this.layout!.headerAppendText = '';
      }) 
    }
  }
}
