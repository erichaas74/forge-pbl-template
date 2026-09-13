import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import { ScopedBrowserStore, safeBrowserStorage } from '../../../shared/persistence';
import { applyTimeRepairAction, initialTimeRepairState } from '../domain/time-repair.engine';
import type {
  TimeRepairAction,
  TimeRepairConfig,
  TimeRepairState,
} from '../domain/time-repair.models';

export interface TimeRepairPersistence {
  readonly available: boolean;
  load(): TimeRepairState | undefined;
  save(state: TimeRepairState, expectedVersion: number): void;
}
interface StoredRepair {
  readonly definition: string;
  readonly state: TimeRepairState;
}
/** Local exercise only. Replay bounded validated actions rather than trusting stored unlocks. */
export class BrowserTimeRepairPersistence implements TimeRepairPersistence {
  private readonly store: ScopedBrowserStore<StoredRepair>;
  readonly available: boolean;
  private readonly definition: string;
  constructor(
    private readonly config: TimeRepairConfig,
    private readonly session: ProjectSessionContext,
    storage = safeBrowserStorage(),
  ) {
    this.available = storage !== undefined;
    this.definition = JSON.stringify(config);
    this.store = new ScopedBrowserStore(
      'time-repair.v1',
      storage,
      (value): value is StoredRepair => {
        try {
          if (!value || typeof value !== 'object') return false;
          const saved = value as StoredRepair;
          if (
            saved.definition !== this.definition ||
            !Array.isArray(saved.state?.events) ||
            saved.state.events.length > 1000
          )
            return false;
          let replay = initialTimeRepairState(config);
          for (const event of saved.state.events) {
            if (
              event.tenantId !== session.tenantId ||
              event.actor?.id !== session.actorId ||
              event.attemptId !== session.attemptId ||
              typeof event.timestamp !== 'string'
            )
              return false;
            const action = event.payload?.['action'] as TimeRepairAction;
            replay = applyTimeRepairAction(config, replay, action, event).state;
          }
          return JSON.stringify(replay) === JSON.stringify(saved.state);
        } catch {
          return false;
        }
      },
    );
  }
  load(): TimeRepairState | undefined {
    return this.store.load(this.session)?.state;
  }
  save(state: TimeRepairState, expectedVersion: number): void {
    if (this.available && (this.load()?.version ?? 0) !== expectedVersion)
      throw new Error(
        'STATE_CONFLICT: Another tab changed this exercise. The latest saved progress has been loaded; review it before trying again.',
      );
    this.store.save(this.session, { definition: this.definition, state });
  }
}
