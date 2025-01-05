import { withPageViewModel } from 'mobx-wouter';

import { HomePageVM } from './model';
import { HomePageView } from './ui';

export const HomePage = withPageViewModel(HomePageVM)(HomePageView);
