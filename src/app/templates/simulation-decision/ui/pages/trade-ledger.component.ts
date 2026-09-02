import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { LedgerEntry, LedgerEntryType } from '../../domain/simulation-decision.models';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';

type LedgerFilter = 'all' | 'trades' | 'travel' | 'events' | 'pinned';

@Component({
  selector: 'app-simulation-trade-ledger',
  imports: [FormsModule],
  templateUrl: './trade-ledger.component.html',
  styleUrl: './trade-ledger.component.scss',
})
export class SimulationTradeLedgerComponent {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly filter = signal<LedgerFilter>('all');
  readonly locationFilter = signal('all');
  readonly expandedId = signal<string | undefined>(undefined);

  readonly entries = computed(() =>
    this.runtime.state().ledger.filter((entry) => {
      const matchesLocation =
        this.locationFilter() === 'all' || entry.locationId === this.locationFilter();
      const matchesType = this.matchesFilter(entry.type, entry.id);
      return matchesLocation && matchesType;
    }),
  );
  readonly totalSpent = computed(
    () =>
      -this.runtime
        .state()
        .ledger.filter((entry) => entry.cashChangeCents < 0)
        .reduce((total, entry) => total + entry.cashChangeCents, 0),
  );
  readonly totalRevenue = computed(() =>
    this.runtime
      .state()
      .ledger.filter((entry) => entry.type !== 'startingCapital' && entry.cashChangeCents > 0)
      .reduce((total, entry) => total + entry.cashChangeCents, 0),
  );
  readonly tradeCount = computed(
    () =>
      this.runtime
        .state()
        .ledger.filter((entry) => entry.type === 'purchase' || entry.type === 'sale').length,
  );

  locationName(locationId: string): string {
    return (
      this.runtime.config.locations.find((location) => location.id === locationId)?.shortName ??
      locationId
    );
  }

  typeLabel(type: LedgerEntryType): string {
    const labels: Record<LedgerEntryType, string> = {
      startingCapital: 'Checkpoint',
      transport: 'Setup',
      purchase: 'Buy',
      sale: 'Sell',
      travel: 'Travel',
      eventIncome: 'Event income',
      eventExpense: 'Event expense',
      adjustment: 'Adjustment',
    };
    return labels[type];
  }

  isPinned(entryId: string): boolean {
    return this.runtime.state().evidence.some((item) => item.sourceId === entryId);
  }

  pin(entryId: string): void {
    const entry = this.runtime.state().ledger.find((item) => item.id === entryId);
    if (entry === undefined) {
      return;
    }
    this.runtime.pinEvidence({
      id: `evidence-${entry.id}`,
      sourceType: 'ledger',
      sourceId: entry.id,
      title: `${this.typeLabel(entry.type)} · Day ${entry.day}`,
      summary: `${entry.description}; cash change ${this.runtime.money(entry.cashChangeCents, true)}; balance ${this.runtime.money(entry.cashBalanceCents)}.`,
    });
  }

  unpin(entryId: string): void {
    const evidence = this.runtime.state().evidence.find((item) => item.sourceId === entryId);
    if (evidence !== undefined) {
      this.runtime.unpinEvidence(evidence.id);
    }
  }

  saveNote(entryId: string, note: string): void {
    this.runtime.annotateLedger(entryId, note);
  }

  absoluteCash(cents: number): string {
    return this.runtime.money(Math.abs(cents));
  }

  calculation(entry: LedgerEntry): string | undefined {
    const unitPrice = entry.details?.unitPriceCents;
    const quantity = entry.details?.quantity;
    return unitPrice === undefined || quantity === undefined
      ? undefined
      : `${this.runtime.money(unitPrice)} × ${quantity} = ${this.absoluteCash(entry.cashChangeCents)}`;
  }

  costBasis(entry: LedgerEntry): string | undefined {
    const cents = entry.details?.costBasisCents;
    return cents === undefined ? undefined : this.runtime.money(cents);
  }

  annotation(entryId: string): string {
    return this.runtime.state().ledgerAnnotations[entryId] ?? '';
  }

  private matchesFilter(type: LedgerEntryType, entryId: string): boolean {
    switch (this.filter()) {
      case 'trades':
        return type === 'purchase' || type === 'sale';
      case 'travel':
        return type === 'travel';
      case 'events':
        return type === 'eventIncome' || type === 'eventExpense';
      case 'pinned':
        return this.isPinned(entryId);
      default:
        return true;
    }
  }
}
