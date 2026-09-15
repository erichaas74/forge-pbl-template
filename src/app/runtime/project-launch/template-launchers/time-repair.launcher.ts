import type { TemplateLauncher } from '../project-launch.contracts';
import { isInventionProject, requireTimeRepairPackage } from '../../../templates/time-repair/domain/time-repair.package';
import { INVENTION_PROJECT, INVENTION_CONTEXT, INVENTION_EXAMPLE } from '../../../templates/time-repair/invention/invention.runtime';
import {
  TIME_REPAIR_CONFIG,
  TIME_REPAIR_PERSISTENCE,
  TIME_REPAIR_SESSION,
  TimeRepairRuntime,
} from '../../../templates/time-repair/runtime/time-repair.runtime';
import { BrowserTimeRepairPersistence } from '../../../templates/time-repair/runtime/time-repair.persistence';
import { TIME_REPAIR_FINAL_EXAMPLE } from '../../../templates/time-repair/runtime/time-repair-preview.runtime';

export const timeRepairLauncher: TemplateLauncher = {
  templateId: 'time-repair',
  async load(request) {
    if (request.session.authorityMode !== 'localDemo')
      throw new Error(
        'CAPABILITY_NOT_INSTALLED: Shared Time Repair sessions require a classroom authority and synchronization adapter. This pilot supports local exercises.',
      );
    const config = requireTimeRepairPackage(request.projectDefinition);
    if (
      config.projectId !== request.project.id ||
      config.projectVersion !== request.project.projectVersion ||
      config.projectId !== request.session.projectId ||
      config.projectVersion !== request.session.projectVersion
    )
      throw new Error(
        'PROJECT_ID_MISMATCH: Time Repair package and session must match the selected project version.',
      );
    if (isInventionProject(config)) {
      const { InventionWorkspaceComponent } = await import('../../../templates/time-repair/invention/invention-workspace.component');
      return {
        component: InventionWorkspaceComponent, integratedHeader: true,
        providers: [
          { provide: INVENTION_PROJECT, useValue: config },
          { provide: INVENTION_CONTEXT, useValue: request.session },
          { provide: INVENTION_EXAMPLE, useValue: request.view === 'final-demo' },
        ],
      };
    }
    const { TimeRepairPageComponent } =
      await import('../../../templates/time-repair/ui/time-repair-page.component');
    return {
      component: TimeRepairPageComponent,
      integratedHeader: true,
      providers: [
        { provide: TIME_REPAIR_FINAL_EXAMPLE, useValue: request.view === 'final-demo' },
        { provide: TIME_REPAIR_CONFIG, useValue: config },
        { provide: TIME_REPAIR_SESSION, useValue: request.session },
        {
          provide: TIME_REPAIR_PERSISTENCE,
          useFactory: () => new BrowserTimeRepairPersistence(config, request.session),
        },
        TimeRepairRuntime,
      ],
    };
  },
};
