import { applyCompetitionRequest, createCompetition, leaders } from '../domain/competition-engine';
import type { CompetitionCommand, CompetitionConfig, CompetitionState } from '../domain/competition.models';
import type { FinalShowcaseConfig } from './final-showcase.models';

/** Builds invented results through the same engine, entirely in memory. No persistence or official scoring service. */
export function buildFinalShowcase(project: CompetitionConfig, demo: FinalShowcaseConfig) {
  const config: CompetitionConfig = { ...project, defaultMode: 'hybrid', rounds: demo.rounds,
    teams: project.teams.map(team => ({ ...team, qualificationPoints: demo.highlights.reduce((sum, h) => sum + (h.points[team.id] ?? 0), 0) })) };
  let state = createCompetition(config); let id = 0;
  const send = (command: CompetitionCommand) => state = applyCompetitionRequest(config, state, { id: `fictional-${++id}`, at: 1000 + id, command });
  const copy = () => structuredClone(state);
  send({ type: 'seed' }); const seeded = copy();
  const playRound = (index: number, final: boolean) => {
    const round = config.rounds[index];
    if (round.kind === 'wager') for (const teamId of state.participants) send({ type: 'wager', teamId, points: final ? demo.wagers[teamId] ?? 0 : 0 });
    send({ type: 'open' });
    const answerers = round.kind === 'buzzer' ? [final ? demo.buzzerTeamId : state.participants[0]] : state.participants;
    if (round.kind === 'buzzer') send({ type: 'buzz', teamId: answerers[0] });
    for (const teamId of answerers) send({ type: 'answer', teamId, text: final && round.kind === 'wager' && teamId === demo.missedWagerTeamId ? 'Eight displays. We forgot to include delivery in our budget.' : demo.answers[round.id] });
    send({ type: 'lock' });
    for (const teamId of answerers) send({ type: 'score', teamId, points: round.kind === 'wager' ?
      state.wagers[teamId] * (final && teamId === demo.missedWagerTeamId ? -1 : 1) : round.maxPoints });
    send({ type: 'reveal' });
  };
  while (state.matches.some(m => m.status === 'ready')) {
    const match = state.matches.find(m => m.status === 'ready')!;
    send({ type: 'start', matchId: match.id });
    for (let r = 0; r < config.rounds.length; r++) { playRound(r, false); send({ type: 'next' }); }
    send({ type: 'finish', winnerId: leaders(state)[0], reason: 'Fictional demonstration result.' });
  }
  const qualified = copy(); send({ type: 'start' }); const ready = copy();
  const rounds: { before: CompetitionState; after: CompetitionState }[] = [];
  for (let r = 0; r < config.rounds.length; r++) {
    const before = copy(); playRound(r, true); const after = copy(); rounds.push({ before, after }); send({ type: 'next' });
  }
  send({ type: 'finish', winnerId: leaders(state)[0], reason: 'Fictional final wager result.' });
  return { config, seeded, qualified, ready, rounds, champion: copy() };
}
