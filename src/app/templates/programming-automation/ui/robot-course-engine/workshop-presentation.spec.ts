import { describe, expect, it } from 'vitest';
import { robotDeliveryConfig as config } from '../../../../projects/robot-delivery/robot-delivery.config';
import { compileProgram } from '../../core/automation-compiler';
import { executeRobot } from '../../core/robot-execution';
import { emptyPrediction, validateAutomationConfig } from '../../core/automation-state';
import { workshopFrame, workshopStatus } from './workshop-presentation';
import type { RobotCourseView } from './robot-course-view';

const course = { ...config.courses.find(c => c.id === 'parking')!, visualTheme: 'workshop' as const };
const challenge = config.challenges.find(c => c.courseId === course.id)!;
const run = (rotations: string, themed = true) => executeRobot(compileProgram({
  id: 'test', version: 1, variables: [],
  commands: [{ id: 'move', type: 'move-rotations', value: rotations }],
}, config.robot, challenge, []).commands,
{ ...course, visualTheme: themed ? 'workshop' : undefined }, config.robot, challenge,
0, emptyPrediction(), config.scoring);
const result = run('5');
const base: RobotCourseView = { course, targetIndex: 0, samples: result.pathSamples,
  events: result.events, result, showTrace: true, follow: false, zoom: 1, reducedMotion: false };

describe('workshop visual slice', () => {
  it('retains legacy workshop outcomes after the new tabletop theme is selected', () => {
    expect(config.courses.every(c => c.visualTheme === 'tabletop')).toBe(true);
    expect(run('5')).toEqual(run('5', false));
    expect(run('3')).toEqual(run('3', false));
  });
  it('never infers success from proximity or reveals scores before replay ends', () => {
    const final = result.pathSamples.at(-1)!;
    expect(workshopStatus({ ...base, sample: { ...final, timeMs: 0 } })).toMatchObject({
      distance: 0, finished: false, success: false, score: undefined,
    });
    expect(workshopStatus({ ...base, sample: final })).toMatchObject({
      finished: true, success: true, score: result.score,
    });
    expect(workshopStatus(base).finished).toBe(false);
  });
  it('reports failed runs from recorded results and clears completion on backward seek', () => {
    const failed = run('3');
    expect(workshopStatus({ ...base, result: failed, samples: failed.pathSamples, sample: failed.pathSamples.at(-1) })).toMatchObject({
      finished: true, success: false, label: 'ADJUST YOUR PROGRAM',
    });
    expect(workshopStatus({ ...base, sample: result.pathSamples[0] }).score).toBeUndefined();
  });
  it('frames every selected goal with start visible and provides a complete overview', () => {
    for (let index = 0; index < course.targets.length; index++) {
      const frame = workshopFrame({ ...base, targetIndex: index });
      for (const pose of [course.startPose, course.targets[index]]) {
        expect(pose.xCm * 2).toBeGreaterThan(frame.x);
        expect(pose.xCm * 2).toBeLessThan(frame.x + frame.width);
        expect((course.heightCm - pose.yCm) * 2).toBeGreaterThan(frame.y);
        expect((course.heightCm - pose.yCm) * 2).toBeLessThan(frame.y + frame.height);
      }
    }
    const full = workshopFrame({ ...base, overview: true });
    expect(full.x).toBeLessThan(0);
    expect(full.x + full.width).toBeGreaterThan(course.widthCm * 2);
  });
  it('accepts legacy courses and rejects unregistered cosmetic themes', () => {
    expect(() => validateAutomationConfig({ ...config,
      courses: config.courses.map(c => ({ ...c, visualTheme: undefined, actors: undefined })) })).not.toThrow();
    expect(() => validateAutomationConfig({ ...config,
      courses: [{ ...course, visualTheme: 'missing' } as unknown as typeof course,
        ...config.courses.filter(c => c.id !== course.id)] })).toThrow('CONFIG_INVALID');
  });
  it('rejects a theme that would hide required course objects', () => {
    expect(() => validateAutomationConfig({ ...config,
      courses: config.courses.map(c => c.id === course.id ? { ...c, visualTheme: 'workshop',
        obstacles: [{ id: 'rack', label: 'Rack', xCm: 100, yCm: 100, widthCm: 20, heightCm: 20 }],
      } : c) })).toThrow('CONFIG_INVALID');
  });
  it('uses the exact replay endpoint when rounded elapsed seconds differ', () => {
    expect(workshopStatus({ ...base, result: { ...result, elapsedSeconds: result.elapsedSeconds + 0.001 },
      sample: result.pathSamples.at(-1) }).finished).toBe(true);
  });
});
