import type { MachineChallenge, MachineDefinition, StageAnswer } from './machine.models';
import { cableLength, coordinateTarget, traceBeam } from './machine.geometry';
import { firstAlignment, machineReading, machineRules } from './machine.rules';
const fail = (field: string): never => {
  throw new Error(`INVALID_HEIST_ESCAPE: machine-lock.${field}`);
};
const int = (v: unknown, min: number, max: number): v is number =>
  typeof v === 'number' && Number.isInteger(v) && v >= min && v <= max;
const number = (v: unknown, min: number, max: number): v is number =>
  typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;
const text = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0 && v.length < 2000;
const point = (p: unknown, min: number, max: number): boolean =>
  !!p &&
  typeof p === 'object' &&
  'x' in p &&
  'y' in p &&
  number(p.x, min, max) &&
  number(p.y, min, max);
function rows(v: unknown, min: number, max: number): asserts v is readonly object[] {
  if (
    !Array.isArray(v) ||
    v.length < min ||
    v.length > max ||
    v.some((p) => !p || typeof p !== 'object')
  )
    fail('inventory');
}
function ids(values: readonly { readonly id: string }[]): void {
  if (
    values.some((v) => typeof v.id !== 'string' || !/^[a-z][a-z0-9-]{0,40}$/.test(v.id)) ||
    new Set(values.map((v) => v.id)).size !== values.length
  )
    fail('unique ids');
}
type Validator = (d: MachineChallenge) => boolean;
const validators: Readonly<Record<MachineChallenge['kind'], Validator>> = {
  'fraction-gear': (d) => {
    if (d.kind !== 'fraction-gear') return false;
    rows(d.pieces, 3, 8);
    ids(d.pieces);
    if (
      !int(d.slots, 8, 72) ||
      !int(d.teeth, 8, 144) ||
      d.teeth % d.slots !== 0 ||
      d.pieces.some(
        (p) =>
          !int(p.numerator, 1, 12) ||
          !int(p.denominator, 2, 24) ||
          p.numerator >= p.denominator ||
          (d.slots * p.numerator) % p.denominator !== 0,
      )
    )
      return false;
    const sums = new Set([0]);
    for (const p of d.pieces)
      for (const n of [...sums]) sums.add(n + (d.slots * p.numerator) / p.denominator);
    return sums.has(d.slots);
  },
  volume: (d) => {
    if (d.kind !== 'volume') return false;
    rows(d.vessels, 3, 6);
    ids(d.vessels);
    if (
      !int(d.capacity, 1, 100000) ||
      !int(d.target, 1, d.capacity) ||
      !int(d.unitTicks, 1, 10000) ||
      (d.targetLabel !== undefined && !text(d.targetLabel)) ||
      !text(d.unit) ||
      d.vessels.some((v) => !text(v.label) || !int(v.amount, 1, d.capacity) || !int(v.uses, 1, 12))
    )
      return false;
    let sums = new Set([0]);
    for (const v of d.vessels) {
      const old = [...sums];
      for (let n = 1; n <= v.uses; n++)
        for (const s of old) if (s + n * v.amount <= d.target) sums.add(s + n * v.amount);
    }
    return sums.has(d.target);
  },
  'timing-wheels': (d) =>
    d.kind === 'timing-wheels' &&
    Array.isArray(d.periods) &&
    d.periods.length >= 2 &&
    d.periods.length <= 4 &&
    d.periods.every((p) => int(p, 2, 20)) &&
    Array.isArray(d.phases) &&
    d.phases.length === d.periods.length &&
    d.phases.every((p, i) => int(p, 0, d.periods[i] - 1)) &&
    int(d.maxSteps, 1, 240) &&
    typeof d.firstAlignment === 'boolean' &&
    firstAlignment(d.periods, d.phases, d.maxSteps) > 0,
  coordinate: (d) => {
    if (
      d.kind !== 'coordinate' ||
      !int(d.min, -10, 0) ||
      !int(d.max, 4, 12) ||
      d.max - d.min > 20 ||
      !d.goal ||
      typeof d.goal !== 'object'
    )
      return false;
    const g = d.goal;
    if (g.mode === 'point') {
      if (!point(g.point, d.min, d.max)) return false;
    } else if (g.mode === 'transform') {
      if (!point(g.start, d.min, d.max) || !point(g.shift, -20, 20) || !number(g.scale, -3, 3))
        return false;
    } else if (g.mode === 'intersection') {
      if (
        !Array.isArray(g.lines) ||
        g.lines.length !== 2 ||
        g.lines.some(
          (l) => !l || ![l.a, l.b, l.c].every((n) => int(n, -50, 50)) || (l.a === 0 && l.b === 0),
        )
      )
        return false;
    } else return false;
    const target = coordinateTarget(d);
    return int(target.x, d.min, d.max) && int(target.y, d.min, d.max);
  },
  reflection: (d) => {
    if (d.kind !== 'reflection') return false;
    rows(d.mirrors, 1, 3);
    ids(d.mirrors);
    if (
      !point(d.emitter, 0.1, 9.9) ||
      d.emitter.y >= 8 ||
      !point(d.receiver, 0.1, 9.9) ||
      d.receiver.y >= 8 ||
      !number(d.radius, 0.1, 0.5) ||
      !int(d.direction, 0, 359) ||
      !int(d.bounceLimit, 1, 8) ||
      !Array.isArray(d.obstacles) ||
      d.obstacles.length > 8 ||
      d.obstacles.some((s) => !s || !point(s.a, 0, 10) || !point(s.b, 0, 10)) ||
      d.mirrors.some(
        (m) =>
          !point(m.center, 0.5, 9.5) ||
          m.center.y > 7.5 ||
          !number(m.length, 0.5, 2) ||
          ![15, 30, 45].includes(m.step) ||
          !int(m.start, 0, 179) ||
          m.start % m.step !== 0,
      )
    )
      return false;
    const angles: number[] = [];
    let possible = false;
    const search = (i: number) => {
      if (possible) return;
      if (i === d.mirrors.length) {
        possible = traceBeam(d, angles).hit;
        return;
      }
      for (let a = 0; a < 180; a += d.mirrors[i].step) {
        angles[i] = a;
        search(i + 1);
      }
    };
    search(0);
    return possible;
  },
  mixing: (d) => {
    if (d.kind !== 'mixing') return false;
    rows(d.ingredients, 2, 3);
    ids(d.ingredients);
    if (
      !int(d.capacity, 1, 100000) ||
      !int(d.unitTicks, 1, 10000) ||
      !text(d.unit) ||
      (d.total !== undefined && !int(d.total, 1, d.capacity)) ||
      d.ingredients.some(
        (i) =>
          !text(i.label) ||
          !/^#[0-9a-f]{6}$/i.test(i.color) ||
          !int(i.parts, 1, 20) ||
          !int(i.measure, 1, d.capacity) ||
          !int(i.supply, i.measure, 100000) ||
          i.supply / i.measure > 100,
      )
    )
      return false;
    const first = d.ingredients[0];
    for (let n = 1; n <= first.supply / first.measure; n++) {
      const unit = (n * first.measure) / first.parts,
        amounts = d.ingredients.map((i) => unit * i.parts);
      if (
        amounts.every(
          (v, i) => Number.isInteger(v / d.ingredients[i].measure) && v <= d.ingredients[i].supply,
        ) &&
        amounts.reduce((s, v) => s + v, 0) <= d.capacity &&
        (d.total === undefined || amounts.reduce((s, v) => s + v, 0) === d.total)
      )
        return true;
    }
    return false;
  },
  cable: (d) => {
    if (
      d.kind !== 'cable' ||
      !['route', 'diagonal'].includes(d.mode) ||
      !text(d.unit) ||
      !number(d.scale, 0.1, 100)
    )
      return false;
    rows(d.route, 2, 4);
    rows(d.cables, 3, 6);
    ids(d.cables);
    if (
      d.route.some((p) => !point(p, 0, 20)) ||
      d.cables.some((c) => !text(c.label) || !number(c.length, 0.1, 1000)) ||
      (d.mode === 'diagonal' && d.route.length !== 2)
    )
      return false;
    if (
      d.mode === 'route' &&
      d.route.slice(1).some((p, i) => p.x !== d.route[i].x && p.y !== d.route[i].y)
    )
      return false;
    const length = cableLength(d);
    return (
      length > 0 && d.cables.some((c) => Math.abs(c.length * c.length - length * length) < 1e-8)
    );
  },
};
export function validateMachine(value: unknown): asserts value is MachineDefinition {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail('definition');
  const d = value as MachineDefinition;
  if (
    !text(d.title) ||
    typeof d.backdrop !== 'string' ||
    !/^\/projects\/[a-zA-Z0-9/_-]+\.(png|webp)$/.test(d.backdrop)
  )
    fail('art/title');
  rows(d.stages, 1, 3);
  if (d.presentation !== undefined &&
      (d.presentation?.kind !== 'bridge-cage' || !int(d.presentation.rabbits, 1, 6) ||
       d.stages.length !== 2 || d.stages[0].kind !== 'coordinate' || d.stages[1].kind !== 'cable'))
    fail('bridge-cage presentation');
  ids(d.stages);
  for (const s of d.stages) {
    if (!Object.hasOwn(machineRules, s.kind)) fail('capability');
    for (const key of ['title', 'instruction', 'hint', 'success'] as const)
      if (!text(s[key])) fail(`stage.${key}`);
    if (!validators[s.kind](s)) fail(`${s.kind} configuration or reachability`);
    if (s.kind === 'reflection' && s.presentation !== undefined &&
        (s.presentation?.kind !== 'optics-cage' || !int(s.presentation.owls, 1, 2) || d.stages.length !== 1))
      fail('optics-cage presentation');
    if (s.kind === 'fraction-gear' && s.presentation !== undefined &&
        (s.presentation?.kind !== 'fraction-cage' || !int(s.presentation.rabbits, 1, 6) || d.stages.length !== 1))
      fail('fraction-cage presentation');
    if (s.kind === 'timing-wheels' && s.presentation !== undefined) {
      const p = s.presentation,
        a = p?.animal;
      if (
        p?.kind !== 'timing-cage' ||
        !a ||
        ![a.label, a.idle, a.walk, a.run].every(text) ||
        !/^\/projects\/[a-zA-Z0-9/_-]+\.glb$/.test(a.model) ||
        !/^\/projects\/[a-zA-Z0-9/_-]+\.html$/.test(a.credits) ||
        d.stages.length !== 1
      )
        fail('timing-cage presentation');
    }
  }
}
/** Test/authoring helper searches bounded spaces; not used to disclose student answers. */
export function machineWitness(d: MachineChallenge): StageAnswer {
  let answer = machineRules[d.kind].initial(d);
  if (d.kind === 'fraction-gear') {
    for (let mask = 1; mask < 1 << d.pieces.length; mask++) {
      let offset = 0;
      const offsets = d.pieces.map((p, i) => {
        if (!(mask & (1 << i))) return -1;
        const here = offset;
        offset += (d.slots * p.numerator) / p.denominator;
        return here;
      });
      if (offset === d.slots) {
        answer = { kind: d.kind, offsets };
        break;
      }
    }
  } else if (d.kind === 'timing-wheels')
    answer = { kind: d.kind, steps: firstAlignment(d.periods, d.phases, d.maxSteps) };
  else if (d.kind === 'coordinate') answer = { kind: d.kind, ...coordinateTarget(d) };
  else if (d.kind === 'cable')
    answer = {
      kind: d.kind,
      cable: d.cables.findIndex((c) => Math.abs(c.length - cableLength(d)) < 1e-8),
    };
  else if (d.kind === 'reflection') {
    const angles: number[] = [];
    let found = false;
    const search = (i: number) => {
      if (found) return;
      if (i === d.mirrors.length) {
        if (traceBeam(d, angles).hit) {
          answer = { kind: d.kind, angles: [...angles] };
          found = true;
        }
        return;
      }
      for (let a = 0; a < 180; a += d.mirrors[i].step) {
        angles[i] = a;
        search(i + 1);
      }
    };
    search(0);
  } else {
    const counts: number[] = [];
    let found = false;
    const length = d.kind === 'volume' ? d.vessels.length : d.ingredients.length;
    const search = (i: number) => {
      if (found) return;
      if (i === length) {
        const a: StageAnswer =
          d.kind === 'volume'
            ? { kind: d.kind, pours: [...counts] }
            : { kind: d.kind, measures: [...counts] };
        if (machineReading(d, a).solved) {
          answer = a;
          found = true;
        }
        return;
      }
      const max =
        d.kind === 'volume'
          ? d.vessels[i].uses
          : d.ingredients[i].supply / d.ingredients[i].measure;
      for (let n = 0; n <= max; n++) {
        counts[i] = n;
        search(i + 1);
      }
    };
    search(0);
  }
  return answer;
}
