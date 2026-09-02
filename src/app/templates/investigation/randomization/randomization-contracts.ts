import type { BaseEntity } from '../../../core/models/base-entity';
import type { RuntimeScope } from '../../../core/state/runtime-state-contracts';

export interface RandomizationOption {
  value: unknown;
  weight?: number;
  metadata?: Record<string, unknown>;
}

export interface RandomizationDefinition extends BaseEntity {
  scope: 'project' | 'class' | 'team' | 'student';
  strategy: 'choice' | 'shuffle' | 'weightedChoice' | 'numericRange' | 'dataset';
  options?: RandomizationOption[];
  seedStrategy?: 'generated' | 'class' | 'team' | 'student' | 'fixed';
  fixedSeed?: string;
  outputStateId: string;
}

export interface RandomizationResult {
  definitionId: string;
  scope: RuntimeScope;
  seed: string;
  value: unknown;
}

export interface RandomizationServiceContract {
  generate(
    definition: RandomizationDefinition,
    scope: RuntimeScope,
  ): RandomizationResult;
}

