import type { CompetitionConfig, CompetitionState } from '../domain/competition.models';
import type { BroadcastConfig, BroadcastCue, BroadcastShot, CueStep, StudioView } from './broadcast.models';

export function studioProjection(config: CompetitionConfig, state: CompetitionState, theme: BroadcastConfig,
  shot: BroadcastShot, teamId: string | null, cue: BroadcastCue | null, step: CueStep, seconds: number): StudioView {
  const round = config.rounds[state.roundIndex];
  const isContest = !['setup', 'bracket'].includes(state.phase);
  const teamIds = isContest && state.participants.length ? state.participants : state.teams.map(t => t.id);
  const canRead = ['open', 'paused', 'locked', 'revealed'].includes(state.phase) ||
    (cue === 'question' && ['reveal', 'hold'].includes(step));
  return { title: config.title, phase: state.phase, roundTitle: isContest ? round.title : '', prompt: canRead ? round.prompt : '',
    seconds, winnerId: state.championId, firstBuzzId: state.buzzes[0] ?? null, shot, teamId, cue, step,
    teams: teamIds.map(id => {
      const index = state.teams.findIndex(t => t.id === id); const team = state.teams[index];
      return { id, name: team.name, score: isContest ? state.scores[id] ?? 0 : 0, seed: index + 1,
        color: theme.palette.teamColors[index % theme.palette.teamColors.length], emblem: theme.teamEmblems?.[id] };
    }) };
}
