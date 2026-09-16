import {
  isExhibitObjectModel
} from "./chunk-MNKXLJET.js";
import {
  Component,
  InjectionToken,
  Injector,
  Input,
  Output,
  ViewChild,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  output,
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
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  isMuseumRoomData,
  museumRoomLayout
} from "./chunk-SUG7Z2TW.js";

// src/app/templates/exhibit-hall/runtime/exhibit-hall.tokens.ts
var MUSEUM_PUBLICATION = new InjectionToken(
  "MUSEUM_PUBLICATION"
);
var EXHIBIT_HALL_CONFIG = new InjectionToken("EXHIBIT_HALL_CONFIG");
var EXHIBIT_HALL_PERSISTENCE = new InjectionToken(
  "EXHIBIT_HALL_PERSISTENCE"
);
var EXHIBIT_HALL_SESSION_CONTEXT = new InjectionToken(
  "EXHIBIT_HALL_SESSION_CONTEXT"
);
var EXHIBIT_RENDERER_COMPONENTS = new InjectionToken("EXHIBIT_RENDERER_COMPONENTS");

// src/app/templates/exhibit-hall/renderers/metasteps/metasteps-embed.ts
var METASTEPS_EMBED_PATH = /^\/viewer\/embed\/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
var ALLOWED_OPTIONS = /* @__PURE__ */ new Set([
  "showSignIn",
  "showCommunications",
  "showOrbitButton",
  "showSettingsButton",
  "showSoundButton",
  "showLikeButton",
  "forceOrbitCamera"
]);
function parseMetaStepsEmbed(value) {
  const candidate = extractUrl(value);
  if (candidate.length === 0) {
    return { valid: false, message: "Paste the public MetaSteps embed URL or iframe code." };
  }
  try {
    const url = new URL(candidate.replaceAll("\\&", "&"));
    if (url.protocol !== "https:" || url.hostname.toLowerCase() !== "metasteps.com" || !METASTEPS_EMBED_PATH.test(url.pathname)) {
      return {
        valid: false,
        message: "Use an HTTPS metasteps.com viewer embed link for a public gallery."
      };
    }
    const normalized = new URL(`https://metasteps.com${url.pathname}`);
    for (const [key, option] of url.searchParams) {
      if (ALLOWED_OPTIONS.has(key) && (option === "0" || option === "1")) {
        normalized.searchParams.set(key, option);
      }
    }
    return { valid: true, normalizedUrl: normalized.toString() };
  } catch {
    return { valid: false, message: "The MetaSteps embed link is not a valid URL." };
  }
}
function extractUrl(value) {
  const trimmed = value.trim().replace(/^\\</u, "<").replace(/\\>$/u, ">");
  const iframeSource = trimmed.match(/\bsrc\s*=\s*["']([^"']+)["']/iu)?.[1];
  return unwrapMarkdownLink(iframeSource ?? trimmed);
}
function unwrapMarkdownLink(value) {
  const markdownTarget = value.match(/^\[[^\]]+\]\((https:\/\/[^)]+)\)$/iu)?.[1];
  return (markdownTarget ?? value).trim();
}

// src/app/templates/exhibit-hall/renderers/video/presentation-video.ts
var YOUTUBE_ID = /^[a-zA-Z0-9_-]{6,20}$/u;
var VIMEO_ID = /^\d{5,15}$/u;
var DIRECT_VIDEO_PATH = /\.(?:mp4|webm|ogg)$/iu;
function parsePresentationVideo(value) {
  const candidate = extractUrl2(value);
  if (candidate.length === 0) {
    return {
      valid: false,
      message: "Paste a public YouTube, Vimeo, MP4, WebM, or Ogg video link."
    };
  }
  try {
    const url = new URL(candidate.replaceAll("&amp;", "&").replaceAll("\\&", "&"));
    if (url.protocol !== "https:") {
      return { valid: false, message: "The presentation video must use a public HTTPS link." };
    }
    const youtubeId = youtubeVideoId(url);
    if (youtubeId !== void 0) {
      return {
        valid: true,
        kind: "embedded",
        provider: "youtube",
        normalizedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`
      };
    }
    const vimeoId = vimeoVideoId(url);
    if (vimeoId !== void 0) {
      return {
        valid: true,
        kind: "embedded",
        provider: "vimeo",
        normalizedUrl: `https://player.vimeo.com/video/${vimeoId}`
      };
    }
    if (DIRECT_VIDEO_PATH.test(url.pathname)) {
      const direct = new URL(url.pathname, url.origin);
      return {
        valid: true,
        kind: "direct",
        provider: "direct",
        normalizedUrl: direct.toString()
      };
    }
    return {
      valid: false,
      message: "Use a public YouTube or Vimeo link, or a direct MP4, WebM, or Ogg URL."
    };
  } catch {
    return { valid: false, message: "The presentation video link is not a valid URL." };
  }
}
function youtubeVideoId(url) {
  const host = url.hostname.toLowerCase();
  let id;
  if (host === "youtu.be") id = url.pathname.split("/").filter(Boolean)[0];
  if (host === "youtube.com" || host === "www.youtube.com" || host === "m.youtube.com") {
    id = url.pathname === "/watch" ? url.searchParams.get("v") : url.pathname.match(/^\/embed\/([^/]+)$/u)?.[1];
  }
  if (host === "youtube-nocookie.com" || host === "www.youtube-nocookie.com") {
    id = url.pathname.match(/^\/embed\/([^/]+)$/u)?.[1];
  }
  return id !== void 0 && id !== null && YOUTUBE_ID.test(id) ? id : void 0;
}
function vimeoVideoId(url) {
  const host = url.hostname.toLowerCase();
  const id = host === "vimeo.com" || host === "www.vimeo.com" ? url.pathname.split("/").filter(Boolean)[0] : host === "player.vimeo.com" ? url.pathname.match(/^\/video\/(\d+)$/u)?.[1] : void 0;
  return id !== void 0 && VIMEO_ID.test(id) ? id : void 0;
}
function extractUrl2(value) {
  const trimmed = value.trim().replace(/^\\</u, "<").replace(/\\>$/u, ">");
  return (trimmed.match(/\bsrc\s*=\s*["']([^"']+)["']/iu)?.[1] ?? trimmed).trim();
}

