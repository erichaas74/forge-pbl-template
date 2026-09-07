import { describe, expect, it } from 'vitest';
import { layoutMarketLabels } from './map-market-layout';
import { FULL_MAP } from './map-viewport';

const towns = [
  { id: 'north', mapX: 38, mapY: 30, rows: 3 },
  { id: 'river', mapX: 47, mapY: 69, rows: 3 },
];
describe('town market label layout', () => {
  it('places the current-fort card clear of route cost buttons', () => {
    const obstacles = [{ x: 210, y: 350, width: 160, height: 32 }];
    const [label] = layoutMarketLabels(
      [{ id: 'home', mapX: 14, mapY: 62, rows: 3 }],
      FULL_MAP,
      1000,
      500,
      obstacles,
    );
    for (const obstacle of obstacles) {
      expect(
        label!.x + label!.width <= obstacle.x ||
          obstacle.x + obstacle.width <= label!.x ||
          label!.y + label!.height <= obstacle.y ||
          obstacle.y + obstacle.height <= label!.y,
      ).toBe(true);
    }
  });
  it('keeps labels readable inside wide and narrow map frames', () => {
    for (const width of [360, 1000, 1400]) {
      const labels = layoutMarketLabels(towns, FULL_MAP, width, 460);
      expect(labels).toHaveLength(2);
      for (const label of labels) {
        expect(label.x).toBeGreaterThanOrEqual(0);
        expect(label.y).toBeGreaterThanOrEqual(0);
        expect(label.x + label.width).toBeLessThanOrEqual(width);
        expect(label.y + label.height).toBeLessThanOrEqual(460);
      }
      const [a, b] = labels;
      expect(
        a!.x + a!.width <= b!.x ||
          b!.x + b!.width <= a!.x ||
          a!.y + a!.height <= b!.y ||
          b!.y + b!.height <= a!.y,
      ).toBe(true);
    }
  });
  it('moves labels with the map and hides destinations outside a zoomed viewport', () => {
    const full = layoutMarketLabels(towns, FULL_MAP, 1000, 500);
    const zoomed = layoutMarketLabels(towns, { x: 38, y: 30, zoom: 3 }, 1000, 500);
    expect(zoomed.map((label) => label.id)).toEqual(['north']);
    expect(zoomed[0]!.anchorX).toBe(500);
    expect(zoomed[0]!.anchorY).toBe(250);
    expect(full[0]!.anchorX).toBe(380);
  });
});
