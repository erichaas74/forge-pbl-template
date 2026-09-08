import type { TemplateLauncher } from '../project-launch.contracts';
import { requireCrisisConfig } from '../../../templates/crisis-operations/domain/crisis-validation';
import {
  CRISIS_CONFIG,
  CRISIS_SESSION,
  CRISIS_PERSISTENCE,
  CrisisRuntimeService,
} from '../../../templates/crisis-operations/runtime/crisis-runtime.service';
import { BrowserCrisisPersistence } from '../../../templates/crisis-operations/runtime/crisis.persistence';

export const crisisOperationsLauncher: TemplateLauncher = {
  templateId: 'crisis-operations',
  async load(request) {
    if (request.session.authorityMode !== 'localDemo') {
      throw new Error(
        'CAPABILITY_NOT_INSTALLED: Shared crisis sessions require a classroom authority and synchronization adapter. This operations room supports local exercises.',
      );
    }
    const config = requireCrisisConfig(request.projectDefinition);
    if (
      config.projectId !== request.project.id ||
      config.projectVersion !== request.project.projectVersion
    )
      throw new Error(
        'PROJECT_ID_MISMATCH: Crisis package does not match the selected project version.',
      );
    const { CrisisCenterComponent } =
      await import('../../../templates/crisis-operations/ui/crisis-center.component');
    return {
      component: CrisisCenterComponent,
      integratedHeader: true,
      providers: [
        { provide: CRISIS_CONFIG, useValue: config },
        { provide: CRISIS_SESSION, useValue: request.session },
        {
          provide: CRISIS_PERSISTENCE,
          useFactory: () => new BrowserCrisisPersistence(config, request.session),
        },
        CrisisRuntimeService,
      ],
    };
  },
};
