import type { TimingWheels } from '../machine.models';
import type { MachineView } from '../machine-surface';
import { firstAlignment, machineReading } from '../machine.rules';

export const ESCAPE_DURATION = 8.4;
export const ease = (v: number): number => {
  const t = Math.max(0, Math.min(1, v));
  return t * t * (3 - 2 * t);
};
export function nextCrankStep(d: TimingWheels, current: number, delta: number): number {
  const requested = Math.max(0, Math.min(d.maxSteps, current + delta));
  const first = firstAlignment(d.periods, d.phases, d.maxSteps);
  return delta > 0 && d.firstAlignment && current < first ? Math.min(requested, first) : requested;
}
export function cagePose(time: number) {
  return {
    pin: ease(time / 0.8),
    latch: ease((time - 0.55) / 0.6),
    door: ease((time - 1.15) / 1.1),
    animal: Math.max(0, Math.min(1, (time - 2.65) / 4.7)),
  };
}

/** Presentation clock: a saved solution shows its final state without recording a trial.
 * Newly reached solutions engage once, after the discs settle. Replays never engage. */
export class TimingCageSequence {
  time = 0;
  private steps: number;
  private pending = false;
  private trial = -1;
  private testing = false;
  private delivered = false;
  constructor(
    private readonly d: TimingWheels,
    view: MachineView,
  ) {
    this.steps = view.answer.kind === 'timing-wheels' ? view.answer.steps : 0;
    if (machineReading(d, view.answer).solved) this.time = ESCAPE_DURATION;
  }
  update(view: MachineView, dt: number, settled: boolean): { engage: boolean; finished: boolean } {
    const steps = view.answer.kind === 'timing-wheels' ? view.answer.steps : 0;
    const solved = machineReading(this.d, view.answer).solved;
    let engage = false,
      finished = false;
    if (steps !== this.steps) {
      this.steps = steps;
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
      this.time = view.reducedMotion ? ESCAPE_DURATION : Math.min(ESCAPE_DURATION, this.time + dt);
      if (this.time >= ESCAPE_DURATION && !this.delivered) {
        this.delivered = true;
        finished = true;
      }
    } else if (!view.testing && this.testing) {
      this.time = view.passed ? ESCAPE_DURATION : 0;
    }
    if (!view.testing && this.pending && solved && settled && !view.paused && dt > 0) {
      this.pending = false;
      engage = true;
    }
    if (!solved && !view.testing) this.time = 0;
    this.testing = view.testing;
    return { engage, finished };
  }
}
