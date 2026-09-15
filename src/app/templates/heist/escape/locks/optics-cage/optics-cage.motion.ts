import type { Point, Reflection } from '../machine.models';
import type { MachineView } from '../machine-surface';
import { machineReading } from '../machine.rules';

export const OPTICS_SCALE = 1.1;
export const OWL_ESCAPE_DURATION = 9;
const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const ease = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};

/** One uniform transform preserves the domain's reflection angles and distances. */
export function opticsPoint(p: Point): [number, number, number] {
  return [-10.5 + p.x * OPTICS_SCALE, 9.8 - p.y * OPTICS_SCALE, 0.72];
}
export function snapMirror(angle: number, step: number): number {
  return (((Math.round(angle / step) * step) % 180) + 180) % 180;
}
export function opticsRelease(time: number) {
  return {
    charge: ease(time / 0.65),
    bolt: ease((time - 0.65) / 0.5),
    lift: ease((time - 1.15) / 1.5),
  };
}

/** Fly forward through the cleared grille before spreading to two outside perches. */
export function owlMotion(index: number, time: number, idle: number) {
  const elapsed = time - 3.05 - index * 0.8;
  const p = clamp(elapsed / 4.9),
    forward = ease(p / 0.42),
    spread = ease((p - 0.42) / 0.58);
  const flying = p > 0 && p < 1;
  const unfold = ease(p / 0.08) * (1 - ease((p - 0.88) / 0.12));
  const flap = flying ? Math.sin(elapsed * 10) * 0.43 * (1 - ease((p - 0.6) / 0.22)) : 0;
  return {
    x: (index === 0 ? 5.4 : 8.4) + (index === 0 ? -1.3 : 1.15) * spread,
    y: 1.3 + 0.9 * ease(p / 0.3) + Math.sin(p * Math.PI) * 0.35,
    z: 0.2 + 3.25 * forward + 2.25 * spread,
    yaw: (index === 0 ? -1 : 1) * Math.sin(p * Math.PI) * 0.28,
    pitch: flying ? -Math.sin(p * Math.PI) * 0.16 : 0,
    wing: 1.18 * (1 - unfold) + flap * unfold,
    tuck: unfold,
    head: flying ? 0 : Math.sin(idle * 0.55 + index * 2.1) * 0.13,
    blink: flying ? 1 : Math.sin(idle * 0.75 + index * 2.5) > 0.995 ? 0.12 : 1,
    progress: p,
    escaped: p === 1,
  };
}

/** Restores a saved solution without awarding or replaying it. A newly aimed beam dwells first. */
export class OpticsCageSequence {
  time = 0;
  private key: string;
  private pending = false;
  private dwell = 0;
  private trial = -1;
  private delivered = false;
  constructor(
    private readonly definition: Reflection,
    view: MachineView,
  ) {
    this.key = JSON.stringify(view.answer);
    if (machineReading(definition, view.answer).solved) this.time = OWL_ESCAPE_DURATION;
  }
  update(view: MachineView, dt: number, settled: boolean) {
    const key = JSON.stringify(view.answer),
      solved = machineReading(this.definition, view.answer).solved;
    let engage = false,
      finished = false;
    if (key !== this.key) {
      this.key = key;
      this.pending = true;
      this.dwell = 0;
      this.time = 0;
    }
    if (view.testing && view.trial !== this.trial) {
      this.trial = view.trial;
      this.time = 0;
      this.delivered = false;
      this.pending = false;
    }
    if (!settled || !solved) this.dwell = 0;
    if (view.testing && !view.paused && dt > 0) {
      const duration = view.passed ? OWL_ESCAPE_DURATION : 0.65;
      this.time = view.reducedMotion ? duration : Math.min(duration, this.time + dt);
      if (this.time === duration && !this.delivered) {
        this.delivered = true;
        finished = true;
      }
    }
    if (
      !view.testing &&
      !view.completed &&
      this.pending &&
      solved &&
      settled &&
      !view.paused &&
      dt > 0
    ) {
      this.dwell += dt;
      if (this.dwell >= 0.35) {
        this.pending = false;
        engage = true;
      }
    }
    return { engage, finished };
  }
}
