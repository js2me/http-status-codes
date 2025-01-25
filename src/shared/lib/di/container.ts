/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable unicorn/no-this-assignment */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { containerMark } from './constants.js';
import { Tag } from './tag.js';
import { AnyTag } from './tag.types.js';
import { Destroyable } from './types.js';

export class Container implements Destroyable, Disposable {
  injections = new Map<AnyTag, any>();
  inheritInjections = new WeakMap<AnyTag, any>();
  parent?: Container;
  children = new Set<Container>();

  static readonly transitPath: Container[] = [];

  constructor(parent?: Container) {
    this.parent = parent;
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  inject<TTarget, TArgs extends any[] = any[]>(
    tag: Tag<TTarget, TArgs>,
    ...args: TArgs
  ): TTarget {
    let container: Container = this;

    const lastContainer = Container.transitPath.at(-1);

    let transitPathIndex: Maybe<number>;

    if (tag.scope === 'container') {
      const parentContainer = lastContainer ?? this;

      container = parentContainer.extend();

      transitPathIndex = Container.transitPath.push(container) - 1;
    }

    if (tag.scope === 'transient' && lastContainer) {
      container = lastContainer;
    }

    let injection: any;

    if (container.inheritInjections.has(tag)) {
      injection = container.inheritInjections.get(tag)!;
    } else if (container.injections.has(tag)) {
      injection = container.injections.get(tag)!;
    } else {
      if (tag.scope === 'container') {
        for (let i = Container.transitPath.length - 1; i >= 0; i--) {
          const container = Container.transitPath[i];
          if (container.injections.has(tag)) {
            injection = container.injections.get(tag)!;
            break;
          }

          for (const child of container.children) {
            if (child.injections.has(tag)) {
              injection = child.injections.get(tag)!;
              break;
            }
          }
        }
      }

      if (injection) {
        container.inheritInjections.set(tag, injection);
      } else {
        injection = tag.createValue(args);
        container.injections.set(tag, injection);
      }
    }

    if (!(containerMark in injection)) {
      Object.defineProperty(injection!, containerMark, {
        value: container,
        configurable: false,
        writable: false,
        enumerable: false,
      });
    }
    if (tag.scope === 'container' && typeof transitPathIndex === 'number') {
      Container.transitPath.splice(transitPathIndex, 1);
    }

    return injection;
  }

  get<TTarget, TArgs extends any[] = any[]>(tag: Tag<TTarget, TArgs>): TTarget {
    const value = this.injections.get(tag) ?? this.inheritInjections.get(tag);

    if (!value) {
      throw new Error('value not found');
    }

    return value;
  }

  extend() {
    const child = new Container(this);
    this.children.add(child);
    return child;
  }

  destroy() {
    const containersToDestroy: Container[] = [this];

    while (containersToDestroy.length > 0) {
      const container = containersToDestroy.shift()!;

      container.parent?.children.delete(container);

      containersToDestroy.push(...container.children.values());

      container.injections.forEach((value, tag) => {
        tag.destroyValue(value);
      });
      container.injections.clear();
    }
  }

  static find(value: any): Maybe<Container> {
    if (value[containerMark]) {
      return value[containerMark];
    }

    return null;
  }

  static destroy(value: any) {
    const container = Container.find(value);
    if (container) {
      container.destroy();
    }
  }

  [Symbol.dispose](): void {
    this.destroy();
  }
}

export const container = new Container();

export const findContainer = Container.find;
