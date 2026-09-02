import { Component, computed, inject, signal } from '@angular/core';
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
export class SimulationRouteMapComponent {
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
  readonly selectedRoute = computed(() =>
    this.reachableRoutes().find((route) => route.id === this.selectedRouteId()),
  );
  readonly selectedDestination = computed(() =>
    this.runtime.config.locations.find(
      (location) => location.id === this.selectedRoute()?.toLocationId,
    ),
  );

  locationName(id: string): string {
    return this.runtime.config.locations.find((location) => location.id === id)?.name ?? id;
  }

  routeName(id: string): string {
    return this.runtime.config.routes.find((route) => route.id === id)?.name ?? id;
  }

  routeDays(id: string): number {
    return this.runtime.config.routes.find((route) => route.id === id)?.estimatedDays ?? 0;
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
