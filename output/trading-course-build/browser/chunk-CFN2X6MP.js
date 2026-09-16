import {
  INQUIRY_WORKSPACE,
  InquiryWorkspaceComponent
} from "./chunk-HK5V4SOG.js";
import {
  InquiryExampleComponent
} from "./chunk-QC3X7FWS.js";
import {
  DebateStudioRuntimeService
} from "./chunk-VCUNTQ4R.js";
import "./chunk-H7BIYLRY.js";
import "./chunk-GNKRFT3D.js";
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
import "./chunk-RTVK2FN5.js";
import "./chunk-OXVZ3VYX.js";
import {
  TaskGuideComponent
} from "./chunk-FBZ4EUOY.js";
import {
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
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵariaProperty,
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
  ɵɵgetInheritedFactory,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
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
  ɵɵviewQuery,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/debate-studio/ui/debate-faction-rail.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DebateFactionRailComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 2);
    \u0275\u0275text(1, "NEW");
    \u0275\u0275domElementEnd();
  }
}
function DebateFactionRailComponent_For_17_Conditional_15_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const evidenceId_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.evidenceTitle(evidenceId_r5));
  }
}
function DebateFactionRailComponent_For_17_Conditional_15_Conditional_15_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1, "No evidence was attached to this argument.");
    \u0275\u0275domElementEnd();
  }
}
function DebateFactionRailComponent_For_17_Conditional_15_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 18);
    \u0275\u0275repeaterCreate(1, DebateFactionRailComponent_For_17_Conditional_15_Conditional_15_For_2_Template, 2, 1, "span", null, \u0275\u0275repeaterTrackByIdentity, false, DebateFactionRailComponent_For_17_Conditional_15_Conditional_15_ForEmpty_3_Template, 2, 0, "span");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const turn_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275domProperty("id", "rail-evidence-" + turn_r2.id);
    \u0275\u0275advance();
    \u0275\u0275repeater(turn_r2.evidenceIds);
  }
}
function DebateFactionRailComponent_For_17_Conditional_15_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "video", 19);
  }
  if (rf & 2) {
    const turn_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275domProperty("src", turn_r2.recording.downloadUrl, \u0275\u0275sanitizeUrl);
  }
}
function DebateFactionRailComponent_For_17_Conditional_15_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "audio", 20);
  }
  if (rf & 2) {
    const turn_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275domProperty("src", turn_r2.recording.downloadUrl);
  }
}
function DebateFactionRailComponent_For_17_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 13)(1, "div", 14)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "time");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "div", 15)(7, "button", 16);
    \u0275\u0275domListener("click", function DebateFactionRailComponent_For_17_Conditional_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const turn_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.reviewTurn(turn_r2));
    });
    \u0275\u0275text(8, " Find in thread ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "button", 17);
    \u0275\u0275domListener("click", function DebateFactionRailComponent_For_17_Conditional_15_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r4);
      const turn_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.hearTurn(turn_r2));
    });
    \u0275\u0275domElementStart(10, "span", 12);
    \u0275\u0275text(11, "\u25B6");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(12, " Hear argument ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "button", 17);
    \u0275\u0275domListener("click", function DebateFactionRailComponent_For_17_Conditional_15_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r4);
      const turn_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleEvidence(turn_r2));
    });
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(15, DebateFactionRailComponent_For_17_Conditional_15_Conditional_15_Template, 4, 2, "div", 18);
    \u0275\u0275conditionalCreate(16, DebateFactionRailComponent_For_17_Conditional_15_Conditional_16_Template, 1, 1, "video", 19)(17, DebateFactionRailComponent_For_17_Conditional_15_Conditional_17_Template, 1, 1, "audio", 20);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const turn_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("id", "rail-turn-details-" + turn_r2.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.faction().railLabel ?? ctx_r2.faction().name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formattedDuration(turn_r2));
    \u0275\u0275advance(8);
    \u0275\u0275attribute("aria-expanded", ctx_r2.evidenceTurnId() === turn_r2.id)("aria-controls", "rail-evidence-" + turn_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Evidence presented (", turn_r2.evidenceIds.length, ") ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.evidenceTurnId() === turn_r2.id ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.replayTurnId() === turn_r2.id && turn_r2.recording?.kind === "video" ? 16 : ctx_r2.replayTurnId() === turn_r2.id && turn_r2.recording?.kind === "audio" ? 17 : -1);
  }
}
function DebateFactionRailComponent_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "li", 10)(1, "button", 11);
    \u0275\u0275domListener("click", function DebateFactionRailComponent_For_17_Template_button_click_1_listener() {
      const turn_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleTurn(turn_r2));
    });
    \u0275\u0275domElementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "div")(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "em");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(11, "b");
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "i", 12);
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(15, DebateFactionRailComponent_For_17_Conditional_15_Template, 18, 8, "div", 13);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const turn_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("incoming", ctx_r2.isNewestIncoming(turn_r2))("expanded", ctx_r2.expandedTurnId() === turn_r2.id);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r2.expandedTurnId() === turn_r2.id)("aria-controls", "rail-turn-details-" + turn_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.romanNumeral(turn_r2));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(turn_r2.roundLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.roleLabel(turn_r2));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(turn_r2.speakerDisplayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.isNewestIncoming(turn_r2) ? "NEW" : "FILED");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.expandedTurnId() === turn_r2.id ? "\u2212" : "+");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.expandedTurnId() === turn_r2.id ? 15 : -1);
  }
}
function DebateFactionRailComponent_ForEmpty_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li", 7)(1, "span");
    \u0275\u0275text(2, "I");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4, "This side is preparing its opening address.");
    \u0275\u0275domElementEnd()();
  }
}
function DebateFactionRailComponent_Conditional_19_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 17);
    \u0275\u0275domListener("click", function DebateFactionRailComponent_Conditional_19_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openResponse());
    });
    \u0275\u0275text(1, "Prepare response");
    \u0275\u0275domElementEnd();
  }
}
function DebateFactionRailComponent_Conditional_19_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1, "The chair's question is waiting in the center of the chamber.");
    \u0275\u0275domElementEnd();
  }
}
function DebateFactionRailComponent_Conditional_19_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1, "Hear the newest opposing entry before this tablet can be opened.");
    \u0275\u0275domElementEnd();
  }
}
function DebateFactionRailComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li", 21)(1, "header")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "b");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "h3");
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "dl")(11, "div")(12, "dt");
    \u0275\u0275text(13, "Assigned speaker");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "dd");
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(16, "div")(17, "dt");
    \u0275\u0275text(18, "Role");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(19, "dd");
    \u0275\u0275text(20);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275conditionalCreate(21, DebateFactionRailComponent_Conditional_19_Conditional_21_Template, 2, 0, "button", 22)(22, DebateFactionRailComponent_Conditional_19_Conditional_22_Template, 2, 0, "p")(23, DebateFactionRailComponent_Conditional_19_Conditional_23_Template, 2, 0, "p");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const turn_r7 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("response-open", ctx_r2.runtime.chamberStage() === "your-turn")("held", ctx_r2.runtime.chamberStage() !== "your-turn");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.romanNumeral(turn_r7));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.chamberStage() === "your-turn" ? "YOUR RESPONSE" : "HELD");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(turn_r7.roundLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.chamberStage() === "your-turn" ? "Your faction has the floor" : "Next faction response", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.viewer.studentDisplayName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.runtime.roleLabel(turn_r7));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.chamberStage() === "your-turn" ? 21 : ctx_r2.runtime.chamberStage() === "moderator" ? 22 : 23);
  }
}
function DebateFactionRailComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "footer", 9)(1, "button", 17);
    \u0275\u0275domListener("click", function DebateFactionRailComponent_Conditional_20_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.evidenceRequested.emit());
    });
    \u0275\u0275domElementStart(2, "span", 12);
    \u0275\u0275text(3, "\u25B1");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(4, " Historical sources ");
    \u0275\u0275domElementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", ctx_r2.runtime.config.evidence.length, " available \xB7 ", ctx_r2.runtime.state().selectedEvidenceIds.length, " pinned");
  }
}
var DebateFactionRailComponent = class _DebateFactionRailComponent {
  runtime = inject(DebateStudioRuntimeService);
  faction = input.required(
    ...ngDevMode ? [{ debugName: "faction" }] : (
      /* istanbul ignore next */
      []
    )
  );
  side = input.required(
    ...ngDevMode ? [{ debugName: "side" }] : (
      /* istanbul ignore next */
      []
    )
  );
  turnSelected = output();
  buildRequested = output();
  evidenceRequested = output();
  expandedTurnId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "expandedTurnId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  replayTurnId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "replayTurnId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidenceTurnId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "evidenceTurnId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  turns = computed(
    () => this.runtime.session().turns.filter((turn) => turn.factionId === this.faction().id).sort((left, right) => left.order - right.order),
    ...ngDevMode ? [{ debugName: "turns" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filedTurns = computed(
    () => this.turns().filter((turn) => turn.status === "filed"),
    ...ngDevMode ? [{ debugName: "filedTurns" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentFactionTurn = computed(
    () => this.turns().find((turn) => ["available", "drafting"].includes(turn.status)),
    ...ngDevMode ? [{ debugName: "currentFactionTurn" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isViewerFaction = computed(
    () => this.runtime.viewerFaction()?.id === this.faction().id,
    ...ngDevMode ? [{ debugName: "isViewerFaction" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isActive = computed(
    () => {
      if (this.runtime.chamberStage() === "opponent") {
        return this.runtime.opponentFaction()?.id === this.faction().id;
      }
      if (this.runtime.chamberStage() === "your-turn")
        return this.isViewerFaction();
      return false;
    },
    ...ngDevMode ? [{ debugName: "isActive" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasIncomingArgument = computed(
    () => !this.isViewerFaction() && this.runtime.chamberStage() === "opponent" && this.runtime.previousOpponentTurn()?.factionId === this.faction().id,
    ...ngDevMode ? [{ debugName: "hasIncomingArgument" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isNewestIncoming(turn) {
    return this.hasIncomingArgument() && this.runtime.previousOpponentTurn()?.id === turn.id;
  }
  toggleTurn(turn) {
    this.expandedTurnId.update((id) => id === turn.id ? void 0 : turn.id);
    this.replayTurnId.set(void 0);
    this.evidenceTurnId.set(void 0);
  }
  hearTurn(turn) {
    if (turn.recording === void 0) {
      this.runtime.speak(turn.transcript ?? "");
      return;
    }
    this.replayTurnId.update((id) => id === turn.id ? void 0 : turn.id);
  }
  toggleEvidence(turn) {
    this.evidenceTurnId.update((id) => id === turn.id ? void 0 : turn.id);
  }
  evidenceTitle(evidenceId) {
    return this.runtime.config.evidence.find((item) => item.id === evidenceId)?.title ?? evidenceId;
  }
  reviewTurn(turn) {
    this.turnSelected.emit(turn.id);
  }
  openIncoming() {
    this.runtime.openStation("opponent");
  }
  openResponse() {
    this.buildRequested.emit();
  }
  romanNumeral(turn) {
    const position = this.turns().findIndex((item) => item.id === turn.id) + 1;
    return ["I", "II", "III", "IV", "V", "VI"][position - 1] ?? `${position}`;
  }
  formattedDuration(turn) {
    return this.runtime.formatTime(turn.durationSeconds ?? 0);
  }
  static \u0275fac = function DebateFactionRailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DebateFactionRailComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DebateFactionRailComponent, selectors: [["app-debate-faction-rail"]], hostVars: 10, hostBindings: function DebateFactionRailComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("left-rail", ctx.side() === "left")("right-rail", ctx.side() === "right")("viewer-rail", ctx.isViewerFaction())("opponent-rail", !ctx.isViewerFaction())("rail-active", ctx.isActive());
    }
  }, inputs: { faction: [1, "faction"], side: [1, "side"] }, outputs: { turnSelected: "turnSelected", buildRequested: "buildRequested", evidenceRequested: "evidenceRequested" }, decls: 21, vars: 9, consts: [[1, "rail-standard"], ["aria-hidden", "true", 1, "faction-emblem"], ["aria-label", "New opposing argument", 1, "incoming-seal"], [1, "faction-position"], ["aria-hidden", "true", 1, "rail-rule"], [1, "message-stack"], [1, "message-slip", 3, "incoming", "expanded"], [1, "empty-slip"], [1, "current-message", 3, "response-open", "held"], [1, "rail-tools"], [1, "message-slip"], ["type", "button", 1, "message-summary", 3, "click"], ["aria-hidden", "true"], [1, "message-details", 3, "id"], [1, "detail-meta"], [1, "detail-actions"], ["type", "button", 1, "review-thread", 3, "click"], ["type", "button", 3, "click"], [1, "rail-evidence", 3, "id"], ["controls", "", "autoplay", "", "preload", "metadata", "aria-label", "Filed student debate video", 3, "src"], ["controls", "", "autoplay", "", "preload", "metadata", "aria-label", "Filed student debate audio", 3, "src"], [1, "current-message"], ["type", "button"]], template: function DebateFactionRailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "header", 0)(1, "span", 1);
      \u0275\u0275text(2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "div")(4, "small");
      \u0275\u0275text(5);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "h2");
      \u0275\u0275text(7);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(8, DebateFactionRailComponent_Conditional_8_Template, 2, 0, "span", 2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "p", 3)(10, "strong");
      \u0275\u0275text(11, "Arguing:");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(12);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(13, "div", 4);
      \u0275\u0275domElement(14, "i");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(15, "ol", 5);
      \u0275\u0275repeaterCreate(16, DebateFactionRailComponent_For_17_Template, 16, 13, "li", 6, _forTrack0, false, DebateFactionRailComponent_ForEmpty_18_Template, 5, 0, "li", 7);
      \u0275\u0275conditionalCreate(19, DebateFactionRailComponent_Conditional_19_Template, 24, 11, "li", 8);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(20, DebateFactionRailComponent_Conditional_20_Template, 7, 2, "footer", 9);
    }
    if (rf & 2) {
      let tmp_7_0;
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.faction().emblem);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.side() === "left" ? "Left side of the chamber" : "Right side of the chamber");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.faction().railLabel ?? ctx.faction().name);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasIncomingArgument() ? 8 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.faction().position);
      \u0275\u0275advance(3);
      \u0275\u0275attribute("aria-label", (ctx.faction().railLabel ?? ctx.faction().name) + " argument record");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.filedTurns());
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_7_0 = ctx.isViewerFaction() && ctx.currentFactionTurn()) ? 19 : -1, tmp_7_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isViewerFaction() ? 20 : -1);
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  --%NS%rail-accent: #b79254;\n  position: relative;\n  z-index: 8;\n  display: grid;\n  min-width: 0;\n  grid-template-rows: auto auto auto minmax(0, 1fr) auto;\n  height: 100%;\n  overflow: hidden;\n  border-inline: 1px solid rgba(214, 181, 106, 0.2588235294);\n  color: #eee0bd;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(10, 6, 5, 0.9294117647),\n      rgba(38, 22, 14, 0.8588235294) 48%,\n      rgba(10, 6, 5, 0.9294117647)),\n    repeating-linear-gradient(\n      0deg,\n      transparent 0 18px,\n      rgba(214, 181, 106, 0.031372549) 19px);\n  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.8);\n  transition: box-shadow 220ms ease, filter 220ms ease;\n}\n.rail-active[_nghost-%COMP%] {\n  box-shadow: inset 0 0 2.4rem rgba(215, 171, 81, 0.2509803922), 0 0 3.5rem rgba(224, 174, 79, 0.3098039216);\n  filter: brightness(1.08);\n}\n.rail-standard[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 0.7rem;\n  min-height: 5.2rem;\n  padding: 0.8rem 0.85rem 0.65rem;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(53, 32, 21, 0.9411764706),\n      rgba(23, 16, 12, 0.8666666667));\n}\n.faction-emblem[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.7rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #d3b36f;\n  border-radius: 50%;\n  color: #edcf88;\n  box-shadow: inset 0 0 0 0.28rem #120b08, 0 0 1rem rgba(219, 168, 77, 0.1490196078);\n  font: 700 1rem Georgia, serif;\n}\n.rail-standard[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.rail-standard[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0;\n}\n.rail-standard[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #ad9567;\n  font-size: 0.68rem;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.rail-standard[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 0.16rem;\n  color: #f0dba9;\n  font: 700 clamp(0.82rem, 1.1vw, 1rem)/1.15 Georgia, serif;\n  letter-spacing: 0.045em;\n  text-transform: uppercase;\n}\n.incoming-seal[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.45rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 0.25rem double #f0c671;\n  border-radius: 50%;\n  color: #fff2c8;\n  background: #8a3329;\n  box-shadow: 0 0 0.85rem #f0b856, 0 0 1.8rem #d96f44;\n  font-size: 0.58rem;\n  font-weight: 900;\n  animation: _ngcontent-%COMP%_seal-pulse 1.35s ease-in-out infinite alternate;\n}\n.rail-rule[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0 0.75rem;\n}\n.faction-position[_ngcontent-%COMP%] {\n  margin: 0;\n  border-block: 1px solid rgba(196, 160, 91, 0.1803921569);\n  padding: 0.55rem 0.75rem;\n  color: #c8b58d;\n  background: rgba(19, 12, 9, 0.7882352941);\n  font: 0.68rem/1.4 Georgia, serif;\n}\n.faction-position[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e7c978;\n  text-transform: uppercase;\n}\n.rail-rule[_ngcontent-%COMP%]::before, \n.rail-rule[_ngcontent-%COMP%]::after {\n  height: 1px;\n  flex: 1;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      #d1ad66,\n      transparent);\n  content: "";\n}\n.rail-rule[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.32rem;\n  aspect-ratio: 1;\n  border: 1px solid #d1ad66;\n  transform: rotate(45deg);\n}\n.message-stack[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 0.65rem;\n  margin: 0;\n  padding: 0.85rem 0.65rem 1rem;\n  overflow-y: auto;\n  scrollbar-color: #9b7946 #150c08;\n  list-style: none;\n}\n.message-slip[_ngcontent-%COMP%], \n.current-message[_ngcontent-%COMP%], \n.empty-slip[_ngcontent-%COMP%] {\n  position: relative;\n  border: 1px solid rgba(159, 123, 69, 0.3411764706);\n  border-left: 0.22rem solid #a8854f;\n  padding: 0.72rem;\n  color: #342013;\n  background:\n    linear-gradient(\n      105deg,\n      #e0c792,\n      #b9945e),\n    repeating-linear-gradient(\n      0deg,\n      transparent 0 16px,\n      rgba(111, 71, 32, 0.0392156863) 17px);\n  box-shadow: 0 0.65rem 1rem rgba(0, 0, 0, 0.4666666667);\n}\n.message-slip.incoming[_ngcontent-%COMP%] {\n  border-color: #f1cf82;\n  box-shadow:\n    0 0 0 0.14rem rgba(213, 170, 84, 0.2509803922),\n    0 0 1.8rem rgba(232, 168, 76, 0.4901960784),\n    0 0.8rem 1.2rem rgba(0, 0, 0, 0.6);\n}\n.message-slip[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: start;\n  gap: 0.5rem;\n  border-bottom: 1px solid rgba(116, 70, 32, 0.2588235294);\n  padding-bottom: 0.42rem;\n}\n.message-slip[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.current-message[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.empty-slip[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #72431f;\n  font: 700 0.84rem Georgia, serif;\n}\n.message-slip[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.message-slip[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n}\n.message-slip[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #79512d;\n  font-size: 0.64rem;\n  line-height: 1.2;\n}\n.message-slip[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 0.13rem;\n  font: 700 0.75rem/1.2 Georgia, serif;\n  text-transform: uppercase;\n}\n.message-slip[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   b[_ngcontent-%COMP%], \n.current-message[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  border: 1px solid currentColor;\n  padding: 0.15rem 0.28rem;\n  color: #6d4a2a;\n  font-size: 0.55rem;\n  letter-spacing: 0.08em;\n}\n.message-slip.incoming[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: #932d24;\n}\n.speaker[_ngcontent-%COMP%] {\n  margin: 0.55rem 0 0;\n  font: 700 0.92rem Georgia, serif;\n}\n.faction-name[_ngcontent-%COMP%] {\n  margin: 0.1rem 0 0.5rem;\n  color: #674528;\n  font-size: 0.62rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.message-slip[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.replay-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 0.35rem;\n}\n.replay-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  padding: 0.25rem;\n  color: #5e3c25;\n  background: transparent;\n  font-size: 0.62rem;\n  cursor: pointer;\n}\n.message-slip[_ngcontent-%COMP%]   time[_ngcontent-%COMP%] {\n  font: 700 0.72rem Georgia, serif;\n}\n.message-slip[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.current-message[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.rail-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #6d4527;\n  padding: 0.42rem 0.55rem;\n  color: #311c10;\n  background: #f1ddb0;\n  font: 700 0.68rem Georgia, serif;\n  cursor: pointer;\n}\n.message-slip[_ngcontent-%COMP%]   .hear-now[_ngcontent-%COMP%] {\n  color: #fff1cc;\n  background: #71291f;\n}\n.message-slip[_ngcontent-%COMP%]   video[_ngcontent-%COMP%], \n.message-slip[_ngcontent-%COMP%]   audio[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 9rem;\n  margin-top: 0.6rem;\n  background: #0a0604;\n}\n.current-message[_ngcontent-%COMP%] {\n  border: 1px dashed #9f814e;\n  border-left: 0.3rem solid #9f814e;\n  color: #d4c29d;\n  background:\n    linear-gradient(\n      145deg,\n      rgba(39, 24, 16, 0.9215686275),\n      rgba(18, 11, 8, 0.9490196078));\n}\n.current-message.response-open[_ngcontent-%COMP%] {\n  border-style: solid;\n  border-color: #e1bd70;\n  box-shadow: inset 0 0 1.5rem rgba(220, 168, 77, 0.1098039216), 0 0 1.8rem rgba(225, 173, 77, 0.3607843137);\n}\n.current-message[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n.current-message[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #d2ad65;\n}\n.current-message[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: #e6c97f;\n}\n.current-message[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.65rem;\n  color: #ad956a;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n}\n.current-message[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.18rem 0 0.6rem;\n  color: #f2dfb6;\n  font: 700 1rem Georgia, serif;\n  text-transform: uppercase;\n}\n.current-message[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  margin: 0 0 0.6rem;\n}\n.current-message[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.5rem;\n  border-top: 1px solid rgba(198, 161, 91, 0.1882352941);\n  padding: 0.28rem 0;\n}\n.current-message[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%], \n.current-message[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%], \n.current-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.current-message[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #a7926c;\n}\n.current-message[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  color: #e5c982;\n  font-weight: 700;\n  text-align: right;\n}\n.current-message[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n  border-color: #e6c374;\n  color: #2b180e;\n  background:\n    linear-gradient(\n      180deg,\n      #f0d18a,\n      #b98a43);\n  text-transform: uppercase;\n}\n.current-message.held[_ngcontent-%COMP%] {\n  opacity: 0.72;\n}\n.empty-slip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  opacity: 0.72;\n}\n.empty-slip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font: italic 0.75rem/1.4 Georgia, serif;\n}\n.rail-tools[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(205, 168, 96, 0.2588235294);\n  padding: 0.7rem;\n  background: rgba(18, 11, 8, 0.9098039216);\n}\n.rail-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  width: 100%;\n  grid-template-columns: auto 1fr;\n  gap: 0 0.55rem;\n  align-items: center;\n  border-color: rgba(176, 141, 83, 0.3607843137);\n  color: #ddc89d;\n  background: #24150e;\n  text-align: left;\n}\n.rail-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  grid-row: 1/span 2;\n  color: #deb967;\n  font-size: 1.2rem;\n}\n.rail-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  color: #9f8d6c;\n  font-size: 0.62rem;\n}\n@keyframes _ngcontent-%COMP%_seal-pulse {\n  to {\n    transform: scale(1.08);\n    box-shadow: 0 0 1.3rem #ffd17a, 0 0 2.5rem #d96f44;\n  }\n}\n@media (max-width: 820px) {\n  [_nghost-%COMP%] {\n    min-height: 31rem;\n    border: 1px solid rgba(214, 181, 106, 0.2588235294);\n  }\n  .message-stack[_ngcontent-%COMP%] {\n    max-height: 34rem;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .incoming-seal[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.message-slip[_ngcontent-%COMP%] {\n  padding: 0;\n  overflow: hidden;\n}\n.message-summary[_ngcontent-%COMP%] {\n  display: grid;\n  width: 100%;\n  grid-template-columns: auto minmax(0, 1fr) auto auto;\n  align-items: center;\n  gap: 0.5rem;\n  border: 0;\n  padding: 0.65rem 0.6rem;\n  color: #342013;\n  background: transparent;\n  text-align: left;\n  cursor: pointer;\n}\n.message-summary[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #72431f;\n  font: 700 0.82rem Georgia, serif;\n}\n.message-summary[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.message-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.message-summary[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.message-summary[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #79512d;\n  font-size: 0.58rem;\n}\n.message-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 0.7rem/1.2 Georgia, serif;\n  text-transform: uppercase;\n}\n.message-summary[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  margin-top: 0.12rem;\n  color: #50331f;\n  font: 700 0.72rem Georgia, serif;\n}\n.message-summary[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  border: 1px solid currentColor;\n  padding: 0.12rem 0.22rem;\n  color: #6d4a2a;\n  font-size: 0.5rem;\n  letter-spacing: 0.06em;\n}\n.message-summary[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #613b21;\n  font: normal 700 1rem/1 Georgia, serif;\n}\n.message-slip.expanded[_ngcontent-%COMP%] {\n  border-color: #e2bd6d;\n  box-shadow: 0 0 0 0.12rem rgba(213, 170, 84, 0.2509803922), 0 0.8rem 1.2rem rgba(0, 0, 0, 0.5333333333);\n}\n.message-details[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(118, 80, 47, 0.3490196078);\n  padding: 0.55rem 0.6rem 0.65rem;\n  background: rgba(240, 218, 165, 0.6392156863);\n}\n.detail-meta[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.5rem;\n  color: #69442a;\n  font-size: 0.56rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.detail-actions[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  margin-top: 0.45rem;\n}\n.detail-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #76502f;\n  padding: 0.38rem 0.45rem;\n  color: #351e10;\n  background: #f6e3b5;\n  font: 700 0.62rem Georgia, serif;\n  text-align: left;\n  cursor: pointer;\n}\n.rail-evidence[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n  margin-top: 0.45rem;\n  border-left: 0.18rem solid #79532c;\n  padding-left: 0.45rem;\n}\n.rail-evidence[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #50331e;\n  font: 0.61rem/1.3 Georgia, serif;\n}\n/*# sourceMappingURL=debate-faction-rail.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DebateFactionRailComponent, [{
    type: Component,
    args: [{ selector: "app-debate-faction-rail", host: {
      "[class.left-rail]": "side() === 'left'",
      "[class.right-rail]": "side() === 'right'",
      "[class.viewer-rail]": "isViewerFaction()",
      "[class.opponent-rail]": "!isViewerFaction()",
      "[class.rail-active]": "isActive()"
    }, template: `<header class="rail-standard">
  <span class="faction-emblem" aria-hidden="true">{{ faction().emblem }}</span>
  <div>
    <small>{{
      side() === 'left' ? 'Left side of the chamber' : 'Right side of the chamber'
    }}</small>
    <h2>{{ faction().railLabel ?? faction().name }}</h2>
  </div>
  @if (hasIncomingArgument()) {
    <span class="incoming-seal" aria-label="New opposing argument">NEW</span>
  }
</header>

<p class="faction-position"><strong>Arguing:</strong> {{ faction().position }}</p>

<div class="rail-rule" aria-hidden="true"><i></i></div>

<ol
  class="message-stack"
  [attr.aria-label]="(faction().railLabel ?? faction().name) + ' argument record'"
>
  @for (turn of filedTurns(); track turn.id) {
    <li
      class="message-slip"
      [class.incoming]="isNewestIncoming(turn)"
      [class.expanded]="expandedTurnId() === turn.id"
    >
      <button
        class="message-summary"
        type="button"
        [attr.aria-expanded]="expandedTurnId() === turn.id"
        [attr.aria-controls]="'rail-turn-details-' + turn.id"
        (click)="toggleTurn(turn)"
      >
        <span>{{ romanNumeral(turn) }}</span>
        <div>
          <small>{{ turn.roundLabel }}</small
          ><strong>{{ runtime.roleLabel(turn) }}</strong>
          <em>{{ turn.speakerDisplayName }}</em>
        </div>
        <b>{{ isNewestIncoming(turn) ? 'NEW' : 'FILED' }}</b>
        <i aria-hidden="true">{{ expandedTurnId() === turn.id ? '\u2212' : '+' }}</i>
      </button>

      @if (expandedTurnId() === turn.id) {
        <div class="message-details" [id]="'rail-turn-details-' + turn.id">
          <div class="detail-meta">
            <span>{{ faction().railLabel ?? faction().name }}</span>
            <time>{{ formattedDuration(turn) }}</time>
          </div>
          <div class="detail-actions">
            <button class="review-thread" type="button" (click)="reviewTurn(turn)">
              Find in thread
            </button>
            <button type="button" (click)="hearTurn(turn)">
              <span aria-hidden="true">\u25B6</span> Hear argument
            </button>
            <button
              type="button"
              [attr.aria-expanded]="evidenceTurnId() === turn.id"
              [attr.aria-controls]="'rail-evidence-' + turn.id"
              (click)="toggleEvidence(turn)"
            >
              Evidence presented ({{ turn.evidenceIds.length }})
            </button>
          </div>

          @if (evidenceTurnId() === turn.id) {
            <div class="rail-evidence" [id]="'rail-evidence-' + turn.id">
              @for (evidenceId of turn.evidenceIds; track evidenceId) {
                <span>{{ evidenceTitle(evidenceId) }}</span>
              } @empty {
                <span>No evidence was attached to this argument.</span>
              }
            </div>
          }

          @if (replayTurnId() === turn.id && turn.recording?.kind === 'video') {
            <video
              controls
              autoplay
              preload="metadata"
              [src]="turn.recording.downloadUrl"
              aria-label="Filed student debate video"
            ></video>
          } @else if (replayTurnId() === turn.id && turn.recording?.kind === 'audio') {
            <audio
              controls
              autoplay
              preload="metadata"
              [src]="turn.recording.downloadUrl"
              aria-label="Filed student debate audio"
            ></audio>
          }
        </div>
      }
    </li>
  } @empty {
    <li class="empty-slip">
      <span>I</span>
      <p>This side is preparing its opening address.</p>
    </li>
  }

  @if (isViewerFaction() && currentFactionTurn(); as turn) {
    <li
      class="current-message"
      [class.response-open]="runtime.chamberStage() === 'your-turn'"
      [class.held]="runtime.chamberStage() !== 'your-turn'"
    >
      <header>
        <span>{{ romanNumeral(turn) }}</span
        ><b>{{ runtime.chamberStage() === 'your-turn' ? 'YOUR RESPONSE' : 'HELD' }}</b>
      </header>
      <small>{{ turn.roundLabel }}</small>
      <h3>
        {{
          runtime.chamberStage() === 'your-turn'
            ? 'Your faction has the floor'
            : 'Next faction response'
        }}
      </h3>
      <dl>
        <div>
          <dt>Assigned speaker</dt>
          <dd>{{ runtime.config.viewer.studentDisplayName }}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{{ runtime.roleLabel(turn) }}</dd>
        </div>
      </dl>
      @if (runtime.chamberStage() === 'your-turn') {
        <button type="button" (click)="openResponse()">Prepare response</button>
      } @else if (runtime.chamberStage() === 'moderator') {
        <p>The chair's question is waiting in the center of the chamber.</p>
      } @else {
        <p>Hear the newest opposing entry before this tablet can be opened.</p>
      }
    </li>
  }
</ol>

@if (isViewerFaction()) {
  <footer class="rail-tools">
    <button type="button" (click)="evidenceRequested.emit()">
      <span aria-hidden="true">\u25B1</span>
      Historical sources
      <small
        >{{ runtime.config.evidence.length }} available \xB7
        {{ runtime.state().selectedEvidenceIds.length }} pinned</small
      >
    </button>
  </footer>
}
`, styles: ['/* src/app/templates/debate-studio/ui/debate-faction-rail.component.scss */\n:host {\n  --rail-accent: #b79254;\n  position: relative;\n  z-index: 8;\n  display: grid;\n  min-width: 0;\n  grid-template-rows: auto auto auto minmax(0, 1fr) auto;\n  height: 100%;\n  overflow: hidden;\n  border-inline: 1px solid rgba(214, 181, 106, 0.2588235294);\n  color: #eee0bd;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(10, 6, 5, 0.9294117647),\n      rgba(38, 22, 14, 0.8588235294) 48%,\n      rgba(10, 6, 5, 0.9294117647)),\n    repeating-linear-gradient(\n      0deg,\n      transparent 0 18px,\n      rgba(214, 181, 106, 0.031372549) 19px);\n  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.8);\n  transition: box-shadow 220ms ease, filter 220ms ease;\n}\n:host.rail-active {\n  box-shadow: inset 0 0 2.4rem rgba(215, 171, 81, 0.2509803922), 0 0 3.5rem rgba(224, 174, 79, 0.3098039216);\n  filter: brightness(1.08);\n}\n.rail-standard {\n  position: relative;\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 0.7rem;\n  min-height: 5.2rem;\n  padding: 0.8rem 0.85rem 0.65rem;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(53, 32, 21, 0.9411764706),\n      rgba(23, 16, 12, 0.8666666667));\n}\n.faction-emblem {\n  display: grid;\n  width: 2.7rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #d3b36f;\n  border-radius: 50%;\n  color: #edcf88;\n  box-shadow: inset 0 0 0 0.28rem #120b08, 0 0 1rem rgba(219, 168, 77, 0.1490196078);\n  font: 700 1rem Georgia, serif;\n}\n.rail-standard small,\n.rail-standard h2 {\n  display: block;\n  margin: 0;\n}\n.rail-standard small {\n  color: #ad9567;\n  font-size: 0.68rem;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.rail-standard h2 {\n  margin-top: 0.16rem;\n  color: #f0dba9;\n  font: 700 clamp(0.82rem, 1.1vw, 1rem)/1.15 Georgia, serif;\n  letter-spacing: 0.045em;\n  text-transform: uppercase;\n}\n.incoming-seal {\n  display: grid;\n  width: 2.45rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 0.25rem double #f0c671;\n  border-radius: 50%;\n  color: #fff2c8;\n  background: #8a3329;\n  box-shadow: 0 0 0.85rem #f0b856, 0 0 1.8rem #d96f44;\n  font-size: 0.58rem;\n  font-weight: 900;\n  animation: seal-pulse 1.35s ease-in-out infinite alternate;\n}\n.rail-rule {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0 0.75rem;\n}\n.faction-position {\n  margin: 0;\n  border-block: 1px solid rgba(196, 160, 91, 0.1803921569);\n  padding: 0.55rem 0.75rem;\n  color: #c8b58d;\n  background: rgba(19, 12, 9, 0.7882352941);\n  font: 0.68rem/1.4 Georgia, serif;\n}\n.faction-position strong {\n  color: #e7c978;\n  text-transform: uppercase;\n}\n.rail-rule::before,\n.rail-rule::after {\n  height: 1px;\n  flex: 1;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      #d1ad66,\n      transparent);\n  content: "";\n}\n.rail-rule i {\n  width: 0.32rem;\n  aspect-ratio: 1;\n  border: 1px solid #d1ad66;\n  transform: rotate(45deg);\n}\n.message-stack {\n  display: grid;\n  align-content: start;\n  gap: 0.65rem;\n  margin: 0;\n  padding: 0.85rem 0.65rem 1rem;\n  overflow-y: auto;\n  scrollbar-color: #9b7946 #150c08;\n  list-style: none;\n}\n.message-slip,\n.current-message,\n.empty-slip {\n  position: relative;\n  border: 1px solid rgba(159, 123, 69, 0.3411764706);\n  border-left: 0.22rem solid #a8854f;\n  padding: 0.72rem;\n  color: #342013;\n  background:\n    linear-gradient(\n      105deg,\n      #e0c792,\n      #b9945e),\n    repeating-linear-gradient(\n      0deg,\n      transparent 0 16px,\n      rgba(111, 71, 32, 0.0392156863) 17px);\n  box-shadow: 0 0.65rem 1rem rgba(0, 0, 0, 0.4666666667);\n}\n.message-slip.incoming {\n  border-color: #f1cf82;\n  box-shadow:\n    0 0 0 0.14rem rgba(213, 170, 84, 0.2509803922),\n    0 0 1.8rem rgba(232, 168, 76, 0.4901960784),\n    0 0.8rem 1.2rem rgba(0, 0, 0, 0.6);\n}\n.message-slip > header {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: start;\n  gap: 0.5rem;\n  border-bottom: 1px solid rgba(116, 70, 32, 0.2588235294);\n  padding-bottom: 0.42rem;\n}\n.message-slip header > span,\n.current-message header > span,\n.empty-slip > span {\n  color: #72431f;\n  font: 700 0.84rem Georgia, serif;\n}\n.message-slip header small,\n.message-slip header strong {\n  display: block;\n}\n.message-slip header small {\n  color: #79512d;\n  font-size: 0.64rem;\n  line-height: 1.2;\n}\n.message-slip header strong {\n  margin-top: 0.13rem;\n  font: 700 0.75rem/1.2 Georgia, serif;\n  text-transform: uppercase;\n}\n.message-slip header b,\n.current-message header b {\n  border: 1px solid currentColor;\n  padding: 0.15rem 0.28rem;\n  color: #6d4a2a;\n  font-size: 0.55rem;\n  letter-spacing: 0.08em;\n}\n.message-slip.incoming header b {\n  color: #932d24;\n}\n.speaker {\n  margin: 0.55rem 0 0;\n  font: 700 0.92rem Georgia, serif;\n}\n.faction-name {\n  margin: 0.1rem 0 0.5rem;\n  color: #674528;\n  font-size: 0.62rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.message-slip footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.replay-row {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 0.35rem;\n}\n.replay-row button {\n  border: 0;\n  padding: 0.25rem;\n  color: #5e3c25;\n  background: transparent;\n  font-size: 0.62rem;\n  cursor: pointer;\n}\n.message-slip time {\n  font: 700 0.72rem Georgia, serif;\n}\n.message-slip button,\n.current-message button,\n.rail-tools button {\n  border: 1px solid #6d4527;\n  padding: 0.42rem 0.55rem;\n  color: #311c10;\n  background: #f1ddb0;\n  font: 700 0.68rem Georgia, serif;\n  cursor: pointer;\n}\n.message-slip .hear-now {\n  color: #fff1cc;\n  background: #71291f;\n}\n.message-slip video,\n.message-slip audio {\n  width: 100%;\n  max-height: 9rem;\n  margin-top: 0.6rem;\n  background: #0a0604;\n}\n.current-message {\n  border: 1px dashed #9f814e;\n  border-left: 0.3rem solid #9f814e;\n  color: #d4c29d;\n  background:\n    linear-gradient(\n      145deg,\n      rgba(39, 24, 16, 0.9215686275),\n      rgba(18, 11, 8, 0.9490196078));\n}\n.current-message.response-open {\n  border-style: solid;\n  border-color: #e1bd70;\n  box-shadow: inset 0 0 1.5rem rgba(220, 168, 77, 0.1098039216), 0 0 1.8rem rgba(225, 173, 77, 0.3607843137);\n}\n.current-message header {\n  display: flex;\n  justify-content: space-between;\n}\n.current-message header > span {\n  color: #d2ad65;\n}\n.current-message header b {\n  color: #e6c97f;\n}\n.current-message > small {\n  display: block;\n  margin-top: 0.65rem;\n  color: #ad956a;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n}\n.current-message h3 {\n  margin: 0.18rem 0 0.6rem;\n  color: #f2dfb6;\n  font: 700 1rem Georgia, serif;\n  text-transform: uppercase;\n}\n.current-message dl {\n  margin: 0 0 0.6rem;\n}\n.current-message dl div {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.5rem;\n  border-top: 1px solid rgba(198, 161, 91, 0.1882352941);\n  padding: 0.28rem 0;\n}\n.current-message dt,\n.current-message dd,\n.current-message p {\n  margin: 0;\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.current-message dt {\n  color: #a7926c;\n}\n.current-message dd {\n  color: #e5c982;\n  font-weight: 700;\n  text-align: right;\n}\n.current-message button {\n  width: 100%;\n  border-color: #e6c374;\n  color: #2b180e;\n  background:\n    linear-gradient(\n      180deg,\n      #f0d18a,\n      #b98a43);\n  text-transform: uppercase;\n}\n.current-message.held {\n  opacity: 0.72;\n}\n.empty-slip {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  opacity: 0.72;\n}\n.empty-slip p {\n  margin: 0;\n  font: italic 0.75rem/1.4 Georgia, serif;\n}\n.rail-tools {\n  border-top: 1px solid rgba(205, 168, 96, 0.2588235294);\n  padding: 0.7rem;\n  background: rgba(18, 11, 8, 0.9098039216);\n}\n.rail-tools button {\n  display: grid;\n  width: 100%;\n  grid-template-columns: auto 1fr;\n  gap: 0 0.55rem;\n  align-items: center;\n  border-color: rgba(176, 141, 83, 0.3607843137);\n  color: #ddc89d;\n  background: #24150e;\n  text-align: left;\n}\n.rail-tools button > span {\n  grid-row: 1/span 2;\n  color: #deb967;\n  font-size: 1.2rem;\n}\n.rail-tools button > small {\n  color: #9f8d6c;\n  font-size: 0.62rem;\n}\n@keyframes seal-pulse {\n  to {\n    transform: scale(1.08);\n    box-shadow: 0 0 1.3rem #ffd17a, 0 0 2.5rem #d96f44;\n  }\n}\n@media (max-width: 820px) {\n  :host {\n    min-height: 31rem;\n    border: 1px solid rgba(214, 181, 106, 0.2588235294);\n  }\n  .message-stack {\n    max-height: 34rem;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .incoming-seal {\n    animation: none;\n  }\n}\n.message-slip {\n  padding: 0;\n  overflow: hidden;\n}\n.message-summary {\n  display: grid;\n  width: 100%;\n  grid-template-columns: auto minmax(0, 1fr) auto auto;\n  align-items: center;\n  gap: 0.5rem;\n  border: 0;\n  padding: 0.65rem 0.6rem;\n  color: #342013;\n  background: transparent;\n  text-align: left;\n  cursor: pointer;\n}\n.message-summary > span {\n  color: #72431f;\n  font: 700 0.82rem Georgia, serif;\n}\n.message-summary small,\n.message-summary strong,\n.message-summary em {\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.message-summary small {\n  color: #79512d;\n  font-size: 0.58rem;\n}\n.message-summary strong {\n  font: 700 0.7rem/1.2 Georgia, serif;\n  text-transform: uppercase;\n}\n.message-summary em {\n  margin-top: 0.12rem;\n  color: #50331f;\n  font: 700 0.72rem Georgia, serif;\n}\n.message-summary b {\n  border: 1px solid currentColor;\n  padding: 0.12rem 0.22rem;\n  color: #6d4a2a;\n  font-size: 0.5rem;\n  letter-spacing: 0.06em;\n}\n.message-summary i {\n  color: #613b21;\n  font: normal 700 1rem/1 Georgia, serif;\n}\n.message-slip.expanded {\n  border-color: #e2bd6d;\n  box-shadow: 0 0 0 0.12rem rgba(213, 170, 84, 0.2509803922), 0 0.8rem 1.2rem rgba(0, 0, 0, 0.5333333333);\n}\n.message-details {\n  border-top: 1px solid rgba(118, 80, 47, 0.3490196078);\n  padding: 0.55rem 0.6rem 0.65rem;\n  background: rgba(240, 218, 165, 0.6392156863);\n}\n.detail-meta {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.5rem;\n  color: #69442a;\n  font-size: 0.56rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.detail-actions {\n  display: grid;\n  gap: 0.35rem;\n  margin-top: 0.45rem;\n}\n.detail-actions button {\n  width: 100%;\n  border: 1px solid #76502f;\n  padding: 0.38rem 0.45rem;\n  color: #351e10;\n  background: #f6e3b5;\n  font: 700 0.62rem Georgia, serif;\n  text-align: left;\n  cursor: pointer;\n}\n.rail-evidence {\n  display: grid;\n  gap: 0.25rem;\n  margin-top: 0.45rem;\n  border-left: 0.18rem solid #79532c;\n  padding-left: 0.45rem;\n}\n.rail-evidence span {\n  color: #50331e;\n  font: 0.61rem/1.3 Georgia, serif;\n}\n/*# sourceMappingURL=debate-faction-rail.component.css.map */\n'] }]
  }], null, { faction: [{ type: Input, args: [{ isSignal: true, alias: "faction", required: true }] }], side: [{ type: Input, args: [{ isSignal: true, alias: "side", required: true }] }], turnSelected: [{ type: Output, args: ["turnSelected"] }], buildRequested: [{ type: Output, args: ["buildRequested"] }], evidenceRequested: [{ type: Output, args: ["evidenceRequested"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DebateFactionRailComponent, { className: "DebateFactionRailComponent", filePath: "src/app/templates/debate-studio/ui/debate-faction-rail.component.ts", lineNumber: 18 });
})();

// src/app/templates/debate-studio/ui/debate-showcase.component.ts
var _c0 = ["entryHeading"];
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.option.id;
function DebateShowcaseComponent_Case_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_1_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.enterRoom("chamber"));
    });
    \u0275\u0275text(1, " \u2190 Return to chamber ");
    \u0275\u0275elementEnd();
  }
}
function DebateShowcaseComponent_Case_1_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 10)(1, "button", 14);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_1_Conditional_24_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectEntry(ctx_r2.runtime.state().activeSegmentIndex - 1));
    });
    \u0275\u0275text(2, " \u2190 Previous ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 14);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_1_Conditional_24_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectEntry(ctx_r2.runtime.state().activeSegmentIndex + 1));
    });
    \u0275\u0275text(6, " Next \u2192 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.runtime.state().activeSegmentIndex === 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r2.runtime.state().activeSegmentIndex + 1, " / ", ctx_r2.runtime.program().length);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.runtime.state().activeSegmentIndex >= ctx_r2.runtime.program().length - 1);
  }
}
function DebateShowcaseComponent_Case_1_For_29_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_1_For_29_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const \u0275$index_68_r6 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectEntry(\u0275$index_68_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r6 = \u0275\u0275nextContext();
    const segment_r8 = ctx_r6.$implicit;
    const \u0275$index_68_r6 = ctx_r6.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-current", ctx_r2.runtime.state().activeSegmentIndex === \u0275$index_68_r6 ? "step" : null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", segment_r8.speakerDisplayName ?? segment_r8.title, " ");
  }
}
function DebateShowcaseComponent_Case_1_For_29_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const segment_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(segment_r8.speakerDisplayName ?? segment_r8.title);
  }
}
function DebateShowcaseComponent_Case_1_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, DebateShowcaseComponent_Case_1_For_29_Conditional_6_Template, 2, 2, "button", 18)(7, DebateShowcaseComponent_Case_1_For_29_Conditional_7_Template, 2, 1, "strong");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const segment_r8 = ctx.$implicit;
    const \u0275$index_68_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r2.runtime.state().activeSegmentIndex === \u0275$index_68_r6)("heard", ctx_r2.runtime.state().activeSegmentIndex > \u0275$index_68_r6);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((\u0275$index_68_r6 + 1).toString().padStart(2, "0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(segment_r8.roundLabel);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.readOnly() ? 6 : 7);
  }
}
function DebateShowcaseComponent_Case_1_Conditional_30_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const segment_r9 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r9.roundLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r9.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r9.transcript);
  }
}
function DebateShowcaseComponent_Case_1_Conditional_30_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "blockquote");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const segment_r9 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.moderator.initials);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.moderator.displayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.moderator.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u201C", segment_r9.transcript, "\u201D");
  }
}
function DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "video", 32);
    \u0275\u0275listener("ended", function DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_Conditional_8_Template_video_ended_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.runtime.recordedSegmentEnded());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const segment_r9 = \u0275\u0275nextContext(2);
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("autoplay", ctx_r2.runtime.sessionPlaying())("src", segment_r9.recording.downloadUrl, \u0275\u0275sanitizeUrl);
  }
}
function DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "audio", 33);
    \u0275\u0275listener("ended", function DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_Conditional_9_Template_audio_ended_3_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.runtime.recordedSegmentEnded());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const segment_r9 = \u0275\u0275nextContext(2);
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.faction(segment_r9.factionId)?.emblem);
    \u0275\u0275advance();
    \u0275\u0275property("autoplay", ctx_r2.runtime.sessionPlaying())("src", segment_r9.recording.downloadUrl);
  }
}
function DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Filed transcript contribution");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const segment_r9 = \u0275\u0275nextContext(2);
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.faction(segment_r9.factionId)?.emblem);
  }
}
function DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_For_17_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details")(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const evidenceId_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.evidenceTitle(evidenceId_r12));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.evidence(evidenceId_r12)?.excerpt);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.evidence(evidenceId_r12)?.context);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.evidence(evidenceId_r12)?.citation, " \xB7 Classroom source summary");
  }
}
function DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_For_17_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const evidenceId_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.runtime.evidenceTitle(evidenceId_r12));
  }
}
function DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_For_17_Conditional_0_Template, 9, 4, "details")(1, DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_For_17_Conditional_1_Template, 2, 1, "strong");
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275conditional(ctx_r2.readOnly() ? 0 : 1);
  }
}
function DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "header", 26)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 27);
    \u0275\u0275conditionalCreate(8, DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_Conditional_8_Template, 1, 2, "video", 28)(9, DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_Conditional_9_Template, 4, 3, "div", 29)(10, DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_Conditional_10_Template, 5, 1, "div", 30);
    \u0275\u0275elementStart(11, "blockquote");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "aside", 31)(14, "span");
    \u0275\u0275text(15, "Evidence entered");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(16, DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_For_17_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const segment_r9 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r9.roundLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r9.speakerDisplayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r2.runtime.faction(segment_r9.factionId)?.name, " \xB7 ", ctx_r2.runtime.speakerLabel);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(segment_r9.recording?.kind === "video" ? 8 : segment_r9.recording?.kind === "audio" ? 9 : 10);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u201C", segment_r9.transcript, "\u201D");
    \u0275\u0275advance(4);
    \u0275\u0275repeater(segment_r9.evidenceIds);
  }
}
function DebateShowcaseComponent_Case_1_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 20, 0);
    \u0275\u0275conditionalCreate(2, DebateShowcaseComponent_Case_1_Conditional_30_Conditional_2_Template, 7, 3, "div", 21)(3, DebateShowcaseComponent_Case_1_Conditional_30_Conditional_3_Template, 9, 4, "div", 22)(4, DebateShowcaseComponent_Case_1_Conditional_30_Conditional_4_Template, 18, 6);
    \u0275\u0275elementStart(5, "div", 23);
    \u0275\u0275element(6, "i");
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const segment_r9 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("faction-floor", segment_r9.kind === "student");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(segment_r9.kind === "ceremony" || segment_r9.kind === "round-title" || segment_r9.kind === "decision" ? 2 : segment_r9.kind === "moderator" ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", ctx_r2.runtime.segmentSecondsRemaining() / ctx_r2.runtime.segmentDuration(segment_r9) * 100, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.formatTime(ctx_r2.runtime.segmentSecondsRemaining()));
  }
}
function DebateShowcaseComponent_Case_1_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_1_Conditional_34_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.playSession());
    });
    \u0275\u0275elementStart(1, "span", 35);
    \u0275\u0275text(2, "\u25B6");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r2.runtime.premiereCanPlay());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", !ctx_r2.runtime.premiereCanPlay() ? "Awaiting the teacher" : ctx_r2.runtime.state().activeSegmentIndex === 0 ? "Convene the " + ctx_r2.runtime.assembly : "Continue proceeding", " ");
  }
}
function DebateShowcaseComponent_Case_1_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_1_Conditional_35_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.pauseSession());
    });
    \u0275\u0275elementStart(1, "span", 35);
    \u0275\u0275text(2, "\u2161");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Hold the floor ");
    \u0275\u0275elementEnd();
  }
}
function DebateShowcaseComponent_Case_1_Conditional_38_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_1_Conditional_38_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.revealSample());
    });
    \u0275\u0275text(1, " Reveal class judgment ");
    \u0275\u0275elementEnd();
  }
}
function DebateShowcaseComponent_Case_1_Conditional_38_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_1_Conditional_38_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.openBallot());
    });
    \u0275\u0275text(1, " Open voting urns ");
    \u0275\u0275elementEnd();
  }
}
function DebateShowcaseComponent_Case_1_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DebateShowcaseComponent_Case_1_Conditional_38_Conditional_0_Template, 2, 0, "button", 37)(1, DebateShowcaseComponent_Case_1_Conditional_38_Conditional_1_Template, 2, 0, "button", 37);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r2.readOnly() ? 0 : 1);
  }
}
function DebateShowcaseComponent_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 2)(1, "header", 4);
    \u0275\u0275conditionalCreate(2, DebateShowcaseComponent_Case_1_Conditional_2_Template, 2, 0, "button", 5);
    \u0275\u0275elementStart(3, "div")(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 6)(11, "div", 7);
    \u0275\u0275element(12, "i")(13, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 8);
    \u0275\u0275element(15, "i")(16, "i")(17, "i")(18, "i")(19, "i")(20, "i")(21, "i")(22, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "aside", 9);
    \u0275\u0275conditionalCreate(24, DebateShowcaseComponent_Case_1_Conditional_24_Template, 7, 4, "nav", 10);
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "ol");
    \u0275\u0275repeaterCreate(28, DebateShowcaseComponent_Case_1_For_29_Template, 8, 7, "li", 11, _forTrack02);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(30, DebateShowcaseComponent_Case_1_Conditional_30_Template, 9, 6, "article", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "footer", 13)(32, "button", 14);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_1_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.previousSegment());
    });
    \u0275\u0275text(33, " \u2190 Prior entry ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(34, DebateShowcaseComponent_Case_1_Conditional_34_Template, 4, 2, "button", 15)(35, DebateShowcaseComponent_Case_1_Conditional_35_Template, 4, 0, "button", 16);
    \u0275\u0275elementStart(36, "button", 17);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_1_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.nextSegment());
    });
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(38, DebateShowcaseComponent_Case_1_Conditional_38_Template, 2, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_11_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate1("", ctx_r2.runtime.assembly, " debate premiere"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.readOnly() ? 2 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.sessionDateLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.title);
    \u0275\u0275advance();
    \u0275\u0275classProp("ready", ctx_r2.runtime.session().status === "premiere" || ctx_r2.runtime.session().status === "premiere-ready");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.readOnly() ? "Completed fictional session" : ctx_r2.runtime.session().status === "premiere" || ctx_r2.runtime.session().status === "premiere-ready" ? "" + ctx_r2.runtime.assembly + " session ready" : "Record-in-progress preview", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("crossfire", ctx_r2.runtime.activeSegment().roundLabel === "Crossfire");
    \u0275\u0275advance(14);
    \u0275\u0275conditional(ctx_r2.readOnly() ? 24 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("The ", ctx_r2.runtime.assembly, " broadcast");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.runtime.program());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_11_0 = ctx_r2.runtime.activeSegment()) ? 30 : -1, tmp_11_0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.runtime.state().activeSegmentIndex === 0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.runtime.sessionPlaying() ? 34 : 35);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.state().activeSegmentIndex === ctx_r2.runtime.program().length - 1 ? "Close the record" : "Call next entry", " \u2192 ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.session().status === "voting" || ctx_r2.runtime.session().status === "complete" ? 38 : -1);
  }
}
function DebateShowcaseComponent_Case_2_Conditional_0_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_2_Conditional_0_For_16_Template_button_click_0_listener() {
      const option_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.castPostOpinion(option_r19.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\u25C6");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r19 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r2.runtime.postOpinion() === option_r19.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", option_r19.label, " ");
  }
}
function DebateShowcaseComponent_Case_2_Conditional_0_For_19_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_2_Conditional_0_For_19_For_10_Template_button_click_0_listener() {
      const option_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const category_r22 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.castCategory(category_r22.id, option_r21.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const option_r21 = ctx.$implicit;
    const category_r22 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r2.runtime.state().categorySelections[category_r22.id] === option_r21.id);
    \u0275\u0275attribute("aria-pressed", ctx_r2.runtime.state().categorySelections[category_r22.id] === option_r21.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r21.emblem ?? "\u25C6");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r21.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r21.detail);
  }
}
function DebateShowcaseComponent_Case_2_Conditional_0_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "fieldset")(1, "legend")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 47);
    \u0275\u0275repeaterCreate(9, DebateShowcaseComponent_Case_2_Conditional_0_For_19_For_10_Template, 7, 6, "button", 42, _forTrack02);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const category_r22 = ctx.$implicit;
    const \u0275$index_253_r23 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((\u0275$index_253_r23 + 1).toString().padStart(2, "0"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(category_r22.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(category_r22.prompt);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.runtime.voteOptions(category_r22));
  }
}
function DebateShowcaseComponent_Case_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 39)(1, "header")(2, "span");
    \u0275\u0275text(3, "The complete student debate has ended");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h1", 40);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Cast a private post-debate opinion, then place one clay token for each judgment.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "fieldset", 41)(9, "legend")(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "small");
    \u0275\u0275text(13, "Did the debate change your view?");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div");
    \u0275\u0275repeaterCreate(15, DebateShowcaseComponent_Case_2_Conditional_0_For_16_Template, 4, 3, "button", 42, _forTrack02);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 43);
    \u0275\u0275repeaterCreate(18, DebateShowcaseComponent_Case_2_Conditional_0_For_19_Template, 11, 3, "fieldset", null, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "label", 44)(21, "span");
    \u0275\u0275text(22, "Reflection \xB7 required individual record");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "strong");
    \u0275\u0275text(24, "What argument most changed, challenged, or strengthened your thinking?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "textarea", 45);
    \u0275\u0275listener("input", function DebateShowcaseComponent_Case_2_Conditional_0_Template_textarea_input_25_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateReflection($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 14);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_2_Conditional_0_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.submitReflection());
    });
    \u0275\u0275text(27, " Enter reflection into my record ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "button", 46);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_2_Conditional_0_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.sealBallot());
    });
    \u0275\u0275elementStart(29, "span", 35);
    \u0275\u0275text(30, "\u25C6");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31, " Seal the voting urn ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("The Judgment of the ", ctx_r2.runtime.assembly);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Post-Debate ", ctx_r2.runtime.assembly, " Opinion");
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.runtime.config.opinionOptions);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.runtime.config.voteCategories);
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r2.runtime.state().reflection);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.runtime.state().reflection.trim().length < 20);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r2.runtime.ballotComplete());
  }
}
function DebateShowcaseComponent_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DebateShowcaseComponent_Case_2_Conditional_0_Template, 32, 5, "section", 39);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r2.readOnly() ? 0 : -1);
  }
}
function DebateShowcaseComponent_Case_3_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "i");
    \u0275\u0275element(7, "b");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "i");
    \u0275\u0275element(12, "b");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "em");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r24 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r24.option.label);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Before \xB7 ", result_r24.before);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", result_r24.before * 8, "%");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("After \xB7 ", result_r24.after);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", result_r24.after * 8, "%");
    \u0275\u0275advance();
    \u0275\u0275classProp("positive", result_r24.change > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", result_r24.change > 0 ? "+" : "", "", result_r24.change);
  }
}
function DebateShowcaseComponent_Case_3_For_13_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r25 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r25.id === "final-verdict" ? "Most persuasive today" : "Class judgment by category", " ");
  }
}
function DebateShowcaseComponent_Case_3_For_13_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r25 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.choiceLabel(category_r25, ctx_r2.runtime.winningChoice(category_r25.id)));
  }
}
function DebateShowcaseComponent_Case_3_For_13_Conditional_0_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "i");
    \u0275\u0275element(4, "b");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const option_r26 = ctx.$implicit;
    const category_r25 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", option_r26.label, " \xB7 ", ctx_r2.tally(category_r25.id, option_r26.id));
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r2.percentage(category_r25.id, option_r26.id), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.percentage(category_r25.id, option_r26.id), "%");
  }
}
function DebateShowcaseComponent_Case_3_For_13_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, DebateShowcaseComponent_Case_3_For_13_Conditional_0_Conditional_3_Template, 2, 1, "h2")(4, DebateShowcaseComponent_Case_3_For_13_Conditional_0_Conditional_4_Template, 2, 1, "h2");
    \u0275\u0275repeaterCreate(5, DebateShowcaseComponent_Case_3_For_13_Conditional_0_For_6_Template, 7, 5, "div", 53, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r25 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(category_r25.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.readOnly() ? 3 : 4);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.runtime.voteOptions(category_r25));
  }
}
function DebateShowcaseComponent_Case_3_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DebateShowcaseComponent_Case_3_For_13_Conditional_0_Template, 7, 2, "article");
  }
  if (rf & 2) {
    const \u0275$index_345_r27 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r2.runtime.state().verdictStep > \u0275$index_345_r27 ? 0 : -1);
  }
}
function DebateShowcaseComponent_Case_3_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 51)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "button", 17);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_3_Conditional_14_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.readOnly() ? ctx_r2.selectEntry(2) : ctx_r2.runtime.enterRoom("chamber"));
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "a", 54);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.readOnly() ? "The completed sample record" : "The official record remains");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" The ", ctx_r2.runtime.assembly, " can now see not only which argument prevailed, but whether the class changed its mind. ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.readOnly() ? "Replay the arguments" : "Return to chamber");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Leave the ", ctx_r2.runtime.assembly);
  }
}
function DebateShowcaseComponent_Case_3_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function DebateShowcaseComponent_Case_3_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.revealNext());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.state().verdictStep === 0 ? "Break the first seal" : ctx_r2.runtime.state().verdictStep === ctx_r2.runtime.config.voteCategories.length ? "Reveal the persuasion shift" : "Break the next seal", " ");
  }
}
function DebateShowcaseComponent_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 3)(1, "header")(2, "span");
    \u0275\u0275text(3, "The seals are broken before the class");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h1", 48);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 49);
    \u0275\u0275repeaterCreate(9, DebateShowcaseComponent_Case_3_For_10_Template, 15, 11, "article", null, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 50);
    \u0275\u0275repeaterCreate(12, DebateShowcaseComponent_Case_3_For_13_Template, 1, 1, null, null, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, DebateShowcaseComponent_Case_3_Conditional_14_Template, 12, 5, "article", 51)(15, DebateShowcaseComponent_Case_3_Conditional_15_Template, 2, 1, "button", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Did the Debate Move the ", ctx_r2.runtime.assembly, "?");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.readOnly() ? "Fictional aggregate classroom results. These totals describe persuasion today; they do not assign mastery or reveal individual ballots." : "Initial opinion is compared with the judgment entered after the authentic student exchange.", " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.runtime.persuasionResults());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.runtime.config.voteCategories);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.runtime.state().verdictStep > ctx_r2.runtime.config.voteCategories.length ? 14 : 15);
  }
}
var DebateShowcaseComponent = class _DebateShowcaseComponent {
  runtime = inject(DebateStudioRuntimeService);
  readOnly = input(
    false,
    ...ngDevMode ? [{ debugName: "readOnly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  entryHeading = viewChild(
    "entryHeading",
    ...ngDevMode ? [{ debugName: "entryHeading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      if (this.readOnly() && this.runtime.state().room === "ballot")
        this.runtime.enterRoom("verdict");
    });
  }
  selectEntry(index) {
    this.runtime.pauseSession();
    this.runtime.state.update((state) => __spreadProps(__spreadValues({}, state), {
      room: "premiere",
      activeSegmentIndex: index
    }));
    afterNextRender(() => {
      const element = this.entryHeading()?.nativeElement;
      element?.scrollIntoView({ block: "nearest" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  revealSample() {
    this.runtime.pauseSession();
    this.runtime.enterRoom("verdict");
  }
  evidence(id) {
    return this.runtime.config.evidence.find((item) => item.id === id);
  }
  updateReflection(event) {
    if (this.readOnly())
      return;
    this.runtime.updateReflection(event.target.value);
  }
  choiceLabel(category, choiceId) {
    return this.runtime.voteOptions(category).find((option) => option.id === choiceId)?.label ?? "No votes yet";
  }
  tally(categoryId, choiceId) {
    return this.runtime.categoryTally(categoryId)[choiceId] ?? 0;
  }
  percentage(categoryId, choiceId) {
    const tally = this.runtime.categoryTally(categoryId);
    const total = Object.values(tally).reduce((sum, value) => sum + value, 0);
    return total === 0 ? 0 : Math.round((tally[choiceId] ?? 0) / total * 100);
  }
  static \u0275fac = function DebateShowcaseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DebateShowcaseComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DebateShowcaseComponent, selectors: [["app-debate-showcase"]], viewQuery: function DebateShowcaseComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.entryHeading, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { readOnly: [1, "readOnly"] }, decls: 4, vars: 5, consts: [["entryHeading", ""], [1, "showcase"], [1, "premiere", 3, "aria-label"], ["aria-labelledby", "verdict-title", 1, "verdict-chamber"], [1, "broadcast-order"], ["type", "button"], [1, "broadcast-stage"], ["aria-hidden", "true", 1, "braziers"], ["aria-hidden", "true", 1, "audience-silhouettes"], ["aria-label", "Assembled debate program \u2014 scroll for more entries", "tabindex", "0", 1, "broadcast-docket"], ["aria-label", "Programme navigation", 1, "program-navigation"], [3, "active", "heard"], ["tabindex", "-1", 1, "live-floor", 3, "faction-floor"], [1, "session-controls"], ["type", "button", 3, "click", "disabled"], ["type", "button", 1, "convene", 3, "disabled"], ["type", "button", 1, "convene"], ["type", "button", 3, "click"], ["type", "button", 1, "entry-link"], ["type", "button", 1, "entry-link", 3, "click"], ["tabindex", "-1", 1, "live-floor"], [1, "title-ceremony"], [1, "moderator-broadcast"], [1, "segment-timer"], ["id", "premiere-title"], [1, "moderator-seal"], [1, "speaker-title"], [1, "student-broadcast"], ["controls", "", "aria-label", "Filed student debate video", 3, "autoplay", "src"], [1, "audio-address"], [1, "transcript-address"], [1, "evidence-projection"], ["controls", "", "aria-label", "Filed student debate video", 3, "ended", "autoplay", "src"], ["controls", "", "aria-label", "Filed student debate audio", 3, "ended", "autoplay", "src"], ["type", "button", 1, "convene", 3, "click", "disabled"], ["aria-hidden", "true"], ["type", "button", 1, "convene", 3, "click"], ["type", "button", 1, "urn"], ["type", "button", 1, "urn", 3, "click"], ["aria-labelledby", "ballot-title", 1, "ballot-chamber"], ["id", "ballot-title"], [1, "opinion-vote"], ["type", "button", 3, "selected"], [1, "ballot-table"], [1, "reflection-tablet"], ["rows", "4", 3, "input", "value"], ["type", "button", 1, "seal-urn", 3, "click", "disabled"], [1, "token-options"], ["id", "verdict-title"], [1, "persuasion-shift"], [1, "verdict-results"], [1, "final-verdict"], ["type", "button", 1, "reveal-seal"], [1, "vote-line"], ["routerLink", "/projects"], ["type", "button", 1, "reveal-seal", 3, "click"]], template: function DebateShowcaseComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 1);
      \u0275\u0275conditionalCreate(1, DebateShowcaseComponent_Case_1_Template, 39, 17, "section", 2)(2, DebateShowcaseComponent_Case_2_Template, 1, 1)(3, DebateShowcaseComponent_Case_3_Template, 16, 3, "section", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275styleProp("--%NS%chamber-image", "url(" + ctx.runtime.config.chamberImageUrl + ")");
      \u0275\u0275classProp("sample-view", ctx.readOnly());
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_2_0 = ctx.runtime.state().room) === "premiere" ? 1 : tmp_2_0 === "ballot" ? 2 : tmp_2_0 === "verdict" ? 3 : -1);
    }
  }, dependencies: [RouterLink], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n}\n.showcase[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  color: #f2e5c6;\n  background: #0b0705;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\nbutton[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.4;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #efc971;\n  outline-offset: 2px;\n}\n.premiere[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 100dvh;\n  grid-template-rows: auto 1fr auto;\n  background-image: linear-gradient(rgba(8, 4, 3, 0.4392156863), rgba(8, 4, 3, 0.6745098039)), var(--%NS%chamber-image);\n  background-position: center;\n  background-size: cover;\n}\n.broadcast-order[_ngcontent-%COMP%] {\n  z-index: 10;\n  display: grid;\n  grid-template-columns: 1fr 1.6fr 1fr;\n  min-height: 4.8rem;\n  align-items: center;\n  border-bottom: 1px solid rgba(204, 166, 94, 0.3607843137);\n  padding: 0.55rem 1rem;\n  background: rgba(18, 11, 8, 0.9607843137);\n}\n.broadcast-order[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.session-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid rgba(169, 135, 82, 0.4196078431);\n  padding: 0.55rem 0.75rem;\n  color: #d9c7a0;\n  background: #28170f;\n}\n.broadcast-order[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.broadcast-order[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.broadcast-order[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n}\n.broadcast-order[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #baa170;\n  font-size: 0.67rem;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.broadcast-order[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 0.18rem;\n  font: 600 1rem Georgia, serif;\n  text-transform: uppercase;\n}\n.broadcast-order[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  justify-self: end;\n  color: #bc9e66;\n  font-size: 0.72rem;\n  text-transform: uppercase;\n}\n.broadcast-order[_ngcontent-%COMP%]   p.ready[_ngcontent-%COMP%] {\n  color: #e5bd69;\n  text-shadow: 0 0 0.8rem #d9a443;\n}\n.broadcast-stage[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  min-height: 0;\n  grid-template-columns: minmax(14rem, 21rem) 1fr;\n  overflow: hidden;\n}\n.broadcast-stage[_ngcontent-%COMP%]::after {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background:\n    radial-gradient(\n      circle at 60% 42%,\n      transparent 10%,\n      rgba(8, 4, 3, 0.3019607843) 58%,\n      rgba(5, 3, 2, 0.7019607843));\n  content: "";\n}\n.broadcast-stage.crossfire[_ngcontent-%COMP%]::after {\n  background:\n    radial-gradient(\n      circle at 60% 42%,\n      rgba(201, 88, 43, 0.1215686275),\n      rgba(8, 4, 3, 0.4784313725) 62%,\n      rgba(5, 3, 2, 0.7803921569));\n}\n.braziers[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1;\n  inset: 0;\n  pointer-events: none;\n}\n.braziers[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 12%;\n  width: 0.5rem;\n  height: 4.5rem;\n  border-radius: 50%;\n  background: #f4a83b;\n  box-shadow: 0 0 2rem 0.9rem rgba(236, 138, 40, 0.4901960784);\n  animation: _ngcontent-%COMP%_flame 900ms ease-in-out infinite alternate;\n}\n.braziers[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:first-child {\n  left: 28%;\n}\n.braziers[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:last-child {\n  right: 8%;\n  animation-delay: 300ms;\n}\n.audience-silhouettes[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1;\n  right: 0;\n  bottom: 0;\n  left: 20rem;\n  display: flex;\n  height: 5rem;\n  align-items: end;\n  justify-content: space-around;\n  opacity: 0.6;\n}\n.audience-silhouettes[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3.5rem;\n  border-radius: 50% 50% 0 0;\n  background: #050302;\n  box-shadow: 0 0 1.5rem #000;\n}\n.audience-silhouettes[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:nth-child(even) {\n  height: 4.4rem;\n}\n.broadcast-docket[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 4;\n  overflow: auto;\n  border-right: 1px solid rgba(195, 157, 90, 0.2980392157);\n  padding: 0.9rem;\n  background: rgba(18, 11, 8, 0.862745098);\n}\n.broadcast-docket[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #c49f5c;\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.broadcast-docket[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.28rem;\n  margin: 0.7rem 0 0;\n  padding: 0;\n  list-style: none;\n}\n.broadcast-docket[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2rem 1fr;\n  gap: 0.45rem;\n  align-items: center;\n  border-left: 2px solid transparent;\n  padding: 0.42rem;\n  color: #887b63;\n}\n.broadcast-docket[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%] {\n  border-color: #e1b65f;\n  color: #f0dcad;\n  background: rgba(90, 50, 27, 0.2705882353);\n}\n.broadcast-docket[_ngcontent-%COMP%]   li.heard[_ngcontent-%COMP%] {\n  color: #aa9d82;\n}\n.broadcast-docket[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n}\n.broadcast-docket[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.broadcast-docket[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n}\n.broadcast-docket[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.58rem;\n  text-transform: uppercase;\n}\n.broadcast-docket[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 0.08rem;\n  font: 600 0.75rem Georgia, serif;\n}\n.live-floor[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 4;\n  display: grid;\n  min-width: 0;\n  place-items: center;\n  padding: 2rem clamp(1rem, 4vw, 4rem) 3.5rem;\n}\n.title-ceremony[_ngcontent-%COMP%], \n.moderator-broadcast[_ngcontent-%COMP%] {\n  max-width: 58rem;\n  text-align: center;\n  text-shadow: 0 0.25rem 0.7rem #000;\n}\n.title-ceremony[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.moderator-broadcast[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  color: #d2aa5b;\n  font-size: 0.75rem;\n  font-weight: 800;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n}\n.title-ceremony[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0.55rem 0;\n  color: #fff0c9;\n  font: 500 clamp(2.3rem, 6vw, 5rem)/0.98 Georgia, serif;\n  text-transform: uppercase;\n}\n.title-ceremony[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #d9c69e;\n  font: 1rem/1.6 Georgia, serif;\n}\n.moderator-seal[_ngcontent-%COMP%] {\n  display: grid;\n  width: 5.5rem;\n  aspect-ratio: 1;\n  place-items: center;\n  margin: 0 auto 0.7rem;\n  border: 1px solid #e1bc70;\n  border-radius: 50%;\n  color: #e4c477;\n  box-shadow: 0 0 2.4rem rgba(221, 170, 77, 0.3294117647);\n  font: 700 1.5rem Georgia, serif;\n}\n.moderator-broadcast[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0.7rem;\n  color: #f1dab0;\n  font: 600 1.1rem Georgia, serif;\n  text-transform: uppercase;\n}\n.moderator-broadcast[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #fff2cf;\n  font: 500 clamp(1.35rem, 3vw, 2.4rem)/1.42 Georgia, serif;\n}\n.faction-floor[_ngcontent-%COMP%] {\n  align-content: center;\n  grid-template-columns: minmax(11rem, 0.6fr) minmax(22rem, 1.55fr) minmax(10rem, 0.6fr);\n  gap: 1rem;\n}\n.speaker-title[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.speaker-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d0a85b;\n  font-size: 0.7rem;\n  text-transform: uppercase;\n}\n.speaker-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.4rem 0 0.15rem;\n  color: #fff0c9;\n  font: 600 1.65rem Georgia, serif;\n}\n.speaker-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #bba984;\n  font-size: 0.75rem;\n}\n.student-broadcast[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid rgba(192, 155, 95, 0.4117647059);\n  padding: 0.8rem;\n  background: rgba(19, 12, 9, 0.8745098039);\n  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.6);\n}\n.student-broadcast[_ngcontent-%COMP%]   video[_ngcontent-%COMP%], \n.student-broadcast[_ngcontent-%COMP%]   audio[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 20rem;\n  background: #050302;\n}\n.student-broadcast[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 0.75rem 0 0;\n  color: #e8d9b8;\n  font: 0.9rem/1.55 Georgia, serif;\n}\n.audio-address[_ngcontent-%COMP%], \n.transcript-address[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 10rem;\n  place-items: center;\n  gap: 0.5rem;\n  background:\n    radial-gradient(\n      circle,\n      #704322,\n      #160d09 65%);\n}\n.audio-address[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.transcript-address[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 4rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #d7b46c;\n  border-radius: 50%;\n  font: 700 1.4rem Georgia, serif;\n}\n.transcript-address[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #b9a47d;\n  font-size: 0.7rem;\n  text-transform: uppercase;\n}\n.evidence-projection[_ngcontent-%COMP%] {\n  display: grid;\n  align-self: center;\n  gap: 0.45rem;\n  border-left: 1px solid rgba(208, 170, 97, 0.3607843137);\n  padding-left: 0.8rem;\n}\n.evidence-projection[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #cba45a;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n}\n.evidence-projection[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #d5c39d;\n  font: 600 0.78rem Georgia, serif;\n}\n.segment-timer[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 2rem;\n  bottom: 1.2rem;\n  left: 2rem;\n  height: 0.3rem;\n  background: rgba(33, 20, 13, 0.7607843137);\n}\n.segment-timer[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  background: #d5ad5f;\n  transition: width 1s linear;\n}\n.segment-timer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  bottom: 0.45rem;\n  color: #d8c49b;\n  font: 700 0.72rem Georgia, serif;\n}\n.session-controls[_ngcontent-%COMP%] {\n  z-index: 10;\n  display: flex;\n  justify-content: center;\n  gap: 0.6rem;\n  border-top: 1px solid rgba(195, 157, 90, 0.2980392157);\n  padding: 0.7rem;\n  background: rgba(17, 10, 7, 0.9568627451);\n}\n.session-controls[_ngcontent-%COMP%]   .convene[_ngcontent-%COMP%] {\n  border-color: #e0bb70;\n  color: #28170f;\n  background: #dbb86d;\n  font-weight: 800;\n}\n.session-controls[_ngcontent-%COMP%]   .urn[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.ballot-chamber[_ngcontent-%COMP%], \n.verdict-chamber[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  padding: 2.2rem clamp(1rem, 4vw, 4rem) 3rem;\n  background:\n    radial-gradient(\n      circle at 50% 0,\n      rgba(112, 72, 43, 0.3215686275),\n      transparent 30rem),\n    #100a07;\n}\n.ballot-chamber[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n.verdict-chamber[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  max-width: 58rem;\n  margin: 0 auto 1.5rem;\n  text-align: center;\n}\n.ballot-chamber[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.verdict-chamber[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #c9a45c;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.ballot-chamber[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.verdict-chamber[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0.35rem 0;\n  color: #fff0ca;\n  font: 500 clamp(2rem, 4vw, 3.5rem)/1.05 Georgia, serif;\n}\n.ballot-chamber[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.verdict-chamber[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #baa987;\n}\n.opinion-vote[_ngcontent-%COMP%], \n.ballot-table[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%] {\n  border: 1px solid rgba(181, 146, 89, 0.3607843137);\n  padding: 0.9rem;\n  background: rgba(33, 20, 14, 0.9176470588);\n}\n.opinion-vote[_ngcontent-%COMP%] {\n  max-width: 68rem;\n  margin: 0 auto 1rem;\n}\n.opinion-vote[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%], \n.ballot-table[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  padding: 0 0.55rem;\n}\n.opinion-vote[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.opinion-vote[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.ballot-table[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.ballot-table[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n.opinion-vote[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.ballot-table[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e1c382;\n  font: 600 1rem Georgia, serif;\n}\n.opinion-vote[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.ballot-table[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #a99777;\n  font-size: 0.68rem;\n}\n.opinion-vote[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], \n.token-options[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.55rem;\n}\n.opinion-vote[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.token-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 4.3rem;\n  place-items: center;\n  gap: 0.2rem;\n  border: 1px solid rgba(169, 137, 86, 0.4196078431);\n  padding: 0.55rem;\n  color: #d7c49d;\n  background: #160d09;\n}\n.opinion-vote[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%], \n.token-options[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: #e4bd68;\n  color: #2b190f;\n  background: #d9b66c;\n  box-shadow: 0 0 1.5rem rgba(216, 170, 81, 0.3215686275);\n}\n.opinion-vote[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.token-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.token-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 600 0.82rem Georgia, serif;\n}\n.token-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.63rem;\n  line-height: 1.25;\n}\n.ballot-table[_ngcontent-%COMP%] {\n  display: grid;\n  max-width: 68rem;\n  gap: 0.75rem;\n  margin: 0 auto;\n}\n.ballot-table[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0 0.5rem;\n}\n.ballot-table[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  grid-row: 1/span 2;\n  color: #c9a45c;\n}\n.reflection-tablet[_ngcontent-%COMP%] {\n  display: grid;\n  max-width: 68rem;\n  gap: 0.4rem;\n  margin: 1rem auto;\n  border: 1px solid rgba(181, 146, 89, 0.3607843137);\n  padding: 0.9rem;\n  background: #dbc28c;\n  color: #342015;\n}\n.reflection-tablet[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #765036;\n  font-size: 0.68rem;\n  text-transform: uppercase;\n}\n.reflection-tablet[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  font: 600 1rem Georgia, serif;\n}\n.reflection-tablet[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border: 1px solid #89603d;\n  padding: 0.7rem;\n  color: #2d1b11;\n  background: #fff3d2;\n}\n.reflection-tablet[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  justify-self: end;\n  border: 1px solid #70482f;\n  padding: 0.5rem 0.7rem;\n  color: #f0dfbd;\n  background: #57331f;\n}\n.seal-urn[_ngcontent-%COMP%], \n.reveal-seal[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 1.2rem auto 0;\n  border: 1px solid #f0ce83;\n  padding: 0.8rem 1rem;\n  color: #28170f;\n  background: #d9b66c;\n  box-shadow: 0 0 1.8rem rgba(214, 168, 77, 0.3098039216);\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.persuasion-shift[_ngcontent-%COMP%] {\n  display: grid;\n  max-width: 68rem;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.7rem;\n  margin: 0 auto 1rem;\n}\n.persuasion-shift[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n.verdict-results[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n.final-verdict[_ngcontent-%COMP%] {\n  border: 1px solid rgba(181, 146, 89, 0.3607843137);\n  padding: 0.85rem;\n  background: rgba(33, 20, 14, 0.9176470588);\n}\n.persuasion-shift[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  min-height: 2.5rem;\n  color: #e2c689;\n  font: 600 0.9rem Georgia, serif;\n}\n.persuasion-shift[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], \n.vote-line[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(8rem, 1fr) 2fr auto;\n  gap: 0.5rem;\n  align-items: center;\n  margin-top: 0.4rem;\n}\n.persuasion-shift[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.vote-line[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  height: 0.4rem;\n  overflow: hidden;\n  background: #0e0806;\n}\n.persuasion-shift[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]   b[_ngcontent-%COMP%], \n.vote-line[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  background: #c7a45c;\n}\n.persuasion-shift[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.5rem;\n  color: #c27161;\n  text-align: right;\n}\n.persuasion-shift[_ngcontent-%COMP%]   em.positive[_ngcontent-%COMP%] {\n  color: #8fb07c;\n}\n.verdict-results[_ngcontent-%COMP%] {\n  display: grid;\n  max-width: 68rem;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.7rem;\n  margin: 0 auto;\n}\n.verdict-results[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #c7a15a;\n  font-size: 0.67rem;\n  text-transform: uppercase;\n}\n.verdict-results[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0.7rem;\n  color: #f0dfb7;\n  font: 600 1.1rem Georgia, serif;\n}\n.vote-line[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.vote-line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #b9a886;\n  font-size: 0.67rem;\n}\n.final-verdict[_ngcontent-%COMP%] {\n  max-width: 52rem;\n  margin: 1rem auto;\n  text-align: center;\n}\n.final-verdict[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #c8a35d;\n  font-size: 0.68rem;\n  text-transform: uppercase;\n}\n.final-verdict[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.4rem 0;\n  color: #f2dfb4;\n  font: 2rem Georgia, serif;\n}\n.final-verdict[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #c2b08d;\n}\n.final-verdict[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 0.6rem;\n}\n.final-verdict[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.final-verdict[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  border: 1px solid #b18d57;\n  padding: 0.55rem 0.75rem;\n  color: #e4cea2;\n  background: #301b12;\n  text-decoration: none;\n}\n@keyframes _ngcontent-%COMP%_flame {\n  to {\n    height: 5rem;\n    opacity: 0.72;\n    transform: translateX(0.2rem);\n  }\n}\n@media (max-width: 900px) {\n  .faction-floor[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .speaker-title[_ngcontent-%COMP%], \n   .evidence-projection[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 700px) {\n  .broadcast-order[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr;\n  }\n  .broadcast-order[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .broadcast-stage[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .broadcast-docket[_ngcontent-%COMP%] {\n    max-height: 10rem;\n    border-right: 0;\n    border-bottom: 1px solid rgba(195, 157, 90, 0.2980392157);\n  }\n  .live-floor[_ngcontent-%COMP%] {\n    min-height: 28rem;\n  }\n  .session-controls[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .session-controls[_ngcontent-%COMP%]   .urn[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .opinion-vote[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], \n   .token-options[_ngcontent-%COMP%], \n   .persuasion-shift[_ngcontent-%COMP%], \n   .verdict-results[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .braziers[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  .segment-timer[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n.entry-link[_ngcontent-%COMP%] {\n  font: inherit;\n  text-align: left;\n  border: 0;\n  color: inherit;\n  background: none;\n  padding: 4px 0;\n  cursor: pointer;\n  width: 100%;\n}\n.entry-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.entry-link[_ngcontent-%COMP%]:focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus {\n  outline: 3px solid #e0b570;\n  outline-offset: 3px;\n}\n.evidence-projection[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  border-top: 1px solid #8b7349;\n  padding: 9px 0;\n}\n.evidence-projection[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-weight: 700;\n}\n.evidence-projection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  line-height: 1.6;\n}\n.evidence-projection[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  line-height: 1.5;\n}\n.persuasion-shift[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.vote-line[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n.sample-view[_ngcontent-%COMP%]   .broadcast-docket[_ngcontent-%COMP%] {\n  max-height: 46rem;\n}\n.sample-view[_ngcontent-%COMP%]   .entry-link[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #d3c09c;\n}\n.sample-view[_ngcontent-%COMP%]   .broadcast-order[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr auto;\n}\n@media (max-width: 900px) {\n  .sample-view[_ngcontent-%COMP%]   .speaker-title[_ngcontent-%COMP%], \n   .sample-view[_ngcontent-%COMP%]   .evidence-projection[_ngcontent-%COMP%] {\n    display: block;\n    width: 100%;\n  }\n  .sample-view[_ngcontent-%COMP%]   .faction-floor[_ngcontent-%COMP%] {\n    gap: 22px;\n  }\n  .sample-view[_ngcontent-%COMP%]   .student-broadcast[_ngcontent-%COMP%] {\n    min-width: 0;\n  }\n  .sample-view[_ngcontent-%COMP%]   .student-broadcast[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    line-height: 1.8;\n  }\n}\n@media (max-width: 700px) {\n  .sample-view[_ngcontent-%COMP%]   .broadcast-docket[_ngcontent-%COMP%] {\n    max-height: 12rem;\n  }\n  .sample-view[_ngcontent-%COMP%]   .live-floor[_ngcontent-%COMP%] {\n    padding: 22px 18px 50px;\n  }\n}\n.sample-view[_ngcontent-%COMP%]   .broadcast-stage[_ngcontent-%COMP%] {\n  min-height: 0;\n  height: var(--%NS%presentation-available-height, 70dvh);\n}\n.sample-view[_ngcontent-%COMP%]   .broadcast-docket[_ngcontent-%COMP%] {\n  max-height: 100%;\n}\n.sample-view[_ngcontent-%COMP%]   .live-floor[_ngcontent-%COMP%] {\n  min-height: 0;\n  overflow: auto;\n}\n.program-navigation[_ngcontent-%COMP%] {\n  position: sticky;\n  top: -14px;\n  z-index: 5;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 6px;\n  background: #1a120c;\n  padding: 8px 0;\n}\n.program-navigation[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 8px;\n  border: 1px solid #a98f60;\n  color: #f4e8d2;\n  background: #322517;\n  cursor: pointer;\n}\n/*# sourceMappingURL=debate-showcase.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DebateShowcaseComponent, [{
    type: Component,
    args: [{ selector: "app-debate-showcase", imports: [RouterLink], template: `<main
  class="showcase"
  [class.sample-view]="readOnly()"
  [style.--chamber-image]="'url(' + runtime.config.chamberImageUrl + ')'"
>
  @switch (runtime.state().room) {
    @case ('premiere') {
      <section class="premiere" aria-label="{{ runtime.assembly }} debate premiere">
        <header class="broadcast-order">
          @if (!readOnly()) {
            <button type="button" (click)="runtime.enterRoom('chamber')">
              \u2190 Return to chamber
            </button>
          }
          <div>
            <span>{{ runtime.config.sessionDateLabel }}</span
            ><strong>{{ runtime.config.title }}</strong>
          </div>
          <p
            [class.ready]="
              runtime.session().status === 'premiere' ||
              runtime.session().status === 'premiere-ready'
            "
          >
            {{
              readOnly()
                ? 'Completed fictional session'
                : runtime.session().status === 'premiere' ||
                    runtime.session().status === 'premiere-ready'
                  ? '' + runtime.assembly + ' session ready'
                  : 'Record-in-progress preview'
            }}
          </p>
        </header>

        <div
          class="broadcast-stage"
          [class.crossfire]="runtime.activeSegment().roundLabel === 'Crossfire'"
        >
          <div class="braziers" aria-hidden="true"><i></i><i></i></div>
          <div class="audience-silhouettes" aria-hidden="true">
            <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
          </div>

          <aside
            class="broadcast-docket"
            aria-label="Assembled debate program \u2014 scroll for more entries"
            tabindex="0"
          >
            @if (readOnly()) {
              <nav class="program-navigation" aria-label="Programme navigation">
                <button
                  type="button"
                  [disabled]="runtime.state().activeSegmentIndex === 0"
                  (click)="selectEntry(runtime.state().activeSegmentIndex - 1)"
                >
                  \u2190 Previous
                </button>
                <span
                  >{{ runtime.state().activeSegmentIndex + 1 }} /
                  {{ runtime.program().length }}</span
                >
                <button
                  type="button"
                  [disabled]="runtime.state().activeSegmentIndex >= runtime.program().length - 1"
                  (click)="selectEntry(runtime.state().activeSegmentIndex + 1)"
                >
                  Next \u2192
                </button>
              </nav>
            }
            <span>The {{ runtime.assembly }} broadcast</span>
            <ol>
              @for (segment of runtime.program(); track segment.id; let index = $index) {
                <li
                  [class.active]="runtime.state().activeSegmentIndex === index"
                  [class.heard]="runtime.state().activeSegmentIndex > index"
                >
                  <b>{{ (index + 1).toString().padStart(2, '0') }}</b>
                  <div>
                    <small>{{ segment.roundLabel }}</small>
                    @if (readOnly()) {
                      <button
                        type="button"
                        class="entry-link"
                        [attr.aria-current]="
                          runtime.state().activeSegmentIndex === index ? 'step' : null
                        "
                        (click)="selectEntry(index)"
                      >
                        {{ segment.speakerDisplayName ?? segment.title }}
                      </button>
                    } @else {
                      <strong>{{ segment.speakerDisplayName ?? segment.title }}</strong>
                    }
                  </div>
                </li>
              }
            </ol>
          </aside>

          @if (runtime.activeSegment(); as segment) {
            <article
              #entryHeading
              tabindex="-1"
              class="live-floor"
              [class.faction-floor]="segment.kind === 'student'"
            >
              @if (
                segment.kind === 'ceremony' ||
                segment.kind === 'round-title' ||
                segment.kind === 'decision'
              ) {
                <div class="title-ceremony">
                  <span>{{ segment.roundLabel }}</span>
                  <h1 id="premiere-title">{{ segment.title }}</h1>
                  <p>{{ segment.transcript }}</p>
                </div>
              } @else if (segment.kind === 'moderator') {
                <div class="moderator-broadcast">
                  <span class="moderator-seal">{{ runtime.config.moderator.initials }}</span>
                  <small>{{ runtime.config.moderator.displayName }}</small>
                  <h2>{{ runtime.config.moderator.title }}</h2>
                  <blockquote>\u201C{{ segment.transcript }}\u201D</blockquote>
                </div>
              } @else {
                <header class="speaker-title">
                  <span>{{ segment.roundLabel }}</span>
                  <h2>{{ segment.speakerDisplayName }}</h2>
                  <p>{{ runtime.faction(segment.factionId)?.name }} \xB7 {{ runtime.speakerLabel }}</p>
                </header>
                <div class="student-broadcast">
                  @if (segment.recording?.kind === 'video') {
                    <video
                      controls
                      [autoplay]="runtime.sessionPlaying()"
                      [src]="segment.recording.downloadUrl"
                      (ended)="runtime.recordedSegmentEnded()"
                      aria-label="Filed student debate video"
                    ></video>
                  } @else if (segment.recording?.kind === 'audio') {
                    <div class="audio-address">
                      <span>{{ runtime.faction(segment.factionId)?.emblem }}</span>
                      <audio
                        controls
                        [autoplay]="runtime.sessionPlaying()"
                        [src]="segment.recording.downloadUrl"
                        (ended)="runtime.recordedSegmentEnded()"
                        aria-label="Filed student debate audio"
                      ></audio>
                    </div>
                  } @else {
                    <div class="transcript-address">
                      <span>{{ runtime.faction(segment.factionId)?.emblem }}</span>
                      <p>Filed transcript contribution</p>
                    </div>
                  }
                  <blockquote>\u201C{{ segment.transcript }}\u201D</blockquote>
                </div>
                <aside class="evidence-projection">
                  <span>Evidence entered</span>
                  @for (evidenceId of segment.evidenceIds; track evidenceId) {
                    @if (readOnly()) {
                      <details>
                        <summary>{{ runtime.evidenceTitle(evidenceId) }}</summary>
                        <p>{{ evidence(evidenceId)?.excerpt }}</p>
                        <p>{{ evidence(evidenceId)?.context }}</p>
                        <small
                          >{{ evidence(evidenceId)?.citation }} \xB7 Classroom source summary</small
                        >
                      </details>
                    } @else {
                      <strong>{{ runtime.evidenceTitle(evidenceId) }}</strong>
                    }
                  }
                </aside>
              }
              <div class="segment-timer">
                <i
                  [style.width.%]="
                    (runtime.segmentSecondsRemaining() / runtime.segmentDuration(segment)) * 100
                  "
                ></i
                ><span>{{ runtime.formatTime(runtime.segmentSecondsRemaining()) }}</span>
              </div>
            </article>
          }
        </div>

        <footer class="session-controls">
          <button
            type="button"
            [disabled]="runtime.state().activeSegmentIndex === 0"
            (click)="runtime.previousSegment()"
          >
            \u2190 Prior entry
          </button>
          @if (!runtime.sessionPlaying()) {
            <button
              class="convene"
              type="button"
              [disabled]="!runtime.premiereCanPlay()"
              (click)="runtime.playSession()"
            >
              <span aria-hidden="true">\u25B6</span>
              {{
                !runtime.premiereCanPlay()
                  ? 'Awaiting the teacher'
                  : runtime.state().activeSegmentIndex === 0
                    ? 'Convene the ' + runtime.assembly + ''
                    : 'Continue proceeding'
              }}
            </button>
          } @else {
            <button class="convene" type="button" (click)="runtime.pauseSession()">
              <span aria-hidden="true">\u2161</span> Hold the floor
            </button>
          }
          <button type="button" (click)="runtime.nextSegment()">
            {{
              runtime.state().activeSegmentIndex === runtime.program().length - 1
                ? 'Close the record'
                : 'Call next entry'
            }}
            \u2192
          </button>
          @if (runtime.session().status === 'voting' || runtime.session().status === 'complete') {
            @if (readOnly()) {
              <button class="urn" type="button" (click)="revealSample()">
                Reveal class judgment
              </button>
            } @else {
              <button class="urn" type="button" (click)="runtime.openBallot()">
                Open voting urns
              </button>
            }
          }
        </footer>
      </section>
    }

    @case ('ballot') {
      @if (!readOnly()) {
        <section class="ballot-chamber" aria-labelledby="ballot-title">
          <header>
            <span>The complete student debate has ended</span>
            <h1 id="ballot-title">The Judgment of the {{ runtime.assembly }}</h1>
            <p>Cast a private post-debate opinion, then place one clay token for each judgment.</p>
          </header>

          <fieldset class="opinion-vote">
            <legend>
              <strong>Post-Debate {{ runtime.assembly }} Opinion</strong
              ><small>Did the debate change your view?</small>
            </legend>
            <div>
              @for (option of runtime.config.opinionOptions; track option.id) {
                <button
                  type="button"
                  [class.selected]="runtime.postOpinion() === option.id"
                  (click)="runtime.castPostOpinion(option.id)"
                >
                  <span>\u25C6</span>{{ option.label }}
                </button>
              }
            </div>
          </fieldset>

          <div class="ballot-table">
            @for (
              category of runtime.config.voteCategories;
              track category.id;
              let index = $index
            ) {
              <fieldset>
                <legend>
                  <span>{{ (index + 1).toString().padStart(2, '0') }}</span
                  ><strong>{{ category.label }}</strong
                  ><small>{{ category.prompt }}</small>
                </legend>
                <div class="token-options">
                  @for (option of runtime.voteOptions(category); track option.id) {
                    <button
                      type="button"
                      [class.selected]="
                        runtime.state().categorySelections[category.id] === option.id
                      "
                      [attr.aria-pressed]="
                        runtime.state().categorySelections[category.id] === option.id
                      "
                      (click)="runtime.castCategory(category.id, option.id)"
                    >
                      <span>{{ option.emblem ?? '\u25C6' }}</span
                      ><strong>{{ option.label }}</strong
                      ><small>{{ option.detail }}</small>
                    </button>
                  }
                </div>
              </fieldset>
            }
          </div>

          <label class="reflection-tablet">
            <span>Reflection \xB7 required individual record</span>
            <strong>What argument most changed, challenged, or strengthened your thinking?</strong>
            <textarea
              rows="4"
              [value]="runtime.state().reflection"
              (input)="updateReflection($event)"
            ></textarea>
            <button
              type="button"
              [disabled]="runtime.state().reflection.trim().length < 20"
              (click)="runtime.submitReflection()"
            >
              Enter reflection into my record
            </button>
          </label>

          <button
            class="seal-urn"
            type="button"
            [disabled]="!runtime.ballotComplete()"
            (click)="runtime.sealBallot()"
          >
            <span aria-hidden="true">\u25C6</span> Seal the voting urn
          </button>
        </section>
      }
    }

    @case ('verdict') {
      <section class="verdict-chamber" aria-labelledby="verdict-title">
        <header>
          <span>The seals are broken before the class</span>
          <h1 id="verdict-title">Did the Debate Move the {{ runtime.assembly }}?</h1>
          <p>
            {{
              readOnly()
                ? 'Fictional aggregate classroom results. These totals describe persuasion today; they do not assign mastery or reveal individual ballots.'
                : 'Initial opinion is compared with the judgment entered after the authentic student exchange.'
            }}
          </p>
        </header>

        <div class="persuasion-shift">
          @for (result of runtime.persuasionResults(); track result.option.id) {
            <article>
              <strong>{{ result.option.label }}</strong>
              <div>
                <span>Before \xB7 {{ result.before }}</span
                ><i><b [style.width.%]="result.before * 8"></b></i>
              </div>
              <div>
                <span>After \xB7 {{ result.after }}</span
                ><i><b [style.width.%]="result.after * 8"></b></i>
              </div>
              <em [class.positive]="result.change > 0"
                >{{ result.change > 0 ? '+' : '' }}{{ result.change }}</em
              >
            </article>
          }
        </div>

        <div class="verdict-results">
          @for (category of runtime.config.voteCategories; track category.id; let index = $index) {
            @if (runtime.state().verdictStep > index) {
              <article>
                <span>{{ category.label }}</span>
                @if (readOnly()) {
                  <h2>
                    {{
                      category.id === 'final-verdict'
                        ? 'Most persuasive today'
                        : 'Class judgment by category'
                    }}
                  </h2>
                } @else {
                  <h2>{{ choiceLabel(category, runtime.winningChoice(category.id)) }}</h2>
                }
                @for (option of runtime.voteOptions(category); track option.id) {
                  <div class="vote-line">
                    <small>{{ option.label }} \xB7 {{ tally(category.id, option.id) }}</small
                    ><i><b [style.width.%]="percentage(category.id, option.id)"></b></i
                    ><span>{{ percentage(category.id, option.id) }}%</span>
                  </div>
                }
              </article>
            }
          }
        </div>

        @if (runtime.state().verdictStep > runtime.config.voteCategories.length) {
          <article class="final-verdict">
            <span>{{
              readOnly() ? 'The completed sample record' : 'The official record remains'
            }}</span>
            <h2>{{ runtime.config.title }}</h2>
            <p>
              The {{ runtime.assembly }} can now see not only which argument prevailed, but whether the class
              changed its mind.
            </p>
            <div>
              <button
                type="button"
                (click)="readOnly() ? selectEntry(2) : runtime.enterRoom('chamber')"
              >
                {{ readOnly() ? 'Replay the arguments' : 'Return to chamber' }}</button
              ><a routerLink="/projects">Leave the {{ runtime.assembly }}</a>
            </div>
          </article>
        } @else {
          <button class="reveal-seal" type="button" (click)="runtime.revealNext()">
            {{
              runtime.state().verdictStep === 0
                ? 'Break the first seal'
                : runtime.state().verdictStep === runtime.config.voteCategories.length
                  ? 'Reveal the persuasion shift'
                  : 'Break the next seal'
            }}
          </button>
        }
      </section>
    }
  }
</main>
`, styles: ['/* src/app/templates/debate-studio/ui/debate-showcase.component.scss */\n:host {\n  display: block;\n  min-height: 100dvh;\n}\n.showcase {\n  min-height: 100dvh;\n  color: #f2e5c6;\n  background: #0b0705;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\nbutton,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n}\nbutton:disabled {\n  cursor: not-allowed;\n  opacity: 0.4;\n}\nbutton:focus-visible,\ntextarea:focus-visible {\n  outline: 3px solid #efc971;\n  outline-offset: 2px;\n}\n.premiere {\n  display: grid;\n  min-height: 100dvh;\n  grid-template-rows: auto 1fr auto;\n  background-image: linear-gradient(rgba(8, 4, 3, 0.4392156863), rgba(8, 4, 3, 0.6745098039)), var(--chamber-image);\n  background-position: center;\n  background-size: cover;\n}\n.broadcast-order {\n  z-index: 10;\n  display: grid;\n  grid-template-columns: 1fr 1.6fr 1fr;\n  min-height: 4.8rem;\n  align-items: center;\n  border-bottom: 1px solid rgba(204, 166, 94, 0.3607843137);\n  padding: 0.55rem 1rem;\n  background: rgba(18, 11, 8, 0.9607843137);\n}\n.broadcast-order button,\n.session-controls button {\n  border: 1px solid rgba(169, 135, 82, 0.4196078431);\n  padding: 0.55rem 0.75rem;\n  color: #d9c7a0;\n  background: #28170f;\n}\n.broadcast-order div {\n  text-align: center;\n}\n.broadcast-order div span,\n.broadcast-order div strong {\n  display: block;\n}\n.broadcast-order div span {\n  color: #baa170;\n  font-size: 0.67rem;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.broadcast-order div strong {\n  margin-top: 0.18rem;\n  font: 600 1rem Georgia, serif;\n  text-transform: uppercase;\n}\n.broadcast-order p {\n  justify-self: end;\n  color: #bc9e66;\n  font-size: 0.72rem;\n  text-transform: uppercase;\n}\n.broadcast-order p.ready {\n  color: #e5bd69;\n  text-shadow: 0 0 0.8rem #d9a443;\n}\n.broadcast-stage {\n  position: relative;\n  display: grid;\n  min-height: 0;\n  grid-template-columns: minmax(14rem, 21rem) 1fr;\n  overflow: hidden;\n}\n.broadcast-stage::after {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background:\n    radial-gradient(\n      circle at 60% 42%,\n      transparent 10%,\n      rgba(8, 4, 3, 0.3019607843) 58%,\n      rgba(5, 3, 2, 0.7019607843));\n  content: "";\n}\n.broadcast-stage.crossfire::after {\n  background:\n    radial-gradient(\n      circle at 60% 42%,\n      rgba(201, 88, 43, 0.1215686275),\n      rgba(8, 4, 3, 0.4784313725) 62%,\n      rgba(5, 3, 2, 0.7803921569));\n}\n.braziers {\n  position: absolute;\n  z-index: 1;\n  inset: 0;\n  pointer-events: none;\n}\n.braziers i {\n  position: absolute;\n  bottom: 12%;\n  width: 0.5rem;\n  height: 4.5rem;\n  border-radius: 50%;\n  background: #f4a83b;\n  box-shadow: 0 0 2rem 0.9rem rgba(236, 138, 40, 0.4901960784);\n  animation: flame 900ms ease-in-out infinite alternate;\n}\n.braziers i:first-child {\n  left: 28%;\n}\n.braziers i:last-child {\n  right: 8%;\n  animation-delay: 300ms;\n}\n.audience-silhouettes {\n  position: absolute;\n  z-index: 1;\n  right: 0;\n  bottom: 0;\n  left: 20rem;\n  display: flex;\n  height: 5rem;\n  align-items: end;\n  justify-content: space-around;\n  opacity: 0.6;\n}\n.audience-silhouettes i {\n  width: 3rem;\n  height: 3.5rem;\n  border-radius: 50% 50% 0 0;\n  background: #050302;\n  box-shadow: 0 0 1.5rem #000;\n}\n.audience-silhouettes i:nth-child(even) {\n  height: 4.4rem;\n}\n.broadcast-docket {\n  position: relative;\n  z-index: 4;\n  overflow: auto;\n  border-right: 1px solid rgba(195, 157, 90, 0.2980392157);\n  padding: 0.9rem;\n  background: rgba(18, 11, 8, 0.862745098);\n}\n.broadcast-docket > span {\n  color: #c49f5c;\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.broadcast-docket ol {\n  display: grid;\n  gap: 0.28rem;\n  margin: 0.7rem 0 0;\n  padding: 0;\n  list-style: none;\n}\n.broadcast-docket li {\n  display: grid;\n  grid-template-columns: 2rem 1fr;\n  gap: 0.45rem;\n  align-items: center;\n  border-left: 2px solid transparent;\n  padding: 0.42rem;\n  color: #887b63;\n}\n.broadcast-docket li.active {\n  border-color: #e1b65f;\n  color: #f0dcad;\n  background: rgba(90, 50, 27, 0.2705882353);\n}\n.broadcast-docket li.heard {\n  color: #aa9d82;\n}\n.broadcast-docket b {\n  font-size: 0.65rem;\n}\n.broadcast-docket small,\n.broadcast-docket strong {\n  display: block;\n}\n.broadcast-docket small {\n  font-size: 0.58rem;\n  text-transform: uppercase;\n}\n.broadcast-docket strong {\n  margin-top: 0.08rem;\n  font: 600 0.75rem Georgia, serif;\n}\n.live-floor {\n  position: relative;\n  z-index: 4;\n  display: grid;\n  min-width: 0;\n  place-items: center;\n  padding: 2rem clamp(1rem, 4vw, 4rem) 3.5rem;\n}\n.title-ceremony,\n.moderator-broadcast {\n  max-width: 58rem;\n  text-align: center;\n  text-shadow: 0 0.25rem 0.7rem #000;\n}\n.title-ceremony > span,\n.moderator-broadcast > small {\n  color: #d2aa5b;\n  font-size: 0.75rem;\n  font-weight: 800;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n}\n.title-ceremony h1 {\n  margin: 0.55rem 0;\n  color: #fff0c9;\n  font: 500 clamp(2.3rem, 6vw, 5rem)/0.98 Georgia, serif;\n  text-transform: uppercase;\n}\n.title-ceremony p {\n  color: #d9c69e;\n  font: 1rem/1.6 Georgia, serif;\n}\n.moderator-seal {\n  display: grid;\n  width: 5.5rem;\n  aspect-ratio: 1;\n  place-items: center;\n  margin: 0 auto 0.7rem;\n  border: 1px solid #e1bc70;\n  border-radius: 50%;\n  color: #e4c477;\n  box-shadow: 0 0 2.4rem rgba(221, 170, 77, 0.3294117647);\n  font: 700 1.5rem Georgia, serif;\n}\n.moderator-broadcast h2 {\n  margin: 0.35rem 0 0.7rem;\n  color: #f1dab0;\n  font: 600 1.1rem Georgia, serif;\n  text-transform: uppercase;\n}\n.moderator-broadcast blockquote {\n  margin: 0;\n  color: #fff2cf;\n  font: 500 clamp(1.35rem, 3vw, 2.4rem)/1.42 Georgia, serif;\n}\n.faction-floor {\n  align-content: center;\n  grid-template-columns: minmax(11rem, 0.6fr) minmax(22rem, 1.55fr) minmax(10rem, 0.6fr);\n  gap: 1rem;\n}\n.speaker-title {\n  text-align: center;\n}\n.speaker-title span {\n  color: #d0a85b;\n  font-size: 0.7rem;\n  text-transform: uppercase;\n}\n.speaker-title h2 {\n  margin: 0.4rem 0 0.15rem;\n  color: #fff0c9;\n  font: 600 1.65rem Georgia, serif;\n}\n.speaker-title p {\n  margin: 0;\n  color: #bba984;\n  font-size: 0.75rem;\n}\n.student-broadcast {\n  width: 100%;\n  border: 1px solid rgba(192, 155, 95, 0.4117647059);\n  padding: 0.8rem;\n  background: rgba(19, 12, 9, 0.8745098039);\n  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.6);\n}\n.student-broadcast video,\n.student-broadcast audio {\n  width: 100%;\n  max-height: 20rem;\n  background: #050302;\n}\n.student-broadcast blockquote {\n  margin: 0.75rem 0 0;\n  color: #e8d9b8;\n  font: 0.9rem/1.55 Georgia, serif;\n}\n.audio-address,\n.transcript-address {\n  display: grid;\n  min-height: 10rem;\n  place-items: center;\n  gap: 0.5rem;\n  background:\n    radial-gradient(\n      circle,\n      #704322,\n      #160d09 65%);\n}\n.audio-address > span,\n.transcript-address > span {\n  display: grid;\n  width: 4rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #d7b46c;\n  border-radius: 50%;\n  font: 700 1.4rem Georgia, serif;\n}\n.transcript-address p {\n  color: #b9a47d;\n  font-size: 0.7rem;\n  text-transform: uppercase;\n}\n.evidence-projection {\n  display: grid;\n  align-self: center;\n  gap: 0.45rem;\n  border-left: 1px solid rgba(208, 170, 97, 0.3607843137);\n  padding-left: 0.8rem;\n}\n.evidence-projection span {\n  color: #cba45a;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n}\n.evidence-projection strong {\n  color: #d5c39d;\n  font: 600 0.78rem Georgia, serif;\n}\n.segment-timer {\n  position: absolute;\n  right: 2rem;\n  bottom: 1.2rem;\n  left: 2rem;\n  height: 0.3rem;\n  background: rgba(33, 20, 13, 0.7607843137);\n}\n.segment-timer i {\n  display: block;\n  height: 100%;\n  background: #d5ad5f;\n  transition: width 1s linear;\n}\n.segment-timer span {\n  position: absolute;\n  right: 0;\n  bottom: 0.45rem;\n  color: #d8c49b;\n  font: 700 0.72rem Georgia, serif;\n}\n.session-controls {\n  z-index: 10;\n  display: flex;\n  justify-content: center;\n  gap: 0.6rem;\n  border-top: 1px solid rgba(195, 157, 90, 0.2980392157);\n  padding: 0.7rem;\n  background: rgba(17, 10, 7, 0.9568627451);\n}\n.session-controls .convene {\n  border-color: #e0bb70;\n  color: #28170f;\n  background: #dbb86d;\n  font-weight: 800;\n}\n.session-controls .urn {\n  margin-left: auto;\n}\n.ballot-chamber,\n.verdict-chamber {\n  min-height: 100dvh;\n  padding: 2.2rem clamp(1rem, 4vw, 4rem) 3rem;\n  background:\n    radial-gradient(\n      circle at 50% 0,\n      rgba(112, 72, 43, 0.3215686275),\n      transparent 30rem),\n    #100a07;\n}\n.ballot-chamber > header,\n.verdict-chamber > header {\n  max-width: 58rem;\n  margin: 0 auto 1.5rem;\n  text-align: center;\n}\n.ballot-chamber > header span,\n.verdict-chamber > header span {\n  color: #c9a45c;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.ballot-chamber h1,\n.verdict-chamber h1 {\n  margin: 0.35rem 0;\n  color: #fff0ca;\n  font: 500 clamp(2rem, 4vw, 3.5rem)/1.05 Georgia, serif;\n}\n.ballot-chamber header p,\n.verdict-chamber header p {\n  color: #baa987;\n}\n.opinion-vote,\n.ballot-table fieldset {\n  border: 1px solid rgba(181, 146, 89, 0.3607843137);\n  padding: 0.9rem;\n  background: rgba(33, 20, 14, 0.9176470588);\n}\n.opinion-vote {\n  max-width: 68rem;\n  margin: 0 auto 1rem;\n}\n.opinion-vote legend,\n.ballot-table legend {\n  padding: 0 0.55rem;\n}\n.opinion-vote legend strong,\n.opinion-vote legend small,\n.ballot-table legend strong,\n.ballot-table legend small {\n  display: block;\n}\n.opinion-vote legend strong,\n.ballot-table legend strong {\n  color: #e1c382;\n  font: 600 1rem Georgia, serif;\n}\n.opinion-vote legend small,\n.ballot-table legend small {\n  color: #a99777;\n  font-size: 0.68rem;\n}\n.opinion-vote > div,\n.token-options {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.55rem;\n}\n.opinion-vote button,\n.token-options button {\n  display: grid;\n  min-height: 4.3rem;\n  place-items: center;\n  gap: 0.2rem;\n  border: 1px solid rgba(169, 137, 86, 0.4196078431);\n  padding: 0.55rem;\n  color: #d7c49d;\n  background: #160d09;\n}\n.opinion-vote button.selected,\n.token-options button.selected {\n  border-color: #e4bd68;\n  color: #2b190f;\n  background: #d9b66c;\n  box-shadow: 0 0 1.5rem rgba(216, 170, 81, 0.3215686275);\n}\n.opinion-vote button span,\n.token-options button > span {\n  font-size: 1.1rem;\n}\n.token-options button strong {\n  font: 600 0.82rem Georgia, serif;\n}\n.token-options button small {\n  font-size: 0.63rem;\n  line-height: 1.25;\n}\n.ballot-table {\n  display: grid;\n  max-width: 68rem;\n  gap: 0.75rem;\n  margin: 0 auto;\n}\n.ballot-table legend {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0 0.5rem;\n}\n.ballot-table legend > span {\n  grid-row: 1/span 2;\n  color: #c9a45c;\n}\n.reflection-tablet {\n  display: grid;\n  max-width: 68rem;\n  gap: 0.4rem;\n  margin: 1rem auto;\n  border: 1px solid rgba(181, 146, 89, 0.3607843137);\n  padding: 0.9rem;\n  background: #dbc28c;\n  color: #342015;\n}\n.reflection-tablet > span {\n  color: #765036;\n  font-size: 0.68rem;\n  text-transform: uppercase;\n}\n.reflection-tablet > strong {\n  font: 600 1rem Georgia, serif;\n}\n.reflection-tablet textarea {\n  border: 1px solid #89603d;\n  padding: 0.7rem;\n  color: #2d1b11;\n  background: #fff3d2;\n}\n.reflection-tablet button {\n  justify-self: end;\n  border: 1px solid #70482f;\n  padding: 0.5rem 0.7rem;\n  color: #f0dfbd;\n  background: #57331f;\n}\n.seal-urn,\n.reveal-seal {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 1.2rem auto 0;\n  border: 1px solid #f0ce83;\n  padding: 0.8rem 1rem;\n  color: #28170f;\n  background: #d9b66c;\n  box-shadow: 0 0 1.8rem rgba(214, 168, 77, 0.3098039216);\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.persuasion-shift {\n  display: grid;\n  max-width: 68rem;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.7rem;\n  margin: 0 auto 1rem;\n}\n.persuasion-shift article,\n.verdict-results article,\n.final-verdict {\n  border: 1px solid rgba(181, 146, 89, 0.3607843137);\n  padding: 0.85rem;\n  background: rgba(33, 20, 14, 0.9176470588);\n}\n.persuasion-shift strong {\n  display: block;\n  min-height: 2.5rem;\n  color: #e2c689;\n  font: 600 0.9rem Georgia, serif;\n}\n.persuasion-shift article > div,\n.vote-line {\n  display: grid;\n  grid-template-columns: minmax(8rem, 1fr) 2fr auto;\n  gap: 0.5rem;\n  align-items: center;\n  margin-top: 0.4rem;\n}\n.persuasion-shift i,\n.vote-line i {\n  height: 0.4rem;\n  overflow: hidden;\n  background: #0e0806;\n}\n.persuasion-shift i b,\n.vote-line i b {\n  display: block;\n  height: 100%;\n  background: #c7a45c;\n}\n.persuasion-shift em {\n  display: block;\n  margin-top: 0.5rem;\n  color: #c27161;\n  text-align: right;\n}\n.persuasion-shift em.positive {\n  color: #8fb07c;\n}\n.verdict-results {\n  display: grid;\n  max-width: 68rem;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.7rem;\n  margin: 0 auto;\n}\n.verdict-results article > span {\n  color: #c7a15a;\n  font-size: 0.67rem;\n  text-transform: uppercase;\n}\n.verdict-results h2 {\n  margin: 0.25rem 0 0.7rem;\n  color: #f0dfb7;\n  font: 600 1.1rem Georgia, serif;\n}\n.vote-line small,\n.vote-line span {\n  color: #b9a886;\n  font-size: 0.67rem;\n}\n.final-verdict {\n  max-width: 52rem;\n  margin: 1rem auto;\n  text-align: center;\n}\n.final-verdict > span {\n  color: #c8a35d;\n  font-size: 0.68rem;\n  text-transform: uppercase;\n}\n.final-verdict h2 {\n  margin: 0.4rem 0;\n  color: #f2dfb4;\n  font: 2rem Georgia, serif;\n}\n.final-verdict p {\n  color: #c2b08d;\n}\n.final-verdict div {\n  display: flex;\n  justify-content: center;\n  gap: 0.6rem;\n}\n.final-verdict button,\n.final-verdict a {\n  border: 1px solid #b18d57;\n  padding: 0.55rem 0.75rem;\n  color: #e4cea2;\n  background: #301b12;\n  text-decoration: none;\n}\n@keyframes flame {\n  to {\n    height: 5rem;\n    opacity: 0.72;\n    transform: translateX(0.2rem);\n  }\n}\n@media (max-width: 900px) {\n  .faction-floor {\n    grid-template-columns: 1fr;\n  }\n  .speaker-title,\n  .evidence-projection {\n    display: none;\n  }\n}\n@media (max-width: 700px) {\n  .broadcast-order {\n    grid-template-columns: auto 1fr;\n  }\n  .broadcast-order p {\n    display: none;\n  }\n  .broadcast-stage {\n    grid-template-columns: 1fr;\n  }\n  .broadcast-docket {\n    max-height: 10rem;\n    border-right: 0;\n    border-bottom: 1px solid rgba(195, 157, 90, 0.2980392157);\n  }\n  .live-floor {\n    min-height: 28rem;\n  }\n  .session-controls {\n    flex-wrap: wrap;\n  }\n  .session-controls .urn {\n    margin-left: 0;\n  }\n  .opinion-vote > div,\n  .token-options,\n  .persuasion-shift,\n  .verdict-results {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .braziers i {\n    animation: none;\n  }\n  .segment-timer i {\n    transition: none;\n  }\n}\n.entry-link {\n  font: inherit;\n  text-align: left;\n  border: 0;\n  color: inherit;\n  background: none;\n  padding: 4px 0;\n  cursor: pointer;\n  width: 100%;\n}\n.entry-link:hover {\n  text-decoration: underline;\n}\n.entry-link:focus-visible,\n[tabindex="-1"]:focus {\n  outline: 3px solid #e0b570;\n  outline-offset: 3px;\n}\n.evidence-projection details {\n  border-top: 1px solid #8b7349;\n  padding: 9px 0;\n}\n.evidence-projection summary {\n  cursor: pointer;\n  font-weight: 700;\n}\n.evidence-projection p {\n  font-size: 0.8rem;\n  line-height: 1.6;\n}\n.evidence-projection small {\n  font-size: 0.7rem;\n  line-height: 1.5;\n}\n.persuasion-shift i,\n.vote-line i {\n  overflow: hidden;\n}\n.sample-view .broadcast-docket {\n  max-height: 46rem;\n}\n.sample-view .entry-link {\n  font-size: 0.8rem;\n  color: #d3c09c;\n}\n.sample-view .broadcast-order {\n  grid-template-columns: 1fr auto;\n}\n@media (max-width: 900px) {\n  .sample-view .speaker-title,\n  .sample-view .evidence-projection {\n    display: block;\n    width: 100%;\n  }\n  .sample-view .faction-floor {\n    gap: 22px;\n  }\n  .sample-view .student-broadcast {\n    min-width: 0;\n  }\n  .sample-view .student-broadcast blockquote {\n    font-size: 1rem;\n    line-height: 1.8;\n  }\n}\n@media (max-width: 700px) {\n  .sample-view .broadcast-docket {\n    max-height: 12rem;\n  }\n  .sample-view .live-floor {\n    padding: 22px 18px 50px;\n  }\n}\n.sample-view .broadcast-stage {\n  min-height: 0;\n  height: var(--presentation-available-height, 70dvh);\n}\n.sample-view .broadcast-docket {\n  max-height: 100%;\n}\n.sample-view .live-floor {\n  min-height: 0;\n  overflow: auto;\n}\n.program-navigation {\n  position: sticky;\n  top: -14px;\n  z-index: 5;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 6px;\n  background: #1a120c;\n  padding: 8px 0;\n}\n.program-navigation button {\n  min-height: 44px;\n  padding: 8px;\n  border: 1px solid #a98f60;\n  color: #f4e8d2;\n  background: #322517;\n  cursor: pointer;\n}\n/*# sourceMappingURL=debate-showcase.component.css.map */\n'] }]
  }], () => [], { readOnly: [{ type: Input, args: [{ isSignal: true, alias: "readOnly", required: false }] }], entryHeading: [{ type: ViewChild, args: ["entryHeading", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DebateShowcaseComponent, { className: "DebateShowcaseComponent", filePath: "src/app/templates/debate-studio/ui/debate-showcase.component.ts", lineNumber: 22 });
})();

// src/app/templates/debate-studio/ui/debate-composer-dock.component.ts
var _forTrack03 = ($index, $item) => $item.id;
var _forTrack12 = ($index, $item) => $item.value;
function DebateComposerDockComponent_Conditional_15_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "b");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.runtime.state().selectedEvidenceIds.length);
  }
}
function DebateComposerDockComponent_Conditional_15_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 16);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_For_3_Template_button_click_0_listener() {
      const tab_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setTab(tab_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, DebateComposerDockComponent_Conditional_15_For_3_Conditional_2_Template, 2, 1, "b");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("id", "composer-tab-" + tab_r2.id);
    \u0275\u0275attribute("aria-selected", ctx_r2.activeTab() === tab_r2.id)("aria-controls", "composer-panel-" + tab_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r2.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r2.id === "evidence" ? 2 : -1);
  }
}
function DebateComposerDockComponent_Conditional_15_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 17);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setTab("moderator"));
    });
    \u0275\u0275text(1, " Moderator ");
    \u0275\u0275domElementStart(2, "b");
    \u0275\u0275text(3, "1");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-selected", ctx_r2.activeTab() === "moderator");
  }
}
function DebateComposerDockComponent_Conditional_15_Case_6_Conditional_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_6_Conditional_6_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.runtime.markModeratorHeard());
    });
    \u0275\u0275text(1, " Accept question ");
    \u0275\u0275domElementEnd();
  }
}
function DebateComposerDockComponent_Conditional_15_Case_6_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article", 18)(1, "small");
    \u0275\u0275text(2, "Moderator asks");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(5, DebateComposerDockComponent_Conditional_15_Case_6_Conditional_6_Conditional_5_Template, 2, 0, "button", 19);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.question);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.moderatorReady() ? 5 : -1);
  }
}
function DebateComposerDockComponent_Conditional_15_Case_6_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const prompt_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(prompt_r6);
  }
}
function DebateComposerDockComponent_Conditional_15_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 12)(1, "article")(2, "small");
    \u0275\u0275text(3, "Question before the class");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(6, DebateComposerDockComponent_Conditional_15_Case_6_Conditional_6_Template, 6, 2, "article", 18);
    \u0275\u0275domElementStart(7, "article")(8, "small");
    \u0275\u0275text(9, "Your response must");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "ul");
    \u0275\u0275repeaterCreate(11, DebateComposerDockComponent_Conditional_15_Case_6_For_12_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.centralQuestion);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx_r2.runtime.currentModeratorPrompt()) ? 6 : -1, tmp_3_0);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.runtime.currentRound().preparationPrompts);
  }
}
function DebateComposerDockComponent_Conditional_15_Case_7_Conditional_0_For_11_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const mark_r11 = ctx.$implicit;
    \u0275\u0275domProperty("value", mark_r11.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(mark_r11.label);
  }
}
function DebateComposerDockComponent_Conditional_15_Case_7_Conditional_0_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article")(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "label");
    \u0275\u0275text(4, "Mark this claim ");
    \u0275\u0275domElementStart(5, "select", 27);
    \u0275\u0275domListener("change", function DebateComposerDockComponent_Conditional_15_Case_7_Conditional_0_For_11_Template_select_change_5_listener($event) {
      const passage_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.markPassage(passage_r10, $event));
    });
    \u0275\u0275domElementStart(6, "option", 28);
    \u0275\u0275text(7, "Choose a note");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(8, DebateComposerDockComponent_Conditional_15_Case_7_Conditional_0_For_11_For_9_Template, 2, 2, "option", 29, _forTrack12);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const passage_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("marked", ctx_r2.runtime.annotationFor(passage_r10));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(passage_r10);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", ctx_r2.runtime.annotationFor(passage_r10)?.marker ?? "");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.argumentMarks);
  }
}
function DebateComposerDockComponent_Conditional_15_Case_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 21)(1, "header")(2, "div")(3, "small");
    \u0275\u0275text(4, "Latest opposing argument");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_7_Conditional_0_Template_button_click_7_listener() {
      const opponent_r8 = \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.speak(opponent_r8.transcript ?? ""));
    });
    \u0275\u0275text(8, " Hear aloud ");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "div", 23);
    \u0275\u0275repeaterCreate(10, DebateComposerDockComponent_Conditional_15_Case_7_Conditional_0_For_11_Template, 10, 4, "article", 24, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "div", 25)(13, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_7_Conditional_0_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.markOpponentPlaybackComplete());
    });
    \u0275\u0275text(14, " I heard the full argument ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "button", 26);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_7_Conditional_0_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.markOpponentHeard());
    });
    \u0275\u0275text(16, " Carry it into my response ");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx.speakerDisplayName);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.runtime.opponentPassages());
  }
}
function DebateComposerDockComponent_Conditional_15_Case_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 22);
    \u0275\u0275text(1, "No opposing argument is required before this turn.");
    \u0275\u0275domElementEnd();
  }
}
function DebateComposerDockComponent_Conditional_15_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DebateComposerDockComponent_Conditional_15_Case_7_Conditional_0_Template, 17, 1, "div", 21)(1, DebateComposerDockComponent_Conditional_15_Case_7_Conditional_1_Template, 2, 0, "p", 22);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional((tmp_2_0 = ctx_r2.runtime.previousOpponentTurn()) ? 0 : 1, tmp_2_0);
  }
}
function DebateComposerDockComponent_Conditional_15_Case_8_For_2_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const mark_r14 = ctx.$implicit;
    \u0275\u0275domProperty("value", mark_r14.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(mark_r14.label);
  }
}
function DebateComposerDockComponent_Conditional_15_Case_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article")(1, "header")(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "footer")(9, "label");
    \u0275\u0275text(10, "Use as ");
    \u0275\u0275domElementStart(11, "select", 27);
    \u0275\u0275domListener("change", function DebateComposerDockComponent_Conditional_15_Case_8_For_2_Template_select_change_11_listener($event) {
      const item_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.markEvidence(item_r13, $event));
    });
    \u0275\u0275domElementStart(12, "option", 28);
    \u0275\u0275text(13, "Classify");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(14, DebateComposerDockComponent_Conditional_15_Case_8_For_2_For_15_Template, 2, 2, "option", 29, _forTrack12);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(16, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_8_For_2_Template_button_click_16_listener() {
      const item_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.toggleEvidence(item_r13));
    });
    \u0275\u0275text(17);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r2.runtime.state().selectedEvidenceIds.includes(item_r13.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", item_r13.dateLabel, " \xB7 ", item_r13.sourceType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r13.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r13.excerpt);
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("value", ctx_r2.runtime.state().evidenceMarks[item_r13.id] ?? "");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.evidenceMarks);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r2.runtime.state().selectedEvidenceIds.includes(item_r13.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.state().selectedEvidenceIds.includes(item_r13.id) ? "Pinned" : "Pin evidence", " ");
  }
}
function DebateComposerDockComponent_Conditional_15_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 13);
    \u0275\u0275repeaterCreate(1, DebateComposerDockComponent_Conditional_15_Case_8_For_2_Template, 18, 9, "article", 30, _forTrack03);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.runtime.config.evidence);
  }
}
function DebateComposerDockComponent_Conditional_15_Case_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 31);
    \u0275\u0275text(1, " Complete the highlighted listening step to unlock editing. Your saved draft remains visible. ");
    \u0275\u0275domElementEnd();
  }
}
function DebateComposerDockComponent_Conditional_15_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, DebateComposerDockComponent_Conditional_15_Case_9_Conditional_0_Template, 2, 0, "p", 31);
    \u0275\u0275domElementStart(1, "fieldset", 32)(2, "label", 33);
    \u0275\u0275text(3, "Speech draft ");
    \u0275\u0275domElementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "textarea", 34);
    \u0275\u0275domListener("input", function DebateComposerDockComponent_Conditional_15_Case_9_Template_textarea_input_6_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateDraft($event));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "label");
    \u0275\u0275text(8, "Explain your reasoning ");
    \u0275\u0275domElementStart(9, "textarea", 35);
    \u0275\u0275domListener("input", function DebateComposerDockComponent_Conditional_15_Case_9_Template_textarea_input_9_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateReasoning($event));
    });
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r2.runtime.chamberStage() !== "your-turn" ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r2.runtime.chamberStage() !== "your-turn");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r2.draftWords(), " words \xB7 ", ctx_r2.runtime.saveState());
    \u0275\u0275advance();
    \u0275\u0275domProperty("value", ctx_r2.runtime.state().draft);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", ctx_r2.runtime.state().reasoningContribution);
  }
}
function DebateComposerDockComponent_Conditional_15_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 14)(1, "article", 36)(2, "small");
    \u0275\u0275text(3, "Response readiness");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "ul")(5, "li");
    \u0275\u0275text(6, "Heard the opposing argument");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "li");
    \u0275\u0275text(8, " Marked a claim to answer ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "li");
    \u0275\u0275text(10, "Received the moderator question");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "li");
    \u0275\u0275text(12, "Pinned required evidence");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "li");
    \u0275\u0275text(14, "Explained the reasoning");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "li");
    \u0275\u0275text(16, "Completed a rehearsal");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(17, "li");
    \u0275\u0275text(18, " Reviewed a recording or transcript ");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(19, "article", 37)(20, "small");
    \u0275\u0275text(21, "Teacher feedback");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(22, "p");
    \u0275\u0275text(23);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("done", ctx_r2.listeningReady());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("done", ctx_r2.runtime.state().annotations.length > 0 || !ctx_r2.runtime.previousOpponentTurn());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("done", ctx_r2.moderatorReady());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("done", ctx_r2.evidenceReady());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("done", ctx_r2.reasoningReady());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("done", ctx_r2.runtime.state().rehearsed);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("done", ctx_r2.runtime.state().recordingReady);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.currentTurn()?.teacherFeedback || "No teacher note yet. Use the readiness checks to strengthen this response before filing.", " ");
  }
}
function DebateComposerDockComponent_Conditional_15_Case_11_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_11_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.stopRehearsal());
    });
    \u0275\u0275text(1, "Stop rehearsal");
    \u0275\u0275domElementEnd();
  }
}
function DebateComposerDockComponent_Conditional_15_Case_11_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_11_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.startRehearsal());
    });
    \u0275\u0275text(1, "Start rehearsal");
    \u0275\u0275domElementEnd();
  }
}
function DebateComposerDockComponent_Conditional_15_Case_11_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_11_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.stopRecording());
    });
    \u0275\u0275text(1, "Stop");
    \u0275\u0275domElementEnd();
  }
}
function DebateComposerDockComponent_Conditional_15_Case_11_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_11_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.startRecording(true));
    });
    \u0275\u0275text(1, "Video");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_11_Conditional_15_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.startRecording(false));
    });
    \u0275\u0275text(3, "Audio");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_11_Conditional_15_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.useTranscriptFallback());
    });
    \u0275\u0275text(5, " Transcript ");
    \u0275\u0275domElementEnd();
  }
}
function DebateComposerDockComponent_Conditional_15_Case_11_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_11_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.retakeRecording());
    });
    \u0275\u0275text(1, "Retake");
    \u0275\u0275domElementEnd();
  }
}
function DebateComposerDockComponent_Conditional_15_Case_11_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "progress", 39);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275domProperty("value", ctx_r2.runtime.uploadProgress());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.uploadProgress(), "% ");
  }
}
function DebateComposerDockComponent_Conditional_15_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 15)(1, "article")(2, "small");
    \u0275\u0275text(3, "1 \xB7 Rehearse");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(6, DebateComposerDockComponent_Conditional_15_Case_11_Conditional_6_Template, 2, 0, "button", 19)(7, DebateComposerDockComponent_Conditional_15_Case_11_Conditional_7_Template, 2, 0, "button", 19);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "article")(9, "small");
    \u0275\u0275text(10, "2 \xB7 Record");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "div");
    \u0275\u0275conditionalCreate(14, DebateComposerDockComponent_Conditional_15_Case_11_Conditional_14_Template, 2, 0, "button", 19)(15, DebateComposerDockComponent_Conditional_15_Case_11_Conditional_15_Template, 6, 0);
    \u0275\u0275conditionalCreate(16, DebateComposerDockComponent_Conditional_15_Case_11_Conditional_16_Template, 2, 0, "button", 19);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(17, "article", 38)(18, "small");
    \u0275\u0275text(19, "3 \xB7 File to the debate");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(20, "strong");
    \u0275\u0275text(21);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(22, DebateComposerDockComponent_Conditional_15_Case_11_Conditional_22_Template, 2, 2, "progress", 39);
    \u0275\u0275domElementStart(23, "button", 40);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_11_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.fileSpeech());
    });
    \u0275\u0275text(24, " File this argument ");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r2.runtime.formatTime(ctx_r2.runtime.state().rehearsalSeconds), " / ", ctx_r2.runtime.formatTime(ctx_r2.runtime.currentRound().timeLimitSeconds));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.rehearsalRunning() ? 6 : 7);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.runtime.recordingState() === "recording" ? "Recording now" : ctx_r2.runtime.state().recordingKind ?? "Choose a format");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.runtime.recordingState() === "recording" ? 14 : 15);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.runtime.state().recordingReady ? 16 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.runtime.canFile() ? "Ready to enter the record" : "Finish the remaining checks");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.recordingState() === "uploading" ? 22 : -1);
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", !ctx_r2.runtime.canFile() || ctx_r2.runtime.recordingState() === "uploading");
  }
}
function DebateComposerDockComponent_Conditional_15_Case_12_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_12_Conditional_0_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r24);
      const prompt_r23 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.approvePrompt(prompt_r23));
    });
    \u0275\u0275text(1, "Approve");
    \u0275\u0275domElementEnd();
  }
}
function DebateComposerDockComponent_Conditional_15_Case_12_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 41)(1, "label");
    \u0275\u0275text(2, "Question for the next speaker ");
    \u0275\u0275domElementStart(3, "textarea", 42);
    \u0275\u0275domListener("input", function DebateComposerDockComponent_Conditional_15_Case_12_Conditional_0_Template_textarea_input_3_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.updateModerator($event));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "div")(5, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_12_Conditional_0_Template_button_click_5_listener() {
      const prompt_r23 = \u0275\u0275restoreView(_r22);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.saveModeratorEdit(prompt_r23));
    });
    \u0275\u0275text(6, " Save edit ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "button", 20);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_12_Conditional_0_Template_button_click_7_listener() {
      const prompt_r23 = \u0275\u0275restoreView(_r22);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.regeneratePrompt(prompt_r23));
    });
    \u0275\u0275text(8, " Regenerate ");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(9, DebateComposerDockComponent_Conditional_15_Case_12_Conditional_0_Conditional_9_Template, 2, 0, "button", 19);
    \u0275\u0275domElementStart(10, "button", 26);
    \u0275\u0275domListener("click", function DebateComposerDockComponent_Conditional_15_Case_12_Conditional_0_Template_button_click_10_listener() {
      const prompt_r23 = \u0275\u0275restoreView(_r22);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.releasePrompt(prompt_r23));
    });
    \u0275\u0275text(11, " Release to debate ");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", ctx_r2.runtime.moderatorDraft());
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx.status === "proposed" ? 9 : -1);
  }
}
function DebateComposerDockComponent_Conditional_15_Case_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DebateComposerDockComponent_Conditional_15_Case_12_Conditional_0_Template, 12, 2, "div", 41);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional((tmp_2_0 = ctx_r2.runtime.pendingModeratorPrompt()) ? 0 : -1, tmp_2_0);
  }
}
function DebateComposerDockComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 7)(1, "div", 8);
    \u0275\u0275repeaterCreate(2, DebateComposerDockComponent_Conditional_15_For_3_Template, 3, 5, "button", 9, _forTrack03);
    \u0275\u0275conditionalCreate(4, DebateComposerDockComponent_Conditional_15_Conditional_4_Template, 4, 1, "button", 10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 11);
    \u0275\u0275conditionalCreate(6, DebateComposerDockComponent_Conditional_15_Case_6_Template, 13, 2, "div", 12)(7, DebateComposerDockComponent_Conditional_15_Case_7_Template, 2, 1)(8, DebateComposerDockComponent_Conditional_15_Case_8_Template, 3, 0, "div", 13)(9, DebateComposerDockComponent_Conditional_15_Case_9_Template, 10, 6)(10, DebateComposerDockComponent_Conditional_15_Case_10_Template, 24, 15, "div", 14)(11, DebateComposerDockComponent_Conditional_15_Case_11_Template, 25, 9, "div", 15)(12, DebateComposerDockComponent_Conditional_15_Case_12_Template, 1, 1);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.tabs);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.runtime.canManageModerator() && ctx_r2.runtime.pendingModeratorPrompt() ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275domProperty("id", "composer-panel-" + ctx_r2.activeTab());
    \u0275\u0275attribute("aria-labelledby", "composer-tab-" + ctx_r2.activeTab());
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r2.activeTab()) === "plan" ? 6 : tmp_5_0 === "opponent" ? 7 : tmp_5_0 === "evidence" ? 8 : tmp_5_0 === "write" ? 9 : tmp_5_0 === "feedback" ? 10 : tmp_5_0 === "file" ? 11 : tmp_5_0 === "moderator" ? 12 : -1);
  }
}
var DebateComposerDockComponent = class _DebateComposerDockComponent {
  runtime = inject(DebateStudioRuntimeService);
  expanded = signal(
    false,
    ...ngDevMode ? [{ debugName: "expanded" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeTab = signal(
    "plan",
    ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tabs = [
    { id: "plan", label: "Plan" },
    { id: "opponent", label: "Opponent" },
    { id: "evidence", label: "Evidence" },
    { id: "write", label: "Write" },
    { id: "feedback", label: "Feedback" },
    { id: "file", label: "Record & file" }
  ];
  argumentMarks = [
    { value: "answer-this", label: "Answer this" },
    { value: "challenge-this", label: "Challenge this" },
    { value: "strong-evidence", label: "Strong evidence" },
    { value: "weak-evidence", label: "Weak evidence" },
    { value: "needs-context", label: "Needs context" },
    { value: "save-for-closing", label: "Save for closing" }
  ];
  evidenceMarks = [
    { value: "support", label: "Supports our case" },
    { value: "challenge", label: "Challenges opponent" },
    { value: "context", label: "Adds context" },
    { value: "closing", label: "Save for closing" },
    { value: "fact-check", label: "Needs fact check" }
  ];
  draftWords = computed(
    () => {
      const draft = this.runtime.state().draft.trim();
      return draft.length === 0 ? 0 : draft.split(/\s+/).length;
    },
    ...ngDevMode ? [{ debugName: "draftWords" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reasoningReady = computed(
    () => this.runtime.state().reasoningContribution.trim().length >= 30,
    ...ngDevMode ? [{ debugName: "reasoningReady" }] : (
      /* istanbul ignore next */
      []
    )
  );
  listeningReady = computed(
    () => {
      const opponent = this.runtime.previousOpponentTurn();
      return opponent === void 0 || this.runtime.state().opponentHeardTurnId === opponent.id;
    },
    ...ngDevMode ? [{ debugName: "listeningReady" }] : (
      /* istanbul ignore next */
      []
    )
  );
  moderatorReady = computed(
    () => {
      const prompt = this.runtime.currentModeratorPrompt();
      return prompt === void 0 || this.runtime.state().moderatorHeardPromptId === prompt.id;
    },
    ...ngDevMode ? [{ debugName: "moderatorReady" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidenceReady = computed(
    () => this.runtime.state().selectedEvidenceIds.length >= (this.runtime.currentRound()?.minimumEvidence ?? 0),
    ...ngDevMode ? [{ debugName: "evidenceReady" }] : (
      /* istanbul ignore next */
      []
    )
  );
  setTab(tab) {
    this.activeTab.set(tab);
  }
  toggleExpanded() {
    this.expanded.update((expanded) => !expanded);
  }
  open(tab = "plan") {
    this.activeTab.set(tab);
    this.expanded.set(true);
  }
  updateDraft(event) {
    this.runtime.updateDraft(event.target.value);
  }
  updateReasoning(event) {
    this.runtime.updateReasoningContribution(event.target.value);
  }
  updateModerator(event) {
    this.runtime.moderatorDraft.set(event.target.value);
  }
  markEvidence(item, event) {
    this.runtime.markEvidence(item, event.target.value);
  }
  markPassage(excerpt, event) {
    this.runtime.markOpponentPassage(excerpt, event.target.value);
  }
  static \u0275fac = function DebateComposerDockComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DebateComposerDockComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DebateComposerDockComponent, selectors: [["app-debate-composer-dock"]], hostVars: 2, hostBindings: function DebateComposerDockComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("composer-expanded", ctx.expanded());
    }
  }, decls: 16, vars: 9, consts: [["aria-labelledby", "composer-title", 1, "composer-dock"], [1, "composer-summary"], ["id", "composer-title"], [1, "summary-actions"], [1, "floor-status"], ["aria-hidden", "true"], ["type", "button", "aria-controls", "response-builder-content", 1, "builder-toggle", 3, "click"], ["id", "response-builder-content", 1, "composer-content"], ["role", "tablist", "aria-label", "Response builder", 1, "composer-tabs"], ["type", "button", "role", "tab", 3, "id"], ["type", "button", "role", "tab", "id", "composer-tab-moderator", "aria-controls", "composer-panel-moderator"], ["role", "tabpanel", 1, "composer-panel", 3, "id"], [1, "plan-grid"], [1, "evidence-grid"], [1, "feedback-grid"], [1, "file-grid"], ["type", "button", "role", "tab", 3, "click", "id"], ["type", "button", "role", "tab", "id", "composer-tab-moderator", "aria-controls", "composer-panel-moderator", 3, "click"], [1, "neutral-card"], ["type", "button"], ["type", "button", 3, "click"], [1, "opponent-review"], [1, "empty-panel"], [1, "passage-list"], [3, "marked"], [1, "review-actions"], ["type", "button", 1, "primary", 3, "click"], [3, "change", "value"], ["value", "", "disabled", ""], [3, "value"], [3, "selected"], [1, "gate-note"], [1, "writing-grid", 3, "disabled"], [1, "draft-field"], ["placeholder", "Write the next response here\u2026", 3, "input", "value"], ["placeholder", "Why does your evidence support the claim, and how does it answer the other side?", 3, "input", "value"], [1, "readiness-card"], [1, "teacher-feedback"], [1, "file-action"], ["max", "100", 3, "value"], ["type", "button", 1, "primary", 3, "click", "disabled"], [1, "moderator-editor"], [3, "input", "value"]], template: function DebateComposerDockComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "header", 1)(2, "div")(3, "span");
      \u0275\u0275text(4, "Build the next argument");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "h2", 2);
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(7, "div", 3)(8, "div", 4);
      \u0275\u0275domElement(9, "i", 5);
      \u0275\u0275text(10);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(11, "button", 6);
      \u0275\u0275domListener("click", function DebateComposerDockComponent_Template_button_click_11_listener() {
        return ctx.toggleExpanded();
      });
      \u0275\u0275text(12);
      \u0275\u0275domElementStart(13, "span", 5);
      \u0275\u0275text(14);
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275conditionalCreate(15, DebateComposerDockComponent_Conditional_15_Template, 13, 4, "div", 7);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate2(" ", ctx.runtime.currentRound().label, " \xB7 ", ctx.runtime.roleLabel(ctx.runtime.currentTurn()), " ");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("ready", ctx.runtime.chamberStage() === "your-turn");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.runtime.chamberHeadline(), " ");
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-expanded", ctx.expanded());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.expanded() ? "Close builder" : "Open response builder", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.expanded() ? "\u2304" : "\u2303");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.expanded() ? 15 : -1);
    }
  }, styles: ['@charset "UTF-8";\n\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 4.15rem;\n  min-height: 0;\n}\n.composer-expanded[_nghost-%COMP%] {\n  height: 100%;\n}\n.composer-dock[_ngcontent-%COMP%] {\n  display: grid;\n  height: 100%;\n  min-height: 0;\n  grid-template-rows: auto minmax(0, 1fr);\n  border-top: 2px solid #d1a957;\n  color: #eee0bd;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(29, 18, 13, 0.9294117647),\n      rgba(13, 8, 6, 0.968627451));\n  box-shadow: 0 -1rem 2.4rem rgba(0, 0, 0, 0.6);\n}\n.composer-content[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 0;\n  grid-template-rows: auto minmax(0, 1fr);\n}\n.composer-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.55rem 0.85rem 0.45rem;\n}\n.summary-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.builder-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  border: 1px solid #d3b364;\n  padding: 0.45rem 0.7rem;\n  color: #28170d;\n  background: linear-gradient(#f0d184, #bd8c43);\n  font-size: 0.68rem;\n  font-weight: 850;\n  cursor: pointer;\n}\n.builder-toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: inherit;\n  font-size: 0.85rem;\n  letter-spacing: 0;\n}\n.composer-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.composer-panel[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #b99e69;\n  font-size: 0.6rem;\n  font-weight: 800;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n.composer-summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.08rem 0 0;\n  color: #f3ddb0;\n  font: 700 0.9rem Georgia, serif;\n}\n.floor-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.42rem;\n  color: #c4aa79;\n  font-size: 0.67rem;\n  font-weight: 750;\n}\n.floor-status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.45rem;\n  height: 0.45rem;\n  border-radius: 50%;\n  background: #9c5a48;\n}\n.floor-status.ready[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  background: #85a66f;\n  box-shadow: 0 0 0.6rem #86b06f;\n}\n.composer-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.2rem;\n  overflow-x: auto;\n  border-block: 1px solid rgba(184, 147, 80, 0.3019607843);\n  padding: 0.3rem 0.6rem 0;\n  background: #100a08;\n}\n.composer-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  border: 1px solid transparent;\n  border-bottom: 0;\n  padding: 0.48rem 0.65rem;\n  color: #bba77d;\n  background: transparent;\n  font-size: 0.67rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.composer-tabs[_ngcontent-%COMP%]   button[aria-selected=true][_ngcontent-%COMP%] {\n  border-color: #b89451;\n  color: #fff0c8;\n  background: #2b1b13;\n}\n.composer-tabs[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: inline-grid;\n  min-width: 1rem;\n  height: 1rem;\n  place-items: center;\n  margin-left: 0.25rem;\n  border-radius: 999px;\n  color: #25150e;\n  background: #d7b76d;\n  font-size: 0.58rem;\n}\n.composer-panel[_ngcontent-%COMP%] {\n  min-height: 0;\n  overflow: auto;\n  padding: 0.7rem 0.85rem 0.9rem;\n  scrollbar-color: #a57f47 #160d09;\n}\n.composer-panel[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border: 1px solid rgba(201, 161, 90, 0.2784313725);\n  padding: 0.65rem;\n  background: rgba(43, 26, 18, 0.8901960784);\n}\n.composer-panel[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%], \n.composer-panel[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.18rem;\n  color: #f1ddb0;\n  font: 700 0.78rem/1.35 Georgia, serif;\n}\n.composer-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\n.composer-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.composer-panel[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  border: 1px solid #ae894d;\n  padding: 0.4rem 0.55rem;\n  color: #f0dfb7;\n  background: #2b1a12;\n  font-size: 0.66rem;\n  font-weight: 750;\n  cursor: pointer;\n}\n.composer-panel[_ngcontent-%COMP%]   button.primary[_ngcontent-%COMP%] {\n  color: #2b190e;\n  background: linear-gradient(#f1d387, #bd8c42);\n}\n.composer-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n.plan-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.1fr 1fr 1fr;\n  gap: 0.55rem;\n}\n.plan-grid[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  padding-left: 1rem;\n  font-size: 0.66rem;\n  line-height: 1.4;\n}\n.plan-grid[_ngcontent-%COMP%]   .neutral-card[_ngcontent-%COMP%] {\n  border-color: #729a99;\n  background: rgba(29, 52, 53, 0.8588235294);\n}\n.opponent-review[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.opponent-review[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font: 700 0.82rem Georgia, serif;\n}\n.passage-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));\n  gap: 0.45rem;\n  margin-top: 0.55rem;\n}\n.passage-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 0.4rem;\n  align-items: end;\n}\n.passage-list[_ngcontent-%COMP%]   article.marked[_ngcontent-%COMP%] {\n  border-color: #d2b260;\n}\n.passage-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.passage-list[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n.evidence-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #bca77e;\n  font-size: 0.6rem;\n}\n.passage-list[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.evidence-grid[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 10rem;\n  margin-top: 0.22rem;\n}\n.review-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.45rem;\n  margin-top: 0.5rem;\n}\n.evidence-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 0.5rem;\n}\n.evidence-grid[_ngcontent-%COMP%]   article.selected[_ngcontent-%COMP%] {\n  border-color: #d6b768;\n  box-shadow: inset 0 0 1.2rem rgba(209, 163, 78, 0.1333333333);\n}\n.evidence-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  overflow: hidden;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  margin: 0.4rem 0;\n  color: #d5c29a;\n}\n.evidence-grid[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.writing-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.5fr 1fr;\n  gap: 0.6rem;\n  min-width: 0;\n  margin: 0;\n  border: 0;\n  padding: 0;\n}\n.writing-grid[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n}\n.writing-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n.moderator-editor[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #e7cf9d;\n  font-size: 0.68rem;\n  font-weight: 750;\n}\n.writing-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  float: right;\n  color: #a99265;\n  font-weight: 500;\n}\n.writing-grid[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \n.moderator-editor[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-height: 6rem;\n  resize: vertical;\n  border: 1px solid #aa8246;\n  margin-top: 0.3rem;\n  padding: 0.6rem;\n  color: #25150d;\n  background: #f4e4ba;\n  font: 0.76rem/1.5 Georgia, serif;\n  box-sizing: border-box;\n}\n.feedback-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.25fr 1fr;\n  gap: 0.6rem;\n}\n.readiness-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.3rem 1rem;\n  margin: 0.45rem 0 0;\n  padding: 0;\n  list-style: none;\n  font-size: 0.68rem;\n}\n.readiness-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  margin-right: 0.35rem;\n  color: #a76654;\n  content: "\\25cb";\n}\n.readiness-card[_ngcontent-%COMP%]   li.done[_ngcontent-%COMP%]::before {\n  color: #a8c486;\n  content: "\\2713";\n}\n.teacher-feedback[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #d7c29a;\n}\n.file-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 0.8fr 1.2fr 1.2fr;\n  gap: 0.55rem;\n}\n.file-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n  align-content: start;\n}\n.file-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.3rem;\n}\n.file-action[_ngcontent-%COMP%] {\n  border-color: #cfa951 !important;\n}\n.file-action[_ngcontent-%COMP%]   progress[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.empty-panel[_ngcontent-%COMP%] {\n  margin: 1.1rem;\n  color: #cdb991;\n  text-align: center;\n}\n.gate-note[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  border-left: 0.2rem solid #b77754;\n  padding: 0.4rem 0.6rem;\n  color: #dac69e;\n  background: #371d16;\n}\n.moderator-editor[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 0.7rem;\n  align-items: end;\n}\n.moderator-editor[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n}\n@media (max-width: 900px) {\n  .composer-expanded[_nghost-%COMP%] {\n    height: 70%;\n  }\n  .plan-grid[_ngcontent-%COMP%], \n   .writing-grid[_ngcontent-%COMP%], \n   .feedback-grid[_ngcontent-%COMP%], \n   .file-grid[_ngcontent-%COMP%], \n   .moderator-editor[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=debate-composer-dock.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DebateComposerDockComponent, [{
    type: Component,
    args: [{ selector: "app-debate-composer-dock", host: {
      "[class.composer-expanded]": "expanded()"
    }, template: `<section class="composer-dock" aria-labelledby="composer-title">
  <header class="composer-summary">
    <div>
      <span>Build the next argument</span>
      <h2 id="composer-title">
        {{ runtime.currentRound().label }} \xB7 {{ runtime.roleLabel(runtime.currentTurn()) }}
      </h2>
    </div>
    <div class="summary-actions">
      <div class="floor-status" [class.ready]="runtime.chamberStage() === 'your-turn'">
        <i aria-hidden="true"></i>{{ runtime.chamberHeadline() }}
      </div>
      <button
        class="builder-toggle"
        type="button"
        [attr.aria-expanded]="expanded()"
        aria-controls="response-builder-content"
        (click)="toggleExpanded()"
      >
        {{ expanded() ? 'Close builder' : 'Open response builder' }}
        <span aria-hidden="true">{{ expanded() ? '\u2304' : '\u2303' }}</span>
      </button>
    </div>
  </header>

  @if (expanded()) {
    <div id="response-builder-content" class="composer-content">
      <div class="composer-tabs" role="tablist" aria-label="Response builder">
        @for (tab of tabs; track tab.id) {
          <button
            type="button"
            role="tab"
            [id]="'composer-tab-' + tab.id"
            [attr.aria-selected]="activeTab() === tab.id"
            [attr.aria-controls]="'composer-panel-' + tab.id"
            (click)="setTab(tab.id)"
          >
            {{ tab.label }}
            @if (tab.id === 'evidence') {
              <b>{{ runtime.state().selectedEvidenceIds.length }}</b>
            }
          </button>
        }
        @if (runtime.canManageModerator() && runtime.pendingModeratorPrompt()) {
          <button
            type="button"
            role="tab"
            id="composer-tab-moderator"
            [attr.aria-selected]="activeTab() === 'moderator'"
            aria-controls="composer-panel-moderator"
            (click)="setTab('moderator')"
          >
            Moderator <b>1</b>
          </button>
        }
      </div>

      <div
        class="composer-panel"
        role="tabpanel"
        [id]="'composer-panel-' + activeTab()"
        [attr.aria-labelledby]="'composer-tab-' + activeTab()"
      >
        @switch (activeTab()) {
          @case ('plan') {
            <div class="plan-grid">
              <article>
                <small>Question before the class</small>
                <strong>{{ runtime.config.centralQuestion }}</strong>
              </article>
              @if (runtime.currentModeratorPrompt(); as prompt) {
                <article class="neutral-card">
                  <small>Moderator asks</small>
                  <strong>{{ prompt.question }}</strong>
                  @if (!moderatorReady()) {
                    <button type="button" (click)="runtime.markModeratorHeard()">
                      Accept question
                    </button>
                  }
                </article>
              }
              <article>
                <small>Your response must</small>
                <ul>
                  @for (prompt of runtime.currentRound().preparationPrompts; track prompt) {
                    <li>{{ prompt }}</li>
                  }
                </ul>
              </article>
            </div>
          }
          @case ('opponent') {
            @if (runtime.previousOpponentTurn(); as opponent) {
              <div class="opponent-review">
                <header>
                  <div>
                    <small>Latest opposing argument</small
                    ><strong>{{ opponent.speakerDisplayName }}</strong>
                  </div>
                  <button type="button" (click)="runtime.speak(opponent.transcript ?? '')">
                    Hear aloud
                  </button>
                </header>
                <div class="passage-list">
                  @for (passage of runtime.opponentPassages(); track passage) {
                    <article [class.marked]="runtime.annotationFor(passage)">
                      <p>{{ passage }}</p>
                      <label
                        >Mark this claim
                        <select
                          [value]="runtime.annotationFor(passage)?.marker ?? ''"
                          (change)="markPassage(passage, $event)"
                        >
                          <option value="" disabled>Choose a note</option>
                          @for (mark of argumentMarks; track mark.value) {
                            <option [value]="mark.value">{{ mark.label }}</option>
                          }
                        </select>
                      </label>
                    </article>
                  }
                </div>
                <div class="review-actions">
                  <button type="button" (click)="runtime.markOpponentPlaybackComplete()">
                    I heard the full argument
                  </button>
                  <button class="primary" type="button" (click)="runtime.markOpponentHeard()">
                    Carry it into my response
                  </button>
                </div>
              </div>
            } @else {
              <p class="empty-panel">No opposing argument is required before this turn.</p>
            }
          }
          @case ('evidence') {
            <div class="evidence-grid">
              @for (item of runtime.config.evidence; track item.id) {
                <article [class.selected]="runtime.state().selectedEvidenceIds.includes(item.id)">
                  <header>
                    <small>{{ item.dateLabel }} \xB7 {{ item.sourceType }}</small
                    ><strong>{{ item.title }}</strong>
                  </header>
                  <p>{{ item.excerpt }}</p>
                  <footer>
                    <label
                      >Use as
                      <select
                        [value]="runtime.state().evidenceMarks[item.id] ?? ''"
                        (change)="markEvidence(item, $event)"
                      >
                        <option value="" disabled>Classify</option>
                        @for (mark of evidenceMarks; track mark.value) {
                          <option [value]="mark.value">{{ mark.label }}</option>
                        }
                      </select>
                    </label>
                    <button
                      type="button"
                      [attr.aria-pressed]="runtime.state().selectedEvidenceIds.includes(item.id)"
                      (click)="runtime.toggleEvidence(item)"
                    >
                      {{
                        runtime.state().selectedEvidenceIds.includes(item.id)
                          ? 'Pinned'
                          : 'Pin evidence'
                      }}
                    </button>
                  </footer>
                </article>
              }
            </div>
          }
          @case ('write') {
            @if (runtime.chamberStage() !== 'your-turn') {
              <p class="gate-note">
                Complete the highlighted listening step to unlock editing. Your saved draft remains
                visible.
              </p>
            }
            <fieldset class="writing-grid" [disabled]="runtime.chamberStage() !== 'your-turn'">
              <label class="draft-field"
                >Speech draft <span>{{ draftWords() }} words \xB7 {{ runtime.saveState() }}</span>
                <textarea
                  [value]="runtime.state().draft"
                  (input)="updateDraft($event)"
                  placeholder="Write the next response here\u2026"
                ></textarea>
              </label>
              <label
                >Explain your reasoning
                <textarea
                  [value]="runtime.state().reasoningContribution"
                  (input)="updateReasoning($event)"
                  placeholder="Why does your evidence support the claim, and how does it answer the other side?"
                ></textarea>
              </label>
            </fieldset>
          }
          @case ('feedback') {
            <div class="feedback-grid">
              <article class="readiness-card">
                <small>Response readiness</small>
                <ul>
                  <li [class.done]="listeningReady()">Heard the opposing argument</li>
                  <li
                    [class.done]="
                      runtime.state().annotations.length > 0 || !runtime.previousOpponentTurn()
                    "
                  >
                    Marked a claim to answer
                  </li>
                  <li [class.done]="moderatorReady()">Received the moderator question</li>
                  <li [class.done]="evidenceReady()">Pinned required evidence</li>
                  <li [class.done]="reasoningReady()">Explained the reasoning</li>
                  <li [class.done]="runtime.state().rehearsed">Completed a rehearsal</li>
                  <li [class.done]="runtime.state().recordingReady">
                    Reviewed a recording or transcript
                  </li>
                </ul>
              </article>
              <article class="teacher-feedback">
                <small>Teacher feedback</small>
                <p>
                  {{
                    runtime.currentTurn()?.teacherFeedback ||
                      'No teacher note yet. Use the readiness checks to strengthen this response before filing.'
                  }}
                </p>
              </article>
            </div>
          }
          @case ('file') {
            <div class="file-grid">
              <article>
                <small>1 \xB7 Rehearse</small>
                <strong
                  >{{ runtime.formatTime(runtime.state().rehearsalSeconds) }} /
                  {{ runtime.formatTime(runtime.currentRound().timeLimitSeconds) }}</strong
                >
                @if (runtime.rehearsalRunning()) {
                  <button type="button" (click)="runtime.stopRehearsal()">Stop rehearsal</button>
                } @else {
                  <button type="button" (click)="runtime.startRehearsal()">Start rehearsal</button>
                }
              </article>
              <article>
                <small>2 \xB7 Record</small>
                <strong>{{
                  runtime.recordingState() === 'recording'
                    ? 'Recording now'
                    : (runtime.state().recordingKind ?? 'Choose a format')
                }}</strong>
                <div>
                  @if (runtime.recordingState() === 'recording') {
                    <button type="button" (click)="runtime.stopRecording()">Stop</button>
                  } @else {
                    <button type="button" (click)="runtime.startRecording(true)">Video</button>
                    <button type="button" (click)="runtime.startRecording(false)">Audio</button>
                    <button type="button" (click)="runtime.useTranscriptFallback()">
                      Transcript
                    </button>
                  }
                  @if (runtime.state().recordingReady) {
                    <button type="button" (click)="runtime.retakeRecording()">Retake</button>
                  }
                </div>
              </article>
              <article class="file-action">
                <small>3 \xB7 File to the debate</small>
                <strong>{{
                  runtime.canFile() ? 'Ready to enter the record' : 'Finish the remaining checks'
                }}</strong>
                @if (runtime.recordingState() === 'uploading') {
                  <progress max="100" [value]="runtime.uploadProgress()">
                    {{ runtime.uploadProgress() }}%
                  </progress>
                }
                <button
                  class="primary"
                  type="button"
                  [disabled]="!runtime.canFile() || runtime.recordingState() === 'uploading'"
                  (click)="runtime.fileSpeech()"
                >
                  File this argument
                </button>
              </article>
            </div>
          }
          @case ('moderator') {
            @if (runtime.pendingModeratorPrompt(); as prompt) {
              <div class="moderator-editor">
                <label
                  >Question for the next speaker
                  <textarea
                    [value]="runtime.moderatorDraft()"
                    (input)="updateModerator($event)"
                  ></textarea>
                </label>
                <div>
                  <button type="button" (click)="runtime.saveModeratorEdit(prompt)">
                    Save edit
                  </button>
                  <button type="button" (click)="runtime.regeneratePrompt(prompt)">
                    Regenerate
                  </button>
                  @if (prompt.status === 'proposed') {
                    <button type="button" (click)="runtime.approvePrompt(prompt)">Approve</button>
                  }
                  <button class="primary" type="button" (click)="runtime.releasePrompt(prompt)">
                    Release to debate
                  </button>
                </div>
              </div>
            }
          }
        }
      </div>
    </div>
  }
</section>
`, styles: ['@charset "UTF-8";\n\n/* src/app/templates/debate-studio/ui/debate-composer-dock.component.scss */\n:host {\n  display: block;\n  height: 4.15rem;\n  min-height: 0;\n}\n:host.composer-expanded {\n  height: 100%;\n}\n.composer-dock {\n  display: grid;\n  height: 100%;\n  min-height: 0;\n  grid-template-rows: auto minmax(0, 1fr);\n  border-top: 2px solid #d1a957;\n  color: #eee0bd;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(29, 18, 13, 0.9294117647),\n      rgba(13, 8, 6, 0.968627451));\n  box-shadow: 0 -1rem 2.4rem rgba(0, 0, 0, 0.6);\n}\n.composer-content {\n  display: grid;\n  min-height: 0;\n  grid-template-rows: auto minmax(0, 1fr);\n}\n.composer-summary {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.55rem 0.85rem 0.45rem;\n}\n.summary-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.builder-toggle {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  border: 1px solid #d3b364;\n  padding: 0.45rem 0.7rem;\n  color: #28170d;\n  background: linear-gradient(#f0d184, #bd8c43);\n  font-size: 0.68rem;\n  font-weight: 850;\n  cursor: pointer;\n}\n.builder-toggle span {\n  color: inherit;\n  font-size: 0.85rem;\n  letter-spacing: 0;\n}\n.composer-summary span,\n.composer-panel small {\n  color: #b99e69;\n  font-size: 0.6rem;\n  font-weight: 800;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n.composer-summary h2 {\n  margin: 0.08rem 0 0;\n  color: #f3ddb0;\n  font: 700 0.9rem Georgia, serif;\n}\n.floor-status {\n  display: flex;\n  align-items: center;\n  gap: 0.42rem;\n  color: #c4aa79;\n  font-size: 0.67rem;\n  font-weight: 750;\n}\n.floor-status i {\n  width: 0.45rem;\n  height: 0.45rem;\n  border-radius: 50%;\n  background: #9c5a48;\n}\n.floor-status.ready i {\n  background: #85a66f;\n  box-shadow: 0 0 0.6rem #86b06f;\n}\n.composer-tabs {\n  display: flex;\n  gap: 0.2rem;\n  overflow-x: auto;\n  border-block: 1px solid rgba(184, 147, 80, 0.3019607843);\n  padding: 0.3rem 0.6rem 0;\n  background: #100a08;\n}\n.composer-tabs button {\n  flex: 0 0 auto;\n  border: 1px solid transparent;\n  border-bottom: 0;\n  padding: 0.48rem 0.65rem;\n  color: #bba77d;\n  background: transparent;\n  font-size: 0.67rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.composer-tabs button[aria-selected=true] {\n  border-color: #b89451;\n  color: #fff0c8;\n  background: #2b1b13;\n}\n.composer-tabs b {\n  display: inline-grid;\n  min-width: 1rem;\n  height: 1rem;\n  place-items: center;\n  margin-left: 0.25rem;\n  border-radius: 999px;\n  color: #25150e;\n  background: #d7b76d;\n  font-size: 0.58rem;\n}\n.composer-panel {\n  min-height: 0;\n  overflow: auto;\n  padding: 0.7rem 0.85rem 0.9rem;\n  scrollbar-color: #a57f47 #160d09;\n}\n.composer-panel article {\n  border: 1px solid rgba(201, 161, 90, 0.2784313725);\n  padding: 0.65rem;\n  background: rgba(43, 26, 18, 0.8901960784);\n}\n.composer-panel article > strong,\n.composer-panel article header strong {\n  display: block;\n  margin-top: 0.18rem;\n  color: #f1ddb0;\n  font: 700 0.78rem/1.35 Georgia, serif;\n}\n.composer-panel p {\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\n.composer-panel button,\n.composer-panel select {\n  border: 1px solid #ae894d;\n  padding: 0.4rem 0.55rem;\n  color: #f0dfb7;\n  background: #2b1a12;\n  font-size: 0.66rem;\n  font-weight: 750;\n  cursor: pointer;\n}\n.composer-panel button.primary {\n  color: #2b190e;\n  background: linear-gradient(#f1d387, #bd8c42);\n}\n.composer-panel button:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n.plan-grid {\n  display: grid;\n  grid-template-columns: 1.1fr 1fr 1fr;\n  gap: 0.55rem;\n}\n.plan-grid ul {\n  margin: 0.35rem 0 0;\n  padding-left: 1rem;\n  font-size: 0.66rem;\n  line-height: 1.4;\n}\n.plan-grid .neutral-card {\n  border-color: #729a99;\n  background: rgba(29, 52, 53, 0.8588235294);\n}\n.opponent-review > header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.opponent-review > header strong {\n  display: block;\n  font: 700 0.82rem Georgia, serif;\n}\n.passage-list {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));\n  gap: 0.45rem;\n  margin-top: 0.55rem;\n}\n.passage-list article {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 0.4rem;\n  align-items: end;\n}\n.passage-list article.marked {\n  border-color: #d2b260;\n}\n.passage-list p {\n  margin: 0;\n}\n.passage-list label,\n.evidence-grid label {\n  color: #bca77e;\n  font-size: 0.6rem;\n}\n.passage-list select,\n.evidence-grid select {\n  display: block;\n  max-width: 10rem;\n  margin-top: 0.22rem;\n}\n.review-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.45rem;\n  margin-top: 0.5rem;\n}\n.evidence-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 0.5rem;\n}\n.evidence-grid article.selected {\n  border-color: #d6b768;\n  box-shadow: inset 0 0 1.2rem rgba(209, 163, 78, 0.1333333333);\n}\n.evidence-grid article > p {\n  display: -webkit-box;\n  overflow: hidden;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  margin: 0.4rem 0;\n  color: #d5c29a;\n}\n.evidence-grid footer {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.writing-grid {\n  display: grid;\n  grid-template-columns: 1.5fr 1fr;\n  gap: 0.6rem;\n  min-width: 0;\n  margin: 0;\n  border: 0;\n  padding: 0;\n}\n.writing-grid:disabled {\n  opacity: 0.65;\n}\n.writing-grid label,\n.moderator-editor label {\n  color: #e7cf9d;\n  font-size: 0.68rem;\n  font-weight: 750;\n}\n.writing-grid label > span {\n  float: right;\n  color: #a99265;\n  font-weight: 500;\n}\n.writing-grid textarea,\n.moderator-editor textarea {\n  display: block;\n  width: 100%;\n  min-height: 6rem;\n  resize: vertical;\n  border: 1px solid #aa8246;\n  margin-top: 0.3rem;\n  padding: 0.6rem;\n  color: #25150d;\n  background: #f4e4ba;\n  font: 0.76rem/1.5 Georgia, serif;\n  box-sizing: border-box;\n}\n.feedback-grid {\n  display: grid;\n  grid-template-columns: 1.25fr 1fr;\n  gap: 0.6rem;\n}\n.readiness-card ul {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.3rem 1rem;\n  margin: 0.45rem 0 0;\n  padding: 0;\n  list-style: none;\n  font-size: 0.68rem;\n}\n.readiness-card li::before {\n  margin-right: 0.35rem;\n  color: #a76654;\n  content: "\\25cb";\n}\n.readiness-card li.done::before {\n  color: #a8c486;\n  content: "\\2713";\n}\n.teacher-feedback p {\n  color: #d7c29a;\n}\n.file-grid {\n  display: grid;\n  grid-template-columns: 0.8fr 1.2fr 1.2fr;\n  gap: 0.55rem;\n}\n.file-grid article {\n  display: grid;\n  gap: 0.45rem;\n  align-content: start;\n}\n.file-grid article div {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.3rem;\n}\n.file-action {\n  border-color: #cfa951 !important;\n}\n.file-action progress {\n  width: 100%;\n}\n.empty-panel {\n  margin: 1.1rem;\n  color: #cdb991;\n  text-align: center;\n}\n.gate-note {\n  margin: 0 0 0.5rem;\n  border-left: 0.2rem solid #b77754;\n  padding: 0.4rem 0.6rem;\n  color: #dac69e;\n  background: #371d16;\n}\n.moderator-editor {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 0.7rem;\n  align-items: end;\n}\n.moderator-editor div {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n}\n@media (max-width: 900px) {\n  :host.composer-expanded {\n    height: 70%;\n  }\n  .plan-grid,\n  .writing-grid,\n  .feedback-grid,\n  .file-grid,\n  .moderator-editor {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=debate-composer-dock.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DebateComposerDockComponent, { className: "DebateComposerDockComponent", filePath: "src/app/templates/debate-studio/ui/debate-composer-dock.component.ts", lineNumber: 16 });
})();

// src/app/templates/debate-studio/ui/debate-thread.component.ts
var _c02 = ["threadScroller"];
var _forTrack04 = ($index, $item) => $item.id;
function DebateThreadComponent_For_13_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li", 10);
    \u0275\u0275domElement(1, "span");
    \u0275\u0275domElementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(4, "span");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const segment_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("aria-label", \u0275\u0275interpolate1("Start of ", segment_r1.roundLabel));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(segment_r1.roundLabel);
  }
}
function DebateThreadComponent_For_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li", 8)(1, "span", 11);
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
    const segment_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("id", "debate-prompt-" + segment_r1.promptId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.moderator.initials);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(segment_r1.transcript);
  }
}
function DebateThreadComponent_For_13_Conditional_2_Conditional_14_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const evidenceId_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.evidenceTitle(evidenceId_r4));
  }
}
function DebateThreadComponent_For_13_Conditional_2_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 15)(1, "strong");
    \u0275\u0275text(2, "Evidence cited:");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(3, DebateThreadComponent_For_13_Conditional_2_Conditional_14_Conditional_1_For_4_Template, 2, 1, "span", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const segment_r1 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275repeater(segment_r1.evidenceIds);
  }
}
function DebateThreadComponent_For_13_Conditional_2_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 16)(1, "strong");
    \u0275\u0275text(2, "Teacher feedback:");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx);
  }
}
function DebateThreadComponent_For_13_Conditional_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 14);
    \u0275\u0275conditionalCreate(1, DebateThreadComponent_For_13_Conditional_2_Conditional_14_Conditional_1_Template, 5, 0, "p", 15);
    \u0275\u0275conditionalCreate(2, DebateThreadComponent_For_13_Conditional_2_Conditional_14_Conditional_2_Template, 4, 1, "p", 16);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_15_0;
    const segment_r1 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("id", "speech-detail-" + segment_r1.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(segment_r1.evidenceIds.length ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_15_0 = ctx_r1.turn(segment_r1)?.teacherFeedback) ? 2 : -1, tmp_15_0);
  }
}
function DebateThreadComponent_For_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "li", 12)(1, "article", 13)(2, "header")(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div")(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "time");
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(14, DebateThreadComponent_For_13_Conditional_2_Conditional_14_Template, 3, 3, "div", 14);
    \u0275\u0275domElementStart(15, "button", 4);
    \u0275\u0275domListener("click", function DebateThreadComponent_For_13_Conditional_2_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r3);
      const segment_r1 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSegment(segment_r1));
    });
    \u0275\u0275text(16);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const segment_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("left-speech", ctx_r1.isLeft(segment_r1))("right-speech", !ctx_r1.isLeft(segment_r1));
    \u0275\u0275advance();
    \u0275\u0275styleProp("--%NS%faction-accent", ctx_r1.faction(segment_r1)?.accent);
    \u0275\u0275classProp("expanded", ctx_r1.isExpanded(segment_r1));
    \u0275\u0275domProperty("id", "debate-turn-" + segment_r1.turnId);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.faction(segment_r1)?.emblem);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.faction(segment_r1)?.railLabel ?? ctx_r1.faction(segment_r1)?.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r1.speakerDisplayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.formatTime(segment_r1.durationSeconds));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(segment_r1.transcript);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isExpanded(segment_r1) ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r1.isExpanded(segment_r1))("aria-controls", "speech-detail-" + segment_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isExpanded(segment_r1) ? "Show less" : "Review argument", " ");
  }
}
function DebateThreadComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DebateThreadComponent_For_13_Conditional_0_Template, 5, 3, "li", 7)(1, DebateThreadComponent_For_13_Conditional_1_Template, 8, 3, "li", 8)(2, DebateThreadComponent_For_13_Conditional_2_Template, 17, 18, "li", 9);
  }
  if (rf & 2) {
    const segment_r1 = ctx.$implicit;
    \u0275\u0275conditional(segment_r1.kind === "round-title" ? 0 : segment_r1.kind === "moderator" ? 1 : segment_r1.kind === "student" ? 2 : -1);
  }
}
function DebateThreadComponent_Conditional_14_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li", 18)(1, "article", 19)(2, "header")(3, "span", 20);
    \u0275\u0275text(4, "\u270E");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div")(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "b");
    \u0275\u0275text(11, "LIVE");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const turn_r5 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("left-speech", turn_r5.factionId === ctx_r1.runtime.config.factions[0].id)("right-speech", turn_r5.factionId === ctx_r1.runtime.config.factions[1].id);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.runtime.viewerFaction()?.railLabel ?? ctx_r1.runtime.viewerFaction()?.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.runtime.config.viewer.studentDisplayName, " \xB7 composing now");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.state().draft || "Your next response will appear here while you build it in the panel below.", " ");
  }
}
function DebateThreadComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DebateThreadComponent_Conditional_14_Conditional_0_Template, 14, 7, "li", 17);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.status !== "filed" ? 0 : -1);
  }
}
var DebateThreadComponent = class _DebateThreadComponent {
  runtime = inject(DebateStudioRuntimeService);
  selectedSegmentId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "selectedSegmentId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  threadScroller;
  ngAfterViewInit() {
    queueMicrotask(() => this.scrollToLatest(false));
  }
  faction(segment) {
    return this.runtime.config.factions.find((faction) => faction.id === segment.factionId);
  }
  turn(segment) {
    return this.runtime.session().turns.find((turn) => turn.id === segment.turnId);
  }
  evidenceTitle(evidenceId) {
    return this.runtime.config.evidence.find((item) => item.id === evidenceId)?.title ?? evidenceId;
  }
  isLeft(segment) {
    return segment.factionId === this.runtime.config.factions[0].id;
  }
  isExpanded(segment) {
    return this.selectedSegmentId() === segment.id;
  }
  toggleSegment(segment) {
    this.selectedSegmentId.update((id) => id === segment.id ? void 0 : segment.id);
  }
  focusTurn(turnId) {
    const segment = this.runtime.program().find((item) => item.turnId === turnId);
    if (segment === void 0)
      return;
    this.selectedSegmentId.set(segment.id);
    queueMicrotask(() => this.scrollToElement(`debate-turn-${turnId}`));
  }
  scrollToLatest(smooth = true) {
    const scroller = this.threadScroller?.nativeElement;
    if (scroller === void 0)
      return;
    if (typeof scroller.scrollTo !== "function") {
      scroller.scrollTop = scroller.scrollHeight;
      return;
    }
    scroller.scrollTo({
      top: scroller.scrollHeight,
      behavior: smooth && !this.prefersReducedMotion() ? "smooth" : "auto"
    });
  }
  scrollToElement(id) {
    const target = this.threadScroller?.nativeElement.querySelector(`#${id}`);
    if (target === void 0 || target === null)
      return;
    if (typeof target.scrollIntoView === "function") {
      target.scrollIntoView({
        block: "center",
        behavior: this.prefersReducedMotion() ? "auto" : "smooth"
      });
    }
    if (typeof target.focus === "function")
      target.focus({ preventScroll: true });
  }
  prefersReducedMotion() {
    return typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  static \u0275fac = function DebateThreadComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DebateThreadComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DebateThreadComponent, selectors: [["app-debate-thread"]], viewQuery: function DebateThreadComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.threadScroller = _t.first);
    }
  }, decls: 15, vars: 2, consts: [["threadScroller", ""], ["aria-labelledby", "thread-title", 1, "debate-thread"], [1, "thread-heading"], ["id", "thread-title"], ["type", "button", 3, "click"], ["tabindex", "0", "aria-label", "Debate transcript thread", 1, "thread-scroll"], [1, "thread-list"], [1, "round-break", 3, "aria-label"], ["tabindex", "-1", 1, "moderator-break", 3, "id"], [1, "speech-row", 3, "left-speech", "right-speech"], [1, "round-break"], ["aria-hidden", "true", 1, "moderator-seal"], [1, "speech-row"], ["tabindex", "-1", 1, "speech-bubble", 3, "id"], [1, "speech-detail", 3, "id"], [1, "evidence-used"], [1, "teacher-note"], [1, "speech-row", "draft-row", 3, "left-speech", "right-speech"], [1, "speech-row", "draft-row"], [1, "speech-bubble", "draft-bubble"], ["aria-hidden", "true"]], template: function DebateThreadComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 1)(1, "header", 2)(2, "div")(3, "span");
      \u0275\u0275text(4, "Live argument thread");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "h2", 3);
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(7, "button", 4);
      \u0275\u0275domListener("click", function DebateThreadComponent_Template_button_click_7_listener() {
        return ctx.scrollToLatest();
      });
      \u0275\u0275text(8, "Jump to latest");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(9, "div", 5, 0)(11, "ol", 6);
      \u0275\u0275repeaterCreate(12, DebateThreadComponent_For_13_Template, 3, 1, null, null, _forTrack04);
      \u0275\u0275conditionalCreate(14, DebateThreadComponent_Conditional_14_Template, 1, 1);
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.runtime.currentRound().label);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.runtime.program());
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_3_0 = ctx.runtime.currentTurn()) ? 14 : -1, tmp_3_0);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 0;\n}\n.debate-thread[_ngcontent-%COMP%] {\n  display: grid;\n  height: 100%;\n  min-height: 0;\n  grid-template-rows: auto minmax(0, 1fr);\n  border-inline: 1px solid rgba(200, 163, 92, 0.3019607843);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(17, 11, 8, 0.7098039216),\n      rgba(33, 19, 13, 0.6705882353) 60%,\n      rgba(12, 7, 6, 0.9098039216));\n  box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.4);\n}\n.thread-heading[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid rgba(208, 170, 98, 0.3411764706);\n  padding: 0.55rem 1rem;\n  background: rgba(19, 12, 9, 0.9098039216);\n}\n.thread-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.moderator-break[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #bfa772;\n  font-size: 0.62rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.thread-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.08rem 0 0;\n  font: 700 1rem Georgia, serif;\n}\n.thread-heading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.speech-bubble[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #c8a65f;\n  padding: 0.4rem 0.65rem;\n  color: #f4dfae;\n  background: #281810;\n  font-size: 0.68rem;\n  font-weight: 750;\n  cursor: pointer;\n}\n.thread-scroll[_ngcontent-%COMP%] {\n  min-height: 0;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  scrollbar-color: #a57f47 #160d09;\n}\n.thread-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.85rem;\n  max-width: 64rem;\n  margin: 0 auto;\n  padding: 1.5rem clamp(1rem, 4vw, 4rem) 2.5rem;\n  list-style: none;\n}\n.round-break[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  gap: 0.7rem;\n  color: #d8bd82;\n  font-size: 0.65rem;\n  letter-spacing: 0.13em;\n  text-align: center;\n  text-transform: uppercase;\n}\n.round-break[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      #bf9b56);\n}\n.round-break[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  background:\n    linear-gradient(\n      90deg,\n      #bf9b56,\n      transparent);\n}\n.moderator-break[_ngcontent-%COMP%] {\n  display: grid;\n  width: min(84%, 42rem);\n  grid-template-columns: auto 1fr;\n  gap: 0.75rem;\n  justify-self: center;\n  align-items: center;\n  border: 1px solid #87a9ab;\n  border-radius: 0.55rem;\n  padding: 0.7rem 0.9rem;\n  color: #e8f4ef;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(37, 56, 58, 0.8509803922),\n      rgba(22, 40, 43, 0.8));\n  box-shadow: 0 0.6rem 1.5rem rgba(0, 0, 0, 0.5333333333);\n}\n.moderator-seal[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.3rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #b5d1cc;\n  border-radius: 50%;\n  color: #d9eeea;\n  font: 700 0.72rem Georgia, serif;\n}\n.moderator-break[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.2rem;\n  font: 700 0.88rem/1.35 Georgia, serif;\n}\n.moderator-break[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #a8cfca;\n}\n.speech-row[_ngcontent-%COMP%] {\n  display: flex;\n}\n.left-speech[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n  padding-right: 15%;\n}\n.right-speech[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n  padding-left: 15%;\n}\n.speech-bubble[_ngcontent-%COMP%] {\n  position: relative;\n  width: min(100%, 36rem);\n  border: 1px solid color-mix(in srgb, var(--%NS%faction-accent, #bd9654) 75%, #f4dfaa);\n  border-radius: 0.85rem;\n  padding: 0.85rem 0.95rem;\n  color: #2d1b11;\n  background:\n    linear-gradient(\n      145deg,\n      #f4e3b9,\n      #d3b176);\n  box-shadow: 0 0.7rem 1.5rem rgba(0, 0, 0, 0.5333333333);\n}\n.left-speech[_ngcontent-%COMP%]   .speech-bubble[_ngcontent-%COMP%] {\n  border-bottom-left-radius: 0.12rem;\n}\n.right-speech[_ngcontent-%COMP%]   .speech-bubble[_ngcontent-%COMP%] {\n  border-bottom-right-radius: 0.12rem;\n}\n.speech-bubble.expanded[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--%NS%faction-accent, #d9b66f) 44%, transparent), 0 1rem 2rem rgba(0, 0, 0, 0.6666666667);\n}\n.speech-bubble[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  gap: 0.55rem;\n  align-items: center;\n}\n.speech-bubble[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #f4dfad;\n  background: #392116;\n  font: 700 0.78rem Georgia, serif;\n}\n.speech-bubble[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.speech-bubble[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n}\n.speech-bubble[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #765033;\n  font-size: 0.59rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.speech-bubble[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 0.85rem Georgia, serif;\n}\n.speech-bubble[_ngcontent-%COMP%]   time[_ngcontent-%COMP%], \n.speech-bubble[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: #6f482d;\n  font-size: 0.62rem;\n}\n.speech-bubble[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0.65rem 0;\n  font: 0.83rem/1.5 Georgia, serif;\n}\n.speech-bubble[_ngcontent-%COMP%]:not(.expanded)    > p[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  overflow: hidden;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n}\n.speech-bubble[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #3c2415;\n  background: #f2dba7;\n}\n.speech-detail[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(112, 74, 42, 0.3019607843);\n  margin: 0.6rem 0;\n  padding-top: 0.5rem;\n}\n.speech-detail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.3rem 0;\n  font-size: 0.72rem;\n  line-height: 1.45;\n}\n.evidence-used[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 0.25rem 0.25rem 0 0;\n  border: 1px solid #7f5b39;\n  border-radius: 999px;\n  padding: 0.18rem 0.42rem;\n}\n.teacher-note[_ngcontent-%COMP%] {\n  border-left: 0.2rem solid #507d70;\n  padding-left: 0.5rem;\n}\n.draft-bubble[_ngcontent-%COMP%] {\n  border-style: dashed;\n  color: #ead6a6;\n  background:\n    linear-gradient(\n      145deg,\n      rgba(45, 26, 19, 0.9098039216),\n      rgba(22, 13, 9, 0.9294117647));\n}\n.draft-bubble[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #bd9e67;\n}\n.draft-bubble[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  background: #81572d;\n}\n.draft-bubble[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: #d7c39b;\n  font-style: italic;\n}\n@media (max-width: 900px) {\n  .left-speech[_ngcontent-%COMP%], \n   .right-speech[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .thread-list[_ngcontent-%COMP%] {\n    padding-inline: 0.75rem;\n  }\n  .moderator-break[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=debate-thread.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DebateThreadComponent, [{
    type: Component,
    args: [{ selector: "app-debate-thread", template: `<section class="debate-thread" aria-labelledby="thread-title">
  <header class="thread-heading">
    <div>
      <span>Live argument thread</span>
      <h2 id="thread-title">{{ runtime.currentRound().label }}</h2>
    </div>
    <button type="button" (click)="scrollToLatest()">Jump to latest</button>
  </header>

  <div #threadScroller class="thread-scroll" tabindex="0" aria-label="Debate transcript thread">
    <ol class="thread-list">
      @for (segment of runtime.program(); track segment.id) {
        @if (segment.kind === 'round-title') {
          <li class="round-break" aria-label="Start of {{ segment.roundLabel }}">
            <span></span><strong>{{ segment.roundLabel }}</strong
            ><span></span>
          </li>
        } @else if (segment.kind === 'moderator') {
          <li class="moderator-break" [id]="'debate-prompt-' + segment.promptId" tabindex="-1">
            <span class="moderator-seal" aria-hidden="true">{{
              runtime.config.moderator.initials
            }}</span>
            <div>
              <small>Moderator question \xB7 neutral</small>
              <strong>{{ segment.transcript }}</strong>
            </div>
          </li>
        } @else if (segment.kind === 'student') {
          <li
            class="speech-row"
            [class.left-speech]="isLeft(segment)"
            [class.right-speech]="!isLeft(segment)"
          >
            <article
              class="speech-bubble"
              [class.expanded]="isExpanded(segment)"
              [style.--faction-accent]="faction(segment)?.accent"
              [id]="'debate-turn-' + segment.turnId"
              tabindex="-1"
            >
              <header>
                <span>{{ faction(segment)?.emblem }}</span>
                <div>
                  <small>{{ faction(segment)?.railLabel ?? faction(segment)?.name }}</small>
                  <strong>{{ segment.speakerDisplayName }}</strong>
                </div>
                <time>{{ runtime.formatTime(segment.durationSeconds) }}</time>
              </header>
              <p>{{ segment.transcript }}</p>
              @if (isExpanded(segment)) {
                <div class="speech-detail" [id]="'speech-detail-' + segment.id">
                  @if (segment.evidenceIds.length) {
                    <p class="evidence-used">
                      <strong>Evidence cited:</strong>
                      @for (evidenceId of segment.evidenceIds; track evidenceId) {
                        <span>{{ evidenceTitle(evidenceId) }}</span>
                      }
                    </p>
                  }
                  @if (turn(segment)?.teacherFeedback; as feedback) {
                    <p class="teacher-note"><strong>Teacher feedback:</strong> {{ feedback }}</p>
                  }
                </div>
              }
              <button
                type="button"
                [attr.aria-expanded]="isExpanded(segment)"
                [attr.aria-controls]="'speech-detail-' + segment.id"
                (click)="toggleSegment(segment)"
              >
                {{ isExpanded(segment) ? 'Show less' : 'Review argument' }}
              </button>
            </article>
          </li>
        }
      }

      @if (runtime.currentTurn(); as turn) {
        @if (turn.status !== 'filed') {
          <li
            class="speech-row draft-row"
            [class.left-speech]="turn.factionId === runtime.config.factions[0].id"
            [class.right-speech]="turn.factionId === runtime.config.factions[1].id"
          >
            <article class="speech-bubble draft-bubble">
              <header>
                <span aria-hidden="true">\u270E</span>
                <div>
                  <small>{{
                    runtime.viewerFaction()?.railLabel ?? runtime.viewerFaction()?.name
                  }}</small>
                  <strong>{{ runtime.config.viewer.studentDisplayName }} \xB7 composing now</strong>
                </div>
                <b>LIVE</b>
              </header>
              <p>
                {{
                  runtime.state().draft ||
                    'Your next response will appear here while you build it in the panel below.'
                }}
              </p>
            </article>
          </li>
        }
      }
    </ol>
  </div>
</section>
`, styles: ["/* src/app/templates/debate-studio/ui/debate-thread.component.scss */\n:host {\n  display: block;\n  min-height: 0;\n}\n.debate-thread {\n  display: grid;\n  height: 100%;\n  min-height: 0;\n  grid-template-rows: auto minmax(0, 1fr);\n  border-inline: 1px solid rgba(200, 163, 92, 0.3019607843);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(17, 11, 8, 0.7098039216),\n      rgba(33, 19, 13, 0.6705882353) 60%,\n      rgba(12, 7, 6, 0.9098039216));\n  box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.4);\n}\n.thread-heading {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid rgba(208, 170, 98, 0.3411764706);\n  padding: 0.55rem 1rem;\n  background: rgba(19, 12, 9, 0.9098039216);\n}\n.thread-heading span,\n.moderator-break small {\n  color: #bfa772;\n  font-size: 0.62rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.thread-heading h2 {\n  margin: 0.08rem 0 0;\n  font: 700 1rem Georgia, serif;\n}\n.thread-heading button,\n.speech-bubble button {\n  border: 1px solid #c8a65f;\n  padding: 0.4rem 0.65rem;\n  color: #f4dfae;\n  background: #281810;\n  font-size: 0.68rem;\n  font-weight: 750;\n  cursor: pointer;\n}\n.thread-scroll {\n  min-height: 0;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  scrollbar-color: #a57f47 #160d09;\n}\n.thread-list {\n  display: grid;\n  gap: 0.85rem;\n  max-width: 64rem;\n  margin: 0 auto;\n  padding: 1.5rem clamp(1rem, 4vw, 4rem) 2.5rem;\n  list-style: none;\n}\n.round-break {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  gap: 0.7rem;\n  color: #d8bd82;\n  font-size: 0.65rem;\n  letter-spacing: 0.13em;\n  text-align: center;\n  text-transform: uppercase;\n}\n.round-break span {\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      #bf9b56);\n}\n.round-break span:last-child {\n  background:\n    linear-gradient(\n      90deg,\n      #bf9b56,\n      transparent);\n}\n.moderator-break {\n  display: grid;\n  width: min(84%, 42rem);\n  grid-template-columns: auto 1fr;\n  gap: 0.75rem;\n  justify-self: center;\n  align-items: center;\n  border: 1px solid #87a9ab;\n  border-radius: 0.55rem;\n  padding: 0.7rem 0.9rem;\n  color: #e8f4ef;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(37, 56, 58, 0.8509803922),\n      rgba(22, 40, 43, 0.8));\n  box-shadow: 0 0.6rem 1.5rem rgba(0, 0, 0, 0.5333333333);\n}\n.moderator-seal {\n  display: grid;\n  width: 2.3rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #b5d1cc;\n  border-radius: 50%;\n  color: #d9eeea;\n  font: 700 0.72rem Georgia, serif;\n}\n.moderator-break strong {\n  display: block;\n  margin-top: 0.2rem;\n  font: 700 0.88rem/1.35 Georgia, serif;\n}\n.moderator-break small {\n  color: #a8cfca;\n}\n.speech-row {\n  display: flex;\n}\n.left-speech {\n  justify-content: flex-start;\n  padding-right: 15%;\n}\n.right-speech {\n  justify-content: flex-end;\n  padding-left: 15%;\n}\n.speech-bubble {\n  position: relative;\n  width: min(100%, 36rem);\n  border: 1px solid color-mix(in srgb, var(--faction-accent, #bd9654) 75%, #f4dfaa);\n  border-radius: 0.85rem;\n  padding: 0.85rem 0.95rem;\n  color: #2d1b11;\n  background:\n    linear-gradient(\n      145deg,\n      #f4e3b9,\n      #d3b176);\n  box-shadow: 0 0.7rem 1.5rem rgba(0, 0, 0, 0.5333333333);\n}\n.left-speech .speech-bubble {\n  border-bottom-left-radius: 0.12rem;\n}\n.right-speech .speech-bubble {\n  border-bottom-right-radius: 0.12rem;\n}\n.speech-bubble.expanded {\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--faction-accent, #d9b66f) 44%, transparent), 0 1rem 2rem rgba(0, 0, 0, 0.6666666667);\n}\n.speech-bubble header {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  gap: 0.55rem;\n  align-items: center;\n}\n.speech-bubble header > span {\n  display: grid;\n  width: 2rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #f4dfad;\n  background: #392116;\n  font: 700 0.78rem Georgia, serif;\n}\n.speech-bubble small,\n.speech-bubble strong {\n  display: block;\n}\n.speech-bubble small {\n  color: #765033;\n  font-size: 0.59rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.speech-bubble strong {\n  font: 700 0.85rem Georgia, serif;\n}\n.speech-bubble time,\n.speech-bubble header b {\n  color: #6f482d;\n  font-size: 0.62rem;\n}\n.speech-bubble > p {\n  margin: 0.65rem 0;\n  font: 0.83rem/1.5 Georgia, serif;\n}\n.speech-bubble:not(.expanded) > p {\n  display: -webkit-box;\n  overflow: hidden;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n}\n.speech-bubble button {\n  color: #3c2415;\n  background: #f2dba7;\n}\n.speech-detail {\n  border-top: 1px solid rgba(112, 74, 42, 0.3019607843);\n  margin: 0.6rem 0;\n  padding-top: 0.5rem;\n}\n.speech-detail p {\n  margin: 0.3rem 0;\n  font-size: 0.72rem;\n  line-height: 1.45;\n}\n.evidence-used span {\n  display: inline-block;\n  margin: 0.25rem 0.25rem 0 0;\n  border: 1px solid #7f5b39;\n  border-radius: 999px;\n  padding: 0.18rem 0.42rem;\n}\n.teacher-note {\n  border-left: 0.2rem solid #507d70;\n  padding-left: 0.5rem;\n}\n.draft-bubble {\n  border-style: dashed;\n  color: #ead6a6;\n  background:\n    linear-gradient(\n      145deg,\n      rgba(45, 26, 19, 0.9098039216),\n      rgba(22, 13, 9, 0.9294117647));\n}\n.draft-bubble small {\n  color: #bd9e67;\n}\n.draft-bubble header > span {\n  background: #81572d;\n}\n.draft-bubble > p {\n  color: #d7c39b;\n  font-style: italic;\n}\n@media (max-width: 900px) {\n  .left-speech,\n  .right-speech {\n    padding: 0;\n  }\n  .thread-list {\n    padding-inline: 0.75rem;\n  }\n  .moderator-break {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=debate-thread.component.css.map */\n"] }]
  }], null, { threadScroller: [{
    type: ViewChild,
    args: ["threadScroller"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DebateThreadComponent, { className: "DebateThreadComponent", filePath: "src/app/templates/debate-studio/ui/debate-thread.component.ts", lineNumber: 15 });
})();

// src/app/templates/debate-studio/ui/debate-inquiry.component.ts
var _forTrack05 = ($index, $item) => $item.id;
function DebateInquiryComponent_Conditional_38_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-inquiry-example", 30);
  }
  if (rf & 2) {
    const example_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("example", example_r1)("sources", ctx_r1.runtime.config.evidence);
  }
}
function DebateInquiryComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DebateInquiryComponent_Conditional_38_For_1_Template, 1, 2, "app-inquiry-example", 30, _forTrack05);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.examples());
  }
}
function DebateInquiryComponent_Conditional_39_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const target_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", target_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", target_r4.label, "", ctx_r1.targetReady(target_r4.id) ? " \xB7 reviewed in demo" : "", " ");
  }
}
function DebateInquiryComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "label", 31);
    \u0275\u0275text(2, "Choose one learning target");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 32);
    \u0275\u0275listener("ngModelChange", function DebateInquiryComponent_Conditional_39_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectTarget($event));
    });
    \u0275\u0275repeaterCreate(4, DebateInquiryComponent_Conditional_39_For_5_Template, 2, 3, "option", 17, _forTrack05);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.targetId());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.config.targets);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3(" ", ctx_r1.confirmedCount(), " of ", ctx_r1.config.targets.length, " targets reviewed as ready in this demo. ", ctx_r1.config.recordSummary, " ");
  }
}
function DebateInquiryComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.lesson().task);
  }
}
function DebateInquiryComponent_Conditional_41_For_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const gate_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Lesson ", gate_r5.afterLesson, " \xB7 ", gate_r5.criteria);
  }
}
function DebateInquiryComponent_Conditional_41_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DebateInquiryComponent_Conditional_41_For_6_Conditional_0_Template, 2, 2, "p");
  }
  if (rf & 2) {
    const gate_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(gate_r5.id === ctx_r1.lesson().requiresGate ? 0 : -1);
  }
}
function DebateInquiryComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "aside", 12)(1, "strong");
    \u0275\u0275text(2, "Teacher checkpoint before this task");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, DebateInquiryComponent_Conditional_41_For_6_Template, 1, 1, null, null, _forTrack05);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.lesson().requiresGate?.toUpperCase(), " needs review. You can keep reading sources and getting help. Return to the earlier checkpoint for a fresh response. ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.config.gates);
  }
}
function DebateInquiryComponent_For_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r6 = ctx.$implicit;
    \u0275\u0275property("value", source_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r6.title);
  }
}
function DebateInquiryComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 19);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.source().imageUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r1.source().imageAlt || ctx_r1.source().title);
  }
}
function DebateInquiryComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 23);
    \u0275\u0275text(1, "Open source reference \u2197");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("href", ctx_r1.source().sourceUrl, \u0275\u0275sanitizeUrl);
  }
}
function DebateInquiryComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1, "Independent check \xB7 sources allowed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Show your thinking");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 20);
    \u0275\u0275text(7, " Answer on your own. Practice hints are closed during this check. If you need support, return to practice and ask for a fresh check afterward. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "label", 33);
    \u0275\u0275text(9, "My answer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "textarea", 34);
    \u0275\u0275listener("ngModelChange", function DebateInquiryComponent_Conditional_69_Template_textarea_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.updateInquiryDraft(ctx_r1.checkKey(), $event));
    })("blur", function DebateInquiryComponent_Conditional_69_Template_textarea_blur_10_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.saveInquiryDrafts());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(11, "div", 35)(12, "button", 36);
    \u0275\u0275listener("click", function DebateInquiryComponent_Conditional_69_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275text(13, " Save for review ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 8);
    \u0275\u0275listener("click", function DebateInquiryComponent_Conditional_69_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.checking.set(false));
    });
    \u0275\u0275text(15, "Back to practice");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.checkPrompt());
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.blocked())("ngModel", ctx_r1.draft(ctx_r1.checkKey()));
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.blocked() || !ctx_r1.draft(ctx_r1.checkKey()).trim());
  }
}
function DebateInquiryComponent_Conditional_70_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "label", 39);
    \u0275\u0275text(7, "My practice explanation and source");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "textarea", 40);
    \u0275\u0275listener("ngModelChange", function DebateInquiryComponent_Conditional_70_Conditional_0_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.updateInquiryDraft("target-" + ctx_r1.targetId(), $event));
    })("blur", function DebateInquiryComponent_Conditional_70_Conditional_0_Template_textarea_blur_8_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.saveInquiryDrafts());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.target().standardId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.target().label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.target().prompt);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.draft("target-" + ctx_r1.targetId()));
    \u0275\u0275control();
  }
}
function DebateInquiryComponent_Conditional_70_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 42);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "textarea", 43);
    \u0275\u0275listener("ngModelChange", function DebateInquiryComponent_Conditional_70_Conditional_1_For_1_Template_textarea_ngModelChange_4_listener($event) {
      const field_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.updateInquiryDraft(ctx_r1.fieldKey(field_r11.id), $event));
    })("blur", function DebateInquiryComponent_Conditional_70_Conditional_1_For_1_Template_textarea_blur_4_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.saveInquiryDrafts());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const field_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("for", field_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(field_r11.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r11.prompt);
    \u0275\u0275advance();
    \u0275\u0275property("id", field_r11.id)("disabled", ctx_r1.blocked())("ngModel", ctx_r1.draft(ctx_r1.fieldKey(field_r11.id)));
    \u0275\u0275control();
  }
}
function DebateInquiryComponent_Conditional_70_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DebateInquiryComponent_Conditional_70_Conditional_1_For_1_Template, 5, 6, null, null, _forTrack05);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.lesson().fields);
  }
}
function DebateInquiryComponent_Conditional_70_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "details", 38)(1, "summary");
    \u0275\u0275text(2, "Ready for a side quest?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label", 44);
    \u0275\u0275text(6, "My extension");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "textarea", 45);
    \u0275\u0275listener("ngModelChange", function DebateInquiryComponent_Conditional_70_Conditional_14_Template_textarea_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.updateInquiryDraft(ctx_r1.fieldKey("side-quest"), $event));
    })("blur", function DebateInquiryComponent_Conditional_70_Conditional_14_Template_textarea_blur_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.saveInquiryDrafts());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "A side quest adds depth. It does not complete a checkpoint for you.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.lesson().sideQuest);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.draft(ctx_r1.fieldKey("side-quest")));
    \u0275\u0275control();
  }
}
function DebateInquiryComponent_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, DebateInquiryComponent_Conditional_70_Conditional_0_Template, 9, 4)(1, DebateInquiryComponent_Conditional_70_Conditional_1_Template, 2, 0);
    \u0275\u0275elementStart(2, "details", 37)(3, "summary");
    \u0275\u0275text(4, "I need a little help");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Use this in practice, then complete an independent check.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 35)(10, "button", 36);
    \u0275\u0275listener("click", function DebateInquiryComponent_Conditional_70_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startCheck());
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 8);
    \u0275\u0275listener("click", function DebateInquiryComponent_Conditional_70_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveWork());
    });
    \u0275\u0275text(13, "Save my work");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(14, DebateInquiryComponent_Conditional_70_Conditional_14_Template, 10, 2, "details", 38);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.tab() === "record" ? 0 : 1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.lesson().help);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.blocked());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.latest() ? "Try a fresh check" : "Try my checkpoint", " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.latest() && ctx_r1.runtime.inquiryState().reviews[ctx_r1.latest().id]?.decision === "ready" ? 14 : -1);
  }
}
function DebateInquiryComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 25)(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8, "Earlier responses are preserved in your portfolio download.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const attempt_r13 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.inquiryState().reviews[attempt_r13.id]?.decision === "ready" ? "Reviewed as ready \xB7 demo only" : ctx_r1.runtime.inquiryState().reviews[attempt_r13.id]?.decision === "revise" ? "Try again with feedback" : "Response waiting for review", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(attempt_r13.response);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.inquiryState().reviews[attempt_r13.id]?.feedback);
  }
}
function DebateInquiryComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.message());
  }
}
function DebateInquiryComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "button", 46);
    \u0275\u0275listener("click", function DebateInquiryComponent_Conditional_73_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.hearingRequested.emit());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.config.finalActionLabel || "Enter the hearing", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.config.finalActionNote || "Local demonstration of the debate room. Shared class filing and recordings require the school gateway.", " ");
  }
}
function DebateInquiryComponent_Conditional_74_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const gate_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", ctx_r1.runtime.inquiryGate(gate_r15.id) ? "\u2713 Demo reviewed" : "\u25CB Review needed", " \xB7 ", gate_r15.label, ": ", gate_r15.criteria, " ");
  }
}
function DebateInquiryComponent_Conditional_74_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const standard_r16 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r1.standardReady(standard_r16) ? "\u2713 All targets reviewed in demo" : "\u25CB Evidence still needed", " \xB7 ", standard_r16, " ");
  }
}
function DebateInquiryComponent_Conditional_74_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function DebateInquiryComponent_Conditional_74_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.toggleTeacherPreview());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.teacherPreview() ? "Close teacher preview" : "Open teacher preview", " ");
  }
}
function DebateInquiryComponent_Conditional_74_Conditional_22_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 52);
    \u0275\u0275text(1, "Observed presentation or discussion evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "textarea", 53);
    \u0275\u0275listener("ngModelChange", function DebateInquiryComponent_Conditional_74_Conditional_22_Conditional_10_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.performanceEvidence.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.performanceEvidence());
    \u0275\u0275control();
  }
}
function DebateInquiryComponent_Conditional_74_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "strong");
    \u0275\u0275text(2, "Demo review \u2014 this learner\u2019s latest response");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, " Read the response and cited work before deciding. These controls cannot issue official grades or unlock a live school session. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label", 49);
    \u0275\u0275text(6, "Feedback tied to the evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "textarea", 50);
    \u0275\u0275listener("ngModelChange", function DebateInquiryComponent_Conditional_74_Conditional_22_Template_textarea_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.feedback.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, " Review the complete saved work against the standard, including each required part. ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, DebateInquiryComponent_Conditional_74_Conditional_22_Conditional_10_Template, 3, 1);
    \u0275\u0275elementStart(11, "div", 35)(12, "button", 51);
    \u0275\u0275listener("click", function DebateInquiryComponent_Conditional_74_Conditional_22_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.review("ready"));
    });
    \u0275\u0275text(13, " Demo: ready");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 51);
    \u0275\u0275listener("click", function DebateInquiryComponent_Conditional_74_Conditional_22_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.review("revise"));
    });
    \u0275\u0275text(15, " Demo: needs revision ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngModel", ctx_r1.feedback());
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.needsPerformance() ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.feedback().trim() || ctx_r1.needsPerformance() && !ctx_r1.performanceEvidence().trim());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.feedback().trim());
  }
}
function DebateInquiryComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 28)(1, "summary");
    \u0275\u0275text(2, "Teacher & tutor guide");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p")(4, "strong");
    \u0275\u0275text(5, "Teacher:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p")(8, "strong");
    \u0275\u0275text(9, "Tutor task:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, " Scripted practice is available here. A connected AI tutor should recommend readiness from individual evidence; only an authorized teacher can confirm official completion. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "ul");
    \u0275\u0275repeaterCreate(16, DebateInquiryComponent_Conditional_74_For_17_Template, 2, 3, "li", null, _forTrack05);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "ul");
    \u0275\u0275repeaterCreate(19, DebateInquiryComponent_Conditional_74_For_20_Template, 2, 2, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, DebateInquiryComponent_Conditional_74_Conditional_21_Template, 2, 1, "button", 47);
    \u0275\u0275conditionalCreate(22, DebateInquiryComponent_Conditional_74_Conditional_22_Template, 16, 4, "div", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.lesson().teacher);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.lesson().tutor);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.lesson().workload);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.config.gates);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.standards);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.runtime.config.viewer.allowTeacherPreview ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.canManageModerator() && ctx_r1.latest() ? 22 : -1);
  }
}
var DebateInquiryComponent = class _DebateInquiryComponent extends InquiryWorkspaceComponent {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275DebateInquiryComponent_BaseFactory;
    return function DebateInquiryComponent_Factory(__ngFactoryType__) {
      return (\u0275DebateInquiryComponent_BaseFactory || (\u0275DebateInquiryComponent_BaseFactory = \u0275\u0275getInheritedFactory(_DebateInquiryComponent)))(__ngFactoryType__ || _DebateInquiryComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DebateInquiryComponent, selectors: [["app-debate-inquiry"]], features: [\u0275\u0275ProvidersFeature([{ provide: INQUIRY_WORKSPACE, useExisting: DebateStudioRuntimeService }]), \u0275\u0275InheritDefinitionFeature], decls: 77, vars: 31, consts: [["aria-labelledby", "inquiry-title", 1, "inquiry"], [1, "scene-introduction"], ["id", "inquiry-title"], [1, "learning-desk"], [1, "desk-top"], [1, "eyebrow"], ["role", "status", 1, "save-status"], ["aria-label", "My work", 1, "desk-tabs"], ["type", "button", 3, "click"], [1, "help-menu"], [1, "record-heading"], [1, "task-instruction"], ["role", "status", 1, "gate-note"], [1, "desk-columns"], ["aria-label", "Historical source", 1, "source-card"], ["for", "source-select"], ["id", "source-select", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "source-kind"], [1, "source-image", 3, "src", "alt"], [1, "small-note"], ["tabindex", "0", "role", "region", "aria-label", "Source reading", 1, "source-excerpt"], [1, "source-context"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["aria-label", "My response", "tabindex", "-1", 1, "response-card"], [1, "review-result"], ["role", "status", 1, "status-message"], [1, "final-action"], [1, "teacher-guide"], [1, "artwork-caption"], [3, "example", "sources"], ["for", "concept"], ["id", "concept", 3, "ngModelChange", "ngModel"], ["for", "independent-response"], ["id", "independent-response", "rows", "7", 3, "ngModelChange", "blur", "disabled", "ngModel"], [1, "actions"], ["type", "button", 1, "primary", 3, "click", "disabled"], [1, "practice-help"], [1, "side-quest"], ["for", "concept-note"], ["id", "concept-note", "rows", "5", 3, "ngModelChange", "blur", "ngModel"], [3, "for"], [1, "field-prompt"], ["rows", "3", 3, "ngModelChange", "blur", "id", "disabled", "ngModel"], ["for", "side-quest"], ["id", "side-quest", "rows", "3", 3, "ngModelChange", "blur", "ngModel"], ["type", "button", 1, "primary", 3, "click"], ["type", "button"], [1, "demo-review"], ["for", "review-feedback"], ["id", "review-feedback", "rows", "3", 3, "ngModelChange", "ngModel"], ["type", "button", 3, "click", "disabled"], ["for", "performance-evidence"], ["id", "performance-evidence", "rows", "3", "placeholder", "Record the learner, observed skill, lesson/date or recording timestamp. Text answers alone do not demonstrate speaking or listening.", 3, "ngModelChange", "ngModel"]], template: function DebateInquiryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "span");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h1", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 3)(9, "div", 4)(10, "div")(11, "span", 5);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "h2");
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "span", 6);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "nav", 7)(18, "button", 8);
      \u0275\u0275listener("click", function DebateInquiryComponent_Template_button_click_18_listener() {
        return ctx.changeTab("work");
      });
      \u0275\u0275text(19, " Today\u2019s task ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "button", 8);
      \u0275\u0275listener("click", function DebateInquiryComponent_Template_button_click_20_listener() {
        return ctx.changeTab("record");
      });
      \u0275\u0275text(21, " My learning record ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "details", 9)(23, "summary");
      \u0275\u0275text(24, "About this project");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div")(26, "p");
      \u0275\u0275text(27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "p");
      \u0275\u0275text(29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "p")(31, "strong");
      \u0275\u0275text(32, "Local pilot:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(33, " work saves on this device. Tutor questions are scripted; live AI and school submission are not connected. Teacher preview demonstrates reviews only. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "p");
      \u0275\u0275text(35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 8);
      \u0275\u0275listener("click", function DebateInquiryComponent_Template_button_click_36_listener() {
        return ctx.exportPortfolio();
      });
      \u0275\u0275text(37, "Download my portfolio");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(38, DebateInquiryComponent_Conditional_38_Template, 2, 0);
      \u0275\u0275conditionalCreate(39, DebateInquiryComponent_Conditional_39_Template, 8, 4, "div", 10)(40, DebateInquiryComponent_Conditional_40_Template, 2, 1, "p", 11);
      \u0275\u0275conditionalCreate(41, DebateInquiryComponent_Conditional_41_Template, 7, 1, "aside", 12);
      \u0275\u0275elementStart(42, "div", 13)(43, "aside", 14)(44, "label", 15);
      \u0275\u0275text(45, "Read a source");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "select", 16);
      \u0275\u0275listener("ngModelChange", function DebateInquiryComponent_Template_select_ngModelChange_46_listener($event) {
        return ctx.selectedSourceId.set($event);
      });
      \u0275\u0275repeaterCreate(47, DebateInquiryComponent_For_48_Template, 2, 2, "option", 17, _forTrack05);
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementStart(49, "span", 18);
      \u0275\u0275text(50);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "h3");
      \u0275\u0275text(52);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(53, DebateInquiryComponent_Conditional_53_Template, 1, 2, "img", 19);
      \u0275\u0275elementStart(54, "p", 20);
      \u0275\u0275text(55, "Read the whole passage. Scroll inside the reading for more.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "p", 21);
      \u0275\u0275text(57);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "p", 22);
      \u0275\u0275text(59);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "details")(61, "summary");
      \u0275\u0275text(62, "Where this source comes from");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "p");
      \u0275\u0275text(64);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "p");
      \u0275\u0275text(66);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(67, DebateInquiryComponent_Conditional_67_Template, 2, 1, "a", 23);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "section", 24);
      \u0275\u0275conditionalCreate(69, DebateInquiryComponent_Conditional_69_Template, 16, 4)(70, DebateInquiryComponent_Conditional_70_Template, 15, 5);
      \u0275\u0275conditionalCreate(71, DebateInquiryComponent_Conditional_71_Template, 9, 3, "details", 25);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(72, DebateInquiryComponent_Conditional_72_Template, 2, 1, "p", 26);
      \u0275\u0275conditionalCreate(73, DebateInquiryComponent_Conditional_73_Template, 5, 2, "div", 27);
      \u0275\u0275conditionalCreate(74, DebateInquiryComponent_Conditional_74_Template, 23, 5, "details", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "p", 29);
      \u0275\u0275text(76);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_26_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.runtime.config.historicalSetting);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.config.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.config.centralQuestion);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2("Week ", (ctx.lessonNumber() + 1 - (ctx.lessonNumber() % 2 === 0 ? 1 : 0)) / 2, " \xB7 ", ctx.lessonNumber() % 2 ? "Learn on your own" : "Work together");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.lesson().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Practice preview \xB7 ", ctx.runtime.saveState() === "saving" ? "Saving\u2026" : ctx.runtime.saveState() === "local" ? "Not saved \xB7 keep this page open" : "Saved on this device");
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-pressed", ctx.tab() === "work");
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-pressed", ctx.tab() === "record");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.config.introduction);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.config.artworkCaption);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.lesson().workload);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.tab() === "work" && !ctx.checking() ? 38 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.tab() === "record" ? 39 : 40);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.blocked() ? 41 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngModel", ctx.source().id);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.runtime.config.evidence);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("", ctx.source().sourceType, " \xB7 ", ctx.source().dateLabel);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.source().title);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.source().imageUrl ? 53 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.source().excerpt, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.source().context);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.source().citation);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.source().perspective);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.source().sourceUrl ? 67 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.checking() ? 69 : 70);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_26_0 = !ctx.checking() && ctx.latest()) ? 71 : -1, tmp_26_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.message() ? 72 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.lessonNumber() >= (ctx.config.studioFromLesson ?? 8) && !ctx.blocked() ? 73 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.checking() ? 74 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.config.artworkCaption);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, InquiryExampleComponent], styles: ['@charset "UTF-8";\n\n\n[_nghost-%COMP%] {\n  display: block;\n  position: relative;\n  z-index: 2;\n}\n.inquiry[_ngcontent-%COMP%] {\n  padding: 0 clamp(14px, 3vw, 44px) 24px;\n  color: #29251f;\n}\n.scene-introduction[_ngcontent-%COMP%] {\n  padding: 32px 12px 26px;\n  color: #fff4d9;\n  text-align: center;\n  text-shadow: 0 2px 12px #241106;\n}\n.scene-introduction[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 750;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  font: 600 clamp(30px, 4vw, 48px)/1.1 Georgia, serif;\n}\n.scene-introduction[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 10px 0;\n  font-size: 18px;\n}\n.learning-desk[_ngcontent-%COMP%] {\n  max-width: 1160px;\n  margin: auto;\n  padding: clamp(16px, 2.5vw, 30px);\n  border: 1px solid #e7cf9c;\n  border-radius: 18px;\n  background: rgba(251, 247, 237, 0.9803921569);\n  box-shadow: 0 14px 50px rgba(35, 23, 11, 0.4392156863);\n}\n.desk-top[_ngcontent-%COMP%], \n.desk-tabs[_ngcontent-%COMP%], \n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.desk-top[_ngcontent-%COMP%] {\n  justify-content: space-between;\n}\n.desk-top[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: #7b5830;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 5px 0 12px;\n  font-size: 25px;\n}\nh3[_ngcontent-%COMP%] {\n  font: 700 23px/1.25 Georgia, serif;\n  margin: 15px 0;\n}\n.save-status[_ngcontent-%COMP%], \n.small-note[_ngcontent-%COMP%], \n.record-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #56574f;\n}\n.desk-tabs[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #d9cfbc;\n  padding: 6px 0 16px;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \nsummary[_ngcontent-%COMP%] {\n  min-height: 48px;\n  font: 600 15px/1.3 system-ui, sans-serif;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 12px 18px;\n  border: 1px solid #c9bba2;\n  border-radius: 9px;\n  background: #fffdf7;\n  color: #3f3325;\n  cursor: pointer;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #e9dfc8;\n  border-color: #8a6b3f;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #2d5552;\n  color: white;\n  border-color: #2d5552;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  filter: brightness(0.96);\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #247574;\n  outline-offset: 3px;\n}\n.task-instruction[_ngcontent-%COMP%] {\n  font-size: 18px;\n  line-height: 1.55;\n  max-width: 940px;\n}\n.desk-columns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);\n  gap: 26px;\n  align-items: start;\n  margin-top: 22px;\n}\n.source-card[_ngcontent-%COMP%] {\n  padding: 22px;\n  background: #f0e5cf;\n  border: 1px solid #dbcaab;\n  border-radius: 12px;\n}\n.source-kind[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 18px;\n  font-size: 12px;\n  line-height: 1.4;\n  color: #685334;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.55;\n}\n.source-excerpt[_ngcontent-%COMP%] {\n  font: 19px/1.65 Georgia, serif;\n}\n.source-context[_ngcontent-%COMP%] {\n  padding-top: 14px;\n  border-top: 1px solid #cdbb98;\n  font-size: 15px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 0 8px;\n  font-weight: 750;\n  font-size: 16px;\n}\ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 12px;\n  background: #fffefa;\n  color: #262d2b;\n  border: 1px solid #aa9e86;\n  border-radius: 8px;\n}\ntextarea[_ngcontent-%COMP%] {\n  font: 17px/1.55 system-ui, sans-serif;\n  resize: vertical;\n  margin-bottom: 18px;\n}\n.field-prompt[_ngcontent-%COMP%] {\n  margin: -2px 0 10px;\n  font-size: 14px;\n  color: #555348;\n}\nsummary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  color: #2a5756;\n}\nsummary[_ngcontent-%COMP%]::before {\n  content: "+";\n  margin-right: 10px;\n  font-size: 20px;\n}\ndetails[open][_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]::before {\n  content: "\\2212";\n}\ndetails[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.help-menu[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.help-menu[open][_ngcontent-%COMP%] {\n  flex-basis: 100%;\n}\n.help-menu[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  max-width: 850px;\n  padding: 0 12px;\n}\n.practice-help[_ngcontent-%COMP%], \n.side-quest[_ngcontent-%COMP%], \n.review-result[_ngcontent-%COMP%] {\n  border-top: 1px solid #d9cfbc;\n  margin: 12px 0;\n}\n.review-result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n}\n.record-heading[_ngcontent-%COMP%], \n.gate-note[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding: 16px;\n  border-radius: 9px;\n  background: #eee6d5;\n}\n.record-heading[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  max-width: 540px;\n}\n.gate-note[_ngcontent-%COMP%] {\n  border-left: 4px solid #aa7535;\n  background: #fff0d4;\n}\n.teacher-guide[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  border-top: 1px solid #ccc0a9;\n}\n.teacher-guide[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 10px 0;\n  line-height: 1.5;\n}\n.demo-review[_ngcontent-%COMP%] {\n  padding: 18px;\n  background: #e7eeea;\n  border-radius: 10px;\n  margin-top: 18px;\n}\n.status-message[_ngcontent-%COMP%] {\n  padding: 12px;\n  background: #e7eeea;\n  border-radius: 8px;\n}\n.final-action[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.final-action[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.artwork-caption[_ngcontent-%COMP%] {\n  margin: 18px auto 0;\n  max-width: 1100px;\n  text-align: center;\n  font-size: 12px;\n  color: #fff4d9;\n  text-shadow: 0 1px 6px #000;\n}\na[_ngcontent-%COMP%] {\n  color: #175d60;\n  overflow-wrap: anywhere;\n}\n@media (max-width: 720px) {\n  .desk-columns[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 22px;\n  }\n  .scene-introduction[_ngcontent-%COMP%] {\n    padding: 26px 0 22px;\n  }\n  .help-menu[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .source-card[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1 1 auto;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    animation: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n.source-image[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: auto;\n  border-radius: 8px;\n  margin: 16px 0;\n}\n.source-excerpt[_ngcontent-%COMP%] {\n  white-space: pre-line;\n  max-height: min(55vh, 480px);\n  overflow: auto;\n  padding-right: 10px;\n  overscroll-behavior: contain;\n}\n.source-excerpt[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #aa7027;\n  outline-offset: 4px;\n}\n/*# sourceMappingURL=inquiry-workspace.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DebateInquiryComponent, [{
    type: Component,
    args: [{ selector: "app-debate-inquiry", imports: [FormsModule, InquiryExampleComponent], providers: [{ provide: INQUIRY_WORKSPACE, useExisting: DebateStudioRuntimeService }], template: `<section class="inquiry" aria-labelledby="inquiry-title">
  <div class="scene-introduction">
    <span>{{ runtime.config.historicalSetting }}</span>
    <h1 id="inquiry-title">{{ runtime.config.title }}</h1>
    <p>{{ runtime.config.centralQuestion }}</p>
  </div>
  <div class="learning-desk">
    <div class="desk-top">
      <div>
        <span class="eyebrow"
          >Week {{ (lessonNumber() + 1 - (lessonNumber() % 2 === 0 ? 1 : 0)) / 2 }} \xB7
          {{ lessonNumber() % 2 ? 'Learn on your own' : 'Work together' }}</span
        >
        <h2>{{ lesson().title }}</h2>
      </div>
      <span class="save-status" role="status"
        >Practice preview \xB7
        {{
          runtime.saveState() === 'saving'
            ? 'Saving\u2026'
            : runtime.saveState() === 'local'
              ? 'Not saved \xB7 keep this page open'
              : 'Saved on this device'
        }}</span
      >
    </div>
    <nav class="desk-tabs" aria-label="My work">
      <button type="button" [attr.aria-pressed]="tab() === 'work'" (click)="changeTab('work')">
        Today\u2019s task
      </button>
      <button type="button" [attr.aria-pressed]="tab() === 'record'" (click)="changeTab('record')">
        My learning record
      </button>
      <details class="help-menu">
        <summary>About this project</summary>
        <div>
          <p>{{ config.introduction }}</p>
          <p>{{ config.artworkCaption }}</p>
          <p>
            <strong>Local pilot:</strong> work saves on this device. Tutor questions are scripted;
            live AI and school submission are not connected. Teacher preview demonstrates reviews
            only.
          </p>
          <p>{{ lesson().workload }}</p>
          <button type="button" (click)="exportPortfolio()">Download my portfolio</button>
        </div>
      </details>
    </nav>
    @if (tab() === 'work' && !checking()) {
      @for (example of examples(); track example.id) {
        <app-inquiry-example [example]="example" [sources]="runtime.config.evidence" />
      }
    }
    @if (tab() === 'record') {
      <div class="record-heading">
        <label for="concept">Choose one learning target</label>
        <select id="concept" [ngModel]="targetId()" (ngModelChange)="selectTarget($event)">
          @for (target of config.targets; track target.id) {
            <option [value]="target.id">
              {{ target.label }}{{ targetReady(target.id) ? ' \xB7 reviewed in demo' : '' }}
            </option>
          }
        </select>
        <p>
          {{ confirmedCount() }} of {{ config.targets.length }} targets reviewed as ready in this
          demo. {{ config.recordSummary }}
        </p>
      </div>
    } @else {
      <p class="task-instruction">{{ lesson().task }}</p>
    }
    @if (blocked()) {
      <aside class="gate-note" role="status">
        <strong>Teacher checkpoint before this task</strong>
        <p>
          {{ lesson().requiresGate?.toUpperCase() }} needs review. You can keep reading sources and
          getting help. Return to the earlier checkpoint for a fresh response.
        </p>
        @for (gate of config.gates; track gate.id) {
          @if (gate.id === lesson().requiresGate) {
            <p>Lesson {{ gate.afterLesson }} \xB7 {{ gate.criteria }}</p>
          }
        }
      </aside>
    }
    <div class="desk-columns">
      <aside class="source-card" aria-label="Historical source">
        <label for="source-select">Read a source</label>
        <select
          id="source-select"
          [ngModel]="source().id"
          (ngModelChange)="selectedSourceId.set($event)"
        >
          @for (source of runtime.config.evidence; track source.id) {
            <option [value]="source.id">{{ source.title }}</option>
          }
        </select>
        <span class="source-kind">{{ source().sourceType }} \xB7 {{ source().dateLabel }}</span>
        <h3>{{ source().title }}</h3>
        @if (source().imageUrl) {
          <img
            class="source-image"
            [src]="source().imageUrl"
            [alt]="source().imageAlt || source().title"
          />
        }
        <p class="small-note">Read the whole passage. Scroll inside the reading for more.</p>
        <p class="source-excerpt" tabindex="0" role="region" aria-label="Source reading">
          {{ source().excerpt }}
        </p>
        <p class="source-context">{{ source().context }}</p>
        <details>
          <summary>Where this source comes from</summary>
          <p>{{ source().citation }}</p>
          <p>{{ source().perspective }}</p>
          @if (source().sourceUrl) {
            <a [href]="source().sourceUrl" target="_blank" rel="noopener noreferrer"
              >Open source reference \u2197</a
            >
          }
        </details>
      </aside>
      <section class="response-card" aria-label="My response" tabindex="-1">
        @if (checking()) {
          <span class="eyebrow">Independent check \xB7 sources allowed</span>
          <h3>Show your thinking</h3>
          <p>{{ checkPrompt() }}</p>
          <p class="small-note">
            Answer on your own. Practice hints are closed during this check. If you need support,
            return to practice and ask for a fresh check afterward.
          </p>
          <label for="independent-response">My answer</label>
          <textarea
            id="independent-response"
            rows="7"
            [disabled]="blocked()"
            [ngModel]="draft(checkKey())"
            (ngModelChange)="runtime.updateInquiryDraft(checkKey(), $event)"
            (blur)="runtime.saveInquiryDrafts()"
          ></textarea>
          <div class="actions">
            <button
              type="button"
              class="primary"
              [disabled]="blocked() || !draft(checkKey()).trim()"
              (click)="submit()"
            >
              Save for review
            </button>
            <button type="button" (click)="checking.set(false)">Back to practice</button>
          </div>
        } @else {
          @if (tab() === 'record') {
            <span class="eyebrow">{{ target().standardId }}</span>
            <h3>{{ target().label }}</h3>
            <p>{{ target().prompt }}</p>
            <label for="concept-note">My practice explanation and source</label>
            <textarea
              id="concept-note"
              rows="5"
              [ngModel]="draft('target-' + targetId())"
              (ngModelChange)="runtime.updateInquiryDraft('target-' + targetId(), $event)"
              (blur)="runtime.saveInquiryDrafts()"
            ></textarea>
          } @else {
            @for (field of lesson().fields; track field.id) {
              <label [for]="field.id">{{ field.label }}</label>
              <p class="field-prompt">{{ field.prompt }}</p>
              <textarea
                [id]="field.id"
                rows="3"
                [disabled]="blocked()"
                [ngModel]="draft(fieldKey(field.id))"
                (ngModelChange)="runtime.updateInquiryDraft(fieldKey(field.id), $event)"
                (blur)="runtime.saveInquiryDrafts()"
              ></textarea>
            }
          }
          <details class="practice-help">
            <summary>I need a little help</summary>
            <p>{{ lesson().help }}</p>
            <p>Use this in practice, then complete an independent check.</p>
          </details>
          <div class="actions">
            <button type="button" class="primary" [disabled]="blocked()" (click)="startCheck()">
              {{ latest() ? 'Try a fresh check' : 'Try my checkpoint' }}
            </button>
            <button type="button" (click)="saveWork()">Save my work</button>
          </div>
          @if (latest() && runtime.inquiryState().reviews[latest()!.id]?.decision === 'ready') {
            <details class="side-quest">
              <summary>Ready for a side quest?</summary>
              <p>{{ lesson().sideQuest }}</p>
              <label for="side-quest">My extension</label
              ><textarea
                id="side-quest"
                rows="3"
                [ngModel]="draft(fieldKey('side-quest'))"
                (ngModelChange)="runtime.updateInquiryDraft(fieldKey('side-quest'), $event)"
                (blur)="runtime.saveInquiryDrafts()"
              ></textarea>
              <p>A side quest adds depth. It does not complete a checkpoint for you.</p>
            </details>
          }
        }
        @if (!checking() && latest(); as attempt) {
          <details class="review-result">
            <summary>
              {{
                runtime.inquiryState().reviews[attempt.id]?.decision === 'ready'
                  ? 'Reviewed as ready \xB7 demo only'
                  : runtime.inquiryState().reviews[attempt.id]?.decision === 'revise'
                    ? 'Try again with feedback'
                    : 'Response waiting for review'
              }}
            </summary>
            <p>{{ attempt.response }}</p>
            <p>{{ runtime.inquiryState().reviews[attempt.id]?.feedback }}</p>
            <small>Earlier responses are preserved in your portfolio download.</small>
          </details>
        }
      </section>
    </div>
    @if (message()) {
      <p role="status" class="status-message">{{ message() }}</p>
    }
    @if (lessonNumber() >= (config.studioFromLesson ?? 8) && !blocked()) {
      <div class="final-action">
        <button type="button" class="primary" (click)="hearingRequested.emit()">
          {{ config.finalActionLabel || 'Enter the hearing' }}
        </button>
        <p>
          {{
            config.finalActionNote ||
              'Local demonstration of the debate room. Shared class filing and recordings require the school gateway.'
          }}
        </p>
      </div>
    }
    @if (!checking()) {
      <details class="teacher-guide">
        <summary>Teacher & tutor guide</summary>
        <p><strong>Teacher:</strong> {{ lesson().teacher }}</p>
        <p><strong>Tutor task:</strong> {{ lesson().tutor }}</p>
        <p>
          Scripted practice is available here. A connected AI tutor should recommend readiness from
          individual evidence; only an authorized teacher can confirm official completion.
        </p>
        <p>{{ lesson().workload }}</p>
        <ul>
          @for (gate of config.gates; track gate.id) {
            <li>
              {{ runtime.inquiryGate(gate.id) ? '\u2713 Demo reviewed' : '\u25CB Review needed' }} \xB7
              {{ gate.label }}: {{ gate.criteria }}
            </li>
          }
        </ul>
        <ul>
          @for (standard of standards; track standard) {
            <li>
              {{
                standardReady(standard)
                  ? '\u2713 All targets reviewed in demo'
                  : '\u25CB Evidence still needed'
              }}
              \xB7 {{ standard }}
            </li>
          }
        </ul>
        @if (runtime.config.viewer.allowTeacherPreview) {
          <button type="button" (click)="runtime.toggleTeacherPreview()">
            {{ runtime.teacherPreview() ? 'Close teacher preview' : 'Open teacher preview' }}
          </button>
        }
        @if (runtime.canManageModerator() && latest()) {
          <div class="demo-review">
            <strong>Demo review \u2014 this learner\u2019s latest response</strong>
            <p>
              Read the response and cited work before deciding. These controls cannot issue official
              grades or unlock a live school session.
            </p>
            <label for="review-feedback">Feedback tied to the evidence</label
            ><textarea
              id="review-feedback"
              rows="3"
              [ngModel]="feedback()"
              (ngModelChange)="feedback.set($event)"
            ></textarea>
            <p>
              Review the complete saved work against the standard, including each required part.
            </p>
            @if (needsPerformance()) {
              <label for="performance-evidence">Observed presentation or discussion evidence</label>
              <textarea
                id="performance-evidence"
                rows="3"
                [ngModel]="performanceEvidence()"
                (ngModelChange)="performanceEvidence.set($event)"
                placeholder="Record the learner, observed skill, lesson/date or recording timestamp. Text answers alone do not demonstrate speaking or listening."
              ></textarea>
            }
            <div class="actions">
              <button
                type="button"
                [disabled]="
                  !feedback().trim() || (needsPerformance() && !performanceEvidence().trim())
                "
                (click)="review('ready')"
              >
                Demo: ready</button
              ><button type="button" [disabled]="!feedback().trim()" (click)="review('revise')">
                Demo: needs revision
              </button>
            </div>
          </div>
        }
      </details>
    }
  </div>
  <p class="artwork-caption">{{ config.artworkCaption }}</p>
</section>
`, styles: ['@charset "UTF-8";\n\n/* src/app/shared/inquiry/inquiry-workspace.component.scss */\n:host {\n  display: block;\n  position: relative;\n  z-index: 2;\n}\n.inquiry {\n  padding: 0 clamp(14px, 3vw, 44px) 24px;\n  color: #29251f;\n}\n.scene-introduction {\n  padding: 32px 12px 26px;\n  color: #fff4d9;\n  text-align: center;\n  text-shadow: 0 2px 12px #241106;\n}\n.scene-introduction span,\n.eyebrow {\n  font-size: 12px;\n  font-weight: 750;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\nh1 {\n  margin: 8px 0;\n  font: 600 clamp(30px, 4vw, 48px)/1.1 Georgia, serif;\n}\n.scene-introduction p {\n  margin: 10px 0;\n  font-size: 18px;\n}\n.learning-desk {\n  max-width: 1160px;\n  margin: auto;\n  padding: clamp(16px, 2.5vw, 30px);\n  border: 1px solid #e7cf9c;\n  border-radius: 18px;\n  background: rgba(251, 247, 237, 0.9803921569);\n  box-shadow: 0 14px 50px rgba(35, 23, 11, 0.4392156863);\n}\n.desk-top,\n.desk-tabs,\n.actions {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.desk-top {\n  justify-content: space-between;\n}\n.desk-top .eyebrow {\n  color: #7b5830;\n}\nh2 {\n  margin: 5px 0 12px;\n  font-size: 25px;\n}\nh3 {\n  font: 700 23px/1.25 Georgia, serif;\n  margin: 15px 0;\n}\n.save-status,\n.small-note,\n.record-heading p {\n  font-size: 13px;\n  color: #56574f;\n}\n.desk-tabs {\n  border-bottom: 1px solid #d9cfbc;\n  padding: 6px 0 16px;\n}\nbutton,\nselect,\nsummary {\n  min-height: 48px;\n  font: 600 15px/1.3 system-ui, sans-serif;\n}\nbutton {\n  padding: 12px 18px;\n  border: 1px solid #c9bba2;\n  border-radius: 9px;\n  background: #fffdf7;\n  color: #3f3325;\n  cursor: pointer;\n}\nbutton[aria-pressed=true] {\n  background: #e9dfc8;\n  border-color: #8a6b3f;\n}\nbutton.primary {\n  background: #2d5552;\n  color: white;\n  border-color: #2d5552;\n}\nbutton:hover {\n  filter: brightness(0.96);\n}\nbutton:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\nbutton:focus-visible,\ntextarea:focus-visible,\nselect:focus-visible,\nsummary:focus-visible,\na:focus-visible {\n  outline: 3px solid #247574;\n  outline-offset: 3px;\n}\n.task-instruction {\n  font-size: 18px;\n  line-height: 1.55;\n  max-width: 940px;\n}\n.desk-columns {\n  display: grid;\n  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);\n  gap: 26px;\n  align-items: start;\n  margin-top: 22px;\n}\n.source-card {\n  padding: 22px;\n  background: #f0e5cf;\n  border: 1px solid #dbcaab;\n  border-radius: 12px;\n}\n.source-kind {\n  display: block;\n  margin-top: 18px;\n  font-size: 12px;\n  line-height: 1.4;\n  color: #685334;\n}\np {\n  line-height: 1.55;\n}\n.source-excerpt {\n  font: 19px/1.65 Georgia, serif;\n}\n.source-context {\n  padding-top: 14px;\n  border-top: 1px solid #cdbb98;\n  font-size: 15px;\n}\nlabel {\n  display: block;\n  margin: 0 0 8px;\n  font-weight: 750;\n  font-size: 16px;\n}\ntextarea,\nselect {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 12px;\n  background: #fffefa;\n  color: #262d2b;\n  border: 1px solid #aa9e86;\n  border-radius: 8px;\n}\ntextarea {\n  font: 17px/1.55 system-ui, sans-serif;\n  resize: vertical;\n  margin-bottom: 18px;\n}\n.field-prompt {\n  margin: -2px 0 10px;\n  font-size: 14px;\n  color: #555348;\n}\nsummary {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  color: #2a5756;\n}\nsummary::before {\n  content: "+";\n  margin-right: 10px;\n  font-size: 20px;\n}\ndetails[open] > summary::before {\n  content: "\\2212";\n}\ndetails {\n  font-size: 14px;\n}\n.help-menu {\n  margin-left: auto;\n}\n.help-menu[open] {\n  flex-basis: 100%;\n}\n.help-menu > div {\n  max-width: 850px;\n  padding: 0 12px;\n}\n.practice-help,\n.side-quest,\n.review-result {\n  border-top: 1px solid #d9cfbc;\n  margin: 12px 0;\n}\n.review-result p {\n  white-space: pre-wrap;\n}\n.record-heading,\n.gate-note {\n  margin-top: 20px;\n  padding: 16px;\n  border-radius: 9px;\n  background: #eee6d5;\n}\n.record-heading select {\n  max-width: 540px;\n}\n.gate-note {\n  border-left: 4px solid #aa7535;\n  background: #fff0d4;\n}\n.teacher-guide {\n  margin-top: 24px;\n  border-top: 1px solid #ccc0a9;\n}\n.teacher-guide li {\n  margin: 10px 0;\n  line-height: 1.5;\n}\n.demo-review {\n  padding: 18px;\n  background: #e7eeea;\n  border-radius: 10px;\n  margin-top: 18px;\n}\n.status-message {\n  padding: 12px;\n  background: #e7eeea;\n  border-radius: 8px;\n}\n.final-action {\n  margin-top: 24px;\n}\n.final-action p {\n  font-size: 13px;\n}\n.artwork-caption {\n  margin: 18px auto 0;\n  max-width: 1100px;\n  text-align: center;\n  font-size: 12px;\n  color: #fff4d9;\n  text-shadow: 0 1px 6px #000;\n}\na {\n  color: #175d60;\n  overflow-wrap: anywhere;\n}\n@media (max-width: 720px) {\n  .desk-columns {\n    grid-template-columns: 1fr;\n    gap: 22px;\n  }\n  .scene-introduction {\n    padding: 26px 0 22px;\n  }\n  .help-menu {\n    margin-left: 0;\n  }\n  .source-card {\n    padding: 16px;\n  }\n  .actions button {\n    flex: 1 1 auto;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n.source-image {\n  display: block;\n  width: 100%;\n  height: auto;\n  border-radius: 8px;\n  margin: 16px 0;\n}\n.source-excerpt {\n  white-space: pre-line;\n  max-height: min(55vh, 480px);\n  overflow: auto;\n  padding-right: 10px;\n  overscroll-behavior: contain;\n}\n.source-excerpt:focus-visible {\n  outline: 3px solid #aa7027;\n  outline-offset: 4px;\n}\n/*# sourceMappingURL=inquiry-workspace.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DebateInquiryComponent, { className: "DebateInquiryComponent", filePath: "src/app/templates/debate-studio/ui/debate-inquiry.component.ts", lineNumber: 15 });
})();

// src/app/templates/debate-studio/ui/debate-studio-page.component.ts
var _forTrack06 = ($index, $item) => $item.id;
function DebateStudioPageComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "main", 2)(1, "app-debate-inquiry", 4);
    \u0275\u0275listener("hearingRequested", function DebateStudioPageComponent_Conditional_3_Template_app_debate_inquiry_hearingRequested_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.enterHearing());
    });
    \u0275\u0275elementEnd()();
  }
}
function DebateStudioPageComponent_Conditional_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.runtime.config.title, " \xB7 Practice hearing \xB7 Local preview");
  }
}
function DebateStudioPageComponent_Conditional_4_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function DebateStudioPageComponent_Conditional_4_Conditional_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.inquiryOpen.set(true));
    });
    \u0275\u0275text(1, "Back to my lesson");
    \u0275\u0275elementEnd();
  }
}
function DebateStudioPageComponent_Conditional_4_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function DebateStudioPageComponent_Conditional_4_Conditional_35_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.toggleTeacherPreview());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.teacherPreview() ? "Student seat" : "Moderator preview", " ");
  }
}
function DebateStudioPageComponent_Conditional_4_Conditional_43_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const faction_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(faction_r7.railLabel ?? faction_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(faction_r7.position);
  }
}
function DebateStudioPageComponent_Conditional_4_Conditional_43_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const round_r8 = ctx.$implicit;
    const \u0275$index_118_r9 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("current", round_r8.id === ctx_r1.runtime.currentRound().id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_118_r9 + 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", round_r8.label, " ");
  }
}
function DebateStudioPageComponent_Conditional_4_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 21)(1, "header")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 26);
    \u0275\u0275listener("click", function DebateStudioPageComponent_Conditional_4_Conditional_43_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleDocket());
    });
    \u0275\u0275text(5, " \xD7 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 27);
    \u0275\u0275repeaterCreate(9, DebateStudioPageComponent_Conditional_4_Conditional_43_For_10_Template, 5, 2, "article", null, _forTrack06);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ol");
    \u0275\u0275repeaterCreate(12, DebateStudioPageComponent_Conditional_4_Conditional_43_For_13_Template, 4, 4, "li", 28, _forTrack06);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Question before the ", ctx_r1.runtime.assembly);
    \u0275\u0275advance();
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate1("Close ", ctx_r1.runtime.assembly, " docket"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.centralQuestion);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.runtime.config.factions);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.runtime.config.rounds);
  }
}
function DebateStudioPageComponent_Conditional_4_Conditional_44_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function DebateStudioPageComponent_Conditional_4_Conditional_44_For_7_Template_button_click_0_listener() {
      const option_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.castPreOpinion(option_r11.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r11.label, " ");
  }
}
function DebateStudioPageComponent_Conditional_4_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "aside", 22)(1, "h2", 29);
    \u0275\u0275text(2, "What do you think?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div");
    \u0275\u0275repeaterCreate(6, DebateStudioPageComponent_Conditional_4_Conditional_44_For_7_Template, 2, 1, "button", 12, _forTrack06);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.centralQuestion);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.runtime.config.opinionOptions);
  }
}
function DebateStudioPageComponent_Conditional_4_Conditional_45_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 30)(1, "span");
    \u0275\u0275text(2, "The complete class record is ready.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 25);
    \u0275\u0275listener("click", function DebateStudioPageComponent_Conditional_4_Conditional_45_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.openStation("premiere"));
    });
    \u0275\u0275text(4, " Explore the finished debate ");
    \u0275\u0275elementEnd()();
  }
}
function DebateStudioPageComponent_Conditional_4_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-debate-thread")(1, "app-debate-composer-dock");
    \u0275\u0275conditionalCreate(2, DebateStudioPageComponent_Conditional_4_Conditional_45_Conditional_2_Template, 5, 0, "aside", 30);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.runtime.session().status === "premiere-ready" ? 2 : -1);
  }
}
function DebateStudioPageComponent_Conditional_4_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 31)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5, "Sealed into the record");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7, "The argument crosses the chamber to the opposing rail.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.seal);
  }
}
function DebateStudioPageComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, DebateStudioPageComponent_Conditional_4_Conditional_0_Template, 2, 1, "p", 5);
    \u0275\u0275elementStart(1, "app-workspace-tools")(2, "header", 6)(3, "div", 7)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 8)(9, "small");
    \u0275\u0275text(10, "Question before the class");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 9)(14, "small");
    \u0275\u0275text(15, "Current phase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "strong");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 10);
    \u0275\u0275element(21, "i");
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "small");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "nav", 11);
    \u0275\u0275conditionalCreate(27, DebateStudioPageComponent_Conditional_4_Conditional_27_Template, 2, 0, "button", 12);
    \u0275\u0275elementStart(28, "button", 13);
    \u0275\u0275listener("click", function DebateStudioPageComponent_Conditional_4_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDocket());
    });
    \u0275\u0275text(29, " Docket ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "app-task-guide", 14)(31, "p");
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "p");
    \u0275\u0275text(34, " Hear the other side. Mark the words you want to answer. Use evidence to build your response. ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(35, DebateStudioPageComponent_Conditional_4_Conditional_35_Template, 2, 1, "button", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "main", 15)(37, "span", 16);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275element(39, "div", 17)(40, "div", 18);
    \u0275\u0275elementStart(41, "app-debate-faction-rail", 19);
    \u0275\u0275listener("turnSelected", function DebateStudioPageComponent_Conditional_4_Template_app_debate_faction_rail_turnSelected_41_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reviewTurn($event));
    })("buildRequested", function DebateStudioPageComponent_Conditional_4_Template_app_debate_faction_rail_buildRequested_41_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openBuilder());
    })("evidenceRequested", function DebateStudioPageComponent_Conditional_4_Template_app_debate_faction_rail_evidenceRequested_41_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openBuilder("evidence"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "section", 20);
    \u0275\u0275conditionalCreate(43, DebateStudioPageComponent_Conditional_4_Conditional_43_Template, 14, 4, "aside", 21);
    \u0275\u0275conditionalCreate(44, DebateStudioPageComponent_Conditional_4_Conditional_44_Template, 8, 1, "aside", 22)(45, DebateStudioPageComponent_Conditional_4_Conditional_45_Template, 3, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "app-debate-faction-rail", 23);
    \u0275\u0275listener("turnSelected", function DebateStudioPageComponent_Conditional_4_Template_app_debate_faction_rail_turnSelected_46_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reviewTurn($event));
    })("buildRequested", function DebateStudioPageComponent_Conditional_4_Template_app_debate_faction_rail_buildRequested_46_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openBuilder());
    })("evidenceRequested", function DebateStudioPageComponent_Conditional_4_Template_app_debate_faction_rail_evidenceRequested_46_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openBuilder("evidence"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(47, DebateStudioPageComponent_Conditional_4_Conditional_47_Template, 8, 1, "div", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.runtime.config.inquiry && ctx_r1.runtime.config.viewer.mode === "preview" ? 0 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.historicalSetting);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.title);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.centralQuestion);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.runtime.currentRound().label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.chamberHeadline());
    \u0275\u0275advance();
    \u0275\u0275classProp("connected", ctx_r1.runtime.connectionState() === "shared");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.connectionState() === "shared" ? "Shared " + ctx_r1.runtime.assembly + " live" : ctx_r1.runtime.connectionState() === "connecting" ? "Opening shared record" : "Shared record paused", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Revision ", ctx_r1.runtime.session().revision);
    \u0275\u0275advance();
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate1("", ctx_r1.runtime.assembly, " tools"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.config.inquiry ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r1.docketOpen());
    \u0275\u0275advance(2);
    \u0275\u0275property("title", \u0275\u0275interpolate1("", ctx_r1.runtime.assembly, " guide"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.centralQuestion);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.runtime.config.viewer.allowTeacherPreview ? 35 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.chamberImageAlt);
    \u0275\u0275advance(3);
    \u0275\u0275property("faction", ctx_r1.runtime.config.factions[0]);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.docketOpen() ? 43 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.runtime.preOpinion() ? 44 : 45);
    \u0275\u0275advance(2);
    \u0275\u0275property("faction", ctx_r1.runtime.config.factions[1]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.filingAnimation() ? 47 : -1);
  }
}
function DebateStudioPageComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-debate-showcase");
  }
}
function DebateStudioPageComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 33);
    \u0275\u0275listener("click", function DebateStudioPageComponent_Conditional_6_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.clearNotice());
    });
    \u0275\u0275text(4, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("error", ctx_r1.runtime.error());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.error() ?? ctx_r1.runtime.notice());
  }
}
var DebateStudioPageComponent = class _DebateStudioPageComponent {
  runtime = inject(DebateStudioRuntimeService);
  docketOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "docketOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inquiryOpen = signal(
    true,
    ...ngDevMode ? [{ debugName: "inquiryOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    bindLessonFocus(() => {
      if (this.runtime.config.inquiry)
        this.inquiryOpen.set(true);
    });
  }
  enterHearing() {
    const inquiry = this.runtime.config.inquiry;
    if (!inquiry || !this.runtime.inquiryGate(inquiry.hearingGateId))
      return;
    this.inquiryOpen.set(false);
  }
  debateThread;
  debateComposer;
  toggleDocket() {
    this.docketOpen.update((open) => !open);
  }
  reviewTurn(turnId) {
    this.debateThread?.focusTurn(turnId);
  }
  openBuilder(tab = "plan") {
    this.debateComposer?.open(tab);
  }
  static \u0275fac = function DebateStudioPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DebateStudioPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DebateStudioPageComponent, selectors: [["app-debate-studio-page"]], viewQuery: function DebateStudioPageComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(DebateThreadComponent, 5)(DebateComposerDockComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.debateThread = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.debateComposer = _t.first);
    }
  }, decls: 7, vars: 15, consts: [[1, "debate-studio"], ["href", "#senate-floor", 1, "skip-link"], ["id", "senate-floor", "tabindex", "-1"], ["role", "status", 1, "wax-notice", 3, "error"], [3, "hearingRequested"], [1, "hearing-preview-label"], [1, "chamber-order"], [1, "session-title"], [1, "debate-question"], [1, "round-status"], [1, "shared-status"], [1, "senate-tools", 3, "aria-label"], ["type", "button"], ["type", "button", "aria-controls", "debate-docket", 3, "click"], [3, "title"], ["id", "senate-floor", "tabindex", "-1", 1, "chamber", "persistent-debate"], [1, "sr-only"], ["aria-hidden", "true", 1, "sun-shaft"], ["aria-hidden", "true", 1, "chamber-vignette"], ["side", "left", 1, "left-faction-rail", 3, "turnSelected", "buildRequested", "evidenceRequested", "faction"], ["aria-labelledby", "debate-status", 1, "chamber-center"], ["id", "debate-docket", 1, "docket-details"], ["aria-labelledby", "initial-opinion-title", 1, "initial-opinion", "centered-opinion"], ["side", "right", 1, "right-faction-rail", 3, "turnSelected", "buildRequested", "evidenceRequested", "faction"], ["role", "status", 1, "filing-flight"], ["type", "button", 3, "click"], ["type", "button", 3, "click", "aria-label"], [1, "docket-positions"], [3, "current"], ["id", "initial-opinion-title"], [1, "premiere-ready-callout"], [1, "flying-scroll"], ["role", "status", 1, "wax-notice"], ["type", "button", "aria-label", "Dismiss message", 3, "click"]], template: function DebateStudioPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "a", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(3, DebateStudioPageComponent_Conditional_3_Template, 2, 0, "main", 2)(4, DebateStudioPageComponent_Conditional_4_Template, 48, 24)(5, DebateStudioPageComponent_Conditional_5_Template, 1, 0, "app-debate-showcase");
      \u0275\u0275conditionalCreate(6, DebateStudioPageComponent_Conditional_6_Template, 5, 3, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275styleProp("--%NS%chamber-image", "url(" + ctx.runtime.config.chamberImageUrl + ")");
      \u0275\u0275classProp("inquiry-setting", !!ctx.runtime.config.inquiry)("opponent-active", ctx.runtime.chamberStage() === "opponent")("moderator-active", ctx.runtime.chamberStage() === "moderator")("faction-active", ctx.runtime.chamberStage() === "your-turn")("crossfire-active", ctx.runtime.session().status === "crossfire");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Skip to the ", ctx.runtime.assembly, " floor");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.config.inquiry && ctx.inquiryOpen() ? 3 : ctx.runtime.state().room === "chamber" ? 4 : 5);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.runtime.notice() || ctx.runtime.error() ? 6 : -1);
    }
  }, dependencies: [
    WorkspaceToolsComponent,
    DebateInquiryComponent,
    TaskGuideComponent,
    DebateFactionRailComponent,
    DebateShowcaseComponent,
    DebateComposerDockComponent,
    DebateThreadComponent
  ], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-height: calc(100dvh - 3.25rem);\n}\n.debate-studio[_ngcontent-%COMP%] {\n  --%NS%gold: #d9b66f;\n  --%NS%ivory: #f5e8c7;\n  --%NS%ink: #21130d;\n  min-height: calc(100dvh - 3.25rem);\n  overflow: hidden;\n  color: var(--%NS%ivory);\n  background: #0d0806;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\n.debate-studio.inquiry-setting[_ngcontent-%COMP%] {\n  position: relative;\n  background: linear-gradient(rgba(48, 34, 20, 0.3137254902), rgba(48, 34, 20, 0.5019607843)), var(--%NS%chamber-image) center top/cover fixed;\n}\n.hearing-preview-label[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  top: 64px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: max-content;\n  max-width: 85%;\n  margin: 0;\n  padding: 10px 16px;\n  border-radius: 8px;\n  background: rgba(36, 24, 13, 0.8666666667);\n  color: #fff4d9;\n  text-align: center;\n  font-size: 14px;\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #f1c96e;\n  outline-offset: 3px;\n}\n.skip-link[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 400;\n  top: 0.5rem;\n  left: 0.5rem;\n  padding: 0.65rem 0.9rem;\n  color: #17100b;\n  background: #fff3cf;\n  transform: translateY(-150%);\n}\n.skip-link[_ngcontent-%COMP%]:focus {\n  transform: translateY(0);\n}\n.chamber-order[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 30;\n  display: grid;\n  grid-template-columns: minmax(9rem, 1fr) 2fr minmax(10rem, 1fr);\n  min-height: 4.7rem;\n  align-items: center;\n  border-bottom: 1px solid rgba(199, 158, 91, 0.4);\n  padding: 0.5rem 1rem;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(23, 16, 13, 0.968627451),\n      rgba(17, 11, 8, 0.9568627451));\n  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.7333333333);\n}\n.debate-question[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.round-status[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: #a99670;\n  font-size: 0.6rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.debate-question[_ngcontent-%COMP%] {\n  min-width: 0;\n  border-inline: 1px solid rgba(184, 148, 78, 0.2588235294);\n  padding-inline: clamp(0.65rem, 1.5vw, 1.25rem);\n}\n.debate-question[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.12rem;\n  overflow: hidden;\n  color: #ead7aa;\n  font: 700 0.78rem/1.3 Georgia, serif;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.round-status[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.round-status[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n.round-status[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 0.1rem;\n  color: #f0daa7;\n  font: 700 0.76rem Georgia, serif;\n}\n.round-status[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 0.12rem;\n  color: #b69d70;\n  font-size: 0.61rem;\n}\n.persistent-debate[_ngcontent-%COMP%]   .chamber-center[_ngcontent-%COMP%] {\n  height: 100%;\n  grid-template-rows: minmax(0, 1fr) auto;\n  overflow: hidden;\n  padding: 0;\n}\n.persistent-debate[_ngcontent-%COMP%]   .chamber-center[_ngcontent-%COMP%]:has(> app-debate-composer-dock.composer-expanded) {\n  grid-template-rows: 35% 65%;\n}\n.persistent-debate[_ngcontent-%COMP%]   app-debate-thread[_ngcontent-%COMP%] {\n  grid-row: 1;\n  min-height: 0;\n}\n.persistent-debate[_ngcontent-%COMP%]   app-debate-composer-dock[_ngcontent-%COMP%] {\n  z-index: 8;\n  grid-row: 2;\n}\n.centered-opinion[_ngcontent-%COMP%] {\n  align-self: center;\n  justify-self: center;\n  width: min(90%, 44rem);\n}\n.premiere-ready-callout[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 15;\n  top: 0.7rem;\n  left: 50%;\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  border: 1px solid #d3b363;\n  border-radius: 999px;\n  padding: 0.45rem 0.55rem 0.45rem 0.85rem;\n  color: #f1dfb7;\n  background: rgba(32, 20, 15, 0.9490196078);\n  box-shadow: 0 0.75rem 1.7rem rgba(0, 0, 0, 0.6666666667);\n  font-size: 0.68rem;\n  transform: translateX(-50%);\n}\n.premiere-ready-callout[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #d4b56b;\n  border-radius: 999px;\n  padding: 0.38rem 0.65rem;\n  color: #29170d;\n  background: #e7c77f;\n  font-size: 0.65rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.republic-seal[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.shared-status[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.session-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #bda981;\n  font-size: 0.68rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.session-title[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.session-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.session-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n}\n.session-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 0.12rem;\n  font: 600 1.05rem Georgia, serif;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.shared-status[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  justify-self: end;\n  gap: 0 0.48rem;\n  align-items: center;\n  color: #d5b578;\n  font-size: 0.74rem;\n  text-align: right;\n}\n.shared-status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  grid-row: 1/span 2;\n  width: 0.52rem;\n  height: 0.52rem;\n  border-radius: 50%;\n  background: #a94f43;\n  box-shadow: 0 0 0.7rem #a94f43;\n}\n.shared-status.connected[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  background: #82a875;\n  box-shadow: 0 0 0.7rem #82a875;\n}\n.chamber[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  min-height: calc(100dvh - 8.5rem);\n  grid-template-columns: clamp(14.5rem, 19vw, 19rem) minmax(20rem, 1fr) clamp(14.5rem, 19vw, 19rem);\n  isolation: isolate;\n  overflow: hidden;\n  background-image:\n    linear-gradient(\n      180deg,\n      rgba(9, 5, 3, 0.3803921569),\n      transparent 38%,\n      rgba(9, 5, 3, 0.7450980392)),\n    var(--%NS%chamber-image);\n  background-position: center;\n  background-size: cover;\n}\n.chamber[_ngcontent-%COMP%]::after {\n  position: absolute;\n  z-index: 1;\n  inset: 0;\n  pointer-events: none;\n  background:\n    radial-gradient(\n      circle at 50% 44%,\n      transparent 15%,\n      rgba(8, 4, 3, 0.1803921569) 62%,\n      rgba(5, 3, 2, 0.5490196078) 100%);\n  content: "";\n}\n.sun-shaft[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: -12%;\n  left: 35%;\n  width: 30%;\n  height: 90%;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      110deg,\n      transparent,\n      rgba(246, 210, 139, 0.1098039216) 48%,\n      transparent);\n  filter: blur(0.4rem);\n  transform: skewX(-9deg);\n  animation: _ngcontent-%COMP%_breathe 6s ease-in-out infinite alternate;\n}\napp-debate-faction-rail[_ngcontent-%COMP%] {\n  min-width: 0;\n  min-height: 0;\n}\n.left-faction-rail[_ngcontent-%COMP%] {\n  grid-column: 1;\n}\n.right-faction-rail[_ngcontent-%COMP%] {\n  grid-column: 3;\n}\n.chamber-center[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 6;\n  display: grid;\n  min-width: 0;\n  min-height: 0;\n  grid-template-rows: auto minmax(0, 1fr) auto;\n  padding: 0.8rem clamp(0.75rem, 2vw, 2rem);\n}\n.docket-details[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 25;\n  top: 4.7rem;\n  right: clamp(0.75rem, 2vw, 2rem);\n  left: clamp(0.75rem, 2vw, 2rem);\n  max-height: calc(100% - 7rem);\n  overflow: auto;\n  border: 1px solid #cba65f;\n  padding: 1rem;\n  color: #332014;\n  background:\n    linear-gradient(\n      135deg,\n      #f1ddb0,\n      #caa66e);\n  box-shadow: 0 1.4rem 3rem rgba(0, 0, 0, 0.8);\n}\n.docket-details[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: #704529;\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.docket-details[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  color: #5b3621;\n  background: transparent;\n  font-size: 1.3rem;\n  cursor: pointer;\n}\n.docket-details[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  max-width: 44rem;\n  margin: 0.4rem 0 0.8rem;\n  font: 700 clamp(1.05rem, 2vw, 1.35rem)/1.3 Georgia, serif;\n}\n.docket-positions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.65rem;\n}\n.docket-positions[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border: 1px solid rgba(122, 78, 44, 0.2705882353);\n  padding: 0.6rem;\n  background: rgba(249, 235, 199, 0.6588235294);\n}\n.docket-positions[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 0.75rem Georgia, serif;\n  text-transform: uppercase;\n}\n.docket-positions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  font-size: 0.7rem;\n  line-height: 1.4;\n}\n.docket-details[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  gap: 0.4rem;\n  margin: 0.8rem 0 0;\n  padding: 0;\n  list-style: none;\n}\n.docket-details[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  align-items: center;\n  gap: 0.35rem;\n  border-top: 1px solid rgba(125, 83, 49, 0.4196078431);\n  padding-top: 0.4rem;\n  color: #69462e;\n  font-size: 0.62rem;\n}\n.docket-details[_ngcontent-%COMP%]   li.current[_ngcontent-%COMP%] {\n  border-color: #7c281e;\n  color: #5c211b;\n  font-weight: 800;\n}\n.docket-details[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.25rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid currentColor;\n  border-radius: 50%;\n  font: 700 0.6rem Georgia, serif;\n}\n.floor-focus[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 0;\n  place-items: center;\n  padding: clamp(1rem, 4vh, 3rem) 0.5rem;\n  transition: opacity 180ms ease;\n}\n.floor-focus.workbench-open[_ngcontent-%COMP%] {\n  opacity: 0;\n  pointer-events: none;\n}\n.floor-call[_ngcontent-%COMP%], \n.chair-decree[_ngcontent-%COMP%] {\n  width: min(46rem, 100%);\n  padding: 1rem clamp(1rem, 2.7vw, 2.2rem) 1.2rem;\n  color: #ead9b6;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(22, 11, 7, 0.9098039216) 12%,\n      rgba(22, 11, 7, 0.9098039216) 88%,\n      transparent);\n  text-align: center;\n  text-shadow: 0 0.18rem 0.45rem #000;\n}\n.record-alert[_ngcontent-%COMP%], \n.chair-decree[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.48rem;\n  color: #e6bf6c;\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\n.record-alert[_ngcontent-%COMP%]::before {\n  width: 0.45rem;\n  height: 0.45rem;\n  border-radius: 50%;\n  background: #d68a45;\n  box-shadow: 0 0 1rem #efb560;\n  content: "";\n}\n.floor-call[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.chair-decree[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0.45rem auto 0.55rem;\n  color: #fff0c8;\n  font: 500 clamp(1.5rem, 3.2vw, 2.8rem)/1.08 Georgia, serif;\n  letter-spacing: 0.025em;\n  text-transform: uppercase;\n}\n.floor-call[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%], \n.chair-decree[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #dec58d;\n  font: 600 0.86rem/1.45 Georgia, serif;\n}\n.floor-call[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 1rem auto 0;\n  border-top: 1px solid rgba(197, 161, 92, 0.3215686275);\n  padding-top: 0.75rem;\n  color: #bfae89;\n  font: italic 0.78rem/1.4 Georgia, serif;\n}\n.chair-decree[_ngcontent-%COMP%] {\n  position: relative;\n  border-block: 1px solid rgba(213, 173, 94, 0.431372549);\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(37, 22, 14, 0.9490196078) 9%,\n      rgba(37, 22, 14, 0.9490196078) 91%,\n      transparent);\n}\n.decree-seal[_ngcontent-%COMP%] {\n  display: grid;\n  width: 4.4rem;\n  margin: 0 auto 0.7rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 0.24rem double #dbb561;\n  border-radius: 50%;\n  color: #efd18a;\n  background: #6f2b24;\n  box-shadow: 0 0 2rem rgba(211, 158, 71, 0.3019607843);\n  font: 700 1.15rem Georgia, serif;\n}\n.decree-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 0.55rem;\n  margin-top: 1rem;\n}\n.decree-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.teacher-decree[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #c9a45f;\n  padding: 0.65rem 0.85rem;\n  color: #ead6a7;\n  background: #342016;\n  cursor: pointer;\n}\n.decree-actions[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%], \n.teacher-decree[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #29170d;\n  background: #d7b269;\n  font-weight: 800;\n}\n.initial-opinion[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 20;\n  right: 1rem;\n  bottom: 4.2rem;\n  left: 1rem;\n  border: 1px solid rgba(215, 184, 108, 0.4901960784);\n  padding: 0.8rem;\n  color: #2c1a10;\n  background:\n    linear-gradient(\n      145deg,\n      #f0dbac,\n      #c9a66d);\n  box-shadow: 0 1rem 2.4rem rgba(0, 0, 0, 0.8);\n}\n.initial-opinion[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #70442a;\n  font-size: 0.64rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.initial-opinion[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.18rem 0;\n  font: 700 1rem Georgia, serif;\n  text-transform: uppercase;\n}\n.initial-opinion[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 0.72rem;\n}\n.initial-opinion[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.35rem;\n}\n.initial-opinion[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #714730;\n  padding: 0.45rem;\n  color: #301d13;\n  background: #f8ebc9;\n  font: 700 0.66rem/1.2 Georgia, serif;\n  cursor: pointer;\n}\n.session-building[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 2.9rem;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.7rem;\n  border-top: 1px solid rgba(212, 174, 99, 0.2588235294);\n  padding: 0.55rem 0.8rem;\n  color: #a99a7e;\n  background: rgba(19, 11, 8, 0.7803921569);\n}\n.session-building[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n}\n.session-building[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font: 700 0.68rem Georgia, serif;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n.session-building[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 0.08rem;\n  font-size: 0.61rem;\n}\n.session-building.ready[_ngcontent-%COMP%] {\n  border: 1px solid #d9b468;\n  color: #f0dbab;\n  background: rgba(43, 25, 15, 0.9490196078);\n  box-shadow: 0 0 1.8rem rgba(217, 170, 81, 0.3215686275);\n}\n.session-building[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #edca7e;\n  padding: 0.55rem 0.7rem;\n  color: #29170e;\n  background: #dfbd72;\n  font: 800 0.66rem Georgia, serif;\n  text-transform: uppercase;\n  cursor: pointer;\n}\n.filing-flight[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 250;\n  inset: 0;\n  display: grid;\n  place-content: center;\n  pointer-events: none;\n  background:\n    radial-gradient(\n      circle,\n      rgba(18, 9, 6, 0.6588235294),\n      rgba(9, 5, 3, 0.3019607843) 45%,\n      transparent 72%);\n  text-align: center;\n}\n.flying-scroll[_ngcontent-%COMP%] {\n  display: grid;\n  width: 8.5rem;\n  height: 5.2rem;\n  place-items: center;\n  margin: 0 auto 0.7rem;\n  border: 1px solid #9c713f;\n  color: #6b311f;\n  background:\n    linear-gradient(\n      135deg,\n      #f1ddb0,\n      #caa66e);\n  box-shadow: 0 0 2.7rem rgba(240, 182, 92, 0.5803921569);\n  transform: rotate(-5deg);\n  animation: _ngcontent-%COMP%_fly-and-seal 1.45s ease both;\n}\n.flying-scroll[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.8rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 0.22rem double #d1a452;\n  border-radius: 50%;\n  color: #f2cf84;\n  background: #762d25;\n  font: 700 0.65rem Georgia, serif;\n}\n.filing-flight[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.filing-flight[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: #f4dfb2;\n  text-shadow: 0 0.14rem 0.4rem #000;\n}\n.filing-flight[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 1.15rem Georgia, serif;\n  text-transform: uppercase;\n}\n.filing-flight[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  color: #c8b48b;\n}\n.wax-notice[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 350;\n  right: 1rem;\n  bottom: 1rem;\n  display: flex;\n  max-width: 32rem;\n  align-items: center;\n  gap: 1rem;\n  border: 1px solid #d6b56e;\n  padding: 0.75rem 0.9rem;\n  color: #fff0cc;\n  background: rgba(53, 32, 22, 0.9607843137);\n  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.6);\n  font-size: 0.82rem;\n}\n.wax-notice.error[_ngcontent-%COMP%] {\n  border-color: #d66d5c;\n  background: rgba(82, 28, 22, 0.9803921569);\n}\n.wax-notice[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  color: inherit;\n  background: transparent;\n  font-size: 1.2rem;\n  cursor: pointer;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n}\n@keyframes _ngcontent-%COMP%_breathe {\n  to {\n    opacity: 0.55;\n    transform: skewX(-7deg) translateX(-1.5rem);\n  }\n}\n@keyframes _ngcontent-%COMP%_point-outward {\n  to {\n    transform: translateX(0.3rem);\n  }\n}\n@keyframes _ngcontent-%COMP%_fly-and-seal {\n  0% {\n    opacity: 0;\n    transform: translateX(-8rem) rotate(-10deg) scale(0.75);\n  }\n  55% {\n    opacity: 1;\n    transform: translateX(0) rotate(2deg) scale(1.05);\n  }\n  100% {\n    opacity: 0;\n    transform: translateX(8rem) rotate(8deg) scale(0.88);\n  }\n}\n@media (max-width: 1100px) {\n  .chamber[_ngcontent-%COMP%] {\n    grid-template-columns: 14rem minmax(18rem, 1fr) 14rem;\n  }\n  .chamber-center[_ngcontent-%COMP%] {\n    padding-inline: 0.7rem;\n  }\n  .docket-details[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 820px) {\n  .debate-studio[_ngcontent-%COMP%] {\n    overflow: auto;\n  }\n  .chamber-order[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr auto;\n  }\n  .session-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n   .shared-status[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n   .republic-seal[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .chamber[_ngcontent-%COMP%] {\n    grid-template-areas: "center center" "left right";\n    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n    grid-template-rows: minmax(31rem, auto) auto;\n    overflow: visible;\n    background-attachment: fixed;\n  }\n  .chamber-center[_ngcontent-%COMP%] {\n    grid-area: center;\n    min-height: 31rem;\n  }\n  .left-faction-rail[_ngcontent-%COMP%] {\n    grid-area: left;\n  }\n  .right-faction-rail[_ngcontent-%COMP%] {\n    grid-area: right;\n  }\n}\n@media (max-width: 580px) {\n  .session-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 0.78rem;\n  }\n  .shared-status[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    max-width: 5rem;\n    font-size: 0.61rem;\n  }\n  .chamber[_ngcontent-%COMP%] {\n    grid-template-areas: "center" "left" "right";\n    grid-template-columns: 1fr;\n  }\n  .docket-positions[_ngcontent-%COMP%], \n   .initial-opinion[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .initial-opinion[_ngcontent-%COMP%] {\n    position: relative;\n    right: auto;\n    bottom: auto;\n    left: auto;\n    margin: 0.7rem 0;\n  }\n  .floor-call[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n   .chair-decree[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.35rem;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n.chamber-order[_ngcontent-%COMP%]:has(+ .persistent-debate) {\n  display: grid;\n  grid-template-columns: minmax(10rem, 1.1fr) minmax(16rem, 2.25fr) minmax(8rem, 1fr) auto auto auto;\n  min-height: 4.7rem;\n  height: 5.7rem;\n  box-sizing: border-box;\n  gap: clamp(0.5rem, 1vw, 1rem);\n  padding: 0.5rem 1rem;\n}\n.chamber-order[_ngcontent-%COMP%]:has(+ .persistent-debate)   .session-title[_ngcontent-%COMP%] {\n  margin: 0;\n  text-align: left;\n}\n.chamber-order[_ngcontent-%COMP%]:has(+ .persistent-debate)   .session-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.chamber-order[_ngcontent-%COMP%]:has(+ .persistent-debate)   .shared-status[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n.chamber.persistent-debate[_ngcontent-%COMP%] {\n  display: grid;\n  width: 100%;\n  height: calc(100dvh - 8.95rem);\n  min-height: 38rem;\n  grid-template-columns: 15% minmax(0, 70%) 15%;\n  align-items: stretch;\n  overflow: hidden;\n  padding: 0;\n}\n.persistent-debate[_ngcontent-%COMP%]   .chamber-center[_ngcontent-%COMP%] {\n  width: auto;\n  height: 100%;\n  min-height: 0;\n  grid-column: 2;\n  margin: 0;\n  overflow: hidden;\n  padding: 0;\n}\n.persistent-debate[_ngcontent-%COMP%]   .left-faction-rail[_ngcontent-%COMP%] {\n  grid-column: 1;\n}\n.persistent-debate[_ngcontent-%COMP%]   .right-faction-rail[_ngcontent-%COMP%] {\n  grid-column: 3;\n}\n@media (max-width: 1050px) {\n  .chamber-order[_ngcontent-%COMP%]:has(+ .persistent-debate) {\n    grid-template-columns: minmax(9rem, 1fr) minmax(14rem, 2fr) auto auto;\n  }\n  .chamber-order[_ngcontent-%COMP%]:has(+ .persistent-debate)   .round-status[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .chamber-order[_ngcontent-%COMP%]:has(+ .persistent-debate)   .shared-status[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .chamber.persistent-debate[_ngcontent-%COMP%] {\n    grid-template-columns: 18% minmax(0, 64%) 18%;\n  }\n}\n@media (max-width: 820px) {\n  .chamber-order[_ngcontent-%COMP%]:has(+ .persistent-debate) {\n    grid-template-columns: 1fr auto auto;\n  }\n  .chamber-order[_ngcontent-%COMP%]:has(+ .persistent-debate)   .debate-question[_ngcontent-%COMP%], \n   .chamber-order[_ngcontent-%COMP%]:has(+ .persistent-debate)   .round-status[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .chamber.persistent-debate[_ngcontent-%COMP%] {\n    height: auto;\n    min-height: calc(100dvh - 4.7rem);\n    grid-template-areas: "center" "left" "right";\n    grid-template-columns: 1fr;\n    grid-template-rows: minmax(42rem, 100dvh) auto auto;\n    overflow: visible;\n  }\n  .persistent-debate[_ngcontent-%COMP%]   .chamber-center[_ngcontent-%COMP%] {\n    grid-area: center;\n  }\n  .persistent-debate[_ngcontent-%COMP%]   .left-faction-rail[_ngcontent-%COMP%] {\n    grid-area: left;\n  }\n  .persistent-debate[_ngcontent-%COMP%]   .right-faction-rail[_ngcontent-%COMP%] {\n    grid-area: right;\n  }\n}\n/*# sourceMappingURL=debate-studio-page.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DebateStudioPageComponent, [{
    type: Component,
    args: [{ selector: "app-debate-studio-page", imports: [
      WorkspaceToolsComponent,
      DebateInquiryComponent,
      TaskGuideComponent,
      DebateFactionRailComponent,
      DebateShowcaseComponent,
      DebateComposerDockComponent,
      DebateThreadComponent
    ], template: `<div\r
  class="debate-studio"
  [class.inquiry-setting]="!!runtime.config.inquiry"
  [class.opponent-active]="runtime.chamberStage() === 'opponent'"\r
  [class.moderator-active]="runtime.chamberStage() === 'moderator'"\r
  [class.faction-active]="runtime.chamberStage() === 'your-turn'"\r
  [class.crossfire-active]="runtime.session().status === 'crossfire'"\r
  [style.--chamber-image]="'url(' + runtime.config.chamberImageUrl + ')'"\r
>\r
  <a class="skip-link" href="#senate-floor">Skip to the {{ runtime.assembly }} floor</a>\r
\r
  @if (runtime.config.inquiry && inquiryOpen()) {
    <main id="senate-floor" tabindex="-1"><app-debate-inquiry (hearingRequested)="enterHearing()" /></main>
  } @else if (runtime.state().room === 'chamber') {
    @if (runtime.config.inquiry && runtime.config.viewer.mode === 'preview') {
      <p class="hearing-preview-label">{{ runtime.config.title }} \xB7 Practice hearing \xB7 Local preview</p>
    }
    <app-workspace-tools><header class="chamber-order">\r
      <div class="session-title">\r
        <span>{{ runtime.config.historicalSetting }}</span>\r
        <strong>{{ runtime.config.title }}</strong>\r
      </div>\r
      <div class="debate-question">\r
        <small>Question before the class</small>\r
        <strong>{{ runtime.config.centralQuestion }}</strong>\r
      </div>\r
      <div class="round-status">\r
        <small>Current phase</small>\r
        <strong>{{ runtime.currentRound().label }}</strong>\r
        <span>{{ runtime.chamberHeadline() }}</span>\r
      </div>\r
      <div class="shared-status" [class.connected]="runtime.connectionState() === 'shared'">\r
        <i></i>\r
        <span>\r
          {{\r
            runtime.connectionState() === 'shared'\r
              ? 'Shared ' + runtime.assembly + ' live'\r
              : runtime.connectionState() === 'connecting'\r
                ? 'Opening shared record'\r
                : 'Shared record paused'\r
          }}\r
        </span>\r
        <small>Revision {{ runtime.session().revision }}</small>\r
      </div>\r
      <nav class="senate-tools" aria-label="{{ runtime.assembly }} tools">
        @if (runtime.config.inquiry) { <button type="button" (click)="inquiryOpen.set(true)">Back to my lesson</button> }
        <button\r
          type="button"\r
          [attr.aria-expanded]="docketOpen()"\r
          aria-controls="debate-docket"\r
          (click)="toggleDocket()"\r
        >\r
          Docket\r
        </button>\r
      </nav>\r
      <app-task-guide title="{{ runtime.assembly }} guide"\r
        ><p>{{ runtime.config.centralQuestion }}</p>\r
        <p>\r
          Hear the other side. Mark the words you want to answer. Use evidence to build your\r
          response.\r
        </p>\r
        @if (runtime.config.viewer.allowTeacherPreview) {\r
          <button type="button" (click)="runtime.toggleTeacherPreview()">\r
            {{ runtime.teacherPreview() ? 'Student seat' : 'Moderator preview' }}\r
          </button>\r
        }\r
      </app-task-guide>\r
    </header></app-workspace-tools>\r
\r
    <main id="senate-floor" class="chamber persistent-debate" tabindex="-1">\r
      <span class="sr-only">{{ runtime.config.chamberImageAlt }}</span>\r
      <div class="sun-shaft" aria-hidden="true"></div>\r
      <div class="chamber-vignette" aria-hidden="true"></div>\r
\r
      <app-debate-faction-rail\r
        class="left-faction-rail"\r
        [faction]="runtime.config.factions[0]"\r
        side="left"\r
        (turnSelected)="reviewTurn($event)"\r
        (buildRequested)="openBuilder()"\r
        (evidenceRequested)="openBuilder('evidence')"\r
      />\r
\r
      <section class="chamber-center" aria-labelledby="debate-status">\r
        @if (docketOpen()) {\r
          <aside id="debate-docket" class="docket-details">\r
            <header>\r
              <span>Question before the {{ runtime.assembly }}</span>\r
              <button type="button" (click)="toggleDocket()" aria-label="Close {{ runtime.assembly }} docket">\r
                \xD7\r
              </button>\r
            </header>\r
            <h2>{{ runtime.config.centralQuestion }}</h2>\r
            <div class="docket-positions">\r
              @for (faction of runtime.config.factions; track faction.id) {\r
                <article>\r
                  <strong>{{ faction.railLabel ?? faction.name }}</strong>\r
                  <p>{{ faction.position }}</p>\r
                </article>\r
              }\r
            </div>\r
            <ol>\r
              @for (round of runtime.config.rounds; track round.id; let index = $index) {\r
                <li [class.current]="round.id === runtime.currentRound().id">\r
                  <span>{{ index + 1 }}</span\r
                  >{{ round.label }}\r
                </li>\r
              }\r
            </ol>\r
          </aside>\r
        }\r
\r
        @if (!runtime.preOpinion()) {\r
          <aside class="initial-opinion centered-opinion" aria-labelledby="initial-opinion-title">\r
            <h2 id="initial-opinion-title">What do you think?</h2>\r
            <p>{{ runtime.config.centralQuestion }}</p>\r
            <div>\r
              @for (option of runtime.config.opinionOptions; track option.id) {\r
                <button type="button" (click)="runtime.castPreOpinion(option.id)">\r
                  {{ option.label }}\r
                </button>\r
              }\r
            </div>\r
          </aside>\r
        } @else {\r
          <app-debate-thread />\r
          <app-debate-composer-dock />\r
          @if (runtime.session().status === 'premiere-ready') {\r
            <aside class="premiere-ready-callout">\r
              <span>The complete class record is ready.</span>\r
              <button type="button" (click)="runtime.openStation('premiere')">\r
                Explore the finished debate\r
              </button>\r
            </aside>\r
          }\r
        }\r
      </section>\r
\r
      <app-debate-faction-rail\r
        class="right-faction-rail"\r
        [faction]="runtime.config.factions[1]"\r
        side="right"\r
        (turnSelected)="reviewTurn($event)"\r
        (buildRequested)="openBuilder()"\r
        (evidenceRequested)="openBuilder('evidence')"\r
      />\r
\r
      @if (runtime.filingAnimation()) {\r
        <div class="filing-flight" role="status">\r
          <div class="flying-scroll"><span>{{ runtime.seal }}</span></div>
          <strong>Sealed into the record</strong>\r
          <small>The argument crosses the chamber to the opposing rail.</small>\r
        </div>\r
      }\r
    </main>\r
  } @else {\r
    <app-debate-showcase />\r
  }\r
\r
  @if (runtime.notice() || runtime.error()) {\r
    <div class="wax-notice" [class.error]="runtime.error()" role="status">\r
      <span>{{ runtime.error() ?? runtime.notice() }}</span>\r
      <button type="button" (click)="runtime.clearNotice()" aria-label="Dismiss message">\xD7</button>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/templates/debate-studio/ui/debate-studio-page.component.scss */\n:host {\n  display: block;\n  min-height: calc(100dvh - 3.25rem);\n}\n.debate-studio {\n  --gold: #d9b66f;\n  --ivory: #f5e8c7;\n  --ink: #21130d;\n  min-height: calc(100dvh - 3.25rem);\n  overflow: hidden;\n  color: var(--ivory);\n  background: #0d0806;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\n.debate-studio.inquiry-setting {\n  position: relative;\n  background: linear-gradient(rgba(48, 34, 20, 0.3137254902), rgba(48, 34, 20, 0.5019607843)), var(--chamber-image) center top/cover fixed;\n}\n.hearing-preview-label {\n  position: absolute;\n  z-index: 3;\n  top: 64px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: max-content;\n  max-width: 85%;\n  margin: 0;\n  padding: 10px 16px;\n  border-radius: 8px;\n  background: rgba(36, 24, 13, 0.8666666667);\n  color: #fff4d9;\n  text-align: center;\n  font-size: 14px;\n}\nbutton,\na {\n  font: inherit;\n}\nbutton:focus-visible,\na:focus-visible {\n  outline: 3px solid #f1c96e;\n  outline-offset: 3px;\n}\n.skip-link {\n  position: fixed;\n  z-index: 400;\n  top: 0.5rem;\n  left: 0.5rem;\n  padding: 0.65rem 0.9rem;\n  color: #17100b;\n  background: #fff3cf;\n  transform: translateY(-150%);\n}\n.skip-link:focus {\n  transform: translateY(0);\n}\n.chamber-order {\n  position: relative;\n  z-index: 30;\n  display: grid;\n  grid-template-columns: minmax(9rem, 1fr) 2fr minmax(10rem, 1fr);\n  min-height: 4.7rem;\n  align-items: center;\n  border-bottom: 1px solid rgba(199, 158, 91, 0.4);\n  padding: 0.5rem 1rem;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(23, 16, 13, 0.968627451),\n      rgba(17, 11, 8, 0.9568627451));\n  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.7333333333);\n}\n.debate-question small,\n.round-status small {\n  display: block;\n  color: #a99670;\n  font-size: 0.6rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.debate-question {\n  min-width: 0;\n  border-inline: 1px solid rgba(184, 148, 78, 0.2588235294);\n  padding-inline: clamp(0.65rem, 1.5vw, 1.25rem);\n}\n.debate-question strong {\n  display: block;\n  margin-top: 0.12rem;\n  overflow: hidden;\n  color: #ead7aa;\n  font: 700 0.78rem/1.3 Georgia, serif;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.round-status strong,\n.round-status span {\n  display: block;\n}\n.round-status strong {\n  margin-top: 0.1rem;\n  color: #f0daa7;\n  font: 700 0.76rem Georgia, serif;\n}\n.round-status span {\n  margin-top: 0.12rem;\n  color: #b69d70;\n  font-size: 0.61rem;\n}\n.persistent-debate .chamber-center {\n  height: 100%;\n  grid-template-rows: minmax(0, 1fr) auto;\n  overflow: hidden;\n  padding: 0;\n}\n.persistent-debate .chamber-center:has(> app-debate-composer-dock.composer-expanded) {\n  grid-template-rows: 35% 65%;\n}\n.persistent-debate app-debate-thread {\n  grid-row: 1;\n  min-height: 0;\n}\n.persistent-debate app-debate-composer-dock {\n  z-index: 8;\n  grid-row: 2;\n}\n.centered-opinion {\n  align-self: center;\n  justify-self: center;\n  width: min(90%, 44rem);\n}\n.premiere-ready-callout {\n  position: absolute;\n  z-index: 15;\n  top: 0.7rem;\n  left: 50%;\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  border: 1px solid #d3b363;\n  border-radius: 999px;\n  padding: 0.45rem 0.55rem 0.45rem 0.85rem;\n  color: #f1dfb7;\n  background: rgba(32, 20, 15, 0.9490196078);\n  box-shadow: 0 0.75rem 1.7rem rgba(0, 0, 0, 0.6666666667);\n  font-size: 0.68rem;\n  transform: translateX(-50%);\n}\n.premiere-ready-callout button {\n  border: 1px solid #d4b56b;\n  border-radius: 999px;\n  padding: 0.38rem 0.65rem;\n  color: #29170d;\n  background: #e7c77f;\n  font-size: 0.65rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.republic-seal small,\n.shared-status small,\n.session-title span {\n  color: #bda981;\n  font-size: 0.68rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.session-title {\n  text-align: center;\n}\n.session-title span,\n.session-title strong {\n  display: block;\n}\n.session-title strong {\n  margin-top: 0.12rem;\n  font: 600 1.05rem Georgia, serif;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.shared-status {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  justify-self: end;\n  gap: 0 0.48rem;\n  align-items: center;\n  color: #d5b578;\n  font-size: 0.74rem;\n  text-align: right;\n}\n.shared-status i {\n  grid-row: 1/span 2;\n  width: 0.52rem;\n  height: 0.52rem;\n  border-radius: 50%;\n  background: #a94f43;\n  box-shadow: 0 0 0.7rem #a94f43;\n}\n.shared-status.connected i {\n  background: #82a875;\n  box-shadow: 0 0 0.7rem #82a875;\n}\n.chamber {\n  position: relative;\n  display: grid;\n  min-height: calc(100dvh - 8.5rem);\n  grid-template-columns: clamp(14.5rem, 19vw, 19rem) minmax(20rem, 1fr) clamp(14.5rem, 19vw, 19rem);\n  isolation: isolate;\n  overflow: hidden;\n  background-image:\n    linear-gradient(\n      180deg,\n      rgba(9, 5, 3, 0.3803921569),\n      transparent 38%,\n      rgba(9, 5, 3, 0.7450980392)),\n    var(--chamber-image);\n  background-position: center;\n  background-size: cover;\n}\n.chamber::after {\n  position: absolute;\n  z-index: 1;\n  inset: 0;\n  pointer-events: none;\n  background:\n    radial-gradient(\n      circle at 50% 44%,\n      transparent 15%,\n      rgba(8, 4, 3, 0.1803921569) 62%,\n      rgba(5, 3, 2, 0.5490196078) 100%);\n  content: "";\n}\n.sun-shaft {\n  position: absolute;\n  z-index: 2;\n  top: -12%;\n  left: 35%;\n  width: 30%;\n  height: 90%;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      110deg,\n      transparent,\n      rgba(246, 210, 139, 0.1098039216) 48%,\n      transparent);\n  filter: blur(0.4rem);\n  transform: skewX(-9deg);\n  animation: breathe 6s ease-in-out infinite alternate;\n}\napp-debate-faction-rail {\n  min-width: 0;\n  min-height: 0;\n}\n.left-faction-rail {\n  grid-column: 1;\n}\n.right-faction-rail {\n  grid-column: 3;\n}\n.chamber-center {\n  position: relative;\n  z-index: 6;\n  display: grid;\n  min-width: 0;\n  min-height: 0;\n  grid-template-rows: auto minmax(0, 1fr) auto;\n  padding: 0.8rem clamp(0.75rem, 2vw, 2rem);\n}\n.docket-details {\n  position: absolute;\n  z-index: 25;\n  top: 4.7rem;\n  right: clamp(0.75rem, 2vw, 2rem);\n  left: clamp(0.75rem, 2vw, 2rem);\n  max-height: calc(100% - 7rem);\n  overflow: auto;\n  border: 1px solid #cba65f;\n  padding: 1rem;\n  color: #332014;\n  background:\n    linear-gradient(\n      135deg,\n      #f1ddb0,\n      #caa66e);\n  box-shadow: 0 1.4rem 3rem rgba(0, 0, 0, 0.8);\n}\n.docket-details header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: #704529;\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.docket-details header button {\n  border: 0;\n  color: #5b3621;\n  background: transparent;\n  font-size: 1.3rem;\n  cursor: pointer;\n}\n.docket-details h2 {\n  max-width: 44rem;\n  margin: 0.4rem 0 0.8rem;\n  font: 700 clamp(1.05rem, 2vw, 1.35rem)/1.3 Georgia, serif;\n}\n.docket-positions {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.65rem;\n}\n.docket-positions article {\n  border: 1px solid rgba(122, 78, 44, 0.2705882353);\n  padding: 0.6rem;\n  background: rgba(249, 235, 199, 0.6588235294);\n}\n.docket-positions strong {\n  font: 700 0.75rem Georgia, serif;\n  text-transform: uppercase;\n}\n.docket-positions p {\n  margin: 0.25rem 0 0;\n  font-size: 0.7rem;\n  line-height: 1.4;\n}\n.docket-details ol {\n  display: grid;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  gap: 0.4rem;\n  margin: 0.8rem 0 0;\n  padding: 0;\n  list-style: none;\n}\n.docket-details li {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  align-items: center;\n  gap: 0.35rem;\n  border-top: 1px solid rgba(125, 83, 49, 0.4196078431);\n  padding-top: 0.4rem;\n  color: #69462e;\n  font-size: 0.62rem;\n}\n.docket-details li.current {\n  border-color: #7c281e;\n  color: #5c211b;\n  font-weight: 800;\n}\n.docket-details li span {\n  display: grid;\n  width: 1.25rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid currentColor;\n  border-radius: 50%;\n  font: 700 0.6rem Georgia, serif;\n}\n.floor-focus {\n  display: grid;\n  min-height: 0;\n  place-items: center;\n  padding: clamp(1rem, 4vh, 3rem) 0.5rem;\n  transition: opacity 180ms ease;\n}\n.floor-focus.workbench-open {\n  opacity: 0;\n  pointer-events: none;\n}\n.floor-call,\n.chair-decree {\n  width: min(46rem, 100%);\n  padding: 1rem clamp(1rem, 2.7vw, 2.2rem) 1.2rem;\n  color: #ead9b6;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(22, 11, 7, 0.9098039216) 12%,\n      rgba(22, 11, 7, 0.9098039216) 88%,\n      transparent);\n  text-align: center;\n  text-shadow: 0 0.18rem 0.45rem #000;\n}\n.record-alert,\n.chair-decree > span {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.48rem;\n  color: #e6bf6c;\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\n.record-alert::before {\n  width: 0.45rem;\n  height: 0.45rem;\n  border-radius: 50%;\n  background: #d68a45;\n  box-shadow: 0 0 1rem #efb560;\n  content: "";\n}\n.floor-call h1,\n.chair-decree h1 {\n  margin: 0.45rem auto 0.55rem;\n  color: #fff0c8;\n  font: 500 clamp(1.5rem, 3.2vw, 2.8rem)/1.08 Georgia, serif;\n  letter-spacing: 0.025em;\n  text-transform: uppercase;\n}\n.floor-call > p,\n.chair-decree > p {\n  margin: 0;\n  color: #dec58d;\n  font: 600 0.86rem/1.45 Georgia, serif;\n}\n.floor-call blockquote {\n  margin: 1rem auto 0;\n  border-top: 1px solid rgba(197, 161, 92, 0.3215686275);\n  padding-top: 0.75rem;\n  color: #bfae89;\n  font: italic 0.78rem/1.4 Georgia, serif;\n}\n.chair-decree {\n  position: relative;\n  border-block: 1px solid rgba(213, 173, 94, 0.431372549);\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(37, 22, 14, 0.9490196078) 9%,\n      rgba(37, 22, 14, 0.9490196078) 91%,\n      transparent);\n}\n.decree-seal {\n  display: grid;\n  width: 4.4rem;\n  margin: 0 auto 0.7rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 0.24rem double #dbb561;\n  border-radius: 50%;\n  color: #efd18a;\n  background: #6f2b24;\n  box-shadow: 0 0 2rem rgba(211, 158, 71, 0.3019607843);\n  font: 700 1.15rem Georgia, serif;\n}\n.decree-actions {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 0.55rem;\n  margin-top: 1rem;\n}\n.decree-actions button,\n.teacher-decree button {\n  border: 1px solid #c9a45f;\n  padding: 0.65rem 0.85rem;\n  color: #ead6a7;\n  background: #342016;\n  cursor: pointer;\n}\n.decree-actions .primary,\n.teacher-decree button {\n  color: #29170d;\n  background: #d7b269;\n  font-weight: 800;\n}\n.initial-opinion {\n  position: absolute;\n  z-index: 20;\n  right: 1rem;\n  bottom: 4.2rem;\n  left: 1rem;\n  border: 1px solid rgba(215, 184, 108, 0.4901960784);\n  padding: 0.8rem;\n  color: #2c1a10;\n  background:\n    linear-gradient(\n      145deg,\n      #f0dbac,\n      #c9a66d);\n  box-shadow: 0 1rem 2.4rem rgba(0, 0, 0, 0.8);\n}\n.initial-opinion > span {\n  color: #70442a;\n  font-size: 0.64rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.initial-opinion h2 {\n  margin: 0.18rem 0;\n  font: 700 1rem Georgia, serif;\n  text-transform: uppercase;\n}\n.initial-opinion p {\n  margin: 0 0 0.5rem;\n  font-size: 0.72rem;\n}\n.initial-opinion div {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.35rem;\n}\n.initial-opinion button {\n  border: 1px solid #714730;\n  padding: 0.45rem;\n  color: #301d13;\n  background: #f8ebc9;\n  font: 700 0.66rem/1.2 Georgia, serif;\n  cursor: pointer;\n}\n.session-building {\n  display: flex;\n  min-height: 2.9rem;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.7rem;\n  border-top: 1px solid rgba(212, 174, 99, 0.2588235294);\n  padding: 0.55rem 0.8rem;\n  color: #a99a7e;\n  background: rgba(19, 11, 8, 0.7803921569);\n}\n.session-building div {\n  display: grid;\n}\n.session-building span {\n  font: 700 0.68rem Georgia, serif;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n.session-building small {\n  margin-top: 0.08rem;\n  font-size: 0.61rem;\n}\n.session-building.ready {\n  border: 1px solid #d9b468;\n  color: #f0dbab;\n  background: rgba(43, 25, 15, 0.9490196078);\n  box-shadow: 0 0 1.8rem rgba(217, 170, 81, 0.3215686275);\n}\n.session-building button {\n  border: 1px solid #edca7e;\n  padding: 0.55rem 0.7rem;\n  color: #29170e;\n  background: #dfbd72;\n  font: 800 0.66rem Georgia, serif;\n  text-transform: uppercase;\n  cursor: pointer;\n}\n.filing-flight {\n  position: absolute;\n  z-index: 250;\n  inset: 0;\n  display: grid;\n  place-content: center;\n  pointer-events: none;\n  background:\n    radial-gradient(\n      circle,\n      rgba(18, 9, 6, 0.6588235294),\n      rgba(9, 5, 3, 0.3019607843) 45%,\n      transparent 72%);\n  text-align: center;\n}\n.flying-scroll {\n  display: grid;\n  width: 8.5rem;\n  height: 5.2rem;\n  place-items: center;\n  margin: 0 auto 0.7rem;\n  border: 1px solid #9c713f;\n  color: #6b311f;\n  background:\n    linear-gradient(\n      135deg,\n      #f1ddb0,\n      #caa66e);\n  box-shadow: 0 0 2.7rem rgba(240, 182, 92, 0.5803921569);\n  transform: rotate(-5deg);\n  animation: fly-and-seal 1.45s ease both;\n}\n.flying-scroll span {\n  display: grid;\n  width: 2.8rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 0.22rem double #d1a452;\n  border-radius: 50%;\n  color: #f2cf84;\n  background: #762d25;\n  font: 700 0.65rem Georgia, serif;\n}\n.filing-flight strong,\n.filing-flight small {\n  display: block;\n  color: #f4dfb2;\n  text-shadow: 0 0.14rem 0.4rem #000;\n}\n.filing-flight strong {\n  font: 700 1.15rem Georgia, serif;\n  text-transform: uppercase;\n}\n.filing-flight small {\n  margin-top: 0.25rem;\n  color: #c8b48b;\n}\n.wax-notice {\n  position: fixed;\n  z-index: 350;\n  right: 1rem;\n  bottom: 1rem;\n  display: flex;\n  max-width: 32rem;\n  align-items: center;\n  gap: 1rem;\n  border: 1px solid #d6b56e;\n  padding: 0.75rem 0.9rem;\n  color: #fff0cc;\n  background: rgba(53, 32, 22, 0.9607843137);\n  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.6);\n  font-size: 0.82rem;\n}\n.wax-notice.error {\n  border-color: #d66d5c;\n  background: rgba(82, 28, 22, 0.9803921569);\n}\n.wax-notice button {\n  border: 0;\n  color: inherit;\n  background: transparent;\n  font-size: 1.2rem;\n  cursor: pointer;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n}\n@keyframes breathe {\n  to {\n    opacity: 0.55;\n    transform: skewX(-7deg) translateX(-1.5rem);\n  }\n}\n@keyframes point-outward {\n  to {\n    transform: translateX(0.3rem);\n  }\n}\n@keyframes fly-and-seal {\n  0% {\n    opacity: 0;\n    transform: translateX(-8rem) rotate(-10deg) scale(0.75);\n  }\n  55% {\n    opacity: 1;\n    transform: translateX(0) rotate(2deg) scale(1.05);\n  }\n  100% {\n    opacity: 0;\n    transform: translateX(8rem) rotate(8deg) scale(0.88);\n  }\n}\n@media (max-width: 1100px) {\n  .chamber {\n    grid-template-columns: 14rem minmax(18rem, 1fr) 14rem;\n  }\n  .chamber-center {\n    padding-inline: 0.7rem;\n  }\n  .docket-details ol {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 820px) {\n  .debate-studio {\n    overflow: auto;\n  }\n  .chamber-order {\n    grid-template-columns: auto 1fr auto;\n  }\n  .session-title span,\n  .shared-status small,\n  .republic-seal small {\n    display: none;\n  }\n  .chamber {\n    grid-template-areas: "center center" "left right";\n    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n    grid-template-rows: minmax(31rem, auto) auto;\n    overflow: visible;\n    background-attachment: fixed;\n  }\n  .chamber-center {\n    grid-area: center;\n    min-height: 31rem;\n  }\n  .left-faction-rail {\n    grid-area: left;\n  }\n  .right-faction-rail {\n    grid-area: right;\n  }\n}\n@media (max-width: 580px) {\n  .session-title strong {\n    font-size: 0.78rem;\n  }\n  .shared-status span {\n    max-width: 5rem;\n    font-size: 0.61rem;\n  }\n  .chamber {\n    grid-template-areas: "center" "left" "right";\n    grid-template-columns: 1fr;\n  }\n  .docket-positions,\n  .initial-opinion div {\n    grid-template-columns: 1fr;\n  }\n  .initial-opinion {\n    position: relative;\n    right: auto;\n    bottom: auto;\n    left: auto;\n    margin: 0.7rem 0;\n  }\n  .floor-call h1,\n  .chair-decree h1 {\n    font-size: 1.35rem;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n.chamber-order:has(+ .persistent-debate) {\n  display: grid;\n  grid-template-columns: minmax(10rem, 1.1fr) minmax(16rem, 2.25fr) minmax(8rem, 1fr) auto auto auto;\n  min-height: 4.7rem;\n  height: 5.7rem;\n  box-sizing: border-box;\n  gap: clamp(0.5rem, 1vw, 1rem);\n  padding: 0.5rem 1rem;\n}\n.chamber-order:has(+ .persistent-debate) .session-title {\n  margin: 0;\n  text-align: left;\n}\n.chamber-order:has(+ .persistent-debate) .session-title > span,\n.chamber-order:has(+ .persistent-debate) .shared-status small {\n  display: block;\n}\n.chamber.persistent-debate {\n  display: grid;\n  width: 100%;\n  height: calc(100dvh - 8.95rem);\n  min-height: 38rem;\n  grid-template-columns: 15% minmax(0, 70%) 15%;\n  align-items: stretch;\n  overflow: hidden;\n  padding: 0;\n}\n.persistent-debate .chamber-center {\n  width: auto;\n  height: 100%;\n  min-height: 0;\n  grid-column: 2;\n  margin: 0;\n  overflow: hidden;\n  padding: 0;\n}\n.persistent-debate .left-faction-rail {\n  grid-column: 1;\n}\n.persistent-debate .right-faction-rail {\n  grid-column: 3;\n}\n@media (max-width: 1050px) {\n  .chamber-order:has(+ .persistent-debate) {\n    grid-template-columns: minmax(9rem, 1fr) minmax(14rem, 2fr) auto auto;\n  }\n  .chamber-order:has(+ .persistent-debate) .round-status {\n    display: none;\n  }\n  .chamber-order:has(+ .persistent-debate) .shared-status small {\n    display: none;\n  }\n  .chamber.persistent-debate {\n    grid-template-columns: 18% minmax(0, 64%) 18%;\n  }\n}\n@media (max-width: 820px) {\n  .chamber-order:has(+ .persistent-debate) {\n    grid-template-columns: 1fr auto auto;\n  }\n  .chamber-order:has(+ .persistent-debate) .debate-question,\n  .chamber-order:has(+ .persistent-debate) .round-status {\n    display: none;\n  }\n  .chamber.persistent-debate {\n    height: auto;\n    min-height: calc(100dvh - 4.7rem);\n    grid-template-areas: "center" "left" "right";\n    grid-template-columns: 1fr;\n    grid-template-rows: minmax(42rem, 100dvh) auto auto;\n    overflow: visible;\n  }\n  .persistent-debate .chamber-center {\n    grid-area: center;\n  }\n  .persistent-debate .left-faction-rail {\n    grid-area: left;\n  }\n  .persistent-debate .right-faction-rail {\n    grid-area: right;\n  }\n}\n/*# sourceMappingURL=debate-studio-page.component.css.map */\n'] }]
  }], () => [], { debateThread: [{
    type: ViewChild,
    args: [DebateThreadComponent]
  }], debateComposer: [{
    type: ViewChild,
    args: [DebateComposerDockComponent]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DebateStudioPageComponent, { className: "DebateStudioPageComponent", filePath: "src/app/templates/debate-studio/ui/debate-studio-page.component.ts", lineNumber: 25 });
})();
export {
  DebateStudioPageComponent
};
//# debugId=f21efae5-c74b-5292-84b5-7dea1dec0152
//# sourceMappingURL=chunk-CFN2X6MP.js.map
