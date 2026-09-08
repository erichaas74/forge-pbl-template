import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEAGUE_CONFIG } from '../runtime/league-runtime.service';
import { createLeague } from '../domain/league-engine';
import { leagueDemoSnapshot, requireLeagueDemo } from '../domain/league-demo';
import { LeagueLeaderboardComponent } from './league-leaderboard.component';

@Component({
  selector: 'app-league-launch',
  imports: [RouterLink, LeagueLeaderboardComponent],
  templateUrl: './league-launch.component.html',
  styleUrls: ['./league-shell.component.scss', './league-launch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeagueLaunchComponent implements OnDestroy {
  readonly config = inject(LEAGUE_CONFIG);
  readonly copy = this.config.launch;
  readonly team = this.config.teams[0];
  readonly demo = this.config.finalDemo ? requireLeagueDemo(this.config.finalDemo, this.config) : null;
  readonly playing = signal(true);
  readonly elapsed = signal(0);
  readonly cycle = computed(() => this.demo ? Math.floor(this.elapsed() / (this.demo.seconds + 6)) : 0);
  readonly step = computed(() => {
    const demo = this.demo;
    return demo ? demo.frames.filter(frame => frame.at <= this.elapsed() % (demo.seconds + 6)).length : 0;
  });
  readonly animationStep = computed(() => this.cycle() * ((this.demo?.frames.length ?? 0) + 1) + this.step());
  readonly snapshot = computed(() => this.demo ? leagueDemoSnapshot(this.config, this.demo, this.step()) : createLeague(this.config));
  private lastTick = Date.now();
  private readonly interval = this.demo ? setInterval(() => this.tick(), 500) : null;
  private tick(): void {
    const now = Date.now();
    if (this.playing()) this.elapsed.update(value => value + Math.max(0, now - this.lastTick) / 1000);
    this.lastTick = now;
  }
  togglePreview(): void { this.tick(); this.playing.update(value => !value); }
  ngOnDestroy(): void { if (this.interval !== null) clearInterval(this.interval); }
}
