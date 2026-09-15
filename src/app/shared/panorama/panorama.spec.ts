import { describe, expect, it } from 'vitest';
import fixture from '../../../../public/projects/shadow-gallery/versions/2.0.0/project.json';
import { initialPanoramaState } from './panorama.models';
import { matchTopic, transitionPanorama } from './panorama.engine';
import { requirePanorama, requirePanoramaState } from './panorama.validation';
import { ScriptedPanoramaInterview } from './panorama-interview.adapter';
const scene = requirePanorama(fixture.previewWeeks.scenes[0]);
describe('Panorama encounter domain', () => {
  it('validates configured scenes and rejects invalid references, bounds and required media', () => {
    expect(scene.repairs).toHaveLength(3);
    expect(() => requirePanorama({ ...scene, capability: 'unknown' })).toThrow('CAPABILITY_NOT_INSTALLED');
    expect(() => requirePanorama({ ...scene, people: [{ ...scene.people[0], rect: { x: 99, y: 0, width: 5, height: 20 } }] })).toThrow('INVALID_PANORAMA');
    expect(() => requirePanorama({ ...scene, repairs: [{ ...scene.repairs[0], sourceIds: ['missing'] }] })).toThrow('INVALID_PANORAMA');
    expect(() => requirePanorama({ ...scene, people: [{ ...scene.people[0], approach: { src: 'javascript:alert(1)', captions: '', transcript: '' } }] })).toThrow('INVALID_PANORAMA');
  });
  it('changes all three repairs independently and undoes only the last change', () => {
    let state = initialPanoramaState();
    for (const r of scene.repairs) state = transitionPanorama(scene, state, { type: 'repair', repairId: r.id, applied: true })!;
    expect(Object.values(state.repairs)).toEqual([true, true, true]);
    state = transitionPanorama(scene, state, { type: 'undo' })!;
    expect(state.repairs['herd']).toBe(true); expect(state.repairs['fasteners']).toBe(true); expect(state.repairs['harvest']).toBe(false);
    expect(transitionPanorama(scene, state, { type: 'repair', repairId: 'missing', applied: true })).toBeUndefined();
    expect(requirePanoramaState(JSON.parse(JSON.stringify(state)), scene)).toEqual(state);
  });
  it('keeps viewing direction, visits, conversations and intentionally removed evidence', () => {
    let s = transitionPanorama(scene, initialPanoramaState(), { type: 'view', heading: 73 })!;
    s = transitionPanorama(scene, s, { type: 'visit', personId: 'canoe-maker' })!;
    s = transitionPanorama(scene, s, { type: 'collect', sourceId: 'canoe-tools' })!;
    s = transitionPanorama(scene, s, { type: 'collect', sourceId: 'canoe-tools' })!;
    s = transitionPanorama(scene, s, { type: 'conversation', personId: 'canoe-maker', question: 'How?', answer: { role: 'character', text: 'Prepared answer', sourceIds: ['canoe-tools'] } })!;
    const reloaded = requirePanoramaState(JSON.parse(JSON.stringify(s)), scene);
    expect(reloaded.heading).toBe(73); expect(reloaded.collected).toEqual([]); expect(reloaded.conversations['canoe-maker']).toHaveLength(2);
    expect(() => requirePanoramaState({ ...s, repairs: { missing: true } }, scene)).toThrow('INVALID_PANORAMA');
  });
  it('answers construction only when asked and does not claim scripted matching is AI', async () => {
    const builder = scene.people[0], adapter = new ScriptedPanoramaInterview();
    expect(adapter.mode).toBe('scripted'); expect(builder.welcome).not.toContain('stone');
    expect(matchTopic(builder, 'How was this boat built?')?.id).toBe('construction');
    expect(matchTopic(builder, 'Do you use screws to fix this?')?.id).toBe('repair');
    const known = await adapter.answer(scene, builder, 'How did you make this canoe?');
    expect(known.text).toContain('one tree trunk'); expect(known.sourceIds).toContain('canoe-construction');
    const unknown = await adapter.answer(scene, builder, 'What is quantum physics?');
    expect(unknown.text).toContain('do not have a prepared answer'); expect(unknown.sourceIds).toEqual([]);
  });
});
