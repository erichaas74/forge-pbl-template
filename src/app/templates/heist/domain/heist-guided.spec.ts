import data from '../testing/castle-guided.fixture.json';
import advanced from '../testing/castle-advanced.fixture.json';
import { HeistEngine } from './heist.engine';
import { requireMission } from './heist.validation';

const mission = requireMission(data);
function prepare(route = 'courtyard'): HeistEngine {
  const engine = new HeistEngine(mission);
  engine.dispatch({ type: 'route', id: route });
  for (const [id, answer, unit] of [['distance-0', 90, 'm'], ['time-0', 45, 's'], ['capacity', 20, 'kg']] as const) {
    engine.dispatch({ type: 'answer', id, answer, unit });
  }
  return engine;
}
describe('Guided rescue missions', () => {
  it('requires exactly three whole-number questions and includes pickup in a selected path', () => {
    const e = new HeistEngine(mission);
    e.dispatch({ type: 'route', id: 'courtyard' });
    expect(e.challenges.map(q => q.answer)).toEqual([90, 45, 20]);
    expect(e.plan.pickup).toBe(true);
    expect(() => e.dispatch({ type: 'lock' })).toThrow('3 required');
    expect(prepare().problems).toEqual([]);
    expect(prepare().predicted.at(-1)?.end).toBe(305);
    expect(prepare('tower').predicted.at(-1)?.end).toBe(365);
  });
  it.each([
    ['courtyard', 'team', 415], ['courtyard', 'repair', 335],
    ['tower', 'team', 475], ['tower', 'repair', 395],
  ])('finishes %s with %s without manual waits (%i seconds)', (route, choice, seconds) => {
    const e = prepare(route);
    e.dispatch({ type: 'lock' }); e.advance(600);
    expect(e.mode).toBe('CRISIS');
    const pause = e.time; e.advance(600); expect(e.time).toBe(pause);
    expect(() => e.dispatch({ type: 'respond', id: choice })).toThrow('mathematics');
    e.dispatch({ type: 'answer', id: 'crisis-capacity', answer: 50, unit: 'kg' });
    e.dispatch({ type: 'respond', id: choice }); e.advance(600);
    expect(e.mode).toBe('SUCCESS'); expect(e.time).toBe(seconds);
  });
  it('preserves the original full-math mission and rejects malformed guided paths', () => {
    const old = new HeistEngine(requireMission(advanced));
    for (const id of ['market', 'gate', 'hall', 'archive', 'bridge', 'river']) old.dispatch({ type: 'node', id });
    expect(old.challenges).toHaveLength(14);
    expect(() => old.dispatch({ type: 'route', id: 'courtyard' })).toThrow('available paths');
    const route = data.guidance.routes[0];
    for (const routes of [[], [null], [route, route], [{...route, nodes:['entry','market','bridge','river']}], [{...route, nodes:['entry','market']}], [{...route, nodes:['entry','missing','river']}]]) {
      expect(() => requireMission({...data, guidance:{routes}})).toThrow('Guided paths');
    }
    expect(() => requireMission({...data, math:{...data.math, routeChecks:'none'}})).toThrow('route math');
  });
  it('switches paths without extra math and rejects unknown or locked path changes', () => {
    const e = prepare();
    e.dispatch({ type: 'route', id: 'tower' });
    expect(e.challenges).toHaveLength(3); expect(e.problems).toEqual([]);
    const before = structuredClone(e.plan);
    expect(() => e.dispatch({type:'route',id:'missing'})).toThrow(); expect(e.plan).toEqual(before);
    e.dispatch({type:'lock'}); expect(() => e.dispatch({type:'route',id:'courtyard'})).toThrow('locked');
  });
});
