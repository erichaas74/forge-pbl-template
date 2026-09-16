import {
  BrowserRuntimePersistenceAdapter,
  LocalInvestigationRuntime,
  MysteryInvestigationService,
  SystemClock
} from "./chunk-ITTVRLH2.js";
import {
  PROJECT_CATALOG_ENTRY,
  PROJECT_SESSION_CONTEXT
} from "./chunk-CN67HRIA.js";
import {
  runtimeScopeKey
} from "./chunk-PJ67YSEX.js";
import {
  projectSessionRuntimeScope
} from "./chunk-G626JLCU.js";
import {
  WORKSPACE_DRAFTS
} from "./chunk-K64YZ7RA.js";
import {
  INVESTIGATION_RUNTIME_FACADE
} from "./chunk-D7TSZHFD.js";
import "./chunk-2WXJ5NX3.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-E2VJWGUE.js";
import "./chunk-EOGBHGAA.js";
import "./chunk-GOMI4DH3.js";

// src/app/infrastructure/persistence/http-project-package-source.ts
var HttpProjectPackageSource = class {
  async read(location, fileName) {
    const reference = location.reference.replace(/^\/+/, "").replace(/\/+$/, "");
    const response = await fetch(`/${reference}/${encodeURIComponent(fileName)}`, {
      headers: { accept: "application/json" }
    });
    if (response.status === 404) return void 0;
    if (!response.ok) {
      throw new Error(`Project package file "${fileName}" could not be loaded (${response.status}).`);
    }
    return response.json();
  }
};

