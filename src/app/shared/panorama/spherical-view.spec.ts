import { describe, expect, it } from 'vitest';
import fixture from '../../../../public/projects/shadow-gallery/versions/2.0.0/project.json';
import { clampPitch, viewDirection, wrapYaw } from './spherical-view.math';
import { requirePanorama, requirePanoramaState } from './panorama.validation';
import { initialPanoramaState } from './panorama.models';
import { transitionPanorama } from './panorama.engine';
const scene = requirePanorama(fixture.previewWeeks.scenes[0]);
describe('Spherical scene navigation', () => {
  it('wraps continuously through a full turn and reaches sky and ground', () => {
    expect(wrapYaw(180)).toBe(-180); expect(wrapYaw(360)).toBe(0); expect(wrapYaw(-540)).toBe(-180);
    expect(clampPitch(120)).toBe(89.9); expect(clampPitch(-120)).toBe(-89.9);
    expect(viewDirection(0, 0)[0]).toBeCloseTo(-1); expect(viewDirection(0, 89.9)[1]).toBeCloseTo(1);
  });
  it('validates three viewpoints and rejects malformed images/people references', () => {
    expect(scene.viewpoints).toHaveLength(3); expect(scene.questionOwner).toBe('tutor');
    expect(() => requirePanorama({ ...scene, viewpoints: [{ ...scene.viewpoints![0], image: 'javascript:alert(1)' }] })).toThrow('INVALID_PANORAMA');
    expect(() => requirePanorama({ ...scene, viewpoints: [{ ...scene.viewpoints![0], people: [{ personId: 'missing', rect: { x: 0, y: 0, width: 10, height: 10 } }] }] })).toThrow('INVALID_PANORAMA');
  });
  it('retains selected person and exact viewpoint across saving and reopening', () => {
    const view = { viewpointId: 'canoe', yaw: -160, pitch: -50, fov: 45 };
    let state = transitionPanorama(scene, initialPanoramaState(), { type: 'spherical-view', view })!;
    state = transitionPanorama(scene, state, { type: 'visit', personId: 'canoe-maker' })!;
    const saved = requirePanoramaState(JSON.parse(JSON.stringify(state)), scene);
    expect(saved.sphericalView).toEqual(view); expect(saved.selectedPersonId).toBe('canoe-maker');
    expect(transitionPanorama(scene, state, { type: 'spherical-view', view: { ...view, viewpointId: 'missing' } })).toBeUndefined();
    expect(() => requirePanoramaState({ ...state, sphericalView: { ...view, pitch: 100 } }, scene)).toThrow('INVALID_PANORAMA');
  });
  it('connects both detailed places back to the village and rejects invalid destinations', () => {
    const village = scene.viewpoints!.find(v => v.id === 'village')!;
    expect(village.places!.map(p => p.targetId)).toEqual(['canoe', 'harvest']);
    for (const place of village.places!) expect(scene.viewpoints!.find(v => v.id === place.targetId)!.places![0].targetId).toBe('village');
    const invalid = { ...village, places: [{ targetId: 'missing', label: 'Go', yaw: 0, pitch: 0 }] };
    expect(() => requirePanorama({ ...scene, viewpoints: [invalid, ...scene.viewpoints!.slice(1)] })).toThrow('INVALID_PANORAMA');
  });
});
