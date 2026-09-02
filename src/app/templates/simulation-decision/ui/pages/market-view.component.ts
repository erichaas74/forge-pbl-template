import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  marketPrice,
  marketStockRemaining,
  previewTrade,
} from '../../domain/simulation-decision.engine';
import type { TradeLineInput } from '../../domain/simulation-decision.models';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';

@Component({
  selector: 'app-simulation-market-view',
  imports: [FormsModule],
  templateUrl: './market-view.component.html',
  styleUrl: './market-view.component.scss',
})
export class SimulationMarketViewComponent {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly selectedGoodId = signal(this.runtime.config.goods[0]?.id ?? '');
  readonly direction = signal<'buy' | 'sell'>(
    this.runtime.state().currentLocationId === this.runtime.config.startingLocationId
      ? 'buy'
      : 'sell',
  );
  readonly quantity = signal(1);
  readonly filter = signal('');
  readonly draft = signal<TradeLineInput[]>([]);
  readonly reviewOpen = signal(false);
  readonly lastReceiptId = signal<string | undefined>(undefined);

  readonly selectedGood = computed(() =>
    this.runtime.config.goods.find((good) => good.id === this.selectedGoodId()),
  );
  readonly selectedMarketGood = computed(() =>
    this.runtime.currentMarket()?.goods.find((good) => good.goodId === this.selectedGoodId()),
  );
  readonly ownedQuantity = computed(
    () =>
      this.runtime.state().inventory.find((item) => item.goodId === this.selectedGoodId())
        ?.quantity ?? 0,
  );
  readonly unitPrice = computed(
    () =>
      marketPrice(
        this.runtime.config,
        this.runtime.state().currentLocationId,
        this.selectedGoodId(),
        this.direction(),
      ) ?? 0,
  );
  readonly selectedLinePreview = computed(() =>
    previewTrade(this.runtime.config, this.runtime.state(), [
      {
        goodId: this.selectedGoodId(),
        direction: this.direction(),
        quantity: Math.max(0, Math.trunc(this.quantity())),
      },
    ]),
  );
  readonly draftPreview = computed(() =>
    previewTrade(this.runtime.config, this.runtime.state(), this.draft()),
  );
  readonly visibleGoods = computed(() => {
    const term = this.filter().trim().toLowerCase();
    return this.runtime.config.goods.filter(
      (good) =>
        this.runtime.currentMarket()?.goods.some((marketGood) => marketGood.goodId === good.id) &&
        (term.length === 0 ||
          good.name.toLowerCase().includes(term) ||
          good.category.toLowerCase().includes(term)),
    );
  });

  buyPrice(goodId: string): number {
    return (
      marketPrice(this.runtime.config, this.runtime.state().currentLocationId, goodId, 'buy') ?? 0
    );
  }

  sellPrice(goodId: string): number {
    return (
      marketPrice(this.runtime.config, this.runtime.state().currentLocationId, goodId, 'sell') ?? 0
    );
  }

  marketGood(goodId: string) {
    return this.runtime.currentMarket()?.goods.find((item) => item.goodId === goodId);
  }

  stockRemaining(goodId: string): number {
    return marketStockRemaining(
      this.runtime.config,
      this.runtime.state(),
      this.runtime.state().currentLocationId,
      goodId,
    );
  }

  owned(goodId: string): number {
    return this.runtime.state().inventory.find((item) => item.goodId === goodId)?.quantity ?? 0;
  }

  goodName(goodId: string): string {
    return this.runtime.config.goods.find((good) => good.id === goodId)?.name ?? goodId;
  }

  select(goodId: string, direction: 'buy' | 'sell', quantity = 1): void {
    this.selectedGoodId.set(goodId);
    this.direction.set(direction);
    this.quantity.set(Math.max(1, quantity));
  }

  adjustQuantity(change: number): void {
    this.quantity.update((value) => Math.max(1, value + change));
  }

  addToDraft(): void {
    const line: TradeLineInput = {
      goodId: this.selectedGoodId(),
      direction: this.direction(),
      quantity: Math.max(1, Math.trunc(this.quantity())),
    };
    const candidate = [
      ...this.draft().filter(
        (item) => item.goodId !== line.goodId || item.direction !== line.direction,
      ),
      line,
    ];
    const preview = previewTrade(this.runtime.config, this.runtime.state(), candidate);
    if (!preview.valid) {
      this.runtime.errors.set(preview.errors);
      return;
    }
    this.runtime.dismissErrors();
    this.draft.set(candidate);
  }

  removeLine(line: TradeLineInput): void {
    this.draft.update((items) => items.filter((item) => item !== line));
  }

  clearDraft(): void {
    this.draft.set([]);
    this.reviewOpen.set(false);
  }

  confirmTrade(): void {
    const beforeCount = this.runtime.state().ledger.length;
    if (!this.runtime.commitTrade(this.draft())) {
      return;
    }
    this.lastReceiptId.set(this.runtime.state().ledger[beforeCount]?.id);
    this.clearDraft();
  }

  pinReceipt(): void {
    const entryId = this.lastReceiptId();
    const entry = this.runtime.state().ledger.find((item) => item.id === entryId);
    if (entry === undefined) {
      return;
    }
    this.runtime.pinEvidence({
      id: `evidence-${entry.id}`,
      sourceType: 'ledger',
      sourceId: entry.id,
      title: `Trade receipt · Day ${entry.day}`,
      summary: `${entry.description}; cash changed ${this.runtime.money(entry.cashChangeCents, true)}.`,
    });
  }
}
