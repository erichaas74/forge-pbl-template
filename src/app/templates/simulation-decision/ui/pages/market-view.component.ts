import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  marketPrice,
  marketStockRemaining,
  previewTrade,
} from '../../domain/simulation-decision.engine';
import type {
  MarketStallDefinition,
  TradeLineInput,
} from '../../domain/simulation-decision.models';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';

@Component({
  selector: 'app-simulation-market-view',
  imports: [FormsModule],
  templateUrl: './market-view.component.html',
  styleUrl: './market-view.component.scss',
})
export class SimulationMarketViewComponent implements OnDestroy {
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
  readonly selectedStallId = signal<string | undefined>(undefined);
  readonly draggedTrade = signal<{ goodId: string; direction: 'buy' | 'sell' } | undefined>(
    undefined,
  );
  readonly wagonBump = signal(false);
  readonly tradeFeedback = signal<{ amountCents: number; label: string } | undefined>(undefined);
  private feedbackTimer?: ReturnType<typeof setTimeout>;
  private bumpTimer?: ReturnType<typeof setTimeout>;

  readonly scene = computed(() =>
    this.runtime.config.world.locations.find(
      (scene) => scene.locationId === this.runtime.state().currentLocationId,
    ),
  );
  readonly selectedStall = computed(() =>
    this.scene()?.stalls.find((stall) => stall.id === this.selectedStallId()),
  );
  readonly discoveredStallIds = computed(
    () => this.runtime.state().marketDiscoveries[this.runtime.state().currentLocationId] ?? [],
  );

  readonly selectedGood = computed(() =>
    this.runtime.config.goods.find((good) => good.id === this.selectedGoodId()),
  );
  readonly activeGood = computed(() => {
    const good = this.selectedGood();
    return good !== undefined && this.selectedStall()?.categories.includes(good.category)
      ? good
      : undefined;
  });
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
    const categories = this.selectedStall()?.categories ?? [];
    if (this.selectedStall() === undefined || categories.length === 0) {
      return [];
    }
    return this.runtime.config.goods.filter(
      (good) =>
        this.runtime.currentMarket()?.goods.some((marketGood) => marketGood.goodId === good.id) &&
        categories.includes(good.category) &&
        (term.length === 0 ||
          good.name.toLowerCase().includes(term) ||
          good.category.toLowerCase().includes(term)),
    );
  });
  readonly visualCargo = computed(() => {
    const quantities = new Map(
      this.runtime.state().inventory.map((item) => [item.goodId, item.quantity]),
    );
    for (const line of this.draft()) {
      const current = quantities.get(line.goodId) ?? 0;
      quantities.set(
        line.goodId,
        Math.max(0, current + (line.direction === 'buy' ? line.quantity : -line.quantity)),
      );
    }
    return [...quantities.entries()].flatMap(([goodId, quantity]) => {
      const good = this.runtime.config.goods.find((item) => item.id === goodId);
      return Array.from({ length: quantity }, (_, index) => ({
        key: `${goodId}-${index}`,
        goodId,
        name: good?.name ?? goodId,
        icon: good?.icon ?? '□',
        proposed: index >= (this.owned(goodId) ?? 0),
      }));
    });
  });
  readonly merchantMessage = computed(() => {
    const stall = this.selectedStall();
    const good = this.selectedGood();
    if (stall === undefined) {
      return 'Choose a storefront to meet its merchant and discover what is sold there.';
    }
    if (good === undefined || !stall.categories.includes(good.category)) {
      return stall.greeting;
    }
    if (
      this.direction() === 'buy' &&
      this.selectedLinePreview().cargoAfter > this.runtime.capacity()
    ) {
      return `That load will not fit. ${stall.merchantName} points to the wagon springs.`;
    }
    if (this.quantity() >= 5) {
      return `A serious order. Compare the total with your cash reserve before we shake on it.`;
    }
    return this.marketGood(good.id)?.trend === 'higher'
      ? `Demand is climbing. ${stall.rumor}`
      : stall.rumor;
  });

  constructor() {
    const intent = this.runtime.takeMarketIntent();
    if (intent !== undefined) {
      this.select(intent.goodId, intent.direction);
      const category = this.runtime.config.goods.find(
        (good) => good.id === intent.goodId,
      )?.category;
      const stall = this.scene()?.stalls.find((item) => item.categories.includes(category ?? ''));
      if (stall !== undefined) {
        this.inspectStall(stall);
      }
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.feedbackTimer);
    clearTimeout(this.bumpTimer);
  }

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

  inspectStall(stall: MarketStallDefinition): void {
    this.selectedStallId.set(stall.id);
    this.runtime.inspectMarketStall(stall.id);
    const firstGood = this.runtime.config.goods.find((good) =>
      stall.categories.includes(good.category),
    );
    if (firstGood !== undefined) {
      this.select(firstGood.id, this.owned(firstGood.id) > 0 ? this.direction() : 'buy');
    }
  }

  stallDiscovered(stallId: string): boolean {
    return this.discoveredStallIds().includes(stallId);
  }

  beginDrag(goodId: string, direction: 'buy' | 'sell'): void {
    this.draggedTrade.set({ goodId, direction });
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  dropAtWagon(event: DragEvent): void {
    event.preventDefault();
    const trade = this.draggedTrade();
    if (trade?.direction !== 'buy') {
      return;
    }
    this.select(trade.goodId, 'buy');
    this.addToDraft();
    this.draggedTrade.set(undefined);
  }

  dropAtMerchant(event: DragEvent): void {
    event.preventDefault();
    const trade = this.draggedTrade();
    if (trade?.direction !== 'sell') {
      return;
    }
    this.select(trade.goodId, 'sell');
    this.addToDraft();
    this.draggedTrade.set(undefined);
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
      if (preview.errors.some((error) => /cargo|capacity|fit/i.test(error))) {
        this.wagonBump.set(true);
        clearTimeout(this.bumpTimer);
        this.bumpTimer = setTimeout(() => this.wagonBump.set(false), 550);
      }
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
    const feedback = this.draftPreview().netCashChangeCents;
    if (!this.runtime.commitTrade(this.draft())) {
      return;
    }
    this.lastReceiptId.set(this.runtime.state().ledger[beforeCount]?.id);
    this.clearDraft();
    this.tradeFeedback.set({
      amountCents: feedback,
      label: feedback >= 0 ? 'Sale complete' : 'Cargo loaded',
    });
    clearTimeout(this.feedbackTimer);
    this.feedbackTimer = setTimeout(() => this.tradeFeedback.set(undefined), 1800);
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
