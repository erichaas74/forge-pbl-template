import raw from '../../../../../public/projects/exploration-time-repair/versions/2.0.0/project.json';
import legacy from '../../../../../public/projects/exploration-time-repair/project.json';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import type { RuntimeEvent } from '../../../core/events/runtime-event';
import { isInventionProject, requireTimeRepairPackage } from '../domain/time-repair.package';
import {
  INVENTION_EVENTS,
  type InventionAction,
  type InventionSession,
  type PressSettings,
} from './invention.models';
import { requireInventionProject } from './invention.validation';
import {
  applyInventionAction,
  batchReady,
  initialInventionState,
  pullProof,
} from './printing-press.engine';
import { BrowserInventionPersistence, restoreInventionState } from './invention.persistence';

const project = requireInventionProject(raw);
const context = createLocalPreviewSession(project.projectId, project.projectVersion);
const session = project.inventionRescue.sessions[7];
const repaired: PressSettings = {
  type: [...session.target].reverse(),
  ink: 'press',
  pressure: 1,
  packing: [1, 1, 1],
};
let counter = 0;
function event(action: InventionAction, s: InventionSession = session): RuntimeEvent {
  const id = String(++counter);
  return {
    id,
    clientEventId: id,
    eventType: INVENTION_EVENTS[action.type],
    sourceId: s.id,
    projectId: project.projectId,
    tenantId: context.tenantId,
    actor: { type: 'student', id: context.actorId },
    timestamp: new Date().toISOString(),
    payload: { action },
  };
}
describe('configurable invention rescue', () => {
  it('loads the new version and the preserved legacy version without substituting capabilities', () => {
    expect(isInventionProject(requireTimeRepairPackage(raw))).toBe(true);
    expect(isInventionProject(requireTimeRepairPackage(legacy))).toBe(false);
    expect(Object.isFrozen(project.inventionRescue.sessions[0].initial)).toBe(true);
    for (const changed of [
      { ...raw, inventionRescue: { ...raw.inventionRescue, capability: 'missing-simulation' } },
      {
        ...raw,
        inventionRescue: {
          ...raw.inventionRescue,
          inks: raw.inventionRescue.inks.map((i) => ({ ...i, adhesion: 0.1 })),
        },
      },
      {
        ...raw,
        inventionRescue: {
          ...raw.inventionRescue,
          sessions: raw.inventionRescue.sessions.map((s) => ({ ...s, sourceIds: ['unknown'] })),
        },
      },
    ])
      expect(() => requireInventionProject(changed)).toThrow();
  });
  it('represents different visible symptoms and rejects a pressure-only repair for incompatible ink', () => {
    const weak = pullProof(project, session, { ...repaired, ink: 'manuscript' }, 1);
    const harder = pullProof(project, session, { ...repaired, ink: 'manuscript', pressure: 2 }, 2);
    expect(weak.usable).toBe(false);
    expect(harder.usable).toBe(false);
    expect(harder.coverage.every((n) => n < 0.4)).toBe(true);
    const region = pullProof(project, session, { ...repaired, packing: [0, 1, 1] }, 3);
    expect(region.coverage[0]).toBeLessThan(region.coverage[1]);
    expect(region.coverage[1]).toBe(region.coverage[2]);
    expect(region.fault).toBe('packing');
    expect(pullProof(project, session, { ...repaired, ink: 'loose' }, 4).spread).toBeGreaterThan(
      0.3,
    );
    expect(pullProof(project, session, repaired, 5).usable).toBe(true);
  });
  it('prints the reverse of the arranged type and retains all settings with the proof', () => {
    const s = project.inventionRescue.sessions[2];
    expect(pullProof(project, s, s.initial, 1).text).not.toBe(s.target);
    const proof = pullProof(project, s, { ...s.initial, type: [...s.target].reverse() }, 2);
    expect(proof.text).toBe(s.target);
    expect(proof.usable).toBe(true);
    expect(proof.settings).not.toBe(s.initial);
  });
  it('makes every configured press session solvable with a tested batch', () => {
    for (const s of project.inventionRescue.sessions.filter((s) => s.mode !== 'courtyard')) {
      let state = initialInventionState();
      for (let i = 0; i < s.batchSize; i++) {
        if (s.mode === 'reference')
          for (const part of ['ink', 'paper'] as const) {
            const prepare: InventionAction = { type: 'prepare', part };
            state = applyInventionAction(project, s, state, prepare, event(prepare, s)).state;
          }
        const action: InventionAction = {
          type: 'proof',
          settings: { ...repaired, type: [...s.target].reverse() },
        };
        state = applyInventionAction(project, s, state, action, event(action, s)).state;
      }
      expect(batchReady(state, s), s.id).toBe(true);
      const broken: InventionAction = {
        type: 'proof',
        settings: { ...s.initial, ink: 'manuscript' },
      };
      if (s.mode === 'reference') {
        const paper: InventionAction = { type: 'prepare', part: 'paper' };
        state = applyInventionAction(project, s, state, paper, event(paper, s)).state;
      }
      state = applyInventionAction(project, s, state, broken, event(broken, s)).state;
      expect(batchReady(state, s), s.id).toBe(false);
    }
  });
  it('does not duplicate a trial or issue output twice, and records material-specific evidence', () => {
    const action: InventionAction = { type: 'proof', settings: repaired };
    const e = event(action);
    const result = applyInventionAction(project, session, initialInventionState(), action, e);
    expect(applyInventionAction(project, session, result.state, action, e).state).toBe(
      result.state,
    );
    const inkSession = project.inventionRescue.sessions[4];
    let state = initialInventionState();
    for (const surface of ['paper', 'metal'] as const) {
      const sample: InventionAction = { type: 'sample', ink: 'manuscript', surface };
      state = applyInventionAction(
        project,
        inkSession,
        state,
        sample,
        event(sample, inkSession),
      ).state;
    }
    expect(state.samples[0].adhesion).toBeGreaterThan(0.9);
    expect(state.samples[1].adhesion).toBeLessThan(0.4);
  });
  it('requires physical preparation in the reference lesson and leaves an uninked sheet blank', () => {
    const s = project.inventionRescue.sessions[1];
    let state = initialInventionState();
    const press: InventionAction = { type: 'proof', settings: s.initial };
    expect(
      applyInventionAction(project, s, state, press, event(press, s)).state.trials,
    ).toHaveLength(0);
    const paper: InventionAction = { type: 'prepare', part: 'paper' };
    state = applyInventionAction(project, s, state, paper, event(paper, s)).state;
    state = applyInventionAction(project, s, state, press, event(press, s)).state;
    expect(state.trials[0].coverage).toEqual([0, 0, 0]);
    for (const part of ['ink', 'paper'] as const) {
      const prepare: InventionAction = { type: 'prepare', part };
      state = applyInventionAction(project, s, state, prepare, event(prepare, s)).state;
    }
    state = applyInventionAction(project, s, state, press, event(press, s)).state;
    expect(state.trials.at(-1)?.usable).toBe(true);
    expect(state.preparation).toEqual({ inked: false, paperLoaded: false });
  });
  it('models a real dependency chain and supplies only the output of an achieved repair', () => {
    let state = initialInventionState();
    const flow = (station: 'binder' | 'courier' | 'scribe' | 'patron') => {
      const action: InventionAction = { type: 'flow', station };
      state = applyInventionAction(project, session, state, action, event(action)).state;
    };
    flow('binder');
    flow('courier');
    expect(state.flow.delivered).toBe(0);
    const proof: InventionAction = { type: 'proof', settings: repaired };
    for (let i = 0; i < 2; i++)
      state = applyInventionAction(project, session, state, proof, event(proof)).state;
    flow('binder');
    expect(state.flow.finished).toBe(0);
    state = applyInventionAction(project, session, state, proof, event(proof)).state;
    flow('binder');
    flow('courier');
    flow('binder');
    flow('courier');
    flow('binder');
    flow('courier');
    expect(state.flow.delivered).toBe(3);
    flow('binder');
    flow('courier');
    expect(state.flow.delivered).toBe(3);
    flow('patron');
    expect(state.flow.inspected).toContain('patron');
  });
  it('restores local evidence by replay, isolates actors and versions, and rejects tampering', () => {
    const memory = new Map<string, string>();
    const storage: Storage = {
      get length() {
        return memory.size;
      },
      clear: () => memory.clear(),
      key: (i) => [...memory.keys()][i] ?? null,
      removeItem: (k) => {
        memory.delete(k);
      },
      getItem: (k) => memory.get(k) ?? null,
      setItem: (k, v) => {
        memory.set(k, v);
      },
    };
    const persistence = new BrowserInventionPersistence(project, context, storage);
    const action: InventionAction = { type: 'proof', settings: repaired };
    const e = event(action);
    persistence.save(session, { settings: repaired, events: [e] });
    expect(
      restoreInventionState(project, session, persistence.load(session)!.events)?.trials,
    ).toHaveLength(1);
    expect(
      new BrowserInventionPersistence(project, { ...context, actorId: 'other' }, storage).load(
        session,
      ),
    ).toBeUndefined();
    expect(
      new BrowserInventionPersistence(
        project,
        { ...context, projectVersion: '1.0.0' },
        storage,
      ).load(session),
    ).toBeUndefined();
    expect(restoreInventionState(project, session, [e, e])).toBeUndefined();
    expect(
      restoreInventionState(project, session, [{ ...e, sourceId: 'other-session' }]),
    ).toBeUndefined();
    persistence.save(session, { settings: { ...repaired, pressure: 99 }, events: [e] });
    expect(persistence.load(session)).toBeUndefined();
  });
});
