import {
  samplePersistence
} from "./chunk-HUXR7BE6.js";
import {
  DEBATE_STUDIO_MEDIA,
  DEBATE_STUDIO_PERSISTENCE,
  DEBATE_STUDIO_SESSION,
  DebateStudioRuntimeService,
  assembleBroadcastTimeline,
  createInitialDebateSession,
  createInitialDebateWorkspace
} from "./chunk-VCUNTQ4R.js";
import "./chunk-H7BIYLRY.js";
import {
  DEBATE_STUDIO_CONFIG,
  DEBATE_STUDIO_TENANT_ID
} from "./chunk-GNKRFT3D.js";
import {
  romanSenateDebateConfig
} from "./chunk-7KK5HPLH.js";
import "./chunk-FOENF5P4.js";
import "./chunk-RTVK2FN5.js";
import "./chunk-OXVZ3VYX.js";
import {
  Component,
  DestroyRef,
  Input,
  ViewChild,
  computed,
  effect,
  inject,
  input,
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
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵpureFunction0,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/debate-studio/ui/debate-example-walkthrough.component.ts
var _c0 = ["threadScroller"];
var _c1 = () => ["plan", "evidence", "write", "feedback", "file"];
var _c2 = () => [];
var _forTrack0 = ($index, $item) => $item.id;
function DebateExampleWalkthroughComponent_For_40_Conditional_11_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const evidenceId_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.evidenceTitle(evidenceId_r5));
  }
}
function DebateExampleWalkthroughComponent_For_40_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 26)(1, "button", 6);
    \u0275\u0275domListener("click", function DebateExampleWalkthroughComponent_For_40_Conditional_11_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const segment_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.hear(segment_r2));
    });
    \u0275\u0275text(2, "\u25B6 Hear argument");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4, "Evidence presented");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(5, DebateExampleWalkthroughComponent_For_40_Conditional_11_For_6_Template, 2, 1, "span", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const segment_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275repeater(segment_r2.evidenceIds);
  }
}
function DebateExampleWalkthroughComponent_For_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "li")(1, "button", 25);
    \u0275\u0275domListener("click", function DebateExampleWalkthroughComponent_For_40_Template_button_click_1_listener() {
      const segment_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleArchive(segment_r2));
    });
    \u0275\u0275domElementStart(2, "b");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span")(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "i");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(11, DebateExampleWalkthroughComponent_For_40_Conditional_11_Template, 7, 0, "div", 26);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const segment_r2 = ctx.$implicit;
    const \u0275$index_66_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("expanded", ctx_r2.expandedArchiveId() === segment_r2.id);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r2.expandedArchiveId() === segment_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_66_r6 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(segment_r2.roundLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r2.speakerDisplayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.expandedArchiveId() === segment_r2.id ? "\u2212" : "+");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.expandedArchiveId() === segment_r2.id ? 11 : -1);
  }
}
function DebateExampleWalkthroughComponent_ForEmpty_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li", 14);
    \u0275\u0275text(1, "Arguments appear here as they are filed.");
    \u0275\u0275domElementEnd();
  }
}
function DebateExampleWalkthroughComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 19)(1, "span");
    \u0275\u0275text(2, "SPQR");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4, "The chamber is ready");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6, "Press Play or Next step to watch the completed class project take shape.");
    \u0275\u0275domElementEnd()();
  }
}
function DebateExampleWalkthroughComponent_For_57_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li", 29)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div")(4, "small");
    \u0275\u0275text(5, "Moderator question \xB7 neutral");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const segment_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("just-added", ctx_r2.currentSegment()?.id === segment_r7.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.moderator.initials);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(segment_r7.transcript);
  }
}
function DebateExampleWalkthroughComponent_For_57_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li", 30)(1, "article")(2, "header")(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div")(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "b");
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "footer")(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(17, "strong");
    \u0275\u0275text(18);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const segment_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("left", ctx_r2.isLeft(segment_r7))("right", !ctx_r2.isLeft(segment_r7))("just-added", ctx_r2.currentSegment()?.id === segment_r7.id);
    \u0275\u0275advance();
    \u0275\u0275styleProp("--%NS%faction-accent", ctx_r2.faction(segment_r7)?.accent);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.faction(segment_r7)?.emblem);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.faction(segment_r7)?.railLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r7.speakerDisplayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r7.roundLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r7.transcript);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", segment_r7.evidenceIds.length, " sources cited");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.scene() === 9 && ctx_r2.currentSegment()?.id === segment_r7.id ? "\u2713 Just filed" : "Filed argument");
  }
}
function DebateExampleWalkthroughComponent_For_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DebateExampleWalkthroughComponent_For_57_Conditional_0_Template, 8, 4, "li", 27)(1, DebateExampleWalkthroughComponent_For_57_Conditional_1_Template, 19, 15, "li", 28);
  }
  if (rf & 2) {
    const segment_r7 = ctx.$implicit;
    \u0275\u0275conditional(segment_r7.kind === "moderator" ? 0 : 1);
  }
}
function DebateExampleWalkthroughComponent_Conditional_58_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const tab_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r2.builderStage() === tab_r8)("complete", \u0275\u0275pureFunction0(5, _c1).indexOf(tab_r8) < \u0275\u0275pureFunction0(6, _c1).indexOf(ctx_r2.builderStage()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tab_r8 === "file" ? "Record & file" : tab_r8);
  }
}
function DebateExampleWalkthroughComponent_Conditional_58_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 36)(1, "article")(2, "small");
    \u0275\u0275text(3, "Moderator asks");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "article")(7, "small");
    \u0275\u0275text(8, "Plan the response");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "p");
    \u0275\u0275text(10, " Answer the limit on emergency power, acknowledge the strongest opposing point, and connect the claim to Rome\u2019s future. ");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.timeline()[2].transcript);
  }
}
function DebateExampleWalkthroughComponent_Conditional_58_Case_14_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "i");
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div")(4, "small");
    \u0275\u0275text(5, "Selected source");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "b");
    \u0275\u0275text(9, "PINNED");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const evidenceId_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.evidenceTitle(evidenceId_r9));
  }
}
function DebateExampleWalkthroughComponent_Conditional_58_Case_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 37)(1, "span");
    \u0275\u0275text(2, "Evidence is reviewed and pinned");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(3, DebateExampleWalkthroughComponent_Conditional_58_Case_14_For_4_Template, 10, 1, "article", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.responseSegment()?.evidenceIds ?? \u0275\u0275pureFunction0(0, _c2));
  }
}
function DebateExampleWalkthroughComponent_Conditional_58_Case_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 38)(1, "header")(2, "span");
    \u0275\u0275text(3, "Speech draft");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "b");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275domElement(8, "i", 41);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "aside")(10, "small");
    \u0275\u0275text(11, "Reasoning");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "strong");
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r2.typedDraft().split(" ").length, " words \xB7 saving");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.typedDraft());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.responseSegment()?.turnId ? "The evidence supports action, but action alone does not justify authority without limits." : "");
  }
}
function DebateExampleWalkthroughComponent_Conditional_58_Case_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 39)(1, "article")(2, "small");
    \u0275\u0275text(3, "Readiness check");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "ul")(5, "li");
    \u0275\u0275text(6, "\u2713 Opposing claim answered");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "li");
    \u0275\u0275text(8, "\u2713 Moderator question addressed");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "li");
    \u0275\u0275text(10, "\u2713 Two sources connected");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "li");
    \u0275\u0275text(12, "\u2713 Reasoning explained");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(13, "article", 42)(14, "small");
    \u0275\u0275text(15, "Teacher feedback");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(16, "p");
    \u0275\u0275text(17, " Strong revision. You acknowledged the opposing evidence and narrowed the claim. File when the recording is reviewed. ");
    \u0275\u0275domElementEnd()()();
  }
}
function DebateExampleWalkthroughComponent_Conditional_58_Case_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 40)(1, "div", 43);
    \u0275\u0275domElement(2, "i");
    \u0275\u0275domElementStart(3, "span");
    \u0275\u0275text(4, "Recording reviewed");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "strong");
    \u0275\u0275text(6, "0:55");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "div", 44)(8, "span");
    \u0275\u0275text(9, "Sealing argument into the class record");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "i");
    \u0275\u0275domElement(11, "b");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(12, "div", 45);
    \u0275\u0275text(13, "FILED ");
    \u0275\u0275domElementStart(14, "small");
    \u0275\u0275text(15, "Evidence and reasoning attached");
    \u0275\u0275domElementEnd()()();
  }
}
function DebateExampleWalkthroughComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 20)(1, "header")(2, "div")(3, "small");
    \u0275\u0275text(4, "Build the next argument");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "h2", 31);
    \u0275\u0275text(6, "Response round \xB7 Evidence Senator");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "span", 32);
    \u0275\u0275text(8, "Demonstration");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "nav", 33);
    \u0275\u0275repeaterCreate(10, DebateExampleWalkthroughComponent_Conditional_58_For_11_Template, 2, 7, "span", 34, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "div", 35);
    \u0275\u0275conditionalCreate(13, DebateExampleWalkthroughComponent_Conditional_58_Case_13_Template, 11, 1, "div", 36)(14, DebateExampleWalkthroughComponent_Conditional_58_Case_14_Template, 5, 1, "div", 37)(15, DebateExampleWalkthroughComponent_Conditional_58_Case_15_Template, 14, 3, "div", 38)(16, DebateExampleWalkthroughComponent_Conditional_58_Case_16_Template, 18, 0, "div", 39)(17, DebateExampleWalkthroughComponent_Conditional_58_Case_17_Template, 16, 0, "div", 40);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(1, _c1));
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_3_0 = ctx_r2.builderStage()) === "plan" ? 13 : tmp_3_0 === "evidence" ? 14 : tmp_3_0 === "write" ? 15 : tmp_3_0 === "feedback" ? 16 : tmp_3_0 === "file" ? 17 : -1);
  }
}
function DebateExampleWalkthroughComponent_Conditional_59_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function DebateExampleWalkthroughComponent_Conditional_59_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.resultsOpen.set(!ctx_r2.resultsOpen()));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.resultsOpen() ? "Hide class results" : "Reveal class results", " ");
  }
}
function DebateExampleWalkthroughComponent_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "footer", 46)(1, "div")(2, "small");
    \u0275\u0275text(3, "Build the next argument");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(6, DebateExampleWalkthroughComponent_Conditional_59_Conditional_6_Template, 2, 1, "button", 47);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("filed", ctx_r2.scene() >= 9);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.scene() >= 9 ? "Response filed \xB7 builder closed" : "The builder opens after the moderator question");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.scene() >= ctx_r2.maxScene() ? 6 : -1);
  }
}
function DebateExampleWalkthroughComponent_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "aside", 22)(1, "span");
    \u0275\u0275text(2, "Completed fictional class");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4, "10 filed arguments \xB7 all required evidence attached");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div")(6, "b");
    \u0275\u0275text(7, "Republic defenders 58%");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "i");
    \u0275\u0275domElement(9, "span");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "b");
    \u0275\u0275text(11, "Caesarian reformers 42%");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(12, "p");
    \u0275\u0275text(13, "The result measures persuasion in this sample, not individual mastery.");
    \u0275\u0275domElementEnd()();
  }
}
function DebateExampleWalkthroughComponent_For_74_Conditional_11_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const evidenceId_r14 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.evidenceTitle(evidenceId_r14));
  }
}
function DebateExampleWalkthroughComponent_For_74_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 26)(1, "button", 6);
    \u0275\u0275domListener("click", function DebateExampleWalkthroughComponent_For_74_Conditional_11_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r13);
      const segment_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.hear(segment_r12));
    });
    \u0275\u0275text(2, "\u25B6 Hear argument");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4, "Evidence presented");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(5, DebateExampleWalkthroughComponent_For_74_Conditional_11_For_6_Template, 2, 1, "span", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const segment_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275repeater(segment_r12.evidenceIds);
  }
}
function DebateExampleWalkthroughComponent_For_74_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "li")(1, "button", 25);
    \u0275\u0275domListener("click", function DebateExampleWalkthroughComponent_For_74_Template_button_click_1_listener() {
      const segment_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleArchive(segment_r12));
    });
    \u0275\u0275domElementStart(2, "b");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span")(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "i");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(11, DebateExampleWalkthroughComponent_For_74_Conditional_11_Template, 7, 0, "div", 26);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const segment_r12 = ctx.$implicit;
    const \u0275$index_389_r15 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("expanded", ctx_r2.expandedArchiveId() === segment_r12.id);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r2.expandedArchiveId() === segment_r12.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_389_r15 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(segment_r12.roundLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r12.speakerDisplayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.expandedArchiveId() === segment_r12.id ? "\u2212" : "+");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.expandedArchiveId() === segment_r12.id ? 11 : -1);
  }
}
function DebateExampleWalkthroughComponent_ForEmpty_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li", 14);
    \u0275\u0275text(1, "Arguments appear here as they are filed.");
    \u0275\u0275domElementEnd();
  }
}
var DebateExampleWalkthroughComponent = class _DebateExampleWalkthroughComponent {
  runtime = inject(DebateStudioRuntimeService);
  readOnly = input(
    true,
    ...ngDevMode ? [{ debugName: "readOnly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scene = signal(
    0,
    ...ngDevMode ? [{ debugName: "scene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playing = signal(
    !this.prefersReducedMotion(),
    ...ngDevMode ? [{ debugName: "playing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  typedCharacters = signal(
    0,
    ...ngDevMode ? [{ debugName: "typedCharacters" }] : (
      /* istanbul ignore next */
      []
    )
  );
  expandedArchiveId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "expandedArchiveId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  resultsOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "resultsOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  threadScroller = viewChild(
    "threadScroller",
    ...ngDevMode ? [{ debugName: "threadScroller" }] : (
      /* istanbul ignore next */
      []
    )
  );
  destroyRef = inject(DestroyRef);
  sceneTimer;
  typingTimer;
  timeline = computed(
    () => this.runtime.program().filter((segment) => ["student", "moderator"].includes(segment.kind)),
    ...ngDevMode ? [{ debugName: "timeline" }] : (
      /* istanbul ignore next */
      []
    )
  );
  maxScene = computed(
    () => Math.max(9, 9 + Math.max(0, this.timeline().length - 4)),
    ...ngDevMode ? [{ debugName: "maxScene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visibleTimeline = computed(
    () => {
      const scene = this.scene();
      const count = scene <= 2 ? scene : scene <= 8 ? 3 : 4 + (scene - 9);
      return this.timeline().slice(0, Math.max(0, count));
    },
    ...ngDevMode ? [{ debugName: "visibleTimeline" }] : (
      /* istanbul ignore next */
      []
    )
  );
  builderOpen = computed(
    () => this.scene() >= 4 && this.scene() <= 8,
    ...ngDevMode ? [{ debugName: "builderOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  builderStage = computed(
    () => {
      const stages = ["plan", "evidence", "write", "feedback", "file"];
      return stages[Math.max(0, Math.min(4, this.scene() - 4))];
    },
    ...ngDevMode ? [{ debugName: "builderStage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  responseSegment = computed(
    () => this.timeline().find((segment, index) => index >= 3 && segment.kind === "student"),
    ...ngDevMode ? [{ debugName: "responseSegment" }] : (
      /* istanbul ignore next */
      []
    )
  );
  responseDraft = computed(
    () => this.responseSegment()?.transcript ?? "",
    ...ngDevMode ? [{ debugName: "responseDraft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  typedDraft = computed(
    () => this.responseDraft().slice(0, this.typedCharacters()),
    ...ngDevMode ? [{ debugName: "typedDraft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  leftArchive = computed(
    () => this.visibleTimeline().filter((segment) => segment.kind === "student" && segment.factionId === this.runtime.config.factions[0].id),
    ...ngDevMode ? [{ debugName: "leftArchive" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rightArchive = computed(
    () => this.visibleTimeline().filter((segment) => segment.kind === "student" && segment.factionId === this.runtime.config.factions[1].id),
    ...ngDevMode ? [{ debugName: "rightArchive" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentSegment = computed(
    () => this.visibleTimeline().at(-1),
    ...ngDevMode ? [{ debugName: "currentSegment" }] : (
      /* istanbul ignore next */
      []
    )
  );
  walkthroughLabel = computed(
    () => {
      const scene = this.scene();
      if (scene === 0)
        return "The finished class debate is ready to replay";
      if (scene <= 2)
        return "Opening arguments enter the shared thread";
      if (scene === 3)
        return "The moderator creates a neutral break";
      if (scene >= 4 && scene <= 8)
        return "A student builds and files the next response";
      if (scene < this.maxScene())
        return "The class debate continues argument by argument";
      return "The complete class record is ready for review";
    },
    ...ngDevMode ? [{ debugName: "walkthroughLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      this.visibleTimeline().length;
      queueMicrotask(() => {
        const scroller = this.threadScroller()?.nativeElement;
        if (scroller !== void 0)
          scroller.scrollTop = scroller.scrollHeight;
      });
    });
    this.destroyRef.onDestroy(() => this.clearTimers());
    if (this.playing())
      this.sceneTimer = setTimeout(() => this.advance(), 900);
  }
  faction(segment) {
    return this.runtime.config.factions.find((faction) => faction.id === segment.factionId);
  }
  isLeft(segment) {
    return segment.factionId === this.runtime.config.factions[0].id;
  }
  evidenceTitle(evidenceId) {
    return this.runtime.config.evidence.find((item) => item.id === evidenceId)?.title ?? evidenceId;
  }
  toggleArchive(segment) {
    this.expandedArchiveId.update((id) => id === segment.id ? void 0 : segment.id);
  }
  hear(segment) {
    this.runtime.speak(segment.transcript);
  }
  togglePlayback() {
    if (this.playing()) {
      this.playing.set(false);
      this.clearTimers();
      return;
    }
    if (this.scene() >= this.maxScene())
      this.scene.set(0);
    this.playing.set(true);
    this.beginSceneTimers();
  }
  next() {
    this.playing.set(false);
    this.clearTimers();
    this.advance(false);
    if (this.scene() === 6)
      this.typedCharacters.set(this.responseDraft().length);
  }
  restart() {
    this.clearTimers();
    this.scene.set(0);
    this.typedCharacters.set(0);
    this.expandedArchiveId.set(void 0);
    this.resultsOpen.set(false);
    this.playing.set(!this.prefersReducedMotion());
    if (this.playing())
      this.sceneTimer = setTimeout(() => this.advance(), 900);
  }
  advance(reschedule = true) {
    if (this.scene() >= this.maxScene()) {
      this.playing.set(false);
      this.clearTimers();
      return;
    }
    this.scene.update((scene) => scene + 1);
    if (reschedule && this.playing())
      this.beginSceneTimers();
  }
  beginSceneTimers() {
    this.clearTimers();
    if (this.scene() === 6) {
      this.typedCharacters.set(0);
      this.typingTimer = setInterval(() => {
        this.typedCharacters.update((length) => Math.min(this.responseDraft().length, length + 4));
        if (this.typedCharacters() >= this.responseDraft().length) {
          if (this.typingTimer !== void 0)
            clearInterval(this.typingTimer);
          this.typingTimer = void 0;
        }
      }, 32);
    } else if (this.scene() > 6) {
      this.typedCharacters.set(this.responseDraft().length);
    }
    const delay = this.scene() >= 10 ? 1250 : this.scene() === 6 ? 4300 : 2400;
    this.sceneTimer = setTimeout(() => this.advance(), delay);
  }
  clearTimers() {
    if (this.sceneTimer !== void 0)
      clearTimeout(this.sceneTimer);
    if (this.typingTimer !== void 0)
      clearInterval(this.typingTimer);
    this.sceneTimer = void 0;
    this.typingTimer = void 0;
  }
  prefersReducedMotion() {
    return typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  static \u0275fac = function DebateExampleWalkthroughComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DebateExampleWalkthroughComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DebateExampleWalkthroughComponent, selectors: [["app-debate-example-walkthrough"]], viewQuery: function DebateExampleWalkthroughComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.threadScroller, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { readOnly: [1, "readOnly"] }, decls: 76, vars: 23, consts: [["threadScroller", ""], [1, "example-debate"], [1, "example-header"], [1, "example-question"], ["aria-live", "polite", 1, "walkthrough-status"], ["aria-label", "Walkthrough controls"], ["type", "button", 3, "click"], ["type", "button", 1, "play-control", 3, "click"], ["type", "button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "walkthrough-progress"], [1, "example-layout"], ["aria-labelledby", "left-example-title", 1, "example-rail", "left-example-rail"], ["id", "left-example-title"], [3, "expanded"], [1, "rail-empty"], ["aria-label", "Animated debate workspace", 1, "example-center"], ["aria-labelledby", "example-thread-title", 1, "example-thread"], ["id", "example-thread-title"], [1, "thread-window"], [1, "empty-stage"], ["aria-labelledby", "example-builder-title", 1, "example-builder"], [1, "collapsed-builder", 3, "filed"], [1, "example-results"], ["aria-labelledby", "right-example-title", 1, "example-rail", "right-example-rail"], ["id", "right-example-title"], ["type", "button", 1, "archive-summary", 3, "click"], [1, "archive-details"], [1, "demo-moderator", 3, "just-added"], [1, "demo-speech", 3, "left", "right", "just-added"], [1, "demo-moderator"], [1, "demo-speech"], ["id", "example-builder-title"], [1, "demo-badge"], ["aria-label", "Builder demonstration stages"], [3, "active", "complete"], [1, "builder-stage"], [1, "plan-demo", "stage-enter"], [1, "evidence-demo", "stage-enter"], [1, "write-demo", "stage-enter"], [1, "feedback-demo", "stage-enter"], [1, "file-demo", "stage-enter"], ["aria-hidden", "true"], [1, "teacher-note"], [1, "recording"], [1, "filing-progress"], [1, "file-stamp"], [1, "collapsed-builder"], ["type", "button"]], template: function DebateExampleWalkthroughComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "main", 1)(1, "header", 2)(2, "div")(3, "span");
      \u0275\u0275text(4, "Finished project example \xB7 animated walkthrough");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "h1");
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(7, "div", 3)(8, "small");
      \u0275\u0275text(9, "Question before the class");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "strong");
      \u0275\u0275text(11);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(12, "div", 4)(13, "small");
      \u0275\u0275text(14, "Now showing");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(15, "strong");
      \u0275\u0275text(16);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(17, "nav", 5)(18, "button", 6);
      \u0275\u0275domListener("click", function DebateExampleWalkthroughComponent_Template_button_click_18_listener() {
        return ctx.restart();
      });
      \u0275\u0275text(19, "Restart");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(20, "button", 7);
      \u0275\u0275domListener("click", function DebateExampleWalkthroughComponent_Template_button_click_20_listener() {
        return ctx.togglePlayback();
      });
      \u0275\u0275text(21);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(22, "button", 8);
      \u0275\u0275domListener("click", function DebateExampleWalkthroughComponent_Template_button_click_22_listener() {
        return ctx.next();
      });
      \u0275\u0275text(23, "Next step");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(24, "div", 9);
      \u0275\u0275domElement(25, "i");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(26, "section", 10)(27, "aside", 11)(28, "header")(29, "span");
      \u0275\u0275text(30);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(31, "div")(32, "small");
      \u0275\u0275text(33, "Arguing");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(34, "h2", 12);
      \u0275\u0275text(35);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(36, "p");
      \u0275\u0275text(37);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(38, "ol");
      \u0275\u0275repeaterCreate(39, DebateExampleWalkthroughComponent_For_40_Template, 12, 8, "li", 13, _forTrack0, false, DebateExampleWalkthroughComponent_ForEmpty_41_Template, 2, 0, "li", 14);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(42, "section", 15)(43, "section", 16)(44, "header")(45, "div")(46, "small");
      \u0275\u0275text(47, "Live argument thread");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(48, "h2", 17);
      \u0275\u0275text(49, "A finished debate, rebuilt step by step");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(50, "span");
      \u0275\u0275text(51);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(52, "div", 18, 0);
      \u0275\u0275conditionalCreate(54, DebateExampleWalkthroughComponent_Conditional_54_Template, 7, 0, "div", 19);
      \u0275\u0275domElementStart(55, "ol");
      \u0275\u0275repeaterCreate(56, DebateExampleWalkthroughComponent_For_57_Template, 2, 1, null, null, _forTrack0);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275conditionalCreate(58, DebateExampleWalkthroughComponent_Conditional_58_Template, 18, 2, "section", 20)(59, DebateExampleWalkthroughComponent_Conditional_59_Template, 7, 4, "footer", 21);
      \u0275\u0275conditionalCreate(60, DebateExampleWalkthroughComponent_Conditional_60_Template, 14, 0, "aside", 22);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(61, "aside", 23)(62, "header")(63, "span");
      \u0275\u0275text(64);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(65, "div")(66, "small");
      \u0275\u0275text(67, "Arguing");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(68, "h2", 24);
      \u0275\u0275text(69);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(70, "p");
      \u0275\u0275text(71);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(72, "ol");
      \u0275\u0275repeaterCreate(73, DebateExampleWalkthroughComponent_For_74_Template, 12, 8, "li", 13, _forTrack0, false, DebateExampleWalkthroughComponent_ForEmpty_75_Template, 2, 0, "li", 14);
      \u0275\u0275domElementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275styleProp("--%NS%chamber-image", "url(" + ctx.runtime.config.chamberImageUrl + ")");
      \u0275\u0275classProp("builder-open", ctx.builderOpen());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.runtime.config.title);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.runtime.config.centralQuestion);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.walkthroughLabel());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.playing() ? "Pause" : "Play", " ");
      \u0275\u0275advance();
      \u0275\u0275domProperty("disabled", ctx.scene() >= ctx.maxScene());
      \u0275\u0275advance(3);
      \u0275\u0275styleProp("width", ctx.scene() / ctx.maxScene() * 100, "%");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.runtime.config.factions[0].emblem);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.runtime.config.factions[0].railLabel);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.config.factions[0].position);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.leftArchive());
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate1("", ctx.visibleTimeline().length, " entries shown");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.scene() === 0 ? 54 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.visibleTimeline());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.builderOpen() ? 58 : 59);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.resultsOpen() ? 60 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.runtime.config.factions[1].emblem);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.runtime.config.factions[1].railLabel);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.config.factions[1].position);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.rightArchive());
    }
  }, styles: ['@charset "UTF-8";\n\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: calc(100dvh - 10rem);\n  color: #f2dfb6;\n  background: #0d0806;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #f1c96e;\n  outline-offset: 2px;\n}\n.example-debate[_ngcontent-%COMP%] {\n  height: calc(100dvh - 10rem);\n  min-height: 42rem;\n  overflow: hidden;\n  background: #0d0806;\n}\n.example-header[_ngcontent-%COMP%] {\n  display: grid;\n  height: 5.7rem;\n  grid-template-columns: minmax(12rem, 1.15fr) minmax(18rem, 2fr) minmax(13rem, 1.2fr) auto;\n  align-items: center;\n  gap: 1rem;\n  border-bottom: 1px solid rgba(189, 150, 83, 0.3215686275);\n  padding: 0.55rem 1rem;\n  box-sizing: border-box;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(23, 16, 13, 0.968627451),\n      rgba(16, 10, 8, 0.9725490196));\n}\n.example-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.example-header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.example-thread[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.example-builder[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.example-rail[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.collapsed-builder[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.example-results[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #b99d68;\n  font-size: 0.58rem;\n  font-weight: 800;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n.example-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.example-header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.example-header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n.example-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0.12rem 0 0;\n  font: 700 1rem Georgia, serif;\n  text-transform: uppercase;\n}\n.example-question[_ngcontent-%COMP%] {\n  min-width: 0;\n  border-inline: 1px solid rgba(184, 148, 78, 0.2588235294);\n  padding-inline: 1rem;\n}\n.example-question[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 0.15rem;\n  overflow: hidden;\n  font: 700 0.76rem/1.3 Georgia, serif;\n}\n.walkthrough-status[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 0.15rem;\n  color: #ddc58f;\n  font: 700 0.72rem/1.25 Georgia, serif;\n}\n.example-header[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.35rem;\n}\n.example-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.collapsed-builder[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #b79759;\n  padding: 0.5rem 0.65rem;\n  color: #e9d6aa;\n  background: #2a1a13;\n  font-size: 0.65rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.example-header[_ngcontent-%COMP%]   button.play-control[_ngcontent-%COMP%] {\n  color: #29170d;\n  background: #e4c476;\n}\n.walkthrough-progress[_ngcontent-%COMP%] {\n  height: 0.22rem;\n  background: #22150f;\n}\n.walkthrough-progress[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: block;\n  width: 0;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #95713d,\n      #f1ca6f);\n  transition: width 500ms ease;\n}\n.example-layout[_ngcontent-%COMP%] {\n  display: grid;\n  height: calc(100% - 5.92rem);\n  min-height: 0;\n  grid-template-columns: 15% minmax(0, 70%) 15%;\n  background-image:\n    linear-gradient(\n      180deg,\n      rgba(9, 5, 3, 0.3215686275),\n      rgba(9, 5, 3, 0.768627451)),\n    var(--%NS%chamber-image);\n  background-position: center;\n  background-size: cover;\n}\n.example-rail[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  min-height: 0;\n  grid-template-rows: auto auto minmax(0, 1fr);\n  border-inline: 1px solid rgba(193, 155, 87, 0.3019607843);\n  background:\n    linear-gradient(\n      90deg,\n      rgba(13, 8, 6, 0.9333333333),\n      rgba(40, 23, 14, 0.862745098) 48%,\n      rgba(13, 8, 6, 0.9333333333));\n}\n.example-rail[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0.6rem;\n  align-items: center;\n  padding: 0.8rem 0.7rem 0.55rem;\n}\n.example-rail[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.35rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #d2b166;\n  border-radius: 50%;\n  color: #edcf88;\n  font: 700 0.82rem Georgia, serif;\n}\n.example-rail[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.1rem 0 0;\n  color: #eed7a5;\n  font: 700 clamp(0.68rem, 0.92vw, 0.88rem)/1.15 Georgia, serif;\n  text-transform: uppercase;\n}\n.example-rail[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0;\n  border-block: 1px solid rgba(185, 144, 74, 0.2392156863);\n  padding: 0.5rem 0.65rem;\n  color: #bdaa80;\n  font: 0.61rem/1.35 Georgia, serif;\n}\n.example-rail[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 0.42rem;\n  margin: 0;\n  padding: 0.65rem 0.5rem;\n  overflow-y: auto;\n  list-style: none;\n  scrollbar-color: #98723d #160d09;\n}\n.example-rail[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border: 1px solid rgba(165, 126, 65, 0.3019607843);\n  color: #3b2415;\n  background:\n    linear-gradient(\n      135deg,\n      #f2dca7,\n      #cba367);\n  animation: _ngcontent-%COMP%_archive-enter 420ms ease both;\n}\n.archive-summary[_ngcontent-%COMP%] {\n  display: grid;\n  width: 100%;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  gap: 0.42rem;\n  align-items: center;\n  border: 0;\n  padding: 0.52rem;\n  color: #3b2415;\n  background: transparent;\n  text-align: left;\n  cursor: pointer;\n}\n.archive-summary[_ngcontent-%COMP%]    > b[_ngcontent-%COMP%] {\n  font: 700 0.72rem Georgia, serif;\n}\n.archive-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.archive-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  overflow: hidden;\n}\n.archive-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #75502f;\n  font-size: 0.52rem;\n  letter-spacing: 0;\n}\n.archive-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 0.08rem;\n  font: 700 0.67rem Georgia, serif;\n}\n.archive-summary[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  font-style: normal;\n  font-weight: 900;\n}\n.archive-details[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.28rem;\n  border-top: 1px solid rgba(121, 81, 46, 0.2705882353);\n  padding: 0.45rem 0.52rem 0.55rem;\n  background: rgba(244, 223, 172, 0.6509803922);\n}\n.archive-details[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #75502e;\n  padding: 0.34rem;\n  color: #3a2112;\n  background: #fff0c7;\n  font-size: 0.59rem;\n  font-weight: 800;\n  text-align: left;\n  cursor: pointer;\n}\n.archive-details[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  color: #704726;\n  font-size: 0.55rem;\n  text-transform: uppercase;\n}\n.archive-details[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  border-left: 0.15rem solid #80603b;\n  padding-left: 0.35rem;\n  font: 0.58rem/1.25 Georgia, serif;\n}\n.example-rail[_ngcontent-%COMP%]   li.rail-empty[_ngcontent-%COMP%] {\n  border-style: dashed;\n  padding: 0.7rem;\n  color: #bca77d;\n  background: rgba(34, 21, 14, 0.8509803922);\n  font: italic 0.64rem/1.4 Georgia, serif;\n}\n.example-center[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  min-width: 0;\n  min-height: 0;\n  grid-template-rows: minmax(0, 1fr) 4rem;\n  overflow: hidden;\n}\n.example-debate.builder-open[_ngcontent-%COMP%]   .example-center[_ngcontent-%COMP%] {\n  grid-template-rows: 35% 65%;\n}\n.example-thread[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 0;\n  grid-template-rows: auto minmax(0, 1fr);\n  border-inline: 1px solid rgba(195, 157, 89, 0.2509803922);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(18, 11, 8, 0.6784313725),\n      rgba(28, 17, 12, 0.7215686275));\n}\n.example-thread[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid rgba(184, 144, 77, 0.3019607843);\n  padding: 0.55rem 0.85rem;\n  background: rgba(18, 11, 9, 0.9098039216);\n}\n.example-thread[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.1rem 0 0;\n  font: 700 0.9rem Georgia, serif;\n}\n.example-thread[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #c7ad77;\n  font-size: 0.62rem;\n}\n.thread-window[_ngcontent-%COMP%] {\n  min-height: 0;\n  overflow-y: auto;\n  scrollbar-color: #a47e46 #140c09;\n}\n.thread-window[_ngcontent-%COMP%]    > ol[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.7rem;\n  max-width: 60rem;\n  margin: 0 auto;\n  padding: 1.1rem clamp(0.8rem, 4vw, 3.6rem) 1.8rem;\n  list-style: none;\n}\n.empty-stage[_ngcontent-%COMP%] {\n  display: grid;\n  height: 100%;\n  place-content: center;\n  justify-items: center;\n  padding: 2rem;\n  text-align: center;\n}\n.empty-stage[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 4rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 0.25rem double #c8a254;\n  border-radius: 50%;\n  color: #dabb76;\n  font: 700 0.75rem Georgia, serif;\n}\n.empty-stage[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 0.7rem;\n  font: 700 1.2rem Georgia, serif;\n}\n.empty-stage[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 28rem;\n  color: #bba77e;\n  font-size: 0.72rem;\n}\n.demo-speech[_ngcontent-%COMP%] {\n  display: flex;\n}\n.demo-speech.left[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n  padding-right: 16%;\n}\n.demo-speech.right[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n  padding-left: 16%;\n}\n.demo-speech[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  width: min(100%, 37rem);\n  border: 1px solid color-mix(in srgb, var(--%NS%faction-accent) 75%, #efd99f);\n  border-radius: 0.75rem;\n  padding: 0.72rem 0.85rem;\n  color: #2e1b10;\n  background:\n    linear-gradient(\n      145deg,\n      #f4e2b6,\n      #d1ae73);\n}\n.demo-speech.left[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border-bottom-left-radius: 0.1rem;\n}\n.demo-speech.right[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border-bottom-right-radius: 0.1rem;\n}\n.demo-speech[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 0.5rem;\n}\n.demo-speech[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.8rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #f2dba2;\n  background: #3c2316;\n  font: 700 0.65rem Georgia, serif;\n}\n.demo-speech[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.demo-speech[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n}\n.demo-speech[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #795234;\n  font-size: 0.5rem;\n  letter-spacing: 0;\n}\n.demo-speech[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 0.72rem Georgia, serif;\n}\n.demo-speech[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: #765033;\n  font-size: 0.52rem;\n  text-transform: uppercase;\n}\n.demo-speech[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  overflow: hidden;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n  margin: 0.55rem 0;\n  font: 0.74rem/1.42 Georgia, serif;\n}\n.demo-speech[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.5rem;\n  border-top: 1px solid rgba(117, 80, 47, 0.2509803922);\n  padding-top: 0.35rem;\n  color: #704a2c;\n  font-size: 0.54rem;\n}\n.demo-moderator[_ngcontent-%COMP%] {\n  display: grid;\n  width: min(84%, 42rem);\n  grid-template-columns: auto 1fr;\n  gap: 0.65rem;\n  justify-self: center;\n  align-items: center;\n  border: 1px solid #81a9a6;\n  border-radius: 0.55rem;\n  padding: 0.65rem 0.75rem;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(36, 58, 59, 0.862745098),\n      rgba(19, 39, 41, 0.9098039216));\n}\n.demo-moderator[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #acd0ca;\n  border-radius: 50%;\n  color: #d9efea;\n  font: 700 0.62rem Georgia, serif;\n}\n.demo-moderator[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #a7cfca;\n}\n.demo-moderator[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.18rem;\n  font: 700 0.76rem/1.35 Georgia, serif;\n}\n.just-added[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_bubble-enter 650ms cubic-bezier(0.2, 0.8, 0.2, 1) both;\n}\n.collapsed-builder[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-top: 2px solid #cba656;\n  padding: 0.6rem 0.8rem;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(33, 20, 14, 0.9333333333),\n      rgba(16, 10, 8, 0.9725490196));\n}\n.collapsed-builder[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.1rem;\n  font: 700 0.78rem Georgia, serif;\n}\n.collapsed-builder.filed[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #bcd09d;\n}\n.example-builder[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 0;\n  grid-template-rows: auto auto minmax(0, 1fr);\n  border-top: 2px solid #d2ab59;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(33, 20, 15, 0.9607843137),\n      rgba(15, 9, 7, 0.9803921569));\n  animation: _ngcontent-%COMP%_builder-rise 520ms ease both;\n}\n.example-builder[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.6rem 0.85rem 0.45rem;\n}\n.example-builder[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.1rem 0 0;\n  font: 700 0.9rem Georgia, serif;\n}\n.demo-badge[_ngcontent-%COMP%] {\n  border: 1px solid #7ea19a;\n  border-radius: 999px;\n  padding: 0.28rem 0.55rem;\n  color: #b8d6ce;\n  font-size: 0.56rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.example-builder[_ngcontent-%COMP%]    > nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.18rem;\n  overflow-x: auto;\n  border-block: 1px solid rgba(177, 140, 76, 0.3019607843);\n  padding: 0.25rem 0.65rem 0;\n  background: #110a08;\n}\n.example-builder[_ngcontent-%COMP%]    > nav[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  border: 1px solid transparent;\n  border-bottom: 0;\n  padding: 0.42rem 0.62rem;\n  color: #a8946c;\n  font-size: 0.61rem;\n  font-weight: 800;\n  text-transform: capitalize;\n}\n.example-builder[_ngcontent-%COMP%]    > nav[_ngcontent-%COMP%]   span.active[_ngcontent-%COMP%] {\n  border-color: #bd9853;\n  color: #f1dca9;\n  background: #2b1a12;\n}\n.example-builder[_ngcontent-%COMP%]    > nav[_ngcontent-%COMP%]   span.complete[_ngcontent-%COMP%] {\n  color: #a9c08a;\n}\n.example-builder[_ngcontent-%COMP%]    > nav[_ngcontent-%COMP%]   span.complete[_ngcontent-%COMP%]::before {\n  margin-right: 0.25rem;\n  content: "\\2713";\n}\n.builder-stage[_ngcontent-%COMP%] {\n  min-height: 0;\n  overflow: auto;\n  padding: 0.8rem;\n}\n.stage-enter[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_stage-enter 420ms ease both;\n}\n.plan-demo[_ngcontent-%COMP%], \n.feedback-demo[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.65rem;\n}\n.plan-demo[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n.feedback-demo[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border: 1px solid rgba(183, 146, 81, 0.3098039216);\n  padding: 0.75rem;\n  background: rgba(45, 27, 19, 0.8745098039);\n}\n.plan-demo[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]:first-child {\n  border-color: #729a99;\n  background: rgba(29, 52, 53, 0.8745098039);\n}\n.plan-demo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.25rem;\n  font: 700 0.82rem/1.4 Georgia, serif;\n}\n.plan-demo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.feedback-demo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #d2bd92;\n  font-size: 0.72rem;\n  line-height: 1.45;\n}\n.evidence-demo[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.55rem;\n}\n.evidence-demo[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #c8b180;\n  font-size: 0.68rem;\n}\n.evidence-demo[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  gap: 0.65rem;\n  align-items: center;\n  border: 1px solid #bd9c59;\n  padding: 0.75rem;\n  background: #2a1a12;\n  animation: _ngcontent-%COMP%_evidence-pin 520ms ease both;\n}\n.evidence-demo[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]:nth-of-type(2) {\n  animation-delay: 250ms;\n}\n.evidence-demo[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.8rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #213018;\n  background: #b8cf91;\n  font-style: normal;\n}\n.evidence-demo[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.12rem;\n  font: 700 0.76rem Georgia, serif;\n}\n.evidence-demo[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > b[_ngcontent-%COMP%] {\n  color: #b7cf90;\n  font-size: 0.56rem;\n}\n.write-demo[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.6fr 0.9fr;\n  gap: 0.7rem;\n}\n.write-demo[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  grid-column: 1;\n  display: flex;\n  justify-content: space-between;\n  color: #6b482c;\n  font-size: 0.6rem;\n}\n.write-demo[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  grid-column: 1;\n  min-height: 8rem;\n  margin: 0;\n  border: 1px solid #bd9b5e;\n  padding: 0.75rem;\n  color: #2b190f;\n  background: #f3e1b5;\n  font: 0.76rem/1.5 Georgia, serif;\n}\n.write-demo[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 0.08rem;\n  height: 0.9rem;\n  margin-left: 0.12rem;\n  background: #5f3920;\n  animation: _ngcontent-%COMP%_cursor 500ms steps(1) infinite;\n}\n.write-demo[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%] {\n  grid-column: 2;\n  grid-row: 1/span 2;\n  border: 1px solid #779b94;\n  padding: 0.75rem;\n  background: #193032;\n}\n.write-demo[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.35rem;\n  font: 700 0.78rem/1.45 Georgia, serif;\n}\n.feedback-demo[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  margin: 0.55rem 0 0;\n  padding: 0;\n  color: #c8dbad;\n  font-size: 0.7rem;\n  list-style: none;\n}\n.feedback-demo[_ngcontent-%COMP%]   .teacher-note[_ngcontent-%COMP%] {\n  border-color: #789d96;\n  background: #1c3434;\n}\n.file-demo[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: 0.8fr 1.4fr 0.8fr;\n  gap: 0.7rem;\n  align-items: stretch;\n}\n.file-demo[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: center;\n  border: 1px solid rgba(184, 145, 78, 0.3490196078);\n  padding: 0.8rem;\n  background: #2a1911;\n}\n.recording[_ngcontent-%COMP%] {\n  grid-template-columns: auto 1fr auto !important;\n  gap: 0.45rem;\n}\n.recording[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  width: 0.55rem;\n  height: 0.55rem;\n  border-radius: 50%;\n  background: #9bc37c;\n  box-shadow: 0 0 0.6rem #9bc37c;\n}\n.recording[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.filing-progress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d7c096;\n  font-size: 0.66rem;\n}\n.filing-progress[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: block;\n  height: 0.4rem;\n  margin-top: 0.55rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: #140b08;\n}\n.filing-progress[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #926d37,\n      #efd071);\n  animation: _ngcontent-%COMP%_file-progress 2.1s ease both;\n}\n.file-stamp[_ngcontent-%COMP%] {\n  place-items: center;\n  border: 0.25rem double #c99f50 !important;\n  color: #efd17f;\n  font: 800 1.35rem Georgia, serif;\n  transform: rotate(-2deg);\n  animation: _ngcontent-%COMP%_stamp 600ms 1.5s ease both;\n}\n.file-stamp[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.3rem;\n  text-align: center;\n}\n.example-results[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 10;\n  right: 1rem;\n  bottom: 4.8rem;\n  left: 1rem;\n  border: 1px solid #d0ad61;\n  padding: 0.9rem 1rem;\n  color: #ead8af;\n  background: rgba(27, 17, 13, 0.9490196078);\n  animation: _ngcontent-%COMP%_stage-enter 420ms ease both;\n}\n.example-results[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  gap: 0.6rem;\n  align-items: center;\n  margin-top: 0.7rem;\n  font-size: 0.65rem;\n}\n.example-results[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  display: block;\n  height: 0.65rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: #6d3b2e;\n}\n.example-results[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  width: 58%;\n  height: 100%;\n  background: #75908b;\n}\n@keyframes _ngcontent-%COMP%_bubble-enter {\n  from {\n    opacity: 0;\n    transform: translateY(2.5rem) scale(0.94);\n  }\n}\n@keyframes _ngcontent-%COMP%_archive-enter {\n  from {\n    opacity: 0;\n    transform: translateX(-1.2rem);\n  }\n}\n@keyframes _ngcontent-%COMP%_builder-rise {\n  from {\n    opacity: 0;\n    transform: translateY(30%);\n  }\n}\n@keyframes _ngcontent-%COMP%_stage-enter {\n  from {\n    opacity: 0;\n    transform: translateY(0.8rem);\n  }\n}\n@keyframes _ngcontent-%COMP%_evidence-pin {\n  from {\n    opacity: 0;\n    transform: translateX(-1rem);\n  }\n}\n@keyframes _ngcontent-%COMP%_cursor {\n  50% {\n    opacity: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_file-progress {\n  from {\n    width: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_stamp {\n  from {\n    opacity: 0;\n    transform: scale(1.8) rotate(-8deg);\n  }\n}\n@media (max-width: 1000px) {\n  .example-header[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1.6fr auto;\n  }\n  .walkthrough-status[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .example-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 18% minmax(0, 64%) 18%;\n  }\n}\n@media (max-width: 760px) {\n  [_nghost-%COMP%], \n   .example-debate[_ngcontent-%COMP%] {\n    height: auto;\n    min-height: calc(100dvh - 3.25rem);\n    overflow: visible;\n  }\n  .example-header[_ngcontent-%COMP%] {\n    height: auto;\n    grid-template-columns: 1fr auto;\n  }\n  .example-question[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .example-layout[_ngcontent-%COMP%] {\n    height: auto;\n    grid-template-columns: 1fr;\n  }\n  .example-center[_ngcontent-%COMP%] {\n    min-height: 44rem;\n    grid-row: 1;\n  }\n  .example-rail[_ngcontent-%COMP%] {\n    min-height: 18rem;\n  }\n  .demo-speech.left[_ngcontent-%COMP%], \n   .demo-speech.right[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .plan-demo[_ngcontent-%COMP%], \n   .feedback-demo[_ngcontent-%COMP%], \n   .write-demo[_ngcontent-%COMP%], \n   .file-demo[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .write-demo[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n   .write-demo[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%], \n   .write-demo[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: auto;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n/*# sourceMappingURL=debate-example-walkthrough.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DebateExampleWalkthroughComponent, [{
    type: Component,
    args: [{ selector: "app-debate-example-walkthrough", template: `<main
  class="example-debate"
  [class.builder-open]="builderOpen()"
  [style.--chamber-image]="'url(' + runtime.config.chamberImageUrl + ')'"
>
  <header class="example-header">
    <div>
      <span>Finished project example \xB7 animated walkthrough</span>
      <h1>{{ runtime.config.title }}</h1>
    </div>
    <div class="example-question">
      <small>Question before the class</small>
      <strong>{{ runtime.config.centralQuestion }}</strong>
    </div>
    <div class="walkthrough-status" aria-live="polite">
      <small>Now showing</small>
      <strong>{{ walkthroughLabel() }}</strong>
    </div>
    <nav aria-label="Walkthrough controls">
      <button type="button" (click)="restart()">Restart</button>
      <button class="play-control" type="button" (click)="togglePlayback()">
        {{ playing() ? 'Pause' : 'Play' }}
      </button>
      <button type="button" [disabled]="scene() >= maxScene()" (click)="next()">Next step</button>
    </nav>
  </header>

  <div class="walkthrough-progress" aria-hidden="true">
    <i [style.width.%]="(scene() / maxScene()) * 100"></i>
  </div>

  <section class="example-layout">
    <aside class="example-rail left-example-rail" aria-labelledby="left-example-title">
      <header>
        <span>{{ runtime.config.factions[0].emblem }}</span>
        <div>
          <small>Arguing</small>
          <h2 id="left-example-title">{{ runtime.config.factions[0].railLabel }}</h2>
        </div>
      </header>
      <p>{{ runtime.config.factions[0].position }}</p>
      <ol>
        @for (segment of leftArchive(); track segment.id; let index = $index) {
          <li [class.expanded]="expandedArchiveId() === segment.id">
            <button
              type="button"
              class="archive-summary"
              [attr.aria-expanded]="expandedArchiveId() === segment.id"
              (click)="toggleArchive(segment)"
            >
              <b>{{ index + 1 }}</b
              ><span
                ><small>{{ segment.roundLabel }}</small
                ><strong>{{ segment.speakerDisplayName }}</strong></span
              ><i>{{ expandedArchiveId() === segment.id ? '\u2212' : '+' }}</i>
            </button>
            @if (expandedArchiveId() === segment.id) {
              <div class="archive-details">
                <button type="button" (click)="hear(segment)">\u25B6 Hear argument</button>
                <strong>Evidence presented</strong>
                @for (evidenceId of segment.evidenceIds; track evidenceId) {
                  <span>{{ evidenceTitle(evidenceId) }}</span>
                }
              </div>
            }
          </li>
        } @empty {
          <li class="rail-empty">Arguments appear here as they are filed.</li>
        }
      </ol>
    </aside>

    <section class="example-center" aria-label="Animated debate workspace">
      <section class="example-thread" aria-labelledby="example-thread-title">
        <header>
          <div>
            <small>Live argument thread</small>
            <h2 id="example-thread-title">A finished debate, rebuilt step by step</h2>
          </div>
          <span>{{ visibleTimeline().length }} entries shown</span>
        </header>
        <div #threadScroller class="thread-window">
          @if (scene() === 0) {
            <div class="empty-stage">
              <span>SPQR</span><strong>The chamber is ready</strong>
              <p>Press Play or Next step to watch the completed class project take shape.</p>
            </div>
          }
          <ol>
            @for (segment of visibleTimeline(); track segment.id) {
              @if (segment.kind === 'moderator') {
                <li class="demo-moderator" [class.just-added]="currentSegment()?.id === segment.id">
                  <span>{{ runtime.config.moderator.initials }}</span>
                  <div>
                    <small>Moderator question \xB7 neutral</small
                    ><strong>{{ segment.transcript }}</strong>
                  </div>
                </li>
              } @else {
                <li
                  class="demo-speech"
                  [class.left]="isLeft(segment)"
                  [class.right]="!isLeft(segment)"
                  [class.just-added]="currentSegment()?.id === segment.id"
                >
                  <article [style.--faction-accent]="faction(segment)?.accent">
                    <header>
                      <span>{{ faction(segment)?.emblem }}</span>
                      <div>
                        <small>{{ faction(segment)?.railLabel }}</small
                        ><strong>{{ segment.speakerDisplayName }}</strong>
                      </div>
                      <b>{{ segment.roundLabel }}</b>
                    </header>
                    <p>{{ segment.transcript }}</p>
                    <footer>
                      <span>{{ segment.evidenceIds.length }} sources cited</span
                      ><strong>{{
                        scene() === 9 && currentSegment()?.id === segment.id
                          ? '\u2713 Just filed'
                          : 'Filed argument'
                      }}</strong>
                    </footer>
                  </article>
                </li>
              }
            }
          </ol>
        </div>
      </section>

      @if (builderOpen()) {
        <section class="example-builder" aria-labelledby="example-builder-title">
          <header>
            <div>
              <small>Build the next argument</small>
              <h2 id="example-builder-title">Response round \xB7 Evidence Senator</h2>
            </div>
            <span class="demo-badge">Demonstration</span>
          </header>
          <nav aria-label="Builder demonstration stages">
            @for (tab of ['plan', 'evidence', 'write', 'feedback', 'file']; track tab) {
              <span
                [class.active]="builderStage() === tab"
                [class.complete]="
                  ['plan', 'evidence', 'write', 'feedback', 'file'].indexOf(tab) <
                  ['plan', 'evidence', 'write', 'feedback', 'file'].indexOf(builderStage())
                "
                >{{ tab === 'file' ? 'Record & file' : tab }}</span
              >
            }
          </nav>
          <div class="builder-stage">
            @switch (builderStage()) {
              @case ('plan') {
                <div class="plan-demo stage-enter">
                  <article>
                    <small>Moderator asks</small><strong>{{ timeline()[2].transcript }}</strong>
                  </article>
                  <article>
                    <small>Plan the response</small>
                    <p>
                      Answer the limit on emergency power, acknowledge the strongest opposing point,
                      and connect the claim to Rome\u2019s future.
                    </p>
                  </article>
                </div>
              }
              @case ('evidence') {
                <div class="evidence-demo stage-enter">
                  <span>Evidence is reviewed and pinned</span>
                  @for (evidenceId of responseSegment()?.evidenceIds ?? []; track evidenceId) {
                    <article>
                      <i>\u2713</i>
                      <div>
                        <small>Selected source</small
                        ><strong>{{ evidenceTitle(evidenceId) }}</strong>
                      </div>
                      <b>PINNED</b>
                    </article>
                  }
                </div>
              }
              @case ('write') {
                <div class="write-demo stage-enter">
                  <header>
                    <span>Speech draft</span
                    ><b>{{ typedDraft().split(' ').length }} words \xB7 saving</b>
                  </header>
                  <p>{{ typedDraft() }}<i aria-hidden="true"></i></p>
                  <aside>
                    <small>Reasoning</small
                    ><strong>{{
                      responseSegment()?.turnId
                        ? 'The evidence supports action, but action alone does not justify authority without limits.'
                        : ''
                    }}</strong>
                  </aside>
                </div>
              }
              @case ('feedback') {
                <div class="feedback-demo stage-enter">
                  <article>
                    <small>Readiness check</small>
                    <ul>
                      <li>\u2713 Opposing claim answered</li>
                      <li>\u2713 Moderator question addressed</li>
                      <li>\u2713 Two sources connected</li>
                      <li>\u2713 Reasoning explained</li>
                    </ul>
                  </article>
                  <article class="teacher-note">
                    <small>Teacher feedback</small>
                    <p>
                      Strong revision. You acknowledged the opposing evidence and narrowed the
                      claim. File when the recording is reviewed.
                    </p>
                  </article>
                </div>
              }
              @case ('file') {
                <div class="file-demo stage-enter">
                  <div class="recording">
                    <i></i><span>Recording reviewed</span><strong>0:55</strong>
                  </div>
                  <div class="filing-progress">
                    <span>Sealing argument into the class record</span><i><b></b></i>
                  </div>
                  <div class="file-stamp">FILED <small>Evidence and reasoning attached</small></div>
                </div>
              }
            }
          </div>
        </section>
      } @else {
        <footer class="collapsed-builder" [class.filed]="scene() >= 9">
          <div>
            <small>Build the next argument</small
            ><strong>{{
              scene() >= 9
                ? 'Response filed \xB7 builder closed'
                : 'The builder opens after the moderator question'
            }}</strong>
          </div>
          @if (scene() >= maxScene()) {
            <button type="button" (click)="resultsOpen.set(!resultsOpen())">
              {{ resultsOpen() ? 'Hide class results' : 'Reveal class results' }}
            </button>
          }
        </footer>
      }

      @if (resultsOpen()) {
        <aside class="example-results">
          <span>Completed fictional class</span
          ><strong>10 filed arguments \xB7 all required evidence attached</strong>
          <div>
            <b>Republic defenders 58%</b><i><span></span></i><b>Caesarian reformers 42%</b>
          </div>
          <p>The result measures persuasion in this sample, not individual mastery.</p>
        </aside>
      }
    </section>

    <aside class="example-rail right-example-rail" aria-labelledby="right-example-title">
      <header>
        <span>{{ runtime.config.factions[1].emblem }}</span>
        <div>
          <small>Arguing</small>
          <h2 id="right-example-title">{{ runtime.config.factions[1].railLabel }}</h2>
        </div>
      </header>
      <p>{{ runtime.config.factions[1].position }}</p>
      <ol>
        @for (segment of rightArchive(); track segment.id; let index = $index) {
          <li [class.expanded]="expandedArchiveId() === segment.id">
            <button
              type="button"
              class="archive-summary"
              [attr.aria-expanded]="expandedArchiveId() === segment.id"
              (click)="toggleArchive(segment)"
            >
              <b>{{ index + 1 }}</b
              ><span
                ><small>{{ segment.roundLabel }}</small
                ><strong>{{ segment.speakerDisplayName }}</strong></span
              ><i>{{ expandedArchiveId() === segment.id ? '\u2212' : '+' }}</i>
            </button>
            @if (expandedArchiveId() === segment.id) {
              <div class="archive-details">
                <button type="button" (click)="hear(segment)">\u25B6 Hear argument</button>
                <strong>Evidence presented</strong>
                @for (evidenceId of segment.evidenceIds; track evidenceId) {
                  <span>{{ evidenceTitle(evidenceId) }}</span>
                }
              </div>
            }
          </li>
        } @empty {
          <li class="rail-empty">Arguments appear here as they are filed.</li>
        }
      </ol>
    </aside>
  </section>
</main>
`, styles: ['@charset "UTF-8";\n\n/* src/app/templates/debate-studio/ui/debate-example-walkthrough.component.scss */\n:host {\n  display: block;\n  min-height: calc(100dvh - 10rem);\n  color: #f2dfb6;\n  background: #0d0806;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\nbutton {\n  font: inherit;\n}\nbutton:focus-visible {\n  outline: 3px solid #f1c96e;\n  outline-offset: 2px;\n}\n.example-debate {\n  height: calc(100dvh - 10rem);\n  min-height: 42rem;\n  overflow: hidden;\n  background: #0d0806;\n}\n.example-header {\n  display: grid;\n  height: 5.7rem;\n  grid-template-columns: minmax(12rem, 1.15fr) minmax(18rem, 2fr) minmax(13rem, 1.2fr) auto;\n  align-items: center;\n  gap: 1rem;\n  border-bottom: 1px solid rgba(189, 150, 83, 0.3215686275);\n  padding: 0.55rem 1rem;\n  box-sizing: border-box;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(23, 16, 13, 0.968627451),\n      rgba(16, 10, 8, 0.9725490196));\n}\n.example-header span,\n.example-header small,\n.example-thread small,\n.example-builder small,\n.example-rail small,\n.collapsed-builder small,\n.example-results > span {\n  color: #b99d68;\n  font-size: 0.58rem;\n  font-weight: 800;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n.example-header h1,\n.example-header strong,\n.example-header small {\n  display: block;\n}\n.example-header h1 {\n  margin: 0.12rem 0 0;\n  font: 700 1rem Georgia, serif;\n  text-transform: uppercase;\n}\n.example-question {\n  min-width: 0;\n  border-inline: 1px solid rgba(184, 148, 78, 0.2588235294);\n  padding-inline: 1rem;\n}\n.example-question strong {\n  margin-top: 0.15rem;\n  overflow: hidden;\n  font: 700 0.76rem/1.3 Georgia, serif;\n}\n.walkthrough-status strong {\n  margin-top: 0.15rem;\n  color: #ddc58f;\n  font: 700 0.72rem/1.25 Georgia, serif;\n}\n.example-header nav {\n  display: flex;\n  gap: 0.35rem;\n}\n.example-header button,\n.collapsed-builder button {\n  border: 1px solid #b79759;\n  padding: 0.5rem 0.65rem;\n  color: #e9d6aa;\n  background: #2a1a13;\n  font-size: 0.65rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.example-header button.play-control {\n  color: #29170d;\n  background: #e4c476;\n}\n.walkthrough-progress {\n  height: 0.22rem;\n  background: #22150f;\n}\n.walkthrough-progress i {\n  display: block;\n  width: 0;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #95713d,\n      #f1ca6f);\n  transition: width 500ms ease;\n}\n.example-layout {\n  display: grid;\n  height: calc(100% - 5.92rem);\n  min-height: 0;\n  grid-template-columns: 15% minmax(0, 70%) 15%;\n  background-image:\n    linear-gradient(\n      180deg,\n      rgba(9, 5, 3, 0.3215686275),\n      rgba(9, 5, 3, 0.768627451)),\n    var(--chamber-image);\n  background-position: center;\n  background-size: cover;\n}\n.example-rail {\n  display: grid;\n  min-width: 0;\n  min-height: 0;\n  grid-template-rows: auto auto minmax(0, 1fr);\n  border-inline: 1px solid rgba(193, 155, 87, 0.3019607843);\n  background:\n    linear-gradient(\n      90deg,\n      rgba(13, 8, 6, 0.9333333333),\n      rgba(40, 23, 14, 0.862745098) 48%,\n      rgba(13, 8, 6, 0.9333333333));\n}\n.example-rail > header {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0.6rem;\n  align-items: center;\n  padding: 0.8rem 0.7rem 0.55rem;\n}\n.example-rail > header > span {\n  display: grid;\n  width: 2.35rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #d2b166;\n  border-radius: 50%;\n  color: #edcf88;\n  font: 700 0.82rem Georgia, serif;\n}\n.example-rail h2 {\n  margin: 0.1rem 0 0;\n  color: #eed7a5;\n  font: 700 clamp(0.68rem, 0.92vw, 0.88rem)/1.15 Georgia, serif;\n  text-transform: uppercase;\n}\n.example-rail > p {\n  margin: 0;\n  border-block: 1px solid rgba(185, 144, 74, 0.2392156863);\n  padding: 0.5rem 0.65rem;\n  color: #bdaa80;\n  font: 0.61rem/1.35 Georgia, serif;\n}\n.example-rail ol {\n  display: grid;\n  align-content: start;\n  gap: 0.42rem;\n  margin: 0;\n  padding: 0.65rem 0.5rem;\n  overflow-y: auto;\n  list-style: none;\n  scrollbar-color: #98723d #160d09;\n}\n.example-rail li {\n  overflow: hidden;\n  border: 1px solid rgba(165, 126, 65, 0.3019607843);\n  color: #3b2415;\n  background:\n    linear-gradient(\n      135deg,\n      #f2dca7,\n      #cba367);\n  animation: archive-enter 420ms ease both;\n}\n.archive-summary {\n  display: grid;\n  width: 100%;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  gap: 0.42rem;\n  align-items: center;\n  border: 0;\n  padding: 0.52rem;\n  color: #3b2415;\n  background: transparent;\n  text-align: left;\n  cursor: pointer;\n}\n.archive-summary > b {\n  font: 700 0.72rem Georgia, serif;\n}\n.archive-summary span small,\n.archive-summary span strong {\n  display: block;\n  overflow: hidden;\n}\n.archive-summary span small {\n  color: #75502f;\n  font-size: 0.52rem;\n  letter-spacing: 0;\n}\n.archive-summary span strong {\n  margin-top: 0.08rem;\n  font: 700 0.67rem Georgia, serif;\n}\n.archive-summary > i {\n  font-style: normal;\n  font-weight: 900;\n}\n.archive-details {\n  display: grid;\n  gap: 0.28rem;\n  border-top: 1px solid rgba(121, 81, 46, 0.2705882353);\n  padding: 0.45rem 0.52rem 0.55rem;\n  background: rgba(244, 223, 172, 0.6509803922);\n}\n.archive-details button {\n  border: 1px solid #75502e;\n  padding: 0.34rem;\n  color: #3a2112;\n  background: #fff0c7;\n  font-size: 0.59rem;\n  font-weight: 800;\n  text-align: left;\n  cursor: pointer;\n}\n.archive-details > strong {\n  color: #704726;\n  font-size: 0.55rem;\n  text-transform: uppercase;\n}\n.archive-details > span {\n  border-left: 0.15rem solid #80603b;\n  padding-left: 0.35rem;\n  font: 0.58rem/1.25 Georgia, serif;\n}\n.example-rail li.rail-empty {\n  border-style: dashed;\n  padding: 0.7rem;\n  color: #bca77d;\n  background: rgba(34, 21, 14, 0.8509803922);\n  font: italic 0.64rem/1.4 Georgia, serif;\n}\n.example-center {\n  position: relative;\n  display: grid;\n  min-width: 0;\n  min-height: 0;\n  grid-template-rows: minmax(0, 1fr) 4rem;\n  overflow: hidden;\n}\n.example-debate.builder-open .example-center {\n  grid-template-rows: 35% 65%;\n}\n.example-thread {\n  display: grid;\n  min-height: 0;\n  grid-template-rows: auto minmax(0, 1fr);\n  border-inline: 1px solid rgba(195, 157, 89, 0.2509803922);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(18, 11, 8, 0.6784313725),\n      rgba(28, 17, 12, 0.7215686275));\n}\n.example-thread > header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid rgba(184, 144, 77, 0.3019607843);\n  padding: 0.55rem 0.85rem;\n  background: rgba(18, 11, 9, 0.9098039216);\n}\n.example-thread h2 {\n  margin: 0.1rem 0 0;\n  font: 700 0.9rem Georgia, serif;\n}\n.example-thread > header > span {\n  color: #c7ad77;\n  font-size: 0.62rem;\n}\n.thread-window {\n  min-height: 0;\n  overflow-y: auto;\n  scrollbar-color: #a47e46 #140c09;\n}\n.thread-window > ol {\n  display: grid;\n  gap: 0.7rem;\n  max-width: 60rem;\n  margin: 0 auto;\n  padding: 1.1rem clamp(0.8rem, 4vw, 3.6rem) 1.8rem;\n  list-style: none;\n}\n.empty-stage {\n  display: grid;\n  height: 100%;\n  place-content: center;\n  justify-items: center;\n  padding: 2rem;\n  text-align: center;\n}\n.empty-stage > span {\n  display: grid;\n  width: 4rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 0.25rem double #c8a254;\n  border-radius: 50%;\n  color: #dabb76;\n  font: 700 0.75rem Georgia, serif;\n}\n.empty-stage strong {\n  margin-top: 0.7rem;\n  font: 700 1.2rem Georgia, serif;\n}\n.empty-stage p {\n  max-width: 28rem;\n  color: #bba77e;\n  font-size: 0.72rem;\n}\n.demo-speech {\n  display: flex;\n}\n.demo-speech.left {\n  justify-content: flex-start;\n  padding-right: 16%;\n}\n.demo-speech.right {\n  justify-content: flex-end;\n  padding-left: 16%;\n}\n.demo-speech article {\n  width: min(100%, 37rem);\n  border: 1px solid color-mix(in srgb, var(--faction-accent) 75%, #efd99f);\n  border-radius: 0.75rem;\n  padding: 0.72rem 0.85rem;\n  color: #2e1b10;\n  background:\n    linear-gradient(\n      145deg,\n      #f4e2b6,\n      #d1ae73);\n}\n.demo-speech.left article {\n  border-bottom-left-radius: 0.1rem;\n}\n.demo-speech.right article {\n  border-bottom-right-radius: 0.1rem;\n}\n.demo-speech article > header {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 0.5rem;\n}\n.demo-speech article > header > span {\n  display: grid;\n  width: 1.8rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #f2dba2;\n  background: #3c2316;\n  font: 700 0.65rem Georgia, serif;\n}\n.demo-speech article small,\n.demo-speech article strong {\n  display: block;\n}\n.demo-speech article small {\n  color: #795234;\n  font-size: 0.5rem;\n  letter-spacing: 0;\n}\n.demo-speech article strong {\n  font: 700 0.72rem Georgia, serif;\n}\n.demo-speech article header b {\n  color: #765033;\n  font-size: 0.52rem;\n  text-transform: uppercase;\n}\n.demo-speech article > p {\n  display: -webkit-box;\n  overflow: hidden;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n  margin: 0.55rem 0;\n  font: 0.74rem/1.42 Georgia, serif;\n}\n.demo-speech footer {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.5rem;\n  border-top: 1px solid rgba(117, 80, 47, 0.2509803922);\n  padding-top: 0.35rem;\n  color: #704a2c;\n  font-size: 0.54rem;\n}\n.demo-moderator {\n  display: grid;\n  width: min(84%, 42rem);\n  grid-template-columns: auto 1fr;\n  gap: 0.65rem;\n  justify-self: center;\n  align-items: center;\n  border: 1px solid #81a9a6;\n  border-radius: 0.55rem;\n  padding: 0.65rem 0.75rem;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(36, 58, 59, 0.862745098),\n      rgba(19, 39, 41, 0.9098039216));\n}\n.demo-moderator > span {\n  display: grid;\n  width: 2rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #acd0ca;\n  border-radius: 50%;\n  color: #d9efea;\n  font: 700 0.62rem Georgia, serif;\n}\n.demo-moderator small {\n  color: #a7cfca;\n}\n.demo-moderator strong {\n  display: block;\n  margin-top: 0.18rem;\n  font: 700 0.76rem/1.35 Georgia, serif;\n}\n.just-added {\n  animation: bubble-enter 650ms cubic-bezier(0.2, 0.8, 0.2, 1) both;\n}\n.collapsed-builder {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-top: 2px solid #cba656;\n  padding: 0.6rem 0.8rem;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(33, 20, 14, 0.9333333333),\n      rgba(16, 10, 8, 0.9725490196));\n}\n.collapsed-builder strong {\n  display: block;\n  margin-top: 0.1rem;\n  font: 700 0.78rem Georgia, serif;\n}\n.collapsed-builder.filed strong {\n  color: #bcd09d;\n}\n.example-builder {\n  display: grid;\n  min-height: 0;\n  grid-template-rows: auto auto minmax(0, 1fr);\n  border-top: 2px solid #d2ab59;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(33, 20, 15, 0.9607843137),\n      rgba(15, 9, 7, 0.9803921569));\n  animation: builder-rise 520ms ease both;\n}\n.example-builder > header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.6rem 0.85rem 0.45rem;\n}\n.example-builder h2 {\n  margin: 0.1rem 0 0;\n  font: 700 0.9rem Georgia, serif;\n}\n.demo-badge {\n  border: 1px solid #7ea19a;\n  border-radius: 999px;\n  padding: 0.28rem 0.55rem;\n  color: #b8d6ce;\n  font-size: 0.56rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.example-builder > nav {\n  display: flex;\n  gap: 0.18rem;\n  overflow-x: auto;\n  border-block: 1px solid rgba(177, 140, 76, 0.3019607843);\n  padding: 0.25rem 0.65rem 0;\n  background: #110a08;\n}\n.example-builder > nav span {\n  border: 1px solid transparent;\n  border-bottom: 0;\n  padding: 0.42rem 0.62rem;\n  color: #a8946c;\n  font-size: 0.61rem;\n  font-weight: 800;\n  text-transform: capitalize;\n}\n.example-builder > nav span.active {\n  border-color: #bd9853;\n  color: #f1dca9;\n  background: #2b1a12;\n}\n.example-builder > nav span.complete {\n  color: #a9c08a;\n}\n.example-builder > nav span.complete::before {\n  margin-right: 0.25rem;\n  content: "\\2713";\n}\n.builder-stage {\n  min-height: 0;\n  overflow: auto;\n  padding: 0.8rem;\n}\n.stage-enter {\n  animation: stage-enter 420ms ease both;\n}\n.plan-demo,\n.feedback-demo {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.65rem;\n}\n.plan-demo article,\n.feedback-demo article {\n  border: 1px solid rgba(183, 146, 81, 0.3098039216);\n  padding: 0.75rem;\n  background: rgba(45, 27, 19, 0.8745098039);\n}\n.plan-demo article:first-child {\n  border-color: #729a99;\n  background: rgba(29, 52, 53, 0.8745098039);\n}\n.plan-demo strong {\n  display: block;\n  margin-top: 0.25rem;\n  font: 700 0.82rem/1.4 Georgia, serif;\n}\n.plan-demo p,\n.feedback-demo p {\n  color: #d2bd92;\n  font-size: 0.72rem;\n  line-height: 1.45;\n}\n.evidence-demo {\n  display: grid;\n  gap: 0.55rem;\n}\n.evidence-demo > span {\n  color: #c8b180;\n  font-size: 0.68rem;\n}\n.evidence-demo article {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  gap: 0.65rem;\n  align-items: center;\n  border: 1px solid #bd9c59;\n  padding: 0.75rem;\n  background: #2a1a12;\n  animation: evidence-pin 520ms ease both;\n}\n.evidence-demo article:nth-of-type(2) {\n  animation-delay: 250ms;\n}\n.evidence-demo article > i {\n  display: grid;\n  width: 1.8rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #213018;\n  background: #b8cf91;\n  font-style: normal;\n}\n.evidence-demo article strong {\n  display: block;\n  margin-top: 0.12rem;\n  font: 700 0.76rem Georgia, serif;\n}\n.evidence-demo article > b {\n  color: #b7cf90;\n  font-size: 0.56rem;\n}\n.write-demo {\n  display: grid;\n  grid-template-columns: 1.6fr 0.9fr;\n  gap: 0.7rem;\n}\n.write-demo > header {\n  grid-column: 1;\n  display: flex;\n  justify-content: space-between;\n  color: #6b482c;\n  font-size: 0.6rem;\n}\n.write-demo > p {\n  grid-column: 1;\n  min-height: 8rem;\n  margin: 0;\n  border: 1px solid #bd9b5e;\n  padding: 0.75rem;\n  color: #2b190f;\n  background: #f3e1b5;\n  font: 0.76rem/1.5 Georgia, serif;\n}\n.write-demo > p i {\n  display: inline-block;\n  width: 0.08rem;\n  height: 0.9rem;\n  margin-left: 0.12rem;\n  background: #5f3920;\n  animation: cursor 500ms steps(1) infinite;\n}\n.write-demo aside {\n  grid-column: 2;\n  grid-row: 1/span 2;\n  border: 1px solid #779b94;\n  padding: 0.75rem;\n  background: #193032;\n}\n.write-demo aside strong {\n  display: block;\n  margin-top: 0.35rem;\n  font: 700 0.78rem/1.45 Georgia, serif;\n}\n.feedback-demo ul {\n  display: grid;\n  gap: 0.35rem;\n  margin: 0.55rem 0 0;\n  padding: 0;\n  color: #c8dbad;\n  font-size: 0.7rem;\n  list-style: none;\n}\n.feedback-demo .teacher-note {\n  border-color: #789d96;\n  background: #1c3434;\n}\n.file-demo {\n  position: relative;\n  display: grid;\n  grid-template-columns: 0.8fr 1.4fr 0.8fr;\n  gap: 0.7rem;\n  align-items: stretch;\n}\n.file-demo > div {\n  display: grid;\n  align-content: center;\n  border: 1px solid rgba(184, 145, 78, 0.3490196078);\n  padding: 0.8rem;\n  background: #2a1911;\n}\n.recording {\n  grid-template-columns: auto 1fr auto !important;\n  gap: 0.45rem;\n}\n.recording > i {\n  width: 0.55rem;\n  height: 0.55rem;\n  border-radius: 50%;\n  background: #9bc37c;\n  box-shadow: 0 0 0.6rem #9bc37c;\n}\n.recording span,\n.filing-progress span {\n  color: #d7c096;\n  font-size: 0.66rem;\n}\n.filing-progress i {\n  display: block;\n  height: 0.4rem;\n  margin-top: 0.55rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: #140b08;\n}\n.filing-progress b {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #926d37,\n      #efd071);\n  animation: file-progress 2.1s ease both;\n}\n.file-stamp {\n  place-items: center;\n  border: 0.25rem double #c99f50 !important;\n  color: #efd17f;\n  font: 800 1.35rem Georgia, serif;\n  transform: rotate(-2deg);\n  animation: stamp 600ms 1.5s ease both;\n}\n.file-stamp small {\n  display: block;\n  margin-top: 0.3rem;\n  text-align: center;\n}\n.example-results {\n  position: absolute;\n  z-index: 10;\n  right: 1rem;\n  bottom: 4.8rem;\n  left: 1rem;\n  border: 1px solid #d0ad61;\n  padding: 0.9rem 1rem;\n  color: #ead8af;\n  background: rgba(27, 17, 13, 0.9490196078);\n  animation: stage-enter 420ms ease both;\n}\n.example-results > div {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  gap: 0.6rem;\n  align-items: center;\n  margin-top: 0.7rem;\n  font-size: 0.65rem;\n}\n.example-results > div > i {\n  display: block;\n  height: 0.65rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: #6d3b2e;\n}\n.example-results > div > i > span {\n  display: block;\n  width: 58%;\n  height: 100%;\n  background: #75908b;\n}\n@keyframes bubble-enter {\n  from {\n    opacity: 0;\n    transform: translateY(2.5rem) scale(0.94);\n  }\n}\n@keyframes archive-enter {\n  from {\n    opacity: 0;\n    transform: translateX(-1.2rem);\n  }\n}\n@keyframes builder-rise {\n  from {\n    opacity: 0;\n    transform: translateY(30%);\n  }\n}\n@keyframes stage-enter {\n  from {\n    opacity: 0;\n    transform: translateY(0.8rem);\n  }\n}\n@keyframes evidence-pin {\n  from {\n    opacity: 0;\n    transform: translateX(-1rem);\n  }\n}\n@keyframes cursor {\n  50% {\n    opacity: 0;\n  }\n}\n@keyframes file-progress {\n  from {\n    width: 0;\n  }\n}\n@keyframes stamp {\n  from {\n    opacity: 0;\n    transform: scale(1.8) rotate(-8deg);\n  }\n}\n@media (max-width: 1000px) {\n  .example-header {\n    grid-template-columns: 1fr 1.6fr auto;\n  }\n  .walkthrough-status {\n    display: none;\n  }\n  .example-layout {\n    grid-template-columns: 18% minmax(0, 64%) 18%;\n  }\n}\n@media (max-width: 760px) {\n  :host,\n  .example-debate {\n    height: auto;\n    min-height: calc(100dvh - 3.25rem);\n    overflow: visible;\n  }\n  .example-header {\n    height: auto;\n    grid-template-columns: 1fr auto;\n  }\n  .example-question {\n    display: none;\n  }\n  .example-layout {\n    height: auto;\n    grid-template-columns: 1fr;\n  }\n  .example-center {\n    min-height: 44rem;\n    grid-row: 1;\n  }\n  .example-rail {\n    min-height: 18rem;\n  }\n  .demo-speech.left,\n  .demo-speech.right {\n    padding: 0;\n  }\n  .plan-demo,\n  .feedback-demo,\n  .write-demo,\n  .file-demo {\n    grid-template-columns: 1fr;\n  }\n  .write-demo > header,\n  .write-demo > p,\n  .write-demo aside {\n    grid-column: 1;\n    grid-row: auto;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n/*# sourceMappingURL=debate-example-walkthrough.component.css.map */\n'] }]
  }], () => [], { readOnly: [{ type: Input, args: [{ isSignal: true, alias: "readOnly", required: false }] }], threadScroller: [{ type: ViewChild, args: ["threadScroller", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DebateExampleWalkthroughComponent, { className: "DebateExampleWalkthroughComponent", filePath: "src/app/templates/debate-studio/ui/debate-example-walkthrough.component.ts", lineNumber: 23 });
})();

// src/app/projects/completed-samples/debate.sample-data.ts
var now = "2026-04-16T14:00:00.000Z";
var debateSampleConfig = __spreadProps(__spreadValues({}, romanSenateDebateConfig), {
  sessionId: "completed-sample-senate",
  sessionDateLabel: "Fictional classroom Senate \xB7 completed session",
  viewer: __spreadProps(__spreadValues({}, romanSenateDebateConfig.viewer), {
    studentId: "sample-viewer",
    studentDisplayName: "Sample visitor",
    classId: "sample-senate",
    classLabel: "Fictional classroom",
    allowTeacherPreview: false
  })
});
var argumentsByRound = {
  opening: [
    "The Republic was in crisis before Caesar. The crisis chronology describes blocked reforms and recurring violence. The reform record lists practical changes to the calendar, colonies, debt, and grain policy. Those results support our claim that strong leadership addressed problems the existing government had failed to solve. But useful results alone do not tell us how long extraordinary power should last.",
    "A crisis does not settle who may hold power or for how long. The Rubicon record describes an army brought into Italy against a demand to surrender command. The title dictator in perpetuity removes the customary short emergency limit. Together these records support our concern that personal power was replacing restraints. We must also explain how a limited government could respond to a real crisis."
  ],
  response: [
    "The moderator asks where emergency leadership should end. We first treated successful reforms as enough. The opposing claim about permanent power shows the gap. Our revised defense is conditional: emergency leadership needs a time limit and a way to return authority. The reform record supports the need to act; it does not prove that permanent dictatorship was necessary.",
    "The reformers say power should be judged by the problems it solves. We agree that the crisis chronology describes serious problems. But the dictator title supplies a specific institutional cost: the old emergency limit no longer applies. A reform can be useful while the arrangement used to deliver it threatens accountability."
  ],
  rebuttal: [
    "Our opponents connect crossing the Rubicon with the loss of republican authority. That is serious evidence, but it does not show that the institutions were functioning well beforehand. The crisis record challenges a simple story in which Caesar alone created the problem. We defend the need for reform while accepting the objection to unlimited duration.",
    "The reformers argue that solving problems justifies extraordinary power. Their reform record shows outcomes; it does not show that indefinite personal control was the only way to achieve them. Our evidence is the missing time limit in the dictator title. Our response targets that connection, rather than denying that reforms occurred."
  ],
  crossfire: [
    "Would we support a leader who kept emergency authority after the crisis ended? No. The moderator\u2019s question changes our test: we would require a defined end and review. The evidence of political crisis explains why extraordinary authority appealed; it does not establish that every use or duration was justified.",
    "Can ordinary institutions solve a crisis if they are already blocked? We cannot assume they can. The crisis record is a real challenge to our faction. Our answer is that proposals need both a way to act and enforceable limits. The title without an end date is the specific feature we cannot reconcile with that requirement."
  ],
  closing: [
    "Rome needed action on serious problems, and the reform record supports that part of our case. We have narrowed the claim we opened with: beneficial reform does not automatically justify permanent authority. Judge whether we used the crisis evidence honestly and answered the concern about limits.",
    "The Republic faced genuine instability, and our opponents were right to make us address it. Our final claim is that effectiveness and accountability must both be tested. The Rubicon and dictator records support our concern about force and duration. Our strongest improvement was answering the reform argument instead of simply repeating that power was dangerous."
  ]
};
function createDebateSample() {
  const seed = createInitialDebateSession(debateSampleConfig, now, "completed-sample");
  const turns = seed.turns.map((turn, index) => {
    const side = turn.factionId === "caesarian-reformers" ? 0 : 1;
    const speaker = side === 0 ? turn.roundType === "opening" ? "Maya Torres" : "Elena Ruiz" : turn.roundType === "opening" ? "Noah Williams" : "Jordan Lee";
    const prior = seed.turns.filter((candidate) => candidate.factionId !== turn.factionId && candidate.order < turn.order).at(-1);
    return __spreadProps(__spreadValues({}, turn), {
      status: "filed",
      speakerId: "sample-" + speaker.split(" ")[0].toLowerCase(),
      speakerDisplayName: speaker,
      transcript: argumentsByRound[turn.roundId][side],
      evidenceIds: side === 0 ? ["ev-senate-crisis", "ev-reforms"] : ["ev-rubicon", "ev-dictator"],
      opponentAnnotations: prior ? [
        {
          id: "annotation-" + index,
          studentId: "sample-" + speaker.split(" ")[0].toLowerCase(),
          sourceTurnId: prior.id,
          excerpt: argumentsByRound[prior.roundId][side === 0 ? 1 : 0],
          marker: "answer-this",
          createdAt: now
        }
      ] : [],
      reasoningContribution: side === 0 ? "A need for reform does not establish that permanent authority was necessary." : "A useful result does not remove the need to examine limits on authority.",
      durationSeconds: 55,
      filedAt: now,
      teacherFeedback: side === 0 ? "Builder guidance example: connect each benefit to a source and answer the objection about duration." : "Builder guidance example: respond to the crisis evidence and identify the particular institutional limit at stake."
    });
  });
  const moderatorQueue = turns.filter((turn) => turn.moderatorRequired).map((turn, index) => ({
    id: "sample-moderator-" + index,
    targetTurnId: turn.id,
    question: turn.factionId === "caesarian-reformers" ? "You have argued that crisis required action. What evidence would show that emergency power had gone too far?" : "Your opponents identify reforms and a blocked government. How does your answer address those needs while preserving limits?",
    reason: "Test whether the next speaker can answer a specific opposing claim.",
    triggerTurnIds: turn.dependsOnTurnIds,
    priority: "point of clash",
    status: "released",
    createdAt: now,
    approvedBy: "sample-teacher",
    approvedAt: now,
    releasedAt: now,
    generation: 1
  }));
  const votes = (choices) => Object.fromEntries(
    choices.map((choiceId, index) => [
      "sample-ballot-" + index,
      { studentId: "sample-ballot-" + index, choiceId, castAt: now }
    ])
  );
  const ballots = (first, second, count) => votes(Array.from({ length: 12 }, (_, index) => index < count ? first : second));
  const categoryVotes = Object.fromEntries(
    debateSampleConfig.voteCategories.map((category) => [
      category.id,
      category.optionSource === "factions" ? ballots(
        "republic-defenders",
        "caesarian-reformers",
        category.id === "final-verdict" ? 7 : category.id === "evidence" ? 8 : 5
      ) : votes(
        Array.from(
          { length: 12 },
          (_, index) => category.optionSource === "speakers" ? ["sample-maya", "sample-noah", "sample-elena", "sample-jordan"][index % 4] : turns[index % turns.length].id
        )
      )
    ])
  );
  const session = __spreadProps(__spreadValues({}, seed), {
    status: "complete",
    revision: 24,
    currentTurnId: null,
    currentRound: debateSampleConfig.rounds.length - 1,
    turns,
    moderatorQueue,
    preVotes: votes(
      Array.from(
        { length: 12 },
        (_, index) => ["leader-needed", "threat-republic", "unsure"][index % 3]
      )
    ),
    postVotes: ballots("threat-republic", "leader-needed", 7),
    categoryVotes,
    premiereCompletedAt: now,
    members: {},
    reflections: {},
    updatedAt: now
  });
  return __spreadProps(__spreadValues({}, session), { broadcastTimeline: assembleBroadcastTimeline(debateSampleConfig, session) });
}
function createDebateSampleWorkspace() {
  return __spreadProps(__spreadValues({}, createInitialDebateWorkspace()), { room: "premiere", activeSegmentIndex: 2 });
}
var debateSampleGuide = {
  title: "Watch a Finished Senate Debate Take Shape",
  subtitle: "An animated walkthrough adds each argument to the shared thread, opens the response builder, demonstrates the student work, and files the finished response.",
  audience: "History & argument \xB7 Grade 6",
  duration: "Play, pause, or step through \xB7 about 45 seconds",
  trail: [
    {
      label: "Thread builds",
      title: "Arguments enter from both sides.",
      text: "The two opening positions arrive as speech bubbles and are added to their compact faction archives.",
      evidence: "Animated thread bubbles \u2192 expandable left and right argument records."
    },
    {
      label: "Neutral interruption",
      title: "The moderator identifies the point of clash.",
      text: "A third-color moderator question breaks the back-and-forth before the next response is prepared.",
      evidence: "Centered moderator break \u2192 response builder opens below it."
    },
    {
      label: "Build the response",
      title: "Planning becomes a filed argument.",
      text: "The example moves through planning, selected evidence, animated writing, readiness feedback, and the final filing step.",
      evidence: "Plan \u2192 Evidence \u2192 Write \u2192 Feedback \u2192 Record & file."
    },
    {
      label: "Complete record",
      title: "The exchange continues to the class judgment.",
      text: "The remaining moderator questions and arguments enter in sequence. Seven of twelve fictional ballots find the Republic faction most persuasive today: 58% versus 42%.",
      evidence: "Finished class record \u2192 optional aggregate result. Individual ballots are not displayed."
    }
  ],
  review: {
    strength: "Reformers use the crisis and policy records and accept a limit to their first claim. Republic defenders connect their concern to particular institutional changes.",
    question: "Reformers: what would end the emergency authority you defend? Republic defenders: how would your proposal address the crisis your opponents identified?",
    revision: "Both closings acknowledge a strong opposing point. The claim changes in response to the moderator and the evidence.",
    assessment: "Feedback for reformers: strengthen the evidence for proposed safeguards. Feedback for republic defenders: explain a workable response to institutional paralysis. Class persuasion totals are not a mastery grade or a ranking of students."
  }
};

// src/app/runtime/project-showcase/debate.sample.ts
function loadSample() {
  const session = createDebateSample();
  const adapter = {
    initialize: async () => ({ actorId: "sample-viewer", session: structuredClone(session) }),
    subscribe: (_locator, listener) => {
      listener(structuredClone(session));
      return () => {
      };
    },
    mutate: async () => {
      throw new Error("COMPLETED_SAMPLE_READ_ONLY");
    }
  };
  const media = {
    uploadRecording: async () => {
      throw new Error("COMPLETED_SAMPLE_READ_ONLY");
    }
  };
  return __spreadProps(__spreadValues({}, debateSampleGuide), {
    component: DebateExampleWalkthroughComponent,
    inputs: { readOnly: true },
    providers: [
      {
        provide: DebateStudioRuntimeService,
        useFactory: () => {
          const runtime = new DebateStudioRuntimeService();
          runtime.session.set(structuredClone(session));
          runtime.state.set(createDebateSampleWorkspace());
          runtime.segmentSecondsRemaining.set(runtime.segmentDuration(runtime.activeSegment()));
          return runtime;
        }
      },
      { provide: DEBATE_STUDIO_CONFIG, useValue: debateSampleConfig },
      { provide: DEBATE_STUDIO_TENANT_ID, useValue: "completed-sample" },
      { provide: DEBATE_STUDIO_SESSION, useValue: adapter },
      { provide: DEBATE_STUDIO_MEDIA, useValue: media },
      {
        provide: DEBATE_STUDIO_PERSISTENCE,
        useValue: samplePersistence(createDebateSampleWorkspace())
      }
    ]
  });
}
export {
  loadSample
};
//# debugId=0ae9b7a1-1358-5df5-8c88-69f34f7d98e8
//# sourceMappingURL=chunk-FBDD2UKQ.js.map
