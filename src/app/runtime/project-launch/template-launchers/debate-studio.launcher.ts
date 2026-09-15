import type { DebateStudioProjectConfig } from '../../../templates/debate-studio/domain/debate-studio.models';
import { validateDebateInquiry } from '../../../templates/debate-studio/domain/debate-inquiry.models';
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
import { validateExchangeConfig } from '../../../templates/debate-studio/exchange/debate-exchange.models';
import { BrowserDebateExchangeAdapter, DEBATE_EXCHANGE_PORT } from '../../../templates/debate-studio/exchange/debate-exchange.persistence';
import { DEBATE_EXCHANGE_EXAMPLE, DebateExchangeRuntime } from '../../../templates/debate-studio/exchange/debate-exchange-runtime.service';

export const debateStudioLauncher: TemplateLauncher = {
  templateId: 'debate-studio',
  async load(request: ProjectLaunchRequest) {
    if (request.session.authorityMode !== 'localDemo') {
      throw new Error('A server-authoritative Debate Studio gateway must be configured.');
    }
    const definition = requireDebateConfig(request.projectDefinition, request.project.id);
    if (definition.inquiry) validateDebateInquiry(definition.inquiry, definition.evidence.map(e => e.id));
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
    if (config.exchange) {
      validateExchangeConfig(config);
      const module = await import('../../../templates/debate-studio/exchange/debate-exchange.component');
      return {
        component: module.DebateExchangeComponent,
        providers: [
          { provide: DEBATE_STUDIO_CONFIG, useValue: config },
          { provide: DEBATE_EXCHANGE_EXAMPLE, useValue: request.view === 'final-demo' },
          { provide: DEBATE_EXCHANGE_PORT, useFactory: () => new BrowserDebateExchangeAdapter(config, {
            tenantId: request.session.tenantId, projectId: config.projectId, projectVersion: config.projectVersion,
            actorId: config.viewer.studentId, classId: config.viewer.classId, attemptId: request.session.attemptId,
          }) },
          DebateExchangeRuntime,
        ],
      };
    }
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
