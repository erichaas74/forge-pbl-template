import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import previous from '../../testing/castle-escape-v3.3.fixture.json';
import old from '../../testing/castle-escape-v2.fixture.json';
import { requireEscapeMission } from './escape.validation';
import { ExpeditionNavigation, worldDistance } from './expedition.navigation';

const mission = requireEscapeMission(data),
  world = mission.world!;
describe('Expedition world and navigation', () => {
  it('walks the complete mission route without entering a wall or water', () => {
    const nav = new ExpeditionNavigation(world);
    const solved = new Set<string>();
    for (const step of mission.steps) {
      const point = { x: (step.x / 100) * world.width, y: (step.y / 100) * world.height };
      expect(nav.navigate(point)).toBe(true);
      for (let i = 0; nav.route.length && i < 4000; i++) {
        nav.tick(1 / 60, { x: 0, y: 0 });
        expect(nav.walkable(nav.position)).toBe(true);
      }
      expect(nav.route).toHaveLength(0);
      expect(worldDistance(nav.position, point)).toBeLessThan(1);
      solved.add(step.id);
      nav.setSolved(solved);
    }
  });
  it('blocks mouse and keyboard entry until the gate is solved, and relocks on reset', () => {
    const nav = new ExpeditionNavigation(world);
    const inside = world.nodes.find((node) => node.id === 'inner-gate')!;
    expect(nav.navigate(inside)).toBe(false);
    for (let i = 0; i < 200; i++) nav.tick(0.05, { x: 1, y: -1 });
    expect(nav.position.x).toBeLessThan(270);
    expect(nav.position.y).toBeGreaterThan(840);
    nav.setSolved(new Set(['census']));
    expect(nav.navigate(inside)).toBe(true);
    for (let i = 0; nav.route.length && i < 1000; i++) nav.tick(0.05, { x: 0, y: 0 });
    expect(worldDistance(nav.position, inside)).toBeLessThan(1);
    nav.position = { ...world.spawn };
    nav.setSolved(new Set());
    expect(nav.navigate(inside)).toBe(false);
  });
  it('bounds frame time, normalizes diagonals, and rejects inaccessible clicks', () => {
    const a = new ExpeditionNavigation(world),
      b = new ExpeditionNavigation(world);
    a.tick(10, { x: 1, y: 0 });
    b.tick(10, { x: 1, y: 1 });
    expect(worldDistance(world.spawn, a.position)).toBeCloseTo(world.speed * 0.05);
    expect(worldDistance(world.spawn, b.position)).toBeCloseTo(world.speed * 0.05);
    expect(a.navigate({ x: 1360, y: 400 })).toBe(false);
    expect(a.navigate({ x: NaN, y: 10 })).toBe(false);
    for (let i = 0; i < 1000; i++) a.tick(0.05, { x: -1, y: -1 });
    expect(a.walkable(a.position)).toBe(true);
  });
  it('validates path references, spawn, reachability, atlases, and visual bounds', () => {
    const invalid = [
      { ...world, paths: [['entry', 'missing']] },
      { ...world, spawn: { x: 20, y: 20 } },
      { ...world, paths: [['entry', 'gate']] },
      { ...world, pathLocks: [{ stepId: 'missing', paths: [['entry', 'gate']] }] },
      { ...world, pathLocks: [{ stepId: 'census', paths: [['entry', 'missing']] }] },
      { ...world, animalAtlas: 'https://untrusted.example/a.png' },
      { ...world, animalRows: { ...world.animalRows, rabbits: 3 } },
    ];
    for (const value of invalid)
      expect(() => requireEscapeMission({ ...data, world: value })).toThrow(
        'INVALID_HEIST_EXPEDITION',
      );
    const steps = previous.steps.map((s, i) =>
      i === 2
        ? { ...s, puzzle: { ...s.puzzle, visual: { kind: 'groups', count: 100000, amount: 2 } } }
        : s,
    );
    expect(() => requireEscapeMission({ ...previous, steps })).toThrow();
    expect(requireEscapeMission(old).world).toBeUndefined();
  });
});
