import raw from '../../../../public/projects/exploration-time-repair/project.json';
import { createLocalPreviewSession } from '../../core/context/project-session-context';
import { InMemoryProjectPackageSource } from '../../infrastructure/persistence/in-memory-project-package-source';
import { LocalTimeRepairRuntime } from '../../runtime/local-time-repair-runtime';
import {
  applyTimeRepairAction,
  chargesRemaining,
  initialTimeRepairState,
  nodeStatus,
  timelineStability,
} from './domain/time-repair.engine';
import {
  TIME_REPAIR_EVENTS,
  type RepairDefense,
  type TimeRepairAction,
  type TimeRepairConfig,
  type TimeRepairState,
} from './domain/time-repair.models';
import { requireTimeRepairConfig } from './domain/time-repair.validation';
import { BrowserTimeRepairPersistence } from './runtime/time-repair.persistence';

const config = requireTimeRepairConfig(raw);
const session = createLocalPreviewSession(config.projectId, config.projectVersion);
let sequence = 0;
function dispatch(
  state: TimeRepairState,
  action: TimeRepairAction,
  c = config,
  requestId = `request-${++sequence}`,
) {
  return applyTimeRepairAction(c, state, action, {
    id: requestId,
    clientEventId: requestId,
    eventType: TIME_REPAIR_EVENTS[action.type],
    timestamp: '2026-09-13T00:00:00Z',
    tenantId: session.tenantId,
    projectId: c.projectId,
    actor: { type: 'student', id: session.actorId },
  });
}
const claim =
  'The dated record and origin evidence contradict the reported sequence. This event must be restored before interpreting the later consequences.';
function defense(c = config): RepairDefense {
  return {
    category: c.missions[0].evaluation.category,
    answerId: c.missions[0].evaluation.defenseOptionId,
    claim,
    consequence: claim,
    explanation: claim,
  };
}
function prepare(c = config, authorization = true): TimeRepairState {
  let state = initialTimeRepairState(c);
  for (const id of c.missions[0].evidenceRequired) {
    state = dispatch(state, { type: 'collect', evidenceId: id }, c).state;
    state = dispatch(
      state,
      {
        type: 'link',
        missionId: c.missions[0].id,
        link: { evidenceId: id, relationship: 'contradicts', note: claim, confidence: 'confident' },
      },
      c,
    ).state;
  }
  if (authorization)
    state = dispatch(
      state,
      { type: 'defend', missionId: c.missions[0].id, defense: defense(c) },
      c,
    ).state;
  return state;
}
function field(c = config): TimeRepairState {
  let state = dispatch(prepare(c), { type: 'jump', missionId: c.missions[0].id }, c).state;
  return dispatch(
    state,
    {
      type: 'inspect',
      missionId: c.missions[0].id,
      hotspotId: c.missions[0].repair.targetHotspotId,
    },
    c,
  ).state;
}

