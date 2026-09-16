import {
  SIMULATION_DECISION_BUILDER_INFO,
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PROJECT_ROUTE,
  marketAt
} from "./chunk-OGBAME5W.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-UW6DFD2Z.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  Component,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/simulation-decision/ui/builder-info/simulation-decision-builder-info.component.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.phase;
var _forTrack3 = ($index, $item) => $item.path;
var _forTrack4 = ($index, $item) => $item.version;
function SimulationDecisionBuilderInfoComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 9)(1, "strong");
    \u0275\u0275text(2, "Builder snapshot needs an update.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" Notes describe v", ctx_r0.info.snapshotVersion, ", but the live configuration is v", ctx_r0.config.projectVersion, ". Update the builder snapshot before relying on its change log. ");
  }
}
function SimulationDecisionBuilderInfoComponent_For_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const setting_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(setting_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(setting_r2.value);
  }
}
function SimulationDecisionBuilderInfoComponent_For_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r3 = ctx.$implicit;
    const $index_r4 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r4 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r3);
  }
}
function SimulationDecisionBuilderInfoComponent_For_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "dl")(8, "div")(9, "dt");
    \u0275\u0275text(10, "Gate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "dd");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div")(14, "dt");
    \u0275\u0275text(15, "Goods open");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "dd");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div")(19, "dt");
    \u0275\u0275text(20, "Routes open");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "dd");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const stage_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Level ", stage_r5.number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stage_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stage_r5.description);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(stage_r5.requirement);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", stage_r5.availableGoodIds.length, " / ", ctx_r0.config.goods.length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", stage_r5.availableRouteIds.length, " / ", ctx_r0.config.routes.length);
  }
}
function SimulationDecisionBuilderInfoComponent_For_145_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "code");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td")(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const route_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(route_r6.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", route_r6.from, " \u2192 ", route_r6.to);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(route_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(route_r6.firstStage);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(route_r6.estimatedDays);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.money(route_r6.supplyCostCents));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("risk " + route_r6.risk);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(route_r6.risk);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(route_r6.market);
  }
}
function SimulationDecisionBuilderInfoComponent_For_157_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 39);
    \u0275\u0275text(2, "\u2725");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r7);
  }
}
function SimulationDecisionBuilderInfoComponent_For_169_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const phase_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Depends on: ", phase_r8.dependsOn);
  }
}
function SimulationDecisionBuilderInfoComponent_For_169_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, SimulationDecisionBuilderInfoComponent_For_169_Conditional_7_Template, 2, 1, "small");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const phase_r8 = ctx.$implicit;
    \u0275\u0275classMap("roadmap-card " + phase_r8.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(phase_r8.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(phase_r8.phase);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(phase_r8.outcome);
    \u0275\u0275advance();
    \u0275\u0275conditional(phase_r8.dependsOn ? 7 : -1);
  }
}
function SimulationDecisionBuilderInfoComponent_For_182_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 8);
    \u0275\u0275text(1, "Open");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", item_r9.path);
  }
}
function SimulationDecisionBuilderInfoComponent_For_182_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function SimulationDecisionBuilderInfoComponent_For_182_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const item_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.copyPath(item_r9));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.copiedPath() === item_r9.path ? "\u2713 Copied" : "Copy path");
  }
}
function SimulationDecisionBuilderInfoComponent_For_182_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "code");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, SimulationDecisionBuilderInfoComponent_For_182_Conditional_10_Template, 2, 1, "a", 8)(11, SimulationDecisionBuilderInfoComponent_For_182_Conditional_11_Template, 2, 1, "button", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap("kind " + item_r9.kind);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r9.kind);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r9.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r9.path);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r9.purpose);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r9.kind === "app" ? 10 : 11);
  }
}
function SimulationDecisionBuilderInfoComponent_ForEmpty_183_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 34);
    \u0275\u0275text(1, "No paths match that filter.");
    \u0275\u0275elementEnd();
  }
}
function SimulationDecisionBuilderInfoComponent_For_195_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const change_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(change_r11);
  }
}
function SimulationDecisionBuilderInfoComponent_For_195_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "header")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "ul");
    \u0275\u0275repeaterCreate(10, SimulationDecisionBuilderInfoComponent_For_195_For_11_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const release_r12 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("v", release_r12.version);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(release_r12.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(release_r12.date);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(release_r12.changes);
  }
}
function SimulationDecisionBuilderInfoComponent_For_205_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const guardrail_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(guardrail_r13);
  }
}
var SimulationDecisionBuilderInfoComponent = class _SimulationDecisionBuilderInfoComponent {
  route = inject(ActivatedRoute);
  config = inject(SIMULATION_DECISION_CONFIG);
  info = inject(SIMULATION_DECISION_BUILDER_INFO, { optional: true }) ?? this.route.snapshot.data["builderInfo"];
  studentRoute = inject(SIMULATION_DECISION_PROJECT_ROUTE, { optional: true }) ?? "/frontier-trading";
  pathQuery = signal(
    "",
    ...ngDevMode ? [{ debugName: "pathQuery" }] : (
      /* istanbul ignore next */
      []
    )
  );
  copiedPath = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "copiedPath" }] : (
      /* istanbul ignore next */
      []
    )
  );
  snapshotAligned = computed(
    () => this.info.snapshotVersion === this.config.projectVersion,
    ...ngDevMode ? [{ debugName: "snapshotAligned" }] : (
      /* istanbul ignore next */
      []
    )
  );
  progressionStages = computed(
    () => (this.config.choiceProgression?.stages ?? []).map((stage, index) => __spreadProps(__spreadValues({}, stage), {
      number: index + 1,
      requirement: this.requirementLabel(stage.requirements)
    })),
    ...ngDevMode ? [{ debugName: "progressionStages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  routeRows = computed(
    () => this.config.routes.map((route) => __spreadProps(__spreadValues({}, route), {
      from: this.locationName(route.fromLocationId),
      to: this.locationName(route.toLocationId),
      market: marketAt(this.config, route.toLocationId)?.name ?? "No market configured",
      firstStage: this.config.choiceProgression?.stages.find((stage) => stage.availableRouteIds.includes(route.id))?.title ?? "Always open"
    })),
    ...ngDevMode ? [{ debugName: "routeRows" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filteredPaths = computed(
    () => {
      const query = this.pathQuery().trim().toLowerCase();
      return query.length === 0 ? this.info.paths : this.info.paths.filter((item) => `${item.label} ${item.path} ${item.purpose} ${item.kind}`.toLowerCase().includes(query));
    },
    ...ngDevMode ? [{ debugName: "filteredPaths" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentSettings = computed(
    () => [
      { label: "Project version", value: this.config.projectVersion },
      {
        label: "Schema / template",
        value: `${this.config.schemaVersion} / ${this.config.template.version}`
      },
      { label: "Starting cash", value: this.money(this.config.startingCashCents) },
      { label: "Profit target", value: this.money(this.config.profitTargetCents) },
      { label: "Reserve target", value: this.money(this.config.reserveTargetCents) },
      { label: "Season length", value: `${this.config.maxSeasonDays} days` },
      {
        label: "Goods / markets",
        value: `${this.config.goods.length} / ${this.config.markets.length}`
      },
      {
        label: "Routes / events",
        value: `${this.config.routes.length} / ${this.config.events.length}`
      },
      { label: "Transports", value: `${this.config.transports.length}` },
      { label: "Reflection prompts", value: `${this.config.reportSections.length}` },
      {
        label: "Forecast gate",
        value: this.config.routeForecastChallenge?.requiredBeforeDeparture ? `Required \xB7 \xB1${this.config.routeForecastChallenge.toleranceCents}\xA2` : "Not required"
      },
      {
        label: "Transaction math",
        value: this.config.transactionMath?.answerRequired ? `Required \xB7 ${this.transactionDiscountSummary()}` : "Not required"
      },
      { label: "Score", value: "40 Trading \xB7 40 Math \xB7 20 Explain" }
    ],
    ...ngDevMode ? [{ debugName: "currentSettings" }] : (
      /* istanbul ignore next */
      []
    )
  );
  async copyPath(item) {
    try {
      await navigator.clipboard.writeText(item.path);
      this.copiedPath.set(item.path);
      window.setTimeout(() => {
        if (this.copiedPath() === item.path)
          this.copiedPath.set(void 0);
      }, 1600);
    } catch {
      this.copiedPath.set(void 0);
    }
  }
  async copySnapshot() {
    const snapshot = {
      project: `${this.config.projectId}@${this.config.projectVersion}`,
      schemaVersion: this.config.schemaVersion,
      templateVersion: this.config.template.version,
      currentMode: this.info.currentMode,
      studentPath: this.info.studentPath,
      settings: this.currentSettings(),
      progression: this.progressionStages(),
      routes: this.routeRows().map(({ id, from, to, estimatedDays, supplyCostCents, firstStage }) => ({
        id,
        from,
        to,
        estimatedDays,
        supplyCostCents,
        firstStage
      })),
      roadmap: this.info.roadmap
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(snapshot, null, 2));
      this.copiedPath.set("__snapshot__");
      window.setTimeout(() => {
        if (this.copiedPath() === "__snapshot__")
          this.copiedPath.set(void 0);
      }, 1600);
    } catch {
      this.copiedPath.set(void 0);
    }
  }
  money(cents) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
  }
  transactionDiscountSummary() {
    const tiers = [...this.config.transactionMath?.purchaseDiscountTiers ?? []].sort((left, right) => left.minimumQuantity - right.minimumQuantity);
    return tiers.map((tier, index) => {
      const next = tiers[index + 1];
      const quantities = next ? `${tier.minimumQuantity}\u2013${next.minimumQuantity - 1}` : `${tier.minimumQuantity}+`;
      return `${quantities} units: ${tier.discountPercent}%`;
    }).join(" \xB7 ");
  }
  locationName(locationId) {
    return this.config.locations.find((location) => location.id === locationId)?.shortName ?? locationId;
  }
  requirementLabel(requirements) {
    if (requirements === void 0)
      return "Starts open";
    const labels = [];
    if (requirements.minimumDiscoveredStalls !== void 0) {
      labels.push(`Visit ${requirements.minimumDiscoveredStalls} shops`);
    }
    if (requirements.minimumPurchasedGoodTypes !== void 0) {
      labels.push(`Buy ${requirements.minimumPurchasedGoodTypes} kinds of goods`);
    }
    return labels.join(" + ") || "No gate";
  }
  static \u0275fac = function SimulationDecisionBuilderInfoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SimulationDecisionBuilderInfoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SimulationDecisionBuilderInfoComponent, selectors: [["app-simulation-decision-builder-info"]], decls: 214, vars: 21, consts: [[1, "builder-page"], [1, "builder-bar"], ["routerLink", "/projects"], [1, "open-game", 3, "routerLink"], [1, "builder-hero"], [1, "eyebrow"], [1, "hero-actions"], ["type", "button", 3, "click"], [3, "routerLink"], ["role", "alert", 1, "stale-warning"], ["aria-label", "Builder page sections", 1, "page-index"], ["href", "#settings"], ["href", "#student-path"], ["href", "#scaffolding"], ["href", "#routes"], ["href", "#hbc"], ["href", "#roadmap"], ["href", "#files"], ["href", "#changes"], ["id", "settings", 1, "page-section", "settings-section"], [1, "settings-grid"], ["id", "student-path", 1, "page-section", "path-section"], ["id", "scaffolding", 1, "page-section"], [1, "stage-grid"], [1, "assessment-grid"], ["id", "routes", 1, "page-section", "route-section"], [1, "table-wrap"], ["id", "hbc", 1, "page-section", "hbc-section"], ["id", "roadmap", 1, "page-section", "roadmap-section"], [1, "roadmap"], [3, "class"], ["id", "files", 1, "page-section", "files-section"], ["type", "search", "placeholder", "route, engine, HBC, competition\u2026", 3, "ngModelChange", "ngModel"], [1, "file-list"], [1, "empty"], ["id", "changes", 1, "page-section", "changes-section"], [1, "change-list"], [1, "page-section", "guardrail-section"], [1, "builder-footer"], ["aria-hidden", "true"], ["type", "button"]], template: function SimulationDecisionBuilderInfoComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "header", 1)(2, "a", 2);
      \u0275\u0275text(3, "\u2190 Project library");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div")(5, "span");
      \u0275\u0275text(6, "Builder information");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "strong");
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "a", 3);
      \u0275\u0275text(10, "Open student game \u2192");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "section", 4)(12, "div")(13, "span", 5);
      \u0275\u0275text(14, "Current source of truth");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "h1");
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p");
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 6)(20, "button", 7);
      \u0275\u0275listener("click", function SimulationDecisionBuilderInfoComponent_Template_button_click_20_listener() {
        return ctx.copySnapshot();
      });
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "a", 8);
      \u0275\u0275text(23, "Preview student path");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "aside")(25, "small");
      \u0275\u0275text(26, "Current release");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "strong");
      \u0275\u0275text(28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "span");
      \u0275\u0275text(30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "p");
      \u0275\u0275text(32);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(33, SimulationDecisionBuilderInfoComponent_Conditional_33_Template, 5, 2, "section", 9);
      \u0275\u0275elementStart(34, "nav", 10)(35, "a", 11);
      \u0275\u0275text(36, "Settings");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "a", 12);
      \u0275\u0275text(38, "Student path");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "a", 13);
      \u0275\u0275text(40, "Scaffolding");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "a", 14);
      \u0275\u0275text(42, "Route paths");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "a", 15);
      \u0275\u0275text(44, "HBC direction");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "a", 16);
      \u0275\u0275text(46, "Roadmap");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "a", 17);
      \u0275\u0275text(48, "Files");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "a", 18);
      \u0275\u0275text(50, "Changes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "section", 19)(52, "header")(53, "div")(54, "span", 5);
      \u0275\u0275text(55, "Read from live configuration");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "h2");
      \u0275\u0275text(57, "Current settings");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "p");
      \u0275\u0275text(59, "These values update automatically when the project configuration changes.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "div", 20);
      \u0275\u0275repeaterCreate(61, SimulationDecisionBuilderInfoComponent_For_62_Template, 5, 2, "article", null, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "section", 21)(64, "header")(65, "div")(66, "span", 5);
      \u0275\u0275text(67, "Student experience");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "h2");
      \u0275\u0275text(69, "Current learning path");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(70, "p");
      \u0275\u0275text(71, "The easy base comes first; harder forecast and audit work is added later.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(72, "ol");
      \u0275\u0275repeaterCreate(73, SimulationDecisionBuilderInfoComponent_For_74_Template, 5, 2, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(75, "section", 22)(76, "header")(77, "div")(78, "span", 5);
      \u0275\u0275text(79, "Configuration-driven gates");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "h2");
      \u0275\u0275text(81, "Choice scaffolding");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(82, "p");
      \u0275\u0275text(83, "Changing a stage updates goods and routes without changing the generic UI component.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(84, "div", 23);
      \u0275\u0275repeaterCreate(85, SimulationDecisionBuilderInfoComponent_For_86_Template, 23, 8, "article", null, _forTrack1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "div", 24)(88, "article")(89, "span", 5);
      \u0275\u0275text(90, "Harder math gate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(91, "h3");
      \u0275\u0275text(92, "Profit forecast");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "p");
      \u0275\u0275text(94, "Students calculate destination sales, then subtract goods and travel costs before departure.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(95, "article")(96, "span", 5);
      \u0275\u0275text(97, "Route event");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(98, "h3");
      \u0275\u0275text(99, "Guaranteed math");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(100, "p");
      \u0275\u0275text(101, "Every committed route schedules a math event and requires a correct answer to continue.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(102, "article")(103, "span", 5);
      \u0275\u0275text(104, "End audit");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(105, "h3");
      \u0275\u0275text(106, "Forecast versus actual");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(107, "p");
      \u0275\u0275text(108, "Results isolate the difference caused by prices, trail costs, events, and decisions.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(109, "article")(110, "span", 5);
      \u0275\u0275text(111, "Final response");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(112, "h3");
      \u0275\u0275text(113);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(114, "p");
      \u0275\u0275text(115);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(116, "section", 25)(117, "header")(118, "div")(119, "span", 5);
      \u0275\u0275text(120, "Live route configuration");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(121, "h2");
      \u0275\u0275text(122, "Current route paths");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(123, "p");
      \u0275\u0275text(124, "This is the practice network. It is not labeled as the final historical HBC network.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(125, "div", 26)(126, "table")(127, "thead")(128, "tr")(129, "th");
      \u0275\u0275text(130, "Route ID");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(131, "th");
      \u0275\u0275text(132, "Path");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(133, "th");
      \u0275\u0275text(134, "Open at");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(135, "th");
      \u0275\u0275text(136, "Days");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(137, "th");
      \u0275\u0275text(138, "Cost");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(139, "th");
      \u0275\u0275text(140, "Risk");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(141, "th");
      \u0275\u0275text(142, "Destination market");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(143, "tbody");
      \u0275\u0275repeaterCreate(144, SimulationDecisionBuilderInfoComponent_For_145_Template, 20, 11, "tr", null, _forTrack1);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(146, "section", 27)(147, "header")(148, "div")(149, "span", 5);
      \u0275\u0275text(150, "Historical build status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(151, "h2");
      \u0275\u0275text(152, "HBC direction and boundaries");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(153, "p");
      \u0275\u0275text(154, "Read this before changing route names, vehicles, map art, events, or historical claims.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(155, "ul");
      \u0275\u0275repeaterCreate(156, SimulationDecisionBuilderInfoComponent_For_157_Template, 5, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(158, "section", 28)(159, "header")(160, "div")(161, "span", 5);
      \u0275\u0275text(162, "Competition delivery path");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(163, "h2");
      \u0275\u0275text(164, "Builder roadmap");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(165, "p");
      \u0275\u0275text(166, "The next safe implementation slice is the reviewed HBC scenario package.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(167, "div", 29);
      \u0275\u0275repeaterCreate(168, SimulationDecisionBuilderInfoComponent_For_169_Template, 8, 6, "article", 30, _forTrack2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(170, "section", 31)(171, "header")(172, "div")(173, "span", 5);
      \u0275\u0275text(174, "Application, source, and document locations");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(175, "h2");
      \u0275\u0275text(176, "Builder paths");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(177, "label");
      \u0275\u0275text(178, "Filter paths");
      \u0275\u0275elementStart(179, "input", 32);
      \u0275\u0275listener("ngModelChange", function SimulationDecisionBuilderInfoComponent_Template_input_ngModelChange_179_listener($event) {
        return ctx.pathQuery.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(180, "div", 33);
      \u0275\u0275repeaterCreate(181, SimulationDecisionBuilderInfoComponent_For_182_Template, 12, 7, "article", null, _forTrack3, false, SimulationDecisionBuilderInfoComponent_ForEmpty_183_Template, 2, 0, "p", 34);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(184, "section", 35)(185, "header")(186, "div")(187, "span", 5);
      \u0275\u0275text(188, "Versioned builder snapshot");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(189, "h2");
      \u0275\u0275text(190, "Latest changes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(191, "p");
      \u0275\u0275text(192, "Edit the builder snapshot whenever curriculum, gates, scoring, or architecture changes.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(193, "div", 36);
      \u0275\u0275repeaterCreate(194, SimulationDecisionBuilderInfoComponent_For_195_Template, 12, 3, "article", null, _forTrack4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(196, "section", 37)(197, "header")(198, "div")(199, "span", 5);
      \u0275\u0275text(200, "Do not bypass");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(201, "h2");
      \u0275\u0275text(202, "Builder guardrails");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(203, "ul");
      \u0275\u0275repeaterCreate(204, SimulationDecisionBuilderInfoComponent_For_205_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(206, "footer", 38)(207, "div")(208, "strong");
      \u0275\u0275text(209);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(210, "span");
      \u0275\u0275text(211);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(212, "a", 8);
      \u0275\u0275text(213, "Return to student game \u2192");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.config.title);
      \u0275\u0275advance();
      \u0275\u0275property("routerLink", ctx.studentRoute);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.info.projectLabel);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.info.statusSummary);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.copiedPath() === "__snapshot__" ? "\u2713 Snapshot copied" : "Copy current snapshot", " ");
      \u0275\u0275advance();
      \u0275\u0275property("routerLink", ctx.studentRoute);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("v", ctx.config.projectVersion);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.info.currentMode);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Snapshot updated ", ctx.info.updatedAt);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.snapshotAligned() ? 33 : -1);
      \u0275\u0275advance(28);
      \u0275\u0275repeater(ctx.currentSettings());
      \u0275\u0275advance(12);
      \u0275\u0275repeater(ctx.info.studentPath);
      \u0275\u0275advance(12);
      \u0275\u0275repeater(ctx.progressionStages());
      \u0275\u0275advance(28);
      \u0275\u0275textInterpolate1("", ctx.config.reportSections.length, " reflection prompts");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate4("", ctx.config.reportSections[0]?.title, " \xB7 ", ctx.config.reportSections[1]?.title, " \xB7 ", ctx.config.reportSections[2]?.title, " \xB7 ", ctx.config.reportSections[3]?.title);
      \u0275\u0275advance(29);
      \u0275\u0275repeater(ctx.routeRows());
      \u0275\u0275advance(12);
      \u0275\u0275repeater(ctx.info.historicalDirection);
      \u0275\u0275advance(12);
      \u0275\u0275repeater(ctx.info.roadmap);
      \u0275\u0275advance(11);
      \u0275\u0275property("ngModel", ctx.pathQuery());
      \u0275\u0275control();
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.filteredPaths());
      \u0275\u0275advance(13);
      \u0275\u0275repeater(ctx.info.changes);
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.info.guardrails);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2("", ctx.config.projectId, "@", ctx.config.projectVersion);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.info.updatedBy);
      \u0275\u0275advance();
      \u0275\u0275property("routerLink", ctx.studentRoute);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  color: #25322f;\n  background: #e8e5dc;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\n[_nghost-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%] {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\na[_ngcontent-%COMP%] {\n  color: inherit;\n}\n.builder-page[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n}\n.builder-bar[_ngcontent-%COMP%] {\n  position: sticky;\n  z-index: 20;\n  top: 0;\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  gap: 1rem;\n  min-height: 4rem;\n  padding: 0.65rem max(1rem, (100vw - 80rem) / 2);\n  color: #f8ecd0;\n  background: #172b28;\n  box-shadow: 0 0.35rem 1rem rgba(12, 23, 21, 0.2901960784);\n}\n.builder-bar[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n}\n.builder-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #9ebcb4;\n  font-size: 0.62rem;\n  font-weight: 850;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.builder-bar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 0.76rem;\n  font-weight: 800;\n  text-decoration: none;\n}\n.builder-bar[_ngcontent-%COMP%]   .open-game[_ngcontent-%COMP%] {\n  justify-self: end;\n  color: #f0cb73;\n}\n.builder-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 19rem;\n  gap: 2rem;\n  padding: 3.5rem max(1rem, (100vw - 80rem) / 2);\n  color: #fff7e4;\n  background:\n    radial-gradient(\n      circle at 80% 10%,\n      rgba(198, 146, 61, 0.2196078431),\n      transparent 24rem),\n    linear-gradient(\n      125deg,\n      #233f38,\n      #132824 70%);\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: #9a671c;\n  font-size: 0.66rem;\n  font-weight: 900;\n  letter-spacing: 0.13em;\n  text-transform: uppercase;\n}\n.builder-hero[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: #e1b65e;\n}\n.builder-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  max-width: 52rem;\n  margin: 0.35rem 0 0.8rem;\n  font-size: clamp(2.2rem, 5vw, 4.5rem);\n  line-height: 0.96;\n}\n.builder-hero[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  max-width: 53rem;\n  color: #c8d8d2;\n  line-height: 1.65;\n}\n.builder-hero[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: center;\n  gap: 0.35rem;\n  border: 1px solid #52736a;\n  border-radius: 0.8rem;\n  padding: 1.25rem;\n  background: rgba(13, 33, 30, 0.7803921569);\n}\n.builder-hero[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #96b7ad;\n  text-transform: uppercase;\n}\n.builder-hero[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #efca70;\n  font: 900 2.3rem Georgia, serif;\n}\n.builder-hero[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 800;\n}\n.builder-hero[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.6rem;\n  color: #9eb5ae;\n  font-size: 0.72rem;\n}\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin-top: 1.2rem;\n}\n.hero-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.hero-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n.file-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.file-list[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  min-height: 2.55rem;\n  border: 1px solid #ad7e32;\n  border-radius: 0.4rem;\n  padding: 0.58rem 0.8rem;\n  color: #fff9e9;\n  background: #825516;\n  font: inherit;\n  font-size: 0.75rem;\n  font-weight: 850;\n  text-decoration: none;\n  cursor: pointer;\n}\n.hero-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #f4e6c3;\n  background: transparent;\n}\n.stale-warning[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  padding: 0.9rem max(1rem, (100vw - 80rem) / 2);\n  color: #6f251d;\n  background: #ffe1c8;\n}\n.page-index[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  padding: 0.75rem max(1rem, (100vw - 80rem) / 2);\n  border-bottom: 1px solid #c8c3b7;\n  background: #f6f3eb;\n}\n.page-index[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  padding: 0.35rem 0.6rem;\n  color: #3f5c55;\n  background: #e2e8e3;\n  font-size: 0.7rem;\n  font-weight: 800;\n  text-decoration: none;\n}\n.page-section[_ngcontent-%COMP%] {\n  width: min(80rem, 100% - 2rem);\n  margin: 0 auto;\n  padding: 2.5rem 0;\n  border-bottom: 1px solid #c8c3b7;\n  scroll-margin-top: 5rem;\n}\n.page-section[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.page-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 0.18rem;\n  color: #253f38;\n  font-size: clamp(1.5rem, 3vw, 2.4rem);\n}\n.page-section[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  max-width: 35rem;\n  color: #66736f;\n  font-size: 0.8rem;\n  line-height: 1.5;\n  text-align: right;\n}\n.settings-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.6rem;\n}\n.settings-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.2rem;\n  min-height: 5rem;\n  align-content: center;\n  border: 1px solid #c7c1b3;\n  border-radius: 0.5rem;\n  padding: 0.8rem;\n  background: #faf8f1;\n}\n.settings-grid[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #69756f;\n  font-size: 0.67rem;\n  text-transform: uppercase;\n}\n.settings-grid[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #23463e;\n}\n.path-section[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.65rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  counter-reset: steps;\n}\n.path-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0.6rem;\n  align-items: start;\n  border: 1px solid #c8bd9f;\n  border-radius: 0.55rem;\n  padding: 0.8rem;\n  background: #fffaf0;\n}\n.path-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.8rem;\n  height: 1.8rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #315d52;\n  font-weight: 900;\n}\n.path-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  line-height: 1.45;\n}\n.stage-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.8rem;\n}\n.stage-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n.assessment-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border: 1px solid #bbb4a4;\n  border-radius: 0.65rem;\n  padding: 1rem;\n  background: #f9f7f0;\n}\n.stage-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #9a641c;\n  font-size: 0.65rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.stage-grid[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.assessment-grid[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.3rem 0;\n  color: #2a4941;\n  font-size: 1.25rem;\n}\n.stage-grid[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.assessment-grid[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #66706d;\n  font-size: 0.76rem;\n  line-height: 1.5;\n}\n.stage-grid[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  margin: 0.8rem 0 0;\n}\n.stage-grid[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.5rem;\n  border-top: 1px solid #ddd5c5;\n  padding-top: 0.35rem;\n  font-size: 0.7rem;\n}\n.stage-grid[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%], \n.stage-grid[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.stage-grid[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  font-weight: 800;\n  text-align: right;\n}\n.assessment-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.6rem;\n  margin-top: 0.8rem;\n}\n.table-wrap[_ngcontent-%COMP%] {\n  overflow: auto;\n  border: 1px solid #bfb8a8;\n  border-radius: 0.65rem;\n  background: #fbfaf5;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.74rem;\n}\nth[_ngcontent-%COMP%], \ntd[_ngcontent-%COMP%] {\n  padding: 0.7rem;\n  border-bottom: 1px solid #ddd7c9;\n  text-align: left;\n  vertical-align: top;\n}\nth[_ngcontent-%COMP%] {\n  color: #edf5f1;\n  background: #31564d;\n  font-size: 0.64rem;\n  text-transform: uppercase;\n}\ntd[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \ntd[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\ntd[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 0.15rem;\n  color: #6d7773;\n}\ncode[_ngcontent-%COMP%] {\n  color: #5b3513;\n  font:\n    700 0.72rem ui-monospace,\n    SFMono-Regular,\n    Consolas,\n    monospace;\n  overflow-wrap: anywhere;\n}\n.risk[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  padding: 0.18rem 0.4rem;\n  font-size: 0.62rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.risk.low[_ngcontent-%COMP%] {\n  color: #286045;\n  background: #d6eadb;\n}\n.risk.moderate[_ngcontent-%COMP%] {\n  color: #795311;\n  background: #f3e2ad;\n}\n.risk.high[_ngcontent-%COMP%] {\n  color: #8c3227;\n  background: #f1d1cb;\n}\n.hbc-section[_ngcontent-%COMP%] {\n  width: 100%;\n  padding-inline: max(1rem, (100vw - 80rem) / 2);\n  color: #f5ead0;\n  background: #2a352f;\n}\n.hbc-section[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: #d9ac57;\n}\n.hbc-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #fff4da;\n}\n.hbc-section[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: #b9c5be;\n}\n.hbc-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.6rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.hbc-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0.6rem;\n  border: 1px solid #536159;\n  border-radius: 0.5rem;\n  padding: 0.8rem;\n  background: #17231f;\n}\n.hbc-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #e2b45b;\n}\n.hbc-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #d1d9d4;\n  font-size: 0.78rem;\n  line-height: 1.5;\n}\n.roadmap[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.55rem;\n}\n.roadmap-card[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 7rem 15rem 1fr;\n  align-items: center;\n  gap: 0.8rem;\n  border-left: 0.35rem solid #7c8782;\n  padding: 0.85rem 1rem;\n  background: #f8f6ef;\n}\n.roadmap-card[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  width: fit-content;\n  border-radius: 999px;\n  padding: 0.2rem 0.45rem;\n  color: #fff;\n  background: #748079;\n  font-size: 0.6rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.roadmap-card.current[_ngcontent-%COMP%] {\n  border-color: #31705d;\n}\n.roadmap-card.current[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  background: #31705d;\n}\n.roadmap-card.next[_ngcontent-%COMP%] {\n  border-color: #b77b25;\n}\n.roadmap-card.next[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  background: #a96718;\n}\n.roadmap-card.blocked[_ngcontent-%COMP%] {\n  border-color: #a34438;\n}\n.roadmap-card.blocked[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  background: #96382d;\n}\n.roadmap-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.roadmap-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #66716d;\n  font-size: 0.73rem;\n}\n.roadmap-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  grid-column: 3;\n}\n.files-section[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n  color: #586862;\n  font-size: 0.66rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.files-section[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: min(24rem, 70vw);\n  border: 1px solid #a9b1ad;\n  border-radius: 0.4rem;\n  padding: 0.55rem;\n  background: #fff;\n  font: inherit;\n}\n.file-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n}\n.file-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 5rem minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 0.8rem;\n  border: 1px solid #c9c3b5;\n  border-radius: 0.45rem;\n  padding: 0.7rem;\n  background: #faf9f4;\n}\n.file-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.15rem;\n}\n.file-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6d7673;\n  font-size: 0.7rem;\n}\n.kind[_ngcontent-%COMP%] {\n  width: fit-content;\n  border-radius: 999px;\n  padding: 0.2rem 0.4rem;\n  font-size: 0.58rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.kind.app[_ngcontent-%COMP%] {\n  color: #28574c;\n  background: #d5e8df;\n}\n.kind.source[_ngcontent-%COMP%] {\n  color: #674515;\n  background: #efe0ba;\n}\n.kind.document[_ngcontent-%COMP%] {\n  color: #493f73;\n  background: #dedaf0;\n}\n.file-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.file-list[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  min-height: 2.25rem;\n  color: #fff;\n  background: #315d53;\n}\n.empty[_ngcontent-%COMP%] {\n  padding: 1rem;\n  color: #6c7773;\n  text-align: center;\n}\n.change-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.75rem;\n}\n.change-list[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%] {\n  border: 1px solid #c4bdad;\n  border-radius: 0.55rem;\n  padding: 0.9rem;\n  background: #faf8f2;\n}\n.change-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  align-items: center;\n}\n.change-list[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  border-radius: 0.3rem;\n  padding: 0.35rem;\n  color: #fff;\n  background: #375c53;\n  font-size: 0.7rem;\n  font-weight: 900;\n}\n.change-list[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #29473f;\n  font-size: 1.05rem;\n}\n.change-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #78817e;\n}\n.change-list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%], \n.guardrail-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0.8rem 0 0;\n  padding-left: 1.15rem;\n  color: #53615d;\n  font-size: 0.74rem;\n  line-height: 1.55;\n}\n.guardrail-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  columns: 2;\n  column-gap: 2rem;\n}\n.guardrail-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  break-inside: avoid;\n  margin-bottom: 0.5rem;\n}\n.builder-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 1.5rem max(1rem, (100vw - 80rem) / 2);\n  color: #d7e2dd;\n  background: #152824;\n}\n.builder-footer[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.2rem;\n}\n.builder-footer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #8fa79f;\n  font-size: 0.68rem;\n}\n.builder-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #e3bd68;\n  font-weight: 850;\n  text-decoration: none;\n}\na[_ngcontent-%COMP%]:focus-visible, \nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #d69c35;\n  outline-offset: 3px;\n}\n@media (max-width: 900px) {\n  .settings-grid[_ngcontent-%COMP%], \n   .path-section[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .stage-grid[_ngcontent-%COMP%], \n   .change-list[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .assessment-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .roadmap-card[_ngcontent-%COMP%] {\n    grid-template-columns: 6rem 1fr;\n  }\n  .roadmap-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .roadmap-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    grid-column: 2;\n  }\n}\n@media (max-width: 650px) {\n  .builder-bar[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr auto;\n  }\n  .builder-bar[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .builder-hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding-block: 2.2rem;\n  }\n  .page-section[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n   .files-section[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n   .builder-footer[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .page-section[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    text-align: left;\n  }\n  .settings-grid[_ngcontent-%COMP%], \n   .path-section[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%], \n   .assessment-grid[_ngcontent-%COMP%], \n   .hbc-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .file-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .file-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n   .file-list[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    width: fit-content;\n  }\n  .guardrail-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n    columns: 1;\n  }\n}\n/*# sourceMappingURL=simulation-decision-builder-info.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SimulationDecisionBuilderInfoComponent, [{
    type: Component,
    args: [{ selector: "app-simulation-decision-builder-info", imports: [FormsModule, RouterLink], template: `<main class="builder-page">
  <header class="builder-bar">
    <a routerLink="/projects">\u2190 Project library</a>
    <div>
      <span>Builder information</span>
      <strong>{{ config.title }}</strong>
    </div>
    <a class="open-game" [routerLink]="studentRoute">Open student game \u2192</a>
  </header>

  <section class="builder-hero">
    <div>
      <span class="eyebrow">Current source of truth</span>
      <h1>{{ info.projectLabel }}</h1>
      <p>{{ info.statusSummary }}</p>
      <div class="hero-actions">
        <button type="button" (click)="copySnapshot()">
          {{ copiedPath() === '__snapshot__' ? '\u2713 Snapshot copied' : 'Copy current snapshot' }}
        </button>
        <a [routerLink]="studentRoute">Preview student path</a>
      </div>
    </div>
    <aside>
      <small>Current release</small>
      <strong>v{{ config.projectVersion }}</strong>
      <span>{{ info.currentMode }}</span>
      <p>Snapshot updated {{ info.updatedAt }}</p>
    </aside>
  </section>

  @if (!snapshotAligned()) {
    <section class="stale-warning" role="alert">
      <strong>Builder snapshot needs an update.</strong>
      <span>
        Notes describe v{{ info.snapshotVersion }}, but the live configuration is
        v{{ config.projectVersion }}. Update the builder snapshot before relying on its change log.
      </span>
    </section>
  }

  <nav class="page-index" aria-label="Builder page sections">
    <a href="#settings">Settings</a>
    <a href="#student-path">Student path</a>
    <a href="#scaffolding">Scaffolding</a>
    <a href="#routes">Route paths</a>
    <a href="#hbc">HBC direction</a>
    <a href="#roadmap">Roadmap</a>
    <a href="#files">Files</a>
    <a href="#changes">Changes</a>
  </nav>

  <section id="settings" class="page-section settings-section">
    <header>
      <div><span class="eyebrow">Read from live configuration</span><h2>Current settings</h2></div>
      <p>These values update automatically when the project configuration changes.</p>
    </header>
    <div class="settings-grid">
      @for (setting of currentSettings(); track setting.label) {
        <article><small>{{ setting.label }}</small><strong>{{ setting.value }}</strong></article>
      }
    </div>
  </section>

  <section id="student-path" class="page-section path-section">
    <header>
      <div><span class="eyebrow">Student experience</span><h2>Current learning path</h2></div>
      <p>The easy base comes first; harder forecast and audit work is added later.</p>
    </header>
    <ol>
      @for (step of info.studentPath; track step) {
        <li><span>{{ $index + 1 }}</span><p>{{ step }}</p></li>
      }
    </ol>
  </section>

  <section id="scaffolding" class="page-section">
    <header>
      <div><span class="eyebrow">Configuration-driven gates</span><h2>Choice scaffolding</h2></div>
      <p>Changing a stage updates goods and routes without changing the generic UI component.</p>
    </header>
    <div class="stage-grid">
      @for (stage of progressionStages(); track stage.id) {
        <article>
          <span>Level {{ stage.number }}</span>
          <h3>{{ stage.title }}</h3>
          <p>{{ stage.description }}</p>
          <dl>
            <div><dt>Gate</dt><dd>{{ stage.requirement }}</dd></div>
            <div><dt>Goods open</dt><dd>{{ stage.availableGoodIds.length }} / {{ config.goods.length }}</dd></div>
            <div><dt>Routes open</dt><dd>{{ stage.availableRouteIds.length }} / {{ config.routes.length }}</dd></div>
          </dl>
        </article>
      }
    </div>
    <div class="assessment-grid">
      <article>
        <span class="eyebrow">Harder math gate</span>
        <h3>Profit forecast</h3>
        <p>Students calculate destination sales, then subtract goods and travel costs before departure.</p>
      </article>
      <article>
        <span class="eyebrow">Route event</span>
        <h3>Guaranteed math</h3>
        <p>Every committed route schedules a math event and requires a correct answer to continue.</p>
      </article>
      <article>
        <span class="eyebrow">End audit</span>
        <h3>Forecast versus actual</h3>
        <p>Results isolate the difference caused by prices, trail costs, events, and decisions.</p>
      </article>
      <article>
        <span class="eyebrow">Final response</span>
        <h3>{{ config.reportSections.length }} reflection prompts</h3>
        <p>{{ config.reportSections[0]?.title }} \xB7 {{ config.reportSections[1]?.title }} \xB7 {{ config.reportSections[2]?.title }} \xB7 {{ config.reportSections[3]?.title }}</p>
      </article>
    </div>
  </section>

  <section id="routes" class="page-section route-section">
    <header>
      <div><span class="eyebrow">Live route configuration</span><h2>Current route paths</h2></div>
      <p>This is the practice network. It is not labeled as the final historical HBC network.</p>
    </header>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Route ID</th><th>Path</th><th>Open at</th><th>Days</th><th>Cost</th><th>Risk</th><th>Destination market</th></tr></thead>
        <tbody>
          @for (route of routeRows(); track route.id) {
            <tr>
              <td><code>{{ route.id }}</code></td>
              <td><strong>{{ route.from }} \u2192 {{ route.to }}</strong><small>{{ route.name }}</small></td>
              <td>{{ route.firstStage }}</td>
              <td>{{ route.estimatedDays }}</td>
              <td>{{ money(route.supplyCostCents) }}</td>
              <td><span [class]="'risk ' + route.risk">{{ route.risk }}</span></td>
              <td>{{ route.market }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </section>

  <section id="hbc" class="page-section hbc-section">
    <header>
      <div><span class="eyebrow">Historical build status</span><h2>HBC direction and boundaries</h2></div>
      <p>Read this before changing route names, vehicles, map art, events, or historical claims.</p>
    </header>
    <ul>
      @for (item of info.historicalDirection; track item) {
        <li><span aria-hidden="true">\u2725</span><p>{{ item }}</p></li>
      }
    </ul>
  </section>

  <section id="roadmap" class="page-section roadmap-section">
    <header>
      <div><span class="eyebrow">Competition delivery path</span><h2>Builder roadmap</h2></div>
      <p>The next safe implementation slice is the reviewed HBC scenario package.</p>
    </header>
    <div class="roadmap">
      @for (phase of info.roadmap; track phase.phase) {
        <article [class]="'roadmap-card ' + phase.status">
          <span>{{ phase.status }}</span>
          <h3>{{ phase.phase }}</h3>
          <p>{{ phase.outcome }}</p>
          @if (phase.dependsOn) { <small>Depends on: {{ phase.dependsOn }}</small> }
        </article>
      }
    </div>
  </section>

  <section id="files" class="page-section files-section">
    <header>
      <div><span class="eyebrow">Application, source, and document locations</span><h2>Builder paths</h2></div>
      <label>Filter paths<input type="search" [ngModel]="pathQuery()" (ngModelChange)="pathQuery.set($event)" placeholder="route, engine, HBC, competition\u2026" /></label>
    </header>
    <div class="file-list">
      @for (item of filteredPaths(); track item.path) {
        <article>
          <span [class]="'kind ' + item.kind">{{ item.kind }}</span>
          <div><strong>{{ item.label }}</strong><code>{{ item.path }}</code><p>{{ item.purpose }}</p></div>
          @if (item.kind === 'app') {
            <a [routerLink]="item.path">Open</a>
          } @else {
            <button type="button" (click)="copyPath(item)">{{ copiedPath() === item.path ? '\u2713 Copied' : 'Copy path' }}</button>
          }
        </article>
      } @empty {
        <p class="empty">No paths match that filter.</p>
      }
    </div>
  </section>

  <section id="changes" class="page-section changes-section">
    <header>
      <div><span class="eyebrow">Versioned builder snapshot</span><h2>Latest changes</h2></div>
      <p>Edit the builder snapshot whenever curriculum, gates, scoring, or architecture changes.</p>
    </header>
    <div class="change-list">
      @for (release of info.changes; track release.version) {
        <article>
          <header><span>v{{ release.version }}</span><div><h3>{{ release.title }}</h3><small>{{ release.date }}</small></div></header>
          <ul>@for (change of release.changes; track change) { <li>{{ change }}</li> }</ul>
        </article>
      }
    </div>
  </section>

  <section class="page-section guardrail-section">
    <header><div><span class="eyebrow">Do not bypass</span><h2>Builder guardrails</h2></div></header>
    <ul>@for (guardrail of info.guardrails; track guardrail) { <li>{{ guardrail }}</li> }</ul>
  </section>

  <footer class="builder-footer">
    <div><strong>{{ config.projectId }}@{{ config.projectVersion }}</strong><span>{{ info.updatedBy }}</span></div>
      <a [routerLink]="studentRoute">Return to student game \u2192</a>
  </footer>
</main>
`, styles: ['/* src/app/templates/simulation-decision/ui/builder-info/simulation-decision-builder-info.component.scss */\n:host {\n  display: block;\n  min-height: 100dvh;\n  color: #25322f;\n  background: #e8e5dc;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\n:host,\n:host * {\n  box-sizing: border-box;\n}\nh1,\nh2,\nh3,\np {\n  margin: 0;\n}\nh1,\nh2,\nh3 {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\na {\n  color: inherit;\n}\n.builder-page {\n  min-height: 100dvh;\n}\n.builder-bar {\n  position: sticky;\n  z-index: 20;\n  top: 0;\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  gap: 1rem;\n  min-height: 4rem;\n  padding: 0.65rem max(1rem, (100vw - 80rem) / 2);\n  color: #f8ecd0;\n  background: #172b28;\n  box-shadow: 0 0.35rem 1rem rgba(12, 23, 21, 0.2901960784);\n}\n.builder-bar > div {\n  display: grid;\n  justify-items: center;\n}\n.builder-bar span {\n  color: #9ebcb4;\n  font-size: 0.62rem;\n  font-weight: 850;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.builder-bar a {\n  font-size: 0.76rem;\n  font-weight: 800;\n  text-decoration: none;\n}\n.builder-bar .open-game {\n  justify-self: end;\n  color: #f0cb73;\n}\n.builder-hero {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 19rem;\n  gap: 2rem;\n  padding: 3.5rem max(1rem, (100vw - 80rem) / 2);\n  color: #fff7e4;\n  background:\n    radial-gradient(\n      circle at 80% 10%,\n      rgba(198, 146, 61, 0.2196078431),\n      transparent 24rem),\n    linear-gradient(\n      125deg,\n      #233f38,\n      #132824 70%);\n}\n.eyebrow {\n  color: #9a671c;\n  font-size: 0.66rem;\n  font-weight: 900;\n  letter-spacing: 0.13em;\n  text-transform: uppercase;\n}\n.builder-hero .eyebrow {\n  color: #e1b65e;\n}\n.builder-hero h1 {\n  max-width: 52rem;\n  margin: 0.35rem 0 0.8rem;\n  font-size: clamp(2.2rem, 5vw, 4.5rem);\n  line-height: 0.96;\n}\n.builder-hero > div > p {\n  max-width: 53rem;\n  color: #c8d8d2;\n  line-height: 1.65;\n}\n.builder-hero aside {\n  display: grid;\n  align-content: center;\n  gap: 0.35rem;\n  border: 1px solid #52736a;\n  border-radius: 0.8rem;\n  padding: 1.25rem;\n  background: rgba(13, 33, 30, 0.7803921569);\n}\n.builder-hero aside small {\n  color: #96b7ad;\n  text-transform: uppercase;\n}\n.builder-hero aside strong {\n  color: #efca70;\n  font: 900 2.3rem Georgia, serif;\n}\n.builder-hero aside span {\n  font-weight: 800;\n}\n.builder-hero aside p {\n  margin-top: 0.6rem;\n  color: #9eb5ae;\n  font-size: 0.72rem;\n}\n.hero-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin-top: 1.2rem;\n}\n.hero-actions button,\n.hero-actions a,\n.file-list button,\n.file-list a {\n  min-height: 2.55rem;\n  border: 1px solid #ad7e32;\n  border-radius: 0.4rem;\n  padding: 0.58rem 0.8rem;\n  color: #fff9e9;\n  background: #825516;\n  font: inherit;\n  font-size: 0.75rem;\n  font-weight: 850;\n  text-decoration: none;\n  cursor: pointer;\n}\n.hero-actions a {\n  color: #f4e6c3;\n  background: transparent;\n}\n.stale-warning {\n  display: flex;\n  gap: 0.75rem;\n  padding: 0.9rem max(1rem, (100vw - 80rem) / 2);\n  color: #6f251d;\n  background: #ffe1c8;\n}\n.page-index {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  padding: 0.75rem max(1rem, (100vw - 80rem) / 2);\n  border-bottom: 1px solid #c8c3b7;\n  background: #f6f3eb;\n}\n.page-index a {\n  border-radius: 999px;\n  padding: 0.35rem 0.6rem;\n  color: #3f5c55;\n  background: #e2e8e3;\n  font-size: 0.7rem;\n  font-weight: 800;\n  text-decoration: none;\n}\n.page-section {\n  width: min(80rem, 100% - 2rem);\n  margin: 0 auto;\n  padding: 2.5rem 0;\n  border-bottom: 1px solid #c8c3b7;\n  scroll-margin-top: 5rem;\n}\n.page-section > header {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.page-section h2 {\n  margin-top: 0.18rem;\n  color: #253f38;\n  font-size: clamp(1.5rem, 3vw, 2.4rem);\n}\n.page-section > header > p {\n  max-width: 35rem;\n  color: #66736f;\n  font-size: 0.8rem;\n  line-height: 1.5;\n  text-align: right;\n}\n.settings-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.6rem;\n}\n.settings-grid article {\n  display: grid;\n  gap: 0.2rem;\n  min-height: 5rem;\n  align-content: center;\n  border: 1px solid #c7c1b3;\n  border-radius: 0.5rem;\n  padding: 0.8rem;\n  background: #faf8f1;\n}\n.settings-grid small {\n  color: #69756f;\n  font-size: 0.67rem;\n  text-transform: uppercase;\n}\n.settings-grid strong {\n  color: #23463e;\n}\n.path-section ol {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.65rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  counter-reset: steps;\n}\n.path-section li {\n  position: relative;\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0.6rem;\n  align-items: start;\n  border: 1px solid #c8bd9f;\n  border-radius: 0.55rem;\n  padding: 0.8rem;\n  background: #fffaf0;\n}\n.path-section li span {\n  display: grid;\n  width: 1.8rem;\n  height: 1.8rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #315d52;\n  font-weight: 900;\n}\n.path-section li p {\n  font-size: 0.78rem;\n  line-height: 1.45;\n}\n.stage-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.8rem;\n}\n.stage-grid article,\n.assessment-grid article {\n  border: 1px solid #bbb4a4;\n  border-radius: 0.65rem;\n  padding: 1rem;\n  background: #f9f7f0;\n}\n.stage-grid article > span {\n  color: #9a641c;\n  font-size: 0.65rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.stage-grid h3,\n.assessment-grid h3 {\n  margin: 0.3rem 0;\n  color: #2a4941;\n  font-size: 1.25rem;\n}\n.stage-grid p,\n.assessment-grid p {\n  color: #66706d;\n  font-size: 0.76rem;\n  line-height: 1.5;\n}\n.stage-grid dl {\n  display: grid;\n  gap: 0.35rem;\n  margin: 0.8rem 0 0;\n}\n.stage-grid dl div {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.5rem;\n  border-top: 1px solid #ddd5c5;\n  padding-top: 0.35rem;\n  font-size: 0.7rem;\n}\n.stage-grid dt,\n.stage-grid dd {\n  margin: 0;\n}\n.stage-grid dd {\n  font-weight: 800;\n  text-align: right;\n}\n.assessment-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.6rem;\n  margin-top: 0.8rem;\n}\n.table-wrap {\n  overflow: auto;\n  border: 1px solid #bfb8a8;\n  border-radius: 0.65rem;\n  background: #fbfaf5;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.74rem;\n}\nth,\ntd {\n  padding: 0.7rem;\n  border-bottom: 1px solid #ddd7c9;\n  text-align: left;\n  vertical-align: top;\n}\nth {\n  color: #edf5f1;\n  background: #31564d;\n  font-size: 0.64rem;\n  text-transform: uppercase;\n}\ntd strong,\ntd small {\n  display: block;\n}\ntd small {\n  margin-top: 0.15rem;\n  color: #6d7773;\n}\ncode {\n  color: #5b3513;\n  font:\n    700 0.72rem ui-monospace,\n    SFMono-Regular,\n    Consolas,\n    monospace;\n  overflow-wrap: anywhere;\n}\n.risk {\n  border-radius: 999px;\n  padding: 0.18rem 0.4rem;\n  font-size: 0.62rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.risk.low {\n  color: #286045;\n  background: #d6eadb;\n}\n.risk.moderate {\n  color: #795311;\n  background: #f3e2ad;\n}\n.risk.high {\n  color: #8c3227;\n  background: #f1d1cb;\n}\n.hbc-section {\n  width: 100%;\n  padding-inline: max(1rem, (100vw - 80rem) / 2);\n  color: #f5ead0;\n  background: #2a352f;\n}\n.hbc-section .eyebrow {\n  color: #d9ac57;\n}\n.hbc-section h2 {\n  color: #fff4da;\n}\n.hbc-section > header > p {\n  color: #b9c5be;\n}\n.hbc-section ul {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.6rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.hbc-section li {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0.6rem;\n  border: 1px solid #536159;\n  border-radius: 0.5rem;\n  padding: 0.8rem;\n  background: #17231f;\n}\n.hbc-section li span {\n  color: #e2b45b;\n}\n.hbc-section li p {\n  color: #d1d9d4;\n  font-size: 0.78rem;\n  line-height: 1.5;\n}\n.roadmap {\n  display: grid;\n  gap: 0.55rem;\n}\n.roadmap-card {\n  display: grid;\n  grid-template-columns: 7rem 15rem 1fr;\n  align-items: center;\n  gap: 0.8rem;\n  border-left: 0.35rem solid #7c8782;\n  padding: 0.85rem 1rem;\n  background: #f8f6ef;\n}\n.roadmap-card > span {\n  width: fit-content;\n  border-radius: 999px;\n  padding: 0.2rem 0.45rem;\n  color: #fff;\n  background: #748079;\n  font-size: 0.6rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.roadmap-card.current {\n  border-color: #31705d;\n}\n.roadmap-card.current > span {\n  background: #31705d;\n}\n.roadmap-card.next {\n  border-color: #b77b25;\n}\n.roadmap-card.next > span {\n  background: #a96718;\n}\n.roadmap-card.blocked {\n  border-color: #a34438;\n}\n.roadmap-card.blocked > span {\n  background: #96382d;\n}\n.roadmap-card p,\n.roadmap-card small {\n  color: #66716d;\n  font-size: 0.73rem;\n}\n.roadmap-card small {\n  grid-column: 3;\n}\n.files-section > header label {\n  display: grid;\n  gap: 0.25rem;\n  color: #586862;\n  font-size: 0.66rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.files-section input {\n  width: min(24rem, 70vw);\n  border: 1px solid #a9b1ad;\n  border-radius: 0.4rem;\n  padding: 0.55rem;\n  background: #fff;\n  font: inherit;\n}\n.file-list {\n  display: grid;\n  gap: 0.45rem;\n}\n.file-list article {\n  display: grid;\n  grid-template-columns: 5rem minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 0.8rem;\n  border: 1px solid #c9c3b5;\n  border-radius: 0.45rem;\n  padding: 0.7rem;\n  background: #faf9f4;\n}\n.file-list article > div {\n  display: grid;\n  gap: 0.15rem;\n}\n.file-list p {\n  color: #6d7673;\n  font-size: 0.7rem;\n}\n.kind {\n  width: fit-content;\n  border-radius: 999px;\n  padding: 0.2rem 0.4rem;\n  font-size: 0.58rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.kind.app {\n  color: #28574c;\n  background: #d5e8df;\n}\n.kind.source {\n  color: #674515;\n  background: #efe0ba;\n}\n.kind.document {\n  color: #493f73;\n  background: #dedaf0;\n}\n.file-list button,\n.file-list a {\n  min-height: 2.25rem;\n  color: #fff;\n  background: #315d53;\n}\n.empty {\n  padding: 1rem;\n  color: #6c7773;\n  text-align: center;\n}\n.change-list {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.75rem;\n}\n.change-list > article {\n  border: 1px solid #c4bdad;\n  border-radius: 0.55rem;\n  padding: 0.9rem;\n  background: #faf8f2;\n}\n.change-list article > header {\n  display: flex;\n  gap: 0.6rem;\n  align-items: center;\n}\n.change-list header > span {\n  border-radius: 0.3rem;\n  padding: 0.35rem;\n  color: #fff;\n  background: #375c53;\n  font-size: 0.7rem;\n  font-weight: 900;\n}\n.change-list h3 {\n  color: #29473f;\n  font-size: 1.05rem;\n}\n.change-list small {\n  color: #78817e;\n}\n.change-list ul,\n.guardrail-section ul {\n  margin: 0.8rem 0 0;\n  padding-left: 1.15rem;\n  color: #53615d;\n  font-size: 0.74rem;\n  line-height: 1.55;\n}\n.guardrail-section ul {\n  columns: 2;\n  column-gap: 2rem;\n}\n.guardrail-section li {\n  break-inside: avoid;\n  margin-bottom: 0.5rem;\n}\n.builder-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 1.5rem max(1rem, (100vw - 80rem) / 2);\n  color: #d7e2dd;\n  background: #152824;\n}\n.builder-footer div {\n  display: grid;\n  gap: 0.2rem;\n}\n.builder-footer span {\n  color: #8fa79f;\n  font-size: 0.68rem;\n}\n.builder-footer a {\n  color: #e3bd68;\n  font-weight: 850;\n  text-decoration: none;\n}\na:focus-visible,\nbutton:focus-visible,\ninput:focus-visible {\n  outline: 3px solid #d69c35;\n  outline-offset: 3px;\n}\n@media (max-width: 900px) {\n  .settings-grid,\n  .path-section ol {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .stage-grid,\n  .change-list {\n    grid-template-columns: 1fr;\n  }\n  .assessment-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .roadmap-card {\n    grid-template-columns: 6rem 1fr;\n  }\n  .roadmap-card p,\n  .roadmap-card small {\n    grid-column: 2;\n  }\n}\n@media (max-width: 650px) {\n  .builder-bar {\n    grid-template-columns: 1fr auto;\n  }\n  .builder-bar > div {\n    display: none;\n  }\n  .builder-hero {\n    grid-template-columns: 1fr;\n    padding-block: 2.2rem;\n  }\n  .page-section > header,\n  .files-section > header,\n  .builder-footer {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .page-section > header > p {\n    text-align: left;\n  }\n  .settings-grid,\n  .path-section ol,\n  .assessment-grid,\n  .hbc-section ul {\n    grid-template-columns: 1fr;\n  }\n  .file-list article {\n    grid-template-columns: 1fr;\n  }\n  .file-list button,\n  .file-list a {\n    width: fit-content;\n  }\n  .guardrail-section ul {\n    columns: 1;\n  }\n}\n/*# sourceMappingURL=simulation-decision-builder-info.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SimulationDecisionBuilderInfoComponent, { className: "SimulationDecisionBuilderInfoComponent", filePath: "src/app/templates/simulation-decision/ui/builder-info/simulation-decision-builder-info.component.ts", lineNumber: 22 });
})();
export {
  SimulationDecisionBuilderInfoComponent
};
//# debugId=75cfa162-5d84-59d6-862f-90a65c6ff79a
//# sourceMappingURL=chunk-ZTRAGV33.js.map
