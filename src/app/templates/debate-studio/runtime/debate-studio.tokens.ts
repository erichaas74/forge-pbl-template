import { InjectionToken } from '@angular/core';

import type { DebateStudioProjectConfig } from '../domain/debate-studio.models';

export const DEBATE_STUDIO_CONFIG = new InjectionToken<DebateStudioProjectConfig>(
  'DEBATE_STUDIO_CONFIG',
);
