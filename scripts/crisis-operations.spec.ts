import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  actionBlockedReason,
  availableCrews,
  crisisForecast,
  initialCrisisState,
  reduceCrisisEvent,
  visibleEvidence,
} from '../src/app/templates/crisis-operations/domain/crisis-engine';
import { requireCrisisConfig } from '../src/app/templates/crisis-operations/domain/crisis-validation';
import {
  CRISIS_EVENTS,
  type CrisisConfig,
  type CrisisState,
} from '../src/app/templates/crisis-operations/domain/crisis.models';
import type { RuntimeEvent } from '../src/app/core/events/runtime-event';
import {
  isCrisisState,
  BrowserCrisisPersistence,
} from '../src/app/templates/crisis-operations/runtime/crisis.persistence';
import { createLocalPreviewSession } from '../src/app/core/context/project-session-context';
import { LocalCrisisOperationsRuntime } from '../src/app/runtime/local-crisis-operations-runtime';
import { InMemoryProjectPackageSource } from '../src/app/infrastructure/persistence/in-memory-project-package-source';

const raw = JSON.parse(
  readFileSync(
    new URL('../public/projects/cascade-bay-crisis/project.json', import.meta.url),
    'utf8',
  ),
);
const config = requireCrisisConfig(raw);
let serial = 0;
function event(
  eventType: string,
  payload: Record<string, unknown> = {},
  overrides: Partial<RuntimeEvent> = {},
): RuntimeEvent {
  return {
    id: `test-${++serial}`,
    eventType,
    timestamp: '2026-09-08T00:00:00Z',
    tenantId: 'test',
    projectId: config.projectId,
    actor: { type: 'student', id: 'test' },
    payload,
    ...overrides,
  };
}
function apply(
  state: CrisisState,
  name: keyof typeof CRISIS_EVENTS,
  payload: Record<string, unknown> = {},
): CrisisState {
  return reduceCrisisEvent(config, state, event(CRISIS_EVENTS[name], payload));
}
function withEvidence(state = initialCrisisState(config), id = 'field-01'): CrisisState {
  return apply(apply(state, 'read', { evidenceId: id }), 'share', { evidenceId: id });
}
function dispatch(state: CrisisState, actionId: string): CrisisState {
  return apply(state, 'decide', { actionId, evidenceIds: ['field-01'] });
}

