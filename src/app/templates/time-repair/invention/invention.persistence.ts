import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import type { RuntimeEvent } from '../../../core/events/runtime-event';
import { safeBrowserStorage, ScopedBrowserStore } from '../../../shared/persistence';
import type {
  InventionAction,
  InventionProject,
  InventionSession,
  InventionState,
  PressSettings,
} from './invention.models';
import {
  applyInventionAction,
  initialInventionState,
  validPressSettings,
} from './printing-press.engine';

export interface InventionSave {
  readonly settings: PressSettings;
  readonly events: readonly RuntimeEvent[];
}
export interface InventionPersistence {
  readonly available: boolean;
  load(session: InventionSession): InventionSave | undefined;
  save(session: InventionSession, save: InventionSave): void;
}
export function restoreInventionState(
  project: InventionProject,
  session: InventionSession,
  events: readonly RuntimeEvent[],
): InventionState | undefined {
  let state = initialInventionState();
  try {
    for (const event of events) {
      if (
        !event ||
        typeof event.id !== 'string' ||
        typeof event.timestamp !== 'string' ||
        !event.actor ||
        !event.payload?.['action']
      )
        return undefined;
      const result = applyInventionAction(
        project,
        session,
        state,
        event.payload['action'] as InventionAction,
        event,
      );
      if (result.state === state) return undefined;
      state = result.state;
    }
  } catch {
    return undefined;
  }
  return state;
}
export class BrowserInventionPersistence implements InventionPersistence {
  readonly available: boolean;
  constructor(
    private readonly project: InventionProject,
    private readonly context: ProjectSessionContext,
    private readonly storage = safeBrowserStorage(),
  ) {
    this.available = !!storage;
  }
  private store(session: InventionSession): ScopedBrowserStore<InventionSave> {
    return new ScopedBrowserStore(
      'invention-repair.v1',
      this.storage,
      (value): value is InventionSave => {
        if (!value || typeof value !== 'object') return false;
        const save = value as InventionSave;
        return (
          validPressSettings(save.settings, this.project, session) &&
          Array.isArray(save.events) &&
          save.events.length <= 400 &&
          save.events.every(
            (e) => e?.tenantId === this.context.tenantId && e?.actor?.id === this.context.actorId,
          ) &&
          restoreInventionState(this.project, session, save.events) !== undefined
        );
      },
    );
  }
  load(session: InventionSession): InventionSave | undefined {
    return this.store(session).load({ ...this.context, sessionId: session.id });
  }
  save(session: InventionSession, save: InventionSave): void {
    this.store(session).save({ ...this.context, sessionId: session.id }, save);
  }
}
