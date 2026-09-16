import {
  PROJECT_INTRO_CONFIG
} from "./chunk-3RS2K2YP.js";
import "./chunk-5A6GBRKO.js";
import "./chunk-ZTDR7NN6.js";
import "./chunk-MNKXLJET.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import {
  NgComponentOutlet
} from "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EnvironmentInjector,
  Injector,
  Input,
  ViewChild,
  ViewChildren,
  afterNextRender,
  computed,
  createEnvironmentInjector,
  inject,
  input,
  setClassMetadata,
  signal,
  viewChild,
  viewChildren,
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
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/shared/media/presentation-examples.component.ts
var _c0 = ["player"];
var _forTrack0 = ($index, $item) => $item.id;
function PresentationExamplesComponent_For_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "track", 6);
  }
  if (rf & 2) {
    const clip_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275domProperty("src", clip_r3.captions);
  }
}
function PresentationExamplesComponent_For_10_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 9);
    \u0275\u0275text(1, " This clip could not play here. Open the video directly to try again. ");
    \u0275\u0275domElementEnd();
  }
}
function PresentationExamplesComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article")(1, "video", 5, 0);
    \u0275\u0275domListener("play", function PresentationExamplesComponent_For_10_Template_video_play_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pauseOthers($event));
    })("error", function PresentationExamplesComponent_For_10_Template_video_error_1_listener() {
      const clip_r3 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.failed.update(ctx_r1.addFailure(clip_r3.id)));
    });
    \u0275\u0275conditionalCreate(3, PresentationExamplesComponent_For_10_Conditional_3_Template, 1, 1, "track", 6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "div", 7)(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "p", 8);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(9, PresentationExamplesComponent_For_10_Conditional_9_Template, 2, 0, "p", 9);
    \u0275\u0275domElementStart(10, "a", 10);
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const clip_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275domProperty("src", clip_r3.src, \u0275\u0275sanitizeUrl);
    \u0275\u0275attribute("aria-label", clip_r3.title)("aria-describedby", clip_r3.id + "-description");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(clip_r3.captions ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(clip_r3.title);
    \u0275\u0275advance();
    \u0275\u0275domProperty("id", clip_r3.id + "-description");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(clip_r3.description);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.failed().includes(clip_r3.id) ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275domProperty("href", clip_r3.src, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Open ", clip_r3.title, " \u2197");
  }
}
var PresentationExamplesComponent = class _PresentationExamplesComponent {
  videos = input.required(
    ...ngDevMode ? [{ debugName: "videos" }] : (
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
  addFailure(id) {
    return (ids) => ids.includes(id) ? ids : [...ids, id];
  }
  pauseOthers(event) {
    for (const player of this.players()) {
      if (player.nativeElement !== event.target && !player.nativeElement.paused)
        player.nativeElement.pause();
    }
  }
  static \u0275fac = function PresentationExamplesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PresentationExamplesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PresentationExamplesComponent, selectors: [["app-presentation-examples"]], viewQuery: function PresentationExamplesComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.players, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { videos: [1, "videos"] }, decls: 11, vars: 0, consts: [["player", ""], ["aria-labelledby", "presentation-examples-title"], [1, "eyebrow"], ["id", "presentation-examples-title"], [1, "example-grid"], ["controls", "", "playsinline", "", "preload", "metadata", 3, "play", "error", "src"], ["kind", "captions", "srclang", "en", "label", "English", "default", "", 3, "src"], [1, "example-copy"], [3, "id"], ["role", "status"], ["target", "_blank", "rel", "noopener", 3, "href"]], template: function PresentationExamplesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 1)(1, "header")(2, "p", 2);
      \u0275\u0275text(3, "Watch the possibilities");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "h2", 3);
      \u0275\u0275text(5, "Final presentation examples");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "p");
      \u0275\u0275text(7, "Short format demonstrations. Choose a clip to see how a finished report can look.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "div", 4);
      \u0275\u0275repeaterCreate(9, PresentationExamplesComponent_For_10_Template, 12, 10, "article", null, _forTrack0);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.videos());
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  max-width: 1500px;\n  margin: auto;\n  padding: 0 4% 32px;\n}\nheader[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 4px 0 10px;\n  font-size: clamp(24px, 3vw, 32px);\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.6;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-weight: 800;\n}\n.example-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 20px;\n}\narticle[_ngcontent-%COMP%] {\n  min-width: 0;\n  overflow: hidden;\n  border: 1px solid #c9d4ce;\n  border-radius: 14px;\n  background: #fff;\n}\nvideo[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16/9;\n  background: #09121a;\n  object-fit: contain;\n}\n.example-copy[_ngcontent-%COMP%] {\n  padding: 18px;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n}\n.example-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0 16px;\n  font-size: 14px;\n}\na[_ngcontent-%COMP%] {\n  display: inline-block;\n  min-height: 44px;\n  color: #174d67;\n  font-weight: 700;\n  line-height: 1.5;\n}\na[_ngcontent-%COMP%]:focus-visible, \nvideo[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #237caa;\n  outline-offset: 3px;\n}\n@media (max-width: 650px) {\n  .example-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=presentation-examples.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PresentationExamplesComponent, [{
    type: Component,
    args: [{ selector: "app-presentation-examples", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <section aria-labelledby="presentation-examples-title">
      <header>
        <p class="eyebrow">Watch the possibilities</p>
        <h2 id="presentation-examples-title">Final presentation examples</h2>
        <p>Short format demonstrations. Choose a clip to see how a finished report can look.</p>
      </header>
      <div class="example-grid">
        @for (clip of videos(); track clip.id) {
          <article>
            <video
              #player
              [src]="clip.src"
              controls
              playsinline
              preload="metadata"
              [attr.aria-label]="clip.title"
              [attr.aria-describedby]="clip.id + '-description'"
              (play)="pauseOthers($event)"
              (error)="failed.update(addFailure(clip.id))"
            >
              @if (clip.captions) {
                <track kind="captions" [src]="clip.captions" srclang="en" label="English" default />
              }
            </video>
            <div class="example-copy">
              <h3>{{ clip.title }}</h3>
              <p [id]="clip.id + '-description'">{{ clip.description }}</p>
              @if (failed().includes(clip.id)) {
                <p role="status">
                  This clip could not play here. Open the video directly to try again.
                </p>
              }
              <a [href]="clip.src" target="_blank" rel="noopener">Open {{ clip.title }} \u2197</a>
            </div>
          </article>
        }
      </div>
    </section>
  `, styles: ["/* angular:styles/component:scss;4cbbf574f5190f9185e98df3e16921396092e37f89e6a45b671be505c6e30197;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/shared/media/presentation-examples.component.ts */\n:host {\n  display: block;\n  max-width: 1500px;\n  margin: auto;\n  padding: 0 4% 32px;\n}\nheader {\n  margin-bottom: 20px;\n}\nh2 {\n  margin: 4px 0 10px;\n  font-size: clamp(24px, 3vw, 32px);\n}\np {\n  line-height: 1.6;\n}\n.eyebrow {\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-weight: 800;\n}\n.example-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 20px;\n}\narticle {\n  min-width: 0;\n  overflow: hidden;\n  border: 1px solid #c9d4ce;\n  border-radius: 14px;\n  background: #fff;\n}\nvideo {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16/9;\n  background: #09121a;\n  object-fit: contain;\n}\n.example-copy {\n  padding: 18px;\n}\nh3 {\n  margin: 0;\n  font-size: 18px;\n}\n.example-copy p {\n  margin: 8px 0 16px;\n  font-size: 14px;\n}\na {\n  display: inline-block;\n  min-height: 44px;\n  color: #174d67;\n  font-weight: 700;\n  line-height: 1.5;\n}\na:focus-visible,\nvideo:focus-visible {\n  outline: 3px solid #237caa;\n  outline-offset: 3px;\n}\n@media (max-width: 650px) {\n  .example-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=presentation-examples.component.css.map */\n"] }]
  }], null, { videos: [{ type: Input, args: [{ isSignal: true, alias: "videos", required: true }] }], players: [{ type: ViewChildren, args: ["player", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PresentationExamplesComponent, { className: "PresentationExamplesComponent", filePath: "src/app/shared/media/presentation-examples.component.ts", lineNumber: 126 });
})();

// src/app/runtime/project-showcase/completed-sample.registry.ts
var loaders = {
  "calendar-monument": () => import("./chunk-HI7ZWSGM.js").then((m) => m.loadSample()),
  "robot-delivery-code-lab": () => import("./chunk-3LAKJPF6.js").then((m) => m.loadSample()),
  "mystery-substance": () => import("./chunk-L7MUT33O.js").then((m) => m.loadSample()),
  "frontier-trading-company": () => import("./chunk-4AYK3BF2.js").then((m) => m.loadSample()),
  "objects-that-changed-us": () => import("./chunk-ACIMCKJJ.js").then((m) => m.loadSample()),
  "history-live-revolutionary-war": () => import("./chunk-SIUMUR25.js").then((m) => m.loadSample()),
  "the-fate-of-the-republic": () => import("./chunk-FBDD2UKQ.js").then((m) => m.loadSample()),
  "race-around-the-world": () => import("./chunk-VNP67KEY.js").then((m) => m.loadSample()),
  "survival-island-story-lab": () => import("./chunk-OZ7ELGRX.js").then((m) => m.loadSample())
};
var completedSampleProjectIds = Object.keys(loaders);
async function loadCompletedSample(projectId) {
  const load = loaders[projectId];
  if (!load) throw new Error("A completed sample is not installed for this project.");
  return load();
}

// src/app/features/project-intro/project-final-example.component.ts
var _c02 = ["reviewDialog"];
var _c1 = ["sampleHeading"];
var _c2 = ["reviewHeading"];
var _c3 = (a0) => ["/projects", a0];
var _forTrack02 = ($index, $item) => $item.label;
function ProjectFinalExampleComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 4)(1, "a", 7);
    \u0275\u0275text(2, "\u2190 Project launch");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 8);
    \u0275\u0275text(4, "FORGE ");
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "PBL");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8, "COMPLETED SAMPLE");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c3, ctx_r0.config.projectId));
  }
}
function ProjectFinalExampleComponent_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 9)(1, "div", 19)(2, "p", 12);
    \u0275\u0275text(3, "Completed example ");
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Fictional student work");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h1", 13, 2);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "details", 20)(11, "summary");
    \u0275\u0275text(12, "About this example");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 21)(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21, "Read only");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(22, "div", 22)(23, "button", 23);
    \u0275\u0275listener("click", function ProjectFinalExampleComponent_Conditional_2_Conditional_0_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleReview());
    });
    \u0275\u0275text(24);
    \u0275\u0275elementStart(25, "span", 24);
    \u0275\u0275text(26, "\u2197");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "button", 25);
    \u0275\u0275listener("click", function ProjectFinalExampleComponent_Conditional_2_Conditional_0_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.restart());
    });
    \u0275\u0275text(28, "\u21BA Restart sample");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const current_r4 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(current_r4.title);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(current_r4.subtitle);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(current_r4.audience);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(current_r4.duration);
    \u0275\u0275advance(4);
    \u0275\u0275attribute("aria-expanded", ctx_r0.reviewOpen());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.reviewOpen() ? "Close teacher guide" : "See the learning behind it", " ");
  }
}
function ProjectFinalExampleComponent_Conditional_2_For_16_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27)(1, "strong");
    \u0275\u0275text(2, "In the record");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", step_r5.evidence);
  }
}
function ProjectFinalExampleComponent_Conditional_2_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "p", 12);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, ProjectFinalExampleComponent_Conditional_2_For_16_Conditional_10_Template, 4, 1, "p", 27);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r5 = ctx.$implicit;
    const \u0275$index_84_r6 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("0", \u0275$index_84_r6 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r5.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r5.text);
    \u0275\u0275advance();
    \u0275\u0275conditional(step_r5.evidence ? 10 : -1);
  }
}
function ProjectFinalExampleComponent_Conditional_2_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-presentation-examples", 16);
  }
  if (rf & 2) {
    const current_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("videos", current_r4.videos);
  }
}
function ProjectFinalExampleComponent_Conditional_2_ng_container_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ProjectFinalExampleComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, ProjectFinalExampleComponent_Conditional_2_Conditional_0_Template, 29, 6, "header", 9);
    \u0275\u0275elementStart(1, "dialog", 10, 0);
    \u0275\u0275listener("close", function ProjectFinalExampleComponent_Conditional_2_Template_dialog_close_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.reviewOpen.set(false));
    });
    \u0275\u0275elementStart(3, "form", 11)(4, "button");
    \u0275\u0275text(5, "Close teacher guide");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "header")(7, "p", 12);
    \u0275\u0275text(8, "From first idea to finished work");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h2", 13, 1);
    \u0275\u0275text(11, "The thinking behind the presentation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13, "Follow the decisions and revisions that shaped the completed work.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 14);
    \u0275\u0275repeaterCreate(15, ProjectFinalExampleComponent_Conditional_2_For_16_Template, 11, 5, "article", null, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "aside", 15)(18, "div")(19, "p", 12);
    \u0275\u0275text(20, "Builder guidance example");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "h3");
    \u0275\u0275text(22, "What a teacher could notice");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div")(26, "strong");
    \u0275\u0275text(27, "A useful feedback question");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "strong");
    \u0275\u0275text(31, "Visible revision");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div")(35, "strong");
    \u0275\u0275text(36, "Assessment lens");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p");
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "small");
    \u0275\u0275text(40, "These notes illustrate teacher review. They are not a live grade or an AI assessment.");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(41, ProjectFinalExampleComponent_Conditional_2_Conditional_41_Template, 1, 1, "app-presentation-examples", 16);
    \u0275\u0275elementStart(42, "section", 17);
    \u0275\u0275template(43, ProjectFinalExampleComponent_Conditional_2_ng_container_43_Template, 1, 0, "ng-container", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const current_r4 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!current_r4.integratedHeader ? 0 : -1);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(current_r4.trail);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(current_r4.review.strength);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(current_r4.review.question);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(current_r4.review.revision);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(current_r4.review.assessment);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(current_r4.videos?.length ? 41 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngComponentOutlet", current_r4.component)("ngComponentOutletInputs", ctx_r0.sampleInputs())("ngComponentOutletEnvironmentInjector", ctx_r0.previewInjector());
  }
}
function ProjectFinalExampleComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 5)(1, "h1");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 25);
    \u0275\u0275listener("click", function ProjectFinalExampleComponent_Conditional_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.restart());
    });
    \u0275\u0275text(4, "Retry sample");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function ProjectFinalExampleComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Opening the completed project\u2026");
    \u0275\u0275elementEnd();
  }
}
var ProjectFinalExampleComponent = class _ProjectFinalExampleComponent {
  config = inject(PROJECT_INTRO_CONFIG);
  sample = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "sample" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previewInjector = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "previewInjector" }] : (
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
  reviewOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "reviewOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sampleInputs = computed(
    () => __spreadValues(__spreadValues({}, this.sample()?.inputs), this.sample()?.integratedHeader ? { hostGuide: () => this.toggleReview() } : {}),
    ...ngDevMode ? [{ debugName: "sampleInputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reviewDialog = viewChild(
    "reviewDialog",
    ...ngDevMode ? [{ debugName: "reviewDialog" }] : (
      /* istanbul ignore next */
      []
    )
  );
  parent = inject(EnvironmentInjector);
  injector = inject(Injector);
  heading = viewChild(
    "sampleHeading",
    ...ngDevMode ? [{ debugName: "heading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reviewHeading = viewChild(
    "reviewHeading",
    ...ngDevMode ? [{ debugName: "reviewHeading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  generation = 0;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.generation++;
      this.previewInjector()?.destroy();
    });
    void this.restart(false);
  }
  async restart(focus = true) {
    const generation = ++this.generation;
    this.sample.set(void 0);
    this.error.set("");
    this.reviewOpen.set(false);
    this.previewInjector()?.destroy();
    this.previewInjector.set(void 0);
    try {
      const sample = await loadCompletedSample(this.config.projectId);
      if (generation !== this.generation)
        return;
      this.previewInjector.set(createEnvironmentInjector(sample.providers, this.parent));
      this.sample.set(sample);
      if (focus)
        this.focusAfterRender(false);
    } catch {
      if (generation === this.generation)
        this.error.set("This sample could not load. Please try again.");
    }
  }
  toggleReview() {
    this.reviewDialog()?.nativeElement.showModal();
    this.reviewOpen.set(true);
  }
  focusAfterRender(review) {
    afterNextRender(() => {
      const element = (review ? this.reviewHeading() : this.heading())?.nativeElement;
      element?.scrollIntoView({ block: "nearest" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  static \u0275fac = function ProjectFinalExampleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectFinalExampleComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectFinalExampleComponent, selectors: [["app-project-final-example"]], viewQuery: function ProjectFinalExampleComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.reviewDialog, _c02, 5)(ctx.heading, _c1, 5)(ctx.reviewHeading, _c2, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(3);
    }
  }, decls: 5, vars: 4, consts: [["reviewDialog", ""], ["reviewHeading", ""], ["sampleHeading", ""], [1, "example-page"], ["aria-label", "Showcase navigation", 1, "showcase-nav"], ["role", "alert", 1, "load-state"], ["role", "status", 1, "load-state"], [3, "routerLink"], ["routerLink", "/projects", 1, "wordmark"], [1, "showcase-header"], ["id", "teacher-review", "aria-label", "Teacher and builder guide", 1, "teacher-review", 3, "close"], ["method", "dialog", 1, "guide-close"], [1, "eyebrow"], ["tabindex", "-1"], [1, "thinking-trail"], [1, "review-notes"], [3, "videos"], ["aria-label", "Completed project presentation", 1, "native-presentation"], [4, "ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletEnvironmentInjector"], [1, "heading-copy"], [1, "sample-context"], [1, "sample-meta"], [1, "showcase-actions"], ["type", "button", "aria-controls", "teacher-review", 1, "primary", 3, "click"], ["aria-hidden", "true"], ["type", "button", 3, "click"], [1, "step-number"], [1, "record-link"]], template: function ProjectFinalExampleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 3);
      \u0275\u0275conditionalCreate(1, ProjectFinalExampleComponent_Conditional_1_Template, 9, 3, "nav", 4);
      \u0275\u0275conditionalCreate(2, ProjectFinalExampleComponent_Conditional_2_Template, 44, 9)(3, ProjectFinalExampleComponent_Conditional_3_Template, 5, 1, "section", 5)(4, ProjectFinalExampleComponent_Conditional_4_Template, 2, 0, "p", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275classProp("integrated-example", ctx.sample()?.integratedHeader);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.sample()?.integratedHeader ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_2_0 = ctx.sample()) ? 2 : ctx.error() ? 3 : 4, tmp_2_0);
    }
  }, dependencies: [RouterLink, NgComponentOutlet, PresentationExamplesComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  background: #f1f2ed;\n  color: #192f31;\n  min-height: 100vh;\n  font-family:\n    Inter,\n    Arial,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%] {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  cursor: pointer;\n}\n.showcase-nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 4%;\n  border-bottom: 1px solid #ced7d0;\n  background: #fff;\n  gap: 16px;\n}\n.showcase-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: inherit;\n  text-decoration: none;\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n.showcase-nav[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  letter-spacing: 0.15em;\n  font-weight: 800;\n}\n.wordmark[_ngcontent-%COMP%] {\n  letter-spacing: 0.12em !important;\n  font-size: 1.05rem !important;\n}\n.wordmark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #9a651e;\n}\n.showcase-header[_ngcontent-%COMP%] {\n  max-width: 1500px;\n  margin: auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 36px;\n  padding: 36px 4% 30px;\n}\n.heading-copy[_ngcontent-%COMP%] {\n  max-width: 850px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  font-size: 0.65rem;\n  font-weight: 800;\n  letter-spacing: 0.14em;\n  margin: 0 0 10px;\n  color: #526960;\n}\n.eyebrow[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 0 8px;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: clamp(1.9rem, 3.1vw, 3rem);\n  font-family: Georgia, serif;\n  font-weight: 500;\n  letter-spacing: -0.035em;\n  margin: 0 0 10px;\n  line-height: 1.1;\n}\n.heading-copy[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(.eyebrow) {\n  font-size: 0.95rem;\n  line-height: 1.65;\n  margin: 0;\n  color: #51605b;\n}\n.sample-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n  margin-top: 14px;\n}\n.sample-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  border: 1px solid #cbd5cc;\n  border-radius: 20px;\n  padding: 5px 10px;\n  font-size: 0.67rem;\n  color: #3d574b;\n}\n.showcase-actions[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.showcase-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.load-state[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #bccbc2;\n  border-radius: 7px;\n  padding: 12px 15px;\n  background: #fff;\n  color: #254c40;\n  font-weight: 700;\n  font-size: 0.78rem;\n}\n.showcase-actions[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%] {\n  background: #234d41;\n  color: #fff;\n  border-color: #234d41;\n}\n.showcase-actions[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding-left: 12px;\n}\n.native-presentation[_ngcontent-%COMP%] {\n  max-width: 1540px;\n  margin: auto;\n  padding: 0 24px 24px;\n  min-width: 0;\n}\n.teacher-review[_ngcontent-%COMP%] {\n  max-width: 1430px;\n  margin: 0 auto 28px;\n  background: #fff;\n  border: 1px solid #c9d3cb;\n  border-radius: 10px;\n  padding: 28px;\n}\n.teacher-review[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  color: #596d64;\n  font-size: 0.9rem;\n}\n.teacher-review[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: 1.7rem;\n  font-weight: 500;\n  margin: 0;\n}\n.thinking-trail[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 20px 30px;\n  margin: 28px 0;\n}\n.thinking-trail[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  padding-top: 16px;\n  border-top: 1px solid #dce1db;\n  min-width: 0;\n}\n.step-number[_ngcontent-%COMP%] {\n  color: #a77532;\n  font: 1.4rem Georgia, serif;\n}\n.thinking-trail[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n}\n.thinking-trail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:not(.eyebrow) {\n  font-size: 0.86rem;\n  line-height: 1.6;\n  margin: 7px 0;\n}\n.record-link[_ngcontent-%COMP%] {\n  border-left: 3px solid #cfb987;\n  padding-left: 10px;\n  color: #617268;\n}\n.record-link[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.review-notes[_ngcontent-%COMP%] {\n  background: #eef3ed;\n  border-radius: 6px;\n  padding: 22px;\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 24px;\n}\n.review-notes[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.review-notes[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  line-height: 1.6;\n}\n.review-notes[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.review-notes[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.7rem;\n  line-height: 1.6;\n  color: #62706b;\n}\n.showcase-exit[_ngcontent-%COMP%] {\n  max-width: 1430px;\n  margin: 0 auto;\n  padding: 30px 4%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n  border-top: 1px solid #c9d3cb;\n}\n.showcase-exit[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.77rem;\n  line-height: 1.6;\n  max-width: 670px;\n  color: #596d64;\n}\n.showcase-exit[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: #234d41;\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n.load-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 24px;\n}\na[_ngcontent-%COMP%]:focus-visible, \nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #ae7529;\n  outline-offset: 4px;\n}\n[tabindex="-1"][_ngcontent-%COMP%]:focus {\n  outline: 2px solid #ae7529;\n  outline-offset: 5px;\n}\n@media (max-width: 760px) {\n  .showcase-header[_ngcontent-%COMP%] {\n    display: block;\n    padding: 25px 20px;\n  }\n  .showcase-actions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    margin-top: 20px;\n  }\n  .showcase-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 11px 8px;\n    font-size: 0.7rem;\n  }\n  .native-presentation[_ngcontent-%COMP%] {\n    padding: 0 8px 20px;\n  }\n  .showcase-nav[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .showcase-nav[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .teacher-review[_ngcontent-%COMP%] {\n    margin: 0 8px 20px;\n    padding: 20px;\n  }\n  .thinking-trail[_ngcontent-%COMP%], \n   .review-notes[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .showcase-exit[_ngcontent-%COMP%] {\n    display: block;\n    padding: 24px;\n  }\n  .eyebrow[_ngcontent-%COMP%] {\n    line-height: 1.6;\n  }\n  .review-notes[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n}\n@media print {\n  .showcase-nav[_ngcontent-%COMP%], \n   .showcase-actions[_ngcontent-%COMP%], \n   .showcase-exit[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .showcase-header[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .native-presentation[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .teacher-review[_ngcontent-%COMP%] {\n    break-before: page;\n  }\n}\n.showcase-header[_ngcontent-%COMP%] {\n  padding: 12px 0;\n  gap: 16px;\n}\n.showcase-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(24px, 2.2vw, 36px);\n  margin: 6px 0;\n}\n.showcase-header[_ngcontent-%COMP%]   .heading-copy[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(.eyebrow), \n.sample-meta[_ngcontent-%COMP%] {\n  margin: 6px 0;\n}\ndialog.teacher-review[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  margin: auto;\n  width: min(980px, 100% - 32px);\n  max-height: calc(100dvh - 32px);\n  box-sizing: border-box;\n  overflow: auto;\n  border: 1px solid #647b73;\n  border-radius: 12px;\n  padding: 24px;\n  background: #f8f5ec;\n}\ndialog.teacher-review[_ngcontent-%COMP%]:not([open]) {\n  display: none;\n}\ndialog[_ngcontent-%COMP%]::backdrop {\n  background: rgba(21, 37, 37, 0.6666666667);\n}\n.guide-close[_ngcontent-%COMP%] {\n  position: sticky;\n  top: -24px;\n  z-index: 2;\n  padding: 12px;\n  background: #f8f5ec;\n  text-align: right;\n}\n.guide-close[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n}\n.native-presentation[_ngcontent-%COMP%] {\n  --%NS%presentation-available-height: calc(100dvh - 220px);\n}\n.showcase-nav[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n.showcase-header[_ngcontent-%COMP%] {\n  min-height: 0;\n}\n.showcase-header[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  margin: 0;\n}\n@media (max-width: 700px) {\n  .native-presentation[_ngcontent-%COMP%] {\n    --%NS%presentation-available-height: calc(100dvh - 120px);\n  }\n}\n.sample-context[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-size: 14px;\n}\n.native-presentation[_ngcontent-%COMP%] {\n  --%NS%presentation-available-height: calc(100dvh - 165px);\n}\n.example-page.integrated-example[_ngcontent-%COMP%] {\n  padding: 0 8px 8px;\n  max-width: 1800px;\n}\n.integrated-example[_ngcontent-%COMP%]   .native-presentation[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n}\n/*# sourceMappingURL=project-final-example.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectFinalExampleComponent, [{
    type: Component,
    args: [{ selector: "app-project-final-example", imports: [RouterLink, NgComponentOutlet, PresentationExamplesComponent], template: `<main class="example-page" [class.integrated-example]="sample()?.integratedHeader">
  @if (!sample()?.integratedHeader) {
    <nav class="showcase-nav" aria-label="Showcase navigation">
      <a [routerLink]="['/projects', config.projectId]">\u2190 Project launch</a>
      <a class="wordmark" routerLink="/projects">FORGE <span>PBL</span></a>
      <span>COMPLETED SAMPLE</span>
    </nav>
  }
  @if (sample(); as current) {
    @if (!current.integratedHeader) {
      <header class="showcase-header">
        <div class="heading-copy">
          <p class="eyebrow">Completed example <span>\u2022</span> Fictional student work</p>
          <h1 #sampleHeading tabindex="-1">{{ current.title }}</h1>
          <details class="sample-context">
            <summary>About this example</summary>
            <p>{{ current.subtitle }}</p>
            <div class="sample-meta">
              <span>{{ current.audience }}</span
              ><span>{{ current.duration }}</span
              ><span>Read only</span>
            </div>
          </details>
        </div>
        <div class="showcase-actions">
          <button
            type="button"
            class="primary"
            [attr.aria-expanded]="reviewOpen()"
            aria-controls="teacher-review"
            (click)="toggleReview()"
          >
            {{ reviewOpen() ? 'Close teacher guide' : 'See the learning behind it' }}
            <span aria-hidden="true">\u2197</span>
          </button>
          <button type="button" (click)="restart()">\u21BA Restart sample</button>
        </div>
      </header>
    }
    <dialog
      #reviewDialog
      class="teacher-review"
      id="teacher-review"
      aria-label="Teacher and builder guide"
      (close)="reviewOpen.set(false)"
    >
      <form method="dialog" class="guide-close"><button>Close teacher guide</button></form>
      <header>
        <p class="eyebrow">From first idea to finished work</p>
        <h2 #reviewHeading tabindex="-1">The thinking behind the presentation</h2>
        <p>Follow the decisions and revisions that shaped the completed work.</p>
      </header>
      <div class="thinking-trail">
        @for (step of current.trail; track step.label; let i = $index) {
          <article>
            <span class="step-number">0{{ i + 1 }}</span>
            <div>
              <p class="eyebrow">{{ step.label }}</p>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
              @if (step.evidence) {
                <p class="record-link"><strong>In the record</strong> {{ step.evidence }}</p>
              }
            </div>
          </article>
        }
      </div>
      <aside class="review-notes">
        <div>
          <p class="eyebrow">Builder guidance example</p>
          <h3>What a teacher could notice</h3>
          <p>{{ current.review.strength }}</p>
        </div>
        <div>
          <strong>A useful feedback question</strong>
          <p>{{ current.review.question }}</p>
          <strong>Visible revision</strong>
          <p>{{ current.review.revision }}</p>
        </div>
        <div>
          <strong>Assessment lens</strong>
          <p>{{ current.review.assessment }}</p>
          <small
            >These notes illustrate teacher review. They are not a live grade or an AI
            assessment.</small
          >
        </div>
      </aside>
    </dialog>
    @if (current.videos?.length) {
      <app-presentation-examples [videos]="current.videos!" />
    }
    <section class="native-presentation" aria-label="Completed project presentation">
      <ng-container
        *ngComponentOutlet="
          current.component;
          inputs: sampleInputs();
          environmentInjector: previewInjector()
        "
      />
    </section>
  } @else if (error()) {
    <section class="load-state" role="alert">
      <h1>{{ error() }}</h1>
      <button type="button" (click)="restart()">Retry sample</button>
    </section>
  } @else {
    <p class="load-state" role="status">Opening the completed project\u2026</p>
  }
</main>
`, styles: ['/* src/app/features/project-intro/project-final-example.component.scss */\n:host {\n  display: block;\n  background: #f1f2ed;\n  color: #192f31;\n  min-height: 100vh;\n  font-family:\n    Inter,\n    Arial,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\na {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton {\n  font: inherit;\n  cursor: pointer;\n}\n.showcase-nav {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 4%;\n  border-bottom: 1px solid #ced7d0;\n  background: #fff;\n  gap: 16px;\n}\n.showcase-nav a {\n  color: inherit;\n  text-decoration: none;\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n.showcase-nav > span {\n  font-size: 0.65rem;\n  letter-spacing: 0.15em;\n  font-weight: 800;\n}\n.wordmark {\n  letter-spacing: 0.12em !important;\n  font-size: 1.05rem !important;\n}\n.wordmark span {\n  color: #9a651e;\n}\n.showcase-header {\n  max-width: 1500px;\n  margin: auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 36px;\n  padding: 36px 4% 30px;\n}\n.heading-copy {\n  max-width: 850px;\n}\n.eyebrow {\n  text-transform: uppercase;\n  font-size: 0.65rem;\n  font-weight: 800;\n  letter-spacing: 0.14em;\n  margin: 0 0 10px;\n  color: #526960;\n}\n.eyebrow span {\n  padding: 0 8px;\n}\nh1 {\n  font-size: clamp(1.9rem, 3.1vw, 3rem);\n  font-family: Georgia, serif;\n  font-weight: 500;\n  letter-spacing: -0.035em;\n  margin: 0 0 10px;\n  line-height: 1.1;\n}\n.heading-copy > p:not(.eyebrow) {\n  font-size: 0.95rem;\n  line-height: 1.65;\n  margin: 0;\n  color: #51605b;\n}\n.sample-meta {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n  margin-top: 14px;\n}\n.sample-meta span {\n  border: 1px solid #cbd5cc;\n  border-radius: 20px;\n  padding: 5px 10px;\n  font-size: 0.67rem;\n  color: #3d574b;\n}\n.showcase-actions {\n  display: grid;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.showcase-actions button,\n.load-state button {\n  border: 1px solid #bccbc2;\n  border-radius: 7px;\n  padding: 12px 15px;\n  background: #fff;\n  color: #254c40;\n  font-weight: 700;\n  font-size: 0.78rem;\n}\n.showcase-actions .primary {\n  background: #234d41;\n  color: #fff;\n  border-color: #234d41;\n}\n.showcase-actions span {\n  padding-left: 12px;\n}\n.native-presentation {\n  max-width: 1540px;\n  margin: auto;\n  padding: 0 24px 24px;\n  min-width: 0;\n}\n.teacher-review {\n  max-width: 1430px;\n  margin: 0 auto 28px;\n  background: #fff;\n  border: 1px solid #c9d3cb;\n  border-radius: 10px;\n  padding: 28px;\n}\n.teacher-review > header p:last-child {\n  color: #596d64;\n  font-size: 0.9rem;\n}\n.teacher-review h2 {\n  font-family: Georgia, serif;\n  font-size: 1.7rem;\n  font-weight: 500;\n  margin: 0;\n}\n.thinking-trail {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 20px 30px;\n  margin: 28px 0;\n}\n.thinking-trail article {\n  display: flex;\n  gap: 15px;\n  padding-top: 16px;\n  border-top: 1px solid #dce1db;\n  min-width: 0;\n}\n.step-number {\n  color: #a77532;\n  font: 1.4rem Georgia, serif;\n}\n.thinking-trail h3 {\n  margin: 0;\n  font-size: 1rem;\n}\n.thinking-trail p:not(.eyebrow) {\n  font-size: 0.86rem;\n  line-height: 1.6;\n  margin: 7px 0;\n}\n.record-link {\n  border-left: 3px solid #cfb987;\n  padding-left: 10px;\n  color: #617268;\n}\n.record-link strong {\n  display: block;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.review-notes {\n  background: #eef3ed;\n  border-radius: 6px;\n  padding: 22px;\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 24px;\n}\n.review-notes h3 {\n  margin: 0;\n}\n.review-notes p {\n  font-size: 0.85rem;\n  line-height: 1.6;\n}\n.review-notes strong {\n  font-size: 0.8rem;\n}\n.review-notes small {\n  display: block;\n  font-size: 0.7rem;\n  line-height: 1.6;\n  color: #62706b;\n}\n.showcase-exit {\n  max-width: 1430px;\n  margin: 0 auto;\n  padding: 30px 4%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n  border-top: 1px solid #c9d3cb;\n}\n.showcase-exit p {\n  font-size: 0.77rem;\n  line-height: 1.6;\n  max-width: 670px;\n  color: #596d64;\n}\n.showcase-exit a {\n  flex-shrink: 0;\n  color: #234d41;\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n.load-state {\n  text-align: center;\n  padding: 80px 24px;\n}\na:focus-visible,\nbutton:focus-visible {\n  outline: 3px solid #ae7529;\n  outline-offset: 4px;\n}\n[tabindex="-1"]:focus {\n  outline: 2px solid #ae7529;\n  outline-offset: 5px;\n}\n@media (max-width: 760px) {\n  .showcase-header {\n    display: block;\n    padding: 25px 20px;\n  }\n  .showcase-actions {\n    grid-template-columns: 1fr 1fr;\n    margin-top: 20px;\n  }\n  .showcase-actions button {\n    padding: 11px 8px;\n    font-size: 0.7rem;\n  }\n  .native-presentation {\n    padding: 0 8px 20px;\n  }\n  .showcase-nav {\n    padding: 16px;\n  }\n  .showcase-nav > span {\n    display: none;\n  }\n  .teacher-review {\n    margin: 0 8px 20px;\n    padding: 20px;\n  }\n  .thinking-trail,\n  .review-notes {\n    grid-template-columns: 1fr;\n  }\n  .showcase-exit {\n    display: block;\n    padding: 24px;\n  }\n  .eyebrow {\n    line-height: 1.6;\n  }\n  .review-notes {\n    padding: 18px;\n  }\n}\n@media print {\n  .showcase-nav,\n  .showcase-actions,\n  .showcase-exit {\n    display: none;\n  }\n  .showcase-header {\n    padding: 16px;\n  }\n  .native-presentation {\n    padding: 0;\n  }\n  .teacher-review {\n    break-before: page;\n  }\n}\n.showcase-header {\n  padding: 12px 0;\n  gap: 16px;\n}\n.showcase-header h1 {\n  font-size: clamp(24px, 2.2vw, 36px);\n  margin: 6px 0;\n}\n.showcase-header .heading-copy > p:not(.eyebrow),\n.sample-meta {\n  margin: 6px 0;\n}\ndialog.teacher-review {\n  position: fixed;\n  inset: 0;\n  margin: auto;\n  width: min(980px, 100% - 32px);\n  max-height: calc(100dvh - 32px);\n  box-sizing: border-box;\n  overflow: auto;\n  border: 1px solid #647b73;\n  border-radius: 12px;\n  padding: 24px;\n  background: #f8f5ec;\n}\ndialog.teacher-review:not([open]) {\n  display: none;\n}\ndialog::backdrop {\n  background: rgba(21, 37, 37, 0.6666666667);\n}\n.guide-close {\n  position: sticky;\n  top: -24px;\n  z-index: 2;\n  padding: 12px;\n  background: #f8f5ec;\n  text-align: right;\n}\n.guide-close button {\n  min-height: 44px;\n}\n.native-presentation {\n  --presentation-available-height: calc(100dvh - 220px);\n}\n.showcase-nav {\n  min-height: 44px;\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n.showcase-header {\n  min-height: 0;\n}\n.showcase-header .eyebrow {\n  margin: 0;\n}\n@media (max-width: 700px) {\n  .native-presentation {\n    --presentation-available-height: calc(100dvh - 120px);\n  }\n}\n.sample-context summary {\n  cursor: pointer;\n  font-size: 14px;\n}\n.native-presentation {\n  --presentation-available-height: calc(100dvh - 165px);\n}\n.example-page.integrated-example {\n  padding: 0 8px 8px;\n  max-width: 1800px;\n}\n.integrated-example .native-presentation {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n}\n/*# sourceMappingURL=project-final-example.component.css.map */\n'] }]
  }], () => [], { reviewDialog: [{ type: ViewChild, args: ["reviewDialog", { isSignal: true }] }], heading: [{ type: ViewChild, args: ["sampleHeading", { isSignal: true }] }], reviewHeading: [{ type: ViewChild, args: ["reviewHeading", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectFinalExampleComponent, { className: "ProjectFinalExampleComponent", filePath: "src/app/features/project-intro/project-final-example.component.ts", lineNumber: 27 });
})();
export {
  ProjectFinalExampleComponent
};
//# debugId=072825ae-3901-5c6b-a355-ad59c794736f
//# sourceMappingURL=chunk-W4OI54HK.js.map
