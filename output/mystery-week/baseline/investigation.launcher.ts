import { MysteryInvestigationService } from '../../../projects/mystery-substance/mystery-investigation.service';
import { INVESTIGATION_RUNTIME_FACADE } from '../../../templates/investigation/runtime/investigation-runtime.tokens';
import { HostedInvestigationRuntimeFacade } from '../investigation-runtime.facade';
import type { TemplateLauncher } from '../project-launch.contracts';
import { WORKSPACE_DRAFTS } from '../../../shared/drafts/workspace-drafts';
import { BrowserWorkspaceDrafts } from '../../../infrastructure/persistence/browser-workspace-drafts';

export const investigationLauncher: TemplateLauncher = {
  templateId: 'investigation',
  async load(request) {
    if (request.project.id === 'mystery-substance') {
      const module = await import('../../../features/mystery-investigation');
      return {
        component: module.MysteryInvestigationComponent,
        providers: [MysteryInvestigationService, { provide: WORKSPACE_DRAFTS, useFactory: () => new BrowserWorkspaceDrafts(request.session) }],
      };
    }
    const module = await import(
      '../../../templates/investigation/ui/investigation-shell.component'
    );
    return {
      component: module.InvestigationShellComponent,
      providers: [
        HostedInvestigationRuntimeFacade,
        {
          provide: INVESTIGATION_RUNTIME_FACADE,
          useExisting: HostedInvestigationRuntimeFacade,
        },
      ],
    };
  },
};
