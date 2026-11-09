import { reaction, runInAction, when } from 'mobx';
import { PageViewModelBase } from 'mobx-wouter/page-view-model';

import { statusCodesModel } from '@/entities/status-codes/model';
import { LayoutVM } from '@/pages/_layout/model';

export class CodePageVM extends PageViewModelBase<{ code: string }> {
  private statusCodes = statusCodesModel;

  get data() {
    return this.statusCodes.fullData;
  }

  get isError() {
    return this.statusCodes.isError;
  }

  private get layout() {
    return this.viewModels.get(LayoutVM);
  }

  async mount() {
    await this.statusCodes.loadFullData(+this.pathParams.code);

    await when(() => !!this.data || this.isError, {
      signal: this.unmountSignal,
    });

    super.mount();

    reaction(
      () => this.layout,
      (layout) => {
        if (layout) {
          runInAction(() => {
            layout.headerAppendText = this.pathParams.code;
          });
        }
      },
      {
        fireImmediately: true,
        signal: this.unmountSignal,
      },
    );
  }

  didUnmount(): void {
    if (this.layout?.headerAppendText === this.pathParams.code) {
      runInAction(() => {
        this.layout!.headerAppendText = '';
      });
    }
  }
}
