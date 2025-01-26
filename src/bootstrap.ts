/* eslint-disable import/order */
import '@/app/styles/globals.css';

import { viewModelsConfig } from 'mobx-vm-entities';
import { container } from './shared/lib/di';

viewModelsConfig.startViewTransitions = {
  mount: true,
  payloadChange: true,
  unmount: true,
};

viewModelsConfig.factory = (params) => container.inject(params.VM, params);
viewModelsConfig.onUnmount = (vm) => container.destroy(vm);
