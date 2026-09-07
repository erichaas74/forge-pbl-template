import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import { BrowserProjectIntroAdapter } from '../../../infrastructure/persistence/browser-project-intro.adapter';
import type { NarrativeStudioProjectConfig } from '../../../templates/narrative-studio/domain/narrative-studio.models';
import {
  BrowserNarrativeStudioPersistenceAdapter,
  NARRATIVE_STUDIO_PERSISTENCE,
} from '../../../templates/narrative-studio/persistence/narrative-studio.persistence';
import { LocalNarrativeCoachAdapter } from '../../../templates/narrative-studio/runtime/local-narrative-coach.adapter';
import { NarrativeStudioRuntimeService } from '../../../templates/narrative-studio/runtime/narrative-studio-runtime.service';
import {
  NARRATIVE_STUDIO_COACH,
  NARRATIVE_STUDIO_CONFIG,
  NARRATIVE_STUDIO_INITIAL_HISTORY_SETTING_ID,
  NARRATIVE_STUDIO_SESSION,
} from '../../../templates/narrative-studio/runtime/narrative-studio.tokens';
import type { ProjectLaunchRequest, TemplateLauncher } from '../project-launch.contracts';

export const narrativeStudioLauncher: TemplateLauncher = {
  templateId: 'narrative-studio',
  async load(request: ProjectLaunchRequest) {
    const config = requireNarrativeConfig(request.projectDefinition, request.project.id);
    const initialHistorySettingId = await loadOpeningHistoryChoice(request);
    const module =
      await import('../../../templates/narrative-studio/ui/narrative-studio-page.component');
    return {
      component: module.NarrativeStudioPageComponent,
      providers: [
        { provide: NARRATIVE_STUDIO_CONFIG, useValue: config },
        { provide: NARRATIVE_STUDIO_SESSION, useValue: request.session },
        {
          provide: NARRATIVE_STUDIO_INITIAL_HISTORY_SETTING_ID,
          useValue: initialHistorySettingId,
        },
        { provide: NARRATIVE_STUDIO_COACH, useClass: LocalNarrativeCoachAdapter },
        {
          provide: NARRATIVE_STUDIO_PERSISTENCE,
          useFactory: (session: ProjectSessionContext) =>
            new BrowserNarrativeStudioPersistenceAdapter(undefined, session),
          deps: [NARRATIVE_STUDIO_SESSION],
        },
        NarrativeStudioRuntimeService,
      ],
    };
  },
};

async function loadOpeningHistoryChoice(request: ProjectLaunchRequest): Promise<string> {
  try {
    const snapshot = await new BrowserProjectIntroAdapter().load({
      session: request.session,
      introVersion: request.project.projectVersion,
    });
    return snapshot?.draft.teaser?.choiceId ?? '';
  } catch {
    // A deep link or unavailable browser storage should never block the writing studio.
    return '';
  }
}

function requireNarrativeConfig(value: unknown, projectId: string): NarrativeStudioProjectConfig {
  if (
    !value ||
    typeof value !== 'object' ||
    !('projectId' in value) ||
    value.projectId !== projectId ||
    !('nodes' in value) ||
    !Array.isArray(value.nodes)
  ) {
    throw new Error(`Project "${projectId}" is not a valid narrative-studio definition.`);
  }
  return value as NarrativeStudioProjectConfig;
}
