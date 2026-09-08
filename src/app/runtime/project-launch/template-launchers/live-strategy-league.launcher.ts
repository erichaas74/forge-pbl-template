import type { TemplateLauncher } from '../project-launch.contracts';
import { requireLeagueConfig } from '../../../templates/live-strategy-league/domain/league-engine';
import { LEAGUE_CONFIG, LeagueRuntimeService } from '../../../templates/live-strategy-league/runtime/league-runtime.service';
import { BrowserLeaguePersistence, LEAGUE_PERSISTENCE } from '../../../templates/live-strategy-league/runtime/league.persistence';

export const liveStrategyLeagueLauncher: TemplateLauncher = {
  templateId: 'live-strategy-league',
  async load(request) {
    if (request.session.authorityMode !== 'localDemo')
      throw new Error('CAPABILITY_NOT_INSTALLED: Live Strategy League currently supports local practice. Shared competitions require an authoritative backend adapter.');
    const config = requireLeagueConfig(request.projectDefinition);
    if (config.projectId !== request.project.id || config.projectVersion !== request.project.projectVersion)
      throw new Error('PROJECT_ID_MISMATCH: League package does not match this project.');
    if (!request.view || request.view === 'launch') {
      const { LeagueLaunchComponent } = await import('../../../templates/live-strategy-league/ui/league-launch.component');
      return { component: LeagueLaunchComponent, integratedHeader: true,
        providers: [{ provide: LEAGUE_CONFIG, useValue: config }] };
    }
    if (request.view === 'final-demo') {
      const { requireLeagueDemo } = await import('../../../templates/live-strategy-league/domain/league-demo');
      requireLeagueDemo(config.finalDemo, config);
      const { LeagueFinalDemoComponent } = await import('../../../templates/live-strategy-league/ui/league-final-demo.component');
      return { component: LeagueFinalDemoComponent, integratedHeader: true,
        providers: [{ provide: LEAGUE_CONFIG, useValue: config }] };
    }
    const { LeagueShellComponent } = await import('../../../templates/live-strategy-league/ui/league-shell.component');
    return { component: LeagueShellComponent, integratedHeader: true, providers: [
      { provide: LEAGUE_CONFIG, useValue: config },
      { provide: LEAGUE_PERSISTENCE, useFactory: () => new BrowserLeaguePersistence(request.session) },
      LeagueRuntimeService,
    ] };
  },
};
