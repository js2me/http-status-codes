import { withViewModel } from 'mobx-view-model-react';

import { LayoutVM } from './model';
import { LayoutView } from './view';

export const Layout = withViewModel(LayoutVM, LayoutView, {
  id: 'layout',
});
