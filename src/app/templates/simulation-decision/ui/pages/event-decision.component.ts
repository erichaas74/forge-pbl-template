import {
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';
import type { EventHistoryEntry } from '../../domain/simulation-decision.models';
import { IllustratedWagonComponent } from '../art/illustrated-wagon.component';
import { routeJourneyPresentation } from '../map/route-journey.presentation';
import { ReviewDialogDirective } from '../review-dialog.directive';

@Component({
  selector: 'app-simulation-event-decision',
  imports: [FormsModule, IllustratedWagonComponent, ReviewDialogDirective],
  templateUrl: './event-decision.component.html',
  styleUrl: './event-decision.component.scss',
})
export class SimulationEventDecisionComponent implements OnDestroy {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly selectedChoiceId = signal('');
  readonly reasoning = signal('');
  readonly mathAnswer = signal<number | undefined>(undefined);
  readonly showHint = signal(false);
  readonly reviewOpen = signal(false);
  readonly journeyPaused = signal(false);
  readonly speed = signal<1 | 2>(1);
  readonly resolvedFeedback = signal<EventHistoryEntry | undefined>(undefined);
  readonly journey = computed(() =>
    routeJourneyPresentation(this.runtime.config, this.runtime.state()),
  );
  readonly outcomePanel = viewChild<ElementRef<HTMLElement>>('outcomePanel');
  private readonly injector = inject(Injector);
  readonly journeyMoving = signal(false);
  private resolutionTimer?: ReturnType<typeof setTimeout>;
  private journeyTimer?: ReturnType<typeof setTimeout>;

  readonly event = computed(() =>
    this.runtime.config.events.find((event) => event.id === this.runtime.state().pendingEventId),
  );
  readonly selectedChoice = computed(() =>
    this.event()?.choices.find((choice) => choice.id === this.selectedChoiceId()),
  );
  readonly travel = computed(() => this.runtime.state().activeTravel);
  readonly route = computed(() =>
    this.runtime.config.routes.find((route) => route.id === this.travel()?.routeId),
  );
  readonly lastDecision = computed(() => this.runtime.state().eventHistory.at(-1));
  readonly lastEvent = computed(() =>
    this.runtime.config.events.find((event) => event.id === this.lastDecision()?.eventId),
  );
  readonly mathCorrect = computed(() => {
    const challenge = this.event()?.mathChallenge;
    return challenge === undefined || this.mathAnswer() === challenge.answer;
  });
  readonly eventScene = computed(() => {
    const title = this.event()?.title.toLowerCase() ?? '';
    if (/river|water|crossing/.test(title)) return 'river';
    if (/wheel|repair|break/.test(title)) return 'breakdown';
    if (/food|supply|ration|reserve/.test(title)) return 'camp';
    if (/rumor|market|shared|trader/.test(title)) return 'opportunity';
    if (/hail|storm|weather/.test(title)) return 'storm';
    return 'trail';
  });
  readonly journeyEnvironment = computed(() => {
    const terrain = this.route()?.terrain ?? [];
    if (terrain.includes('mountain') || terrain.includes('rocky')) return 'mountain';
    if (terrain.includes('river')) return 'river';
    if (terrain.includes('forest')) return 'forest';
    return 'plains';
  });
  readonly wagonCargo = computed(() =>
    this.runtime.state().inventory.map((item) => {
      const good = this.runtime.config.goods.find((definition) => definition.id === item.goodId);
      return {
        goodId: item.goodId,
        name: good?.name ?? item.goodId,
        quantity: item.quantity,
        packageKind: good?.cargoPackage,
      };
    }),
  );

  ngOnDestroy(): void {
    clearTimeout(this.resolutionTimer);
    clearTimeout(this.journeyTimer);
  }

  choiceAffordable(cashChangeCents: number): boolean {
    return this.runtime.cash() + cashChangeCents >= 0;
  }

  destinationName(): string {
    const destinationId = this.route()?.toLocationId;
    return (
      this.runtime.config.locations.find((location) => location.id === destinationId)?.name ?? ''
    );
  }

  eventTitle(eventId: string): string {
    return this.runtime.config.events.find((event) => event.id === eventId)?.title ?? eventId;
  }

  selectChoice(choiceId: string): void {
    this.selectedChoiceId.set(choiceId);
  }

  openReview(): void {
    if (this.selectedChoice() === undefined) {
      return;
    }
    if (this.event()?.mathChallenge !== undefined && this.mathAnswer() === undefined) {
      this.runtime.errors.set(['Complete the math check before reviewing this choice.']);
      return;
    }
    if (this.event()?.mathChallenge !== undefined && !this.mathCorrect()) {
      this.runtime.errors.set([
        'Try the math check again. A correct answer unlocks the trail choice.',
      ]);
      return;
    }
    if (this.reasoning().trim().length < 12) {
      this.runtime.errors.set(['Explain why this choice fits your strategy before reviewing it.']);
      return;
    }
    this.reviewOpen.set(true);
  }

  resolve(): void {
    const choice = this.selectedChoice();
    if (!this.reviewOpen() || choice === undefined || this.resolvedFeedback() !== undefined) {
      return;
    }
    // Commit first. Rejected decisions never display a successful consequence.
    if (!this.runtime.resolveEvent(this.selectedChoiceId(), this.reasoning(), this.mathAnswer()))
      return;
    this.reviewOpen.set(false);
    this.pinLastDecision();
    if (this.runtime.saveState() !== 'save_failed') this.resolvedFeedback.set(this.lastDecision());
    this.selectedChoiceId.set('');
    this.reasoning.set('');
    this.mathAnswer.set(undefined);
    this.showHint.set(false);
    afterNextRender(
      () => {
        this.outcomePanel()?.nativeElement.scrollIntoView?.({ block: 'nearest', behavior: 'auto' });
        this.outcomePanel()?.nativeElement.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
    const reducedMotion =
      typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.resolutionTimer = setTimeout(
      () => this.resolvedFeedback.set(undefined),
      reducedMotion ? 0 : 1600,
    );
  }

  advance(): void {
    if (this.journeyPaused()) {
      return;
    }
    let advanced = false;
    for (let count = 0; count < this.speed(); count += 1) {
      if (!this.runtime.advanceTravel() || this.runtime.state().pendingEventId !== undefined) {
        break;
      }
      advanced = true;
      if (this.runtime.state().activeTravel === undefined) {
        break;
      }
    }
    if (advanced) {
      const reducedMotion =
        typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reducedMotion) {
        this.journeyMoving.set(true);
        clearTimeout(this.journeyTimer);
        this.journeyTimer = setTimeout(() => this.journeyMoving.set(false), 900);
      }
    }
  }

  pinLastDecision(): void {
    const decision = this.lastDecision();
    const event = this.lastEvent();
    if (decision === undefined || event === undefined) {
      return;
    }
    this.runtime.pinEvidence({
      id: `evidence-${decision.id}`,
      sourceType: 'event',
      sourceId: decision.id,
      title: `Event decision · ${event.title}`,
      summary: `${decision.outcome} Cash changed ${this.runtime.money(decision.cashAfterCents - decision.cashBeforeCents, true)}.`,
    });
  }
}
