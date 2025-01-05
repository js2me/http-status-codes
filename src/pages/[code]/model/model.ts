import { reaction } from 'mobx';
import { PageViewModelImpl } from 'mobx-wouter';

import { StatusCodesModel } from '@/entities/status-codes/model';

export class CodePageVM extends PageViewModelImpl<{ code: string }> {
  private statusCodes = new StatusCodesModel();

  get data() {
    return this.statusCodes.fullData;
  }

  mount(): void {
    super.mount();

    reaction(
      () => this.pathParams.code,
      (code) => {
        this.statusCodes.loadFullData(+code);
      },
      {
        fireImmediately: true,
        signal: this.unmountSignal,
      },
    );
  }
}
