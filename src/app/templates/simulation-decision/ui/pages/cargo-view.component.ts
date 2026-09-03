import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { inventoryAverageCost, marketPrice } from '../../domain/simulation-decision.engine';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';

@Component({
  selector: 'app-simulation-cargo-view',
  imports: [FormsModule],
  templateUrl: './cargo-view.component.html',
  styleUrl: './cargo-view.component.scss',
})
export class SimulationCargoViewComponent {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly sortBy = signal<'name' | 'quantity' | 'cargo' | 'invested' | 'gain'>('cargo');
  readonly selectedGoodId = signal<string | undefined>(undefined);
  readonly draggedGoodId = signal<string | undefined>(undefined);

  readonly cargoPercent = computed(() =>
    this.runtime.capacity() === 0
      ? 0
      : Math.min(100, Math.round((this.runtime.usedCargo() / this.runtime.capacity()) * 100)),
  );
  readonly items = computed(() => {
    const values = this.runtime.state().inventory.map((item) => {
      const good = this.runtime.config.goods.find((definition) => definition.id === item.goodId)!;
      const averageCostCents = inventoryAverageCost(item);
      const investedCostCents = item.lots.reduce(
        (total, lot) => total + lot.quantity * lot.unitCostCents,
        0,
      );
      const currentUnitValueCents =
        marketPrice(
          this.runtime.config,
          this.runtime.state().currentLocationId,
          item.goodId,
          'sell',
        ) ?? 0;
      const currentValueCents = currentUnitValueCents * item.quantity;
      return {
        ...item,
        good,
        averageCostCents,
        investedCostCents,
        currentUnitValueCents,
        currentValueCents,
        totalCargo: good.unitCargo * item.quantity,
        gainCents: currentValueCents - investedCostCents,
      };
    });
    return [...values].sort((a, b) => {
      switch (this.sortBy()) {
        case 'name':
          return a.good.name.localeCompare(b.good.name);
        case 'quantity':
          return b.quantity - a.quantity;
        case 'invested':
          return b.investedCostCents - a.investedCostCents;
        case 'gain':
          return b.gainCents - a.gainCents;
        default:
          return b.totalCargo - a.totalCargo;
      }
    });
  });
  readonly mostSpace = computed(
    () => [...this.items()].sort((a, b) => b.totalCargo - a.totalCargo)[0],
  );
  readonly selectedItem = computed(() =>
    this.items().find((item) => item.goodId === this.selectedGoodId()),
  );
  readonly packedUnits = computed(() =>
    this.items().flatMap((item) =>
      Array.from({ length: item.quantity }, (_, index) => ({
        key: `${item.goodId}-${index}`,
        goodId: item.goodId,
        name: item.good.name,
        icon: item.good.icon,
      })),
    ),
  );
  readonly mostInvested = computed(
    () => [...this.items()].sort((a, b) => b.investedCostCents - a.investedCostCents)[0],
  );
  readonly highestGain = computed(
    () => [...this.items()].sort((a, b) => b.gainCents - a.gainCents)[0],
  );
  readonly highestLoss = computed(
    () => [...this.items()].sort((a, b) => a.gainCents - b.gainCents)[0],
  );
  readonly mostSpaceName = computed(() => this.mostSpace()?.good.name ?? 'None yet');
  readonly mostSpaceCargo = computed(() => this.mostSpace()?.totalCargo ?? 0);
  readonly mostInvestedName = computed(() => this.mostInvested()?.good.name ?? 'None yet');
  readonly mostInvestedValue = computed(() => this.mostInvested()?.investedCostCents ?? 0);
  readonly highestGainName = computed(() => this.highestGain()?.good.name ?? 'None yet');
  readonly highestGainValue = computed(() => this.highestGain()?.gainCents ?? 0);
  readonly highestLossName = computed(() =>
    (this.highestLoss()?.gainCents ?? 0) < 0 ? (this.highestLoss()?.good.name ?? 'None') : 'None',
  );

  lossValue(): number {
    return Math.min(0, this.highestLoss()?.gainCents ?? 0);
  }

  beginCargoDrag(goodId: string): void {
    this.draggedGoodId.set(goodId);
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  dropToSell(event: DragEvent): void {
    event.preventDefault();
    const goodId = this.draggedGoodId();
    if (goodId !== undefined) {
      this.runtime.planMarketTrade(goodId, 'sell');
    }
  }

  planSale(goodId: string): void {
    this.runtime.planMarketTrade(goodId, 'sell');
  }

  pinSnapshot(): void {
    this.runtime.pinEvidence({
      id: `evidence-cargo-day-${this.runtime.state().currentDay}`,
      sourceType: 'notebook',
      sourceId: `cargo-day-${this.runtime.state().currentDay}`,
      title: `Cargo snapshot · Day ${this.runtime.state().currentDay}`,
      summary: `${this.runtime.usedCargo()} of ${this.runtime.capacity()} spaces used; current market value ${this.runtime.money(this.runtime.cargoValue())}.`,
    });
  }
}
