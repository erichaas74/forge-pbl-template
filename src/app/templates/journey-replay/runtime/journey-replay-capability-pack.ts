import type { CapabilityRegistry } from '../../../core/registries/specialized-registries';

export const JOURNEY_REPLAY_CAPABILITIES = [
  'livingJourneyMap',
  'journeyChoices',
  'studentResponses',
  'journeyReplay',
  'classJourneyMap',
  'voyageIntersections',
  'authoritativeJourneyPersistence',
  'journeySubmissionReview',
  'liveClassJourneyProjection',
  'journeyMediaStorage',
] as const;

export function registerJourneyReplayCapabilities(registry: CapabilityRegistry): void {
  registry.registerAll(
    JOURNEY_REPLAY_CAPABILITIES.map((id) => ({
      id,
      version: '1.0.0',
      status: 'core' as const,
      renderer: id === 'livingJourneyMap' ? 'living-journey-map-v1' : undefined,
    })),
  );
}
