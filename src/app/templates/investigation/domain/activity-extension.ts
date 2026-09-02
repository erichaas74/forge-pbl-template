import type {
  ActivityDefinition,
  ActivityResult,
} from '../../../shared/activities/activity-contracts';
import type { EvidenceDefinition } from '../evidence/evidence-contracts';
import type { ResourceCost } from '../resources/resource-contracts';

export interface InvestigationActivityExtension {
  evidenceProducedIds?: string[];
  stateChanges?: string[];
  resourceCosts?: ResourceCost[];
  ruleIds?: string[];
  randomizationIds?: string[];
}

export interface InvestigationActivityDefinition extends ActivityDefinition {
  extensions?: {
    investigation?: InvestigationActivityExtension;
    [namespace: string]: unknown;
  };
}

export type InvestigationActivityResult = ActivityResult<EvidenceDefinition>;

