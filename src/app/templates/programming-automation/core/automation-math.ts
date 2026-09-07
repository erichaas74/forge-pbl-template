import type { MathEvidence, MathTool, MathUnit } from '../domain/automation.models';
export const mathTools: readonly {
  id: MathTool;
  title: string;
  inputs: readonly string[];
  formula: string;
  unit: MathUnit;
}[] = [
  {
    id: 'circumference',
    title: 'Wheel circumference',
    inputs: ['Wheel diameter (cm)'],
    formula: 'Diameter × 3.14',
    unit: 'cm',
  },
  {
    id: 'rotation-distance',
    title: 'Distance from rotations',
    inputs: ['Rotations (decimal or fraction)', 'Travel per rotation (cm)'],
    formula: 'Rotations × travel per rotation',
    unit: 'cm',
  },
  {
    id: 'distance-rotations',
    title: 'Rotations for a distance',
    inputs: ['Target distance (cm)', 'Travel per rotation (cm)'],
    formula: 'Distance ÷ travel per rotation',
    unit: 'rotations',
  },
  {
    id: 'fraction-turn',
    title: 'Fraction of a turn → degrees',
    inputs: ['Fraction of a full turn'],
    formula: 'Fraction × 360',
    unit: 'degrees',
  },
  {
    id: 'degrees-fraction',
    title: 'Degrees → fraction of a turn',
    inputs: ['Angle (degrees)'],
    formula: 'Degrees ÷ 360',
    unit: 'turns',
  },
  {
    id: 'turn-time',
    title: 'Time for a turn',
    inputs: ['Angle (degrees)', 'Turn rate (degrees/second)'],
    formula: 'Degrees ÷ turn rate',
    unit: 'seconds',
  },
  {
    id: 'movement-time',
    title: 'Travel time',
    inputs: ['Distance (cm)', 'Speed (cm/second)'],
    formula: 'Distance ÷ speed',
    unit: 'seconds',
  },
  {
    id: 'grid-distance',
    title: 'Grid distance',
    inputs: [
      'Start x (squares)',
      'Start y (squares)',
      'End x (squares)',
      'End y (squares)',
      'Grid scale (cm/square)',
    ],
    formula: 'Horizontal change + vertical change, then × grid scale',
    unit: 'cm',
  },
];
/** Small arithmetic grammar: numbers, fractions, mixed numbers, variables and + - * /. Never evaluates code. */
export function calculate(
  expression: string,
  variables: Readonly<Record<string, number>> = {},
): number {
  const normalized = expression
    .trim()
    .replace(/(\d+)\s+(\d+)\s*\/\s*(\d+)/g, '($1+$2/$3)')
    .replace(/×/g, '*')
    .replace(/÷/g, '/');
  const tokens = normalized.match(/(?:\d+(?:\.\d*)?|\.\d+)|[A-Za-z_][A-Za-z_0-9]*|[()+*/-]/g) ?? [];
  if (!tokens.length || tokens.length > 100 || tokens.join('') !== normalized.replace(/\s+/g, ''))
    throw new Error('Use numbers, fractions, variables and arithmetic only.');
  let index = 0;
  const atom = (): number => {
    const token = tokens[index++];
    if (token === '-') return -atom();
    if (token === '+') return atom();
    if (token === '(') {
      const n = sum();
      if (tokens[index++] !== ')') throw new Error('Close the parentheses.');
      return n;
    }
    if (token && /^(?:\d|\.)/.test(token)) return Number(token);
    if (token && Object.hasOwn(variables, token)) return variables[token];
    throw new Error(`Unknown value ${token ?? '(blank)'}.`);
  };
  const product = (): number => {
    let n = atom();
    while (tokens[index] === '*' || tokens[index] === '/') {
      const op = tokens[index++],
        right = atom();
      n = op === '*' ? n * right : n / right;
    }
    return n;
  };
  const sum = (): number => {
    let n = product();
    while (tokens[index] === '+' || tokens[index] === '-') {
      const op = tokens[index++],
        right = product();
      n = op === '+' ? n + right : n - right;
    }
    return n;
  };
  const answer = sum();
  if (index !== tokens.length || !Number.isFinite(answer) || Math.abs(answer) > 1e6)
    throw new Error('Check the calculation and avoid division by zero.');
  return answer;
}
export function expectedMath(tool: MathTool, values: readonly number[]): number {
  const definition = mathTools.find((item) => item.id === tool);
  if (
    !definition ||
    values.length !== definition.inputs.length ||
    values.some((value) => !Number.isFinite(value) || value < 0)
  )
    throw new Error('Complete every input with a nonnegative number.');
  const [a, b, c, d, e] = values;
  let result: number;
  switch (tool) {
    case 'circumference':
      result = a * 3.14;
      break;
    case 'rotation-distance':
      result = a * b;
      break;
    case 'distance-rotations':
    case 'turn-time':
    case 'movement-time':
      result = a / b;
      break;
    case 'fraction-turn':
      result = a * 360;
      break;
    case 'degrees-fraction':
      result = a / 360;
      break;
    case 'grid-distance':
      result = (Math.abs(c - a) + Math.abs(d - b)) * e;
      break;
  }
  if (!Number.isFinite(result) || result < 0) throw new Error('Use a positive divisor.');
  return result;
}
export function evidenceIsCorrect(evidence: MathEvidence): boolean {
  try {
    return (
      evidence.status === 'correct' &&
      evidence.explanation.trim().length >= 8 &&
      Math.abs(evidence.answer - expectedMath(evidence.tool, evidence.inputs)) <= 0.01 &&
      evidence.unit === mathTools.find((tool) => tool.id === evidence.tool)?.unit
    );
  } catch {
    return false;
  }
}
export function decimalAndFraction(value: number): string {
  for (const denominator of [2, 4, 8, 10, 100]) {
    const numerator = Math.round(value * denominator);
    if (Math.abs(value - numerator / denominator) < 1e-6 && numerator % denominator) {
      const whole = Math.floor(numerator / denominator),
        remainder = numerator % denominator;
      return `${value} = ${whole ? whole + ' ' : ''}${remainder}/${denominator}`;
    }
  }
  return `${Math.round(value * 1000) / 1000}`;
}
