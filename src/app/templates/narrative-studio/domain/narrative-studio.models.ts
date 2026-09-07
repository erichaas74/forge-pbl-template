import type { RuntimeScope } from '../../../core/state/runtime-state-contracts';

export type NarrativeStudioStage =
  'conversation' | 'bible' | 'map' | 'write' | 'playtest' | 'publish';
export type NarrativeNodeKind = 'scene' | 'ending';
export type NarrativeCoachTool =
  'question' | 'possibilities' | 'storm' | 'continuity' | 'sensory' | 'stakes' | 'reader' | 'reply';

export interface NarrativeChoiceBlueprint {
  readonly id: string;
  readonly nextNodeId: string;
  readonly prompt: string;
}

export interface NarrativeNodeBlueprint {
  readonly id: string;
  readonly kind: NarrativeNodeKind;
  readonly endingOutcome?: 'death' | 'survival';
  readonly mapLabel: string;
  readonly suggestedTitle: string;
  readonly purpose: string;
  readonly craftPrompt: string;
  readonly choiceQuestion?: string;
  readonly stormStageId: string;
  readonly choices: readonly NarrativeChoiceBlueprint[];
}

export interface NarrativeStormStage {
  readonly id: string;
  readonly label: string;
  readonly pressure: string;
  readonly authorPrompt: string;
}

export interface NarrativeHistoricalSetting {
  readonly icon?: string;
  readonly id: string;
  readonly eraLabel: string;
  readonly title: string;
  readonly historicalEvent: string;
  readonly overview: string;
  readonly fictionalRole: string;
  readonly survivalPressure: string;
  readonly openingLine: string;
  readonly accuracyBoundary: string;
  readonly sourceLabel: string;
  readonly sourceUrl: string;
}

export type NarrativePlanningBibleField =
  'protagonist' | 'immediateGoal' | 'innerFear' | 'companion' | 'importantObject' | 'islandSecret';

export interface NarrativePlanningQuestion {
  readonly id: string;
  readonly bibleField: NarrativePlanningBibleField;
  readonly prompt: string;
}

export interface NarrativeStudioProjectConfig {
  readonly schemaVersion: '1.0';
  readonly template: {
    readonly id: 'narrative-studio';
    readonly version: '1.0' | '1.1' | '1.2' | '1.3';
  };
  /** New drafts start with an opening and two unwritten branches. Existing drafts keep their graph. */
  readonly authoringMode?: 'student-branches';
  readonly projectId: string;
  readonly projectVersion: string;
  readonly title: string;
  readonly subtitle: string;
  readonly drivingQuestion: string;
  readonly startNodeId: string;
  readonly nodes: readonly NarrativeNodeBlueprint[];
  readonly stormStages: readonly NarrativeStormStage[];
  readonly coachName: string;
  readonly coachPromise: string;
  readonly launchImage: string;
  readonly launchImageAlt: string;
  readonly historicalSettings: readonly NarrativeHistoricalSetting[];
  readonly planningQuestions: readonly NarrativePlanningQuestion[];
  readonly storyBiblePrompts: Readonly<Record<keyof NarrativeStoryBible, string>>;
  readonly rubric: readonly {
    readonly id: string;
    readonly label: string;
    readonly expectation: string;
  }[];
}

export interface NarrativeStoryBible {
  readonly protagonist: string;
  readonly immediateGoal: string;
  readonly innerFear: string;
  readonly islandSecret: string;
  readonly companion: string;
  readonly importantObject: string;
  readonly pointOfView: 'first' | 'third';
  readonly tone: 'adventure' | 'mystery' | 'suspense' | 'hopeful';
}

export interface NarrativeSceneDraft {
  readonly nodeId: string;
  readonly title: string;
  readonly text: string;
  readonly choiceLabels: Readonly<Record<string, string>>;
  readonly acceptedStormIdea?: string;
  readonly revisions: readonly NarrativeSceneRevision[];
  /** Preserve descendants when the writer temporarily ends this path. */
  readonly parkedChoices?: readonly NarrativeChoiceBlueprint[];
}

export interface NarrativeSceneRevision {
  readonly id: string;
  readonly timestamp: string;
  readonly title: string;
  readonly text: string;
  readonly choiceLabels: Readonly<Record<string, string>>;
}

export interface NarrativeCoachTurn {
  readonly id: string;
  readonly role: 'student' | 'coach';
  readonly tool: NarrativeCoachTool;
  readonly text: string;
  readonly timestamp: string;
  readonly nodeId?: string;
  readonly context?: 'planning' | 'scene';
}

export interface NarrativePlaytestRecord {
  readonly id: string;
  readonly timestamp: string;
  readonly path: readonly string[];
  readonly endingNodeId: string;
}

export interface PublishedNarrative {
  readonly nodes?: readonly NarrativeNodeBlueprint[];
  readonly authorNote?: string;
  readonly id: string;
  readonly publishedAt: string;
  readonly title: string;
  readonly authorDisplayName: string;
  readonly historicalSettingId: string;
  readonly bible: NarrativeStoryBible;
  readonly scenes: Readonly<Record<string, NarrativeSceneDraft>>;
}

export interface NarrativeStudioState {
  /** Student-authored graph; absent on legacy drafts that use the configured graph. */
  readonly nodes?: readonly NarrativeNodeBlueprint[];
  readonly schemaVersion: '1.0';
  readonly projectId: string;
  readonly projectVersion: string;
  readonly runtimeScope?: RuntimeScope;
  readonly revision: number;
  readonly updatedAt: string;
  readonly stage: NarrativeStudioStage;
  readonly selectedNodeId: string;
  readonly storyTitle: string;
  readonly historicalSettingId: string;
  readonly bible: NarrativeStoryBible;
  readonly scenes: Readonly<Record<string, NarrativeSceneDraft>>;
  readonly coachHistory: readonly NarrativeCoachTurn[];
  readonly playtests: readonly NarrativePlaytestRecord[];
  readonly published?: PublishedNarrative;
}

export interface NarrativeCoachRequest {
  readonly tool: NarrativeCoachTool;
  readonly stage: NarrativeStudioStage;
  readonly message?: string;
  readonly node: NarrativeNodeBlueprint;
  readonly scene: NarrativeSceneDraft;
  readonly bible: NarrativeStoryBible;
  readonly historicalSetting?: NarrativeHistoricalSetting;
  readonly storm: NarrativeStormStage;
  readonly priorTurns: readonly NarrativeCoachTurn[];
  readonly nextPlanningQuestion?: NarrativePlanningQuestion;
}

export interface NarrativeCoachResponse {
  readonly text: string;
  readonly proposedStormIdea?: string;
}

export interface NarrativeCoachAdapter {
  respond(request: NarrativeCoachRequest): Promise<NarrativeCoachResponse>;
}

export interface NarrativeReadinessIssue {
  readonly code: string;
  readonly message: string;
  readonly nodeId?: string;
}
