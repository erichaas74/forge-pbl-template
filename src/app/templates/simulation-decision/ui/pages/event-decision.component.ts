import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';

@Component({
  selector: 'app-simulation-event-decision',
  imports: [FormsModule],
  templateUrl: './event-decision.component.html',
  styleUrl: './event-decision.component.scss',
})
export class SimulationEventDecisionComponent {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly selectedChoiceId = signal('');
  readonly reasoning = signal('');
  readonly mathAnswer = signal<number | undefined>(undefined);
  readonly showHint = signal(false);
  readonly reviewOpen = signal(false);
  readonly journeyPaused = signal(false);
  readonly speed = signal<1 | 2>(1);

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
    if (this.reasoning().trim().length < 12) {
      this.runtime.errors.set(['Explain why this choice fits your strategy before reviewing it.']);
      return;
    }
    this.reviewOpen.set(true);
  }

  resolve(): void {
    if (this.runtime.resolveEvent(this.selectedChoiceId(), this.reasoning(), this.mathAnswer())) {
      this.reviewOpen.set(false);
      this.selectedChoiceId.set('');
      this.reasoning.set('');
      this.mathAnswer.set(undefined);
      this.showHint.set(false);
    }
  }

  advance(): void {
    if (this.journeyPaused()) {
      return;
    }
    for (let count = 0; count < this.speed(); count += 1) {
      if (!this.runtime.advanceTravel() || this.runtime.state().pendingEventId !== undefined) {
        break;
      }
      if (this.runtime.state().activeTravel === undefined) {
        break;
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
