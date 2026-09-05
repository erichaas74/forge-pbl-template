import { ageOfExplorationJourneyConfig } from '../../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import {
  completeJourneyStep,
  createInitialJourneyRecord,
  detectVoyageIntersections,
  selectJourneyChoice,
  updateJourneyResponseDraft,
} from './journey-replay.engine';

describe('journey replay engine', () => {
  it('records a choice, student reasoning, route, mastery evidence, and replay scene separately', () => {
    let record = createInitialJourneyRecord(
      ageOfExplorationJourneyConfig,
      'student-one',
      '2026-01-01T00:00:00.000Z',
    );
    record = selectJourneyChoice(ageOfExplorationJourneyConfig, record, 'mission-trade');
    record = updateJourneyResponseDraft(record, {
      text: 'Trade access mattered because rulers wanted a direct route to valuable goods.',
    });
    record = completeJourneyStep(
      ageOfExplorationJourneyConfig,
      record,
      '2026-01-02T00:00:00.000Z',
    );

    expect(record.completedSteps).toHaveLength(1);
    expect(record.completedSteps[0]).toMatchObject({
      stepId: 'step-sponsor',
      choiceId: 'mission-trade',
      studentResponse: { responseMode: 'text', useInReplay: true },
    });
    expect(record.replayTimeline[0]).toMatchObject({
      id: 'scene-step-sponsor',
      title: 'Why We Sailed',
      order: 0,
    });
    expect(record.mastery[0]?.status).toBe('evidence-collected');
    expect(record.completionStatus).toBe('in-progress');
  });

  it('keeps completion separate from mastery evidence', () => {
    let record = createInitialJourneyRecord(ageOfExplorationJourneyConfig, 'student-two');
    record = selectJourneyChoice(ageOfExplorationJourneyConfig, record, 'mission-mapping');
    record = updateJourneyResponseDraft(record, {
      text: 'Mapping the coast would produce knowledge that later voyages could test and revise.',
    });
    record = completeJourneyStep(ageOfExplorationJourneyConfig, record);

    expect(record.completedSteps[0]?.masteryResults[0]?.status).toBe('evidence-collected');
    expect(record.completedSteps[0]).not.toHaveProperty('masteryStatus', 'meets');
  });

  it('detects shared ports without flattening voyage records', () => {
    const voyages = ageOfExplorationJourneyConfig.classVoyages;
    const intersections = detectVoyageIntersections(voyages);

    expect(intersections).toContainEqual(
      expect.objectContaining({
        locationId: 'lisbon',
        comparisonAvailable: true,
      }),
    );
    expect(voyages).toHaveLength(5);
    expect(new Set(voyages.map((voyage) => voyage.voyageId)).size).toBe(5);
  });

  it('requires an actual student response before completing a step', () => {
    let record = createInitialJourneyRecord(ageOfExplorationJourneyConfig, 'student-three');
    record = selectJourneyChoice(ageOfExplorationJourneyConfig, record, 'mission-trade');

    expect(() => completeJourneyStep(ageOfExplorationJourneyConfig, record)).toThrow(
      'RESPONSE_REQUIRED',
    );
  });
});
