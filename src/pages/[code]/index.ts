import { withPageViewModel } from 'mobx-wouter';

import { CodePageVM } from './model';
import { CodePageView } from './ui';

export const CodePage = withPageViewModel(CodePageVM)(CodePageView);
