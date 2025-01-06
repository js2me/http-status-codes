export * from 'yummies/storage';

import { createStorage } from 'yummies/storage';

import { storageKeyPrefix } from '@/shared/config/storage';

export const storage = createStorage({
  type: 'local',
  prefix: storageKeyPrefix,
});
