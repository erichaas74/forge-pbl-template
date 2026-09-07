import { TestBed } from '@angular/core/testing';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { survivalIslandStoryLabConfig as config } from '../../../projects/survival-island-story-lab/survival-island.config';
import {
  MemoryNarrativeStudioPersistenceAdapter,
  NARRATIVE_STUDIO_PERSISTENCE,
} from '../persistence/narrative-studio.persistence';
import { LocalNarrativeCoachAdapter } from './local-narrative-coach.adapter';
import {
  NARRATIVE_STUDIO_COACH,
  NARRATIVE_STUDIO_CONFIG,
  NARRATIVE_STUDIO_SESSION,
} from './narrative-studio.tokens';
import { NarrativeStudioRuntimeService } from './narrative-studio-runtime.service';

describe('Narrative authoring persistence and publication', () => {
  it('saves the student graph and freezes it with the playable publication', () => {
    const persistence = new MemoryNarrativeStudioPersistenceAdapter();
    TestBed.configureTestingModule({
      providers: [
        NarrativeStudioRuntimeService,
        { provide: NARRATIVE_STUDIO_CONFIG, useValue: config },
        {
          provide: NARRATIVE_STUDIO_SESSION,
          useValue: createLocalPreviewSession(config.projectId, config.projectVersion),
        },
        { provide: NARRATIVE_STUDIO_COACH, useValue: new LocalNarrativeCoachAdapter() },
        { provide: NARRATIVE_STUDIO_PERSISTENCE, useValue: persistence },
      ],
    });
    const runtime = TestBed.inject(NarrativeStudioRuntimeService);
    runtime.selectHistoricalSetting('selkirk-1709');
    runtime.updateStoryTitle('Two ways through the storm');
    runtime.updateChoice('shore-high', 'Climb the ridge');
    runtime.updateChoice('shore-water', 'Stay by the boat');
    for (const node of [...runtime.storyConfig().nodes]) {
      runtime.selectNode(node.id);
      runtime.updateSceneText(
        'The storm was growing stronger. I reached for the rope as the waves rolled over the sand and called to my friend for help.',
      );
      if (node.id !== 'shore') runtime.changeBranch(node.id === 'ridge' ? 'end' : 'finish');
    }
    runtime.recordPlaytest(['shore', 'ridge']);
    runtime.recordPlaytest(['shore', 'lagoon']);
    expect(runtime.publish()).toBe(true);
    const publication = structuredClone(runtime.state().published!);
    runtime.selectNode('lagoon');
    runtime.changeBranch('branch');
    expect(runtime.storyConfig().nodes).toHaveLength(5);
    expect(runtime.state().playtests).toHaveLength(0);
    expect(runtime.state().published).toEqual(publication);
    expect(publication.nodes).toHaveLength(3);
    runtime.flushSave();
    expect(persistence.load(config.projectId, config.projectVersion)?.nodes).toHaveLength(5);
    runtime.destroy();
    TestBed.resetTestingModule();
  });
});
