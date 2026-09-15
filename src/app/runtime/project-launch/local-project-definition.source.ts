import type { ProjectCatalogEntry } from '../../projects/project-catalog';
import type { ProjectDefinitionSource } from './project-launch.contracts';

/**
 * Compatibility source for the current TypeScript-authored projects. Replacing
 * this source with an HTTP/static-file source does not change template code.
 */
export class LocalProjectDefinitionSource implements ProjectDefinitionSource {
  async load(project: ProjectCatalogEntry): Promise<unknown> {
    switch (project.packageReference) {
      case 'projects/calendar-monument':
        return (await import('../../projects/calendar-monument/calendar-monument.config'))
          .calendarMonumentConfig;
      case 'projects/robot-delivery-code-lab':
        return (await import('../../projects/robot-delivery/robot-delivery.config'))
          .robotDeliveryConfig;
      case 'projects/mystery-substance':
        return (await import('../../projects/mystery-substance/mystery-substance.package'))
          .mysterySubstanceCatalogPackage;
      case 'projects/frontier-trading-company':
        return (await import('../../projects/frontier-trading/frontier-trading.config'))
          .frontierTradingConfig;
      case 'projects/objects-that-changed-us':
        return (await import('../../projects/class-exhibit-hall/student-museum.config'))
          .studentMuseumConfig;
      case 'projects/history-live-revolutionary-war':
        return (
          await import('../../projects/history-live-revolutionary-war/history-live-revolutionary-war.config')
        ).historyLiveRevolutionaryWarConfig;
      case 'projects/the-fate-of-the-republic':
        return (await import('../../projects/roman-senate-debate/roman-senate-debate.config'))
          .romanSenateDebateConfig;
      case 'projects/expedition-news-network':
        return (await import('../../projects/expedition-news-network/expedition-news-network.config')).expeditionNewsNetworkConfig;
      case 'projects/hammurabi-on-trial':
        return (await import('../../projects/hammurabi-on-trial/hammurabi-on-trial.config'))
          .hammurabiOnTrialConfig;
      case 'projects/race-around-the-world': {
        const definitions = await import('../../projects/age-of-exploration-journey/age-of-exploration-journey.config');
        if (project.projectVersion === '1.3.0') return definitions.historicalAgeOfExplorationJourneyConfig;
        if (project.projectVersion === definitions.ageOfExplorationJourneyConfig.projectVersion) return definitions.ageOfExplorationJourneyConfig;
        throw new Error('PROJECT_VERSION_NOT_AVAILABLE: The requested journey version is not installed.');
      }
      case 'projects/survival-island-story-lab':
        return (await import('../../projects/survival-island-story-lab/survival-island.config'))
          .survivalIslandStoryLabConfig;
      default:
        return this.loadStaticPackage(project);
    }
  }

  private async loadStaticPackage(project: ProjectCatalogEntry): Promise<unknown> {
    const reference = project.packageReference.replace(/^\/+/, '').replace(/\/+$/, '');
    const response = await fetch(`/${reference}/project.json`, {
      headers: { accept: 'application/json' },
    });
    if (!response.ok) {
      throw new Error(
        `Project definition "${project.id}" could not be loaded (${response.status}).`,
      );
    }
    return response.json() as Promise<unknown>;
  }
}
