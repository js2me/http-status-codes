import { runInAction, when } from 'mobx';
import { createQuery } from 'mobx-tanstack-query/preset';

import { rootStore } from '@/store';

export interface StatusCodeShortData {
  code: number;
  title: string;
  image?: string;
}

const classificationRanges = {
  informational: [100, 199],
  successful: [200, 299],
  redirection: [300, 399],
  clientError: [400, 499],
  serverError: [500, 599],
} as const;

export type StatusCodeClassification = keyof typeof classificationRanges;

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
      const response = await fetch(
        rootStore.router.createUrl({
          baseUrl: buildEnvs.DEV
            ? rootStore.router.baseUrl!
            : 'https://raw.githubusercontent.com/js2me/http-status-codes/refs/heads/master/public',
          hash: '',
          pathname: `/data/short-list.json`,
        }),
      );
      const data: StatusCodeShortData[] = await response.json();
      return data;
    },
    {
      enableOnDemand: true,
      queryKey: () => ['status-codes'] as const,
    },
  );

  classificationRanges = classificationRanges;

  getClassification(code: number): keyof typeof this.classificationRanges {
    const { clientError, informational, redirection, successful } =
      this.classificationRanges;

    if (informational[0] <= code && code <= informational[1]) {
      return 'informational';
    }

    if (successful[0] <= code && code <= successful[1]) {
      return 'successful';
    }

    if (redirection[0] <= code && code <= redirection[1]) {
      return 'redirection';
    }

    if (clientError[0] <= code && code <= clientError[1]) {
      return 'clientError';
    }

    return 'serverError';
  }

  private fullDataQuery = createQuery(
    async ({ queryKey: [, code] }) => {
      const response = await fetch(
        rootStore.router.createUrl({
          baseUrl: buildEnvs.DEV
            ? rootStore.router.baseUrl!
            : 'https://raw.githubusercontent.com/js2me/http-status-codes/refs/heads/master/public',
          hash: '',
          pathname: `/data/${code}.json`,
        }),
      );
      const data: StatusCodeFullData = await response.json();
      return {
        ...data,
        classification: this.getClassification(data.code),
      };
    },
    {
      enableOnDemand: true,
      queryKey: () =>
        [
          ...this.shortListDataQuery.options.queryKey,
          null as Maybe<number>,
        ] as const,
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
