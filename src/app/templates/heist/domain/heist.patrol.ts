import type { Mission, Patrol, Point } from './heist.models';
import { distance } from './heist.timeline';

export function patrolPosition(guard: Patrol, seconds: number): Point & { facing: number; waiting: boolean } {
  const duration = guard.points.reduce((total, a, i) => total + a.wait + distance(a, guard.points[(i + 1) % guard.points.length]) / guard.speed, 0);
  let t = ((seconds % duration) + duration) % duration;
  for (let i = 0; i < guard.points.length; i++) {
    const a = guard.points[i], b = guard.points[(i + 1) % guard.points.length];
    const facing = Math.atan2(b.y - a.y, b.x - a.x);
    if (t < a.wait) return { x: a.x, y: a.y, facing, waiting: true };
    t -= a.wait;
    const travel = distance(a, b) / guard.speed;
    if (t < travel) return { x: a.x + (b.x - a.x) * t / travel, y: a.y + (b.y - a.y) * t / travel, facing, waiting: false };
    t -= travel;
  }
  return { ...guard.points[0], facing: 0, waiting: true };
}
// Slab intersection includes wall edges: vision cannot pass through blocking geometry.
export function blockedSight(a: Point, b: Point, walls: Mission['walls']): boolean {
  return walls.some(w => {
    let low = 0, high = 1;
    for (const [start, delta, min, max] of [[a.x, b.x - a.x, w.x, w.x + w.width], [a.y, b.y - a.y, w.y, w.y + w.height]]) {
      if (Math.abs(delta) < 1e-10) { if (start < min || start > max) return false; }
      else { const p = (min - start) / delta, q = (max - start) / delta; low = Math.max(low, Math.min(p, q)); high = Math.min(high, Math.max(p, q)); if (low > high) return false; }
    }
    return true;
  });
}
export function sees(m: Mission, guard: Patrol, target: Point, time: number): boolean {
  const p = patrolPosition(guard, time);
  const angle = Math.atan2(target.y - p.y, target.x - p.x) - p.facing;
  return distance(p, target) <= guard.range && Math.abs(Math.atan2(Math.sin(angle), Math.cos(angle))) <= guard.angle * Math.PI / 360 && !blockedSight(p, target, m.walls);
}
