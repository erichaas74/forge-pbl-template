import type { BaseEntity } from '../../core/models/base-entity';

export interface AwardCategoryDefinition extends BaseEntity {
  readonly maximumPoints: number;
  readonly visibility: 'team' | 'class' | 'teacher';
}

export interface AwardSlotDefinition extends BaseEntity {
  readonly categoryId: string;
  readonly maximumPoints: number;
  readonly uniqueBy: 'slot' | 'source' | 'participantAndSource';
}

export interface AwardRecord extends BaseEntity {
  readonly attemptId: string;
  readonly categoryId: string;
  readonly slotId: string;
  readonly sourceId: string;
  readonly points: number;
  readonly explanation: string;
  readonly correctionOfId?: string;
}
