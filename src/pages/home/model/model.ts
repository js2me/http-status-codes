import { action, observable } from 'mobx';
import { PageViewModelImpl } from 'mobx-wouter';

import { StatusCodesModel } from '@/entities/status-codes/model';
import { CodePage } from '@/pages/[code]';

export class HomePageVM extends PageViewModelImpl {
  private statusCodesData = new StatusCodesModel();

  @observable
  accessor search: string = '';

  @action.bound
  setSearch(search: string) {
    this.search = search;
  }

  get statusCodes() {
    const statusCodes = this.statusCodesData.shortList || [];
    const searchText = this.search.toLowerCase();

    if (!searchText) {
      return statusCodes;
    }

    return statusCodes.filter((it) => {
      return (
        it.code.toString().includes(searchText) ||
        it.title.toLowerCase().includes(searchText) ||
        this.statusCodesData.getClassification(it.code).includes(searchText)
      );
    });
  }

  get statusCodeGroups() {
    const groups = Object.groupBy(this.statusCodes || [], (item) =>
      this.statusCodesData.getClassification(item.code),
    );

    return Object.entries(groups) as RecordEntries<typeof groups>;
  }

  mount(): void {
    super.mount();
    CodePage.preload();
  }
}
