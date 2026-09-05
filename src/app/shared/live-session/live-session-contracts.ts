import type { BaseEntity } from '../../core/models/base-entity';

export type LiveSessionStageKind =
  'briefing' | 'planning' | 'active' | 'audit' | 'review' | 'finalized';

export interface LiveSessionStageDefinition extends BaseEntity {
  readonly kind: LiveSessionStageKind;
  readonly activeDurationSeconds?: number;
  readonly studentActionsOpen?: boolean;
}

export interface LiveSessionDefinition extends BaseEntity {
  readonly participantScope: 'team' | 'student';
  readonly stages: readonly LiveSessionStageDefinition[];
  readonly allowTeacherPause: boolean;
  readonly allowTeacherExtension: boolean;
  readonly seedStrategy: 'configured' | 'serverGenerated';
}

export type LiveSessionStatus =
  'draft' | 'ready' | 'running' | 'paused' | 'settling' | 'audit' | 'review' | 'finalized';
