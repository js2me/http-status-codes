import { useContext } from 'react';

import { RootStoreContext } from '../root-store.context';

export const useRootStore = <T extends RootStore>() => {
  const rootStore = useContext(RootStoreContext);

  if (!rootStore) {
    throw new Error('root store is not exist');
  }

  return rootStore as T;
};
