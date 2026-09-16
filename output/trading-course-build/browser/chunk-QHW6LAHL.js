import {
  SolarMonumentComponent
} from "./chunk-L272B73U.js";
import {
  ENGINEERING_CONFIG,
  ENGINEERING_PERSISTENCE,
  ENGINEERING_SESSION,
  EngineeringDesignRuntime,
  isEngineeringSnapshot,
  requireEngineeringConfig
} from "./chunk-S4ZXE6OE.js";
import {
  DESIGN_CAPTURE,
  DESIGN_CAPTURE_BATCH,
  DESIGN_CHECKS_CHANGE,
  DESIGN_SIMULATIONS,
  DesignSimulationRegistry
} from "./chunk-T7GOLBBA.js";
import "./chunk-UW6DFD2Z.js";
import {
  ScopedBrowserStore,
  safeBrowserStorage
} from "./chunk-OXVZ3VYX.js";
import "./chunk-2WXJ5NX3.js";
import "./chunk-ENCFJY7U.js";
import "./chunk-E2VJWGUE.js";
import "./chunk-GOMI4DH3.js";

// src/app/infrastructure/persistence/browser-engineering-design.adapter.ts
var BrowserEngineeringDesignAdapter = class {
  constructor(session, storage = safeBrowserStorage()) {
    this.session = session;
    this.storage = storage;
    this.store = new ScopedBrowserStore("engineering-design.v1", storage, isEngineeringSnapshot);
    this.location = storage ? "Saved in this browser" : "Session only \u2014 export your notebook to keep it";
  }
  session;
  storage;
  store;
  location;
  load() {
    return this.store.load(this.session);
  }
  save(snapshot) {
    this.store.save(this.session, snapshot);
  }
};

// src/app/runtime/project-launch/template-launchers/engineering-design.launcher.ts
var engineeringDesignLauncher = {
  templateId: "engineering-design",
  async load(request) {
    const config = requireEngineeringConfig(request.projectDefinition, request.project.id);
    if (config.version !== request.project.projectVersion)
      throw new Error("CONFIG_INVALID: Project version mismatch.");
    const registry = new DesignSimulationRegistry();
    registry.register("simulation.solar-monument", SolarMonumentComponent);
    registry.require(config.simulationId);
    const preview = !!config.previewWeeks && request.session.mode === "preview" && request.session.authorityMode === "localDemo";
    return {
      integratedHeader: preview || !!config.learningSequence?.steps.some((step) => step.tasks?.length),
      component: preview ? (await import("./chunk-A7I3VCFF.js")).EngineeringWeekWorkspaceComponent : (await import("./chunk-RZMQHMLE.js")).EngineeringDesignPageComponent,
      providers: [
        { provide: ENGINEERING_CONFIG, useValue: config },
        { provide: ENGINEERING_SESSION, useValue: request.session },
        {
          provide: ENGINEERING_PERSISTENCE,
          useValue: new BrowserEngineeringDesignAdapter(request.session)
        },
        { provide: DESIGN_SIMULATIONS, useValue: registry },
        EngineeringDesignRuntime,
        {
          provide: DESIGN_CAPTURE_BATCH,
          useFactory: (runtime) => (captures) => runtime.captureBatch(captures),
          deps: [EngineeringDesignRuntime]
        },
        {
          provide: DESIGN_CHECKS_CHANGE,
          useFactory: (runtime) => (checks) => runtime.saveChecks(checks),
          deps: [EngineeringDesignRuntime]
        },
        {
          provide: DESIGN_CAPTURE,
          useFactory: (runtime) => (capture) => runtime.capture(capture),
          deps: [EngineeringDesignRuntime]
        }
      ]
    };
  }
};
export {
  engineeringDesignLauncher
};
//# debugId=40a0918a-1ee2-5fb9-9130-4b773619fabd
//# sourceMappingURL=chunk-QHW6LAHL.js.map
