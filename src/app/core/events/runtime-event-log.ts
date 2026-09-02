import type { RuntimeScope } from '../state/runtime-state-contracts';
import { runtimeScopeKey } from '../state/runtime-scope';
import type { RuntimeEvent } from './runtime-event';

export class RuntimeEventLog {
  private readonly events = new Map<string, RuntimeEvent[]>();

  constructor(private readonly maximumEventsPerScope = 250) {}

  append(scope: RuntimeScope, event: RuntimeEvent): void {
    const key = runtimeScopeKey(scope);
    const entries = this.events.get(key) ?? [];
    entries.push(structuredClone(event));
    if (entries.length > this.maximumEventsPerScope) {
      entries.shift();
    }
    this.events.set(key, entries);
  }

  list(scope: RuntimeScope): readonly RuntimeEvent[] {
    return structuredClone(this.events.get(runtimeScopeKey(scope)) ?? []);
  }
}

