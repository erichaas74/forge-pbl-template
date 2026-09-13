import data from '../../../../../../public/projects/shadow-gallery/versions/1.1.0/project.json';
import legacy from '../../../../../../public/projects/shadow-gallery/project.json';
import { GalleryEngine } from './gallery.engine';
import type { EncounterAction } from '../../../../shared/encounters/encounter.models';
import { requireGalleryMission } from './gallery.validation';

const mission = requireGalleryMission(data), definition = mission.encounters![0];
describe('Gallery encounter integration', () => {
  function session() {
    const engine = new GalleryEngine(mission); let index = 0;
    const act = (action: EncounterAction) => engine.dispatch({ id: `e-${++index}`, elapsed: index, command: { type: 'encounter', encounterId: definition.id, action } });
    const access = () => {
      act({ type: 'enter' }); act({ type: 'view', viewId: 'listening-place' }); act({ type: 'chapter', chapterId: definition.chapters[0].id });
      act({ type: 'view', viewId: 'conversation' }); act({ type: 'question', questionId: definition.questions[0].id });
      act({ type: 'view', viewId: 'canoe-landing' }); act({ type: 'feature', featureId: definition.object.features[0].id });
    };
    return { engine, act, access };
  }
  it('requires entry, blocks underlying gallery mutations and leaves the painting assessment untouched', () => {
    const { engine, act, access } = session();
    expect(act({ type: 'view', viewId: 'conversation' })).toBe(false);
    access();
    expect(engine.dispatch({ id: 'background', elapsed: 100, command: { type: 'inspect', paintingId: mission.chambers[0].paintings[0].id, hotspotId: mission.chambers[0].paintings[0].hotspots[0].id } })).toBe(false);
    expect(act({ type: 'insight', evidenceId: definition.insight.answerEvidenceId, relationship: definition.insight.relationship })).toBe(true);
    expect(engine.facts).toContain('exchange-origins'); expect(engine.phase).toBe('recon'); expect(engine.frauds).toEqual([]); expect(engine.inspections).toEqual({});
    expect(engine.encounterRecords()[0].insight?.source?.id).toBe('exchange-origins');
    expect(act({ type: 'exit' })).toBe(true); expect(engine.activeEncounterId).toBeUndefined();
    expect(act({ type: 'insight', evidenceId: 'exchange-origins', relationship: 'contradicts' })).toBe(false);
  });
  it('restores the exact encounter checkpoint and exports the recorded perspective, observations and insight', () => {
    const { engine, act, access } = session(); access();
    act({ type: 'insight', evidenceId: 'exchange-origins', relationship: 'contradicts' });
    const restored = new GalleryEngine(mission);
    for (const event of engine.events) expect(restored.dispatch(event)).toBe(true);
    expect(restored.snapshot()).toEqual(engine.snapshot()); expect(restored.dossier()).toEqual(engine.dossier());
    expect(restored.activeEncounterId).toBe(definition.id);
    expect(restored.encounterRecords()[0].chapters).toHaveLength(1);
    expect(restored.encounterRecords()[0].observations).toHaveLength(1);
    expect(restored.dispatch(engine.events[0])).toBe(false);
    act({ type: 'exit' }); act({ type: 'enter' });
    expect(engine.encounterRecords()).toHaveLength(1); expect(engine.facts.filter(id => id === 'exchange-origins')).toHaveLength(1);
  });
  it('keeps old packages valid and rejects encounters in an unsupported schema or inaccessible room', () => {
    const old = new GalleryEngine(requireGalleryMission(legacy));
    expect(old.snapshot().encounters).toBeUndefined();
    expect(old.dispatch({ id: 'enter', elapsed: 0, command: { type: 'encounter', encounterId: definition.id, action: { type: 'enter' } } })).toBe(false);
    expect(() => requireGalleryMission({ ...data, schemaVersion: '1.1' })).toThrow('schema 1.2');
    const engine = new GalleryEngine(requireGalleryMission({ ...data, encounters: [{ ...definition, chamberIds: ['vault'] }] }));
    expect(engine.dispatch({ id: 'future', elapsed: 0, command: { type: 'encounter', encounterId: definition.id, action: { type: 'enter' } } })).toBe(false);
  });
});
