import { describe, expect, it } from 'vitest';
import { robotDeliveryConfig as config } from '../../../projects/robot-delivery/robot-delivery.config';
import type { CompiledCommand, CourseActor, CourseDefinition } from '../domain/automation.models';
import { sampleCourseActor, touchesCourseActor, validCourseActors } from './course-actors';
import { emptyPrediction, validateAutomationConfig } from './automation-state';
import { executeRobot } from './robot-execution';
import { isAutomationState } from '../persistence/automation.persistence';
import { createRobotSampleState } from '../../../projects/robot-delivery/robot-delivery.sample';

const actor: CourseActor = {
  id: 'scout',
  label: 'Scout',
  kind: 'robot',
  radiusCm: 8,
  path: [
    { xCm: 20, yCm: 100 },
    { xCm: 120, yCm: 100 },
  ],
  speedCmPerSecond: 20,
  patrol: 'ping-pong',
  pauseSeconds: 1,
};
const command = (type: CompiledCommand['type'], value: number, rate = 20): CompiledCommand => ({
  id: type,
  type,
  value,
  rate,
  direction: 'right',
});
const course = config.courses.find((c) => c.id === 'patrol')!;
const mission = config.challenges.find((c) => c.courseId === course.id)!;
const run = (commands: CompiledCommand[], arena: CourseDefinition = course) =>
  executeRobot(commands, arena, config.robot, mission, 0, emptyPrediction(), config.scoring);

