interface Window {
  opera?: string;
}

declare module 'timers' {
  global {
    /**
     * Schedules execution of a one-time `callback` after `delay` milliseconds. The `callback` will likely not be invoked in precisely `delay` milliseconds.
     * Node.js makes no guarantees about the exact timing of when callbacks will fire, nor of their ordering. The callback will be called as close as possible to the time specified.
     * When `delay` is larger than `2147483647` or less than `1`, the `delay` will be set to `1`. Non-integer delays are truncated to an integer.
     * If `callback` is not a function, a [TypeError](https://nodejs.org/api/errors.html#class-typeerror) will be thrown.
     * @since v0.0.1
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function setTimeout<TArgs extends any[]>(
      callback: (...args: TArgs) => void,
      ms?: number,
      ...args: TArgs
    ): number;
  }
}
