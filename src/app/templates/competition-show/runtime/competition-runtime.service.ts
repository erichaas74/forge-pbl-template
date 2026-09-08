import { computed, inject, Injectable, InjectionToken, OnDestroy, signal } from '@angular/core';
import { applyCompetitionRequest, createCompetition, finalTeams, leaders } from '../domain/competition-engine';
import type { CompetitionCommand, CompetitionConfig } from '../domain/competition.models';
import { COMPETITION_PERSISTENCE } from './competition.persistence';

export const COMPETITION_CONFIG = new InjectionToken<CompetitionConfig>('Competition configuration');
@Injectable()
export class CompetitionRuntimeService implements OnDestroy {
  readonly config = inject(COMPETITION_CONFIG);
  private readonly persistence = inject(COMPETITION_PERSISTENCE);
  readonly state = signal(createCompetition(this.config));
  readonly error = signal('');
  readonly blocked = signal(false);
  readonly now = signal(Date.now());
  readonly round = computed(() => this.config.rounds[this.state().roundIndex]);
  readonly finalists = computed(() => finalTeams(this.state()));
  readonly leaders = computed(() => leaders(this.state()));
  readonly seconds = computed(() => this.state().deadline === null ? this.state().remainingSeconds :
    Math.max(0, Math.ceil((this.state().deadline! - this.now()) / 1000)));
  readonly ranking = computed(() => [...this.state().participants].sort((a, b) => this.state().scores[b] - this.state().scores[a] || a.localeCompare(b)));
  private readonly interval: ReturnType<typeof setInterval>;
  constructor() {
    try {
      let restored = this.state();
      for (const request of this.persistence.load()) restored = applyCompetitionRequest(this.config, restored, request);
      this.state.set(restored);
    } catch (error) { this.fail(error); this.blocked.set(true); }
    this.interval = setInterval(() => {
      this.now.set(Date.now());
      if (!this.blocked() && this.state().phase === 'open' && this.seconds() === 0) this.command({ type: 'lock' });
    }, 250);
  }
  ngOnDestroy(): void { clearInterval(this.interval); }
  command(command: CompetitionCommand): boolean {
    if (this.blocked()) return false;
    try {
      const request = { id: crypto.randomUUID(), at: Date.now(), command };
      const previous = this.state();
      const next = applyCompetitionRequest(this.config, previous, request);
      try { this.persistence.append(request, previous.revision); }
      catch (error) { this.blocked.set(true); throw error; }
      this.state.set(next); this.now.set(request.at); this.error.set(''); return true;
    } catch (error) { this.fail(error); return false; }
  }
  name(id: string): string { return this.state().teams.find(t => t.id === id)?.name ?? id; }
  private fail(error: unknown): void { this.error.set(error instanceof Error ? error.message : 'Competition could not be saved.'); }
}
