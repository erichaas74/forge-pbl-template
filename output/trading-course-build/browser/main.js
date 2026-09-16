import {
  ProjectCatalogService
} from "./chunk-XTAQPZPK.js";
import {
  RouterOutlet,
  provideRouter
} from "./chunk-X5IBMLI3.js";
import {
  bootstrapApplication
} from "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  Component,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement
} from "./chunk-E2VJWGUE.js";
import "./chunk-GOMI4DH3.js";

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "projects"
  },
  {
    path: "projects",
    title: "Projects | Forge PBL",
    loadComponent: () => import("./chunk-KD5L7RLL.js").then(
      (module) => module.ProjectHomeComponent
    )
  },
  {
    path: "projects/:projectId/:view",
    canDeactivate: [
      (component) => component.canLeave()
    ],
    loadComponent: () => import("./chunk-BKMW5TS5.js").then(
      (module) => module.ProjectHostComponent
    )
  },
  {
    path: "projects/:projectId",
    canDeactivate: [
      (component) => component.canLeave()
    ],
    loadComponent: () => import("./chunk-BKMW5TS5.js").then(
      (module) => module.ProjectHostComponent
    )
  },
  {
    path: "mystery-substance",
    pathMatch: "full",
    redirectTo: "projects/mystery-substance"
  },
  {
    path: "frontier-trading/builder-info",
    pathMatch: "full",
    redirectTo: "projects/frontier-trading-company/builder-info"
  },
  {
    path: "frontier-trading",
    pathMatch: "full",
    redirectTo: "projects/frontier-trading-company"
  },
  {
    path: "class-exhibit-hall",
    pathMatch: "full",
    redirectTo: "projects/objects-that-changed-us"
  },
  {
    path: "history-live",
    pathMatch: "full",
    redirectTo: "projects/history-live-revolutionary-war"
  },
  {
    path: "debate-studio",
    pathMatch: "full",
    redirectTo: "projects/the-fate-of-the-republic"
  },
  {
    path: "journey-replay",
    pathMatch: "full",
    redirectTo: "projects/race-around-the-world"
  },
  {
    path: "**",
    redirectTo: "projects"
  }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAppInitializer(() => inject(ProjectCatalogService).load())
  ]
};

// src/app/app.ts
var App = class _App {
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 1, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n}\n/*# sourceMappingURL=app.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet], template: "<router-outlet />\n", styles: ["/* src/app/app.scss */\n:host {\n  display: block;\n  min-height: 100dvh;\n}\n/*# sourceMappingURL=app.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 10 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# debugId=24e826b3-7ae0-50da-9289-b5d40d5c2034
//# sourceMappingURL=main.js.map
