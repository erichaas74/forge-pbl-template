import { describe, expect, it } from 'vitest';
import {
  canvasCamera,
  confirmedTravelSegment,
  pointOnTrail,
  routeDrawingChanged,
  type RouteCanvasSnapshot,
} from './route-canvas.models';
import { FULL_MAP } from './map-viewport';

function snapshot(progress?: number): RouteCanvasSnapshot {
  return {
    scenery: true,
    motion: true,
    selectedRouteId: 'trail',
    previewRouteId: '',
    currentLocationId: 'origin',
    companyPosition: { x: 10, y: 20 },
    trails: [
      {
        id: 'trail',
        state: 'traveling',
        compared: false,
        days: 3,
        toLocationId: 'destination',
        points: [
          { x: 10, y: 20 },
          { x: 30, y: 40 },
        ],
      },
    ],
    travel: progress === undefined ? undefined : { routeId: 'trail', progress },
  };
}

describe('route canvas projection', () => {
  it('retains static routes for unrelated updates and invalidates their actual visual changes', () => {
    const before = snapshot(0.3);
    expect(
      routeDrawingChanged(before, {
        ...before,
        motion: false,
        scenery: false,
        previewRouteId: 'trail',
        companyPosition: { x: 40, y: 50 },
        trails: before.trails.map((trail) => ({ ...trail })),
      }),
    ).toBe(false);
    expect(routeDrawingChanged(undefined, before)).toBe(true);
    expect(routeDrawingChanged(before, { ...before, selectedRouteId: '' })).toBe(true);
    expect(
      routeDrawingChanged(before, { ...before, travel: { routeId: 'trail', progress: 0.6 } }),
    ).toBe(true);
    for (const change of [
      { state: 'completed' as const },
      { compared: true },
      { days: 5 },
      {
        points: [
          { x: 1, y: 2 },
          { x: 3, y: 4 },
        ],
      },
    ]) {
      expect(
        routeDrawingChanged(before, {
          ...before,
          trails: before.trails.map((trail) => ({ ...trail, ...change })),
        }),
      ).toBe(true);
    }
  });

  it('does not animate onto an empty path while route geometry is loading', () => {
    const next = snapshot(0.6);
    expect(
      confirmedTravelSegment(snapshot(0.3), {
        ...next,
        trails: next.trails.map((trail) => ({ ...trail, points: [] })),
      }),
    ).toBeUndefined();
  });
  it('interpolates sampled paths with clamped, finite progress', () => {
    const points = [
      { x: 2, y: 4 },
      { x: 12, y: 14 },
      { x: 32, y: 24 },
    ];
    expect(pointOnTrail(points, 0.25)).toEqual({ x: 7, y: 9 });
    expect(pointOnTrail(points, 0.75)).toEqual({ x: 22, y: 19 });
    expect(pointOnTrail(points, -8)).toEqual(points[0]);
    expect(pointOnTrail(points, 9)).toEqual(points[2]);
    expect(pointOnTrail(points, NaN)).toEqual(points[0]);
    expect(pointOnTrail([], 0.5)).toEqual({ x: 0, y: 0 });
  });

  it('uses the same coordinate transform as a stretched SVG and a letterboxed atlas', () => {
    const viewport = { view: FULL_MAP, width: 1200, height: 400, stretch: true };
    expect(canvasCamera(viewport)).toEqual({
      width: 1200,
      height: 400,
      zoomX: 1.2,
      zoomY: 0.5,
      x: 500,
      y: 400,
    });
    expect(canvasCamera({ ...viewport, stretch: false })).toMatchObject({ zoomX: 0.5, zoomY: 0.5 });
    expect(canvasCamera({ ...viewport, view: { x: 40, y: 30, zoom: 2 } })).toMatchObject({
      zoomX: 2.4,
      zoomY: 1,
      x: 400,
      y: 300,
    });
  });

  it('never manufactures movement on load, departure, corrections, or a pause', () => {
    expect(confirmedTravelSegment(undefined, snapshot(0.6))).toBeUndefined();
    expect(confirmedTravelSegment(snapshot(), snapshot(0))).toBeUndefined();
    expect(confirmedTravelSegment(snapshot(0.6), snapshot(0.3))).toBeUndefined();
    expect(
      confirmedTravelSegment(snapshot(0.3), { ...snapshot(0.6), motion: false }),
    ).toBeUndefined();
    expect(confirmedTravelSegment(snapshot(0.3), snapshot(0.3))).toBeUndefined();
  });

  it('animates only received advances and an explicitly recorded arrival', () => {
    expect(confirmedTravelSegment(snapshot(0.3), snapshot(0.6))).toEqual({
      routeId: 'trail',
      from: 0.3,
      to: 0.6,
    });
    const next = { ...snapshot(), currentLocationId: 'destination' };
    expect(confirmedTravelSegment(snapshot(0.6), next)).toBeUndefined();
    next.trails = next.trails.map((trail) => ({ ...trail, state: 'completed' }));
    expect(confirmedTravelSegment(snapshot(0.6), next)).toEqual({
      routeId: 'trail',
      from: 0.6,
      to: 1,
    });
  });

  it('does not change its runtime projection while describing movement', () => {
    const before = snapshot(0.2);
    const after = snapshot(0.8);
    const original = structuredClone({ before, after });
    confirmedTravelSegment(before, after);
    pointOnTrail(after.trails[0]!.points, 0.5);
    expect({ before, after }).toEqual(original);
  });

  it('never interpolates between different saved journeys on the same trail', () => {
    const cue = {
      id: 'a:checkpoint',
      journeyId: 'a',
      routeId: 'trail',
      kind: 'checkpoint' as const,
      label: 'CHECKPOINT',
      progress: 0.3,
    };
    expect(
      confirmedTravelSegment(
        { ...snapshot(0.3), cue },
        {
          ...snapshot(0.6),
          cue: { ...cue, journeyId: 'b', id: 'b:checkpoint' },
        },
      ),
    ).toBeUndefined();
  });
});
