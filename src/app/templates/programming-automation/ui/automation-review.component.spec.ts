import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
vi.mock('phaser', () => ({}));
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { robotDeliveryConfig as config } from '../../../projects/robot-delivery/robot-delivery.config';
import {
  createRobotSampleState,
  robotSampleStudent,
} from '../../../projects/robot-delivery/robot-delivery.sample';
import { initialAutomationState } from '../core/automation-state';
import type { AutomationState } from '../domain/automation.models';
import { AUTOMATION_PERSISTENCE } from '../persistence/automation.persistence';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import {
  AUTOMATION_CONFIG,
  AUTOMATION_SAMPLE,
  AUTOMATION_SESSION,
} from '../runtime/automation.tokens';
import { AutomationEvidenceComponent } from './automation-evidence.component';
import { ChampionshipPanelComponent } from './championship-panel.component';
import { MathWorkbenchComponent } from './math-workbench.component';
import { RobotCourseComponent } from './robot-course.component';

function readyState(): AutomationState {
  const state = createRobotSampleState();
  return {
    ...state,
    versions: [],
    trials: state.trials.filter((t) => t.mode === 'practice'),
    drafts: {
      ...state.drafts,
      championship: {
        ...state.drafts['championship'],
        lockedVersionId: undefined,
        completedAt: undefined,
      },
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
  TestBed.configureTestingModule({
    providers: [
      AutomationRuntimeService,
      { provide: AUTOMATION_CONFIG, useValue: config },
      { provide: AUTOMATION_SAMPLE, useValue: sample },
      {
        provide: AUTOMATION_SESSION,
        useValue: createLocalPreviewSession(config.projectId, config.projectVersion, {
          actorId: robotSampleStudent.id,
          mode: student ? 'student' : 'preview',
        }),
      },
      {
        provide: AUTOMATION_PERSISTENCE,
        useValue: { load: () => structuredClone(state), save: () => {} },
      },
    ],
  });
  return TestBed.inject(AutomationRuntimeService);
}
function click(root: HTMLElement, text: string) {
  const button = Array.from(root.querySelectorAll<HTMLButtonElement>('button')).find(
    (b) => b.textContent?.trim() === text,
  );
  expect(button, text).toBeDefined();
  button!.click();
}
function fill(root: HTMLElement, selector: string, value: string) {
  const field = root.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)!;
  field.value = value;
  field.dispatchEvent(new Event('input'));
}

describe('focused robot review and final preparation', () => {
  const scroll = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollIntoView');
  beforeAll(() =>
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn(),
    }),
  );
  afterAll(() => {
    if (scroll) Object.defineProperty(Element.prototype, 'scrollIntoView', scroll);
    else Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
  });
  afterEach(() => TestBed.resetTestingModule());

  it('uses an immutable run beside the response and saves a mission only after explicit review', () => {
    const runtime = setup(readyState());
    runtime.selectChallenge('precision-parking');
    runtime.updateDraft({ completedAt: undefined, reflection: '' });
    runtime.runPractice();
    const fixture = TestBed.createComponent(AutomationEvidenceComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    const original = structuredClone(runtime.currentTrials());
    const course = fixture.debugElement.query(By.directive(RobotCourseComponent))
      .componentInstance as RobotCourseComponent;
    expect(course.result()).toBe(fixture.componentInstance.shownTrial());
    expect(root.querySelector('.question-card')?.textContent).toContain(
      'What changed between your runs?',
    );
    expect(root.querySelector('.question-card')?.textContent).not.toContain(
      'Save completed mission',
    );
    fill(
      root,
      '[aria-label="Trial comparison explanation"]',
      'The second run stopped closer because I adjusted the rotation count.',
    );
    fixture.detectChanges();
    click(root, 'Review mission');
    fixture.detectChanges();
    expect(runtime.draft().completedAt).toBeUndefined();
    click(root, 'Back');
    fixture.detectChanges();
    expect(
      root.querySelector<HTMLTextAreaElement>('[aria-label="Trial comparison explanation"]')!.value,
    ).toContain('second run');
    click(root, 'Review mission');
    fixture.detectChanges();
    click(root, 'Save completed mission');
    fixture.detectChanges();
    expect(runtime.draft().completedAt).toBeDefined();
    expect(root.querySelector('.question-card h2')?.textContent).toContain('Mission saved');
    expect(runtime.currentTrials()).toEqual(original);
  });

  it('keeps the finished example read-only with collected evidence available', () => {
    const runtime = setup(createRobotSampleState(), true);
    const fixture = TestBed.createComponent(AutomationEvidenceComponent);
    fixture.componentRef.setInput('view', 'portfolio');
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    const defense = runtime.state().defense;
    expect(
      root.querySelector<HTMLTextAreaElement>('[aria-label="Final engineering defense"]')!.disabled,
    ).toBe(true);
    fill(root, '[aria-label="Final engineering defense"]', 'Attempted overwrite');
    expect(runtime.state().defense).toBe(defense);
    expect(root.querySelector('app-robot-course')).not.toBeNull();
    expect(root.textContent).toContain('Your collected evidence');
    expect(root.querySelector('.mastery')).not.toBeNull();
  });

  it('does not reveal the final course or teacher controls for a student who has not reached it', () => {
    const runtime = setup(initialAutomationState(config), false, true);
    runtime.setTarget(2);
    const fixture = TestBed.createComponent(ChampionshipPanelComponent);
    fixture.detectChanges();
    const before = structuredClone(runtime.state());
    expect(fixture.componentInstance.shownCourse()).toBe(runtime.course());
    expect(
      fixture.debugElement
        .query(By.directive(RobotCourseComponent))
        .componentInstance.targetIndex(),
    ).toBe(2);
    expect(fixture.nativeElement.textContent).not.toContain('Teacher tools');
    expect(fixture.nativeElement.querySelector('[aria-label="Planned route"]')).toBeNull();
    fixture.componentInstance.begin();
    fixture.detectChanges();
    expect(runtime.state()).toEqual(before);
    expect(runtime.isChampionship()).toBe(false);
  });

  it('asks for one prediction at a time and requires a separate confirmation to lock ready evidence', async () => {
    const runtime = setup(readyState());
    const fixture = TestBed.createComponent(ChampionshipPanelComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    const prediction = { ...runtime.draft().prediction };
    click(root, 'Edit predictions');
    fixture.detectChanges();
    expect(root.querySelectorAll('.question-card textarea')).toHaveLength(1);
    expect(root.querySelectorAll('.question-card input')).toHaveLength(0);
    click(root, 'Continue');
    fixture.detectChanges();
    expect(root.querySelectorAll('.question-card input')).toHaveLength(1);
    const distance = root.querySelector<HTMLInputElement>('[aria-label="Distance (cm)"]')!;
    const originalDistance = distance.value;
    fill(root, '[aria-label="Distance (cm)"]', '-1');
    fixture.detectChanges();
    expect(
      Array.from(root.querySelectorAll<HTMLButtonElement>('.question-card button')).find(
        (b) => b.textContent?.trim() === 'Continue',
      )!.disabled,
    ).toBe(true);
    fill(root, '[aria-label="Distance (cm)"]', originalDistance);
    fixture.detectChanges();
    click(root, 'Back');
    fixture.detectChanges();
    expect(root.querySelector<HTMLTextAreaElement>('[aria-label="Planned route"]')!.value).toBe(
      prediction.route,
    );
    for (let i = 0; i < 5; i++) {
      click(root, 'Continue');
      fixture.detectChanges();
    }
    expect(runtime.draft().lockedVersionId).toBeUndefined();
    const dialog = root.querySelector<HTMLDialogElement>('#robot-lock-title')!.closest('dialog')!;
    dialog.showModal = () => {
      dialog.open = true;
    };
    dialog.close = () => {
      dialog.open = false;
    };
    click(root, 'Review & lock program');
    fixture.detectChanges();
    expect(dialog.open).toBe(true);
    expect(runtime.draft().lockedVersionId).toBeUndefined();
    click(root, 'Keep editing');
    fixture.detectChanges();
    expect(runtime.draft().lockedVersionId).toBeUndefined();
    click(root, 'Review & lock program');
    click(root, 'Confirm lock');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(runtime.draft().lockedVersionId).toBeDefined();
    expect(runtime.state().championship.queue).toHaveLength(1);
    expect(document.activeElement).toBe(root.querySelector('.question-card h2'));
  });

  it('preserves each calibration measurement when moving between questions', () => {
    const runtime = setup();
    const fixture = TestBed.createComponent(MathWorkbenchComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    fill(root, '[aria-label="Measured distance per rotation"]', '24');
    fixture.componentInstance.goCalibration(1);
    fixture.detectChanges();
    expect(root.querySelector('[aria-label="Measured distance per rotation"]')).toBeNull();
    fill(root, '[aria-label="Measured turn rate"]', '45');
    fixture.componentInstance.goCalibration(2);
    fixture.detectChanges();
    fill(
      root,
      '[aria-label="Measurement explanation"]',
      'The model uses a measured travel distance.',
    );
    fixture.componentInstance.goCalibration(0);
    fixture.detectChanges();
    expect(
      root.querySelector<HTMLInputElement>('[aria-label="Measured distance per rotation"]')!.value,
    ).toBe('24');
    expect(runtime.state().measuredTurnRate).toBe('45');
    expect(runtime.state().measurementExplanation).toContain('measured travel');
    expect(runtime.state().math).toHaveLength(0);
  });
});
