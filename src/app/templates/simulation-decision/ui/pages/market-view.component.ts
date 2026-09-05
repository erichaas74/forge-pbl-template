import {
  afterNextRender,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { choiceProgression, goodIsUnlocked } from '../../domain/choice-progression';
import {
  effectiveTradeUnitPrice,
  marketPrice,
  marketStockRemaining,
  previewTrade,
  purchaseDiscountPercent,
  tradeLineTotal,
} from '../../domain/simulation-decision.engine';
import type {
  MarketStallDefinition,
  TradeLineInput,
} from '../../domain/simulation-decision.models';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';
import { changeTradePlan } from '../../runtime/simulation-planning';
import { ReviewDialogDirective } from '../review-dialog.directive';
import { ChoiceProgressionPanelComponent } from '../progression/choice-progression-panel.component';
import { IllustratedWagonComponent } from '../art/illustrated-wagon.component';

@Component({
  selector: 'app-simulation-market-view',
  imports: [
    FormsModule,
    ReviewDialogDirective,
    ChoiceProgressionPanelComponent,
    IllustratedWagonComponent,
  ],
  templateUrl: './market-view.component.html',
  styleUrl: './market-view.component.scss',
})
export class SimulationMarketViewComponent implements OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly plan = this.runtime.planning.at(this.runtime.state().currentLocationId);
  readonly selectedGoodId = this.plan.goodId;
  readonly direction = this.plan.direction;
  readonly quantity = this.plan.quantity;
  readonly filter = this.plan.filter;
  readonly draft = this.plan.draft;
  readonly editing = this.plan.editing;
  readonly showAll = this.plan.showAll;
  readonly shopInteriorOpen = signal(false);
  readonly reviewOpen = signal(false);
  readonly mathAnswers = signal<Readonly<Record<string, number | undefined>>>({});
  readonly lastReceiptId = signal<string | undefined>(undefined);
  readonly selectedStallId = this.plan.stallId;
  readonly draggedTrade = signal<{ goodId: string; direction: 'buy' | 'sell' } | undefined>(
    undefined,
  );
  readonly wagonBump = signal(false);
  readonly tradeFeedback = signal<{ amountCents: number; label: string } | undefined>(undefined);
  readonly receiptLines = signal<readonly TradeLineInput[]>([]);
  readonly plannedRoute = computed(() =>
    this.runtime.config.routes.find(
      (route) =>
        route.id === this.plan.routeId() &&
        route.fromLocationId === this.runtime.state().currentLocationId,
    ),
  );
  readonly arrival = computed(() =>
    this.runtime
      .state()
      .routeHistory.find(
        (route) =>
          route.dayArrived !== undefined &&
          route.knownInfoSnapshot.toLocationId === this.runtime.state().currentLocationId,
      ),
  );
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
  readonly progression = computed(() =>
    choiceProgression(this.runtime.config, this.runtime.state()),
  );
  readonly availableGoodCount = computed(
    () => this.progression().currentStage.availableGoodIds.length,
  );
  readonly nextProgressRequirement = computed(() =>
    this.progression().nextRequirements.find((requirement) => !requirement.complete),
  );
  readonly recommendedStallId = computed(() =>
    this.nextProgressRequirement()?.key === 'minimumDiscoveredStalls'
      ? this.scene()?.stalls.find((stall) => !this.stallDiscovered(stall.id))?.id
      : undefined,
  );
  readonly purchasedGoodIds = computed(
    () =>
      new Set(
        this.runtime
          .state()
          .ledger.filter((entry) => entry.type === 'purchase')
          .map((entry) => entry.details?.goodId)
          .filter((goodId): goodId is string => goodId !== undefined),
      ),
  );
  readonly recommendedGoodIds = computed(() =>
    this.nextProgressRequirement()?.key === 'minimumPurchasedGoodTypes'
      ? this.progression()
          .currentStage.availableGoodIds.filter((goodId) => !this.purchasedGoodIds().has(goodId))
          .filter((goodId) => {
            const category = this.runtime.config.goods.find((good) => good.id === goodId)?.category;
            return category !== undefined && this.discoveredCategories().includes(category);
          })
          .sort((left, right) => this.routeFitScore(right) - this.routeFitScore(left))
          .slice(0, 2)
      : [],
  );

  readonly selectedGood = computed(() =>
    this.runtime.config.goods.find((good) => good.id === this.selectedGoodId()),
  );
  readonly activeGood = computed(() => {
    const good = this.selectedGood();
    return good !== undefined &&
      goodIsUnlocked(this.runtime.config, this.runtime.state(), good.id) &&
      this.discoveredCategories().includes(good.category)
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
  readonly selectedDiscountPercent = computed(() =>
    purchaseDiscountPercent(this.runtime.config, this.direction(), this.quantity()),
  );
  readonly candidateDraft = computed(() =>
    changeTradePlan(
      this.draft(),
      {
        goodId: this.selectedGoodId(),
        direction: this.direction(),
        quantity: this.quantity(),
      },
      this.editing(),
    ),
  );
  readonly selectedLinePreview = computed(() =>
    previewTrade(this.runtime.config, this.runtime.state(), this.candidateDraft()),
  );
  readonly draftPreview = computed(() =>
    previewTrade(this.runtime.config, this.runtime.state(), this.draft()),
  );
  readonly transactionMathRequired = computed(
    () => this.runtime.config.transactionMath?.answerRequired ?? false,
  );
  readonly discountRuleSummary = computed(() => {
    const tiers = [...(this.runtime.config.transactionMath?.purchaseDiscountTiers ?? [])].sort(
      (left, right) => left.minimumQuantity - right.minimumQuantity,
    );
    return tiers
      .map((tier, index) => {
        const next = tiers[index + 1];
        const quantityLabel = next
          ? `${tier.minimumQuantity}–${next.minimumQuantity - 1} units`
          : `${tier.minimumQuantity}+ units`;
        return `${quantityLabel} save ${tier.discountPercent}%`;
      })
      .join(' · ');
  });
  readonly tradeMathComplete = computed(
    () =>
      !this.transactionMathRequired() ||
      (this.draft().length > 0 && this.draft().every((line) => this.lineMathCorrect(line))),
  );
  readonly travelMoneyNeeded = computed(() => this.plannedRoute()?.supplyCostCents ?? 0);
  readonly tradePlanValid = computed(
    () =>
      this.draftPreview().valid &&
      (this.plannedRoute() === undefined ||
        this.draftPreview().cashAfterCents >= this.travelMoneyNeeded()),
  );
  readonly discoveredCategories = computed(
    () =>
      this.scene()
        ?.stalls.filter((stall) => this.stallDiscovered(stall.id))
        .flatMap((stall) => [...stall.categories]) ?? [],
  );
  readonly visibleGoods = computed(() => {
    const term = this.filter().trim().toLowerCase();
    const categories = this.showAll()
      ? this.discoveredCategories()
      : (this.selectedStall()?.categories ?? []);
    if (categories.length === 0) {
      return [];
    }
    return this.runtime.config.goods.filter(
      (good) =>
        this.runtime.currentMarket()?.goods.some((marketGood) => marketGood.goodId === good.id) &&
        goodIsUnlocked(this.runtime.config, this.runtime.state(), good.id) &&
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
      const plannedSales = this.draft()
        .filter((line) => line.goodId === goodId && line.direction === 'sell')
        .reduce((total, line) => total + line.quantity, 0);
      const remainingOwned = Math.max(0, this.owned(goodId) - plannedSales);
      return quantity > 0
        ? [
            {
              key: goodId,
              goodId,
              name: good?.name ?? goodId,
              icon: good?.icon ?? '□',
              quantity,
              ownedQuantity: remainingOwned,
              proposedQuantity: Math.max(0, quantity - remainingOwned),
              packageKind: good?.cargoPackage,
            },
          ]
        : [];
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
    return stall.rumor;
  });

  constructor() {
    const intent = this.runtime.takeMarketIntent();
    if (intent !== undefined) {
      const category = this.runtime.config.goods.find(
        (good) => good.id === intent.goodId,
      )?.category;
      const stall = this.scene()?.stalls.find((item) => item.categories.includes(category ?? ''));
      if (stall !== undefined) {
        this.inspectStall(stall);
      }
      this.select(intent.goodId, intent.direction);
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

  routeFitScore(goodId: string): number {
    const route = this.plannedRoute();
    const good = this.runtime.config.goods.find((item) => item.id === goodId);
    const buy = this.buyPrice(goodId);
    const destinationSell =
      route === undefined
        ? undefined
        : marketPrice(this.runtime.config, route.toLocationId, goodId, 'sell');
    if (good === undefined || buy <= 0 || destinationSell === undefined) return 0;
    return (destinationSell - buy) / buy / Math.max(1, good.unitCargo);
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
    this.showAll.set(false);
    this.selectedStallId.set(stall.id);
    this.shopInteriorOpen.set(true);
    this.runtime.inspectMarketStall(stall.id);
    const firstGood = this.runtime.config.goods.find(
      (good) =>
        stall.categories.includes(good.category) &&
        goodIsUnlocked(this.runtime.config, this.runtime.state(), good.id),
    );
    if (firstGood !== undefined) {
      this.select(
        firstGood.id,
        this.owned(firstGood.id) > 0 &&
          this.runtime.state().currentLocationId !== this.runtime.config.startingLocationId
          ? 'sell'
          : 'buy',
      );
    }
    this.revealInView('.market-board');
  }

  returnToStreet(): void {
    const stallId = this.selectedStallId();
    this.shopInteriorOpen.set(false);
    afterNextRender(
      () => {
        const selector = stallId === undefined ? '.stall' : `[data-stall-id="${stallId}"]`;
        const storefront = this.element.nativeElement.querySelector<HTMLElement>(selector);
        storefront?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }

  private revealInView(selector: string): void {
    afterNextRender(
      () => {
        const target = this.element.nativeElement.querySelector<HTMLElement>(selector);
        if (target === null) return;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
          behavior: reducedMotion ? 'instant' : 'smooth',
        });
        target.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
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

  dropAtMerchant(event: DragEvent, stall: MarketStallDefinition): void {
    event.preventDefault();
    const trade = this.draggedTrade();
    if (trade?.direction !== 'sell') {
      return;
    }
    const good = this.runtime.config.goods.find((item) => item.id === trade.goodId);
    if (!good || !stall.categories.includes(good.category)) {
      this.runtime.errors.set([
        'This merchant does not trade that good. Choose a matching storefront.',
      ]);
      this.draggedTrade.set(undefined);
      return;
    }
    this.inspectStall(stall);
    this.select(trade.goodId, 'sell');
    this.addToDraft();
    this.draggedTrade.set(undefined);
  }

  select(goodId: string, direction: 'buy' | 'sell', quantity = 1): void {
    this.editing.set(false);
    this.selectedGoodId.set(goodId);
    this.direction.set(direction);
    this.quantity.set(quantity);
  }

  selectFromList(goodId: string, direction: 'buy' | 'sell'): void {
    this.select(goodId, direction);
    this.revealInView('.selection');
  }

  adjustQuantity(change: number): void {
    this.quantity.update((value) => Math.max(1, value + change));
  }

  lineKey(line: Pick<TradeLineInput, 'goodId' | 'direction'>): string {
    return `${line.direction}:${line.goodId}`;
  }

  postedUnitPrice(line: Pick<TradeLineInput, 'goodId' | 'direction'>): number {
    return (
      marketPrice(
        this.runtime.config,
        this.runtime.state().currentLocationId,
        line.goodId,
        line.direction,
      ) ?? 0
    );
  }

  discountPercent(line: Pick<TradeLineInput, 'direction' | 'quantity'>): number {
    return purchaseDiscountPercent(this.runtime.config, line.direction, line.quantity);
  }

  discountedUnitPrice(line: Pick<TradeLineInput, 'goodId' | 'direction' | 'quantity'>): number {
    return effectiveTradeUnitPrice(
      this.runtime.config,
      this.runtime.state().currentLocationId,
      line,
    );
  }

  expectedLineTotal(line: Pick<TradeLineInput, 'goodId' | 'direction' | 'quantity'>): number {
    return tradeLineTotal(this.runtime.config, this.runtime.state().currentLocationId, line);
  }

  mathAnswer(line: Pick<TradeLineInput, 'goodId' | 'direction'>): number | undefined {
    return this.mathAnswers()[this.lineKey(line)];
  }

  setMathAnswer(line: Pick<TradeLineInput, 'goodId' | 'direction'>, value: unknown): void {
    const amount = value === '' || value === null ? Number.NaN : Number(value);
    const cents = Number.isFinite(amount) ? Math.round(amount * 100) : undefined;
    this.mathAnswers.update((answers) => ({ ...answers, [this.lineKey(line)]: cents }));
  }

  lineMathCorrect(line: Pick<TradeLineInput, 'goodId' | 'direction' | 'quantity'>): boolean {
    return this.mathAnswer(line) === this.expectedLineTotal(line);
  }

  openTradeReview(): void {
    if (!this.tradePlanValid()) return;
    this.runtime.dismissErrors();
    this.reviewOpen.set(true);
  }

  addToDraft(): void {
    this.saveCandidate(
      changeTradePlan(this.draft(), {
        goodId: this.selectedGoodId(),
        direction: this.direction(),
        quantity: this.quantity(),
      }),
    );
  }

  saveSelection(): void {
    if (this.saveCandidate(this.candidateDraft())) {
      const line = this.draft().find(
        (item) => item.goodId === this.selectedGoodId() && item.direction === this.direction(),
      );
      if (line) this.editLine(line);
    }
  }

  editLine(line: TradeLineInput): void {
    this.select(line.goodId, line.direction, line.quantity);
    this.editing.set(true);
  }

  cargoClick(goodId: string, proposed: boolean): void {
    const line = this.draft().find((item) => item.goodId === goodId && item.direction === 'buy');
    if (proposed && line) this.editLine(line);
    else this.select(goodId, 'sell');
  }

  private saveCandidate(candidate: TradeLineInput[]): boolean {
    const preview = previewTrade(this.runtime.config, this.runtime.state(), candidate);
    if (!preview.valid) {
      this.runtime.errors.set(preview.errors);
      if (preview.errors.some((error) => /cargo|capacity|fit/i.test(error))) {
        this.wagonBump.set(true);
        clearTimeout(this.bumpTimer);
        this.bumpTimer = setTimeout(() => this.wagonBump.set(false), 550);
      }
      return false;
    }
    const route = this.plannedRoute();
    if (route !== undefined && preview.cashAfterCents < route.supplyCostCents) {
      this.runtime.errors.set([
        `Keep ${this.runtime.money(route.supplyCostCents)} for ${route.name} travel. Lower the quantity or choose a less expensive good.`,
      ]);
      return false;
    }
    this.runtime.dismissErrors();
    this.draft.set(candidate);
    this.mathAnswers.set({});
    return true;
  }

  removeLine(line: TradeLineInput): void {
    this.draft.update((items) => items.filter((item) => item !== line));
    this.mathAnswers.set({});
    this.editing.set(false);
  }

  clearDraft(): void {
    this.draft.set([]);
    this.mathAnswers.set({});
    this.editing.set(false);
    this.reviewOpen.set(false);
  }

  confirmTrade(): void {
    if (!this.reviewOpen() || this.draft().length === 0 || !this.tradePlanValid()) return;
    if (this.transactionMathRequired() && !this.tradeMathComplete()) {
      this.runtime.errors.set([
        'Every line needs the correct transaction total before the merchant can complete the trade.',
      ]);
      return;
    }
    const beforeCount = this.runtime.state().ledger.length;
    const feedback = this.draftPreview().netCashChangeCents;
    const verifiedLines = this.draft().map((line) => ({
      ...line,
      studentTotalCents: this.mathAnswer(line),
    }));
    if (!this.runtime.commitTrade(verifiedLines)) {
      return;
    }
    this.lastReceiptId.set(this.runtime.state().ledger[beforeCount]?.id);
    this.receiptLines.set(verifiedLines);
    this.clearDraft();
    this.pinReceipt();
    this.tradeFeedback.set({
      amountCents: feedback,
      label: 'Trade complete · Cash change',
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
      summary: this.receiptLines()
        .map(
          (line) =>
            `${line.direction} ${line.quantity} ${this.goodName(line.goodId)} × ${this.runtime.money(this.discountedUnitPrice(line))} = ${this.runtime.money(this.expectedLineTotal(line))}`,
        )
        .join('; '),
    });
  }
}