describe('Time Repair evidence-to-verification capability', () => {
  it('requires connected evidence and a defended conclusion; selecting an answer alone cannot authorize a jump', () => {
    const empty = initialTimeRepairState(config);
    expect(() => dispatch(empty, { type: 'jump', missionId: 'early-cargo' })).toThrow(
      'DEFENSE_REQUIRED',
    );
    const rejected = dispatch(empty, {
      type: 'defend',
      missionId: 'early-cargo',
      defense: defense(),
    }).state;
    expect(rejected.missions['early-cargo'].authorized).toBe(false);
    expect(rejected.missions['early-cargo'].defenses).toHaveLength(1);
    expect(() =>
      dispatch(empty, {
        type: 'link',
        missionId: 'early-cargo',
        link: {
          evidenceId: 'andean-origin',
          relationship: 'contradicts',
          note: claim,
          confidence: 'confident',
        },
      }),
    ).toThrow('EVIDENCE_REQUIRED');
  });
  it('retains revisions and checks evidence relationships, classification, and defense conclusion', () => {
    let state = prepare(config, false);
    state = dispatch(state, {
      type: 'defend',
      missionId: 'early-cargo',
      defense: { ...defense(), answerId: 'exact-arrival' },
    }).state;
    expect(state.missions['early-cargo'].authorized).toBe(false);
    state = dispatch(state, { type: 'defend', missionId: 'early-cargo', defense: defense() }).state;
    expect(state.missions['early-cargo'].defenses.map((d) => d.accepted)).toEqual([false, true]);
    expect(state.missions['early-cargo'].authorized).toBe(true);
    expect(() =>
      dispatch(state, { type: 'repair', missionId: 'early-cargo', optionId: 'quarantine' }),
    ).toThrow('INSPECTION_REQUIRED');
  });
  it('runs the full loop, propagates downstream changes, and records verification separately from the repair', () => {
    let state = field();
    expect(nodeStatus(config, state, 'exchange')).toBe('ripple');
    state = dispatch(state, {
      type: 'repair',
      missionId: 'early-cargo',
      optionId: 'quarantine',
    }).state;
    expect(state.missions['early-cargo'].repaired).toBe(true);
    expect(state.missions['early-cargo'].verification).toBeUndefined();
    expect(nodeStatus(config, state, 'exchange')).toBe('restored');
    expect(nodeStatus(config, state, 'harbor-market')).toBe('verify');
    expect(timelineStability(config, state)).toBe(83);
    expect(chargesRemaining(config, state)).toBe(2);
    expect(() =>
      dispatch(state, {
        type: 'verify',
        missionId: 'early-cargo',
        evidenceId: 'gradual-adoption',
        explanation: claim,
      }),
    ).toThrow('EVIDENCE_REQUIRED');
    state = dispatch(state, {
      type: 'verify',
      missionId: 'early-cargo',
      evidenceId: 'dated-cultivation',
      explanation: claim,
    }).state;
    expect(timelineStability(config, state)).toBe(100);
    expect(nodeStatus(config, state, 'harbor-market')).toBe('restored');
    expect(config.nodes[1].initialStatus).toBe('uncertain');
  });
  it('prevents double spending on retries, charges for errors, and blocks attempts when charges run out', () => {
    let state = field();
    const action: TimeRepairAction = { type: 'repair', missionId: 'early-cargo', optionId: 'keep' };
    state = dispatch(state, action, config, 'same-request').state;
    const duplicate = dispatch(state, action, config, 'same-request').state;
    expect(duplicate).toBe(state);
    expect(chargesRemaining(config, state)).toBe(2);
    expect(timelineStability(config, state)).toBe(30);
    state = dispatch(dispatch(state, action).state, action).state;
    expect(chargesRemaining(config, state)).toBe(0);
    expect(() => dispatch(state, { ...action, optionId: 'quarantine' })).toThrow(
      'INSUFFICIENT_RESOURCE',
    );
    expect(state.missions['early-cargo'].repaired).toBe(false);
  });
  it('rejects repeat successful repairs and premature verification', () => {
    expect(() =>
      dispatch(prepare(), {
        type: 'verify',
        missionId: 'early-cargo',
        evidenceId: 'dated-cultivation',
        explanation: claim,
      }),
    ).toThrow('REPAIR_REQUIRED');
    const action: TimeRepairAction = {
      type: 'repair',
      missionId: 'early-cargo',
      optionId: 'quarantine',
    };
    const state = dispatch(field(), action).state;
    expect(() => dispatch(state, action)).toThrow('ALREADY_REPAIRED');
  });
  it('uses the identical runtime for an original literary scene-sequence content pack', () => {
    const story = { ...structuredClone(raw), evidence: [] as TimeRepairConfig['evidence'] };
    story.projectId = 'letter-out-of-order';
    story.subject = 'literature';
    story.title = 'The Letter Before the Storm';
    story.nodes = [
      {
        id: 'harbor-market',
        title: 'A letter too early',
        dateLabel: 'Scene 1',
        order: 0,
        summary: 'Mara opens the letter before it has been delivered.',
        initialStatus: 'uncertain',
      },
      {
        id: 'exchange',
        title: 'The messenger arrives',
        dateLabel: 'Scene 2',
        order: 1,
        summary: 'A messenger brings a sealed letter.',
        initialStatus: 'uncertain',
      },
      {
        id: 'potato-record',
        title: 'A secret revealed',
        dateLabel: 'Scene 3',
        order: 2,
        summary: 'Mara reads the letter and learns the truth.',
        initialStatus: 'uncertain',
      },
    ];
    story.evidence = [
      {
        id: 'andean-origin',
        title: 'Scene 1',
        kind: 'quotation',
        content: 'Mara watched the empty road. No messenger had yet arrived.',
        citation: 'Original test story, scene 1.',
        perspective: 'Limited narrator follows Mara.',
      },
      {
        id: 'dated-cultivation',
        title: 'Scene 3',
        kind: 'quotation',
        content: 'She broke the seal. Only then did she learn her brother had returned.',
        citation: 'Original test story, scene 3.',
        perspective: 'Mara learns the secret here.',
      },
    ];
    story.missions[0].signal = 'Mara knows the secret before the messenger arrives.';
    story.missions[0].canonicalSummary =
      'Restore reading the letter to scene 3 after its delivery.';
    story.missions[0].repair.capability = 'restore-sequence';
    story.missions[0].repair.options = [
      {
        id: 'quarantine',
        label: 'Move reading to scene 3',
        description: 'Place the reading after delivery.',
        objectLabel: 'Letter restored to scene 3',
      },
    ];
    story.missions[0].ripples = [
      {
        nodeId: 'exchange',
        before: 'Delivery is pointless because Mara already knows.',
        after: 'Delivery enables the later revelation.',
      },
      {
        nodeId: 'potato-record',
        before: 'The revelation repeats knowledge from scene 1.',
        after: 'The letter reveals the secret for the first time.',
      },
    ];
    const c = requireTimeRepairConfig(story);
    let state = dispatch(
      field(c),
      { type: 'repair', missionId: c.missions[0].id, optionId: 'quarantine' },
      c,
    ).state;
    state = dispatch(
      state,
      {
        type: 'verify',
        missionId: c.missions[0].id,
        evidenceId: 'dated-cultivation',
        explanation: claim,
      },
      c,
    ).state;
    expect(timelineStability(c, state)).toBe(100);
    expect(state.missions[c.missions[0].id].verification).toBeDefined();
  });
  it('enforces verified prerequisites and keeps a shared ripple unstable until every origin is repaired', () => {
    const rawPair = structuredClone(raw);
    rawPair.missions[0].stabilityValue = 29;
    const second = structuredClone(rawPair.missions[0]);
    Object.assign(second, {
      id: 'second-repair',
      nodeId: 'atlantic-contact',
      prerequisiteMissionIds: ['early-cargo'],
    });
    rawPair.missions.push(second);
    const c = requireTimeRepairConfig(rawPair);
    let state = initialTimeRepairState(c);
    expect(() =>
      dispatch(state, { type: 'defend', missionId: 'second-repair', defense: defense(c) }, c),
    ).toThrow('PREREQUISITE_REQUIRED');
    state = dispatch(
      field(c),
      { type: 'repair', missionId: 'early-cargo', optionId: 'quarantine' },
      c,
    ).state;
    expect(nodeStatus(c, state, 'exchange')).toBe('ripple');
    state = dispatch(
      state,
      {
        type: 'verify',
        missionId: 'early-cargo',
        evidenceId: 'dated-cultivation',
        explanation: claim,
      },
      c,
    ).state;
    for (const evidenceId of c.missions[1].evidenceRequired)
      state = dispatch(
        state,
        {
          type: 'link',
          missionId: 'second-repair',
          link: { evidenceId, relationship: 'contradicts', note: claim, confidence: 'confident' },
        },
        c,
      ).state;
    state = dispatch(
      state,
      { type: 'defend', missionId: 'second-repair', defense: defense(c) },
      c,
    ).state;
    state = dispatch(state, { type: 'jump', missionId: 'second-repair' }, c).state;
    state = dispatch(
      state,
      { type: 'inspect', missionId: 'second-repair', hotspotId: 'cargo' },
      c,
    ).state;
    state = dispatch(
      state,
      { type: 'repair', missionId: 'second-repair', optionId: 'quarantine' },
      c,
    ).state;
    expect(nodeStatus(c, state, 'exchange')).toBe('restored');
  });
});

