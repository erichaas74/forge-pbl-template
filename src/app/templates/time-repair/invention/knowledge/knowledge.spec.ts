import raw from '../../../../../../public/projects/exploration-time-repair/versions/2.1.0/project.json';
import { createLocalPreviewSession } from '../../../../core/context/project-session-context';
import type { RuntimeEvent } from '../../../../core/events/runtime-event';
import { requireInventionProject } from '../invention.validation';
import {
  applyKnowledgeEvent,
  knowledgeActivities,
  replayKnowledge,
  validKnowledgeDefinition,
} from './knowledge.engine';
import { BrowserKnowledgePersistence } from './knowledge.persistence';
import type { KnowledgeAction, KnowledgeKind } from './knowledge.models';

const project = requireInventionProject(raw);
const context = createLocalPreviewSession(project.projectId, project.projectVersion);
let counter = 0;
function activity(kind: KnowledgeKind) {
  const session = project.inventionRescue.sessions.find((s) => s.knowledge?.kind === kind)!;
  const c = session.knowledge!;
  let state = knowledgeActivities[kind].initial(c);
  const events: RuntimeEvent[] = [];
  function act(action: KnowledgeAction) {
    const id = String(++counter);
    const event: RuntimeEvent = {
      id,
      clientEventId: id,
      eventType: `inventionKnowledge.${kind}Operated`,
      timestamp: new Date().toISOString(),
      tenantId: context.tenantId,
      projectId: project.projectId,
      attemptId: context.attemptId,
      actor: { type: 'student', id: context.actorId },
      sourceId: session.id,
      payload: { action },
    };
    const next = applyKnowledgeEvent(c, state, event, project.projectId, session.id);
    if (next !== state) events.push(event);
    state = next;
  }
  return {
    c,
    session,
    act,
    events,
    get state() {
      return state;
    },
  };
}
describe('knowledge passed through objects, experiments and people', () => {
  afterEach(() => localStorage.clear());
  it('loads all six extension capabilities in a separately versioned eight-session package', () => {
    expect(project.projectVersion).toBe('2.1.0');
    expect(project.inventionRescue.sessions).toHaveLength(8);
    expect(
      new Set(
        project.inventionRescue.sessions.flatMap((s) => (s.knowledge ? [s.knowledge.kind] : [])),
      ).size,
    ).toBe(6);
    for (const s of project.inventionRescue.sessions)
      if (s.knowledge) expect(validKnowledgeDefinition(s.knowledge)).toBe(true);
    expect(validKnowledgeDefinition({ kind: 'distribution', version: '1.0', places: [null] })).toBe(
      false,
    );
    expect(validKnowledgeDefinition({ ...activity('reconstruction').c, fragments: [] })).toBe(
      false,
    );
    expect(
      validKnowledgeDefinition({ ...activity('diagram').c, gearRadii: [Infinity, 48, 64] }),
    ).toBe(false);
  });
  it('requires complementary copies and oriented joins; displaced fragments remain recoverable', () => {
    const a = activity('reconstruction');
    a.act({ type: 'inspect' });
    expect(a.state.trials.at(-1)?.success).toBe(false);
    for (const f of a.c.fragments!) {
      a.act({ type: 'select', item: f.id });
      for (let turn = 0; turn < (4 - f.turn) % 4; turn++) a.act({ type: 'turn' });
      a.act({ type: 'place', target: String(f.cell) });
    }
    a.act({ type: 'inspect' });
    expect(a.state.trials.at(-1)?.success).toBe(true);
    const f = a.c.fragments![0];
    a.act({ type: 'select', item: f.id });
    a.act({ type: 'place', target: String((f.cell + 1) % 6) });
    expect(Object.values(a.state.placements).filter((v) => v === f.id)).toHaveLength(1);
    a.act({ type: 'inspect' });
    expect(a.state.trials.at(-1)?.success).toBe(false);
  });
  it('needs operating contributions from all four crafts, beyond matching parts', () => {
    const a = activity('assembly');
    for (const p of a.c.parts!) {
      a.act({ type: 'select', item: p });
      a.act({ type: 'fit', target: p });
    }
    a.act({ type: 'test' });
    expect(a.state.trials.at(-1)?.success).toBe(false);
    for (const [part, count] of Object.entries({ frame: 1, mold: 4, ink: 2, screw: 2 }))
      for (let i = 0; i < count; i++) a.act({ type: 'operate', target: part });
    a.act({ type: 'test' });
    expect(a.state.trials.at(-1)?.success).toBe(true);
    a.act({ type: 'operate', target: 'screw' });
    a.act({ type: 'test' });
    expect(a.state.trials.at(-1)?.success).toBe(false);
  });
  it('allows an erroneous diagram to be printed, tested, corrected and reprinted', () => {
    const a = activity('diagram');
    for (const i of ['0', '1', '2']) {
      a.act({ type: 'select', item: i });
      a.act({ type: 'fit', target: i });
    }
    a.act({ type: 'crank' });
    expect(a.state.values['running']).toBe(0);
    a.act({ type: 'print' });
    expect(a.state.trials.at(-1)?.success).toBe(false);
    a.act({ type: 'shift', value: -1 });
    a.act({ type: 'shift', value: -1 });
    a.act({ type: 'crank' });
    expect(a.state.values['running']).toBe(1);
    a.act({ type: 'print' });
    expect(a.state.trials.at(-1)?.success).toBe(true);
    expect(a.state.values['printed']).toBe(a.c.axles![1]);
    expect(a.state.values['revision']).toBe(2);
  });
  it('conserves printed copies, follows actual routes and delivers usable copies to every destination', () => {
    const a = activity('distribution');
    a.act({ type: 'move', target: 'school' });
    expect(a.state.selected).toBe('workshop');
    a.act({ type: 'load' });
    a.act({ type: 'load' });
    a.act({ type: 'load' });
    expect(a.state.values['bag']).toBe(2);
    a.act({ type: 'move', target: 'bookseller' });
    a.act({ type: 'deliver' });
    a.act({ type: 'move', target: 'bridge' });
    expect(a.state.message).toContain('bridge');
    a.act({ type: 'move', target: 'school' });
    a.act({ type: 'deliver' });
    a.act({ type: 'move', target: 'collection' });
    a.act({ type: 'deliver' });
    expect(a.state.values['delivered-collection']).toBeUndefined();
    a.act({ type: 'move', target: 'bridge' });
    a.act({ type: 'move', target: 'workshop' });
    a.act({ type: 'load' });
    a.act({ type: 'move', target: 'bridge' });
    a.act({ type: 'move', target: 'collection' });
    a.act({ type: 'deliver' });
    expect(a.state.message).toContain('throughout');
    const delivered = a.c.places!.reduce(
      (sum, p) => sum + (a.state.values['delivered-' + p.id] ?? 0),
      0,
    );
    expect(a.state.values['stock'] + a.state.values['bag'] + delivered).toBe(a.c.stock);
  });
  it('distinguishes supply from cost, language and reading access', () => {
    const a = activity('access');
    for (const p of a.c.readers!) {
      a.act({ type: 'select', item: 'copy' });
      a.act({ type: 'offer', target: p.id });
      expect(a.state.values['using-' + p.id]).toBe(0);
    }
    for (const p of a.c.readers!) {
      a.act({
        type: 'select',
        item: p.barrier === 'cost' ? 'loan' : p.barrier === 'language' ? 'translation' : 'reading',
      });
      a.act({ type: 'offer', target: p.id });
      expect(a.state.values['using-' + p.id]).toBe(1);
    }
  });
  it('requires a copy as well as translation or spoken support', () => {
    const a = activity('access');
    a.act({ type: 'select', item: 'translation' });
    a.act({ type: 'offer', target: 'traveler' });
    expect(a.state.values['using-traveler']).toBe(0);
    a.act({ type: 'select', item: 'copy' });
    a.act({ type: 'offer', target: 'traveler' });
    expect(a.state.values['using-traveler']).toBe(1);
  });
  it('retains taught repairs after the expert leaves and distinguishes untrained faults', () => {
    const a = activity('apprentice');
    a.act({ type: 'expert' });
    a.act({ type: 'run' });
    expect(a.state.values['running']).toBe(-1);
    for (const [i, stage] of ['before', 'fault', 'repair', 'after'].entries()) {
      a.act({ type: 'select', item: stage + '-ink' });
      a.act({ type: 'place', target: String(i) });
    }
    a.act({ type: 'teach' });
    a.act({ type: 'run' });
    expect(a.state.values['running']).toBe(1);
    expect(a.state.values['expert']).toBe(0);
    a.act({ type: 'case', value: 1 });
    a.act({ type: 'run' });
    expect(a.state.values['running']).toBe(-1);
    a.act({ type: 'case', value: 0 });
    a.act({ type: 'run' });
    expect(a.state.values['running']).toBe(1);
  });
  it('rejects an unrelated or incorrectly ordered repair demonstration', () => {
    const a = activity('apprentice');
    for (const [i, stage] of ['repair', 'fault', 'before', 'after'].entries()) {
      a.act({ type: 'select', item: stage + '-ink' });
      a.act({ type: 'place', target: String(i) });
    }
    a.act({ type: 'teach' });
    expect(a.state.values['learned-ink']).toBeFalsy();
  });
  it('replays operation evidence and rejects duplicates, cross-session events and malformed actions', () => {
    const a = activity('diagram');
    a.act({ type: 'blueprint', value: 1 });
    a.act({ type: 'select', item: '0' });
    expect(replayKnowledge(a.c, a.events, project.projectId, a.session.id)).toEqual(a.state);
    expect(
      replayKnowledge(a.c, [a.events[0], a.events[0]], project.projectId, a.session.id),
    ).toBeUndefined();
    expect(replayKnowledge(a.c, a.events, project.projectId, 'wrong-session')).toBeUndefined();
    expect(
      replayKnowledge(
        a.c,
        [{ ...a.events[0], payload: { action: { type: 'shift', value: NaN } } }],
        project.projectId,
        a.session.id,
      ),
    ).toBeUndefined();
  });
  it('restores unfinished work only for its project version, actor and session', () => {
    const a = activity('reconstruction');
    a.act({ type: 'select', item: a.c.fragments![0].id });
    a.act({ type: 'turn' });
    const store = new BrowserKnowledgePersistence(context);
    store.save(a.session, { events: a.events });
    expect(store.load(a.session)?.events).toEqual(a.events);
    expect(
      new BrowserKnowledgePersistence({ ...context, actorId: 'another-student' }).load(a.session),
    ).toBeUndefined();
    expect(
      new BrowserKnowledgePersistence({ ...context, projectVersion: '2.0.0' }).load(a.session),
    ).toBeUndefined();
    expect(store.load(activity('access').session)).toBeUndefined();
  });
});
