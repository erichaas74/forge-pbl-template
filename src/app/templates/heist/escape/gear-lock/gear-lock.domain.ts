/** Framework-independent compound gear train. All academic comparisons use integer products. */
export interface GearFraction {
  readonly numerator: number;
  readonly denominator: number;
}
export interface GearLockDefinition {
  readonly presentation?: {
    readonly kind: 'gear-cage';
    readonly foxes: number;
    readonly animal: {
      readonly model: string;
      readonly credits: string;
      readonly idle: string;
      readonly walk: string;
      readonly run: string;
    };
  };
  readonly backdrop: string;
  readonly title: string;
  readonly instruction: string;
  readonly success: string;
  readonly driverTeeth: number;
  readonly pinionTeeth: number;
  readonly firstMultiplier: GearFraction;
  readonly secondMultiplier: GearFraction;
  readonly outputTurns: GearFraction;
  readonly maxCrank: number;
  readonly gears: readonly { readonly id: string; readonly teeth: number }[];
  readonly release: readonly ReleaseModule[];
}
export type ReleaseModule = 'drive' | 'ball' | 'hammer' | 'weight' | 'domino' | 'gate';
/** Answer is [inventory index on A, inventory index on B, whole crank turns]. -1 is empty. */
export const emptyGears = (): readonly number[] => [-1, -1, 1];
export function validGearDraft(d: GearLockDefinition, a: readonly number[]): boolean {
  return (
    a.length === 3 &&
    a.every(Number.isInteger) &&
    a[0] >= -1 &&
    a[0] < d.gears.length &&
    a[1] >= -1 &&
    a[1] < d.gears.length &&
    (a[0] === -1 || a[0] !== a[1]) &&
    a[2] >= 1 &&
    a[2] <= d.maxCrank
  );
}
export function moveGear(
  d: GearLockDefinition,
  a: readonly number[],
  index: number,
  socket: -1 | 0 | 1,
): readonly number[] {
  if (
    !validGearDraft(d, a) ||
    !Number.isInteger(index) ||
    !d.gears[index] ||
    ![-1, 0, 1].includes(socket)
  )
    return a;
  const next = [...a];
  for (let i = 0; i < 2; i++) if (next[i] === index) next[i] = -1;
  if (socket !== -1) next[socket] = index;
  return next;
}
export function gearMotion(d: GearLockDefinition, a: readonly number[], crank: number) {
  const first = d.gears[a[0]],
    second = d.gears[a[1]];
  const axle = first ? (-crank * d.driverTeeth) / first.teeth : 0;
  return {
    drive: crank,
    axle,
    output: first && second ? (-axle * d.pinionTeeth) / second.teeth : 0,
  };
}
export function evaluateGearLock(d: GearLockDefinition, a: readonly number[]): boolean {
  if (!validGearDraft(d, a) || a[0] < 0 || a[1] < 0) return false;
  const first = d.gears[a[0]].teeth,
    second = d.gears[a[1]].teeth;
  return (
    first * d.firstMultiplier.denominator === d.driverTeeth * d.firstMultiplier.numerator &&
    second * d.secondMultiplier.denominator === d.pinionTeeth * d.secondMultiplier.numerator &&
    a[2] * d.driverTeeth * d.pinionTeeth * d.outputTurns.denominator ===
      first * second * d.outputTurns.numerator
  );
}
export const fractionLabel = (v: GearFraction): string =>
  v.denominator === 1 ? `${v.numerator}` : `${v.numerator}/${v.denominator}`;
export function gearFeedback(d: GearLockDefinition, a: readonly number[]): string {
  if (!validGearDraft(d, a) || a[0] < 0 || a[1] < 0)
    return 'The drive train has a gap. Fit a cog on both axles.';
  const first = d.gears[a[0]].teeth,
    second = d.gears[a[1]].teeth;
  if (first * d.firstMultiplier.denominator !== d.driverTeeth * d.firstMultiplier.numerator)
    return `Axle A misses its calibration mark. Its tooth count must be ${fractionLabel(d.firstMultiplier)} times ${d.driverTeeth}.`;
  if (second * d.secondMultiplier.denominator !== d.pinionTeeth * d.secondMultiplier.numerator)
    return `Axle B misses its calibration mark. Its tooth count must be ${fractionLabel(d.secondMultiplier)} times ${d.pinionTeeth}.`;
  const turns = gearMotion(d, a, a[2]).output,
    target = d.outputTurns.numerator / d.outputTurns.denominator;
  if (!evaluateGearLock(d, a))
    return turns < target
      ? 'The drum stops short of its release mark. Keep the cogs; try more crank turns.'
      : 'The drum passes its release mark. Keep the cogs; try fewer crank turns.';
  return d.success;
}

