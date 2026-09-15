import type { DebateStudioProjectConfig } from '../domain/debate-studio.models';

export type ExchangeLessonMode = 'opening' | 'exchange' | 'refine' | 'final';
export interface DebateSkillExample {
  readonly title: string;
  readonly claim: string;
  readonly choices: readonly { readonly text: string; readonly feedback: string }[];
  readonly strongest: number;
  readonly sourceIds: readonly string[];
}
export interface ExchangeLesson {
  readonly number: number;
  readonly title: string;
  readonly mode: ExchangeLessonMode;
  readonly tasks: readonly string[];
  readonly product: string;
  readonly skill: DebateSkillExample;
  readonly sourceIds: readonly string[];
}
export interface DebateExchangeConfig {
  readonly schemaVersion: '1.0';
  readonly lessons: readonly ExchangeLesson[];
  /** Authored examples are opened explicitly and stay separate from classroom work. */
  readonly examples: readonly {
    readonly name: string;
    readonly side: string;
    readonly points: readonly string[];
    readonly speech: string;
    readonly evidenceIds: readonly string[];
  }[];
}
export interface DebateDraft {
  readonly side: string;
  readonly points: readonly string[];
  readonly speech: string;
  readonly evidenceIds: readonly string[];
  readonly replyTo?: string;
  readonly revises?: string;
  readonly reviewIds: readonly string[];
  readonly changeNote: string;
  readonly group: string;
  readonly mediaId?: string;
  readonly mediaType?: string;
  readonly mediaReviewed?: boolean;
}
export interface DebateContribution extends DebateDraft {
  readonly id: string;
  readonly actorId: string;
  readonly name: string;
  readonly lesson: number;
  readonly kind: 'opening' | 'response' | 'revision' | 'closing';
  readonly createdAt: string;
}
export const debateCriteria = ['evidence', 'reasoning', 'response'] as const;
export type DebateCriterion = typeof debateCriteria[number];
export type DebateRatings = Readonly<Record<DebateCriterion, number>>;
export interface DebateCritique {
  readonly id: string;
  readonly actorId: string;
  readonly name: string;
  readonly contributionId: string;
  readonly moment: string;
  readonly strength: string;
  readonly suggestion: string;
  readonly ratings: DebateRatings;
  readonly createdAt: string;
}
export interface DebateJudgment {
  readonly performerId: string;
  readonly contributionId: string;
  readonly ratings: DebateRatings;
  readonly reason: string;
}
export interface DebateBallot {
  readonly id: string;
  readonly actorId: string;
  readonly judgments: readonly DebateJudgment[];
  readonly createdAt: string;
}
export interface DebateExchangeState {
  readonly schemaVersion: '1.0';
  readonly revision: number;
  readonly contributions: readonly DebateContribution[];
  readonly critiques: readonly DebateCritique[];
  readonly ballots: readonly DebateBallot[];
}
export type ExchangeCommand =
  | { readonly type: 'debate.exchange.submit'; readonly value: DebateContribution }
  | { readonly type: 'debate.exchange.critique'; readonly value: DebateCritique }
  | { readonly type: 'debate.exchange.rank'; readonly value: DebateBallot };

export function emptyExchange(): DebateExchangeState {
  return { schemaVersion: '1.0', revision: 0, contributions: [], critiques: [], ballots: [] };
}
export function emptyDraft(side = ''): DebateDraft {
  return { side, points: [], speech: '', evidenceIds: [], reviewIds: [], changeNote: '', group: '' };
}
const nonempty = (value: string): boolean => value.trim().length > 0;
const unique = (values: readonly string[]): boolean => new Set(values).size === values.length;
const requireThat = (condition: boolean, message: string): void => { if (!condition) throw new Error(message); };
export function validRatings(ratings: DebateRatings): boolean {
  return debateCriteria.every(key => Number.isInteger(ratings[key]) && ratings[key] >= 1 && ratings[key] <= 4);
}

