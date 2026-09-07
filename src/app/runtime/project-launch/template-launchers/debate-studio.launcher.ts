import type { DebateStudioProjectConfig } from '../../../templates/debate-studio/domain/debate-studio.models';
import {
  BrowserDebateWorkspacePersistenceAdapter,
  DEBATE_STUDIO_MEDIA,
  DEBATE_STUDIO_PERSISTENCE,
  DEBATE_STUDIO_SESSION,
  MemoryDebateMediaAdapter,
  MemoryDebateSessionAdapter,
} from '../../../templates/debate-studio/persistence/debate-studio.persistence';
import { DebateStudioRuntimeService } from '../../../templates/debate-studio/runtime/debate-studio-runtime.service';
import {
  DEBATE_STUDIO_CONFIG,
  DEBATE_STUDIO_TENANT_ID,
} from '../../../templates/debate-studio/runtime/debate-studio.tokens';
import type { ProjectLaunchRequest, TemplateLauncher } from '../project-launch.contracts';

export const debateStudioLauncher: TemplateLauncher = {
  templateId: 'debate-studio',
  async load(request: ProjectLaunchRequest) {
    if (request.session.authorityMode !== 'localDemo') {
      throw new Error('A server-authoritative Debate Studio gateway must be configured.');
    }
    const definition = requireDebateConfig(request.projectDefinition, request.project.id);
    const config: DebateStudioProjectConfig = {
      ...definition,
      sessionId: request.session.attemptId ?? definition.sessionId,
      viewer: {
        ...definition.viewer,
        studentId: request.session.studentId ?? request.session.actorId,
        studentDisplayName: request.session.actorDisplayName,
        classId: request.session.classId ?? definition.viewer.classId,
        mode: request.session.mode,
      },
    };
    const module = await import('../../../templates/debate-studio/ui/debate-studio-page.component');
    return {
      component: module.DebateStudioPageComponent,
      providers: [
        { provide: DEBATE_STUDIO_CONFIG, useValue: config },
        { provide: DEBATE_STUDIO_TENANT_ID, useValue: request.session.tenantId },
        {
          provide: DEBATE_STUDIO_PERSISTENCE,
          useFactory: () =>
            new BrowserDebateWorkspacePersistenceAdapter(undefined, request.session),
        },
        {
          provide: DEBATE_STUDIO_SESSION,
          useFactory: () => new MemoryDebateSessionAdapter(),
        },
        {
          provide: DEBATE_STUDIO_MEDIA,
          useFactory: () => new MemoryDebateMediaAdapter(),
        },
        DebateStudioRuntimeService,
      ],
    };
  },
};

function requireDebateConfig(value: unknown, projectId: string): DebateStudioProjectConfig {
  if (!isRecord(value) || value['projectId'] !== projectId || !Array.isArray(value['rounds'])) {
    throw new Error(`Project "${projectId}" is not a valid debate-studio definition.`);
  }
  return value as unknown as DebateStudioProjectConfig;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
