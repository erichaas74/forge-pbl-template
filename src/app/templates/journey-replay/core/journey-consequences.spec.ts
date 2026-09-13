import {
  ageOfExplorationJourneyConfig as config,
  evidenceAgeOfExplorationJourneyConfig as previous,
} from '../../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import type { JourneyProjectConfig, StudentJourneyRecord } from '../domain/journey-replay.models';
import {
  completeJourneyStep,
  createInitialJourneyRecord,
  selectJourneyChoice,
  updateJourneyResponseDraft,
} from './journey-replay.engine';
import { resolveJourneyOutcome } from './journey-consequences';
import { validateJourneyAdventures } from '../package/journey-adventure.validation';
import { validateJourneyRecord } from './journey-record-validation';

function complete(
  record: StudentJourneyRecord,
  choiceId: string,
  project: JourneyProjectConfig = config,
) {
  const choice = project.steps[record.currentStepIndex].choices.find(
    (item) => item.id === choiceId,
  )!;
  const source = project.evidence.find((item) => item.id === choice.evidenceIds[0])!;
  return completeJourneyStep(
    project,
    updateJourneyResponseDraft(selectJourneyChoice(project, record, choiceId), {
      text: 'The evidence supports this tradeoff because our crew needs a reserve.',
      prediction: 'I expect the remaining supplies to support the next crossing.',
      planningTargetId: choice.planning?.targets[0].id,
      planningSubmitted: true,
      planningText: 'We will compare route costs and retain a reserve for repairs.',
      citations: [
        {
          evidenceId: source.id,
          paragraphId: source.paragraphs![0].id,
          explanation: 'This specific detail helps us compare the benefits with the costs.',
        },
      ],
    }),
  );
}

describe('Journey consequences carried across chapters', () => {
  it('uses actual recorded cargo and preserves the same adjusted costs in the preview, record, and replay', () => {
    let record = complete(createInitialJourneyRecord(config, 'repair-test'), 'mission-trade');
    record = complete(record, 'supply-repair');
    record = complete(record, 'route-choice-coastal');
    // Simulate recovery from a saved record, not ephemeral UI state.
    record = JSON.parse(JSON.stringify(record));
    const choice = config.steps[3].choices.find((item) => item.id === 'storm-south')!;
    const before = record.resources;
    const preview = resolveJourneyOutcome(config, record, choice);
    const result = complete(record, choice.id);
    expect(result.resources['supplies']).toBe(before['supplies'] - 13);
    expect(result.resources['crew']).toBe(before['crew'] - 4);
    expect(result.resources['time']).toBe(before['time'] + 5);
    expect(result.resources).toEqual(preview.resources);
    expect(result.completedSteps.at(-1)?.consequence).toBe(preview.consequence);
    expect(result.replayTimeline.at(-1)?.systemNarration).toBe(preview.consequence);
    expect(preview.carriedForward).toHaveLength(1);
    expect(record.resources).toBe(before);
    const restored = validateJourneyRecord(config, JSON.parse(JSON.stringify(result)));
    expect(restored.resources).toEqual(result.resources);
    expect(restored.completedSteps.at(-1)?.consequence).toBe(preview.consequence);
  });

  it('does not give a repair benefit to an instrument loadout and applies instruments only on the direct crossing', () => {
    let record = complete(createInitialJourneyRecord(config, 'tools-test'), 'mission-trade');
    record = complete(record, 'supply-navigation');
    const direct = resolveJourneyOutcome(config, record, config.steps[2].choices[2]);
    expect(direct.resources['supplies']).toBe(record.resources['supplies'] - 7);
    expect(direct.resources['crew']).toBe(record.resources['crew'] - 4);
    const coast = resolveJourneyOutcome(config, record, config.steps[2].choices[0]);
    expect(coast.carriedForward).toEqual([]);
    record = complete(record, 'route-choice-direct');
    const south = resolveJourneyOutcome(config, record, config.steps[3].choices[1]);
    expect(south.resources['supplies']).toBe(record.resources['supplies'] - 25);
    expect(south.carriedForward).toEqual([]);
  });

  it('keeps all 162 routes completable, finite, within bounds, and faithfully replayed', () => {
    const historicalRecord = JSON.stringify(config.historicalFrame);
    let frontier = [createInitialJourneyRecord(config, 'all-paths')];
    for (const step of config.steps) {
      frontier = frontier.flatMap((record) =>
        step.choices.map((choice) => complete(record, choice.id)),
      );
    }
    expect(frontier).toHaveLength(162);
    expect(new Set(frontier.map((record) => record.route.at(-1)?.locationId)).size).toBe(2);
    expect(JSON.stringify(config.historicalFrame)).toBe(historicalRecord);
    for (const record of frontier) {
      expect(record).not.toHaveProperty('historicalFrame');
      expect(record.completionStatus).toBe('complete');
      expect(record.replayTimeline).toHaveLength(5);
      expect(record.route.at(-1)?.locationId).toMatch(/recife|cape-town/);
      for (const resource of config.resources) {
        expect(record.resources[resource.id]).toBeGreaterThanOrEqual(resource.minimum);
        expect(record.resources[resource.id]).toBeLessThanOrEqual(resource.maximum);
      }
    }
  });

  it('leaves the previous curriculum and fixed-cost outcomes compatible', () => {
    expect(previous.projectVersion).toBe('1.1.0');
    expect(previous.steps[4].choices.some((choice) => choice.id === 'encounter-seize')).toBe(true);
    let record = createInitialJourneyRecord(previous, 'legacy');
    for (const step of previous.steps) record = complete(record, step.choices[0].id, previous);
    expect(record.resources).toEqual({ supplies: 75, crew: 84, time: 11 });
    expect(validateJourneyAdventures(previous.steps, previous.resources)).toEqual([]);
    expect(validateJourneyAdventures(config.steps, config.resources)).toEqual([]);
  });

  it('rejects future-choice dependencies, invalid resources, and malformed scenes before loading', () => {
    const steps = [
      {
        ...config.steps[0],
        adventure: { title: 'Incomplete' },
        choices: [
          {
            ...config.steps[0].choices[0],
            consequenceModifiers: [
              { afterChoiceId: 'storm-west', resourceChanges: { missing: NaN }, narrative: '' },
            ],
          },
        ],
      },
    ] as unknown as JourneyProjectConfig['steps'];
    expect(validateJourneyAdventures(steps, config.resources)).toHaveLength(2);
  });
});
