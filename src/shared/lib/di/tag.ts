import { tagMark } from './constants.js';
import { Container } from './container.js';
import { TagConfig, TagScope, TagStrategy } from './tag.types.js';
import { Destroyable } from './types.js';

declare const process: { env: { NODE_ENV?: string } };

export class Tag<TTarget, TArgs extends any[] = any[]>
  implements Destroyable, Disposable
{
  strategy: TagStrategy;
  config: TagConfig<TTarget, TArgs>;
  references: Set<TTarget>;
  token: Exclude<TagConfig<TTarget, TArgs>['token'], undefined>;
  scope: TagScope;
  containersInUse: WeakSet<Container>;

  protected constructor(config: TagConfig<TTarget, TArgs>) {
    this.config = config;
    this.scope = this.defineScope();
    this.token = this.defineToken();
    this.references = new Set<TTarget>();
    this.containersInUse = new WeakSet();
    this.strategy = this.defineStrategy();

    this.processConfig();
  }

  createValue(args: TArgs): TTarget {
    let value: TTarget;

    if (this.strategy === 'class-constructor') {
      value = new this.config.classConstructor!(...args);
    } else if (this.config.value) {
      return this.config.value(...args);
    } else {
      throw new Error('value definition is not provided for tag');
    }

    this.references.add(value);

    return value;
  }

  destroyValue(value: TTarget) {
    this.references.delete(value);
    this.config.destroy?.(value);
  }

  override(update: Partial<TagConfig<TTarget, TArgs>>) {
    Object.assign(this.config, update);

    this.scope = this.defineScope();
    this.token = this.defineToken();
    this.strategy = this.defineStrategy();

    this.processConfig();
  }

  destroy() {
    this.references.forEach((reference) => {
      this.destroyValue(reference);
    });
    this.references.clear();
  }

  [Symbol.dispose](): void {
    this.destroy();
  }

  private defineScope() {
    return this.config.scope ?? 'transient';
  }

  private defineToken() {
    return this.config.token ?? Symbol();
  }

  private defineStrategy(): TagStrategy {
    if (this.config.strategy) {
      return this.config.strategy;
    } else if (
      typeof this.config.token === 'function' ||
      this.config.classConstructor
    ) {
      return 'class-constructor';
    } else {
      return 'token';
    }
  }

  private processConfig() {
    if (
      this.config.classConstructor &&
      tagMark in this.config.classConstructor
    ) {
      delete this.config.classConstructor[tagMark];
    }

    if (this.strategy === 'class-constructor') {
      if (typeof this.config.token === 'function') {
        this.config.classConstructor = this.config.token;
      }

      Object.defineProperty(this.config.classConstructor!, tagMark, {
        value: this,
        configurable: false,
        writable: false,
        enumerable: false,
      });
    }
  }

  static search<TClass extends Class<any>>(
    Class: TClass,
  ): Tag<TClass extends Class<infer Value> ? Value : never> | null;
  static search<TTarget = any>(tag: Tag<TTarget>): Tag<TTarget> | null;

  static search(value: any) {
    if (value instanceof Tag) {
      return value;
    }

    if (
      typeof value === 'function' &&
      tagMark in value &&
      value[tagMark] instanceof Tag
    ) {
      return value[tagMark];
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error('tag not found for', value);
    }

    return null;
  }

  static create<TTarget, TArgs extends any[] = any[]>(
    config: TagConfig<TTarget, TArgs>,
  ) {
    return new Tag<TTarget, TArgs>(config);
  }
}

export const tag = Tag.create;
