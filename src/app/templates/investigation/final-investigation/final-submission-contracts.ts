import type { BaseEntity } from '../../../core/models/base-entity';
import type { ValidationIssue } from '../../../core/validation/validation-contracts';
import type { RuntimeStateSnapshot } from '../domain/runtime-state';

export interface FinalSubmissionDefinition extends BaseEntity {
  submissionType: string;
  sections: FinalSubmissionSection[];
  availabilityRuleIds?: string[];
  solutionRevealAfterSubmission?: boolean;
  rubricId?: string;
  teamMode?: 'individual' | 'team' | 'mixed';
}

export interface FinalSubmissionSection extends BaseEntity {
  type: string;
  prompt?: string;
  required: boolean;
  evidenceRequired?: boolean;
  minEvidenceCount?: number;
  allowAttachments?: boolean;
}

export interface SubmissionValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface SubmissionResult {
  submissionId: string;
  submittedAt: string;
}

export interface FinalSubmissionComponentContract {
  load(
    definition: FinalSubmissionDefinition,
    runtime: RuntimeStateSnapshot,
  ): void;
  validate(): SubmissionValidationResult;
  saveDraft(): Promise<void>;
  submit(): Promise<SubmissionResult>;
}

