import { ageOfExplorationJourneyConfig } from '../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import {
  createJourneySample,
  journeySampleEnrollment,
  journeySampleGuide,
} from '../../projects/completed-samples/journey.sample-data';
import { createDemoJourneyClassSummary } from '../../templates/journey-replay/demo/journey-demo-class-summary';
import { ClassJourneyMapComponent } from '../../templates/journey-replay/ui/class-journey-map.component';
import { JourneyReplayRuntimeService } from '../../templates/journey-replay/runtime/journey-replay-runtime.service';
import {
  JOURNEY_REPLAY_CONFIG,
  JOURNEY_REPLAY_DEMO_CLASS_SUMMARY,
  JOURNEY_REPLAY_ENROLLMENT,
  JOURNEY_REPLAY_PERSISTENCE,
  JOURNEY_REPLAY_AUTHORITY,
  JOURNEY_REPLAY_MEDIA,
  JOURNEY_TUTOR,
} from '../../templates/journey-replay/runtime/journey-replay.tokens';
import { samplePersistence, type CompletedSample } from './completed-sample';
export function loadSample(): CompletedSample {
  return {
    ...journeySampleGuide,
    component: ClassJourneyMapComponent,
    inputs: { initialMode: 'compare' },
    providers: [
      JourneyReplayRuntimeService,
      { provide: JOURNEY_REPLAY_CONFIG, useValue: ageOfExplorationJourneyConfig },
      {
        provide: JOURNEY_REPLAY_DEMO_CLASS_SUMMARY,
        useValue: createDemoJourneyClassSummary(ageOfExplorationJourneyConfig),
      },
      { provide: JOURNEY_REPLAY_ENROLLMENT, useValue: journeySampleEnrollment },
      { provide: JOURNEY_REPLAY_PERSISTENCE, useValue: samplePersistence(createJourneySample()) },
      { provide: JOURNEY_REPLAY_AUTHORITY, useValue: null },
      { provide: JOURNEY_REPLAY_MEDIA, useValue: null },
      { provide: JOURNEY_TUTOR, useValue: null },
    ],
  };
}
