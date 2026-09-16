import {
  PROJECT_INTRO_CONFIG,
  PROJECT_INTRO_PERSISTENCE
} from "./chunk-3RS2K2YP.js";
import {
  BrowserProjectIntroAdapter
} from "./chunk-KANUZZVY.js";
import {
  toSignal
} from "./chunk-5UKO2VQ2.js";
import {
  projectIntroRegistry
} from "./chunk-XO5BEQZU.js";
import "./chunk-5A6GBRKO.js";
import "./chunk-ZTDR7NN6.js";
import "./chunk-MNKXLJET.js";
import {
  PROJECT_CATALOG_ENTRY,
  PROJECT_DEFINITION,
  PROJECT_SESSION_CONTEXT,
  PROJECT_SESSION_RESOLVER
} from "./chunk-CN67HRIA.js";
import {
  createLocalPreviewSession
} from "./chunk-G626JLCU.js";
import {
  PROJECT_LESSON_FOCUS
} from "./chunk-3C62DQOL.js";
import "./chunk-OXVZ3VYX.js";
import {
  ProjectCatalogService,
  projectCatalog
} from "./chunk-XTAQPZPK.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-X5IBMLI3.js";
import {
  DomSanitizer,
  Title
} from "./chunk-SKMWBOWD.js";
import {
  NgComponentOutlet
} from "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  EnvironmentInjector,
  Input,
  ViewChild,
  computed,
  createEnvironmentInjector,
  forwardRef,
  inject,
  input,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeResourceUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import "./chunk-X7Y4LULJ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/runtime/project-launch/template-launchers/journey-replay.preview.ts
function demoJourneyEnrollment() {
  const key = "forge:journey-replay:demo-learner";
  let studentId = "demo-navigator";
  try {
    const saved = sessionStorage.getItem(key);
    if (saved) studentId = saved;
    else {
      const suffix = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      studentId = `demo-${suffix}`;
      sessionStorage.setItem(key, studentId);
    }
  } catch {
  }
  return {
    tenantId: "demo",
    classId: "local-preview",
    studentId,
    studentDisplayName: "Demo navigator",
    classLabel: "Local demonstration",
    mode: "demo"
  };
}

// src/app/runtime/project-launch/local-project-session.ts
var previewSessionAdapters = {
  "journey-replay": (project) => {
    const enrollment = demoJourneyEnrollment();
    return createLocalPreviewSession(project.id, project.projectVersion, {
      tenantId: enrollment.tenantId,
      classId: enrollment.classId,
      actorId: enrollment.studentId,
      studentId: enrollment.studentId,
      actorDisplayName: enrollment.studentDisplayName
    });
  }
};
function localProjectSession(project) {
  return previewSessionAdapters[project.template.id]?.(project) ?? createLocalPreviewSession(project.id, project.projectVersion);
}

// src/app/runtime/project-launch/local-project-definition.source.ts
var LocalProjectDefinitionSource = class {
  async load(project) {
    switch (project.packageReference) {
      case "projects/calendar-monument":
        return (await import("./chunk-CCUAJA5L.js")).calendarMonumentConfig;
      case "projects/robot-delivery-code-lab":
        return (await import("./chunk-4USUNBE6.js")).robotDeliveryConfig;
      case "projects/mystery-substance":
        return (await import("./chunk-7EROFCAJ.js")).mysterySubstanceCatalogPackage;
      case "projects/frontier-trading-company":
        return (await import("./chunk-WCAUCLCV.js")).frontierTradingConfig;
      case "projects/objects-that-changed-us":
        return (await import("./chunk-PMLN6THA.js")).studentMuseumConfig;
      case "projects/history-live-revolutionary-war":
        return (await import("./chunk-IVLFWR3P.js")).historyLiveRevolutionaryWarConfig;
      case "projects/the-fate-of-the-republic":
        return (await import("./chunk-UHHBDPFS.js")).romanSenateDebateConfig;
      case "projects/expedition-news-network":
        return (await import("./chunk-A5J5H6C7.js")).expeditionNewsNetworkConfig;
      case "projects/hammurabi-on-trial":
        return (await import("./chunk-ORDE4UCY.js")).hammurabiOnTrialConfig;
      case "projects/race-around-the-world": {
        const definitions = await import("./chunk-D35SWZ64.js");
        if (project.projectVersion === "1.3.0") return definitions.historicalAgeOfExplorationJourneyConfig;
        if (project.projectVersion === definitions.ageOfExplorationJourneyConfig.projectVersion) return definitions.ageOfExplorationJourneyConfig;
        throw new Error("PROJECT_VERSION_NOT_AVAILABLE: The requested journey version is not installed.");
      }
      case "projects/survival-island-story-lab":
        return (await import("./chunk-JSN473OL.js")).survivalIslandStoryLabConfig;
      default:
        return this.loadStaticPackage(project);
    }
  }
  async loadStaticPackage(project) {
    const reference = project.packageReference.replace(/^\/+/, "").replace(/\/+$/, "");
    const response = await fetch(`/${reference}/project.json`, {
      headers: { accept: "application/json" }
    });
    if (!response.ok) {
      throw new Error(
        `Project definition "${project.id}" could not be loaded (${response.status}).`
      );
    }
    return response.json();
  }
};

// src/app/runtime/project-launch/template-launcher.registry.ts
var TemplateLauncherRegistry = class {
  launchers = /* @__PURE__ */ new Map();
  loaders = /* @__PURE__ */ new Map();
  register(launcher) {
    if (this.launchers.has(launcher.templateId) || this.loaders.has(launcher.templateId)) {
      throw new Error(`Template launcher "${launcher.templateId}" is already registered.`);
    }
    this.launchers.set(launcher.templateId, launcher);
  }
  registerLazy(templateId, loader) {
    if (this.launchers.has(templateId) || this.loaders.has(templateId)) {
      throw new Error(`Template launcher "${templateId}" is already registered.`);
    }
    this.loaders.set(templateId, loader);
  }
  async require(templateId) {
    const existing = this.launchers.get(templateId);
    if (existing !== void 0) return existing;
    const loader = this.loaders.get(templateId);
    if (loader === void 0) {
      throw new Error(`Template launcher "${templateId}" is not registered.`);
    }
    const launcher = await loader();
    if (launcher.templateId !== templateId) {
      throw new Error(
        `Template launcher module for "${templateId}" exported "${launcher.templateId}".`
      );
    }
    this.loaders.delete(templateId);
    this.launchers.set(templateId, launcher);
    return launcher;
  }
  list() {
    return Object.freeze([...this.launchers.values()]);
  }
};
function createLocalTemplateLauncherRegistry() {
  const registry = new TemplateLauncherRegistry();
  registry.registerLazy("time-repair", () => import("./chunk-NXWM3JKK.js").then((module) => module.timeRepairLauncher));
  registry.registerLazy("heist", () => import("./chunk-5SM7CAXF.js").then((module) => module.heistLauncher));
  registry.registerLazy(
    "competition-show",
    () => import("./chunk-UWCVBDNK.js").then((module) => module.competitionShowLauncher)
  );
  registry.registerLazy(
    "live-strategy-league",
    () => import("./chunk-MKPNZ6NT.js").then((module) => module.liveStrategyLeagueLauncher)
  );
  registry.registerLazy(
    "crisis-operations",
    () => import("./chunk-WEXHSCXW.js").then((module) => module.crisisOperationsLauncher)
  );
  registry.registerLazy(
    "engineering-design",
    () => import("./chunk-QHW6LAHL.js").then((module) => module.engineeringDesignLauncher)
  );
  registry.registerLazy("programming-automation", () => import("./chunk-GSMXOJE4.js").then((module) => module.programmingAutomationLauncher));
  registry.registerLazy(
    "investigation",
    () => import("./chunk-QJYPIL76.js").then(
      (module) => module.investigationLauncher
    )
  );
  registry.registerLazy(
    "simulation-decision",
    () => import("./chunk-DRZUHS7N.js").then(
      (module) => module.simulationDecisionLauncher
    )
  );
  registry.registerLazy(
    "exhibit-hall",
    () => import("./chunk-JMO7Q4TC.js").then(
      (module) => module.exhibitHallLauncher
    )
  );
  registry.registerLazy(
    "history-live-broadcast",
    () => import("./chunk-H2UP4VSE.js").then(
      (module) => module.historyLiveLauncher
    )
  );
  registry.registerLazy(
    "debate-studio",
    () => import("./chunk-J3POK7RD.js").then(
      (module) => module.debateStudioLauncher
    )
  );
  registry.registerLazy(
    "journey-replay",
    () => import("./chunk-5ZYDVRXK.js").then(
      (module) => module.journeyReplayLauncher
    )
  );
  registry.registerLazy(
    "narrative-studio",
    () => import("./chunk-3AOK3IUD.js").then(
      (module) => module.narrativeStudioLauncher
    )
  );
  return registry;
}

