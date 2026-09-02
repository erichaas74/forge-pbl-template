import type { BaseEntity } from '../../../core/models/base-entity';
import type { EvidenceRuntimeView } from '../evidence/evidence-component-contracts';
import type { HypothesisSettings } from '../domain/investigation-configuration';
import type { HypothesisRuntimeState } from '../domain/runtime-state';

export interface HypothesisDefinition extends BaseEntity {
  hypothesisType: string;
  teacherDefined?: boolean;
  validSolution?: boolean;
  ranking?: number;
  evidenceExpected?: string[];
  evidenceContradicting?: string[];
}

export interface HypothesisPermissions {
  canCreate: boolean;
  canRevise: boolean;
  canRank: boolean;
  canEliminate: boolean;
}

export interface HypothesisPanelInputs {
  settings: HypothesisSettings;
  hypotheses: HypothesisRuntimeState[];
  availableEvidence: EvidenceRuntimeView[];
  permissions: HypothesisPermissions;
}

