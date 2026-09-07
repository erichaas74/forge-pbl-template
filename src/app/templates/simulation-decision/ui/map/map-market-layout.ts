import type { MapView } from './map-viewport';

export interface MarketAnchor {
  id: string;
  mapX: number;
  mapY: number;
  rows: number;
}
export interface MarketLabelBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  anchorX: number;
  anchorY: number;
}

/** Place readable, unscaled labels beside their mapped towns, keeping them inside the viewport. */
export function layoutMarketLabels(
  anchors: readonly MarketAnchor[],
  view: MapView,
  width: number,
  height: number,
  obstacles: readonly { x: number; y: number; width: number; height: number }[] = [],
): readonly MarketLabelBox[] {
  const visible = anchors
    .map((anchor) => ({
      ...anchor,
      anchorX: (((anchor.mapX - view.x) * view.zoom) / 100 + 0.5) * width,
      anchorY: (((anchor.mapY - view.y) * view.zoom) / 80 + 0.5) * height,
    }))
    .filter(
      (anchor) =>
        anchor.anchorX >= 0 &&
        anchor.anchorX <= width &&
        anchor.anchorY >= 0 &&
        anchor.anchorY <= height,
    );
  const placed: MarketLabelBox[] = [];
  const overlap = (
    a: { x: number; y: number; width: number; height: number },
    b: { x: number; y: number; width: number; height: number },
  ) =>
    Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) *
    Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
  for (const anchor of visible) {
    const cardWidth = Math.min(width < 600 ? 152 : 200, Math.max(80, width - 12));
    const cardHeight = Math.min(76 + anchor.rows * 22, 260, Math.max(60, height - 12));
    const dx = width * 0.048 * view.zoom + 10;
    const dy = height * 0.065 * view.zoom + 10;
    const candidates = [
      [anchor.anchorX + dx, anchor.anchorY - cardHeight / 2],
      [anchor.anchorX - dx - cardWidth, anchor.anchorY - cardHeight / 2],
      [anchor.anchorX - cardWidth / 2, anchor.anchorY + dy],
      [anchor.anchorX - cardWidth / 2, anchor.anchorY - dy - cardHeight],
      [anchor.anchorX + dx, anchor.anchorY + dy],
      [anchor.anchorX - dx - cardWidth, anchor.anchorY - dy - cardHeight],
    ].map(([x, y]) => ({
      id: anchor.id,
      x: Math.max(6, Math.min(x!, width - cardWidth - 6)),
      y: Math.max(6, Math.min(y!, height - cardHeight - 6)),
      width: cardWidth,
      height: cardHeight,
      anchorX: anchor.anchorX,
      anchorY: anchor.anchorY,
    }));
    const score = (box: MarketLabelBox) =>
      obstacles.reduce((sum, other) => sum + overlap(box, other) * 10, 0) +
      placed.reduce((sum, other) => sum + overlap(box, other) * 10, 0) +
      visible.reduce(
        (sum, other) =>
          sum +
          overlap(box, {
            x: other.anchorX - dx + 6,
            y: other.anchorY - dy,
            width: 2 * dx - 12,
            height: 2 * dy,
          }) *
            3,
        0,
      );
    candidates.sort((a, b) => score(a) - score(b));
    placed.push(candidates[0]!);
  }
  return placed;
}