describe('deterministic course actors', () => {
  it('pauses, reverses at endpoints, and reproduces any requested timestamp', () => {
    expect(sampleCourseActor(actor, 500)).toMatchObject({ xCm: 20, headingDeg: 90, moving: false });
    expect(sampleCourseActor(actor, 3500)).toMatchObject({ xCm: 70, headingDeg: 90, moving: true });
    expect(sampleCourseActor(actor, 6500)).toMatchObject({
      xCm: 120,
      headingDeg: 270,
      moving: false,
    });
    expect(sampleCourseActor(actor, 9500)).toMatchObject({
      xCm: 70,
      headingDeg: 270,
      moving: true,
    });
    expect(sampleCourseActor(actor, 3500)).toEqual(sampleCourseActor(actor, 15500));
    sampleCourseActor(actor, 90000);
    expect(sampleCourseActor(actor, 500)).toEqual(sampleCourseActor(actor, 12500));
  });
  it('closes a loop and respects its configured starting phase', () => {
    const loop: CourseActor = {
      ...actor,
      patrol: 'loop',
      pauseSeconds: 0,
      phaseSeconds: 1,
      path: [
        { xCm: 20, yCm: 20 },
        { xCm: 120, yCm: 20 },
        { xCm: 120, yCm: 120 },
      ],
    };
    expect(sampleCourseActor(loop, 0)).toMatchObject({ xCm: 40, yCm: 20 });
    expect(sampleCourseActor(loop, 6500)).toMatchObject({ xCm: 120, yCm: 70 });
    expect(sampleCourseActor(loop, 11000).xCm).toBeLessThan(120);
    expect(sampleCourseActor(loop, 11000).headingDeg).toBe(225);
  });
  it('stops at a moving robot and lets a timed WAIT avoid the same crossing', () => {
    const failed = run([command('move-distance', 280)]);
    expect(failed.completedMission).toBe(false);
    expect(failed.collisions).toBe(1);
    expect(failed.stoppedReason).toContain('Scout patrol');
    expect(failed.elapsedSeconds).toBeLessThan(7);
    const final = failed.pathSamples.at(-1)!;
    expect(touchesCourseActor(final, config.robot.radiusCm, course.actors![0], final.timeMs)).toBe(
      true,
    );
    expect(failed.events.some((e) => e.message.includes('WAIT timing'))).toBe(true);
    const commands = [command('wait', 4), command('move-distance', 280)];
    const success = run(commands);
    expect(success.completedMission).toBe(true);
    expect(success.elapsedSeconds).toBe(18);
    expect(success).toEqual(run(commands));
    expect(success.collisions).toBe(0);
  });
  it('detects patrol impacts during waits, turns, and pickup time, including fast crossings', () => {
    const arena: CourseDefinition = {
      ...course,
      startPose: { xCm: 60, yCm: 100, headingDeg: 0 },
      actors: [{ ...actor, speedCmPerSecond: 80, pauseSeconds: 0 }],
      packages: [{ id: 'box', label: 'Box', xCm: 60, yCm: 100, deliveryZoneId: 'dock' }],
    };
    for (const cmd of [
      command('wait', 2),
      command('turn-degrees', 90, 45),
      { ...command('pick-up', 0), packageId: 'box' },
    ]) {
      const result = run([cmd], arena);
      expect(result.collisions, cmd.type).toBe(1);
      expect(result.elapsedSeconds).toBeLessThan(1);
      expect(result.pathSamples.at(-1)!.carryingPackageIds).toEqual([]);
    }
  });
  it('uses rectangular gate bounds and a second WAIT can clear the gate', () => {
    const gates = config.courses.find((c) => c.id === 'gates')!;
    const approach = [
      command('wait', 4),
      command('move-distance', 280),
      command('turn-degrees', 90, 45),
    ];
    expect(run([...approach, command('move-distance', 240)], gates).stoppedReason).toContain(
      'Sliding gate',
    );
    expect(
      run([...approach, command('wait', 4), command('move-distance', 240)], gates).completedMission,
    ).toBe(true);
    const gate = gates.actors![1];
    const point = sampleCourseActor(gate, 0);
    expect(touchesCourseActor({ ...point, xCm: point.xCm + 25 }, 8, gate, 0)).toBe(true);
    expect(touchesCourseActor({ ...point, xCm: point.xCm + 27 }, 8, gate, 0)).toBe(false);
  });
  it('does not deliver cargo if a patrol hits during drop-off time', () => {
    const arena: CourseDefinition = {
      ...course,
      startPose: { xCm: 60, yCm: 100, headingDeg: 0 },
      actors: [{ ...actor, pauseSeconds: 0 }],
      packages: [{ id: 'box', label: 'Box', xCm: 60, yCm: 100, deliveryZoneId: 'dock' }],
      deliveryZones: [{ id: 'dock', label: 'Dock', xCm: 50, yCm: 90, widthCm: 20, heightCm: 20 }],
    };
    const result = run(
      [
        { ...command('pick-up', 0), packageId: 'box' },
        { ...command('drop-off', 0), packageId: 'box' },
      ],
      arena,
    );
    expect(result.collisions).toBe(1);
    expect(result.deliveriesCompleted).toBe(0);
    expect(result.pathSamples.at(-1)!.carryingPackageIds).toEqual(['box']);
  });
  it('leaves historical courses without actors unchanged', () => {
    const commands = [command('move-distance', 280)];
    expect(run(commands, { ...course, actors: undefined })).toEqual(
      run(commands, { ...course, actors: [] }),
    );
  });
  it('rejects malformed routes, duplicate IDs, unsupported renderers, and a blocked start', () => {
    for (const actors of [
      [{ ...actor, speedCmPerSecond: 0 }],
      [{ ...actor, path: [actor.path[0]] }],
      [{ ...actor, radiusCm: 0 }],
      [actor, actor],
      [{ ...actor, path: [{ xCm: -1, yCm: 100 }, actor.path[1]] }],
    ]) {
      expect(validCourseActors(actors, 400, 400)).toBe(false);
    }
    expect(validCourseActors([actor], 400, 400)).toBe(true);
    for (const invalid of [
      { ...course, visualTheme: undefined },
      {
        ...course,
        actors: [{ ...actor, path: [course.startPose, actor.path[1]], pauseSeconds: 1 }],
      },
    ]) {
      expect(() =>
        validateAutomationConfig({
          ...config,
          courses: config.courses.map((c) => (c.id === course.id ? invalid : c)),
        }),
      ).toThrow('CONFIG_INVALID');
    }
  });
  it('preserves patrol definitions in trial snapshots and validates imported actor data', () => {
    const state = createRobotSampleState();
    expect(isAutomationState(state)).toBe(true);
    const trial = state.trials.find((t) => t.challengeId === 'patrol-crossing')!;
    expect(trial.version.course.actors).toEqual(course.actors);
    expect(trial.version.course.actors).not.toBe(course.actors);
    const corrupt = structuredClone(state);
    const saved = corrupt.trials.find((t) => t.challengeId === 'patrol-crossing')!;
    saved.version.course.actors![0].speedCmPerSecond = NaN;
    expect(isAutomationState(corrupt)).toBe(false);
    saved.version.course.actors![0].speedCmPerSecond = 40;
    saved.version.course.visualTheme = undefined;
    expect(isAutomationState(corrupt)).toBe(false);
  });
});
