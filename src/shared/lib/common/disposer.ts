import { LinkedAbortController } from 'linked-abort-controller';

export class Disposer {
  private abortController = new LinkedAbortController();
  signal = this.abortController.signal;

  constructor(...signals: (AbortSignal | undefined)[]) {
    this.abortController.link(...signals);
  }

  dispose() {
    this.abortController.abort();
  }
}
