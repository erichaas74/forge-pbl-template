import {
  MuseumBoardComponent
} from "./chunk-EJZFN5UH.js";
import {
  ExhibitHallRuntimeService,
  MuseumPublicationError,
  boundedText,
  isExhibitDraft,
  isMuseumAssignment,
  isPublishedMuseumRoom,
  isRecord,
  museumScopeKey
} from "./chunk-RPQYDRPF.js";
import {
  EXHIBIT_HALL_CONFIG,
  EXHIBIT_HALL_PERSISTENCE,
  EXHIBIT_HALL_SESSION_CONTEXT,
  EXHIBIT_RENDERER_COMPONENTS,
  MUSEUM_PUBLICATION
} from "./chunk-NP2TX5O3.js";
import "./chunk-ICIU3PCK.js";
import "./chunk-MNKXLJET.js";
import "./chunk-G626JLCU.js";
import "./chunk-RTVK2FN5.js";
import {
  ScopedBrowserStore,
  safeBrowserStorage
} from "./chunk-OXVZ3VYX.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  Component,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-E2VJWGUE.js";
import "./chunk-WLIGGVEP.js";
import "./chunk-SUG7Z2TW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/infrastructure/exhibit-hall/http-museum-publication.adapter.ts
var HttpMuseumPublicationAdapter = class {
  constructor(baseUrl = "/api/museum", fetcher = fetch) {
    this.baseUrl = baseUrl;
    this.fetcher = fetcher;
  }
  baseUrl;
  fetcher;
  async openSession(scope) {
    const value = await this.request("/session" + this.query(scope));
    if (!isRecord(value) || !isRecord(value["scope"]) || museumScopeKey(value["scope"]) !== museumScopeKey(scope) || !boundedText(value["actorId"], 180) || !boundedText(value["teamId"], 120) || !isMuseumAssignment(value["room"]) || typeof value["submissionLocked"] !== "boolean" || value["publishedRoom"] !== void 0 && (!isPublishedMuseumRoom(value["publishedRoom"]) || value["publishedRoom"].teamId !== value["teamId"] || value["publishedRoom"].room.roomId !== value["room"].roomId)) {
      throw new MuseumPublicationError("INVALID_MUSEUM_RESPONSE");
    }
    return value;
  }
  async publish(request) {
    const value = await this.request("/submissions", {
      method: "POST",
      body: JSON.stringify(request)
    });
    if (!isPublishedMuseumRoom(value) || value.room.roomId !== request.content.roomId || value.room.layoutId !== request.content.layoutId) {
      throw new MuseumPublicationError("INVALID_MUSEUM_RESPONSE");
    }
    return value;
  }
  async loadCollection(scope) {
    const value = await this.request("/collection" + this.query(scope));
    if (!isRecord(value) || !Array.isArray(value["rooms"]) || value["rooms"].length > 500 || !value["rooms"].every(isPublishedMuseumRoom) || new Set(value["rooms"].map((room) => room.room.roomId)).size !== value["rooms"].length) {
      throw new MuseumPublicationError("INVALID_MUSEUM_RESPONSE");
    }
    return value["rooms"];
  }
  query(scope) {
    return "?" + new URLSearchParams(__spreadValues({}, scope)).toString();
  }
  async request(path, init = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15e3);
    try {
      const response = await this.fetcher(this.baseUrl + path, __spreadProps(__spreadValues({}, init), {
        credentials: "same-origin",
        signal: controller.signal,
        headers: __spreadValues({
          accept: "application/json"
        }, init.body ? { "content-type": "application/json" } : {})
      }));
      const value = response.headers.get("content-type")?.includes("application/json") ? await response.json() : void 0;
      if (!response.ok)
        throw new MuseumPublicationError(
          isRecord(value) && typeof value["error"] === "string" ? value["error"] : "MUSEUM_UNAVAILABLE",
          response.status
        );
      if (value === void 0)
        throw new MuseumPublicationError("MUSEUM_UNAVAILABLE", response.status);
      return value;
    } finally {
      clearTimeout(timeout);
    }
  }
};

