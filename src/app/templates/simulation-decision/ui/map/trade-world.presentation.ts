import type {
  SimulationDecisionConfig,
  SimulationDecisionState,
} from '../../domain/simulation-decision.models';
import type { CanvasTradeWorld } from './route-canvas.models';

/** Public map activity only. The scene receives no price formulas or delivery commands. */
export function tradeWorldCanvas(
  config: SimulationDecisionConfig,
  state: SimulationDecisionState,
  running: boolean,
): CanvasTradeWorld | undefined {
  const world = state.tradeWorld;
  if (!world || !config.tradeWorld) return undefined;
  return {
    tick: world.tick,
    running,
    freight: world.shipments.flatMap((shipment) => {
      const spec = config.tradeWorld!.shipments.find((item) => item.id === shipment.id);
      if (!spec) return [];
      const progress = Math.max(0, Math.min(1, shipment.progressTicks / spec.travelTicks));
      return [
        {
          id: shipment.id,
          name: spec.name,
          routeId: shipment.routeId,
          progress: shipment.direction === 'return' ? 1 - progress : progress,
          deliveries: shipment.deliveries,
        },
      ];
    }),
    conditions: world.effects.flatMap((effect) =>
      effect.kind === 'shipment'
        ? []
        : [
            {
              id: effect.id,
              kind: effect.kind,
              locations: config.locations
                .filter((location) => effect.locationIds.includes(location.id))
                .map((location) => ({ x: location.mapX, y: location.mapY })),
            },
          ],
    ),
  };
}
