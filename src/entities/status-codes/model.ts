import { runInAction, when } from 'mobx';
import { createQuery } from 'mobx-tanstack-query/preset';

export interface StatusCodeShortData {
  code: number;
  title: string;
  image?: string;
}

export interface StatusCodeFullData {
  code: number;
  title: string;
  description: string;
  links: string[];
  images: string[];
}

export class StatusCodesModel {
  private shortListDataQuery = createQuery(
    async () => {
      const module: { default: StatusCodeShortData[] } = await import(
        `./data/__generated__/short-list.json`
      );
      return module.default;
    },
    {
      enableOnDemand: true,
      queryKey: () => ['status-codes'] as const,
    },
  );

  private fullDataQuery = createQuery(
    async ({ queryKey: [, code] }) => {
      const module: { default: StatusCodeFullData } = await import(
        `./data/__generated__/${code}.json`
      );
      return module.default;
    },
    {
      enableOnDemand: true,
      queryKey: () => ['status-codes', null as Maybe<number>] as const,
      enabled: ({ queryKey }) => typeof queryKey[1] === 'number',
    },
  );

  get fullData() {
    return this.fullDataQuery.result.data;
  }

  get isFullDataLoading() {
    return this.fullDataQuery.result.isLoading;
  }

  get shortList() {
    return this.shortListDataQuery.result.data;
  }

  get isShortListLoading() {
    return this.shortListDataQuery.result.isLoading;
  }

  async loadFullData(code: number) {
    this.fullDataQuery.update({ queryKey: ['status-codes', code] });
    await when(() => !this.isFullDataLoading);
    return this.fullData;
  }

  async loadShortList() {
    runInAction(() => {
      this.shortListDataQuery.isResultRequsted = true;
    });
    await when(() => !this.isShortListLoading);
    return this.shortList;
  }
}
