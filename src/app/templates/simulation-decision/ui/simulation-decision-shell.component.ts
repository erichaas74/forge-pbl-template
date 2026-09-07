import { TaskGuideComponent } from '../../../shared/learning/task-guide.component';
import {
  afterEveryRender,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';

import { ChoiceProgressionPanelComponent } from './progression/choice-progression-panel.component';
import { choiceProgression } from '../domain/choice-progression';
import { routeProfitForecast } from '../domain/simulation-decision.engine';
import type { SimulationView } from '../domain/simulation-decision.models';
import { SimulationDecisionRuntimeService } from '../runtime/simulation-decision-runtime.service';
import { SimulationCargoViewComponent } from './pages/cargo-view.component';
import { SimulationCompanySetupComponent } from './pages/company-setup.component';
import { SimulationEventDecisionComponent } from './pages/event-decision.component';
import { SimulationFinalShowcaseComponent } from './pages/final-showcase.component';
import { SimulationMarketViewComponent } from './pages/market-view.component';
import { SimulationRouteMapComponent } from './pages/route-map.component';
import { SimulationSeasonResultsComponent } from './pages/season-results.component';
import { SimulationStrategyReportComponent } from './pages/strategy-report.component';
import { SimulationTeacherControlComponent } from './pages/teacher-control.component';
import { SimulationTradeLedgerComponent } from './pages/trade-ledger.component';

type StudentSpace = 'plan' | 'travel' | 'finish';

interface PrimaryNavigationItem {
  space: StudentSpace;
  label: string;
  icon: string;
}

interface ContextNavigationItem {
  view: SimulationView;
  label: string;
  icon: string;
}

interface NextMission {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  actionView: SimulationView;
  current?: number;
  target?: number;
  progressLabel?: string;
  focusSelector?: string;
  action?: 'navigate' | 'complete-season';
}

interface SceneTransition {
  icon: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

interface ResourceFeedback {
  direction: 'positive' | 'negative' | 'neutral';
  icon: string;
  title: string;
  lines: readonly string[];
}

@Component({
  selector: 'app-simulation-decision-shell',
  imports: [
    TaskGuideComponent,
    ChoiceProgressionPanelComponent,
    SimulationCargoViewComponent,
    SimulationCompanySetupComponent,
    SimulationEventDecisionComponent,
    SimulationFinalShowcaseComponent,
    SimulationMarketViewComponent,
    SimulationRouteMapComponent,
    SimulationSeasonResultsComponent,
    SimulationStrategyReportComponent,
    SimulationTeacherControlComponent,
    SimulationTradeLedgerComponent,
  ],
  templateUrl: './simulation-decision-shell.component.html',
  styleUrl: './simulation-decision-shell.component.scss',
})
export class SimulationDecisionShellComponent implements OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private previousView?: SimulationView;
  private previousCash?: number;
  private previousCargo?: number;
  private transitionTimer?: ReturnType<typeof setTimeout>;
  private feedbackTimer?: ReturnType<typeof setTimeout>;
  private missionFocusTimer?: ReturnType<typeof setTimeout>;
  constructor() {
    afterEveryRender(() => {
      const view = this.runtime.state().lastView;
      if (this.runtime.state().status !== 'not_started') {
        if (view !== this.previousView) {
          if (this.previousView !== undefined) this.showSceneTransition(view);
          this.previousView = view;
          const workspace = this.element.nativeElement.querySelector<HTMLElement>('.workspace');
          this.element.nativeElement.ownerDocument.defaultView?.scrollTo({
            top: 0,
            behavior: 'instant',
          });
          workspace?.focus({ preventScroll: true });
        }
        this.showResourceChange();
      }
    });
  }
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly progression = computed(() =>
    choiceProgression(this.runtime.config, this.runtime.state()),
  );
  readonly helpOpen = signal(false);
  readonly teacherConfirmOpen = signal(false);
  readonly sceneTransition = signal<SceneTransition | undefined>(undefined);
  readonly resourceFeedback = signal<ResourceFeedback | undefined>(undefined);
  readonly cashFeedbackActive = computed(
    () => this.resourceFeedback()?.lines.some((line) => line.startsWith('Cash')) ?? false,
  );
  readonly cargoFeedbackActive = computed(
    () => this.resourceFeedback()?.lines.some((line) => line.startsWith('Cargo')) ?? false,
  );
  readonly primaryNavigation: readonly PrimaryNavigationItem[] = [
    { space: 'plan', label: 'Plan Trip', icon: '⌁' },
    { space: 'travel', label: 'Travel', icon: '!' },
    { space: 'finish', label: 'Finish', icon: '★' },
  ];
  readonly expeditionNavigation: readonly ContextNavigationItem[] = [
    { view: 'route', label: 'Choose Route', icon: '⌁' },
    { view: 'market', label: 'Shops & Goods', icon: '▦' },
    { view: 'cargo', label: 'Check Wagon', icon: '▣' },
  ];
  readonly journalNavigation: readonly ContextNavigationItem[] = [
    { view: 'ledger', label: 'Money Record', icon: '≡' },
    { view: 'results', label: 'My Score', icon: '★' },
    { view: 'report', label: 'My Reflection', icon: '✎' },
    { view: 'showcase', label: 'Showcase', icon: '✦' },
  ];
  readonly currentSpace = computed<StudentSpace | 'teacher'>(() =>
    this.spaceForView(this.runtime.state().lastView),
  );
  readonly contextNavigation = computed<readonly ContextNavigationItem[]>(() => {
    if (this.currentSpace() === 'plan') return this.expeditionNavigation;
    if (this.currentSpace() === 'finish') return this.journalNavigation;
    return [];
  });
  readonly contextTitle = computed(() =>
    this.currentSpace() === 'plan' ? 'Plan Your Trip' : 'Finish the Season',
  );
  readonly plannedRouteId = computed(() =>
    this.runtime.planning.at(this.runtime.state().currentLocationId).routeId(),
  );
  readonly plannedRoute = computed(() =>
    this.runtime.config.routes.find(
      (route) =>
        route.id === this.plannedRouteId() &&
        route.fromLocationId === this.runtime.state().currentLocationId,
    ),
  );
  readonly routeForecastCorrectCount = computed(() => {
    const rule = this.runtime.config.routeForecastChallenge;
    if (!rule?.requiredBeforeDeparture) return 2;
    const route = this.plannedRoute();
    if (route === undefined) return 0;
    const plan = this.runtime.planning.at(this.runtime.state().currentLocationId);
    const salesAnswer = plan.forecastSalesRevenueCents()[route.id];
    const profitAnswer = plan.forecastTripProfitCents()[route.id];
    const expected = routeProfitForecast(this.runtime.config, this.runtime.state(), route);
    return [
      salesAnswer !== undefined &&
        Math.abs(salesAnswer - expected.expectedSalesRevenueCents) <= rule.toleranceCents,
      profitAnswer !== undefined &&
        Math.abs(profitAnswer - expected.expectedTripProfitCents) <= rule.toleranceCents,
    ].filter(Boolean).length;
  });
  readonly routeForecastReady = computed(() => this.routeForecastCorrectCount() === 2);
  readonly nextMission = computed<NextMission>(() => this.buildNextMission());
  readonly phase = computed(() => {
    const day = this.runtime.state().currentDay;
    if (
      this.runtime.state().status === 'season_complete' ||
      this.runtime.state().status === 'submitted'
    ) {
      return 'Season complete';
    }
    if (day <= 3) return 'Planning';
    if (day <= 7) return 'Trading';
    if (day <= 10) return 'Expansion';
    return 'Final push';
  });
  readonly cargoPercent = computed(() =>
    this.runtime.capacity() === 0
      ? 0
      : Math.min(100, Math.round((this.runtime.usedCargo() / this.runtime.capacity()) * 100)),
  );
  readonly seasonPercent = computed(() =>
    Math.min(
      100,
      Math.max(
        0,
        Math.round((this.runtime.state().currentDay / this.runtime.config.maxSeasonDays) * 100),
      ),
    ),
  );
  ngOnDestroy(): void {
    clearTimeout(this.transitionTimer);
    clearTimeout(this.feedbackTimer);
    clearTimeout(this.missionFocusTimer);
  }

  @HostListener('document:keydown', ['$event'])
  useGameShortcut(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      target?.matches('input, textarea, select, [contenteditable="true"]')
    ) {
      return;
    }
    const space = this.primaryNavigation[Number(event.key) - 1]?.space;
    if (space === undefined) return;
    event.preventDefault();
    this.navigateSpace(space);
  }

  navigate(view: SimulationView): void {
    this.runtime.navigate(view);
  }

  navigateSpace(space: StudentSpace): void {
    if (this.currentSpace() === space) return;
    if (space === 'travel') {
      this.navigate('events');
      return;
    }
    if (space === 'finish') {
      this.navigate(this.locked('results') ? 'ledger' : 'results');
      return;
    }
    this.navigate('route');
  }

  spaceForView(view: SimulationView): StudentSpace | 'teacher' {
    if (view === 'teacher') return 'teacher';
    if (view === 'events') return 'travel';
    if (['ledger', 'results', 'report', 'showcase'].includes(view)) return 'finish';
    return 'plan';
  }

  missionProgressPercent(): number {
    const mission = this.nextMission();
    if (mission.current === undefined || mission.target === undefined || mission.target === 0) {
      return 0;
    }
    return Math.min(100, Math.round((mission.current / mission.target) * 100));
  }

  locked(view: SimulationView): boolean {
    return (
      (view === 'results' || view === 'showcase') &&
      this.runtime.state().status !== 'season_complete' &&
      this.runtime.state().status !== 'submitted'
    );
  }

  teacherTools(): void {
    if (this.runtime.state().lastView === 'teacher') {
      this.runtime.navigate(this.runtime.state().pendingEventId ? 'events' : 'market');
      return;
    }
    this.teacherConfirmOpen.set(true);
  }

  enterTeacherTools(): void {
    this.teacherConfirmOpen.set(false);
    this.runtime.navigate('teacher');
  }

  saveLabel(): string {
    const labels = {
      saved: 'Saved locally',
      saving: 'Saving…',
      offline_local: 'Saved on device',
      save_failed: 'Save failed',
    } as const;
    return labels[this.runtime.saveState()];
  }

  runNextMission(): void {
    const mission = this.nextMission();
    if (mission.action === 'complete-season') {
      this.runtime.completeSeason();
      return;
    }
    if (mission.actionView === 'market' && mission.focusSelector?.includes('supplies')) {
      this.runtime.planning.at(this.runtime.state().currentLocationId).showAll.set(true);
    }
    this.navigate(mission.actionView);
    if (mission.focusSelector === undefined) return;
    clearTimeout(this.missionFocusTimer);
    this.missionFocusTimer = setTimeout(() => this.focusMissionTarget(mission.focusSelector!), 180);
  }

  private focusMissionTarget(selector: string): void {
    const target = this.element.nativeElement.querySelector<HTMLElement | SVGElement>(selector);
    if (target === null) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (target instanceof HTMLElement && !target.matches('button, a, input, textarea, select')) {
      target.tabIndex = -1;
    }
    if (target instanceof HTMLElement) target.focus({ preventScroll: true });
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.animate(
        [
          { filter: 'brightness(1)', transform: 'scale(1)' },
          { filter: 'brightness(1.22)', transform: 'scale(1.015)', offset: 0.45 },
          { filter: 'brightness(1)', transform: 'scale(1)' },
        ],
        { duration: 850, easing: 'ease-out' },
      );
    }
  }

  private showSceneTransition(view: SimulationView): void {
    const location = this.runtime.currentLocation()?.shortName ?? 'Frontier';
    const scenes: Record<SimulationView, SceneTransition> = {
      setup: { icon: '✥', eyebrow: 'New company', title: 'Start Your Company', subtitle: location },
      market: {
        icon: '▦',
        eyebrow: 'Trading post',
        title: `${location} Market`,
        subtitle: 'Prices and opportunities have changed',
      },
      cargo: {
        icon: '▣',
        eyebrow: 'Wagon check',
        title: 'Wagon Load',
        subtitle: 'Check what fits before you travel',
      },
      route: {
        icon: '⌁',
        eyebrow: 'Trip plan',
        title: 'Choose Your Route',
        subtitle: `Leaving from ${location}`,
      },
      events: {
        icon: '!',
        eyebrow: this.runtime.state().pendingEventId ? 'Decision required' : 'On the trail',
        title: this.runtime.state().pendingEventId ? 'Trail Challenge' : 'Journey',
        subtitle: this.runtime.state().pendingEventId
          ? 'Travel stops until you choose'
          : 'Advance toward the next checkpoint',
      },
      ledger: {
        icon: '≡',
        eyebrow: 'Game records',
        title: 'Money Record',
        subtitle: 'See where every dollar changed',
      },
      results: {
        icon: '★',
        eyebrow: 'Final score',
        title: 'My Score',
        subtitle: 'See points for trading, math, and explaining',
      },
      report: {
        icon: '✎',
        eyebrow: 'Four questions',
        title: 'My Reflection',
        subtitle: 'Explain what you chose and learned',
      },
      showcase: {
        icon: '✦',
        eyebrow: 'Company defense',
        title: 'Final Showcase',
        subtitle: 'Present the plan, mathematics, revision, and evidence',
      },
      teacher: {
        icon: '⚙',
        eyebrow: 'Facilitator view',
        title: 'Teacher Controls',
        subtitle: 'Local classroom controls',
      },
    };
    this.sceneTransition.set(scenes[view]);
    clearTimeout(this.transitionTimer);
    this.transitionTimer = setTimeout(() => this.sceneTransition.set(undefined), 900);
  }

  private showResourceChange(): void {
    const cash = this.runtime.cash();
    const cargo = this.runtime.usedCargo();
    if (this.previousCash === undefined || this.previousCargo === undefined) {
      this.previousCash = cash;
      this.previousCargo = cargo;
      return;
    }
    const cashChange = cash - this.previousCash;
    const cargoChange = cargo - this.previousCargo;
    this.previousCash = cash;
    this.previousCargo = cargo;
    if (cashChange === 0 && cargoChange === 0) return;

    const lines: string[] = [];
    if (cashChange !== 0) lines.push(`Cash ${this.runtime.money(cashChange, true)}`);
    if (cargoChange !== 0) lines.push(`Cargo ${cargoChange > 0 ? '+' : ''}${cargoChange} spaces`);
    this.resourceFeedback.set({
      direction: cashChange > 0 ? 'positive' : cashChange < 0 ? 'negative' : 'neutral',
      icon: cashChange > 0 ? '↑' : cashChange < 0 ? '↓' : '▣',
      title:
        cashChange > 0 ? 'Company gain' : cashChange < 0 ? 'Resources committed' : 'Wagon updated',
      lines,
    });
    clearTimeout(this.feedbackTimer);
    this.feedbackTimer = setTimeout(() => this.resourceFeedback.set(undefined), 1700);
  }

  private buildNextMission(): NextMission {
    const state = this.runtime.state();
    if (state.pendingEventId !== undefined || state.status === 'event_pending') {
      return {
        eyebrow: 'Trail decision',
        title: 'Resolve the current challenge',
        description: 'Use the known facts and show the required reasoning before travel continues.',
        actionLabel: 'Open Journey',
        actionView: 'events',
        focusSelector: '.event-layout',
      };
    }
    if (state.activeTravel !== undefined) {
      const route = this.runtime.config.routes.find(
        (item) => item.id === state.activeTravel?.routeId,
      );
      return {
        eyebrow: 'Journey in progress',
        title: 'Reach the next checkpoint',
        description: 'Advance one travel day and prepare for a route event.',
        actionLabel: 'Continue Journey',
        actionView: 'events',
        focusSelector: '.travel-controls',
        current: state.activeTravel.progressDays,
        target: route?.estimatedDays ?? 1,
        progressLabel: `${state.activeTravel.progressDays} of ${route?.estimatedDays ?? 1} travel days`,
      };
    }
    if (state.status === 'submitted') {
      return {
        eyebrow: 'Mission complete',
        title: 'Present your company strategy',
        description:
          'Your official work is locked and ready for a timed defense with another group.',
        actionLabel: 'Open Final Showcase',
        actionView: 'showcase',
      };
    }
    if (state.status === 'season_complete') {
      return {
        eyebrow: 'Final chapter',
        title: 'Explain your season result',
        description:
          'Review the final numbers, then use records and calculations in your strategy.',
        actionLabel: 'Open Season Results',
        actionView: 'results',
      };
    }

    const progression = choiceProgression(this.runtime.config, state);
    const requirement = progression.nextRequirements.find((item) => !item.complete);
    if (requirement?.key === 'minimumDiscoveredStalls') {
      const remaining = requirement.target - requirement.current;
      return {
        eyebrow: `Mission ${progression.currentStageIndex + 1} · Learn the post`,
        title: 'Visit two shops',
        description:
          remaining === 1
            ? 'Choose one more glowing shop and read what the merchant knows.'
            : 'Visit the General Store and one more shop. Each shop reveals goods and a clue.',
        actionLabel: 'Find the next shop, then select it',
        actionView: 'market',
        focusSelector: '.stall.mission-target',
        current: requirement.current,
        target: requirement.target,
        progressLabel: `${requirement.current} of ${requirement.target} merchants visited`,
      };
    }
    if (state.routeHistory.length === 0 && this.plannedRouteId().length === 0) {
      return {
        eyebrow: 'Step 2 · Choose a destination',
        title: 'Pick your route',
        description: 'Compare travel cost, days, and destination needs. Select one route to plan.',
        actionLabel: 'Show the routes',
        actionView: 'route',
        focusSelector: 'app-route-atlas .map-node:not(.unavailable)',
      };
    }
    if (requirement?.key === 'minimumPurchasedGoodTypes') {
      return {
        eyebrow: 'Step 3 · Buy goods',
        title: 'Buy two kinds of goods',
        description:
          'Choose two route-matched goods. Keep the shown travel money before confirming the trade.',
        actionLabel: 'Show recommended goods',
        actionView: 'market',
        focusSelector: '[data-mission-target="supplies"]',
        current: requirement.current,
        target: requirement.target,
        progressLabel: `${requirement.current} of ${requirement.target} kinds bought`,
      };
    }
    if (
      state.routeHistory.length === 0 &&
      this.plannedRouteId().length > 0 &&
      !this.routeForecastReady()
    ) {
      return {
        eyebrow: 'Step 4 · Harder math',
        title: 'Predict your trip profit',
        description:
          'Calculate your destination sales total, then subtract goods and travel costs.',
        actionLabel: 'Open profit forecast',
        actionView: 'route',
        focusSelector: '.forecast-challenge',
        current: this.routeForecastCorrectCount(),
        target: 2,
        progressLabel: `${this.routeForecastCorrectCount()} of 2 forecast checks correct`,
      };
    }
    if (state.routeHistory.length === 0) {
      return {
        eyebrow: 'Step 5 · Check and depart',
        title: 'Review your trip plan',
        description:
          'Check your route, money, and two kinds of goods. Then explain your choice and depart.',
        actionLabel: 'Review and depart',
        actionView: 'route',
        focusSelector: '.trip-card',
      };
    }
    const arrived = state.routeHistory.some((entry) => entry.dayArrived !== undefined);
    const hasCargo = state.inventory.some((item) => item.quantity > 0);
    const hasSale = state.ledger.some((entry) => entry.type === 'sale');
    if (arrived && hasCargo && !hasSale) {
      return {
        eyebrow: 'Destination mission',
        title: 'Sell the cargo strategically',
        description:
          'Compare destination prices, test quantities, and keep the strongest profit plan.',
        actionLabel: 'Open Destination Market',
        actionView: 'market',
        focusSelector: '.stall',
      };
    }
    if (arrived && hasSale) {
      return {
        eyebrow: 'Final step',
        title: 'Finish and see your score',
        description:
          'Your route is complete and a sale is recorded. Finish the season to see all three score parts.',
        actionLabel: 'Finish and see my score',
        actionView: 'results',
        action: 'complete-season',
      };
    }
    if (arrived && !hasCargo) {
      return {
        eyebrow: 'Final step',
        title: 'Finish and see your score',
        description: 'Your route is complete. Finish the season and review what happened.',
        actionLabel: 'Finish and see my score',
        actionView: 'results',
        action: 'complete-season',
      };
    }
    return {
      eyebrow: 'Next step',
      title: 'Check your money record',
      description: 'Review the money changes and the records saved for your reflection.',
      actionLabel: 'Open money record',
      actionView: 'ledger',
    };
  }
}
