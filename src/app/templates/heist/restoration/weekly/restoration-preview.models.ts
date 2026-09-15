import type { RestorationState } from '../../../../shared/restoration/restoration.models';
import type { PanoramaDefinition, PanoramaState } from '../../../../shared/panorama/panorama.models';

export interface RestorationPreviewSession {
  readonly title: string;
  readonly workId: string;
  readonly activity: 'inspect' | 'compare' | 'restore' | 'exhibit';
  readonly steps: readonly string[];
  readonly product: string;
  readonly film: {
    readonly src: string;
    readonly captions: string;
    readonly cues: readonly { readonly at: number; readonly regionId: string; readonly label: string; readonly transcript: string }[];
  };
}
export interface RestorationPreviewWeek {
  readonly week: number;
  readonly title: string;
  readonly setting: string;
  readonly sessions: readonly RestorationPreviewSession[];
  readonly questions: readonly string[];
  readonly evidence: readonly string[];
  readonly controls: readonly string[];
}
export interface RestorationPreviewConfig {
  readonly capability: 'restoration.preview-weeks.v1';
  readonly scenes?: readonly PanoramaDefinition[];
  readonly weeks: readonly RestorationPreviewWeek[];
  readonly sampleExhibit: readonly { readonly workId: string; readonly choices: Readonly<Record<string, string>>; readonly caption: string }[];
}
export interface RestorationImageTrial {
  readonly id: string;
  readonly state: RestorationState;
}
export interface RestorationPreviewState {
  readonly schemaVersion: 1;
  readonly version: number;
  readonly scenes?: Readonly<Record<string, PanoramaState>>;
  readonly works: Readonly<Record<string, RestorationState>>;
  readonly selectedByLesson: Readonly<Record<number, string>>;
  readonly sources: Readonly<Record<string, readonly string[]>>;
  readonly trials: Readonly<Record<string, readonly RestorationImageTrial[]>>;
  readonly filmTimes: Readonly<Record<number, number>>;
  readonly exhibit?: readonly string[];
  readonly captions: Readonly<Record<string, string>>;
  readonly sampleWorkIds: readonly string[];
}
export const initialPreviewState = (): RestorationPreviewState => ({ schemaVersion: 1, version: 0, works: {}, selectedByLesson: {}, sources: {}, trials: {}, filmTimes: {}, captions: {}, sampleWorkIds: [] });
