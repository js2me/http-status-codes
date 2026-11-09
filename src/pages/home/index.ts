import { withViewModel } from 'mobx-view-model-react';

import { HomePageVM } from './model';
import { HomePageView } from './ui';

export const HomePage = withViewModel(HomePageVM, HomePageView);
