import { JourneyReplayProjectPackageAssembler } from './journey-replay-project-package-assembler';
import {
  simpleJourneyReplayLocation,
  simpleJourneyReplayPackage,
} from '../../../testing/simple-journey-replay-package.fixture';

describe('JourneyReplayProjectPackageAssembler', () => {
  it('assembles coordinate, journey, replay, and separate class-voyage configuration', () => {
    const result = new JourneyReplayProjectPackageAssembler().assemble(
      simpleJourneyReplayLocation,
      simpleJourneyReplayPackage,
    );

    expect(result.issues).toEqual([]);
    expect(result.graph).toMatchObject({
      tenantId: 'tenant-one',
      manifest: { template: { id: 'journey-replay', version: '1.0' } },
      map: { startLocationId: 'lisbon' },
    });
    expect(result.graph?.replay.classVoyages).toHaveLength(5);
  });

  it('rejects route choices that reference missing geometry', () => {
    const journey = simpleJourneyReplayPackage['journey.json'];
    const files = {
      ...simpleJourneyReplayPackage,
      'journey.json': {
        ...journey,
        steps: journey.steps.map((step, stepIndex) =>
          stepIndex === 2
            ? {
                ...step,
                choices: step.choices.map((choice, choiceIndex) =>
                  choiceIndex === 0 ? { ...choice, routeId: 'route-missing' } : choice,
                ),
              }
            : step,
        ),
      },
    };

    const result = new JourneyReplayProjectPackageAssembler().assemble(
      simpleJourneyReplayLocation,
      files,
    );

    expect(result.graph).toBeUndefined();
    expect(result.issues).toContainEqual(
      expect.objectContaining({ code: 'REFERENCE_MISSING', entityId: 'route-missing' }),
    );
  });
});
