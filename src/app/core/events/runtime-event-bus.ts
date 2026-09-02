import { Subject } from 'rxjs';
import type { RuntimeError } from '../errors/runtime-error';
import { runtimeError } from '../errors/runtime-error-factory';
import type { EventRegistry } from '../registries/specialized-registries';
import type { RuntimeScope, Unsubscribe } from '../state/runtime-state-contracts';
import { runtimeScopeKey } from '../state/runtime-scope';
import type { RuntimeEvent } from './runtime-event';

export interface RuntimeEventPublishResult {
  accepted: boolean;
  errors?: RuntimeError[];
}

export class RuntimeEventBus {
  private readonly subjects = new Map<string, Subject<RuntimeEvent>>();

  constructor(private readonly registry: EventRegistry) {}

  publish(scope: RuntimeScope, event: RuntimeEvent): RuntimeEventPublishResult {
    if (event.tenantId !== scope.tenantId || event.projectId !== scope.projectId) {
      return {
        accepted: false,
        errors: [
          runtimeError(
            'EVENT_SCOPE_MISMATCH',
            'Event tenant/project identity does not match the runtime scope.',
            { sourceId: event.id },
          ),
        ],
      };
    }

    if (!this.registry.has(event.eventType)) {
      return {
        accepted: false,
        errors: [
          runtimeError(
            'UNKNOWN_EVENT_TYPE',
            `Event type "${event.eventType}" is not registered.`,
            { sourceId: event.id },
          ),
        ],
      };
    }

    this.subjectFor(scope).next(Object.freeze({ ...event }));
    return { accepted: true };
  }

  subscribe(
    scope: RuntimeScope,
    listener: (event: RuntimeEvent) => void,
  ): Unsubscribe {
    const subscription = this.subjectFor(scope).subscribe(listener);
    return () => subscription.unsubscribe();
  }

  private subjectFor(scope: RuntimeScope): Subject<RuntimeEvent> {
    const key = runtimeScopeKey(scope);
    let subject = this.subjects.get(key);
    if (subject === undefined) {
      subject = new Subject<RuntimeEvent>();
      this.subjects.set(key, subject);
    }
    return subject;
  }
}
