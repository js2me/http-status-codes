import { withViewModel } from 'mobx-vm-entities';

import { LayoutVM } from './model';
import { LayoutView } from './view';

export const Layout = withViewModel(LayoutVM, {
  id: 'layout',
})(LayoutView);