// src/app/runtime/project-launch/investigation-runtime.facade.ts
var HostedInvestigationRuntimeFacade = class _HostedInvestigationRuntimeFacade {
  project = inject(PROJECT_CATALOG_ENTRY);
  session = inject(PROJECT_SESSION_CONTEXT);
  scope = projectSessionRuntimeScope(this.session, "student");
  runtime = new LocalInvestigationRuntime(new HttpProjectPackageSource(), new SystemClock(), new BrowserRuntimePersistenceAdapter(safeStorage()));
  initialization;
  loading = signal(
    true,
    ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  graph = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "graph" }] : (
      /* istanbul ignore next */
      []
    )
  );
  snapshot = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "snapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  issues = signal(
    [],
    ...ngDevMode ? [{ debugName: "issues" }] : (
      /* istanbul ignore next */
      []
    )
  );
  initialize() {
    this.initialization ??= this.load();
    return this.initialization;
  }
  async dispatch(eventType, sourceId, payload) {
    const graph = this.graph();
    if (graph === void 0)
      return;
    const id = createEventId();
    const event = {
      id,
      clientEventId: `client-${id}`,
      tenantId: this.session.tenantId,
      projectId: this.project.id,
      attemptId: this.session.attemptId,
      eventType,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      actor: {
        type: this.session.mode === "teacher" ? "teacher" : "student",
        id: this.session.actorId
      },
      sourceId,
      payload
    };
    const result = await this.runtime.dispatch(this.scope, event, graph);
    if (result.snapshot !== void 0)
      this.snapshot.set(result.snapshot);
    const dispatchErrors = result.errors ?? [];
    if (dispatchErrors.length > 0) {
      this.issues.update((current) => [
        ...current,
        ...dispatchErrors.map((error) => ({
          code: error.code,
          severity: error.severity === "warning" || error.severity === "info" ? "warning" : "error",
          entityId: error.sourceId,
          message: error.message
        }))
      ]);
    }
  }
  async load() {
    try {
      const loaded = await this.runtime.loadProject({
        tenantId: this.session.tenantId,
        projectId: this.project.id,
        projectVersion: this.project.projectVersion,
        reference: this.project.packageReference
      });
      this.issues.set(loaded.issues);
      if (loaded.graph === void 0)
        return;
      this.graph.set(loaded.graph);
      const initialized = await this.runtime.initializeScope(loaded.graph, this.scope);
      this.snapshot.set(initialized.snapshot);
      const initializationErrors = initialized.errors ?? [];
      if (initializationErrors.length > 0) {
        this.issues.update((current) => [
          ...current,
          ...initializationErrors.map((error) => ({
            code: error.code,
            severity: error.severity === "warning" || error.severity === "info" ? "warning" : "error",
            entityId: error.sourceId,
            message: error.message
          }))
        ]);
      }
    } finally {
      this.loading.set(false);
    }
  }
  static \u0275fac = function HostedInvestigationRuntimeFacade_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HostedInvestigationRuntimeFacade)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _HostedInvestigationRuntimeFacade, factory: _HostedInvestigationRuntimeFacade.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HostedInvestigationRuntimeFacade, [{
    type: Injectable
  }], null, null);
})();
function safeStorage() {
  try {
    if (typeof localStorage !== "undefined")
      return localStorage;
  } catch {
  }
  const values = /* @__PURE__ */ new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => void values.delete(key)
  };
}
function createEventId() {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// src/app/infrastructure/persistence/browser-workspace-drafts.ts
var BrowserWorkspaceDrafts = class {
  constructor(session, storage = safeStorage2()) {
    this.storage = storage;
    this.prefix = `forge-pbl.workspace.v1:${runtimeScopeKey(projectSessionRuntimeScope(session, "student"))}:`;
  }
  storage;
  memory = /* @__PURE__ */ new Map();
  prefix;
  read(key) {
    if (this.memory.has(key)) return structuredClone(this.memory.get(key));
    try {
      const raw = this.storage?.getItem(this.prefix + key);
      return raw ? JSON.parse(raw) : void 0;
    } catch {
      return void 0;
    }
  }
  write(key, value) {
    this.memory.set(key, structuredClone(value));
    try {
      this.storage?.setItem(this.prefix + key, JSON.stringify(value));
    } catch {
    }
  }
};
function safeStorage2() {
  try {
    return typeof localStorage === "undefined" ? void 0 : localStorage;
  } catch {
    return void 0;
  }
}

// src/app/runtime/project-launch/template-launchers/investigation.launcher.ts
var investigationLauncher = {
  templateId: "investigation",
  async load(request) {
    if (request.project.id === "mystery-substance") {
      if (request.session.mode === "preview" && request.session.authorityMode === "localDemo" && request.view !== "final-demo") {
        const { LabWeekWorkspaceComponent } = await import("./chunk-V42PMG4A.js");
        const { LAB_AUTHORING_PREVIEW, LAB_PREVIEW_WEEKS } = await import("./chunk-AUQFVR6T.js");
        const { mysterySubstanceWeeks } = await import("./chunk-GGTCMDW2.js");
        return {
          component: LabWeekWorkspaceComponent,
          providers: [
            { provide: LAB_AUTHORING_PREVIEW, useValue: true },
            { provide: LAB_PREVIEW_WEEKS, useValue: mysterySubstanceWeeks },
            { provide: WORKSPACE_DRAFTS, useFactory: () => new BrowserWorkspaceDrafts(request.session) }
          ]
        };
      }
      const module2 = await import("./chunk-XXHQGXF5.js");
      return {
        component: module2.MysteryInvestigationComponent,
        providers: [MysteryInvestigationService, { provide: WORKSPACE_DRAFTS, useFactory: () => new BrowserWorkspaceDrafts(request.session) }]
      };
    }
    const module = await import("./chunk-P2YGEX6A.js");
    return {
      component: module.InvestigationShellComponent,
      providers: [
        HostedInvestigationRuntimeFacade,
        {
          provide: INVESTIGATION_RUNTIME_FACADE,
          useExisting: HostedInvestigationRuntimeFacade
        }
      ]
    };
  }
};
export {
  investigationLauncher
};
//# debugId=4080a702-4cdc-5dcc-8b0a-b25aadc75f17
//# sourceMappingURL=chunk-QJYPIL76.js.map
