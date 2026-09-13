import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('phaser', () => ({}));
import { frontierTradingConfig } from '../../../../projects/frontier-trading/frontier-trading.config';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';
import { MemorySimulationDecisionPersistenceAdapter } from '../../runtime/simulation-decision.persistence';
import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
} from '../../runtime/simulation-decision.tokens';
import { SimulationRouteMapComponent } from '../pages/route-map.component';
import { SimulationEventDecisionComponent } from '../pages/event-decision.component';
import { routeJourneyPresentation } from './route-journey.presentation';

const config = {
  ...frontierTradingConfig,
  choiceProgression: undefined,
  routeForecastChallenge: undefined,
};

describe('confirmed journey feedback', () => {
  let runtime: SimulationDecisionRuntimeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SimulationDecisionRuntimeService,
        { provide: SIMULATION_DECISION_CONFIG, useValue: config },
        {
          provide: SIMULATION_DECISION_PERSISTENCE,
          useFactory: () => new MemorySimulationDecisionPersistenceAdapter(),
        },
      ],
    });
    runtime = TestBed.inject(SimulationDecisionRuntimeService);
    runtime.startCompany('Trail testers', 'compass', 'prairie-wagon');
  });
  const feedback = () => routeJourneyPresentation(config, runtime.state());
  function depart() {
    expect(runtime.commitRoute('route-northern', 'We chose the lower supply cost.')).toBe(true);
    runtime.state.update((state) => ({
      ...state,
      activeTravel: { ...state.activeTravel!, eventIds: [] },
    }));
  }

  it('does not turn selection, departure or a preview into a travel day', () => {
    const fixture = TestBed.createComponent(SimulationRouteMapComponent);
    fixture.componentInstance.selectRoute('route-northern');
    expect(feedback()).toBeUndefined();
    const day = runtime.state().currentDay;
    depart();
    const before = structuredClone(runtime.state());
    expect(feedback()).toMatchObject({ phase: 'departure', progressDays: 0 });
    expect(feedback()?.checkpoints.filter((point) => point.reached)).toHaveLength(1);
    expect(runtime.state()).toEqual(before);
    expect(runtime.state().currentDay).toBe(day);
    fixture.destroy();
  });

  it('restores checkpoints and arrival from history when the map is reopened', () => {
    depart();
    runtime.advanceTravel('route');
    expect(feedback()).toMatchObject({ phase: 'checkpoint', progressDays: 1 });
    runtime.advanceTravel('route');
    runtime.advanceTravel('route');
    const fixture = TestBed.createComponent(SimulationRouteMapComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.mapArrival()).toBe(true);
    expect(fixture.nativeElement.querySelector('.map-arrival')?.textContent).toContain(
      'Arrived at',
    );
    const arrivedDay = runtime.state().routeHistory.at(-1)!.dayArrived;
    runtime.state.update((state) => ({ ...state, currentDay: state.currentDay + 2 }));
    expect(feedback()?.detail).toContain(`Day ${arrivedDay}`);
    fixture.destroy();
  });

  it('never labels the final checkpoint as arrival while an event is pending', () => {
    depart();
    runtime.state.update((state) => ({
      ...state,
      pendingEventId: config.events[0]!.id,
      activeTravel: { ...state.activeTravel!, progressDays: 3 },
    }));
    expect(feedback()?.phase).toBe('event');
    expect(feedback()?.checkpoints.at(-1)?.reached).toBe(false);
    runtime.state.update((state) => ({
      ...state,
      activeTravel: undefined,
      pendingEventId: undefined,
    }));
    expect(feedback()).toBeUndefined();
  });

  it('shows an authoritative teacher pause without changing progress', () => {
    depart();
    const id = feedback()?.cue.id;
    runtime.state.update((state) => ({ ...state, status: 'paused_by_teacher' }));
    expect(feedback()?.phase).toBe('paused');
    expect(feedback()?.cue.id).not.toBe(id);
    expect(feedback()?.progressDays).toBe(0);
  });

  function eventScreen() {
    depart();
    const event = config.events.find((item) => !item.mathChallenge)!;
    runtime.state.update((state) => ({
      ...state,
      pendingEventId: event.id,
      activeTravel: { ...state.activeTravel!, progressDays: 1 },
    }));
    const fixture = TestBed.createComponent(SimulationEventDecisionComponent);
    fixture.componentInstance.selectChoice(event.choices[0]!.id);
    fixture.componentInstance.reasoning.set('This choice protects our trading company.');
    fixture.componentInstance.openReview();
    return fixture;
  }

  it('records event outcomes before showing effects, with no delayed domain mutation', () => {
    const fixture = eventScreen();
    fixture.componentInstance.resolve();
    expect(runtime.state().pendingEventId).toBeUndefined();
    expect(fixture.componentInstance.resolvedFeedback()).toEqual(
      runtime.state().eventHistory.at(-1),
    );
    const after = structuredClone(runtime.state());
    fixture.componentInstance.resolve();
    fixture.destroy();
    expect(runtime.state()).toEqual(after);
  });

  it('does not celebrate a rejected event choice', () => {
    const fixture = eventScreen();
    runtime.state.update((state) => ({ ...state, status: 'paused_by_teacher' }));
    fixture.componentInstance.resolve();
    expect(runtime.state().eventHistory).toHaveLength(0);
    expect(fixture.componentInstance.resolvedFeedback()).toBeUndefined();
    expect(fixture.componentInstance.reviewOpen()).toBe(true);
    fixture.destroy();
  });

  it('shows confirmed arrival and the recorded outcome when the final event is resolved', () => {
    const fixture = eventScreen();
    runtime.state.update((state) => ({
      ...state,
      activeTravel: { ...state.activeTravel!, progressDays: 3 },
    }));
    fixture.componentInstance.resolve();
    fixture.detectChanges();
    expect(runtime.state().activeTravel).toBeUndefined();
    expect(fixture.componentInstance.journey()?.phase).toBe('arrival');
    expect(fixture.nativeElement.querySelector('.journey-empty h1')?.textContent).toContain(
      'Arrived at',
    );
    expect(fixture.nativeElement.querySelector('.outcome')?.textContent).toContain(
      runtime.state().eventHistory.at(-1)!.outcome,
    );
    fixture.destroy();
  });

  it('stops map effects and repeat advances after a persistence failure', () => {
    depart();
    const fixture = TestBed.createComponent(SimulationRouteMapComponent);
    const persistence = TestBed.inject(SIMULATION_DECISION_PERSISTENCE);
    vi.spyOn(persistence, 'save').mockImplementation(() => {
      throw new Error('disk full');
    });
    fixture.componentInstance.advanceMapDay();
    expect(runtime.saveState()).toBe('save_failed');
    expect(fixture.componentInstance.dayMoving()).toBe(false);
    const progress = runtime.state().activeTravel?.progressDays;
    fixture.componentInstance.advanceMapDay();
    expect(runtime.state().activeTravel?.progressDays).toBe(progress);
    fixture.destroy();
  });
});
