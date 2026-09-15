import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('phaser', () => ({}));
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { robotDeliveryConfig as config } from '../../../projects/robot-delivery/robot-delivery.config';
import { PROJECT_LESSON_FOCUS } from '../../../shared/project-lessons/project-lesson-focus';
import type { ProjectLesson } from '../../../shared/project-lessons/project-lesson.models';
import { initialAutomationState, validateAutomationConfig } from '../core/automation-state';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import { AUTOMATION_CONFIG, AUTOMATION_SESSION } from '../runtime/automation.tokens';
import { AUTOMATION_PERSISTENCE } from '../persistence/automation.persistence';
import { AutomationLabComponent } from './automation-lab.component';
import { AutomationWeekWorkspaceComponent } from './automation-week-workspace.component';
import { By } from '@angular/platform-browser';

function lesson(number: number): ProjectLesson {
  return {
    number,
    title: 'Test session',
    output: 'Proposed product',
    workspace: 'Course',
    checkpoint: 'Question',
    criteria: ['Reasoning'],
    focusTarget: 'workspace',
  };
}
async function setup(number = 1, locked = false, student = false) {
  const focus = signal<ProjectLesson | undefined>(lesson(number));
  const state = initialAutomationState(config);
  if (locked) {
    state.drafts = {
      ...state.drafts,
      championship: { ...state.drafts['championship'], lockedVersionId: 'previous-version' },
    };
    state.championship = {
      ...state.championship,
      finalized: true,
      revealed: false,
      practiceOpen: false,
      practiceLimit: 1,
    };
  }
  await TestBed.configureTestingModule({
    imports: [AutomationLabComponent],
    providers: [
      AutomationRuntimeService,
      { provide: AUTOMATION_CONFIG, useValue: config },
      {
        provide: AUTOMATION_SESSION,
        useValue: createLocalPreviewSession(config.projectId, config.projectVersion, {
          mode: student ? 'student' : 'preview',
        }),
      },
      { provide: AUTOMATION_PERSISTENCE, useValue: { load: () => state, save: vi.fn() } },
      { provide: PROJECT_LESSON_FOCUS, useValue: focus },
    ],
  }).compileComponents();
  const fixture = TestBed.createComponent(AutomationLabComponent);
  fixture.detectChanges();
  return {
    fixture,
    focus,
    runtime: TestBed.inject(AutomationRuntimeService),
    root: fixture.nativeElement as HTMLElement,
    workspace: fixture.debugElement.query(By.directive(AutomationWeekWorkspaceComponent))
      ?.componentInstance as AutomationWeekWorkspaceComponent | undefined,
  };
}
describe('Robot weekly authoring workspace', () => {
  afterEach(() => TestBed.resetTestingModule());
  it('opens eight distinct courses from lesson navigation without forms or completion records', async () => {
    const { fixture, focus, runtime, root, workspace } = await setup();
    const courses = new Set<string>();
    for (let number = 1; number <= 8; number++) {
      focus.set(lesson(number));
      fixture.detectChanges();
      const week = config.previewWeeks![Math.floor((number - 1) / 2)];
      expect(runtime.challenge().id).toBe(week.sessions[(number - 1) % 2].challengeId);
      expect(root.textContent).toContain(week.title);
      expect(root.textContent).toContain(week.questions[0]);
      expect(
        root.querySelector(
          'textarea, app-math-workbench, app-automation-evidence, app-championship-panel',
        ),
      ).toBeNull();
      courses.add(runtime.course().id);
      expect(runtime.draft().program.commands.length).toBeGreaterThan(0);
      expect(runtime.compiled().issues.filter((issue) => issue.severity === 'error')).toEqual([]);
    }
    expect(courses.size).toBe(8);
    expect(workspace?.selectedLesson()).toBe(8);
    expect(Object.values(runtime.state().drafts).some((draft) => draft.completedAt)).toBe(false);
    expect(runtime.state().math).toEqual([]);
  });
  it('preserves code and deliberate empty drafts across sessions', async () => {
    const { fixture, focus, runtime } = await setup(3);
    runtime.editCommand('first-side', { value: 'SIDE / 2' });
    focus.set(lesson(5));
    fixture.detectChanges();
    focus.set(lesson(3));
    fixture.detectChanges();
    expect(runtime.draft().program.commands[0].value).toBe('SIDE / 2');
    runtime.setCommands([]);
    focus.set(lesson(4));
    fixture.detectChanges();
    focus.set(lesson(3));
    fixture.detectChanges();
    expect(runtime.draft().program.commands).toEqual([]);
  });
  it('opens a fresh final directly and permits repeat trials despite saved assessment locks', async () => {
    const { fixture, runtime, workspace, root } = await setup(8, true);
    expect(runtime.challenge().id).toBe('championship');
    expect(runtime.canEdit()).toBe(true);
    workspace!.run();
    workspace!.replay.pause();
    fixture.detectChanges();
    expect(runtime.currentTrials()).toHaveLength(1);
    expect(root.textContent).toContain('Recorded code');
    expect(root.querySelector<HTMLInputElement>('app-command-editor input')?.disabled).toBe(true);
    workspace!.edit();
    workspace!.run();
    workspace!.replay.pause();
    fixture.detectChanges();
    expect(runtime.currentTrials()).toHaveLength(2);
    expect(runtime.draft().completedAt).toBeUndefined();
    expect(runtime.state().versions).toHaveLength(0);
    expect(runtime.state().championship.finalized).toBe(true);
  });
  it('does not apply preview access to an assessed student session', async () => {
    const { runtime, workspace } = await setup(1, false, true);
    expect(workspace).toBeUndefined();
    expect(runtime.testingWorkspace).toBe(false);
    runtime.selectChallenge('championship');
    expect(runtime.challenge().id).not.toBe('championship');
  });
  it('rejects missing courses and non-runnable sample programs in preview configuration', () => {
    const weeks = structuredClone(config.previewWeeks!);
    weeks[0].sessions[0].challengeId = 'missing';
    expect(() => validateAutomationConfig({ ...config, previewWeeks: weeks })).toThrow(
      'CONFIG_INVALID',
    );
    const broken = structuredClone(config.previewWeeks!);
    broken[1].sessions[0].starterCommands = [
      { id: 'bad', type: 'move-distance', value: 'UNKNOWN' },
    ];
    expect(() => validateAutomationConfig({ ...config, previewWeeks: broken })).toThrow(
      'CONFIG_INVALID',
    );
  });
});
