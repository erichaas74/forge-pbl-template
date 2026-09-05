import { Component, ElementRef, computed, input, output, signal, viewChild } from '@angular/core';
import type { LocationDefinition, RouteDefinition } from '../../domain/simulation-decision.models';
import { FULL_MAP, boundedMapView, fitMapBounds, mapViewBox, type MapView } from './map-viewport';

export interface AtlasTrail {
  route: RouteDefinition;
  state: 'available' | 'unavailable' | 'locked' | 'inactive' | 'completed' | 'traveling';
  compared: boolean;
}

@Component({
  selector: 'app-route-atlas',
  templateUrl: './route-atlas.component.html',
  styleUrl: './route-atlas.component.scss',
})
export class RouteAtlasComponent {
  readonly locations = input.required<readonly LocationDefinition[]>();
  readonly trails = input<readonly AtlasTrail[]>([]);
  readonly backgroundAsset = input<string>();
  readonly currentLocationId = input.required<string>();
  readonly selectedRouteId = input('');
  readonly travel = input<{ routeId: string; progress: number; icon: string }>();
  readonly visitedIds = input<readonly string[]>([]);
  readonly routeSelected = output<string>();
  readonly detailsRequested = output<void>();
  readonly svg = viewChild<ElementRef<SVGSVGElement>>('mapCanvas');
  readonly view = signal<MapView>({ ...FULL_MAP });
  readonly viewBox = computed(() => mapViewBox(this.view()));
  readonly zoomPercent = computed(() => Math.round(this.view().zoom * 100));
  readonly showTerrain = signal(true);
  readonly motion = signal(true);
  readonly dragging = signal(false);
  readonly selectedTrail = computed(() =>
    this.trails().find((t) => t.route.id === this.selectedRouteId()),
  );
  private drag?: { pointerId: number; x: number; y: number; scale: number; view: MapView };

