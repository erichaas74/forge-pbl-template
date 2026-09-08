import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LEAGUE_CONFIG } from '../runtime/league-runtime.service';
import { leagueDemoSnapshot, requireLeagueDemo } from '../domain/league-demo';
import { standings } from '../domain/league-engine';
import { LeagueLeaderboardComponent } from './league-leaderboard.component';

@Component({
  selector: 'app-league-final-demo',
  imports: [DecimalPipe, RouterLink, LeagueLeaderboardComponent],
  templateUrl: './league-final-demo.component.html',
  styleUrls: ['./league-shell.component.scss', './league-final-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeagueFinalDemoComponent implements OnDestroy {
  readonly config = inject(LEAGUE_CONFIG);
  readonly demo = requireLeagueDemo(this.config.finalDemo, this.config);
  readonly elapsed = signal(0);
  readonly playing = signal(true);
  readonly finished = computed(() => this.elapsed() >= this.demo.seconds);
  readonly seconds = computed(() => Math.ceil(this.demo.seconds - this.elapsed()));
  readonly timer = computed(() => `${Math.floor(this.seconds() / 60).toString().padStart(2, '0')}:${(this.seconds() % 60).toString().padStart(2, '0')}`);
  readonly step = computed(() => this.demo.frames.filter(frame => frame.at <= this.elapsed()).length);
  readonly snapshot = computed(() => leagueDemoSnapshot(this.config, this.demo, this.step()));
  readonly ranking = computed(() => standings(this.snapshot().teams));
  readonly leader = computed(() => this.config.teams.find(t => t.id === this.ranking()[0].id)!);
  readonly caption = computed(() => this.demo.frames[this.step() - 1]?.caption ?? this.demo.openingCaption);
  readonly updates = computed(() => this.demo.frames.slice(0, this.step()).reverse());
  readonly margin = computed(() => this.ranking()[0].score - this.ranking()[1].score);
  readonly decision = computed(() => {
    const index = Math.max(0, this.step() - 1);
    const frame = this.demo.frames[index];
    const decision = frame.decision;
    if (!decision) return null;
    return { ...decision, team: this.config.teams.find(t => t.id === decision.teamId)!,
      settled: this.step() > index, revenue: decision.units * decision.unitPrice,
      cost: decision.units * decision.unitCost, profit: decision.units * (decision.unitPrice - decision.unitCost),
      rank: this.ranking().findIndex(t => t.id === decision.teamId) + 1 };
  });
  private lastTick = Date.now();
  private readonly interval = setInterval(() => this.tick(), 250);

  private tick(): void {
    const now = Date.now();
    if (this.playing()) {
      this.elapsed.update(value => Math.min(this.demo.seconds, value + Math.max(0, now - this.lastTick) / 1000));
      if (this.finished()) this.playing.set(false);
    }
    this.lastTick = now;
  }
  togglePlayback(): void {
    this.tick();
    if (!this.finished()) this.playing.update(value => !value);
  }
  replay(): void {
    this.lastTick = Date.now();
    this.elapsed.set(0);
    this.playing.set(true);
  }
  showFinal(): void { this.elapsed.set(this.demo.seconds); this.playing.set(false); }
  ngOnDestroy(): void { clearInterval(this.interval); }
}
