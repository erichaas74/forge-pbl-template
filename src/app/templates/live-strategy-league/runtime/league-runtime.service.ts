import { computed, inject, Injectable, InjectionToken, OnDestroy, signal } from '@angular/core';
import { applyLeagueCommand, createLeague, decisionError, standings } from '../domain/league-engine';
import { availableBudget, decisionCost } from '../domain/league-calculations';
import type { LeagueCommand, LeagueConfig, LeagueDecision, LeagueSnapshot } from '../domain/league.models';
import { LEAGUE_PERSISTENCE } from './league.persistence';

export const LEAGUE_CONFIG = new InjectionToken<LeagueConfig>('League configuration');
@Injectable()
export class LeagueRuntimeService implements OnDestroy {
  readonly config = inject(LEAGUE_CONFIG);
  private readonly persistence = inject(LEAGUE_PERSISTENCE);
  readonly state = signal<LeagueSnapshot>(createLeague(this.config));
  readonly draft = signal<LeagueDecision>(structuredClone(this.state().teams[0].decision));
  readonly error = signal('');
  readonly blocked = signal(false);
  readonly now = signal(Date.now());
  readonly round = computed(() => this.config.rounds[this.state().round]);
  readonly team = computed(() => this.state().teams[0]);
  readonly ranking = computed(() => standings(this.state().teams));
  readonly validation = computed(() => decisionError(this.config, this.state(), this.draft()));
  readonly cost = computed(() => decisionCost(this.config.modelId, this.draft().values, this.round().world));
  readonly budget = computed(() => availableBudget(this.config.modelId, this.team().state));
  readonly editable = computed(() => this.state().phase === 'decision-open' && this.team().decision.lockedAt === undefined && this.state().deadline !== null && !this.blocked());
  readonly seconds = computed(() => this.state().pausedSeconds ?? (this.state().deadline === null ?
    (this.state().phase === 'preview' ? this.round().seconds : 0) : Math.max(0, Math.ceil((this.state().deadline! - this.now()) / 1000))));
  readonly timer = computed(() => `${Math.floor(this.seconds() / 60).toString().padStart(2, '0')}:${(this.seconds() % 60).toString().padStart(2, '0')}`);
  private readonly interval: ReturnType<typeof setInterval>;

  constructor() {
    try {
      const saved = this.persistence.load();
      if (saved) {
        if (saved.round < 0 || saved.round >= this.config.rounds.length || saved.teams.length !== this.config.teams.length ||
          saved.teams.some((t, i) => t.id !== this.config.teams[i].id) ||
          !['preview', 'decision-open', 'decision-locked', 'revealing', 'results', 'complete'].includes(saved.phase))
          throw new Error('Saved practice does not match this project.');
        this.state.set(saved);
        this.draft.set(structuredClone(saved.teams[0].decision));
      }
    } catch (error) { this.fail(error); this.blocked.set(true); }
    this.interval = setInterval(() => {
      this.now.set(Date.now());
      if (!this.blocked() && this.state().phase === 'decision-open' && this.state().deadline !== null && this.seconds() === 0)
        this.command({ type: 'close' });
    }, 500);
  }
  ngOnDestroy(): void { clearInterval(this.interval); }
  updateValue(id: string, value: number): void {
    this.draft.update(d => ({ ...d, values: { ...d.values, [id]: value } }));
  }
  updateNote(reasoning: string): void { this.draft.update(d => ({ ...d, reasoning })); }
  updatePrediction(prediction: number | null): void { this.draft.update(d => ({ ...d, prediction })); }
  saveDraft(): void { if (this.editable() && !this.validation()) this.command({ type: 'draft', decision: this.draft() }); }
  lock(): void { this.command({ type: 'lock', decision: this.draft() }); }
  command(command: LeagueCommand): void {
    if (this.blocked()) return;
    try {
      this.now.set(Date.now());
      const next = applyLeagueCommand(this.config, this.state(), command, this.now());
      this.persistence.save(next, this.state().revision);
      this.state.set(next);
      if (command.type !== 'draft') this.draft.set(structuredClone(next.teams[0].decision));
      this.error.set('');
    } catch (error) {
      this.fail(error);
      // Stop deadline retries after an unavailable storage or stale-tab failure.
      if (command.type === 'close') this.blocked.set(true);
    }
  }
  private fail(error: unknown): void { this.error.set(error instanceof Error ? error.message : 'Practice could not be saved.'); }
}
