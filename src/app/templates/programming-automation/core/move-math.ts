import type { CommandType, MoveCommandType, MoveMathProblem, MoveMathProblems, RobotCommand } from '../domain/automation.models';
import { calculate } from './automation-math';

export const moveMathOperations = {
  add: { symbol: '+', label: 'plus', apply: (a: number, b: number) => a + b },
  subtract: { symbol: '−', label: 'minus', apply: (a: number, b: number) => a - b },
  multiply: { symbol: '×', label: 'times', apply: (a: number, b: number) => a * b },
  divide: { symbol: '÷', label: 'divided by', apply: (a: number, b: number) => a / b },
} as const;

export const isMoveCommand = (type: CommandType): type is MoveCommandType =>
  type === 'move-distance' || type === 'move-rotations';

export function isMoveMathProblem(value: unknown): value is MoveMathProblem {
  if (!value || typeof value !== 'object') return false;
  const problem = value as Record<string, unknown>;
  return typeof problem['operation'] === 'string' && Object.hasOwn(moveMathOperations, problem['operation']) &&
    typeof problem['given'] === 'number' && Number.isFinite(problem['given']) &&
    problem['given'] >= 0 && problem['given'] <= 2000 &&
    (!['multiply', 'divide'].includes(problem['operation']) || problem['given'] > 0);
}

/** A decimal, fraction, or mixed number is one operand. Extra operations are not accepted. */
export function studentMoveNumber(value: string): number {
  if (!value.trim()) throw new Error('Enter your number in the Move block.');
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+|\d+\s+\d+\s*\/\s*\d+|\d+\s*\/\s*\d+)$/.test(value.trim()))
    throw new Error('Enter one number, decimal, or fraction. The mission supplies the operation.');
  // Parse the sign separately so a negative mixed number means -(whole + fraction).
  const trimmed = value.trim();
  return (trimmed.startsWith('-') ? -1 : 1) * calculate(trimmed.replace(/^[+-]/, ''));
}

export function moveMathValue(problem: MoveMathProblem, studentValue: string): number {
  if (!isMoveMathProblem(problem)) throw new Error('This Move problem is invalid.');
  const operand = studentMoveNumber(studentValue);
  if (problem.operation === 'divide' && operand === 0) throw new Error('Choose a number other than zero for division.');
  const result = moveMathOperations[problem.operation].apply(problem.given, operand);
  if (!Number.isFinite(result)) throw new Error('Choose numbers with a finite result.');
  return result;
}

export function commandExpression(command: RobotCommand): string {
  const problem = command.moveMath;
  return problem && isMoveMathProblem(problem)
    ? `${problem.given} ${moveMathOperations[problem.operation].symbol} (${command.value || '?'})`
    : command.value;
}

/** Upgrade numeric drafts without changing their motion. Expressions and recorded snapshots stay intact. */
export function prepareMoveMathCommands(
  commands: readonly RobotCommand[], problems: MoveMathProblems | undefined,
): readonly RobotCommand[] {
  if (!problems) return commands;
  return commands.map((command) => {
    if (command.commands) return { ...command, commands: prepareMoveMathCommands(command.commands, problems) };
    const problem = isMoveCommand(command.type) ? problems[command.type] : undefined;
    if (!problem || command.moveMath || !isMoveMathProblem(problem)) return command;
    if (!command.value.trim()) return { ...command, moveMath: { ...problem } };
    try {
      const previous = studentMoveNumber(command.value);
      const operand = problem.operation === 'add' ? previous - problem.given
        : problem.operation === 'subtract' ? problem.given - previous
        : problem.operation === 'multiply' ? previous / problem.given : problem.given / previous;
      if (!Number.isFinite(operand) || Math.abs(operand) > 1e12) return command;
      const value = Number(operand.toFixed(12)).toString();
      if (Math.abs(moveMathValue(problem, value) - previous) > 1e-9) return command;
      return { ...command, value, moveMath: { ...problem } };
    } catch { return command; }
  });
}
