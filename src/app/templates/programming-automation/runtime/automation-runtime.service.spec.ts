import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { robotDeliveryConfig as config } from '../../../projects/robot-delivery/robot-delivery.config';
import {
  createRobotSampleState,
  robotSampleStudent,
} from '../../../projects/robot-delivery/robot-delivery.sample';
import { initialAutomationState } from '../core/automation-state';
import type { AutomationState } from '../domain/automation.models';
import {
  AUTOMATION_PERSISTENCE,
  BrowserAutomationPersistence,
  isAutomationState,
} from '../persistence/automation.persistence';
import { AUTOMATION_CONFIG, AUTOMATION_SAMPLE, AUTOMATION_SESSION } from './automation.tokens';
import { AutomationRuntimeService } from './automation-runtime.service';
function readyState(): AutomationState {
  const state = createRobotSampleState();
  return {
    ...state,
    versions: [],
    trials: state.trials.filter((t) => t.mode === 'practice'),
    drafts: {
      ...state.drafts,
      championship: { ...state.drafts['championship'], lockedVersionId: undefined },
    },
    championship: {
      ...state.championship,
      finalized: false,
      paused: false,
      practiceOpen: true,
      practiceLimit: 0,
      queue: [],
    },
  };
}
function setup(state = initialAutomationState(config), sample = false, student = false) {
  let saved: AutomationState | undefined = structuredClone(state);
  const session = createLocalPreviewSession(config.projectId, config.projectVersion, {
    actorId: robotSampleStudent.id,
    mode: student ? 'student' : 'preview',
  });
  TestBed.configureTestingModule({
    providers: [
      AutomationRuntimeService,
      { provide: AUTOMATION_CONFIG, useValue: config },
      { provide: AUTOMATION_SESSION, useValue: session },
      { provide: AUTOMATION_SAMPLE, useValue: sample },
      {
        provide: AUTOMATION_PERSISTENCE,
        useValue: {
          load: () => structuredClone(saved),
          save: (state: AutomationState) => {
            saved = structuredClone(state);
          },
        },
      },
    ],
  });
  return { runtime: TestBed.inject(AutomationRuntimeService), saved: () => saved };
}
describe('Automation runtime evidence and championship', () => {
  afterEach(() => TestBed.resetTestingModule());
  it('starts in Precision Parking with an empty student program and saves edits', () => {
    const { runtime, saved } = setup();
    expect(runtime.challenge().id).toBe('precision-parking');
    expect(runtime.draft().program.commands).toEqual([]);
    runtime.addCommand('move-rotations');
    runtime.editCommand(runtime.selectedCommandId(), { value: '5' });
    runtime.runPractice();
    runtime.flush();
    expect(saved()?.trials[0].completedMission).toBe(true);
    expect(saved()?.drafts['precision-parking'].program.commands[0].value).toBe('5');
  });
  it('locks an immutable tested version, preserves it after unlock, and requires a new successful test after editing', () => {
    const { runtime } = setup(readyState());
    expect(runtime.readiness()).toEqual([]);
    expect(runtime.lockProgram()).toBe(true);
    const locked = structuredClone(runtime.state().versions[0]);
    runtime.updateVariables([]);
    expect(runtime.draft().program).toEqual(locked.program);
    const official = runtime.launchNext()!;
    expect(official.completedMission).toBe(true);
    runtime.unlock(locked.id, 'Revise return distance after review.');
    expect(runtime.standings()).toHaveLength(0);
    const variable = runtime.draft().program.variables[0];
    runtime.updateVariables([
      { ...variable, value: '45' },
      ...runtime.draft().program.variables.slice(1),
    ]);
    expect(runtime.state().versions[0]).toEqual(locked);
    expect(official.version).toEqual(locked);
    expect(runtime.readiness()).toContain('Complete a successful practice run with this version.');
  });
  it('reruns a technically invalid result with the same locked code and preserves the original', () => {
    const { runtime } = setup(readyState());
    runtime.lockProgram();
    const first = runtime.launchNext()!;
    runtime.technicalRerun(first.id, '');
    expect(runtime.launchNext()).toBeUndefined();
    runtime.technicalRerun(first.id, 'Presentation playback was interrupted.');
    const rerun = runtime.launchNext()!;
    expect(rerun.id).not.toBe(first.id);
    expect(rerun.version).toEqual(first.version);
    expect(rerun.distanceCm).toBe(first.distanceCm);
    expect(
      runtime.state().trials.find((t) => t.id === first.id)?.technicalInvalidReason,
    ).toBeTruthy();
    expect(runtime.standings()).toHaveLength(1);
  });
  it('enforces teacher permission, practice limits, and finalized results in runtime actions', () => {
    const { runtime } = setup(readyState(), false, true);
    runtime.control({ practiceOpen: false });
    expect(runtime.state().championship.practiceOpen).toBe(true);
    runtime.lockProgram();
    expect(runtime.launchNext()).toBeUndefined();
    runtime.unlock(runtime.draft().lockedVersionId!, 'I want to change my program.');
    expect(runtime.draft().lockedVersionId).toBeDefined();
  });
  it('closes edits and launches when a rehearsal is finalized', () => {
    const { runtime } = setup(readyState());
    runtime.lockProgram();
    runtime.launchNext();
    runtime.control({ finalized: true, practiceOpen: false, paused: true });
    runtime.control({ finalized: false });
    expect(runtime.state().championship.finalized).toBe(true);
    runtime.unlock(runtime.draft().lockedVersionId!, 'Reopen after finalization.');
    expect(runtime.canEdit()).toBe(false);
    expect(runtime.runPractice()).toBeUndefined();
    expect(runtime.launchNext()).toBeUndefined();
  });
  it('isolates completed example viewing from saved evidence', () => {
    const original = createRobotSampleState();
    const { runtime, saved } = setup(original, true);
    runtime.addCommand('wait');
    runtime.updateCalibration('defense', 'Changed');
    runtime.control({ practiceOpen: true });
    expect(runtime.runPractice()).toBeUndefined();
    runtime.selectChallenge('precision-parking');
    runtime.flush();
    expect(saved()).toEqual(original);
  });
  it('rejects malformed stored programs before they reach the editor', () => {
    const state = initialAutomationState(config);
    expect(isAutomationState(state)).toBe(true);
    expect(
      isAutomationState({ ...state, drafts: { 'precision-parking': { program: null } } }),
    ).toBe(false);
    expect(isAutomationState({ ...state, selectedChallengeId: 'missing' })).toBe(false);
  });
});
describe('Automation scoped browser persistence', () => {
  it('separates students and detects an edit from another tab', () => {
    const memory = new Map<string, string>();
    const storage = {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value);
      },
    } as Storage;
    const session = createLocalPreviewSession(config.projectId, config.projectVersion);
    const a = new BrowserAutomationPersistence(session, storage),
      b = new BrowserAutomationPersistence(session, storage),
      other = new BrowserAutomationPersistence({ ...session, actorId: 'other-student' }, storage);
    a.load();
    b.load();
    a.save({ ...initialAutomationState(config), revision: 1 });
    expect(other.load()).toBeUndefined();
    expect(() => b.save({ ...initialAutomationState(config), revision: 1 })).toThrow('another tab');
    expect(a.load()?.revision).toBe(1);
  });
});
