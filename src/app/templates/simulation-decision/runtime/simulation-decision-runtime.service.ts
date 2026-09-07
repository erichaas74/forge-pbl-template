import { Injectable, computed, inject, signal } from '@angular/core';

import {
  cargoCapacity,
  cargoUsed,
  cashOnHand,
  createSimulationState,
  inventoryValueAtCurrentMarket,
  ledgerReconciles,
  marketAt,
  reduceSimulationDecision,
  reportMissingRequirements,
  seasonResults,
} from '../domain/simulation-decision.engine';
import { formatMoney } from '../domain/money';
import { SimulationPlanning } from './simulation-planning';
import type {
  EvidenceReference,
  RouteForecastAnswer,
  SimulationDecisionAction,
  SimulationDecisionState,
  SimulationView,
  TradeLineInput,
} from '../domain/simulation-decision.models';
import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
  SIMULATION_DECISION_SESSION_CONTEXT,
} from './simulation-decision.tokens';
import { projectSessionRuntimeScope } from '../../../core/context/project-session-context';

@Injectable()
export class SimulationDecisionRuntimeService {
  readonly planning = new SimulationPlanning();
  readonly config = inject(SIMULATION_DECISION_CONFIG);
  private readonly session = inject(SIMULATION_DECISION_SESSION_CONTEXT, { optional: true });
  private readonly persistence = inject(SIMULATION_DECISION_PERSISTENCE);
  private readonly runtimeScope = this.session === null
    ? undefined
    : projectSessionRuntimeScope(this.session, 'student');
  readonly state = signal(createSimulationState(this.config, 20_260_902, this.runtimeScope));
  readonly errors = signal<readonly string[]>([]);
  readonly saveState = signal<'saved' | 'saving' | 'offline_local' | 'save_failed'>('saved');
  readonly marketIntent = signal<{ goodId: string; direction: 'buy' | 'sell' } | undefined>(
    undefined,
  );

  readonly cash = computed(() => cashOnHand(this.state()));
  readonly capacity = computed(() => cargoCapacity(this.config, this.state()));
  readonly usedCargo = computed(() => cargoUsed(this.config, this.state()));
  readonly cargoValue = computed(() => inventoryValueAtCurrentMarket(this.config, this.state()));
  readonly currentLocation = computed(() =>
    this.config.locations.find((location) => location.id === this.state().currentLocationId),
  );
  readonly currentMarket = computed(() => marketAt(this.config, this.state().currentLocationId));
  readonly transport = computed(() =>
    this.config.transports.find((transport) => transport.id === this.state().transportId),
  );
  readonly results = computed(() => seasonResults(this.config, this.state()));
  readonly reportMissing = computed(() => reportMissingRequirements(this.config, this.state()));
  readonly reconciled = computed(() => ledgerReconciles(this.state()));
  readonly profit = computed(() => this.cash() - this.config.startingCashCents);

  constructor() {
    const saved = this.persistence.load(this.config.projectId, this.config.projectVersion);
    if (saved !== undefined) {
      this.state.set({
        ...saved,
        runtimeScope: this.runtimeScope ?? saved.runtimeScope,
        marketDiscoveries: saved.marketDiscoveries ?? {},
      });
    }
  }

  navigate(view: SimulationView): void {
    const state = this.state();
    if (
      state.status === 'event_pending' &&
      view !== 'events' &&
      view !== 'ledger' &&
      view !== 'teacher'
    ) {
      this.errors.set(['Resolve the current event before returning to trading or travel.']);
      return;
    }
    if (
      (view === 'results' || view === 'showcase') &&
      state.status !== 'season_complete' &&
      state.status !== 'submitted'
    ) {
      this.errors.set(['Results and the showcase unlock when the trading season is complete.']);
      return;
    }
    if (view === 'setup' && state.status !== 'not_started') {
      view = 'market';
    }
    this.apply({ type: 'view.changed', view });
  }

  startCompany(companyName: string, emblemId: string, transportId: string): boolean {
    const changed = this.apply({ type: 'company.started', companyName, emblemId, transportId });
    if (changed) {
      this.navigate('route');
    }
    return changed;
  }

  commitTrade(lines: readonly TradeLineInput[]): boolean {
    return this.apply({ type: 'trade.committed', lines });
  }

