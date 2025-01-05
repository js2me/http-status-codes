import { CreateToastPayload } from './model.types';

export class ToastStore {
  create({ message, type, ...config }: CreateToastPayload) {
    console.info('fff', message, type, config);
  }
}
