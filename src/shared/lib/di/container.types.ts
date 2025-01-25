import { Class } from 'yummies/utils/types';

import { Container } from './container.js';

export interface ContainerConfig<TContainerInstance = any> {
  abortSignal?: AbortSignal;
  parent?: Container;
  containerConstructor?: Class<TContainerInstance>;
  id?: string;
  generateId?: () => string;
}

export interface DebugConfig extends Pick<ContainerConfig, 'id'> {}

export interface InjectRegisterConfig {
  scope?: 'singleton' | 'transient' | 'container';
  __?: DebugConfig;
}
