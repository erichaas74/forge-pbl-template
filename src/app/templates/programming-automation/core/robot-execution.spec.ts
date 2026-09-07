import { describe, expect, it } from 'vitest';
import { robotDeliveryConfig as config } from '../../../projects/robot-delivery/robot-delivery.config';
import { calculate, expectedMath } from './automation-math';
import { compileProgram } from './automation-compiler';
import { executeRobot } from './robot-execution';
import { emptyPrediction, validateAutomationConfig } from './automation-state';
import { createRobotSampleState } from '../../../projects/robot-delivery/robot-delivery.sample';
const challenge = config.challenges.find((item) => item.id === 'precision-parking')!;
const course = config.courses.find((item) => item.id === challenge.courseId)!;
const program = {
  id: 'test',
  version: 1,
  variables: [],
  commands: [{ id: 'move', type: 'move-rotations' as const, value: '5' }],
};
describe('Programming and automation vertical slice', () => {
  it('executes every finished example mission and preserves a failed championship trial', () => {
    const sample = createRobotSampleState();
    expect(sample.trials.filter((t) => t.completedMission).length).toBe(10);
    const championship = sample.trials.filter((t) => t.challengeId === 'championship');
    expect(championship.map((t) => t.stoppingErrorCm)).toEqual([20, 0, 0]);
    expect(championship.at(-1)?.deliveriesCompleted).toBe(2);
    expect(championship.at(-1)?.collisions).toBe(0);
    expect(championship.at(-1)?.distanceCm).toBe(800);
    expect(championship.at(-1)?.elapsedSeconds).toBeGreaterThan(50);
  });
  it('stops exactly at the battery budget and resets cargo on a new execution', () => {
    const compiled = compileProgram(program, config.robot, challenge, []);
    const result = executeRobot(
      compiled.commands,
      course,
      config.robot,
      { ...challenge, batteryCapacity: 3 },
      0,
      emptyPrediction(),
      config.scoring,
    );
    expect(result.batteryUsed).toBe(3);
    expect(result.distanceCm).toBe(60);
    expect(result.completedMission).toBe(false);
    const sample = createRobotSampleState();
    const run = sample.trials.at(-1)!;
    const replay = executeRobot(
      compileProgram(
        run.version.program,
        run.version.robot,
        config.challenges.at(-1)!,
        run.version.math,
      ).commands,
      run.version.course,
      run.version.robot,
      config.challenges.at(-1)!,
      0,
      run.version.prediction,
      config.scoring,
    );
    expect(replay.pathSamples[0].carryingPackageIds).toEqual([]);
    expect(replay.deliveriesCompleted).toBe(2);
    expect(replay.pathSamples.at(-1)?.carryingPackageIds).toEqual([]);
  });
  it('validates the reusable project config', () =>
    expect(() => validateAutomationConfig(config)).not.toThrow());
  it('supports fractions and variables without executing source code', () => {
    expect(calculate('2 1/4 * SIDE', { SIDE: 24 })).toBe(54);
    expect(() => calculate('window.alert(1)')).toThrow();
    expect(() => calculate('1 / 0')).toThrow();
    expect(expectedMath('circumference', [8])).toBe(25.12);
  });
  it('parks deterministically and retains replay with source-command identifiers', () => {
    const compiled = compileProgram(program, config.robot, challenge, []);
    expect(compiled.issues[0].severity).toBe('warning');
    const run = () =>
      executeRobot(
        compiled.commands,
        course,
        config.robot,
        challenge,
        0,
        emptyPrediction(),
        config.scoring,
      );
    const first = run();
    expect(first).toEqual(run());
    expect(first.completedMission).toBe(true);
    expect(first.distanceCm).toBe(120);
    expect(first.stoppingErrorCm).toBeLessThan(0.00001);
    expect(first.elapsedSeconds).toBe(6);
    expect(first.pathSamples.at(-1)?.activeCommandId).toBe('move');
  });
  it('requires correct, unit-matched math for assessed runs', () => {
    expect(
      compileProgram(program, config.robot, challenge, [], true).issues.some(
        (issue) => issue.severity === 'error',
      ),
    ).toBe(true);
  });
  it('stops before obstacles even at high speed', () => {
    const obstacle = {
      ...course,
      obstacles: [{ id: 'thin', label: 'thin', xCm: 30, yCm: 100, widthCm: 40, heightCm: 1 }],
    };
    const result = executeRobot(
      [{ id: 'fast', type: 'move-distance', value: 120, rate: 100, direction: 'right' }],
      obstacle,
      config.robot,
      challenge,
      0,
      emptyPrediction(),
      config.scoring,
    );
    expect(result.collisions).toBe(1);
    expect(result.completedMission).toBe(false);
    expect(result.pathSamples.at(-1)!.yCm).toBeLessThan(100);
  });
  it('expands loops and named measurements and bounds runaway code', () => {
    const challenge = { ...config.challenges[5], maximumCommands: 100 };
    const commands = [
      {
        id: 'repeat',
        type: 'repeat' as const,
        value: '4',
        commands: [{ id: 'go', type: 'move-distance' as const, value: 'SIDE' }],
      },
    ];
    const result = compileProgram(
      {
        id: 'loop',
        version: 1,
        variables: [{ id: 'v', name: 'SIDE', value: '25 * 4', unit: 'cm' }],
        commands,
      },
      config.robot,
      challenge,
      [],
    );
    expect(result.commands.map((command) => command.value)).toEqual([100, 100, 100, 100]);
    expect(
      compileProgram(
        { id: 'bad', version: 1, variables: [], commands: [{ ...commands[0], value: '999' }] },
        config.robot,
        challenge,
        [],
      ).issues.some((issue) => issue.severity === 'error'),
    ).toBe(true);
  });
});
