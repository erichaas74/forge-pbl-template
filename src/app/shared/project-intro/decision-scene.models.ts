import type { TeaserDialogueLine } from './project-teaser.models';
import { isExhibitObjectModel, type ExhibitObjectModel } from '../media/object-model';

export interface OpeningMedia {
  readonly image?: string;
  readonly fit?: 'cover' | 'contain';
  readonly model?: ExhibitObjectModel;
  readonly alt: string;
  readonly video?: string;
  readonly captions?: string;
  /** These clips are decorative; the complete scenario is also readable on screen. */
  readonly videoFallback?: 'illustration-and-transcript';
}

export interface OpeningChoice {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
  readonly image?: string;
  readonly model?: ExhibitObjectModel;
  readonly imageAlt: string;
  readonly badge: string;
  readonly cargo?: { readonly name: string; readonly cost: number; readonly sale: number };
  /** A bounded student-authored thought before the supplied interpretation is revealed. */
  readonly thinking?: {
    readonly prompt: string;
    readonly starter: string;
    readonly guide: string;
    readonly evidence?: readonly { readonly id: string; readonly text: string }[];
  };
  readonly result: {
    readonly title: string;
    readonly text: string;
    readonly evidence: string;
    readonly surprise: string;
    readonly media: OpeningMedia;
    readonly metrics?: readonly { readonly label: string; readonly value: string }[];
    readonly dialogue?: readonly TeaserDialogueLine[];
    readonly source?: { readonly label: string; readonly url: string };
  };
}

/** User-played, audible presentations. Summary is contextual copy, not a transcript. */
export interface OpeningSpeech {
  readonly id: string;
  readonly speaker: string;
  readonly title: string;
  readonly summary: string;
  readonly video: string;
  readonly captions?: string;
}

/** Reusable choice + consequence capability. Subject matter lives in project content. */
export interface DecisionSceneConfig {
  readonly type: 'decision-scene';
  readonly id: string;
  readonly version: string;
  readonly headline: string;
  readonly replayLabel: string;
  readonly kicker: string;
  readonly interaction: 'cargo' | 'artifact' | 'council' | 'dispatch' | 'navigation';
  readonly invitation: string;
  readonly sceneLabel: string;
  readonly sceneCaption: string;
  readonly sceneBadge?: { readonly primary: string; readonly secondary: string };
  readonly transition?: { readonly style: 'load' | 'spotlight'; readonly label: string };
  readonly media: OpeningMedia;
  /** Optional, self-paced story shown before any choices or practice questions. */
  readonly prologue?: {
    readonly title: string;
    readonly setting: string;
    readonly media: OpeningMedia;
    readonly dialogue: readonly TeaserDialogueLine[];
    readonly continueLabel: string;
  };
  /** Replace the opening video with this illustration when playback ends. */
  readonly afterVideoMedia?: OpeningMedia;
  /** Optional budgeted selection; absent keeps the original single-choice flow. */
  readonly cargo?: {
    readonly startingCoins: number;
    readonly capacity: number;
    readonly vehicleImage: string;
    readonly vehicleAlt: string;
  };
  readonly speeches?: readonly OpeningSpeech[];
  readonly dialogue: readonly TeaserDialogueLine[];
  readonly prompt: string;
  readonly choices: readonly OpeningChoice[];
  readonly revealButton: string;
  readonly mission: {
    readonly title: string;
    readonly invitation: string;
    readonly image?: string;
    readonly model?: ExhibitObjectModel;
    readonly imageAlt: string;
    readonly deliverable: string;
    readonly steps: readonly string[];
    readonly finishButton: string;
    readonly dialogue?: readonly TeaserDialogueLine[];
  };
}

const local = (value: string | undefined) => typeof value === 'string' && /^\/(?!\/)/.test(value);
const nonempty = (value: string) => typeof value === 'string' && !!value.trim();
const mediaValid = (media: OpeningMedia) =>
  !!media &&
  (media.model ? isExhibitObjectModel(media.model) : local(media.image)) &&
  nonempty(media.alt) &&
  (media.fit === undefined || ['cover', 'contain'].includes(media.fit)) &&
  (!media.video ||
    (local(media.video) &&
      local(media.captions) &&
      media.videoFallback === 'illustration-and-transcript'));
const linesValid = (lines: readonly TeaserDialogueLine[]) =>
  Array.isArray(lines) &&
  lines.every((line) => nonempty(line.speaker) && nonempty(line.text) && local(line.audioUrl));

