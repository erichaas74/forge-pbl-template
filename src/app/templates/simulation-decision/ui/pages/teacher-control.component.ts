import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';

type Confirmation = 'restart' | 'clear' | 'inject' | 'skip' | undefined;

@Component({
  selector: 'app-simulation-teacher-control',
  imports: [FormsModule],
  templateUrl: './teacher-control.component.html',
  styleUrl: './teacher-control.component.scss',
})
export class SimulationTeacherControlComponent {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly seedInput = signal(this.runtime.state().seed);
  readonly difficultyInput = signal(this.runtime.state().difficulty);
  readonly eventId = signal(this.runtime.config.events[0]?.id ?? '');
  readonly confirmation = signal<Confirmation>(undefined);
  readonly ledgerExpenses = computed(
    () =>
      -this.runtime
        .state()
        .ledger.filter((entry) => entry.cashChangeCents < 0)
        .reduce((total, entry) => total + entry.cashChangeCents, 0),
  );
  readonly progressPercent = computed(() =>
    Math.min(
      100,
      Math.round((this.runtime.state().currentDay / this.runtime.config.maxSeasonDays) * 100),
    ),
  );

  applyScenarioSettings(): void {
    const seedChanged = this.runtime.teacherSetSeed(Math.trunc(this.seedInput()));
    if (seedChanged) {
      this.runtime.teacherSetDifficulty(this.difficultyInput());
    }
  }

  confirmAction(): void {
    switch (this.confirmation()) {
      case 'restart':
        this.runtime.restart();
        break;
      case 'clear':
        this.runtime.clearSavedData();
        this.runtime.navigate('setup');
        break;
      case 'inject':
        this.runtime.teacherInjectEvent(this.eventId());
        break;
      case 'skip':
        this.runtime.teacherSkipEvent();
        break;
    }
    this.confirmation.set(undefined);
  }

  eventTitle(eventId: string): string {
    return this.runtime.config.events.find((event) => event.id === eventId)?.title ?? eventId;
  }

  eventInjectionLocked(): boolean {
    const state = this.runtime.state();
    const effectiveStatus =
      state.status === 'paused_by_teacher' ? state.pausedFromStatus : state.status;
    return (
      state.pendingEventId !== undefined ||
      effectiveStatus === 'not_started' ||
      effectiveStatus === 'season_complete' ||
      effectiveStatus === 'submitted'
    );
  }

  print(): void {
    window.print();
  }
}
