import { InjectionToken } from '@angular/core';
import type { JourneyPathPersistence, JourneyPathScope, JourneyPathState } from '../domain/journey-path.models';

const key = (scope: JourneyPathScope) => `forge:journey-path:1:${JSON.stringify([scope.tenantId, scope.classId, scope.studentId, scope.projectId, scope.projectVersion])}`;

export class MemoryJourneyPathPersistence implements JourneyPathPersistence {
  private readonly records = new Map<string, JourneyPathState>();
  load(scope: JourneyPathScope): unknown { const state = this.records.get(key(scope)); return state && structuredClone(state); }
  save(scope: JourneyPathScope, state: JourneyPathState): void { this.records.set(key(scope), structuredClone(state)); }
}

export class BrowserJourneyPathPersistence implements JourneyPathPersistence {
  load(scope: JourneyPathScope): unknown {
    const value = localStorage.getItem(key(scope));
    return value ? JSON.parse(value) : undefined;
  }
  save(scope: JourneyPathScope, state: JourneyPathState): void { localStorage.setItem(key(scope), JSON.stringify(state)); }
}

export const JOURNEY_PATH_PERSISTENCE = new InjectionToken<JourneyPathPersistence>('JOURNEY_PATH_PERSISTENCE', { providedIn: 'root', factory: () => new MemoryJourneyPathPersistence() });
