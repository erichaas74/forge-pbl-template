/** Explanatory curriculum content surrounding a native completed artifact. */
export interface SampleThinkingStep {
  label: string;
  title: string;
  text: string;
  evidence?: string;
}
export interface SampleGuide {
  /** Presentation demonstrations, separate from the fictional submitted evidence record. */
  videos?: readonly SamplePresentationVideo[];
  title: string;
  subtitle: string;
  audience: string;
  duration: string;
  trail: readonly SampleThinkingStep[];
  review: { strength: string; question: string; revision: string; assessment: string };
}

export interface SamplePresentationVideo {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly src: string;
  readonly captions?: string;
}
