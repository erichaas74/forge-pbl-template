import { IndexedDbAssetStorageAdapter } from '../../../infrastructure/storage/indexeddb-asset-storage.adapter';
import {
  HttpJourneyReplayAuthorityAdapter,
  HttpJourneyReplayMediaAdapter,
} from '../../../infrastructure/journey-replay/http-journey-replay.adapters';
import type {
  JourneyEnrollment,
  JourneyProjectConfig,
} from '../../../templates/journey-replay/domain/journey-replay.models';
import { createDemoJourneyClassSummary } from '../../../templates/journey-replay/demo/journey-demo-class-summary';
import { BrowserJourneyReplayPersistenceAdapter } from '../../../templates/journey-replay/persistence/journey-replay.persistence';
import { journeyAuthorityLocator } from '../../../templates/journey-replay/persistence/journey-replay.authority';
import { JourneyReplayRuntimeService } from '../../../templates/journey-replay/runtime/journey-replay-runtime.service';
import {
  JOURNEY_REPLAY_AUTHORITY,
  JOURNEY_REPLAY_CONFIG,
  JOURNEY_REPLAY_DEMO_CLASS_SUMMARY,
  JOURNEY_REPLAY_ENROLLMENT,
  JOURNEY_REPLAY_MEDIA,
  JOURNEY_REPLAY_PERSISTENCE,
} from '../../../templates/journey-replay/runtime/journey-replay.tokens';
import type { TemplateLauncher } from '../project-launch.contracts';

export const journeyReplayLauncher: TemplateLauncher = {
  templateId: 'journey-replay',
  async load(request) {
    const value = request.projectDefinition;
    if (
      !value ||
      typeof value !== 'object' ||
      !('projectId' in value) ||
      value.projectId !== request.project.id ||
      !('steps' in value) ||
      !Array.isArray(value.steps)
    )
      throw new Error('This journey definition is invalid.');
    const config = value as JourneyProjectConfig;
    if (!request.session.classId) throw new Error('A journey session requires a class.');
    const enrollment: JourneyEnrollment = {
      tenantId: request.session.tenantId,
      classId: request.session.classId,
      studentId: request.session.studentId ?? request.session.actorId,
      studentDisplayName: request.session.actorDisplayName,
      classLabel:
        request.session.mode === 'preview' ? 'Local demonstration' : request.session.classId,
      mode: request.session.mode === 'preview' ? 'demo' : request.session.mode,
    };
    const module = await import('../../../templates/journey-replay/ui/journey-shell.component');
    return {
      component: module.JourneyReplayPageComponent,
      providers: [
        { provide: JOURNEY_REPLAY_CONFIG, useValue: config },
        { provide: JOURNEY_REPLAY_ENROLLMENT, useValue: enrollment },
        ...(request.session.mode === 'preview'
          ? [
              {
                provide: JOURNEY_REPLAY_DEMO_CLASS_SUMMARY,
                useValue: createDemoJourneyClassSummary(config),
              },
            ]
          : []),
        {
          provide: JOURNEY_REPLAY_PERSISTENCE,
          useFactory: () =>
            new BrowserJourneyReplayPersistenceAdapter(undefined, {
              tenantId: enrollment.tenantId,
              classId: enrollment.classId,
            }),
        },
        {
          provide: JOURNEY_REPLAY_AUTHORITY,
          useFactory: () => new HttpJourneyReplayAuthorityAdapter(),
        },
        {
          provide: JOURNEY_REPLAY_MEDIA,
          useFactory: () =>
            new HttpJourneyReplayMediaAdapter(
              journeyAuthorityLocator(enrollment, config.projectId, config.projectVersion),
              new IndexedDbAssetStorageAdapter(
                JSON.stringify([
                  enrollment.tenantId,
                  enrollment.classId,
                  enrollment.studentId,
                  config.projectId,
                  config.projectVersion,
                ]),
              ),
            ),
        },
        JourneyReplayRuntimeService,
      ],
    };
  },
};
