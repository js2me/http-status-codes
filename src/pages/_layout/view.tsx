import { observer } from 'mobx-react-lite';
import { ViewModelProps } from 'mobx-vm-entities';
import { ReactNode } from 'react';
import { Link } from 'wouter';
import { cx } from 'yummies/css';

import { useRootStore } from '@/shared/lib/mobx/root-store';

import catImage from './assets/cat-kinkytwt.gif';
import { LayoutVM } from './model';

interface LayoutViewProps extends ViewModelProps<LayoutVM> {
  className?: string;
  children?: ReactNode;
}

export const LayoutView = observer(({ children, model }: LayoutViewProps) => {
  const { router } = useRootStore();

  return (
    <div
      className={cx(
        'mx-auto min-h-full flex gap-5 flex-col max-w-[1280px] p-4',
      )}
    >
      <div className={'flex flex-row'}>
        <Link
          className={'flex flex-row'}
          href={'/'}
          onClick={(e) => {
            e.preventDefault();
            router.navigate('/');
          }}
        >
          <img
            src={catImage}
            alt={'cat'}
            className={'size-7 mr-2 rounded-md'}
          />
          <h1 className={'prose font-mono text-base-content font-semibold'}>
            http status codes
            {model.headerAppendText && (
              <>
                <span className={'ml-2 opacity-20'}>/</span>
                <span className={'ml-2 opacity-60 cursor-default'}>
                  {model.headerAppendText}
                </span>
              </>
            )}
          </h1>
        </Link>
        <div className={'ml-auto flex flex-row gap-2'}>
          <a href={'https://github.com/js2me/http-status-codes'}>
            <button className={'btn btn-xs link link-info'}>github</button>
          </a>
          <button className={'btn btn-xs'} onClick={model.switchTheme}>
            {model.theme === 'light' && 'Theme: Light'}
            {model.theme === 'dark' && 'Theme: Dark'}
            {model.theme === 'auto' && 'Theme: System'}
          </button>
        </div>
      </div>
      <div className={'flex flex-col flex-1 relative rounded-sm'}>
        {children}
      </div>
    </div>
  );
});
