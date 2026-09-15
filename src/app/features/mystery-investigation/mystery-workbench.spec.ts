import { signal } from '@angular/core';
import { PROJECT_LESSON_FOCUS } from '../../shared/project-lessons/project-lesson-focus';
import { projectLessonRegistry } from '../../runtime/project-launch/project-lesson.registry';
import { RestorationWorkspaceComponent } from '../../projects/mystery-substance/station-workspaces';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MysteryInvestigationComponent } from './mystery-investigation.component';
import { MysteryInvestigationService } from '../../projects/mystery-substance/mystery-investigation.service';
import { PropertiesLabComponent } from '../../projects/mystery-substance/properties-lab.component';
import { WorkbenchEvidenceComponent } from '../../templates/investigation/ui/workbench-evidence.component';
import { InvestigationWorkingTheoryComponent } from '../../templates/investigation/ui/working-theory.component';

describe('Mystery Substance workbench', () => {
  beforeEach(() => vi.stubGlobal('localStorage', undefined));
  afterEach(() => vi.unstubAllGlobals());

  async function open(lesson = 0) {
    const plan = projectLessonRegistry.find('mystery-substance', '1.0.0')!;
    const focus = signal(lesson ? plan.lessons[lesson - 1] : undefined);
    const service = new MysteryInvestigationService();
    await service.initialize();
    await TestBed.configureTestingModule({
      imports: [MysteryInvestigationComponent],
      providers: [
        { provide: PROJECT_LESSON_FOCUS, useValue: focus },
        provideRouter([]),
        { provide: MysteryInvestigationService, useValue: service },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(MysteryInvestigationComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return { fixture, shell: fixture.componentInstance, service, focus, plan };
  }

  it('keeps the same instrument, selected test and draft when evidence or another station is opened', async () => {
    const { fixture, shell } = await open();
    await shell.launchActivity('activity-property-comparison');
    fixture.detectChanges();
    await fixture.whenStable();
    const lab = fixture.debugElement.query(By.directive(PropertiesLabComponent))
      .componentInstance as PropertiesLabComponent;
    lab.selectTest('solubility');
    lab.observation.set('The water is still cloudy.');
    fixture.detectChanges();
    await shell.inspectEvidence('evidence-water-reference');
    fixture.detectChanges();
    const dock = fixture.debugElement.query(By.directive(WorkbenchEvidenceComponent))
      .componentInstance as WorkbenchEvidenceComponent;
    expect(dock.current()?.id).toBe('evidence-water-reference');
    expect(lab.testId()).toBe('solubility');
    await shell.launchActivity('activity-scan-vial-a');
    fixture.detectChanges();
    await shell.launchActivity('activity-property-comparison');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(PropertiesLabComponent)).componentInstance).toBe(
      lab,
    );
    expect(lab.observation()).toBe('The water is still cloudy.');
  });

  it('asks one explanation question at a time and preserves linked evidence', async () => {
    const { fixture, shell, service } = await open();
    await shell.inspectEvidence('evidence-inventory');
    await shell.useInExplanation('evidence-inventory');
    fixture.detectChanges();
    await fixture.whenStable();
    const theory = fixture.debugElement.query(By.directive(InvestigationWorkingTheoryComponent))
      .componentInstance as InvestigationWorkingTheoryComponent;
    expect(theory.evidenceIds()).toContain('evidence-inventory');
    expect(shell.activeStationKey()).toBe('scanner');
    expect(theory.singlePage()).toBe(false);
    expect(fixture.nativeElement.querySelectorAll('#explanation textarea')).toHaveLength(1);
    theory.statement.set('The inventory suggests different substances.');
    theory.next();
    fixture.detectChanges();
    expect(theory.currentStep()).toBe('reasoning');
    expect(theory.evidenceIds()).toContain('evidence-inventory');
    expect(service.snapshot()?.activities['activity-evidence-locker'].status).not.toBe('complete');
  });

  it('opens the selected matrix cell at the correct vial and tool', async () => {
    const { fixture, shell } = await open();
    await shell.chooseResult('evidence-property-trials', 'conductivity', 2, false);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const lab = fixture.debugElement.query(By.directive(PropertiesLabComponent))
      .componentInstance as PropertiesLabComponent;
    expect(lab.vialId()).toBe('vial-c');
    expect(lab.testId()).toBe('conductivity');
  });
  it('opens the native lesson task, keeps its draft across lesson changes, and does not bypass the final gate', async () => {
    const { fixture, shell, focus, plan, service } = await open(8);
    expect(shell.activeStationKey()).toBe('restoration');
    const station = fixture.debugElement.query(By.directive(RestorationWorkspaceComponent))
      .componentInstance as RestorationWorkspaceComponent;
    station.setField('labelId', station.labels[0].id);
    station.next();
    station.setField('zoneId', station.zones[0].id);
    const completedBefore = Object.values(service.snapshot()!.activities).filter(
      (a) => a.status === 'complete',
    ).length;
    focus.set(plan.lessons[0]);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(shell.activeStationKey()).toBe('scanner');
    focus.set(plan.lessons[7]);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(
      fixture.debugElement.query(By.directive(RestorationWorkspaceComponent)).componentInstance,
    ).toBe(station);
    expect(station.activeAssignment().labelId).toBe(station.labels[0].id);
    expect(station.activeAssignment().zoneId).toBe(station.zones[0].id);
    expect(station.mode()).toBe('position');
    focus.set({ ...plan.lessons[7], focusTarget: 'final' });
    fixture.detectChanges();
    await fixture.whenStable();
    expect(shell.workspacePair()).not.toBe('final-investigation');
    expect(shell.drawer()).toBe('lockedPhase');
    expect(
      Object.values(service.snapshot()!.activities).filter((a) => a.status === 'complete'),
    ).toHaveLength(completedBefore);
  });

  it('requires the current choice before continuing and captures only a complete reasoned draft', async () => {
    const { fixture } = await open(8);
    const station = fixture.debugElement.query(By.directive(RestorationWorkspaceComponent))
      .componentInstance as RestorationWorkspaceComponent;
    const capture = vi.fn();
    station.captured.subscribe(capture);
    station.next();
    expect(station.mode()).toBe('label');
    station.saveCase();
    expect(capture).not.toHaveBeenCalled();
    station.setField('labelId', station.labels[0].id);
    station.next();
    expect(station.mode()).toBe('position');
    station.setField('zoneId', station.zones[0].id);
    station.next();
    station.setField('recommendationId', station.recommendations[0].id);
    station.next();
    station.setField('reasoning', 'My comparison test supports this label.');
    station.previous();
    expect(station.activeAssignment().reasoning).toContain('comparison');
    station.next();
    station.saveCase();
    expect(capture).toHaveBeenCalledTimes(1);
    station.selectVial('vial-b');
    expect(station.usedByOther(station.labels[0].id)).toBe(true);
  });
});
