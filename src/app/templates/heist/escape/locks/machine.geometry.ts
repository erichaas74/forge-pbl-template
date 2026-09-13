import type { Cable, Coordinate, Point, Reflection, Segment } from './machine.models';
const cross = (a: Point, b: Point) => a.x * b.y - a.y * b.x;
const sub = (a: Point, b: Point): Point => ({ x: a.x - b.x, y: a.y - b.y });
export function coordinateTarget(d: Coordinate): Point {
  const g = d.goal;
  if (g.mode === 'point') return g.point;
  if (g.mode === 'transform')
    return { x: g.start.x * g.scale + g.shift.x, y: g.start.y * g.scale + g.shift.y };
  const [a, b] = g.lines,
    determinant = a.a * b.b - b.a * a.b;
  return { x: (a.c * b.b - b.c * a.b) / determinant, y: (a.a * b.c - b.a * a.c) / determinant };
}
export function cableLength(d: Cable): number {
  if (d.mode === 'diagonal')
    return Math.hypot(d.route[1].x - d.route[0].x, d.route[1].y - d.route[0].y) * d.scale;
  return d.route
    .slice(1)
    .reduce((sum, p, i) => sum + Math.hypot(p.x - d.route[i].x, p.y - d.route[i].y) * d.scale, 0);
}
export function mirrorSegment(d: Reflection, index: number, angle: number): Segment {
  const m = d.mirrors[index],
    a = (angle * Math.PI) / 180,
    dx = (Math.cos(a) * m.length) / 2,
    dy = (Math.sin(a) * m.length) / 2;
  return {
    a: { x: m.center.x - dx, y: m.center.y - dy },
    b: { x: m.center.x + dx, y: m.center.y + dy },
  };
}
function raySegment(origin: Point, direction: Point, segment: Segment): number | null {
  const v = sub(segment.b, segment.a),
    w = sub(segment.a, origin),
    den = cross(direction, v);
  if (Math.abs(den) < 1e-9) return null;
  const t = cross(w, v) / den,
    u = cross(w, direction) / den;
  return t > 1e-6 && u >= 0 && u <= 1 ? t : null;
}
export interface BeamTrace {
  readonly points: readonly Point[];
  readonly hit: boolean;
  readonly reason: 'receiver' | 'blocked' | 'miss' | 'bounce-limit';
}
export function traceBeam(d: Reflection, angles: readonly number[]): BeamTrace {
  let origin = { ...d.emitter },
    dir = {
      x: Math.cos((d.direction * Math.PI) / 180),
      y: Math.sin((d.direction * Math.PI) / 180),
    };
  const points: Point[] = [origin];
  const walls: Segment[] = [
    { a: { x: 0, y: 0 }, b: { x: 10, y: 0 } },
    { a: { x: 10, y: 0 }, b: { x: 10, y: 8 } },
    { a: { x: 10, y: 8 }, b: { x: 0, y: 8 } },
    { a: { x: 0, y: 8 }, b: { x: 0, y: 0 } },
  ];
  for (let bounce = 0; bounce <= d.bounceLimit; bounce++) {
    let distance = 100,
      mirror = -1,
      blocked = false;
    [...walls, ...d.obstacles].forEach((s, i) => {
      const t = raySegment(origin, dir, s);
      if (t !== null && t < distance) {
        distance = t;
        mirror = -1;
        blocked = i >= walls.length;
      }
    });
    d.mirrors.forEach((_, i) => {
      const t = raySegment(origin, dir, mirrorSegment(d, i, angles[i]));
      if (t !== null && t < distance) {
        distance = t;
        mirror = i;
        blocked = false;
      }
    });
    const to = sub(d.receiver, origin),
      projection = to.x * dir.x + to.y * dir.y,
      perpendicular = to.x * to.x + to.y * to.y - projection * projection;
    if (projection > 0 && perpendicular <= d.radius * d.radius) {
      const entry = projection - Math.sqrt(Math.max(0, d.radius * d.radius - perpendicular));
      if (entry > 0 && entry < distance) {
        points.push({ x: origin.x + dir.x * entry, y: origin.y + dir.y * entry });
        return { points, hit: true, reason: 'receiver' };
      }
    }
    const contact = { x: origin.x + dir.x * distance, y: origin.y + dir.y * distance };
    points.push(contact);
    if (mirror < 0) return { points, hit: false, reason: blocked ? 'blocked' : 'miss' };
    if (bounce === d.bounceLimit) return { points, hit: false, reason: 'bounce-limit' };
    const a = (angles[mirror] * Math.PI) / 180,
      n = { x: -Math.sin(a), y: Math.cos(a) },
      dot = dir.x * n.x + dir.y * n.y;
    dir = { x: dir.x - 2 * dot * n.x, y: dir.y - 2 * dot * n.y };
    origin = { x: contact.x + dir.x * 1e-5, y: contact.y + dir.y * 1e-5 };
  }
  return { points, hit: false, reason: 'bounce-limit' };
}
