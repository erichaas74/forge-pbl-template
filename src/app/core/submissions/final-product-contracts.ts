import type { RuntimeScope } from '../state/runtime-state-contracts';

export type FinalProductStatus =
  | 'draft'
  | 'ready'
  | 'submitted'
  | 'revisionRequested'
  | 'approved';

export interface FinalProductTerminology {
  readonly singularLabel: string;
  readonly submitLabel: string;
  readonly submittedLabel: string;
  readonly revisionLabel: string;
  readonly approvedLabel: string;
}

export interface FinalProductSnapshot<TContent = unknown> {
  readonly submissionId: string;
  readonly version: number;
  readonly scope: RuntimeScope;
  readonly createdAt: string;
  readonly createdBy: string;
  readonly content: Readonly<TContent>;
  readonly evidenceIds: readonly string[];
  readonly mediaAssetIds: readonly string[];
}

export interface FinalProductRubricResult {
  readonly criterionId: string;
  readonly rating: string;
  readonly feedback?: string;
}

export interface FinalProductReview {
  readonly reviewId: string;
  readonly submissionId: string;
  readonly submissionVersion: number;
  readonly reviewerId: string;
  readonly reviewedAt: string;
  readonly decision: 'revisionRequested' | 'approved';
  readonly feedback: string;
  readonly rubricResults: readonly FinalProductRubricResult[];
}

export interface FinalProductRecord<TContent = unknown> {
  readonly status: FinalProductStatus;
  readonly currentDraftVersion: number;
  readonly submissions: readonly FinalProductSnapshot<TContent>[];
  readonly reviews: readonly FinalProductReview[];
}

/**
 * Template-owned projection into the platform-wide submission timeline. This
 * keeps each project's metaphor while giving teacher tooling one stable view.
 */
export interface FinalProductAdapter<TState, TContent = unknown> {
  readonly terminology: FinalProductTerminology;
  project(state: Readonly<TState>, scope: RuntimeScope): FinalProductRecord<TContent>;
}

export interface FinalProductSubmissionGateway<TContent = unknown> {
  submit(snapshot: FinalProductSnapshot<TContent>, idempotencyKey: string): Promise<FinalProductSnapshot<TContent>>;
  review(review: FinalProductReview, idempotencyKey: string): Promise<FinalProductReview>;
}
