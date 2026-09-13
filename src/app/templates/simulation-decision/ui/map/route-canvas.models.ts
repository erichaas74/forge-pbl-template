import type { MapView } from './map-viewport';

export interface RoutePoint {
  readonly x: number;
  readonly y: number;
}

export interface CanvasTrail {
  readonly id: string;
  readonly state: 'available' | 'unavailable' | 'locked' | 'inactive' | 'completed' | 'traveling';
  readonly compared: boolean;
  readonly days: number;
  readonly toLocationId: string;
  /** Equal-distance samples in the atlas's 100 by 80 coordinate space. */
  readonly points: readonly RoutePoint[];
}

export interface CanvasTravel {
  readonly routeId: string;
  readonly progress: number;
}

/** A public, confirmed milestone; no event choices, probabilities or commands enter Phaser. */
export interface RouteCanvasCue {
  readonly id: string;
  readonly journeyId: string;
  readonly routeId: string;
  readonly kind: 'departure' | 'checkpoint' | 'event' | 'arrival' | 'paused';
  readonly label: string;
  readonly progress: number;
}

export interface CanvasTradeWorld {
  readonly tick: number;
  readonly running: boolean;
  readonly freight: readonly {
    id: string;
    name: string;
    routeId: string;
    progress: number;
    deliveries: number;
  }[];
  readonly conditions: readonly {
    id: string;
    kind: 'winter-storm' | 'flood' | 'conflict';
    locations: readonly RoutePoint[];
  }[];
}

/** Presentation only. Prices, answers, random events and commands never enter the scene. */
export interface RouteCanvasSnapshot {
  readonly backgroundAsset?: string;
  readonly scenery: boolean;
  readonly motion: boolean;
  readonly selectedRouteId: string;
  readonly previewRouteId: string;
  readonly currentLocationId: string;
  readonly companyPosition: RoutePoint;
  readonly trails: readonly CanvasTrail[];
  readonly travel?: CanvasTravel;
  readonly cue?: RouteCanvasCue;
  readonly world?: CanvasTradeWorld;
  readonly towns?: readonly { id: string; kind: string; x: number; y: number }[];
}

export interface RouteCanvasViewport {
  readonly view: MapView;
  readonly width: number;
  readonly height: number;
  readonly stretch: boolean;
}

export interface RouteCanvasController {
  update(snapshot: RouteCanvasSnapshot, viewport: RouteCanvasViewport): void;
  destroy(): void;
}

export interface RouteCanvasCallbacks {
  ready(): void;
  failed(): void;
  previewEnded(): void;
}

export function clampProgress(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
}

export function pointOnTrail(points: readonly RoutePoint[], progress: number): RoutePoint {
  if (!points.length) return { x: 0, y: 0 };
  const position = clampProgress(progress) * (points.length - 1);
  const index = Math.floor(position);
  const from = points[index]!;
  const to = points[Math.min(points.length - 1, index + 1)]!;
  const fraction = position - index;
  return { x: from.x + (to.x - from.x) * fraction, y: from.y + (to.y - from.y) * fraction };
}

/** Phaser's camera and the SVG use the same stretch/letterbox transform. */
export function canvasCamera(viewport: RouteCanvasViewport) {
  const width = Math.max(1, viewport.width);
  const height = Math.max(1, viewport.height);
  const baseX = width / 1000;
  const baseY = height / 800;
  const zoomX = (viewport.stretch ? baseX : Math.min(baseX, baseY)) * viewport.view.zoom;
  const zoomY = (viewport.stretch ? baseY : Math.min(baseX, baseY)) * viewport.view.zoom;
  return { width, height, zoomX, zoomY, x: viewport.view.x * 10, y: viewport.view.y * 10 };
}

/** Ignore scenery, preview and company-only updates when retaining static route objects. */
export function routeDrawingChanged(
  previous: RouteCanvasSnapshot | undefined,
  next: RouteCanvasSnapshot,
): boolean {
  return (
    !previous ||
    previous.selectedRouteId !== next.selectedRouteId ||
    previous.travel?.routeId !== next.travel?.routeId ||
    previous.travel?.progress !== next.travel?.progress ||
    previous.trails.length !== next.trails.length ||
    next.trails.some((trail, index) => {
      const before = previous.trails[index]!;
      return (
        trail.id !== before.id ||
        trail.state !== before.state ||
        trail.compared !== before.compared ||
        trail.days !== before.days ||
        trail.points !== before.points
      );
    })
  );
}

/** A tween may explain a saved advance, but can never produce one. */
export function confirmedTravelSegment(
  previous: RouteCanvasSnapshot | undefined,
  next: RouteCanvasSnapshot,
): { routeId: string; from: number; to: number } | undefined {
  const travel = previous?.travel;
  if (!travel || !next.motion) return undefined;
  if (previous?.cue && next.cue && previous.cue.journeyId !== next.cue.journeyId) return undefined;
  const trail = next.trails.find((item) => item.id === travel.routeId);
  if (!trail || trail.points.length < 2) return undefined;
  const from = clampProgress(travel.progress);
  const to =
    next.travel?.routeId === travel.routeId
      ? clampProgress(next.travel.progress)
      : !next.travel && next.currentLocationId === trail.toLocationId && trail.state === 'completed'
        ? 1
        : from;
  return to > from ? { routeId: travel.routeId, from, to } : undefined;
}
