import { InjectionToken } from '@angular/core';

import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import {
  safeBrowserStorage,
  ScopedBrowserStore,
  type WorkspaceStorageScope,
} from '../../../shared/persistence';
import type { NarrativeStudioState } from '../domain/narrative-studio.models';

export interface NarrativeStudioPersistenceAdapter {
  load(projectId: string, projectVersion: string): NarrativeStudioState | undefined;
  save(state: Readonly<NarrativeStudioState>): void;
  clear(projectId: string, projectVersion: string): void;
}

export class BrowserNarrativeStudioPersistenceAdapter implements NarrativeStudioPersistenceAdapter {
  private readonly store: ScopedBrowserStore<NarrativeStudioState>;

  constructor(
    storage: Storage | undefined = safeBrowserStorage(),
    private readonly session?: ProjectSessionContext,
  ) {
    this.store = new ScopedBrowserStore('narrative-studio', storage, isNarrativeStudioState);
  }

  load(projectId: string, projectVersion: string): NarrativeStudioState | undefined {
    const value = this.store.load(this.scope(projectId, projectVersion));
    return value?.projectId === projectId && value.projectVersion === projectVersion
      ? value
      : undefined;
  }

  save(state: Readonly<NarrativeStudioState>): void {
    this.store.save(
      this.scope(state.projectId, state.projectVersion),
      state as NarrativeStudioState,
    );
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
      attemptId: this.session?.attemptId,
    };
  }
}

export class MemoryNarrativeStudioPersistenceAdapter implements NarrativeStudioPersistenceAdapter {
  private snapshot?: NarrativeStudioState;
  load(projectId: string, projectVersion: string): NarrativeStudioState | undefined {
    return this.snapshot?.projectId === projectId && this.snapshot.projectVersion === projectVersion
      ? structuredClone(this.snapshot)
      : undefined;
  }
  save(state: Readonly<NarrativeStudioState>): void {
    this.snapshot = structuredClone(state);
  }
  clear(): void {
    this.snapshot = undefined;
  }
}

export function isNarrativeStudioState(value: unknown): value is NarrativeStudioState {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (
    item['schemaVersion'] === '1.0' &&
    typeof item['projectId'] === 'string' &&
    typeof item['projectVersion'] === 'string' &&
    Number.isInteger(item['revision']) &&
    typeof item['selectedNodeId'] === 'string' &&
    typeof item['historicalSettingId'] === 'string' &&
    !!item['bible'] &&
    typeof item['bible'] === 'object' &&
    !!item['scenes'] &&
    typeof item['scenes'] === 'object' &&
    Array.isArray(item['coachHistory']) &&
    Array.isArray(item['playtests']) &&
    (item['nodes'] === undefined ||
      isStoredGraph(item['nodes'], item['scenes'], item['selectedNodeId']))
  );
}

function isStoredGraph(value: unknown, scenes: object, selectedNodeId: unknown): boolean {
  if (!Array.isArray(value) || !value.length) return false;
  const ids = new Set<string>();
  for (const node of value) {
    if (
      !node ||
      typeof node !== 'object' ||
      typeof node.id !== 'string' ||
      !['scene', 'ending'].includes(node.kind) ||
      !Array.isArray(node.choices) ||
      !['mapLabel', 'suggestedTitle', 'purpose', 'craftPrompt', 'stormStageId'].every(
        (key) => typeof node[key] === 'string',
      ) ||
      (node.endingOutcome !== undefined && !['death', 'survival'].includes(node.endingOutcome)) ||
      !(node.id in scenes) ||
      ids.has(node.id)
    )
      return false;
    ids.add(node.id);
  }
  return (
    typeof selectedNodeId === 'string' &&
    ids.has(selectedNodeId) &&
    value.every((node) =>
      node.choices.every((choice: unknown) => {
        if (!choice || typeof choice !== 'object') return false;
        const item = choice as Record<string, unknown>;
        return (
          typeof item['id'] === 'string' &&
          typeof item['prompt'] === 'string' &&
          typeof item['nextNodeId'] === 'string' &&
          ids.has(item['nextNodeId'])
        );
      }),
    )
  );
}

export const NARRATIVE_STUDIO_PERSISTENCE = new InjectionToken<NarrativeStudioPersistenceAdapter>(
  'NARRATIVE_STUDIO_PERSISTENCE',
);
