import { TestBed } from '@angular/core/testing';
import { ageOfExplorationJourneyConfig as config } from '../../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import { JourneyReplayRuntimeService } from '../runtime/journey-replay-runtime.service';
import {
  JOURNEY_REPLAY_CONFIG,
  JOURNEY_REPLAY_ENROLLMENT,
  JOURNEY_REPLAY_PERSISTENCE,
} from '../runtime/journey-replay.tokens';
import { JourneyDecisionPanelComponent } from './journey-decision-panel.component';

describe('Journey task steps', () => {
  it('preserves reasoning when navigating and records only a valid cited chapter', async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyDecisionPanelComponent],
      providers: [
        JourneyReplayRuntimeService,
        { provide: JOURNEY_REPLAY_CONFIG, useValue: config },
        {
          provide: JOURNEY_REPLAY_ENROLLMENT,
          useValue: {
            tenantId: 'test',
            classId: 'class',
            studentId: 'learner',
            studentDisplayName: 'Learner',
            classLabel: 'Class',
            mode: 'demo',
          },
        },
        {
          provide: JOURNEY_REPLAY_PERSISTENCE,
          useValue: { load: () => undefined, save: vi.fn(), clear: vi.fn() },
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(JourneyDecisionPanelComponent);
    fixture.detectChanges();
    const panel = fixture.componentInstance;
    const initialContinue = fixture.nativeElement.querySelector(
      '.work-actions .continue',
    ) as HTMLButtonElement;
    expect(initialContinue.textContent).toContain('Complete Choose');
    expect(initialContinue.disabled).toBe(true);
    panel.goToWorkStep(2);
    expect(panel.workStep()).toBe(0);
    panel.choose('mission-influence');
    panel.inspectPlanningTarget('sponsor-england');
    panel.selectPlanningTarget('sponsor-england');
    panel.planningTextInput({
      target: {
        value: 'We will offer a focused northern voyage and prepare the crew for cold seas.',
      },
    } as unknown as Event);
    panel.sendPlanning();
    fixture.detectChanges();
    expect(panel.planningReady()).toBe(true);
    expect(
      (fixture.nativeElement.querySelector('.work-actions .continue') as HTMLButtonElement)
        .disabled,
    ).toBe(false);
    expect(fixture.nativeElement.querySelector('.planning-result')?.textContent).toContain(
      'England offers shared funding',
    );
    panel.choose('mission-trade');
    expect(panel.workStep()).toBe(0);
    panel.inspectPlanningTarget('trade-west-africa');
    expect(panel.inspectedPlanningTarget()?.label).toBe('West African markets');
    panel.selectPlanningTarget('trade-west-africa');
    panel.goToWorkStep(1);
    expect(panel.workStep()).toBe(1);
    panel.runtime.setResponseText(
      'Trade access mattered because rulers wanted a direct route to valuable goods.',
    );
    panel.goToWorkStep(4);
    fixture.detectChanges();
    expect(panel.runtime.canComplete()).toBe(false);
    expect(fixture.nativeElement.querySelector('.work-actions .continue').disabled).toBe(true);
    panel.goToWorkStep(2);
    expect(panel.runtime.state().responseDraft.text).toContain('Trade access');
    panel.sourceChanged('evidence-spice-ledger');
    panel.citationParagraph.set('ledger-1');
    panel.citationExplanation.set(
      'The selling price explains why direct trade access could motivate a voyage.',
    );
    panel.addCitation();
    expect(panel.runtime.canComplete()).toBe(false);
    expect(panel.completionHint()).toContain('prediction');
    panel.runtime.setPrediction('Direct access may change how much traders pay for spices.');
    expect(panel.runtime.canComplete()).toBe(true);
    await panel.recordChapter();
    expect(panel.runtime.state().completedSteps).toHaveLength(1);
    expect(panel.workStep()).toBe(0);
    expect(panel.runtime.state().completedSteps[0].studentResponse.citations).toHaveLength(1);
    fixture.destroy();
  });
});
