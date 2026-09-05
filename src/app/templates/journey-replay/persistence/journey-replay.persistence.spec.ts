import { ageOfExplorationJourneyConfig } from '../../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import { createInitialJourneyRecord } from '../core/journey-replay.engine';
import { MemoryJourneyReplayPersistenceAdapter } from './journey-replay.persistence';

describe('Journey Replay persistence', () => {
  it('keeps each student voyage in a separate versioned record', () => {
    const persistence = new MemoryJourneyReplayPersistenceAdapter();
    const first = createInitialJourneyRecord(ageOfExplorationJourneyConfig, 'student-one');
    const second = createInitialJourneyRecord(ageOfExplorationJourneyConfig, 'student-two');

    persistence.save(first);
    persistence.save(second);

    expect(
      persistence.load(first.projectId, first.projectVersion, first.studentId)?.voyageId,
    ).toBe(first.voyageId);
    expect(
      persistence.load(second.projectId, second.projectVersion, second.studentId)?.voyageId,
    ).toBe(second.voyageId);
    expect(first.voyageId).not.toBe(second.voyageId);
  });
});
