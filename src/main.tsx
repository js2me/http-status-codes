/* eslint-disable import/order */
import '@/app/styles/globals.css';

import { createRoot } from 'react-dom/client';
import { rootElement } from '@/shared/config/dom';

import { App } from '@/app';
import { rootStore } from './store';
import { RootStoreProvider } from './shared/lib/mobx/root-store';

createRoot(rootElement).render(
  <RootStoreProvider value={rootStore}>
    <App />
  </RootStoreProvider>,
);
