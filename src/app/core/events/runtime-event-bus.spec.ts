import { EventRegistry } from '../registries/specialized-registries';
import type { RuntimeScope } from '../state/runtime-state-contracts';
import { RuntimeEventBus } from './runtime-event-bus';
import type { RuntimeEvent } from './runtime-event';

const firstScope: RuntimeScope = {
  tenantId: 'tenant-school-one',
  projectId: 'project-one',
  projectVersion: '1.0.0',
  studentId: 'student-one',
  scopeType: 'student',
};

const secondScope: RuntimeScope = {
  ...firstScope,
  studentId: 'student-two',
};

describe('RuntimeEventBus', () => {
  it('publishes registered events to subscribers in the same scope', () => {
    const registry = new EventRegistry();
    registry.register({ id: 'activity.completed', version: '1.0.0', status: 'core' });
    const bus = new RuntimeEventBus(registry);
    const received: RuntimeEvent[] = [];
    bus.subscribe(firstScope, (event) => received.push(event));
    const event = createEvent('activity.completed');

    const result = bus.publish(firstScope, event);

    expect(result.accepted).toBe(true);
    expect(received).toEqual([event]);
  });

  it('rejects unknown runtime event types with a structured error', () => {
    const bus = new RuntimeEventBus(new EventRegistry());

    const result = bus.publish(firstScope, createEvent('unknown.event'));

    expect(result).toMatchObject({
      accepted: false,
      errors: [{ code: 'UNKNOWN_EVENT_TYPE', recoverable: true }],
    });
  });

  it('does not leak events across student scopes', () => {
    const registry = new EventRegistry();
    registry.register({ id: 'evidence.viewed', version: '1.0.0', status: 'core' });
    const bus = new RuntimeEventBus(registry);
    const firstReceived: RuntimeEvent[] = [];
    const secondReceived: RuntimeEvent[] = [];
    bus.subscribe(firstScope, (event) => firstReceived.push(event));
    bus.subscribe(secondScope, (event) => secondReceived.push(event));

    bus.publish(firstScope, createEvent('evidence.viewed'));

    expect(firstReceived).toHaveLength(1);
    expect(secondReceived).toHaveLength(0);
  });

  it('rejects events whose project does not match the scope', () => {
    const registry = new EventRegistry();
    registry.register({ id: 'evidence.viewed', version: '1.0.0', status: 'core' });
    const bus = new RuntimeEventBus(registry);
    const event = { ...createEvent('evidence.viewed'), projectId: 'project-other' };

    expect(bus.publish(firstScope, event)).toMatchObject({
      accepted: false,
      errors: [{ code: 'EVENT_SCOPE_MISMATCH' }],
    });
  });

  it('rejects events from another tenant even when the project ID matches', () => {
    const registry = new EventRegistry();
    registry.register({ id: 'evidence.viewed', version: '1.0.0', status: 'core' });
    const bus = new RuntimeEventBus(registry);
    const event = { ...createEvent('evidence.viewed'), tenantId: 'tenant-school-two' };

    expect(bus.publish(firstScope, event)).toMatchObject({
      accepted: false,
      errors: [{ code: 'EVENT_SCOPE_MISMATCH' }],
    });
  });
});

function createEvent(eventType: string): RuntimeEvent {
  return {
    id: 'event-1',
    eventType,
    timestamp: '2026-09-02T00:00:00.000Z',
    tenantId: firstScope.tenantId,
    projectId: firstScope.projectId,
    actor: { type: 'student', id: firstScope.studentId },
  };
}
