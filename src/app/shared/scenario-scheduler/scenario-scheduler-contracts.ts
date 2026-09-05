import type { BaseEntity } from '../../core/models/base-entity';
import type { RuntimeCommand } from '../../core/commands/runtime-command';

export interface ScheduledScenarioEventDefinition extends BaseEntity {
  readonly releaseAtActiveSecond: number;
  readonly audience: 'class' | 'team' | 'student';
  readonly command: RuntimeCommand;
  readonly oncePerAttempt: boolean;
}

export interface ScheduledScenarioEventRecord extends BaseEntity {
  readonly attemptId: string;
  readonly definitionId: string;
  readonly status: 'pending' | 'released' | 'cancelled';
  readonly releasedAt?: string;
  readonly resultingEventIds?: readonly string[];
}
