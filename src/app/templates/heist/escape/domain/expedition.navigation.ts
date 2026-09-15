import type { ExpeditionWorldDefinition, WorldPoint } from './expedition.models';

export const worldDistance = (a: WorldPoint, b: WorldPoint): number =>
  Math.hypot(a.x - b.x, a.y - b.y);
function segmentDistance(p: WorldPoint, a: WorldPoint, b: WorldPoint): number {
  const dx = b.x - a.x,
    dy = b.y - a.y;
  const t = Math.max(
    0,
    Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy || 1)),
  );
  return worldDistance(p, { x: a.x + dx * t, y: a.y + dy * t });
}

/** Navigation follows authored open courtyards, never pixels or renderer collision state. */
export class ExpeditionNavigation {
  position: WorldPoint;
  facing = Math.PI / 2;
  moving = false;
  route: WorldPoint[] = [];
  private solved: ReadonlySet<string> = new Set();
  private readonly segments: readonly (readonly [WorldPoint, WorldPoint])[];
  constructor(
    readonly world: ExpeditionWorldDefinition,
    position = world.spawn,
    private readonly allowLockedPaths = false,
  ) {
    this.position = { ...position };
    this.segments = world.paths.map(([a, b]) => [
      world.nodes.find((n) => n.id === a)!,
      world.nodes.find((n) => n.id === b)!,
    ]);
  }
  setSolved(solved: ReadonlySet<string>): void {
    this.solved = new Set(solved);
    this.stop();
  }
  private pathOpen(index: number): boolean {
    if (this.allowLockedPaths) return true;
    const [a, b] = this.world.paths[index];
    return !(this.world.pathLocks ?? []).some(
      (lock) =>
        !this.solved.has(lock.stepId) &&
        lock.paths.some(([x, y]) => (x === a && y === b) || (x === b && y === a)),
    );
  }
  walkable(p: WorldPoint): boolean {
    return (
      Number.isFinite(p.x) &&
      Number.isFinite(p.y) &&
      p.x >= 16 &&
      p.y >= 16 &&
      p.x <= this.world.width - 16 &&
      p.y <= this.world.height - 16 &&
      this.segments.some(
        ([a, b], i) => this.pathOpen(i) && segmentDistance(p, a, b) <= this.world.pathRadius,
      )
    );
  }
  /** Dijkstra over a small authored graph; unobstructed local movement stays direct. */
  navigate(destination: WorldPoint): boolean {
    if (!this.walkable(destination)) return false;
    if (this.lineClear(this.position, destination)) {
      this.route = [{ ...destination }];
      return true;
    }
    const nodes = [
      { id: '__start', ...this.position },
      ...this.world.nodes,
      { id: '__end', ...destination },
    ];
    const costs = new Map<string, number>([['__start', 0]]),
      previous = new Map<string, string>();
    const open = new Set(nodes.map((n) => n.id));
    while (open.size) {
      const id = [...open].sort(
        (a, b) => (costs.get(a) ?? Infinity) - (costs.get(b) ?? Infinity),
      )[0];
      if (!Number.isFinite(costs.get(id))) break;
      open.delete(id);
      if (id === '__end') break;
      const node = nodes.find((n) => n.id === id)!;
      for (const other of nodes) {
        if (!open.has(other.id) || !this.lineClear(node, other)) continue;
        const cost = costs.get(id)! + worldDistance(node, other);
        if (cost < (costs.get(other.id) ?? Infinity)) {
          costs.set(other.id, cost);
          previous.set(other.id, id);
        }
      }
    }
    if (!previous.has('__end')) return false;
    const route: WorldPoint[] = [];
    let id = '__end';
    while (id !== '__start') {
      route.unshift(nodes.find((n) => n.id === id)!);
      id = previous.get(id)!;
    }
    this.route = route;
    return true;
  }
  tick(deltaSeconds: number, direction: WorldPoint): void {
    const dt = Math.max(0, Math.min(0.05, Number.isFinite(deltaSeconds) ? deltaSeconds : 0));
    this.moving = false;
    const input = Math.hypot(direction.x, direction.y);
    if (Number.isFinite(input) && input > 0) {
      this.route = [];
      this.move(
        (direction.x / input) * this.world.speed * dt,
        (direction.y / input) * this.world.speed * dt,
      );
      return;
    }
    const next = this.route[0];
    if (!next) return;
    const d = worldDistance(this.position, next),
      step = this.world.speed * dt;
    if (d <= step) {
      this.position = { x: next.x, y: next.y };
      this.route.shift();
      this.moving = d > 0;
    } else
      this.move(((next.x - this.position.x) / d) * step, ((next.y - this.position.y) / d) * step);
  }
  stop(): void {
    this.route = [];
    this.moving = false;
  }
  private move(dx: number, dy: number): void {
    let next = { x: this.position.x + dx, y: this.position.y + dy };
    if (!this.walkable(next)) {
      next = { x: this.position.x + dx, y: this.position.y };
      if (!this.walkable(next)) next = { x: this.position.x, y: this.position.y + dy };
    }
    if (this.walkable(next) && worldDistance(next, this.position) > 0.001) {
      this.facing = Math.atan2(next.y - this.position.y, next.x - this.position.x);
      this.position = next;
      this.moving = true;
    }
  }
  private lineClear(a: WorldPoint, b: WorldPoint): boolean {
    const steps = Math.ceil(worldDistance(a, b) / 10);
    for (let i = 0; i <= steps; i++) {
      const t = i / (steps || 1);
      if (!this.walkable({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })) return false;
    }
    return true;
  }
}
