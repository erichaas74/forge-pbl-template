import raw from '../../../../../../public/projects/exploration-time-repair/versions/2.2.0/project.json';
import type { RuntimeEvent } from '../../../../core/events/runtime-event';
import { requireInventionProject } from '../invention.validation';
import {
  applyKnowledgeEvent,
  knowledgeActivities,
  replayKnowledge,
  validKnowledgeDefinition,
} from './knowledge.engine';
import { circulationValue } from './circulation.activity';
import type { KnowledgeAction } from './knowledge.models';

const project = requireInventionProject(raw);
const session = project.inventionRescue.sessions[0];
const config = session.knowledge!;
function experiment() {
  let state = knowledgeActivities.circulation.initial(config);
  const events: RuntimeEvent[] = [];
  const act = (action: KnowledgeAction) => {
    const event: RuntimeEvent = {
      id: String(events.length + 1),
      eventType: 'inventionKnowledge.circulationOperated',
      timestamp: '2026-09-15T12:00:00Z',
      tenantId: 'preview',
      projectId: project.projectId,
      attemptId: 'opening',
      sourceId: session.id,
      actor: { type: 'student', id: 'student' },
      payload: { action },
    };
    const next = applyKnowledgeEvent(config, state, event, project.projectId, session.id);
    if (next !== state) events.push(event);
    state = next;
  };
  return {
    act,
    events,
    get state() {
      return state;
    },
    n: (key: string) => circulationValue(state, key),
  };
}
describe('print circulation and the missing Reformation opening', () => {
  it('loads the new historical package and rejects incomplete circulation contracts', () => {
    expect(project.projectVersion).toBe('2.2.0');
    expect(session.task).toContain('Protestant Reformation');
    expect(session.date).toBe('1517–1518');
    expect(project.inventionRescue.sessions[1].date).toBe('c. 1454');
    expect(validKnowledgeDefinition(config)).toBe(true);
    expect(
      validKnowledgeDefinition({
        ...config,
        circulation: { ...config.circulation, destinations: [] },
      }),
    ).toBe(false);
    expect(
      validKnowledgeDefinition({
        ...config,
        circulation: { ...config.circulation, destinations: [null, null, null] },
      }),
    ).toBe(false);
    expect(
      validKnowledgeDefinition({
        ...config,
        circulation: {
          ...config.circulation,
          destinations: Array(3).fill({ id: 'same', name: 'Town' }),
        },
      }),
    ).toBe(false);
  });
  it('preserves manuscripts and travel when the printing process fails', () => {
    const a = experiment();
    a.act({ type: 'print', target: 'nuremberg' });
    expect(a.n('copies-nuremberg')).toBe(0);
    a.act({ type: 'send', target: 'nuremberg' });
    expect(a.n('stock')).toBe(0);
    expect(a.n('copies-nuremberg')).toBe(1);
    a.act({ type: 'print', target: 'nuremberg' });
    expect(a.n('proof-nuremberg')).toBe(1);
    expect(a.n('copies-nuremberg')).toBe(1);
    a.act({ type: 'share', target: 'nuremberg' });
    a.act({ type: 'share', target: 'nuremberg' });
    expect(a.n('readers-nuremberg')).toBe(1);
    expect(a.n('copies-nuremberg')).toBe(0);
    // Hand copying still provides a second usable copy; the model must not erase it.
    for (let i = 0; i < 4; i++) a.act({ type: 'copy' });
    a.act({ type: 'send', target: 'nuremberg' });
    a.act({ type: 'share', target: 'nuremberg' });
    expect(a.n('readers-nuremberg')).toBe(2);
  });
  it('keeps working-reference inventories independent and requires delivery and sharing', () => {
    const a = experiment();
    a.act({ type: 'inspect', target: 'basel' }); // Testing access is not gated by prior trials.
    const before = { ...a.state.values };
    a.act({ type: 'compare', value: 1 });
    expect(a.n('stock')).toBe(1);
    a.act({ type: 'send', target: 'basel' });
    a.act({ type: 'print', target: 'basel' });
    expect(a.n('copies-basel')).toBe(4);
    expect(a.n('readers-basel')).toBe(0);
    for (let i = 0; i < 4; i++) a.act({ type: 'share', target: 'basel' });
    expect(a.n('readers-basel')).toBe(3);
    expect(a.n('copies-basel')).toBe(1);
    a.act({ type: 'compare', value: 0 });
    expect(a.n('stock')).toBe(before['altered-stock']);
    expect(a.n('readers-basel')).toBe(0);
    expect(a.n('inspected-basel')).toBe(1);
    expect(replayKnowledge(config, a.events, project.projectId, session.id)).toEqual(a.state);
    expect(replayKnowledge(config, a.events, project.projectId, 'another-session')).toBeUndefined();
  });
  it('conserves finite inventory, bounds repeated operations, and ignores unknown operations', () => {
    const a = experiment();
    a.act({ type: 'compare', value: 1 });
    a.act({ type: 'send', target: 'leipzig' });
    for (let i = 0; i < 10; i++) a.act({ type: 'print', target: 'leipzig' });
    expect(a.n('copies-leipzig')).toBe(6);
    for (let i = 0; i < 40; i++) a.act({ type: 'copy' });
    expect(a.n('stock')).toBe(6);
    const before = a.state;
    a.act({ type: 'send', target: 'unknown-city' });
    a.act({ type: 'compare', value: 2 });
    expect(a.state).toBe(before);
  });
});
