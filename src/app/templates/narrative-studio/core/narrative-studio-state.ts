import type {
  NarrativeNodeBlueprint,
  NarrativeReadinessIssue,
  NarrativeSceneDraft,
  NarrativeStudioProjectConfig,
  NarrativeStudioState,
  NarrativeStoryBible,
} from '../domain/narrative-studio.models';
import {
  narrativeDraftConfig,
  narrativeGraphIssues,
  validNarrativePath,
} from './narrative-branching';

export const NARRATIVE_STAGES = [
  { id: 'map', label: 'Story Map', optional: false },
  { id: 'write', label: 'Scene Writer', optional: false },
  { id: 'playtest', label: 'Playtest', optional: false },
  { id: 'publish', label: 'Publish', optional: false },
  { id: 'conversation', label: 'Planning Guide', optional: true },
  { id: 'bible', label: 'Story Notes', optional: true },
] as const;

export function validateNarrativeConfig(config: NarrativeStudioProjectConfig): void {
  const ids = config.nodes.map((node) => node.id);
  if (
    config.template.id !== 'narrative-studio' ||
    !['1.0', '1.1', '1.2', '1.3'].includes(config.template.version) ||
    !config.projectId ||
    !config.projectVersion ||
    !/^\/(?!\/)/.test(config.launchImage) ||
    !config.launchImageAlt.trim() ||
    config.historicalSettings.length < 3 ||
    config.historicalSettings.length > 4 ||
    new Set(config.historicalSettings.map((setting) => setting.id)).size !==
      config.historicalSettings.length ||
    config.historicalSettings.some(
      (setting) =>
        ![
          setting.id,
          setting.eraLabel,
          setting.title,
          setting.historicalEvent,
          setting.overview,
          setting.fictionalRole,
          setting.survivalPressure,
          setting.openingLine,
          setting.accuracyBoundary,
          setting.sourceLabel,
        ].every((value) => value.trim()) || !/^https:\/\//.test(setting.sourceUrl),
    ) ||
    config.planningQuestions.length !== 6 ||
    new Set(config.planningQuestions.map((question) => question.id)).size !== 6 ||
    new Set(config.planningQuestions.map((question) => question.bibleField)).size !== 6 ||
    config.planningQuestions.some((question) => !question.id.trim() || !question.prompt.trim()) ||
    ids.length < 6 ||
    new Set(ids).size !== ids.length ||
    !ids.includes(config.startNodeId)
  ) {
    throw new Error('CONFIG_INVALID: Narrative Studio requires a unique, connected story graph.');
  }
  const stormIds = new Set(config.stormStages.map((stage) => stage.id));
  for (const node of config.nodes) {
    if (!stormIds.has(node.stormStageId)) {
      throw new Error(`CONFIG_INVALID: Scene "${node.id}" references an unknown storm stage.`);
    }
    if (node.kind === 'ending' && node.choices.length > 0) {
      throw new Error(`CONFIG_INVALID: Ending "${node.id}" cannot lead to another scene.`);
    }
    if (node.kind === 'scene' && (node.choices.length !== 2 || !node.choiceQuestion?.trim())) {
      throw new Error(
        `CONFIG_INVALID: Decision scene "${node.id}" needs one question and exactly two options.`,
      );
    }
    for (const choice of node.choices) {
      if (!ids.includes(choice.nextNodeId)) {
        throw new Error(`CONFIG_INVALID: Choice "${choice.id}" has an unknown destination.`);
      }
    }
  }
  const reachable = reachableNodeIds(config);
  if (
    reachable.size !== ids.length ||
    config.nodes.filter((node) => node.kind === 'ending').length < 3
  ) {
    throw new Error('CONFIG_INVALID: Every scene and at least three endings must be reachable.');
  }
}

