import type { BracketMatch, CompetitionTeam } from './competition.models';

export function seedTeams(teams: CompetitionTeam[]): CompetitionTeam[] {
  return [...teams].sort((a, b) => b.qualificationPoints - a.qualificationPoints || a.id.localeCompare(b.id));
}
/** Standard separated seeding: 1/8, 4/5, 2/7, 3/6. Empty slots are explicit byes. */
export function createBracket(teams: CompetitionTeam[], hybrid: boolean): BracketMatch[] {
  const seeded = seedTeams(teams);
  const size = 2 ** Math.ceil(Math.log2(teams.length));
  let order = [1, 2];
  for (let n = 4; n <= size; n *= 2) order = order.flatMap(seed => [seed, n + 1 - seed]);
  const rounds = hybrid ? Math.max(0, Math.log2(size) - 2) : Math.log2(size);
  const matches: BracketMatch[] = [];
  for (let round = 0; round < rounds; round++) {
    for (let position = 0; position < size / 2 ** (round + 1); position++) {
      matches.push({ id: `r${round + 1}-m${position + 1}`, round, position,
        teamIds: round === 0 ? order.slice(position * 2, position * 2 + 2).flatMap(seed => seeded[seed - 1] ? [seeded[seed - 1].id] : []) : [],
        sources: round === 0 ? [] : [`r${round}-m${position * 2 + 1}`, `r${round}-m${position * 2 + 2}`],
        status: 'waiting', winnerId: null, scores: {}, bye: false });
    }
  }
  advanceBracket(matches);
  return matches;
}
export function advanceBracket(matches: BracketMatch[]): void {
  for (const match of matches) {
    if (match.status !== 'waiting') continue;
    if (match.sources.length) {
      const sources = match.sources.map(id => matches.find(m => m.id === id)!);
      if (sources.some(source => source.status !== 'complete')) continue;
      match.teamIds = sources.flatMap(source => source.winnerId ? [source.winnerId] : []);
    }
    if (match.teamIds.length <= 1) {
      match.status = 'complete'; match.bye = true; match.winnerId = match.teamIds[0] ?? null;
    } else match.status = 'ready';
  }
}
