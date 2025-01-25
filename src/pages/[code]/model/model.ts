import { reaction, runInAction } from 'mobx';
import { PageViewModelImpl } from 'mobx-wouter';

import { StatusCodesModel } from '@/entities/status-codes/model';
import { Layout } from '@/pages/_layout';
import { container } from '@/shared/lib/di';
import { findTag, tag } from '@/shared/lib/di/tag';

export class CodePageVM extends PageViewModelImpl<{ code: string }> {
  private statusCodes = container.inject(findTag(StatusCodesModel));

  get isLoading() {
    return (
      this.statusCodes.isFullDataLoading ||
      this.statusCodes.fullData?.code !== +this.pathParams.code
    );
  }

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