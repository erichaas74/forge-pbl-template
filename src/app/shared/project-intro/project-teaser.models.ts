import { validateDecisionScene, type DecisionSceneConfig } from './decision-scene.models';

export interface TeaserDialogueLine {
  readonly speaker: string;
  readonly text: string;
  readonly audioUrl: string;
}

export interface IllustratedComparisonConfig {
  readonly type: 'illustrated-comparison';
  readonly id: string;
  readonly version: string;
  readonly headline: string;
  readonly scientistName: string;
  readonly robotName: string;
  readonly invitation: string;
  readonly testButton: string;
  readonly finishButton: string;
  readonly evidenceNote: string;
  readonly comedyNote: string;
  readonly samples: readonly {
    readonly id: string;
    readonly label: string;
    readonly result: string;
    readonly color: string;
  }[];
  readonly dialogue: Readonly<
    Record<'welcome' | 'testing' | 'reveal' | 'handoff', readonly TeaserDialogueLine[]>
  >;
}

/** Extend with another registered scene contract when a different interaction is needed. */
export type ProjectTeaserConfig = IllustratedComparisonConfig | DecisionSceneConfig;

export interface ProjectTeaserResult {
  readonly eventType: 'projectIntro.teaserCompleted' | 'projectIntro.teaserSkipped';
  readonly teaserId: string;
  readonly teaserVersion: string;
  readonly timestamp: string;
  /** Optional for earlier comparison receipts; the first choice is preserved on replay. */
  readonly choiceId?: string;
  readonly observations: readonly { readonly sampleId: string; readonly result: string }[];
  /** Authored attempts are distinct from the simulation's supplied observations. */
  readonly thinking?: readonly {
    readonly step: string;
    readonly answer: string;
    readonly evidenceId?: string;
    readonly correct?: boolean;
  }[];
}

export function validateTeaser(config: ProjectTeaserConfig): void {
  if (!config || !config.id || !/^\d+\.\d+\.\d+$/.test(config.version) || !config.headline)
    throw new Error('CONFIG_INVALID: The opening scene identity is incomplete.');
  if (config.type === 'decision-scene') return validateDecisionScene(config);
  const localAsset = (value: string) => value.startsWith('/') && !value.startsWith('//');
  if (
    config.type !== 'illustrated-comparison' ||
    !config.id ||
    !/^\d+\.\d+\.\d+$/.test(config.version) ||
    !config.headline ||
    !config.testButton ||
    !config.finishButton ||
    !config.comedyNote ||
    !config.evidenceNote ||
    config.samples.length !== 2 ||
    new Set(config.samples.map((sample) => sample.id)).size !== 2 ||
    config.samples.some(
      (sample) => !sample.label || !sample.result || !/^#[\da-f]{6}$/i.test(sample.color),
    ) ||
    ['welcome', 'testing', 'reveal', 'handoff'].some((beat) => {
      const lines = config.dialogue[beat as keyof typeof config.dialogue];
      return (
        !lines?.length ||
        lines.some(
          (line) =>
            !['scientist', 'robot'].includes(line.speaker) ||
            !line.text ||
            !localAsset(line.audioUrl),
        )
      );
    })
  )
    throw new Error('CONFIG_INVALID: The illustrated opening scene is incomplete.');
}

export function isTeaserResult(value: unknown): value is ProjectTeaserResult {
  if (!value || typeof value !== 'object') return false;
  const result = value as Record<string, unknown>;
  return (
    ['projectIntro.teaserCompleted', 'projectIntro.teaserSkipped'].includes(
      result['eventType'] as string,
    ) &&
    typeof result['teaserId'] === 'string' &&
    typeof result['teaserVersion'] === 'string' &&
    typeof result['timestamp'] === 'string' &&
    (result['choiceId'] === undefined ||
      (typeof result['choiceId'] === 'string' &&
        result['choiceId'].length > 0 &&
        result['choiceId'].length <= 100)) &&
    Number.isFinite(Date.parse(result['timestamp'])) &&
    (result['thinking'] === undefined ||
      (Array.isArray(result['thinking']) &&
        result['thinking'].length <= 40 &&
        result['thinking'].every((entry: unknown) => {
          if (!entry || typeof entry !== 'object') return false;
          const attempt = entry as Record<string, unknown>;
          return (
            typeof attempt['step'] === 'string' &&
            attempt['step'].length <= 100 &&
            typeof attempt['answer'] === 'string' &&
            attempt['answer'].length <= 1000 &&
            (attempt['evidenceId'] === undefined ||
              (typeof attempt['evidenceId'] === 'string' && attempt['evidenceId'].length <= 100)) &&
            (attempt['correct'] === undefined || typeof attempt['correct'] === 'boolean')
          );
        }))) &&
    Array.isArray(result['observations']) &&
    result['observations'].length <= 10 &&
    result['observations'].every(
      (item: unknown) =>
        !!item &&
        typeof item === 'object' &&
        'sampleId' in item &&
        typeof item.sampleId === 'string' &&
        'result' in item &&
        typeof item.result === 'string',
    )
  );
}
