import type { SimulationDecisionState } from '../domain/simulation-decision.models';
import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import {
  safeBrowserStorage,
  ScopedBrowserStore,
  type WorkspaceStorageScope,
} from '../../../shared/persistence';

export interface SimulationDecisionPersistenceAdapter {
  load(projectId: string, projectVersion: string): SimulationDecisionState | undefined;
  save(state: Readonly<SimulationDecisionState>): void;
  clear(projectId: string, projectVersion: string): void;
}

export class BrowserSimulationDecisionPersistenceAdapter implements SimulationDecisionPersistenceAdapter {
  private readonly store: ScopedBrowserStore<SimulationDecisionState>;

  constructor(
    storage: Storage | undefined = safeBrowserStorage(),
    private readonly session?: ProjectSessionContext,
  ) {
    this.store = new ScopedBrowserStore('simulation-decision', storage, (value): value is SimulationDecisionState =>
      isCompatibleState(value),
    );
  }

  load(projectId: string, projectVersion: string): SimulationDecisionState | undefined {
    const value = this.store.load(this.scope(projectId, projectVersion));
    return value?.projectId === projectId && value.projectVersion === projectVersion ? value : undefined;
  }

  save(state: Readonly<SimulationDecisionState>): void {
    this.store.save(this.scope(state.projectId, state.projectVersion), state as SimulationDecisionState);
  }

  clear(projectId: string, projectVersion: string): void {
    this.store.clear(this.scope(projectId, projectVersion));
  }

  private scope(projectId: string, projectVersion: string): WorkspaceStorageScope {
    return {
      tenantId: this.session?.tenantId ?? 'local-preview',
      projectId,
      projectVersion,
      classId: this.session?.classId,
      actorId: this.session?.actorId,
      teamId: this.session?.teamId,
      attemptId: this.session?.attemptId,
    };
  }
}

export class MemorySimulationDecisionPersistenceAdapter implements SimulationDecisionPersistenceAdapter {
  private snapshot?: SimulationDecisionState;

  load(projectId: string, projectVersion: string): SimulationDecisionState | undefined {
    return this.snapshot?.projectId === projectId && this.snapshot.projectVersion === projectVersion
      ? structuredClone(this.snapshot)
      : undefined;
  }

  save(state: Readonly<SimulationDecisionState>): void {
    this.snapshot = structuredClone(state);
  }

  clear(): void {
    this.snapshot = undefined;
  }
}

function isCompatibleState(
  value: unknown,
): value is SimulationDecisionState {
  return (
    typeof value === 'object' &&
    value !== null &&
    'projectId' in value &&
    typeof value.projectId === 'string' &&
    'projectVersion' in value &&
    typeof value.projectVersion === 'string' &&
    'ledger' in value &&
    Array.isArray(value.ledger) &&
    'inventory' in value &&
    Array.isArray(value.inventory)
  );
}
