import type { BroadcastConfig } from '../broadcast/broadcast.models';
export type FinalMode = 'tournament' | 'game-show' | 'hybrid';
export interface CompetitionTeam { id: string; name: string; qualificationPoints: number; }
export interface CompetitionRound {
  id: string; title: string; kind: 'simultaneous' | 'buzzer' | 'wager';
  prompt: string; seconds: number; maxPoints: number; standards: string[];
}
export interface CompetitionConfig {
  schemaVersion: '1.0'; projectId: string; projectVersion: string;
  template: { id: 'competition-show'; version: '1.0' };
  title: string; description: string; defaultMode: FinalMode;
  teams: CompetitionTeam[]; rounds: CompetitionRound[];
  broadcast?: BroadcastConfig;
}
export interface BracketMatch {
  id: string; round: number; position: number; teamIds: string[];
  sources: string[]; status: 'waiting' | 'ready' | 'live' | 'complete';
  winnerId: string | null; scores: Record<string, number>; bye: boolean;
}
export interface CompetitionEvidence {
  id: string; projectId: string; projectVersion: string; contestId: string; roundId: string;
  teamId: string; prompt: string; response: string; standards: string[]; timestamp: number;
  // Competition awards never become a rubric score or a mastery decision.
}
export interface RoundResponse { teamId: string; text: string; points: number | null; }
export interface CompetitionState {
  revision: number; appliedIds: string[]; mode: FinalMode; teams: CompetitionTeam[];
  phase: 'setup' | 'bracket' | 'ready' | 'open' | 'paused' | 'locked' | 'revealed' | 'results' | 'champion';
  matches: BracketMatch[]; contestId: string | null; participants: string[];
  roundIndex: number; scores: Record<string, number>; responses: RoundResponse[];
  wagers: Record<string, number>; buzzes: string[]; deadline: number | null; remainingSeconds: number;
  evidence: CompetitionEvidence[]; championId: string | null; finalists: string[];
  results: { contestId: string; scores: Record<string, number>; winnerId: string; reason: string }[];
}
export type CompetitionCommand =
  | { type: 'configure'; mode: FinalMode; teams: CompetitionTeam[] }
  | { type: 'seed' }
  | { type: 'start'; matchId?: string }
  | { type: 'wager'; teamId: string; points: number }
  | { type: 'open' | 'pause' | 'resume' | 'lock' | 'reveal' | 'next' }
  | { type: 'buzz'; teamId: string }
  | { type: 'answer'; teamId: string; text: string }
  | { type: 'score'; teamId: string; points: number }
  | { type: 'finish'; winnerId: string; reason: string };
export interface CompetitionRequest { id: string; at: number; command: CompetitionCommand; }