export const RELEASE_SECONDS: Readonly<Record<ReleaseModule, number>> = {
  drive: 3.2,
  ball: 1.5,
  hammer: 0.8,
  weight: 2.2,
  domino: 1.1,
  gate: 2.4,
};
export function releaseFrame(sequence: readonly ReleaseModule[], elapsed: number) {
  let start = 0;
  const progress = { drive: 0, ball: 0, hammer: 0, weight: 0, domino: 0, gate: 0 };
  let active: ReleaseModule = sequence[sequence.length - 1];
  for (const module of sequence) {
    progress[module] = Math.max(0, Math.min(1, (elapsed - start) / RELEASE_SECONDS[module]));
    if (elapsed >= start && elapsed < start + RELEASE_SECONDS[module]) active = module;
    start += RELEASE_SECONDS[module];
  }
  return { progress, active, complete: elapsed >= start, total: start };
}

export function validateGearLock(value: unknown): asserts value is GearLockDefinition {
  const fail = (field: string): never => {
    throw new Error(`INVALID_HEIST_ESCAPE: gear-lock.${field}`);
  };
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail('definition');
  const d = value as GearLockDefinition;
  if (d.presentation !== undefined) {
    const p = d.presentation, a = p?.animal;
    if (p?.kind !== 'gear-cage' || !Number.isInteger(p.foxes) || p.foxes < 1 || p.foxes > 4 || !a ||
      !/^\/projects\/[a-zA-Z0-9/_-]+\.glb$/.test(a.model) ||
      !/^\/projects\/[a-zA-Z0-9/_-]+\.html$/.test(a.credits) ||
      ![a.idle,a.walk,a.run].every(s => typeof s === 'string' && s.trim().length > 0 && s.length < 80))
      fail('gear-cage presentation');
  }
  for (const key of ['title', 'instruction', 'success'] as const)
    if (typeof d[key] !== 'string' || !d[key].trim() || d[key].length > 1000) fail(key);
  if (
    typeof d.backdrop !== 'string' ||
    !/^\/projects\/[a-zA-Z0-9/_-]+\.(png|webp)$/.test(d.backdrop)
  )
    fail('backdrop');
  const teeth = (n: number) => Number.isInteger(n) && n >= 8 && n <= 48;
  if (!teeth(d.driverTeeth) || !teeth(d.pinionTeeth)) fail('fixed teeth');
  if (!Number.isInteger(d.maxCrank) || d.maxCrank < 1 || d.maxCrank > 12) fail('maxCrank');
  for (const key of ['firstMultiplier', 'secondMultiplier', 'outputTurns'] as const) {
    const f = d[key];
    if (
      !f ||
      !Number.isInteger(f.numerator) ||
      !Number.isInteger(f.denominator) ||
      f.numerator < 1 ||
      f.numerator > 12 ||
      f.denominator < 1 ||
      f.denominator > 12
    )
      fail(key);
  }
  if (!Array.isArray(d.gears) || d.gears.length < 3 || d.gears.length > 6) fail('gears');
  const ids = new Set<string>();
  for (const g of d.gears) {
    if (
      !g ||
      typeof g.id !== 'string' ||
      !/^[a-z][a-z0-9-]{0,40}$/.test(g.id) ||
      ids.has(g.id) ||
      !teeth(g.teeth)
    )
      fail('gear');
    ids.add(g.id);
  }
  // Current physical module connectors form this causal sequence. New topologies need matching renderers.
  if (
    JSON.stringify(d.release) !==
    JSON.stringify(['drive', 'ball', 'hammer', 'weight', 'domino', 'gate'])
  )
    fail('release connectors');
  let possible = false;
  for (let a = 0; a < d.gears.length; a++)
    for (let b = 0; b < d.gears.length; b++)
      for (let turns = 1; turns <= d.maxCrank; turns++)
        if (evaluateGearLock(d, [a, b, turns])) possible = true;
  if (!possible) fail('no reachable calibration');
}
