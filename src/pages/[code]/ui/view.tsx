import { observer } from 'mobx-react-lite';
import { ViewModelProps } from 'mobx-vm-entities';

import { Layout } from '@/pages/_layout';

import { CodePageVM } from '../model';

export const CodePageView = observer(
  ({ model }: ViewModelProps<CodePageVM>) => {
    return (
      <Layout>
        <div className={'flex flex-col gap-3'}>{model.data?.code}</div>
      </Layout>
    );
  },
);