export function validateDecisionScene(config: DecisionSceneConfig): void {
  if (
    !['cargo', 'artifact', 'council', 'dispatch', 'navigation'].includes(config.interaction) ||
    ![
      config.replayLabel,
      config.kicker,
      config.invitation,
      config.sceneLabel,
      config.sceneCaption,
      config.prompt,
      config.revealButton,
    ].every(nonempty) ||
    !mediaValid(config.media) ||
    (config.prologue !== undefined &&
      (![config.prologue.title, config.prologue.setting, config.prologue.continueLabel].every(
        nonempty,
      ) ||
        !mediaValid(config.prologue.media) ||
        !linesValid(config.prologue.dialogue) ||
        config.prologue.dialogue.length < 1 ||
        config.prologue.dialogue.length > 6)) ||
    (config.afterVideoMedia !== undefined &&
      (!config.media.video ||
        !mediaValid(config.afterVideoMedia) ||
        !!config.afterVideoMedia.video ||
        !!config.afterVideoMedia.model)) ||
    (config.cargo !== undefined &&
      (config.interaction !== 'cargo' ||
        !Number.isSafeInteger(config.cargo.startingCoins) ||
        config.cargo.startingCoins < 0 ||
        !Number.isSafeInteger(config.cargo.capacity) ||
        config.cargo.capacity < 1 ||
        config.cargo.capacity > config.choices.length ||
        !local(config.cargo.vehicleImage) ||
        !nonempty(config.cargo.vehicleAlt) ||
        config.choices.some(
          (choice) =>
            !choice.cargo ||
            !nonempty(choice.cargo.name) ||
            !local(choice.image) ||
            !Number.isSafeInteger(choice.cargo.cost) ||
            choice.cargo.cost < 0 ||
            !Number.isSafeInteger(choice.cargo.sale) ||
            choice.cargo.sale < 0,
        ) ||
        [...config.choices]
          .sort((a, b) => (a.cargo?.cost ?? 0) - (b.cargo?.cost ?? 0))
          .slice(0, config.cargo.capacity)
          .reduce((sum, item) => sum + (item.cargo?.cost ?? 0), 0) > config.cargo.startingCoins)) ||
    (config.speeches !== undefined &&
      (!Array.isArray(config.speeches) ||
        config.speeches.length < 1 ||
        config.speeches.length > 4 ||
        new Set(config.speeches.map((speech) => speech.id)).size !== config.speeches.length ||
        config.speeches.some(
          (speech) =>
            ![speech.id, speech.speaker, speech.title, speech.summary].every(nonempty) ||
            !local(speech.video) ||
            (speech.captions !== undefined && !local(speech.captions)),
        ))) ||
    (config.sceneBadge &&
      (!nonempty(config.sceneBadge.primary) || !nonempty(config.sceneBadge.secondary))) ||
    (config.transition &&
      (!['load', 'spotlight'].includes(config.transition.style) ||
        !nonempty(config.transition.label))) ||
    !linesValid(config.dialogue) ||
    !Array.isArray(config.choices) ||
    config.choices.length < 2 ||
    config.choices.length > 4 ||
    new Set(config.choices.map((choice) => choice.id)).size !== config.choices.length ||
    config.choices.some(
      (choice: OpeningChoice) =>
        ![
          choice.id,
          choice.label,
          choice.detail,
          choice.imageAlt,
          choice.badge,
          choice.result?.title,
          choice.result?.text,
          choice.result?.evidence,
          choice.result?.surprise,
        ].every(nonempty) ||
        !(choice.model
          ? isExhibitObjectModel(choice.model)
          : local(choice.image) || !!config.speeches?.length) ||
        !mediaValid(choice.result.media) ||
        (choice.thinking &&
          (![choice.thinking.prompt, choice.thinking.starter, choice.thinking.guide].every(
            nonempty,
          ) ||
            (choice.thinking.evidence !== undefined &&
              (choice.thinking.evidence.length < 2 ||
                choice.thinking.evidence.length > 4 ||
                new Set(choice.thinking.evidence.map((item) => item.id)).size !==
                  choice.thinking.evidence.length ||
                choice.thinking.evidence.some(
                  (item) => !nonempty(item.id) || !nonempty(item.text),
                ))))) ||
        (choice.result.dialogue && !linesValid(choice.result.dialogue)) ||
        (choice.result.metrics &&
          (!choice.result.metrics.length ||
            choice.result.metrics.length > 4 ||
            choice.result.metrics.some(
              (metric) => !nonempty(metric.label) || !nonempty(metric.value),
            ))) ||
        (choice.result.source &&
          (!nonempty(choice.result.source.label) || !/^https:\/\//.test(choice.result.source.url))),
    ) ||
    !config.mission ||
    ![
      config.mission.title,
      config.mission.invitation,
      config.mission.imageAlt,
      config.mission.deliverable,
      config.mission.finishButton,
    ].every(nonempty) ||
    !(config.mission.model
      ? isExhibitObjectModel(config.mission.model)
      : local(config.mission.image)) ||
    config.mission.steps.length !== 3 ||
    !config.mission.steps.every(nonempty) ||
    (config.mission.dialogue && !linesValid(config.mission.dialogue))
  )
    throw new Error('CONFIG_INVALID: The decision opening scene is incomplete.');
}
