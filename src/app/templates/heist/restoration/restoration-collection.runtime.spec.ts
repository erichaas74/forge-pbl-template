import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import fixture from '../../../../../public/projects/shadow-gallery/versions/2.0.0/project.json';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { LocalRestorationAdapter, RESTORATION_MISSION, RESTORATION_PERSISTENCE, RestorationCollectionRuntime, type RestorationPersistence } from './restoration-collection.runtime';
import { requireRestorationMission } from './restoration-collection.validation';
const mission = requireRestorationMission(fixture);
describe('Restoration persistence boundary', () => {
  afterEach(() => { localStorage.clear(); TestBed.resetTestingModule(); });
  it('isolates project versions and student practice scopes', () => {
    const session = createLocalPreviewSession(mission.projectId, mission.projectVersion), a = new LocalRestorationAdapter(session, mission);
    const b = new LocalRestorationAdapter({ ...session, actorId: 'another-student' }, mission), c = new LocalRestorationAdapter({ ...session, projectVersion: '1.1.0' }, mission);
    expect(new Set([a.key, b.key, c.key]).size).toBe(3);
    TestBed.configureTestingModule({ providers: [RestorationCollectionRuntime, { provide: RESTORATION_MISSION, useValue: mission }, { provide: RESTORATION_PERSISTENCE, useValue: a }] });
    const runtime = TestBed.inject(RestorationCollectionRuntime); runtime.send({ type: 'open', workId: mission.works[0].id }); expect(a.load()).toHaveLength(1); expect(b.load()).toEqual([]);
    TestBed.resetTestingModule(); TestBed.configureTestingModule({ providers: [RestorationCollectionRuntime, { provide: RESTORATION_MISSION, useValue: mission }, { provide: RESTORATION_PERSISTENCE, useValue: a }] });
    expect(TestBed.inject(RestorationCollectionRuntime).engine.state.workId).toBe(mission.works[0].id);
  });
  it('preserves invalid stored data and blocks mutations until a deliberate reset', () => {
    const adapter = new LocalRestorationAdapter(createLocalPreviewSession(mission.projectId, mission.projectVersion), mission); localStorage.setItem(adapter.key, '{broken');
    TestBed.configureTestingModule({ providers: [RestorationCollectionRuntime, { provide: RESTORATION_MISSION, useValue: mission }, { provide: RESTORATION_PERSISTENCE, useValue: adapter }] });
    const runtime = TestBed.inject(RestorationCollectionRuntime); expect(runtime.blocked()).toBe(true); expect(runtime.send({ type: 'open', workId: mission.works[0].id })).toBe(false); expect(localStorage.getItem(adapter.key)).toBe('{broken');
    runtime.reset(); expect(runtime.blocked()).toBe(false); expect(adapter.load()).toEqual([]);
  });
  it('retains in-memory work and reports a storage failure', () => {
    const persistence: RestorationPersistence = { load: () => [], save: vi.fn(() => { throw new Error('quota'); }) };
    TestBed.configureTestingModule({ providers: [RestorationCollectionRuntime, { provide: RESTORATION_MISSION, useValue: mission }, { provide: RESTORATION_PERSISTENCE, useValue: persistence }] });
    const runtime = TestBed.inject(RestorationCollectionRuntime); expect(runtime.send({ type: 'open', workId: mission.works[0].id })).toBe(true); expect(runtime.warning()).toContain('download the ledger'); expect(runtime.engine.state.workId).toBe(mission.works[0].id);
  });
});
