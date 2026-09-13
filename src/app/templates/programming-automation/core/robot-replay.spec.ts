import { describe, expect, it } from 'vitest';
import { sampleRobotReplay } from './robot-replay';
import { courseProjection } from '../ui/robot-course-engine/robot-course-view';
import type { ReplaySample } from '../domain/automation.models';
import { robotDeliveryConfig } from '../../../projects/robot-delivery/robot-delivery.config';

const start: ReplaySample = {
  xCm: 10, yCm: 20, headingDeg: 350, timeMs: 0, activeCommandId: 'move',
  carryingPackageIds: [], deliveredPackageIds: [], batteryUsed: 0,
};
const end: ReplaySample = {
  ...start, xCm: 30, yCm: 40, headingDeg: 10, timeMs: 100,
  activeCommandId: 'pickup', carryingPackageIds: ['crate'], batteryUsed: 2,
};

describe('robot replay presentation', () => {
  it('interpolates position and the short heading arc without mutating recorded samples', () => {
    const samples = [Object.freeze({ ...start }), Object.freeze({ ...end })];
    expect(sampleRobotReplay(samples, 50)).toMatchObject({
      xCm: 20, yCm: 30, headingDeg: 0, batteryUsed: 1,
      activeCommandId: 'move', carryingPackageIds: [],
    });
    expect(samples).toEqual([start, end]);
  });

  it('switches cargo at the recorded time and preserves exact endpoints', () => {
    expect(sampleRobotReplay([start, end], 0)).toBe(start);
    expect(sampleRobotReplay([start, end], 99)?.carryingPackageIds).toEqual([]);
    expect(sampleRobotReplay([start, end], 100)).toBe(end);
    expect(sampleRobotReplay([start, end], 1000)).toBe(end);
  });

  it('uses the last event state at a duplicate timestamp', () => {
    const delivered = { ...end, carryingPackageIds: [], deliveredPackageIds: ['crate'] };
    expect(sampleRobotReplay([start, end, delivered], 100)).toBe(delivered);
  });

  it('handles empty recordings and times before the first pose', () => {
    expect(sampleRobotReplay([], 10)).toBeUndefined();
    expect(sampleRobotReplay([start, end], -10)).toBe(start);
  });

  it('projects north upwards and keeps equal centimeter distances on both axes', () => {
    const course = robotDeliveryConfig.courses[0];
    const p = courseProjection(course);
    const origin = p.point({ xCm: 0, yCm: 0 });
    const north = p.point({ xCm: 0, yCm: 25 });
    const east = p.point({ xCm: 25, yCm: 0 });
    expect(origin.y).toBe(course.heightCm * 2);
    expect(origin.y - north.y).toBe(p.length(25));
    expect(east.x - origin.x).toBe(p.length(25));
  });
});
