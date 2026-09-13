import { evaluateGearLock } from '../gear-lock/gear-lock.domain';
import { evaluateBalanceLock } from '../balance-lock/balance-lock.domain';
import type { EscapeAnswer, EscapePuzzle } from './escape.models';

type Evaluator = (puzzle: EscapePuzzle, answer: EscapeAnswer) => boolean;
/** Installed math mechanisms. Project packages supply content, never executable evaluators. */
export const escapePuzzleEvaluators: Readonly<Record<EscapePuzzle['type'], Evaluator>> = {
  'gear-lock': (p, a) => p.type === 'gear-lock' && Array.isArray(a) && evaluateGearLock(p.lock, a),
  'balance-lock': (p, a) =>
    p.type === 'balance-lock' && Array.isArray(a) && evaluateBalanceLock(p.lock, a),
  number: (p, a) =>
    p.type === 'number' && typeof a === 'number' && Number.isFinite(a) && a === p.answer,
  code: (p, a) => p.type === 'code' && typeof a === 'string' && a === p.answer,
  timing: (p, a) =>
    p.type === 'timing' &&
    typeof a === 'number' &&
    Number.isInteger(a) &&
    a >= p.safeStart &&
    a === p.safeEnd - p.crossing,
  balance: (p, a) =>
    p.type === 'balance' &&
    Array.isArray(a) &&
    a.length > 0 &&
    new Set(a).size === a.length &&
    a.every((i) => Number.isInteger(i) && i >= 0 && i < p.weights.length) &&
    a.reduce((sum, i) => sum + p.weights[i], 0) === p.target,
};

export function evaluateEscapePuzzle(puzzle: EscapePuzzle, answer: EscapeAnswer): boolean {
  return escapePuzzleEvaluators[puzzle.type](puzzle, answer);
}
