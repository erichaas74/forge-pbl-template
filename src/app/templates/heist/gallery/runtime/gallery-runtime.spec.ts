import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import data from '../../../../../../public/projects/shadow-gallery/project.json';
import { createLocalPreviewSession } from '../../../../core/context/project-session-context';
import { requireGalleryMission } from '../domain/gallery.validation';
import type { GalleryCommandEnvelope } from '../domain/gallery.models';
import { GALLERY_MISSION, GALLERY_PERSISTENCE, GalleryRuntime, LocalGalleryAdapter, type GalleryPersistence } from './gallery-runtime';
const mission = requireGalleryMission(data);
function runtime(persistence: GalleryPersistence) { TestBed.resetTestingModule(); TestBed.configureTestingModule({ providers: [GalleryRuntime, { provide: GALLERY_MISSION, useValue: mission }, { provide: GALLERY_PERSISTENCE, useValue: persistence }] }); return TestBed.inject(GalleryRuntime); }
describe('Gallery persistence adapter', () => {
  it('restores an unresolved fraud and all inspection evidence', () => {
    let history: readonly GalleryCommandEnvelope[] = [];
    const storage = { load: () => structuredClone(history), save: (next: readonly GalleryCommandEnvelope[]) => history = structuredClone(next) };
    const first = runtime(storage), p = mission.chambers[0].paintings[0];
    first.send({ type: 'inspect', paintingId: p.id, hotspotId: p.hotspots[0].id }); first.send({ type: 'choose', paintingId: p.id });
    const restored = runtime(storage); expect(restored.engine.phase).toBe('fraud'); expect(restored.engine.dossier()).toEqual(first.engine.dossier());
  });
  it('does not overwrite a corrupt save until the learner deliberately resets it', () => {
    const save = vi.fn(); const r = runtime({ load: () => [{ id: 'bad', elapsed: 0, command: { type: 'continue' } }], save });
    expect(r.restoreBlocked()).toBe(true); expect(r.send({ type: 'read', evidenceId: mission.evidence[0].id })).toBe(false); expect(save).not.toHaveBeenCalled();
    r.reset(); expect(r.restoreBlocked()).toBe(false); expect(save).toHaveBeenCalledWith([]);
  });
  it('keeps the working evidence exportable if storage writes fail', () => {
    const r = runtime({ load: () => [], save: () => { throw new Error('quota'); } });
    r.send({ type: 'read', evidenceId: mission.evidence[0].id }); expect(r.warning()).toContain('export'); expect(r.engine.dossier().evidenceConsulted).toHaveLength(1);
  });
  it('isolates sessions and detects package changes', () => {
    const session = createLocalPreviewSession('gallery-adapter-test', '1'); const adapter = new LocalGalleryAdapter(session, mission);
    adapter.save([{ id: 'read', elapsed: 0, command: { type: 'read', evidenceId: mission.evidence[0].id } }]); expect(adapter.load()).toHaveLength(1);
    for (const override of [{ actorId: 'different' }, { tenantId: 'different' }, { attemptId: 'different' }, { teamId: 'different' }, { projectVersion: '2' }]) expect(new LocalGalleryAdapter({ ...session, ...override }, mission).load()).toEqual([]);
    expect(() => new LocalGalleryAdapter(session, { ...mission, title: 'Changed package' }).load()).toThrow('does not match'); adapter.save([]);
  });
});
