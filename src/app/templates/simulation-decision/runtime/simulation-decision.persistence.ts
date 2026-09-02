import type { SimulationDecisionState } from '../domain/simulation-decision.models';

export interface SimulationDecisionPersistenceAdapter {
  load(projectId: string, projectVersion: string): SimulationDecisionState | undefined;
  save(state: Readonly<SimulationDecisionState>): void;
  clear(projectId: string, projectVersion: string): void;
}

export class BrowserSimulationDecisionPersistenceAdapter implements SimulationDecisionPersistenceAdapter {
  constructor(private readonly storage: Storage | undefined = safeStorage()) {}

  load(projectId: string, projectVersion: string): SimulationDecisionState | undefined {
    const serialized = this.storage?.getItem(storageKey(projectId, projectVersion));
    if (serialized === undefined || serialized === null) {
      return undefined;
    }
    try {
      const value: unknown = JSON.parse(serialized);
      return isCompatibleState(value, projectId, projectVersion) ? value : undefined;
    } catch {
      return undefined;
    }
  }

  save(state: Readonly<SimulationDecisionState>): void {
    this.storage?.setItem(storageKey(state.projectId, state.projectVersion), JSON.stringify(state));
  }

  clear(projectId: string, projectVersion: string): void {
    this.storage?.removeItem(storageKey(projectId, projectVersion));
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

function safeStorage(): Storage | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
}

function storageKey(projectId: string, projectVersion: string): string {
  return `forge:simulation-decision:${projectId}:${projectVersion}`;
}

function isCompatibleState(
  value: unknown,
  projectId: string,
  projectVersion: string,
): value is SimulationDecisionState {
  return (
    typeof value === 'object' &&
    value !== null &&
    'projectId' in value &&
    value.projectId === projectId &&
    'projectVersion' in value &&
    value.projectVersion === projectVersion &&
    'ledger' in value &&
    Array.isArray(value.ledger) &&
    'inventory' in value &&
    Array.isArray(value.inventory)
  );
}
