import { makeObservable, observable, runInAction, when } from 'mobx';
import { createQuery } from 'mobx-tanstack-query/preset';

const dataBaseUrl = (
  buildEnvs.DEV
    ? buildEnvs.BASE_URL || '/'
    : 'https://raw.githubusercontent.com/js2me/http-status-codes/refs/heads/master/public'
).replace(/\/$/, '');

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
  private readonly abortController = new AbortController();

  private get abortSignal() {
    return this.abortController.signal;
  }

  private shortListDataQuery = createQuery(
    async ({ signal }) => {
      const response = await fetch(`${dataBaseUrl}/data/short-list.json`, {
        signal,
      });
      const data: StatusCodeShortData[] = await response.json();
      return data;
    },
    {
      abortSignal: this.abortSignal,
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

  @observable
  private activeStatusCode?: number;

  private fullDataQuery;

  get fullData() {
    return this.fullDataQuery.result.data;
  }

  get isError() {
    return this.fullDataQuery.result.isError;
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
    this.activeStatusCode = code;
    await when(() => !this.isFullDataLoading, {
      signal: this.abortSignal,
    });
    return this.fullData;
  }

  async loadShortList() {
    runInAction(() => {
      this.shortListDataQuery.isResultRequsted = true;
    });
    await when(() => !this.isShortListLoading, {
      signal: this.abortSignal,
    });
    return this.shortList;
  }

  constructor() {
    makeObservable(this);

    this.fullDataQuery = createQuery(
      async ({ queryKey, signal }) => {
        const code = queryKey[1];
        const response = await fetch(`${dataBaseUrl}/data/${code}.json`, {
          signal,
        });
        const data: StatusCodeFullData = await response.json();
        return {
          ...data,
          classification: this.getClassification(data.code),
        };
      },
      {
        abortSignal: this.abortSignal,
        enableOnDemand: true,
        options: () => ({
          queryKey: ['status-codes', this.activeStatusCode],
          enabled: typeof this.activeStatusCode === 'number',
        }),
      },
    );
  }
}

export const statusCodesModel = new StatusCodesModel();
