import type { ValueProvider } from '@angular/core';
import { describe, expect, it } from 'vitest';

import { JOURNEY_REPLAY_DEMO_CLASS_SUMMARY } from '../../templates/journey-replay/runtime/journey-replay.tokens';
import { ClassJourneyMapComponent } from '../../templates/journey-replay/ui/class-journey-map.component';
import { loadSample } from './journey.sample';

describe('Race Around the World completed sample', () => {
  it('opens the finished-project demo as a simulated whole-class comparison', () => {
    const sample = loadSample();
    const demoSummary = sample.providers.find(
      (provider): provider is ValueProvider =>
        typeof provider === 'object' &&
        'provide' in provider &&
        provider.provide === JOURNEY_REPLAY_DEMO_CLASS_SUMMARY,
    );

    expect(sample.component).toBe(ClassJourneyMapComponent);
    expect(sample.inputs).toEqual({ initialMode: 'compare' });
    expect(sample.title).toBe('Our Class Race Around the World');
    expect(demoSummary?.useValue).toMatchObject({
      classId: 'simulated-class-showcase',
      members: expect.any(Array),
    });
    expect(demoSummary?.useValue.members).toHaveLength(5);
  });
});