// src/app/projects/project-lesson-plans.json
var project_lesson_plans_default = [
  {
    schemaVersion: "1.0",
    planVersion: "1.1.0",
    projectId: "mystery-substance",
    projectVersion: "1.0.0",
    finalProduct: "editable shelf plan and incident test record.",
    grouping: "Two sessions per week: individual learning, then a group activity plan. Shared work is deferred.",
    availability: "Local authoring preview: all eight lab sessions open directly. Trials and shelf edits are local drafts; tutor questions are planning content, with no checkpoint or completion workflow.",
    evidenceCriteria: [
      "Separate an observation from an inference and support a claim with a discriminating test.",
      "Describe a fair comparison and account for matter in open and closed systems."
    ],
    lessons: [
      {
        number: 1,
        title: "Observe through the lens",
        output: "A set of optical comparisons across the four vials.",
        workspace: "Optical magnifier, light and zoom",
        checkpoint: "Which detail did you observe, and which part of your identification is still an inference?",
        criteria: [
          "Separate an observation from an inference and support a claim with a discriminating test."
        ],
        focusTarget: "scanner"
      },
      {
        number: 2,
        title: "Compare water trials",
        output: "A water-trial log comparing dissolved material and suspension.",
        workspace: "Properties Lab: water trial",
        checkpoint: "Which test will you contribute, and how could its result distinguish two possible substances?",
        criteria: [
          "Separate an observation from an inference and support a claim with a discriminating test."
        ],
        focusTarget: "properties"
      },
      {
        number: 3,
        title: "Probe the solutions",
        output: "A conductivity comparison across the four solutions.",
        workspace: "Properties Lab: conductivity probe",
        checkpoint: "A fresh sample dissolves in water. Is that enough to identify it? Explain the next useful comparison.",
        criteria: [
          "Separate an observation from an inference and support a claim with a discriminating test."
        ],
        focusTarget: "properties"
      },
      {
        number: 4,
        title: "Run the reaction protocol",
        output: "A reaction profile with measured quantities and both reagent stages.",
        workspace: "Reaction Bench: volume, mass and indicator",
        checkpoint: "If two samples react similarly, what other evidence would you need before choosing a label?",
        criteria: [
          "Separate an observation from an inference and support a claim with a discriminating test."
        ],
        focusTarget: "reaction"
      },
      {
        number: 5,
        title: "Run a sealed chamber",
        output: "A sealed-system particle and mass trial.",
        workspace: "Matter Tracker: sealed chamber",
        checkpoint: "What does the sealed-system balance measure, and why does the particle count stay constant?",
        criteria: [
          "Describe a fair comparison and account for matter in open and closed systems."
        ],
        focusTarget: "conservation"
      },
      {
        number: 6,
        title: "Open the boundary",
        output: "An open/closed comparison of particles and measured mass.",
        workspace: "Matter Tracker: open chamber",
        checkpoint: "Where do particles go when the chamber is open, and what would a larger measured boundary change?",
        criteria: [
          "Describe a fair comparison and account for matter in open and closed systems."
        ],
        focusTarget: "conservation"
      },
      {
        number: 7,
        title: "Respond to Bay 3",
        output: "An incident test log and a simulated response decision.",
        workspace: "Bay 3: diagnostic test budget",
        checkpoint: "Use the available observations to justify a response to a new unknown and explain what remains uncertain.",
        criteria: [
          "Describe a fair comparison and account for matter in open and closed systems."
        ],
        focusTarget: "emergency"
      },
      {
        number: 8,
        title: "Assemble the final shelf",
        output: "A shelf plan with editable labels, positions and handling choices.",
        workspace: "Shelf Restoration: editable final product",
        checkpoint: "Defend one label using your own evidence. Explain a revision and what you would test next.",
        criteria: [
          "Separate an observation from an inference and support a claim with a discriminating test.",
          "Describe a fair comparison and account for matter in open and closed systems."
        ],
        focusTarget: "restoration"
      }
    ],
    workspaceView: "experience"
  },
  {
    schemaVersion: "1.0",
    planVersion: "2.0.0",
    projectId: "frontier-trading-company",
    projectVersion: "1.16.0",
    finalProduct: "Four round-trip trading records, balanced budgets, and evidence-based improvement reflections.",
    grouping: "One weekly session: make journey decisions individually or with a company team; each learner writes their own reflection.",
    availability: "All eight weeks are freely accessible. Paired journey and ledger weeks share one saved expedition. Practice ledgers are separately labelled and never replace student journeys.",
    evidenceCriteria: [
      "Show correct units, unit price, quantity, total cost, and profit reasoning.",
      "Use ledger evidence and cash, capacity, or travel constraints to justify a strategy."
    ],
    lessons: [
      {
        number: 1,
        week: 1,
        title: "One trip out and back",
        output: "A completed first round trip with purchases, sales, and return-travel receipts.",
        workspace: "Interactive route map and town shops",
        checkpoint: "What did the trip earn after both travel costs? Which good made the best use of your cash and cargo space?",
        criteria: [
          "Show correct units, unit price, quantity, total cost, and profit reasoning.",
          "Use ledger evidence and cash, capacity, or travel constraints to justify a strategy."
        ],
        focusTarget: "route"
      },
      {
        number: 2,
        week: 2,
        title: "Balance the first ledger",
        output: "A reconciled first-trip budget and a written improvement plan.",
        workspace: "Journey ledger and improvement reflection",
        checkpoint: "What would make you more successful next time? Use two receipts, both travel costs, and your actual profit or loss.",
        criteria: [
          "Show correct units, unit price, quantity, total cost, and profit reasoning.",
          "Use ledger evidence and cash, capacity, or travel constraints to justify a strategy."
        ],
        focusTarget: "ledger"
      },
      {
        number: 3,
        week: 3,
        title: "A longer journey in bad weather",
        output: "A round trip to Fort Laramie with a weather response and a cash reserve.",
        workspace: "Interactive route map and town shops",
        checkpoint: "How much cash must you keep for the return trip? Compare paying for covers with the cost of a delay or damaged cargo.",
        criteria: [
          "Show correct units, unit price, quantity, total cost, and profit reasoning.",
          "Use ledger evidence and cash, capacity, or travel constraints to justify a strategy."
        ],
        focusTarget: "route"
      },
      {
        number: 4,
        week: 4,
        title: "Account for the weather",
        output: "A balanced weather-trip ledger and a revised buying and reserve strategy.",
        workspace: "Journey ledger and improvement reflection",
        checkpoint: "How did weather change the budget? Use the ledger to compare protection, delay, and cargo-loss costs.",
        criteria: [
          "Show correct units, unit price, quantity, total cost, and profit reasoning.",
          "Use ledger evidence and cash, capacity, or travel constraints to justify a strategy."
        ],
        focusTarget: "ledger"
      },
      {
        number: 5,
        week: 5,
        title: "Trade beyond the mountain pass",
        output: "A longer trip to the mining camp with weather and raider decisions.",
        workspace: "Interactive route map and town shops",
        checkpoint: "Which route and cargo could cover the longer journey? Explain the cost of an escort compared with a detour or surrendered goods.",
        criteria: [
          "Show correct units, unit price, quantity, total cost, and profit reasoning.",
          "Use ledger evidence and cash, capacity, or travel constraints to justify a strategy."
        ],
        focusTarget: "route"
      },
      {
        number: 6,
        week: 6,
        title: "Reconcile risk and profit",
        output: "A balanced high-country ledger separating cash expenses from inventory losses.",
        workspace: "Journey ledger and improvement reflection",
        checkpoint: "Did higher selling prices cover travel and attack losses? Explain one change using unit profit and the journey receipts.",
        criteria: [
          "Show correct units, unit price, quantity, total cost, and profit reasoning.",
          "Use ledger evidence and cash, capacity, or travel constraints to justify a strategy."
        ],
        focusTarget: "ledger"
      },
      {
        number: 7,
        week: 7,
        title: "Weather, raiders, and floods",
        output: "A multi-stop round trip visiting Fort Laramie and the mining camp, with a flood contingency.",
        workspace: "Interactive route map and town shops",
        checkpoint: "What reserve will survive several disruptions? Compare longer routes, protection costs, and remaining cargo value.",
        criteria: [
          "Show correct units, unit price, quantity, total cost, and profit reasoning.",
          "Use ledger evidence and cash, capacity, or travel constraints to justify a strategy."
        ],
        focusTarget: "route"
      },
      {
        number: 8,
        week: 8,
        title: "Balance and improve the company",
        output: "The final reconciled budget and a reflection comparing strategies across journeys.",
        workspace: "Journey ledger and improvement reflection",
        checkpoint: "Which change made your company more successful? Compare journey results, separate extra starting capital from profit, and support your next plan with receipts.",
        criteria: [
          "Show correct units, unit price, quantity, total cost, and profit reasoning.",
          "Use ledger evidence and cash, capacity, or travel constraints to justify a strategy."
        ],
        focusTarget: "ledger"
      }
    ],
    workspaceView: "experience",
    presentation: {
      layout: "activity-first",
      title: "Frontier Trading Company",
      identifier: "FTC \xB7 TRADING & BUDGETS",
      grade: "GRADE 6",
      alignmentStatus: "pending",
      alignmentNote: "Unit-rate, decimal arithmetic, and proportional reasoning targets are mapped to the revised eight-week sequence. Teacher evidence review is still required."
    }
  },
  {
    schemaVersion: "1.0",
    planVersion: "1.0.0",
    projectId: "objects-that-changed-us",
    projectVersion: "2.3.0",
    finalProduct: "curated room in the class museum.",
    grouping: "Teams build a shared product; each student explains and defends their own contribution.",
    availability: "Use the assigned-room museum composer and visitor review. Keep individual research and curator defenses alongside the room; publishing follows the existing submission workflow.",
    evidenceCriteria: [
      "Link an accurate interpretation to a relevant artifact and identified source.",
      "Distinguish what the evidence supports from what remains uncertain."
    ],
    lessons: [
      {
        number: 1,
        title: "Read an artifact",
        output: "Artifact observation, research question, and initial source note.",
        workspace: "Museum room and artifact research",
        checkpoint: "What can you observe directly about this artifact, and which interpretation needs a source?",
        criteria: [
          "Link an accurate interpretation to a relevant artifact and identified source."
        ],
        focusTarget: "edit"
      },
      {
        number: 2,
        title: "Plan the room",
        output: "Room theme, proposed claim, and artifact shortlist.",
        workspace: "Assigned room, theme, and artifact shortlist",
        checkpoint: "Explain your selected artifact and how it supports the room claim. What could a visitor misunderstand?",
        criteria: [
          "Link an accurate interpretation to a relevant artifact and identified source."
        ],
        focusTarget: "edit"
      },
      {
        number: 3,
        title: "Write a sourced label",
        output: "Draft artifact label supported by a source.",
        workspace: "Composer: artifact labels and sources",
        checkpoint: "Use a fresh source passage to support a label claim. Identify the source and one limit of the evidence.",
        criteria: [
          "Link an accurate interpretation to a relevant artifact and identified source."
        ],
        focusTarget: "edit"
      },
      {
        number: 4,
        title: "Build the first room",
        output: "First room layout with artifacts, labels, and evidence connections.",
        workspace: "Room layout and label composer",
        checkpoint: "Explain an artifact-label connection. How would the claim change if that artifact were removed?",
        criteria: [
          "Link an accurate interpretation to a relevant artifact and identified source."
        ],
        focusTarget: "edit"
      },
      {
        number: 5,
        title: "Revise an interpretation",
        output: "Revised label or interpretation with a reason for the change.",
        workspace: "Label editor and source review",
        checkpoint: "Show an overclaim you corrected, then write a more precise claim for another artifact.",
        criteria: [
          "Distinguish what the evidence supports from what remains uncertain."
        ],
        focusTarget: "edit"
      },
      {
        number: 6,
        title: "Walk through the museum",
        output: "Peer museum walkthrough, feedback, and room improvements.",
        workspace: "Visitor preview and peer critique",
        checkpoint: "Defend a room change using visitor feedback. What question does the current layout still leave open?",
        criteria: [
          "Distinguish what the evidence supports from what remains uncertain."
        ],
        focusTarget: "preview"
      },
      {
        number: 7,
        title: "Practice the curator defense",
        output: "Individual curator explanation and final evidence check.",
        workspace: "Curator notes and final source check",
        checkpoint: "Interpret a new artifact detail independently and connect it to an identified source.",
        criteria: [
          "Link an accurate interpretation to a relevant artifact and identified source."
        ],
        focusTarget: "edit"
      },
      {
        number: 8,
        title: "Open the exhibition",
        output: "Class exhibition, completed room, and responses to visitor questions.",
        workspace: "Room submission and class museum",
        checkpoint: "Answer a visitor question about your contribution, cite its evidence, and reflect on a revision.",
        criteria: [
          "Link an accurate interpretation to a relevant artifact and identified source.",
          "Distinguish what the evidence supports from what remains uncertain."
        ],
        focusTarget: "preview"
      }
    ],
    workspaceView: "experience"
  },
  {
    schemaVersion: "1.0",
    planVersion: "1.0.0",
    projectId: "history-live-revolutionary-war",
    projectVersion: "1.1.0",
    finalProduct: "sourced news package in a class broadcast.",
    grouping: "Teams build a shared product; each student explains and defends their own contribution.",
    availability: "Use network selection, assignment pitch, Source Wall, script, production, and broadcast review. Historical date and producer approval rules remain in force.",
    evidenceCriteria: [
      "Support an accurate historical claim with an identified source passage.",
      "Represent perspective and uncertainty without introducing knowledge beyond the reporting date."
    ],
    lessons: [
      {
        number: 1,
        title: "Find the story angle",
        output: "Source-perspective notes and a possible story angle.",
        workspace: "Network choice and Source Wall",
        checkpoint: "Identify a source and its perspective. Which part of your proposed story does it actually support?",
        criteria: [
          "Support an accurate historical claim with an identified source passage."
        ],
        focusTarget: "side"
      },
      {
        number: 2,
        title: "Pitch the news package",
        output: "Story pitch, reporting roles, and research plan.",
        workspace: "Assignment desk and story pitch",
        checkpoint: "Explain your reporting role and source choice. Whose perspective is still missing from the plan?",
        criteria: [
          "Support an accurate historical claim with an identified source passage."
        ],
        focusTarget: "pitch"
      },
      {
        number: 3,
        title: "Verify a claim",
        output: "Verified claim linked to a source passage.",
        workspace: "Source Wall and research notes",
        checkpoint: "Use a fresh passage to support a claim and explain what the passage cannot establish.",
        criteria: [
          "Support an accurate historical claim with an identified source passage."
        ],
        focusTarget: "sources"
      },
      {
        number: 4,
        title: "Draft the broadcast",
        output: "First sourced script and visual rundown.",
        workspace: "Script and visual rundown",
        checkpoint: "Defend a line in the script. How would you rewrite it if its only source were unconfirmed?",
        criteria: [
          "Support an accurate historical claim with an identified source passage."
        ],
        focusTarget: "script"
      },
      {
        number: 5,
        title: "Revise the reporting",
        output: "Revised script contribution addressing perspective or uncertainty.",
        workspace: "Script revision and source comparison",
        checkpoint: "Explain a perspective or date error you corrected, then assess a new claim for the same problem.",
        criteria: [
          "Represent perspective and uncertainty without introducing knowledge beyond the reporting date."
        ],
        focusTarget: "script"
      },
      {
        number: 6,
        title: "Rehearse the segment",
        output: "Rehearsal or rough recording and editorial feedback.",
        workspace: "Production recording and preview",
        checkpoint: "Use editorial feedback to defend a revision. What uncertainty must remain explicit on air?",
        criteria: [
          "Represent perspective and uncertainty without introducing knowledge beyond the reporting date."
        ],
        focusTarget: "production"
      },
      {
        number: 7,
        title: "Defend the sources",
        output: "Individual source defense and final segment revision.",
        workspace: "Final script and source evidence",
        checkpoint: "Evaluate a new source passage and explain whether it changes your report before the reporting deadline.",
        criteria: [
          "Support an accurate historical claim with an identified source passage."
        ],
        focusTarget: "sources"
      },
      {
        number: 8,
        title: "Go live",
        output: "Class broadcast, final package, and reflection on another perspective.",
        workspace: "Approved news package and class broadcast",
        checkpoint: "Defend your bylined contribution with a source passage and reflect on another network\u2019s perspective.",
        criteria: [
          "Support an accurate historical claim with an identified source passage.",
          "Represent perspective and uncertainty without introducing knowledge beyond the reporting date."
        ],
        focusTarget: "broadcast"
      }
    ],
    workspaceView: "experience"
  },
  {
    schemaVersion: "1.0",
    planVersion: "2.0.0",
    projectId: "the-fate-of-the-republic",
    projectVersion: "3.0.0",
    finalProduct: "One ongoing debate: opening, three exchanges with individual revisions, same-side critiques, closing and ranked individual performers.",
    grouping: "Odd sessions: individual instruction and revision. Even sessions: exchange with an opposing group or individual; each performer keeps an individual contribution.",
    availability: "All eight sessions and authored examples are freely accessible during testing. Local file exchange; live classroom connection unavailable.",
    evidenceCriteria: [
      "Cited claims and fair responses to a specific opposing argument.",
      "Immutable versions, same-side peer critique and explained revisions.",
      "Individual context defense and justified performer rankings; teacher review required."
    ],
    lessons: [
      {
        number: 1,
        title: "Choose a side \xB7 opening argument",
        output: "Individual opening with ordered points and cited evidence. Name a Roman republican institution and its function.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Explain the link between your claim and a source; distinguish claim from evidence. Name a Roman republican institution and its function.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-1"
      },
      {
        number: 2,
        title: "Exchange 1 \xB7 answer an opponent",
        output: "A rebuttal to an opposing opening, submitted by class end. Connect participation and power to the opposing cases.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Represent an opponent fairly and explain how your response addresses their point. Connect participation and power to the opposing cases.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-2"
      },
      {
        number: 3,
        title: "Source clinic \xB7 refine the response",
        output: "An independent revision and a same-side peer critique. Compare Cicero\u2019s perspective with evidence about other groups.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Explain the purpose and limits of a source, then show how that changes your argument. Compare Cicero\u2019s perspective with evidence about other groups.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-3"
      },
      {
        number: 4,
        title: "Exchange 2 \xB7 test the rebuttal",
        output: "A response to the opponent\u2019s refined argument, submitted by class end. Explain the tradeoff between reform and concentrated authority.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Defend a rebuttal with relevant evidence and acknowledge a reasonable objection. Explain the tradeoff between reform and concentrated authority.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-4"
      },
      {
        number: 5,
        title: "Reasoning clinic \xB7 strengthen the case",
        output: "A stronger revision with an explanation of changes and peer feedback used. Evaluate a peer\u2019s claim and preserve the earlier version.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Compare old and new reasoning; explain a change made after critique. Evaluate a peer\u2019s claim and preserve the earlier version.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-5"
      },
      {
        number: 6,
        title: "Exchange 3 \xB7 answer the strongest case",
        output: "A response to the strongest opposing case, submitted by class end. Practice clear oral delivery during the exchange.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Answer the strongest objection, cite evidence and state a fair concession. Practice clear oral delivery during the exchange.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-6"
      },
      {
        number: 7,
        title: "Closing clinic \xB7 refine and rehearse",
        output: "A refined closing preparation with source limits and a revision trail. Apply the source critique to a fresh detail selected by the teacher.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Explain how your closing weighs conflicting evidence and preserves source limits. Apply the source critique to a fresh detail selected by the teacher.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-7"
      },
      {
        number: 8,
        title: "Final exchange \xB7 judge the performers",
        output: "Closing arguments, criterion-based ballots and best individual performer rankings. Explain republican institutions, law and participation in the final defense.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Defend your own closing and justify performer rankings with observed evidence. Teacher review confirms learning. Explain republican institutions, law and participation in the final defense.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Rank observed performances using the rubric."
        ],
        focusTarget: "debate-session-8"
      }
    ],
    workspaceView: "experience",
    presentation: {
      layout: "activity-first",
      title: "The Fate of the Republic",
      identifier: "SPQR",
      grade: "Grade 6",
      alignmentStatus: "pending",
      alignmentNote: "Versioned lesson evidence is mapped in the standards review. Teacher review is required; rankings do not confirm mastery."
    }
  },
  {
    schemaVersion: "1.0",
    planVersion: "1.1.0",
    projectId: "race-around-the-world",
    projectVersion: "1.4.0",
    finalProduct: "A recorded expedition path with route decisions, location events, resource consequences, and preserved revisions.",
    grouping: "Individual local practice; students can compare route reasoning together. Shared editing and assessment are not connected.",
    availability: "All eight sessions and alternate scenes are freely inspectable. Unanswered sessions use clearly labeled practice routes. Recorded choices carry tasks, resources, and discoveries forward; previews leave that record unchanged.",
    evidenceCriteria: [
      "Use geographic or historical evidence to justify a decision and prediction.",
      "Compare consequences with the prediction and account for resource tradeoffs and perspective."
    ],
    lessons: [
      {
        number: 1,
        title: "Chart the first passage",
        output: "A selected passage and its next investigation.",
        workspace: "Interactive passage map; choices in AI Tutor",
        checkpoint: "Compare the modeled route time and supplies before choosing.",
        criteria: [
          "Use geographic or historical evidence to justify a decision and prediction."
        ],
        focusTarget: "path-map"
      },
      {
        number: 2,
        title: "Investigate the first landing",
        output: "Navigation and provisioning decisions with visible consequences.",
        workspace: "Interactive ship and shore scene; events in AI Tutor",
        checkpoint: "Use the ship and shore observations to choose what to carry forward.",
        criteria: [
          "Use geographic or historical evidence to justify a decision and prediction."
        ],
        focusTarget: "path-location"
      },
      {
        number: 3,
        title: "Follow the discoveries",
        output: "A route shaped by earlier observations and stores.",
        workspace: "Interactive passage map; choices in AI Tutor",
        checkpoint: "Explain which earlier observation reveals another route.",
        criteria: [
          "Use geographic or historical evidence to justify a decision and prediction."
        ],
        focusTarget: "path-map"
      },
      {
        number: 4,
        title: "Respond at the next anchorage",
        output: "Storm, repair, or exchange decisions for the chosen anchorage.",
        workspace: "Interactive ship and shore scene; events in AI Tutor",
        checkpoint: "Compare an event response with the resources it changes.",
        criteria: [
          "Use geographic or historical evidence to justify a decision and prediction."
        ],
        focusTarget: "path-location"
      },
      {
        number: 5,
        title: "Choose the wider expedition",
        output: "A destination chosen using the expedition\u2019s remaining resources.",
        workspace: "Interactive passage map; choices in AI Tutor",
        checkpoint: "Use the previous landing\u2019s consequence to plan the next investigation.",
        criteria: [
          "Compare consequences with the prediction and account for resource tradeoffs and perspective."
        ],
        focusTarget: "path-map"
      },
      {
        number: 6,
        title: "Investigate the new coast",
        output: "Encounter or repair choices and an updated source record.",
        workspace: "Interactive ship and shore scene; events in AI Tutor",
        checkpoint: "Compare the available accounts and whose perspective they represent.",
        criteria: [
          "Compare consequences with the prediction and account for resource tradeoffs and perspective."
        ],
        focusTarget: "path-location"
      },
      {
        number: 7,
        title: "Chart a final destination",
        output: "A final passage supported by the discoveries made so far.",
        workspace: "Interactive passage map; choices in AI Tutor",
        checkpoint: "Choose which unresolved question your last landing should investigate.",
        criteria: [
          "Compare consequences with the prediction and account for resource tradeoffs and perspective."
        ],
        focusTarget: "path-map"
      },
      {
        number: 8,
        title: "Assemble the expedition evidence",
        output: "A retained route and event record with alternative decisions to compare.",
        workspace: "Interactive ship and shore scene; events in AI Tutor",
        checkpoint: "Compare your recorded path with an alternative and identify a source limitation.",
        criteria: [
          "Compare consequences with the prediction and account for resource tradeoffs and perspective."
        ],
        focusTarget: "path-location"
      }
    ],
    workspaceView: "experience",
    presentation: {
      layout: "activity-first",
      title: "Voyage",
      identifier: "VOYAGE \xB7 1501",
      grade: "Grade 7",
      alignmentStatus: "pending",
      alignmentNote: "Voyage 1.4.0 has new branching activities. A reviewed Grade 7 standards mapping is not available yet; the goals below describe the current learning design, not confirmed standards coverage."
    }
  },
  {
    schemaVersion: "1.0",
    planVersion: "1.0.0",
    projectId: "survival-island-story-lab",
    projectVersion: "1.2.0",
    finalProduct: "Proposed individual branching story and a local playable demonstration.",
    grouping: "Individual drafts; group sessions model a writing circle. Shared editing is deferred.",
    availability: "All eight sessions are directly testable with fictional samples. Edits remain temporary in memory and reset when the workspace closes or reloads. No student work or completion is recorded.",
    evidenceCriteria: [
      "Make character choices produce coherent, meaningful consequences.",
      "Use scene detail and playtest evidence to explain a revision and maintain continuity."
    ],
    lessons: [
      {
        number: 1,
        title: "Write the opening",
        output: "Opening scene with a clear viewpoint and character goal.",
        workspace: "Shore scene writer",
        checkpoint: "Which action reveals the character\u2019s goal?",
        criteria: [
          "Make character choices produce coherent, meaningful consequences."
        ],
        focusTarget: "write"
      },
      {
        number: 2,
        title: "Let the characters disagree",
        output: "Dialogue scene and two meaningful reader choices.",
        workspace: "Shelter dialogue and choices",
        checkpoint: "What does the dialogue reveal about each character?",
        criteria: [
          "Make character choices produce coherent, meaningful consequences."
        ],
        focusTarget: "write"
      },
      {
        number: 3,
        title: "Build the consequence map",
        output: "Branching map with distinct costs and consequences.",
        workspace: "Flooded crossing branch map",
        checkpoint: "What does each route protect and risk?",
        criteria: [
          "Make character choices produce coherent, meaningful consequences."
        ],
        focusTarget: "map"
      },
      {
        number: 4,
        title: "Try the other route",
        output: "Two playable outcomes for a writing circle to compare.",
        workspace: "Crossing route reader",
        checkpoint: "How does the outcome follow from the reader\u2019s decision?",
        criteria: [
          "Use scene detail and playtest evidence to explain a revision and maintain continuity."
        ],
        focusTarget: "playtest"
      },
      {
        number: 5,
        title: "Repair the shared scene",
        output: "Revised scene that works after two different routes.",
        workspace: "Lantern continuity comparison",
        checkpoint: "Who has the lantern on each incoming route?",
        criteria: [
          "Use scene detail and playtest evidence to explain a revision and maintain continuity."
        ],
        focusTarget: "write"
      },
      {
        number: 6,
        title: "Test every ending",
        output: "Playable continuity repair and alternate endings.",
        workspace: "Lantern path testing",
        checkpoint: "Does the shared scene work after both trails?",
        criteria: [
          "Use scene detail and playtest evidence to explain a revision and maintain continuity."
        ],
        focusTarget: "playtest"
      },
      {
        number: 7,
        title: "Shape the final decision",
        output: "Revised climax and endings in an individual story.",
        workspace: "Signal story climax writer",
        checkpoint: "Which early detail earns the ending?",
        criteria: [
          "Use scene detail and playtest evidence to explain a revision and maintain continuity."
        ],
        focusTarget: "write"
      },
      {
        number: 8,
        title: "Play the story",
        output: "Local playable story demonstration for a writing circle.",
        workspace: "Final story reader",
        checkpoint: "What changes in the character across each route?",
        criteria: [
          "Make character choices produce coherent, meaningful consequences.",
          "Use scene detail and playtest evidence to explain a revision and maintain continuity."
        ],
        focusTarget: "playtest"
      }
    ],
    workspaceView: "experience"
  },
  {
    schemaVersion: "1.0",
    planVersion: "1.1.0",
    projectId: "calendar-monument",
    projectVersion: "1.0.0",
    finalProduct: "Four editable solar builds and a replayable seasonal test collection.",
    grouping: "Individual learning followed by group activity planning; all edits remain local in this preview.",
    availability: "All eight sessions open directly with a sample build. Four separate weekly drafts preserve edits and recorded tests; AI Tutor is disconnected.",
    evidenceCriteria: [
      "Explain daily and seasonal shadow patterns using Earth\u2019s rotation and tilt.",
      "Use measured trials to justify an alignment and state its limits."
    ],
    lessons: [
      {
        number: 1,
        title: "Build a shadow clock",
        output: "Measured post and editable shadow-tip marks.",
        workspace: "Daily sundial",
        checkpoint: "Why does the shadow point away from the Sun?",
        criteria: [
          "Explain daily and seasonal shadow patterns using Earth\u2019s rotation and tilt."
        ],
        focusTarget: "daily-sundial"
      },
      {
        number: 2,
        title: "Calibrate the dial",
        output: "Morning, noon and afternoon dial marks.",
        workspace: "Daily sundial",
        checkpoint: "Why can an old mark miss the shadow in another season?",
        criteria: [
          "Explain daily and seasonal shadow patterns using Earth\u2019s rotation and tilt."
        ],
        focusTarget: "daily-sundial"
      },
      {
        number: 3,
        title: "Align the summer window",
        output: "Revised summer window and a fixed pillar light test.",
        workspace: "Solstice windows",
        checkpoint: "How does moving the window change light at a fixed target?",
        criteria: [
          "Explain daily and seasonal shadow patterns using Earth\u2019s rotation and tilt."
        ],
        focusTarget: "solstice-windows"
      },
      {
        number: 4,
        title: "Compare the two windows",
        output: "June and December morning light observations.",
        workspace: "Solstice windows",
        checkpoint: "Does this alignment identify one day or a range?",
        criteria: [
          "Use measured trials to justify an alignment and state its limits."
        ],
        focusTarget: "solstice-windows"
      },
      {
        number: 5,
        title: "Aim a colored window",
        output: "Colored window and sculpture installation.",
        workspace: "Colored-light sculpture",
        checkpoint: "Which light passes through a colored filter?",
        criteria: [
          "Use measured trials to justify an alignment and state its limits."
        ],
        focusTarget: "colored-sculpture"
      },
      {
        number: 6,
        title: "Compare colors and faces",
        output: "Controlled filter and sculpture-face comparisons.",
        workspace: "Colored-light sculpture",
        checkpoint: "Which comparison isolates color from geometry?",
        criteria: [
          "Use measured trials to justify an alignment and state its limits."
        ],
        focusTarget: "colored-sculpture"
      },
      {
        number: 7,
        title: "Arrange the calendar gates",
        output: "Stone circle with seasonal light or shadow markers.",
        workspace: "Stone-circle calendar",
        checkpoint: "Which feature marks the season rather than the hour?",
        criteria: [
          "Use measured trials to justify an alignment and state its limits."
        ],
        focusTarget: "stone-calendar"
      },
      {
        number: 8,
        title: "Play the final solar calendar",
        output: "Four seasonal observations and an editable final calendar.",
        workspace: "Stone-circle calendar",
        checkpoint: "What can your calendar distinguish, and what are its limits?",
        criteria: [
          "Explain daily and seasonal shadow patterns using Earth\u2019s rotation and tilt.",
          "Use measured trials to justify an alignment and state its limits."
        ],
        focusTarget: "stone-calendar"
      }
    ],
    workspaceView: "experience"
  },
  {
    schemaVersion: "1.0",
    planVersion: "1.1.0",
    projectId: "robot-delivery-code-lab",
    projectVersion: "1.0.0",
    finalProduct: "Robot Command Championship and code/design defense.",
    grouping: "Two sessions per week: individual learning and group activity. Shared work is deferred to a separate build.",
    availability: "Authoring preview: all weeks, sessions, targets, and challenges are open. Proposed products and tutor questions are planning lists; no lesson completion or assessment is recorded.",
    evidenceCriteria: [
      "Connect distance, rotations, angles, or repeated motion to correct calculations and units.",
      "Predict program behavior and justify a code revision with trial evidence."
    ],
    lessons: [
      {
        number: 1,
        title: "Precision parking",
        output: "Robot calibration or movement calculation and a test record.",
        workspace: "Precision parking course and code editor",
        checkpoint: "Explain the distance-to-rotation calculation. Predict the motion for a new distance.",
        criteria: [
          "Connect distance, rotations, angles, or repeated motion to correct calculations and units."
        ],
        focusTarget: "precision-parking"
      },
      {
        number: 2,
        title: "Take the corner",
        output: "Basic delivery program, route plan, and observed results.",
        workspace: "Take the corner course and code editor",
        checkpoint: "Explain your route or command contribution. What changes if the delivery point moves?",
        criteria: [
          "Connect distance, rotations, angles, or repeated motion to correct calculations and units."
        ],
        focusTarget: "turn-training"
      },
      {
        number: 3,
        title: "Resize the route",
        output: "Variable or repeat-loop practice with supporting math.",
        workspace: "Resize the route course and code editor",
        checkpoint: "Predict a fresh loop\u2019s total motion and show the calculation before running it.",
        criteria: [
          "Connect distance, rotations, angles, or repeated motion to correct calculations and units."
        ],
        focusTarget: "variable-upgrade"
      },
      {
        number: 4,
        title: "Automate the warehouse",
        output: "Multi-step delivery program and debugging notes.",
        workspace: "Automate the warehouse course and code editor",
        checkpoint: "Explain a trial result. What would happen if one distance or turn command changed?",
        criteria: [
          "Predict program behavior and justify a code revision with trial evidence."
        ],
        focusTarget: "warehouse-pattern"
      },
      {
        number: 5,
        title: "Cross the patrol",
        output: "Individual code revision explained through test evidence.",
        workspace: "Cross the patrol course and code editor",
        checkpoint: "Identify the cause of a failed run, justify the edit, and predict a new trial without hints.",
        criteria: [
          "Predict program behavior and justify a code revision with trial evidence."
        ],
        focusTarget: "patrol-crossing"
      },
      {
        number: 6,
        title: "Time the moving gates",
        output: "Championship rehearsal, reliability results, and improvement plan.",
        workspace: "Time the moving gates course and code editor",
        checkpoint: "Defend a code change with trial evidence. Which course condition still threatens reliability?",
        criteria: [
          "Predict program behavior and justify a code revision with trial evidence."
        ],
        focusTarget: "moving-gates"
      },
      {
        number: 7,
        title: "Deliver heavy cargo",
        output: "Individual prediction and explanation of part of the program.",
        workspace: "Deliver heavy cargo course and code editor",
        checkpoint: "Predict the result of a new command or obstacle condition independently and explain your reasoning.",
        criteria: [
          "Predict program behavior and justify a code revision with trial evidence."
        ],
        focusTarget: "cargo-delivery"
      },
      {
        number: 8,
        title: "Run the delivery final",
        output: "Championship run, final code, trial evidence, and defense.",
        workspace: "Run the delivery final course and code editor",
        checkpoint: "Explain your code contribution, show a supporting trial, and reflect on the final run.",
        criteria: [
          "Connect distance, rotations, angles, or repeated motion to correct calculations and units.",
          "Predict program behavior and justify a code revision with trial evidence."
        ],
        focusTarget: "championship"
      }
    ],
    workspaceView: "experience"
  },
  {
    schemaVersion: "1.0",
    planVersion: "1.1.0",
    projectId: "shadow-gallery",
    projectVersion: "2.0.0",
    finalProduct: "An illustrated historical reconstruction exhibition with before-and-after pictures, captions and sources.",
    grouping: "Two sessions each week: individual exploration, then a group activity. Drafts are local; shared editing is deferred.",
    availability: "All eight sessions, all sixteen paintings and the exhibition are directly accessible in local authoring preview. No assessment completion is recorded.",
    evidenceCriteria: [
      "Distinguish observed image details from historical claims using dated, relevant evidence.",
      "Support changed and preserved details while acknowledging the limits of a reconstruction."
    ],
    lessons: [
      {
        number: 1,
        title: "What does not belong?",
        output: "A shore reconstruction with a pinned reference and a saved before-and-after version.",
        workspace: "Look inside the picture: inspect",
        checkpoint: "What is directly visible, and what is only claimed by the inscription?",
        criteria: [
          "Distinguish observed image details from historical claims using dated, relevant evidence."
        ],
        focusTarget: "studio"
      },
      {
        number: 2,
        title: "Whose island story?",
        output: "A relabeled island picture that preserves supported context.",
        workspace: "Look inside the picture: inspect",
        checkpoint: "Which source establishes the time and place? What can it not establish?",
        criteria: [
          "Support changed and preserved details while acknowledging the limits of a reconstruction."
        ],
        focusTarget: "studio"
      },
      {
        number: 3,
        title: "An instrument out of time",
        output: "An instrument comparison with two saved image trials.",
        workspace: "The time detective\u2019s workshop: compare",
        checkpoint: "What makes an object an anachronism in this assigned setting?",
        criteria: [
          "Distinguish observed image details from historical claims using dated, relevant evidence."
        ],
        focusTarget: "studio"
      },
      {
        number: 4,
        title: "The clock that arrived early",
        output: "A restored workshop scene and a replayable sequence of repair trials.",
        workspace: "The time detective\u2019s workshop: compare",
        checkpoint: "Does removing a doubtful object establish what actually occupied that space?",
        criteria: [
          "Support changed and preserved details while acknowledging the limits of a reconstruction."
        ],
        focusTarget: "studio"
      },
      {
        number: 5,
        title: "Repair the departure register",
        output: "A corrected departure-register image with its source pinned.",
        workspace: "Repair the historical record: restore",
        checkpoint: "How do departure and arrival differ when authenticating a date?",
        criteria: [
          "Distinguish observed image details from historical claims using dated, relevant evidence."
        ],
        focusTarget: "studio"
      },
      {
        number: 6,
        title: "Where did the cargo begin?",
        output: "A revised cargo image distinguishing origin from later trade.",
        workspace: "Repair the historical record: restore",
        checkpoint: "How is a crop\u2019s origin different from where it is later traded?",
        criteria: [
          "Support changed and preserved details while acknowledging the limits of a reconstruction."
        ],
        focusTarget: "ledger"
      },
      {
        number: 7,
        title: "Restore the final coastal picture",
        output: "A final coastal reconstruction with a saved comparison image.",
        workspace: "Curate the recovered gallery: restore",
        checkpoint: "How do your image changes and source choices support the museum caption?",
        criteria: [
          "Distinguish observed image details from historical claims using dated, relevant evidence."
        ],
        focusTarget: "ledger"
      },
      {
        number: 8,
        title: "Build the recovered gallery",
        output: "An illustrated before-and-after exhibition with editable captions and pinned references.",
        workspace: "Curate the recovered gallery: exhibit",
        checkpoint: "Which supported detail did you preserve, and what uncertainty remains?",
        criteria: [
          "Support changed and preserved details while acknowledging the limits of a reconstruction."
        ],
        focusTarget: "heist"
      }
    ],
    workspaceView: "experience"
  },
  {
    schemaVersion: "1.0",
    planVersion: "1.1.0",
    projectId: "castle-archive-rescue",
    projectVersion: "4.0.0",
    finalProduct: "A collection of tested rescue mechanisms and a working riverboat recipe.",
    grouping: "Two sessions per week: individual exploration, then a group activity. This preview saves local work only; shared editing is deferred.",
    availability: "Every workshop, stage, grade pathway, and final is directly accessible in local authoring preview. Proposed products and tutor questions are planning content; no completion is recorded.",
    evidenceCriteria: [
      "Use grade-appropriate number, proportion, geometry, or measurement reasoning with correct units.",
      "Explain how a solution was checked and transfer the method to a changed lock condition."
    ],
    lessons: [
      {
        number: 1,
        title: "Balance the courtyard gate",
        output: "Three weight arrangements that balance the gate's fraction, decimal, and mixed-number mechanisms.",
        workspace: "The balance vault",
        checkpoint: "Which quantities are equivalent even though their labels look different? Use the pan readings to explain.",
        criteria: [
          "Use grade-appropriate number, proportion, geometry, or measurement reasoning with correct units."
        ],
        focusTarget: "census"
      },
      {
        number: 2,
        title: "Synchronize the patrol wheels",
        output: "A tested crank setting that aligns the lookout's patrol wheels at their first shared opening.",
        workspace: "Patrol synchronizer",
        checkpoint: "When will both patrol wheels align? Why is a later alignment not the first opening?",
        criteria: [
          "Use grade-appropriate number, proportion, geometry, or measurement reasoning with correct units."
        ],
        focusTarget: "lookout"
      },
      {
        number: 3,
        title: "Build the fraction cog",
        output: "A complete fraction cog with one whole of coverage and no overlapping sectors.",
        workspace: "Rabbit courtyard workshop",
        checkpoint: "How do the sectors add to one whole? Why can a sum of one still leave a jammed wheel?",
        criteria: [
          "Use grade-appropriate number, proportion, geometry, or measurement reasoning with correct units."
        ],
        focusTarget: "rabbits"
      },
      {
        number: 4,
        title: "Calibrate the fox gear train",
        output: "A calibrated compound gear train with tested cog sizes and input turns.",
        workspace: "The clockwork fox rescue",
        checkpoint: "How do tooth counts change axle speed and direction? Predict the output before cranking.",
        criteria: [
          "Use grade-appropriate number, proportion, geometry, or measurement reasoning with correct units."
        ],
        focusTarget: "foxes"
      },
      {
        number: 5,
        title: "Aim the moonbeam relay",
        output: "A mirror relay that sends the moonbeam to its receiver around the tower obstacles.",
        workspace: "Moon-tower optics",
        checkpoint: "How does turning a mirror change the outgoing ray? Which angle measurement helps predict its path?",
        criteria: [
          "Explain how a solution was checked and transfer the method to a changed lock condition."
        ],
        focusTarget: "owls"
      },
      {
        number: 6,
        title: "Position and tension the bridge",
        output: "A bridge alignment and cable choice tested in both the positioning engine and tension carriage.",
        workspace: "Bridge engineering workshop",
        checkpoint: "What route or scale measurement determines the cable length? Why do short and slack cables fail differently?",
        criteria: [
          "Explain how a solution was checked and transfer the method to a changed lock condition."
        ],
        focusTarget: "bridge"
      },
      {
        number: 7,
        title: "Raise the sluice float",
        output: "A measured-pour combination that raises the sluice float to its release notch.",
        workspace: "Sluice workshop",
        checkpoint: "How do the vessel labels convert to the chamber's unit? Predict the total before pouring.",
        criteria: [
          "Use grade-appropriate number, proportion, geometry, or measurement reasoning with correct units."
        ],
        focusTarget: "water"
      },
      {
        number: 8,
        title: "Test the riverboat recipe",
        output: "A tested riverboat fuel recipe with the required proportions and total quantity.",
        workspace: "Riverboat workshop",
        checkpoint: "How can a recipe have the right proportions but the wrong total? Check both conditions.",
        criteria: [
          "Use grade-appropriate number, proportion, geometry, or measurement reasoning with correct units.",
          "Explain how a solution was checked and transfer the method to a changed lock condition."
        ],
        focusTarget: "boat"
      }
    ],
    workspaceView: "experience"
  },
  {
    schemaVersion: "1.0",
    planVersion: "1.0.0",
    projectId: "championship-show",
    projectVersion: "1.0.0",
    finalProduct: "championship performance and reasoning record.",
    grouping: "Teams build a shared product; each student explains and defends their own contribution.",
    availability: "The package has four show rounds, not eight lessons. Lessons 1\u20137 prepare and rehearse those rounds; lesson 8 is the complete final show. Keep independent answer defenses alongside local match results.",
    evidenceCriteria: [
      "Show an accurate mathematical method, answer, and units when relevant.",
      "Defend an answer and revise strategy using practice evidence rather than scores alone."
    ],
    lessons: [
      {
        number: 1,
        title: "Explain the opening move",
        output: "Initial mathematical practice and explanation of an answer.",
        workspace: "Opening Move practice",
        checkpoint: "Show how you reached an answer, then solve a fresh problem using the same method.",
        criteria: [
          "Show an accurate mathematical method, answer, and units when relevant."
        ]
      },
      {
        number: 2,
        title: "Plan the team roles",
        output: "Team practice, roles, and starting strategy.",
        workspace: "Team setup and practice roles",
        checkpoint: "Explain your role and a strategy choice. How does it help the team show reasoning?",
        criteria: [
          "Show an accurate mathematical method, answer, and units when relevant."
        ]
      },
      {
        number: 3,
        title: "Practice under a change",
        output: "Targeted practice responding to early difficulties.",
        workspace: "Beat the Buzzer practice",
        checkpoint: "Solve a changed version of an earlier problem and explain the method before considering speed.",
        criteria: [
          "Show an accurate mathematical method, answer, and units when relevant."
        ]
      },
      {
        number: 4,
        title: "Defend practice answers",
        output: "Practice matches and a record of defended answers.",
        workspace: "Practice matches and Make Your Case",
        checkpoint: "Defend a result. If one number changes, which reasoning step must change?",
        criteria: [
          "Show an accurate mathematical method, answer, and units when relevant."
        ]
      },
      {
        number: 5,
        title: "Correct a reasoning error",
        output: "Corrected reasoning and an explanation of a previous error.",
        workspace: "Answer review and targeted practice",
        checkpoint: "Explain a previous error and solve a fresh equivalent problem without hints.",
        criteria: [
          "Defend an answer and revise strategy using practice evidence rather than scores alone."
        ]
      },
      {
        number: 6,
        title: "Rehearse the championship",
        output: "Championship rehearsal and revised team strategy.",
        workspace: "Show rehearsal and Final Wager practice",
        checkpoint: "Defend a revised team strategy using practice evidence. What risk could still make it fail?",
        criteria: [
          "Defend an answer and revise strategy using practice evidence rather than scores alone."
        ]
      },
      {
        number: 7,
        title: "Make an independent case",
        output: "Individual reasoning check and preparation for a defense round.",
        workspace: "Individual defense-round rehearsal",
        checkpoint: "Solve a fresh problem and defend every required step independently.",
        criteria: [
          "Show an accurate mathematical method, answer, and units when relevant."
        ]
      },
      {
        number: 8,
        title: "Run the final show",
        output: "Championship show, selected answer defenses, and reflection.",
        workspace: "Complete championship and reasoning review",
        checkpoint: "Explain your own answer defense, respond to a changed condition, and reflect on the team\u2019s result.",
        criteria: [
          "Show an accurate mathematical method, answer, and units when relevant.",
          "Defend an answer and revise strategy using practice evidence rather than scores alone."
        ]
      }
    ],
    workspaceView: "experience"
  },
  {
    schemaVersion: "1.0",
    planVersion: "1.0.0",
    projectId: "live-strategy-league",
    projectVersion: "1.0.0",
    finalProduct: "league competition and strategy explanation.",
    grouping: "Teams build a shared product; each student explains and defends their own contribution.",
    availability: "Pace the four configured markets across group lessons 2, 4, 6, and 8, with individual analysis before each. Lesson 8 resolves The final call and reviews cumulative results; it does not reset the saved season.",
    evidenceCriteria: [
      "Calculate production cost, revenue, and profit under the round\u2019s constraints.",
      "Compare a forecast with recorded results and justify an adjustment using market evidence."
    ],
    lessons: [
      {
        number: 1,
        title: "Predict a market result",
        output: "Cost/profit practice and an initial prediction.",
        workspace: "League launch and cost/profit practice",
        checkpoint: "Show a production-cost and profit calculation. How does a changed selling price affect the forecast?",
        criteria: [
          "Calculate production cost, revenue, and profit under the round\u2019s constraints."
        ]
      },
      {
        number: 2,
        title: "Find your footing",
        output: "Team strategy and a first practice-round decision record.",
        workspace: "Market 1: Find your footing",
        checkpoint: "Explain your price, production, or marketing contribution and how it fits the team\u2019s cash limit.",
        criteria: [
          "Calculate production cost, revenue, and profit under the round\u2019s constraints."
        ]
      },
      {
        number: 3,
        title: "Read changing demand",
        output: "Explanation of how changing conditions affect a decision.",
        workspace: "Market 2 preview and round history",
        checkpoint: "How should a fresh demand change affect production? Explain the assumption behind your forecast.",
        criteria: [
          "Calculate production cost, revenue, and profit under the round\u2019s constraints."
        ]
      },
      {
        number: 4,
        title: "Adjust to the shift",
        output: "Further practice results and an adjusted strategy.",
        workspace: "Market 2: Read the shift",
        checkpoint: "Compare forecast and actual results. Would your decision still work with less demand?",
        criteria: [
          "Calculate production cost, revenue, and profit under the round\u2019s constraints."
        ]
      },
      {
        number: 5,
        title: "Analyze cost pressure",
        output: "Comparison of predicted and actual outcomes.",
        workspace: "Market 3 preview and profit history",
        checkpoint: "Correct a cost assumption, then calculate a fresh case with higher input costs.",
        criteria: [
          "Compare a forecast with recorded results and justify an adjustment using market evidence."
        ]
      },
      {
        number: 6,
        title: "Rehearse under pressure",
        output: "Market 3 decision/results record and a revised final-round plan supported by round history.",
        workspace: "Market 3: Under pressure",
        checkpoint: "Defend your revision with round history. What happens if production exceeds demand?",
        criteria: [
          "Compare a forecast with recorded results and justify an adjustment using market evidence."
        ]
      },
      {
        number: 7,
        title: "Defend the final call",
        output: "Individual defense of a proposed strategy.",
        workspace: "Market 4 preview and strategy evidence",
        checkpoint: "Independently evaluate a new price or cost condition and defend your recommendation for the final round.",
        criteria: [
          "Calculate production cost, revenue, and profit under the round\u2019s constraints."
        ]
      },
      {
        number: 8,
        title: "Finish the league",
        output: "Final market result, cumulative league record, each student\u2019s strategy defense, and reflection.",
        workspace: "Market 4: The final call and standings",
        checkpoint: "Explain your contribution using the final and cumulative results, then reflect on a forecast that changed.",
        criteria: [
          "Calculate production cost, revenue, and profit under the round\u2019s constraints.",
          "Compare a forecast with recorded results and justify an adjustment using market evidence."
        ]
      }
    ],
    workspaceView: "activity"
  },
  {
    schemaVersion: "1.0",
    planVersion: "1.0.0",
    projectId: "cascade-bay-crisis",
    projectVersion: "1.0.0",
    finalProduct: "response simulation and evidence-based debrief.",
    grouping: "Teams build a shared product; each student explains and defends their own contribution.",
    availability: "The playable response loop has four situation stages. Use lesson checkpoints to review reports and decisions between exercises. A teacher collects the final debrief and individual defenses; a dedicated final submission/showcase is not implemented.",
    evidenceCriteria: [
      "Connect Earth-system processes to reliable map and report evidence.",
      "Justify a response using data, resource constraints, and an explicit tradeoff."
    ],
    lessons: [
      {
        number: 1,
        title: "Read the situation",
        output: "Situation-map observation and report-reliability note.",
        workspace: "Situation map and opening reports",
        checkpoint: "Which observation is verified, and which report needs corroboration before action?",
        criteria: [
          "Connect Earth-system processes to reliable map and report evidence."
        ],
        focusTarget: "room"
      },
      {
        number: 2,
        title: "Set response priorities",
        output: "Shared situation summary, response roles, and initial priorities.",
        workspace: "Roles, situation summary, and crew resources",
        checkpoint: "Explain your proposed priority and supporting report. What would change if fewer crews were available?",
        criteria: [
          "Connect Earth-system processes to reliable map and report evidence."
        ],
        focusTarget: "map"
      },
      {
        number: 3,
        title: "Connect the Earth systems",
        output: "Earth-system connection supported by incoming data.",
        workspace: "River/weather workstation and incoming data",
        checkpoint: "Use fresh gauge or rainfall data to explain a cause-and-consequence link.",
        criteria: [
          "Connect Earth-system processes to reliable map and report evidence."
        ],
        focusTarget: "station"
      },
      {
        number: 4,
        title: "Coordinate the first response",
        output: "First coordinated response, cited reports, and resource decisions.",
        workspace: "Field operations and decision evidence",
        checkpoint: "Defend a resource decision. How would a changed route report alter the response?",
        criteria: [
          "Connect Earth-system processes to reliable map and report evidence."
        ],
        focusTarget: "command"
      },
      {
        number: 5,
        title: "Reassess conflicting reports",
        output: "Revised recommendation based on new or conflicting evidence.",
        workspace: "Updated bulletins and analysis",
        checkpoint: "Explain a recommendation you revised, then assess a fresh conflicting report without hints.",
        criteria: [
          "Justify a response using data, resource constraints, and an explicit tradeoff."
        ],
        focusTarget: "news"
      },
      {
        number: 6,
        title: "Test the next response",
        output: "Response to further developments and comparison of consequences.",
        workspace: "Further developments and consequence review",
        checkpoint: "Defend a revision with report evidence. Which location or service still faces a tradeoff?",
        criteria: [
          "Justify a response using data, resource constraints, and an explicit tradeoff."
        ],
        focusTarget: "command"
      },
      {
        number: 7,
        title: "Defend a response",
        output: "Individual justification of one response and its tradeoff.",
        workspace: "Decision evidence and individual briefing",
        checkpoint: "Use a new resource or flood condition to justify a response independently.",
        criteria: [
          "Connect Earth-system processes to reliable map and report evidence."
        ],
        focusTarget: "command"
      },
      {
        number: 8,
        title: "Deliver the debrief",
        output: "Final response exercise, decision record, and team debrief.",
        workspace: "Response exercise and teacher-collected debrief",
        checkpoint: "Defend your own response using a report, explain its consequence, and reflect on a remaining uncertainty.",
        criteria: [
          "Connect Earth-system processes to reliable map and report evidence.",
          "Justify a response using data, resource constraints, and an explicit tradeoff."
        ],
        focusTarget: "news"
      }
    ],
    workspaceView: "experience"
  },
  {
    schemaVersion: "1.0",
    planVersion: "2.3.0",
    projectId: "exploration-time-repair",
    projectVersion: "2.3.0",
    finalProduct: "A four-week historical investigation: a diagnosed missing event, a cause traced through alternate evidence, a repaired Gutenberg press, and a comparison with documented 1517\u20131518 history.",
    grouping: "Individual investigation followed by a group repair each week. Group work runs on one device; shared editing is not connected.",
    availability: "Eight directly accessible investigations. Mechanical progress saves on this device. AI tutoring, assessment, and shared sessions are not connected.",
    evidenceCriteria: [
      "Infer a missing event from multiple timeline and witness clues.",
      "Use alternate newspapers and interviews to trace a testable cause.",
      "Repair a qualitative printing model with controlled trials.",
      "Distinguish documented evidence, model results, and counterfactual inference."
    ],
    workspaceView: "experience",
    presentation: {
      layout: "activity-first",
      title: "Time Repair: The Missing Reformation",
      identifier: "TR \xB7 03",
      grade: "Grade 7",
      alignmentStatus: "pending",
      alignmentNote: "Ideas That Changed the World is the selected Grade 7 curriculum direction. The supplied standards framework covers Grades 4\u20136; a Grade 7 crosswalk has not been supplied. The learning goals below are project goals, not verified standards."
    },
    lessons: [
      {
        number: 1,
        title: "Find the missing event",
        output: "A tested candidate for the missing event and a clue-by-clue timeline record.",
        workspace: "The archive opens on a wall of fictional newspaper headlines about Luther\u2019s complaints. Inspect each clipping, place a candidate in the missing gap, and test it against the clues. You are not told what disappeared; the headlines and timeline evidence have to convince you.",
        checkpoint: "Which event best explains the hole? What evidence shows the idea existed, and what evidence shows its wider printed circulation is the part missing?",
        criteria: [
          "Infer that a printed debate is the missing event while separating the historical Ninety-five Theses from our fictional absence of circulation."
        ],
        focusTarget: "invention-workspace"
      },
      {
        number: 2,
        title: "Hear the quiet debate",
        output: "A witness board linking three alternate accounts to the missing printed debate.",
        workspace: "Interview a bookseller, a university student, and a church visitor from the alternate timeline. Hear each account, inspect the object they carried, and weigh what their three viewpoints can\u2014and cannot\u2014prove.",
        checkpoint: "What do all three voices share? Which detail is an observation, and which is your inference about why the debate did not spread?",
        criteria: [
          "Use independent witnesses and physical evidence to confirm the missing circulation without turning a fictional interview into a primary source."
        ],
        focusTarget: "invention-workspace"
      },
      {
        number: 3,
        title: "Read the alternate newspapers",
        output: "A press-trail reading supported by inspected alternate newspaper columns.",
        workspace: "Open three newspaper issues from the world without a working press. Inspect two columns in every issue, compare the editions, and trace the physical failure they keep circling without naming.",
        checkpoint: "Which repeated clue points to a process failure rather than a lack of interest? What still happens in this alternate world?",
        criteria: [
          "Identify the failed multiplication process as the cause of the missing printed debate, while distinguishing a newspaper\u2019s report from tested material evidence."
        ],
        focusTarget: "invention-workspace"
      },
      {
        number: 4,
        title: "Interview the failed workshop",
        output: "A cause diagnosis that names a testable fault and its limits.",
        workspace: "Question three workshop voices about the old failure. Hear each account, inspect the object left on the bench, and weigh the evidence before deciding which physical cause is worth testing in Week 3.",
        checkpoint: "Which physical clue can be tested? What would an interview alone fail to establish about Gutenberg\u2019s real workshop?",
        criteria: [
          "Trace the alternate timeline\u2019s cause to ink adhesion and linked press crafts, without treating fictional witnesses as proof of what Gutenberg\u2019s exact workshop looked like."
        ],
        focusTarget: "invention-workspace"
      },
      {
        number: 5,
        title: "Test the failed press",
        output: "Paired material tests and proofs showing which repair conditions work.",
        workspace: "The interviews named a material clue. Test the numbered inks on paper and metal, change pressure one variable at a time, and pull clean proofs. The press opens here because this is the repair week.",
        checkpoint: "Which change fixed the physical symptom? Which historical consequences remain an inference?",
        criteria: [
          "Diagnose the physical failure with controlled material and pressure comparisons."
        ],
        focusTarget: "invention-workspace"
      },
      {
        number: 6,
        title: "Build the Gutenberg system",
        output: "An assembled press and trial evidence showing what each craft contributes.",
        workspace: "Fit the frame, mold, ink ball, and screw into the press. Operate each craft contribution, compare a failed assembly with a clean one, and explain why the repair is a system rather than one magic part.",
        checkpoint: "Which parts had to cooperate before a future printer could multiply Luther\u2019s text? What does the model leave uncertain?",
        criteria: [
          "Learn how linked crafts make movable-type printing repeatable and repair the assembled system."
        ],
        focusTarget: "invention-workspace"
      },
      {
        number: 7,
        title: "Read the history that happened",
        output: "A source-grounded reading of what printing changed and what it could not decide alone.",
        workspace: "Open the surviving-edition desk. Inspect two columns in each historical issue, compare Leipzig, Nuremberg, and Basel, and trace what the real printed record can show about the spread of Luther\u2019s debate.",
        checkpoint: "What do the surviving editions establish? Which parts of the later Protestant Reformation still require people, institutions, conflict, and choice?",
        criteria: [
          "Use surviving print evidence to compare the repaired model with the documented circulation of the Ninety-five Theses."
        ],
        focusTarget: "invention-workspace"
      },
      {
        number: 8,
        title: "Compare the repaired timeline",
        output: "A final timeline comparison distinguishing documented evidence, model results, and counterfactual inference.",
        workspace: "Return to the timeline. Inspect the documented events, switch between the repaired model and the historical record, place the best explanation in the final gap, and test whether your story leaves room for other causes.",
        checkpoint: "Which parts of your repaired story are documented, which came from the model, and which remain a reasonable but unproven counterfactual?",
        criteria: [
          "Explain the relationship between the repaired invention and the real historical spread of Luther\u2019s Ninety-five Theses without making printing the only cause."
        ],
        focusTarget: "invention-workspace"
      }
    ]
  },
  {
    schemaVersion: "1.0",
    planVersion: "1.0.0",
    projectId: "community-story-network",
    projectVersion: "1.0.0",
    finalProduct: "edited multimedia story and Publish Day.",
    grouping: "An editorial team reviews stories while students retain individual bylines and reporting evidence.",
    availability: "This project has an introduction and a mock showcase only. Reporting, drafting, evidence collection, and publication use teacher-arranged tools outside this preview. The lesson tabs provide a classroom plan; they do not publish stories.",
    evidenceCriteria: [
      "Verify a fact or quotation against an identified reporting source.",
      "Explain an editorial choice while distinguishing evidence, interpretation, and uncertainty."
    ],
    lessons: [
      {
        number: 1,
        title: "Find a community story",
        output: "Story idea, background research, and initial interview questions.",
        workspace: "Launch preview; classroom research notebook",
        checkpoint: "Which fact supports your story idea, and which question still needs reporting?",
        criteria: [
          "Verify a fact or quotation against an identified reporting source."
        ]
      },
      {
        number: 2,
        title: "Pitch and plan reporting",
        output: "Editorial pitch, reporting plan, and teacher-supported contact arrangements.",
        workspace: "Classroom editorial meeting and teacher-arranged contacts",
        checkpoint: "Explain your reporting contribution and how your questions could produce verifiable evidence.",
        criteria: [
          "Verify a fact or quotation against an identified reporting source."
        ]
      },
      {
        number: 3,
        title: "Gather the reporting",
        output: "Interview/reporting notes and a verified fact or quotation.",
        workspace: "Classroom interview and source records",
        checkpoint: "Verify a fresh fact or quotation against its source and explain what remains unconfirmed.",
        criteria: [
          "Verify a fact or quotation against an identified reporting source."
        ]
      },
      {
        number: 4,
        title: "Build a rough story",
        output: "First story structure or rough multimedia draft with source records.",
        workspace: "Classroom story draft and source log",
        checkpoint: "Defend a draft claim. How would it change if the source could not confirm a key detail?",
        criteria: [
          "Verify a fact or quotation against an identified reporting source."
        ]
      },
      {
        number: 5,
        title: "Revise the story",
        output: "Revised story contribution supported by reporting evidence.",
        workspace: "Classroom editing and fact checks",
        checkpoint: "Show an unsupported statement you corrected, then assess a fresh statement using the same check.",
        criteria: [
          "Explain an editorial choice while distinguishing evidence, interpretation, and uncertainty."
        ]
      },
      {
        number: 6,
        title: "Review the production",
        output: "Editorial review, fact checks, and a near-final production.",
        workspace: "Classroom editorial review and near-final draft",
        checkpoint: "Defend a revision using reporting evidence. Which perspective or verification gap remains?",
        criteria: [
          "Explain an editorial choice while distinguishing evidence, interpretation, and uncertainty."
        ]
      },
      {
        number: 7,
        title: "Defend the reporting",
        output: "Final bylined contribution and explanation of a reporting choice.",
        workspace: "Individual byline and source defense",
        checkpoint: "Evaluate a new conflicting account and explain how it affects your final contribution.",
        criteria: [
          "Verify a fact or quotation against an identified reporting source."
        ]
      },
      {
        number: 8,
        title: "Hold Publish Day",
        output: "Teacher-approved publication, launch discussion, and reporter reflection.",
        workspace: "Teacher-approved external publication; mock showcase for reference",
        checkpoint: "Defend your bylined contribution with reporting evidence and reflect on what the community audience learned.",
        criteria: [
          "Verify a fact or quotation against an identified reporting source.",
          "Explain an editorial choice while distinguishing evidence, interpretation, and uncertainty."
        ]
      }
    ]
  },
  {
    schemaVersion: "1.0",
    planVersion: "2.0.0",
    projectId: "hammurabi-on-trial",
    projectVersion: "2.0.0",
    finalProduct: "One ongoing debate: opening, three exchanges with individual revisions, same-side critiques, closing and ranked individual performers.",
    grouping: "Odd sessions: individual instruction and revision. Even sessions: exchange with an opposing group or individual; each performer keeps an individual contribution.",
    availability: "All eight sessions and authored examples are freely accessible during testing. Local file exchange; live classroom connection unavailable.",
    workspaceView: "experience",
    evidenceCriteria: [
      "Cited claims and fair responses to a specific opposing argument.",
      "Immutable versions, same-side peer critique and explained revisions.",
      "Individual context defense and justified performer rankings; teacher review required."
    ],
    lessons: [
      {
        number: 1,
        title: "Choose a side \xB7 opening argument",
        output: "Individual opening with ordered points and cited evidence. Begin context evidence for monarchy, empire and social hierarchy.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Explain the link between your claim and a source; distinguish claim from evidence. Begin context evidence for monarchy, empire and social hierarchy.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-1"
      },
      {
        number: 2,
        title: "Exchange 1 \xB7 answer an opponent",
        output: "A rebuttal to an opposing opening, submitted by class end. Explain how one law could promote order and question fairness.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Represent an opponent fairly and explain how your response addresses their point. Explain how one law could promote order and question fairness.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-2"
      },
      {
        number: 3,
        title: "Source clinic \xB7 refine the response",
        output: "An independent revision and a same-side peer critique. Compare royal purpose, polytheism, cuneiform and epic literature.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Explain the purpose and limits of a source, then show how that changes your argument. Compare royal purpose, polytheism, cuneiform and epic literature.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-3"
      },
      {
        number: 4,
        title: "Exchange 2 \xB7 test the rebuttal",
        output: "A response to the opponent\u2019s refined argument, submitted by class end. Separate intended legal protections from evidence of practice.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Defend a rebuttal with relevant evidence and acknowledge a reasonable objection. Separate intended legal protections from evidence of practice.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-4"
      },
      {
        number: 5,
        title: "Reasoning clinic \xB7 strengthen the case",
        output: "A stronger revision with an explanation of changes and peer feedback used. Propose a hypothetical law change, predict effects on two groups and examine architecture separately.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Compare old and new reasoning; explain a change made after critique. Propose a hypothetical law change, predict effects on two groups and examine architecture separately.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-5"
      },
      {
        number: 6,
        title: "Exchange 3 \xB7 answer the strongest case",
        output: "A response to the strongest opposing case, submitted by class end. Answer a competing interpretation using a cited law.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Answer the strongest objection, cite evidence and state a fair concession. Answer a competing interpretation using a cited law.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-6"
      },
      {
        number: 7,
        title: "Closing clinic \xB7 refine and rehearse",
        output: "A refined closing preparation with source limits and a revision trail. Compare unavoidable crop failure with negligent canal damage; revisit all eight civilization concepts.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Explain how your closing weighs conflicting evidence and preserves source limits. Compare unavoidable crop failure with negligent canal damage; revisit all eight civilization concepts.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Preserve individual work and use specific feedback."
        ],
        focusTarget: "debate-session-7"
      },
      {
        number: 8,
        title: "Final exchange \xB7 judge the performers",
        output: "Closing arguments, criterion-based ballots and best individual performer rankings. Complete the independent context defense: monarchy, empire, hierarchy, polytheism, cuneiform, architecture, literature and law.",
        workspace: "Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.",
        checkpoint: "Defend your own closing and justify performer rankings with observed evidence. Teacher review confirms learning. Complete the independent context defense: monarchy, empire, hierarchy, polytheism, cuneiform, architecture, literature and law.",
        criteria: [
          "Cite evidence and explain the reasoning.",
          "Rank observed performances using the rubric."
        ],
        focusTarget: "debate-session-8"
      }
    ],
    presentation: {
      layout: "activity-first",
      title: "Hammurabi on Trial",
      identifier: "LAW",
      grade: "Grade 6",
      alignmentStatus: "pending",
      alignmentNote: "Versioned lesson evidence is mapped in the standards review. Teacher review is required; rankings do not confirm mastery."
    }
  },
  {
    schemaVersion: "1.0",
    planVersion: "1.0.0",
    projectId: "expedition-news-network",
    projectVersion: "1.0.0",
    finalProduct: "An individual informative report and source/revision portfolio, a team news broadcast, and a personal presentation and defense.",
    grouping: "Four instructional/individual lessons and four group sessions across four weeks. Every learner keeps individual evidence.",
    availability: "Local pilot with scripted tutor questions and demo teacher reviews. Official AI assessment, shared team work, and school submission require a server gateway.",
    workspaceView: "activity",
    evidenceCriteria: [
      "FF.G5.ELA.12: Use the fresh reading to identify TWO central ideas, quote accurately, summarize, and explain a relationship among people, events, or ideas. Point to the supporting details.",
      "FF.G5.ELA.19: Show your full report. Explain its topic, facts, definitions, quotation or example, precise language, transitions, helpful formatting, and conclusion. How do these help a reader understand?",
      "FF.G5.ELA.21: Compare your original and revised report. Explain how audience, purpose, a plan, and feedback changed meaning or organization. Show an edit and explain your digital presentation choices.",
      "FF.G5.ELA.22: Show notes from at least two different sources, grouped by topic. Explain why you selected them, distinguish quotations from paraphrases, and connect a cited detail to your report.",
      "FF.G5.ELA.16: Use your group notes to explain how you prepared, followed discussion rules, built on someone\u2019s idea, and summarized and evaluated a speaker\u2019s reasons and evidence. Your teacher also observes the discussion.",
      "FF.G5.ELA.17: Present your own part in a logical order with evidence and a useful visual. Explain how your language suits the audience. A teacher observes your presentation or a recording, or approves an equivalent that demonstrates the same skills."
    ],
    lessons: [
      {
        number: 1,
        title: "Meet the expedition",
        output: "My two central ideas and summary; My first source note",
        workspace: "Read the anchor article. Find two big ideas and details that support them. Start your own source log.",
        checkpoint: "Explain two central ideas in the anchor article. Support them with details, quote one sentence accurately, and explain how changing conditions affected the expedition\u2019s goal.",
        criteria: [
          "Explain two central ideas in the anchor article. Support them with details, quote one sentence accurately, and explain how changing conditions affected the expedition\u2019s goal.",
          "45\u201360 minutes: short model, shared reading, two personal notes (about 80\u2013120 words total), one independent check. Word counts guide effort; they are not pass scores."
        ],
        focusTarget: "inquiry"
      },
      {
        number: 2,
        title: "Plan the newsroom together",
        output: "Our plan \xB7 my copy; My source and listening note",
        workspace: "Choose the question your team will explain. Agree on an audience and roles. Everyone brings one source and explains one useful detail.",
        checkpoint: "E-A: Name a source and its author or organization. Accurately explain a detail, then explain how it helps answer your team\u2019s question. What did you learn from a teammate?",
        criteria: [
          "E-A: Name a source and its author or organization. Accurately explain a detail, then explain how it helps answer your team\u2019s question. What did you learn from a teammate?",
          "45\u201360 minutes: one team outline, one personal source/contribution note, and one E-A check per learner. About 100 words of personal evidence."
        ],
        focusTarget: "inquiry"
      },
      {
        number: 3,
        title: "Gather evidence for the report",
        output: "My organized source log; My evidence paragraph",
        workspace: "Use at least two sources. Sort your notes by topic and write a paragraph that explains a relationship, not just a sequence.",
        checkpoint: "Compare the memoir with the timeline or photo record. Explain what each can establish, and connect a credited detail to a people/event/idea relationship in your paragraph.",
        criteria: [
          "Compare the memoir with the timeline or photo record. Explain what each can establish, and connect a credited detail to a people/event/idea relationship in your paragraph.",
          "45\u201360 minutes: two source entries, one paragraph (roughly 100\u2013150 words), and one individual explanation."
        ],
        focusTarget: "inquiry"
      },
      {
        number: 4,
        title: "Build the first news report",
        output: "My first full report; Our running order and my peer check",
        workspace: "Write your first full report. Together, arrange an opening, evidence sections, and a closing. Check each person\u2019s claims before rehearsal.",
        checkpoint: "E-B: Show your complete first report. Explain two source-supported claims and why the evidence fits. Identify one peer suggestion and evaluate its reason or evidence.",
        criteria: [
          "E-B: Show your complete first report. Explain two source-supported claims and why the evidence fits. Identify one peer suggestion and evaluate its reason or evidence.",
          "45\u201360 minutes: one first report per learner, one team rundown, one personal peer check, one E-B check. A 250\u2013400-word report is a flexible planning estimate."
        ],
        focusTarget: "inquiry"
      },
      {
        number: 5,
        title: "Make the report clearer",
        output: "My revised full report; My revision memo",
        workspace: "Use feedback to make a meaningful revision. Keep the earlier report and explain what changed. This lesson stays available while you repair E-B.",
        checkpoint: "Compare the two versions. Explain one substantive change and one edit. Show how you kept the facts accurate while making the report clearer for your audience.",
        criteria: [
          "Compare the two versions. Explain one substantive change and one edit. Show how you kept the facts accurate while making the report clearer for your audience.",
          "45\u201360 minutes: a revised report and a short revision memo (about 60\u2013100 words), plus one independent check. Revise existing work instead of adding another report."
        ],
        focusTarget: "inquiry"
      },
      {
        number: 6,
        title: "Rehearse at the recording desk",
        output: "My rehearsal and media choice; My listening and revision note",
        workspace: "Rehearse the team broadcast. Each person presents, uses a helpful visual, listens, and gives evidence-based feedback. Open the recording desk below when ready.",
        checkpoint: "Present a short part in person or on a recording. Explain your visual choice and summarize and evaluate a teammate\u2019s reasoning. Your teacher observes the performance as well as reading your response.",
        criteria: [
          "Present a short part in person or on a recording. Explain your visual choice and summarize and evaluate a teammate\u2019s reasoning. Your teacher observes the performance as well as reading your response.",
          "45\u201360 minutes: one short presentation per learner, two personal notes, and one team rehearsal of roughly 3\u20135 minutes. Shorter supported practice is available."
        ],
        focusTarget: "inquiry"
      },
      {
        number: 7,
        title: "Defend your final report",
        output: "My final report and source credits; My fresh reading and source defense",
        workspace: "Read the new passage on preparing the James Caird. Complete your personal defense and gather your final report, sources, and revision memo.",
        checkpoint: "E-C: Using \u201CPreparing a small boat for a large task,\u201D explain two central ideas with details and a relationship. Quote accurately and summarize. Defend your sources and show a final report plus a meaningful revision trail.",
        criteria: [
          "E-C: Using \u201CPreparing a small boat for a large task,\u201D explain two central ideas with details and a relationship. Quote accurately and summarize. Defend your sources and show a final report plus a meaningful revision trail.",
          "45\u201360 minutes: one final portfolio check and one personal defense. Refine the existing 250\u2013400-word report; do not require a new report."
        ],
        focusTarget: "inquiry"
      },
      {
        number: 8,
        title: "Share the expedition news",
        output: "My final presentation evidence; My reflection",
        workspace: "Present the final team broadcast. Every person shares their own section, answers a question, and reflects on what the evidence changed.",
        checkpoint: "Present and answer an audience question with evidence. Explain how your media and delivery helped listeners, then reflect on a teammate\u2019s reasoning and your own contribution.",
        criteria: [
          "Present and answer an audience question with evidence. Explain how your media and delivery helped listeners, then reflect on a teammate\u2019s reasoning and your own contribution.",
          "45\u201360 minutes: one 3\u20135 minute team broadcast, a short individual defense and reflection, and final teacher review. Presentation time is a planning guide, not an automatic score."
        ],
        focusTarget: "inquiry"
      }
    ]
  }
];

