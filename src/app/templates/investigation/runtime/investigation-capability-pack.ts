import type { CapabilityRegistry } from '../../../core/registries/specialized-registries';

export const investigationCapabilityIds = [
  'caseBoard',
  'evidence',
  'studentEvidence',
  'hypotheses',
  'activities',
  'rules',
  'state',
  'limitedResources',
  'randomization',
  'scriptedNPCs',
  'teams',
  'finalSubmission',
  'performanceArtifacts',
] as const;

export function registerInvestigationCapabilities(registry: CapabilityRegistry): void {
  for (const id of investigationCapabilityIds) {
    registry.register({
      id,
      version: '1.0.0',
      status: 'core',
    });
  }
}
