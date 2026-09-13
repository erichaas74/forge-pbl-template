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

/** Match the centered, proportionally fitted SVG and canvas in any frame shape. */
export function mapScreenScale(view: MapView, width: number, height: number): number {
  return Math.min(width / 100, height / 80) * view.zoom;
}

export function mapPointToScreen(
  point: { x: number; y: number },
  view: MapView,
  width: number,
  height: number,
): { x: number; y: number } {
  const scale = mapScreenScale(view, width, height);
  return {
    x: width / 2 + (point.x - view.x) * scale,
    y: height / 2 + (point.y - view.y) * scale,
  };
}

/** Keep the world point under the pointer fixed while zooming, except at map bounds. */
export function zoomMapAt(view: MapView, point: { x: number; y: number }, zoom: number): MapView {
  const nextZoom = boundedMapView({ ...view, zoom }).zoom;
  return boundedMapView({
    zoom: nextZoom,
    x: point.x - ((point.x - view.x) * view.zoom) / nextZoom,
    y: point.y - ((point.y - view.y) * view.zoom) / nextZoom,
  });
}

/** Anchor a single route detail card to the same world point as its travel-cost badge. */
export function routePredictionPosition(
  point: { x: number; y: number },
  view: MapView,
  width: number,
  height: number,
) {
  const { x: anchorX, y: anchorY } = mapPointToScreen(point, view, width, height);
  const cardWidth = Math.min(360, Math.max(0, width - 16));
  const cardHeight = Math.min(360, Math.max(0, height - 16));
  const x = Math.max(8, Math.min(anchorX - cardWidth / 2, width - cardWidth - 8));
  const y = Math.max(8, Math.min(anchorY - cardHeight - 24, height - cardHeight - 8));
  return { x, y, width: cardWidth, height: cardHeight, anchorX, anchorY };
}
