import { TestBed } from '@angular/core/testing';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
// jsdom cannot initialize Phaser's canvas probes. Browser verification covers the real renderer.
vi.mock('phaser', () => ({}));
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { robotDeliveryConfig } from '../../../projects/robot-delivery/robot-delivery.config';
// Preserve coverage of the legacy assessed workspace and finished examples.
// The authoring workspace has its own session-navigation and full-access tests.
const config = { ...robotDeliveryConfig, previewWeeks: undefined };
import { AutomationLabComponent } from './automation-lab.component';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import { AUTOMATION_CONFIG, AUTOMATION_SESSION } from '../runtime/automation.tokens';
import { AUTOMATION_PERSISTENCE } from '../persistence/automation.persistence';
import { loadSample } from '../../../runtime/project-showcase/automation.sample';
import { By } from '@angular/platform-browser';
import { MathWorkbenchComponent } from './math-workbench.component';
import { CommandEditorComponent } from './command-editor.component';
describe('Robot lab student workspace', () => {
  const scrollDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollIntoView');
  beforeAll(() =>
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn(),
    }),
  );
  afterAll(() => {
    if (scrollDescriptor)
      Object.defineProperty(Element.prototype, 'scrollIntoView', scrollDescriptor);
    else Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
  });
  afterEach(() => TestBed.resetTestingModule());
  it('renders a fresh course and lets students edit commands without revealing calculation answers', async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationLabComponent],
      providers: [
        AutomationRuntimeService,
        { provide: AUTOMATION_CONFIG, useValue: config },
        {
          provide: AUTOMATION_SESSION,
          useValue: createLocalPreviewSession(config.projectId, config.projectVersion),
        },
        { provide: AUTOMATION_PERSISTENCE, useValue: { load: () => undefined, save: () => {} } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AutomationLabComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Precision parking bay');
    expect(fixture.nativeElement.textContent).not.toContain('Expected:');
    expect(fixture.nativeElement.querySelector('#robot-mission').value).toBe('precision-parking');
    expect(fixture.nativeElement.querySelector('[aria-label="Math calculation"]')).toBeNull();
    expect(fixture.nativeElement.textContent).not.toContain('Link a calculation');
    const runtime = TestBed.inject(AutomationRuntimeService);
    expect(
      fixture.nativeElement.querySelector('[aria-label="Move rotations your number"]').value,
    ).toBe('1');
    const root: HTMLElement = fixture.nativeElement;
    const guide = root.querySelector<HTMLDialogElement>('app-task-guide dialog')!;
    // jsdom does not implement native dialogs; browser checks cover focus and Escape.
    guide.showModal = () => {
      guide.open = true;
    };
    guide.close = () => {
      guide.open = false;
    };
    root.querySelector<HTMLButtonElement>('app-task-guide .guide-trigger')!.click();
    expect(guide.open).toBe(true);
    expect(guide.textContent).toContain(
      config.challenges.find((challenge) => challenge.id === 'precision-parking')!.mission,
    );
    expect(guide.querySelector('app-command-graphic')).not.toBeNull();
    expect(runtime.reasoningOpened()).toBe(false);
    guide.querySelector<HTMLButtonElement>('[aria-label="Close guide"]')!.click();
    expect(guide.open).toBe(false);
    const view = root.querySelector<HTMLSelectElement>('[aria-label="Lab section"]')!;
    view.value = 'evidence';
    view.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(root.querySelector('app-automation-evidence')).not.toBeNull();
    view.value = 'workspace';
    view.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(root.querySelectorAll('h1')).toHaveLength(1);
    expect(
      root.querySelector<HTMLInputElement>('[aria-label="Move rotations your number"]')!.value,
    ).toBe('1');
    fixture.componentInstance.run();
    fixture.componentInstance.replay.pause();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Where does the robot stop?');
    expect(fixture.nativeElement.querySelector('app-math-workbench')).toBeNull();
    expect(runtime.reasoningOpened()).toBe(false);
    fixture.componentInstance.replay.seek(fixture.componentInstance.replay.duration());
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Explain what happened');
    expect(fixture.nativeElement.querySelector('app-math-workbench')).toBeNull();
    fixture.componentInstance.openReasoning();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[aria-label="Math calculation"]').value).toBe(
      'distance-rotations',
    );
    expect(fixture.nativeElement.querySelector('[aria-label="Your math answer"]').value).toBe('');
    const math: MathWorkbenchComponent = fixture.debugElement.query(
      By.directive(MathWorkbenchComponent),
    ).componentInstance;
    math.setValue(0, '120');
    math.setValue(1, '24');
    math.answer.set('4');
    math.explanation.set('My estimate used the distance.');
    math.check();
    fixture.detectChanges();
    expect(math.result()?.status).toBe('needs-revision');
    expect(fixture.nativeElement.textContent).not.toContain('Expected:');
    expect(fixture.nativeElement.textContent).toContain('Check which quantities');
    fixture.componentInstance.choose('variable-upgrade');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-math-workbench')).toBeNull();
    expect(runtime.draft().program.commands).toEqual([]);
    runtime.addCommand('move-distance');
    runtime.addCommand('wait');
    fixture.detectChanges();
    const down: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[aria-label="Move command down"]',
    );
    down.click();
    fixture.detectChanges();
    expect(runtime.draft().program.commands[0].type).toBe('wait');
    // Phaser is the default; the explicit accessible map remains available.
    const map = Array.from(
      root.querySelectorAll<HTMLButtonElement>('app-robot-course button'),
    ).find((button) => button.textContent?.trim() === 'Map view')!;
    map.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('svg[role="img"]')).toBeTruthy();
  });
  it('opens the finished example on an actual two-delivery replay', async () => {
    const sample = loadSample();
    await TestBed.configureTestingModule({
      imports: [AutomationLabComponent],
      providers: sample.providers,
    }).compileComponents();
    const fixture = TestBed.createComponent(AutomationLabComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('2 deliveries');
    expect(fixture.nativeElement.textContent).toContain('Finished student example');
    expect(fixture.componentInstance.replay.trial()?.completedMission).toBe(true);
    fixture.componentInstance.panel.set('evidence');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.compare-select select').value).toBe(
      fixture.componentInstance.runtime.currentTrials()[0].id,
    );
    fixture.componentInstance.panel.set('workspace');
    fixture.componentInstance.choose('cargo-delivery');
    fixture.detectChanges();
    expect(fixture.componentInstance.replay.trial()?.deliveriesCompleted).toBe(1);
    const moveOperand: HTMLInputElement = fixture.nativeElement.querySelector(
      '[aria-label="Move distance your number"]',
    );
    expect(moveOperand.disabled).toBe(true);
    expect(moveOperand.value).toBe('4');
    expect(fixture.nativeElement.querySelector('[aria-label="Your math answer"]')).toBeNull();
  });
  it('lets the learner edit only the second operand and shows the recorded math as read-only', async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationLabComponent],
      providers: [
        AutomationRuntimeService,
        { provide: AUTOMATION_CONFIG, useValue: config },
        {
          provide: AUTOMATION_SESSION,
          useValue: createLocalPreviewSession(config.projectId, config.projectVersion),
        },
        { provide: AUTOMATION_PERSISTENCE, useValue: { load: () => undefined, save: () => {} } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AutomationLabComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    const equation = root.querySelector<HTMLElement>('[aria-label="Move math problem"]')!;
    expect(equation.querySelectorAll('input')).toHaveLength(1);
    expect(equation.querySelector('select')).toBeNull();
    expect(equation.querySelector('[aria-label="Given number: 2"]')?.textContent).toBe('2');
    expect(equation.querySelector('[aria-label="plus"]')?.textContent).toBe('+');
    const operand = equation.querySelector<HTMLInputElement>('input')!;
    operand.value = '3';
    operand.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const runtime = TestBed.inject(AutomationRuntimeService);
    expect(runtime.compiled().commands[0].value).toBe(5);
    expect(root.querySelector('app-command-palette')).not.toBeNull();
    fixture.componentInstance.run();
    fixture.componentInstance.replay.pause();
    fixture.detectChanges();
    expect(fixture.componentInstance.replay.trial()?.distanceCm).toBe(120);
    const replayInput = root.querySelector<HTMLInputElement>(
      '.recorded-code [aria-label="Move rotations your number"]',
    )!;
    expect(replayInput.disabled).toBe(true);
    expect(replayInput.value).toBe('3');
    replayInput.value = '9';
    replayInput.dispatchEvent(new Event('input'));
    expect(runtime.draft().program.commands[0].value).toBe('3');
  });
  it('edits inline block units and directions while preserving expressions and nested commands', async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationLabComponent],
      providers: [
        AutomationRuntimeService,
        { provide: AUTOMATION_CONFIG, useValue: config },
        {
          provide: AUTOMATION_SESSION,
          useValue: createLocalPreviewSession(config.projectId, config.projectVersion),
        },
        { provide: AUTOMATION_PERSISTENCE, useValue: { load: () => undefined, save: () => {} } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AutomationLabComponent);
    const runtime = TestBed.inject(AutomationRuntimeService);
    fixture.componentInstance.choose('warehouse-pattern');
    runtime.setCommands([
      {
        id: 'loop',
        type: 'repeat',
        value: '2',
        commands: [
          {
            id: 'move',
            type: 'move-distance',
            value: 'SIDE / 2',
            mathEvidenceId: 'previous-calculation',
          },
          { id: 'turn', type: 'turn-degrees', value: '90', direction: 'right' },
        ],
      },
    ]);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    const units = root.querySelector<HTMLSelectElement>('[aria-label="Move units"]')!;
    units.value = 'move-rotations';
    units.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(runtime.draft().program.commands[0].commands?.[0]).toMatchObject({
      id: 'move',
      type: 'move-rotations',
      value: 'SIDE / 2',
      mathEvidenceId: undefined,
    });
    const value = root.querySelector<HTMLInputElement>('[aria-label="Move rotations value"]')!;
    value.value = '1/2';
    value.dispatchEvent(new Event('input'));
    const direction = root.querySelector<HTMLSelectElement>('[aria-label="Direction"]')!;
    direction.value = 'left';
    direction.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(runtime.draft().program.commands[0].commands?.[0].value).toBe('1/2');
    expect(runtime.draft().program.commands[0].commands?.[1].direction).toBe('left');
    expect(
      root
        .querySelector('.command[data-command-type="turn-degrees"] svg g')
        ?.getAttribute('transform'),
    ).toBe('translate(64 0) scale(-1 1)');
    const collapse = root.querySelector<HTMLButtonElement>('.collapse')!;
    collapse.click();
    fixture.detectChanges();
    expect(collapse.getAttribute('aria-expanded')).toBe('false');
    expect(root.querySelector('.loop-body')).toBeNull();
    expect(runtime.draft().program.commands[0].commands).toHaveLength(2);
  });
  it('opens the block picker on demand, preserves nesting, and returns focus to the added block', async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationLabComponent],
      providers: [
        AutomationRuntimeService,
        { provide: AUTOMATION_CONFIG, useValue: config },
        {
          provide: AUTOMATION_SESSION,
          useValue: createLocalPreviewSession(config.projectId, config.projectVersion),
        },
        { provide: AUTOMATION_PERSISTENCE, useValue: { load: () => undefined, save: () => {} } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AutomationLabComponent);
    const root: HTMLElement = fixture.nativeElement;
    const lab = fixture.componentInstance;
    lab.choose('warehouse-pattern');
    lab.runtime.setCommands([{ id: 'repeat', type: 'repeat', value: '2', commands: [] }]);
    fixture.detectChanges();
    const editor = fixture.debugElement.query(By.directive(CommandEditorComponent))
      .componentInstance as CommandEditorComponent;
    expect(root.querySelector<HTMLElement>('.palette-host')!.hidden).toBe(true);
    const trigger = root.querySelector<HTMLButtonElement>(
      '[aria-label="Add command inside loop"]',
    )!;
    trigger.focus();
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(root.querySelector<HTMLElement>('.palette-host')!.hidden).toBe(false);
    expect(root.querySelector<HTMLElement>('.program-column')!.hidden).toBe(true);
    expect(root.querySelector<HTMLElement>('.task-actions')!.hidden).toBe(true);
    expect(document.activeElement).toBe(root.querySelector('.palette-host'));
    editor.closePalette();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.activeElement).toBe(trigger);
    trigger.click();
    fixture.detectChanges();
    root
      .querySelector<HTMLButtonElement>('[aria-label="Add Wait to Inside Repeat (2 times)"]')!
      .click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(editor.paletteOpen()).toBe(false);
    expect(lab.runtime.draft().program.commands[0].commands).toMatchObject([{ type: 'wait' }]);
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Wait value');
    expect(lab.runtime.currentTrials()).toHaveLength(0);
  });

  it('guides one reasoning step at a time and retains unfinished math when returning to code or evidence', async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationLabComponent],
      providers: [
        AutomationRuntimeService,
        { provide: AUTOMATION_CONFIG, useValue: config },
        {
          provide: AUTOMATION_SESSION,
          useValue: createLocalPreviewSession(config.projectId, config.projectVersion),
        },
        { provide: AUTOMATION_PERSISTENCE, useValue: { load: () => undefined, save: () => {} } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AutomationLabComponent);
    const lab = fixture.componentInstance;
    const root: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();
    lab.openReasoning();
    expect(lab.reasoningView()).toBe(false);
    lab.run();
    lab.replay.pause();
    fixture.detectChanges();
    lab.openReasoning();
    expect(lab.reasoningView()).toBe(false);
    lab.replay.seek(lab.replay.duration());
    fixture.detectChanges();
    lab.openReasoning();
    fixture.detectChanges();
    const math = fixture.debugElement.query(By.directive(MathWorkbenchComponent))
      .componentInstance as MathWorkbenchComponent;
    expect(math.step()).toBe('observe');
    expect(
      root.querySelector<HTMLElement>('[aria-label="Math calculation"]')!.closest('[hidden]'),
    ).not.toBeNull();
    expect(root.querySelector<HTMLButtonElement>('.observation button')!.disabled).toBe(true);
    lab.runtime.updateDraft({ diagnosis: 'The robot stopped before the target.' });
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('.observation button')!.click();
    fixture.detectChanges();
    expect(math.step()).toBe('calculate');
    math.setValue(0, '120');
    math.setValue(1, '24');
    math.answer.set('5');
    fixture.detectChanges();
    const next = root.querySelectorAll<HTMLButtonElement>(
      'app-math-workbench .step-actions button',
    )[1];
    next.click();
    fixture.detectChanges();
    expect(math.step()).toBe('explain');
    math.explanation.set('Unfinished explanation');
    lab.edit();
    fixture.detectChanges();
    lab.panel.set('evidence');
    fixture.detectChanges();
    lab.panel.set('workspace');
    fixture.detectChanges();
    lab.openReasoning();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(MathWorkbenchComponent)).componentInstance).toBe(
      math,
    );
    expect(math.step()).toBe('explain');
    expect(math.answer()).toBe('5');
    expect(math.explanation()).toBe('Unfinished explanation');
    expect(lab.runtime.state().math).toHaveLength(0);
    expect(lab.runtime.draft().completedAt).toBeUndefined();
    lab.showTrial(lab.runtime.currentTrials()[0]);
    lab.replay.pause();
    fixture.detectChanges();
    expect(lab.reasoningView()).toBe(false);
    expect(lab.replayMode()).toBe(true);
  });
});
