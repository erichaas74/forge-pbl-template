import type { TemplateLauncher } from '../project-launch.contracts';
import { requireCompetitionConfig } from '../../../templates/competition-show/domain/competition.validation';
import { COMPETITION_CONFIG, CompetitionRuntimeService } from '../../../templates/competition-show/runtime/competition-runtime.service';
import { BrowserCompetitionPersistence, COMPETITION_PERSISTENCE } from '../../../templates/competition-show/runtime/competition.persistence';
import { FINAL_SHOWCASE, requireFinalShowcase } from '../../../templates/competition-show/showcase/final-showcase.models';

export const competitionShowLauncher: TemplateLauncher = {
  templateId: 'competition-show',
  async load(request) {
    if (request.session.authorityMode !== 'localDemo')
      throw new Error('CAPABILITY_NOT_INSTALLED: Shared championships require an authoritative competition adapter. Open local rehearsal instead.');
    const config = requireCompetitionConfig(request.projectDefinition);
    // Art is independently replaceable without invalidating an existing rehearsal.
    const { broadcast: _broadcast, ...gameplayConfig } = config;
    if (config.projectId !== request.project.id || config.projectVersion !== request.project.projectVersion)
      throw new Error('PROJECT_ID_MISMATCH: Championship package does not match this project.');
    if (request.view === 'final-demo') {
      const response = await fetch(`/${request.project.packageReference}/final-demo.json`);
      if (!response.ok) throw new Error('CAPABILITY_NOT_INSTALLED: The fictional final package is unavailable.');
      const demo = requireFinalShowcase(await response.json(), config);
      const { FinalShowcaseComponent } = await import('../../../templates/competition-show/showcase/final-showcase.component');
      return { component: FinalShowcaseComponent, integratedHeader: true, providers: [
        { provide: COMPETITION_CONFIG, useValue: config }, { provide: FINAL_SHOWCASE, useValue: demo },
      ] };
    }
    const { CompetitionShowComponent } = await import('../../../templates/competition-show/ui/competition-show.component');
    return { component: CompetitionShowComponent, integratedHeader: true, providers: [
      { provide: COMPETITION_CONFIG, useValue: config },
      { provide: COMPETITION_PERSISTENCE, useFactory: () => new BrowserCompetitionPersistence(request.session, JSON.stringify(gameplayConfig)) },
      CompetitionRuntimeService,
    ] };
  },
};
