/* eslint-disable @typescript-eslint/no-explicit-any */
type ValueOf<T> = T[keyof T];

type ExtractEnumKeys<T> = ValueOf<{
  [key in keyof T]: key extends string ? key : never;
}>;

type Maybe<T> = Nullable<T> | undefined;

type AnyFunction = (...args: any) => any;

type Nullable<T> = T | null;

type AnyObject = Record<string, any>;

type AnyPrimitive = string | number | boolean | null;

type NoInfer<T> = [T][T extends any ? 0 : never];

type FalsyValues = undefined | null | '' | false | 0;

type MaybeFalsy<T> = Maybe<T> | FalsyValues;

type RecordEntries<T extends AnyObject> =
  T extends Record<infer Keys, infer Values> ? [Keys, Values][] : never;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type RequiredKeys<T, Keys extends keyof T = keyof T> = Omit<T, Keys> & {
  [KK in keyof Pick<Required<T>, Keys>]: Exclude<
    Pick<Required<T>, Keys>[KK],
    undefined
  >;
};
