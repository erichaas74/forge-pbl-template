import type {
  NarrativeNodeBlueprint,
  NarrativeReadinessIssue,
  NarrativeStudioProjectConfig,
  NarrativeStudioState,
} from '../domain/narrative-studio.models';

/** Resolve only connected branches, retaining parked drafts in the saved state. */
export function narrativeDraftConfig(
  config: NarrativeStudioProjectConfig,
  state: NarrativeStudioState,
): NarrativeStudioProjectConfig {
  if (!state.nodes) return config;
  const byId = new Map(state.nodes.map((node) => [node.id, node]));
  const reached = new Set<string>();
  const pending = [config.startNodeId];
  while (pending.length) {
    const id = pending.shift()!;
    if (reached.has(id)) continue;
    reached.add(id);
    for (const choice of byId.get(id)?.choices ?? []) pending.push(choice.nextNodeId);
  }
  return { ...config, nodes: state.nodes.filter((node) => reached.has(node.id)) };
}

export function changeNarrativeBranch(
  config: NarrativeStudioProjectConfig,
  state: NarrativeStudioState,
  nodeId: string,
  action: 'branch' | 'end' | 'finish',
  branchId: string,
): NarrativeStudioState {
  const nodes = state.nodes ?? config.nodes;
  const node = nodes.find((item) => item.id === nodeId);
  const scene = state.scenes[nodeId];
  if (!node || !scene || (action === 'branch' && node.choices.length)) return state;
  if (action !== 'branch') {
    if (nodeId === config.startNodeId) return state;
    return {
      ...state,
      playtests: [],
      nodes: nodes.map((item) =>
        item.id === nodeId
          ? {
              ...item,
              kind: 'ending',
              endingOutcome: action === 'end' ? 'death' : 'survival',
              choices: [],
            }
          : item,
      ),
      scenes: {
        ...state.scenes,
        [nodeId]: {
          ...scene,
          parkedChoices: node.choices.length ? node.choices : scene.parkedChoices,
        },
      },
    };
  }
  const restored = scene.parkedChoices?.length ? scene.parkedChoices : undefined;
  const choices =
    restored ??
    [1, 2].map((index) => ({
      id: `${branchId}-choice-${index}`,
      nextNodeId: `${branchId}-${index}`,
      prompt: `Write choice ${index}`,
    }));
  if (!restored && choices.some((choice) => nodes.some((item) => item.id === choice.nextNodeId)))
    return state;
  const children: NarrativeNodeBlueprint[] = restored
    ? []
    : choices.map((choice, index) => ({
        id: choice.nextNodeId,
        kind: 'scene',
        mapLabel: `Branch ${index + 1}`,
        suggestedTitle: `Untitled branch ${index + 1}`,
        purpose: 'Tell what happens because of the reader’s choice.',
        craftPrompt: 'Show the consequence. Then decide whether this path ends or branches again.',
        choiceQuestion: 'What happens next?',
        stormStageId: node.stormStageId,
        choices: [],
      }));
  const scenes = {
    ...state.scenes,
    [nodeId]: {
      ...scene,
      parkedChoices: undefined,
      choiceLabels: {
        ...scene.choiceLabels,
        ...Object.fromEntries(
          choices.map((choice) => [choice.id, scene.choiceLabels[choice.id] ?? '']),
        ),
      },
    },
  };
  for (const child of children)
    scenes[child.id] = {
      nodeId: child.id,
      title: child.suggestedTitle,
      text: '',
      choiceLabels: {},
      revisions: [],
    };
  return {
    ...state,
    playtests: [],
    scenes,
    nodes: [
      ...nodes.map((item) =>
        item.id === nodeId
          ? {
              ...item,
              kind: 'scene' as const,
              endingOutcome: undefined,
              choiceQuestion: 'What happens next?',
              choices,
            }
          : item,
      ),
      ...children,
    ],
  };
}

export function validNarrativePath(
  config: NarrativeStudioProjectConfig,
  path: readonly string[],
): boolean {
  const byId = new Map(config.nodes.map((node) => [node.id, node]));
  return (
    path[0] === config.startNodeId &&
    byId.get(path.at(-1) ?? '')?.kind === 'ending' &&
    path.every(
      (id, index) =>
        index === 0 ||
        !!byId.get(path[index - 1])?.choices.some((choice) => choice.nextNodeId === id),
    )
  );
}

export function narrativeGraphIssues(
  config: NarrativeStudioProjectConfig,
): NarrativeReadinessIssue[] {
  const issues: NarrativeReadinessIssue[] = [];
  const byId = new Map(config.nodes.map((node) => [node.id, node]));
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (id: string): void => {
    if (visiting.has(id)) {
      issues.push({
        code: 'STORY_CYCLE',
        message: 'A branch loops back without reaching an ending.',
        nodeId: id,
      });
      return;
    }
    if (visited.has(id)) return;
    const node = byId.get(id);
    if (!node) {
      issues.push({ code: 'BRANCH_MISSING', message: 'A choice needs a connected scene.' });
      return;
    }
    visiting.add(id);
    if (node.kind === 'scene' && node.choices.length !== 2)
      issues.push({
        code: 'BRANCH_UNDECIDED',
        message: `${node.mapLabel}: add two choices or mark this as an ending.`,
        nodeId: id,
      });
    if (node.kind === 'ending' && node.choices.length)
      issues.push({
        code: 'ENDING_HAS_CHOICES',
        message: `${node.mapLabel}: endings cannot have outgoing choices.`,
        nodeId: id,
      });
    if (new Set(node.choices.map((choice) => choice.id)).size !== node.choices.length)
      issues.push({
        code: 'CHOICE_ID_REPEATED',
        message: `${node.mapLabel}: choice identifiers must be unique.`,
        nodeId: id,
      });
    for (const choice of node.choices) visit(choice.nextNodeId);
    visiting.delete(id);
    visited.add(id);
  };
  visit(config.startNodeId);
  if (byId.size !== config.nodes.length)
    issues.push({ code: 'SCENE_ID_REPEATED', message: 'Scene identifiers must be unique.' });
  if (config.nodes.filter((node) => visited.has(node.id) && node.kind === 'ending').length < 2)
    issues.push({
      code: 'ENDINGS_MISSING',
      message: 'Give your readers at least two different endings.',
    });
  return issues;
}
