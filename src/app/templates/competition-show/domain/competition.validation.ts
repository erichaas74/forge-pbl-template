import type { CompetitionConfig, CompetitionTeam, FinalMode } from './competition.models';
import { validateBroadcast } from '../broadcast/broadcast.models';

export function requireValid(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`INVALID_COMPETITION: ${message}`);
}
export function validateTeams(teams: CompetitionTeam[]): void {
  requireValid(Array.isArray(teams) && teams.length >= 2 && teams.length <= 16, 'Use 2–16 teams.');
  requireValid(teams.every(t => t && typeof t.id === 'string' && /^[a-z0-9][a-z0-9-]*$/.test(t.id) &&
    typeof t.name === 'string' && t.name.trim().length > 0 && t.name.length <= 60 &&
    Number.isFinite(t.qualificationPoints) && t.qualificationPoints >= 0), 'Check team names and qualification points.');
  requireValid(new Set(teams.map(t => t.id)).size === teams.length, 'Team IDs must be unique.');
}
export function validateMode(mode: FinalMode): void {
  requireValid(['tournament', 'game-show', 'hybrid'].includes(mode), 'Choose a supported final format.');
}
export function requireCompetitionConfig(value: unknown): CompetitionConfig {
  const c = value as CompetitionConfig;
  requireValid(c && c.schemaVersion === '1.0' && c.template?.id === 'competition-show' &&
    c.template.version === '1.0', 'Unsupported competition package version.');
  requireValid(typeof c.projectId === 'string' && c.projectId.length > 0 && typeof c.projectVersion === 'string' &&
    typeof c.title === 'string' && typeof c.description === 'string', 'Project identity and title are required.');
  validateTeams(c.teams); validateMode(c.defaultMode);
  if (c.broadcast !== undefined) validateBroadcast(c.broadcast);
  requireValid(Array.isArray(c.rounds) && c.rounds.length > 0 && c.rounds.length <= 20, 'Provide 1–20 championship rounds.');
  requireValid(c.rounds.every(r => r && typeof r.id === 'string' && r.id.length > 0 &&
    typeof r.title === 'string' && typeof r.prompt === 'string' && r.prompt.trim().length > 0 &&
    ['simultaneous', 'buzzer', 'wager'].includes(r.kind) && Number.isInteger(r.seconds) && r.seconds >= 10 && r.seconds <= 3600 &&
    Number.isInteger(r.maxPoints) && r.maxPoints > 0 && r.maxPoints <= 10000 &&
    Array.isArray(r.standards) && r.standards.length > 0 && r.standards.every(s => typeof s === 'string' && s.trim().length > 0)),
    'Each round needs a supported type, prompt, timer, point limit, and standards.');
  requireValid(new Set(c.rounds.map(r => r.id)).size === c.rounds.length, 'Round IDs must be unique.');
  return c;
}