  zoom(delta: number): void {
    this.view.update((view) => boundedMapView({ ...view, zoom: view.zoom + delta }));
  }
  pan(dx: number, dy: number): void {
    this.view.update((view) =>
      boundedMapView({ ...view, x: view.x + dx / view.zoom, y: view.y + dy / view.zoom }),
    );
  }
  fitAll(): void {
    this.view.set({ ...FULL_MAP });
  }
  centerOnCompany(): void {
    const travel = this.travel();
    const path = travel ? this.routePath(travel.routeId) : undefined;
    const point = path?.getPointAtLength(
      path.getTotalLength() * Math.min(1, Math.max(0, travel?.progress ?? 0)),
    );
    const location = this.locations().find((location) => location.id === this.currentLocationId());
    if (point || location)
      this.view.set(
        boundedMapView({
          x: point?.x ?? location!.mapX,
          y: point?.y ?? location!.mapY,
          zoom: Math.max(1.75, this.view().zoom),
        }),
      );
  }
  focusRoute(): void {
    const route = this.selectedTrail()?.route;
    const path = this.routePath(this.selectedRouteId());
    const bounds =
      path && typeof path.getBBox === 'function'
        ? path.getBBox()
        : route
          ? this.routeEndpointBounds(route)
          : undefined;
    if (bounds) this.view.set(fitMapBounds(bounds));
  }
  focusSelected(): void {
    this.svg()
      ?.nativeElement.querySelector<SVGGElement>('[data-map-stop][aria-pressed="true"]')
      ?.focus({ preventScroll: true });
  }
  destinationTrail(id: string): AtlasTrail | undefined {
    return this.trails().find(
      (trail) => trail.route.toLocationId === id && trail.state !== 'inactive',
    );
  }
  destinationIsInteractive(id: string): boolean {
    const trail = this.destinationTrail(id);
    return trail !== undefined && trail.state !== 'locked';
  }
  checkpoints(route: RouteDefinition): readonly number[] {
    return Array.from(
      { length: Math.max(0, route.estimatedDays - 1) },
      (_, index) => (index + 1) / route.estimatedDays,
    );
  }
  label(location: LocationDefinition): string {
    if (this.travel() && location.id === this.currentLocationId()) return 'Departure';
    if (location.id === this.currentLocationId()) return 'You are here';
    const trail = this.destinationTrail(location.id);
    if (trail?.state === 'traveling') return 'On your route';
    if (trail?.state === 'completed') return 'Visited';
    if (trail?.state === 'locked') return 'Locked · finish the next mission';
    if (trail?.state === 'unavailable') return 'Unavailable';
    if (trail) return `${trail.route.estimatedDays} days · ${trail.route.risk} risk`;
    return this.visitedIds().includes(location.id) ? 'Visited' : '';
  }
  selectDestination(location: LocationDefinition): void {
    const trail = this.destinationTrail(location.id);
    if (trail && trail.state !== 'locked') this.routeSelected.emit(trail.route.id);
  }
  revealLocation(location: LocationDefinition): void {
    const view = this.view();
    if (
      Math.abs(location.mapX - view.x) > 50 / view.zoom - 10 ||
      Math.abs(location.mapY - view.y) > 40 / view.zoom - 10
    ) {
      this.view.set(boundedMapView({ ...view, x: location.mapX, y: location.mapY }));
    }
  }
  mapKey(event: KeyboardEvent): void {
    if (event.target !== event.currentTarget) return;
    const directions: Record<string, readonly [number, number]> = {
      ArrowLeft: [-12, 0],
      ArrowRight: [12, 0],
      ArrowUp: [0, -10],
      ArrowDown: [0, 10],
    };
    const direction = directions[event.key];
    if (direction) this.pan(...direction);
    else if (event.key === '+' || event.key === '=') this.zoom(0.25);
    else if (event.key === '-') this.zoom(-0.25);
    else if (event.key === 'Home') this.fitAll();
    else return;
    event.preventDefault();
  }
  startPan(event: PointerEvent): void {
    if (
      event.button !== 0 ||
      this.view().zoom === 1 ||
      !(event.target instanceof Element) ||
      event.target.closest('[data-map-stop], [data-map-trail]')
    )
      return;
    const svg = this.svg()?.nativeElement;
    const scale = svg?.getScreenCTM()?.a;
    if (!svg || !scale) return;
    this.drag = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      scale,
      view: this.view(),
    };
    svg.setPointerCapture(event.pointerId);
    this.dragging.set(true);
  }
  movePan(event: PointerEvent): void {
    if (!this.drag || event.pointerId !== this.drag.pointerId) return;
    this.view.set(
      boundedMapView({
        ...this.drag.view,
        x: this.drag.view.x - (event.clientX - this.drag.x) / this.drag.scale,
        y: this.drag.view.y - (event.clientY - this.drag.y) / this.drag.scale,
      }),
    );
  }
  endPan(): void {
    const svg = this.svg()?.nativeElement;
    if (this.drag && svg?.hasPointerCapture(this.drag.pointerId))
      svg.releasePointerCapture(this.drag.pointerId);
    this.drag = undefined;
    this.dragging.set(false);
  }
  private routePath(id: string): SVGPathElement | undefined {
    return Array.from(
      this.svg()?.nativeElement.querySelectorAll<SVGPathElement>('[data-route-id]') ?? [],
    ).find((path) => path.dataset['routeId'] === id);
  }
  private routeEndpointBounds(route: RouteDefinition):
    | {
        x: number;
        y: number;
        width: number;
        height: number;
      }
    | undefined {
    const from = this.locations().find((location) => location.id === route.fromLocationId);
    const to = this.locations().find((location) => location.id === route.toLocationId);
    return from && to
      ? {
          x: Math.min(from.mapX, to.mapX),
          y: Math.min(from.mapY, to.mapY),
          width: Math.abs(from.mapX - to.mapX),
          height: Math.abs(from.mapY - to.mapY),
        }
      : undefined;
  }
}
