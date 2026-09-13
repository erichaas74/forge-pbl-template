import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import data from '../testing/castle-advanced.fixture.json';
import guidedData from '../testing/castle-guided.fixture.json';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { requireMission } from '../domain/heist.validation';
import { HEIST_MISSION, HeistRuntime } from './heist-runtime.service';
import { HEIST_PERSISTENCE, LocalHeistAdapter, type HeistPersistence } from './heist.persistence';
import type { HeistCommand, Mission } from '../domain/heist.models';
const mission = requireMission({ ...data, guards: [], gate: { ...data.gate, openSeconds: 60 } });
describe('Heist local persistence and checkpoints', () => {
  function runtime(storage: HeistPersistence, definition: Mission = mission): HeistRuntime {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [HeistRuntime, { provide: HEIST_MISSION, useValue: definition }, { provide: HEIST_PERSISTENCE, useValue: storage }] });
    return TestBed.inject(HeistRuntime);
  }
  it('restores route, measurement, crisis pause and completed replay from meaningful checkpoints', () => {
    let saved: HeistCommand[] = [];
    const storage = { load: () => structuredClone(saved), save: (v: readonly HeistCommand[]) => { saved = structuredClone([...v]); } };
    const r = runtime(storage);
    r.send({ type: 'measure', from: { x: 100, y: 520 }, to: { x: 280, y: 520 } });
    for (const id of ['market', 'gate', 'hall', 'archive', 'bridge', 'river']) r.send({ type: 'node', id });
    r.send({ type: 'pickup', enabled: true });
    for (const q of r.engine.challenges) r.send({ type: 'answer', id: q.id, answer: q.answer, unit: q.unit });
    r.send({ type: 'lock' }); const count = saved.length; r.advance(10); expect(saved).toHaveLength(count);
    r.advance(420); expect(r.engine.mode).toBe('CRISIS');
    const restored = runtime(storage); expect(restored.engine.events).toEqual(r.engine.events); expect(restored.engine.measurement?.meters).toBe(90);
    restored.send({ type: 'answer', id: mission.crisis.challenge.id, answer: 63, unit: 'kg' }); restored.send({ type: 'respond', id: 'team' }); restored.advance(420);
    const complete = runtime(storage); expect(complete.engine.mode).toBe('SUCCESS'); expect(complete.engine.events).toEqual(restored.engine.events);
  });
  it('surfaces storage failure while allowing local practice to continue', () => {
    const r = runtime({ load: () => [], save: () => { throw new Error('quota'); } });
    expect(r.send({ type: 'node', id: 'market' })).toBe(true); expect(r.storageError()).toContain('not been saved');
  });
  it('restores a guided path, partial math, and automatic pickup without creating extra questions', () => {
    let saved: HeistCommand[] = [];
    const storage = { load: () => structuredClone(saved), save: (v: readonly HeistCommand[]) => { saved = structuredClone([...v]); } };
    const guided = requireMission(guidedData), first = runtime(storage, guided);
    first.send({type:'route', id:'tower'}); first.send({type:'answer', id:'distance-0', answer:90, unit:'m'});
    const restored = runtime(storage, guided);
    expect(restored.engine.plan).toEqual(first.engine.plan);
    expect(restored.engine.plan.pickup).toBe(true); expect(restored.engine.challenges).toHaveLength(3);
    expect(restored.engine.problems).toEqual(['Verify 2 required calculations.']);
  });
  it('rejects corrupted history and starts with a recoverable error', () => {
    const r = runtime({ load: () => [{ type: 'node', id: 'missing' }], save: vi.fn() });
    expect(r.engine.plan.nodes).toEqual(['entry']); expect(r.storageError()).toContain('Could not restore');
  });
  it('isolates tenant, actor and project version and rejects changed mission fingerprints', () => {
    const session = createLocalPreviewSession('heist-adapter-test', '1');
    const a = new LocalHeistAdapter(session, 'a'); a.save([{ type: 'plan' }]); expect(a.load()).toHaveLength(1);
    expect(new LocalHeistAdapter({ ...session, tenantId: 'other' }, 'a').load()).toEqual([]);
    expect(new LocalHeistAdapter({ ...session, actorId: 'other' }, 'a').load()).toEqual([]);
    expect(new LocalHeistAdapter({ ...session, projectVersion: '2' }, 'a').load()).toEqual([]);
    expect(() => new LocalHeistAdapter(session, 'changed').load()).toThrow('incompatible'); a.save([]);
  });
});
