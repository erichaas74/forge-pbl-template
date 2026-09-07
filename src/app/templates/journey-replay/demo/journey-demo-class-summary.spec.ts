import { describe, expect, it } from 'vitest';

import { ageOfExplorationJourneyConfig } from '../../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import { createDemoJourneyClassSummary } from './journey-demo-class-summary';

describe('demo journey class summary', () => {
  it('creates deterministic, complete, clearly simulated crew records', () => {
    const summary = createDemoJourneyClassSummary(ageOfExplorationJourneyConfig);

    expect(summary.classId).toBe('simulated-class-showcase');
    expect(summary.members).toHaveLength(ageOfExplorationJourneyConfig.classVoyages.length);
    expect(summary.members.every((member) => member.completionStatus === 'complete')).toBe(true);
    expect(summary.members.map((member) => member.submission?.status)).toEqual([
      'approved',
      'approved',
      'submitted',
      'submitted',
      'revision-requested',
    ]);
    expect(summary.members.every((member) => member.studentId.startsWith('simulated-crew-'))).toBe(
      true,
    );
  });
});
