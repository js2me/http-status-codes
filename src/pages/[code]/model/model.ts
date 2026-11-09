import { reaction } from 'mobx';
import { RouteViewModel } from 'mobx-route/view-model';

import { statusCodesModel } from '@/entities/status-codes/model';
import { routes } from '@/shared/lib/routes';

export class CodePageVM extends RouteViewModel<typeof routes.code> {
  readonly route = routes.code;

  private statusCodes = statusCodesModel;

  get data() {
    return this.statusCodes.fullData;
  }

  get isError() {
    return this.statusCodes.isError;
  }

  mount(): void {
    super.mount();

    reaction(
      () => this.route.params?.code,
      (code) => {
        if (code) {
          this.statusCodes.loadFullData(+code);
        }
      },
      {
        fireImmediately: true,
        signal: this.unmountSignal,
      },
    );
  }
}
