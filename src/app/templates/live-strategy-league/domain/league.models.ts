export interface LeagueConfig {
  schemaVersion: '1.0';
  projectId: string;
  projectVersion: string;
  template: { id: 'live-strategy-league'; version: '1.0' };
  title: string;
  description: string;
  modelId: string;
  explanation: string;
  finalDemo?: LeagueDemoConfig;
  launch?: { headline: string; highlight: string; invitation: string; mission: string; winCondition: string };
  decisions: { id: string; label: string; unit: string; min: number; max: number; step: number; initial: number }[];
  metrics: { id: string; label: string; unit: string }[];
  initialState: Record<string, number>;
  teams: { id: string; name: string; color: string; imageUrl?: string }[];
  rounds: { title: string; headline: string; description: string; seconds: number; world: Record<string, number> }[];
}
export interface LeagueDemoConfig {
  seconds: number;
  openingCaption: string;
  openingScores: Record<string, number>;
  frames: { at: number; caption: string; scores: Record<string, number>; decision?: LeagueDemoDecision }[];
}
export interface LeagueDemoDecision {
  teamId: string;
  question: string;
  options: string[];
  selected: number;
  reasoning: string;
  units: number;
  unitPrice: number;
  unitCost: number;
}
export type LeaguePhase = 'preview' | 'decision-open' | 'decision-locked' | 'revealing' | 'results' | 'complete';
export interface LeagueDecision {
  values: Record<string, number>;
  reasoning: string;
  prediction: number | null;
  lockedAt?: number;
}
export interface LeagueResult {
  state: Record<string, number>;
  scoreDelta: number;
  explanation: string;
}
export interface LeagueTeamState {
  id: string;
  score: number;
  delta: number;
  previousRank: number;
  state: Record<string, number>;
  decision: LeagueDecision;
}
export interface LeagueRecord {
  round: number;
  calculatedAt: number;
  teams: { id: string; rank: number; score: number; before: Record<string, number>; decision: LeagueDecision; result: LeagueResult }[];
}
export interface LeagueSnapshot {
  schemaVersion: 1;
  revision: number;
  round: number;
  phase: LeaguePhase;
  deadline: number | null;
  pausedSeconds: number | null;
  teams: LeagueTeamState[];
  history: LeagueRecord[];
  pending: LeagueRecord | null;
}
export type LeagueCommand =
  | { type: 'start' | 'close' | 'calculate' | 'reveal' | 'next' | 'pause' | 'resume' | 'extend' | 'restart' }
  | { type: 'draft' | 'lock'; decision: LeagueDecision };
export interface LeagueCalculationModel {
  id: string;
  validate(config: LeagueConfig): boolean;
  cost(decisions: Record<string, number>, world: Record<string, number>): number;
  budget(state: Record<string, number>): number;
  calculate(state: Record<string, number>, decisions: Record<string, number>, world: Record<string, number>): LeagueResult;
}
