import { InjectionToken } from '@angular/core';

import type { AssetStorageAdapter } from '../../../core/state/persistence-contracts';
import type { JourneyEnrollment, JourneyProjectConfig } from '../domain/journey-replay.models';
import type { JourneyReplayPersistenceAdapter } from '../persistence/journey-replay.persistence';
import type { JourneyReplayAuthorityAdapter } from '../persistence/journey-replay.authority';

export const JOURNEY_REPLAY_CONFIG = new InjectionToken<JourneyProjectConfig>(
  'JOURNEY_REPLAY_CONFIG',
);
export const JOURNEY_REPLAY_ENROLLMENT = new InjectionToken<JourneyEnrollment>(
  'JOURNEY_REPLAY_ENROLLMENT',
);
export const JOURNEY_REPLAY_PERSISTENCE = new InjectionToken<JourneyReplayPersistenceAdapter>(
  'JOURNEY_REPLAY_PERSISTENCE',
);
export const JOURNEY_REPLAY_MEDIA = new InjectionToken<AssetStorageAdapter>(
  'JOURNEY_REPLAY_MEDIA',
);
export const JOURNEY_REPLAY_AUTHORITY = new InjectionToken<JourneyReplayAuthorityAdapter>(
  'JOURNEY_REPLAY_AUTHORITY',
);