// src/app/shared/project-lessons/project-lesson.models.ts
var lessonStages = [
  {
    label: "Launch",
    week: 1,
    format: "Live + individual",
    task: "Watch the teacher model the first skill, then make your own attempt.",
    evidence: "Keep your initial attempt and your independent response, including any support needed.",
    teacher: "Model the core skill and check the prerequisite before the dependent tool or challenge.",
    check: "Identify the key information and explain one step without hints."
  },
  {
    label: "Plan",
    week: 1,
    format: "Group work",
    task: "Agree on a manageable plan and name a contribution for every person.",
    evidence: "Keep the shared plan and a separate explanation from every member.",
    teacher: "Check roles and scope. Verify each student\u2019s prerequisite before their dependent task.",
    check: "Explain your own choice and the evidence behind it. Each member answers independently."
  },
  {
    label: "Evidence",
    week: 2,
    format: "Live + individual",
    task: "Practice the next method and create one contribution the project can use.",
    evidence: "Keep your individual artifact and response to a fresh example.",
    teacher: "Teach the next method and review accuracy before the next committed action.",
    check: "Apply the method to a fresh example and explain how the evidence supports your answer."
  },
  {
    label: "First version",
    week: 2,
    format: "Group work",
    task: "Combine contributions and test the first version together.",
    evidence: "Keep the first product or trial and each person\u2019s separate checkpoint response.",
    teacher: "Verify the calculation, test plan, or source claim before committing the next action.",
    check: "Explain a result or decision, then respond when one condition changes."
  },
  {
    label: "Revise",
    week: 3,
    format: "Live + individual",
    task: "Use feedback to revise one contribution and explain what changed.",
    evidence: "Keep the earlier work, the revision, and an independent recheck.",
    teacher: "Reteach the weak concept. Resolve critical evidence gaps with a fresh recheck.",
    check: "Explain the correction, then apply the skill to a new question without hints."
  },
  {
    label: "Rehearse",
    week: 3,
    format: "Group work",
    task: "Rehearse or playtest, use feedback, and improve the near-final work.",
    evidence: "Keep the near-final version, feedback, and each member\u2019s defense of a change.",
    teacher: "Check that every member uses feedback and contributes. Recheck critical gaps before final rehearsal.",
    check: "Defend a change using test or peer evidence. Consider a counterexample or limitation."
  },
  {
    label: "Defend",
    week: 4,
    format: "Live + individual",
    task: "Complete a short transfer task and select evidence for your final defense.",
    evidence: "Keep the individual transfer response, selected proof, and any remaining gap for teacher review.",
    teacher: "Review open targets and final readiness against every required criterion.",
    check: "Use a new case to show independent reasoning against the target criteria."
  },
  {
    label: "Final",
    week: 4,
    format: "Group showcase",
    task: "Present the final product or complete the final challenge, then reflect on your contribution.",
    evidence: "Keep the final product, each person\u2019s defense, and an individual reflection.",
    teacher: "Review the product and every student\u2019s defense before confirming standards.",
    check: "Answer a personal defense question about your work. Teacher review confirms the learning."
  }
];
function lessonNumber(value) {
  return value !== null && /^[1-8]$/.test(value) ? Number(value) : 1;
}
function lessonWeek(plan, number) {
  return plan?.lessons[number - 1]?.week ?? Math.ceil(number / 2);
}
function validateLessonPlan(value) {
  const fail = () => {
    throw new Error("LESSON_PLAN_INVALID: Expected a versioned plan with eight ordered lessons.");
  };
  const record = (item) => typeof item === "object" && item !== null && !Array.isArray(item);
  const text = (item) => typeof item === "string" && item.trim().length > 0;
  if (!record(value) || value["schemaVersion"] !== "1.0") return fail();
  for (const field of [
    "projectId",
    "projectVersion",
    "planVersion",
    "finalProduct",
    "grouping",
    "availability"
  ]) {
    if (!text(value[field])) return fail();
  }
  if (!/^[a-z0-9][a-z0-9-]*$/.test(String(value["projectId"]))) return fail();
  for (const field of ["projectVersion", "planVersion"]) {
    if (!/^\d+\.\d+\.\d+$/.test(String(value[field]))) return fail();
  }
  if (value["workspaceView"] !== void 0 && !["experience", "activity"].includes(String(value["workspaceView"])))
    return fail();
  if (value["presentation"] !== void 0) {
    const p = value["presentation"];
    if (!record(p) || p["layout"] !== "activity-first" || p["alignmentStatus"] !== "pending" || !["title", "identifier", "grade", "alignmentNote"].every((key) => text(p[key]))) return fail();
  }
  if (!Array.isArray(value["evidenceCriteria"]) || value["evidenceCriteria"].length === 0 || !value["evidenceCriteria"].every(text))
    return fail();
  if (!Array.isArray(value["lessons"]) || value["lessons"].length !== 8) return fail();
  for (const [index, item] of value["lessons"].entries()) {
    if (!record(item) || item["number"] !== index + 1) return fail();
    if (item["week"] !== void 0 && (!Number.isInteger(item["week"]) || Number(item["week"]) < 1 || Number(item["week"]) > 8)) return fail();
    if (!["title", "output", "workspace", "checkpoint"].every((field) => text(item[field])))
      return fail();
    if (item["focusTarget"] !== void 0 && (!text(item["focusTarget"]) || !/^[a-z][a-z0-9-]*$/.test(item["focusTarget"])))
      return fail();
    if (!Array.isArray(item["criteria"]) || item["criteria"].length < 1 || item["criteria"].length > 2 || !item["criteria"].every(text))
      return fail();
  }
  return value;
}

