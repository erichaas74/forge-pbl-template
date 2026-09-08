import { InjectionToken } from '@angular/core';
import type { CompetitionConfig, CompetitionRound } from '../domain/competition.models';
import { validAssetUrl } from '../broadcast/broadcast.models';
import { requireCompetitionConfig, requireValid } from '../domain/competition.validation';

export interface SeasonHighlight {
  id: string; week: string; title: string; caption: string; narration: string;
  skill: string; points: Record<string, number>;
}
export interface FinalShowcaseConfig {
  schemaVersion: '1.0'; fictional: true; title: string; openingImage: string; mysteryImage: string;
  recapVideo?: string; recapCaptions?: string;
  highlights: SeasonHighlight[]; rounds: CompetitionRound[];
  answers: Record<string, string>; wagers: Record<string, number>; missedWagerTeamId: string;
  buzzerTeamId: string;
}
export const FINAL_SHOWCASE = new InjectionToken<FinalShowcaseConfig>('Fictional championship showcase');
export function requireFinalShowcase(value: unknown, project: CompetitionConfig): FinalShowcaseConfig {
  const d = value as FinalShowcaseConfig;
  requireValid(d && d.schemaVersion === '1.0' && d.fictional === true && typeof d.title === 'string', 'The final showcase must declare itself fictional.');
  requireValid(validAssetUrl(d.openingImage) && validAssetUrl(d.mysteryImage) &&
    (d.recapVideo === undefined || validAssetUrl(d.recapVideo)) && (d.recapCaptions === undefined || validAssetUrl(d.recapCaptions)), 'Invalid showcase media.');
  requireValid(Array.isArray(d.highlights) && d.highlights.length >= 1 && d.highlights.length <= 6 && d.highlights.every(h => h &&
    [h.id, h.week, h.title, h.caption, h.narration, h.skill].every(s => typeof s === 'string' && s.length > 0) &&
    h.points && Object.entries(h.points).every(([id, points]) => project.teams.some(t => t.id === id) && Number.isInteger(points) && points >= 0)), 'Invalid fictional season highlights.');
  requireValid(Array.isArray(d.rounds) && d.rounds.length === 3 && d.rounds.map(r => r?.kind).join() === 'simultaneous,buzzer,wager', 'The sample final needs simultaneous, buzzer, and wager rounds.');
  requireCompetitionConfig({ ...project, rounds: d.rounds });
  requireValid(d.answers && d.rounds.every(r => typeof d.answers[r.id] === 'string') && d.wagers &&
    Object.entries(d.wagers).every(([id, v]) => project.teams.some(t => t.id === id) && Number.isInteger(v) && v >= 0) &&
    project.teams.some(t => t.id === d.buzzerTeamId) && project.teams.some(t => t.id === d.missedWagerTeamId), 'Invalid demonstration answers or teams.');
  return d;
}
