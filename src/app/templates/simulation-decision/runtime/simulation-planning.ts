import { signal } from '@angular/core';
import type { TradeLineInput } from '../domain/simulation-decision.models';

/** Uncommitted, per-location work survives workspace changes within an attempt. */
export function createLocationPlan() {
  return {
    draft: signal<TradeLineInput[]>([]),
    goodId: signal(''),
    direction: signal<'buy' | 'sell'>('buy'),
    quantity: signal(1),
    editing: signal(false),
    filter: signal(''),
    stallId: signal<string | undefined>(undefined),
    showAll: signal(false),
    routeId: signal(''),
    compareIds: signal<string[]>([]),
    rationales: signal<Record<string, string>>({}),
    forecastSalesRevenueCents: signal<Record<string, number | undefined>>({}),
    forecastTripProfitCents: signal<Record<string, number | undefined>>({}),
  };
}

export class SimulationPlanning {
  private readonly locations = new Map<string, ReturnType<typeof createLocationPlan>>();

  at(locationId: string) {
    let plan = this.locations.get(locationId);
    if (!plan) {
      plan = createLocationPlan();
      this.locations.set(locationId, plan);
    }
    return plan;
  }

  clear(): void {
    this.locations.clear();
  }
}

export function changeTradePlan(
  draft: readonly TradeLineInput[],
  line: TradeLineInput,
  replace = false,
): TradeLineInput[] {
  const previous = draft.find(
    (item) => item.goodId === line.goodId && item.direction === line.direction,
  );
  const validQuantity = Number.isSafeInteger(line.quantity) && line.quantity > 0;
  const next = {
    ...line,
    quantity: line.quantity + (replace || !validQuantity ? 0 : (previous?.quantity ?? 0)),
  };
  return [
    ...draft.filter((item) => item.goodId !== line.goodId || item.direction !== line.direction),
    next,
  ];
}
