import { createBrowserHistory } from 'mobx-location-history';
import { Router } from 'mobx-wouter/router';

/** Keep hash navigation observable to both MobX and Wouter. */
export class HashRouter extends Router {
  constructor(baseUrl: string) {
    super({ history: createBrowserHistory(), baseUrl });
  }

  navigate(...[to, options]: Parameters<Router['navigate']>): void {
    const path = this.createPath(to);
    const url = `${globalThis.location.pathname}${globalThis.location.search}#${path.pathname}${path.search}${path.hash ? `#${path.hash}` : ''}`;

    if (options?.replace) {
      this.history.replace(url, options.state);
    } else {
      this.history.push(url, options?.state);
    }

    // History API updates do not emit the event used by useHashLocation.
    globalThis.dispatchEvent(new HashChangeEvent('hashchange'));
  }
}
