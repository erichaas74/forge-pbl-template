import type { RuntimeEvent } from '../../../core/events/runtime-event';
import { ageOfExplorationJourneyConfig as config, historicalAgeOfExplorationJourneyConfig } from '../../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import { applyJourneyPathEvent, availablePathChoices, emptyJourneyPath, projectJourneyResources, resolveJourneyPath, restoreJourneyPath } from './journey-path.engine';
import { resolveJourneyOutcome } from './journey-consequences';
import type { JourneyPathState } from '../domain/journey-path.models';
import { validateJourneyPaths } from '../package/journey-path.validation';

const definition = config.experience!;
const node = (id: string) => definition.nodes.find(node => node.id === id)!;
let sequence = 0;
const action = (nodeId: string, eventId: string, choiceId: string): RuntimeEvent => ({ id: String(++sequence), clientEventId: String(sequence), eventType: 'activity.completed', timestamp: '2026-09-15T12:00:00Z', tenantId: 'test', projectId: config.projectId, actor: {type:'student',id:'test'}, sourceId: nodeId, payload: {projectVersion: config.projectVersion, eventId, choiceId} });
const choose = (state: JourneyPathState, nodeId: string, eventId: string, choiceId: string) => applyJourneyPathEvent(config, state, action(nodeId,eventId,choiceId));

describe('branching journey paths', () => {
  it('validates the complete graph and keeps the legacy version separate', () => {
    expect(validateJourneyPaths(definition, config.map, config.resources, config.evidence)).toEqual([]);
    expect(definition.nodes).toHaveLength(20);
    expect(historicalAgeOfExplorationJourneyConfig.projectVersion).toBe('1.3.0');
    expect(historicalAgeOfExplorationJourneyConfig.experience).toBeUndefined();
  });
  it('opens all eight fresh sessions without inventing decisions or resource costs', () => {
    const state = emptyJourneyPath(config.projectVersion);
    const path = resolveJourneyPath(definition, state);
    expect(path.map(entry => entry.node.kind)).toEqual(['map','location','map','location','map','location','map','location']);
    expect(path.slice(1).every(entry => entry.provisional)).toBe(true);
    expect(path.every(entry => entry.choices.length === 0)).toBe(true);
    expect(projectJourneyResources(config,state).resources['supplies']).toBe(80);
  });
  it('records an alternate arrival and carries its investigation into the next session', () => {
    const choice = node('departure-chart').choices[1];
    const state = choose(emptyJourneyPath(config.projectVersion), 'departure-chart', 'route', choice.id);
    expect(resolveJourneyPath(definition,state)[1].node.id).toBe('cape-verde-arrival');
    expect(resolveJourneyPath(definition,state)[0].choices[0].nextTask).toContain('crosswind');
    expect(projectJourneyResources(config,state,2).resources['supplies']).toBe(68);
  });
  it('reveals a survey route from a bearing and rejects it before that discovery', () => {
    let state = emptyJourneyPath(config.projectVersion);
    const chart = node('azores-chart');
    const survey = chart.choices[2];
    expect(availablePathChoices(chart, new Set())).toHaveLength(2);
    expect(() => choose(state, chart.id,'route',survey.id)).toThrow('NOT_REVEALED');
    state = choose(state, 'azores-arrival','azores-bearings','azores-survey');
    expect(availablePathChoices(chart, projectJourneyResources(config,state,3).tags)).toHaveLength(3);
    state = choose(state,chart.id,'route',survey.id);
    expect(resolveJourneyPath(definition,state)[3].node.id).toBe('market-arrival');
  });
  it('makes preparation reduce later repair costs through the shared consequence calculation', () => {
    let state = choose(emptyJourneyPath(config.projectVersion), 'azores-arrival','azores-hold','azores-timber');
    const repair = node('storm-roadstead').events[0].choices[0];
    const before = projectJourneyResources(config,state,4);
    const outcome = resolveJourneyOutcome(config,before,repair);
    expect(outcome.resources['supplies'] - before.resources['supplies']).toBe(-4);
    expect(outcome.carriedForward[0]).toContain('four supply points');
    state = choose(state,'storm-roadstead','roadstead-damage',repair.id);
    expect(projectJourneyResources(config,state).resources).toEqual(outcome.resources);
  });
  it('archives downstream work when an earlier route is revised and prevents double charging', () => {
    let state = emptyJourneyPath(config.projectVersion);
    const event = action('departure-chart','route',node('departure-chart').choices[0].id);
    state = applyJourneyPathEvent(config,state,event);
    expect(applyJourneyPathEvent(config,state,event)).toBe(state);
    state = choose(state,'azores-arrival','azores-hold','azores-water');
    const old = structuredClone(state.decisions);
    state = choose(state,'departure-chart','route',node('departure-chart').choices[1].id);
    expect(state.previousPaths.at(-1)).toEqual(old);
    expect(state.decisions).toHaveLength(1);
    expect(projectJourneyResources(config,state).resources['supplies']).toBe(68);
    expect(restoreJourneyPath(config,state)).toEqual(state);
  });
  it('preserves the other event when revising a choice at the same landing', () => {
    let state = choose(emptyJourneyPath(config.projectVersion),'azores-arrival','azores-bearings','azores-survey');
    state = choose(state,'azores-arrival','azores-hold','azores-water');
    state = choose(state,'azores-arrival','azores-hold','azores-timber');
    expect(state.decisions.map(item=>item.choiceId)).toEqual(['azores-survey','azores-timber']);
  });
  it('rejects malformed, cross-version and unreachable cached decisions', () => {
    const state = emptyJourneyPath(config.projectVersion);
    expect(() => restoreJourneyPath(config, {...state, projectVersion:'1.3.0'})).toThrow('CACHE_INVALID');
    expect(() => restoreJourneyPath(config, {...state, decisions:[null]})).toThrow('CACHE_INVALID');
    expect(() => restoreJourneyPath(config, {...state, decisions:[{nodeId:'cape-verde-arrival',eventId:'cape-verde-hold',choiceId:'cape-verde-water'}]})).toThrow('CACHE_INVALID');
  });
  it('works with a different project identity without project-name conditions', () => {
    const other = {...config, projectId:'navigation-lab'};
    const event = {...action('departure-chart','route',node('departure-chart').choices[1].id),projectId:other.projectId};
    expect(resolveJourneyPath(definition,applyJourneyPathEvent(other,emptyJourneyPath(other.projectVersion),event))[1].node.id).toBe('cape-verde-arrival');
  });
  it('rejects broken route references, source references and graph edges', () => {
    for (const mutation of [
      {...definition, startNodeId:'missing'},
      {...definition, nodes:definition.nodes.map((item,i)=>i===0?{...item, defaultNextId:item.id}:item)},
      {...definition, nodes:definition.nodes.map((item,i)=>i===0?{...item, choices:[{...item.choices[0],routeId:'missing'}]}:item)},
      {...definition, nodes:definition.nodes.map((item,i)=>i===1?{...item, events:[{...item.events[0],evidenceIds:['missing']}]}:item)},
    ]) expect(validateJourneyPaths(mutation,config.map,config.resources,config.evidence).length).toBeGreaterThan(0);
  });
});
