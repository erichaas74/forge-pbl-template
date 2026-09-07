import type { JourneyChoiceDefinition, JourneyEvidenceDefinition, JourneyProjectConfig, JourneyResponseDraft, JourneyStepRecord, JourneyTutorTurn } from './journey-replay.models';

/** A provider adapter receives only the current learner's bounded decision context. */
export interface JourneyTutorRequest {
  readonly requestId: string;
  readonly projectId: string;
  readonly projectVersion: string;
  readonly stepId: string;
  readonly choice: JourneyChoiceDefinition;
  readonly alternatives: readonly JourneyChoiceDefinition[];
  readonly sources: readonly JourneyEvidenceDefinition[];
  readonly response: JourneyResponseDraft;
  readonly responseFingerprint: string;
  readonly previousDecisions: readonly JourneyStepRecord[];
  readonly criteria: NonNullable<JourneyProjectConfig['learning']>['criteria'];
}

export interface JourneyTutorAdapter {
  /** Output is advisory and must echo request identity. It cannot mutate the journey or award mastery. */
  question(request: JourneyTutorRequest, signal: AbortSignal): Promise<{
    readonly requestId: string;
    readonly responseFingerprint: string;
    readonly criterionId: string;
    readonly question: string;
    readonly explanation?: string;
  }>;
}

export function responseFingerprint(draft: JourneyResponseDraft): string {
  // Exact content binding, not a security hash or a learner identifier.
  return JSON.stringify([draft.text, draft.transcript, draft.mediaAssetId, draft.prediction, draft.citations, draft.tutorTurns?.map(t => [t.id, t.answer])]);
}

export function tutorTurnIsCurrent(turn: JourneyTutorTurn, stepId: string, choiceId: string): boolean {
  return turn.stepId === stepId && turn.choiceId === choiceId;
}
