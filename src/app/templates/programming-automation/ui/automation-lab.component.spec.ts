import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { robotDeliveryConfig as config } from '../../../projects/robot-delivery/robot-delivery.config';
import { AutomationLabComponent } from './automation-lab.component';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import { AUTOMATION_CONFIG, AUTOMATION_SESSION } from '../runtime/automation.tokens';
import { AUTOMATION_PERSISTENCE } from '../persistence/automation.persistence';
import { loadSample } from '../../../runtime/project-showcase/automation.sample';
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
    expect(fixture.nativeElement.querySelector('[aria-label="Math calculation"]').value).toBe(
      'distance-rotations',
    );
    const runtime = TestBed.inject(AutomationRuntimeService);
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
});