describe('Time Repair validation and persistence boundaries', () => {
  it.each([
    [
      'unknown capability',
      (c: typeof raw) => {
        c.missions[0].repair.capability = 'teleport-everything';
      },
    ],
    [
      'missing source',
      (c: typeof raw) => {
        c.missions[0].evidenceRequired.push('missing-source');
      },
    ],
    [
      'duplicate node',
      (c: typeof raw) => {
        c.nodes.push(c.nodes[0]);
      },
    ],
    [
      'backward ripple',
      (c: typeof raw) => {
        c.missions[0].ripples[0].nodeId = c.nodes[0].id;
      },
    ],
    [
      'cyclic prerequisite',
      (c: typeof raw) => {
        Object.assign(c.missions[0], { prerequisiteMissionIds: ['early-cargo'] });
      },
    ],
    [
      'inconsistent stability',
      (c: typeof raw) => {
        c.settings.initialStability = 99;
      },
    ],
    [
      'unsafe image',
      (c: typeof raw) => {
        c.scenes[0].image = 'javascript:alert(1)';
      },
    ],
  ])('rejects %s before runtime', (_label, mutate) => {
    const c = structuredClone(raw);
    mutate(c);
    expect(() => requireTimeRepairConfig(c)).toThrow('INVALID_TIME_REPAIR_PACKAGE');
  });
  it('loads through the shared package contract and rejects a mismatched version', async () => {
    const runtime = new LocalTimeRepairRuntime(
      new InMemoryProjectPackageSource({ test: { 'project.json': raw } }),
    );
    const location = {
      reference: 'test',
      tenantId: 'test',
      projectId: config.projectId,
      projectVersion: config.projectVersion,
    };
    expect((await runtime.loadProject(location)).graph?.template.id).toBe('time-repair');
    expect(
      (await runtime.loadProject({ ...location, projectVersion: '2.0.0' })).issues[0].message,
    ).toContain('PROJECT_ID_MISMATCH');
  });
  it('restores the full event history, isolates sessions, rejects tampering, and detects a stale write', () => {
    localStorage.clear();
    const persistence = new BrowserTimeRepairPersistence(config, session, localStorage);
    const state = field();
    persistence.save(state, 0);
    expect(persistence.load()).toEqual(state);
    const other = new BrowserTimeRepairPersistence(
      config,
      { ...session, actorId: 'other' },
      localStorage,
    );
    expect(other.load()).toBeUndefined();
    const repaired = dispatch(state, {
      type: 'repair',
      missionId: 'early-cargo',
      optionId: 'quarantine',
    }).state;
    persistence.save(repaired, state.version);
    expect(() => persistence.save(state, state.version)).toThrow('STATE_CONFLICT');
    const key = localStorage.key(0)!;
    const saved = JSON.parse(localStorage.getItem(key)!);
    saved.state.missions['early-cargo'].verification = {
      explanation: claim,
      evidenceId: 'dated-cultivation',
    };
    localStorage.setItem(key, JSON.stringify(saved));
    expect(persistence.load()).toBeUndefined();
    localStorage.clear();
  });
});
