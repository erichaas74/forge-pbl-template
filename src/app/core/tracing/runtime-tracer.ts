import type { RuntimeError } from '../errors/runtime-error';

export interface RuntimeTraceEntry {
  timestamp: string;
  eventId?: string;
  eventType?: string;
  matchedRuleIds?: readonly string[];
  commandTypes?: readonly string[];
  stateVersion?: number;
  errors?: readonly RuntimeError[];
}

export interface RuntimeTracer {
  trace(entry: RuntimeTraceEntry): void;
}

export class NoopRuntimeTracer implements RuntimeTracer {
  trace(_entry: RuntimeTraceEntry): void {}
}

export class MemoryRuntimeTracer implements RuntimeTracer {
  private readonly entries: RuntimeTraceEntry[] = [];

  constructor(private readonly maximumEntries = 250) {}

  trace(entry: RuntimeTraceEntry): void {
    this.entries.push(structuredClone(entry));
    if (this.entries.length > this.maximumEntries) {
      this.entries.shift();
    }
  }

  list(): readonly RuntimeTraceEntry[] {
    return structuredClone(this.entries);
  }
}

