import data from '../testing/castle-advanced.fixture.json';
import harbor from '../../../../../public/projects/harbor-records-rescue/project.json';
import { HeistEngine } from '../domain/heist.engine';
import { requireMission } from '../domain/heist.validation';
import { gameplayFingerprint } from '../domain/heist.fingerprint';
import { PresentationEvents, spriteFrame, teamPresentation } from './presentation-state';
import { position } from '../domain/heist.timeline';
import type { HeistEvent } from '../domain/heist.models';

describe('Heist presentation without gameplay changes', () => {
  const mission = requireMission(data);
  it('keeps pre-upgrade save fingerprints, while retaining all gameplay and identity checks', () => {
    const { presentation, ...legacy } = data;
    expect(gameplayFingerprint(mission)).toBe(JSON.stringify(legacy));
    expect(gameplayFingerprint(requireMission({ ...data, presentation: { ...presentation, ground: '/new-art.png' } }))).toBe(gameplayFingerprint(mission));
    for (const change of [{ speed: 3 }, { projectVersion: '2' }, { deadline: 430 }, { map: { ...data.map, pixelsPerCm: 25 } }]) {
      expect(gameplayFingerprint(requireMission({ ...data, ...change }))).not.toBe(gameplayFingerprint(mission));
    }
    expect(requireMission(harbor).presentation).toBeUndefined();
  });
  it('rejects malformed or remote art without accepting invalid mission data', () => {
    expect(() => requireMission({ ...data, presentation: { ...data.presentation, characters: 'https://example.com/a.png' } })).toThrow('presentation');
    expect(() => requireMission({ ...data, presentation: { ...data.presentation, buildingFrames: [] } })).toThrow('artwork');
    expect(() => requireMission({ ...data, speed: 0 })).toThrow();
  });
  it('renders exact positions and reconstructs cargo through pickup, crisis, carry, extraction and backward replay', () => {
    const engine = new HeistEngine(mission);
    for (const id of ['market', 'gate', 'hall', 'archive', 'bridge', 'river']) engine.dispatch({ type: 'node', id });
    engine.dispatch({ type: 'wait', index: 1, seconds: 8 }); engine.dispatch({ type: 'pickup', enabled: true });
    for (const q of engine.challenges) engine.dispatch({ type: 'answer', id: q.id, answer: q.answer, unit: q.unit });
    engine.dispatch({ type: 'lock' }); engine.advance(420);
    expect(engine.mode).toBe('CRISIS');
    const at = (time: number) => teamPresentation(mission, { time, actions: engine.actual, events: engine.events, response: engine.response });
    expect(at(engine.time).pose).toBe('broken');
    const pickup = engine.actual.find(a => a.type === 'PICKUP')!;
    expect(at(pickup.start + 2).pose).toBe('pickup');
    engine.dispatch({ type: 'answer', id: mission.crisis.challenge.id, answer: 63, unit: 'kg' }); engine.dispatch({ type: 'respond', id: 'team' });
    engine.advance(420); expect(engine.mode).toBe('SUCCESS');
    expect(at(300).pose).toBe('carry'); expect(at(engine.time).pose).toBe('extracted'); expect(at(0).pose).toBe('empty');
    expect(at(305.4).point).toEqual(position(mission, engine.actual, 305.4));
    expect(at(49).moving).toBe(false);
  });
  it('does not replay stale bursts on restore or seeking and deduplicates repeated frames', () => {
    const events: HeistEvent[] = [{ time: 10, type: 'CRISIS', message: 'Paused' }, { time: 20, type: 'EXTRACTED', message: 'Safe' }];
    const stream = new PresentationEvents();
    expect(stream.consume(9.5, events)).toEqual([]);
    expect(stream.consume(10, events)).toEqual([events[0]]);
    expect(stream.consume(10, events)).toEqual([]);
    expect(stream.consume(20, events)).toEqual([]);
    expect(stream.consume(9.5, events)).toEqual([]);
    expect(stream.consume(10, events)).toEqual([events[0]]);
  });
  it('uses the same animation frame while paused and preserves cardinal facing when idle', () => {
    expect(spriteFrame(Math.PI, true, 2.3)).toBe(spriteFrame(Math.PI, true, 2.3));
    expect(spriteFrame(Math.PI, true, 2.3)).not.toBe(spriteFrame(Math.PI, true, 2.1));
    expect(spriteFrame(-Math.PI / 2, false, 15, true)).toBe(11);
    expect(spriteFrame(0, false, 12)).toBe(0);
  });
});
