import { describe, expect, it } from 'vitest';
import { robotDeliveryConfig as config } from '../../../projects/robot-delivery/robot-delivery.config';
import type { MoveMathProblem, RobotCommand, RobotProgram } from '../domain/automation.models';
import { isAutomationState } from '../persistence/automation.persistence';
import { compileProgram } from './automation-compiler';
import { initialAutomationState, validateAutomationConfig } from './automation-state';
import { commandExpression, moveMathValue, prepareMoveMathCommands, studentMoveNumber } from './move-math';

const challenge = config.challenges.find(c => c.id === 'precision-parking')!;
const program = (problem: MoveMathProblem, value: string): RobotProgram => ({
  id: 'math-program', version: 1, variables: [],
  commands: [{ id: 'move', type: 'move-distance', value, moveMath: problem }],
});
const compile = (problem: MoveMathProblem, value: string) => compileProgram(program(problem, value), config.robot, challenge, []);

describe('Mission-defined Move math', () => {
  it.each([
    ['add', 20, '100'], ['subtract', 150, '30'], ['multiply', 24, '5'], ['divide', 240, '2'],
  ] as const)('compiles %s from the given first number and student second number', (operation, given, operand) => {
    const result = compile({ operation, given }, operand);
    expect(result.issues.filter(issue => issue.severity === 'error')).toEqual([]);
    expect(result.commands[0]).toMatchObject({ id: 'move', type: 'move-distance', value: 120 });
  });

  it('accepts one decimal, fraction, or signed mixed number without an extra operation', () => {
    expect(moveMathValue({ operation: 'multiply', given: 24 }, '1/2')).toBe(12);
    expect(moveMathValue({ operation: 'multiply', given: 24 }, '1 1/4')).toBe(30);
    expect(studentMoveNumber('-1 1/2')).toBe(-1.5);
    expect(studentMoveNumber('.00000001')).toBe(1e-8);
    expect(() => studentMoveNumber('2 + 3')).toThrow('one number');
    expect(() => studentMoveNumber('SIDE')).toThrow('one number');
  });

  it.each([
    [{ operation: 'divide', given: 240 }, '0', 'other than zero'],
    [{ operation: 'multiply', given: 24 }, '', 'Enter your number'],
    [{ operation: 'subtract', given: 20 }, '30', 'outside'],
    [{ operation: 'multiply', given: 24 }, '100', 'outside'],
    [{ operation: 'add', given: 2 }, '1/0', 'division by zero'],
  ] as const)('rejects invalid movement instead of running it', (problem, operand, message) => {
    const result = compile(problem, operand);
    expect(result.commands).toEqual([]);
    expect(result.issues.some(issue => issue.code === 'COMMAND_INVALID' && issue.message.toLowerCase().includes(message.toLowerCase()))).toBe(true);
  });

  it('upgrades numeric drafts and nested moves without changing their movement or rewriting expressions', () => {
    const commands: readonly RobotCommand[] = [{ id: 'repeat', type: 'repeat', value: '2', commands: [
      { id: 'move', type: 'move-distance', value: '120' },
      { id: 'variable', type: 'move-distance', value: 'SIDE / 2' },
    ] }];
    const upgraded = prepareMoveMathCommands(commands, { 'move-distance': { given: 24, operation: 'multiply' } });
    expect(upgraded[0].commands?.[0]).toMatchObject({ value: '5', moveMath: { given: 24, operation: 'multiply' } });
    expect(upgraded[0].commands?.[1]).toEqual(commands[0].commands?.[1]);
    expect(commands[0].commands?.[0].value).toBe('120');
    expect(prepareMoveMathCommands(upgraded, { 'move-distance': { given: 10, operation: 'add' } })).toEqual(upgraded);
  });

  it('preserves legacy expressions when the new division problem cannot represent their result', () => {
    const zero: RobotCommand = { id: 'zero', type: 'move-distance', value: '0' };
    expect(prepareMoveMathCommands([zero], { 'move-distance': { given: 200, operation: 'divide' } })).toEqual([zero]);
  });

  it('validates problem configuration and saved question metadata', () => {
    const invalid = structuredClone(config);
    invalid.challenges[0].moveMath = { 'move-distance': { given: 0, operation: 'divide' } };
    expect(() => validateAutomationConfig(invalid)).toThrow('CONFIG_INVALID');
    const state = structuredClone(initialAutomationState(config));
    expect(isAutomationState(state)).toBe(true);
    state.drafts['precision-parking'].program.commands[0].moveMath!.given = NaN;
    expect(isAutomationState(state)).toBe(false);
  });

  it('renders the complete recorded expression for the evidence portfolio', () => {
    expect(commandExpression(program({ given: 24, operation: 'multiply' }, '5').commands[0])).toBe('24 × (5)');
    expect(commandExpression({ id: 'legacy', type: 'move-distance', value: 'SIDE / 2' })).toBe('SIDE / 2');
  });
});
