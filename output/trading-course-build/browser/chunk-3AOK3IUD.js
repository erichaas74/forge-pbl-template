import {
  BrowserProjectIntroAdapter
} from "./chunk-KANUZZVY.js";
import {
  usesNarrativeWeeklyPreview,
  validateNarrativePreview
} from "./chunk-KYN6TK4M.js";
import {
  BrowserNarrativeStudioPersistenceAdapter,
  NARRATIVE_STUDIO_COACH,
  NARRATIVE_STUDIO_CONFIG,
  NARRATIVE_STUDIO_INITIAL_HISTORY_SETTING_ID,
  NARRATIVE_STUDIO_PERSISTENCE,
  NARRATIVE_STUDIO_SESSION,
  NarrativeStudioRuntimeService
} from "./chunk-PJDX5C2H.js";
import {
  wordCount
} from "./chunk-M73YRRYA.js";
import "./chunk-5A6GBRKO.js";
import "./chunk-ZTDR7NN6.js";
import "./chunk-MNKXLJET.js";
import "./chunk-G626JLCU.js";
import "./chunk-RTVK2FN5.js";
import "./chunk-OXVZ3VYX.js";
import "./chunk-E2VJWGUE.js";
import "./chunk-GOMI4DH3.js";

// src/app/templates/narrative-studio/runtime/local-narrative-coach.adapter.ts
var LocalNarrativeCoachAdapter = class {
  async respond(request) {
    const hero = request.bible.protagonist.trim() || "your protagonist";
    const object = request.bible.importantObject.trim() || "the object they carried ashore";
    const history = request.historicalSetting;
    const historicalPressure = history?.survivalPressure ?? request.storm.pressure;
    const sceneWords = wordCount(request.scene.text);
    if (request.stage === "conversation" && request.tool === "reply") {
      const answer = (request.message ?? "").trim();
      const remembered = answer.length > 110 ? `${answer.slice(0, 107)}\u2026` : answer;
      return request.nextPlanningQuestion ? {
        text: `I saved your idea: \u201C${remembered}\u201D ${request.nextPlanningQuestion.prompt}`
      } : {
        text: "You made the important story decisions in your own words. Review the optional Story Notes next, or return to the map and write. You can change anything later."
      };
    }
    switch (request.tool) {
      case "question":
        return {
          text: `What do you want to change for ${hero} in this scene? Explain the choice they will face and why neither answer feels easy.`
        };
      case "possibilities":
        return {
          text: `Describe two different directions you are considering. What would ${hero} gain and lose in each one? I will help you compare the ideas you create.`
        };
      case "storm": {
        return {
          text: `You control the pressure. What new problem should interrupt this scene, and why would it matter to ${hero}? The historical setting suggests this kind of danger: ${historicalPressure} Change it freely as long as you protect the known facts.`
        };
      }
      case "continuity":
        return {
          text: sceneWords === 0 ? "Write a few lines first. Then I can check whether the scene agrees with your story bible and earlier choices." : `Continuity check: you have established ${hero}, ${object}, and a ${request.bible.tone} tone. Does this scene agree with the historical boundary\u2014${history?.accuracyBoundary ?? "keep the established setting consistent"}\u2014and clearly show what ${hero} knows?`
        };
      case "sensory":
        return {
          text: `Choose one detail ${hero} notices before anyone else: a sound carried by the wind, a texture underfoot, or a smell that signals danger. What does that detail make the reader predict?`
        };
      case "stakes":
        return {
          text: `The danger becomes meaningful when it threatens more than survival. How could this moment also threaten ${hero}'s goal, relationship, or belief about themself?`
        };
      case "reader":
        return {
          text: request.node.choices.length === 0 ? `As a reader, I need the ending to show what ${hero}'s choices changed\u2014not only whether they escaped. What earlier decision echoes here?` : `As a reader, I should understand what each option might cost without knowing the outcome. Do your choice labels promise two genuinely different risks?`
        };
      case "reply":
        return {
          text: sceneWords < 20 ? `I saved your thinking: \u201C${(request.message ?? "").trim()}\u201D What action, line of dialogue, or detail could let the reader notice that idea for themselves?` : request.node.choices.length ? `Your scene now has ${sceneWords} words. How should the choice at the end grow from the idea you just explained, and what might each option cost?` : `Your ending now has ${sceneWords} words. Which earlier choice should the reader feel here, and how has ${hero} changed?`
        };
    }
  }
};

// src/app/runtime/project-launch/template-launchers/narrative-studio.launcher.ts
var narrativeStudioLauncher = {
  templateId: "narrative-studio",
  async load(request) {
    const config = requireNarrativeConfig(request.projectDefinition, request.project.id);
    if (usesNarrativeWeeklyPreview(config, request.session)) {
      validateNarrativePreview(config);
      const preview = await import("./chunk-7XUO55TH.js");
      return {
        component: preview.NarrativeWeekWorkspaceComponent,
        providers: [
          { provide: NARRATIVE_STUDIO_CONFIG, useValue: config },
          { provide: NARRATIVE_STUDIO_SESSION, useValue: request.session }
        ]
      };
    }
    const initialHistorySettingId = await loadOpeningHistoryChoice(request);
    const module = await import("./chunk-5BI7Y7DT.js");
    return {
      component: module.NarrativeStudioPageComponent,
      providers: [
        { provide: NARRATIVE_STUDIO_CONFIG, useValue: config },
        { provide: NARRATIVE_STUDIO_SESSION, useValue: request.session },
        {
          provide: NARRATIVE_STUDIO_INITIAL_HISTORY_SETTING_ID,
          useValue: initialHistorySettingId
        },
        { provide: NARRATIVE_STUDIO_COACH, useClass: LocalNarrativeCoachAdapter },
        {
          provide: NARRATIVE_STUDIO_PERSISTENCE,
          useFactory: (session) => new BrowserNarrativeStudioPersistenceAdapter(void 0, session),
          deps: [NARRATIVE_STUDIO_SESSION]
        },
        NarrativeStudioRuntimeService
      ]
    };
  }
};
async function loadOpeningHistoryChoice(request) {
  try {
    const snapshot = await new BrowserProjectIntroAdapter().load({
      session: request.session,
      introVersion: request.project.projectVersion
    });
    return snapshot?.draft.teaser?.choiceId ?? "";
  } catch {
    return "";
  }
}
function requireNarrativeConfig(value, projectId) {
  if (!value || typeof value !== "object" || !("projectId" in value) || value.projectId !== projectId || !("nodes" in value) || !Array.isArray(value.nodes)) {
    throw new Error(`Project "${projectId}" is not a valid narrative-studio definition.`);
  }
  return value;
}
export {
  narrativeStudioLauncher
};
//# debugId=fac27e5f-e760-5f70-a454-3d7c462e5bca
//# sourceMappingURL=chunk-3AOK3IUD.js.map
