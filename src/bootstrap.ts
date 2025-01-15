import '@/app/styles/globals.css';

import { viewModelsConfig } from 'mobx-vm-entities';

viewModelsConfig.startViewTransitions = {
  mount: true,
  payloadChange: true,
  unmount: true,
};
