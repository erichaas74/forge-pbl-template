import { InjectionToken } from '@angular/core';

import type { HistoryLiveRuntimeState } from '../domain/history-live.models';
import { isHistoryLiveSnapshot } from '../core/history-live-snapshot';

export interface HistoryLivePersistenceAdapter {
  load(projectId: string, projectVersion: string): HistoryLiveRuntimeState | undefined;
  save(projectId: string, projectVersion: string, state: HistoryLiveRuntimeState): void;
  clear(projectId: string, projectVersion: string): void;
}

export class BrowserHistoryLivePersistenceAdapter implements HistoryLivePersistenceAdapter {
  private readonly revisions = new Map<string, number>();
  constructor(private readonly scope: { tenantId: string; classId: string; studentId: string }) {}
  load(projectId: string, projectVersion: string): HistoryLiveRuntimeState | undefined {
    const raw = localStorage.getItem(this.key(projectId, projectVersion));
    if (raw === null) {
      this.revisions.set(this.key(projectId, projectVersion), 0);
      return undefined;
    }
    try {
      const value: unknown = JSON.parse(raw);
      if (!isHistoryLiveSnapshot(value)) throw new Error('Invalid snapshot');
      this.revisions.set(this.key(projectId, projectVersion), value.revision);
      return value;
    } catch {
      throw new Error(
        'SNAPSHOT_INVALID: Saved data has an unsupported structure. Export it before resetting.',
      );
    }
  }

  save(projectId: string, projectVersion: string, state: HistoryLiveRuntimeState): void {
    const key = this.key(projectId, projectVersion);
    const raw = localStorage.getItem(key);
    const current: unknown = raw === null ? undefined : JSON.parse(raw);
    if (current !== undefined && !isHistoryLiveSnapshot(current))
      throw new Error('SNAPSHOT_INVALID');
    const revision = current?.revision ?? 0;
    if (revision !== (this.revisions.get(key) ?? 0))
      throw new Error(
        'STATE_CONFLICT: Another tab saved this workspace. Export your draft before reloading.',
      );
    localStorage.setItem(key, JSON.stringify(state));
    this.revisions.set(key, state.revision);
  }

  clear(projectId: string, projectVersion: string): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(this.key(projectId, projectVersion));
    this.revisions.set(this.key(projectId, projectVersion), 0);
  }

  private key(projectId: string, projectVersion: string): string {
    return `forge:history-live:scoped:${[this.scope.tenantId, this.scope.classId, this.scope.studentId, projectId, projectVersion].map(encodeURIComponent).join(':')}`;
  }
}

export const HISTORY_LIVE_PERSISTENCE = new InjectionToken<HistoryLivePersistenceAdapter>(
  'HISTORY_LIVE_PERSISTENCE',
);
