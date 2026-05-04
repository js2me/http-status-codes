import { makeObservable } from 'mobx';
import {
  AnyViewModel,
  ViewModelCreateConfig,
  ViewModelStoreBase,
} from 'mobx-view-model';

class AppViewModelsStore extends ViewModelStoreBase {
  createViewModel<VM extends AnyViewModel>(
    config: ViewModelCreateConfig<VM>,
  ): VM {
    const vm = super.createViewModel(config);

    // чтобы завести декораторы (не аксесор)
    makeObservable(vm);

    return vm;
  }
}

export const appViewModels = new AppViewModelsStore();
