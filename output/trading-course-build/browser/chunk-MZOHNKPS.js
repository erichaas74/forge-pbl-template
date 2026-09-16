import {
  GalleryRuntime,
  buildGalleryAudit
} from "./chunk-LLPM2HDO.js";
import {
  AcademicLockComponent,
  EncounterComponent
} from "./chunk-TIQJIT5F.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel,
  RangeValueAccessor
} from "./chunk-UW6DFD2Z.js";
import "./chunk-JAVOWGH2.js";
import {
  cargoMass
} from "./chunk-AVOS3LLT.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  InjectionToken,
  Input,
  Output,
  ViewChild,
  computed,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/gallery/ui/gallery-audit.component.ts
var _forTrack0 = ($index, $item) => $item.title;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.paintingId;
var _forTrack3 = ($index, $item) => $item.encounterId;
function GalleryAuditComponent_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li")(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const step_r4 = ctx.$implicit;
    const \u0275$index_66_r5 = ctx.$index;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275classProp("complete", step_r4.complete);
    \u0275\u0275attribute("aria-current", ctx_r5.audit().currentStep === \u0275$index_66_r5 ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r4.complete ? "\u2713" : \u0275$index_66_r5 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r4.complete ? "Complete" : ctx_r5.audit().currentStep === \u0275$index_66_r5 ? "Current step" : "To do");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r4.detail);
  }
}
function GalleryAuditComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r5.audit().phase === "fraud" ? "Fraud detour: select the specific contradictory detail and its category. A wrong category can be corrected." : "Fraud identified. Complete the recovery lock to seal it and return to the paintings.");
  }
}
function GalleryAuditComponent_For_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const lock_r7 = ctx.$implicit;
    \u0275\u0275attribute("aria-current", lock_r7.current ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lock_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lock_r7.complete ? "\u2713 Complete" : lock_r7.current ? "Current mechanism" : "To do");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lock_r7.prompt);
  }
}
function GalleryAuditComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 13)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(3, "br");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const lock_r8 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Next: ", lock_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lock_r8.prompt);
  }
}
function GalleryAuditComponent_For_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(3, "br");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const e_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r9.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r9.text);
  }
}
function GalleryAuditComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 18);
    \u0275\u0275text(1, "No clues inspected yet. Open a painting and inspect a marked detail to begin the list.");
    \u0275\u0275domElementEnd();
  }
}
function GalleryAuditComponent_For_74_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(3, "br");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const detail_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(detail_r10.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(detail_r10.detail);
  }
}
function GalleryAuditComponent_For_74_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 27)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(3, "br");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const clue_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(clue_r11.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(clue_r11.explanation);
  }
}
function GalleryAuditComponent_For_74_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const recovery_r12 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Recovery: ", recovery_r12.title, " \xB7 ", recovery_r12.complete ? "Complete" : "Pending");
  }
}
function GalleryAuditComponent_For_74_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(3, "br");
    \u0275\u0275text(4);
    \u0275\u0275domElement(5, "br");
    \u0275\u0275domElementStart(6, "a", 28);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const e_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r13.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r13.text);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("href", e_r13.sourceUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", e_r13.sourceTitle, " \u2197");
  }
}
function GalleryAuditComponent_For_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li", 20)(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(7, GalleryAuditComponent_For_74_For_8_Template, 5, 2, "p", null, _forTrack1);
    \u0275\u0275conditionalCreate(9, GalleryAuditComponent_For_74_Conditional_9_Template, 5, 2, "p", 27);
    \u0275\u0275conditionalCreate(10, GalleryAuditComponent_For_74_Conditional_10_Template, 2, 2, "p");
    \u0275\u0275domElementStart(11, "details")(12, "summary");
    \u0275\u0275text(13, "Reference notes for this claim");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(14, GalleryAuditComponent_For_74_For_15_Template, 8, 4, "p", null, _forTrack1);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    let tmp_17_0;
    const clue_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(clue_r11.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", clue_r11.chamber, " \xB7 Passage ", clue_r11.passage);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", clue_r11.title, " \xB7 ", clue_r11.caption);
    \u0275\u0275advance();
    \u0275\u0275repeater(clue_r11.details);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(clue_r11.explanation ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_17_0 = clue_r11.recovery) ? 10 : -1, tmp_17_0);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(clue_r11.evidence);
  }
}
function GalleryAuditComponent_Conditional_75_For_4_Conditional_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 28);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const source_r15 = ctx;
    \u0275\u0275domProperty("href", source_r15.sourceUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", source_r15.title, " \u2197");
  }
}
function GalleryAuditComponent_Conditional_75_For_4_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(5, GalleryAuditComponent_Conditional_75_For_4_Conditional_7_Conditional_5_Template, 2, 2, "a", 28);
  }
  if (rf & 2) {
    let tmp_17_0;
    const insight_r16 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(insight_r16.claim);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(insight_r16.explanation);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_17_0 = insight_r16.source) ? 5 : -1, tmp_17_0);
  }
}
function GalleryAuditComponent_Conditional_75_For_4_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(3, "br");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const question_r17 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(question_r17.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", question_r17.speaker, ": ", question_r17.text);
  }
}
function GalleryAuditComponent_Conditional_75_For_4_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(3, "br");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const observation_r18 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(observation_r18.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(observation_r18.text);
  }
}
function GalleryAuditComponent_Conditional_75_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article", 20)(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(7, GalleryAuditComponent_Conditional_75_For_4_Conditional_7_Template, 6, 3);
    \u0275\u0275domElementStart(8, "details")(9, "summary");
    \u0275\u0275text(10, "Review the encounter record");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(13, GalleryAuditComponent_Conditional_75_For_4_For_14_Template, 5, 3, "p", null, _forTrack1);
    \u0275\u0275repeaterCreate(15, GalleryAuditComponent_Conditional_75_For_4_For_16_Template, 5, 2, "p", null, _forTrack1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(17, "button", 4);
    \u0275\u0275domListener("click", function GalleryAuditComponent_Conditional_75_For_4_Template_button_click_17_listener() {
      const record_r19 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.revisit.emit(record_r19.encounterId));
    });
    \u0275\u0275text(18, "Revisit this scene \u2197");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    let tmp_16_0;
    const record_r19 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r19.state.insightEarned ? "Source-linked insight recorded" : "Encounter in progress");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r19.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", record_r19.chapters.length, " chapters opened \xB7 ", record_r19.questions.length, " questions asked \xB7 ", record_r19.observations.length, " observations");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_16_0 = record_r19.insight) ? 7 : -1, tmp_16_0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(record_r19.attribution);
    \u0275\u0275advance();
    \u0275\u0275repeater(record_r19.questions);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(record_r19.observations);
  }
}
function GalleryAuditComponent_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 21)(1, "h3", 29);
    \u0275\u0275text(2, "Stories & encounter insights");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(3, GalleryAuditComponent_Conditional_75_For_4_Template, 19, 7, "article", 20, _forTrack3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r5.audit().encounters);
  }
}
function GalleryAuditComponent_For_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275domElementStart(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const room_r20 = ctx.$implicit;
    \u0275\u0275attribute("aria-current", room_r20.current ? "step" : null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(room_r20.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(room_r20.complete ? "\u2713 Cleared" : room_r20.current ? "Current gallery" : "Ahead");
  }
}
var GalleryAuditComponent = class _GalleryAuditComponent {
  audit = input.required(
    ...ngDevMode ? [{ debugName: "audit" }] : (
      /* istanbul ignore next */
      []
    )
  );
  resume = output();
  notebook = output();
  revisit = output();
  jumpTo(section) {
    section.scrollIntoView({ block: "start", behavior: "instant" });
    section.focus({ preventScroll: true });
  }
  static \u0275fac = function GalleryAuditComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GalleryAuditComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GalleryAuditComponent, selectors: [["app-gallery-audit"]], inputs: { audit: [1, "audit"] }, outputs: { resume: "resume", notebook: "notebook", revisit: "revisit" }, decls: 82, vars: 15, consts: [["currentStep", ""], ["clueList", ""], [1, "intro"], ["aria-label", "Audit sections"], [3, "click"], [1, "clue-guide", 3, "open"], ["aria-labelledby", "audit-current-title", 1, "audit-current"], [1, "eyebrow"], ["id", "audit-current-title", "tabindex", "-1"], [1, "audit-steps"], [3, "complete"], [1, "recovery-note"], [1, "mechanism-checklist"], [1, "next-action"], [1, "primary", 3, "click"], [1, "reference-notes"], ["aria-labelledby", "fraud-log-title"], ["id", "fraud-log-title", "tabindex", "-1"], [1, "empty-log"], [1, "clue-list"], [1, "clue-entry"], ["aria-labelledby", "encounter-records-title"], ["aria-labelledby", "audit-route-title"], ["id", "audit-route-title"], [1, "audit-route"], [1, "step-number"], [1, "clue-status"], [1, "fraud-explanation"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["id", "encounter-records-title"]], template: function GalleryAuditComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275domElementStart(0, "p", 2);
      \u0275\u0275text(1, "Follow the clues, keep the contradictions, and check off the route. This record updates automatically and returns with your saved practice.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(2, "nav", 3)(3, "button", 4);
      \u0275\u0275domListener("click", function GalleryAuditComponent_Template_button_click_3_listener() {
        \u0275\u0275restoreView(_r1);
        const currentStep_r2 = \u0275\u0275reference(38);
        return \u0275\u0275resetView(ctx.jumpTo(currentStep_r2));
      });
      \u0275\u0275text(4, "Current audit step \u2193");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "button", 4);
      \u0275\u0275domListener("click", function GalleryAuditComponent_Template_button_click_5_listener() {
        \u0275\u0275restoreView(_r1);
        const clueList_r3 = \u0275\u0275reference(65);
        return \u0275\u0275resetView(ctx.jumpTo(clueList_r3));
      });
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(7, "details", 5)(8, "summary");
      \u0275\u0275text(9, "How the first clues work");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "ol")(11, "li")(12, "strong");
      \u0275\u0275text(13, "Read the claim.");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(14, " The date and place tell you what the painting must fit. The setting inscription supplies context; a specific object, date, or community label may contradict it.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(15, "li")(16, "strong");
      \u0275\u0275text(17, "Inspect, then compare.");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(18, " Click a marked detail or its text button. Check that claim against the field notebook. An inspected detail is still unverified.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(19, "li")(20, "strong");
      \u0275\u0275text(21, "Choose a passage.");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(22, " A compatible scene opens its academic mechanisms. If a passage catches, select the offending detail and its fraud category, then confirm the analysis.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(23, "li")(24, "strong");
      \u0275\u0275text(25, "Repair and return.");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(26, " Correct analysis identifies the fraud. Solving its recovery mechanism seals it and returns you to the same three paintings. The authentic passage has its own mechanisms.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(27, "p");
      \u0275\u0275text(28, "For crates or drawers, select an object ");
      \u0275\u0275domElementStart(29, "em");
      \u0275\u0275text(30, "and then");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(31, " its destination. Place every object before operating the mechanism. For a compass or date lock, enter the calculation and set the physical controls.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(32, "p");
      \u0275\u0275text(33, "Fraud routes are optional. You can clear a gallery without exposing both frauds; this log only confirms the ones you actually investigate.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(34, "section", 6)(35, "p", 7);
      \u0275\u0275text(36);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(37, "h3", 8, 0);
      \u0275\u0275text(39);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(40, "p");
      \u0275\u0275text(41);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(42, "ol", 9);
      \u0275\u0275repeaterCreate(43, GalleryAuditComponent_For_44_Template, 10, 7, "li", 10, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(45, GalleryAuditComponent_Conditional_45_Template, 2, 1, "p", 11);
      \u0275\u0275domElementStart(46, "h4");
      \u0275\u0275text(47);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(48, "ol", 12);
      \u0275\u0275repeaterCreate(49, GalleryAuditComponent_For_50_Template, 7, 4, "li", null, _forTrack1);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(51, GalleryAuditComponent_Conditional_51_Template, 5, 2, "p", 13);
      \u0275\u0275domElementStart(52, "button", 14);
      \u0275\u0275domListener("click", function GalleryAuditComponent_Template_button_click_52_listener() {
        return ctx.resume.emit();
      });
      \u0275\u0275text(53);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(54, "button", 4);
      \u0275\u0275domListener("click", function GalleryAuditComponent_Template_button_click_54_listener() {
        return ctx.notebook.emit();
      });
      \u0275\u0275text(55, "Consult field notes \u2197");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(56, "details", 15)(57, "summary");
      \u0275\u0275text(58, "Clues to compare in this gallery");
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(59, GalleryAuditComponent_For_60_Template, 5, 2, "p", null, _forTrack1);
      \u0275\u0275domElementStart(61, "p");
      \u0275\u0275text(62, "Open the field notebook to consult the source links and record a note as read.");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(63, "section", 16)(64, "h3", 17, 1);
      \u0275\u0275text(66, "Running fraud-clue list");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(67, "p");
      \u0275\u0275text(68);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(69, "p");
      \u0275\u0275text(70, "Every inspected claim stays here, including unverified details and authenticated scenes. Fraud explanations appear after a correct analysis.");
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(71, GalleryAuditComponent_Conditional_71_Template, 2, 0, "p", 18);
      \u0275\u0275domElementStart(72, "ol", 19);
      \u0275\u0275repeaterCreate(73, GalleryAuditComponent_For_74_Template, 16, 7, "li", 20, _forTrack2);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(75, GalleryAuditComponent_Conditional_75_Template, 5, 0, "section", 21);
      \u0275\u0275domElementStart(76, "section", 22)(77, "h3", 23);
      \u0275\u0275text(78, "Vault audit route");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(79, "ol", 24);
      \u0275\u0275repeaterCreate(80, GalleryAuditComponent_For_81_Template, 4, 3, "li", null, _forTrack1);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      let tmp_11_0;
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("Running clue list \xB7 ", ctx.audit().clues.length, " \u2193");
      \u0275\u0275advance();
      \u0275\u0275domProperty("open", ctx.audit().clues.length === 0);
      \u0275\u0275advance(29);
      \u0275\u0275textInterpolate(ctx.audit().complete ? "AUDIT COMPLETE" : "CURRENT GALLERY");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.audit().chamber);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2("", ctx.audit().location, " \xB7 ", ctx.audit().date);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.audit().steps);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.audit().phase === "fraud" || ctx.audit().phase === "recovery" ? 45 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Passage mechanisms \xB7 ", ctx.audit().locks.length, " steps");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.audit().locks);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_11_0 = ctx.audit().activeLock) ? 51 : -1, tmp_11_0);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.audit().complete ? "Open completed dossier" : ctx.audit().phase === "recon" ? "Return to paintings" : ctx.audit().phase === "unlocked" ? "Return to open passage" : ctx.audit().phase === "fraud" ? "Continue fraud analysis" : "Continue current mechanism", " \u2192");
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.audit().evidence);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate3("", ctx.audit().fraudCount, " identified \xB7 ", ctx.audit().sealedCount, " sealed \xB7 ", ctx.audit().clues.length, " paintings inspected");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.audit().clues.length ? 71 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.audit().clues);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.audit().encounters.length ? 75 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.audit().route);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  font-size: 13px;\n  line-height: 1.65;\n  color: #c4d3c0;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nh3[_ngcontent-%COMP%] {\n  color: #e8d49d;\n  font: 23px/1.2 Georgia, serif;\n  margin: 24px 0 12px;\n}\nh4[_ngcontent-%COMP%] {\n  color: #eee7d4;\n  font-size: 14px;\n  line-height: 1.5;\n  margin: 16px 0 8px;\n}\np[_ngcontent-%COMP%] {\n  margin: 0 0 14px;\n}\nstrong[_ngcontent-%COMP%] {\n  color: #eee7d4;\n}\nbutton[_ngcontent-%COMP%], \nsummary[_ngcontent-%COMP%], \na[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: 1px solid #879576;\n  border-radius: 5px;\n  background: transparent;\n  color: #e7d3a0;\n  min-height: 44px;\n  padding: 10px 13px;\n  margin: 0 8px 12px 0;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #e6cb90;\n  color: #123529;\n  font-weight: bold;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #f0d08a;\n  outline-offset: 3px;\n}\ndetails[_ngcontent-%COMP%] {\n  padding: 13px;\n  border: 1px solid #60765a;\n  border-radius: 5px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: #e8d49d;\n  min-height: 26px;\n}\ndetails[open][_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n}\n.clue-guide[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\n.clue-guide[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.audit-current[_ngcontent-%COMP%] {\n  margin: 24px 0;\n  padding: 18px;\n  border: 1px solid #8b8b60;\n  background: #20392e;\n  border-radius: 7px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  letter-spacing: 1.6px;\n  font-size: 10px;\n  color: #d6c18a;\n  margin-bottom: 8px;\n}\n.audit-current[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.audit-steps[_ngcontent-%COMP%], \n.clue-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n}\n.audit-steps[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid #536c4d;\n}\n.step-number[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 28px;\n  height: 28px;\n  border: 1px solid #8b986c;\n  border-radius: 50%;\n  text-align: center;\n}\n.complete[_ngcontent-%COMP%]   .step-number[_ngcontent-%COMP%] {\n  background: #456a43;\n  color: #eaf0ca;\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  color: #cfc08e;\n  font-size: 11px;\n}\n.audit-steps[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.mechanism-checklist[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  font-size: 12px;\n}\n[aria-current=step][_ngcontent-%COMP%] {\n  color: #f0dba5;\n}\n[aria-current=step][_ngcontent-%COMP%]   .step-number[_ngcontent-%COMP%] {\n  background: #e6cb90;\n  color: #123529;\n}\n.mechanism-checklist[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\n.mechanism-checklist[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  padding-left: 4px;\n}\n.next-action[_ngcontent-%COMP%], \n.recovery-note[_ngcontent-%COMP%], \n.fraud-explanation[_ngcontent-%COMP%] {\n  padding: 12px;\n  background: rgba(176, 146, 72, 0.1333333333);\n  border-left: 3px solid #d1b47a;\n}\n.clue-entry[_ngcontent-%COMP%] {\n  padding: 16px;\n  margin: 14px 0;\n  border: 1px solid #627759;\n  border-radius: 6px;\n}\n.clue-entry[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.clue-status[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #e8cd94;\n}\n.clue-entry[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  background: #162f26;\n}\n.clue-entry[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #e9ce93;\n  overflow-wrap: anywhere;\n}\n.empty-log[_ngcontent-%COMP%] {\n  padding: 18px;\n  border: 1px dashed #748464;\n}\n.audit-route[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\n.audit-route[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 8px;\n}\n@media (max-width: 450px) {\n  .audit-current[_ngcontent-%COMP%], \n   .clue-entry[_ngcontent-%COMP%] {\n    padding: 13px;\n  }\n}\n/*# sourceMappingURL=gallery-audit.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GalleryAuditComponent, [{
    type: Component,
    args: [{ selector: "app-gallery-audit", changeDetection: ChangeDetectionStrategy.OnPush, template: `<p class="intro">Follow the clues, keep the contradictions, and check off the route. This record updates automatically and returns with your saved practice.</p>\r
<nav aria-label="Audit sections"><button (click)="jumpTo(currentStep)">Current audit step \u2193</button><button (click)="jumpTo(clueList)">Running clue list \xB7 {{ audit().clues.length }} \u2193</button></nav>\r
<details class="clue-guide" [open]="audit().clues.length === 0">\r
  <summary>How the first clues work</summary>\r
  <ol>\r
    <li><strong>Read the claim.</strong> The date and place tell you what the painting must fit. The setting inscription supplies context; a specific object, date, or community label may contradict it.</li>\r
    <li><strong>Inspect, then compare.</strong> Click a marked detail or its text button. Check that claim against the field notebook. An inspected detail is still unverified.</li>\r
    <li><strong>Choose a passage.</strong> A compatible scene opens its academic mechanisms. If a passage catches, select the offending detail and its fraud category, then confirm the analysis.</li>\r
    <li><strong>Repair and return.</strong> Correct analysis identifies the fraud. Solving its recovery mechanism seals it and returns you to the same three paintings. The authentic passage has its own mechanisms.</li>\r
  </ol>\r
  <p>For crates or drawers, select an object <em>and then</em> its destination. Place every object before operating the mechanism. For a compass or date lock, enter the calculation and set the physical controls.</p>\r
  <p>Fraud routes are optional. You can clear a gallery without exposing both frauds; this log only confirms the ones you actually investigate.</p>\r
</details>\r
\r
<section class="audit-current" aria-labelledby="audit-current-title">\r
  <p class="eyebrow">{{ audit().complete ? 'AUDIT COMPLETE' : 'CURRENT GALLERY' }}</p>\r
  <h3 #currentStep id="audit-current-title" tabindex="-1">{{ audit().chamber }}</h3>\r
  <p>{{ audit().location }} \xB7 {{ audit().date }}</p>\r
  <ol class="audit-steps">\r
    @for (step of audit().steps; track step.title; let i = $index) {\r
      <li [class.complete]="step.complete" [attr.aria-current]="audit().currentStep === i ? 'step' : null">\r
        <span class="step-number">{{ step.complete ? '\u2713' : i + 1 }}</span>\r
        <div><strong>{{ step.title }}</strong><small>{{ step.complete ? 'Complete' : audit().currentStep === i ? 'Current step' : 'To do' }}</small><p>{{ step.detail }}</p></div>\r
      </li>\r
    }\r
  </ol>\r
  @if (audit().phase === 'fraud' || audit().phase === 'recovery') {\r
    <p class="recovery-note">{{ audit().phase === 'fraud' ? 'Fraud detour: select the specific contradictory detail and its category. A wrong category can be corrected.' : 'Fraud identified. Complete the recovery lock to seal it and return to the paintings.' }}</p>\r
  }\r
  <h4>Passage mechanisms \xB7 {{ audit().locks.length }} steps</h4>\r
  <ol class="mechanism-checklist">\r
    @for (lock of audit().locks; track lock.id) {\r
      <li [attr.aria-current]="lock.current ? 'step' : null"><strong>{{ lock.title }}</strong><small>{{ lock.complete ? '\u2713 Complete' : lock.current ? 'Current mechanism' : 'To do' }}</small><p>{{ lock.prompt }}</p></li>\r
    }\r
  </ol>\r
  @if (audit().activeLock; as lock) { <p class="next-action"><strong>Next: {{ lock.title }}</strong><br>{{ lock.prompt }}</p> }\r
  <button class="primary" (click)="resume.emit()">{{ audit().complete ? 'Open completed dossier' : audit().phase === 'recon' ? 'Return to paintings' : audit().phase === 'unlocked' ? 'Return to open passage' : audit().phase === 'fraud' ? 'Continue fraud analysis' : 'Continue current mechanism' }} \u2192</button>\r
  <button (click)="notebook.emit()">Consult field notes \u2197</button>\r
  <details class="reference-notes"><summary>Clues to compare in this gallery</summary>\r
    @for (e of audit().evidence; track e.id) { <p><strong>{{ e.title }}</strong><br>{{ e.text }}</p> }\r
    <p>Open the field notebook to consult the source links and record a note as read.</p>\r
  </details>\r
</section>\r
\r
<section aria-labelledby="fraud-log-title">\r
  <h3 #clueList id="fraud-log-title" tabindex="-1">Running fraud-clue list</h3>\r
  <p>{{ audit().fraudCount }} identified \xB7 {{ audit().sealedCount }} sealed \xB7 {{ audit().clues.length }} paintings inspected</p>\r
  <p>Every inspected claim stays here, including unverified details and authenticated scenes. Fraud explanations appear after a correct analysis.</p>\r
  @if (!audit().clues.length) { <p class="empty-log">No clues inspected yet. Open a painting and inspect a marked detail to begin the list.</p> }\r
  <ol class="clue-list">\r
    @for (clue of audit().clues; track clue.paintingId) {\r
      <li class="clue-entry">\r
        <span class="clue-status">{{ clue.status }}</span>\r
        <h4>{{ clue.chamber }} \xB7 Passage {{ clue.passage }}</h4><p>{{ clue.title }} \xB7 {{ clue.caption }}</p>\r
        @for (detail of clue.details; track detail.id) { <p><strong>{{ detail.label }}</strong><br>{{ detail.detail }}</p> }\r
        @if (clue.explanation) { <p class="fraud-explanation"><strong>{{ clue.category }}</strong><br>{{ clue.explanation }}</p> }\r
        @if (clue.recovery; as recovery) { <p>Recovery: {{ recovery.title }} \xB7 {{ recovery.complete ? 'Complete' : 'Pending' }}</p> }\r
        <details><summary>Reference notes for this claim</summary>@for (e of clue.evidence; track e.id) { <p><strong>{{ e.title }}</strong><br>{{ e.text }}<br><a [href]="e.sourceUrl" target="_blank" rel="noopener noreferrer">{{ e.sourceTitle }} \u2197</a></p> }</details>\r
      </li>\r
    }\r
  </ol>\r
</section>\r
@if (audit().encounters.length) {\r
  <section aria-labelledby="encounter-records-title"><h3 id="encounter-records-title">Stories &amp; encounter insights</h3>\r
    @for (record of audit().encounters; track record.encounterId) {\r
      <article class="clue-entry"><span class="clue-status">{{ record.state.insightEarned ? 'Source-linked insight recorded' : 'Encounter in progress' }}</span><h4>{{ record.title }}</h4><p>{{ record.chapters.length }} chapters opened \xB7 {{ record.questions.length }} questions asked \xB7 {{ record.observations.length }} observations</p>\r
        @if (record.insight; as insight) { <p><strong>{{ insight.claim }}</strong></p><p>{{ insight.explanation }}</p>@if (insight.source; as source) { <a [href]="source.sourceUrl" target="_blank" rel="noopener noreferrer">{{ source.title }} \u2197</a> } }\r
        <details><summary>Review the encounter record</summary><p>{{ record.attribution }}</p>@for (question of record.questions; track question.id) { <p><strong>{{ question.title }}</strong><br>{{ question.speaker }}: {{ question.text }}</p> }@for (observation of record.observations; track observation.id) { <p><strong>{{ observation.label }}</strong><br>{{ observation.text }}</p> }</details>\r
        <button (click)="revisit.emit(record.encounterId)">Revisit this scene \u2197</button>\r
      </article>\r
    }\r
  </section>\r
}\r
<section aria-labelledby="audit-route-title"><h3 id="audit-route-title">Vault audit route</h3><ol class="audit-route">@for (room of audit().route; track room.id) { <li [attr.aria-current]="room.current ? 'step' : null">{{ room.title }}<small>{{ room.complete ? '\u2713 Cleared' : room.current ? 'Current gallery' : 'Ahead' }}</small></li> }</ol></section>\r
`, styles: ["/* src/app/templates/heist/gallery/ui/gallery-audit.component.scss */\n:host {\n  display: block;\n  font-size: 13px;\n  line-height: 1.65;\n  color: #c4d3c0;\n}\n* {\n  box-sizing: border-box;\n}\nh3 {\n  color: #e8d49d;\n  font: 23px/1.2 Georgia, serif;\n  margin: 24px 0 12px;\n}\nh4 {\n  color: #eee7d4;\n  font-size: 14px;\n  line-height: 1.5;\n  margin: 16px 0 8px;\n}\np {\n  margin: 0 0 14px;\n}\nstrong {\n  color: #eee7d4;\n}\nbutton,\nsummary,\na {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n  border: 1px solid #879576;\n  border-radius: 5px;\n  background: transparent;\n  color: #e7d3a0;\n  min-height: 44px;\n  padding: 10px 13px;\n  margin: 0 8px 12px 0;\n}\n.primary {\n  background: #e6cb90;\n  color: #123529;\n  font-weight: bold;\n}\nbutton:focus-visible,\nsummary:focus-visible,\na:focus-visible {\n  outline: 3px solid #f0d08a;\n  outline-offset: 3px;\n}\ndetails {\n  padding: 13px;\n  border: 1px solid #60765a;\n  border-radius: 5px;\n}\nsummary {\n  cursor: pointer;\n  color: #e8d49d;\n  min-height: 26px;\n}\ndetails[open] > summary {\n  margin-bottom: 14px;\n}\n.clue-guide ol {\n  padding-left: 20px;\n}\n.clue-guide li {\n  margin-bottom: 12px;\n}\n.audit-current {\n  margin: 24px 0;\n  padding: 18px;\n  border: 1px solid #8b8b60;\n  background: #20392e;\n  border-radius: 7px;\n}\n.eyebrow {\n  letter-spacing: 1.6px;\n  font-size: 10px;\n  color: #d6c18a;\n  margin-bottom: 8px;\n}\n.audit-current h3 {\n  margin-top: 0;\n}\n.audit-steps,\n.clue-list {\n  list-style: none;\n  padding: 0;\n}\n.audit-steps li {\n  display: flex;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid #536c4d;\n}\n.step-number {\n  flex-shrink: 0;\n  width: 28px;\n  height: 28px;\n  border: 1px solid #8b986c;\n  border-radius: 50%;\n  text-align: center;\n}\n.complete .step-number {\n  background: #456a43;\n  color: #eaf0ca;\n}\nsmall {\n  display: block;\n  color: #cfc08e;\n  font-size: 11px;\n}\n.audit-steps p,\n.mechanism-checklist p {\n  margin: 6px 0 0;\n  font-size: 12px;\n}\n[aria-current=step] {\n  color: #f0dba5;\n}\n[aria-current=step] .step-number {\n  background: #e6cb90;\n  color: #123529;\n}\n.mechanism-checklist {\n  padding-left: 20px;\n}\n.mechanism-checklist li {\n  margin: 12px 0;\n  padding-left: 4px;\n}\n.next-action,\n.recovery-note,\n.fraud-explanation {\n  padding: 12px;\n  background: rgba(176, 146, 72, 0.1333333333);\n  border-left: 3px solid #d1b47a;\n}\n.clue-entry {\n  padding: 16px;\n  margin: 14px 0;\n  border: 1px solid #627759;\n  border-radius: 6px;\n}\n.clue-entry h4 {\n  margin-top: 8px;\n}\n.clue-status {\n  font-size: 11px;\n  color: #e8cd94;\n}\n.clue-entry details {\n  background: #162f26;\n}\n.clue-entry a {\n  color: #e9ce93;\n  overflow-wrap: anywhere;\n}\n.empty-log {\n  padding: 18px;\n  border: 1px dashed #748464;\n}\n.audit-route {\n  padding-left: 20px;\n}\n.audit-route li {\n  padding: 8px;\n}\n@media (max-width: 450px) {\n  .audit-current,\n  .clue-entry {\n    padding: 13px;\n  }\n}\n/*# sourceMappingURL=gallery-audit.component.css.map */\n"] }]
  }], null, { audit: [{ type: Input, args: [{ isSignal: true, alias: "audit", required: true }] }], resume: [{ type: Output, args: ["resume"] }], notebook: [{ type: Output, args: ["notebook"] }], revisit: [{ type: Output, args: ["revisit"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GalleryAuditComponent, { className: "GalleryAuditComponent", filePath: "src/app/templates/heist/gallery/ui/gallery-audit.component.ts", lineNumber: 8 });
})();

// src/app/templates/heist/gallery/ui/gallery.component.ts
var _c0 = ["stage"];
var _c1 = ["dialog"];
var _forTrack02 = ($index, $item) => $item.id;
function GalleryComponent_Conditional_23_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function GalleryComponent_Conditional_23_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.reset());
    });
    \u0275\u0275text(1, "Start a new practice");
    \u0275\u0275elementEnd();
  }
}
function GalleryComponent_Conditional_23_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function GalleryComponent_Conditional_23_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.retrySave());
    });
    \u0275\u0275text(1, "Retry save");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 8);
    \u0275\u0275listener("click", function GalleryComponent_Conditional_23_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.exportDossier("json"));
    });
    \u0275\u0275text(3, "Export work");
    \u0275\u0275elementEnd();
  }
}
function GalleryComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, GalleryComponent_Conditional_23_Conditional_2_Template, 2, 0, "button")(3, GalleryComponent_Conditional_23_Conditional_3_Template, 4, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.runtime.warning(), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.restoreBlocked() ? 2 : 3);
  }
}
function GalleryComponent_For_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 15);
    \u0275\u0275element(1, "img", 39);
    \u0275\u0275elementStart(2, "div")(3, "span");
    \u0275\u0275text(4, "ENTER THE WORLD BEHIND THE PAINTING");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 40);
    \u0275\u0275listener("click", function GalleryComponent_For_48_Template_button_click_9_listener() {
      const encounter_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.enterEncounter(encounter_r5.id));
    });
    \u0275\u0275text(10, "Step into the scene \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const encounter_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", encounter_r5.image, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(encounter_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(encounter_r5.invitation);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.runtime.restoreBlocked());
  }
}
function GalleryComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span");
    \u0275\u0275text(2, "\u2316");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, "Lighting the gallery\u2026");
    \u0275\u0275elementEnd();
  }
}
function GalleryComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 8);
    \u0275\u0275listener("click", function GalleryComponent_Conditional_58_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadScene());
    });
    \u0275\u0275text(3, "Reload artwork");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.artError());
  }
}
function GalleryComponent_For_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function GalleryComponent_For_61_Template_button_click_0_listener() {
      const p_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inspect(p_r8.id));
    });
    \u0275\u0275elementStart(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("confirmed-fraud", ctx_r1.engine().frauds.includes(p_r8.id));
    \u0275\u0275property("disabled", !ctx_r1.ready() || !!ctx_r1.artError() || ctx_r1.runtime.restoreBlocked());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("PASSAGE ", ctx_r1.passage(p_r8));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.engine().frauds.includes(p_r8.id) ? "Fraud confirmed" : ctx_r1.hasInspected(p_r8) ? "Inspect again \u2197" : "Inspect painting \u2197");
  }
}
function GalleryComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function GalleryComponent_Conditional_71_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.continue());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.chamber().next ? "Enter next gallery" : "Recover the collection", " \u2192");
  }
}
function GalleryComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function GalleryComponent_Conditional_72_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resume());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.engine().phase === "fraud" ? "Investigate fraud" : ctx_r1.engine().phase === "extracted" ? "Open dossier" : "Open mechanism", " \u2192");
  }
}
function GalleryComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function GalleryComponent_Conditional_73_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.open("notes"));
    });
    \u0275\u0275text(1, "Consult field notes \u2197");
    \u0275\u0275elementEnd();
  }
}
function GalleryComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.feedback());
  }
}
function GalleryComponent_For_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r12 = ctx.$implicit;
    const \u0275$index_190_r13 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("current", ctx_r1.chamber().id === c_r12.id)("complete", ctx_r1.engine().cleared.includes(c_r12.id));
    \u0275\u0275attribute("aria-current", ctx_r1.chamber().id === c_r12.id ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.engine().cleared.includes(c_r12.id) ? "\u2713" : (\u0275$index_190_r13 + 1).toString().padStart(2, "0"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r12.title);
  }
}
function GalleryComponent_Conditional_92_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 43);
    \u0275\u0275listener("click", function GalleryComponent_Conditional_92_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275text(4, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.panel() === "inspect" ? "PAINTING INSPECTION" : ctx_r1.panel() === "lock" ? "ACADEMIC MECHANISM" : ctx_r1.panel() === "notes" ? "INTELLIGENCE NOTEBOOK" : ctx_r1.panel() === "replay" ? "OPERATION REPLAY" : ctx_r1.panel() === "audit" ? "CLUE LOG & VAULT AUDIT" : "RECOVERY RECORD");
  }
}
function GalleryComponent_Case_93_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-historical-encounter", 46);
    \u0275\u0275listener("action", function GalleryComponent_Case_93_Conditional_2_Conditional_0_Template_app_historical_encounter_action_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.encounterAction($event));
    })("leave", function GalleryComponent_Case_93_Conditional_2_Conditional_0_Template_app_historical_encounter_leave_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.leaveEncounter());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const encounter_r16 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("definition", encounter_r16)("state", ctx)("sources", ctx_r1.mission.evidence)("reducedMotion", ctx_r1.reducedMotion());
  }
}
function GalleryComponent_Case_93_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, GalleryComponent_Case_93_Conditional_2_Conditional_0_Template, 1, 4, "app-historical-encounter", 45);
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional((tmp_5_0 = ctx_r1.encounterState()) ? 0 : -1, tmp_5_0);
  }
}
function GalleryComponent_Case_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, GalleryComponent_Case_93_Conditional_2_Template, 1, 1);
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.activeEncounter()?.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r1.activeEncounter()) ? 2 : -1, tmp_4_0);
  }
}
function GalleryComponent_Case_94_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 47);
    \u0275\u0275text(1, "Clue log & vault audit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "app-gallery-audit", 48);
    \u0275\u0275listener("resume", function GalleryComponent_Case_94_Template_app_gallery_audit_resume_2_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.returnFromAudit());
    })("notebook", function GalleryComponent_Case_94_Template_app_gallery_audit_notebook_2_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.open("notes"));
    })("revisit", function GalleryComponent_Case_94_Template_app_gallery_audit_revisit_2_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.enterEncounter($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("audit", ctx_r1.audit());
  }
}
function GalleryComponent_Case_95_Conditional_0_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 62);
    \u0275\u0275listener("click", function GalleryComponent_Case_95_Conditional_0_For_7_Template_button_click_0_listener() {
      const h_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.inspectHotspot(h_r20.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const h_r20 = ctx.$implicit;
    const p_r21 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("left", h_r20.x, "%")("top", h_r20.y, "%");
    \u0275\u0275classProp("inspected", ctx_r1.engine().inspections[p_r21.id]?.includes(h_r20.id));
    \u0275\u0275attribute("aria-label", "Inspect " + h_r20.label);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(h_r20.symbol);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(h_r20.label);
  }
}
function GalleryComponent_Case_95_Conditional_0_For_14_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r23 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(h_r23.detail);
  }
}
function GalleryComponent_Case_95_Conditional_0_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function GalleryComponent_Case_95_Conditional_0_For_14_Template_button_click_0_listener() {
      const h_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.inspectHotspot(h_r23.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, GalleryComponent_Case_95_Conditional_0_For_14_Conditional_5_Template, 2, 1, "p");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r23 = ctx.$implicit;
    const p_r21 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r1.hotspot() === h_r23.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.engine().inspections[p_r21.id]?.includes(h_r23.id) ? "\u2713 INSPECTED" : "INSPECT DETAIL");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(h_r23.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.hotspot() === h_r23.id ? 5 : -1);
  }
}
function GalleryComponent_Case_95_Conditional_0_Conditional_15_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function GalleryComponent_Case_95_Conditional_0_Conditional_15_For_7_Template_button_click_0_listener() {
      const c_r26 = \u0275\u0275restoreView(_r25).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.category.set(c_r26.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r26 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("selected", ctx_r1.category() === c_r26.id);
    \u0275\u0275attribute("aria-pressed", ctx_r1.category() === c_r26.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r26.symbol);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r26.label);
  }
}
function GalleryComponent_Case_95_Conditional_0_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 57)(1, "h3");
    \u0275\u0275text(2, "The passage has caught.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Which category and inspected detail prove this scene impossible?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 63);
    \u0275\u0275repeaterCreate(6, GalleryComponent_Case_95_Conditional_0_Conditional_15_For_7_Template, 4, 5, "button", 56, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 54);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 40);
    \u0275\u0275listener("click", function GalleryComponent_Case_95_Conditional_0_Conditional_15_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.classify());
    });
    \u0275\u0275text(11, "Confirm fraud analysis \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r21 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.categories);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Selected detail: ", ctx_r1.hotspot() ? p_r21.hotspots[0].id === ctx_r1.hotspot() ? p_r21.hotspots[0].label : p_r21.hotspots[1].label : "Inspect a detail above");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.category() || !ctx_r1.hotspot());
  }
}
function GalleryComponent_Case_95_Conditional_0_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r21 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("FRAUD CONFIRMED \xB7 ", p_r21.fraud?.explanation);
  }
}
function GalleryComponent_Case_95_Conditional_0_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 64);
    \u0275\u0275listener("click", function GalleryComponent_Case_95_Conditional_0_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.choose());
    });
    \u0275\u0275text(1, "Choose the passage beneath this painting \u2192");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r21 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r1.hasInspected(p_r21) || !ctx_r1.ready() || !!ctx_r1.artError());
  }
}
function GalleryComponent_Case_95_Conditional_0_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 65);
    \u0275\u0275listener("click", function GalleryComponent_Case_95_Conditional_0_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.resume());
    });
    \u0275\u0275text(1, "Return to the active mechanism \u2192");
    \u0275\u0275elementEnd();
  }
}
function GalleryComponent_Case_95_Conditional_0_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 64);
    \u0275\u0275listener("click", function GalleryComponent_Case_95_Conditional_0_For_20_Template_button_click_0_listener() {
      const encounter_r30 = \u0275\u0275restoreView(_r29).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.enterEncounter(encounter_r30.id));
    });
    \u0275\u0275text(1, "Enter the scene \u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 54);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const encounter_r30 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.runtime.restoreBlocked());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(encounter_r30.invitation);
  }
}
function GalleryComponent_Case_95_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 49);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 50);
    \u0275\u0275element(5, "div", 51);
    \u0275\u0275repeaterCreate(6, GalleryComponent_Case_95_Conditional_0_For_7_Template, 4, 9, "button", 52, _forTrack02);
    \u0275\u0275elementStart(8, "button", 53);
    \u0275\u0275listener("click", function GalleryComponent_Case_95_Conditional_0_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.zoom.set(!ctx_r1.zoom()));
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 54);
    \u0275\u0275text(11, "Inspect the marked detail studies and the setting inscription. Use the field notes to test their claims.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 55);
    \u0275\u0275repeaterCreate(13, GalleryComponent_Case_95_Conditional_0_For_14_Template, 6, 5, "button", 56, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, GalleryComponent_Case_95_Conditional_0_Conditional_15_Template, 12, 2, "section", 57)(16, GalleryComponent_Case_95_Conditional_0_Conditional_16_Template, 2, 1, "p", 58)(17, GalleryComponent_Case_95_Conditional_0_Conditional_17_Template, 2, 1, "button", 59)(18, GalleryComponent_Case_95_Conditional_0_Conditional_18_Template, 2, 0, "button", 60);
    \u0275\u0275repeaterCreate(19, GalleryComponent_Case_95_Conditional_0_For_20_Template, 4, 2, null, null, _forTrack02);
    \u0275\u0275elementStart(21, "button", 61);
    \u0275\u0275listener("click", function GalleryComponent_Case_95_Conditional_0_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.open("notes"));
    });
    \u0275\u0275text(22, "Consult the field notebook \u2197");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r21 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Passage ", ctx_r1.passage(p_r21), " \xB7 ", p_r21.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r21.caption);
    \u0275\u0275advance();
    \u0275\u0275classProp("zoomed", ctx_r1.zoom());
    \u0275\u0275advance();
    \u0275\u0275styleProp("background-image", "url(" + p_r21.image + ")")("background-position", ctx_r1.artPosition(p_r21));
    \u0275\u0275attribute("aria-label", p_r21.caption);
    \u0275\u0275advance();
    \u0275\u0275repeater(p_r21.hotspots);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.zoom());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.zoom() ? "\u2212 Restore view" : "\uFF0B Zoom painting");
    \u0275\u0275advance(4);
    \u0275\u0275repeater(p_r21.hotspots);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.engine().phase === "fraud" && ctx_r1.engine().paintingId === p_r21.id ? 15 : ctx_r1.engine().frauds.includes(p_r21.id) ? 16 : ctx_r1.engine().phase === "recon" ? 17 : 18);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.currentEncounters());
  }
}
function GalleryComponent_Case_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, GalleryComponent_Case_95_Conditional_0_Template, 23, 13);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_3_0 = ctx_r1.painting()) ? 0 : -1, tmp_3_0);
  }
}
function GalleryComponent_Case_96_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.engine().painting?.fraud?.explanation);
  }
}
function GalleryComponent_Case_96_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-academic-lock", 68);
    \u0275\u0275listener("operate", function GalleryComponent_Case_96_Conditional_8_Template_app_academic_lock_operate_0_listener($event) {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.operate($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lock_r33 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("lock", lock_r33)("saved", ctx_r1.lockDrafts.get(lock_r33.id) ?? ctx_r1.engine().mechanisms[lock_r33.id]);
  }
}
function GalleryComponent_Case_96_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, GalleryComponent_Case_96_Conditional_2_Template, 2, 1, "p", 58);
    \u0275\u0275elementStart(3, "div", 66)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "b");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, GalleryComponent_Case_96_Conditional_8_Template, 1, 2, "app-academic-lock", 67);
    \u0275\u0275elementStart(9, "button", 61);
    \u0275\u0275listener("click", function GalleryComponent_Case_96_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.open("notes"));
    });
    \u0275\u0275text(10, "Open evidence & field notes \u2197");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 61);
    \u0275\u0275listener("click", function GalleryComponent_Case_96_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.open("audit"));
    });
    \u0275\u0275text(12, "Review clues & audit steps \u2197");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.engine().phase === "recovery" ? "Repair the fraud lock" : ctx_r1.chamber().layout === "vault" ? "The master vault" : "Knowledge moves the machinery.");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.engine().phase === "recovery" ? 2 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.engine().phase === "recovery" ? "CORRECT THE HISTORICAL ERROR" : "PASSAGE MECHANISMS");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.engine().activeLocks.length, " remaining");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = ctx_r1.currentLock()) ? 8 : -1, tmp_7_0);
  }
}
function GalleryComponent_Case_97_Conditional_6_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 61);
    \u0275\u0275listener("click", function GalleryComponent_Case_97_Conditional_6_For_4_Template_button_click_0_listener() {
      const encounter_r36 = \u0275\u0275restoreView(_r35).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.enterEncounter(encounter_r36.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const encounter_r36 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r1.engine().encounters[encounter_r36.id] ? "Revisit" : "Enter", " ", encounter_r36.title, " \u2197");
  }
}
function GalleryComponent_Case_97_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 69)(1, "h3");
    \u0275\u0275text(2, "Living scenes");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, GalleryComponent_Case_97_Conditional_6_For_4_Template, 2, 2, "button", 70, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.availableEncounters());
  }
}
function GalleryComponent_Case_97_For_8_For_4_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "CONFIRMED");
    \u0275\u0275elementEnd();
  }
}
function GalleryComponent_Case_97_For_8_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "details", 71);
    \u0275\u0275listener("toggle", function GalleryComponent_Case_97_For_8_For_4_Conditional_0_Template_details_toggle_0_listener($event) {
      \u0275\u0275restoreView(_r37);
      const e_r38 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleEvidence($event, e_r38.id));
    });
    \u0275\u0275elementStart(1, "summary")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275conditionalCreate(5, GalleryComponent_Case_97_For_8_For_4_Conditional_0_Conditional_5_Template, 2, 0, "small");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "a", 72);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r38 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.engine().facts.includes(e_r38.id) ? "\u2713" : "\u25C7");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r38.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.engine().facts.includes(e_r38.id) ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r38.text);
    \u0275\u0275advance();
    \u0275\u0275property("href", e_r38.sourceUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", e_r38.sourceTitle, " \u2197");
  }
}
function GalleryComponent_Case_97_For_8_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, GalleryComponent_Case_97_For_8_For_4_Conditional_0_Template, 10, 6, "details");
  }
  if (rf & 2) {
    const e_r38 = ctx.$implicit;
    const group_r39 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(e_r38.category === group_r39 ? 0 : -1);
  }
}
function GalleryComponent_Case_97_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 69)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, GalleryComponent_Case_97_For_8_For_4_Template, 1, 1, null, null, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r39 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r39);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.mission.evidence);
  }
}
function GalleryComponent_Case_97_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 65);
    \u0275\u0275listener("click", function GalleryComponent_Case_97_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r40);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.resume());
    });
    \u0275\u0275text(1, "Return to the mechanism \u2192");
    \u0275\u0275elementEnd();
  }
}
function GalleryComponent_Case_97_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 65);
    \u0275\u0275listener("click", function GalleryComponent_Case_97_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.open("inspect"));
    });
    \u0275\u0275text(1, "Return to painting \u2192");
    \u0275\u0275elementEnd();
  }
}
function GalleryComponent_Case_97_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 47);
    \u0275\u0275text(1, "The field notebook");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Read the reference notes before committing to a passage. Confirmed facts receive a seal as you authenticate scenes and solve their mechanisms.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 61);
    \u0275\u0275listener("click", function GalleryComponent_Case_97_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.open("audit"));
    });
    \u0275\u0275text(5, "Open running fraud-clue list & audit \u2197");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, GalleryComponent_Case_97_Conditional_6_Template, 5, 0, "section", 69);
    \u0275\u0275repeaterCreate(7, GalleryComponent_Case_97_For_8_Template, 5, 1, "section", 69, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(9, GalleryComponent_Case_97_Conditional_9_Template, 2, 0, "button", 60)(10, GalleryComponent_Case_97_Conditional_10_Template, 2, 0, "button", 60);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.availableEncounters().length ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.groups);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.engine().phase !== "recon" && ctx_r1.engine().phase !== "extracted" ? 9 : ctx_r1.selectedPainting() && ctx_r1.engine().phase === "recon" ? 10 : -1);
  }
}
function GalleryComponent_Case_98_Conditional_4_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 8);
    \u0275\u0275listener("click", function GalleryComponent_Case_98_Conditional_4_For_7_Template_button_click_1_listener() {
      const \u0275$index_417_r44 = \u0275\u0275restoreView(_r43).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.replayIndex.set(\u0275$index_417_r44));
    });
    \u0275\u0275elementStart(2, "time");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const e_r45 = ctx.$implicit;
    const \u0275$index_417_r44 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("selected", ctx_r1.replayIndex() === \u0275$index_417_r44);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.time(e_r45.elapsed));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r45.message);
  }
}
function GalleryComponent_Case_98_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 73);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "input", 74);
    \u0275\u0275listener("ngModelChange", function GalleryComponent_Case_98_Conditional_4_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.replayIndex.set(+$event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 75);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ol", 76);
    \u0275\u0275repeaterCreate(6, GalleryComponent_Case_98_Conditional_4_For_7_Template, 6, 4, "li", null, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Decision ", (ctx_r1.replayIndex() ?? 0) + 1, " of ", ctx_r1.engine().events.length);
    \u0275\u0275advance();
    \u0275\u0275property("max", ctx_r1.engine().events.length - 1)("ngModel", ctx_r1.replayIndex());
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.engine().events[ctx_r1.replayIndex() ?? 0].message);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.engine().events);
  }
}
function GalleryComponent_Case_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 47);
    \u0275\u0275text(1, "Replay the evidence trail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Jump between meaningful decisions. The gallery behind this panel shows the mechanisms and route at that moment.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, GalleryComponent_Case_98_Conditional_4_Template, 8, 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.engine().events.length ? 4 : -1);
  }
}
function GalleryComponent_Case_99_For_25_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 80);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r47 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("\u2713 ", e_r47.chamberId, " \xB7 authenticated at ", ctx_r1.time(e_r47.elapsed));
  }
}
function GalleryComponent_Case_99_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, GalleryComponent_Case_99_For_25_Conditional_0_Template, 2, 2, "p", 80);
  }
  if (rf & 2) {
    const e_r47 = ctx.$implicit;
    \u0275\u0275conditional(e_r47.type === "choose" && e_r47.correct ? 0 : -1);
  }
}
function GalleryComponent_Case_99_For_29_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 80)(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r48 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r48.category);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 ", e_r48.title);
  }
}
function GalleryComponent_Case_99_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, GalleryComponent_Case_99_For_29_Conditional_0_Template, 4, 2, "p", 80);
  }
  if (rf & 2) {
    const e_r48 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.engine().facts.includes(e_r48.id) ? 0 : -1);
  }
}
function GalleryComponent_Case_99_Conditional_30_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 81);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "textarea", 82);
    \u0275\u0275twoWayListener("ngModelChange", function GalleryComponent_Case_99_Conditional_30_For_3_Template_textarea_ngModelChange_2_listener($event) {
      const \u0275$index_487_r51 = \u0275\u0275restoreView(_r50).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.responses[\u0275$index_487_r51], $event) || (ctx_r1.responses[\u0275$index_487_r51] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function GalleryComponent_Case_99_Conditional_30_For_3_Template_textarea_blur_2_listener() {
      \u0275\u0275restoreView(_r50);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.saveDefense());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const prompt_r52 = ctx.$implicit;
    const \u0275$index_487_r51 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(prompt_r52);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.responses[\u0275$index_487_r51]);
    \u0275\u0275control();
  }
}
function GalleryComponent_Case_99_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "Defend your decisions");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(2, GalleryComponent_Case_99_Conditional_30_For_3_Template, 3, 2, "label", 81, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(4, "button", 41);
    \u0275\u0275listener("click", function GalleryComponent_Case_99_Conditional_30_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveDefense());
    });
    \u0275\u0275text(5, "Save defense");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.mission.defensePrompts);
  }
}
function GalleryComponent_Case_99_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 47);
    \u0275\u0275text(1, "Historical Authentication Dossier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 77)(5, "div")(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "Galleries cleared");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div")(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "Frauds corrected");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div")(16, "strong");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19, "Locks operated");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "button", 61);
    \u0275\u0275listener("click", function GalleryComponent_Case_99_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.open("audit"));
    });
    \u0275\u0275text(21, "Review running fraud-clue list & vault audit \u2197");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "h3");
    \u0275\u0275text(23, "Confirmed scenes");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(24, GalleryComponent_Case_99_For_25_Template, 1, 1, null, null, _forTrack02);
    \u0275\u0275elementStart(26, "h3");
    \u0275\u0275text(27, "Evidence collected");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(28, GalleryComponent_Case_99_For_29_Template, 1, 1, null, null, _forTrack02);
    \u0275\u0275conditionalCreate(30, GalleryComponent_Case_99_Conditional_30_Template, 6, 0);
    \u0275\u0275elementStart(31, "div", 78)(32, "button", 41);
    \u0275\u0275listener("click", function GalleryComponent_Case_99_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportDossier("md"));
    });
    \u0275\u0275text(33, "Download dossier \u2193");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 42);
    \u0275\u0275listener("click", function GalleryComponent_Case_99_Template_button_click_34_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportDossier("json"));
    });
    \u0275\u0275text(35, "Export evidence JSON");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "details", 79)(37, "summary");
    \u0275\u0275text(38, "Start another practice");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "p");
    \u0275\u0275text(40, "Export your dossier first to keep this record. Starting again replaces this browser\u2019s saved practice.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 8);
    \u0275\u0275listener("click", function GalleryComponent_Case_99_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reset());
    });
    \u0275\u0275text(42, "Start a new practice");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.engine().phase === "extracted" ? "The collection is recovered. Your evidence tells the story of how." : "Your working record grows with every inspection, correction, and mechanism.");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.engine().cleared.length, "/", ctx_r1.mission.chambers.length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.engine().frauds.length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.engine().solved.length);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.engine().events);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.mission.evidence);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.engine().phase === "extracted" ? 30 : -1);
  }
}
function GalleryComponent_Conditional_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.feedback());
  }
}
var GALLERY_SCENE_LOADER = new InjectionToken("GALLERY_SCENE_LOADER", { providedIn: "root", factory: () => () => import("./chunk-7TFRTFNH.js") });
var GalleryComponent = class _GalleryComponent {
  runtime = inject(GalleryRuntime);
  mission = this.runtime.mission;
  engine = computed(() => {
    this.runtime.revision();
    return this.runtime.engine;
  }, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "engine" } : (
    /* istanbul ignore next */
    {}
  )), { equal: () => false }));
  chamber = computed(
    () => this.engine().chamber,
    ...ngDevMode ? [{ debugName: "chamber" }] : (
      /* istanbul ignore next */
      []
    )
  );
  number = computed(
    () => this.mission.chambers.findIndex((c) => c.id === this.chamber().id) + 1,
    ...ngDevMode ? [{ debugName: "number" }] : (
      /* istanbul ignore next */
      []
    )
  );
  panel = signal(
    "inspect",
    ...ngDevMode ? [{ debugName: "panel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  audit = computed(
    () => buildGalleryAudit(this.engine()),
    ...ngDevMode ? [{ debugName: "audit" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentEncounters = computed(
    () => (this.mission.encounters ?? []).filter((e) => e.chamberIds.includes(this.chamber().id)),
    ...ngDevMode ? [{ debugName: "currentEncounters" }] : (
      /* istanbul ignore next */
      []
    )
  );
  availableEncounters = computed(
    () => (this.mission.encounters ?? []).filter((e) => e.chamberIds.some((id) => id === this.chamber().id || this.engine().cleared.includes(id))),
    ...ngDevMode ? [{ debugName: "availableEncounters" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeEncounter = computed(
    () => this.mission.encounters?.find((e) => e.id === this.engine().activeEncounterId),
    ...ngDevMode ? [{ debugName: "activeEncounter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encounterState = computed(
    () => this.activeEncounter() ? this.engine().encounters[this.activeEncounter().id] : void 0,
    ...ngDevMode ? [{ debugName: "encounterState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encounterReturnPanel = "inspect";
  returnToWorkspace = false;
  selectedPainting = signal(
    "",
    ...ngDevMode ? [{ debugName: "selectedPainting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  painting = computed(
    () => this.chamber().paintings.find((p) => p.id === this.selectedPainting()),
    ...ngDevMode ? [{ debugName: "painting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hotspot = signal(
    "",
    ...ngDevMode ? [{ debugName: "hotspot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  category = signal(
    "",
    ...ngDevMode ? [{ debugName: "category" }] : (
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
  ready = signal(
    false,
    ...ngDevMode ? [{ debugName: "ready" }] : (
      /* istanbul ignore next */
      []
    )
  );
  artError = signal(
    "",
    ...ngDevMode ? [{ debugName: "artError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reducedMotion = signal(
    globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    ...ngDevMode ? [{ debugName: "reducedMotion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  replayIndex = signal(
    null,
    ...ngDevMode ? [{ debugName: "replayIndex" }] : (
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
  currentLock = computed(
    () => this.engine().activeLocks[0],
    ...ngDevMode ? [{ debugName: "currentLock" }] : (
      /* istanbul ignore next */
      []
    )
  );
  displaySnapshot = computed(
    () => this.replayIndex() === null ? this.engine().snapshot() : this.engine().events[this.replayIndex()]?.snapshot ?? this.engine().snapshot(),
    ...ngDevMode ? [{ debugName: "displaySnapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  displayChamber = computed(
    () => this.mission.chambers.find((c) => c.id === this.displaySnapshot().chamberId),
    ...ngDevMode ? [{ debugName: "displayChamber" }] : (
      /* istanbul ignore next */
      []
    )
  );
  categories = [{ id: "timeline", label: "Wrong timeline", symbol: "\u25F7" }, { id: "animal-plant", label: "Wrong animal / plant", symbol: "\u2726" }, { id: "people", label: "Wrong group of people", symbol: "\u2302" }, { id: "technology", label: "Wrong technology", symbol: "\u2699" }];
  groups = ["Timeline", "People", "Technology", "Exchange", "Routes", "Mathematics"];
  phaseText = computed(
    () => ({ recon: "Inspect the paintings", fraud: "Investigate the fraud", recovery: "Repair the mechanism", mechanism: "Operate the passage", unlocked: "Passage unlocked", extracted: "Collection recovered" })[this.engine().phase],
    ...ngDevMode ? [{ debugName: "phaseText" }] : (
      /* istanbul ignore next */
      []
    )
  );
  responses = [];
  lockDrafts = /* @__PURE__ */ new Map();
  lockWorkspace;
  stage;
  dialog;
  scene;
  loader = inject(GALLERY_SCENE_LOADER);
  disposed = false;
  previousFocus;
  constructor() {
    this.responses = this.mission.defensePrompts.map((_, i) => this.engine().defense[i] ?? "");
    inject(DestroyRef).onDestroy(() => {
      this.disposed = true;
      this.scene?.destroy();
    });
  }
  async ngAfterViewInit() {
    await this.loadScene();
    if (!this.disposed && this.activeEncounter())
      this.open("encounter");
  }
  async loadScene() {
    this.ready.set(false);
    this.artError.set("");
    this.scene?.destroy();
    try {
      const { mountGallery } = await this.loader();
      if (this.disposed)
        return;
      this.scene = mountGallery(this.stage.nativeElement, this.mission, () => {
        const snapshot = this.displaySnapshot();
        const latest = (type) => this.mission.locks.filter((l) => l.type === type && snapshot.mechanisms[l.id]).at(-1);
        const angle = latest("rotation"), load = latest("cargo"), distance = latest("measurement");
        return { snapshot, interactive: !this.dialog.nativeElement.open && this.replayIndex() === null, reducedMotion: this.reducedMotion(), previewAngle: angle ? snapshot.mechanisms[angle.id].setting ?? 0 : 0, previewLoad: load ? cargoMass(load, snapshot.mechanisms[load.id].selected ?? []) : 0, previewDistance: distance ? snapshot.mechanisms[distance.id].setting ?? 0 : 0 };
      }, (id) => {
        if (!this.dialog.nativeElement.open && this.replayIndex() === null)
          this.inspect(id);
      }, () => this.ready.set(true), (message) => this.artError.set(message));
    } catch {
      this.artError.set("The gallery could not start. Reload the artwork to retry.");
    }
  }
  send(command) {
    const accepted = this.runtime.send(command);
    if (accepted)
      this.feedback.set(this.engine().events.at(-1)?.message ?? "");
    else
      this.feedback.set(this.runtime.restoreBlocked() ? "Resolve the saved-practice warning before continuing." : "Inspect a detail first, then complete the current mechanism to continue.");
    return accepted;
  }
  inspect(id) {
    this.selectedPainting.set(id);
    this.hotspot.set("");
    this.category.set("");
    this.zoom.set(false);
    this.feedback.set("");
    this.open("inspect");
  }
  inspectHotspot(id) {
    this.hotspot.set(id);
    this.send({ type: "inspect", paintingId: this.selectedPainting(), hotspotId: id });
  }
  choose() {
    if (!this.ready() || this.artError() || !this.send({ type: "choose", paintingId: this.selectedPainting() }))
      return;
    if (this.engine().phase === "mechanism")
      this.open("lock");
  }
  classify() {
    if (this.category() && this.send({ type: "classify", category: this.category(), hotspotId: this.hotspot() }) && this.engine().phase === "recovery")
      this.open("lock");
  }
  operate(answer) {
    const lock = this.currentLock();
    if (!lock || !this.send({ type: "operate", lockId: lock.id, answer }))
      return;
    this.lockDrafts.delete(lock.id);
    if (this.engine().phase === "recon" || this.engine().phase === "unlocked")
      this.close();
    else
      this.focusHeading();
  }
  continue() {
    if (this.send({ type: "continue" })) {
      this.selectedPainting.set("");
      this.hotspot.set("");
      if (this.engine().phase === "extracted")
        this.open("dossier");
      else
        this.focusStage();
    }
  }
  resume() {
    if (this.engine().phase === "fraud")
      this.inspect(this.engine().paintingId);
    else
      this.open(this.engine().phase === "extracted" ? "dossier" : "lock");
  }
  returnFromAudit() {
    if (this.engine().phase === "recon" || this.engine().phase === "unlocked")
      this.close();
    else
      this.resume();
  }
  enterEncounter(id) {
    this.encounterReturnPanel = this.panel();
    this.returnToWorkspace = this.dialog.nativeElement.open;
    if (this.send({ type: "encounter", encounterId: id, action: { type: "enter" } }))
      this.open("encounter");
  }
  encounterAction(action) {
    const encounter = this.activeEncounter();
    if (encounter)
      this.send({ type: "encounter", encounterId: encounter.id, action });
  }
  leaveEncounter() {
    this.encounterAction({ type: "exit" });
    if (this.returnToWorkspace)
      this.open(this.encounterReturnPanel === "encounter" ? "audit" : this.encounterReturnPanel);
    else {
      this.panel.set("inspect");
      this.close();
    }
  }
  cancel(event) {
    event.preventDefault();
    this.close();
  }
  open(panel) {
    if (this.panel() === "lock" && panel !== "lock" && this.lockWorkspace) {
      this.lockDrafts.set(this.lockWorkspace.lock().id, structuredClone(this.lockWorkspace.answer()));
    }
    this.panel.set(panel);
    if (panel === "replay")
      this.replayIndex.set(Math.max(0, this.engine().events.length - 1));
    else
      this.replayIndex.set(null);
    if (!this.dialog.nativeElement.open) {
      this.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : void 0;
      this.dialog.nativeElement.showModal();
    }
    this.focusHeading();
  }
  close() {
    if (this.panel() === "encounter") {
      this.leaveEncounter();
      return;
    }
    this.dialog.nativeElement.close();
    this.closed();
  }
  closed() {
    if (this.activeEncounter()) {
      this.encounterAction({ type: "exit" });
      this.panel.set("inspect");
    }
    this.replayIndex.set(null);
    this.previousFocus?.focus({ preventScroll: true });
  }
  focusHeading() {
    setTimeout(() => {
      if (!this.disposed && this.dialog.nativeElement.open)
        this.dialog.nativeElement.querySelector("h2")?.focus({ preventScroll: true });
    });
  }
  focusStage() {
    setTimeout(() => {
      if (!this.disposed)
        this.stage.nativeElement.focus({ preventScroll: true });
    });
  }
  toggleEvidence(event, id) {
    if (event.target.open && !this.engine().evidenceRead.includes(id))
      this.send({ type: "read", evidenceId: id });
  }
  hasInspected(painting) {
    return !!this.engine().inspections[painting.id]?.length;
  }
  passage(painting) {
    return ["I", "II", "III"][this.chamber().paintings.indexOf(painting)] ?? "";
  }
  artPosition(painting) {
    return `${painting.artFrame % 3 * 50}% ${Math.floor(painting.artFrame / 3) * 50}%`;
  }
  saveDefense() {
    this.send({ type: "defend", responses: this.responses });
  }
  reset() {
    this.lockDrafts.clear();
    this.runtime.reset();
    this.responses = this.mission.defensePrompts.map(() => "");
    this.feedback.set("A new practice is ready.");
    this.close();
    this.focusStage();
  }
  time(seconds) {
    return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
  }
  exportDossier(format) {
    const dossier = this.engine().dossier();
    const content = format === "json" ? JSON.stringify(dossier, null, 2) : [
      "# Historical Authentication Dossier",
      `
${this.mission.title} \xB7 ${this.mission.projectVersion}`,
      `
Local practice \xB7 ${dossier.complete ? "Collection recovered" : "In progress"}`,
      "\n## Authenticated paintings",
      ...dossier.authenticPaintings.map((p) => `- ${p.chamberId}: ${p.painting?.title} \u2014 ${p.painting?.caption}`),
      "\n## Frauds identified",
      ...dossier.frauds.map((p) => `- ${p.title} \xB7 ${p.category}: ${p.explanation}`),
      "\n## Confirmed evidence",
      ...dossier.confirmedEvidence.map((e) => `- **${e.category}: ${e.title}.** ${e.text} [${e.sourceTitle}](${e.sourceUrl})`),
      "\n## Running fraud-clue list",
      ...dossier.clueLog.length ? dossier.clueLog.flatMap((c) => [
        `
### ${c.chamber} \xB7 Passage ${c.passage} \xB7 ${c.title}`,
        c.status,
        c.caption,
        ...c.details.map((d) => `- **${d.label}:** ${d.detail}`),
        ...c.explanation ? [`
**${c.category}:** ${c.explanation}`] : [],
        ...c.recovery ? [`Recovery: ${c.recovery.title} \xB7 ${c.recovery.complete ? "Complete" : "Pending"}`] : [],
        ...c.evidence.map((e) => `- Reference: [${e.title}](${e.sourceUrl})`)
      ]) : ["No clues inspected yet."],
      "\n## Encounter records",
      ...dossier.encounterRecords.flatMap((e) => [
        `
### ${e.title}`,
        e.attribution,
        ...e.chapters.map((c) => `- Account opened: ${c.title} \xB7 ${c.speaker}`),
        ...e.questions.map((q) => `- Question: ${q.title}
  ${q.speaker}: ${q.text}`),
        ...e.observations.map((o) => `- Observation: ${o.label} \u2014 ${o.text}`),
        ...e.insight ? [`Insight: ${e.insight.explanation}`, `Source: [${e.insight.source?.title}](${e.insight.source?.sourceUrl})`] : ["Insight not yet recorded."]
      ]),
      "\n## Vault audit",
      ...dossier.vaultAudit.route.map((r) => `- [${r.complete ? "x" : " "}] ${r.title}${r.current ? " \xB7 Current gallery" : ""}`),
      `
### Current gallery: ${this.chamber().title}`,
      ...dossier.vaultAudit.steps.map((s) => `- [${s.complete ? "x" : " "}] ${s.title}`),
      "\n### Passage mechanisms",
      ...dossier.vaultAudit.locks.map((l) => `- [${l.complete ? "x" : " "}] ${l.title}${l.current ? " \xB7 Current mechanism" : ""}`),
      "\n## Route",
      dossier.route.join(" \u2192 "),
      "\n## Mechanism attempts",
      ...dossier.attempts.map((e) => `- ${this.time(e.elapsed)} \xB7 ${e.message}`),
      "\n## Defense",
      ...dossier.defense.flatMap((d) => [`
### ${d.prompt}`, d.response || "(Not yet recorded)"])
    ].join("\n");
    const url = URL.createObjectURL(new Blob([content], { type: format === "json" ? "application/json" : "text/markdown;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${this.mission.projectId}-authentication-dossier.${format}`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  static \u0275fac = function GalleryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GalleryComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GalleryComponent, selectors: [["app-heist-gallery"]], viewQuery: function GalleryComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(AcademicLockComponent, 5)(_c0, 7)(_c1, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.lockWorkspace = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.stage = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.dialog = _t.first);
    }
  }, decls: 101, vars: 29, consts: [["stage", ""], ["dialog", ""], [1, "heist-gallery"], [1, "mission-bar"], ["routerLink", "/", "aria-label", "Back to projects", 1, "back"], [1, "brand-mark"], [1, "mission-name"], [1, "practice"], [3, "click"], [1, "dossier-button", 3, "click"], ["role", "alert", 1, "warning"], [1, "gallery-heading"], [1, "eyebrow"], [1, "setting"], ["aria-label", "Clue guidance and audit", 1, "audit-tools"], ["aria-label", "Living scene", 1, "scene-invitation"], ["aria-label", "Interactive historical gallery", 1, "world"], ["tabindex", "-1", "role", "img", 1, "phaser-stage"], [1, "world-label"], [1, "status-dot"], ["role", "status", 1, "loading"], ["role", "alert", 1, "loading", "error"], ["aria-label", "Inspect a painting above its passage", 1, "painting-controls"], [3, "disabled", "confirmed-fraud"], ["aria-label", "Current objective", 1, "operation-strip"], [1, "step-icon"], [1, "primary"], [1, "outline"], ["role", "status", 1, "world-feedback"], [1, "route-footer"], [1, "route-heading"], [3, "click", "disabled"], [1, "route-progress"], [3, "current", "complete"], [1, "footer-notes"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["aria-labelledby", "workspace-title", 1, "workspace-dialog", 3, "cancel", "close"], [1, "dialog-top"], ["role", "status", 1, "dialog-feedback"], ["alt", "", 3, "src"], [1, "primary", 3, "click", "disabled"], [1, "primary", 3, "click"], [1, "outline", 3, "click"], ["aria-label", "Close workspace", 3, "click"], ["id", "workspace-title", "tabindex", "-1", 1, "encounter-title"], [3, "definition", "state", "sources", "reducedMotion"], [3, "action", "leave", "definition", "state", "sources", "reducedMotion"], ["id", "workspace-title", "tabindex", "-1"], [3, "resume", "notebook", "revisit", "audit"], [1, "painting-caption"], [1, "painting-inspection"], ["role", "img", 1, "painting-art"], [1, "hotspot", 3, "inspected", "left", "top"], [1, "zoom-button", 3, "click"], [1, "small-note"], [1, "detail-studies"], [3, "selected"], [1, "fraud-panel"], [1, "fraud-confirmed"], [1, "primary", "full", 3, "disabled"], [1, "primary", "full"], [1, "text-button", 3, "click"], [1, "hotspot", 3, "click"], [1, "fraud-categories"], [1, "primary", "full", 3, "click", "disabled"], [1, "primary", "full", 3, "click"], [1, "lock-progress"], [3, "lock", "saved"], [3, "operate", "lock", "saved"], [1, "notebook-group"], [1, "text-button"], [3, "toggle"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], [1, "replay-slider"], ["type", "range", "min", "0", "aria-label", "Replay decision", 3, "ngModelChange", "max", "ngModel"], ["role", "status", 1, "replay-current"], [1, "event-list"], [1, "dossier-stats"], [1, "export-actions"], [1, "new-practice"], [1, "record-row"], [1, "defense-label"], ["rows", "3", "maxlength", "4000", 3, "ngModelChange", "blur", "ngModel"]], template: function GalleryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 2)(1, "header", 3)(2, "a", 4);
      \u0275\u0275text(3, "\u2190 ");
      \u0275\u0275elementStart(4, "span");
      \u0275\u0275text(5, "PROJECTS");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "span", 5);
      \u0275\u0275text(7, "\u2316");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 6)(9, "strong");
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "span");
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "span", 7);
      \u0275\u0275text(14, "LOCAL PRACTICE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "button", 8);
      \u0275\u0275listener("click", function GalleryComponent_Template_button_click_15_listener() {
        return ctx.open("notes");
      });
      \u0275\u0275text(16, "\u25A4 ");
      \u0275\u0275elementStart(17, "span");
      \u0275\u0275text(18, "Field notebook");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "b");
      \u0275\u0275text(20);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "button", 9);
      \u0275\u0275listener("click", function GalleryComponent_Template_button_click_21_listener() {
        return ctx.open("dossier");
      });
      \u0275\u0275text(22, "Dossier \u2197");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(23, GalleryComponent_Conditional_23_Template, 4, 2, "div", 10);
      \u0275\u0275elementStart(24, "section", 11)(25, "div")(26, "p", 12);
      \u0275\u0275text(27, "ACADEMIC HEIST ");
      \u0275\u0275elementStart(28, "span");
      \u0275\u0275text(29, " / ");
      \u0275\u0275elementEnd();
      \u0275\u0275text(30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "h1");
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "p");
      \u0275\u0275text(34);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 13)(36, "span");
      \u0275\u0275text(37, "THE SCENE CLAIMS");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "strong");
      \u0275\u0275text(39);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "small");
      \u0275\u0275text(41);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(42, "nav", 14)(43, "button", 8);
      \u0275\u0275listener("click", function GalleryComponent_Template_button_click_43_listener() {
        return ctx.open("audit");
      });
      \u0275\u0275text(44, "How clues work & vault audit \u2192");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "span");
      \u0275\u0275text(46);
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(47, GalleryComponent_For_48_Template, 11, 4, "section", 15, _forTrack02);
      \u0275\u0275elementStart(49, "section", 16);
      \u0275\u0275element(50, "div", 17, 0);
      \u0275\u0275elementStart(52, "div", 18);
      \u0275\u0275element(53, "span", 19);
      \u0275\u0275text(54);
      \u0275\u0275elementStart(55, "small");
      \u0275\u0275text(56);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(57, GalleryComponent_Conditional_57_Template, 4, 0, "div", 20);
      \u0275\u0275conditionalCreate(58, GalleryComponent_Conditional_58_Template, 4, 1, "div", 21);
      \u0275\u0275elementStart(59, "div", 22);
      \u0275\u0275repeaterCreate(60, GalleryComponent_For_61_Template, 7, 6, "button", 23, _forTrack02);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "section", 24)(63, "div")(64, "span", 25);
      \u0275\u0275text(65);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "p")(67, "strong");
      \u0275\u0275text(68);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "span");
      \u0275\u0275text(70);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(71, GalleryComponent_Conditional_71_Template, 2, 1, "button", 26)(72, GalleryComponent_Conditional_72_Template, 2, 1, "button", 26)(73, GalleryComponent_Conditional_73_Template, 2, 0, "button", 27);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(74, GalleryComponent_Conditional_74_Template, 2, 1, "p", 28);
      \u0275\u0275elementStart(75, "footer", 29)(76, "div", 30)(77, "span");
      \u0275\u0275text(78, "THE RECOVERY ROUTE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "button", 31);
      \u0275\u0275listener("click", function GalleryComponent_Template_button_click_79_listener() {
        return ctx.open("replay");
      });
      \u0275\u0275text(80, "View replay \u2197");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(81, "ol", 32);
      \u0275\u0275repeaterCreate(82, GalleryComponent_For_83_Template, 5, 7, "li", 33, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "div", 34)(85, "span");
      \u0275\u0275text(86, "Illustrated reconstructions with inspectable detail studies. \u201CAuthentic\u201D means the scene fits its historical claim.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "label")(88, "input", 35);
      \u0275\u0275listener("ngModelChange", function GalleryComponent_Template_input_ngModelChange_88_listener($event) {
        return ctx.reducedMotion.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275text(89, " Reduce motion");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(90, "dialog", 36, 1);
      \u0275\u0275listener("cancel", function GalleryComponent_Template_dialog_cancel_90_listener($event) {
        return ctx.cancel($event);
      })("close", function GalleryComponent_Template_dialog_close_90_listener() {
        return ctx.closed();
      });
      \u0275\u0275conditionalCreate(92, GalleryComponent_Conditional_92_Template, 5, 1, "div", 37);
      \u0275\u0275conditionalCreate(93, GalleryComponent_Case_93_Template, 3, 2)(94, GalleryComponent_Case_94_Template, 3, 1)(95, GalleryComponent_Case_95_Template, 1, 1)(96, GalleryComponent_Case_96_Template, 13, 5)(97, GalleryComponent_Case_97_Template, 11, 2)(98, GalleryComponent_Case_98_Template, 5, 1)(99, GalleryComponent_Case_99_Template, 43, 6);
      \u0275\u0275conditionalCreate(100, GalleryComponent_Conditional_100_Template, 2, 1, "p", 38);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_30_0;
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.mission.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.mission.subtitle);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.engine().facts.length);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.runtime.warning() ? 23 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate2(" CHAMBER ", ctx.number().toString().padStart(2, "0"), " OF ", ctx.mission.chambers.length);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.displayChamber().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.displayChamber().briefing);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.displayChamber().date);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.displayChamber().location);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2("", ctx.audit().fraudCount, " frauds identified \xB7 ", ctx.audit().sealedCount, " sealed");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.currentEncounters());
      \u0275\u0275advance(3);
      \u0275\u0275attribute("aria-label", ctx.displayChamber().title + ": three paintings above their passages. Use the painting buttons below for keyboard inspection.");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.replayIndex() !== null ? "REPLAY \xB7 " + ctx.phaseText() : ctx.phaseText());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.engine().solved.length, " mechanisms aligned");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.ready() && !ctx.artError() ? 57 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.artError() ? 58 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.chamber().paintings);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.engine().phase === "unlocked" || ctx.engine().phase === "extracted" ? "\u2713" : "\u2316");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.phaseText());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.engine().phase === "recon" ? "Three paintings. One authentic scene. Inspect a detail, consult the evidence, then choose its passage." : ctx.engine().phase === "fraud" ? "Identify the category and the specific detail that makes this scene impossible." : ctx.engine().phase === "unlocked" ? "Your answer operated the mechanism. The open passage is ready." : ctx.engine().phase === "extracted" ? "The collection is safe. Review the evidence and defend your decisions." : "Use your evidence to physically align the lock. Each setting changes the mechanism.");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.engine().phase === "unlocked" ? 71 : ctx.engine().phase !== "recon" ? 72 : 73);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.feedback() ? 74 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", !ctx.engine().events.length);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.mission.chambers);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngModel", ctx.reducedMotion());
      \u0275\u0275control();
      \u0275\u0275advance(2);
      \u0275\u0275classProp("encounter-workspace", ctx.panel() === "encounter");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.panel() !== "encounter" ? 92 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_30_0 = ctx.panel()) === "encounter" ? 93 : tmp_30_0 === "audit" ? 94 : tmp_30_0 === "inspect" ? 95 : tmp_30_0 === "lock" ? 96 : tmp_30_0 === "notes" ? 97 : tmp_30_0 === "replay" ? 98 : tmp_30_0 === "dossier" ? 99 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.feedback() && ctx.panel() !== "replay" && ctx.panel() !== "encounter" ? 100 : -1);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, RouterLink, AcademicLockComponent, GalleryAuditComponent, EncounterComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  background: #102824;\n  color: #eee7d4;\n  min-height: 100vh;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: inherit;\n  background: #253e36;\n  border: 1px solid #617862;\n  border-radius: 6px;\n  padding: 10px 15px;\n  min-height: 42px;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\na[_ngcontent-%COMP%] {\n  color: #e9ce93;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #f0d08a;\n  outline-offset: 4px;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.heist-gallery[_ngcontent-%COMP%] {\n  max-width: 1800px;\n  margin: auto;\n}\n.mission-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 18px;\n  padding: 18px 34px;\n  border-bottom: 1px solid rgba(73, 99, 83, 0.4);\n  background: #112923;\n}\n.back[_ngcontent-%COMP%] {\n  text-decoration: none;\n  font-size: 13px;\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  letter-spacing: 1.3px;\n}\n.brand-mark[_ngcontent-%COMP%] {\n  font-size: 36px;\n  color: #d8bc7a;\n  margin-left: 15px;\n}\n.mission-name[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n}\n.mission-name[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 20px Georgia, serif;\n}\n.mission-name[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #a5bdae;\n  letter-spacing: 0.5px;\n}\n.practice[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 9px;\n  letter-spacing: 1.6px;\n  color: #b2c9b9;\n  white-space: nowrap;\n}\n.mission-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n  background: transparent;\n  border-color: #4f6958;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.mission-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  background: #d4bd82;\n  color: #183a2e;\n  border-radius: 50%;\n  min-width: 20px;\n  padding: 3px;\n  font-size: 10px;\n}\n.gallery-heading[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 30px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 28px 44px 26px;\n  background:\n    radial-gradient(\n      ellipse at 60% 0,\n      rgba(40, 70, 53, 0.3333333333),\n      transparent);\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 2.1px;\n  color: #cfb77f;\n  margin-bottom: 12px;\n}\n.eyebrow[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 0 12px;\n  color: #7a947b;\n}\nh1[_ngcontent-%COMP%] {\n  font: 400 clamp(27px, 3.2vw, 42px)/1.1 Georgia, serif;\n  letter-spacing: -0.5px;\n  margin-bottom: 12px;\n}\n.gallery-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:last-child {\n  font-size: 13px;\n  line-height: 1.65;\n  color: #b8c9b9;\n  max-width: 690px;\n  margin-bottom: 0;\n}\n.setting[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n  text-align: right;\n  min-width: 200px;\n}\n.setting[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 1.8px;\n  color: #92aa96;\n}\n.setting[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 25px Georgia;\n  color: #e5cf9a;\n}\n.setting[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #b3c6b5;\n}\n.world[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 1.9;\n  min-height: 480px;\n  max-height: 800px;\n  overflow: hidden;\n  background: #0d211d;\n  border-top: 1px solid #48624d;\n  border-bottom: 1px solid #48624d;\n}\n.phaser-stage[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: -12% 0 -10%;\n  width: 100%;\n  height: 122%;\n}\n.world-label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 18px;\n  left: 24px;\n  border: 1px solid #6b7955;\n  background: rgba(17, 43, 35, 0.9019607843);\n  border-radius: 5px;\n  padding: 10px 12px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 11px;\n  color: #e1d4ad;\n}\n.world-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: 14px;\n  color: #a8c1ab;\n  font-size: 10px;\n}\n.status-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #c7be7d;\n  box-shadow: 0 0 10px #dfd4a5;\n}\n.painting-controls[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 20px;\n  left: 12%;\n  right: 12%;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 7%;\n}\n.painting-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: rgba(16, 43, 37, 0.937254902);\n  border: 1px solid #b3a36e;\n  border-radius: 5px;\n  display: grid;\n  text-align: left;\n  gap: 8px;\n  padding: 13px 17px;\n  box-shadow: 0 8px 24px rgba(6, 17, 12, 0.4);\n  transition: transform 0.2s, background 0.2s;\n}\n.painting-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: #2b4536;\n  transform: translateY(-3px);\n}\n.painting-controls[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 1.7px;\n  color: #d6bf82;\n}\n.painting-controls[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 18px Georgia, serif;\n}\n.painting-controls[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #bbcdb5;\n}\n.painting-controls[_ngcontent-%COMP%]   .confirmed-fraud[_ngcontent-%COMP%] {\n  border-color: #b9866e;\n}\n.operation-strip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 25px;\n  padding: 23px 44px;\n  background: #1b352c;\n}\n.operation-strip[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 18px;\n}\n.step-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  display: grid;\n  place-items: center;\n  font-size: 25px;\n  flex-shrink: 0;\n  border: 1px solid #8c8357;\n  border-radius: 50%;\n  color: #e6c886;\n}\n.operation-strip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  margin: 0;\n}\n.operation-strip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 19px Georgia;\n}\n.operation-strip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #b8cbb7;\n  line-height: 1.55;\n  max-width: 760px;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #e6cb90;\n  color: #123529;\n  border: 1px solid #f1dcad;\n  font-weight: 700;\n  font-size: 12px;\n  padding: 13px 18px;\n  white-space: normal;\n}\n.operation-strip[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.outline[_ngcontent-%COMP%] {\n  border-color: #a89c6b;\n  background: transparent;\n  font-size: 12px;\n}\n.full[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 18px;\n}\n.world-feedback[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #e1d8ad;\n  padding: 12px 44px;\n  margin: 0;\n  border-top: 1px solid #4b684f;\n}\n.route-footer[_ngcontent-%COMP%] {\n  padding: 25px 44px 20px;\n}\n.route-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 19px;\n}\n.route-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 2px;\n  color: #a8c0a8;\n}\n.route-heading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 4px 0;\n  min-height: 30px;\n  background: transparent;\n  border: 0;\n  font-size: 11px;\n  color: #d4c390;\n}\n.route-progress[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  gap: 10px;\n  list-style: none;\n  padding: 0;\n  margin: 0 0 24px;\n}\n.route-progress[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  gap: 9px;\n  align-content: start;\n  color: #839d88;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.route-progress[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before {\n  content: "";\n  position: absolute;\n  top: 14px;\n  left: 35px;\n  right: 0;\n  height: 1px;\n  background: #45634c;\n}\n.route-progress[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child:before {\n  display: none;\n}\n.route-progress[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  width: 29px;\n  height: 29px;\n  display: grid;\n  place-items: center;\n  border: 1px solid #536d53;\n  border-radius: 50%;\n  font: 11px Arial;\n  background: #132d24;\n}\n.route-progress[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%] {\n  color: #e8d49a;\n}\n.route-progress[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: #18362a;\n  background: #ddc183;\n  border-color: #f2dba2;\n  box-shadow: 0 0 0 4px rgba(178, 152, 84, 0.1333333333);\n}\n.route-progress[_ngcontent-%COMP%]   .complete[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  background: #416c4b;\n  color: #e8f0cc;\n}\n.route-progress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  max-width: 115px;\n}\n.footer-notes[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 25px;\n  font-size: 10px;\n  color: #89a48d;\n  border-top: 1px solid #49624b;\n  padding-top: 17px;\n  line-height: 1.5;\n}\n.footer-notes[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  max-width: 660px;\n}\n.footer-notes[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  white-space: nowrap;\n}\n.footer-notes[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  accent-color: #c8b378;\n}\n.loading[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 18px;\n  background: rgba(14, 39, 36, 0.9333333333);\n  color: #e8d5a7;\n  font: 20px Georgia;\n}\n.loading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 50px;\n}\n.error[_ngcontent-%COMP%] {\n  font: 15px Arial;\n  padding: 40px;\n  text-align: center;\n}\n.warning[_ngcontent-%COMP%] {\n  padding: 15px 34px;\n  background: #67482a;\n  color: #fff0d2;\n  font-size: 13px;\n}\n.warning[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: 12px;\n  font-size: 12px;\n}\n.workspace-dialog[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 16px 16px 16px auto;\n  margin: 0;\n  width: min(540px, 100vw - 32px);\n  max-height: calc(100dvh - 32px);\n  height: calc(100dvh - 32px);\n  max-width: none;\n  border: 1px solid #9c9569;\n  border-radius: 12px;\n  background: #172f29;\n  color: #e9e4d0;\n  padding: 24px 28px;\n  box-shadow: -16px 0 90px rgba(6, 29, 25, 0.6666666667);\n  overflow: auto;\n  scrollbar-width: thin;\n  scrollbar-color: #768263 #172f29;\n}\n.workspace-dialog[_ngcontent-%COMP%]::backdrop {\n  background: rgba(6, 28, 22, 0.4);\n}\n.dialog-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\n.dialog-top[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 1.9px;\n  color: #c5b57f;\n}\n.dialog-top[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 32px;\n  width: 32px;\n  padding: 0;\n  background: transparent;\n  border: 1px solid #536b51;\n  border-radius: 50%;\n  font-size: 12px;\n}\n.workspace-dialog[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font: 400 30px/1.15 Georgia, serif;\n  margin-bottom: 14px;\n  outline: none;\n}\n.workspace-dialog[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font: 20px Georgia;\n  margin-top: 22px;\n}\n.workspace-dialog[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #b9cdb9;\n  line-height: 1.65;\n}\n.workspace-dialog[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.painting-caption[_ngcontent-%COMP%] {\n  border-left: 2px solid #aa975f;\n  padding-left: 13px;\n}\n.painting-inspection[_ngcontent-%COMP%] {\n  position: relative;\n  height: 300px;\n  margin: 22px 0 12px;\n  border: 8px ridge #ac9258;\n  overflow: hidden;\n  background: #102821;\n  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.4);\n}\n.painting-art[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-size: 300% 300%;\n  transition: transform 0.25s;\n}\n.zoomed[_ngcontent-%COMP%]   .painting-art[_ngcontent-%COMP%] {\n  transform: scale(1.6);\n  transform-origin: 65% 62%;\n}\n.hotspot[_ngcontent-%COMP%] {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  padding: 3px;\n  width: 32px;\n  min-height: 32px;\n  border: 1px solid #f3dc95;\n  border-radius: 50%;\n  background: rgba(21, 55, 40, 0.937254902);\n  color: #f3d58b;\n  font-size: 20px;\n  box-shadow: 0 0 0 5px rgba(17, 44, 40, 0.4);\n}\n.hotspot.inspected[_ngcontent-%COMP%] {\n  background: #58794c;\n}\n.hotspot[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  position: absolute;\n  left: 50%;\n  top: 35px;\n  transform: translateX(-50%);\n  background: rgba(20, 46, 39, 0.9098039216);\n  border: 1px solid #8a895c;\n  color: #fff0c9;\n  border-radius: 3px;\n  font: 11px Arial;\n  padding: 5px 7px;\n  min-width: 80px;\n  max-width: 155px;\n}\n.zoom-button[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 8px;\n  right: 8px;\n  min-height: 30px;\n  padding: 5px 8px;\n  font-size: 10px;\n  background: rgba(25, 56, 43, 0.9215686275);\n}\n.small-note[_ngcontent-%COMP%] {\n  font-size: 11px !important;\n  color: #b5c6ad !important;\n}\n.detail-studies[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 9px;\n  margin: 15px 0;\n}\n.detail-studies[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  text-align: left;\n  display: grid;\n  gap: 7px;\n  background: #243d30;\n  padding: 13px;\n}\n.detail-studies[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 1.8px;\n  color: #c8be87;\n}\n.detail-studies[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.detail-studies[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n}\n.selected[_ngcontent-%COMP%] {\n  border-color: #e3c889 !important;\n  background: #3a5038 !important;\n}\n.text-button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 0;\n  color: #dbc68b;\n  font-size: 12px;\n  text-decoration: underline;\n  text-underline-offset: 4px;\n  padding-left: 0;\n  margin-top: 12px;\n}\n.fraud-panel[_ngcontent-%COMP%] {\n  border-top: 1px solid #687452;\n  padding-top: 1px;\n}\n.fraud-categories[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.fraud-categories[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  text-align: left;\n  font-size: 12px;\n}\n.fraud-categories[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: #d9be85;\n}\n.fraud-confirmed[_ngcontent-%COMP%] {\n  padding: 13px;\n  background: rgba(121, 89, 64, 0.2);\n  border-left: 3px solid #c59e74;\n  color: #e6ccb0 !important;\n}\n.lock-progress[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 9px;\n  letter-spacing: 1px;\n  color: #c2be8c;\n  background: #203d30;\n  padding: 12px;\n  margin: 20px 0;\n}\n.lock-progress[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-weight: normal;\n}\n.dialog-feedback[_ngcontent-%COMP%] {\n  border: 1px solid #797e58;\n  background: #293f2d;\n  color: #e6d7a5 !important;\n  padding: 12px;\n  border-radius: 5px;\n  margin: 20px 0 0;\n}\n.notebook-group[_ngcontent-%COMP%]    > h3[_ngcontent-%COMP%] {\n  color: #dfca93;\n  border-bottom: 1px solid #60704e;\n  padding-bottom: 9px;\n}\n.notebook-group[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  border: 1px solid #526c4e;\n  border-radius: 5px;\n  margin: 9px 0;\n  padding: 12px;\n  background: #1d382b;\n}\n.notebook-group[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-size: 13px;\n  line-height: 1.5;\n}\n.notebook-group[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #d3c08a;\n  margin-right: 8px;\n}\n.notebook-group[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  font-size: 8px;\n  margin-left: 9px;\n  color: #bcd3a6;\n}\n.notebook-group[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 13px 0;\n}\n.replay-slider[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n  font-size: 12px;\n  color: #d5c38b;\n}\n.replay-slider[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  accent-color: #e5c785;\n}\n.replay-current[_ngcontent-%COMP%] {\n  border-left: 3px solid #ceb477;\n  padding: 12px;\n  background: #243e2e;\n}\n.event-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  display: grid;\n  gap: 7px;\n}\n.event-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  text-align: left;\n  font-size: 12px;\n  line-height: 1.6;\n  width: 100%;\n}\n.event-list[_ngcontent-%COMP%]   time[_ngcontent-%COMP%] {\n  color: #dfc784;\n  font-size: 10px;\n  padding-top: 3px;\n  flex-shrink: 0;\n}\n.dossier-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n  margin: 22px 0;\n}\n.dossier-stats[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  padding: 16px 10px;\n  border: 1px solid #5d7250;\n  text-align: center;\n}\n.dossier-stats[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 29px Georgia;\n  color: #e8cd8f;\n}\n.dossier-stats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #b2c9b2;\n}\n.record-row[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 1px solid #405e44;\n  margin: 0;\n}\n.defense-label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 9px;\n  font-size: 12px;\n  line-height: 1.6;\n  margin-bottom: 18px;\n}\n.defense-label[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  width: 100%;\n  border: 1px solid #73825a;\n  border-radius: 5px;\n  background: #10271e;\n  color: #ecdfb5;\n  padding: 12px;\n  line-height: 1.6;\n}\n.export-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin: 25px 0;\n}\n.new-practice[_ngcontent-%COMP%] {\n  border-top: 1px solid #566d4e;\n  padding-top: 15px;\n  font-size: 12px;\n  color: #a9bda7;\n}\n.new-practice[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.new-practice[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n@media (min-width: 1600px) {\n  .world[_ngcontent-%COMP%] {\n    aspect-ratio: 2;\n  }\n}\n@media (max-width: 1000px) {\n  .mission-bar[_ngcontent-%COMP%] {\n    padding: 14px 20px;\n    gap: 12px;\n  }\n  .practice[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .mission-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:first-of-type {\n    margin-left: auto;\n  }\n  .gallery-heading[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n  .world[_ngcontent-%COMP%] {\n    min-height: 450px;\n    aspect-ratio: 1.6;\n  }\n  .phaser-stage[_ngcontent-%COMP%] {\n    inset: 0;\n    height: 100%;\n  }\n  .painting-controls[_ngcontent-%COMP%] {\n    left: 7%;\n    right: 7%;\n    gap: 5%;\n    bottom: 15px;\n  }\n  .painting-controls[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n  .operation-strip[_ngcontent-%COMP%], \n   .route-footer[_ngcontent-%COMP%] {\n    padding: 22px 24px;\n  }\n  .route-progress[_ngcontent-%COMP%] {\n    gap: 9px;\n  }\n  .route-progress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .world-label[_ngcontent-%COMP%] {\n    top: 12px;\n    left: 14px;\n  }\n  .setting[_ngcontent-%COMP%] {\n    min-width: 145px;\n  }\n}\n@media (max-width: 700px) {\n  .brand-mark[_ngcontent-%COMP%], \n   .back[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n   .mission-bar[_ngcontent-%COMP%]   .dossier-button[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .mission-bar[_ngcontent-%COMP%] {\n    gap: 10px;\n    padding: 12px;\n  }\n  .mission-name[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .mission-name[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .mission-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 8px;\n    font-size: 10px;\n    gap: 5px;\n  }\n  .gallery-heading[_ngcontent-%COMP%] {\n    padding: 22px 16px;\n    align-items: flex-start;\n    gap: 10px;\n  }\n  .eyebrow[_ngcontent-%COMP%] {\n    font-size: 8px;\n    letter-spacing: 1.2px;\n  }\n  .eyebrow[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    padding: 0 4px;\n  }\n  .gallery-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:last-child {\n    font-size: 12px;\n  }\n  .setting[_ngcontent-%COMP%] {\n    min-width: 90px;\n    max-width: 115px;\n  }\n  .setting[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .setting[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 8px;\n    letter-spacing: 1px;\n  }\n  .setting[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .world[_ngcontent-%COMP%] {\n    min-height: 390px;\n  }\n  .phaser-stage[_ngcontent-%COMP%] {\n    inset: 0;\n    height: 100%;\n    min-width: 730px;\n    left: 50%;\n    transform: translateX(-50%);\n  }\n  .world-label[_ngcontent-%COMP%] {\n    left: 10px;\n    top: 10px;\n    font-size: 10px;\n  }\n  .world-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .painting-controls[_ngcontent-%COMP%] {\n    left: 8px;\n    right: 8px;\n    gap: 7px;\n    bottom: 10px;\n  }\n  .painting-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 9px;\n    gap: 6px;\n  }\n  .painting-controls[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .painting-controls[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .painting-controls[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .operation-strip[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n    gap: 15px;\n    padding: 20px 16px;\n  }\n  .operation-strip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .route-footer[_ngcontent-%COMP%] {\n    padding: 18px 16px;\n  }\n  .route-progress[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(4, 1fr);\n    row-gap: 16px;\n  }\n  .footer-notes[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .world-feedback[_ngcontent-%COMP%] {\n    padding: 12px 16px;\n  }\n  .workspace-dialog[_ngcontent-%COMP%] {\n    inset: 8px;\n    width: calc(100vw - 16px);\n    height: calc(100dvh - 16px);\n    max-height: calc(100dvh - 16px);\n    padding: 20px;\n  }\n  .workspace-dialog[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n  .painting-inspection[_ngcontent-%COMP%] {\n    height: 290px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    transition: none !important;\n  }\n}\n.world[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n}\n@media (max-width: 700px) {\n  .world[_ngcontent-%COMP%] {\n    aspect-ratio: auto;\n    height: 390px;\n  }\n}\n.audit-tools[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px 20px;\n  padding: 0 44px 20px;\n}\n.audit-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #e8cd94;\n  font-size: 12px;\n}\n.audit-tools[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #b8cbb7;\n  font-size: 12px;\n}\n@media (max-width: 700px) {\n  .audit-tools[_ngcontent-%COMP%] {\n    padding: 0 16px 18px;\n    gap: 10px;\n  }\n}\n.scene-invitation[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 22px;\n  padding: 16px 24px;\n  margin: 0 44px 24px;\n  border: 1px solid #8a9566;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      100deg,\n      #304a34,\n      #182f27);\n}\n.scene-invitation[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 140px;\n  height: 84px;\n  object-fit: cover;\n  border-radius: 5px;\n}\n.scene-invitation[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.scene-invitation[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 1.7px;\n  color: #cfbd87;\n}\n.scene-invitation[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font: 24px Georgia;\n  margin: 5px 0;\n}\n.scene-invitation[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #b8cdb4;\n  font-size: 12px;\n}\n.scene-invitation[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.workspace-dialog.encounter-workspace[_ngcontent-%COMP%] {\n  inset: 16px;\n  width: calc(100vw - 32px);\n  max-width: 1680px;\n  margin: auto;\n  padding: 0;\n  overflow: hidden;\n}\n.encounter-title[_ngcontent-%COMP%] {\n  position: absolute !important;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\n@media (max-width: 700px) {\n  .scene-invitation[_ngcontent-%COMP%] {\n    margin: 0 16px 18px;\n    padding: 14px;\n    gap: 12px;\n    flex-wrap: wrap;\n  }\n  .scene-invitation[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 75px;\n    height: 90px;\n  }\n  .scene-invitation[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .scene-invitation[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 7px;\n    letter-spacing: 1px;\n  }\n  .scene-invitation[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .workspace-dialog.encounter-workspace[_ngcontent-%COMP%] {\n    inset: 8px;\n    width: calc(100vw - 16px);\n  }\n}\n/*# sourceMappingURL=gallery.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GalleryComponent, [{
    type: Component,
    args: [{ selector: "app-heist-gallery", imports: [FormsModule, RouterLink, AcademicLockComponent, GalleryAuditComponent, EncounterComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<main class="heist-gallery">\r
  <header class="mission-bar"><a routerLink="/" class="back" aria-label="Back to projects">\u2190 <span>PROJECTS</span></a><span class="brand-mark">\u2316</span><div class="mission-name"><strong>{{ mission.title }}</strong><span>{{ mission.subtitle }}</span></div><span class="practice">LOCAL PRACTICE</span><button (click)="open('notes')">\u25A4 <span>Field notebook</span><b>{{ engine().facts.length }}</b></button><button (click)="open('dossier')" class="dossier-button">Dossier \u2197</button></header>\r
  @if (runtime.warning()) { <div class="warning" role="alert">{{ runtime.warning() }} @if (runtime.restoreBlocked()) { <button (click)="runtime.reset()">Start a new practice</button> } @else { <button (click)="runtime.retrySave()">Retry save</button><button (click)="exportDossier('json')">Export work</button> }</div> }\r
  <section class="gallery-heading"><div><p class="eyebrow">ACADEMIC HEIST <span> / </span> CHAMBER {{ number().toString().padStart(2, '0') }} OF {{ mission.chambers.length }}</p><h1>{{ displayChamber().title }}</h1><p>{{ displayChamber().briefing }}</p></div><div class="setting"><span>THE SCENE CLAIMS</span><strong>{{ displayChamber().date }}</strong><small>{{ displayChamber().location }}</small></div></section>\r
  <nav class="audit-tools" aria-label="Clue guidance and audit"><button (click)="open('audit')">How clues work &amp; vault audit \u2192</button><span>{{ audit().fraudCount }} frauds identified \xB7 {{ audit().sealedCount }} sealed</span></nav>\r
  @for (encounter of currentEncounters(); track encounter.id) {\r
    <section class="scene-invitation" aria-label="Living scene"><img [src]="encounter.image" alt=""><div><span>ENTER THE WORLD BEHIND THE PAINTING</span><strong>{{ encounter.title }}</strong><p>{{ encounter.invitation }}</p></div><button class="primary" [disabled]="runtime.restoreBlocked()" (click)="enterEncounter(encounter.id)">Step into the scene \u2192</button></section>\r
  }\r
  <section class="world" aria-label="Interactive historical gallery">\r
    <div #stage class="phaser-stage" tabindex="-1" role="img" [attr.aria-label]="displayChamber().title + ': three paintings above their passages. Use the painting buttons below for keyboard inspection.'"></div>\r
    <div class="world-label"><span class="status-dot"></span>{{ replayIndex() !== null ? 'REPLAY \xB7 ' + phaseText() : phaseText() }}<small>{{ engine().solved.length }} mechanisms aligned</small></div>\r
    @if (!ready() && !artError()) { <div class="loading" role="status"><span>\u2316</span>Lighting the gallery\u2026</div> }\r
    @if (artError()) { <div class="loading error" role="alert">{{ artError() }}<button (click)="loadScene()">Reload artwork</button></div> }\r
    <div class="painting-controls" aria-label="Inspect a painting above its passage">\r
      @for (p of chamber().paintings; track p.id) { <button [disabled]="!ready() || !!artError() || runtime.restoreBlocked()" (click)="inspect(p.id)" [class.confirmed-fraud]="engine().frauds.includes(p.id)"><small>PASSAGE {{ passage(p) }}</small><strong>{{ p.title }}</strong><span>{{ engine().frauds.includes(p.id) ? 'Fraud confirmed' : hasInspected(p) ? 'Inspect again \u2197' : 'Inspect painting \u2197' }}</span></button> }\r
    </div>\r
  </section>\r
  <section class="operation-strip" aria-label="Current objective">\r
    <div><span class="step-icon">{{ engine().phase === 'unlocked' || engine().phase === 'extracted' ? '\u2713' : '\u2316' }}</span><p><strong>{{ phaseText() }}</strong><span>{{ engine().phase === 'recon' ? 'Three paintings. One authentic scene. Inspect a detail, consult the evidence, then choose its passage.' : engine().phase === 'fraud' ? 'Identify the category and the specific detail that makes this scene impossible.' : engine().phase === 'unlocked' ? 'Your answer operated the mechanism. The open passage is ready.' : engine().phase === 'extracted' ? 'The collection is safe. Review the evidence and defend your decisions.' : 'Use your evidence to physically align the lock. Each setting changes the mechanism.' }}</span></p></div>\r
    @if (engine().phase === 'unlocked') { <button class="primary" (click)="continue()">{{ chamber().next ? 'Enter next gallery' : 'Recover the collection' }} \u2192</button> }\r
    @else if (engine().phase !== 'recon') { <button class="primary" (click)="resume()">{{ engine().phase === 'fraud' ? 'Investigate fraud' : engine().phase === 'extracted' ? 'Open dossier' : 'Open mechanism' }} \u2192</button> }\r
    @else { <button class="outline" (click)="open('notes')">Consult field notes \u2197</button> }\r
  </section>\r
  @if (feedback()) { <p class="world-feedback" role="status">{{ feedback() }}</p> }\r
  <footer class="route-footer"><div class="route-heading"><span>THE RECOVERY ROUTE</span><button (click)="open('replay')" [disabled]="!engine().events.length">View replay \u2197</button></div><ol class="route-progress">@for (c of mission.chambers; track c.id; let i = $index) { <li [class.current]="chamber().id === c.id" [class.complete]="engine().cleared.includes(c.id)" [attr.aria-current]="chamber().id === c.id ? 'step' : null"><b>{{ engine().cleared.includes(c.id) ? '\u2713' : (i + 1).toString().padStart(2, '0') }}</b><span>{{ c.title }}</span></li> }</ol><div class="footer-notes"><span>Illustrated reconstructions with inspectable detail studies. \u201CAuthentic\u201D means the scene fits its historical claim.</span><label><input type="checkbox" [ngModel]="reducedMotion()" (ngModelChange)="reducedMotion.set($event)"> Reduce motion</label></div></footer>\r
  <dialog #dialog class="workspace-dialog" [class.encounter-workspace]="panel() === 'encounter'" (cancel)="cancel($event)" (close)="closed()" aria-labelledby="workspace-title">\r
    @if (panel() !== 'encounter') { <div class="dialog-top"><span>{{ panel() === 'inspect' ? 'PAINTING INSPECTION' : panel() === 'lock' ? 'ACADEMIC MECHANISM' : panel() === 'notes' ? 'INTELLIGENCE NOTEBOOK' : panel() === 'replay' ? 'OPERATION REPLAY' : panel() === 'audit' ? 'CLUE LOG & VAULT AUDIT' : 'RECOVERY RECORD' }}</span><button (click)="close()" aria-label="Close workspace">\u2715</button></div> }\r
    @switch (panel()) {\r
      @case ('encounter') {\r
        <h2 id="workspace-title" class="encounter-title" tabindex="-1">{{ activeEncounter()?.title }}</h2>\r
        @if (activeEncounter(); as encounter) { @if (encounterState(); as state) { <app-historical-encounter [definition]="encounter" [state]="state" [sources]="mission.evidence" [reducedMotion]="reducedMotion()" (action)="encounterAction($event)" (leave)="leaveEncounter()" /> } }\r
      }\r
      @case ('audit') {\r
        <h2 id="workspace-title" tabindex="-1">Clue log &amp; vault audit</h2>\r
        <app-gallery-audit [audit]="audit()" (resume)="returnFromAudit()" (notebook)="open('notes')" (revisit)="enterEncounter($event)" />\r
      }\r
      @case ('inspect') {\r
        @if (painting(); as p) {\r
          <h2 id="workspace-title" tabindex="-1">Passage {{ passage(p) }} \xB7 {{ p.title }}</h2><p class="painting-caption">{{ p.caption }}</p>\r
          <div class="painting-inspection" [class.zoomed]="zoom()"><div class="painting-art" [style.background-image]="'url(' + p.image + ')'" [style.background-position]="artPosition(p)" role="img" [attr.aria-label]="p.caption"></div>\r
            @for (h of p.hotspots; track h.id) { <button class="hotspot" [class.inspected]="engine().inspections[p.id]?.includes(h.id)" [style.left.%]="h.x" [style.top.%]="h.y" (click)="inspectHotspot(h.id)" [attr.aria-label]="'Inspect ' + h.label">{{ h.symbol }}<span>{{ h.label }}</span></button> }\r
            <button class="zoom-button" (click)="zoom.set(!zoom())" [attr.aria-pressed]="zoom()">{{ zoom() ? '\u2212 Restore view' : '\uFF0B Zoom painting' }}</button>\r
          </div>\r
          <p class="small-note">Inspect the marked detail studies and the setting inscription. Use the field notes to test their claims.</p>\r
          <div class="detail-studies">@for (h of p.hotspots; track h.id) { <button [class.selected]="hotspot() === h.id" (click)="inspectHotspot(h.id)"><span>{{ engine().inspections[p.id]?.includes(h.id) ? '\u2713 INSPECTED' : 'INSPECT DETAIL' }}</span><strong>{{ h.label }}</strong>@if (hotspot() === h.id) { <p>{{ h.detail }}</p> }</button> }</div>\r
          @if (engine().phase === 'fraud' && engine().paintingId === p.id) {\r
            <section class="fraud-panel"><h3>The passage has caught.</h3><p>Which category and inspected detail prove this scene impossible?</p><div class="fraud-categories">@for (c of categories; track c.id) { <button [class.selected]="category() === c.id" [attr.aria-pressed]="category() === c.id" (click)="category.set(c.id)"><span>{{ c.symbol }}</span>{{ c.label }}</button> }</div><p class="small-note">Selected detail: {{ hotspot() ? (p.hotspots[0].id === hotspot() ? p.hotspots[0].label : p.hotspots[1].label) : 'Inspect a detail above' }}</p><button class="primary" [disabled]="!category() || !hotspot()" (click)="classify()">Confirm fraud analysis \u2192</button></section>\r
          } @else if (engine().frauds.includes(p.id)) { <p class="fraud-confirmed">FRAUD CONFIRMED \xB7 {{ p.fraud?.explanation }}</p> }\r
          @else if (engine().phase === 'recon') { <button class="primary full" [disabled]="!hasInspected(p) || !ready() || !!artError()" (click)="choose()">Choose the passage beneath this painting \u2192</button> }\r
          @else { <button class="primary full" (click)="resume()">Return to the active mechanism \u2192</button> }\r
          @for (encounter of currentEncounters(); track encounter.id) { <button class="primary full" [disabled]="runtime.restoreBlocked()" (click)="enterEncounter(encounter.id)">Enter the scene \u2192</button><p class="small-note">{{ encounter.invitation }}</p> }\r
          <button class="text-button" (click)="open('notes')">Consult the field notebook \u2197</button>\r
        }\r
      }\r
      @case ('lock') {\r
        <h2 id="workspace-title" tabindex="-1">{{ engine().phase === 'recovery' ? 'Repair the fraud lock' : chamber().layout === 'vault' ? 'The master vault' : 'Knowledge moves the machinery.' }}</h2>\r
        @if (engine().phase === 'recovery') { <p class="fraud-confirmed">{{ engine().painting?.fraud?.explanation }}</p> }\r
        <div class="lock-progress"><span>{{ engine().phase === 'recovery' ? 'CORRECT THE HISTORICAL ERROR' : 'PASSAGE MECHANISMS' }}</span><b>{{ engine().activeLocks.length }} remaining</b></div>\r
        @if (currentLock(); as lock) { <app-academic-lock [lock]="lock" [saved]="lockDrafts.get(lock.id) ?? engine().mechanisms[lock.id]" (operate)="operate($event)" /> }\r
        <button class="text-button" (click)="open('notes')">Open evidence & field notes \u2197</button>\r
        <button class="text-button" (click)="open('audit')">Review clues &amp; audit steps \u2197</button>\r
      }\r
      @case ('notes') {\r
        <h2 id="workspace-title" tabindex="-1">The field notebook</h2><p>Read the reference notes before committing to a passage. Confirmed facts receive a seal as you authenticate scenes and solve their mechanisms.</p>\r
        <button class="text-button" (click)="open('audit')">Open running fraud-clue list &amp; audit \u2197</button>\r
        @if (availableEncounters().length) { <section class="notebook-group"><h3>Living scenes</h3>@for (encounter of availableEncounters(); track encounter.id) { <button class="text-button" (click)="enterEncounter(encounter.id)">{{ engine().encounters[encounter.id] ? 'Revisit' : 'Enter' }} {{ encounter.title }} \u2197</button> }</section> }\r
        @for (group of groups; track group) { <section class="notebook-group"><h3>{{ group }}</h3>@for (e of mission.evidence; track e.id) { @if (e.category === group) { <details (toggle)="toggleEvidence($event, e.id)"><summary><span>{{ engine().facts.includes(e.id) ? '\u2713' : '\u25C7' }}</span>{{ e.title }}@if (engine().facts.includes(e.id)) { <small>CONFIRMED</small> }</summary><p>{{ e.text }}</p><a [href]="e.sourceUrl" target="_blank" rel="noopener noreferrer">{{ e.sourceTitle }} \u2197</a></details> } }</section> }\r
        @if (engine().phase !== 'recon' && engine().phase !== 'extracted') { <button class="primary full" (click)="resume()">Return to the mechanism \u2192</button> }\r
        @else if (selectedPainting() && engine().phase === 'recon') { <button class="primary full" (click)="open('inspect')">Return to painting \u2192</button> }\r
      }\r
      @case ('replay') {\r
        <h2 id="workspace-title" tabindex="-1">Replay the evidence trail</h2><p>Jump between meaningful decisions. The gallery behind this panel shows the mechanisms and route at that moment.</p>\r
        @if (engine().events.length) { <label class="replay-slider">Decision {{ (replayIndex() ?? 0) + 1 }} of {{ engine().events.length }}<input type="range" min="0" [max]="engine().events.length - 1" [ngModel]="replayIndex()" (ngModelChange)="replayIndex.set(+$event)" aria-label="Replay decision"></label>\r
          <p class="replay-current" role="status">{{ engine().events[replayIndex() ?? 0].message }}</p>\r
          <ol class="event-list">@for (e of engine().events; track e.id; let i = $index) { <li><button [class.selected]="replayIndex() === i" (click)="replayIndex.set(i)"><time>{{ time(e.elapsed) }}</time><span>{{ e.message }}</span></button></li> }</ol>\r
        }\r
      }\r
      @case ('dossier') {\r
        <h2 id="workspace-title" tabindex="-1">Historical Authentication Dossier</h2><p>{{ engine().phase === 'extracted' ? 'The collection is recovered. Your evidence tells the story of how.' : 'Your working record grows with every inspection, correction, and mechanism.' }}</p>\r
        <div class="dossier-stats"><div><strong>{{ engine().cleared.length }}/{{ mission.chambers.length }}</strong><span>Galleries cleared</span></div><div><strong>{{ engine().frauds.length }}</strong><span>Frauds corrected</span></div><div><strong>{{ engine().solved.length }}</strong><span>Locks operated</span></div></div>\r
        <button class="text-button" (click)="open('audit')">Review running fraud-clue list &amp; vault audit \u2197</button>\r
        <h3>Confirmed scenes</h3>@for (e of engine().events; track e.id) { @if (e.type === 'choose' && e.correct) { <p class="record-row">\u2713 {{ e.chamberId }} \xB7 authenticated at {{ time(e.elapsed) }}</p> } }\r
        <h3>Evidence collected</h3>@for (e of mission.evidence; track e.id) { @if (engine().facts.includes(e.id)) { <p class="record-row"><b>{{ e.category }}</b> \xB7 {{ e.title }}</p> } }\r
        @if (engine().phase === 'extracted') { <h3>Defend your decisions</h3>@for (prompt of mission.defensePrompts; track prompt; let i = $index) { <label class="defense-label">{{ prompt }}<textarea rows="3" maxlength="4000" [(ngModel)]="responses[i]" (blur)="saveDefense()"></textarea></label> }<button class="primary" (click)="saveDefense()">Save defense</button> }\r
        <div class="export-actions"><button class="primary" (click)="exportDossier('md')">Download dossier \u2193</button><button class="outline" (click)="exportDossier('json')">Export evidence JSON</button></div>\r
        <details class="new-practice"><summary>Start another practice</summary><p>Export your dossier first to keep this record. Starting again replaces this browser\u2019s saved practice.</p><button (click)="reset()">Start a new practice</button></details>\r
      }\r
    }\r
    @if (feedback() && panel() !== 'replay' && panel() !== 'encounter') { <p class="dialog-feedback" role="status">{{ feedback() }}</p> }\r
  </dialog>\r
</main>\r
`, styles: ['/* src/app/templates/heist/gallery/ui/gallery.component.scss */\n:host {\n  display: block;\n  background: #102824;\n  color: #eee7d4;\n  min-height: 100vh;\n  font-family:\n    Arial,\n    Helvetica,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\na,\ninput,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n  color: inherit;\n  background: #253e36;\n  border: 1px solid #617862;\n  border-radius: 6px;\n  padding: 10px 15px;\n  min-height: 42px;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\na {\n  color: #e9ce93;\n}\nbutton:focus-visible,\na:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible,\nsummary:focus-visible {\n  outline: 3px solid #f0d08a;\n  outline-offset: 4px;\n}\nh1,\nh2,\nh3,\np {\n  margin-top: 0;\n}\n.heist-gallery {\n  max-width: 1800px;\n  margin: auto;\n}\n.mission-bar {\n  display: flex;\n  align-items: center;\n  gap: 18px;\n  padding: 18px 34px;\n  border-bottom: 1px solid rgba(73, 99, 83, 0.4);\n  background: #112923;\n}\n.back {\n  text-decoration: none;\n  font-size: 13px;\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  letter-spacing: 1.3px;\n}\n.brand-mark {\n  font-size: 36px;\n  color: #d8bc7a;\n  margin-left: 15px;\n}\n.mission-name {\n  display: grid;\n  gap: 5px;\n}\n.mission-name strong {\n  font: 20px Georgia, serif;\n}\n.mission-name > span {\n  font-size: 11px;\n  color: #a5bdae;\n  letter-spacing: 0.5px;\n}\n.practice {\n  margin-left: auto;\n  font-size: 9px;\n  letter-spacing: 1.6px;\n  color: #b2c9b9;\n  white-space: nowrap;\n}\n.mission-bar button {\n  font-size: 12px;\n  background: transparent;\n  border-color: #4f6958;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.mission-bar button b {\n  background: #d4bd82;\n  color: #183a2e;\n  border-radius: 50%;\n  min-width: 20px;\n  padding: 3px;\n  font-size: 10px;\n}\n.gallery-heading {\n  display: flex;\n  gap: 30px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 28px 44px 26px;\n  background:\n    radial-gradient(\n      ellipse at 60% 0,\n      rgba(40, 70, 53, 0.3333333333),\n      transparent);\n}\n.eyebrow {\n  font-size: 10px;\n  letter-spacing: 2.1px;\n  color: #cfb77f;\n  margin-bottom: 12px;\n}\n.eyebrow span {\n  padding: 0 12px;\n  color: #7a947b;\n}\nh1 {\n  font: 400 clamp(27px, 3.2vw, 42px)/1.1 Georgia, serif;\n  letter-spacing: -0.5px;\n  margin-bottom: 12px;\n}\n.gallery-heading > div > p:last-child {\n  font-size: 13px;\n  line-height: 1.65;\n  color: #b8c9b9;\n  max-width: 690px;\n  margin-bottom: 0;\n}\n.setting {\n  display: grid;\n  gap: 7px;\n  text-align: right;\n  min-width: 200px;\n}\n.setting > span {\n  font-size: 9px;\n  letter-spacing: 1.8px;\n  color: #92aa96;\n}\n.setting strong {\n  font: 25px Georgia;\n  color: #e5cf9a;\n}\n.setting small {\n  font-size: 11px;\n  color: #b3c6b5;\n}\n.world {\n  position: relative;\n  aspect-ratio: 1.9;\n  min-height: 480px;\n  max-height: 800px;\n  overflow: hidden;\n  background: #0d211d;\n  border-top: 1px solid #48624d;\n  border-bottom: 1px solid #48624d;\n}\n.phaser-stage {\n  position: absolute;\n  inset: -12% 0 -10%;\n  width: 100%;\n  height: 122%;\n}\n.world-label {\n  position: absolute;\n  top: 18px;\n  left: 24px;\n  border: 1px solid #6b7955;\n  background: rgba(17, 43, 35, 0.9019607843);\n  border-radius: 5px;\n  padding: 10px 12px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 11px;\n  color: #e1d4ad;\n}\n.world-label small {\n  margin-left: 14px;\n  color: #a8c1ab;\n  font-size: 10px;\n}\n.status-dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #c7be7d;\n  box-shadow: 0 0 10px #dfd4a5;\n}\n.painting-controls {\n  position: absolute;\n  bottom: 20px;\n  left: 12%;\n  right: 12%;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 7%;\n}\n.painting-controls button {\n  background: rgba(16, 43, 37, 0.937254902);\n  border: 1px solid #b3a36e;\n  border-radius: 5px;\n  display: grid;\n  text-align: left;\n  gap: 8px;\n  padding: 13px 17px;\n  box-shadow: 0 8px 24px rgba(6, 17, 12, 0.4);\n  transition: transform 0.2s, background 0.2s;\n}\n.painting-controls button:hover {\n  background: #2b4536;\n  transform: translateY(-3px);\n}\n.painting-controls small {\n  font-size: 9px;\n  letter-spacing: 1.7px;\n  color: #d6bf82;\n}\n.painting-controls strong {\n  font: 18px Georgia, serif;\n}\n.painting-controls span {\n  font-size: 11px;\n  color: #bbcdb5;\n}\n.painting-controls .confirmed-fraud {\n  border-color: #b9866e;\n}\n.operation-strip {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 25px;\n  padding: 23px 44px;\n  background: #1b352c;\n}\n.operation-strip > div {\n  display: flex;\n  align-items: center;\n  gap: 18px;\n}\n.step-icon {\n  width: 42px;\n  height: 42px;\n  display: grid;\n  place-items: center;\n  font-size: 25px;\n  flex-shrink: 0;\n  border: 1px solid #8c8357;\n  border-radius: 50%;\n  color: #e6c886;\n}\n.operation-strip p {\n  display: grid;\n  gap: 6px;\n  margin: 0;\n}\n.operation-strip p strong {\n  font: 19px Georgia;\n}\n.operation-strip p span {\n  font-size: 12px;\n  color: #b8cbb7;\n  line-height: 1.55;\n  max-width: 760px;\n}\n.primary {\n  background: #e6cb90;\n  color: #123529;\n  border: 1px solid #f1dcad;\n  font-weight: 700;\n  font-size: 12px;\n  padding: 13px 18px;\n  white-space: normal;\n}\n.operation-strip > button {\n  flex-shrink: 0;\n}\n.outline {\n  border-color: #a89c6b;\n  background: transparent;\n  font-size: 12px;\n}\n.full {\n  width: 100%;\n  margin-top: 18px;\n}\n.world-feedback {\n  font-size: 12px;\n  color: #e1d8ad;\n  padding: 12px 44px;\n  margin: 0;\n  border-top: 1px solid #4b684f;\n}\n.route-footer {\n  padding: 25px 44px 20px;\n}\n.route-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 19px;\n}\n.route-heading > span {\n  font-size: 9px;\n  letter-spacing: 2px;\n  color: #a8c0a8;\n}\n.route-heading button {\n  padding: 4px 0;\n  min-height: 30px;\n  background: transparent;\n  border: 0;\n  font-size: 11px;\n  color: #d4c390;\n}\n.route-progress {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  gap: 10px;\n  list-style: none;\n  padding: 0;\n  margin: 0 0 24px;\n}\n.route-progress li {\n  position: relative;\n  display: grid;\n  gap: 9px;\n  align-content: start;\n  color: #839d88;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.route-progress li:before {\n  content: "";\n  position: absolute;\n  top: 14px;\n  left: 35px;\n  right: 0;\n  height: 1px;\n  background: #45634c;\n}\n.route-progress li:last-child:before {\n  display: none;\n}\n.route-progress b {\n  width: 29px;\n  height: 29px;\n  display: grid;\n  place-items: center;\n  border: 1px solid #536d53;\n  border-radius: 50%;\n  font: 11px Arial;\n  background: #132d24;\n}\n.route-progress .current {\n  color: #e8d49a;\n}\n.route-progress .current b {\n  color: #18362a;\n  background: #ddc183;\n  border-color: #f2dba2;\n  box-shadow: 0 0 0 4px rgba(178, 152, 84, 0.1333333333);\n}\n.route-progress .complete b {\n  background: #416c4b;\n  color: #e8f0cc;\n}\n.route-progress span {\n  max-width: 115px;\n}\n.footer-notes {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 25px;\n  font-size: 10px;\n  color: #89a48d;\n  border-top: 1px solid #49624b;\n  padding-top: 17px;\n  line-height: 1.5;\n}\n.footer-notes > span {\n  max-width: 660px;\n}\n.footer-notes label {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  white-space: nowrap;\n}\n.footer-notes input {\n  accent-color: #c8b378;\n}\n.loading {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 18px;\n  background: rgba(14, 39, 36, 0.9333333333);\n  color: #e8d5a7;\n  font: 20px Georgia;\n}\n.loading > span {\n  font-size: 50px;\n}\n.error {\n  font: 15px Arial;\n  padding: 40px;\n  text-align: center;\n}\n.warning {\n  padding: 15px 34px;\n  background: #67482a;\n  color: #fff0d2;\n  font-size: 13px;\n}\n.warning button {\n  margin-left: 12px;\n  font-size: 12px;\n}\n.workspace-dialog {\n  position: fixed;\n  inset: 16px 16px 16px auto;\n  margin: 0;\n  width: min(540px, 100vw - 32px);\n  max-height: calc(100dvh - 32px);\n  height: calc(100dvh - 32px);\n  max-width: none;\n  border: 1px solid #9c9569;\n  border-radius: 12px;\n  background: #172f29;\n  color: #e9e4d0;\n  padding: 24px 28px;\n  box-shadow: -16px 0 90px rgba(6, 29, 25, 0.6666666667);\n  overflow: auto;\n  scrollbar-width: thin;\n  scrollbar-color: #768263 #172f29;\n}\n.workspace-dialog::backdrop {\n  background: rgba(6, 28, 22, 0.4);\n}\n.dialog-top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 22px;\n}\n.dialog-top > span {\n  font-size: 9px;\n  letter-spacing: 1.9px;\n  color: #c5b57f;\n}\n.dialog-top button {\n  min-height: 32px;\n  width: 32px;\n  padding: 0;\n  background: transparent;\n  border: 1px solid #536b51;\n  border-radius: 50%;\n  font-size: 12px;\n}\n.workspace-dialog h2 {\n  font: 400 30px/1.15 Georgia, serif;\n  margin-bottom: 14px;\n  outline: none;\n}\n.workspace-dialog h3 {\n  font: 20px Georgia;\n  margin-top: 22px;\n}\n.workspace-dialog p {\n  font-size: 13px;\n  color: #b9cdb9;\n  line-height: 1.65;\n}\n.workspace-dialog a {\n  font-size: 11px;\n}\n.painting-caption {\n  border-left: 2px solid #aa975f;\n  padding-left: 13px;\n}\n.painting-inspection {\n  position: relative;\n  height: 300px;\n  margin: 22px 0 12px;\n  border: 8px ridge #ac9258;\n  overflow: hidden;\n  background: #102821;\n  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.4);\n}\n.painting-art {\n  position: absolute;\n  inset: 0;\n  background-size: 300% 300%;\n  transition: transform 0.25s;\n}\n.zoomed .painting-art {\n  transform: scale(1.6);\n  transform-origin: 65% 62%;\n}\n.hotspot {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  padding: 3px;\n  width: 32px;\n  min-height: 32px;\n  border: 1px solid #f3dc95;\n  border-radius: 50%;\n  background: rgba(21, 55, 40, 0.937254902);\n  color: #f3d58b;\n  font-size: 20px;\n  box-shadow: 0 0 0 5px rgba(17, 44, 40, 0.4);\n}\n.hotspot.inspected {\n  background: #58794c;\n}\n.hotspot span {\n  display: block;\n  position: absolute;\n  left: 50%;\n  top: 35px;\n  transform: translateX(-50%);\n  background: rgba(20, 46, 39, 0.9098039216);\n  border: 1px solid #8a895c;\n  color: #fff0c9;\n  border-radius: 3px;\n  font: 11px Arial;\n  padding: 5px 7px;\n  min-width: 80px;\n  max-width: 155px;\n}\n.zoom-button {\n  position: absolute;\n  bottom: 8px;\n  right: 8px;\n  min-height: 30px;\n  padding: 5px 8px;\n  font-size: 10px;\n  background: rgba(25, 56, 43, 0.9215686275);\n}\n.small-note {\n  font-size: 11px !important;\n  color: #b5c6ad !important;\n}\n.detail-studies {\n  display: grid;\n  gap: 9px;\n  margin: 15px 0;\n}\n.detail-studies > button {\n  text-align: left;\n  display: grid;\n  gap: 7px;\n  background: #243d30;\n  padding: 13px;\n}\n.detail-studies span {\n  font-size: 8px;\n  letter-spacing: 1.8px;\n  color: #c8be87;\n}\n.detail-studies strong {\n  font-size: 13px;\n}\n.detail-studies p {\n  margin: 0;\n  font-size: 12px;\n}\n.selected {\n  border-color: #e3c889 !important;\n  background: #3a5038 !important;\n}\n.text-button {\n  background: transparent;\n  border: 0;\n  color: #dbc68b;\n  font-size: 12px;\n  text-decoration: underline;\n  text-underline-offset: 4px;\n  padding-left: 0;\n  margin-top: 12px;\n}\n.fraud-panel {\n  border-top: 1px solid #687452;\n  padding-top: 1px;\n}\n.fraud-categories {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.fraud-categories button {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  text-align: left;\n  font-size: 12px;\n}\n.fraud-categories span {\n  font-size: 22px;\n  color: #d9be85;\n}\n.fraud-confirmed {\n  padding: 13px;\n  background: rgba(121, 89, 64, 0.2);\n  border-left: 3px solid #c59e74;\n  color: #e6ccb0 !important;\n}\n.lock-progress {\n  display: flex;\n  justify-content: space-between;\n  font-size: 9px;\n  letter-spacing: 1px;\n  color: #c2be8c;\n  background: #203d30;\n  padding: 12px;\n  margin: 20px 0;\n}\n.lock-progress b {\n  font-weight: normal;\n}\n.dialog-feedback {\n  border: 1px solid #797e58;\n  background: #293f2d;\n  color: #e6d7a5 !important;\n  padding: 12px;\n  border-radius: 5px;\n  margin: 20px 0 0;\n}\n.notebook-group > h3 {\n  color: #dfca93;\n  border-bottom: 1px solid #60704e;\n  padding-bottom: 9px;\n}\n.notebook-group details {\n  border: 1px solid #526c4e;\n  border-radius: 5px;\n  margin: 9px 0;\n  padding: 12px;\n  background: #1d382b;\n}\n.notebook-group summary {\n  cursor: pointer;\n  font-size: 13px;\n  line-height: 1.5;\n}\n.notebook-group summary > span {\n  color: #d3c08a;\n  margin-right: 8px;\n}\n.notebook-group summary > small {\n  font-size: 8px;\n  margin-left: 9px;\n  color: #bcd3a6;\n}\n.notebook-group p {\n  margin: 13px 0;\n}\n.replay-slider {\n  display: grid;\n  gap: 10px;\n  font-size: 12px;\n  color: #d5c38b;\n}\n.replay-slider input {\n  width: 100%;\n  accent-color: #e5c785;\n}\n.replay-current {\n  border-left: 3px solid #ceb477;\n  padding: 12px;\n  background: #243e2e;\n}\n.event-list {\n  list-style: none;\n  padding: 0;\n  display: grid;\n  gap: 7px;\n}\n.event-list button {\n  display: flex;\n  gap: 12px;\n  text-align: left;\n  font-size: 12px;\n  line-height: 1.6;\n  width: 100%;\n}\n.event-list time {\n  color: #dfc784;\n  font-size: 10px;\n  padding-top: 3px;\n  flex-shrink: 0;\n}\n.dossier-stats {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n  margin: 22px 0;\n}\n.dossier-stats > div {\n  display: grid;\n  gap: 8px;\n  padding: 16px 10px;\n  border: 1px solid #5d7250;\n  text-align: center;\n}\n.dossier-stats strong {\n  font: 29px Georgia;\n  color: #e8cd8f;\n}\n.dossier-stats span {\n  font-size: 10px;\n  color: #b2c9b2;\n}\n.record-row {\n  padding: 10px;\n  border-bottom: 1px solid #405e44;\n  margin: 0;\n}\n.defense-label {\n  display: grid;\n  gap: 9px;\n  font-size: 12px;\n  line-height: 1.6;\n  margin-bottom: 18px;\n}\n.defense-label textarea {\n  resize: vertical;\n  width: 100%;\n  border: 1px solid #73825a;\n  border-radius: 5px;\n  background: #10271e;\n  color: #ecdfb5;\n  padding: 12px;\n  line-height: 1.6;\n}\n.export-actions {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin: 25px 0;\n}\n.new-practice {\n  border-top: 1px solid #566d4e;\n  padding-top: 15px;\n  font-size: 12px;\n  color: #a9bda7;\n}\n.new-practice summary {\n  cursor: pointer;\n}\n.new-practice button {\n  font-size: 12px;\n}\n@media (min-width: 1600px) {\n  .world {\n    aspect-ratio: 2;\n  }\n}\n@media (max-width: 1000px) {\n  .mission-bar {\n    padding: 14px 20px;\n    gap: 12px;\n  }\n  .practice {\n    display: none;\n  }\n  .mission-bar button:first-of-type {\n    margin-left: auto;\n  }\n  .gallery-heading {\n    padding: 24px;\n  }\n  .world {\n    min-height: 450px;\n    aspect-ratio: 1.6;\n  }\n  .phaser-stage {\n    inset: 0;\n    height: 100%;\n  }\n  .painting-controls {\n    left: 7%;\n    right: 7%;\n    gap: 5%;\n    bottom: 15px;\n  }\n  .painting-controls strong {\n    font-size: 15px;\n  }\n  .operation-strip,\n  .route-footer {\n    padding: 22px 24px;\n  }\n  .route-progress {\n    gap: 9px;\n  }\n  .route-progress span {\n    font-size: 9px;\n  }\n  .world-label {\n    top: 12px;\n    left: 14px;\n  }\n  .setting {\n    min-width: 145px;\n  }\n}\n@media (max-width: 700px) {\n  .brand-mark,\n  .back span,\n  .mission-bar .dossier-button {\n    display: none;\n  }\n  .mission-bar {\n    gap: 10px;\n    padding: 12px;\n  }\n  .mission-name strong {\n    font-size: 16px;\n  }\n  .mission-name > span {\n    font-size: 9px;\n  }\n  .mission-bar button {\n    padding: 8px;\n    font-size: 10px;\n    gap: 5px;\n  }\n  .gallery-heading {\n    padding: 22px 16px;\n    align-items: flex-start;\n    gap: 10px;\n  }\n  .eyebrow {\n    font-size: 8px;\n    letter-spacing: 1.2px;\n  }\n  .eyebrow span {\n    padding: 0 4px;\n  }\n  .gallery-heading > div > p:last-child {\n    font-size: 12px;\n  }\n  .setting {\n    min-width: 90px;\n    max-width: 115px;\n  }\n  .setting strong {\n    font-size: 18px;\n  }\n  .setting > span {\n    font-size: 8px;\n    letter-spacing: 1px;\n  }\n  .setting small {\n    font-size: 9px;\n  }\n  .world {\n    min-height: 390px;\n  }\n  .phaser-stage {\n    inset: 0;\n    height: 100%;\n    min-width: 730px;\n    left: 50%;\n    transform: translateX(-50%);\n  }\n  .world-label {\n    left: 10px;\n    top: 10px;\n    font-size: 10px;\n  }\n  .world-label small {\n    display: none;\n  }\n  .painting-controls {\n    left: 8px;\n    right: 8px;\n    gap: 7px;\n    bottom: 10px;\n  }\n  .painting-controls button {\n    padding: 9px;\n    gap: 6px;\n  }\n  .painting-controls small {\n    font-size: 8px;\n  }\n  .painting-controls strong {\n    font-size: 13px;\n  }\n  .painting-controls span {\n    font-size: 9px;\n  }\n  .operation-strip {\n    align-items: stretch;\n    flex-direction: column;\n    gap: 15px;\n    padding: 20px 16px;\n  }\n  .operation-strip p span {\n    font-size: 11px;\n  }\n  .route-footer {\n    padding: 18px 16px;\n  }\n  .route-progress {\n    grid-template-columns: repeat(4, 1fr);\n    row-gap: 16px;\n  }\n  .footer-notes {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .world-feedback {\n    padding: 12px 16px;\n  }\n  .workspace-dialog {\n    inset: 8px;\n    width: calc(100vw - 16px);\n    height: calc(100dvh - 16px);\n    max-height: calc(100dvh - 16px);\n    padding: 20px;\n  }\n  .workspace-dialog h2 {\n    font-size: 26px;\n  }\n  .painting-inspection {\n    height: 290px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    transition: none !important;\n  }\n}\n.world {\n  width: 100%;\n  min-width: 0;\n}\n@media (max-width: 700px) {\n  .world {\n    aspect-ratio: auto;\n    height: 390px;\n  }\n}\n.audit-tools {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px 20px;\n  padding: 0 44px 20px;\n}\n.audit-tools button {\n  background: transparent;\n  color: #e8cd94;\n  font-size: 12px;\n}\n.audit-tools span {\n  color: #b8cbb7;\n  font-size: 12px;\n}\n@media (max-width: 700px) {\n  .audit-tools {\n    padding: 0 16px 18px;\n    gap: 10px;\n  }\n}\n.scene-invitation {\n  display: flex;\n  align-items: center;\n  gap: 22px;\n  padding: 16px 24px;\n  margin: 0 44px 24px;\n  border: 1px solid #8a9566;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      100deg,\n      #304a34,\n      #182f27);\n}\n.scene-invitation img {\n  width: 140px;\n  height: 84px;\n  object-fit: cover;\n  border-radius: 5px;\n}\n.scene-invitation > div {\n  flex: 1;\n}\n.scene-invitation span {\n  font-size: 8px;\n  letter-spacing: 1.7px;\n  color: #cfbd87;\n}\n.scene-invitation strong {\n  display: block;\n  font: 24px Georgia;\n  margin: 5px 0;\n}\n.scene-invitation p {\n  margin: 0;\n  color: #b8cdb4;\n  font-size: 12px;\n}\n.scene-invitation button {\n  flex-shrink: 0;\n}\n.workspace-dialog.encounter-workspace {\n  inset: 16px;\n  width: calc(100vw - 32px);\n  max-width: 1680px;\n  margin: auto;\n  padding: 0;\n  overflow: hidden;\n}\n.encounter-title {\n  position: absolute !important;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\n@media (max-width: 700px) {\n  .scene-invitation {\n    margin: 0 16px 18px;\n    padding: 14px;\n    gap: 12px;\n    flex-wrap: wrap;\n  }\n  .scene-invitation img {\n    width: 75px;\n    height: 90px;\n  }\n  .scene-invitation strong {\n    font-size: 20px;\n  }\n  .scene-invitation span {\n    font-size: 7px;\n    letter-spacing: 1px;\n  }\n  .scene-invitation button {\n    width: 100%;\n  }\n  .workspace-dialog.encounter-workspace {\n    inset: 8px;\n    width: calc(100vw - 16px);\n  }\n}\n/*# sourceMappingURL=gallery.component.css.map */\n'] }]
  }], () => [], { lockWorkspace: [{
    type: ViewChild,
    args: [AcademicLockComponent]
  }], stage: [{
    type: ViewChild,
    args: ["stage", { static: true }]
  }], dialog: [{
    type: ViewChild,
    args: ["dialog", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GalleryComponent, { className: "GalleryComponent", filePath: "src/app/templates/heist/gallery/ui/gallery.component.ts", lineNumber: 18 });
})();
export {
  GALLERY_SCENE_LOADER,
  GalleryComponent
};
//# debugId=d7ba154f-1a79-5f2b-a3d6-3dc5c107e487
//# sourceMappingURL=chunk-MZOHNKPS.js.map
