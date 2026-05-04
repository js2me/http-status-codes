/* eslint-disable import/order */
import '@/app/styles/globals.css';

import { viewModelsConfig } from 'mobx-view-model';

viewModelsConfig.startViewTransitions = {
  mount: true,
  payloadChange: true,
  unmount: true,
};
