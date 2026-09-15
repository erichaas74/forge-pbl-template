import {
  evaluateGearLock,
  gearMotion,
  releaseFrame,
  type GearLockDefinition,
} from '../gear-lock.domain';
import type { GearView } from '../gear-lock.scene';

export const FOX_TRAVEL_SECONDS = 5.2;
export const FOX_DELAY_SECONDS = 0.65;
export const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const smooth = (v: number) => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};
export const releaseDuration = (d: GearLockDefinition) => releaseFrame(d.release, 0).total;
export const escapeDuration = (d: GearLockDefinition) =>
  releaseDuration(d) + FOX_TRAVEL_SECONDS + ((d.presentation?.foxes ?? 4) - 1) * FOX_DELAY_SECONDS;

/** Constant tooth pitch keeps every displayed gear pair in contact as mounts slide. */
export const cogRadius = (teeth: number) => teeth * 0.043;
export function compoundLayout(d: GearLockDefinition, answer: readonly number[]) {
  const driveRadius = cogRadius(d.driverTeeth),
    pinionRadius = cogRadius(d.pinionTeeth);
  const aRadius = answer[0] >= 0 ? cogRadius(d.gears[answer[0]].teeth) : 1.45;
  const bRadius = answer[1] >= 0 ? cogRadius(d.gears[answer[1]].teeth) : 1.18;
  const driveX = -10.55 + driveRadius,
    aX = driveX + driveRadius + aRadius,
    bX = aX + pinionRadius + bRadius;
  return { driveX, aX, bX, driveRadius, pinionRadius, aRadius, bRadius, y: 3.65 };
}

export function foxRoute(index: number, seconds: number) {
  const progress = clamp((seconds - index * FOX_DELAY_SECONDS) / FOX_TRAVEL_SECONDS);
  const startX = [5.2, 7.9, 6.1, 9.0][index],
    startZ = index < 2 ? 0.15 : -1.1;
  const forward = clamp(progress / 0.65),
    spread = smooth((progress - 0.35) / 0.65);
  const destination = [4.9, 7.2, 6.1, 9.1][index];
  return {
    x: startX + (destination - startX) * spread,
    z:
      startZ +
      (4.8 - startZ) * forward +
      smooth((progress - 0.65) / 0.35) * (index < 2 ? 0.8 : 2.1),
    progress,
    escaped: progress === 1,
  };
}

/** The configured drive trial is run once; only a passed trial may advance the release chain. */
export class GearCageSequence {
  time = 0;
  private run = -1;
  private key: string;
  private finished = false;
  private wasRunning = false;
  private tested = false;
  constructor(
    private readonly d: GearLockDefinition,
    v: GearView,
  ) {
    this.key = JSON.stringify(v.answer);
    if (evaluateGearLock(d, v.answer)) {
      this.time = escapeDuration(d);
      this.tested = true;
    }
  }
  update(v: GearView, dt: number) {
    const key = JSON.stringify(v.answer);
    if (key !== this.key && !v.running) {
      this.key = key;
      this.time = 0;
      this.tested = false;
    }
    if (v.running && v.runId !== this.run) {
      this.run = v.runId;
      this.time = 0;
      this.finished = false;
      this.tested = true;
    }
    let finish = false;
    if (v.running && !v.paused && dt > 0) {
      const duration = v.passed ? escapeDuration(this.d) : 3.8;
      this.time = v.reducedMotion ? duration : Math.min(duration, this.time + dt);
      if (this.time === duration && !this.finished) {
        this.finished = true;
        finish = true;
      }
    } else if (!v.running && this.wasRunning) this.time = v.passed ? escapeDuration(this.d) : 3.8;
    this.wasRunning = v.running;
    const allowed = this.tested && evaluateGearLock(this.d, v.answer);
    const frame = releaseFrame(this.d.release, allowed ? this.time : Math.min(this.time, 3.2));
    if (!allowed)
      for (const module of ['ball', 'hammer', 'weight', 'domino', 'gate'] as const)
        frame.progress[module] = 0;
    const crank = this.tested ? v.answer[2] * Math.min(1, this.time / 3.2) : 0;
    return {
      finish,
      frame,
      crank,
      motion: gearMotion(this.d, v.answer, crank),
      escape: allowed ? Math.max(0, this.time - releaseDuration(this.d)) : 0,
      allowed,
    };
  }
}
