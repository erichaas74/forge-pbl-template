/**
 * Precision mechanics shared by every station.
 *
 * Pouring 5 mL ±0.25, weighing 2 g ±0.05, stirring for 60 s ±3, dipping a probe
 * to a fixed depth — these are all the same mechanic. The student drives a value
 * toward a target, has to stop inside a band, and the bench records how tightly
 * they held it.
 *
 * Keeping this in one place is what makes "equal conditions" a thing students
 * achieve rather than a claim the prompt makes for them.
 */

export interface Band {
  /** The value the protocol asks for. */
  target: number;
  /** How far either side still counts as on-target. */
  tolerance: number;
  /** Highest value the instrument can reach. */
  ceiling: number;
}

export type BandState = 'under' | 'inside' | 'over';

export function bandState(value: number, band: Band): BandState {
  const drift = value - band.target;
  if (drift > band.tolerance) {
    return 'over';
  }
  return drift < -band.tolerance ? 'under' : 'inside';
}

export function isInside(value: number, band: Band): boolean {
  return bandState(value, band) === 'inside';
}

/**
 * Did they land inside half a tolerance? The gates already refuse anything
 * outside the band, so this asks the harder question — was the technique tidy.
 */
export function isTight(value: number, band: Band): boolean {
  return Math.abs(value - band.target) <= band.tolerance / 2;
}

/** Where a value sits across the instrument's range, as a percentage. */
export function fillPercent(value: number, band: Band): number {
  return Math.min(Math.max((value / band.ceiling) * 100, 0), 100);
}

/** The band drawn on the instrument, as a percentage window. */
export function bandWindow(band: Band): { bottom: number; height: number } {
  const bottom = ((band.target - band.tolerance) / band.ceiling) * 100;
  const height = ((band.tolerance * 2) / band.ceiling) * 100;
  return { bottom, height };
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * A value the student drives toward a band, plus the bookkeeping the record
 * needs: what they achieved, and how many times they had to start over.
 */
export class MeasuredStep {
  private current = 0;
  private latched = 0;
  private resetCount = 0;

  constructor(readonly band: Band) {}

  get value(): number {
    return this.current;
  }

  /** The value at the moment it was locked in, before the pan or vessel emptied. */
  get achieved(): number {
    return this.latched;
  }

  get resets(): number {
    return this.resetCount;
  }

  get state(): BandState {
    return bandState(this.current, this.band);
  }

  get inside(): boolean {
    return isInside(this.current, this.band);
  }

  get tight(): boolean {
    return this.resetCount === 0 && isTight(this.latched, this.band);
  }

  add(amount: number): number {
    this.current = round2(Math.min(Math.max(this.current + amount, 0), this.band.ceiling));
    return this.current;
  }

  /** Dumping the vessel or pan counts against the technique record. */
  clear(): void {
    if (this.current === 0) {
      return;
    }
    this.current = 0;
    this.resetCount += 1;
  }

  latch(): number {
    this.latched = this.current;
    return this.latched;
  }

  /** Empties without counting a reset — used when moving on to the next step. */
  drain(): void {
    this.current = 0;
  }

  reset(): void {
    this.current = 0;
    this.latched = 0;
    this.resetCount = 0;
  }
}
