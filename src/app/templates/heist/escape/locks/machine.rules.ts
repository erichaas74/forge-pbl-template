import type {
  MachineAnswer,
  MachineChallenge,
  MachineDefinition,
  MachineInput,
  MachineKind,
  MachineReading,
  StageAnswer,
} from './machine.models';
import { cableLength, coordinateTarget, traceBeam } from './machine.geometry';

type Rule = {
  initial: (d: MachineChallenge) => StageAnswer;
  valid: (d: MachineChallenge, a: StageAnswer) => boolean;
  read: (d: MachineChallenge, a: StageAnswer) => MachineReading;
};
const integers = (a: unknown, length: number, min: number, max: number): a is readonly number[] =>
  Array.isArray(a) &&
  a.length === length &&
  a.every((n) => Number.isInteger(n) && n >= min && n <= max);
const result = (solved: boolean, feedback: string, equation: string): MachineReading => ({
  solved,
  feedback,
  equation,
});
export const firstAlignment = (
  periods: readonly number[],
  phases: readonly number[],
  max: number,
): number => {
  for (let t = 1; t <= max; t++) if (periods.every((p, i) => (t + phases[i]) % p === 0)) return t;
  return -1;
};
export const machineRules: Readonly<Record<MachineKind, Rule>> = {
  'fraction-gear': {
    initial: (d) => ({
      kind: 'fraction-gear',
      offsets: d.kind === 'fraction-gear' ? d.pieces.map(() => -1) : [],
    }),
    valid: (d, a) =>
      d.kind === 'fraction-gear' &&
      a.kind === 'fraction-gear' &&
      integers(a.offsets, d.pieces.length, -1, d.slots - 1),
    read: (d, a) => {
      if (d.kind !== 'fraction-gear' || a.kind !== 'fraction-gear')
        return result(false, 'Wrong mechanism.', '');
      const filled = new Set<number>();
      let overlap = false,
        total = 0;
      const parts: string[] = [];
      d.pieces.forEach((p, i) => {
        if (a.offsets[i] >= 0) {
          const size = (d.slots * p.numerator) / p.denominator;
          total += size;
          parts.push(`${p.numerator}/${p.denominator}`);
          for (let j = 0; j < size; j++) {
            const slot = (a.offsets[i] + j) % d.slots;
            if (filled.has(slot)) overlap = true;
            filled.add(slot);
          }
        }
      });
      const solved = total === d.slots && !overlap && filled.size === d.slots;
      return result(
        solved,
        solved
          ? d.success
          : overlap
            ? 'Two sectors overlap. Lift or rotate a piece until each tooth has its own space.'
            : `The wheel still has ${d.slots - filled.size} of ${d.slots} rim marks uncovered.`,
        `${parts.join(' + ') || '0'} ${total === d.slots ? '=' : '≠'} 1 whole`,
      );
    },
  },
  volume: {
    initial: (d) => ({ kind: 'volume', pours: d.kind === 'volume' ? d.vessels.map(() => 0) : [] }),
    valid: (d, a) =>
      d.kind === 'volume' &&
      a.kind === 'volume' &&
      integers(a.pours, d.vessels.length, 0, 30) &&
      a.pours.every((n, i) => n <= d.vessels[i].uses),
    read: (d, a) => {
      if (d.kind !== 'volume' || a.kind !== 'volume') return result(false, 'Wrong mechanism.', '');
      const total = a.pours.reduce((s, n, i) => s + n * d.vessels[i].amount, 0),
        solved = total === d.target;
      return result(
        solved,
        solved
          ? d.success
          : total > d.capacity
            ? 'The overflow basin catches the excess. Drain the chamber and try a smaller combination.'
            : total > d.target
              ? 'The float is above the release notch. Remove a measured pour or drain and rebuild.'
              : 'The float sits below the release notch. More liquid is needed.',
        d.targetLabel
          ? `${total / d.unitTicks} ${d.unit} in a ${d.capacity / d.unitTicks} ${d.unit} chamber`
          : `${total / d.unitTicks} ${total === d.target ? '=' : total < d.target ? '<' : '>'} ${d.target / d.unitTicks} ${d.unit}`,
      );
    },
  },
  'timing-wheels': {
    initial: () => ({ kind: 'timing-wheels', steps: 0 }),
    valid: (d, a) =>
      d.kind === 'timing-wheels' &&
      a.kind === 'timing-wheels' &&
      Number.isInteger(a.steps) &&
      a.steps >= 0 &&
      a.steps <= d.maxSteps,
    read: (d, a) => {
      if (d.kind !== 'timing-wheels' || a.kind !== 'timing-wheels')
        return result(false, 'Wrong mechanism.', '');
      const aligned = d.periods.every((p, i) => (a.steps + d.phases[i]) % p === 0),
        first = firstAlignment(d.periods, d.phases, d.maxSteps),
        solved = a.steps > 0 && aligned && (!d.firstAlignment || a.steps === first);
      return result(
        solved,
        solved
          ? d.success
          : a.steps === 0
            ? 'The starting position does not count. Find the next shared opening.'
            : aligned
              ? 'The holes align, but the first shared opening was earlier. Rewind to catch the first release.'
              : 'The rod meets a closed wheel. Compare each wheel’s remainder.',
        d.periods
          .map(
            (p, i) =>
              `Wheel ${i + 1}: (${a.steps} + ${d.phases[i]}) ÷ ${p}, remainder ${(a.steps + d.phases[i]) % p}`,
          )
          .join('  ·  '),
      );
    },
  },
  coordinate: {
    initial: (d) => ({
      kind: 'coordinate',
      x: d.kind === 'coordinate' ? Math.max(0, d.min) : 0,
      y: d.kind === 'coordinate' ? Math.max(0, d.min) : 0,
    }),
    valid: (d, a) =>
      d.kind === 'coordinate' &&
      a.kind === 'coordinate' &&
      [a.x, a.y].every((n) => Number.isInteger(n) && n >= d.min && n <= d.max),
    read: (d, a) => {
      if (d.kind !== 'coordinate' || a.kind !== 'coordinate')
        return result(false, 'Wrong mechanism.', '');
      const t = coordinateTarget(d),
        solved = a.x === t.x && a.y === t.y;
      return result(
        solved,
        solved
          ? d.success
          : 'The pin is over a different grid socket. Use the chart to set horizontal x first, then vertical y.',
        `Carriage (${a.x}, ${a.y})${solved ? ' — release socket aligned' : ''}`,
      );
    },
  },
  reflection: {
    initial: (d) => ({
      kind: 'reflection',
      angles: d.kind === 'reflection' ? d.mirrors.map((m) => m.start) : [],
    }),
    valid: (d, a) =>
      d.kind === 'reflection' &&
      a.kind === 'reflection' &&
      integers(a.angles, d.mirrors.length, 0, 179) &&
      a.angles.every((n, i) => n % d.mirrors[i].step === 0),
    read: (d, a) => {
      if (d.kind !== 'reflection' || a.kind !== 'reflection')
        return result(false, 'Wrong mechanism.', '');
      const beam = traceBeam(d, a.angles);
      return result(
        beam.hit,
        beam.hit
          ? d.success
          : beam.reason === 'blocked'
            ? 'The beam strikes an obstacle. Turn a mirror to route the light around it.'
            : 'The receiver is dark. Adjust the mirrors and follow the reflected beam.',
        a.angles.map((n, i) => `Mirror ${i + 1}: ${n}°`).join('  ·  '),
      );
    },
  },
  mixing: {
    initial: (d) => ({
      kind: 'mixing',
      measures: d.kind === 'mixing' ? d.ingredients.map(() => 0) : [],
    }),
    valid: (d, a) =>
      d.kind === 'mixing' &&
      a.kind === 'mixing' &&
      integers(a.measures, d.ingredients.length, 0, 100) &&
      a.measures.every((n, i) => n * d.ingredients[i].measure <= d.ingredients[i].supply),
    read: (d, a) => {
      if (d.kind !== 'mixing' || a.kind !== 'mixing') return result(false, 'Wrong mechanism.', '');
      const amounts = a.measures.map((n, i) => n * d.ingredients[i].measure),
        total = amounts.reduce((s, n) => s + n, 0),
        ratio =
          total > 0 &&
          amounts.every(
            (n, i) => n * d.ingredients[0].parts === amounts[0] * d.ingredients[i].parts,
          ),
        solved = ratio && total <= d.capacity && (d.total === undefined || total === d.total);
      return result(
        solved,
        solved
          ? d.success
          : total > d.capacity
            ? 'The mixing chamber is overloaded. Drain or remove measured ingredients.'
            : ratio
              ? 'The composition sensor passes. Adjust the total to the operating line.'
              : total === 0
                ? 'Dispense each ingredient to create a sample.'
                : 'The composition sensor is off its mark. Adjust the relationship between the ingredients.',
        `${amounts.map((n) => n / d.unitTicks).join(' : ')}  ·  Total ${total / d.unitTicks} ${d.unit}${ratio ? '  ·  Composition aligned' : ''}`,
      );
    },
  },
  cable: {
    initial: () => ({ kind: 'cable', cable: -1 }),
    valid: (d, a) =>
      d.kind === 'cable' &&
      a.kind === 'cable' &&
      Number.isInteger(a.cable) &&
      a.cable >= -1 &&
      a.cable < d.cables.length,
    read: (d, a) => {
      if (d.kind !== 'cable' || a.kind !== 'cable') return result(false, 'Wrong mechanism.', '');
      const chosen = d.cables[a.cable];
      if (!chosen)
        return result(false, 'Select a cable, then hook it onto the anchors.', 'No cable attached');
      const required = cableLength(d),
        solved = Math.abs(chosen.length * chosen.length - required * required) < 1e-8;
      return result(
        solved,
        solved
          ? d.success
          : chosen.length < required
            ? 'The hook stops short. This cable cannot reach the second anchor.'
            : 'The cable sags. The spring carriage cannot pull the latch with this much slack.',
        `${chosen.label} attached${solved ? ' — spring tension aligned' : ''}`,
      );
    },
  },
};
export function initialMachine(d: MachineDefinition): MachineAnswer {
  return {
    type: 'machine-lock',
    stages: d.stages.map((s) => machineRules[s.kind].initial(s)),
    seals: [],
  };
}
export function validMachineAnswer(d: MachineDefinition, value: unknown): value is MachineAnswer {
  if (
    !value ||
    typeof value !== 'object' ||
    !('type' in value) ||
    value.type !== 'machine-lock' ||
    !('stages' in value) ||
    !Array.isArray(value.stages) ||
    value.stages.length !== d.stages.length
  )
    return false;
  if (
    !('seals' in value) ||
    !Array.isArray(value.seals) ||
    value.seals.length > d.stages.length ||
    !value.seals.every((id, i) => id === d.stages[i].id)
  )
    return false;
  return (
    value.stages.every(
      (a, i) =>
        a &&
        typeof a === 'object' &&
        machineRules[d.stages[i].kind].valid(d.stages[i], a as StageAnswer),
    ) &&
    value.seals.every(
      (_, i) => machineReading(d.stages[i], (value.stages as StageAnswer[])[i]).solved,
    )
  );
}
export function machineReading(d: MachineChallenge, a: StageAnswer): MachineReading {
  return machineRules[d.kind].valid(d, a)
    ? machineRules[d.kind].read(d, a)
    : result(false, 'The mechanism settings could not be read. Reset this stage.', '');
}
export function evaluateMachine(d: MachineDefinition, a: unknown): boolean {
  return (
    validMachineAnswer(d, a) && d.stages.every((s, i) => machineReading(s, a.stages[i]).solved)
  );
}
export function reduceMachine(
  d: MachineChallenge,
  a: StageAnswer,
  input: MachineInput,
): StageAnswer {
  if (input.type === 'reset') return machineRules[d.kind].initial(d);
  let next: StageAnswer = a;
  if (a.kind === 'fraction-gear' && input.type === 'piece')
    next = { ...a, offsets: a.offsets.map((n, i) => (i === input.index ? input.offset : n)) };
  if (a.kind === 'volume' && input.type === 'pour')
    next = { ...a, pours: a.pours.map((n, i) => (i === input.index ? n + input.delta : n)) };
  if (a.kind === 'timing-wheels' && input.type === 'steps') next = { ...a, steps: input.value };
  if (a.kind === 'coordinate' && input.type === 'point') next = { ...a, x: input.x, y: input.y };
  if (a.kind === 'reflection' && input.type === 'mirror')
    next = { ...a, angles: a.angles.map((n, i) => (i === input.index ? input.angle : n)) };
  if (a.kind === 'mixing' && input.type === 'measure')
    next = { ...a, measures: a.measures.map((n, i) => (i === input.index ? n + input.delta : n)) };
  if (a.kind === 'cable' && input.type === 'cable') next = { ...a, cable: input.index };
  return machineRules[d.kind].valid(d, next) ? next : a;
}
