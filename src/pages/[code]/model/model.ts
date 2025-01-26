import { reaction, runInAction } from 'mobx';
import { PageViewModelImpl } from 'mobx-wouter';

import { StatusCodesModel } from '@/entities/status-codes/model';
import { Layout } from '@/pages/_layout';
import { container } from '@/shared/lib/di';
import { tag } from '@/shared/lib/di/tag';

export class CodePageVM extends PageViewModelImpl<{ code: string }> {
  private statusCodes = container.inject(StatusCodesModel);

  get data() {
    return this.statusCodes.fullData;
  }

  private get layout() {
    return this.viewModels.get(Layout);
  }

  async mount() {
    await this.statusCodes.loadFullData(+this.pathParams.code);

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
    if (this.layout) {
      runInAction(() => {
        this.layout!.headerAppendText = '';
      });
    }
  }
}

tag({ token: CodePageVM, scope: 'container' });
