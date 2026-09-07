import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  Injector,
  OnDestroy,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import type { EventHistoryEntry, LedgerEntry } from '../../domain/simulation-decision.models';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';

interface ShowcaseLoadRow {
  goodId: string;
  name: string;
  icon: string;
  quantity: number;
  cargoSpaces: number;
  costCents: number;
}

@Component({
  selector: 'app-simulation-final-showcase',
  templateUrl: './final-showcase.component.html',
  styleUrl: './final-showcase.component.scss',
})
export class SimulationFinalShowcaseComponent implements OnDestroy {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly readOnly = input(false);
  private readonly stage = viewChild<ElementRef<HTMLElement>>('presentationStage');
  private readonly injector = inject(Injector);
  readonly Math = Math;
  readonly activeSlide = signal(0);
  readonly presenting = signal(false);
  readonly timerRunning = signal(false);
  readonly remainingSeconds = signal(this.runtime.config.finalShowcase?.pitchSeconds ?? 180);
  readonly audiencePromptIndex = signal(0);
  readonly slides = [
    { label: 'Season result', shortLabel: 'Result', icon: '★' },
    { label: 'Route and load', shortLabel: 'Plan', icon: '⌁' },
    { label: 'Math proof', shortLabel: 'Math', icon: '÷' },
    { label: 'Adaptation', shortLabel: 'Revise', icon: '↻' },
    { label: 'Team defense', shortLabel: 'Defend', icon: '✦' },
  ] as const;
  readonly primaryJourney = computed(() => this.runtime.state().routeHistory.at(-1));
  readonly route = computed(() => this.primaryJourney()?.knownInfoSnapshot);
  readonly startLocation = computed(() =>
    this.runtime.config.locations.find((location) => location.id === this.route()?.fromLocationId),
  );
  readonly destination = computed(() =>
    this.runtime.config.locations.find((location) => location.id === this.route()?.toLocationId),
  );
  readonly forecast = computed(() => this.primaryJourney()?.forecast);
  readonly actualTripProfitCents = computed(
    () =>
      this.runtime.results().salesRevenueCents -
      (this.forecast()?.goodsCostCents ?? this.runtime.results().goodsPurchasedCents) -
      this.runtime.results().supplyCostsCents -
      this.runtime.results().eventExpensesCents +
      this.runtime.results().eventIncomeCents,
  );
  readonly forecastErrorCents = computed(
    () => this.actualTripProfitCents() - (this.forecast()?.expectedTripProfitCents ?? 0),
  );
  readonly loadRows = computed<readonly ShowcaseLoadRow[]>(() => {
    const rows = new Map<string, ShowcaseLoadRow>();
    const ledger = this.runtime.state().ledger;
    const firstTravelIndex = ledger.findIndex((entry) => entry.type === 'travel');
    const openingEntries = ledger.slice(0, firstTravelIndex < 0 ? ledger.length : firstTravelIndex);
    for (const entry of openingEntries) {
      if (entry.type !== 'purchase' || entry.details?.goodId === undefined) continue;
      const good = this.runtime.config.goods.find((item) => item.id === entry.details?.goodId);
      if (good === undefined) continue;
      const quantity = entry.details.quantity ?? 0;
      const current = rows.get(good.id);
      rows.set(good.id, {
        goodId: good.id,
        name: good.name,
        icon: good.icon,
        quantity: (current?.quantity ?? 0) + quantity,
        cargoSpaces: (current?.cargoSpaces ?? 0) + quantity * good.unitCargo,
        costCents: (current?.costCents ?? 0) + Math.abs(entry.cashChangeCents),
      });
    }
    return [...rows.values()].sort((left, right) => right.costCents - left.costCents);
  });
  readonly plannedCargoSpaces = computed(() =>
    this.loadRows().reduce((total, row) => total + row.cargoSpaces, 0),
  );
  readonly strongestSale = computed(
    () =>
      this.runtime
        .state()
        .ledger.filter((entry) => entry.type === 'sale')
        .map((entry) => ({
          entry,
          profitCents: entry.cashChangeCents - (entry.details?.costBasisCents ?? 0),
        }))
        .sort((left, right) => right.profitCents - left.profitCents)[0],
  );
  readonly mostImpactfulEvent = computed(
    () =>
      [...this.runtime.state().eventHistory].sort(
        (left, right) => this.eventImpact(right) - this.eventImpact(left),
      )[0],
  );
  readonly reportHighlights = computed(() =>
    this.runtime.config.reportSections
      .map((definition) => ({
        definition,
        state: this.runtime.state().report.sections[definition.id],
      }))
      .filter((item) => (item.state?.response.trim().length ?? 0) > 0),
  );
  readonly readiness = computed(() => [
    {
      label: 'Season complete',
      complete: ['season_complete', 'submitted'].includes(this.runtime.state().status),
    },
    { label: 'Money audit reconciles', complete: this.runtime.reconciled() },
    { label: 'Route record saved', complete: this.runtime.state().routeHistory.length > 0 },
    {
      label: 'Math explanation ready',
      complete: this.runtime.config.reportSections
        .filter((section) => section.calculationRequired)
        .every(
          (section) =>
            (this.runtime.state().report.sections[section.id]?.calculation.trim().length ?? 0) > 0,
        ),
    },
  ]);
  readonly readyCount = computed(() => this.readiness().filter((item) => item.complete).length);
  readonly audiencePrompts = computed(
    () =>
      this.runtime.config.finalShowcase?.audiencePrompts ?? [
        'Which calculation best supports your strategy?',
      ],
  );
  readonly audiencePrompt = computed(
    () => this.audiencePrompts()[this.audiencePromptIndex()] ?? this.audiencePrompts()[0],
  );
  readonly timerLabel = computed(() => {
    const minutes = Math.floor(this.remainingSeconds() / 60);
    const seconds = this.remainingSeconds() % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  });
  private timer?: ReturnType<typeof setInterval>;

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  @HostListener('document:keydown', ['$event'])
  usePresentationKeys(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (target?.matches('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') this.moveSlide(1);
    else if (event.key === 'ArrowLeft' || event.key === 'PageUp') this.moveSlide(-1);
    else if (event.key === 'Home') this.setSlide(0);
    else if (event.key === 'End') this.setSlide(this.slides.length - 1);
    else if (event.key === 'Escape' && this.presenting()) this.presenting.set(false);
    else return;
    event.preventDefault();
  }

  setSlide(index: number): void {
    this.activeSlide.set(Math.min(this.slides.length - 1, Math.max(0, index)));
    afterNextRender(
      () => {
        const element = this.stage()?.nativeElement;
        element?.scrollIntoView({ block: 'nearest' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }

  moveSlide(change: number): void {
    this.setSlide(this.activeSlide() + change);
  }

  toggleTimer(): void {
    if (this.timerRunning()) {
      this.stopTimer();
      return;
    }
    if (this.remainingSeconds() === 0) this.resetTimer();
    this.timerRunning.set(true);
    this.timer = setInterval(() => {
      this.remainingSeconds.update((seconds) => Math.max(0, seconds - 1));
      if (this.remainingSeconds() === 0) this.stopTimer();
    }, 1_000);
  }

  resetTimer(): void {
    this.stopTimer();
    this.remainingSeconds.set(this.runtime.config.finalShowcase?.pitchSeconds ?? 180);
  }

  nextAudiencePrompt(): void {
    const count = this.audiencePrompts().length;
    if (count === 0) return;
    this.audiencePromptIndex.update((index) => (index + 1) % count);
  }

  goodName(entry: LedgerEntry): string {
    return (
      this.runtime.config.goods.find((good) => good.id === entry.details?.goodId)?.name ??
      entry.description
    );
  }

  eventTitle(entry: EventHistoryEntry): string {
    return (
      this.runtime.config.events.find((event) => event.id === entry.eventId)?.title ?? 'Trail event'
    );
  }

  eventCashChange(entry: EventHistoryEntry): number {
    return entry.cashAfterCents - entry.cashBeforeCents;
  }

  print(): void {
    window.print();
  }

  private eventImpact(entry: EventHistoryEntry): number {
    return (
      Math.abs(this.eventCashChange(entry)) + Math.abs(entry.cargoAfter - entry.cargoBefore) * 100
    );
  }

  private stopTimer(): void {
    clearInterval(this.timer);
    this.timer = undefined;
    this.timerRunning.set(false);
  }
}
