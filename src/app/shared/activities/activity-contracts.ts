import type { ProjectComponentContext } from '../../core/context/project-component-context';
import type { BaseEntity } from '../../core/models/base-entity';
import type { ValidationResult } from '../../core/validation/validation-contracts';

export interface ActivityDefinition extends BaseEntity {
  type: string;
  required?: boolean;
  extensions?: {
    [namespace: string]: unknown;
  };
}

export interface EvidenceOutput<TEvidenceDefinition extends BaseEntity = BaseEntity> {
  evidenceId?: string;
  definition?: Partial<TEvidenceDefinition>;
  runtimeData?: Record<string, unknown>;
}

export interface StateChangeRequest {
  stateId: string;
  operation: string;
  value?: unknown;
}

export interface ResourceChangeRequest {
  resourceId: string;
  operation: 'add' | 'spend' | 'set';
  amount: number;
}

export interface ActivityResult<TEvidenceDefinition extends BaseEntity = BaseEntity> {
  activityId: string;
  completed: boolean;
  score?: number;
  outputs?: Record<string, unknown>;
  evidenceProduced?: EvidenceOutput<TEvidenceDefinition>[];
  stateChanges?: StateChangeRequest[];
  resourceChanges?: ResourceChangeRequest[];
  attachments?: string[];
  metadata?: Record<string, unknown>;
}

export interface ActivityPluginState {
  status: 'notInitialized' | 'ready' | 'inProgress' | 'complete' | 'error';
  data?: Record<string, unknown>;
}

export interface ActivityPlugin<
  TDefinition extends ActivityDefinition = ActivityDefinition,
  TResult extends ActivityResult = ActivityResult,
  TRuntimeState = unknown,
> {
  type: string;
  initialize(
    definition: TDefinition,
    context: ProjectComponentContext<TRuntimeState>,
  ): void;
  getState(): ActivityPluginState;
  validateCompletion(): ValidationResult;
  produceResult(): TResult;
}

export interface SimulationConfig {
  id: string;
  settings?: Record<string, unknown>;
}

export interface SimulationTrialResult<
  TEvidenceDefinition extends BaseEntity = BaseEntity,
> {
  trialId: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  score?: number;
  evidence?: EvidenceOutput<TEvidenceDefinition>[];
  stateChanges?: StateChangeRequest[];
}

export interface SimulationAdapter<TResult extends SimulationTrialResult = SimulationTrialResult> {
  initialize(config: SimulationConfig): void;
  beginTrial(): void;
  endTrial(): TResult;
  resetTrial(): void;
}

