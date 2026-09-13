import { ChangeDetectionStrategy, Component, DestroyRef, computed, effect, inject, input, signal } from '@angular/core';
import type { StudioTeam } from '../broadcast/broadcast.models';

interface Tile { team: StudioTeam; shown: number; }

/**
 * Scores that visibly move. The number counts up to its new total while the award
 * chip rises beside it, so a class sees points being added rather than just replaced.
 * The final value is always in the DOM, so a screen reader never depends on the animation.
 */
@Component({
  selector: 'app-scoreboard', changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="board" [attr.aria-label]="label()">
      @for (tile of tiles(); track tile.team.id) {
        <article [class.correct]="tile.team.verdict === 'correct'" [class.miss]="tile.team.verdict === 'miss'"
          [class.lead]="tile.team.id === leaderId()" [style.--team]="tile.team.color">
          <h3>{{ tile.team.name }}</h3>
          <strong [class.rolling]="tile.shown !== tile.team.score">{{ tile.shown }}</strong>
          <small>points</small>
          @if (tile.team.award !== null) {
            <span class="award" [class.up]="tile.team.award > 0" [class.down]="tile.team.award < 0">
              {{ tile.team.award > 0 ? '+' : tile.team.award < 0 ? '−' : '' }}{{ abs(tile.team.award) }}
            </span>
            <span class="mark" aria-hidden="true">{{ tile.team.verdict === 'correct' ? '✓' : '✗' }}</span>
            <span class="sr-only">{{ tile.team.verdict === 'correct' ? 'Correct' : 'No points' }}, {{ tile.team.award }} points, {{ tile.team.score }} total</span>
          }
        </article>
      }
    </div>`,
  styles: [`
    :host{display:block}
    .board{display:flex;gap:1rem;flex-wrap:wrap}
    article{flex:1;min-width:118px;position:relative;text-align:center;padding:1rem .6rem 1.1rem;border:1px solid #2b3b54;border-top:2px solid var(--team,#edc875);border-radius:4px;background:#101c2d;overflow:hidden;transition:border-color .3s,background .3s}
    article::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 120%,var(--team),transparent 70%);opacity:0;transition:opacity .5s;pointer-events:none}
    article.correct{border-color:var(--team)}article.correct::after{opacity:.22}
    article.miss{border-top-color:#e0736b;opacity:.72}
    article.lead{box-shadow:0 0 0 1px var(--team) inset}
    h3{margin:0 0 .5rem;font-size:14px;font-weight:500;overflow-wrap:anywhere}
    strong{display:block;font-size:34px;font-weight:400;font-variant-numeric:tabular-nums;line-height:1.1}
    strong.rolling{color:var(--team)}
    small{display:block;margin-top:6px;text-transform:uppercase;letter-spacing:2px;font-size:9px;color:#a8b8ce}
    .award{position:absolute;top:6px;right:8px;font-size:15px;font-weight:700;font-variant-numeric:tabular-nums;animation:lift 1.4s ease-out both}
    .award.up{color:var(--team)}.award.down{color:#e0736b}
    .mark{position:absolute;top:8px;left:9px;font-size:15px;color:var(--team)}
    article.miss .mark{color:#e0736b}
    .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
    @keyframes lift{0%{opacity:0;transform:translateY(16px) scale(.7)}25%{opacity:1;transform:translateY(0) scale(1.15)}60%{transform:translateY(0) scale(1)}100%{opacity:1;transform:translateY(-4px) scale(1)}}
    @media(prefers-reduced-motion:reduce){.award{animation:none}article::after{transition:none}}
    @media(max-width:700px){article{min-width:96px;padding:.7rem .4rem .8rem}strong{font-size:26px}}
  `],
})
export class ScoreboardComponent {
  readonly teams = input.required<StudioTeam[]>();
  readonly label = input('Scoreboard');
  /** Skips the roll-up for reduced-motion viewers. */
  readonly animate = input(true);
  private readonly shown = signal<Record<string, number>>({});
  /** Plain field, not a signal: reading the last totals inside the effect would make it retrigger itself. */
  private previous: Record<string, number> = {};
  private frame = 0;
  readonly leaderId = computed(() => [...this.teams()].sort((a, b) => b.score - a.score)[0]?.id ?? '');
  readonly tiles = computed<Tile[]>(() => this.teams().map(team => ({ team, shown: this.shown()[team.id] ?? team.score })));
  abs(value: number): number { return Math.abs(value); }
  constructor() {
    effect(() => {
      const teams = this.teams(); const animate = this.animate();
      const from = this.previous;
      const targets = Object.fromEntries(teams.map(t => [t.id, t.score]));
      this.previous = targets;
      const still = teams.every(t => (from[t.id] ?? t.score) === t.score);
      if (!animate || still || typeof requestAnimationFrame === 'undefined') { this.shown.set(targets); return; }
      const start = performance.now(); const duration = 900;
      cancelAnimationFrame(this.frame);
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - t, 3);
        this.shown.set(Object.fromEntries(teams.map(team => {
          const previous = from[team.id] ?? team.score;
          return [team.id, Math.round(previous + (team.score - previous) * ease)];
        })));
        if (t < 1) this.frame = requestAnimationFrame(step);
      };
      this.frame = requestAnimationFrame(step);
    });
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }
}
