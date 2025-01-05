import { withPageViewModel } from 'mobx-wouter';

import { NotFoundPageVM } from './model';

export const NotFoundPage = withPageViewModel(NotFoundPageVM)();