/** Pure command boundary, also used to validate imported work. No lesson-entry gates. */
export function applyExchangeCommand(state: DebateExchangeState, command: ExchangeCommand, config: DebateStudioProjectConfig): DebateExchangeState {
  const item = command.value;
  const collection = command.type === 'debate.exchange.submit' ? state.contributions : command.type === 'debate.exchange.critique' ? state.critiques : state.ballots;
  const existing = collection.find(entry => entry.id === item.id);
  if (existing) {
    requireThat(JSON.stringify(existing) === JSON.stringify(item), 'This exchange ID already contains different work.');
    return state;
  }
  requireThat(nonempty(item.id) && nonempty(item.actorId) && !Number.isNaN(Date.parse(item.createdAt)), 'The exchange identity or date is invalid.');
  if (command.type === 'debate.exchange.submit') {
    const entry = command.value;
    requireThat(config.factions.some(faction => faction.id === entry.side), 'Choose a debate side.');
    requireThat(Number.isInteger(entry.lesson) && entry.lesson >= 1 && entry.lesson <= 8, 'Choose a session from 1 to 8.');
    requireThat(nonempty(entry.name) && nonempty(entry.speech) && entry.points.length > 0 && entry.points.every(nonempty), 'Add an opening point and a speech before submitting.');
    requireThat(entry.evidenceIds.length > 0 && unique(entry.evidenceIds) && entry.evidenceIds.every(id => config.evidence.some(source => source.id === id)), 'Attach at least one project source.');
    requireThat(!entry.mediaId || !!entry.mediaReviewed, 'Play and review the recording before submitting.');
    requireThat(!state.contributions.some(prior => prior.actorId === entry.actorId && prior.side !== entry.side), 'Keep your submitted side for this debate.');
    const opposing = state.contributions.find(prior => prior.id === entry.replyTo);
    const original = state.contributions.find(prior => prior.id === entry.revises);
    const mode = config.exchange?.lessons[entry.lesson - 1].mode;
    requireThat(entry.kind === (mode === 'opening' ? 'opening' : mode === 'refine' ? 'revision' : mode === 'final' ? 'closing' : 'response'), 'Submission type must match the selected session.');
    if (entry.kind === 'response' || entry.kind === 'closing' || entry.replyTo) {
      requireThat(!!opposing && opposing.side !== entry.side, 'Select an opposing argument to answer.');
    }
    if (entry.kind === 'revision' || entry.revises) {
      requireThat(!!original && original.actorId === entry.actorId && original.side === entry.side, 'Select your earlier argument to revise.');
      requireThat(nonempty(entry.changeNote), 'Explain what changed in this revision.');
    }
    requireThat(unique(entry.reviewIds) && entry.reviewIds.every(id => state.critiques.some(review => review.id === id && review.contributionId === entry.revises)), 'Feedback must refer to the argument being revised.');
    return { ...state, revision: state.revision + 1, contributions: [...state.contributions, entry] };
  }
  if (command.type === 'debate.exchange.critique') {
    const review = command.value;
    const target = state.contributions.find(entry => entry.id === review.contributionId);
    const reviewer = state.contributions.find(entry => entry.actorId === review.actorId);
    requireThat(!!target && !!reviewer && target.side === reviewer.side && target.actorId !== review.actorId, 'Critique another author who shares your submitted side.');
    requireThat(nonempty(review.moment) && !!target?.speech.includes(review.moment), 'Choose an exact moment from this speech.');
    requireThat(nonempty(review.name) && nonempty(review.strength) && nonempty(review.suggestion) && validRatings(review.ratings), 'Give a strength, a useful improvement, and three criterion ratings.');
    return { ...state, revision: state.revision + 1, critiques: [...state.critiques, review] };
  }
  const ballot = command.value;
  requireThat(ballot.judgments.length > 0 && ballot.judgments.length <= 3 && unique(ballot.judgments.map(judgment => judgment.performerId)), 'Rank up to three performers, each only once.');
  requireThat(ballot.judgments.every(judgment => judgment.performerId !== ballot.actorId && state.contributions.some(entry => entry.actorId === judgment.performerId && entry.id === judgment.contributionId) && validRatings(judgment.ratings) && nonempty(judgment.reason)), 'Support each ranking with a reviewed performance, ratings, and a reason; do not rank yourself.');
  return { ...state, revision: state.revision + 1, ballots: [...state.ballots, ballot] };
}

/** Latest ballot per voter counts; equal points receive equal places. */
export function rankDebatePerformers(state: DebateExchangeState): readonly { id: string; name: string; points: number; ballots: number; place: number }[] {
  const latest = new Map<string, DebateBallot>();
  for (const ballot of [...state.ballots].sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id))) latest.set(ballot.actorId, ballot);
  const scores = new Map<string, { id: string; name: string; points: number; ballots: number }>();
  for (const ballot of latest.values()) for (const [index, judgment] of ballot.judgments.entries()) {
    const performer = state.contributions.find(entry => entry.actorId === judgment.performerId)!;
    const score = scores.get(performer.actorId) ?? { id: performer.actorId, name: performer.name, points: 0, ballots: 0 };
    scores.set(score.id, { ...score, points: score.points + Math.max(0, 3 - index), ballots: score.ballots + 1 });
  }
  const sorted = [...scores.values()].sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  return sorted.map(score => ({ ...score, place: sorted.findIndex(other => other.points === score.points) + 1 }));
}

export function validateExchangeConfig(config: DebateStudioProjectConfig): void {
  const exchange = config.exchange;
  requireThat(exchange?.schemaVersion === '1.0' && exchange.lessons.length === 8, 'DEBATE_EXCHANGE_INVALID: eight sessions are required.');
  const modes: readonly ExchangeLessonMode[] = ['opening', 'exchange', 'refine', 'exchange', 'refine', 'exchange', 'refine', 'final'];
  exchange!.lessons.forEach((lesson, index) => {
    requireThat(lesson.number === index + 1 && lesson.mode === modes[index] && nonempty(lesson.title) && nonempty(lesson.product) && lesson.tasks.length > 0, 'DEBATE_EXCHANGE_INVALID: incorrect session cycle.');
    requireThat(lesson.skill.choices.length >= 2 && lesson.skill.choices.every(choice => nonempty(choice.text) && nonempty(choice.feedback)) && Number.isInteger(lesson.skill.strongest) && lesson.skill.strongest >= 0 && lesson.skill.strongest < lesson.skill.choices.length, 'DEBATE_EXCHANGE_INVALID: a skill example needs choices and feedback.');
    requireThat([...lesson.sourceIds, ...lesson.skill.sourceIds].every(id => config.evidence.some(source => source.id === id)), 'DEBATE_EXCHANGE_INVALID: unknown source.');
  });
  requireThat(exchange!.examples.every(example => config.factions.some(faction => faction.id === example.side) && example.evidenceIds.length > 0 && example.evidenceIds.every(id => config.evidence.some(source => source.id === id))), 'DEBATE_EXCHANGE_INVALID: invalid practice example.');
}