// src/app/templates/exhibit-hall/persistence/exhibit-persistence.ts
var BrowserExhibitPersistenceAdapter = class {
  constructor(storage = safeBrowserStorage(), session) {
    this.session = session;
    this.store = new ScopedBrowserStore("exhibit-hall", storage, isExhibitState);
  }
  session;
  store;
  load(projectId, projectVersion) {
    return this.store.load(this.scope(projectId, projectVersion));
  }
  save(projectId, projectVersion, state) {
    this.store.save(this.scope(projectId, projectVersion), state);
  }
  clear(projectId, projectVersion) {
    this.store.clear(this.scope(projectId, projectVersion));
  }
  scope(projectId, projectVersion) {
    return {
      tenantId: this.session?.tenantId ?? "local-preview",
      projectId,
      projectVersion,
      classId: this.session?.classId,
      actorId: this.session?.actorId,
      teamId: this.session?.teamId,
      attemptId: this.session?.attemptId
    };
  }
};
function isExhibitState(value) {
  return typeof value === "object" && value !== null && "schemaVersion" in value && value.schemaVersion === "1.0" && "hall" in value && typeof value.hall === "object" && value.hall !== null && "snapshots" in value && Array.isArray(value.snapshots) && "hangings" in value && Array.isArray(value.hangings) && (!("composerDraft" in value) || value.composerDraft === void 0 || isExhibitDraft(value.composerDraft));
}

// src/app/templates/exhibit-hall/ui/science-poster-demo.component.ts
function SciencePosterDemoComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article", 0)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "dl")(4, "div")(5, "dt");
    \u0275\u0275text(6, "Question");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "dd");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "div")(10, "dt");
    \u0275\u0275text(11, "Method");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "dd");
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(14, "div")(15, "dt");
    \u0275\u0275text(16, "Finding");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(17, "dd");
    \u0275\u0275text(18);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(19, "div")(20, "dt");
    \u0275\u0275text(21, "Limitation");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(22, "dd");
    \u0275\u0275text(23);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const poster_r1 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(poster_r1.title);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(poster_r1.question);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(poster_r1.method);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(poster_r1.finding);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(poster_r1.limitation);
  }
}
var SciencePosterDemoComponent = class _SciencePosterDemoComponent {
  data;
  mode = "thumbnail";
  get poster() {
    if (typeof this.data !== "object" || this.data === null || !("title" in this.data))
      return void 0;
    return this.data;
  }
  static \u0275fac = function SciencePosterDemoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SciencePosterDemoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SciencePosterDemoComponent, selectors: [["app-science-poster-demo"]], inputs: { data: "data", mode: "mode" }, decls: 1, vars: 1, consts: [[1, "poster"]], template: function SciencePosterDemoComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, SciencePosterDemoComponent_Conditional_0_Template, 24, 5, "article", 0);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = ctx.poster) ? 0 : -1, tmp_0_0);
    }
  }, styles: ["\n.poster[_ngcontent-%COMP%] {\n  border: 0.4rem solid #315e71;\n  padding: 1rem;\n  background: #f4fbfd;\n  color: #173743;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0 0 0.7rem;\n  font-family: Georgia, serif;\n}\ndl[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.6rem;\n  margin: 0;\n}\ndiv[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n  background: white;\n}\ndt[_ngcontent-%COMP%] {\n  color: #2d7182;\n  font-weight: 800;\n}\ndd[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0;\n}\n/*# sourceMappingURL=science-poster-demo.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SciencePosterDemoComponent, [{
    type: Component,
    args: [{ selector: "app-science-poster-demo", template: `
    @if (poster; as poster) {
      <article class="poster">
        <h2>{{ poster.title }}</h2>
        <dl>
          <div>
            <dt>Question</dt>
            <dd>{{ poster.question }}</dd>
          </div>
          <div>
            <dt>Method</dt>
            <dd>{{ poster.method }}</dd>
          </div>
          <div>
            <dt>Finding</dt>
            <dd>{{ poster.finding }}</dd>
          </div>
          <div>
            <dt>Limitation</dt>
            <dd>{{ poster.limitation }}</dd>
          </div>
        </dl>
      </article>
    }
  `, styles: ["/* angular:styles/component:scss;d87345c11d5faa52a0d3629916123e2f5af44d3a56475886efdbf1d1cc11ff5a;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/exhibit-hall/ui/science-poster-demo.component.ts */\n.poster {\n  border: 0.4rem solid #315e71;\n  padding: 1rem;\n  background: #f4fbfd;\n  color: #173743;\n}\nh2 {\n  margin: 0 0 0.7rem;\n  font-family: Georgia, serif;\n}\ndl {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.6rem;\n  margin: 0;\n}\ndiv {\n  padding: 0.5rem;\n  background: white;\n}\ndt {\n  color: #2d7182;\n  font-weight: 800;\n}\ndd {\n  margin: 0.2rem 0 0;\n}\n/*# sourceMappingURL=science-poster-demo.component.css.map */\n"] }]
  }], null, { data: [{
    type: Input,
    args: [{ required: true }]
  }], mode: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SciencePosterDemoComponent, { className: "SciencePosterDemoComponent", filePath: "src/app/templates/exhibit-hall/ui/science-poster-demo.component.ts", lineNumber: 63 });
})();

