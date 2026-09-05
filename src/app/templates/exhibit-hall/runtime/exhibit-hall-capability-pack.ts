import type { CapabilityRegistry } from '../../../core/registries/specialized-registries';

export const EXHIBIT_HALL_CAPABILITIES = [
  'artifactPublication',
  'galleryCollection',
  'peerResponses',
  'liveFocus',
  'individualDefense',
  'familySafePublication',
  'exhibitLmsBridge',
] as const;

export function registerExhibitHallCapabilities(registry: CapabilityRegistry): void {
  registry.registerAll(
    EXHIBIT_HALL_CAPABILITIES.map((id) => ({
      id,
      version: '1.0.0',
      status: 'core' as const,
    })),
  );
}