  inspectMarketStall(stallId: string): boolean {
    return this.apply({ type: 'market.stallInspected', stallId });
  }

  commitRoute(routeId: string, rationale: string, forecast?: RouteForecastAnswer): boolean {
    return this.apply({ type: 'route.committed', routeId, rationale, forecast });
  }

  planMarketTrade(goodId: string, direction: 'buy' | 'sell'): void {
    this.marketIntent.set({ goodId, direction });
    this.navigate('market');
  }

  takeMarketIntent(): { goodId: string; direction: 'buy' | 'sell' } | undefined {
    const intent = this.marketIntent();
    this.marketIntent.set(undefined);
    return intent;
  }

  advanceTravel(): boolean {
    const changed = this.apply({ type: 'travel.advanced' });
    if (changed) {
      const state = this.state();
      this.navigate(
        state.pendingEventId !== undefined || state.activeTravel !== undefined
          ? 'events'
          : 'market',
      );
    }
    return changed;
  }

  resolveEvent(choiceId: string, reasoning: string, mathAnswer?: number): boolean {
    return this.apply({ type: 'event.resolved', choiceId, reasoning, mathAnswer });
  }

  completeSeason(): boolean {
    const changed = this.apply({ type: 'season.completed' });
    if (changed) {
      this.navigate('results');
    }
    return changed;
  }

  pinEvidence(reference: Omit<EvidenceReference, 'pinnedAt'>): boolean {
    return this.apply({ type: 'evidence.pinned', reference });
  }

  unpinEvidence(evidenceId: string): boolean {
    return this.apply({ type: 'evidence.unpinned', evidenceId });
  }

  annotateLedger(ledgerEntryId: string, note: string): boolean {
    return this.apply({ type: 'ledger.annotated', ledgerEntryId, note });
  }

  updateReportSection(
    sectionId: string,
    response: string,
    evidenceIds: readonly string[],
    calculation: string,
  ): boolean {
    return this.apply({
      type: 'report.sectionUpdated',
      sectionId,
      response,
      evidenceIds,
      calculation,
    });
  }

  submitReport(): boolean {
    return this.apply({ type: 'report.submitted' });
  }

  teacherPauseToggle(): boolean {
    return this.apply({ type: 'teacher.pauseToggled' });
  }

  teacherInjectEvent(eventId: string): boolean {
    const changed = this.apply({ type: 'teacher.eventInjected', eventId });
    if (changed) {
      this.navigate('events');
    }
    return changed;
  }

  teacherSkipEvent(): boolean {
    return this.apply({ type: 'teacher.eventSkipped' });
  }

  teacherSetSeed(seed: number): boolean {
    return this.apply({ type: 'teacher.seedChanged', seed });
  }

  teacherSetDifficulty(difficulty: 'support' | 'standard' | 'challenge'): boolean {
    return this.apply({ type: 'teacher.difficultyChanged', difficulty });
  }

  restart(): boolean {
    const changed = this.apply({ type: 'simulation.restarted' });
    if (changed) {
      this.planning.clear();
      this.navigate('setup');
    }
    return changed;
  }

  clearSavedData(): void {
    this.persistence.clear(this.config.projectId, this.config.projectVersion);
    this.planning.clear();
    this.state.set(createSimulationState(this.config, this.state().seed));
    this.errors.set([]);
    this.saveState.set('saved');
  }

  dismissErrors(): void {
    this.errors.set([]);
  }

  money(cents: number, showPlus = false): string {
    return formatMoney(cents, showPlus);
  }

  private apply(action: SimulationDecisionAction): boolean {
    this.errors.set([]);
    const result = reduceSimulationDecision(this.config, this.state(), action);
    if (result.errors.length > 0) {
      this.errors.set(result.errors);
      return false;
    }
    this.state.set(result.state);
    this.persist(result.state);
    return true;
  }

  private persist(state: Readonly<SimulationDecisionState>): void {
    this.saveState.set(
      typeof navigator !== 'undefined' && !navigator.onLine ? 'offline_local' : 'saving',
    );
    try {
      this.persistence.save(state);
      this.saveState.set(
        typeof navigator !== 'undefined' && !navigator.onLine ? 'offline_local' : 'saved',
      );
    } catch {
      this.saveState.set('save_failed');
      this.errors.update((errors) => [...errors, 'This device could not save the latest change.']);
    }
  }
}
