/* eslint-disable import/order */
import './bootstrap';

import { createRoot } from 'react-dom/client';
import { rootElement } from '@/shared/config/dom';

import { App } from '@/app';

createRoot(rootElement).render(<App />);