// src/app/templates/exhibit-hall/renderers/museum-board/museum-board-renderer.ts
var MuseumBoardRenderer = class {
  type = "museum-board-v1";
  version = 1;
  renderPreview(data) {
    return renderResult(assertMuseumBoard(data));
  }
  renderWalkUp(data) {
    return renderResult(assertMuseumBoard(data));
  }
  renderThumbnail(data) {
    return renderResult(assertMuseumBoard(data));
  }
  renderAccessible(data) {
    const board = assertMuseumBoard(data);
    const sourcesById = new Map(board.sources.map((source) => [source.id, source]));
    const gallery = board.immersiveGallery;
    const galleryUrl = parseMetaStepsEmbed(gallery?.embedUrl ?? "").normalizedUrl;
    const video = board.videoPresentation;
    const videoUrl = parsePresentationVideo(video?.videoUrl ?? "").normalizedUrl;
    return {
      title: board.title,
      summary: board.centralClaim,
      sections: [
        {
          heading: "Central claim",
          body: board.centralClaim
        },
        ...board.objects.map((object) => ({
          heading: object.title,
          body: `${object.description} ${object.evidenceConnection}`.trim(),
          sourceLinks: object.sourceIds.flatMap((sourceId) => {
            const source = sourcesById.get(sourceId);
            return source?.url === void 0 ? [] : [{ label: source.citation, url: source.url }];
          })
        })),
        {
          heading: "Sources",
          body: board.sources.map((source) => source.citation).join(" "),
          sourceLinks: board.sources.flatMap(
            (source) => source.url === void 0 ? [] : [{ label: source.citation, url: source.url }]
          )
        },
        ...gallery !== void 0 && galleryUrl !== void 0 ? [
          {
            heading: `Immersive gallery: ${gallery.title}`,
            body: "Open the team\u2019s interactive 3D MetaSteps gallery in a new browser window.",
            sourceLinks: [{ label: `Open ${gallery.title}`, url: galleryUrl }]
          }
        ] : [],
        ...video?.prototype ? [
          {
            heading: `Prototype curator video: ${video.title}`,
            body: "This prototype station represents the student or group\u2019s recorded artifact presentation."
          }
        ] : video !== void 0 && videoUrl !== void 0 ? [
          {
            heading: `Curator video: ${video.title}`,
            body: "Watch the student or group explain the researched artifact collection.",
            sourceLinks: [{ label: `Open ${video.title}`, url: videoUrl }]
          }
        ] : [],
        {
          heading: "Team credit",
          body: board.teamCredit.displayName
        }
      ]
    };
  }
  renderPrint(data) {
    const board = assertMuseumBoard(data);
    return { title: board.title, accessible: this.renderAccessible(board) };
  }
};
function isMuseumBoardSnapshotData(data) {
  return typeof data === "object" && data !== null && "title" in data && (!("museumRoom" in data) || data.museumRoom === void 0 || isMuseumRoomData(data.museumRoom)) && typeof data.title === "string" && "centralClaim" in data && typeof data.centralClaim === "string" && "objects" in data && Array.isArray(data.objects) && data.objects.every(
    (object) => typeof object === "object" && object !== null && (object.model === void 0 || isExhibitObjectModel(object.model))
  ) && "sources" in data && Array.isArray(data.sources) && "teamCredit" in data && typeof data.teamCredit === "object" && data.teamCredit !== null;
}
function assertMuseumBoard(data) {
  if (!isMuseumBoardSnapshotData(data)) {
    throw new Error("Museum board renderer received an incompatible snapshot.");
  }
  return data;
}
function renderResult(data) {
  const words = `${data.centralClaim} ${data.objects.map((object) => `${object.description} ${object.evidenceConnection}`).join(" ")}`.trim().split(/\s+/u).length;
  return {
    title: data.title,
    summary: data.centralClaim,
    itemCount: data.objects.length + (data.immersiveGallery === void 0 ? 0 : 1) + (data.videoPresentation === void 0 ? 0 : 1),
    readingTimeMinutes: Math.max(1, Math.ceil(words / 180))
  };
}

