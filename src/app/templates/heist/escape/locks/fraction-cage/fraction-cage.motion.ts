import type { FractionGear } from '../machine.models';
import type { MachineView } from '../machine-surface';
import { machineReading } from '../machine.rules';

export const RABBIT_ESCAPE_DURATION = 11.2;
export const clamp = (v: number): number => Math.max(0, Math.min(1, v));
export const ease = (v: number): number => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};
export const sectorSize = (d: FractionGear, i: number): number =>
  (d.slots * d.pieces[i].numerator) / d.pieces[i].denominator;

/** Placement constraint only; completion remains in machineReading. Circular wrap is intentional. */
export function sectorFits(
  d: FractionGear,
  offsets: readonly number[],
  index: number,
  offset: number,
): boolean {
  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= d.pieces.length ||
    !Number.isInteger(offset) ||
    offset < 0 ||
    offset >= d.slots
  )
    return false;
  const occupied = new Set<number>();
  offsets.forEach((start, i) => {
    if (start < 0 || i === index) return;
    for (let j = 0; j < sectorSize(d, i); j++) occupied.add((start + j) % d.slots);
  });
  for (let j = 0; j < sectorSize(d, index); j++)
    if (occupied.has((offset + j) % d.slots)) return false;
  return true;
}

export function fractionCagePose(time: number) {
  return {
    clutch: ease(time / 0.65),
    lift: ease((time - 0.65) / 2.0),
    turn: ease((time - 0.65) / 2.0) * Math.PI * 2,
  };
}

/** Articulation follows takeoff, flight and landing; each rabbit follows its own delayed route. */
export function rabbitMotion(index: number, time: number, idle: number) {
  const elapsed = time - 3.05 - index * 0.58;
  const progress = clamp(elapsed / 4.25);
  const cycle = progress >= 1 || elapsed < 0 ? 0 : (elapsed / 0.68) % 1;
  const flight = clamp((cycle - 0.16) / 0.64);
  const airborne = cycle >= 0.16 && cycle <= 0.8 && progress < 1;
  const jump = airborne ? Math.sin(flight * Math.PI) * 0.4 : 0;
  const crouch =
    progress < 1 && elapsed >= 0 && (cycle < 0.16 || cycle > 0.8)
      ? 0.1 * Math.sin(((cycle < 0.16 ? cycle / 0.16 : (1 - cycle) / 0.2) * Math.PI) / 2)
      : 0;
  const lane = index % 3;
  const startX = 3.15 + lane * 1.16,
    startZ = index < 3 ? 0.25 : -1.0;
  // First travel through the opening, then spread onto separate landing spots.
  const forward = clamp(progress / 0.57),
    spread = ease((progress - 0.57) / 0.43);
  return {
    x:
      startX +
      ([-0.6, 0.05, 0.6][lane] + (index < 3 ? 0 : 0.95)) *
        (index < 3 ? spread : ease((progress - 0.35) / 0.35)),
    z: startZ + (3.8 - startZ) * forward + spread * (index < 3 ? 1.15 : 2.15),
    y: 0.19 + jump - crouch,
    yaw: spread * (lane - 1) * 0.25,
    pitch: airborne ? Math.cos(flight * Math.PI) * -0.16 : 0,
    leg: airborne ? Math.sin(flight * Math.PI * 2) * 0.6 : -0.15 * crouch,
    ear:
      elapsed < 0
        ? Math.sin(idle * 1.6 + index * 1.7) * 0.075
        : -0.12 + Math.sin(cycle * Math.PI * 2) * 0.16 * (progress < 1 ? 1 : 0),
    progress,
    escaped: progress === 1,
  };
}

/** A restored solution displays the final pose. Only a newly assembled whole engages a trial. */
export class FractionCageSequence {
  time = 0;
  private key: string;
  private pending = false;
  private trial = -1;
  private testing = false;
  private delivered = false;
  constructor(
    private readonly d: FractionGear,
    view: MachineView,
  ) {
    this.key = JSON.stringify(view.answer);
    if (machineReading(d, view.answer).solved) this.time = RABBIT_ESCAPE_DURATION;
  }
  update(view: MachineView, dt: number, settled: boolean) {
    const key = JSON.stringify(view.answer),
      solved = machineReading(this.d, view.answer).solved;
    let engage = false,
      finished = false;
    if (key !== this.key) {
      this.key = key;
      this.pending = true;
      this.time = 0;
    }
    if (view.testing && view.trial !== this.trial) {
      this.trial = view.trial;
      this.time = 0;
      this.delivered = false;
      this.pending = false;
    }
    if (view.testing && !view.paused && dt > 0) {
      this.time = view.reducedMotion
        ? RABBIT_ESCAPE_DURATION
        : Math.min(RABBIT_ESCAPE_DURATION, this.time + dt);
      if (this.time === RABBIT_ESCAPE_DURATION && !this.delivered) {
        this.delivered = true;
        finished = true;
      }
    } else if (!view.testing && this.testing) this.time = view.passed ? RABBIT_ESCAPE_DURATION : 0;
    if (
      !view.testing &&
      !view.completed &&
      this.pending &&
      solved &&
      settled &&
      !view.paused &&
      dt > 0
    ) {
      this.pending = false;
      engage = true;
    }
    if (!solved && !view.testing) this.time = 0;
    this.testing = view.testing;
    return { engage, finished };
  }
}
