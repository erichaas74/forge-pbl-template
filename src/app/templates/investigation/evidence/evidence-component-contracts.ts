import type { ProjectComponentContext } from '../../../core/context/project-component-context';
import type { EventResult } from '../../../core/state/runtime-state-contracts';
import type { RuntimeEvent } from '../../../core/events/runtime-event';
import type { ValidationResult } from '../../../core/validation/validation-contracts';
import type { EvidenceRuntimeState, RuntimeStateSnapshot } from '../domain/runtime-state';
import type { EvidenceDefinition } from './evidence-contracts';

export interface EvidenceRuntimeView {
  definition: EvidenceDefinition;
  runtime: EvidenceRuntimeState;
}

export interface EvidencePreview {
  title: string;
  summary?: string;
  assetRef?: string;
}

export interface EvidenceDetail {
  title: string;
  content: unknown;
  assetRefs?: string[];
}

export interface EvidenceAction {
  id: string;
  label: string;
}

export interface EvidenceRenderer {
  evidenceType: string;
  createPreview(
    evidence: EvidenceDefinition,
    context: ProjectComponentContext<RuntimeStateSnapshot>,
  ): EvidencePreview;
  createDetail(
    evidence: EvidenceDefinition,
    context: ProjectComponentContext<RuntimeStateSnapshot>,
  ): EvidenceDetail;
  supportedActions(): EvidenceAction[];
}

export interface StudentEvidenceInput {
  evidenceType: string;
  title: string;
  content: unknown;
  sourceActivityId?: string;
  metadata?: Record<string, unknown>;
}

export interface EvidenceRecord {
  id: string;
  definition: EvidenceDefinition;
  runtime: EvidenceRuntimeState;
}

export interface EvidenceServiceContract {
  getEvidence(id: string): EvidenceDefinition | undefined;
  getAvailableEvidence(runtime: RuntimeStateSnapshot): EvidenceDefinition[];
  createStudentEvidence(input: StudentEvidenceInput): Promise<EvidenceRecord>;
  dispatchEvidenceEvent(
    event: RuntimeEvent,
  ): Promise<EventResult<RuntimeStateSnapshot>>;
}

export interface EvidenceCreationConfig {
  requiredFields?: string[];
  settings?: Record<string, unknown>;
}

export interface EvidenceCreationFormModel {
  fields: readonly {
    id: string;
    label: string;
    required: boolean;
  }[];
}

export interface StudentEvidenceCreatorPlugin {
  evidenceType: string;
  createForm(config: EvidenceCreationConfig): EvidenceCreationFormModel;
  validate(value: unknown): ValidationResult;
  produceEvidence(value: unknown): StudentEvidenceInput;
}

