import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { routeIsCompatible } from '../../domain/simulation-decision.engine';
import type { RouteDefinition } from '../../domain/simulation-decision.models';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';

@Component({
  selector: 'app-simulation-route-map',
  imports: [FormsModule],
  templateUrl: './route-map.component.html',
  styleUrl: './route-map.component.scss',
})
export class SimulationRouteMapComponent implements OnDestroy {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly reachableRoutes = computed(() =>
    this.runtime.config.routes.filter(
      (route) => route.fromLocationId === this.runtime.state().currentLocationId,
    ),
  );
  readonly selectedRouteId = signal(this.reachableRoutes()[0]?.id ?? '');
  readonly compareIds = signal<string[]>([]);
  readonly rationale = signal('');
  readonly reviewOpen = signal(false);
  readonly journeyLaunching = signal(false);
  readonly journeyDay = signal(this.runtime.state().currentDay);
  private launchTimer?: ReturnType<typeof setTimeout>;
  private dayTimer?: ReturnType<typeof setInterval>;
  readonly selectedRoute = computed(() =>
    this.reachableRoutes().find((route) => route.id === this.selectedRouteId()),
  );
  readonly selectedDestination = computed(() =>
    this.runtime.config.locations.find(
      (location) => location.id === this.selectedRoute()?.toLocationId,
    ),
  );

  ngOnDestroy(): void {
    clearTimeout(this.launchTimer);
    clearInterval(this.dayTimer);
  }

  locationName(id: string): string {
    return this.runtime.config.locations.find((location) => location.id === id)?.name ?? id;
  }

  routeName(id: string): string {
    return this.runtime.config.routes.find((route) => route.id === id)?.name ?? id;
  }

  routeDays(id: string): number {
    return this.runtime.config.routes.find((route) => route.id === id)?.estimatedDays ?? 0;
  }

  routeWeather(route: RouteDefinition): string {
    return (
      this.runtime.config.world.locations.find((scene) => scene.locationId === route.toLocationId)
        ?.weather ?? 'Weather uncertain'
    );
  }

  routeRumor(route: RouteDefinition): string {
    return (
      this.runtime.config.world.locations.find((scene) => scene.locationId === route.toLocationId)
        ?.stalls[0]?.rumor ?? 'No recent merchant reports.'
    );
  }

  journeyDuration(): string {
    return `${this.runtime.config.world.travelAnimationMs / 1000}s`;
  }

  compatible(route: RouteDefinition): boolean {
    return routeIsCompatible(this.runtime.config, this.runtime.state(), route);
  }

  selectRoute(routeId: string): void {
    this.selectedRouteId.set(routeId);
  }

  toggleCompare(routeId: string): void {
    this.compareIds.update((current) =>
      current.includes(routeId)
        ? current.filter((id) => id !== routeId)
        : current.length < 3
          ? [...current, routeId]
          : current,
    );
  }

  comparedRoutes(): readonly RouteDefinition[] {
    return this.reachableRoutes().filter((route) => this.compareIds().includes(route.id));
  }

  openReview(): void {
    const route = this.selectedRoute();
    if (route === undefined || !this.compatible(route)) {
      return;
    }
    if (this.rationale().trim().length < 12) {
      this.runtime.errors.set(['Explain why this route fits your plan before reviewing it.']);
      return;
    }
    this.reviewOpen.set(true);
  }

  commit(): void {
    const route = this.selectedRoute();
    if (route !== undefined && this.runtime.commitRoute(route.id, this.rationale())) {
      this.reviewOpen.set(false);
      this.journeyLaunching.set(true);
      const reducedMotion =
        typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration = reducedMotion ? 350 : this.runtime.config.world.travelAnimationMs;
      const startDay = this.runtime.state().currentDay;
      const stepMs = Math.max(250, duration / route.estimatedDays);
      this.dayTimer = setInterval(
        () => this.journeyDay.update((day) => Math.min(startDay + route.estimatedDays, day + 1)),
        stepMs,
      );
      this.launchTimer = setTimeout(() => {
        clearInterval(this.dayTimer);
        this.journeyLaunching.set(false);
        this.runtime.navigate('events');
      }, duration);
    }
  }

  pinSelected(): void {
    const route = this.selectedRoute();
    if (route === undefined) {
      return;
    }
    this.runtime.pinEvidence({
      id: `evidence-route-preview-${route.id}`,
      sourceType: 'route',
      sourceId: route.id,
      title: `Route comparison · ${route.name}`,
      summary: `${route.distanceMiles} miles, ${route.estimatedDays} days, ${route.risk} risk, supplies ${this.runtime.money(route.supplyCostCents)}.`,
    });
  }
}
