import type { Cable, Coordinate, MachineDefinition, Point, StageAnswer } from '../machine.models';
import type { MachineView } from '../machine-surface';
import { cableLength } from '../machine.geometry';
import { machineReading, machineRules } from '../machine.rules';

export const BRIDGE_DURATION = 14;
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const ease = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };
export function bridgeParts(d: MachineDefinition): readonly [Coordinate, Cable] {
  const [coordinate, cable] = d.stages;
  if (coordinate.kind !== 'coordinate' || cable.kind !== 'cable') throw Error('Bridge requires coordinate and cable stages');
  return [coordinate, cable];
}
export function bridgeAnswers(d: MachineDefinition, v: MachineView): readonly StageAnswer[] {
  return d.stages.map((s, i) => i === v.active ? v.answer : v.stages?.[i] ?? machineRules[s.kind].initial(s));
}
export function bridgeSolved(d: MachineDefinition, answers: readonly StageAnswer[]): boolean {
  return d.stages.every((s, i) => !!answers[i] && machineReading(s, answers[i]).solved);
}
/** Shared uniform map for the visible X/Y rails and pointer snapping. */
export function carriagePoint(d: Coordinate, p: Point): [number, number, number] {
  const scale = 7.5 / (d.max - d.min);
  return [-11 + (p.x - d.min) * scale, 3.1 + (p.y - d.min) * scale, 0.8];
}
export function carriageInput(d: Coordinate, x: number, y: number): Point {
  const scale = 7.5 / (d.max - d.min);
  const bound = (n: number) => Math.max(d.min, Math.min(d.max, Math.round(n)));
  return { x: bound(d.min + (x + 11) / scale), y: bound(d.min + (y - 3.1) / scale) };
}
export function cablePoints(d: Cable): [number, number, number][] {
  const xs = d.route.map(p => p.x), ys = d.route.map(p => p.y);
  const dx = Math.max(...xs) - Math.min(...xs), dy = Math.max(...ys) - Math.min(...ys);
  const scale = 6.7 / Math.max(dx, dy, 1);
  return d.route.map(p => [-7.25 + (p.x - (Math.min(...xs) + dx / 2)) * scale,
    6.7 + (p.y - (Math.min(...ys) + dy / 2)) * scale, 0.85]);
}
/** Short cable terminates along the exact route; extra cable bows below each span. */
export function fittedCable(d: Cable, index: number): { points: [number, number, number][]; state: 'empty' | 'short' | 'slack' | 'taut' } {
  const chosen = d.cables[index];
  if (!chosen) return { points: [], state: 'empty' };
  const required = cableLength(d), ratio = chosen.length / required, anchors = cablePoints(d);
  const state = Math.abs(chosen.length ** 2 - required ** 2) < 1e-8 ? 'taut' : ratio < 1 ? 'short' : 'slack';
  const lengths = anchors.slice(1).map((p, i) => Math.hypot(p[0] - anchors[i][0], p[1] - anchors[i][1]));
  let remaining = lengths.reduce((s, n) => s + n, 0) * Math.min(1, ratio);
  const points: [number, number, number][] = [anchors[0]];
  anchors.slice(1).forEach((end, i) => {
    if (remaining <= 0) return;
    const start = anchors[i], length = lengths[i], endAt = Math.min(1, remaining / Math.max(length, 1e-9));
    for (let j = 1; j <= 20; j++) {
      const t = endAt * j / 20;
      points.push([start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t - (state === 'slack' ? Math.sin(t * Math.PI) * Math.min(1.5, (ratio - 1) * 3) : 0), 0.98]);
    }
    remaining -= length;
  });
  return { points, state };
}
export function bridgeRelease(time: number) {
  return { pin: ease(time / 0.65), deck: ease((time - 0.75) / 2.15),
    gate: ease((time - 3.1) / 1.1), bolt: ease((time - 2.9) / 0.3) };
}
export function crossingRabbit(index: number, time: number, idle: number) {
  const elapsed = time - 4.5 - index * 0.48, p = clamp(elapsed / 6.6);
  const hop = p > 0 && p < 1 ? Math.max(0, Math.sin(p * Math.PI * 18)) : 0;
  return { x: -1.05 + 13.05 * p, y: 0.93 + hop * 0.23,
    z: 2.7 + (index % 3) * 0.95, yaw: p > 0 && p < 1 ? Math.PI / 2 : p === 1 ? -0.2 : 0.25,
    pitch: hop * -0.13, leg: p > 0 && p < 1 ? Math.sin(p * Math.PI * 18) * 0.65 : 0,
    ear: p > 0 && p < 1 ? hop * -0.25 : Math.sin(idle * 1.5 + index) * 0.06,
    escaped: p === 1, progress: p };
}

/** Stage switches never create trials; only a new, settled, correct committed input auto-engages. */
export class BridgeSequence {
  time = 0;
  private keys: string[];
  private pending = false;
  private dwell = 0;
  private trial = -1;
  private delivered = false;
  private active: number;
  constructor(private readonly d: MachineDefinition, view: MachineView) {
    const answers = bridgeAnswers(d, view);
    this.keys = answers.map(a => JSON.stringify(a));
    this.active = view.active;
    if (bridgeSolved(d, answers)) this.time = BRIDGE_DURATION;
  }
  update(v: MachineView, dt: number, settled: boolean) {
    const answers = bridgeAnswers(this.d, v), keys = answers.map(a => JSON.stringify(a));
    const changed = keys.some((key, i) => key !== this.keys[i]);
    if (changed) {
      this.pending = keys[v.active] !== this.keys[v.active];
      this.keys = keys; this.dwell = 0; this.time = 0;
    }
    if (v.active !== this.active) { this.active = v.active; this.pending = false; this.dwell = 0; }
    const all = bridgeSolved(this.d, answers), solved = machineReading(this.d.stages[v.active], v.answer).solved;
    let engage = false, finished = false;
    if (v.testing && v.trial !== this.trial) {
      this.trial = v.trial; this.time = 0; this.delivered = false; this.pending = false;
    }
    if (v.testing && !v.paused && dt > 0) {
      const duration = v.passed && all ? BRIDGE_DURATION : 0.85;
      this.time = v.reducedMotion ? duration : Math.min(duration, this.time + dt);
      if (this.time === duration && !this.delivered) { this.delivered = true; finished = true; }
    }
    if (!settled || !solved) this.dwell = 0;
    if (!v.testing && !v.completed && this.pending && solved && settled && !v.paused && dt > 0) {
      this.dwell += dt;
      if (this.dwell >= 0.32) { this.pending = false; engage = true; }
    }
    return { engage, finished, all };
  }
}
