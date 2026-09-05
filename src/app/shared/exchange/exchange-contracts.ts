import type { BaseEntity } from '../../core/models/base-entity';

export interface ExchangeDefinition extends BaseEntity {
  readonly accountDefinitionIds: readonly string[];
  readonly holdDurationSeconds: number;
  readonly maximumActiveQuotesPerParticipant: number;
  readonly approvalMode: 'allParties';
  readonly challengeGateDefinitionIds?: readonly string[];
}

export interface ExchangeLine {
  readonly resourceId: string;
  readonly quantity: number;
  readonly fromAccountId: string;
  readonly toAccountId: string;
}

export interface FirmQuoteRecord extends BaseEntity {
  readonly attemptId: string;
  readonly version: number;
  readonly termsHash: string;
  readonly lines: readonly ExchangeLine[];
  readonly status: 'reserved' | 'approved' | 'committed' | 'declined' | 'cancelled' | 'expired';
  readonly expiresAtActiveSecond: number;
}
