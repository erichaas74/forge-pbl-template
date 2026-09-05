import { Component, computed, input, output, signal } from '@angular/core';

import type {
  ClassVoyageRecord,
  GeoPoint,
  JourneyMapConfig,
  JourneyTeamIdentity,
  MapLocation,
  VoyageIntersection,
  VoyageRoutePoint,
} from '../../domain/journey-replay.models';

interface MapVoyageLayer {
  readonly voyageId: string;
  readonly team: JourneyTeamIdentity;
  readonly route: readonly GeoPoint[];
  readonly events: readonly {
    readonly point: GeoPoint;
    readonly label: string;
  }[];
}

@Component({
  selector: 'app-living-journey-map',
  templateUrl: './living-journey-map.component.html',
  styleUrl: './living-journey-map.component.scss',
})
export class LivingJourneyMapComponent {
  readonly map = input.required<JourneyMapConfig>();
  readonly route = input<readonly VoyageRoutePoint[]>([]);
  readonly team = input.required<JourneyTeamIdentity>();
  readonly candidateRouteIds = input<readonly string[]>([]);
  readonly classVoyages = input<readonly ClassVoyageRecord[]>([]);
  readonly intersections = input<readonly VoyageIntersection[]>([]);
  readonly mapLabel = input('Living journey map');
  readonly locationInspected = output<MapLocation>();

  readonly cover = signal<'world' | 'regional'>('regional');
  readonly zoom = signal(1);
  readonly panX = signal(0);
  readonly panY = signal(0);
  readonly enabledLenses = signal<ReadonlySet<string>>(new Set(['navigation']));
  readonly inspectedLocationId = signal<string | undefined>(undefined);

  readonly viewBox = computed(() => {
    const base = this.cover() === 'world' ? { x: 0, y: 0, width: 1000, height: 500 } : this.regionalView();
    const zoom = this.zoom();
    const width = base.width / zoom;
    const height = base.height / zoom;
    const x = base.x + (base.width - width) / 2 + this.panX();
    const y = base.y + (base.height - height) / 2 + this.panY();
    return `${x} ${y} ${width} ${height}`;
  });

  readonly voyageLayers = computed<readonly MapVoyageLayer[]>(() => {
    const classVoyages = this.classVoyages();
    if (classVoyages.length > 0) return classVoyages.map((voyage) => this.classLayer(voyage));
    return [
      {
        voyageId: 'active-voyage',
        team: this.team(),
        route: this.route(),
        events: this.route()
          .filter((point) => point.eventId !== undefined)
          .map((point) => ({ point, label: 'Recorded journey event' })),
      },
    ];
  });

  readonly currentPoint = computed(() => this.route().at(-1));

  project(point: GeoPoint): { x: number; y: number } {
    return {
      x: ((point.longitude + 180) / 360) * 1000,
      y: ((90 - point.latitude) / 180) * 500,
    };
  }

  path(points: readonly GeoPoint[]): string {
    return points
      .map((point, index) => {
        const projected = this.project(point);
        return `${index === 0 ? 'M' : 'L'}${projected.x.toFixed(2)} ${projected.y.toFixed(2)}`;
      })
      .join(' ');
  }

  candidatePath(routeId: string): string {
    return this.path(this.map().routes.find((route) => route.id === routeId)?.coordinates ?? []);
  }

  locationPoint(location: MapLocation): { x: number; y: number } {
    return this.project(location);
  }

  teamClass(team: JourneyTeamIdentity): string {
    return `pattern-${team.linePattern}`;
  }

  lensOn(lens: string): boolean {
    return this.enabledLenses().has(lens);
  }

  toggleLens(lens: string): void {
    this.enabledLenses.update((current) => {
      const next = new Set(current);
      if (next.has(lens)) next.delete(lens);
      else next.add(lens);
      return next;
    });
  }

  setCover(cover: 'world' | 'regional'): void {
    this.cover.set(cover);
    this.resetView();
  }

  zoomBy(delta: number): void {
    this.zoom.update((value) => Math.max(1, Math.min(2.8, value + delta)));
  }

  pan(dx: number, dy: number): void {
    const scale = 1 / this.zoom();
    this.panX.update((value) => value + dx * scale);
    this.panY.update((value) => value + dy * scale);
  }

  resetView(): void {
    this.zoom.set(1);
    this.panX.set(0);
    this.panY.set(0);
  }

  inspect(location: MapLocation): void {
    this.inspectedLocationId.set(location.id);
    this.locationInspected.emit(location);
  }

  intersectionAt(locationId: string): VoyageIntersection | undefined {
    return this.intersections().find((intersection) => intersection.locationId === locationId);
  }

  mapKey(event: KeyboardEvent): void {
    const actions: Record<string, () => void> = {
      ArrowLeft: () => this.pan(-45, 0),
      ArrowRight: () => this.pan(45, 0),
      ArrowUp: () => this.pan(0, -32),
      ArrowDown: () => this.pan(0, 32),
      Home: () => this.resetView(),
      '+': () => this.zoomBy(0.25),
      '=': () => this.zoomBy(0.25),
      '-': () => this.zoomBy(-0.25),
    };
    const action = actions[event.key];
    if (action === undefined) return;
    event.preventDefault();
    action();
  }

  private regionalView(): { x: number; y: number; width: number; height: number } {
    const { bounds } = this.map().regionalCover;
    const topLeft = this.project({ longitude: bounds.west, latitude: bounds.north });
    const bottomRight = this.project({ longitude: bounds.east, latitude: bounds.south });
    return {
      x: topLeft.x,
      y: topLeft.y,
      width: bottomRight.x - topLeft.x,
      height: bottomRight.y - topLeft.y,
    };
  }

  private classLayer(voyage: ClassVoyageRecord): MapVoyageLayer {
    return {
      voyageId: voyage.voyageId,
      team: voyage.team,
      route: voyage.route,
      events: voyage.route
        .filter((point) => point.eventLabel !== undefined)
        .map((point) => ({ point, label: point.eventLabel ?? 'Journey event' })),
    };
  }
}
