import {
  narrativeSampleGuide,
  survivalIslandSampleStory,
} from '../../projects/completed-samples/narrative.sample-data';
import { survivalIslandStoryLabConfig } from '../../projects/survival-island-story-lab/survival-island.config';
import { NarrativeShowcasePlayerComponent } from '../../templates/narrative-studio/ui/narrative-showcase-player.component';
import type { CompletedSample } from './completed-sample';

export function loadSample(): CompletedSample {
  return {
    ...narrativeSampleGuide,
    component: NarrativeShowcasePlayerComponent,
    inputs: {
      config: survivalIslandStoryLabConfig,
      publication: survivalIslandSampleStory,
    },
    providers: [],
  };
}
