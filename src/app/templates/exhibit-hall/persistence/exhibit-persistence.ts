import { isExhibitDraft } from './exhibit-draft-validation';
import type { ExhibitHallState } from '../domain/exhibit-types';
import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import {
  safeBrowserStorage,
  ScopedBrowserStore,
  type WorkspaceStorageScope,
} from '../../../shared/persistence';

export interface ExhibitPersistenceAdapter {
  load(projectId: string, projectVersion: string): ExhibitHallState | undefined;
  save(projectId: string, projectVersion: string, state: ExhibitHallState): void;
  clear(projectId: string, projectVersion: string): void;
}

export class BrowserExhibitPersistenceAdapter implements ExhibitPersistenceAdapter {
  private readonly store: ScopedBrowserStore<ExhibitHallState>;

  constructor(
    storage: Storage | undefined = safeBrowserStorage(),
    private readonly session?: ProjectSessionContext,
  ) {
    this.store = new ScopedBrowserStore('exhibit-hall', storage, isExhibitState);
  }

  load(projectId: string, projectVersion: string): ExhibitHallState | undefined {
    return this.store.load(this.scope(projectId, projectVersion));
  }

  save(projectId: string, projectVersion: string, state: ExhibitHallState): void {
    this.store.save(this.scope(projectId, projectVersion), state);
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
    Array.isArray(value.hangings) &&
    (!('composerDraft' in value) ||
      value.composerDraft === undefined ||
      isExhibitDraft(value.composerDraft))
  );
}
