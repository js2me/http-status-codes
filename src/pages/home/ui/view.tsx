import { observer } from 'mobx-react-lite';
import { ViewModelProps } from 'mobx-view-model';

import { HomePageVM } from '../model';

import { StatusCodesGroup } from './status-codes-group';

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
        <div className={'flex flex-col gap-10 mt-4'}>
          {model.statusCodeGroups.map(([classification, codes]) => {
            return (
              <StatusCodesGroup
                key={classification}
                classification={classification}
                codes={codes}
              />
            );
          })}
        </div>
      </div>
    );
  },
);
