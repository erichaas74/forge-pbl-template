export interface MapView {
  x: number;
  y: number;
  zoom: number;
}

export const FULL_MAP: Readonly<MapView> = { x: 50, y: 40, zoom: 1 };

/** Keep the 100 × 80 illustrated world in view at every zoom level. */
export function boundedMapView(view: MapView): MapView {
  const zoom = Math.min(3, Math.max(1, view.zoom));
  const halfWidth = 50 / zoom;
  const halfHeight = 40 / zoom;
  return {
    zoom,
    x: Math.min(100 - halfWidth, Math.max(halfWidth, view.x)),
    y: Math.min(80 - halfHeight, Math.max(halfHeight, view.y)),
  };
}

export function fitMapBounds(bounds: {
  x: number;
  y: number;
  width: number;
  height: number;
}): MapView {
  return boundedMapView({
    x: bounds.x + bounds.width / 2,
    y: bounds.y + bounds.height / 2,
    zoom: Math.min(100 / (bounds.width + 18), 80 / (bounds.height + 18)),
  });
}

export function mapViewBox(view: MapView): string {
  return `${view.x - 50 / view.zoom} ${view.y - 40 / view.zoom} ${100 / view.zoom} ${80 / view.zoom}`;
}
