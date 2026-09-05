import { Component, computed, inject } from '@angular/core';

import type { LedgerEntry } from '../../domain/simulation-decision.models';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';

@Component({
  selector: 'app-simulation-season-results',
  templateUrl: './season-results.component.html',
  styleUrl: './season-results.component.scss',
})
export class SimulationSeasonResultsComponent {
  readonly runtime = inject(SimulationDecisionRuntimeService);

  readonly saleDecisions = computed(() =>
    this.runtime
      .state()
      .ledger.filter((entry) => entry.type === 'sale')
      .map((entry) => ({
        entry,
        profitCents: entry.cashChangeCents - (entry.details?.costBasisCents ?? 0),
      }))
      .sort((a, b) => b.profitCents - a.profitCents),
  );
  readonly strongestSale = computed(() => this.saleDecisions()[0]);
  readonly weakestSale = computed(() => this.saleDecisions().at(-1));
  readonly cashTimeline = computed(() => {
    const ledger = this.runtime.state().ledger;
    const values = ledger.map((entry) => entry.cashBalanceCents);
    const maximum = Math.max(this.runtime.config.startingCashCents, ...values, 1);
    return ledger.map((entry) => ({
      entry,
      width: Math.max(2, (entry.cashBalanceCents / maximum) * 100),
    }));
  });
  readonly profitableTrades = computed(
    () => this.saleDecisions().filter((decision) => decision.profitCents > 0).length,
  );
  readonly routeForecast = computed(() =>
    [...this.runtime.state().routeHistory].reverse().find((route) => route.forecast !== undefined)
      ?.forecast,
  );
  readonly actualTripProfitCents = computed(
    () =>
      this.runtime.results().salesRevenueCents -
      (this.routeForecast()?.goodsCostCents ?? this.runtime.results().goodsPurchasedCents) -
      this.runtime.results().supplyCostsCents -
      this.runtime.results().eventExpensesCents +
      this.runtime.results().eventIncomeCents,
  );
  readonly forecastDifferenceCents = computed(
    () => this.actualTripProfitCents() - (this.routeForecast()?.expectedTripProfitCents ?? 0),
  );

  goodName(entry: LedgerEntry): string {
    return (
      this.runtime.config.goods.find((good) => good.id === entry.details?.goodId)?.name ??
      entry.description
    );
  }

  locationName(locationId: string): string {
    return (
      this.runtime.config.locations.find((location) => location.id === locationId)?.name ??
      locationId
    );
  }

  print(): void {
    window.print();
  }
}
