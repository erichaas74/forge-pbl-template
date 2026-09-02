import type { BaseEntity } from '../../../core/models/base-entity';
import type { RuntimeScope } from '../../../core/state/runtime-state-contracts';

export interface InvestigationResource extends BaseEntity {
  resourceType: string;
  initialAmount: number;
  min?: number;
  max?: number;
  unitLabel?: string;
  studentVisible: boolean;
  sharedMode: 'individual' | 'team' | 'class';
}

export interface ResourceCost {
  resourceId: string;
  amount: number;
}

export interface ResourceTransactionRequest {
  resourceId: string;
  amount: number;
  reason: string;
  scope: RuntimeScope;
  clientEventId?: string;
}

export interface ResourceServiceContract {
  getAmount(resourceId: string, scope: RuntimeScope): number;
  canSpend(resourceId: string, amount: number, scope: RuntimeScope): boolean;
  requestSpend(
    resourceId: string,
    amount: number,
    reason: string,
    scope: RuntimeScope,
  ): Promise<ResourceTransactionRequest>;
}

