import { Component, computed, input, output } from '@angular/core';
import type { BracketMatch, CompetitionTeam } from '../domain/competition.models';

@Component({
  selector: 'app-competition-bracket', standalone: true,
  template: `
    <div class="bracket-scroll" tabindex="0" aria-label="Championship bracket; scroll horizontally for later rounds">
    <div class="bracket" [style.width.px]="width()" [style.height.px]="height()">
      <svg aria-hidden="true" class="connections" [attr.width]="width()" [attr.height]="height()">
        @for (line of connections(); track line.id) { <path [attr.d]="line.path" [class.decided]="line.complete" /> }
      </svg>
      @for (round of rounds(); track round) {
        <section [style.left.px]="round * 320"><h3>{{ roundName(round) }}</h3>
          @for (match of matches(); track match.id) {
            @if (match.round === round) {
              <article [style.top.px]="center(match) - 63" [class.complete]="match.status === 'complete'" [class.live]="match.status === 'live'">
                <small>{{ match.bye ? 'BYE · ADVANCES' : match.status === 'live' ? 'ON STAGE' : match.status === 'complete' ? 'FINAL SCORE' : 'MATCH ' + (match.position + 1) }}</small>
                @for (id of match.teamIds; track id) {
                  <p [class.winner]="match.winnerId === id"><span class="seed">{{ seed(id) }}</span><span class="team-name">{{ name(id) }}</span>
                    <strong>{{ score(match, id) }}</strong><span class="check">{{ match.winnerId === id ? '✓' : '' }}</span>
                  </p>
                }
                @if (!match.teamIds.length) { <p>Winners of {{ match.sources.join(' + ') }}</p> }
                @if (canStart() && match.status === 'ready') {
                  <button (click)="start.emit(match.id)">Run {{ name(match.teamIds[0]) }} vs {{ name(match.teamIds[1]) }}</button>
                }
              </article>
            }
          }
        </section>
      }
      @if (hybrid()) {
        <section class="final-stage" [style.left.px]="finalLeft()" [style.top.px]="height() / 2 - 170">
          <div class="final-title"><span>THE CHAMPIONSHIP SHOW</span><h3>The final stage</h3></div>
          @for (slot of finalists(); track slot.id) {
            <p class="finalist" [class.qualified]="slot.teamId"><span class="star">{{ slot.teamId ? '★' : '◇' }}</span><strong>{{ slot.teamId ? name(slot.teamId) : slot.label }}</strong><small>{{ slot.teamId ? 'QUALIFIED' : 'PLACE TO BE WON' }}</small></p>
          }
          <div class="final-signoff">ONE STAGE. ONE CHAMPION.<span>Every finalist starts with a fresh scoreboard.</span></div>
        </section>
      }
    </div></div>`,
  styles: [`
    .bracket-scroll{overflow-x:auto;padding-bottom:1rem;outline-offset:3px}.bracket{position:relative;margin-inline:auto}.connections{position:absolute;inset:0;pointer-events:none}
    path{fill:none;stroke:#45566f;stroke-width:1.5}path.decided{stroke:var(--broadcast-accent,#edc875)}section{position:absolute;top:0;width:260px}
    h3{font-size:11px;color:var(--broadcast-accent,#edc875);text-transform:uppercase;letter-spacing:1.5px;font-weight:500;margin:0;min-height:35px;max-width:250px}
    article{position:absolute;left:0;width:260px;box-sizing:border-box;border:1px solid #394b65;border-radius:4px;background:#101d30;overflow:hidden;animation:enter .6s both}
    article.complete{border-color:#847449}article.live{border-color:var(--broadcast-accent,#edc875);box-shadow:0 0 24px #e2b86222}small{display:block;font-size:8px;letter-spacing:1.5px;color:#8fa5bf;background:#0b1525;padding:9px 12px}
    p{display:flex;align-items:center;gap:9px;margin:0;padding:10px 12px;color:#c9d7e9;font-size:12px;border-top:1px solid #263750}.team-name{flex:1;overflow-wrap:anywhere}.seed{font-size:9px;color:#899db6;min-width:14px}strong{font-variant-numeric:tabular-nums;font-weight:500}.check{width:9px;color:var(--broadcast-accent,#edc875)}p.winner{background:#aa874714;color:white}
    button{border:0;border-top:1px solid #47516b;background:#1c2b40;color:var(--broadcast-accent,#edc875);width:100%;min-height:44px;padding:9px 12px;font-size:10px;cursor:pointer;text-align:left}button:hover{background:#293a51}button:focus-visible{outline:2px solid white;outline-offset:-3px}
    .final-stage{width:400px;border:1px solid #9a804b;background:radial-gradient(ellipse at top,#354059,#0b1525 65%);box-shadow:0 20px 60px #0004;border-radius:6px;overflow:hidden}.final-title{height:70px;box-sizing:border-box;padding:16px 22px}.final-title>span{font-size:8px;letter-spacing:2px;color:#aabaCF}.final-title h3{font-size:22px;letter-spacing:0;text-transform:none;margin:6px 0;max-width:none}.finalist{height:60px;box-sizing:border-box;padding:12px 20px;gap:14px}.finalist strong{flex:1;font-size:18px}.finalist small{background:none;padding:0;font-size:7px;letter-spacing:1px}.star{color:var(--broadcast-accent,#edc875);font-size:20px}.qualified{background:#c4a3600e;animation:enter .7s both}.final-signoff{padding:20px 22px;color:var(--broadcast-accent,#edc875);font-size:10px;letter-spacing:2px;border-top:1px solid #76643f}.final-signoff span{display:block;color:#aabbd2;letter-spacing:0;font-size:10px;margin-top:8px}
    @keyframes enter{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media(prefers-reduced-motion:reduce){article{animation:none}}
  `],
})
export class CompetitionBracketComponent {
  readonly matches = input.required<BracketMatch[]>();
  readonly teams = input.required<CompetitionTeam[]>();
  readonly hybrid = input(false);
  readonly canStart = input(false);
  readonly start = output<string>();
  readonly rounds = computed(() => [...new Set(this.matches().map(m => m.round))]);
  readonly finalLeft = computed(() => this.rounds().length * 320 + 70);
  readonly width = computed(() => this.hybrid() ? this.finalLeft() + 400 : this.rounds().length * 320);
  readonly lastMatches = computed(() => this.matches().filter(m => m.round === this.rounds().at(-1)).sort((a, b) => a.position - b.position));
  readonly finalists = computed(() => this.lastMatches().length ? this.lastMatches().map(m => ({ id: m.id, teamId: m.winnerId, label: `Winner of match ${m.position + 1}` })) : this.teams().map(t => ({ id: t.id, teamId: t.id, label: t.name })));
  readonly height = computed(() => Math.max(this.hybrid() ? 430 : 210, this.matches().filter(m => m.round === 0).length * 190 + 50));
  readonly connections = computed(() => this.matches().flatMap(match => {
    const next = this.matches().find(m => m.sources.includes(match.id));
    if (!next) {
      if (!this.hybrid()) return [];
      const x = match.round * 320 + 260; const finalY = this.height() / 2 - 70 + this.lastMatches().findIndex(m => m.id === match.id) * 60;
      return [{ id: match.id, complete: match.status === 'complete', path: `M ${x} ${this.center(match)} H ${x + 55} V ${finalY} H ${this.finalLeft()}` }];
    }
    const x = match.round * 320 + 260; const y = this.center(match); const nextY = this.center(next);
    return [{ id: match.id, complete: match.status === 'complete', path: `M ${x} ${y} H ${x + 30} V ${nextY} H ${x + 60}` }];
  }));
  center(match: BracketMatch): number { return 50 + (match.position + .5) * 2 ** match.round * 190; }
  score(match: BracketMatch, id: string): number | string { return match.scores[id] ?? '—'; }
  name(id: string): string { return this.teams().find(t => t.id === id)?.name ?? id; }
  seed(id: string): number { return this.teams().findIndex(t => t.id === id) + 1; }
  roundName(round: number): string {
    const remaining = this.rounds().length - round;
    return this.hybrid() ? (remaining === 1 ? 'Win a place in the final show' : 'Round of 16') :
      ({ 1: 'Championship', 2: 'Semifinals', 3: 'Quarterfinals', 4: 'Round of 16' }[remaining] ?? 'Bracket');
  }
}
