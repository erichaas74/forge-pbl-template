import { historyLiveRevolutionaryWarConfig } from '../../projects/history-live-revolutionary-war/history-live-revolutionary-war.config';
import {
  createBroadcastSample,
  broadcastSampleEnrollment,
  broadcastSampleGuide,
} from '../../projects/completed-samples/broadcast.sample-data';
import { BroadcastPlayerComponent } from '../../templates/history-live/ui/broadcast-player.component';
import { HistoryLiveRuntimeService } from '../../templates/history-live/runtime/history-live-runtime.service';
import {
  HISTORY_LIVE_CONFIG,
  HISTORY_LIVE_ENROLLMENT,
  HISTORY_LIVE_AUTHORITY,
  HISTORY_LIVE_MEDIA,
} from '../../templates/history-live/runtime/history-live.tokens';
import { HISTORY_LIVE_PERSISTENCE } from '../../templates/history-live/persistence/history-live.persistence';
import { samplePersistence, type CompletedSample } from './completed-sample';
export function loadSample(): CompletedSample {
  return {
    ...broadcastSampleGuide,
    component: BroadcastPlayerComponent,
    inputs: { readOnly: true },
    providers: [
      HistoryLiveRuntimeService,
      { provide: HISTORY_LIVE_CONFIG, useValue: historyLiveRevolutionaryWarConfig },
      { provide: HISTORY_LIVE_ENROLLMENT, useValue: broadcastSampleEnrollment },
      { provide: HISTORY_LIVE_PERSISTENCE, useValue: samplePersistence(createBroadcastSample()) },
      { provide: HISTORY_LIVE_AUTHORITY, useValue: null },
      { provide: HISTORY_LIVE_MEDIA, useValue: null },
    ],
  };
}