describe('crisis operations static package and reusable engine', () => {
  it('loads validated crisis packages through the common runtime contract', async () => {
    const source = new InMemoryProjectPackageSource({ scenario: { 'project.json': raw } });
    const adapter = new LocalCrisisOperationsRuntime(source);
    const location = {
      reference: 'scenario',
      projectId: config.projectId,
      projectVersion: config.projectVersion,
    };
    expect((await adapter.loadProject(location)).graph?.projectId).toBe(config.projectId);
    expect(
      (await adapter.loadProject({ ...location, projectVersion: '9.0.0' })).issues[0]?.code,
    ).toBe('INVALID_CRISIS_PACKAGE');
  });
  it('validates and freezes the actual scenario asset', () => {
    expect(config.template.id).toBe('crisis-operations');
    expect(Object.isFrozen(config.evidence[0])).toBe(true);
    expect(config.bulletins).toHaveLength(4);
  });
  it('rejects duplicate IDs, unknown locations, bad numbers, and unsupported schemas', () => {
    const changes = [
      (c: CrisisConfig) => ({ ...c, schemaVersion: '2.0' }),
      (c: CrisisConfig) => ({ ...c, actions: [{ ...c.actions[0], crews: -1 }] }),
      (c: CrisisConfig) => ({ ...c, evidence: [{ ...c.evidence[0], locationId: 'missing' }] }),
      (c: CrisisConfig) => ({ ...c, roles: [c.roles[0], c.roles[0]] }),
      (c: CrisisConfig) => ({ ...c, evidence: [{ ...c.evidence[0], roleIds: ['missing'] }] }),
      (c: CrisisConfig) => ({ ...c, bulletins: [{ ...c.bulletins[0], risk: 101 }] }),
    ];
    for (const change of changes)
      expect(() => requireCrisisConfig(change(config))).toThrow('INVALID_CRISIS_PACKAGE');
  });
  it('keeps unreleased and specialist reports out of the current station', () => {
    const state = initialCrisisState(config);
    expect(visibleEvidence(config, state).map((e) => e.id)).toEqual(['field-01', 'rumor-01']);
    expect(() => apply(state, 'read', { evidenceId: 'gauge-01' })).toThrow('EVIDENCE_UNAVAILABLE');
    expect(() => apply(state, 'share', { evidenceId: 'rain-02' })).toThrow('EVIDENCE_UNAVAILABLE');
  });
  it('makes intentionally shared specialist evidence available across stations', () => {
    const state = withEvidence(
      apply(initialCrisisState(config), 'role', { roleId: 'earth' }),
      'gauge-01',
    );
    const command = apply(state, 'role', { roleId: 'command' });
    expect(visibleEvidence(config, command).some((e) => e.id === 'gauge-01')).toBe(true);
  });
  it('requires reviewed evidence and enforces the bounded briefing', () => {
    expect(() => apply(initialCrisisState(config), 'share', { evidenceId: 'field-01' })).toThrow(
      'EVIDENCE_NOT_REVIEWED',
    );
    let state = withEvidence();
    state = withEvidence(state, 'rumor-01');
    state = withEvidence(apply(state, 'advance'), 'rain-02');
    state = apply(state, 'read', { evidenceId: 'bridge-02' });
    expect(() => apply(state, 'share', { evidenceId: 'bridge-02' })).toThrow('BRIEFING_FULL');
    expect(
      apply(apply(state, 'unshare', { evidenceId: 'rumor-01' }), 'share', {
        evidenceId: 'bridge-02',
      }).sharedEvidenceIds,
    ).toHaveLength(3);
  });
  it('atomically commits resources and records supporting evidence', () => {
    const before = withEvidence();
    const after = dispatch(before, 'evacuate');
    expect(availableCrews(config, after)).toBe(5);
    expect(after.decisions[0]).toMatchObject({ evidenceIds: ['field-01'], stage: 0, minute: 32 });
    expect(crisisForecast(config, after).risk).toBe(48);
    expect(before.decisions).toHaveLength(0);
  });
  it('rejects unsupported, unsourced, and duplicate orders without spending', () => {
    const state = withEvidence();
    expect(() => apply(state, 'decide', { actionId: 'evacuate', evidenceIds: [] })).toThrow(
      'EVIDENCE_REQUIRED',
    );
    expect(() =>
      apply(state, 'decide', { actionId: 'evacuate', evidenceIds: ['missing'] }),
    ).toThrow('EVIDENCE_REQUIRED');
    expect(() => dispatch(state, 'unknown')).toThrow('INVALID_COMMAND');
    const after = dispatch(state, 'evacuate');
    expect(() => dispatch(after, 'evacuate')).toThrow('already dispatched');
    expect(availableCrews(config, after)).toBe(5);
  });
  it('uses idempotency keys to avoid spending crews twice on retries', () => {
    const state = withEvidence();
    const first = event(
      CRISIS_EVENTS.decide,
      { actionId: 'evacuate', evidenceIds: ['field-01'] },
      { clientEventId: 'retry-1' },
    );
    const after = reduceCrisisEvent(config, state, first);
    expect(reduceCrisisEvent(config, after, { ...first, id: 'different-delivery' })).toBe(after);
  });
  it('rejects overspending across different orders', () => {
    let state = dispatch(
      dispatch(dispatch(withEvidence(), 'evacuate'), 'bridge-close'),
      'shelter-open',
    );
    state = dispatch(apply(state, 'advance'), 'hospital-fuel');
    state = apply(state, 'advance');
    expect(availableCrews(config, state)).toBe(1);
    expect(() => dispatch(state, 'harbor-rescue')).toThrow('Not enough available crews');
  });
  it('releases new evidence, closes the evacuation window, and bounds progression', () => {
    let state = withEvidence();
    expect(() => dispatch(state, 'hospital-fuel')).toThrow('Awaiting field assessment');
    state = apply(apply(state, 'advance'), 'advance');
    expect(visibleEvidence(config, state).some((e) => e.id === 'gauge-03')).toBe(true);
    expect(actionBlockedReason(config, state, config.actions[0])).toBe(
      'Response window has closed',
    );
    expect(() => dispatch(state, 'evacuate')).toThrow('window has closed');
    state = apply(apply(state, 'advance'), 'advance');
    expect(state.stage).toBe(3);
  });
  it('preserves earlier response effects through later bulletins', () => {
    let state = dispatch(withEvidence(), 'evacuate');
    state = apply(apply(state, 'advance'), 'advance');
    expect(crisisForecast(config, state).risk).toBe(71);
    expect(crisisForecast(config, state).protected).toBe(900);
  });
  it('changes later reports according to the earlier response', () => {
    const acted = apply(apply(dispatch(withEvidence(), 'evacuate'), 'advance'), 'advance');
    const waited = apply(apply(withEvidence(), 'advance'), 'advance');
    expect(visibleEvidence(config, acted).some((e) => e.id === 'response-03')).toBe(true);
    expect(visibleEvidence(config, acted).some((e) => e.id === 'waiting-03')).toBe(false);
    expect(visibleEvidence(config, waited).some((e) => e.id === 'waiting-03')).toBe(true);
    expect(visibleEvidence(config, waited).some((e) => e.id === 'response-03')).toBe(false);
  });
  it('rejects foreign-project and unregistered events', () => {
    const state = initialCrisisState(config);
    expect(() =>
      reduceCrisisEvent(
        config,
        state,
        event(CRISIS_EVENTS.advance, {}, { projectId: 'elsewhere' }),
      ),
    ).toThrow('PROJECT_ID_MISMATCH');
    expect(() => reduceCrisisEvent(config, state, event('unknown'))).toThrow(
      'CAPABILITY_NOT_INSTALLED',
    );
  });
  it('supports another scenario identity without engine changes', () => {
    const other = requireCrisisConfig({
      ...raw,
      projectId: 'upland-response',
      title: 'Upland Response',
      crews: 12,
    });
    const state = reduceCrisisEvent(
      other,
      initialCrisisState(other),
      event(CRISIS_EVENTS.advance, {}, { projectId: other.projectId }),
    );
    expect(state.stage).toBe(1);
    expect(availableCrews(other, state)).toBe(12);
  });
  it('validates persisted snapshots and rejects broken resource/evidence state', () => {
    const state = dispatch(withEvidence(), 'evacuate');
    expect(isCrisisState(config, state)).toBe(true);
    expect(isCrisisState(config, { ...state, stage: 99 })).toBe(false);
    expect(isCrisisState(config, { ...state, sharedEvidenceIds: ['unknown'] })).toBe(false);
    expect(
      isCrisisState(config, { ...state, decisions: [state.decisions[0], state.decisions[0]] }),
    ).toBe(false);
    expect(
      isCrisisState(config, { ...state, decisions: [{ ...state.decisions[0], stage: 99 }] }),
    ).toBe(false);
  });
  it('persists by actor, tenant, project version, and attempt', () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (k: string) => values.get(k) ?? null,
      setItem: (k: string, v: string) => values.set(k, v),
    } as Storage;
    const session = createLocalPreviewSession(config.projectId, config.projectVersion, {
      actorId: 'a',
      attemptId: 'one',
    });
    const first = new BrowserCrisisPersistence(config, session, storage);
    first.save(dispatch(withEvidence(), 'evacuate'));
    expect(first.load()?.decisions).toHaveLength(1);
    expect(
      new BrowserCrisisPersistence(config, { ...session, actorId: 'b' }, storage).load(),
    ).toBeUndefined();
    expect(
      new BrowserCrisisPersistence(config, { ...session, tenantId: 'other' }, storage).load(),
    ).toBeUndefined();
    expect(
      new BrowserCrisisPersistence(config, { ...session, attemptId: 'two' }, storage).load(),
    ).toBeUndefined();
  });
});
