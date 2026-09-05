import { Component, computed, inject, input, signal } from '@angular/core';

import type { DebateFaction, DebateTurn } from '../domain/debate-studio.models';
import { DebateStudioRuntimeService } from '../runtime/debate-studio-runtime.service';

@Component({
  selector: 'app-debate-faction-rail',
  templateUrl: './debate-faction-rail.component.html',
  styleUrl: './debate-faction-rail.component.scss',
  host: {
    '[class.left-rail]': "side() === 'left'",
    '[class.right-rail]': "side() === 'right'",
    '[class.viewer-rail]': 'isViewerFaction()',
    '[class.opponent-rail]': '!isViewerFaction()',
    '[class.rail-active]': 'isActive()',
  },
})
export class DebateFactionRailComponent {
  readonly runtime = inject(DebateStudioRuntimeService);
  readonly faction = input.required<DebateFaction>();
  readonly side = input.required<'left' | 'right'>();
  readonly expandedTurnId = signal<string | undefined>(undefined);

  readonly turns = computed(() =>
    this.runtime
      .session()
      .turns.filter((turn) => turn.factionId === this.faction().id)
      .sort((left, right) => left.order - right.order),
  );
  readonly filedTurns = computed(() => this.turns().filter((turn) => turn.status === 'filed'));
  readonly currentFactionTurn = computed(() =>
    this.turns().find((turn) => ['available', 'drafting'].includes(turn.status)),
  );
  readonly isViewerFaction = computed(() => this.runtime.viewerFaction()?.id === this.faction().id);
  readonly isActive = computed(() => {
    if (this.runtime.chamberStage() === 'opponent') {
      return this.runtime.opponentFaction()?.id === this.faction().id;
    }
    if (this.runtime.chamberStage() === 'your-turn') return this.isViewerFaction();
    return false;
  });
  readonly hasIncomingArgument = computed(
    () =>
      !this.isViewerFaction() &&
      this.runtime.chamberStage() === 'opponent' &&
      this.runtime.previousOpponentTurn()?.factionId === this.faction().id,
  );

  isNewestIncoming(turn: DebateTurn): boolean {
    return this.hasIncomingArgument() && this.runtime.previousOpponentTurn()?.id === turn.id;
  }

  toggleReplay(turn: DebateTurn): void {
    if (turn.recording === undefined) {
      this.runtime.speak(turn.transcript ?? '');
      return;
    }
    this.expandedTurnId.update((id) => (id === turn.id ? undefined : turn.id));
  }

  openIncoming(): void {
    this.runtime.openStation('opponent');
  }

  openResponse(): void {
    this.runtime.openStation('lectern');
  }

  romanNumeral(turn: DebateTurn): string {
    const position = this.turns().findIndex((item) => item.id === turn.id) + 1;
    return ['I', 'II', 'III', 'IV', 'V', 'VI'][position - 1] ?? `${position}`;
  }

  formattedDuration(turn: DebateTurn): string {
    return this.runtime.formatTime(turn.durationSeconds ?? 0);
  }
}
