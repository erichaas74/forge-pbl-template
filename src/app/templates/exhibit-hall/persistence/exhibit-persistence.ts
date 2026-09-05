import type { ExhibitHallState } from '../domain/exhibit-types';

export interface ExhibitPersistenceAdapter {
  load(projectId: string, projectVersion: string): ExhibitHallState | undefined;
  save(projectId: string, projectVersion: string, state: ExhibitHallState): void;
  clear(projectId: string, projectVersion: string): void;
}

export class BrowserExhibitPersistenceAdapter implements ExhibitPersistenceAdapter {
  constructor(private readonly storage: Storage | undefined = safeStorage()) {}

  load(projectId: string, projectVersion: string): ExhibitHallState | undefined {
    const value = this.storage?.getItem(storageKey(projectId, projectVersion));
    if (value === undefined || value === null) return undefined;
    try {
      const parsed: unknown = JSON.parse(value);
      return isExhibitState(parsed) ? parsed : undefined;
    } catch {
      return undefined;
    }
  }

  save(projectId: string, projectVersion: string, state: ExhibitHallState): void {
    this.storage?.setItem(storageKey(projectId, projectVersion), JSON.stringify(state));
  }

  clear(projectId: string, projectVersion: string): void {
    this.storage?.removeItem(storageKey(projectId, projectVersion));
  }
}

export class MemoryExhibitPersistenceAdapter implements ExhibitPersistenceAdapter {
  private states = new Map<string, ExhibitHallState>();

  load(projectId: string, projectVersion: string): ExhibitHallState | undefined {
    const value = this.states.get(storageKey(projectId, projectVersion));
    return value === undefined ? undefined : structuredClone(value);
  }

  save(projectId: string, projectVersion: string, state: ExhibitHallState): void {
    this.states.set(storageKey(projectId, projectVersion), structuredClone(state));
  }

  clear(projectId: string, projectVersion: string): void {
    this.states.delete(storageKey(projectId, projectVersion));
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
  return `forge:exhibit-hall:${projectId}:${projectVersion}`;
}

function isExhibitState(value: unknown): value is ExhibitHallState {
  return (
    typeof value === 'object' &&
    value !== null &&
    'schemaVersion' in value &&
    value.schemaVersion === '1.0' &&
    'hall' in value &&
    typeof value.hall === 'object' &&
    value.hall !== null &&
    'snapshots' in value &&
    Array.isArray(value.snapshots) &&
    'hangings' in value &&
    Array.isArray(value.hangings)
  );
}
