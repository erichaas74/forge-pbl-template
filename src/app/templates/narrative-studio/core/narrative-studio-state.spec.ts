import { survivalIslandStoryLabConfig } from '../../../projects/survival-island-story-lab/survival-island.config';
import type { NarrativeStudioState } from '../domain/narrative-studio.models';
import {
  createInitialNarrativeState,
  narrativeReadiness,
  totalWordCount,
  validateNarrativeConfig,
} from './narrative-studio-state';

describe('Narrative Studio state', () => {
  it('starts with one opening, two blank choices and two unwritten branches', () => {
    const state = createInitialNarrativeState(survivalIslandStoryLabConfig, '2026-09-05T00:00:00Z');

    expect(state.selectedNodeId).toBe(survivalIslandStoryLabConfig.startNodeId);
    expect(state.stage).toBe('map');
    expect(Object.keys(state.scenes)).toHaveLength(3);
    expect(state.nodes?.[0].choices).toHaveLength(2);
    expect(
      state.nodes?.slice(1).every((node) => node.kind === 'scene' && !node.choices.length),
    ).toBe(true);
    expect(Object.values(state.scenes['shore'].choiceLabels)).toEqual(['', '']);
    expect(state.updatedAt).toBe('2026-09-05T00:00:00Z');
    expect(state.historicalSettingId).toBe('');
    expect(totalWordCount(state)).toBe(0);
  });

  it('can begin with the historical choice handed off by the project opening', () => {
    const state = createInitialNarrativeState(
      survivalIslandStoryLabConfig,
      '2026-09-05T00:00:00Z',
      'elephant-island-1916',
    );

    expect(state.historicalSettingId).toBe('elephant-island-1916');
  });

  it('rejects a story graph with an unknown choice destination', () => {
    const first = survivalIslandStoryLabConfig.nodes[0];
    const invalid = {
      ...survivalIslandStoryLabConfig,
      nodes: [
        {
          ...first,
          choices: [{ ...first.choices[0], nextNodeId: 'missing-scene' }, first.choices[1]],
        },
        ...survivalIslandStoryLabConfig.nodes.slice(1),
      ],
    };

    expect(() => validateNarrativeConfig(invalid)).toThrow(/unknown destination/i);
  });

  it('requires one decision question with exactly two options at every scene', () => {
    const first = survivalIslandStoryLabConfig.nodes[0];
    const invalid = {
      ...survivalIslandStoryLabConfig,
      nodes: [
        { ...first, choices: [first.choices[0]] },
        ...survivalIslandStoryLabConfig.nodes.slice(1),
      ],
    };

    expect(() => validateNarrativeConfig(invalid)).toThrow(/exactly two options/i);
  });

  it('requires authored scenes, distinct choices, and two tested endings before publication', () => {
    const empty = createInitialNarrativeState(survivalIslandStoryLabConfig);
    expect(narrativeReadiness(survivalIslandStoryLabConfig, empty).length).toBeGreaterThan(5);

    const scenes = Object.fromEntries(
      survivalIslandStoryLabConfig.nodes.map((node) => [
        node.id,
        {
          ...empty.scenes[node.id],
          text: 'The storm changes the trail while the protagonist notices a clue, makes a difficult decision, and accepts the cost of moving forward.',
          choiceLabels: Object.fromEntries(
            node.choices.map((choice, index) => [choice.id, `Choose distinct trail ${index + 1}`]),
          ),
        },
      ]),
    );
    const ready: NarrativeStudioState = {
      ...empty,
      nodes: undefined, // Legacy drafts keep their configured nine-scene graph.
      storyTitle: 'The Island Between Storms',
      historicalSettingId: 'selkirk-1709',
      bible: {
        protagonist: 'Mara, an observant but guarded twelve-year-old',
        immediateGoal: 'Find her brother before the storm arrives',
        innerFear: 'She believes asking for help makes her weak',
        islandSecret: 'The island is an abandoned weather station',
        companion: 'Ivo, whose map leaves out one dangerous place',
        importantObject: 'A salt-damaged field radio',
        pointOfView: 'third',
        tone: 'suspense',
      },
      scenes,
      playtests: [
        {
          id: 'playtest-one',
          timestamp: '2026-09-05T01:00:00Z',
          path: ['shore', 'ridge', 'cave', 'eye', 'ending-rescue'],
          endingNodeId: 'ending-rescue',
        },
        {
          id: 'playtest-two',
          timestamp: '2026-09-05T02:00:00Z',
          path: ['shore', 'lagoon', 'signal', 'eye', 'ending-truth'],
          endingNodeId: 'ending-truth',
        },
      ],
    };

    expect(narrativeReadiness(survivalIslandStoryLabConfig, ready)).toEqual([]);
  });

  it('keeps guided planning and Story Notes optional', () => {
    const empty = createInitialNarrativeState(survivalIslandStoryLabConfig);
    const scenes = Object.fromEntries(
      survivalIslandStoryLabConfig.nodes.map((node) => [
        node.id,
        {
          ...empty.scenes[node.id],
          text: 'The storm changes the trail while the protagonist notices a clue, makes a difficult decision, and accepts the cost of moving forward.',
          choiceLabels: Object.fromEntries(
            node.choices.map((choice, index) => [choice.id, `Choose distinct trail ${index + 1}`]),
          ),
        },
      ]),
    );
    const readyWithoutPlanning: NarrativeStudioState = {
      ...empty,
      nodes: undefined, // Legacy drafts keep their configured nine-scene graph.
      storyTitle: 'The Island Between Storms',
      historicalSettingId: 'selkirk-1709',
      scenes,
      playtests: [
        {
          id: 'playtest-one',
          timestamp: '2026-09-05T01:00:00Z',
          path: ['shore', 'ridge', 'cave', 'eye', 'ending-rescue'],
          endingNodeId: 'ending-rescue',
        },
        {
          id: 'playtest-two',
          timestamp: '2026-09-05T02:00:00Z',
          path: ['shore', 'lagoon', 'signal', 'eye', 'ending-truth'],
          endingNodeId: 'ending-truth',
        },
      ],
    };

    expect(Object.values(readyWithoutPlanning.bible).some((value) => !value)).toBe(true);
    expect(narrativeReadiness(survivalIslandStoryLabConfig, readyWithoutPlanning)).toEqual([]);
  });
});
