import { action, observable } from 'mobx';
import { PageViewModelBase } from 'mobx-wouter';

import { StatusCodesModel } from '@/entities/status-codes/model';
import { container, tag, tags } from '@/shared/lib/di';

export class HomePageVM extends PageViewModelBase {
  private statusCodesData = container.inject(StatusCodesModel);

  router = container.inject(tags.router);

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
}

tag({ token: HomePageVM, scope: 'container' });
