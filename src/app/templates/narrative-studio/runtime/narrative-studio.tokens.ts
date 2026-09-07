import { InjectionToken } from '@angular/core';

import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import type {
  NarrativeCoachAdapter,
  NarrativeStudioProjectConfig,
} from '../domain/narrative-studio.models';

export const NARRATIVE_STUDIO_CONFIG = new InjectionToken<NarrativeStudioProjectConfig>(
  'NARRATIVE_STUDIO_CONFIG',
);
export const NARRATIVE_STUDIO_SESSION = new InjectionToken<ProjectSessionContext>(
  'NARRATIVE_STUDIO_SESSION',
);
export const NARRATIVE_STUDIO_COACH = new InjectionToken<NarrativeCoachAdapter>(
  'NARRATIVE_STUDIO_COACH',
);
/** Optional handoff from a project opening; deep links may begin with no selection. */
export const NARRATIVE_STUDIO_INITIAL_HISTORY_SETTING_ID = new InjectionToken<string>(
  'NARRATIVE_STUDIO_INITIAL_HISTORY_SETTING_ID',
);
