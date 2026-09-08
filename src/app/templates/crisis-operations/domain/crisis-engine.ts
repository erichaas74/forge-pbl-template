import type { RuntimeEvent } from '../../../core/events/runtime-event';
import {
  CRISIS_EVENTS,
  type CrisisAction,
  type CrisisConfig,
  type CrisisEvidence,
  type CrisisState,
} from './crisis.models';

export function initialCrisisState(config: CrisisConfig): CrisisState {
  return {
    version: 0,
    stage: 0,
    roleId: config.roles[0].id,
    sharedEvidenceIds: [],
    readEvidenceIds: [],
    decisions: [],
    events: [],
  };
}

export function visibleEvidence(
  config: CrisisConfig,
  state: CrisisState,
): readonly CrisisEvidence[] {
  const ordered = new Set(state.decisions.map((d) => d.actionId));
  return config.evidence.filter(
    (e) =>
      e.stage <= state.stage &&
      (!e.requiresActionId || ordered.has(e.requiresActionId)) &&
      (!e.excludesActionId || !ordered.has(e.excludesActionId)) &&
      (!e.roleIds.length ||
        e.roleIds.includes(state.roleId) ||
        state.sharedEvidenceIds.includes(e.id)),
  );
}

export function availableCrews(config: CrisisConfig, state: CrisisState): number {
  return (
    config.crews -
    state.decisions.reduce(
      (sum, decision) => sum + (config.actions.find((a) => a.id === decision.actionId)?.crews ?? 0),
      0,
    )
  );
}

export function actionBlockedReason(
  config: CrisisConfig,
  state: CrisisState,
  action: CrisisAction,
): string | undefined {
  if (state.decisions.some((d) => d.actionId === action.id)) return 'Order already dispatched';
  if (action.minStage > state.stage) return 'Awaiting field assessment';
  if (action.expiresAtStage !== undefined && state.stage >= action.expiresAtStage)
    return 'Response window has closed';
  if (availableCrews(config, state) < action.crews) return 'Not enough available crews';
  return undefined;
}

type Handler = (config: CrisisConfig, state: CrisisState, event: RuntimeEvent) => CrisisState;
const handlers: Readonly<Record<string, Handler>> = {
  [CRISIS_EVENTS.advance]: (config, state) => ({
    ...state,
    stage: Math.min(state.stage + 1, config.bulletins.length - 1),
  }),
  [CRISIS_EVENTS.role]: (config, state, event) => {
    const roleId = String(event.payload?.['roleId']);
    if (!config.roles.some((role) => role.id === roleId))
      throw new Error('INVALID_ROLE: Unknown specialist station.');
    return { ...state, roleId };
  },
  [CRISIS_EVENTS.read]: (config, state, event) => {
    const id = requireEvidence(config, state, event);
    return { ...state, readEvidenceIds: [...new Set([...state.readEvidenceIds, id])] };
  },
  [CRISIS_EVENTS.share]: (config, state, event) => {
    const id = requireEvidence(config, state, event);
    if (!state.readEvidenceIds.includes(id))
      throw new Error('EVIDENCE_NOT_REVIEWED: Open the report before pinning it.');
    if (state.sharedEvidenceIds.includes(id)) return state;
    if (state.sharedEvidenceIds.length >= config.evidenceLimit)
      throw new Error('BRIEFING_FULL: Unpin a report to make room on the situation table.');
    return { ...state, sharedEvidenceIds: [...state.sharedEvidenceIds, id] };
  },
  [CRISIS_EVENTS.unshare]: (_config, state, event) => ({
    ...state,
    sharedEvidenceIds: state.sharedEvidenceIds.filter((id) => id !== event.payload?.['evidenceId']),
  }),
  [CRISIS_EVENTS.decide]: (config, state, event) => {
    const action = config.actions.find((a) => a.id === event.payload?.['actionId']);
    if (!action) throw new Error('INVALID_COMMAND: Unknown response order.');
    const reason = actionBlockedReason(config, state, action);
    if (reason) throw new Error(`ORDER_UNAVAILABLE: ${reason}.`);
    const ids = event.payload?.['evidenceIds'];
    if (
      !Array.isArray(ids) ||
      !ids.length ||
      !ids.every((id) => typeof id === 'string' && state.sharedEvidenceIds.includes(id))
    ) {
      throw new Error('EVIDENCE_REQUIRED: Attach a report from the situation table.');
    }
    return {
      ...state,
      decisions: [
        ...state.decisions,
        {
          actionId: action.id,
          evidenceIds: [...new Set(ids as string[])],
          minute: config.bulletins[state.stage].minute,
          stage: state.stage,
        },
      ],
    };
  },
};

/** Registered, deterministic local exercise handlers; no UI or vendor dependency. */
export function reduceCrisisEvent(
  config: CrisisConfig,
  state: CrisisState,
  event: RuntimeEvent,
): CrisisState {
  if (event.projectId !== config.projectId)
    throw new Error('PROJECT_ID_MISMATCH: Event belongs to a different exercise.');
  if (
    state.events.some(
      (e) =>
        e.id === event.id || (!!event.clientEventId && e.clientEventId === event.clientEventId),
    )
  )
    return state;
  const handler = handlers[event.eventType];
  if (!handler) throw new Error('CAPABILITY_NOT_INSTALLED: Unregistered crisis event.');
  const next = handler(config, state, event);
  if (next === state) return state;
  return { ...next, version: state.version + 1, events: [...state.events, event].slice(-300) };
}

function requireEvidence(config: CrisisConfig, state: CrisisState, event: RuntimeEvent): string {
  const id = String(event.payload?.['evidenceId']);
  if (!visibleEvidence(config, state).some((e) => e.id === id))
    throw new Error('EVIDENCE_UNAVAILABLE: Report has not reached this station.');
  return id;
}

export function crisisForecast(
  config: CrisisConfig,
  state: CrisisState,
): { risk: number; protected: number; affected: number } {
  const bulletin = config.bulletins[state.stage];
  const actions = state.decisions.map((d) => config.actions.find((a) => a.id === d.actionId)!);
  return {
    risk: Math.max(5, bulletin.risk - actions.reduce((sum, a) => sum + a.riskReduction, 0)),
    protected: actions.reduce((sum, a) => sum + a.protects, 0),
    affected: bulletin.affected,
  };
}
