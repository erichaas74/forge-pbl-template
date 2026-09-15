import type { RuntimeEvent } from '../../../../core/events/runtime-event';
import {
  CapabilityRegistry,
  EventRegistry,
} from '../../../../core/registries/specialized-registries';
import { assemblyActivity, diagramActivity, reconstructionActivity } from './object.activities';
import { accessActivity, apprenticeActivity, distributionActivity } from './people.activities';
import {
  KNOWLEDGE_KINDS,
  type KnowledgeAction,
  type KnowledgeActivity,
  type KnowledgeDefinition,
  type KnowledgeKind,
  type KnowledgeState,
} from './knowledge.models';

export const knowledgeActivities: Readonly<Record<KnowledgeKind, KnowledgeActivity>> = {
  reconstruction: reconstructionActivity,
  assembly: assemblyActivity,
  diagram: diagramActivity,
  distribution: distributionActivity,
  access: accessActivity,
  apprentice: apprenticeActivity,
};
export const knowledgeCapabilities = new CapabilityRegistry();
export const knowledgeEvents = new EventRegistry();
for (const kind of KNOWLEDGE_KINDS) {
  const event = `inventionKnowledge.${kind}Operated`;
  knowledgeEvents.register({ id: event, version: '1.0.0', status: 'extension' });
  knowledgeCapabilities.register({
    id: `invention-knowledge.${kind}`,
    version: '1.0.0',
    status: 'extension',
    renderer: `knowledge-${kind}`,
    eventsProduced: [event],
  });
}
export function validKnowledgeDefinition(value: unknown): value is KnowledgeDefinition {
  try {
    if (!value || typeof value !== 'object') return false;
    const c = value as KnowledgeDefinition;
    return (
      c.version === '1.0' &&
      KNOWLEDGE_KINDS.includes(c.kind) &&
      knowledgeActivities[c.kind].validate(c)
    );
  } catch {
    return false;
  }
}
export function applyKnowledgeEvent(
  c: KnowledgeDefinition,
  s: KnowledgeState,
  e: RuntimeEvent,
  projectId: string,
  sessionId: string,
): KnowledgeState {
  if (
    !e ||
    e.eventType !== `inventionKnowledge.${c.kind}Operated` ||
    !knowledgeEvents.has(e.eventType) ||
    e.projectId !== projectId ||
    e.sourceId !== sessionId
  )
    return s;
  const a = e.payload?.['action'] as KnowledgeAction | undefined;
  if (
    !a ||
    typeof a.type !== 'string' ||
    a.type.length > 40 ||
    (a.target !== undefined && typeof a.target !== 'string') ||
    (a.item !== undefined && typeof a.item !== 'string') ||
    (a.value !== undefined && !Number.isFinite(a.value))
  )
    return s;
  return knowledgeActivities[c.kind].reduce(c, s, a);
}
export function replayKnowledge(
  c: KnowledgeDefinition,
  events: readonly RuntimeEvent[],
  projectId: string,
  sessionId: string,
): KnowledgeState | undefined {
  if (!Array.isArray(events) || events.length > 800) return undefined;
  let state = knowledgeActivities[c.kind].initial(c);
  const ids = new Set<string>();
  try {
    for (const e of events) {
      if (
        typeof e?.id !== 'string' ||
        !e.id ||
        ids.has(e.id) ||
        (e.clientEventId && ids.has(e.clientEventId)) ||
        typeof e.timestamp !== 'string' ||
        !e.actor
      )
        return undefined;
      const next = applyKnowledgeEvent(c, state, e, projectId, sessionId);
      if (next === state) return undefined;
      ids.add(e.id);
      if (e.clientEventId) ids.add(e.clientEventId);
      state = next;
    }
    return state;
  } catch {
    return undefined;
  }
}
