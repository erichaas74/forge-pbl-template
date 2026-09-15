import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import fixture from '../../../../../../public/projects/shadow-gallery/versions/2.0.0/project.json';
import { createLocalPreviewSession } from '../../../../core/context/project-session-context';
import { RESTORATION_MISSION, LocalRestorationAdapter } from '../restoration-collection.runtime';
import { RestorationCollectionEngine } from '../restoration-collection.engine';
import { requireRestorationMission } from '../restoration-collection.validation';
import { RestorationPreviewRuntime } from './restoration-preview.runtime';
import { initialPreviewState } from './restoration-preview.models';
import { requirePreviewState } from './restoration-preview.validation';
import { LocalRestorationPreviewAdapter, RESTORATION_PREVIEW_PERSISTENCE, RESTORATION_PREVIEW_SESSION } from './restoration-preview.persistence';
const mission = requireRestorationMission(fixture), session = createLocalPreviewSession(mission.projectId, mission.projectVersion);
describe('Restoration preview contract and isolation', () => {
  afterEach(() => { TestBed.resetTestingModule(); localStorage.clear(); });
  it('retains legacy packages and rejects unknown capabilities, work references, cues and samples', () => {
    const { previewWeeks: _unused, ...legacy } = fixture; expect(requireRestorationMission(legacy).previewWeeks).toBeUndefined();
    for (const mutate of [
      (m: any) => m.previewWeeks.capability = 'missing',
      (m: any) => m.previewWeeks.weeks.pop(),
      (m: any) => m.previewWeeks.weeks[0].sessions[0].workId = 'missing',
      (m: any) => m.previewWeeks.weeks[0].sessions[0].film.cues[0].regionId = 'missing',
      (m: any) => m.previewWeeks.sampleExhibit[0].choices.detail = 'missing',
    ]) { const copy = structuredClone(fixture); mutate(copy); expect(() => requireRestorationMission(copy)).toThrow('INVALID_RESTORATION_PREVIEW'); }
  });
  it('preserves invalid saves, supports temporary testing, and reports storage errors', () => {
    const adapter = new LocalRestorationPreviewAdapter(session, mission); localStorage.setItem(adapter.key, '{broken');
    TestBed.configureTestingModule({ providers: [RestorationPreviewRuntime, { provide: RESTORATION_MISSION, useValue: mission }, { provide: RESTORATION_PREVIEW_SESSION, useValue: session }, { provide: RESTORATION_PREVIEW_PERSISTENCE, useValue: adapter }] });
    const runtime = TestBed.inject(RestorationPreviewRuntime); runtime.ensureExhibit();
    expect(runtime.state().exhibit).toHaveLength(2); expect(runtime.warning()).toContain('preserved'); expect(localStorage.getItem(adapter.key)).toBe('{broken');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [RestorationPreviewRuntime, { provide: RESTORATION_MISSION, useValue: mission }, { provide: RESTORATION_PREVIEW_SESSION, useValue: session }, { provide: RESTORATION_PREVIEW_PERSISTENCE, useValue: { load: () => undefined, save: vi.fn(() => { throw Error('quota'); }) } }] });
    const temporary = TestBed.inject(RestorationPreviewRuntime); temporary.ensureExhibit(); expect(temporary.warning()).toContain('storage is unavailable'); expect(temporary.state().exhibit).toHaveLength(2);
  });
  it('rejects malformed snapshots and keeps scopes separate', () => {
    const state = initialPreviewState(); expect(requirePreviewState(state, mission)).toEqual(state);
    expect(() => requirePreviewState({ ...state, exhibit: ['missing'] }, mission)).toThrow('saved exhibit');
    const a = new LocalRestorationPreviewAdapter(session, mission), b = new LocalRestorationPreviewAdapter({ ...session, actorId: 'another' }, mission);
    a.save({ ...state, exhibit: [] }); expect(b.load()).toBeUndefined(); expect(a.load()?.exhibit).toEqual([]);
  });
  it('does not allow the preview runtime in an assessed session', () => {
    TestBed.configureTestingModule({ providers: [RestorationPreviewRuntime, { provide: RESTORATION_MISSION, useValue: mission }, { provide: RESTORATION_PREVIEW_SESSION, useValue: { ...session, mode: 'student' } }, { provide: RESTORATION_PREVIEW_PERSISTENCE, useValue: { load: () => undefined, save: vi.fn() } }] });
    expect(() => TestBed.inject(RestorationPreviewRuntime)).toThrow('PERMISSION_DENIED');
  });
  it('keeps existing assessed saves compatible when only preview content is added', () => {
    const { previewWeeks: _preview, ...legacy } = mission;
    const engine = new RestorationCollectionEngine(legacy);
    const event = { id: 'existing-open', elapsed: 0, command: { type: 'open' as const, workId: mission.works[0].id } };
    engine.dispatch(event);
    new LocalRestorationAdapter(session, legacy).save([event], engine.state);
    expect(new LocalRestorationAdapter(session, mission).load()).toEqual([event]);
  });
});
