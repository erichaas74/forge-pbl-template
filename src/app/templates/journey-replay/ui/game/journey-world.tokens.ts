import { InjectionToken } from '@angular/core';
import type { JourneyWorldMount } from './journey-world.contracts';
export const JOURNEY_WORLD_LOADER = new InjectionToken<() => Promise<JourneyWorldMount>>(
  'JOURNEY_WORLD_LOADER',
  {
    providedIn: 'root',
    factory: () => () =>
      import('./journey-location.world').then((module) => module.mountJourneyLocationWorld),
  },
);
