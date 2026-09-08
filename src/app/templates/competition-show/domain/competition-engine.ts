import { advanceBracket, createBracket, seedTeams } from './competition-bracket';
import { requireCompetitionConfig, requireValid, validateMode, validateTeams } from './competition.validation';
import type { CompetitionCommand, CompetitionConfig, CompetitionRequest, CompetitionState } from './competition.models';

export function createCompetition(config: CompetitionConfig): CompetitionState {
  requireCompetitionConfig(config);
  return { revision: 0, appliedIds: [], mode: config.defaultMode, teams: structuredClone(config.teams), phase: 'setup',
    matches: [], contestId: null, participants: [], roundIndex: 0, scores: {}, responses: [], wagers: {}, buzzes: [],
    deadline: null, remainingSeconds: 0, evidence: [], championId: null, finalists: [], results: [] };
}
type Handler<K extends CompetitionCommand['type']> = (s: CompetitionState, c: Extract<CompetitionCommand, { type: K }> | CompetitionCommand,
  config: CompetitionConfig, request: CompetitionRequest) => void;
type Handlers = { [K in CompetitionCommand['type']]: Handler<K> };
function phase(s: CompetitionState, ...allowed: CompetitionState['phase'][]): void {
  requireValid(allowed.includes(s.phase), 'That control is not available at this point in the show.');
}
function participant(s: CompetitionState, id: string): void { requireValid(s.participants.includes(id), 'Team is not in this contest.'); }
function prepareRound(s: CompetitionState, config: CompetitionConfig): void {
  s.phase = 'ready'; s.responses = []; s.wagers = {}; s.buzzes = []; s.deadline = null;
  s.remainingSeconds = config.rounds[s.roundIndex].seconds;
}
function lock(s: CompetitionState): void { s.phase = 'locked'; s.deadline = null; s.remainingSeconds = 0; }
export function finalTeams(s: CompetitionState): string[] {
  if (s.mode === 'game-show' || s.matches.length === 0) return seedTeams(s.teams).map(t => t.id);
  if (s.matches.some(m => m.status !== 'complete')) return [];
  const last = Math.max(...s.matches.map(m => m.round));
  return s.matches.filter(m => m.round === last).flatMap(m => m.winnerId ? [m.winnerId] : []);
}
export function leaders(s: CompetitionState): string[] {
  const high = Math.max(...s.participants.map(id => s.scores[id]));
  return s.participants.filter(id => s.scores[id] === high);
}
const handlers: Handlers = {
  configure(s, c) {
    if (c.type !== 'configure') return;
    phase(s, 'setup'); validateMode(c.mode); validateTeams(c.teams);
    s.mode = c.mode; s.teams = structuredClone(c.teams);
  },
  seed(s) {
    phase(s, 'setup'); s.teams = seedTeams(s.teams);
    s.matches = s.mode === 'game-show' ? [] : createBracket(s.teams, s.mode === 'hybrid'); s.phase = 'bracket';
  },
  start(s, c, config) {
    if (c.type !== 'start') return;
    phase(s, 'bracket');
    if (c.matchId) {
      const match = s.matches.find(m => m.id === c.matchId);
      requireValid(match?.status === 'ready', 'Match is not ready.');
      match.status = 'live'; s.contestId = match.id; s.participants = [...match.teamIds];
    } else {
      requireValid(s.mode !== 'tournament', 'Select the next bracket match.');
      const finalists = finalTeams(s); requireValid(finalists.length >= 2, 'Finish the bracket before the final show.');
      s.finalists = finalists; s.participants = [...finalists]; s.contestId = 'championship-show';
    }
    s.scores = Object.fromEntries(s.participants.map(id => [id, 0])); s.roundIndex = 0; prepareRound(s, config);
  },
  wager(s, c, config) {
    if (c.type !== 'wager') return;
    phase(s, 'ready'); participant(s, c.teamId);
    requireValid(config.rounds[s.roundIndex].kind === 'wager', 'This is not a wager round.');
    requireValid(s.wagers[c.teamId] === undefined, 'Wager is already locked.');
    requireValid(Number.isInteger(c.points) && c.points >= 0 && c.points <= s.scores[c.teamId], 'Wager must be between zero and the team score.');
    s.wagers[c.teamId] = c.points;
  },
  open(s, _c, config, request) {
    phase(s, 'ready');
    requireValid(config.rounds[s.roundIndex].kind !== 'wager' || s.participants.every(id => s.wagers[id] !== undefined), 'Lock every team wager first.');
    s.phase = 'open'; s.deadline = request.at + s.remainingSeconds * 1000;
  },
  pause(s, _c, _config, request) {
    phase(s, 'open'); requireValid(s.deadline !== null && request.at < s.deadline, 'Answer time has ended. Lock the round.');
    s.remainingSeconds = Math.ceil((s.deadline - request.at) / 1000); s.deadline = null; s.phase = 'paused';
  },
  resume(s, _c, _config, request) { phase(s, 'paused'); s.phase = 'open'; s.deadline = request.at + s.remainingSeconds * 1000; },
  lock(s) { phase(s, 'open', 'paused'); lock(s); },
  buzz(s, c, config, request) {
    if (c.type !== 'buzz') return;
    phase(s, 'open'); participant(s, c.teamId);
    requireValid(s.deadline !== null && request.at < s.deadline, 'Answer time has ended.');
    requireValid(config.rounds[s.roundIndex].kind === 'buzzer' && !s.buzzes.includes(c.teamId), 'Buzz is unavailable.');
    s.buzzes.push(c.teamId);
  },
  answer(s, c, config, request) {
    if (c.type !== 'answer') return;
    phase(s, 'open'); participant(s, c.teamId);
    requireValid(s.deadline !== null && request.at < s.deadline, 'Answer time has ended.');
    requireValid(!s.responses.some(r => r.teamId === c.teamId), 'This answer is already locked.');
    requireValid(typeof c.text === 'string' && c.text.trim().length > 0 && c.text.length <= 6000, 'Enter a response of 1–6,000 characters.');
    const round = config.rounds[s.roundIndex];
    requireValid(round.kind !== 'buzzer' || s.buzzes[0] === c.teamId, 'The first team to buzz answers.');
    s.responses.push({ teamId: c.teamId, text: c.text.trim(), points: null });
    s.evidence.push({ id: request.id, projectId: config.projectId, projectVersion: config.projectVersion,
      contestId: s.contestId!, roundId: round.id, teamId: c.teamId, prompt: round.prompt,
      response: c.text.trim(), standards: [...round.standards], timestamp: request.at });
  },
  score(s, c, config) {
    if (c.type !== 'score') return;
    phase(s, 'locked'); participant(s, c.teamId);
    const response = s.responses.find(r => r.teamId === c.teamId);
    requireValid(response, 'Only a submitted response can be scored.');
    const round = config.rounds[s.roundIndex];
    requireValid(Number.isInteger(c.points) && (round.kind === 'wager' ?
      Math.abs(c.points) === s.wagers[c.teamId] : c.points >= 0 && c.points <= round.maxPoints), 'Points are outside this round’s rules.');
    response.points = c.points;
  },
  reveal(s, _c, config) {
    phase(s, 'locked'); requireValid(s.responses.every(r => r.points !== null), 'Score each submitted response before revealing.');
    for (const id of s.participants) {
      const response = s.responses.find(r => r.teamId === id);
      s.scores[id] += response?.points ?? (config.rounds[s.roundIndex].kind === 'wager' ? -(s.wagers[id] ?? 0) : 0);
    }
    s.phase = 'revealed';
  },
  next(s, _c, config) {
    phase(s, 'revealed');
    if (s.roundIndex + 1 === config.rounds.length) s.phase = 'results';
    else { s.roundIndex++; prepareRound(s, config); }
  },
  finish(s, c) {
    if (c.type !== 'finish') return;
    phase(s, 'results'); const tied = leaders(s);
    requireValid(tied.includes(c.winnerId), 'The winner must have the highest score.');
    requireValid(typeof c.reason === 'string' && (tied.length === 1 || c.reason.trim().length >= 5), 'Record how the tiebreak was decided.');
    s.results.push({ contestId: s.contestId!, scores: { ...s.scores }, winnerId: c.winnerId, reason: c.reason.trim() });
    if (s.contestId === 'championship-show') { s.championId = c.winnerId; s.phase = 'champion'; return; }
    const match = s.matches.find(m => m.id === s.contestId)!;
    match.status = 'complete'; match.winnerId = c.winnerId; match.scores = { ...s.scores }; advanceBracket(s.matches);
    if (s.mode === 'tournament' && s.matches.every(m => m.status === 'complete')) {
      s.championId = c.winnerId; s.phase = 'champion';
    } else s.phase = 'bracket';
  },
};
/** Pure command boundary, suitable for a future authoritative adapter. */
export function applyCompetitionRequest(config: CompetitionConfig, state: CompetitionState, request: CompetitionRequest): CompetitionState {
  requireValid(request && typeof request.id === 'string' && request.id.length > 0 && Number.isFinite(request.at), 'Invalid request envelope.');
  if (state.appliedIds.includes(request.id)) return state;
  requireValid(state.revision < 2000, 'This rehearsal has reached its event limit. Export the record before starting another attempt.');
  const handler = request.command && Object.hasOwn(handlers, request.command.type) ? handlers[request.command.type] : undefined;
  requireValid(handler, 'Unsupported competition command.');
  const next = structuredClone(state); handler(next, request.command, config, request);
  next.revision++; next.appliedIds.push(request.id); return next;
}