// src/app/runtime/project-launch/template-launchers/exhibit-hall.launcher.ts
var exhibitHallLauncher = {
  templateId: "exhibit-hall",
  async load(request) {
    const definition = requireExhibitConfig(request.projectDefinition, request.project.id);
    const config = __spreadProps(__spreadValues(__spreadValues({}, definition), definition.museum && request.session.authorityMode === "serverAuthoritative" ? { seedBoards: [] } : {}), {
      courseSectionId: request.session.classId ?? definition.courseSectionId,
      // Private draft attempts must not split a class museum into separate collections.
      projectInstanceId: definition.museum ? definition.projectInstanceId : request.session.attemptId ?? definition.projectInstanceId,
      viewer: __spreadProps(__spreadValues({}, definition.viewer), {
        studentId: request.session.studentId ?? request.session.actorId,
        studentDisplayName: request.session.actorDisplayName,
        teamId: request.session.teamId ?? definition.viewer.teamId
      })
    });
    const module = await import("./chunk-BFYSLR4W.js");
    return {
      component: module.ExhibitHallPageComponent,
      providers: [
        { provide: EXHIBIT_HALL_CONFIG, useValue: config },
        { provide: EXHIBIT_HALL_SESSION_CONTEXT, useValue: request.session },
        ...config.museum && request.session.authorityMode === "serverAuthoritative" ? [{ provide: MUSEUM_PUBLICATION, useFactory: () => new HttpMuseumPublicationAdapter() }] : [],
        {
          provide: EXHIBIT_HALL_PERSISTENCE,
          useFactory: () => new BrowserExhibitPersistenceAdapter(void 0, request.session)
        },
        {
          provide: EXHIBIT_RENDERER_COMPONENTS,
          useValue: [
            { rendererType: "museum-board-v1", component: MuseumBoardComponent },
            { rendererType: "science-poster-demo", component: SciencePosterDemoComponent }
          ]
        },
        ExhibitHallRuntimeService
      ]
    };
  }
};
function requireExhibitConfig(value, projectId) {
  if (!isRecord2(value) || value["projectId"] !== projectId || !Array.isArray(value["teams"])) {
    throw new Error(`Project "${projectId}" is not a valid exhibit-hall definition.`);
  }
  return value;
}
function isRecord2(value) {
  return typeof value === "object" && value !== null;
}
export {
  exhibitHallLauncher
};
//# debugId=dc349f47-89b0-5fe9-b69a-76ecd8cae43d
//# sourceMappingURL=chunk-JMO7Q4TC.js.map
