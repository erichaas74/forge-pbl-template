import {
  PROJECT_INTRO_CONFIG
} from "./chunk-3RS2K2YP.js";
import {
  validateTeaser
} from "./chunk-5A6GBRKO.js";
import "./chunk-ZTDR7NN6.js";
import {
  ObjectModelViewerComponent
} from "./chunk-ICIU3PCK.js";
import "./chunk-MNKXLJET.js";
import {
  PROJECT_CATALOG_ENTRY
} from "./chunk-CN67HRIA.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RadioControlValueAccessor,
  ɵNgNoValidate
} from "./chunk-UW6DFD2Z.js";
import {
  TaskGuideComponent
} from "./chunk-FBZ4EUOY.js";
import {
  Router,
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  Component,
  Injector,
  Input,
  Output,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  afterNextRender,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  inputBinding,
  output,
  outputBinding,
  setClassMetadata,
  signal,
  untracked,
  viewChild,
  viewChildren,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementContainer,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
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
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/plugins/intro-scenes/opening-media.component.ts
var _c0 = ["video"];
function OpeningMediaComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-object-model-viewer", 2);
  }
  if (rf & 2) {
    \u0275\u0275property("model", ctx)("autoLoad", true);
  }
}
function OpeningMediaComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "video", 5, 0);
    \u0275\u0275listener("ended", function OpeningMediaComponent_Conditional_2_Template_video_ended_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEnded());
    })("error", function OpeningMediaComponent_Conditional_2_Template_video_error_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onError());
    });
    \u0275\u0275element(2, "track", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 7)(4, "button", 8);
    \u0275\u0275listener("click", function OpeningMediaComponent_Conditional_2_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggle());
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "Silent scene \xB7 Captions on");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.media().video, \u0275\u0275sanitizeUrl)("poster", ctx_r1.media().image)("muted", true);
    \u0275\u0275attribute("aria-label", ctx_r1.media().alt);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r1.media().captions);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.playing());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.playing() ? "\u2161 Pause scene" : "\u25B6 Play short scene");
  }
}
function OpeningMediaComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 9);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("object-fit", ctx_r1.media().fit ?? "cover");
    \u0275\u0275property("src", ctx_r1.media().image, \u0275\u0275sanitizeUrl)("alt", ctx_r1.media().alt);
  }
}
function OpeningMediaComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, " The clip is unavailable. Follow the illustration and scene description. ");
    \u0275\u0275elementEnd();
  }
}
var OpeningMediaComponent = class _OpeningMediaComponent {
  media = input.required(
    ...ngDevMode ? [{ debugName: "media" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playbackEnded = output();
  playing = signal(
    false,
    ...ngDevMode ? [{ debugName: "playing" }] : (
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
  video = viewChild(
    "video",
    ...ngDevMode ? [{ debugName: "video" }] : (
      /* istanbul ignore next */
      []
    )
  );
  generation = 0;
  constructor() {
    effect(() => {
      this.media();
      this.generation++;
      untracked(() => {
        const video = this.video()?.nativeElement;
        if (video && !video.paused)
          video.pause();
      });
      this.playing.set(false);
      this.failed.set(false);
    });
  }
  async toggle() {
    const video = this.video()?.nativeElement;
    if (!video)
      return;
    const generation = ++this.generation;
    if (this.playing()) {
      video.pause();
      this.playing.set(false);
      return;
    }
    try {
      if (video.ended)
        video.currentTime = 0;
      await video.play();
      if (generation === this.generation)
        this.playing.set(true);
    } catch {
      if (generation === this.generation)
        this.onError();
    }
  }
  onError() {
    this.playing.set(false);
    this.failed.set(true);
  }
  onEnded() {
    this.playing.set(false);
    this.playbackEnded.emit();
  }
  ngOnDestroy() {
    this.generation++;
    const video = this.video()?.nativeElement;
    if (video && !video.paused)
      video.pause();
  }
  static \u0275fac = function OpeningMediaComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OpeningMediaComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OpeningMediaComponent, selectors: [["app-opening-media"]], viewQuery: function OpeningMediaComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.video, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { media: [1, "media"] }, outputs: { playbackEnded: "playbackEnded" }, decls: 5, vars: 2, consts: [["video", ""], [1, "media-frame"], [3, "model", "autoLoad"], [3, "src", "alt", "object-fit"], ["role", "status", 1, "media-error"], ["preload", "none", "playsinline", "", "muted", "", 3, "ended", "error", "src", "poster", "muted"], ["kind", "captions", "srclang", "en", "label", "English", "default", "", 3, "src"], [1, "clip-controls"], ["type", "button", 1, "play-clip", 3, "click"], [3, "src", "alt"]], template: function OpeningMediaComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, OpeningMediaComponent_Conditional_1_Template, 1, 2, "app-object-model-viewer", 2)(2, OpeningMediaComponent_Conditional_2_Template, 8, 7)(3, OpeningMediaComponent_Conditional_3_Template, 1, 4, "img", 3);
      \u0275\u0275conditionalCreate(4, OpeningMediaComponent_Conditional_4_Template, 2, 0, "p", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_0_0 = ctx.media().model) ? 1 : ctx.media().video && !ctx.failed() ? 2 : 3, tmp_0_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.failed() ? 4 : -1);
    }
  }, dependencies: [ObjectModelViewerComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-height: 0;\n}\n.media-frame[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  position: relative;\n  background: #0d1c26;\n  border-radius: 18px;\n  overflow: hidden;\n}\nvideo[_ngcontent-%COMP%], \nimg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  max-height: var(--%NS%opening-media-height, 38dvh);\n  object-fit: cover;\n  display: block;\n  flex: 1;\n  min-height: 0;\n}\nvideo[_ngcontent-%COMP%] {\n  object-fit: contain;\n  background: #0d1c26;\n}\nvideo[_ngcontent-%COMP%]::cue {\n  font-size: 16px;\n}\n.clip-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n  padding: 12px 16px;\n  flex-shrink: 0;\n}\n.clip-controls[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d0dee3;\n  font-size: 11px;\n}\n.play-clip[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, 0.5019607843);\n  border-radius: 100px;\n  background: rgba(16, 37, 49, 0.9294117647);\n  color: white;\n  padding: 12px 20px;\n  font: 700 15px "Trebuchet MS", sans-serif;\n  cursor: pointer;\n  min-height: 44px;\n}\n.play-clip[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #ffd388;\n  outline-offset: 4px;\n}\n.media-error[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 14px;\n  background: rgba(16, 37, 49, 0.9294117647);\n  color: white;\n  margin: 0;\n  font-size: 14px;\n}\n@media (max-width: 700px) {\n  video[_ngcontent-%COMP%], \n   img[_ngcontent-%COMP%] {\n    max-height: 230px;\n    min-height: 0;\n  }\n}\n/*# sourceMappingURL=opening-media.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OpeningMediaComponent, [{
    type: Component,
    args: [{ selector: "app-opening-media", imports: [ObjectModelViewerComponent], template: `
    <div class="media-frame">
      @if (media().model; as model) {
        <app-object-model-viewer [model]="model" [autoLoad]="true" />
      } @else if (media().video && !failed()) {
        <video
          #video
          [src]="media().video"
          [poster]="media().image"
          preload="none"
          playsinline
          muted
          [muted]="true"
          [attr.aria-label]="media().alt"
          (ended)="onEnded()"
          (error)="onError()"
        >
          <track kind="captions" [src]="media().captions" srclang="en" label="English" default />
        </video>
        <div class="clip-controls">
          <button
            class="play-clip"
            type="button"
            (click)="toggle()"
            [attr.aria-pressed]="playing()"
          >
            {{ playing() ? '\u2161 Pause scene' : '\u25B6 Play short scene' }}</button
          ><span>Silent scene \xB7 Captions on</span>
        </div>
      } @else {
        <img
          [src]="media().image"
          [alt]="media().alt"
          [style.object-fit]="media().fit ?? 'cover'"
        />
      }
      @if (failed()) {
        <p class="media-error" role="status">
          The clip is unavailable. Follow the illustration and scene description.
        </p>
      }
    </div>
  `, styles: ['/* angular:styles/component:scss;00c3ca90ec2eaad9096badd77c8e42296a7f6b781097012b34a2a19f896604a3;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/plugins/intro-scenes/opening-media.component.ts */\n:host {\n  display: block;\n  height: 100%;\n  min-height: 0;\n}\n.media-frame {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  position: relative;\n  background: #0d1c26;\n  border-radius: 18px;\n  overflow: hidden;\n}\nvideo,\nimg {\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  max-height: var(--opening-media-height, 38dvh);\n  object-fit: cover;\n  display: block;\n  flex: 1;\n  min-height: 0;\n}\nvideo {\n  object-fit: contain;\n  background: #0d1c26;\n}\nvideo::cue {\n  font-size: 16px;\n}\n.clip-controls {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n  padding: 12px 16px;\n  flex-shrink: 0;\n}\n.clip-controls span {\n  color: #d0dee3;\n  font-size: 11px;\n}\n.play-clip {\n  border: 1px solid rgba(255, 255, 255, 0.5019607843);\n  border-radius: 100px;\n  background: rgba(16, 37, 49, 0.9294117647);\n  color: white;\n  padding: 12px 20px;\n  font: 700 15px "Trebuchet MS", sans-serif;\n  cursor: pointer;\n  min-height: 44px;\n}\n.play-clip:focus-visible {\n  outline: 3px solid #ffd388;\n  outline-offset: 4px;\n}\n.media-error {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 14px;\n  background: rgba(16, 37, 49, 0.9294117647);\n  color: white;\n  margin: 0;\n  font-size: 14px;\n}\n@media (max-width: 700px) {\n  video,\n  img {\n    max-height: 230px;\n    min-height: 0;\n  }\n}\n/*# sourceMappingURL=opening-media.component.css.map */\n'] }]
  }], () => [], { media: [{ type: Input, args: [{ isSignal: true, alias: "media", required: true }] }], playbackEnded: [{ type: Output, args: ["playbackEnded"] }], video: [{ type: ViewChild, args: ["video", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OpeningMediaComponent, { className: "OpeningMediaComponent", filePath: "src/app/plugins/intro-scenes/opening-media.component.ts", lineNumber: 142 });
})();

// src/app/shared/project-intro/teaser-audio-player.ts
var TeaserAudioPlayer = class {
  constructor(createAudio = () => new Audio()) {
    this.createAudio = createAudio;
  }
  createAudio;
  clip;
  finish;
  play(url) {
    this.stop();
    return new Promise((resolve) => {
      try {
        const clip = this.createAudio();
        this.clip = clip;
        const timeout = setTimeout(() => complete(false), 45e3);
        const complete = (played) => {
          clearTimeout(timeout);
          clip.onended = null;
          clip.onerror = null;
          clip.pause();
          if (this.clip === clip) {
            this.clip = void 0;
            this.finish = void 0;
          }
          resolve(played);
        };
        this.finish = complete;
        clip.onended = () => complete(true);
        clip.onerror = () => complete(false);
        clip.src = url;
        void clip.play().catch(() => complete(false));
      } catch {
        this.finish = void 0;
        resolve(false);
      }
    });
  }
  stop() {
    this.finish?.(false);
    this.clip?.pause();
    this.clip = void 0;
  }
};

// src/app/plugins/intro-scenes/illustrated-comparison.component.ts
var _c02 = ["dialoguePanel"];
var _c1 = ["sceneHeading"];
var _c2 = () => ["A", "B", "C", "D"];
var _c3 = () => ["Same reaction", "Different reactions", "Not sure yet"];
var _forTrack0 = ($index, $item) => $item.id;
function IllustratedComparisonComponent_Conditional_1_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(line_r3.text);
  }
}
function IllustratedComparisonComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 3)(1, "strong");
    \u0275\u0275text(2, "The Mystery of the Unlabeled Shelf");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 125)(4, "button", 126);
    \u0275\u0275listener("click", function IllustratedComparisonComponent_Conditional_1_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reset());
    });
    \u0275\u0275text(5, "\u21BA Restart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 126);
    \u0275\u0275listener("click", function IllustratedComparisonComponent_Conditional_1_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.finish(true));
    });
    \u0275\u0275text(7, "Project preview");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "app-task-guide", 127)(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "A prediction is your idea before a test. Compare both samples after the same test.");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(13, IllustratedComparisonComponent_Conditional_1_For_14_Template, 2, 1, "p", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(15, "button", 126);
    \u0275\u0275listener("click", function IllustratedComparisonComponent_Conditional_1_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleVoice());
    });
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 124);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.config().invitation);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.lines());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.voices() ? "Mute voices" : "Play voices", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.audioNotice());
  }
}
function IllustratedComparisonComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 126);
    \u0275\u0275listener("click", function IllustratedComparisonComponent_Conditional_4_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleVoice());
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.config().scientistName, "\u2019s story");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", ctx_r1.voices());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.voices() ? "Mute voices" : "Play voices", " ");
  }
}
function IllustratedComparisonComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 128);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h1", 129, 1);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.stage() === "welcome" ? "1 \xB7 Predict" : ctx_r1.stage() === "handoff" ? "3 \xB7 Explain" : "2 \xB7 Test and compare", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.stage() === "welcome" ? "Will both samples react the same way?" : ctx_r1.stage() === "handoff" ? "Looking alike was not enough." : "What changed?", " ");
  }
}
function IllustratedComparisonComponent_For_125_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 136);
    \u0275\u0275element(1, "path", 137);
    \u0275\u0275elementEnd();
  }
}
function IllustratedComparisonComponent_For_125_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g");
    \u0275\u0275element(1, "path", 130)(2, "path", 131)(3, "path", 132)(4, "rect", 133)(5, "circle", 134);
    \u0275\u0275elementStart(6, "text", 135);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, IllustratedComparisonComponent_For_125_Conditional_8_Template, 2, 0, ":svg:g", 136);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sample_r5 = ctx.$implicit;
    const \u0275$index_283_r6 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("transform", "translate(" + (310 + \u0275$index_283_r6 * 130) + " 280)");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("fill", (\u0275$index_283_r6 === 0 ? ctx_r1.firstColor() : ctx_r1.secondColor()) ? sample_r5.color : "#bce5df")("opacity", (\u0275$index_283_r6 === 0 ? ctx_r1.firstColor() : ctx_r1.secondColor()) ? ".95" : ".25");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275$index_283_r6 === 0 ? "A" : "B", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(\u0275$index_283_r6 === 1 && ctx_r1.secondColor() ? 8 : -1);
  }
}
function IllustratedComparisonComponent_Conditional_126_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g");
    \u0275\u0275element(1, "rect", 139)(2, "rect", 140)(3, "rect", 141);
    \u0275\u0275elementStart(4, "text", 142);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const label_r7 = ctx.$implicit;
    const \u0275$index_309_r8 = ctx.$index;
    \u0275\u0275attribute("transform", "translate(" + (310 + \u0275$index_309_r8 * 67) + " 315)");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", label_r7, " ");
  }
}
function IllustratedComparisonComponent_Conditional_126_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 117);
    \u0275\u0275element(1, "rect", 138);
    \u0275\u0275repeaterCreate(2, IllustratedComparisonComponent_Conditional_126_For_3_Template, 6, 2, ":svg:g", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c2));
  }
}
function IllustratedComparisonComponent_For_134_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 123);
    \u0275\u0275element(1, "i");
    \u0275\u0275elementStart(2, "b");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sample_r9 = ctx.$implicit;
    const \u0275$index_332_r10 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", (\u0275$index_332_r10 === 0 ? ctx_r1.firstColor() : ctx_r1.secondColor()) ? sample_r9.color : "#b8d4ce");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sample_r9.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((\u0275$index_332_r10 === 0 ? ctx_r1.firstColor() : ctx_r1.secondColor()) ? sample_r9.result : "Looks clear");
  }
}
function IllustratedComparisonComponent_Conditional_135_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r11 = ctx.$implicit;
    const $index_r12 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("speaking", ctx_r1.activeLine() === $index_r12);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r11.speaker === "scientist" ? ctx_r1.config().scientistName : ctx_r1.config().robotName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", line_r11.text, " ");
  }
}
function IllustratedComparisonComponent_Conditional_135_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 147);
    \u0275\u0275listener("click", function IllustratedComparisonComponent_Conditional_135_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runTest());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.config().testButton, " \u2192 ");
  }
}
function IllustratedComparisonComponent_Conditional_135_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 124);
    \u0275\u0275text(1, "Comparing the samples\u2026");
    \u0275\u0275elementEnd();
  }
}
function IllustratedComparisonComponent_Conditional_135_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 148);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 147);
    \u0275\u0275listener("click", function IllustratedComparisonComponent_Conditional_135_Conditional_7_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showCase());
    });
    \u0275\u0275text(3, " Meet the mystery vials \u2192 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.config().comedyNote);
  }
}
function IllustratedComparisonComponent_Conditional_135_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 149);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 150);
    \u0275\u0275listener("click", function IllustratedComparisonComponent_Conditional_135_Conditional_8_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.reset());
    });
    \u0275\u0275text(3, "\u21BA Replay story");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.config().evidenceNote);
  }
}
function IllustratedComparisonComponent_Conditional_135_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143);
    \u0275\u0275repeaterCreate(1, IllustratedComparisonComponent_Conditional_135_For_2_Template, 4, 4, "p", 144, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 145);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, IllustratedComparisonComponent_Conditional_135_Conditional_5_Template, 2, 1, "button", 146)(6, IllustratedComparisonComponent_Conditional_135_Conditional_6_Template, 2, 0, "p", 124)(7, IllustratedComparisonComponent_Conditional_135_Conditional_7_Template, 4, 1)(8, IllustratedComparisonComponent_Conditional_135_Conditional_8_Template, 4, 1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.lines());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.audioNotice());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.stage() === "welcome" ? 5 : ctx_r1.stage() === "testing" || ctx_r1.stage() === "poof" ? 6 : ctx_r1.stage() === "reveal" ? 7 : 8);
  }
}
function IllustratedComparisonComponent_Conditional_136_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 126);
    \u0275\u0275listener("click", function IllustratedComparisonComponent_Conditional_136_For_2_Template_button_click_0_listener() {
      const idea_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.prediction.set(idea_r18));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idea_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.prediction() === idea_r18);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idea_r18, " ");
  }
}
function IllustratedComparisonComponent_Conditional_136_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 151);
    \u0275\u0275repeaterCreate(1, IllustratedComparisonComponent_Conditional_136_For_2_Template, 2, 2, "button", 152, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 153);
    \u0275\u0275listener("click", function IllustratedComparisonComponent_Conditional_136_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runTest());
    });
    \u0275\u0275text(4, " Test my prediction \u2192 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(1, _c3));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.prediction());
  }
}
function IllustratedComparisonComponent_Conditional_137_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 124);
    \u0275\u0275text(1, "Comparing the samples\u2026");
    \u0275\u0275elementEnd();
  }
}
function IllustratedComparisonComponent_Conditional_138_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 154)(1, "button", 126);
    \u0275\u0275listener("click", function IllustratedComparisonComponent_Conditional_138_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.conclusion.set("same"));
    });
    \u0275\u0275text(2, " A = B \xB7 Same reaction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 126);
    \u0275\u0275listener("click", function IllustratedComparisonComponent_Conditional_138_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.conclusion.set("different"));
    });
    \u0275\u0275text(4, " A \u2260 B \xB7 Different reactions ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p", 124);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 153);
    \u0275\u0275listener("click", function IllustratedComparisonComponent_Conditional_138_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showCase());
    });
    \u0275\u0275text(8, " Check my observation \u2192 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", ctx_r1.conclusion() === "same");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.conclusion() === "different");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.feedback());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.conclusion());
  }
}
function IllustratedComparisonComponent_Conditional_139_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 155);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 149);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 147);
    \u0275\u0275listener("click", function IllustratedComparisonComponent_Conditional_139_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.finish());
    });
    \u0275\u0275text(5, "Open my investigation \u2192");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("My prediction: ", ctx_r1.prediction());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.config().evidenceNote);
  }
}
var IllustratedComparisonComponent = class _IllustratedComparisonComponent {
  config = input.required(
    ...ngDevMode ? [{ debugName: "config" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Story playback for an invitation; does not collect or emit practice responses. */
  storyMode = input(
    false,
    ...ngDevMode ? [{ debugName: "storyMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completed = output();
  stage = signal(
    "welcome",
    ...ngDevMode ? [{ debugName: "stage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  prediction = signal(
    "",
    ...ngDevMode ? [{ debugName: "prediction" }] : (
      /* istanbul ignore next */
      []
    )
  );
  conclusion = signal(
    "",
    ...ngDevMode ? [{ debugName: "conclusion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  feedback = signal(
    "",
    ...ngDevMode ? [{ debugName: "feedback" }] : (
      /* istanbul ignore next */
      []
    )
  );
  thinking = signal(
    [],
    ...ngDevMode ? [{ debugName: "thinking" }] : (
      /* istanbul ignore next */
      []
    )
  );
  firstColor = signal(
    false,
    ...ngDevMode ? [{ debugName: "firstColor" }] : (
      /* istanbul ignore next */
      []
    )
  );
  secondColor = signal(
    false,
    ...ngDevMode ? [{ debugName: "secondColor" }] : (
      /* istanbul ignore next */
      []
    )
  );
  voices = signal(
    false,
    ...ngDevMode ? [{ debugName: "voices" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeLine = signal(
    -1,
    ...ngDevMode ? [{ debugName: "activeLine" }] : (
      /* istanbul ignore next */
      []
    )
  );
  audioNotice = signal(
    "Voices are off. All dialogue is captioned.",
    ...ngDevMode ? [{ debugName: "audioNotice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  singed = computed(
    () => ["poof", "reveal", "handoff"].includes(this.stage()),
    ...ngDevMode ? [{ debugName: "singed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lines = computed(
    () => this.config().dialogue[this.stage() === "poof" ? "testing" : this.stage()],
    ...ngDevMode ? [{ debugName: "lines" }] : (
      /* istanbul ignore next */
      []
    )
  );
  narrator = new TeaserAudioPlayer();
  injector = inject(Injector);
  dialoguePanel = viewChild(
    "dialoguePanel",
    ...ngDevMode ? [{ debugName: "dialoguePanel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sceneHeading = viewChild(
    "sceneHeading",
    ...ngDevMode ? [{ debugName: "sceneHeading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  delays = /* @__PURE__ */ new Map();
  sequence = 0;
  voiceSequence = 0;
  emitted = false;
  constructor() {
    afterNextRender(() => {
      if (this.storyMode())
        return;
      const heading = this.sceneHeading()?.nativeElement;
      heading?.scrollIntoView({ block: "nearest" });
      heading?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  async runTest() {
    if (this.stage() !== "welcome" || !this.storyMode() && !this.prediction())
      return;
    if (!this.storyMode())
      this.thinking.set([{ step: "prediction", answer: this.prediction() }]);
    const sequence = ++this.sequence;
    this.stopVoice();
    this.stage.set("testing");
    void this.delay(850).then(() => {
      if (sequence === this.sequence)
        this.firstColor.set(true);
    });
    await Promise.all([this.delay(2400), this.playLines()]);
    if (sequence !== this.sequence)
      return;
    this.secondColor.set(true);
    this.stage.set("poof");
    await this.delay(950);
    if (sequence !== this.sequence)
      return;
    this.stage.set("reveal");
    this.focusDialogue();
    void this.playLines();
  }
  showCase() {
    if (this.storyMode() && this.stage() === "reveal") {
      this.stage.set("handoff");
      this.focusDialogue();
      void this.playLines();
      return;
    }
    if (this.stage() !== "reveal" || !this.conclusion())
      return;
    const samples = this.config().samples;
    const expected = samples[0].result === samples[1].result && samples[0].color === samples[1].color ? "same" : "different";
    const correct = this.conclusion() === expected;
    this.thinking.update((items) => [
      ...items.slice(-39),
      { step: "observation", answer: this.conclusion(), correct }
    ]);
    if (!correct) {
      this.feedback.set("Compare the two colors after the test.");
      return;
    }
    this.feedback.set("");
    this.stage.set("handoff");
    this.focusDialogue();
    void this.playLines();
  }
  finish(skipped = false) {
    if (this.storyMode())
      return;
    if (this.emitted || !skipped && this.stage() !== "handoff")
      return;
    this.emitted = true;
    this.cancel();
    this.completed.emit(__spreadProps(__spreadValues({
      eventType: skipped ? "projectIntro.teaserSkipped" : "projectIntro.teaserCompleted",
      teaserId: this.config().id,
      teaserVersion: this.config().version,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }, this.thinking().length ? { thinking: this.thinking() } : {}), {
      observations: this.config().samples.filter((_, index) => index === 0 ? this.firstColor() : this.secondColor()).map((sample) => ({ sampleId: sample.id, result: sample.result }))
    }));
  }
  toggleVoice() {
    this.voices.update((value) => !value);
    if (this.voices()) {
      this.audioNotice.set("Voices on \xB7 Captions stay visible");
      if (this.stage() !== "poof")
        void this.playLines();
    } else {
      this.stopVoice();
      this.audioNotice.set("Voices are off. All dialogue is captioned.");
    }
  }
  replayVoices() {
    if (this.voices() && this.stage() !== "poof")
      void this.playLines();
  }
  reset() {
    this.cancel();
    this.prediction.set("");
    this.conclusion.set("");
    this.feedback.set("");
    this.thinking.set([]);
    this.firstColor.set(false);
    this.secondColor.set(false);
    this.stage.set("welcome");
    this.emitted = false;
    this.focusDialogue();
    void this.playLines();
  }
  ngOnDestroy() {
    this.cancel();
  }
  async playLines() {
    this.stopVoice();
    if (!this.voices())
      return;
    const generation = this.voiceSequence;
    const lines = this.lines();
    for (let index = 0; index < lines.length; index++) {
      if (generation !== this.voiceSequence || !this.voices())
        return;
      this.activeLine.set(index);
      const played = await this.narrator.play(lines[index].audioUrl);
      if (generation !== this.voiceSequence)
        return;
      if (!played) {
        this.audioNotice.set("Audio could not play. Follow the captions, or try the voices again.");
        this.voices.set(false);
        this.activeLine.set(-1);
        return;
      }
    }
    if (generation === this.voiceSequence)
      this.activeLine.set(-1);
  }
  stopVoice() {
    this.voiceSequence++;
    this.narrator.stop();
    this.activeLine.set(-1);
  }
  cancel() {
    this.sequence++;
    this.stopVoice();
    for (const [timer, resolve] of this.delays) {
      clearTimeout(timer);
      resolve();
    }
    this.delays.clear();
  }
  delay(ms) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        this.delays.delete(timer);
        resolve();
      }, ms);
      this.delays.set(timer, resolve);
    });
  }
  focusDialogue() {
    afterNextRender(() => {
      const element = this.dialoguePanel()?.nativeElement;
      element?.scrollIntoView({ block: "nearest" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  static \u0275fac = function IllustratedComparisonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IllustratedComparisonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _IllustratedComparisonComponent, selectors: [["app-illustrated-comparison"]], viewQuery: function IllustratedComparisonComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.dialoguePanel, _c02, 5)(ctx.sceneHeading, _c1, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, inputs: { config: [1, "config"], storyMode: [1, "storyMode"] }, outputs: { completed: "completed" }, decls: 140, vars: 19, consts: [["dialoguePanel", ""], ["sceneHeading", ""], [1, "cartoon-opening"], [1, "episode-header"], ["tabindex", "-1", 1, "comparison-task"], [1, "story-heading"], ["role", "img", 1, "illustration"], ["viewBox", "0 0 720 530", "aria-hidden", "true", "focusable", "false"], ["id", "teaser-wall", "x2", "0", "y2", "1"], ["stop-color", "#185467"], ["offset", "1", "stop-color", "#092c3d"], ["id", "teaser-coat", "x1", "0", "x2", "1"], ["stop-color", "#fcf8e6"], ["offset", ".65", "stop-color", "#e9eee8"], ["offset", "1", "stop-color", "#a7c8c7"], ["id", "teaser-glass", "x2", "1", "y2", "1"], ["stop-color", "#d6ffff", "stop-opacity", ".45"], ["offset", "1", "stop-color", "#c6f9ff", "stop-opacity", ".08"], ["id", "teaser-grid", "width", "38", "height", "38", "patternUnits", "userSpaceOnUse"], ["d", "M38 0H0V38", "fill", "none", "stroke", "#81c6cb", "stroke-opacity", ".09"], ["id", "teaser-glow"], ["stop-color", "#9eeee8", "stop-opacity", ".18"], ["offset", "1", "stop-color", "#9eeee8", "stop-opacity", "0"], ["width", "720", "height", "530", "fill", "url(#teaser-wall)"], ["width", "720", "height", "530", "fill", "url(#teaser-grid)"], ["cx", "445", "cy", "220", "rx", "340", "ry", "275", "fill", "url(#teaser-glow)"], ["fill", "none", "stroke", "#60a2ae", "stroke-width", "3", "opacity", ".28"], ["d", "M30 0V90Q30 110 55 110H180V150M665 0V250H705V375"], ["cx", "180", "cy", "162", "r", "12"], ["d", "M645 80h50M50 300h70M82 278v44"], [1, "wall-sign"], ["x", "35", "y", "35", "width", "202", "height", "84", "rx", "9", "fill", "#0d2936", "stroke", "#54808b"], ["x", "52", "y", "61", "fill", "#98c8cc", "font-size", "10", "letter-spacing", "2"], ["x", "52", "y", "88", "fill", "#f1d493", "font-size", "17", "font-weight", "bold"], ["d", "M52 99h164", "stroke", "#3f616c"], ["opacity", ".5", 1, "shelf-props"], ["x", "44", "y", "225", "width", "154", "height", "10", "rx", "3", "fill", "#608b8a"], ["d", "M65 156h21v36l15 31H49l16-31z", "fill", "#f9c676", "stroke", "#b3ddd5", "stroke-width", "2"], ["d", "M126 165h21v57h-21z", "fill", "#6bddd0", "stroke", "#b3ddd5", "stroke-width", "2"], ["x", "160", "y", "184", "width", "19", "height", "37", "rx", "3", "fill", "#ef9c95"], ["stroke", "#173745", "stroke-width", "4", "stroke-linejoin", "round", "stroke-linecap", "round", 1, "scientist"], ["cx", "458", "cy", "492", "rx", "112", "ry", "18", "fill", "#061e2c", "opacity", ".55", "stroke", "none"], ["d", "M400 401l-6 77 34 2 24-79M464 401l17 80 34-2-6-80", "fill", "#213d54"], ["d", "M393 470q-43 12-38 24l75-1 1-21M480 473l33-1q38 9 40 23h-71z", "fill", "#e6a859"], ["d", "M384 229q-40 7-60 49l-33-20-13 27 51 34q28 3 52-34", "fill", "url(#teaser-coat)"], ["d", "M282 256q-2-16-8-18-7-3-4 15l-23-12q-16-8-18 1l16 16-12-3q-12-4-11 6l44 28q16 2 24-17", "fill", "#edb984"], ["d", "M502 231q53 6 77 60l-25 18-45-38", "fill", "url(#teaser-coat)"], ["d", "M550 297q5 16 22 14l13-18q2-12-12-21l-14 1", "fill", "#edb984"], ["d", "M393 211q58-23 107 7l32 186q-73 39-153-1z", "fill", "url(#teaser-coat)"], ["d", "M427 220l19 91 26-93", "fill", "#174d5b"], ["d", "M443 242l-10 12 14 42 17-42-12-12", "fill", "#e5aa51"], ["d", "M419 217l-25 43 32 4-15 20 35 30M480 217l24 43-31 4 16 20-43 30", "fill", "#fff9e7"], ["d", "M447 315v94", "stroke", "#91aeae", "stroke-width", "2"], ["fill", "#e4a95c", "stroke", "none"], ["cx", "456", "cy", "330", "r", "4"], ["cx", "456", "cy", "356", "r", "4"], ["cx", "456", "cy", "382", "r", "4"], ["d", "M480 307h37v40q-18 9-37-1z", "fill", "#d1e3da", "stroke-width", "2"], ["d", "M488 316v-30m11 30v-24", "stroke", "#256e7a", "stroke-width", "5"], [1, "head"], ["d", "M425 195v36q24 18 44-1v-36", "fill", "#d7986f"], ["fill", "#e8e4cb", 1, "tidy-hair"], ["d", "M369 144q-49-23-31-48 10-14 27-8-20-33 9-38 11-1 21 10-9-30 21-27l23 19q14-30 33-16l13 22q31-19 40 9-2 10-11 16 43 4 37 29l-20 20-7 40z"], ["d", "M369 152l-47-24 28-19-50-47 59 15-8-61 45 42 22-58 29 54 33-42 7 50 63-27-26 58 51 2-36 34 26 30-66 27z", "fill", "#f8eab7", 1, "wild-hair"], ["cx", "374", "cy", "157", "rx", "19", "ry", "26", "fill", "#e1a274"], ["cx", "519", "cy", "153", "rx", "18", "ry", "26", "fill", "#e1a274"], ["d", "M379 113q16-54 76-47 64 4 62 67l-4 50q-8 37-64 42-58-2-68-38z", "fill", "#edbc8b"], ["d", "M391 105q18-18 42-9M463 94q27-6 40 11", "stroke", "#f4ead0", "stroke-width", "13"], [1, "goggles"], ["d", "M366 136h165", "stroke", "#103e49", "stroke-width", "10"], ["x", "379", "y", "117", "width", "64", "height", "51", "rx", "18", "fill", "#d6fbf0", "stroke", "#216675", "stroke-width", "7"], ["x", "452", "y", "117", "width", "64", "height", "51", "rx", "18", "fill", "#d6fbf0", "stroke", "#216675", "stroke-width", "7"], ["d", "M443 136h9", "stroke", "#e1ac57", "stroke-width", "6"], ["stroke", "none", 1, "eyes"], ["cx", "417", "cy", "143", "rx", "7", "ry", "10", "fill", "#183b4a"], ["cx", "478", "cy", "143", "rx", "7", "ry", "10", "fill", "#183b4a"], ["cx", "419", "cy", "140", "r", "2", "fill", "white"], ["cx", "480", "cy", "140", "r", "2", "fill", "white"], ["d", "M388 129l16-6m57 6 16-6", "stroke", "white", "stroke-width", "4", "opacity", ".9"], ["d", "M447 144q-22 33-1 35l14-6", "fill", "#eaa876", "stroke-width", "3"], ["d", "M421 187q30 26 59-3-35 13-59 3z", "fill", "#fffbe2", "stroke-width", "3", 1, "smug-mouth"], ["cx", "453", "cy", "199", "rx", "12", "ry", "9", "fill", "#4c4141", "stroke-width", "2", 1, "surprised-mouth"], ["fill", "#4a5260", "opacity", ".47", "stroke", "none", 1, "soot"], ["cx", "402", "cy", "179", "rx", "16", "ry", "7", "transform", "rotate(22 402 179)"], ["cx", "493", "cy", "183", "rx", "13", "ry", "6"], ["cx", "480", "cy", "109", "r", "8"], ["cx", "423", "cy", "204", "r", "4"], ["stroke", "none", 1, "sticky-note"], ["d", "M428 74l78 10-10 53-75-9z", "fill", "#ffe28d"], ["d", "M485 135l11-14 1 15z", "fill", "#d4a948"], ["x", "463", "y", "98", "text-anchor", "middle", "transform", "rotate(7 463 102)", "font-size", "10", "font-weight", "bold", "fill", "#473d36"], ["x", "463"], ["x", "463", "dy", "13"], ["stroke", "#133d4d", "stroke-width", "4", "stroke-linejoin", "round", 1, "robot"], ["cx", "149", "cy", "464", "rx", "67", "ry", "12", "fill", "#051e2c", "opacity", ".5", "stroke", "none"], ["cx", "147", "cy", "433", "r", "24", "fill", "#244655"], ["cx", "147", "cy", "433", "r", "12", "fill", "#4b6e75"], ["d", "M102 359h90l-11 69h-67z", "fill", "#e9b95d"], ["d", "M110 370h71v28h-71z", "fill", "#194856"], ["x", "145", "y", "389", "fill", "#bceccb", "text-anchor", "middle", "stroke", "none", "font-size", "11", "font-weight", "bold"], ["d", "M103 382l-35-26-10 11m134 15 27-34 20 7", "fill", "none", "stroke", "#88bdbe", "stroke-width", "9"], ["cx", "57", "cy", "366", "r", "8", "fill", "#e7b45b"], ["cx", "239", "cy", "355", "r", "8", "fill", "#e7b45b"], ["d", "M145 294v-25", "stroke", "#93c2b9", "stroke-width", "5"], ["cx", "145", "cy", "263", "r", "9", "fill", "#f6b98a", 1, "antenna"], ["x", "90", "y", "295", "width", "114", "height", "72", "rx", "23", "fill", "#9dcecd"], ["x", "101", "y", "307", "width", "92", "height", "47", "rx", "15", "fill", "#123749"], ["d", "M113 328h17m34 0h17", "stroke", "#a8ffe0", "stroke-width", "7", "stroke-linecap", "round"], ["d", "M140 341h13", "stroke", "#a8ffe0", "stroke-width", "3", "stroke-linecap", "round"], ["cx", "117", "cy", "408", "r", "4", "fill", "#e26d63", "stroke", "none"], ["cx", "130", "cy", "408", "r", "4", "fill", "#76aaa8", "stroke", "none"], [1, "workbench"], ["d", "M255 421h363v19H255z", "fill", "#bb8e63", "stroke", "#123341", "stroke-width", "4"], ["d", "M270 440v74m328-74v74", "stroke", "#739ba0", "stroke-width", "13"], ["x", "276", "y", "441", "width", "320", "height", "36", "rx", "2", "fill", "#305466"], ["x", "436", "y", "464", "text-anchor", "middle", "fill", "#d7e0cc", "font-size", "11", "letter-spacing", "3"], [1, "sample-pair"], [1, "case-vials"], [1, "puff-cloud"], ["d", "M344 291q-86 2-85-50-70-26-20-77-12-60 48-61 9-54 67-23 44-50 85-1 68-25 82 35 71-1 61 60 60 39 16 79 8 69-63 68-24 61-82 30-70 31-109-60z", "fill", "#f6e5b3", "stroke", "#f9f3d2", "stroke-width", "8"], ["d", "M270 183q8-28 36-24m199 36q32 6 32 32m-194 69q-30-4-35-23", "fill", "none", "stroke", "#dbc895", "stroke-width", "5"], ["x", "404", "y", "223", "text-anchor", "middle", "font-size", "80", "font-weight", "900", "font-style", "italic", "fill", "#d16b65", "stroke", "#783e50", "stroke-width", "2", "transform", "rotate(-9 404 223)"], ["aria-live", "polite", 1, "evidence-readout"], [1, "observation"], ["role", "status"], [1, "header-tools"], ["type", "button", 3, "click"], ["title", "Look, predict, compare"], [1, "eyebrow"], ["tabindex", "-1"], ["d", "M28 14h31v47l29 55q8 24-20 24H18q-26 0-16-24l26-55z", "fill", "url(#teaser-glass)", "stroke", "#a8e1e2", "stroke-width", "3"], ["d", "M13 100h64l10 23q3 13-15 13H14q-13 0-9-13z", 1, "sample-liquid"], ["d", "M32 24h8v47l-19 38", "stroke", "#e2ffff", "stroke-width", "5", "fill", "none", "opacity", ".6"], ["x", "23", "y", "7", "width", "41", "height", "12", "rx", "4", "fill", "#e9b36b", "stroke", "#174655", "stroke-width", "2"], ["cx", "44", "cy", "110", "r", "15", "fill", "#f8f1d9"], ["x", "44", "y", "116", "text-anchor", "middle", "fill", "#1b4652", "font-size", "19", "font-weight", "bold"], ["stroke", "#ffd6e9", "stroke-width", "3", 1, "sample-sparkles"], ["d", "M-7 64v16m-8-8h16M94 47v14m-7-7h14"], ["x", "292", "y", "397", "width", "285", "height", "28", "rx", "4", "fill", "#ddb979", "stroke", "#19404b", "stroke-width", "3"], ["width", "40", "height", "83", "rx", "10", "fill", "#9cdfdc", "fill-opacity", ".45", "stroke", "#c6eeee", "stroke-width", "3"], ["x", "-2", "y", "-8", "width", "44", "height", "19", "rx", "5", "fill", "#e2af64", "stroke", "#204451", "stroke-width", "2"], ["x", "5", "y", "36", "width", "30", "height", "32", "rx", "3", "fill", "#faf1d6"], ["x", "20", "y", "58", "text-anchor", "middle", "fill", "#204451", "font-size", "20", "font-weight", "bold"], ["aria-label", "Story captions", 1, "story-dialogue"], [3, "speaking"], ["role", "status", 1, "voice-status"], ["type", "button", 1, "test-button"], ["type", "button", 1, "test-button", 3, "click"], [1, "story-note"], [1, "evidence-note"], ["type", "button", 1, "story-replay", 3, "click"], ["aria-label", "My prediction", 1, "prediction-choices"], ["type", "button"], ["type", "button", 1, "test-button", 3, "click", "disabled"], ["aria-label", "What I observed", 1, "prediction-choices"], [1, "student-prediction"]], template: function IllustratedComparisonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 2);
      \u0275\u0275conditionalCreate(1, IllustratedComparisonComponent_Conditional_1_Template, 19, 3, "header", 3);
      \u0275\u0275elementStart(2, "div", 4, 0);
      \u0275\u0275conditionalCreate(4, IllustratedComparisonComponent_Conditional_4_Template, 5, 3, "div", 5)(5, IllustratedComparisonComponent_Conditional_5_Template, 5, 2);
      \u0275\u0275elementStart(6, "div", 6);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(7, "svg", 7)(8, "defs")(9, "linearGradient", 8);
      \u0275\u0275element(10, "stop", 9)(11, "stop", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "linearGradient", 11);
      \u0275\u0275element(13, "stop", 12)(14, "stop", 13)(15, "stop", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "linearGradient", 15);
      \u0275\u0275element(17, "stop", 16)(18, "stop", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "pattern", 18);
      \u0275\u0275element(20, "path", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "radialGradient", 20);
      \u0275\u0275element(22, "stop", 21)(23, "stop", 22);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(24, "rect", 23)(25, "rect", 24)(26, "ellipse", 25);
      \u0275\u0275elementStart(27, "g", 26);
      \u0275\u0275element(28, "path", 27)(29, "circle", 28)(30, "path", 29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "g", 30);
      \u0275\u0275element(32, "rect", 31);
      \u0275\u0275elementStart(33, "text", 32);
      \u0275\u0275text(34, " TODAY\u2019S LAB FORECAST ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "text", 33);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275element(37, "path", 34);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "g", 35);
      \u0275\u0275element(39, "rect", 36)(40, "path", 37)(41, "path", 38)(42, "rect", 39);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "g", 40);
      \u0275\u0275element(44, "ellipse", 41)(45, "path", 42)(46, "path", 43)(47, "path", 44)(48, "path", 45)(49, "path", 46)(50, "path", 47)(51, "path", 48)(52, "path", 49)(53, "path", 50)(54, "path", 51)(55, "path", 52);
      \u0275\u0275elementStart(56, "g", 53);
      \u0275\u0275element(57, "circle", 54)(58, "circle", 55)(59, "circle", 56);
      \u0275\u0275elementEnd();
      \u0275\u0275element(60, "path", 57)(61, "path", 58);
      \u0275\u0275elementStart(62, "g", 59);
      \u0275\u0275element(63, "path", 60);
      \u0275\u0275elementStart(64, "g", 61);
      \u0275\u0275element(65, "path", 62);
      \u0275\u0275elementEnd();
      \u0275\u0275element(66, "path", 63)(67, "ellipse", 64)(68, "ellipse", 65)(69, "path", 66)(70, "path", 67);
      \u0275\u0275elementStart(71, "g", 68);
      \u0275\u0275element(72, "path", 69)(73, "rect", 70)(74, "rect", 71)(75, "path", 72);
      \u0275\u0275elementStart(76, "g", 73);
      \u0275\u0275element(77, "ellipse", 74)(78, "ellipse", 75)(79, "circle", 76)(80, "circle", 77);
      \u0275\u0275elementEnd();
      \u0275\u0275element(81, "path", 78);
      \u0275\u0275elementEnd();
      \u0275\u0275element(82, "path", 79)(83, "path", 80)(84, "ellipse", 81);
      \u0275\u0275elementStart(85, "g", 82);
      \u0275\u0275element(86, "ellipse", 83)(87, "ellipse", 84)(88, "circle", 85)(89, "circle", 86);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(90, "g", 87);
      \u0275\u0275element(91, "path", 88)(92, "path", 89);
      \u0275\u0275elementStart(93, "text", 90)(94, "tspan", 91);
      \u0275\u0275text(95, "NEEDS MORE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(96, "tspan", 92);
      \u0275\u0275text(97, "EVIDENCE");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(98, "g", 93);
      \u0275\u0275element(99, "ellipse", 94)(100, "circle", 95)(101, "circle", 96)(102, "path", 97)(103, "path", 98);
      \u0275\u0275elementStart(104, "text", 99);
      \u0275\u0275text(105);
      \u0275\u0275elementEnd();
      \u0275\u0275element(106, "path", 100)(107, "circle", 101)(108, "circle", 102)(109, "path", 103)(110, "circle", 104)(111, "rect", 105)(112, "rect", 106)(113, "path", 107)(114, "path", 108)(115, "circle", 109)(116, "circle", 110);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(117, "g", 111);
      \u0275\u0275element(118, "path", 112)(119, "path", 113)(120, "rect", 114);
      \u0275\u0275elementStart(121, "text", 115);
      \u0275\u0275text(122, " VIRTUAL COMPARISON BENCH ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(123, "g", 116);
      \u0275\u0275repeaterCreate(124, IllustratedComparisonComponent_For_125_Template, 9, 5, ":svg:g", null, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(126, IllustratedComparisonComponent_Conditional_126_Template, 4, 1, ":svg:g", 117);
      \u0275\u0275elementStart(127, "g", 118);
      \u0275\u0275element(128, "path", 119)(129, "path", 120);
      \u0275\u0275elementStart(130, "text", 121);
      \u0275\u0275text(131, " POOF! ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(132, "div", 122);
      \u0275\u0275repeaterCreate(133, IllustratedComparisonComponent_For_134_Template, 6, 4, "span", 123, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(135, IllustratedComparisonComponent_Conditional_135_Template, 9, 2)(136, IllustratedComparisonComponent_Conditional_136_Template, 5, 2)(137, IllustratedComparisonComponent_Conditional_137_Template, 2, 0, "p", 124)(138, IllustratedComparisonComponent_Conditional_138_Template, 9, 4)(139, IllustratedComparisonComponent_Conditional_139_Template, 6, 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("story-mode", ctx.storyMode())("singed", ctx.singed())("testing", ctx.stage() === "testing")("poofing", ctx.stage() === "poof")("handoff", ctx.stage() === "handoff");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.storyMode() ? 1 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.storyMode() ? 4 : 5);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-label", ctx.singed() ? "After the test: sample A is blue; sample B is pink." : "Before the test: samples A and B both look clear.");
      \u0275\u0275advance(30);
      \u0275\u0275textInterpolate1(" ", ctx.singed() ? "CHANCE OF BAD HAIR" : "100% CONFIDENCE", " ");
      \u0275\u0275advance(69);
      \u0275\u0275textInterpolate1(" ", ctx.singed() ? "CLUE FOUND" : "EVIDENCE: 0", " ");
      \u0275\u0275advance(18);
      \u0275\u0275classProp("hidden", ctx.stage() === "handoff");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.config().samples);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.stage() === "handoff" ? 126 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.config().samples);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.storyMode() ? 135 : ctx.stage() === "welcome" ? 136 : ctx.stage() === "testing" || ctx.stage() === "poof" ? 137 : ctx.stage() === "reveal" ? 138 : 139);
    }
  }, dependencies: [TaskGuideComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n}\n.cartoon-opening[_ngcontent-%COMP%] {\n  color: #edf5ed;\n  padding: 28px 34px 18px;\n  background: #0d2936;\n  font-family:\n    "Trebuchet MS",\n    Arial,\n    sans-serif;\n}\n.episode-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 30px;\n  margin-bottom: 22px;\n}\n.episode-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  max-width: 840px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: #e8c179;\n  font-size: 10px;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  font-weight: 800;\n  margin: 0 0 10px;\n}\n.episode-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font:\n    700 clamp(27px, 2.6vw, 40px)/1.15 "Trebuchet MS",\n    Arial,\n    sans-serif;\n  letter-spacing: -0.04em;\n  text-wrap: balance;\n  margin: 0 0 12px;\n}\n.invitation[_ngcontent-%COMP%] {\n  color: #b1ced0;\n  font-size: 13px;\n  line-height: 1.7;\n  margin: 0;\n}\n.episode-tag[_ngcontent-%COMP%] {\n  border: 1px solid #66868a;\n  color: #9db9bd;\n  padding: 13px 16px;\n  border-radius: 7px;\n  font-size: 9px;\n  letter-spacing: 0.11em;\n  line-height: 1.9;\n  white-space: nowrap;\n  transform: rotate(3deg);\n}\n.episode-tag[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: #f2ce8b;\n}\n.episode-body[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.45fr) minmax(270px, 1fr);\n  gap: 24px;\n  align-items: stretch;\n}\n.illustration-column[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n.illustration[_ngcontent-%COMP%] {\n  border: 1px solid #46737f;\n  border-radius: 12px;\n  overflow: hidden;\n  background: #123c4c;\n  position: relative;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.illustration[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: auto;\n  max-height: 540px;\n}\n.character-names[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-around;\n  gap: 15px;\n  padding: 10px 12px;\n  background: #0b2634;\n  font-size: 9px;\n  line-height: 1.5;\n  color: #a5c3c6;\n  border-top: 1px solid #3a626e;\n}\n.character-names[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: #f7dc9c;\n}\n.evidence-readout[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  border: 1px solid #375c66;\n  border-radius: 8px;\n  background: #082331;\n  padding: 14px 18px;\n}\n.readout-label[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  color: #85bdba;\n  font-size: 8px;\n  letter-spacing: 0.16em;\n  font-weight: 700;\n}\n.observation[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 10px 1fr;\n  gap: 5px 8px;\n  font-size: 11px;\n  color: #b3d0ca;\n  align-items: center;\n}\n.observation[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n}\n.observation[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: #eef5dc;\n}\n.observation[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  grid-column: 2;\n}\n.dialogue-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 22px;\n  border-radius: 12px;\n  background: #f7f0df;\n  color: #23424a;\n  min-width: 0;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1333333333);\n}\n.scene-count[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  font-size: 9px;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  padding-bottom: 18px;\n  border-bottom: 1px solid #d4d8c4;\n  margin-bottom: 17px;\n  color: #5e7772;\n}\n.caption-tag[_ngcontent-%COMP%] {\n  color: #7b806c;\n  font-weight: 500;\n  font-size: 8px;\n}\n.speech-bubble[_ngcontent-%COMP%] {\n  border: 1px solid #d9d6bf;\n  border-radius: 9px;\n  background: #fffdf1;\n  padding: 15px 16px;\n  margin-bottom: 14px;\n  transition: border-color 0.2s, background 0.2s;\n}\n.speaker[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  align-items: center;\n  font-size: 12px;\n  font-weight: 800;\n  color: #235e6b;\n}\n.speaker[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-style: normal;\n  color: #a77737;\n}\n.speech-bubble[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 10px 0 0;\n  font-size: 13px;\n  line-height: 1.75;\n  color: #304e50;\n}\n.robot-speech[_ngcontent-%COMP%] {\n  background: #e5eddf;\n  border-color: #c9d6c5;\n}\n.robot-speech[_ngcontent-%COMP%]   .speaker[_ngcontent-%COMP%] {\n  color: #4d6b52;\n}\n.speaking[_ngcontent-%COMP%] {\n  border: 2px solid #c09343;\n  padding: 14px 15px;\n  box-shadow: 0 0 0 3px rgba(213, 188, 113, 0.1098039216);\n}\n.clue-card[_ngcontent-%COMP%] {\n  padding: 12px 15px;\n  margin-bottom: 14px;\n  border-left: 3px solid #779761;\n  background: #e9ecd7;\n}\n.clue-card[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 0.13em;\n  font-weight: 800;\n  color: #4f7143;\n}\n.clue-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.65;\n  margin: 7px 0 0;\n}\n.scene-action[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: 8px;\n}\n.test-button[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  min-height: 56px;\n  color: #183e48;\n  background: #edbb64;\n  border: 1px solid #d2a45b;\n  border-bottom: 4px solid #b68a42;\n  border-radius: 8px;\n  padding: 13px 15px;\n  font:\n    800 13px/1.5 "Trebuchet MS",\n    Arial,\n    sans-serif;\n  letter-spacing: 0.02em;\n  cursor: pointer;\n  transition: transform 0.12s, background 0.12s;\n}\n.test-button[_ngcontent-%COMP%]:hover {\n  background: #f6cd7e;\n  transform: translateY(-2px);\n}\n.test-button[_ngcontent-%COMP%]:active {\n  transform: translateY(1px);\n}\n.test-button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  margin-left: auto;\n  font-size: 19px;\n}\n.scene-action[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 10px;\n  color: #7b7b64;\n  font-size: 9px;\n  text-align: center;\n  line-height: 1.6;\n}\n.testing-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  text-align: center;\n  color: #426e72;\n  padding: 18px;\n  margin: 0;\n  border: 1px dashed #92ad9d;\n  border-radius: 8px;\n}\n.scene-controls[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px 20px;\n  padding-top: 18px;\n}\n.scene-controls[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px 16px;\n}\n.scene-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font:\n    700 11px/1.5 "Trebuchet MS",\n    Arial,\n    sans-serif;\n  background: transparent;\n  border: 1px solid #5b7e87;\n  border-radius: 6px;\n  color: #cce3db;\n  padding: 10px 14px;\n  min-height: 44px;\n  cursor: pointer;\n}\n.scene-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: #204854;\n}\n.scene-controls[_ngcontent-%COMP%]   .voice-controls[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]:first-child {\n  color: #f4d194;\n  border-color: #bc9960;\n}\n.voice-controls[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  color: #9fbbbd;\n  font-size: 9px;\n  max-width: 185px;\n  line-height: 1.6;\n}\n.cartoon-note[_ngcontent-%COMP%] {\n  color: #91b3b4;\n  font-size: 9px;\n  line-height: 1.6;\n  margin: 12px 0 0;\n  max-width: 1000px;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #8ecfff;\n  outline-offset: 4px;\n}\n.dialogue-panel[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #e6c780;\n  outline-offset: 4px;\n}\n.wild-hair[_ngcontent-%COMP%], \n.surprised-mouth[_ngcontent-%COMP%], \n.soot[_ngcontent-%COMP%], \n.sticky-note[_ngcontent-%COMP%] {\n  display: none;\n}\n.singed[_ngcontent-%COMP%]   .wild-hair[_ngcontent-%COMP%], \n.singed[_ngcontent-%COMP%]   .surprised-mouth[_ngcontent-%COMP%], \n.singed[_ngcontent-%COMP%]   .soot[_ngcontent-%COMP%], \n.singed[_ngcontent-%COMP%]   .sticky-note[_ngcontent-%COMP%] {\n  display: inline;\n}\n.singed[_ngcontent-%COMP%]   .tidy-hair[_ngcontent-%COMP%], \n.singed[_ngcontent-%COMP%]   .smug-mouth[_ngcontent-%COMP%] {\n  display: none;\n}\n.singed[_ngcontent-%COMP%]   .goggles[_ngcontent-%COMP%] {\n  transform: rotate(-12deg);\n  transform-origin: 448px 142px;\n}\n.head[_ngcontent-%COMP%] {\n  transform-origin: 448px 225px;\n  animation: _ngcontent-%COMP%_self-assured 5s ease-in-out infinite;\n}\n.singed[_ngcontent-%COMP%]   .head[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_recovery 0.8s ease-out;\n}\n.eyes[_ngcontent-%COMP%] {\n  transform-origin: 448px 143px;\n  animation: _ngcontent-%COMP%_blink 6s infinite;\n}\n.antenna[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_beep 4s ease-in-out infinite;\n}\n.sample-liquid[_ngcontent-%COMP%] {\n  transition: fill 0.6s, opacity 0.6s;\n}\n.puff-cloud[_ngcontent-%COMP%] {\n  opacity: 0;\n  transform-origin: 416px 259px;\n  pointer-events: none;\n}\n.poofing[_ngcontent-%COMP%]   .puff-cloud[_ngcontent-%COMP%] {\n  opacity: 1;\n  animation: _ngcontent-%COMP%_puff 0.95s ease-out both;\n}\n.poofing[_ngcontent-%COMP%]   .scientist[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_wobble 0.8s ease-out;\n  transform-origin: 450px 400px;\n}\n.sticky-note[_ngcontent-%COMP%] {\n  transform-origin: 465px 101px;\n  animation: _ngcontent-%COMP%_note-drop 0.8s ease-out;\n}\n.case-vials[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_case-arrival 0.7s ease-out;\n}\n.hidden[_ngcontent-%COMP%] {\n  display: none;\n}\n@keyframes _ngcontent-%COMP%_self-assured {\n  0%, 100% {\n    transform: rotate(-1deg);\n  }\n  50% {\n    transform: rotate(2deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_blink {\n  0%, 44%, 47%, 100% {\n    transform: scaleY(1);\n  }\n  45%, 46% {\n    transform: scaleY(0.1);\n  }\n}\n@keyframes _ngcontent-%COMP%_beep {\n  0%, 80%, 100% {\n    fill: #f6b98a;\n  }\n  85%, 90% {\n    fill: #a9f4cd;\n  }\n}\n@keyframes _ngcontent-%COMP%_puff {\n  0% {\n    opacity: 0;\n    transform: scale(0.15) rotate(-12deg);\n  }\n  25% {\n    opacity: 1;\n    transform: scale(1.13) rotate(3deg);\n  }\n  60% {\n    opacity: 1;\n    transform: scale(1.05);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(1.32) translateY(-45px);\n  }\n}\n@keyframes _ngcontent-%COMP%_wobble {\n  0%, 100% {\n    transform: rotate(0deg);\n  }\n  25% {\n    transform: rotate(5deg);\n  }\n  55% {\n    transform: rotate(-3deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_recovery {\n  0% {\n    transform: rotate(7deg);\n  }\n  65% {\n    transform: rotate(-3deg);\n  }\n  100% {\n    transform: rotate(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_note-drop {\n  from {\n    opacity: 0;\n    transform: translateY(-65px) rotate(-20deg);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _ngcontent-%COMP%_case-arrival {\n  from {\n    opacity: 0;\n    transform: translateX(-60px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (min-width: 1350px) {\n  .episode-body[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1.65fr) minmax(370px, 1fr);\n  }\n  .speech-bubble[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .episode-header[_ngcontent-%COMP%] {\n    margin-bottom: 26px;\n  }\n}\n@media (max-width: 1000px) {\n  .cartoon-opening[_ngcontent-%COMP%] {\n    padding: 25px 24px 18px;\n  }\n  .episode-body[_ngcontent-%COMP%] {\n    gap: 16px;\n    grid-template-columns: minmax(0, 1.15fr) minmax(280px, 1fr);\n  }\n  .dialogue-panel[_ngcontent-%COMP%] {\n    padding: 17px;\n  }\n  .speech-bubble[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .speaking[_ngcontent-%COMP%] {\n    padding: 11px;\n  }\n  .speech-bubble[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 12px;\n    line-height: 1.7;\n  }\n  .episode-tag[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .character-names[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: center;\n    gap: 4px;\n  }\n  .episode-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 32px;\n  }\n  .evidence-readout[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n}\n@media (max-width: 740px) {\n  .cartoon-opening[_ngcontent-%COMP%] {\n    padding: 22px 15px 16px;\n  }\n  .episode-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 28px;\n  }\n  .episode-header[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .invitation[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .episode-body[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .illustration[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    max-height: 360px;\n  }\n  .character-names[_ngcontent-%COMP%] {\n    flex-direction: row;\n    font-size: 8px;\n  }\n  .evidence-readout[_ngcontent-%COMP%] {\n    margin-top: 8px;\n    grid-template-columns: 1fr 1fr;\n  }\n  .dialogue-panel[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .speech-bubble[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .scene-controls[_ngcontent-%COMP%] {\n    align-items: stretch;\n  }\n  .scene-controls[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n  }\n  .voice-controls[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    max-width: none;\n    width: 100%;\n  }\n  .scene-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 10px;\n    font-size: 10px;\n  }\n  .cartoon-note[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    animation: none !important;\n    transition: none !important;\n    scroll-behavior: auto !important;\n  }\n  .poofing[_ngcontent-%COMP%]   .puff-cloud[_ngcontent-%COMP%] {\n    opacity: 1;\n  }\n}\n.cartoon-opening[_ngcontent-%COMP%] {\n  padding: 16px 24px 12px;\n}\n.episode-header[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.episode-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(25px, 2.2vw, 33px);\n  margin-bottom: 8px;\n}\n.episode-body[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1.1fr) minmax(350px, 1fr);\n  align-items: start;\n}\n.illustration[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  max-height: 300px;\n}\n.dialogue-panel[_ngcontent-%COMP%] {\n  padding: 14px;\n}\n.scene-count[_ngcontent-%COMP%] {\n  padding-bottom: 8px;\n  margin-bottom: 8px;\n}\n.speech-bubble[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  margin-bottom: 8px;\n}\n.speech-bubble[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.45;\n  margin: 6px 0 0;\n}\n.test-button[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  min-height: 44px;\n}\n@media (max-width: 740px) {\n  .episode-body[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .illustration[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    max-height: 220px;\n  }\n}\n.cartoon-opening[_ngcontent-%COMP%] {\n  padding: 0;\n  min-height: calc(100dvh - 52px);\n}\n.episode-header[_ngcontent-%COMP%] {\n  padding: 8px 24px;\n  margin: 0;\n  border-bottom: 1px solid #48626d;\n  gap: 12px;\n}\n.header-tools[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.header-tools[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 0;\n  background: transparent;\n  color: inherit;\n  padding: 8px;\n  font: inherit;\n  cursor: pointer;\n}\n.comparison-task[_ngcontent-%COMP%] {\n  max-width: 860px;\n  margin: auto;\n  padding: 22px 24px 36px;\n  text-align: center;\n}\n.comparison-task[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.comparison-task[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(23px, 3vw, 32px);\n  margin: 8px 0 18px;\n}\n.comparison-task[_ngcontent-%COMP%]   .illustration[_ngcontent-%COMP%] {\n  max-width: 570px;\n  height: 270px;\n  margin: auto;\n}\n.comparison-task[_ngcontent-%COMP%]   .illustration[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n}\n.comparison-task[_ngcontent-%COMP%]   .evidence-readout[_ngcontent-%COMP%] {\n  max-width: 540px;\n  margin: 12px auto;\n  text-align: left;\n}\n.comparison-task[_ngcontent-%COMP%]   .observation[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.prediction-choices[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 12px;\n  margin: 20px auto;\n}\n.prediction-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 14px 18px;\n  min-height: 50px;\n  border: 2px solid #83a7aa;\n  border-radius: 12px;\n  color: #f6f3df;\n  background: #183e4d;\n  font: 700 16px Arial;\n  cursor: pointer;\n}\n.prediction-choices[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  color: #163542;\n  border-color: #f0cc7b;\n  background: #f0cc7b;\n}\n.comparison-task[_ngcontent-%COMP%]   .test-button[_ngcontent-%COMP%] {\n  width: auto;\n  min-height: 50px;\n  display: inline-flex;\n  padding: 12px 24px;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.evidence-note[_ngcontent-%COMP%] {\n  max-width: 570px;\n  margin: 18px auto;\n}\n@media (max-width: 650px) {\n  .episode-header[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    padding: 8px 14px;\n    font-size: 13px;\n  }\n  .header-tools[_ngcontent-%COMP%] {\n    margin-left: auto;\n  }\n  .comparison-task[_ngcontent-%COMP%] {\n    padding: 18px 14px;\n  }\n  .prediction-choices[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .prediction-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 10px;\n    font-size: 14px;\n  }\n  .comparison-task[_ngcontent-%COMP%]   .illustration[_ngcontent-%COMP%] {\n    height: 235px;\n  }\n}\n.story-mode[_ngcontent-%COMP%] {\n  min-height: 0;\n}\n.story-mode[_ngcontent-%COMP%]   .comparison-task[_ngcontent-%COMP%] {\n  padding: 18px;\n}\n.story-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  text-align: left;\n}\n.story-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #f8edce;\n  font-size: 17px;\n}\n.story-heading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.story-replay[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 8px 12px;\n  border: 1px solid #6d9196;\n  border-radius: 8px;\n  color: #e4f0e9;\n  background: #173d4c;\n  font: inherit;\n  font-size: 12px;\n  cursor: pointer;\n}\n.story-mode[_ngcontent-%COMP%]   .illustration[_ngcontent-%COMP%] {\n  height: 250px;\n  margin-top: 12px;\n}\n.story-mode[_ngcontent-%COMP%]   .evidence-readout[_ngcontent-%COMP%] {\n  gap: 8px;\n}\n.story-mode[_ngcontent-%COMP%]   .observation[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 8px;\n}\n.story-dialogue[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.story-dialogue[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  padding: 8px 10px;\n  border-left: 2px solid #54737b;\n  color: #dcece7;\n  background: #0d2e3b;\n  font-size: 13px;\n  line-height: 1.55;\n}\n.story-dialogue[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #f4d68e;\n}\n.story-dialogue[_ngcontent-%COMP%]   .speaking[_ngcontent-%COMP%] {\n  border-left-color: #ffd47c;\n  background: #234753;\n}\n.story-mode[_ngcontent-%COMP%]   .voice-status[_ngcontent-%COMP%], \n.story-note[_ngcontent-%COMP%] {\n  font-size: 11px;\n  line-height: 1.5;\n  color: #bbd4d1;\n  margin: 8px 0;\n}\n.story-mode[_ngcontent-%COMP%]   .test-button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  font-size: 13px;\n  margin-top: 8px;\n}\n.story-mode[_ngcontent-%COMP%]   .evidence-note[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.5;\n}\n@media (max-width: 650px) {\n  .story-mode[_ngcontent-%COMP%]   .illustration[_ngcontent-%COMP%] {\n    height: 210px;\n  }\n  .story-mode[_ngcontent-%COMP%]   .comparison-task[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n}\n/*# sourceMappingURL=illustrated-comparison.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IllustratedComparisonComponent, [{
    type: Component,
    args: [{ selector: "app-illustrated-comparison", imports: [TaskGuideComponent], template: `<section
  class="cartoon-opening"
  [class.story-mode]="storyMode()"
  [class.singed]="singed()"
  [class.testing]="stage() === 'testing'"
  [class.poofing]="stage() === 'poof'"
  [class.handoff]="stage() === 'handoff'"
>
  @if (!storyMode()) {
    <header class="episode-header">
      <strong>The Mystery of the Unlabeled Shelf</strong>
      <div class="header-tools">
        <button type="button" (click)="reset()">\u21BA Restart</button
        ><button type="button" (click)="finish(true)">Project preview</button>
        <app-task-guide title="Look, predict, compare"
          ><p>{{ config().invitation }}</p>
          <p>A prediction is your idea before a test. Compare both samples after the same test.</p>
          @for (line of lines(); track $index) {
            <p>{{ line.text }}</p>
          }
          <button type="button" (click)="toggleVoice()">
            {{ voices() ? 'Mute voices' : 'Play voices' }}
          </button>
          <p role="status">{{ audioNotice() }}</p>
        </app-task-guide>
      </div>
    </header>
  }
  <div class="comparison-task" #dialoguePanel tabindex="-1">
    @if (storyMode()) {
      <div class="story-heading">
        <h2>{{ config().scientistName }}\u2019s story</h2>
        <button type="button" (click)="toggleVoice()" [attr.aria-pressed]="voices()">
          {{ voices() ? 'Mute voices' : 'Play voices' }}
        </button>
      </div>
    } @else {
      <p class="eyebrow">
        {{
          stage() === 'welcome'
            ? '1 \xB7 Predict'
            : stage() === 'handoff'
              ? '3 \xB7 Explain'
              : '2 \xB7 Test and compare'
        }}
      </p>
      <h1 #sceneHeading tabindex="-1">
        {{
          stage() === 'welcome'
            ? 'Will both samples react the same way?'
            : stage() === 'handoff'
              ? 'Looking alike was not enough.'
              : 'What changed?'
        }}
      </h1>
    }
    <div
      class="illustration"
      role="img"
      [attr.aria-label]="
        singed()
          ? 'After the test: sample A is blue; sample B is pink.'
          : 'Before the test: samples A and B both look clear.'
      "
    >
      <svg viewBox="0 0 720 530" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="teaser-wall" x2="0" y2="1">
            <stop stop-color="#185467" />
            <stop offset="1" stop-color="#092c3d" />
          </linearGradient>
          <linearGradient id="teaser-coat" x1="0" x2="1">
            <stop stop-color="#fcf8e6" />
            <stop offset=".65" stop-color="#e9eee8" />
            <stop offset="1" stop-color="#a7c8c7" />
          </linearGradient>
          <linearGradient id="teaser-glass" x2="1" y2="1">
            <stop stop-color="#d6ffff" stop-opacity=".45" />
            <stop offset="1" stop-color="#c6f9ff" stop-opacity=".08" />
          </linearGradient>
          <pattern id="teaser-grid" width="38" height="38" patternUnits="userSpaceOnUse">
            <path d="M38 0H0V38" fill="none" stroke="#81c6cb" stroke-opacity=".09" />
          </pattern>
          <radialGradient id="teaser-glow">
            <stop stop-color="#9eeee8" stop-opacity=".18" />
            <stop offset="1" stop-color="#9eeee8" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="720" height="530" fill="url(#teaser-wall)" />
        <rect width="720" height="530" fill="url(#teaser-grid)" />
        <ellipse cx="445" cy="220" rx="340" ry="275" fill="url(#teaser-glow)" />
        <g fill="none" stroke="#60a2ae" stroke-width="3" opacity=".28">
          <path d="M30 0V90Q30 110 55 110H180V150M665 0V250H705V375" />
          <circle cx="180" cy="162" r="12" />
          <path d="M645 80h50M50 300h70M82 278v44" />
        </g>
        <g class="wall-sign">
          <rect x="35" y="35" width="202" height="84" rx="9" fill="#0d2936" stroke="#54808b" />
          <text x="52" y="61" fill="#98c8cc" font-size="10" letter-spacing="2">
            TODAY\u2019S LAB FORECAST
          </text>
          <text x="52" y="88" fill="#f1d493" font-size="17" font-weight="bold">
            {{ singed() ? 'CHANCE OF BAD HAIR' : '100% CONFIDENCE' }}
          </text>
          <path d="M52 99h164" stroke="#3f616c" />
        </g>
        <g class="shelf-props" opacity=".5">
          <rect x="44" y="225" width="154" height="10" rx="3" fill="#608b8a" />
          <path
            d="M65 156h21v36l15 31H49l16-31z"
            fill="#f9c676"
            stroke="#b3ddd5"
            stroke-width="2"
          />
          <path d="M126 165h21v57h-21z" fill="#6bddd0" stroke="#b3ddd5" stroke-width="2" />
          <rect x="160" y="184" width="19" height="37" rx="3" fill="#ef9c95" />
        </g>
        <g
          class="scientist"
          stroke="#173745"
          stroke-width="4"
          stroke-linejoin="round"
          stroke-linecap="round"
        >
          <ellipse cx="458" cy="492" rx="112" ry="18" fill="#061e2c" opacity=".55" stroke="none" />
          <path d="M400 401l-6 77 34 2 24-79M464 401l17 80 34-2-6-80" fill="#213d54" />
          <path d="M393 470q-43 12-38 24l75-1 1-21M480 473l33-1q38 9 40 23h-71z" fill="#e6a859" />
          <path d="M384 229q-40 7-60 49l-33-20-13 27 51 34q28 3 52-34" fill="url(#teaser-coat)" />
          <path
            d="M282 256q-2-16-8-18-7-3-4 15l-23-12q-16-8-18 1l16 16-12-3q-12-4-11 6l44 28q16 2 24-17"
            fill="#edb984"
          />
          <path d="M502 231q53 6 77 60l-25 18-45-38" fill="url(#teaser-coat)" />
          <path d="M550 297q5 16 22 14l13-18q2-12-12-21l-14 1" fill="#edb984" />
          <path d="M393 211q58-23 107 7l32 186q-73 39-153-1z" fill="url(#teaser-coat)" />
          <path d="M427 220l19 91 26-93" fill="#174d5b" />
          <path d="M443 242l-10 12 14 42 17-42-12-12" fill="#e5aa51" />
          <path
            d="M419 217l-25 43 32 4-15 20 35 30M480 217l24 43-31 4 16 20-43 30"
            fill="#fff9e7"
          />
          <path d="M447 315v94" stroke="#91aeae" stroke-width="2" />
          <g fill="#e4a95c" stroke="none">
            <circle cx="456" cy="330" r="4" />
            <circle cx="456" cy="356" r="4" />
            <circle cx="456" cy="382" r="4" />
          </g>
          <path d="M480 307h37v40q-18 9-37-1z" fill="#d1e3da" stroke-width="2" />
          <path d="M488 316v-30m11 30v-24" stroke="#256e7a" stroke-width="5" />
          <g class="head">
            <path d="M425 195v36q24 18 44-1v-36" fill="#d7986f" />
            <g class="tidy-hair" fill="#e8e4cb">
              <path
                d="M369 144q-49-23-31-48 10-14 27-8-20-33 9-38 11-1 21 10-9-30 21-27l23 19q14-30 33-16l13 22q31-19 40 9-2 10-11 16 43 4 37 29l-20 20-7 40z"
              />
            </g>
            <path
              class="wild-hair"
              d="M369 152l-47-24 28-19-50-47 59 15-8-61 45 42 22-58 29 54 33-42 7 50 63-27-26 58 51 2-36 34 26 30-66 27z"
              fill="#f8eab7"
            />
            <ellipse cx="374" cy="157" rx="19" ry="26" fill="#e1a274" />
            <ellipse cx="519" cy="153" rx="18" ry="26" fill="#e1a274" />
            <path
              d="M379 113q16-54 76-47 64 4 62 67l-4 50q-8 37-64 42-58-2-68-38z"
              fill="#edbc8b"
            />
            <path d="M391 105q18-18 42-9M463 94q27-6 40 11" stroke="#f4ead0" stroke-width="13" />
            <g class="goggles">
              <path d="M366 136h165" stroke="#103e49" stroke-width="10" />
              <rect
                x="379"
                y="117"
                width="64"
                height="51"
                rx="18"
                fill="#d6fbf0"
                stroke="#216675"
                stroke-width="7"
              />
              <rect
                x="452"
                y="117"
                width="64"
                height="51"
                rx="18"
                fill="#d6fbf0"
                stroke="#216675"
                stroke-width="7"
              />
              <path d="M443 136h9" stroke="#e1ac57" stroke-width="6" />
              <g class="eyes" stroke="none">
                <ellipse cx="417" cy="143" rx="7" ry="10" fill="#183b4a" />
                <ellipse cx="478" cy="143" rx="7" ry="10" fill="#183b4a" />
                <circle cx="419" cy="140" r="2" fill="white" />
                <circle cx="480" cy="140" r="2" fill="white" />
              </g>
              <path d="M388 129l16-6m57 6 16-6" stroke="white" stroke-width="4" opacity=".9" />
            </g>
            <path d="M447 144q-22 33-1 35l14-6" fill="#eaa876" stroke-width="3" />
            <path
              class="smug-mouth"
              d="M421 187q30 26 59-3-35 13-59 3z"
              fill="#fffbe2"
              stroke-width="3"
            />
            <ellipse
              class="surprised-mouth"
              cx="453"
              cy="199"
              rx="12"
              ry="9"
              fill="#4c4141"
              stroke-width="2"
            />
            <g class="soot" fill="#4a5260" opacity=".47" stroke="none">
              <ellipse cx="402" cy="179" rx="16" ry="7" transform="rotate(22 402 179)" />
              <ellipse cx="493" cy="183" rx="13" ry="6" />
              <circle cx="480" cy="109" r="8" />
              <circle cx="423" cy="204" r="4" />
            </g>
            <g class="sticky-note" stroke="none">
              <path d="M428 74l78 10-10 53-75-9z" fill="#ffe28d" />
              <path d="M485 135l11-14 1 15z" fill="#d4a948" />
              <text
                x="463"
                y="98"
                text-anchor="middle"
                transform="rotate(7 463 102)"
                font-size="10"
                font-weight="bold"
                fill="#473d36"
              >
                <tspan x="463">NEEDS MORE</tspan>
                <tspan x="463" dy="13">EVIDENCE</tspan>
              </text>
            </g>
          </g>
        </g>
        <g class="robot" stroke="#133d4d" stroke-width="4" stroke-linejoin="round">
          <ellipse cx="149" cy="464" rx="67" ry="12" fill="#051e2c" opacity=".5" stroke="none" />
          <circle cx="147" cy="433" r="24" fill="#244655" />
          <circle cx="147" cy="433" r="12" fill="#4b6e75" />
          <path d="M102 359h90l-11 69h-67z" fill="#e9b95d" />
          <path d="M110 370h71v28h-71z" fill="#194856" />
          <text
            x="145"
            y="389"
            fill="#bceccb"
            text-anchor="middle"
            stroke="none"
            font-size="11"
            font-weight="bold"
          >
            {{ singed() ? 'CLUE FOUND' : 'EVIDENCE: 0' }}
          </text>
          <path
            d="M103 382l-35-26-10 11m134 15 27-34 20 7"
            fill="none"
            stroke="#88bdbe"
            stroke-width="9"
          />
          <circle cx="57" cy="366" r="8" fill="#e7b45b" />
          <circle cx="239" cy="355" r="8" fill="#e7b45b" />
          <path d="M145 294v-25" stroke="#93c2b9" stroke-width="5" />
          <circle class="antenna" cx="145" cy="263" r="9" fill="#f6b98a" />
          <rect x="90" y="295" width="114" height="72" rx="23" fill="#9dcecd" />
          <rect x="101" y="307" width="92" height="47" rx="15" fill="#123749" />
          <path d="M113 328h17m34 0h17" stroke="#a8ffe0" stroke-width="7" stroke-linecap="round" />
          <path d="M140 341h13" stroke="#a8ffe0" stroke-width="3" stroke-linecap="round" />
          <circle cx="117" cy="408" r="4" fill="#e26d63" stroke="none" />
          <circle cx="130" cy="408" r="4" fill="#76aaa8" stroke="none" />
        </g>
        <g class="workbench">
          <path d="M255 421h363v19H255z" fill="#bb8e63" stroke="#123341" stroke-width="4" />
          <path d="M270 440v74m328-74v74" stroke="#739ba0" stroke-width="13" />
          <rect x="276" y="441" width="320" height="36" rx="2" fill="#305466" />
          <text
            x="436"
            y="464"
            text-anchor="middle"
            fill="#d7e0cc"
            font-size="11"
            letter-spacing="3"
          >
            VIRTUAL COMPARISON BENCH
          </text>
        </g>
        <g class="sample-pair" [class.hidden]="stage() === 'handoff'">
          @for (sample of config().samples; track sample.id; let i = $index) {
            <g [attr.transform]="'translate(' + (310 + i * 130) + ' 280)'">
              <path
                d="M28 14h31v47l29 55q8 24-20 24H18q-26 0-16-24l26-55z"
                fill="url(#teaser-glass)"
                stroke="#a8e1e2"
                stroke-width="3"
              />
              <path
                d="M13 100h64l10 23q3 13-15 13H14q-13 0-9-13z"
                [attr.fill]="(i === 0 ? firstColor() : secondColor()) ? sample.color : '#bce5df'"
                [attr.opacity]="(i === 0 ? firstColor() : secondColor()) ? '.95' : '.25'"
                class="sample-liquid"
              />
              <path
                d="M32 24h8v47l-19 38"
                stroke="#e2ffff"
                stroke-width="5"
                fill="none"
                opacity=".6"
              />
              <rect
                x="23"
                y="7"
                width="41"
                height="12"
                rx="4"
                fill="#e9b36b"
                stroke="#174655"
                stroke-width="2"
              />
              <circle cx="44" cy="110" r="15" fill="#f8f1d9" />
              <text
                x="44"
                y="116"
                text-anchor="middle"
                fill="#1b4652"
                font-size="19"
                font-weight="bold"
              >
                {{ i === 0 ? 'A' : 'B' }}
              </text>
              @if (i === 1 && secondColor()) {
                <g class="sample-sparkles" stroke="#ffd6e9" stroke-width="3">
                  <path d="M-7 64v16m-8-8h16M94 47v14m-7-7h14" />
                </g>
              }
            </g>
          }
        </g>
        @if (stage() === 'handoff') {
          <g class="case-vials">
            <rect
              x="292"
              y="397"
              width="285"
              height="28"
              rx="4"
              fill="#ddb979"
              stroke="#19404b"
              stroke-width="3"
            />
            @for (label of ['A', 'B', 'C', 'D']; track label; let i = $index) {
              <g [attr.transform]="'translate(' + (310 + i * 67) + ' 315)'">
                <rect
                  width="40"
                  height="83"
                  rx="10"
                  fill="#9cdfdc"
                  fill-opacity=".45"
                  stroke="#c6eeee"
                  stroke-width="3"
                />
                <rect
                  x="-2"
                  y="-8"
                  width="44"
                  height="19"
                  rx="5"
                  fill="#e2af64"
                  stroke="#204451"
                  stroke-width="2"
                />
                <rect x="5" y="36" width="30" height="32" rx="3" fill="#faf1d6" />
                <text
                  x="20"
                  y="58"
                  text-anchor="middle"
                  fill="#204451"
                  font-size="20"
                  font-weight="bold"
                >
                  {{ label }}
                </text>
              </g>
            }
          </g>
        }
        <g class="puff-cloud">
          <path
            d="M344 291q-86 2-85-50-70-26-20-77-12-60 48-61 9-54 67-23 44-50 85-1 68-25 82 35 71-1 61 60 60 39 16 79 8 69-63 68-24 61-82 30-70 31-109-60z"
            fill="#f6e5b3"
            stroke="#f9f3d2"
            stroke-width="8"
          />
          <path
            d="M270 183q8-28 36-24m199 36q32 6 32 32m-194 69q-30-4-35-23"
            fill="none"
            stroke="#dbc895"
            stroke-width="5"
          />
          <text
            x="404"
            y="223"
            text-anchor="middle"
            font-size="80"
            font-weight="900"
            font-style="italic"
            fill="#d16b65"
            stroke="#783e50"
            stroke-width="2"
            transform="rotate(-9 404 223)"
          >
            POOF!
          </text>
        </g>
      </svg>
    </div>
    <div class="evidence-readout" aria-live="polite">
      @for (sample of config().samples; track sample.id; let i = $index) {
        <span class="observation"
          ><i
            [style.background]="(i === 0 ? firstColor() : secondColor()) ? sample.color : '#b8d4ce'"
          ></i
          ><b>{{ sample.label }}</b
          ><span>{{
            (i === 0 ? firstColor() : secondColor()) ? sample.result : 'Looks clear'
          }}</span></span
        >
      }
    </div>
    @if (storyMode()) {
      <div class="story-dialogue" aria-label="Story captions">
        @for (line of lines(); track $index) {
          <p [class.speaking]="activeLine() === $index">
            <strong>{{
              line.speaker === 'scientist' ? config().scientistName : config().robotName
            }}</strong>
            {{ line.text }}
          </p>
        }
      </div>
      <p class="voice-status" role="status">{{ audioNotice() }}</p>
      @if (stage() === 'welcome') {
        <button class="test-button" type="button" (click)="runTest()">
          {{ config().testButton }} \u2192
        </button>
      } @else if (stage() === 'testing' || stage() === 'poof') {
        <p role="status">Comparing the samples\u2026</p>
      } @else if (stage() === 'reveal') {
        <p class="story-note">{{ config().comedyNote }}</p>
        <button class="test-button" type="button" (click)="showCase()">
          Meet the mystery vials \u2192
        </button>
      } @else {
        <p class="evidence-note">{{ config().evidenceNote }}</p>
        <button class="story-replay" type="button" (click)="reset()">\u21BA Replay story</button>
      }
    } @else if (stage() === 'welcome') {
      <div class="prediction-choices" aria-label="My prediction">
        @for (idea of ['Same reaction', 'Different reactions', 'Not sure yet']; track idea) {
          <button
            type="button"
            [attr.aria-pressed]="prediction() === idea"
            (click)="prediction.set(idea)"
          >
            {{ idea }}
          </button>
        }
      </div>
      <button class="test-button" type="button" [disabled]="!prediction()" (click)="runTest()">
        Test my prediction \u2192
      </button>
    } @else if (stage() === 'testing' || stage() === 'poof') {
      <p role="status">Comparing the samples\u2026</p>
    } @else if (stage() === 'reveal') {
      <div class="prediction-choices" aria-label="What I observed">
        <button
          type="button"
          [attr.aria-pressed]="conclusion() === 'same'"
          (click)="conclusion.set('same')"
        >
          A = B \xB7 Same reaction</button
        ><button
          type="button"
          [attr.aria-pressed]="conclusion() === 'different'"
          (click)="conclusion.set('different')"
        >
          A \u2260 B \xB7 Different reactions
        </button>
      </div>
      <p role="status">{{ feedback() }}</p>
      <button class="test-button" type="button" [disabled]="!conclusion()" (click)="showCase()">
        Check my observation \u2192
      </button>
    } @else {
      <p class="student-prediction">My prediction: {{ prediction() }}</p>
      <p class="evidence-note">{{ config().evidenceNote }}</p>
      <button class="test-button" type="button" (click)="finish()">Open my investigation \u2192</button>
    }
  </div>
</section>
`, styles: ['/* src/app/plugins/intro-scenes/illustrated-comparison.component.scss */\n:host {\n  display: block;\n}\n.cartoon-opening {\n  color: #edf5ed;\n  padding: 28px 34px 18px;\n  background: #0d2936;\n  font-family:\n    "Trebuchet MS",\n    Arial,\n    sans-serif;\n}\n.episode-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 30px;\n  margin-bottom: 22px;\n}\n.episode-header > div {\n  max-width: 840px;\n}\n.eyebrow {\n  color: #e8c179;\n  font-size: 10px;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  font-weight: 800;\n  margin: 0 0 10px;\n}\n.episode-header h1 {\n  font:\n    700 clamp(27px, 2.6vw, 40px)/1.15 "Trebuchet MS",\n    Arial,\n    sans-serif;\n  letter-spacing: -0.04em;\n  text-wrap: balance;\n  margin: 0 0 12px;\n}\n.invitation {\n  color: #b1ced0;\n  font-size: 13px;\n  line-height: 1.7;\n  margin: 0;\n}\n.episode-tag {\n  border: 1px solid #66868a;\n  color: #9db9bd;\n  padding: 13px 16px;\n  border-radius: 7px;\n  font-size: 9px;\n  letter-spacing: 0.11em;\n  line-height: 1.9;\n  white-space: nowrap;\n  transform: rotate(3deg);\n}\n.episode-tag b {\n  color: #f2ce8b;\n}\n.episode-body {\n  display: grid;\n  grid-template-columns: minmax(0, 1.45fr) minmax(270px, 1fr);\n  gap: 24px;\n  align-items: stretch;\n}\n.illustration-column {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n.illustration {\n  border: 1px solid #46737f;\n  border-radius: 12px;\n  overflow: hidden;\n  background: #123c4c;\n  position: relative;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.illustration svg {\n  display: block;\n  width: 100%;\n  height: auto;\n  max-height: 540px;\n}\n.character-names {\n  display: flex;\n  justify-content: space-around;\n  gap: 15px;\n  padding: 10px 12px;\n  background: #0b2634;\n  font-size: 9px;\n  line-height: 1.5;\n  color: #a5c3c6;\n  border-top: 1px solid #3a626e;\n}\n.character-names b {\n  color: #f7dc9c;\n}\n.evidence-readout {\n  margin-top: 12px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  border: 1px solid #375c66;\n  border-radius: 8px;\n  background: #082331;\n  padding: 14px 18px;\n}\n.readout-label {\n  grid-column: 1/-1;\n  color: #85bdba;\n  font-size: 8px;\n  letter-spacing: 0.16em;\n  font-weight: 700;\n}\n.observation {\n  display: grid;\n  grid-template-columns: 10px 1fr;\n  gap: 5px 8px;\n  font-size: 11px;\n  color: #b3d0ca;\n  align-items: center;\n}\n.observation i {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n}\n.observation b {\n  color: #eef5dc;\n}\n.observation > span {\n  grid-column: 2;\n}\n.dialogue-panel {\n  display: flex;\n  flex-direction: column;\n  padding: 22px;\n  border-radius: 12px;\n  background: #f7f0df;\n  color: #23424a;\n  min-width: 0;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1333333333);\n}\n.scene-count {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  font-size: 9px;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  padding-bottom: 18px;\n  border-bottom: 1px solid #d4d8c4;\n  margin-bottom: 17px;\n  color: #5e7772;\n}\n.caption-tag {\n  color: #7b806c;\n  font-weight: 500;\n  font-size: 8px;\n}\n.speech-bubble {\n  border: 1px solid #d9d6bf;\n  border-radius: 9px;\n  background: #fffdf1;\n  padding: 15px 16px;\n  margin-bottom: 14px;\n  transition: border-color 0.2s, background 0.2s;\n}\n.speaker {\n  display: flex;\n  gap: 7px;\n  align-items: center;\n  font-size: 12px;\n  font-weight: 800;\n  color: #235e6b;\n}\n.speaker i {\n  font-style: normal;\n  color: #a77737;\n}\n.speech-bubble p {\n  margin: 10px 0 0;\n  font-size: 13px;\n  line-height: 1.75;\n  color: #304e50;\n}\n.robot-speech {\n  background: #e5eddf;\n  border-color: #c9d6c5;\n}\n.robot-speech .speaker {\n  color: #4d6b52;\n}\n.speaking {\n  border: 2px solid #c09343;\n  padding: 14px 15px;\n  box-shadow: 0 0 0 3px rgba(213, 188, 113, 0.1098039216);\n}\n.clue-card {\n  padding: 12px 15px;\n  margin-bottom: 14px;\n  border-left: 3px solid #779761;\n  background: #e9ecd7;\n}\n.clue-card > span {\n  font-size: 8px;\n  letter-spacing: 0.13em;\n  font-weight: 800;\n  color: #4f7143;\n}\n.clue-card p {\n  font-size: 12px;\n  line-height: 1.65;\n  margin: 7px 0 0;\n}\n.scene-action {\n  margin-top: auto;\n  padding-top: 8px;\n}\n.test-button {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  min-height: 56px;\n  color: #183e48;\n  background: #edbb64;\n  border: 1px solid #d2a45b;\n  border-bottom: 4px solid #b68a42;\n  border-radius: 8px;\n  padding: 13px 15px;\n  font:\n    800 13px/1.5 "Trebuchet MS",\n    Arial,\n    sans-serif;\n  letter-spacing: 0.02em;\n  cursor: pointer;\n  transition: transform 0.12s, background 0.12s;\n}\n.test-button:hover {\n  background: #f6cd7e;\n  transform: translateY(-2px);\n}\n.test-button:active {\n  transform: translateY(1px);\n}\n.test-button > span:last-child {\n  margin-left: auto;\n  font-size: 19px;\n}\n.scene-action small {\n  display: block;\n  margin-top: 10px;\n  color: #7b7b64;\n  font-size: 9px;\n  text-align: center;\n  line-height: 1.6;\n}\n.testing-label {\n  font-size: 14px;\n  font-weight: 700;\n  text-align: center;\n  color: #426e72;\n  padding: 18px;\n  margin: 0;\n  border: 1px dashed #92ad9d;\n  border-radius: 8px;\n}\n.scene-controls {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px 20px;\n  padding-top: 18px;\n}\n.scene-controls > div {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px 16px;\n}\n.scene-controls button {\n  font:\n    700 11px/1.5 "Trebuchet MS",\n    Arial,\n    sans-serif;\n  background: transparent;\n  border: 1px solid #5b7e87;\n  border-radius: 6px;\n  color: #cce3db;\n  padding: 10px 14px;\n  min-height: 44px;\n  cursor: pointer;\n}\n.scene-controls button:hover {\n  background: #204854;\n}\n.scene-controls .voice-controls > button:first-child {\n  color: #f4d194;\n  border-color: #bc9960;\n}\n.voice-controls > span {\n  display: block;\n  color: #9fbbbd;\n  font-size: 9px;\n  max-width: 185px;\n  line-height: 1.6;\n}\n.cartoon-note {\n  color: #91b3b4;\n  font-size: 9px;\n  line-height: 1.6;\n  margin: 12px 0 0;\n  max-width: 1000px;\n}\nbutton:focus-visible {\n  outline: 3px solid #8ecfff;\n  outline-offset: 4px;\n}\n.dialogue-panel:focus-visible {\n  outline: 3px solid #e6c780;\n  outline-offset: 4px;\n}\n.wild-hair,\n.surprised-mouth,\n.soot,\n.sticky-note {\n  display: none;\n}\n.singed .wild-hair,\n.singed .surprised-mouth,\n.singed .soot,\n.singed .sticky-note {\n  display: inline;\n}\n.singed .tidy-hair,\n.singed .smug-mouth {\n  display: none;\n}\n.singed .goggles {\n  transform: rotate(-12deg);\n  transform-origin: 448px 142px;\n}\n.head {\n  transform-origin: 448px 225px;\n  animation: self-assured 5s ease-in-out infinite;\n}\n.singed .head {\n  animation: recovery 0.8s ease-out;\n}\n.eyes {\n  transform-origin: 448px 143px;\n  animation: blink 6s infinite;\n}\n.antenna {\n  animation: beep 4s ease-in-out infinite;\n}\n.sample-liquid {\n  transition: fill 0.6s, opacity 0.6s;\n}\n.puff-cloud {\n  opacity: 0;\n  transform-origin: 416px 259px;\n  pointer-events: none;\n}\n.poofing .puff-cloud {\n  opacity: 1;\n  animation: puff 0.95s ease-out both;\n}\n.poofing .scientist {\n  animation: wobble 0.8s ease-out;\n  transform-origin: 450px 400px;\n}\n.sticky-note {\n  transform-origin: 465px 101px;\n  animation: note-drop 0.8s ease-out;\n}\n.case-vials {\n  animation: case-arrival 0.7s ease-out;\n}\n.hidden {\n  display: none;\n}\n@keyframes self-assured {\n  0%, 100% {\n    transform: rotate(-1deg);\n  }\n  50% {\n    transform: rotate(2deg);\n  }\n}\n@keyframes blink {\n  0%, 44%, 47%, 100% {\n    transform: scaleY(1);\n  }\n  45%, 46% {\n    transform: scaleY(0.1);\n  }\n}\n@keyframes beep {\n  0%, 80%, 100% {\n    fill: #f6b98a;\n  }\n  85%, 90% {\n    fill: #a9f4cd;\n  }\n}\n@keyframes puff {\n  0% {\n    opacity: 0;\n    transform: scale(0.15) rotate(-12deg);\n  }\n  25% {\n    opacity: 1;\n    transform: scale(1.13) rotate(3deg);\n  }\n  60% {\n    opacity: 1;\n    transform: scale(1.05);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(1.32) translateY(-45px);\n  }\n}\n@keyframes wobble {\n  0%, 100% {\n    transform: rotate(0deg);\n  }\n  25% {\n    transform: rotate(5deg);\n  }\n  55% {\n    transform: rotate(-3deg);\n  }\n}\n@keyframes recovery {\n  0% {\n    transform: rotate(7deg);\n  }\n  65% {\n    transform: rotate(-3deg);\n  }\n  100% {\n    transform: rotate(0);\n  }\n}\n@keyframes note-drop {\n  from {\n    opacity: 0;\n    transform: translateY(-65px) rotate(-20deg);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes case-arrival {\n  from {\n    opacity: 0;\n    transform: translateX(-60px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (min-width: 1350px) {\n  .episode-body {\n    grid-template-columns: minmax(0, 1.65fr) minmax(370px, 1fr);\n  }\n  .speech-bubble p {\n    font-size: 14px;\n  }\n  .episode-header {\n    margin-bottom: 26px;\n  }\n}\n@media (max-width: 1000px) {\n  .cartoon-opening {\n    padding: 25px 24px 18px;\n  }\n  .episode-body {\n    gap: 16px;\n    grid-template-columns: minmax(0, 1.15fr) minmax(280px, 1fr);\n  }\n  .dialogue-panel {\n    padding: 17px;\n  }\n  .speech-bubble {\n    padding: 12px;\n  }\n  .speaking {\n    padding: 11px;\n  }\n  .speech-bubble p {\n    font-size: 12px;\n    line-height: 1.7;\n  }\n  .episode-tag {\n    display: none;\n  }\n  .character-names {\n    flex-direction: column;\n    align-items: center;\n    gap: 4px;\n  }\n  .episode-header h1 {\n    font-size: 32px;\n  }\n  .evidence-readout {\n    padding: 12px;\n  }\n}\n@media (max-width: 740px) {\n  .cartoon-opening {\n    padding: 22px 15px 16px;\n  }\n  .episode-header h1 {\n    font-size: 28px;\n  }\n  .episode-header .eyebrow {\n    font-size: 8px;\n  }\n  .invitation {\n    font-size: 12px;\n  }\n  .episode-body {\n    grid-template-columns: 1fr;\n  }\n  .illustration svg {\n    max-height: 360px;\n  }\n  .character-names {\n    flex-direction: row;\n    font-size: 8px;\n  }\n  .evidence-readout {\n    margin-top: 8px;\n    grid-template-columns: 1fr 1fr;\n  }\n  .dialogue-panel {\n    padding: 18px;\n  }\n  .speech-bubble p {\n    font-size: 13px;\n  }\n  .scene-controls {\n    align-items: stretch;\n  }\n  .scene-controls > div {\n    width: 100%;\n    justify-content: space-between;\n  }\n  .voice-controls > span {\n    max-width: none;\n    width: 100%;\n  }\n  .scene-controls button {\n    padding: 10px;\n    font-size: 10px;\n  }\n  .cartoon-note {\n    font-size: 9px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation: none !important;\n    transition: none !important;\n    scroll-behavior: auto !important;\n  }\n  .poofing .puff-cloud {\n    opacity: 1;\n  }\n}\n.cartoon-opening {\n  padding: 16px 24px 12px;\n}\n.episode-header {\n  margin-bottom: 12px;\n}\n.episode-header h1 {\n  font-size: clamp(25px, 2.2vw, 33px);\n  margin-bottom: 8px;\n}\n.episode-body {\n  grid-template-columns: minmax(0, 1.1fr) minmax(350px, 1fr);\n  align-items: start;\n}\n.illustration svg {\n  max-height: 300px;\n}\n.dialogue-panel {\n  padding: 14px;\n}\n.scene-count {\n  padding-bottom: 8px;\n  margin-bottom: 8px;\n}\n.speech-bubble {\n  padding: 10px 12px;\n  margin-bottom: 8px;\n}\n.speech-bubble p {\n  font-size: 14px;\n  line-height: 1.45;\n  margin: 6px 0 0;\n}\n.test-button {\n  margin-top: 8px;\n  min-height: 44px;\n}\n@media (max-width: 740px) {\n  .episode-body {\n    grid-template-columns: 1fr;\n  }\n  .illustration svg {\n    max-height: 220px;\n  }\n}\n.cartoon-opening {\n  padding: 0;\n  min-height: calc(100dvh - 52px);\n}\n.episode-header {\n  padding: 8px 24px;\n  margin: 0;\n  border-bottom: 1px solid #48626d;\n  gap: 12px;\n}\n.header-tools {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.header-tools > button {\n  min-height: 44px;\n  border: 0;\n  background: transparent;\n  color: inherit;\n  padding: 8px;\n  font: inherit;\n  cursor: pointer;\n}\n.comparison-task {\n  max-width: 860px;\n  margin: auto;\n  padding: 22px 24px 36px;\n  text-align: center;\n}\n.comparison-task:focus {\n  outline: none;\n}\n.comparison-task h1 {\n  font-size: clamp(23px, 3vw, 32px);\n  margin: 8px 0 18px;\n}\n.comparison-task .illustration {\n  max-width: 570px;\n  height: 270px;\n  margin: auto;\n}\n.comparison-task .illustration svg {\n  height: 100%;\n  width: 100%;\n}\n.comparison-task .evidence-readout {\n  max-width: 540px;\n  margin: 12px auto;\n  text-align: left;\n}\n.comparison-task .observation {\n  font-size: 14px;\n}\n.prediction-choices {\n  display: flex;\n  justify-content: center;\n  gap: 12px;\n  margin: 20px auto;\n}\n.prediction-choices button {\n  padding: 14px 18px;\n  min-height: 50px;\n  border: 2px solid #83a7aa;\n  border-radius: 12px;\n  color: #f6f3df;\n  background: #183e4d;\n  font: 700 16px Arial;\n  cursor: pointer;\n}\n.prediction-choices button[aria-pressed=true] {\n  color: #163542;\n  border-color: #f0cc7b;\n  background: #f0cc7b;\n}\n.comparison-task .test-button {\n  width: auto;\n  min-height: 50px;\n  display: inline-flex;\n  padding: 12px 24px;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.evidence-note {\n  max-width: 570px;\n  margin: 18px auto;\n}\n@media (max-width: 650px) {\n  .episode-header {\n    flex-wrap: wrap;\n    padding: 8px 14px;\n    font-size: 13px;\n  }\n  .header-tools {\n    margin-left: auto;\n  }\n  .comparison-task {\n    padding: 18px 14px;\n  }\n  .prediction-choices {\n    gap: 8px;\n  }\n  .prediction-choices button {\n    padding: 10px;\n    font-size: 14px;\n  }\n  .comparison-task .illustration {\n    height: 235px;\n  }\n}\n.story-mode {\n  min-height: 0;\n}\n.story-mode .comparison-task {\n  padding: 18px;\n}\n.story-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  text-align: left;\n}\n.story-heading h2 {\n  margin: 0;\n  color: #f8edce;\n  font-size: 17px;\n}\n.story-heading button,\n.story-replay {\n  min-height: 44px;\n  padding: 8px 12px;\n  border: 1px solid #6d9196;\n  border-radius: 8px;\n  color: #e4f0e9;\n  background: #173d4c;\n  font: inherit;\n  font-size: 12px;\n  cursor: pointer;\n}\n.story-mode .illustration {\n  height: 250px;\n  margin-top: 12px;\n}\n.story-mode .evidence-readout {\n  gap: 8px;\n}\n.story-mode .observation {\n  font-size: 11px;\n  padding: 8px;\n}\n.story-dialogue {\n  text-align: left;\n}\n.story-dialogue p {\n  margin: 8px 0;\n  padding: 8px 10px;\n  border-left: 2px solid #54737b;\n  color: #dcece7;\n  background: #0d2e3b;\n  font-size: 13px;\n  line-height: 1.55;\n}\n.story-dialogue strong {\n  color: #f4d68e;\n}\n.story-dialogue .speaking {\n  border-left-color: #ffd47c;\n  background: #234753;\n}\n.story-mode .voice-status,\n.story-note {\n  font-size: 11px;\n  line-height: 1.5;\n  color: #bbd4d1;\n  margin: 8px 0;\n}\n.story-mode .test-button {\n  min-height: 44px;\n  font-size: 13px;\n  margin-top: 8px;\n}\n.story-mode .evidence-note {\n  font-size: 12px;\n  line-height: 1.5;\n}\n@media (max-width: 650px) {\n  .story-mode .illustration {\n    height: 210px;\n  }\n  .story-mode .comparison-task {\n    padding: 14px;\n  }\n}\n/*# sourceMappingURL=illustrated-comparison.component.css.map */\n'] }]
  }], () => [], { config: [{ type: Input, args: [{ isSignal: true, alias: "config", required: true }] }], storyMode: [{ type: Input, args: [{ isSignal: true, alias: "storyMode", required: false }] }], completed: [{ type: Output, args: ["completed"] }], dialoguePanel: [{ type: ViewChild, args: ["dialoguePanel", { isSignal: true }] }], sceneHeading: [{ type: ViewChild, args: ["sceneHeading", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(IllustratedComparisonComponent, { className: "IllustratedComparisonComponent", filePath: "src/app/plugins/intro-scenes/illustrated-comparison.component.ts", lineNumber: 29 });
})();

// src/app/plugins/intro-scenes/opening-speeches.component.ts
var _c03 = ["player"];
var _forTrack02 = ($index, $item) => $item.id;
function OpeningSpeechesComponent_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "track", 4);
  }
  if (rf & 2) {
    const speech_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275domProperty("src", speech_r4.captions);
  }
}
function OpeningSpeechesComponent_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 6);
    \u0275\u0275text(1, " This video could not play. You can still explore the question below. ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "a", 7);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const speech_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("href", speech_r4.video, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Open ", speech_r4.speaker, "\u2019s video \u2197");
  }
}
function OpeningSpeechesComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article")(1, "header")(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "h2");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "video", 3, 0);
    \u0275\u0275domListener("play", function OpeningSpeechesComponent_For_2_Template_video_play_6_listener() {
      \u0275\u0275restoreView(_r1);
      const player_r2 = \u0275\u0275reference(7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.pauseOthers(player_r2));
    })("error", function OpeningSpeechesComponent_For_2_Template_video_error_6_listener() {
      const speech_r4 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.markFailed(speech_r4.id));
    });
    \u0275\u0275conditionalCreate(8, OpeningSpeechesComponent_For_2_Conditional_8_Template, 1, 1, "track", 4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "details", 5)(10, "summary");
    \u0275\u0275text(11, "Argument summary");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(14, OpeningSpeechesComponent_For_2_Conditional_14_Template, 4, 2);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const speech_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(speech_r4.speaker);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(speech_r4.title);
    \u0275\u0275advance();
    \u0275\u0275domProperty("src", speech_r4.video, \u0275\u0275sanitizeUrl);
    \u0275\u0275attribute("aria-label", speech_r4.speaker + ": " + speech_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(speech_r4.captions ? 8 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(speech_r4.summary);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.failed().includes(speech_r4.id) ? 14 : -1);
  }
}
var OpeningSpeechesComponent = class _OpeningSpeechesComponent {
  speeches = input.required(
    ...ngDevMode ? [{ debugName: "speeches" }] : (
      /* istanbul ignore next */
      []
    )
  );
  failed = signal(
    [],
    ...ngDevMode ? [{ debugName: "failed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  players = viewChildren(
    "player",
    ...ngDevMode ? [{ debugName: "players" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pauseOthers(active) {
    for (const player of this.players()) {
      if (player.nativeElement !== active)
        player.nativeElement.pause();
    }
  }
  pauseAll() {
    for (const player of this.players())
      player.nativeElement.pause();
  }
  markFailed(id) {
    this.failed.update((ids) => ids.includes(id) ? ids : [...ids, id]);
  }
  ngOnDestroy() {
    this.pauseAll();
  }
  static \u0275fac = function OpeningSpeechesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OpeningSpeechesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OpeningSpeechesComponent, selectors: [["app-opening-speeches"]], viewQuery: function OpeningSpeechesComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.players, _c03, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { speeches: [1, "speeches"] }, decls: 5, vars: 0, consts: [["player", ""], [1, "speeches"], [1, "playback-note"], ["controls", "", "playsinline", "", "preload", "metadata", 3, "play", "error", "src"], ["kind", "captions", "srclang", "en", "label", "English", "default", "", 3, "src"], [1, "speech-copy"], ["role", "status"], ["target", "_blank", "rel", "noopener", 3, "href"]], template: function OpeningSpeechesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 1);
      \u0275\u0275repeaterCreate(1, OpeningSpeechesComponent_For_2_Template, 15, 7, "article", null, _forTrack02);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "p", 2);
      \u0275\u0275text(4, " Press play to hear each opening argument. You control the sound and pace. ");
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.speeches());
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.speeches[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 22px;\n  max-width: 820px;\n  margin: 0 auto;\n}\narticle[_ngcontent-%COMP%] {\n  overflow: hidden;\n  min-width: 0;\n  border: 1px solid rgba(214, 181, 121, 0.3137254902);\n  border-radius: 16px;\n  background: #100e1c;\n}\nheader[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-top: 3px solid #ce786b;\n  min-height: 0;\n  box-sizing: border-box;\n}\narticle[_ngcontent-%COMP%]:nth-child(even)   header[_ngcontent-%COMP%] {\n  border-color: #aa94d4;\n}\nheader[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 7px;\n  color: #e9c184;\n  font-size: 11px;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 1.8px;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 19px;\n  color: #fff6e8;\n}\nvideo[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: auto;\n  height: min(24dvh, 220px);\n  max-height: 220px;\n  background: #08070c;\n  object-fit: contain;\n}\n.speech-copy[_ngcontent-%COMP%] {\n  padding: 14px 22px 18px;\n  color: #e0e4df;\n  font-size: 14px;\n  line-height: 1.6;\n}\n.speech-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\na[_ngcontent-%COMP%] {\n  color: #e9c184;\n}\n.playback-note[_ngcontent-%COMP%] {\n  margin: 15px 0 0;\n  color: #e0e4df;\n  font-size: 12px;\n}\n@media (max-width: 700px) {\n  .speeches[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=opening-speeches.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OpeningSpeechesComponent, [{
    type: Component,
    args: [{ selector: "app-opening-speeches", template: `
    <div class="speeches">
      @for (speech of speeches(); track speech.id) {
        <article>
          <header>
            <p>{{ speech.speaker }}</p>
            <h2>{{ speech.title }}</h2>
          </header>
          <video
            #player
            controls
            playsinline
            preload="metadata"
            [src]="speech.video"
            [attr.aria-label]="speech.speaker + ': ' + speech.title"
            (play)="pauseOthers(player)"
            (error)="markFailed(speech.id)"
          >
            @if (speech.captions) {
              <track kind="captions" [src]="speech.captions" srclang="en" label="English" default />
            }
          </video>
          <details class="speech-copy">
            <summary>Argument summary</summary>
            <p>{{ speech.summary }}</p>
            @if (failed().includes(speech.id)) {
              <p role="status">
                This video could not play. You can still explore the question below.
              </p>
              <a [href]="speech.video" target="_blank" rel="noopener"
                >Open {{ speech.speaker }}\u2019s video \u2197</a
              >
            }
          </details>
        </article>
      }
    </div>
    <p class="playback-note">
      Press play to hear each opening argument. You control the sound and pace.
    </p>
  `, styles: ["/* angular:styles/component:scss;7d9b70f6a0e701db2f995967bb2a552428e25e1440ae6238ae05e967af2c9c68;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/plugins/intro-scenes/opening-speeches.component.ts */\n:host {\n  display: block;\n  min-width: 0;\n}\n.speeches {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 22px;\n  max-width: 820px;\n  margin: 0 auto;\n}\narticle {\n  overflow: hidden;\n  min-width: 0;\n  border: 1px solid rgba(214, 181, 121, 0.3137254902);\n  border-radius: 16px;\n  background: #100e1c;\n}\nheader {\n  padding: 10px 14px;\n  border-top: 3px solid #ce786b;\n  min-height: 0;\n  box-sizing: border-box;\n}\narticle:nth-child(even) header {\n  border-color: #aa94d4;\n}\nheader p {\n  margin: 0 0 7px;\n  color: #e9c184;\n  font-size: 11px;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 1.8px;\n}\nh2 {\n  margin: 0;\n  font-size: 19px;\n  color: #fff6e8;\n}\nvideo {\n  display: block;\n  width: 100%;\n  height: auto;\n  height: min(24dvh, 220px);\n  max-height: 220px;\n  background: #08070c;\n  object-fit: contain;\n}\n.speech-copy {\n  padding: 14px 22px 18px;\n  color: #e0e4df;\n  font-size: 14px;\n  line-height: 1.6;\n}\n.speech-copy p {\n  margin: 0;\n}\na {\n  color: #e9c184;\n}\n.playback-note {\n  margin: 15px 0 0;\n  color: #e0e4df;\n  font-size: 12px;\n}\n@media (max-width: 700px) {\n  .speeches {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=opening-speeches.component.css.map */\n"] }]
  }], null, { speeches: [{ type: Input, args: [{ isSignal: true, alias: "speeches", required: true }] }], players: [{ type: ViewChildren, args: ["player", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OpeningSpeechesComponent, { className: "OpeningSpeechesComponent", filePath: "src/app/plugins/intro-scenes/opening-speeches.component.ts", lineNumber: 121 });
})();

// src/app/shared/project-intro/cargo-selection.ts
function cargoTotals(startingCoins, choices) {
  const cost = choices.reduce((sum, choice) => sum + (choice.cargo?.cost ?? 0), 0);
  const sale = choices.reduce((sum, choice) => sum + (choice.cargo?.sale ?? 0), 0);
  return {
    cost,
    sale,
    remaining: startingCoins - cost,
    cash: startingCoins - cost + sale,
    profit: sale - cost
  };
}
function cargoOutcome(config, choices) {
  const totals = cargoTotals(config.cargo.startingCoins, choices);
  return __spreadProps(__spreadValues({}, choices[0]), {
    label: choices.map((choice) => choice.cargo.name).join(" + "),
    result: __spreadProps(__spreadValues({}, choices[0].result), {
      title: "Your cargo reached the market.",
      text: choices.map((choice) => choice.result.text).join("\n\n"),
      surprise: "TWO LOADS. ONE LEDGER.",
      evidence: `Practice trade: ${config.cargo.startingCoins} \u2212 ${totals.cost} + ${totals.sale} = ${totals.cash} coins. ${totals.profit < 0 ? "Loss" : "Profit"}: ${Math.abs(totals.profit)} coins.`,
      metrics: [
        { label: "Total cost", value: String(totals.cost) },
        { label: "Total sales", value: String(totals.sale) },
        { label: "Profit / loss", value: String(totals.profit) },
        { label: "Cash now", value: String(totals.cash) }
      ]
    })
  });
}

// src/app/shared/project-intro/opening-practice.ts
var cargoMathSteps = ["cost", "remaining", "sale", "profit"];
function checkCargoAnswer(start, items, step, answer) {
  if (!/^-?\d+(?:\.0+)?$/.test(answer.trim())) return false;
  return Number(answer) === cargoTotals(start, items)[step];
}

// src/app/plugins/intro-scenes/cargo-wagon.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function CargoWagonComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "img", 3);
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275domProperty("src", item_r1.image, \u0275\u0275sanitizeUrl);
  }
}
var CargoWagonComponent = class _CargoWagonComponent {
  image = input.required(
    ...ngDevMode ? [{ debugName: "image" }] : (
      /* istanbul ignore next */
      []
    )
  );
  alt = input.required(
    ...ngDevMode ? [{ debugName: "alt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  items = input.required(
    ...ngDevMode ? [{ debugName: "items" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cargoNames() {
    return this.items().map((item) => item.cargo?.name ?? item.label).join(", ");
  }
  static \u0275fac = function CargoWagonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CargoWagonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CargoWagonComponent, selectors: [["app-cargo-wagon"]], inputs: { image: [1, "image"], alt: [1, "alt"], items: [1, "items"] }, decls: 5, vars: 2, consts: [["role", "img", 1, "wagon"], ["alt", "", 1, "vehicle", 3, "src"], [1, "supplies"], ["alt", "", 1, "supply", 3, "src"]], template: function CargoWagonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275domElement(1, "img", 1);
      \u0275\u0275domElementStart(2, "div", 2);
      \u0275\u0275repeaterCreate(3, CargoWagonComponent_For_4_Template, 1, 1, "img", 3, _forTrack03);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275attribute("aria-label", ctx.alt() + ": " + ctx.cargoNames());
      \u0275\u0275advance();
      \u0275\u0275domProperty("src", ctx.image(), \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.items());
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  pointer-events: none;\n}\n.wagon[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 1492/929;\n  animation: _ngcontent-%COMP%_arrive 0.45s ease-out;\n}\n.vehicle[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  filter: drop-shadow(0 8px 7px rgba(32, 21, 13, 0.6509803922));\n}\n.supplies[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 36%;\n  top: 4%;\n  width: 52%;\n  height: 39%;\n  display: flex;\n  align-items: end;\n}\n.supply[_ngcontent-%COMP%] {\n  width: 48%;\n  height: 100%;\n  object-fit: contain;\n  filter: drop-shadow(0 3px 2px rgba(33, 23, 15, 0.5019607843));\n  animation: _ngcontent-%COMP%_load 0.35s ease-out;\n}\n@keyframes _ngcontent-%COMP%_arrive {\n  from {\n    opacity: 0;\n    transform: translateX(40px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _ngcontent-%COMP%_load {\n  from {\n    opacity: 0;\n    transform: translateY(-24px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .wagon[_ngcontent-%COMP%], \n   .supply[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=cargo-wagon.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CargoWagonComponent, [{
    type: Component,
    args: [{ selector: "app-cargo-wagon", template: `
    <div class="wagon" role="img" [attr.aria-label]="alt() + ': ' + cargoNames()">
      <img class="vehicle" [src]="image()" alt="" />
      <div class="supplies">
        @for (item of items(); track item.id) {
          <img class="supply" [src]="item.image" alt="" />
        }
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;cf1f7a9e7204e1ccb2f62a1359f57873b3f4a2609fee58dddae39561bd10d99f;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/plugins/intro-scenes/cargo-wagon.component.ts */\n:host {\n  display: block;\n  pointer-events: none;\n}\n.wagon {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 1492/929;\n  animation: arrive 0.45s ease-out;\n}\n.vehicle {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  filter: drop-shadow(0 8px 7px rgba(32, 21, 13, 0.6509803922));\n}\n.supplies {\n  position: absolute;\n  left: 36%;\n  top: 4%;\n  width: 52%;\n  height: 39%;\n  display: flex;\n  align-items: end;\n}\n.supply {\n  width: 48%;\n  height: 100%;\n  object-fit: contain;\n  filter: drop-shadow(0 3px 2px rgba(33, 23, 15, 0.5019607843));\n  animation: load 0.35s ease-out;\n}\n@keyframes arrive {\n  from {\n    opacity: 0;\n    transform: translateX(40px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes load {\n  from {\n    opacity: 0;\n    transform: translateY(-24px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .wagon,\n  .supply {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=cargo-wagon.component.css.map */\n"] }]
  }], null, { image: [{ type: Input, args: [{ isSignal: true, alias: "image", required: true }] }], alt: [{ type: Input, args: [{ isSignal: true, alias: "alt", required: true }] }], items: [{ type: Input, args: [{ isSignal: true, alias: "items", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CargoWagonComponent, { className: "CargoWagonComponent", filePath: "src/app/plugins/intro-scenes/cargo-wagon.component.ts", lineNumber: 77 });
})();

// src/app/plugins/intro-scenes/decision-scene.component.ts
var _c04 = ["sceneHeading"];
var _c12 = ["revealHeading"];
var _c22 = (a0) => [a0];
var _forTrack04 = ($index, $item) => $item.id;
function DecisionSceneComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.setting);
  }
}
function DecisionSceneComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Try drawing the coins or writing the calculation on paper.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.mathStep() === "cost" ? "Add the purchase prices of your two supplies." : ctx_r0.mathStep() === "remaining" ? "Start with your purse. Subtract what you spent." : ctx_r0.mathStep() === "sale" ? "Add the two offers from buyers. This is your sales total." : "Profit is sales minus the amount you paid for your cargo.", " ");
  }
}
function DecisionSceneComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.selected()?.thinking?.guide);
  }
}
function DecisionSceneComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.config().invitation);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.config().sceneCaption);
  }
}
function DecisionSceneComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", line_r2.speaker, ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", line_r2.text, " ");
  }
}
function DecisionSceneComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function DecisionSceneComponent_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleVoice());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.voices() ? "Mute voices" : "Play voices", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.audioNotice());
  }
}
function DecisionSceneComponent_Conditional_17_For_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "cite");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(line_r5.speaker);
  }
}
function DecisionSceneComponent_Conditional_17_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "blockquote");
    \u0275\u0275conditionalCreate(1, DecisionSceneComponent_Conditional_17_For_16_Conditional_1_Template, 2, 1, "cite");
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r5 = ctx.$implicit;
    const $index_r6 = ctx.$index;
    const \u0275$index_79_r7 = ctx.$index;
    const story_r8 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("speaking", ctx_r0.activeLine() === $index_r6);
    \u0275\u0275advance();
    \u0275\u0275conditional(\u0275$index_79_r7 === 0 || story_r8.dialogue[$index_r6 - 1].speaker !== line_r5.speaker ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u201C", line_r5.text, "\u201D");
  }
}
function DecisionSceneComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "main", 8)(1, "p", 14);
    \u0275\u0275text(2, "The story begins");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1", 15, 0);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 16)(7, "div", 17);
    \u0275\u0275element(8, "app-opening-media", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 19)(10, "p", 20);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 21);
    \u0275\u0275listener("click", function DecisionSceneComponent_Conditional_17_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.listenToStory());
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 22);
    \u0275\u0275repeaterCreate(15, DecisionSceneComponent_Conditional_17_For_16_Template, 4, 4, "blockquote", 23, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 24);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 25);
    \u0275\u0275listener("click", function DecisionSceneComponent_Conditional_17_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.continuePrologue());
    });
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const story_r8 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(story_r8.title);
    \u0275\u0275advance(3);
    \u0275\u0275property("media", story_r8.media);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(story_r8.setting);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.activeLine() >= 0 ? "Stop narration" : "Listen to the story", " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(story_r8.dialogue);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.audioNotice());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", story_r8.continueLabel, " \u2192 ");
  }
}
function DecisionSceneComponent_Conditional_18_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.config().invitation);
  }
}
function DecisionSceneComponent_Conditional_18_Conditional_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-cargo-wagon", 33);
  }
  if (rf & 2) {
    const cargo_r9 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("image", cargo_r9.vehicleImage)("alt", cargo_r9.vehicleAlt)("items", ctx_r0.cargoItems());
  }
}
function DecisionSceneComponent_Conditional_18_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(5, DecisionSceneComponent_Conditional_18_Conditional_7_Conditional_5_Template, 1, 3, "app-cargo-wagon", 33);
  }
  if (rf & 2) {
    const cargo_r9 = ctx;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u25C9 ", cargo_r9.startingCoins, " coins");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("\u25A3 ", ctx_r0.cargoItems().length, " / ", cargo_r9.capacity, " spaces");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.cargoItems().length ? 5 : -1);
  }
}
function DecisionSceneComponent_Conditional_18_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-opening-speeches", 27);
  }
  if (rf & 2) {
    \u0275\u0275property("speeches", ctx);
  }
}
function DecisionSceneComponent_Conditional_18_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-opening-media", 35);
    \u0275\u0275listener("playbackEnded", function DecisionSceneComponent_Conditional_18_Conditional_9_For_2_Template_app_opening_media_playbackEnded_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.videoFinished.set(true));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("media", ctx_r0.videoFinished() ? ctx_r0.config().afterVideoMedia ?? ctx_r0.config().media : ctx_r0.config().media);
  }
}
function DecisionSceneComponent_Conditional_18_Conditional_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function DecisionSceneComponent_Conditional_18_Conditional_9_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.videoFinished.set(true));
    });
    \u0275\u0275text(1, " Open chart \u2192 ");
    \u0275\u0275elementEnd();
  }
}
function DecisionSceneComponent_Conditional_18_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275repeaterCreate(1, DecisionSceneComponent_Conditional_18_Conditional_9_For_2_Template, 1, 1, "app-opening-media", 18, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(3, DecisionSceneComponent_Conditional_18_Conditional_9_Conditional_3_Template, 2, 0, "button", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction1(1, _c22, ctx_r0.replayKey()));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.config().afterVideoMedia && !ctx_r0.videoFinished() ? 3 : -1);
  }
}
function DecisionSceneComponent_Conditional_18_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2", 38);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.config().sceneCaption);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.config().prompt);
  }
}
function DecisionSceneComponent_Conditional_18_For_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 40);
  }
  if (rf & 2) {
    const choice_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", choice_r13.image, \u0275\u0275sanitizeUrl)("alt", choice_r13.imageAlt);
  }
}
function DecisionSceneComponent_Conditional_18_For_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1, "\u25C8");
    \u0275\u0275elementEnd();
  }
}
function DecisionSceneComponent_Conditional_18_For_13_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "b", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", choice_r13.cargo.cost, " coins");
  }
}
function DecisionSceneComponent_Conditional_18_For_13_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(choice_r13.detail);
  }
}
function DecisionSceneComponent_Conditional_18_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function DecisionSceneComponent_Conditional_18_For_13_Template_button_click_0_listener() {
      const choice_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.choose(choice_r13.id));
    });
    \u0275\u0275conditionalCreate(1, DecisionSceneComponent_Conditional_18_For_13_Conditional_1_Template, 1, 2, "img", 40);
    \u0275\u0275conditionalCreate(2, DecisionSceneComponent_Conditional_18_For_13_Conditional_2_Template, 2, 0, "span", 41);
    \u0275\u0275elementStart(3, "span", 42)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, DecisionSceneComponent_Conditional_18_For_13_Conditional_6_Template, 2, 1, "b", 43)(7, DecisionSceneComponent_Conditional_18_For_13_Conditional_7_Template, 2, 1, "small");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const choice_r13 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("chosen", ctx_r0.isLoaded(choice_r13) || ctx_r0.selected()?.id === choice_r13.id);
    \u0275\u0275property("disabled", ctx_r0.choiceDisabled(choice_r13));
    \u0275\u0275attribute("aria-pressed", ctx_r0.config().cargo ? ctx_r0.isLoaded(choice_r13) : null);
    \u0275\u0275advance();
    \u0275\u0275conditional(choice_r13.image ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(choice_r13.model ? 2 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.isLoaded(choice_r13) ? "\u2713 " + choice_r13.cargo?.name : choice_r13.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(choice_r13.cargo ? 6 : 7);
  }
}
function DecisionSceneComponent_Conditional_18_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function DecisionSceneComponent_Conditional_18_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.depart());
    });
    \u0275\u0275text(1, " Work out the cost \u2192 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.cargoItems().length !== ctx.capacity);
  }
}
function DecisionSceneComponent_Conditional_18_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.config().transition?.label);
  }
}
function DecisionSceneComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "main", 9)(1, "p", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1", 15, 0);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, DecisionSceneComponent_Conditional_18_Conditional_6_Template, 2, 1, "p", 26);
    \u0275\u0275conditionalCreate(7, DecisionSceneComponent_Conditional_18_Conditional_7_Template, 6, 4)(8, DecisionSceneComponent_Conditional_18_Conditional_8_Template, 1, 1, "app-opening-speeches", 27)(9, DecisionSceneComponent_Conditional_18_Conditional_9_Template, 4, 3, "div", 28);
    \u0275\u0275conditionalCreate(10, DecisionSceneComponent_Conditional_18_Conditional_10_Template, 4, 2);
    \u0275\u0275elementStart(11, "div", 29);
    \u0275\u0275repeaterCreate(12, DecisionSceneComponent_Conditional_18_For_13_Template, 8, 8, "button", 30, _forTrack04);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, DecisionSceneComponent_Conditional_18_Conditional_14_Template, 2, 1, "button", 31);
    \u0275\u0275conditionalCreate(15, DecisionSceneComponent_Conditional_18_Conditional_15_Template, 2, 1, "p", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_10_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.config().interaction === "dispatch" ? ctx_r0.config().sceneLabel : "1 \xB7 Choose", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.config().interaction === "dispatch" ? ctx_r0.config().headline : ctx_r0.config().prompt, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.config().interaction === "dispatch" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r0.config().cargo) ? 7 : (tmp_5_0 = ctx_r0.config().speeches) ? 8 : 9, tmp_5_0);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.config().interaction === "dispatch" ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("three-choices", ctx_r0.config().choices.length === 3)("four-choices", ctx_r0.config().choices.length === 4);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.config().choices);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_10_0 = ctx_r0.config().cargo) ? 14 : -1, tmp_10_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.transitioning() ? 15 : -1);
  }
}
function DecisionSceneComponent_Conditional_19_Conditional_6_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1, "+");
    \u0275\u0275elementEnd();
  }
}
function DecisionSceneComponent_Conditional_19_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DecisionSceneComponent_Conditional_19_Conditional_6_For_2_Conditional_0_Template, 2, 0, "span", 51);
    \u0275\u0275elementStart(1, "figure");
    \u0275\u0275element(2, "img", 40);
    \u0275\u0275elementStart(3, "figcaption");
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r16 = ctx.$implicit;
    const \u0275$index_185_r17 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(!(\u0275$index_185_r17 === 0) ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", item_r16.image, \u0275\u0275sanitizeUrl)("alt", item_r16.cargo.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r16.cargo.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.mathStep() === "cost" ? item_r16.cargo.cost : item_r16.cargo.sale, " coins");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.mathStep() === "cost" ? "Price to buy" : "Buyer\u2019s offer");
  }
}
function DecisionSceneComponent_Conditional_19_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275repeaterCreate(1, DecisionSceneComponent_Conditional_19_Conditional_6_For_2_Template, 9, 6, null, null, _forTrack04);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.cargoItems());
  }
}
function DecisionSceneComponent_Conditional_19_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "figure")(2, "span", 52);
    \u0275\u0275text(3, "\u25C9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "figcaption");
    \u0275\u0275text(5);
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "span", 51);
    \u0275\u0275text(9, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "figure")(11, "span", 52);
    \u0275\u0275text(12, "\u25A3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "figcaption");
    \u0275\u0275text(14, " You spent");
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const cargo_r18 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.mathStep() === "remaining" ? "Your purse" : "Your sales");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.mathStep() === "remaining" ? cargo_r18.startingCoins : ctx_r0.cargoBalance().sale, " coins");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("", ctx_r0.cargoBalance().cost, " coins");
  }
}
function DecisionSceneComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "main", 10)(1, "p", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1", 15, 1);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, DecisionSceneComponent_Conditional_19_Conditional_6_Template, 3, 0, "div", 45)(7, DecisionSceneComponent_Conditional_19_Conditional_7_Template, 17, 3, "div", 45);
    \u0275\u0275elementStart(8, "form", 46);
    \u0275\u0275listener("ngSubmit", function DecisionSceneComponent_Conditional_19_Template_form_ngSubmit_8_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.checkMath());
    });
    \u0275\u0275elementStart(9, "label", 47);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div")(12, "input", 48);
    \u0275\u0275listener("ngModelChange", function DecisionSceneComponent_Conditional_19_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.answer.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "coins");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "p", 49);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 50);
    \u0275\u0275text(18, "Check my math \u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.mathIndex() < 2 ? "2 \xB7 Buy" : "3 \xB7 Sell");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.mathPrompt());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.mathStep() === "cost" || ctx_r0.mathStep() === "sale" ? 6 : 7);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.mathStep() === "profit" ? "My profit" : "My total");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r0.answer());
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.feedback());
  }
}
function DecisionSceneComponent_Conditional_20_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-object-model-viewer", 55);
  }
  if (rf & 2) {
    \u0275\u0275property("model", ctx)("autoLoad", true);
  }
}
function DecisionSceneComponent_Conditional_20_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 40);
  }
  if (rf & 2) {
    const choice_r20 = \u0275\u0275nextContext();
    \u0275\u0275property("src", choice_r20.image, \u0275\u0275sanitizeUrl)("alt", choice_r20.imageAlt);
  }
}
function DecisionSceneComponent_Conditional_20_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r21 = ctx;
    \u0275\u0275property("href", source_r21.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", source_r21.label, " \u2197");
  }
}
function DecisionSceneComponent_Conditional_20_Conditional_16_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 62)(1, "input", 63);
    \u0275\u0275listener("ngModelChange", function DecisionSceneComponent_Conditional_20_Conditional_16_For_4_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.evidenceId.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const clue_r23 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r0.evidenceId() === clue_r23.id);
    \u0275\u0275advance();
    \u0275\u0275property("value", clue_r23.id)("ngModel", ctx_r0.evidenceId());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(clue_r23.text);
  }
}
function DecisionSceneComponent_Conditional_20_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "fieldset")(1, "legend");
    \u0275\u0275text(2, "A clue I will use");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, DecisionSceneComponent_Conditional_20_Conditional_16_For_4_Template, 3, 5, "label", 61, _forTrack04);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx);
  }
}
function DecisionSceneComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "main", 11)(1, "p", 14);
    \u0275\u0275text(2, "2 \xB7 My thinking");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1", 15, 1);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 53)(7, "div", 54);
    \u0275\u0275conditionalCreate(8, DecisionSceneComponent_Conditional_20_Conditional_8_Template, 1, 2, "app-object-model-viewer", 55)(9, DecisionSceneComponent_Conditional_20_Conditional_9_Template, 1, 2, "img", 40);
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, DecisionSceneComponent_Conditional_20_Conditional_14_Template, 2, 2, "a", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "form", 57);
    \u0275\u0275listener("ngSubmit", function DecisionSceneComponent_Conditional_20_Template_form_ngSubmit_15_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveThought());
    });
    \u0275\u0275conditionalCreate(16, DecisionSceneComponent_Conditional_20_Conditional_16_Template, 5, 0, "fieldset");
    \u0275\u0275elementStart(17, "label", 58);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "textarea", 59);
    \u0275\u0275listener("ngModelChange", function DecisionSceneComponent_Conditional_20_Template_textarea_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.answer.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(20, "button", 60);
    \u0275\u0275text(21, " Keep my idea \u2192 ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_7_0;
    let tmp_8_0;
    const choice_r20 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(choice_r20.thinking.prompt);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_4_0 = choice_r20.model) ? 8 : choice_r20.image ? 9 : -1, tmp_4_0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(choice_r20.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(choice_r20.detail);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = choice_r20.result.source) ? 14 : -1, tmp_7_0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_8_0 = choice_r20.thinking.evidence) ? 16 : -1, tmp_8_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(choice_r20.thinking.starter);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r0.answer());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.canSaveThought());
  }
}
function DecisionSceneComponent_Conditional_21_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "p")(2, "span");
    \u0275\u0275text(3, "You bought");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p")(7, "span");
    \u0275\u0275text(8, "You sold");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p")(12, "span");
    \u0275\u0275text(13, "Your profit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.cargoBalance().cost, " coins");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.cargoBalance().sale, " coins");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.cargoBalance().profit, " coins");
  }
}
function DecisionSceneComponent_Conditional_21_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "blockquote", 66);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 67);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r25 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.answer() || choice_r25.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(choice_r25.result.evidence);
  }
}
function DecisionSceneComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "main", 12)(1, "p", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1", 15, 1);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, DecisionSceneComponent_Conditional_21_Conditional_6_Template, 16, 3, "div", 64)(7, DecisionSceneComponent_Conditional_21_Conditional_7_Template, 4, 2);
    \u0275\u0275elementStart(8, "button", 25);
    \u0275\u0275listener("click", function DecisionSceneComponent_Conditional_21_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.finish());
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "details", 65)(11, "summary");
    \u0275\u0275text(12, "See the scene\u2019s outcome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.config().cargo ? "\u2713 Math checked" : "3 \xB7 Your first idea");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.config().cargo ? "Your first trade, worked out by you." : "You have an idea to build on.", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.config().cargo ? 6 : 7);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.config().mission.finishButton, " \u2192 ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.result.text);
  }
}
var DecisionSceneComponent = class _DecisionSceneComponent {
  config = input.required(
    ...ngDevMode ? [{ debugName: "config" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completed = output();
  stage = signal(
    "briefing",
    ...ngDevMode ? [{ debugName: "stage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  prologueDismissed = signal(
    false,
    ...ngDevMode ? [{ debugName: "prologueDismissed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  prologue = computed(
    () => this.prologueDismissed() ? void 0 : this.config().prologue,
    ...ngDevMode ? [{ debugName: "prologue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  videoFinished = signal(
    false,
    ...ngDevMode ? [{ debugName: "videoFinished" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cargoItems = signal(
    [],
    ...ngDevMode ? [{ debugName: "cargoItems" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cargoBalance = computed(
    () => cargoTotals(this.config().cargo?.startingCoins ?? 0, this.cargoItems()),
    ...ngDevMode ? [{ debugName: "cargoBalance" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mathIndex = signal(
    0,
    ...ngDevMode ? [{ debugName: "mathIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mathStep = computed(
    () => cargoMathSteps[this.mathIndex()],
    ...ngDevMode ? [{ debugName: "mathStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  answer = signal(
    "",
    ...ngDevMode ? [{ debugName: "answer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidenceId = signal(
    "",
    ...ngDevMode ? [{ debugName: "evidenceId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  feedback = signal(
    "",
    ...ngDevMode ? [{ debugName: "feedback" }] : (
      /* istanbul ignore next */
      []
    )
  );
  attempts = signal(
    [],
    ...ngDevMode ? [{ debugName: "attempts" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canSaveThought = computed(
    () => this.answer().trim().length >= 8 && (!this.selected()?.thinking?.evidence || !!this.evidenceId()),
    ...ngDevMode ? [{ debugName: "canSaveThought" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mathPrompt = computed(
    () => ({
      cost: "What will your cargo cost?",
      remaining: "How many coins will you have left?",
      sale: "How much did you earn from sales?",
      profit: "How much profit did you make?"
    })[this.mathStep()],
    ...ngDevMode ? [{ debugName: "mathPrompt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  voices = signal(
    false,
    ...ngDevMode ? [{ debugName: "voices" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeLine = signal(
    -1,
    ...ngDevMode ? [{ debugName: "activeLine" }] : (
      /* istanbul ignore next */
      []
    )
  );
  audioNotice = signal(
    "Sound off \xB7 Everything is readable on screen",
    ...ngDevMode ? [{ debugName: "audioNotice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  replayKey = signal(
    0,
    ...ngDevMode ? [{ debugName: "replayKey" }] : (
      /* istanbul ignore next */
      []
    )
  );
  transitioning = signal(
    false,
    ...ngDevMode ? [{ debugName: "transitioning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lines = computed(
    () => this.prologue() ? this.prologue().dialogue : this.stage() === "briefing" ? this.config().dialogue : this.stage() === "reveal" ? this.selected()?.result.dialogue ?? [] : this.config().mission.dialogue ?? [],
    ...ngDevMode ? [{ debugName: "lines" }] : (
      /* istanbul ignore next */
      []
    )
  );
  narrator = new TeaserAudioPlayer();
  speeches = viewChild(
    OpeningSpeechesComponent,
    ...ngDevMode ? [{ debugName: "speeches" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  heading = viewChild(
    "sceneHeading",
    ...ngDevMode ? [{ debugName: "heading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  revealHeading = viewChild(
    "revealHeading",
    ...ngDevMode ? [{ debugName: "revealHeading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  generation = 0;
  emitted = false;
  transitionTimer;
  constructor() {
    this.focus(false);
  }
  choose(id) {
    if (this.prologue() || this.stage() !== "briefing" || this.transitioning() || this.emitted)
      return;
    const choice = this.config().choices.find((item) => item.id === id);
    if (!choice)
      return;
    if (this.config().cargo) {
      if (this.isLoaded(choice))
        this.cargoItems.update((items) => items.filter((item) => item.id !== id));
      else if (!this.choiceDisabled(choice))
        this.cargoItems.update((items) => [...items, choice]);
      return;
    }
    this.speeches()?.pauseAll();
    this.selected.set(choice);
    if (choice.thinking) {
      this.stage.set("thinking");
      this.focus(true);
    } else if (this.config().transition) {
      this.stopVoice();
      this.transitioning.set(true);
      this.focus(false);
      this.transitionTimer = setTimeout(() => this.reveal(), 1300);
    } else
      this.reveal();
  }
  isLoaded(choice) {
    return this.cargoItems().some((item) => item.id === choice.id);
  }
  choiceDisabled(choice) {
    const cargo = this.config().cargo;
    return this.transitioning() || !!cargo && !this.isLoaded(choice) && (this.cargoItems().length >= cargo.capacity || (choice.cargo?.cost ?? 0) > this.cargoBalance().remaining);
  }
  depart() {
    const cargo = this.config().cargo;
    if (!cargo || this.prologue() || this.stage() !== "briefing" || this.emitted || this.cargoItems().length !== cargo.capacity || this.cargoBalance().remaining < 0)
      return;
    this.stage.set("thinking");
    this.mathIndex.set(0);
    this.answer.set("");
    this.focus(true);
  }
  checkMath() {
    const cargo = this.config().cargo;
    if (!cargo || this.stage() !== "thinking" || this.emitted)
      return;
    const answer = this.answer().trim();
    if (!answer) {
      this.feedback.set("Enter your total.");
      return;
    }
    const correct = checkCargoAnswer(cargo.startingCoins, this.cargoItems(), this.mathStep(), answer);
    this.recordThought({ step: this.mathStep(), answer, correct });
    if (!correct) {
      this.feedback.set(this.mathStep() === "cost" || this.mathStep() === "sale" ? "Try adding the two prices. You can use the guide." : "Check which amount you are subtracting. You can use the guide.");
      return;
    }
    this.feedback.set("");
    this.answer.set("");
    if (this.mathIndex() < cargoMathSteps.length - 1) {
      this.mathIndex.update((value) => value + 1);
      this.focus(true);
    } else {
      this.selected.set(cargoOutcome(this.config(), this.cargoItems()));
      this.reveal();
    }
  }
  saveThought() {
    if (this.stage() !== "thinking" || !this.canSaveThought() || !this.selected()?.thinking || this.emitted)
      return;
    this.recordThought(__spreadValues({
      step: this.selected().id,
      answer: this.answer().trim()
    }, this.evidenceId() ? { evidenceId: this.evidenceId() } : {}));
    this.reveal();
  }
  recordThought(attempt) {
    this.attempts.update((items) => [...items.slice(-39), attempt]);
  }
  reveal() {
    this.transitioning.set(false);
    this.stage.set("reveal");
    this.focus(true);
    void this.playLines();
  }
  showMission() {
    if (this.stage() !== "reveal" || this.emitted)
      return;
    this.stage.set("mission");
    this.focus(true);
    void this.playLines();
  }
  finish(skipped = false) {
    if (this.emitted || !skipped && !["reveal", "mission"].includes(this.stage()))
      return;
    this.emitted = true;
    this.speeches()?.pauseAll();
    clearTimeout(this.transitionTimer);
    this.stopVoice();
    const choice = this.selected();
    this.completed.emit(__spreadProps(__spreadValues(__spreadValues({
      eventType: skipped ? "projectIntro.teaserSkipped" : "projectIntro.teaserCompleted",
      teaserId: this.config().id,
      teaserVersion: this.config().version,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }, choice ? { choiceId: choice.id } : {}), this.attempts().length ? { thinking: this.attempts() } : {}), {
      observations: choice && ["reveal", "mission"].includes(this.stage()) ? this.config().cargo ? this.cargoItems().map((item) => ({ sampleId: item.id, result: item.result.evidence })) : [{ sampleId: choice.id, result: choice.result.evidence }] : []
    }));
  }
  reset() {
    this.speeches()?.pauseAll();
    clearTimeout(this.transitionTimer);
    this.transitioning.set(false);
    this.stopVoice();
    this.selected.set(void 0);
    this.videoFinished.set(false);
    this.cargoItems.set([]);
    this.mathIndex.set(0);
    this.answer.set("");
    this.feedback.set("");
    this.evidenceId.set("");
    this.attempts.set([]);
    this.prologueDismissed.set(false);
    this.stage.set("briefing");
    this.emitted = false;
    this.replayKey.update((value) => value + 1);
    this.focus(false);
    void this.playLines();
  }
  continuePrologue() {
    if (!this.prologue() || this.emitted)
      return;
    this.stopVoice();
    this.prologueDismissed.set(true);
    this.focus(false);
    void this.playLines();
  }
  listenToStory() {
    if (!this.prologue() || this.emitted)
      return;
    if (this.activeLine() >= 0) {
      this.voices.set(false);
      this.stopVoice();
      this.audioNotice.set("Sound off \xB7 Everything is readable on screen");
    } else {
      this.voices.set(true);
      this.audioNotice.set("Story playing \xB7 Follow the words below");
      void this.playLines();
    }
  }
  toggleVoice() {
    this.voices.update((value) => !value);
    this.audioNotice.set(this.voices() ? "Voices on \xB7 Captions stay visible" : "Sound off \xB7 Everything is readable on screen");
    if (this.voices())
      void this.playLines();
    else
      this.stopVoice();
  }
  ngOnDestroy() {
    clearTimeout(this.transitionTimer);
    this.stopVoice();
  }
  async playLines() {
    this.stopVoice();
    if (!this.voices())
      return;
    const generation = this.generation;
    for (let i = 0; i < this.lines().length; i++) {
      this.activeLine.set(i);
      const played = await this.narrator.play(this.lines()[i].audioUrl);
      if (generation !== this.generation)
        return;
      if (!played) {
        this.voices.set(false);
        this.audioNotice.set("Audio could not play. The full dialogue is below; you can try voices again.");
        break;
      }
    }
    this.activeLine.set(-1);
    if (this.prologue() && this.voices())
      this.audioNotice.set("Story finished \xB7 Listen again or continue when you\u2019re ready");
  }
  stopVoice() {
    this.generation++;
    this.narrator.stop();
    this.activeLine.set(-1);
  }
  focus(reveal) {
    afterNextRender(() => {
      const element = (reveal ? this.revealHeading() : this.heading())?.nativeElement;
      element?.scrollIntoView({ block: "nearest" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  static \u0275fac = function DecisionSceneComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DecisionSceneComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DecisionSceneComponent, selectors: [["app-decision-scene"]], viewQuery: function DecisionSceneComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.speeches, OpeningSpeechesComponent, 5)(ctx.heading, _c04, 5)(ctx.revealHeading, _c12, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(3);
    }
  }, inputs: { config: [1, "config"] }, outputs: { completed: "completed" }, decls: 22, vars: 7, consts: [["sceneHeading", ""], ["revealHeading", ""], [1, "decision-opening"], [1, "episode-header"], [1, "project-name"], [1, "header-actions"], ["type", "button", 3, "click"], [3, "title"], [1, "task-stage", "story-stage"], [1, "task-stage"], [1, "task-stage", "math-stage"], [1, "task-stage", "thought-stage"], [1, "task-stage", "result-stage"], ["role", "status"], [1, "step-mark"], ["tabindex", "-1"], [1, "story-layout"], [1, "story-illustration"], [3, "media"], [1, "story-copy"], [1, "story-setting"], ["type", "button", 1, "story-audio", 3, "click"], [1, "story-dialogue"], [3, "speaking"], ["role", "status", 1, "story-audio-notice"], ["type", "button", 1, "primary-action", 3, "click"], [1, "dispatch-invitation"], [3, "speeches"], [1, "scene-visual"], [1, "choice-deck"], ["type", "button", 1, "scene-choice", 3, "disabled", "chosen"], ["type", "button", 1, "primary-action", 3, "disabled"], [1, "purse"], [1, "wagon-preview", 3, "image", "alt", "items"], ["type", "button", 1, "chart-action"], [3, "playbackEnded", "media"], ["type", "button", 1, "chart-action", 3, "click"], [1, "dispatch-caption"], [1, "dispatch-prompt"], ["type", "button", 1, "scene-choice", 3, "click", "disabled"], [3, "src", "alt"], ["aria-hidden", "true", 1, "object-mark"], [1, "choice-copy"], [1, "price"], ["type", "button", 1, "primary-action", 3, "click", "disabled"], [1, "price-equation"], [1, "answer-form", 3, "ngSubmit"], ["for", "coin-answer"], ["id", "coin-answer", "name", "coins", "inputmode", "decimal", "autocomplete", "off", "maxlength", "12", "aria-describedby", "math-feedback", 3, "ngModelChange", "ngModel"], ["id", "math-feedback", "role", "status", 1, "feedback"], ["type", "submit", 1, "primary-action"], ["aria-hidden", "true", 1, "operator"], ["aria-hidden", "true", 1, "coin-art"], [1, "thinking-desk"], [1, "thought-object"], [3, "model", "autoLoad"], ["target", "_blank", "rel", "noopener noreferrer", 1, "source-link", 3, "href"], [1, "thought-form", 3, "ngSubmit"], ["for", "first-thought"], ["id", "first-thought", "name", "thought", "rows", "3", "maxlength", "1000", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "primary-action", 3, "disabled"], [1, "evidence-choice", 3, "selected"], [1, "evidence-choice"], ["type", "radio", "name", "clue", 3, "ngModelChange", "value", "ngModel"], [1, "math-receipt"], [1, "outcome-detail"], [1, "student-thought"], [1, "next-clue"]], template: function DecisionSceneComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 2)(1, "header", 3)(2, "span", 4);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 5)(5, "button", 6);
      \u0275\u0275listener("click", function DecisionSceneComponent_Template_button_click_5_listener() {
        return ctx.reset();
      });
      \u0275\u0275text(6, "\u21BA Restart");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 6);
      \u0275\u0275listener("click", function DecisionSceneComponent_Template_button_click_7_listener() {
        return ctx.finish(true);
      });
      \u0275\u0275text(8, "Project preview");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "app-task-guide", 7);
      \u0275\u0275conditionalCreate(10, DecisionSceneComponent_Conditional_10_Template, 2, 1, "p")(11, DecisionSceneComponent_Conditional_11_Template, 4, 1)(12, DecisionSceneComponent_Conditional_12_Template, 2, 1, "p")(13, DecisionSceneComponent_Conditional_13_Template, 4, 2);
      \u0275\u0275repeaterCreate(14, DecisionSceneComponent_For_15_Template, 4, 2, "p", null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275conditionalCreate(16, DecisionSceneComponent_Conditional_16_Template, 4, 2);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(17, DecisionSceneComponent_Conditional_17_Template, 21, 6, "main", 8)(18, DecisionSceneComponent_Conditional_18_Template, 16, 11, "main", 9)(19, DecisionSceneComponent_Conditional_19_Template, 19, 6, "main", 10)(20, DecisionSceneComponent_Conditional_20_Template, 22, 9, "main", 11)(21, DecisionSceneComponent_Conditional_21_Template, 15, 5, "main", 12);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_6_0;
      \u0275\u0275classMap("decision-opening " + ctx.config().interaction);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.config().kicker.split(" \xB7 ")[0]);
      \u0275\u0275advance(6);
      \u0275\u0275property("title", ctx.stage() === "thinking" ? "One step at a time" : "About this scene");
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_3_0 = ctx.prologue()) ? 10 : ctx.stage() === "thinking" && ctx.config().cargo ? 11 : ctx.stage() === "thinking" ? 12 : 13, tmp_3_0);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.lines());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.lines().length ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_6_0 = ctx.prologue()) ? 17 : ctx.stage() === "briefing" ? 18 : (tmp_6_0 = ctx.stage() === "thinking" && ctx.config().cargo) ? 19 : (tmp_6_0 = ctx.stage() === "thinking" && ctx.selected()) ? 20 : (tmp_6_0 = ctx.selected()) ? 21 : -1, tmp_6_0);
    }
  }, dependencies: [
    OpeningMediaComponent,
    OpeningSpeechesComponent,
    ObjectModelViewerComponent,
    FormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    RadioControlValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    MaxLengthValidator,
    NgModel,
    NgForm,
    TaskGuideComponent,
    CargoWagonComponent
  ], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.decision-opening[_ngcontent-%COMP%] {\n  --%NS%ink: #203e46;\n  --%NS%accent: #216169;\n  --%NS%paper: #fffdf7;\n  color: var(--%NS%ink);\n  background: var(--%NS%paper);\n  min-height: calc(100dvh - 60px);\n  font: 16px/1.5 Arial, sans-serif;\n}\n.cargo[_ngcontent-%COMP%] {\n  --%NS%accent: #85431d;\n  --%NS%ink: #473624;\n  --%NS%paper: #fcf6e9;\n}\n.council[_ngcontent-%COMP%] {\n  --%NS%accent: #7b3554;\n}\n.dispatch[_ngcontent-%COMP%] {\n  --%NS%accent: #244e8b;\n}\n.dispatch[_ngcontent-%COMP%]   .scene-visual[_ngcontent-%COMP%] {\n  --%NS%opening-media-height: 100%;\n  max-width: 1000px;\n  height: auto;\n  aspect-ratio: 1672/941;\n  margin-bottom: 8px;\n}\n.dispatch[_ngcontent-%COMP%]   .task-stage[_ngcontent-%COMP%] {\n  max-width: 1160px;\n}\n.dispatch[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.dispatch-invitation[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto 20px;\n  text-wrap: pretty;\n}\n.dispatch-caption[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 8px auto 20px;\n  color: #536368;\n  font-size: 12px;\n}\n.dispatch-prompt[_ngcontent-%COMP%] {\n  margin: 16px 0 8px;\n  font-size: 22px;\n}\n.dispatch[_ngcontent-%COMP%]   .scene-choice[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: none;\n}\n.dispatch[_ngcontent-%COMP%]   .choice-deck[_ngcontent-%COMP%] {\n  max-width: 1000px;\n  margin-top: 12px;\n}\n.choice-deck.four-choices[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n@media (max-width: 900px) {\n  .choice-deck.four-choices[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 520px) {\n  .choice-deck.four-choices[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.navigation[_ngcontent-%COMP%] {\n  --%NS%accent: #145b70;\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  touch-action: manipulation;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #168aba;\n  outline-offset: 4px;\n}\nh1[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.episode-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 8px 24px;\n  border-bottom: 1px solid #ddd7c9;\n}\n.project-name[_ngcontent-%COMP%] {\n  font-weight: 800;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.header-actions[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%], \n.chart-action[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 0;\n  padding: 8px 12px;\n  background: transparent;\n  color: inherit;\n  border-radius: 8px;\n}\n.task-stage[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  max-width: 1060px;\n  margin: auto;\n  padding: 24px 28px 36px;\n  text-align: center;\n}\n.step-mark[_ngcontent-%COMP%] {\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: var(--%NS%accent);\n  font-weight: 800;\n  margin: 0 0 8px;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: clamp(23px, 3vw, 34px);\n  line-height: 1.2;\n  margin: 0 auto 24px;\n  max-width: 850px;\n  letter-spacing: -0.035em;\n}\n.scene-visual[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 720px;\n  margin: 0 auto 20px;\n  height: 260px;\n  border-radius: 16px;\n  overflow: hidden;\n  background: #e8e5d9;\n}\n.story-stage[_ngcontent-%COMP%] {\n  max-width: 1200px;\n}\n.story-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);\n  gap: 32px;\n  align-items: start;\n  text-align: left;\n}\n.story-illustration[_ngcontent-%COMP%] {\n  --%NS%opening-media-height: 100%;\n  height: clamp(320px, 45vw, 510px);\n  overflow: hidden;\n  border-radius: 18px;\n  background: #e8e5d9;\n}\n.story-illustration[_ngcontent-%COMP%]   app-opening-media[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.story-setting[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n}\n.story-audio[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 1px solid var(--%NS%accent);\n  border-radius: 8px;\n  padding: 8px 14px;\n  color: var(--%NS%accent);\n  background: transparent;\n}\n.story-dialogue[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  padding: 0 0 0 16px;\n  border-left: 3px solid #d7c6a6;\n  font: 18px/1.5 Georgia, serif;\n}\n.story-dialogue[_ngcontent-%COMP%]   blockquote.speaking[_ngcontent-%COMP%] {\n  border-color: var(--%NS%accent);\n  background: #f3e7cf;\n}\n.story-dialogue[_ngcontent-%COMP%]   cite[_ngcontent-%COMP%] {\n  font: 700 12px/1.5 Arial, sans-serif;\n  color: var(--%NS%accent);\n}\n.story-dialogue[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0;\n}\n.story-audio-notice[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.scene-visual[_ngcontent-%COMP%]   app-opening-media[_ngcontent-%COMP%] {\n  height: 100%;\n  display: block;\n}\n.chart-action[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  bottom: 12px;\n  background: var(--%NS%paper);\n  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);\n}\n.choice-deck[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n  max-width: 850px;\n  margin: 20px auto;\n}\n.choice-deck.three-choices[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n.scene-choice[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  border: 2px solid #d7d4c7;\n  background: #fffefa;\n  color: var(--%NS%ink);\n  padding: 14px;\n  border-radius: 16px;\n  min-width: 0;\n  transition: border-color 0.15s, transform 0.15s;\n}\n.scene-choice[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: var(--%NS%accent);\n  transform: translateY(-2px);\n}\n.scene-choice.chosen[_ngcontent-%COMP%] {\n  border-color: var(--%NS%accent);\n  background: #eaf1dd;\n}\n.scene-choice[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 10px;\n}\n.choice-copy[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n}\n.choice-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 17px;\n  line-height: 1.3;\n}\n.choice-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.4;\n}\n.price[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--%NS%accent);\n}\n.object-mark[_ngcontent-%COMP%] {\n  font-size: 36px;\n}\n.cargo[_ngcontent-%COMP%]   .scene-choice[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  text-align: center;\n}\n.cargo[_ngcontent-%COMP%]   .scene-choice[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 150px;\n  object-fit: contain;\n}\n.purse[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 30px;\n  font-size: 19px;\n  font-weight: 700;\n}\n.wagon-preview[_ngcontent-%COMP%] {\n  display: block;\n  height: auto;\n  max-width: 170px;\n  margin: 8px auto;\n}\n.primary-action[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 12px;\n  background: var(--%NS%accent);\n  color: white;\n  min-height: 50px;\n  padding: 12px 24px;\n  font-weight: 800;\n  margin-top: 16px;\n}\n.thinking-desk[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);\n  align-items: center;\n  gap: 32px;\n  max-width: 900px;\n  margin: auto;\n  text-align: left;\n}\n.thought-object[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  padding: 18px;\n  border-radius: 18px;\n  background: #f0eddf;\n}\n.thought-object[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 230px;\n  object-fit: contain;\n  border-radius: 10px;\n}\n.thought-object[_ngcontent-%COMP%]   app-object-model-viewer[_ngcontent-%COMP%] {\n  height: 280px;\n  display: block;\n}\n.thought-object[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n}\n.source-link[_ngcontent-%COMP%] {\n  color: var(--%NS%accent);\n  font-size: 13px;\n}\n.thought-form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 700;\n  display: block;\n}\n.thought-form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 100%;\n  font: 18px/1.5 Georgia, serif;\n  color: var(--%NS%ink);\n  padding: 16px;\n  border: 2px solid #97aba8;\n  border-radius: 12px;\n  margin-top: 8px;\n  resize: vertical;\n  min-height: 130px;\n}\n.thought-form[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%] {\n  padding: 0;\n  border: 0;\n  margin: 0 0 22px;\n}\n.thought-form[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin-bottom: 8px;\n}\n.thought-form[_ngcontent-%COMP%]   .evidence-choice[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: start;\n  gap: 10px;\n  padding: 12px;\n  margin: 8px 0;\n  border: 2px solid #d7d4c7;\n  border-radius: 10px;\n  font-weight: 400;\n  cursor: pointer;\n}\n.evidence-choice.selected[_ngcontent-%COMP%] {\n  border-color: var(--%NS%accent);\n  background: #eaf1dd;\n}\n.evidence-choice[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin-top: 5px;\n  accent-color: var(--%NS%accent);\n}\n.price-equation[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 28px;\n  max-width: 650px;\n  margin: 16px auto;\n}\n.price-equation[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%] {\n  margin: 0;\n  flex: 1;\n  padding: 16px;\n  border: 1px solid #ded6c3;\n  background: #fffdf6;\n  border-radius: 18px;\n}\n.price-equation[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 135px;\n  object-fit: contain;\n}\n.price-equation[_ngcontent-%COMP%]   figcaption[_ngcontent-%COMP%] {\n  display: grid;\n  font-size: 16px;\n}\n.price-equation[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 30px;\n}\n.price-equation[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.operator[_ngcontent-%COMP%], \n.coin-art[_ngcontent-%COMP%] {\n  font-size: 50px;\n}\n.coin-art[_ngcontent-%COMP%] {\n  display: block;\n  color: #ac7525;\n}\n.answer-form[_ngcontent-%COMP%] {\n  max-width: 370px;\n  margin: 24px auto 0;\n}\n.answer-form[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 700;\n}\n.answer-form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  margin-top: 8px;\n}\n.answer-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 130px;\n  border: 2px solid #738885;\n  border-radius: 12px;\n  background: white;\n  padding: 10px;\n  font: 700 32px Arial;\n  text-align: center;\n  color: var(--%NS%ink);\n}\n.feedback[_ngcontent-%COMP%] {\n  color: #90421f;\n  font-size: 14px;\n  min-height: 20px;\n  margin: 10px 0 0;\n}\n.answer-form[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%] {\n  margin-top: 4px;\n}\n.result-stage[_ngcontent-%COMP%] {\n  padding-top: 70px;\n  max-width: 850px;\n}\n.math-receipt[_ngcontent-%COMP%] {\n  max-width: 450px;\n  margin: 30px auto;\n  padding: 12px 28px;\n  background: white;\n  border: 1px solid #d7cfbb;\n  border-radius: 14px;\n}\n.math-receipt[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n}\n.math-receipt[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  border-top: 2px solid var(--%NS%accent);\n  padding-top: 14px;\n  font-size: 24px;\n}\n.student-thought[_ngcontent-%COMP%] {\n  padding: 26px;\n  margin: 24px auto;\n  background: #eef1e3;\n  border-left: 5px solid var(--%NS%accent);\n  border-radius: 8px;\n  font: 24px/1.5 Georgia, serif;\n  text-align: left;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.next-clue[_ngcontent-%COMP%] {\n  max-width: 650px;\n  margin: 24px auto;\n  font-size: 16px;\n}\n.outcome-detail[_ngcontent-%COMP%] {\n  max-width: 620px;\n  margin: 28px auto 0;\n  font-size: 14px;\n  text-align: left;\n}\n.outcome-detail[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 44px;\n  text-align: center;\n}\n.task-stage[_ngcontent-%COMP%]   app-opening-speeches[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 850px;\n  margin: 0 auto;\n}\n@media (max-width: 700px) {\n  .story-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 20px;\n  }\n  .story-illustration[_ngcontent-%COMP%] {\n    height: 230px;\n  }\n  .episode-header[_ngcontent-%COMP%] {\n    padding: 8px 14px;\n    flex-wrap: wrap;\n    gap: 4px;\n  }\n  .project-name[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    margin-left: auto;\n    font-size: 12px;\n    gap: 0;\n  }\n  .task-stage[_ngcontent-%COMP%] {\n    padding: 22px 16px;\n  }\n  .scene-visual[_ngcontent-%COMP%] {\n    height: 220px;\n  }\n  .choice-deck[_ngcontent-%COMP%], \n   .choice-deck.three-choices[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .scene-choice[_ngcontent-%COMP%] {\n    padding: 10px;\n    flex-direction: column;\n    align-items: start;\n  }\n  .scene-choice[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 80px;\n  }\n  .choice-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .choice-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .cargo[_ngcontent-%COMP%]   .scene-choice[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    height: 90px;\n  }\n  .purse[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .price[_ngcontent-%COMP%] {\n    font-size: 17px;\n  }\n  .thinking-desk[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 18px;\n  }\n  .thought-object[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .thought-object[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    max-height: 160px;\n  }\n  .thought-object[_ngcontent-%COMP%]   app-object-model-viewer[_ngcontent-%COMP%] {\n    height: 230px;\n  }\n  .price-equation[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  .price-equation[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .price-equation[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    height: 95px;\n  }\n  .price-equation[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .operator[_ngcontent-%COMP%] {\n    font-size: 32px;\n  }\n  .result-stage[_ngcontent-%COMP%] {\n    padding-top: 40px;\n  }\n  .student-thought[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=decision-scene.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DecisionSceneComponent, [{
    type: Component,
    args: [{ selector: "app-decision-scene", imports: [
      OpeningMediaComponent,
      OpeningSpeechesComponent,
      ObjectModelViewerComponent,
      FormsModule,
      TaskGuideComponent,
      CargoWagonComponent
    ], template: `<section class="decision-opening" [class]="'decision-opening ' + config().interaction">
  <header class="episode-header">
    <span class="project-name">{{ config().kicker.split(' \xB7 ')[0] }}</span>
    <div class="header-actions">
      <button type="button" (click)="reset()">\u21BA Restart</button>
      <button type="button" (click)="finish(true)">Project preview</button>
      <app-task-guide [title]="stage() === 'thinking' ? 'One step at a time' : 'About this scene'">
        @if (prologue(); as story) {
          <p>{{ story.setting }}</p>
        } @else if (stage() === 'thinking' && config().cargo) {
          <p>
            {{
              mathStep() === 'cost'
                ? 'Add the purchase prices of your two supplies.'
                : mathStep() === 'remaining'
                  ? 'Start with your purse. Subtract what you spent.'
                  : mathStep() === 'sale'
                    ? 'Add the two offers from buyers. This is your sales total.'
                    : 'Profit is sales minus the amount you paid for your cargo.'
            }}
          </p>
          <p>Try drawing the coins or writing the calculation on paper.</p>
        } @else if (stage() === 'thinking') {
          <p>{{ selected()?.thinking?.guide }}</p>
        } @else {
          <p>{{ config().invitation }}</p>
          <p>{{ config().sceneCaption }}</p>
        }
        @for (line of lines(); track $index) {
          <p>
            <b>{{ line.speaker }}:</b> {{ line.text }}
          </p>
        }
        @if (lines().length) {
          <button type="button" (click)="toggleVoice()">
            {{ voices() ? 'Mute voices' : 'Play voices' }}
          </button>
          <p role="status">{{ audioNotice() }}</p>
        }
      </app-task-guide>
    </div>
  </header>
  @if (prologue(); as story) {
    <main class="task-stage story-stage">
      <p class="step-mark">The story begins</p>
      <h1 #sceneHeading tabindex="-1">{{ story.title }}</h1>
      <div class="story-layout">
        <div class="story-illustration">
          <app-opening-media [media]="story.media" />
        </div>
        <div class="story-copy">
          <p class="story-setting">{{ story.setting }}</p>
          <button class="story-audio" type="button" (click)="listenToStory()">
            {{ activeLine() >= 0 ? 'Stop narration' : 'Listen to the story' }}
          </button>
          <div class="story-dialogue">
            @for (line of story.dialogue; track $index) {
              <blockquote [class.speaking]="activeLine() === $index">
                @if ($first || story.dialogue[$index - 1].speaker !== line.speaker) {
                  <cite>{{ line.speaker }}</cite>
                }
                <p>\u201C{{ line.text }}\u201D</p>
              </blockquote>
            }
          </div>
          <p class="story-audio-notice" role="status">{{ audioNotice() }}</p>
          <button class="primary-action" type="button" (click)="continuePrologue()">
            {{ story.continueLabel }} \u2192
          </button>
        </div>
      </div>
    </main>
  } @else if (stage() === 'briefing') {
    <main class="task-stage">
      <p class="step-mark">
        {{ config().interaction === 'dispatch' ? config().sceneLabel : '1 \xB7 Choose' }}
      </p>
      <h1 #sceneHeading tabindex="-1">
        {{ config().interaction === 'dispatch' ? config().headline : config().prompt }}
      </h1>
      @if (config().interaction === 'dispatch') {
        <p class="dispatch-invitation">{{ config().invitation }}</p>
      }
      @if (config().cargo; as cargo) {
        <div class="purse">
          <span>\u25C9 {{ cargo.startingCoins }} coins</span
          ><span>\u25A3 {{ cargoItems().length }} / {{ cargo.capacity }} spaces</span>
        </div>
        @if (cargoItems().length) {
          <app-cargo-wagon
            class="wagon-preview"
            [image]="cargo.vehicleImage"
            [alt]="cargo.vehicleAlt"
            [items]="cargoItems()"
          />
        }
      } @else if (config().speeches; as speeches) {
        <app-opening-speeches [speeches]="speeches" />
      } @else {
        <div class="scene-visual">
          @for (key of [replayKey()]; track key) {
            <app-opening-media
              [media]="
                videoFinished() ? (config().afterVideoMedia ?? config().media) : config().media
              "
              (playbackEnded)="videoFinished.set(true)"
            />
          }
          @if (config().afterVideoMedia && !videoFinished()) {
            <button class="chart-action" type="button" (click)="videoFinished.set(true)">
              Open chart \u2192
            </button>
          }
        </div>
      }
      @if (config().interaction === 'dispatch') {
        <p class="dispatch-caption">{{ config().sceneCaption }}</p>
        <h2 class="dispatch-prompt">{{ config().prompt }}</h2>
      }
      <div
        class="choice-deck"
        [class.three-choices]="config().choices.length === 3"
        [class.four-choices]="config().choices.length === 4"
      >
        @for (choice of config().choices; track choice.id) {
          <button
            type="button"
            class="scene-choice"
            [disabled]="choiceDisabled(choice)"
            [class.chosen]="isLoaded(choice) || selected()?.id === choice.id"
            [attr.aria-pressed]="config().cargo ? isLoaded(choice) : null"
            (click)="choose(choice.id)"
          >
            @if (choice.image) {
              <img [src]="choice.image" [alt]="choice.imageAlt" />
            }
            @if (choice.model) {
              <span class="object-mark" aria-hidden="true">\u25C8</span>
            }
            <span class="choice-copy"
              ><strong>{{ isLoaded(choice) ? '\u2713 ' + choice.cargo?.name : choice.label }}</strong>
              @if (choice.cargo) {
                <b class="price">{{ choice.cargo.cost }} coins</b>
              } @else {
                <small>{{ choice.detail }}</small>
              }
            </span>
          </button>
        }
      </div>
      @if (config().cargo; as cargo) {
        <button
          class="primary-action"
          type="button"
          [disabled]="cargoItems().length !== cargo.capacity"
          (click)="depart()"
        >
          Work out the cost \u2192
        </button>
      }
      @if (transitioning()) {
        <p role="status">{{ config().transition?.label }}</p>
      }
    </main>
  } @else if (stage() === 'thinking' && config().cargo; as cargo) {
    <main class="task-stage math-stage">
      <p class="step-mark">{{ mathIndex() < 2 ? '2 \xB7 Buy' : '3 \xB7 Sell' }}</p>
      <h1 #revealHeading tabindex="-1">{{ mathPrompt() }}</h1>
      @if (mathStep() === 'cost' || mathStep() === 'sale') {
        <div class="price-equation">
          @for (item of cargoItems(); track item.id; let first = $first) {
            @if (!first) {
              <span class="operator" aria-hidden="true">+</span>
            }
            <figure>
              <img [src]="item.image" [alt]="item.cargo!.name" />
              <figcaption>
                {{ item.cargo!.name
                }}<strong
                  >{{ mathStep() === 'cost' ? item.cargo!.cost : item.cargo!.sale }} coins</strong
                ><small>{{ mathStep() === 'cost' ? 'Price to buy' : 'Buyer\u2019s offer' }}</small>
              </figcaption>
            </figure>
          }
        </div>
      } @else {
        <div class="price-equation">
          <figure>
            <span class="coin-art" aria-hidden="true">\u25C9</span>
            <figcaption>
              {{ mathStep() === 'remaining' ? 'Your purse' : 'Your sales'
              }}<strong
                >{{
                  mathStep() === 'remaining' ? cargo.startingCoins : cargoBalance().sale
                }}
                coins</strong
              >
            </figcaption>
          </figure>
          <span class="operator" aria-hidden="true">\u2212</span>
          <figure>
            <span class="coin-art" aria-hidden="true">\u25A3</span>
            <figcaption>
              You spent<strong>{{ cargoBalance().cost }} coins</strong>
            </figcaption>
          </figure>
        </div>
      }
      <form class="answer-form" (ngSubmit)="checkMath()">
        <label for="coin-answer">{{ mathStep() === 'profit' ? 'My profit' : 'My total' }}</label>
        <div>
          <input
            id="coin-answer"
            name="coins"
            inputmode="decimal"
            autocomplete="off"
            maxlength="12"
            [ngModel]="answer()"
            (ngModelChange)="answer.set($event)"
            aria-describedby="math-feedback"
          /><span>coins</span>
        </div>
        <p id="math-feedback" class="feedback" role="status">{{ feedback() }}</p>
        <button class="primary-action" type="submit">Check my math \u2192</button>
      </form>
    </main>
  } @else if (stage() === 'thinking' && selected(); as choice) {
    <main class="task-stage thought-stage">
      <p class="step-mark">2 \xB7 My thinking</p>
      <h1 #revealHeading tabindex="-1">{{ choice.thinking!.prompt }}</h1>
      <div class="thinking-desk">
        <div class="thought-object">
          @if (choice.model; as model) {
            <app-object-model-viewer [model]="model" [autoLoad]="true" />
          } @else if (choice.image) {
            <img [src]="choice.image" [alt]="choice.imageAlt" />
          }
          <strong>{{ choice.label }}</strong>
          <p>{{ choice.detail }}</p>
          @if (choice.result.source; as source) {
            <a class="source-link" [href]="source.url" target="_blank" rel="noopener noreferrer"
              >{{ source.label }} \u2197</a
            >
          }
        </div>
        <form class="thought-form" (ngSubmit)="saveThought()">
          @if (choice.thinking!.evidence; as evidence) {
            <fieldset>
              <legend>A clue I will use</legend>
              @for (clue of evidence; track clue.id) {
                <label class="evidence-choice" [class.selected]="evidenceId() === clue.id"
                  ><input
                    type="radio"
                    name="clue"
                    [value]="clue.id"
                    [ngModel]="evidenceId()"
                    (ngModelChange)="evidenceId.set($event)"
                  />{{ clue.text }}</label
                >
              }
            </fieldset>
          }
          <label for="first-thought">{{ choice.thinking!.starter }}</label>
          <textarea
            id="first-thought"
            name="thought"
            rows="3"
            maxlength="1000"
            [ngModel]="answer()"
            (ngModelChange)="answer.set($event)"
          ></textarea>
          <button class="primary-action" type="submit" [disabled]="!canSaveThought()">
            Keep my idea \u2192
          </button>
        </form>
      </div>
    </main>
  } @else if (selected(); as choice) {
    <main class="task-stage result-stage">
      <p class="step-mark">{{ config().cargo ? '\u2713 Math checked' : '3 \xB7 Your first idea' }}</p>
      <h1 #revealHeading tabindex="-1">
        {{
          config().cargo ? 'Your first trade, worked out by you.' : 'You have an idea to build on.'
        }}
      </h1>
      @if (config().cargo) {
        <div class="math-receipt">
          <p>
            <span>You bought</span><strong>{{ cargoBalance().cost }} coins</strong>
          </p>
          <p>
            <span>You sold</span><strong>{{ cargoBalance().sale }} coins</strong>
          </p>
          <p>
            <span>Your profit</span><strong>{{ cargoBalance().profit }} coins</strong>
          </p>
        </div>
      } @else {
        <blockquote class="student-thought">{{ answer() || choice.label }}</blockquote>
        <p class="next-clue">{{ choice.result.evidence }}</p>
      }
      <button class="primary-action" type="button" (click)="finish()">
        {{ config().mission.finishButton }} \u2192
      </button>
      <details class="outcome-detail">
        <summary>See the scene\u2019s outcome</summary>
        <p>{{ choice.result.text }}</p>
      </details>
    </main>
  }
</section>
`, styles: ["/* src/app/plugins/intro-scenes/decision-scene.component.scss */\n:host {\n  display: block;\n}\n.decision-opening {\n  --ink: #203e46;\n  --accent: #216169;\n  --paper: #fffdf7;\n  color: var(--ink);\n  background: var(--paper);\n  min-height: calc(100dvh - 60px);\n  font: 16px/1.5 Arial, sans-serif;\n}\n.cargo {\n  --accent: #85431d;\n  --ink: #473624;\n  --paper: #fcf6e9;\n}\n.council {\n  --accent: #7b3554;\n}\n.dispatch {\n  --accent: #244e8b;\n}\n.dispatch .scene-visual {\n  --opening-media-height: 100%;\n  max-width: 1000px;\n  height: auto;\n  aspect-ratio: 1672/941;\n  margin-bottom: 8px;\n}\n.dispatch .task-stage {\n  max-width: 1160px;\n}\n.dispatch h1 {\n  margin-bottom: 12px;\n}\n.dispatch-invitation {\n  max-width: 800px;\n  margin: 0 auto 20px;\n  text-wrap: pretty;\n}\n.dispatch-caption {\n  max-width: 900px;\n  margin: 8px auto 20px;\n  color: #536368;\n  font-size: 12px;\n}\n.dispatch-prompt {\n  margin: 16px 0 8px;\n  font-size: 22px;\n}\n.dispatch .scene-choice img {\n  display: none;\n}\n.dispatch .choice-deck {\n  max-width: 1000px;\n  margin-top: 12px;\n}\n.choice-deck.four-choices {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n@media (max-width: 900px) {\n  .choice-deck.four-choices {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 520px) {\n  .choice-deck.four-choices {\n    grid-template-columns: 1fr;\n  }\n}\n.navigation {\n  --accent: #145b70;\n}\nbutton,\na,\ninput,\ntextarea {\n  touch-action: manipulation;\n}\nbutton {\n  font: inherit;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\nbutton:focus-visible,\na:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible {\n  outline: 3px solid #168aba;\n  outline-offset: 4px;\n}\nh1:focus {\n  outline: none;\n}\n.episode-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 8px 24px;\n  border-bottom: 1px solid #ddd7c9;\n}\n.project-name {\n  font-weight: 800;\n}\n.header-actions {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.header-actions > button,\n.chart-action {\n  min-height: 44px;\n  border: 0;\n  padding: 8px 12px;\n  background: transparent;\n  color: inherit;\n  border-radius: 8px;\n}\n.task-stage {\n  box-sizing: border-box;\n  max-width: 1060px;\n  margin: auto;\n  padding: 24px 28px 36px;\n  text-align: center;\n}\n.step-mark {\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: var(--accent);\n  font-weight: 800;\n  margin: 0 0 8px;\n}\nh1 {\n  font-size: clamp(23px, 3vw, 34px);\n  line-height: 1.2;\n  margin: 0 auto 24px;\n  max-width: 850px;\n  letter-spacing: -0.035em;\n}\n.scene-visual {\n  position: relative;\n  max-width: 720px;\n  margin: 0 auto 20px;\n  height: 260px;\n  border-radius: 16px;\n  overflow: hidden;\n  background: #e8e5d9;\n}\n.story-stage {\n  max-width: 1200px;\n}\n.story-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);\n  gap: 32px;\n  align-items: start;\n  text-align: left;\n}\n.story-illustration {\n  --opening-media-height: 100%;\n  height: clamp(320px, 45vw, 510px);\n  overflow: hidden;\n  border-radius: 18px;\n  background: #e8e5d9;\n}\n.story-illustration app-opening-media {\n  display: block;\n  height: 100%;\n}\n.story-setting {\n  margin: 0 0 16px;\n}\n.story-audio {\n  min-height: 44px;\n  border: 1px solid var(--accent);\n  border-radius: 8px;\n  padding: 8px 14px;\n  color: var(--accent);\n  background: transparent;\n}\n.story-dialogue blockquote {\n  margin: 16px 0;\n  padding: 0 0 0 16px;\n  border-left: 3px solid #d7c6a6;\n  font: 18px/1.5 Georgia, serif;\n}\n.story-dialogue blockquote.speaking {\n  border-color: var(--accent);\n  background: #f3e7cf;\n}\n.story-dialogue cite {\n  font: 700 12px/1.5 Arial, sans-serif;\n  color: var(--accent);\n}\n.story-dialogue p {\n  margin: 4px 0;\n}\n.story-audio-notice {\n  font-size: 12px;\n}\n.scene-visual app-opening-media {\n  height: 100%;\n  display: block;\n}\n.chart-action {\n  position: absolute;\n  right: 12px;\n  bottom: 12px;\n  background: var(--paper);\n  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);\n}\n.choice-deck {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n  max-width: 850px;\n  margin: 20px auto;\n}\n.choice-deck.three-choices {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n.scene-choice {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  border: 2px solid #d7d4c7;\n  background: #fffefa;\n  color: var(--ink);\n  padding: 14px;\n  border-radius: 16px;\n  min-width: 0;\n  transition: border-color 0.15s, transform 0.15s;\n}\n.scene-choice:hover:not(:disabled) {\n  border-color: var(--accent);\n  transform: translateY(-2px);\n}\n.scene-choice.chosen {\n  border-color: var(--accent);\n  background: #eaf1dd;\n}\n.scene-choice img {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 10px;\n}\n.choice-copy {\n  display: grid;\n  gap: 5px;\n}\n.choice-copy strong {\n  font-size: 17px;\n  line-height: 1.3;\n}\n.choice-copy small {\n  font-size: 13px;\n  line-height: 1.4;\n}\n.price {\n  font-size: 20px;\n  color: var(--accent);\n}\n.object-mark {\n  font-size: 36px;\n}\n.cargo .scene-choice {\n  display: grid;\n  justify-items: center;\n  text-align: center;\n}\n.cargo .scene-choice img {\n  width: 100%;\n  height: 150px;\n  object-fit: contain;\n}\n.purse {\n  display: flex;\n  justify-content: center;\n  gap: 30px;\n  font-size: 19px;\n  font-weight: 700;\n}\n.wagon-preview {\n  display: block;\n  height: auto;\n  max-width: 170px;\n  margin: 8px auto;\n}\n.primary-action {\n  border: 0;\n  border-radius: 12px;\n  background: var(--accent);\n  color: white;\n  min-height: 50px;\n  padding: 12px 24px;\n  font-weight: 800;\n  margin-top: 16px;\n}\n.thinking-desk {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);\n  align-items: center;\n  gap: 32px;\n  max-width: 900px;\n  margin: auto;\n  text-align: left;\n}\n.thought-object {\n  display: grid;\n  gap: 8px;\n  padding: 18px;\n  border-radius: 18px;\n  background: #f0eddf;\n}\n.thought-object img {\n  width: 100%;\n  max-height: 230px;\n  object-fit: contain;\n  border-radius: 10px;\n}\n.thought-object app-object-model-viewer {\n  height: 280px;\n  display: block;\n}\n.thought-object p {\n  margin: 0;\n  font-size: 14px;\n}\n.source-link {\n  color: var(--accent);\n  font-size: 13px;\n}\n.thought-form label {\n  font-weight: 700;\n  display: block;\n}\n.thought-form textarea {\n  box-sizing: border-box;\n  width: 100%;\n  font: 18px/1.5 Georgia, serif;\n  color: var(--ink);\n  padding: 16px;\n  border: 2px solid #97aba8;\n  border-radius: 12px;\n  margin-top: 8px;\n  resize: vertical;\n  min-height: 130px;\n}\n.thought-form fieldset {\n  padding: 0;\n  border: 0;\n  margin: 0 0 22px;\n}\n.thought-form legend {\n  font-size: 13px;\n  margin-bottom: 8px;\n}\n.thought-form .evidence-choice {\n  display: flex;\n  align-items: start;\n  gap: 10px;\n  padding: 12px;\n  margin: 8px 0;\n  border: 2px solid #d7d4c7;\n  border-radius: 10px;\n  font-weight: 400;\n  cursor: pointer;\n}\n.evidence-choice.selected {\n  border-color: var(--accent);\n  background: #eaf1dd;\n}\n.evidence-choice input {\n  margin-top: 5px;\n  accent-color: var(--accent);\n}\n.price-equation {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 28px;\n  max-width: 650px;\n  margin: 16px auto;\n}\n.price-equation figure {\n  margin: 0;\n  flex: 1;\n  padding: 16px;\n  border: 1px solid #ded6c3;\n  background: #fffdf6;\n  border-radius: 18px;\n}\n.price-equation img {\n  width: 100%;\n  height: 135px;\n  object-fit: contain;\n}\n.price-equation figcaption {\n  display: grid;\n  font-size: 16px;\n}\n.price-equation strong {\n  font-size: 30px;\n}\n.price-equation small {\n  font-size: 12px;\n}\n.operator,\n.coin-art {\n  font-size: 50px;\n}\n.coin-art {\n  display: block;\n  color: #ac7525;\n}\n.answer-form {\n  max-width: 370px;\n  margin: 24px auto 0;\n}\n.answer-form > label {\n  display: block;\n  font-weight: 700;\n}\n.answer-form > div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  margin-top: 8px;\n}\n.answer-form input {\n  width: 130px;\n  border: 2px solid #738885;\n  border-radius: 12px;\n  background: white;\n  padding: 10px;\n  font: 700 32px Arial;\n  text-align: center;\n  color: var(--ink);\n}\n.feedback {\n  color: #90421f;\n  font-size: 14px;\n  min-height: 20px;\n  margin: 10px 0 0;\n}\n.answer-form .primary-action {\n  margin-top: 4px;\n}\n.result-stage {\n  padding-top: 70px;\n  max-width: 850px;\n}\n.math-receipt {\n  max-width: 450px;\n  margin: 30px auto;\n  padding: 12px 28px;\n  background: white;\n  border: 1px solid #d7cfbb;\n  border-radius: 14px;\n}\n.math-receipt p {\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n}\n.math-receipt p:last-child {\n  border-top: 2px solid var(--accent);\n  padding-top: 14px;\n  font-size: 24px;\n}\n.student-thought {\n  padding: 26px;\n  margin: 24px auto;\n  background: #eef1e3;\n  border-left: 5px solid var(--accent);\n  border-radius: 8px;\n  font: 24px/1.5 Georgia, serif;\n  text-align: left;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.next-clue {\n  max-width: 650px;\n  margin: 24px auto;\n  font-size: 16px;\n}\n.outcome-detail {\n  max-width: 620px;\n  margin: 28px auto 0;\n  font-size: 14px;\n  text-align: left;\n}\n.outcome-detail summary {\n  cursor: pointer;\n  min-height: 44px;\n  text-align: center;\n}\n.task-stage app-opening-speeches {\n  display: block;\n  max-width: 850px;\n  margin: 0 auto;\n}\n@media (max-width: 700px) {\n  .story-layout {\n    grid-template-columns: 1fr;\n    gap: 20px;\n  }\n  .story-illustration {\n    height: 230px;\n  }\n  .episode-header {\n    padding: 8px 14px;\n    flex-wrap: wrap;\n    gap: 4px;\n  }\n  .project-name {\n    font-size: 14px;\n  }\n  .header-actions {\n    margin-left: auto;\n    font-size: 12px;\n    gap: 0;\n  }\n  .task-stage {\n    padding: 22px 16px;\n  }\n  .scene-visual {\n    height: 220px;\n  }\n  .choice-deck,\n  .choice-deck.three-choices {\n    gap: 8px;\n  }\n  .scene-choice {\n    padding: 10px;\n    flex-direction: column;\n    align-items: start;\n  }\n  .scene-choice img {\n    width: 100%;\n    height: 80px;\n  }\n  .choice-copy strong {\n    font-size: 14px;\n  }\n  .choice-copy small {\n    font-size: 12px;\n  }\n  .cargo .scene-choice img {\n    height: 90px;\n  }\n  .purse {\n    font-size: 16px;\n  }\n  .price {\n    font-size: 17px;\n  }\n  .thinking-desk {\n    grid-template-columns: 1fr;\n    gap: 18px;\n  }\n  .thought-object {\n    padding: 12px;\n  }\n  .thought-object img {\n    max-height: 160px;\n  }\n  .thought-object app-object-model-viewer {\n    height: 230px;\n  }\n  .price-equation {\n    gap: 10px;\n  }\n  .price-equation figure {\n    padding: 10px;\n  }\n  .price-equation img {\n    height: 95px;\n  }\n  .price-equation strong {\n    font-size: 24px;\n  }\n  .operator {\n    font-size: 32px;\n  }\n  .result-stage {\n    padding-top: 40px;\n  }\n  .student-thought {\n    font-size: 20px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=decision-scene.component.css.map */\n"] }]
  }], () => [], { config: [{ type: Input, args: [{ isSignal: true, alias: "config", required: true }] }], completed: [{ type: Output, args: ["completed"] }], speeches: [{ type: ViewChild, args: [forwardRef(() => OpeningSpeechesComponent), { isSignal: true }] }], heading: [{ type: ViewChild, args: ["sceneHeading", { isSignal: true }] }], revealHeading: [{ type: ViewChild, args: ["revealHeading", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DecisionSceneComponent, { className: "DecisionSceneComponent", filePath: "src/app/plugins/intro-scenes/decision-scene.component.ts", lineNumber: 42 });
})();

// src/app/runtime/project-launch/project-teaser.registry.ts
var ProjectTeaserRegistry = class {
  entries = /* @__PURE__ */ new Map();
  register(id, renderer) {
    if (this.entries.has(id)) throw new Error(`DUPLICATE_REGISTRATION: Opening scene ${id}.`);
    this.entries.set(id, renderer);
  }
  require(id) {
    const component = this.entries.get(id);
    if (!component) throw new Error(`CAPABILITY_NOT_INSTALLED: Opening scene ${id}.`);
    return component;
  }
};
var projectTeaserRegistry = new ProjectTeaserRegistry();
projectTeaserRegistry.register("illustrated-comparison", IllustratedComparisonComponent);
projectTeaserRegistry.register("decision-scene", DecisionSceneComponent);

// src/app/features/project-intro/project-teaser-host.component.ts
var _c05 = ["outlet"];
function ProjectTeaserHostComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 1);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
var ProjectTeaserHostComponent = class _ProjectTeaserHostComponent {
  config = input.required(
    ...ngDevMode ? [{ debugName: "config" }] : (
      /* istanbul ignore next */
      []
    )
  );
  storyMode = input(
    false,
    ...ngDevMode ? [{ debugName: "storyMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completed = output();
  error = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  outlet = viewChild("outlet", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "outlet" } : (
    /* istanbul ignore next */
    {}
  )), { read: ViewContainerRef }));
  constructor() {
    effect((cleanup) => {
      const outlet = this.outlet();
      if (!outlet)
        return;
      const config = this.config();
      try {
        validateTeaser(config);
        const component = projectTeaserRegistry.require(config.type);
        const ref = outlet.createComponent(component, {
          bindings: [
            inputBinding("config", () => config),
            ...config.type === "illustrated-comparison" ? [inputBinding("storyMode", () => this.storyMode())] : [],
            outputBinding("completed", (result) => this.completed.emit(result))
          ]
        });
        this.error.set(void 0);
        cleanup(() => ref.destroy());
      } catch (error) {
        this.error.set(error instanceof Error ? error.message : "The opening scene could not load.");
      }
    });
  }
  static \u0275fac = function ProjectTeaserHostComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectTeaserHostComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectTeaserHostComponent, selectors: [["app-project-teaser-host"]], viewQuery: function ProjectTeaserHostComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.outlet, _c05, 5, ViewContainerRef);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { config: [1, "config"], storyMode: [1, "storyMode"] }, outputs: { completed: "completed" }, decls: 3, vars: 1, consts: [["outlet", ""], ["role", "alert"]], template: function ProjectTeaserHostComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ProjectTeaserHostComponent_Conditional_0_Template, 2, 1, "p", 1);
      \u0275\u0275domElementContainer(1, null, 0);
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275conditional((tmp_1_0 = ctx.error()) ? 0 : -1, tmp_1_0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectTeaserHostComponent, [{
    type: Component,
    args: [{
      selector: "app-project-teaser-host",
      template: '@if (error(); as message) { <p role="alert">{{ message }}</p> } <ng-container #outlet />'
    }]
  }], () => [], { config: [{ type: Input, args: [{ isSignal: true, alias: "config", required: true }] }], storyMode: [{ type: Input, args: [{ isSignal: true, alias: "storyMode", required: false }] }], completed: [{ type: Output, args: ["completed"] }], outlet: [{ type: ViewChild, args: ["outlet", __spreadProps(__spreadValues({}, { read: ViewContainerRef }), { isSignal: true })] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectTeaserHostComponent, { className: "ProjectTeaserHostComponent", filePath: "src/app/features/project-intro/project-teaser-host.component.ts", lineNumber: 24 });
})();

// src/app/features/project-intro/project-intro.component.ts
var _c06 = ["practiceDialog"];
var _c13 = ["practiceButton"];
var _c23 = ["openingClip"];
var _c32 = (a0) => [a0];
var _c4 = (a0) => ["/projects", a0, "final-demo"];
var _forTrack05 = ($index, $item) => $item.id;
function ProjectIntroComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 43, 0);
    \u0275\u0275listener("click", function ProjectIntroComponent_Conditional_37_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openPractice());
    });
    \u0275\u0275text(2, " Try your first trade \u2192 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 44);
    \u0275\u0275text(4, "A quick practice round \xB7 30 coins \xB7 Two cargo spaces");
    \u0275\u0275elementEnd();
  }
}
function ProjectIntroComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function ProjectIntroComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-project-teaser-host", 24);
  }
  if (rf & 2) {
    \u0275\u0275property("config", ctx)("storyMode", true);
  }
}
function ProjectIntroComponent_Conditional_42_Conditional_0_For_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "track", 47);
  }
  if (rf & 2) {
    const clip_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", clip_r4.captions);
  }
}
function ProjectIntroComponent_Conditional_42_Conditional_0_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "video", 46, 1);
    \u0275\u0275listener("error", function ProjectIntroComponent_Conditional_42_Conditional_0_For_1_Template_video_error_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.speechFailed.set(true));
    });
    \u0275\u0275conditionalCreate(2, ProjectIntroComponent_Conditional_42_Conditional_0_For_1_Conditional_2_Template, 1, 1, "track", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const clip_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("src", clip_r4.video, \u0275\u0275sanitizeUrl)("poster", ctx_r1.media?.image);
    \u0275\u0275attribute("aria-label", clip_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(clip_r4.captions ? 2 : -1);
  }
}
function ProjectIntroComponent_Conditional_42_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ProjectIntroComponent_Conditional_42_Conditional_0_For_1_Template, 3, 4, "video", 45, _forTrack05);
  }
  if (rf & 2) {
    const speech_r5 = \u0275\u0275nextContext();
    \u0275\u0275repeater(\u0275\u0275pureFunction1(0, _c32, speech_r5));
  }
}
function ProjectIntroComponent_Conditional_42_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 48);
    \u0275\u0275elementStart(1, "p", 49);
    \u0275\u0275text(2, " This opening clip is unavailable. You can still explore the story and start your project. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.media?.image, \u0275\u0275sanitizeUrl)("alt", ctx_r1.media?.alt);
  }
}
function ProjectIntroComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProjectIntroComponent_Conditional_42_Conditional_0_Template, 2, 2)(1, ProjectIntroComponent_Conditional_42_Conditional_1_Template, 3, 2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r1.speechFailed() ? 0 : 1);
  }
}
function ProjectIntroComponent_Conditional_43_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-opening-media", 50);
  }
  if (rf & 2) {
    const opening_r6 = \u0275\u0275nextContext();
    \u0275\u0275property("media", opening_r6);
  }
}
function ProjectIntroComponent_Conditional_43_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 51)(1, "div", 52);
  }
  if (rf & 2) {
    const opening_r6 = \u0275\u0275nextContext();
    \u0275\u0275property("src", opening_r6.image, \u0275\u0275sanitizeUrl)("alt", opening_r6.alt);
  }
}
function ProjectIntroComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProjectIntroComponent_Conditional_43_Conditional_0_Template, 1, 1, "app-opening-media", 50)(1, ProjectIntroComponent_Conditional_43_Conditional_1_Template, 2, 2);
  }
  if (rf & 2) {
    const opening_r6 = ctx;
    \u0275\u0275conditional(opening_r6.video || opening_r6.model ? 0 : 1);
  }
}
function ProjectIntroComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.project.symbol);
  }
}
function ProjectIntroComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26)(1, "span", 5);
    \u0275\u0275text(2, "\u2726");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " STEP INTO THE STORY");
    \u0275\u0275elementEnd();
  }
}
function ProjectIntroComponent_Conditional_46_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 56);
    \u0275\u0275listener("click", function ProjectIntroComponent_Conditional_46_For_3_Template_button_click_0_listener() {
      const clip_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectSpeech(clip_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const clip_r8 = ctx.$implicit;
    const speech_r9 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", clip_r8.id === speech_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", clip_r8.speaker, " ");
  }
}
function ProjectIntroComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 53);
    \u0275\u0275repeaterCreate(2, ProjectIntroComponent_Conditional_46_For_3_Template, 2, 2, "button", 54, _forTrack05);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 55);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.speeches);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.summary);
  }
}
function ProjectIntroComponent_Conditional_57_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-project-teaser-host", 60);
    \u0275\u0275listener("completed", function ProjectIntroComponent_Conditional_57_Conditional_4_Template_app_project_teaser_host_completed_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closePractice());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opening_r12 = \u0275\u0275nextContext();
    \u0275\u0275property("config", opening_r12);
  }
}
function ProjectIntroComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "dialog", 57, 2);
    \u0275\u0275listener("cancel", function ProjectIntroComponent_Conditional_57_Template_dialog_cancel_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePractice());
    })("close", function ProjectIntroComponent_Conditional_57_Template_dialog_close_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.practiceOpen.set(false));
    });
    \u0275\u0275elementStart(2, "button", 58);
    \u0275\u0275listener("click", function ProjectIntroComponent_Conditional_57_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePractice());
    });
    \u0275\u0275text(3, " Close practice \xD7 ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, ProjectIntroComponent_Conditional_57_Conditional_4_Template, 1, 1, "app-project-teaser-host", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.practiceOpen() ? 4 : -1);
  }
}
function ProjectIntroComponent_Conditional_64_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const experience_r13 = ctx.$implicit;
    const \u0275$index_162_r14 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("0", \u0275$index_162_r14 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(experience_r13);
  }
}
function ProjectIntroComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ol", 35);
    \u0275\u0275repeaterCreate(1, ProjectIntroComponent_Conditional_64_For_2_Template, 5, 2, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.mission);
  }
}
function ProjectIntroComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.project.description);
  }
}
function ProjectIntroComponent_For_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 5);
    \u0275\u0275text(2, "\u2726");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const goal_r15 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(goal_r15);
  }
}
function ProjectIntroComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function ProjectIntroComponent_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "aside", 41)(1, "span", 62);
    \u0275\u0275text(2, "\u25C7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "span", 29);
    \u0275\u0275text(5, "FINISH WITH SOMETHING THAT\u2019S YOURS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "a", 63);
    \u0275\u0275text(9, "See a finished project ");
    \u0275\u0275elementStart(10, "span", 5);
    \u0275\u0275text(11, "\u2197");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx.finalExample.format);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c4, ctx_r1.project.id));
  }
}
var ProjectIntroComponent = class _ProjectIntroComponent {
  project = inject(PROJECT_CATALOG_ENTRY);
  config = inject(PROJECT_INTRO_CONFIG, { optional: true });
  router = inject(Router);
  entering = signal(
    false,
    ...ngDevMode ? [{ debugName: "entering" }] : (
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
  media = this.openingMedia();
  illustratedOpening = this.config?.teaser?.type === "illustrated-comparison" ? this.config.teaser : void 0;
  speeches = this.config?.teaser?.type === "decision-scene" ? this.config.teaser.speeches ?? [] : [];
  activeSpeech = signal(
    this.speeches[0],
    ...ngDevMode ? [{ debugName: "activeSpeech" }] : (
      /* istanbul ignore next */
      []
    )
  );
  speechFailed = signal(
    false,
    ...ngDevMode ? [{ debugName: "speechFailed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  practiceOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "practiceOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  practice = this.config?.teaser?.type === "decision-scene" && this.config.teaser.cargo ? __spreadProps(__spreadValues({}, this.config.teaser), { prologue: void 0 }) : void 0;
  practiceDialog = viewChild(
    "practiceDialog",
    ...ngDevMode ? [{ debugName: "practiceDialog" }] : (
      /* istanbul ignore next */
      []
    )
  );
  practiceButton = viewChild(
    "practiceButton",
    ...ngDevMode ? [{ debugName: "practiceButton" }] : (
      /* istanbul ignore next */
      []
    )
  );
  openingClip = viewChild(
    "openingClip",
    ...ngDevMode ? [{ debugName: "openingClip" }] : (
      /* istanbul ignore next */
      []
    )
  );
  openPractice() {
    this.openingClip()?.nativeElement.pause();
    this.practiceOpen.set(true);
    this.practiceDialog()?.nativeElement.showModal();
  }
  closePractice() {
    this.practiceOpen.set(false);
    this.practiceDialog()?.nativeElement.close();
    this.practiceButton()?.nativeElement.focus();
  }
  selectSpeech(speech) {
    this.activeSpeech.set(speech);
    this.speechFailed.set(false);
  }
  async enter() {
    if (this.entering())
      return;
    this.entering.set(true);
    this.error.set(void 0);
    try {
      const opened = await this.router.navigate(["/projects", this.project.id, "experience"]);
      if (!opened)
        this.error.set("Your project did not open. Please try Start Project again.");
    } catch {
      this.error.set("Your project could not open. Please try Start Project again.");
    } finally {
      this.entering.set(false);
    }
  }
  openingMedia() {
    const teaser = this.config?.teaser;
    const scene = teaser?.type === "decision-scene" ? teaser.prologue?.media ?? teaser.media : void 0;
    if (scene?.video)
      return scene;
    if (this.config?.model)
      return { model: this.config.model, alt: this.config.imageAlt };
    const image = this.config?.image ?? this.project.coverImage;
    return image ? { image, alt: this.config?.imageAlt ?? this.project.title } : void 0;
  }
  static \u0275fac = function ProjectIntroComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectIntroComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectIntroComponent, selectors: [["app-project-intro"]], viewQuery: function ProjectIntroComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.practiceDialog, _c06, 5)(ctx.practiceButton, _c13, 5)(ctx.openingClip, _c23, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(3);
    }
  }, decls: 81, vars: 26, consts: [["practiceButton", ""], ["openingClip", ""], ["practiceDialog", ""], ["aria-label", "Project navigation", 1, "launch-nav"], ["routerLink", "/projects", 1, "library-link"], ["aria-hidden", "true"], [1, "brand"], ["aria-hidden", "true", 1, "brand-mark"], ["aria-labelledby", "project-title", 1, "launch-hero"], [1, "hero-copy"], [1, "eyebrow"], ["aria-hidden", "true", 1, "signal-dot"], ["id", "project-title"], [1, "tagline"], [1, "story"], ["aria-label", "Project at a glance", 1, "project-tags"], [1, "start-action"], ["type", "button", 1, "primary-button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "play-icon"], ["aria-hidden", "true", 1, "button-arrow"], [1, "start-note"], ["role", "alert", 1, "launch-error"], [1, "hero-visual"], [1, "artwork"], [3, "config", "storyMode"], ["aria-hidden", "true", 1, "artwork-symbol"], [1, "world-label"], [1, "speech-preview"], ["aria-hidden", "true", 1, "role-icon"], [1, "caption-label"], ["aria-hidden", "true", 1, "caption-star"], ["aria-label", "Your first trade", 1, "practice-dialog"], [1, "adventure-details"], ["aria-labelledby", "experience-title", 1, "experience-section"], ["id", "experience-title"], [1, "experience-list"], [1, "experience-description"], ["aria-labelledby", "learning-title", 1, "learning-section"], ["id", "learning-title"], [1, "learning-list"], [1, "challenge-hook"], ["aria-label", "What you will create", 1, "creation-reward"], [1, "launch-footer"], ["type", "button", 1, "practice-button", 3, "click"], [1, "practice-note"], ["controls", "", "playsinline", "", "preload", "none", "aria-describedby", "speech-summary", 1, "opening-speech", 3, "src", "poster"], ["controls", "", "playsinline", "", "preload", "none", "aria-describedby", "speech-summary", 1, "opening-speech", 3, "error", "src", "poster"], ["kind", "captions", "srclang", "en", "label", "English", "default", "", 3, "src"], [3, "src", "alt"], ["role", "status", 1, "speech-error"], [3, "media"], ["fetchpriority", "high", 3, "src", "alt"], ["aria-hidden", "true", 1, "artwork-shade"], ["role", "group", "aria-label", "Choose an opening clip", 1, "speech-choices"], ["type", "button"], ["id", "speech-summary"], ["type", "button", 3, "click"], ["aria-label", "Your first trade", 1, "practice-dialog", 3, "cancel", "close"], ["type", "button", "autofocus", "", 1, "practice-close", 3, "click"], [3, "config"], [3, "completed", "config"], ["aria-hidden", "true", 1, "experience-number"], ["aria-hidden", "true", 1, "reward-icon"], [1, "demo-link", 3, "routerLink"]], template: function ProjectIntroComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main")(1, "nav", 3)(2, "a", 4)(3, "span", 5);
      \u0275\u0275text(4, "\u2190");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " Project library");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 6);
      \u0275\u0275text(7, "FORGE ");
      \u0275\u0275elementStart(8, "b");
      \u0275\u0275text(9, "PBL");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 7);
      \u0275\u0275text(11, "\u2726");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "section", 8)(13, "div", 9)(14, "p", 10);
      \u0275\u0275element(15, "span", 11);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "h1", 12);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "p", 13);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "p", 14);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "ul", 15)(24, "li");
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "li");
      \u0275\u0275text(27);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "div", 16)(29, "button", 17);
      \u0275\u0275listener("click", function ProjectIntroComponent_Template_button_click_29_listener() {
        return ctx.enter();
      });
      \u0275\u0275elementStart(30, "span", 18);
      \u0275\u0275text(31, "\u25B6");
      \u0275\u0275elementEnd();
      \u0275\u0275text(32);
      \u0275\u0275elementStart(33, "span", 19);
      \u0275\u0275text(34, "\u2197");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "span", 20);
      \u0275\u0275text(36, "Your next adventure starts here.");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(37, ProjectIntroComponent_Conditional_37_Template, 5, 0);
      \u0275\u0275conditionalCreate(38, ProjectIntroComponent_Conditional_38_Template, 2, 1, "p", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "figure", 22)(40, "div", 23);
      \u0275\u0275conditionalCreate(41, ProjectIntroComponent_Conditional_41_Template, 1, 2, "app-project-teaser-host", 24)(42, ProjectIntroComponent_Conditional_42_Template, 2, 1)(43, ProjectIntroComponent_Conditional_43_Template, 2, 1)(44, ProjectIntroComponent_Conditional_44_Template, 2, 1, "div", 25);
      \u0275\u0275conditionalCreate(45, ProjectIntroComponent_Conditional_45_Template, 4, 0, "span", 26);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(46, ProjectIntroComponent_Conditional_46_Template, 6, 1, "div", 27);
      \u0275\u0275elementStart(47, "figcaption")(48, "span", 28);
      \u0275\u0275text(49);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "div")(51, "span", 29);
      \u0275\u0275text(52);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "strong");
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "span", 30);
      \u0275\u0275text(56, "\u2727");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(57, ProjectIntroComponent_Conditional_57_Template, 5, 1, "dialog", 31);
      \u0275\u0275elementStart(58, "div", 32)(59, "section", 33)(60, "p", 10);
      \u0275\u0275text(61, "GET INTO IT");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "h2", 34);
      \u0275\u0275text(63, "What you\u2019ll experience");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(64, ProjectIntroComponent_Conditional_64_Template, 3, 0, "ol", 35)(65, ProjectIntroComponent_Conditional_65_Template, 2, 1, "p", 36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "section", 37)(67, "p", 10);
      \u0275\u0275text(68, "LEVEL UP AS YOU GO");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "h2", 38);
      \u0275\u0275text(70, "What you\u2019ll learn");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "ul", 39);
      \u0275\u0275repeaterCreate(72, ProjectIntroComponent_For_73_Template, 4, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(74, ProjectIntroComponent_Conditional_74_Template, 2, 1, "p", 40);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(75, ProjectIntroComponent_Conditional_75_Template, 12, 4, "aside", 41);
      \u0275\u0275elementStart(76, "footer", 42)(77, "span");
      \u0275\u0275text(78, "BIG IDEAS. REAL DISCOVERIES. MADE BY YOU.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "span", 5);
      \u0275\u0275text(80, "\u2726");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_10_0;
      let tmp_13_0;
      let tmp_15_0;
      let tmp_19_0;
      let tmp_20_0;
      let tmp_22_0;
      let tmp_23_0;
      \u0275\u0275classMap("launch-page " + ctx.project.theme);
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate1(" ", ctx.project.projectType, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.project.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.config?.headline ?? ctx.project.subtitle);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.config?.story ?? ctx.project.description);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.project.grade);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.project.subject);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.entering());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.entering() ? "Opening your project\u2026" : "Start Project", " ");
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.practice ? 37 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_10_0 = ctx.error()) ? 38 : -1, tmp_10_0);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("story-artwork", ctx.illustratedOpening)("interactive-artwork", ctx.media?.video || ctx.media?.model || ctx.speeches.length);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_13_0 = ctx.illustratedOpening) ? 41 : (tmp_13_0 = ctx.activeSpeech()) ? 42 : (tmp_13_0 = ctx.media) ? 43 : 44, tmp_13_0);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(!ctx.illustratedOpening && !ctx.media?.video && !ctx.media?.model && !ctx.speeches.length ? 45 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_15_0 = ctx.activeSpeech()) ? 46 : -1, tmp_15_0);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.project.symbol);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.config?.role ? "YOU ARE THE" : "YOUR NEXT CHALLENGE");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.config?.role ?? ctx.project.studentInvitation ?? ctx.project.subtitle);
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_19_0 = ctx.practice) ? 57 : -1, tmp_19_0);
      \u0275\u0275advance(7);
      \u0275\u0275conditional((tmp_20_0 = ctx.config) ? 64 : 65, tmp_20_0);
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.project.learningGoals);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_22_0 = ctx.config?.hook) ? 74 : -1, tmp_22_0);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_23_0 = ctx.config) ? 75 : -1, tmp_23_0);
    }
  }, dependencies: [RouterLink, OpeningMediaComponent, ProjectTeaserHostComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.launch-page[_ngcontent-%COMP%] {\n  --%NS%accent: #bcf383;\n  --%NS%glow: #335c48;\n  --%NS%surface: #162326;\n  --%NS%muted: #b1c1c4;\n  min-height: 100dvh;\n  padding: 0 max(24px, (100vw - 1320px) / 2);\n  background:\n    radial-gradient(\n      ellipse at 88% 15%,\n      color-mix(in srgb, var(--%NS%glow) 35%, transparent),\n      transparent 55%),\n    #0c171b;\n  color: #f7f7ef;\n  font-family:\n    Inter,\n    "Segoe UI",\n    system-ui,\n    sans-serif;\n}\n.frontier[_ngcontent-%COMP%] {\n  --%NS%accent: #ffce87;\n  --%NS%glow: #785737;\n  --%NS%surface: #29251f;\n}\n.museum[_ngcontent-%COMP%] {\n  --%NS%accent: #e5ce8c;\n  --%NS%glow: #68613a;\n  --%NS%surface: #252b25;\n}\n.broadcast[_ngcontent-%COMP%] {\n  --%NS%accent: #8bdeff;\n  --%NS%glow: #265c88;\n  --%NS%surface: #182b39;\n}\n.senate[_ngcontent-%COMP%] {\n  --%NS%accent: #f7b2a5;\n  --%NS%glow: #754244;\n  --%NS%surface: #302426;\n}\n.atlas[_ngcontent-%COMP%] {\n  --%NS%accent: #9cdef4;\n  --%NS%glow: #316e81;\n  --%NS%surface: #192d35;\n}\n.island-story[_ngcontent-%COMP%] {\n  --%NS%accent: #bdda94;\n  --%NS%glow: #43684e;\n  --%NS%surface: #202e26;\n}\n.robotics[_ngcontent-%COMP%] {\n  --%NS%accent: #85f0d7;\n  --%NS%glow: #257078;\n  --%NS%surface: #183039;\n}\n.observatory[_ngcontent-%COMP%] {\n  --%NS%accent: #f3d48c;\n  --%NS%glow: #5a6078;\n  --%NS%surface: #282b36;\n}\n.crisis[_ngcontent-%COMP%] {\n  --%NS%accent: #ffc18c;\n  --%NS%glow: #456177;\n  --%NS%surface: #202e37;\n}\na[_ngcontent-%COMP%] {\n  color: inherit;\n  text-decoration: none;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n}\na[_ngcontent-%COMP%]:focus-visible, \nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--%NS%accent);\n  outline-offset: 6px;\n}\n.launch-nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  min-height: 88px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.0784313725);\n}\n.library-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-height: 44px;\n  color: var(--%NS%muted);\n  font-size: 13px;\n}\n.library-link[_ngcontent-%COMP%]:hover, \n.demo-link[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%accent);\n}\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 15px;\n  font-weight: 850;\n  letter-spacing: 0.16em;\n}\n.brand[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--%NS%muted);\n}\n.brand-mark[_ngcontent-%COMP%] {\n  margin-left: 14px;\n  color: var(--%NS%accent);\n  font-size: 25px;\n}\n.launch-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1.12fr;\n  align-items: center;\n  gap: clamp(28px, 4vw, 64px);\n  padding: 52px 0 56px;\n}\n.hero-copy[_ngcontent-%COMP%], \n.hero-visual[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  margin: 0 0 17px;\n  color: var(--%NS%accent);\n  font-size: 10px;\n  font-weight: 750;\n  letter-spacing: 0.16em;\n  line-height: 1.6;\n  text-transform: uppercase;\n}\n.signal-dot[_ngcontent-%COMP%] {\n  height: 6px;\n  width: 6px;\n  background: var(--%NS%accent);\n  border-radius: 50%;\n  flex: none;\n}\nh1[_ngcontent-%COMP%] {\n  max-width: 650px;\n  margin: 0;\n  font-size: clamp(36px, 4vw, 59px);\n  font-weight: 800;\n  letter-spacing: -0.045em;\n  line-height: 1.04;\n  text-wrap: balance;\n}\n.tagline[_ngcontent-%COMP%] {\n  margin: 24px 0 12px;\n  font-size: 18px;\n  line-height: 1.45;\n  font-weight: 600;\n  color: #f0f2e8;\n  text-wrap: pretty;\n}\n.story[_ngcontent-%COMP%] {\n  color: var(--%NS%muted);\n  font-size: 14px;\n  line-height: 1.8;\n  margin: 0;\n  text-wrap: pretty;\n}\n.project-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  list-style: none;\n  padding: 0;\n  margin: 23px 0 26px;\n}\n.project-tags[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, 0.1490196078);\n  border-radius: 6px;\n  padding: 7px 10px;\n  font-size: 11px;\n  line-height: 1.4;\n  color: #d1dcda;\n}\n.start-action[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 13px 18px;\n  align-items: center;\n}\n.primary-button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 14px;\n  min-height: 58px;\n  padding: 15px 22px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  background: var(--%NS%accent);\n  color: #102018;\n  box-shadow: 0 4px 0 color-mix(in srgb, var(--%NS%accent) 48%, #152a20);\n  font-size: 16px;\n  font-weight: 800;\n  cursor: pointer;\n  transition: transform 150ms, box-shadow 150ms;\n}\n.primary-button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 0 color-mix(in srgb, var(--%NS%accent) 48%, #152a20), 0 12px 28px rgba(0, 0, 0, 0.2);\n}\n.primary-button[_ngcontent-%COMP%]:disabled {\n  cursor: wait;\n  opacity: 0.7;\n}\n.play-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.button-arrow[_ngcontent-%COMP%] {\n  margin-left: 18px;\n  font-size: 21px;\n  font-weight: 500;\n}\n.start-note[_ngcontent-%COMP%] {\n  max-width: 135px;\n  font-size: 11px;\n  line-height: 1.6;\n  color: var(--%NS%muted);\n}\n.launch-error[_ngcontent-%COMP%] {\n  margin: 20px 0 0;\n  color: #ffc1af;\n  font-size: 14px;\n  line-height: 1.6;\n}\n.hero-visual[_ngcontent-%COMP%] {\n  margin: 0;\n  border: 1px solid rgba(255, 255, 255, 0.1607843137);\n  border-radius: 18px;\n  overflow: hidden;\n  background: var(--%NS%surface);\n  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.2666666667);\n  transform: rotate(1deg);\n}\n.artwork[_ngcontent-%COMP%] {\n  height: clamp(290px, 30vw, 430px);\n  position: relative;\n  background:\n    radial-gradient(\n      ellipse at center,\n      var(--%NS%glow),\n      #16252a);\n}\n.artwork[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.artwork-shade[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(transparent 58%, rgba(7, 21, 24, 0.6));\n  pointer-events: none;\n}\n.world-label[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 22px;\n  left: 24px;\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  color: #fff;\n  text-shadow: 0 1px 8px #000;\n  font-size: 10px;\n  letter-spacing: 0.17em;\n  font-weight: 700;\n}\n.world-label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.artwork-symbol[_ngcontent-%COMP%] {\n  display: grid;\n  height: 100%;\n  place-items: center;\n  color: var(--%NS%accent);\n  font-size: 100px;\n}\n.interactive-artwork[_ngcontent-%COMP%] {\n  height: auto;\n  min-height: 300px;\n  --%NS%opening-media-height: 420px;\n  --%NS%model-height: 320px;\n}\n.hero-visual[_ngcontent-%COMP%]:has(.interactive-artwork) {\n  transform: none;\n}\n.opening-speech[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16/9;\n  object-fit: contain;\n  background: #0d1c26;\n}\n.speech-preview[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n}\n.speech-choices[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.speech-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 9px 13px;\n  border: 1px solid rgba(255, 255, 255, 0.1882352941);\n  border-radius: 6px;\n  background: transparent;\n  color: #f7f7ef;\n  font-size: 12px;\n  cursor: pointer;\n}\n.speech-choices[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: var(--%NS%accent);\n  color: #102018;\n  border-color: var(--%NS%accent);\n}\n.speech-preview[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.speech-error[_ngcontent-%COMP%] {\n  color: var(--%NS%muted);\n  font-size: 12px;\n  line-height: 1.6;\n  margin: 12px 0 0;\n}\n.speech-error[_ngcontent-%COMP%] {\n  padding: 16px;\n}\nfigcaption[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 20px 24px;\n  border-top: 1px solid rgba(255, 255, 255, 0.0941176471);\n}\n.role-icon[_ngcontent-%COMP%] {\n  display: grid;\n  flex: none;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  border: 1px solid rgba(255, 255, 255, 0.1411764706);\n  color: var(--%NS%accent);\n  font-size: 16px;\n}\n.caption-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 9px;\n  letter-spacing: 0.12em;\n  line-height: 1.6;\n  color: var(--%NS%muted);\n  font-weight: 600;\n}\nfigcaption[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 5px;\n  font-size: 14px;\n  line-height: 1.5;\n}\n.caption-star[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: var(--%NS%accent);\n  font-size: 28px;\n}\n.adventure-details[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.15fr 1fr;\n  gap: clamp(32px, 6vw, 88px);\n  padding: 36px 0 38px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1411764706);\n}\n.adventure-details[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  margin-bottom: 7px;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(23px, 2.2vw, 29px);\n  font-weight: 700;\n  letter-spacing: -0.035em;\n  line-height: 1.3;\n}\n.experience-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 22px 0 0;\n}\n.experience-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 16px;\n  padding: 15px 0;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.0705882353);\n}\n.experience-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child {\n  padding-top: 0;\n}\n.experience-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  border: 0;\n  padding-bottom: 0;\n}\n.experience-number[_ngcontent-%COMP%] {\n  display: grid;\n  flex: none;\n  place-items: center;\n  width: 32px;\n  height: 32px;\n  border: 1px solid rgba(255, 255, 255, 0.1450980392);\n  border-radius: 8px;\n  color: var(--%NS%accent);\n  font-size: 11px;\n  font-weight: 700;\n}\n.experience-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 14px;\n  line-height: 1.6;\n  color: #d1dcda;\n}\n.experience-description[_ngcontent-%COMP%] {\n  color: #d1dcda;\n  font-size: 15px;\n  line-height: 1.8;\n}\n.learning-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 9px;\n  padding: 0;\n  list-style: none;\n  margin: 24px 0 0;\n}\n.learning-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 14px;\n  border: 1px solid rgba(255, 255, 255, 0.1098039216);\n  border-radius: 8px;\n  background: var(--%NS%surface);\n  font-size: 12px;\n  line-height: 1.5;\n  font-weight: 600;\n}\n.learning-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--%NS%accent);\n  flex: none;\n}\n.challenge-hook[_ngcontent-%COMP%] {\n  margin: 24px 0 0;\n  padding-left: 17px;\n  border-left: 2px solid var(--%NS%accent);\n  color: var(--%NS%muted);\n  font-size: 14px;\n  line-height: 1.7;\n  font-style: italic;\n}\n.creation-reward[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 18px;\n  padding: 22px 26px;\n  border: 1px solid rgba(255, 255, 255, 0.1254901961);\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      115deg,\n      var(--%NS%surface),\n      rgba(255, 255, 255, 0.0117647059));\n}\n.reward-icon[_ngcontent-%COMP%] {\n  display: grid;\n  flex: none;\n  place-items: center;\n  width: 42px;\n  height: 42px;\n  color: var(--%NS%accent);\n  font-size: 33px;\n}\n.creation-reward[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 5px 0 0;\n  font-size: 14px;\n  line-height: 1.5;\n  font-weight: 600;\n}\n.demo-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex: none;\n  gap: 16px;\n  min-height: 44px;\n  margin-left: auto;\n  font-size: 12px;\n  color: #d1dcda;\n}\n.launch-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 28px 0;\n  color: var(--%NS%muted);\n  font-size: 9px;\n  letter-spacing: 0.16em;\n  line-height: 1.5;\n}\n.launch-footer[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  color: var(--%NS%accent);\n}\n@media (min-width: 1600px) {\n  .launch-hero[_ngcontent-%COMP%] {\n    padding-top: 68px;\n    padding-bottom: 68px;\n  }\n}\n@media (max-width: 900px) {\n  .launch-hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    gap: 24px;\n    padding-top: 36px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 38px;\n  }\n  .artwork[_ngcontent-%COMP%] {\n    height: 370px;\n  }\n  .adventure-details[_ngcontent-%COMP%] {\n    gap: 32px;\n  }\n}\n@media (max-width: 700px) {\n  .launch-page[_ngcontent-%COMP%] {\n    padding-inline: 22px;\n  }\n  .launch-nav[_ngcontent-%COMP%] {\n    min-height: 72px;\n  }\n  .brand[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .brand-mark[_ngcontent-%COMP%] {\n    margin-left: 4px;\n  }\n  .launch-hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 30px;\n    padding: 30px 0;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: clamp(35px, 8.5vw, 52px);\n  }\n  .tagline[_ngcontent-%COMP%] {\n    font-size: 17px;\n    margin-top: 18px;\n  }\n  .hero-visual[_ngcontent-%COMP%] {\n    transform: none;\n  }\n  .artwork[_ngcontent-%COMP%] {\n    height: 270px;\n  }\n  .interactive-artwork[_ngcontent-%COMP%] {\n    height: auto;\n    min-height: 0;\n  }\n  .start-action[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n    gap: 14px;\n  }\n  .start-note[_ngcontent-%COMP%] {\n    max-width: none;\n    text-align: center;\n  }\n  .primary-button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  figcaption[_ngcontent-%COMP%] {\n    padding: 17px;\n    gap: 12px;\n  }\n  .caption-star[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .adventure-details[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 32px;\n    padding-block: 30px;\n  }\n  .creation-reward[_ngcontent-%COMP%] {\n    padding: 18px;\n    gap: 12px;\n    flex-wrap: wrap;\n  }\n  .creation-reward[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 0;\n  }\n  .demo-link[_ngcontent-%COMP%] {\n    width: 100%;\n    margin: 4px 0 0;\n    padding-top: 10px;\n    border-top: 1px solid rgba(255, 255, 255, 0.1254901961);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .primary-button[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n.hero-visual[_ngcontent-%COMP%]:has(.story-artwork) {\n  transform: none;\n}\n.artwork.story-artwork[_ngcontent-%COMP%] {\n  height: auto;\n}\n.practice-button[_ngcontent-%COMP%], \n.practice-close[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 10px 18px;\n  border: 1px solid currentColor;\n  border-radius: 12px;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n.practice-button[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  color: #ffe0a8;\n  background: rgba(255, 255, 255, 0.0392156863);\n}\n.practice-note[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #ddd0bc;\n}\n.practice-button[_ngcontent-%COMP%]:focus-visible, \n.practice-close[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #eaaa48;\n  outline-offset: 4px;\n}\n.practice-dialog[_ngcontent-%COMP%] {\n  width: min(1100px, 100vw - 24px);\n  max-width: none;\n  max-height: calc(100dvh - 24px);\n  padding: 0;\n  border: 0;\n  border-radius: 18px;\n  background: #fcf6e9;\n  color: #473624;\n  overscroll-behavior: contain;\n}\n.practice-dialog[_ngcontent-%COMP%]::backdrop {\n  background: rgba(8, 16, 21, 0.8);\n}\n.practice-close[_ngcontent-%COMP%] {\n  display: block;\n  margin: 12px 16px 12px auto;\n  background: #fffdf7;\n}\n/*# sourceMappingURL=project-intro.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectIntroComponent, [{
    type: Component,
    args: [{ selector: "app-project-intro", imports: [RouterLink, OpeningMediaComponent, ProjectTeaserHostComponent], template: `<main [class]="'launch-page ' + project.theme">
  <nav class="launch-nav" aria-label="Project navigation">
    <a routerLink="/projects" class="library-link"
      ><span aria-hidden="true">\u2190</span> Project library</a
    >
    <span class="brand">FORGE <b>PBL</b><span class="brand-mark" aria-hidden="true">\u2726</span></span>
  </nav>

  <section class="launch-hero" aria-labelledby="project-title">
    <div class="hero-copy">
      <p class="eyebrow">
        <span class="signal-dot" aria-hidden="true"></span> {{ project.projectType }}
      </p>
      <h1 id="project-title">{{ project.title }}</h1>
      <p class="tagline">{{ config?.headline ?? project.subtitle }}</p>
      <p class="story">{{ config?.story ?? project.description }}</p>
      <ul class="project-tags" aria-label="Project at a glance">
        <li>{{ project.grade }}</li>
        <li>{{ project.subject }}</li>
      </ul>
      <div class="start-action">
        <button type="button" class="primary-button" [disabled]="entering()" (click)="enter()">
          <span class="play-icon" aria-hidden="true">\u25B6</span>
          {{ entering() ? 'Opening your project\u2026' : 'Start Project' }}
          <span class="button-arrow" aria-hidden="true">\u2197</span>
        </button>
        <span class="start-note">Your next adventure starts here.</span>
      </div>
      @if (practice) {
        <button #practiceButton class="practice-button" type="button" (click)="openPractice()">
          Try your first trade \u2192
        </button>
        <p class="practice-note">A quick practice round \xB7 30 coins \xB7 Two cargo spaces</p>
      }
      @if (error(); as message) {
        <p class="launch-error" role="alert">{{ message }}</p>
      }
    </div>

    <figure class="hero-visual">
      <div
        class="artwork"
        [class.story-artwork]="illustratedOpening"
        [class.interactive-artwork]="media?.video || media?.model || speeches.length"
      >
        @if (illustratedOpening; as opening) {
          <app-project-teaser-host [config]="opening" [storyMode]="true" />
        } @else if (activeSpeech(); as speech) {
          @if (!speechFailed()) {
            @for (clip of [speech]; track clip.id) {
              <video
                #openingClip
                class="opening-speech"
                controls
                playsinline
                preload="none"
                [src]="clip.video"
                [poster]="media?.image"
                [attr.aria-label]="clip.title"
                aria-describedby="speech-summary"
                (error)="speechFailed.set(true)"
              >
                @if (clip.captions) {
                  <track
                    kind="captions"
                    [src]="clip.captions"
                    srclang="en"
                    label="English"
                    default
                  />
                }
              </video>
            }
          } @else {
            <img [src]="media?.image" [alt]="media?.alt" />
            <p class="speech-error" role="status">
              This opening clip is unavailable. You can still explore the story and start your
              project.
            </p>
          }
        } @else if (media; as opening) {
          @if (opening.video || opening.model) {
            <app-opening-media [media]="opening" />
          } @else {
            <img [src]="opening.image" [alt]="opening.alt" fetchpriority="high" />
            <div class="artwork-shade" aria-hidden="true"></div>
          }
        } @else {
          <div class="artwork-symbol" aria-hidden="true">{{ project.symbol }}</div>
        }
        @if (!illustratedOpening && !media?.video && !media?.model && !speeches.length) {
          <span class="world-label"><span aria-hidden="true">\u2726</span> STEP INTO THE STORY</span>
        }
      </div>
      @if (activeSpeech(); as speech) {
        <div class="speech-preview">
          <div class="speech-choices" role="group" aria-label="Choose an opening clip">
            @for (clip of speeches; track clip.id) {
              <button
                type="button"
                [attr.aria-pressed]="clip.id === speech.id"
                (click)="selectSpeech(clip)"
              >
                {{ clip.speaker }}
              </button>
            }
          </div>
          <p id="speech-summary">{{ speech.summary }}</p>
        </div>
      }
      <figcaption>
        <span class="role-icon" aria-hidden="true">{{ project.symbol }}</span>
        <div>
          <span class="caption-label">{{
            config?.role ? 'YOU ARE THE' : 'YOUR NEXT CHALLENGE'
          }}</span>
          <strong>{{ config?.role ?? project.studentInvitation ?? project.subtitle }}</strong>
        </div>
        <span class="caption-star" aria-hidden="true">\u2727</span>
      </figcaption>
    </figure>
  </section>

  @if (practice; as opening) {
    <dialog
      #practiceDialog
      class="practice-dialog"
      aria-label="Your first trade"
      (cancel)="closePractice()"
      (close)="practiceOpen.set(false)"
    >
      <button class="practice-close" type="button" (click)="closePractice()" autofocus>
        Close practice \xD7
      </button>
      @if (practiceOpen()) {
        <app-project-teaser-host [config]="opening" (completed)="closePractice()" />
      }
    </dialog>
  }

  <div class="adventure-details">
    <section class="experience-section" aria-labelledby="experience-title">
      <p class="eyebrow">GET INTO IT</p>
      <h2 id="experience-title">What you\u2019ll experience</h2>
      @if (config; as intro) {
        <ol class="experience-list">
          @for (experience of intro.mission; track experience; let index = $index) {
            <li>
              <span class="experience-number" aria-hidden="true">0{{ index + 1 }}</span>
              <p>{{ experience }}</p>
            </li>
          }
        </ol>
      } @else {
        <p class="experience-description">{{ project.description }}</p>
      }
    </section>

    <section class="learning-section" aria-labelledby="learning-title">
      <p class="eyebrow">LEVEL UP AS YOU GO</p>
      <h2 id="learning-title">What you\u2019ll learn</h2>
      <ul class="learning-list">
        @for (goal of project.learningGoals; track goal) {
          <li><span aria-hidden="true">\u2726</span>{{ goal }}</li>
        }
      </ul>
      @if (config?.hook; as hook) {
        <p class="challenge-hook">{{ hook }}</p>
      }
    </section>
  </div>

  @if (config; as intro) {
    <aside class="creation-reward" aria-label="What you will create">
      <span class="reward-icon" aria-hidden="true">\u25C7</span>
      <div>
        <span class="caption-label">FINISH WITH SOMETHING THAT\u2019S YOURS</span>
        <p>{{ intro.finalExample.format }}</p>
      </div>
      <a [routerLink]="['/projects', project.id, 'final-demo']" class="demo-link"
        >See a finished project <span aria-hidden="true">\u2197</span></a
      >
    </aside>
  }
  <footer class="launch-footer">
    <span>BIG IDEAS. REAL DISCOVERIES. MADE BY YOU.</span><span aria-hidden="true">\u2726</span>
  </footer>
</main>
`, styles: ['/* src/app/features/project-intro/project-intro.component.scss */\n:host {\n  display: block;\n}\n* {\n  box-sizing: border-box;\n}\n.launch-page {\n  --accent: #bcf383;\n  --glow: #335c48;\n  --surface: #162326;\n  --muted: #b1c1c4;\n  min-height: 100dvh;\n  padding: 0 max(24px, (100vw - 1320px) / 2);\n  background:\n    radial-gradient(\n      ellipse at 88% 15%,\n      color-mix(in srgb, var(--glow) 35%, transparent),\n      transparent 55%),\n    #0c171b;\n  color: #f7f7ef;\n  font-family:\n    Inter,\n    "Segoe UI",\n    system-ui,\n    sans-serif;\n}\n.frontier {\n  --accent: #ffce87;\n  --glow: #785737;\n  --surface: #29251f;\n}\n.museum {\n  --accent: #e5ce8c;\n  --glow: #68613a;\n  --surface: #252b25;\n}\n.broadcast {\n  --accent: #8bdeff;\n  --glow: #265c88;\n  --surface: #182b39;\n}\n.senate {\n  --accent: #f7b2a5;\n  --glow: #754244;\n  --surface: #302426;\n}\n.atlas {\n  --accent: #9cdef4;\n  --glow: #316e81;\n  --surface: #192d35;\n}\n.island-story {\n  --accent: #bdda94;\n  --glow: #43684e;\n  --surface: #202e26;\n}\n.robotics {\n  --accent: #85f0d7;\n  --glow: #257078;\n  --surface: #183039;\n}\n.observatory {\n  --accent: #f3d48c;\n  --glow: #5a6078;\n  --surface: #282b36;\n}\n.crisis {\n  --accent: #ffc18c;\n  --glow: #456177;\n  --surface: #202e37;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\nbutton {\n  font: inherit;\n}\na:focus-visible,\nbutton:focus-visible {\n  outline: 3px solid var(--accent);\n  outline-offset: 6px;\n}\n.launch-nav {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  min-height: 88px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.0784313725);\n}\n.library-link {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-height: 44px;\n  color: var(--muted);\n  font-size: 13px;\n}\n.library-link:hover,\n.demo-link:hover {\n  color: var(--accent);\n}\n.brand {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 15px;\n  font-weight: 850;\n  letter-spacing: 0.16em;\n}\n.brand b {\n  font-weight: 400;\n  color: var(--muted);\n}\n.brand-mark {\n  margin-left: 14px;\n  color: var(--accent);\n  font-size: 25px;\n}\n.launch-hero {\n  display: grid;\n  grid-template-columns: 1fr 1.12fr;\n  align-items: center;\n  gap: clamp(28px, 4vw, 64px);\n  padding: 52px 0 56px;\n}\n.hero-copy,\n.hero-visual {\n  min-width: 0;\n}\n.eyebrow {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  margin: 0 0 17px;\n  color: var(--accent);\n  font-size: 10px;\n  font-weight: 750;\n  letter-spacing: 0.16em;\n  line-height: 1.6;\n  text-transform: uppercase;\n}\n.signal-dot {\n  height: 6px;\n  width: 6px;\n  background: var(--accent);\n  border-radius: 50%;\n  flex: none;\n}\nh1 {\n  max-width: 650px;\n  margin: 0;\n  font-size: clamp(36px, 4vw, 59px);\n  font-weight: 800;\n  letter-spacing: -0.045em;\n  line-height: 1.04;\n  text-wrap: balance;\n}\n.tagline {\n  margin: 24px 0 12px;\n  font-size: 18px;\n  line-height: 1.45;\n  font-weight: 600;\n  color: #f0f2e8;\n  text-wrap: pretty;\n}\n.story {\n  color: var(--muted);\n  font-size: 14px;\n  line-height: 1.8;\n  margin: 0;\n  text-wrap: pretty;\n}\n.project-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  list-style: none;\n  padding: 0;\n  margin: 23px 0 26px;\n}\n.project-tags li {\n  border: 1px solid rgba(255, 255, 255, 0.1490196078);\n  border-radius: 6px;\n  padding: 7px 10px;\n  font-size: 11px;\n  line-height: 1.4;\n  color: #d1dcda;\n}\n.start-action {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 13px 18px;\n  align-items: center;\n}\n.primary-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 14px;\n  min-height: 58px;\n  padding: 15px 22px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  background: var(--accent);\n  color: #102018;\n  box-shadow: 0 4px 0 color-mix(in srgb, var(--accent) 48%, #152a20);\n  font-size: 16px;\n  font-weight: 800;\n  cursor: pointer;\n  transition: transform 150ms, box-shadow 150ms;\n}\n.primary-button:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 0 color-mix(in srgb, var(--accent) 48%, #152a20), 0 12px 28px rgba(0, 0, 0, 0.2);\n}\n.primary-button:disabled {\n  cursor: wait;\n  opacity: 0.7;\n}\n.play-icon {\n  font-size: 12px;\n}\n.button-arrow {\n  margin-left: 18px;\n  font-size: 21px;\n  font-weight: 500;\n}\n.start-note {\n  max-width: 135px;\n  font-size: 11px;\n  line-height: 1.6;\n  color: var(--muted);\n}\n.launch-error {\n  margin: 20px 0 0;\n  color: #ffc1af;\n  font-size: 14px;\n  line-height: 1.6;\n}\n.hero-visual {\n  margin: 0;\n  border: 1px solid rgba(255, 255, 255, 0.1607843137);\n  border-radius: 18px;\n  overflow: hidden;\n  background: var(--surface);\n  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.2666666667);\n  transform: rotate(1deg);\n}\n.artwork {\n  height: clamp(290px, 30vw, 430px);\n  position: relative;\n  background:\n    radial-gradient(\n      ellipse at center,\n      var(--glow),\n      #16252a);\n}\n.artwork > img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.artwork-shade {\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(transparent 58%, rgba(7, 21, 24, 0.6));\n  pointer-events: none;\n}\n.world-label {\n  position: absolute;\n  bottom: 22px;\n  left: 24px;\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  color: #fff;\n  text-shadow: 0 1px 8px #000;\n  font-size: 10px;\n  letter-spacing: 0.17em;\n  font-weight: 700;\n}\n.world-label span {\n  font-size: 18px;\n}\n.artwork-symbol {\n  display: grid;\n  height: 100%;\n  place-items: center;\n  color: var(--accent);\n  font-size: 100px;\n}\n.interactive-artwork {\n  height: auto;\n  min-height: 300px;\n  --opening-media-height: 420px;\n  --model-height: 320px;\n}\n.hero-visual:has(.interactive-artwork) {\n  transform: none;\n}\n.opening-speech {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16/9;\n  object-fit: contain;\n  background: #0d1c26;\n}\n.speech-preview {\n  padding: 16px 20px;\n}\n.speech-choices {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.speech-choices button {\n  min-height: 44px;\n  padding: 9px 13px;\n  border: 1px solid rgba(255, 255, 255, 0.1882352941);\n  border-radius: 6px;\n  background: transparent;\n  color: #f7f7ef;\n  font-size: 12px;\n  cursor: pointer;\n}\n.speech-choices button[aria-pressed=true] {\n  background: var(--accent);\n  color: #102018;\n  border-color: var(--accent);\n}\n.speech-preview p,\n.speech-error {\n  color: var(--muted);\n  font-size: 12px;\n  line-height: 1.6;\n  margin: 12px 0 0;\n}\n.speech-error {\n  padding: 16px;\n}\nfigcaption {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 20px 24px;\n  border-top: 1px solid rgba(255, 255, 255, 0.0941176471);\n}\n.role-icon {\n  display: grid;\n  flex: none;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  border: 1px solid rgba(255, 255, 255, 0.1411764706);\n  color: var(--accent);\n  font-size: 16px;\n}\n.caption-label {\n  display: block;\n  font-size: 9px;\n  letter-spacing: 0.12em;\n  line-height: 1.6;\n  color: var(--muted);\n  font-weight: 600;\n}\nfigcaption strong {\n  display: block;\n  margin-top: 5px;\n  font-size: 14px;\n  line-height: 1.5;\n}\n.caption-star {\n  margin-left: auto;\n  color: var(--accent);\n  font-size: 28px;\n}\n.adventure-details {\n  display: grid;\n  grid-template-columns: 1.15fr 1fr;\n  gap: clamp(32px, 6vw, 88px);\n  padding: 36px 0 38px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1411764706);\n}\n.adventure-details .eyebrow {\n  margin-bottom: 7px;\n}\nh2 {\n  margin: 0;\n  font-size: clamp(23px, 2.2vw, 29px);\n  font-weight: 700;\n  letter-spacing: -0.035em;\n  line-height: 1.3;\n}\n.experience-list {\n  list-style: none;\n  padding: 0;\n  margin: 22px 0 0;\n}\n.experience-list li {\n  display: flex;\n  align-items: flex-start;\n  gap: 16px;\n  padding: 15px 0;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.0705882353);\n}\n.experience-list li:first-child {\n  padding-top: 0;\n}\n.experience-list li:last-child {\n  border: 0;\n  padding-bottom: 0;\n}\n.experience-number {\n  display: grid;\n  flex: none;\n  place-items: center;\n  width: 32px;\n  height: 32px;\n  border: 1px solid rgba(255, 255, 255, 0.1450980392);\n  border-radius: 8px;\n  color: var(--accent);\n  font-size: 11px;\n  font-weight: 700;\n}\n.experience-list p {\n  margin: 3px 0 0;\n  font-size: 14px;\n  line-height: 1.6;\n  color: #d1dcda;\n}\n.experience-description {\n  color: #d1dcda;\n  font-size: 15px;\n  line-height: 1.8;\n}\n.learning-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 9px;\n  padding: 0;\n  list-style: none;\n  margin: 24px 0 0;\n}\n.learning-list li {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 14px;\n  border: 1px solid rgba(255, 255, 255, 0.1098039216);\n  border-radius: 8px;\n  background: var(--surface);\n  font-size: 12px;\n  line-height: 1.5;\n  font-weight: 600;\n}\n.learning-list span {\n  color: var(--accent);\n  flex: none;\n}\n.challenge-hook {\n  margin: 24px 0 0;\n  padding-left: 17px;\n  border-left: 2px solid var(--accent);\n  color: var(--muted);\n  font-size: 14px;\n  line-height: 1.7;\n  font-style: italic;\n}\n.creation-reward {\n  display: flex;\n  align-items: center;\n  gap: 18px;\n  padding: 22px 26px;\n  border: 1px solid rgba(255, 255, 255, 0.1254901961);\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      115deg,\n      var(--surface),\n      rgba(255, 255, 255, 0.0117647059));\n}\n.reward-icon {\n  display: grid;\n  flex: none;\n  place-items: center;\n  width: 42px;\n  height: 42px;\n  color: var(--accent);\n  font-size: 33px;\n}\n.creation-reward p {\n  margin: 5px 0 0;\n  font-size: 14px;\n  line-height: 1.5;\n  font-weight: 600;\n}\n.demo-link {\n  display: flex;\n  align-items: center;\n  flex: none;\n  gap: 16px;\n  min-height: 44px;\n  margin-left: auto;\n  font-size: 12px;\n  color: #d1dcda;\n}\n.launch-footer {\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 28px 0;\n  color: var(--muted);\n  font-size: 9px;\n  letter-spacing: 0.16em;\n  line-height: 1.5;\n}\n.launch-footer > span:last-child {\n  color: var(--accent);\n}\n@media (min-width: 1600px) {\n  .launch-hero {\n    padding-top: 68px;\n    padding-bottom: 68px;\n  }\n}\n@media (max-width: 900px) {\n  .launch-hero {\n    grid-template-columns: 1fr 1fr;\n    gap: 24px;\n    padding-top: 36px;\n  }\n  h1 {\n    font-size: 38px;\n  }\n  .artwork {\n    height: 370px;\n  }\n  .adventure-details {\n    gap: 32px;\n  }\n}\n@media (max-width: 700px) {\n  .launch-page {\n    padding-inline: 22px;\n  }\n  .launch-nav {\n    min-height: 72px;\n  }\n  .brand {\n    font-size: 12px;\n  }\n  .brand-mark {\n    margin-left: 4px;\n  }\n  .launch-hero {\n    grid-template-columns: 1fr;\n    gap: 30px;\n    padding: 30px 0;\n  }\n  h1 {\n    font-size: clamp(35px, 8.5vw, 52px);\n  }\n  .tagline {\n    font-size: 17px;\n    margin-top: 18px;\n  }\n  .hero-visual {\n    transform: none;\n  }\n  .artwork {\n    height: 270px;\n  }\n  .interactive-artwork {\n    height: auto;\n    min-height: 0;\n  }\n  .start-action {\n    align-items: stretch;\n    flex-direction: column;\n    gap: 14px;\n  }\n  .start-note {\n    max-width: none;\n    text-align: center;\n  }\n  .primary-button {\n    width: 100%;\n  }\n  figcaption {\n    padding: 17px;\n    gap: 12px;\n  }\n  .caption-star {\n    display: none;\n  }\n  .adventure-details {\n    grid-template-columns: 1fr;\n    gap: 32px;\n    padding-block: 30px;\n  }\n  .creation-reward {\n    padding: 18px;\n    gap: 12px;\n    flex-wrap: wrap;\n  }\n  .creation-reward > div {\n    flex: 1;\n    min-width: 0;\n  }\n  .demo-link {\n    width: 100%;\n    margin: 4px 0 0;\n    padding-top: 10px;\n    border-top: 1px solid rgba(255, 255, 255, 0.1254901961);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .primary-button {\n    transition: none;\n  }\n}\n.hero-visual:has(.story-artwork) {\n  transform: none;\n}\n.artwork.story-artwork {\n  height: auto;\n}\n.practice-button,\n.practice-close {\n  min-height: 44px;\n  padding: 10px 18px;\n  border: 1px solid currentColor;\n  border-radius: 12px;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n.practice-button {\n  margin-top: 18px;\n  color: #ffe0a8;\n  background: rgba(255, 255, 255, 0.0392156863);\n}\n.practice-note {\n  font-size: 13px;\n  color: #ddd0bc;\n}\n.practice-button:focus-visible,\n.practice-close:focus-visible {\n  outline: 3px solid #eaaa48;\n  outline-offset: 4px;\n}\n.practice-dialog {\n  width: min(1100px, 100vw - 24px);\n  max-width: none;\n  max-height: calc(100dvh - 24px);\n  padding: 0;\n  border: 0;\n  border-radius: 18px;\n  background: #fcf6e9;\n  color: #473624;\n  overscroll-behavior: contain;\n}\n.practice-dialog::backdrop {\n  background: rgba(8, 16, 21, 0.8);\n}\n.practice-close {\n  display: block;\n  margin: 12px 16px 12px auto;\n  background: #fffdf7;\n}\n/*# sourceMappingURL=project-intro.component.css.map */\n'] }]
  }], null, { practiceDialog: [{ type: ViewChild, args: ["practiceDialog", { isSignal: true }] }], practiceButton: [{ type: ViewChild, args: ["practiceButton", { isSignal: true }] }], openingClip: [{ type: ViewChild, args: ["openingClip", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectIntroComponent, { className: "ProjectIntroComponent", filePath: "src/app/features/project-intro/project-intro.component.ts", lineNumber: 16 });
})();
export {
  ProjectIntroComponent
};
//# debugId=08abbbe1-86f3-597e-8bf6-31d7749844c1
//# sourceMappingURL=chunk-V262EZAF.js.map
