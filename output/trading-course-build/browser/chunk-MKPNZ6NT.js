import {
  BrowserLeaguePersistence,
  LEAGUE_CONFIG,
  LEAGUE_PERSISTENCE,
  LeagueRuntimeService
} from "./chunk-IKO3FXUM.js";
import {
  requireLeagueConfig
} from "./chunk-EMQ2ALBA.js";
import "./chunk-E2VJWGUE.js";
import "./chunk-GOMI4DH3.js";

// src/app/runtime/project-launch/template-launchers/live-strategy-league.launcher.ts
var liveStrategyLeagueLauncher = {
  templateId: "live-strategy-league",
  async load(request) {
    if (request.session.authorityMode !== "localDemo")
      throw new Error("CAPABILITY_NOT_INSTALLED: Live Strategy League currently supports local practice. Shared competitions require an authoritative backend adapter.");
    const config = requireLeagueConfig(request.projectDefinition);
    if (config.projectId !== request.project.id || config.projectVersion !== request.project.projectVersion)
      throw new Error("PROJECT_ID_MISMATCH: League package does not match this project.");
    if (!request.view || request.view === "launch") {
      const { LeagueLaunchComponent } = await import("./chunk-BF4TYXW7.js");
      return {
        component: LeagueLaunchComponent,
        integratedHeader: true,
        providers: [{ provide: LEAGUE_CONFIG, useValue: config }]
      };
    }
    if (request.view === "final-demo") {
      const { requireLeagueDemo } = await import("./chunk-FTD76IR3.js");
      requireLeagueDemo(config.finalDemo, config);
      const { LeagueFinalDemoComponent } = await import("./chunk-BANRYDOP.js");
      return {
        component: LeagueFinalDemoComponent,
        integratedHeader: true,
        providers: [{ provide: LEAGUE_CONFIG, useValue: config }]
      };
    }
    const { LeagueShellComponent } = await import("./chunk-D7T5B5FL.js");
    return { component: LeagueShellComponent, integratedHeader: true, providers: [
      { provide: LEAGUE_CONFIG, useValue: config },
      { provide: LEAGUE_PERSISTENCE, useFactory: () => new BrowserLeaguePersistence(request.session) },
      LeagueRuntimeService
    ] };
  }
};
export {
  liveStrategyLeagueLauncher
};
//# debugId=782de343-78d0-5a32-b660-c747588d9f5e
//# sourceMappingURL=chunk-MKPNZ6NT.js.map
