import type { BaseEntity } from '../../core/models/base-entity';

export interface ChallengeGateDefinition extends BaseEntity {
  readonly evaluatorId: string;
  readonly evaluatorVersion: string;
  readonly grantsPermission: string;
  readonly maximumAttempts?: number;
  readonly grantDurationSeconds?: number;
}

export interface ChallengeGrantRecord extends BaseEntity {
  readonly attemptId: string;
  readonly definitionId: string;
  readonly evaluatorVersion: string;
  readonly contributorId: string;
  readonly subjectHash: string;
  readonly grantsPermission: string;
  readonly issuedAtActiveSecond: number;
  readonly expiresAtActiveSecond?: number;
}
