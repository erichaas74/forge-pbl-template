import {
  BroadcastPlayerComponent,
  EvidenceSceneComponent
} from "./chunk-NRMCZWCO.js";
import {
  HISTORY_LIVE_STAGES,
  HistoryLiveRuntimeService,
  formatBroadcastTime,
  pitchMissingRequirements,
  researchItems
} from "./chunk-OU3KDHT5.js";
import {
  INQUIRY_WORKSPACE,
  InquiryWorkspaceComponent
} from "./chunk-HK5V4SOG.js";
import "./chunk-QC3X7FWS.js";
import "./chunk-H7BIYLRY.js";
import {
  WorkspaceToolsComponent
} from "./chunk-NDJR5R7S.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-UW6DFD2Z.js";
import {
  bindLessonFocus
} from "./chunk-3C62DQOL.js";
import "./chunk-2WXJ5NX3.js";
import {
  TaskGuideComponent
} from "./chunk-FBZ4EUOY.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injectable,
  Injector,
  Input,
  Output,
  ViewChild,
  afterNextRender,
  afterRenderEffect,
  computed,
  forwardRef,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵariaProperty,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
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
  ɵɵtextInterpolate4,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/history-live/ui/research-shelf-state.ts
var ResearchShelfState = class _ResearchShelfState {
  categories = signal(
    [],
    ...ngDevMode ? [{ debugName: "categories" }] : (
      /* istanbul ignore next */
      []
    )
  );
  items = signal(
    [],
    ...ngDevMode ? [{ debugName: "items" }] : (
      /* istanbul ignore next */
      []
    )
  );
  focusRequest = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "focusRequest" }] : (
      /* istanbul ignore next */
      []
    )
  );
  open(category) {
    if (!this.categories().includes(category))
      this.categories.update((ids) => [...ids, category]);
    this.focusRequest.set({ category });
  }
  toggleCategory(category) {
    this.categories.update((ids) => ids.includes(category) ? ids.filter((id) => id !== category) : [...ids, category]);
  }
  toggleItem(id) {
    this.items.update((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);
  }
  static \u0275fac = function ResearchShelfState_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ResearchShelfState)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ResearchShelfState, factory: _ResearchShelfState.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResearchShelfState, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/templates/history-live/ui/story-investigation-preview.component.ts
var _forTrack0 = ($index, $item) => $item.category;
function StoryInvestigationPreviewComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 2)(1, "span");
    \u0275\u0275text(2, "Your developing story");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.headline());
  }
}
function StoryInvestigationPreviewComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article")(1, "span", 1);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "button", 6);
    \u0275\u0275domListener("click", function StoryInvestigationPreviewComponent_For_11_Template_button_click_7_listener() {
      const part_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.shelf.open(part_r3.category));
    });
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const part_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(part_r3.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(part_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(part_r3.lookFor);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Open ", part_r3.label, " \u2192");
  }
}
var StoryInvestigationPreviewComponent = class _StoryInvestigationPreviewComponent {
  shelf = inject(ResearchShelfState);
  guide = [
    {
      category: "documents",
      label: "Primary source documents",
      title: "Examine the record",
      lookFor: "Look for the creator, date, recipient, place, and document type. Read the original wording or inspect the document image."
    },
    {
      category: "witnesses",
      label: "Witness testimony",
      title: "Read an account",
      lookFor: "Look for who gave the account, when it was recorded, where the person was, and what they say they saw or heard."
    },
    {
      category: "events",
      label: "Live events",
      title: "Follow the sequence",
      lookFor: "Look at the dates, locations, people, and recorded actions. Check which source is attached to each event record."
    },
    {
      category: "interviews",
      label: "Interviews",
      title: "Explore questions and answers",
      lookFor: "Read the speaker\u2019s name and role, the question, and the cited record. These scripted summaries are separate from the original documents."
    }
  ];
  historicalEvent = input.required(
    ...ngDevMode ? [{ debugName: "historicalEvent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  headline = input(
    "",
    ...ngDevMode ? [{ debugName: "headline" }] : (
      /* istanbul ignore next */
      []
    )
  );
  buildStory = output();
  static \u0275fac = function StoryInvestigationPreviewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StoryInvestigationPreviewComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StoryInvestigationPreviewComponent, selectors: [["app-history-live-story-investigation-preview"]], inputs: { historicalEvent: [1, "historicalEvent"], headline: [1, "headline"] }, outputs: { buildStory: "buildStory" }, decls: 22, vars: 2, consts: [["aria-label", "Enter the moment guide", 1, "moment-guide"], [1, "eyebrow"], [1, "story-context"], [1, "guide-grid"], [1, "observation-note"], ["type", "button", 1, "build-story-button", 3, "click"], ["type", "button", 3, "click"]], template: function StoryInvestigationPreviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "header")(2, "p", 1);
      \u0275\u0275text(3);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "h2");
      \u0275\u0275text(5, "Look around before you write.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "p");
      \u0275\u0275text(7, " Open a category in either side panel. Read its short descriptions, then choose a record to examine. The panels stay with you throughout My Work. ");
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(8, StoryInvestigationPreviewComponent_Conditional_8_Template, 4, 1, "p", 2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "div", 3);
      \u0275\u0275repeaterCreate(10, StoryInvestigationPreviewComponent_For_11_Template, 9, 4, "article", null, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "section", 4)(13, "h3");
      \u0275\u0275text(14, "Keep a record of what you find.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(15, "p");
      \u0275\u0275text(16, " Note names, dates, places, actions, and exact words. Keep the source\u2019s words separate from your own notes. Pin records you want to return to; they remain available while you write and prepare your presentation. ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(17, "p");
      \u0275\u0275text(18, "Then decide what you want to investigate.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(19, "footer")(20, "button", 5);
      \u0275\u0275domListener("click", function StoryInvestigationPreviewComponent_Template_button_click_20_listener() {
        return ctx.buildStory.emit();
      });
      \u0275\u0275text(21, " Build My Story \u2192 ");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.historicalEvent());
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.headline() ? 8 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.guide);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.moment-guide[_ngcontent-%COMP%] {\n  color: #223c46;\n  background: #fbfaf5;\n  padding: clamp(18px, 3vw, 32px);\n  border: 1px solid #d6ddd8;\n  border-radius: 14px;\n  font:\n    15px/1.6 Inter,\n    Arial,\n    sans-serif;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 6px 0 12px;\n  font-size: clamp(24px, 2.5vw, 34px);\n  line-height: 1.15;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 5px 0 8px;\n  font-size: 17px;\n  line-height: 1.3;\n}\np[_ngcontent-%COMP%] {\n  margin: 8px 0 16px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  font-size: 10px;\n  font-weight: 800;\n  color: #53717b;\n}\n.story-context[_ngcontent-%COMP%] {\n  padding: 12px;\n  background: #e9f0ed;\n  border-left: 3px solid #527f8e;\n}\n.story-context[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n}\n.guide-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n  margin: 24px 0;\n}\narticle[_ngcontent-%COMP%] {\n  padding: 16px;\n  border: 1px solid #d2dcd7;\n  border-radius: 10px;\n  background: #fff;\n}\narticle[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 44px;\n  background: transparent;\n  border: 1px solid #849eaa;\n  border-radius: 6px;\n  color: #244e63;\n  padding: 10px 12px;\n  font:\n    700 13px/1.4 Inter,\n    Arial,\n    sans-serif;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #267bac;\n  outline-offset: 3px;\n}\n.observation-note[_ngcontent-%COMP%] {\n  padding: 18px;\n  border-top: 1px solid #c3d3d0;\n}\nfooter[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.build-story-button[_ngcontent-%COMP%] {\n  background: #254f65;\n  color: white;\n  padding: 12px 20px;\n}\n@media (max-width: 750px) {\n  .guide-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=story-investigation-preview.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StoryInvestigationPreviewComponent, [{
    type: Component,
    args: [{ selector: "app-history-live-story-investigation-preview", changeDetection: ChangeDetectionStrategy.OnPush, template: '<section class="moment-guide" aria-label="Enter the moment guide">\n  <header>\n    <p class="eyebrow">{{ historicalEvent() }}</p>\n    <h2>Look around before you write.</h2>\n    <p>\n      Open a category in either side panel. Read its short descriptions, then choose a record to\n      examine. The panels stay with you throughout My Work.\n    </p>\n    @if (headline()) {\n      <p class="story-context"><span>Your developing story</span> {{ headline() }}</p>\n    }\n  </header>\n  <div class="guide-grid">\n    @for (part of guide; track part.category) {\n      <article>\n        <span class="eyebrow">{{ part.label }}</span>\n        <h3>{{ part.title }}</h3>\n        <p>{{ part.lookFor }}</p>\n        <button type="button" (click)="shelf.open(part.category)">Open {{ part.label }} \u2192</button>\n      </article>\n    }\n  </div>\n  <section class="observation-note">\n    <h3>Keep a record of what you find.</h3>\n    <p>\n      Note names, dates, places, actions, and exact words. Keep the source\u2019s words separate from\n      your own notes. Pin records you want to return to; they remain available while you write and\n      prepare your presentation.\n    </p>\n    <p>Then decide what you want to investigate.</p>\n  </section>\n  <footer>\n    <button type="button" class="build-story-button" (click)="buildStory.emit()">\n      Build My Story \u2192\n    </button>\n  </footer>\n</section>\n', styles: ["/* src/app/templates/history-live/ui/story-investigation-preview.component.scss */\n:host {\n  display: block;\n}\n.moment-guide {\n  color: #223c46;\n  background: #fbfaf5;\n  padding: clamp(18px, 3vw, 32px);\n  border: 1px solid #d6ddd8;\n  border-radius: 14px;\n  font:\n    15px/1.6 Inter,\n    Arial,\n    sans-serif;\n}\nh2 {\n  margin: 6px 0 12px;\n  font-size: clamp(24px, 2.5vw, 34px);\n  line-height: 1.15;\n}\nh3 {\n  margin: 5px 0 8px;\n  font-size: 17px;\n  line-height: 1.3;\n}\np {\n  margin: 8px 0 16px;\n}\n.eyebrow {\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  font-size: 10px;\n  font-weight: 800;\n  color: #53717b;\n}\n.story-context {\n  padding: 12px;\n  background: #e9f0ed;\n  border-left: 3px solid #527f8e;\n}\n.story-context span {\n  display: block;\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n}\n.guide-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n  margin: 24px 0;\n}\narticle {\n  padding: 16px;\n  border: 1px solid #d2dcd7;\n  border-radius: 10px;\n  background: #fff;\n}\narticle p {\n  font-size: 14px;\n}\nbutton {\n  min-height: 44px;\n  background: transparent;\n  border: 1px solid #849eaa;\n  border-radius: 6px;\n  color: #244e63;\n  padding: 10px 12px;\n  font:\n    700 13px/1.4 Inter,\n    Arial,\n    sans-serif;\n  cursor: pointer;\n}\nbutton:focus-visible {\n  outline: 3px solid #267bac;\n  outline-offset: 3px;\n}\n.observation-note {\n  padding: 18px;\n  border-top: 1px solid #c3d3d0;\n}\nfooter {\n  display: flex;\n  justify-content: flex-end;\n}\n.build-story-button {\n  background: #254f65;\n  color: white;\n  padding: 12px 20px;\n}\n@media (max-width: 750px) {\n  .guide-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=story-investigation-preview.component.css.map */\n"] }]
  }], null, { historicalEvent: [{ type: Input, args: [{ isSignal: true, alias: "historicalEvent", required: true }] }], headline: [{ type: Input, args: [{ isSignal: true, alias: "headline", required: false }] }], buildStory: [{ type: Output, args: ["buildStory"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StoryInvestigationPreviewComponent, { className: "StoryInvestigationPreviewComponent", filePath: "src/app/templates/history-live/ui/story-investigation-preview.component.ts", lineNumber: 11 });
})();

// src/app/templates/history-live/ui/assignment-desk.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function AssignmentDeskComponent_Conditional_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 6);
  }
  if (rf & 2) {
    const scene_r1 = ctx;
    \u0275\u0275property("src", scene_r1.imageUrl, \u0275\u0275sanitizeUrl)("alt", scene_r1.imageAlt);
  }
}
function AssignmentDeskComponent_Conditional_1_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function AssignmentDeskComponent_Conditional_1_For_11_Template_button_click_0_listener() {
      const lead_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.claimStory(lead_r3));
    });
    \u0275\u0275elementStart(1, "em");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "b");
    \u0275\u0275text(10, "CLAIM THIS STORY \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const lead_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("left", ctx_r3.advocateFor(lead_r3.id)?.leftPercent, "%")("top", ctx_r3.advocateFor(lead_r3.id)?.topPercent, "%")("width", ctx_r3.advocateFor(lead_r3.id)?.widthPercent, "%")("height", ctx_r3.advocateFor(lead_r3.id)?.heightPercent, "%");
    \u0275\u0275property("id", "lead-" + lead_r3.id);
    \u0275\u0275attribute("aria-label", "Claim story: " + lead_r3.headline);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.advocateFor(lead_r3.id)?.advocateLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r3.runtime.beatLabel(lead_r3.beatId), " \xB7 ", lead_r3.format);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lead_r3.headline);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lead_r3.location);
  }
}
function AssignmentDeskComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "header", 1)(1, "div")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h1", 2);
    \u0275\u0275text(5, "What deserves airtime?");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 3)(7, "div", 4)(8, "div", 5);
    \u0275\u0275conditionalCreate(9, AssignmentDeskComponent_Conditional_1_Conditional_9_Template, 1, 2, "img", 6);
    \u0275\u0275repeaterCreate(10, AssignmentDeskComponent_Conditional_1_For_11_Template, 11, 15, "button", 7, _forTrack02);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("ASSIGNMENT DESK \xB7 ", ctx_r3.runtime.selectedNetwork()?.shortName);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("crown-room", ctx_r3.runtime.state().selectedSide === "british");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx_r3.runtime.assignmentScene()) ? 9 : -1, tmp_3_0);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.runtime.availableLeads());
  }
}
function AssignmentDeskComponent_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "BUILD A STORY \xB7 STEP 1");
    \u0275\u0275elementEnd();
  }
}
function AssignmentDeskComponent_Conditional_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-history-live-story-investigation-preview", 28);
    \u0275\u0275listener("buildStory", function AssignmentDeskComponent_Conditional_2_Conditional_5_Template_app_history_live_story_investigation_preview_buildStory_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.setPitchStep(1));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("historicalEvent", ctx_r3.runtime.config.event)("headline", ctx_r3.runtime.state().pitch.headline);
  }
}
function AssignmentDeskComponent_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.runtime.state().pitch.feedback);
  }
}
function AssignmentDeskComponent_Conditional_2_For_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const beat_r7 = ctx.$implicit;
    \u0275\u0275property("value", beat_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(beat_r7.label);
  }
}
function AssignmentDeskComponent_Conditional_2_For_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const format_r8 = ctx.$implicit;
    \u0275\u0275property("value", format_r8);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(format_r8);
  }
}
function AssignmentDeskComponent_Conditional_2_Conditional_77_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r9);
  }
}
function AssignmentDeskComponent_Conditional_2_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul");
    \u0275\u0275repeaterCreate(1, AssignmentDeskComponent_Conditional_2_Conditional_77_For_2_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.missingRequirements());
  }
}
function AssignmentDeskComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 9)(1, "div");
    \u0275\u0275conditionalCreate(2, AssignmentDeskComponent_Conditional_2_Conditional_2_Template, 2, 0, "span");
    \u0275\u0275elementStart(3, "h1", 10);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(5, AssignmentDeskComponent_Conditional_2_Conditional_5_Template, 1, 2, "app-history-live-story-investigation-preview", 11);
    \u0275\u0275elementStart(6, "div", 12)(7, "form", 13);
    \u0275\u0275listener("submit", function AssignmentDeskComponent_Conditional_2_Template_form_submit_7_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r3.runtime.submitPitch());
    });
    \u0275\u0275conditionalCreate(8, AssignmentDeskComponent_Conditional_2_Conditional_8_Template, 2, 1, "p", 14);
    \u0275\u0275elementStart(9, "label", 15)(10, "span");
    \u0275\u0275text(11, "My headline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 16);
    \u0275\u0275listener("input", function AssignmentDeskComponent_Conditional_2_Template_input_input_12_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.updatePitch("headline", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "label", 15)(14, "span");
    \u0275\u0275text(15, "My question");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "textarea", 17);
    \u0275\u0275listener("input", function AssignmentDeskComponent_Conditional_2_Template_textarea_input_16_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.updatePitch("storyQuestion", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "label", 15)(18, "span");
    \u0275\u0275text(19, "What evidence would help me answer?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "textarea", 18);
    \u0275\u0275listener("input", function AssignmentDeskComponent_Conditional_2_Template_textarea_input_20_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.updatePitch("evidenceNeeded", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "label", 15)(22, "span");
    \u0275\u0275text(23, "What might the other newsroom challenge?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "textarea", 18);
    \u0275\u0275listener("input", function AssignmentDeskComponent_Conditional_2_Template_textarea_input_24_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.updatePitch("opposingChallenge", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "label", 15)(26, "span");
    \u0275\u0275text(27, "What do I expect the evidence to show?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "textarea", 18);
    \u0275\u0275listener("input", function AssignmentDeskComponent_Conditional_2_Template_textarea_input_28_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.updatePitch("initialPrediction", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "label", 15)(30, "span");
    \u0275\u0275text(31, "Why should my audience hear this story?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "textarea", 18);
    \u0275\u0275listener("input", function AssignmentDeskComponent_Conditional_2_Template_textarea_input_32_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.updatePitch("whyAirtime", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "label", 19);
    \u0275\u0275text(34, "Report as of ");
    \u0275\u0275elementStart(35, "input", 20);
    \u0275\u0275listener("input", function AssignmentDeskComponent_Conditional_2_Template_input_input_35_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.updatePitch("asOfDate", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "label", 19);
    \u0275\u0275text(37, "Reporting approach ");
    \u0275\u0275elementStart(38, "select", 21);
    \u0275\u0275listener("change", function AssignmentDeskComponent_Conditional_2_Template_select_change_38_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.updatePitch("reportingMode", $event));
    });
    \u0275\u0275elementStart(39, "option", 22);
    \u0275\u0275text(40, "As events unfold: no later evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "option", 23);
    \u0275\u0275text(42, "Retrospective: identify later evidence on air");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "label", 19);
    \u0275\u0275text(44, "News beat ");
    \u0275\u0275elementStart(45, "select", 21);
    \u0275\u0275listener("change", function AssignmentDeskComponent_Conditional_2_Template_select_change_45_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.updatePitch("beatId", $event));
    });
    \u0275\u0275repeaterCreate(46, AssignmentDeskComponent_Conditional_2_For_47_Template, 2, 2, "option", 24, _forTrack02);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "label", 19);
    \u0275\u0275text(49, "Report format ");
    \u0275\u0275elementStart(50, "select", 21);
    \u0275\u0275listener("change", function AssignmentDeskComponent_Conditional_2_Template_select_change_50_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.setReportFormat($event.target.value));
    });
    \u0275\u0275repeaterCreate(51, AssignmentDeskComponent_Conditional_2_For_52_Template, 2, 2, "option", 24, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "section", 25)(54, "strong");
    \u0275\u0275text(55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "dl")(57, "dt");
    \u0275\u0275text(58, "My question");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "dd");
    \u0275\u0275text(60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "dt");
    \u0275\u0275text(62, "Evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "dd");
    \u0275\u0275text(64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "dt");
    \u0275\u0275text(66, "Another perspective");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "dd");
    \u0275\u0275text(68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "dt");
    \u0275\u0275text(70, "My prediction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "dd");
    \u0275\u0275text(72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "dt");
    \u0275\u0275text(74, "My audience");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "dd");
    \u0275\u0275text(76);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(77, AssignmentDeskComponent_Conditional_2_Conditional_77_Template, 3, 0, "ul");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "div", 26)(79, "button", 27);
    \u0275\u0275text(80, " Send to producer \u2192 ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.pitchStep() === 0 ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.pitchSteps[ctx_r3.pitchStep()] === "Question" ? "What will your story investigate?" : ctx_r3.pitchSteps[ctx_r3.pitchStep()], " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.pitchStep() === 0 ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r3.pitchStep() === 0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.runtime.state().pitch.feedback ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r3.pitchStep() !== 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r3.runtime.state().pitch.headline);
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r3.pitchStep() !== 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r3.runtime.state().pitch.storyQuestion);
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r3.pitchStep() !== 2);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r3.runtime.state().pitch.evidenceNeeded);
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r3.pitchStep() !== 3);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r3.runtime.state().pitch.opposingChallenge);
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r3.pitchStep() !== 4);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r3.runtime.state().pitch.initialPrediction);
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r3.pitchStep() !== 5);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r3.runtime.state().pitch.whyAirtime);
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r3.pitchStep() !== 6);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r3.runtime.state().pitch.asOfDate || "");
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r3.pitchStep() !== 6);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r3.runtime.state().pitch.reportingMode || "contemporary");
    \u0275\u0275advance(5);
    \u0275\u0275property("hidden", ctx_r3.pitchStep() !== 6);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r3.runtime.state().pitch.beatId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.runtime.config.beats);
    \u0275\u0275advance(2);
    \u0275\u0275property("hidden", ctx_r3.pitchStep() !== 6);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r3.runtime.state().pitch.reportFormat);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.runtime.config.reportFormats);
    \u0275\u0275advance(2);
    \u0275\u0275property("hidden", ctx_r3.pitchStep() !== 6);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.state().pitch.headline);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.runtime.state().pitch.storyQuestion);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.runtime.state().pitch.evidenceNeeded);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.runtime.state().pitch.opposingChallenge);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.runtime.state().pitch.initialPrediction);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.runtime.state().pitch.whyAirtime);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.missingRequirements().length ? 77 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r3.pitchStep() !== 6);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r3.runtime.pitchReady() || ctx_r3.runtime.busy() || ctx_r3.runtime.state().pitch.status === "submitted" || ctx_r3.runtime.state().pitch.status === "approved");
  }
}
var AssignmentDeskComponent = class _AssignmentDeskComponent {
  runtime = inject(HistoryLiveRuntimeService);
  pitchStep = signal(
    0,
    ...ngDevMode ? [{ debugName: "pitchStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pitchSteps = [
    "Enter the Moment",
    "Question",
    "Evidence",
    "Perspective",
    "Prediction",
    "Audience",
    "Review"
  ];
  injector = inject(Injector);
  missingRequirements = computed(
    () => pitchMissingRequirements(this.runtime.state().pitch),
    ...ngDevMode ? [{ debugName: "missingRequirements" }] : (
      /* istanbul ignore next */
      []
    )
  );
  setPitchStep(index) {
    this.pitchStep.set(index);
    afterNextRender(() => {
      const target = this.element.nativeElement.querySelector(index === 0 ? "#assignment-title" : ".pitch-form label:not([hidden]) input, .pitch-form label:not([hidden]) textarea, .pitch-form label:not([hidden]) select");
      target?.scrollIntoView({ block: "nearest", behavior: "instant" });
      target?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  updatePitch(field, event) {
    const control = event.target;
    this.runtime.updatePitch(field, control.value);
  }
  element = inject(ElementRef);
  openBeat(beatId) {
    const lead = this.firstLead(beatId);
    if (!lead) {
      this.runtime.pitchOwnStory(beatId);
      return;
    }
    const target = this.element.nativeElement.querySelector(`[id="lead-${lead}"]`);
    target?.scrollIntoView({ block: "nearest", behavior: "instant" });
    target?.focus({ preventScroll: true });
  }
  firstLead(beatId) {
    return this.runtime.availableLeads().find((lead) => lead.beatId === beatId)?.id ?? "";
  }
  advocateFor(leadId) {
    return this.runtime.assignmentScene()?.advocates.find((advocate) => advocate.leadId === leadId);
  }
  static \u0275fac = function AssignmentDeskComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AssignmentDeskComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssignmentDeskComponent, selectors: [["app-history-live-assignment-desk"]], decls: 3, vars: 1, consts: [["aria-labelledby", "assignment-title", 1, "assignment-desk"], [1, "desk-header"], ["id", "assignment-title"], [1, "desk-layout"], [1, "story-stage"], [1, "story-pick-scene"], [1, "scene-art", 3, "src", "alt"], ["type", "button", 1, "story-paper", 3, "id", "left", "top", "width", "height"], ["type", "button", 1, "story-paper", 3, "click", "id"], [1, "pitch-header"], ["id", "assignment-title", "tabindex", "-1"], [3, "historicalEvent", "headline"], [1, "pitch-layout", 3, "hidden"], ["tabindex", "-1", 1, "pitch-form", 3, "submit"], ["role", "status", 1, "wide"], [1, "wide", 3, "hidden"], [3, "input", "value"], ["rows", "3", "placeholder", "I want to find out\u2026", 3, "input", "value"], ["rows", "4", 3, "input", "value"], [3, "hidden"], ["type", "date", 3, "input", "value"], [3, "change", "value"], ["value", "contemporary"], ["value", "retrospective"], [3, "value"], ["aria-label", "Pitch review", 1, "wide", "review-check", 3, "hidden"], [1, "pitch-actions", 3, "hidden"], ["type", "submit", 3, "disabled"], [3, "buildStory", "historicalEvent", "headline"]], template: function AssignmentDeskComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275conditionalCreate(1, AssignmentDeskComponent_Conditional_1_Template, 12, 4)(2, AssignmentDeskComponent_Conditional_2_Template, 81, 35);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.state().stage === "assignment" ? 1 : 2);
    }
  }, dependencies: [StoryInvestigationPreviewComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #dce5e9;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #d5b573;\n  outline-offset: 2px;\n}\n.assignment-desk[_ngcontent-%COMP%] {\n  min-height: calc(100dvh - 8rem);\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.018) 1px,\n      transparent 1px) 0 0/4rem 4rem;\n}\n.desk-header[_ngcontent-%COMP%], \n.pitch-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 2rem;\n  border-bottom: 1px solid #273944;\n  padding: 2.2rem clamp(1rem, 4vw, 4rem) 1.5rem;\n  background:\n    linear-gradient(\n      110deg,\n      #111f29,\n      #0b161e);\n}\n.desk-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.pitch-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #c4a467;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.16em;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  color: #f0f2ef;\n  font: 400 clamp(2rem, 4vw, 3.2rem)/1 Georgia, serif;\n}\n.desk-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.pitch-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    + p[_ngcontent-%COMP%] {\n  margin: 0.55rem 0 0;\n  color: #8fa1aa;\n  font-size: 0.84rem;\n}\n.desk-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 14.5rem minmax(0, 1fr);\n}\n.story-stage[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 1.3rem clamp(0.7rem, 2vw, 2rem) 3rem;\n}\n.story-pick-scene[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 16/9;\n  min-height: 32rem;\n  overflow: hidden;\n  border: 1px solid #485963;\n  background: #0a141b;\n  box-shadow: 0 1.3rem 3.5rem rgba(0, 0, 0, 0.38);\n  isolation: isolate;\n}\n.scene-art[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: -2;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n.story-pick-scene[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  inset: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(26, 72, 103, 0.14),\n      transparent 35%,\n      rgba(17, 35, 48, 0.04));\n}\n.story-pick-scene.crown-room[_ngcontent-%COMP%]::after {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(91, 33, 29, 0.16),\n      transparent 38%,\n      rgba(99, 42, 36, 0.09));\n}\n.story-paper[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: center;\n  overflow: hidden;\n  border: 2px solid transparent;\n  padding: 0.8rem;\n  color: #172832;\n  background: rgba(246, 241, 225, 0.04);\n  text-align: center;\n  text-shadow: 0 1px rgba(255, 255, 255, 0.4);\n  cursor: pointer;\n  transition:\n    transform 0.16s ease,\n    background 0.16s ease,\n    border-color 0.16s ease,\n    box-shadow 0.16s ease;\n}\n.story-paper[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 50%;\n  width: 1px;\n  background: rgba(84, 76, 59, 0.13);\n}\n.story-paper[_ngcontent-%COMP%]:hover, \n.story-paper[_ngcontent-%COMP%]:focus-visible {\n  z-index: 5;\n  border-color: #a53731;\n  background: rgba(255, 250, 234, 0.82);\n  box-shadow: 0 0.7rem 1.8rem rgba(0, 0, 0, 0.34);\n  transform: scale(1.035) rotate(-0.5deg);\n}\n.story-paper[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  position: relative;\n  color: #5d6a6e;\n  font-size: clamp(0.32rem, 0.42vw, 0.44rem);\n  font-style: normal;\n  font-weight: 800;\n  letter-spacing: 0.045em;\n  text-transform: uppercase;\n}\n.story-paper[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  border-top: 2px solid #8d302b;\n  border-bottom: 1px solid rgba(46, 54, 55, 0.28);\n  padding: 0.2rem 0;\n  color: #8d302b;\n  font-size: clamp(0.38rem, 0.52vw, 0.54rem);\n  font-weight: 950;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n.crown-room[_ngcontent-%COMP%]   .story-paper[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  border-top-color: #223f58;\n  color: #5b302c;\n}\n.story-paper[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 15rem;\n  margin: 0.28rem 0 0.2rem;\n  color: #132630;\n  font: 700 clamp(0.66rem, 1.05vw, 1.08rem)/1.03 Georgia, serif;\n  text-transform: uppercase;\n}\n.story-paper[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  position: relative;\n  color: #53646b;\n  font-size: clamp(0.35rem, 0.47vw, 0.48rem);\n  font-weight: 750;\n}\n.story-paper[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  position: relative;\n  margin-top: 0.3rem;\n  color: #a13c34;\n  font-size: clamp(0.34rem, 0.45vw, 0.46rem);\n  letter-spacing: 0.08em;\n  opacity: 0;\n  transition: opacity 0.16s ease;\n}\n.story-paper[_ngcontent-%COMP%]:hover   b[_ngcontent-%COMP%], \n.story-paper[_ngcontent-%COMP%]:focus-visible   b[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.pitch-header[_ngcontent-%COMP%] {\n  align-items: center;\n  padding-block: 1.5rem;\n}\n.pitch-header[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  border: 0;\n  padding: 0.7rem;\n  color: #96a9b2;\n  background: transparent;\n  font-size: 0.8rem;\n  cursor: pointer;\n}\n.pitch-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.pitch-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    + p[_ngcontent-%COMP%] {\n  max-width: 17rem;\n  border-left: 1px solid #344751;\n  padding-left: 1rem;\n}\n.pitch-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #cfb274;\n  font-size: 0.8rem;\n  letter-spacing: 0.1em;\n}\n.pitch-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 20rem;\n  gap: 1rem;\n  padding: 1.5rem clamp(1rem, 4vw, 4rem) 3rem;\n}\n.pitch-form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n  border: 1px solid #2d3f4a;\n  padding: 1.4rem;\n  background: #111e27;\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.18);\n}\n.pitch-form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 0.48rem;\n}\n.pitch-form[_ngcontent-%COMP%]   label.wide[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.pitch-form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #cad5d9;\n  font-size: 0.8rem;\n  font-weight: 850;\n}\n.pitch-form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: 0.35rem;\n  color: #738791;\n  font-weight: 500;\n}\ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #354955;\n  border-radius: 0;\n  padding: 0.72rem;\n  color: #e3e9eb;\n  background: #0b1720;\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.opposing-field[_ngcontent-%COMP%] {\n  border-left: 3px solid #9f695f;\n  padding-left: 1rem;\n}\n.pitch-actions[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-top: 1px solid #2a3c47;\n  padding-top: 1rem;\n}\n.pitch-actions[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  color: #83959e;\n  font-size: 0.8rem;\n}\n.pitch-actions[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.5rem;\n  height: 0.5rem;\n  border-radius: 50%;\n  background: #87614c;\n}\n.pitch-actions[_ngcontent-%COMP%]   i.ready[_ngcontent-%COMP%] {\n  background: #66a57c;\n  box-shadow: 0 0 0.5rem #66a57c;\n}\n.pitch-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 3rem;\n  border: 0;\n  padding: 0 1rem;\n  color: #14202a;\n  background: #d2b575;\n  font-weight: 900;\n  cursor: pointer;\n}\n.pitch-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  color: #657580;\n  background: #273842;\n  cursor: not-allowed;\n}\n.pitch-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: 1.3rem;\n}\n@media (max-width: 850px) {\n  .desk-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .pitch-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 620px) {\n  .desk-header[_ngcontent-%COMP%], \n   .pitch-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .story-pick-scene[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 0.55rem;\n    aspect-ratio: auto;\n    min-height: 0;\n    padding: 162px 0.7rem 0.7rem;\n    background: #0a141b;\n  }\n  .scene-art[_ngcontent-%COMP%] {\n    height: 62vw;\n    object-fit: cover;\n    object-position: top center;\n  }\n  .story-pick-scene[_ngcontent-%COMP%]::after {\n    background:\n      linear-gradient(\n        0deg,\n        #0a141b 0 58%,\n        transparent 75%);\n  }\n  .story-paper[_ngcontent-%COMP%] {\n    position: relative;\n    top: auto !important;\n    left: auto !important;\n    width: 100% !important;\n    height: auto !important;\n    min-height: 7rem;\n    border: 1px solid #c7bfa9;\n    padding: 0.8rem;\n    background: #eee9da;\n    box-shadow: 0.25rem 0.3rem 0 #050a0d;\n    transform: none;\n  }\n  .story-paper[_ngcontent-%COMP%]:hover, \n   .story-paper[_ngcontent-%COMP%]:focus-visible {\n    transform: translateY(-2px);\n  }\n  .story-paper[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .story-paper[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n    opacity: 1;\n  }\n  .pitch-form[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .pitch-form[_ngcontent-%COMP%]   label.wide[_ngcontent-%COMP%], \n   .pitch-actions[_ngcontent-%COMP%] {\n    grid-column: 1;\n  }\n  .pitch-actions[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  min-height: 2.75rem;\n}\ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n  line-height: 1.5;\n}\nbutton[aria-disabled=true][_ngcontent-%COMP%] {\n  opacity: 0.65;\n}\n[hidden][_ngcontent-%COMP%] {\n  display: none !important;\n}\n.pitch-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(26px, 2.5vw, 36px);\n}\n.pitch-form[_ngcontent-%COMP%] {\n  gap: 12px;\n  padding: 16px;\n}\n.pitch-form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  min-height: 65px;\n}\n.pitch-actions[_ngcontent-%COMP%] {\n  position: sticky;\n  bottom: 0;\n  z-index: 3;\n  flex-wrap: wrap;\n  background: #f7f1e4;\n  padding: 12px;\n}\n.pitch-actions[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.review-check[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.desk-layout[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 1080px;\n  margin: auto;\n}\n.desk-header[_ngcontent-%COMP%], \n.pitch-header[_ngcontent-%COMP%] {\n  justify-content: center;\n  text-align: center;\n  padding: 16px;\n}\n.desk-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.pitch-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 30px;\n}\n.desk-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: none;\n}\n.story-stage[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.pitch-layout[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 780px;\n  margin: 24px auto;\n  padding: 0 16px;\n}\n.pitch-form[_ngcontent-%COMP%] {\n  min-height: 0;\n}\n.pitch-form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  min-height: 150px;\n  font-size: 18px;\n}\n.pitch-form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.pitch-actions[_ngcontent-%COMP%] {\n  position: static;\n  justify-content: center;\n}\n.review-check[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 4px 0 16px;\n}\n@media (max-width: 620px) {\n  .story-pick-scene[_ngcontent-%COMP%]   .scene-art[_ngcontent-%COMP%] {\n    height: 150px;\n    min-height: 0;\n  }\n  .story-paper[_ngcontent-%COMP%]   em[_ngcontent-%COMP%], \n   .story-paper[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n   .story-paper[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .story-paper[_ngcontent-%COMP%] {\n    min-height: 90px;\n  }\n}\n/*# sourceMappingURL=assignment-desk.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AssignmentDeskComponent, [{
    type: Component,
    args: [{ selector: "app-history-live-assignment-desk", imports: [StoryInvestigationPreviewComponent], template: `<section class="assignment-desk" aria-labelledby="assignment-title">
  @if (runtime.state().stage === 'assignment') {
    <header class="desk-header">
      <div>
        <span>ASSIGNMENT DESK \xB7 {{ runtime.selectedNetwork()?.shortName }}</span>
        <h1 id="assignment-title">What deserves airtime?</h1>
      </div>
    </header>

    <div class="desk-layout">
      <div class="story-stage">
        <div
          class="story-pick-scene"
          [class.crown-room]="runtime.state().selectedSide === 'british'"
        >
          @if (runtime.assignmentScene(); as scene) {
            <img class="scene-art" [src]="scene.imageUrl" [alt]="scene.imageAlt" />
          }
          @for (lead of runtime.availableLeads(); track lead.id) {
            <button
              type="button"
              class="story-paper"
              [id]="'lead-' + lead.id"
              [style.left.%]="advocateFor(lead.id)?.leftPercent"
              [style.top.%]="advocateFor(lead.id)?.topPercent"
              [style.width.%]="advocateFor(lead.id)?.widthPercent"
              [style.height.%]="advocateFor(lead.id)?.heightPercent"
              [attr.aria-label]="'Claim story: ' + lead.headline"
              (click)="runtime.claimStory(lead)"
            >
              <em>{{ advocateFor(lead.id)?.advocateLabel }}</em>
              <span>{{ runtime.beatLabel(lead.beatId) }} \xB7 {{ lead.format }}</span>
              <h2>{{ lead.headline }}</h2>
              <small>{{ lead.location }}</small>
              <b>CLAIM THIS STORY \u2192</b>
            </button>
          }
        </div>
      </div>
    </div>
  } @else {
    <header class="pitch-header">
      <div>
        @if (pitchStep() === 0) {
          <span>BUILD A STORY \xB7 STEP 1</span>
        }
        <h1 id="assignment-title" tabindex="-1">
          {{
            pitchSteps[pitchStep()] === 'Question'
              ? 'What will your story investigate?'
              : pitchSteps[pitchStep()]
          }}
        </h1>
      </div>
    </header>
    @if (pitchStep() === 0) {
      <app-history-live-story-investigation-preview
        [historicalEvent]="runtime.config.event"
        [headline]="runtime.state().pitch.headline"
        (buildStory)="setPitchStep(1)"
      />
    }
    <div class="pitch-layout" [hidden]="pitchStep() === 0">
      <form
        class="pitch-form"
        tabindex="-1"
        (submit)="$event.preventDefault(); runtime.submitPitch()"
      >
        @if (runtime.state().pitch.feedback) {
          <p class="wide" role="status">{{ runtime.state().pitch.feedback }}</p>
        }
        <label [hidden]="pitchStep() !== 1" class="wide">
          <span>My headline</span>
          <input
            [value]="runtime.state().pitch.headline"
            (input)="updatePitch('headline', $event)"
          />
        </label>
        <label [hidden]="pitchStep() !== 1" class="wide">
          <span>My question</span>
          <textarea
            rows="3"
            [value]="runtime.state().pitch.storyQuestion"
            (input)="updatePitch('storyQuestion', $event)"
            placeholder="I want to find out\u2026"
          ></textarea>
        </label>
        <label [hidden]="pitchStep() !== 2" class="wide">
          <span>What evidence would help me answer?</span>
          <textarea
            rows="4"
            [value]="runtime.state().pitch.evidenceNeeded"
            (input)="updatePitch('evidenceNeeded', $event)"
          ></textarea>
        </label>
        <label [hidden]="pitchStep() !== 3" class="wide">
          <span>What might the other newsroom challenge?</span>
          <textarea
            rows="4"
            [value]="runtime.state().pitch.opposingChallenge"
            (input)="updatePitch('opposingChallenge', $event)"
          ></textarea>
        </label>
        <label [hidden]="pitchStep() !== 4" class="wide">
          <span>What do I expect the evidence to show?</span>
          <textarea
            rows="4"
            [value]="runtime.state().pitch.initialPrediction"
            (input)="updatePitch('initialPrediction', $event)"
          ></textarea>
        </label>
        <label [hidden]="pitchStep() !== 5" class="wide">
          <span>Why should my audience hear this story?</span>
          <textarea
            rows="4"
            [value]="runtime.state().pitch.whyAirtime"
            (input)="updatePitch('whyAirtime', $event)"
          ></textarea>
        </label>
        <label [hidden]="pitchStep() !== 6"
          >Report as of
          <input
            type="date"
            [value]="runtime.state().pitch.asOfDate || ''"
            (input)="updatePitch('asOfDate', $event)"
          />
        </label>
        <label [hidden]="pitchStep() !== 6"
          >Reporting approach
          <select
            [value]="runtime.state().pitch.reportingMode || 'contemporary'"
            (change)="updatePitch('reportingMode', $event)"
          >
            <option value="contemporary">As events unfold: no later evidence</option>
            <option value="retrospective">Retrospective: identify later evidence on air</option>
          </select>
        </label>
        <label [hidden]="pitchStep() !== 6"
          >News beat
          <select [value]="runtime.state().pitch.beatId" (change)="updatePitch('beatId', $event)">
            @for (beat of runtime.config.beats; track beat.id) {
              <option [value]="beat.id">{{ beat.label }}</option>
            }
          </select>
        </label>
        <label [hidden]="pitchStep() !== 6"
          >Report format
          <select
            [value]="runtime.state().pitch.reportFormat"
            (change)="runtime.setReportFormat($any($event.target).value)"
          >
            @for (format of runtime.config.reportFormats; track format) {
              <option [value]="format">{{ format }}</option>
            }
          </select>
        </label>
        <section class="wide review-check" [hidden]="pitchStep() !== 6" aria-label="Pitch review">
          <strong>{{ runtime.state().pitch.headline }}</strong>
          <dl>
            <dt>My question</dt>
            <dd>{{ runtime.state().pitch.storyQuestion }}</dd>
            <dt>Evidence</dt>
            <dd>{{ runtime.state().pitch.evidenceNeeded }}</dd>
            <dt>Another perspective</dt>
            <dd>{{ runtime.state().pitch.opposingChallenge }}</dd>
            <dt>My prediction</dt>
            <dd>{{ runtime.state().pitch.initialPrediction }}</dd>
            <dt>My audience</dt>
            <dd>{{ runtime.state().pitch.whyAirtime }}</dd>
          </dl>
          @if (missingRequirements().length) {
            <ul>
              @for (item of missingRequirements(); track item) {
                <li>{{ item }}</li>
              }
            </ul>
          }
        </section>
        <div class="pitch-actions" [hidden]="pitchStep() !== 6">
          <button
            type="submit"
            [disabled]="
              !runtime.pitchReady() ||
              runtime.busy() ||
              runtime.state().pitch.status === 'submitted' ||
              runtime.state().pitch.status === 'approved'
            "
          >
            Send to producer \u2192
          </button>
        </div>
      </form>
    </div>
  }
</section>
`, styles: ['/* src/app/templates/history-live/ui/assignment-desk.component.scss */\n:host {\n  display: block;\n  color: #dce5e9;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\ntextarea,\nselect {\n  font: inherit;\n}\nbutton:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible,\nselect:focus-visible,\na:focus-visible {\n  outline: 3px solid #d5b573;\n  outline-offset: 2px;\n}\n.assignment-desk {\n  min-height: calc(100dvh - 8rem);\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.018) 1px,\n      transparent 1px) 0 0/4rem 4rem;\n}\n.desk-header,\n.pitch-header {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 2rem;\n  border-bottom: 1px solid #273944;\n  padding: 2.2rem clamp(1rem, 4vw, 4rem) 1.5rem;\n  background:\n    linear-gradient(\n      110deg,\n      #111f29,\n      #0b161e);\n}\n.desk-header span,\n.pitch-header div > span {\n  color: #c4a467;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.16em;\n}\nh1 {\n  margin: 0.35rem 0 0;\n  color: #f0f2ef;\n  font: 400 clamp(2rem, 4vw, 3.2rem)/1 Georgia, serif;\n}\n.desk-header p,\n.pitch-header div + p {\n  margin: 0.55rem 0 0;\n  color: #8fa1aa;\n  font-size: 0.84rem;\n}\n.desk-layout {\n  display: grid;\n  grid-template-columns: 14.5rem minmax(0, 1fr);\n}\n.story-stage {\n  min-width: 0;\n  padding: 1.3rem clamp(0.7rem, 2vw, 2rem) 3rem;\n}\n.story-pick-scene {\n  position: relative;\n  aspect-ratio: 16/9;\n  min-height: 32rem;\n  overflow: hidden;\n  border: 1px solid #485963;\n  background: #0a141b;\n  box-shadow: 0 1.3rem 3.5rem rgba(0, 0, 0, 0.38);\n  isolation: isolate;\n}\n.scene-art {\n  position: absolute;\n  z-index: -2;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n.story-pick-scene::after {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  inset: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(26, 72, 103, 0.14),\n      transparent 35%,\n      rgba(17, 35, 48, 0.04));\n}\n.story-pick-scene.crown-room::after {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(91, 33, 29, 0.16),\n      transparent 38%,\n      rgba(99, 42, 36, 0.09));\n}\n.story-paper {\n  position: absolute;\n  z-index: 3;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: center;\n  overflow: hidden;\n  border: 2px solid transparent;\n  padding: 0.8rem;\n  color: #172832;\n  background: rgba(246, 241, 225, 0.04);\n  text-align: center;\n  text-shadow: 0 1px rgba(255, 255, 255, 0.4);\n  cursor: pointer;\n  transition:\n    transform 0.16s ease,\n    background 0.16s ease,\n    border-color 0.16s ease,\n    box-shadow 0.16s ease;\n}\n.story-paper::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 50%;\n  width: 1px;\n  background: rgba(84, 76, 59, 0.13);\n}\n.story-paper:hover,\n.story-paper:focus-visible {\n  z-index: 5;\n  border-color: #a53731;\n  background: rgba(255, 250, 234, 0.82);\n  box-shadow: 0 0.7rem 1.8rem rgba(0, 0, 0, 0.34);\n  transform: scale(1.035) rotate(-0.5deg);\n}\n.story-paper em {\n  position: relative;\n  color: #5d6a6e;\n  font-size: clamp(0.32rem, 0.42vw, 0.44rem);\n  font-style: normal;\n  font-weight: 800;\n  letter-spacing: 0.045em;\n  text-transform: uppercase;\n}\n.story-paper > span {\n  position: relative;\n  width: 100%;\n  border-top: 2px solid #8d302b;\n  border-bottom: 1px solid rgba(46, 54, 55, 0.28);\n  padding: 0.2rem 0;\n  color: #8d302b;\n  font-size: clamp(0.38rem, 0.52vw, 0.54rem);\n  font-weight: 950;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n.crown-room .story-paper > span {\n  border-top-color: #223f58;\n  color: #5b302c;\n}\n.story-paper h2 {\n  position: relative;\n  max-width: 15rem;\n  margin: 0.28rem 0 0.2rem;\n  color: #132630;\n  font: 700 clamp(0.66rem, 1.05vw, 1.08rem)/1.03 Georgia, serif;\n  text-transform: uppercase;\n}\n.story-paper small {\n  position: relative;\n  color: #53646b;\n  font-size: clamp(0.35rem, 0.47vw, 0.48rem);\n  font-weight: 750;\n}\n.story-paper b {\n  position: relative;\n  margin-top: 0.3rem;\n  color: #a13c34;\n  font-size: clamp(0.34rem, 0.45vw, 0.46rem);\n  letter-spacing: 0.08em;\n  opacity: 0;\n  transition: opacity 0.16s ease;\n}\n.story-paper:hover b,\n.story-paper:focus-visible b {\n  opacity: 1;\n}\n.pitch-header {\n  align-items: center;\n  padding-block: 1.5rem;\n}\n.pitch-header > button {\n  border: 0;\n  padding: 0.7rem;\n  color: #96a9b2;\n  background: transparent;\n  font-size: 0.8rem;\n  cursor: pointer;\n}\n.pitch-header div {\n  flex: 1;\n}\n.pitch-header div + p {\n  max-width: 17rem;\n  border-left: 1px solid #344751;\n  padding-left: 1rem;\n}\n.pitch-header p strong {\n  display: block;\n  color: #cfb274;\n  font-size: 0.8rem;\n  letter-spacing: 0.1em;\n}\n.pitch-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 20rem;\n  gap: 1rem;\n  padding: 1.5rem clamp(1rem, 4vw, 4rem) 3rem;\n}\n.pitch-form {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n  border: 1px solid #2d3f4a;\n  padding: 1.4rem;\n  background: #111e27;\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.18);\n}\n.pitch-form label {\n  display: grid;\n  align-content: start;\n  gap: 0.48rem;\n}\n.pitch-form label.wide {\n  grid-column: 1/-1;\n}\n.pitch-form label > span {\n  color: #cad5d9;\n  font-size: 0.8rem;\n  font-weight: 850;\n}\n.pitch-form label small {\n  margin-left: 0.35rem;\n  color: #738791;\n  font-weight: 500;\n}\ninput,\ntextarea,\nselect {\n  width: 100%;\n  border: 1px solid #354955;\n  border-radius: 0;\n  padding: 0.72rem;\n  color: #e3e9eb;\n  background: #0b1720;\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\ntextarea {\n  resize: vertical;\n}\n.opposing-field {\n  border-left: 3px solid #9f695f;\n  padding-left: 1rem;\n}\n.pitch-actions {\n  grid-column: 1/-1;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-top: 1px solid #2a3c47;\n  padding-top: 1rem;\n}\n.pitch-actions div {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  color: #83959e;\n  font-size: 0.8rem;\n}\n.pitch-actions i {\n  width: 0.5rem;\n  height: 0.5rem;\n  border-radius: 50%;\n  background: #87614c;\n}\n.pitch-actions i.ready {\n  background: #66a57c;\n  box-shadow: 0 0 0.5rem #66a57c;\n}\n.pitch-actions button {\n  min-height: 3rem;\n  border: 0;\n  padding: 0 1rem;\n  color: #14202a;\n  background: #d2b575;\n  font-weight: 900;\n  cursor: pointer;\n}\n.pitch-actions button:disabled {\n  color: #657580;\n  background: #273842;\n  cursor: not-allowed;\n}\n.pitch-actions button span {\n  margin-left: 1.3rem;\n}\n@media (max-width: 850px) {\n  .desk-layout {\n    grid-template-columns: 1fr;\n  }\n  .pitch-layout {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 620px) {\n  .desk-header,\n  .pitch-header {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .story-pick-scene {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 0.55rem;\n    aspect-ratio: auto;\n    min-height: 0;\n    padding: 162px 0.7rem 0.7rem;\n    background: #0a141b;\n  }\n  .scene-art {\n    height: 62vw;\n    object-fit: cover;\n    object-position: top center;\n  }\n  .story-pick-scene::after {\n    background:\n      linear-gradient(\n        0deg,\n        #0a141b 0 58%,\n        transparent 75%);\n  }\n  .story-paper {\n    position: relative;\n    top: auto !important;\n    left: auto !important;\n    width: 100% !important;\n    height: auto !important;\n    min-height: 7rem;\n    border: 1px solid #c7bfa9;\n    padding: 0.8rem;\n    background: #eee9da;\n    box-shadow: 0.25rem 0.3rem 0 #050a0d;\n    transform: none;\n  }\n  .story-paper:hover,\n  .story-paper:focus-visible {\n    transform: translateY(-2px);\n  }\n  .story-paper h2 {\n    font-size: 1rem;\n  }\n  .story-paper b {\n    opacity: 1;\n  }\n  .pitch-form {\n    grid-template-columns: 1fr;\n  }\n  .pitch-form label.wide,\n  .pitch-actions {\n    grid-column: 1;\n  }\n  .pitch-actions {\n    align-items: stretch;\n    flex-direction: column;\n  }\n}\nbutton,\nselect,\ninput {\n  min-height: 2.75rem;\n}\ntextarea {\n  font: inherit;\n  line-height: 1.5;\n}\nbutton[aria-disabled=true] {\n  opacity: 0.65;\n}\n[hidden] {\n  display: none !important;\n}\n.pitch-header h1 {\n  font-size: clamp(26px, 2.5vw, 36px);\n}\n.pitch-form {\n  gap: 12px;\n  padding: 16px;\n}\n.pitch-form textarea {\n  min-height: 65px;\n}\n.pitch-actions {\n  position: sticky;\n  bottom: 0;\n  z-index: 3;\n  flex-wrap: wrap;\n  background: #f7f1e4;\n  padding: 12px;\n}\n.pitch-actions > div {\n  flex: 1;\n}\n.review-check {\n  font-size: 14px;\n}\n.desk-layout {\n  display: block;\n  max-width: 1080px;\n  margin: auto;\n}\n.desk-header,\n.pitch-header {\n  justify-content: center;\n  text-align: center;\n  padding: 16px;\n}\n.desk-header h1,\n.pitch-header h1 {\n  font-size: 30px;\n}\n.desk-header span {\n  display: none;\n}\n.story-stage {\n  padding: 16px;\n}\n.pitch-layout {\n  display: block;\n  max-width: 780px;\n  margin: 24px auto;\n  padding: 0 16px;\n}\n.pitch-form {\n  min-height: 0;\n}\n.pitch-form textarea {\n  min-height: 150px;\n  font-size: 18px;\n}\n.pitch-form label > span {\n  font-size: 18px;\n}\n.pitch-actions {\n  position: static;\n  justify-content: center;\n}\n.review-check dd {\n  margin: 4px 0 16px;\n}\n@media (max-width: 620px) {\n  .story-pick-scene .scene-art {\n    height: 150px;\n    min-height: 0;\n  }\n  .story-paper em,\n  .story-paper > span,\n  .story-paper b {\n    display: none;\n  }\n  .story-paper {\n    min-height: 90px;\n  }\n}\n/*# sourceMappingURL=assignment-desk.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssignmentDeskComponent, { className: "AssignmentDeskComponent", filePath: "src/app/templates/history-live/ui/assignment-desk.component.ts", lineNumber: 22 });
})();

// src/app/templates/history-live/ui/producer-console.component.ts
var _c0 = () => [];
var _forTrack03 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.sourceId;
function ProducerConsoleComponent_Conditional_21_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 15);
    \u0275\u0275domListener("click", function ProducerConsoleComponent_Conditional_21_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.reviewPitch("approved", ctx_r1.feedback()));
    });
    \u0275\u0275text(1, " Approve pitch");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "button", 15);
    \u0275\u0275domListener("click", function ProducerConsoleComponent_Conditional_21_Conditional_18_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.reviewPitch("revise", ctx_r1.feedback()));
    });
    \u0275\u0275text(3, " Request pitch revision ");
    \u0275\u0275domElementEnd();
  }
}
function ProducerConsoleComponent_Conditional_21_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 15);
    \u0275\u0275domListener("click", function ProducerConsoleComponent_Conditional_21_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.reopenPitch());
    });
    \u0275\u0275text(1, "Reopen pitch / network choice");
    \u0275\u0275domElementEnd();
  }
}
function ProducerConsoleComponent_Conditional_21_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 15);
    \u0275\u0275domListener("click", function ProducerConsoleComponent_Conditional_21_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.goTo("broadcast"));
    });
    \u0275\u0275text(1, "Inspect submitted package");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "button", 15);
    \u0275\u0275domListener("click", function ProducerConsoleComponent_Conditional_21_Conditional_20_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.reviewPackage("approved", ctx_r1.feedback()));
    });
    \u0275\u0275text(3, " Clear reviewed package");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "button", 15);
    \u0275\u0275domListener("click", function ProducerConsoleComponent_Conditional_21_Conditional_20_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.reviewPackage("revise", ctx_r1.feedback()));
    });
    \u0275\u0275text(5, " Request package revision ");
    \u0275\u0275domElementEnd();
  }
}
function ProducerConsoleComponent_Conditional_21_For_25_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const link_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", link_r6.sourceId, " \xB7 ", link_r6.relationship, " \xB7 ", link_r6.passage);
  }
}
function ProducerConsoleComponent_Conditional_21_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "h3");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(6, ProducerConsoleComponent_Conditional_21_For_25_For_7_Template, 2, 3, "p", null, _forTrack1);
  }
  if (rf & 2) {
    const claim_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(claim_r7.text);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", claim_r7.status, " \xB7 ", claim_r7.reasoning);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(claim_r7.uncertainty);
    \u0275\u0275advance();
    \u0275\u0275repeater(claim_r7.evidence || \u0275\u0275pureFunction0(4, _c0));
  }
}
function ProducerConsoleComponent_Conditional_21_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const review_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4(" ", review_r8.timestamp, " \xB7 ", review_r8.target, " \xB7 ", review_r8.decision, " \xB7 ", review_r8.feedback, " ");
  }
}
function ProducerConsoleComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "section", 5)(1, "h2", 12);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "label");
    \u0275\u0275text(14, "Producer feedback");
    \u0275\u0275domElementStart(15, "textarea", 13);
    \u0275\u0275domListener("input", function ProducerConsoleComponent_Conditional_21_Template_textarea_input_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.feedback.set($event.target.value));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(16, "p");
    \u0275\u0275text(17);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(18, ProducerConsoleComponent_Conditional_21_Conditional_18_Template, 4, 0);
    \u0275\u0275conditionalCreate(19, ProducerConsoleComponent_Conditional_21_Conditional_19_Template, 2, 0, "button", 14);
    \u0275\u0275conditionalCreate(20, ProducerConsoleComponent_Conditional_21_Conditional_20_Template, 6, 0);
    \u0275\u0275domElementStart(21, "details")(22, "summary");
    \u0275\u0275text(23, "Evidence and reasoning");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(24, ProducerConsoleComponent_Conditional_21_For_25_Template, 8, 5, null, null, _forTrack03);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(26, "details")(27, "summary");
    \u0275\u0275text(28, "Review history");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(29, ProducerConsoleComponent_Conditional_21_For_30_Template, 2, 4, "p", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Review ", ctx_r1.runtime.viewer.studentDisplayName, "\u2019s report");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.state().pitch.headline);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.state().pitch.storyQuestion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("As of ", ctx_r1.runtime.state().pitch.asOfDate, " \xB7 ", ctx_r1.runtime.state().pitch.reportingMode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Initial prediction: ", ctx_r1.runtime.state().pitch.initialPrediction);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Opposing challenge: ", ctx_r1.runtime.state().pitch.opposingChallenge);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", ctx_r1.feedback());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" Pitch: ", ctx_r1.runtime.state().pitch.status, " \xB7 Package: ", ctx_r1.runtime.state().packageStatus || "draft", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.state().pitch.status === "submitted" ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.state().pitch.status === "approved" ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.state().packageStatus === "submitted" ? 20 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.runtime.state().claims);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.runtime.state().reviewHistory || \u0275\u0275pureFunction0(13, _c0));
  }
}
function ProducerConsoleComponent_For_38_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 19);
    \u0275\u0275domListener("click", function ProducerConsoleComponent_For_38_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const \u0275$index_137_r10 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.moveSegment(\u0275$index_137_r10, -1));
    });
    \u0275\u0275text(1, " \u2191");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "button", 20);
    \u0275\u0275domListener("click", function ProducerConsoleComponent_For_38_Conditional_20_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r9);
      const \u0275$index_137_r10 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.moveSegment(\u0275$index_137_r10, 1));
    });
    \u0275\u0275text(3, " \u2193 ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const \u0275$index_137_r10 = \u0275\u0275nextContext().$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", \u0275$index_137_r10 === 0);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", \u0275$index_137_r10 === ctx_r1.runtime.state().schedule.length - 1);
  }
}
function ProducerConsoleComponent_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div")(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "span", 16);
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275domElementStart(14, "small");
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(16, "span", 17);
    \u0275\u0275domElement(17, "i");
    \u0275\u0275text(18);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(19, "div", 18);
    \u0275\u0275conditionalCreate(20, ProducerConsoleComponent_For_38_Conditional_20_Template, 4, 2);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const segment_r11 = ctx.$implicit;
    const \u0275$index_137_r10 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(segment_r11.side);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((\u0275$index_137_r10 + 1).toString().padStart(2, "0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(segment_r11.desk);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r11.headline);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", segment_r11.reporter, " \xB7 ", segment_r11.visualLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r11.side === "patriot" ? "Continental" : "Crown");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r11.startLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", segment_r11.durationSeconds, " sec");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(segment_r11.ready ? "Ready" : "Review");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.runtime.canProduce() ? 20 : -1);
  }
}
function ProducerConsoleComponent_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "details")(1, "summary");
    \u0275\u0275text(2, "Reset this demo workspace");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4, "Export your work first. Reset removes the current draft.");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 21);
    \u0275\u0275domListener("click", function ProducerConsoleComponent_Conditional_81_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.resetDemo());
    });
    \u0275\u0275text(6, "Confirm reset");
    \u0275\u0275domElementEnd()();
  }
}
var ProducerConsoleComponent = class _ProducerConsoleComponent {
  runtime = inject(HistoryLiveRuntimeService);
  feedback = signal(
    "",
    ...ngDevMode ? [{ debugName: "feedback" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalRuntime() {
    return formatBroadcastTime(this.runtime.state().schedule.reduce((sum, segment) => sum + segment.durationSeconds, 0));
  }
  sideCount(side) {
    return this.runtime.state().schedule.filter((segment) => segment.side === side).length;
  }
  static \u0275fac = function ProducerConsoleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProducerConsoleComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProducerConsoleComponent, selectors: [["app-history-live-producer-console"]], decls: 82, vars: 13, consts: [["aria-labelledby", "producer-title", 1, "producer-room"], [1, "producer-header"], ["id", "producer-title"], [1, "show-summary"], ["type", "button", 3, "click", "disabled"], ["aria-labelledby", "review-title", 1, "review-panel"], [1, "producer-grid"], [1, "rundown"], [3, "class"], [1, "control-stack"], [1, "live-next"], [1, "producer-note"], ["id", "review-title"], ["rows", "3", 3, "input", "value"], ["type", "button"], ["type", "button", 3, "click"], [1, "network"], [1, "ready"], [1, "move"], ["type", "button", "aria-label", "Move segment earlier", 3, "click", "disabled"], ["type", "button", "aria-label", "Move segment later", 3, "click", "disabled"], ["type", "button", 1, "reset", 3, "click"]], template: function ProducerConsoleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "header", 1)(2, "div")(3, "span");
      \u0275\u0275text(4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "h1", 2);
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "p");
      \u0275\u0275text(8, "Alternate perspectives, check readiness, then take the class broadcast live.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(9, "div", 3)(10, "span")(11, "strong");
      \u0275\u0275text(12);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(13, " segments");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(14, "span")(15, "strong");
      \u0275\u0275text(16);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(17, " runtime");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(18, "button", 4);
      \u0275\u0275domListener("click", function ProducerConsoleComponent_Template_button_click_18_listener() {
        return ctx.runtime.startShow();
      });
      \u0275\u0275domElement(19, "i");
      \u0275\u0275text(20, " Start show ");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275conditionalCreate(21, ProducerConsoleComponent_Conditional_21_Template, 31, 14, "section", 5);
      \u0275\u0275domElementStart(22, "div", 6)(23, "div", 7)(24, "header")(25, "span");
      \u0275\u0275text(26, "ORDER");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(27, "span");
      \u0275\u0275text(28, "SEGMENT");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(29, "span");
      \u0275\u0275text(30, "NETWORK");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(31, "span");
      \u0275\u0275text(32, "TIME");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(33, "span");
      \u0275\u0275text(34, "STATUS");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(35, "span");
      \u0275\u0275text(36, "MOVE");
      \u0275\u0275domElementEnd()();
      \u0275\u0275repeaterCreate(37, ProducerConsoleComponent_For_38_Template, 21, 12, "article", 8, _forTrack03);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(39, "aside", 9)(40, "section", 10)(41, "span");
      \u0275\u0275text(42, "LIVE / NEXT");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(43, "div")(44, "small");
      \u0275\u0275text(45, "OPENING");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(46, "strong");
      \u0275\u0275text(47, "History Live Headlines");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(48, "p");
      \u0275\u0275text(49, "Studio Wide \xB7 Class intro");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(50, "div")(51, "small");
      \u0275\u0275text(52, "NEXT");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(53, "strong");
      \u0275\u0275text(54);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(55, "p");
      \u0275\u0275text(56);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(57, "section")(58, "span");
      \u0275\u0275text(59, "RUN OF SHOW");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(60, "dl")(61, "div")(62, "dt");
      \u0275\u0275text(63, "Perspective balance");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(64, "dd");
      \u0275\u0275text(65);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(66, "div")(67, "dt");
      \u0275\u0275text(68, "Packages ready");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(69, "dd");
      \u0275\u0275text(70);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(71, "div")(72, "dt");
      \u0275\u0275text(73, "Mode");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(74, "dd");
      \u0275\u0275text(75, "Reviewed packages");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElementStart(76, "section", 11)(77, "span");
      \u0275\u0275text(78, "PRODUCER NOTE");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(79, "p");
      \u0275\u0275text(80, " The schedule starts interleaved automatically. Reorder only when a clear historical connection makes the transition stronger. ");
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(81, ProducerConsoleComponent_Conditional_81_Template, 7, 0, "details");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("TEACHER PRODUCER CONSOLE \xB7 ", ctx.runtime.viewer.classLabel);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.runtime.config.event, " rundown");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.runtime.state().schedule.length);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.totalRuntime());
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("disabled", !ctx.runtime.canProduce() || ctx.runtime.busy() || !ctx.runtime.state().schedule.length);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.runtime.canProduce() ? 21 : -1);
      \u0275\u0275advance(16);
      \u0275\u0275repeater(ctx.runtime.state().schedule);
      \u0275\u0275advance(17);
      \u0275\u0275textInterpolate(ctx.runtime.state().schedule[0]?.headline);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.state().schedule[0]?.reporter);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate2("", ctx.sideCount("patriot"), " / ", ctx.sideCount("british"));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2("", ctx.runtime.state().schedule.length, " / ", ctx.runtime.state().schedule.length);
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.runtime.isDemo && ctx.runtime.canProduce() ? 81 : -1);
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #dce5e9;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #d8ba78;\n  outline-offset: 2px;\n}\n.producer-room[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding-bottom: 3rem;\n  background:\n    radial-gradient(\n      circle at 90% 5%,\n      rgba(130, 73, 62, 0.14),\n      transparent 25rem),\n    #0a151d;\n}\n.producer-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 2rem;\n  border-bottom: 1px solid #293b46;\n  padding: 2rem clamp(1rem, 4vw, 4rem) 1.4rem;\n}\n.producer-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child {\n  flex: 1;\n}\n.producer-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.control-stack[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #c4a568;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.14em;\n}\n.producer-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  color: #eff2f0;\n  font: 400 clamp(2rem, 4vw, 3.1rem)/1 Georgia, serif;\n}\n.producer-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n  color: #80949e;\n  font-size: 0.8rem;\n}\n.show-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.show-summary[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  color: #71858f;\n  font-size: 0.8rem;\n  text-align: center;\n  text-transform: uppercase;\n}\n.show-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e0e6e8;\n  font: 400 1.45rem Georgia, serif;\n}\n.show-summary[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 3.1rem;\n  align-items: center;\n  gap: 0.5rem;\n  border: 0;\n  padding: 0 1rem;\n  color: #fff;\n  background: #a93933;\n  font-size: 0.8rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.show-summary[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.45rem;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  background: white;\n  box-shadow: 0 0 0.6rem white;\n}\n.producer-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 19rem;\n  gap: 1rem;\n  padding: 1.3rem clamp(1rem, 4vw, 4rem);\n}\n.rundown[_ngcontent-%COMP%] {\n  border: 1px solid #2f434f;\n  background: #101e27;\n}\n.rundown[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n.rundown[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 3.2rem minmax(16rem, 1fr) 6.5rem 5rem 5rem 4.8rem;\n  align-items: center;\n  gap: 0.75rem;\n}\n.rundown[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #334751;\n  padding: 0.65rem;\n  color: #657984;\n  background: #0b161e;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n}\n.rundown[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%] {\n  position: relative;\n  border-bottom: 1px solid #293b46;\n  padding: 0.8rem 0.65rem;\n}\n.rundown[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 3px;\n  background: #698fae;\n}\n.rundown[_ngcontent-%COMP%]    > article.british[_ngcontent-%COMP%]::before {\n  background: #bd6d63;\n}\n.rundown[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  color: #718690;\n  font: 700 1rem Georgia, serif;\n  text-align: center;\n}\n.rundown[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #b4975f;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.rundown[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.2rem 0;\n  color: #dfe7e9;\n  font: 400 1rem/1.15 Georgia, serif;\n}\n.rundown[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #71858f;\n  font-size: 0.8rem;\n}\n.rundown[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #95a6ae;\n  font-size: 0.8rem;\n}\n.rundown[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.15rem;\n  color: #60747e;\n  font-size: 0.8rem;\n}\n.rundown[_ngcontent-%COMP%]   .network[_ngcontent-%COMP%] {\n  font-weight: 800;\n}\n.ready[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  color: #9ec9aa !important;\n}\n.ready[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.4rem;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  background: #68a77c;\n  box-shadow: 0 0 0.5rem #68a77c;\n}\n.move[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.25rem;\n}\n.move[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 2rem;\n  aspect-ratio: 1;\n  border: 1px solid #354a56;\n  color: #91a5af;\n  background: #14242e;\n  font-size: 0.8rem;\n  cursor: pointer;\n}\n.move[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.25;\n  cursor: not-allowed;\n}\n.control-stack[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 1rem;\n}\n.control-stack[_ngcontent-%COMP%]    > section[_ngcontent-%COMP%] {\n  border: 1px solid #2f434e;\n  padding: 1rem;\n  background: #101d26;\n}\n.live-next[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.7rem;\n}\n.live-next[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  border-left: 2px solid #9e3630;\n  padding: 0.55rem 0.7rem;\n  background: #0b171f;\n}\n.live-next[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  border-color: #b39359;\n}\n.live-next[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.live-next[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.live-next[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  display: block;\n}\n.live-next[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #c16f65;\n  font-size: 0.8rem;\n  font-weight: 900;\n}\n.live-next[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #b69a61;\n}\n.live-next[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin: 0.2rem 0;\n  color: #dbe4e6;\n  font: 400 0.86rem/1.2 Georgia, serif;\n}\n.live-next[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #687c87;\n  font-size: 0.8rem;\n}\n.control-stack[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.6rem;\n  margin: 0.8rem 0 0;\n}\n.control-stack[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  border-top: 1px solid #2a3d47;\n  padding-top: 0.55rem;\n}\n.control-stack[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #778b95;\n  font-size: 0.8rem;\n}\n.control-stack[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #c0ccd1;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n.producer-note[_ngcontent-%COMP%] {\n  border-left: 3px solid #aa8d56 !important;\n}\n.producer-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.7rem 0 0;\n  color: #9cabb2;\n  font: italic 0.78rem/1.5 Georgia, serif;\n}\n.reset[_ngcontent-%COMP%] {\n  border: 1px solid #5b4241;\n  padding: 0.7rem;\n  color: #b8827c;\n  background: transparent;\n  font-size: 0.8rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n@media (max-width: 1000px) {\n  .producer-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .control-stack[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .reset[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n  }\n}\n@media (max-width: 760px) {\n  .producer-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .rundown[_ngcontent-%COMP%] {\n    overflow-x: auto;\n  }\n  .rundown[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n   .rundown[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%] {\n    min-width: 54rem;\n  }\n  .control-stack[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  min-height: 2.75rem;\n}\ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n  line-height: 1.5;\n}\nbutton[aria-disabled=true][_ngcontent-%COMP%] {\n  opacity: 0.65;\n}\n.review-panel[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  color: #edf2ef;\n  background: #162b36;\n}\n.review-panel[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n}\n.review-panel[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  max-width: 50rem;\n}\n.review-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin: 0.5rem;\n  padding: 0.7rem;\n  background: #dcc38c;\n  color: #142530;\n}\n.review-panel[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  padding: 0.75rem 0;\n}\n/*# sourceMappingURL=producer-console.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProducerConsoleComponent, [{
    type: Component,
    args: [{ selector: "app-history-live-producer-console", template: `<section class="producer-room" aria-labelledby="producer-title">
  <header class="producer-header">
    <div>
      <span>TEACHER PRODUCER CONSOLE \xB7 {{ runtime.viewer.classLabel }}</span>
      <h1 id="producer-title">{{ runtime.config.event }} rundown</h1>
      <p>Alternate perspectives, check readiness, then take the class broadcast live.</p>
    </div>
    <div class="show-summary">
      <span
        ><strong>{{ runtime.state().schedule.length }}</strong> segments</span
      ><span
        ><strong>{{ totalRuntime() }}</strong> runtime</span
      ><button
        type="button"
        [disabled]="!runtime.canProduce() || runtime.busy() || !runtime.state().schedule.length"
        (click)="runtime.startShow()"
      >
        <i></i> Start show
      </button>
    </div>
  </header>
  @if (runtime.canProduce()) {
    <section class="review-panel" aria-labelledby="review-title">
      <h2 id="review-title">Review {{ runtime.viewer.studentDisplayName }}\u2019s report</h2>
      <h3>{{ runtime.state().pitch.headline }}</h3>
      <p>{{ runtime.state().pitch.storyQuestion }}</p>
      <p>As of {{ runtime.state().pitch.asOfDate }} \xB7 {{ runtime.state().pitch.reportingMode }}</p>
      <p>Initial prediction: {{ runtime.state().pitch.initialPrediction }}</p>
      <p>Opposing challenge: {{ runtime.state().pitch.opposingChallenge }}</p>
      <label
        >Producer feedback<textarea
          rows="3"
          [value]="feedback()"
          (input)="feedback.set($any($event.target).value)"
        ></textarea>
      </label>
      <p>
        Pitch: {{ runtime.state().pitch.status }} \xB7 Package:
        {{ runtime.state().packageStatus || 'draft' }}
      </p>
      @if (runtime.state().pitch.status === 'submitted') {
        <button type="button" (click)="runtime.reviewPitch('approved', feedback())">
          Approve pitch</button
        ><button type="button" (click)="runtime.reviewPitch('revise', feedback())">
          Request pitch revision
        </button>
      }
      @if (runtime.state().pitch.status === 'approved') {
        <button type="button" (click)="runtime.reopenPitch()">Reopen pitch / network choice</button>
      }
      @if (runtime.state().packageStatus === 'submitted') {
        <button type="button" (click)="runtime.goTo('broadcast')">Inspect submitted package</button
        ><button type="button" (click)="runtime.reviewPackage('approved', feedback())">
          Clear reviewed package</button
        ><button type="button" (click)="runtime.reviewPackage('revise', feedback())">
          Request package revision
        </button>
      }
      <details>
        <summary>Evidence and reasoning</summary>
        @for (claim of runtime.state().claims; track claim.id) {
          <h3>{{ claim.text }}</h3>
          <p>{{ claim.status }} \xB7 {{ claim.reasoning }}</p>
          <p>{{ claim.uncertainty }}</p>
          @for (link of claim.evidence || []; track link.sourceId) {
            <p>{{ link.sourceId }} \xB7 {{ link.relationship }} \xB7 {{ link.passage }}</p>
          }
        }
      </details>
      <details>
        <summary>Review history</summary>
        @for (review of runtime.state().reviewHistory || []; track $index) {
          <p>
            {{ review.timestamp }} \xB7 {{ review.target }} \xB7 {{ review.decision }} \xB7
            {{ review.feedback }}
          </p>
        }
      </details>
    </section>
  }
  <div class="producer-grid">
    <div class="rundown">
      <header>
        <span>ORDER</span><span>SEGMENT</span><span>NETWORK</span><span>TIME</span
        ><span>STATUS</span><span>MOVE</span>
      </header>
      @for (segment of runtime.state().schedule; track segment.id; let index = $index) {
        <article [class]="segment.side">
          <strong>{{ (index + 1).toString().padStart(2, '0') }}</strong>
          <div>
            <span>{{ segment.desk }}</span>
            <h2>{{ segment.headline }}</h2>
            <p>{{ segment.reporter }} \xB7 {{ segment.visualLabel }}</p>
          </div>
          <span class="network">{{ segment.side === 'patriot' ? 'Continental' : 'Crown' }}</span
          ><span
            >{{ segment.startLabel }}<small>{{ segment.durationSeconds }} sec</small></span
          ><span class="ready"><i></i>{{ segment.ready ? 'Ready' : 'Review' }}</span>
          <div class="move">
            @if (runtime.canProduce()) {
              <button
                type="button"
                (click)="runtime.moveSegment(index, -1)"
                [disabled]="index === 0"
                aria-label="Move segment earlier"
              >
                \u2191</button
              ><button
                type="button"
                (click)="runtime.moveSegment(index, 1)"
                [disabled]="index === runtime.state().schedule.length - 1"
                aria-label="Move segment later"
              >
                \u2193
              </button>
            }
          </div>
        </article>
      }
    </div>
    <aside class="control-stack">
      <section class="live-next">
        <span>LIVE / NEXT</span>
        <div>
          <small>OPENING</small><strong>History Live Headlines</strong>
          <p>Studio Wide \xB7 Class intro</p>
        </div>
        <div>
          <small>NEXT</small><strong>{{ runtime.state().schedule[0]?.headline }}</strong>
          <p>{{ runtime.state().schedule[0]?.reporter }}</p>
        </div>
      </section>
      <section>
        <span>RUN OF SHOW</span>
        <dl>
          <div>
            <dt>Perspective balance</dt>
            <dd>{{ sideCount('patriot') }} / {{ sideCount('british') }}</dd>
          </div>
          <div>
            <dt>Packages ready</dt>
            <dd>{{ runtime.state().schedule.length }} / {{ runtime.state().schedule.length }}</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>Reviewed packages</dd>
          </div>
        </dl>
      </section>
      <section class="producer-note">
        <span>PRODUCER NOTE</span>
        <p>
          The schedule starts interleaved automatically. Reorder only when a clear historical
          connection makes the transition stronger.
        </p>
      </section>
      @if (runtime.isDemo && runtime.canProduce()) {
        <details>
          <summary>Reset this demo workspace</summary>
          <p>Export your work first. Reset removes the current draft.</p>
          <button class="reset" type="button" (click)="runtime.resetDemo()">Confirm reset</button>
        </details>
      }
    </aside>
  </div>
</section>
`, styles: ['/* src/app/templates/history-live/ui/producer-console.component.scss */\n:host {\n  display: block;\n  color: #dce5e9;\n}\n* {\n  box-sizing: border-box;\n}\nbutton {\n  font: inherit;\n}\nbutton:focus-visible {\n  outline: 3px solid #d8ba78;\n  outline-offset: 2px;\n}\n.producer-room {\n  min-height: 100vh;\n  padding-bottom: 3rem;\n  background:\n    radial-gradient(\n      circle at 90% 5%,\n      rgba(130, 73, 62, 0.14),\n      transparent 25rem),\n    #0a151d;\n}\n.producer-header {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 2rem;\n  border-bottom: 1px solid #293b46;\n  padding: 2rem clamp(1rem, 4vw, 4rem) 1.4rem;\n}\n.producer-header > div:first-child {\n  flex: 1;\n}\n.producer-header span,\n.control-stack section > span {\n  color: #c4a568;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.14em;\n}\n.producer-header h1 {\n  margin: 0.35rem 0 0;\n  color: #eff2f0;\n  font: 400 clamp(2rem, 4vw, 3.1rem)/1 Georgia, serif;\n}\n.producer-header p {\n  margin: 0.5rem 0 0;\n  color: #80949e;\n  font-size: 0.8rem;\n}\n.show-summary {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.show-summary > span {\n  display: grid;\n  color: #71858f;\n  font-size: 0.8rem;\n  text-align: center;\n  text-transform: uppercase;\n}\n.show-summary strong {\n  color: #e0e6e8;\n  font: 400 1.45rem Georgia, serif;\n}\n.show-summary button {\n  display: flex;\n  min-height: 3.1rem;\n  align-items: center;\n  gap: 0.5rem;\n  border: 0;\n  padding: 0 1rem;\n  color: #fff;\n  background: #a93933;\n  font-size: 0.8rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.show-summary button i {\n  width: 0.45rem;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  background: white;\n  box-shadow: 0 0 0.6rem white;\n}\n.producer-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 19rem;\n  gap: 1rem;\n  padding: 1.3rem clamp(1rem, 4vw, 4rem);\n}\n.rundown {\n  border: 1px solid #2f434f;\n  background: #101e27;\n}\n.rundown > header,\n.rundown > article {\n  display: grid;\n  grid-template-columns: 3.2rem minmax(16rem, 1fr) 6.5rem 5rem 5rem 4.8rem;\n  align-items: center;\n  gap: 0.75rem;\n}\n.rundown > header {\n  border-bottom: 1px solid #334751;\n  padding: 0.65rem;\n  color: #657984;\n  background: #0b161e;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n}\n.rundown > article {\n  position: relative;\n  border-bottom: 1px solid #293b46;\n  padding: 0.8rem 0.65rem;\n}\n.rundown > article::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 3px;\n  background: #698fae;\n}\n.rundown > article.british::before {\n  background: #bd6d63;\n}\n.rundown > article > strong {\n  color: #718690;\n  font: 700 1rem Georgia, serif;\n  text-align: center;\n}\n.rundown article div > span {\n  color: #b4975f;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.rundown h2 {\n  margin: 0.2rem 0;\n  color: #dfe7e9;\n  font: 400 1rem/1.15 Georgia, serif;\n}\n.rundown p {\n  margin: 0;\n  color: #71858f;\n  font-size: 0.8rem;\n}\n.rundown article > span {\n  color: #95a6ae;\n  font-size: 0.8rem;\n}\n.rundown article > span small {\n  display: block;\n  margin-top: 0.15rem;\n  color: #60747e;\n  font-size: 0.8rem;\n}\n.rundown .network {\n  font-weight: 800;\n}\n.ready {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  color: #9ec9aa !important;\n}\n.ready i {\n  width: 0.4rem;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  background: #68a77c;\n  box-shadow: 0 0 0.5rem #68a77c;\n}\n.move {\n  display: flex;\n  gap: 0.25rem;\n}\n.move button {\n  width: 2rem;\n  aspect-ratio: 1;\n  border: 1px solid #354a56;\n  color: #91a5af;\n  background: #14242e;\n  font-size: 0.8rem;\n  cursor: pointer;\n}\n.move button:disabled {\n  opacity: 0.25;\n  cursor: not-allowed;\n}\n.control-stack {\n  display: grid;\n  align-content: start;\n  gap: 1rem;\n}\n.control-stack > section {\n  border: 1px solid #2f434e;\n  padding: 1rem;\n  background: #101d26;\n}\n.live-next {\n  display: grid;\n  gap: 0.7rem;\n}\n.live-next > div {\n  border-left: 2px solid #9e3630;\n  padding: 0.55rem 0.7rem;\n  background: #0b171f;\n}\n.live-next > div + div {\n  border-color: #b39359;\n}\n.live-next small,\n.live-next strong,\n.live-next p {\n  display: block;\n}\n.live-next small {\n  color: #c16f65;\n  font-size: 0.8rem;\n  font-weight: 900;\n}\n.live-next div + div small {\n  color: #b69a61;\n}\n.live-next strong {\n  margin: 0.2rem 0;\n  color: #dbe4e6;\n  font: 400 0.86rem/1.2 Georgia, serif;\n}\n.live-next p {\n  margin: 0;\n  color: #687c87;\n  font-size: 0.8rem;\n}\n.control-stack dl {\n  display: grid;\n  gap: 0.6rem;\n  margin: 0.8rem 0 0;\n}\n.control-stack dl div {\n  display: flex;\n  justify-content: space-between;\n  border-top: 1px solid #2a3d47;\n  padding-top: 0.55rem;\n}\n.control-stack dt {\n  color: #778b95;\n  font-size: 0.8rem;\n}\n.control-stack dd {\n  margin: 0;\n  color: #c0ccd1;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n.producer-note {\n  border-left: 3px solid #aa8d56 !important;\n}\n.producer-note p {\n  margin: 0.7rem 0 0;\n  color: #9cabb2;\n  font: italic 0.78rem/1.5 Georgia, serif;\n}\n.reset {\n  border: 1px solid #5b4241;\n  padding: 0.7rem;\n  color: #b8827c;\n  background: transparent;\n  font-size: 0.8rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n@media (max-width: 1000px) {\n  .producer-grid {\n    grid-template-columns: 1fr;\n  }\n  .control-stack {\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .reset {\n    grid-column: 1/-1;\n  }\n}\n@media (max-width: 760px) {\n  .producer-header {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .rundown {\n    overflow-x: auto;\n  }\n  .rundown > header,\n  .rundown > article {\n    min-width: 54rem;\n  }\n  .control-stack {\n    grid-template-columns: 1fr;\n  }\n}\nbutton,\nselect,\ninput {\n  min-height: 2.75rem;\n}\ntextarea {\n  font: inherit;\n  line-height: 1.5;\n}\nbutton[aria-disabled=true] {\n  opacity: 0.65;\n}\n.review-panel {\n  padding: 1.5rem;\n  color: #edf2ef;\n  background: #162b36;\n}\n.review-panel label {\n  display: grid;\n  gap: 0.5rem;\n}\n.review-panel textarea {\n  max-width: 50rem;\n}\n.review-panel button {\n  margin: 0.5rem;\n  padding: 0.7rem;\n  background: #dcc38c;\n  color: #142530;\n}\n.review-panel details {\n  padding: 0.75rem 0;\n}\n/*# sourceMappingURL=producer-console.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProducerConsoleComponent, { className: "ProducerConsoleComponent", filePath: "src/app/templates/history-live/ui/producer-console.component.ts", lineNumber: 11 });
})();

// src/app/templates/history-live/ui/production-studio.component.ts
var _forTrack04 = ($index, $item) => $item.id;
function ProductionStudioComponent_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const issue_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(issue_r1);
  }
}
function ProductionStudioComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 5);
    \u0275\u0275repeaterCreate(1, ProductionStudioComponent_Conditional_13_For_2_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.runtime.readiness());
  }
}
function ProductionStudioComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "video", 14);
  }
  if (rf & 2) {
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function ProductionStudioComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "span");
    \u0275\u0275text(2, "\u25CF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.recordingState() === "recording" ? "RECORDING IN PROGRESS" : "CAMERA PREVIEW", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.viewer.studentDisplayName);
  }
}
function ProductionStudioComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function ProductionStudioComponent_Conditional_42_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.stopRecording());
    });
    \u0275\u0275text(1, " \u25A0 Stop recording ");
    \u0275\u0275elementEnd();
  }
}
function ProductionStudioComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function ProductionStudioComponent_Conditional_43_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.startRecording());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.runtime.recordingState() === "requesting");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u25CF ", ctx_r1.runtime.recordingState() === "requesting" ? "Requesting camera\u2026" : "Record rehearsal", " ");
  }
}
function ProductionStudioComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 19);
    \u0275\u0275text(1, "Download recording backup");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("href", ctx, \u0275\u0275sanitizeUrl);
  }
}
function ProductionStudioComponent_For_59_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const camera_r8 = ctx.$implicit;
    const scene_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("selected", camera_r8.id === scene_r7.camera)("value", camera_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", camera_r8.label, " ");
  }
}
function ProductionStudioComponent_For_59_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const media_r9 = ctx.$implicit;
    const scene_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("selected", media_r9.id === scene_r7.mediaType)("value", media_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", media_r9.label, " ");
  }
}
function ProductionStudioComponent_For_59_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r10 = ctx.$implicit;
    const scene_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("selected", source_r10.id === scene_r7.sourceId)("value", source_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", source_r10.title, " ");
  }
}
function ProductionStudioComponent_For_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article")(1, "button", 3);
    \u0275\u0275listener("click", function ProductionStudioComponent_For_59_Template_button_click_1_listener() {
      const \u0275$index_121_r6 = \u0275\u0275restoreView(_r5).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectedScene.set(\u0275$index_121_r6));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 27);
    \u0275\u0275element(6, "i")(7, "b");
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "label");
    \u0275\u0275text(11, "Camera");
    \u0275\u0275elementStart(12, "select", 28);
    \u0275\u0275listener("change", function ProductionStudioComponent_For_59_Template_select_change_12_listener($event) {
      const scene_r7 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateCamera(scene_r7.id, $event));
    });
    \u0275\u0275repeaterCreate(13, ProductionStudioComponent_For_59_For_14_Template, 2, 3, "option", 29, _forTrack04);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "label");
    \u0275\u0275text(16, "Media");
    \u0275\u0275elementStart(17, "select", 28);
    \u0275\u0275listener("change", function ProductionStudioComponent_For_59_Template_select_change_17_listener($event) {
      const scene_r7 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateMedia(scene_r7.id, $event));
    });
    \u0275\u0275repeaterCreate(18, ProductionStudioComponent_For_59_For_19_Template, 2, 3, "option", 29, _forTrack04);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "label");
    \u0275\u0275text(21, "Evidence source");
    \u0275\u0275elementStart(22, "select", 28);
    \u0275\u0275listener("change", function ProductionStudioComponent_For_59_Template_select_change_22_listener($event) {
      const scene_r7 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.updateScene(scene_r7.id, "sourceId", $event.target.value));
    });
    \u0275\u0275elementStart(23, "option", 30);
    \u0275\u0275text(24, "Choose a source");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(25, ProductionStudioComponent_For_59_For_26_Template, 2, 3, "option", 29, _forTrack04);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "label");
    \u0275\u0275text(28, "Evidence caption");
    \u0275\u0275elementStart(29, "textarea", 31);
    \u0275\u0275listener("input", function ProductionStudioComponent_For_59_Template_textarea_input_29_listener($event) {
      const scene_r7 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.updateScene(scene_r7.id, "caption", $event.target.value));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const scene_r7 = ctx.$implicit;
    const \u0275$index_121_r6 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", ctx_r1.selectedScene() === \u0275$index_121_r6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Preview scene ", \u0275$index_121_r6 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_121_r6 + 1);
    \u0275\u0275advance();
    \u0275\u0275classMap("scene-thumb " + scene_r7.camera);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(scene_r7.camera);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", scene_r7.camera);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.cameraStates);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", scene_r7.mediaType);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.mediaTypes);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", scene_r7.sourceId || "");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.runtime.savedSources());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", scene_r7.caption || "");
  }
}
function ProductionStudioComponent_For_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const block_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("[", block_r11.type, "]");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(block_r11.text);
  }
}
var ProductionStudioComponent = class _ProductionStudioComponent {
  runtime = inject(HistoryLiveRuntimeService);
  cameraStates = [
    { id: "studio-wide", label: "Studio Wide" },
    { id: "reporter", label: "Reporter" },
    { id: "media-wall", label: "Media Wall" }
  ];
  mediaTypes = [
    { id: "image", label: "Image" },
    { id: "historical-map", label: "Historical map" },
    { id: "quote", label: "Evidence caption" },
    { id: "timeline", label: "Timeline" }
  ];
  selectedScene = signal(
    0,
    ...ngDevMode ? [{ debugName: "selectedScene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  upload(event) {
    const file = event.target.files?.[0];
    if (file)
      void this.runtime.storeRecording(file);
  }
  updateCamera(sceneId, event) {
    this.runtime.updateScene(sceneId, "camera", event.target.value);
  }
  updateMedia(sceneId, event) {
    this.runtime.updateScene(sceneId, "mediaType", event.target.value);
  }
  static \u0275fac = function ProductionStudioComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductionStudioComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductionStudioComponent, selectors: [["app-history-live-production-studio"]], decls: 66, vars: 15, consts: [["aria-labelledby", "production-title", 1, "production-room"], [1, "production-header"], ["id", "production-title"], ["type", "button", 3, "click"], ["role", "status"], [1, "readiness-list"], [1, "production-layout"], [1, "studio-preview"], [3, "scene"], [1, "live-bug"], [1, "lower-third"], [1, "ticker"], [1, "recording-bay"], [1, "bay-label"], ["controls", "", 3, "src"], [1, "camera-placeholder"], ["type", "button", 1, "stop"], ["type", "button", 3, "disabled"], ["type", "file", "accept", "video/*,audio/*", 3, "change", "disabled"], ["download", "report-recording", 3, "href"], ["rows", "5", 3, "input", "value"], [1, "scene-rundown"], [1, "scene-strip"], [1, "teleprompter"], ["type", "button", 1, "stop", 3, "click"], ["type", "button", 3, "click", "disabled"], [1, "scene-number"], [1, "scene-thumb"], [3, "change", "value"], [3, "selected", "value"], ["value", ""], ["rows", "3", 3, "input", "value"]], template: function ProductionStudioComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "header", 1)(2, "div")(3, "span");
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1", 2);
      \u0275\u0275text(6, "Build the visual rundown");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, "Three deliberate camera states. One clear evidence story.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "button", 3);
      \u0275\u0275listener("click", function ProductionStudioComponent_Template_button_click_9_listener() {
        return ctx.runtime.markReadyToAir();
      });
      \u0275\u0275text(10, "Submit package for review \u2192");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "p", 4);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(13, ProductionStudioComponent_Conditional_13_Template, 3, 0, "ul", 5);
      \u0275\u0275elementStart(14, "div", 6)(15, "div", 7);
      \u0275\u0275element(16, "app-history-live-evidence-scene", 8);
      \u0275\u0275elementStart(17, "div", 9);
      \u0275\u0275element(18, "i");
      \u0275\u0275text(19, " PREVIEW");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 10)(21, "span");
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div")(24, "strong");
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "small");
      \u0275\u0275text(27);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 11)(29, "strong");
      \u0275\u0275text(30, "HISTORY LIVE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "span");
      \u0275\u0275text(32);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(33, "aside", 12)(34, "span", 13);
      \u0275\u0275text(35, "REPORTER CAPTURE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "h2");
      \u0275\u0275text(37, "Record a rehearsal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "p");
      \u0275\u0275text(39, " Record or upload your report. A written script with evidence scenes is also a complete presentation format. ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(40, ProductionStudioComponent_Conditional_40_Template, 1, 1, "video", 14)(41, ProductionStudioComponent_Conditional_41_Template, 7, 2, "div", 15);
      \u0275\u0275conditionalCreate(42, ProductionStudioComponent_Conditional_42_Template, 2, 0, "button", 16)(43, ProductionStudioComponent_Conditional_43_Template, 2, 2, "button", 17);
      \u0275\u0275elementStart(44, "label");
      \u0275\u0275text(45, "Upload a recording (maximum 100 MB)");
      \u0275\u0275elementStart(46, "input", 18);
      \u0275\u0275listener("change", function ProductionStudioComponent_Template_input_change_46_listener($event) {
        return ctx.upload($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(47, ProductionStudioComponent_Conditional_47_Template, 2, 1, "a", 19);
      \u0275\u0275elementStart(48, "label");
      \u0275\u0275text(49, "Accurate recording transcript");
      \u0275\u0275elementStart(50, "textarea", 20);
      \u0275\u0275listener("input", function ProductionStudioComponent_Template_textarea_input_50_listener($event) {
        return ctx.runtime.updateTranscript($event.target.value);
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(51, "section", 21)(52, "header")(53, "span");
      \u0275\u0275text(54, "SCENE TIMELINE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "p");
      \u0275\u0275text(56, "The system controls layout. You control the evidence and message.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(57, "div", 22);
      \u0275\u0275repeaterCreate(58, ProductionStudioComponent_For_59_Template, 30, 10, "article", null, _forTrack04);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "aside", 23)(61, "span");
      \u0275\u0275text(62, "TELEPROMPTER PREVIEW");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "div");
      \u0275\u0275repeaterCreate(64, ProductionStudioComponent_For_65_Template, 4, 2, null, null, _forTrack04);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_8_0;
      let tmp_11_0;
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("PRODUCTION STUDIO \xB7 PACKAGE ", ctx.runtime.state().revision);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate2(" Package: ", ctx.runtime.state().packageStatus || "draft", ". ", ctx.runtime.state().packageFeedback, " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.readiness().length ? 13 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("scene", ctx.runtime.state().visualSequence[ctx.selectedScene()]);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.runtime.state().pitch.reportFormat);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.runtime.state().pitch.headline);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2("", ctx.runtime.viewer.studentDisplayName, " \xB7 ", ctx.runtime.selectedNetwork()?.name);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("Evidence-led reporting \xB7 ", ctx.runtime.config.historicalWindow, " \xB7 Sources attributed on air");
      \u0275\u0275advance(8);
      \u0275\u0275conditional((tmp_8_0 = ctx.runtime.recordingUrl()) ? 40 : 41, tmp_8_0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.runtime.recordingState() === "recording" ? 42 : 43);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.runtime.recordingState() === "requesting" || ctx.runtime.recordingState() === "recording");
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_11_0 = ctx.runtime.recordingUrl()) ? 47 : -1, tmp_11_0);
      \u0275\u0275advance(3);
      \u0275\u0275property("value", ctx.runtime.state().transcript || "");
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.runtime.state().visualSequence);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.runtime.state().scriptBlocks);
    }
  }, dependencies: [EvidenceSceneComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #dce5e9;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #d7b777;\n  outline-offset: 2px;\n}\n.production-room[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding-bottom: 3rem;\n  background:\n    radial-gradient(\n      circle at 80% 15%,\n      rgba(76, 115, 143, 0.17),\n      transparent 25rem),\n    #09141c;\n}\n.production-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 2rem;\n  border-bottom: 1px solid #293b46;\n  padding: 2rem clamp(1rem, 4vw, 4rem) 1.4rem;\n}\n.production-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.bay-label[_ngcontent-%COMP%], \n.scene-rundown[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.teleprompter[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #c3a46a;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.15em;\n}\n.production-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  color: #f0f2ef;\n  font: 400 clamp(2rem, 4vw, 3.15rem)/1 Georgia, serif;\n}\n.production-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n  color: #80949e;\n  font-size: 0.8rem;\n}\n.production-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 3rem;\n  border: 0;\n  padding: 0 1rem;\n  color: #12212a;\n  background: #d3b575;\n  font-size: 0.8rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.production-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 19rem;\n  gap: 1rem;\n  padding: 1.3rem clamp(1rem, 4vw, 4rem);\n}\n.studio-preview[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 28rem;\n  overflow: hidden;\n  border: 1px solid #4c5960;\n  background: url(/history-live/broadcast-studio.webp) center/cover no-repeat;\n  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.35);\n}\n.studio-preview[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      0deg,\n      rgba(1, 5, 8, 0.55),\n      transparent 45%),\n    radial-gradient(\n      circle at 50% 43%,\n      transparent 0 27%,\n      rgba(5, 10, 14, 0.24) 70%);\n}\n.screen-content[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 20%;\n  left: 31%;\n  display: grid;\n  width: 38%;\n  min-height: 33%;\n  place-items: center;\n  align-content: center;\n  padding: 1rem;\n  text-align: center;\n  text-shadow: 0 0.1rem 0.3rem #000;\n}\n.screen-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d4b575;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.15em;\n}\n.screen-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n  color: #eff4f5;\n  font: 400 clamp(1rem, 2vw, 1.7rem)/1.05 Georgia, serif;\n}\n.screen-content[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #9db1bc;\n  font-size: 0.8rem;\n  letter-spacing: 0.1em;\n}\n.live-bug[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  top: 1rem;\n  right: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.6rem;\n  color: white;\n  background: #aa352f;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n}\n.live-bug[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.4rem;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  background: white;\n}\n.lower-third[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  right: 7%;\n  bottom: 2.8rem;\n  left: 7%;\n  display: flex;\n  align-items: stretch;\n  border-left: 4px solid #bc4138;\n  color: #eef3f4;\n  background: rgba(7, 17, 24, 0.91);\n  box-shadow: 0 0.4rem 1.4rem rgba(0, 0, 0, 0.35);\n}\n.lower-third[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 0.6rem 0.8rem;\n  color: #e8cd95;\n  background: #223545;\n  font-size: 0.8rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.lower-third[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  padding: 0.55rem 0.8rem;\n}\n.lower-third[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.lower-third[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n.lower-third[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 clamp(0.8rem, 1.6vw, 1.15rem) Georgia, serif;\n}\n.lower-third[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  color: #96a9b3;\n  font-size: 0.8rem;\n  text-transform: uppercase;\n}\n.ticker[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  min-height: 2rem;\n  align-items: center;\n  color: #26333a;\n  background: #e2e4df;\n  font-size: 0.8rem;\n}\n.ticker[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  align-self: stretch;\n  display: flex;\n  align-items: center;\n  padding: 0 0.8rem;\n  color: #fff;\n  background: #a83b35;\n  font-size: 0.8rem;\n}\n.ticker[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding-left: 1rem;\n}\n.recording-bay[_ngcontent-%COMP%] {\n  border: 1px solid #30434e;\n  padding: 1rem;\n  background: #101e27;\n}\n.recording-bay[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.4rem 0;\n  color: #e5ebec;\n  font: 400 1.45rem Georgia, serif;\n}\n.recording-bay[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0 0 0.8rem;\n  color: #7f939d;\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.recording-bay[_ngcontent-%COMP%]   video[_ngcontent-%COMP%], \n.camera-placeholder[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 4/3;\n  border: 1px solid #394c56;\n  background: #071119;\n}\n.camera-placeholder[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  align-content: center;\n  color: #7c909a;\n}\n.camera-placeholder[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #a83d37;\n  font-size: 1.3rem;\n}\n.camera-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0.2rem;\n  color: #91a5ae;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n}\n.camera-placeholder[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.recording-bay[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 2.8rem;\n  margin-top: 0.7rem;\n  border: 0;\n  color: #f2f4f3;\n  background: #a33a34;\n  font-size: 0.8rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.recording-bay[_ngcontent-%COMP%]    > button.stop[_ngcontent-%COMP%] {\n  background: #7c2b28;\n}\n.recording-bay[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]:disabled {\n  background: #34454f;\n}\n.recording-note[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.7rem;\n  color: #60747f;\n  font-size: 0.8rem;\n  line-height: 1.4;\n}\n.scene-rundown[_ngcontent-%COMP%] {\n  margin: 0 clamp(1rem, 4vw, 4rem);\n  border: 1px solid #30434e;\n  background: #101d26;\n}\n.scene-rundown[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 1px solid #2d404b;\n  padding: 0.8rem 1rem;\n}\n.scene-rundown[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #6f838e;\n  font-size: 0.8rem;\n}\n.scene-strip[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.8rem;\n  padding: 1rem;\n}\n.scene-strip[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.6rem;\n  border: 1px solid #2d414c;\n  padding: 0.7rem;\n  background: #0b171f;\n}\n.scene-number[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 0.35rem;\n  left: 0.35rem;\n  display: grid;\n  width: 1.5rem;\n  aspect-ratio: 1;\n  place-items: center;\n  color: #192731;\n  background: #d1b372;\n  font: 800 0.6rem Georgia, serif;\n}\n.scene-thumb[_ngcontent-%COMP%] {\n  position: relative;\n  grid-column: 1/-1;\n  height: 7rem;\n  overflow: hidden;\n  background: linear-gradient(#233a4b, #111e28);\n}\n.scene-thumb[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 15%;\n  bottom: 10%;\n  left: 15%;\n  height: 28%;\n  border-radius: 50% 50% 0 0;\n  background: #0b1318;\n}\n.scene-thumb[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 22%;\n  left: 30%;\n  width: 40%;\n  height: 38%;\n  border: 1px solid #7c9cb0;\n  background: #2f5268;\n}\n.scene-thumb[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.4rem;\n  bottom: 0.35rem;\n  color: #a7bbc4;\n  font-size: 0.8rem;\n  text-transform: uppercase;\n}\n.scene-thumb.reporter[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  left: 55%;\n  width: 18%;\n  border-radius: 50% 50% 30% 30%;\n  background: #6d7d84;\n}\n.scene-thumb.media-wall[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  top: 12%;\n  left: 12%;\n  width: 76%;\n  height: 60%;\n  background: #365f79;\n}\n.scene-strip[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n  color: #718690;\n  font-size: 0.8rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.scene-strip[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #354a55;\n  padding: 0.45rem;\n  color: #b9c7cc;\n  background: #14242e;\n  font-size: 0.8rem;\n  text-transform: none;\n}\n.teleprompter[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 9rem minmax(0, 1fr);\n  gap: 1rem;\n  margin: 1rem clamp(1rem, 4vw, 4rem);\n  border: 1px solid #2c3e49;\n  padding: 1rem;\n  background: #070d12;\n}\n.teleprompter[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n}\n.teleprompter[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  max-height: 10rem;\n  overflow: auto;\n  border-left: 1px solid #2e414b;\n  padding: 0.4rem 1rem;\n}\n.teleprompter[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #b7995f;\n  font-size: 0.8rem;\n}\n.teleprompter[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0.7rem;\n  color: #e0e6e8;\n  font: 400 1rem/1.5 Georgia, serif;\n}\n@media (max-width: 850px) {\n  .production-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .recording-bay[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 0.5rem;\n  }\n  .recording-bay[_ngcontent-%COMP%]   video[_ngcontent-%COMP%], \n   .camera-placeholder[_ngcontent-%COMP%] {\n    grid-row: 1/6;\n    grid-column: 2;\n  }\n  .scene-strip[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .scene-thumb[_ngcontent-%COMP%] {\n    height: 10rem;\n  }\n}\n@media (max-width: 580px) {\n  .production-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .studio-preview[_ngcontent-%COMP%] {\n    min-height: 19rem;\n  }\n  .recording-bay[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .recording-bay[_ngcontent-%COMP%]   video[_ngcontent-%COMP%], \n   .camera-placeholder[_ngcontent-%COMP%] {\n    margin-top: 0.8rem;\n  }\n  .teleprompter[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .teleprompter[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    border-top: 1px solid #2e414b;\n    border-left: 0;\n  }\n  .lower-third[_ngcontent-%COMP%] {\n    right: 2%;\n    left: 2%;\n  }\n  .screen-content[_ngcontent-%COMP%] {\n    top: 20%;\n    left: 25%;\n    width: 50%;\n  }\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  min-height: 2.75rem;\n}\ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n  line-height: 1.5;\n}\nbutton[aria-disabled=true][_ngcontent-%COMP%] {\n  opacity: 0.65;\n}\n.recording-bay[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n.scene-strip[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n}\n.recording-bay[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \n.scene-strip[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  font-size: 1rem;\n}\n.studio-preview[_ngcontent-%COMP%]    > app-history-live-evidence-scene[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: block;\n  padding: 1rem 1rem 9rem;\n}\n.readiness-list[_ngcontent-%COMP%] {\n  padding: 1rem 2rem;\n  color: #f5deb3;\n}\n/*# sourceMappingURL=production-studio.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductionStudioComponent, [{
    type: Component,
    args: [{ selector: "app-history-live-production-studio", imports: [EvidenceSceneComponent], template: `<section class="production-room" aria-labelledby="production-title">
  <header class="production-header">
    <div>
      <span>PRODUCTION STUDIO \xB7 PACKAGE {{ runtime.state().revision }}</span>
      <h1 id="production-title">Build the visual rundown</h1>
      <p>Three deliberate camera states. One clear evidence story.</p>
    </div>
    <button type="button" (click)="runtime.markReadyToAir()">Submit package for review \u2192</button>
  </header>
  <p role="status">
    Package: {{ runtime.state().packageStatus || 'draft' }}. {{ runtime.state().packageFeedback }}
  </p>
  @if (runtime.readiness().length) {
    <ul class="readiness-list">
      @for (issue of runtime.readiness(); track issue) {
        <li>{{ issue }}</li>
      }
    </ul>
  }
  <div class="production-layout">
    <div class="studio-preview">
      <app-history-live-evidence-scene [scene]="runtime.state().visualSequence[selectedScene()]" />
      <div class="live-bug"><i></i> PREVIEW</div>
      <div class="lower-third">
        <span>{{ runtime.state().pitch.reportFormat }}</span>
        <div>
          <strong>{{ runtime.state().pitch.headline }}</strong
          ><small
            >{{ runtime.viewer.studentDisplayName }} \xB7 {{ runtime.selectedNetwork()?.name }}</small
          >
        </div>
      </div>
      <div class="ticker">
        <strong>HISTORY LIVE</strong
        ><span
          >Evidence-led reporting \xB7 {{ runtime.config.historicalWindow }} \xB7 Sources attributed on
          air</span
        >
      </div>
    </div>
    <aside class="recording-bay">
      <span class="bay-label">REPORTER CAPTURE</span>
      <h2>Record a rehearsal</h2>
      <p>
        Record or upload your report. A written script with evidence scenes is also a complete
        presentation format.
      </p>
      @if (runtime.recordingUrl(); as url) {
        <video controls [src]="url"></video>
      } @else {
        <div class="camera-placeholder">
          <span>\u25CF</span>
          <p>
            {{
              runtime.recordingState() === 'recording' ? 'RECORDING IN PROGRESS' : 'CAMERA PREVIEW'
            }}
          </p>
          <small>{{ runtime.viewer.studentDisplayName }}</small>
        </div>
      }
      @if (runtime.recordingState() === 'recording') {
        <button class="stop" type="button" (click)="runtime.stopRecording()">
          \u25A0 Stop recording
        </button>
      } @else {
        <button
          type="button"
          (click)="runtime.startRecording()"
          [disabled]="runtime.recordingState() === 'requesting'"
        >
          \u25CF
          {{
            runtime.recordingState() === 'requesting' ? 'Requesting camera\u2026' : 'Record rehearsal'
          }}
        </button>
      }
      <label
        >Upload a recording (maximum 100 MB)<input
          type="file"
          accept="video/*,audio/*"
          (change)="upload($event)"
          [disabled]="
            runtime.recordingState() === 'requesting' || runtime.recordingState() === 'recording'
          "
      /></label>
      @if (runtime.recordingUrl(); as url) {
        <a [href]="url" download="report-recording">Download recording backup</a>
      }
      <label
        >Accurate recording transcript<textarea
          rows="5"
          [value]="runtime.state().transcript || ''"
          (input)="runtime.updateTranscript($any($event.target).value)"
        ></textarea>
      </label>
    </aside>
  </div>
  <section class="scene-rundown">
    <header>
      <span>SCENE TIMELINE</span>
      <p>The system controls layout. You control the evidence and message.</p>
    </header>
    <div class="scene-strip">
      @for (scene of runtime.state().visualSequence; track scene.id; let number = $index) {
        <article>
          <button
            type="button"
            (click)="selectedScene.set(number)"
            [attr.aria-pressed]="selectedScene() === number"
          >
            Preview scene {{ number + 1 }}</button
          ><span class="scene-number">{{ number + 1 }}</span>
          <div class="scene-thumb" [class]="'scene-thumb ' + scene.camera">
            <i></i><b></b><small>{{ scene.camera }}</small>
          </div>
          <label
            >Camera<select [value]="scene.camera" (change)="updateCamera(scene.id, $event)">
              @for (camera of cameraStates; track camera.id) {
                <option [selected]="camera.id === scene.camera" [value]="camera.id">
                  {{ camera.label }}
                </option>
              }
            </select></label
          ><label
            >Media<select [value]="scene.mediaType" (change)="updateMedia(scene.id, $event)">
              @for (media of mediaTypes; track media.id) {
                <option [selected]="media.id === scene.mediaType" [value]="media.id">
                  {{ media.label }}
                </option>
              }
            </select></label
          ><label
            >Evidence source<select
              [value]="scene.sourceId || ''"
              (change)="runtime.updateScene(scene.id, 'sourceId', $any($event.target).value)"
            >
              <option value="">Choose a source</option>
              @for (source of runtime.savedSources(); track source.id) {
                <option [selected]="source.id === scene.sourceId" [value]="source.id">
                  {{ source.title }}
                </option>
              }
            </select></label
          ><label
            >Evidence caption<textarea
              rows="3"
              [value]="scene.caption || ''"
              (input)="runtime.updateScene(scene.id, 'caption', $any($event.target).value)"
            ></textarea>
          </label>
        </article>
      }
    </div>
  </section>
  <aside class="teleprompter">
    <span>TELEPROMPTER PREVIEW</span>
    <div>
      @for (block of runtime.state().scriptBlocks; track block.id) {
        <small>[{{ block.type }}]</small>
        <p>{{ block.text }}</p>
      }
    </div>
  </aside>
</section>
`, styles: ['/* src/app/templates/history-live/ui/production-studio.component.scss */\n:host {\n  display: block;\n  color: #dce5e9;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\nselect {\n  font: inherit;\n}\nbutton:focus-visible,\nselect:focus-visible {\n  outline: 3px solid #d7b777;\n  outline-offset: 2px;\n}\n.production-room {\n  min-height: 100vh;\n  padding-bottom: 3rem;\n  background:\n    radial-gradient(\n      circle at 80% 15%,\n      rgba(76, 115, 143, 0.17),\n      transparent 25rem),\n    #09141c;\n}\n.production-header {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 2rem;\n  border-bottom: 1px solid #293b46;\n  padding: 2rem clamp(1rem, 4vw, 4rem) 1.4rem;\n}\n.production-header span,\n.bay-label,\n.scene-rundown > header span,\n.teleprompter > span {\n  color: #c3a46a;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.15em;\n}\n.production-header h1 {\n  margin: 0.35rem 0 0;\n  color: #f0f2ef;\n  font: 400 clamp(2rem, 4vw, 3.15rem)/1 Georgia, serif;\n}\n.production-header p {\n  margin: 0.5rem 0 0;\n  color: #80949e;\n  font-size: 0.8rem;\n}\n.production-header button {\n  min-height: 3rem;\n  border: 0;\n  padding: 0 1rem;\n  color: #12212a;\n  background: #d3b575;\n  font-size: 0.8rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.production-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 19rem;\n  gap: 1rem;\n  padding: 1.3rem clamp(1rem, 4vw, 4rem);\n}\n.studio-preview {\n  position: relative;\n  min-height: 28rem;\n  overflow: hidden;\n  border: 1px solid #4c5960;\n  background: url(/history-live/broadcast-studio.webp) center/cover no-repeat;\n  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.35);\n}\n.studio-preview::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      0deg,\n      rgba(1, 5, 8, 0.55),\n      transparent 45%),\n    radial-gradient(\n      circle at 50% 43%,\n      transparent 0 27%,\n      rgba(5, 10, 14, 0.24) 70%);\n}\n.screen-content {\n  position: absolute;\n  z-index: 2;\n  top: 20%;\n  left: 31%;\n  display: grid;\n  width: 38%;\n  min-height: 33%;\n  place-items: center;\n  align-content: center;\n  padding: 1rem;\n  text-align: center;\n  text-shadow: 0 0.1rem 0.3rem #000;\n}\n.screen-content span {\n  color: #d4b575;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.15em;\n}\n.screen-content strong {\n  margin: 0.5rem 0;\n  color: #eff4f5;\n  font: 400 clamp(1rem, 2vw, 1.7rem)/1.05 Georgia, serif;\n}\n.screen-content small {\n  color: #9db1bc;\n  font-size: 0.8rem;\n  letter-spacing: 0.1em;\n}\n.live-bug {\n  position: absolute;\n  z-index: 3;\n  top: 1rem;\n  right: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.6rem;\n  color: white;\n  background: #aa352f;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n}\n.live-bug i {\n  width: 0.4rem;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  background: white;\n}\n.lower-third {\n  position: absolute;\n  z-index: 3;\n  right: 7%;\n  bottom: 2.8rem;\n  left: 7%;\n  display: flex;\n  align-items: stretch;\n  border-left: 4px solid #bc4138;\n  color: #eef3f4;\n  background: rgba(7, 17, 24, 0.91);\n  box-shadow: 0 0.4rem 1.4rem rgba(0, 0, 0, 0.35);\n}\n.lower-third > span {\n  display: flex;\n  align-items: center;\n  padding: 0.6rem 0.8rem;\n  color: #e8cd95;\n  background: #223545;\n  font-size: 0.8rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.lower-third div {\n  padding: 0.55rem 0.8rem;\n}\n.lower-third strong,\n.lower-third small {\n  display: block;\n}\n.lower-third strong {\n  font: 700 clamp(0.8rem, 1.6vw, 1.15rem) Georgia, serif;\n}\n.lower-third small {\n  margin-top: 0.2rem;\n  color: #96a9b3;\n  font-size: 0.8rem;\n  text-transform: uppercase;\n}\n.ticker {\n  position: absolute;\n  z-index: 3;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  min-height: 2rem;\n  align-items: center;\n  color: #26333a;\n  background: #e2e4df;\n  font-size: 0.8rem;\n}\n.ticker strong {\n  align-self: stretch;\n  display: flex;\n  align-items: center;\n  padding: 0 0.8rem;\n  color: #fff;\n  background: #a83b35;\n  font-size: 0.8rem;\n}\n.ticker span {\n  padding-left: 1rem;\n}\n.recording-bay {\n  border: 1px solid #30434e;\n  padding: 1rem;\n  background: #101e27;\n}\n.recording-bay h2 {\n  margin: 0.4rem 0;\n  color: #e5ebec;\n  font: 400 1.45rem Georgia, serif;\n}\n.recording-bay > p {\n  margin: 0 0 0.8rem;\n  color: #7f939d;\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.recording-bay video,\n.camera-placeholder {\n  width: 100%;\n  aspect-ratio: 4/3;\n  border: 1px solid #394c56;\n  background: #071119;\n}\n.camera-placeholder {\n  display: grid;\n  place-items: center;\n  align-content: center;\n  color: #7c909a;\n}\n.camera-placeholder > span {\n  color: #a83d37;\n  font-size: 1.3rem;\n}\n.camera-placeholder p {\n  margin: 0.5rem 0 0.2rem;\n  color: #91a5ae;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n}\n.camera-placeholder small {\n  font-size: 0.8rem;\n}\n.recording-bay > button {\n  width: 100%;\n  min-height: 2.8rem;\n  margin-top: 0.7rem;\n  border: 0;\n  color: #f2f4f3;\n  background: #a33a34;\n  font-size: 0.8rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.recording-bay > button.stop {\n  background: #7c2b28;\n}\n.recording-bay > button:disabled {\n  background: #34454f;\n}\n.recording-note {\n  display: block;\n  margin-top: 0.7rem;\n  color: #60747f;\n  font-size: 0.8rem;\n  line-height: 1.4;\n}\n.scene-rundown {\n  margin: 0 clamp(1rem, 4vw, 4rem);\n  border: 1px solid #30434e;\n  background: #101d26;\n}\n.scene-rundown > header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 1px solid #2d404b;\n  padding: 0.8rem 1rem;\n}\n.scene-rundown header p {\n  margin: 0;\n  color: #6f838e;\n  font-size: 0.8rem;\n}\n.scene-strip {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.8rem;\n  padding: 1rem;\n}\n.scene-strip article {\n  position: relative;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.6rem;\n  border: 1px solid #2d414c;\n  padding: 0.7rem;\n  background: #0b171f;\n}\n.scene-number {\n  position: absolute;\n  z-index: 2;\n  top: 0.35rem;\n  left: 0.35rem;\n  display: grid;\n  width: 1.5rem;\n  aspect-ratio: 1;\n  place-items: center;\n  color: #192731;\n  background: #d1b372;\n  font: 800 0.6rem Georgia, serif;\n}\n.scene-thumb {\n  position: relative;\n  grid-column: 1/-1;\n  height: 7rem;\n  overflow: hidden;\n  background: linear-gradient(#233a4b, #111e28);\n}\n.scene-thumb i {\n  position: absolute;\n  right: 15%;\n  bottom: 10%;\n  left: 15%;\n  height: 28%;\n  border-radius: 50% 50% 0 0;\n  background: #0b1318;\n}\n.scene-thumb b {\n  position: absolute;\n  top: 22%;\n  left: 30%;\n  width: 40%;\n  height: 38%;\n  border: 1px solid #7c9cb0;\n  background: #2f5268;\n}\n.scene-thumb small {\n  position: absolute;\n  right: 0.4rem;\n  bottom: 0.35rem;\n  color: #a7bbc4;\n  font-size: 0.8rem;\n  text-transform: uppercase;\n}\n.scene-thumb.reporter b {\n  left: 55%;\n  width: 18%;\n  border-radius: 50% 50% 30% 30%;\n  background: #6d7d84;\n}\n.scene-thumb.media-wall b {\n  top: 12%;\n  left: 12%;\n  width: 76%;\n  height: 60%;\n  background: #365f79;\n}\n.scene-strip label {\n  display: grid;\n  gap: 0.3rem;\n  color: #718690;\n  font-size: 0.8rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.scene-strip select {\n  width: 100%;\n  border: 1px solid #354a55;\n  padding: 0.45rem;\n  color: #b9c7cc;\n  background: #14242e;\n  font-size: 0.8rem;\n  text-transform: none;\n}\n.teleprompter {\n  display: grid;\n  grid-template-columns: 9rem minmax(0, 1fr);\n  gap: 1rem;\n  margin: 1rem clamp(1rem, 4vw, 4rem);\n  border: 1px solid #2c3e49;\n  padding: 1rem;\n  background: #070d12;\n}\n.teleprompter > span {\n  padding: 0.5rem;\n}\n.teleprompter > div {\n  max-height: 10rem;\n  overflow: auto;\n  border-left: 1px solid #2e414b;\n  padding: 0.4rem 1rem;\n}\n.teleprompter small {\n  color: #b7995f;\n  font-size: 0.8rem;\n}\n.teleprompter p {\n  margin: 0.2rem 0 0.7rem;\n  color: #e0e6e8;\n  font: 400 1rem/1.5 Georgia, serif;\n}\n@media (max-width: 850px) {\n  .production-layout {\n    grid-template-columns: 1fr;\n  }\n  .recording-bay {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 0.5rem;\n  }\n  .recording-bay video,\n  .camera-placeholder {\n    grid-row: 1/6;\n    grid-column: 2;\n  }\n  .scene-strip {\n    grid-template-columns: 1fr;\n  }\n  .scene-thumb {\n    height: 10rem;\n  }\n}\n@media (max-width: 580px) {\n  .production-header {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .studio-preview {\n    min-height: 19rem;\n  }\n  .recording-bay {\n    display: block;\n  }\n  .recording-bay video,\n  .camera-placeholder {\n    margin-top: 0.8rem;\n  }\n  .teleprompter {\n    grid-template-columns: 1fr;\n  }\n  .teleprompter > div {\n    border-top: 1px solid #2e414b;\n    border-left: 0;\n  }\n  .lower-third {\n    right: 2%;\n    left: 2%;\n  }\n  .screen-content {\n    top: 20%;\n    left: 25%;\n    width: 50%;\n  }\n}\nbutton,\nselect,\ninput {\n  min-height: 2.75rem;\n}\ntextarea {\n  font: inherit;\n  line-height: 1.5;\n}\nbutton[aria-disabled=true] {\n  opacity: 0.65;\n}\n.recording-bay label,\n.scene-strip label {\n  display: grid;\n  gap: 0.4rem;\n}\n.recording-bay textarea,\n.scene-strip textarea {\n  width: 100%;\n  font-size: 1rem;\n}\n.studio-preview > app-history-live-evidence-scene {\n  position: relative;\n  z-index: 2;\n  display: block;\n  padding: 1rem 1rem 9rem;\n}\n.readiness-list {\n  padding: 1rem 2rem;\n  color: #f5deb3;\n}\n/*# sourceMappingURL=production-studio.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductionStudioComponent, { className: "ProductionStudioComponent", filePath: "src/app/templates/history-live/ui/production-studio.component.ts", lineNumber: 13 });
})();

// src/app/templates/history-live/ui/script-desk.component.ts
var _forTrack05 = ($index, $item) => $item.id;
function ScriptDeskComponent_For_28_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const type_r4 = ctx.$implicit;
    const block_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275domProperty("selected", type_r4 === block_r2.type)("value", type_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r4);
  }
}
function ScriptDeskComponent_For_28_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const claim_r5 = ctx.$implicit;
    const block_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275domProperty("selected", claim_r5.id === block_r2.claimId)("value", claim_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", claim_r5.text, " ");
  }
}
function ScriptDeskComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article", 7)(1, "span", 14);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "label")(4, "span", 15);
    \u0275\u0275text(5, "Cue type");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "select", 16);
    \u0275\u0275domListener("change", function ScriptDeskComponent_For_28_Template_select_change_6_listener($event) {
      const block_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateType(block_r2.id, $event));
    });
    \u0275\u0275repeaterCreate(7, ScriptDeskComponent_For_28_For_8_Template, 2, 3, "option", 17, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "textarea", 18);
    \u0275\u0275domListener("input", function ScriptDeskComponent_For_28_Template_textarea_input_9_listener($event) {
      const block_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateText(block_r2.id, $event));
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "label");
    \u0275\u0275text(11, "Evidence claim");
    \u0275\u0275domElementStart(12, "select", 16);
    \u0275\u0275domListener("change", function ScriptDeskComponent_For_28_Template_select_change_12_listener($event) {
      const block_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.linkScriptClaim(block_r2.id, $event.target.value));
    });
    \u0275\u0275domElementStart(13, "option", 19);
    \u0275\u0275text(14, "Opening / transition / closing");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(15, ScriptDeskComponent_For_28_For_16_Template, 2, 3, "option", 17, _forTrack05);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(17, "button", 20);
    \u0275\u0275domListener("click", function ScriptDeskComponent_For_28_Template_button_click_17_listener() {
      const block_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.removeScriptBlock(block_r2.id));
    });
    \u0275\u0275text(18, " \xD7 ");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const block_r2 = ctx.$implicit;
    const \u0275$index_45_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((\u0275$index_45_r6 + 1).toString().padStart(2, "0"));
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("value", block_r2.type);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.blockTypes);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("value", block_r2.text)("placeholder", block_r2.type === "REPORTER CLOSE" ? "For " + ctx_r2.runtime.selectedNetwork()?.name + ", I\u2019m\u2026" : "Write the next line of the report\u2026");
    \u0275\u0275attribute("aria-label", "Script cue " + (\u0275$index_45_r6 + 1) + ": " + block_r2.type);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", block_r2.claimId || "");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.runtime.state().claims);
  }
}
function ScriptDeskComponent_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 4);
    \u0275\u0275domListener("click", function ScriptDeskComponent_For_33_Template_button_click_0_listener() {
      const type_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.addScriptBlock(type_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const type_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+ ", type_r8);
  }
}
function ScriptDeskComponent_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const claim_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(claim_r9.status.replace("-", " "));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(claim_r9.text);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", claim_r9.supportingSourceIds.length, " sources");
  }
}
function ScriptDeskComponent_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article", 12)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const source_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r10.sourceType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r10.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", source_r10.creator, " \xB7 ", source_r10.dateLabel);
  }
}
var ScriptDeskComponent = class _ScriptDeskComponent {
  runtime = inject(HistoryLiveRuntimeService);
  blockTypes = [
    "ON CAMERA",
    "VOICEOVER",
    "SHOW MAP",
    "SHOW SOURCE",
    "SHOW QUOTE",
    "TRANSITION",
    "LOWER THIRD",
    "REPORTER CLOSE"
  ];
  updateText(blockId, event) {
    this.runtime.updateScriptBlock(blockId, event.target.value);
  }
  updateType(blockId, event) {
    this.runtime.setScriptBlockType(blockId, event.target.value);
  }
  static \u0275fac = function ScriptDeskComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScriptDeskComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ScriptDeskComponent, selectors: [["app-history-live-script-desk"]], decls: 50, vars: 6, consts: [["aria-labelledby", "script-title", 1, "script-room"], [1, "script-header"], ["id", "script-title"], [1, "script-stats"], ["type", "button", 3, "click"], [1, "script-layout"], [1, "script-page"], [1, "script-block"], [1, "add-cues"], ["type", "button"], [1, "script-sidebar"], [1, "sidebar-label"], [1, "source"], [1, "opposing"], [1, "line-number"], [1, "sr-only"], [3, "change", "value"], [3, "selected", "value"], ["rows", "3", 3, "input", "value", "placeholder"], ["value", ""], ["type", "button", "aria-label", "Remove script cue", 3, "click"]], template: function ScriptDeskComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "header", 1)(2, "div")(3, "span");
      \u0275\u0275text(4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "h1", 2);
      \u0275\u0275text(6, "Write for the camera, not the essay page");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "p");
      \u0275\u0275text(8, "Short sentences. Visible evidence. Honest uncertainty.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(9, "div", 3)(10, "span")(11, "strong");
      \u0275\u0275text(12);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(13, " cues");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(14, "span")(15, "strong");
      \u0275\u0275text(16);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(17, " checked claims");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(18, "button", 4);
      \u0275\u0275domListener("click", function ScriptDeskComponent_Template_button_click_18_listener() {
        return ctx.runtime.goTo("production");
      });
      \u0275\u0275text(19, "Open production \u2192");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(20, "div", 5)(21, "div", 6)(22, "header")(23, "span");
      \u0275\u0275text(24);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(25, "small");
      \u0275\u0275text(26);
      \u0275\u0275domElementEnd()();
      \u0275\u0275repeaterCreate(27, ScriptDeskComponent_For_28_Template, 19, 6, "article", 7, _forTrack05);
      \u0275\u0275domElementStart(29, "div", 8)(30, "span");
      \u0275\u0275text(31, "ADD CUE");
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(32, ScriptDeskComponent_For_33_Template, 2, 1, "button", 9, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(34, "aside", 10)(35, "section")(36, "span", 11);
      \u0275\u0275text(37, "CHECKED CLAIMS");
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(38, ScriptDeskComponent_For_39_Template, 7, 3, "article", null, _forTrack05);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(40, "section")(41, "span", 11);
      \u0275\u0275text(42, "PINNED SOURCES");
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(43, ScriptDeskComponent_For_44_Template, 7, 4, "article", 12, _forTrack05);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(45, "section", 13)(46, "span", 11);
      \u0275\u0275text(47, "OTHER NETWORK CHECK");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(48, "p");
      \u0275\u0275text(49);
      \u0275\u0275domElementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("SCRIPT DESK \xB7 ", ctx.runtime.state().pitch.reportFormat);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.runtime.state().scriptBlocks.length);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.runtime.state().claims.length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1("", ctx.runtime.selectedNetwork()?.shortName, " / STORY SCRIPT");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.state().pitch.headline);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.runtime.state().scriptBlocks);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.blockTypes);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.runtime.state().claims);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.runtime.savedSources());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.runtime.state().pitch.opposingChallenge || "Return to the pitch desk and name the strongest challenge the other network could make.", " ");
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #dce5e9;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #d6b676;\n  outline-offset: 2px;\n}\n.script-room[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding-bottom: 3rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.018) 1px,\n      transparent 1px) 0 0/4rem 4rem,\n    #0b161f;\n}\n.script-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 2rem;\n  border-bottom: 1px solid #293a45;\n  padding: 2rem clamp(1rem, 4vw, 4rem) 1.4rem;\n  background:\n    linear-gradient(\n      100deg,\n      #142631,\n      #0b161e);\n}\n.script-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child {\n  flex: 1;\n}\n.script-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.sidebar-label[_ngcontent-%COMP%] {\n  color: #c4a66a;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.15em;\n}\n.script-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  color: #eff2ef;\n  font: 400 clamp(2rem, 4vw, 3.1rem)/1 Georgia, serif;\n}\n.script-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.55rem 0 0;\n  color: #8397a1;\n  font-size: 0.8rem;\n}\n.script-stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.script-stats[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  color: #7c909a;\n  font-size: 0.8rem;\n  text-align: center;\n  text-transform: uppercase;\n}\n.script-stats[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #d8e2e5;\n  font: 400 1.5rem Georgia, serif;\n}\n.script-stats[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 3rem;\n  border: 0;\n  padding: 0 1rem;\n  color: #11202a;\n  background: #d1b473;\n  font-size: 0.8rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.script-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 20rem;\n  gap: 1rem;\n  padding: 1.4rem clamp(1rem, 4vw, 4rem);\n}\n.script-page[_ngcontent-%COMP%] {\n  min-width: 0;\n  border: 1px solid #40505a;\n  padding: 1.2rem 1.3rem;\n  color: #1c2c35;\n  background: #e8e8df;\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.22);\n}\n.script-page[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 2px solid #23343d;\n  padding-bottom: 0.7rem;\n  color: #2c444f;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n}\n.script-page[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: #596a71;\n  font-weight: 600;\n  letter-spacing: 0;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.script-block[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: 2.2rem 8.6rem minmax(0, 1fr) auto;\n  gap: 0.7rem;\n  border-bottom: 1px solid #bfc4bf;\n  padding: 0.9rem 0;\n}\n.line-number[_ngcontent-%COMP%] {\n  padding-top: 0.65rem;\n  color: #8b918d;\n  font: 600 0.7rem Georgia, serif;\n}\n.script-block[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.script-block[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #abb3ae;\n  border-radius: 0;\n  padding: 0.65rem;\n  color: #1d313b;\n  background: #f5f4eb;\n  font-size: 0.8rem;\n}\n.script-block[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  color: #7b422d;\n  font-size: 0.8rem;\n  font-weight: 900;\n}\n.script-block[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  line-height: 1.55;\n}\n.script-block[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  align-self: start;\n  border: 0;\n  padding: 0.45rem;\n  color: #8f9691;\n  background: transparent;\n  font-size: 1rem;\n  cursor: pointer;\n}\n.add-cues[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.35rem;\n  padding-top: 1rem;\n}\n.add-cues[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-right: 0.3rem;\n  color: #717e7c;\n  font-size: 0.8rem;\n  font-weight: 900;\n}\n.add-cues[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #a7b0ab;\n  padding: 0.35rem 0.5rem;\n  color: #40515a;\n  background: #f0efe7;\n  font-size: 0.8rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.script-sidebar[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 1rem;\n}\n.script-sidebar[_ngcontent-%COMP%]    > section[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.6rem;\n  border: 1px solid #2d414c;\n  padding: 1rem;\n  background: #101d26;\n}\n.script-sidebar[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border-top: 1px solid #2c3e48;\n  padding-top: 0.6rem;\n}\n.script-sidebar[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #9cc0a6;\n  font-size: 0.8rem;\n  text-transform: uppercase;\n}\n.script-sidebar[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0;\n  color: #b7c3c8;\n  font: italic 0.76rem/1.45 Georgia, serif;\n}\n.script-sidebar[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #687b86;\n  font-size: 0.8rem;\n}\n.script-sidebar[_ngcontent-%COMP%]   article.source[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #7d96a2;\n  font-size: 0.8rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.script-sidebar[_ngcontent-%COMP%]   article.source[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #cbd4d7;\n  font-style: normal;\n}\n.opposing[_ngcontent-%COMP%] {\n  border-left: 3px solid #a96e63 !important;\n}\n.opposing[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0.2rem 0;\n  color: #b9c4c8;\n  font: italic 0.8rem/1.5 Georgia, serif;\n}\n@media (max-width: 850px) {\n  .script-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .script-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .script-sidebar[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 600px) {\n  .script-stats[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-wrap: wrap;\n  }\n  .script-stats[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .script-block[_ngcontent-%COMP%] {\n    grid-template-columns: 2rem 1fr auto;\n  }\n  .script-block[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n    grid-column: 2/-1;\n  }\n  .script-sidebar[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  min-height: 2.75rem;\n}\ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n  line-height: 1.5;\n}\nbutton[aria-disabled=true][_ngcontent-%COMP%] {\n  opacity: 0.65;\n}\n.script-block[_ngcontent-%COMP%] {\n  grid-template-columns: 2rem 9rem minmax(0, 1fr) auto;\n}\n.script-block[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%]:nth-of-type(2) {\n  grid-column: 2/4;\n  display: grid;\n  gap: 0.4rem;\n}\n.script-block[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n@media (max-width: 600px) {\n  .script-block[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .script-block[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%]:nth-of-type(2) {\n    grid-column: auto;\n  }\n}\n/*# sourceMappingURL=script-desk.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScriptDeskComponent, [{
    type: Component,
    args: [{ selector: "app-history-live-script-desk", template: `<section class="script-room" aria-labelledby="script-title">
  <header class="script-header">
    <div>
      <span>SCRIPT DESK \xB7 {{ runtime.state().pitch.reportFormat }}</span>
      <h1 id="script-title">Write for the camera, not the essay page</h1>
      <p>Short sentences. Visible evidence. Honest uncertainty.</p>
    </div>
    <div class="script-stats">
      <span
        ><strong>{{ runtime.state().scriptBlocks.length }}</strong> cues</span
      ><span
        ><strong>{{ runtime.state().claims.length }}</strong> checked claims</span
      ><button type="button" (click)="runtime.goTo('production')">Open production \u2192</button>
    </div>
  </header>
  <div class="script-layout">
    <div class="script-page">
      <header>
        <span>{{ runtime.selectedNetwork()?.shortName }} / STORY SCRIPT</span
        ><small>{{ runtime.state().pitch.headline }}</small>
      </header>
      @for (block of runtime.state().scriptBlocks; track block.id; let number = $index) {
        <article class="script-block">
          <span class="line-number">{{ (number + 1).toString().padStart(2, '0') }}</span>
          <label
            ><span class="sr-only">Cue type</span
            ><select [value]="block.type" (change)="updateType(block.id, $event)">
              @for (type of blockTypes; track type) {
                <option [selected]="type === block.type" [value]="type">{{ type }}</option>
              }
            </select></label
          >
          <textarea
            [attr.aria-label]="'Script cue ' + (number + 1) + ': ' + block.type"
            rows="3"
            [value]="block.text"
            (input)="updateText(block.id, $event)"
            [placeholder]="
              block.type === 'REPORTER CLOSE'
                ? 'For ' + runtime.selectedNetwork()?.name + ', I\u2019m\u2026'
                : 'Write the next line of the report\u2026'
            "
          ></textarea>
          <label
            >Evidence claim<select
              [value]="block.claimId || ''"
              (change)="runtime.linkScriptClaim(block.id, $any($event.target).value)"
            >
              <option value="">Opening / transition / closing</option>
              @for (claim of runtime.state().claims; track claim.id) {
                <option [selected]="claim.id === block.claimId" [value]="claim.id">
                  {{ claim.text }}
                </option>
              }
            </select></label
          >
          <button
            type="button"
            (click)="runtime.removeScriptBlock(block.id)"
            aria-label="Remove script cue"
          >
            \xD7
          </button>
        </article>
      }
      <div class="add-cues">
        <span>ADD CUE</span>
        @for (type of blockTypes; track type) {
          <button type="button" (click)="runtime.addScriptBlock(type)">+ {{ type }}</button>
        }
      </div>
    </div>
    <aside class="script-sidebar">
      <section>
        <span class="sidebar-label">CHECKED CLAIMS</span>
        @for (claim of runtime.state().claims; track claim.id) {
          <article>
            <strong>{{ claim.status.replace('-', ' ') }}</strong>
            <p>{{ claim.text }}</p>
            <small>{{ claim.supportingSourceIds.length }} sources</small>
          </article>
        }
      </section>
      <section>
        <span class="sidebar-label">PINNED SOURCES</span>
        @for (source of runtime.savedSources(); track source.id) {
          <article class="source">
            <span>{{ source.sourceType }}</span>
            <p>{{ source.title }}</p>
            <small>{{ source.creator }} \xB7 {{ source.dateLabel }}</small>
          </article>
        }
      </section>
      <section class="opposing">
        <span class="sidebar-label">OTHER NETWORK CHECK</span>
        <p>
          {{
            runtime.state().pitch.opposingChallenge ||
              'Return to the pitch desk and name the strongest challenge the other network could make.'
          }}
        </p>
      </section>
    </aside>
  </div>
</section>
`, styles: ["/* src/app/templates/history-live/ui/script-desk.component.scss */\n:host {\n  display: block;\n  color: #dce5e9;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\nselect,\ntextarea {\n  font: inherit;\n}\nbutton:focus-visible,\nselect:focus-visible,\ntextarea:focus-visible {\n  outline: 3px solid #d6b676;\n  outline-offset: 2px;\n}\n.script-room {\n  min-height: 100vh;\n  padding-bottom: 3rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.018) 1px,\n      transparent 1px) 0 0/4rem 4rem,\n    #0b161f;\n}\n.script-header {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 2rem;\n  border-bottom: 1px solid #293a45;\n  padding: 2rem clamp(1rem, 4vw, 4rem) 1.4rem;\n  background:\n    linear-gradient(\n      100deg,\n      #142631,\n      #0b161e);\n}\n.script-header > div:first-child {\n  flex: 1;\n}\n.script-header span,\n.sidebar-label {\n  color: #c4a66a;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.15em;\n}\n.script-header h1 {\n  margin: 0.35rem 0 0;\n  color: #eff2ef;\n  font: 400 clamp(2rem, 4vw, 3.1rem)/1 Georgia, serif;\n}\n.script-header p {\n  margin: 0.55rem 0 0;\n  color: #8397a1;\n  font-size: 0.8rem;\n}\n.script-stats {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.script-stats > span {\n  display: grid;\n  color: #7c909a;\n  font-size: 0.8rem;\n  text-align: center;\n  text-transform: uppercase;\n}\n.script-stats strong {\n  color: #d8e2e5;\n  font: 400 1.5rem Georgia, serif;\n}\n.script-stats button {\n  min-height: 3rem;\n  border: 0;\n  padding: 0 1rem;\n  color: #11202a;\n  background: #d1b473;\n  font-size: 0.8rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.script-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 20rem;\n  gap: 1rem;\n  padding: 1.4rem clamp(1rem, 4vw, 4rem);\n}\n.script-page {\n  min-width: 0;\n  border: 1px solid #40505a;\n  padding: 1.2rem 1.3rem;\n  color: #1c2c35;\n  background: #e8e8df;\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.22);\n}\n.script-page > header {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 2px solid #23343d;\n  padding-bottom: 0.7rem;\n  color: #2c444f;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n}\n.script-page > header small {\n  overflow: hidden;\n  color: #596a71;\n  font-weight: 600;\n  letter-spacing: 0;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.script-block {\n  position: relative;\n  display: grid;\n  grid-template-columns: 2.2rem 8.6rem minmax(0, 1fr) auto;\n  gap: 0.7rem;\n  border-bottom: 1px solid #bfc4bf;\n  padding: 0.9rem 0;\n}\n.line-number {\n  padding-top: 0.65rem;\n  color: #8b918d;\n  font: 600 0.7rem Georgia, serif;\n}\n.script-block select,\n.script-block textarea {\n  width: 100%;\n  border: 1px solid #abb3ae;\n  border-radius: 0;\n  padding: 0.65rem;\n  color: #1d313b;\n  background: #f5f4eb;\n  font-size: 0.8rem;\n}\n.script-block select {\n  color: #7b422d;\n  font-size: 0.8rem;\n  font-weight: 900;\n}\n.script-block textarea {\n  resize: vertical;\n  line-height: 1.55;\n}\n.script-block > button {\n  align-self: start;\n  border: 0;\n  padding: 0.45rem;\n  color: #8f9691;\n  background: transparent;\n  font-size: 1rem;\n  cursor: pointer;\n}\n.add-cues {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.35rem;\n  padding-top: 1rem;\n}\n.add-cues span {\n  margin-right: 0.3rem;\n  color: #717e7c;\n  font-size: 0.8rem;\n  font-weight: 900;\n}\n.add-cues button {\n  border: 1px solid #a7b0ab;\n  padding: 0.35rem 0.5rem;\n  color: #40515a;\n  background: #f0efe7;\n  font-size: 0.8rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.script-sidebar {\n  display: grid;\n  align-content: start;\n  gap: 1rem;\n}\n.script-sidebar > section {\n  display: grid;\n  gap: 0.6rem;\n  border: 1px solid #2d414c;\n  padding: 1rem;\n  background: #101d26;\n}\n.script-sidebar article {\n  border-top: 1px solid #2c3e48;\n  padding-top: 0.6rem;\n}\n.script-sidebar article strong {\n  color: #9cc0a6;\n  font-size: 0.8rem;\n  text-transform: uppercase;\n}\n.script-sidebar article p {\n  margin: 0.25rem 0;\n  color: #b7c3c8;\n  font: italic 0.76rem/1.45 Georgia, serif;\n}\n.script-sidebar article small {\n  color: #687b86;\n  font-size: 0.8rem;\n}\n.script-sidebar article.source > span {\n  color: #7d96a2;\n  font-size: 0.8rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.script-sidebar article.source p {\n  color: #cbd4d7;\n  font-style: normal;\n}\n.opposing {\n  border-left: 3px solid #a96e63 !important;\n}\n.opposing > p {\n  margin: 0.2rem 0;\n  color: #b9c4c8;\n  font: italic 0.8rem/1.5 Georgia, serif;\n}\n@media (max-width: 850px) {\n  .script-header {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .script-layout {\n    grid-template-columns: 1fr;\n  }\n  .script-sidebar {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 600px) {\n  .script-stats {\n    width: 100%;\n    flex-wrap: wrap;\n  }\n  .script-stats button {\n    flex: 1;\n  }\n  .script-block {\n    grid-template-columns: 2rem 1fr auto;\n  }\n  .script-block textarea {\n    grid-column: 2/-1;\n  }\n  .script-sidebar {\n    grid-template-columns: 1fr;\n  }\n}\nbutton,\nselect,\ninput {\n  min-height: 2.75rem;\n}\ntextarea {\n  font: inherit;\n  line-height: 1.5;\n}\nbutton[aria-disabled=true] {\n  opacity: 0.65;\n}\n.script-block {\n  grid-template-columns: 2rem 9rem minmax(0, 1fr) auto;\n}\n.script-block > label:nth-of-type(2) {\n  grid-column: 2/4;\n  display: grid;\n  gap: 0.4rem;\n}\n.script-block textarea {\n  font-size: 1rem;\n}\n@media (max-width: 600px) {\n  .script-block {\n    grid-template-columns: 1fr;\n  }\n  .script-block > label:nth-of-type(2) {\n    grid-column: auto;\n  }\n}\n/*# sourceMappingURL=script-desk.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ScriptDeskComponent, { className: "ScriptDeskComponent", filePath: "src/app/templates/history-live/ui/script-desk.component.ts", lineNumber: 11 });
})();

// src/app/templates/history-live/ui/source-wall.component.ts
var _c02 = () => [];
var _forTrack06 = ($index, $item) => $item.id;
var _forTrack12 = ($index, $item) => $item.sourceId;
function SourceWallComponent_For_34_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1, "Later evidence: use only for retrospective reporting");
    \u0275\u0275domElementEnd();
  }
}
function SourceWallComponent_For_34_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const tag_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tag_r2);
  }
}
function SourceWallComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article", 24)(1, "header")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "div", 25)(7, "span");
    \u0275\u0275text(8, "H");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(9, "i")(10, "b");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "h2");
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(13, SourceWallComponent_For_34_Conditional_13_Template, 2, 0, "p");
    \u0275\u0275domElementStart(14, "p");
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(16, "div", 26);
    \u0275\u0275repeaterCreate(17, SourceWallComponent_For_34_For_18_Template, 2, 1, "span", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(19, "footer")(20, "button", 27);
    \u0275\u0275domListener("click", function SourceWallComponent_For_34_Template_button_click_20_listener() {
      const source_r3 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.selectSource(source_r3.id));
    });
    \u0275\u0275text(21, " Examine source ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(22, "button", 28);
    \u0275\u0275domListener("click", function SourceWallComponent_For_34_Template_button_click_22_listener() {
      const source_r3 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.toggleSource(source_r3.id));
    });
    \u0275\u0275text(23);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const source_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classMap("source-card " + source_r3.perspective + (ctx_r3.runtime.state().savedSourceIds.includes(source_r3.id) ? " saved" : ""));
    \u0275\u0275classProp("saved", ctx_r3.runtime.state().savedSourceIds.includes(source_r3.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(source_r3.sourceType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r3.dateLabel);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(source_r3.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r3.runtime.sourceUsable(source_r3.id) ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r3.creator);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(source_r3.tags);
    \u0275\u0275advance(3);
    \u0275\u0275attribute("data-source-id", source_r3.id);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", (ctx_r3.runtime.state().savedSourceIds.includes(source_r3.id) ? "Remove " : "Pin ") + source_r3.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.runtime.state().savedSourceIds.includes(source_r3.id) ? "Pinned \u2713" : "+ Pin", " ");
  }
}
function SourceWallComponent_Conditional_35_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "img", 32);
  }
  if (rf & 2) {
    const source_r6 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("src", source_r6.imageUrl, \u0275\u0275sanitizeUrl)("alt", source_r6.imageAlt || source_r6.title);
  }
}
function SourceWallComponent_Conditional_35_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 34);
    \u0275\u0275text(1, "Open original \u2197");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const source_r6 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("href", source_r6.url, \u0275\u0275sanitizeUrl);
  }
}
function SourceWallComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "aside", 9)(1, "header")(2, "span");
    \u0275\u0275text(3, "SOURCE INSPECTION");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "button", 29);
    \u0275\u0275domListener("click", function SourceWallComponent_Conditional_35_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.closeSource());
    });
    \u0275\u0275text(5, " \xD7 ");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "div", 30)(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(11, "h2");
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "p", 31);
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "section")(16, "strong");
    \u0275\u0275text(17);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(18, "p");
    \u0275\u0275text(19);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(20, SourceWallComponent_Conditional_35_Conditional_20_Template, 1, 2, "img", 32);
    \u0275\u0275domElementStart(21, "dl")(22, "div")(23, "dt");
    \u0275\u0275text(24, "Created by");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(25, "dd");
    \u0275\u0275text(26);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(27, "div")(28, "dt");
    \u0275\u0275text(29, "Perspective");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(30, "dd");
    \u0275\u0275text(31);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(32, "div")(33, "dt");
    \u0275\u0275text(34, "Topics");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(35, "dd");
    \u0275\u0275text(36);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(37, "p", 33);
    \u0275\u0275text(38);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(39, "footer");
    \u0275\u0275conditionalCreate(40, SourceWallComponent_Conditional_35_Conditional_40_Template, 2, 1, "a", 34);
    \u0275\u0275domElementStart(41, "button", 4);
    \u0275\u0275domListener("click", function SourceWallComponent_Conditional_35_Template_button_click_41_listener() {
      const source_r6 = \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.toggleSource(source_r6.id));
    });
    \u0275\u0275text(42);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const source_r6 = ctx;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(source_r6.perspective);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", source_r6.sourceType, " \xB7 ", source_r6.dateLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r6.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r6.creator);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(source_r6.excerptKind === "quotation" ? "Document quotation" : "Editorial summary \u2014 not a quotation");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r6.excerpt);
    \u0275\u0275advance();
    \u0275\u0275conditional(source_r6.imageUrl ? 20 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(source_r6.creator);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(source_r6.perspective);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(source_r6.tags.join(" \xB7 "));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r6.citation);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(source_r6.url ? 40 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.runtime.state().savedSourceIds.includes(source_r6.id) ? "Remove from story" : "Pin to story", " ");
  }
}
function SourceWallComponent_For_76_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "label");
    \u0275\u0275text(1);
    \u0275\u0275domElementStart(2, "textarea", 21);
    \u0275\u0275domListener("input", function SourceWallComponent_For_76_Template_textarea_input_2_listener($event) {
      const source_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setEvidence(source_r8.id, "passage", $event));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(3, "label");
    \u0275\u0275text(4);
    \u0275\u0275domElementStart(5, "select", 14);
    \u0275\u0275domListener("change", function SourceWallComponent_For_76_Template_select_change_5_listener($event) {
      const source_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setEvidence(source_r8.id, "relationship", $event));
    });
    \u0275\u0275domElementStart(6, "option", 35);
    \u0275\u0275text(7, "Supports");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "option", 36);
    \u0275\u0275text(9, "Challenges / counterevidence");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const source_r8 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r8.title);
    \u0275\u0275advance();
    \u0275\u0275domProperty("value", ctx_r3.evidenceFor(source_r8.id)?.passage || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Relationship for ", source_r8.title);
    \u0275\u0275advance();
    \u0275\u0275domProperty("value", ctx_r3.evidenceFor(source_r8.id)?.relationship || "supports");
  }
}
function SourceWallComponent_For_81_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const link_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", link_r10.relationship, " \xB7 ", link_r10.passage);
  }
}
function SourceWallComponent_For_81_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(11, SourceWallComponent_For_81_For_12_Template, 2, 2, "p", null, _forTrack12);
    \u0275\u0275domElementStart(13, "button", 37);
    \u0275\u0275domListener("click", function SourceWallComponent_For_81_Template_button_click_13_listener() {
      const claim_r11 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.removeClaim(claim_r11.id));
    });
    \u0275\u0275text(14, " \xD7 ");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const claim_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(claim_r11.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(claim_r11.status.replace("-", " "));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(claim_r11.text);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", claim_r11.supportingSourceIds.length, " supporting sources");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(claim_r11.reasoning);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(claim_r11.uncertainty);
    \u0275\u0275advance();
    \u0275\u0275repeater(claim_r11.evidence || \u0275\u0275pureFunction0(7, _c02));
  }
}
function SourceWallComponent_ForEmpty_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 23);
    \u0275\u0275text(1, "Your checked claims will appear here before they move into the script.");
    \u0275\u0275domElementEnd();
  }
}
var SourceWallComponent = class _SourceWallComponent {
  runtime = inject(HistoryLiveRuntimeService);
  filter = signal(
    "all",
    ...ngDevMode ? [{ debugName: "filter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  claimText = signal(
    this.runtime.state().claimDraft?.text ?? "",
    ...ngDevMode ? [{ debugName: "claimText" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reasoning = signal(
    this.runtime.state().claimDraft?.reasoning ?? "",
    ...ngDevMode ? [{ debugName: "reasoning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  uncertainty = signal(
    this.runtime.state().claimDraft?.uncertainty ?? "",
    ...ngDevMode ? [{ debugName: "uncertainty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidence = signal(
    this.runtime.state().claimDraft?.evidence ?? [],
    ...ngDevMode ? [{ debugName: "evidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  claimStatus = signal(
    this.runtime.state().claimDraft?.status ?? "strongly-supported",
    ...ngDevMode ? [{ debugName: "claimStatus" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visibleSources = computed(
    () => {
      const filter = this.filter();
      return this.runtime.config.sources.filter((source) => filter === "all" || source.perspective === filter);
    },
    ...ngDevMode ? [{ debugName: "visibleSources" }] : (
      /* istanbul ignore next */
      []
    )
  );
  element = inject(ElementRef);
  priorSource;
  constructor() {
    afterRenderEffect(() => {
      const id = this.runtime.state().selectedSourceId;
      if (id === this.priorSource)
        return;
      const previous = this.priorSource;
      this.priorSource = id;
      const target = id ? this.element.nativeElement.querySelector(".source-detail") : this.element.nativeElement.querySelector(`[data-source-id="${previous}"]`);
      if (target) {
        target.scrollIntoView({ block: "nearest", behavior: "instant" });
        target.focus({ preventScroll: true });
      }
    });
  }
  saveDraft() {
    this.runtime.updateClaimDraft({
      text: this.claimText(),
      reasoning: this.reasoning(),
      uncertainty: this.uncertainty(),
      status: this.claimStatus(),
      evidence: this.evidence()
    });
  }
  updateReasoning(event) {
    this.reasoning.set(event.target.value);
    this.saveDraft();
  }
  updateUncertainty(event) {
    this.uncertainty.set(event.target.value);
    this.saveDraft();
  }
  evidenceFor(id) {
    return this.evidence().find((link) => link.sourceId === id);
  }
  setEvidence(id, field, event) {
    const value = event.target.value;
    const old = this.evidenceFor(id) ?? {
      sourceId: id,
      passage: "",
      relationship: "supports"
    };
    const updated = field === "relationship" ? __spreadProps(__spreadValues({}, old), { relationship: value }) : __spreadProps(__spreadValues({}, old), { passage: value });
    this.evidence.set([...this.evidence().filter((link) => link.sourceId !== id), updated]);
    this.saveDraft();
  }
  setFilter(value) {
    this.filter.set(value);
  }
  updateClaim(event) {
    this.claimText.set(event.target.value);
    this.saveDraft();
  }
  updateStatus(event) {
    this.claimStatus.set(event.target.value);
    this.saveDraft();
  }
  addClaim() {
    this.runtime.addClaim(this.claimText(), this.claimStatus(), this.evidence().filter((link) => link.passage.trim().length > 0), this.reasoning(), this.uncertainty());
    if (this.runtime.error() === void 0) {
      this.claimText.set("");
      this.reasoning.set("");
      this.uncertainty.set("");
      this.evidence.set([]);
    }
  }
  static \u0275fac = function SourceWallComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SourceWallComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SourceWallComponent, selectors: [["app-history-live-source-wall"]], decls: 83, vars: 24, consts: [["aria-labelledby", "source-wall-title", 1, "source-room"], [1, "source-header"], ["id", "source-wall-title"], [1, "source-count"], ["type", "button", 3, "click"], [1, "source-toolbar"], [1, "source-workspace"], [1, "source-grid"], [1, "source-card", 3, "saved", "class"], ["tabindex", "-1", "aria-label", "Source inspection", 1, "source-detail"], ["aria-labelledby", "fact-check-title", 1, "fact-check-board"], ["id", "fact-check-title"], [1, "claim-composer"], ["rows", "2", "placeholder", "Based on the evidence, our reporting finds\u2026", 3, "input", "value"], [3, "change", "value"], ["value", "verified"], ["value", "strongly-supported"], ["value", "partially-supported"], ["value", "uncertain"], ["value", "disputed"], ["rows", "3", 3, "input", "value"], ["rows", "2", 3, "input", "value"], [1, "claim-list"], [1, "empty"], [1, "source-card"], ["aria-hidden", "true", 1, "document-mark"], [1, "tags"], ["type", "button", 1, "open", 3, "click"], ["type", "button", 1, "pin", 3, "click"], ["type", "button", "aria-label", "Close source", 3, "click"], [1, "detail-meta"], [1, "creator"], [1, "source-image", 3, "src", "alt"], [1, "citation"], ["target", "_blank", "rel", "noreferrer", 3, "href"], ["value", "supports"], ["value", "challenges"], ["type", "button", "aria-label", "Remove claim", 3, "click"]], template: function SourceWallComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "header", 1)(2, "div")(3, "span");
      \u0275\u0275text(4, "SOURCE WALL \xB7 EVIDENCE DESK");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "h1", 2);
      \u0275\u0275text(6, "Build the story from the record");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(7, "div", 3)(8, "strong");
      \u0275\u0275text(9);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "span");
      \u0275\u0275text(11, "sources pinned");
      \u0275\u0275domElementStart(12, "small");
      \u0275\u0275text(13, "2 minimum");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(14, "button", 4);
      \u0275\u0275domListener("click", function SourceWallComponent_Template_button_click_14_listener() {
        return ctx.runtime.goTo("script");
      });
      \u0275\u0275text(15, "Move to script desk \u2192");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(16, "div", 5)(17, "span");
      \u0275\u0275text(18, "FILTER THE WALL");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(19, "button", 4);
      \u0275\u0275domListener("click", function SourceWallComponent_Template_button_click_19_listener() {
        return ctx.setFilter("all");
      });
      \u0275\u0275text(20, " All sources ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "button", 4);
      \u0275\u0275domListener("click", function SourceWallComponent_Template_button_click_21_listener() {
        return ctx.setFilter("patriot");
      });
      \u0275\u0275text(22, " Patriot lens ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(23, "button", 4);
      \u0275\u0275domListener("click", function SourceWallComponent_Template_button_click_23_listener() {
        return ctx.setFilter("british");
      });
      \u0275\u0275text(24, " British lens ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(25, "button", 4);
      \u0275\u0275domListener("click", function SourceWallComponent_Template_button_click_25_listener() {
        return ctx.setFilter("international");
      });
      \u0275\u0275text(26, " International ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(27, "button", 4);
      \u0275\u0275domListener("click", function SourceWallComponent_Template_button_click_27_listener() {
        return ctx.setFilter("multiple");
      });
      \u0275\u0275text(28, " Multiple ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(29, "small");
      \u0275\u0275text(30, "Open a source to question its perspective and limits.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(31, "div", 6)(32, "div", 7);
      \u0275\u0275repeaterCreate(33, SourceWallComponent_For_34_Template, 24, 12, "article", 8, _forTrack06);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(35, SourceWallComponent_Conditional_35_Template, 43, 14, "aside", 9);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(36, "section", 10)(37, "header")(38, "div")(39, "span");
      \u0275\u0275text(40, "FACT-CHECK BOARD");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(41, "h2", 11);
      \u0275\u0275text(42, "Turn evidence into a responsible claim");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(43, "small");
      \u0275\u0275text(44, "Every major claim needs visible support.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(45, "div", 12)(46, "label")(47, "span");
      \u0275\u0275text(48, "Your claim");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(49, "textarea", 13);
      \u0275\u0275domListener("input", function SourceWallComponent_Template_textarea_input_49_listener($event) {
        return ctx.updateClaim($event);
      });
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(50, "label")(51, "span");
      \u0275\u0275text(52, "Evidence status");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(53, "select", 14);
      \u0275\u0275domListener("change", function SourceWallComponent_Template_select_change_53_listener($event) {
        return ctx.updateStatus($event);
      });
      \u0275\u0275domElementStart(54, "option", 15);
      \u0275\u0275text(55, "Verified");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(56, "option", 16);
      \u0275\u0275text(57, "Strongly supported");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(58, "option", 17);
      \u0275\u0275text(59, "Partially supported");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(60, "option", 18);
      \u0275\u0275text(61, "Uncertain");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(62, "option", 19);
      \u0275\u0275text(63, "Disputed");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(64, "label")(65, "span");
      \u0275\u0275text(66, "Reasoning: how does the passage support or challenge the claim?");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(67, "textarea", 20);
      \u0275\u0275domListener("input", function SourceWallComponent_Template_textarea_input_67_listener($event) {
        return ctx.updateReasoning($event);
      });
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(68, "label")(69, "span");
      \u0275\u0275text(70, "Limits and uncertainty to explain on air");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(71, "textarea", 21);
      \u0275\u0275domListener("input", function SourceWallComponent_Template_textarea_input_71_listener($event) {
        return ctx.updateUncertainty($event);
      });
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(72, "fieldset")(73, "legend");
      \u0275\u0275text(74, " Select evidence by entering a passage, page reference, or map observation. Leave unused sources blank. ");
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(75, SourceWallComponent_For_76_Template, 10, 4, null, null, _forTrack06);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(77, "button", 4);
      \u0275\u0275domListener("click", function SourceWallComponent_Template_button_click_77_listener() {
        return ctx.addClaim();
      });
      \u0275\u0275text(78, "Add checked claim");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(79, "div", 22);
      \u0275\u0275repeaterCreate(80, SourceWallComponent_For_81_Template, 15, 8, "article", null, _forTrack06, false, SourceWallComponent_ForEmpty_82_Template, 2, 0, "p", 23);
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      let tmp_13_0;
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.runtime.state().savedSourceIds.length);
      \u0275\u0275advance(10);
      \u0275\u0275classProp("active", ctx.filter() === "all");
      \u0275\u0275attribute("aria-pressed", ctx.filter() === "all");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filter() === "patriot");
      \u0275\u0275attribute("aria-pressed", ctx.filter() === "patriot");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filter() === "british");
      \u0275\u0275attribute("aria-pressed", ctx.filter() === "british");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filter() === "international");
      \u0275\u0275attribute("aria-pressed", ctx.filter() === "international");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filter() === "multiple");
      \u0275\u0275attribute("aria-pressed", ctx.filter() === "multiple");
      \u0275\u0275advance(4);
      \u0275\u0275classProp("detail-open", ctx.runtime.selectedSource());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.visibleSources());
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_13_0 = ctx.runtime.selectedSource()) ? 35 : -1, tmp_13_0);
      \u0275\u0275advance(14);
      \u0275\u0275domProperty("value", ctx.claimText());
      \u0275\u0275advance(4);
      \u0275\u0275domProperty("value", ctx.claimStatus());
      \u0275\u0275advance(14);
      \u0275\u0275domProperty("value", ctx.reasoning());
      \u0275\u0275advance(4);
      \u0275\u0275domProperty("value", ctx.uncertainty());
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.runtime.savedSources());
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.runtime.state().claims);
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #dce5e9;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #d7b878;\n  outline-offset: 2px;\n}\n.source-room[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding-bottom: 3rem;\n  background:\n    radial-gradient(\n      circle at 15% 10%,\n      rgba(82, 127, 153, 0.14),\n      transparent 23rem),\n    #0c1720;\n}\n.source-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  gap: 2rem;\n  border-bottom: 1px solid #293a45;\n  padding: 2rem clamp(1rem, 4vw, 4rem) 1.4rem;\n}\n.source-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child {\n  flex: 1;\n}\n.source-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.source-toolbar[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.fact-check-board[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #c4a66b;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.15em;\n}\n.source-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  color: #eff2ef;\n  font: 400 clamp(2rem, 4vw, 3.2rem)/1 Georgia, serif;\n}\n.source-count[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  border-left: 1px solid #334651;\n  padding-left: 1.2rem;\n}\n.source-count[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e0c17e;\n  font: 400 2rem Georgia, serif;\n}\n.source-count[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  color: #b8c6cc;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n.source-count[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #71858f;\n  font-size: 0.8rem;\n}\n.source-header[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  min-height: 3rem;\n  border: 0;\n  padding: 0 1rem;\n  color: #10202a;\n  background: #d3b675;\n  font-size: 0.8rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.source-header[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]:disabled {\n  color: #667782;\n  background: #2a3b45;\n  cursor: not-allowed;\n}\n.source-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.8rem clamp(1rem, 4vw, 4rem);\n  background: #101e27;\n}\n.source-toolbar[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n.source-toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #30444f;\n  border-radius: 2rem;\n  padding: 0.35rem 0.7rem;\n  color: #8498a2;\n  background: transparent;\n  font-size: 0.8rem;\n  cursor: pointer;\n}\n.source-toolbar[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #ac925e;\n  color: #eddbb3;\n  background: #292716;\n}\n.source-toolbar[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #657985;\n  font-size: 0.8rem;\n}\n.source-workspace[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  padding: 1.3rem clamp(1rem, 4vw, 4rem);\n}\n.source-workspace.detail-open[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1fr) minmax(18rem, 26rem);\n  gap: 1rem;\n}\n.source-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  align-content: start;\n  gap: 0.8rem;\n}\n.detail-open[_ngcontent-%COMP%]   .source-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n.source-card[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: auto 6.5rem auto auto 1fr auto;\n  min-height: 22rem;\n  border: 1px solid #314550;\n  padding: 1rem;\n  background:\n    linear-gradient(\n      145deg,\n      #162631,\n      #0f1b24);\n  transition: transform 0.16s ease, border-color 0.16s ease;\n}\n.source-card[_ngcontent-%COMP%]:hover {\n  border-color: #536b78;\n  transform: translateY(-2px);\n}\n.source-card.saved[_ngcontent-%COMP%] {\n  border-color: #a68b57;\n  box-shadow: inset 0 2px #b99b61;\n}\n.source-card.british[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      145deg,\n      #2b2123,\n      #131a21);\n}\n.source-card.international[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      145deg,\n      #1a2d28,\n      #101c22);\n}\n.source-card.multiple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      145deg,\n      #27283a,\n      #121a24);\n}\n.source-card[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  color: #8499a3;\n  font-size: 0.8rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.document-mark[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  width: 4.6rem;\n  height: 5.5rem;\n  place-items: center;\n  justify-self: center;\n  margin: 0.8rem;\n  border: 1px solid #5e6b6d;\n  color: #243945;\n  background: #cfcec1;\n  box-shadow: 0.4rem 0.45rem 0 #0a141b;\n  font: 900 1.5rem Georgia, serif;\n}\n.document-mark[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.document-mark[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.6rem;\n  left: 0.6rem;\n  height: 1px;\n  background: #869091;\n}\n.document-mark[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  bottom: 1.2rem;\n}\n.document-mark[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  bottom: 0.8rem;\n}\n.source-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.2rem 0;\n  color: #e1e8e9;\n  font: 400 1.12rem/1.15 Georgia, serif;\n}\n.source-card[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0;\n  color: #788c97;\n  font-size: 0.8rem;\n}\n.tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: start;\n  gap: 0.3rem;\n  margin: 0.7rem 0;\n}\n.tags[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  border: 1px solid #344954;\n  border-radius: 2rem;\n  padding: 0.2rem 0.4rem;\n  color: #81949d;\n  font-size: 0.8rem;\n}\n.source-card[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n}\n.source-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.35rem;\n  border: 1px solid #3a515e;\n  padding: 0 0.65rem;\n  color: #a8bbc4;\n  background: #13242e;\n  font-size: 0.8rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.source-card[_ngcontent-%COMP%]   .open[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.source-card[_ngcontent-%COMP%]   .pin[_ngcontent-%COMP%] {\n  border-color: #76663f;\n  color: #d0b978;\n  background: #27261a;\n}\n.source-detail[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 9.6rem;\n  align-self: start;\n  max-height: calc(100dvh - 10.6rem);\n  overflow: auto;\n  border: 1px solid #405660;\n  padding: 1.2rem;\n  background: #15242e;\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.32);\n}\n.source-detail[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 1px solid #30434e;\n  padding-bottom: 0.7rem;\n  color: #c5a66a;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.14em;\n}\n.source-detail[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  color: #91a4ad;\n  background: transparent;\n  font-size: 1.3rem;\n  cursor: pointer;\n}\n.detail-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  margin-top: 1rem;\n}\n.detail-meta[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  border-radius: 2rem;\n  padding: 0.25rem 0.5rem;\n  color: #e8d4a8;\n  background: #5b4a29;\n  font-size: 0.8rem;\n  text-transform: uppercase;\n}\n.detail-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #788c96;\n  font-size: 0.8rem;\n}\n.source-detail[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.8rem 0 0.2rem;\n  color: #f0f2ee;\n  font: 400 1.8rem/1.05 Georgia, serif;\n}\n.creator[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #8297a1;\n  font-size: 0.8rem;\n}\n.source-detail[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 1.2rem 0;\n  border-left: 3px solid #b39458;\n  padding: 0.9rem 1rem;\n  color: #d7dedf;\n  background: #0e1921;\n  font: italic 1rem/1.55 Georgia, serif;\n}\n.source-detail[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #c1a76e;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n}\n.source-detail[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.4rem 0;\n  color: #9babb2;\n  font-size: 0.8rem;\n  line-height: 1.55;\n}\n.source-detail[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n  margin: 1rem 0;\n}\n.source-detail[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 5rem 1fr;\n  border-top: 1px solid #2b3d47;\n  padding-top: 0.45rem;\n}\n.source-detail[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #6e828c;\n  font-size: 0.8rem;\n}\n.source-detail[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #b3c0c6;\n  font-size: 0.8rem;\n  text-transform: capitalize;\n}\n.check-questions[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.38rem;\n  border: 1px solid #364b56;\n  padding: 0.8rem;\n  background: #101d25;\n}\n.check-questions[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #d1b575;\n  font-size: 0.8rem;\n}\n.check-questions[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #91a3ac;\n  font-size: 0.8rem;\n}\n.check-questions[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]::before {\n  content: "?";\n  display: inline-grid;\n  width: 1rem;\n  aspect-ratio: 1;\n  place-items: center;\n  margin-right: 0.4rem;\n  border-radius: 50%;\n  color: #0f1a21;\n  background: #7996a5;\n  font-size: 0.8rem;\n  font-weight: 900;\n}\n.citation[_ngcontent-%COMP%] {\n  color: #687c87;\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.source-detail[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n}\n.source-detail[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n.source-detail[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #d8c18f;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n.source-detail[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n.source-detail[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.5rem;\n  border: 0;\n  padding: 0 0.7rem;\n  color: #12202a;\n  background: #d2b574;\n  cursor: pointer;\n}\n.fact-check-board[_ngcontent-%COMP%] {\n  margin: 0 clamp(1rem, 4vw, 4rem);\n  border: 1px solid #314550;\n  background: #111f28;\n}\n.fact-check-board[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid #2c3f4a;\n  padding: 1rem 1.2rem;\n}\n.fact-check-board[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  color: #e4eaeb;\n  font: 400 1.45rem Georgia, serif;\n}\n.fact-check-board[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #728690;\n  font-size: 0.8rem;\n}\n.claim-composer[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 12rem auto;\n  align-items: end;\n  gap: 0.8rem;\n  padding: 1rem 1.2rem;\n}\n.claim-composer[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n  color: #95a6ae;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n.claim-composer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \n.claim-composer[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #3b505c;\n  padding: 0.65rem;\n  color: #dce5e8;\n  background: #0c1820;\n  font-size: 0.8rem;\n}\n.claim-composer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 3.45rem;\n  border: 0;\n  padding: 0 0.8rem;\n  color: #14222b;\n  background: #d2b574;\n  font-size: 0.8rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.claim-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n  padding: 0 1.2rem 1.2rem;\n}\n.claim-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: 8.5rem 1fr auto auto;\n  align-items: center;\n  gap: 0.8rem;\n  border-top: 1px solid #2d404b;\n  padding: 0.75rem 0;\n}\n.claim-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #b8d5c1;\n  font-size: 0.8rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.claim-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > span.disputed[_ngcontent-%COMP%], \n.claim-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > span.uncertain[_ngcontent-%COMP%] {\n  color: #e0b792;\n}\n.claim-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #c7d1d5;\n  font-size: 0.8rem;\n}\n.claim-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #70838d;\n  font-size: 0.8rem;\n}\n.claim-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  color: #70838d;\n  background: transparent;\n  font-size: 1rem;\n  cursor: pointer;\n}\n.empty[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.8rem;\n  color: #6d808a;\n  font: italic 0.75rem Georgia, serif;\n}\n@media (max-width: 1100px) {\n  .source-grid[_ngcontent-%COMP%], \n   .detail-open[_ngcontent-%COMP%]   .source-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 760px) {\n  .source-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-wrap: wrap;\n  }\n  .source-toolbar[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .source-toolbar[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    width: 100%;\n    margin: 0;\n  }\n  .source-workspace.detail-open[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .source-detail[_ngcontent-%COMP%] {\n    position: fixed;\n    z-index: 40;\n    right: 0.6rem;\n    bottom: 0.6rem;\n    left: 0.6rem;\n    top: auto;\n    max-height: 78dvh;\n  }\n  .claim-composer[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .claim-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr auto;\n  }\n  .claim-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n  }\n}\n@media (max-width: 480px) {\n  .source-grid[_ngcontent-%COMP%], \n   .detail-open[_ngcontent-%COMP%]   .source-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  min-height: 2.75rem;\n}\ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n  line-height: 1.5;\n}\nbutton[aria-disabled=true][_ngcontent-%COMP%] {\n  opacity: 0.65;\n}\n.claim-composer[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: stretch;\n}\n.claim-composer[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  flex: 1 1 18rem;\n}\n.claim-composer[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%] {\n  flex: 1 1 100%;\n  min-width: 0;\n}\n.claim-composer[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n  margin: 0.8rem 0;\n}\n.source-image[_ngcontent-%COMP%] {\n  max-width: 100%;\n}\n/*# sourceMappingURL=source-wall.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SourceWallComponent, [{
    type: Component,
    args: [{ selector: "app-history-live-source-wall", template: `<section class="source-room" aria-labelledby="source-wall-title">
  <header class="source-header">
    <div>
      <span>SOURCE WALL \xB7 EVIDENCE DESK</span>
      <h1 id="source-wall-title">Build the story from the record</h1>
    </div>
    <div class="source-count">
      <strong>{{ runtime.state().savedSourceIds.length }}</strong
      ><span>sources pinned<small>2 minimum</small></span>
    </div>
    <button type="button" (click)="runtime.goTo('script')">Move to script desk \u2192</button>
  </header>

  <div class="source-toolbar">
    <span>FILTER THE WALL</span>
    <button
      type="button"
      [class.active]="filter() === 'all'"
      [attr.aria-pressed]="filter() === 'all'"
      (click)="setFilter('all')"
    >
      All sources
    </button>
    <button
      type="button"
      [class.active]="filter() === 'patriot'"
      [attr.aria-pressed]="filter() === 'patriot'"
      (click)="setFilter('patriot')"
    >
      Patriot lens
    </button>
    <button
      type="button"
      [class.active]="filter() === 'british'"
      [attr.aria-pressed]="filter() === 'british'"
      (click)="setFilter('british')"
    >
      British lens
    </button>
    <button
      type="button"
      [class.active]="filter() === 'international'"
      [attr.aria-pressed]="filter() === 'international'"
      (click)="setFilter('international')"
    >
      International
    </button>
    <button
      type="button"
      [class.active]="filter() === 'multiple'"
      [attr.aria-pressed]="filter() === 'multiple'"
      (click)="setFilter('multiple')"
    >
      Multiple
    </button>
    <small>Open a source to question its perspective and limits.</small>
  </div>

  <div class="source-workspace" [class.detail-open]="runtime.selectedSource()">
    <div class="source-grid">
      @for (source of visibleSources(); track source.id) {
        <article
          class="source-card"
          [class.saved]="runtime.state().savedSourceIds.includes(source.id)"
          [class]="
            'source-card ' +
            source.perspective +
            (runtime.state().savedSourceIds.includes(source.id) ? ' saved' : '')
          "
        >
          <header>
            <span>{{ source.sourceType }}</span
            ><small>{{ source.dateLabel }}</small>
          </header>
          <div class="document-mark" aria-hidden="true"><span>H</span><i></i><b></b></div>
          <h2>{{ source.title }}</h2>
          @if (!runtime.sourceUsable(source.id)) {
            <p>Later evidence: use only for retrospective reporting</p>
          }
          <p>{{ source.creator }}</p>
          <div class="tags">
            @for (tag of source.tags; track tag) {
              <span>{{ tag }}</span>
            }
          </div>
          <footer>
            <button
              type="button"
              class="open"
              [attr.data-source-id]="source.id"
              (click)="runtime.selectSource(source.id)"
            >
              Examine source
            </button>
            <button
              type="button"
              class="pin"
              [attr.aria-label]="
                (runtime.state().savedSourceIds.includes(source.id) ? 'Remove ' : 'Pin ') +
                source.title
              "
              (click)="runtime.toggleSource(source.id)"
            >
              {{ runtime.state().savedSourceIds.includes(source.id) ? 'Pinned \u2713' : '+ Pin' }}
            </button>
          </footer>
        </article>
      }
    </div>

    @if (runtime.selectedSource(); as source) {
      <aside class="source-detail" tabindex="-1" aria-label="Source inspection">
        <header>
          <span>SOURCE INSPECTION</span
          ><button type="button" (click)="runtime.closeSource()" aria-label="Close source">
            \xD7
          </button>
        </header>
        <div class="detail-meta">
          <strong>{{ source.perspective }}</strong
          ><span>{{ source.sourceType }} \xB7 {{ source.dateLabel }}</span>
        </div>
        <h2>{{ source.title }}</h2>
        <p class="creator">{{ source.creator }}</p>
        <section>
          <strong>{{
            source.excerptKind === 'quotation'
              ? 'Document quotation'
              : 'Editorial summary \u2014 not a quotation'
          }}</strong>
          <p>{{ source.excerpt }}</p>
        </section>
        @if (source.imageUrl) {
          <img
            class="source-image"
            [src]="source.imageUrl"
            [alt]="source.imageAlt || source.title"
          />
        }
        <dl>
          <div>
            <dt>Created by</dt>
            <dd>{{ source.creator }}</dd>
          </div>
          <div>
            <dt>Perspective</dt>
            <dd>{{ source.perspective }}</dd>
          </div>
          <div>
            <dt>Topics</dt>
            <dd>{{ source.tags.join(' \xB7 ') }}</dd>
          </div>
        </dl>
        <p class="citation">{{ source.citation }}</p>
        <footer>
          @if (source.url) {
            <a [href]="source.url" target="_blank" rel="noreferrer">Open original \u2197</a>
          }
          <button type="button" (click)="runtime.toggleSource(source.id)">
            {{
              runtime.state().savedSourceIds.includes(source.id)
                ? 'Remove from story'
                : 'Pin to story'
            }}
          </button>
        </footer>
      </aside>
    }
  </div>

  <section class="fact-check-board" aria-labelledby="fact-check-title">
    <header>
      <div>
        <span>FACT-CHECK BOARD</span>
        <h2 id="fact-check-title">Turn evidence into a responsible claim</h2>
      </div>
      <small>Every major claim needs visible support.</small>
    </header>
    <div class="claim-composer">
      <label
        ><span>Your claim</span
        ><textarea
          rows="2"
          [value]="claimText()"
          (input)="updateClaim($event)"
          placeholder="Based on the evidence, our reporting finds\u2026"
        ></textarea>
      </label>
      <label
        ><span>Evidence status</span
        ><select [value]="claimStatus()" (change)="updateStatus($event)">
          <option value="verified">Verified</option>
          <option value="strongly-supported">Strongly supported</option>
          <option value="partially-supported">Partially supported</option>
          <option value="uncertain">Uncertain</option>
          <option value="disputed">Disputed</option>
        </select></label
      >
      <label
        ><span>Reasoning: how does the passage support or challenge the claim?</span
        ><textarea rows="3" [value]="reasoning()" (input)="updateReasoning($event)"></textarea>
      </label>
      <label
        ><span>Limits and uncertainty to explain on air</span
        ><textarea rows="2" [value]="uncertainty()" (input)="updateUncertainty($event)"></textarea>
      </label>
      <fieldset>
        <legend>
          Select evidence by entering a passage, page reference, or map observation. Leave unused
          sources blank.
        </legend>
        @for (source of runtime.savedSources(); track source.id) {
          <label
            >{{ source.title
            }}<textarea
              rows="2"
              [value]="evidenceFor(source.id)?.passage || ''"
              (input)="setEvidence(source.id, 'passage', $event)"
            ></textarea></label
          ><label
            >Relationship for {{ source.title
            }}<select
              [value]="evidenceFor(source.id)?.relationship || 'supports'"
              (change)="setEvidence(source.id, 'relationship', $event)"
            >
              <option value="supports">Supports</option>
              <option value="challenges">Challenges / counterevidence</option>
            </select></label
          >
        }
      </fieldset>
      <button type="button" (click)="addClaim()">Add checked claim</button>
    </div>
    <div class="claim-list">
      @for (claim of runtime.state().claims; track claim.id) {
        <article>
          <span [class]="claim.status">{{ claim.status.replace('-', ' ') }}</span>
          <p>{{ claim.text }}</p>
          <small>{{ claim.supportingSourceIds.length }} supporting sources</small>
          <p>{{ claim.reasoning }}</p>
          <p>{{ claim.uncertainty }}</p>
          @for (link of claim.evidence || []; track link.sourceId) {
            <p>{{ link.relationship }} \xB7 {{ link.passage }}</p>
          }
          <button type="button" (click)="runtime.removeClaim(claim.id)" aria-label="Remove claim">
            \xD7
          </button>
        </article>
      } @empty {
        <p class="empty">Your checked claims will appear here before they move into the script.</p>
      }
    </div>
  </section>
</section>
`, styles: ['/* src/app/templates/history-live/ui/source-wall.component.scss */\n:host {\n  display: block;\n  color: #dce5e9;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\nselect,\ntextarea {\n  font: inherit;\n}\nbutton:focus-visible,\nselect:focus-visible,\ntextarea:focus-visible,\na:focus-visible {\n  outline: 3px solid #d7b878;\n  outline-offset: 2px;\n}\n.source-room {\n  min-height: 100vh;\n  padding-bottom: 3rem;\n  background:\n    radial-gradient(\n      circle at 15% 10%,\n      rgba(82, 127, 153, 0.14),\n      transparent 23rem),\n    #0c1720;\n}\n.source-header {\n  display: flex;\n  align-items: end;\n  gap: 2rem;\n  border-bottom: 1px solid #293a45;\n  padding: 2rem clamp(1rem, 4vw, 4rem) 1.4rem;\n}\n.source-header > div:first-child {\n  flex: 1;\n}\n.source-header span,\n.source-toolbar > span,\n.fact-check-board header span {\n  color: #c4a66b;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.15em;\n}\n.source-header h1 {\n  margin: 0.35rem 0 0;\n  color: #eff2ef;\n  font: 400 clamp(2rem, 4vw, 3.2rem)/1 Georgia, serif;\n}\n.source-count {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  border-left: 1px solid #334651;\n  padding-left: 1.2rem;\n}\n.source-count strong {\n  color: #e0c17e;\n  font: 400 2rem Georgia, serif;\n}\n.source-count > span {\n  display: grid;\n  color: #b8c6cc;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n.source-count small {\n  color: #71858f;\n  font-size: 0.8rem;\n}\n.source-header > button {\n  min-height: 3rem;\n  border: 0;\n  padding: 0 1rem;\n  color: #10202a;\n  background: #d3b675;\n  font-size: 0.8rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.source-header > button:disabled {\n  color: #667782;\n  background: #2a3b45;\n  cursor: not-allowed;\n}\n.source-toolbar {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.8rem clamp(1rem, 4vw, 4rem);\n  background: #101e27;\n}\n.source-toolbar > span {\n  margin-right: 0.5rem;\n}\n.source-toolbar button {\n  border: 1px solid #30444f;\n  border-radius: 2rem;\n  padding: 0.35rem 0.7rem;\n  color: #8498a2;\n  background: transparent;\n  font-size: 0.8rem;\n  cursor: pointer;\n}\n.source-toolbar button.active {\n  border-color: #ac925e;\n  color: #eddbb3;\n  background: #292716;\n}\n.source-toolbar small {\n  margin-left: auto;\n  color: #657985;\n  font-size: 0.8rem;\n}\n.source-workspace {\n  display: grid;\n  grid-template-columns: 1fr;\n  padding: 1.3rem clamp(1rem, 4vw, 4rem);\n}\n.source-workspace.detail-open {\n  grid-template-columns: minmax(0, 1fr) minmax(18rem, 26rem);\n  gap: 1rem;\n}\n.source-grid {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  align-content: start;\n  gap: 0.8rem;\n}\n.detail-open .source-grid {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n.source-card {\n  display: grid;\n  grid-template-rows: auto 6.5rem auto auto 1fr auto;\n  min-height: 22rem;\n  border: 1px solid #314550;\n  padding: 1rem;\n  background:\n    linear-gradient(\n      145deg,\n      #162631,\n      #0f1b24);\n  transition: transform 0.16s ease, border-color 0.16s ease;\n}\n.source-card:hover {\n  border-color: #536b78;\n  transform: translateY(-2px);\n}\n.source-card.saved {\n  border-color: #a68b57;\n  box-shadow: inset 0 2px #b99b61;\n}\n.source-card.british {\n  background:\n    linear-gradient(\n      145deg,\n      #2b2123,\n      #131a21);\n}\n.source-card.international {\n  background:\n    linear-gradient(\n      145deg,\n      #1a2d28,\n      #101c22);\n}\n.source-card.multiple {\n  background:\n    linear-gradient(\n      145deg,\n      #27283a,\n      #121a24);\n}\n.source-card header {\n  display: flex;\n  justify-content: space-between;\n  color: #8499a3;\n  font-size: 0.8rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.document-mark {\n  position: relative;\n  display: grid;\n  width: 4.6rem;\n  height: 5.5rem;\n  place-items: center;\n  justify-self: center;\n  margin: 0.8rem;\n  border: 1px solid #5e6b6d;\n  color: #243945;\n  background: #cfcec1;\n  box-shadow: 0.4rem 0.45rem 0 #0a141b;\n  font: 900 1.5rem Georgia, serif;\n}\n.document-mark i,\n.document-mark b {\n  position: absolute;\n  right: 0.6rem;\n  left: 0.6rem;\n  height: 1px;\n  background: #869091;\n}\n.document-mark i {\n  bottom: 1.2rem;\n}\n.document-mark b {\n  bottom: 0.8rem;\n}\n.source-card h2 {\n  margin: 0.2rem 0;\n  color: #e1e8e9;\n  font: 400 1.12rem/1.15 Georgia, serif;\n}\n.source-card > p {\n  margin: 0.25rem 0;\n  color: #788c97;\n  font-size: 0.8rem;\n}\n.tags {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: start;\n  gap: 0.3rem;\n  margin: 0.7rem 0;\n}\n.tags span {\n  border: 1px solid #344954;\n  border-radius: 2rem;\n  padding: 0.2rem 0.4rem;\n  color: #81949d;\n  font-size: 0.8rem;\n}\n.source-card footer {\n  display: flex;\n  gap: 0.4rem;\n}\n.source-card button {\n  min-height: 2.35rem;\n  border: 1px solid #3a515e;\n  padding: 0 0.65rem;\n  color: #a8bbc4;\n  background: #13242e;\n  font-size: 0.8rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.source-card .open {\n  flex: 1;\n}\n.source-card .pin {\n  border-color: #76663f;\n  color: #d0b978;\n  background: #27261a;\n}\n.source-detail {\n  position: sticky;\n  top: 9.6rem;\n  align-self: start;\n  max-height: calc(100dvh - 10.6rem);\n  overflow: auto;\n  border: 1px solid #405660;\n  padding: 1.2rem;\n  background: #15242e;\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.32);\n}\n.source-detail > header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 1px solid #30434e;\n  padding-bottom: 0.7rem;\n  color: #c5a66a;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.14em;\n}\n.source-detail > header button {\n  border: 0;\n  color: #91a4ad;\n  background: transparent;\n  font-size: 1.3rem;\n  cursor: pointer;\n}\n.detail-meta {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  margin-top: 1rem;\n}\n.detail-meta strong {\n  border-radius: 2rem;\n  padding: 0.25rem 0.5rem;\n  color: #e8d4a8;\n  background: #5b4a29;\n  font-size: 0.8rem;\n  text-transform: uppercase;\n}\n.detail-meta span {\n  color: #788c96;\n  font-size: 0.8rem;\n}\n.source-detail h2 {\n  margin: 0.8rem 0 0.2rem;\n  color: #f0f2ee;\n  font: 400 1.8rem/1.05 Georgia, serif;\n}\n.creator {\n  margin: 0;\n  color: #8297a1;\n  font-size: 0.8rem;\n}\n.source-detail blockquote {\n  margin: 1.2rem 0;\n  border-left: 3px solid #b39458;\n  padding: 0.9rem 1rem;\n  color: #d7dedf;\n  background: #0e1921;\n  font: italic 1rem/1.55 Georgia, serif;\n}\n.source-detail section > span {\n  color: #c1a76e;\n  font-size: 0.8rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n}\n.source-detail section p {\n  margin: 0.4rem 0;\n  color: #9babb2;\n  font-size: 0.8rem;\n  line-height: 1.55;\n}\n.source-detail dl {\n  display: grid;\n  gap: 0.45rem;\n  margin: 1rem 0;\n}\n.source-detail dl div {\n  display: grid;\n  grid-template-columns: 5rem 1fr;\n  border-top: 1px solid #2b3d47;\n  padding-top: 0.45rem;\n}\n.source-detail dt {\n  color: #6e828c;\n  font-size: 0.8rem;\n}\n.source-detail dd {\n  margin: 0;\n  color: #b3c0c6;\n  font-size: 0.8rem;\n  text-transform: capitalize;\n}\n.check-questions {\n  display: grid;\n  gap: 0.38rem;\n  border: 1px solid #364b56;\n  padding: 0.8rem;\n  background: #101d25;\n}\n.check-questions strong {\n  color: #d1b575;\n  font-size: 0.8rem;\n}\n.check-questions span {\n  color: #91a3ac;\n  font-size: 0.8rem;\n}\n.check-questions span::before {\n  content: "?";\n  display: inline-grid;\n  width: 1rem;\n  aspect-ratio: 1;\n  place-items: center;\n  margin-right: 0.4rem;\n  border-radius: 50%;\n  color: #0f1a21;\n  background: #7996a5;\n  font-size: 0.8rem;\n  font-weight: 900;\n}\n.citation {\n  color: #687c87;\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.source-detail > footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n}\n.source-detail > footer a,\n.source-detail > footer button {\n  color: #d8c18f;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n.source-detail > footer a {\n  text-decoration: none;\n}\n.source-detail > footer button {\n  min-height: 2.5rem;\n  border: 0;\n  padding: 0 0.7rem;\n  color: #12202a;\n  background: #d2b574;\n  cursor: pointer;\n}\n.fact-check-board {\n  margin: 0 clamp(1rem, 4vw, 4rem);\n  border: 1px solid #314550;\n  background: #111f28;\n}\n.fact-check-board > header {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid #2c3f4a;\n  padding: 1rem 1.2rem;\n}\n.fact-check-board h2 {\n  margin: 0.25rem 0 0;\n  color: #e4eaeb;\n  font: 400 1.45rem Georgia, serif;\n}\n.fact-check-board header small {\n  color: #728690;\n  font-size: 0.8rem;\n}\n.claim-composer {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 12rem auto;\n  align-items: end;\n  gap: 0.8rem;\n  padding: 1rem 1.2rem;\n}\n.claim-composer label {\n  display: grid;\n  gap: 0.4rem;\n  color: #95a6ae;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n.claim-composer textarea,\n.claim-composer select {\n  width: 100%;\n  border: 1px solid #3b505c;\n  padding: 0.65rem;\n  color: #dce5e8;\n  background: #0c1820;\n  font-size: 0.8rem;\n}\n.claim-composer button {\n  min-height: 3.45rem;\n  border: 0;\n  padding: 0 0.8rem;\n  color: #14222b;\n  background: #d2b574;\n  font-size: 0.8rem;\n  font-weight: 900;\n  cursor: pointer;\n}\n.claim-list {\n  display: grid;\n  gap: 0.5rem;\n  padding: 0 1.2rem 1.2rem;\n}\n.claim-list article {\n  position: relative;\n  display: grid;\n  grid-template-columns: 8.5rem 1fr auto auto;\n  align-items: center;\n  gap: 0.8rem;\n  border-top: 1px solid #2d404b;\n  padding: 0.75rem 0;\n}\n.claim-list article > span {\n  color: #b8d5c1;\n  font-size: 0.8rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.claim-list article > span.disputed,\n.claim-list article > span.uncertain {\n  color: #e0b792;\n}\n.claim-list p {\n  margin: 0;\n  color: #c7d1d5;\n  font-size: 0.8rem;\n}\n.claim-list small {\n  color: #70838d;\n  font-size: 0.8rem;\n}\n.claim-list button {\n  border: 0;\n  color: #70838d;\n  background: transparent;\n  font-size: 1rem;\n  cursor: pointer;\n}\n.empty {\n  margin: 0;\n  padding: 0.8rem;\n  color: #6d808a;\n  font: italic 0.75rem Georgia, serif;\n}\n@media (max-width: 1100px) {\n  .source-grid,\n  .detail-open .source-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 760px) {\n  .source-header {\n    align-items: flex-start;\n    flex-wrap: wrap;\n  }\n  .source-toolbar {\n    flex-wrap: wrap;\n  }\n  .source-toolbar small {\n    width: 100%;\n    margin: 0;\n  }\n  .source-workspace.detail-open {\n    grid-template-columns: 1fr;\n  }\n  .source-detail {\n    position: fixed;\n    z-index: 40;\n    right: 0.6rem;\n    bottom: 0.6rem;\n    left: 0.6rem;\n    top: auto;\n    max-height: 78dvh;\n  }\n  .claim-composer {\n    grid-template-columns: 1fr;\n  }\n  .claim-list article {\n    grid-template-columns: 1fr auto;\n  }\n  .claim-list article p {\n    grid-column: 1/-1;\n  }\n}\n@media (max-width: 480px) {\n  .source-grid,\n  .detail-open .source-grid {\n    grid-template-columns: 1fr;\n  }\n}\nbutton,\nselect,\ninput {\n  min-height: 2.75rem;\n}\ntextarea {\n  font: inherit;\n  line-height: 1.5;\n}\nbutton[aria-disabled=true] {\n  opacity: 0.65;\n}\n.claim-composer {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: stretch;\n}\n.claim-composer > label {\n  flex: 1 1 18rem;\n}\n.claim-composer fieldset {\n  flex: 1 1 100%;\n  min-width: 0;\n}\n.claim-composer fieldset label {\n  display: grid;\n  gap: 0.4rem;\n  margin: 0.8rem 0;\n}\n.source-image {\n  max-width: 100%;\n}\n/*# sourceMappingURL=source-wall.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SourceWallComponent, { className: "SourceWallComponent", filePath: "src/app/templates/history-live/ui/source-wall.component.ts", lineNumber: 15 });
})();

// src/app/templates/history-live/ui/research-panel.component.ts
var _forTrack07 = ($index, $item) => $item.id;
function ResearchPanelComponent_For_7_Conditional_8_For_4_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section")(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const section_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(section_r6.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(section_r6.text);
  }
}
function ResearchPanelComponent_For_7_Conditional_8_For_4_Conditional_6_For_4_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 11);
    \u0275\u0275text(1, "View document image \u2197");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const source_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275domProperty("href", source_r8.imageUrl, \u0275\u0275sanitizeUrl);
  }
}
function ResearchPanelComponent_For_7_Conditional_8_For_4_Conditional_6_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 10)(1, "p")(2, "strong");
    \u0275\u0275text(3, "Source record");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(5, ResearchPanelComponent_For_7_Conditional_8_For_4_Conditional_6_For_4_Conditional_5_Template, 2, 1, "a", 11);
    \u0275\u0275domElementStart(6, "a", 11);
    \u0275\u0275text(7, "Read original record \u2197");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "p", 12);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "button", 13);
    \u0275\u0275domListener("click", function ResearchPanelComponent_For_7_Conditional_8_For_4_Conditional_6_For_4_Template_button_click_10_listener() {
      const source_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.runtime.toggleSource(source_r8.id));
    });
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const source_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", source_r8.title, " \xB7 ", source_r8.dateLabel, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(source_r8.imageUrl ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275domProperty("href", source_r8.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(source_r8.citation);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", ctx_r2.runtime.state().savedSourceIds.includes(source_r8.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.state().savedSourceIds.includes(source_r8.id) ? "Pinned to my work \u2713" : "Pin to my work", " ");
  }
}
function ResearchPanelComponent_For_7_Conditional_8_For_4_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, ResearchPanelComponent_For_7_Conditional_8_For_4_Conditional_6_For_2_Template, 5, 2, "section", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275repeaterCreate(3, ResearchPanelComponent_For_7_Conditional_8_For_4_Conditional_6_For_4_Template, 12, 7, "div", 10, _forTrack07);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275domProperty("id", "resource-" + item_r5.id);
    \u0275\u0275advance();
    \u0275\u0275repeater(item_r5.sections);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.sources(item_r5.sourceIds));
  }
}
function ResearchPanelComponent_For_7_Conditional_8_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article", 7)(1, "button", 8);
    \u0275\u0275domListener("click", function ResearchPanelComponent_For_7_Conditional_8_For_4_Template_button_click_1_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.shelf.toggleItem(item_r5.id));
    });
    \u0275\u0275domElementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(6, ResearchPanelComponent_For_7_Conditional_8_For_4_Conditional_6_Template, 5, 1, "div", 9);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("is-open", ctx_r2.shelf.items().includes(item_r5.id));
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r2.shelf.items().includes(item_r5.id))("aria-controls", "resource-" + item_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.description);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.shelf.items().includes(item_r5.id) ? 6 : -1);
  }
}
function ResearchPanelComponent_For_7_Conditional_8_ForEmpty_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 5);
    \u0275\u0275text(1, " No records in this category have been added to this project. ");
    \u0275\u0275domElementEnd();
  }
}
function ResearchPanelComponent_For_7_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 4)(1, "p", 5);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(3, ResearchPanelComponent_For_7_Conditional_8_For_4_Template, 7, 7, "article", 6, _forTrack07, false, ResearchPanelComponent_For_7_Conditional_8_ForEmpty_5_Template, 2, 0, "p", 5);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const group_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("id", "research-" + group_r2.id);
    \u0275\u0275attribute("aria-label", group_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r2.description);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.items(group_r2.id));
  }
}
function ResearchPanelComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "section", 0)(1, "button", 2);
    \u0275\u0275domListener("click", function ResearchPanelComponent_For_7_Template_button_click_1_listener() {
      const group_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.shelf.toggleCategory(group_r2.id));
    });
    \u0275\u0275domElementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "b", 3);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(8, ResearchPanelComponent_For_7_Conditional_8_Template, 6, 4, "div", 4);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const group_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275domProperty("id", "research-" + group_r2.id + "-button");
    \u0275\u0275attribute("aria-expanded", ctx_r2.shelf.categories().includes(group_r2.id))("aria-controls", "research-" + group_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.items(group_r2.id).length);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.shelf.categories().includes(group_r2.id) ? "\u2212" : "+");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.shelf.categories().includes(group_r2.id) ? 8 : -1);
  }
}
function ResearchPanelComponent_Conditional_8_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "a", 11);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const source_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275domProperty("href", source_r9.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", source_r9.title, " \u2197");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", source_r9.dateLabel, " \xB7 ", source_r9.sourceType);
  }
}
function ResearchPanelComponent_Conditional_8_ForEmpty_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1, "Sources you pin appear here throughout your work.");
    \u0275\u0275domElementEnd();
  }
}
function ResearchPanelComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "details", 1)(1, "summary");
    \u0275\u0275text(2, " Pinned sources ");
    \u0275\u0275domElementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
    \u0275\u0275repeaterCreate(5, ResearchPanelComponent_Conditional_8_For_6_Template, 5, 4, "article", null, _forTrack07, false, ResearchPanelComponent_Conditional_8_ForEmpty_7_Template, 2, 0, "p");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.runtime.savedSources().length);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.runtime.savedSources());
  }
}
var ResearchPanelComponent = class _ResearchPanelComponent {
  side = input.required(
    ...ngDevMode ? [{ debugName: "side" }] : (
      /* istanbul ignore next */
      []
    )
  );
  runtime = inject(HistoryLiveRuntimeService);
  shelf = inject(ResearchShelfState);
  element = inject(ElementRef);
  groups = computed(
    () => this.side() === "left" ? [
      {
        id: "documents",
        title: "Primary source documents",
        description: "Letters, laws, orders, treaties, and maps."
      },
      {
        id: "witnesses",
        title: "Witness testimony",
        description: "Recorded accounts by people connected to an event."
      }
    ] : [
      {
        id: "interviews",
        title: "Interviews",
        description: "Scripted questions and answers drawn from cited records."
      },
      {
        id: "events",
        title: "Live events",
        description: "Dated event records. These are written summaries, not live footage."
      }
    ],
    ...ngDevMode ? [{ debugName: "groups" }] : (
      /* istanbul ignore next */
      []
    )
  );
  resources = researchItems(this.runtime.config);
  items(category) {
    return this.resources.filter((item) => item.category === category);
  }
  sources(ids) {
    return this.runtime.config.sources.filter((source) => ids.includes(source.id));
  }
  constructor() {
    afterRenderEffect(() => {
      const request = this.shelf.focusRequest();
      if (!request || !this.groups().some((group) => group.id === request.category))
        return;
      const button = this.element.nativeElement.querySelector(`#research-${request.category}-button`);
      button?.scrollIntoView({ block: "nearest", behavior: "instant" });
      button?.focus({ preventScroll: true });
    });
  }
  static \u0275fac = function ResearchPanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ResearchPanelComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResearchPanelComponent, selectors: [["app-history-live-research-panel"]], inputs: { side: [1, "side"] }, decls: 9, vars: 3, consts: [[1, "research-category"], [1, "saved-records"], ["type", "button", 1, "category-button", 3, "click", "id"], ["aria-hidden", "true"], [1, "category-list", 3, "id"], [1, "category-description"], [1, "resource", 3, "is-open"], [1, "resource"], ["type", "button", 1, "resource-button", 3, "click"], [1, "resource-detail", 3, "id"], [1, "record-reference"], ["target", "_blank", "rel", "noopener", 3, "href"], [1, "citation"], ["type", "button", 1, "pin-button", 3, "click"]], template: function ResearchPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "aside")(1, "header")(2, "span");
      \u0275\u0275text(3, "MY WORK \xB7 RESEARCH");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "h2");
      \u0275\u0275text(5);
      \u0275\u0275domElementEnd()();
      \u0275\u0275repeaterCreate(6, ResearchPanelComponent_For_7_Template, 9, 7, "section", 0, _forTrack07);
      \u0275\u0275conditionalCreate(8, ResearchPanelComponent_Conditional_8_Template, 8, 2, "details", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("aria-label", ctx.side() === "left" ? "Primary sources and testimony" : "Interviews and live events");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.side() === "left" ? "Sources" : "In the moment");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.groups());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.side() === "right" ? 8 : -1);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n  color: #263d47;\n  font:\n    14px/1.5 Inter,\n    Arial,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\naside[_ngcontent-%COMP%] {\n  background: #f7f5ee;\n  border: 1px solid #c9d2d3;\n  border-radius: 12px;\n  overflow: hidden;\n}\nheader[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid #d4dad7;\n}\nheader[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 0.12em;\n  font-weight: 800;\n  color: #586e73;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 5px 0 0;\n  font-size: 19px;\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%], \nsummary[_ngcontent-%COMP%] {\n  touch-action: manipulation;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font: inherit;\n  color: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #176d96;\n  outline-offset: -3px;\n}\n.research-category[_ngcontent-%COMP%]    + .research-category[_ngcontent-%COMP%] {\n  border-top: 1px solid #c9d2d3;\n}\n.category-button[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  gap: 8px;\n  border: 0;\n  padding: 16px 12px;\n  text-align: left;\n  background: #e8ede9;\n  min-height: 54px;\n  font-weight: 750;\n}\n.category-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.category-button[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  border: 1px solid #aebcbb;\n  border-radius: 6px;\n  padding: 0 5px;\n}\n.category-button[aria-expanded=true][_ngcontent-%COMP%] {\n  background: #d9e8e8;\n}\n.category-list[_ngcontent-%COMP%] {\n  padding: 8px;\n}\n.category-description[_ngcontent-%COMP%] {\n  margin: 4px 4px 12px;\n  color: #53666e;\n  font-size: 12px;\n}\n.resource[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #d3dcd9;\n  margin-bottom: 8px;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.resource-button[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  padding: 12px;\n  text-align: left;\n  background: transparent;\n}\n.resource-button[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.resource-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n.resource-button[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.resource-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  color: #52676e;\n  font-size: 11px;\n  line-height: 1.6;\n}\n.is-open[_ngcontent-%COMP%] {\n  border-color: #719fa6;\n}\n.resource-detail[_ngcontent-%COMP%] {\n  padding: 0 12px 12px;\n  overflow-wrap: anywhere;\n}\n.resource-detail[_ngcontent-%COMP%]   section[_ngcontent-%COMP%] {\n  border-top: 1px solid #dce3df;\n  padding-top: 10px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 0;\n}\np[_ngcontent-%COMP%] {\n  margin: 7px 0 12px;\n}\n.resource-detail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.record-reference[_ngcontent-%COMP%] {\n  border-top: 1px solid #dce3df;\n  padding-top: 8px;\n}\n.record-reference[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  padding: 8px 0;\n  min-height: 36px;\n}\na[_ngcontent-%COMP%] {\n  color: #145673;\n}\n.citation[_ngcontent-%COMP%] {\n  color: #53666e;\n  font-size: 10px !important;\n}\n.pin-button[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 44px;\n  padding: 8px;\n  background: #e2efed;\n  border: 1px solid #9bb6b6;\n  border-radius: 5px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.saved-records[_ngcontent-%COMP%] {\n  border-top: 1px solid #c9d2d3;\n  padding: 12px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-weight: 750;\n  padding: 8px 0;\n  min-height: 44px;\n}\n.saved-records[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border-top: 1px solid #c9d2d3;\n  padding-top: 12px;\n}\n.saved-records[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.saved-records[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n/*# sourceMappingURL=research-panel.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResearchPanelComponent, [{
    type: Component,
    args: [{ selector: "app-history-live-research-panel", changeDetection: ChangeDetectionStrategy.OnPush, template: `<aside
  [attr.aria-label]="
    side() === 'left' ? 'Primary sources and testimony' : 'Interviews and live events'
  "
>
  <header>
    <span>MY WORK \xB7 RESEARCH</span>
    <h2>{{ side() === 'left' ? 'Sources' : 'In the moment' }}</h2>
  </header>
  @for (group of groups(); track group.id) {
    <section class="research-category">
      <button
        type="button"
        class="category-button"
        [id]="'research-' + group.id + '-button'"
        [attr.aria-expanded]="shelf.categories().includes(group.id)"
        [attr.aria-controls]="'research-' + group.id"
        (click)="shelf.toggleCategory(group.id)"
      >
        <span>{{ group.title }}</span
        ><small>{{ items(group.id).length }}</small>
        <b aria-hidden="true">{{ shelf.categories().includes(group.id) ? '\u2212' : '+' }}</b>
      </button>
      @if (shelf.categories().includes(group.id)) {
        <div class="category-list" [id]="'research-' + group.id" [attr.aria-label]="group.title">
          <p class="category-description">{{ group.description }}</p>
          @for (item of items(group.id); track item.id) {
            <article class="resource" [class.is-open]="shelf.items().includes(item.id)">
              <button
                type="button"
                class="resource-button"
                [attr.aria-expanded]="shelf.items().includes(item.id)"
                [attr.aria-controls]="'resource-' + item.id"
                (click)="shelf.toggleItem(item.id)"
              >
                <strong>{{ item.title }}</strong
                ><span>{{ item.description }}</span>
              </button>
              @if (shelf.items().includes(item.id)) {
                <div class="resource-detail" [id]="'resource-' + item.id">
                  @for (section of item.sections; track $index) {
                    <section>
                      <h3>{{ section.label }}</h3>
                      <p>{{ section.text }}</p>
                    </section>
                  }
                  @for (source of sources(item.sourceIds); track source.id) {
                    <div class="record-reference">
                      <p>
                        <strong>Source record</strong> {{ source.title }} \xB7 {{ source.dateLabel }}
                      </p>
                      @if (source.imageUrl) {
                        <a [href]="source.imageUrl" target="_blank" rel="noopener"
                          >View document image \u2197</a
                        >
                      }
                      <a [href]="source.url" target="_blank" rel="noopener"
                        >Read original record \u2197</a
                      >
                      <p class="citation">{{ source.citation }}</p>
                      <button
                        type="button"
                        class="pin-button"
                        [attr.aria-pressed]="runtime.state().savedSourceIds.includes(source.id)"
                        (click)="runtime.toggleSource(source.id)"
                      >
                        {{
                          runtime.state().savedSourceIds.includes(source.id)
                            ? 'Pinned to my work \u2713'
                            : 'Pin to my work'
                        }}
                      </button>
                    </div>
                  }
                </div>
              }
            </article>
          } @empty {
            <p class="category-description">
              No records in this category have been added to this project.
            </p>
          }
        </div>
      }
    </section>
  }
  @if (side() === 'right') {
    <details class="saved-records">
      <summary>
        Pinned sources <span>{{ runtime.savedSources().length }}</span>
      </summary>
      @for (source of runtime.savedSources(); track source.id) {
        <article>
          <a [href]="source.url" target="_blank" rel="noopener">{{ source.title }} \u2197</a>
          <p>{{ source.dateLabel }} \xB7 {{ source.sourceType }}</p>
        </article>
      } @empty {
        <p>Sources you pin appear here throughout your work.</p>
      }
    </details>
  }
</aside>
`, styles: ["/* src/app/templates/history-live/ui/research-panel.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n  color: #263d47;\n  font:\n    14px/1.5 Inter,\n    Arial,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\naside {\n  background: #f7f5ee;\n  border: 1px solid #c9d2d3;\n  border-radius: 12px;\n  overflow: hidden;\n}\nheader {\n  padding: 16px;\n  border-bottom: 1px solid #d4dad7;\n}\nheader > span {\n  font-size: 9px;\n  letter-spacing: 0.12em;\n  font-weight: 800;\n  color: #586e73;\n}\nh2 {\n  margin: 5px 0 0;\n  font-size: 19px;\n}\nbutton,\na,\nsummary {\n  touch-action: manipulation;\n}\nbutton {\n  cursor: pointer;\n  font: inherit;\n  color: inherit;\n}\nbutton:focus-visible,\na:focus-visible,\nsummary:focus-visible {\n  outline: 3px solid #176d96;\n  outline-offset: -3px;\n}\n.research-category + .research-category {\n  border-top: 1px solid #c9d2d3;\n}\n.category-button {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  gap: 8px;\n  border: 0;\n  padding: 16px 12px;\n  text-align: left;\n  background: #e8ede9;\n  min-height: 54px;\n  font-weight: 750;\n}\n.category-button span {\n  flex: 1;\n}\n.category-button small {\n  border: 1px solid #aebcbb;\n  border-radius: 6px;\n  padding: 0 5px;\n}\n.category-button[aria-expanded=true] {\n  background: #d9e8e8;\n}\n.category-list {\n  padding: 8px;\n}\n.category-description {\n  margin: 4px 4px 12px;\n  color: #53666e;\n  font-size: 12px;\n}\n.resource {\n  background: #fff;\n  border: 1px solid #d3dcd9;\n  margin-bottom: 8px;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.resource-button {\n  width: 100%;\n  border: 0;\n  padding: 12px;\n  text-align: left;\n  background: transparent;\n}\n.resource-button strong,\n.resource-button span {\n  display: block;\n}\n.resource-button strong {\n  font-size: 13px;\n}\n.resource-button span {\n  margin-top: 6px;\n  color: #52676e;\n  font-size: 11px;\n  line-height: 1.6;\n}\n.is-open {\n  border-color: #719fa6;\n}\n.resource-detail {\n  padding: 0 12px 12px;\n  overflow-wrap: anywhere;\n}\n.resource-detail section {\n  border-top: 1px solid #dce3df;\n  padding-top: 10px;\n}\nh3 {\n  font-size: 12px;\n  margin: 0;\n}\np {\n  margin: 7px 0 12px;\n}\n.resource-detail p {\n  font-size: 12px;\n}\n.record-reference {\n  border-top: 1px solid #dce3df;\n  padding-top: 8px;\n}\n.record-reference a {\n  display: block;\n  padding: 8px 0;\n  min-height: 36px;\n}\na {\n  color: #145673;\n}\n.citation {\n  color: #53666e;\n  font-size: 10px !important;\n}\n.pin-button {\n  width: 100%;\n  min-height: 44px;\n  padding: 8px;\n  background: #e2efed;\n  border: 1px solid #9bb6b6;\n  border-radius: 5px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.saved-records {\n  border-top: 1px solid #c9d2d3;\n  padding: 12px;\n}\nsummary {\n  cursor: pointer;\n  font-weight: 750;\n  padding: 8px 0;\n  min-height: 44px;\n}\n.saved-records article {\n  border-top: 1px solid #c9d2d3;\n  padding-top: 12px;\n}\n.saved-records p,\n.saved-records a {\n  font-size: 12px;\n}\n/*# sourceMappingURL=research-panel.component.css.map */\n"] }]
  }], () => [], { side: [{ type: Input, args: [{ isSignal: true, alias: "side", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResearchPanelComponent, { className: "ResearchPanelComponent", filePath: "src/app/templates/history-live/ui/research-panel.component.ts", lineNumber: 21 });
})();

// src/app/templates/history-live/ui/field-newsroom.component.ts
var _forTrack08 = ($index, $item) => $item.id;
function FieldNewsroomComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-inquiry-workspace", 4);
    \u0275\u0275listener("hearingRequested", function FieldNewsroomComponent_Conditional_1_Template_app_inquiry_workspace_hearingRequested_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openStudio());
    });
    \u0275\u0275elementEnd();
  }
}
function FieldNewsroomComponent_Conditional_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, " Your report checkpoint needs another review before recording. Return to your lesson for a fresh check. ");
    \u0275\u0275elementEnd();
  }
}
function FieldNewsroomComponent_Conditional_2_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r4 = ctx.$implicit;
    \u0275\u0275property("value", source_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r4.title);
  }
}
function FieldNewsroomComponent_Conditional_2_Conditional_42_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 37);
  }
  if (rf & 2) {
    const source_r5 = \u0275\u0275nextContext();
    \u0275\u0275property("src", source_r5.imageUrl, \u0275\u0275sanitizeUrl)("alt", source_r5.imageAlt || source_r5.title);
  }
}
function FieldNewsroomComponent_Conditional_2_Conditional_42_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r5.excerpt);
  }
}
function FieldNewsroomComponent_Conditional_2_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "figure");
    \u0275\u0275conditionalCreate(1, FieldNewsroomComponent_Conditional_2_Conditional_42_Conditional_1_Template, 1, 2, "img", 37)(2, FieldNewsroomComponent_Conditional_2_Conditional_42_Conditional_2_Template, 2, 1, "p", 38);
    \u0275\u0275elementStart(3, "figcaption");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const source_r5 = ctx;
    \u0275\u0275advance();
    \u0275\u0275conditional(source_r5.imageUrl ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(source_r5.citation);
  }
}
function FieldNewsroomComponent_Conditional_2_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function FieldNewsroomComponent_Conditional_2_Conditional_49_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.stopRecording());
    });
    \u0275\u0275text(1, " Stop recording ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 40);
    \u0275\u0275text(3, "Recording your microphone\u2026");
    \u0275\u0275elementEnd();
  }
}
function FieldNewsroomComponent_Conditional_2_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function FieldNewsroomComponent_Conditional_2_Conditional_50_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.startRecording("audio"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r1.mayRecord() || ctx_r1.runtime.recordingState() === "requesting");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.recordingState() === "requesting" ? "Waiting for microphone\u2026" : "Record my voice", " ");
  }
}
function FieldNewsroomComponent_Conditional_2_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "video", 41);
    \u0275\u0275elementStart(1, "a", 42);
    \u0275\u0275text(2, "Download my recording");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const url_r8 = ctx;
    \u0275\u0275property("src", url_r8, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("href", url_r8, \u0275\u0275sanitizeUrl);
  }
}
function FieldNewsroomComponent_Conditional_2_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 36)(1, "span", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "details")(8, "summary");
    \u0275\u0275text(9, "Read my prepared section");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 38);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "p", 16);
    \u0275\u0275text(13, " Edits return this section to draft. Preparation does not confirm presentation skills or publish to a classroom. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r9 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Prepared on this device \xB7 ", item_r9.reporter);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r9.headline);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", item_r9.visualLabel, " \xB7 about ", item_r9.durationSeconds, " seconds at a typical speaking pace ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r9.transcript);
  }
}
function FieldNewsroomComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 1)(1, "header")(2, "button", 5);
    \u0275\u0275listener("click", function FieldNewsroomComponent_Conditional_2_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeStudio());
    });
    \u0275\u0275text(3, "\u2190 Back to my lesson");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 6);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h1", 7);
    \u0275\u0275text(7, "Bring your report to life");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "One clear section. A useful visual. Your voice.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 8);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, FieldNewsroomComponent_Conditional_2_Conditional_12_Template, 2, 0, "p", 9);
    \u0275\u0275elementStart(13, "div", 10)(14, "section", 11)(15, "span", 12);
    \u0275\u0275text(16, "1 \xB7 My report");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "label", 13);
    \u0275\u0275text(18, "Headline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 14);
    \u0275\u0275listener("ngModelChange", function FieldNewsroomComponent_Conditional_2_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.updateInquiryDraft("studio-headline", $event));
    })("blur", function FieldNewsroomComponent_Conditional_2_Template_input_blur_19_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.flushDrafts());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(20, "label", 15);
    \u0275\u0275text(21, "My spoken script and readable transcript");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 16);
    \u0275\u0275text(23, " Keep the source credits. This is your section of the team\u2019s 3\u20135 minute broadcast. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 17);
    \u0275\u0275listener("click", function FieldNewsroomComponent_Conditional_2_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.copyReport());
    });
    \u0275\u0275text(25, " Use my latest report ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "textarea", 18);
    \u0275\u0275listener("ngModelChange", function FieldNewsroomComponent_Conditional_2_Template_textarea_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.updateTranscript($event));
    })("blur", function FieldNewsroomComponent_Conditional_2_Template_textarea_blur_26_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.flushDrafts());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(27, "p", 16);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "label", 19);
    \u0275\u0275text(30, "Team running order \xB7 my copy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "textarea", 20);
    \u0275\u0275listener("ngModelChange", function FieldNewsroomComponent_Conditional_2_Template_textarea_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.updateInquiryDraft("studio-order", $event));
    })("blur", function FieldNewsroomComponent_Conditional_2_Template_textarea_blur_31_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.flushDrafts());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "section", 21)(33, "span", 12);
    \u0275\u0275text(34, "2 \xB7 A helpful visual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "label", 22);
    \u0275\u0275text(36, "Choose a credited source");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "select", 23);
    \u0275\u0275listener("ngModelChange", function FieldNewsroomComponent_Conditional_2_Template_select_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.updateInquiryDraft("studio-visual", $event));
    });
    \u0275\u0275elementStart(38, "option", 24);
    \u0275\u0275text(39, "Choose one\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(40, FieldNewsroomComponent_Conditional_2_For_41_Template, 2, 2, "option", 25, _forTrack08);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275conditionalCreate(42, FieldNewsroomComponent_Conditional_2_Conditional_42_Template, 5, 2, "figure");
    \u0275\u0275elementStart(43, "label", 26);
    \u0275\u0275text(44, "What will this help listeners understand?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "textarea", 27);
    \u0275\u0275listener("ngModelChange", function FieldNewsroomComponent_Conditional_2_Template_textarea_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.updateInquiryDraft("studio-media-reason", $event));
    })("blur", function FieldNewsroomComponent_Conditional_2_Template_textarea_blur_45_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.flushDrafts());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(46, "span", 12);
    \u0275\u0275text(47, "3 \xB7 Rehearse and record");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 28);
    \u0275\u0275conditionalCreate(49, FieldNewsroomComponent_Conditional_2_Conditional_49_Template, 4, 0)(50, FieldNewsroomComponent_Conditional_2_Conditional_50_Template, 2, 2, "button", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "label", 30);
    \u0275\u0275text(52, "Or choose a recording from this device");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "input", 31);
    \u0275\u0275listener("change", function FieldNewsroomComponent_Conditional_2_Template_input_change_53_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.upload($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "p", 16);
    \u0275\u0275text(55, " Audio or video, up to 100 MB. Replacing a recording changes your current take; download it first if you want to keep it. ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(56, FieldNewsroomComponent_Conditional_2_Conditional_56_Template, 3, 2);
    \u0275\u0275elementStart(57, "details")(58, "summary");
    \u0275\u0275text(59, "Presenting live or using an approved equivalent?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "label", 32);
    \u0275\u0275text(61, "My presentation plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "textarea", 33);
    \u0275\u0275listener("ngModelChange", function FieldNewsroomComponent_Conditional_2_Template_textarea_ngModelChange_62_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.updateInquiryDraft("studio-performance", $event));
    })("blur", function FieldNewsroomComponent_Conditional_2_Template_textarea_blur_62_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.flushDrafts());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(63, "footer", 34)(64, "h2");
    \u0275\u0275text(65, "Ready to share with your team?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "p");
    \u0275\u0275text(67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 28)(69, "button", 35);
    \u0275\u0275listener("click", function FieldNewsroomComponent_Conditional_2_Template_button_click_69_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.prepareInquirySegment());
    });
    \u0275\u0275text(70, " Prepare my final section ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "button", 5);
    \u0275\u0275listener("click", function FieldNewsroomComponent_Conditional_2_Template_button_click_71_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.flushDrafts());
    });
    \u0275\u0275text(72, "Save my work");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "button", 5);
    \u0275\u0275listener("click", function FieldNewsroomComponent_Conditional_2_Template_button_click_73_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.exportWork());
    });
    \u0275\u0275text(74, "Download work backup");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(75, FieldNewsroomComponent_Conditional_2_Conditional_75_Template, 14, 5, "section", 36);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_18_0;
    let tmp_24_0;
    let tmp_29_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.network.shortName, " \xB7 My recording desk");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" Local preview \xB7 ", ctx_r1.runtime.saveState() === "error" ? "Not saved \u2014 download a backup and keep this page open" : ctx_r1.runtime.saveState() === "saved" ? "Saved on this device" : "Saving\u2026", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.mayRecord() ? 12 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", !ctx_r1.mayRecord())("ngModel", ctx_r1.draft("studio-headline"));
    \u0275\u0275control();
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r1.mayRecord());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.mayRecord())("ngModel", ctx_r1.runtime.state().transcript || "");
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.wordCount(), " words \xB7 length helps planning; it does not award a standard. ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.draft("studio-order"));
    \u0275\u0275control();
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", !ctx_r1.mayRecord())("ngModel", ctx_r1.draft("studio-visual"));
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.visuals);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_18_0 = ctx_r1.selectedVisual()) ? 42 : -1, tmp_18_0);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r1.mayRecord())("ngModel", ctx_r1.draft("studio-media-reason"));
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.runtime.recordingState() === "recording" ? 49 : 50);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.mayRecord() || ctx_r1.runtime.recordingState() === "recording" || ctx_r1.runtime.recordingState() === "requesting");
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_24_0 = ctx_r1.runtime.recordingUrl()) ? 56 : -1, tmp_24_0);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r1.draft("studio-performance"));
    \u0275\u0275control();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.mayRelease() ? "Your final checkpoint is reviewed in this demo. Prepare your section, then present together in class." : "Keep rehearsing. The lesson 7 personal defense (E-C) must be reviewed before final preparation.", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.mayRelease() || ctx_r1.runtime.recordingState() === "recording" || ctx_r1.runtime.recordingState() === "requesting");
    \u0275\u0275advance(6);
    \u0275\u0275conditional((tmp_29_0 = ctx_r1.segment()) ? 75 : -1, tmp_29_0);
  }
}
function FieldNewsroomComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.runtime.error());
  }
}
function FieldNewsroomComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.runtime.notification());
  }
}
function historyInquiryPort() {
  const runtime = inject(HistoryLiveRuntimeService);
  return {
    config: {
      title: runtime.config.title,
      projectId: runtime.config.projectId,
      historicalSetting: runtime.config.historicalWindow,
      centralQuestion: runtime.config.drivingQuestion,
      inquiry: runtime.config.inquiry,
      viewer: {
        studentDisplayName: runtime.viewer.studentDisplayName,
        allowTeacherPreview: runtime.isDemo
      },
      evidence: runtime.config.sources.map((s) => __spreadProps(__spreadValues({}, s), { sourceUrl: s.url }))
    },
    inquiryState: () => runtime.inquiryState(),
    saveState: () => runtime.saveState() === "error" ? "local" : runtime.saveState() === "saved" ? "saved" : "saving",
    inquiryGate: (id) => runtime.inquiryGate(id),
    updateInquiryDraft: (key, value) => runtime.updateInquiryDraft(key, value),
    saveInquiryDrafts: () => runtime.flushDrafts(),
    submitInquiryAttempt: (lesson, prompt, response, targetId) => runtime.submitInquiryAttempt(lesson, prompt, response, targetId),
    reviewInquiryAttempt: (id, decision, feedback, performance) => runtime.reviewInquiryAttempt(id, decision, feedback, performance),
    teacherPreview: () => runtime.canProduce(),
    canManageModerator: () => runtime.canProduce(),
    toggleTeacherPreview: () => runtime.setRole(runtime.canProduce() ? "student" : "producer")
  };
}
var FieldNewsroomComponent = class _FieldNewsroomComponent {
  runtime = inject(HistoryLiveRuntimeService);
  studio = this.runtime.config.fieldStudio;
  studioOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "studioOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  network = this.runtime.config.networks.find((n) => n.side === this.studio.networkSide);
  visuals = this.runtime.config.sources.filter((s) => this.studio.visualSourceIds.includes(s.id));
  selectedVisual = computed(
    () => this.visuals.find((s) => s.id === this.draft("studio-visual")),
    ...ngDevMode ? [{ debugName: "selectedVisual" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mayRecord = computed(
    () => this.runtime.inquiryGate(this.studio.recordingGateId),
    ...ngDevMode ? [{ debugName: "mayRecord" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mayRelease = computed(
    () => this.runtime.inquiryGate(this.studio.finalGateId),
    ...ngDevMode ? [{ debugName: "mayRelease" }] : (
      /* istanbul ignore next */
      []
    )
  );
  segment = computed(
    () => this.runtime.state().schedule.find((s) => s.id === this.runtime.currentStudentSegmentId),
    ...ngDevMode ? [{ debugName: "segment" }] : (
      /* istanbul ignore next */
      []
    )
  );
  wordCount = computed(
    () => this.runtime.state().transcript?.trim().split(/\s+/).filter(Boolean).length ?? 0,
    ...ngDevMode ? [{ debugName: "wordCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    bindLessonFocus(() => this.closeStudio());
  }
  draft(key) {
    return this.runtime.inquiryState().drafts[key] ?? "";
  }
  openStudio() {
    this.runtime.flushDrafts();
    if (this.mayRecord())
      this.studioOpen.set(true);
  }
  closeStudio() {
    this.runtime.stopRecording();
    this.runtime.flushDrafts();
    this.studioOpen.set(false);
  }
  copyReport() {
    if (!this.mayRecord())
      return;
    const drafts = this.runtime.inquiryState().drafts;
    this.runtime.updateTranscript(drafts["lesson-7-final-report"] || drafts["lesson-5-revision"] || drafts["lesson-4-report"] || "");
    this.runtime.flushDrafts();
  }
  async upload(event) {
    const input2 = event.target;
    const file = input2.files?.[0];
    if (file)
      await this.runtime.storeRecording(file);
    input2.value = "";
  }
  static \u0275fac = function FieldNewsroomComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FieldNewsroomComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FieldNewsroomComponent, selectors: [["app-field-newsroom"]], features: [\u0275\u0275ProvidersFeature([{ provide: INQUIRY_WORKSPACE, useFactory: historyInquiryPort }])], decls: 5, vars: 5, consts: [[1, "field-newsroom"], ["aria-labelledby", "recording-title", 1, "recording-desk"], ["role", "alert", 1, "runtime-message", "error"], ["role", "status", 1, "runtime-message"], [3, "hearingRequested"], ["type", "button", 3, "click"], [1, "eyebrow"], ["id", "recording-title"], ["role", "status", 1, "small"], [1, "notice"], [1, "studio-columns"], ["aria-label", "My report script", 1, "paper"], [1, "step"], ["for", "studio-headline"], ["id", "studio-headline", 3, "ngModelChange", "blur", "disabled", "ngModel"], ["for", "studio-transcript"], [1, "small"], ["type", "button", 3, "click", "disabled"], ["id", "studio-transcript", "rows", "12", 3, "ngModelChange", "blur", "disabled", "ngModel"], ["for", "studio-order"], ["id", "studio-order", "rows", "3", "placeholder", "Opening \u2192 each reporter\u2019s section \u2192 closing. Name who speaks and when.", 3, "ngModelChange", "blur", "ngModel"], ["aria-label", "My visual and recording", 1, "paper"], ["for", "studio-visual"], ["id", "studio-visual", 3, "ngModelChange", "disabled", "ngModel"], ["value", ""], [3, "value"], ["for", "studio-media-reason"], ["id", "studio-media-reason", "rows", "2", 3, "ngModelChange", "blur", "disabled", "ngModel"], [1, "actions"], ["type", "button", 1, "primary", 3, "disabled"], ["for", "studio-upload"], ["id", "studio-upload", "type", "file", "accept", "audio/*,video/*", 3, "change", "disabled"], ["for", "studio-performance"], ["id", "studio-performance", "rows", "3", "placeholder", "Explain when you will present, or record the equivalent your teacher approved. The teacher still observes the assessed skills.", 3, "ngModelChange", "blur", "ngModel"], [1, "paper"], ["type", "button", 1, "primary", 3, "click", "disabled"], ["aria-label", "Prepared broadcast section", 1, "preview"], [3, "src", "alt"], [1, "source-text"], ["type", "button", 1, "primary", 3, "click"], ["role", "status"], ["controls", "", "preload", "metadata", "aria-label", "My recorded report", 3, "src"], ["download", "my-report-recording", 3, "href"]], template: function FieldNewsroomComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0);
      \u0275\u0275conditionalCreate(1, FieldNewsroomComponent_Conditional_1_Template, 1, 0, "app-inquiry-workspace")(2, FieldNewsroomComponent_Conditional_2_Template, 76, 22, "section", 1);
      \u0275\u0275conditionalCreate(3, FieldNewsroomComponent_Conditional_3_Template, 2, 1, "p", 2);
      \u0275\u0275conditionalCreate(4, FieldNewsroomComponent_Conditional_4_Template, 2, 1, "p", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275styleProp("--%NS%newsroom-image", "url(" + ctx.network.deskImageUrl + ")");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.studioOpen() ? 1 : 2);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.runtime.error() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.notification() ? 4 : -1);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, InquiryWorkspaceComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.field-newsroom[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding: 12px 0 40px;\n  background: linear-gradient(rgba(16, 45, 59, 0.4), rgba(19, 44, 52, 0.7215686275)), var(--%NS%newsroom-image) center top/cover fixed;\n  color: #183e46;\n}\n.recording-desk[_ngcontent-%COMP%] {\n  max-width: 1160px;\n  margin: auto;\n  padding: 20px;\n  font: 18px/1.55 system-ui, sans-serif;\n}\nheader[_ngcontent-%COMP%] {\n  color: #fff9eb;\n  text-align: center;\n  padding: 8px 0 24px;\n  text-shadow: 0 1px 7px #10202c;\n}\nheader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 20px;\n}\nh1[_ngcontent-%COMP%] {\n  font: 600 clamp(30px, 4vw, 46px)/1.15 Georgia, serif;\n  margin: 12px 0;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin: 0 0 12px;\n}\n.eyebrow[_ngcontent-%COMP%], \n.step[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 800;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n.step[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 18px;\n}\n.studio-columns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.05fr 1fr;\n  gap: 20px;\n  align-items: start;\n}\n.paper[_ngcontent-%COMP%] {\n  padding: 24px;\n  background: #fffaf0;\n  border: 1px solid #d4c9aa;\n  border-radius: 16px;\n  box-shadow: 0 10px 30px rgba(0, 29, 41, 0.2196078431);\n  min-width: 0;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 700;\n  margin: 16px 0 8px;\n}\ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 100%;\n  max-width: 100%;\n  border: 1px solid #9daaa1;\n  border-radius: 8px;\n  background: white;\n  padding: 12px;\n  font: inherit;\n  color: #173e46;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\nbutton[_ngcontent-%COMP%], \nsummary[_ngcontent-%COMP%], \na[_ngcontent-%COMP%] {\n  min-height: 48px;\n  font: 700 16px/1.4 system-ui, sans-serif;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 12px 18px;\n  border: 1px solid #8ba59d;\n  border-radius: 9px;\n  background: #edf4ec;\n  color: #183e46;\n  cursor: pointer;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #236c73;\n  color: white;\n  border-color: #236c73;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n[_ngcontent-%COMP%]:is(button, textarea, input, select, summary, a):focus-visible {\n  outline: 3px solid #d09124;\n  outline-offset: 3px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-items: center;\n  margin: 16px 0;\n}\n.small[_ngcontent-%COMP%], \nfigcaption[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.6;\n}\nfigure[_ngcontent-%COMP%] {\n  margin: 16px 0;\n}\nimg[_ngcontent-%COMP%], \nvideo[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  border-radius: 10px;\n}\nvideo[_ngcontent-%COMP%] {\n  max-height: 300px;\n  background: #183d46;\n  margin: 16px 0 8px;\n}\n.source-text[_ngcontent-%COMP%] {\n  white-space: pre-line;\n}\nsummary[_ngcontent-%COMP%] {\n  padding: 14px 0;\n  cursor: pointer;\n}\nfooter[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.preview[_ngcontent-%COMP%] {\n  border-top: 1px solid #bacbc2;\n  margin-top: 24px;\n  padding-top: 20px;\n}\n.notice[_ngcontent-%COMP%], \n.runtime-message[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #fff6df;\n  border-radius: 8px;\n  margin: 16px auto;\n  max-width: 1100px;\n}\n.error[_ngcontent-%COMP%] {\n  border: 2px solid #974c24;\n}\n@media (max-width: 760px) {\n  .studio-columns[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .recording-desk[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .paper[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .field-newsroom[_ngcontent-%COMP%] {\n    background-attachment: scroll;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    scroll-behavior: auto;\n  }\n}\n/*# sourceMappingURL=field-newsroom.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FieldNewsroomComponent, [{
    type: Component,
    args: [{ selector: "app-field-newsroom", imports: [FormsModule, InquiryWorkspaceComponent], providers: [{ provide: INQUIRY_WORKSPACE, useFactory: historyInquiryPort }], template: `<main class="field-newsroom" [style.--newsroom-image]="'url(' + network.deskImageUrl + ')'">
  @if (!studioOpen()) {
    <app-inquiry-workspace (hearingRequested)="openStudio()" />
  } @else {
    <section class="recording-desk" aria-labelledby="recording-title">
      <header>
        <button type="button" (click)="closeStudio()">\u2190 Back to my lesson</button>
        <span class="eyebrow">{{ network.shortName }} \xB7 My recording desk</span>
        <h1 id="recording-title">Bring your report to life</h1>
        <p>One clear section. A useful visual. Your voice.</p>
        <p class="small" role="status">
          Local preview \xB7
          {{
            runtime.saveState() === 'error'
              ? 'Not saved \u2014 download a backup and keep this page open'
              : runtime.saveState() === 'saved'
                ? 'Saved on this device'
                : 'Saving\u2026'
          }}
        </p>
      </header>
      @if (!mayRecord()) {
        <p class="notice">
          Your report checkpoint needs another review before recording. Return to your lesson for a
          fresh check.
        </p>
      }
      <div class="studio-columns">
        <section class="paper" aria-label="My report script">
          <span class="step">1 \xB7 My report</span>
          <label for="studio-headline">Headline</label>
          <input
            id="studio-headline"
            [disabled]="!mayRecord()"
            [ngModel]="draft('studio-headline')"
            (ngModelChange)="runtime.updateInquiryDraft('studio-headline', $event)"
            (blur)="runtime.flushDrafts()"
          />
          <label for="studio-transcript">My spoken script and readable transcript</label>
          <p class="small">
            Keep the source credits. This is your section of the team\u2019s 3\u20135 minute broadcast.
          </p>
          <button type="button" [disabled]="!mayRecord()" (click)="copyReport()">
            Use my latest report
          </button>
          <textarea
            id="studio-transcript"
            rows="12"
            [disabled]="!mayRecord()"
            [ngModel]="runtime.state().transcript || ''"
            (ngModelChange)="runtime.updateTranscript($event)"
            (blur)="runtime.flushDrafts()"
          ></textarea>
          <p class="small">
            {{ wordCount() }} words \xB7 length helps planning; it does not award a standard.
          </p>
          <label for="studio-order">Team running order \xB7 my copy</label>
          <textarea
            id="studio-order"
            rows="3"
            [ngModel]="draft('studio-order')"
            (ngModelChange)="runtime.updateInquiryDraft('studio-order', $event)"
            (blur)="runtime.flushDrafts()"
            placeholder="Opening \u2192 each reporter\u2019s section \u2192 closing. Name who speaks and when."
          ></textarea>
        </section>
        <section class="paper" aria-label="My visual and recording">
          <span class="step">2 \xB7 A helpful visual</span>
          <label for="studio-visual">Choose a credited source</label>
          <select
            id="studio-visual"
            [disabled]="!mayRecord()"
            [ngModel]="draft('studio-visual')"
            (ngModelChange)="runtime.updateInquiryDraft('studio-visual', $event)"
          >
            <option value="">Choose one\u2026</option>
            @for (source of visuals; track source.id) {
              <option [value]="source.id">{{ source.title }}</option>
            }
          </select>
          @if (selectedVisual(); as source) {
            <figure>
              @if (source.imageUrl) {
                <img [src]="source.imageUrl" [alt]="source.imageAlt || source.title" />
              } @else {
                <p class="source-text">{{ source.excerpt }}</p>
              }
              <figcaption>{{ source.citation }}</figcaption>
            </figure>
          }
          <label for="studio-media-reason">What will this help listeners understand?</label>
          <textarea
            id="studio-media-reason"
            rows="2"
            [disabled]="!mayRecord()"
            [ngModel]="draft('studio-media-reason')"
            (ngModelChange)="runtime.updateInquiryDraft('studio-media-reason', $event)"
            (blur)="runtime.flushDrafts()"
          ></textarea>
          <span class="step">3 \xB7 Rehearse and record</span>
          <div class="actions">
            @if (runtime.recordingState() === 'recording') {
              <button type="button" class="primary" (click)="runtime.stopRecording()">
                Stop recording
              </button>
              <span role="status">Recording your microphone\u2026</span>
            } @else {
              <button
                type="button"
                class="primary"
                [disabled]="!mayRecord() || runtime.recordingState() === 'requesting'"
                (click)="runtime.startRecording('audio')"
              >
                {{
                  runtime.recordingState() === 'requesting'
                    ? 'Waiting for microphone\u2026'
                    : 'Record my voice'
                }}
              </button>
            }
          </div>
          <label for="studio-upload">Or choose a recording from this device</label>
          <input
            id="studio-upload"
            type="file"
            accept="audio/*,video/*"
            [disabled]="
              !mayRecord() ||
              runtime.recordingState() === 'recording' ||
              runtime.recordingState() === 'requesting'
            "
            (change)="upload($event)"
          />
          <p class="small">
            Audio or video, up to 100 MB. Replacing a recording changes your current take; download
            it first if you want to keep it.
          </p>
          @if (runtime.recordingUrl(); as url) {
            <video [src]="url" controls preload="metadata" aria-label="My recorded report"></video>
            <a [href]="url" download="my-report-recording">Download my recording</a>
          }
          <details>
            <summary>Presenting live or using an approved equivalent?</summary>
            <label for="studio-performance">My presentation plan</label>
            <textarea
              id="studio-performance"
              rows="3"
              [ngModel]="draft('studio-performance')"
              (ngModelChange)="runtime.updateInquiryDraft('studio-performance', $event)"
              (blur)="runtime.flushDrafts()"
              placeholder="Explain when you will present, or record the equivalent your teacher approved. The teacher still observes the assessed skills."
            ></textarea>
          </details>
        </section>
      </div>
      <footer class="paper">
        <h2>Ready to share with your team?</h2>
        <p>
          {{
            mayRelease()
              ? 'Your final checkpoint is reviewed in this demo. Prepare your section, then present together in class.'
              : 'Keep rehearsing. The lesson 7 personal defense (E-C) must be reviewed before final preparation.'
          }}
        </p>
        <div class="actions">
          <button
            class="primary"
            type="button"
            [disabled]="
              !mayRelease() ||
              runtime.recordingState() === 'recording' ||
              runtime.recordingState() === 'requesting'
            "
            (click)="runtime.prepareInquirySegment()"
          >
            Prepare my final section
          </button>
          <button type="button" (click)="runtime.flushDrafts()">Save my work</button>
          <button type="button" (click)="runtime.exportWork()">Download work backup</button>
        </div>
        @if (segment(); as item) {
          <section class="preview" aria-label="Prepared broadcast section">
            <span class="eyebrow">Prepared on this device \xB7 {{ item.reporter }}</span>
            <h3>{{ item.headline }}</h3>
            <p>
              {{ item.visualLabel }} \xB7 about {{ item.durationSeconds }} seconds at a typical
              speaking pace
            </p>
            <details>
              <summary>Read my prepared section</summary>
              <p class="source-text">{{ item.transcript }}</p>
            </details>
            <p class="small">
              Edits return this section to draft. Preparation does not confirm presentation skills
              or publish to a classroom.
            </p>
          </section>
        }
      </footer>
    </section>
  }
  @if (runtime.error()) {
    <p class="runtime-message error" role="alert">{{ runtime.error() }}</p>
  }
  @if (runtime.notification()) {
    <p class="runtime-message" role="status">{{ runtime.notification() }}</p>
  }
</main>
`, styles: ["/* src/app/templates/history-live/ui/field-newsroom.component.scss */\n:host {\n  display: block;\n}\n.field-newsroom {\n  min-height: 100%;\n  padding: 12px 0 40px;\n  background: linear-gradient(rgba(16, 45, 59, 0.4), rgba(19, 44, 52, 0.7215686275)), var(--newsroom-image) center top/cover fixed;\n  color: #183e46;\n}\n.recording-desk {\n  max-width: 1160px;\n  margin: auto;\n  padding: 20px;\n  font: 18px/1.55 system-ui, sans-serif;\n}\nheader {\n  color: #fff9eb;\n  text-align: center;\n  padding: 8px 0 24px;\n  text-shadow: 0 1px 7px #10202c;\n}\nheader button {\n  display: block;\n  margin-bottom: 20px;\n}\nh1 {\n  font: 600 clamp(30px, 4vw, 46px)/1.15 Georgia, serif;\n  margin: 12px 0;\n}\nh2 {\n  font-size: 24px;\n  margin: 0 0 12px;\n}\n.eyebrow,\n.step {\n  font-size: 13px;\n  font-weight: 800;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n.step {\n  display: block;\n  margin-bottom: 18px;\n}\n.studio-columns {\n  display: grid;\n  grid-template-columns: 1.05fr 1fr;\n  gap: 20px;\n  align-items: start;\n}\n.paper {\n  padding: 24px;\n  background: #fffaf0;\n  border: 1px solid #d4c9aa;\n  border-radius: 16px;\n  box-shadow: 0 10px 30px rgba(0, 29, 41, 0.2196078431);\n  min-width: 0;\n}\nlabel {\n  display: block;\n  font-weight: 700;\n  margin: 16px 0 8px;\n}\ninput,\ntextarea,\nselect {\n  box-sizing: border-box;\n  width: 100%;\n  max-width: 100%;\n  border: 1px solid #9daaa1;\n  border-radius: 8px;\n  background: white;\n  padding: 12px;\n  font: inherit;\n  color: #173e46;\n}\ntextarea {\n  resize: vertical;\n}\nbutton,\nsummary,\na {\n  min-height: 48px;\n  font: 700 16px/1.4 system-ui, sans-serif;\n}\nbutton {\n  padding: 12px 18px;\n  border: 1px solid #8ba59d;\n  border-radius: 9px;\n  background: #edf4ec;\n  color: #183e46;\n  cursor: pointer;\n}\nbutton.primary {\n  background: #236c73;\n  color: white;\n  border-color: #236c73;\n}\nbutton:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n:is(button, textarea, input, select, summary, a):focus-visible {\n  outline: 3px solid #d09124;\n  outline-offset: 3px;\n}\n.actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-items: center;\n  margin: 16px 0;\n}\n.small,\nfigcaption {\n  font-size: 14px;\n  line-height: 1.6;\n}\nfigure {\n  margin: 16px 0;\n}\nimg,\nvideo {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  border-radius: 10px;\n}\nvideo {\n  max-height: 300px;\n  background: #183d46;\n  margin: 16px 0 8px;\n}\n.source-text {\n  white-space: pre-line;\n}\nsummary {\n  padding: 14px 0;\n  cursor: pointer;\n}\nfooter {\n  margin-top: 20px;\n}\n.preview {\n  border-top: 1px solid #bacbc2;\n  margin-top: 24px;\n  padding-top: 20px;\n}\n.notice,\n.runtime-message {\n  padding: 16px;\n  background: #fff6df;\n  border-radius: 8px;\n  margin: 16px auto;\n  max-width: 1100px;\n}\n.error {\n  border: 2px solid #974c24;\n}\n@media (max-width: 760px) {\n  .studio-columns {\n    grid-template-columns: 1fr;\n  }\n  .recording-desk {\n    padding: 14px;\n  }\n  .paper {\n    padding: 18px;\n  }\n  .field-newsroom {\n    background-attachment: scroll;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    scroll-behavior: auto;\n  }\n}\n/*# sourceMappingURL=field-newsroom.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FieldNewsroomComponent, { className: "FieldNewsroomComponent", filePath: "src/app/templates/history-live/ui/field-newsroom.component.ts", lineNumber: 54 });
})();

// src/app/templates/history-live/ui/history-live-page.component.ts
var _c03 = () => [];
var _forTrack09 = ($index, $item) => $item.id;
function HistoryLivePageComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-field-newsroom");
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "main", 3);
    \u0275\u0275element(1, "div", 4);
    \u0275\u0275elementStart(2, "section", 5)(3, "p", 6);
    \u0275\u0275element(4, "span");
    \u0275\u0275text(5, " A History Live Special Report");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 7)(7, "span");
    \u0275\u0275text(8, "HISTORY");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "strong", 8);
    \u0275\u0275text(10, "LIVE");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "h1");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 9);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 10)(16, "button", 11);
    \u0275\u0275listener("click", function HistoryLivePageComponent_Conditional_1_Conditional_1_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.goTo("side"));
    });
    \u0275\u0275text(17, " Enter the newsroom ");
    \u0275\u0275elementStart(18, "b", 12);
    \u0275\u0275text(19, "\u2192");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275element(21, "i");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.event);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.drivingQuestion);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" Special broadcast scheduled ", ctx_r1.runtime.config.broadcastDateLabel);
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
    \u0275\u0275elementStart(1, "span")(2, "small");
    \u0275\u0275text(3, "REPORTING FOR");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const network_r5 = ctx;
    \u0275\u0275classMap(network_r5.side);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(network_r5.name);
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
    \u0275\u0275elementStart(1, "span")(2, "small");
    \u0275\u0275text(3, "ASSIGNMENT");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, "Unassigned");
    \u0275\u0275elementEnd();
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label")(1, "span", 29);
    \u0275\u0275text(2, "Demo view as");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 30);
    \u0275\u0275listener("change", function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_22_Template_select_change_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.chooseRole($event));
    });
    \u0275\u0275elementStart(4, "option", 31);
    \u0275\u0275text(5, "Demo reporter");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 32);
    \u0275\u0275text(7, "Demo producer");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.runtime.state().role);
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_For_30_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function HistoryLivePageComponent_Conditional_1_Conditional_2_For_30_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const stage_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.goTo(stage_r8.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r8 = \u0275\u0275nextContext();
    const stage_r8 = ctx_r8.$implicit;
    const \u0275$index_124_r10 = ctx_r8.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r1.runtime.state().stage === stage_r8.id)("available", ctx_r1.runtime.canOpen(stage_r8.id));
    \u0275\u0275property("title", ctx_r1.runtime.stageIssues(stage_r8.id).join(" "));
    \u0275\u0275attribute("aria-disabled", !ctx_r1.runtime.canOpen(stage_r8.id))("aria-current", ctx_r1.runtime.state().stage === stage_r8.id ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_124_r10.toString().padStart(2, "0"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", stage_r8.shortLabel, " ");
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, HistoryLivePageComponent_Conditional_1_Conditional_2_For_30_Conditional_0_Template, 4, 9, "button", 33);
  }
  if (rf & 2) {
    const stage_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(stage_r8.id !== "opening" && (ctx_r1.runtime.canOpen(stage_r8.id) || ctx_r1.runtime.state().stage === stage_r8.id) ? 0 : -1);
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_0_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_0_For_6_Template_button_click_0_listener() {
      const beat_r13 = \u0275\u0275restoreView(_r12).$implicit;
      \u0275\u0275nextContext();
      const beatsMenu_r14 = \u0275\u0275reference(1);
      const desk_r15 = \u0275\u0275nextContext();
      desk_r15.openBeat(beat_r13.id);
      return \u0275\u0275resetView(beatsMenu_r14.open = false);
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const beat_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", beat_r13.label, " ");
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "details", 35, 0)(2, "summary");
    \u0275\u0275text(3, "News beats");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275repeaterCreate(5, HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_0_For_6_Template, 2, 1, "button", 36, _forTrack09);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 11);
    \u0275\u0275listener("click", function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_0_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.runtime.pitchOwnStory());
    });
    \u0275\u0275text(8, "+ My own story");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.runtime.config.beats);
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_1_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_1_For_2_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const \u0275$index_151_r17 = \u0275\u0275nextContext().$index;
      const desk_r15 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(desk_r15.setPitchStep(\u0275$index_151_r17));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r17 = \u0275\u0275nextContext();
    const label_r19 = ctx_r17.$implicit;
    const \u0275$index_151_r17 = ctx_r17.$index;
    const desk_r15 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-current", desk_r15.pitchStep() === \u0275$index_151_r17 ? "step" : null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275$index_151_r17 + 1, " \xB7 ", label_r19, " ");
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_1_For_2_Conditional_0_Template, 2, 3, "button", 36);
  }
  if (rf & 2) {
    const \u0275$index_151_r17 = ctx.$index;
    const desk_r15 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(\u0275$index_151_r17 <= desk_r15.pitchStep() + 1 ? 0 : -1);
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_1_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const desk_r15 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(desk_r15.setPitchStep(desk_r15.pitchStep() + 1));
    });
    \u0275\u0275text(1, "Next \u2192");
    \u0275\u0275elementEnd();
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 37);
    \u0275\u0275repeaterCreate(1, HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_1_For_2_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_1_Conditional_3_Template, 2, 0, "button", 36);
  }
  if (rf & 2) {
    const desk_r15 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(desk_r15.pitchSteps);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(desk_r15.pitchStep() < desk_r15.pitchSteps.length - 1 ? 3 : -1);
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_0_Template, 9, 0)(1, HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Conditional_1_Template, 4, 1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r1.runtime.state().stage === "assignment" ? 0 : 1);
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const criterion_r21 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(criterion_r21.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(criterion_r21.expectation);
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Local practice: reviews are simulated and your work stays on this device.");
    \u0275\u0275elementEnd();
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 39);
    \u0275\u0275listener("click", function HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_43_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.clearNotice());
    });
    \u0275\u0275text(4, " \xD7 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("error", ctx_r1.runtime.error());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.error() ?? ctx_r1.runtime.notification());
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Case_47_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article");
    \u0275\u0275element(1, "img", 44);
    \u0275\u0275elementStart(2, "span", 45);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 11);
    \u0275\u0275listener("click", function HistoryLivePageComponent_Conditional_1_Conditional_2_Case_47_For_11_Template_button_click_8_listener() {
      const network_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.chooseSide(network_r24.side));
    });
    \u0275\u0275text(9);
    \u0275\u0275elementStart(10, "span", 12);
    \u0275\u0275text(11, "\u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const network_r24 = ctx.$implicit;
    \u0275\u0275classMap("network-card " + network_r24.side);
    \u0275\u0275advance();
    \u0275\u0275property("src", network_r24.deskImageUrl, \u0275\u0275sanitizeUrl)("alt", network_r24.deskImageAlt);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", network_r24.deskLabel, " \xB7 ", network_r24.deskLocationLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(network_r24.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(network_r24.perspective);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Join ", network_r24.shortName, " ");
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Case_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 27)(1, "header", 40)(2, "div")(3, "span");
    \u0275\u0275text(4, "NEWSROOM CREDENTIALS \xB7 STEP 01");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h1", 41);
    \u0275\u0275text(6, "Choose your reporting network");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, " Your network shapes your reporting lens. It never changes the standard for evidence. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 42);
    \u0275\u0275repeaterCreate(10, HistoryLivePageComponent_Conditional_1_Conditional_2_Case_47_For_11_Template, 12, 9, "article", 43, _forTrack09);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r1.runtime.config.networks);
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Case_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-history-live-assignment-desk");
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Case_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-history-live-assignment-desk");
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Case_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-history-live-source-wall");
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Case_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-history-live-script-desk");
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Case_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-history-live-production-studio");
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Case_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-history-live-broadcast-player");
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Case_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-history-live-producer-console");
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Case_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-history-live-broadcast-player");
  }
}
function HistoryLivePageComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-workspace-tools")(1, "header", 13)(2, "a", 14)(3, "span");
    \u0275\u0275text(4, "HL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "strong");
    \u0275\u0275text(7, "HISTORY LIVE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 15);
    \u0275\u0275conditionalCreate(11, HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_11_Template, 5, 3)(12, HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_12_Template, 5, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "details", 16)(14, "summary");
    \u0275\u0275text(15, "My work");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 17)(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 18);
    \u0275\u0275element(20, "i");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(22, HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_22_Template, 8, 1, "label");
    \u0275\u0275elementStart(23, "button", 11);
    \u0275\u0275listener("click", function HistoryLivePageComponent_Conditional_1_Conditional_2_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.exportWork());
    });
    \u0275\u0275text(24, "Export work");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "nav", 19)(26, "div", 20);
    \u0275\u0275element(27, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 21);
    \u0275\u0275repeaterCreate(29, HistoryLivePageComponent_Conditional_1_Conditional_2_For_30_Template, 1, 1, null, null, _forTrack09);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(31, HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_31_Template, 2, 1);
    \u0275\u0275elementStart(32, "app-task-guide", 22)(33, "p");
    \u0275\u0275text(34, " Follow a lead. Check its claims against sources. Show your audience what the evidence supports. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p");
    \u0275\u0275text(36, " Ask an answerable question. Separate facts from interpretations, name uncertainty, and consider the other network's strongest challenge. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p");
    \u0275\u0275text(38, " A document's publication date alone does not prove your reporter could access it. Check the reporting date, place, and available sources. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "dl");
    \u0275\u0275repeaterCreate(40, HistoryLivePageComponent_Conditional_1_Conditional_2_For_41_Template, 4, 2, null, null, _forTrack09);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(42, HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_42_Template, 2, 0, "p");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(43, HistoryLivePageComponent_Conditional_1_Conditional_2_Conditional_43_Template, 5, 3, "div", 23);
    \u0275\u0275elementStart(44, "div", 24);
    \u0275\u0275element(45, "app-history-live-research-panel", 25);
    \u0275\u0275elementStart(46, "main", 26);
    \u0275\u0275conditionalCreate(47, HistoryLivePageComponent_Conditional_1_Conditional_2_Case_47_Template, 12, 0, "section", 27)(48, HistoryLivePageComponent_Conditional_1_Conditional_2_Case_48_Template, 1, 0, "app-history-live-assignment-desk")(49, HistoryLivePageComponent_Conditional_1_Conditional_2_Case_49_Template, 1, 0, "app-history-live-assignment-desk")(50, HistoryLivePageComponent_Conditional_1_Conditional_2_Case_50_Template, 1, 0, "app-history-live-source-wall")(51, HistoryLivePageComponent_Conditional_1_Conditional_2_Case_51_Template, 1, 0, "app-history-live-script-desk")(52, HistoryLivePageComponent_Conditional_1_Conditional_2_Case_52_Template, 1, 0, "app-history-live-production-studio")(53, HistoryLivePageComponent_Conditional_1_Conditional_2_Case_53_Template, 1, 0, "app-history-live-broadcast-player")(54, HistoryLivePageComponent_Conditional_1_Conditional_2_Case_54_Template, 1, 0, "app-history-live-producer-console")(55, HistoryLivePageComponent_Conditional_1_Conditional_2_Case_55_Template, 1, 0, "app-history-live-broadcast-player");
    \u0275\u0275elementEnd();
    \u0275\u0275element(56, "app-history-live-research-panel", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_10_0;
    let tmp_16_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.event);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_3_0 = ctx_r1.runtime.selectedNetwork()) ? 11 : 12, tmp_3_0);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.runtime.viewer.classLabel);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.saveState() === "saved" ? ctx_r1.runtime.isDemo ? "Saved on this device" : "Saved" : ctx_r1.runtime.saveState());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.isDemo ? 22 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate1("", ctx_r1.runtime.completion(), " of 8 newsroom checks complete"));
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r1.runtime.completion() * 12.5, "%");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.stages);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_10_0 = ctx_r1.assignmentDesk()) ? 31 : -1, tmp_10_0);
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.runtime.config.rubric || \u0275\u0275pureFunction0(16, _c03));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.runtime.isDemo ? 42 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.notification() || ctx_r1.runtime.error() ? 43 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("has-research", ctx_r1.runtime.state().stage !== "side" && ctx_r1.runtime.state().stage !== "assignment");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-busy", ctx_r1.runtime.busy());
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_16_0 = ctx_r1.runtime.state().stage) === "side" ? 47 : tmp_16_0 === "assignment" ? 48 : tmp_16_0 === "pitch" ? 49 : tmp_16_0 === "sources" ? 50 : tmp_16_0 === "script" ? 51 : tmp_16_0 === "production" ? 52 : tmp_16_0 === "broadcast" ? 53 : tmp_16_0 === "schedule" ? 54 : tmp_16_0 === "showcase" ? 55 : -1);
  }
}
function HistoryLivePageComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275listener("focusout", function HistoryLivePageComponent_Conditional_1_Template_div_focusout_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.flushDrafts());
    });
    \u0275\u0275conditionalCreate(1, HistoryLivePageComponent_Conditional_1_Conditional_1_Template, 23, 3, "main", 3)(2, HistoryLivePageComponent_Conditional_1_Conditional_2_Template, 57, 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("is-opening", ctx_r1.runtime.state().stage === "opening");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.state().stage === "opening" ? 1 : 2);
  }
}
var HistoryLivePageComponent = class _HistoryLivePageComponent {
  runtime = inject(HistoryLiveRuntimeService);
  stages = HISTORY_LIVE_STAGES;
  assignmentDesk = viewChild(
    AssignmentDeskComponent,
    ...ngDevMode ? [{ debugName: "assignmentDesk" }] : (
      /* istanbul ignore next */
      []
    )
  );
  element = inject(ElementRef);
  priorStage;
  constructor() {
    if (this.runtime.config.fieldStudio)
      return;
    bindLessonFocus((lesson) => {
      const target = lesson.focusTarget;
      if (target === "side" || target === "pitch" || target === "sources" || target === "script" || target === "production" || target === "broadcast")
        this.runtime.goTo(target);
    });
    if (this.runtime.state().stage === "opening")
      this.runtime.goTo("side");
    afterRenderEffect(() => {
      const stage = this.runtime.state().stage;
      if (stage === this.priorStage)
        return;
      const first = this.priorStage === void 0;
      this.priorStage = stage;
      if (first)
        return;
      const heading = this.element.nativeElement.querySelector("main h1");
      if (heading) {
        heading.tabIndex = -1;
        heading.scrollIntoView({ block: "nearest", behavior: "instant" });
        heading.focus({ preventScroll: true });
      }
    });
  }
  chooseRole(event) {
    this.runtime.setRole(event.target.value);
  }
  chooseSide(side) {
    this.runtime.chooseSide(side);
  }
  static \u0275fac = function HistoryLivePageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HistoryLivePageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HistoryLivePageComponent, selectors: [["app-history-live-page"]], viewQuery: function HistoryLivePageComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.assignmentDesk, AssignmentDeskComponent, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, features: [\u0275\u0275ProvidersFeature([ResearchShelfState])], decls: 2, vars: 1, consts: [["beatsMenu", ""], [1, "history-live", 3, "is-opening"], [1, "history-live", 3, "focusout"], ["aria-labelledby", "history-live-title", 1, "opening"], ["aria-hidden", "true", 1, "opening-grain"], [1, "opening-copy"], [1, "kicker"], [1, "title-lockup"], ["id", "history-live-title"], [1, "opening-question"], [1, "opening-actions"], ["type", "button", 3, "click"], ["aria-hidden", "true"], [1, "newsroom-header"], ["routerLink", "/projects", "aria-label", "Back to project library", 1, "brand"], [1, "assignment-chip"], [1, "header-meta"], [1, "meta-menu-content"], [1, "save-state"], ["aria-label", "News package progress", 1, "story-progress"], [1, "progress-meter", 3, "aria-label"], [1, "progress-scroll"], ["title", "Reporting guide"], ["role", "status", 1, "notice", 3, "error"], [1, "work-layout"], ["side", "left", 1, "research-rail", "left-rail"], [1, "newsroom-main"], ["aria-labelledby", "choose-network-title", 1, "side-choice"], ["side", "right", 1, "research-rail", "right-rail"], [1, "sr-only"], [3, "change", "value"], ["value", "student"], ["value", "producer"], ["type", "button", 3, "active", "available", "title"], ["type", "button", 3, "click", "title"], [1, "desk-menu"], ["type", "button"], ["aria-label", "Pitch tasks", 1, "pitch-task-nav"], ["role", "status", 1, "notice"], ["type", "button", "aria-label", "Dismiss message", 3, "click"], [1, "station-heading"], ["id", "choose-network-title"], [1, "network-stage"], [3, "class"], [1, "network-art", 3, "src", "alt"], [1, "network-eyebrow"]], template: function HistoryLivePageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, HistoryLivePageComponent_Conditional_0_Template, 1, 0, "app-field-newsroom")(1, HistoryLivePageComponent_Conditional_1_Template, 3, 3, "div", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.runtime.config.fieldStudio ? 0 : 1);
    }
  }, dependencies: [
    FieldNewsroomComponent,
    WorkspaceToolsComponent,
    TaskGuideComponent,
    RouterLink,
    AssignmentDeskComponent,
    SourceWallComponent,
    ResearchPanelComponent,
    ScriptDeskComponent,
    ProductionStudioComponent,
    BroadcastPlayerComponent,
    ProducerConsoleComponent
  ], styles: [`@charset "UTF-8";


[_nghost-%COMP%] {
  display: block;
  min-height: 100dvh;
  color: #e8eef4;
  background: #09121a;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  --%NS%ink: #09121a;
  --%NS%panel: #111d27;
  --%NS%panel-2: #162632;
  --%NS%line: #2a3a46;
  --%NS%muted: #91a0aa;
  --%NS%paper: #edf1ef;
  --%NS%brass: #c7a468;
  --%NS%patriot: #769fc2;
  --%NS%crown: #c87569;
}
[_nghost-%COMP%], 
[_nghost-%COMP%]   *[_ngcontent-%COMP%] {
  box-sizing: border-box;
}
button[_ngcontent-%COMP%], 
select[_ngcontent-%COMP%], 
input[_ngcontent-%COMP%], 
textarea[_ngcontent-%COMP%] {
  font: inherit;
}
button[_ngcontent-%COMP%], 
a[_ngcontent-%COMP%] {
  -webkit-tap-highlight-color: transparent;
}
button[_ngcontent-%COMP%]:focus-visible, 
a[_ngcontent-%COMP%]:focus-visible, 
select[_ngcontent-%COMP%]:focus-visible, 
input[_ngcontent-%COMP%]:focus-visible, 
textarea[_ngcontent-%COMP%]:focus-visible {
  outline: 3px solid #dfbd7d;
  outline-offset: 3px;
}
.history-live[_ngcontent-%COMP%] {
  min-height: 100dvh;
  background:
    radial-gradient(
      circle at 75% 0,
      #183243 0,
      transparent 24rem),
    #0b151e;
}
.work-layout[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
}
.research-rail[_ngcontent-%COMP%] {
  display: none;
}
.work-layout.has-research[_ngcontent-%COMP%] {
  grid-template-columns: minmax(210px, 250px) minmax(0, 1fr) minmax(210px, 250px);
  gap: 16px;
  padding: 16px;
}
.has-research[_ngcontent-%COMP%]   .research-rail[_ngcontent-%COMP%] {
  display: block;
  position: sticky;
  top: 16px;
  max-height: calc(100dvh - 210px);
  overflow-y: auto;
  scrollbar-gutter: stable;
  overscroll-behavior: contain;
}
.work-layout[_ngcontent-%COMP%]    > .newsroom-main[_ngcontent-%COMP%] {
  min-width: 0;
  width: 100%;
}
.has-research[_ngcontent-%COMP%]    > .newsroom-main[_ngcontent-%COMP%] {
  padding: 0;
}
@media (max-width: 1150px) {
  .work-layout.has-research[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding: 12px;
  }
  .has-research[_ngcontent-%COMP%]   .research-rail[_ngcontent-%COMP%] {
    top: 64px;
    max-height: 36dvh;
    z-index: 3;
  }
  .left-rail[_ngcontent-%COMP%] {
    grid-column: 1;
    grid-row: 1;
  }
  .right-rail[_ngcontent-%COMP%] {
    grid-column: 2;
    grid-row: 1;
  }
  .has-research[_ngcontent-%COMP%]    > .newsroom-main[_ngcontent-%COMP%] {
    grid-column: 1/-1;
    grid-row: 2;
  }
}
.opening[_ngcontent-%COMP%] {
  position: relative;
  display: grid;
  grid-template: auto 1fr auto/minmax(1rem, 1fr) minmax(0, 69rem) minmax(1rem, 1fr);
  min-height: 100dvh;
  overflow: hidden;
  isolation: isolate;
  background:
    linear-gradient(
      90deg,
      rgba(4, 9, 14, 0.96) 0,
      rgba(4, 9, 14, 0.84) 37%,
      rgba(4, 9, 14, 0.24) 70%,
      rgba(4, 9, 14, 0.64) 100%),
    linear-gradient(
      0deg,
      #050a0f 0,
      transparent 25%),
    url(/history-live/broadcast-studio.webp) 68% 50%/cover no-repeat;
}
.opening[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  background:
    radial-gradient(
      circle at 72% 45%,
      rgba(105, 144, 178, 0.2),
      transparent 32%),
    linear-gradient(
      120deg,
      transparent 55%,
      rgba(179, 68, 60, 0.13));
}
.opening-grain[_ngcontent-%COMP%] {
  position: absolute;
  z-index: -1;
  inset: 0;
  opacity: 0.25;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E");
}
.opening-bar[_ngcontent-%COMP%] {
  grid-column: 1/-1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid rgba(202, 217, 226, 0.2);
  padding: 0.9rem clamp(1rem, 3vw, 3rem);
  color: #9cadb7;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}
.opening-bar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  color: #d4b878;
  text-decoration: none;
}
.opening-copy[_ngcontent-%COMP%] {
  grid-column: 2;
  align-self: center;
  width: min(43rem, 64vw);
  padding: 4rem 0 8rem;
}
.kicker[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin: 0 0 1.5rem;
  color: #c6ad79;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.kicker[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  width: 2.2rem;
  height: 2px;
  background: #c6ad79;
}
.title-lockup[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: clamp(0.6rem, 1.4vw, 1.2rem);
  line-height: 0.8;
}
.title-lockup[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {
  color: #edf3f7;
  font-family: Georgia, serif;
  font-size: clamp(3.5rem, 9vw, 8rem);
  letter-spacing: -0.06em;
}
.title-lockup[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  padding: 0.16em 0.2em 0.13em;
  color: #fff;
  background: #ad382f;
  box-shadow: 0 0 3rem rgba(179, 61, 50, 0.28);
  font-size: clamp(3.1rem, 8vw, 7rem);
  font-style: italic;
  font-weight: 950;
  letter-spacing: -0.08em;
  transform: skew(-5deg);
}
.opening[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  margin: 1rem 0 1.5rem;
  color: #d8e2e8;
  font-size: clamp(1rem, 2.2vw, 1.7rem);
  letter-spacing: 0.31em;
  text-transform: uppercase;
}
.opening-question[_ngcontent-%COMP%] {
  max-width: 40rem;
  margin: 0;
  color: #b5c2c9;
  font-family: Georgia, serif;
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  line-height: 1.55;
}
.opening-actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 2rem;
}
.opening-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  display: flex;
  min-height: 3.5rem;
  align-items: center;
  gap: 2rem;
  border: 0;
  padding: 0 1.2rem 0 1.4rem;
  color: #111920;
  background: #e0c17e;
  box-shadow: 0 0.7rem 2rem rgba(0, 0, 0, 0.3);
  font-weight: 900;
  cursor: pointer;
}
.opening-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {
  font-size: 1.3rem;
}
.opening-actions[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #93a6b0;
  font-size: 0.8rem;
}
.opening-actions[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #d14d43;
  box-shadow: 0 0 0.8rem #d14d43;
}
.opening-rundown[_ngcontent-%COMP%] {
  position: absolute;
  right: clamp(1rem, 3vw, 3rem);
  bottom: 8rem;
  display: grid;
  grid-template-columns: auto auto;
  gap: 0.65rem 1rem;
  border-left: 1px solid rgba(221, 191, 127, 0.55);
  padding: 0.8rem 1.2rem;
  background: rgba(5, 12, 18, 0.55);
  -webkit-backdrop-filter: blur(9px);
  backdrop-filter: blur(9px);
}
.opening-rundown[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: #c8a965;
  font-family: Georgia, serif;
  font-size: 0.8rem;
}
.opening-rundown[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  color: #b7c5cc;
  font-size: 0.8rem;
}
.opening-ticker[_ngcontent-%COMP%] {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  min-height: 3.4rem;
  align-items: center;
  overflow: hidden;
  background: #e5e9e7;
  color: #1a2c37;
}
.opening-ticker[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: 0 1.5rem 0 3rem;
  color: white;
  background: #a43630;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
}
.opening-ticker[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {
  display: flex;
  gap: 4rem;
  padding-left: 2rem;
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: 750;
}
.opening-ticker[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]::before {
  content: "\\25c6";
  margin-right: 0.8rem;
  color: #b28d4e;
  font-size: 0.8rem;
}
.newsroom-header[_ngcontent-%COMP%] {
  position: sticky;
  z-index: 30;
  top: 0;
  display: grid;
  grid-template-columns: minmax(13rem, 1fr) auto minmax(18rem, 1fr);
  align-items: center;
  min-height: 4.8rem;
  border-bottom: 1px solid #283946;
  padding: 0.6rem clamp(1rem, 3vw, 2.5rem);
  background: rgba(7, 15, 22, 0.95);
  box-shadow: 0 0.3rem 1.5rem rgba(0, 0, 0, 0.26);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
}
.brand[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #eef4f6;
  text-decoration: none;
}
.brand[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {
  display: grid;
  width: 2.8rem;
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid #c6a867;
  color: #d9bc7d;
  background:
    linear-gradient(
      145deg,
      #1b2b37,
      #0b151e);
  font: 900 0.9rem Georgia, serif;
  transform: rotate(45deg);
}
.brand[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]::first-line {
  transform: rotate(-45deg);
}
.brand[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {
  display: grid;
  gap: 0.12rem;
}
.brand[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  font-family: Georgia, serif;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
}
.brand[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {
  color: #7f929d;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}
.assignment-chip[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  border: 1px solid #2c3c47;
  padding: 0.48rem 0.9rem;
  background: #101d26;
}
.assignment-chip[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  width: 0.48rem;
  height: 0.48rem;
  border-radius: 50%;
  background: #687984;
  box-shadow: 0 0 0.5rem #687984;
}
.assignment-chip[_ngcontent-%COMP%]   i.patriot[_ngcontent-%COMP%] {
  background: var(--%NS%patriot);
  box-shadow: 0 0 0.6rem var(--%NS%patriot);
}
.assignment-chip[_ngcontent-%COMP%]   i.british[_ngcontent-%COMP%] {
  background: var(--%NS%crown);
  box-shadow: 0 0 0.6rem var(--%NS%crown);
}
.assignment-chip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: #d8e1e5;
  font-size: 0.8rem;
  font-weight: 800;
}
.assignment-chip[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {
  display: block;
  margin-bottom: 0.12rem;
  color: #728590;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
}
.header-meta[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  color: #7f929d;
  font-size: 0.8rem;
}
.save-state[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.38rem;
  text-transform: capitalize;
}
.save-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #64aa80;
}
.header-meta[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  border: 1px solid #344651;
  border-radius: 2rem;
  padding: 0.45rem 2rem 0.45rem 0.7rem;
  color: #dce4e8;
  background: #14232d;
  font-size: 0.8rem;
}
.story-progress[_ngcontent-%COMP%] {
  position: sticky;
  z-index: 25;
  top: 4.8rem;
  border-bottom: 1px solid #243541;
  background: #0d1922;
}
.progress-meter[_ngcontent-%COMP%] {
  height: 2px;
  background: #25343f;
}
.progress-meter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  display: block;
  height: 100%;
  background:
    linear-gradient(
      90deg,
      #688eae,
      #d0ae6a);
  transition: width 0.3s ease;
}
.progress-scroll[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding: 0 1rem;
}
.progress-scroll[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  display: flex;
  min-width: 5.5rem;
  align-items: center;
  justify-content: center;
  gap: 0.38rem;
  border: 0;
  border-bottom: 2px solid transparent;
  padding: 0.7rem 0.6rem;
  color: #536773;
  background: transparent;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  cursor: not-allowed;
}
.progress-scroll[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: #465a65;
  font-family: Georgia, serif;
  font-size: 0.8rem;
}
.progress-scroll[_ngcontent-%COMP%]   button.available[_ngcontent-%COMP%] {
  color: #95a9b3;
  cursor: pointer;
}
.progress-scroll[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {
  border-color: #cbae72;
  color: #f0e0b9;
  background:
    linear-gradient(
      0deg,
      rgba(193, 157, 88, 0.12),
      transparent);
}
.notice[_ngcontent-%COMP%] {
  position: fixed;
  z-index: 50;
  top: 8.8rem;
  right: 1.2rem;
  display: flex;
  max-width: min(28rem, 100vw - 2rem);
  align-items: center;
  gap: 1rem;
  border: 1px solid #466a58;
  padding: 0.8rem 1rem;
  color: #dff2e6;
  background: rgba(20, 50, 38, 0.96);
  box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.3);
  font-size: 0.8rem;
}
.notice.error[_ngcontent-%COMP%] {
  border-color: #8b4e47;
  color: #ffe7e4;
  background: rgba(75, 30, 28, 0.97);
}
.notice[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  border: 0;
  color: inherit;
  background: transparent;
  font-size: 1.3rem;
  cursor: pointer;
}
.newsroom-main[_ngcontent-%COMP%] {
  width: min(94rem, 100%);
  min-height: calc(100dvh - 8rem);
  margin: 0 auto;
}
.station-heading[_ngcontent-%COMP%] {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  padding: 2.6rem clamp(1rem, 4vw, 4rem) 1.7rem;
}
.station-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: #c1a56b;
  font-size: 0.8rem;
  font-weight: 850;
  letter-spacing: 0.15em;
}
.station-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  margin: 0.35rem 0 0;
  color: #f0f2ef;
  font: 400 clamp(2.1rem, 4vw, 3.5rem)/1 Georgia, serif;
}
.station-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  max-width: 28rem;
  margin: 0;
  color: #8da0aa;
  font: italic 1rem/1.55 Georgia, serif;
}
.network-stage[_ngcontent-%COMP%] {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  padding: 0 clamp(1rem, 4vw, 4rem);
}
.network-card[_ngcontent-%COMP%] {
  position: relative;
  display: grid;
  min-height: 34rem;
  align-content: end;
  overflow: hidden;
  border: 1px solid #355066;
  padding: 2rem;
  isolation: isolate;
  background: #0c1821;
  box-shadow: inset 0 -14rem 9rem -5rem rgba(3, 11, 17, 0.98);
}
.network-card.british[_ngcontent-%COMP%] {
  border-color: #61413e;
  background: #171012;
  box-shadow: inset 0 -14rem 9rem -5rem rgba(13, 7, 9, 0.98);
}
.network-art[_ngcontent-%COMP%] {
  position: absolute;
  z-index: -2;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.network-card[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  background:
    linear-gradient(
      0deg,
      rgba(4, 13, 19, 0.95),
      rgba(4, 13, 19, 0.04) 70%),
    linear-gradient(
      90deg,
      rgba(21, 61, 89, 0.18),
      transparent 48%);
}
.network-card.british[_ngcontent-%COMP%]::before {
  background:
    linear-gradient(
      0deg,
      rgba(17, 8, 10, 0.96),
      rgba(17, 8, 10, 0.03) 70%),
    linear-gradient(
      90deg,
      rgba(95, 31, 28, 0.18),
      transparent 48%);
}
.network-eyebrow[_ngcontent-%COMP%] {
  color: #7fa8c7;
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.british[_ngcontent-%COMP%]   .network-eyebrow[_ngcontent-%COMP%] {
  color: #cd8075;
}
.network-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0.5rem 0 0.7rem;
  color: #eef4f7;
  font: 400 clamp(1.8rem, 3vw, 2.7rem)/1 Georgia, serif;
}
.network-card[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {
  max-width: 35rem;
  margin: 0;
  color: #a6b8c2;
  font-size: 0.86rem;
  line-height: 1.55;
}
.network-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 1rem 0 1.4rem;
  padding: 0;
  list-style: none;
}
.network-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
  border: 1px solid #3b5263;
  border-radius: 2rem;
  padding: 0.3rem 0.6rem;
  color: #99afbd;
  font-size: 0.8rem;
}
.network-card.british[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
  border-color: #5b4140;
  color: #bfa09c;
}
.network-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  justify-self: start;
  min-height: 3rem;
  border: 0;
  padding: 0 1.2rem;
  color: #08131c;
  background: #91bad7;
  font-weight: 900;
  cursor: pointer;
}
.network-card.british[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  color: #1d0f0e;
  background: #d58c80;
}
.network-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  margin-left: 1.5rem;
}
.accuracy-rule[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  margin: 1rem clamp(1rem, 4vw, 4rem) 3rem;
  border: 1px solid #283c47;
  padding: 1rem;
  color: #8297a2;
  background: #0d1922;
}
.accuracy-rule[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #c7a96e;
  font-size: 0.8rem;
  letter-spacing: 0.14em;
}
.accuracy-rule[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  color: #b7c4ca;
  font: italic 0.9rem Georgia, serif;
}
.accuracy-rule[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 0.8rem;
}
.accuracy-rule[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]::before {
  content: "\\2713";
  margin-right: 0.4rem;
  color: #75a887;
}
@media (max-width: 850px) {
  .opening-copy[_ngcontent-%COMP%] {
    grid-column: 2/3;
    width: auto;
    padding-inline: 1rem;
  }
  .opening-rundown[_ngcontent-%COMP%] {
    display: none;
  }
  .newsroom-header[_ngcontent-%COMP%] {
    grid-template-columns: 1fr auto;
  }
  .assignment-chip[_ngcontent-%COMP%] {
    display: none;
  }
  .header-meta[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {
    display: none;
  }
  .station-heading[_ngcontent-%COMP%] {
    align-items: flex-start;
    flex-direction: column;
  }
  .network-stage[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 560px) {
  .opening[_ngcontent-%COMP%] {
    background-position: 62% center;
  }
  .opening-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
    display: none;
  }
  .opening-copy[_ngcontent-%COMP%] {
    padding-bottom: 7rem;
  }
  .title-lockup[_ngcontent-%COMP%] {
    align-items: flex-start;
    flex-direction: column;
    line-height: 0.85;
  }
  .opening-actions[_ngcontent-%COMP%] {
    align-items: flex-start;
    flex-direction: column;
  }
  .opening-ticker[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {
    animation: none;
  }
  .brand[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {
    display: none;
  }
  .header-meta[_ngcontent-%COMP%] {
    gap: 0.5rem;
  }
  .progress-scroll[_ngcontent-%COMP%] {
    justify-content: flex-start;
  }
  .progress-scroll[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    min-width: 4.2rem;
    padding-inline: 0.3rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  *[_ngcontent-%COMP%], 
   *[_ngcontent-%COMP%]::before, 
   *[_ngcontent-%COMP%]::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
button[_ngcontent-%COMP%], 
select[_ngcontent-%COMP%], 
input[_ngcontent-%COMP%] {
  min-height: 2.75rem;
}
textarea[_ngcontent-%COMP%] {
  font: inherit;
  line-height: 1.5;
}
button[aria-disabled=true][_ngcontent-%COMP%] {
  opacity: 0.65;
}
.learning-rubric[_ngcontent-%COMP%] {
  margin: 0;
  padding: 0.8rem 1rem;
  color: #f1e4c2;
  background: #192c38;
  font-size: 1rem;
}
.learning-rubric[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {
  margin: 0.3rem 0 1rem;
}
.header-meta[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  color: #fff;
  background: #233946;
  border: 1px solid #8096a3;
}
.newsroom-header[_ngcontent-%COMP%] {
  height: auto;
  min-height: 5rem;
}
.header-meta[_ngcontent-%COMP%] {
  flex-wrap: wrap;
}
.notice[_ngcontent-%COMP%] {
  position: sticky;
  top: 0;
  z-index: 20;
}
h1[_ngcontent-%COMP%]:focus {
  outline: 2px solid #d4b477;
  outline-offset: 4px;
}
h1[_ngcontent-%COMP%] {
  scroll-margin-top: 10rem;
}
.newsroom-header[_ngcontent-%COMP%], 
.progress-rail[_ngcontent-%COMP%], 
.stage-nav[_ngcontent-%COMP%], 
.notice[_ngcontent-%COMP%] {
  position: static;
}
.side-selection[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], 
.network-selection[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  font-size: clamp(26px, 3vw, 40px);
}
.network-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  max-height: 180px;
  object-fit: cover;
}
main[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  scroll-margin-top: 16px;
}
.station-heading[_ngcontent-%COMP%] {
  padding: 16px 24px;
  gap: 16px;
}
.station-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  font-size: clamp(26px, 2.5vw, 36px);
}
.network-card[_ngcontent-%COMP%] {
  min-height: 350px;
  padding: 20px;
}
.network-card[_ngcontent-%COMP%]   img.network-art[_ngcontent-%COMP%] {
  max-height: none;
}
.progress-bar[_ngcontent-%COMP%] {
  position: static;
}
.story-progress[_ngcontent-%COMP%] {
  position: static;
}
.newsroom-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 10px 22px;
}
.newsroom-header[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%] {
  margin-right: auto;
}
.newsroom-header[_ngcontent-%COMP%]   .story-progress[_ngcontent-%COMP%] {
  padding: 0;
  border: 0;
  background: none;
  order: 3;
  flex: 1 0 100%;
}
.story-progress[_ngcontent-%COMP%]   .progress-meter[_ngcontent-%COMP%] {
  display: none;
}
.story-progress[_ngcontent-%COMP%]   .progress-scroll[_ngcontent-%COMP%] {
  justify-content: center;
}
.story-progress[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  min-height: 44px;
}
.newsroom-main[_ngcontent-%COMP%] {
  padding-top: 24px;
}
.station-heading[_ngcontent-%COMP%] {
  text-align: center;
  justify-content: center;
}
.station-heading[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {
  display: none;
}
.station-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  font-size: 30px;
}
.network-stage[_ngcontent-%COMP%] {
  max-width: 1000px;
  margin: 20px auto;
}
.network-card[_ngcontent-%COMP%] {
  min-height: 0;
  padding-bottom: 24px;
}
.network-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  max-width: 340px;
  margin-left: auto;
  margin-right: auto;
}
.network-eyebrow[_ngcontent-%COMP%] {
  font-size: 11px;
}
.network-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {
  display: none;
}
.assignment-chip[_ngcontent-%COMP%] {
  display: none;
}
.network-stage[_ngcontent-%COMP%]   .network-card[_ngcontent-%COMP%] {
  padding: 0 20px 20px;
  align-content: start;
  gap: 12px;
  box-shadow: none;
}
.network-stage[_ngcontent-%COMP%]   .network-card[_ngcontent-%COMP%]::before {
  display: none;
}
.network-stage[_ngcontent-%COMP%]   .network-card[_ngcontent-%COMP%]   img.network-art[_ngcontent-%COMP%] {
  position: static;
  width: calc(100% + 40px);
  height: 180px;
  max-height: 180px;
  margin-left: -20px;
  z-index: auto;
}
.network-stage[_ngcontent-%COMP%]   .network-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 26px;
  line-height: 1.15;
  margin: 0;
}
.network-stage[_ngcontent-%COMP%]   .network-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 15px;
  color: #d4dfe6;
}
.network-stage[_ngcontent-%COMP%]   .network-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  align-self: end;
  justify-self: stretch;
  margin-top: 8px;
}
.pitch-task-nav[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.pitch-task-nav[_ngcontent-%COMP%]   [aria-current=step][_ngcontent-%COMP%] {
  background: #c5ac70;
  color: #172129;
}
.desk-menu[_ngcontent-%COMP%] {
  position: relative;
}
.desk-menu[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {
  padding: 12px;
  cursor: pointer;
}
.desk-menu[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {
  position: absolute;
  right: 0;
  z-index: 20;
  display: grid;
  padding: 12px;
  width: 240px;
  background: #182630;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5333333333);
}
.newsroom-header[_ngcontent-%COMP%]   .header-meta[_ngcontent-%COMP%] {
  display: block;
  position: relative;
  min-width: 0;
  padding: 0;
}
.header-meta[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {
  min-height: 44px;
  padding: 12px;
  border: 1px solid #647a83;
  cursor: pointer;
}
.header-meta[_ngcontent-%COMP%]   .meta-menu-content[_ngcontent-%COMP%] {
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 60;
  width: 260px;
  display: grid;
  padding: 16px;
  gap: 12px;
  background: #17242e;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5333333333);
}
@media (max-width: 620px) {
  .newsroom-header[_ngcontent-%COMP%] {
    gap: 8px;
    padding: 8px 12px;
  }
  .newsroom-header[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%] {
    min-width: 0;
  }
  .newsroom-header[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {
    width: 28px;
    height: 28px;
  }
  .newsroom-header[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {
    display: block;
  }
  .newsroom-header[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
    font-size: 13px;
  }
  .newsroom-header[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {
    display: none;
  }
  .newsroom-header[_ngcontent-%COMP%]   .progress-scroll[_ngcontent-%COMP%] {
    padding: 0;
  }
  .newsroom-main[_ngcontent-%COMP%] {
    padding-top: 0;
  }
}
/*# sourceMappingURL=history-live-page.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HistoryLivePageComponent, [{
    type: Component,
    args: [{ selector: "app-history-live-page", providers: [ResearchShelfState], imports: [
      FieldNewsroomComponent,
      WorkspaceToolsComponent,
      TaskGuideComponent,
      RouterLink,
      AssignmentDeskComponent,
      SourceWallComponent,
      ResearchPanelComponent,
      ScriptDeskComponent,
      ProductionStudioComponent,
      BroadcastPlayerComponent,
      ProducerConsoleComponent
    ], template: `@if (runtime.config.fieldStudio) {
  <app-field-newsroom />
} @else {
<div\r
  (focusout)="runtime.flushDrafts()"\r
  class="history-live"\r
  [class.is-opening]="runtime.state().stage === 'opening'"\r
>\r
  @if (runtime.state().stage === 'opening') {\r
    <main class="opening" aria-labelledby="history-live-title">\r
      <div class="opening-grain" aria-hidden="true"></div>\r
\r
      <section class="opening-copy">\r
        <p class="kicker"><span></span> A History Live Special Report</p>\r
        <div class="title-lockup">\r
          <span>HISTORY</span>\r
          <strong id="history-live-title">LIVE</strong>\r
        </div>\r
        <h1>{{ runtime.config.event }}</h1>\r
        <p class="opening-question">{{ runtime.config.drivingQuestion }}</p>\r
        <div class="opening-actions">\r
          <button type="button" (click)="runtime.goTo('side')">\r
            Enter the newsroom <b aria-hidden="true">\u2192</b>\r
          </button>\r
          <span><i></i> Special broadcast scheduled {{ runtime.config.broadcastDateLabel }}</span>\r
        </div>\r
      </section>\r
\r
\r
    </main>\r
  } @else {\r
    <app-workspace-tools><header class="newsroom-header">\r
      <a class="brand" routerLink="/projects" aria-label="Back to project library">\r
        <span>HL</span>\r
        <div>\r
          <strong>HISTORY LIVE</strong><small>{{ runtime.config.event }}</small>\r
        </div>\r
      </a>\r
      <div class="assignment-chip">\r
        @if (runtime.selectedNetwork(); as network) {\r
          <i [class]="network.side"></i>\r
          <span><small>REPORTING FOR</small>{{ network.name }}</span>\r
        } @else {\r
          <i></i><span><small>ASSIGNMENT</small>Unassigned</span>\r
        }\r
      </div>\r
      <details class="header-meta">\r
        <summary>My work</summary>\r
        <div class="meta-menu-content">\r
          <span>{{ runtime.viewer.classLabel }}</span>\r
          <span class="save-state"\r
            ><i></i\r
            >{{\r
              runtime.saveState() === 'saved'\r
                ? runtime.isDemo\r
                  ? 'Saved on this device'\r
                  : 'Saved'\r
                : runtime.saveState()\r
            }}</span\r
          >\r
          @if (runtime.isDemo) {\r
            <label>\r
              <span class="sr-only">Demo view as</span>\r
              <select [value]="runtime.state().role" (change)="chooseRole($event)">\r
                <option value="student">Demo reporter</option>\r
                <option value="producer">Demo producer</option>\r
              </select>\r
            </label>\r
          }\r
          <button type="button" (click)="runtime.exportWork()">Export work</button>\r
        </div>\r
      </details>\r
      <nav class="story-progress" aria-label="News package progress">\r
        <div\r
          class="progress-meter"\r
          aria-label="{{ runtime.completion() }} of 8 newsroom checks complete"\r
        >\r
          <span [style.width.%]="runtime.completion() * 12.5"></span>\r
        </div>\r
        <div class="progress-scroll">\r
          @for (stage of stages; track stage.id; let index = $index) {\r
            @if (\r
              stage.id !== 'opening' &&\r
              (runtime.canOpen(stage.id) || runtime.state().stage === stage.id)\r
            ) {\r
              <button\r
                type="button"\r
                [class.active]="runtime.state().stage === stage.id"\r
                [class.available]="runtime.canOpen(stage.id)"\r
                [attr.aria-disabled]="!runtime.canOpen(stage.id)"\r
                [attr.aria-current]="runtime.state().stage === stage.id ? 'step' : null"\r
                [title]="runtime.stageIssues(stage.id).join(' ')"\r
                (click)="runtime.goTo(stage.id)"\r
              >\r
                <span>{{ index.toString().padStart(2, '0') }}</span\r
                >{{ stage.shortLabel }}\r
              </button>\r
            }\r
          }\r
        </div>\r
      </nav>\r
      @if (assignmentDesk(); as desk) {\r
        @if (runtime.state().stage === 'assignment') {\r
          <details class="desk-menu" #beatsMenu>\r
            <summary>News beats</summary>\r
            <div>\r
              @for (beat of runtime.config.beats; track beat.id) {\r
                <button type="button" (click)="desk.openBeat(beat.id); beatsMenu.open = false">\r
                  {{ beat.label }}\r
                </button>\r
              }\r
            </div>\r
          </details>\r
          <button type="button" (click)="runtime.pitchOwnStory()">+ My own story</button>\r
        } @else {\r
          <nav class="pitch-task-nav" aria-label="Pitch tasks">\r
            @for (label of desk.pitchSteps; track label; let index = $index) {\r
              @if (index <= desk.pitchStep() + 1) {\r
                <button\r
                  type="button"\r
                  [attr.aria-current]="desk.pitchStep() === index ? 'step' : null"\r
                  (click)="desk.setPitchStep(index)"\r
                >\r
                  {{ index + 1 }} \xB7 {{ label }}\r
                </button>\r
              }\r
            }\r
          </nav>\r
          @if (desk.pitchStep() < desk.pitchSteps.length - 1) {\r
            <button type="button" (click)="desk.setPitchStep(desk.pitchStep() + 1)">Next \u2192</button>\r
          }\r
        }\r
      }\r
      <app-task-guide title="Reporting guide"\r
        ><p>\r
          Follow a lead. Check its claims against sources. Show your audience what the evidence\r
          supports.\r
        </p>\r
        <p>\r
          Ask an answerable question. Separate facts from interpretations, name uncertainty, and\r
          consider the other network's strongest challenge.\r
        </p>\r
        <p>\r
          A document's publication date alone does not prove your reporter could access it. Check\r
          the reporting date, place, and available sources.\r
        </p>\r
        <dl>\r
          @for (criterion of runtime.config.rubric || []; track criterion.id) {\r
            <dt>{{ criterion.label }}</dt>\r
            <dd>{{ criterion.expectation }}</dd>\r
          }\r
        </dl>\r
        @if (runtime.isDemo) {\r
          <p>Local practice: reviews are simulated and your work stays on this device.</p>\r
        }\r
      </app-task-guide>\r
    </header></app-workspace-tools>\r
\r
    @if (runtime.notification() || runtime.error()) {\r
      <div class="notice" [class.error]="runtime.error()" role="status">\r
        <span>{{ runtime.error() ?? runtime.notification() }}</span>\r
        <button type="button" (click)="runtime.clearNotice()" aria-label="Dismiss message">\r
          \xD7\r
        </button>\r
      </div>\r
    }\r
\r
    <div\r
      class="work-layout"\r
      [class.has-research]="\r
        runtime.state().stage !== 'side' && runtime.state().stage !== 'assignment'\r
      "\r
    >\r
      <app-history-live-research-panel class="research-rail left-rail" side="left" />\r
      <main class="newsroom-main" [attr.aria-busy]="runtime.busy()">\r
        @switch (runtime.state().stage) {\r
          @case ('side') {\r
            <section class="side-choice" aria-labelledby="choose-network-title">\r
              <header class="station-heading">\r
                <div>\r
                  <span>NEWSROOM CREDENTIALS \xB7 STEP 01</span>\r
                  <h1 id="choose-network-title">Choose your reporting network</h1>\r
                </div>\r
                <p>\r
                  Your network shapes your reporting lens. It never changes the standard for\r
                  evidence.\r
                </p>\r
              </header>\r
\r
              <div class="network-stage">\r
                @for (network of runtime.config.networks; track network.id) {\r
                  <article [class]="'network-card ' + network.side">\r
                    <img\r
                      class="network-art"\r
                      [src]="network.deskImageUrl"\r
                      [alt]="network.deskImageAlt"\r
                    />\r
                    <span class="network-eyebrow"\r
                      >{{ network.deskLabel }} \xB7 {{ network.deskLocationLabel }}</span\r
                    >\r
                    <h2>{{ network.name }}</h2>\r
                    <p>{{ network.perspective }}</p>\r
                    <button type="button" (click)="chooseSide(network.side)">\r
                      Join {{ network.shortName }} <span aria-hidden="true">\u2192</span>\r
                    </button>\r
                  </article>\r
                }\r
              </div>\r
            </section>\r
          }\r
          @case ('assignment') {\r
            <app-history-live-assignment-desk />\r
          }\r
          @case ('pitch') {\r
            <app-history-live-assignment-desk />\r
          }\r
          @case ('sources') {\r
            <app-history-live-source-wall />\r
          }\r
          @case ('script') {\r
            <app-history-live-script-desk />\r
          }\r
          @case ('production') {\r
            <app-history-live-production-studio />\r
          }\r
          @case ('broadcast') {\r
            <app-history-live-broadcast-player />\r
          }\r
          @case ('schedule') {\r
            <app-history-live-producer-console />\r
          }\r
          @case ('showcase') {\r
            <app-history-live-broadcast-player />\r
          }\r
        }\r
      </main>\r
      <app-history-live-research-panel class="research-rail right-rail" side="right" />\r
    </div>\r
  }\r
</div>\r

}
`, styles: [`@charset "UTF-8";

/* src/app/templates/history-live/ui/history-live-page.component.scss */
:host {
  display: block;
  min-height: 100dvh;
  color: #e8eef4;
  background: #09121a;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  --ink: #09121a;
  --panel: #111d27;
  --panel-2: #162632;
  --line: #2a3a46;
  --muted: #91a0aa;
  --paper: #edf1ef;
  --brass: #c7a468;
  --patriot: #769fc2;
  --crown: #c87569;
}
:host,
:host * {
  box-sizing: border-box;
}
button,
select,
input,
textarea {
  font: inherit;
}
button,
a {
  -webkit-tap-highlight-color: transparent;
}
button:focus-visible,
a:focus-visible,
select:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 3px solid #dfbd7d;
  outline-offset: 3px;
}
.history-live {
  min-height: 100dvh;
  background:
    radial-gradient(
      circle at 75% 0,
      #183243 0,
      transparent 24rem),
    #0b151e;
}
.work-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
}
.research-rail {
  display: none;
}
.work-layout.has-research {
  grid-template-columns: minmax(210px, 250px) minmax(0, 1fr) minmax(210px, 250px);
  gap: 16px;
  padding: 16px;
}
.has-research .research-rail {
  display: block;
  position: sticky;
  top: 16px;
  max-height: calc(100dvh - 210px);
  overflow-y: auto;
  scrollbar-gutter: stable;
  overscroll-behavior: contain;
}
.work-layout > .newsroom-main {
  min-width: 0;
  width: 100%;
}
.has-research > .newsroom-main {
  padding: 0;
}
@media (max-width: 1150px) {
  .work-layout.has-research {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding: 12px;
  }
  .has-research .research-rail {
    top: 64px;
    max-height: 36dvh;
    z-index: 3;
  }
  .left-rail {
    grid-column: 1;
    grid-row: 1;
  }
  .right-rail {
    grid-column: 2;
    grid-row: 1;
  }
  .has-research > .newsroom-main {
    grid-column: 1/-1;
    grid-row: 2;
  }
}
.opening {
  position: relative;
  display: grid;
  grid-template: auto 1fr auto/minmax(1rem, 1fr) minmax(0, 69rem) minmax(1rem, 1fr);
  min-height: 100dvh;
  overflow: hidden;
  isolation: isolate;
  background:
    linear-gradient(
      90deg,
      rgba(4, 9, 14, 0.96) 0,
      rgba(4, 9, 14, 0.84) 37%,
      rgba(4, 9, 14, 0.24) 70%,
      rgba(4, 9, 14, 0.64) 100%),
    linear-gradient(
      0deg,
      #050a0f 0,
      transparent 25%),
    url(/history-live/broadcast-studio.webp) 68% 50%/cover no-repeat;
}
.opening::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  background:
    radial-gradient(
      circle at 72% 45%,
      rgba(105, 144, 178, 0.2),
      transparent 32%),
    linear-gradient(
      120deg,
      transparent 55%,
      rgba(179, 68, 60, 0.13));
}
.opening-grain {
  position: absolute;
  z-index: -1;
  inset: 0;
  opacity: 0.25;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E");
}
.opening-bar {
  grid-column: 1/-1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid rgba(202, 217, 226, 0.2);
  padding: 0.9rem clamp(1rem, 3vw, 3rem);
  color: #9cadb7;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}
.opening-bar a {
  color: #d4b878;
  text-decoration: none;
}
.opening-copy {
  grid-column: 2;
  align-self: center;
  width: min(43rem, 64vw);
  padding: 4rem 0 8rem;
}
.kicker {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin: 0 0 1.5rem;
  color: #c6ad79;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.kicker span {
  width: 2.2rem;
  height: 2px;
  background: #c6ad79;
}
.title-lockup {
  display: flex;
  align-items: center;
  gap: clamp(0.6rem, 1.4vw, 1.2rem);
  line-height: 0.8;
}
.title-lockup > span {
  color: #edf3f7;
  font-family: Georgia, serif;
  font-size: clamp(3.5rem, 9vw, 8rem);
  letter-spacing: -0.06em;
}
.title-lockup strong {
  padding: 0.16em 0.2em 0.13em;
  color: #fff;
  background: #ad382f;
  box-shadow: 0 0 3rem rgba(179, 61, 50, 0.28);
  font-size: clamp(3.1rem, 8vw, 7rem);
  font-style: italic;
  font-weight: 950;
  letter-spacing: -0.08em;
  transform: skew(-5deg);
}
.opening h1 {
  margin: 1rem 0 1.5rem;
  color: #d8e2e8;
  font-size: clamp(1rem, 2.2vw, 1.7rem);
  letter-spacing: 0.31em;
  text-transform: uppercase;
}
.opening-question {
  max-width: 40rem;
  margin: 0;
  color: #b5c2c9;
  font-family: Georgia, serif;
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  line-height: 1.55;
}
.opening-actions {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 2rem;
}
.opening-actions button {
  display: flex;
  min-height: 3.5rem;
  align-items: center;
  gap: 2rem;
  border: 0;
  padding: 0 1.2rem 0 1.4rem;
  color: #111920;
  background: #e0c17e;
  box-shadow: 0 0.7rem 2rem rgba(0, 0, 0, 0.3);
  font-weight: 900;
  cursor: pointer;
}
.opening-actions button b {
  font-size: 1.3rem;
}
.opening-actions > span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #93a6b0;
  font-size: 0.8rem;
}
.opening-actions i {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #d14d43;
  box-shadow: 0 0 0.8rem #d14d43;
}
.opening-rundown {
  position: absolute;
  right: clamp(1rem, 3vw, 3rem);
  bottom: 8rem;
  display: grid;
  grid-template-columns: auto auto;
  gap: 0.65rem 1rem;
  border-left: 1px solid rgba(221, 191, 127, 0.55);
  padding: 0.8rem 1.2rem;
  background: rgba(5, 12, 18, 0.55);
  -webkit-backdrop-filter: blur(9px);
  backdrop-filter: blur(9px);
}
.opening-rundown span {
  color: #c8a965;
  font-family: Georgia, serif;
  font-size: 0.8rem;
}
.opening-rundown p {
  margin: 0;
  color: #b7c5cc;
  font-size: 0.8rem;
}
.opening-ticker {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  min-height: 3.4rem;
  align-items: center;
  overflow: hidden;
  background: #e5e9e7;
  color: #1a2c37;
}
.opening-ticker strong {
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: 0 1.5rem 0 3rem;
  color: white;
  background: #a43630;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
}
.opening-ticker div {
  display: flex;
  gap: 4rem;
  padding-left: 2rem;
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: 750;
}
.opening-ticker div span::before {
  content: "\\25c6";
  margin-right: 0.8rem;
  color: #b28d4e;
  font-size: 0.8rem;
}
.newsroom-header {
  position: sticky;
  z-index: 30;
  top: 0;
  display: grid;
  grid-template-columns: minmax(13rem, 1fr) auto minmax(18rem, 1fr);
  align-items: center;
  min-height: 4.8rem;
  border-bottom: 1px solid #283946;
  padding: 0.6rem clamp(1rem, 3vw, 2.5rem);
  background: rgba(7, 15, 22, 0.95);
  box-shadow: 0 0.3rem 1.5rem rgba(0, 0, 0, 0.26);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #eef4f6;
  text-decoration: none;
}
.brand > span {
  display: grid;
  width: 2.8rem;
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid #c6a867;
  color: #d9bc7d;
  background:
    linear-gradient(
      145deg,
      #1b2b37,
      #0b151e);
  font: 900 0.9rem Georgia, serif;
  transform: rotate(45deg);
}
.brand > span::first-line {
  transform: rotate(-45deg);
}
.brand div {
  display: grid;
  gap: 0.12rem;
}
.brand strong {
  font-family: Georgia, serif;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
}
.brand small {
  color: #7f929d;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}
.assignment-chip {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  border: 1px solid #2c3c47;
  padding: 0.48rem 0.9rem;
  background: #101d26;
}
.assignment-chip i {
  width: 0.48rem;
  height: 0.48rem;
  border-radius: 50%;
  background: #687984;
  box-shadow: 0 0 0.5rem #687984;
}
.assignment-chip i.patriot {
  background: var(--patriot);
  box-shadow: 0 0 0.6rem var(--patriot);
}
.assignment-chip i.british {
  background: var(--crown);
  box-shadow: 0 0 0.6rem var(--crown);
}
.assignment-chip span {
  color: #d8e1e5;
  font-size: 0.8rem;
  font-weight: 800;
}
.assignment-chip small {
  display: block;
  margin-bottom: 0.12rem;
  color: #728590;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
}
.header-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  color: #7f929d;
  font-size: 0.8rem;
}
.save-state {
  display: flex;
  align-items: center;
  gap: 0.38rem;
  text-transform: capitalize;
}
.save-state i {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #64aa80;
}
.header-meta select {
  border: 1px solid #344651;
  border-radius: 2rem;
  padding: 0.45rem 2rem 0.45rem 0.7rem;
  color: #dce4e8;
  background: #14232d;
  font-size: 0.8rem;
}
.story-progress {
  position: sticky;
  z-index: 25;
  top: 4.8rem;
  border-bottom: 1px solid #243541;
  background: #0d1922;
}
.progress-meter {
  height: 2px;
  background: #25343f;
}
.progress-meter span {
  display: block;
  height: 100%;
  background:
    linear-gradient(
      90deg,
      #688eae,
      #d0ae6a);
  transition: width 0.3s ease;
}
.progress-scroll {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding: 0 1rem;
}
.progress-scroll button {
  display: flex;
  min-width: 5.5rem;
  align-items: center;
  justify-content: center;
  gap: 0.38rem;
  border: 0;
  border-bottom: 2px solid transparent;
  padding: 0.7rem 0.6rem;
  color: #536773;
  background: transparent;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  cursor: not-allowed;
}
.progress-scroll button span {
  color: #465a65;
  font-family: Georgia, serif;
  font-size: 0.8rem;
}
.progress-scroll button.available {
  color: #95a9b3;
  cursor: pointer;
}
.progress-scroll button.active {
  border-color: #cbae72;
  color: #f0e0b9;
  background:
    linear-gradient(
      0deg,
      rgba(193, 157, 88, 0.12),
      transparent);
}
.notice {
  position: fixed;
  z-index: 50;
  top: 8.8rem;
  right: 1.2rem;
  display: flex;
  max-width: min(28rem, 100vw - 2rem);
  align-items: center;
  gap: 1rem;
  border: 1px solid #466a58;
  padding: 0.8rem 1rem;
  color: #dff2e6;
  background: rgba(20, 50, 38, 0.96);
  box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.3);
  font-size: 0.8rem;
}
.notice.error {
  border-color: #8b4e47;
  color: #ffe7e4;
  background: rgba(75, 30, 28, 0.97);
}
.notice button {
  border: 0;
  color: inherit;
  background: transparent;
  font-size: 1.3rem;
  cursor: pointer;
}
.newsroom-main {
  width: min(94rem, 100%);
  min-height: calc(100dvh - 8rem);
  margin: 0 auto;
}
.station-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  padding: 2.6rem clamp(1rem, 4vw, 4rem) 1.7rem;
}
.station-heading span {
  color: #c1a56b;
  font-size: 0.8rem;
  font-weight: 850;
  letter-spacing: 0.15em;
}
.station-heading h1 {
  margin: 0.35rem 0 0;
  color: #f0f2ef;
  font: 400 clamp(2.1rem, 4vw, 3.5rem)/1 Georgia, serif;
}
.station-heading p {
  max-width: 28rem;
  margin: 0;
  color: #8da0aa;
  font: italic 1rem/1.55 Georgia, serif;
}
.network-stage {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  padding: 0 clamp(1rem, 4vw, 4rem);
}
.network-card {
  position: relative;
  display: grid;
  min-height: 34rem;
  align-content: end;
  overflow: hidden;
  border: 1px solid #355066;
  padding: 2rem;
  isolation: isolate;
  background: #0c1821;
  box-shadow: inset 0 -14rem 9rem -5rem rgba(3, 11, 17, 0.98);
}
.network-card.british {
  border-color: #61413e;
  background: #171012;
  box-shadow: inset 0 -14rem 9rem -5rem rgba(13, 7, 9, 0.98);
}
.network-art {
  position: absolute;
  z-index: -2;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.network-card::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  background:
    linear-gradient(
      0deg,
      rgba(4, 13, 19, 0.95),
      rgba(4, 13, 19, 0.04) 70%),
    linear-gradient(
      90deg,
      rgba(21, 61, 89, 0.18),
      transparent 48%);
}
.network-card.british::before {
  background:
    linear-gradient(
      0deg,
      rgba(17, 8, 10, 0.96),
      rgba(17, 8, 10, 0.03) 70%),
    linear-gradient(
      90deg,
      rgba(95, 31, 28, 0.18),
      transparent 48%);
}
.network-eyebrow {
  color: #7fa8c7;
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.british .network-eyebrow {
  color: #cd8075;
}
.network-card h2 {
  margin: 0.5rem 0 0.7rem;
  color: #eef4f7;
  font: 400 clamp(1.8rem, 3vw, 2.7rem)/1 Georgia, serif;
}
.network-card > p {
  max-width: 35rem;
  margin: 0;
  color: #a6b8c2;
  font-size: 0.86rem;
  line-height: 1.55;
}
.network-card ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 1rem 0 1.4rem;
  padding: 0;
  list-style: none;
}
.network-card li {
  border: 1px solid #3b5263;
  border-radius: 2rem;
  padding: 0.3rem 0.6rem;
  color: #99afbd;
  font-size: 0.8rem;
}
.network-card.british li {
  border-color: #5b4140;
  color: #bfa09c;
}
.network-card button {
  justify-self: start;
  min-height: 3rem;
  border: 0;
  padding: 0 1.2rem;
  color: #08131c;
  background: #91bad7;
  font-weight: 900;
  cursor: pointer;
}
.network-card.british button {
  color: #1d0f0e;
  background: #d58c80;
}
.network-card button span {
  margin-left: 1.5rem;
}
.accuracy-rule {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  margin: 1rem clamp(1rem, 4vw, 4rem) 3rem;
  border: 1px solid #283c47;
  padding: 1rem;
  color: #8297a2;
  background: #0d1922;
}
.accuracy-rule strong {
  color: #c7a96e;
  font-size: 0.8rem;
  letter-spacing: 0.14em;
}
.accuracy-rule p {
  margin: 0;
  color: #b7c4ca;
  font: italic 0.9rem Georgia, serif;
}
.accuracy-rule span {
  font-size: 0.8rem;
}
.accuracy-rule span::before {
  content: "\\2713";
  margin-right: 0.4rem;
  color: #75a887;
}
@media (max-width: 850px) {
  .opening-copy {
    grid-column: 2/3;
    width: auto;
    padding-inline: 1rem;
  }
  .opening-rundown {
    display: none;
  }
  .newsroom-header {
    grid-template-columns: 1fr auto;
  }
  .assignment-chip {
    display: none;
  }
  .header-meta > span:first-child {
    display: none;
  }
  .station-heading {
    align-items: flex-start;
    flex-direction: column;
  }
  .network-stage {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 560px) {
  .opening {
    background-position: 62% center;
  }
  .opening-bar span {
    display: none;
  }
  .opening-copy {
    padding-bottom: 7rem;
  }
  .title-lockup {
    align-items: flex-start;
    flex-direction: column;
    line-height: 0.85;
  }
  .opening-actions {
    align-items: flex-start;
    flex-direction: column;
  }
  .opening-ticker div {
    animation: none;
  }
  .brand div {
    display: none;
  }
  .header-meta {
    gap: 0.5rem;
  }
  .progress-scroll {
    justify-content: flex-start;
  }
  .progress-scroll button {
    min-width: 4.2rem;
    padding-inline: 0.3rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
button,
select,
input {
  min-height: 2.75rem;
}
textarea {
  font: inherit;
  line-height: 1.5;
}
button[aria-disabled=true] {
  opacity: 0.65;
}
.learning-rubric {
  margin: 0;
  padding: 0.8rem 1rem;
  color: #f1e4c2;
  background: #192c38;
  font-size: 1rem;
}
.learning-rubric dd {
  margin: 0.3rem 0 1rem;
}
.header-meta button {
  color: #fff;
  background: #233946;
  border: 1px solid #8096a3;
}
.newsroom-header {
  height: auto;
  min-height: 5rem;
}
.header-meta {
  flex-wrap: wrap;
}
.notice {
  position: sticky;
  top: 0;
  z-index: 20;
}
h1:focus {
  outline: 2px solid #d4b477;
  outline-offset: 4px;
}
h1 {
  scroll-margin-top: 10rem;
}
.newsroom-header,
.progress-rail,
.stage-nav,
.notice {
  position: static;
}
.side-selection h1,
.network-selection h1 {
  font-size: clamp(26px, 3vw, 40px);
}
.network-card img {
  max-height: 180px;
  object-fit: cover;
}
main h1 {
  scroll-margin-top: 16px;
}
.station-heading {
  padding: 16px 24px;
  gap: 16px;
}
.station-heading h1 {
  font-size: clamp(26px, 2.5vw, 36px);
}
.network-card {
  min-height: 350px;
  padding: 20px;
}
.network-card img.network-art {
  max-height: none;
}
.progress-bar {
  position: static;
}
.story-progress {
  position: static;
}
.newsroom-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 10px 22px;
}
.newsroom-header .brand {
  margin-right: auto;
}
.newsroom-header .story-progress {
  padding: 0;
  border: 0;
  background: none;
  order: 3;
  flex: 1 0 100%;
}
.story-progress .progress-meter {
  display: none;
}
.story-progress .progress-scroll {
  justify-content: center;
}
.story-progress button {
  min-height: 44px;
}
.newsroom-main {
  padding-top: 24px;
}
.station-heading {
  text-align: center;
  justify-content: center;
}
.station-heading > p {
  display: none;
}
.station-heading h1 {
  font-size: 30px;
}
.network-stage {
  max-width: 1000px;
  margin: 20px auto;
}
.network-card {
  min-height: 0;
  padding-bottom: 24px;
}
.network-card p {
  max-width: 340px;
  margin-left: auto;
  margin-right: auto;
}
.network-eyebrow {
  font-size: 11px;
}
.network-card ul {
  display: none;
}
.assignment-chip {
  display: none;
}
.network-stage .network-card {
  padding: 0 20px 20px;
  align-content: start;
  gap: 12px;
  box-shadow: none;
}
.network-stage .network-card::before {
  display: none;
}
.network-stage .network-card img.network-art {
  position: static;
  width: calc(100% + 40px);
  height: 180px;
  max-height: 180px;
  margin-left: -20px;
  z-index: auto;
}
.network-stage .network-card h2 {
  font-size: 26px;
  line-height: 1.15;
  margin: 0;
}
.network-stage .network-card p {
  margin: 0;
  font-size: 15px;
  color: #d4dfe6;
}
.network-stage .network-card button {
  align-self: end;
  justify-self: stretch;
  margin-top: 8px;
}
.pitch-task-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.pitch-task-nav [aria-current=step] {
  background: #c5ac70;
  color: #172129;
}
.desk-menu {
  position: relative;
}
.desk-menu summary {
  padding: 12px;
  cursor: pointer;
}
.desk-menu > div {
  position: absolute;
  right: 0;
  z-index: 20;
  display: grid;
  padding: 12px;
  width: 240px;
  background: #182630;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5333333333);
}
.newsroom-header .header-meta {
  display: block;
  position: relative;
  min-width: 0;
  padding: 0;
}
.header-meta summary {
  min-height: 44px;
  padding: 12px;
  border: 1px solid #647a83;
  cursor: pointer;
}
.header-meta .meta-menu-content {
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 60;
  width: 260px;
  display: grid;
  padding: 16px;
  gap: 12px;
  background: #17242e;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5333333333);
}
@media (max-width: 620px) {
  .newsroom-header {
    gap: 8px;
    padding: 8px 12px;
  }
  .newsroom-header .brand {
    min-width: 0;
  }
  .newsroom-header .brand > span {
    width: 28px;
    height: 28px;
  }
  .newsroom-header .brand div {
    display: block;
  }
  .newsroom-header .brand strong {
    font-size: 13px;
  }
  .newsroom-header .brand small {
    display: none;
  }
  .newsroom-header .progress-scroll {
    padding: 0;
  }
  .newsroom-main {
    padding-top: 0;
  }
}
/*# sourceMappingURL=history-live-page.component.css.map */
`] }]
  }], () => [], { assignmentDesk: [{ type: ViewChild, args: [forwardRef(() => AssignmentDeskComponent), { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HistoryLivePageComponent, { className: "HistoryLivePageComponent", filePath: "src/app/templates/history-live/ui/history-live-page.component.ts", lineNumber: 37 });
})();
export {
  HistoryLivePageComponent
};
//# debugId=66c8becd-3dec-5d5f-b2b5-5ca5490e6d63
//# sourceMappingURL=chunk-BFUYFWMQ.js.map
