import { observer } from 'mobx-react-lite';
import { ViewModelProps } from 'mobx-vm-entities';

import { HomePageVM } from '../model';

import { StatusCodeCard } from './status-code-card';

export const HomePageView = observer(
  ({ model }: ViewModelProps<HomePageVM>) => {
    return (
      <div className={'flex flex-col gap-3'}>
        <div className={'flex flex-row gap-2 mr-auto'}>
          <input
            type={'text'}
            placeholder={'Search status code...'}
            value={model.search}
            onChange={(e) => {
              model.setSearch(e.target.value);
            }}
            autoFocus
            className={'input input-bordered w-full max-w-xs'}
          />
        </div>
        <div className={'flex flex-row flex-wrap py-3 gap-3 mx-auto'}>
          {model.filteredStatusCodes?.map((it) => {
            return <StatusCodeCard key={it.code} data={it} />;
          })}
        </div>
      </div>
    );
  },
);
