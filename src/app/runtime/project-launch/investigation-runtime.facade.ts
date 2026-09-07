import { inject, Injectable, signal } from '@angular/core';

import type { RuntimeEvent } from '../../core/events/runtime-event';
import { projectSessionRuntimeScope } from '../../core/context/project-session-context';
import { BrowserRuntimePersistenceAdapter } from '../../infrastructure/persistence/browser-runtime-persistence.adapter';
import type { KeyValueStorage } from '../../infrastructure/persistence/browser-runtime-persistence.adapter';
import { HttpProjectPackageSource } from '../../infrastructure/persistence/http-project-package-source';
import { LocalInvestigationRuntime } from '../local-investigation-runtime';
import type { RuntimeStateSnapshot } from '../../templates/investigation/domain/runtime-state';
import type { ProjectDefinitionGraph } from '../../templates/investigation/package/project-definition-graph';
import type { InvestigationRuntimeFacade } from '../../templates/investigation/runtime/investigation-runtime.tokens';
import type { ValidationIssue } from '../../core/validation/validation-contracts';
import { SystemClock } from '../../core/time/clock';
import { PROJECT_CATALOG_ENTRY, PROJECT_SESSION_CONTEXT } from './project-launch.tokens';

@Injectable()
export class HostedInvestigationRuntimeFacade implements InvestigationRuntimeFacade {
  private readonly project = inject(PROJECT_CATALOG_ENTRY);
  private readonly session = inject(PROJECT_SESSION_CONTEXT);
  private readonly scope = projectSessionRuntimeScope(this.session, 'student');
  private readonly runtime = new LocalInvestigationRuntime(
    new HttpProjectPackageSource(),
    new SystemClock(),
    new BrowserRuntimePersistenceAdapter<RuntimeStateSnapshot>(safeStorage()),
  );
  private initialization?: Promise<void>;

  readonly loading = signal(true);
  readonly graph = signal<ProjectDefinitionGraph | undefined>(undefined);
  readonly snapshot = signal<RuntimeStateSnapshot | undefined>(undefined);
  readonly issues = signal<readonly ValidationIssue[]>([]);

  initialize(): Promise<void> {
    this.initialization ??= this.load();
    return this.initialization;
  }

  async dispatch(
    eventType: RuntimeEvent['eventType'],
    sourceId?: string,
    payload?: Record<string, unknown>,
  ): Promise<void> {
    const graph = this.graph();
    if (graph === undefined) return;
    const id = createEventId();
    const event: RuntimeEvent = {
      id,
      clientEventId: `client-${id}`,
      tenantId: this.session.tenantId,
      projectId: this.project.id,
      attemptId: this.session.attemptId,
      eventType,
      timestamp: new Date().toISOString(),
      actor: {
        type: this.session.mode === 'teacher' ? 'teacher' : 'student',
        id: this.session.actorId,
      },
      sourceId,
      payload,
    };
    const result = await this.runtime.dispatch(this.scope, event, graph);
    if (result.snapshot !== undefined) this.snapshot.set(result.snapshot);
    const dispatchErrors = result.errors ?? [];
    if (dispatchErrors.length > 0) {
      this.issues.update((current) => [
        ...current,
        ...dispatchErrors.map((error) => ({
          code: error.code,
          severity: error.severity === 'warning' || error.severity === 'info' ? 'warning' as const : 'error' as const,
          entityId: error.sourceId,
          message: error.message,
        })),
      ]);
    }
  }

  private async load(): Promise<void> {
    try {
      const loaded = await this.runtime.loadProject({
        tenantId: this.session.tenantId,
        projectId: this.project.id,
        projectVersion: this.project.projectVersion,
        reference: this.project.packageReference,
      });
      this.issues.set(loaded.issues);
      if (loaded.graph === undefined) return;
      this.graph.set(loaded.graph);
      const initialized = await this.runtime.initializeScope(loaded.graph, this.scope);
      this.snapshot.set(initialized.snapshot);
      const initializationErrors = initialized.errors ?? [];
      if (initializationErrors.length > 0) {
        this.issues.update((current) => [
          ...current,
          ...initializationErrors.map((error) => ({
            code: error.code,
            severity: error.severity === 'warning' || error.severity === 'info' ? 'warning' as const : 'error' as const,
            entityId: error.sourceId,
            message: error.message,
          })),
        ]);
      }
    } finally {
      this.loading.set(false);
    }
  }
}

function safeStorage(): KeyValueStorage {
  try {
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch {
    // Fall through to the in-memory preview store.
  }
  const values = new Map<string, string>();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => void values.delete(key),
  };
}

function createEventId(): string {
  return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
