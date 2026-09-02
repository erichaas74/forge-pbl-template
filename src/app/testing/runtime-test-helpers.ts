import type { RuntimeActor, RuntimeEvent } from '../core/events/runtime-event';
import type { RuntimeScope } from '../core/state/runtime-state-contracts';
import type { Clock } from '../core/time/clock';
import { InMemoryProjectPackageSource } from '../infrastructure/persistence/in-memory-project-package-source';
import { LocalInvestigationRuntime } from '../runtime/local-investigation-runtime';
import type { ProjectDefinitionGraph } from '../templates/investigation/package/project-definition-graph';
import {
  simpleProjectLocation,
  simpleProjectPackage,
} from './simple-project-package.fixture';

export class FixedClock implements Clock {
  private tick = 0;

  now(): string {
    const value = new Date(Date.UTC(2026, 8, 2, 12, 0, this.tick)).toISOString();
    this.tick += 1;
    return value;
  }
}

export const studentScope: RuntimeScope = {
  tenantId: 'tenant-school-1',
  projectId: simpleProjectLocation.projectId,
  projectVersion: simpleProjectLocation.projectVersion,
  classId: 'class-1',
  studentId: 'student-1',
  scopeType: 'student',
};

export const secondStudentScope: RuntimeScope = {
  ...studentScope,
  studentId: 'student-2',
};

export async function createSimpleRuntime(): Promise<{
  platform: LocalInvestigationRuntime;
  graph: ProjectDefinitionGraph;
}> {
  const source = new InMemoryProjectPackageSource({
    [simpleProjectLocation.reference]: simpleProjectPackage,
  });
  const platform = new LocalInvestigationRuntime(source, new FixedClock());
  const loaded = await platform.loadProject(simpleProjectLocation);
  if (loaded.graph === undefined || loaded.issues.some((issue) => issue.severity === 'error')) {
    throw new Error(`Fixture failed to load: ${JSON.stringify(loaded.issues)}`);
  }
  await platform.initializeScope(loaded.graph, studentScope, true);
  return { platform, graph: loaded.graph };
}

export function runtimeEvent(
  id: string,
  eventType: string,
  sourceId?: string,
  payload?: Record<string, unknown>,
  actor: RuntimeActor = { type: 'student', id: 'student-1' },
): RuntimeEvent {
  return {
    id,
    clientEventId: `client-${id}`,
    eventType,
    tenantId: studentScope.tenantId,
    projectId: studentScope.projectId,
    timestamp: '2026-09-02T12:00:00.000Z',
    actor,
    sourceId,
    payload,
  };
}
