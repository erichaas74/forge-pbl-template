import type { EventResult, RuntimeScope } from '../state/runtime-state-contracts';
import { runtimeScopeKey } from '../state/runtime-scope';

export interface IdempotencyStore<TSnapshot = unknown> {
  get(scope: RuntimeScope, key: string): EventResult<TSnapshot> | undefined;
  record(scope: RuntimeScope, key: string, result: EventResult<TSnapshot>): void;
  clear(scope?: RuntimeScope): void;
}

export class InMemoryIdempotencyStore<TSnapshot = unknown>
  implements IdempotencyStore<TSnapshot>
{
  private readonly results = new Map<string, EventResult<TSnapshot>>();
  private readonly order: string[] = [];

  constructor(private readonly maximumEntries = 1_000) {}

  get(scope: RuntimeScope, key: string): EventResult<TSnapshot> | undefined {
    const result = this.results.get(this.key(scope, key));
    return result === undefined ? undefined : structuredClone(result);
  }

  record(scope: RuntimeScope, key: string, result: EventResult<TSnapshot>): void {
    const storageKey = this.key(scope, key);
    if (!this.results.has(storageKey)) {
      this.order.push(storageKey);
    }
    this.results.set(storageKey, structuredClone(result));

    while (this.order.length > this.maximumEntries) {
      const oldest = this.order.shift();
      if (oldest !== undefined) {
        this.results.delete(oldest);
      }
    }
  }

  clear(scope?: RuntimeScope): void {
    if (scope === undefined) {
      this.results.clear();
      this.order.length = 0;
      return;
    }

    const prefix = `${runtimeScopeKey(scope)}::`;
    for (const key of [...this.results.keys()]) {
      if (key.startsWith(prefix)) {
        this.results.delete(key);
      }
    }
    for (let index = this.order.length - 1; index >= 0; index -= 1) {
      if (this.order[index]?.startsWith(prefix)) {
        this.order.splice(index, 1);
      }
    }
  }

  private key(scope: RuntimeScope, key: string): string {
    return `${runtimeScopeKey(scope)}::${key}`;
  }
}

