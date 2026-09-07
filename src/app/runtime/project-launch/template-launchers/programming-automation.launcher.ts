import type { AutomationProjectConfig } from '../../../templates/programming-automation/domain/automation.models';
import { validateAutomationConfig } from '../../../templates/programming-automation/core/automation-state';
import {
  AUTOMATION_CONFIG,
  AUTOMATION_SESSION,
} from '../../../templates/programming-automation/runtime/automation.tokens';
import {
  AUTOMATION_PERSISTENCE,
  BrowserAutomationPersistence,
} from '../../../templates/programming-automation/persistence/automation.persistence';
import { AutomationRuntimeService } from '../../../templates/programming-automation/runtime/automation-runtime.service';
import type { TemplateLauncher } from '../project-launch.contracts';
export const programmingAutomationLauncher: TemplateLauncher = {
  templateId: 'programming-automation',
  async load(request) {
    if (request.session.authorityMode !== 'localDemo')
      throw new Error(
        'CAPABILITY_NOT_INSTALLED: Programming & Automation currently supports local classroom rehearsals. A classroom persistence and competition authority adapter is required for shared sessions.',
      );
    const config = request.projectDefinition as AutomationProjectConfig;
    validateAutomationConfig(config);
    if (config.projectId !== request.project.id)
      throw new Error('Project definition identity does not match this project.');
    const { AutomationLabComponent } =
      await import('../../../templates/programming-automation/ui/automation-lab.component');
    return {
      component: AutomationLabComponent,
      providers: [
        { provide: AUTOMATION_CONFIG, useValue: config },
        { provide: AUTOMATION_SESSION, useValue: request.session },
        {
          provide: AUTOMATION_PERSISTENCE,
          useFactory: () => new BrowserAutomationPersistence(request.session),
        },
        AutomationRuntimeService,
      ],
    };
  },
};
