import { DebateExampleWalkthroughComponent } from '../../templates/debate-studio/ui/debate-example-walkthrough.component';
import { DebateStudioRuntimeService } from '../../templates/debate-studio/runtime/debate-studio-runtime.service';
import {
  DEBATE_STUDIO_CONFIG,
  DEBATE_STUDIO_TENANT_ID,
} from '../../templates/debate-studio/runtime/debate-studio.tokens';
import {
  DEBATE_STUDIO_SESSION,
  DEBATE_STUDIO_MEDIA,
  DEBATE_STUDIO_PERSISTENCE,
  type DebateSessionAdapter,
  type DebateMediaAdapter,
} from '../../templates/debate-studio/persistence/debate-studio.persistence';
import {
  createDebateSample,
  createDebateSampleWorkspace,
  debateSampleConfig,
  debateSampleGuide,
} from '../../projects/completed-samples/debate.sample-data';
import { samplePersistence, type CompletedSample } from './completed-sample';
export function loadSample(): CompletedSample {
  const session = createDebateSample();
  const adapter: DebateSessionAdapter = {
    initialize: async () => ({ actorId: 'sample-viewer', session: structuredClone(session) }),
    subscribe: (_locator, listener) => {
      listener(structuredClone(session));
      return () => {};
    },
    mutate: async () => {
      throw new Error('COMPLETED_SAMPLE_READ_ONLY');
    },
  };
  const media: DebateMediaAdapter = {
    uploadRecording: async () => {
      throw new Error('COMPLETED_SAMPLE_READ_ONLY');
    },
  };
  return {
    ...debateSampleGuide,
    component: DebateExampleWalkthroughComponent,
    inputs: { readOnly: true },
    providers: [
      {
        provide: DebateStudioRuntimeService,
        useFactory: () => {
          const runtime = new DebateStudioRuntimeService();
          runtime.session.set(structuredClone(session));
          runtime.state.set(createDebateSampleWorkspace());
          runtime.segmentSecondsRemaining.set(runtime.segmentDuration(runtime.activeSegment()));
          return runtime;
        },
      },
      { provide: DEBATE_STUDIO_CONFIG, useValue: debateSampleConfig },
      { provide: DEBATE_STUDIO_TENANT_ID, useValue: 'completed-sample' },
      { provide: DEBATE_STUDIO_SESSION, useValue: adapter },
      { provide: DEBATE_STUDIO_MEDIA, useValue: media },
      {
        provide: DEBATE_STUDIO_PERSISTENCE,
        useValue: samplePersistence(createDebateSampleWorkspace()),
      },
    ],
  };
}
