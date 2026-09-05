import { describe, expect, it } from 'vitest';

import { assertJourneyMatchesPolicy, assertSubmittableJourney, masteryTagsFromRecord, responsePreview, teamIdentity } from './journey-policy';

const record = {
  studentId: 'student',
  voyageId: 'voyage',
  projectId: 'project',
  projectVersion: '1.0',
  completedSteps: [
    {
      stepId: 'step-route',
      choiceId: 'route-south',
      masteryResults: [{ masteryTag: 'cause-and-effect' }],
      studentResponse: { text: 'I chose the southern route because the evidence showed safer winds.' },
    },
  ],
  route: [],
  completionStatus: 'complete' as const,
  revision: 3,
};

describe('journey server policy', () => {
  const policy = {
    steps: [{
      id: 'step-route',
      choiceIds: ['route-south'],
      masteryTags: ['cause-and-effect'],
    }],
  } as const;

  it('accepts only complete submissions with the authoritative step count', () => {
    expect(() => assertSubmittableJourney(record, policy)).not.toThrow();
    expect(() => assertSubmittableJourney(record, { ...policy, steps: [...policy.steps, policy.steps[0]] })).toThrowError('JOURNEY_NOT_COMPLETE');
  });

  it('rejects client records that do not match configured step and choice IDs', () => {
    const forged = {
      ...record,
      completedSteps: [{ ...record.completedSteps[0], choiceId: 'invented-choice' }],
    };
    expect(() => assertJourneyMatchesPolicy(forged, policy)).toThrowError('JOURNEY_POLICY_MISMATCH');
  });

  it('derives assessable mastery tags and response previews from the submitted snapshot', () => {
    expect([...masteryTagsFromRecord(record)]).toEqual(['cause-and-effect']);
    expect(responsePreview(record)).toContain('southern route');
  });

  it('uses stable non-color route identity patterns', () => {
    expect(teamIdentity('student-a', 'Amina')).toEqual(teamIdentity('student-a', 'Amina'));
    expect(teamIdentity('student-a', 'Amina').linePattern).toBeTruthy();
  });
});
