import { createLeague } from './league-engine';
import type { LeagueConfig, LeagueDemoConfig, LeagueSnapshot } from './league.models';

export function requireLeagueDemo(value: unknown, config: LeagueConfig): LeagueDemoConfig {
  const demo = value as LeagueDemoConfig;
  const scoresValid = (scores: Record<string, number>) => scores &&
    Object.keys(scores).length === config.teams.length && config.teams.every(t => Number.isFinite(scores[t.id]));
  if (!demo || typeof demo.openingCaption !== 'string' || !Number.isInteger(demo.seconds) || demo.seconds < 1 || demo.seconds > 300 ||
    !scoresValid(demo.openingScores) || !Array.isArray(demo.frames) || !demo.frames.length ||
    demo.frames.some((frame, i) => !frame || !Number.isInteger(frame.at) || frame.at <= (demo.frames[i - 1]?.at ?? 0) ||
      frame.at > demo.seconds || typeof frame.caption !== 'string' || !scoresValid(frame.scores)) ||
    demo.frames.at(-1)?.at !== demo.seconds)
    throw new Error('INVALID_LEAGUE_DEMO: Supply ordered score updates for every team ending at the demo deadline.');
  demo.frames.forEach((frame, index) => {
    const decision = frame.decision;
    if (decision === undefined) return;
    const previous = demo.frames[index - 1]?.scores ?? demo.openingScores;
    if (!decision || !config.teams.some(t => t.id === decision.teamId) ||
      typeof decision.question !== 'string' || typeof decision.reasoning !== 'string' ||
      !Array.isArray(decision.options) || decision.options.length < 2 || decision.options.some(option => typeof option !== 'string') ||
      !Number.isInteger(decision.selected) || decision.selected < 0 || decision.selected >= decision.options.length ||
      !Number.isInteger(decision.units) || decision.units <= 0 ||
      ![decision.unitPrice, decision.unitCost].every(value => Number.isFinite(value) && value >= 0) ||
      Math.abs(decision.units * (decision.unitPrice - decision.unitCost) - (frame.scores[decision.teamId] - previous[decision.teamId])) > .001)
      throw new Error('INVALID_LEAGUE_DEMO: Each sample decision must identify a team, a choice and a trade profit matching its score update.');
  });
  return demo;
}

/** A presentation snapshot only; never passed to the practice runtime or persistence. */
export function leagueDemoSnapshot(config: LeagueConfig, demo: LeagueDemoConfig, step: number): LeagueSnapshot {
  const snapshot = createLeague(config);
  const frame = demo.frames[step - 1];
  const scores = frame?.scores ?? demo.openingScores;
  const previous = demo.frames[step - 2]?.scores ?? demo.openingScores;
  const previousOrder = [...config.teams].sort((a, b) => previous[b.id] - previous[a.id] || a.id.localeCompare(b.id));
  snapshot.round = config.rounds.length - 1;
  snapshot.phase = step === demo.frames.length ? 'complete' : 'decision-open';
  snapshot.revision = step;
  snapshot.teams = snapshot.teams.map(team => ({ ...team, score: scores[team.id],
    delta: scores[team.id] - demo.openingScores[team.id],
    previousRank: previousOrder.findIndex(t => t.id === team.id) + 1 }));
  return snapshot;
}
