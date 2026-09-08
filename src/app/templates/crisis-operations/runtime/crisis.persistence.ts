import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import { safeBrowserStorage, ScopedBrowserStore } from '../../../shared/persistence';
import type { CrisisConfig, CrisisState } from '../domain/crisis.models';
import { availableCrews } from '../domain/crisis-engine';

export interface CrisisPersistence {
  readonly available: boolean;
  load(): CrisisState | undefined;
  save(state: CrisisState): void;
}

export class BrowserCrisisPersistence implements CrisisPersistence {
  private readonly store: ScopedBrowserStore<CrisisState>;
  readonly available: boolean;
  constructor(
    config: CrisisConfig,
    private readonly session: ProjectSessionContext,
    storage = safeBrowserStorage(),
  ) {
    this.available = storage !== undefined;
    this.store = new ScopedBrowserStore(
      'crisis-operations.v1',
      storage,
      (value): value is CrisisState => isCrisisState(config, value),
    );
  }
  load(): CrisisState | undefined {
    return this.store.load(this.session);
  }
  save(state: CrisisState): void {
    this.store.save(this.session, state);
  }
}

export function isCrisisState(config: CrisisConfig, value: unknown): value is CrisisState {
  if (typeof value !== 'object' || value === null) return false;
  const s = value as CrisisState;
  if (
    !Number.isInteger(s.version) ||
    s.version < 0 ||
    !Number.isInteger(s.stage) ||
    s.stage < 0 ||
    s.stage >= config.bulletins.length ||
    !config.roles.some((r) => r.id === s.roleId)
  )
    return false;
  if (![s.sharedEvidenceIds, s.readEvidenceIds, s.decisions, s.events].every(Array.isArray))
    return false;
  if (s.sharedEvidenceIds.length > config.evidenceLimit || s.events.length > 300) return false;
  for (const ids of [s.sharedEvidenceIds, s.readEvidenceIds]) {
    if (
      new Set(ids).size !== ids.length ||
      ids.some((id) => !config.evidence.some((e) => e.id === id && e.stage <= s.stage))
    )
      return false;
  }
  if (s.sharedEvidenceIds.some((id) => !s.readEvidenceIds.includes(id))) return false;
  if (
    s.decisions.some(
      (d) =>
        !d ||
        typeof d !== 'object' ||
        !config.actions.some(
          (a) =>
            a.id === d.actionId &&
            d.stage >= a.minStage &&
            (a.expiresAtStage === undefined || d.stage < a.expiresAtStage),
        ) ||
        !Number.isInteger(d.stage) ||
        d.stage < 0 ||
        d.stage > s.stage ||
        d.minute !== config.bulletins[d.stage].minute ||
        !Array.isArray(d.evidenceIds) ||
        !d.evidenceIds.length ||
        d.evidenceIds.some((id) => !config.evidence.some((e) => e.id === id && e.stage <= d.stage)),
    )
  )
    return false;
  if (
    new Set(s.decisions.map((d) => d.actionId)).size !== s.decisions.length ||
    availableCrews(config, s) < 0
  )
    return false;
  return s.events.every(
    (e) =>
      !!e &&
      typeof e === 'object' &&
      typeof e.id === 'string' &&
      typeof e.eventType === 'string' &&
      e.projectId === config.projectId,
  );
}
