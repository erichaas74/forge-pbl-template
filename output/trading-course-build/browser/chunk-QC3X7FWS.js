import {
  Component,
  Input,
  ViewChild,
  input,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";

// src/app/shared/inquiry/inquiry-example.component.ts
var _c0 = ["player"];
var _forTrack0 = ($index, $item) => $item.startSeconds;
function InquiryExampleComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 10);
    \u0275\u0275text(1, "This video could not load. You can still read its full transcript below.");
    \u0275\u0275domElementEnd();
  }
}
function InquiryExampleComponent_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const point_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(point_r1);
  }
}
function InquiryExampleComponent_For_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "section", 14)(1, "button", 16);
    \u0275\u0275domListener("click", function InquiryExampleComponent_For_35_Template_button_click_1_listener() {
      const \u0275$index_58_r3 = \u0275\u0275restoreView(_r2).$index;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.jump(\u0275$index_58_r3));
    });
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const chapter_r5 = ctx.$implicit;
    const \u0275$index_58_r3 = ctx.$index;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", !ctx_r3.ready() || ctx_r3.failed());
    \u0275\u0275attribute("aria-pressed", ctx_r3.activeChapter() === \u0275$index_58_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r3.time(chapter_r5.startSeconds), " \xB7 ", chapter_r5.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(chapter_r5.text);
  }
}
function InquiryExampleComponent_For_40_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 17);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const source_r6 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("href", source_r6.sourceUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", source_r6.title, " \u2197");
  }
}
function InquiryExampleComponent_For_40_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, InquiryExampleComponent_For_40_Conditional_0_Conditional_2_Template, 2, 2, "a", 17);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const source_r6 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", source_r6.citation, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(source_r6.sourceUrl ? 2 : -1);
  }
}
function InquiryExampleComponent_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, InquiryExampleComponent_For_40_Conditional_0_Template, 3, 2, "p");
  }
  if (rf & 2) {
    let tmp_11_0;
    const id_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_11_0 = ctx_r3.credit(id_r7)) ? 0 : -1, tmp_11_0);
  }
}
var InquiryExampleComponent = class _InquiryExampleComponent {
  example = input.required(
    ...ngDevMode ? [{ debugName: "example" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sources = input.required(
    ...ngDevMode ? [{ debugName: "sources" }] : (
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
  failed = signal(
    false,
    ...ngDevMode ? [{ debugName: "failed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ready = signal(
    false,
    ...ngDevMode ? [{ debugName: "ready" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeChapter = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "activeChapter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  time(seconds) {
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  }
  jump(index) {
    const video = this.player()?.nativeElement;
    if (!video || !this.ready() || !this.example().chapters[index])
      return;
    video.pause();
    video.currentTime = this.example().chapters[index].startSeconds;
    this.activeChapter.set(index);
    video.focus();
  }
  credit(id) {
    return this.sources().find((s) => s.id === id);
  }
  static \u0275fac = function InquiryExampleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InquiryExampleComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InquiryExampleComponent, selectors: [["app-inquiry-example"]], viewQuery: function InquiryExampleComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.player, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { example: [1, "example"], sources: [1, "sources"] }, decls: 41, vars: 13, consts: [["player", ""], [1, "worked-example"], [1, "example-heading"], [1, "eyebrow"], [1, "duration"], [3, "id"], [1, "intro"], [1, "example-columns"], ["controls", "", "playsinline", "", "preload", "metadata", 3, "loadedmetadata", "error", "poster", "src"], ["kind", "captions", "label", "English", "srclang", "en", 3, "src"], ["role", "alert"], [1, "small"], ["download", "", 3, "href"], ["aria-label", "What to notice in the example"], [1, "transcript-section"], [1, "example-sources"], ["type", "button", 3, "click", "disabled"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"]], template: function InquiryExampleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 1)(1, "div", 2)(2, "span", 3);
      \u0275\u0275text(3);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "span", 4);
      \u0275\u0275text(5);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(6, "h3", 5);
      \u0275\u0275text(7);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "p", 6);
      \u0275\u0275text(9);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "div", 7)(11, "div")(12, "video", 8, 0);
      \u0275\u0275domListener("loadedmetadata", function InquiryExampleComponent_Template_video_loadedmetadata_12_listener() {
        return ctx.ready.set(true);
      })("error", function InquiryExampleComponent_Template_video_error_12_listener() {
        return ctx.failed.set(true);
      });
      \u0275\u0275domElement(14, "track", 9);
      \u0275\u0275text(15, " Your browser cannot play this video. Read the transcript below. ");
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(16, InquiryExampleComponent_Conditional_16_Template, 2, 0, "p", 10);
      \u0275\u0275domElementStart(17, "p", 11);
      \u0275\u0275text(18);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(19, "a", 12);
      \u0275\u0275text(20, "Download the example video");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(21, "aside", 13)(22, "strong");
      \u0275\u0275text(23, "Watch for these things");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(24, "ul");
      \u0275\u0275repeaterCreate(25, InquiryExampleComponent_For_26_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(27, "p");
      \u0275\u0275text(28, "Use the structure as a guide. Create your own report and explain your own evidence.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(29, "p", 11);
      \u0275\u0275text(30, "Watching an example does not complete a lesson or a standard.");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(31, "details")(32, "summary");
      \u0275\u0275text(33, "Read the news piece and jump to a section");
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(34, InquiryExampleComponent_For_35_Template, 5, 5, "section", 14, _forTrack0);
      \u0275\u0275domElementStart(36, "div", 15)(37, "strong");
      \u0275\u0275text(38, "Sources used in this model");
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(39, InquiryExampleComponent_For_40_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275attribute("aria-labelledby", ctx.example().id + "-title");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.example().lesson === 1 ? "Launch \xB7 sample news piece" : "Final project \xB7 example video");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.time(ctx.example().durationSeconds), " \xB7 Model work");
      \u0275\u0275advance();
      \u0275\u0275domProperty("id", ctx.example().id + "-title");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.example().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.example().summary);
      \u0275\u0275advance(3);
      \u0275\u0275domProperty("poster", ctx.example().posterUrl)("src", ctx.example().videoUrl, \u0275\u0275sanitizeUrl);
      \u0275\u0275attribute("aria-label", ctx.example().title + " \u2014 example video");
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("src", ctx.example().captionsUrl);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.failed() ? 16 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Captions are included in the picture. ", ctx.example().attribution);
      \u0275\u0275advance();
      \u0275\u0275domProperty("href", ctx.example().videoUrl, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.example().lookFors);
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.example().chapters);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.example().sourceIds);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  margin: 22px 0 28px;\n}\n.worked-example[_ngcontent-%COMP%] {\n  padding: clamp(16px, 2.2vw, 28px);\n  border: 1px solid #a8bbb2;\n  border-radius: 14px;\n  background: #edf4ef;\n  color: #153b43;\n}\n.example-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font: 800 12px/1.5 system-ui, sans-serif;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.duration[_ngcontent-%COMP%] {\n  font: 600 13px/1.5 system-ui, sans-serif;\n  color: #466268;\n}\nh3[_ngcontent-%COMP%] {\n  font: 600 clamp(24px, 2.4vw, 32px)/1.2 Georgia, serif;\n  margin: 12px 0;\n}\n.intro[_ngcontent-%COMP%] {\n  font: 18px/1.55 system-ui, sans-serif;\n  max-width: 900px;\n  margin-bottom: 20px;\n}\n.example-columns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.8fr) minmax(220px, 1fr);\n  gap: 24px;\n}\nvideo[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16/9;\n  border-radius: 10px;\n  background: #102c35;\n}\naside[_ngcontent-%COMP%] {\n  font: 16px/1.65 system-ui, sans-serif;\n}\nul[_ngcontent-%COMP%] {\n  padding-left: 22px;\n}\nli[_ngcontent-%COMP%] {\n  margin: 10px 0;\n}\n.small[_ngcontent-%COMP%] {\n  font: 13px/1.6 system-ui, sans-serif;\n  color: #466168;\n}\na[_ngcontent-%COMP%] {\n  color: #135b6b;\n  font: 600 15px/1.6 system-ui, sans-serif;\n  display: inline-block;\n  padding: 8px 0;\n  min-height: 44px;\n}\ndetails[_ngcontent-%COMP%] {\n  border-top: 1px solid #bdcdc3;\n  margin-top: 20px;\n  padding-top: 10px;\n}\nsummary[_ngcontent-%COMP%], \nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font: 700 16px/1.5 system-ui, sans-serif;\n  min-height: 48px;\n}\nsummary[_ngcontent-%COMP%] {\n  padding: 12px 0;\n}\nbutton[_ngcontent-%COMP%] {\n  border: 1px solid #9cb4b0;\n  background: #fffdf4;\n  color: #183e46;\n  border-radius: 8px;\n  padding: 10px 14px;\n  text-align: left;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: default;\n}\n.transcript-section[_ngcontent-%COMP%] {\n  margin: 16px 0 24px;\n}\n.transcript-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font: 18px/1.7 Georgia, serif;\n  max-width: 900px;\n}\n.example-sources[_ngcontent-%COMP%] {\n  font: 14px/1.6 system-ui, sans-serif;\n  border-top: 1px solid #bdcdc3;\n  padding-top: 20px;\n}\n[_ngcontent-%COMP%]:is(a, button, summary, video):focus-visible {\n  outline: 3px solid #a56d20;\n  outline-offset: 4px;\n}\n@media (max-width: 760px) {\n  .example-columns[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  aside[_ngcontent-%COMP%] {\n    border-top: 1px solid #bdcdc3;\n    padding-top: 18px;\n  }\n}\n/*# sourceMappingURL=inquiry-example.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InquiryExampleComponent, [{
    type: Component,
    args: [{ selector: "app-inquiry-example", template: `<section class="worked-example" [attr.aria-labelledby]="example().id + '-title'">
  <div class="example-heading">
    <span class="eyebrow">{{
      example().lesson === 1 ? 'Launch \xB7 sample news piece' : 'Final project \xB7 example video'
    }}</span>
    <span class="duration">{{ time(example().durationSeconds) }} \xB7 Model work</span>
  </div>
  <h3 [id]="example().id + '-title'">{{ example().title }}</h3>
  <p class="intro">{{ example().summary }}</p>
  <div class="example-columns">
    <div>
      <video
        #player
        controls
        playsinline
        preload="metadata"
        [poster]="example().posterUrl"
        [src]="example().videoUrl"
        [attr.aria-label]="example().title + ' \u2014 example video'"
        (loadedmetadata)="ready.set(true)"
        (error)="failed.set(true)"
      >
        <track kind="captions" label="English" srclang="en" [src]="example().captionsUrl" />
        Your browser cannot play this video. Read the transcript below.
      </video>
      @if (failed()) {
        <p role="alert">This video could not load. You can still read its full transcript below.</p>
      }
      <p class="small">Captions are included in the picture. {{ example().attribution }}</p>
      <a [href]="example().videoUrl" download>Download the example video</a>
    </div>
    <aside aria-label="What to notice in the example">
      <strong>Watch for these things</strong>
      <ul>
        @for (point of example().lookFors; track point) {
          <li>{{ point }}</li>
        }
      </ul>
      <p>Use the structure as a guide. Create your own report and explain your own evidence.</p>
      <p class="small">Watching an example does not complete a lesson or a standard.</p>
    </aside>
  </div>
  <details>
    <summary>Read the news piece and jump to a section</summary>
    @for (chapter of example().chapters; track chapter.startSeconds; let i = $index) {
      <section class="transcript-section">
        <button
          type="button"
          [disabled]="!ready() || failed()"
          [attr.aria-pressed]="activeChapter() === i"
          (click)="jump(i)"
        >
          {{ time(chapter.startSeconds) }} \xB7 {{ chapter.label }}
        </button>
        <p>{{ chapter.text }}</p>
      </section>
    }
    <div class="example-sources">
      <strong>Sources used in this model</strong>
      @for (id of example().sourceIds; track id) {
        @if (credit(id); as source) {
          <p>
            {{ source.citation }}
            @if (source.sourceUrl) {
              <a [href]="source.sourceUrl" target="_blank" rel="noopener noreferrer"
                >{{ source.title }} \u2197</a
              >
            }
          </p>
        }
      }
    </div>
  </details>
</section>
`, styles: ["/* src/app/shared/inquiry/inquiry-example.component.scss */\n:host {\n  display: block;\n  margin: 22px 0 28px;\n}\n.worked-example {\n  padding: clamp(16px, 2.2vw, 28px);\n  border: 1px solid #a8bbb2;\n  border-radius: 14px;\n  background: #edf4ef;\n  color: #153b43;\n}\n.example-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.eyebrow {\n  font: 800 12px/1.5 system-ui, sans-serif;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.duration {\n  font: 600 13px/1.5 system-ui, sans-serif;\n  color: #466268;\n}\nh3 {\n  font: 600 clamp(24px, 2.4vw, 32px)/1.2 Georgia, serif;\n  margin: 12px 0;\n}\n.intro {\n  font: 18px/1.55 system-ui, sans-serif;\n  max-width: 900px;\n  margin-bottom: 20px;\n}\n.example-columns {\n  display: grid;\n  grid-template-columns: minmax(0, 1.8fr) minmax(220px, 1fr);\n  gap: 24px;\n}\nvideo {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16/9;\n  border-radius: 10px;\n  background: #102c35;\n}\naside {\n  font: 16px/1.65 system-ui, sans-serif;\n}\nul {\n  padding-left: 22px;\n}\nli {\n  margin: 10px 0;\n}\n.small {\n  font: 13px/1.6 system-ui, sans-serif;\n  color: #466168;\n}\na {\n  color: #135b6b;\n  font: 600 15px/1.6 system-ui, sans-serif;\n  display: inline-block;\n  padding: 8px 0;\n  min-height: 44px;\n}\ndetails {\n  border-top: 1px solid #bdcdc3;\n  margin-top: 20px;\n  padding-top: 10px;\n}\nsummary,\nbutton {\n  cursor: pointer;\n  font: 700 16px/1.5 system-ui, sans-serif;\n  min-height: 48px;\n}\nsummary {\n  padding: 12px 0;\n}\nbutton {\n  border: 1px solid #9cb4b0;\n  background: #fffdf4;\n  color: #183e46;\n  border-radius: 8px;\n  padding: 10px 14px;\n  text-align: left;\n}\nbutton:disabled {\n  opacity: 0.6;\n  cursor: default;\n}\n.transcript-section {\n  margin: 16px 0 24px;\n}\n.transcript-section p {\n  font: 18px/1.7 Georgia, serif;\n  max-width: 900px;\n}\n.example-sources {\n  font: 14px/1.6 system-ui, sans-serif;\n  border-top: 1px solid #bdcdc3;\n  padding-top: 20px;\n}\n:is(a, button, summary, video):focus-visible {\n  outline: 3px solid #a56d20;\n  outline-offset: 4px;\n}\n@media (max-width: 760px) {\n  .example-columns {\n    grid-template-columns: 1fr;\n  }\n  aside {\n    border-top: 1px solid #bdcdc3;\n    padding-top: 18px;\n  }\n}\n/*# sourceMappingURL=inquiry-example.component.css.map */\n"] }]
  }], null, { example: [{ type: Input, args: [{ isSignal: true, alias: "example", required: true }] }], sources: [{ type: Input, args: [{ isSignal: true, alias: "sources", required: true }] }], player: [{ type: ViewChild, args: ["player", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InquiryExampleComponent, { className: "InquiryExampleComponent", filePath: "src/app/shared/inquiry/inquiry-example.component.ts", lineNumber: 9 });
})();

export {
  InquiryExampleComponent
};
//# debugId=d9e994f2-6252-5718-affd-eaabc9964d71
//# sourceMappingURL=chunk-QC3X7FWS.js.map
