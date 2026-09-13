import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { frontierTradingConfig as config } from '../../../projects/frontier-trading/frontier-trading.config';
import { SimulationDecisionRuntimeService } from './simulation-decision-runtime.service';
import type { SimulationDecisionConfig } from '../domain/simulation-decision.models';
import { MemorySimulationDecisionPersistenceAdapter } from './simulation-decision.persistence';
import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
} from './simulation-decision.tokens';

describe('trade world runtime clock', () => {
  let persistence: MemorySimulationDecisionPersistenceAdapter;
  function setup(
    definition: SimulationDecisionConfig = {
      ...config,
      tradeWorld: { ...config.tradeWorld!, timing: undefined },
    },
  ) {
    TestBed.configureTestingModule({
      providers: [
        SimulationDecisionRuntimeService,
        { provide: SIMULATION_DECISION_CONFIG, useValue: definition },
        { provide: SIMULATION_DECISION_PERSISTENCE, useValue: persistence },
      ],
    });
    return TestBed.inject(SimulationDecisionRuntimeService);
  }
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    persistence = new MemorySimulationDecisionPersistenceAdapter();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('keeps turn-based prices fixed across idle time, shopping, navigation and reload', () => {
    const definition = {
      ...config,
      choiceProgression: undefined,
      routeForecastChallenge: undefined,
    };
    const runtime = setup(definition);
    runtime.startCompany('Turn traders', 'compass', 'prairie-wagon');
    runtime.holdWorld('route-math', true);
    runtime.navigate('market');
    const before = structuredClone(runtime.world());
    vi.advanceTimersByTime(3600000);
    runtime.toggleWorldPause();
    expect(runtime.pulseWorld()).toBe(false);
    expect(runtime.world()).toEqual(before);
    expect(runtime.worldRunning()).toBe(false);
    runtime.navigate('route');
    expect(runtime.commitRoute('missing', 'A good route to the next market.')).toBe(false);
    expect(runtime.world()).toEqual(before);
    expect(runtime.commitRoute('route-northern', 'A short route to the next market.')).toBe(true);
    expect(runtime.world()?.tick).toBe(1);
    expect(runtime.worldMotionAllowed()).toBe(true);
    const committed = structuredClone(runtime.world());
    vi.advanceTimersByTime(3600000);
    expect(runtime.world()).toEqual(committed);
    TestBed.resetTestingModule();
    const restored = setup(definition);
    vi.advanceTimersByTime(3600000);
    expect(restored.world()).toEqual(committed);
    expect(restored.advanceTravel('route')).toBe(true);
    expect(restored.world()?.tick).toBe(2);
    const checkpoint = structuredClone(restored.world());
    expect(restored.advanceTravel('route')).toBe(false);
    vi.advanceTimersByTime(3600000);
    expect(restored.world()).toEqual(checkpoint);
  });

  it('runs once per visible interval after setup and does not catch up hidden time', () => {
    const runtime = setup();
    vi.advanceTimersByTime(40000);
    expect(runtime.world()?.tick).toBe(0);
    runtime.startCompany('World clock', 'compass', 'prairie-wagon');
    vi.advanceTimersByTime(19999);
    expect(runtime.world()?.tick).toBe(0);
    vi.advanceTimersByTime(1);
    expect(runtime.world()?.tick).toBe(1);
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    vi.advanceTimersByTime(60000);
    expect(runtime.world()?.tick).toBe(1);
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    vi.advanceTimersByTime(20000);
    expect(runtime.world()?.tick).toBe(2);
    const day = runtime.state().currentDay;
    expect(day).toBe(1);
    TestBed.resetTestingModule();
    vi.advanceTimersByTime(60000);
    expect(runtime.world()?.tick).toBe(2);
  });

  it('holds both manual and automatic pulses for calculations, pauses and save failures', () => {
    const runtime = setup();
    runtime.startCompany('Held quotes', 'compass', 'prairie-wagon');
    runtime.holdWorld('market-math', true);
    runtime.holdWorld('route-math', true);
    runtime.holdWorld('market-math', true);
    runtime.holdWorld('market-math', false);
    expect(runtime.worldStatus()).toBe('Prices held while you plan');
    expect(runtime.pulseWorld()).toBe(false);
    vi.advanceTimersByTime(20000);
    expect(runtime.world()?.tick).toBe(0);
    runtime.holdWorld('route-math', false);
    expect(runtime.pulseWorld()).toBe(true);
    runtime.toggleWorldPause();
    vi.advanceTimersByTime(20000);
    expect(runtime.world()?.tick).toBe(1);
    expect(runtime.pulseWorld()).toBe(false);
    runtime.toggleWorldPause();
    runtime.teacherPauseToggle();
    expect(runtime.pulseWorld()).toBe(false);
    runtime.teacherPauseToggle();
    runtime.saveState.set('save_failed');
    expect(runtime.pulseWorld()).toBe(false);
    runtime.saveState.set('saved');
    runtime.errors.set(['Review your calculation.']);
    expect(runtime.pulseWorld()).toBe(true);
    expect(runtime.errors()).toEqual(['Review your calculation.']);
  });

  it('restores the exact saved world and its pause without replaying deliveries', () => {
    const first = setup();
    first.startCompany('Saved freight', 'compass', 'prairie-wagon');
    for (let i = 0; i < 6; i++) first.pulseWorld();
    first.toggleWorldPause();
    const saved = structuredClone(first.world());
    TestBed.resetTestingModule();
    const restored = setup();
    expect(restored.world()).toEqual(saved);
    vi.advanceTimersByTime(60000);
    expect(restored.world()).toEqual(saved);
    restored.toggleWorldPause();
    expect(restored.pulseWorld()).toBe(true);
    expect(restored.world()?.tick).toBe(7);
    expect(restored.world()?.shipments[0]?.deliveries).toBe(2);
  });
});
