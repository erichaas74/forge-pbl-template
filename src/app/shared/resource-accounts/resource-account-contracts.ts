import type { BaseEntity } from '../../core/models/base-entity';

export interface ResourceUnitDefinition extends BaseEntity {
  readonly scale: number;
  readonly allowNegative: boolean;
}

export interface ResourceAccountDefinition extends BaseEntity {
  readonly unitId: string;
  readonly ownerType: 'student' | 'team' | 'class' | 'scenario';
  readonly initialQuantity: number;
}

export interface ResourcePosting {
  readonly accountId: string;
  readonly quantityDelta: number;
  readonly unitId: string;
}

export interface ResourceTransactionRecord extends BaseEntity {
  readonly attemptId: string;
  readonly postings: readonly ResourcePosting[];
  readonly sourceType: string;
  readonly sourceId: string;
  readonly committedAt: string;
}
