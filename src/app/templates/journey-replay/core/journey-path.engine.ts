import type { RuntimeEvent } from '../../../core/events/runtime-event';
import type { JourneyProjectConfig } from '../domain/journey-replay.models';
import type { JourneyPathChoice, JourneyPathDecision, JourneyPathDefinition, JourneyPathNode, JourneyPathState } from '../domain/journey-path.models';
import { resolveJourneyOutcome } from './journey-consequences';
import { revealedJourneyChoices } from './journey-path.rules';

export function emptyJourneyPath(projectVersion: string): JourneyPathState {
  return { schemaVersion: '1.0', projectVersion, revision: 0, decisions: [], history: [], previousPaths: [] };
}

export function pathChoices(node: JourneyPathNode, eventId: string): readonly JourneyPathChoice[] {
  return eventId === 'route' ? node.choices : node.events.find(event => event.id === eventId)?.choices ?? [];
}

export function selectedPathChoice(node: JourneyPathNode, decisions: readonly JourneyPathDecision[], eventId: string): JourneyPathChoice | undefined {
  const decision = decisions.find(item => item.nodeId === node.id && item.eventId === eventId);
  return pathChoices(node, eventId).find(choice => choice.id === decision?.choiceId);
}

/** Unanswered sessions use explicit, unrecorded example edges. Navigation never awards completion. */
export function resolveJourneyPath(definition: JourneyPathDefinition, state: JourneyPathState) {
  const path: { node: JourneyPathNode; provisional: boolean; choices: readonly JourneyPathChoice[] }[] = [];
  let node = definition.nodes.find(item => item.id === definition.startNodeId);
  let provisional = false;
  while (node && path.length < 8) {
    const current = node;
    const keys = current.kind === 'map' ? ['route'] : current.events.map(event => event.id);
    const choices = keys.flatMap(key => {
      const choice = selectedPathChoice(current, state.decisions, key);
      return choice ? [choice] : [];
    });
    path.push({ node: current, provisional, choices });
    provisional ||= choices.length < keys.length;
    const nextId = [...choices].reverse().find(choice => choice.nextNodeId)?.nextNodeId ?? current.defaultNextId;
    node = definition.nodes.find(item => item.id === nextId);
  }
  return path;
}

export function projectJourneyResources(config: JourneyProjectConfig, state: JourneyPathState, beforeSession = 9) {
  const choices = resolveJourneyPath(config.experience!, state).filter(entry => entry.node.session < beforeSession).flatMap(entry => entry.choices);
  return projectPathChoices(config, choices);
}

export function projectPathChoices(config: JourneyProjectConfig, choices: readonly JourneyPathChoice[]) {
  let resources = Object.fromEntries(config.resources.map(resource => [resource.id, resource.startingValue]));
  const completedSteps: { choiceId: string }[] = [];
  for (const choice of choices) {
    resources = resolveJourneyOutcome(config, { resources, completedSteps }, choice).resources;
    completedSteps.push({ choiceId: choice.id });
  }
  return { resources, completedSteps, choices, tags: new Set(choices.flatMap(choice => choice.grants ?? [])) };
}

export function availablePathChoices(node: JourneyPathNode, tags: ReadonlySet<string>): readonly JourneyPathChoice[] {
  const revealed = revealedJourneyChoices(node, tags);
  return node.choices.filter(choice => revealed.has(choice.id));
}

/** One registered activity event -> validated, bounded snapshot; revised downstream work is archived. */
export function applyJourneyPathEvent(config: JourneyProjectConfig, state: JourneyPathState, event: RuntimeEvent): JourneyPathState {
  if (event.eventType !== 'activity.completed' || event.projectId !== config.projectId || event.payload?.['projectVersion'] !== config.projectVersion) throw new Error('JOURNEY_PATH_EVENT_INVALID');
  if (state.history.some(item => item.id === event.id || (event.clientEventId && item.clientEventId === event.clientEventId))) return state;
  const node = config.experience?.nodes.find(item => item.id === event.sourceId);
  const eventId = String(event.payload['eventId']);
  const choice = node && pathChoices(node, eventId).find(item => item.id === event.payload?.['choiceId']);
  if (!node || !choice) throw new Error('JOURNEY_PATH_CHOICE_INVALID');
  const currentPath = resolveJourneyPath(config.experience!, state);
  if (!currentPath.some(entry => entry.node.id === node.id)) throw new Error('JOURNEY_PATH_PREVIEW_ONLY');
  if (node.kind === 'map' && !availablePathChoices(node, projectJourneyResources(config, state, node.session).tags).some(item => item.id === choice.id)) throw new Error('JOURNEY_PATH_NOT_REVEALED');
  if (selectedPathChoice(node, state.decisions, eventId)?.id === choice.id) return state;
  const retained = state.decisions.filter(item => {
    const entry = config.experience!.nodes.find(candidate => candidate.id === item.nodeId);
    return entry && entry.session <= node.session && !(item.nodeId === node.id && item.eventId === eventId);
  });
  return {
    ...state, revision: state.revision + 1,
    decisions: [...retained, { nodeId: node.id, eventId, choiceId: choice.id }],
    history: [...state.history, event].slice(-200),
    previousPaths: state.decisions.some(item => !retained.includes(item))
      ? [...state.previousPaths, state.decisions].slice(-20) : state.previousPaths,
  };
}

export function restoreJourneyPath(config: JourneyProjectConfig, value: unknown): JourneyPathState {
  const record = value as Partial<JourneyPathState> | null;
  if (!record || record.schemaVersion !== '1.0' || record.projectVersion !== config.projectVersion || !Number.isSafeInteger(record.revision) || record.revision! < 0 || !Array.isArray(record.decisions) || record.decisions.length > 32 || !Array.isArray(record.history) || record.history.length > 200 || !Array.isArray(record.previousPaths) || record.previousPaths.length > 20) throw new Error('JOURNEY_PATH_CACHE_INVALID');
  const validDecisions = (decisions: unknown): decisions is JourneyPathDecision[] => Array.isArray(decisions) && decisions.length <= 32 && decisions.every((decision: JourneyPathDecision) => {
    if (!decision || typeof decision !== 'object') return false;
    const node = config.experience!.nodes.find(item => item.id === decision.nodeId);
    return node && pathChoices(node, decision.eventId).some(choice => choice.id === decision.choiceId);
  }) && new Set(decisions.map(item => `${item.nodeId}:${item.eventId}`)).size === decisions.length;
  if (!validDecisions(record.decisions) || !record.previousPaths.every(validDecisions) || !record.history.every(event => event && typeof event.id === 'string' && event.eventType === 'activity.completed' && event.projectId === config.projectId && typeof event.timestamp === 'string')) throw new Error('JOURNEY_PATH_CACHE_INVALID');
  const state = record as JourneyPathState;
  const path = resolveJourneyPath(config.experience!, state);
  if (state.decisions.some(decision => !path.some(entry => entry.node.id === decision.nodeId)) || path.some(entry => entry.node.kind === 'map' && entry.choices.some(choice => !availablePathChoices(entry.node, projectJourneyResources(config, state, entry.node.session).tags).includes(choice)))) throw new Error('JOURNEY_PATH_CACHE_INVALID');
  return structuredClone(state);
}
