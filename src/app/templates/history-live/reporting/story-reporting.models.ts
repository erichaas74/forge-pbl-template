/** Optional, versioned story-first extension. Legacy broadcast workspaces remain readable. */
export const REPORTING_STEPS = ['story', 'gather', 'build', 'format', 'create'] as const;
export type ReportingStep = (typeof REPORTING_STEPS)[number];
export const PRESENTATION_FORMATS = ['broadcast', 'reaction', 'social', 'animation'] as const;
export type PresentationFormat = (typeof PRESENTATION_FORMATS)[number];
export const BOARD_FIELDS = ['question', 'facts', 'opposing', 'context', 'unknowns', 'lead'] as const;
export type BoardField = (typeof BOARD_FIELDS)[number];
export type EvidenceKind = 'interview' | 'scene' | 'document';
export interface ReportingInterview {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly initials: string;
  readonly sourceIds: readonly string[];
  /** Scripted paraphrases of the linked evidence; never original historical quotations. */
  readonly questions: readonly { readonly id: string; readonly question: string; readonly answer: string }[];
}
export interface ReportingStory {
  readonly id: string;
  readonly leadId: string;
  readonly title: string;
  readonly location: string;
  readonly date: string;
  readonly hook: string;
  readonly scene: 'roads' | 'press' | 'camp' | 'siege';
  readonly sourceIds: readonly string[];
  readonly interviews: readonly ReportingInterview[];
  readonly dispatches: readonly { readonly time: string; readonly caption: string; readonly sourceIds: readonly string[] }[];
}
export interface StoryReportingConfig {
  readonly version: '1.0';
  readonly allowedFormats: readonly PresentationFormat[];
  readonly stories: readonly ReportingStory[];
}
export interface ReporterNote {
  readonly id: string;
  readonly originId: string;
  readonly kind: EvidenceKind;
  readonly title: string;
  readonly sourceIds: readonly string[];
  readonly text: string;
  readonly originalText: string;
  readonly previous: readonly string[];
}
export interface StoryBoardEntry { readonly text: string; readonly noteIds: readonly string[] }
export interface PresentationDraft {
  readonly title: string;
  readonly parts: readonly string[];
  readonly savedRevision?: number;
}
export interface ReportingWorkspace {
  readonly storyId: string;
  readonly notes: readonly ReporterNote[];
  readonly noteDrafts: Readonly<Record<string, string>>;
  readonly asked: readonly string[];
  readonly board: Readonly<Record<BoardField, StoryBoardEntry>>;
  readonly checks: readonly string[];
  readonly format?: PresentationFormat;
  readonly presentations: Partial<Readonly<Record<PresentationFormat, PresentationDraft>>>;
}
export interface StoryReportingState {
  readonly version: '1.0';
  readonly step: ReportingStep;
  readonly activeStoryId?: string;
  readonly allowedFormats?: readonly PresentationFormat[];
  readonly workspaces: readonly ReportingWorkspace[];
}
export type ReportingAction =
  | { type: 'reporting.storySelected'; storyId: string }
  | { type: 'reporting.stepOpened'; step: ReportingStep }
  | { type: 'reporting.questionAsked'; interviewId: string; questionId: string }
  | { type: 'reporting.noteDraftChanged'; originId: string; text: string }
  | { type: 'reporting.noteSaved'; originId: string }
  | { type: 'reporting.boardChanged'; field: BoardField; text: string }
  | { type: 'reporting.noteLinked'; field: BoardField; noteId: string }
  | { type: 'reporting.checkChanged'; check: string }
  | { type: 'reporting.formatSelected'; format: PresentationFormat }
  | { type: 'reporting.presentationChanged'; title?: string; index?: number; text?: string }
  | { type: 'reporting.presentationSaved' };
