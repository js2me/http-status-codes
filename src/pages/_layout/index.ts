import { withViewModel } from 'mobx-view-model';

import { LayoutVM } from './model';
import { LayoutView } from './view';

export const Layout = withViewModel(LayoutVM, {
  id: 'layout',
})(LayoutView);
