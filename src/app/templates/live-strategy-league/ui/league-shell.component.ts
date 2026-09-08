import { afterNextRender, ChangeDetectionStrategy, Component, computed, effect, ElementRef, Injector, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { LeagueRuntimeService } from '../runtime/league-runtime.service';
import type { LeaguePhase } from '../domain/league.models';
import { LeagueLeaderboardComponent } from './league-leaderboard.component';

@Component({
  selector: 'app-league-shell',
  imports: [DecimalPipe, FormsModule, RouterLink, LeagueLeaderboardComponent],
  templateUrl: './league-shell.component.html',
  styleUrl: './league-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeagueShellComponent {
  readonly league = inject(LeagueRuntimeService);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  readonly controls = signal(false);
  readonly history = signal(false);
  readonly nextRound = computed(() => this.league.config.rounds.at(this.league.state().round + 1));
  readonly lastRound = computed(() => {
    const record = this.league.state().history.at(-1);
    const team = record?.teams.find(row => row.id === this.league.team().id);
    return record && team ? { round: record.round, team } : null;
  });
  readonly labels: Record<LeaguePhase, string> = {
    preview: 'Round preview', 'decision-open': 'Decisions open', 'decision-locked': 'All decisions locked',
    revealing: 'Results ready', results: 'Round complete', complete: 'League complete',
  };
  constructor() {
    let previous = this.league.state().phase;
    effect(() => {
      const phase = this.league.state().phase;
      if (phase === previous) return;
      previous = phase;
      this.focusRegion(phase === 'results' || phase === 'complete' ? '.stage' : '.project-header');
    });
  }
  toggleControls(): void {
    this.controls.update(open => !open);
    if (this.controls()) this.focusRegion('#teacher-controls');
  }
  toggleHistory(open = !this.history()): void {
    this.history.set(open);
    if (open) this.focusRegion('#round-history');
  }
  private focusRegion(selector: string): void {
    afterNextRender(() => {
      const region = this.element.nativeElement.querySelector<HTMLElement>(selector);
      region?.scrollIntoView?.({ block: 'nearest', behavior: 'instant' });
      region?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  teamName(id: string): string { return this.league.config.teams.find(t => t.id === id)?.name ?? id; }
  canLeave(): boolean { this.league.saveDraft(); return true; }
}
