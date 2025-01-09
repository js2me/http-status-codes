import { action, observable } from 'mobx';
import { PageViewModelImpl } from 'mobx-wouter';

import { StatusCodesModel } from '@/entities/status-codes/model';
import { CodePage } from '@/pages/[code]';

export class HomePageVM extends PageViewModelImpl {
  private statusCodes = new StatusCodesModel();

  @observable
  accessor search: string = '';

  @action.bound
  setSearch(search: string) {
    this.search = search;
  }

  get filteredStatusCodes() {
    return this.statusCodes.shortList?.filter(
      (it) =>
        it.code.toString().includes(this.search) ||
        it.title.toLowerCase().includes(this.search.toLowerCase()),
    );
  }

  mount(): void {
    super.mount();
    CodePage.preload();
  }
}
