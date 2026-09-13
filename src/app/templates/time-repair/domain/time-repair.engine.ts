import { EventRegistry } from '../../../core/registries/specialized-registries';
import type { RuntimeEvent } from '../../../core/events/runtime-event';
import {
  TIME_REPAIR_EVENTS,
  type MissionProgress,
  type TimeRepairAction,
  type TimeRepairConfig,
  type TimeRepairMission,
  type TimeRepairState,
} from './time-repair.models';

const events = new EventRegistry();
for (const id of Object.values(TIME_REPAIR_EVENTS))
  events.register({ id, version: '1.0.0', status: 'extension' });

export const repairCapabilities = Object.freeze({
  'replace-object': (mission: TimeRepairMission, optionId: string) =>
    mission.evaluation.repairOptionId === optionId,
  'restore-sequence': (mission: TimeRepairMission, optionId: string) =>
    mission.evaluation.repairOptionId === optionId,
});
export function initialTimeRepairState(config: TimeRepairConfig): TimeRepairState {
  return {
    version: 0,
    collectedIds: [],
    events: [],
    missions: Object.fromEntries(
      config.missions.map((m) => [
        m.id,
        {
          links: [],
          defenses: [],
          authorized: false,
          jumped: false,
          inspectedIds: [],
          attempts: [],
          repaired: false,
        },
      ]),
    ),
  };
}
export function chargesRemaining(config: TimeRepairConfig, state: TimeRepairState): number {
  return (
    config.settings.repairCharges -
    Object.values(state.missions).reduce((sum, m) => sum + m.attempts.length, 0)
  );
}
export function timelineStability(config: TimeRepairConfig, state: TimeRepairState): number {
  const gain = config.missions.reduce(
    (sum, m) =>
      sum +
      (state.missions[m.id].repaired
        ? m.stabilityValue * (state.missions[m.id].verification ? 1 : 0.7)
        : 0),
    0,
  );
  const errors = Object.values(state.missions)
    .flatMap((m) => m.attempts)
    .filter((a) => !a.correct).length;
  return Math.round(
    Math.max(
      0,
      Math.min(
        100,
        config.settings.initialStability + gain - errors * config.settings.wrongRepairPenalty,
      ),
    ),
  );
}
export function nodeStatus(
  config: TimeRepairConfig,
  state: TimeRepairState,
  nodeId: string,
): string {
  const mission = config.missions.find((m) => m.nodeId === nodeId);
  if (mission)
    return state.missions[mission.id].verification
      ? 'restored'
      : state.missions[mission.id].repaired
        ? 'verify'
        : 'anomaly';
  const causes = config.missions.filter((m) => m.ripples.some((r) => r.nodeId === nodeId));
  if (causes.length)
    return causes.every((m) => state.missions[m.id].repaired) ? 'restored' : 'ripple';
  return config.nodes.find((n) => n.id === nodeId)?.initialStatus ?? 'missing';
}
function requireThat(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
const writing = (value: unknown, min = 20): value is string =>
  typeof value === 'string' && value.trim().length >= min && value.length <= 4000;

export interface TimeRepairResult {
  readonly state: TimeRepairState;
  readonly message: string;
}
type Handler<K extends TimeRepairAction['type']> = (
  config: TimeRepairConfig,
  state: TimeRepairState,
  action: Extract<TimeRepairAction, { type: K }>,
) => TimeRepairResult;
type Handlers = { [K in TimeRepairAction['type']]: Handler<K> };
function missionContext(
  config: TimeRepairConfig,
  state: TimeRepairState,
  id: string,
): [TimeRepairMission, MissionProgress] {
  const mission = config.missions.find((m) => m.id === id);
  requireThat(
    mission && Object.hasOwn(state.missions, id),
    'REFERENCE_NOT_FOUND: This repair mission is unavailable.',
  );
  return [mission, state.missions[id]];
}
function update(
  state: TimeRepairState,
  id: string,
  progress: MissionProgress,
  message: string,
): TimeRepairResult {
  return { state: { ...state, missions: { ...state.missions, [id]: progress } }, message };
}
const handlers: Handlers = {
  collect(config, state, action) {
    requireThat(
      config.evidence.some((e) => e.id === action.evidenceId),
      'REFERENCE_NOT_FOUND: Choose a source from the archive.',
    );
    return {
      state: state.collectedIds.includes(action.evidenceId)
        ? state
        : { ...state, collectedIds: [...state.collectedIds, action.evidenceId] },
      message: 'Evidence card saved. Connect it to your claim.',
    };
  },
  link(config, state, action) {
    const [, progress] = missionContext(config, state, action.missionId);
    requireThat(!progress.authorized, 'MISSION_LOCKED: This defense is already authorized.');
    requireThat(
      state.collectedIds.includes(action.link.evidenceId),
      'EVIDENCE_REQUIRED: Collect this source first.',
    );
    requireThat(
      ['supports', 'contradicts', 'uncertain'].includes(action.link.relationship) &&
        ['developing', 'confident'].includes(action.link.confidence) &&
        writing(action.link.note),
      'REASONING_REQUIRED: Explain what this source proves in at least 20 characters.',
    );
    return update(
      state,
      action.missionId,
      {
        ...progress,
        links: [
          ...progress.links.filter((l) => l.evidenceId !== action.link.evidenceId),
          { ...action.link, note: action.link.note.trim() },
        ],
      },
      'Evidence connected to the reported anomaly.',
    );
  },
  defend(config, state, action) {
    const [mission, progress] = missionContext(config, state, action.missionId);
    requireThat(!progress.authorized, 'MISSION_LOCKED: Your time jump is already authorized.');
    requireThat(
      mission.prerequisiteMissionIds.every((id) => !!state.missions[id].verification),
      'PREREQUISITE_REQUIRED: Verify the preceding repair first.',
    );
    const d = action.defense;
    requireThat(
      mission.categories.includes(d.category) &&
        mission.defense.options.some((o) => o.id === d.answerId),
      'DEFENSE_INCOMPLETE: Classify the signal and answer the archive challenge.',
    );
    requireThat(
      [d.claim, d.consequence, d.explanation].every((s) =>
        writing(s, config.settings.minReasoningLength),
      ),
      `REASONING_REQUIRED: Complete each defense field with at least ${config.settings.minReasoningLength} characters.`,
    );
    const enoughEvidence = mission.evidenceRequired.every((id) =>
      progress.links.some((l) => l.evidenceId === id && l.relationship === 'contradicts'),
    );
    const accepted =
      enoughEvidence &&
      d.category === mission.evaluation.category &&
      d.answerId === mission.evaluation.defenseOptionId;
    return update(
      state,
      action.missionId,
      { ...progress, authorized: accepted, defenses: [...progress.defenses, { ...d, accepted }] },
      accepted
        ? 'System checkpoint passed. Your evidence connections and defense are complete. Time jump authorized; written reasoning remains available for teacher review.'
        : 'Revision needed. Check the source dates, what each source contradicts, and whether your conclusion follows from the archive. Your draft has been saved.',
    );
  },
  jump(config, state, action) {
    const [, progress] = missionContext(config, state, action.missionId);
    requireThat(
      progress.authorized && !progress.repaired,
      'DEFENSE_REQUIRED: Complete your evidence defense before entering the scene.',
    );
    return update(
      state,
      action.missionId,
      { ...progress, jumped: true },
      'Jump complete. Inspect the scene before intervening.',
    );
  },
  inspect(config, state, action) {
    const [mission, progress] = missionContext(config, state, action.missionId);
    requireThat(progress.jumped, 'JUMP_REQUIRED: Enter this scene first.');
    requireThat(
      config.scenes
        .find((s) => s.id === mission.sceneId)
        ?.hotspots.some((h) => h.id === action.hotspotId),
      'REFERENCE_NOT_FOUND: This object is not in the scene.',
    );
    if (progress.inspectedIds.includes(action.hotspotId)) return { state, message: '' };
    return update(
      state,
      action.missionId,
      { ...progress, inspectedIds: [...progress.inspectedIds, action.hotspotId] },
      'Inspection recorded.',
    );
  },
  repair(config, state, action) {
    const [mission, progress] = missionContext(config, state, action.missionId);
    requireThat(
      progress.authorized &&
        progress.jumped &&
        progress.inspectedIds.includes(mission.repair.targetHotspotId),
      'INSPECTION_REQUIRED: Defend the claim, jump, and inspect the affected object first.',
    );
    requireThat(!progress.repaired, 'ALREADY_REPAIRED: This event is ready for verification.');
    requireThat(
      chargesRemaining(config, state) > 0,
      'INSUFFICIENT_RESOURCE: No repair charges remain. Export your repair log for a debrief.',
    );
    requireThat(
      mission.repair.options.some((o) => o.id === action.optionId),
      'INVALID_COMMAND: Select an available repair.',
    );
    const correct = repairCapabilities[mission.repair.capability](mission, action.optionId);
    return update(
      state,
      action.missionId,
      {
        ...progress,
        repaired: correct,
        attempts: [...progress.attempts, { optionId: action.optionId, correct }],
      },
      correct
        ? 'Repair applied. The downstream branches have changed. Verify why the new sequence is supported.'
        : 'That intervention destabilized the timeline. One charge was used. Revisit your sources before another attempt.',
    );
  },
  verify(config, state, action) {
    const [mission, progress] = missionContext(config, state, action.missionId);
    requireThat(
      progress.repaired && !progress.verification,
      'REPAIR_REQUIRED: Apply a repair before submitting its verification.',
    );
    requireThat(
      mission.evidenceRequired.includes(action.evidenceId) &&
        progress.links.some((l) => l.evidenceId === action.evidenceId),
      'EVIDENCE_REQUIRED: Cite a connected source that supports the restored sequence.',
    );
    requireThat(
      writing(action.explanation, config.settings.minReasoningLength),
      `REASONING_REQUIRED: Explain the ripple using at least ${config.settings.minReasoningLength} characters.`,
    );
    return update(
      state,
      action.missionId,
      {
        ...progress,
        verification: { evidenceId: action.evidenceId, explanation: action.explanation.trim() },
      },
      'Verification recorded. This timeline repair is complete.',
    );
  },
};

/** Registered capability actions own their invariants; the UI never spends charges or awards completion. */
export function applyTimeRepairAction(
  config: TimeRepairConfig,
  state: TimeRepairState,
  action: TimeRepairAction,
  event: RuntimeEvent,
): TimeRepairResult {
  requireThat(
    Object.hasOwn(handlers, action.type) &&
      event.eventType === TIME_REPAIR_EVENTS[action.type] &&
      event.projectId === config.projectId &&
      !!event.clientEventId,
    'INVALID_EVENT: The repair request does not match this project.',
  );
  if (state.events.some((e) => e.clientEventId === event.clientEventId))
    return { state, message: 'This request has already been recorded.' };
  requireThat(
    state.events.length < 1000,
    'HISTORY_LIMIT: Export your case file; this pilot has reached its record limit.',
  );
  const handler = handlers[action.type] as Handler<TimeRepairAction['type']>;
  const result = handler(config, state, action);
  if (result.state === state) return result;
  return {
    ...result,
    state: {
      ...result.state,
      version: state.version + 1,
      events: [...state.events, { ...event, payload: { action: structuredClone(action) } }],
    },
  };
}