// src/app/templates/exhibit-hall/rooms/museum-scene.component.ts
var _c0 = ["canvasHost"];
function MuseumSceneComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5)(1, "span", 9);
    \u0275\u0275text(2, "\u25C7");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3, " Opening the museum\u2026 ");
    \u0275\u0275domElementEnd();
  }
}
function MuseumSceneComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Placing ", ctx_r0.loading(), " ", ctx_r0.loading() === 1 ? "artifact" : "artifacts", "\u2026 ");
  }
}
function MuseumSceneComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 7)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "button", 10);
    \u0275\u0275domListener("click", function MuseumSceneComponent_Conditional_9_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.retry());
    });
    \u0275\u0275text(4, "Reload 3D view");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error() || "Some artifacts could not load: " + ctx_r0.assetErrors().join(", ") + ". Your labels are still available.", " ");
  }
}
var LOAD_MUSEUM_SCENE = new InjectionToken("LOAD_MUSEUM_SCENE", {
  providedIn: "root",
  factory: () => async () => {
    const module = await import("./chunk-23I7LDYC.js");
    return (host, callbacks) => new module.MuseumScene(host, callbacks);
  }
});
var MuseumSceneComponent = class _MuseumSceneComponent {
  content = input.required(
    ...ngDevMode ? [{ debugName: "content" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeDisplay = input(
    void 0,
    ...ngDevMode ? [{ debugName: "activeDisplay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = output();
  starting = signal(
    true,
    ...ngDevMode ? [{ debugName: "starting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = signal(
    0,
    ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  assetErrors = signal(
    [],
    ...ngDevMode ? [{ debugName: "assetErrors" }] : (
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
  host = viewChild.required(
    "canvasHost",
    ...ngDevMode ? [{ debugName: "host" }] : (
      /* istanbul ignore next */
      []
    )
  );
  load = inject(LOAD_MUSEUM_SCENE);
  scene;
  generation = 0;
  destroyed = false;
  constructor() {
    afterNextRender(() => void this.start());
    effect(() => {
      const content = this.content();
      this.scene?.update(content);
    });
    effect(() => {
      const id = this.activeDisplay();
      this.scene?.focusDisplay(id);
    });
  }
  retry() {
    this.scene?.dispose();
    this.scene = void 0;
    void this.start();
  }
  ngOnDestroy() {
    this.destroyed = true;
    this.generation++;
    this.scene?.dispose();
  }
  async start() {
    const generation = ++this.generation;
    this.starting.set(true);
    this.error.set(void 0);
    this.assetErrors.set([]);
    this.loading.set(0);
    try {
      const create = await this.load();
      if (this.destroyed || generation !== this.generation)
        return;
      this.scene = create(this.host().nativeElement, {
        selected: (id) => this.selected.emit(id),
        status: (loading, errors) => {
          this.loading.set(loading);
          this.assetErrors.set(errors);
        },
        failed: (message) => this.error.set(message)
      });
      this.scene.update(this.content());
      this.scene.focusDisplay(this.activeDisplay());
    } catch {
      if (!this.destroyed && generation === this.generation)
        this.error.set("The 3D room could not open on this device. You can still add artifacts and read every label.");
    } finally {
      if (!this.destroyed && generation === this.generation)
        this.starting.set(false);
    }
  }
  static \u0275fac = function MuseumSceneComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MuseumSceneComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MuseumSceneComponent, selectors: [["app-museum-scene"]], viewQuery: function MuseumSceneComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.host, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { content: [1, "content"], activeDisplay: [1, "activeDisplay"] }, outputs: { selected: "selected" }, decls: 12, vars: 5, consts: [["canvasHost", ""], ["role", "group", 1, "scene-shell"], [1, "canvas-host"], [1, "room-badge"], ["aria-hidden", "true"], ["role", "status", 1, "loading-cover"], ["role", "status", 1, "asset-status"], ["role", "status", 1, "scene-error"], [1, "scene-hint"], [1, "loading-mark"], ["type", "button", 3, "click"]], template: function MuseumSceneComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 1);
      \u0275\u0275domElement(1, "div", 2, 0);
      \u0275\u0275domElementStart(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "\u25C7");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(7, MuseumSceneComponent_Conditional_7_Template, 4, 0, "div", 5);
      \u0275\u0275conditionalCreate(8, MuseumSceneComponent_Conditional_8_Template, 2, 2, "div", 6);
      \u0275\u0275conditionalCreate(9, MuseumSceneComponent_Conditional_9_Template, 5, 1, "div", 7);
      \u0275\u0275domElementStart(10, "div", 8);
      \u0275\u0275text(11, "Drag to look around \xB7 Select a display or use the buttons below");
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275attribute("aria-label", ctx.content().kind === "room" ? "Assigned museum room in 3D" : "Class museum entrance in 3D");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.content().kind === "room" ? "YOUR VIEW INSIDE THE ROOM" : "THE MUSEUM ENTRANCE", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.starting() ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() > 0 ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() || ctx.assetErrors().length ? 9 : -1);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.scene-shell[_ngcontent-%COMP%] {\n  height: var(--%NS%museum-scene-height, clamp(370px, 48vw, 620px));\n  position: relative;\n  overflow: hidden;\n  background: #d9bd8c;\n  border: 1px solid #d1c6b0;\n  border-radius: 4px;\n}\n.canvas-host[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n.room-badge[_ngcontent-%COMP%], \n.scene-hint[_ngcontent-%COMP%], \n.asset-status[_ngcontent-%COMP%] {\n  position: absolute;\n  pointer-events: none;\n  font: 600 10px/1.5 Arial, sans-serif;\n  letter-spacing: 0.13em;\n  color: #243f50;\n  background: rgba(255, 250, 240, 0.9098039216);\n  border: 1px solid #d9cfbd;\n  padding: 8px 12px;\n  border-radius: 3px;\n}\n.room-badge[_ngcontent-%COMP%] {\n  left: 16px;\n  top: 16px;\n}\n.room-badge[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #986f34;\n  margin-right: 6px;\n}\n.scene-hint[_ngcontent-%COMP%] {\n  bottom: 14px;\n  left: 50%;\n  transform: translateX(-50%);\n  letter-spacing: 0.02em;\n  font-weight: 400;\n  width: max-content;\n  max-width: 90%;\n  text-align: center;\n}\n.asset-status[_ngcontent-%COMP%] {\n  right: 16px;\n  top: 16px;\n  letter-spacing: 0.02em;\n}\n.loading-cover[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background: #f0e8d7;\n  color: #243f50;\n  font: 15px Georgia, serif;\n  gap: 14px;\n}\n.loading-mark[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: #a17e40;\n}\n.scene-error[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 55px;\n  left: 15px;\n  right: 15px;\n  background: #fff5e2;\n  border: 1px solid #b99058;\n  border-radius: 4px;\n  padding: 12px 16px;\n  color: #553e24;\n  font: 13px/1.5 Arial, sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  justify-content: space-between;\n}\n.scene-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.scene-error[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: none;\n  border: 1px solid #9d804e;\n  background: #fffaf0;\n  padding: 10px;\n  color: #473d29;\n  border-radius: 3px;\n  cursor: pointer;\n}\n.scene-error[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #345c74;\n  outline-offset: 3px;\n}\n@media (max-width: 650px) {\n  .scene-shell[_ngcontent-%COMP%] {\n    height: 360px;\n  }\n  .room-badge[_ngcontent-%COMP%] {\n    font-size: 8px;\n    left: 8px;\n    top: 8px;\n  }\n  .scene-hint[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .asset-status[_ngcontent-%COMP%] {\n    top: 45px;\n    right: 8px;\n  }\n  .scene-error[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .scene-error[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    margin-top: 8px;\n  }\n}\n/*# sourceMappingURL=museum-scene.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MuseumSceneComponent, [{
    type: Component,
    args: [{ selector: "app-museum-scene", template: `
    <div
      class="scene-shell"
      role="group"
      [attr.aria-label]="
        content().kind === 'room' ? 'Assigned museum room in 3D' : 'Class museum entrance in 3D'
      "
    >
      <div #canvasHost class="canvas-host"></div>
      <div class="room-badge">
        <span aria-hidden="true">\u25C7</span>
        {{ content().kind === 'room' ? 'YOUR VIEW INSIDE THE ROOM' : 'THE MUSEUM ENTRANCE' }}
      </div>
      @if (starting()) {
        <div class="loading-cover" role="status">
          <span class="loading-mark">\u25C7</span> Opening the museum\u2026
        </div>
      }
      @if (loading() > 0) {
        <div class="asset-status" role="status">
          Placing {{ loading() }} {{ loading() === 1 ? 'artifact' : 'artifacts' }}\u2026
        </div>
      }
      @if (error() || assetErrors().length) {
        <div class="scene-error" role="status">
          <p>
            {{
              error() ||
                'Some artifacts could not load: ' +
                  assetErrors().join(', ') +
                  '. Your labels are still available.'
            }}
          </p>
          <button type="button" (click)="retry()">Reload 3D view</button>
        </div>
      }
      <div class="scene-hint">Drag to look around \xB7 Select a display or use the buttons below</div>
    </div>
  `, styles: ["/* angular:styles/component:scss;fb64407ad9ba289e863a17b68500b3a842985f1cd529c0786a2f3a243f957bbd;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/exhibit-hall/rooms/museum-scene.component.ts */\n:host {\n  display: block;\n  min-width: 0;\n}\n.scene-shell {\n  height: var(--museum-scene-height, clamp(370px, 48vw, 620px));\n  position: relative;\n  overflow: hidden;\n  background: #d9bd8c;\n  border: 1px solid #d1c6b0;\n  border-radius: 4px;\n}\n.canvas-host {\n  width: 100%;\n  height: 100%;\n}\n.room-badge,\n.scene-hint,\n.asset-status {\n  position: absolute;\n  pointer-events: none;\n  font: 600 10px/1.5 Arial, sans-serif;\n  letter-spacing: 0.13em;\n  color: #243f50;\n  background: rgba(255, 250, 240, 0.9098039216);\n  border: 1px solid #d9cfbd;\n  padding: 8px 12px;\n  border-radius: 3px;\n}\n.room-badge {\n  left: 16px;\n  top: 16px;\n}\n.room-badge span {\n  color: #986f34;\n  margin-right: 6px;\n}\n.scene-hint {\n  bottom: 14px;\n  left: 50%;\n  transform: translateX(-50%);\n  letter-spacing: 0.02em;\n  font-weight: 400;\n  width: max-content;\n  max-width: 90%;\n  text-align: center;\n}\n.asset-status {\n  right: 16px;\n  top: 16px;\n  letter-spacing: 0.02em;\n}\n.loading-cover {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background: #f0e8d7;\n  color: #243f50;\n  font: 15px Georgia, serif;\n  gap: 14px;\n}\n.loading-mark {\n  font-size: 48px;\n  color: #a17e40;\n}\n.scene-error {\n  position: absolute;\n  bottom: 55px;\n  left: 15px;\n  right: 15px;\n  background: #fff5e2;\n  border: 1px solid #b99058;\n  border-radius: 4px;\n  padding: 12px 16px;\n  color: #553e24;\n  font: 13px/1.5 Arial, sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  justify-content: space-between;\n}\n.scene-error p {\n  margin: 0;\n}\n.scene-error button {\n  flex: none;\n  border: 1px solid #9d804e;\n  background: #fffaf0;\n  padding: 10px;\n  color: #473d29;\n  border-radius: 3px;\n  cursor: pointer;\n}\n.scene-error button:focus-visible {\n  outline: 3px solid #345c74;\n  outline-offset: 3px;\n}\n@media (max-width: 650px) {\n  .scene-shell {\n    height: 360px;\n  }\n  .room-badge {\n    font-size: 8px;\n    left: 8px;\n    top: 8px;\n  }\n  .scene-hint {\n    font-size: 9px;\n  }\n  .asset-status {\n    top: 45px;\n    right: 8px;\n  }\n  .scene-error {\n    display: block;\n  }\n  .scene-error button {\n    margin-top: 8px;\n  }\n}\n/*# sourceMappingURL=museum-scene.component.css.map */\n"] }]
  }], () => [], { content: [{ type: Input, args: [{ isSignal: true, alias: "content", required: true }] }], activeDisplay: [{ type: Input, args: [{ isSignal: true, alias: "activeDisplay", required: false }] }], selected: [{ type: Output, args: ["selected"] }], host: [{ type: ViewChild, args: ["canvasHost", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MuseumSceneComponent, { className: "MuseumSceneComponent", filePath: "src/app/templates/exhibit-hall/rooms/museum-scene.component.ts", lineNumber: 204 });
})();

// src/app/templates/exhibit-hall/rooms/museum-room-presentation.component.ts
var _c02 = ["labelHeading"];
var _forTrack0 = ($index, $item) => $item.id;
function MuseumRoomPresentationComponent_For_15_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function MuseumRoomPresentationComponent_For_15_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const slot_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.select(slot_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const slot_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", ctx_r2.selectedSlot() === slot_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", slot_r2.label, " \xB7 ", ctx.title, " ");
  }
}
function MuseumRoomPresentationComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MuseumRoomPresentationComponent_For_15_Conditional_0_Template, 2, 3, "button", 9);
  }
  if (rf & 2) {
    let tmp_10_0;
    const slot_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_10_0 = ctx_r2.objectFor(slot_r2.id)) ? 0 : -1, tmp_10_0);
  }
}
function MuseumRoomPresentationComponent_Conditional_16_For_13_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("href", source_r5.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r5.citation);
  }
}
function MuseumRoomPresentationComponent_Conditional_16_For_13_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const source_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" ", source_r5.citation, " ");
  }
}
function MuseumRoomPresentationComponent_Conditional_16_For_13_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275conditionalCreate(1, MuseumRoomPresentationComponent_Conditional_16_For_13_Conditional_0_Conditional_1_Template, 2, 2, "a", 12)(2, MuseumRoomPresentationComponent_Conditional_16_For_13_Conditional_0_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(source_r5.url ? 1 : 2);
  }
}
function MuseumRoomPresentationComponent_Conditional_16_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MuseumRoomPresentationComponent_Conditional_16_For_13_Conditional_0_Template, 3, 1, "p", 11);
  }
  if (rf & 2) {
    const source_r5 = ctx.$implicit;
    const object_r6 = \u0275\u0275nextContext();
    \u0275\u0275conditional(object_r6.sourceIds.includes(source_r5.id) ? 0 : -1);
  }
}
function MuseumRoomPresentationComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 7)(1, "span");
    \u0275\u0275text(2, "LOOK CLOSER");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 10, 0);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "h4");
    \u0275\u0275text(9, "Why it matters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(12, MuseumRoomPresentationComponent_Conditional_16_For_13_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementStart(14, "button", 6);
    \u0275\u0275listener("click", function MuseumRoomPresentationComponent_Conditional_16_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.select());
    });
    \u0275\u0275text(15, "Back to room overview");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const object_r6 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(object_r6.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(object_r6.description);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(object_r6.evidenceConnection);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.board().sources);
  }
}
function MuseumRoomPresentationComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p")(6, "strong");
    \u0275\u0275text(7, "Why it matters.");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const object_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(object_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(object_r7.description);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", object_r7.evidenceConnection);
  }
}
function MuseumRoomPresentationComponent_For_26_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", source_r8.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r8.citation);
  }
}
function MuseumRoomPresentationComponent_For_26_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const source_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", source_r8.citation, " ");
  }
}
function MuseumRoomPresentationComponent_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275conditionalCreate(1, MuseumRoomPresentationComponent_For_26_Conditional_1_Template, 2, 2, "a", 12)(2, MuseumRoomPresentationComponent_For_26_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(source_r8.url ? 1 : 2);
  }
}
var MuseumRoomPresentationComponent = class _MuseumRoomPresentationComponent {
  board = input.required(
    ...ngDevMode ? [{ debugName: "board" }] : (
      /* istanbul ignore next */
      []
    )
  );
  label = input(
    "Museum room",
    ...ngDevMode ? [{ debugName: "label" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedSlot = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "selectedSlot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  slots = computed(
    () => museumRoomLayout(this.board().museumRoom?.layoutId ?? "")?.slots ?? [],
    ...ngDevMode ? [{ debugName: "slots" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sceneContent = computed(
    () => ({
      kind: "room",
      label: this.label(),
      board: this.board()
    }),
    ...ngDevMode ? [{ debugName: "sceneContent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedObject = computed(
    () => this.objectFor(this.selectedSlot()),
    ...ngDevMode ? [{ debugName: "selectedObject" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  labelHeading = viewChild(
    "labelHeading",
    ...ngDevMode ? [{ debugName: "labelHeading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  roomId = computed(
    () => this.board().museumRoom?.roomId,
    ...ngDevMode ? [{ debugName: "roomId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      this.roomId();
      this.selectedSlot.set(void 0);
    });
  }
  objectFor(slotId) {
    const id = this.board().museumRoom?.placements.find((item) => item.slotId === slotId)?.objectId;
    return this.board().objects.find((object) => object.id === id);
  }
  select(id) {
    this.selectedSlot.set(id);
    if (id)
      afterNextRender(() => {
        const heading = this.labelHeading()?.nativeElement;
        heading?.scrollIntoView({ block: "nearest", behavior: "instant" });
        heading?.focus({ preventScroll: true });
      }, { injector: this.injector });
  }
  static \u0275fac = function MuseumRoomPresentationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MuseumRoomPresentationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MuseumRoomPresentationComponent, selectors: [["app-museum-room-presentation"]], viewQuery: function MuseumRoomPresentationComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.labelHeading, _c02, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { board: [1, "board"], label: [1, "label"] }, decls: 27, vars: 10, consts: [["labelHeading", ""], [1, "room-presentation"], [1, "room-grid"], [1, "room-stage"], [3, "selected", "content", "activeDisplay"], ["aria-label", "Explore the room"], ["type", "button", 3, "click"], [1, "artifact-label"], [1, "reading-view"], ["type", "button"], ["tabindex", "-1"], [1, "source"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"]], template: function MuseumRoomPresentationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 1)(1, "header")(2, "span");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h2");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 2)(9, "div", 3)(10, "app-museum-scene", 4);
      \u0275\u0275listener("selected", function MuseumRoomPresentationComponent_Template_app_museum_scene_selected_10_listener($event) {
        return ctx.select($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "nav", 5)(12, "button", 6);
      \u0275\u0275listener("click", function MuseumRoomPresentationComponent_Template_button_click_12_listener() {
        return ctx.select();
      });
      \u0275\u0275text(13, " Room overview ");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(14, MuseumRoomPresentationComponent_For_15_Template, 1, 1, null, null, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(16, MuseumRoomPresentationComponent_Conditional_16_Template, 16, 3, "aside", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "details", 8)(18, "summary");
      \u0275\u0275text(19, "Read all labels and sources");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(20, MuseumRoomPresentationComponent_For_21_Template, 9, 3, "article", null, _forTrack0);
      \u0275\u0275elementStart(22, "h3");
      \u0275\u0275text(23, "Sources");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "ol");
      \u0275\u0275repeaterCreate(25, MuseumRoomPresentationComponent_For_26_Template, 3, 1, "li", null, _forTrack0);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_8_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("", ctx.label(), " \xB7 CURATED BY ", ctx.board().teamCredit.displayName);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.board().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.board().centralClaim);
      \u0275\u0275advance();
      \u0275\u0275classProp("inspecting", ctx.selectedObject());
      \u0275\u0275advance(2);
      \u0275\u0275property("content", ctx.sceneContent())("activeDisplay", ctx.selectedSlot());
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-pressed", !ctx.selectedSlot());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.slots());
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_8_0 = ctx.selectedObject()) ? 16 : -1, tmp_8_0);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.board().objects);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.board().sources);
    }
  }, dependencies: [MuseumSceneComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n  color: #243f50;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.museum-walkthrough[_ngcontent-%COMP%] {\n  padding: 28px;\n  background: #f3ead7;\n  border: 1px solid #d5cbb6;\n  border-radius: 7px;\n  border-top: 4px solid #23495b;\n  box-shadow: inset 0 3px #bc8b39;\n}\n.museum-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 25px;\n  padding: 12px 5px 24px;\n}\nheader[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.artifact-label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font: 700 10px/1.6 Arial, sans-serif;\n  letter-spacing: 0.13em;\n}\nh2[_ngcontent-%COMP%] {\n  font: 400 clamp(26px, 3vw, 40px)/1.15 Georgia, serif;\n  margin: 10px 0;\n}\np[_ngcontent-%COMP%] {\n  font: 14px/1.7 Arial, sans-serif;\n}\nheader[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  color: #676b5e;\n  max-width: 780px;\n}\n.museum-seal[_ngcontent-%COMP%] {\n  font: 40px Georgia, serif !important;\n  border: 1px solid #b79961;\n  outline: 1px solid #b79961;\n  outline-offset: 4px;\n  padding: 12px 18px;\n  color: #9c7a41;\n}\n.museum-directory[_ngcontent-%COMP%], \nnav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n}\n.museum-directory[_ngcontent-%COMP%] {\n  padding: 14px 0;\n  border-top: 1px solid #d7ceb9;\n  margin-bottom: 8px;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 42px;\n  padding: 10px 14px;\n  border: 1px solid #c9bea7;\n  border-radius: 4px;\n  background: #fffaf0;\n  color: #294c60;\n  cursor: pointer;\n  font: 12px/1.4 Arial, sans-serif;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #ece6d5;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  color: #fff9e7;\n  background: #23495b;\n  border-color: #23495b;\n}\nbutton[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #a78343;\n  font-weight: bold;\n  margin-right: 5px;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus {\n  outline: 3px solid #a57930;\n  outline-offset: 3px;\n}\n.visitor-navigation[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 10px 0 20px;\n  font: 12px Arial, sans-serif;\n}\n.room-presentation[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  padding: 5px 0 20px;\n}\n.room-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 20px;\n}\n.room-grid.inspecting[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1fr) 285px;\n}\n.room-stage[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.room-stage[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n.artifact-label[_ngcontent-%COMP%] {\n  padding: 26px 22px;\n  background: #fffbf2;\n  border: 1px solid #d7cdb8;\n  align-self: start;\n  border-top: 4px solid #b28b49;\n  border-radius: 4px;\n}\nh3[_ngcontent-%COMP%] {\n  font: 24px/1.25 Georgia, serif;\n  font-weight: normal;\n  margin: 12px 0;\n}\nh4[_ngcontent-%COMP%] {\n  font: bold 11px Arial, sans-serif;\n  letter-spacing: 0.09em;\n  text-transform: uppercase;\n  margin-top: 22px;\n}\n.artifact-label[_ngcontent-%COMP%]   .source[_ngcontent-%COMP%], \nli[_ngcontent-%COMP%] {\n  font: 11px/1.7 Arial, sans-serif;\n  overflow-wrap: anywhere;\n}\n.artifact-label[_ngcontent-%COMP%]   .source[_ngcontent-%COMP%] {\n  border-top: 1px solid #ddd2bd;\n  padding-top: 15px;\n}\na[_ngcontent-%COMP%] {\n  color: #345c74;\n  text-underline-offset: 3px;\n}\n.reading-view[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  border-top: 1px solid #d4c9b2;\n  padding-top: 15px;\n}\nsummary[_ngcontent-%COMP%] {\n  padding: 10px 0;\n  cursor: pointer;\n  font: 600 12px Arial, sans-serif;\n}\n.reading-view[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  max-width: 780px;\n  border-bottom: 1px solid #ded4c0;\n  padding: 10px 0;\n}\n.museum-note[_ngcontent-%COMP%], \n.empty-museum[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #646958;\n  text-align: center;\n}\n@media (max-width: 850px) {\n  .room-grid.inspecting[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .artifact-label[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .museum-walkthrough[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .museum-seal[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .museum-heading[_ngcontent-%COMP%] {\n    padding: 5px 0 18px;\n  }\n  .museum-directory[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1 1 130px;\n  }\n  .visitor-navigation[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media print {\n  app-museum-scene[_ngcontent-%COMP%], \n   nav[_ngcontent-%COMP%], \n   .visitor-navigation[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .reading-view[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .reading-view[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .museum-walkthrough[_ngcontent-%COMP%] {\n    border: 0;\n    padding: 0;\n  }\n}\n/*# sourceMappingURL=museum-presentation.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MuseumRoomPresentationComponent, [{
    type: Component,
    args: [{ selector: "app-museum-room-presentation", imports: [MuseumSceneComponent], template: `
    <section class="room-presentation">
      <header>
        <span>{{ label() }} \xB7 CURATED BY {{ board().teamCredit.displayName }}</span>
        <h2>{{ board().title }}</h2>
        <p>{{ board().centralClaim }}</p>
      </header>
      <div class="room-grid" [class.inspecting]="selectedObject()">
        <div class="room-stage">
          <app-museum-scene
            [content]="sceneContent()"
            [activeDisplay]="selectedSlot()"
            (selected)="select($event)"
          />
          <nav aria-label="Explore the room">
            <button type="button" [attr.aria-pressed]="!selectedSlot()" (click)="select()">
              Room overview
            </button>
            @for (slot of slots(); track slot.id) {
              @if (objectFor(slot.id); as object) {
                <button
                  type="button"
                  [attr.aria-pressed]="selectedSlot() === slot.id"
                  (click)="select(slot.id)"
                >
                  {{ slot.label }} \xB7 {{ object.title }}
                </button>
              }
            }
          </nav>
        </div>
        @if (selectedObject(); as object) {
          <aside class="artifact-label">
            <span>LOOK CLOSER</span>
            <h3 #labelHeading tabindex="-1">{{ object.title }}</h3>
            <p>{{ object.description }}</p>
            <h4>Why it matters</h4>
            <p>{{ object.evidenceConnection }}</p>
            @for (source of board().sources; track source.id) {
              @if (object.sourceIds.includes(source.id)) {
                <p class="source">
                  @if (source.url) {
                    <a [href]="source.url" target="_blank" rel="noopener noreferrer">{{
                      source.citation
                    }}</a>
                  } @else {
                    {{ source.citation }}
                  }
                </p>
              }
            }
            <button type="button" (click)="select()">Back to room overview</button>
          </aside>
        }
      </div>
      <details class="reading-view">
        <summary>Read all labels and sources</summary>
        @for (object of board().objects; track object.id) {
          <article>
            <h3>{{ object.title }}</h3>
            <p>{{ object.description }}</p>
            <p><strong>Why it matters.</strong> {{ object.evidenceConnection }}</p>
          </article>
        }
        <h3>Sources</h3>
        <ol>
          @for (source of board().sources; track source.id) {
            <li>
              @if (source.url) {
                <a [href]="source.url" target="_blank" rel="noopener noreferrer">{{
                  source.citation
                }}</a>
              } @else {
                {{ source.citation }}
              }
            </li>
          }
        </ol>
      </details>
    </section>
  `, styles: ['/* src/app/templates/exhibit-hall/rooms/museum-presentation.scss */\n:host {\n  display: block;\n  min-width: 0;\n  color: #243f50;\n}\n* {\n  box-sizing: border-box;\n}\n.museum-walkthrough {\n  padding: 28px;\n  background: #f3ead7;\n  border: 1px solid #d5cbb6;\n  border-radius: 7px;\n  border-top: 4px solid #23495b;\n  box-shadow: inset 0 3px #bc8b39;\n}\n.museum-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 25px;\n  padding: 12px 5px 24px;\n}\nheader span,\n.artifact-label > span {\n  font: 700 10px/1.6 Arial, sans-serif;\n  letter-spacing: 0.13em;\n}\nh2 {\n  font: 400 clamp(26px, 3vw, 40px)/1.15 Georgia, serif;\n  margin: 10px 0;\n}\np {\n  font: 14px/1.7 Arial, sans-serif;\n}\nheader p {\n  margin: 8px 0 0;\n  color: #676b5e;\n  max-width: 780px;\n}\n.museum-seal {\n  font: 40px Georgia, serif !important;\n  border: 1px solid #b79961;\n  outline: 1px solid #b79961;\n  outline-offset: 4px;\n  padding: 12px 18px;\n  color: #9c7a41;\n}\n.museum-directory,\nnav {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n}\n.museum-directory {\n  padding: 14px 0;\n  border-top: 1px solid #d7ceb9;\n  margin-bottom: 8px;\n}\nbutton {\n  min-height: 42px;\n  padding: 10px 14px;\n  border: 1px solid #c9bea7;\n  border-radius: 4px;\n  background: #fffaf0;\n  color: #294c60;\n  cursor: pointer;\n  font: 12px/1.4 Arial, sans-serif;\n}\nbutton:hover {\n  background: #ece6d5;\n}\nbutton[aria-pressed=true] {\n  color: #fff9e7;\n  background: #23495b;\n  border-color: #23495b;\n}\nbutton span {\n  color: #a78343;\n  font-weight: bold;\n  margin-right: 5px;\n}\nbutton:focus-visible,\nsummary:focus-visible,\na:focus-visible,\n[tabindex="-1"]:focus {\n  outline: 3px solid #a57930;\n  outline-offset: 3px;\n}\n.visitor-navigation {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 10px 0 20px;\n  font: 12px Arial, sans-serif;\n}\n.room-presentation > header {\n  padding: 5px 0 20px;\n}\n.room-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 20px;\n}\n.room-grid.inspecting {\n  grid-template-columns: minmax(0, 1fr) 285px;\n}\n.room-stage {\n  min-width: 0;\n}\n.room-stage nav {\n  margin-top: 10px;\n}\n.artifact-label {\n  padding: 26px 22px;\n  background: #fffbf2;\n  border: 1px solid #d7cdb8;\n  align-self: start;\n  border-top: 4px solid #b28b49;\n  border-radius: 4px;\n}\nh3 {\n  font: 24px/1.25 Georgia, serif;\n  font-weight: normal;\n  margin: 12px 0;\n}\nh4 {\n  font: bold 11px Arial, sans-serif;\n  letter-spacing: 0.09em;\n  text-transform: uppercase;\n  margin-top: 22px;\n}\n.artifact-label .source,\nli {\n  font: 11px/1.7 Arial, sans-serif;\n  overflow-wrap: anywhere;\n}\n.artifact-label .source {\n  border-top: 1px solid #ddd2bd;\n  padding-top: 15px;\n}\na {\n  color: #345c74;\n  text-underline-offset: 3px;\n}\n.reading-view {\n  margin-top: 20px;\n  border-top: 1px solid #d4c9b2;\n  padding-top: 15px;\n}\nsummary {\n  padding: 10px 0;\n  cursor: pointer;\n  font: 600 12px Arial, sans-serif;\n}\n.reading-view article {\n  max-width: 780px;\n  border-bottom: 1px solid #ded4c0;\n  padding: 10px 0;\n}\n.museum-note,\n.empty-museum {\n  font-size: 12px;\n  color: #646958;\n  text-align: center;\n}\n@media (max-width: 850px) {\n  .room-grid.inspecting {\n    grid-template-columns: 1fr;\n  }\n  .artifact-label {\n    max-width: 100%;\n  }\n  .museum-walkthrough {\n    padding: 14px;\n  }\n  .museum-seal {\n    display: none;\n  }\n  .museum-heading {\n    padding: 5px 0 18px;\n  }\n  .museum-directory button {\n    flex: 1 1 130px;\n  }\n  .visitor-navigation span {\n    display: none;\n  }\n}\n@media print {\n  app-museum-scene,\n  nav,\n  .visitor-navigation {\n    display: none;\n  }\n  .reading-view {\n    display: block;\n  }\n  .reading-view > * {\n    display: block;\n  }\n  .museum-walkthrough {\n    border: 0;\n    padding: 0;\n  }\n}\n/*# sourceMappingURL=museum-presentation.css.map */\n'] }]
  }], () => [], { board: [{ type: Input, args: [{ isSignal: true, alias: "board", required: true }] }], label: [{ type: Input, args: [{ isSignal: true, alias: "label", required: false }] }], labelHeading: [{ type: ViewChild, args: ["labelHeading", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MuseumRoomPresentationComponent, { className: "MuseumRoomPresentationComponent", filePath: "src/app/templates/exhibit-hall/rooms/museum-room-presentation.component.ts", lineNumber: 104 });
})();

export {
  parseMetaStepsEmbed,
  parsePresentationVideo,
  MuseumBoardRenderer,
  isMuseumBoardSnapshotData,
  MUSEUM_PUBLICATION,
  EXHIBIT_HALL_CONFIG,
  EXHIBIT_HALL_PERSISTENCE,
  EXHIBIT_HALL_SESSION_CONTEXT,
  EXHIBIT_RENDERER_COMPONENTS,
  MuseumSceneComponent,
  MuseumRoomPresentationComponent
};
//# debugId=8b28a5d0-711d-5c87-9eca-74007eb2f76c
//# sourceMappingURL=chunk-NP2TX5O3.js.map
