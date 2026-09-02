import type { BaseEntity } from '../../../core/models/base-entity';
import type { RuntimeEvent } from '../../../core/events/runtime-event';

export interface StateVariableDefinition extends BaseEntity {
  stateType: 'boolean' | 'number' | 'string' | 'choice' | 'list' | 'status' | 'counter';
  initialValue: unknown;
  allowedValues?: unknown[];
  min?: number;
  max?: number;
  studentVisible?: boolean;
  mutable?: boolean;
}

export interface InvestigationStateServiceContract {
  get(id: string): unknown;
  createEventForSet(id: string, value: unknown): RuntimeEvent;
  createEventForOperation(
    id: string,
    operation: string,
    value?: unknown,
  ): RuntimeEvent;
}

