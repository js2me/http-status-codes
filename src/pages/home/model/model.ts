import { action, observable } from 'mobx';
import { RouteViewModel } from 'mobx-route/view-model';

import { statusCodesModel } from '@/entities/status-codes/model';
import { routes } from '@/shared/lib/routes';

export class HomePageVM extends RouteViewModel<typeof routes.home> {
  readonly route = routes.home;

  private statusCodesData = statusCodesModel;

  @observable
  search: string = '';

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
