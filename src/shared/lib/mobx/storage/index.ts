import {
  StorageModel as StorageModelBase,
  StorageType,
} from 'mobx-shared-entities/storage';

import { storageKeyPrefix } from '@/shared/config/storage';

export class StorageModel extends StorageModelBase {
  constructor(abortSignal?: AbortSignal, type?: StorageType) {
    super({
      prefix: storageKeyPrefix,
      type: type ?? 'local',
      abortSignal,
    });
  }
}
