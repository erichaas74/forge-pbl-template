import { TestBed } from '@angular/core/testing';
import { afterEach, expect, it } from 'vitest';
import data from '../../../../../public/projects/live-strategy-league/project.json';
import { createLeague, requireLeagueConfig } from '../domain/league-engine';
import { LeagueLeaderboardComponent } from './league-leaderboard.component';
import type { LeagueSnapshot } from '../domain/league.models';

const config = requireLeagueConfig(data);
afterEach(() => TestBed.resetTestingModule());
async function render(state: LeagueSnapshot) {
  await TestBed.configureTestingModule({ imports: [LeagueLeaderboardComponent] }).compileComponents();
  const fixture = TestBed.createComponent(LeagueLeaderboardComponent);
  fixture.componentRef.setInput('config', config);
  fixture.componentRef.setInput('snapshot', state);
  fixture.componentRef.setInput('yourTeamId', config.teams[0].id);
  fixture.detectChanges();
  return fixture;
}
it('keeps the starting grid neutral and labels the group portraits as fictional', async () => {
  const fixture = await render(createLeague(config));
  const root: HTMLElement = fixture.nativeElement;
  expect(root.querySelector('.leader')).toBeNull();
  expect(root.querySelector('.trend.up, .trend.down')).toBeNull();
  expect(root.textContent).toContain('Everyone starts equal');
  expect(root.querySelectorAll('tbody tr')).toHaveLength(5);
  expect(root.textContent).toContain('Fictional team portraits');
});
it('announces actual rank gains and losses, highlights the leader and biggest climber', async () => {
  const s = createLeague(config);
  s.teams.forEach((t, i) => { t.score = 100 - i * 10; t.previousRank = i + 1; });
  s.teams[0].previousRank = 3;
  s.teams[1].previousRank = 1;
  s.teams[2].previousRank = 2;
  s.history = [0, 1].map(round => ({ round, calculatedAt: 1000, teams: [] }));
  const fixture = await render(s);
  const root: HTMLElement = fixture.nativeElement;
  expect(root.querySelector('.leader')?.getAttribute('data-team-id')).toBe(config.teams[0].id);
  expect(root.querySelector('.your-team .trend')?.getAttribute('aria-label')).toBe('Up 2 places');
  expect(root.querySelector('.trend.down')?.getAttribute('aria-label')).toBe('Down 1 place');
  expect(root.querySelector('.race-call')?.textContent).toContain('Biggest climber: Nova · up 2 places');
});
it('shows NEW for first rankings and clears highlights on a fresh practice', async () => {
  const s = createLeague(config);
  s.history = [{ round: 0, calculatedAt: 1000, teams: [] }];
  const fixture = await render(s);
  const root: HTMLElement = fixture.nativeElement;
  expect(root.querySelector('.trend')?.textContent?.trim()).toBe('NEW');
  expect(root.querySelector('.climber')).toBeNull();
  fixture.componentRef.setInput('snapshot', createLeague(config));
  fixture.detectChanges();
  expect(root.querySelector('.leader')).toBeNull();
  expect(root.querySelector('.trend')?.getAttribute('aria-label')).toBe('Awaiting first result');
});
