import {
  PaintingCanvasComponent,
  comparisonImage,
  downloadFile,
  escapeHtml,
  renderRestoration
} from "./chunk-DZQKVJPO.js";
import {
  RestorationPreviewRuntime,
  matchTopic
} from "./chunk-S5XYY4CS.js";
import {
  selectedRepair
} from "./chunk-YYZUZM6Q.js";
import "./chunk-JAVOWGH2.js";
import "./chunk-AVOS3LLT.js";
import "./chunk-4FYN5UCY.js";
import {
  requireSpatialInspection
} from "./chunk-VU6DZYCP.js";
import "./chunk-7PDR3NVC.js";
import {
  bindLessonFocus
} from "./chunk-3C62DQOL.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  InjectionToken,
  Input,
  Output,
  ViewChild,
  afterNextRender,
  computed,
  effect,
  forwardRef,
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
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/restoration/weekly/restoration-scene-film.component.ts
var _c0 = ["player"];
var _forTrack0 = ($index, $item) => $item.at;
function RestorationSceneFilmComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 4);
    \u0275\u0275text(1, "The film could not load. Use the picture and the scene transcript below to inspect the same details.");
    \u0275\u0275domElementEnd();
  }
}
function RestorationSceneFilmComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 8);
    \u0275\u0275domListener("click", function RestorationSceneFilmComponent_For_9_Template_button_click_0_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.seek(item_r4.at));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", ctx_r4.cue().at === item_r4.at);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", item_r4.at, "s \xB7 ", item_r4.label);
  }
}
function RestorationSceneFilmComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", item_r6.at, "s \u2014 ", item_r6.transcript);
  }
}
var RestorationSceneFilmComponent = class _RestorationSceneFilmComponent {
  film = input.required(
    ...ngDevMode ? [{ debugName: "film" }] : (
      /* istanbul ignore next */
      []
    )
  );
  startTime = input(
    0,
    ...ngDevMode ? [{ debugName: "startTime" }] : (
      /* istanbul ignore next */
      []
    )
  );
  region = output();
  position = output();
  time = signal(
    0,
    ...ngDevMode ? [{ debugName: "time" }] : (
      /* istanbul ignore next */
      []
    )
  );
  failed = signal(
    false,
    ...ngDevMode ? [{ debugName: "failed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cue = computed(
    () => [...this.film().cues].reverse().find((c) => c.at <= this.time()) ?? this.film().cues[0],
    ...ngDevMode ? [{ debugName: "cue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  player = viewChild(
    "player",
    ...ngDevMode ? [{ debugName: "player" }] : (
      /* istanbul ignore next */
      []
    )
  );
  restore() {
    const player = this.player()?.nativeElement;
    if (player) {
      player.currentTime = Math.min(this.startTime(), player.duration || 0);
      this.time.set(player.currentTime);
    }
  }
  seek(time) {
    const player = this.player()?.nativeElement;
    if (player) {
      player.pause();
      player.currentTime = time;
    }
    this.time.set(time);
    this.position.emit(time);
  }
  inspect() {
    this.player()?.nativeElement.pause();
    this.position.emit(this.time());
    this.region.emit(this.cue().regionId);
  }
  static \u0275fac = function RestorationSceneFilmComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RestorationSceneFilmComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RestorationSceneFilmComponent, selectors: [["app-restoration-scene-film"]], viewQuery: function RestorationSceneFilmComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.player, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { film: [1, "film"], startTime: [1, "startTime"] }, outputs: { region: "region", position: "position" }, decls: 19, vars: 5, consts: [["player", ""], [1, "film"], ["controls", "", "playsinline", "", "preload", "metadata", "aria-label", "Still-image study with camera movement only", 3, "loadedmetadata", "timeupdate", "pause", "error", "src"], ["kind", "captions", "srclang", "en", "label", "Scene description", "default", "", 3, "src"], ["role", "alert"], [1, "inspect", 3, "click"], ["aria-label", "Film inspection points", 1, "cue-buttons"], ["aria-live", "polite", 1, "caption"], [3, "click"]], template: function RestorationSceneFilmComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275domElementStart(0, "div", 1)(1, "video", 2, 0);
      \u0275\u0275domListener("loadedmetadata", function RestorationSceneFilmComponent_Template_video_loadedmetadata_1_listener() {
        return ctx.restore();
      })("timeupdate", function RestorationSceneFilmComponent_Template_video_timeupdate_1_listener() {
        \u0275\u0275restoreView(_r1);
        const player_r2 = \u0275\u0275reference(2);
        return \u0275\u0275resetView(ctx.time.set(player_r2.currentTime));
      })("pause", function RestorationSceneFilmComponent_Template_video_pause_1_listener() {
        \u0275\u0275restoreView(_r1);
        const player_r2 = \u0275\u0275reference(2);
        return \u0275\u0275resetView(ctx.position.emit(player_r2.currentTime));
      })("error", function RestorationSceneFilmComponent_Template_video_error_1_listener() {
        return ctx.failed.set(true);
      });
      \u0275\u0275domElement(3, "track", 3);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(4, RestorationSceneFilmComponent_Conditional_4_Template, 2, 0, "p", 4);
      \u0275\u0275domElementStart(5, "button", 5);
      \u0275\u0275domListener("click", function RestorationSceneFilmComponent_Template_button_click_5_listener() {
        return ctx.inspect();
      });
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(7, "div", 6);
      \u0275\u0275repeaterCreate(8, RestorationSceneFilmComponent_For_9_Template, 2, 3, "button", null, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "p", 7);
      \u0275\u0275text(11);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "details")(13, "summary");
      \u0275\u0275text(14, "Image-study transcript & media note");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(15, "p");
      \u0275\u0275text(16, "A still illustration with camera movement and captions. People and objects do not move; this contains no character performance or interview. The illustration is not independent historical evidence.");
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(17, RestorationSceneFilmComponent_For_18_Template, 2, 2, "p", null, _forTrack0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275domProperty("src", ctx.film().src, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("src", ctx.film().captions);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.failed() ? 4 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("\u2315 Inspect ", ctx.cue().label, " in the picture \u2192");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.film().cues);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.cue().transcript);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.film().cues);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.film[_ngcontent-%COMP%] {\n  position: relative;\n  background: #091812;\n  border-radius: 8px;\n  overflow: hidden;\n}\nvideo[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  aspect-ratio: 1;\n}\nvideo[_ngcontent-%COMP%]::cue {\n  font-size: 14px;\n  background-color: rgba(16, 37, 31, 0.9333333333);\n  color: #fff9e9;\n}\n.inspect[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #f0d499;\n  color: #172d24;\n  font-weight: 700;\n  border: 0;\n}\n.cue-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 10px;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  font-size: 13px;\n  min-height: 44px;\n  padding: 10px 12px;\n  cursor: pointer;\n  border: 1px solid #889784;\n  border-radius: 5px;\n  background: #213f32;\n  color: #fff2d8;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: #f0d499;\n  background: #3a5640;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #f5cf75;\n  outline-offset: 3px;\n}\n.caption[_ngcontent-%COMP%], \ndetails[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.6;\n  color: #d2dfd2;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 8px 0;\n}\ndetails[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  padding: 0 8px;\n}\n/*# sourceMappingURL=restoration-scene-film.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RestorationSceneFilmComponent, [{
    type: Component,
    args: [{ selector: "app-restoration-scene-film", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="film">
      <video #player controls playsinline preload="metadata" [src]="film().src" aria-label="Still-image study with camera movement only"
        (loadedmetadata)="restore()" (timeupdate)="time.set(player.currentTime)" (pause)="position.emit(player.currentTime)" (error)="failed.set(true)">
        <track kind="captions" [src]="film().captions" srclang="en" label="Scene description" default>
      </video>
      @if (failed()) { <p role="alert">The film could not load. Use the picture and the scene transcript below to inspect the same details.</p> }
      <button class="inspect" (click)="inspect()">\u2315 Inspect {{ cue().label }} in the picture \u2192</button>
    </div>
    <div class="cue-buttons" aria-label="Film inspection points">
      @for (item of film().cues; track item.at) {
        <button [attr.aria-pressed]="cue().at === item.at" (click)="seek(item.at)">{{ item.at }}s \xB7 {{ item.label }}</button>
      }
    </div>
    <p class="caption" aria-live="polite">{{ cue().transcript }}</p>
    <details><summary>Image-study transcript & media note</summary><p>A still illustration with camera movement and captions. People and objects do not move; this contains no character performance or interview. The illustration is not independent historical evidence.</p>
      @for (item of film().cues; track item.at) { <p>{{ item.at }}s \u2014 {{ item.transcript }}</p> }
    </details>
  `, styles: ["/* angular:styles/component:scss;ef3f8bc29bf214fc045f7d179ec7250f757f613551ed00bc5a5d975f25b872b1;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/heist/restoration/weekly/restoration-scene-film.component.ts */\n:host {\n  display: block;\n  min-width: 0;\n}\n.film {\n  position: relative;\n  background: #091812;\n  border-radius: 8px;\n  overflow: hidden;\n}\nvideo {\n  display: block;\n  width: 100%;\n  aspect-ratio: 1;\n}\nvideo::cue {\n  font-size: 14px;\n  background-color: rgba(16, 37, 31, 0.9333333333);\n  color: #fff9e9;\n}\n.inspect {\n  width: 100%;\n  background: #f0d499;\n  color: #172d24;\n  font-weight: 700;\n  border: 0;\n}\n.cue-buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 10px;\n}\nbutton {\n  font: inherit;\n  font-size: 13px;\n  min-height: 44px;\n  padding: 10px 12px;\n  cursor: pointer;\n  border: 1px solid #889784;\n  border-radius: 5px;\n  background: #213f32;\n  color: #fff2d8;\n}\nbutton[aria-pressed=true] {\n  border-color: #f0d499;\n  background: #3a5640;\n}\nbutton:focus-visible,\nsummary:focus-visible {\n  outline: 3px solid #f5cf75;\n  outline-offset: 3px;\n}\n.caption,\ndetails {\n  font-size: 13px;\n  line-height: 1.6;\n  color: #d2dfd2;\n}\nsummary {\n  cursor: pointer;\n  padding: 8px 0;\n}\ndetails p {\n  padding: 0 8px;\n}\n/*# sourceMappingURL=restoration-scene-film.component.css.map */\n"] }]
  }], null, { film: [{ type: Input, args: [{ isSignal: true, alias: "film", required: true }] }], startTime: [{ type: Input, args: [{ isSignal: true, alias: "startTime", required: false }] }], region: [{ type: Output, args: ["region"] }], position: [{ type: Output, args: ["position"] }], player: [{ type: ViewChild, args: ["player", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RestorationSceneFilmComponent, { className: "RestorationSceneFilmComponent", filePath: "src/app/templates/heist/restoration/weekly/restoration-scene-film.component.ts", lineNumber: 28 });
})();

// src/app/shared/panorama/panorama-interview.adapter.ts
var ScriptedPanoramaInterview = class {
  mode = "scripted";
  async answer(_scene, person, question) {
    const topic = matchTopic(person, question);
    return { role: "character", text: topic?.reply ?? "I do not have a prepared answer to that question in this preview. Try asking one of the questions below about my work.", sourceIds: topic?.sourceIds ?? [] };
  }
};
var PANORAMA_INTERVIEW = new InjectionToken("PANORAMA_INTERVIEW", { providedIn: "root", factory: () => new ScriptedPanoramaInterview() });

// src/app/shared/panorama/panorama-painting.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function PanoramaPaintingComponent_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "img", 3);
  }
  if (rf & 2) {
    const repair_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("clip-path", ctx_r1.clip(repair_r1.rect));
    \u0275\u0275domProperty("src", ctx_r1.scene().forgery, \u0275\u0275sanitizeUrl);
    \u0275\u0275attribute("data-forgery", repair_r1.id);
  }
}
function PanoramaPaintingComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PanoramaPaintingComponent_For_3_Conditional_0_Template, 1, 4, "img", 2);
  }
  if (rf & 2) {
    const repair_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.original() || !ctx_r1.state().repairs[repair_r1.id] ? 0 : -1);
  }
}
function clipRect(r) {
  return `inset(${r.y}% ${100 - r.x - r.width}% ${100 - r.y - r.height}% ${r.x}%)`;
}
var PanoramaPaintingComponent = class _PanoramaPaintingComponent {
  scene = input.required(
    ...ngDevMode ? [{ debugName: "scene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  state = input.required(
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  original = input(
    false,
    ...ngDevMode ? [{ debugName: "original" }] : (
      /* istanbul ignore next */
      []
    )
  );
  clip = clipRect;
  static \u0275fac = function PanoramaPaintingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PanoramaPaintingComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PanoramaPaintingComponent, selectors: [["app-panorama-painting"]], inputs: { scene: [1, "scene"], state: [1, "state"], original: [1, "original"] }, decls: 4, vars: 2, consts: [["role", "img", 1, "painting"], ["alt", "", 3, "src"], ["alt", "", 1, "layer", 3, "src", "clip-path"], ["alt", "", 1, "layer", 3, "src"]], template: function PanoramaPaintingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275domElement(1, "img", 1);
      \u0275\u0275repeaterCreate(2, PanoramaPaintingComponent_For_3_Template, 1, 1, null, null, _forTrack02);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("aria-label", ctx.original() ? "Painting under investigation: " + ctx.scene().imageAlt : "Your restoration: " + ctx.scene().imageAlt);
      \u0275\u0275advance();
      \u0275\u0275domProperty("src", ctx.scene().panorama, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.scene().repairs);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.painting[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 3;\n  overflow: hidden;\n  background: #243b30;\n}\n.painting[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: fill;\n}\n.layer[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n/*# sourceMappingURL=panorama-painting.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PanoramaPaintingComponent, [{
    type: Component,
    args: [{ selector: "app-panorama-painting", changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="painting" role="img" [attr.aria-label]="original() ? 'Painting under investigation: ' + scene().imageAlt : 'Your restoration: ' + scene().imageAlt">
    <img [src]="scene().panorama" alt="">
    @for (repair of scene().repairs; track repair.id) { @if (original() || !state().repairs[repair.id]) {
      <img class="layer" [src]="scene().forgery" [style.clip-path]="clip(repair.rect)" [attr.data-forgery]="repair.id" alt="">
    } }
  </div>`, styles: ["/* angular:styles/component:scss;5431b52f038577ac3254f8487d0db2bcd4cc259d57af450acf420a9c0cddcad4;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/shared/panorama/panorama-painting.component.ts */\n:host {\n  display: block;\n}\n.painting {\n  position: relative;\n  aspect-ratio: 3;\n  overflow: hidden;\n  background: #243b30;\n}\n.painting img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: fill;\n}\n.layer {\n  position: absolute;\n  inset: 0;\n}\n/*# sourceMappingURL=panorama-painting.component.css.map */\n"] }]
  }], null, { scene: [{ type: Input, args: [{ isSignal: true, alias: "scene", required: true }] }], state: [{ type: Input, args: [{ isSignal: true, alias: "state", required: true }] }], original: [{ type: Input, args: [{ isSignal: true, alias: "original", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PanoramaPaintingComponent, { className: "PanoramaPaintingComponent", filePath: "src/app/shared/panorama/panorama-painting.component.ts", lineNumber: 14 });
})();

// src/app/shared/panorama/panorama-export.ts
async function image(src) {
  return new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error("Scene artwork could not load."));
    i.src = src;
  });
}
async function renderPanoramaPainting(d, s, original = false) {
  const [base, forged] = await Promise.all([image(d.panorama), image(d.forgery)]);
  const c = document.createElement("canvas");
  c.width = base.naturalWidth;
  c.height = base.naturalHeight;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("Image export unavailable.");
  ctx.drawImage(base, 0, 0, c.width, c.height);
  for (const r of d.repairs) if (original || !s.repairs[r.id]) {
    const { x, y, width, height } = r.rect;
    ctx.drawImage(forged, forged.naturalWidth * x / 100, forged.naturalHeight * y / 100, forged.naturalWidth * width / 100, forged.naturalHeight * height / 100, c.width * x / 100, c.height * y / 100, c.width * width / 100, c.height * height / 100);
  }
  return c;
}

// src/app/shared/panorama/spherical-view.math.ts
var wrapYaw = (value) => ((value + 180) % 360 + 360) % 360 - 180;
var clampPitch = (value) => Math.max(-89.9, Math.min(89.9, value));
function viewDirection(yaw, pitch) {
  const longitude = (yaw + 180) * Math.PI / 180, latitude = pitch * Math.PI / 180;
  return [Math.cos(longitude) * Math.cos(latitude), Math.sin(latitude), Math.sin(longitude) * Math.cos(latitude)];
}

// src/app/shared/spatial-inspection/spatial-inspection.component.ts
var _c02 = ["surface"];
var _c1 = ["canvas"];
var _forTrack03 = ($index, $item) => $item.name;
function SpatialInspectionComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 8);
    \u0275\u0275text(1, "Opening scene\u2026");
    \u0275\u0275domElementEnd();
  }
}
function SpatialInspectionComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function SpatialInspectionComponent_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 5);
    \u0275\u0275domListener("click", function SpatialInspectionComponent_Conditional_13_For_2_Template_button_click_0_listener() {
      const target_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.inspect(target_r4.name));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const target_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r0.selected() === target_r4.label);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(target_r4.label);
  }
}
function SpatialInspectionComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 10);
    \u0275\u0275repeaterCreate(1, SpatialInspectionComponent_Conditional_13_For_2_Template, 2, 2, "button", null, _forTrack03);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 11)(4, "button", 12);
    \u0275\u0275domListener("click", function SpatialInspectionComponent_Conditional_13_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.step(-0.5236));
    });
    \u0275\u0275text(5, "\u21B6 Walk left");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "button", 13);
    \u0275\u0275domListener("click", function SpatialInspectionComponent_Conditional_13_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.step(0.5236));
    });
    \u0275\u0275text(7, "Walk right \u21B7");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "button", 14);
    \u0275\u0275domListener("click", function SpatialInspectionComponent_Conditional_13_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.elevation(-0.2));
    });
    \u0275\u0275text(9, "View from above");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "button", 15);
    \u0275\u0275domListener("click", function SpatialInspectionComponent_Conditional_13_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.zoom(0.8));
    });
    \u0275\u0275text(11, "\uFF0B");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "button", 16);
    \u0275\u0275domListener("click", function SpatialInspectionComponent_Conditional_13_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.zoom(1.25));
    });
    \u0275\u0275text(13, "\u2212");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(14, "output", 17);
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.definition().targets);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate2("", ctx_r0.selected() || ctx_r0.definition().overviewLabel || "Whole scene", " \xB7 ", ctx_r0.heading(), "\xB0");
  }
}
var SpatialInspectionComponent = class _SpatialInspectionComponent {
  definition = input.required(
    ...ngDevMode ? [{ debugName: "definition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  leave = output();
  surface = viewChild(
    "surface",
    ...ngDevMode ? [{ debugName: "surface" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canvas = viewChild(
    "canvas",
    ...ngDevMode ? [{ debugName: "canvas" }] : (
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
  error = signal(
    "",
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = signal(
    "",
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  heading = signal(
    0,
    ...ngDevMode ? [{ debugName: "heading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  T;
  renderer;
  camera;
  scene;
  controls;
  mounted;
  observer;
  request = new AbortController();
  pointer;
  releaseEnvironment;
  constructor() {
    afterNextRender(() => void this.setup());
    inject(DestroyRef).onDestroy(() => {
      this.request.abort();
      this.observer?.disconnect();
      this.controls?.dispose();
      this.releaseEnvironment?.();
      this.mounted?.dispose();
      this.scene?.traverse((node) => {
        if (this.T && node instanceof this.T.DirectionalLight)
          node.shadow.dispose();
      });
      this.renderer?.dispose();
    });
  }
  async setup() {
    try {
      const definition = requireSpatialInspection(this.definition());
      const [T, { OrbitControls }, { loadSpatialAsset }] = await Promise.all([import("./chunk-UO75LFSY.js"), import("./chunk-DHMTXYUZ.js"), import("./chunk-335TYCHM.js")]);
      if (this.request.signal.aborted)
        return;
      this.T = T;
      const renderer = this.renderer = new T.WebGLRenderer({ canvas: this.canvas().nativeElement, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setClearColor(13162197);
      renderer.outputColorSpace = T.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = T.PCFSoftShadowMap;
      renderer.shadowMap.autoUpdate = false;
      const scene = this.scene = new T.Scene();
      scene.fog = new T.Fog(13162197, 15, 30);
      scene.add(new T.HemisphereLight(15267839, 7430212, 2.4));
      const sun = new T.DirectionalLight(16770492, 3);
      sun.position.set(-3, 8, 5);
      sun.castShadow = true;
      sun.shadow.mapSize.set(1024, 1024);
      Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 0.5, far: 30 });
      sun.shadow.normalBias = 0.03;
      scene.add(sun);
      const camera = this.camera = new T.PerspectiveCamera(48, 1, 0.05, 60);
      const controls = this.controls = new OrbitControls(camera, this.canvas().nativeElement);
      controls.enablePan = false;
      controls.enableDamping = false;
      controls.minPolarAngle = 0.18;
      controls.maxPolarAngle = 1.3;
      controls.maxDistance = 11;
      controls.addEventListener("change", () => this.draw());
      this.mounted = await loadSpatialAsset(definition.asset, this.request.signal);
      this.mounted.pivot.traverse((node) => {
        if (node instanceof T.Mesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      scene.add(this.mounted.pivot);
      renderer.shadowMap.needsUpdate = true;
      if (definition.environment) {
        const { installSpatialEnvironment } = await import("./chunk-5HM43RU4.js");
        if (this.request.signal.aborted)
          return;
        this.releaseEnvironment = await installSpatialEnvironment(scene, this.mounted, definition.environment, this.request.signal);
      }
      this.loading.set(false);
      this.overview();
      this.observer = new ResizeObserver(() => this.resize());
      this.observer.observe(this.surface().nativeElement);
      this.resize();
    } catch (error) {
      if (!this.request.signal.aborted) {
        this.loading.set(false);
        this.error.set("The scene could not open. Return to the village and try again.");
      }
    }
  }
  resize() {
    const box = this.surface()?.nativeElement;
    if (!box || !this.camera || !this.renderer)
      return;
    this.renderer.setSize(box.clientWidth, box.clientHeight, false);
    this.camera.aspect = box.clientWidth / Math.max(1, box.clientHeight);
    this.camera.updateProjectionMatrix();
    this.draw();
  }
  draw() {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
      if (this.controls) {
        const degrees = this.controls.getAzimuthalAngle() * 180 / Math.PI;
        this.heading.set(Math.round((degrees + 360) % 360));
      }
    }
  }
  overview() {
    if (!this.camera || !this.controls)
      return;
    this.selected.set("");
    this.controls.target.set(0, 0.6, 0);
    this.controls.minDistance = 4.3;
    this.camera.position.set(5, 3.2, 5.8);
    this.controls.update();
    this.draw();
  }
  inspect(name) {
    const target = this.definition().targets.find((t) => t.name === name);
    if (!target || !this.camera || !this.controls)
      return;
    this.selected.set(target.label);
    this.controls.target.set(...target.focus);
    this.controls.minDistance = Math.max(1.1, target.distance * 0.65);
    this.camera.position.set(target.focus[0] + target.distance * 0.7, target.focus[1] + target.distance * 0.75, target.focus[2] + target.distance * 0.6);
    this.controls.update();
    this.draw();
  }
  step(angle) {
    if (!this.camera || !this.controls || !this.T)
      return;
    const offset = this.camera.position.clone().sub(this.controls.target);
    offset.applyAxisAngle(new this.T.Vector3(0, 1, 0), angle);
    this.camera.position.copy(this.controls.target).add(offset);
    this.controls.update();
    this.draw();
  }
  zoom(scale) {
    if (!this.camera || !this.controls)
      return;
    const offset = this.camera.position.clone().sub(this.controls.target);
    offset.setLength(Math.max(this.controls.minDistance, Math.min(this.controls.maxDistance, offset.length() * scale)));
    this.camera.position.copy(this.controls.target).add(offset);
    this.controls.update();
    this.draw();
  }
  elevation(delta) {
    if (!this.camera || !this.controls || !this.T)
      return;
    const s = new this.T.Spherical().setFromVector3(this.camera.position.clone().sub(this.controls.target));
    s.phi = Math.max(0.18, Math.min(1.3, s.phi + delta));
    this.camera.position.copy(this.controls.target).add(new this.T.Vector3().setFromSpherical(s));
    this.controls.update();
    this.draw();
  }
  down(e) {
    this.pointer = { x: e.clientX, y: e.clientY };
  }
  pick(e) {
    const start = this.pointer;
    this.pointer = void 0;
    if (!start || Math.hypot(start.x - e.clientX, start.y - e.clientY) > 6 || !this.T || !this.camera || !this.mounted)
      return;
    const rect = this.canvas().nativeElement.getBoundingClientRect(), ray = new this.T.Raycaster();
    ray.setFromCamera(new this.T.Vector2((e.clientX - rect.left) / rect.width * 2 - 1, 1 - (e.clientY - rect.top) / rect.height * 2), this.camera);
    const targets = this.definition().targets.map((t) => this.mounted.nodes.get(t.name)).filter(Boolean);
    let node = ray.intersectObjects(targets, true)[0]?.object;
    while (node) {
      if (this.definition().targets.some((t) => t.name === node.name)) {
        this.inspect(node.name);
        break;
      }
      node = node.parent ?? void 0;
    }
  }
  key(e) {
    const actions = { ArrowLeft: () => this.step(-Math.PI / 6), ArrowRight: () => this.step(Math.PI / 6), ArrowUp: () => this.elevation(-0.15), ArrowDown: () => this.elevation(0.15), "+": () => this.zoom(0.8), "-": () => this.zoom(1.25), Escape: () => this.overview() };
    if (actions[e.key]) {
      e.preventDefault();
      actions[e.key]();
    }
  }
  static \u0275fac = function SpatialInspectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SpatialInspectionComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SpatialInspectionComponent, selectors: [["app-spatial-inspection"]], viewQuery: function SpatialInspectionComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.surface, _c02, 5)(ctx.canvas, _c1, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, inputs: { definition: [1, "definition"] }, outputs: { leave: "leave" }, decls: 14, vars: 7, consts: [["surface", ""], ["canvas", ""], [1, "workshop"], ["tabindex", "0", "role", "img", 3, "keydown", "pointerdown", "pointerup"], [1, "top"], [3, "click"], [1, "tag"], [3, "click", "disabled"], ["role", "status", 1, "notice"], ["role", "alert", 1, "notice"], ["aria-label", "Inspect objects", 1, "inspect"], ["aria-label", "Move around the scene", 1, "navigation"], ["aria-label", "Walk left", 3, "click"], ["aria-label", "Walk right", 3, "click"], ["aria-label", "View from above", 3, "click"], ["aria-label", "Move closer", 3, "click"], ["aria-label", "Move back", 3, "click"], ["aria-live", "polite", 1, "position"]], template: function SpatialInspectionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 2, 0)(2, "canvas", 3, 1);
      \u0275\u0275domListener("keydown", function SpatialInspectionComponent_Template_canvas_keydown_2_listener($event) {
        return ctx.key($event);
      })("pointerdown", function SpatialInspectionComponent_Template_canvas_pointerdown_2_listener($event) {
        return ctx.down($event);
      })("pointerup", function SpatialInspectionComponent_Template_canvas_pointerup_2_listener($event) {
        return ctx.pick($event);
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "div", 4)(5, "button", 5);
      \u0275\u0275domListener("click", function SpatialInspectionComponent_Template_button_click_5_listener() {
        return ctx.leave.emit();
      });
      \u0275\u0275text(6, "\u2190 Village");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "span", 6);
      \u0275\u0275text(8);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "button", 7);
      \u0275\u0275domListener("click", function SpatialInspectionComponent_Template_button_click_9_listener() {
        return ctx.overview();
      });
      \u0275\u0275text(10);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(11, SpatialInspectionComponent_Conditional_11_Template, 2, 0, "p", 8);
      \u0275\u0275conditionalCreate(12, SpatialInspectionComponent_Conditional_12_Template, 2, 1, "p", 9);
      \u0275\u0275conditionalCreate(13, SpatialInspectionComponent_Conditional_13_Template, 16, 2);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-label", (ctx.definition().title || "3D scene") + ". Drag or use arrow keys to move around. Select an object to inspect.");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.definition().title || "Inspection area", " \xB7 3D reconstruction");
      \u0275\u0275advance();
      \u0275\u0275domProperty("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.definition().overviewLabel || "Whole scene");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && !ctx.error() ? 13 : -1);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.workshop[_ngcontent-%COMP%] {\n  position: relative;\n  height: clamp(470px, 66vh, 740px);\n  min-width: 0;\n  overflow: hidden;\n  border-radius: 12px;\n  background: #c8d6d5;\n}\ncanvas[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  touch-action: none;\n  cursor: grab;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 1px solid #779080;\n  background: rgba(255, 249, 233, 0.9294117647);\n  color: #203c31;\n  border-radius: 8px;\n  padding: 9px 13px;\n  font: inherit;\n  font-size: 13px;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:hover, \nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #264c3d;\n  color: #fff8e4;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ncanvas[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #cb711b;\n  outline-offset: -3px;\n}\n.top[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  left: 12px;\n  right: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n.tag[_ngcontent-%COMP%] {\n  font-size: 12px;\n  background: rgba(36, 69, 55, 0.8509803922);\n  color: #fff6da;\n  padding: 9px 12px;\n  border-radius: 20px;\n}\n.inspect[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 70px;\n  left: 12px;\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.navigation[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 40px;\n  left: 12px;\n  right: 12px;\n  display: flex;\n  gap: 6px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n.position[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 12px;\n  left: 0;\n  right: 0;\n  text-align: center;\n  font-size: 12px;\n  color: #203c31;\n}\n.notice[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 45%;\n  left: 15%;\n  right: 15%;\n  background: #fff9e9;\n  padding: 18px;\n  border-radius: 10px;\n}\n@media (max-width: 600px) {\n  .workshop[_ngcontent-%COMP%] {\n    height: 580px;\n  }\n  .tag[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .inspect[_ngcontent-%COMP%] {\n    right: 12px;\n  }\n  .inspect[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .navigation[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 9px;\n  }\n  .top[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n}\n/*# sourceMappingURL=spatial-inspection.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpatialInspectionComponent, [{
    type: Component,
    args: [{ selector: "app-spatial-inspection", changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="workshop" #surface>
  <canvas #canvas tabindex="0" role="img" [attr.aria-label]="(definition().title || '3D scene') + '. Drag or use arrow keys to move around. Select an object to inspect.'" (keydown)="key($event)" (pointerdown)="down($event)" (pointerup)="pick($event)"></canvas>
  <div class="top"><button (click)="leave.emit()">\u2190 Village</button><span class="tag">{{definition().title || 'Inspection area'}} \xB7 3D reconstruction</span><button (click)="overview()" [disabled]="loading()">{{definition().overviewLabel || 'Whole scene'}}</button></div>
  @if(loading()){<p class="notice" role="status">Opening scene\u2026</p>}
  @if(error()){<p class="notice" role="alert">{{error()}}</p>}
  @if(!loading()&&!error()){
    <div class="inspect" aria-label="Inspect objects">@for(target of definition().targets;track target.name){<button [attr.aria-pressed]="selected()===target.label" (click)="inspect(target.name)">{{target.label}}</button>}</div>
    <div class="navigation" aria-label="Move around the scene"><button (click)="step(-.5236)" aria-label="Walk left">\u21B6 Walk left</button><button (click)="step(.5236)" aria-label="Walk right">Walk right \u21B7</button><button (click)="elevation(-.2)" aria-label="View from above">View from above</button><button (click)="zoom(.8)" aria-label="Move closer">\uFF0B</button><button (click)="zoom(1.25)" aria-label="Move back">\u2212</button></div>
    <output class="position" aria-live="polite">{{selected()||definition().overviewLabel||'Whole scene'}} \xB7 {{heading()}}\xB0</output>
  }
</div>
`, styles: ["/* src/app/shared/spatial-inspection/spatial-inspection.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n}\n.workshop {\n  position: relative;\n  height: clamp(470px, 66vh, 740px);\n  min-width: 0;\n  overflow: hidden;\n  border-radius: 12px;\n  background: #c8d6d5;\n}\ncanvas {\n  display: block;\n  width: 100%;\n  height: 100%;\n  touch-action: none;\n  cursor: grab;\n}\nbutton {\n  min-height: 44px;\n  border: 1px solid #779080;\n  background: rgba(255, 249, 233, 0.9294117647);\n  color: #203c31;\n  border-radius: 8px;\n  padding: 9px 13px;\n  font: inherit;\n  font-size: 13px;\n  cursor: pointer;\n}\nbutton:hover,\nbutton[aria-pressed=true] {\n  background: #264c3d;\n  color: #fff8e4;\n}\nbutton:focus-visible,\ncanvas:focus-visible {\n  outline: 3px solid #cb711b;\n  outline-offset: -3px;\n}\n.top {\n  position: absolute;\n  top: 12px;\n  left: 12px;\n  right: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n.tag {\n  font-size: 12px;\n  background: rgba(36, 69, 55, 0.8509803922);\n  color: #fff6da;\n  padding: 9px 12px;\n  border-radius: 20px;\n}\n.inspect {\n  position: absolute;\n  top: 70px;\n  left: 12px;\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.navigation {\n  position: absolute;\n  bottom: 40px;\n  left: 12px;\n  right: 12px;\n  display: flex;\n  gap: 6px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n.position {\n  position: absolute;\n  bottom: 12px;\n  left: 0;\n  right: 0;\n  text-align: center;\n  font-size: 12px;\n  color: #203c31;\n}\n.notice {\n  position: absolute;\n  top: 45%;\n  left: 15%;\n  right: 15%;\n  background: #fff9e9;\n  padding: 18px;\n  border-radius: 10px;\n}\n@media (max-width: 600px) {\n  .workshop {\n    height: 580px;\n  }\n  .tag {\n    display: none;\n  }\n  .inspect {\n    right: 12px;\n  }\n  .inspect button {\n    flex: 1;\n  }\n  .navigation button {\n    padding: 9px;\n  }\n  .top {\n    gap: 5px;\n  }\n}\n/*# sourceMappingURL=spatial-inspection.component.css.map */\n"] }]
  }], () => [], { definition: [{ type: Input, args: [{ isSignal: true, alias: "definition", required: true }] }], leave: [{ type: Output, args: ["leave"] }], surface: [{ type: ViewChild, args: ["surface", { isSignal: true }] }], canvas: [{ type: ViewChild, args: ["canvas", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SpatialInspectionComponent, { className: "SpatialInspectionComponent", filePath: "src/app/shared/spatial-inspection/spatial-inspection.component.ts", lineNumber: 7 });
})();

// src/app/shared/panorama/spherical-view.component.ts
var _c03 = ["surface"];
var _c12 = ["canvas"];
var _forTrack04 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.targetId;
function SphericalViewComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function SphericalViewComponent_For_3_Template_button_click_0_listener() {
      const v_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.choose(v_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", ctx_r2.active().id === v_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(v_r2.title);
  }
}
function SphericalViewComponent_Conditional_10_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("pointerdown", function SphericalViewComponent_Conditional_10_For_1_Template_button_pointerdown_0_listener($event) {
      return $event.stopPropagation();
    })("keydown", function SphericalViewComponent_Conditional_10_For_1_Template_button_keydown_0_listener($event) {
      return $event.stopPropagation();
    })("click", function SphericalViewComponent_Conditional_10_For_1_Template_button_click_0_listener() {
      const place_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.choose(place_r5.targetId));
    });
    \u0275\u0275elementStart(1, "span", 23);
    \u0275\u0275text(2, "\u2197");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const place_r5 = ctx.$implicit;
    \u0275\u0275styleProp("left", place_r5.x, "%")("top", place_r5.y, "%");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", place_r5.label);
  }
}
function SphericalViewComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, SphericalViewComponent_Conditional_10_For_1_Template, 4, 5, "button", 21, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.placeMarkers());
  }
}
function SphericalViewComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Opening this viewpoint\u2026");
    \u0275\u0275elementEnd();
  }
}
function SphericalViewComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "p", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "img", 25);
    \u0275\u0275elementStart(4, "button", 26);
    \u0275\u0275listener("pointerdown", function SphericalViewComponent_Conditional_12_Template_button_pointerdown_4_listener($event) {
      return $event.stopPropagation();
    })("click", function SphericalViewComponent_Conditional_12_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.retry());
    });
    \u0275\u0275text(5, "Retry 360\xB0 image");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.error());
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r2.active().image, \u0275\u0275sanitizeUrl);
  }
}
function SphericalViewComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.fullscreenNotice());
  }
}
function SphericalViewComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-spatial-inspection", 27);
    \u0275\u0275listener("leave", function SphericalViewComponent_Conditional_33_Template_app_spatial_inspection_leave_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.choose(ctx_r2.active().places?.[0]?.targetId ?? ctx_r2.viewpoints()[0].id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("definition", ctx);
  }
}
var SphericalViewComponent = class _SphericalViewComponent {
  viewpoints = input.required(
    ...ngDevMode ? [{ debugName: "viewpoints" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saved = input(
    ...ngDevMode ? [void 0, { debugName: "saved" }] : (
      /* istanbul ignore next */
      []
    )
  );
  position = output();
  person = output();
  activeId = signal(
    "",
    ...ngDevMode ? [{ debugName: "activeId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  active = computed(
    () => this.viewpoints().find((v) => v.id === this.activeId()) ?? this.viewpoints()[0],
    ...ngDevMode ? [{ debugName: "active" }] : (
      /* istanbul ignore next */
      []
    )
  );
  yaw = signal(
    0,
    ...ngDevMode ? [{ debugName: "yaw" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pitch = signal(
    0,
    ...ngDevMode ? [{ debugName: "pitch" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fov = signal(
    75,
    ...ngDevMode ? [{ debugName: "fov" }] : (
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
  error = signal(
    "",
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  surface = viewChild(
    "surface",
    ...ngDevMode ? [{ debugName: "surface" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canvas = viewChild(
    "canvas",
    ...ngDevMode ? [{ debugName: "canvas" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fullscreenNotice = signal(
    "",
    ...ngDevMode ? [{ debugName: "fullscreenNotice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  placeMarkers = signal(
    [],
    ...ngDevMode ? [{ debugName: "placeMarkers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  api;
  renderer;
  camera;
  world;
  sphere;
  texture;
  observer;
  generation = 0;
  destroyed = false;
  drag;
  moved = false;
  constructor() {
    effect(() => {
      const active = this.active();
      if (this.renderer)
        void this.load(active);
    });
    afterNextRender(() => void this.setup());
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.generation++;
      this.observer?.disconnect();
      this.texture?.dispose();
      this.sphere?.geometry.dispose();
      this.sphere?.material.dispose();
      this.renderer?.dispose();
    });
  }
  async setup() {
    const saved = this.saved(), initial = this.viewpoints().find((v) => v.id === saved?.viewpointId) ?? this.active();
    this.activeId.set(initial.id);
    this.yaw.set(saved?.yaw ?? initial.yaw);
    this.pitch.set(saved?.pitch ?? initial.pitch);
    this.fov.set(saved?.fov ?? 75);
    try {
      const T = await import("./chunk-UO75LFSY.js");
      if (this.destroyed)
        return;
      this.api = T;
      this.renderer = new T.WebGLRenderer({ canvas: this.canvas().nativeElement, antialias: true });
      this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      this.camera = new T.PerspectiveCamera(this.fov(), 1, 0.1, 20);
      this.world = new T.Scene();
      const geometry = new T.SphereGeometry(10, 96, 64);
      geometry.scale(-1, 1, 1);
      this.sphere = new T.Mesh(geometry, new T.MeshBasicMaterial({ color: 16777215 }));
      this.world.add(this.sphere);
      this.observer = new ResizeObserver(() => this.resize());
      this.observer.observe(this.surface().nativeElement);
      this.resize();
      await this.load(initial);
    } catch {
      if (!this.destroyed) {
        this.error.set("360\xB0 viewing is unavailable in this browser. The full image is shown below; try a browser with WebGL enabled.");
        this.loading.set(false);
      }
    }
  }
  async load(view) {
    const generation = ++this.generation;
    this.loading.set(true);
    this.error.set("");
    if (view.inspection) {
      this.loading.set(false);
      return;
    }
    try {
      const texture = await new this.api.TextureLoader().loadAsync(view.image);
      if (this.destroyed || generation !== this.generation) {
        texture.dispose();
        return;
      }
      const image2 = texture.image;
      if (Math.abs(image2.width / image2.height - 2) > 0.02) {
        texture.dispose();
        throw new Error("Spherical image must have 2:1 ratio");
      }
      texture.colorSpace = this.api.SRGBColorSpace;
      this.texture?.dispose();
      this.texture = texture;
      this.sphere.material.map = texture;
      this.sphere.material.needsUpdate = true;
      this.loading.set(false);
      this.draw();
    } catch {
      if (!this.destroyed && generation === this.generation) {
        this.loading.set(false);
        this.error.set("This 360\xB0 image could not load. Choose another viewpoint or retry.");
      }
    }
  }
  retry() {
    if (this.renderer)
      void this.load(this.active());
  }
  resize() {
    const element = this.surface()?.nativeElement;
    if (!element || !element.clientWidth || !element.clientHeight || !this.renderer || !this.camera)
      return;
    this.renderer.setSize(element.clientWidth, element.clientHeight, false);
    this.camera.aspect = element.clientWidth / Math.max(1, element.clientHeight);
    this.draw();
  }
  draw() {
    if (!this.renderer || !this.world || !this.camera || !this.api || this.active().inspection)
      return;
    this.camera.fov = this.fov();
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(...viewDirection(this.yaw(), this.pitch()));
    this.camera.updateMatrixWorld();
    this.renderer.render(this.world, this.camera);
    const forward = this.camera.getWorldDirection(new this.api.Vector3());
    this.placeMarkers.set((this.active().places ?? []).flatMap((place) => {
      const point = new this.api.Vector3(...viewDirection(place.yaw, place.pitch));
      if (point.dot(forward) <= 0)
        return [];
      point.project(this.camera);
      if (Math.abs(point.x) > 0.88 || Math.abs(point.y) > 0.85)
        return [];
      return [{ targetId: place.targetId, label: place.label, x: (point.x + 1) * 50, y: (1 - point.y) * 50 }];
    }));
  }
  save() {
    this.position.emit({ viewpointId: this.active().id, yaw: this.yaw(), pitch: this.pitch(), fov: this.fov() });
  }
  choose(id) {
    const v = this.viewpoints().find((v2) => v2.id === id);
    if (!v)
      return;
    this.activeId.set(id);
    this.yaw.set(v.yaw);
    this.pitch.set(v.pitch);
    this.fov.set(75);
    this.draw();
    this.save();
  }
  look(horizontal, vertical = 0) {
    this.yaw.update((y) => wrapYaw(y + horizontal));
    this.pitch.update((p) => clampPitch(p + vertical));
    this.draw();
    this.save();
  }
  zoom(delta) {
    this.fov.update((v) => Math.max(35, Math.min(100, v + delta)));
    this.draw();
    this.save();
  }
  down(e) {
    if (!e.isPrimary || e.button !== 0 || this.loading() || this.error())
      return;
    e.preventDefault();
    this.surface()?.nativeElement.focus({ preventScroll: true });
    this.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, yaw: this.yaw(), pitch: this.pitch() };
    this.moved = false;
    this.surface()?.nativeElement.setPointerCapture(e.pointerId);
  }
  move(e) {
    if (!this.drag)
      return;
    const dx = e.clientX - this.drag.x, dy = e.clientY - this.drag.y;
    this.moved ||= Math.hypot(dx, dy) > 5;
    this.yaw.set(wrapYaw(this.drag.yaw - dx * 0.16));
    this.pitch.set(clampPitch(this.drag.pitch + dy * 0.16));
    this.draw();
  }
  up(e) {
    if (!this.drag || e.pointerId !== this.drag.id)
      return;
    this.surface()?.nativeElement.releasePointerCapture(e.pointerId);
    this.drag = void 0;
    this.save();
    if (!this.moved)
      this.pick(e);
  }
  cancel() {
    this.drag = void 0;
    this.save();
  }
  pick(e) {
    if (!this.api || !this.camera || !this.sphere)
      return;
    const box = this.surface().nativeElement.getBoundingClientRect(), ray = new this.api.Raycaster();
    ray.setFromCamera(new this.api.Vector2((e.clientX - box.left) / box.width * 2 - 1, 1 - (e.clientY - box.top) / box.height * 2), this.camera);
    const uv = ray.intersectObject(this.sphere)[0]?.uv;
    if (!uv)
      return;
    const x = uv.x * 100, y = (1 - uv.y) * 100;
    const match = this.active().people.find((p) => x >= p.rect.x && x <= p.rect.x + p.rect.width && y >= p.rect.y && y <= p.rect.y + p.rect.height);
    if (match)
      this.person.emit(match.personId);
  }
  key(e) {
    const changes = { ArrowLeft: [-15, 0], ArrowRight: [15, 0], ArrowUp: [0, 15], ArrowDown: [0, -15] };
    if (changes[e.key]) {
      e.preventDefault();
      e.stopPropagation();
      this.look(...changes[e.key]);
    } else if (e.key === "+" || e.key === "=" || e.key === "-") {
      e.preventDefault();
      this.zoom(e.key === "-" ? 10 : -10);
    }
  }
  async fullscreen() {
    this.fullscreenNotice.set("");
    try {
      if (document.fullscreenElement)
        await document.exitFullscreen();
      else
        await this.surface()?.nativeElement.requestFullscreen();
    } catch {
      this.fullscreenNotice.set("Fullscreen is unavailable. You can continue exploring in this window.");
    }
  }
  static \u0275fac = function SphericalViewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SphericalViewComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SphericalViewComponent, selectors: [["app-spherical-view"]], viewQuery: function SphericalViewComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.surface, _c03, 5)(ctx.canvas, _c12, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, inputs: { viewpoints: [1, "viewpoints"], saved: [1, "saved"] }, outputs: { position: "position", person: "person" }, decls: 34, vars: 13, consts: [["surface", ""], ["canvas", ""], [3, "hidden"], ["aria-label", "Scene viewpoints", 1, "viewpoints"], ["tabindex", "0", "role", "group", "aria-label", "360 degree scene. Drag or use arrow keys to look around; plus and minus to zoom.", 1, "sphere", 3, "pointerdown", "pointermove", "pointerup", "pointercancel", "keydown"], ["role", "img"], [1, "location"], ["role", "status", 1, "notice"], [1, "failure"], ["aria-label", "360 view controls", 1, "controls"], ["aria-label", "Look left", 3, "click"], ["aria-label", "Look right", 3, "click"], ["aria-label", "Look up", 3, "click"], ["aria-label", "Look down", 3, "click"], ["aria-label", "Zoom in", 3, "click", "disabled"], ["aria-label", "Zoom out", 3, "click", "disabled"], [3, "click"], [1, "hint"], ["role", "status"], ["aria-label", "Viewing direction", 1, "direction"], [3, "definition"], [1, "place-marker", 3, "left", "top"], [1, "place-marker", 3, "pointerdown", "keydown", "click"], ["aria-hidden", "true"], ["role", "alert"], ["alt", "Full equirectangular image, displayed flat", 3, "src"], [3, "pointerdown", "click"], [3, "leave", "definition"]], template: function SphericalViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "nav", 3);
      \u0275\u0275repeaterCreate(2, SphericalViewComponent_For_3_Template, 2, 2, "button", null, _forTrack04);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4, 0);
      \u0275\u0275listener("pointerdown", function SphericalViewComponent_Template_div_pointerdown_4_listener($event) {
        return ctx.down($event);
      })("pointermove", function SphericalViewComponent_Template_div_pointermove_4_listener($event) {
        return ctx.move($event);
      })("pointerup", function SphericalViewComponent_Template_div_pointerup_4_listener($event) {
        return ctx.up($event);
      })("pointercancel", function SphericalViewComponent_Template_div_pointercancel_4_listener() {
        return ctx.cancel();
      })("keydown", function SphericalViewComponent_Template_div_keydown_4_listener($event) {
        return ctx.key($event);
      });
      \u0275\u0275element(6, "canvas", 5, 1);
      \u0275\u0275elementStart(8, "span", 6);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, SphericalViewComponent_Conditional_10_Template, 2, 0);
      \u0275\u0275conditionalCreate(11, SphericalViewComponent_Conditional_11_Template, 2, 0, "p", 7);
      \u0275\u0275conditionalCreate(12, SphericalViewComponent_Conditional_12_Template, 6, 2, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 9)(14, "button", 10);
      \u0275\u0275listener("click", function SphericalViewComponent_Template_button_click_14_listener() {
        return ctx.look(-30);
      });
      \u0275\u0275text(15, "\u2190");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 11);
      \u0275\u0275listener("click", function SphericalViewComponent_Template_button_click_16_listener() {
        return ctx.look(30);
      });
      \u0275\u0275text(17, "\u2192");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 12);
      \u0275\u0275listener("click", function SphericalViewComponent_Template_button_click_18_listener() {
        return ctx.look(0, 30);
      });
      \u0275\u0275text(19, "\u2191");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "button", 13);
      \u0275\u0275listener("click", function SphericalViewComponent_Template_button_click_20_listener() {
        return ctx.look(0, -30);
      });
      \u0275\u0275text(21, "\u2193");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "button", 14);
      \u0275\u0275listener("click", function SphericalViewComponent_Template_button_click_22_listener() {
        return ctx.zoom(-10);
      });
      \u0275\u0275text(23, "\uFF0B");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "button", 15);
      \u0275\u0275listener("click", function SphericalViewComponent_Template_button_click_24_listener() {
        return ctx.zoom(10);
      });
      \u0275\u0275text(25, "\u2212");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "button", 16);
      \u0275\u0275listener("click", function SphericalViewComponent_Template_button_click_26_listener() {
        return ctx.fullscreen();
      });
      \u0275\u0275text(27, "Fullscreen");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "p", 17);
      \u0275\u0275text(29, "Drag to look around. Click a place marker inside the scene to move closer and explore a detailed panorama. Use the viewpoint buttons above as another way to travel. Interviews will be added later.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(30, SphericalViewComponent_Conditional_30_Template, 2, 1, "p", 18);
      \u0275\u0275elementStart(31, "output", 19);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(33, SphericalViewComponent_Conditional_33_Template, 1, 1, "app-spatial-inspection", 20);
    }
    if (rf & 2) {
      let tmp_13_0;
      \u0275\u0275property("hidden", !!ctx.active().inspection);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.viewpoints());
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-label", ctx.active().title + " spherical panorama");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", ctx.active().title, " \xB7 360\xB0");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && !ctx.error() ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 12 : -1);
      \u0275\u0275advance(10);
      \u0275\u0275property("disabled", ctx.fov() <= 35);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.fov() >= 100);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.fullscreenNotice() ? 30 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate3("Turn ", ctx.yaw().toFixed(0), "\xB0 \xB7 Tilt ", ctx.pitch().toFixed(0), "\xB0 \xB7 View ", ctx.fov().toFixed(0), "\xB0");
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_13_0 = ctx.active().inspection) ? 33 : -1, tmp_13_0);
    }
  }, dependencies: [SpatialInspectionComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.viewpoints[_ngcontent-%COMP%], \n.controls[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 12px 0;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  min-height: 44px;\n  padding: 9px 14px;\n  border: 1px solid #9aab9e;\n  border-radius: 8px;\n  background: #fffdf5;\n  color: #244237;\n  cursor: pointer;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #244c3c;\n  color: #fff8dd;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \n.sphere[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #b36917;\n  outline-offset: 3px;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n}\n.sphere[_ngcontent-%COMP%] {\n  position: relative;\n  height: clamp(320px, 40vw, 510px);\n  background: #21392f;\n  overflow: hidden;\n  border-radius: 10px;\n  touch-action: none;\n  cursor: grab;\n  scroll-margin-top: 140px;\n}\n.sphere[_ngcontent-%COMP%]:active {\n  cursor: grabbing;\n}\n.sphere[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n.location[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  left: 12px;\n  border-radius: 20px;\n  background: rgba(24, 61, 49, 0.8745098039);\n  color: #fff7d9;\n  padding: 8px 12px;\n  font-size: 12px;\n  pointer-events: none;\n}\n.notice[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 45%;\n  left: 25%;\n  background: #fff8df;\n  padding: 12px;\n  border-radius: 8px;\n}\n.failure[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: #f7f2e4;\n  padding: 14px;\n  overflow: auto;\n  cursor: default;\n}\n.failure[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.hint[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.6;\n}\n.direction[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: #526458;\n}\n.sphere[_ngcontent-%COMP%]:fullscreen {\n  height: 100vh;\n  width: 100vw;\n  border-radius: 0;\n}\n@media (max-width: 600px) {\n  .sphere[_ngcontent-%COMP%] {\n    height: 360px;\n    scroll-margin-top: 260px;\n  }\n  .controls[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 9px 12px;\n  }\n  .viewpoints[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n    font-size: 13px;\n  }\n}\n.place-marker[_ngcontent-%COMP%] {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  max-width: 180px;\n  background: rgba(255, 245, 221, 0.9215686275);\n  border: 2px solid #365d49;\n  box-shadow: 0 3px 14px rgba(16, 37, 30, 0.5019607843);\n  font-size: 13px;\n  text-align: center;\n  cursor: pointer;\n}\n.place-marker[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 20px;\n  margin-right: 4px;\n}\n.place-marker[_ngcontent-%COMP%]:hover {\n  background: #fff;\n  box-shadow: 0 3px 18px rgba(16, 37, 30, 0.6901960784);\n}\n/*# sourceMappingURL=spherical-view.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SphericalViewComponent, [{
    type: Component,
    args: [{ selector: "app-spherical-view", imports: [SpatialInspectionComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div [hidden]="!!active().inspection">\r
<nav class="viewpoints" aria-label="Scene viewpoints">@for (v of viewpoints(); track v.id) { <button [attr.aria-pressed]="active().id === v.id" (click)="choose(v.id)">{{ v.title }}</button> }</nav>
<div class="sphere" #surface tabindex="0" role="group" aria-label="360 degree scene. Drag or use arrow keys to look around; plus and minus to zoom." (pointerdown)="down($event)" (pointermove)="move($event)" (pointerup)="up($event)" (pointercancel)="cancel()" (keydown)="key($event)">
  <canvas #canvas [attr.aria-label]="active().title + ' spherical panorama'" role="img"></canvas>
  <span class="location">{{ active().title }} \xB7 360\xB0</span>
  @if (!loading() && !error()) {
    @for (place of placeMarkers(); track place.targetId) {
      <button class="place-marker" [style.left.%]="place.x" [style.top.%]="place.y" (pointerdown)="$event.stopPropagation()" (keydown)="$event.stopPropagation()" (click)="choose(place.targetId)"><span aria-hidden="true">\u2197</span> {{ place.label }}</button>
    }
  }
  @if (loading()) { <p class="notice" role="status">Opening this viewpoint\u2026</p> }
  @if (error()) { <div class="failure"><p role="alert">{{ error() }}</p><img [src]="active().image" alt="Full equirectangular image, displayed flat"><button (pointerdown)="$event.stopPropagation()" (click)="retry()">Retry 360\xB0 image</button></div> }
</div>
<div class="controls" aria-label="360 view controls"><button aria-label="Look left" (click)="look(-30)">\u2190</button><button aria-label="Look right" (click)="look(30)">\u2192</button><button aria-label="Look up" (click)="look(0,30)">\u2191</button><button aria-label="Look down" (click)="look(0,-30)">\u2193</button><button aria-label="Zoom in" [disabled]="fov() <= 35" (click)="zoom(-10)">\uFF0B</button><button aria-label="Zoom out" [disabled]="fov() >= 100" (click)="zoom(10)">\u2212</button><button (click)="fullscreen()">Fullscreen</button></div>
<p class="hint">Drag to look around. Click a place marker inside the scene to move closer and explore a detailed panorama. Use the viewpoint buttons above as another way to travel. Interviews will be added later.</p>
@if (fullscreenNotice()) { <p role="status">{{ fullscreenNotice() }}</p> }
<output class="direction" aria-label="Viewing direction">Turn {{ yaw().toFixed(0) }}\xB0 \xB7 Tilt {{ pitch().toFixed(0) }}\xB0 \xB7 View {{ fov().toFixed(0) }}\xB0</output>
\r
</div>\r
@if (active().inspection; as inspection) { <app-spatial-inspection [definition]="inspection" (leave)="choose(active().places?.[0]?.targetId ?? viewpoints()[0].id)" /> }\r
\r
`, styles: ["/* src/app/shared/panorama/spherical-view.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n}\n.viewpoints,\n.controls {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 12px 0;\n}\nbutton {\n  font: inherit;\n  min-height: 44px;\n  padding: 9px 14px;\n  border: 1px solid #9aab9e;\n  border-radius: 8px;\n  background: #fffdf5;\n  color: #244237;\n  cursor: pointer;\n}\nbutton[aria-pressed=true] {\n  background: #244c3c;\n  color: #fff8dd;\n}\nbutton:focus-visible,\n.sphere:focus-visible {\n  outline: 3px solid #b36917;\n  outline-offset: 3px;\n}\nbutton:disabled {\n  opacity: 0.5;\n}\n.sphere {\n  position: relative;\n  height: clamp(320px, 40vw, 510px);\n  background: #21392f;\n  overflow: hidden;\n  border-radius: 10px;\n  touch-action: none;\n  cursor: grab;\n  scroll-margin-top: 140px;\n}\n.sphere:active {\n  cursor: grabbing;\n}\n.sphere canvas {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n.location {\n  position: absolute;\n  top: 12px;\n  left: 12px;\n  border-radius: 20px;\n  background: rgba(24, 61, 49, 0.8745098039);\n  color: #fff7d9;\n  padding: 8px 12px;\n  font-size: 12px;\n  pointer-events: none;\n}\n.notice {\n  position: absolute;\n  top: 45%;\n  left: 25%;\n  background: #fff8df;\n  padding: 12px;\n  border-radius: 8px;\n}\n.failure {\n  position: absolute;\n  inset: 0;\n  background: #f7f2e4;\n  padding: 14px;\n  overflow: auto;\n  cursor: default;\n}\n.failure img {\n  display: block;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.hint {\n  font-size: 13px;\n  line-height: 1.6;\n}\n.direction {\n  display: block;\n  font-size: 11px;\n  color: #526458;\n}\n.sphere:fullscreen {\n  height: 100vh;\n  width: 100vw;\n  border-radius: 0;\n}\n@media (max-width: 600px) {\n  .sphere {\n    height: 360px;\n    scroll-margin-top: 260px;\n  }\n  .controls {\n    gap: 6px;\n  }\n  .controls button {\n    padding: 9px 12px;\n  }\n  .viewpoints button {\n    flex: 1;\n    font-size: 13px;\n  }\n}\n.place-marker {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  max-width: 180px;\n  background: rgba(255, 245, 221, 0.9215686275);\n  border: 2px solid #365d49;\n  box-shadow: 0 3px 14px rgba(16, 37, 30, 0.5019607843);\n  font-size: 13px;\n  text-align: center;\n  cursor: pointer;\n}\n.place-marker span {\n  display: inline-block;\n  font-size: 20px;\n  margin-right: 4px;\n}\n.place-marker:hover {\n  background: #fff;\n  box-shadow: 0 3px 18px rgba(16, 37, 30, 0.6901960784);\n}\n/*# sourceMappingURL=spherical-view.component.css.map */\n"] }]
  }], () => [], { viewpoints: [{ type: Input, args: [{ isSignal: true, alias: "viewpoints", required: true }] }], saved: [{ type: Input, args: [{ isSignal: true, alias: "saved", required: false }] }], position: [{ type: Output, args: ["position"] }], person: [{ type: Output, args: ["person"] }], surface: [{ type: ViewChild, args: ["surface", { isSignal: true }] }], canvas: [{ type: ViewChild, args: ["canvas", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SphericalViewComponent, { className: "SphericalViewComponent", filePath: "src/app/shared/panorama/spherical-view.component.ts", lineNumber: 13 });
})();

// src/app/shared/panorama/interview-screens.component.ts
var _c04 = ["dialog"];
var _c13 = ["player"];
var _forTrack05 = ($index, $item) => $item.id;
function InterviewScreensComponent_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 5);
    \u0275\u0275domListener("click", function InterviewScreensComponent_Conditional_0_For_2_Template_button_click_0_listener($event) {
      const interview_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.open(interview_r3, $event));
    });
    \u0275\u0275domElement(1, "img", 6);
    \u0275\u0275domElementStart(2, "span", 7);
    \u0275\u0275text(3, "\u25B7");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span", 8);
    \u0275\u0275text(5);
    \u0275\u0275domElementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const interview_r3 = ctx.$implicit;
    \u0275\u0275domProperty("disabled", !interview_r3.video);
    \u0275\u0275attribute("aria-label", interview_r3.title + (interview_r3.video ? " \u2014 play interview" : " \u2014 video pending"));
    \u0275\u0275advance();
    \u0275\u0275domProperty("src", interview_r3.poster, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(interview_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(interview_r3.video ? "Play interview" : "Video pending");
  }
}
function InterviewScreensComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "nav", 2);
    \u0275\u0275repeaterCreate(1, InterviewScreensComponent_Conditional_0_For_2_Template, 8, 5, "button", 4, _forTrack05);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.interviews());
  }
}
function InterviewScreensComponent_Conditional_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "video", 12, 1);
    \u0275\u0275domListener("error", function InterviewScreensComponent_Conditional_3_Conditional_5_Template_video_error_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.failed.set(true));
    });
    \u0275\u0275domElement(2, "track", 13);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const video_r7 = ctx;
    const interview_r8 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("poster", interview_r8.poster)("src", video_r7.src, \u0275\u0275sanitizeUrl);
    \u0275\u0275attribute("aria-label", interview_r8.title + " interview");
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("src", video_r7.captions);
  }
}
function InterviewScreensComponent_Conditional_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 11);
    \u0275\u0275text(1, "This interview could not load. Return to the scene and try again.");
    \u0275\u0275domElementEnd();
  }
}
function InterviewScreensComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "header")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "button", 9);
    \u0275\u0275domListener("click", function InterviewScreensComponent_Conditional_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.close());
    });
    \u0275\u0275text(4, "\u2190 Return to scene");
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(5, InterviewScreensComponent_Conditional_3_Conditional_5_Template, 3, 4, "video", 10);
    \u0275\u0275conditionalCreate(6, InterviewScreensComponent_Conditional_3_Conditional_6_Template, 2, 0, "p", 11);
  }
  if (rf & 2) {
    let tmp_4_0;
    const interview_r8 = ctx;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(interview_r8.title);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_4_0 = interview_r8.video) ? 5 : -1, tmp_4_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.failed() ? 6 : -1);
  }
}
var InterviewScreensComponent = class _InterviewScreensComponent {
  interviews = input(
    [],
    ...ngDevMode ? [{ debugName: "interviews" }] : (
      /* istanbul ignore next */
      []
    )
  );
  active = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "active" }] : (
      /* istanbul ignore next */
      []
    )
  );
  failed = signal(
    false,
    ...ngDevMode ? [{ debugName: "failed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dialog = viewChild(
    "dialog",
    ...ngDevMode ? [{ debugName: "dialog" }] : (
      /* istanbul ignore next */
      []
    )
  );
  player = viewChild(
    "player",
    ...ngDevMode ? [{ debugName: "player" }] : (
      /* istanbul ignore next */
      []
    )
  );
  trigger;
  open(interview, event) {
    if (!interview.video)
      return;
    this.player()?.nativeElement.pause();
    this.trigger = event.currentTarget;
    this.failed.set(false);
    this.active.set(interview);
    this.dialog()?.nativeElement.showModal();
  }
  close() {
    this.player()?.nativeElement.pause();
    this.dialog()?.nativeElement.close();
    this.active.set(void 0);
    this.trigger?.focus();
  }
  static \u0275fac = function InterviewScreensComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InterviewScreensComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InterviewScreensComponent, selectors: [["app-interview-screens"]], viewQuery: function InterviewScreensComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.dialog, _c04, 5)(ctx.player, _c13, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, inputs: { interviews: [1, "interviews"] }, decls: 4, vars: 2, consts: [["dialog", ""], ["player", ""], ["aria-label", "Video interviews", 1, "screens"], ["aria-label", "Interview video", 3, "cancel"], [1, "screen", 3, "disabled"], [1, "screen", 3, "click", "disabled"], ["alt", "", 3, "src"], ["aria-hidden", "true", 1, "play"], [1, "label"], ["autofocus", "", 3, "click"], ["controls", "", "autoplay", "", "playsinline", "", 3, "poster", "src"], ["role", "alert"], ["controls", "", "autoplay", "", "playsinline", "", 3, "error", "poster", "src"], ["kind", "captions", "srclang", "en", "label", "English", "default", "", 3, "src"]], template: function InterviewScreensComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275conditionalCreate(0, InterviewScreensComponent_Conditional_0_Template, 3, 0, "nav", 2);
      \u0275\u0275domElementStart(1, "dialog", 3, 0);
      \u0275\u0275domListener("cancel", function InterviewScreensComponent_Template_dialog_cancel_1_listener($event) {
        \u0275\u0275restoreView(_r1);
        $event.preventDefault();
        return \u0275\u0275resetView(ctx.close());
      });
      \u0275\u0275conditionalCreate(3, InterviewScreensComponent_Conditional_3_Template, 7, 3);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275conditional(ctx.interviews().length ? 0 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_2_0 = ctx.active()) ? 3 : -1, tmp_2_0);
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  z-index: 5;\n}\n.screens[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: var(--%NS%interview-bottom, 12px);\n  right: 12px;\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 8px;\n  width: min(510px, 100% - 24px);\n  pointer-events: auto;\n}\n.screen[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  min-height: 100px;\n  padding: 0;\n  border: 1px solid #e8d8ac;\n  border-radius: 9px;\n  background: #193e31;\n  color: #fff8e5;\n  text-align: left;\n  cursor: pointer;\n}\n.screen[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  opacity: 0.65;\n}\n.screen[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(transparent, rgba(16, 44, 37, 0.9490196078));\n}\n.screen[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n}\n.play[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  left: 10px;\n  font-size: 24px;\n  z-index: 1;\n}\n.label[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-top: 43px;\n  padding: 7px 9px;\n  font-size: 13px;\n  font-weight: 700;\n}\n.label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  font-weight: 400;\n  margin-top: 3px;\n  color: #efe2bf;\n}\n.screen[_ngcontent-%COMP%]:focus-visible, \nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #ffc967;\n  outline-offset: -3px;\n}\ndialog[_ngcontent-%COMP%] {\n  pointer-events: auto;\n  width: min(900px, 92vw);\n  max-height: 90vh;\n  overflow: auto;\n  padding: 0;\n  border: 1px solid #c7b080;\n  border-radius: 12px;\n  background: #112c24;\n  color: #fff8e5;\n}\ndialog[_ngcontent-%COMP%]::backdrop {\n  background: rgba(7, 26, 20, 0.8078431373);\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n}\nheader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 8px 12px;\n  border: 1px solid #b5c0ac;\n  border-radius: 7px;\n  background: #fff8e5;\n  color: #193e31;\n  cursor: pointer;\n}\nvideo[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-height: 72vh;\n}\np[_ngcontent-%COMP%] {\n  padding: 12px;\n}\n@media (max-width: 600px) {\n  .screens[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  .screen[_ngcontent-%COMP%] {\n    min-height: 85px;\n  }\n  .label[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 6px;\n    margin-top: 30px;\n  }\n  .label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n}\n/*# sourceMappingURL=interview-screens.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InterviewScreensComponent, [{
    type: Component,
    args: [{ selector: "app-interview-screens", changeDetection: ChangeDetectionStrategy.OnPush, template: `@if (interviews().length) {
  <nav class="screens" aria-label="Video interviews">
    @for (interview of interviews(); track interview.id) {
      <button class="screen" [disabled]="!interview.video" [attr.aria-label]="interview.title + (interview.video ? ' \u2014 play interview' : ' \u2014 video pending')" (click)="open(interview, $event)">
        <img [src]="interview.poster" alt="">
        <span class="play" aria-hidden="true">\u25B7</span>
        <span class="label">{{ interview.title }}<small>{{ interview.video ? 'Play interview' : 'Video pending' }}</small></span>
      </button>
    }
  </nav>
}
<dialog #dialog aria-label="Interview video" (cancel)="$event.preventDefault(); close()">
  @if (active(); as interview) {
    <header><strong>{{ interview.title }}</strong><button (click)="close()" autofocus>\u2190 Return to scene</button></header>
    @if (interview.video; as video) {
      <video #player controls autoplay playsinline [poster]="interview.poster" [src]="video.src" [attr.aria-label]="interview.title + ' interview'" (error)="failed.set(true)">
        <track kind="captions" srclang="en" label="English" [src]="video.captions" default>
      </video>
    }
    @if (failed()) { <p role="alert">This interview could not load. Return to the scene and try again.</p> }
  }
</dialog>
`, styles: ['/* src/app/shared/panorama/interview-screens.component.scss */\n:host {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  z-index: 5;\n}\n.screens {\n  position: absolute;\n  bottom: var(--interview-bottom, 12px);\n  right: 12px;\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 8px;\n  width: min(510px, 100% - 24px);\n  pointer-events: auto;\n}\n.screen {\n  position: relative;\n  overflow: hidden;\n  min-height: 100px;\n  padding: 0;\n  border: 1px solid #e8d8ac;\n  border-radius: 9px;\n  background: #193e31;\n  color: #fff8e5;\n  text-align: left;\n  cursor: pointer;\n}\n.screen img {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  opacity: 0.65;\n}\n.screen::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(transparent, rgba(16, 44, 37, 0.9490196078));\n}\n.screen:disabled {\n  cursor: default;\n}\n.play {\n  position: absolute;\n  top: 8px;\n  left: 10px;\n  font-size: 24px;\n  z-index: 1;\n}\n.label {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-top: 43px;\n  padding: 7px 9px;\n  font-size: 13px;\n  font-weight: 700;\n}\n.label small {\n  display: block;\n  font-size: 11px;\n  font-weight: 400;\n  margin-top: 3px;\n  color: #efe2bf;\n}\n.screen:focus-visible,\nbutton:focus-visible {\n  outline: 3px solid #ffc967;\n  outline-offset: -3px;\n}\ndialog {\n  pointer-events: auto;\n  width: min(900px, 92vw);\n  max-height: 90vh;\n  overflow: auto;\n  padding: 0;\n  border: 1px solid #c7b080;\n  border-radius: 12px;\n  background: #112c24;\n  color: #fff8e5;\n}\ndialog::backdrop {\n  background: rgba(7, 26, 20, 0.8078431373);\n}\nheader {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n}\nheader button {\n  min-height: 44px;\n  padding: 8px 12px;\n  border: 1px solid #b5c0ac;\n  border-radius: 7px;\n  background: #fff8e5;\n  color: #193e31;\n  cursor: pointer;\n}\nvideo {\n  display: block;\n  width: 100%;\n  max-height: 72vh;\n}\np {\n  padding: 12px;\n}\n@media (max-width: 600px) {\n  .screens {\n    gap: 5px;\n  }\n  .screen {\n    min-height: 85px;\n  }\n  .label {\n    font-size: 11px;\n    padding: 6px;\n    margin-top: 30px;\n  }\n  .label small {\n    font-size: 10px;\n  }\n}\n/*# sourceMappingURL=interview-screens.component.css.map */\n'] }]
  }], null, { interviews: [{ type: Input, args: [{ isSignal: true, alias: "interviews", required: false }] }], dialog: [{ type: ViewChild, args: ["dialog", { isSignal: true }] }], player: [{ type: ViewChild, args: ["player", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InterviewScreensComponent, { className: "InterviewScreensComponent", filePath: "src/app/shared/panorama/interview-screens.component.ts", lineNumber: 16 });
})();

// src/app/shared/panorama/panorama-encounter.component.ts
var _c05 = ["view"];
var _c14 = ["messages"];
var _c2 = ["sourceDialog"];
var _c3 = () => [];
var _forTrack06 = ($index, $item) => $item.id;
function PanoramaEncounterComponent_Conditional_13_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-interview-screens", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("interviews", ctx_r1.scene().interviews ?? \u0275\u0275pureFunction0(1, _c3));
  }
}
function PanoramaEncounterComponent_Conditional_13_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_13_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.enter());
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Enter the painting ");
    \u0275\u0275elementStart(3, "b");
    \u0275\u0275text(4, "\u2197");
    \u0275\u0275elementEnd()()();
  }
}
function PanoramaEncounterComponent_Conditional_13_Conditional_6_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_13_Conditional_6_For_1_Template_button_click_0_listener() {
      const r_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.repairId.set(r_r5.id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r5 = ctx.$implicit;
    \u0275\u0275styleProp("left", r_r5.rect.x, "%")("top", r_r5.rect.y, "%")("width", r_r5.rect.width, "%")("height", r_r5.rect.height, "%");
    \u0275\u0275attribute("aria-label", "Inspect " + r_r5.title);
  }
}
function PanoramaEncounterComponent_Conditional_13_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, PanoramaEncounterComponent_Conditional_13_Conditional_6_For_1_Template, 1, 9, "button", 22, _forTrack06);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.scene().repairs);
  }
}
function PanoramaEncounterComponent_Conditional_13_Conditional_16_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_13_Conditional_16_For_2_Template_button_click_0_listener() {
      const r_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.repairId.set(r_r7.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("aria-pressed", ctx_r1.repairId() === r_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r7.title);
  }
}
function PanoramaEncounterComponent_Conditional_13_Conditional_16_Conditional_3_For_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_13_Conditional_16_Conditional_3_For_16_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const id_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.inspectSource(id_r11));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.sourceTitle(id_r11));
  }
}
function PanoramaEncounterComponent_Conditional_13_Conditional_16_Conditional_3_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PanoramaEncounterComponent_Conditional_13_Conditional_16_Conditional_3_For_16_Conditional_0_Template, 2, 1, "button");
  }
  if (rf & 2) {
    const id_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275conditional(ctx_r1.state().collected.includes(id_r11) ? 0 : -1);
  }
}
function PanoramaEncounterComponent_Conditional_13_Conditional_16_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 25)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Compare this detail with what you learned. You can keep it or try a reconstruction.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 26);
    \u0275\u0275element(6, "img", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 17)(8, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_13_Conditional_16_Conditional_3_Template_button_click_8_listener() {
      const r_r9 = \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.action.emit({ type: "repair", repairId: r_r9.id, applied: false });
      return \u0275\u0275resetView(ctx_r1.original.set(false));
    });
    \u0275\u0275text(9, "Keep original detail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_13_Conditional_16_Conditional_3_Template_button_click_10_listener() {
      const r_r9 = \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.action.emit({ type: "repair", repairId: r_r9.id, applied: true });
      return \u0275\u0275resetView(ctx_r1.original.set(false));
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "p", 19);
    \u0275\u0275text(13, "Evidence saved for this detail:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 28);
    \u0275\u0275repeaterCreate(15, PanoramaEncounterComponent_Conditional_13_Conditional_16_Conditional_3_For_16_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(17, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_13_Conditional_16_Conditional_3_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.notebook.set(true));
    });
    \u0275\u0275text(18, "Open research notebook");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r9 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r9.title);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("aspect-ratio", r_r9.rect.width * 3 / r_r9.rect.height);
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", 1e4 / r_r9.rect.width, "%")("left", -r_r9.rect.x * 100 / r_r9.rect.width, "%")("top", -r_r9.rect.y * 100 / r_r9.rect.height, "%");
    \u0275\u0275property("src", ctx_r1.scene().forgery, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", !ctx_r1.state().repairs[r_r9.id]);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", !!ctx_r1.state().repairs[r_r9.id]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r9.action);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(r_r9.sourceIds);
  }
}
function PanoramaEncounterComponent_Conditional_13_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, PanoramaEncounterComponent_Conditional_13_Conditional_16_For_2_Template, 2, 2, "button", null, _forTrack06);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, PanoramaEncounterComponent_Conditional_13_Conditional_16_Conditional_3_Template, 19, 13, "section", 25);
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.scene().repairs);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_4_0 = ctx_r1.repair()) ? 3 : -1, tmp_4_0);
  }
}
function PanoramaEncounterComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 13);
    \u0275\u0275element(3, "app-panorama-painting", 14);
    \u0275\u0275conditionalCreate(4, PanoramaEncounterComponent_Conditional_13_Conditional_4_Template, 1, 2, "app-interview-screens", 15);
    \u0275\u0275conditionalCreate(5, PanoramaEncounterComponent_Conditional_13_Conditional_5_Template, 5, 0, "button", 16)(6, PanoramaEncounterComponent_Conditional_13_Conditional_6_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 17)(8, "button", 18);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_13_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.enter());
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_13_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.repairMode.set(!ctx_r1.repairMode());
      return \u0275\u0275resetView(ctx_r1.repairId.set(""));
    });
    \u0275\u0275text(11, "Inspect painting details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_13_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.original.set(!ctx_r1.original()));
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p", 19);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, PanoramaEncounterComponent_Conditional_13_Conditional_16_Template, 4, 1);
    \u0275\u0275elementStart(17, "div", 17)(18, "button", 20);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_13_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.action.emit({ type: "undo" });
      return \u0275\u0275resetView(ctx_r1.original.set(false));
    });
    \u0275\u0275text(19, "Undo last change");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_13_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.download());
    });
    \u0275\u0275text(21, "Download restored picture");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.scene().invitation);
    \u0275\u0275advance(2);
    \u0275\u0275property("scene", ctx_r1.scene())("state", ctx_r1.state())("original", ctx_r1.original());
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.repairMode() ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.repairMode() ? 5 : 6);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.state().visited.length ? "Re-enter historical world" : "Explore historical world");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", ctx_r1.repairMode());
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.original());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.original() ? "Show my restoration" : "Show original painting");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", ctx_r1.repairCount(), " of ", ctx_r1.scene().repairs.length, " changes applied \xB7 ", ctx_r1.original() ? "Viewing the original painting" : "Viewing your current draft", ". Compare observations with sources; absence from a scene is not proof.");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.repairMode() ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.state().undo.length);
  }
}
function PanoramaEncounterComponent_Conditional_14_Conditional_0_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_14_Conditional_0_For_12_Template_button_click_0_listener() {
      const p_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectSphericalPerson(p_r14.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r14 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", p_r14.name, " \xB7 ", p_r14.activity);
  }
}
function PanoramaEncounterComponent_Conditional_14_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "app-spherical-view", 30);
    \u0275\u0275listener("position", function PanoramaEncounterComponent_Conditional_14_Conditional_0_Template_app_spherical_view_position_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.action.emit({ type: "spherical-view", view: $event }));
    })("person", function PanoramaEncounterComponent_Conditional_14_Conditional_0_Template_app_spherical_view_person_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectSphericalPerson($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(2, "app-interview-screens", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17)(4, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_14_Conditional_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.leave());
    });
    \u0275\u0275text(5, "Return to painting");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_14_Conditional_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.tutorRequested.emit());
    });
    \u0275\u0275text(7, "Open AI box");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "details", 31)(9, "summary");
    \u0275\u0275text(10, "People in this scene \xB7 keyboard navigation");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(11, PanoramaEncounterComponent_Conditional_14_Conditional_0_For_12_Template, 2, 2, "button", null, _forTrack06);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("viewpoints", ctx)("saved", ctx_r1.state().sphericalView);
    \u0275\u0275advance();
    \u0275\u0275property("interviews", ctx_r1.scene().interviews ?? \u0275\u0275pureFunction0(3, _c3));
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.scene().people);
  }
}
function PanoramaEncounterComponent_Conditional_14_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_14_Conditional_1_For_4_Template_button_click_0_listener() {
      const p_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.approach(p_r17));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r17 = ctx.$implicit;
    \u0275\u0275styleProp("left", p_r17.rect.x, "%")("top", p_r17.rect.y, "%")("width", p_r17.rect.width, "%")("height", p_r17.rect.height, "%");
    \u0275\u0275attribute("aria-label", "Approach " + p_r17.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r17.name);
  }
}
function PanoramaEncounterComponent_Conditional_14_Conditional_1_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_14_Conditional_1_For_23_Template_button_click_0_listener() {
      const p_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.approach(p_r19));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r19 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", p_r19.name, " \xB7 ", p_r19.activity);
  }
}
function PanoramaEncounterComponent_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275listener("pointerdown", function PanoramaEncounterComponent_Conditional_14_Conditional_1_Template_div_pointerdown_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pointerDown($event));
    })("pointermove", function PanoramaEncounterComponent_Conditional_14_Conditional_1_Template_div_pointermove_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pointerMove($event));
    })("pointerup", function PanoramaEncounterComponent_Conditional_14_Conditional_1_Template_div_pointerup_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pointerEnd());
    })("pointerleave", function PanoramaEncounterComponent_Conditional_14_Conditional_1_Template_div_pointerleave_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pointerEnd());
    })("pointercancel", function PanoramaEncounterComponent_Conditional_14_Conditional_1_Template_div_pointercancel_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pointerEnd());
    });
    \u0275\u0275elementStart(1, "div", 33);
    \u0275\u0275element(2, "img", 34);
    \u0275\u0275repeaterCreate(3, PanoramaEncounterComponent_Conditional_14_Conditional_1_For_4_Template, 3, 10, "button", 35, _forTrack06);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 36);
    \u0275\u0275text(6, "INSIDE THE HISTORICAL WORLD");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 37)(8, "button", 38);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_14_Conditional_1_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.pan(-15);
      return \u0275\u0275resetView(ctx_r1.saveHeading());
    });
    \u0275\u0275text(9, "\u2190");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "label");
    \u0275\u0275text(11, "Look around");
    \u0275\u0275elementStart(12, "input", 39);
    \u0275\u0275listener("input", function PanoramaEncounterComponent_Conditional_14_Conditional_1_Template_input_input_12_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.heading.set(+$event.target.value));
    })("change", function PanoramaEncounterComponent_Conditional_14_Conditional_1_Template_input_change_12_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveHeading());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 40);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_14_Conditional_1_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.pan(15);
      return \u0275\u0275resetView(ctx_r1.saveHeading());
    });
    \u0275\u0275text(14, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_14_Conditional_1_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.leave());
    });
    \u0275\u0275text(16, "Return to painting");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "p", 19);
    \u0275\u0275text(18, "Drag to look around, or use arrow keys. Click a person to approach. This world contains none of the painting\u2019s forged details.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "details", 31)(20, "summary");
    \u0275\u0275text(21, "People in this scene \xB7 keyboard navigation");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(22, PanoramaEncounterComponent_Conditional_14_Conditional_1_For_23_Template, 2, 2, "button", null, _forTrack06);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275styleProp("left", ctx_r1.heading(), "%")("transform", "translateX(-" + ctx_r1.heading() + "%)");
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.scene().panorama, \u0275\u0275sanitizeUrl)("alt", ctx_r1.scene().imageAlt);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.scene().people);
    \u0275\u0275advance(9);
    \u0275\u0275property("value", ctx_r1.heading());
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r1.scene().people);
  }
}
function PanoramaEncounterComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PanoramaEncounterComponent_Conditional_14_Conditional_0_Template, 13, 4)(1, PanoramaEncounterComponent_Conditional_14_Conditional_1_Template, 24, 7);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_2_0 = ctx_r1.scene().viewpoints) ? 0 : 1, tmp_2_0);
  }
}
function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "video", 47);
    \u0275\u0275listener("ended", function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_10_Template_video_ended_0_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.talk());
    })("error", function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_10_Template_video_error_0_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.videoFailed.set(true));
    });
    \u0275\u0275element(1, "source", 48)(2, "track", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "details")(4, "summary");
    \u0275\u0275text(5, "Video transcript");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r22 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("poster", ctx_r1.scene().panorama);
    \u0275\u0275advance();
    \u0275\u0275property("src", p_r22.approach.src);
    \u0275\u0275advance();
    \u0275\u0275property("src", p_r22.approach.captions);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r22.approach.transcript);
  }
}
function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 50);
  }
  if (rf & 2) {
    const p_r22 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("background-image", "url(" + ctx_r1.scene().panorama + ")")("background-position", p_r22.rect.x + p_r22.rect.width / 2 + "% center");
    \u0275\u0275classProp("approaching", ctx_r1.mode() === "approach");
    \u0275\u0275attribute("aria-label", p_r22.name + ": " + p_r22.activity);
  }
}
function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_12_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Camera-move preview \xB7 character video ", ctx_r1.videoFailed() ? "could not load" : "pending", ".");
  }
}
function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_12_Conditional_0_Template, 2, 1, "p", 51);
    \u0275\u0275elementStart(1, "p", 52);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 18);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_12_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.talk());
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r22 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!p_r22.approach || ctx_r1.videoFailed() ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u201C", p_r22.welcome, "\u201D");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r22.approach ? "Continue to conversation" : "Begin scripted conversation");
  }
}
function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r22 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", p_r22.activity, " \xB7 Fictional character, historical dramatization.");
  }
}
function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_14_For_8_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_14_For_8_For_7_Template_button_click_0_listener() {
      const id_r26 = \u0275\u0275restoreView(_r25).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.inspectSource(id_r26));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r26 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.sourceTitle(id_r26), " \u2197");
  }
}
function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_14_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 28);
    \u0275\u0275repeaterCreate(6, PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_14_For_8_For_7_Template, 2, 1, "button", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r27 = ctx.$implicit;
    const p_r22 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("student-message", m_r27.role === "student")("character-message", m_r27.role === "character");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r27.role === "student" ? "You" : p_r22.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r27.text);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(m_r27.sourceIds);
  }
}
function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_14_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_14_For_18_Template_button_click_0_listener() {
      const topic_r29 = \u0275\u0275restoreView(_r28).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.ask(topic_r29.question));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const topic_r29 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r1.busy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(topic_r29.question);
  }
}
function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 46)(1, "p", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 54, 1)(5, "p", 55);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_14_For_8_Template, 8, 6, "article", 56, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 57)(10, "label", 58);
    \u0275\u0275text(11, "Ask about their work");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "input", 59);
    \u0275\u0275listener("input", function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_14_Template_input_input_13_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.question.set($event.target.value));
    })("keydown.enter", function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_14_Template_input_keydown_enter_13_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.ask());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 20);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_14_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.ask());
    });
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 60);
    \u0275\u0275repeaterCreate(17, PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_14_For_18_Template, 2, 2, "button", 61, _forTrack06);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r22 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.adapter.mode === "ai" ? "AI character interview" : "Scripted interview preview \xB7 AI disconnected");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r22.welcome);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.conversation());
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r1.question())("placeholder", p_r22.topics[0].question);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.busy() || !ctx_r1.question().trim());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.busy() ? "Waiting\u2026" : "Ask");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(p_r22.topics);
  }
}
function PanoramaEncounterComponent_Conditional_15_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "div")(2, "span", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_15_Conditional_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.returnToScene());
    });
    \u0275\u0275text(7, "\u2190 Return to scene");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 43)(9, "div", 44);
    \u0275\u0275conditionalCreate(10, PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_10_Template, 8, 4)(11, PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_11_Template, 1, 7, "div", 45);
    \u0275\u0275conditionalCreate(12, PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_12_Template, 5, 3)(13, PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_13_Template, 2, 1, "p", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, PanoramaEncounterComponent_Conditional_15_Conditional_0_Conditional_14_Template, 19, 6, "section", 46);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r22 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.mode() === "approach" ? "APPROACHING" : "IN CONVERSATION");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r22.name);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("talking", ctx_r1.mode() === "interview");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.mode() === "approach" && p_r22.approach && !ctx_r1.videoFailed() ? 10 : 11);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.mode() === "approach" ? 12 : 13);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.mode() === "interview" && ctx_r1.scene().questionOwner !== "tutor" ? 14 : -1);
  }
}
function PanoramaEncounterComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PanoramaEncounterComponent_Conditional_15_Conditional_0_Template, 15, 7);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_2_0 = ctx_r1.person()) ? 0 : -1, tmp_2_0);
  }
}
function PanoramaEncounterComponent_Conditional_16_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275element(0, "div", 64);
    \u0275\u0275elementStart(1, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_16_Conditional_7_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sourceZoom.set(!ctx_r1.sourceZoom()));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r32 = ctx;
    const s_r33 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background-image", "url(" + ctx_r1.scene().panorama + ")")("background-position", r_r32.x + r_r32.width / 2 + "% " + (r_r32.y + r_r32.height / 2) + "%");
    \u0275\u0275classProp("zoomed", ctx_r1.sourceZoom());
    \u0275\u0275attribute("aria-label", s_r33.title + " in the teaching reconstruction");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", ctx_r1.sourceZoom());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.sourceZoom() ? "Zoom out" : "Examine closer");
  }
}
function PanoramaEncounterComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "dialog", 62, 2);
    \u0275\u0275listener("cancel", function PanoramaEncounterComponent_Conditional_16_Template_dialog_cancel_0_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSource());
    });
    \u0275\u0275elementStart(2, "div", 42)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_16_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSource());
    });
    \u0275\u0275text(6, "Close source");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, PanoramaEncounterComponent_Conditional_16_Conditional_7_Template, 3, 9);
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 19);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 17)(13, "a", 63);
    \u0275\u0275text(14, "Open historical source \u2197");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_16_Template_button_click_15_listener() {
      const s_r33 = \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.action.emit({ type: "collect", sourceId: s_r33.id }));
    });
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const s_r33 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(s_r33.title);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_5_0 = s_r33.rect) ? 7 : -1, tmp_5_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r33.text);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r33.provenance);
    \u0275\u0275advance(2);
    \u0275\u0275property("href", s_r33.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.state().collected.includes(s_r33.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.state().collected.includes(s_r33.id) ? "Remove from notebook" : "Save to field notebook");
  }
}
function PanoramaEncounterComponent_Conditional_17_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_17_For_10_Template_button_click_0_listener() {
      const s_r36 = \u0275\u0275restoreView(_r35).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.inspectSource(s_r36.id);
      return \u0275\u0275resetView(ctx_r1.notebook.set(false));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r36 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", s_r36.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.state().collected.includes(s_r36.id) ? "Saved" : "Open source");
  }
}
function PanoramaEncounterComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 9)(1, "div", 42)(2, "h3");
    \u0275\u0275text(3, "Field notebook");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_17_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.notebook.set(false));
    });
    \u0275\u0275text(5, "Close notebook");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Sources describe what historians can support. Character conversations are dramatizations. You can consult every source directly.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 65);
    \u0275\u0275repeaterCreate(9, PanoramaEncounterComponent_Conditional_17_For_10_Template, 4, 2, "button", null, _forTrack06);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 6);
    \u0275\u0275listener("click", function PanoramaEncounterComponent_Conditional_17_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.downloadNotebook());
    });
    \u0275\u0275text(12, "Download notebook and interviews");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.scene().sources);
  }
}
var PanoramaEncounterComponent = class _PanoramaEncounterComponent {
  scene = input.required(
    ...ngDevMode ? [{ debugName: "scene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  state = input.required(
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  action = output();
  tutorRequested = output();
  sphereView = viewChild(
    SphericalViewComponent,
    ...ngDevMode ? [{ debugName: "sphereView" }] : (
      /* istanbul ignore next */
      []
    )
  );
  adapter = inject(PANORAMA_INTERVIEW);
  mode = signal(
    "painting",
    ...ngDevMode ? [{ debugName: "mode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  heading = signal(
    50,
    ...ngDevMode ? [{ debugName: "heading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  personId = signal(
    "",
    ...ngDevMode ? [{ debugName: "personId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  question = signal(
    "",
    ...ngDevMode ? [{ debugName: "question" }] : (
      /* istanbul ignore next */
      []
    )
  );
  person = computed(
    () => this.scene().people.find((p) => p.id === this.personId()),
    ...ngDevMode ? [{ debugName: "person" }] : (
      /* istanbul ignore next */
      []
    )
  );
  conversation = computed(
    () => this.state().conversations[this.personId()] ?? [],
    ...ngDevMode ? [{ debugName: "conversation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sourceId = signal(
    "",
    ...ngDevMode ? [{ debugName: "sourceId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  source = computed(
    () => this.scene().sources.find((s) => s.id === this.sourceId()),
    ...ngDevMode ? [{ debugName: "source" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sourceZoom = signal(
    false,
    ...ngDevMode ? [{ debugName: "sourceZoom" }] : (
      /* istanbul ignore next */
      []
    )
  );
  repairId = signal(
    "",
    ...ngDevMode ? [{ debugName: "repairId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  repair = computed(
    () => this.scene().repairs.find((r) => r.id === this.repairId()),
    ...ngDevMode ? [{ debugName: "repair" }] : (
      /* istanbul ignore next */
      []
    )
  );
  notebook = signal(
    false,
    ...ngDevMode ? [{ debugName: "notebook" }] : (
      /* istanbul ignore next */
      []
    )
  );
  original = signal(
    false,
    ...ngDevMode ? [{ debugName: "original" }] : (
      /* istanbul ignore next */
      []
    )
  );
  repairMode = signal(
    false,
    ...ngDevMode ? [{ debugName: "repairMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  busy = signal(
    false,
    ...ngDevMode ? [{ debugName: "busy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  status = signal(
    "",
    ...ngDevMode ? [{ debugName: "status" }] : (
      /* istanbul ignore next */
      []
    )
  );
  videoFailed = signal(
    false,
    ...ngDevMode ? [{ debugName: "videoFailed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  repairCount = computed(
    () => this.scene().repairs.filter((r) => this.state().repairs[r.id]).length,
    ...ngDevMode ? [{ debugName: "repairCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  view = viewChild(
    "view",
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  messages = viewChild(
    "messages",
    ...ngDevMode ? [{ debugName: "messages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sourceDialog = viewChild(
    "sourceDialog",
    ...ngDevMode ? [{ debugName: "sourceDialog" }] : (
      /* istanbul ignore next */
      []
    )
  );
  clip = clipRect;
  request;
  focusTimer;
  drag;
  dragged = false;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.request?.abort();
      if (this.focusTimer)
        clearTimeout(this.focusTimer);
    });
  }
  focus() {
    if (this.focusTimer)
      clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      const view = this.view()?.nativeElement;
      view?.scrollIntoView?.({ block: "start", behavior: "instant" });
      view?.focus({ preventScroll: true });
    });
  }
  sourceTitle(id) {
    return this.scene().sources.find((s) => s.id === id)?.title ?? "Historical evidence";
  }
  selectSphericalPerson(id) {
    const person = this.scene().people.find((p) => p.id === id);
    if (!person)
      return;
    this.personId.set(id);
    this.action.emit({ type: "visit", personId: id });
    this.status.set(`${person.name} selected. Questions belong in the AI box.`);
    const closeView = this.scene().viewpoints?.find((v) => v.people.length === 1 && v.people[0].personId === id);
    if (closeView && this.sphereView()?.active().id !== closeView.id)
      this.sphereView()?.choose(closeView.id);
  }
  enter() {
    this.heading.set(this.state().heading);
    this.mode.set("panorama");
    this.sourceId.set("");
    this.repairId.set("");
    this.focus();
  }
  leave() {
    this.cancel();
    this.mode.set("painting");
    this.sourceId.set("");
    this.repairMode.set(true);
    this.focus();
  }
  pan(amount) {
    this.heading.update((h) => Math.max(0, Math.min(100, h + amount)));
  }
  saveHeading() {
    this.action.emit({ type: "view", heading: this.heading() });
  }
  pointerDown(e) {
    if (e.button !== 0)
      return;
    this.drag = { x: e.clientX, heading: this.heading(), width: e.currentTarget instanceof HTMLElement ? e.currentTarget.clientWidth : 1e3 };
    this.dragged = false;
  }
  pointerMove(e) {
    if (!this.drag)
      return;
    const delta = e.clientX - this.drag.x;
    if (Math.abs(delta) > 5)
      this.dragged = true;
    if (this.dragged)
      this.heading.set(Math.max(0, Math.min(100, this.drag.heading - delta / this.drag.width * 90)));
  }
  pointerEnd() {
    if (this.drag)
      this.saveHeading();
    this.drag = void 0;
  }
  key(e) {
    if (this.mode() !== "panorama")
      return;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      this.pan(e.key === "ArrowLeft" ? -10 : 10);
      this.saveHeading();
    }
  }
  approach(p) {
    if (this.scene().questionOwner === "tutor") {
      this.selectSphericalPerson(p.id);
      return;
    }
    if (this.dragged) {
      this.dragged = false;
      return;
    }
    this.saveHeading();
    this.personId.set(p.id);
    this.mode.set("approach");
    this.videoFailed.set(false);
    this.question.set("");
    this.status.set("");
    this.action.emit({ type: "visit", personId: p.id });
    this.focus();
  }
  talk() {
    this.mode.set("interview");
    this.focus();
  }
  returnToScene() {
    this.cancel();
    this.sourceId.set("");
    this.mode.set("panorama");
    this.focus();
  }
  cancel() {
    this.request?.abort();
    this.request = void 0;
    this.busy.set(false);
  }
  async ask(question = this.question()) {
    const p = this.person(), value = question.trim();
    if (!p || !value || value.length > 600 || this.busy())
      return;
    const request = new AbortController();
    this.request = request;
    this.busy.set(true);
    this.status.set("");
    this.question.set(value);
    try {
      const answer = await this.adapter.answer(this.scene(), p, value, this.conversation(), request.signal);
      if (request.signal.aborted)
        return;
      if (answer.role !== "character" || !answer.text?.trim() || answer.text.length > 2500 || !Array.isArray(answer.sourceIds) || answer.sourceIds.some((id) => !this.scene().sources.some((s) => s.id === id)))
        throw new Error("Invalid interview response");
      this.action.emit({ type: "conversation", personId: p.id, question: value, answer });
      this.question.set("");
      setTimeout(() => {
        const messages = this.messages()?.nativeElement;
        if (messages)
          messages.scrollTop = messages.scrollHeight;
      });
    } catch {
      if (!request.signal.aborted)
        this.status.set("The interview could not answer. Your question is retained; please retry.");
    } finally {
      if (this.request === request) {
        this.busy.set(false);
        this.request = void 0;
      }
    }
  }
  inspectSource(id) {
    this.sourceId.set(id);
    this.sourceZoom.set(false);
    if (this.focusTimer)
      clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => this.sourceDialog()?.nativeElement.showModal());
  }
  closeSource() {
    this.sourceDialog()?.nativeElement.close();
    this.sourceId.set("");
  }
  async download() {
    this.status.set("Preparing picture\u2026");
    try {
      const canvas = await renderPanoramaPainting(this.scene(), this.state());
      const blob = await new Promise((resolve, reject) => canvas.toBlob((b) => b ? resolve(b) : reject(new Error("Export failed")), "image/png"));
      downloadFile(blob, `${this.scene().id}-restoration.png`);
      this.status.set("Restoration image downloaded.");
    } catch {
      this.status.set("The picture could not export. Your draft remains saved; retry when the artwork loads.");
    }
  }
  downloadNotebook() {
    downloadFile(new Blob([JSON.stringify(__spreadValues({ scene: this.scene().title }, this.state()), null, 2)], { type: "application/json" }), `${this.scene().id}-field-notebook.json`);
  }
  static \u0275fac = function PanoramaEncounterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PanoramaEncounterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PanoramaEncounterComponent, selectors: [["app-panorama-encounter"]], viewQuery: function PanoramaEncounterComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.sphereView, SphericalViewComponent, 5)(ctx.view, _c05, 5)(ctx.messages, _c14, 5)(ctx.sourceDialog, _c2, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(4);
    }
  }, inputs: { scene: [1, "scene"], state: [1, "state"] }, outputs: { action: "action", tutorRequested: "tutorRequested" }, decls: 22, vars: 9, consts: [["view", ""], ["messages", ""], ["sourceDialog", ""], ["aria-label", "Living picture investigation", 1, "scene-shell"], [1, "scene-heading"], [1, "eyebrow"], [3, "click"], ["tabindex", "-1", 1, "scene-view", 3, "keydown"], ["aria-label", "Source inspection", 1, "source-inspection"], ["aria-label", "Field notebook", 1, "notebook"], ["role", "status", 1, "feedback"], [1, "attribution"], [1, "invitation"], [1, "framed-picture"], [3, "scene", "state", "original"], [3, "interviews"], ["aria-label", "Enter the painting", 1, "enter-surface"], [1, "studio-controls"], [1, "primary", 3, "click"], [1, "small"], [3, "click", "disabled"], ["aria-label", "Enter the painting", 1, "enter-surface", 3, "click"], [1, "picture-region", 3, "left", "top", "width", "height"], [1, "picture-region", 3, "click"], ["aria-label", "Picture details", 1, "repair-options"], ["aria-label", "Repair selected detail", 1, "repair-panel"], [1, "inspection-image"], ["alt", "Selected detail in the forged painting", 3, "src"], [1, "source-links"], [2, "position", "relative", "--interview-bottom", "105px"], [3, "position", "person", "viewpoints", "saved"], [1, "people-list"], [1, "panorama", 3, "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel"], [1, "world"], ["draggable", "false", 1, "world-image", 3, "src", "alt"], [1, "person-target", 3, "left", "top", "width", "height"], [1, "world-tag"], [1, "pan-controls"], ["aria-label", "Look left", 3, "click"], ["aria-label", "Panorama viewing direction", "type", "range", "min", "0", "max", "100", 3, "input", "change", "value"], ["aria-label", "Look right", 3, "click"], [1, "person-target", 3, "click"], [1, "encounter-top"], [1, "encounter-layout"], [1, "character-frame"], ["role", "img", 1, "character-image", 3, "approaching", "background-image", "background-position"], ["aria-label", "Character interview", 1, "interview"], ["controls", "", "autoplay", "", "playsinline", "", 3, "ended", "error", "poster"], ["type", "video/mp4", 3, "src"], ["kind", "captions", "srclang", "en", "label", "English", "default", "", 3, "src"], ["role", "img", 1, "character-image"], [1, "media-status"], [1, "welcome"], [1, "connection"], ["role", "log", "aria-live", "polite", "aria-label", "Interview conversation", 1, "messages"], [1, "character-message"], [3, "student-message", "character-message"], [1, "question-box"], ["for", "scene-question"], ["id", "scene-question", "maxlength", "600", 3, "input", "keydown.enter", "value", "placeholder"], ["aria-label", "Suggested questions", 1, "suggestions"], [3, "disabled"], ["aria-label", "Source inspection", 1, "source-inspection", 3, "cancel"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["role", "img", 1, "object-view"], [1, "notebook-sources"]], template: function PanoramaEncounterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 3)(1, "div", 4)(2, "div")(3, "span", 5);
      \u0275\u0275text(4, "A WORLD BEHIND THE FRAME");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2");
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "button", 6);
      \u0275\u0275listener("click", function PanoramaEncounterComponent_Template_button_click_9_listener() {
        return ctx.notebook.set(!ctx.notebook());
      });
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 7, 0);
      \u0275\u0275listener("keydown", function PanoramaEncounterComponent_Template_div_keydown_11_listener($event) {
        return ctx.key($event);
      });
      \u0275\u0275conditionalCreate(13, PanoramaEncounterComponent_Conditional_13_Template, 22, 15)(14, PanoramaEncounterComponent_Conditional_14_Template, 2, 1)(15, PanoramaEncounterComponent_Conditional_15_Template, 1, 1);
      \u0275\u0275conditionalCreate(16, PanoramaEncounterComponent_Conditional_16_Template, 17, 7, "dialog", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(17, PanoramaEncounterComponent_Conditional_17_Template, 13, 0, "section", 9);
      \u0275\u0275elementStart(18, "p", 10);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "p", 11);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_6_0;
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.scene().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.scene().setting);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-expanded", ctx.notebook());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("Field notebook \xB7 ", ctx.state().collected.length);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.mode() === "painting" ? 13 : ctx.mode() === "panorama" ? 14 : 15);
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_6_0 = ctx.source()) ? 16 : -1, tmp_6_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.notebook() ? 17 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.status());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.scene().attribution);
    }
  }, dependencies: [PanoramaPaintingComponent, SphericalViewComponent, InterviewScreensComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #233c35;\n  min-width: 0;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \na[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 9px 14px;\n  border: 1px solid #9aab9e;\n  border-radius: 8px;\n  background: #fffdf5;\n  color: #244237;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #e8efdc;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: default;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #dfebd2;\n  border-color: #42664d;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #b36917;\n  outline-offset: 3px;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #244c3c;\n  color: #fff6dc;\n  border-color: #244c3c;\n}\n.primary[_ngcontent-%COMP%]:hover {\n  background: #365e48;\n}\n.scene-heading[_ngcontent-%COMP%], \n.encounter-top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 14px;\n}\n.scene-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font: 30px Georgia;\n  margin: 5px 0;\n}\n.scene-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 18px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  letter-spacing: 2px;\n  font-weight: 700;\n}\n.scene-heading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.scene-view[_ngcontent-%COMP%] {\n  position: relative;\n  outline: none;\n}\n.invitation[_ngcontent-%COMP%] {\n  font-size: 16px;\n  line-height: 1.6;\n}\n.framed-picture[_ngcontent-%COMP%] {\n  position: relative;\n  border: 10px solid #614628;\n  box-shadow: 0 4px 16px rgba(23, 46, 36, 0.1490196078);\n  background: #324637;\n}\n.enter-surface[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  padding: 14px;\n}\n.enter-surface[_ngcontent-%COMP%]:hover {\n  background: rgba(6, 28, 16, 0.0823529412);\n}\n.enter-surface[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: rgba(20, 60, 50, 0.9294117647);\n  color: #fff7d8;\n  padding: 12px 20px;\n  border: 1px solid #d6c188;\n  border-radius: 30px;\n  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.3333333333);\n}\n.enter-surface[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  margin-left: 20px;\n}\n.studio-controls[_ngcontent-%COMP%], \n.repair-options[_ngcontent-%COMP%], \n.source-links[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 12px 0;\n}\n.small[_ngcontent-%COMP%], \n.attribution[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.55;\n  color: #526458;\n}\n.attribution[_ngcontent-%COMP%] {\n  border-top: 1px solid #d6dccd;\n  padding-top: 12px;\n}\n.picture-region[_ngcontent-%COMP%] {\n  position: absolute;\n  background: transparent;\n  border: 0;\n  border-radius: 0;\n  padding: 0;\n  min-height: 0;\n}\n.picture-region[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.031372549);\n  outline: 1px solid rgba(255, 255, 255, 0.5333333333);\n}\n.repair-panel[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #f1eddc;\n  border-radius: 10px;\n}\n.repair-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.inspection-image[_ngcontent-%COMP%] {\n  height: 170px;\n  position: relative;\n  overflow: hidden;\n  max-width: 360px;\n  border-radius: 8px;\n}\n.inspection-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  position: absolute;\n  max-width: none;\n  height: auto;\n}\n.panorama[_ngcontent-%COMP%] {\n  --%NS%height:clamp(300px,36vw,440px);\n  height: var(--%NS%height);\n  position: relative;\n  overflow: hidden;\n  border-radius: 12px;\n  background: #314c40;\n  touch-action: pan-y;\n  cursor: grab;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.panorama[_ngcontent-%COMP%]:active {\n  cursor: grabbing;\n}\n.world[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  height: 100%;\n  width: max(100%, var(--%NS%height) * 3);\n}\n.world-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: fill;\n  pointer-events: none;\n}\n.world-tag[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  pointer-events: none;\n  background: rgba(23, 57, 43, 0.862745098);\n  color: #fff4d2;\n  letter-spacing: 1.5px;\n  font-size: 10px;\n  padding: 7px 10px;\n  border-radius: 20px;\n}\n.person-target[_ngcontent-%COMP%] {\n  position: absolute;\n  border: 0;\n  background: transparent;\n  border-radius: 40%;\n  padding: 0;\n  min-height: 44px;\n}\n.person-target[_ngcontent-%COMP%]:hover {\n  background: transparent;\n}\n.person-target[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  opacity: 0;\n  position: absolute;\n  bottom: 4%;\n  left: 50%;\n  transform: translateX(-50%);\n  white-space: nowrap;\n  background: rgba(22, 55, 46, 0.9333333333);\n  color: #fff;\n  padding: 8px 12px;\n  border-radius: 20px;\n  font-size: 13px;\n}\n.person-target[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%], \n.person-target[_ngcontent-%COMP%]:focus-visible   span[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.pan-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin: 12px 0;\n}\n.pan-controls[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  flex: 1;\n  font-size: 13px;\n}\n.pan-controls[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 40px;\n  accent-color: #365e48;\n}\n.people-list[_ngcontent-%COMP%] {\n  margin: 10px 0;\n}\n.people-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: block;\n  margin: 8px 0;\n}\n.encounter-top[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.encounter-top[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font: 23px Georgia;\n  margin: 6px 0;\n}\n.encounter-layout[_ngcontent-%COMP%] {\n  background: #e9edde;\n  border-radius: 12px;\n  overflow: hidden;\n  padding: 12px;\n}\n.encounter-layout.talking[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);\n  gap: 16px;\n}\n.character-frame[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.character-image[_ngcontent-%COMP%] {\n  height: 320px;\n  background-size: auto 110%;\n  background-repeat: no-repeat;\n  background-color: #476c54;\n  border-radius: 8px;\n}\n.character-image.approaching[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_approach 3s ease-out both;\n}\n@keyframes _ngcontent-%COMP%_approach {\n  from {\n    background-size: auto 100%;\n  }\n  to {\n    background-size: auto 170%;\n  }\n}\n.welcome[_ngcontent-%COMP%] {\n  font: 20px/1.55 Georgia;\n  max-width: 600px;\n}\n.media-status[_ngcontent-%COMP%], \n.connection[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #68562c;\n  background: #fff7df;\n  padding: 8px 12px;\n  border-radius: 6px;\n}\n.character-frame[_ngcontent-%COMP%]   video[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 420px;\n}\n.interview[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.connection[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.messages[_ngcontent-%COMP%] {\n  height: 270px;\n  overflow: auto;\n  scroll-behavior: smooth;\n  padding: 4px;\n}\n.messages[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n.messages[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  margin: 0 0 10px;\n  border-radius: 10px;\n  font-size: 14px;\n  line-height: 1.55;\n}\n.messages[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  margin: 5px 0;\n}\n.character-message[_ngcontent-%COMP%] {\n  background: #fffdf6;\n}\n.student-message[_ngcontent-%COMP%] {\n  background: #d6e3d7;\n  margin-left: 25px !important;\n}\n.messages[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 11px;\n  letter-spacing: 0.5px;\n}\n.source-links[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.question-box[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: bold;\n}\n.question-box[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  margin-top: 5px;\n}\n.question-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n  background: #fff;\n  border: 1px solid #97aa9b;\n  border-radius: 6px;\n  padding: 10px;\n}\n.suggestions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-top: 10px;\n}\n.suggestions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n  min-height: 36px;\n  padding: 6px 9px;\n}\n.source-inspection[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 5;\n  background: #fffaf0;\n  border: 1px solid #b7aa81;\n  border-radius: 10px;\n  padding: 20px;\n  overflow: auto;\n  box-shadow: 0 8px 30px rgba(24, 45, 36, 0.3333333333);\n}\n.source-inspection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  line-height: 1.65;\n}\n.source-inspection[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #235f49;\n}\n.object-view[_ngcontent-%COMP%] {\n  height: 230px;\n  background-size: auto 220%;\n  background-repeat: no-repeat;\n  background-color: #304b39;\n  border-radius: 8px;\n}\n.object-view.zoomed[_ngcontent-%COMP%] {\n  background-size: auto 360%;\n}\n.notebook[_ngcontent-%COMP%] {\n  background: #efe9d7;\n  padding: 20px;\n  border-radius: 12px;\n  margin: 16px 0;\n}\n.notebook-sources[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n  margin: 12px 0;\n}\n.notebook-sources[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.notebook-sources[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  margin-top: 5px;\n  color: #5d704c;\n}\n.feedback[_ngcontent-%COMP%] {\n  font-size: 13px;\n  min-height: 0;\n}\n.feedback[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n@media (max-width: 700px) {\n  .scene-heading[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n    margin-bottom: 12px;\n  }\n  .scene-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 25px;\n  }\n  .scene-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin-bottom: 0;\n  }\n  .framed-picture[_ngcontent-%COMP%] {\n    border-width: 5px;\n  }\n  .enter-surface[_ngcontent-%COMP%] {\n    padding: 5px;\n  }\n  .enter-surface[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 12px;\n    padding: 8px 12px;\n  }\n  .pan-controls[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .pan-controls[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    min-width: 150px;\n  }\n  .encounter-layout.talking[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .talking[_ngcontent-%COMP%]   .character-image[_ngcontent-%COMP%] {\n    height: 160px;\n    background-size: auto 220%;\n  }\n  .messages[_ngcontent-%COMP%] {\n    height: 250px;\n  }\n  .notebook-sources[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .source-inspection[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .encounter-top[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .scene-heading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    align-self: flex-start;\n  }\n  .panorama[_ngcontent-%COMP%] {\n    --%NS%height:320px;\n  }\n  .source-inspection[_ngcontent-%COMP%] {\n    position: fixed;\n    inset: 12vh 12px 20px;\n    z-index: 1000;\n  }\n  .inspection-image[_ngcontent-%COMP%] {\n    height: 130px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .character-image.approaching[_ngcontent-%COMP%] {\n    animation: none;\n    background-size: auto 150%;\n  }\n  .messages[_ngcontent-%COMP%] {\n    scroll-behavior: auto;\n  }\n}\n.inspection-image[_ngcontent-%COMP%] {\n  height: auto;\n  max-height: 220px;\n}\n.source-inspection[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  width: min(740px, 100vw - 24px);\n  height: fit-content;\n  max-height: 85vh;\n  margin: auto;\n  color: #233c35;\n}\n.source-inspection[_ngcontent-%COMP%]::backdrop {\n  background: rgba(16, 39, 28, 0.7882352941);\n}\n.scene-shell[_ngcontent-%COMP%] {\n  background: #f7f2e4;\n  padding: 20px;\n  border: 1px solid #baae8a;\n  border-radius: 14px;\n  margin: 12px 0;\n}\n.scene-view[_ngcontent-%COMP%] {\n  scroll-margin-top: 130px;\n}\n.character-image[_ngcontent-%COMP%] {\n  background-size: auto 170%;\n}\n.suggestions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n}\n@media (max-width: 900px) {\n  .scene-view[_ngcontent-%COMP%] {\n    scroll-margin-top: 170px;\n  }\n}\n@media (max-width: 600px) {\n  .scene-shell[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .scene-view[_ngcontent-%COMP%] {\n    scroll-margin-top: 260px;\n  }\n}\n/*# sourceMappingURL=panorama-encounter.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PanoramaEncounterComponent, [{
    type: Component,
    args: [{ selector: "app-panorama-encounter", imports: [PanoramaPaintingComponent, SphericalViewComponent, InterviewScreensComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<section class="scene-shell" aria-label="Living picture investigation">\r
  <div class="scene-heading"><div><span class="eyebrow">A WORLD BEHIND THE FRAME</span><h2>{{ scene().title }}</h2><p>{{ scene().setting }}</p></div><button [attr.aria-expanded]="notebook()" (click)="notebook.set(!notebook())">Field notebook \xB7 {{ state().collected.length }}</button></div>\r
  <div class="scene-view" #view tabindex="-1" (keydown)="key($event)">\r
    @if (mode() === 'painting') {\r
      <p class="invitation">{{ scene().invitation }}</p>\r
      <div class="framed-picture">\r
        <app-panorama-painting [scene]="scene()" [state]="state()" [original]="original()" />
        @if (!repairMode()) { <app-interview-screens [interviews]="scene().interviews ?? []" /> }
        @if (!repairMode()) { <button class="enter-surface" aria-label="Enter the painting" (click)="enter()"><span>Enter the painting <b>\u2197</b></span></button> }\r
        @else { @for (r of scene().repairs; track r.id) { <button class="picture-region" [style.left.%]="r.rect.x" [style.top.%]="r.rect.y" [style.width.%]="r.rect.width" [style.height.%]="r.rect.height" [attr.aria-label]="'Inspect ' + r.title" (click)="repairId.set(r.id)"></button> } }\r
      </div>\r
      <div class="studio-controls"><button class="primary" (click)="enter()">{{ state().visited.length ? 'Re-enter historical world' : 'Explore historical world' }}</button><button [attr.aria-pressed]="repairMode()" (click)="repairMode.set(!repairMode()); repairId.set('')">Inspect painting details</button><button [attr.aria-pressed]="original()" (click)="original.set(!original())">{{ original() ? 'Show my restoration' : 'Show original painting' }}</button></div>\r
      <p class="small">{{ repairCount() }} of {{ scene().repairs.length }} changes applied \xB7 {{ original() ? 'Viewing the original painting' : 'Viewing your current draft' }}. Compare observations with sources; absence from a scene is not proof.</p>\r
      @if (repairMode()) {\r
        <div class="repair-options" aria-label="Picture details">@for (r of scene().repairs; track r.id) { <button [attr.aria-pressed]="repairId() === r.id" (click)="repairId.set(r.id)">{{ r.title }}</button> }</div>\r
        @if (repair(); as r) {\r
          <section class="repair-panel" aria-label="Repair selected detail"><h3>{{ r.title }}</h3><p>Compare this detail with what you learned. You can keep it or try a reconstruction.</p><div class="inspection-image" [style.aspect-ratio]="r.rect.width * 3 / r.rect.height"><img [src]="scene().forgery" alt="Selected detail in the forged painting" [style.width.%]="10000 / r.rect.width" [style.left.%]="-r.rect.x * 100 / r.rect.width" [style.top.%]="-r.rect.y * 100 / r.rect.height"></div>\r
            <div class="studio-controls"><button [attr.aria-pressed]="!state().repairs[r.id]" (click)="action.emit({ type: 'repair', repairId: r.id, applied: false }); original.set(false)">Keep original detail</button><button [attr.aria-pressed]="!!state().repairs[r.id]" (click)="action.emit({ type: 'repair', repairId: r.id, applied: true }); original.set(false)">{{ r.action }}</button></div>\r
            <p class="small">Evidence saved for this detail:</p><div class="source-links">@for (id of r.sourceIds; track id) { @if (state().collected.includes(id)) { <button (click)="inspectSource(id)">{{ sourceTitle(id) }}</button> } }<button (click)="notebook.set(true)">Open research notebook</button></div>\r
          </section>\r
        }\r
      }\r
      <div class="studio-controls"><button [disabled]="!state().undo.length" (click)="action.emit({ type: 'undo' }); original.set(false)">Undo last change</button><button (click)="download()">Download restored picture</button></div>\r
    } @else if (mode() === 'panorama') {\r
      @if (scene().viewpoints; as viewpoints) {\r
        <div style="position:relative;--interview-bottom:105px"><app-spherical-view [viewpoints]="viewpoints" [saved]="state().sphericalView" (position)="action.emit({ type: 'spherical-view', view: $event })" (person)="selectSphericalPerson($event)" /><app-interview-screens [interviews]="scene().interviews ?? []" /></div>
        <div class="studio-controls"><button (click)="leave()">Return to painting</button><button (click)="tutorRequested.emit()">Open AI box</button></div>\r
        <details class="people-list"><summary>People in this scene \xB7 keyboard navigation</summary>@for (p of scene().people; track p.id) { <button (click)="selectSphericalPerson(p.id)">{{ p.name }} \xB7 {{ p.activity }}</button> }</details>\r
      } @else {\r
      <div class="panorama" (pointerdown)="pointerDown($event)" (pointermove)="pointerMove($event)" (pointerup)="pointerEnd()" (pointerleave)="pointerEnd()" (pointercancel)="pointerEnd()">\r
        <div class="world" [style.left.%]="heading()" [style.transform]="'translateX(-' + heading() + '%)'">\r
          <img class="world-image" [src]="scene().panorama" [alt]="scene().imageAlt" draggable="false">\r
          @for (p of scene().people; track p.id) { <button class="person-target" [style.left.%]="p.rect.x" [style.top.%]="p.rect.y" [style.width.%]="p.rect.width" [style.height.%]="p.rect.height" [attr.aria-label]="'Approach ' + p.name" (click)="approach(p)"><span>{{ p.name }}</span></button> }\r
        </div>\r
        <span class="world-tag">INSIDE THE HISTORICAL WORLD</span>\r
      </div>\r
      <div class="pan-controls"><button aria-label="Look left" (click)="pan(-15); saveHeading()">\u2190</button><label>Look around<input aria-label="Panorama viewing direction" type="range" min="0" max="100" [value]="heading()" (input)="heading.set(+$any($event.target).value)" (change)="saveHeading()"></label><button aria-label="Look right" (click)="pan(15); saveHeading()">\u2192</button><button (click)="leave()">Return to painting</button></div>\r
      <p class="small">Drag to look around, or use arrow keys. Click a person to approach. This world contains none of the painting\u2019s forged details.</p>\r
      <details class="people-list"><summary>People in this scene \xB7 keyboard navigation</summary>@for (p of scene().people; track p.id) { <button (click)="approach(p)">{{ p.name }} \xB7 {{ p.activity }}</button> }</details>\r
      }\r
    } @else {\r
      @if (person(); as p) {\r
        <div class="encounter-top"><div><span class="eyebrow">{{ mode() === 'approach' ? 'APPROACHING' : 'IN CONVERSATION' }}</span><h3>{{ p.name }}</h3></div><button (click)="returnToScene()">\u2190 Return to scene</button></div>\r
        <div class="encounter-layout" [class.talking]="mode() === 'interview'">\r
          <div class="character-frame">\r
            @if (mode() === 'approach' && p.approach && !videoFailed()) {\r
              <video controls autoplay playsinline [poster]="scene().panorama" (ended)="talk()" (error)="videoFailed.set(true)"><source [src]="p.approach.src" type="video/mp4"><track kind="captions" srclang="en" label="English" [src]="p.approach.captions" default></video><details><summary>Video transcript</summary><p>{{ p.approach.transcript }}</p></details>\r
            } @else {\r
              <div class="character-image" [class.approaching]="mode() === 'approach'" [style.background-image]="'url(' + scene().panorama + ')'" [style.background-position]="(p.rect.x + p.rect.width / 2) + '% center'" role="img" [attr.aria-label]="p.name + ': ' + p.activity"></div>\r
            }\r
            @if (mode() === 'approach') {\r
              @if (!p.approach || videoFailed()) { <p class="media-status">Camera-move preview \xB7 character video {{ videoFailed() ? 'could not load' : 'pending' }}.</p> }\r
              <p class="welcome">\u201C{{ p.welcome }}\u201D</p><button class="primary" (click)="talk()">{{ p.approach ? 'Continue to conversation' : 'Begin scripted conversation' }}</button>\r
            } @else { <p class="small">{{ p.activity }} \xB7 Fictional character, historical dramatization.</p> }\r
          </div>\r
          @if (mode() === 'interview' && scene().questionOwner !== 'tutor') {\r
            <section class="interview" aria-label="Character interview"><p class="connection">{{ adapter.mode === 'ai' ? 'AI character interview' : 'Scripted interview preview \xB7 AI disconnected' }}</p>\r
              <div class="messages" #messages role="log" aria-live="polite" aria-label="Interview conversation"><p class="character-message">{{ p.welcome }}</p>@for (m of conversation(); track $index) { <article [class.student-message]="m.role === 'student'" [class.character-message]="m.role === 'character'"><strong>{{ m.role === 'student' ? 'You' : p.name }}</strong><p>{{ m.text }}</p><div class="source-links">@for (id of m.sourceIds; track id) { <button (click)="inspectSource(id)">{{ sourceTitle(id) }} \u2197</button> }</div></article> }</div>\r
              <div class="question-box"><label for="scene-question">Ask about their work</label><div><input id="scene-question" maxlength="600" [value]="question()" (input)="question.set($any($event.target).value)" (keydown.enter)="ask()" [placeholder]="p.topics[0].question"><button [disabled]="busy() || !question().trim()" (click)="ask()">{{ busy() ? 'Waiting\u2026' : 'Ask' }}</button></div></div>\r
              <div class="suggestions" aria-label="Suggested questions">@for (topic of p.topics; track topic.id) { <button [disabled]="busy()" (click)="ask(topic.question)">{{ topic.question }}</button> }</div>\r
            </section>\r
          }\r
        </div>\r
      }\r
    }\r
    @if (source(); as s) {\r
      <dialog class="source-inspection" #sourceDialog aria-label="Source inspection" (cancel)="closeSource()"><div class="encounter-top"><h3>{{ s.title }}</h3><button (click)="closeSource()">Close source</button></div>\r
        @if (s.rect; as r) { <div class="object-view" [class.zoomed]="sourceZoom()" [style.background-image]="'url(' + scene().panorama + ')'" [style.background-position]="(r.x + r.width / 2) + '% ' + (r.y + r.height / 2) + '%'" role="img" [attr.aria-label]="s.title + ' in the teaching reconstruction'"></div><button [attr.aria-pressed]="sourceZoom()" (click)="sourceZoom.set(!sourceZoom())">{{ sourceZoom() ? 'Zoom out' : 'Examine closer' }}</button> }\r
        <p>{{ s.text }}</p><p class="small">{{ s.provenance }}</p><div class="studio-controls"><a [href]="s.url" target="_blank" rel="noopener noreferrer">Open historical source \u2197</a><button [attr.aria-pressed]="state().collected.includes(s.id)" (click)="action.emit({ type: 'collect', sourceId: s.id })">{{ state().collected.includes(s.id) ? 'Remove from notebook' : 'Save to field notebook' }}</button></div>\r
      </dialog>\r
    }\r
  </div>\r
  @if (notebook()) { <section class="notebook" aria-label="Field notebook"><div class="encounter-top"><h3>Field notebook</h3><button (click)="notebook.set(false)">Close notebook</button></div><p>Sources describe what historians can support. Character conversations are dramatizations. You can consult every source directly.</p><div class="notebook-sources">@for (s of scene().sources; track s.id) { <button (click)="inspectSource(s.id); notebook.set(false)">{{ s.title }} <span>{{ state().collected.includes(s.id) ? 'Saved' : 'Open source' }}</span></button> }</div><button (click)="downloadNotebook()">Download notebook and interviews</button></section> }\r
  <p class="feedback" role="status">{{ status() }}</p><p class="attribution">{{ scene().attribution }}</p>\r
</section>\r
`, styles: ["/* src/app/shared/panorama/panorama-encounter.component.scss */\n:host {\n  display: block;\n  color: #233c35;\n  min-width: 0;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\na {\n  font: inherit;\n}\nbutton {\n  min-height: 44px;\n  padding: 9px 14px;\n  border: 1px solid #9aab9e;\n  border-radius: 8px;\n  background: #fffdf5;\n  color: #244237;\n  cursor: pointer;\n}\nbutton:hover {\n  background: #e8efdc;\n}\nbutton:disabled {\n  opacity: 0.55;\n  cursor: default;\n}\nbutton[aria-pressed=true] {\n  background: #dfebd2;\n  border-color: #42664d;\n}\nbutton:focus-visible,\na:focus-visible,\ninput:focus-visible,\nsummary:focus-visible {\n  outline: 3px solid #b36917;\n  outline-offset: 3px;\n}\n.primary {\n  background: #244c3c;\n  color: #fff6dc;\n  border-color: #244c3c;\n}\n.primary:hover {\n  background: #365e48;\n}\n.scene-heading,\n.encounter-top {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 14px;\n}\n.scene-heading h2 {\n  font: 30px Georgia;\n  margin: 5px 0;\n}\n.scene-heading p {\n  margin: 6px 0 18px;\n}\n.eyebrow {\n  font-size: 11px;\n  letter-spacing: 2px;\n  font-weight: 700;\n}\n.scene-heading button {\n  flex-shrink: 0;\n}\n.scene-view {\n  position: relative;\n  outline: none;\n}\n.invitation {\n  font-size: 16px;\n  line-height: 1.6;\n}\n.framed-picture {\n  position: relative;\n  border: 10px solid #614628;\n  box-shadow: 0 4px 16px rgba(23, 46, 36, 0.1490196078);\n  background: #324637;\n}\n.enter-surface {\n  position: absolute;\n  inset: 0;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  padding: 14px;\n}\n.enter-surface:hover {\n  background: rgba(6, 28, 16, 0.0823529412);\n}\n.enter-surface span {\n  background: rgba(20, 60, 50, 0.9294117647);\n  color: #fff7d8;\n  padding: 12px 20px;\n  border: 1px solid #d6c188;\n  border-radius: 30px;\n  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.3333333333);\n}\n.enter-surface b {\n  margin-left: 20px;\n}\n.studio-controls,\n.repair-options,\n.source-links {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 12px 0;\n}\n.small,\n.attribution {\n  font-size: 12px;\n  line-height: 1.55;\n  color: #526458;\n}\n.attribution {\n  border-top: 1px solid #d6dccd;\n  padding-top: 12px;\n}\n.picture-region {\n  position: absolute;\n  background: transparent;\n  border: 0;\n  border-radius: 0;\n  padding: 0;\n  min-height: 0;\n}\n.picture-region:hover {\n  background: rgba(255, 255, 255, 0.031372549);\n  outline: 1px solid rgba(255, 255, 255, 0.5333333333);\n}\n.repair-panel {\n  padding: 16px;\n  background: #f1eddc;\n  border-radius: 10px;\n}\n.repair-panel h3 {\n  margin: 0;\n}\n.inspection-image {\n  height: 170px;\n  position: relative;\n  overflow: hidden;\n  max-width: 360px;\n  border-radius: 8px;\n}\n.inspection-image img {\n  position: absolute;\n  max-width: none;\n  height: auto;\n}\n.panorama {\n  --height:clamp(300px,36vw,440px);\n  height: var(--height);\n  position: relative;\n  overflow: hidden;\n  border-radius: 12px;\n  background: #314c40;\n  touch-action: pan-y;\n  cursor: grab;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.panorama:active {\n  cursor: grabbing;\n}\n.world {\n  position: absolute;\n  top: 0;\n  height: 100%;\n  width: max(100%, var(--height) * 3);\n}\n.world-image {\n  width: 100%;\n  height: 100%;\n  object-fit: fill;\n  pointer-events: none;\n}\n.world-tag {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  pointer-events: none;\n  background: rgba(23, 57, 43, 0.862745098);\n  color: #fff4d2;\n  letter-spacing: 1.5px;\n  font-size: 10px;\n  padding: 7px 10px;\n  border-radius: 20px;\n}\n.person-target {\n  position: absolute;\n  border: 0;\n  background: transparent;\n  border-radius: 40%;\n  padding: 0;\n  min-height: 44px;\n}\n.person-target:hover {\n  background: transparent;\n}\n.person-target span {\n  opacity: 0;\n  position: absolute;\n  bottom: 4%;\n  left: 50%;\n  transform: translateX(-50%);\n  white-space: nowrap;\n  background: rgba(22, 55, 46, 0.9333333333);\n  color: #fff;\n  padding: 8px 12px;\n  border-radius: 20px;\n  font-size: 13px;\n}\n.person-target:hover span,\n.person-target:focus-visible span {\n  opacity: 1;\n}\n.pan-controls {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin: 12px 0;\n}\n.pan-controls label {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  flex: 1;\n  font-size: 13px;\n}\n.pan-controls input {\n  width: 100%;\n  min-width: 40px;\n  accent-color: #365e48;\n}\n.people-list {\n  margin: 10px 0;\n}\n.people-list button {\n  display: block;\n  margin: 8px 0;\n}\n.encounter-top {\n  margin-bottom: 12px;\n}\n.encounter-top h3 {\n  font: 23px Georgia;\n  margin: 6px 0;\n}\n.encounter-layout {\n  background: #e9edde;\n  border-radius: 12px;\n  overflow: hidden;\n  padding: 12px;\n}\n.encounter-layout.talking {\n  display: grid;\n  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);\n  gap: 16px;\n}\n.character-frame {\n  min-width: 0;\n}\n.character-image {\n  height: 320px;\n  background-size: auto 110%;\n  background-repeat: no-repeat;\n  background-color: #476c54;\n  border-radius: 8px;\n}\n.character-image.approaching {\n  animation: approach 3s ease-out both;\n}\n@keyframes approach {\n  from {\n    background-size: auto 100%;\n  }\n  to {\n    background-size: auto 170%;\n  }\n}\n.welcome {\n  font: 20px/1.55 Georgia;\n  max-width: 600px;\n}\n.media-status,\n.connection {\n  font-size: 12px;\n  color: #68562c;\n  background: #fff7df;\n  padding: 8px 12px;\n  border-radius: 6px;\n}\n.character-frame video {\n  width: 100%;\n  max-height: 420px;\n}\n.interview {\n  min-width: 0;\n}\n.connection {\n  margin-top: 0;\n}\n.messages {\n  height: 270px;\n  overflow: auto;\n  scroll-behavior: smooth;\n  padding: 4px;\n}\n.messages article,\n.messages > p {\n  padding: 10px 12px;\n  margin: 0 0 10px;\n  border-radius: 10px;\n  font-size: 14px;\n  line-height: 1.55;\n}\n.messages article p {\n  white-space: pre-wrap;\n  margin: 5px 0;\n}\n.character-message {\n  background: #fffdf6;\n}\n.student-message {\n  background: #d6e3d7;\n  margin-left: 25px !important;\n}\n.messages strong {\n  font-size: 11px;\n  letter-spacing: 0.5px;\n}\n.source-links button {\n  font-size: 12px;\n}\n.question-box label {\n  font-size: 12px;\n  font-weight: bold;\n}\n.question-box > div {\n  display: flex;\n  gap: 6px;\n  margin-top: 5px;\n}\n.question-box input {\n  width: 100%;\n  min-width: 0;\n  background: #fff;\n  border: 1px solid #97aa9b;\n  border-radius: 6px;\n  padding: 10px;\n}\n.suggestions {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-top: 10px;\n}\n.suggestions button {\n  font-size: 12px;\n  min-height: 36px;\n  padding: 6px 9px;\n}\n.source-inspection {\n  position: absolute;\n  inset: 0;\n  z-index: 5;\n  background: #fffaf0;\n  border: 1px solid #b7aa81;\n  border-radius: 10px;\n  padding: 20px;\n  overflow: auto;\n  box-shadow: 0 8px 30px rgba(24, 45, 36, 0.3333333333);\n}\n.source-inspection p {\n  line-height: 1.65;\n}\n.source-inspection a {\n  color: #235f49;\n}\n.object-view {\n  height: 230px;\n  background-size: auto 220%;\n  background-repeat: no-repeat;\n  background-color: #304b39;\n  border-radius: 8px;\n}\n.object-view.zoomed {\n  background-size: auto 360%;\n}\n.notebook {\n  background: #efe9d7;\n  padding: 20px;\n  border-radius: 12px;\n  margin: 16px 0;\n}\n.notebook-sources {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n  margin: 12px 0;\n}\n.notebook-sources button {\n  text-align: left;\n}\n.notebook-sources span {\n  display: block;\n  font-size: 11px;\n  margin-top: 5px;\n  color: #5d704c;\n}\n.feedback {\n  font-size: 13px;\n  min-height: 0;\n}\n.feedback:empty {\n  display: none;\n}\n@media (max-width: 700px) {\n  .scene-heading {\n    align-items: flex-start;\n    flex-direction: column;\n    margin-bottom: 12px;\n  }\n  .scene-heading h2 {\n    font-size: 25px;\n  }\n  .scene-heading p {\n    margin-bottom: 0;\n  }\n  .framed-picture {\n    border-width: 5px;\n  }\n  .enter-surface {\n    padding: 5px;\n  }\n  .enter-surface span {\n    font-size: 12px;\n    padding: 8px 12px;\n  }\n  .pan-controls {\n    flex-wrap: wrap;\n  }\n  .pan-controls label {\n    min-width: 150px;\n  }\n  .encounter-layout.talking {\n    grid-template-columns: 1fr;\n  }\n  .talking .character-image {\n    height: 160px;\n    background-size: auto 220%;\n  }\n  .messages {\n    height: 250px;\n  }\n  .notebook-sources {\n    grid-template-columns: 1fr;\n  }\n  .source-inspection {\n    padding: 12px;\n  }\n  .encounter-top h3 {\n    font-size: 20px;\n  }\n  .scene-heading button {\n    align-self: flex-start;\n  }\n  .panorama {\n    --height:320px;\n  }\n  .source-inspection {\n    position: fixed;\n    inset: 12vh 12px 20px;\n    z-index: 1000;\n  }\n  .inspection-image {\n    height: 130px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .character-image.approaching {\n    animation: none;\n    background-size: auto 150%;\n  }\n  .messages {\n    scroll-behavior: auto;\n  }\n}\n.inspection-image {\n  height: auto;\n  max-height: 220px;\n}\n.source-inspection {\n  position: fixed;\n  inset: 0;\n  width: min(740px, 100vw - 24px);\n  height: fit-content;\n  max-height: 85vh;\n  margin: auto;\n  color: #233c35;\n}\n.source-inspection::backdrop {\n  background: rgba(16, 39, 28, 0.7882352941);\n}\n.scene-shell {\n  background: #f7f2e4;\n  padding: 20px;\n  border: 1px solid #baae8a;\n  border-radius: 14px;\n  margin: 12px 0;\n}\n.scene-view {\n  scroll-margin-top: 130px;\n}\n.character-image {\n  background-size: auto 170%;\n}\n.suggestions button {\n  min-height: 44px;\n}\n@media (max-width: 900px) {\n  .scene-view {\n    scroll-margin-top: 170px;\n  }\n}\n@media (max-width: 600px) {\n  .scene-shell {\n    padding: 12px;\n  }\n  .scene-view {\n    scroll-margin-top: 260px;\n  }\n}\n/*# sourceMappingURL=panorama-encounter.component.css.map */\n"] }]
  }], () => [], { scene: [{ type: Input, args: [{ isSignal: true, alias: "scene", required: true }] }], state: [{ type: Input, args: [{ isSignal: true, alias: "state", required: true }] }], action: [{ type: Output, args: ["action"] }], tutorRequested: [{ type: Output, args: ["tutorRequested"] }], sphereView: [{ type: ViewChild, args: [forwardRef(() => SphericalViewComponent), { isSignal: true }] }], view: [{ type: ViewChild, args: ["view", { isSignal: true }] }], messages: [{ type: ViewChild, args: ["messages", { isSignal: true }] }], sourceDialog: [{ type: ViewChild, args: ["sourceDialog", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PanoramaEncounterComponent, { className: "PanoramaEncounterComponent", filePath: "src/app/shared/panorama/panorama-encounter.component.ts", lineNumber: 15 });
})();

// src/app/templates/heist/restoration/weekly/restoration-week-workspace.component.ts
var _c06 = ["tutorPanel"];
var _c15 = ["inspector"];
var _c22 = ["sessionHeading"];
var _c32 = (a0) => [a0];
var _c4 = () => [];
var _forTrack07 = ($index, $item) => $item.title;
var _forTrack12 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.workId;
function RestorationWeekWorkspaceComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r1 = ctx.$implicit;
    const $index_r2 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r2 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r1);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showFilm());
    });
    \u0275\u0275text(1, "Inspect still-image study");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", ctx_r3.mode() === "film");
  }
}
function RestorationWeekWorkspaceComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_19_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.downloadDraft());
    });
    \u0275\u0275text(3, "Download draft");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r3.runtime.warning(), " ");
  }
}
function RestorationWeekWorkspaceComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.message());
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", w_r7.id)("selected", w_r7.id === ctx_r3.work().id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(w_r7.title);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_14_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.choose(ctx_r3.session().workId));
    });
    \u0275\u0275text(3, "Return to session picture");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Extra commission open. The steps and planning boxes describe Week ", ctx_r3.week().week, "; the repair tools and sources below match this picture. ");
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_15_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-panorama-encounter", 23);
    \u0275\u0275listener("action", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_15_For_1_Template_app_panorama_encounter_action_0_listener($event) {
      const d_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.runtime.sceneAction(d_r11.id, $event));
    })("tutorRequested", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_15_For_1_Template_app_panorama_encounter_tutorRequested_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.openTutor());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r11 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("scene", d_r11)("state", ctx_r3.runtime.sceneState(d_r11.id));
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275repeaterCreate(0, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_15_For_1_Template, 1, 2, "app-panorama-encounter", 22, _forTrack12);
    \u0275\u0275elementStart(2, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_15_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.toggleExhibit(ctx_r3.work().id));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction1(1, _c32, ctx));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((ctx_r3.runtime.state().exhibit ?? \u0275\u0275pureFunction0(3, _c4)).includes(ctx_r3.work().id) ? "Remove from exhibition" : "Add restored picture to exhibition");
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-restoration-scene-film", 39);
    \u0275\u0275listener("position", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_2_For_1_Template_app_restoration_scene_film_position_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r3.runtime.saveFilmTime(ctx_r3.lesson(), $event));
    })("region", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_2_For_1_Template_app_restoration_scene_film_region_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r3.inspect($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const filmSession_r14 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(4);
    \u0275\u0275property("film", filmSession_r14.film)("startTime", ctx_r3.filmTime());
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_2_For_1_Template, 1, 2, "app-restoration-scene-film", 38, _forTrack2);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(\u0275\u0275pureFunction1(0, _c32, ctx_r3.session()));
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275element(1, "app-restoration-canvas", 49);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(4);
    \u0275\u0275styleProp("clip-path", "inset(0 " + (100 - ctx_r3.wipe()) + "% 0 0)");
    \u0275\u0275advance();
    \u0275\u0275property("definition", ctx_r3.work())("state", ctx_r3.displayState())("original", true)("interactive", false);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1, "Original");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 51);
    \u0275\u0275text(3, "Your version");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 52);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("left", ctx_r3.wipe(), "%");
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1, "Saved version \xB7 viewing only");
    \u0275\u0275elementEnd();
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 45);
    \u0275\u0275text(1, "Compare original \u2194 your version");
    \u0275\u0275elementStart(2, "input", 53);
    \u0275\u0275listener("input", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Conditional_6_Template_input_input_2_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r3 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r3.wipe.set(+$event.target.value));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r3.wipe());
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 41)(2, "app-restoration-canvas", 42);
    \u0275\u0275listener("select", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Template_app_restoration_canvas_select_2_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.inspect($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Conditional_3_Template, 2, 6, "div", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Conditional_4_Template, 5, 2);
    \u0275\u0275conditionalCreate(5, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Conditional_5_Template, 2, 0, "span", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Conditional_6_Template, 3, 1, "label", 45);
    \u0275\u0275elementStart(7, "div", 46)(8, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.compare.set(!ctx_r3.compare()));
    });
    \u0275\u0275text(9, "Before / after");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.zoom.set(!ctx_r3.zoom()));
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.guides.set(!ctx_r3.guides()));
    });
    \u0275\u0275text(13, "Detail outlines");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p", 47);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275styleProp("transform", ctx_r3.zoom() ? "scale(1.65)" : "scale(1)")("transform-origin", ctx_r3.region() ? ctx_r3.region().x + ctx_r3.region().width / 2 + "% " + (ctx_r3.region().y + ctx_r3.region().height / 2) + "%" : "center");
    \u0275\u0275advance();
    \u0275\u0275property("definition", ctx_r3.work())("state", ctx_r3.displayState())("interactive", !ctx_r3.replay())("guides", ctx_r3.guides());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.compare() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.compare() ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.replay() ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.compare() ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r3.compare());
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r3.zoom());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.zoom() ? "Zoom out" : "Zoom into detail");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", ctx_r3.guides());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r3.work().attribution, " \xB7 Select a numbered area or use the detail buttons.");
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_For_10_Template_button_click_0_listener() {
      const r_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.inspect(r_r18.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r18 = ctx.$implicit;
    const \u0275$index_150_r19 = ctx.$index;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("aria-pressed", ctx_r3.region()?.id === r_r18.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", \u0275$index_150_r19 + 1, " \xB7 ", r_r18.title);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_11_For_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 56);
  }
  if (rf & 2) {
    const o_r21 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", o_r21.image, \u0275\u0275sanitizeUrl);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_11_For_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r21 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r21.tool === "remove" ? "\u2212" : o_r21.tool === "keep" ? "\u25C8" : "\u270E");
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_11_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_11_For_10_Template_button_click_0_listener() {
      const o_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r3.edit(o_r21.id));
    });
    \u0275\u0275conditionalCreate(1, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_11_For_10_Conditional_1_Template, 1, 1, "img", 56)(2, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_11_For_10_Conditional_2_Template, 2, 1, "span", 57);
    \u0275\u0275elementStart(3, "span")(4, "b");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const o_r21 = ctx.$implicit;
    const r_r22 = \u0275\u0275nextContext();
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("aria-pressed", ctx_r3.option(r_r22.id) === o_r21.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(o_r21.image ? 1 : 2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(o_r21.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r21.text ?? o_r21.description);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 54);
    \u0275\u0275text(3, "The picture claims: ");
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Check the source desk, then choose an image layer below. Your choice changes this part of the picture.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 55);
    \u0275\u0275repeaterCreate(9, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_11_For_10_Template, 8, 4, "button", null, _forTrack12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r22 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r22.title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(r_r22.claim);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(r_r22.options);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "span", 58);
    \u0275\u0275text(2, "\u2315");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Start with one detail.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Select a numbered area in the artwork. Read what it claims, inspect its sources, then try a visible repair.");
    \u0275\u0275elementEnd()();
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_For_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article")(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 59);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_For_27_Template_button_click_7_listener() {
      const source_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.runtime.pinSource(ctx_r3.work().id, source_r24.id));
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const source_r24 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r24.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r24.text);
    \u0275\u0275advance();
    \u0275\u0275property("href", source_r24.sourceUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", source_r24.sourceTitle, " \u2197");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", ctx_r3.pinnedSources().includes(source_r24.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.pinnedSources().includes(source_r24.id) ? "Unpin source" : "Pin source to picture");
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_For_33_Template_button_click_0_listener() {
      const trial_r26 = \u0275\u0275restoreView(_r25).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      ctx_r3.replayId.set(trial_r26.id);
      return \u0275\u0275resetView(ctx_r3.mode.set("picture"));
    });
    \u0275\u0275text(1);
    \u0275\u0275element(2, "app-restoration-canvas", 60);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trial_r26 = ctx.$implicit;
    const \u0275$index_242_r27 = ctx.$index;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("aria-pressed", ctx_r3.replayId() === trial_r26.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Version ", \u0275$index_242_r27 + 1);
    \u0275\u0275advance();
    \u0275\u0275property("definition", ctx_r3.work())("state", trial_r26.state)("interactive", false);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_ForEmpty_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Use Save picture version after a repair to keep an image you can revisit.");
    \u0275\u0275elementEnd();
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_35_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.replayId.set(void 0));
    });
    \u0275\u0275text(1, "Return to current draft");
    \u0275\u0275elementEnd();
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25);
    \u0275\u0275conditionalCreate(2, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_2_Template, 2, 2)(3, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_3_Template, 16, 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "section", 26, 2)(6, "p", 6);
    \u0275\u0275text(7, "ON THE PICTURE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 27);
    \u0275\u0275repeaterCreate(9, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_For_10_Template, 2, 3, "button", null, _forTrack12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_11_Template, 11, 2)(12, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_12_Template, 7, 0, "div", 28);
    \u0275\u0275elementStart(13, "div", 29)(14, "button", 30);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.undo());
    });
    \u0275\u0275text(15, "Undo repair");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 31);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.saveVersion());
    });
    \u0275\u0275text(17, "Save picture version");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "p", 32);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "details", 33)(21, "summary");
    \u0275\u0275text(22, "Source desk \xB7 pin evidence to this picture");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p");
    \u0275\u0275text(24, "Read the source before deciding what to change. The scene illustration is not proof of its own accuracy.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 34);
    \u0275\u0275repeaterCreate(26, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_For_27_Template, 9, 6, "article", null, _forTrack12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "details", 35)(29, "summary");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 36);
    \u0275\u0275repeaterCreate(32, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_For_33_Template, 3, 5, "button", null, _forTrack12, false, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_ForEmpty_34_Template, 2, 0, "p");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(35, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Conditional_35_Template, 2, 0, "button");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 37)(37, "button", 30);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.downloadComparison());
    });
    \u0275\u0275text(38, "Download before / after");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.toggleExhibit(ctx_r3.work().id));
    });
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.downloadDraft());
    });
    \u0275\u0275text(42, "Download draft");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.mode() === "film" ? 2 : 3);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r3.work().regions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_7_0 = ctx_r3.region()) ? 11 : 12, tmp_7_0);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r3.state().undo.length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.runtime.feedback());
    \u0275\u0275advance();
    \u0275\u0275property("open", ctx_r3.week().week === 1);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r3.sources());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Replay versions (", ctx_r3.trials().length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.trials());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r3.replay() ? 35 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.busy());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((ctx_r3.runtime.state().exhibit ?? \u0275\u0275pureFunction0(10, _c4)).includes(ctx_r3.work().id) ? "Remove from exhibition" : "Add to exhibition");
  }
}
function RestorationWeekWorkspaceComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "details")(7, "summary");
    \u0275\u0275text(8, "All 16 paintings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "label");
    \u0275\u0275text(10, "Open another commission");
    \u0275\u0275elementStart(11, "select", 19);
    \u0275\u0275listener("change", function RestorationWeekWorkspaceComponent_Conditional_21_Template_select_change_11_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.choose($event.target.value));
    });
    \u0275\u0275repeaterCreate(12, RestorationWeekWorkspaceComponent_Conditional_21_For_13_Template, 2, 3, "option", 20, _forTrack12);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(14, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_14_Template, 4, 1, "p", 21);
    \u0275\u0275conditionalCreate(15, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_15_Template, 4, 4)(16, RestorationWeekWorkspaceComponent_Conditional_21_Conditional_16_Template, 43, 11);
  }
  if (rf & 2) {
    let tmp_8_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.scene()?.title ?? ctx_r3.work().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r3.work().location, " \xB7 ", ctx_r3.work().date);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r3.work().id);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.runtime.mission.works);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.extra() ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_8_0 = ctx_r3.scene()) ? 15 : 16, tmp_8_0);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-panorama-painting", 68);
  }
  if (rf & 2) {
    const d_r30 = ctx;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("scene", d_r30)("state", ctx_r3.runtime.sceneState(d_r30.id))("original", true);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-restoration-canvas", 49);
  }
  if (rf & 2) {
    const w_r31 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("definition", w_r31)("state", ctx_r3.runtime.image(w_r31.id))("original", true)("interactive", false);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-panorama-painting", 22);
  }
  if (rf & 2) {
    const d_r32 = ctx;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("scene", d_r32)("state", ctx_r3.runtime.sceneState(d_r32.id));
  }
}
function RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-restoration-canvas", 60);
  }
  if (rf & 2) {
    const w_r31 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("definition", w_r31)("state", ctx_r3.runtime.image(w_r31.id))("interactive", false);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 69);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r31 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.caption(w_r31.id));
  }
}
function RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Museum caption");
    \u0275\u0275elementStart(2, "textarea", 70);
    \u0275\u0275listener("input", function RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_17_Template_textarea_input_2_listener($event) {
      \u0275\u0275restoreView(_r33);
      const w_r31 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.draftCaption(w_r31.id, $event.target.value));
    })("blur", function RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_17_Template_textarea_blur_2_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.saveCaptions());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "div", 29)(4, "button", 30);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_17_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r33);
      const w_r31 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.move(w_r31.id, -1));
    });
    \u0275\u0275text(5, "\u2191 Earlier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 30);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_17_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r33);
      const w_r31 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.move(w_r31.id, 1));
    });
    \u0275\u0275text(7, "\u2193 Later");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_17_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r33);
      const w_r31 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.choose(w_r31.id));
    });
    \u0275\u0275text(9, "Edit picture");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_17_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r33);
      const w_r31 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.toggleExhibit(w_r31.id));
    });
    \u0275\u0275text(11, "Remove");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r33 = \u0275\u0275nextContext();
    const w_r31 = ctx_r33.$implicit;
    const \u0275$index_288_r35 = ctx_r33.$index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r3.caption(w_r31.id));
    \u0275\u0275attribute("aria-label", "Museum caption for " + w_r31.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", \u0275$index_288_r35 === 0);
    \u0275\u0275attribute("aria-label", "Move " + w_r31.title + " earlier");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", \u0275$index_288_r35 === ctx_r3.exhibit().length - 1);
    \u0275\u0275attribute("aria-label", "Move " + w_r31.title + " later");
  }
}
function RestorationWeekWorkspaceComponent_Conditional_22_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 67)(6, "figure");
    \u0275\u0275conditionalCreate(7, RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_7_Template, 1, 3, "app-panorama-painting", 68)(8, RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_8_Template, 1, 4, "app-restoration-canvas", 49);
    \u0275\u0275elementStart(9, "figcaption");
    \u0275\u0275text(10, "Original");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "figure");
    \u0275\u0275conditionalCreate(12, RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_12_Template, 1, 2, "app-panorama-painting", 22)(13, RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_13_Template, 1, 3, "app-restoration-canvas", 60);
    \u0275\u0275elementStart(14, "figcaption");
    \u0275\u0275text(15, "Student reconstruction");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(16, RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_16_Template, 2, 1, "p", 69)(17, RestorationWeekWorkspaceComponent_Conditional_22_For_13_Conditional_17_Template, 12, 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    let tmp_17_0;
    const w_r31 = ctx.$implicit;
    const \u0275$index_288_r35 = ctx.$index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275$index_288_r35 + 1, " \xB7 ", ctx_r3.sceneFor(w_r31.id)?.title ?? w_r31.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", w_r31.location, " \xB7 ", w_r31.date);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_16_0 = ctx_r3.sceneFor(w_r31.id)) ? 7 : 8, tmp_16_0);
    \u0275\u0275advance(5);
    \u0275\u0275conditional((tmp_17_0 = ctx_r3.sceneFor(w_r31.id)) ? 12 : 13, tmp_17_0);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r3.presentation() ? 16 : 17);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_22_ForEmpty_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 64);
    \u0275\u0275text(1, "Your exhibition is empty. Choose a picture below to add it. Returning to this session keeps your empty draft.");
    \u0275\u0275elementEnd();
  }
}
function RestorationWeekWorkspaceComponent_Conditional_22_Conditional_15_For_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 73);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r37 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("value", w_r37.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(w_r37.title);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_22_Conditional_15_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, RestorationWeekWorkspaceComponent_Conditional_22_Conditional_15_For_6_Conditional_0_Template, 2, 2, "option", 73);
  }
  if (rf & 2) {
    const w_r37 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(!(ctx_r3.runtime.state().exhibit ?? \u0275\u0275pureFunction0(1, _c4)).includes(w_r37.id) ? 0 : -1);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_22_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 65);
    \u0275\u0275text(1, "Add a painting");
    \u0275\u0275elementStart(2, "select", 71);
    \u0275\u0275listener("change", function RestorationWeekWorkspaceComponent_Conditional_22_Conditional_15_Template_select_change_2_listener($event) {
      \u0275\u0275restoreView(_r36);
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.runtime.toggleExhibit($event.target.value);
      return \u0275\u0275resetView($event.target.value = "");
    });
    \u0275\u0275elementStart(3, "option", 72);
    \u0275\u0275text(4, "Choose from the collection\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, RestorationWeekWorkspaceComponent_Conditional_22_Conditional_15_For_6_Template, 1, 2, null, null, _forTrack12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r3.runtime.mission.works);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 13)(1, "div", 61)(2, "div")(3, "p", 6);
    \u0275\u0275text(4, "YOUR GALLERY");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6, "History, back in the picture");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_22_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r3 = \u0275\u0275nextContext();
      ctx_r3.saveCaptions();
      return \u0275\u0275resetView(ctx_r3.presentation.set(!ctx_r3.presentation()));
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "p", 62);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 63);
    \u0275\u0275repeaterCreate(12, RestorationWeekWorkspaceComponent_Conditional_22_For_13_Template, 18, 7, "article", null, _forTrack12, false, RestorationWeekWorkspaceComponent_Conditional_22_ForEmpty_14_Template, 2, 0, "p", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, RestorationWeekWorkspaceComponent_Conditional_22_Conditional_15_Template, 7, 0, "label", 65);
    \u0275\u0275elementStart(16, "div", 37)(17, "button", 66);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_22_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.downloadExhibit());
    });
    \u0275\u0275text(18, "Download illustrated exhibition");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 10);
    \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Conditional_22_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.downloadDraft());
    });
    \u0275\u0275text(20, "Download draft");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275attribute("aria-pressed", ctx_r3.presentation());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.presentation() ? "Edit exhibition" : "Preview exhibition");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r3.runtime.state().sampleWorkIds.length ? "Sample starting exhibition: example images and captions were added only for untouched work. Edit, remove or replace them." : "Your local exhibition draft. Add paintings, arrange them, and write museum captions.", " No earlier work is marked complete.");
    \u0275\u0275advance();
    \u0275\u0275classProp("presentation", ctx_r3.presentation());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.exhibit());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!ctx_r3.presentation() ? 15 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.busy() || !ctx_r3.exhibit().length);
  }
}
function RestorationWeekWorkspaceComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r38 = ctx.$implicit;
    const \u0275$index_383_r39 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_383_r39 ? "Group activity" : "Individual exploration");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r38.product);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_42_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const person_r40 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Selected person: ", person_r40.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(person_r40.activity);
  }
}
function RestorationWeekWorkspaceComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Scene questions belong here. The scene has no question buttons or chat form.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, RestorationWeekWorkspaceComponent_Conditional_42_Conditional_2_Template, 4, 2);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_3_0 = ctx_r3.activePerson()) ? 2 : -1, tmp_3_0);
  }
}
function RestorationWeekWorkspaceComponent_For_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const question_r41 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(question_r41);
  }
}
function RestorationWeekWorkspaceComponent_For_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const evidence_r42 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(evidence_r42);
  }
}
function RestorationWeekWorkspaceComponent_For_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const control_r43 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(control_r43);
  }
}
var RestorationWeekWorkspaceComponent = class _RestorationWeekWorkspaceComponent {
  runtime = inject(RestorationPreviewRuntime);
  lesson = signal(
    1,
    ...ngDevMode ? [{ debugName: "lesson" }] : (
      /* istanbul ignore next */
      []
    )
  );
  week = computed(
    () => this.runtime.config.weeks[Math.floor((this.lesson() - 1) / 2)],
    ...ngDevMode ? [{ debugName: "week" }] : (
      /* istanbul ignore next */
      []
    )
  );
  session = computed(
    () => this.week().sessions[(this.lesson() - 1) % 2],
    ...ngDevMode ? [{ debugName: "session" }] : (
      /* istanbul ignore next */
      []
    )
  );
  work = computed(
    () => this.runtime.mission.works.find((w) => w.id === (this.runtime.state().selectedByLesson[this.lesson()] ?? this.session().workId)),
    ...ngDevMode ? [{ debugName: "work" }] : (
      /* istanbul ignore next */
      []
    )
  );
  state = computed(
    () => this.runtime.image(this.work().id),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scene = computed(
    () => this.sceneFor(this.work().id),
    ...ngDevMode ? [{ debugName: "scene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activePerson = computed(
    () => {
      const d = this.scene();
      return d?.people.find((p) => p.id === this.runtime.sceneState(d.id).selectedPersonId);
    },
    ...ngDevMode ? [{ debugName: "activePerson" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tutorPanel = viewChild(
    "tutorPanel",
    ...ngDevMode ? [{ debugName: "tutorPanel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  openTutor() {
    const panel = this.tutorPanel()?.nativeElement;
    if (panel) {
      panel.open = true;
      panel.scrollIntoView({ block: "nearest" });
      panel.focus({ preventScroll: true });
    }
  }
  sceneFor(workId) {
    return this.runtime.config.scenes?.find((s) => s.workId === workId);
  }
  extra = computed(
    () => this.work().id !== this.session().workId,
    ...ngDevMode ? [{ debugName: "extra" }] : (
      /* istanbul ignore next */
      []
    )
  );
  region = computed(
    () => this.work().regions.find((r) => r.id === this.state().selectedRegionId),
    ...ngDevMode ? [{ debugName: "region" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sources = computed(
    () => this.runtime.mission.sourceGallery.evidence.filter((e) => (this.region()?.evidenceIds ?? this.work().regions.flatMap((r) => r.evidenceIds)).includes(e.id)),
    ...ngDevMode ? [{ debugName: "sources" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pinnedSources = computed(
    () => this.runtime.state().sources[this.work().id] ?? [],
    ...ngDevMode ? [{ debugName: "pinnedSources" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filmTime = computed(
    () => this.runtime.state().filmTimes[this.lesson()] ?? 0,
    ...ngDevMode ? [{ debugName: "filmTime" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mode = signal(
    "picture",
    ...ngDevMode ? [{ debugName: "mode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  compare = signal(
    false,
    ...ngDevMode ? [{ debugName: "compare" }] : (
      /* istanbul ignore next */
      []
    )
  );
  wipe = signal(
    50,
    ...ngDevMode ? [{ debugName: "wipe" }] : (
      /* istanbul ignore next */
      []
    )
  );
  zoom = signal(
    false,
    ...ngDevMode ? [{ debugName: "zoom" }] : (
      /* istanbul ignore next */
      []
    )
  );
  guides = signal(
    true,
    ...ngDevMode ? [{ debugName: "guides" }] : (
      /* istanbul ignore next */
      []
    )
  );
  replayId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "replayId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  trials = computed(
    () => this.runtime.state().trials[this.work().id] ?? [],
    ...ngDevMode ? [{ debugName: "trials" }] : (
      /* istanbul ignore next */
      []
    )
  );
  replay = computed(
    () => this.trials().find((t) => t.id === this.replayId()),
    ...ngDevMode ? [{ debugName: "replay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  displayState = computed(
    () => this.replay()?.state ?? this.state(),
    ...ngDevMode ? [{ debugName: "displayState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  exhibit = computed(
    () => (this.runtime.state().exhibit ?? []).map((id) => this.runtime.mission.works.find((w) => w.id === id)),
    ...ngDevMode ? [{ debugName: "exhibit" }] : (
      /* istanbul ignore next */
      []
    )
  );
  captionDrafts = signal(
    {},
    ...ngDevMode ? [{ debugName: "captionDrafts" }] : (
      /* istanbul ignore next */
      []
    )
  );
  presentation = signal(
    false,
    ...ngDevMode ? [{ debugName: "presentation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  busy = signal(
    false,
    ...ngDevMode ? [{ debugName: "busy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  message = signal(
    "",
    ...ngDevMode ? [{ debugName: "message" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspector = viewChild(
    "inspector",
    ...ngDevMode ? [{ debugName: "inspector" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filmPlayer = viewChild(
    RestorationSceneFilmComponent,
    ...ngDevMode ? [{ debugName: "filmPlayer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sessionHeading = viewChild(
    "sessionHeading",
    ...ngDevMode ? [{ debugName: "sessionHeading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  focusTimer;
  constructor() {
    bindLessonFocus((l) => this.openLesson(l.number));
    inject(DestroyRef).onDestroy(() => {
      if (this.focusTimer)
        clearTimeout(this.focusTimer);
      this.saveFilmPosition();
      this.saveCaptions();
    });
  }
  openLesson(number) {
    if (!Number.isInteger(number) || number < 1 || number > 8)
      return;
    this.saveFilmPosition();
    this.saveCaptions();
    this.lesson.set(number);
    this.replayId.set(void 0);
    this.zoom.set(false);
    this.presentation.set(false);
    this.compare.set(this.session().activity === "compare");
    this.mode.set(this.session().activity === "exhibit" ? "exhibit" : "picture");
    if (this.mode() === "exhibit")
      this.runtime.ensureExhibit();
    if (this.focusTimer)
      clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      const heading = this.sessionHeading()?.nativeElement;
      heading?.scrollIntoView?.({ block: "start", behavior: "instant" });
      heading?.focus({ preventScroll: true });
    });
  }
  choose(id) {
    this.saveFilmPosition();
    this.saveCaptions();
    this.runtime.select(this.lesson(), id);
    this.mode.set("picture");
    this.replayId.set(void 0);
    this.zoom.set(false);
  }
  inspect(id) {
    this.mode.set("picture");
    this.replayId.set(void 0);
    this.runtime.repair(this.work().id, { type: "inspect", regionId: id });
    setTimeout(() => {
      const panel = this.inspector()?.nativeElement;
      panel?.scrollIntoView?.({ block: "nearest", behavior: "instant" });
      panel?.focus({ preventScroll: true });
    });
  }
  edit(optionId) {
    if (!this.region())
      return;
    this.showPicture();
    this.replayId.set(void 0);
    this.runtime.repair(this.work().id, { type: "edit", regionId: this.region().id, optionId });
  }
  option(id) {
    const region = this.work().regions.find((r) => r.id === id);
    return selectedRepair(region, this.state()).id;
  }
  showFilm() {
    this.choose(this.session().workId);
    this.mode.set("film");
  }
  showExhibit() {
    this.saveFilmPosition();
    this.runtime.ensureExhibit();
    this.mode.set("exhibit");
  }
  showPicture() {
    this.saveFilmPosition();
    this.mode.set("picture");
  }
  undo() {
    this.showPicture();
    this.replayId.set(void 0);
    this.runtime.repair(this.work().id, { type: "undo" });
  }
  saveVersion() {
    this.showPicture();
    this.runtime.saveTrial(this.work().id);
  }
  saveFilmPosition() {
    const film = this.filmPlayer();
    if (film)
      this.runtime.saveFilmTime(this.lesson(), film.time());
  }
  caption(id) {
    return this.captionDrafts()[id] ?? this.runtime.state().captions[id] ?? "";
  }
  draftCaption(id, text) {
    this.captionDrafts.update((d) => __spreadProps(__spreadValues({}, d), { [id]: text }));
  }
  saveCaptions() {
    for (const [id, text] of Object.entries(this.captionDrafts()))
      this.runtime.caption(id, text);
    this.captionDrafts.set({});
  }
  async downloadComparison() {
    this.busy.set(true);
    this.message.set("");
    try {
      downloadFile(await comparisonImage(this.work(), this.displayState()), `${this.work().id}-comparison.png`);
      this.message.set("Before-and-after image downloaded.");
    } catch {
      this.message.set("The image export could not load its artwork. Try again after the picture has loaded.");
    } finally {
      this.busy.set(false);
    }
  }
  downloadDraft() {
    this.saveCaptions();
    downloadFile(new Blob([JSON.stringify(this.runtime.state(), null, 2)], { type: "application/json" }), `${this.runtime.mission.projectId}-preview-draft.json`);
  }
  async downloadExhibit() {
    this.saveCaptions();
    this.busy.set(true);
    this.message.set("Preparing your illustrated exhibition\u2026");
    try {
      const sections = [];
      for (const work of this.exhibit()) {
        const scene = this.sceneFor(work.id);
        const before = scene ? await renderPanoramaPainting(scene, this.runtime.sceneState(scene.id), true) : await renderRestoration(work, this.runtime.image(work.id), true, 640);
        const after = scene ? await renderPanoramaPainting(scene, this.runtime.sceneState(scene.id)) : await renderRestoration(work, this.runtime.image(work.id), false, 640);
        const sources = scene ? scene.sources.filter((e) => this.runtime.sceneState(scene.id).collected.includes(e.id)).map((e) => ({ sourceTitle: e.title, sourceUrl: e.url, text: e.text })) : this.runtime.mission.sourceGallery.evidence.filter((e) => this.runtime.state().sources[work.id]?.includes(e.id));
        sections.push(`<article><h2>${escapeHtml(work.title)}</h2><p>${escapeHtml(work.location)} \xB7 ${escapeHtml(work.date)}</p><div class="pair"><figure><img src="${before.toDataURL()}" alt="Original teaching reconstruction"><figcaption>Original teaching reconstruction</figcaption></figure><figure><img src="${after.toDataURL()}" alt="Student reconstruction"><figcaption>Student reconstruction</figcaption></figure></div><p class="caption">${escapeHtml(this.caption(work.id))}</p><small>${escapeHtml(work.attribution)}</small>${sources.map((s) => `<p><a href="${escapeHtml(s.sourceUrl)}">${escapeHtml(s.sourceTitle)}</a> \u2014 ${escapeHtml(s.text)}</p>`).join("")}</article>`);
      }
      const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Historical reconstruction gallery</title><style>body{max-width:1050px;margin:auto;padding:24px;background:#f6f0e2;color:#203b30;font:17px/1.6 system-ui}h1,h2{font-family:Georgia}article{border-top:1px solid #89794b;margin-top:36px;padding-top:24px}.pair{display:flex;gap:18px}figure{flex:1;min-width:0;margin:0}img{width:100%}.caption{white-space:pre-wrap}small{font-size:12px}@media(max-width:600px){.pair{display:block}}</style><h1>History, back in the picture</h1><p>Editable classroom exhibition \xB7 Student historical reconstructions. These illustrations are not historical photographs. No assessment or completion is recorded.</p>${sections.join("")}</html>`;
      downloadFile(new Blob([html], { type: "text/html" }), `${this.runtime.mission.projectId}-preview-exhibition.html`);
      this.message.set("Illustrated exhibition downloaded with your pictures, captions and pinned sources.");
    } catch {
      this.message.set("The exhibition export could not load an image. Your draft is retained; try again or download the draft.");
    } finally {
      this.busy.set(false);
    }
  }
  static \u0275fac = function RestorationWeekWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RestorationWeekWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RestorationWeekWorkspaceComponent, selectors: [["app-restoration-week-workspace"]], viewQuery: function RestorationWeekWorkspaceComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.tutorPanel, _c06, 5)(ctx.inspector, _c15, 5)(ctx.filmPlayer, RestorationSceneFilmComponent, 5)(ctx.sessionHeading, _c22, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(4);
    }
  }, decls: 60, vars: 14, consts: [["sessionHeading", ""], ["tutorPanel", ""], ["inspector", ""], [1, "week-workspace"], ["aria-label", "Interactive picture restoration workspace", 1, "activity"], [1, "mission-header"], [1, "eyebrow"], ["tabindex", "-1", 1, "session-heading"], ["aria-label", "Project steps", 1, "directions"], ["aria-label", "Activity tools", 1, "tools"], [3, "click"], ["role", "alert", 1, "warning"], ["role", "status", 1, "notice"], ["aria-label", "Visual exhibition builder", 1, "exhibition"], ["aria-label", "Weekly planning", 1, "planning"], ["open", "", 1, "products"], ["tabindex", "-1", "open", "", 1, "tutor"], [1, "preview-note"], [1, "work-bar"], ["aria-label", "Restoration painting", 3, "change", "value"], [3, "value", "selected"], [1, "extra"], [3, "scene", "state"], [3, "action", "tutorRequested", "scene", "state"], [1, "studio-grid"], [1, "visual"], ["tabindex", "-1", "aria-label", "Selected picture detail", 1, "inspector"], [1, "detail-buttons"], [1, "start-card"], [1, "edit-actions"], [3, "click", "disabled"], [1, "primary", 3, "click"], ["role", "status", 1, "feedback"], [1, "sources", 3, "open"], [1, "source-grid"], [1, "replays"], [1, "trial-list"], [1, "downloads"], [3, "film", "startTime"], [3, "position", "region", "film", "startTime"], [1, "image-viewport"], [1, "image-wrap"], [3, "select", "definition", "state", "interactive", "guides"], ["aria-hidden", "true", 1, "original-layer", 3, "clip-path"], [1, "replay-tag"], [1, "wipe-control"], [1, "picture-tools"], [1, "media-note"], ["aria-hidden", "true", 1, "original-layer"], [3, "definition", "state", "original", "interactive"], [1, "image-tag", "before"], [1, "image-tag", "after"], [1, "wipe-line"], ["aria-label", "Before and after comparison", "type", "range", "min", "0", "max", "100", 3, "input", "value"], [1, "claim"], ["aria-label", "Image repair choices", 1, "repair-options"], ["alt", "", 3, "src"], ["aria-hidden", "true", 1, "option-icon"], ["aria-hidden", "true"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], [3, "definition", "state", "interactive"], [1, "exhibit-heading"], [1, "sample-note"], [1, "exhibit-grid"], [1, "empty-gallery"], [1, "add-picture"], [1, "primary", 3, "click", "disabled"], [1, "exhibit-pair"], [3, "scene", "state", "original"], [1, "museum-caption"], ["rows", "3", "maxlength", "1500", "placeholder", "Write the label your gallery visitors will read.", 3, "input", "blur", "value"], ["aria-label", "Add a painting to exhibition", 3, "change"], ["value", ""], [3, "value"]], template: function RestorationWeekWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 3)(1, "section", 4)(2, "header", 5)(3, "p", 6);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1", 7, 0);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p");
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "ol", 8);
      \u0275\u0275repeaterCreate(11, RestorationWeekWorkspaceComponent_For_12_Template, 5, 2, "li", null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "nav", 9)(14, "button", 10);
      \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Template_button_click_14_listener() {
        return ctx.showPicture();
      });
      \u0275\u0275text(15, "\u2315 Inspect & repair");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, RestorationWeekWorkspaceComponent_Conditional_16_Template, 2, 1, "button");
      \u0275\u0275elementStart(17, "button", 10);
      \u0275\u0275listener("click", function RestorationWeekWorkspaceComponent_Template_button_click_17_listener() {
        return ctx.showExhibit();
      });
      \u0275\u0275text(18, "\u25A7 Build exhibition");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(19, RestorationWeekWorkspaceComponent_Conditional_19_Template, 4, 1, "p", 11);
      \u0275\u0275conditionalCreate(20, RestorationWeekWorkspaceComponent_Conditional_20_Template, 2, 1, "p", 12);
      \u0275\u0275conditionalCreate(21, RestorationWeekWorkspaceComponent_Conditional_21_Template, 17, 6)(22, RestorationWeekWorkspaceComponent_Conditional_22_Template, 21, 8, "section", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "aside", 14)(24, "details", 15)(25, "summary");
      \u0275\u0275text(26, "Proposed weekly products");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "p", 6);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "ul");
      \u0275\u0275repeaterCreate(30, RestorationWeekWorkspaceComponent_For_31_Template, 5, 2, "li", null, _forTrack07);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "p");
      \u0275\u0275text(33, "Potential deliverables. No submission or completion is required in this preview. Group activities use local drafts; shared editing is deferred.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "details", 16, 1)(36, "summary");
      \u0275\u0275text(37, "AI Tutor ");
      \u0275\u0275elementStart(38, "span");
      \u0275\u0275text(39, "Disconnected");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "p");
      \u0275\u0275text(41, "Builder planning only. No AI review, adaptation or mastery recording is connected.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(42, RestorationWeekWorkspaceComponent_Conditional_42_Template, 3, 1);
      \u0275\u0275elementStart(43, "h3");
      \u0275\u0275text(44, "Questions & concepts");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "ul");
      \u0275\u0275repeaterCreate(46, RestorationWeekWorkspaceComponent_For_47_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "h3");
      \u0275\u0275text(49, "Evidence to inspect");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "ul");
      \u0275\u0275repeaterCreate(51, RestorationWeekWorkspaceComponent_For_52_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "h3");
      \u0275\u0275text(54, "Future model controls");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "ul");
      \u0275\u0275repeaterCreate(56, RestorationWeekWorkspaceComponent_For_57_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "p", 17);
      \u0275\u0275text(59, "Local authoring preview \xB7 All sessions and paintings accessible. Drafts save in this browser.");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275attribute("data-week", ctx.week().week);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate2("THE RESTORATION STUDIO \xB7 WEEK ", ctx.week().week, " \xB7 ", ctx.lesson() % 2 ? "INDIVIDUAL EXPLORATION" : "GROUP ACTIVITY");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.session().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.week().setting);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.session().steps);
      \u0275\u0275advance(3);
      \u0275\u0275attribute("aria-pressed", ctx.mode() === "picture");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.scene() ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-pressed", ctx.mode() === "exhibit");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.runtime.warning() ? 19 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.message() ? 20 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.mode() !== "exhibit" ? 21 : 22);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate2("WEEK ", ctx.week().week, " \xB7 ", ctx.week().title);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.week().sessions);
      \u0275\u0275advance(12);
      \u0275\u0275conditional(ctx.scene()?.questionOwner === "tutor" ? 42 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.week().questions);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.week().evidence);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.week().controls);
    }
  }, dependencies: [PaintingCanvasComponent, RestorationSceneFilmComponent, PanoramaEncounterComponent, PanoramaPaintingComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  background: #10281f;\n  color: #f4ead5;\n  font-family: Arial, sans-serif;\n  min-height: 100vh;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.week-workspace[_ngcontent-%COMP%] {\n  --%NS%gold:#efd094;\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(270px, 3fr);\n  gap: 24px;\n  max-width: 1580px;\n  margin: auto;\n  padding: 24px 28px 40px;\n}\n.activity[_ngcontent-%COMP%], \n.planning[_ngcontent-%COMP%], \n.visual[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.mission-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 7px 0;\n  color: #c4d4c5;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 10px !important;\n  letter-spacing: 1.7px;\n  line-height: 1.6;\n  color: var(--%NS%gold) !important;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-weight: 400;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: clamp(27px, 2.8vw, 40px);\n  margin: 5px 0;\n  line-height: 1.13;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin: 10px 0;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 21px;\n  margin: 8px 0;\n}\np[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.6;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 1px solid #627e67;\n  border-radius: 6px;\n  background: #264434;\n  color: #fbefd5;\n  padding: 9px 12px;\n  font-size: 13px;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #345c43;\n  border-color: #e0c187;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #4a5a38;\n  border-color: var(--%NS%gold);\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #f8d784;\n  outline-offset: 3px;\n}\na[_ngcontent-%COMP%] {\n  color: #f0d08c;\n  overflow-wrap: anywhere;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: var(--%NS%gold);\n  color: #1b3026;\n  border-color: var(--%NS%gold);\n  font-weight: 700;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 44px;\n  padding: 12px 0;\n  line-height: 1.4;\n  font-size: 14px;\n  font-weight: 700;\n}\nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  max-width: 100%;\n  width: 100%;\n  padding: 10px;\n  background: #102a20;\n  color: #f5ead4;\n  border: 1px solid #78937a;\n  border-radius: 5px;\n  font-size: 14px;\n  min-height: 44px;\n}\ntextarea[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 8px;\n  resize: vertical;\n  line-height: 1.55;\n}\nlabel[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.5;\n}\n.directions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 10px;\n  list-style: none;\n  margin: 20px 0 15px;\n  padding: 0;\n}\n.directions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 9px;\n  align-items: flex-start;\n  border-top: 1px solid #527057;\n  padding-top: 11px;\n  font-size: 13px;\n  line-height: 1.5;\n  color: #d8e0d1;\n}\n.directions[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  flex: none;\n  display: grid;\n  place-items: center;\n  width: 25px;\n  height: 25px;\n  border-radius: 50%;\n  background: #dbc18b;\n  color: #1c3024;\n}\n.tools[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-bottom: 15px;\n}\n.work-bar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 13px 0;\n  border-top: 1px solid #49634e;\n}\n.work-bar[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font: 20px Georgia;\n}\n.work-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: #b9cbb9;\n  margin-top: 5px;\n}\n.work-bar[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  max-width: 310px;\n}\n.work-bar[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  font-weight: 400;\n  font-size: 12px;\n}\n.work-bar[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.studio-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 235px;\n  gap: 17px;\n  align-items: start;\n}\n.image-viewport[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  border: 7px solid #927e50;\n  box-shadow: 0 0 0 1px #d2b37a, inset 0 0 16px #000;\n  isolation: isolate;\n  background: #142c20;\n}\n.image-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  transition: transform 0.25s ease;\n}\n.original-layer[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\n.wipe-line[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 2px;\n  background: white;\n  pointer-events: none;\n}\n.image-tag[_ngcontent-%COMP%], \n.replay-tag[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  padding: 5px 8px;\n  border-radius: 3px;\n  background: rgba(17, 43, 36, 0.9098039216);\n  font-size: 11px;\n  color: #fff;\n  pointer-events: none;\n}\n.before[_ngcontent-%COMP%] {\n  left: 9px;\n}\n.after[_ngcontent-%COMP%] {\n  right: 9px;\n}\n.replay-tag[_ngcontent-%COMP%] {\n  bottom: 10px;\n  top: auto;\n  left: 8px;\n}\n.wipe-control[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin: 13px 0 5px;\n  color: #eddbb4;\n}\n.wipe-control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 30px;\n  accent-color: var(--%NS%gold);\n}\n.picture-tools[_ngcontent-%COMP%], \n.edit-actions[_ngcontent-%COMP%], \n.downloads[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n  margin: 12px 0;\n}\n.picture-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n  padding: 8px;\n}\n.media-note[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #b8c9b5;\n  margin: 8px 0;\n}\n.inspector[_ngcontent-%COMP%] {\n  background: #1b3829;\n  border: 1px solid #506c50;\n  border-radius: 8px;\n  padding: 14px;\n  scroll-margin: 80px;\n}\n.inspector[_ngcontent-%COMP%]:focus {\n  outline: 2px solid #d4be86;\n  outline-offset: 2px;\n}\n.inspector[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n}\n.detail-buttons[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n}\n.detail-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 12px;\n}\n.inspector[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.inspector[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.6;\n}\n.claim[_ngcontent-%COMP%] {\n  border-left: 2px solid #d4b579;\n  padding-left: 10px;\n}\n.claim[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #f0dab3;\n  font-weight: 400;\n  margin-top: 5px;\n}\n.repair-options[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n}\n.repair-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 9px;\n  align-items: center;\n  text-align: left;\n  padding: 9px;\n}\n.repair-options[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], \n.option-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 44px;\n  object-fit: contain;\n  flex: none;\n  background: #10291d;\n  border-radius: 4px;\n}\n.option-icon[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  font-size: 26px;\n  color: var(--%NS%gold);\n}\n.repair-options[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n}\n.repair-options[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  line-height: 1.4;\n  margin-top: 4px;\n  color: #e1e7d5;\n}\n.edit-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 12px;\n}\n.start-card[_ngcontent-%COMP%] {\n  padding: 18px 0;\n}\n.start-card[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 40px;\n  color: var(--%NS%gold);\n}\n.feedback[_ngcontent-%COMP%] {\n  color: #f1d297;\n  min-height: 18px;\n}\n.sources[_ngcontent-%COMP%], \n.replays[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  border: 1px solid #4e6b50;\n  border-radius: 8px;\n  padding: 0 16px 10px;\n}\n.sources[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.source-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n.source-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border-top: 1px solid #547254;\n  padding: 12px 0;\n}\n.source-grid[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.source-grid[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.source-grid[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  line-height: 1.5;\n  margin-bottom: 10px;\n}\n.source-grid[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.trial-list[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  overflow: auto;\n  padding: 8px 2px;\n}\n.trial-list[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  width: 125px;\n  flex: none;\n  padding: 6px;\n  line-height: 2;\n}\n.planning[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.planning[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  border: 1px solid #5d7358;\n  background: #1c372a;\n  border-radius: 10px;\n  padding: 6px 19px 15px;\n}\n.planning[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  font: 21px Georgia;\n  min-height: 51px;\n  line-height: 1.5;\n}\n.planning[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding-left: 18px;\n}\n.planning[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.65;\n  color: #d4dfd0;\n  margin: 9px 0;\n}\n.planning[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #b9cbb8;\n}\n.products[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #f0d396;\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  margin-bottom: 4px;\n}\n.products[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n.tutor[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-block;\n  font: 10px Arial;\n  padding: 5px 7px;\n  border: 1px solid #829177;\n  border-radius: 20px;\n  margin-left: 7px;\n  vertical-align: middle;\n  color: #d6d9c5;\n}\n.tutor[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: Arial;\n  font-size: 12px;\n  font-weight: 700;\n  color: #f2d6a0;\n  border-top: 1px solid #4c674d;\n  padding-top: 15px;\n  margin-top: 20px;\n}\n.preview-note[_ngcontent-%COMP%] {\n  padding: 0 10px;\n}\n.exhibition[_ngcontent-%COMP%] {\n  border: 1px solid #5f7658;\n  border-radius: 10px;\n  padding: 20px;\n  background: #182f24;\n}\n.exhibit-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 15px;\n  align-items: center;\n}\n.exhibit-heading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: none;\n}\n.sample-note[_ngcontent-%COMP%], \n.extra[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #d1ddc9;\n  background: #2a4030;\n  border-left: 3px solid #debe80;\n  padding: 12px;\n}\n.exhibit-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 20px;\n}\n.exhibit-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border-top: 1px solid #627356;\n  padding-top: 18px;\n}\n.exhibit-grid[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #baccb5;\n  font-size: 12px;\n}\n.exhibit-pair[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 15px;\n  margin: 14px 0;\n}\n.exhibit-pair[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%] {\n  margin: 0;\n  min-width: 0;\n}\n.exhibit-pair[_ngcontent-%COMP%]   figcaption[_ngcontent-%COMP%] {\n  font-size: 12px;\n  padding: 7px 0;\n  color: #dac89e;\n}\n.museum-caption[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n}\n.add-picture[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 430px;\n  margin: 22px 0;\n}\n.add-picture[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  margin-top: 7px;\n}\n.notice[_ngcontent-%COMP%], \n.warning[_ngcontent-%COMP%] {\n  padding: 12px;\n  background: #3d452a;\n  border: 1px solid #baab76;\n  border-radius: 6px;\n  font-size: 13px;\n}\n.empty-gallery[_ngcontent-%COMP%] {\n  padding: 30px 10px;\n  text-align: center;\n}\n.extra[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin: 5px;\n}\n[data-week="2"][_ngcontent-%COMP%] {\n  --%NS%gold:#e7ba84;\n}\n[data-week="3"][_ngcontent-%COMP%] {\n  --%NS%gold:#a8d8d5;\n}\n[data-week="4"][_ngcontent-%COMP%] {\n  --%NS%gold:#e2c3e6;\n}\n@media (min-width: 1500px) {\n  .studio-grid[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 280px;\n  }\n}\n@media (max-width: 1100px) {\n  .week-workspace[_ngcontent-%COMP%] {\n    gap: 16px;\n    padding-inline: 18px;\n    grid-template-columns: minmax(0, 7fr) minmax(240px, 3fr);\n  }\n  .studio-grid[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .inspector[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .repair-options[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n  .repair-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .detail-buttons[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .directions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 5px;\n  }\n  .directions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    border: 0;\n    padding-top: 0;\n  }\n  .image-viewport[_ngcontent-%COMP%] {\n    max-width: 600px;\n    margin: auto;\n  }\n}\n@media (max-width: 800px) {\n  .week-workspace[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding: 24px 18px 30px;\n  }\n  .planning[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 12px;\n  }\n  .preview-note[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n  }\n  .directions[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n  .work-bar[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n  .exhibit-heading[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n@media (max-width: 540px) {\n  .week-workspace[_ngcontent-%COMP%] {\n    padding-inline: 12px;\n  }\n  .planning[_ngcontent-%COMP%], \n   .directions[_ngcontent-%COMP%], \n   .source-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .mission-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n    font-size: 12px;\n    padding: 8px;\n  }\n  .work-bar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .work-bar[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: none;\n  }\n  .repair-options[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .repair-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex-direction: row;\n  }\n  .directions[_ngcontent-%COMP%] {\n    margin-top: 15px;\n  }\n  .exhibition[_ngcontent-%COMP%] {\n    padding: 13px;\n  }\n  .exhibit-pair[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .exhibit-pair[_ngcontent-%COMP%]   figcaption[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .downloads[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .planning[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n    padding-inline: 15px;\n  }\n  .picture-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .image-viewport[_ngcontent-%COMP%] {\n    border-width: 5px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .image-wrap[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n.session-heading[_ngcontent-%COMP%] {\n  scroll-margin-top: 130px;\n}\n.session-heading[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n@media (max-width: 900px) {\n  .session-heading[_ngcontent-%COMP%] {\n    scroll-margin-top: 170px;\n  }\n}\n@media (max-width: 600px) {\n  .session-heading[_ngcontent-%COMP%] {\n    scroll-margin-top: 260px;\n  }\n}\n/*# sourceMappingURL=restoration-week-workspace.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RestorationWeekWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-restoration-week-workspace", imports: [PaintingCanvasComponent, RestorationSceneFilmComponent, PanoramaEncounterComponent, PanoramaPaintingComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<main class="week-workspace" [attr.data-week]="week().week">\r
  <section class="activity" aria-label="Interactive picture restoration workspace">\r
    <header class="mission-header">\r
      <p class="eyebrow">THE RESTORATION STUDIO \xB7 WEEK {{ week().week }} \xB7 {{ lesson() % 2 ? 'INDIVIDUAL EXPLORATION' : 'GROUP ACTIVITY' }}</p>\r
      <h1 #sessionHeading class="session-heading" tabindex="-1">{{ session().title }}</h1>\r
      <p>{{ week().setting }}</p>\r
    </header>\r
    <ol class="directions" aria-label="Project steps">\r
      @for (step of session().steps; track $index) { <li><b>{{ $index + 1 }}</b><span>{{ step }}</span></li> }\r
    </ol>\r
    <nav class="tools" aria-label="Activity tools">\r
      <button [attr.aria-pressed]="mode() === 'picture'" (click)="showPicture()">\u2315 Inspect & repair</button>\r
      @if (!scene()) { <button [attr.aria-pressed]="mode() === 'film'" (click)="showFilm()">Inspect still-image study</button> }
      <button [attr.aria-pressed]="mode() === 'exhibit'" (click)="showExhibit()">\u25A7 Build exhibition</button>\r
    </nav>\r
    @if (runtime.warning()) { <p class="warning" role="alert">{{ runtime.warning() }} <button (click)="downloadDraft()">Download draft</button></p> }\r
    @if (message()) { <p class="notice" role="status">{{ message() }}</p> }\r
    @if (mode() !== 'exhibit') {\r
      <div class="work-bar"><div><strong>{{ scene()?.title ?? work().title }}</strong><span>{{ work().location }} \xB7 {{ work().date }}</span></div><details><summary>All 16 paintings</summary><label>Open another commission<select aria-label="Restoration painting" [value]="work().id" (change)="choose($any($event.target).value)">@for (w of runtime.mission.works; track w.id) { <option [value]="w.id" [selected]="w.id === work().id">{{ w.title }}</option> }</select></label></details></div>\r
      @if (extra()) { <p class="extra">Extra commission open. The steps and planning boxes describe Week {{ week().week }}; the repair tools and sources below match this picture. <button (click)="choose(session().workId)">Return to session picture</button></p> }\r
      @if (scene(); as activeScene) {\r
        @for (d of [activeScene]; track d.id) { <app-panorama-encounter [scene]="d" [state]="runtime.sceneState(d.id)" (action)="runtime.sceneAction(d.id, $event)" (tutorRequested)="openTutor()" /> }\r
        <button (click)="runtime.toggleExhibit(work().id)">{{ (runtime.state().exhibit ?? []).includes(work().id) ? 'Remove from exhibition' : 'Add restored picture to exhibition' }}</button>\r
      } @else {\r
      <div class="studio-grid">\r
        <div class="visual">\r
          @if (mode() === 'film') {\r
            @for (filmSession of [session()]; track filmSession.workId) { <app-restoration-scene-film [film]="filmSession.film" [startTime]="filmTime()" (position)="runtime.saveFilmTime(lesson(), $event)" (region)="inspect($event)" /> }\r
          } @else {\r
            <div class="image-viewport">\r
              <div class="image-wrap" [style.transform]="zoom() ? 'scale(1.65)' : 'scale(1)'" [style.transform-origin]="region() ? (region()!.x + region()!.width / 2) + '% ' + (region()!.y + region()!.height / 2) + '%' : 'center'">\r
                <app-restoration-canvas [definition]="work()" [state]="displayState()" [interactive]="!replay()" [guides]="guides()" (select)="inspect($event)" />\r
                @if (compare()) { <div class="original-layer" [style.clip-path]="'inset(0 ' + (100 - wipe()) + '% 0 0)'" aria-hidden="true"><app-restoration-canvas [definition]="work()" [state]="displayState()" [original]="true" [interactive]="false" /></div> }\r
              </div>\r
              @if (compare()) { <span class="image-tag before">Original</span><span class="image-tag after">Your version</span><div class="wipe-line" [style.left.%]="wipe()"></div> }\r
              @if (replay()) { <span class="replay-tag">Saved version \xB7 viewing only</span> }\r
            </div>\r
            @if (compare()) { <label class="wipe-control">Compare original \u2194 your version<input aria-label="Before and after comparison" type="range" min="0" max="100" [value]="wipe()" (input)="wipe.set(+$any($event.target).value)"></label> }\r
            <div class="picture-tools">\r
              <button [attr.aria-pressed]="compare()" (click)="compare.set(!compare())">Before / after</button>\r
              <button [attr.aria-pressed]="zoom()" (click)="zoom.set(!zoom())">{{ zoom() ? 'Zoom out' : 'Zoom into detail' }}</button>\r
              <button [attr.aria-pressed]="guides()" (click)="guides.set(!guides())">Detail outlines</button>\r
            </div>\r
            <p class="media-note">{{ work().attribution }} \xB7 Select a numbered area or use the detail buttons.</p>\r
          }\r
        </div>\r
        <section class="inspector" #inspector tabindex="-1" aria-label="Selected picture detail">\r
          <p class="eyebrow">ON THE PICTURE</p>\r
          <div class="detail-buttons">@for (r of work().regions; track r.id; let i = $index) { <button [attr.aria-pressed]="region()?.id === r.id" (click)="inspect(r.id)">{{ i + 1 }} \xB7 {{ r.title }}</button> }</div>\r
          @if (region(); as r) {\r
            <h2>{{ r.title }}</h2><p class="claim">The picture claims: <strong>{{ r.claim }}</strong></p>\r
            <p>Check the source desk, then choose an image layer below. Your choice changes this part of the picture.</p>\r
            <div class="repair-options" aria-label="Image repair choices">@for (o of r.options; track o.id) {\r
              <button [attr.aria-pressed]="option(r.id) === o.id" (click)="edit(o.id)">\r
                @if (o.image) { <img [src]="o.image" alt=""> } @else { <span class="option-icon" aria-hidden="true">{{ o.tool === 'remove' ? '\u2212' : o.tool === 'keep' ? '\u25C8' : '\u270E' }}</span> }\r
                <span><b>{{ o.label }}</b><small>{{ o.text ?? o.description }}</small></span>\r
              </button>\r
            }</div>\r
          } @else { <div class="start-card"><span aria-hidden="true">\u2315</span><h2>Start with one detail.</h2><p>Select a numbered area in the artwork. Read what it claims, inspect its sources, then try a visible repair.</p></div> }\r
          <div class="edit-actions"><button [disabled]="!state().undo.length" (click)="undo()">Undo repair</button><button class="primary" (click)="saveVersion()">Save picture version</button></div>\r
          <p class="feedback" role="status">{{ runtime.feedback() }}</p>\r
        </section>\r
      </div>\r
      <details class="sources" [open]="week().week === 1"><summary>Source desk \xB7 pin evidence to this picture</summary><p>Read the source before deciding what to change. The scene illustration is not proof of its own accuracy.</p><div class="source-grid">@for (source of sources(); track source.id) { <article><h3>{{ source.title }}</h3><p>{{ source.text }}</p><a [href]="source.sourceUrl" target="_blank" rel="noopener noreferrer">{{ source.sourceTitle }} \u2197</a><button [attr.aria-pressed]="pinnedSources().includes(source.id)" (click)="runtime.pinSource(work().id, source.id)">{{ pinnedSources().includes(source.id) ? 'Unpin source' : 'Pin source to picture' }}</button></article> }</div></details>\r
      <details class="replays"><summary>Replay versions ({{ trials().length }})</summary><div class="trial-list">@for (trial of trials(); track trial.id; let i = $index) { <button [attr.aria-pressed]="replayId() === trial.id" (click)="replayId.set(trial.id); mode.set('picture')">Version {{ i + 1 }}<app-restoration-canvas [definition]="work()" [state]="trial.state" [interactive]="false" /></button> } @empty { <p>Use Save picture version after a repair to keep an image you can revisit.</p> }</div>@if (replay()) { <button (click)="replayId.set(undefined)">Return to current draft</button> }</details>\r
      <div class="downloads"><button [disabled]="busy()" (click)="downloadComparison()">Download before / after</button><button (click)="runtime.toggleExhibit(work().id)">{{ (runtime.state().exhibit ?? []).includes(work().id) ? 'Remove from exhibition' : 'Add to exhibition' }}</button><button (click)="downloadDraft()">Download draft</button></div>\r
      }\r
    } @else {\r
      <section class="exhibition" aria-label="Visual exhibition builder">\r
        <div class="exhibit-heading"><div><p class="eyebrow">YOUR GALLERY</p><h2>History, back in the picture</h2></div><button [attr.aria-pressed]="presentation()" (click)="saveCaptions(); presentation.set(!presentation())">{{ presentation() ? 'Edit exhibition' : 'Preview exhibition' }}</button></div>\r
        <p class="sample-note">{{ runtime.state().sampleWorkIds.length ? 'Sample starting exhibition: example images and captions were added only for untouched work. Edit, remove or replace them.' : 'Your local exhibition draft. Add paintings, arrange them, and write museum captions.' }} No earlier work is marked complete.</p>\r
        <div class="exhibit-grid" [class.presentation]="presentation()">@for (w of exhibit(); track w.id; let i = $index) {\r
          <article><h3>{{ i + 1 }} \xB7 {{ sceneFor(w.id)?.title ?? w.title }}</h3><small>{{ w.location }} \xB7 {{ w.date }}</small><div class="exhibit-pair"><figure>@if (sceneFor(w.id); as d) { <app-panorama-painting [scene]="d" [state]="runtime.sceneState(d.id)" [original]="true" /> } @else { <app-restoration-canvas [definition]="w" [state]="runtime.image(w.id)" [original]="true" [interactive]="false" /> }<figcaption>Original</figcaption></figure><figure>@if (sceneFor(w.id); as d) { <app-panorama-painting [scene]="d" [state]="runtime.sceneState(d.id)" /> } @else { <app-restoration-canvas [definition]="w" [state]="runtime.image(w.id)" [interactive]="false" /> }<figcaption>Student reconstruction</figcaption></figure></div>\r
            @if (presentation()) { <p class="museum-caption">{{ caption(w.id) }}</p> } @else {\r
              <label>Museum caption<textarea [attr.aria-label]="'Museum caption for ' + w.title" rows="3" maxlength="1500" [value]="caption(w.id)" (input)="draftCaption(w.id, $any($event.target).value)" (blur)="saveCaptions()" placeholder="Write the label your gallery visitors will read."></textarea></label>\r
              <div class="edit-actions"><button [disabled]="i === 0" [attr.aria-label]="'Move ' + w.title + ' earlier'" (click)="runtime.move(w.id, -1)">\u2191 Earlier</button><button [disabled]="i === exhibit().length - 1" [attr.aria-label]="'Move ' + w.title + ' later'" (click)="runtime.move(w.id, 1)">\u2193 Later</button><button (click)="choose(w.id)">Edit picture</button><button (click)="runtime.toggleExhibit(w.id)">Remove</button></div>\r
            }\r
          </article>\r
        } @empty { <p class="empty-gallery">Your exhibition is empty. Choose a picture below to add it. Returning to this session keeps your empty draft.</p> }</div>\r
        @if (!presentation()) { <label class="add-picture">Add a painting<select aria-label="Add a painting to exhibition" (change)="runtime.toggleExhibit($any($event.target).value); $any($event.target).value = ''"><option value="">Choose from the collection\u2026</option>@for (w of runtime.mission.works; track w.id) { @if (!(runtime.state().exhibit ?? []).includes(w.id)) { <option [value]="w.id">{{ w.title }}</option> } }</select></label> }\r
        <div class="downloads"><button class="primary" [disabled]="busy() || !exhibit().length" (click)="downloadExhibit()">Download illustrated exhibition</button><button (click)="downloadDraft()">Download draft</button></div>\r
      </section>\r
    }\r
  </section>\r
  <aside class="planning" aria-label="Weekly planning">\r
    <details class="products" open><summary>Proposed weekly products</summary><p class="eyebrow">WEEK {{ week().week }} \xB7 {{ week().title }}</p><ul>@for (s of week().sessions; track s.title; let i = $index) { <li><strong>{{ i ? 'Group activity' : 'Individual exploration' }}</strong><span>{{ s.product }}</span></li> }</ul><p>Potential deliverables. No submission or completion is required in this preview. Group activities use local drafts; shared editing is deferred.</p></details>\r
    <details class="tutor" #tutorPanel tabindex="-1" open><summary>AI Tutor <span>Disconnected</span></summary><p>Builder planning only. No AI review, adaptation or mastery recording is connected.</p>@if (scene()?.questionOwner === 'tutor') { <p>Scene questions belong here. The scene has no question buttons or chat form.</p>@if (activePerson(); as person) { <h3>Selected person: {{ person.name }}</h3><p>{{ person.activity }}</p> } }\r
<h3>Questions & concepts</h3><ul>@for (question of week().questions; track question) { <li>{{ question }}</li> }</ul><h3>Evidence to inspect</h3><ul>@for (evidence of week().evidence; track evidence) { <li>{{ evidence }}</li> }</ul><h3>Future model controls</h3><ul>@for (control of week().controls; track control) { <li>{{ control }}</li> }</ul></details>\r
    <p class="preview-note">Local authoring preview \xB7 All sessions and paintings accessible. Drafts save in this browser.</p>\r
  </aside>\r
</main>\r
`, styles: ['/* src/app/templates/heist/restoration/weekly/restoration-week-workspace.component.scss */\n:host {\n  display: block;\n  background: #10281f;\n  color: #f4ead5;\n  font-family: Arial, sans-serif;\n  min-height: 100vh;\n}\n* {\n  box-sizing: border-box;\n}\n.week-workspace {\n  --gold:#efd094;\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(270px, 3fr);\n  gap: 24px;\n  max-width: 1580px;\n  margin: auto;\n  padding: 24px 28px 40px;\n}\n.activity,\n.planning,\n.visual {\n  min-width: 0;\n}\n.mission-header p {\n  margin: 7px 0;\n  color: #c4d4c5;\n}\n.eyebrow {\n  font-size: 10px !important;\n  letter-spacing: 1.7px;\n  line-height: 1.6;\n  color: var(--gold) !important;\n}\nh1,\nh2,\nh3 {\n  font-family: Georgia, serif;\n  font-weight: 400;\n}\nh1 {\n  font-size: clamp(27px, 2.8vw, 40px);\n  margin: 5px 0;\n  line-height: 1.13;\n}\nh2 {\n  font-size: 24px;\n  margin: 10px 0;\n}\nh3 {\n  font-size: 21px;\n  margin: 8px 0;\n}\np {\n  font-size: 14px;\n  line-height: 1.6;\n}\nbutton,\nselect,\ntextarea {\n  font: inherit;\n}\nbutton {\n  min-height: 44px;\n  border: 1px solid #627e67;\n  border-radius: 6px;\n  background: #264434;\n  color: #fbefd5;\n  padding: 9px 12px;\n  font-size: 13px;\n  cursor: pointer;\n}\nbutton:hover {\n  background: #345c43;\n  border-color: #e0c187;\n}\nbutton[aria-pressed=true] {\n  background: #4a5a38;\n  border-color: var(--gold);\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton:focus-visible,\nselect:focus-visible,\ntextarea:focus-visible,\nsummary:focus-visible {\n  outline: 3px solid #f8d784;\n  outline-offset: 3px;\n}\na {\n  color: #f0d08c;\n  overflow-wrap: anywhere;\n}\nbutton.primary {\n  background: var(--gold);\n  color: #1b3026;\n  border-color: var(--gold);\n  font-weight: 700;\n}\nsummary {\n  cursor: pointer;\n  min-height: 44px;\n  padding: 12px 0;\n  line-height: 1.4;\n  font-size: 14px;\n  font-weight: 700;\n}\nselect,\ntextarea {\n  max-width: 100%;\n  width: 100%;\n  padding: 10px;\n  background: #102a20;\n  color: #f5ead4;\n  border: 1px solid #78937a;\n  border-radius: 5px;\n  font-size: 14px;\n  min-height: 44px;\n}\ntextarea {\n  display: block;\n  margin-top: 8px;\n  resize: vertical;\n  line-height: 1.55;\n}\nlabel {\n  font-size: 13px;\n  line-height: 1.5;\n}\n.directions {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 10px;\n  list-style: none;\n  margin: 20px 0 15px;\n  padding: 0;\n}\n.directions li {\n  display: flex;\n  gap: 9px;\n  align-items: flex-start;\n  border-top: 1px solid #527057;\n  padding-top: 11px;\n  font-size: 13px;\n  line-height: 1.5;\n  color: #d8e0d1;\n}\n.directions b {\n  flex: none;\n  display: grid;\n  place-items: center;\n  width: 25px;\n  height: 25px;\n  border-radius: 50%;\n  background: #dbc18b;\n  color: #1c3024;\n}\n.tools {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-bottom: 15px;\n}\n.work-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 13px 0;\n  border-top: 1px solid #49634e;\n}\n.work-bar strong {\n  display: block;\n  font: 20px Georgia;\n}\n.work-bar span {\n  display: block;\n  font-size: 12px;\n  color: #b9cbb9;\n  margin-top: 5px;\n}\n.work-bar details {\n  max-width: 310px;\n}\n.work-bar summary {\n  font-weight: 400;\n  font-size: 12px;\n}\n.work-bar select {\n  margin-top: 8px;\n}\n.studio-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 235px;\n  gap: 17px;\n  align-items: start;\n}\n.image-viewport {\n  position: relative;\n  overflow: hidden;\n  border: 7px solid #927e50;\n  box-shadow: 0 0 0 1px #d2b37a, inset 0 0 16px #000;\n  isolation: isolate;\n  background: #142c20;\n}\n.image-wrap {\n  position: relative;\n  transition: transform 0.25s ease;\n}\n.original-layer {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\n.wipe-line {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 2px;\n  background: white;\n  pointer-events: none;\n}\n.image-tag,\n.replay-tag {\n  position: absolute;\n  top: 10px;\n  padding: 5px 8px;\n  border-radius: 3px;\n  background: rgba(17, 43, 36, 0.9098039216);\n  font-size: 11px;\n  color: #fff;\n  pointer-events: none;\n}\n.before {\n  left: 9px;\n}\n.after {\n  right: 9px;\n}\n.replay-tag {\n  bottom: 10px;\n  top: auto;\n  left: 8px;\n}\n.wipe-control {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin: 13px 0 5px;\n  color: #eddbb4;\n}\n.wipe-control input {\n  width: 100%;\n  height: 30px;\n  accent-color: var(--gold);\n}\n.picture-tools,\n.edit-actions,\n.downloads {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n  margin: 12px 0;\n}\n.picture-tools button {\n  font-size: 12px;\n  padding: 8px;\n}\n.media-note {\n  font-size: 11px;\n  color: #b8c9b5;\n  margin: 8px 0;\n}\n.inspector {\n  background: #1b3829;\n  border: 1px solid #506c50;\n  border-radius: 8px;\n  padding: 14px;\n  scroll-margin: 80px;\n}\n.inspector:focus {\n  outline: 2px solid #d4be86;\n  outline-offset: 2px;\n}\n.inspector .eyebrow {\n  margin: 0 0 10px;\n}\n.detail-buttons {\n  display: grid;\n  gap: 6px;\n}\n.detail-buttons button {\n  text-align: left;\n  font-size: 12px;\n}\n.inspector h2 {\n  font-size: 22px;\n}\n.inspector p {\n  font-size: 12px;\n  line-height: 1.6;\n}\n.claim {\n  border-left: 2px solid #d4b579;\n  padding-left: 10px;\n}\n.claim strong {\n  display: block;\n  color: #f0dab3;\n  font-weight: 400;\n  margin-top: 5px;\n}\n.repair-options {\n  display: grid;\n  gap: 7px;\n}\n.repair-options button {\n  display: flex;\n  gap: 9px;\n  align-items: center;\n  text-align: left;\n  padding: 9px;\n}\n.repair-options img,\n.option-icon {\n  width: 42px;\n  height: 44px;\n  object-fit: contain;\n  flex: none;\n  background: #10291d;\n  border-radius: 4px;\n}\n.option-icon {\n  display: grid;\n  place-items: center;\n  font-size: 26px;\n  color: var(--gold);\n}\n.repair-options b {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n}\n.repair-options small {\n  display: block;\n  font-size: 10px;\n  line-height: 1.4;\n  margin-top: 4px;\n  color: #e1e7d5;\n}\n.edit-actions button {\n  flex: 1;\n  font-size: 12px;\n}\n.start-card {\n  padding: 18px 0;\n}\n.start-card > span {\n  font-size: 40px;\n  color: var(--gold);\n}\n.feedback {\n  color: #f1d297;\n  min-height: 18px;\n}\n.sources,\n.replays {\n  margin-top: 18px;\n  border: 1px solid #4e6b50;\n  border-radius: 8px;\n  padding: 0 16px 10px;\n}\n.sources > p {\n  font-size: 12px;\n}\n.source-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n.source-grid article {\n  border-top: 1px solid #547254;\n  padding: 12px 0;\n}\n.source-grid h3 {\n  font-size: 20px;\n}\n.source-grid p {\n  font-size: 12px;\n}\n.source-grid a {\n  display: block;\n  font-size: 11px;\n  line-height: 1.5;\n  margin-bottom: 10px;\n}\n.source-grid button {\n  font-size: 12px;\n}\n.trial-list {\n  display: flex;\n  gap: 12px;\n  overflow: auto;\n  padding: 8px 2px;\n}\n.trial-list > button {\n  width: 125px;\n  flex: none;\n  padding: 6px;\n  line-height: 2;\n}\n.planning {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.planning details {\n  border: 1px solid #5d7358;\n  background: #1c372a;\n  border-radius: 10px;\n  padding: 6px 19px 15px;\n}\n.planning summary {\n  font: 21px Georgia;\n  min-height: 51px;\n  line-height: 1.5;\n}\n.planning ul {\n  padding-left: 18px;\n}\n.planning li {\n  font-size: 13px;\n  line-height: 1.65;\n  color: #d4dfd0;\n  margin: 9px 0;\n}\n.planning p {\n  font-size: 12px;\n  color: #b9cbb8;\n}\n.products strong {\n  display: block;\n  color: #f0d396;\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  margin-bottom: 4px;\n}\n.products span {\n  display: block;\n}\n.tutor summary span {\n  display: inline-block;\n  font: 10px Arial;\n  padding: 5px 7px;\n  border: 1px solid #829177;\n  border-radius: 20px;\n  margin-left: 7px;\n  vertical-align: middle;\n  color: #d6d9c5;\n}\n.tutor h3 {\n  font-family: Arial;\n  font-size: 12px;\n  font-weight: 700;\n  color: #f2d6a0;\n  border-top: 1px solid #4c674d;\n  padding-top: 15px;\n  margin-top: 20px;\n}\n.preview-note {\n  padding: 0 10px;\n}\n.exhibition {\n  border: 1px solid #5f7658;\n  border-radius: 10px;\n  padding: 20px;\n  background: #182f24;\n}\n.exhibit-heading {\n  display: flex;\n  justify-content: space-between;\n  gap: 15px;\n  align-items: center;\n}\n.exhibit-heading button {\n  flex: none;\n}\n.sample-note,\n.extra {\n  font-size: 12px;\n  color: #d1ddc9;\n  background: #2a4030;\n  border-left: 3px solid #debe80;\n  padding: 12px;\n}\n.exhibit-grid {\n  display: grid;\n  gap: 20px;\n}\n.exhibit-grid article {\n  border-top: 1px solid #627356;\n  padding-top: 18px;\n}\n.exhibit-grid small {\n  color: #baccb5;\n  font-size: 12px;\n}\n.exhibit-pair {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 15px;\n  margin: 14px 0;\n}\n.exhibit-pair figure {\n  margin: 0;\n  min-width: 0;\n}\n.exhibit-pair figcaption {\n  font-size: 12px;\n  padding: 7px 0;\n  color: #dac89e;\n}\n.museum-caption {\n  white-space: pre-wrap;\n}\n.add-picture {\n  display: block;\n  max-width: 430px;\n  margin: 22px 0;\n}\n.add-picture select {\n  margin-top: 7px;\n}\n.notice,\n.warning {\n  padding: 12px;\n  background: #3d452a;\n  border: 1px solid #baab76;\n  border-radius: 6px;\n  font-size: 13px;\n}\n.empty-gallery {\n  padding: 30px 10px;\n  text-align: center;\n}\n.extra button {\n  margin: 5px;\n}\n[data-week="2"] {\n  --gold:#e7ba84;\n}\n[data-week="3"] {\n  --gold:#a8d8d5;\n}\n[data-week="4"] {\n  --gold:#e2c3e6;\n}\n@media (min-width: 1500px) {\n  .studio-grid {\n    grid-template-columns: minmax(0, 1fr) 280px;\n  }\n}\n@media (max-width: 1100px) {\n  .week-workspace {\n    gap: 16px;\n    padding-inline: 18px;\n    grid-template-columns: minmax(0, 7fr) minmax(240px, 3fr);\n  }\n  .studio-grid {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .inspector {\n    display: block;\n  }\n  .repair-options {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n  .repair-options button {\n    flex-direction: column;\n  }\n  .detail-buttons {\n    grid-template-columns: 1fr 1fr;\n  }\n  .directions {\n    grid-template-columns: 1fr;\n    gap: 5px;\n  }\n  .directions li {\n    border: 0;\n    padding-top: 0;\n  }\n  .image-viewport {\n    max-width: 600px;\n    margin: auto;\n  }\n}\n@media (max-width: 800px) {\n  .week-workspace {\n    grid-template-columns: 1fr;\n    padding: 24px 18px 30px;\n  }\n  .planning {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 12px;\n  }\n  .preview-note {\n    grid-column: 1/-1;\n  }\n  .directions {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n  .work-bar {\n    align-items: flex-start;\n  }\n  .exhibit-heading {\n    flex-wrap: wrap;\n  }\n}\n@media (max-width: 540px) {\n  .week-workspace {\n    padding-inline: 12px;\n  }\n  .planning,\n  .directions,\n  .source-grid {\n    grid-template-columns: 1fr;\n  }\n  .mission-header p {\n    font-size: 13px;\n  }\n  .tools button {\n    flex: 1;\n    font-size: 12px;\n    padding: 8px;\n  }\n  .work-bar {\n    flex-direction: column;\n  }\n  .work-bar details {\n    width: 100%;\n    max-width: none;\n  }\n  .repair-options {\n    grid-template-columns: 1fr;\n  }\n  .repair-options button {\n    flex-direction: row;\n  }\n  .directions {\n    margin-top: 15px;\n  }\n  .exhibition {\n    padding: 13px;\n  }\n  .exhibit-pair {\n    gap: 8px;\n  }\n  .exhibit-pair figcaption {\n    font-size: 10px;\n  }\n  .downloads button {\n    flex: 1;\n  }\n  .planning details {\n    padding-inline: 15px;\n  }\n  .picture-tools button {\n    flex: 1;\n  }\n  .image-viewport {\n    border-width: 5px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .image-wrap {\n    transition: none;\n  }\n}\n.session-heading {\n  scroll-margin-top: 130px;\n}\n.session-heading:focus {\n  outline: none;\n}\n@media (max-width: 900px) {\n  .session-heading {\n    scroll-margin-top: 170px;\n  }\n}\n@media (max-width: 600px) {\n  .session-heading {\n    scroll-margin-top: 260px;\n  }\n}\n/*# sourceMappingURL=restoration-week-workspace.component.css.map */\n'] }]
  }], () => [], { tutorPanel: [{ type: ViewChild, args: ["tutorPanel", { isSignal: true }] }], inspector: [{ type: ViewChild, args: ["inspector", { isSignal: true }] }], filmPlayer: [{ type: ViewChild, args: [forwardRef(() => RestorationSceneFilmComponent), { isSignal: true }] }], sessionHeading: [{ type: ViewChild, args: ["sessionHeading", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RestorationWeekWorkspaceComponent, { className: "RestorationWeekWorkspaceComponent", filePath: "src/app/templates/heist/restoration/weekly/restoration-week-workspace.component.ts", lineNumber: 19 });
})();
export {
  RestorationWeekWorkspaceComponent
};
//# debugId=7b4e6988-120e-567d-b0e1-cd4083b04d8e
//# sourceMappingURL=chunk-XLJ3ID2W.js.map
