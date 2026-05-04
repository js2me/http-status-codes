import { CreateToastPayload } from './model.types';

export class ToastStore {
  create({ message, type, ...config }: CreateToastPayload) {
    console.info('toast message todo', message, type, config);
  }
}

export const appToasts = new ToastStore();
