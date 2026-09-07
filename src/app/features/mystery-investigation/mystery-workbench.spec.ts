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

  async function open() {
    const service = new MysteryInvestigationService();
    await service.initialize();
    await TestBed.configureTestingModule({
      imports: [MysteryInvestigationComponent],
      providers: [provideRouter([]), { provide: MysteryInvestigationService, useValue: service }],
    }).compileComponents();
    const fixture = TestBed.createComponent(MysteryInvestigationComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return { fixture, shell: fixture.componentInstance, service };
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

  it('keeps all explanation questions together and links evidence without changing the active tool', async () => {
    const { fixture, shell, service } = await open();
    await shell.inspectEvidence('evidence-inventory');
    await shell.useInExplanation('evidence-inventory');
    fixture.detectChanges();
    await fixture.whenStable();
    const theory = fixture.debugElement.query(By.directive(InvestigationWorkingTheoryComponent))
      .componentInstance as InvestigationWorkingTheoryComponent;
    expect(theory.evidenceIds()).toContain('evidence-inventory');
    expect(shell.activeStationKey()).toBe('scanner');
    expect(
      fixture.nativeElement.querySelector('#explanation textarea[name="reasoning"]'),
    ).not.toBeNull();
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
});
