import { reaction, runInAction, when } from 'mobx';
import { PageViewModelImpl } from 'mobx-wouter';

import { StatusCodesModel } from '@/entities/status-codes/model';
import { Layout } from '@/pages/_layout';
import { container, tag } from '@/shared/lib/di';

export class CodePageVM extends PageViewModelImpl<{ code: string }> {
  private statusCodes = container.inject(StatusCodesModel);

  get data() {
    return this.statusCodes.fullData;
  }

  get isError() {
    return this.statusCodes.isError;
  }

  private get layout() {
    return this.viewModels.get(Layout);
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
    if (this.layout) {
      runInAction(() => {
        this.layout!.headerAppendText = '';
      });
    }
  }
}

tag({ token: CodePageVM, scope: 'container' });