export function createInitialNarrativeState(
  config: NarrativeStudioProjectConfig,
  timestamp = new Date().toISOString(),
  historicalSettingId = '',
): NarrativeStudioState {
  validateNarrativeConfig(config);
  const opening = config.nodes.find((node) => node.id === config.startNodeId)!;
  const nodes =
    config.authoringMode === 'student-branches'
      ? [
          {
            ...opening,
            suggestedTitle: 'My opening',
            choices: opening.choices.map((choice, index) => ({
              ...choice,
              prompt: `Write choice ${index + 1}`,
            })),
          },
          ...opening.choices.map((choice, index) => ({
            ...config.nodes.find((node) => node.id === choice.nextNodeId)!,
            kind: 'scene' as const,
            mapLabel: `Branch ${index + 1}`,
            suggestedTitle: `Branch ${index + 1}`,
            purpose: 'Tell what happens because of the reader’s choice.',
            craftPrompt:
              'Show the consequence. Then decide whether this path ends or branches again.',
            choices: [],
          })),
        ]
      : config.nodes;
  const scenes = Object.fromEntries(nodes.map((node) => [node.id, createScene(node)])) as Readonly<
    Record<string, NarrativeSceneDraft>
  >;
  return {
    schemaVersion: '1.0',
    projectId: config.projectId,
    projectVersion: config.projectVersion,
    revision: 0,
    updatedAt: timestamp,
    stage: 'map',
    selectedNodeId: config.startNodeId,
    storyTitle: '',
    historicalSettingId: config.historicalSettings.some(
      (setting) => setting.id === historicalSettingId,
    )
      ? historicalSettingId
      : '',
    bible: {
      protagonist: '',
      immediateGoal: '',
      innerFear: '',
      islandSecret: '',
      companion: '',
      importantObject: '',
      pointOfView: 'third',
      tone: 'adventure',
    },
    scenes,
    ...(config.authoringMode ? { nodes } : {}),
    coachHistory: [],
    playtests: [],
  };
}

export function narrativeReadiness(
  config: NarrativeStudioProjectConfig,
  state: NarrativeStudioState,
): readonly NarrativeReadinessIssue[] {
  config = narrativeDraftConfig(config, state);
  const issues: NarrativeReadinessIssue[] = [...narrativeGraphIssues(config)];
  if (!config.historicalSettings.some((setting) => setting.id === state.historicalSettingId)) {
    issues.push({
      code: 'HISTORY_MISSING',
      message: 'Choose the historical event that will anchor your story.',
    });
  }
  if (state.storyTitle.trim().length < 3) {
    issues.push({ code: 'TITLE_MISSING', message: 'Give your story a title.' });
  }
  for (const node of config.nodes) {
    const scene = state.scenes[node.id];
    if (!scene || scene.text.trim().split(/\s+/).filter(Boolean).length < 20) {
      issues.push({
        code: 'SCENE_TOO_SHORT',
        message: `${node.mapLabel} needs at least 20 words.`,
        nodeId: node.id,
      });
    }
    const labels = node.choices.map((choice) => scene?.choiceLabels[choice.id]?.trim() ?? '');
    if (labels.some((label) => label.length < 3)) {
      issues.push({
        code: 'CHOICE_MISSING',
        message: `${node.mapLabel} needs clear reader-choice labels.`,
        nodeId: node.id,
      });
    } else if (new Set(labels.map((label) => label.toLowerCase())).size !== labels.length) {
      issues.push({
        code: 'CHOICES_REPEAT',
        message: `${node.mapLabel} needs choices that lead in meaningfully different directions.`,
        nodeId: node.id,
      });
    }
  }
  if (
    new Set(
      state.playtests
        .filter((test) => validNarrativePath(config, test.path))
        .map((test) => test.endingNodeId),
    ).size < 2
  ) {
    issues.push({
      code: 'PLAYTEST_INCOMPLETE',
      message: 'Playtest paths to at least two different endings.',
    });
  }
  return issues;
}

export function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function totalWordCount(state: NarrativeStudioState): number {
  return Object.values(state.scenes).reduce((total, scene) => total + wordCount(scene.text), 0);
}

export function createScene(node: NarrativeNodeBlueprint): NarrativeSceneDraft {
  return {
    nodeId: node.id,
    title: node.suggestedTitle,
    text: '',
    choiceLabels: Object.fromEntries(node.choices.map((choice) => [choice.id, ''])),
    revisions: [],
  };
}

function reachableNodeIds(config: NarrativeStudioProjectConfig): Set<string> {
  const byId = new Map(config.nodes.map((node) => [node.id, node]));
  const reached = new Set<string>();
  const pending = [config.startNodeId];
  while (pending.length) {
    const id = pending.pop()!;
    if (reached.has(id)) continue;
    reached.add(id);
    for (const choice of byId.get(id)?.choices ?? []) pending.push(choice.nextNodeId);
  }
  return reached;
}
