import type { RuntimeScope } from './runtime-state-contracts';

export interface CoreRuntimeState {
  version: number;
  tenantId: string;
  projectId: string;
  projectVersion: string;
  lastUpdated: string;
  scope: RuntimeScope;
  stateValues: Record<string, unknown>;
  firedRuleIds: string[];
}

export interface StateVariableConstraint {
  id: string;
  stateType:
    | 'boolean'
    | 'number'
    | 'string'
    | 'choice'
    | 'list'
    | 'status'
    | 'counter';
  allowedValues?: unknown[];
  min?: number;
  max?: number;
  mutable?: boolean;
}
