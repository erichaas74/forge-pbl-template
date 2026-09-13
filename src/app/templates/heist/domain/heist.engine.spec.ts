import data from '../testing/castle-advanced.fixture.json';
import harborData from '../../../../../public/projects/harbor-records-rescue/project.json';
import { HeistEngine } from './heist.engine';
import { requireMission } from './heist.validation';
import { correct, measure, position, readiness, timeline } from './heist.timeline';
import { blockedSight, patrolPosition, sees } from './heist.patrol';
import type { Mission } from './heist.models';

const mission = requireMission(data);
const safe: Mission = { ...mission, guards: [], gate: { ...mission.gate, openSeconds: 60 } };
function planned(m = safe, wait = 0): HeistEngine {
  const e = new HeistEngine(m);
  e.dispatch({ type: 'plan' });
  for (const id of ['market', 'gate', 'hall', 'archive', 'bridge', 'river']) e.dispatch({ type: 'node', id });
  e.dispatch({ type: 'pickup', enabled: true });
  e.dispatch({ type: 'wait', index: 1, seconds: wait });
  return e;
}
function solve(e: HeistEngine): void { for (const c of e.challenges) e.dispatch({ type: 'answer', id: c.id, answer: c.answer, unit: c.unit }); }
function crisis(e: HeistEngine, response = 'team'): void {
  const q = e.mission.crisis.challenge;
  e.dispatch({ type: 'answer', id: q.id, answer: q.answer, unit: q.unit });
  e.dispatch({ type: 'respond', id: response });
}
describe('Heist planning and deterministic execution', () => {
  it('validates the mission and rejects malformed, disconnected and blocked packages', () => {
    expect(mission.locations).toHaveLength(8);
    for (const invalid of [null, {}, { ...data, schemaVersion: '2' }, { ...data, speed: 0 }, { ...data, locations: [null] }, { ...data, guards: [null] }, { ...data, routes: [] }, { ...data, walls: [{ x: 90, y: 510, width: 80, height: 30 }] }, { ...data, math: { ...data.math, required: [null] } }]) expect(() => requireMission(invalid)).toThrow('INVALID_HEIST_CONFIG');
  });
  it('converts pixels through the map scale and calculates movement at the carrying rate', () => {
    expect(measure(mission, { x: 0, y: 0 }, { x: 180, y: 0 })).toMatchObject({ cm: 9, meters: 90 });
    const actions = planned().predicted;
    expect(actions[0].end).toBe(45);
    const carrying = actions.find(a => a.from === 'archive' && a.type === 'MOVE')!;
    expect(carrying.speed).toBe(1.5); expect(carrying.end - carrying.start).toBe(60);
  });
  it('shifts every later action by the wait duration', () => {
    const baseline = planned().predicted, waiting = planned(safe, 35).predicted;
    expect(waiting.at(-1)!.end - baseline.at(-1)!.end).toBeCloseTo(35);
  });
  it('requires extraction, pickup, and every math answer before locking', () => {
    const e = planned(); expect(() => e.dispatch({ type: 'lock' })).toThrow('calculations');
    solve(e); expect(e.problems).toEqual([]);
    expect(readiness(safe, { ...e.plan, pickup: false }).join(' ')).toContain('pickup');
    expect(readiness(safe, { ...e.plan, nodes: e.plan.nodes.slice(0, -1) }).join(' ')).toContain('extraction');
    expect(() => e.dispatch({ type: 'node', id: 'entry' })).toThrow('open path');
  });
  it('handles tolerance, units, percent change and rate calculations', () => {
    const q = mission.crisis.challenge;
    expect(correct(q, 63.1, 'kg')).toBe(true); expect(correct(q, 63.2, 'kg')).toBe(false);
    expect(correct(q, 63, 'g')).toBe(false); expect(correct(q, NaN, 'kg')).toBe(false);
    const e = planned(); const time = e.challenges.find(c => c.id === 'time-0')!;
    expect(correct(time, 45, 's')).toBe(true);
  });
  it('invalidates previously correct travel math when pickup changes speed', () => {
    const e = planned(); solve(e); e.dispatch({ type: 'pickup', enabled: false });
    expect(e.problems.join(' ')).toContain('calculations');
  });
  it('locks an immutable plan and pauses at crisis without skipping pickup', () => {
    const e = planned(); solve(e); e.dispatch({ type: 'lock' });
    expect(Object.isFrozen(e.locked?.nodes)).toBe(true);
    expect(() => e.dispatch({ type: 'undo' })).toThrow('locked');
    e.advance(420); expect(e.mode).toBe('CRISIS'); expect(e.secured).toBe(true);
    const paused = e.time; e.advance(420); expect(e.time).toBe(paused);
    expect(() => e.dispatch({ type: 'respond', id: 'team' })).toThrow('mathematics');
    const q = mission.crisis.challenge; e.dispatch({ type: 'answer', id: q.id, answer: 63, unit: 'kg' });
    expect(() => e.dispatch({ type: 'respond', id: 'cart' })).toThrow('capacity');
  });
  it('preserves prediction and completes the altered timeline with evidence', () => {
    const e = planned(); solve(e); e.dispatch({ type: 'lock' }); const before = JSON.stringify(e.locked);
    e.advance(420); crisis(e); const revised = e.actual.at(-1)!.end;
    expect(revised).toBeGreaterThan(e.predicted.at(-1)!.end);
    expect(e.actual.find(a => a.from === 'archive' && a.type === 'MOVE')!.speed).toBe(1.125);
    e.advance(420); expect(e.mode).toBe('SUCCESS'); expect(e.time).toBeCloseTo(Math.ceil(revised * 10) / 10, 6);
    expect(JSON.stringify(e.locked)).toBe(before); expect(e.events.at(-1)?.type).toBe('EXTRACTED');
    expect(e.events.map(x => x.time)).toEqual(e.events.map(x => x.time).sort((a, b) => a - b));
  });
  it('uses identical positions and outcomes regardless of frame chunk size', () => {
    const one = planned(), many = planned();
    for (const e of [one, many]) { solve(e); e.dispatch({ type: 'lock' }); }
    one.advance(100);
    for (let i = 1; i <= 1000; i++) many.advance(i / 10);
    expect(position(safe, one.actual, one.time)).toEqual(position(safe, one.predicted, 100));
    expect(many.events).toEqual(one.events); expect(many.time).toBe(one.time);
  });
  it('records missed gate and deadline failures', () => {
    const closed = planned({ ...safe, gate: { ...safe.gate, openSeconds: 20 } }); solve(closed); closed.dispatch({ type: 'lock' }); closed.advance(420);
    expect(closed.mode).toBe('FAILURE'); expect(closed.events.at(-1)?.message).toContain('Gate');
    const late = planned({ ...safe, deadline: 360 }); solve(late); late.dispatch({ type: 'lock' }); late.advance(360); crisis(late); late.advance(360);
    expect(late.mode).toBe('FAILURE'); expect(late.events.at(-1)?.message).toContain('roads');
  });
  it('records deterministic detection and protects line of sight behind walls', () => {
    const guard = { id: 'test', name: 'test', speed: 1, points: [{ x: 100, y: 520, wait: 100 }, { x: 200, y: 520, wait: 0 }], range: 100, angle: 120 };
    expect(sees(safe, guard, { x: 130, y: 520 }, 1)).toBe(true);
    expect(blockedSight({ x: 0, y: 5 }, { x: 100, y: 5 }, [{ x: 40, y: 0, width: 20, height: 10 }])).toBe(true);
    const e = planned({ ...safe, guards: [guard] }); solve(e); e.dispatch({ type: 'lock' }); e.advance(30);
    expect(e.mode).toBe('FAILURE'); expect(e.events.some(x => x.type === 'DETECTED')).toBe(true);
  });
  it('repeats patrols including waypoint waits', () => {
    const g = { ...mission.guards[0], points: [{ x: 0, y: 0, wait: 2 }, { x: 20, y: 0, wait: 3 }], speed: 10 };
    expect(patrolPosition(g, 1).waiting).toBe(true); expect(patrolPosition(g, 3).x).toBe(10);
    expect(patrolPosition(g, 3)).toEqual(patrolPosition(g, 12));
  });
  it('has an achievable castle operation with all three guards and a near miss', () => {
    const e = planned(mission, 8); solve(e); e.dispatch({ type: 'lock' }); e.advance(420);
    expect(e.mode).toBe('CRISIS'); crisis(e); e.advance(420);
    expect(e.mode).toBe('SUCCESS'); expect(e.time).toBe(407.8);
    expect(e.events.some(v => v.type === 'NEAR_MISS')).toBe(true);
  });
  it('runs a second mission with different scale, nodes, target, patrol and crisis without engine changes', () => {
    const harbor = requireMission(harborData); const e = new HeistEngine(harbor);
    e.dispatch({ type: 'node', id: 'store' }); e.dispatch({ type: 'node', id: 'ship' }); e.dispatch({ type: 'pickup', enabled: true });
    solve(e); e.dispatch({ type: 'lock' }); e.advance(160); expect(e.mode).toBe('CRISIS');
    crisis(e, 'steady'); e.advance(160); expect(e.mode).toBe('SUCCESS');
  });
  it('does not allow invalid waits or nonfinite math to poison the timeline', () => {
    const e = planned();
    for (const seconds of [-1, NaN, Infinity, 10000]) expect(() => e.dispatch({ type: 'wait', index: 1, seconds })).toThrow();
    expect(() => e.dispatch({ type: 'wait', index: 100, seconds: 1 })).toThrow();
    expect(timeline(safe, e.plan).every(a => Number.isFinite(a.end))).toBe(true);
  });
});
