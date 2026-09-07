import type { ProjectSessionContext } from '../../core/context/project-session-context';
import { isExhibitObjectModel, type ExhibitObjectModel } from '../media/object-model';
import {
  isTeaserResult,
  validateTeaser,
  type ProjectTeaserConfig,
  type ProjectTeaserResult,
} from './project-teaser.models';

/** Optional project.intro capability; curriculum is independent of learner records. */
export interface ProjectIntroConfig {
  readonly capabilityId: 'project.intro';
  readonly schemaVersion: '1.0';
  readonly projectId: string;
  readonly version: string;
  readonly theme: string;
  readonly image?: string;
  readonly model?: ExhibitObjectModel;
  readonly imageAlt: string;
  readonly kicker: string;
  readonly headline: string;
  readonly story: string;
  readonly hook: string;
  readonly role: string;
  readonly teaser?: ProjectTeaserConfig;
  readonly challenge: {
    readonly title: string;
    readonly context: string;
    readonly options: readonly IntroChallengeOption[];
    readonly takeaway: string;
  };
  readonly decision: {
    readonly prompt: string;
    readonly options: readonly IntroOption[];
    readonly reasonPrompt: string;
    readonly reasonHint: string;
    readonly questionPrompt: string;
    readonly questionHint: string;
  };
  readonly mission: readonly string[];
  readonly action: string;
  readonly finalExample: {
    readonly button: string;
    readonly format: string;
    readonly title: string;
    readonly introduction: string;
    readonly chapters: readonly {
      readonly label: string;
      readonly title: string;
      readonly studentWork: string;
      readonly evidence: string;
      readonly teacherNote: string;
    }[];
    readonly lookFors: readonly string[];
  };
}

export interface IntroOption {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
}
export interface IntroChallengeOption extends IntroOption {
  readonly feedback: string;
}

export const introEvents = {
  teaserCompleted: 'projectIntro.teaserCompleted',
  teaserSkipped: 'projectIntro.teaserSkipped',
  draftSaved: 'projectIntro.draftSaved',
  accepted: 'projectIntro.accepted',
  revised: 'projectIntro.revised',
} as const;

export interface IntroResponse {
  readonly teaser?: ProjectTeaserResult;
  /** The original opening stays intact; later student practice is retained separately. */
  readonly practiceReplays?: readonly ProjectTeaserResult[];
  readonly challengeChoiceId: string;
  readonly choiceId: string;
  readonly reason: string;
  readonly question: string;
  readonly confidence: 'exploring' | 'developing' | 'confident';
}
export const EMPTY_INTRO_RESPONSE: IntroResponse = Object.freeze({
  challengeChoiceId: '',
  choiceId: '',
  reason: '',
  question: '',
  confidence: 'exploring',
});

export interface IntroRecord {
  readonly clientEventId: string;
  readonly eventType: typeof introEvents.accepted | typeof introEvents.revised;
  readonly timestamp: string;
  readonly response: IntroResponse;
}
export interface IntroSnapshot {
  readonly schemaVersion: '1.0';
  readonly revision: number;
  readonly updatedAt: string;
  readonly draft: IntroResponse;
  /** First entry is the immutable baseline; later entries preserve changes in thinking. */
  readonly history: readonly IntroRecord[];
}
export interface IntroScope {
  readonly session: ProjectSessionContext;
  readonly introVersion: string;
}
export interface IntroPersistenceAdapter {
  readonly saveLocation: string;
  load(scope: IntroScope): Promise<IntroSnapshot | undefined>;
  save(scope: IntroScope, snapshot: IntroSnapshot, expectedRevision: number): Promise<void>;
}

export class IntroError extends Error {
  constructor(
    readonly code: 'CONFIG_INVALID' | 'STATE_INVALID' | 'STATE_CONFLICT' | 'SAVE_FAILED',
    message: string,
  ) {
    super(message);
  }
}

export function validateIntroConfig(config: ProjectIntroConfig): void {
  if (config.teaser) validateTeaser(config.teaser);
  const unique = (items: readonly IntroOption[]) =>
    items.length >= 2 &&
    new Set(items.map((item) => item.id)).size === items.length &&
    items.every((item) => item.id.trim() && item.label.trim() && item.detail.trim());
  if (
    config.capabilityId !== 'project.intro' ||
    config.schemaVersion !== '1.0' ||
    !config.projectId ||
    !/^\d+\.\d+\.\d+$/.test(config.version) ||
    !(config.model
      ? isExhibitObjectModel(config.model)
      : config.image?.startsWith('/') && !config.image.startsWith('//')) ||
    !config.headline.trim() ||
    !config.hook.trim() ||
    !config.action.trim() ||
    !unique(config.challenge.options) ||
    !unique(config.decision.options) ||
    config.challenge.options.some((option) => !option.feedback.trim()) ||
    config.mission.length !== 3 ||
    config.finalExample.chapters.length < 3
  ) {
    throw new IntroError('CONFIG_INVALID', 'This project opening has missing or invalid content.');
  }
}

export function isIntroResponse(value: unknown): value is IntroResponse {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (
    ['challengeChoiceId', 'choiceId', 'reason', 'question'].every(
      (key) => typeof item[key] === 'string' && (item[key] as string).length <= 2000,
    ) &&
    ['exploring', 'developing', 'confident'].includes(item['confidence'] as string) &&
    (item['teaser'] === undefined || isTeaserResult(item['teaser'])) &&
    (item['practiceReplays'] === undefined ||
      (Array.isArray(item['practiceReplays']) &&
        item['practiceReplays'].length <= 10 &&
        item['practiceReplays'].every(isTeaserResult)))
  );
}

export function isIntroSnapshot(value: unknown): value is IntroSnapshot {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (
    item['schemaVersion'] === '1.0' &&
    Number.isInteger(item['revision']) &&
    (item['revision'] as number) > 0 &&
    typeof item['updatedAt'] === 'string' &&
    isIntroResponse(item['draft']) &&
    Array.isArray(item['history']) &&
    item['history'].every((record: unknown) => {
      if (!record || typeof record !== 'object') return false;
      const entry = record as Record<string, unknown>;
      return (
        typeof entry['clientEventId'] === 'string' &&
        typeof entry['timestamp'] === 'string' &&
        [introEvents.accepted, introEvents.revised].includes(
          entry['eventType'] as typeof introEvents.accepted,
        ) &&
        isIntroResponse(entry['response'])
      );
    })
  );
}

export function responseReady(config: ProjectIntroConfig, response: IntroResponse): boolean {
  return (
    config.challenge.options.some((option) => option.id === response.challengeChoiceId) &&
    config.decision.options.some((option) => option.id === response.choiceId) &&
    response.reason.trim().length > 0 &&
    response.question.trim().length > 0 &&
    isIntroResponse(response)
  );
}
