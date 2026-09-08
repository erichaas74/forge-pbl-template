import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { robotDeliveryConfig as config } from '../../../projects/robot-delivery/robot-delivery.config';
import { AutomationLabComponent } from './automation-lab.component';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import { AUTOMATION_CONFIG, AUTOMATION_SESSION } from '../runtime/automation.tokens';
import { AUTOMATION_PERSISTENCE } from '../persistence/automation.persistence';
import { loadSample } from '../../../runtime/project-showcase/automation.sample';
import { By } from '@angular/platform-browser';
import { MathWorkbenchComponent } from './math-workbench.component';
describe('Robot lab student workspace', () => {
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
    expect(fixture.nativeElement.querySelector('[aria-label="Move rotations value"]').value).toBe(
      '3',
    );
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
    expect(root.querySelector<HTMLInputElement>('[aria-label="Move rotations value"]')!.value).toBe(
      '3',
    );
    fixture.componentInstance.run();
    fixture.componentInstance.replay.pause();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Watch what your guess does');
    expect(fixture.nativeElement.querySelector('app-math-workbench')).toBeNull();
    expect(runtime.reasoningOpened()).toBe(false);
    fixture.componentInstance.replay.seek(fixture.componentInstance.replay.duration());
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('A failed attempt is a clue.');
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
    expect(fixture.nativeElement.querySelector('[aria-label="Your math answer"]')).toBeNull();
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
});
