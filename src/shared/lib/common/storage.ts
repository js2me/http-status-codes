export * from 'yammies/storage';

import { createStorage } from 'yammies/storage';

import { storageKeyPrefix } from '@/shared/config/storage';

export const storage = createStorage({
  type: 'local',
  prefix: storageKeyPrefix,
});
