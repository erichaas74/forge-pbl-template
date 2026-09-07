import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ageOfExplorationJourneyConfig as baseConfig } from '../../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import { JourneyReplayRuntimeService } from '../runtime/journey-replay-runtime.service';
import {
  JOURNEY_REPLAY_CONFIG,
  JOURNEY_REPLAY_ENROLLMENT,
  JOURNEY_REPLAY_PERSISTENCE,
} from '../runtime/journey-replay.tokens';
import { JourneyReplayPageComponent } from './journey-shell.component';

describe('JourneyReplayPageComponent map workspace', () => {
  async function setup(stepId = 'step-route') {
    const routeStep = baseConfig.steps.find((step) => step.id === stepId);
    if (!routeStep) throw new Error(`Step fixture ${stepId} is missing.`);

    await TestBed.configureTestingModule({
      imports: [JourneyReplayPageComponent],
      providers: [
        provideRouter([]),
        JourneyReplayRuntimeService,
        { provide: JOURNEY_REPLAY_CONFIG, useValue: { ...baseConfig, steps: [routeStep] } },
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

    const fixture = TestBed.createComponent(JourneyReplayPageComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('keeps one map mounted while chapter sheets open and close over it', async () => {
    const fixture = await setup();
    const map = fixture.nativeElement.querySelector('app-living-journey-map');
    expect(map).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.decision-sheet').hidden).toBe(false);
    expect(fixture.nativeElement.querySelector('.chapter-task-nav')).toBeNull();
    expect(getComputedStyle(fixture.nativeElement.querySelector('.decision-sheet')).left).toBe(
      '1rem',
    );
    expect(fixture.nativeElement.querySelector('.chart-heading')).toBeNull();
    expect(fixture.nativeElement.querySelector('.atlas-tools')).toBeNull();
    expect(fixture.nativeElement.querySelector('.chart-legend')).toBeNull();
    expect(fixture.nativeElement.querySelector('.lens-tray')).toBeNull();
    expect(fixture.nativeElement.querySelector('.map-settings')?.textContent).toContain(
      'Chart overlays',
    );
    expect(
      fixture.nativeElement.querySelector('.map-experience > .map-tools-popout'),
    ).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.decision-sheet .map-settings')).toBeNull();
    expect(fixture.nativeElement.querySelector('.project-return-link')?.textContent).toContain(
      'Projects',
    );

    const worldButton = [...fixture.nativeElement.querySelectorAll('.map-settings button')].find(
      (button) => button.textContent?.trim() === 'World',
    ) as HTMLButtonElement;
    worldButton.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.livingMap()?.cover()).toBe('world');

    fixture.componentInstance.showMapOnly();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-living-journey-map')).toBe(map);
    expect(fixture.nativeElement.querySelector('.decision-sheet').hidden).toBe(true);
    expect(fixture.nativeElement.querySelector('.map-prompt')).not.toBeNull();
  });

  it('opens route facts from the map and carries the route choice into chapter work', async () => {
    const fixture = await setup();
    const page = fixture.componentInstance;

    page.inspectRoute('route-coastal');
    fixture.detectChanges();
    expect(page.utility()).toBe('location');
    expect(fixture.nativeElement.querySelector('.route-detail')?.textContent).toContain(
      'Follow the African coast',
    );

    page.chooseInspectedRoute();
    fixture.detectChanges();
    expect(page.runtime.choice()?.id).toBe('route-choice-coastal');
    expect(page.decisionOpen()).toBe(true);
    expect(page.decisionPanel()?.workStep()).toBe(0);
    expect(fixture.nativeElement.querySelector('.work-actions .continue')?.textContent).toContain(
      'Complete Choose',
    );
    expect(fixture.nativeElement.querySelector('.decision-sheet').hidden).toBe(false);
  });

  it('keeps goal tabs editable while changing map options and opens planning details in the sheet', async () => {
    const fixture = await setup('step-sponsor');
    const page = fixture.componentInstance;

    expect(fixture.nativeElement.querySelectorAll('.mission-goal-tabs button')).toHaveLength(3);

    page.chooseGoal('mission-influence');
    fixture.detectChanges();
    expect(page.candidateLocationIds()).toHaveLength(4);
    expect(page.candidateRouteIds()).toHaveLength(0);
    expect(page.livingMap()?.cover()).toBe('world');
    expect(page.livingMap()?.zoom()).toBeGreaterThan(1);

    const england = baseConfig.map.locations.find((location) => location.id === 'london');
    if (!england) throw new Error('England map fixture is missing.');
    page.inspectLocation(england);
    fixture.detectChanges();
    expect(page.utility()).toBeUndefined();
    expect(page.decisionOpen()).toBe(true);
    expect(page.decisionPanel()?.inspectedPlanningTarget()?.id).toBe('sponsor-england');
    expect(fixture.nativeElement.querySelector('.planning-detail')?.textContent).toContain(
      'Merchant funding and ships',
    );

    page.chooseGoal('mission-mapping');
    fixture.detectChanges();
    expect(page.candidateRouteIds()).toHaveLength(3);
    expect(page.candidateLocationIds()).toHaveLength(3);
    expect(page.livingMap()?.cover()).toBe('regional');
    expect(page.livingMap()?.zoom()).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('.mission-goal-tabs button')).toHaveLength(3);

    page.chooseGoal('mission-trade');
    fixture.detectChanges();
    expect(page.livingMap()?.cover()).toBe('world');
    expect(page.livingMap()?.zoom()).toBe(1);
  });
});
