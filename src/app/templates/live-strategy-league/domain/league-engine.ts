import { availableBudget, decisionCost, requireLeagueModel } from './league-calculations';
import type { LeagueCommand, LeagueConfig, LeagueDecision, LeagueSnapshot, LeagueTeamState } from './league.models';

export function requireLeagueConfig(value: unknown): LeagueConfig {
  const c = value as LeagueConfig;
  if (!c || c.schemaVersion !== '1.0' || c.template?.id !== 'live-strategy-league' || c.template.version !== '1.0' ||
    typeof c.projectId !== 'string' || typeof c.projectVersion !== 'string' || typeof c.title !== 'string' ||
    typeof c.description !== 'string' || typeof c.explanation !== 'string' || !Array.isArray(c.teams) || c.teams.length < 2 ||
    !Array.isArray(c.rounds) || !c.rounds.length || !Array.isArray(c.decisions) || !c.decisions.length ||
    !Array.isArray(c.metrics) || !c.metrics.length || !c.initialState ||
    c.teams.some(t => !t || typeof t.id !== 'string' || typeof t.name !== 'string' || !/^#[0-9a-f]{6}$/i.test(t.color) ||
      (t.imageUrl !== undefined && (typeof t.imageUrl !== 'string' || !/^\/(?!\/)[a-zA-Z0-9/_\.\-]+$/.test(t.imageUrl)))) ||
    new Set(c.teams.map(t => t.id)).size !== c.teams.length ||
    c.decisions.some(d => !d || !d.id || ![d.min, d.max, d.step, d.initial].every(Number.isFinite) ||
      typeof d.label !== 'string' || typeof d.unit !== 'string' || d.min > d.max || d.step <= 0 || d.initial < d.min || d.initial > d.max) ||
    new Set(c.decisions.map(d => d.id)).size !== c.decisions.length ||
    c.metrics.some(m => !m || typeof m.label !== 'string' || typeof m.unit !== 'string' || !Number.isFinite(c.initialState[m.id])) ||
    c.rounds.some(r => !r || !Number.isFinite(r.seconds) || r.seconds <= 0 || typeof r.title !== 'string' ||
      typeof r.headline !== 'string' || typeof r.description !== 'string' || !r.world || !Object.values(r.world).every(Number.isFinite)))
    throw new Error('INVALID_LEAGUE_CONFIG: Check the project, teams, decisions, metrics, and rounds.');
  if (!requireLeagueModel(c.modelId).validate(c)) throw new Error('INVALID_LEAGUE_MODEL_CONFIG: Model inputs are missing.');
  if (c.launch && [c.launch.headline, c.launch.highlight, c.launch.invitation, c.launch.mission, c.launch.winCondition].some(value => typeof value !== 'string' || !value.trim()))
    throw new Error('INVALID_LEAGUE_CONFIG: Launch copy must contain a headline, invitation, mission and win condition.');
  const minimum = Object.fromEntries(c.decisions.map(d => [d.id, d.min]));
  if (c.rounds.some(r => decisionCost(c.modelId, minimum, r.world) !== 0))
    throw new Error('INVALID_LEAGUE_CONFIG: Practice models must allow a zero-cost decision for depleted teams.');
  return c;
}
export function freshDecision(c: LeagueConfig): LeagueDecision {
  return { values: Object.fromEntries(c.decisions.map(d => [d.id, d.initial])), prediction: null, reasoning: '' };
}
export function createLeague(c: LeagueConfig): LeagueSnapshot {
  return { schemaVersion: 1, revision: 0, round: 0, phase: 'preview', deadline: null, pausedSeconds: null,
    teams: c.teams.map((t, i) => ({ id: t.id, score: 0, delta: 0, previousRank: i + 1,
      state: { ...c.initialState }, decision: freshDecision(c) })), history: [], pending: null };
}
export function standings(teams: LeagueTeamState[]): LeagueTeamState[] {
  return [...teams].sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
}
export function decisionError(c: LeagueConfig, s: LeagueSnapshot, decision: LeagueDecision, team = s.teams[0]): string | null {
  for (const d of c.decisions) {
    const n = decision.values[d.id];
    if (!Number.isFinite(n) || n < d.min || n > d.max || Math.abs((n - d.min) / d.step - Math.round((n - d.min) / d.step)) > 0.00001)
      return `${d.label} must be ${d.min}–${d.max} in steps of ${d.step}.`;
  }
  if (decision.prediction !== null && !Number.isFinite(decision.prediction)) return 'Enter a valid prediction.';
  if (typeof decision.reasoning !== 'string' || decision.reasoning.length > 1000) return 'Keep reasoning under 1,000 characters.';
  if (decisionCost(c.modelId, decision.values, c.rounds[s.round].world) > availableBudget(c.modelId, team.state))
    return 'Your decisions exceed your available resources.';
  return null;
}
function demoDecision(c: LeagueConfig, s: LeagueSnapshot, team: LeagueTeamState, i: number): LeagueDecision {
  const decision = freshDecision(c);
  for (const [j, d] of c.decisions.entries()) {
    const fraction = 0.2 + ((i * 2 + s.round * 3 + j * 5) % 7) * 0.1;
    decision.values[d.id] = d.min + Math.floor((d.max - d.min) * fraction / d.step) * d.step;
  }
  // Scale simulated spending down to a feasible decision, including later rounds.
  while (decisionError(c, s, decision, team)) {
    const reducible = c.decisions.filter(d => decision.values[d.id] > d.min);
    if (!reducible.length) throw new Error('NO_FEASIBLE_DECISION: Check configured minimum costs.');
    for (const d of reducible) decision.values[d.id] = Math.max(d.min, decision.values[d.id] - d.step);
  }
  decision.reasoning = 'Simulated practice team decision.';
  return decision;
}
export function applyLeagueCommand(c: LeagueConfig, previous: LeagueSnapshot, command: LeagueCommand, now: number): LeagueSnapshot {
  const s = structuredClone(previous);
  const assert = (condition: boolean, message = 'That action is unavailable in this phase.') => { if (!condition) throw new Error(message); };
  const close = () => {
    s.teams.forEach((team, i) => {
      if (team.decision.lockedAt !== undefined) return;
      if (i > 0 || decisionError(c, s, team.decision, team)) team.decision = demoDecision(c, s, team, i);
      team.decision.lockedAt = now;
    });
    s.phase = 'decision-locked'; s.deadline = null; s.pausedSeconds = null;
  };
  switch (command.type) {
    case 'start':
      assert(s.phase === 'preview'); s.phase = 'decision-open'; s.deadline = now + c.rounds[s.round].seconds * 1000; break;
    case 'draft': case 'lock': {
      assert(s.phase === 'decision-open' && s.teams[0].decision.lockedAt === undefined);
      assert(s.deadline !== null && now < s.deadline, 'The timer is paused or the deadline has passed.');
      const error = decisionError(c, s, command.decision); assert(!error, error ?? 'Invalid decision.');
      s.teams[0].decision = { values: { ...command.decision.values }, prediction: command.decision.prediction, reasoning: command.decision.reasoning };
      if (command.type === 'lock') { s.teams[0].decision.lockedAt = now; close(); }
      break;
    }
    case 'close': assert(s.phase === 'decision-open'); close(); break;
    case 'calculate': {
      assert(s.phase === 'decision-locked');
      const model = requireLeagueModel(c.modelId);
      const rows = s.teams.map(t => ({ id: t.id, rank: 0, score: t.score,
        before: { ...t.state }, decision: structuredClone(t.decision),
        result: model.calculate(t.state, t.decision.values, c.rounds[s.round].world) }));
      rows.forEach(row => row.score = Math.round((row.score + row.result.scoreDelta) * 100) / 100);
      rows.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
      rows.forEach((row, i) => row.rank = i + 1);
      s.pending = { round: s.round, calculatedAt: now, teams: rows }; s.phase = 'revealing'; break;
    }
    case 'reveal':
      assert(s.phase === 'revealing' && s.pending !== null);
      s.teams.forEach(t => {
        const result = s.pending!.teams.find(row => row.id === t.id)!;
        t.previousRank = standings(previous.teams).findIndex(row => row.id === t.id) + 1;
        t.score = result.score; t.delta = result.result.scoreDelta; t.state = { ...result.result.state };
      });
      s.history.push(s.pending!); s.pending = null;
      s.phase = s.round === c.rounds.length - 1 ? 'complete' : 'results'; break;
    case 'next':
      assert(s.phase === 'results'); s.round++; s.phase = 'preview';
      s.teams.forEach(t => t.decision = { values: { ...t.decision.values }, reasoning: '', prediction: null }); break;
    case 'restart':
      assert(s.phase === 'complete');
      return { ...createLeague(c), revision: s.revision + 1 };
    case 'pause':
      assert(s.phase === 'decision-open' && s.deadline !== null);
      s.pausedSeconds = Math.max(0, Math.ceil((s.deadline! - now) / 1000)); s.deadline = null; break;
    case 'resume':
      assert(s.phase === 'decision-open' && s.pausedSeconds !== null);
      s.deadline = now + s.pausedSeconds! * 1000; s.pausedSeconds = null; break;
    case 'extend':
      assert(s.phase === 'decision-open');
      if (s.deadline !== null) s.deadline += 60000; else s.pausedSeconds = (s.pausedSeconds ?? 0) + 60; break;
  }
  s.revision++;
  return s;
}
