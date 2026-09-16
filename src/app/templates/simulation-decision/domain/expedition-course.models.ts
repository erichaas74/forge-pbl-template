/** Optional round-trip trading capability. All money uses integer cents. */
export interface ExpeditionCourse {
  readonly capability: 'roundTripTrading';
  readonly cycles: readonly ExpeditionCycle[];
}
export interface ExpeditionCycle {
  readonly id: string;
  readonly title: string;
  readonly budgetCents: number;
  readonly capacity: number;
  readonly goodIds: readonly string[];
  readonly requiredLocationIds: readonly string[];
  readonly legs: readonly { routeId: string; days: number; costCents: number }[];
  readonly hazards: readonly ExpeditionHazard[];
}
export interface ExpeditionHazard {
  readonly id: string;
  readonly kind: 'winter-storm' | 'conflict' | 'flood';
  readonly title: string;
  readonly description: string;
  readonly afterLeg: number;
  readonly day: number;
  readonly choices: readonly {
    id: string;
    label: string;
    costCents: number;
    delayDays: number;
    lossUnits: number;
  }[];
}
export type ReceiptBin = 'income' | 'expense' | 'noncash';
export interface ExpeditionReceipt {
  readonly id: string;
  readonly day: number;
  readonly label: string;
  readonly amountCents: number;
  readonly cashDeltaCents: number;
  readonly kind: 'purchase' | 'sale' | 'travel' | 'risk' | 'loss';
}
export interface ExpeditionState {
  readonly revision: number;
  readonly cashCents: number;
  readonly locationId: string;
  readonly day: number;
  readonly inventory: Readonly<Record<string, { quantity: number; costCents: number }>>;
  readonly receipts: readonly ExpeditionReceipt[];
  readonly visited: readonly string[];
  readonly completedRoutes: readonly string[];
  readonly travel?: { routeId: string; elapsed: number; days: number };
  readonly pendingHazardId?: string;
  readonly resolvedHazards: readonly string[];
  readonly decisions?: readonly {
    label: string;
    day: number;
    costCents: number;
    delayDays: number;
    lostUnits: number;
  }[];
  readonly returned: boolean;
  readonly bins: Readonly<Record<string, ReceiptBin>>;
  readonly balanced: boolean;
  readonly reflection: string;
  readonly feedback: string;
}
export type ExpeditionAction =
  | { type: 'trade'; goodId: string; direction: 'buy' | 'sell'; quantity: number }
  | { type: 'depart'; routeId: string }
  | { type: 'advance' }
  | { type: 'resolve'; choiceId: string }
  | { type: 'file'; receiptId: string; bin: ReceiptBin }
  | { type: 'balance' }
  | { type: 'reflect'; text: string };
