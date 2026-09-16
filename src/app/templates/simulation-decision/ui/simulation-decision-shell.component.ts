import { bindLessonFocus } from '../../../shared/project-lessons/project-lesson-focus';
import { WorkspaceToolsComponent } from '../../../shared/project-lessons/workspace-tools.component';
import { ExpeditionWorkspaceComponent } from './expedition/expedition-workspace.component';
import { NgTemplateOutlet } from '@angular/common';
import {
  SIMULATION_DECISION_PROJECT_ROUTE,
  SIMULATION_DECISION_FINAL_EXAMPLE_ROUTE,
} from '../runtime/simulation-decision.tokens';
import { ReviewDialogDirective } from './review-dialog.directive';
import {
  afterEveryRender,
  afterNextRender,
  Component,
  computed,
  ElementRef,
  HostListener,
  Injector,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';

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
import { TradeWorldPanelComponent } from './map/trade-world-panel.component';

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

interface ResourceFeedback {
  direction: 'positive' | 'negative' | 'neutral';
  icon: string;
  title: string;
  lines: readonly string[];
}

@Component({
  selector: 'app-simulation-decision-shell',
  imports: [WorkspaceToolsComponent, ExpeditionWorkspaceComponent,
    NgTemplateOutlet,
    ReviewDialogDirective,
    TradeWorldPanelComponent,
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
  styleUrls: ['./simulation-decision-shell.component.scss', './simulation-project-header.scss'],
})
export class SimulationDecisionShellComponent implements OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  readonly routePage = viewChild(SimulationRouteMapComponent);
  readonly projectRoute = inject(SIMULATION_DECISION_PROJECT_ROUTE, { optional: true });
  readonly finalExampleRoute = inject(SIMULATION_DECISION_FINAL_EXAMPLE_ROUTE, { optional: true });
  private previousView?: SimulationView;
  private previousCash?: number;
  private previousCargo?: number;
  private feedbackTimer?: ReturnType<typeof setTimeout>;
  private missionFocusTimer?: ReturnType<typeof setTimeout>;
  constructor() {
    bindLessonFocus((lesson) => {
      if (this.runtime.config.expeditionCourse) return;
      const target = lesson.focusTarget;
      if (target === 'market' || target === 'route' || target === 'events' || target === 'ledger' || target === 'report' || target === 'showcase') this.navigate(target);
    });
    afterEveryRender(() => {
      const view = this.runtime.state().lastView;
      if (this.runtime.state().status !== 'not_started') {
        if (view !== this.previousView) {
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
    { view: 'route', label: 'Map', icon: '⌁' },
    { view: 'market', label: 'Shop', icon: '▦' },
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
    this.element.nativeElement
      .querySelectorAll<HTMLDetailsElement>('.unified-project-header details[open]')
      .forEach((menu) => (menu.open = false));
    this.runtime.navigate(view);
  }

  headerClick(event: MouseEvent): void {
    const summary = (event.target as Element).closest('summary');
    const selected = summary?.parentElement;
    if (!selected?.matches('.header-menu, .map-options, .world-menu')) return;
    this.element.nativeElement
      .querySelectorAll<HTMLDetailsElement>('.unified-project-header details[open]')
      .forEach((menu) => {
        if (menu !== selected) menu.open = false;
      });
  }

  @HostListener('document:keydown.escape')
  closeHeaderMenus(): void {
    if (this.helpOpen() || this.teacherConfirmOpen()) return;
    const menus = this.element.nativeElement.querySelectorAll<HTMLDetailsElement>(
      '.unified-project-header details[open]',
    );
    const first = menus[0];
    menus.forEach((menu) => (menu.open = false));
    first?.querySelector('summary')?.focus();
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
    if (mission.actionView === 'route') {
      afterNextRender(
        () => {
          const page = this.routePage();
          if (
            mission.focusSelector === '.trip-card' ||
            mission.focusSelector === '.forecast-challenge'
          ) {
            page?.predictionOpen.set(false);
            page?.showTripDetails(mission.focusSelector === '.forecast-challenge');
          } else {
            page?.atlas()?.svg()?.nativeElement.focus({ preventScroll: true });
          }
        },
        { injector: this.injector },
      );
      return;
    }
    if (mission.focusSelector === undefined) return;
    clearTimeout(this.missionFocusTimer);
    this.missionFocusTimer = setTimeout(() => this.focusMissionTarget(mission.focusSelector!), 180);
  }

  private focusMissionTarget(selector: string): void {
    const target = this.element.nativeElement.querySelector<HTMLElement | SVGElement>(selector);
    if (target === null) return;
    const reduced =
      typeof matchMedia !== 'function' || matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView?.({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
    if (target instanceof HTMLElement && !target.matches('button, a, input, textarea, select')) {
      target.tabIndex = -1;
    }
    if (target instanceof HTMLElement) target.focus({ preventScroll: true });
    if (!reduced) {
      target.animate?.(
        [
          { filter: 'brightness(1)', transform: 'scale(1)' },
          { filter: 'brightness(1.22)', transform: 'scale(1.015)', offset: 0.45 },
          { filter: 'brightness(1)', transform: 'scale(1)' },
        ],
        { duration: 850, easing: 'ease-out' },
      );
    }
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
      title: cashChange > 0 ? 'Money earned' : cashChange < 0 ? 'Money spent' : 'Wagon updated',
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
        title: 'Choose what to do on the trail',
        description: 'Read what happened. Check the costs, then explain your choice.',
        actionLabel: 'See what happened',
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
        title: 'Travel to the next town',
        description:
          'Press “Travel next day” on the map. Stop and make a choice if something happens.',
        actionLabel: 'Show my trip',
        actionView: 'route',
        focusSelector: '.trip-card',
        current: state.activeTravel.progressDays,
        target: route?.estimatedDays ?? 1,
        progressLabel: `${state.activeTravel.progressDays} of ${route?.estimatedDays ?? 1} travel days`,
      };
    }
    if (state.status === 'submitted') {
      return {
        eyebrow: 'Mission complete',
        title: 'Share your story',
        description: 'Tell the class what you bought, what happened, and what you learned.',
        actionLabel: 'See my work',
        actionView: 'showcase',
      };
    }
    if (state.status === 'season_complete') {
      return {
        eyebrow: 'Final chapter',
        title: 'See how you did',
        description: 'Look at your score. Then explain one choice you made.',
        actionLabel: 'See my score',
        actionView: 'results',
      };
    }

    const progression = choiceProgression(this.runtime.config, state);
    const requirement = progression.nextRequirements.find((item) => !item.complete);
    if (
      state.routeHistory.length === 0 &&
      !this.plannedRouteId() &&
      progression.currentStage.availableRouteIds.length
    ) {
      return {
        eyebrow: '1 · Choose a town',
        title: 'Choose a town',
        description:
          'Click a bright town or a travel-price sign. Look at the cost and number of days.',
        actionLabel: 'Show the map',
        actionView: 'route',
      };
    }
    if (this.runtime.planning.at(state.currentLocationId).draft().length) {
      return {
        eyebrow: '2 · Buy goods',
        title: 'Finish your shopping',
        description: 'Your items are not bought or sold yet. Check the total, then confirm.',
        actionLabel: 'Check my items',
        actionView: 'market',
        focusSelector: '.trade-builder',
      };
    }
    if (requirement?.key === 'minimumDiscoveredStalls') {
      const remaining = requirement.target - requirement.current;
      return {
        eyebrow: `Mission ${progression.currentStageIndex + 1} · Learn the post`,
        title: `Visit ${requirement.target} shops`,
        description:
          remaining === 1
            ? 'Open one more shop. Look at what it sells and read the shopkeeper’s tip.'
            : 'Click a shop door. Look at what it sells, then visit another shop.',
        actionLabel: 'Go to the shops',
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
        title: 'Choose a town',
        description: 'Click a bright town on the map. Compare the cost and travel days.',
        actionLabel: 'Show the map',
        actionView: 'route',
        focusSelector: 'app-route-atlas .map-node:not(.unavailable)',
      };
    }
    if (requirement?.key === 'minimumPurchasedGoodTypes') {
      return {
        eyebrow: 'Step 3 · Buy goods',
        title: `Buy ${requirement.target} kinds of goods`,
        description:
          'Choose an item, pick how many, and check the price. Save enough money for your trip.',
        actionLabel: 'Go shopping',
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
        eyebrow: '3 · Check and travel',
        title: 'Check your trip math',
        description:
          'First find how much you could earn from selling. Then subtract what you spent.',
        actionLabel: 'Check my math',
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
        title: 'Get ready to travel',
        description: 'Write why you chose this town. Check your plan, then start your trip.',
        actionLabel: 'Open my trip',
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
        title: 'Sell your goods',
        description: 'You arrived! Open a shop, choose an item you own, and press Sell.',
        actionLabel: 'Go sell my goods',
        actionView: 'market',
        focusSelector: '.stall',
      };
    }
    if (arrived && hasSale) {
      return {
        eyebrow: 'Final step',
        title: 'Finish and see your score',
        description:
          'You made a trip and sold goods. You can finish now or sell more of what is in your wagon.',
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
