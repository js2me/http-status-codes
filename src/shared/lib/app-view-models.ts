import { makeObservable } from 'mobx';
import {
  AnyViewModel,
  AnyViewModelSimple,
  ViewModelCreateConfig,
  ViewModelStoreBase,
} from 'mobx-view-model';

class AppViewModelsStore extends ViewModelStoreBase {
  create<VM extends AnyViewModel | AnyViewModelSimple>(
    config: ViewModelCreateConfig<VM>,
  ): VM {
    const vm = super.create(config);

    // чтобы завести декораторы (не аксесор)
    makeObservable(vm);

    return vm;
  }
}

export const appViewModels = new AppViewModelsStore();
