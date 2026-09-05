import type { RuntimeCommand } from '../commands/runtime-command';
import type { RuntimeError } from '../errors/runtime-error';
import type { RuntimeEvent } from '../events/runtime-event';

export interface RuntimeScope {
  tenantId: string;
  projectId: string;
  projectVersion: string;
  attemptId?: string;
  classId?: string;
  studentId?: string;
  teamId?: string;
  scopeType: 'student' | 'team' | 'class';
}

export interface EventResult<TSnapshot = unknown> {
  event: RuntimeEvent;
  matchedRuleIds?: string[];
  commands?: RuntimeCommand[];
  snapshot?: TSnapshot;
  errors?: RuntimeError[];
  duplicate?: boolean;
}

export type RuntimeStateListener<TSnapshot = unknown> = (
  snapshot: TSnapshot,
) => void;

export type Unsubscribe = () => void;

export interface RuntimeStateStore<TSnapshot = unknown> {
  getSnapshot(): TSnapshot;
  getStateValue(id: string): unknown;
  dispatch(event: RuntimeEvent): Promise<EventResult<TSnapshot>>;
  subscribe(
    scope: RuntimeScope,
    callback: RuntimeStateListener<TSnapshot>,
  ): Unsubscribe;
}
