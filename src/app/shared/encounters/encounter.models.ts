export type EvidenceRelationship = 'supports' | 'contradicts' | 'does-not-establish';
export interface EncounterSource { readonly id: string; readonly title: string; readonly text: string; readonly sourceTitle: string; readonly sourceUrl: string }
export interface EncounterSpeech { readonly id: string; readonly title: string; readonly speaker: string; readonly text: string; readonly audioSrc: string; readonly evidenceIds: readonly string[] }
export interface EncounterView {
  readonly id: string; readonly label: string; readonly description: string;
  readonly position: number; readonly zoom: number; readonly mode: 'observe' | 'listen' | 'talk' | 'object';
}
export interface EncounterQuestion extends EncounterSpeech { readonly requiresQuestionId?: string }
export interface EncounterObject {
  readonly id: string; readonly title: string; readonly description: string; readonly position: number;
  readonly features: readonly { readonly id: string; readonly label: string; readonly text: string }[];
  readonly evidenceIds: readonly string[];
}
export interface EncounterDefinition {
  readonly id: string; readonly type: 'guided-scene'; readonly version: string; readonly chamberIds: readonly string[];
  readonly title: string; readonly location: string; readonly date: string; readonly invitation: string;
  readonly image: string; readonly imageAlt: string; readonly entryViewId: string;
  readonly host: { readonly name: string; readonly role: string; readonly greeting: string };
  readonly attribution: string; readonly views: readonly EncounterView[];
  readonly chapters: readonly EncounterSpeech[]; readonly questions: readonly EncounterQuestion[];
  readonly object: EncounterObject;
  readonly insight: {
    readonly title: string; readonly claim: string; readonly evidenceIds: readonly string[];
    readonly answerEvidenceId: string; readonly relationship: EvidenceRelationship;
    readonly explanation: string; readonly hint: string;
  };
}
export interface EncounterState {
  readonly viewId: string; readonly visitedViews: readonly string[]; readonly chapters: readonly string[];
  readonly questions: readonly string[]; readonly features: readonly string[];
  readonly chapterId?: string; readonly questionId?: string;
  readonly insightEarned: boolean; readonly lastCorrect?: boolean; readonly attempts: number;
}
export type EncounterAction =
  | { readonly type: 'enter' } | { readonly type: 'exit' }
  | { readonly type: 'view'; readonly viewId: string }
  | { readonly type: 'chapter'; readonly chapterId: string }
  | { readonly type: 'question'; readonly questionId: string }
  | { readonly type: 'feature'; readonly featureId: string }
  | { readonly type: 'insight'; readonly evidenceId: string; readonly relationship: EvidenceRelationship };
export interface EncounterTransition {
  readonly state: EncounterState; readonly message: string;
  readonly eventType: 'activity.started' | 'encounter.exited' | 'evidence.viewed' | 'npc.questionAsked' | 'activity.resultSubmitted';
  readonly correct?: boolean;
}
