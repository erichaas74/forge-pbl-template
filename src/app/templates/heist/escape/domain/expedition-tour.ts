import type { EscapeMission } from './escape.models';
import type { WorldPoint } from './expedition.models';
import { ExpeditionNavigation, worldDistance } from './expedition.navigation';

export interface ExpeditionTourLeg {
  readonly points: readonly WorldPoint[];
  readonly length: number;
}

/** A presentation-only route. It never dispatches gameplay commands. */
export function expeditionTour(mission: EscapeMission): readonly ExpeditionTourLeg[] {
  if (!mission.world) throw new Error('The route example needs an expedition map.');
  const world = mission.world;
  const navigation = new ExpeditionNavigation(world, world.spawn, true);
  return mission.steps.map((step) => {
    const destination = { x: (step.x * world.width) / 100, y: (step.y * world.height) / 100 };
    if (!navigation.navigate(destination)) throw new Error(`No map route reaches ${step.place}.`);
    const points = [
      { ...navigation.position },
      ...navigation.route.map((point) => ({ x: point.x, y: point.y })),
    ];
    navigation.position = destination;
    return {
      points,
      length: points.slice(1).reduce((sum, point, i) => sum + worldDistance(points[i], point), 0),
    };
  });
}

/** The visible part of a route, interpolated by distance rather than node count. */
export function traceTourLeg(leg: ExpeditionTourLeg, progress: number): readonly WorldPoint[] {
  if (progress >= 1) return leg.points;
  let remaining = Math.max(0, Math.min(1, progress)) * leg.length;
  const points: WorldPoint[] = [leg.points[0]];
  for (let i = 1; i < leg.points.length; i++) {
    const a = leg.points[i - 1],
      b = leg.points[i],
      distance = worldDistance(a, b);
    if (remaining >= distance) {
      points.push(b);
      remaining -= distance;
    } else {
      const t = distance ? remaining / distance : 1;
      points.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
      break;
    }
  }
  return points;
}
