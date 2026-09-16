import {
  FINAL_SHOWCASE,
  requireFinalShowcase
} from "./chunk-KB4VIG2E.js";
import {
  BrowserCompetitionPersistence,
  COMPETITION_CONFIG,
  COMPETITION_PERSISTENCE,
  CompetitionRuntimeService,
  requireCompetitionConfig
} from "./chunk-2T3THWAB.js";
import "./chunk-IIEET437.js";
import "./chunk-E2VJWGUE.js";
import {
  __objRest
} from "./chunk-GOMI4DH3.js";

// src/app/runtime/project-launch/template-launchers/competition-show.launcher.ts
var competitionShowLauncher = {
  templateId: "competition-show",
  async load(request) {
    if (request.session.authorityMode !== "localDemo")
      throw new Error("CAPABILITY_NOT_INSTALLED: Shared championships require an authoritative competition adapter. Open local rehearsal instead.");
    const config = requireCompetitionConfig(request.projectDefinition);
    const _a = config, { broadcast: _broadcast } = _a, gameplayConfig = __objRest(_a, ["broadcast"]);
    if (config.projectId !== request.project.id || config.projectVersion !== request.project.projectVersion)
      throw new Error("PROJECT_ID_MISMATCH: Championship package does not match this project.");
    if (request.view === "final-demo") {
      const response = await fetch(`/${request.project.packageReference}/final-demo.json`);
      if (!response.ok) throw new Error("CAPABILITY_NOT_INSTALLED: The fictional final package is unavailable.");
      const demo = requireFinalShowcase(await response.json(), config);
      const { FinalShowcaseComponent } = await import("./chunk-T575HMOS.js");
      return { component: FinalShowcaseComponent, integratedHeader: true, providers: [
        { provide: COMPETITION_CONFIG, useValue: config },
        { provide: FINAL_SHOWCASE, useValue: demo }
      ] };
    }
    const { CompetitionShowComponent } = await import("./chunk-B3IUQIGC.js");
    return { component: CompetitionShowComponent, integratedHeader: true, providers: [
      { provide: COMPETITION_CONFIG, useValue: config },
      { provide: COMPETITION_PERSISTENCE, useFactory: () => new BrowserCompetitionPersistence(request.session, JSON.stringify(gameplayConfig)) },
      CompetitionRuntimeService
    ] };
  }
};
export {
  competitionShowLauncher
};
//# debugId=66d224b7-6e35-54ad-bf5c-c6464645f6e5
//# sourceMappingURL=chunk-UWCVBDNK.js.map
