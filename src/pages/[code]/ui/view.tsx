import { observer } from 'mobx-react-lite';
import { ViewModelProps } from 'mobx-vm-entities';

import { Layout } from '@/pages/_layout';

import { CodePageVM } from '../model';

export const CodePageView = observer(
  ({ model }: ViewModelProps<CodePageVM>) => {
    return (
      <Layout loading={model.isLoading}>
        <div className={'flex flex-col gap-3'}>
          <h1
            className={
              'prose text-9xl font-mono font-semibold leading-none tracking-wider -mb-4'
            }
          >
            {model.data?.code}
          </h1>
          <h2 className={'prose text-5xl mb-2'}>{model.data?.title}</h2>
          <p className={'prose text-xl'}>{model.data?.description}</p>
          <section className={'flex flex-col'}>
            <p className={'prose text-lg opacity-80'}>Источники:</p>
            {model.data?.links.length ? (
              model.data.links.map((link) => (
                <a
                  referrerPolicy={'no-referrer'}
                  href={link}
                  key={link}
                  className={'link link-info'}
                >
                  {link}
                </a>
              ))
            ) : (
              <span className={'prose text-sm opacity-80'}>Нет источников</span>
            )}
          </section>
          <div className={'flex flex-row flex-wrap gap-4 pt-4'}>
            {model.data?.images.length
              ? model.data?.images.map((image) => {
                  return (
                    <img
                      key={image}
                      alt={''}
                      src={`${buildEnvs.BASE_URL || ''}${image}`}
                      className={'size-[256px] object-cover rounded-lg'}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </Layout>
    );
  },
);