// src/app/runtime/project-launch/project-lesson.registry.ts
var ProjectLessonRegistry = class {
  entries = /* @__PURE__ */ new Map();
  constructor(values) {
    for (const value of values) {
      const plan = validateLessonPlan(value);
      const key = `${plan.projectId}@${plan.projectVersion}`;
      if (this.entries.has(key)) throw new Error(`LESSON_PLAN_DUPLICATE: ${key}`);
      this.entries.set(
        key,
        Object.freeze(__spreadProps(__spreadValues(__spreadValues({}, plan), plan.presentation ? { presentation: Object.freeze(__spreadValues({}, plan.presentation)) } : {}), {
          evidenceCriteria: Object.freeze([...plan.evidenceCriteria]),
          lessons: Object.freeze(
            plan.lessons.map(
              (lesson) => Object.freeze(__spreadProps(__spreadValues({}, lesson), { criteria: Object.freeze([...lesson.criteria]) }))
            )
          )
        }))
      );
    }
  }
  find(projectId, projectVersion) {
    return this.entries.get(`${projectId}@${projectVersion}`);
  }
};
var projectLessonRegistry = new ProjectLessonRegistry(project_lesson_plans_default);

// src/app/shared/project-lessons/project-lesson-nav.component.ts
var _c0 = (a0) => ({ lesson: a0 });
var _c1 = (a0) => ({ lesson: a0, lessonPlan: null });
var _forTrack0 = ($index, $item) => $item.week;
var _forTrack1 = ($index, $item) => $item.number;
function ProjectLessonNavComponent_Conditional_0_For_10_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lesson_r1 = ctx.$implicit;
    const group_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", ctx_r2.route())("queryParams", \u0275\u0275pureFunction1(6, _c0, lesson_r1.number))("title", lesson_r1.title);
    \u0275\u0275attribute("aria-current", !ctx_r2.finalExampleActive() && ctx_r2.selected() === lesson_r1.number ? "step" : null)("aria-label", "Week " + group_r2.week + ", lesson " + lesson_r1.number + ": " + lesson_r1.title + ", " + lesson_r1.kind);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(lesson_r1.number);
  }
}
function ProjectLessonNavComponent_Conditional_0_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div");
    \u0275\u0275repeaterCreate(4, ProjectLessonNavComponent_Conditional_0_For_10_For_5_Template, 2, 8, "a", 11, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Week ", group_r2.week);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(group_r2.lessons);
  }
}
function ProjectLessonNavComponent_Conditional_0_For_17_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 13);
    \u0275\u0275listener("click", function ProjectLessonNavComponent_Conditional_0_For_17_For_3_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      \u0275\u0275nextContext(2);
      const weekMenu_r5 = \u0275\u0275reference(12);
      return \u0275\u0275resetView(weekMenu_r5.open = false);
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lesson_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("routerLink", ctx_r2.route())("queryParams", \u0275\u0275pureFunction1(5, _c0, lesson_r6.number));
    \u0275\u0275attribute("aria-current", !ctx_r2.finalExampleActive() && ctx_r2.selected() === lesson_r6.number ? "step" : null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", lesson_r6.number, " \xB7 ", lesson_r6.title);
  }
}
function ProjectLessonNavComponent_Conditional_0_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(2, ProjectLessonNavComponent_Conditional_0_For_17_For_3_Template, 2, 7, "a", 12, _forTrack1);
  }
  if (rf & 2) {
    const group_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Week ", group_r7.week);
    \u0275\u0275advance();
    \u0275\u0275repeater(group_r7.lessons);
  }
}
function ProjectLessonNavComponent_Conditional_0_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 14);
    \u0275\u0275listener("click", function ProjectLessonNavComponent_Conditional_0_Conditional_18_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      \u0275\u0275nextContext();
      const weekMenu_r5 = \u0275\u0275reference(12);
      return \u0275\u0275resetView(weekMenu_r5.open = false);
    });
    \u0275\u0275text(1, "Final example \u2197");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("routerLink", ctx);
  }
}
function ProjectLessonNavComponent_Conditional_0_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 10);
    \u0275\u0275text(1, "Example \u2197");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", ctx);
    \u0275\u0275attribute("aria-current", ctx_r2.finalExampleActive() ? "page" : null);
  }
}
function ProjectLessonNavComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "header", 1)(1, "a", 2);
    \u0275\u0275text(2, "\u2190");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h1");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "nav", 4);
    \u0275\u0275repeaterCreate(9, ProjectLessonNavComponent_Conditional_0_For_10_Template, 6, 1, "div", 5, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "details", 6, 0)(13, "summary", 7);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "nav", 8);
    \u0275\u0275repeaterCreate(16, ProjectLessonNavComponent_Conditional_0_For_17_Template, 4, 1, null, null, _forTrack0);
    \u0275\u0275conditionalCreate(18, ProjectLessonNavComponent_Conditional_0_Conditional_18_Template, 2, 1, "a", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(19, ProjectLessonNavComponent_Conditional_0_Conditional_19_Template, 2, 2, "a", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_8_0;
    let tmp_9_0;
    const presentation_r9 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", presentation_r9.identifier, " \xB7 ", presentation_r9.grade);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(presentation_r9.title);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.weekGroups());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("Week ", ctx_r2.selectedWeek(), " \xB7 ", ctx_r2.selected(), " \u2304");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.weekGroups());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_8_0 = ctx_r2.finalExampleRoute()) ? 18 : -1, tmp_8_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_9_0 = ctx_r2.finalExampleRoute()) ? 19 : -1, tmp_9_0);
  }
}
function ProjectLessonNavComponent_Conditional_1_For_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Selected");
    \u0275\u0275elementEnd();
  }
}
function ProjectLessonNavComponent_Conditional_1_For_8_For_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "\u2713 Selected");
    \u0275\u0275elementEnd();
  }
}
function ProjectLessonNavComponent_Conditional_1_For_8_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 25)(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ProjectLessonNavComponent_Conditional_1_For_8_For_6_Conditional_5_Template, 2, 0, "small");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lesson_r10 = ctx.$implicit;
    const group_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", ctx_r2.route())("queryParams", \u0275\u0275pureFunction1(8, _c1, lesson_r10.number))("title", lesson_r10.title);
    \u0275\u0275attribute("aria-current", !ctx_r2.finalExampleActive() && ctx_r2.selected() === lesson_r10.number ? "step" : null)("aria-label", "Week " + group_r11.week + ", Lesson " + lesson_r10.number + ": " + lesson_r10.title + ", " + lesson_r10.kind);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lesson_r10.kind);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Lesson ", lesson_r10.number);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.finalExampleActive() && ctx_r2.selected() === lesson_r10.number ? 5 : -1);
  }
}
function ProjectLessonNavComponent_Conditional_1_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, ProjectLessonNavComponent_Conditional_1_For_8_Conditional_3_Template, 2, 0, "small");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 24);
    \u0275\u0275repeaterCreate(5, ProjectLessonNavComponent_Conditional_1_For_8_For_6_Template, 6, 10, "a", 25, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected-week", !ctx_r2.finalExampleActive() && ctx_r2.selectedWeek() === group_r11.week);
    \u0275\u0275attribute("aria-label", "Week " + group_r11.week);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Week ", group_r11.week, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.finalExampleActive() && ctx_r2.selectedWeek() === group_r11.week ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(group_r11.lessons);
  }
}
function ProjectLessonNavComponent_Conditional_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 20);
    \u0275\u0275text(1, " Final example ");
    \u0275\u0275elementStart(2, "span", 17);
    \u0275\u0275text(3, "\u2197");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", ctx);
    \u0275\u0275attribute("aria-current", ctx_r2.finalExampleActive() ? "page" : null);
  }
}
function ProjectLessonNavComponent_Conditional_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275text(1, " Final example ");
    \u0275\u0275elementEnd();
  }
}
function ProjectLessonNavComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "header")(1, "div", 15)(2, "a", 16)(3, "span", 17);
    \u0275\u0275text(4, "\u2190");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Return to projects");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "nav", 18);
    \u0275\u0275repeaterCreate(7, ProjectLessonNavComponent_Conditional_1_For_8_Template, 7, 5, "div", 19, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, ProjectLessonNavComponent_Conditional_1_Conditional_9_Template, 4, 2, "a", 20)(10, ProjectLessonNavComponent_Conditional_1_Conditional_10_Template, 2, 0, "button", 21);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r2.weekGroups());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_2_0 = ctx_r2.finalExampleRoute()) ? 9 : 10, tmp_2_0);
  }
}
var ProjectLessonNavComponent = class _ProjectLessonNavComponent {
  plan = input(
    ...ngDevMode ? [void 0, { debugName: "plan" }] : (
      /* istanbul ignore next */
      []
    )
  );
  route = input.required(
    ...ngDevMode ? [{ debugName: "route" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = input.required(
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finalExampleRoute = input(
    null,
    ...ngDevMode ? [{ debugName: "finalExampleRoute" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finalExampleActive = input(
    false,
    ...ngDevMode ? [{ debugName: "finalExampleActive" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedWeek = computed(
    () => lessonWeek(this.plan(), this.selected()),
    ...ngDevMode ? [{ debugName: "selectedWeek" }] : (
      /* istanbul ignore next */
      []
    )
  );
  weeks = computed(
    () => [...new Set(lessonStages.map((_, index) => lessonWeek(this.plan(), index + 1)))],
    ...ngDevMode ? [{ debugName: "weeks" }] : (
      /* istanbul ignore next */
      []
    )
  );
  weekGroups = computed(
    () => this.weeks().map((week) => ({
      week,
      lessons: lessonStages.flatMap((stage, index) => lessonWeek(this.plan(), index + 1) === week ? [{
        number: index + 1,
        kind: this.plan()?.lessons[index]?.week ? "Weekly session" : index % 2 === 0 ? "Individual" : "Group",
        title: this.plan()?.lessons[index]?.title ?? stage.label
      }] : [])
    })),
    ...ngDevMode ? [{ debugName: "weekGroups" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function ProjectLessonNavComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectLessonNavComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectLessonNavComponent, selectors: [["app-project-lesson-nav"]], hostVars: 2, hostBindings: function ProjectLessonNavComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("activity-first", ctx.plan()?.presentation?.layout === "activity-first");
    }
  }, inputs: { plan: [1, "plan"], route: [1, "route"], selected: [1, "selected"], finalExampleRoute: [1, "finalExampleRoute"], finalExampleActive: [1, "finalExampleActive"] }, decls: 2, vars: 1, consts: [["weekMenu", ""], [1, "compact-shell"], ["routerLink", "/projects", "aria-label", "Return to projects", 1, "compact-return"], [1, "compact-identity"], ["aria-label", "Project weeks and sessions", 1, "compact-weeks"], [1, "compact-week"], [1, "compact-menu"], ["aria-label", "Choose week or session"], ["aria-label", "Choose a lesson"], [3, "routerLink"], [1, "compact-example", 3, "routerLink"], [3, "routerLink", "queryParams", "title"], [3, "routerLink", "queryParams"], [3, "click", "routerLink", "queryParams"], [3, "click", "routerLink"], [1, "primary-row"], ["routerLink", "/projects", 1, "return-link"], ["aria-hidden", "true"], ["aria-label", "Project weeks", 1, "weeks"], ["role", "group", 1, "week-button", 3, "selected-week"], [1, "final-example", 3, "routerLink"], ["disabled", "", "title", "Final example not yet available for this project", 1, "final-example"], ["role", "group", 1, "week-button"], [1, "week-label"], [1, "lessons"], ["queryParamsHandling", "merge", 3, "routerLink", "queryParams", "title"]], template: function ProjectLessonNavComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ProjectLessonNavComponent_Conditional_0_Template, 20, 7, "header", 1)(1, ProjectLessonNavComponent_Conditional_1_Template, 11, 1, "header");
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = ctx.plan()?.presentation) ? 0 : 1, tmp_0_0);
    }
  }, dependencies: [RouterLink], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  position: sticky;\n  top: 0;\n  z-index: 75;\n  color: #eaf6f6;\n  background: #102b35;\n  box-shadow: 0 2px 10px rgba(0, 20, 28, 0.1882352941);\n  font: 600 13px/1.4 Arial, sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.primary-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(140px, 1fr) minmax(0, 800px) minmax(140px, 1fr);\n  align-items: center;\n  gap: 12px;\n  height: 112px;\n  padding: 8px 16px;\n}\na[_ngcontent-%COMP%], \nbutton[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 44px;\n  padding: 8px;\n  border: 1px solid transparent;\n  border-radius: 8px;\n  color: inherit;\n  background: transparent;\n  font: inherit;\n  text-decoration: none;\n}\na[_ngcontent-%COMP%]:hover {\n  background: #22434f;\n}\na[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #76e8d5;\n  outline-offset: -3px;\n}\n.return-link[_ngcontent-%COMP%] {\n  justify-self: start;\n  gap: 8px;\n}\n.final-example[_ngcontent-%COMP%] {\n  justify-self: end;\n  border-color: #69868e;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  color: #9bb2ba;\n  cursor: not-allowed;\n}\n.weeks[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 8px;\n}\n.week-button[_ngcontent-%COMP%] {\n  border: 1px solid #69868e;\n  border-radius: 9px;\n  overflow: hidden;\n}\n.week-label[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n  padding: 3px;\n  background: #1c3a45;\n}\n.week-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n}\n.selected-week[_ngcontent-%COMP%] {\n  border-color: #a4f2dc;\n  box-shadow: 0 0 0 1px #a4f2dc;\n}\n.selected-week[_ngcontent-%COMP%]   .week-label[_ngcontent-%COMP%] {\n  background: #a4f2dc;\n  color: #102b35;\n}\n.lessons[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.lessons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  flex-direction: column;\n  border-radius: 0;\n  padding: 4px;\n  min-height: 62px;\n  font-size: 12px;\n}\n.lessons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]    + a[_ngcontent-%COMP%] {\n  border-left: 1px solid #69868e;\n}\n.lessons[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 400;\n}\n.lessons[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n}\na[aria-current][_ngcontent-%COMP%] {\n  background: #2d665e;\n  color: #fff;\n  box-shadow: inset 0 -4px #a4f2dc;\n}\n@media (max-width: 1100px) {\n  .primary-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    grid-template-areas: "back final" "weeks weeks";\n    height: 152px;\n    gap: 4px;\n    padding: 4px 10px;\n  }\n  .return-link[_ngcontent-%COMP%] {\n    grid-area: back;\n  }\n  .final-example[_ngcontent-%COMP%] {\n    grid-area: final;\n  }\n  .weeks[_ngcontent-%COMP%] {\n    grid-area: weeks;\n    width: 100%;\n    max-width: 800px;\n    justify-self: center;\n    gap: 5px;\n  }\n}\n@media (max-width: 600px) {\n  .primary-row[_ngcontent-%COMP%] {\n    height: 250px;\n  }\n  .weeks[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 8px;\n  }\n}\n.activity-first[_nghost-%COMP%] {\n  background: #172c30;\n  box-shadow: none;\n}\n.compact-shell[_ngcontent-%COMP%] {\n  min-height: 68px;\n  padding: 4px 20px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.compact-return[_ngcontent-%COMP%] {\n  font-size: 22px;\n  width: 40px;\n  flex-shrink: 0;\n  padding: 0;\n}\n.compact-identity[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n}\n.compact-identity[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  color: #b1c2bf;\n  letter-spacing: 0.08em;\n}\n.compact-identity[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font: 600 15px/1.3 Georgia, serif;\n  margin: 3px 0;\n}\n.compact-weeks[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n}\n.compact-week[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  color: #b1c2bf;\n  text-align: center;\n  font-size: 10px;\n}\n.compact-week[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n}\n.compact-week[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  width: 36px;\n  min-height: 36px;\n  padding: 0;\n  border-radius: 50%;\n  margin: 0 2px;\n}\n.compact-week[_ngcontent-%COMP%]   a[aria-current][_ngcontent-%COMP%] {\n  background: #eac17c;\n  color: #172c30;\n  box-shadow: none;\n}\n.compact-example[_ngcontent-%COMP%] {\n  font-size: 11px;\n  border: 1px solid #536669;\n  margin-left: 10px;\n}\n.compact-menu[_ngcontent-%COMP%] {\n  display: none;\n  position: relative;\n}\n.compact-menu[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 44px;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  font-size: 12px;\n}\n.compact-menu[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  top: 100%;\n  width: min(300px, 86vw);\n  max-height: 72dvh;\n  overflow: auto;\n  padding: 12px;\n  border: 1px solid #607977;\n  background: #172c30;\n  border-radius: 10px;\n  box-shadow: 0 16px 32px rgba(7, 26, 43, 0.3333333333);\n}\n.compact-menu[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #eac17c;\n  padding: 8px;\n  font-size: 11px;\n}\n.compact-menu[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  justify-content: start;\n  font-size: 12px;\n}\n.compact-menu[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #eac17c;\n  outline-offset: 3px;\n}\n@media (max-width: 1000px) {\n  .compact-weeks[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .compact-menu[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n@media (max-width: 600px) {\n  .compact-shell[_ngcontent-%COMP%] {\n    padding: 5px 10px;\n    gap: 7px;\n  }\n  .compact-identity[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .compact-identity[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .compact-example[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .compact-return[_ngcontent-%COMP%] {\n    width: 28px;\n  }\n}\n/*# sourceMappingURL=project-lesson-nav.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectLessonNavComponent, [{
    type: Component,
    args: [{ selector: "app-project-lesson-nav", imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, host: { "[class.activity-first]": "plan()?.presentation?.layout === 'activity-first'" }, template: `@if (plan()?.presentation; as presentation) {
  <header class="compact-shell">
    <a class="compact-return" routerLink="/projects" aria-label="Return to projects">\u2190</a>
    <div class="compact-identity"><span>{{ presentation.identifier }} \xB7 {{ presentation.grade }}</span><h1>{{ presentation.title }}</h1></div>
    <nav class="compact-weeks" aria-label="Project weeks and sessions">
      @for (group of weekGroups(); track group.week) {
        <div class="compact-week"><span>Week {{ group.week }}</span><div>
          @for (lesson of group.lessons; track lesson.number) {
            <a [routerLink]="route()" [queryParams]="{ lesson: lesson.number }" [attr.aria-current]="!finalExampleActive() && selected() === lesson.number ? 'step' : null" [attr.aria-label]="'Week ' + group.week + ', lesson ' + lesson.number + ': ' + lesson.title + ', ' + lesson.kind" [title]="lesson.title">{{ lesson.number }}</a>
          }
        </div></div>
      }
    </nav>
    <details class="compact-menu" #weekMenu><summary aria-label="Choose week or session">Week {{ selectedWeek() }} \xB7 {{ selected() }} \u2304</summary><nav aria-label="Choose a lesson">
      @for (group of weekGroups(); track group.week) {
        <strong>Week {{ group.week }}</strong>
        @for (lesson of group.lessons; track lesson.number) {
          <a [routerLink]="route()" [queryParams]="{ lesson: lesson.number }" (click)="weekMenu.open = false" [attr.aria-current]="!finalExampleActive() && selected() === lesson.number ? 'step' : null">{{ lesson.number }} \xB7 {{ lesson.title }}</a>
        }
      }
      @if (finalExampleRoute(); as exampleRoute) { <a [routerLink]="exampleRoute" (click)="weekMenu.open = false">Final example \u2197</a> }
    </nav></details>
    @if (finalExampleRoute(); as exampleRoute) { <a class="compact-example" [routerLink]="exampleRoute" [attr.aria-current]="finalExampleActive() ? 'page' : null">Example \u2197</a> }
  </header>
} @else {
<header>
  <div class="primary-row">\r
    <a class="return-link" routerLink="/projects"\r
      ><span aria-hidden="true">\u2190</span> Return to projects</a\r
    >\r
    <nav class="weeks" aria-label="Project weeks">\r
      @for (group of weekGroups(); track group.week) {\r
        <div class="week-button" [class.selected-week]="!finalExampleActive() && selectedWeek() === group.week" role="group" [attr.aria-label]="'Week ' + group.week">\r
          <div class="week-label">Week {{ group.week }} @if (!finalExampleActive() && selectedWeek() === group.week) { <small>Selected</small> }</div>\r
          <div class="lessons">\r
            @for (lesson of group.lessons; track lesson.number) {\r
              <a [routerLink]="route()" queryParamsHandling="merge" [queryParams]="{ lesson: lesson.number, lessonPlan: null }"\r
                [attr.aria-current]="!finalExampleActive() && selected() === lesson.number ? 'step' : null"\r
                [attr.aria-label]="'Week ' + group.week + ', Lesson ' + lesson.number + ': ' + lesson.title + ', ' + lesson.kind" [title]="lesson.title">\r
                <b>{{ lesson.kind }}</b><span>Lesson {{ lesson.number }}</span>\r
                @if (!finalExampleActive() && selected() === lesson.number) { <small>\u2713 Selected</small> }\r
              </a>\r
            }\r
          </div>\r
        </div>\r
      }\r
    </nav>\r
    @if (finalExampleRoute(); as exampleRoute) {\r
      <a\r
        class="final-example"\r
        [routerLink]="exampleRoute"\r
        [attr.aria-current]="finalExampleActive() ? 'page' : null"\r
      >\r
        Final example <span aria-hidden="true">\u2197</span>\r
      </a>\r
    } @else {\r
      <button\r
        class="final-example"\r
        disabled\r
        title="Final example not yet available for this project"\r
      >\r
        Final example\r
      </button>\r
    }\r
  </div>\r
</header>
}
`, styles: ['/* src/app/shared/project-lessons/project-lesson-nav.component.scss */\n:host {\n  display: block;\n  position: sticky;\n  top: 0;\n  z-index: 75;\n  color: #eaf6f6;\n  background: #102b35;\n  box-shadow: 0 2px 10px rgba(0, 20, 28, 0.1882352941);\n  font: 600 13px/1.4 Arial, sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.primary-row {\n  display: grid;\n  grid-template-columns: minmax(140px, 1fr) minmax(0, 800px) minmax(140px, 1fr);\n  align-items: center;\n  gap: 12px;\n  height: 112px;\n  padding: 8px 16px;\n}\na,\nbutton {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 44px;\n  padding: 8px;\n  border: 1px solid transparent;\n  border-radius: 8px;\n  color: inherit;\n  background: transparent;\n  font: inherit;\n  text-decoration: none;\n}\na:hover {\n  background: #22434f;\n}\na:focus-visible {\n  outline: 3px solid #76e8d5;\n  outline-offset: -3px;\n}\n.return-link {\n  justify-self: start;\n  gap: 8px;\n}\n.final-example {\n  justify-self: end;\n  border-color: #69868e;\n}\nbutton:disabled {\n  color: #9bb2ba;\n  cursor: not-allowed;\n}\n.weeks {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 8px;\n}\n.week-button {\n  border: 1px solid #69868e;\n  border-radius: 9px;\n  overflow: hidden;\n}\n.week-label {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n  padding: 3px;\n  background: #1c3a45;\n}\n.week-label small {\n  font-size: 10px;\n}\n.selected-week {\n  border-color: #a4f2dc;\n  box-shadow: 0 0 0 1px #a4f2dc;\n}\n.selected-week .week-label {\n  background: #a4f2dc;\n  color: #102b35;\n}\n.lessons {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.lessons a {\n  flex-direction: column;\n  border-radius: 0;\n  padding: 4px;\n  min-height: 62px;\n  font-size: 12px;\n}\n.lessons a + a {\n  border-left: 1px solid #69868e;\n}\n.lessons span {\n  font-size: 11px;\n  font-weight: 400;\n}\n.lessons small {\n  font-size: 10px;\n}\na[aria-current] {\n  background: #2d665e;\n  color: #fff;\n  box-shadow: inset 0 -4px #a4f2dc;\n}\n@media (max-width: 1100px) {\n  .primary-row {\n    grid-template-columns: 1fr 1fr;\n    grid-template-areas: "back final" "weeks weeks";\n    height: 152px;\n    gap: 4px;\n    padding: 4px 10px;\n  }\n  .return-link {\n    grid-area: back;\n  }\n  .final-example {\n    grid-area: final;\n  }\n  .weeks {\n    grid-area: weeks;\n    width: 100%;\n    max-width: 800px;\n    justify-self: center;\n    gap: 5px;\n  }\n}\n@media (max-width: 600px) {\n  .primary-row {\n    height: 250px;\n  }\n  .weeks {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 8px;\n  }\n}\n:host.activity-first {\n  background: #172c30;\n  box-shadow: none;\n}\n.compact-shell {\n  min-height: 68px;\n  padding: 4px 20px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.compact-return {\n  font-size: 22px;\n  width: 40px;\n  flex-shrink: 0;\n  padding: 0;\n}\n.compact-identity {\n  min-width: 0;\n  flex: 1;\n}\n.compact-identity span {\n  display: block;\n  font-size: 10px;\n  color: #b1c2bf;\n  letter-spacing: 0.08em;\n}\n.compact-identity h1 {\n  font: 600 15px/1.3 Georgia, serif;\n  margin: 3px 0;\n}\n.compact-weeks {\n  display: flex;\n  gap: 14px;\n}\n.compact-week > span {\n  display: block;\n  color: #b1c2bf;\n  text-align: center;\n  font-size: 10px;\n}\n.compact-week > div {\n  display: flex;\n}\n.compact-week a {\n  width: 36px;\n  min-height: 36px;\n  padding: 0;\n  border-radius: 50%;\n  margin: 0 2px;\n}\n.compact-week a[aria-current] {\n  background: #eac17c;\n  color: #172c30;\n  box-shadow: none;\n}\n.compact-example {\n  font-size: 11px;\n  border: 1px solid #536669;\n  margin-left: 10px;\n}\n.compact-menu {\n  display: none;\n  position: relative;\n}\n.compact-menu summary {\n  cursor: pointer;\n  min-height: 44px;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  font-size: 12px;\n}\n.compact-menu nav {\n  position: absolute;\n  right: 0;\n  top: 100%;\n  width: min(300px, 86vw);\n  max-height: 72dvh;\n  overflow: auto;\n  padding: 12px;\n  border: 1px solid #607977;\n  background: #172c30;\n  border-radius: 10px;\n  box-shadow: 0 16px 32px rgba(7, 26, 43, 0.3333333333);\n}\n.compact-menu nav strong {\n  display: block;\n  color: #eac17c;\n  padding: 8px;\n  font-size: 11px;\n}\n.compact-menu nav a {\n  justify-content: start;\n  font-size: 12px;\n}\n.compact-menu summary:focus-visible {\n  outline: 2px solid #eac17c;\n  outline-offset: 3px;\n}\n@media (max-width: 1000px) {\n  .compact-weeks {\n    display: none;\n  }\n  .compact-menu {\n    display: block;\n  }\n}\n@media (max-width: 600px) {\n  .compact-shell {\n    padding: 5px 10px;\n    gap: 7px;\n  }\n  .compact-identity h1 {\n    font-size: 12px;\n  }\n  .compact-identity span {\n    font-size: 9px;\n  }\n  .compact-example {\n    display: none;\n  }\n  .compact-return {\n    width: 28px;\n  }\n}\n/*# sourceMappingURL=project-lesson-nav.component.css.map */\n'] }]
  }], null, { plan: [{ type: Input, args: [{ isSignal: true, alias: "plan", required: false }] }], route: [{ type: Input, args: [{ isSignal: true, alias: "route", required: true }] }], selected: [{ type: Input, args: [{ isSignal: true, alias: "selected", required: true }] }], finalExampleRoute: [{ type: Input, args: [{ isSignal: true, alias: "finalExampleRoute", required: false }] }], finalExampleActive: [{ type: Input, args: [{ isSignal: true, alias: "finalExampleActive", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectLessonNavComponent, { className: "ProjectLessonNavComponent", filePath: "src/app/shared/project-lessons/project-lesson-nav.component.ts", lineNumber: 13 });
})();

// src/app/shared/project-lessons/standards-review.component.ts
var _forTrack02 = ($index, $item) => $item.number;
var _forTrack12 = ($index, $item) => $item.projectId + ":" + $item.lessonNumber + ":" + $item.standardId;
var _forTrack2 = ($index, $item) => $item.standardId;
function StandardsReviewComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Evidence reviewed: ", ctx_r1.checkedCount(), " / ", ctx_r1.total());
  }
}
function StandardsReviewComponent_Conditional_9_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "small");
    \u0275\u0275text(1, "Selected lesson");
    \u0275\u0275domElementEnd();
  }
}
function StandardsReviewComponent_Conditional_9_For_2_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p")(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const target_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(target_r4.standardId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2014 ", target_r4.standard.title);
  }
}
function StandardsReviewComponent_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, StandardsReviewComponent_Conditional_9_For_2_Conditional_3_Template, 2, 0, "small");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(6, StandardsReviewComponent_Conditional_9_For_2_For_7_Template, 4, 2, "p", null, _forTrack2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const entry_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("current-lesson", entry_r5.number === ctx_r1.selected());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Lesson ", entry_r5.number, " \xB7 ", entry_r5.number % 2 === 1 ? "Individual" : "Group", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r5.number === ctx_r1.selected() ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r5.lesson.title);
    \u0275\u0275advance();
    \u0275\u0275repeater(entry_r5.targets);
  }
}
function StandardsReviewComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 4);
    \u0275\u0275repeaterCreate(1, StandardsReviewComponent_Conditional_9_For_2_Template, 8, 6, "article", 13, _forTrack02);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.lessons());
  }
}
function StandardsReviewComponent_For_26_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "small");
    \u0275\u0275text(1, "Current lesson");
    \u0275\u0275domElementEnd();
  }
}
function StandardsReviewComponent_For_26_For_9_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 18)(1, "strong");
    \u0275\u0275text(2, "Added check needed:");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const target_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", target_r8.addition);
  }
}
function StandardsReviewComponent_For_26_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 12)(1, "label")(2, "input", 16);
    \u0275\u0275domListener("change", function StandardsReviewComponent_For_26_For_9_Template_input_change_2_listener() {
      const target_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const entry_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggle(entry_r9.number, target_r8.standardId));
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "span")(4, "b");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(6);
    \u0275\u0275domElementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(9, "p", 17);
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "p")(12, "strong");
    \u0275\u0275text(13, "How it is addressed:");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "p")(16, "strong");
    \u0275\u0275text(17, "Evidence to check:");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(18);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(19, StandardsReviewComponent_For_26_For_9_Conditional_19_Template, 4, 1, "p", 18);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const target_r8 = ctx.$implicit;
    const entry_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("reviewed", ctx_r1.isChecked(entry_r9.number, target_r8.standardId));
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("checked", ctx_r1.isChecked(entry_r9.number, target_r8.standardId));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(target_r8.standardId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2014 ", target_r8.standard.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Lesson ", entry_r9.number, " evidence reviewed");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(target_r8.standard.description);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", target_r8.addressed);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", target_r8.evidence);
    \u0275\u0275advance();
    \u0275\u0275conditional(target_r8.addition ? 19 : -1);
  }
}
function StandardsReviewComponent_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article", 10)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, StandardsReviewComponent_For_26_Conditional_3_Template, 2, 0, "small");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p")(5, "strong");
    \u0275\u0275text(6, "Project work:");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(8, StandardsReviewComponent_For_26_For_9_Template, 20, 10, "div", 14, _forTrack2);
    \u0275\u0275domElementStart(10, "p", 15)(11, "strong");
    \u0275\u0275text(12, "Lesson checkpoint:");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const entry_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("data-lesson", entry_r9.number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Lesson ", entry_r9.number, " \xB7 ", entry_r9.lesson.title, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r9.number === ctx_r1.selected() ? 3 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", entry_r9.lesson.output);
    \u0275\u0275advance();
    \u0275\u0275repeater(entry_r9.targets);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", entry_r9.lesson.checkpoint);
  }
}
function StandardsReviewComponent_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article", 12)(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const connection_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", connection_r10.standardId, " \xB7 ", connection_r10.projectTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("Week ", (connection_r10.lessonNumber + connection_r10.lessonNumber % 2) / 2, " \xB7 Lesson ", connection_r10.lessonNumber, ": ", connection_r10.lessonTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(connection_r10.addressed);
  }
}
function StandardsReviewComponent_ForEmpty_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1, "No other curriculum lessons are currently mapped to these standards.");
    \u0275\u0275domElementEnd();
  }
}
var StandardsReviewComponent = class _StandardsReviewComponent {
  compact = input(
    false,
    ...ngDevMode ? [{ debugName: "compact" }] : (
      /* istanbul ignore next */
      []
    )
  );
  review = input.required(
    ...ngDevMode ? [{ debugName: "review" }] : (
      /* istanbul ignore next */
      []
    )
  );
  plan = input.required(
    ...ngDevMode ? [{ debugName: "plan" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = input.required(
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  standards = input.required(
    ...ngDevMode ? [{ debugName: "standards" }] : (
      /* istanbul ignore next */
      []
    )
  );
  connections = input(
    [],
    ...ngDevMode ? [{ debugName: "connections" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Tester-only, in-memory state. No student state, storage, scoring, or progress mutations.
  checked = signal(
    /* @__PURE__ */ new Set(),
    ...ngDevMode ? [{ debugName: "checked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  week = computed(
    () => lessonWeek(this.plan(), this.selected()),
    ...ngDevMode ? [{ debugName: "week" }] : (
      /* istanbul ignore next */
      []
    )
  );
  weekConnections = computed(
    () => {
      const ids = new Set(this.lessons().flatMap((entry) => entry.targets.map((target2) => target2.standardId)));
      return this.connections().filter((connection) => ids.has(connection.standardId) && connection.projectId !== this.review().projectId);
    },
    ...ngDevMode ? [{ debugName: "weekConnections" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lessons = computed(
    () => this.review().lessons.filter((lesson) => lessonWeek(this.plan(), lesson.number) === this.week()).map((lesson) => __spreadProps(__spreadValues({}, lesson), {
      lesson: this.plan().lessons[lesson.number - 1],
      targets: lesson.targets.map((target2) => __spreadProps(__spreadValues({}, target2), { standard: this.standards().get(target2.standardId) }))
    })),
    ...ngDevMode ? [{ debugName: "lessons" }] : (
      /* istanbul ignore next */
      []
    )
  );
  total = computed(
    () => this.lessons().reduce((count, lesson) => count + lesson.targets.length, 0),
    ...ngDevMode ? [{ debugName: "total" }] : (
      /* istanbul ignore next */
      []
    )
  );
  checkedCount = computed(
    () => this.lessons().reduce((count, lesson) => count + lesson.targets.filter((target2) => this.isChecked(lesson.number, target2.standardId)).length, 0),
    ...ngDevMode ? [{ debugName: "checkedCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  key(lesson, id) {
    return `${this.review().projectId}@${this.review().projectVersion}:${lesson}:${id}`;
  }
  isChecked(lesson, id) {
    return this.checked().has(this.key(lesson, id));
  }
  toggle(lesson, id) {
    const next = new Set(this.checked());
    const key = this.key(lesson, id);
    if (next.has(key))
      next.delete(key);
    else
      next.add(key);
    this.checked.set(next);
  }
  reset() {
    const prefix = `${this.review().projectId}@${this.review().projectVersion}:`;
    this.checked.update((checked) => new Set([...checked].filter((key) => !key.startsWith(prefix))));
  }
  static \u0275fac = function StandardsReviewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StandardsReviewComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StandardsReviewComponent, selectors: [["app-standards-review"]], hostVars: 2, hostBindings: function StandardsReviewComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("compact-mode", ctx.compact());
    }
  }, inputs: { compact: [1, "compact"], review: [1, "review"], plan: [1, "plan"], selected: [1, "selected"], standards: [1, "standards"], connections: [1, "connections"] }, decls: 37, vars: 10, consts: [["trigger", ""], ["panel", ""], ["aria-label", "Selected week standards", 1, "week-standards"], ["type", "button", "aria-haspopup", "dialog", 3, "click"], [1, "standard-summary"], ["aria-label", "Full standards breakdown and curriculum connections", 1, "review-panel", 3, "close", "cancel", "keydown.escape"], ["type", "button", "aria-label", "Close standards review", 3, "click"], [1, "scope"], ["type", "button", 1, "reset", 3, "click"], [1, "lesson-columns"], [1, "review-lesson"], ["aria-label", "Curriculum connections", 1, "curriculum-connections"], [1, "standard-target"], [3, "current-lesson"], [1, "standard-target", 3, "reviewed"], [1, "checkpoint"], ["type", "checkbox", 3, "change", "checked"], [1, "standard-description"], [1, "addition"]], template: function StandardsReviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275domElementStart(0, "section", 2)(1, "header")(2, "div")(3, "h2");
      \u0275\u0275text(4);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(5, StandardsReviewComponent_Conditional_5_Template, 2, 2, "p");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "button", 3, 0);
      \u0275\u0275domListener("click", function StandardsReviewComponent_Template_button_click_6_listener() {
        \u0275\u0275restoreView(_r1);
        const panel_r3 = \u0275\u0275reference(11);
        return \u0275\u0275resetView(panel_r3.showModal());
      });
      \u0275\u0275text(8, "Full breakdown & curriculum connections");
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(9, StandardsReviewComponent_Conditional_9_Template, 3, 0, "div", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "dialog", 5, 1);
      \u0275\u0275domListener("close", function StandardsReviewComponent_Template_dialog_close_10_listener() {
        \u0275\u0275restoreView(_r1);
        const trigger_r6 = \u0275\u0275reference(7);
        return \u0275\u0275resetView(trigger_r6.focus());
      })("cancel", function StandardsReviewComponent_Template_dialog_cancel_10_listener($event) {
        return $event.stopPropagation();
      })("keydown.escape", function StandardsReviewComponent_Template_dialog_keydown_escape_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        const panel_r3 = \u0275\u0275reference(11);
        panel_r3.close();
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275domElementStart(12, "header")(13, "div")(14, "h2");
      \u0275\u0275text(15);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(16, "p");
      \u0275\u0275text(17, "Check a box after reviewing that lesson\u2019s evidence. These are testing checks, not student grades or mastery. Checks reset on reload.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(18, "button", 6);
      \u0275\u0275domListener("click", function StandardsReviewComponent_Template_button_click_18_listener() {
        \u0275\u0275restoreView(_r1);
        const panel_r3 = \u0275\u0275reference(11);
        return \u0275\u0275resetView(panel_r3.close());
      });
      \u0275\u0275text(19, "Close");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(20, "p", 7);
      \u0275\u0275text(21);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(22, "button", 8);
      \u0275\u0275domListener("click", function StandardsReviewComponent_Template_button_click_22_listener() {
        return ctx.reset();
      });
      \u0275\u0275text(23, "Reset project checks");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(24, "div", 9);
      \u0275\u0275repeaterCreate(25, StandardsReviewComponent_For_26_Template, 14, 6, "article", 10, _forTrack02);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(27, "section", 11)(28, "h3");
      \u0275\u0275text(29, "Connections to other curriculum");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(30, "p");
      \u0275\u0275text(31);
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(32, StandardsReviewComponent_For_33_Template, 7, 6, "article", 12, _forTrack12, false, StandardsReviewComponent_ForEmpty_34_Template, 2, 0, "p");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(35, "footer");
      \u0275\u0275text(36, "Source: supplied Forge School Master Standards Framework, Grades 4\u20136 (draft). Full source wording is shown above. Coverage notes apply to the listed activity, not every component of a bundled standard.");
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("compact", ctx.compact());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("Week ", ctx.week(), " standards");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.compact() ? 5 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(!ctx.compact() ? 9 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate2("Week ", ctx.week(), " \xB7 Grade ", ctx.review().grade, " \xB7 Standards breakdown");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.review().scope);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.lessons());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("Other configured lessons addressing the same standards as Week ", ctx.week(), ".");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.weekConnections());
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  position: relative;\n  z-index: 20;\n  min-height: 130px;\n  padding: 72px 16px 10px;\n  box-sizing: border-box;\n  background: #edf3f0;\n  color: #173b39;\n  font: 14px/1.5 Arial, sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.week-standards[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: auto;\n}\n.standard-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n.standard-summary[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #bdcfc9;\n  border-radius: 8px;\n  padding: 12px;\n}\n.standard-summary[_ngcontent-%COMP%]   .current-lesson[_ngcontent-%COMP%] {\n  border: 2px solid #245f52;\n}\n.review-panel[_ngcontent-%COMP%] {\n  width: min(1100px, 100% - 24px);\n  max-height: 85dvh;\n  overflow: auto;\n  overscroll-behavior: contain;\n  padding: 20px;\n  background: #fff;\n  color: #173b39;\n  border: 1px solid #789f96;\n  border-radius: 12px;\n  font: inherit;\n}\n.review-panel[_ngcontent-%COMP%]::backdrop {\n  background: rgba(7, 29, 41, 0.7019607843);\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  align-items: flex-start;\n  justify-content: space-between;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 20px;\n  margin: 0;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin: 0 0 10px;\n}\nh3[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: #21675b;\n}\np[_ngcontent-%COMP%] {\n  margin: 8px 0;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 8px 12px;\n  background: #fff;\n  color: #173b39;\n  border: 1px solid #789f96;\n  border-radius: 6px;\n  font: inherit;\n  cursor: pointer;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  color: #fff;\n  background: #245f52;\n}\n.week-picker[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 14px 0 6px;\n}\n.reset[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.scope[_ngcontent-%COMP%] {\n  padding: 12px;\n  background: #edf3f0;\n  border-radius: 8px;\n}\n.review-help[_ngcontent-%COMP%], \nfooter[_ngcontent-%COMP%] {\n  color: #48625d;\n  font-size: 12px;\n}\n.lesson-columns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  margin-top: 16px;\n}\n.review-lesson[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.standard-target[_ngcontent-%COMP%] {\n  padding: 12px;\n  margin: 12px 0;\n  border: 1px solid #bdcfc9;\n  border-radius: 8px;\n}\n.standard-target.reviewed[_ngcontent-%COMP%] {\n  border-color: #347d68;\n  background: #f1faf4;\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: flex-start;\n  min-height: 44px;\n  cursor: pointer;\n}\ninput[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  flex: 0 0 20px;\n  accent-color: #245f52;\n  margin-top: 3px;\n}\nlabel[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: #48625d;\n  font-weight: 400;\n}\n.standard-description[_ngcontent-%COMP%] {\n  color: #48625d;\n  font-size: 13px;\n}\n.addition[_ngcontent-%COMP%] {\n  background: #fff3d6;\n  color: #624515;\n  border-left: 3px solid #b17a20;\n  padding: 10px;\n}\n.checkpoint[_ngcontent-%COMP%] {\n  padding-top: 8px;\n  border-top: 1px solid #bdcfc9;\n}\nfooter[_ngcontent-%COMP%] {\n  margin-top: 14px;\n}\nsummary[_ngcontent-%COMP%]:focus-visible, \nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #157dba;\n  outline-offset: 3px;\n}\n@media (max-width: 760px) {\n  [_nghost-%COMP%] {\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n  summary[_ngcontent-%COMP%] {\n    padding: 8px;\n    font-size: 12px;\n  }\n  .review-panel[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .lesson-columns[_ngcontent-%COMP%], \n   .standard-summary[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  header[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  h2[_ngcontent-%COMP%] {\n    font-size: 17px;\n  }\n  .reset[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n}\n.week-standards.compact[_ngcontent-%COMP%] {\n  padding: 5px 18px;\n  margin: 0;\n  border-radius: 0;\n}\n.week-standards.compact[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  margin: 0;\n  align-items: center;\n  gap: 8px;\n}\n.week-standards.compact[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 11px;\n  margin: 0;\n}\n.week-standards.compact[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 11px;\n  min-height: 30px;\n  padding: 3px 8px;\n}\n.compact-mode[_nghost-%COMP%] {\n  min-height: 0;\n  padding: 0;\n}\n/*# sourceMappingURL=standards-review.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StandardsReviewComponent, [{
    type: Component,
    args: [{ selector: "app-standards-review", changeDetection: ChangeDetectionStrategy.OnPush, host: { "[class.compact-mode]": "compact()" }, template: `<section class="week-standards" [class.compact]="compact()" aria-label="Selected week standards">
  <header>\r
    <div><h2>Week {{ week() }} standards</h2>@if (!compact()) { <p>Evidence reviewed: {{ checkedCount() }} / {{ total() }}</p> }</div>
    <button #trigger type="button" aria-haspopup="dialog" (click)="panel.showModal()">Full breakdown &amp; curriculum connections</button>\r
  </header>\r
  @if (!compact()) { <div class="standard-summary">
    @for (entry of lessons(); track entry.number) {\r
      <article [class.current-lesson]="entry.number === selected()">\r
        <h3>Lesson {{ entry.number }} \xB7 {{ entry.number % 2 === 1 ? 'Individual' : 'Group' }} @if (entry.number === selected()) { <small>Selected lesson</small> }</h3>\r
        <p>{{ entry.lesson.title }}</p>\r
        @for (target of entry.targets; track target.standardId) {\r
          <p><b>{{ target.standardId }}</b> \u2014 {{ target.standard.title }}</p>\r
        }\r
      </article>\r
    }\r
  </div> }
</section>\r
<dialog #panel class="review-panel" aria-label="Full standards breakdown and curriculum connections"\r
  (close)="trigger.focus()" (cancel)="$event.stopPropagation()"\r
  (keydown.escape)="panel.close(); $event.stopPropagation()">\r
    <header>\r
      <div>\r
        <h2>Week {{ week() }} \xB7 Grade {{ review().grade }} \xB7 Standards breakdown</h2>\r
        <p>Check a box after reviewing that lesson\u2019s evidence. These are testing checks, not student grades or mastery. Checks reset on reload.</p>\r
      </div>\r
      <button type="button" aria-label="Close standards review" (click)="panel.close()">Close</button>\r
    </header>\r
    <p class="scope">{{ review().scope }}</p>\r
    <button type="button" class="reset" (click)="reset()">Reset project checks</button>\r
    <div class="lesson-columns">\r
      @for (entry of lessons(); track entry.number) {\r
        <article class="review-lesson" [attr.data-lesson]="entry.number">\r
          <h3>Lesson {{ entry.number }} \xB7 {{ entry.lesson.title }} @if (entry.number === selected()) { <small>Current lesson</small> }</h3>\r
          <p><strong>Project work:</strong> {{ entry.lesson.output }}</p>\r
          @for (target of entry.targets; track target.standardId) {\r
            <div class="standard-target" [class.reviewed]="isChecked(entry.number, target.standardId)">\r
              <label>\r
                <input type="checkbox" [checked]="isChecked(entry.number, target.standardId)" (change)="toggle(entry.number, target.standardId)" />\r
                <span><b>{{ target.standardId }}</b> \u2014 {{ target.standard.title }}<small>Lesson {{ entry.number }} evidence reviewed</small></span>\r
              </label>\r
              <p class="standard-description">{{ target.standard.description }}</p>\r
              <p><strong>How it is addressed:</strong> {{ target.addressed }}</p>\r
              <p><strong>Evidence to check:</strong> {{ target.evidence }}</p>\r
              @if (target.addition) {\r
                <p class="addition"><strong>Added check needed:</strong> {{ target.addition }}</p>\r
              }\r
            </div>\r
          }\r
          <p class="checkpoint"><strong>Lesson checkpoint:</strong> {{ entry.lesson.checkpoint }}</p>\r
        </article>\r
      }\r
    </div>\r
    <section class="curriculum-connections" aria-label="Curriculum connections">\r
      <h3>Connections to other curriculum</h3>\r
      <p>Other configured lessons addressing the same standards as Week {{ week() }}.</p>\r
      @for (connection of weekConnections(); track connection.projectId + ':' + connection.lessonNumber + ':' + connection.standardId) {\r
        <article class="standard-target">\r
          <b>{{ connection.standardId }} \xB7 {{ connection.projectTitle }}</b>\r
          <p>Week {{ (connection.lessonNumber + connection.lessonNumber % 2) / 2 }} \xB7 Lesson {{ connection.lessonNumber }}: {{ connection.lessonTitle }}</p>\r
          <p>{{ connection.addressed }}</p>\r
        </article>\r
      } @empty { <p>No other curriculum lessons are currently mapped to these standards.</p> }\r
    </section>\r
    <footer>Source: supplied Forge School Master Standards Framework, Grades 4\u20136 (draft). Full source wording is shown above. Coverage notes apply to the listed activity, not every component of a bundled standard.</footer>\r
</dialog>\r
`, styles: ["/* src/app/shared/project-lessons/standards-review.component.scss */\n:host {\n  display: block;\n  position: relative;\n  z-index: 20;\n  min-height: 130px;\n  padding: 72px 16px 10px;\n  box-sizing: border-box;\n  background: #edf3f0;\n  color: #173b39;\n  font: 14px/1.5 Arial, sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.week-standards {\n  max-width: 1200px;\n  margin: auto;\n}\n.standard-summary {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n.standard-summary article {\n  background: #fff;\n  border: 1px solid #bdcfc9;\n  border-radius: 8px;\n  padding: 12px;\n}\n.standard-summary .current-lesson {\n  border: 2px solid #245f52;\n}\n.review-panel {\n  width: min(1100px, 100% - 24px);\n  max-height: 85dvh;\n  overflow: auto;\n  overscroll-behavior: contain;\n  padding: 20px;\n  background: #fff;\n  color: #173b39;\n  border: 1px solid #789f96;\n  border-radius: 12px;\n  font: inherit;\n}\n.review-panel::backdrop {\n  background: rgba(7, 29, 41, 0.7019607843);\n}\nheader {\n  display: flex;\n  gap: 20px;\n  align-items: flex-start;\n  justify-content: space-between;\n}\nh2 {\n  font-size: 20px;\n  margin: 0;\n}\nh3 {\n  font-size: 16px;\n  margin: 0 0 10px;\n}\nh3 small {\n  display: block;\n  color: #21675b;\n}\np {\n  margin: 8px 0;\n}\nbutton {\n  min-height: 44px;\n  padding: 8px 12px;\n  background: #fff;\n  color: #173b39;\n  border: 1px solid #789f96;\n  border-radius: 6px;\n  font: inherit;\n  cursor: pointer;\n}\nbutton[aria-pressed=true] {\n  color: #fff;\n  background: #245f52;\n}\n.week-picker {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 14px 0 6px;\n}\n.reset {\n  margin-left: auto;\n}\n.scope {\n  padding: 12px;\n  background: #edf3f0;\n  border-radius: 8px;\n}\n.review-help,\nfooter {\n  color: #48625d;\n  font-size: 12px;\n}\n.lesson-columns {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  margin-top: 16px;\n}\n.review-lesson {\n  min-width: 0;\n}\n.standard-target {\n  padding: 12px;\n  margin: 12px 0;\n  border: 1px solid #bdcfc9;\n  border-radius: 8px;\n}\n.standard-target.reviewed {\n  border-color: #347d68;\n  background: #f1faf4;\n}\nlabel {\n  display: flex;\n  gap: 10px;\n  align-items: flex-start;\n  min-height: 44px;\n  cursor: pointer;\n}\ninput {\n  width: 20px;\n  height: 20px;\n  flex: 0 0 20px;\n  accent-color: #245f52;\n  margin-top: 3px;\n}\nlabel small {\n  display: block;\n  color: #48625d;\n  font-weight: 400;\n}\n.standard-description {\n  color: #48625d;\n  font-size: 13px;\n}\n.addition {\n  background: #fff3d6;\n  color: #624515;\n  border-left: 3px solid #b17a20;\n  padding: 10px;\n}\n.checkpoint {\n  padding-top: 8px;\n  border-top: 1px solid #bdcfc9;\n}\nfooter {\n  margin-top: 14px;\n}\nsummary:focus-visible,\nbutton:focus-visible,\ninput:focus-visible {\n  outline: 3px solid #157dba;\n  outline-offset: 3px;\n}\n@media (max-width: 760px) {\n  :host {\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n  summary {\n    padding: 8px;\n    font-size: 12px;\n  }\n  .review-panel {\n    padding: 14px;\n  }\n  .lesson-columns,\n  .standard-summary {\n    grid-template-columns: 1fr;\n  }\n  header {\n    gap: 8px;\n  }\n  h2 {\n    font-size: 17px;\n  }\n  .reset {\n    margin-left: 0;\n  }\n}\n.week-standards.compact {\n  padding: 5px 18px;\n  margin: 0;\n  border-radius: 0;\n}\n.week-standards.compact header {\n  margin: 0;\n  align-items: center;\n  gap: 8px;\n}\n.week-standards.compact h2 {\n  font-size: 11px;\n  margin: 0;\n}\n.week-standards.compact button {\n  font-size: 11px;\n  min-height: 30px;\n  padding: 3px 8px;\n}\n:host(.compact-mode) {\n  min-height: 0;\n  padding: 0;\n}\n/*# sourceMappingURL=standards-review.component.css.map */\n"] }]
  }], null, { compact: [{ type: Input, args: [{ isSignal: true, alias: "compact", required: false }] }], review: [{ type: Input, args: [{ isSignal: true, alias: "review", required: true }] }], plan: [{ type: Input, args: [{ isSignal: true, alias: "plan", required: true }] }], selected: [{ type: Input, args: [{ isSignal: true, alias: "selected", required: true }] }], standards: [{ type: Input, args: [{ isSignal: true, alias: "standards", required: true }] }], connections: [{ type: Input, args: [{ isSignal: true, alias: "connections", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StandardsReviewComponent, { className: "StandardsReviewComponent", filePath: "src/app/shared/project-lessons/standards-review.component.ts", lineNumber: 12 });
})();

// src/app/shared/project-lessons/curriculum-disclosure.component.ts
var _forTrack03 = ($index, $item) => $item.number;
function CurriculumDisclosureComponent_For_18_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const criterion_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(criterion_r4);
  }
}
function CurriculumDisclosureComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section")(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(3, CurriculumDisclosureComponent_For_18_For_4_Template, 2, 1, "p", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementStart(5, "p")(6, "strong");
    \u0275\u0275text(7, "Evidence:");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const lesson_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", lesson_r5.number, " \xB7 ", lesson_r5.title);
    \u0275\u0275advance();
    \u0275\u0275repeater(lesson_r5.criteria);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", lesson_r5.output);
  }
}
var CurriculumDisclosureComponent = class _CurriculumDisclosureComponent {
  plan = input.required(
    ...ngDevMode ? [{ debugName: "plan" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = input.required(
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  week = computed(
    () => lessonWeek(this.plan(), this.selected()),
    ...ngDevMode ? [{ debugName: "week" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lessons = computed(
    () => this.plan().lessons.filter((l) => lessonWeek(this.plan(), l.number) === this.week()),
    ...ngDevMode ? [{ debugName: "lessons" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function CurriculumDisclosureComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CurriculumDisclosureComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CurriculumDisclosureComponent, selectors: [["app-curriculum-disclosure"]], inputs: { plan: [1, "plan"], selected: [1, "selected"] }, decls: 19, vars: 3, consts: [["trigger", ""], ["panel", ""], ["aria-haspopup", "dialog", 1, "disclosure", 3, "click"], ["aria-hidden", "true"], ["aria-label", "Standards and weekly learning goals", 3, "close"], ["aria-label", "Close standards", 3, "click"]], template: function CurriculumDisclosureComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275domElementStart(0, "button", 2, 0);
      \u0275\u0275domListener("click", function CurriculumDisclosureComponent_Template_button_click_0_listener() {
        \u0275\u0275restoreView(_r1);
        const panel_r2 = \u0275\u0275reference(9);
        return \u0275\u0275resetView(panel_r2.showModal());
      });
      \u0275\u0275domElementStart(2, "span");
      \u0275\u0275text(3, "Standards \xB7 alignment pending");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "span");
      \u0275\u0275text(5);
      \u0275\u0275domElementStart(6, "b", 3);
      \u0275\u0275text(7, "\u2197");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(8, "dialog", 4, 1);
      \u0275\u0275domListener("close", function CurriculumDisclosureComponent_Template_dialog_close_8_listener() {
        \u0275\u0275restoreView(_r1);
        const trigger_r3 = \u0275\u0275reference(1);
        return \u0275\u0275resetView(trigger_r3.focus());
      });
      \u0275\u0275domElementStart(10, "header")(11, "h2");
      \u0275\u0275text(12);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(13, "button", 5);
      \u0275\u0275domListener("click", function CurriculumDisclosureComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        const panel_r2 = \u0275\u0275reference(9);
        return \u0275\u0275resetView(panel_r2.close());
      });
      \u0275\u0275text(14, "Close");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(15, "p");
      \u0275\u0275text(16);
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(17, CurriculumDisclosureComponent_For_18_Template, 9, 3, "section", null, _forTrack03);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("Week ", ctx.week(), " goals ");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("Week ", ctx.week(), " \xB7 Standards & learning goals");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.plan().presentation?.alignmentNote);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.lessons());
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  background: #edece5;\n  color: #394e4a;\n  font: 12px/1.5 Arial, sans-serif;\n}\n.disclosure[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  min-height: 34px;\n  padding: 4px 24px;\n  background: none;\n  color: inherit;\n  border: 0;\n  font: inherit;\n  cursor: pointer;\n}\nb[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #197e91;\n  outline-offset: -3px;\n}\ndialog[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  max-width: 720px;\n  width: calc(100% - 28px);\n  max-height: 85dvh;\n  overflow: auto;\n  background: #faf8f0;\n  color: #263e3c;\n  border: 1px solid #b9c4bd;\n  border-radius: 12px;\n  padding: 22px;\n  font: 14px/1.6 Arial, sans-serif;\n}\ndialog[_ngcontent-%COMP%]::backdrop {\n  background: rgba(13, 37, 40, 0.7215686275);\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: start;\n  gap: 18px;\n  justify-content: space-between;\n}\nh2[_ngcontent-%COMP%] {\n  font: 22px Georgia, serif;\n  margin: 0;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\nsection[_ngcontent-%COMP%] {\n  border-top: 1px solid #d0d5c9;\n  margin-top: 20px;\n}\nheader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  background: #183d3c;\n  color: white;\n  border: 0;\n  border-radius: 5px;\n  padding: 8px 15px;\n  cursor: pointer;\n}\n@media (max-width: 600px) {\n  .disclosure[_ngcontent-%COMP%] {\n    padding: 4px 12px;\n    font-size: 10px;\n    min-height: 36px;\n  }\n}\n/*# sourceMappingURL=curriculum-disclosure.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CurriculumDisclosureComponent, [{
    type: Component,
    args: [{ selector: "app-curriculum-disclosure", changeDetection: ChangeDetectionStrategy.OnPush, template: ` <button
      #trigger
      class="disclosure"
      aria-haspopup="dialog"
      (click)="panel.showModal()"
    >
      <span>Standards \xB7 alignment pending</span
      ><span>Week {{ week() }} goals <b aria-hidden="true">\u2197</b></span>
    </button>
    <dialog #panel aria-label="Standards and weekly learning goals" (close)="trigger.focus()">
      <header>
        <h2>Week {{ week() }} \xB7 Standards & learning goals</h2>
        <button (click)="panel.close()" aria-label="Close standards">Close</button>
      </header>
      <p>{{ plan().presentation?.alignmentNote }}</p>
      @for (lesson of lessons(); track lesson.number) {
        <section>
          <h3>{{ lesson.number }} \xB7 {{ lesson.title }}</h3>
          @for (criterion of lesson.criteria; track criterion) {
            <p>{{ criterion }}</p>
          }
          <p><strong>Evidence:</strong> {{ lesson.output }}</p>
        </section>
      }
    </dialog>`, styles: ["/* angular:styles/component:scss;bc68b98c95c5f2e26f5f358e681db7074e6f5399445061132b0c148c1c80afdf;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/shared/project-lessons/curriculum-disclosure.component.ts */\n:host {\n  display: block;\n  background: #edece5;\n  color: #394e4a;\n  font: 12px/1.5 Arial, sans-serif;\n}\n.disclosure {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  min-height: 34px;\n  padding: 4px 24px;\n  background: none;\n  color: inherit;\n  border: 0;\n  font: inherit;\n  cursor: pointer;\n}\nb {\n  margin-left: 8px;\n}\nbutton:focus-visible {\n  outline: 3px solid #197e91;\n  outline-offset: -3px;\n}\ndialog {\n  box-sizing: border-box;\n  max-width: 720px;\n  width: calc(100% - 28px);\n  max-height: 85dvh;\n  overflow: auto;\n  background: #faf8f0;\n  color: #263e3c;\n  border: 1px solid #b9c4bd;\n  border-radius: 12px;\n  padding: 22px;\n  font: 14px/1.6 Arial, sans-serif;\n}\ndialog::backdrop {\n  background: rgba(13, 37, 40, 0.7215686275);\n}\nheader {\n  display: flex;\n  align-items: start;\n  gap: 18px;\n  justify-content: space-between;\n}\nh2 {\n  font: 22px Georgia, serif;\n  margin: 0;\n}\nh3 {\n  font-size: 15px;\n}\nsection {\n  border-top: 1px solid #d0d5c9;\n  margin-top: 20px;\n}\nheader button {\n  min-height: 44px;\n  background: #183d3c;\n  color: white;\n  border: 0;\n  border-radius: 5px;\n  padding: 8px 15px;\n  cursor: pointer;\n}\n@media (max-width: 600px) {\n  .disclosure {\n    padding: 4px 12px;\n    font-size: 10px;\n    min-height: 36px;\n  }\n}\n/*# sourceMappingURL=curriculum-disclosure.component.css.map */\n"] }]
  }], null, { plan: [{ type: Input, args: [{ isSignal: true, alias: "plan", required: true }] }], selected: [{ type: Input, args: [{ isSignal: true, alias: "selected", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CurriculumDisclosureComponent, { className: "CurriculumDisclosureComponent", filePath: "src/app/shared/project-lessons/curriculum-disclosure.component.ts", lineNumber: 116 });
})();

// src/app/projects/project-lesson-standards.ts
var target = (standardId, addressed, evidence, addition) => __spreadValues({ standardId, addressed, evidence }, addition ? { addition } : {});
var review = (projectId, projectVersion, grade, scope, lessons, planVersion = "1.0.0") => ({
  projectId,
  projectVersion,
  planVersion,
  grade,
  scope,
  lessons: lessons.map((targets, index) => ({ number: index + 1, targets }))
});
var projectLessonStandards = [
  review(
    "expedition-news-network",
    "1.0.0",
    5,
    "This is an ELA project using the Endurance expedition as its reading context. Assess each learner\u2019s reading, report, sources, revision and speaking evidence; the team broadcast does not substitute for individual checks.",
    [
      [target("FF.G5.ELA.12", "The anchor article introduces two central ideas and a summary of the expedition.", "Student states two central ideas, supports each with a detail, quotes accurately and summarizes objectively.")],
      [target("FF.G5.ELA.16", "The team plan uses prepared reading notes to agree on a reporting question and roles.", "Student explains a contribution, builds on a teammate\u2019s idea and follows the agreed discussion norms."), target("FF.G5.ELA.12", "The E-A check connects a quoted detail to the reporting question.", "Student quotes accurately and explains how the detail supports a central idea or relationship.")],
      [target("FF.G5.ELA.22", "The source log groups notes from a memoir and a timeline or photograph by topic.", "Student credits at least two sources, separates quotation from paraphrase and explains the value and limits of each."), target("FF.G5.ELA.12", "The evidence paragraph explains a relationship among people, events or ideas.", "Student connects a source-supported detail to the relationship rather than merely listing events.")],
      [target("FF.G5.ELA.19", "The first full news report organizes a topic with evidence sections, precise language and a conclusion.", "At E-B, student explains two supported claims and why their evidence fits."), target("FF.G5.ELA.16", "The peer check evaluates a teammate\u2019s suggestion while planning the broadcast order.", "Student records the suggestion and evaluates its reasons or evidence.")],
      [target("FF.G5.ELA.21", "A revision memo compares the original and revised report for audience, organization and clarity.", "Student explains one substantive change, one edit, and how the factual meaning was preserved.")],
      [target("FF.G5.ELA.17", "The recording-desk rehearsal develops logical delivery and a purposeful visual.", "Teacher observes the student\u2019s presentation or recording; student explains how the visual and register suit listeners."), target("FF.G5.ELA.16", "Listening and revision notes summarize and evaluate another reporter\u2019s reasoning.", "Student fairly summarizes a teammate\u2019s point, evaluates its evidence and identifies an improvement.")],
      [target("FF.G5.ELA.12", "The fresh James Caird passage checks independent reading transfer.", "At E-C, student explains two central ideas and a relationship with accurate quotations and an objective summary."), target("FF.G5.ELA.22", "The final report defense explains source choices and traceable credits.", "Student shows categorized notes from multiple sources and links cited details to the final report.")],
      [target("FF.G5.ELA.17", "The final broadcast presents each learner\u2019s report section and answers an audience question.", "Teacher checks logical delivery, supporting evidence, useful media and language appropriate to the audience."), target("FF.G5.ELA.21", "The final portfolio and reflection show how revision changed the report.", "Student shows the planning-to-final trail and explains a meaningful revision and digital presentation choice.")]
    ]
  ),
  review(
    "mystery-substance",
    "1.0.0",
    5,
    "Core targets are conservation of matter and evidence of a new substance. Property identification alone does not assess phase changes. Each check concerns the named lesson evidence, not mastery of the whole standard.",
    [
      [target("FF.G5.SCI.03", "Inventory observations establish the starting properties to compare before and after mixing.", "Student records two observable properties and separates an observation from a prediction.")],
      [target("FF.G5.SCI.03", "The test plan chooses property evidence that could distinguish substances and reveal a change after mixing.", "Student names the comparison, what is held constant, and the evidence that would change the initial claim.")],
      [target("FF.G5.SCI.03", "Properties Lab comparisons show why dissolving alone is insufficient evidence of a new substance.", "Student compares two samples and explains which additional property or reaction test is needed.")],
      [target("FF.G5.SCI.03", "Reaction Bench results support or challenge a claim that mixing formed a new substance.", "Student cites before/after properties and explains why the evidence supports a new-substance claim rather than simply a mixture.")],
      [target("FF.G5.SCI.02", "Matter Tracker compares open and closed systems to account for apparent lost mass.", "Student uses mass measurements to explain that matter remains present even when gas leaves the open chamber.")],
      [target("FF.G5.SCI.03", "Restoration rehearsal links revised labels to discriminating reaction evidence.", "Student defends one revised label, identifies a contradictory result, and explains the limit of the evidence."), target("FF.G5.SCI.02", "The case rehearsal revisits conservation evidence from the chamber trials.", "Student includes a before/after mass comparison and accounts for material that appeared to vanish.", "Add this explicit mass explanation to the restoration rehearsal; restoring a label alone does not check conservation.")],
      [target("FF.G5.SCI.03", "Bay 3 transfers property and reaction reasoning to a new unknown.", "Student justifies a response using observed evidence and states what remains uncertain.")],
      [target("FF.G5.SCI.02", "The final case file explains conservation using the student\u2019s own mass-trial evidence.", "Student answers a fresh closed-system mass question and cites a trial.", "Include a conservation question in the final defense."), target("FF.G5.SCI.03", "The final defense connects identification to evidence from mixing and physical properties.", "Student defends one label with a before/after comparison and explains a revision.")]
    ]
  ),
  review(
    "frontier-trading-company",
    "1.16.0",
    6,
    "Eight weekly lessons alternate round-trip journeys with ledger reconciliation. Mapped unit-rate, decimal and proportional-reasoning targets require individual teacher review. The fictionalized map is not a history or geographic-scale assessment.",
    [
      [target("FF.G6.MATH.02", "Purchases and destination prices support unit-rate comparisons within a limited trip budget.", "Student compares labelled dollars-per-unit prices and checks cargo and return-travel costs."), target("FF.G6.MATH.03", "Quantities are scaled against cash, capacity, and two travel legs.", "Student explains how changing a quantity or cost affects the feasible plan and checks a fresh example.")],
      [target("FF.G6.MATH.06", "The ledger reconciles opening cash, income, expenses, and closing cash from the preceding round trip.", "Student reconstructs the cash balance, distinguishes stock losses from cash expenses, and explains an improvement using receipts."), target("FF.G6.MATH.03", "Quantities are scaled against cash, capacity, and two travel legs.", "Student explains how changing a quantity or cost affects the feasible plan and checks a fresh example.")],
      [target("FF.G6.MATH.02", "Purchases and destination prices support unit-rate comparisons within a limited trip budget.", "Student compares labelled dollars-per-unit prices and checks cargo and return-travel costs."), target("FF.G6.MATH.03", "Longer trips compare scaled loads, route costs, and disruption choices.", "Student explains how changing a quantity or cost affects the feasible plan and checks a fresh example.")],
      [target("FF.G6.MATH.06", "The ledger reconciles opening cash, income, expenses, and closing cash from the preceding round trip.", "Student reconstructs the cash balance, distinguishes stock losses from cash expenses, and explains an improvement using receipts."), target("FF.G6.MATH.03", "Longer trips compare scaled loads, route costs, and disruption choices.", "Student explains how changing a quantity or cost affects the feasible plan and checks a fresh example.")],
      [target("FF.G6.MATH.02", "Purchases and destination prices support unit-rate comparisons within a limited trip budget.", "Student compares labelled dollars-per-unit prices and checks cargo and return-travel costs."), target("FF.G6.MATH.03", "Longer trips compare scaled loads, route costs, and disruption choices.", "Student explains how changing a quantity or cost affects the feasible plan and checks a fresh example.")],
      [target("FF.G6.MATH.06", "The ledger reconciles opening cash, income, expenses, and closing cash from the preceding round trip.", "Student reconstructs the cash balance, distinguishes stock losses from cash expenses, and explains an improvement using receipts."), target("FF.G6.MATH.03", "Longer trips compare scaled loads, route costs, and disruption choices.", "Student explains how changing a quantity or cost affects the feasible plan and checks a fresh example.")],
      [target("FF.G6.MATH.02", "Purchases and destination prices support unit-rate comparisons within a limited trip budget.", "Student compares labelled dollars-per-unit prices and checks cargo and return-travel costs."), target("FF.G6.MATH.03", "Longer trips compare scaled loads, route costs, and disruption choices.", "Student explains how changing a quantity or cost affects the feasible plan and checks a fresh example.")],
      [target("FF.G6.MATH.06", "The ledger reconciles opening cash, income, expenses, and closing cash from the preceding round trip.", "Student reconstructs the cash balance, distinguishes stock losses from cash expenses, and explains an improvement using receipts."), target("FF.G6.MATH.03", "Longer trips compare scaled loads, route costs, and disruption choices.", "Student explains how changing a quantity or cost affects the feasible plan and checks a fresh example.")]
    ],
    "2.0.0"
  ),
  review(
    "objects-that-changed-us",
    "2.3.0",
    6,
    "Egypt content standards are bundled. A freely chosen room may omit Nile agriculture, leadership, or Egypt\u2013Nubia diffusion. Added checks below name those missing cases; publishing a room does not complete either standard.",
    [
      [target("FF.G6.SS.01", "Artifact observation generates a research question and an initial source note.", "Student identifies the artifact/source and explains its relevance to the question.")],
      [target("FF.G6.SS.11", "Room planning can connect Nile geography and food production to Egyptian society.", "Student proposes a sourced link between Nile conditions, agriculture and a social role.", "Assign a Nile/agriculture case in the room plan; a generic artifact shortlist may not include it.")],
      [target("FF.G6.SS.02", "The sourced label distinguishes an observation from a supported interpretation.", "Student identifies a source passage, paraphrases it accurately, and states one limitation."), target("FF.G6.SS.11", "A label can connect an artifact to religion, social structure, or a named pharaoh.", "Student explains one of those connections with an identified source.", "Require a named Egyptian society or leadership case rather than an unrestricted label.")],
      [target("FF.G6.SS.12", "The first room uses artifacts and labels to explain Egyptian achievements.", "Student explains how a writing or architecture artifact represents an achievement.", "Require a writing/architecture artifact and explanation; layout alone does not assess the achievement.")],
      [target("FF.G6.SS.03", "Revision compares accounts to correct an overclaim in an artifact interpretation.", "Student shows the original and revised label, identifies the conflicting evidence, and explains the narrower claim.")],
      [target("FF.G6.SS.12", "Visitor review can test whether the exhibit explains cultural diffusion.", "Student traces one exchange between Egypt and Nubia through trade or conflict and cites its evidence.", "Add a required Egypt\u2013Nubia comparison during the walkthrough; Egyptian artifacts alone do not demonstrate diffusion.")],
      [target("FF.G6.SS.04", "The independent curator defense communicates a claim with cited artifact evidence.", "Student interprets a new detail, cites a source, and explains an alternative or limit.")],
      [target("FF.G6.SS.11", "The final room defense connects the student\u2019s artifact to the wider Nile civilization.", "Student explains a sourced connection among geography, agriculture and society or leadership.", "Check the required content cases across the class and each student\u2019s evidence; one room cannot stand for the whole standard."), target("FF.G6.SS.12", "The exhibition synthesizes an achievement and its wider cultural connections.", "Student explains writing/architecture and an Egypt\u2013Nubia exchange using sources.", "Include both achievement and diffusion questions in the final defense.")]
    ]
  ),
  review(
    "the-fate-of-the-republic",
    "3.0.0",
    6,
    "The Senate is an anchor for Roman republican institutions, law and participation. This project does not automatically cover all Roman geography, empire, religion, or the fall of Rome.",
    [
      [target("FF.G6.SS.20", "The opening connects a chosen side and a cited point to Roman republican institutions.", "Student names an institution, explains its function and connects it to the opening claim.")],
      [target("FF.G6.SS.20", "The first exchange tests claims about power and civic participation.", "Student explains whose interests are represented and answers an opposing point about participation.")],
      [target("FF.G6.SS.04", "The source clinic and same-side critique refine a response to a specific historical argument.", "Student fairly represents the opponent, cites evidence and explains the resulting revision."), target("FF.G6.SS.02", "The clinic examines the purpose and limits of Cicero\u2019s perspective.", "Student distinguishes one source\u2019s viewpoint from a claim about all Romans.")],
      [target("FF.G6.ELA.18", "The second exchange submits a supported response to the refined opposing argument.", "Student organizes claim, reasons and evidence and answers the actual counterargument.")],
      [target("FF.G6.ELA.21", "The reasoning clinic uses same-side peer feedback to improve the next response.", "Student preserves the earlier version, identifies the feedback used and explains a substantive change.")],
      [target("FF.G6.ELA.17", "The third exchange presents and answers the strongest opposing case.", "Observe the individual oral performance: a clear claim, relevant support and a fair response. A transcript alone does not establish delivery.")],
      [target("FF.G6.SS.02", "Closing preparation weighs sources and independently tests a fresh detail.", "Teacher supplies a fresh source detail; student explains its purpose or perspective and whether it changes the closing.")],
      [target("FF.G6.SS.20", "Closing arguments defend a judgment about republican institutions, law and participation.", "Student explains an institution or safeguard and its effect on Roman people."), target("FF.G6.SS.04", "Final exchange and judging use evidence, fair comparison and civic discourse.", "Student answers a personal challenge and supports performer rankings with observed evidence. Rankings are not mastery scores.")]
    ],
    "2.0.0"
  ),
  review(
    "survival-island-story-lab",
    "1.2.0",
    5,
    "These are writing targets. Creating branching fiction does not by itself demonstrate reading-analysis standards. Check the individual author\u2019s work even when peers playtest together.",
    [
      [target("FF.G5.ELA.20", "The opening establishes a character, setting and goal for the survival narrative.", "Student identifies the scene detail establishing the goal and explains how it fits the setting.")],
      [target("FF.G5.ELA.21", "The author plans reader choices before drafting each branch.", "Student retains a plan with two different consequences and explains the intended reader experience.")],
      [target("FF.G5.ELA.20", "Connected scenes develop events through sequence, description and character choice.", "Student writes a fresh consequence with a transition and specific detail while maintaining continuity.")],
      [target("FF.G5.ELA.21", "Peer playtesting supplies feedback about confusing or weak choices.", "Student records one reader problem and a concrete revision decision.")],
      [target("FF.G5.ELA.20", "Repairing a branch improves the sequence and plausibility of consequences.", "Student shows the continuity error and explains the effects of a new edit on a later scene.")],
      [target("FF.G5.ELA.20", "Testing every ending checks whether each narrative path reaches a coherent conclusion.", "Student links each ending to earlier choices and identifies an unsupported ending."), target("FF.G5.ELA.21", "The author prioritizes revisions using reader feedback.", "Student shows which feedback was used and how it improved the story.")],
      [target("FF.G5.ELA.20", "The craft defense transfers narrative technique to a changed character constraint.", "Student adapts a scene using description or dialogue and preserves coherent consequences.")],
      [target("FF.G5.ELA.21", "Publishing and reflection document the planning-to-final writing process.", "Student presents an individually authored story, a before/after revision and an explanation of its effect on the audience.")]
    ]
  ),
  review(
    "calendar-monument",
    "1.0.0",
    5,
    "Daily patterns use Earth\u2019s rotation; seasonal differences use axial tilt plus revolution. The supplied .14 wording mentions orbit, but the daily explanation must not attribute day/night to the yearly orbit. Sun observations do not cover all Moon, galaxy or constellation targets.",
    [
      [target("FF.G5.SCI.14", "The sundial tracks changes in shadow direction and length across a day.", "Student records multiple times and uses Earth\u2019s rotation to explain a prediction for a later hour.")],
      [target("FF.G5.SCI.16", "Seasonal comparisons hold location and time of day constant while changing date.", "Student compares shadow or daylight data and explains what must stay the same for a fair comparison.")],
      [target("FF.G5.SCI.16", "The explanation connects tilt and revolution to changing solar angle and daylight.", "Student predicts a new seasonal observation using tilt, rather than Earth\u2013Sun distance.")],
      [target("FF.G5.SCI.16", "Equinox and solstice marks apply seasonal sunlight patterns to the calendar.", "Student explains why the marks differ and how another latitude changes the alignment.")],
      [target("FF.G5.SCI.19", "An alignment trial uses a chosen tool to answer a testable measurement question.", "Student records the tool, units, prediction and result of a fresh trial.")],
      [target("FF.G5.SCI.18", "Repeated prototype trials reveal an alignment weakness and guide an improvement.", "Student compares before/after trials while holding a relevant condition constant, then explains the design change.")],
      [target("FF.G5.SCI.16", "The independent defense predicts how a new date or location affects the monument.", "Student relates the prediction to tilt, revolution and latitude and states a limit of the evidence.")],
      [target("FF.G5.SCI.18", "The demonstration connects a final design improvement to controlled test evidence.", "Student identifies a failure point, its revision and a trial showing the effect."), target("FF.G5.SCI.14", "The monument demonstration explains the daily shadow pattern that makes it work.", "Student uses the daily observations to explain shadow length and direction and Earth\u2019s rotation.")]
    ]
  ),
  review(
    "castle-archive-rescue",
    "4.0.0",
    5,
    "Review the grade 5 pathway only. Grade 6\u20138 game variants are extensions and are not credited here. Optical reflection and common-multiple timing are enrichment; a water-capacity activity is not proof of cubic-volume mastery.",
    [
      [target("FF.G5.MATH.11", "The balance vault combines unlike-denominator fractions and mixed numbers to make equal masses.", "Student writes the equality, shows equivalent fractions, and explains how a new weight changes it."), target("FF.G5.MATH.10", "The decimal seal combines decimal masses to balance the target.", "Student shows the decimal sum with correct place value.")],
      [target("FF.G5.MATH.11", "The fraction-gear rescue combines sectors into one complete turn.", "Student expresses the sectors with a common denominator and shows their sum is one.", "Use the fraction workshop for this check; a timing-wheel success alone does not assess fraction addition.")],
      [target("FF.G5.MATH.14", "The gear mechanism uses fractional multipliers to find missing tooth counts.", "Student calculates a tooth count from the given fraction and explains what is being multiplied."), target("FF.G5.MATH.15", "Comparing gear multipliers connects multiplication with enlargement or reduction.", "Student predicts whether a multiplier above or below one increases or decreases the tooth count.")],
      [target("FF.G5.MATH.23", "The optics workspace can be described using first-quadrant locations of the emitter, mirrors and receiver.", "Student plots the named positions as ordered pairs and distinguishes x from y.", "Add an explicit coordinate sketch. Rotating mirrors by trial and error is optical enrichment, not this standard\u2019s evidence.")],
      [target("FF.G5.MATH.24", "The crossing challenge moves from a starting coordinate to a destination.", "Student correctly updates x and y, plots the new position and explains the movement.")],
      [target("FF.G5.MATH.18", "Sluice preparation combines measured pours after converting litres and millilitres.", "Student converts to one unit, totals the pours and checks the required capacity.")],
      [target("FF.G5.MATH.16", "The fuel mixture uses fractions of the total rather than formal ratio notation.", "Student calculates 2/5 and 3/5 of 2.5 L, checks the total, then solves a changed quantity.")],
      [target("FF.G5.MATH.18", "The final boat defense checks measured capacity using consistent units.", "Student shows a conversion and verifies the load or fuel amount."), target("FF.G5.MATH.16", "The final rescue explanation revisits the fractional fuel quantities.", "Student independently defends one fraction multiplication and verifies the two portions sum to the whole.")]
    ]
  ),
  review(
    "championship-show",
    "1.0.0",
    6,
    "The existing four-round question bank is a rehearsal, not a full course. Check individual calculations and explanations; team scores, speed and winning do not confirm a standard.",
    [
      [target("FF.G6.MATH.06", "Opening Move calculates four $18.75 kits plus $6.50 delivery.", "Student shows 4 \xD7 18.75 + 6.50 = 81.50 and explains the decimal operations.")],
      [target("FF.G6.MATH.02", "Team planning prepares the method for comparing the two marker-pack prices.", "Each student explains total dollars divided by markers and labels dollars per marker.", "Add one individual unit-rate rehearsal during role planning; assigning team roles alone is not a math check.")],
      [target("FF.G6.MATH.06", "Beat the Buzzer diagnoses the claim that 0.4 \xD7 0.5 = 2.", "Student explains why the product is 0.2 and applies the same reasoning to a fresh decimal product.")],
      [target("FF.G6.MATH.02", "Make Your Case compares 6 markers for $4.50 with 10 for $7.", "Student calculates $0.75 and $0.70 per marker and explains the lower unit price.")],
      [target("FF.G6.MATH.06", "Error revision corrects a place-value or budget calculation before a fresh attempt.", "Student explains the error, retains the correction and solves a changed-number example.")],
      [target("FF.G6.MATH.03", "The championship rehearsal uses a fresh unit-price comparison to test the decision method.", "Each student calculates comparable rates and defends a choice before the team commits.", "Include a changed marker-pack comparison; strategy discussion alone does not demonstrate this target.")],
      [target("FF.G6.MATH.02", "The independent case tests transfer to a new pair of pack prices.", "Student computes both rates without hints and explains which offer is cheaper per item.")],
      [target("FF.G6.MATH.06", "Final Wager applies decimal operations to a fixed budget and delivery fee.", "Student shows that seven $14.75 displays plus $8 cost $111.25 and eight cost $126, then solves a changed budget."), target("FF.G6.MATH.02", "The final answer defense explains the marker comparison rather than relying on the scoreboard.", "Each student reconstructs and labels a unit-rate calculation.")]
    ]
  ),
  review(
    "cascade-bay-crisis",
    "1.0.0",
    6,
    "The simulation supports data-based decisions. Water-cycle models, air-mass interactions and human effects require explicit additional evidence; rainfall telemetry or emergency-resource allocation alone does not fully assess those science standards.",
    [
      [target("FF.G6.SS.06", "The situation map links elevation, river position, communities and exposed routes.", "Student uses two map features to explain which location is at risk.")],
      [target("FF.G6.SS.04", "The response plan argues for a priority using a cited report and resource constraints.", "Student identifies the source, supports the priority and explains a tradeoff when crews are reduced.")],
      [target("FF.G6.SCI.12", "Rainfall and river gauges provide observations for connecting parts of the water system.", "Student models precipitation, runoff and collection and connects solar energy and gravity to the cycle.", "Add a complete water-cycle diagram and explanation. Reading gauge values alone covers only a small part of the standard.")],
      [target("FF.G6.SCI.13", "The first response can examine how infrastructure and land use affect water movement.", "Student compares runoff or flooding evidence for two land-use conditions.", "Provide an explicit human-impact data comparison; deploying crews is not evidence that humans changed an Earth system.")],
      [target("FF.G6.SCI.15", "Reassessing weather reports provides a context for testing a revised weather prediction.", "Student uses observations of interacting air masses to justify a probable change in weather.", "Add air-mass observations and collection notes. The current rainfall forecast alone does not establish air-mass interactions.")],
      [target("FF.G6.SS.03", "The next response compares conflicting reports and the consequences of earlier decisions.", "Student corroborates a claim with two reports and explains why one interpretation is better supported.")],
      [target("FF.G6.SCI.12", "A fresh flood condition tests whether the student can explain the connected water system.", "Student traces water through a diagram and uses gravity and solar energy in the explanation.", "Use the model added in lesson 3 and check it independently; a response recommendation alone does not meet this target.")],
      [target("FF.G6.SS.04", "The debrief communicates an evidence-based decision and its consequences.", "Student cites a report, explains the tradeoff and acknowledges uncertainty."), target("FF.G6.SCI.13", "The final debrief revisits how a human activity affected the water system.", "Student explains a causal claim using the human-impact data comparison.", "Include the lesson 4 land-use comparison in the defense; do not count emergency coordination as full science coverage.")]
    ]
  ),
  review(
    "community-story-network",
    "1.0.0",
    6,
    "This project currently offers a preview publication workflow. Conduct the reporting, writing and evidence checks with teacher support; publication and editor approval are not proof that every student met the ELA standard.",
    [
      [target("FF.G6.ELA.22", "The reporter identifies a focused community question and initial background sources.", "Student distinguishes a verified fact from a question that still needs reporting.")],
      [target("FF.G6.ELA.22", "The pitch and interview plan select sources that can provide relevant evidence.", "Student explains why a source is useful and writes a question that could produce a verifiable answer.")],
      [target("FF.G6.ELA.22", "Reporting notes distinguish quotations, paraphrases and unconfirmed statements.", "Student checks a quotation against its source, records attribution and identifies remaining uncertainty.")],
      [target("FF.G6.ELA.19", "The rough story organizes a topic with facts, quotations and precise explanation.", "Student supports a draft claim with a source and explains how the story structure helps an audience understand it.")],
      [target("FF.G6.ELA.21", "Revision replaces unsupported statements with supported, clearer writing.", "Student keeps the original and revised passage and explains the correction.")],
      [target("FF.G6.ELA.14", "Editorial review compares perspectives and evaluates whether media and evidence support the report.", "Student compares two accounts, identifies a missing perspective and checks a media claim.")],
      [target("FF.G6.ELA.22", "The independent reporting defense evaluates a new conflicting source.", "Student assesses relevance and credibility and explains whether the bylined contribution must change.")],
      [target("FF.G6.ELA.21", "Publish Day completes the planning, revision, editing and digital-production sequence.", "Student shows their bylined contribution and a meaningful revision."), target("FF.G6.ELA.17", "The launch discussion presents a supported claim to the community audience.", "Student explains an editorial decision with evidence and answers a question clearly.")]
    ]
  ),
  review(
    "hammurabi-on-trial",
    "2.0.0",
    6,
    "FF.G6.SS.10 bundles monarchy, empire, hierarchy, polytheism, cuneiform, architecture, epic literature and law. The inquiry covers context as well as the trial; checking a legal argument alone cannot confirm every component.",
    [
      [target("FF.G6.SS.10", "The opening connects law to monarchy, empire and hierarchy through source inspection and private context evidence.", "Student explains city versus empire and how kingship or status affected people."), target("FF.G6.SS.01", "Opening preparation gathers and cites project sources.", "Student identifies source origins, relevance and a remaining evidence gap in the context defense.")],
      [target("FF.G6.SS.10", "The first exchange compares an argument about order with one about fairness.", "Student links a law and social status to an actual opposing point.")],
      [target("FF.G6.SS.10", "The source clinic connects polytheism, cuneiform, kingship and epic literature.", "Student explains each concept in the context evidence and distinguishes writing system from language."), target("FF.G6.SS.02", "Same-side critique compares purpose and genre before revision.", "Student distinguishes royal promises, law and literature and explains the limits of their claims.")],
      [target("FF.G6.SS.04", "The second exchange submits a response using law and an opposing interpretation.", "Student distinguishes intended protection from evidence of everyday enforcement.")],
      [target("FF.G6.SS.04", "The reasoning clinic and peer critique test a hypothetical law change.", "Student labels the change hypothetical, supports effects on two groups and preserves the revision."), target("FF.G6.SS.10", "The context defense examines monumental architecture without using it as proof of legal enforcement.", "Student explains the architectural source and its limits.")],
      [target("FF.G6.SS.04", "The third exchange answers the strongest competing interpretation.", "Student fairly summarizes what was heard, cites a response and acknowledges a limitation.")],
      [target("FF.G6.SS.10", "Closing preparation compares unavoidable crop failure with negligent canal damage and revisits all context concepts.", "Student independently compares laws 48 and 55, connects social context and explains a source limitation.")],
      [target("FF.G6.SS.04", "The final exchange and criterion-based judging defend a verdict and evaluate individual performances.", "Student answers a follow-up and justifies rankings from observed evidence; rankings do not confirm mastery."), target("FF.G6.SS.10", "The private context defense connects law with government, beliefs and cultural achievements.", "Student explains monarchy, empire, hierarchy, polytheism, cuneiform, architecture, literature and law using sources.", "Teacher checks every bundled component and supplies a follow-up for anything missing. Testing access remains open.")]
    ],
    "2.0.0"
  )
];

// src/app/projects/forge-review-standards.json
var forge_review_standards_default = [
  {
    id: "FF.G5.ELA.12",
    grade: 5,
    title: "Explain evidence, central ideas, and relationships",
    description: "Quote accurately, identify two or more central ideas, summarize, and explain relationships among people, events, ideas, or concepts.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - ELA 4-6.csv"
  },
  {
    id: "FF.G5.ELA.16",
    grade: 5,
    title: "Collaborate and evaluate spoken information",
    description: "Prepare for discussions, follow agreed norms, build on others\u2019 ideas, summarize information, and evaluate a speaker\u2019s reasons and evidence.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - ELA 4-6.csv"
  },
  {
    id: "FF.G5.ELA.17",
    grade: 5,
    title: "Present clearly with evidence, media, and register",
    description: "Present a topic, text, or opinion in logical sequence, use multimedia purposefully, and adapt speech to context.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - ELA 4-6.csv"
  },
  {
    id: "FF.G5.ELA.19",
    grade: 5,
    title: "Write informative explanations",
    description: "Develop a topic with facts, definitions, quotations, examples, precise language, transitions, formatting, and a conclusion.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - ELA 4-6.csv"
  },
  {
    id: "FF.G5.ELA.20",
    grade: 5,
    title: "Craft effective narratives",
    description: "Develop real or imagined experiences using effective technique, sequence, pacing, description, dialogue, transitions, and conclusion.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - ELA 4-6.csv"
  },
  {
    id: "FF.G5.ELA.21",
    grade: 5,
    title: "Plan, revise, edit, and publish coherent writing",
    description: "Produce writing appropriate to task, purpose, and audience, then strengthen it through planning, feedback, revision, editing, and digital production.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - ELA 4-6.csv"
  },
  {
    id: "FF.G5.ELA.22",
    grade: 5,
    title: "Research, evaluate sources, and use evidence",
    description: "Conduct short research using multiple sources, gather and categorize information, take notes, cite sources, and draw evidence from texts.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - ELA 4-6.csv"
  },
  {
    id: "FF.G6.ELA.14",
    grade: 6,
    title: "Integrate media, evaluate arguments, and compare sources",
    description: "Integrate information across media, trace and evaluate arguments and claims, and compare authors\u2019 presentations of the same events or ideas.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - ELA 4-6.csv"
  },
  {
    id: "FF.G6.ELA.17",
    grade: 6,
    title: "Evaluate arguments and present claims",
    description: "Explain a speaker\u2019s argument and claims, present findings in logical sequence, use multimedia purposefully, and adapt speech to context.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - ELA 4-6.csv"
  },
  {
    id: "FF.G6.ELA.18",
    grade: 6,
    title: "Write evidence-based arguments",
    description: "Write arguments with clear claims, relevant evidence, logical organization, credible sources, formal style, and a conclusion.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - ELA 4-6.csv"
  },
  {
    id: "FF.G6.ELA.19",
    grade: 6,
    title: "Write informative explanations",
    description: "Examine a topic using organized relevant content, facts, definitions, quotations, examples, transitions, precise language, formal style, and a conclusion.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - ELA 4-6.csv"
  },
  {
    id: "FF.G6.ELA.21",
    grade: 6,
    title: "Plan, revise, edit, and publish coherent writing",
    description: "Produce writing appropriate to task, purpose, and audience, then strengthen it through planning, feedback, revision, editing, and digital production.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - ELA 4-6.csv"
  },
  {
    id: "FF.G6.ELA.22",
    grade: 6,
    title: "Research, evaluate sources, and integrate evidence",
    description: "Conduct research using multiple sources, integrate relevant and credible information, cite sources, and support analysis and reflection with textual evidence.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - ELA 4-6.csv"
  },
  {
    id: "FF.G5.MATH.10",
    grade: 5,
    title: "Operate with decimals to hundredths",
    description: "Add, subtract, multiply, and divide decimals to hundredths using models, place-value reasoning, and estimation to assess reasonableness.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Math 4-6.csv"
  },
  {
    id: "FF.G5.MATH.11",
    grade: 5,
    title: "Add and subtract fractions with unlike denominators",
    description: "Use equivalent fractions to add and subtract fractions and mixed numbers with unlike denominators.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Math 4-6.csv"
  },
  {
    id: "FF.G5.MATH.14",
    grade: 5,
    title: "Multiply fractions and model fractional area",
    description: "Multiply a fraction by a whole number or another fraction and connect the product to visual models and rectangular area.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Math 4-6.csv"
  },
  {
    id: "FF.G5.MATH.15",
    grade: 5,
    title: "Interpret multiplication as scaling",
    description: "Compare product size to factor size and explain how multiplying by fractions greater than, equal to, or less than one scales a quantity.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Math 4-6.csv"
  },
  {
    id: "FF.G5.MATH.16",
    grade: 5,
    title: "Solve fraction multiplication problems",
    description: "Solve real-world problems involving multiplication of fractions and mixed numbers with visual models or equations.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Math 4-6.csv"
  },
  {
    id: "FF.G5.MATH.18",
    grade: 5,
    title: "Convert measurements within a system",
    description: "Convert customary and metric measurements from larger units to smaller units and solve multistep problems involving length, time, volume, mass, and money.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Math 4-6.csv"
  },
  {
    id: "FF.G5.MATH.23",
    grade: 5,
    title: "Graph and interpret ordered pairs",
    description: "Graph and label ordered pairs in the first quadrant and explain how coordinates represent horizontal and vertical distances.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Math 4-6.csv"
  },
  {
    id: "FF.G5.MATH.24",
    grade: 5,
    title: "Solve problems on the coordinate plane",
    description: "Represent and solve real-world and mathematical problems by graphing and interpreting points in the first quadrant.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Math 4-6.csv"
  },
  {
    id: "FF.G6.MATH.02",
    grade: 6,
    title: "Interpret unit rates",
    description: "Understand unit rate as a ratio with a nonzero second quantity and use rate language in context.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Math 4-6.csv"
  },
  {
    id: "FF.G6.MATH.03",
    grade: 6,
    title: "Solve ratio, rate, percent, and conversion problems",
    description: "Use equivalent-ratio tables, diagrams, graphs, equations, unit rates, percents, and unit conversions to solve problems.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Math 4-6.csv"
  },
  {
    id: "FF.G6.MATH.06",
    grade: 6,
    title: "Operate with multi-digit decimals fluently",
    description: "Fluently add, subtract, multiply, and divide multi-digit decimals using standard algorithms connected to conceptual models.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Math 4-6.csv"
  },
  {
    id: "FF.G5.SCI.02",
    grade: 5,
    title: "Demonstrate conservation of matter",
    description: "Use data to show that the amount of matter is conserved when matter changes form, including changes where matter appears to vanish.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Science 4-6.csv"
  },
  {
    id: "FF.G5.SCI.03",
    grade: 5,
    title: "Determine whether mixing forms a new substance",
    description: "Use physical properties as evidence to argue whether combining substances produces a new substance.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Science 4-6.csv"
  },
  {
    id: "FF.G5.SCI.14",
    grade: 5,
    title: "Model day, night, and shadow patterns",
    description: "Use a model to explain how Earth\u2019s orbit and the sun relate to day-night patterns and changes in shadow length and direction.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Science 4-6.csv"
  },
  {
    id: "FF.G5.SCI.16",
    grade: 5,
    title: "Explain seasons and changing daylight",
    description: "Relate Earth\u2019s axial tilt and revolution to changing sunlight intensity, day length, and seasons at different latitudes.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Science 4-6.csv"
  },
  {
    id: "FF.G5.SCI.18",
    grade: 5,
    title: "Test and improve prototypes",
    description: "Plan and carry out controlled tests of prototype elements, identify failure points, and use results to improve the design.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Science 4-6.csv"
  },
  {
    id: "FF.G5.SCI.19",
    grade: 5,
    title: "Use tools to answer testable questions",
    description: "Select and use appropriate tools to make measurements and answer testable questions.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Science 4-6.csv"
  },
  {
    id: "FF.G6.SCI.12",
    grade: 6,
    title: "Model the water cycle as an Earth system",
    description: "Develop a model of water cycling through Earth\u2019s systems driven by solar energy and gravity.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Science 4-6.csv"
  },
  {
    id: "FF.G6.SCI.13",
    grade: 6,
    title: "Analyze changes to water, landform, and atmospheric systems",
    description: "Analyze data to determine how humans and other organisms affect the water cycle, landforms, and atmospheric systems.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Science 4-6.csv"
  },
  {
    id: "FF.G6.SCI.15",
    grade: 6,
    title: "Use air-mass data to predict weather",
    description: "Collect data showing how air-mass interactions change local weather and use the data to predict probable patterns.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Science 4-6.csv"
  },
  {
    id: "FF.G6.SS.01",
    grade: 6,
    title: "Gather inquiry sources",
    description: "Collect relevant information from varied primary and secondary sources, including print, artifacts, graphics, media, technology, and oral history.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Social Studies 4-6.csv"
  },
  {
    id: "FF.G6.SS.02",
    grade: 6,
    title: "Critically examine sources",
    description: "Extract, summarize, and paraphrase relevant ideas; distinguish fact and opinion; analyze purpose, viewpoint, bias, inference, and argument strength.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Social Studies 4-6.csv"
  },
  {
    id: "FF.G6.SS.03",
    grade: 6,
    title: "Synthesize and compare evidence",
    description: "Synthesize data across sources, recognize differences among accounts, establish validity through comparison, and frame further questions.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Social Studies 4-6.csv"
  },
  {
    id: "FF.G6.SS.04",
    grade: 6,
    title: "Communicate evidence-based arguments",
    description: "Construct and communicate arguments with cited evidence, compare viewpoints, explain cause and effect, predict outcomes, propose solutions, and engage in civic discourse.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Social Studies 4-6.csv"
  },
  {
    id: "FF.G6.SS.06",
    grade: 6,
    title: "Develop geographic awareness",
    description: "Use varied maps and geographic perspectives to analyze spatial relationships, diffusion, regions, and human-environment interaction across scales.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Social Studies 4-6.csv"
  },
  {
    id: "FF.G6.SS.10",
    grade: 6,
    title: "Evaluate government, society, religion, writing, and law",
    description: "Explain monarchy, empire, hierarchy, polytheism, cuneiform, monumental architecture, epic literature, and the Code of Hammurabi.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Social Studies 4-6.csv"
  },
  {
    id: "FF.G6.SS.11",
    grade: 6,
    title: "Connect geography, agriculture, society, and leadership",
    description: "Explain how the Nile region supported agriculture and state development and analyze social structure, religion, and influential pharaohs.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Social Studies 4-6.csv"
  },
  {
    id: "FF.G6.SS.12",
    grade: 6,
    title: "Analyze achievements and cultural diffusion",
    description: "Evaluate Egyptian writing and architecture and explain cultural diffusion between Egypt and Nubia through trade and conflict.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Social Studies 4-6.csv"
  },
  {
    id: "FF.G6.SS.20",
    grade: 6,
    title: "Explain Roman geography, society, and republican government",
    description: "Explain how geography supported Roman growth and analyze Roman social classes, republican institutions, checks and balances, civic participation, and law.",
    sourceFile: "Forge_School_Master_Standards_Framework_Grades_4-6.xlsx - Social Studies 4-6.csv"
  }
];

// src/app/runtime/project-launch/project-standards.registry.ts
var forgeReviewStandards = new Map(
  forge_review_standards_default.map((standard) => [standard.id, standard])
);
var reviews = new Map(projectLessonStandards.map((review2) => [
  `${review2.projectId}@${review2.projectVersion}`,
  review2
]));
function findProjectStandardsReview(project, plan) {
  if (!project || !plan || project.id !== plan.projectId || project.projectVersion !== plan.projectVersion) return void 0;
  const review2 = reviews.get(`${project.id}@${project.projectVersion}`);
  return review2 && review2.planVersion === plan.planVersion && project.grade === `Grade ${review2.grade}` ? review2 : void 0;
}
var curriculumConnections = projectCatalog.flatMap((project) => {
  const plan = projectLessonRegistry.find(project.id, project.projectVersion);
  const review2 = findProjectStandardsReview(project, plan);
  return review2 && plan ? review2.lessons.flatMap((lesson) => lesson.targets.map((target2) => ({
    standardId: target2.standardId,
    projectId: project.id,
    projectTitle: project.title,
    lessonNumber: lesson.number,
    lessonTitle: plan.lessons[lesson.number - 1].title,
    addressed: target2.addressed
  }))) : [];
});

// src/app/runtime/project-launch/project-host.component.ts
var _c02 = (a0) => ["/projects", a0, "final-demo"];
function ProjectHostComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-project-lesson-nav", 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("plan", ctx_r0.lessonPlan())("route", ctx_r0.workspaceRoute())("selected", ctx_r0.lessonPlan()?.presentation && ctx_r0.currentRoute().at(-1) === "final-demo" ? 8 : ctx_r0.selectedLesson())("finalExampleRoute", ctx_r0.hasFinalExample() ? \u0275\u0275pureFunction1(5, _c02, ctx_r0.project().id) : null)("finalExampleActive", ctx_r0.currentRoute().at(-1) === "final-demo");
  }
}
function ProjectHostComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "main", 1)(1, "span");
    \u0275\u0275text(2, "Loading project package\u2026");
    \u0275\u0275elementEnd()();
  }
}
function ProjectHostComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "main", 2)(1, "h1");
    \u0275\u0275text(2, "Project unavailable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 3);
    \u0275\u0275text(6, "Return to projects");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function ProjectHostComponent_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-standards-review", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("review", ctx)("plan", ctx_r0.lessonPlan())("selected", ctx_r0.lessonPlan()?.presentation && ctx_r0.currentRoute().at(-1) === "final-demo" ? 8 : ctx_r0.selectedLesson())("standards", ctx_r0.reviewStandards)("connections", ctx_r0.curriculumConnections)("compact", !!ctx_r0.lessonPlan()?.presentation);
  }
}
function ProjectHostComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-curriculum-disclosure", 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("plan", ctx_r0.lessonPlan())("selected", ctx_r0.currentRoute().at(-1) === "final-demo" ? 8 : ctx_r0.selectedLesson());
  }
}
function ProjectHostComponent_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "iframe", 7);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeResourceUrl)("title", ctx_r0.project()?.title + " \u2014 project preview");
  }
}
function ProjectHostComponent_Conditional_3_Conditional_4_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ProjectHostComponent_Conditional_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ProjectHostComponent_Conditional_3_Conditional_4_ng_container_0_Template, 1, 0, "ng-container", 8);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngComponentOutlet", ctx_r0.component())("ngComponentOutletEnvironmentInjector", ctx_r0.projectInjector());
  }
}
function ProjectHostComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProjectHostComponent_Conditional_3_Conditional_0_Template, 1, 6, "app-standards-review", 4)(1, ProjectHostComponent_Conditional_3_Conditional_1_Template, 1, 2, "app-curriculum-disclosure", 5);
    \u0275\u0275elementStart(2, "div", 6);
    \u0275\u0275conditionalCreate(3, ProjectHostComponent_Conditional_3_Conditional_3_Template, 1, 2, "iframe", 7)(4, ProjectHostComponent_Conditional_3_Conditional_4_Template, 1, 2, "ng-container");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r0.standardsReview()) ? 0 : ctx_r0.lessonPlan()?.presentation ? 1 : -1, tmp_1_0);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("lesson-focused", ctx_r0.isActivity() && !!ctx_r0.lessonPlan());
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx_r0.previewUrl()) ? 3 : 4, tmp_3_0);
  }
}
var ProjectHostComponent = class _ProjectHostComponent {
  route = inject(ActivatedRoute);
  query = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap
  });
  parentInjector = inject(EnvironmentInjector);
  documentTitle = inject(Title);
  sanitizer = inject(DomSanitizer);
  catalog = inject(ProjectCatalogService);
  sessionResolver = inject(PROJECT_SESSION_RESOLVER, { optional: true });
  source = new LocalProjectDefinitionSource();
  subscription;
  outlet = viewChild(
    NgComponentOutlet,
    ...ngDevMode ? [{ debugName: "outlet" }] : (
      /* istanbul ignore next */
      []
    )
  );
  introPersistence = inject(PROJECT_INTRO_PERSISTENCE, { optional: true });
  generation = 0;
  project = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "project" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lessonPlan = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "lessonPlan" }] : (
      /* istanbul ignore next */
      []
    )
  );
  standardsReview = computed(
    () => findProjectStandardsReview(this.project(), this.lessonPlan()),
    ...ngDevMode ? [{ debugName: "standardsReview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reviewStandards = forgeReviewStandards;
  curriculumConnections = curriculumConnections;
  isLessonView = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLessonView" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentRoute = signal(
    [],
    ...ngDevMode ? [{ debugName: "currentRoute" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lessonFocus = computed(
    () => this.lessonPlan()?.lessons[this.selectedLesson() - 1],
    ...ngDevMode ? [{ debugName: "lessonFocus" }] : (
      /* istanbul ignore next */
      []
    )
  );
  workspaceFocus = computed(
    () => this.isActivity() && (this.isLessonView() || this.query().has("lesson")) ? this.lessonFocus() : void 0,
    ...ngDevMode ? [{ debugName: "workspaceFocus" }] : (
      /* istanbul ignore next */
      []
    )
  );
  workspaceRoute = computed(
    () => (this.isActivity() || this.isLessonView()) && !["final-demo", "builder-info"].includes(this.currentRoute().at(-1) ?? "") ? this.currentRoute() : ["/projects", this.project()?.id ?? "", "lessons"],
    ...ngDevMode ? [{ debugName: "workspaceRoute" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedLesson = computed(
    () => lessonNumber(this.query().get("lesson")),
    ...ngDevMode ? [{ debugName: "selectedLesson" }] : (
      /* istanbul ignore next */
      []
    )
  );
  component = signal(
    null,
    ...ngDevMode ? [{ debugName: "component" }] : (
      /* istanbul ignore next */
      []
    )
  );
  projectInjector = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "projectInjector" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = signal(
    true,
    ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previewUrl = signal(
    null,
    ...ngDevMode ? [{ debugName: "previewUrl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  error = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isActivity = signal(
    false,
    ...ngDevMode ? [{ debugName: "isActivity" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasIntro = signal(
    false,
    ...ngDevMode ? [{ debugName: "hasIntro" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasFinalExample = signal(
    false,
    ...ngDevMode ? [{ debugName: "hasFinalExample" }] : (
      /* istanbul ignore next */
      []
    )
  );
  integratedHeader = signal(
    false,
    ...ngDevMode ? [{ debugName: "integratedHeader" }] : (
      /* istanbul ignore next */
      []
    )
  );
  usesIntegratedActivityHeader = computed(
    () => this.isActivity() && (this.integratedHeader() || this.project()?.template.id === "journey-replay"),
    ...ngDevMode ? [{ debugName: "usesIntegratedActivityHeader" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    this.subscription = this.route.paramMap.subscribe(() => void this.load());
  }
  ngOnDestroy() {
    this.generation++;
    this.subscription.unsubscribe();
    this.projectInjector()?.destroy();
  }
  canLeave() {
    const component = this.outlet()?.componentInstance;
    return component?.canLeave?.() ?? true;
  }
  async load() {
    const generation = ++this.generation;
    this.loading.set(true);
    this.previewUrl.set(null);
    this.integratedHeader.set(false);
    this.lessonPlan.set(void 0);
    this.isLessonView.set(false);
    this.hasIntro.set(false);
    this.hasFinalExample.set(false);
    this.isActivity.set(false);
    this.error.set(void 0);
    this.component.set(null);
    this.projectInjector()?.destroy();
    this.projectInjector.set(void 0);
    const projectId = this.route.snapshot.paramMap.get("projectId");
    await this.catalog.load();
    if (generation !== this.generation)
      return;
    const project = this.catalog.find(projectId);
    if (project === void 0) {
      this.loading.set(false);
      this.error.set("This project is not registered in the project catalog.");
      return;
    }
    this.project.set(project);
    const currentView = this.route.snapshot.paramMap.get("view");
    this.currentRoute.set(["/projects", project.id, ...currentView ? [currentView] : []]);
    this.documentTitle.setTitle(`${project.title} | Forge PBL`);
    try {
      const plan = projectLessonRegistry.find(project.id, project.projectVersion);
      this.lessonPlan.set(plan);
      this.hasFinalExample.set(project.entryMode === "preview" || !!projectIntroRegistry.find(project.id) || project.finalExampleMode === "template");
      if (this.route.snapshot.paramMap.get("view") === "lessons") {
        if (!plan)
          throw new Error("LESSON_PLAN_UNAVAILABLE: This project version has no reviewed eight-lesson plan.");
        this.isLessonView.set(true);
      }
      if (project.entryMode === "preview") {
        const view2 = this.route.snapshot.paramMap.get("view");
        if (!/^[a-z0-9][a-z0-9-]*$/.test(project.id) || view2 !== null && view2 !== "final-demo" && view2 !== "lessons") {
          throw new Error("This project offers an introduction and a mock showcase only.");
        }
        const page = view2 === "final-demo" ? "showcase" : "launch";
        this.previewUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(`/projects/${project.id}/${page}.html`));
        return;
      }
      const intro = projectIntroRegistry.find(project.id);
      const directEntry = project.entryMode === "activity";
      this.hasIntro.set(!directEntry);
      this.hasFinalExample.set(!!intro || project.finalExampleMode === "template");
      const view = this.isLessonView() ? plan?.workspaceView ?? "experience" : this.route.snapshot.paramMap.get("view");
      this.isActivity.set(view !== null && view !== "final-demo");
      const session = view === "final-demo" ? createLocalPreviewSession(project.id, project.projectVersion) : this.sessionResolver === null ? localProjectSession(project) : await this.sessionResolver.resolve(project);
      if (session.projectId !== project.id || session.projectVersion !== project.projectVersion) {
        throw new Error("The authenticated project session does not match the selected package.");
      }
      let definition;
      let target2;
      if (view === "final-demo" && project.finalExampleMode !== "template" || view === null && !directEntry) {
        if (view === "final-demo" && !intro)
          throw new Error("CAPABILITY_NOT_INSTALLED: This project has no final-example configuration.");
        target2 = {
          component: view === "final-demo" ? (await import("./chunk-W4OI54HK.js")).ProjectFinalExampleComponent : (await import("./chunk-V262EZAF.js")).ProjectIntroComponent,
          providers: [
            ...intro ? [{ provide: PROJECT_INTRO_CONFIG, useValue: intro }] : [],
            ...view === "final-demo" ? [] : [
              {
                provide: PROJECT_INTRO_PERSISTENCE,
                useValue: this.introPersistence ?? new BrowserProjectIntroAdapter()
              }
            ]
          ]
        };
      } else {
        this.isActivity.set(true);
        const registry = createLocalTemplateLauncherRegistry();
        definition = await this.source.load(project);
        const launcher = await registry.require(project.template.id);
        target2 = await launcher.load({
          project,
          projectDefinition: definition,
          session,
          view: view ?? void 0
        });
      }
      if (generation !== this.generation)
        return;
      this.integratedHeader.set(target2.integratedHeader === true);
      const injector = createEnvironmentInjector([
        { provide: PROJECT_CATALOG_ENTRY, useValue: project },
        { provide: PROJECT_DEFINITION, useValue: definition },
        { provide: PROJECT_SESSION_CONTEXT, useValue: session },
        { provide: PROJECT_LESSON_FOCUS, useValue: this.workspaceFocus },
        ...target2.providers
      ], this.parentInjector, `project:${project.id}`);
      this.projectInjector.set(injector);
      this.component.set(target2.component);
    } catch (error) {
      if (generation !== this.generation)
        return;
      this.error.set(error instanceof Error ? error.message : "The project could not be launched.");
    } finally {
      if (generation === this.generation)
        this.loading.set(false);
    }
  }
  static \u0275fac = function ProjectHostComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectHostComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectHostComponent, selectors: [["app-project-host"]], viewQuery: function ProjectHostComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.outlet, NgComponentOutlet, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 4, vars: 2, consts: [[3, "plan", "route", "selected", "finalExampleRoute", "finalExampleActive"], ["aria-live", "polite", 1, "project-host-status"], ["role", "alert", 1, "project-host-status", "project-host-error"], ["routerLink", "/projects"], [3, "review", "plan", "selected", "standards", "connections", "compact"], [3, "plan", "selected"], [1, "project-surface"], [1, "project-preview", 3, "src", "title"], [4, "ngComponentOutlet", "ngComponentOutletEnvironmentInjector"]], template: function ProjectHostComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ProjectHostComponent_Conditional_0_Template, 1, 7, "app-project-lesson-nav", 0);
      \u0275\u0275conditionalCreate(1, ProjectHostComponent_Conditional_1_Template, 3, 0, "main", 1)(2, ProjectHostComponent_Conditional_2_Template, 7, 1, "main", 2)(3, ProjectHostComponent_Conditional_3_Template, 5, 4);
    }
    if (rf & 2) {
      \u0275\u0275conditional(!ctx.loading() && !ctx.error() && ctx.lessonPlan() ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 1 : ctx.error() ? 2 : 3);
    }
  }, dependencies: [NgComponentOutlet, RouterLink, ProjectLessonNavComponent, StandardsReviewComponent, CurriculumDisclosureComponent], styles: ["\n[_nghost-%COMP%] {\n  --%NS%project-navigation-height: 112px;\n  display: block;\n  min-height: 100dvh;\n}\n@media (max-width: 1100px) {\n  [_nghost-%COMP%] {\n    --%NS%project-navigation-height: 152px;\n  }\n}\n.project-preview[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100dvh;\n  border: 0;\n}\n.project-host-status[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  display: grid;\n  place-content: center;\n  gap: 1rem;\n  padding: 2rem;\n  text-align: center;\n  color: #17212b;\n  background: #f4f0e7;\n}\n.project-host-error[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #7b321f;\n  font-weight: 700;\n}\n@media (max-width: 600px) {\n  [_nghost-%COMP%] {\n    --%NS%project-navigation-height: 250px;\n  }\n}\n/*# sourceMappingURL=project-host.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectHostComponent, [{
    type: Component,
    args: [{ selector: "app-project-host", imports: [NgComponentOutlet, RouterLink, ProjectLessonNavComponent, StandardsReviewComponent, CurriculumDisclosureComponent], template: `@if (!loading() && !error() && lessonPlan()) {\r
  <app-project-lesson-nav\r
    [plan]="lessonPlan()"\r
    [route]="workspaceRoute()"\r
    [selected]="lessonPlan()?.presentation && currentRoute().at(-1) === 'final-demo' ? 8 : selectedLesson()"
    [finalExampleRoute]="hasFinalExample() ? ['/projects', project()!.id, 'final-demo'] : null"\r
    [finalExampleActive]="currentRoute().at(-1) === 'final-demo'"\r
  />\r
}\r
@if (loading()) {\r
  <main class="project-host-status" aria-live="polite"><span>Loading project package\u2026</span></main>\r
} @else if (error()) {\r
  <main class="project-host-status project-host-error" role="alert">\r
    <h1>Project unavailable</h1>\r
    <p>{{ error() }}</p>\r
    <a routerLink="/projects">Return to projects</a>\r
  </main>\r
} @else {\r
  @if (standardsReview(); as review) {\r
    <app-standards-review\r
      [review]="review"\r
      [plan]="lessonPlan()!"\r
      [selected]="lessonPlan()?.presentation && currentRoute().at(-1) === 'final-demo' ? 8 : selectedLesson()"
      [standards]="reviewStandards"\r
      [connections]="curriculumConnections"
      [compact]="!!lessonPlan()?.presentation"
    />\r
  } @else if (lessonPlan()?.presentation) {
    <app-curriculum-disclosure [plan]="lessonPlan()!" [selected]="currentRoute().at(-1) === 'final-demo' ? 8 : selectedLesson()" />
  }
  <!-- Lesson changes retain the visual workspace and its unsaved drafts. -->
  <div class="project-surface" [class.lesson-focused]="isActivity() && !!lessonPlan()">\r
    @if (previewUrl(); as url) {\r
      <iframe\r
        class="project-preview"\r
        [src]="url"\r
        [title]="project()?.title + ' \u2014 project preview'"\r
      ></iframe>\r
    } @else {\r
      <ng-container\r
        *ngComponentOutlet="component(); environmentInjector: projectInjector()"\r
      ></ng-container>\r
    }\r
  </div>\r
}\r
`, styles: ["/* src/app/runtime/project-launch/project-host.component.scss */\n:host {\n  --project-navigation-height: 112px;\n  display: block;\n  min-height: 100dvh;\n}\n@media (max-width: 1100px) {\n  :host {\n    --project-navigation-height: 152px;\n  }\n}\n.project-preview {\n  display: block;\n  width: 100%;\n  height: 100dvh;\n  border: 0;\n}\n.project-host-status {\n  min-height: 100dvh;\n  display: grid;\n  place-content: center;\n  gap: 1rem;\n  padding: 2rem;\n  text-align: center;\n  color: #17212b;\n  background: #f4f0e7;\n}\n.project-host-error a {\n  color: #7b321f;\n  font-weight: 700;\n}\n@media (max-width: 600px) {\n  :host {\n    --project-navigation-height: 250px;\n  }\n}\n/*# sourceMappingURL=project-host.component.css.map */\n"] }]
  }], () => [], { outlet: [{ type: ViewChild, args: [forwardRef(() => NgComponentOutlet), { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectHostComponent, { className: "ProjectHostComponent", filePath: "src/app/runtime/project-launch/project-host.component.ts", lineNumber: 54 });
})();
export {
  ProjectHostComponent
};
//# debugId=7cefbf17-36ef-598f-9406-613c29efa1a7
//# sourceMappingURL=chunk-BKMW5TS5.js.map
