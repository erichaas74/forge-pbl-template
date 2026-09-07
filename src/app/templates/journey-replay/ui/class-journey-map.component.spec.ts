import { describe, expect, it } from 'vitest';

import { ageOfExplorationJourneyConfig } from '../../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import type { ClassVoyageRecord } from '../domain/journey-replay.models';
import { createDemoJourneyClassSummary } from '../demo/journey-demo-class-summary';
import {
  buildClassStoryBeats,
  buildVoyageSnapshots,
  compareVoyages,
  summarizeClassPerformance,
} from './class-journey-map.component';

describe('class journey map demo projections', () => {
  const config = ageOfExplorationJourneyConfig;
  const compass = config.classVoyages.find((voyage) => voyage.voyageId === 'voyage-compass');

  it('turns the featured voyage into ordered, named snapshots', () => {
    const snapshots = buildVoyageSnapshots(compass, config.map);

    expect(snapshots.map((snapshot) => snapshot.locationName)).toEqual([
      'Lisbon',
      'Cape Verde',
      'Cape of Good Hope',
      'Goa',
    ]);
    expect(snapshots[2]?.label).toBe('Repaired after storm');
    expect(snapshots.every((snapshot, index) => snapshot.sequence === index + 1)).toBe(true);
  });

  it('compares every other voyage without merging its record into the featured voyage', () => {
    const comparisons = compareVoyages(compass, config.classVoyages, config.map);
    const horizon = comparisons.find(
      (comparison) => comparison.voyage.voyageId === 'voyage-horizon',
    );

    expect(comparisons).toHaveLength(config.classVoyages.length - 1);
    expect(horizon?.sharedLocationNames).toEqual(['Lisbon', 'Cape Verde']);
    expect(horizon?.uniqueLocationCount).toBe(1);
    expect(compass?.route).toHaveLength(6);
  });

  it('creates a final-position snapshot when a route has no named events', () => {
    const routeOnlyVoyage: ClassVoyageRecord = {
      voyageId: 'route-only',
      team: { name: 'Route Only', emblem: 'R', color: '#fff', linePattern: 'solid' },
      route: [
        { longitude: -9, latitude: 38 },
        { longitude: -25, latitude: 10 },
      ],
      outcome: 'Finished at sea.',
    };

    expect(buildVoyageSnapshots(routeOnlyVoyage, config.map)).toMatchObject([
      { locationName: 'Final position', label: 'Finished at sea.', routeIndex: 1 },
    ]);
  });

  it('projects believable performance and high-value story beats from the fake summary', () => {
    const summary = createDemoJourneyClassSummary(config);
    const performance = summarizeClassPerformance(summary);
    const beats = buildClassStoryBeats(config.classVoyages, config.map, summary);

    expect(performance).toMatchObject({
      completionPercent: 100,
      reasoningReadyPercent: 95,
      approvedCount: 2,
      awaitingReviewCount: 2,
      revisionCount: 3,
    });
    expect(beats.map((beat) => beat.kicker)).toEqual([
      'Opening scene',
      'Turning point',
      'Big reveal',
      'Reflection',
    ]);
    expect(beats[1]?.title).toContain('storm');
  });
});
