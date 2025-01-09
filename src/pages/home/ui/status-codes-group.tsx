import { observer } from 'mobx-react-lite';
import { cx } from 'yummies/css';

import {
  StatusCodeClassification,
  StatusCodeShortData,
} from '@/entities/status-codes/model';

import { StatusCodeCard } from './status-code-card';

const uiConfigByClassification: Record<
  StatusCodeClassification,
  { label: string; className: string; link: string }
> = {
  informational: {
    label: 'Informational',
    className: 'border-info/50 text-info',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#informational_responses',
  },
  successful: {
    label: 'Successful',
    className: 'border-success/50 text-success',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses',
  },
  redirection: {
    label: 'Redirection',
    className: 'border-warning/50 text-warning',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages',
  },
  clientError: {
    label: 'Client error',
    className: 'border-error/80 text-error',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses',
  },
  serverError: {
    label: 'Server error',
    className: 'border-error/50 text-error',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses',
  },
};

export const StatusCodesGroup = observer(
  ({
    classification,
    className,
    codes,
  }: {
    classification: StatusCodeClassification;
    className?: string;
    codes: StatusCodeShortData[];
  }) => {
    const uiConfig = uiConfigByClassification[classification];

    return (
      <div
        className={cx(
          'flex flex-row relative flex-wrap pb-3 pt-5 gap-3 mr-auto px-3 border rounded-lg',
          uiConfig.className,
          className,
        )}
      >
        <span
          className={
            'absolute bg-base-100 -top-3 left-3 px-1 font-semibold flex flex-row gap-1 items-start'
          }
        >
          {uiConfig.label}
          <a
            href={uiConfig.link}
            referrerPolicy={'no-referrer'}
            className={
              'link link-neutral opacity-50 hover:opacity-100 hover:link-info'
            }
          >
            <svg
              xmlns={'http://www.w3.org/2000/svg'}
              fill={'none'}
              viewBox={'0 0 24 24'}
              strokeWidth={2}
              stroke={'currentColor'}
              className={'size-4'}
            >
              <path
                strokeLinecap={'round'}
                strokeLinejoin={'round'}
                d={
                  'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'
                }
              />
            </svg>
          </a>
        </span>
        {codes.map((it) => {
          return <StatusCodeCard key={it.code} data={it} />;
        })}
      </div>
    );
  },
);
