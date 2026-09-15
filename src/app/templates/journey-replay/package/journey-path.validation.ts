import type { ValidationIssue } from '../../../core/validation/validation-contracts';
import type { JourneyPathDefinition } from '../domain/journey-path.models';
import type { JourneyEvidenceDefinition, JourneyMapConfig, JourneyResourceDefinition } from '../domain/journey-replay.models';

const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const strings = (value: unknown): value is string[] => Array.isArray(value) && value.every(item => typeof item === 'string' && item.trim().length > 0);
const text = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const validObject = (value: unknown): boolean => record(value) && ['x','y'].every(key => typeof value[key] === 'number' && Number(value[key]) >= 0 && Number(value[key]) <= 100) && ['compass','cargo','sail','shore','log'].includes(String(value['icon']));

export function validateJourneyPaths(value: unknown, map: JourneyMapConfig, resources: readonly JourneyResourceDefinition[], evidence: readonly JourneyEvidenceDefinition[]): ValidationIssue[] {
  if (value === undefined) return [];
  const issues: ValidationIssue[] = [];
  const error = (message: string) => issues.push({ code: 'JOURNEY_PATH_INVALID', severity: 'error', file: 'journey.json', message });
  if (!record(value) || value['schemaVersion'] !== '1.0' || value['capability'] !== 'branchingJourney' || !text(value['startNodeId']) || !Array.isArray(value['nodes']) || value['nodes'].length === 0 || value['nodes'].length > 100) { error('Branching journey requires a versioned node graph.'); return issues; }
  const ids = new Set<string>();
  const choiceIds = new Set<string>();
  const validResources = new Set(resources.map(item => item.id));
  const validEvidence = new Set(evidence.map(item => item.id));
  const validLocations = new Set(map.locations.map(item => item.id));
  for (const node of value['nodes']) {
    if (!record(node) || !['id', 'title', 'locationId', 'product', 'learning'].every(key => text(node[key])) || !Number.isInteger(node['session']) || Number(node['session']) < 1 || Number(node['session']) > 8 || !['map', 'location'].includes(String(node['kind'])) || !strings(node['tasks']) || !node['tasks'].length || !Array.isArray(node['choices']) || !Array.isArray(node['events'])) { error('Every node needs a session, task, product and typed activities.'); continue; }
    if (ids.has(String(node['id']))) error(`Duplicate node ${node['id']}.`);
    ids.add(String(node['id']));
    if (!validLocations.has(String(node['locationId']))) error(`Unknown location in ${node['id']}.`);
    if ((Number(node['session']) % 2 === 1) !== (node['kind'] === 'map')) error(`Sessions must alternate map and location: ${node['id']}.`);
    if (node['kind'] === 'map' ? node['choices'].length < 1 || node['events'].length !== 0 : node['events'].length < 1 || node['choices'].length !== 0 || !['island','harbor','storm','river','cape','home'].includes(String(node['scene']))) error(`Unsupported activity or scene in ${node['id']}.`);
    const eventIds = new Set<string>();
    for (const event of node['events']) {
      if (!record(event) || !['id','label','observation','question'].every(key => text(event[key])) || !strings(event['evidenceIds']) || !event['evidenceIds'].every(id => validEvidence.has(id)) || !validObject(event['object']) || !Array.isArray(event['choices']) || event['choices'].length < 2) { error(`Malformed location event in ${node['id']}.`); continue; }
      if (eventIds.has(String(event['id']))) error(`Duplicate event in ${node['id']}.`);
      eventIds.add(String(event['id']));
    }
    const choices = [...node['choices'], ...node['events'].flatMap(event => record(event) && Array.isArray(event['choices']) ? event['choices'] : [])];
    for (const choice of choices) {
      if (!record(choice) || !['id','label','summary','consequence','nextTask','learning'].every(key => text(choice[key]))) { error(`Malformed choice in ${node['id']}.`); continue; }
      if (choiceIds.has(String(choice['id']))) error(`Duplicate choice ${choice['id']}.`);
      choiceIds.add(String(choice['id']));
      for (const key of ['grants','requiresAny']) if (choice[key] !== undefined && !strings(choice[key])) error(`Invalid tags in ${choice['id']}.`);
      if (choice['effect'] !== undefined && !['water','repair','charts','rest','exchange','sail'].includes(String(choice['effect']))) error(`Unknown scene effect in ${choice['id']}.`);
      const changes = choice['resourceChanges'];
      if (changes !== undefined && (!record(changes) || Object.entries(changes).some(([id, amount]) => !validResources.has(id) || typeof amount !== 'number' || !Number.isFinite(amount)))) error(`Invalid resources in ${choice['id']}.`);
      if (choice['consequenceModifiers'] !== undefined && (!Array.isArray(choice['consequenceModifiers']) || choice['consequenceModifiers'].some(modifier => !record(modifier) || !text(modifier['afterChoiceId']) || !text(modifier['narrative']) || !record(modifier['resourceChanges']) || Object.entries(modifier['resourceChanges']).some(([id, amount]) => !validResources.has(id) || typeof amount !== 'number' || !Number.isFinite(amount))))) error(`Invalid carried consequences in ${choice['id']}.`);
    }
  }
  if (issues.length) return issues;
  const definition = value as unknown as JourneyPathDefinition;
  const nodes = new Map(definition.nodes.map(node => [node.id, node]));
  const start = nodes.get(definition.startNodeId);
  if (start?.session !== 1) error('Starting node must be session 1.');
  const granted = new Set(definition.nodes.flatMap(node => [...node.choices, ...node.events.flatMap(event => event.choices)]).flatMap(choice => choice.grants ?? []));
  for (const node of definition.nodes) {
    const choices = [...node.choices, ...node.events.flatMap(event => event.choices)];
    if (node.session < 8 && !node.defaultNextId) error(`Missing practice continuation in ${node.id}.`);
    for (const next of [node.defaultNextId, ...choices.map(choice => choice.nextNodeId)].filter((id): id is string => !!id)) if (nodes.get(next)?.session !== node.session + 1) error(`Broken or nonsequential edge ${node.id} -> ${next}.`);
    for (const choice of choices) {
      if (choice.requiresAny?.some(tag => !granted.has(tag))) error(`Unobtainable discovery in ${choice.id}.`);
      if (choice.consequenceModifiers?.some(modifier => !choiceIds.has(modifier.afterChoiceId))) error(`Unknown earlier choice in ${choice.id}.`);
      if (node.kind === 'map') {
        const route = map.routes.find(route => route.id === choice.routeId);
        if (!choice.nextNodeId || !route || route.fromLocationId !== node.locationId || route.toLocationId !== nodes.get(choice.nextNodeId)?.locationId) error(`Route must connect the chosen locations in ${choice.id}.`);
      }
    }
  }
  const reached = new Set<string>();
  const visit = (id: string) => {
    if (reached.has(id)) return;
    reached.add(id);
    const node = nodes.get(id);
    if (!node) return;
    for (const next of [node.defaultNextId, ...node.choices.map(choice => choice.nextNodeId), ...node.events.flatMap(event => event.choices.map(choice => choice.nextNodeId))]) if (next) visit(next);
  };
  visit(definition.startNodeId);
  if (reached.size !== nodes.size) error('Every configured scene must be reachable.');
  if (new Set(definition.nodes.map(node => node.session)).size !== 8) error('Eight freely accessible sessions are required.');
  return issues;
}
