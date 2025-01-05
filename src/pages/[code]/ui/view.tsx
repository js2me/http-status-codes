import { observer } from 'mobx-react-lite';
import { ViewModelProps } from 'mobx-vm-entities';

import { Layout } from '@/pages/_layout';

import { CodePageVM } from '../model';

export const CodePageView = observer(
  ({ model }: ViewModelProps<CodePageVM>) => {
    return (
      <Layout>
        <div className={'flex flex-col gap-3'}>
          <h1 className={'prose text-8xl font-mono font-semibold leading-none'}>
            {model.data?.code}
          </h1>
          <h2 className={'prose text-2xl'}>{model.data?.title}</h2>
          <p className={'prose text-lg'}>{model.data?.description}</p>
          <div className={'flex flex-row flex-wrap gap-4 pt-4'}>
            {model.data?.images.length ? (
              model.data?.images.map((it) => {
                return (
                  <img
                    key={it}
                    alt={''}
                    src={it}
                    className={'size-[256px] rounded-lg'}
                  />
                );
              })
            ) : (
              <span className={'prose text-sm opacity-80'}>
                Нет изображений
              </span>
            )}
          </div>
        </div>
      </Layout>
    );
  },
);
