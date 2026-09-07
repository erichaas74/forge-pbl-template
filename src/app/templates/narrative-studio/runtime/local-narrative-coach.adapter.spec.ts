import { survivalIslandStoryLabConfig } from '../../../projects/survival-island-story-lab/survival-island.config';
import { createInitialNarrativeState } from '../core/narrative-studio-state';
import { LocalNarrativeCoachAdapter } from './local-narrative-coach.adapter';

describe('LocalNarrativeCoachAdapter', () => {
  it('asks the student to invent pressure without supplying a plot event', async () => {
    const config = survivalIslandStoryLabConfig;
    const state = createInitialNarrativeState(config);
    const node = config.nodes[0];
    const before = structuredClone(state.scenes[node.id]);
    const response = await new LocalNarrativeCoachAdapter().respond({
      tool: 'storm',
      stage: 'write',
      node,
      scene: state.scenes[node.id],
      bible: { ...state.bible, protagonist: 'Mara', importantObject: 'a radio' },
      storm: config.stormStages[0],
      priorTurns: [],
    });

    expect(response.proposedStormIdea).toBeUndefined();
    expect(state.scenes[node.id]).toEqual(before);
    expect(response.text).toContain('What new problem should interrupt this scene');
    expect(response.text).toContain('Change it freely');
  });

  it('uses the selected historical pressure while keeping the student in control', async () => {
    const config = survivalIslandStoryLabConfig;
    const state = createInitialNarrativeState(config);
    const node = config.nodes[0];
    const historicalSetting = config.historicalSettings[2];
    const response = await new LocalNarrativeCoachAdapter().respond({
      tool: 'continuity',
      stage: 'write',
      node,
      scene: { ...state.scenes[node.id], text: 'A drafted opening with enough detail to review.' },
      bible: { ...state.bible, protagonist: 'Mara', importantObject: 'a notebook' },
      historicalSetting,
      storm: config.stormStages[0],
      priorTurns: [],
    });

    expect(response.text).toContain('All 28 real Endurance crew members survived');
    expect(response.text).toContain('clearly show what Mara knows');
  });

  it('asks one planning question at a time after saving the student’s words', async () => {
    const config = survivalIslandStoryLabConfig;
    const state = createInitialNarrativeState(config);
    const node = config.nodes[0];
    const response = await new LocalNarrativeCoachAdapter().respond({
      tool: 'reply',
      stage: 'conversation',
      message: 'Leah is a careful map reader who needs to trust her own observations.',
      node,
      scene: state.scenes[node.id],
      bible: state.bible,
      historicalSetting: config.historicalSettings[0],
      storm: config.stormStages[0],
      priorTurns: [],
      nextPlanningQuestion: config.planningQuestions[1],
    });

    expect(response.text).toContain('I saved your idea');
    expect(response.text).toContain(config.planningQuestions[1].prompt);
  });
});
