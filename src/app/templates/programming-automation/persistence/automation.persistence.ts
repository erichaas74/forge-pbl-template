import { InjectionToken } from '@angular/core';
import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import { safeBrowserStorage, ScopedBrowserStore } from '../../../shared/persistence';
import type { AutomationState } from '../domain/automation.models';
export interface AutomationPersistence {
  load(): AutomationState | undefined;
  save(state: AutomationState): void;
}
export const AUTOMATION_PERSISTENCE = new InjectionToken<AutomationPersistence>(
  'AUTOMATION_PERSISTENCE',
);
export function isAutomationState(value: unknown): value is AutomationState {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  if (!(
    item['schemaVersion'] === '1.0' &&
    typeof item['projectId'] === 'string' &&
    typeof item['projectVersion'] === 'string' &&
    typeof item['selectedChallengeId'] === 'string' &&
    Number.isInteger(item['revision']) &&
    !!item['drafts'] &&
    typeof item['drafts'] === 'object' &&
    ['math', 'trials', 'versions', 'audit'].every((key) => Array.isArray(item[key])) &&
    !!item['championship'] &&
    typeof item['championship'] === 'object'
  ))
    return false;
  const record = (v: unknown): v is Record<string, unknown> =>
    !!v && typeof v === 'object' && !Array.isArray(v);
  const strings = (v: Record<string, unknown>, keys: string[]) =>
    keys.every((key) => typeof v[key] === 'string');
  const commands = (v: unknown, depth = 0): boolean =>
    depth <= 4 &&
    Array.isArray(v) &&
    v.length <= 100 &&
    v.every(
      (c) =>
        record(c) &&
        strings(c, ['id', 'type', 'value']) &&
        [
          'move-distance',
          'move-rotations',
          'turn-degrees',
          'turn-fraction',
          'wait',
          'pick-up',
          'drop-off',
          'repeat',
        ].includes(c['type'] as string) &&
        (c['commands'] === undefined || commands(c['commands'], depth + 1)),
    );
  const program = (v: unknown): boolean =>
    record(v) &&
    typeof v['id'] === 'string' &&
    Number.isInteger(v['version']) &&
    commands(v['commands']) &&
    Array.isArray(v['variables']) &&
    v['variables'].every(
      (variable) => record(variable) && strings(variable, ['id', 'name', 'value', 'unit']),
    );
  const prediction = (v: unknown): boolean =>
    record(v) && strings(v, ['route', 'distance', 'turns', 'seconds', 'battery']);
  const math = (v: unknown): boolean =>
    Array.isArray(v) &&
    v.every(
      (e) =>
        record(e) &&
        strings(e, ['id', 'studentId', 'tool', 'unit', 'explanation', 'status', 'timestamp']) &&
        Number.isFinite(e['answer']) &&
        Number.isFinite(e['expected']) &&
        Array.isArray(e['inputs']) &&
        e['inputs'].every(Number.isFinite),
    );
  const version = (v: unknown): boolean =>
    record(v) &&
    strings(v, ['id', 'ownerId', 'ownerName', 'challengeId', 'createdAt']) &&
    Number.isInteger(v['targetIndex']) &&
    program(v['program']) &&
    prediction(v['prediction']) &&
    math(v['math']) &&
    record(v['course']) &&
    Array.isArray(v['course']['targets']) &&
    Array.isArray(v['course']['packages']) &&
    Array.isArray(v['course']['obstacles']) &&
    record(v['robot']);
  const championship = item['championship'] as Record<string, unknown>;
  return (
    strings(item, [
      'measuredDistancePerRotation',
      'measuredTurnRate',
      'measurementExplanation',
      'defense',
    ]) &&
    record(item['drafts']) &&
    Object.hasOwn(item['drafts'], item['selectedChallengeId'] as string) &&
    Object.values(item['drafts']).every(
      (d) =>
        record(d) &&
        program(d['program']) &&
        prediction(d['prediction']) &&
        strings(d, ['diagnosis', 'reflection']) &&
        Number.isInteger(d['targetIndex']),
    ) &&
    math(item['math']) &&
    (item['versions'] as unknown[]).every(version) &&
    (item['trials'] as unknown[]).every(
      (t) =>
        record(t) &&
        strings(t, ['id', 'challengeId', 'createdAt', 'mode', 'stoppedReason']) &&
        version(t['version']) &&
        typeof t['completedMission'] === 'boolean' &&
        [
          'elapsedSeconds',
          'distanceCm',
          'totalTurnDegrees',
          'collisions',
          'deliveriesCompleted',
          'batteryUsed',
          'stoppingErrorCm',
          'commandCount',
          'score',
        ].every((k) => Number.isFinite(t[k])) &&
        Array.isArray(t['events']) &&
        t['events'].every(
          (e) => record(e) && strings(e, ['commandId', 'message']) && Number.isFinite(e['timeMs']),
        ) &&
        Array.isArray(t['pathSamples']) &&
        t['pathSamples'].every(
          (p) =>
            record(p) &&
            ['timeMs', 'xCm', 'yCm', 'headingDeg', 'batteryUsed'].every((k) =>
              Number.isFinite(p[k]),
            ) &&
            typeof p['activeCommandId'] === 'string' &&
            Array.isArray(p['carryingPackageIds']) &&
            Array.isArray(p['deliveredPackageIds']),
        ),
    ) &&
    ['revealed', 'practiceOpen', 'paused', 'showStandings', 'finalized'].every(
      (k) => typeof championship[k] === 'boolean',
    ) &&
    Number.isInteger(championship['practiceLimit']) &&
    Array.isArray(championship['queue']) &&
    championship['queue'].every((id) => typeof id === 'string') &&
    (item['audit'] as unknown[]).every(
      (e) => record(e) && strings(e, ['id', 'action', 'reason', 'timestamp']),
    )
  );
}
export class BrowserAutomationPersistence implements AutomationPersistence {
  private readonly store: ScopedBrowserStore<AutomationState>;
  private savedRevision: number | undefined;
  constructor(
    private readonly session: ProjectSessionContext,
    private readonly storage = safeBrowserStorage(),
  ) {
    this.store = new ScopedBrowserStore<AutomationState>(
      'programming-automation',
      this.storage,
      isAutomationState,
    );
  }
  load(): AutomationState | undefined {
    const state = this.store.load(this.session);
    this.savedRevision = state?.revision;
    return state;
  }
  save(state: AutomationState): void {
    if (!this.storage) throw new Error('Browser storage unavailable.');
    if (this.store.load(this.session)?.revision !== this.savedRevision)
      throw new Error('This draft changed in another tab. Export your work before reloading.');
    this.store.save(this.session, state);
    this.savedRevision = state.revision;
  }
}
