/* eslint-disable import/order */
import '@/app/styles/globals.css';

import { viewModelsConfig } from 'mobx-vm-entities';
import { Container, container, findTag } from './shared/lib/di';

viewModelsConfig.startViewTransitions = {
  mount: true,
  payloadChange: true,
  unmount: true,
};

viewModelsConfig.factory = (params) => {
  console.info('create VM', params.VM.name);
  return container.inject(findTag(params.VM), params);
};
viewModelsConfig.onUnmount = (vm) => {
  console.info('onUnmount', vm.constructor.name);
  Container.destroy(vm);
};
