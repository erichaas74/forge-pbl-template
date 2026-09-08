import { afterRenderEffect, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { standings } from '../domain/league-engine';
import type { LeagueConfig, LeagueSnapshot } from '../domain/league.models';

@Component({
  selector: 'app-league-leaderboard',
  imports: [DecimalPipe],
  templateUrl: './league-leaderboard.component.html',
  styleUrl: './league-leaderboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeagueLeaderboardComponent {
  readonly config = input.required<LeagueConfig>();
  readonly snapshot = input.required<LeagueSnapshot>();
  readonly yourTeamId = input.required<string>();
  readonly completedRounds = input<number | null>(null);
  readonly animationStep = input<number | null>(null);
  readonly statusLabel = input('');
  readonly trendNote = input('');
  readonly note = input('Fictional team portraits · Standings update on reveal · Your score is not a course grade');
  readonly rounds = computed(() => this.completedRounds() ?? this.snapshot().history.length);
  readonly rows = computed(() => {
    const ranked = standings(this.snapshot().teams);
    return ranked.map((team, index) => {
      const identity = this.config().teams.find(t => t.id === team.id)!;
      const movement = this.rounds() >= 2 ? team.previousRank - index - 1 : 0;
      return { ...team, ...identity, rank: index + 1, movement, gap: ranked[0].score - team.score,
        trendLabel: this.rounds() === 0 ? 'Awaiting first result' : this.rounds() === 1 ? 'First ranking' :
          movement > 0 ? `Up ${movement} ${movement === 1 ? 'place' : 'places'}` :
          movement < 0 ? `Down ${-movement} ${movement === -1 ? 'place' : 'places'}` : 'Holding position',
      };
    });
  });
  readonly climber = computed(() => [...this.rows()].filter(t => t.movement > 0).sort((a, b) => b.movement - a.movement || a.rank - b.rank)[0]);
  readonly headline = computed(() => {
    if (!this.rounds()) return 'Everyone starts equal. Who makes the first move?';
    const leader = this.rows()[0];
    if (this.snapshot().phase === 'complete') return `${leader.name} takes the title.`;
    if (this.rows().filter(t => t.score === leader.score).length > 1) return 'It’s tight at the top. The leaders are level on points.';
    return `${leader.name} leads the chase.`;
  });
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  constructor() {
    let previousRound = -1;
    let previousPositions = new Map<string, number>();
    afterRenderEffect(() => {
      const round = this.animationStep() ?? this.rounds();
      const rows = this.element.nativeElement.querySelectorAll<HTMLElement>('tbody tr');
      const tableTop = this.element.nativeElement.getBoundingClientRect().top;
      const positions = new Map<string, number>();
      const animate = previousRound >= 0 && round > previousRound &&
        !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      rows.forEach(row => {
        const id = row.dataset['teamId']!;
        const top = row.getBoundingClientRect().top - tableTop;
        positions.set(id, top);
        if (animate && row.animate) {
          const shift = (previousPositions.get(id) ?? top) - top;
          row.animate([{ transform: `translateY(${shift}px)`, opacity: .65 }, { transform: 'translateY(0)', opacity: 1 }],
            { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)' });
          row.querySelector('.score')?.animate?.([{ color: '#ffffff', textShadow: '0 0 16px #c5ed81' }, { color: 'inherit', textShadow: 'none' }], { duration: 1000 });
        }
      });
      previousPositions = positions;
      previousRound = round;
    });
  }
}
