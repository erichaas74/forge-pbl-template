import { describe, expect, it } from 'vitest';

import { emergencyOutcomes, emergencyTests, judgeCall } from './emergency.config';

describe('Bay 3 incident', () => {
  it('grades a correct call with no discriminating test as unsupported', () => {
    expect(judgeCall('bicarbonate', 'bicarbonate', 0).id).toBe('unsupported');
    expect(judgeCall('bicarbonate', 'bicarbonate', 1).id).toBe('neutralised');
  });

  it('treats holding for confirmation as a defensible outcome, never a wrong answer', () => {
    expect(judgeCall('contain', 'bicarbonate', 0).id).toBe('held');
    expect(judgeCall('contain', 'cornstarch', 3).id).toBe('held');
  });

  it('rejects a call that names the wrong substance', () => {
    expect(judgeCall('cornstarch', 'bicarbonate', 2).tone).toBe('bad');
    expect(judgeCall('bicarbonate', 'cornstarch', 2).tone).toBe('bad');
  });

  it('only neutralises the spill when bicarbonate was actually authorised', () => {
    expect(judgeCall('bicarbonate', 'bicarbonate', 2).neutralises).toBe(true);
    expect(judgeCall('cornstarch', 'cornstarch', 2).neutralises).toBe(false);
  });

  it('gives every test a reading for both candidates, and cannot be run for free', () => {
    for (const test of emergencyTests) {
      expect(test.cost).toBeGreaterThan(0);
      expect(emergencyOutcomes.bicarbonate[test.id]['reading']).toBeTruthy();
      expect(emergencyOutcomes.cornstarch[test.id]['reading']).toBeTruthy();
    }
  });

  it('makes every decisive test actually separate the two candidates', () => {
    for (const test of emergencyTests.filter((item) => item.decisive)) {
      expect(emergencyOutcomes.bicarbonate[test.id]['reading']).not.toBe(
        emergencyOutcomes.cornstarch[test.id]['reading'],
      );
    }
  });
});
