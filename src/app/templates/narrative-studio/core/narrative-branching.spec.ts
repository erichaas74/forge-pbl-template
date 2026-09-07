import { survivalIslandStoryLabConfig as config } from '../../../projects/survival-island-story-lab/survival-island.config';
import { survivalIslandSampleStory as sample } from '../../../projects/completed-samples/narrative.sample-data';
import {
  changeNarrativeBranch,
  narrativeDraftConfig,
  narrativeGraphIssues,
  validNarrativePath,
} from './narrative-branching';
import { createInitialNarrativeState } from './narrative-studio-state';
import { isNarrativeStudioState } from '../persistence/narrative-studio.persistence';

describe('Student-authored branches', () => {
  it('validates saved graphs while accepting legacy snapshots', () => {
    const state = createInitialNarrativeState(config);
    expect(isNarrativeStudioState(JSON.parse(JSON.stringify(state)))).toBe(true);
    expect(isNarrativeStudioState({ ...state, nodes: undefined })).toBe(true);
    expect(isNarrativeStudioState({ ...state, nodes: 'broken' })).toBe(false);
    expect(isNarrativeStudioState({ ...state, nodes: state.nodes!.slice(0, 1) })).toBe(false);
    expect(isNarrativeStudioState({ ...state, selectedNodeId: 'missing' })).toBe(false);
  });
  it('adds two blank child scenes without changing the curriculum configuration', () => {
    const original = JSON.stringify(config);
    const initial = createInitialNarrativeState(config);
    const next = changeNarrativeBranch(config, initial, 'ridge', 'branch', 'test');
    expect(next.nodes).toHaveLength(5);
    expect(next.scenes['test-1'].text).toBe('');
    expect(Object.values(next.scenes['ridge'].choiceLabels)).toEqual(['', '']);
    expect(JSON.stringify(config)).toBe(original);
    expect(changeNarrativeBranch(config, next, 'ridge', 'branch', 'test')).toBe(next);
  });

  it('parks and restores a continuation without losing text, choices or revisions', () => {
    let state = changeNarrativeBranch(
      config,
      createInitialNarrativeState(config),
      'ridge',
      'branch',
      'test',
    );
    state = {
      ...state,
      scenes: { ...state.scenes, 'test-1': { ...state.scenes['test-1'], text: 'Keep my story.' } },
    };
    const ended = changeNarrativeBranch(config, state, 'ridge', 'end', 'unused');
    expect(ended.nodes?.find((node) => node.id === 'ridge')?.endingOutcome).toBe('death');
    expect(narrativeDraftConfig(config, ended).nodes).toHaveLength(3);
    expect(ended.scenes['test-1'].text).toBe('Keep my story.');
    const restored = changeNarrativeBranch(config, ended, 'ridge', 'branch', 'unused');
    expect(narrativeDraftConfig(config, restored).nodes).toHaveLength(5);
    expect(restored.scenes['test-1']).toEqual(state.scenes['test-1']);
    expect(restored.nodes?.find((node) => node.id === 'ridge')?.choices).toEqual(
      state.nodes?.find((node) => node.id === 'ridge')?.choices,
    );
  });

  it('distinguishes unfinished branches, death and survival endings, and valid playtests', () => {
    let state = createInitialNarrativeState(config);
    expect(
      narrativeGraphIssues(narrativeDraftConfig(config, state)).filter(
        (issue) => issue.code === 'BRANCH_UNDECIDED',
      ),
    ).toHaveLength(2);
    state = changeNarrativeBranch(config, state, 'ridge', 'end', 'unused');
    state = changeNarrativeBranch(config, state, 'lagoon', 'finish', 'unused');
    const graph = narrativeDraftConfig(config, state);
    expect(narrativeGraphIssues(graph)).toEqual([]);
    expect(graph.nodes.find((node) => node.id === 'lagoon')?.endingOutcome).toBe('survival');
    expect(validNarrativePath(graph, ['shore', 'ridge'])).toBe(true);
    expect(validNarrativePath(graph, ['shore', 'lagoon', 'ridge'])).toBe(false);
    expect(changeNarrativeBranch(config, state, 'shore', 'end', 'unused')).toBe(state);
  });

  it('keeps legacy graphs and rejects a cycle', () => {
    const state = { ...createInitialNarrativeState(config), nodes: undefined };
    expect(narrativeDraftConfig(config, state)).toBe(config);
    const cycle = {
      ...config,
      nodes: config.nodes.map((node) =>
        node.id === 'ridge'
          ? { ...node, choices: node.choices.map((choice) => ({ ...choice, nextNodeId: 'shore' })) }
          : node,
      ),
    };
    expect(narrativeGraphIssues(cycle).some((issue) => issue.code === 'STORY_CYCLE')).toBe(true);
  });

  it('provides a complete example with two fatal dead ends and longer survival routes', () => {
    const graph = { ...config, nodes: sample.nodes! };
    expect(narrativeGraphIssues(graph)).toEqual([]);
    expect(graph.nodes).toHaveLength(11);
    expect(graph.nodes.filter((node) => node.endingOutcome === 'death')).toHaveLength(2);
    expect(validNarrativePath(graph, ['shore', 'lagoon', 'ending-return'])).toBe(true);
    expect(validNarrativePath(graph, ['shore', 'ridge', 'signal', 'eye', 'ending-rescue'])).toBe(
      true,
    );
    for (const node of graph.nodes) {
      expect(sample.scenes[node.id].text.split(/\s+/).length).toBeGreaterThan(70);
      if (node.endingOutcome === 'death') expect(sample.scenes[node.id].text).toMatch(/drowned/);
      for (const choice of node.choices)
        expect(sample.scenes[node.id].choiceLabels[choice.id].length).toBeGreaterThan(10);
    }
  });
});
