import type { RuntimeCommand } from '../../../core/commands/runtime-command';
import type { RuntimeScope } from '../../../core/state/runtime-state-contracts';

export interface TeacherOverrideRecord {
  id: string;
  teacherId: string;
  projectId: string;
  targetScope: RuntimeScope;
  command: RuntimeCommand;
  timestamp: string;
  reason?: string;
}

