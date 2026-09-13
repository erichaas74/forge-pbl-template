import type { SimulationDecisionConfig } from './simulation-decision.models';
import type { TradeWorldDefinition } from './trade-world.models';

const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const text = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;
const ids = (value: unknown): value is string[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every(text) &&
  new Set(value).size === value.length;
const integer = (value: unknown, min: number, max: number): boolean =>
  typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max;

export function isTradeWorldShape(value: unknown): value is TradeWorldDefinition {
  if (
    !record(value) ||
    (value['timing'] !== undefined &&
      value['timing'] !== 'real-time' &&
      value['timing'] !== 'turn-based') ||
    !integer(value['tickIntervalMs'], 5000, 300000) ||
    !integer(value['eventEveryTicks'], 1, 100)
  )
    return false;
  const events = value['events'],
    shipments = value['shipments'];
  return (
    Array.isArray(events) &&
    events.length > 0 &&
    events.length <= 30 &&
    events.every(
      (event) =>
        record(event) &&
        text(event['id']) &&
        text(event['title']) &&
        text(event['description']) &&
        ['winter-storm', 'flood', 'conflict'].includes(String(event['kind'])) &&
        ids(event['locationIds']) &&
        ids(event['goodIds']) &&
        integer(event['priceChangeBps'], 1, 10000) &&
        integer(event['durationTicks'], 1, 20),
    ) &&
    Array.isArray(shipments) &&
    shipments.length > 0 &&
    shipments.length <= 20 &&
    shipments.every(
      (shipment) =>
        record(shipment) &&
        text(shipment['id']) &&
        text(shipment['name']) &&
        text(shipment['routeId']) &&
        ids(shipment['goodIds']) &&
        integer(shipment['quantity'], 1, 1000) &&
        integer(shipment['travelTicks'], 1, 100) &&
        integer(shipment['startOffset'], 0, 100) &&
        integer(shipment['priceDropBps'], 1, 5000) &&
        integer(shipment['reliefTicks'], 1, 20),
    ) &&
    new Set([...events, ...shipments].map((item) => item['id'])).size ===
      events.length + shipments.length
  );
}

export function validateTradeWorld(
  config: Pick<SimulationDecisionConfig, 'tradeWorld' | 'routes' | 'goods' | 'locations'>,
): string[] {
  if (!config.tradeWorld) return [];
  if (!isTradeWorldShape(config.tradeWorld))
    return ['Invalid trade-world settings. Check identifiers, timing and price bounds.'];
  const errors: string[] = [];
  for (const effect of config.tradeWorld.events) {
    if (effect.locationIds.some((id) => !config.locations.some((location) => location.id === id)))
      errors.push(`${effect.id}: unknown event location.`);
    if (effect.goodIds.some((id) => !config.goods.some((good) => good.id === id)))
      errors.push(`${effect.id}: unknown event good.`);
  }
  for (const shipment of config.tradeWorld.shipments) {
    if (!config.routes.some((route) => route.id === shipment.routeId))
      errors.push(`${shipment.id}: unknown shipment route.`);
    if (shipment.goodIds.some((id) => !config.goods.some((good) => good.id === id)))
      errors.push(`${shipment.id}: unknown shipment good.`);
  }
  return errors;
}
