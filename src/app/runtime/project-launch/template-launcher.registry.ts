import type { TemplateLauncher } from './project-launch.contracts';

export class TemplateLauncherRegistry {
  private readonly launchers = new Map<string, TemplateLauncher>();
  private readonly loaders = new Map<string, () => Promise<TemplateLauncher>>();

  register(launcher: TemplateLauncher): void {
    if (this.launchers.has(launcher.templateId) || this.loaders.has(launcher.templateId)) {
      throw new Error(`Template launcher "${launcher.templateId}" is already registered.`);
    }
    this.launchers.set(launcher.templateId, launcher);
  }

  registerLazy(templateId: string, loader: () => Promise<TemplateLauncher>): void {
    if (this.launchers.has(templateId) || this.loaders.has(templateId)) {
      throw new Error(`Template launcher "${templateId}" is already registered.`);
    }
    this.loaders.set(templateId, loader);
  }

  async require(templateId: string): Promise<TemplateLauncher> {
    const existing = this.launchers.get(templateId);
    if (existing !== undefined) return existing;
    const loader = this.loaders.get(templateId);
    if (loader === undefined) {
      throw new Error(`Template launcher "${templateId}" is not registered.`);
    }
    const launcher = await loader();
    if (launcher.templateId !== templateId) {
      throw new Error(
        `Template launcher module for "${templateId}" exported "${launcher.templateId}".`,
      );
    }
    this.loaders.delete(templateId);
    this.launchers.set(templateId, launcher);
    return launcher;
  }

  list(): readonly TemplateLauncher[] {
    return Object.freeze([...this.launchers.values()]);
  }
}

export function createLocalTemplateLauncherRegistry(): TemplateLauncherRegistry {
  const registry = new TemplateLauncherRegistry();
  registry.registerLazy('competition-show', () =>
    import('./template-launchers/competition-show.launcher').then(module => module.competitionShowLauncher),
  );
  registry.registerLazy('live-strategy-league', () =>
    import('./template-launchers/live-strategy-league.launcher').then(module => module.liveStrategyLeagueLauncher),
  );
  registry.registerLazy('crisis-operations', () =>
    import('./template-launchers/crisis-operations.launcher').then(module => module.crisisOperationsLauncher),
  );
  registry.registerLazy('engineering-design', () =>
    import('./template-launchers/engineering-design.launcher').then((module) => module.engineeringDesignLauncher),
  );
  registry.registerLazy('programming-automation', () => import('./template-launchers/programming-automation.launcher').then(module => module.programmingAutomationLauncher));
  registry.registerLazy('investigation', () =>
    import('./template-launchers/investigation.launcher').then(
      (module) => module.investigationLauncher,
    ),
  );
  registry.registerLazy('simulation-decision', () =>
    import('./template-launchers/simulation-decision.launcher').then(
      (module) => module.simulationDecisionLauncher,
    ),
  );
  registry.registerLazy('exhibit-hall', () =>
    import('./template-launchers/exhibit-hall.launcher').then(
      (module) => module.exhibitHallLauncher,
    ),
  );
  registry.registerLazy('history-live-broadcast', () =>
    import('./template-launchers/history-live.launcher').then(
      (module) => module.historyLiveLauncher,
    ),
  );
  registry.registerLazy('debate-studio', () =>
    import('./template-launchers/debate-studio.launcher').then(
      (module) => module.debateStudioLauncher,
    ),
  );
  registry.registerLazy('journey-replay', () =>
    import('./template-launchers/journey-replay.launcher').then(
      (module) => module.journeyReplayLauncher,
    ),
  );
  registry.registerLazy('narrative-studio', () =>
    import('./template-launchers/narrative-studio.launcher').then(
      (module) => module.narrativeStudioLauncher,
    ),
  );
  return registry;
}
