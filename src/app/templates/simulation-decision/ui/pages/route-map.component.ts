import {
  Component,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { choiceProgression, routeIsUnlocked } from '../../domain/choice-progression';
import {
  marketPrice,
  previewTrade,
  routeIsCompatible,
  routeProfitForecast,
} from '../../domain/simulation-decision.engine';
import type { RouteDefinition, RouteHistoryEntry } from '../../domain/simulation-decision.models';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';
import { ReviewDialogDirective } from '../review-dialog.directive';
import { RouteAtlasComponent, type AtlasTrail } from '../map/route-atlas.component';
import { ChoiceProgressionPanelComponent } from '../progression/choice-progression-panel.component';

@Component({
  selector: 'app-simulation-route-map',
  imports: [
    FormsModule,
    ReviewDialogDirective,
    RouteAtlasComponent,
    ChoiceProgressionPanelComponent,
  ],
  templateUrl: './route-map.component.html',
  styleUrl: './route-map.component.scss',
})
export class SimulationRouteMapComponent implements OnDestroy {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly plan = this.runtime.planning.at(this.runtime.state().currentLocationId);
  readonly progression = computed(() =>
    choiceProgression(this.runtime.config, this.runtime.state()),
  );
  readonly availableRouteCount = computed(
    () => this.progression().currentStage.availableRouteIds.length,
  );
  readonly reachableRoutes = computed(() =>
    this.runtime.config.routes.filter(
      (route) =>
        route.fromLocationId === this.runtime.state().currentLocationId &&
        routeIsUnlocked(this.runtime.config, this.runtime.state(), route.id),
    ),
  );
  readonly selectedRouteId = this.plan.routeId;
  readonly compareIds = this.plan.compareIds;
  readonly rationale = computed(() => this.plan.rationales()[this.selectedRouteId()] ?? '');
  readonly forecastSalesRevenueCents = computed(
    () => this.plan.forecastSalesRevenueCents()[this.selectedRouteId()],
  );
  readonly forecastTripProfitCents = computed(
    () => this.plan.forecastTripProfitCents()[this.selectedRouteId()],
  );
  readonly reviewOpen = signal(false);
  readonly journeyLaunching = signal(false);
  readonly compareOnly = signal(false);
  readonly historyOpen = signal(false);
  readonly plannerOpen = signal(this.selectedRouteId().length > 0);
  readonly atlas = viewChild(RouteAtlasComponent);
  readonly tripCard = viewChild<ElementRef<HTMLElement>>('tripCard');
  readonly historyPanel = viewChild<ElementRef<HTMLDetailsElement>>('historyPanel');
  private launchTimer?: ReturnType<typeof setTimeout>;
  readonly selectedRoute = computed(() =>
    this.reachableRoutes().find((route) => route.id === this.selectedRouteId()),
  );
  readonly selectedDestination = computed(() =>
    this.runtime.config.locations.find(
      (location) => location.id === this.selectedRoute()?.toLocationId,
    ),
  );
  readonly plannedTrade = computed(() =>
    previewTrade(this.runtime.config, this.runtime.state(), this.plan.draft()),
  );
  readonly profitForecast = computed(() => {
    const route = this.selectedRoute();
    return route === undefined
      ? undefined
      : routeProfitForecast(this.runtime.config, this.runtime.state(), route);
  });
  readonly forecastSalesCorrect = computed(() => {
    const answer = this.forecastSalesRevenueCents();
    const expected = this.profitForecast()?.expectedSalesRevenueCents;
    return (
      answer !== undefined &&
      expected !== undefined &&
      Math.abs(answer - expected) <=
        (this.runtime.config.routeForecastChallenge?.toleranceCents ?? 0)
    );
  });
  readonly forecastTripProfitCorrect = computed(() => {
    const answer = this.forecastTripProfitCents();
    const expected = this.profitForecast()?.expectedTripProfitCents;
    return (
      answer !== undefined &&
      expected !== undefined &&
      Math.abs(answer - expected) <=
        (this.runtime.config.routeForecastChallenge?.toleranceCents ?? 0)
    );
  });
  readonly forecastComplete = computed(
    () =>
      !this.runtime.config.routeForecastChallenge?.requiredBeforeDeparture ||
      (this.forecastSalesCorrect() && this.forecastTripProfitCorrect()),
  );
  readonly displayedRoutes = computed(() =>
    this.compareOnly()
      ? this.reachableRoutes().filter((route) => this.compareIds().includes(route.id))
      : this.reachableRoutes(),
  );
  readonly activeRoute = computed(() =>
    this.runtime.config.routes.find(
      (route) => route.id === this.runtime.state().activeTravel?.routeId,
    ),
  );
  readonly progress = computed(() =>
    Math.min(
      1,
      (this.runtime.state().activeTravel?.progressDays ?? 0) /
        (this.activeRoute()?.estimatedDays ?? 1),
    ),
  );
  readonly journeyHistory = computed(() => [...this.runtime.state().routeHistory].reverse());
  readonly visitedIds = computed(() => [
    this.runtime.config.startingLocationId,
    ...this.journeyHistory()
      .filter((entry) => entry.dayArrived !== undefined)
      .map((entry) => entry.knownInfoSnapshot.toLocationId),
  ]);
  readonly mapRouteId = computed(
    () =>
      this.activeRoute()?.id ?? (this.selectedRouteId() || this.journeyHistory()[0]?.routeId || ''),
  );
  readonly mapTravel = computed(() => {
    const route = this.activeRoute();
    return route
      ? {
          routeId: route.id,
          progress: this.progress(),
          icon: this.runtime.transport()?.icon ?? '◆',
        }
      : undefined;
  });
  readonly atlasTrails = computed<readonly AtlasTrail[]>(() =>
    this.runtime.config.routes.map((route) => ({
      route,
      compared: this.compareIds().includes(route.id),
      state:
        route.id === this.activeRoute()?.id
          ? 'traveling'
          : this.journeyHistory().some(
                (entry) => entry.routeId === route.id && entry.dayArrived !== undefined,
              )
            ? 'completed'
            : this.runtime.state().activeTravel ||
                route.fromLocationId !== this.runtime.state().currentLocationId
              ? 'inactive'
              : !routeIsUnlocked(this.runtime.config, this.runtime.state(), route.id)
                ? 'locked'
                : this.compatible(route)
                  ? 'available'
                  : 'unavailable',
    })),
  );
  readonly canDepart = computed(() => {
    const route = this.selectedRoute();
    return (
      route !== undefined &&
      this.progression().currentStageIndex === this.progression().stageCount - 1 &&
      this.forecastComplete() &&
      this.compatible(route) &&
      this.runtime.cash() >= route.supplyCostCents &&
      !this.runtime.state().activeTravel &&
      this.plan.draft().length === 0 &&
      !this.runtime.state().pendingEventId &&
      ['planning', 'active'].includes(this.runtime.state().status)
    );
  });
  private destroyed = false;
  ngOnDestroy(): void {
    this.destroyed = true;
    clearTimeout(this.launchTimer);
  }
  locationName(id: string): string {
    return this.runtime.config.locations.find((location) => location.id === id)?.name ?? id;
  }
  routeWeather(route: RouteDefinition): string {
    return (
      this.runtime.config.world.locations.find((scene) => scene.locationId === route.toLocationId)
        ?.weather ?? 'Weather uncertain'
    );
  }
  routeSource(route: RouteDefinition) {
    return this.runtime.config.world.locations.find(
      (scene) => scene.locationId === route.toLocationId,
    )?.stalls[0];
  }
  compatible(route: RouteDefinition): boolean {
    return routeIsCompatible(this.runtime.config, this.runtime.state(), route);
  }
  selectRoute(routeId: string): void {
    if (this.reachableRoutes().some((route) => route.id === routeId)) {
      this.selectedRouteId.set(routeId);
      this.plannerOpen.set(true);
      this.afterViewChange(() => this.atlas()?.focusRoute());
    } else if (this.journeyHistory().some((entry) => entry.routeId === routeId)) {
      this.showJourneyRecord();
    }
  }
  showTripDetails(): void {
    if (!this.reachableRoutes().length && this.journeyHistory().length) {
      this.showJourneyRecord();
      return;
    }
    this.plannerOpen.set(true);
    this.afterViewChange(() => this.focusPanel(this.tripCard()?.nativeElement));
  }
  closePlanner(): void {
    this.plannerOpen.set(false);
    this.afterViewChange(() => this.atlas()?.focusSelected());
  }
  showJourneyRecord(): void {
    this.historyOpen.set(true);
    this.focusPanel(this.historyPanel()?.nativeElement);
  }
  syncHistory(event: Event): void {
    if (event.target instanceof HTMLDetailsElement) this.historyOpen.set(event.target.open);
  }
  private focusPanel(element: HTMLElement | undefined): void {
    const reducedMotion =
      typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    element?.scrollIntoView?.({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
    element?.focus({ preventScroll: true });
  }
  private afterViewChange(callback: () => void): void {
    queueMicrotask(() => {
      if (!this.destroyed) callback();
    });
  }
  pinHistory(entry: RouteHistoryEntry): void {
    const route = entry.knownInfoSnapshot;
    const forecastSummary = entry.forecast
      ? ` Forecast sales ${this.runtime.money(entry.forecast.studentSalesRevenueCents)} and trip profit ${this.runtime.money(entry.forecast.studentTripProfitCents, true)}; both checks correct.`
      : '';
    this.runtime.pinEvidence({
      id: this.historyEvidenceId(entry),
      sourceType: 'route',
      sourceId: entry.id,
      title: `Journey record · ${route.name}`,
      summary: `Departed day ${entry.dayStarted}; ${entry.dayArrived !== undefined ? 'arrived day ' + entry.dayArrived : 'still traveling'}. Planned ${route.estimatedDays} days, ${route.distanceMiles} miles, ${this.runtime.money(route.supplyCostCents)} supplies.${forecastSummary} Reason: ${entry.rationale}`,
    });
  }
  historyEvidenceId(entry: RouteHistoryEntry): string {
    return `evidence-journey-${entry.id}-${entry.dayArrived === undefined ? 'departure' : 'arrival'}`;
  }
  historyPinned(entry: RouteHistoryEntry): boolean {
    return this.runtime.state().evidence.some((item) => item.id === this.historyEvidenceId(entry));
  }
  setRationale(value: string): void {
    this.plan.rationales.update((notes) => ({ ...notes, [this.selectedRouteId()]: value }));
  }
  setForecastSalesRevenue(value: number | string | null): void {
    this.setForecastValue(this.plan.forecastSalesRevenueCents, value);
  }
  setForecastTripProfit(value: number | string | null): void {
    this.setForecastValue(this.plan.forecastTripProfitCents, value);
  }
  destinationSellPrice(goodId: string): number {
    const destinationId = this.selectedRoute()?.toLocationId;
    return destinationId === undefined
      ? 0
      : (marketPrice(this.runtime.config, destinationId, goodId, 'sell') ?? 0);
  }
  goodName(goodId: string): string {
    return this.runtime.config.goods.find((good) => good.id === goodId)?.name ?? goodId;
  }
  toggleCompare(routeId: string): void {
    this.compareIds.update((ids) =>
      ids.includes(routeId)
        ? ids.filter((id) => id !== routeId)
        : ids.length < 3
          ? [...ids, routeId]
          : ids,
    );
    if (this.compareIds().length < 2) this.compareOnly.set(false);
  }
  arrivalDay(route: RouteDefinition): number {
    return this.runtime.state().currentDay + route.estimatedDays;
  }
  openReview(): void {
    if (!this.canDepart()) return;
    if (this.rationale().trim().length < 12) {
      this.runtime.errors.set(['Explain why this route fits your plan before reviewing it.']);
      return;
    }
    this.reviewOpen.set(true);
  }
  commit(): void {
    const route = this.selectedRoute();
    if (!this.reviewOpen() || !this.canDepart() || !route) return;
    const salesRevenueCents = this.forecastSalesRevenueCents();
    const tripProfitCents = this.forecastTripProfitCents();
    const forecast =
      salesRevenueCents === undefined || tripProfitCents === undefined
        ? undefined
        : { salesRevenueCents, tripProfitCents };
    if (this.runtime.commitRoute(route.id, this.rationale(), forecast)) {
      this.reviewOpen.set(false);
      const journey = this.runtime.state().routeHistory.at(-1);
      if (journey !== undefined) this.pinHistory(journey);
      if (this.runtime.saveState() === 'save_failed') return;
      this.journeyLaunching.set(true);
      const reducedMotion =
        typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.launchTimer = setTimeout(() => this.runtime.navigate('events'), reducedMotion ? 0 : 900);
    }
  }
  pinSelected(): void {
    const route = this.selectedRoute();
    if (!route) return;
    this.runtime.pinEvidence({
      id: `evidence-route-preview-${route.id}`,
      sourceType: 'route',
      sourceId: route.id,
      title: `Route comparison · ${route.name}`,
      summary: `${route.distanceMiles} miles, ${route.estimatedDays} days, ${route.risk} risk, supplies ${this.runtime.money(route.supplyCostCents)}. Destination report: ${route.demandClue}`,
    });
  }

  private setForecastValue(
    target: typeof this.plan.forecastSalesRevenueCents,
    value: number | string | null,
  ): void {
    const numeric = typeof value === 'number' ? value : Number(value);
    const cents =
      value === null || value === '' || !Number.isFinite(numeric)
        ? undefined
        : Math.round(numeric * 100);
    target.update((answers) => ({ ...answers, [this.selectedRouteId()]: cents }));
  }
}
