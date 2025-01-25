import { Class } from 'yummies/utils/types';

import { Tag } from './tag.js';

export type TagStrategy = 'class-constructor' | 'token';

export type TagScope = 'singleton' | 'transient' | 'container';

export interface TagConfig<TTarget, TArgs extends any[] = any[]> {
  scope?: TagScope;
  token?: string | symbol | Class<TTarget, TArgs>;
  meta?: any;
  classConstructor?: Class<TTarget, TArgs>;
  strategy?: TagStrategy;
  value?: (...args: TArgs) => TTarget;
  destroy?: (value: TTarget) => void;
}

export type InferTagParams<T> =
  T extends Tag<any, infer TParams> ? TParams : never;

export type InferTagTarget<T> =
  T extends Tag<infer TTarget, any> ? TTarget : never;

export type AnyTag = Tag<any, any>;
