import { withViewModel } from 'mobx-view-model-react';

import { NotFoundPageVM } from './model';

export const NotFoundPage = withViewModel(NotFoundPageVM, () => null);
