export interface TradeWorldEventDefinition {
  readonly id: string;
  readonly kind: 'winter-storm' | 'flood' | 'conflict';
  readonly title: string;
  readonly description: string;
  readonly locationIds: readonly string[];
  readonly goodIds: readonly string[];
  readonly priceChangeBps: number;
  readonly durationTicks: number;
}

export interface TradeWorldShipmentDefinition {
  readonly id: string;
  readonly name: string;
  readonly routeId: string;
  readonly goodIds: readonly string[];
  readonly quantity: number;
  readonly travelTicks: number;
  readonly startOffset: number;
  readonly priceDropBps: number;
  readonly reliefTicks: number;
}

/** Optional local simulation capability, independent of any renderer or classroom backend. */
export interface TradeWorldDefinition {
  /** Defaults to real-time for existing packages. Turn-based worlds advance on departure and travel. */
  readonly timing?: 'real-time' | 'turn-based';
  readonly tickIntervalMs: number;
  readonly eventEveryTicks: number;
  readonly events: readonly TradeWorldEventDefinition[];
  readonly shipments: readonly TradeWorldShipmentDefinition[];
}

export interface TradeWorldEffect {
  readonly id: string;
  readonly sourceId: string;
  readonly kind: TradeWorldEventDefinition['kind'] | 'shipment';
  readonly title: string;
  readonly description: string;
  readonly locationIds: readonly string[];
  readonly goodIds: readonly string[];
  readonly priceChangeBps: number;
  readonly startedTick: number;
  readonly expiresTick: number;
}

export interface TradeWorldShipment {
  readonly id: string;
  readonly routeId: string;
  readonly direction: 'outbound' | 'return';
  readonly progressTicks: number;
  readonly deliveries: number;
}

export interface TradeWorldState {
  readonly tick: number;
  readonly paused: boolean;
  readonly shipments: readonly TradeWorldShipment[];
  readonly effects: readonly TradeWorldEffect[];
  readonly history: readonly TradeWorldEffect[];
  readonly deliveredStock: Readonly<Record<string, Readonly<Record<string, number>>>>;
}
