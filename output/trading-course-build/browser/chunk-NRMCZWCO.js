import {
  HISTORY_LIVE_CONFIG,
  HistoryLiveRuntimeService
} from "./chunk-OU3KDHT5.js";
import {
  Component,
  Injector,
  Input,
  ViewChild,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  setClassMetadata,
  signal,
  untracked,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";

// src/app/templates/history-live/ui/evidence-scene.component.ts
function EvidenceSceneComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "img", 1);
  }
  if (rf & 2) {
    const source_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("src", source_r1.imageUrl, \u0275\u0275sanitizeUrl)("alt", source_r1.imageAlt || source_r1.title);
  }
}
function EvidenceSceneComponent_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1, " No embedded image is supplied for this source. Open the cited original or select an evidence caption. ");
    \u0275\u0275domElementEnd();
  }
}
function EvidenceSceneComponent_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const source_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r1.dateLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r1.excerpt);
  }
}
function EvidenceSceneComponent_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.scene()?.caption);
  }
}
function EvidenceSceneComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(5, EvidenceSceneComponent_Conditional_0_Conditional_5_Template, 1, 2, "img", 1)(6, EvidenceSceneComponent_Conditional_0_Conditional_6_Template, 2, 0, "p")(7, EvidenceSceneComponent_Conditional_0_Conditional_7_Template, 4, 2)(8, EvidenceSceneComponent_Conditional_0_Conditional_8_Template, 2, 1, "p");
    \u0275\u0275domElementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "a", 2);
    \u0275\u0275text(12, "View cited document \u2197");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const source_r1 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.scene()?.camera || "media-wall");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.scene()?.camera, " \xB7 ", ctx_r1.scene()?.mediaType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r1.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(source_r1.imageUrl && (ctx_r1.scene()?.mediaType === "image" || ctx_r1.scene()?.mediaType === "historical-map") ? 5 : ctx_r1.scene()?.mediaType === "image" || ctx_r1.scene()?.mediaType === "historical-map" ? 6 : ctx_r1.scene()?.mediaType === "timeline" ? 7 : 8);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", source_r1.creator, " \xB7 ", source_r1.dateLabel);
    \u0275\u0275advance();
    \u0275\u0275domProperty("href", source_r1.url, \u0275\u0275sanitizeUrl);
  }
}
function EvidenceSceneComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1, "Select a source for this scene.");
    \u0275\u0275domElementEnd();
  }
}
var EvidenceSceneComponent = class _EvidenceSceneComponent {
  scene = input(
    ...ngDevMode ? [void 0, { debugName: "scene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  config = inject(HISTORY_LIVE_CONFIG);
  source = computed(
    () => this.config.sources.find((source) => source.id === this.scene()?.sourceId),
    ...ngDevMode ? [{ debugName: "source" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function EvidenceSceneComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EvidenceSceneComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EvidenceSceneComponent, selectors: [["app-history-live-evidence-scene"]], inputs: { scene: [1, "scene"] }, decls: 2, vars: 1, consts: [[3, "class"], [3, "src", "alt"], ["target", "_blank", "rel", "noreferrer", 3, "href"], [1, "date"]], template: function EvidenceSceneComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, EvidenceSceneComponent_Conditional_0_Template, 13, 9, "article", 0)(1, EvidenceSceneComponent_Conditional_1_Template, 2, 0, "p");
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = ctx.source()) ? 0 : 1, tmp_0_0);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #eef2ef;\n}\narticle[_ngcontent-%COMP%] {\n  padding: 1rem;\n  background: rgba(16, 35, 45, 0.9098039216);\n  max-width: 100%;\n  overflow-wrap: anywhere;\n}\nh2[_ngcontent-%COMP%] {\n  font: 600 1.2rem Georgia, serif;\n  margin: 0.4rem 0;\n}\np[_ngcontent-%COMP%], \nsmall[_ngcontent-%COMP%], \na[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\nimg[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 18rem;\n  object-fit: contain;\n}\n.date[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n}\na[_ngcontent-%COMP%] {\n  color: #f3d591;\n}\n.reporter[_ngcontent-%COMP%] {\n  border-left: 5px solid #d4b477;\n}\n.studio-wide[_ngcontent-%COMP%] {\n  text-align: center;\n}\n/*# sourceMappingURL=evidence-scene.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EvidenceSceneComponent, [{
    type: Component,
    args: [{ selector: "app-history-live-evidence-scene", template: `@if (source(); as source) {
      <article [class]="scene()?.camera || 'media-wall'">
        <small>{{ scene()?.camera }} \xB7 {{ scene()?.mediaType }}</small>
        <h2>{{ source.title }}</h2>
        @if (
          source.imageUrl &&
          (scene()?.mediaType === 'image' || scene()?.mediaType === 'historical-map')
        ) {
          <img [src]="source.imageUrl" [alt]="source.imageAlt || source.title" />
        } @else if (scene()?.mediaType === 'image' || scene()?.mediaType === 'historical-map') {
          <p>
            No embedded image is supplied for this source. Open the cited original or select an
            evidence caption.
          </p>
        } @else if (scene()?.mediaType === 'timeline') {
          <p class="date">{{ source.dateLabel }}</p>
          <p>{{ source.excerpt }}</p>
        } @else {
          <p>{{ scene()?.caption }}</p>
        }
        <p>{{ source.creator }} \xB7 {{ source.dateLabel }}</p>
        <a [href]="source.url" target="_blank" rel="noreferrer">View cited document \u2197</a>
      </article>
    } @else {
      <p>Select a source for this scene.</p>
    }`, styles: ["/* angular:styles/component:scss;f2053a66ed60d5d801c5b1d1dbe62c2b04f1877392724cdf136342123f4bc32f;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/history-live/ui/evidence-scene.component.ts */\n:host {\n  display: block;\n  color: #eef2ef;\n}\narticle {\n  padding: 1rem;\n  background: rgba(16, 35, 45, 0.9098039216);\n  max-width: 100%;\n  overflow-wrap: anywhere;\n}\nh2 {\n  font: 600 1.2rem Georgia, serif;\n  margin: 0.4rem 0;\n}\np,\nsmall,\na {\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\nimg {\n  max-width: 100%;\n  max-height: 18rem;\n  object-fit: contain;\n}\n.date {\n  font-size: 1.5rem;\n}\na {\n  color: #f3d591;\n}\n.reporter {\n  border-left: 5px solid #d4b477;\n}\n.studio-wide {\n  text-align: center;\n}\n/*# sourceMappingURL=evidence-scene.component.css.map */\n"] }]
  }], null, { scene: [{ type: Input, args: [{ isSignal: true, alias: "scene", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EvidenceSceneComponent, { className: "EvidenceSceneComponent", filePath: "src/app/templates/history-live/ui/evidence-scene.component.ts", lineNumber: 75 });
})();

// src/app/templates/history-live/ui/broadcast-player.component.ts
var _c0 = ["sceneHeading"];
var _c1 = ["reportVideo"];
var _c2 = () => [];
var _c3 = () => ["Strong evidence", "Interesting perspective", "Clear explanation", "Question", "Applause"];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.sourceId;
function BroadcastPlayerComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 4)(1, "div")(2, "span");
    \u0275\u0275text(3, "PACKAGE PREVIEW");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h1");
    \u0275\u0275text(5, "Review your report package");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Check the scenes, recording, transcript, and evidence before producer clearance.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div")(9, "button", 8);
    \u0275\u0275listener("click", function BroadcastPlayerComponent_Conditional_3_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.goTo("production"));
    });
    \u0275\u0275text(10, "\u2190 Edit package");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 8);
    \u0275\u0275listener("click", function BroadcastPlayerComponent_Conditional_3_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.goTo("schedule"));
    });
    \u0275\u0275text(12, "View rundown \u2192");
    \u0275\u0275elementEnd()()();
  }
}
function BroadcastPlayerComponent_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 9);
  }
  if (rf & 2) {
    const poster_r3 = ctx;
    \u0275\u0275property("src", poster_r3.src, \u0275\u0275sanitizeUrl)("alt", poster_r3.alt);
  }
}
function BroadcastPlayerComponent_Conditional_5_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 18, 0);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "app-history-live-evidence-scene", 19);
  }
  if (rf & 2) {
    const segment_r4 = \u0275\u0275nextContext(2);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", segment_r4.scenes[ctx_r1.sceneIndex()].label, " ");
    \u0275\u0275advance();
    \u0275\u0275property("scene", segment_r4.scenes[ctx_r1.sceneIndex()]);
  }
}
function BroadcastPlayerComponent_Conditional_5_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const segment_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(segment_r4.visualLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", segment_r4.sample ? "Sample rundown entry \u2014 no student media" : "No evidence scene attached", " ");
  }
}
function BroadcastPlayerComponent_Conditional_5_Conditional_1_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span");
    \u0275\u0275text(2, "PRODUCER HOLD");
    \u0275\u0275elementEnd()();
  }
}
function BroadcastPlayerComponent_Conditional_5_Conditional_1_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span");
    \u0275\u0275text(2, "THIS SPECIAL REPORT HAS ENDED");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4, "What changed when you heard both networks?");
    \u0275\u0275elementEnd()();
  }
}
function BroadcastPlayerComponent_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275conditionalCreate(1, BroadcastPlayerComponent_Conditional_5_Conditional_1_Conditional_1_Template, 4, 2)(2, BroadcastPlayerComponent_Conditional_5_Conditional_1_Conditional_2_Template, 4, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 11)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 12);
    \u0275\u0275element(9, "i");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 13);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 14);
    \u0275\u0275element(14, "span")(15, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 15)(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div")(20, "strong");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "small");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 16)(25, "strong");
    \u0275\u0275text(26, "HISTORY LIVE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div")(28, "span");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31, "Inspect the cited evidence and its limits");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span");
    \u0275\u0275text(33, "Coming up: competing perspectives on the war");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(34, BroadcastPlayerComponent_Conditional_5_Conditional_1_Conditional_34_Template, 3, 0, "div", 17);
    \u0275\u0275conditionalCreate(35, BroadcastPlayerComponent_Conditional_5_Conditional_1_Conditional_35_Template, 5, 0, "div", 17);
  }
  if (rf & 2) {
    const segment_r4 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(segment_r4.scenes?.length ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("british", segment_r4.side === "british");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r4.side === "patriot" ? "C" : "CR");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r4.networkName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.readOnly() ? "SAMPLE REPLAY" : ctx_r1.runtime.state().stage === "broadcast" ? "PREVIEW" : ctx_r1.runtime.state().showStatus.toUpperCase(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r4.startLabel);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(segment_r4.desk);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(segment_r4.headline);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", segment_r4.reporter, " \xB7 ", segment_r4.networkName);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Developing: ", segment_r4.headline);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.runtime.state().showStatus === "held" ? 34 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.state().showStatus === "ended" ? 35 : -1);
  }
}
function BroadcastPlayerComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, BroadcastPlayerComponent_Conditional_5_Conditional_0_Template, 1, 2, "img", 9);
    \u0275\u0275conditionalCreate(1, BroadcastPlayerComponent_Conditional_5_Conditional_1_Template, 36, 14);
  }
  if (rf & 2) {
    let tmp_2_0;
    const segment_r4 = ctx;
    \u0275\u0275conditional((tmp_2_0 = segment_r4.recordingPoster) ? 0 : -1, tmp_2_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(!segment_r4.recordingPoster ? 1 : -1);
  }
}
function BroadcastPlayerComponent_Conditional_6_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function BroadcastPlayerComponent_Conditional_6_Conditional_1_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleScenes());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.playingScenes() ? "Pause scenes" : "Play evidence scenes", " ");
  }
}
function BroadcastPlayerComponent_Conditional_6_Conditional_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function BroadcastPlayerComponent_Conditional_6_Conditional_1_For_3_Template_button_click_0_listener() {
      const \u0275$index_126_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectScene(\u0275$index_126_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_126_r7 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("aria-pressed", ctx_r1.sceneIndex() === \u0275$index_126_r7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Scene ", \u0275$index_126_r7 + 1, " ");
  }
}
function BroadcastPlayerComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 20);
    \u0275\u0275conditionalCreate(1, BroadcastPlayerComponent_Conditional_6_Conditional_1_Conditional_1_Template, 2, 1, "button", 23);
    \u0275\u0275repeaterCreate(2, BroadcastPlayerComponent_Conditional_6_Conditional_1_For_3_Template, 2, 2, "button", 23, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const segment_r8 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.readOnly() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(segment_r8.scenes);
  }
}
function BroadcastPlayerComponent_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "video", 24, 1);
    \u0275\u0275elementStart(2, "a", 25);
    \u0275\u0275text(3, "Download recording");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const url_r9 = ctx;
    \u0275\u0275property("src", url_r9, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("href", url_r9, \u0275\u0275sanitizeUrl);
  }
}
function BroadcastPlayerComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 6);
    \u0275\u0275conditionalCreate(1, BroadcastPlayerComponent_Conditional_6_Conditional_1_Template, 4, 1, "nav", 20);
    \u0275\u0275conditionalCreate(2, BroadcastPlayerComponent_Conditional_6_Conditional_2_Template, 4, 2);
    \u0275\u0275elementStart(3, "details", 21)(4, "summary");
    \u0275\u0275text(5, "Read the report transcript");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7, "Report transcript");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 22);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const segment_r8 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(segment_r8.scenes?.length && !segment_r8.recordingPoster ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx_r1.mediaUrl()) ? 2 : -1, tmp_3_0);
    \u0275\u0275advance();
    \u0275\u0275property("open", !ctx_r1.readOnly());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(segment_r8.transcript);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" Package status: ", ctx_r1.runtime.state().packageStatus || "draft", ". ", ctx_r1.runtime.state().packageFeedback, " ");
  }
}
function BroadcastPlayerComponent_Conditional_7_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function BroadcastPlayerComponent_Conditional_7_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.previousSegment());
    });
    \u0275\u0275text(1, " \u2190 Previous");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 31);
    \u0275\u0275listener("click", function BroadcastPlayerComponent_Conditional_7_Conditional_8_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.holdShow());
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 32);
    \u0275\u0275listener("click", function BroadcastPlayerComponent_Conditional_7_Conditional_8_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.nextSegment());
    });
    \u0275\u0275text(5, " Take next \u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 8);
    \u0275\u0275listener("click", function BroadcastPlayerComponent_Conditional_7_Conditional_8_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.endShow());
    });
    \u0275\u0275text(7, "End show");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.runtime.state().activeSegmentIndex === 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.state().showStatus === "held" ? "Resume" : "Hold");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.runtime.state().activeSegmentIndex === ctx_r1.runtime.state().schedule.length - 1);
  }
}
function BroadcastPlayerComponent_Conditional_7_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function BroadcastPlayerComponent_Conditional_7_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.saveReflection());
    });
    \u0275\u0275text(1, "Save reflection revision");
    \u0275\u0275elementEnd();
  }
}
function BroadcastPlayerComponent_Conditional_7_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", entry_r13.timestamp, " \xB7 ", entry_r13.text);
  }
}
function BroadcastPlayerComponent_Conditional_7_Conditional_23_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function BroadcastPlayerComponent_Conditional_7_Conditional_23_For_6_Template_button_click_0_listener() {
      const reaction_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.react(reaction_r15));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const reaction_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", reaction_r15, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.reactionCount(reaction_r15) || "");
  }
}
function BroadcastPlayerComponent_Conditional_7_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "aside", 29)(1, "span");
    \u0275\u0275text(2, "AUDIENCE RESPONSE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Which signal best matches this report?");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, BroadcastPlayerComponent_Conditional_7_Conditional_23_For_6_Template, 4, 2, "button", 23, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c3));
  }
}
function BroadcastPlayerComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "div")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, BroadcastPlayerComponent_Conditional_7_Conditional_8_Template, 8, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "details", 27)(10, "summary");
    \u0275\u0275text(11, "After the broadcast: reflection");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "h2");
    \u0275\u0275text(13, "After the broadcast");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "label");
    \u0275\u0275text(15);
    \u0275\u0275elementStart(16, "textarea", 28);
    \u0275\u0275listener("input", function BroadcastPlayerComponent_Conditional_7_Template_textarea_input_16_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.updateReflection($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(17, BroadcastPlayerComponent_Conditional_7_Conditional_17_Template, 2, 0, "button", 23);
    \u0275\u0275elementStart(18, "details")(19, "summary");
    \u0275\u0275text(20, "Earlier reflections");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(21, BroadcastPlayerComponent_Conditional_7_For_22_Template, 2, 2, "p", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(23, BroadcastPlayerComponent_Conditional_7_Conditional_23_Template, 7, 1, "aside", 29);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.readOnly() ? "FILED PACKAGE" : "ON AIR");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.runtime.state().activeSegmentIndex + 1, " / ", ctx_r1.runtime.state().schedule.length);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("NEXT: ", ctx_r1.runtime.state().schedule[ctx_r1.runtime.state().activeSegmentIndex + 1]?.headline || "Closing analysis");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.readOnly() && ctx_r1.runtime.canProduce() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("open", !ctx_r1.readOnly());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.reflectionPrompt || "Which claim changed after hearing another perspective, and which evidence changed it?");
    \u0275\u0275advance();
    \u0275\u0275property("readOnly", ctx_r1.readOnly())("value", ctx_r1.runtime.state().reflection || "");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.readOnly() ? 17 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.runtime.state().reflectionHistory || \u0275\u0275pureFunction0(11, _c2));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.readOnly() ? 23 : -1);
  }
}
function BroadcastPlayerComponent_Conditional_8_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const segment_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4(" ", segment_r16.startLabel, " \xB7 ", segment_r16.headline, " \xB7 ", segment_r16.durationSeconds, " seconds \xB7 ", segment_r16.reporter, " ");
  }
}
function BroadcastPlayerComponent_Conditional_8_For_14_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const link_r17 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", link_r17.relationship, " \xB7 ", ctx_r1.sourceTitle(link_r17.sourceId));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", link_r17.passage, " ");
  }
}
function BroadcastPlayerComponent_Conditional_8_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, BroadcastPlayerComponent_Conditional_8_For_14_For_4_Template, 4, 3, "p", null, _forTrack1);
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p")(8, "strong");
    \u0275\u0275text(9, "Source limit:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const claim_r18 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(claim_r18.text);
    \u0275\u0275advance();
    \u0275\u0275repeater(claim_r18.evidence || \u0275\u0275pureFunction0(3, _c2));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(claim_r18.reasoning);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", claim_r18.uncertainty);
  }
}
function BroadcastPlayerComponent_Conditional_8_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const review_r19 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", review_r19.decision, ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", review_r19.feedback, " ");
  }
}
function BroadcastPlayerComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 7)(1, "summary");
    \u0275\u0275text(2, "Inside the completed package: sources and review");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Inside the completed package");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "details")(6, "summary");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, BroadcastPlayerComponent_Conditional_8_For_9_Template, 2, 4, "p", null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "details")(11, "summary");
    \u0275\u0275text(12, "Claim \u2192 source \u2192 reasoning");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(13, BroadcastPlayerComponent_Conditional_8_For_14_Template, 11, 4, "article", null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "details")(16, "summary");
    \u0275\u0275text(17, "Producer review history \xB7 fictional sample");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(18, BroadcastPlayerComponent_Conditional_8_For_19_Template, 4, 2, "p", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("Producer rundown \xB7 ", ctx_r1.runtime.state().schedule.length, " filed package");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.runtime.state().schedule);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.runtime.state().claims);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.runtime.state().reviewHistory || \u0275\u0275pureFunction0(1, _c2));
  }
}
var BroadcastPlayerComponent = class _BroadcastPlayerComponent {
  runtime = inject(HistoryLiveRuntimeService);
  readOnly = input(
    false,
    ...ngDevMode ? [{ debugName: "readOnly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playingScenes = signal(
    false,
    ...ngDevMode ? [{ debugName: "playingScenes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sceneTimer;
  injector = inject(Injector);
  sceneHeading = viewChild(
    "sceneHeading",
    ...ngDevMode ? [{ debugName: "sceneHeading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sceneIndex = signal(
    0,
    ...ngDevMode ? [{ debugName: "sceneIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mediaUrl = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "mediaUrl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  request = 0;
  video = viewChild(
    "reportVideo",
    ...ngDevMode ? [{ debugName: "video" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previewSegment = computed(
    () => {
      const state = this.runtime.state();
      if (state.stage === "showcase")
        return this.runtime.activeSegment();
      const network = this.runtime.selectedNetwork();
      if (!network)
        return void 0;
      return {
        id: this.runtime.currentStudentSegmentId,
        reporter: this.runtime.viewer.studentDisplayName,
        side: network.side,
        networkName: network.name,
        headline: state.pitch.headline,
        desk: this.runtime.beatLabel(state.pitch.beatId),
        durationSeconds: 0,
        startLabel: "PREVIEW",
        ready: state.studentSegmentReady,
        visualLabel: state.visualSequence[0]?.caption ?? "",
        script: state.scriptBlocks,
        scenes: state.visualSequence,
        recordingAssetId: state.recordingAssetId,
        transcript: state.transcript || state.scriptBlocks.map((block) => block.text).join("\n")
      };
    },
    ...ngDevMode ? [{ debugName: "previewSegment" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playbackKey = computed(
    () => `${this.previewSegment()?.id}:${this.previewSegment()?.recordingAssetId ?? ""}`,
    ...ngDevMode ? [{ debugName: "playbackKey" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const status = this.runtime.state().showStatus;
      if (status === "held" || status === "ended")
        this.video()?.nativeElement.pause();
    });
    effect(() => {
      this.playbackKey();
      const segment = untracked(this.previewSegment);
      this.sceneIndex.set(0);
      const request = ++this.request;
      untracked(() => this.clearMedia());
      if (segment?.recordingAssetId && this.runtime.media) {
        void this.runtime.media.getReference(segment.recordingAssetId).then((asset) => {
          if (request !== this.request) {
            if (asset.reference.startsWith("blob:"))
              URL.revokeObjectURL(asset.reference);
            return;
          }
          this.mediaUrl.set(asset.reference);
        }).catch(() => this.runtime.error.set("Recording unavailable. Read the transcript or restore the media before presenting."));
      }
    });
  }
  reactionCount(reaction) {
    return this.runtime.state().audienceReactions[`${this.previewSegment()?.id}:${reaction}`] ?? 0;
  }
  sourceTitle(id) {
    return this.runtime.config.sources.find((source) => source.id === id)?.title ?? "Source";
  }
  selectScene(index) {
    this.pauseScenes();
    this.sceneIndex.set(index);
    afterNextRender(() => {
      const element = this.sceneHeading()?.nativeElement;
      element?.scrollIntoView({ block: "nearest" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  toggleScenes() {
    if (this.playingScenes()) {
      this.pauseScenes();
      return;
    }
    this.playingScenes.set(true);
    if (this.sceneIndex() >= (this.previewSegment()?.scenes?.length ?? 1) - 1)
      this.sceneIndex.set(0);
    this.sceneTimer = setInterval(() => {
      if (this.sceneIndex() >= (this.previewSegment()?.scenes?.length ?? 1) - 1)
        this.pauseScenes();
      else
        this.sceneIndex.update((index) => index + 1);
    }, 1e4);
  }
  pauseScenes() {
    if (this.sceneTimer)
      clearInterval(this.sceneTimer);
    this.sceneTimer = void 0;
    this.playingScenes.set(false);
  }
  clearMedia() {
    const url = this.mediaUrl();
    if (url?.startsWith("blob:"))
      URL.revokeObjectURL(url);
    this.mediaUrl.set(void 0);
  }
  ngOnDestroy() {
    this.pauseScenes();
    this.request++;
    this.clearMedia();
  }
  static \u0275fac = function BroadcastPlayerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BroadcastPlayerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BroadcastPlayerComponent, selectors: [["app-history-live-broadcast-player"]], viewQuery: function BroadcastPlayerComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.sceneHeading, _c0, 5)(ctx.video, _c1, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, inputs: { readOnly: [1, "readOnly"] }, decls: 9, vars: 12, consts: [["sceneHeading", ""], ["reportVideo", ""], [1, "sr-only"], ["aria-label", "History Live broadcast player", 1, "broadcast-shell"], [1, "preview-header"], [1, "broadcast-frame"], ["aria-label", "Report media and transcript", 1, "package-content"], [1, "sample-record"], ["type", "button", 3, "click"], [1, "recording-poster", 3, "src", "alt"], [1, "media-wall"], [1, "network-logo"], [1, "live-indicator"], [1, "broadcast-clock"], ["aria-hidden", "true", 1, "reporter-silhouette"], [1, "lower-third"], [1, "news-ticker"], [1, "state-overlay"], ["tabindex", "-1", 1, "sr-only"], [3, "scene"], ["aria-label", "Evidence scenes"], ["id", "report-transcript", 3, "open"], [1, "transcript"], ["type", "button"], ["controls", "", "aria-label", "Recorded report", "aria-describedby", "report-transcript", 3, "src"], ["download", "report-recording", 3, "href"], [1, "show-controls"], [1, "reflection", 3, "open"], ["rows", "5", 3, "input", "readOnly", "value"], [1, "audience-bar"], ["type", "button", 3, "click", "disabled"], ["type", "button", 1, "hold", 3, "click"], ["type", "button", 1, "take", 3, "click", "disabled"]], template: function BroadcastPlayerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h1", 2);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "section", 3);
      \u0275\u0275conditionalCreate(3, BroadcastPlayerComponent_Conditional_3_Template, 13, 0, "header", 4);
      \u0275\u0275elementStart(4, "div", 5);
      \u0275\u0275conditionalCreate(5, BroadcastPlayerComponent_Conditional_5_Template, 2, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, BroadcastPlayerComponent_Conditional_6_Template, 12, 6, "section", 6);
      \u0275\u0275conditionalCreate(7, BroadcastPlayerComponent_Conditional_7_Template, 24, 12);
      \u0275\u0275conditionalCreate(8, BroadcastPlayerComponent_Conditional_8_Template, 20, 2, "details", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_5_0;
      let tmp_6_0;
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.runtime.state().stage === "showcase" ? "Class special report" : "Package preview", "\n");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.readOnly() && ctx.runtime.state().stage === "broadcast" ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("is-held", ctx.runtime.state().showStatus === "held")("ended", ctx.runtime.state().showStatus === "ended")("has-recording-poster", !!ctx.previewSegment()?.recordingPoster);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_5_0 = ctx.previewSegment()) ? 5 : -1, tmp_5_0);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_6_0 = ctx.previewSegment()) ? 6 : -1, tmp_6_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.state().stage === "showcase" ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.readOnly() ? 8 : -1);
    }
  }, dependencies: [EvidenceSceneComponent], styles: ['@charset "UTF-8";\n\n\n[_nghost-%COMP%] {\n  display: block;\n  color: #e5ecef;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #dcc07f;\n  outline-offset: 2px;\n}\n.broadcast-shell[_ngcontent-%COMP%] {\n  min-height: calc(100dvh - 8rem);\n  padding: 1.2rem clamp(0.7rem, 2vw, 2rem) 2rem;\n  background: #050a0e;\n}\n.preview-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr minmax(15rem, 30rem) auto;\n  align-items: end;\n  gap: 1.5rem;\n  width: min(88rem, 100%);\n  margin: 0 auto 1rem;\n}\n.preview-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #c4a76b;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.14em;\n}\n.preview-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0.3rem 0 0;\n  color: #e8edef;\n  font: 400 clamp(1.5rem, 3vw, 2.3rem) Georgia, serif;\n}\n.preview-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #788b95;\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.preview-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-child {\n  display: flex;\n  gap: 0.4rem;\n}\n.preview-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.show-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.7rem;\n  border: 1px solid #384c57;\n  padding: 0 0.8rem;\n  color: #aabcc4;\n  background: #12212a;\n  font-size: 0.8rem;\n  font-weight: 850;\n  cursor: pointer;\n}\n.preview-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-child {\n  border: 0;\n  color: #12212a;\n  background: #d0b171;\n}\n.broadcast-frame[_ngcontent-%COMP%] {\n  position: relative;\n  width: min(88rem, 100%);\n  aspect-ratio: 16/9;\n  min-height: 29rem;\n  margin: 0 auto;\n  overflow: hidden;\n  border: 1px solid #3c4850;\n  background: url(/history-live/broadcast-studio.webp) center/cover no-repeat;\n  box-shadow: 0 2rem 5rem #000;\n  isolation: isolate;\n}\n.broadcast-frame[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  inset: 0;\n  background:\n    linear-gradient(\n      0deg,\n      rgba(0, 4, 7, 0.5),\n      transparent 45%),\n    radial-gradient(\n      circle at center,\n      transparent 5%,\n      rgba(1, 6, 10, 0.24) 78%);\n}\n.recording-poster[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 10;\n  inset: 0;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.media-wall[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 17%;\n  left: 30.7%;\n  display: grid;\n  width: 38.5%;\n  height: 36%;\n  place-items: center;\n  align-content: center;\n  padding: 1rem;\n  text-align: center;\n  text-shadow: 0 0.15rem 0.5rem #000;\n}\n.media-wall[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d7b978;\n  font-size: clamp(0.45rem, 0.8vw, 0.7rem);\n  font-weight: 900;\n  letter-spacing: 0.18em;\n}\n.media-wall[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  max-width: 26rem;\n  margin: 0.65rem 0;\n  color: #eff4f6;\n  font: 400 clamp(1.1rem, 2.5vw, 2.4rem)/1.05 Georgia, serif;\n}\n.media-wall[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #96aab5;\n  font-size: clamp(0.35rem, 0.7vw, 0.55rem);\n  letter-spacing: 0.1em;\n}\n.network-logo[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 3.5%;\n  left: 2.5%;\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  color: #dce8ee;\n}\n.network-logo[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.9rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #8bb1cb;\n  color: #a9c8dc;\n  background: rgba(18, 46, 65, 0.9);\n  font: 900 1rem Georgia, serif;\n  transform: rotate(45deg);\n}\n.network-logo.british[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  border-color: #d08b81;\n  color: #e0a59b;\n  background: rgba(69, 30, 29, 0.9);\n}\n.network-logo[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  max-width: 6rem;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.live-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 3.5%;\n  right: 2.5%;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.38rem 0.6rem;\n  color: #fff;\n  background: #a93630;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n}\n.live-indicator[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.4rem;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  background: #fff;\n  animation: _ngcontent-%COMP%_pulse 1.4s infinite;\n}\n.is-held[_ngcontent-%COMP%]   .live-indicator[_ngcontent-%COMP%] {\n  background: #a9742f;\n}\n.broadcast-clock[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10%;\n  right: 2.5%;\n  color: #d7e0e4;\n  font: 700 0.65rem "Courier New", monospace;\n}\n.reporter-silhouette[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 17%;\n  bottom: 22%;\n  width: 12%;\n  height: 33%;\n  filter: drop-shadow(0 0.5rem 0.8rem rgba(0, 0, 0, 0.55));\n}\n.reporter-silhouette[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 30%;\n  width: 40%;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      145deg,\n      #a8b1b3,\n      #4e5a61);\n}\n.reporter-silhouette[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 73%;\n  border-radius: 45% 45% 12% 12%;\n  background:\n    linear-gradient(\n      120deg,\n      #3c4d57,\n      #111b22);\n  clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);\n}\n.lower-third[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  right: 5%;\n  bottom: 8%;\n  left: 5%;\n  display: flex;\n  border-left: 5px solid #ad3731;\n  background: rgba(7, 17, 24, 0.94);\n  box-shadow: 0 0.5rem 1.8rem rgba(0, 0, 0, 0.45);\n}\n.lower-third[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 8rem;\n  align-items: center;\n  padding: 0.8rem 1rem;\n  color: #eedba9;\n  background: #21384a;\n  font-size: clamp(0.45rem, 0.7vw, 0.62rem);\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.lower-third[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  padding: 0.65rem 1rem;\n}\n.lower-third[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.lower-third[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n.lower-third[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #f1f4f4;\n  font: 700 clamp(0.85rem, 1.7vw, 1.45rem) Georgia, serif;\n}\n.lower-third[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 0.22rem;\n  color: #91a4ae;\n  font-size: clamp(0.4rem, 0.7vw, 0.58rem);\n  text-transform: uppercase;\n}\n.news-ticker[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  min-height: 5%;\n  align-items: center;\n  overflow: hidden;\n  color: #192931;\n  background: #e4e7e3;\n  font-size: clamp(0.4rem, 0.7vw, 0.58rem);\n}\n.news-ticker[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  align-self: stretch;\n  display: flex;\n  align-items: center;\n  padding: 0 1.1rem;\n  color: #fff;\n  background: #a63630;\n  font-size: inherit;\n}\n.news-ticker[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4rem;\n  padding-left: 1rem;\n  white-space: nowrap;\n  animation: _ngcontent-%COMP%_ticker 26s linear infinite;\n}\n.news-ticker[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]::before {\n  content: "\\25c6";\n  margin-right: 0.7rem;\n  color: #a47f42;\n}\n.state-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 4;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  align-content: center;\n  gap: 1rem;\n  color: #f4e4be;\n  background: rgba(3, 8, 12, 0.8);\n  text-align: center;\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n}\n.state-overlay[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: clamp(1rem, 3vw, 2.3rem);\n  font-weight: 900;\n  letter-spacing: 0.18em;\n}\n.state-overlay[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  max-width: 35rem;\n  color: #bbc9cf;\n  font: 400 clamp(1rem, 2vw, 1.5rem) Georgia, serif;\n}\n.show-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  width: min(88rem, 100%);\n  margin: 0.8rem auto;\n}\n.show-controls[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto auto;\n  align-items: center;\n  gap: 0.1rem 0.6rem;\n  margin-right: auto;\n}\n.show-controls[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d0b16e;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n}\n.show-controls[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dce5e8;\n  font: 400 1.2rem Georgia, serif;\n}\n.show-controls[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  color: #6e818b;\n  font-size: 0.8rem;\n}\n.show-controls[_ngcontent-%COMP%]   button.take[_ngcontent-%COMP%] {\n  border: 0;\n  color: #14212a;\n  background: #d2b372;\n}\n.show-controls[_ngcontent-%COMP%]   button.hold[_ngcontent-%COMP%] {\n  color: #e0c28a;\n  border-color: #8a7040;\n}\n.show-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.35;\n  cursor: not-allowed;\n}\n.audience-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  width: min(88rem, 100%);\n  margin: 1rem auto 0;\n  border-top: 1px solid #293b46;\n  padding-top: 1rem;\n}\n.audience-bar[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #c3a467;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n}\n.audience-bar[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0.5rem;\n  color: #778b95;\n  font-size: 0.8rem;\n}\n.audience-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #2d414b;\n  border-radius: 2rem;\n  padding: 0.4rem 0.65rem;\n  color: #9badb5;\n  background: #101d25;\n  font-size: 0.8rem;\n  cursor: pointer;\n}\n.audience-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  border-color: #aa8e56;\n  color: #eedba9;\n}\n.audience-bar[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #d6b778;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  50% {\n    opacity: 0.35;\n  }\n}\n@keyframes _ngcontent-%COMP%_ticker {\n  to {\n    transform: translateX(-45%);\n  }\n}\n@media (max-width: 800px) {\n  .preview-header[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .broadcast-frame[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n  .show-controls[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .show-controls[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-bottom: 0.4rem;\n  }\n  .audience-bar[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-wrap: wrap;\n  }\n  .audience-bar[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: center;\n  }\n  .reporter-silhouette[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 520px) {\n  .broadcast-shell[_ngcontent-%COMP%] {\n    padding-inline: 0.35rem;\n  }\n  .broadcast-frame[_ngcontent-%COMP%] {\n    aspect-ratio: 4/3;\n  }\n  .lower-third[_ngcontent-%COMP%] {\n    right: 2%;\n    bottom: 9%;\n    left: 2%;\n  }\n  .lower-third[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    min-width: auto;\n    padding: 0.5rem;\n  }\n  .network-logo[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n   .broadcast-clock[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .media-wall[_ngcontent-%COMP%] {\n    top: 18%;\n    left: 24%;\n    width: 52%;\n    height: 34%;\n  }\n  .show-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .news-ticker[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], \n   .live-indicator[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  min-height: 2.75rem;\n}\ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n  line-height: 1.5;\n}\nbutton[aria-disabled=true][_ngcontent-%COMP%] {\n  opacity: 0.65;\n}\n.package-content[_ngcontent-%COMP%], \n.reflection[_ngcontent-%COMP%] {\n  max-width: 70rem;\n  margin: 1rem auto;\n  padding: 1rem;\n  background: #162a35;\n  color: #eff3ef;\n}\n.package-content[_ngcontent-%COMP%]   video[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-height: 32rem;\n}\n.package-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #f3d591;\n}\n.package-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.reflection[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin: 0.4rem;\n  padding: 0.6rem;\n}\n.reflection[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.6rem;\n}\n.reflection[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  font-size: 1rem;\n}\n.transcript[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  line-height: 1.6;\n}\n.media-wall[_ngcontent-%COMP%] {\n  overflow: auto;\n}\n.media-wall[_ngcontent-%COMP%]   app-history-live-evidence-scene[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.sample-record[_ngcontent-%COMP%] {\n  padding: 28px;\n  background: #152a33;\n  color: #e7efe9;\n}\n.sample-record[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font: 1.6rem Georgia, serif;\n}\n.sample-record[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  border-top: 1px solid #3d555e;\n  padding: 16px 0;\n}\n.sample-record[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-weight: 700;\n}\n.sample-record[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  line-height: 1.7;\n  font-size: 0.88rem;\n}\n.sample-record[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #203841;\n  margin: 12px 0;\n}\n.sample-record[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.sample-record[_ngcontent-%COMP%]   details[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #e1bb77;\n}\ntextarea[readonly][_ngcontent-%COMP%] {\n  background: #122832;\n  color: #edf4ef;\n}\n.package-content[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n}\n.package-content[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n}\n.package-content[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #567582;\n  border-radius: 5px;\n  background: #244350;\n  color: #f1f4e9;\n  cursor: pointer;\n  margin: 0;\n  padding: 10px 14px;\n}\n.package-content[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #d7b56d;\n  color: #1b2d31;\n}\n.media-wall[_ngcontent-%COMP%] {\n  align-content: start;\n}\n@media (max-width: 800px) {\n  .broadcast-frame[_ngcontent-%COMP%] {\n    aspect-ratio: auto;\n    min-height: 0;\n    padding: 78px 12px 140px;\n  }\n  .broadcast-frame.has-recording-poster[_ngcontent-%COMP%] {\n    aspect-ratio: 16/9;\n    padding: 0;\n  }\n  .media-wall[_ngcontent-%COMP%] {\n    position: relative;\n    inset: auto;\n    width: 100%;\n    height: auto;\n    overflow: visible;\n    padding: 0;\n  }\n  .reporter-silhouette[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .lower-third[_ngcontent-%COMP%] {\n    bottom: 42px;\n  }\n  .lower-third[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .sample-record[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .live-indicator[_ngcontent-%COMP%] {\n    font-size: 0.6rem;\n  }\n}\ndetails[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 12px;\n  font-weight: 700;\n}\n.broadcast-frame[_ngcontent-%COMP%] {\n  min-height: 0;\n  height: clamp(250px, 40dvh, 440px);\n}\n.broadcast-shell[_ngcontent-%COMP%]   video[_ngcontent-%COMP%] {\n  max-height: 40dvh;\n  width: 100%;\n  object-fit: contain;\n}\n/*# sourceMappingURL=broadcast-player.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BroadcastPlayerComponent, [{
    type: Component,
    args: [{ selector: "app-history-live-broadcast-player", imports: [EvidenceSceneComponent], template: `<h1 class="sr-only">
  {{ runtime.state().stage === 'showcase' ? 'Class special report' : 'Package preview' }}
</h1>
<section class="broadcast-shell" aria-label="History Live broadcast player">
  @if (!readOnly() && runtime.state().stage === 'broadcast') {
    <header class="preview-header">
      <div>
        <span>PACKAGE PREVIEW</span>
        <h1>Review your report package</h1>
      </div>
      <p>Check the scenes, recording, transcript, and evidence before producer clearance.</p>
      <div>
        <button type="button" (click)="runtime.goTo('production')">\u2190 Edit package</button
        ><button type="button" (click)="runtime.goTo('schedule')">View rundown \u2192</button>
      </div>
    </header>
  }
  <div
    class="broadcast-frame"
    [class.is-held]="runtime.state().showStatus === 'held'"
    [class.ended]="runtime.state().showStatus === 'ended'"
    [class.has-recording-poster]="!!previewSegment()?.recordingPoster"
  >
    @if (previewSegment(); as segment) {
      @if (segment.recordingPoster; as poster) {
        <img class="recording-poster" [src]="poster.src" [alt]="poster.alt" />
      }
      @if (!segment.recordingPoster) {
        <div class="media-wall">
          @if (segment.scenes?.length) {
            <h2 #sceneHeading tabindex="-1" class="sr-only">
              {{ segment.scenes[sceneIndex()].label }}
            </h2>
            <app-history-live-evidence-scene [scene]="segment.scenes[sceneIndex()]" />
          } @else {
            <strong>{{ segment.visualLabel }}</strong>
            <p>
              {{
                segment.sample
                  ? 'Sample rundown entry \u2014 no student media'
                  : 'No evidence scene attached'
              }}
            </p>
          }
        </div>
        <div class="network-logo" [class.british]="segment.side === 'british'">
          <span>{{ segment.side === 'patriot' ? 'C' : 'CR' }}</span
          ><small>{{ segment.networkName }}</small>
        </div>
        <div class="live-indicator">
          <i></i
          >{{
            readOnly()
              ? 'SAMPLE REPLAY'
              : runtime.state().stage === 'broadcast'
                ? 'PREVIEW'
                : runtime.state().showStatus.toUpperCase()
          }}
        </div>
        <div class="broadcast-clock">{{ segment.startLabel }}</div>
        <div class="reporter-silhouette" aria-hidden="true"><span></span><i></i></div>
        <div class="lower-third">
          <span>{{ segment.desk }}</span>
          <div>
            <strong>{{ segment.headline }}</strong
            ><small>{{ segment.reporter }} \xB7 {{ segment.networkName }}</small>
          </div>
        </div>
        <div class="news-ticker">
          <strong>HISTORY LIVE</strong>
          <div>
            <span>Developing: {{ segment.headline }}</span
            ><span>Inspect the cited evidence and its limits</span
            ><span>Coming up: competing perspectives on the war</span>
          </div>
        </div>
        @if (runtime.state().showStatus === 'held') {
          <div class="state-overlay"><span>PRODUCER HOLD</span></div>
        }
        @if (runtime.state().showStatus === 'ended') {
          <div class="state-overlay">
            <span>THIS SPECIAL REPORT HAS ENDED</span
            ><strong>What changed when you heard both networks?</strong>
          </div>
        }
      }
    }
  </div>
  @if (previewSegment(); as segment) {
    <section class="package-content" aria-label="Report media and transcript">
      @if (segment.scenes?.length && !segment.recordingPoster) {
        <nav aria-label="Evidence scenes">
          @if (readOnly()) {
            <button type="button" (click)="toggleScenes()">
              {{ playingScenes() ? 'Pause scenes' : 'Play evidence scenes' }}
            </button>
          }
          @for (scene of segment.scenes; track scene.id; let index = $index) {
            <button
              type="button"
              [attr.aria-pressed]="sceneIndex() === index"
              (click)="selectScene(index)"
            >
              Scene {{ index + 1 }}
            </button>
          }
        </nav>
      }
      @if (mediaUrl(); as url) {
        <video
          #reportVideo
          [src]="url"
          controls
          aria-label="Recorded report"
          aria-describedby="report-transcript"
        ></video
        ><a [href]="url" download="report-recording">Download recording</a>
      }
      <details id="report-transcript" [open]="!readOnly()">
        <summary>Read the report transcript</summary>
        <h2>Report transcript</h2>
        <p class="transcript">{{ segment.transcript }}</p>
      </details>
      <p>
        Package status: {{ runtime.state().packageStatus || 'draft' }}.
        {{ runtime.state().packageFeedback }}
      </p>
    </section>
  }
  @if (runtime.state().stage === 'showcase') {
    <div class="show-controls">
      <div>
        <span>{{ readOnly() ? 'FILED PACKAGE' : 'ON AIR' }}</span
        ><strong
          >{{ runtime.state().activeSegmentIndex + 1 }} /
          {{ runtime.state().schedule.length }}</strong
        ><small
          >NEXT:
          {{
            runtime.state().schedule[runtime.state().activeSegmentIndex + 1]?.headline ||
              'Closing analysis'
          }}</small
        >
      </div>
      @if (!readOnly() && runtime.canProduce()) {
        <button
          type="button"
          (click)="runtime.previousSegment()"
          [disabled]="runtime.state().activeSegmentIndex === 0"
        >
          \u2190 Previous</button
        ><button type="button" class="hold" (click)="runtime.holdShow()">
          {{ runtime.state().showStatus === 'held' ? 'Resume' : 'Hold' }}</button
        ><button
          type="button"
          class="take"
          (click)="runtime.nextSegment()"
          [disabled]="runtime.state().activeSegmentIndex === runtime.state().schedule.length - 1"
        >
          Take next \u2192</button
        ><button type="button" (click)="runtime.endShow()">End show</button>
      }
    </div>
    <details class="reflection" [open]="!readOnly()">
      <summary>After the broadcast: reflection</summary>
      <h2>After the broadcast</h2>
      <label
        >{{
          runtime.config.reflectionPrompt ||
            'Which claim changed after hearing another perspective, and which evidence changed it?'
        }}<textarea
          [readOnly]="readOnly()"
          rows="5"
          [value]="runtime.state().reflection || ''"
          (input)="runtime.updateReflection($any($event.target).value)"
        ></textarea>
      </label>
      @if (!readOnly()) {
        <button type="button" (click)="runtime.saveReflection()">Save reflection revision</button>
      }
      <details>
        <summary>Earlier reflections</summary>
        @for (entry of runtime.state().reflectionHistory || []; track $index) {
          <p>{{ entry.timestamp }} \xB7 {{ entry.text }}</p>
        }
      </details>
    </details>
    @if (!readOnly()) {
      <aside class="audience-bar">
        <span>AUDIENCE RESPONSE</span>
        <p>Which signal best matches this report?</p>
        @for (
          reaction of [
            'Strong evidence',
            'Interesting perspective',
            'Clear explanation',
            'Question',
            'Applause',
          ];
          track reaction
        ) {
          <button type="button" (click)="runtime.react(reaction)">
            {{ reaction }} <small>{{ reactionCount(reaction) || '' }}</small>
          </button>
        }
      </aside>
    }
  }
  @if (readOnly()) {
    <details class="sample-record">
      <summary>Inside the completed package: sources and review</summary>
      <h2>Inside the completed package</h2>
      <details>
        <summary>Producer rundown \xB7 {{ runtime.state().schedule.length }} filed package</summary>
        @for (segment of runtime.state().schedule; track segment.id) {
          <p>
            {{ segment.startLabel }} \xB7 {{ segment.headline }} \xB7
            {{ segment.durationSeconds }} seconds \xB7 {{ segment.reporter }}
          </p>
        }
      </details>
      <details>
        <summary>Claim \u2192 source \u2192 reasoning</summary>
        @for (claim of runtime.state().claims; track claim.id) {
          <article>
            <h3>{{ claim.text }}</h3>
            @for (link of claim.evidence || []; track link.sourceId) {
              <p>
                <strong>{{ link.relationship }} \xB7 {{ sourceTitle(link.sourceId) }}</strong>
                {{ link.passage }}
              </p>
            }
            <p>{{ claim.reasoning }}</p>
            <p><strong>Source limit:</strong> {{ claim.uncertainty }}</p>
          </article>
        }
      </details>
      <details>
        <summary>Producer review history \xB7 fictional sample</summary>
        @for (review of runtime.state().reviewHistory || []; track $index) {
          <p>
            <strong>{{ review.decision }}:</strong> {{ review.feedback }}
          </p>
        }
      </details>
    </details>
  }
</section>
`, styles: ['@charset "UTF-8";\n\n/* src/app/templates/history-live/ui/broadcast-player.component.scss */\n:host {\n  display: block;\n  color: #e5ecef;\n}\n* {\n  box-sizing: border-box;\n}\nbutton {\n  font: inherit;\n}\nbutton:focus-visible {\n  outline: 3px solid #dcc07f;\n  outline-offset: 2px;\n}\n.broadcast-shell {\n  min-height: calc(100dvh - 8rem);\n  padding: 1.2rem clamp(0.7rem, 2vw, 2rem) 2rem;\n  background: #050a0e;\n}\n.preview-header {\n  display: grid;\n  grid-template-columns: 1fr minmax(15rem, 30rem) auto;\n  align-items: end;\n  gap: 1.5rem;\n  width: min(88rem, 100%);\n  margin: 0 auto 1rem;\n}\n.preview-header span {\n  color: #c4a76b;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.14em;\n}\n.preview-header h1 {\n  margin: 0.3rem 0 0;\n  color: #e8edef;\n  font: 400 clamp(1.5rem, 3vw, 2.3rem) Georgia, serif;\n}\n.preview-header p {\n  margin: 0;\n  color: #788b95;\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.preview-header > div:last-child {\n  display: flex;\n  gap: 0.4rem;\n}\n.preview-header button,\n.show-controls button {\n  min-height: 2.7rem;\n  border: 1px solid #384c57;\n  padding: 0 0.8rem;\n  color: #aabcc4;\n  background: #12212a;\n  font-size: 0.8rem;\n  font-weight: 850;\n  cursor: pointer;\n}\n.preview-header button:last-child {\n  border: 0;\n  color: #12212a;\n  background: #d0b171;\n}\n.broadcast-frame {\n  position: relative;\n  width: min(88rem, 100%);\n  aspect-ratio: 16/9;\n  min-height: 29rem;\n  margin: 0 auto;\n  overflow: hidden;\n  border: 1px solid #3c4850;\n  background: url(/history-live/broadcast-studio.webp) center/cover no-repeat;\n  box-shadow: 0 2rem 5rem #000;\n  isolation: isolate;\n}\n.broadcast-frame::after {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  inset: 0;\n  background:\n    linear-gradient(\n      0deg,\n      rgba(0, 4, 7, 0.5),\n      transparent 45%),\n    radial-gradient(\n      circle at center,\n      transparent 5%,\n      rgba(1, 6, 10, 0.24) 78%);\n}\n.recording-poster {\n  position: absolute;\n  z-index: 10;\n  inset: 0;\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.media-wall {\n  position: absolute;\n  top: 17%;\n  left: 30.7%;\n  display: grid;\n  width: 38.5%;\n  height: 36%;\n  place-items: center;\n  align-content: center;\n  padding: 1rem;\n  text-align: center;\n  text-shadow: 0 0.15rem 0.5rem #000;\n}\n.media-wall span {\n  color: #d7b978;\n  font-size: clamp(0.45rem, 0.8vw, 0.7rem);\n  font-weight: 900;\n  letter-spacing: 0.18em;\n}\n.media-wall strong {\n  max-width: 26rem;\n  margin: 0.65rem 0;\n  color: #eff4f6;\n  font: 400 clamp(1.1rem, 2.5vw, 2.4rem)/1.05 Georgia, serif;\n}\n.media-wall small {\n  color: #96aab5;\n  font-size: clamp(0.35rem, 0.7vw, 0.55rem);\n  letter-spacing: 0.1em;\n}\n.network-logo {\n  position: absolute;\n  top: 3.5%;\n  left: 2.5%;\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  color: #dce8ee;\n}\n.network-logo > span {\n  display: grid;\n  width: 2.9rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #8bb1cb;\n  color: #a9c8dc;\n  background: rgba(18, 46, 65, 0.9);\n  font: 900 1rem Georgia, serif;\n  transform: rotate(45deg);\n}\n.network-logo.british > span {\n  border-color: #d08b81;\n  color: #e0a59b;\n  background: rgba(69, 30, 29, 0.9);\n}\n.network-logo small {\n  max-width: 6rem;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.live-indicator {\n  position: absolute;\n  top: 3.5%;\n  right: 2.5%;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.38rem 0.6rem;\n  color: #fff;\n  background: #a93630;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n}\n.live-indicator i {\n  width: 0.4rem;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  background: #fff;\n  animation: pulse 1.4s infinite;\n}\n.is-held .live-indicator {\n  background: #a9742f;\n}\n.broadcast-clock {\n  position: absolute;\n  top: 10%;\n  right: 2.5%;\n  color: #d7e0e4;\n  font: 700 0.65rem "Courier New", monospace;\n}\n.reporter-silhouette {\n  position: absolute;\n  right: 17%;\n  bottom: 22%;\n  width: 12%;\n  height: 33%;\n  filter: drop-shadow(0 0.5rem 0.8rem rgba(0, 0, 0, 0.55));\n}\n.reporter-silhouette span {\n  position: absolute;\n  top: 0;\n  left: 30%;\n  width: 40%;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      145deg,\n      #a8b1b3,\n      #4e5a61);\n}\n.reporter-silhouette i {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 73%;\n  border-radius: 45% 45% 12% 12%;\n  background:\n    linear-gradient(\n      120deg,\n      #3c4d57,\n      #111b22);\n  clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);\n}\n.lower-third {\n  position: absolute;\n  z-index: 2;\n  right: 5%;\n  bottom: 8%;\n  left: 5%;\n  display: flex;\n  border-left: 5px solid #ad3731;\n  background: rgba(7, 17, 24, 0.94);\n  box-shadow: 0 0.5rem 1.8rem rgba(0, 0, 0, 0.45);\n}\n.lower-third > span {\n  display: flex;\n  min-width: 8rem;\n  align-items: center;\n  padding: 0.8rem 1rem;\n  color: #eedba9;\n  background: #21384a;\n  font-size: clamp(0.45rem, 0.7vw, 0.62rem);\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.lower-third > div {\n  padding: 0.65rem 1rem;\n}\n.lower-third strong,\n.lower-third small {\n  display: block;\n}\n.lower-third strong {\n  color: #f1f4f4;\n  font: 700 clamp(0.85rem, 1.7vw, 1.45rem) Georgia, serif;\n}\n.lower-third small {\n  margin-top: 0.22rem;\n  color: #91a4ae;\n  font-size: clamp(0.4rem, 0.7vw, 0.58rem);\n  text-transform: uppercase;\n}\n.news-ticker {\n  position: absolute;\n  z-index: 2;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  min-height: 5%;\n  align-items: center;\n  overflow: hidden;\n  color: #192931;\n  background: #e4e7e3;\n  font-size: clamp(0.4rem, 0.7vw, 0.58rem);\n}\n.news-ticker strong {\n  align-self: stretch;\n  display: flex;\n  align-items: center;\n  padding: 0 1.1rem;\n  color: #fff;\n  background: #a63630;\n  font-size: inherit;\n}\n.news-ticker div {\n  display: flex;\n  gap: 4rem;\n  padding-left: 1rem;\n  white-space: nowrap;\n  animation: ticker 26s linear infinite;\n}\n.news-ticker div span::before {\n  content: "\\25c6";\n  margin-right: 0.7rem;\n  color: #a47f42;\n}\n.state-overlay {\n  position: absolute;\n  z-index: 4;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  align-content: center;\n  gap: 1rem;\n  color: #f4e4be;\n  background: rgba(3, 8, 12, 0.8);\n  text-align: center;\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n}\n.state-overlay span {\n  font-size: clamp(1rem, 3vw, 2.3rem);\n  font-weight: 900;\n  letter-spacing: 0.18em;\n}\n.state-overlay strong {\n  max-width: 35rem;\n  color: #bbc9cf;\n  font: 400 clamp(1rem, 2vw, 1.5rem) Georgia, serif;\n}\n.show-controls {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  width: min(88rem, 100%);\n  margin: 0.8rem auto;\n}\n.show-controls > div {\n  display: grid;\n  grid-template-columns: auto auto;\n  align-items: center;\n  gap: 0.1rem 0.6rem;\n  margin-right: auto;\n}\n.show-controls > div span {\n  color: #d0b16e;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n}\n.show-controls > div strong {\n  color: #dce5e8;\n  font: 400 1.2rem Georgia, serif;\n}\n.show-controls > div small {\n  grid-column: 1/-1;\n  color: #6e818b;\n  font-size: 0.8rem;\n}\n.show-controls button.take {\n  border: 0;\n  color: #14212a;\n  background: #d2b372;\n}\n.show-controls button.hold {\n  color: #e0c28a;\n  border-color: #8a7040;\n}\n.show-controls button:disabled {\n  opacity: 0.35;\n  cursor: not-allowed;\n}\n.audience-bar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  width: min(88rem, 100%);\n  margin: 1rem auto 0;\n  border-top: 1px solid #293b46;\n  padding-top: 1rem;\n}\n.audience-bar > span {\n  color: #c3a467;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n}\n.audience-bar p {\n  margin: 0 0.5rem;\n  color: #778b95;\n  font-size: 0.8rem;\n}\n.audience-bar button {\n  border: 1px solid #2d414b;\n  border-radius: 2rem;\n  padding: 0.4rem 0.65rem;\n  color: #9badb5;\n  background: #101d25;\n  font-size: 0.8rem;\n  cursor: pointer;\n}\n.audience-bar button:hover {\n  border-color: #aa8e56;\n  color: #eedba9;\n}\n.audience-bar small {\n  color: #d6b778;\n}\n@keyframes pulse {\n  50% {\n    opacity: 0.35;\n  }\n}\n@keyframes ticker {\n  to {\n    transform: translateX(-45%);\n  }\n}\n@media (max-width: 800px) {\n  .preview-header {\n    grid-template-columns: 1fr;\n  }\n  .broadcast-frame {\n    min-height: auto;\n  }\n  .show-controls {\n    flex-wrap: wrap;\n  }\n  .show-controls > div {\n    width: 100%;\n    margin-bottom: 0.4rem;\n  }\n  .audience-bar {\n    align-items: flex-start;\n    flex-wrap: wrap;\n  }\n  .audience-bar p {\n    width: 100%;\n    text-align: center;\n  }\n  .reporter-silhouette {\n    display: none;\n  }\n}\n@media (max-width: 520px) {\n  .broadcast-shell {\n    padding-inline: 0.35rem;\n  }\n  .broadcast-frame {\n    aspect-ratio: 4/3;\n  }\n  .lower-third {\n    right: 2%;\n    bottom: 9%;\n    left: 2%;\n  }\n  .lower-third > span {\n    min-width: auto;\n    padding: 0.5rem;\n  }\n  .network-logo small,\n  .broadcast-clock {\n    display: none;\n  }\n  .media-wall {\n    top: 18%;\n    left: 24%;\n    width: 52%;\n    height: 34%;\n  }\n  .show-controls button {\n    flex: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .news-ticker div,\n  .live-indicator i {\n    animation: none;\n  }\n}\nbutton,\nselect,\ninput {\n  min-height: 2.75rem;\n}\ntextarea {\n  font: inherit;\n  line-height: 1.5;\n}\nbutton[aria-disabled=true] {\n  opacity: 0.65;\n}\n.package-content,\n.reflection {\n  max-width: 70rem;\n  margin: 1rem auto;\n  padding: 1rem;\n  background: #162a35;\n  color: #eff3ef;\n}\n.package-content video {\n  display: block;\n  width: 100%;\n  max-height: 32rem;\n}\n.package-content a {\n  color: #f3d591;\n}\n.package-content button,\n.reflection button {\n  margin: 0.4rem;\n  padding: 0.6rem;\n}\n.reflection label {\n  display: grid;\n  gap: 0.6rem;\n}\n.reflection textarea {\n  width: 100%;\n  font-size: 1rem;\n}\n.transcript {\n  white-space: pre-wrap;\n  line-height: 1.6;\n}\n.media-wall {\n  overflow: auto;\n}\n.media-wall app-history-live-evidence-scene {\n  width: 100%;\n}\n.sample-record {\n  padding: 28px;\n  background: #152a33;\n  color: #e7efe9;\n}\n.sample-record h2 {\n  font: 1.6rem Georgia, serif;\n}\n.sample-record details {\n  border-top: 1px solid #3d555e;\n  padding: 16px 0;\n}\n.sample-record summary {\n  cursor: pointer;\n  font-weight: 700;\n}\n.sample-record p {\n  line-height: 1.7;\n  font-size: 0.88rem;\n}\n.sample-record article {\n  padding: 16px;\n  background: #203841;\n  margin: 12px 0;\n}\n.sample-record h3 {\n  font-size: 1rem;\n}\n.sample-record details:focus-visible {\n  outline: 3px solid #e1bb77;\n}\ntextarea[readonly] {\n  background: #122832;\n  color: #edf4ef;\n}\n.package-content nav {\n  flex-wrap: wrap;\n}\n.package-content nav {\n  display: flex;\n  gap: 7px;\n}\n.package-content nav button {\n  border: 1px solid #567582;\n  border-radius: 5px;\n  background: #244350;\n  color: #f1f4e9;\n  cursor: pointer;\n  margin: 0;\n  padding: 10px 14px;\n}\n.package-content nav button[aria-pressed=true] {\n  background: #d7b56d;\n  color: #1b2d31;\n}\n.media-wall {\n  align-content: start;\n}\n@media (max-width: 800px) {\n  .broadcast-frame {\n    aspect-ratio: auto;\n    min-height: 0;\n    padding: 78px 12px 140px;\n  }\n  .broadcast-frame.has-recording-poster {\n    aspect-ratio: 16/9;\n    padding: 0;\n  }\n  .media-wall {\n    position: relative;\n    inset: auto;\n    width: 100%;\n    height: auto;\n    overflow: visible;\n    padding: 0;\n  }\n  .reporter-silhouette {\n    display: none;\n  }\n  .lower-third {\n    bottom: 42px;\n  }\n  .lower-third strong {\n    font-size: 1rem;\n  }\n  .sample-record {\n    padding: 20px;\n  }\n  .live-indicator {\n    font-size: 0.6rem;\n  }\n}\ndetails > summary {\n  cursor: pointer;\n  padding: 12px;\n  font-weight: 700;\n}\n.broadcast-frame {\n  min-height: 0;\n  height: clamp(250px, 40dvh, 440px);\n}\n.broadcast-shell video {\n  max-height: 40dvh;\n  width: 100%;\n  object-fit: contain;\n}\n/*# sourceMappingURL=broadcast-player.component.css.map */\n'] }]
  }], () => [], { readOnly: [{ type: Input, args: [{ isSignal: true, alias: "readOnly", required: false }] }], sceneHeading: [{ type: ViewChild, args: ["sceneHeading", { isSignal: true }] }], video: [{ type: ViewChild, args: ["reportVideo", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BroadcastPlayerComponent, { className: "BroadcastPlayerComponent", filePath: "src/app/templates/history-live/ui/broadcast-player.component.ts", lineNumber: 25 });
})();

export {
  EvidenceSceneComponent,
  BroadcastPlayerComponent
};
//# debugId=e2314b10-4d6b-5dbb-8ec9-e9003a864a4d
//# sourceMappingURL=chunk-NRMCZWCO.js.map
