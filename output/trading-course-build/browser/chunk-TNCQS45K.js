import {
  DraftAutosaveController
} from "./chunk-5LAJN7BS.js";
import {
  LAB_AUTHORING_PREVIEW
} from "./chunk-46FPAVMA.js";
import {
  WORKSPACE_DRAFTS
} from "./chunk-K64YZ7RA.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  ɵNgSelectMultipleOption
} from "./chunk-UW6DFD2Z.js";
import {
  CommonModule
} from "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  EventEmitter,
  Injectable,
  Input,
  Output,
  computed,
  effect,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
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
  ɵɵtwoWayProperty
} from "./chunk-E2VJWGUE.js";
import {
  mysteryEvidenceFiles,
  mysteryVials
} from "./chunk-EOGBHGAA.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/investigation/simulation/deterministic-simulation.adapter.ts
var DeterministicSimulationAdapter = class {
  config;
  settings;
  inputs = {};
  running = false;
  trialNumber = 0;
  initialize(config) {
    const settings = config.settings;
    if (settings === void 0 || !Array.isArray(settings.keyFields) || settings.outcomeTable === void 0) {
      throw new Error(`Simulation "${config.id}" requires keyFields and an outcomeTable.`);
    }
    this.config = structuredClone(config);
    this.settings = {
      keyFields: [...settings.keyFields],
      outcomeTable: structuredClone(settings.outcomeTable)
    };
    this.resetTrial();
  }
  setInputs(inputs) {
    if (this.running) {
      throw new Error("Simulation inputs cannot change during a running trial.");
    }
    this.inputs = structuredClone(inputs);
  }
  beginTrial() {
    if (this.config === void 0 || this.settings === void 0) {
      throw new Error("Simulation must be initialized before a trial begins.");
    }
    this.running = true;
  }
  endTrial() {
    if (!this.running || this.config === void 0 || this.settings === void 0) {
      throw new Error("A simulation trial must be running before it can end.");
    }
    const key = this.settings.keyFields.map((field) => String(this.inputs[field] ?? "")).join("::");
    const outputs = this.settings.outcomeTable[key];
    if (outputs === void 0) {
      throw new Error(`Simulation "${this.config.id}" has no outcome for "${key}".`);
    }
    this.running = false;
    this.trialNumber += 1;
    return {
      trialId: `${this.config.id}-trial-${this.trialNumber}`,
      inputs: structuredClone(this.inputs),
      outputs: structuredClone(outputs)
    };
  }
  resetTrial() {
    this.inputs = {};
    this.running = false;
  }
};

// src/app/projects/mystery-substance/mystery-science.config.ts
var physicalTests = [
  {
    id: "appearance",
    title: "Look closely",
    instrument: "6\xD7 magnifier",
    scenePosition: "left top",
    prompt: "Compare particle shape under equal lighting."
  },
  {
    id: "solubility",
    title: "Test in water",
    instrument: "50 mL water cup",
    scenePosition: "right top",
    prompt: "Use equal mass, water volume, and mixing time."
  },
  {
    id: "conductivity",
    title: "Measure conductivity",
    instrument: "Calibrated probe",
    scenePosition: "left bottom",
    prompt: "Measure only after the same water trial."
  },
  {
    id: "texture",
    title: "Compare texture",
    instrument: "Non-contact scanner",
    scenePosition: "right bottom",
    prompt: "Compare particle size without touching the unknown."
  }
];
var physicalOutcomeTable = {
  "vial-a::appearance": {
    reading: "Coarse clear-edged crystals",
    magnification: "6\xD7",
    lighting: "equal white light"
  },
  "vial-b::appearance": {
    reading: "Smaller sparkling crystals",
    magnification: "6\xD7",
    lighting: "equal white light"
  },
  "vial-c::appearance": {
    reading: "Fine white powder",
    magnification: "6\xD7",
    lighting: "equal white light"
  },
  "vial-d::appearance": {
    reading: "Very fine white powder",
    magnification: "6\xD7",
    lighting: "equal white light"
  },
  "vial-a::solubility": {
    reading: "Water clears after mixing",
    elapsedSeconds: 14,
    settledLayer: "none at 60 s"
  },
  "vial-b::solubility": {
    reading: "Water clears after mixing",
    elapsedSeconds: 19,
    settledLayer: "none at 60 s"
  },
  "vial-c::solubility": {
    reading: "Cloudy at first; mostly clear",
    elapsedSeconds: 11,
    settledLayer: "none at 60 s"
  },
  "vial-d::solubility": {
    reading: "Cloudy suspension remains",
    elapsedSeconds: 60,
    settledLayer: "thin layer begins"
  },
  "vial-a::conductivity": {
    reading: "Probe bar rises and lamp glows",
    millisiemens: 8.7,
    calibration: "passed"
  },
  "vial-b::conductivity": {
    reading: "Probe bar stays near baseline",
    millisiemens: 0.1,
    calibration: "passed"
  },
  "vial-c::conductivity": {
    reading: "Probe bar rises and lamp glows",
    millisiemens: 6.4,
    calibration: "passed"
  },
  "vial-d::conductivity": {
    reading: "Probe bar stays near baseline",
    millisiemens: 0.1,
    calibration: "passed"
  },
  "vial-a::texture": {
    reading: "Large angular grains",
    particleBand: "0.7\u20131.5 mm",
    contact: "none"
  },
  "vial-b::texture": {
    reading: "Small faceted grains",
    particleBand: "0.3\u20130.8 mm",
    contact: "none"
  },
  "vial-c::texture": {
    reading: "Fine, even particles",
    particleBand: "0.05\u20130.2 mm",
    contact: "none"
  },
  "vial-d::texture": {
    reading: "Very fine clustered particles",
    particleBand: "<0.1 mm",
    contact: "none"
  }
};
var reactionTests = [
  {
    id: "solution-a",
    title: "Solution A",
    scenePosition: "left center",
    prompt: "Add 5 mL to equal 2 g samples in closed vessels."
  },
  {
    id: "indicator-b",
    title: "Indicator B",
    scenePosition: "right center",
    prompt: "Add three drops under equal lighting."
  }
];
var reactionOutcomeTable = {
  "vial-a::solution-a": {
    gas: "none visible",
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: "clear",
    colorAfter: "clear"
  },
  "vial-b::solution-a": {
    gas: "none visible",
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: "clear",
    colorAfter: "clear"
  },
  "vial-c::solution-a": {
    gas: "rapid bubbles for 18 s",
    temperatureBefore: 22,
    temperatureAfter: 19,
    colorBefore: "clear",
    colorAfter: "clear"
  },
  "vial-d::solution-a": {
    gas: "none visible",
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: "cloudy",
    colorAfter: "cloudy"
  },
  "vial-a::indicator-b": {
    gas: "none visible",
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: "amber",
    colorAfter: "amber"
  },
  "vial-b::indicator-b": {
    gas: "none visible",
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: "amber",
    colorAfter: "golden tan"
  },
  "vial-c::indicator-b": {
    gas: "none visible",
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: "amber",
    colorAfter: "light tan"
  },
  "vial-d::indicator-b": {
    gas: "none visible",
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: "amber",
    colorAfter: "dark blue-black"
  }
};
var conservationTrials = [
  {
    id: "closed",
    title: "Closed chamber",
    system: "sealed",
    beforeMass: 126.4,
    afterMass: 126.4,
    beforeParticles: 24,
    afterParticles: 24,
    observation: "Gas remains inside the sealed chamber."
  },
  {
    id: "open",
    title: "Open chamber",
    system: "open",
    beforeMass: 124.8,
    afterMass: 123.5,
    beforeParticles: 24,
    afterParticles: 19,
    observation: "Gas particles move beyond the measured container."
  }
];
var recoveredLabels = [
  {
    id: "salt",
    title: "Table Salt",
    handling: "Dry-goods shelf \xB7 sealed container"
  },
  {
    id: "sugar",
    title: "Sugar",
    handling: "Dry-goods shelf \xB7 sealed container"
  },
  {
    id: "baking-soda",
    title: "Baking Soda",
    handling: "Keep dry and clearly labeled"
  },
  { id: "cornstarch", title: "Cornstarch", handling: "Keep dry and sealed" }
];
var shelfZones = [
  {
    id: "crystal",
    title: "Crystal shelf",
    note: "For verified crystal materials"
  },
  {
    id: "powder",
    title: "Powder shelf",
    note: "For verified powder materials"
  },
  {
    id: "retest",
    title: "Retest tray",
    note: "For evidence that still disagrees"
  },
  {
    id: "review",
    title: "Teacher review",
    note: "For unresolved identity or handling questions"
  }
];
var handlingRecommendations = [
  {
    id: "normal",
    title: "Normal lab precautions",
    note: "Keep sealed, labeled, and teacher supervised."
  },
  {
    id: "contain",
    title: "Contain for confirmation",
    note: "Keep sealed until an adult confirms the evidence."
  },
  {
    id: "study",
    title: "Collect another trial",
    note: "Repeat a controlled test before deciding."
  }
];

// src/app/projects/mystery-substance/lab-kit/grain-profiles.ts
var grainProfiles = {
  // Coarse, clear-edged crystals.
  "vial-a": { count: 11, minSize: 3.2, maxSize: 5.4, sparkle: true, dust: 0.04, clump: false },
  // Smaller, sparkling crystals.
  "vial-b": { count: 14, minSize: 2.3, maxSize: 3.9, sparkle: true, dust: 0.08, clump: false },
  // Fine white powder.
  "vial-c": { count: 20, minSize: 1.4, maxSize: 2.5, sparkle: false, dust: 0.34, clump: false },
  // Very fine white powder.
  "vial-d": { count: 26, minSize: 0.9, maxSize: 1.9, sparkle: false, dust: 0.58, clump: true }
};
var defaultGrainProfile = {
  count: 16,
  minSize: 2,
  maxSize: 3.4,
  sparkle: false,
  dust: 0.2,
  clump: false
};
function buildGrainSpecs(profile, spread = 18) {
  return Array.from({ length: profile.count }, (_, index) => {
    const ratio = index * 37 % 101 / 100;
    return {
      id: index,
      size: profile.minSize + (profile.maxSize - profile.minSize) * ratio,
      offsetX: Math.round((index * 53 % spread - spread / 2) * 10) / 10,
      delayMs: index * 41 % 460,
      spinDeg: 140 + index * 67 % 180,
      sparkle: profile.sparkle && index % 3 === 0
    };
  });
}

// src/app/projects/mystery-substance/lab-kit/render-quality.service.ts
var RenderQualityService = class _RenderQualityService {
  static sampleFrames = 42;
  static slowFrameMs = 22;
  quality = signal(
    "high",
    ...ngDevMode ? [{ debugName: "quality" }] : (
      /* istanbul ignore next */
      []
    )
  );
  probing = false;
  settled = false;
  constructor() {
    if (prefersReducedMotion()) {
      this.quality.set("plain");
      this.settled = true;
    }
  }
  get filtersEnabled() {
    return this.quality() === "high";
  }
  /**
   * Samples frame times across one animated stretch. Safe to call on every
   * run; it measures once and then leaves the verdict alone.
   */
  probe() {
    if (this.settled || this.probing || typeof requestAnimationFrame !== "function" || typeof performance === "undefined") {
      return;
    }
    this.probing = true;
    let frames = 0;
    let last = performance.now();
    let total = 0;
    const step = (now) => {
      total += now - last;
      last = now;
      frames += 1;
      if (frames < _RenderQualityService.sampleFrames) {
        requestAnimationFrame(step);
        return;
      }
      if (total / frames > _RenderQualityService.slowFrameMs) {
        this.quality.set("plain");
      }
      this.probing = false;
      this.settled = true;
    };
    requestAnimationFrame(step);
  }
  static \u0275fac = function RenderQualityService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RenderQualityService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RenderQualityService, factory: _RenderQualityService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RenderQualityService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();
function prefersReducedMotion() {
  return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// src/app/projects/mystery-substance/station-art.config.ts
var stationArt = {
  magnifier: {
    blend: "normal",
    aspect: 1,
    displayPx: { width: 176, height: 176 },
    exportPx: { width: 528, height: 528 },
    // The lens interior is the well; the specimen field is drawn inside it.
    well: { top: 12, right: 12, bottom: 12, left: 12 },
    note: "Round bench magnifier seen straight down, chrome ring, empty clear lens. Cut out."
  },
  waterCup: {
    blend: "screen",
    aspect: 0.82,
    displayPx: { width: 132, height: 161 },
    exportPx: { width: 396, height: 483 },
    well: { top: 16, right: 14, bottom: 9, left: 14 },
    note: "Empty straight-sided glass beaker on black. No water, no graduations, no stopper."
  },
  probe: {
    blend: "normal",
    aspect: 0.3,
    displayPx: { width: 44, height: 147 },
    exportPx: { width: 132, height: 440 },
    note: "Conductivity probe: black handle, two parallel steel electrodes at the tip, vertical. Cut out."
  },
  lamp: {
    blend: "normal",
    aspect: 0.72,
    displayPx: { width: 58, height: 81 },
    exportPx: { width: 174, height: 242 },
    note: "Small indicator bulb in a brass holder, filament visible, switched OFF. Glow is drawn."
  },
  scanBed: {
    blend: "normal",
    aspect: 1.6,
    displayPx: { width: 208, height: 130 },
    exportPx: { width: 624, height: 390 },
    well: { top: 18, right: 10, bottom: 14, left: 10 },
    note: "Non-contact scanner bed: dark matte tray with a recessed sample well, empty. Cut out."
  },
  chamber: {
    blend: "screen",
    aspect: 1.05,
    displayPx: { width: 210, height: 200 },
    exportPx: { width: 630, height: 600 },
    well: { top: 14, right: 11, bottom: 12, left: 11 },
    note: "Square glass reaction chamber with a hinged lid, empty. Lid open and closed variants if possible."
  },
  padBalance: {
    blend: "normal",
    aspect: 1.9,
    displayPx: { width: 190, height: 100 },
    exportPx: { width: 570, height: 300 },
    note: "Flat platform balance from the front, wide pan, display blanked. Cut out."
  },
  shelf: {
    blend: "normal",
    aspect: 2.4,
    displayPx: { width: 480, height: 200 },
    exportPx: { width: 1440, height: 600 },
    note: "Empty laboratory shelf unit, four bays, pale wood or steel, front on. Cut out."
  },
  labelSheet: {
    blend: "normal",
    aspect: 2.6,
    displayPx: { width: 130, height: 50 },
    exportPx: { width: 390, height: 150 },
    note: "Single blank adhesive label, slightly curled corner, no writing. Cut out."
  }
};

// src/app/shared/drafts/persist-workspace-draft.ts
function persistWorkspaceDraft(key, read, restore) {
  const store = inject(WORKSPACE_DRAFTS, { optional: true });
  const saved = store?.read(key);
  if (saved) restore(saved);
  const controller = new DraftAutosaveController((value) => store?.write(key, value), 500);
  effect(() => controller.schedule(read()));
  const flush = () => {
    controller.schedule(read());
    void controller.flush();
  };
  const document = inject(DOCUMENT);
  const window = document.defaultView;
  const onHidden = () => {
    if (document.visibilityState === "hidden") flush();
  };
  window?.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", onHidden);
  inject(DestroyRef).onDestroy(() => {
    flush();
    window?.removeEventListener("pagehide", flush);
    document.removeEventListener("visibilitychange", onHidden);
  });
  return flush;
}

// src/app/projects/mystery-substance/properties-lab.component.ts
var _c0 = () => [0, 1, 2, 3, 4];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.vialId;
var _forTrack2 = ($index, $item) => $item[0];
function PropertiesLabComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 18);
    \u0275\u0275listener("click", function PropertiesLabComponent_For_11_Template_button_click_1_listener() {
      const test_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTest(test_r2.id));
    });
    \u0275\u0275element(2, "span", 19);
    \u0275\u0275elementStart(3, "span", 20)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 21);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const test_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r2.testId() === test_r2.id);
    \u0275\u0275property("disabled", ctx_r2.running());
    \u0275\u0275attribute("aria-pressed", ctx_r2.testId() === test_r2.id);
    \u0275\u0275advance();
    \u0275\u0275attribute("data-test", test_r2.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(test_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(test_r2.instrument);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r2.coverage(test_r2.id) + " of 4 vials tested");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.coverage(test_r2.id), "/4 ");
  }
}
function PropertiesLabComponent_Conditional_12_For_4_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
  }
}
function PropertiesLabComponent_Conditional_12_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 18);
    \u0275\u0275listener("click", function PropertiesLabComponent_Conditional_12_For_4_Template_button_click_1_listener() {
      const vial_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectVial(vial_r5.vialId));
    });
    \u0275\u0275element(2, "img", 23);
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, PropertiesLabComponent_Conditional_12_For_4_Conditional_5_Template, 2, 0, "span", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const vial_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275styleProp("--%NS%vial-color", vial_r5.color);
    \u0275\u0275classProp("active", ctx_r2.vialId() === vial_r5.vialId);
    \u0275\u0275property("disabled", ctx_r2.running());
    \u0275\u0275attribute("aria-pressed", ctx_r2.vialId() === vial_r5.vialId)("aria-label", "Vial " + vial_r5.code + (ctx_r2.hasRun(vial_r5.vialId, ctx_r2.testId()) ? ", already tested" : ""));
    \u0275\u0275advance();
    \u0275\u0275property("src", vial_r5.image, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vial_r5.code);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.hasRun(vial_r5.vialId, ctx_r2.testId()) ? 5 : -1);
  }
}
function PropertiesLabComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1, "Specimens");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ul", 22);
    \u0275\u0275repeaterCreate(3, PropertiesLabComponent_Conditional_12_For_4_Template, 6, 10, "li", null, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.vials);
  }
}
function PropertiesLabComponent_Conditional_13_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const trial_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trial_r6.vialCode);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(trial_r6.testTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trial_r6.headline);
  }
}
function PropertiesLabComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1, "Trial log");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ol", 25);
    \u0275\u0275repeaterCreate(3, PropertiesLabComponent_Conditional_13_For_4_Template, 8, 3, "li", null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.trials());
  }
}
function PropertiesLabComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "small");
    \u0275\u0275text(2, "Trial clock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "s");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.elapsedSeconds());
  }
}
function PropertiesLabComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "button", 27);
    \u0275\u0275listener("click", function PropertiesLabComponent_Conditional_22_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.run());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 28);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.running());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.running() ? "Running\u2026" : "Run equal-condition trial");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.hint());
  }
}
function PropertiesLabComponent_Case_24_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 30);
  }
  if (rf & 2) {
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function PropertiesLabComponent_Case_24_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const grain_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("background", ctx_r2.activeVial().color)("top", grain_r9.top, "%")("left", grain_r9.left, "%")("--%NS%grain-size", grain_r9.size * ctx_r2.zoom() * 0.4, "px")("--%NS%spin", grain_r9.spinDeg + "deg");
    \u0275\u0275classProp("sparkle", grain_r9.sparkle);
  }
}
function PropertiesLabComponent_Case_24_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 36);
  }
}
function PropertiesLabComponent_Case_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275conditionalCreate(1, PropertiesLabComponent_Case_24_Conditional_1_Template, 1, 1, "img", 30);
    \u0275\u0275elementStart(2, "div", 31)(3, "div", 32);
    \u0275\u0275repeaterCreate(4, PropertiesLabComponent_Case_24_For_5_Template, 1, 12, "i", 33, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "span", 34);
    \u0275\u0275elementStart(7, "span", 35);
    \u0275\u0275element(8, "i");
    \u0275\u0275text(9, "1 mm");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, PropertiesLabComponent_Case_24_Conditional_10_Template, 1, 0, "span", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 37)(12, "label");
    \u0275\u0275text(13, " Light angle ");
    \u0275\u0275elementStart(14, "input", 38);
    \u0275\u0275listener("input", function PropertiesLabComponent_Case_24_Template_input_input_14_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setLightAngle(ctx_r2.numberValue($event)));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "label");
    \u0275\u0275text(16, " Magnification ");
    \u0275\u0275elementStart(17, "input", 39);
    \u0275\u0275listener("input", function PropertiesLabComponent_Case_24_Template_input_input_17_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setZoom(ctx_r2.numberValue($event)));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "strong");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("--%NS%light-angle", ctx_r2.lightAngle(), "deg");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_2_0 = ctx_r2.art.magnifier.src) ? 1 : -1, tmp_2_0);
    \u0275\u0275advance();
    \u0275\u0275styleProp("--%NS%zoom", ctx_r2.zoom());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.field());
    \u0275\u0275advance(6);
    \u0275\u0275conditional(!ctx_r2.art.magnifier.src ? 10 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.lightAngle());
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r2.zoom());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.zoom(), "\xD7");
  }
}
function PropertiesLabComponent_Case_25_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 30);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("mix-blend-mode", ctx_r2.art.waterCup.blend);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function PropertiesLabComponent_Case_25_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const grain_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("background", ctx_r2.activeVial().color)("--%NS%grain-x", grain_r10.offsetX, "px")("--%NS%grain-size", grain_r10.size, "px")("animation-delay", grain_r10.delayMs, "ms");
  }
}
function PropertiesLabComponent_Case_25_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275repeaterCreate(1, PropertiesLabComponent_Case_25_Conditional_7_For_2_Template, 1, 8, "i", 50, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.grains());
  }
}
function PropertiesLabComponent_Case_25_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 51);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("background", ctx_r2.activeVial().color);
  }
}
function PropertiesLabComponent_Case_25_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 48);
  }
}
function PropertiesLabComponent_Case_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 40);
    \u0275\u0275conditionalCreate(2, PropertiesLabComponent_Case_25_Conditional_2_Template, 1, 3, "img", 41);
    \u0275\u0275elementStart(3, "div", 42)(4, "div", 43);
    \u0275\u0275element(5, "span", 44)(6, "span", 45);
    \u0275\u0275conditionalCreate(7, PropertiesLabComponent_Case_25_Conditional_7_Template, 3, 0, "div", 46);
    \u0275\u0275conditionalCreate(8, PropertiesLabComponent_Case_25_Conditional_8_Template, 1, 2, "span", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, PropertiesLabComponent_Case_25_Conditional_9_Template, 1, 0, "span", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 49);
    \u0275\u0275text(11, "Equal 2 g into equal 50 mL, stirred the same way.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("stirring", ctx_r2.running());
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_2_0 = ctx_r2.art.waterCup.src) ? 2 : -1, tmp_2_0);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("opacity", ctx_r2.cloudiness())("background", ctx_r2.activeVial().color);
    \u0275\u0275advance();
    \u0275\u0275classProp("agitated", ctx_r2.running());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.running() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.phase() === "settled" && ctx_r2.cloudiness() > 0.4 ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.art.waterCup.src ? 9 : -1);
  }
}
function PropertiesLabComponent_Case_26_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 55);
  }
  if (rf & 2) {
    const tick_r11 = ctx.$implicit;
    \u0275\u0275attribute("transform", "rotate(" + (-52 + tick_r11 * 26) + " 100 112)");
  }
}
function PropertiesLabComponent_Case_26_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 30);
  }
  if (rf & 2) {
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function PropertiesLabComponent_Case_26_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 30);
  }
  if (rf & 2) {
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function PropertiesLabComponent_Case_26_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 66)(1, "span", 67);
  }
}
function PropertiesLabComponent_Case_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 52);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 53);
    \u0275\u0275element(3, "path", 54);
    \u0275\u0275repeaterCreate(4, PropertiesLabComponent_Case_26_For_5_Template, 1, 1, ":svg:line", 55, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275element(6, "line", 56)(7, "circle", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "span", 58);
    \u0275\u0275text(9);
    \u0275\u0275elementStart(10, "small");
    \u0275\u0275text(11, "mS");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 59)(13, "div", 60);
    \u0275\u0275conditionalCreate(14, PropertiesLabComponent_Case_26_Conditional_14_Template, 1, 1, "img", 30);
    \u0275\u0275element(15, "span", 61)(16, "span", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 63);
    \u0275\u0275conditionalCreate(18, PropertiesLabComponent_Case_26_Conditional_18_Template, 1, 1, "img", 30);
    \u0275\u0275conditionalCreate(19, PropertiesLabComponent_Case_26_Conditional_19_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 64);
    \u0275\u0275element(21, "span", 65);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_7_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(9, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275attribute("transform", "rotate(" + ctx_r2.needleAngle() + " 100 112)");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.result() ? ctx_r2.result()["millisiemens"] : "\u2014", " ");
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("--%NS%glow", ctx_r2.lampGlow());
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r2.art.lamp.src) ? 14 : -1, tmp_5_0);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("dipped", ctx_r2.phase() !== "idle");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = ctx_r2.art.probe.src) ? 18 : -1, tmp_7_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.art.probe.src ? 19 : -1);
  }
}
function PropertiesLabComponent_Case_27_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 30);
  }
  if (rf & 2) {
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function PropertiesLabComponent_Case_27_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const grain_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("background", ctx_r2.activeVial().color)("top", grain_r12.top, "%")("left", grain_r12.left, "%")("--%NS%grain-size", grain_r12.size * 2.2, "px");
    \u0275\u0275classProp("sparkle", grain_r12.sparkle);
  }
}
function PropertiesLabComponent_Case_27_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 71);
  }
}
function PropertiesLabComponent_Case_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275conditionalCreate(1, PropertiesLabComponent_Case_27_Conditional_1_Template, 1, 1, "img", 30);
    \u0275\u0275elementStart(2, "div", 68)(3, "div", 69);
    \u0275\u0275repeaterCreate(4, PropertiesLabComponent_Case_27_For_5_Template, 1, 10, "i", 70, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, PropertiesLabComponent_Case_27_Conditional_6_Template, 1, 0, "span", 71);
    \u0275\u0275elementStart(7, "span", 72);
    \u0275\u0275element(8, "i");
    \u0275\u0275text(9, "1 mm");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_1_0 = ctx_r2.art.scanBed.src) ? 1 : -1, tmp_1_0);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.field());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.running() ? 6 : -1);
  }
}
function PropertiesLabComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "p", 28);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 27);
    \u0275\u0275listener("click", function PropertiesLabComponent_Conditional_28_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.run());
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.hint());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.running());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.running() ? "Running\u2026" : "Run equal-condition trial", " ");
  }
}
function PropertiesLabComponent_Conditional_34_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r14 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r14[0]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r14[1]);
  }
}
function PropertiesLabComponent_Conditional_34_Conditional_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, " The bench will not file a trial until you describe it in your own words. ");
    \u0275\u0275elementEnd();
  }
}
function PropertiesLabComponent_Conditional_34_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 74);
    \u0275\u0275text(1, " Write what the instrument showed ");
    \u0275\u0275elementStart(2, "textarea", 75);
    \u0275\u0275listener("ngModelChange", function PropertiesLabComponent_Conditional_34_Conditional_3_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.observation.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 27);
    \u0275\u0275listener("click", function PropertiesLabComponent_Conditional_34_Conditional_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.capture());
    });
    \u0275\u0275text(4, " Save observation ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, PropertiesLabComponent_Conditional_34_Conditional_3_Conditional_5_Template, 2, 0, "p", 17);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.observation());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.canCapture());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.canCapture() ? 5 : -1);
  }
}
function PropertiesLabComponent_Conditional_34_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "Recorded in this session's local trial log. Rerun or change the instrument to compare.");
    \u0275\u0275elementEnd();
  }
}
function PropertiesLabComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275repeaterCreate(1, PropertiesLabComponent_Conditional_34_For_2_Template, 5, 2, "div", null, _forTrack2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, PropertiesLabComponent_Conditional_34_Conditional_3_Template, 6, 3)(4, PropertiesLabComponent_Conditional_34_Conditional_4_Template, 2, 0, "p", 17);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.entries(ctx_r2.result()));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.preview ? 3 : 4);
  }
}
function PropertiesLabComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "Nothing to record yet. Run a trial and watch the instrument.");
    \u0275\u0275elementEnd();
  }
}
var trialDurationMs = 3800;
var waterTrialSeconds = 60;
var PropertiesLabComponent = class _PropertiesLabComponent {
  preview = inject(LAB_AUTHORING_PREVIEW);
  initialTestId = input(
    ...ngDevMode ? [void 0, { debugName: "initialTestId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  captured = output();
  selectedVialId = input(
    ...ngDevMode ? [void 0, { debugName: "selectedVialId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  vialChanged = output();
  embedded = input(
    false,
    ...ngDevMode ? [{ debugName: "embedded" }] : (
      /* istanbul ignore next */
      []
    )
  );
  savedResults = input(
    [],
    ...ngDevMode ? [{ debugName: "savedResults" }] : (
      /* istanbul ignore next */
      []
    )
  );
  drafts = /* @__PURE__ */ new Map();
  flushDraft = () => {
  };
  vials = mysteryVials;
  tests = physicalTests;
  art = stationArt;
  renderQuality = inject(RenderQualityService);
  filters = computed(
    () => this.renderQuality.quality() === "high",
    ...ngDevMode ? [{ debugName: "filters" }] : (
      /* istanbul ignore next */
      []
    )
  );
  testId = signal(
    "appearance",
    ...ngDevMode ? [{ debugName: "testId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  vialId = signal(
    "vial-a",
    ...ngDevMode ? [{ debugName: "vialId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  phase = signal(
    "idle",
    ...ngDevMode ? [{ debugName: "phase" }] : (
      /* istanbul ignore next */
      []
    )
  );
  progress = signal(
    0,
    ...ngDevMode ? [{ debugName: "progress" }] : (
      /* istanbul ignore next */
      []
    )
  );
  observation = signal(
    "",
    ...ngDevMode ? [{ debugName: "observation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  result = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "result" }] : (
      /* istanbul ignore next */
      []
    )
  );
  trials = signal(
    [],
    ...ngDevMode ? [{ debugName: "trials" }] : (
      /* istanbul ignore next */
      []
    )
  );
  covered = signal(
    [],
    ...ngDevMode ? [{ debugName: "covered" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Sweeping the light is what separates sparkling crystals from dull powder. */
  lightAngle = signal(
    35,
    ...ngDevMode ? [{ debugName: "lightAngle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  zoom = signal(
    6,
    ...ngDevMode ? [{ debugName: "zoom" }] : (
      /* istanbul ignore next */
      []
    )
  );
  simulation = new DeterministicSimulationAdapter();
  timer;
  constructor() {
    let restored = false;
    this.simulation.initialize({
      id: "physical-property-comparison",
      settings: { keyFields: ["specimen", "test"], outcomeTable: physicalOutcomeTable }
    });
    this.flushDraft = persistWorkspaceDraft("properties-lab", () => ({
      vialId: this.vialId(),
      testId: this.testId(),
      observation: this.observation(),
      result: this.phase() === "settled" ? this.result() : void 0,
      drafts: [...this.drafts.entries()],
      trials: this.trials(),
      covered: this.covered(),
      lightAngle: this.lightAngle(),
      zoom: this.zoom()
    }), (saved) => {
      restored = true;
      if (Array.isArray(saved.trials))
        this.trials.set(saved.trials);
      if (Array.isArray(saved.covered))
        this.covered.set(saved.covered);
      if (typeof saved.lightAngle === "number")
        this.lightAngle.set(saved.lightAngle);
      if (typeof saved.zoom === "number")
        this.zoom.set(saved.zoom);
      if (this.vials.some((v) => v.vialId === saved.vialId))
        this.vialId.set(saved.vialId);
      if (this.tests.some((t) => t.id === saved.testId))
        this.testId.set(saved.testId);
      if (typeof saved.observation === "string")
        this.observation.set(saved.observation);
      if (saved.result && typeof saved.result === "object") {
        this.result.set(saved.result);
        this.phase.set("settled");
        this.progress.set(1);
      }
      if (Array.isArray(saved.drafts))
        for (const [key, value] of saved.drafts)
          this.drafts.set(key, value);
    });
    effect(() => {
      const initial = this.initialTestId();
      if (!restored && initial)
        untracked(() => this.selectTest(initial));
    });
    effect(() => {
      const id = this.selectedVialId();
      if (id && id !== this.vialId())
        this.selectVial(id);
    });
    effect(() => {
      const results = this.savedResults();
      const records = [];
      const covered = [];
      for (const [index, result] of results.entries()) {
        const trial = result.outputs;
        const inputs = trial?.["inputs"];
        const output2 = trial?.["outputs"];
        const vial = this.vials.find((v) => v.vialId === inputs?.["specimen"]);
        const test = this.tests.find((t) => t.id === inputs?.["test"]);
        if (!vial || !test || !output2)
          continue;
        covered.push(`${test.id}::${vial.vialId}`);
        records.push({
          id: index,
          vialCode: vial.code,
          testTitle: test.title,
          headline: String(output2["reading"] ?? "Recorded")
        });
      }
      if (records.length) {
        this.trials.set(records.reverse());
        this.covered.set([...new Set(covered)]);
      }
    });
  }
  ngOnDestroy() {
    this.stopTimer();
    this.flushDraft();
  }
  activeTest = computed(
    () => this.tests.find((test) => test.id === this.testId()) ?? this.tests[0],
    ...ngDevMode ? [{ debugName: "activeTest" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeVial = computed(
    () => this.vials.find((vial) => vial.vialId === this.vialId()) ?? this.vials[0],
    ...ngDevMode ? [{ debugName: "activeVial" }] : (
      /* istanbul ignore next */
      []
    )
  );
  running = computed(
    () => this.phase() === "running",
    ...ngDevMode ? [{ debugName: "running" }] : (
      /* istanbul ignore next */
      []
    )
  );
  grainProfile = computed(
    () => grainProfiles[this.vialId()] ?? defaultGrainProfile,
    ...ngDevMode ? [{ debugName: "grainProfile" }] : (
      /* istanbul ignore next */
      []
    )
  );
  grains = computed(
    () => buildGrainSpecs(this.grainProfile(), 26),
    ...ngDevMode ? [{ debugName: "grains" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Specimen field for the magnifier and scan bed, scattered under the lens. */
  field = computed(
    () => {
      const profile = this.grainProfile();
      return buildGrainSpecs(profile, 100).map((grain, index) => __spreadProps(__spreadValues({}, grain), {
        top: 12 + index * 29 % 74,
        left: 8 + index * 47 % 82
      }));
    },
    ...ngDevMode ? [{ debugName: "field" }] : (
      /* istanbul ignore next */
      []
    )
  );
  elapsedSeconds = computed(
    () => Math.round(this.progress() * waterTrialSeconds),
    ...ngDevMode ? [{ debugName: "elapsedSeconds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** How cloudy the water is right now, 0-1, driven by the outcome. */
  cloudiness = computed(
    () => {
      const output2 = this.result();
      if (this.testId() !== "solubility" || this.phase() === "idle") {
        return 0;
      }
      const settles = String(output2?.["settledLayer"] ?? "").includes("thin");
      const reading = String(output2?.["reading"] ?? "");
      const peak = reading.includes("Cloudy") ? 0.85 : 0.35;
      const ratio = this.progress();
      return settles ? peak : peak * Math.max(0, 1 - ratio * 1.35);
    },
    ...ngDevMode ? [{ debugName: "cloudiness" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Probe reading as a fraction of the instrument's range. */
  conductanceRatio = computed(
    () => {
      const ms = Number(this.result()?.["millisiemens"] ?? 0);
      return Math.min(ms / 10 * this.progress(), 1);
    },
    ...ngDevMode ? [{ debugName: "conductanceRatio" }] : (
      /* istanbul ignore next */
      []
    )
  );
  needleAngle = computed(
    () => -52 + this.conductanceRatio() * 104,
    ...ngDevMode ? [{ debugName: "needleAngle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lampGlow = computed(
    () => this.conductanceRatio(),
    ...ngDevMode ? [{ debugName: "lampGlow" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canCapture = computed(
    () => this.phase() === "settled" && this.observation().trim().length > 0,
    ...ngDevMode ? [{ debugName: "canCapture" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hint = computed(
    () => {
      if (this.running()) {
        return "Instrument running under equal conditions. Watch what changes.";
      }
      if (this.phase() === "settled") {
        if (this.preview)
          return "Trial retained locally. Change a specimen or instrument, or run again.";
        return "Describe what the instrument showed, then file it.";
      }
      switch (this.testId()) {
        case "appearance":
          return "Swing the light across the specimen. Crystals flash; powders stay dull.";
        case "solubility":
          return "Equal mass into equal water, stirred the same way. Watch for 60 seconds.";
        case "conductivity":
          return "Dip the calibrated probe into the solution and read the meter.";
        case "texture":
          return "Scan the surface without touching it and compare particle size.";
      }
    },
    ...ngDevMode ? [{ debugName: "hint" }] : (
      /* istanbul ignore next */
      []
    )
  );
  vialColor(vialId) {
    return this.vials.find((vial) => vial.vialId === vialId)?.color ?? "#4d7f8c";
  }
  hasRun(vialId, testId) {
    return this.covered().includes(`${testId}::${vialId}`);
  }
  coverage(testId) {
    return this.vials.filter((vial) => this.hasRun(vial.vialId, testId)).length;
  }
  selectTest(id) {
    if (this.running() || id === this.testId()) {
      return;
    }
    this.keepDraft();
    this.testId.set(id);
    this.resetTrial();
    this.restoreDraft();
  }
  selectVial(id) {
    if (this.running() || id === this.vialId()) {
      return;
    }
    this.keepDraft();
    this.vialId.set(id);
    this.resetTrial();
    this.restoreDraft();
    this.vialChanged.emit(id);
  }
  keepDraft() {
    this.drafts.set(`${this.testId()}::${this.vialId()}`, {
      observation: this.observation(),
      result: this.phase() === "settled" ? this.result() : void 0
    });
  }
  restoreDraft() {
    const draft = this.drafts.get(`${this.testId()}::${this.vialId()}`);
    if (!draft)
      return;
    this.observation.set(draft.observation);
    if (draft.result) {
      this.result.set(draft.result);
      this.phase.set("settled");
      this.progress.set(1);
    }
  }
  setLightAngle(value) {
    this.lightAngle.set(value);
  }
  setZoom(value) {
    this.zoom.set(value);
  }
  numberValue(event) {
    return Number(event.target.value);
  }
  async run() {
    if (this.running()) {
      return;
    }
    this.simulation.setInputs({ specimen: this.vialId(), test: this.testId() });
    this.simulation.beginTrial();
    const outputs = this.simulation.endTrial().outputs;
    this.result.set(outputs);
    this.observation.set("");
    this.phase.set("running");
    this.progress.set(0);
    this.renderQuality.probe();
    await this.sweep();
    this.phase.set("settled");
    this.record(outputs);
  }
  sweep() {
    return new Promise((resolve) => {
      const started = Date.now();
      this.stopTimer();
      this.timer = setInterval(() => {
        const ratio = Math.min((Date.now() - started) / trialDurationMs, 1);
        this.progress.set(ratio);
        if (ratio >= 1) {
          this.stopTimer();
          resolve();
        }
      }, 70);
    });
  }
  stopTimer() {
    if (this.timer !== void 0) {
      clearInterval(this.timer);
      this.timer = void 0;
    }
  }
  resetTrial() {
    this.stopTimer();
    this.phase.set("idle");
    this.progress.set(0);
    this.result.set(void 0);
    this.observation.set("");
  }
  record(outputs) {
    const key = `${this.testId()}::${this.vialId()}`;
    this.covered.update((current) => [.../* @__PURE__ */ new Set([...current, key])]);
    this.trials.update((current) => [
      {
        id: Math.max(0, ...current.map((entry) => entry.id)) + 1,
        vialCode: this.activeVial().code,
        testTitle: this.activeTest().title,
        headline: String(outputs["reading"] ?? "Recorded")
      },
      ...current.slice(0, 39)
    ]);
  }
  capture() {
    const outputs = this.result();
    if (!this.canCapture() || outputs === void 0) {
      return;
    }
    this.captured.emit({
      activityId: "activity-property-comparison",
      evidenceId: "evidence-property-trials",
      result: {
        inputs: { specimen: this.vialId(), test: this.testId() },
        outputs
      },
      note: this.observation().trim()
    });
    this.drafts.delete(`${this.testId()}::${this.vialId()}`);
    this.resetTrial();
  }
  entries(value) {
    return value === void 0 ? [] : Object.entries(value).map(([key, item]) => [readableLabel(key), String(item)]);
  }
  static \u0275fac = function PropertiesLabComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PropertiesLabComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PropertiesLabComponent, selectors: [["app-properties-lab"]], hostVars: 2, hostBindings: function PropertiesLabComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("lab-preview", ctx.preview);
    }
  }, inputs: { initialTestId: [1, "initialTestId"], selectedVialId: [1, "selectedVialId"], embedded: [1, "embedded"], savedResults: [1, "savedResults"] }, outputs: { captured: "captured", vialChanged: "vialChanged" }, decls: 36, vars: 16, consts: [[1, "lab-canvas"], ["role", "img", "aria-label", "Physical properties bench", 1, "lab-scene"], ["aria-hidden", "true", 1, "lab-shade"], [1, "lab-grid"], ["aria-label", "Properties instruments and specimens", 1, "rack"], [1, "kicker"], [1, "instrument-list"], [1, "stage"], [1, "stage-head"], [1, "stage-clock"], [1, "preview-run"], [1, "instrument-well"], [1, "water-rig"], [1, "probe-rig"], [1, "scan-rig"], [1, "stage-controls"], ["aria-label", "Property trial readings", 1, "record", 3, "hidden"], [1, "record-note"], ["type", "button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "instrument-icon"], [1, "instrument-copy"], [1, "coverage"], [1, "vial-row"], ["alt", "", 3, "src"], ["aria-hidden", "true", 1, "done"], [1, "trial-log"], [1, "trial-index"], ["type", "button", 1, "primary-action", 3, "click", "disabled"], ["aria-live", "polite", 1, "stage-hint"], [1, "magnifier"], ["alt", "", 1, "part-plate", 3, "src"], [1, "lens"], ["aria-hidden", "true", 1, "lens-field"], [3, "sparkle", "background", "top", "left", "--%NS%grain-size", "--%NS%spin"], ["aria-hidden", "true", 1, "lens-glare"], ["aria-hidden", "true", 1, "scale-bar"], ["aria-hidden", "true", 1, "lens-ring"], [1, "optics-controls"], ["type", "range", "min", "0", "max", "180", "step", "5", 3, "input", "value"], ["type", "range", "min", "3", "max", "12", "step", "1", 3, "input", "value"], [1, "cup"], ["alt", "", 1, "part-plate", 3, "src", "mix-blend-mode"], [1, "cup-glass"], [1, "water"], ["aria-hidden", "true", 1, "cloud"], ["aria-hidden", "true", 1, "water-surface"], ["aria-hidden", "true", 1, "settling"], ["aria-hidden", "true", 1, "settled-layer", 3, "background"], ["aria-hidden", "true", 1, "cup-outline"], [1, "rig-caption"], [3, "background", "--%NS%grain-x", "--%NS%grain-size", "animation-delay"], ["aria-hidden", "true", 1, "settled-layer"], [1, "meter"], ["viewBox", "0 0 200 120", "aria-hidden", "true"], ["d", "M12 112 A88 88 0 0 1 188 112 Z", 1, "meter-face"], ["x1", "100", "y1", "24", "x2", "100", "y2", "34", 1, "meter-tick"], ["x1", "100", "y1", "112", "x2", "100", "y2", "34", 1, "meter-needle"], ["cx", "100", "cy", "112", "r", "7", 1, "meter-pin"], ["aria-live", "polite", 1, "meter-read"], [1, "cell"], [1, "lamp"], ["aria-hidden", "true", 1, "lamp-bulb"], ["aria-hidden", "true", 1, "lamp-halo"], [1, "probe"], [1, "cell-glass"], ["aria-hidden", "true", 1, "cell-water"], ["aria-hidden", "true", 1, "probe-body"], ["aria-hidden", "true", 1, "probe-tines"], [1, "scan-bed"], ["aria-hidden", "true", 1, "scan-field"], [3, "sparkle", "background", "top", "left", "--%NS%grain-size"], ["aria-hidden", "true", 1, "scan-line"], ["aria-hidden", "true", 1, "scan-scale"], ["aria-live", "polite", 1, "readout"], [1, "observation-field"], ["rows", "4", "placeholder", "Under the light I could see\u2026", 3, "ngModelChange", "ngModel"]], template: function PropertiesLabComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275element(1, "div", 1)(2, "div", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "aside", 4)(5, "span", 5);
      \u0275\u0275text(6, "Instruments");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "h2");
      \u0275\u0275text(8, "Choose a test");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "ul", 6);
      \u0275\u0275repeaterCreate(10, PropertiesLabComponent_For_11_Template, 10, 9, "li", null, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(12, PropertiesLabComponent_Conditional_12_Template, 5, 0);
      \u0275\u0275conditionalCreate(13, PropertiesLabComponent_Conditional_13_Template, 5, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 7)(15, "header", 8)(16, "div")(17, "span", 5);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "h1");
      \u0275\u0275text(20);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(21, PropertiesLabComponent_Conditional_21_Template, 7, 1, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(22, PropertiesLabComponent_Conditional_22_Template, 5, 3, "div", 10);
      \u0275\u0275elementStart(23, "div", 11);
      \u0275\u0275conditionalCreate(24, PropertiesLabComponent_Case_24_Template, 20, 9)(25, PropertiesLabComponent_Case_25_Template, 12, 12, "div", 12)(26, PropertiesLabComponent_Case_26_Template, 22, 10, "div", 13)(27, PropertiesLabComponent_Case_27_Template, 10, 2, "div", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(28, PropertiesLabComponent_Conditional_28_Template, 5, 3, "div", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "aside", 16)(30, "span", 5);
      \u0275\u0275text(31, "Your record");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "h2");
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(34, PropertiesLabComponent_Conditional_34_Template, 5, 1)(35, PropertiesLabComponent_Conditional_35_Template, 2, 0, "p", 17);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_9_0;
      \u0275\u0275classProp("embedded", ctx.embedded());
      \u0275\u0275advance(3);
      \u0275\u0275classProp("has-record", ctx.phase() === "settled");
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.tests);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.embedded() ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.trials().length > 0 ? 13 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", ctx.activeTest().instrument, " \xB7 equal conditions");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2("", ctx.activeTest().title, " \xB7 Vial ", ctx.activeVial().code);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.testId() === "solubility" && ctx.phase() !== "idle" ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.preview ? 22 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_9_0 = ctx.testId()) === "appearance" ? 24 : tmp_9_0 === "solubility" ? 25 : tmp_9_0 === "conductivity" ? 26 : tmp_9_0 === "texture" ? 27 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(!ctx.preview ? 28 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("hidden", !(ctx.phase() === "settled"));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.preview ? "Instrument reading" : "What did you see?");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.phase() === "settled" ? 34 : 35);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ['\n[_nghost-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: block;\n}\nbutton[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  color: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #88e4df;\n  outline-offset: 2px;\n}\n.lab-canvas[_ngcontent-%COMP%], \n.lab-scene[_ngcontent-%COMP%], \n.lab-shade[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.lab-canvas[_ngcontent-%COMP%] {\n  overflow: auto;\n  color: #ebf7fc;\n  background: #04101a;\n}\n.lab-scene[_ngcontent-%COMP%] {\n  z-index: 0;\n  background: url(/week2-test-scenes-v2.webp) left top/200% 200% no-repeat;\n  background-color: #04101a;\n  filter: saturate(0.85) brightness(0.36);\n}\n.lab-shade[_ngcontent-%COMP%] {\n  z-index: 1;\n  background:\n    radial-gradient(\n      circle at 50% 32%,\n      rgba(96, 197, 205, 0.12),\n      transparent 58%),\n    linear-gradient(\n      180deg,\n      rgba(3, 12, 19, 0.74),\n      rgba(3, 12, 19, 0.94));\n}\n.lab-grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: grid;\n  min-height: 100%;\n  align-items: start;\n  gap: 0.85rem;\n  grid-template-columns: minmax(12.5rem, 0.85fr) minmax(0, 2fr) minmax(12.5rem, 0.9fr);\n  padding: 0.9rem;\n}\n.kicker[_ngcontent-%COMP%] {\n  color: #79d8d5;\n  font-size: 0.6rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #f3fbfd;\n  font-size: clamp(1rem, 1.8vw, 1.3rem);\n  font-weight: 850;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0.1rem 0 0;\n  color: #eef8fa;\n  font-size: 0.95rem;\n  font-weight: 850;\n}\n.rack[_ngcontent-%COMP%], \n.record[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 0.5rem;\n  border: 1px solid #2b4d5f;\n  border-radius: 0.7rem;\n  padding: 0.8rem;\n  background: rgba(6, 21, 31, 0.9);\n}\n.record-note[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #8aa8b5;\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.instrument-list[_ngcontent-%COMP%], \n.vial-row[_ngcontent-%COMP%], \n.trial-log[_ngcontent-%COMP%] {\n  display: grid;\n  margin: 0;\n  padding: 0;\n  gap: 0.35rem;\n  list-style: none;\n}\n.instrument-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  gap: 0.5rem;\n  border: 1px solid #2d5162;\n  border-radius: 0.5rem;\n  padding: 0.4rem 0.5rem;\n  color: #a9c6d1;\n  text-align: left;\n  background: rgba(11, 33, 45, 0.9);\n  cursor: pointer;\n}\n.instrument-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #4f97a2;\n}\n.instrument-list[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #7fe3dd;\n  color: #f2fdfd;\n  background: rgba(20, 69, 79, 0.95);\n}\n.instrument-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.instrument-copy[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 1;\n  gap: 0.05rem;\n}\n.instrument-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  font-weight: 800;\n}\n.instrument-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7f9ead;\n  font-size: 0.58rem;\n}\n.coverage[_ngcontent-%COMP%] {\n  color: #7fd6d2;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 0.62rem;\n  font-weight: 800;\n}\n.instrument-icon[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.8rem;\n  height: 1.8rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #2c5464;\n  border-radius: 0.35rem;\n  background: #0a2531;\n}\n.instrument-icon[_ngcontent-%COMP%]::before {\n  content: "";\n  display: block;\n}\n.instrument-icon[data-test=appearance][_ngcontent-%COMP%]::before {\n  width: 0.85rem;\n  height: 0.85rem;\n  border: 2px solid #9fd2e0;\n  border-radius: 50%;\n}\n.instrument-icon[data-test=solubility][_ngcontent-%COMP%]::before {\n  width: 0.75rem;\n  height: 0.9rem;\n  border: 2px solid #9fd2e0;\n  border-radius: 0 0 0.25rem 0.25rem;\n  background:\n    linear-gradient(\n      180deg,\n      transparent 40%,\n      rgba(159, 210, 224, 0.5) 40%);\n}\n.instrument-icon[data-test=conductivity][_ngcontent-%COMP%]::before {\n  width: 0.5rem;\n  height: 0.95rem;\n  border-right: 2px solid #9fd2e0;\n  border-left: 2px solid #9fd2e0;\n}\n.instrument-icon[data-test=texture][_ngcontent-%COMP%]::before {\n  width: 0.95rem;\n  height: 0.6rem;\n  border-top: 2px solid #9fd2e0;\n  border-bottom: 2px dotted #9fd2e0;\n}\n.vial-row[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.3rem;\n}\n.vial-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  justify-items: center;\n  gap: 0.15rem;\n  border: 1px solid #2d5162;\n  border-radius: 0.45rem;\n  padding: 0.3rem 0.15rem;\n  background: rgba(11, 33, 45, 0.9);\n  cursor: pointer;\n}\n.vial-row[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: var(--%NS%vial-color, #7fe3dd);\n  background: rgba(20, 69, 79, 0.95);\n}\n.vial-row[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 1.6rem;\n  height: 1.6rem;\n  border-radius: 0.25rem;\n  object-fit: cover;\n}\n.vial-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 900;\n}\n.vial-row[_ngcontent-%COMP%]   .done[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.1rem;\n  right: 0.15rem;\n  color: #7fe3dd;\n  font-size: 0.55rem;\n  font-weight: 900;\n}\n.trial-log[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.4rem;\n  border-left: 2px solid #2f6570;\n  padding-left: 0.45rem;\n}\n.trial-log[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  display: grid;\n}\n.trial-index[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.1rem;\n  height: 1.1rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border-radius: 50%;\n  color: #08222b;\n  background: #7fe3dd;\n  font-size: 0.55rem;\n  font-weight: 900;\n}\n.trial-log[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e4f2f6;\n  font-size: 0.66rem;\n}\n.trial-log[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #8aa8b5;\n  font-size: 0.6rem;\n  line-height: 1.3;\n}\n.stage[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 0.7rem;\n  border: 1px solid #2f5972;\n  border-radius: 0.8rem;\n  padding: 0.9rem;\n  background: rgba(5, 19, 28, 0.74);\n}\n.stage-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.8rem;\n}\n.stage-clock[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: end;\n  border: 1px solid #2f6570;\n  border-radius: 0.5rem;\n  padding: 0.25rem 0.55rem;\n  background: #061c26;\n}\n.stage-clock[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7f9ead;\n  font-size: 0.52rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.stage-clock[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #7fe3dd;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 1.15rem;\n  line-height: 1;\n}\n.stage-clock[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n}\n.instrument-well[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 17rem;\n  place-items: center;\n  border: 1px solid #24485a;\n  border-radius: 0.6rem;\n  padding: 0.9rem;\n  background:\n    radial-gradient(\n      ellipse at 50% 18%,\n      rgba(120, 210, 215, 0.09),\n      transparent 62%),\n    rgba(3, 14, 21, 0.6);\n}\n.part-plate[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  pointer-events: none;\n}\n.magnifier[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  width: min(100%, 15rem);\n  aspect-ratio: 1;\n  place-items: center;\n}\n.lens[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: 78%;\n  height: 78%;\n  overflow: hidden;\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      circle at 32% 26%,\n      #123240,\n      #061821 72%);\n}\n.lens-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 84%;\n  height: 84%;\n  border: 6px solid #6f97a6;\n  border-radius: 50%;\n  box-shadow: inset 0 0 1.2rem rgba(0, 0, 0, 0.6), 0 0.4rem 1.4rem rgba(0, 0, 0, 0.45);\n}\n.lens-field[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.lens-field[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.scan-field[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  width: var(--%NS%grain-size, 4px);\n  height: var(--%NS%grain-size, 4px);\n  border-radius: 24%;\n  opacity: 0.92;\n  transform: rotate(var(--%NS%spin, 0deg));\n}\n.lens-field[_ngcontent-%COMP%]   i.sparkle[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0.3rem rgba(255, 255, 255, calc(0.25 + 0.75 * (1 - abs(var(--%NS%light-angle, 35) - 90) / 90))), 0 0 0.1rem #fff;\n}\n.lens-glare[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      calc(var(--%NS%light-angle, 35) * 1deg),\n      rgba(255, 255, 255, 0.24),\n      transparent 46%);\n  pointer-events: none;\n}\n.scale-bar[_ngcontent-%COMP%], \n.scan-scale[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 8%;\n  left: 12%;\n  display: flex;\n  align-items: center;\n  gap: 0.3rem;\n  color: rgba(226, 245, 250, 0.8);\n  font-size: 0.55rem;\n  font-weight: 800;\n}\n.scale-bar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.scan-scale[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: block;\n  width: 2.2rem;\n  height: 2px;\n  background: rgba(226, 245, 250, 0.8);\n}\n.optics-controls[_ngcontent-%COMP%] {\n  display: grid;\n  width: min(100%, 20rem);\n  gap: 0.4rem;\n  margin-top: 0.7rem;\n}\n.optics-controls[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  align-items: center;\n  gap: 0.3rem;\n  grid-template-columns: 6.5rem 1fr auto;\n  color: #a9c6d1;\n  font-size: 0.62rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.optics-controls[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.optics-controls[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #7fe3dd;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 0.72rem;\n}\n.water-rig[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  gap: 0.6rem;\n}\n.cup[_ngcontent-%COMP%] {\n  position: relative;\n  width: 8.5rem;\n  aspect-ratio: 0.82;\n}\n.cup-glass[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 16% 14% 9% 14%;\n  display: flex;\n  align-items: flex-end;\n  overflow: hidden;\n  border-radius: 0 0 0.7rem 0.7rem;\n}\n.cup-outline[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  border: 2.5px solid #9fd2e0;\n  border-top: 0;\n  border-radius: 0 0 0.7rem 0.7rem;\n}\n.water[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 76%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(190, 228, 240, 0.34),\n      rgba(140, 195, 214, 0.46));\n}\n.cloud[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  filter: blur(2px);\n  transition: opacity 0.5s ease;\n}\n.water-surface[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -2px;\n  right: 0;\n  left: 0;\n  height: 4px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.5);\n}\n.water-surface.agitated[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_ripple 0.6s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_ripple {\n  0%, 100% {\n    transform: scaleY(1);\n  }\n  50% {\n    transform: scaleY(2.4) translateX(2px);\n  }\n}\n.settling[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 50%;\n}\n.settling[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  width: var(--%NS%grain-size, 3px);\n  height: var(--%NS%grain-size, 3px);\n  border-radius: 30%;\n  opacity: 0;\n  animation: _ngcontent-%COMP%_sink 2.4s ease-in infinite;\n}\n@keyframes _ngcontent-%COMP%_sink {\n  0% {\n    opacity: 0;\n    transform: translate(0, 0);\n  }\n  12% {\n    opacity: 0.9;\n  }\n  100% {\n    opacity: 0.15;\n    transform: translate(var(--%NS%grain-x, 0), 5.4rem);\n  }\n}\n.settled-layer[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 7%;\n  opacity: 0.75;\n}\n.rig-caption[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #8aa8b5;\n  font-size: 0.66rem;\n}\n.probe-rig[_ngcontent-%COMP%] {\n  display: grid;\n  align-items: center;\n  gap: 1.2rem;\n  grid-template-columns: auto auto;\n}\n.meter[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  gap: 0.2rem;\n  width: 11rem;\n}\n.meter[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n}\n.meter-face[_ngcontent-%COMP%] {\n  fill: #071c26;\n  stroke: #2f6570;\n  stroke-width: 2;\n}\n.meter-tick[_ngcontent-%COMP%] {\n  stroke: rgba(198, 226, 236, 0.55);\n  stroke-width: 2;\n}\n.meter-needle[_ngcontent-%COMP%] {\n  stroke: #f0805a;\n  stroke-linecap: round;\n  stroke-width: 3;\n  transition: transform 0.18s cubic-bezier(0.34, 1.5, 0.5, 1);\n}\n.meter-pin[_ngcontent-%COMP%] {\n  fill: #9fd2e0;\n}\n.meter-read[_ngcontent-%COMP%] {\n  color: #7fe3dd;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 1rem;\n  font-weight: 800;\n}\n.meter-read[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.62rem;\n}\n.cell[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  width: 9rem;\n  justify-items: center;\n}\n.lamp[_ngcontent-%COMP%] {\n  position: relative;\n  width: 3rem;\n  height: 3.4rem;\n  display: grid;\n  place-items: center;\n}\n.lamp-bulb[_ngcontent-%COMP%] {\n  width: 1.5rem;\n  height: 1.5rem;\n  border: 2px solid #b58a3c;\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      circle at 40% 35%,\n      rgba(255, 236, 180, calc(0.2 + 0.8 * var(--%NS%glow, 0))),\n      rgba(80, 62, 26, 0.6));\n}\n.lamp-halo[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 3.4rem;\n  height: 3.4rem;\n  border-radius: 50%;\n  opacity: var(--%NS%glow, 0);\n  background:\n    radial-gradient(\n      circle,\n      rgba(255, 228, 150, 0.75),\n      transparent 68%);\n  filter: blur(4px);\n  transition: opacity 0.25s ease;\n}\n.probe[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  width: 2.6rem;\n  height: 5rem;\n  transition: transform 0.6s cubic-bezier(0.4, 1.2, 0.5, 1);\n  transform: translateY(-0.9rem);\n}\n.probe.dipped[_ngcontent-%COMP%] {\n  transform: translateY(0.5rem);\n}\n.probe-body[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  width: 0.85rem;\n  height: 2.6rem;\n  border-radius: 0.2rem;\n  background:\n    linear-gradient(\n      90deg,\n      #1d3a46,\n      #4d7686 45%,\n      #1d3a46);\n  transform: translateX(-50%);\n}\n.probe-tines[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 2.5rem;\n  left: 50%;\n  width: 1.1rem;\n  height: 2.2rem;\n  border-right: 3px solid #cfe6ee;\n  border-left: 3px solid #cfe6ee;\n  transform: translateX(-50%);\n}\n.cell-glass[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  width: 6rem;\n  height: 4rem;\n  align-items: flex-end;\n  margin-top: -1.2rem;\n  overflow: hidden;\n  border: 2px solid #9fd2e0;\n  border-top: 0;\n  border-radius: 0 0 0.5rem 0.5rem;\n}\n.cell-water[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 72%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(190, 228, 240, 0.36),\n      rgba(140, 195, 214, 0.5));\n}\n.scan-rig[_ngcontent-%COMP%] {\n  position: relative;\n  width: min(100%, 20rem);\n  aspect-ratio: 1.6;\n}\n.scan-bed[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 18% 10% 14% 10%;\n  overflow: hidden;\n  border: 1px solid #2f6570;\n  border-radius: 0.4rem;\n  background:\n    linear-gradient(\n      180deg,\n      #0a2028,\n      #061318);\n}\n.scan-field[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.scan-field[_ngcontent-%COMP%]   i.sparkle[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0.25rem rgba(255, 255, 255, 0.75);\n}\n.scan-line[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      #7fe3dd,\n      transparent);\n  box-shadow: 0 0 0.7rem rgba(127, 227, 221, 0.75);\n  animation: _ngcontent-%COMP%_sweep 1.9s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_sweep {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(7.5rem);\n  }\n}\n.stage-controls[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n}\n.stage-hint[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #9dbcc8;\n  font-size: 0.72rem;\n}\n.primary-action[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  border-radius: 0.5rem;\n  padding: 0.55rem 0.8rem;\n  color: #04212a;\n  background:\n    linear-gradient(\n      135deg,\n      #a0f1e8,\n      #5dc9d0);\n  font-size: 0.75rem;\n  font-weight: 850;\n  cursor: pointer;\n}\n.primary-action[_ngcontent-%COMP%]:disabled {\n  color: #7f9ead;\n  background: #16323f;\n  cursor: not-allowed;\n}\n.readout[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.2rem;\n  border: 1px solid #2d5162;\n  border-radius: 0.5rem;\n  padding: 0.45rem 0.55rem;\n  background: rgba(11, 33, 45, 0.85);\n}\n.readout[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.readout[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7c9aa8;\n  font-size: 0.58rem;\n  font-weight: 700;\n}\n.readout[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dcecf1;\n  font-size: 0.66rem;\n  text-align: right;\n}\n.observation-field[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n  color: #a9c6d1;\n  font-size: 0.62rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.observation-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border: 1px solid #2f5566;\n  border-radius: 0.5rem;\n  padding: 0.5rem;\n  color: #eaf6f9;\n  background: #071c27;\n  font-size: 0.74rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  resize: vertical;\n  text-transform: none;\n}\n@container (max-width: 1180px) {\n  .lab-grid[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(11rem, 0.85fr) minmax(0, 2fr);\n  }\n  .record[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n  }\n}\n@container (max-width: 820px) {\n  .lab-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .record[_ngcontent-%COMP%] {\n    grid-column: auto;\n  }\n  .probe-rig[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    justify-items: center;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .scan-line[_ngcontent-%COMP%], \n   .settling[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n   .water-surface.agitated[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  .settling[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    opacity: 0.8;\n  }\n  .meter-needle[_ngcontent-%COMP%], \n   .probe[_ngcontent-%COMP%], \n   .cloud[_ngcontent-%COMP%], \n   .lamp-halo[_ngcontent-%COMP%] {\n    transition-duration: 0.001ms;\n  }\n}\n[_nghost-%COMP%] {\n  container-type: inline-size;\n}\n.embedded[_ngcontent-%COMP%]   .lab-grid[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(135px, 0.7fr) minmax(0, 2fr);\n}\n.embedded[_ngcontent-%COMP%]   .record[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n@container (max-width: 620px) {\n  .embedded[_ngcontent-%COMP%]   .lab-grid[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n[_nghost-%COMP%] {\n  container-type: inline-size;\n}\n.workbench-station[_nghost-%COMP%] {\n  position: relative;\n  inset: auto;\n}\n.workbench-station[_nghost-%COMP%]   .lab-canvas[_ngcontent-%COMP%] {\n  position: relative;\n  inset: auto;\n  min-height: 34rem;\n  overflow: visible;\n}\n.workbench-station[_nghost-%COMP%]   .lab-canvas[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n}\n.lab-grid[_ngcontent-%COMP%] {\n  padding-top: 80px;\n}\n.lab-grid.has-record[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 1fr);\n}\n.lab-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%] {\n  display: none;\n}\n.embedded[_ngcontent-%COMP%]   .record[_ngcontent-%COMP%] {\n  grid-column: auto;\n}\n.record[hidden][_ngcontent-%COMP%] {\n  display: none;\n}\n.kicker[_ngcontent-%COMP%], \n.instrument-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.coverage[_ngcontent-%COMP%], \n.trial-log[_ngcontent-%COMP%] {\n  display: none;\n}\n@container (max-width: 700px) {\n  .lab-grid[_ngcontent-%COMP%] {\n    padding-top: 120px;\n  }\n  .lab-grid.has-record[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.lab-preview[_nghost-%COMP%] {\n  position: relative;\n  inset: auto;\n  display: block;\n  container-type: inline-size;\n}\n.lab-preview[_nghost-%COMP%]   .lab-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bay-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .station-canvas[_ngcontent-%COMP%] {\n  position: relative;\n  inset: auto;\n  min-height: 0;\n  overflow: visible;\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%] {\n  padding: 14px;\n  min-height: 0;\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n  gap: 12px;\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%] {\n  display: block;\n}\n.lab-preview[_nghost-%COMP%]   .record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .console[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.lab-preview[_nghost-%COMP%]   .record[hidden][_ngcontent-%COMP%] {\n  display: none;\n}\n.lab-preview[_nghost-%COMP%]   .stage[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rig[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .console[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.lab-preview[_nghost-%COMP%]   .kicker[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .instrument-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .trial-log[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .procedure-log[_ngcontent-%COMP%] {\n  display: block;\n}\n.lab-preview[_nghost-%COMP%]   .trial-log[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .procedure-log[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow: auto;\n}\n.lab-preview[_nghost-%COMP%]   .instrument-well[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .chamber-well[_ngcontent-%COMP%] {\n  min-height: 230px;\n}\n.lab-preview[_nghost-%COMP%]   .instrument-well[_ngcontent-%COMP%] {\n  height: 245px;\n}\n.lab-preview[_nghost-%COMP%]   .stage-controls[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%] {\n  width: auto;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  flex-basis: 100%;\n  margin: 0;\n}\n.lab-preview[_nghost-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.lab-preview[_nghost-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.lab-preview[_nghost-%COMP%]   button[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 44px;\n  font-size: 0.87rem;\n}\n.lab-preview[_nghost-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .record-note[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .stage-hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rig-hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout-stack[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout-stack[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rack-note[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.lab-preview[_nghost-%COMP%]   input[type=range][_ngcontent-%COMP%] {\n  min-height: 32px;\n}\n.lab-preview[_nghost-%COMP%]   [_ngcontent-%COMP%]:is(button, select, summary, input):focus-visible {\n  outline: 3px solid #a9efdc;\n  outline-offset: 3px;\n}\n@container (max-width: 640px) {\n  .lab-preview[_nghost-%COMP%]   .lab-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bench-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .matter-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .restoration-stage[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 10px;\n  }\n  .lab-preview[_nghost-%COMP%]   .stage[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .rig[_ngcontent-%COMP%] {\n    grid-row: 1;\n  }\n  .lab-preview[_nghost-%COMP%]   .rack[_ngcontent-%COMP%] {\n    grid-row: 2;\n  }\n  .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%] {\n    grid-row: 1;\n  }\n  .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%]   .stage[_ngcontent-%COMP%] {\n    grid-row: 2;\n  }\n  .lab-preview[_nghost-%COMP%]   .test-list[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .shelf-plan[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .lab-preview[_nghost-%COMP%]   .instrument-list[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .chamber-list[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .lab-preview[_nghost-%COMP%]   .focus-specimen[_ngcontent-%COMP%] {\n    max-width: 130px;\n    justify-self: center;\n  }\n  .lab-preview[_nghost-%COMP%]   .focus-specimen[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    max-height: 150px;\n  }\n  .lab-preview[_nghost-%COMP%]   .chamber-well[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .lab-preview[_nghost-%COMP%]   .probe-rig[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=properties-lab.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PropertiesLabComponent, [{
    type: Component,
    args: [{ selector: "app-properties-lab", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, host: { "[class.lab-preview]": "preview" }, template: `<section class="lab-canvas" [class.embedded]="embedded()">\r
  <div class="lab-scene" role="img" aria-label="Physical properties bench"></div>\r
  <div class="lab-shade" aria-hidden="true"></div>\r
\r
  <div class="lab-grid" [class.has-record]="phase() === 'settled'">\r
    <!-- ---- Instruments and specimens -------------------------------------- -->\r
    <aside class="rack" aria-label="Properties instruments and specimens">
      <span class="kicker">Instruments</span>\r
      <h2>Choose a test</h2>
\r
      <ul class="instrument-list">\r
        @for (test of tests; track test.id) {\r
          <li>\r
            <button\r
              type="button"\r
              [class.active]="testId() === test.id"\r
              [disabled]="running()"\r
              [attr.aria-pressed]="testId() === test.id"\r
              (click)="selectTest(test.id)"\r
            >\r
              <span class="instrument-icon" [attr.data-test]="test.id" aria-hidden="true"></span>\r
              <span class="instrument-copy">\r
                <strong>{{ test.title }}</strong>\r
                <small>{{ test.instrument }}</small>\r
              </span>\r
              <span class="coverage" [attr.aria-label]="coverage(test.id) + ' of 4 vials tested'">\r
                {{ coverage(test.id) }}/4\r
              </span>\r
            </button>\r
          </li>\r
        }\r
      </ul>\r
\r
      @if (!embedded()) {\r
        <span class="kicker">Specimens</span>\r
        <ul class="vial-row">\r
          @for (vial of vials; track vial.vialId) {\r
            <li>\r
              <button\r
                type="button"\r
                [class.active]="vialId() === vial.vialId"\r
                [style.--vial-color]="vial.color"\r
                [disabled]="running()"\r
                [attr.aria-pressed]="vialId() === vial.vialId"\r
                [attr.aria-label]="\r
                  'Vial ' + vial.code + (hasRun(vial.vialId, testId()) ? ', already tested' : '')\r
                "\r
                (click)="selectVial(vial.vialId)"\r
              >\r
                <img [src]="vial.image" alt="" />\r
                <strong>{{ vial.code }}</strong>\r
                @if (hasRun(vial.vialId, testId())) {\r
                  <span class="done" aria-hidden="true">\u2713</span>\r
                }\r
              </button>\r
            </li>\r
          }\r
        </ul>\r
      }\r
\r
      @if (trials().length > 0) {\r
        <span class="kicker">Trial log</span>\r
        <ol class="trial-log">\r
          @for (trial of trials(); track trial.id) {\r
            <li>\r
              <span class="trial-index">{{ trial.vialCode }}</span>\r
              <span>\r
                <strong>{{ trial.testTitle }}</strong>\r
                <small>{{ trial.headline }}</small>\r
              </span>\r
            </li>\r
          }\r
        </ol>\r
      }\r
    </aside>\r
\r
    <!-- ---- The instrument stage ------------------------------------------- -->\r
    <div class="stage">\r
      <header class="stage-head">\r
        <div>\r
          <span class="kicker">{{ activeTest().instrument }} \xB7 equal conditions</span>\r
          <h1>{{ activeTest().title }} \xB7 Vial {{ activeVial().code }}</h1>\r
        </div>\r
        @if (testId() === 'solubility' && phase() !== 'idle') {\r
          <div class="stage-clock">\r
            <small>Trial clock</small>\r
            <strong>{{ elapsedSeconds() }}<span>s</span></strong>\r
          </div>\r
        }\r
      </header>\r
\r
      @if (preview) {
        <div class="preview-run">
          <button class="primary-action" type="button" [disabled]="running()" (click)="run()">{{ running() ? 'Running\u2026' : 'Run equal-condition trial' }}</button>
          <p class="stage-hint" aria-live="polite">{{ hint() }}</p>
        </div>
      }
      <div class="instrument-well">
        @switch (testId()) {\r
          <!-- ---- Optical scan: a lens with a swinging key light ---- -->\r
          @case ('appearance') {\r
            <div class="magnifier" [style.--light-angle.deg]="lightAngle()">\r
              @if (art.magnifier.src; as plate) {\r
                <img class="part-plate" [src]="plate" alt="" />\r
              }\r
              <div class="lens" [style.--zoom]="zoom()">\r
                <div class="lens-field" aria-hidden="true">\r
                  @for (grain of field(); track grain.id) {\r
                    <i\r
                      [class.sparkle]="grain.sparkle"\r
                      [style.background]="activeVial().color"\r
                      [style.top.%]="grain.top"\r
                      [style.left.%]="grain.left"\r
                      [style.--grain-size.px]="grain.size * zoom() * 0.4"\r
                      [style.--spin]="grain.spinDeg + 'deg'"\r
                    ></i>\r
                  }\r
                </div>\r
                <span class="lens-glare" aria-hidden="true"></span>\r
                <span class="scale-bar" aria-hidden="true"><i></i>1 mm</span>\r
              </div>\r
              @if (!art.magnifier.src) {\r
                <span class="lens-ring" aria-hidden="true"></span>\r
              }\r
            </div>\r
\r
            <div class="optics-controls">\r
              <label>\r
                Light angle\r
                <input\r
                  type="range"\r
                  min="0"\r
                  max="180"\r
                  step="5"\r
                  [value]="lightAngle()"\r
                  (input)="setLightAngle(numberValue($event))"\r
                />\r
              </label>\r
              <label>\r
                Magnification\r
                <input\r
                  type="range"\r
                  min="3"\r
                  max="12"\r
                  step="1"\r
                  [value]="zoom()"\r
                  (input)="setZoom(numberValue($event))"\r
                />\r
                <strong>{{ zoom() }}\xD7</strong>\r
              </label>\r
            </div>\r
          }\r
\r
          <!-- ---- Water trial: powder in, cloudiness clears or holds ---- -->\r
          @case ('solubility') {\r
            <div class="water-rig">\r
              <div class="cup" [class.stirring]="running()">\r
                @if (art.waterCup.src; as plate) {\r
                  <img\r
                    class="part-plate"\r
                    [src]="plate"\r
                    [style.mix-blend-mode]="art.waterCup.blend"\r
                    alt=""\r
                  />\r
                }\r
                <div class="cup-glass">\r
                  <div class="water">\r
                    <span\r
                      class="cloud"\r
                      [style.opacity]="cloudiness()"\r
                      [style.background]="activeVial().color"\r
                      aria-hidden="true"\r
                    ></span>\r
                    <span\r
                      class="water-surface"\r
                      [class.agitated]="running()"\r
                      aria-hidden="true"\r
                    ></span>\r
                    @if (running()) {\r
                      <div class="settling" aria-hidden="true">\r
                        @for (grain of grains(); track grain.id) {\r
                          <i\r
                            [style.background]="activeVial().color"\r
                            [style.--grain-x.px]="grain.offsetX"\r
                            [style.--grain-size.px]="grain.size"\r
                            [style.animation-delay.ms]="grain.delayMs"\r
                          ></i>\r
                        }\r
                      </div>\r
                    }\r
                    @if (phase() === 'settled' && cloudiness() > 0.4) {\r
                      <span\r
                        class="settled-layer"\r
                        [style.background]="activeVial().color"\r
                        aria-hidden="true"\r
                      ></span>\r
                    }\r
                  </div>\r
                  @if (!art.waterCup.src) {\r
                    <span class="cup-outline" aria-hidden="true"></span>\r
                  }\r
                </div>\r
              </div>\r
              <p class="rig-caption">Equal 2 g into equal 50 mL, stirred the same way.</p>\r
            </div>\r
          }\r
\r
          <!-- ---- Probe trial: needle sweeps, lamp answers ---- -->\r
          @case ('conductivity') {\r
            <div class="probe-rig">\r
              <div class="meter">\r
                <svg viewBox="0 0 200 120" aria-hidden="true">\r
                  <path class="meter-face" d="M12 112 A88 88 0 0 1 188 112 Z" />\r
                  @for (tick of [0, 1, 2, 3, 4]; track tick) {\r
                    <line\r
                      class="meter-tick"\r
                      x1="100"\r
                      y1="24"\r
                      x2="100"\r
                      y2="34"\r
                      [attr.transform]="'rotate(' + (-52 + tick * 26) + ' 100 112)'"\r
                    />\r
                  }\r
                  <line\r
                    class="meter-needle"\r
                    x1="100"\r
                    y1="112"\r
                    x2="100"\r
                    y2="34"\r
                    [attr.transform]="'rotate(' + needleAngle() + ' 100 112)'"\r
                  />\r
                  <circle class="meter-pin" cx="100" cy="112" r="7" />\r
                </svg>\r
                <span class="meter-read" aria-live="polite">\r
                  {{ result() ? result()!['millisiemens'] : '\u2014' }} <small>mS</small>\r
                </span>\r
              </div>\r
\r
              <div class="cell">\r
                <div class="lamp" [style.--glow]="lampGlow()">\r
                  @if (art.lamp.src; as plate) {\r
                    <img class="part-plate" [src]="plate" alt="" />\r
                  }\r
                  <span class="lamp-bulb" aria-hidden="true"></span>\r
                  <span class="lamp-halo" aria-hidden="true"></span>\r
                </div>\r
                <div class="probe" [class.dipped]="phase() !== 'idle'">\r
                  @if (art.probe.src; as plate) {\r
                    <img class="part-plate" [src]="plate" alt="" />\r
                  }\r
                  @if (!art.probe.src) {\r
                    <span class="probe-body" aria-hidden="true"></span>\r
                    <span class="probe-tines" aria-hidden="true"></span>\r
                  }\r
                </div>\r
                <div class="cell-glass">\r
                  <span class="cell-water" aria-hidden="true"></span>\r
                </div>\r
              </div>\r
            </div>\r
          }\r
\r
          <!-- ---- Surface scan: particle field with a sweeping scan line ---- -->\r
          @case ('texture') {\r
            <div class="scan-rig">\r
              @if (art.scanBed.src; as plate) {\r
                <img class="part-plate" [src]="plate" alt="" />\r
              }\r
              <div class="scan-bed">\r
                <div class="scan-field" aria-hidden="true">\r
                  @for (grain of field(); track grain.id) {\r
                    <i\r
                      [class.sparkle]="grain.sparkle"\r
                      [style.background]="activeVial().color"\r
                      [style.top.%]="grain.top"\r
                      [style.left.%]="grain.left"\r
                      [style.--grain-size.px]="grain.size * 2.2"\r
                    ></i>\r
                  }\r
                </div>\r
                @if (running()) {\r
                  <span class="scan-line" aria-hidden="true"></span>\r
                }\r
                <span class="scan-scale" aria-hidden="true"><i></i>1 mm</span>\r
              </div>\r
            </div>\r
          }\r
        }\r
      </div>\r
\r
      @if (!preview) {
      <div class="stage-controls">
        <p class="stage-hint" aria-live="polite">{{ hint() }}</p>\r
        <button class="primary-action" type="button" [disabled]="running()" (click)="run()">\r
          {{ running() ? 'Running\u2026' : 'Run equal-condition trial' }}\r
        </button>
      </div>
      }
    </div>
\r
    <!-- ---- Record ---------------------------------------------------------- -->\r
    <aside [hidden]="!(phase() === 'settled')" class="record" aria-label="Property trial readings">
      <span class="kicker">Your record</span>\r
      <h2>{{ preview ? 'Instrument reading' : 'What did you see?' }}</h2>
\r
      @if (phase() === 'settled') {\r
        <div class="readout" aria-live="polite">\r
          @for (entry of entries(result()); track entry[0]) {\r
            <div>\r
              <small>{{ entry[0] }}</small>\r
              <strong>{{ entry[1] }}</strong>\r
            </div>\r
          }\r
        </div>\r
\r
        @if (!preview) {
        <label class="observation-field">
          Write what the instrument showed\r
          <textarea\r
            rows="4"\r
            [ngModel]="observation()"\r
            (ngModelChange)="observation.set($event)"\r
            placeholder="Under the light I could see\u2026"\r
          ></textarea>\r
        </label>\r
        <button class="primary-action" type="button" [disabled]="!canCapture()" (click)="capture()">\r
          Save observation\r
        </button>\r
        @if (!canCapture()) {\r
          <p class="record-note">\r
            The bench will not file a trial until you describe it in your own words.\r
          </p>\r
        }\r
        } @else { <p class="record-note">Recorded in this session's local trial log. Rerun or change the instrument to compare.</p> }
      } @else {
        <p class="record-note">Nothing to record yet. Run a trial and watch the instrument.</p>
      }\r
    </aside>\r
  </div>\r
</section>\r
`, styles: ['/* src/app/projects/mystery-substance/properties-lab.component.scss */\n:host {\n  position: absolute;\n  inset: 0;\n  display: block;\n}\nbutton,\ntextarea,\ninput {\n  font: inherit;\n}\nbutton {\n  color: inherit;\n}\nbutton:focus-visible,\ntextarea:focus-visible,\ninput:focus-visible {\n  outline: 2px solid #88e4df;\n  outline-offset: 2px;\n}\n.lab-canvas,\n.lab-scene,\n.lab-shade {\n  position: absolute;\n  inset: 0;\n}\n.lab-canvas {\n  overflow: auto;\n  color: #ebf7fc;\n  background: #04101a;\n}\n.lab-scene {\n  z-index: 0;\n  background: url(/week2-test-scenes-v2.webp) left top/200% 200% no-repeat;\n  background-color: #04101a;\n  filter: saturate(0.85) brightness(0.36);\n}\n.lab-shade {\n  z-index: 1;\n  background:\n    radial-gradient(\n      circle at 50% 32%,\n      rgba(96, 197, 205, 0.12),\n      transparent 58%),\n    linear-gradient(\n      180deg,\n      rgba(3, 12, 19, 0.74),\n      rgba(3, 12, 19, 0.94));\n}\n.lab-grid {\n  position: relative;\n  z-index: 2;\n  display: grid;\n  min-height: 100%;\n  align-items: start;\n  gap: 0.85rem;\n  grid-template-columns: minmax(12.5rem, 0.85fr) minmax(0, 2fr) minmax(12.5rem, 0.9fr);\n  padding: 0.9rem;\n}\n.kicker {\n  color: #79d8d5;\n  font-size: 0.6rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh1 {\n  margin: 0;\n  color: #f3fbfd;\n  font-size: clamp(1rem, 1.8vw, 1.3rem);\n  font-weight: 850;\n}\nh2 {\n  margin: 0.1rem 0 0;\n  color: #eef8fa;\n  font-size: 0.95rem;\n  font-weight: 850;\n}\n.rack,\n.record {\n  display: grid;\n  align-content: start;\n  gap: 0.5rem;\n  border: 1px solid #2b4d5f;\n  border-radius: 0.7rem;\n  padding: 0.8rem;\n  background: rgba(6, 21, 31, 0.9);\n}\n.record-note {\n  margin: 0;\n  color: #8aa8b5;\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.instrument-list,\n.vial-row,\n.trial-log {\n  display: grid;\n  margin: 0;\n  padding: 0;\n  gap: 0.35rem;\n  list-style: none;\n}\n.instrument-list button {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  gap: 0.5rem;\n  border: 1px solid #2d5162;\n  border-radius: 0.5rem;\n  padding: 0.4rem 0.5rem;\n  color: #a9c6d1;\n  text-align: left;\n  background: rgba(11, 33, 45, 0.9);\n  cursor: pointer;\n}\n.instrument-list button:hover:not(:disabled) {\n  border-color: #4f97a2;\n}\n.instrument-list button.active {\n  border-color: #7fe3dd;\n  color: #f2fdfd;\n  background: rgba(20, 69, 79, 0.95);\n}\n.instrument-list button:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.instrument-copy {\n  display: grid;\n  flex: 1;\n  gap: 0.05rem;\n}\n.instrument-copy strong {\n  font-size: 0.74rem;\n  font-weight: 800;\n}\n.instrument-copy small {\n  color: #7f9ead;\n  font-size: 0.58rem;\n}\n.coverage {\n  color: #7fd6d2;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 0.62rem;\n  font-weight: 800;\n}\n.instrument-icon {\n  display: grid;\n  width: 1.8rem;\n  height: 1.8rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #2c5464;\n  border-radius: 0.35rem;\n  background: #0a2531;\n}\n.instrument-icon::before {\n  content: "";\n  display: block;\n}\n.instrument-icon[data-test=appearance]::before {\n  width: 0.85rem;\n  height: 0.85rem;\n  border: 2px solid #9fd2e0;\n  border-radius: 50%;\n}\n.instrument-icon[data-test=solubility]::before {\n  width: 0.75rem;\n  height: 0.9rem;\n  border: 2px solid #9fd2e0;\n  border-radius: 0 0 0.25rem 0.25rem;\n  background:\n    linear-gradient(\n      180deg,\n      transparent 40%,\n      rgba(159, 210, 224, 0.5) 40%);\n}\n.instrument-icon[data-test=conductivity]::before {\n  width: 0.5rem;\n  height: 0.95rem;\n  border-right: 2px solid #9fd2e0;\n  border-left: 2px solid #9fd2e0;\n}\n.instrument-icon[data-test=texture]::before {\n  width: 0.95rem;\n  height: 0.6rem;\n  border-top: 2px solid #9fd2e0;\n  border-bottom: 2px dotted #9fd2e0;\n}\n.vial-row {\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.3rem;\n}\n.vial-row button {\n  position: relative;\n  display: grid;\n  justify-items: center;\n  gap: 0.15rem;\n  border: 1px solid #2d5162;\n  border-radius: 0.45rem;\n  padding: 0.3rem 0.15rem;\n  background: rgba(11, 33, 45, 0.9);\n  cursor: pointer;\n}\n.vial-row button.active {\n  border-color: var(--vial-color, #7fe3dd);\n  background: rgba(20, 69, 79, 0.95);\n}\n.vial-row img {\n  width: 1.6rem;\n  height: 1.6rem;\n  border-radius: 0.25rem;\n  object-fit: cover;\n}\n.vial-row strong {\n  font-size: 0.68rem;\n  font-weight: 900;\n}\n.vial-row .done {\n  position: absolute;\n  top: 0.1rem;\n  right: 0.15rem;\n  color: #7fe3dd;\n  font-size: 0.55rem;\n  font-weight: 900;\n}\n.trial-log li {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.4rem;\n  border-left: 2px solid #2f6570;\n  padding-left: 0.45rem;\n}\n.trial-log li > span:last-child {\n  display: grid;\n}\n.trial-index {\n  display: grid;\n  width: 1.1rem;\n  height: 1.1rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border-radius: 50%;\n  color: #08222b;\n  background: #7fe3dd;\n  font-size: 0.55rem;\n  font-weight: 900;\n}\n.trial-log strong {\n  color: #e4f2f6;\n  font-size: 0.66rem;\n}\n.trial-log small {\n  color: #8aa8b5;\n  font-size: 0.6rem;\n  line-height: 1.3;\n}\n.stage {\n  display: grid;\n  align-content: start;\n  gap: 0.7rem;\n  border: 1px solid #2f5972;\n  border-radius: 0.8rem;\n  padding: 0.9rem;\n  background: rgba(5, 19, 28, 0.74);\n}\n.stage-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.8rem;\n}\n.stage-clock {\n  display: grid;\n  justify-items: end;\n  border: 1px solid #2f6570;\n  border-radius: 0.5rem;\n  padding: 0.25rem 0.55rem;\n  background: #061c26;\n}\n.stage-clock small {\n  color: #7f9ead;\n  font-size: 0.52rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.stage-clock strong {\n  color: #7fe3dd;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 1.15rem;\n  line-height: 1;\n}\n.stage-clock strong span {\n  font-size: 0.65rem;\n}\n.instrument-well {\n  display: grid;\n  min-height: 17rem;\n  place-items: center;\n  border: 1px solid #24485a;\n  border-radius: 0.6rem;\n  padding: 0.9rem;\n  background:\n    radial-gradient(\n      ellipse at 50% 18%,\n      rgba(120, 210, 215, 0.09),\n      transparent 62%),\n    rgba(3, 14, 21, 0.6);\n}\n.part-plate {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  pointer-events: none;\n}\n.magnifier {\n  position: relative;\n  display: grid;\n  width: min(100%, 15rem);\n  aspect-ratio: 1;\n  place-items: center;\n}\n.lens {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: 78%;\n  height: 78%;\n  overflow: hidden;\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      circle at 32% 26%,\n      #123240,\n      #061821 72%);\n}\n.lens-ring {\n  position: absolute;\n  width: 84%;\n  height: 84%;\n  border: 6px solid #6f97a6;\n  border-radius: 50%;\n  box-shadow: inset 0 0 1.2rem rgba(0, 0, 0, 0.6), 0 0.4rem 1.4rem rgba(0, 0, 0, 0.45);\n}\n.lens-field {\n  position: absolute;\n  inset: 0;\n}\n.lens-field i,\n.scan-field i {\n  position: absolute;\n  width: var(--grain-size, 4px);\n  height: var(--grain-size, 4px);\n  border-radius: 24%;\n  opacity: 0.92;\n  transform: rotate(var(--spin, 0deg));\n}\n.lens-field i.sparkle {\n  box-shadow: 0 0 0.3rem rgba(255, 255, 255, calc(0.25 + 0.75 * (1 - abs(var(--light-angle, 35) - 90) / 90))), 0 0 0.1rem #fff;\n}\n.lens-glare {\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      calc(var(--light-angle, 35) * 1deg),\n      rgba(255, 255, 255, 0.24),\n      transparent 46%);\n  pointer-events: none;\n}\n.scale-bar,\n.scan-scale {\n  position: absolute;\n  bottom: 8%;\n  left: 12%;\n  display: flex;\n  align-items: center;\n  gap: 0.3rem;\n  color: rgba(226, 245, 250, 0.8);\n  font-size: 0.55rem;\n  font-weight: 800;\n}\n.scale-bar i,\n.scan-scale i {\n  display: block;\n  width: 2.2rem;\n  height: 2px;\n  background: rgba(226, 245, 250, 0.8);\n}\n.optics-controls {\n  display: grid;\n  width: min(100%, 20rem);\n  gap: 0.4rem;\n  margin-top: 0.7rem;\n}\n.optics-controls label {\n  display: grid;\n  align-items: center;\n  gap: 0.3rem;\n  grid-template-columns: 6.5rem 1fr auto;\n  color: #a9c6d1;\n  font-size: 0.62rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.optics-controls input {\n  width: 100%;\n}\n.optics-controls strong {\n  color: #7fe3dd;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 0.72rem;\n}\n.water-rig {\n  display: grid;\n  justify-items: center;\n  gap: 0.6rem;\n}\n.cup {\n  position: relative;\n  width: 8.5rem;\n  aspect-ratio: 0.82;\n}\n.cup-glass {\n  position: absolute;\n  inset: 16% 14% 9% 14%;\n  display: flex;\n  align-items: flex-end;\n  overflow: hidden;\n  border-radius: 0 0 0.7rem 0.7rem;\n}\n.cup-outline {\n  position: absolute;\n  inset: 0;\n  border: 2.5px solid #9fd2e0;\n  border-top: 0;\n  border-radius: 0 0 0.7rem 0.7rem;\n}\n.water {\n  position: relative;\n  width: 100%;\n  height: 76%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(190, 228, 240, 0.34),\n      rgba(140, 195, 214, 0.46));\n}\n.cloud {\n  position: absolute;\n  inset: 0;\n  filter: blur(2px);\n  transition: opacity 0.5s ease;\n}\n.water-surface {\n  position: absolute;\n  top: -2px;\n  right: 0;\n  left: 0;\n  height: 4px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.5);\n}\n.water-surface.agitated {\n  animation: ripple 0.6s ease-in-out infinite;\n}\n@keyframes ripple {\n  0%, 100% {\n    transform: scaleY(1);\n  }\n  50% {\n    transform: scaleY(2.4) translateX(2px);\n  }\n}\n.settling {\n  position: absolute;\n  top: 0;\n  left: 50%;\n}\n.settling i {\n  position: absolute;\n  width: var(--grain-size, 3px);\n  height: var(--grain-size, 3px);\n  border-radius: 30%;\n  opacity: 0;\n  animation: sink 2.4s ease-in infinite;\n}\n@keyframes sink {\n  0% {\n    opacity: 0;\n    transform: translate(0, 0);\n  }\n  12% {\n    opacity: 0.9;\n  }\n  100% {\n    opacity: 0.15;\n    transform: translate(var(--grain-x, 0), 5.4rem);\n  }\n}\n.settled-layer {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 7%;\n  opacity: 0.75;\n}\n.rig-caption {\n  margin: 0;\n  color: #8aa8b5;\n  font-size: 0.66rem;\n}\n.probe-rig {\n  display: grid;\n  align-items: center;\n  gap: 1.2rem;\n  grid-template-columns: auto auto;\n}\n.meter {\n  display: grid;\n  justify-items: center;\n  gap: 0.2rem;\n  width: 11rem;\n}\n.meter svg {\n  width: 100%;\n  height: auto;\n}\n.meter-face {\n  fill: #071c26;\n  stroke: #2f6570;\n  stroke-width: 2;\n}\n.meter-tick {\n  stroke: rgba(198, 226, 236, 0.55);\n  stroke-width: 2;\n}\n.meter-needle {\n  stroke: #f0805a;\n  stroke-linecap: round;\n  stroke-width: 3;\n  transition: transform 0.18s cubic-bezier(0.34, 1.5, 0.5, 1);\n}\n.meter-pin {\n  fill: #9fd2e0;\n}\n.meter-read {\n  color: #7fe3dd;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 1rem;\n  font-weight: 800;\n}\n.meter-read small {\n  font-size: 0.62rem;\n}\n.cell {\n  position: relative;\n  display: grid;\n  width: 9rem;\n  justify-items: center;\n}\n.lamp {\n  position: relative;\n  width: 3rem;\n  height: 3.4rem;\n  display: grid;\n  place-items: center;\n}\n.lamp-bulb {\n  width: 1.5rem;\n  height: 1.5rem;\n  border: 2px solid #b58a3c;\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      circle at 40% 35%,\n      rgba(255, 236, 180, calc(0.2 + 0.8 * var(--glow, 0))),\n      rgba(80, 62, 26, 0.6));\n}\n.lamp-halo {\n  position: absolute;\n  width: 3.4rem;\n  height: 3.4rem;\n  border-radius: 50%;\n  opacity: var(--glow, 0);\n  background:\n    radial-gradient(\n      circle,\n      rgba(255, 228, 150, 0.75),\n      transparent 68%);\n  filter: blur(4px);\n  transition: opacity 0.25s ease;\n}\n.probe {\n  position: relative;\n  z-index: 2;\n  width: 2.6rem;\n  height: 5rem;\n  transition: transform 0.6s cubic-bezier(0.4, 1.2, 0.5, 1);\n  transform: translateY(-0.9rem);\n}\n.probe.dipped {\n  transform: translateY(0.5rem);\n}\n.probe-body {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  width: 0.85rem;\n  height: 2.6rem;\n  border-radius: 0.2rem;\n  background:\n    linear-gradient(\n      90deg,\n      #1d3a46,\n      #4d7686 45%,\n      #1d3a46);\n  transform: translateX(-50%);\n}\n.probe-tines {\n  position: absolute;\n  top: 2.5rem;\n  left: 50%;\n  width: 1.1rem;\n  height: 2.2rem;\n  border-right: 3px solid #cfe6ee;\n  border-left: 3px solid #cfe6ee;\n  transform: translateX(-50%);\n}\n.cell-glass {\n  position: relative;\n  display: flex;\n  width: 6rem;\n  height: 4rem;\n  align-items: flex-end;\n  margin-top: -1.2rem;\n  overflow: hidden;\n  border: 2px solid #9fd2e0;\n  border-top: 0;\n  border-radius: 0 0 0.5rem 0.5rem;\n}\n.cell-water {\n  width: 100%;\n  height: 72%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(190, 228, 240, 0.36),\n      rgba(140, 195, 214, 0.5));\n}\n.scan-rig {\n  position: relative;\n  width: min(100%, 20rem);\n  aspect-ratio: 1.6;\n}\n.scan-bed {\n  position: absolute;\n  inset: 18% 10% 14% 10%;\n  overflow: hidden;\n  border: 1px solid #2f6570;\n  border-radius: 0.4rem;\n  background:\n    linear-gradient(\n      180deg,\n      #0a2028,\n      #061318);\n}\n.scan-field {\n  position: absolute;\n  inset: 0;\n}\n.scan-field i.sparkle {\n  box-shadow: 0 0 0.25rem rgba(255, 255, 255, 0.75);\n}\n.scan-line {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      #7fe3dd,\n      transparent);\n  box-shadow: 0 0 0.7rem rgba(127, 227, 221, 0.75);\n  animation: sweep 1.9s ease-in-out infinite;\n}\n@keyframes sweep {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(7.5rem);\n  }\n}\n.stage-controls {\n  display: grid;\n  gap: 0.5rem;\n}\n.stage-hint {\n  margin: 0;\n  color: #9dbcc8;\n  font-size: 0.72rem;\n}\n.primary-action {\n  width: 100%;\n  border: 0;\n  border-radius: 0.5rem;\n  padding: 0.55rem 0.8rem;\n  color: #04212a;\n  background:\n    linear-gradient(\n      135deg,\n      #a0f1e8,\n      #5dc9d0);\n  font-size: 0.75rem;\n  font-weight: 850;\n  cursor: pointer;\n}\n.primary-action:disabled {\n  color: #7f9ead;\n  background: #16323f;\n  cursor: not-allowed;\n}\n.readout {\n  display: grid;\n  gap: 0.2rem;\n  border: 1px solid #2d5162;\n  border-radius: 0.5rem;\n  padding: 0.45rem 0.55rem;\n  background: rgba(11, 33, 45, 0.85);\n}\n.readout div {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.readout small {\n  color: #7c9aa8;\n  font-size: 0.58rem;\n  font-weight: 700;\n}\n.readout strong {\n  color: #dcecf1;\n  font-size: 0.66rem;\n  text-align: right;\n}\n.observation-field {\n  display: grid;\n  gap: 0.25rem;\n  color: #a9c6d1;\n  font-size: 0.62rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.observation-field textarea {\n  border: 1px solid #2f5566;\n  border-radius: 0.5rem;\n  padding: 0.5rem;\n  color: #eaf6f9;\n  background: #071c27;\n  font-size: 0.74rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  resize: vertical;\n  text-transform: none;\n}\n@container (max-width: 1180px) {\n  .lab-grid {\n    grid-template-columns: minmax(11rem, 0.85fr) minmax(0, 2fr);\n  }\n  .record {\n    grid-column: 1/-1;\n  }\n}\n@container (max-width: 820px) {\n  .lab-grid {\n    grid-template-columns: 1fr;\n  }\n  .record {\n    grid-column: auto;\n  }\n  .probe-rig {\n    grid-template-columns: 1fr;\n    justify-items: center;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .scan-line,\n  .settling i,\n  .water-surface.agitated {\n    animation: none;\n  }\n  .settling i {\n    opacity: 0.8;\n  }\n  .meter-needle,\n  .probe,\n  .cloud,\n  .lamp-halo {\n    transition-duration: 0.001ms;\n  }\n}\n:host {\n  container-type: inline-size;\n}\n.embedded .lab-grid {\n  grid-template-columns: minmax(135px, 0.7fr) minmax(0, 2fr);\n}\n.embedded .record {\n  grid-column: 1/-1;\n}\n@container (max-width: 620px) {\n  .embedded .lab-grid {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n:host {\n  container-type: inline-size;\n}\n:host(.workbench-station) {\n  position: relative;\n  inset: auto;\n}\n:host(.workbench-station) .lab-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 34rem;\n  overflow: visible;\n}\n:host(.workbench-station) .lab-canvas {\n  min-height: 100dvh;\n}\n.lab-grid {\n  padding-top: 80px;\n}\n.lab-grid.has-record {\n  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 1fr);\n}\n.lab-grid.has-record .rack {\n  display: none;\n}\n.embedded .record {\n  grid-column: auto;\n}\n.record[hidden] {\n  display: none;\n}\n.kicker,\n.instrument-copy small,\n.coverage,\n.trial-log {\n  display: none;\n}\n@container (max-width: 700px) {\n  .lab-grid {\n    padding-top: 120px;\n  }\n  .lab-grid.has-record {\n    grid-template-columns: 1fr;\n  }\n}\n:host(.lab-preview) {\n  position: relative;\n  inset: auto;\n  display: block;\n  container-type: inline-size;\n}\n:host(.lab-preview) .lab-canvas,\n:host(.lab-preview) .bench-canvas,\n:host(.lab-preview) .matter-canvas,\n:host(.lab-preview) .bay-canvas,\n:host(.lab-preview) .station-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 0;\n  overflow: visible;\n}\n:host(.lab-preview) .lab-grid,\n:host(.lab-preview) .bench-grid,\n:host(.lab-preview) .matter-grid,\n:host(.lab-preview) .bay-grid {\n  padding: 14px;\n  min-height: 0;\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n  gap: 12px;\n}\n:host(.lab-preview) .lab-grid.has-record,\n:host(.lab-preview) .bench-grid.has-record,\n:host(.lab-preview) .matter-grid.has-record {\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n}\n:host(.lab-preview) .lab-grid.has-record .rack,\n:host(.lab-preview) .bench-grid.has-record .rack,\n:host(.lab-preview) .matter-grid.has-record .rack {\n  display: block;\n}\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  grid-column: 1/-1;\n}\n:host(.lab-preview) .record[hidden] {\n  display: none;\n}\n:host(.lab-preview) .stage,\n:host(.lab-preview) .rig,\n:host(.lab-preview) .rack,\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  min-width: 0;\n}\n:host(.lab-preview) .kicker,\n:host(.lab-preview) .instrument-copy small,\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  display: block;\n}\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  max-height: 200px;\n  overflow: auto;\n}\n:host(.lab-preview) .instrument-well,\n:host(.lab-preview) .chamber-well {\n  min-height: 230px;\n}\n:host(.lab-preview) .instrument-well {\n  height: 245px;\n}\n:host(.lab-preview) .stage-controls {\n  margin-top: 10px;\n}\n:host(.lab-preview) .preview-run {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0;\n}\n:host(.lab-preview) .preview-run .primary-action {\n  width: auto;\n}\n:host(.lab-preview) .preview-run p {\n  flex-basis: 100%;\n  margin: 0;\n}\n:host(.lab-preview) h1 {\n  font-size: 1.2rem;\n}\n:host(.lab-preview) h2 {\n  font-size: 1rem;\n}\n:host(.lab-preview) button,\n:host(.lab-preview) select {\n  min-height: 44px;\n  font-size: 0.87rem;\n}\n:host(.lab-preview) small,\n:host(.lab-preview) .record-note,\n:host(.lab-preview) .stage-hint,\n:host(.lab-preview) .rig-hint,\n:host(.lab-preview) .hint,\n:host(.lab-preview) .readout small,\n:host(.lab-preview) .readout strong,\n:host(.lab-preview) .readout-stack small,\n:host(.lab-preview) .readout-stack strong,\n:host(.lab-preview) .rack-note {\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n:host(.lab-preview) input[type=range] {\n  min-height: 32px;\n}\n:host(.lab-preview) :is(button, select, summary, input):focus-visible {\n  outline: 3px solid #a9efdc;\n  outline-offset: 3px;\n}\n@container (max-width: 640px) {\n  :host(.lab-preview) .lab-grid,\n  :host(.lab-preview) .bench-grid,\n  :host(.lab-preview) .matter-grid,\n  :host(.lab-preview) .bay-grid,\n  :host(.lab-preview) .lab-grid.has-record,\n  :host(.lab-preview) .bench-grid.has-record,\n  :host(.lab-preview) .matter-grid.has-record,\n  :host(.lab-preview) .restoration-stage {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 10px;\n  }\n  :host(.lab-preview) .stage,\n  :host(.lab-preview) .rig {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .rack {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .bay-grid .rack {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .bay-grid .stage {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .test-list,\n  :host(.lab-preview) .shelf-plan {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  :host(.lab-preview) .instrument-list,\n  :host(.lab-preview) .chamber-list {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  :host(.lab-preview) .focus-specimen {\n    max-width: 130px;\n    justify-self: center;\n  }\n  :host(.lab-preview) .focus-specimen img {\n    max-height: 150px;\n  }\n  :host(.lab-preview) .chamber-well {\n    gap: 8px;\n  }\n  :host(.lab-preview) .probe-rig {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=properties-lab.component.css.map */\n'] }]
  }], () => [], { initialTestId: [{ type: Input, args: [{ isSignal: true, alias: "initialTestId", required: false }] }], captured: [{ type: Output, args: ["captured"] }], selectedVialId: [{ type: Input, args: [{ isSignal: true, alias: "selectedVialId", required: false }] }], vialChanged: [{ type: Output, args: ["vialChanged"] }], embedded: [{ type: Input, args: [{ isSignal: true, alias: "embedded", required: false }] }], savedResults: [{ type: Input, args: [{ isSignal: true, alias: "savedResults", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PropertiesLabComponent, { className: "PropertiesLabComponent", filePath: "src/app/projects/mystery-substance/properties-lab.component.ts", lineNumber: 47 });
})();
function readableLabel(value) {
  const spaced = value.replace(/([a-z])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

// src/app/projects/mystery-substance/bench-art.config.ts
var apparatusArt = {
  beaker: {
    src: "/bench-art/beaker.webp",
    blend: "screen",
    aspect: 0.728,
    displayPx: { width: 144, height: 198 },
    exportPx: { width: 432, height: 594 },
    // Measured off the plate: interior bore, stopper underside to inner base.
    well: { top: 26.9, right: 26.4, bottom: 18.8, left: 25.8 },
    note: "Empty borosilicate vessel with its stopper seated, thick base, graduation marks at 2/4/6. No liquid, no contact shadow."
  },
  vial: {
    src: "/bench-art/vial.webp",
    blend: "screen",
    aspect: 0.417,
    displayPx: { width: 40, height: 96 },
    exportPx: { width: 120, height: 288 },
    well: { top: 26.8, right: 25.9, bottom: 13, left: 25.6 },
    note: "Empty capped glass vial, upright, blank label band. No powder \u2014 it is tinted per specimen at runtime."
  },
  balance: {
    src: "/bench-art/balance.webp",
    blend: "normal",
    aspect: 1.777,
    displayPx: { width: 128, height: 73 },
    exportPx: { width: 384, height: 220 },
    note: "Digital balance chassis with an empty pan. Display glass present but blanked \u2014 the reading is drawn."
  },
  reservoir: {
    src: "/bench-art/reservoir.webp",
    blend: "screen",
    aspect: 2.199,
    displayPx: { width: 120, height: 54 },
    exportPx: { width: 360, height: 164 },
    well: { top: 19.5, right: 13.4, bottom: 29.1, left: 13.3 },
    note: "Reservoir vessel, empty interior with a visible chamber. No liquid \u2014 the level is drawn and drops as it is drawn off."
  },
  valve: {
    src: "/bench-art/valve.webp",
    blend: "normal",
    aspect: 1.777,
    displayPx: { width: 34, height: 19 },
    exportPx: { width: 160, height: 88 },
    note: "Stopcock body only. Omit the handle entirely \u2014 it is drawn so it can rotate 90 degrees."
  },
  tube: {
    src: "/bench-art/tube.webp",
    blend: "screen",
    aspect: 0.226,
    displayPx: { width: 14, height: 30 },
    exportPx: { width: 327, height: 1448 },
    well: { top: 0, right: 26, bottom: 0, left: 26 },
    note: "Clear tube segment, seamless top and bottom so it tiles vertically. Interior transparent \u2014 the flow is drawn."
  }
};

// src/app/projects/mystery-substance/reaction-bench.component.ts
var _c02 = () => [0, 1, 2];
var _c1 = () => [2, 4, 6];
var _c2 = () => [0, 1, 2, 3, 4, 5, 6, 7, 8];
var _forTrack02 = ($index, $item) => $item.vialId;
var _forTrack12 = ($index, $item) => $item.id;
var _forTrack22 = ($index, $item) => $item[0];
function ReactionBenchComponent_For_13_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 95);
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
  }
}
function ReactionBenchComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 91);
    \u0275\u0275listener("dragstart", function ReactionBenchComponent_For_13_Template_button_dragstart_1_listener($event) {
      const vial_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startVialDrag($event, vial_r2.vialId));
    })("click", function ReactionBenchComponent_For_13_Template_button_click_1_listener() {
      const vial_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.holdVial(vial_r2.vialId));
    });
    \u0275\u0275element(2, "img", 92);
    \u0275\u0275elementStart(3, "span", 93);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 94);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, ReactionBenchComponent_For_13_Conditional_7_Template, 2, 0, "span", 95);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const vial_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("--%NS%vial-color", vial_r2.color);
    \u0275\u0275classProp("active", ctx_r2.vialId() === vial_r2.vialId)("held", ctx_r2.heldVialId() === vial_r2.vialId);
    \u0275\u0275property("disabled", ctx_r2.busy());
    \u0275\u0275attribute("aria-pressed", ctx_r2.heldVialId() === vial_r2.vialId)("aria-label", "Vial " + vial_r2.code + ", " + vial_r2.cue + (ctx_r2.isScreened(vial_r2.vialId) ? ", already screened" : "") + (ctx_r2.heldVialId() === vial_r2.vialId ? ", picked up" : ""));
    \u0275\u0275advance();
    \u0275\u0275property("src", vial_r2.image, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vial_r2.code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vial_r2.cue);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isScreened(vial_r2.vialId) ? 7 : -1);
  }
}
function ReactionBenchComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 96);
    \u0275\u0275listener("click", function ReactionBenchComponent_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.dockVial());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r2.busy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Place Vial ", ctx_r2.vialCode(ctx), " on bench ");
  }
}
function ReactionBenchComponent_Conditional_47_For_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const entry_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" \xB7 ", entry_r5.retries, " reset(s) ");
  }
}
function ReactionBenchComponent_Conditional_47_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 99);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275conditionalCreate(8, ReactionBenchComponent_Conditional_47_For_4_Conditional_8_Template, 1, 1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const entry_r5 = ctx.$implicit;
    \u0275\u0275classProp("off-protocol", !entry_r5.clean);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r5.vialCode);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(entry_r5.headline);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", entry_r5.volumeMl.toFixed(2), " mL \xB7 ", entry_r5.massG.toFixed(2), " g \xB7 ", entry_r5.drops, " drops ");
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r5.retries > 0 ? 8 : -1);
  }
}
function ReactionBenchComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1, "Procedure log");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ol", 97);
    \u0275\u0275repeaterCreate(3, ReactionBenchComponent_Conditional_47_For_4_Template, 9, 8, "li", 98, _forTrack12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.procedureLog());
  }
}
function ReactionBenchComponent_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "small");
    \u0275\u0275text(2, "Reaction clock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "s");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.elapsedSeconds());
  }
}
function ReactionBenchComponent_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 100);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("mix-blend-mode", ctx_r2.art.reservoir.blend);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function ReactionBenchComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 101);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("mix-blend-mode", ctx_r2.art.tube.blend);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function ReactionBenchComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 102);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("mix-blend-mode", ctx_r2.art.valve.blend);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function ReactionBenchComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 30);
  }
}
function ReactionBenchComponent_Conditional_79_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 105);
  }
  if (rf & 2) {
    const bead_r6 = ctx.$implicit;
    \u0275\u0275styleProp("animation-delay", bead_r6 * 160, "ms");
  }
}
function ReactionBenchComponent_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275element(1, "span", 103);
    \u0275\u0275repeaterCreate(2, ReactionBenchComponent_Conditional_79_For_3_Template, 1, 2, "i", 104, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c02));
  }
}
function ReactionBenchComponent_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 106);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("mix-blend-mode", ctx_r2.art.beaker.blend);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function ReactionBenchComponent_Conditional_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "ellipse", 59);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("fill", ctx_r2.liquid());
  }
}
function ReactionBenchComponent_Conditional_108_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 107);
    \u0275\u0275element(1, "line", 108);
    \u0275\u0275elementStart(2, "text", 109);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const mark_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("transform", "translate(0 " + ctx_r2.gradY(mark_r7) + ")");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(mark_r7);
  }
}
function ReactionBenchComponent_Conditional_108_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ReactionBenchComponent_Conditional_108_For_1_Template, 4, 2, ":svg:g", 107, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c1));
  }
}
function ReactionBenchComponent_Conditional_110_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 64);
    \u0275\u0275element(1, "rect", 110)(2, "rect", 111)(3, "ellipse", 112)(4, "ellipse", 113);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("x", ctx_r2.wellX)("y", ctx_r2.liquidY())("width", ctx_r2.wellW)("height", ctx_r2.liquidH())("fill", ctx_r2.liquid());
    \u0275\u0275advance();
    \u0275\u0275attribute("x", ctx_r2.wellX)("y", ctx_r2.liquidY())("width", ctx_r2.wellW)("height", ctx_r2.liquidH());
    \u0275\u0275advance();
    \u0275\u0275attribute("cy", ctx_r2.liquidY())("fill", ctx_r2.liquid());
    \u0275\u0275advance();
    \u0275\u0275attribute("cy", ctx_r2.liquidY());
  }
}
function ReactionBenchComponent_Conditional_111_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "circle");
  }
  if (rf & 2) {
    const bubble_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("animation-delay", bubble_r8 * 170, "ms");
    \u0275\u0275attribute("cx", 37 + bubble_r8 * 6.8)("cy", ctx_r2.liquidY() + ctx_r2.liquidH() - 6)("r", 1.6 + bubble_r8 % 3 * 1.1);
  }
}
function ReactionBenchComponent_Conditional_111_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 65);
    \u0275\u0275repeaterCreate(1, ReactionBenchComponent_Conditional_111_For_2_Template, 1, 5, ":svg:circle", 114, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c2));
  }
}
function ReactionBenchComponent_Conditional_112_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "rect", 116);
  }
  if (rf & 2) {
    const grain_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("animation-delay", grain_r9.delayMs, "ms")("--%NS%spin", grain_r9.spinDeg + "deg");
    \u0275\u0275attribute("width", grain_r9.size)("height", grain_r9.size)("x", 64 + grain_r9.offsetX)("fill", ctx_r2.vialColor(ctx_r2.vialId()));
  }
}
function ReactionBenchComponent_Conditional_112_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 66);
    \u0275\u0275repeaterCreate(1, ReactionBenchComponent_Conditional_112_For_2_Template, 1, 8, ":svg:rect", 115, _forTrack12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.transferGrains());
  }
}
function ReactionBenchComponent_Conditional_113_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "ellipse", 117)(1, "ellipse", 118)(2, "ellipse", 119);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("cy", ctx_r2.liquidY() + 6)("fill", ctx_r2.vialColor(ctx_r2.vialId()));
    \u0275\u0275advance();
    \u0275\u0275attribute("cy", ctx_r2.liquidY());
    \u0275\u0275advance();
    \u0275\u0275attribute("cy", ctx_r2.liquidY());
  }
}
function ReactionBenchComponent_Conditional_114_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "ellipse", 67);
  }
}
function ReactionBenchComponent_Conditional_115_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 120)(1, "path", 121)(2, "path", 122)(3, "path", 123)(4, "rect", 124)(5, "rect", 125);
  }
}
function ReactionBenchComponent_Conditional_120_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " in band ");
  }
}
function ReactionBenchComponent_Conditional_121_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " over ");
  }
}
function ReactionBenchComponent_Conditional_122_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" target ", ctx_r2.targetVolumeMl.toFixed(1), " ");
  }
}
function ReactionBenchComponent_Conditional_133_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 96);
    \u0275\u0275listener("click", function ReactionBenchComponent_Conditional_133_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmVolume());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r2.volumeOk() || ctx_r2.tapOpen());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Lock in ", ctx_r2.volumeMl().toFixed(2), " mL \u2192 weigh specimen ");
  }
}
function ReactionBenchComponent_Conditional_134_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 96);
    \u0275\u0275listener("click", function ReactionBenchComponent_Conditional_134_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addDrop());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r2.busy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Add drop ", ctx_r2.drops() + 1, " of ", ctx_r2.requiredDrops, " ");
  }
}
function ReactionBenchComponent_Conditional_137_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 100);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("mix-blend-mode", ctx_r2.art.vial.blend);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function ReactionBenchComponent_Conditional_137_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "rect", 144)(1, "rect", 145);
  }
}
function ReactionBenchComponent_Conditional_137_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "rect", 140);
  }
}
function ReactionBenchComponent_Conditional_137_Conditional_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 148);
  }
  if (rf & 2) {
    const vial_r12 = \u0275\u0275nextContext(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background", vial_r12.color)("opacity", ctx_r2.grainProfile().dust);
  }
}
function ReactionBenchComponent_Conditional_137_Conditional_23_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const grain_r13 = ctx.$implicit;
    const vial_r12 = \u0275\u0275nextContext(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background", vial_r12.color)("--%NS%grain-x", grain_r13.offsetX, "px")("--%NS%grain-size", grain_r13.size, "px")("--%NS%spin", grain_r13.spinDeg + "deg")("animation-delay", grain_r13.delayMs, "ms");
    \u0275\u0275classProp("sparkle", grain_r13.sparkle)("clump", ctx_r2.grainProfile().clump);
  }
}
function ReactionBenchComponent_Conditional_137_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143);
    \u0275\u0275conditionalCreate(1, ReactionBenchComponent_Conditional_137_Conditional_23_Conditional_1_Template, 1, 4, "span", 146);
    \u0275\u0275repeaterCreate(2, ReactionBenchComponent_Conditional_137_Conditional_23_For_3_Template, 1, 14, "i", 147, _forTrack12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.grainProfile().dust > 0 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.pourGrains());
  }
}
function ReactionBenchComponent_Conditional_137_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 126);
    \u0275\u0275conditionalCreate(1, ReactionBenchComponent_Conditional_137_Conditional_1_Template, 1, 3, "img", 20);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 127)(3, "defs")(4, "linearGradient", 128);
    \u0275\u0275element(5, "stop", 129)(6, "stop", 130)(7, "stop", 131)(8, "stop", 132)(9, "stop", 133);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "clipPath");
    \u0275\u0275element(11, "path", 134);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, ReactionBenchComponent_Conditional_137_Conditional_12_Template, 2, 0);
    \u0275\u0275elementStart(13, "g");
    \u0275\u0275element(14, "rect", 135)(15, "rect", 136)(16, "ellipse", 137);
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "path", 138)(18, "path", 139);
    \u0275\u0275conditionalCreate(19, ReactionBenchComponent_Conditional_137_Conditional_19_Template, 1, 0, ":svg:rect", 140);
    \u0275\u0275elementStart(20, "text", 141);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "path", 142);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(23, ReactionBenchComponent_Conditional_137_Conditional_23_Template, 4, 1, "div", 143);
  }
  if (rf & 2) {
    let tmp_5_0;
    const vial_r12 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("--%NS%vial-color", vial_r12.color);
    \u0275\u0275classProp("tipping", ctx_r2.tipping())("has-plate", ctx_r2.art.vial.src);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r2.art.vial.src) ? 1 : -1, tmp_5_0);
    \u0275\u0275advance(3);
    \u0275\u0275attribute("id", "rb-barrel-" + vial_r12.code);
    \u0275\u0275advance(6);
    \u0275\u0275attribute("id", "rb-vial-well-" + vial_r12.code);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.art.vial.src ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275attribute("clip-path", "url(#rb-vial-well-" + vial_r12.code + ")");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("fill", vial_r12.color);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("fill", "url(#rb-barrel-" + vial_r12.code + ")");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.art.vial.src ? 19 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(vial_r12.code);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.tipping() ? 23 : -1);
  }
}
function ReactionBenchComponent_Conditional_138_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 77)(1, "span", 11);
    \u0275\u0275text(2, "\u2913");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Drag a vial here ");
    \u0275\u0275elementEnd();
  }
}
function ReactionBenchComponent_Conditional_140_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 149);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("mix-blend-mode", ctx_r2.art.balance.blend);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function ReactionBenchComponent_Conditional_157_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 96);
    \u0275\u0275listener("click", function ReactionBenchComponent_Conditional_157_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.transfer());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r2.canTransfer());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Transfer ", ctx_r2.massG().toFixed(2), " g into vessel ");
  }
}
function ReactionBenchComponent_Conditional_161_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 150);
    \u0275\u0275listener("click", function ReactionBenchComponent_Conditional_161_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.abandonRun());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r2.busy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedVialId() ? "Start this vial again" : "Abandon run", " ");
  }
}
function ReactionBenchComponent_Conditional_167_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 89);
    \u0275\u0275text(1, " Nothing to record yet. Run the protocol and watch the vessel at each stage. ");
    \u0275\u0275elementEnd();
  }
}
function ReactionBenchComponent_Conditional_168_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r16 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r16[0]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r16[1]);
  }
}
function ReactionBenchComponent_Conditional_168_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section")(1, "header");
    \u0275\u0275text(2, "Stage 1 \xB7 Solution A");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, ReactionBenchComponent_Conditional_168_Conditional_1_For_4_Template, 5, 2, "div", null, _forTrack22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.entries(ctx.output));
  }
}
function ReactionBenchComponent_Conditional_168_Conditional_2_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r17 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r17[0]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r17[1]);
  }
}
function ReactionBenchComponent_Conditional_168_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section")(1, "header");
    \u0275\u0275text(2, "Stage 2 \xB7 Indicator B");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, ReactionBenchComponent_Conditional_168_Conditional_2_For_4_Template, 5, 2, "div", null, _forTrack22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.entries(ctx.output));
  }
}
function ReactionBenchComponent_Conditional_168_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 90);
    \u0275\u0275conditionalCreate(1, ReactionBenchComponent_Conditional_168_Conditional_1_Template, 5, 0, "section");
    \u0275\u0275conditionalCreate(2, ReactionBenchComponent_Conditional_168_Conditional_2_Template, 5, 0, "section");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_1_0 = ctx_r2.solutionStage()) ? 1 : -1, tmp_1_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_2_0 = ctx_r2.indicatorStage()) ? 2 : -1, tmp_2_0);
  }
}
function ReactionBenchComponent_Conditional_169_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Held tightly, first attempt \u2014 a clean comparison with your other vials. ");
  }
}
function ReactionBenchComponent_Conditional_169_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" Inside tolerance after ", ctx_r2.retries(), " reset(s). Closer pours make your comparisons stronger. ");
  }
}
function ReactionBenchComponent_Conditional_169_Conditional_8_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 89);
    \u0275\u0275text(1, " The bench will not file a record until you describe the change in your own words. ");
    \u0275\u0275elementEnd();
  }
}
function ReactionBenchComponent_Conditional_169_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 152);
    \u0275\u0275text(1, " Write what the vessel showed you ");
    \u0275\u0275elementStart(2, "textarea", 153);
    \u0275\u0275listener("ngModelChange", function ReactionBenchComponent_Conditional_169_Conditional_8_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.observation.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 96);
    \u0275\u0275listener("click", function ReactionBenchComponent_Conditional_169_Conditional_8_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.capture());
    });
    \u0275\u0275text(4, " File this screening as evidence ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ReactionBenchComponent_Conditional_169_Conditional_8_Conditional_5_Template, 2, 0, "p", 89);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.observation());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.canCapture());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.canCapture() ? 5 : -1);
  }
}
function ReactionBenchComponent_Conditional_169_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 89);
    \u0275\u0275text(1, "This protocol is retained in the local procedure log. Choose another vial or restart to compare.");
    \u0275\u0275elementEnd();
  }
}
function ReactionBenchComponent_Conditional_169_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 151)(1, "small");
    \u0275\u0275text(2, "Conditions you set");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275conditionalCreate(6, ReactionBenchComponent_Conditional_169_Conditional_6_Template, 1, 0)(7, ReactionBenchComponent_Conditional_169_Conditional_7_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, ReactionBenchComponent_Conditional_169_Conditional_8_Template, 6, 3)(9, ReactionBenchComponent_Conditional_169_Conditional_9_Template, 2, 0, "p", 89);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("off", !ctx_r2.tightRun());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3(" ", ctx_r2.recordedVolumeMl().toFixed(2), " mL \xB7 ", ctx_r2.recordedMassG().toFixed(2), " g \xB7 ", ctx_r2.drops(), " drops ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.tightRun() ? 6 : 7);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.preview ? 8 : 9);
  }
}
var targetVolumeMl = 5;
var volumeToleranceMl = 0.25;
var targetMassG = 2;
var massToleranceG = 0.05;
var requiredDrops = 3;
var beakerCapacityMl = 7;
var pourRateMlPerTick = 0.11;
var trickleRateGPerTick = 0.035;
var tickMs = 60;
var ambientTemperature = 22;
var reactionDurationMs = 4200;
var developDurationMs = 2600;
var reactionSeconds = 18;
var liquidColors = {
  clear: "rgba(206, 236, 243, 0.5)",
  cloudy: "rgba(228, 236, 238, 0.88)",
  amber: "#c8891f",
  "golden tan": "#d9a441",
  "light tan": "#d9c79a",
  "dark blue-black": "#171d3d"
};
var solutionColor = "rgba(206, 236, 243, 0.5)";
var ReactionBenchComponent = class _ReactionBenchComponent {
  preview = inject(LAB_AUTHORING_PREVIEW);
  captured = output();
  selectedVialId = input(
    ...ngDevMode ? [void 0, { debugName: "selectedVialId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  active = input(
    true,
    ...ngDevMode ? [{ debugName: "active" }] : (
      /* istanbul ignore next */
      []
    )
  );
  vialChanged = output();
  drafts = /* @__PURE__ */ new Map();
  checkpoint;
  flushDraft = () => {
  };
  vials = mysteryVials;
  targetVolumeMl = targetVolumeMl;
  volumeToleranceMl = volumeToleranceMl;
  targetMassG = targetMassG;
  massToleranceG = massToleranceG;
  requiredDrops = requiredDrops;
  beakerCapacityMl = beakerCapacityMl;
  step = signal(
    "select",
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  vialId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "vialId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** The vial the student has picked up from the tray but not yet docked. */
  heldVialId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "heldVialId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dockHover = signal(
    false,
    ...ngDevMode ? [{ debugName: "dockHover" }] : (
      /* istanbul ignore next */
      []
    )
  );
  volumeMl = signal(
    0,
    ...ngDevMode ? [{ debugName: "volumeMl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  massG = signal(
    0,
    ...ngDevMode ? [{ debugName: "massG" }] : (
      /* istanbul ignore next */
      []
    )
  );
  drops = signal(
    0,
    ...ngDevMode ? [{ debugName: "drops" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tapOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "tapOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tipping = signal(
    false,
    ...ngDevMode ? [{ debugName: "tipping" }] : (
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
  liquid = signal(
    solutionColor,
    ...ngDevMode ? [{ debugName: "liquid" }] : (
      /* istanbul ignore next */
      []
    )
  );
  temperature = signal(
    ambientTemperature,
    ...ngDevMode ? [{ debugName: "temperature" }] : (
      /* istanbul ignore next */
      []
    )
  );
  bubbling = signal(
    false,
    ...ngDevMode ? [{ debugName: "bubbling" }] : (
      /* istanbul ignore next */
      []
    )
  );
  progress = signal(
    0,
    ...ngDevMode ? [{ debugName: "progress" }] : (
      /* istanbul ignore next */
      []
    )
  );
  transferring = signal(
    false,
    ...ngDevMode ? [{ debugName: "transferring" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dropFalling = signal(
    false,
    ...ngDevMode ? [{ debugName: "dropFalling" }] : (
      /* istanbul ignore next */
      []
    )
  );
  splashing = signal(
    false,
    ...ngDevMode ? [{ debugName: "splashing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  art = apparatusArt;
  renderQuality = inject(RenderQualityService);
  /** False on hardware that could not hold frame rate, or reduced motion. */
  filters = computed(
    () => this.renderQuality.quality() === "high",
    ...ngDevMode ? [{ debugName: "filters" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** What the student actually achieved, latched when each step is locked in. */
  recordedVolumeMl = signal(
    0,
    ...ngDevMode ? [{ debugName: "recordedVolumeMl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recordedMassG = signal(
    0,
    ...ngDevMode ? [{ debugName: "recordedMassG" }] : (
      /* istanbul ignore next */
      []
    )
  );
  retries = signal(
    0,
    ...ngDevMode ? [{ debugName: "retries" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stages = signal(
    [],
    ...ngDevMode ? [{ debugName: "stages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  observation = signal(
    "",
    ...ngDevMode ? [{ debugName: "observation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  procedureLog = signal(
    [],
    ...ngDevMode ? [{ debugName: "procedureLog" }] : (
      /* istanbul ignore next */
      []
    )
  );
  screenedVialIds = signal(
    [],
    ...ngDevMode ? [{ debugName: "screenedVialIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  simulation = new DeterministicSimulationAdapter();
  tapTimer;
  scaleTimer;
  tweenTimer;
  constructor() {
    this.simulation.initialize({
      id: "chemical-reaction-comparison",
      settings: { keyFields: ["specimen", "test"], outcomeTable: reactionOutcomeTable }
    });
    this.flushDraft = persistWorkspaceDraft("reaction-bench", () => {
      if (!this.busy())
        this.checkpoint = this.readDraft();
      return {
        current: this.checkpoint,
        drafts: [...this.drafts.entries()],
        screened: this.screenedVialIds(),
        log: this.procedureLog()
      };
    }, (saved) => {
      if (Array.isArray(saved.drafts))
        for (const [id, draft] of saved.drafts)
          this.drafts.set(id, draft);
      if (saved.current)
        this.restoreDraft(saved.current);
      if (Array.isArray(saved.screened))
        this.screenedVialIds.set(saved.screened);
      if (Array.isArray(saved.log))
        this.procedureLog.set(saved.log);
    });
    effect(() => {
      const id = this.selectedVialId();
      untracked(() => {
        if (id && id !== this.vialId())
          this.selectVial(id);
      });
    });
    effect(() => {
      if (!this.active())
        untracked(() => {
          this.stopTap();
          this.stopTip();
        });
    });
  }
  ngOnDestroy() {
    this.stopTap();
    this.stopTip();
    this.clearTween();
    this.flushDraft();
  }
  readDraft() {
    return {
      vialId: this.vialId(),
      step: this.step(),
      volumeMl: this.volumeMl(),
      massG: this.massG(),
      drops: this.drops(),
      recordedVolumeMl: this.recordedVolumeMl(),
      recordedMassG: this.recordedMassG(),
      retries: this.retries(),
      liquid: this.liquid(),
      temperature: this.temperature(),
      stages: this.stages(),
      observation: this.observation()
    };
  }
  restoreDraft(draft) {
    if (!this.vials.some((v) => v.vialId === draft.vialId) || !["fill", "weigh", "indicator", "complete"].includes(draft.step))
      return;
    this.vialId.set(draft.vialId);
    this.step.set(draft.step);
    this.volumeMl.set(draft.volumeMl);
    this.massG.set(draft.massG);
    this.drops.set(draft.drops);
    this.recordedVolumeMl.set(draft.recordedVolumeMl);
    this.recordedMassG.set(draft.recordedMassG);
    this.retries.set(draft.retries);
    this.liquid.set(draft.liquid);
    this.temperature.set(draft.temperature);
    this.stages.set(draft.stages);
    this.observation.set(draft.observation);
  }
  // ---- derived readouts ---------------------------------------------------
  activeVial = computed(
    () => this.vials.find((vial) => vial.vialId === this.vialId()),
    ...ngDevMode ? [{ debugName: "activeVial" }] : (
      /* istanbul ignore next */
      []
    )
  );
  volumeOk = computed(
    () => Math.abs(this.volumeMl() - targetVolumeMl) <= volumeToleranceMl,
    ...ngDevMode ? [{ debugName: "volumeOk" }] : (
      /* istanbul ignore next */
      []
    )
  );
  volumeOver = computed(
    () => this.volumeMl() - targetVolumeMl > volumeToleranceMl,
    ...ngDevMode ? [{ debugName: "volumeOver" }] : (
      /* istanbul ignore next */
      []
    )
  );
  massOk = computed(
    () => Math.abs(this.massG() - targetMassG) <= massToleranceG,
    ...ngDevMode ? [{ debugName: "massOk" }] : (
      /* istanbul ignore next */
      []
    )
  );
  massOver = computed(
    () => this.massG() - targetMassG > massToleranceG,
    ...ngDevMode ? [{ debugName: "massOver" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** The balance only calls a reading stable once the student stops adding. */
  scaleStable = computed(
    () => !this.tipping(),
    ...ngDevMode ? [{ debugName: "scaleStable" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canTransfer = computed(
    () => this.step() === "weigh" && this.massOk() && this.scaleStable() && !this.busy(),
    ...ngDevMode ? [{ debugName: "canTransfer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fillPercent = computed(
    () => Math.min(this.volumeMl() / beakerCapacityMl * 100, 100),
    ...ngDevMode ? [{ debugName: "fillPercent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Where the target band sits on the beaker wall, as a percentage of capacity. */
  bandBottomPercent = computed(
    () => (targetVolumeMl - volumeToleranceMl) / beakerCapacityMl * 100,
    ...ngDevMode ? [{ debugName: "bandBottomPercent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  bandHeightPercent = computed(
    () => volumeToleranceMl * 2 / beakerCapacityMl * 100,
    ...ngDevMode ? [{ debugName: "bandHeightPercent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** The tun visibly empties as solution is drawn into the beaker. */
  tunLevelPercent = computed(
    () => 74 - this.volumeMl() / beakerCapacityMl * 30,
    ...ngDevMode ? [{ debugName: "tunLevelPercent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Grain profile for the loaded specimen — coarse crystals through fine powder. */
  grainProfile = computed(
    () => grainProfiles[this.vialId() ?? ""] ?? defaultGrainProfile,
    ...ngDevMode ? [{ debugName: "grainProfile" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Grains leaving the vial mouth, spread wide enough to read as a pour. */
  pourGrains = computed(
    () => buildGrainSpecs(this.grainProfile(), 22),
    ...ngDevMode ? [{ debugName: "pourGrains" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Grains dropping from the pan into the vessel, in a tighter column. */
  transferGrains = computed(
    () => buildGrainSpecs(this.grainProfile(), 14),
    ...ngDevMode ? [{ debugName: "transferGrains" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Depth-graded fill: liquid reads lighter at the surface than at the base. */
  liquidTop = computed(
    () => this.liquid(),
    ...ngDevMode ? [{ debugName: "liquidTop" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // ---- vessel geometry, in the SVG's 128x176 user space -------------------
  // Vessel bore in the SVG's 128x176 space, matched to the beaker plate so the
  // drawn liquid sits inside the photographed glass.
  static wellTop = 47;
  static wellBottom = 143;
  wellX = 33;
  wellW = 61;
  wellSpan() {
    return _ReactionBenchComponent.wellBottom - _ReactionBenchComponent.wellTop;
  }
  /** Y of the liquid surface: full beaker sits at wellTop. */
  liquidY() {
    const filled = Math.min(this.volumeMl() / beakerCapacityMl, 1);
    return _ReactionBenchComponent.wellBottom - this.wellSpan() * filled;
  }
  liquidH() {
    return _ReactionBenchComponent.wellBottom - this.liquidY();
  }
  /** Y of a graduation mark, in millilitres. */
  gradY(millilitres) {
    return _ReactionBenchComponent.wellBottom - this.wellSpan() * (millilitres / beakerCapacityMl);
  }
  bandY() {
    return this.gradY(targetVolumeMl + volumeToleranceMl);
  }
  bandH() {
    return this.gradY(targetVolumeMl - volumeToleranceMl) - this.bandY();
  }
  elapsedSeconds = computed(
    () => Math.round(this.progress() * reactionSeconds),
    ...ngDevMode ? [{ debugName: "elapsedSeconds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  solutionStage = computed(
    () => this.stages().find((stage) => stage.reagent === "solution-a"),
    ...ngDevMode ? [{ debugName: "solutionStage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  indicatorStage = computed(
    () => this.stages().find((stage) => stage.reagent === "indicator-b"),
    ...ngDevMode ? [{ debugName: "indicatorStage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The gates already refuse anything outside tolerance, so this asks the
   * harder question: did they land inside half a tolerance, first time?
   */
  tightRun = computed(
    () => this.retries() === 0 && Math.abs(this.recordedVolumeMl() - targetVolumeMl) <= volumeToleranceMl / 2 && Math.abs(this.recordedMassG() - targetMassG) <= massToleranceG / 2,
    ...ngDevMode ? [{ debugName: "tightRun" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canCapture = computed(
    () => this.step() === "complete" && this.observation().trim().length > 0,
    ...ngDevMode ? [{ debugName: "canCapture" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stepHint = computed(
    () => {
      switch (this.step()) {
        case "select":
          return "Select a sealed vial, then place it on the bench. The rig runs a single vessel at a time.";
        case "fill":
          return this.volumeOver() ? `Over the line at ${this.volumeMl().toFixed(2)} mL. Drain the beaker and pour again.` : this.volumeOk() ? `${this.volumeMl().toFixed(2)} mL \u2014 inside the band. Move to the balance.` : `Turn the valve to start the flow and close it at ${targetVolumeMl.toFixed(1)} mL. Nudge in ${volumeToleranceMl.toFixed(2)} mL either way is allowed.`;
        case "weigh":
          return this.massOver() ? `${this.massG().toFixed(2)} g is too much. Take a pinch back off the pan.` : this.massOk() ? `${this.massG().toFixed(2)} g \u2014 on target. Transfer it into the vessel.` : `Tip the vial over the pan until the balance reads ${targetMassG.toFixed(2)} g.`;
        case "react":
          return "Sealed and reacting. Watch the vessel and the thermometer.";
        case "indicator":
          return `Add ${requiredDrops} drops of Indicator B \u2014 no more, no fewer.`;
        case "complete":
          return this.preview ? "Both stages are recorded in the local procedure log. Compare another vial or restart." : "Both stages are done. Write down what you saw.";
      }
    },
    ...ngDevMode ? [{ debugName: "stepHint" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isScreened(vialId) {
    return this.screenedVialIds().includes(vialId);
  }
  vialCode(vialId) {
    return this.vials.find((vial) => vial.vialId === vialId)?.code ?? "\u2014";
  }
  vialColor(vialId) {
    return this.vials.find((vial) => vial.vialId === vialId)?.color ?? "#4d7f8c";
  }
  entries(value) {
    return value === void 0 ? [] : Object.entries(value).map(([key, item]) => [readableLabel2(key), String(item)]);
  }
  // ---- step 0: choose the specimen ---------------------------------------
  /** Picks a vial up off the tray, ready to be carried to the bench. */
  holdVial(vialId) {
    if (this.busy()) {
      return;
    }
    this.heldVialId.update((current) => current === vialId ? void 0 : vialId);
  }
  startVialDrag(event, vialId) {
    if (this.busy()) {
      event.preventDefault();
      return;
    }
    this.heldVialId.set(vialId);
    event.dataTransfer?.setData("text/plain", vialId);
  }
  allowDock(event) {
    if (this.busy() || this.heldVialId() === void 0) {
      return;
    }
    event.preventDefault();
    this.dockHover.set(true);
  }
  clearDockHover() {
    this.dockHover.set(false);
  }
  /** Drops the carried vial onto the bench, which starts the run. */
  dockVial() {
    this.dockHover.set(false);
    const vialId = this.heldVialId();
    if (vialId === void 0 || this.busy()) {
      return;
    }
    this.selectVial(vialId);
  }
  selectVial(vialId) {
    if (this.busy() || vialId === this.vialId() || !this.vials.some((v) => v.vialId === vialId)) {
      return;
    }
    const previous = this.vialId();
    if (previous)
      this.drafts.set(previous, this.readDraft());
    this.resetRun();
    this.vialId.set(vialId);
    this.heldVialId.set(void 0);
    this.step.set("fill");
    const draft = this.drafts.get(vialId);
    if (draft)
      this.restoreDraft(draft);
    this.vialChanged.emit(vialId);
  }
  // ---- step 1: pour from the tun -----------------------------------------
  toggleTap() {
    if (this.step() !== "fill" || this.busy()) {
      return;
    }
    if (this.tapOpen()) {
      this.stopTap();
      return;
    }
    this.tapOpen.set(true);
    this.renderQuality.probe();
    this.tapTimer = setInterval(() => {
      this.volumeMl.update((current) => round2(Math.min(current + pourRateMlPerTick, beakerCapacityMl)));
      if (this.volumeMl() >= beakerCapacityMl) {
        this.stopTap();
      }
    }, tickMs);
  }
  nudgeVolume() {
    if (this.step() !== "fill" || this.tapOpen() || this.busy()) {
      return;
    }
    this.volumeMl.update((current) => round2(Math.min(current + 0.1, beakerCapacityMl)));
  }
  drainBeaker() {
    if (this.busy() || this.volumeMl() === 0) {
      return;
    }
    this.stopTap();
    this.volumeMl.set(0);
    this.retries.update((count) => count + 1);
  }
  confirmVolume() {
    if (this.step() === "fill" && this.volumeOk() && !this.tapOpen()) {
      this.recordedVolumeMl.set(this.volumeMl());
      this.step.set("weigh");
    }
  }
  stopTap() {
    this.tapOpen.set(false);
    if (this.tapTimer !== void 0) {
      clearInterval(this.tapTimer);
      this.tapTimer = void 0;
    }
  }
  // ---- step 2: weigh the specimen ----------------------------------------
  toggleTip() {
    if (this.step() !== "weigh" || this.busy()) {
      return;
    }
    if (this.tipping()) {
      this.stopTip();
      return;
    }
    this.tipping.set(true);
    this.scaleTimer = setInterval(() => {
      this.massG.update((current) => round2(Math.min(current + trickleRateGPerTick, 5)));
      if (this.massG() >= 5) {
        this.stopTip();
      }
    }, tickMs);
  }
  removePinch() {
    if (this.step() !== "weigh" || this.tipping() || this.busy()) {
      return;
    }
    this.massG.update((current) => round2(Math.max(current - 0.1, 0)));
  }
  emptyPan() {
    if (this.busy() || this.massG() === 0) {
      return;
    }
    this.stopTip();
    this.massG.set(0);
    this.retries.update((count) => count + 1);
  }
  stopTip() {
    this.tipping.set(false);
    if (this.scaleTimer !== void 0) {
      clearInterval(this.scaleTimer);
      this.scaleTimer = void 0;
    }
  }
  // ---- step 3: transfer and react ----------------------------------------
  async transfer() {
    const vialId = this.vialId();
    if (!this.canTransfer() || vialId === void 0) {
      return;
    }
    const output2 = this.outcome(vialId, "solution-a");
    this.recordedMassG.set(this.massG());
    this.busy.set(true);
    this.transferring.set(true);
    await delay(620);
    this.splashing.set(true);
    await delay(380);
    this.transferring.set(false);
    this.massG.set(0);
    await delay(220);
    this.splashing.set(false);
    this.step.set("react");
    this.liquid.set(colorOf(output2, "before"));
    await delay(180);
    this.liquid.set(colorOf(output2, "after"));
    this.bubbling.set(gasVisible(output2));
    await this.tween(output2, reactionDurationMs);
    this.bubbling.set(false);
    this.stages.update((current) => [...current, { reagent: "solution-a", output: output2 }]);
    this.step.set("indicator");
    this.busy.set(false);
  }
  // ---- step 4: add the indicator -----------------------------------------
  async addDrop() {
    const vialId = this.vialId();
    if (this.step() !== "indicator" || this.busy() || vialId === void 0) {
      return;
    }
    this.busy.set(true);
    this.dropFalling.set(true);
    await delay(400);
    this.dropFalling.set(false);
    this.splashing.set(true);
    this.drops.update((count) => count + 1);
    await delay(320);
    this.splashing.set(false);
    if (this.drops() < requiredDrops) {
      this.busy.set(false);
      return;
    }
    const output2 = this.outcome(vialId, "indicator-b");
    this.liquid.set(colorOf(output2, "before"));
    await delay(220);
    this.liquid.set(colorOf(output2, "after"));
    await delay(developDurationMs);
    this.stages.update((current) => [...current, { reagent: "indicator-b", output: output2 }]);
    this.step.set("complete");
    this.busy.set(false);
    this.recordProcedure();
  }
  // ---- filing the record --------------------------------------------------
  capture() {
    const vialId = this.vialId();
    const solution = this.solutionStage();
    const indicator = this.indicatorStage();
    if (!this.canCapture() || vialId === void 0 || !solution || !indicator) {
      return;
    }
    this.captured.emit({
      activityId: "activity-reaction-comparison",
      evidenceId: "evidence-reaction-trials",
      result: {
        vialId,
        procedure: {
          volumeMl: this.recordedVolumeMl(),
          massG: this.recordedMassG(),
          drops: this.drops(),
          retries: this.retries(),
          heldTightly: this.tightRun()
        },
        stages: [
          { reagent: solution.reagent, vialId, output: solution.output },
          { reagent: indicator.reagent, vialId, output: indicator.output }
        ]
      },
      note: this.observation().trim()
    });
    this.screenedVialIds.update((current) => [.../* @__PURE__ */ new Set([...current, vialId])]);
    this.drafts.delete(vialId);
    this.resetRun();
    if (this.selectedVialId())
      this.selectVial(vialId);
  }
  abandonRun() {
    if (this.busy())
      return;
    const id = this.selectedVialId();
    if (id)
      this.drafts.delete(id);
    this.resetRun();
    if (id)
      this.selectVial(id);
  }
  resetRun() {
    this.stopTap();
    this.stopTip();
    this.clearTween();
    this.step.set("select");
    this.vialId.set(void 0);
    this.heldVialId.set(void 0);
    this.dockHover.set(false);
    this.volumeMl.set(0);
    this.massG.set(0);
    this.drops.set(0);
    this.recordedVolumeMl.set(0);
    this.recordedMassG.set(0);
    this.retries.set(0);
    this.busy.set(false);
    this.transferring.set(false);
    this.dropFalling.set(false);
    this.splashing.set(false);
    this.bubbling.set(false);
    this.progress.set(0);
    this.temperature.set(ambientTemperature);
    this.liquid.set(solutionColor);
    this.stages.set([]);
    this.observation.set("");
  }
  // ---- internals ----------------------------------------------------------
  outcome(vialId, test) {
    this.simulation.setInputs({ specimen: vialId, test });
    this.simulation.beginTrial();
    return this.simulation.endTrial().outputs;
  }
  /** Walks the thermometer from the before reading to the after reading. */
  tween(output2, durationMs) {
    return new Promise((resolve) => {
      const started = Date.now();
      this.clearTween();
      this.tweenTimer = setInterval(() => {
        const ratio = Math.min((Date.now() - started) / durationMs, 1);
        this.progress.set(ratio);
        const eased = 1 - Math.pow(1 - ratio, 3);
        this.temperature.set(temperatureAt(output2, eased));
        if (ratio >= 1) {
          this.clearTween();
          resolve();
        }
      }, 70);
    });
  }
  clearTween() {
    if (this.tweenTimer !== void 0) {
      clearInterval(this.tweenTimer);
      this.tweenTimer = void 0;
    }
  }
  recordProcedure() {
    const vialCode = this.vialCode(this.vialId());
    const solution = this.solutionStage()?.output ?? {};
    const indicator = this.indicatorStage()?.output ?? {};
    this.procedureLog.update((current) => [
      {
        id: Math.max(0, ...current.map((entry) => entry.id)) + 1,
        vialCode,
        volumeMl: this.recordedVolumeMl(),
        massG: this.recordedMassG(),
        drops: this.drops(),
        retries: this.retries(),
        clean: this.tightRun(),
        headline: headlineFor(solution, indicator)
      },
      ...current.slice(0, 39)
    ]);
  }
  static \u0275fac = function ReactionBenchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReactionBenchComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReactionBenchComponent, selectors: [["app-reaction-bench"]], hostVars: 2, hostBindings: function ReactionBenchComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("lab-preview", ctx.preview);
    }
  }, inputs: { selectedVialId: [1, "selectedVialId"], active: [1, "active"] }, outputs: { captured: "captured", vialChanged: "vialChanged" }, decls: 170, vars: 116, consts: [[1, "bench-canvas", 3, "dragend"], ["role", "img", "aria-label", "Sealed-vessel reaction bench", 1, "bench-scene"], ["aria-hidden", "true", 1, "bench-shade"], [1, "bench-grid"], ["aria-labelledby", "tray-title", 1, "tray", 3, "hidden"], [1, "kicker"], ["id", "tray-title"], [1, "tray-hint"], [1, "vial-tray"], ["type", "button", 1, "primary-action", 3, "disabled"], [1, "protocol"], ["aria-hidden", "true"], [1, "rig"], [1, "rig-head"], [1, "rig-clock"], [1, "apparatus"], [1, "plumbing"], [1, "tun"], ["aria-hidden", "true", 1, "tun-label"], [1, "tun-body"], ["alt", "", 1, "part-plate", 3, "src", "mix-blend-mode"], [1, "tun-well"], [1, "tun-liquid"], ["aria-hidden", "true", 1, "tun-surface"], ["aria-hidden", "true", 1, "feed-tube"], ["alt", "", 1, "part-plate", "part-plate--tile", 3, "src", "mix-blend-mode"], [1, "tube-wall"], [1, "tube-flow"], ["type", "button", 1, "valve", 3, "click", "disabled"], ["alt", "", 1, "part-plate", "valve-plate", 3, "src", "mix-blend-mode"], ["aria-hidden", "true", 1, "valve-housing"], ["aria-hidden", "true", 1, "valve-handle"], [1, "valve-caption"], ["aria-hidden", "true", 1, "spout"], [1, "spout-neck"], [1, "pour-stream"], [1, "beaker"], ["alt", "", 1, "beaker-plate", 3, "src", "mix-blend-mode"], ["viewBox", "0 0 128 176", "aria-hidden", "true", 1, "beaker-svg"], ["id", "rb-well"], ["d", "M33 47 H94 V135 A8 8 0 0 1 86 143 H41 A8 8 0 0 1 33 135 Z"], ["id", "rb-depth", "x1", "0", "y1", "0", "x2", "0", "y2", "1"], ["offset", "0", "stop-color", "#fff", "stop-opacity", "0.34"], ["offset", "0.45", "stop-color", "#000", "stop-opacity", "0"], ["offset", "1", "stop-color", "#000", "stop-opacity", "0.42"], ["id", "rb-glass", "x1", "0", "y1", "0", "x2", "1", "y2", "0"], ["offset", "0", "stop-color", "#dff2f8", "stop-opacity", "0.85"], ["offset", "0.13", "stop-color", "#ffffff", "stop-opacity", "0.5"], ["offset", "0.34", "stop-color", "#8fbccb", "stop-opacity", "0.12"], ["offset", "0.82", "stop-color", "#cfe9f2", "stop-opacity", "0.3"], ["offset", "1", "stop-color", "#eaf8fc", "stop-opacity", "0.8"], ["id", "rb-refract", "x", "-12%", "y", "-12%", "width", "124%", "height", "124%"], ["type", "fractalNoise", "baseFrequency", "0.014 0.05", "numOctaves", "2", "seed", "7", "result", "noise"], ["in", "SourceGraphic", "in2", "noise", "scale", "6", "xChannelSelector", "R", "yChannelSelector", "G"], ["id", "rb-gloss", "x", "-30%", "y", "-30%", "width", "160%", "height", "160%"], ["stdDeviation", "2.4"], ["id", "rb-soft", "x", "-60%", "y", "-60%", "width", "220%", "height", "220%"], ["stdDeviation", "5"], ["cx", "64", "cy", "168", "rx", "44", "ry", "6", "filter", "url(#rb-soft)", 1, "rb-shadow"], ["cx", "64", "cy", "169", "rx", "30", "ry", "4.5", "filter", "url(#rb-soft)", 1, "rb-caustic"], ["clip-path", "url(#rb-well)"], [1, "rb-behind"], ["x", "33", "y", "47", "width", "61", "height", "96", "fill", "#08202c", "opacity", "0.4"], [1, "rb-band"], [1, "rb-liquid"], [1, "rb-bubbles"], [1, "rb-fall"], ["cx", "64", "cy", "30", "rx", "2.6", "ry", "3.4", 1, "rb-drop"], ["aria-live", "polite", 1, "volume-readout"], [1, "thermometer"], [1, "thermometer__track"], [1, "thermometer__column"], ["aria-live", "polite", 1, "thermometer__read"], [1, "line-controls"], ["type", "button", 3, "click", "disabled"], [1, "balance-bay"], [1, "vial-dock", 3, "dragover", "dragleave", "drop", "click"], [1, "dock-empty"], [1, "scale"], ["alt", "", 1, "part-plate", "scale-plate", 3, "src", "mix-blend-mode"], [1, "scale-pan"], [1, "scale-body"], [1, "scale-readout"], [1, "scale-status"], ["type", "button", 1, "tip-control", 3, "click", "disabled"], [1, "rig-controls"], ["aria-live", "polite", 1, "rig-hint"], ["type", "button", 1, "ghost-action", 3, "disabled"], ["aria-label", "Reaction trial readings", 1, "record", 3, "hidden"], [1, "record-note"], ["aria-live", "polite", 1, "readout-stack"], ["type", "button", "draggable", "true", 1, "vial-chip", 3, "dragstart", "click", "disabled"], ["alt", "", 3, "src"], [1, "vial-chip__code"], [1, "vial-chip__cue"], ["aria-hidden", "true", 1, "vial-chip__done"], ["type", "button", 1, "primary-action", 3, "click", "disabled"], [1, "run-log"], [3, "off-protocol"], [1, "run-log__index"], ["alt", "", 1, "part-plate", 3, "src"], ["alt", "", 1, "part-plate", "part-plate--tile", 3, "src"], ["alt", "", 1, "part-plate", "valve-plate", 3, "src"], [1, "stream-body"], [1, "stream-bead", 3, "animation-delay"], [1, "stream-bead"], ["alt", "", 1, "beaker-plate", 3, "src"], [1, "rb-grad"], ["x1", "86", "y1", "0", "x2", "104", "y2", "0"], ["x", "82", "y", "3.4"], [1, "rb-liquid-body"], ["fill", "url(#rb-depth)"], ["cx", "64", "rx", "30.5", "ry", "3.6", 1, "rb-meniscus"], ["cx", "64", "rx", "30.5", "ry", "3.6", 1, "rb-meniscus-rim"], [3, "animation-delay"], ["y", "24", "rx", "0.6", 3, "animation-delay", "--%NS%spin"], ["y", "24", "rx", "0.6"], ["cx", "64", "rx", "34", "ry", "12", "filter", "url(#rb-soft)", 1, "rb-puff"], ["cx", "64", "rx", "10", "ry", "3", 1, "rb-ring"], ["cx", "64", "rx", "10", "ry", "3", 1, "rb-ring", "rb-ring--late"], ["d", "M28 41 H100 V135 A10 10 0 0 1 90 145 H38 A10 10 0 0 1 28 135 Z", "fill", "url(#rb-glass)", 1, "rb-glass"], ["d", "M28 41 H100 V135 A10 10 0 0 1 90 145 H38 A10 10 0 0 1 28 135 Z", 1, "rb-glass-edge"], ["d", "M37 51 L35 126", "filter", "url(#rb-gloss)", 1, "rb-highlight"], ["d", "M93 53 L95 130", 1, "rb-rimlight"], ["x", "46", "y", "24", "width", "36", "height", "14", "rx", "4", 1, "rb-stopper"], ["x", "49", "y", "26", "width", "30", "height", "4", "rx", "2", 1, "rb-stopper-top"], [1, "lab-vial"], ["viewBox", "0 0 34 82", "aria-hidden", "true"], ["x1", "0", "y1", "0", "x2", "1", "y2", "0"], ["offset", "0", "stop-color", "#0d2a36", "stop-opacity", "0.5"], ["offset", "0.2", "stop-color", "#ffffff", "stop-opacity", "0.42"], ["offset", "0.55", "stop-color", "#9fd2e0", "stop-opacity", "0.08"], ["offset", "0.88", "stop-color", "#dff2f8", "stop-opacity", "0.36"], ["offset", "1", "stop-color", "#0d2a36", "stop-opacity", "0.45"], ["d", "M9 22 H25 V66 A5 5 0 0 1 20 71 H14 A5 5 0 0 1 9 66 Z"], ["x", "9", "y", "22", "width", "16", "height", "49", "fill", "#07202b", "opacity", "0.35"], ["x", "9", "y", "47", "width", "16", "height", "24", 1, "rbv-powder"], ["cx", "17", "cy", "47", "rx", "8", "ry", "1.8", 1, "rbv-powder-top"], ["d", "M6 20 H28 V70 A6 6 0 0 1 22 76 H12 A6 6 0 0 1 6 70 Z", 1, "rbv-glass"], ["d", "M6 20 H28 V70 A6 6 0 0 1 22 76 H12 A6 6 0 0 1 6 70 Z", 1, "rbv-edge"], ["x", "9", "y", "33", "width", "16", "height", "20", 1, "rbv-label"], ["x", "17", "y", "46", 1, "rbv-code"], ["d", "M10 24 L9.5 68", 1, "rbv-shine"], ["aria-hidden", "true", 1, "vial-pour"], ["x", "10", "y", "2", "width", "14", "height", "8", "rx", "2", 1, "rbv-cap"], ["x", "12", "y", "10", "width", "10", "height", "10", 1, "rbv-neck"], [1, "pour-dust", 3, "background", "opacity"], [3, "sparkle", "clump", "background", "--%NS%grain-x", "--%NS%grain-size", "--%NS%spin", "animation-delay"], [1, "pour-dust"], ["alt", "", 1, "part-plate", "scale-plate", 3, "src"], ["type", "button", 1, "ghost-action", 3, "click", "disabled"], [1, "protocol-card"], [1, "observation-field"], ["rows", "4", "placeholder", "When the specimen went in\u2026 then after the indicator\u2026", 3, "ngModelChange", "ngModel"]], template: function ReactionBenchComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275listener("dragend", function ReactionBenchComponent_Template_section_dragend_0_listener() {
        return ctx.clearDockHover();
      });
      \u0275\u0275element(1, "div", 1)(2, "div", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "aside", 4)(5, "span", 5);
      \u0275\u0275text(6, "Sealed specimens");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "h2", 6);
      \u0275\u0275text(8, "Specimen tray");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 7);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "ul", 8);
      \u0275\u0275repeaterCreate(12, ReactionBenchComponent_For_13_Template, 8, 13, "li", null, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(14, ReactionBenchComponent_Conditional_14_Template, 2, 2, "button", 9);
      \u0275\u0275elementStart(15, "span", 5);
      \u0275\u0275text(16, "Protocol");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "ol", 10)(18, "li")(19, "span", 11);
      \u0275\u0275text(20, "1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "span");
      \u0275\u0275text(22, "Turn the valve and draw ");
      \u0275\u0275elementStart(23, "strong");
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275text(25, " into the vessel");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "li")(27, "span", 11);
      \u0275\u0275text(28, "2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "span");
      \u0275\u0275text(30, "Tip ");
      \u0275\u0275elementStart(31, "strong");
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275text(33, " of specimen onto the balance");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "li")(35, "span", 11);
      \u0275\u0275text(36, "3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "span");
      \u0275\u0275text(38, "Transfer it into the sealed vessel and observe");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "li")(40, "span", 11);
      \u0275\u0275text(41, "4");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "span");
      \u0275\u0275text(43, "Add ");
      \u0275\u0275elementStart(44, "strong");
      \u0275\u0275text(45);
      \u0275\u0275elementEnd();
      \u0275\u0275text(46, " of Indicator B");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(47, ReactionBenchComponent_Conditional_47_Template, 5, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 12)(49, "header", 13)(50, "div")(51, "span", 5);
      \u0275\u0275text(52, "Sealed vessel \xB7 single specimen");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "h1");
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(55, ReactionBenchComponent_Conditional_55_Template, 7, 1, "div", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "div", 15)(57, "div", 16)(58, "div", 17)(59, "span", 18);
      \u0275\u0275text(60, "Solution A reservoir");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "div", 19);
      \u0275\u0275conditionalCreate(62, ReactionBenchComponent_Conditional_62_Template, 1, 3, "img", 20);
      \u0275\u0275elementStart(63, "div", 21)(64, "div", 22);
      \u0275\u0275element(65, "span", 23);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(66, "div", 24);
      \u0275\u0275conditionalCreate(67, ReactionBenchComponent_Conditional_67_Template, 1, 3, "img", 25);
      \u0275\u0275element(68, "span", 26)(69, "span", 27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "button", 28);
      \u0275\u0275listener("click", function ReactionBenchComponent_Template_button_click_70_listener() {
        return ctx.toggleTap();
      });
      \u0275\u0275conditionalCreate(71, ReactionBenchComponent_Conditional_71_Template, 1, 3, "img", 29)(72, ReactionBenchComponent_Conditional_72_Template, 1, 0, "span", 30);
      \u0275\u0275elementStart(73, "span", 31);
      \u0275\u0275element(74, "i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "span", 32);
      \u0275\u0275text(76);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(77, "div", 33);
      \u0275\u0275element(78, "span", 34);
      \u0275\u0275conditionalCreate(79, ReactionBenchComponent_Conditional_79_Template, 4, 1, "div", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "div", 36);
      \u0275\u0275conditionalCreate(81, ReactionBenchComponent_Conditional_81_Template, 1, 3, "img", 37);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(82, "svg", 38)(83, "defs")(84, "clipPath", 39);
      \u0275\u0275element(85, "path", 40);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "linearGradient", 41);
      \u0275\u0275element(87, "stop", 42)(88, "stop", 43)(89, "stop", 44);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(90, "linearGradient", 45);
      \u0275\u0275element(91, "stop", 46)(92, "stop", 47)(93, "stop", 48)(94, "stop", 49)(95, "stop", 50);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(96, "filter", 51);
      \u0275\u0275element(97, "feTurbulence", 52)(98, "feDisplacementMap", 53);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "filter", 54);
      \u0275\u0275element(100, "feGaussianBlur", 55);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(101, "filter", 56);
      \u0275\u0275element(102, "feGaussianBlur", 57);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(103, "ellipse", 58);
      \u0275\u0275conditionalCreate(104, ReactionBenchComponent_Conditional_104_Template, 1, 1, ":svg:ellipse", 59);
      \u0275\u0275elementStart(105, "g", 60)(106, "g", 61);
      \u0275\u0275element(107, "rect", 62);
      \u0275\u0275conditionalCreate(108, ReactionBenchComponent_Conditional_108_Template, 2, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275element(109, "rect", 63);
      \u0275\u0275conditionalCreate(110, ReactionBenchComponent_Conditional_110_Template, 5, 12, ":svg:g", 64);
      \u0275\u0275conditionalCreate(111, ReactionBenchComponent_Conditional_111_Template, 3, 1, ":svg:g", 65);
      \u0275\u0275conditionalCreate(112, ReactionBenchComponent_Conditional_112_Template, 3, 0, ":svg:g", 66);
      \u0275\u0275conditionalCreate(113, ReactionBenchComponent_Conditional_113_Template, 3, 4);
      \u0275\u0275conditionalCreate(114, ReactionBenchComponent_Conditional_114_Template, 1, 0, ":svg:ellipse", 67);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(115, ReactionBenchComponent_Conditional_115_Template, 6, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(116, "div", 68)(117, "strong");
      \u0275\u0275text(118);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(119, "small");
      \u0275\u0275conditionalCreate(120, ReactionBenchComponent_Conditional_120_Template, 1, 0)(121, ReactionBenchComponent_Conditional_121_Template, 1, 0)(122, ReactionBenchComponent_Conditional_122_Template, 1, 1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(123, "div", 69)(124, "div", 70);
      \u0275\u0275element(125, "div", 71);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(126, "span", 72);
      \u0275\u0275text(127);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(128, "div", 73)(129, "button", 74);
      \u0275\u0275listener("click", function ReactionBenchComponent_Template_button_click_129_listener() {
        return ctx.nudgeVolume();
      });
      \u0275\u0275text(130, " +0.1 mL ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(131, "button", 74);
      \u0275\u0275listener("click", function ReactionBenchComponent_Template_button_click_131_listener() {
        return ctx.drainBeaker();
      });
      \u0275\u0275text(132, " Drain vessel ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(133, ReactionBenchComponent_Conditional_133_Template, 2, 2, "button", 9);
      \u0275\u0275conditionalCreate(134, ReactionBenchComponent_Conditional_134_Template, 2, 3, "button", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(135, "div", 75)(136, "div", 76);
      \u0275\u0275listener("dragover", function ReactionBenchComponent_Template_div_dragover_136_listener($event) {
        return ctx.allowDock($event);
      })("dragleave", function ReactionBenchComponent_Template_div_dragleave_136_listener() {
        return ctx.clearDockHover();
      })("drop", function ReactionBenchComponent_Template_div_drop_136_listener() {
        return ctx.dockVial();
      })("click", function ReactionBenchComponent_Template_div_click_136_listener() {
        return ctx.dockVial();
      });
      \u0275\u0275conditionalCreate(137, ReactionBenchComponent_Conditional_137_Template, 24, 16)(138, ReactionBenchComponent_Conditional_138_Template, 4, 0, "p", 77);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(139, "div", 78);
      \u0275\u0275conditionalCreate(140, ReactionBenchComponent_Conditional_140_Template, 1, 3, "img", 79);
      \u0275\u0275element(141, "div", 80);
      \u0275\u0275elementStart(142, "div", 81)(143, "output", 82);
      \u0275\u0275text(144);
      \u0275\u0275elementStart(145, "span");
      \u0275\u0275text(146, "g");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(147, "div", 83);
      \u0275\u0275element(148, "i");
      \u0275\u0275text(149);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(150, "button", 84);
      \u0275\u0275listener("click", function ReactionBenchComponent_Template_button_click_150_listener() {
        return ctx.toggleTip();
      });
      \u0275\u0275text(151);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(152, "div", 73)(153, "button", 74);
      \u0275\u0275listener("click", function ReactionBenchComponent_Template_button_click_153_listener() {
        return ctx.removePinch();
      });
      \u0275\u0275text(154, " \u22120.1 g ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(155, "button", 74);
      \u0275\u0275listener("click", function ReactionBenchComponent_Template_button_click_155_listener() {
        return ctx.emptyPan();
      });
      \u0275\u0275text(156, " Empty pan ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(157, ReactionBenchComponent_Conditional_157_Template, 2, 2, "button", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(158, "div", 85)(159, "p", 86);
      \u0275\u0275text(160);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(161, ReactionBenchComponent_Conditional_161_Template, 2, 2, "button", 87);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(162, "aside", 88)(163, "span", 5);
      \u0275\u0275text(164, "Your record");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(165, "h2");
      \u0275\u0275text(166);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(167, ReactionBenchComponent_Conditional_167_Template, 2, 0, "p", 89)(168, ReactionBenchComponent_Conditional_168_Template, 3, 2, "div", 90);
      \u0275\u0275conditionalCreate(169, ReactionBenchComponent_Conditional_169_Template, 10, 7);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_4_0;
      let tmp_21_0;
      let tmp_25_0;
      let tmp_31_0;
      let tmp_35_0;
      let tmp_63_0;
      let tmp_66_0;
      \u0275\u0275advance(3);
      \u0275\u0275classProp("has-record", ctx.step() === "complete");
      \u0275\u0275advance();
      \u0275\u0275property("hidden", !!ctx.selectedVialId());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.selectedVialId() ? "Your selected vial is loaded. Choose another above or drag one here to switch." : "Select a vial, then use Place on bench, or drag it onto the bench.", " ");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.vials);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_4_0 = ctx.heldVialId()) ? 14 : -1, tmp_4_0);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("done", ctx.volumeOk() && ctx.step() !== "fill")("active", ctx.step() === "fill");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.targetVolumeMl.toFixed(1), " mL");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("done", ctx.stages().length > 0)("active", ctx.step() === "weigh");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.targetMassG.toFixed(2), " g");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("done", ctx.stages().length > 0)("active", ctx.step() === "react");
      \u0275\u0275advance(5);
      \u0275\u0275classProp("done", ctx.step() === "complete")("active", ctx.step() === "indicator");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.requiredDrops, " drops");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.procedureLog().length > 0 ? 47 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.stepHint());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.step() === "react" ? 55 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("flowing", ctx.tapOpen());
      \u0275\u0275advance(3);
      \u0275\u0275classProp("has-plate", ctx.art.reservoir.src);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_21_0 = ctx.art.reservoir.src) ? 62 : -1, tmp_21_0);
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("height", ctx.tunLevelPercent(), "%");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("flowing", ctx.tapOpen())("has-plate", ctx.art.tube.src);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_25_0 = ctx.art.tube.src) ? 67 : -1, tmp_25_0);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("has-plate-body", ctx.art.valve.src)("open", ctx.tapOpen());
      \u0275\u0275property("disabled", ctx.step() !== "fill" || ctx.busy());
      \u0275\u0275attribute("aria-pressed", ctx.tapOpen())("aria-label", (ctx.tapOpen() ? "Close" : "Open") + " the solution valve. Currently " + (ctx.tapOpen() ? "open and flowing." : "closed."));
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_31_0 = ctx.art.valve.src) ? 71 : 72, tmp_31_0);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.tapOpen() ? "Open" : "Closed");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.tapOpen() ? 79 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("reacting", ctx.step() === "react");
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_35_0 = ctx.art.beaker.src) ? 81 : -1, tmp_35_0);
      \u0275\u0275advance();
      \u0275\u0275classProp("plain", !ctx.filters());
      \u0275\u0275advance(22);
      \u0275\u0275conditional(ctx.volumeMl() > 0 ? 104 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("filter", ctx.filters() && ctx.volumeMl() > 0 ? "url(#rb-refract)" : null);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.art.beaker.src ? 108 : -1);
      \u0275\u0275advance();
      \u0275\u0275attribute("x", ctx.wellX)("y", ctx.bandY())("width", ctx.wellW)("height", ctx.bandH());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.volumeMl() > 0 ? 110 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.bubbling() ? 111 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.transferring() ? 112 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.splashing() ? 113 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.dropFalling() ? 114 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.art.beaker.src ? 115 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("ok", ctx.volumeOk())("over", ctx.volumeOver());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.volumeMl().toFixed(2), " mL ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.volumeOk() ? 120 : ctx.volumeOver() ? 121 : 122);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.step() === "react" || ctx.stages().length > 0);
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", (ctx.temperature() - 15) / 15 * 100, "%");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.temperature().toFixed(1), " \xB0C ");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.step() !== "fill" || ctx.tapOpen() || ctx.busy());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.busy() || ctx.volumeMl() === 0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.step() === "fill" ? 133 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.step() === "indicator" ? 134 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("hovered", ctx.dockHover())("filled", ctx.activeVial() !== void 0);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_63_0 = ctx.activeVial()) ? 137 : 138, tmp_63_0);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("live", ctx.step() === "weigh")("has-plate", ctx.art.balance.src);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_66_0 = ctx.art.balance.src) ? 140 : -1, tmp_66_0);
      \u0275\u0275advance();
      \u0275\u0275classProp("tipping", ctx.transferring());
      \u0275\u0275advance(2);
      \u0275\u0275classProp("ok", ctx.massOk())("over", ctx.massOver());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.massG().toFixed(2), " ");
      \u0275\u0275advance(4);
      \u0275\u0275classProp("stable", ctx.scaleStable());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.scaleStable() ? "stable" : "measuring\u2026", " ");
      \u0275\u0275advance();
      \u0275\u0275classProp("open", ctx.tipping());
      \u0275\u0275property("disabled", ctx.step() !== "weigh" || ctx.busy());
      \u0275\u0275attribute("aria-pressed", ctx.tipping());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.tipping() ? "Stand the vial upright" : "Tip the vial over the pan", " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.step() !== "weigh" || ctx.tipping() || ctx.busy() || ctx.massG() === 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.busy() || ctx.massG() === 0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.step() === "weigh" ? 157 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.stepHint());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.vialId() ? 161 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("hidden", !(ctx.step() === "complete"));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.preview ? "Reaction readings" : "What did you see?");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.stages().length === 0 ? 167 : 168);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.step() === "complete" ? 169 : -1);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ['\n[_nghost-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: block;\n}\nbutton[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  color: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #88e4df;\n  outline-offset: 2px;\n}\n.bench-canvas[_ngcontent-%COMP%], \n.bench-scene[_ngcontent-%COMP%], \n.bench-shade[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.bench-canvas[_ngcontent-%COMP%] {\n  overflow: auto;\n  color: #ebf7fc;\n  background: #04101a;\n}\n.bench-scene[_ngcontent-%COMP%] {\n  z-index: 0;\n  background: url(/week3-test-scenes-v2.webp) left center/200% 100% no-repeat;\n  background-color: #04101a;\n  filter: saturate(0.85) contrast(1.03) brightness(0.38);\n}\n.bench-shade[_ngcontent-%COMP%] {\n  z-index: 1;\n  background:\n    radial-gradient(\n      circle at 50% 34%,\n      rgba(96, 197, 205, 0.12),\n      transparent 58%),\n    linear-gradient(\n      180deg,\n      rgba(3, 12, 19, 0.74),\n      rgba(3, 12, 19, 0.94));\n}\n.bench-grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: grid;\n  min-height: 100%;\n  align-items: start;\n  gap: 0.85rem;\n  grid-template-columns: minmax(12.5rem, 0.8fr) minmax(0, 2.1fr) minmax(13rem, 0.95fr);\n  padding: 0.9rem;\n}\n.kicker[_ngcontent-%COMP%] {\n  color: #79d8d5;\n  font-size: 0.6rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #f3fbfd;\n  font-size: clamp(1.05rem, 1.9vw, 1.35rem);\n  font-weight: 850;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0.1rem 0 0;\n  color: #eef8fa;\n  font-size: 0.95rem;\n  font-weight: 850;\n}\n.tray[_ngcontent-%COMP%], \n.record[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 0.5rem;\n  border: 1px solid #2b4d5f;\n  border-radius: 0.7rem;\n  padding: 0.8rem;\n  background: rgba(6, 21, 31, 0.9);\n}\n.record-note[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #8aa8b5;\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.vial-tray[_ngcontent-%COMP%], \n.protocol[_ngcontent-%COMP%], \n.run-log[_ngcontent-%COMP%] {\n  display: grid;\n  margin: 0;\n  padding: 0;\n  gap: 0.4rem;\n  list-style: none;\n}\n.vial-chip[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  width: 100%;\n  align-items: center;\n  gap: 0 0.55rem;\n  grid-template-columns: 2.4rem 1fr;\n  border: 1px solid #2d5162;\n  border-radius: 0.55rem;\n  padding: 0.4rem;\n  text-align: left;\n  background: rgba(11, 33, 45, 0.92);\n  cursor: pointer;\n  transition: border-color 0.15s ease, transform 0.15s ease;\n}\n.vial-chip[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #4f97a2;\n  transform: translateX(2px);\n}\n.vial-chip[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.vial-chip.active[_ngcontent-%COMP%] {\n  border-color: #7fe3dd;\n  background: rgba(20, 69, 79, 0.95);\n  box-shadow: inset 0 0 0 1px #7fe3dd;\n}\n.vial-chip[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 2.4rem;\n  height: 2.4rem;\n  border: 1px solid var(--%NS%vial-color, #4d7f8c);\n  border-radius: 0.4rem;\n  grid-row: span 2;\n  object-fit: cover;\n}\n.vial-chip__code[_ngcontent-%COMP%] {\n  color: #f2fdfd;\n  font-size: 0.82rem;\n  font-weight: 900;\n}\n.vial-chip__cue[_ngcontent-%COMP%] {\n  color: #8fb0bd;\n  font-size: 0.6rem;\n  line-height: 1.25;\n}\n.vial-chip__done[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.3rem;\n  right: 0.35rem;\n  display: grid;\n  width: 1rem;\n  height: 1rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #08222b;\n  background: #7fe3dd;\n  font-size: 0.6rem;\n  font-weight: 900;\n}\n.protocol[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.45rem;\n  color: #8aa8b5;\n  font-size: 0.66rem;\n  line-height: 1.35;\n}\n.protocol[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  display: grid;\n  width: 1.2rem;\n  height: 1.2rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #34606f;\n  border-radius: 50%;\n  font-size: 0.58rem;\n  font-weight: 900;\n}\n.protocol[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #cfe6ee;\n}\n.protocol[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%] {\n  color: #e6f4f7;\n}\n.protocol[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  border-color: #7fe3dd;\n  color: #7fe3dd;\n}\n.protocol[_ngcontent-%COMP%]   li.done[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  color: #08222b;\n  border-color: #7fe3dd;\n  background: #7fe3dd;\n}\n.rig[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 0.75rem;\n  border: 1px solid #2f5972;\n  border-radius: 0.8rem;\n  padding: 0.9rem;\n  background: rgba(5, 19, 28, 0.74);\n}\n.rig-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.8rem;\n}\n.rig-clock[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: end;\n  border: 1px solid #2f6570;\n  border-radius: 0.5rem;\n  padding: 0.3rem 0.6rem;\n  background: #061c26;\n}\n.rig-clock[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7f9ead;\n  font-size: 0.53rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.rig-clock[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #7fe3dd;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    "Cascadia Mono",\n    monospace;\n  font-size: 1.25rem;\n  line-height: 1;\n}\n.rig-clock[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n}\n.apparatus[_ngcontent-%COMP%] {\n  display: grid;\n  align-items: start;\n  gap: 1rem;\n  grid-template-columns: minmax(11rem, 1.15fr) minmax(10rem, 1fr);\n}\n.plumbing[_ngcontent-%COMP%], \n.balance-bay[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  gap: 0.4rem;\n}\n.tun[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n}\n.tun-label[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n  color: #9fc0cc;\n  font-size: 0.55rem;\n  font-weight: 850;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.tun-body[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  width: 7.5rem;\n  height: 3.4rem;\n  align-items: flex-end;\n  overflow: hidden;\n  border: 2px solid #9fd2e0;\n  border-radius: 0.4rem 0.4rem 0.9rem 0.9rem;\n  background: rgba(10, 34, 45, 0.75);\n}\n.tun-liquid[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(206, 236, 243, 0.78),\n      rgba(150, 205, 222, 0.62));\n  transition: height 0.25s ease-out;\n}\n.tun-surface[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -1px;\n  right: 0;\n  left: 0;\n  height: 2px;\n  background: rgba(236, 251, 255, 0.9);\n}\n.tun.flowing[_ngcontent-%COMP%]   .tun-surface[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_surface-chop 0.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_surface-chop {\n  0%, 100% {\n    transform: scaleY(1);\n  }\n  50% {\n    transform: scaleY(2.2);\n  }\n}\n.feed-tube[_ngcontent-%COMP%] {\n  position: relative;\n  width: 0.85rem;\n  height: 1.9rem;\n  overflow: hidden;\n  border-radius: 0 0 0.1rem 0.1rem;\n}\n.tube-wall[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  border-right: 1px solid #7ba7b6;\n  border-left: 1px solid #7ba7b6;\n  border-radius: inherit;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(120, 160, 172, 0.5),\n      rgba(206, 236, 243, 0.28) 40%,\n      rgba(120, 160, 172, 0.5));\n}\n.tube-flow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0.12rem 0.22rem;\n  border-radius: 0.1rem;\n  opacity: 0;\n  background:\n    repeating-linear-gradient(\n      180deg,\n      rgba(236, 251, 255, 0.95) 0 0.2rem,\n      rgba(150, 205, 222, 0.55) 0.2rem 0.4rem);\n  background-size: 100% 0.4rem;\n  transition: opacity 0.18s ease;\n}\n.feed-tube.flowing[_ngcontent-%COMP%]   .tube-flow[_ngcontent-%COMP%] {\n  opacity: 1;\n  animation: _ngcontent-%COMP%_flow 0.34s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_flow {\n  to {\n    background-position-y: 0.4rem;\n  }\n}\n.valve[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  justify-items: center;\n  padding: 0.15rem 0.4rem 0.2rem;\n  border: 0;\n  border-radius: 0.5rem;\n  background: transparent;\n  cursor: pointer;\n}\n.valve[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n.valve[_ngcontent-%COMP%]:not(:disabled):hover   .valve-handle[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0.5rem rgba(127, 227, 221, 0.55);\n}\n.valve-housing[_ngcontent-%COMP%] {\n  width: 2.1rem;\n  height: 1.15rem;\n  border: 1.5px solid #9fd2e0;\n  border-radius: 0.25rem;\n  background:\n    linear-gradient(\n      180deg,\n      #4a6f7d,\n      #2c4b57);\n}\n.valve-handle[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.35rem;\n  display: grid;\n  width: 2.9rem;\n  height: 0.46rem;\n  place-items: center;\n  border-radius: 0.24rem;\n  background:\n    linear-gradient(\n      180deg,\n      #cfe6ee,\n      #7fa6b3);\n  transition: transform 0.4s cubic-bezier(0.34, 1.45, 0.5, 1), background 0.25s ease;\n  transform: rotate(0deg);\n}\n.valve-handle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.62rem;\n  height: 0.62rem;\n  border: 1.5px solid #3f6675;\n  border-radius: 50%;\n  background: #eaf7fb;\n}\n.valve.open[_ngcontent-%COMP%]   .valve-handle[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      #a6f2ea,\n      #3fa9b0);\n  transform: rotate(90deg);\n}\n.valve-caption[_ngcontent-%COMP%] {\n  margin-top: 0.3rem;\n  color: #8fb0bd;\n  font-size: 0.55rem;\n  font-weight: 850;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.valve.open[_ngcontent-%COMP%]   .valve-caption[_ngcontent-%COMP%] {\n  color: #7fe3dd;\n}\n.spout[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  height: 1.7rem;\n  justify-items: center;\n}\n.spout-neck[_ngcontent-%COMP%] {\n  width: 0.5rem;\n  height: 0.75rem;\n  border-radius: 0 0 0.16rem 0.16rem;\n  background:\n    linear-gradient(\n      90deg,\n      #6f95a2,\n      #a8ccd6 45%,\n      #6f95a2);\n}\n.pour-stream[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.7rem;\n  display: grid;\n  justify-items: center;\n}\n.stream-body[_ngcontent-%COMP%] {\n  width: 0.26rem;\n  height: 1.1rem;\n  border-radius: 0.15rem;\n  background:\n    repeating-linear-gradient(\n      180deg,\n      rgba(236, 251, 255, 0.95) 0 0.18rem,\n      rgba(176, 220, 235, 0.6) 0.18rem 0.36rem);\n  background-size: 100% 0.36rem;\n  animation: _ngcontent-%COMP%_flow 0.32s linear infinite;\n}\n.stream-bead[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.55rem;\n  width: 0.3rem;\n  height: 0.38rem;\n  border-radius: 50% 50% 50% 50%/60% 60% 40% 40%;\n  background: rgba(236, 251, 255, 0.95);\n  animation: _ngcontent-%COMP%_bead-fall 0.48s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_bead-fall {\n  0% {\n    opacity: 0;\n    transform: translateY(0) scaleY(0.8);\n  }\n  25% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.15;\n    transform: translateY(0.7rem) scaleY(1.35);\n  }\n}\n.line-controls[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  gap: 0.3rem;\n}\n.line-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 1px solid #2d5162;\n  border-radius: 0.4rem;\n  padding: 0.35rem 0.2rem;\n  color: #a9c6d1;\n  background: rgba(11, 33, 45, 0.9);\n  font-size: 0.62rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.line-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.35;\n}\n.vial-dock[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  width: 100%;\n  min-height: 7.2rem;\n  place-items: end center;\n  border: 1px dashed #3a6b7c;\n  border-radius: 0.6rem;\n  padding-bottom: 0.35rem;\n  background: rgba(8, 27, 37, 0.55);\n  transition: border-color 0.15s ease, background 0.15s ease;\n}\n.vial-dock.hovered[_ngcontent-%COMP%] {\n  border-color: #7fe3dd;\n  background: rgba(20, 69, 79, 0.75);\n}\n.vial-dock.filled[_ngcontent-%COMP%] {\n  border-style: solid;\n  border-color: #356171;\n}\n.dock-empty[_ngcontent-%COMP%] {\n  display: grid;\n  margin: 0;\n  align-self: center;\n  justify-items: center;\n  gap: 0.25rem;\n  color: #7f9ead;\n  font-size: 0.66rem;\n  font-weight: 700;\n}\n.dock-empty[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n}\n.lab-vial[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.4rem;\n  transform-origin: 50% 92%;\n  transition: transform 0.55s cubic-bezier(0.34, 1.25, 0.5, 1);\n  transform: rotate(0deg);\n}\n.lab-vial[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n}\n.lab-vial.tipping[_ngcontent-%COMP%] {\n  transform: rotate(118deg) translateY(-0.6rem);\n}\n.rbv-cap[_ngcontent-%COMP%] {\n  fill: #9fc3d0;\n  stroke: #d7ebf2;\n  stroke-width: 1;\n}\n.rbv-neck[_ngcontent-%COMP%] {\n  fill: rgba(206, 236, 243, 0.3);\n}\n.rbv-glass[_ngcontent-%COMP%] {\n  stroke: none;\n}\n.rbv-edge[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: rgba(214, 242, 250, 0.85);\n  stroke-width: 1.4;\n}\n.rbv-powder[_ngcontent-%COMP%] {\n  opacity: 0.94;\n}\n.rbv-powder-top[_ngcontent-%COMP%] {\n  fill: rgba(255, 255, 255, 0.22);\n}\n.rbv-label[_ngcontent-%COMP%] {\n  fill: rgba(232, 245, 249, 0.94);\n}\n.rbv-code[_ngcontent-%COMP%] {\n  fill: #10333f;\n  font-size: 9px;\n  font-weight: 900;\n  text-anchor: middle;\n}\n.rbv-shine[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.6);\n  stroke-linecap: round;\n  stroke-width: 2.2;\n}\n.vial-pour[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 3.1rem;\n  left: 52%;\n}\n.vial-pour[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  width: var(--%NS%grain-size, 3px);\n  height: var(--%NS%grain-size, 3px);\n  border-radius: 22%;\n  opacity: 0;\n  animation: _ngcontent-%COMP%_vial-grain 0.66s cubic-bezier(0.45, 0, 0.85, 0.6) infinite;\n}\n.vial-pour[_ngcontent-%COMP%]   i.sparkle[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0.22rem rgba(255, 255, 255, 0.9);\n}\n.vial-pour[_ngcontent-%COMP%]   i.clump[_ngcontent-%COMP%] {\n  border-radius: 45%;\n  filter: blur(0.3px);\n}\n@keyframes _ngcontent-%COMP%_vial-grain {\n  0% {\n    opacity: 0;\n    transform: translate(0, 0) rotate(0deg);\n  }\n  15% {\n    opacity: 1;\n  }\n  85% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate(var(--%NS%grain-x, 0), 3.4rem) rotate(var(--%NS%spin, 180deg));\n  }\n}\n.pour-dust[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.6rem;\n  left: -0.9rem;\n  width: 1.9rem;\n  height: 2.6rem;\n  border-radius: 50%;\n  filter: blur(4px);\n  animation: _ngcontent-%COMP%_pour-dust 1.1s ease-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pour-dust {\n  0% {\n    opacity: 0;\n    transform: translateY(0) scale(0.5);\n  }\n  40% {\n    opacity: inherit;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(1.6rem) scale(1.3);\n  }\n}\n.tip-control[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #33697a;\n  border-radius: 0.5rem;\n  padding: 0.5rem 0.4rem;\n  color: #bdeae7;\n  background: #0d3241;\n  font-size: 0.7rem;\n  font-weight: 850;\n  cursor: pointer;\n}\n.tip-control.open[_ngcontent-%COMP%] {\n  border-color: #7fe3dd;\n  color: #04212a;\n  background: #7fe3dd;\n}\n.tip-control[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.4;\n}\n.beaker[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  width: 100%;\n  max-width: 9rem;\n  justify-items: center;\n}\n.beaker-plate[_ngcontent-%COMP%], \n.beaker-svg[_ngcontent-%COMP%] {\n  grid-area: 1/1;\n  width: 100%;\n  height: auto;\n}\n.beaker-plate[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n.rb-glass[_ngcontent-%COMP%] {\n  stroke: none;\n}\n.rb-glass-edge[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #bfe4f0;\n  stroke-width: 2.2;\n  opacity: 0.9;\n}\n.beaker.reacting[_ngcontent-%COMP%]   .rb-glass-edge[_ngcontent-%COMP%] {\n  stroke: #8ff0e8;\n}\n.rb-base[_ngcontent-%COMP%] {\n  fill: rgba(150, 205, 222, 0.28);\n  stroke: rgba(226, 246, 252, 0.55);\n  stroke-width: 1;\n}\n.rb-highlight[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.72);\n  stroke-linecap: round;\n  stroke-width: 5;\n}\n.rb-rimlight[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: rgba(214, 242, 250, 0.5);\n  stroke-linecap: round;\n  stroke-width: 1.6;\n}\n.rb-stopper[_ngcontent-%COMP%] {\n  fill: #46697a;\n  stroke: #bfe4f0;\n  stroke-width: 1.5;\n}\n.rb-stopper-top[_ngcontent-%COMP%] {\n  fill: rgba(226, 246, 252, 0.42);\n}\n.rb-shadow[_ngcontent-%COMP%] {\n  fill: rgba(2, 10, 16, 0.75);\n}\n.rb-caustic[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  mix-blend-mode: screen;\n}\n.rb-behind[_ngcontent-%COMP%] {\n  transition: filter 0.2s ease;\n}\n.rb-grad[_ngcontent-%COMP%]   line[_ngcontent-%COMP%] {\n  stroke: rgba(198, 226, 236, 0.5);\n  stroke-width: 1;\n}\n.rb-grad[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  fill: rgba(198, 226, 236, 0.62);\n  font-size: 7px;\n  font-weight: 700;\n  text-anchor: end;\n}\n.rb-band[_ngcontent-%COMP%] {\n  fill: rgba(240, 201, 106, 0.16);\n  stroke: rgba(240, 201, 106, 0.85);\n  stroke-dasharray: 4 3;\n  stroke-width: 1;\n}\n.rb-liquid-body[_ngcontent-%COMP%], \n.rb-meniscus[_ngcontent-%COMP%] {\n  transition: fill 2.4s ease-in-out;\n}\n.rb-meniscus[_ngcontent-%COMP%] {\n  opacity: 0.92;\n}\n.rb-meniscus-rim[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.6);\n  stroke-width: 1.1;\n}\n.rb-bubbles[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: rgba(244, 253, 255, 0.9);\n  animation: _ngcontent-%COMP%_rb-rise 1.7s cubic-bezier(0.4, 0, 0.7, 1) infinite;\n}\n@keyframes _ngcontent-%COMP%_rb-rise {\n  0% {\n    opacity: 0;\n    transform: translate(0, 0) scale(0.5);\n  }\n  16% {\n    opacity: 0.95;\n  }\n  55% {\n    transform: translate(2px, -46px) scale(1.05);\n  }\n  100% {\n    opacity: 0;\n    transform: translate(-2px, -96px) scale(1.3);\n  }\n}\n.rb-fall[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%] {\n  opacity: 0;\n  animation: _ngcontent-%COMP%_rb-grain 0.78s cubic-bezier(0.45, 0, 0.85, 0.6) infinite;\n}\n@keyframes _ngcontent-%COMP%_rb-grain {\n  0% {\n    opacity: 0;\n    transform: translateY(0) rotate(0deg);\n  }\n  14% {\n    opacity: 1;\n  }\n  88% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(118px) rotate(var(--%NS%spin, 180deg));\n  }\n}\n.rb-puff[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  animation: _ngcontent-%COMP%_rb-puff 0.66s ease-out forwards;\n}\n@keyframes _ngcontent-%COMP%_rb-puff {\n  0% {\n    opacity: 0.6;\n    transform: scale(0.3);\n    transform-origin: center;\n  }\n  100% {\n    opacity: 0;\n    transform: scale(1.35);\n    transform-origin: center;\n  }\n}\n.rb-ring[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: rgba(244, 253, 255, 0.85);\n  stroke-width: 1.4;\n  animation: _ngcontent-%COMP%_rb-ring 0.66s ease-out forwards;\n}\n.rb-ring--late[_ngcontent-%COMP%] {\n  animation-delay: 0.16s;\n}\n@keyframes _ngcontent-%COMP%_rb-ring {\n  0% {\n    opacity: 0.95;\n    transform: scale(0.3);\n    transform-origin: center;\n  }\n  100% {\n    opacity: 0;\n    transform: scale(2.8);\n    transform-origin: center;\n  }\n}\n.rb-drop[_ngcontent-%COMP%] {\n  fill: #c8891f;\n  animation: _ngcontent-%COMP%_rb-drop 0.42s cubic-bezier(0.5, 0, 0.9, 0.6) forwards;\n}\n@keyframes _ngcontent-%COMP%_rb-drop {\n  0% {\n    opacity: 0;\n    transform: translateY(0) scaleY(0.8);\n  }\n  18% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.9;\n    transform: translateY(104px) scaleY(1.5);\n  }\n}\n.volume-readout[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: center;\n  gap: 0.35rem;\n  margin-top: 0.35rem;\n}\n.volume-readout[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dcecf1;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    "Cascadia Mono",\n    monospace;\n  font-size: 0.95rem;\n  font-weight: 800;\n}\n.volume-readout[_ngcontent-%COMP%]   strong.ok[_ngcontent-%COMP%] {\n  color: #7fe3dd;\n}\n.volume-readout[_ngcontent-%COMP%]   strong.over[_ngcontent-%COMP%] {\n  color: #f08a6a;\n}\n.volume-readout[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7f9ead;\n  font-size: 0.58rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.thermometer[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  gap: 0.45rem;\n  opacity: 0.5;\n  transition: opacity 0.2s ease;\n}\n.thermometer.active[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.thermometer__track[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  height: 0.45rem;\n  flex: 1;\n  overflow: hidden;\n  border: 1px solid #356171;\n  border-radius: 0.3rem;\n  background: #061c26;\n}\n.thermometer__column[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 0.25rem;\n  background:\n    linear-gradient(\n      90deg,\n      #4aa3d8,\n      #f0a35a);\n  transition: width 0.12s linear;\n}\n.thermometer__read[_ngcontent-%COMP%] {\n  color: #cfe4ea;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    "Cascadia Mono",\n    monospace;\n  font-size: 0.72rem;\n  font-weight: 700;\n}\n.scale[_ngcontent-%COMP%] {\n  display: grid;\n  width: 100%;\n  justify-items: center;\n}\n.scale-pan[_ngcontent-%COMP%] {\n  position: relative;\n  width: 6.5rem;\n  height: 0.55rem;\n  border-radius: 0.15rem;\n  background:\n    linear-gradient(\n      180deg,\n      #cfe6ee,\n      #7fa6b3);\n  transform-origin: right bottom;\n  transition: transform 0.35s ease-in;\n}\n.scale-pan.tipping[_ngcontent-%COMP%] {\n  transform: rotate(-32deg);\n}\n.scale-body[_ngcontent-%COMP%] {\n  display: grid;\n  width: 100%;\n  justify-items: center;\n  gap: 0.15rem;\n  border: 1px solid #33697a;\n  border-radius: 0 0 0.5rem 0.5rem;\n  padding: 0.5rem 0.4rem;\n  background: #0a2531;\n}\n.scale-readout[_ngcontent-%COMP%] {\n  color: #cfe4ea;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    "Cascadia Mono",\n    monospace;\n  font-size: 1.5rem;\n  font-weight: 800;\n  letter-spacing: 0.02em;\n  line-height: 1;\n}\n.scale-readout[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.scale-readout.ok[_ngcontent-%COMP%] {\n  color: #7fe3dd;\n}\n.scale-readout.over[_ngcontent-%COMP%] {\n  color: #f08a6a;\n}\n.scale-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.3rem;\n  color: #7f9ead;\n  font-size: 0.58rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.scale-status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.4rem;\n  height: 0.4rem;\n  border-radius: 50%;\n  background: #e0b64a;\n}\n.scale-status[_ngcontent-%COMP%]   i.stable[_ngcontent-%COMP%] {\n  background: #62c9a4;\n}\n.rig-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.7rem;\n}\n.rig-hint[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #9dbcc8;\n  font-size: 0.72rem;\n}\n.primary-action[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  border-radius: 0.5rem;\n  padding: 0.55rem 0.8rem;\n  color: #04212a;\n  background:\n    linear-gradient(\n      135deg,\n      #a0f1e8,\n      #5dc9d0);\n  font-size: 0.74rem;\n  font-weight: 850;\n  cursor: pointer;\n}\n.primary-action[_ngcontent-%COMP%]:disabled {\n  color: #7f9ead;\n  background: #16323f;\n  cursor: not-allowed;\n}\n.ghost-action[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  border: 1px solid #33697a;\n  border-radius: 0.5rem;\n  padding: 0.45rem 0.7rem;\n  color: #bdeae7;\n  background: transparent;\n  font-size: 0.68rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.ghost-action[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n.readout-stack[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n}\n.readout-stack[_ngcontent-%COMP%]   section[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.2rem;\n  border: 1px solid #2d5162;\n  border-radius: 0.5rem;\n  padding: 0.45rem 0.55rem;\n  background: rgba(11, 33, 45, 0.85);\n}\n.readout-stack[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  color: #7fd6d2;\n  font-size: 0.58rem;\n  font-weight: 850;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.readout-stack[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.readout-stack[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7c9aa8;\n  font-size: 0.58rem;\n  font-weight: 700;\n}\n.readout-stack[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dcecf1;\n  font-size: 0.66rem;\n  font-weight: 700;\n  text-align: right;\n}\n.protocol-card[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.15rem;\n  border: 1px solid #4f9d92;\n  border-radius: 0.5rem;\n  padding: 0.5rem 0.6rem;\n  background: rgba(16, 54, 56, 0.55);\n}\n.protocol-card.off[_ngcontent-%COMP%] {\n  border-color: #b0703c;\n  background: rgba(64, 40, 20, 0.5);\n}\n.protocol-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #a9c6d1;\n  font-size: 0.6rem;\n  line-height: 1.35;\n}\n.protocol-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #eef8fa;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    "Cascadia Mono",\n    monospace;\n  font-size: 0.78rem;\n}\n.observation-field[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n  color: #a9c6d1;\n  font-size: 0.62rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.observation-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border: 1px solid #2f5566;\n  border-radius: 0.5rem;\n  padding: 0.5rem;\n  color: #eaf6f9;\n  background: #071c27;\n  font-size: 0.74rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  resize: vertical;\n  text-transform: none;\n}\n.run-log[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.45rem;\n  border-left: 2px solid #2f6570;\n  padding: 0.15rem 0 0.15rem 0.5rem;\n}\n.run-log[_ngcontent-%COMP%]   li.off-protocol[_ngcontent-%COMP%] {\n  border-left-color: #b0703c;\n}\n.run-log[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  display: grid;\n  gap: 0.05rem;\n}\n.run-log__index[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.2rem;\n  height: 1.2rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border-radius: 50%;\n  color: #08222b;\n  background: #7fe3dd;\n  font-size: 0.58rem;\n  font-weight: 900;\n}\n.run-log[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e4f2f6;\n  font-size: 0.66rem;\n  font-weight: 800;\n  line-height: 1.3;\n}\n.run-log[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #8aa8b5;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    "Cascadia Mono",\n    monospace;\n  font-size: 0.58rem;\n}\n@container (max-width: 1180px) {\n  .bench-grid[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(11rem, 0.8fr) minmax(0, 2fr);\n  }\n  .record[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n  }\n}\n@container (max-width: 820px) {\n  .bench-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .record[_ngcontent-%COMP%] {\n    grid-column: auto;\n  }\n  .apparatus[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .plumbing[_ngcontent-%COMP%], \n   .balance-bay[_ngcontent-%COMP%] {\n    width: min(100%, 18rem);\n    justify-self: center;\n  }\n}\n.beaker-svg.plain[_ngcontent-%COMP%]   .rb-highlight[_ngcontent-%COMP%] {\n  filter: none;\n}\n.beaker-svg.plain[_ngcontent-%COMP%]   .rb-shadow[_ngcontent-%COMP%], \n.beaker-svg.plain[_ngcontent-%COMP%]   .rb-caustic[_ngcontent-%COMP%], \n.beaker-svg.plain[_ngcontent-%COMP%]   .rb-puff[_ngcontent-%COMP%] {\n  filter: none;\n  opacity: 0.35;\n}\n@media (prefers-reduced-motion: reduce) {\n  .rb-bubbles[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%], \n   .rb-fall[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%], \n   .stream-body[_ngcontent-%COMP%], \n   .stream-bead[_ngcontent-%COMP%], \n   .tube-flow[_ngcontent-%COMP%], \n   .liquid-surface.agitated[_ngcontent-%COMP%], \n   .tun.flowing[_ngcontent-%COMP%]   .tun-surface[_ngcontent-%COMP%], \n   .vial-pour[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n   .pour-dust[_ngcontent-%COMP%], \n   .rb-ring[_ngcontent-%COMP%], \n   .rb-puff[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  .rb-fall[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%], \n   .vial-pour[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    opacity: 1;\n  }\n  .rb-drop[_ngcontent-%COMP%] {\n    animation-duration: 0.001ms;\n  }\n  .rb-liquid-body[_ngcontent-%COMP%], \n   .rb-meniscus[_ngcontent-%COMP%], \n   .thermometer__column[_ngcontent-%COMP%], \n   .valve-handle[_ngcontent-%COMP%], \n   .lab-vial[_ngcontent-%COMP%], \n   .scale-pan[_ngcontent-%COMP%], \n   .tun-liquid[_ngcontent-%COMP%] {\n    transition-duration: 0.001ms;\n  }\n}\n.part-plate[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  pointer-events: none;\n}\n.part-plate--tile[_ngcontent-%COMP%] {\n  height: auto;\n  object-fit: fill;\n}\n.tun-body.has-plate[_ngcontent-%COMP%] {\n  border: 0;\n  background: none;\n}\n.tun-well[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1;\n  display: flex;\n  align-items: flex-end;\n  inset: 4% 3% 4% 3%;\n}\n.tun-body.has-plate[_ngcontent-%COMP%]   .tun-well[_ngcontent-%COMP%] {\n  inset: 19.5% 13.4% 29.1% 13.3%;\n}\n.tun-liquid[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.feed-tube.has-plate[_ngcontent-%COMP%]   .tube-wall[_ngcontent-%COMP%] {\n  display: none;\n}\n.feed-tube.has-plate[_ngcontent-%COMP%]   .tube-flow[_ngcontent-%COMP%] {\n  z-index: 1;\n}\n.valve-plate[_ngcontent-%COMP%] {\n  position: relative;\n  width: 2.1rem;\n  height: 1.15rem;\n  inset: auto;\n}\n.scale.has-plate[_ngcontent-%COMP%] {\n  position: relative;\n}\n.scale.has-plate[_ngcontent-%COMP%]   .scale-body[_ngcontent-%COMP%] {\n  border: 0;\n  background: none;\n}\n.scale.has-plate[_ngcontent-%COMP%]   .scale-pan[_ngcontent-%COMP%], \n.scale.has-plate[_ngcontent-%COMP%]   .scale-body[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n.lab-vial.has-plate[_ngcontent-%COMP%] {\n  position: relative;\n}\n.lab-vial.has-plate[_ngcontent-%COMP%]   .rbv-cap[_ngcontent-%COMP%], \n.lab-vial.has-plate[_ngcontent-%COMP%]   .rbv-neck[_ngcontent-%COMP%], \n.lab-vial.has-plate[_ngcontent-%COMP%]   .rbv-glass[_ngcontent-%COMP%], \n.lab-vial.has-plate[_ngcontent-%COMP%]   .rbv-edge[_ngcontent-%COMP%], \n.lab-vial.has-plate[_ngcontent-%COMP%]   .rbv-shine[_ngcontent-%COMP%] {\n  display: none;\n}\n.lab-vial.has-plate[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n.valve.has-plate-body[_ngcontent-%COMP%]   .valve-handle[_ngcontent-%COMP%], \n.valve[_ngcontent-%COMP%]:has(.valve-plate)   .valve-handle[_ngcontent-%COMP%] {\n  top: 4%;\n}\n.valve-plate[_ngcontent-%COMP%] {\n  display: block;\n}\n.scale.has-plate[_ngcontent-%COMP%] {\n  display: grid;\n  width: 100%;\n  aspect-ratio: 1.777;\n}\n.scale.has-plate[_ngcontent-%COMP%]   .part-plate[_ngcontent-%COMP%] {\n  grid-area: 1/1;\n}\n.scale.has-plate[_ngcontent-%COMP%]   .scale-pan[_ngcontent-%COMP%] {\n  grid-area: 1/1;\n  align-self: start;\n  justify-self: center;\n  width: 52%;\n  margin-top: 6%;\n  opacity: 0;\n}\n.scale.has-plate[_ngcontent-%COMP%]   .scale-body[_ngcontent-%COMP%] {\n  grid-area: 1/1;\n  align-self: center;\n  justify-self: center;\n  width: 46%;\n  margin-top: 12%;\n  padding: 0;\n}\n.scale.has-plate[_ngcontent-%COMP%]   .scale-readout[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n}\n.scale.has-plate[_ngcontent-%COMP%]   .scale-status[_ngcontent-%COMP%] {\n  font-size: 0.5rem;\n}\n.lab-vial.has-plate[_ngcontent-%COMP%] {\n  width: 2.6rem;\n}\n[_nghost-%COMP%] {\n  container-type: inline-size;\n}\n.workbench-station[_nghost-%COMP%] {\n  position: relative;\n  inset: auto;\n}\n.workbench-station[_nghost-%COMP%]   .bench-canvas[_ngcontent-%COMP%] {\n  position: relative;\n  inset: auto;\n  min-height: 34rem;\n  overflow: visible;\n}\n.workbench-station[_nghost-%COMP%]   .bench-canvas[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n}\n.bench-grid[_ngcontent-%COMP%] {\n  padding-top: 80px;\n  grid-template-columns: minmax(0, 1fr);\n  max-width: 1160px;\n  margin: auto;\n}\n.bench-grid.has-record[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 1fr);\n}\n.tray[hidden][_ngcontent-%COMP%], \n.record[hidden][_ngcontent-%COMP%], \n.kicker[_ngcontent-%COMP%], \n.rig-hint[_ngcontent-%COMP%] {\n  display: none;\n}\n.rig-head[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  max-width: 35ch;\n  font-size: clamp(20px, 2.3vw, 29px);\n  line-height: 1.25;\n}\n.record[_ngcontent-%COMP%] {\n  grid-column: auto;\n}\n.protocol[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(.active) {\n  display: none;\n}\n@container (max-width: 700px) {\n  .bench-grid[_ngcontent-%COMP%] {\n    padding-top: 120px;\n  }\n  .bench-grid.has-record[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.lab-preview[_nghost-%COMP%] {\n  position: relative;\n  inset: auto;\n  display: block;\n  container-type: inline-size;\n}\n.lab-preview[_nghost-%COMP%]   .lab-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bay-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .station-canvas[_ngcontent-%COMP%] {\n  position: relative;\n  inset: auto;\n  min-height: 0;\n  overflow: visible;\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%] {\n  padding: 14px;\n  min-height: 0;\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n  gap: 12px;\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%] {\n  display: block;\n}\n.lab-preview[_nghost-%COMP%]   .record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .console[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.lab-preview[_nghost-%COMP%]   .record[hidden][_ngcontent-%COMP%] {\n  display: none;\n}\n.lab-preview[_nghost-%COMP%]   .stage[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rig[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .console[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.lab-preview[_nghost-%COMP%]   .kicker[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .instrument-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .trial-log[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .procedure-log[_ngcontent-%COMP%] {\n  display: block;\n}\n.lab-preview[_nghost-%COMP%]   .trial-log[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .procedure-log[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow: auto;\n}\n.lab-preview[_nghost-%COMP%]   .instrument-well[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .chamber-well[_ngcontent-%COMP%] {\n  min-height: 230px;\n}\n.lab-preview[_nghost-%COMP%]   .instrument-well[_ngcontent-%COMP%] {\n  height: 245px;\n}\n.lab-preview[_nghost-%COMP%]   .stage-controls[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%] {\n  width: auto;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  flex-basis: 100%;\n  margin: 0;\n}\n.lab-preview[_nghost-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.lab-preview[_nghost-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.lab-preview[_nghost-%COMP%]   button[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 44px;\n  font-size: 0.87rem;\n}\n.lab-preview[_nghost-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .record-note[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .stage-hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rig-hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout-stack[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout-stack[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rack-note[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.lab-preview[_nghost-%COMP%]   input[type=range][_ngcontent-%COMP%] {\n  min-height: 32px;\n}\n.lab-preview[_nghost-%COMP%]   [_ngcontent-%COMP%]:is(button, select, summary, input):focus-visible {\n  outline: 3px solid #a9efdc;\n  outline-offset: 3px;\n}\n@container (max-width: 640px) {\n  .lab-preview[_nghost-%COMP%]   .lab-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bench-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .matter-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .restoration-stage[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 10px;\n  }\n  .lab-preview[_nghost-%COMP%]   .stage[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .rig[_ngcontent-%COMP%] {\n    grid-row: 1;\n  }\n  .lab-preview[_nghost-%COMP%]   .rack[_ngcontent-%COMP%] {\n    grid-row: 2;\n  }\n  .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%] {\n    grid-row: 1;\n  }\n  .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%]   .stage[_ngcontent-%COMP%] {\n    grid-row: 2;\n  }\n  .lab-preview[_nghost-%COMP%]   .test-list[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .shelf-plan[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .lab-preview[_nghost-%COMP%]   .instrument-list[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .chamber-list[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .lab-preview[_nghost-%COMP%]   .focus-specimen[_ngcontent-%COMP%] {\n    max-width: 130px;\n    justify-self: center;\n  }\n  .lab-preview[_nghost-%COMP%]   .focus-specimen[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    max-height: 150px;\n  }\n  .lab-preview[_nghost-%COMP%]   .chamber-well[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .lab-preview[_nghost-%COMP%]   .probe-rig[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=reaction-bench.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReactionBenchComponent, [{
    type: Component,
    args: [{ selector: "app-reaction-bench", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, host: { "[class.lab-preview]": "preview" }, template: `<section class="bench-canvas" (dragend)="clearDockHover()">\r
  <div class="bench-scene" role="img" aria-label="Sealed-vessel reaction bench"></div>\r
  <div class="bench-shade" aria-hidden="true"></div>\r
\r
  <div class="bench-grid" [class.has-record]="step() === 'complete'">\r
    <!-- ---- Specimen tray + protocol -------------------------------------- -->\r
    <aside [hidden]="!!selectedVialId()" class="tray" aria-labelledby="tray-title">\r
      <span class="kicker">Sealed specimens</span>\r
      <h2 id="tray-title">Specimen tray</h2>\r
      <p class="tray-hint">\r
        {{\r
          selectedVialId()\r
            ? 'Your selected vial is loaded. Choose another above or drag one here to switch.'\r
            : 'Select a vial, then use Place on bench, or drag it onto the bench.'
        }}\r
      </p>\r
\r
      <ul class="vial-tray">\r
        @for (vial of vials; track vial.vialId) {\r
          <li>\r
            <button\r
              class="vial-chip"\r
              type="button"\r
              draggable="true"\r
              [class.active]="vialId() === vial.vialId"\r
              [class.held]="heldVialId() === vial.vialId"\r
              [style.--vial-color]="vial.color"\r
              [disabled]="busy()"\r
              [attr.aria-pressed]="heldVialId() === vial.vialId"\r
              [attr.aria-label]="\r
                'Vial ' +\r
                vial.code +\r
                ', ' +\r
                vial.cue +\r
                (isScreened(vial.vialId) ? ', already screened' : '') +\r
                (heldVialId() === vial.vialId ? ', picked up' : '')\r
              "\r
              (dragstart)="startVialDrag($event, vial.vialId)"\r
              (click)="holdVial(vial.vialId)"\r
            >\r
              <img [src]="vial.image" alt="" />\r
              <span class="vial-chip__code">{{ vial.code }}</span>\r
              <span class="vial-chip__cue">{{ vial.cue }}</span>\r
              @if (isScreened(vial.vialId)) {\r
                <span class="vial-chip__done" aria-hidden="true">\u2713</span>\r
              }\r
            </button>\r
          </li>\r
        }\r
      </ul>\r
\r
      @if (heldVialId(); as held) {
        <button class="primary-action" type="button" [disabled]="busy()" (click)="dockVial()">
          Place Vial {{ vialCode(held) }} on bench
        </button>
      }
      <span class="kicker">Protocol</span>
      <ol class="protocol">\r
        <li [class.done]="volumeOk() && step() !== 'fill'" [class.active]="step() === 'fill'">\r
          <span aria-hidden="true">1</span>\r
          <span\r
            >Turn the valve and draw <strong>{{ targetVolumeMl.toFixed(1) }} mL</strong> into the\r
            vessel</span\r
          >\r
        </li>\r
        <li [class.done]="stages().length > 0" [class.active]="step() === 'weigh'">\r
          <span aria-hidden="true">2</span>\r
          <span\r
            >Tip <strong>{{ targetMassG.toFixed(2) }} g</strong> of specimen onto the balance</span\r
          >\r
        </li>\r
        <li [class.done]="stages().length > 0" [class.active]="step() === 'react'">\r
          <span aria-hidden="true">3</span>\r
          <span>Transfer it into the sealed vessel and observe</span>\r
        </li>\r
        <li [class.done]="step() === 'complete'" [class.active]="step() === 'indicator'">\r
          <span aria-hidden="true">4</span>\r
          <span\r
            >Add <strong>{{ requiredDrops }} drops</strong> of Indicator B</span\r
          >\r
        </li>\r
      </ol>\r
\r
      @if (procedureLog().length > 0) {\r
        <span class="kicker">Procedure log</span>\r
        <ol class="run-log">\r
          @for (entry of procedureLog(); track entry.id) {\r
            <li [class.off-protocol]="!entry.clean">\r
              <span class="run-log__index">{{ entry.vialCode }}</span>\r
              <span>\r
                <strong>{{ entry.headline }}</strong>\r
                <small>\r
                  {{ entry.volumeMl.toFixed(2) }} mL \xB7 {{ entry.massG.toFixed(2) }} g \xB7\r
                  {{ entry.drops }} drops\r
                  @if (entry.retries > 0) {\r
                    \xB7 {{ entry.retries }} reset(s)\r
                  }\r
                </small>\r
              </span>\r
            </li>\r
          }\r
        </ol>\r
      }\r
    </aside>\r
\r
    <!-- ---- The rig -------------------------------------------------------- -->\r
    <div class="rig">\r
      <header class="rig-head">\r
        <div>\r
          <span class="kicker">Sealed vessel \xB7 single specimen</span>\r
          <h1>{{ stepHint() }}</h1>\r
        </div>\r
        @if (step() === 'react') {\r
          <div class="rig-clock">\r
            <small>Reaction clock</small>\r
            <strong>{{ elapsedSeconds() }}<span>s</span></strong>\r
          </div>\r
        }\r
      </header>\r
\r
      <div class="apparatus">\r
        <!-- ---- Plumbed column: reservoir on top, tube down to the vessel --- -->\r
        <div class="plumbing">\r
          <div class="tun" [class.flowing]="tapOpen()">\r
            <span class="tun-label" aria-hidden="true">Solution A reservoir</span>\r
            <div class="tun-body" [class.has-plate]="art.reservoir.src">\r
              @if (art.reservoir.src; as plate) {\r
                <img\r
                  class="part-plate"\r
                  [src]="plate"\r
                  [style.mix-blend-mode]="art.reservoir.blend"\r
                  alt=""\r
                />\r
              }\r
              <div class="tun-well">\r
                <div class="tun-liquid" [style.height.%]="tunLevelPercent()">\r
                  <span class="tun-surface" aria-hidden="true"></span>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div\r
            class="feed-tube"\r
            [class.flowing]="tapOpen()"\r
            [class.has-plate]="art.tube.src"\r
            aria-hidden="true"\r
          >\r
            @if (art.tube.src; as plate) {\r
              <img\r
                class="part-plate part-plate--tile"\r
                [src]="plate"\r
                [style.mix-blend-mode]="art.tube.blend"\r
                alt=""\r
              />\r
            }\r
            <span class="tube-wall"></span>\r
            <span class="tube-flow"></span>\r
          </div>\r
\r
          <!-- the valve is the control: turning it is what opens the line -->\r
          <button\r
            class="valve"\r
            type="button"\r
            [class.has-plate-body]="art.valve.src"\r
            [class.open]="tapOpen()"\r
            [disabled]="step() !== 'fill' || busy()"\r
            [attr.aria-pressed]="tapOpen()"\r
            [attr.aria-label]="\r
              (tapOpen() ? 'Close' : 'Open') +\r
              ' the solution valve. Currently ' +\r
              (tapOpen() ? 'open and flowing.' : 'closed.')\r
            "\r
            (click)="toggleTap()"\r
          >\r
            @if (art.valve.src; as plate) {\r
              <img\r
                class="part-plate valve-plate"\r
                [src]="plate"\r
                [style.mix-blend-mode]="art.valve.blend"\r
                alt=""\r
              />\r
            } @else {\r
              <span class="valve-housing" aria-hidden="true"></span>\r
            }\r
            <span class="valve-handle" aria-hidden="true"><i></i></span>\r
            <span class="valve-caption">{{ tapOpen() ? 'Open' : 'Closed' }}</span>\r
          </button>\r
\r
          <div class="spout" aria-hidden="true">\r
            <span class="spout-neck"></span>\r
            @if (tapOpen()) {\r
              <div class="pour-stream">\r
                <span class="stream-body"></span>\r
                @for (bead of [0, 1, 2]; track bead) {\r
                  <i class="stream-bead" [style.animation-delay.ms]="bead * 160"></i>\r
                }\r
              </div>\r
            }\r
          </div>\r
\r
          <!-- ---- The sealed vessel, directly under the spout ---- -->\r
          <!-- Art slot: apparatusArt.beaker. The SVG below is the stand-in;\r
               a rendered plate drops in behind the dynamic layers. -->\r
          <div class="beaker" [class.reacting]="step() === 'react'">\r
            @if (art.beaker.src; as plate) {\r
              <img\r
                class="beaker-plate"\r
                [src]="plate"\r
                [style.mix-blend-mode]="art.beaker.blend"\r
                alt=""\r
              />\r
            }\r
\r
            <svg\r
              class="beaker-svg"\r
              viewBox="0 0 128 176"\r
              [class.plain]="!filters()"\r
              aria-hidden="true"\r
            >\r
              <defs>\r
                <clipPath id="rb-well">\r
                  <path d="M33 47 H94 V135 A8 8 0 0 1 86 143 H41 A8 8 0 0 1 33 135 Z" />\r
                </clipPath>\r
\r
                <!-- liquid deepens toward the base (Beer-Lambert) -->\r
                <linearGradient id="rb-depth" x1="0" y1="0" x2="0" y2="1">\r
                  <stop offset="0" stop-color="#fff" stop-opacity="0.34" />\r
                  <stop offset="0.45" stop-color="#000" stop-opacity="0" />\r
                  <stop offset="1" stop-color="#000" stop-opacity="0.42" />\r
                </linearGradient>\r
\r
                <linearGradient id="rb-glass" x1="0" y1="0" x2="1" y2="0">\r
                  <stop offset="0" stop-color="#dff2f8" stop-opacity="0.85" />\r
                  <stop offset="0.13" stop-color="#ffffff" stop-opacity="0.5" />\r
                  <stop offset="0.34" stop-color="#8fbccb" stop-opacity="0.12" />\r
                  <stop offset="0.82" stop-color="#cfe9f2" stop-opacity="0.3" />\r
                  <stop offset="1" stop-color="#eaf8fc" stop-opacity="0.8" />\r
                </linearGradient>\r
\r
                <!-- what sits behind the liquid bends and swims -->\r
                <filter id="rb-refract" x="-12%" y="-12%" width="124%" height="124%">\r
                  <feTurbulence\r
                    type="fractalNoise"\r
                    baseFrequency="0.014 0.05"\r
                    numOctaves="2"\r
                    seed="7"\r
                    result="noise"\r
                  />\r
                  <feDisplacementMap\r
                    in="SourceGraphic"\r
                    in2="noise"\r
                    scale="6"\r
                    xChannelSelector="R"\r
                    yChannelSelector="G"\r
                  />\r
                </filter>\r
\r
                <filter id="rb-gloss" x="-30%" y="-30%" width="160%" height="160%">\r
                  <feGaussianBlur stdDeviation="2.4" />\r
                </filter>\r
                <filter id="rb-soft" x="-60%" y="-60%" width="220%" height="220%">\r
                  <feGaussianBlur stdDeviation="5" />\r
                </filter>\r
              </defs>\r
\r
              <!-- contact shadow, and the caustic the filled vessel throws -->\r
              <ellipse class="rb-shadow" cx="64" cy="168" rx="44" ry="6" filter="url(#rb-soft)" />\r
              @if (volumeMl() > 0) {\r
                <ellipse\r
                  class="rb-caustic"\r
                  cx="64"\r
                  cy="169"\r
                  rx="30"\r
                  ry="4.5"\r
                  [attr.fill]="liquid()"\r
                  filter="url(#rb-soft)"\r
                />\r
              }\r
\r
              <g clip-path="url(#rb-well)">\r
                <!-- back wall + graduations, seen through the liquid -->\r
                <g\r
                  class="rb-behind"\r
                  [attr.filter]="filters() && volumeMl() > 0 ? 'url(#rb-refract)' : null"\r
                >\r
                  <rect x="33" y="47" width="61" height="96" fill="#08202c" opacity="0.4" />\r
                  @if (!art.beaker.src) {\r
                    @for (mark of [2, 4, 6]; track mark) {\r
                      <g class="rb-grad" [attr.transform]="'translate(0 ' + gradY(mark) + ')'">\r
                        <line x1="86" y1="0" x2="104" y2="0" />\r
                        <text x="82" y="3.4">{{ mark }}</text>\r
                      </g>\r
                    }\r
                  }\r
                </g>\r
\r
                <!-- the target band the student has to stop inside -->\r
                <rect\r
                  class="rb-band"\r
                  [attr.x]="wellX"\r
                  [attr.y]="bandY()"\r
                  [attr.width]="wellW"\r
                  [attr.height]="bandH()"\r
                />\r
\r
                <!-- liquid: body, depth grade, meniscus -->\r
                @if (volumeMl() > 0) {\r
                  <g class="rb-liquid">\r
                    <rect\r
                      class="rb-liquid-body"\r
                      [attr.x]="wellX"\r
                      [attr.y]="liquidY()"\r
                      [attr.width]="wellW"\r
                      [attr.height]="liquidH()"\r
                      [attr.fill]="liquid()"\r
                    />\r
                    <rect\r
                      [attr.x]="wellX"\r
                      [attr.y]="liquidY()"\r
                      [attr.width]="wellW"\r
                      [attr.height]="liquidH()"\r
                      fill="url(#rb-depth)"\r
                    />\r
                    <!-- concave meniscus pulling up at the walls -->\r
                    <ellipse\r
                      class="rb-meniscus"\r
                      cx="64"\r
                      [attr.cy]="liquidY()"\r
                      rx="30.5"\r
                      ry="3.6"\r
                      [attr.fill]="liquid()"\r
                    />\r
                    <ellipse\r
                      class="rb-meniscus-rim"\r
                      cx="64"\r
                      [attr.cy]="liquidY()"\r
                      rx="30.5"\r
                      ry="3.6"\r
                    />\r
                  </g>\r
                }\r
\r
                @if (bubbling()) {\r
                  <g class="rb-bubbles">\r
                    @for (bubble of [0, 1, 2, 3, 4, 5, 6, 7, 8]; track bubble) {\r
                      <circle\r
                        [attr.cx]="37 + bubble * 6.8"\r
                        [attr.cy]="liquidY() + liquidH() - 6"\r
                        [attr.r]="1.6 + (bubble % 3) * 1.1"\r
                        [style.animation-delay.ms]="bubble * 170"\r
                      />\r
                    }\r
                  </g>\r
                }\r
\r
                @if (transferring()) {\r
                  <g class="rb-fall">\r
                    @for (grain of transferGrains(); track grain.id) {\r
                      <rect\r
                        [attr.width]="grain.size"\r
                        [attr.height]="grain.size"\r
                        [attr.x]="64 + grain.offsetX"\r
                        y="24"\r
                        rx="0.6"\r
                        [attr.fill]="vialColor(vialId())"\r
                        [style.animation-delay.ms]="grain.delayMs"\r
                        [style.--spin]="grain.spinDeg + 'deg'"\r
                      />\r
                    }\r
                  </g>\r
                }\r
                @if (splashing()) {\r
                  <ellipse\r
                    class="rb-puff"\r
                    cx="64"\r
                    [attr.cy]="liquidY() + 6"\r
                    rx="34"\r
                    ry="12"\r
                    [attr.fill]="vialColor(vialId())"\r
                    filter="url(#rb-soft)"\r
                  />\r
                  <ellipse class="rb-ring" cx="64" [attr.cy]="liquidY()" rx="10" ry="3" />\r
                  <ellipse\r
                    class="rb-ring rb-ring--late"\r
                    cx="64"\r
                    [attr.cy]="liquidY()"\r
                    rx="10"\r
                    ry="3"\r
                  />\r
                }\r
                @if (dropFalling()) {\r
                  <ellipse class="rb-drop" cx="64" cy="30" rx="2.6" ry="3.4" />\r
                }\r
              </g>\r
\r
              <!-- glass body: only when no plate is carrying it -->\r
              @if (!art.beaker.src) {\r
                <path\r
                  class="rb-glass"\r
                  d="M28 41 H100 V135 A10 10 0 0 1 90 145 H38 A10 10 0 0 1 28 135 Z"\r
                  fill="url(#rb-glass)"\r
                />\r
                <path\r
                  class="rb-glass-edge"\r
                  d="M28 41 H100 V135 A10 10 0 0 1 90 145 H38 A10 10 0 0 1 28 135 Z"\r
                />\r
                <path class="rb-highlight" d="M37 51 L35 126" filter="url(#rb-gloss)" />\r
                <path class="rb-rimlight" d="M93 53 L95 130" />\r
                <rect class="rb-stopper" x="46" y="24" width="36" height="14" rx="4" />\r
                <rect class="rb-stopper-top" x="49" y="26" width="30" height="4" rx="2" />\r
              }\r
            </svg>\r
\r
            <div class="volume-readout" aria-live="polite">\r
              <strong [class.ok]="volumeOk()" [class.over]="volumeOver()">\r
                {{ volumeMl().toFixed(2) }} mL\r
              </strong>\r
              <small>\r
                @if (volumeOk()) {\r
                  in band\r
                } @else if (volumeOver()) {\r
                  over\r
                } @else {\r
                  target {{ targetVolumeMl.toFixed(1) }}\r
                }\r
              </small>\r
            </div>\r
          </div>\r
\r
          <div class="thermometer" [class.active]="step() === 'react' || stages().length > 0">\r
            <div class="thermometer__track">\r
              <div\r
                class="thermometer__column"\r
                [style.width.%]="((temperature() - 15) / 15) * 100"\r
              ></div>\r
            </div>\r
            <span class="thermometer__read" aria-live="polite">\r
              {{ temperature().toFixed(1) }} \xB0C\r
            </span>\r
          </div>\r
\r
          <div class="line-controls">\r
            <button\r
              type="button"\r
              [disabled]="step() !== 'fill' || tapOpen() || busy()"\r
              (click)="nudgeVolume()"\r
            >\r
              +0.1 mL\r
            </button>\r
            <button type="button" [disabled]="busy() || volumeMl() === 0" (click)="drainBeaker()">\r
              Drain vessel\r
            </button>\r
          </div>\r
\r
          @if (step() === 'fill') {\r
            <button\r
              class="primary-action"\r
              type="button"\r
              [disabled]="!volumeOk() || tapOpen()"\r
              (click)="confirmVolume()"\r
            >\r
              Lock in {{ volumeMl().toFixed(2) }} mL \u2192 weigh specimen\r
            </button>\r
          }\r
          @if (step() === 'indicator') {\r
            <button class="primary-action" type="button" [disabled]="busy()" (click)="addDrop()">\r
              Add drop {{ drops() + 1 }} of {{ requiredDrops }}\r
            </button>\r
          }\r
        </div>\r
\r
        <!-- ---- Balance bay: the vial stands here and tips over the pan ---- -->\r
        <div class="balance-bay">\r
          <div\r
            class="vial-dock"\r
            [class.hovered]="dockHover()"\r
            [class.filled]="activeVial() !== undefined"\r
            (dragover)="allowDock($event)"\r
            (dragleave)="clearDockHover()"\r
            (drop)="dockVial()"\r
            (click)="dockVial()"\r
          >\r
            @if (activeVial(); as vial) {\r
              <!-- Art slot: apparatusArt.vial. SVG stand-in until a plate exists. -->\r
              <div\r
                class="lab-vial"\r
                [class.tipping]="tipping()"\r
                [class.has-plate]="art.vial.src"\r
                [style.--vial-color]="vial.color"\r
              >\r
                @if (art.vial.src; as plate) {\r
                  <img\r
                    class="part-plate"\r
                    [src]="plate"\r
                    [style.mix-blend-mode]="art.vial.blend"\r
                    alt=""\r
                  />\r
                }\r
                <svg viewBox="0 0 34 82" aria-hidden="true">\r
                  <defs>\r
                    <linearGradient\r
                      [attr.id]="'rb-barrel-' + vial.code"\r
                      x1="0"\r
                      y1="0"\r
                      x2="1"\r
                      y2="0"\r
                    >\r
                      <stop offset="0" stop-color="#0d2a36" stop-opacity="0.5" />\r
                      <stop offset="0.2" stop-color="#ffffff" stop-opacity="0.42" />\r
                      <stop offset="0.55" stop-color="#9fd2e0" stop-opacity="0.08" />\r
                      <stop offset="0.88" stop-color="#dff2f8" stop-opacity="0.36" />\r
                      <stop offset="1" stop-color="#0d2a36" stop-opacity="0.45" />\r
                    </linearGradient>\r
                    <clipPath [attr.id]="'rb-vial-well-' + vial.code">\r
                      <path d="M9 22 H25 V66 A5 5 0 0 1 20 71 H14 A5 5 0 0 1 9 66 Z" />\r
                    </clipPath>\r
                  </defs>\r
\r
                  @if (!art.vial.src) {\r
                    <rect class="rbv-cap" x="10" y="2" width="14" height="8" rx="2" />\r
                    <rect class="rbv-neck" x="12" y="10" width="10" height="10" />\r
                  }\r
\r
                  <g [attr.clip-path]="'url(#rb-vial-well-' + vial.code + ')'">\r
                    <rect x="9" y="22" width="16" height="49" fill="#07202b" opacity="0.35" />\r
                    <rect\r
                      class="rbv-powder"\r
                      x="9"\r
                      y="47"\r
                      width="16"\r
                      height="24"\r
                      [attr.fill]="vial.color"\r
                    />\r
                    <ellipse class="rbv-powder-top" cx="17" cy="47" rx="8" ry="1.8" />\r
                  </g>\r
\r
                  <path\r
                    class="rbv-glass"\r
                    d="M6 20 H28 V70 A6 6 0 0 1 22 76 H12 A6 6 0 0 1 6 70 Z"\r
                    [attr.fill]="'url(#rb-barrel-' + vial.code + ')'"\r
                  />\r
                  <path class="rbv-edge" d="M6 20 H28 V70 A6 6 0 0 1 22 76 H12 A6 6 0 0 1 6 70 Z" />\r
                  @if (!art.vial.src) {\r
                    <rect class="rbv-label" x="9" y="33" width="16" height="20" />\r
                  }\r
                  <text class="rbv-code" x="17" y="46">{{ vial.code }}</text>\r
                  <path class="rbv-shine" d="M10 24 L9.5 68" />\r
                </svg>\r
              </div>\r
\r
              @if (tipping()) {\r
                <div class="vial-pour" aria-hidden="true">\r
                  @if (grainProfile().dust > 0) {\r
                    <span\r
                      class="pour-dust"\r
                      [style.background]="vial.color"\r
                      [style.opacity]="grainProfile().dust"\r
                    ></span>\r
                  }\r
                  @for (grain of pourGrains(); track grain.id) {\r
                    <i\r
                      [class.sparkle]="grain.sparkle"\r
                      [class.clump]="grainProfile().clump"\r
                      [style.background]="vial.color"\r
                      [style.--grain-x.px]="grain.offsetX"\r
                      [style.--grain-size.px]="grain.size"\r
                      [style.--spin]="grain.spinDeg + 'deg'"\r
                      [style.animation-delay.ms]="grain.delayMs"\r
                    ></i>\r
                  }\r
                </div>\r
              }\r
            } @else {\r
              <p class="dock-empty">\r
                <span aria-hidden="true">\u2913</span>\r
                Drag a vial here\r
              </p>\r
            }\r
          </div>\r
\r
          <div class="scale" [class.live]="step() === 'weigh'" [class.has-plate]="art.balance.src">\r
            @if (art.balance.src; as plate) {\r
              <img\r
                class="part-plate scale-plate"\r
                [src]="plate"\r
                [style.mix-blend-mode]="art.balance.blend"\r
                alt=""\r
              />\r
            }\r
            <div class="scale-pan" [class.tipping]="transferring()"></div>\r
            <div class="scale-body">\r
              <output class="scale-readout" [class.ok]="massOk()" [class.over]="massOver()">\r
                {{ massG().toFixed(2) }}\r
                <span>g</span>\r
              </output>\r
              <div class="scale-status">\r
                <i [class.stable]="scaleStable()"></i>\r
                {{ scaleStable() ? 'stable' : 'measuring\u2026' }}\r
              </div>\r
            </div>\r
          </div>\r
\r
          <button\r
            class="tip-control"\r
            type="button"\r
            [class.open]="tipping()"\r
            [disabled]="step() !== 'weigh' || busy()"\r
            [attr.aria-pressed]="tipping()"\r
            (click)="toggleTip()"\r
          >\r
            {{ tipping() ? 'Stand the vial upright' : 'Tip the vial over the pan' }}\r
          </button>\r
          <div class="line-controls">\r
            <button\r
              type="button"\r
              [disabled]="step() !== 'weigh' || tipping() || busy() || massG() === 0"\r
              (click)="removePinch()"\r
            >\r
              \u22120.1 g\r
            </button>\r
            <button type="button" [disabled]="busy() || massG() === 0" (click)="emptyPan()">\r
              Empty pan\r
            </button>\r
          </div>\r
\r
          @if (step() === 'weigh') {\r
            <button\r
              class="primary-action"\r
              type="button"\r
              [disabled]="!canTransfer()"\r
              (click)="transfer()"\r
            >\r
              Transfer {{ massG().toFixed(2) }} g into vessel\r
            </button>\r
          }\r
        </div>\r
      </div>\r
\r
      <div class="rig-controls">\r
        <p class="rig-hint" aria-live="polite">{{ stepHint() }}</p>\r
        @if (vialId()) {\r
          <button class="ghost-action" type="button" [disabled]="busy()" (click)="abandonRun()">\r
            {{ selectedVialId() ? 'Start this vial again' : 'Abandon run' }}\r
          </button>\r
        }\r
      </div>\r
    </div>\r
\r
    <!-- ---- Observation record --------------------------------------------- -->\r
    <aside [hidden]="!(step() === 'complete')" class="record" aria-label="Reaction trial readings">
      <span class="kicker">Your record</span>\r
      <h2>{{ preview ? 'Reaction readings' : 'What did you see?' }}</h2>
\r
      @if (stages().length === 0) {\r
        <p class="record-note">\r
          Nothing to record yet. Run the protocol and watch the vessel at each stage.\r
        </p>\r
      } @else {\r
        <div class="readout-stack" aria-live="polite">\r
          @if (solutionStage(); as stage) {\r
            <section>\r
              <header>Stage 1 \xB7 Solution A</header>\r
              @for (entry of entries(stage.output); track entry[0]) {\r
                <div>\r
                  <small>{{ entry[0] }}</small>\r
                  <strong>{{ entry[1] }}</strong>\r
                </div>\r
              }\r
            </section>\r
          }\r
          @if (indicatorStage(); as stage) {\r
            <section>\r
              <header>Stage 2 \xB7 Indicator B</header>\r
              @for (entry of entries(stage.output); track entry[0]) {\r
                <div>\r
                  <small>{{ entry[0] }}</small>\r
                  <strong>{{ entry[1] }}</strong>\r
                </div>\r
              }\r
            </section>\r
          }\r
        </div>\r
      }\r
\r
      @if (step() === 'complete') {\r
        <div class="protocol-card" [class.off]="!tightRun()">\r
          <small>Conditions you set</small>\r
          <strong>\r
            {{ recordedVolumeMl().toFixed(2) }} mL \xB7 {{ recordedMassG().toFixed(2) }} g \xB7\r
            {{ drops() }} drops\r
          </strong>\r
          <small>\r
            @if (tightRun()) {\r
              Held tightly, first attempt \u2014 a clean comparison with your other vials.\r
            } @else {\r
              Inside tolerance after {{ retries() }} reset(s). Closer pours make your comparisons\r
              stronger.\r
            }\r
          </small>\r
        </div>\r
\r
        @if (!preview) {
        <label class="observation-field">
          Write what the vessel showed you\r
          <textarea\r
            rows="4"\r
            [ngModel]="observation()"\r
            (ngModelChange)="observation.set($event)"\r
            placeholder="When the specimen went in\u2026 then after the indicator\u2026"\r
          ></textarea>\r
        </label>\r
        <button class="primary-action" type="button" [disabled]="!canCapture()" (click)="capture()">\r
          File this screening as evidence\r
        </button>\r
        @if (!canCapture()) {\r
          <p class="record-note">\r
            The bench will not file a record until you describe the change in your own words.\r
          </p>\r
        }\r
        } @else { <p class="record-note">This protocol is retained in the local procedure log. Choose another vial or restart to compare.</p> }
      }
    </aside>
  </div>
</section>
`, styles: ['/* src/app/projects/mystery-substance/reaction-bench.component.scss */\n:host {\n  position: absolute;\n  inset: 0;\n  display: block;\n}\nbutton,\ntextarea {\n  font: inherit;\n}\nbutton {\n  color: inherit;\n}\nbutton:focus-visible,\ntextarea:focus-visible {\n  outline: 2px solid #88e4df;\n  outline-offset: 2px;\n}\n.bench-canvas,\n.bench-scene,\n.bench-shade {\n  position: absolute;\n  inset: 0;\n}\n.bench-canvas {\n  overflow: auto;\n  color: #ebf7fc;\n  background: #04101a;\n}\n.bench-scene {\n  z-index: 0;\n  background: url(/week3-test-scenes-v2.webp) left center/200% 100% no-repeat;\n  background-color: #04101a;\n  filter: saturate(0.85) contrast(1.03) brightness(0.38);\n}\n.bench-shade {\n  z-index: 1;\n  background:\n    radial-gradient(\n      circle at 50% 34%,\n      rgba(96, 197, 205, 0.12),\n      transparent 58%),\n    linear-gradient(\n      180deg,\n      rgba(3, 12, 19, 0.74),\n      rgba(3, 12, 19, 0.94));\n}\n.bench-grid {\n  position: relative;\n  z-index: 2;\n  display: grid;\n  min-height: 100%;\n  align-items: start;\n  gap: 0.85rem;\n  grid-template-columns: minmax(12.5rem, 0.8fr) minmax(0, 2.1fr) minmax(13rem, 0.95fr);\n  padding: 0.9rem;\n}\n.kicker {\n  color: #79d8d5;\n  font-size: 0.6rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh1 {\n  margin: 0;\n  color: #f3fbfd;\n  font-size: clamp(1.05rem, 1.9vw, 1.35rem);\n  font-weight: 850;\n}\nh2 {\n  margin: 0.1rem 0 0;\n  color: #eef8fa;\n  font-size: 0.95rem;\n  font-weight: 850;\n}\n.tray,\n.record {\n  display: grid;\n  align-content: start;\n  gap: 0.5rem;\n  border: 1px solid #2b4d5f;\n  border-radius: 0.7rem;\n  padding: 0.8rem;\n  background: rgba(6, 21, 31, 0.9);\n}\n.record-note {\n  margin: 0;\n  color: #8aa8b5;\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.vial-tray,\n.protocol,\n.run-log {\n  display: grid;\n  margin: 0;\n  padding: 0;\n  gap: 0.4rem;\n  list-style: none;\n}\n.vial-chip {\n  position: relative;\n  display: grid;\n  width: 100%;\n  align-items: center;\n  gap: 0 0.55rem;\n  grid-template-columns: 2.4rem 1fr;\n  border: 1px solid #2d5162;\n  border-radius: 0.55rem;\n  padding: 0.4rem;\n  text-align: left;\n  background: rgba(11, 33, 45, 0.92);\n  cursor: pointer;\n  transition: border-color 0.15s ease, transform 0.15s ease;\n}\n.vial-chip:hover:not(:disabled) {\n  border-color: #4f97a2;\n  transform: translateX(2px);\n}\n.vial-chip:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.vial-chip.active {\n  border-color: #7fe3dd;\n  background: rgba(20, 69, 79, 0.95);\n  box-shadow: inset 0 0 0 1px #7fe3dd;\n}\n.vial-chip img {\n  width: 2.4rem;\n  height: 2.4rem;\n  border: 1px solid var(--vial-color, #4d7f8c);\n  border-radius: 0.4rem;\n  grid-row: span 2;\n  object-fit: cover;\n}\n.vial-chip__code {\n  color: #f2fdfd;\n  font-size: 0.82rem;\n  font-weight: 900;\n}\n.vial-chip__cue {\n  color: #8fb0bd;\n  font-size: 0.6rem;\n  line-height: 1.25;\n}\n.vial-chip__done {\n  position: absolute;\n  top: 0.3rem;\n  right: 0.35rem;\n  display: grid;\n  width: 1rem;\n  height: 1rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #08222b;\n  background: #7fe3dd;\n  font-size: 0.6rem;\n  font-weight: 900;\n}\n.protocol li {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.45rem;\n  color: #8aa8b5;\n  font-size: 0.66rem;\n  line-height: 1.35;\n}\n.protocol li > span:first-child {\n  display: grid;\n  width: 1.2rem;\n  height: 1.2rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #34606f;\n  border-radius: 50%;\n  font-size: 0.58rem;\n  font-weight: 900;\n}\n.protocol strong {\n  color: #cfe6ee;\n}\n.protocol li.active {\n  color: #e6f4f7;\n}\n.protocol li.active > span:first-child {\n  border-color: #7fe3dd;\n  color: #7fe3dd;\n}\n.protocol li.done > span:first-child {\n  color: #08222b;\n  border-color: #7fe3dd;\n  background: #7fe3dd;\n}\n.rig {\n  display: grid;\n  align-content: start;\n  gap: 0.75rem;\n  border: 1px solid #2f5972;\n  border-radius: 0.8rem;\n  padding: 0.9rem;\n  background: rgba(5, 19, 28, 0.74);\n}\n.rig-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.8rem;\n}\n.rig-clock {\n  display: grid;\n  justify-items: end;\n  border: 1px solid #2f6570;\n  border-radius: 0.5rem;\n  padding: 0.3rem 0.6rem;\n  background: #061c26;\n}\n.rig-clock small {\n  color: #7f9ead;\n  font-size: 0.53rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.rig-clock strong {\n  color: #7fe3dd;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    "Cascadia Mono",\n    monospace;\n  font-size: 1.25rem;\n  line-height: 1;\n}\n.rig-clock strong span {\n  font-size: 0.7rem;\n}\n.apparatus {\n  display: grid;\n  align-items: start;\n  gap: 1rem;\n  grid-template-columns: minmax(11rem, 1.15fr) minmax(10rem, 1fr);\n}\n.plumbing,\n.balance-bay {\n  display: grid;\n  justify-items: center;\n  gap: 0.4rem;\n}\n.tun {\n  display: grid;\n  justify-items: center;\n}\n.tun-label {\n  margin-bottom: 0.25rem;\n  color: #9fc0cc;\n  font-size: 0.55rem;\n  font-weight: 850;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.tun-body {\n  position: relative;\n  display: flex;\n  width: 7.5rem;\n  height: 3.4rem;\n  align-items: flex-end;\n  overflow: hidden;\n  border: 2px solid #9fd2e0;\n  border-radius: 0.4rem 0.4rem 0.9rem 0.9rem;\n  background: rgba(10, 34, 45, 0.75);\n}\n.tun-liquid {\n  position: relative;\n  width: 100%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(206, 236, 243, 0.78),\n      rgba(150, 205, 222, 0.62));\n  transition: height 0.25s ease-out;\n}\n.tun-surface {\n  position: absolute;\n  top: -1px;\n  right: 0;\n  left: 0;\n  height: 2px;\n  background: rgba(236, 251, 255, 0.9);\n}\n.tun.flowing .tun-surface {\n  animation: surface-chop 0.5s ease-in-out infinite;\n}\n@keyframes surface-chop {\n  0%, 100% {\n    transform: scaleY(1);\n  }\n  50% {\n    transform: scaleY(2.2);\n  }\n}\n.feed-tube {\n  position: relative;\n  width: 0.85rem;\n  height: 1.9rem;\n  overflow: hidden;\n  border-radius: 0 0 0.1rem 0.1rem;\n}\n.tube-wall {\n  position: absolute;\n  inset: 0;\n  border-right: 1px solid #7ba7b6;\n  border-left: 1px solid #7ba7b6;\n  border-radius: inherit;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(120, 160, 172, 0.5),\n      rgba(206, 236, 243, 0.28) 40%,\n      rgba(120, 160, 172, 0.5));\n}\n.tube-flow {\n  position: absolute;\n  inset: 0.12rem 0.22rem;\n  border-radius: 0.1rem;\n  opacity: 0;\n  background:\n    repeating-linear-gradient(\n      180deg,\n      rgba(236, 251, 255, 0.95) 0 0.2rem,\n      rgba(150, 205, 222, 0.55) 0.2rem 0.4rem);\n  background-size: 100% 0.4rem;\n  transition: opacity 0.18s ease;\n}\n.feed-tube.flowing .tube-flow {\n  opacity: 1;\n  animation: flow 0.34s linear infinite;\n}\n@keyframes flow {\n  to {\n    background-position-y: 0.4rem;\n  }\n}\n.valve {\n  position: relative;\n  display: grid;\n  justify-items: center;\n  padding: 0.15rem 0.4rem 0.2rem;\n  border: 0;\n  border-radius: 0.5rem;\n  background: transparent;\n  cursor: pointer;\n}\n.valve:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n.valve:not(:disabled):hover .valve-handle {\n  box-shadow: 0 0 0.5rem rgba(127, 227, 221, 0.55);\n}\n.valve-housing {\n  width: 2.1rem;\n  height: 1.15rem;\n  border: 1.5px solid #9fd2e0;\n  border-radius: 0.25rem;\n  background:\n    linear-gradient(\n      180deg,\n      #4a6f7d,\n      #2c4b57);\n}\n.valve-handle {\n  position: absolute;\n  top: 0.35rem;\n  display: grid;\n  width: 2.9rem;\n  height: 0.46rem;\n  place-items: center;\n  border-radius: 0.24rem;\n  background:\n    linear-gradient(\n      180deg,\n      #cfe6ee,\n      #7fa6b3);\n  transition: transform 0.4s cubic-bezier(0.34, 1.45, 0.5, 1), background 0.25s ease;\n  transform: rotate(0deg);\n}\n.valve-handle i {\n  width: 0.62rem;\n  height: 0.62rem;\n  border: 1.5px solid #3f6675;\n  border-radius: 50%;\n  background: #eaf7fb;\n}\n.valve.open .valve-handle {\n  background:\n    linear-gradient(\n      180deg,\n      #a6f2ea,\n      #3fa9b0);\n  transform: rotate(90deg);\n}\n.valve-caption {\n  margin-top: 0.3rem;\n  color: #8fb0bd;\n  font-size: 0.55rem;\n  font-weight: 850;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.valve.open .valve-caption {\n  color: #7fe3dd;\n}\n.spout {\n  position: relative;\n  display: grid;\n  height: 1.7rem;\n  justify-items: center;\n}\n.spout-neck {\n  width: 0.5rem;\n  height: 0.75rem;\n  border-radius: 0 0 0.16rem 0.16rem;\n  background:\n    linear-gradient(\n      90deg,\n      #6f95a2,\n      #a8ccd6 45%,\n      #6f95a2);\n}\n.pour-stream {\n  position: absolute;\n  top: 0.7rem;\n  display: grid;\n  justify-items: center;\n}\n.stream-body {\n  width: 0.26rem;\n  height: 1.1rem;\n  border-radius: 0.15rem;\n  background:\n    repeating-linear-gradient(\n      180deg,\n      rgba(236, 251, 255, 0.95) 0 0.18rem,\n      rgba(176, 220, 235, 0.6) 0.18rem 0.36rem);\n  background-size: 100% 0.36rem;\n  animation: flow 0.32s linear infinite;\n}\n.stream-bead {\n  position: absolute;\n  top: 0.55rem;\n  width: 0.3rem;\n  height: 0.38rem;\n  border-radius: 50% 50% 50% 50%/60% 60% 40% 40%;\n  background: rgba(236, 251, 255, 0.95);\n  animation: bead-fall 0.48s linear infinite;\n}\n@keyframes bead-fall {\n  0% {\n    opacity: 0;\n    transform: translateY(0) scaleY(0.8);\n  }\n  25% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.15;\n    transform: translateY(0.7rem) scaleY(1.35);\n  }\n}\n.line-controls {\n  display: flex;\n  width: 100%;\n  gap: 0.3rem;\n}\n.line-controls button {\n  flex: 1;\n  border: 1px solid #2d5162;\n  border-radius: 0.4rem;\n  padding: 0.35rem 0.2rem;\n  color: #a9c6d1;\n  background: rgba(11, 33, 45, 0.9);\n  font-size: 0.62rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.line-controls button:disabled {\n  cursor: not-allowed;\n  opacity: 0.35;\n}\n.vial-dock {\n  position: relative;\n  display: grid;\n  width: 100%;\n  min-height: 7.2rem;\n  place-items: end center;\n  border: 1px dashed #3a6b7c;\n  border-radius: 0.6rem;\n  padding-bottom: 0.35rem;\n  background: rgba(8, 27, 37, 0.55);\n  transition: border-color 0.15s ease, background 0.15s ease;\n}\n.vial-dock.hovered {\n  border-color: #7fe3dd;\n  background: rgba(20, 69, 79, 0.75);\n}\n.vial-dock.filled {\n  border-style: solid;\n  border-color: #356171;\n}\n.dock-empty {\n  display: grid;\n  margin: 0;\n  align-self: center;\n  justify-items: center;\n  gap: 0.25rem;\n  color: #7f9ead;\n  font-size: 0.66rem;\n  font-weight: 700;\n}\n.dock-empty span {\n  font-size: 1.3rem;\n}\n.lab-vial {\n  display: grid;\n  width: 2.4rem;\n  transform-origin: 50% 92%;\n  transition: transform 0.55s cubic-bezier(0.34, 1.25, 0.5, 1);\n  transform: rotate(0deg);\n}\n.lab-vial svg {\n  width: 100%;\n  height: auto;\n}\n.lab-vial.tipping {\n  transform: rotate(118deg) translateY(-0.6rem);\n}\n.rbv-cap {\n  fill: #9fc3d0;\n  stroke: #d7ebf2;\n  stroke-width: 1;\n}\n.rbv-neck {\n  fill: rgba(206, 236, 243, 0.3);\n}\n.rbv-glass {\n  stroke: none;\n}\n.rbv-edge {\n  fill: none;\n  stroke: rgba(214, 242, 250, 0.85);\n  stroke-width: 1.4;\n}\n.rbv-powder {\n  opacity: 0.94;\n}\n.rbv-powder-top {\n  fill: rgba(255, 255, 255, 0.22);\n}\n.rbv-label {\n  fill: rgba(232, 245, 249, 0.94);\n}\n.rbv-code {\n  fill: #10333f;\n  font-size: 9px;\n  font-weight: 900;\n  text-anchor: middle;\n}\n.rbv-shine {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.6);\n  stroke-linecap: round;\n  stroke-width: 2.2;\n}\n.vial-pour {\n  position: absolute;\n  top: 3.1rem;\n  left: 52%;\n}\n.vial-pour i {\n  position: absolute;\n  width: var(--grain-size, 3px);\n  height: var(--grain-size, 3px);\n  border-radius: 22%;\n  opacity: 0;\n  animation: vial-grain 0.66s cubic-bezier(0.45, 0, 0.85, 0.6) infinite;\n}\n.vial-pour i.sparkle {\n  box-shadow: 0 0 0.22rem rgba(255, 255, 255, 0.9);\n}\n.vial-pour i.clump {\n  border-radius: 45%;\n  filter: blur(0.3px);\n}\n@keyframes vial-grain {\n  0% {\n    opacity: 0;\n    transform: translate(0, 0) rotate(0deg);\n  }\n  15% {\n    opacity: 1;\n  }\n  85% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translate(var(--grain-x, 0), 3.4rem) rotate(var(--spin, 180deg));\n  }\n}\n.pour-dust {\n  position: absolute;\n  top: 0.6rem;\n  left: -0.9rem;\n  width: 1.9rem;\n  height: 2.6rem;\n  border-radius: 50%;\n  filter: blur(4px);\n  animation: pour-dust 1.1s ease-out infinite;\n}\n@keyframes pour-dust {\n  0% {\n    opacity: 0;\n    transform: translateY(0) scale(0.5);\n  }\n  40% {\n    opacity: inherit;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(1.6rem) scale(1.3);\n  }\n}\n.tip-control {\n  width: 100%;\n  border: 1px solid #33697a;\n  border-radius: 0.5rem;\n  padding: 0.5rem 0.4rem;\n  color: #bdeae7;\n  background: #0d3241;\n  font-size: 0.7rem;\n  font-weight: 850;\n  cursor: pointer;\n}\n.tip-control.open {\n  border-color: #7fe3dd;\n  color: #04212a;\n  background: #7fe3dd;\n}\n.tip-control:disabled {\n  cursor: not-allowed;\n  opacity: 0.4;\n}\n.beaker {\n  position: relative;\n  display: grid;\n  width: 100%;\n  max-width: 9rem;\n  justify-items: center;\n}\n.beaker-plate,\n.beaker-svg {\n  grid-area: 1/1;\n  width: 100%;\n  height: auto;\n}\n.beaker-plate {\n  pointer-events: none;\n}\n.rb-glass {\n  stroke: none;\n}\n.rb-glass-edge {\n  fill: none;\n  stroke: #bfe4f0;\n  stroke-width: 2.2;\n  opacity: 0.9;\n}\n.beaker.reacting .rb-glass-edge {\n  stroke: #8ff0e8;\n}\n.rb-base {\n  fill: rgba(150, 205, 222, 0.28);\n  stroke: rgba(226, 246, 252, 0.55);\n  stroke-width: 1;\n}\n.rb-highlight {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.72);\n  stroke-linecap: round;\n  stroke-width: 5;\n}\n.rb-rimlight {\n  fill: none;\n  stroke: rgba(214, 242, 250, 0.5);\n  stroke-linecap: round;\n  stroke-width: 1.6;\n}\n.rb-stopper {\n  fill: #46697a;\n  stroke: #bfe4f0;\n  stroke-width: 1.5;\n}\n.rb-stopper-top {\n  fill: rgba(226, 246, 252, 0.42);\n}\n.rb-shadow {\n  fill: rgba(2, 10, 16, 0.75);\n}\n.rb-caustic {\n  opacity: 0.5;\n  mix-blend-mode: screen;\n}\n.rb-behind {\n  transition: filter 0.2s ease;\n}\n.rb-grad line {\n  stroke: rgba(198, 226, 236, 0.5);\n  stroke-width: 1;\n}\n.rb-grad text {\n  fill: rgba(198, 226, 236, 0.62);\n  font-size: 7px;\n  font-weight: 700;\n  text-anchor: end;\n}\n.rb-band {\n  fill: rgba(240, 201, 106, 0.16);\n  stroke: rgba(240, 201, 106, 0.85);\n  stroke-dasharray: 4 3;\n  stroke-width: 1;\n}\n.rb-liquid-body,\n.rb-meniscus {\n  transition: fill 2.4s ease-in-out;\n}\n.rb-meniscus {\n  opacity: 0.92;\n}\n.rb-meniscus-rim {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.6);\n  stroke-width: 1.1;\n}\n.rb-bubbles circle {\n  fill: rgba(244, 253, 255, 0.9);\n  animation: rb-rise 1.7s cubic-bezier(0.4, 0, 0.7, 1) infinite;\n}\n@keyframes rb-rise {\n  0% {\n    opacity: 0;\n    transform: translate(0, 0) scale(0.5);\n  }\n  16% {\n    opacity: 0.95;\n  }\n  55% {\n    transform: translate(2px, -46px) scale(1.05);\n  }\n  100% {\n    opacity: 0;\n    transform: translate(-2px, -96px) scale(1.3);\n  }\n}\n.rb-fall rect {\n  opacity: 0;\n  animation: rb-grain 0.78s cubic-bezier(0.45, 0, 0.85, 0.6) infinite;\n}\n@keyframes rb-grain {\n  0% {\n    opacity: 0;\n    transform: translateY(0) rotate(0deg);\n  }\n  14% {\n    opacity: 1;\n  }\n  88% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(118px) rotate(var(--spin, 180deg));\n  }\n}\n.rb-puff {\n  opacity: 0.5;\n  animation: rb-puff 0.66s ease-out forwards;\n}\n@keyframes rb-puff {\n  0% {\n    opacity: 0.6;\n    transform: scale(0.3);\n    transform-origin: center;\n  }\n  100% {\n    opacity: 0;\n    transform: scale(1.35);\n    transform-origin: center;\n  }\n}\n.rb-ring {\n  fill: none;\n  stroke: rgba(244, 253, 255, 0.85);\n  stroke-width: 1.4;\n  animation: rb-ring 0.66s ease-out forwards;\n}\n.rb-ring--late {\n  animation-delay: 0.16s;\n}\n@keyframes rb-ring {\n  0% {\n    opacity: 0.95;\n    transform: scale(0.3);\n    transform-origin: center;\n  }\n  100% {\n    opacity: 0;\n    transform: scale(2.8);\n    transform-origin: center;\n  }\n}\n.rb-drop {\n  fill: #c8891f;\n  animation: rb-drop 0.42s cubic-bezier(0.5, 0, 0.9, 0.6) forwards;\n}\n@keyframes rb-drop {\n  0% {\n    opacity: 0;\n    transform: translateY(0) scaleY(0.8);\n  }\n  18% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.9;\n    transform: translateY(104px) scaleY(1.5);\n  }\n}\n.volume-readout {\n  display: flex;\n  align-items: baseline;\n  justify-content: center;\n  gap: 0.35rem;\n  margin-top: 0.35rem;\n}\n.volume-readout strong {\n  color: #dcecf1;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    "Cascadia Mono",\n    monospace;\n  font-size: 0.95rem;\n  font-weight: 800;\n}\n.volume-readout strong.ok {\n  color: #7fe3dd;\n}\n.volume-readout strong.over {\n  color: #f08a6a;\n}\n.volume-readout small {\n  color: #7f9ead;\n  font-size: 0.58rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.thermometer {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  gap: 0.45rem;\n  opacity: 0.5;\n  transition: opacity 0.2s ease;\n}\n.thermometer.active {\n  opacity: 1;\n}\n.thermometer__track {\n  position: relative;\n  display: flex;\n  height: 0.45rem;\n  flex: 1;\n  overflow: hidden;\n  border: 1px solid #356171;\n  border-radius: 0.3rem;\n  background: #061c26;\n}\n.thermometer__column {\n  height: 100%;\n  border-radius: 0.25rem;\n  background:\n    linear-gradient(\n      90deg,\n      #4aa3d8,\n      #f0a35a);\n  transition: width 0.12s linear;\n}\n.thermometer__read {\n  color: #cfe4ea;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    "Cascadia Mono",\n    monospace;\n  font-size: 0.72rem;\n  font-weight: 700;\n}\n.scale {\n  display: grid;\n  width: 100%;\n  justify-items: center;\n}\n.scale-pan {\n  position: relative;\n  width: 6.5rem;\n  height: 0.55rem;\n  border-radius: 0.15rem;\n  background:\n    linear-gradient(\n      180deg,\n      #cfe6ee,\n      #7fa6b3);\n  transform-origin: right bottom;\n  transition: transform 0.35s ease-in;\n}\n.scale-pan.tipping {\n  transform: rotate(-32deg);\n}\n.scale-body {\n  display: grid;\n  width: 100%;\n  justify-items: center;\n  gap: 0.15rem;\n  border: 1px solid #33697a;\n  border-radius: 0 0 0.5rem 0.5rem;\n  padding: 0.5rem 0.4rem;\n  background: #0a2531;\n}\n.scale-readout {\n  color: #cfe4ea;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    "Cascadia Mono",\n    monospace;\n  font-size: 1.5rem;\n  font-weight: 800;\n  letter-spacing: 0.02em;\n  line-height: 1;\n}\n.scale-readout span {\n  font-size: 0.75rem;\n}\n.scale-readout.ok {\n  color: #7fe3dd;\n}\n.scale-readout.over {\n  color: #f08a6a;\n}\n.scale-status {\n  display: flex;\n  align-items: center;\n  gap: 0.3rem;\n  color: #7f9ead;\n  font-size: 0.58rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.scale-status i {\n  width: 0.4rem;\n  height: 0.4rem;\n  border-radius: 50%;\n  background: #e0b64a;\n}\n.scale-status i.stable {\n  background: #62c9a4;\n}\n.rig-controls {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.7rem;\n}\n.rig-hint {\n  margin: 0;\n  color: #9dbcc8;\n  font-size: 0.72rem;\n}\n.primary-action {\n  width: 100%;\n  border: 0;\n  border-radius: 0.5rem;\n  padding: 0.55rem 0.8rem;\n  color: #04212a;\n  background:\n    linear-gradient(\n      135deg,\n      #a0f1e8,\n      #5dc9d0);\n  font-size: 0.74rem;\n  font-weight: 850;\n  cursor: pointer;\n}\n.primary-action:disabled {\n  color: #7f9ead;\n  background: #16323f;\n  cursor: not-allowed;\n}\n.ghost-action {\n  flex: 0 0 auto;\n  border: 1px solid #33697a;\n  border-radius: 0.5rem;\n  padding: 0.45rem 0.7rem;\n  color: #bdeae7;\n  background: transparent;\n  font-size: 0.68rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.ghost-action:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n.readout-stack {\n  display: grid;\n  gap: 0.45rem;\n}\n.readout-stack section {\n  display: grid;\n  gap: 0.2rem;\n  border: 1px solid #2d5162;\n  border-radius: 0.5rem;\n  padding: 0.45rem 0.55rem;\n  background: rgba(11, 33, 45, 0.85);\n}\n.readout-stack header {\n  color: #7fd6d2;\n  font-size: 0.58rem;\n  font-weight: 850;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.readout-stack section div {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.readout-stack small {\n  color: #7c9aa8;\n  font-size: 0.58rem;\n  font-weight: 700;\n}\n.readout-stack strong {\n  color: #dcecf1;\n  font-size: 0.66rem;\n  font-weight: 700;\n  text-align: right;\n}\n.protocol-card {\n  display: grid;\n  gap: 0.15rem;\n  border: 1px solid #4f9d92;\n  border-radius: 0.5rem;\n  padding: 0.5rem 0.6rem;\n  background: rgba(16, 54, 56, 0.55);\n}\n.protocol-card.off {\n  border-color: #b0703c;\n  background: rgba(64, 40, 20, 0.5);\n}\n.protocol-card small {\n  color: #a9c6d1;\n  font-size: 0.6rem;\n  line-height: 1.35;\n}\n.protocol-card strong {\n  color: #eef8fa;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    "Cascadia Mono",\n    monospace;\n  font-size: 0.78rem;\n}\n.observation-field {\n  display: grid;\n  gap: 0.25rem;\n  color: #a9c6d1;\n  font-size: 0.62rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.observation-field textarea {\n  border: 1px solid #2f5566;\n  border-radius: 0.5rem;\n  padding: 0.5rem;\n  color: #eaf6f9;\n  background: #071c27;\n  font-size: 0.74rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  resize: vertical;\n  text-transform: none;\n}\n.run-log li {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.45rem;\n  border-left: 2px solid #2f6570;\n  padding: 0.15rem 0 0.15rem 0.5rem;\n}\n.run-log li.off-protocol {\n  border-left-color: #b0703c;\n}\n.run-log li > span:last-child {\n  display: grid;\n  gap: 0.05rem;\n}\n.run-log__index {\n  display: grid;\n  width: 1.2rem;\n  height: 1.2rem;\n  flex: 0 0 auto;\n  place-items: center;\n  border-radius: 50%;\n  color: #08222b;\n  background: #7fe3dd;\n  font-size: 0.58rem;\n  font-weight: 900;\n}\n.run-log strong {\n  color: #e4f2f6;\n  font-size: 0.66rem;\n  font-weight: 800;\n  line-height: 1.3;\n}\n.run-log small {\n  color: #8aa8b5;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    "Cascadia Mono",\n    monospace;\n  font-size: 0.58rem;\n}\n@container (max-width: 1180px) {\n  .bench-grid {\n    grid-template-columns: minmax(11rem, 0.8fr) minmax(0, 2fr);\n  }\n  .record {\n    grid-column: 1/-1;\n  }\n}\n@container (max-width: 820px) {\n  .bench-grid {\n    grid-template-columns: 1fr;\n  }\n  .record {\n    grid-column: auto;\n  }\n  .apparatus {\n    grid-template-columns: 1fr;\n  }\n  .plumbing,\n  .balance-bay {\n    width: min(100%, 18rem);\n    justify-self: center;\n  }\n}\n.beaker-svg.plain .rb-highlight {\n  filter: none;\n}\n.beaker-svg.plain .rb-shadow,\n.beaker-svg.plain .rb-caustic,\n.beaker-svg.plain .rb-puff {\n  filter: none;\n  opacity: 0.35;\n}\n@media (prefers-reduced-motion: reduce) {\n  .rb-bubbles circle,\n  .rb-fall rect,\n  .stream-body,\n  .stream-bead,\n  .tube-flow,\n  .liquid-surface.agitated,\n  .tun.flowing .tun-surface,\n  .vial-pour i,\n  .pour-dust,\n  .rb-ring,\n  .rb-puff {\n    animation: none;\n  }\n  .rb-fall rect,\n  .vial-pour i {\n    opacity: 1;\n  }\n  .rb-drop {\n    animation-duration: 0.001ms;\n  }\n  .rb-liquid-body,\n  .rb-meniscus,\n  .thermometer__column,\n  .valve-handle,\n  .lab-vial,\n  .scale-pan,\n  .tun-liquid {\n    transition-duration: 0.001ms;\n  }\n}\n.part-plate {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  pointer-events: none;\n}\n.part-plate--tile {\n  height: auto;\n  object-fit: fill;\n}\n.tun-body.has-plate {\n  border: 0;\n  background: none;\n}\n.tun-well {\n  position: absolute;\n  z-index: 1;\n  display: flex;\n  align-items: flex-end;\n  inset: 4% 3% 4% 3%;\n}\n.tun-body.has-plate .tun-well {\n  inset: 19.5% 13.4% 29.1% 13.3%;\n}\n.tun-liquid {\n  width: 100%;\n}\n.feed-tube.has-plate .tube-wall {\n  display: none;\n}\n.feed-tube.has-plate .tube-flow {\n  z-index: 1;\n}\n.valve-plate {\n  position: relative;\n  width: 2.1rem;\n  height: 1.15rem;\n  inset: auto;\n}\n.scale.has-plate {\n  position: relative;\n}\n.scale.has-plate .scale-body {\n  border: 0;\n  background: none;\n}\n.scale.has-plate .scale-pan,\n.scale.has-plate .scale-body {\n  position: relative;\n  z-index: 1;\n}\n.lab-vial.has-plate {\n  position: relative;\n}\n.lab-vial.has-plate .rbv-cap,\n.lab-vial.has-plate .rbv-neck,\n.lab-vial.has-plate .rbv-glass,\n.lab-vial.has-plate .rbv-edge,\n.lab-vial.has-plate .rbv-shine {\n  display: none;\n}\n.lab-vial.has-plate svg {\n  position: relative;\n  z-index: 1;\n}\n.valve.has-plate-body .valve-handle,\n.valve:has(.valve-plate) .valve-handle {\n  top: 4%;\n}\n.valve-plate {\n  display: block;\n}\n.scale.has-plate {\n  display: grid;\n  width: 100%;\n  aspect-ratio: 1.777;\n}\n.scale.has-plate .part-plate {\n  grid-area: 1/1;\n}\n.scale.has-plate .scale-pan {\n  grid-area: 1/1;\n  align-self: start;\n  justify-self: center;\n  width: 52%;\n  margin-top: 6%;\n  opacity: 0;\n}\n.scale.has-plate .scale-body {\n  grid-area: 1/1;\n  align-self: center;\n  justify-self: center;\n  width: 46%;\n  margin-top: 12%;\n  padding: 0;\n}\n.scale.has-plate .scale-readout {\n  font-size: 1.15rem;\n}\n.scale.has-plate .scale-status {\n  font-size: 0.5rem;\n}\n.lab-vial.has-plate {\n  width: 2.6rem;\n}\n:host {\n  container-type: inline-size;\n}\n:host(.workbench-station) {\n  position: relative;\n  inset: auto;\n}\n:host(.workbench-station) .bench-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 34rem;\n  overflow: visible;\n}\n:host(.workbench-station) .bench-canvas {\n  min-height: 100dvh;\n}\n.bench-grid {\n  padding-top: 80px;\n  grid-template-columns: minmax(0, 1fr);\n  max-width: 1160px;\n  margin: auto;\n}\n.bench-grid.has-record {\n  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 1fr);\n}\n.tray[hidden],\n.record[hidden],\n.kicker,\n.rig-hint {\n  display: none;\n}\n.rig-head h1 {\n  max-width: 35ch;\n  font-size: clamp(20px, 2.3vw, 29px);\n  line-height: 1.25;\n}\n.record {\n  grid-column: auto;\n}\n.protocol li:not(.active) {\n  display: none;\n}\n@container (max-width: 700px) {\n  .bench-grid {\n    padding-top: 120px;\n  }\n  .bench-grid.has-record {\n    grid-template-columns: 1fr;\n  }\n}\n:host(.lab-preview) {\n  position: relative;\n  inset: auto;\n  display: block;\n  container-type: inline-size;\n}\n:host(.lab-preview) .lab-canvas,\n:host(.lab-preview) .bench-canvas,\n:host(.lab-preview) .matter-canvas,\n:host(.lab-preview) .bay-canvas,\n:host(.lab-preview) .station-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 0;\n  overflow: visible;\n}\n:host(.lab-preview) .lab-grid,\n:host(.lab-preview) .bench-grid,\n:host(.lab-preview) .matter-grid,\n:host(.lab-preview) .bay-grid {\n  padding: 14px;\n  min-height: 0;\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n  gap: 12px;\n}\n:host(.lab-preview) .lab-grid.has-record,\n:host(.lab-preview) .bench-grid.has-record,\n:host(.lab-preview) .matter-grid.has-record {\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n}\n:host(.lab-preview) .lab-grid.has-record .rack,\n:host(.lab-preview) .bench-grid.has-record .rack,\n:host(.lab-preview) .matter-grid.has-record .rack {\n  display: block;\n}\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  grid-column: 1/-1;\n}\n:host(.lab-preview) .record[hidden] {\n  display: none;\n}\n:host(.lab-preview) .stage,\n:host(.lab-preview) .rig,\n:host(.lab-preview) .rack,\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  min-width: 0;\n}\n:host(.lab-preview) .kicker,\n:host(.lab-preview) .instrument-copy small,\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  display: block;\n}\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  max-height: 200px;\n  overflow: auto;\n}\n:host(.lab-preview) .instrument-well,\n:host(.lab-preview) .chamber-well {\n  min-height: 230px;\n}\n:host(.lab-preview) .instrument-well {\n  height: 245px;\n}\n:host(.lab-preview) .stage-controls {\n  margin-top: 10px;\n}\n:host(.lab-preview) .preview-run {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0;\n}\n:host(.lab-preview) .preview-run .primary-action {\n  width: auto;\n}\n:host(.lab-preview) .preview-run p {\n  flex-basis: 100%;\n  margin: 0;\n}\n:host(.lab-preview) h1 {\n  font-size: 1.2rem;\n}\n:host(.lab-preview) h2 {\n  font-size: 1rem;\n}\n:host(.lab-preview) button,\n:host(.lab-preview) select {\n  min-height: 44px;\n  font-size: 0.87rem;\n}\n:host(.lab-preview) small,\n:host(.lab-preview) .record-note,\n:host(.lab-preview) .stage-hint,\n:host(.lab-preview) .rig-hint,\n:host(.lab-preview) .hint,\n:host(.lab-preview) .readout small,\n:host(.lab-preview) .readout strong,\n:host(.lab-preview) .readout-stack small,\n:host(.lab-preview) .readout-stack strong,\n:host(.lab-preview) .rack-note {\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n:host(.lab-preview) input[type=range] {\n  min-height: 32px;\n}\n:host(.lab-preview) :is(button, select, summary, input):focus-visible {\n  outline: 3px solid #a9efdc;\n  outline-offset: 3px;\n}\n@container (max-width: 640px) {\n  :host(.lab-preview) .lab-grid,\n  :host(.lab-preview) .bench-grid,\n  :host(.lab-preview) .matter-grid,\n  :host(.lab-preview) .bay-grid,\n  :host(.lab-preview) .lab-grid.has-record,\n  :host(.lab-preview) .bench-grid.has-record,\n  :host(.lab-preview) .matter-grid.has-record,\n  :host(.lab-preview) .restoration-stage {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 10px;\n  }\n  :host(.lab-preview) .stage,\n  :host(.lab-preview) .rig {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .rack {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .bay-grid .rack {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .bay-grid .stage {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .test-list,\n  :host(.lab-preview) .shelf-plan {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  :host(.lab-preview) .instrument-list,\n  :host(.lab-preview) .chamber-list {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  :host(.lab-preview) .focus-specimen {\n    max-width: 130px;\n    justify-self: center;\n  }\n  :host(.lab-preview) .focus-specimen img {\n    max-height: 150px;\n  }\n  :host(.lab-preview) .chamber-well {\n    gap: 8px;\n  }\n  :host(.lab-preview) .probe-rig {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=reaction-bench.component.css.map */\n'] }]
  }], () => [], { captured: [{ type: Output, args: ["captured"] }], selectedVialId: [{ type: Input, args: [{ isSignal: true, alias: "selectedVialId", required: false }] }], active: [{ type: Input, args: [{ isSignal: true, alias: "active", required: false }] }], vialChanged: [{ type: Output, args: ["vialChanged"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReactionBenchComponent, { className: "ReactionBenchComponent", filePath: "src/app/projects/mystery-substance/reaction-bench.component.ts", lineNumber: 99 });
})();
function gasVisible(output2) {
  return typeof output2["gas"] === "string" && output2["gas"] !== "none visible";
}
function colorOf(output2, stage) {
  const key = stage === "before" ? "colorBefore" : "colorAfter";
  const value = typeof output2[key] === "string" ? output2[key] : "clear";
  return liquidColors[value] ?? liquidColors["clear"];
}
function temperatureAt(output2, eased) {
  const before = numberOr(output2["temperatureBefore"], ambientTemperature);
  const after = numberOr(output2["temperatureAfter"], before);
  return Math.round((before + (after - before) * eased) * 10) / 10;
}
function numberOr(value, fallback) {
  return typeof value === "number" ? value : fallback;
}
function headlineFor(solution, indicator) {
  const notes = [];
  if (gasVisible(solution)) {
    notes.push(String(solution["gas"]));
  }
  const before = numberOr(solution["temperatureBefore"], ambientTemperature);
  const after = numberOr(solution["temperatureAfter"], before);
  if (after !== before) {
    notes.push(`${(after - before).toFixed(0)} \xB0C change`);
  }
  if (solution["colorBefore"] !== solution["colorAfter"]) {
    notes.push(`solution turned ${String(solution["colorAfter"])}`);
  }
  if (indicator["colorBefore"] !== indicator["colorAfter"]) {
    notes.push(`indicator turned ${String(indicator["colorAfter"])}`);
  }
  return notes.length > 0 ? notes.join(" \xB7 ") : "No visible change at either stage";
}
function readableLabel2(value) {
  const spaced = value.replace(/([a-z])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
function round2(value) {
  return Math.round(value * 100) / 100;
}
function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// src/app/projects/mystery-substance/conservation-chamber.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function ConservationChamberComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 30);
    \u0275\u0275listener("click", function ConservationChamberComponent_For_11_Template_button_click_1_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTrial(item_r2.id));
    });
    \u0275\u0275element(2, "span", 31);
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r2.trialId() === item_r2.id);
    \u0275\u0275property("disabled", ctx_r2.running());
    \u0275\u0275attribute("aria-pressed", ctx_r2.trialId() === item_r2.id);
    \u0275\u0275advance();
    \u0275\u0275attribute("data-system", item_r2.system);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r2.system, " system");
  }
}
function ConservationChamberComponent_Conditional_17_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r4.headline);
  }
}
function ConservationChamberComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1, "Trial log");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ol", 32);
    \u0275\u0275repeaterCreate(3, ConservationChamberComponent_Conditional_17_For_4_Template, 5, 2, "li", null, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.log());
  }
}
function ConservationChamberComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "button", 33);
    \u0275\u0275listener("click", function ConservationChamberComponent_Conditional_30_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.run());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 34);
    \u0275\u0275listener("click", function ConservationChamberComponent_Conditional_30_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.reset());
    });
    \u0275\u0275text(4, "Reset");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 35);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.running());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.running() ? "Reaction running\u2026" : "Run the reaction");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.running());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.hint());
  }
}
function ConservationChamberComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 22);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("mix-blend-mode", ctx_r2.art.chamber.blend);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function ConservationChamberComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "rect", 18);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("x", ctx_r2.box.left)("y", ctx_r2.box.top)("width", ctx_r2.box.right - ctx_r2.box.left)("height", ctx_r2.box.bottom - ctx_r2.box.top);
  }
}
function ConservationChamberComponent_For_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "circle", 36);
  }
  if (rf & 2) {
    const particle_r6 = ctx.$implicit;
    \u0275\u0275classProp("gone", particle_r6.gone);
    \u0275\u0275attribute("cx", particle_r6.x)("cy", particle_r6.y);
  }
}
function ConservationChamberComponent_Conditional_38_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 38);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("x1", ctx_r2.box.left - 3)("y1", ctx_r2.box.top)("x2", ctx_r2.box.right + 3)("y2", ctx_r2.box.top);
  }
}
function ConservationChamberComponent_Conditional_38_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 39)(1, "line", 40);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("x1", ctx_r2.box.left - 3)("y1", ctx_r2.box.top)("y2", ctx_r2.box.top);
    \u0275\u0275advance();
    \u0275\u0275attribute("y1", ctx_r2.box.top)("x2", ctx_r2.box.right + 3)("y2", ctx_r2.box.top);
  }
}
function ConservationChamberComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 37);
    \u0275\u0275conditionalCreate(1, ConservationChamberComponent_Conditional_38_Conditional_1_Template, 1, 4, ":svg:line", 38)(2, ConservationChamberComponent_Conditional_38_Conditional_2_Template, 2, 6);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("d", "M" + ctx_r2.box.left + " " + ctx_r2.box.top + " V" + ctx_r2.box.bottom + " H" + ctx_r2.box.right + " V" + ctx_r2.box.top);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.sealed() ? 1 : 2);
  }
}
function ConservationChamberComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1, "open to the room");
    \u0275\u0275elementEnd();
  }
}
function ConservationChamberComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 22);
  }
  if (rf & 2) {
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function ConservationChamberComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " start mass ");
  }
}
function ConservationChamberComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " no change ");
  }
}
function ConservationChamberComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r2.massDelta().toFixed(1), " g ");
  }
}
function ConservationChamberComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 26);
  }
}
function ConservationChamberComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "p", 35);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 41)(4, "button", 34);
    \u0275\u0275listener("click", function ConservationChamberComponent_Conditional_52_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.reset());
    });
    \u0275\u0275text(5, " Reset ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 33);
    \u0275\u0275listener("click", function ConservationChamberComponent_Conditional_52_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.run());
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.hint());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.running());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.running());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.running() ? "Reaction running\u2026" : "Run the reaction", " ");
  }
}
function ConservationChamberComponent_Conditional_58_Conditional_21_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, " The tracker will not file a trial until you describe it in your own words. ");
    \u0275\u0275elementEnd();
  }
}
function ConservationChamberComponent_Conditional_58_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 43);
    \u0275\u0275text(1, " Write what happened to the matter ");
    \u0275\u0275elementStart(2, "textarea", 44);
    \u0275\u0275listener("ngModelChange", function ConservationChamberComponent_Conditional_58_Conditional_21_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.observation.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 33);
    \u0275\u0275listener("click", function ConservationChamberComponent_Conditional_58_Conditional_21_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.capture());
    });
    \u0275\u0275text(4, " Save observation ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ConservationChamberComponent_Conditional_58_Conditional_21_Conditional_5_Template, 2, 0, "p", 29);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.observation());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.canCapture());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.canCapture() ? 5 : -1);
  }
}
function ConservationChamberComponent_Conditional_58_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, "Trial retained in the local log. Change chambers or run again to compare.");
    \u0275\u0275elementEnd();
  }
}
function ConservationChamberComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "div")(2, "small");
    \u0275\u0275text(3, "Particles before");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "small");
    \u0275\u0275text(8, "Particles after");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "small");
    \u0275\u0275text(13, "Mass before");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div")(17, "small");
    \u0275\u0275text(18, "Mass after");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(21, ConservationChamberComponent_Conditional_58_Conditional_21_Template, 6, 3)(22, ConservationChamberComponent_Conditional_58_Conditional_22_Template, 2, 0, "p", 29);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.trial().beforeParticles);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.insideCount());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r2.trial().beforeMass.toFixed(1), " g");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r2.mass().toFixed(1), " g");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.preview ? 21 : 22);
  }
}
function ConservationChamberComponent_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, " Nothing to record yet. Run a chamber and watch the particles and the balance together. ");
    \u0275\u0275elementEnd();
  }
}
var runDurationMs = 6200;
var tickMs2 = 40;
var box = { left: 14, right: 146, top: 16, bottom: 116 };
var vent = { left: 62, right: 98 };
var ConservationChamberComponent = class _ConservationChamberComponent {
  preview = inject(LAB_AUTHORING_PREVIEW);
  initialChamberId = input(
    ...ngDevMode ? [void 0, { debugName: "initialChamberId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  captured = output();
  trials = conservationTrials;
  art = stationArt;
  box = box;
  renderQuality = inject(RenderQualityService);
  trialId = signal(
    "closed",
    ...ngDevMode ? [{ debugName: "trialId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  phase = signal(
    "idle",
    ...ngDevMode ? [{ debugName: "phase" }] : (
      /* istanbul ignore next */
      []
    )
  );
  progress = signal(
    0,
    ...ngDevMode ? [{ debugName: "progress" }] : (
      /* istanbul ignore next */
      []
    )
  );
  particles = signal(
    [],
    ...ngDevMode ? [{ debugName: "particles" }] : (
      /* istanbul ignore next */
      []
    )
  );
  observation = signal(
    "",
    ...ngDevMode ? [{ debugName: "observation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showBoundary = signal(
    true,
    ...ngDevMode ? [{ debugName: "showBoundary" }] : (
      /* istanbul ignore next */
      []
    )
  );
  log = signal(
    [],
    ...ngDevMode ? [{ debugName: "log" }] : (
      /* istanbul ignore next */
      []
    )
  );
  timer;
  drafts = /* @__PURE__ */ new Map();
  constructor() {
    let restored = false;
    persistWorkspaceDraft("conservation-chamber", () => ({
      trialId: this.trialId(),
      observation: this.observation(),
      settled: this.phase() === "settled",
      drafts: [...this.drafts.entries()],
      log: this.log(),
      showBoundary: this.showBoundary()
    }), (saved) => {
      restored = true;
      if (typeof saved.showBoundary === "boolean")
        this.showBoundary.set(saved.showBoundary);
      if (Array.isArray(saved.drafts))
        for (const [id, draft] of saved.drafts)
          this.drafts.set(id, draft);
      if (Array.isArray(saved.log))
        this.log.set(saved.log);
      if (this.trials.some((t) => t.id === saved.trialId))
        this.trialId.set(saved.trialId);
      this.restoreTrialDraft(saved);
    });
    effect(() => {
      const id = this.initialChamberId();
      if (!restored && id)
        untracked(() => this.selectTrial(id));
    });
  }
  restoreTrialDraft(draft) {
    this.observation.set(typeof draft.observation === "string" ? draft.observation : "");
    if (draft.settled) {
      const trial = this.trials.find((t) => t.id === this.trialId());
      this.seed(trial.beforeParticles);
      this.reconcile(trial.afterParticles);
      this.phase.set("settled");
      this.progress.set(1);
    }
  }
  ngOnDestroy() {
    this.stop();
  }
  trial = computed(
    () => this.trials.find((item) => item.id === this.trialId()) ?? this.trials[0],
    ...ngDevMode ? [{ debugName: "trial" }] : (
      /* istanbul ignore next */
      []
    )
  );
  running = computed(
    () => this.phase() === "running",
    ...ngDevMode ? [{ debugName: "running" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sealed = computed(
    () => this.trial().system === "sealed",
    ...ngDevMode ? [{ debugName: "sealed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Particles still inside the measured boundary — the number that matters. */
  insideCount = computed(
    () => this.particles().filter((particle) => !particle.gone).length,
    ...ngDevMode ? [{ debugName: "insideCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Mass falls in step with the particles that have left. */
  mass = computed(
    () => {
      const trial = this.trial();
      if (this.phase() === "idle") {
        return trial.beforeMass;
      }
      const lost = trial.beforeParticles - this.insideCount();
      const perParticle = trial.beforeParticles === trial.afterParticles ? 0 : (trial.beforeMass - trial.afterMass) / (trial.beforeParticles - trial.afterParticles);
      return Math.round((trial.beforeMass - lost * perParticle) * 10) / 10;
    },
    ...ngDevMode ? [{ debugName: "mass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  massDelta = computed(
    () => Math.round((this.mass() - this.trial().beforeMass) * 10) / 10,
    ...ngDevMode ? [{ debugName: "massDelta" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canCapture = computed(
    () => this.phase() === "settled" && this.observation().trim().length > 0,
    ...ngDevMode ? [{ debugName: "canCapture" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hint = computed(
    () => {
      if (this.running()) {
        return this.sealed() ? "Sealed. Watch the particle count and the balance together." : "Open. Watch what crosses the boundary \u2014 and what the balance does.";
      }
      if (this.phase() === "settled") {
        if (this.preview)
          return "Trial retained locally. Switch the boundary or rerun to compare.";
        return "Describe what happened to the particles and to the mass.";
      }
      return "Choose a chamber and run the reaction. The boundary is what you are measuring.";
    },
    ...ngDevMode ? [{ debugName: "hint" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectTrial(id) {
    if (this.running() || id === this.trialId()) {
      return;
    }
    this.drafts.set(this.trialId(), {
      observation: this.observation(),
      settled: this.phase() === "settled"
    });
    this.trialId.set(id);
    this.reset();
    const draft = this.drafts.get(id);
    if (draft)
      this.restoreTrialDraft(draft);
  }
  toggleBoundary() {
    this.showBoundary.update((shown) => !shown);
  }
  async run() {
    if (this.running()) {
      return;
    }
    const trial = this.trial();
    this.seed(trial.beforeParticles);
    this.phase.set("running");
    this.progress.set(0);
    this.renderQuality.probe();
    const escapees = trial.beforeParticles - trial.afterParticles;
    await this.simulate(escapees);
    this.reconcile(trial.afterParticles);
    this.phase.set("settled");
    this.log.update((current) => [
      {
        id: Math.max(0, ...current.map((entry) => entry.id)) + 1,
        title: trial.title,
        headline: `${trial.beforeParticles} \u2192 ${this.insideCount()} particles \xB7 ${trial.beforeMass.toFixed(1)} \u2192 ${this.mass().toFixed(1)} g`
      },
      ...current.slice(0, 39)
    ]);
  }
  seed(count) {
    this.particles.set(Array.from({ length: count }, (_, index) => ({
      id: index,
      // Deterministic scatter so a chamber behaves the same every run.
      x: box.left + 8 + index * 37 % (box.right - box.left - 16),
      y: box.top + 8 + index * 53 % (box.bottom - box.top - 16),
      vx: (index % 5 - 2) * 0.5 || 0.6,
      vy: (index % 7 - 3) * 0.4 || -0.5,
      gone: false
    })));
  }
  simulate(escapees) {
    return new Promise((resolve) => {
      const started = Date.now();
      this.stop();
      this.timer = setInterval(() => {
        const ratio = Math.min((Date.now() - started) / runDurationMs, 1);
        this.progress.set(ratio);
        this.step(escapees, ratio);
        if (ratio >= 1) {
          this.stop();
          resolve();
        }
      }, tickMs2);
    });
  }
  /** One frame of motion: bounce inside the box, leak through the vent. */
  step(escapees, ratio) {
    const allowed = Math.floor(escapees * Math.min(ratio * 1.25, 1));
    this.particles.update((current) => {
      let escapedSoFar = current.filter((particle) => particle.gone).length;
      return current.map((particle) => {
        let { x, y, vx, vy, gone } = particle;
        x += vx;
        y += vy;
        if (gone) {
          return __spreadProps(__spreadValues({}, particle), { x, y, vy: vy - 0.04 });
        }
        if (x <= box.left + 3 || x >= box.right - 3) {
          vx = -vx;
          x = Math.min(Math.max(x, box.left + 3), box.right - 3);
        }
        if (y >= box.bottom - 3) {
          vy = -Math.abs(vy);
          y = box.bottom - 3;
        }
        if (y <= box.top + 3) {
          const underVent = !this.sealed() && x > vent.left && x < vent.right;
          if (underVent && escapedSoFar < allowed) {
            escapedSoFar += 1;
            return __spreadProps(__spreadValues({}, particle), { x, y, vx, vy, gone: true });
          }
          vy = Math.abs(vy);
          y = box.top + 3;
        }
        return __spreadProps(__spreadValues({}, particle), { x, y, vx, vy, gone });
      });
    });
  }
  /**
   * Whether a particle happens to reach the vent is down to its path, so a run
   * can end a particle or two short. The recorded data is the authority: any
   * shortfall leaves as the reaction finishes, picking those closest to the gap.
   */
  reconcile(target) {
    const shortfall = this.insideCount() - target;
    if (shortfall <= 0) {
      return;
    }
    const ventCentre = (vent.left + vent.right) / 2;
    const nearest = this.particles().filter((particle) => !particle.gone).sort((a, b) => Math.abs(a.x - ventCentre) + a.y - (Math.abs(b.x - ventCentre) + b.y)).slice(0, shortfall).map((particle) => particle.id);
    this.particles.update((current) => current.map((particle) => nearest.includes(particle.id) ? __spreadProps(__spreadValues({}, particle), { x: ventCentre, y: box.top - 4, gone: true }) : particle));
  }
  stop() {
    if (this.timer !== void 0) {
      clearInterval(this.timer);
      this.timer = void 0;
    }
  }
  reset() {
    this.stop();
    this.phase.set("idle");
    this.progress.set(0);
    this.particles.set([]);
    this.observation.set("");
  }
  capture() {
    const trial = this.trial();
    if (!this.canCapture()) {
      return;
    }
    this.captured.emit({
      activityId: "activity-conservation-model",
      evidenceId: "evidence-conservation-trials",
      result: __spreadProps(__spreadValues({}, trial), {
        observedParticles: this.insideCount(),
        observedMass: this.mass()
      }),
      note: this.observation().trim()
    });
    this.drafts.delete(this.trialId());
    this.reset();
  }
  static \u0275fac = function ConservationChamberComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConservationChamberComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConservationChamberComponent, selectors: [["app-conservation-chamber"]], hostVars: 2, hostBindings: function ConservationChamberComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("lab-preview", ctx.preview);
    }
  }, inputs: { initialChamberId: [1, "initialChamberId"] }, outputs: { captured: "captured" }, decls: 60, vars: 23, consts: [[1, "matter-canvas"], ["role", "img", "aria-label", "Matter tracking bench", 1, "matter-scene"], ["aria-hidden", "true", 1, "matter-shade"], [1, "matter-grid"], ["aria-label", "Chamber controls", 1, "rack"], [1, "kicker"], [1, "chamber-list"], [1, "boundary-toggle"], ["type", "checkbox", 3, "change", "checked"], [1, "rack-note"], [1, "stage"], [1, "stage-head"], ["aria-live", "polite", 1, "particle-count"], [1, "preview-run"], [1, "chamber-well"], [1, "chamber"], ["alt", "", 1, "part-plate", 3, "src", "mix-blend-mode"], ["viewBox", "0 0 160 132", "aria-hidden", "true"], [1, "boundary"], ["r", "2.6", 1, "particle", 3, "gone"], ["aria-hidden", "true", 1, "vent-label"], [1, "balance"], ["alt", "", 1, "part-plate", 3, "src"], [1, "balance-body"], [1, "balance-read"], ["aria-live", "polite", 1, "balance-delta"], ["aria-hidden", "true", 1, "balance-plinth"], [1, "stage-controls"], ["aria-label", "Chamber trial readings", 1, "record", 3, "hidden"], [1, "record-note"], ["type", "button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "chamber-icon"], [1, "trial-log"], ["type", "button", 1, "primary-action", 3, "click", "disabled"], ["type", "button", 1, "ghost-action", 3, "click", "disabled"], ["aria-live", "polite", 1, "stage-hint"], ["r", "2.6", 1, "particle"], [1, "chamber-wall"], [1, "chamber-lid"], ["x2", "62", 1, "chamber-lid"], ["x1", "98", 1, "chamber-lid"], [1, "stage-buttons"], ["aria-live", "polite", 1, "readout"], [1, "observation-field"], ["rows", "4", "placeholder", "The particles\u2026 and the balance\u2026", 3, "ngModelChange", "ngModel"]], template: function ConservationChamberComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275element(1, "div", 1)(2, "div", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "aside", 4)(5, "span", 5);
      \u0275\u0275text(6, "System");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "h2");
      \u0275\u0275text(8, "Choose a chamber");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "ul", 6);
      \u0275\u0275repeaterCreate(10, ConservationChamberComponent_For_11_Template, 8, 7, "li", null, _forTrack03);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "label", 7)(13, "input", 8);
      \u0275\u0275listener("change", function ConservationChamberComponent_Template_input_change_13_listener() {
        return ctx.toggleBoundary();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275text(14, " Show the measured boundary ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "p", 9);
      \u0275\u0275text(16, " The boundary is what the balance weighs. Anything that leaves it stops being measured. ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(17, ConservationChamberComponent_Conditional_17_Template, 5, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 10)(19, "header", 11)(20, "div")(21, "span", 5);
      \u0275\u0275text(22, "Particle and mass tracker");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "h1");
      \u0275\u0275text(24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 12)(26, "small");
      \u0275\u0275text(27, "Inside the boundary");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "strong");
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(30, ConservationChamberComponent_Conditional_30_Template, 7, 4, "div", 13);
      \u0275\u0275elementStart(31, "div", 14)(32, "div", 15);
      \u0275\u0275conditionalCreate(33, ConservationChamberComponent_Conditional_33_Template, 1, 3, "img", 16);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(34, "svg", 17);
      \u0275\u0275conditionalCreate(35, ConservationChamberComponent_Conditional_35_Template, 1, 4, ":svg:rect", 18);
      \u0275\u0275repeaterCreate(36, ConservationChamberComponent_For_37_Template, 1, 4, ":svg:circle", 19, _forTrack03);
      \u0275\u0275conditionalCreate(38, ConservationChamberComponent_Conditional_38_Template, 3, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(39, ConservationChamberComponent_Conditional_39_Template, 2, 0, "span", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(40, "div", 21);
      \u0275\u0275conditionalCreate(41, ConservationChamberComponent_Conditional_41_Template, 1, 1, "img", 22);
      \u0275\u0275elementStart(42, "div", 23)(43, "output", 24);
      \u0275\u0275text(44);
      \u0275\u0275elementStart(45, "span");
      \u0275\u0275text(46, "g");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "div", 25);
      \u0275\u0275conditionalCreate(48, ConservationChamberComponent_Conditional_48_Template, 1, 0)(49, ConservationChamberComponent_Conditional_49_Template, 1, 0)(50, ConservationChamberComponent_Conditional_50_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(51, ConservationChamberComponent_Conditional_51_Template, 1, 0, "span", 26);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(52, ConservationChamberComponent_Conditional_52_Template, 8, 4, "div", 27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "aside", 28)(54, "span", 5);
      \u0275\u0275text(55, "Your record");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "h2");
      \u0275\u0275text(57);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(58, ConservationChamberComponent_Conditional_58_Template, 23, 5)(59, ConservationChamberComponent_Conditional_59_Template, 2, 0, "p", 29);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_8_0;
      let tmp_13_0;
      \u0275\u0275advance(3);
      \u0275\u0275classProp("has-record", ctx.phase() === "settled");
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.trials);
      \u0275\u0275advance(3);
      \u0275\u0275property("checked", ctx.showBoundary());
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.log().length > 0 ? 17 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.trial().title);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.phase() === "idle" ? ctx.trial().beforeParticles : ctx.insideCount());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.preview ? 30 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("open", !ctx.sealed());
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_8_0 = ctx.art.chamber.src) ? 33 : -1, tmp_8_0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showBoundary() ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.particles());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.art.chamber.src ? 38 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.sealed() ? 39 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_13_0 = ctx.art.padBalance.src) ? 41 : -1, tmp_13_0);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("falling", ctx.massDelta() < 0);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.mass().toFixed(1), " ");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.phase() === "idle" ? 48 : ctx.massDelta() === 0 ? 49 : 50);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.art.padBalance.src ? 51 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.preview ? 52 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("hidden", !(ctx.phase() === "settled"));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.preview ? "Particle and mass readings" : "What did you see?");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.phase() === "settled" ? 58 : 59);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ['\n[_nghost-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: block;\n}\nbutton[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  color: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #88e4df;\n  outline-offset: 2px;\n}\n.matter-canvas[_ngcontent-%COMP%], \n.matter-scene[_ngcontent-%COMP%], \n.matter-shade[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.matter-canvas[_ngcontent-%COMP%] {\n  overflow: auto;\n  color: #ebf7fc;\n  background: #04101a;\n}\n.matter-scene[_ngcontent-%COMP%] {\n  z-index: 0;\n  background: url(/conservation-test-scenes-v2.webp) left center/200% 100% no-repeat;\n  background-color: #04101a;\n  filter: saturate(0.85) brightness(0.34);\n}\n.matter-shade[_ngcontent-%COMP%] {\n  z-index: 1;\n  background:\n    radial-gradient(\n      circle at 45% 30%,\n      rgba(96, 197, 205, 0.12),\n      transparent 58%),\n    linear-gradient(\n      180deg,\n      rgba(3, 12, 19, 0.76),\n      rgba(3, 12, 19, 0.95));\n}\n.matter-grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: grid;\n  min-height: 100%;\n  align-items: start;\n  gap: 0.85rem;\n  grid-template-columns: minmax(12rem, 0.8fr) minmax(0, 2fr) minmax(12rem, 0.85fr);\n  padding: 0.9rem;\n}\n.kicker[_ngcontent-%COMP%] {\n  color: #79d8d5;\n  font-size: 0.6rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #f3fbfd;\n  font-size: clamp(1rem, 1.8vw, 1.3rem);\n  font-weight: 850;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0.1rem 0 0;\n  color: #eef8fa;\n  font-size: 0.95rem;\n  font-weight: 850;\n}\n.rack[_ngcontent-%COMP%], \n.record[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 0.5rem;\n  border: 1px solid #2b4d5f;\n  border-radius: 0.7rem;\n  padding: 0.8rem;\n  background: rgba(6, 21, 31, 0.9);\n}\n.rack-note[_ngcontent-%COMP%], \n.record-note[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #8aa8b5;\n  font-size: 0.66rem;\n  line-height: 1.4;\n}\n.chamber-list[_ngcontent-%COMP%], \n.trial-log[_ngcontent-%COMP%] {\n  display: grid;\n  margin: 0;\n  padding: 0;\n  gap: 0.35rem;\n  list-style: none;\n}\n.chamber-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  gap: 0.55rem;\n  border: 1px solid #2d5162;\n  border-radius: 0.5rem;\n  padding: 0.45rem 0.55rem;\n  color: #a9c6d1;\n  text-align: left;\n  background: rgba(11, 33, 45, 0.9);\n  cursor: pointer;\n}\n.chamber-list[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #7fe3dd;\n  color: #f2fdfd;\n  background: rgba(20, 69, 79, 0.95);\n}\n.chamber-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.chamber-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  display: grid;\n  gap: 0.05rem;\n}\n.chamber-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  font-weight: 800;\n}\n.chamber-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7f9ead;\n  font-size: 0.58rem;\n  text-transform: capitalize;\n}\n.chamber-icon[_ngcontent-%COMP%] {\n  display: block;\n  width: 1.5rem;\n  height: 1.3rem;\n  flex: 0 0 auto;\n  border: 2px solid #9fd2e0;\n  border-radius: 0.15rem;\n}\n.chamber-icon[data-system=open][_ngcontent-%COMP%] {\n  border-top-color: transparent;\n  border-top-style: dashed;\n}\n.boundary-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  color: #bcd7df;\n  font-size: 0.66rem;\n  font-weight: 700;\n  cursor: pointer;\n}\n.trial-log[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.05rem;\n  border-left: 2px solid #2f6570;\n  padding-left: 0.5rem;\n}\n.trial-log[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e4f2f6;\n  font-size: 0.66rem;\n}\n.trial-log[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #8aa8b5;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 0.58rem;\n}\n.stage[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 0.7rem;\n  border: 1px solid #2f5972;\n  border-radius: 0.8rem;\n  padding: 0.9rem;\n  background: rgba(5, 19, 28, 0.74);\n}\n.stage-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.8rem;\n}\n.particle-count[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: end;\n  border: 1px solid #2f6570;\n  border-radius: 0.5rem;\n  padding: 0.25rem 0.6rem;\n  background: #061c26;\n}\n.particle-count[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7f9ead;\n  font-size: 0.52rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.particle-count[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #7fe3dd;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 1.4rem;\n  line-height: 1;\n}\n.chamber-well[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  gap: 0.4rem;\n  border: 1px solid #24485a;\n  border-radius: 0.6rem;\n  padding: 0.9rem;\n  background:\n    radial-gradient(\n      ellipse at 50% 20%,\n      rgba(120, 210, 215, 0.09),\n      transparent 62%),\n    rgba(3, 14, 21, 0.6);\n}\n.part-plate[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  pointer-events: none;\n}\n.chamber[_ngcontent-%COMP%] {\n  position: relative;\n  width: min(100%, 22rem);\n  aspect-ratio: 1.21;\n}\n.chamber[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n}\n.chamber-wall[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #9fd2e0;\n  stroke-linejoin: round;\n  stroke-width: 2.4;\n}\n.chamber-lid[_ngcontent-%COMP%] {\n  stroke: #9fd2e0;\n  stroke-linecap: round;\n  stroke-width: 2.8;\n}\n.chamber.open[_ngcontent-%COMP%]   .chamber-lid[_ngcontent-%COMP%] {\n  stroke: #e0b64a;\n}\n.boundary[_ngcontent-%COMP%] {\n  fill: rgba(127, 227, 221, 0.05);\n  stroke: #7fe3dd;\n  stroke-dasharray: 5 4;\n  stroke-width: 1.2;\n}\n.particle[_ngcontent-%COMP%] {\n  fill: #bfeef0;\n  transition: fill 0.2s ease;\n}\n.particle.gone[_ngcontent-%COMP%] {\n  fill: #e0b64a;\n  opacity: 0.85;\n}\n.vent-label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -0.2rem;\n  left: 50%;\n  color: #e0b64a;\n  font-size: 0.55rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  transform: translateX(-50%);\n}\n.balance[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  width: min(100%, 15rem);\n  justify-items: center;\n  aspect-ratio: 2.6;\n}\n.balance-body[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  justify-items: center;\n  gap: 0.1rem;\n  border: 1px solid #33697a;\n  border-radius: 0.45rem;\n  padding: 0.35rem 0.9rem;\n  background: #0a2531;\n}\n.balance-read[_ngcontent-%COMP%] {\n  color: #cfe4ea;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 1.5rem;\n  font-weight: 800;\n  line-height: 1;\n  transition: color 0.3s ease;\n}\n.balance-read[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n}\n.balance-read.falling[_ngcontent-%COMP%] {\n  color: #e0b64a;\n}\n.balance-delta[_ngcontent-%COMP%] {\n  color: #7f9ead;\n  font-size: 0.58rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.balance-plinth[_ngcontent-%COMP%] {\n  width: 11rem;\n  height: 0.5rem;\n  border-radius: 0.15rem;\n  background:\n    linear-gradient(\n      180deg,\n      #cfe6ee,\n      #6f95a2);\n}\n.stage-controls[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n}\n.stage-hint[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #9dbcc8;\n  font-size: 0.72rem;\n}\n.stage-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.primary-action[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 0;\n  border-radius: 0.5rem;\n  padding: 0.55rem 0.8rem;\n  color: #04212a;\n  background:\n    linear-gradient(\n      135deg,\n      #a0f1e8,\n      #5dc9d0);\n  font-size: 0.75rem;\n  font-weight: 850;\n  cursor: pointer;\n}\n.primary-action[_ngcontent-%COMP%]:disabled {\n  color: #7f9ead;\n  background: #16323f;\n  cursor: not-allowed;\n}\n.ghost-action[_ngcontent-%COMP%] {\n  border: 1px solid #33697a;\n  border-radius: 0.5rem;\n  padding: 0.55rem 0.8rem;\n  color: #bdeae7;\n  background: transparent;\n  font-size: 0.7rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.ghost-action[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n.readout[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.2rem;\n  border: 1px solid #2d5162;\n  border-radius: 0.5rem;\n  padding: 0.45rem 0.55rem;\n  background: rgba(11, 33, 45, 0.85);\n}\n.readout[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.readout[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7c9aa8;\n  font-size: 0.58rem;\n  font-weight: 700;\n}\n.readout[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dcecf1;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 0.7rem;\n}\n.observation-field[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n  color: #a9c6d1;\n  font-size: 0.62rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.observation-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border: 1px solid #2f5566;\n  border-radius: 0.5rem;\n  padding: 0.5rem;\n  color: #eaf6f9;\n  background: #071c27;\n  font-size: 0.74rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  resize: vertical;\n  text-transform: none;\n}\n@container (max-width: 1180px) {\n  .matter-grid[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(11rem, 0.8fr) minmax(0, 2fr);\n  }\n  .record[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n  }\n}\n@container (max-width: 820px) {\n  .matter-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .record[_ngcontent-%COMP%] {\n    grid-column: auto;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .particle[_ngcontent-%COMP%], \n   .balance-read[_ngcontent-%COMP%] {\n    transition-duration: 0.001ms;\n  }\n}\n[_nghost-%COMP%] {\n  container-type: inline-size;\n}\n.workbench-station[_nghost-%COMP%] {\n  position: relative;\n  inset: auto;\n}\n.workbench-station[_nghost-%COMP%]   .matter-canvas[_ngcontent-%COMP%] {\n  position: relative;\n  inset: auto;\n  min-height: 34rem;\n  overflow: visible;\n}\n.workbench-station[_nghost-%COMP%]   .matter-canvas[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n}\n.matter-grid[_ngcontent-%COMP%] {\n  padding-top: 80px;\n  grid-template-columns: minmax(180px, 0.6fr) minmax(0, 1.7fr);\n}\n.matter-grid.has-record[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 1fr);\n}\n.matter-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%] {\n  display: none;\n}\n.record[_ngcontent-%COMP%] {\n  grid-column: auto;\n}\n.record[hidden][_ngcontent-%COMP%], \n.kicker[_ngcontent-%COMP%], \n.trial-log[_ngcontent-%COMP%] {\n  display: none;\n}\n@container (max-width: 700px) {\n  .matter-grid[_ngcontent-%COMP%], \n   .matter-grid.has-record[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.lab-preview[_nghost-%COMP%] {\n  position: relative;\n  inset: auto;\n  display: block;\n  container-type: inline-size;\n}\n.lab-preview[_nghost-%COMP%]   .lab-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bay-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .station-canvas[_ngcontent-%COMP%] {\n  position: relative;\n  inset: auto;\n  min-height: 0;\n  overflow: visible;\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%] {\n  padding: 14px;\n  min-height: 0;\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n  gap: 12px;\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%] {\n  display: block;\n}\n.lab-preview[_nghost-%COMP%]   .record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .console[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.lab-preview[_nghost-%COMP%]   .record[hidden][_ngcontent-%COMP%] {\n  display: none;\n}\n.lab-preview[_nghost-%COMP%]   .stage[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rig[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .console[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.lab-preview[_nghost-%COMP%]   .kicker[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .instrument-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .trial-log[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .procedure-log[_ngcontent-%COMP%] {\n  display: block;\n}\n.lab-preview[_nghost-%COMP%]   .trial-log[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .procedure-log[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow: auto;\n}\n.lab-preview[_nghost-%COMP%]   .instrument-well[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .chamber-well[_ngcontent-%COMP%] {\n  min-height: 230px;\n}\n.lab-preview[_nghost-%COMP%]   .instrument-well[_ngcontent-%COMP%] {\n  height: 245px;\n}\n.lab-preview[_nghost-%COMP%]   .stage-controls[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%] {\n  width: auto;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  flex-basis: 100%;\n  margin: 0;\n}\n.lab-preview[_nghost-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.lab-preview[_nghost-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.lab-preview[_nghost-%COMP%]   button[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 44px;\n  font-size: 0.87rem;\n}\n.lab-preview[_nghost-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .record-note[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .stage-hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rig-hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout-stack[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout-stack[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rack-note[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.lab-preview[_nghost-%COMP%]   input[type=range][_ngcontent-%COMP%] {\n  min-height: 32px;\n}\n.lab-preview[_nghost-%COMP%]   [_ngcontent-%COMP%]:is(button, select, summary, input):focus-visible {\n  outline: 3px solid #a9efdc;\n  outline-offset: 3px;\n}\n@container (max-width: 640px) {\n  .lab-preview[_nghost-%COMP%]   .lab-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bench-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .matter-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .restoration-stage[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 10px;\n  }\n  .lab-preview[_nghost-%COMP%]   .stage[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .rig[_ngcontent-%COMP%] {\n    grid-row: 1;\n  }\n  .lab-preview[_nghost-%COMP%]   .rack[_ngcontent-%COMP%] {\n    grid-row: 2;\n  }\n  .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%] {\n    grid-row: 1;\n  }\n  .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%]   .stage[_ngcontent-%COMP%] {\n    grid-row: 2;\n  }\n  .lab-preview[_nghost-%COMP%]   .test-list[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .shelf-plan[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .lab-preview[_nghost-%COMP%]   .instrument-list[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .chamber-list[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .lab-preview[_nghost-%COMP%]   .focus-specimen[_ngcontent-%COMP%] {\n    max-width: 130px;\n    justify-self: center;\n  }\n  .lab-preview[_nghost-%COMP%]   .focus-specimen[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    max-height: 150px;\n  }\n  .lab-preview[_nghost-%COMP%]   .chamber-well[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .lab-preview[_nghost-%COMP%]   .probe-rig[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=conservation-chamber.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConservationChamberComponent, [{
    type: Component,
    args: [{ selector: "app-conservation-chamber", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, host: { "[class.lab-preview]": "preview" }, template: `<section class="matter-canvas">\r
  <div class="matter-scene" role="img" aria-label="Matter tracking bench"></div>\r
  <div class="matter-shade" aria-hidden="true"></div>\r
\r
  <div class="matter-grid" [class.has-record]="phase() === 'settled'">\r
    <!-- ---- Chamber choice -------------------------------------------------- -->\r
    <aside class="rack" aria-label="Chamber controls">
      <span class="kicker">System</span>\r
      <h2>Choose a chamber</h2>
\r
      <ul class="chamber-list">\r
        @for (item of trials; track item.id) {\r
          <li>\r
            <button\r
              type="button"\r
              [class.active]="trialId() === item.id"\r
              [disabled]="running()"\r
              [attr.aria-pressed]="trialId() === item.id"\r
              (click)="selectTrial(item.id)"\r
            >\r
              <span class="chamber-icon" [attr.data-system]="item.system" aria-hidden="true"></span>\r
              <span>\r
                <strong>{{ item.title }}</strong>\r
                <small>{{ item.system }} system</small>\r
              </span>\r
            </button>\r
          </li>\r
        }\r
      </ul>\r
\r
      <label class="boundary-toggle">\r
        <input type="checkbox" [checked]="showBoundary()" (change)="toggleBoundary()" />\r
        Show the measured boundary\r
      </label>\r
      <p class="rack-note">\r
        The boundary is what the balance weighs. Anything that leaves it stops being measured.\r
      </p>\r
\r
      @if (log().length > 0) {\r
        <span class="kicker">Trial log</span>\r
        <ol class="trial-log">\r
          @for (entry of log(); track entry.id) {\r
            <li>\r
              <strong>{{ entry.title }}</strong>\r
              <small>{{ entry.headline }}</small>\r
            </li>\r
          }\r
        </ol>\r
      }\r
    </aside>\r
\r
    <!-- ---- Chamber + balance ---------------------------------------------- -->\r
    <div class="stage">\r
      <header class="stage-head">\r
        <div>\r
          <span class="kicker">Particle and mass tracker</span>\r
          <h1>{{ trial().title }}</h1>\r
        </div>\r
        <div class="particle-count" aria-live="polite">\r
          <small>Inside the boundary</small>\r
          <strong>{{ phase() === 'idle' ? trial().beforeParticles : insideCount() }}</strong>\r
        </div>\r
      </header>\r
\r
      @if (preview) {
        <div class="preview-run">
          <button class="primary-action" type="button" [disabled]="running()" (click)="run()">{{ running() ? 'Reaction running\u2026' : 'Run the reaction' }}</button>
          <button class="ghost-action" type="button" [disabled]="running()" (click)="reset()">Reset</button>
          <p class="stage-hint" aria-live="polite">{{ hint() }}</p>
        </div>
      }
      <div class="chamber-well">
        <div class="chamber" [class.open]="!sealed()">\r
          @if (art.chamber.src; as plate) {\r
            <img\r
              class="part-plate"\r
              [src]="plate"\r
              [style.mix-blend-mode]="art.chamber.blend"\r
              alt=""\r
            />\r
          }\r
\r
          <svg viewBox="0 0 160 132" aria-hidden="true">\r
            <!-- the measured boundary -->\r
            @if (showBoundary()) {\r
              <rect\r
                class="boundary"\r
                [attr.x]="box.left"\r
                [attr.y]="box.top"\r
                [attr.width]="box.right - box.left"\r
                [attr.height]="box.bottom - box.top"\r
              />\r
            }\r
\r
            <!-- particles, inside and escaped -->\r
            @for (particle of particles(); track particle.id) {\r
              <circle\r
                class="particle"\r
                [class.gone]="particle.gone"\r
                [attr.cx]="particle.x"\r
                [attr.cy]="particle.y"\r
                r="2.6"\r
              />\r
            }\r
\r
            <!-- chamber walls, drawn when no plate carries them -->\r
            @if (!art.chamber.src) {\r
              <path\r
                class="chamber-wall"\r
                [attr.d]="\r
                  'M' +\r
                  box.left +\r
                  ' ' +\r
                  box.top +\r
                  ' V' +\r
                  box.bottom +\r
                  ' H' +\r
                  box.right +\r
                  ' V' +\r
                  box.top\r
                "\r
              />\r
              @if (sealed()) {\r
                <line\r
                  class="chamber-lid"\r
                  [attr.x1]="box.left - 3"\r
                  [attr.y1]="box.top"\r
                  [attr.x2]="box.right + 3"\r
                  [attr.y2]="box.top"\r
                />\r
              } @else {\r
                <line\r
                  class="chamber-lid"\r
                  [attr.x1]="box.left - 3"\r
                  [attr.y1]="box.top"\r
                  x2="62"\r
                  [attr.y2]="box.top"\r
                />\r
                <line\r
                  class="chamber-lid"\r
                  x1="98"\r
                  [attr.y1]="box.top"\r
                  [attr.x2]="box.right + 3"\r
                  [attr.y2]="box.top"\r
                />\r
              }\r
            }\r
          </svg>\r
\r
          @if (!sealed()) {\r
            <span class="vent-label" aria-hidden="true">open to the room</span>\r
          }\r
        </div>\r
\r
        <!-- the balance reads what is still inside -->\r
        <div class="balance">\r
          @if (art.padBalance.src; as plate) {\r
            <img class="part-plate" [src]="plate" alt="" />\r
          }\r
          <div class="balance-body">\r
            <output class="balance-read" [class.falling]="massDelta() < 0">\r
              {{ mass().toFixed(1) }} <span>g</span>\r
            </output>\r
            <div class="balance-delta" aria-live="polite">\r
              @if (phase() === 'idle') {\r
                start mass\r
              } @else if (massDelta() === 0) {\r
                no change\r
              } @else {\r
                {{ massDelta().toFixed(1) }} g\r
              }\r
            </div>\r
          </div>\r
          @if (!art.padBalance.src) {\r
            <span class="balance-plinth" aria-hidden="true"></span>\r
          }\r
        </div>\r
      </div>\r
\r
      @if (!preview) {
      <div class="stage-controls">
        <p class="stage-hint" aria-live="polite">{{ hint() }}</p>\r
        <div class="stage-buttons">\r
          <button class="ghost-action" type="button" [disabled]="running()" (click)="reset()">\r
            Reset\r
          </button>\r
          <button class="primary-action" type="button" [disabled]="running()" (click)="run()">\r
            {{ running() ? 'Reaction running\u2026' : 'Run the reaction' }}\r
          </button>\r
        </div>\r
      </div>
      }
    </div>
\r
    <!-- ---- Record ---------------------------------------------------------- -->\r
    <aside [hidden]="!(phase() === 'settled')" class="record" aria-label="Chamber trial readings">
      <span class="kicker">Your record</span>\r
      <h2>{{ preview ? 'Particle and mass readings' : 'What did you see?' }}</h2>
\r
      @if (phase() === 'settled') {\r
        <div class="readout" aria-live="polite">\r
          <div>\r
            <small>Particles before</small>\r
            <strong>{{ trial().beforeParticles }}</strong>\r
          </div>\r
          <div>\r
            <small>Particles after</small>\r
            <strong>{{ insideCount() }}</strong>\r
          </div>\r
          <div>\r
            <small>Mass before</small>\r
            <strong>{{ trial().beforeMass.toFixed(1) }} g</strong>\r
          </div>\r
          <div>\r
            <small>Mass after</small>\r
            <strong>{{ mass().toFixed(1) }} g</strong>\r
          </div>\r
        </div>\r
\r
        @if (!preview) {
        <label class="observation-field">
          Write what happened to the matter\r
          <textarea\r
            rows="4"\r
            [ngModel]="observation()"\r
            (ngModelChange)="observation.set($event)"\r
            placeholder="The particles\u2026 and the balance\u2026"\r
          ></textarea>\r
        </label>\r
        <button class="primary-action" type="button" [disabled]="!canCapture()" (click)="capture()">\r
          Save observation\r
        </button>\r
        @if (!canCapture()) {\r
          <p class="record-note">\r
            The tracker will not file a trial until you describe it in your own words.\r
          </p>\r
        }\r
        } @else { <p class="record-note">Trial retained in the local log. Change chambers or run again to compare.</p> }
      } @else {
        <p class="record-note">
          Nothing to record yet. Run a chamber and watch the particles and the balance together.\r
        </p>\r
      }\r
    </aside>\r
  </div>\r
</section>\r
`, styles: ['/* src/app/projects/mystery-substance/conservation-chamber.component.scss */\n:host {\n  position: absolute;\n  inset: 0;\n  display: block;\n}\nbutton,\ntextarea,\ninput {\n  font: inherit;\n}\nbutton {\n  color: inherit;\n}\nbutton:focus-visible,\ntextarea:focus-visible,\ninput:focus-visible {\n  outline: 2px solid #88e4df;\n  outline-offset: 2px;\n}\n.matter-canvas,\n.matter-scene,\n.matter-shade {\n  position: absolute;\n  inset: 0;\n}\n.matter-canvas {\n  overflow: auto;\n  color: #ebf7fc;\n  background: #04101a;\n}\n.matter-scene {\n  z-index: 0;\n  background: url(/conservation-test-scenes-v2.webp) left center/200% 100% no-repeat;\n  background-color: #04101a;\n  filter: saturate(0.85) brightness(0.34);\n}\n.matter-shade {\n  z-index: 1;\n  background:\n    radial-gradient(\n      circle at 45% 30%,\n      rgba(96, 197, 205, 0.12),\n      transparent 58%),\n    linear-gradient(\n      180deg,\n      rgba(3, 12, 19, 0.76),\n      rgba(3, 12, 19, 0.95));\n}\n.matter-grid {\n  position: relative;\n  z-index: 2;\n  display: grid;\n  min-height: 100%;\n  align-items: start;\n  gap: 0.85rem;\n  grid-template-columns: minmax(12rem, 0.8fr) minmax(0, 2fr) minmax(12rem, 0.85fr);\n  padding: 0.9rem;\n}\n.kicker {\n  color: #79d8d5;\n  font-size: 0.6rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh1 {\n  margin: 0;\n  color: #f3fbfd;\n  font-size: clamp(1rem, 1.8vw, 1.3rem);\n  font-weight: 850;\n}\nh2 {\n  margin: 0.1rem 0 0;\n  color: #eef8fa;\n  font-size: 0.95rem;\n  font-weight: 850;\n}\n.rack,\n.record {\n  display: grid;\n  align-content: start;\n  gap: 0.5rem;\n  border: 1px solid #2b4d5f;\n  border-radius: 0.7rem;\n  padding: 0.8rem;\n  background: rgba(6, 21, 31, 0.9);\n}\n.rack-note,\n.record-note {\n  margin: 0;\n  color: #8aa8b5;\n  font-size: 0.66rem;\n  line-height: 1.4;\n}\n.chamber-list,\n.trial-log {\n  display: grid;\n  margin: 0;\n  padding: 0;\n  gap: 0.35rem;\n  list-style: none;\n}\n.chamber-list button {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  gap: 0.55rem;\n  border: 1px solid #2d5162;\n  border-radius: 0.5rem;\n  padding: 0.45rem 0.55rem;\n  color: #a9c6d1;\n  text-align: left;\n  background: rgba(11, 33, 45, 0.9);\n  cursor: pointer;\n}\n.chamber-list button.active {\n  border-color: #7fe3dd;\n  color: #f2fdfd;\n  background: rgba(20, 69, 79, 0.95);\n}\n.chamber-list button:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.chamber-list span:last-child {\n  display: grid;\n  gap: 0.05rem;\n}\n.chamber-list strong {\n  font-size: 0.74rem;\n  font-weight: 800;\n}\n.chamber-list small {\n  color: #7f9ead;\n  font-size: 0.58rem;\n  text-transform: capitalize;\n}\n.chamber-icon {\n  display: block;\n  width: 1.5rem;\n  height: 1.3rem;\n  flex: 0 0 auto;\n  border: 2px solid #9fd2e0;\n  border-radius: 0.15rem;\n}\n.chamber-icon[data-system=open] {\n  border-top-color: transparent;\n  border-top-style: dashed;\n}\n.boundary-toggle {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  color: #bcd7df;\n  font-size: 0.66rem;\n  font-weight: 700;\n  cursor: pointer;\n}\n.trial-log li {\n  display: grid;\n  gap: 0.05rem;\n  border-left: 2px solid #2f6570;\n  padding-left: 0.5rem;\n}\n.trial-log strong {\n  color: #e4f2f6;\n  font-size: 0.66rem;\n}\n.trial-log small {\n  color: #8aa8b5;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 0.58rem;\n}\n.stage {\n  display: grid;\n  align-content: start;\n  gap: 0.7rem;\n  border: 1px solid #2f5972;\n  border-radius: 0.8rem;\n  padding: 0.9rem;\n  background: rgba(5, 19, 28, 0.74);\n}\n.stage-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.8rem;\n}\n.particle-count {\n  display: grid;\n  justify-items: end;\n  border: 1px solid #2f6570;\n  border-radius: 0.5rem;\n  padding: 0.25rem 0.6rem;\n  background: #061c26;\n}\n.particle-count small {\n  color: #7f9ead;\n  font-size: 0.52rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.particle-count strong {\n  color: #7fe3dd;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 1.4rem;\n  line-height: 1;\n}\n.chamber-well {\n  display: grid;\n  justify-items: center;\n  gap: 0.4rem;\n  border: 1px solid #24485a;\n  border-radius: 0.6rem;\n  padding: 0.9rem;\n  background:\n    radial-gradient(\n      ellipse at 50% 20%,\n      rgba(120, 210, 215, 0.09),\n      transparent 62%),\n    rgba(3, 14, 21, 0.6);\n}\n.part-plate {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  pointer-events: none;\n}\n.chamber {\n  position: relative;\n  width: min(100%, 22rem);\n  aspect-ratio: 1.21;\n}\n.chamber svg {\n  position: relative;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n}\n.chamber-wall {\n  fill: none;\n  stroke: #9fd2e0;\n  stroke-linejoin: round;\n  stroke-width: 2.4;\n}\n.chamber-lid {\n  stroke: #9fd2e0;\n  stroke-linecap: round;\n  stroke-width: 2.8;\n}\n.chamber.open .chamber-lid {\n  stroke: #e0b64a;\n}\n.boundary {\n  fill: rgba(127, 227, 221, 0.05);\n  stroke: #7fe3dd;\n  stroke-dasharray: 5 4;\n  stroke-width: 1.2;\n}\n.particle {\n  fill: #bfeef0;\n  transition: fill 0.2s ease;\n}\n.particle.gone {\n  fill: #e0b64a;\n  opacity: 0.85;\n}\n.vent-label {\n  position: absolute;\n  top: -0.2rem;\n  left: 50%;\n  color: #e0b64a;\n  font-size: 0.55rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  transform: translateX(-50%);\n}\n.balance {\n  position: relative;\n  display: grid;\n  width: min(100%, 15rem);\n  justify-items: center;\n  aspect-ratio: 2.6;\n}\n.balance-body {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  justify-items: center;\n  gap: 0.1rem;\n  border: 1px solid #33697a;\n  border-radius: 0.45rem;\n  padding: 0.35rem 0.9rem;\n  background: #0a2531;\n}\n.balance-read {\n  color: #cfe4ea;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 1.5rem;\n  font-weight: 800;\n  line-height: 1;\n  transition: color 0.3s ease;\n}\n.balance-read span {\n  font-size: 0.72rem;\n}\n.balance-read.falling {\n  color: #e0b64a;\n}\n.balance-delta {\n  color: #7f9ead;\n  font-size: 0.58rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.balance-plinth {\n  width: 11rem;\n  height: 0.5rem;\n  border-radius: 0.15rem;\n  background:\n    linear-gradient(\n      180deg,\n      #cfe6ee,\n      #6f95a2);\n}\n.stage-controls {\n  display: grid;\n  gap: 0.5rem;\n}\n.stage-hint {\n  margin: 0;\n  color: #9dbcc8;\n  font-size: 0.72rem;\n}\n.stage-buttons {\n  display: flex;\n  gap: 0.5rem;\n}\n.primary-action {\n  flex: 1;\n  border: 0;\n  border-radius: 0.5rem;\n  padding: 0.55rem 0.8rem;\n  color: #04212a;\n  background:\n    linear-gradient(\n      135deg,\n      #a0f1e8,\n      #5dc9d0);\n  font-size: 0.75rem;\n  font-weight: 850;\n  cursor: pointer;\n}\n.primary-action:disabled {\n  color: #7f9ead;\n  background: #16323f;\n  cursor: not-allowed;\n}\n.ghost-action {\n  border: 1px solid #33697a;\n  border-radius: 0.5rem;\n  padding: 0.55rem 0.8rem;\n  color: #bdeae7;\n  background: transparent;\n  font-size: 0.7rem;\n  font-weight: 800;\n  cursor: pointer;\n}\n.ghost-action:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n.readout {\n  display: grid;\n  gap: 0.2rem;\n  border: 1px solid #2d5162;\n  border-radius: 0.5rem;\n  padding: 0.45rem 0.55rem;\n  background: rgba(11, 33, 45, 0.85);\n}\n.readout div {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.readout small {\n  color: #7c9aa8;\n  font-size: 0.58rem;\n  font-weight: 700;\n}\n.readout strong {\n  color: #dcecf1;\n  font-family:\n    ui-monospace,\n    "SFMono-Regular",\n    monospace;\n  font-size: 0.7rem;\n}\n.observation-field {\n  display: grid;\n  gap: 0.25rem;\n  color: #a9c6d1;\n  font-size: 0.62rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.observation-field textarea {\n  border: 1px solid #2f5566;\n  border-radius: 0.5rem;\n  padding: 0.5rem;\n  color: #eaf6f9;\n  background: #071c27;\n  font-size: 0.74rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  resize: vertical;\n  text-transform: none;\n}\n@container (max-width: 1180px) {\n  .matter-grid {\n    grid-template-columns: minmax(11rem, 0.8fr) minmax(0, 2fr);\n  }\n  .record {\n    grid-column: 1/-1;\n  }\n}\n@container (max-width: 820px) {\n  .matter-grid {\n    grid-template-columns: 1fr;\n  }\n  .record {\n    grid-column: auto;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .particle,\n  .balance-read {\n    transition-duration: 0.001ms;\n  }\n}\n:host {\n  container-type: inline-size;\n}\n:host(.workbench-station) {\n  position: relative;\n  inset: auto;\n}\n:host(.workbench-station) .matter-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 34rem;\n  overflow: visible;\n}\n:host(.workbench-station) .matter-canvas {\n  min-height: 100dvh;\n}\n.matter-grid {\n  padding-top: 80px;\n  grid-template-columns: minmax(180px, 0.6fr) minmax(0, 1.7fr);\n}\n.matter-grid.has-record {\n  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 1fr);\n}\n.matter-grid.has-record .rack {\n  display: none;\n}\n.record {\n  grid-column: auto;\n}\n.record[hidden],\n.kicker,\n.trial-log {\n  display: none;\n}\n@container (max-width: 700px) {\n  .matter-grid,\n  .matter-grid.has-record {\n    grid-template-columns: 1fr;\n  }\n}\n:host(.lab-preview) {\n  position: relative;\n  inset: auto;\n  display: block;\n  container-type: inline-size;\n}\n:host(.lab-preview) .lab-canvas,\n:host(.lab-preview) .bench-canvas,\n:host(.lab-preview) .matter-canvas,\n:host(.lab-preview) .bay-canvas,\n:host(.lab-preview) .station-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 0;\n  overflow: visible;\n}\n:host(.lab-preview) .lab-grid,\n:host(.lab-preview) .bench-grid,\n:host(.lab-preview) .matter-grid,\n:host(.lab-preview) .bay-grid {\n  padding: 14px;\n  min-height: 0;\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n  gap: 12px;\n}\n:host(.lab-preview) .lab-grid.has-record,\n:host(.lab-preview) .bench-grid.has-record,\n:host(.lab-preview) .matter-grid.has-record {\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n}\n:host(.lab-preview) .lab-grid.has-record .rack,\n:host(.lab-preview) .bench-grid.has-record .rack,\n:host(.lab-preview) .matter-grid.has-record .rack {\n  display: block;\n}\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  grid-column: 1/-1;\n}\n:host(.lab-preview) .record[hidden] {\n  display: none;\n}\n:host(.lab-preview) .stage,\n:host(.lab-preview) .rig,\n:host(.lab-preview) .rack,\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  min-width: 0;\n}\n:host(.lab-preview) .kicker,\n:host(.lab-preview) .instrument-copy small,\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  display: block;\n}\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  max-height: 200px;\n  overflow: auto;\n}\n:host(.lab-preview) .instrument-well,\n:host(.lab-preview) .chamber-well {\n  min-height: 230px;\n}\n:host(.lab-preview) .instrument-well {\n  height: 245px;\n}\n:host(.lab-preview) .stage-controls {\n  margin-top: 10px;\n}\n:host(.lab-preview) .preview-run {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0;\n}\n:host(.lab-preview) .preview-run .primary-action {\n  width: auto;\n}\n:host(.lab-preview) .preview-run p {\n  flex-basis: 100%;\n  margin: 0;\n}\n:host(.lab-preview) h1 {\n  font-size: 1.2rem;\n}\n:host(.lab-preview) h2 {\n  font-size: 1rem;\n}\n:host(.lab-preview) button,\n:host(.lab-preview) select {\n  min-height: 44px;\n  font-size: 0.87rem;\n}\n:host(.lab-preview) small,\n:host(.lab-preview) .record-note,\n:host(.lab-preview) .stage-hint,\n:host(.lab-preview) .rig-hint,\n:host(.lab-preview) .hint,\n:host(.lab-preview) .readout small,\n:host(.lab-preview) .readout strong,\n:host(.lab-preview) .readout-stack small,\n:host(.lab-preview) .readout-stack strong,\n:host(.lab-preview) .rack-note {\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n:host(.lab-preview) input[type=range] {\n  min-height: 32px;\n}\n:host(.lab-preview) :is(button, select, summary, input):focus-visible {\n  outline: 3px solid #a9efdc;\n  outline-offset: 3px;\n}\n@container (max-width: 640px) {\n  :host(.lab-preview) .lab-grid,\n  :host(.lab-preview) .bench-grid,\n  :host(.lab-preview) .matter-grid,\n  :host(.lab-preview) .bay-grid,\n  :host(.lab-preview) .lab-grid.has-record,\n  :host(.lab-preview) .bench-grid.has-record,\n  :host(.lab-preview) .matter-grid.has-record,\n  :host(.lab-preview) .restoration-stage {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 10px;\n  }\n  :host(.lab-preview) .stage,\n  :host(.lab-preview) .rig {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .rack {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .bay-grid .rack {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .bay-grid .stage {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .test-list,\n  :host(.lab-preview) .shelf-plan {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  :host(.lab-preview) .instrument-list,\n  :host(.lab-preview) .chamber-list {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  :host(.lab-preview) .focus-specimen {\n    max-width: 130px;\n    justify-self: center;\n  }\n  :host(.lab-preview) .focus-specimen img {\n    max-height: 150px;\n  }\n  :host(.lab-preview) .chamber-well {\n    gap: 8px;\n  }\n  :host(.lab-preview) .probe-rig {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=conservation-chamber.component.css.map */\n'] }]
  }], () => [], { initialChamberId: [{ type: Input, args: [{ isSignal: true, alias: "initialChamberId", required: false }] }], captured: [{ type: Output, args: ["captured"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConservationChamberComponent, { className: "ConservationChamberComponent", filePath: "src/app/projects/mystery-substance/conservation-chamber.component.ts", lineNumber: 50 });
})();

// src/app/projects/mystery-substance/emergency.config.ts
var emergencyBudgetMinutes = 25;
var emergencyRetryMinutes = 12;
var defaultTubIdentity = "bicarbonate";
var emergencyBriefing = {
  time: "08:40",
  location: "Bay 3 \xB7 boiler room",
  headline: "A drum of acidic descaler has split open.",
  situation: "Nobody is hurt \u2014 the room was sealed and empty. The crew cannot go in and the building stays cold until the floor is neutralised. The fire marshal needs sodium bicarbonate.",
  shipment: "Harbor Ridge Elementary sent their spare stock. The shipping label soaked through in transit; the seal is intact. Their office will not confirm what is inside it.",
  quote: "We think it is the bicarb. We are not certain. Please check it before you put it on anything.",
  attribution: "Harbor Ridge Elementary \xB7 front office, 08:37",
  constraint: "The marshal will not authorise pouring an unidentified white powder onto an acid spill."
};
var emergencyTests = [
  {
    id: "appearance",
    title: "Optical scan",
    instrument: "6\xD7 magnifier",
    cost: 2,
    prompt: "Cheap and quick. Ask yourself first whether it can settle anything.",
    decisive: false
  },
  {
    id: "solubility",
    title: "Water trial",
    instrument: "50 mL water cup",
    cost: 6,
    prompt: "Same mass, same water, same mixing time as the shelf trials.",
    decisive: true
  },
  {
    id: "calibration",
    title: "Probe calibration",
    instrument: "Reference solution",
    cost: 3,
    prompt: "The probe reads nothing you can defend until it is calibrated.",
    decisive: false
  },
  {
    id: "conductivity",
    title: "Probe trial",
    instrument: "Calibrated probe",
    cost: 4,
    prompt: "Needs a calibrated probe and a solution to dip it in.",
    requires: "calibration",
    decisive: true
  },
  {
    id: "acid",
    title: "Acid screen \xB7 Solution A",
    instrument: "Sealed vessel",
    cost: 5,
    prompt: "Add 5 mL to a 2 g sample in a closed vessel. Watch for gas.",
    decisive: true
  },
  {
    id: "indicator",
    title: "Indicator B",
    instrument: "Three drops, equal light",
    cost: 4,
    prompt: "Three drops under equal lighting. Watch the colour.",
    decisive: true
  },
  {
    id: "conservation",
    title: "Sealed and open mass run",
    instrument: "Balance and particle counter",
    cost: 8,
    prompt: "Confirms where gas went. It corroborates an answer; it does not find one.",
    decisive: false
  }
];
var emergencyOutcomes = {
  bicarbonate: {
    appearance: {
      reading: "Fine white powder, no clear crystal faces",
      magnification: "6\xD7",
      separates: "no \u2014 both candidates look like this"
    },
    solubility: {
      reading: "Cloudy at first, then mostly clear",
      elapsedSeconds: "11 s",
      settledLayer: "none at 60 s"
    },
    calibration: {
      reading: "Probe reads 0.0 mS in the reference",
      status: "passed",
      separates: "no \u2014 this only makes the next reading defensible"
    },
    conductivity: {
      reading: "Probe bar rises and the lamp glows",
      millisiemens: "6.2",
      calibration: "passed"
    },
    acid: {
      reading: "Rapid bubbles for 18 s",
      gas: "produced",
      temperature: "22 \xB0C \u2192 19 \xB0C"
    },
    indicator: {
      reading: "Amber turns light tan",
      colorBefore: "amber",
      colorAfter: "light tan"
    },
    conservation: {
      reading: "Open chamber loses mass, sealed chamber holds",
      particles: "24 \u2192 19 in the open chamber",
      mass: "124.8 g \u2192 123.5 g"
    }
  },
  cornstarch: {
    appearance: {
      reading: "Very fine white powder, clings in clumps",
      magnification: "6\xD7",
      separates: "no \u2014 both candidates look like this"
    },
    solubility: {
      reading: "Cloudy suspension remains",
      elapsedSeconds: "60 s",
      settledLayer: "thin layer begins"
    },
    calibration: {
      reading: "Probe reads 0.0 mS in the reference",
      status: "passed",
      separates: "no \u2014 this only makes the next reading defensible"
    },
    conductivity: {
      reading: "Probe bar stays near baseline",
      millisiemens: "0.1",
      calibration: "passed"
    },
    acid: {
      reading: "No gas visible for the full 60 s",
      gas: "none",
      temperature: "22 \xB0C \u2192 22 \xB0C"
    },
    indicator: {
      reading: "Amber turns dark blue-black",
      colorBefore: "amber",
      colorAfter: "dark blue-black"
    },
    conservation: {
      reading: "Both chambers hold their mass",
      particles: "24 \u2192 24 in both chambers",
      mass: "126.4 g \u2192 126.4 g"
    }
  }
};
var priorRecords = [
  {
    testId: "appearance",
    label: "Optical scan",
    vialC: "Fine white powder",
    vialD: "Very fine white powder"
  },
  {
    testId: "solubility",
    label: "Water trial",
    vialC: "Cloudy at first; mostly clear",
    vialD: "Cloudy suspension remains"
  },
  {
    testId: "conductivity",
    label: "Probe trial",
    vialC: "6.4 mS \xB7 lamp glows",
    vialD: "0.1 mS \xB7 near baseline"
  },
  {
    testId: "acid",
    label: "Solution A",
    vialC: "Rapid bubbles for 18 s",
    vialD: "No gas visible"
  },
  {
    testId: "indicator",
    label: "Indicator B",
    vialC: "Amber \u2192 light tan",
    vialD: "Amber \u2192 dark blue-black"
  }
];
var emergencyCalls = [
  {
    id: "bicarbonate",
    title: "It is sodium bicarbonate",
    detail: "Authorise the pour. The crew neutralises Bay 3 with it."
  },
  {
    id: "cornstarch",
    title: "It is cornstarch",
    detail: "Stop the pour. It will not neutralise anything; the district must source bicarbonate."
  },
  {
    id: "contain",
    title: "Contain for confirmation",
    detail: "We do not have the evidence to authorise this. Seal it and wait for a lab."
  }
];
function judgeCall(call, tub, decisiveTestsRun) {
  if (call === "contain") {
    return {
      id: "held",
      tone: "warn",
      label: "Held for confirmation",
      headline: "You refused to authorise it.",
      detail: "Bay 3 stays cold and the district sources bicarbonate overnight. Nobody was sent in on evidence you did not have \u2014 that is a defensible scientific decision, and the review board will treat it as one.",
      neutralises: false
    };
  }
  if (call !== tub) {
    return {
      id: "wrong",
      tone: "bad",
      label: "Call rejected",
      headline: tub === "bicarbonate" ? "You stopped a pour that would have worked." : "It did not neutralise anything.",
      detail: tub === "bicarbonate" ? "The marshal held the crew back on your word. A later screen found bicarbonate in the tub \u2014 the acid could have been down hours ago. Look again at what your tests actually showed." : "The crew poured it onto the spill and nothing happened. The floor is still acidic and they were standing on it. Look again at what your tests actually showed.",
      neutralises: false
    };
  }
  if (decisiveTestsRun === 0) {
    return {
      id: "unsupported",
      tone: "warn",
      label: "Right answer, no evidence",
      headline: "You were right. You could not have known that.",
      detail: "Not one test you ran can separate bicarbonate from cornstarch. The marshal acted on a guess that happened to land. The review board scores the reasoning, not the luck \u2014 run a test that could have told the two apart.",
      neutralises: call === "bicarbonate"
    };
  }
  if (call === "bicarbonate") {
    return {
      id: "neutralised",
      tone: "good",
      label: "Authorised",
      headline: "Bay 3 is neutralising.",
      detail: "The crew spread it across the floor and it began to fizz on contact. Every bubble is carbon dioxide leaving the acid \u2014 the same gas you counted in the sealed chamber. The heat is back on by lunch.",
      neutralises: true
    };
  }
  return {
    id: "averted",
    tone: "good",
    label: "Pour stopped",
    headline: "You stopped the pour, and you were right.",
    detail: "The tub was cornstarch. Spread on the spill it would have done nothing at all while the crew believed the floor was safe. The district has real bicarbonate on the way because you said so.",
    neutralises: false
  };
}

// src/app/projects/mystery-substance/emergency-response.component.ts
var _forTrack04 = ($index, $item) => $item.id;
var _forTrack13 = ($index, $item) => $item.attempt;
var _forTrack23 = ($index, $item) => $item.testId;
var _forTrack3 = ($index, $item) => $item.label;
function EmergencyResponseComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "article", 33)(2, "header")(3, "span", 34);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h1", 35);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "blockquote");
    \u0275\u0275text(12);
    \u0275\u0275elementStart(13, "cite");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "p", 36);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "footer")(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 37);
    \u0275\u0275listener("click", function EmergencyResponseComponent_Conditional_3_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.briefingOpen.set(false));
    });
    \u0275\u0275text(21, " Take the bench ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("Incident \xB7 ", ctx_r1.briefing.time, " \xB7 ", ctx_r1.briefing.location);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.briefing.headline);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.briefing.situation);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.briefing.shipment);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.briefing.quote, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.briefing.attribution);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.briefing.constraint);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("You have ", ctx_r1.minutesLeft(), " minutes of bench time. The crew is waiting.");
  }
}
function EmergencyResponseComponent_Conditional_36_For_8_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const test_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", test_r4.title, ": ", test_r4.reading);
  }
}
function EmergencyResponseComponent_Conditional_36_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ul");
    \u0275\u0275repeaterCreate(3, EmergencyResponseComponent_Conditional_36_For_8_For_4_Template, 2, 2, "li", null, _forTrack04);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("Attempt ", entry_r5.attempt, " \xB7 ", entry_r5.minutesLeft, " minutes left \xB7 ", entry_r5.call ?? "No response chosen");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(entry_r5.tests);
  }
}
function EmergencyResponseComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Supplied C/D comparison records \xB7 sample reference data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 38);
    \u0275\u0275listener("click", function EmergencyResponseComponent_Conditional_36_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.restartPreview());
    });
    \u0275\u0275text(3, "Restart with 25 minutes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "details")(5, "summary");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, EmergencyResponseComponent_Conditional_36_For_8_Template, 5, 3, null, null, _forTrack13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !!ctx_r1.running());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Earlier attempts (", ctx_r1.attemptHistory().length, ")");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.attemptHistory());
  }
}
function EmergencyResponseComponent_Conditional_37_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const record_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r6.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r6.vialC);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r6.vialD);
  }
}
function EmergencyResponseComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 20)(1, "thead")(2, "tr")(3, "th", 39);
    \u0275\u0275text(4, "Test");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 39);
    \u0275\u0275text(6, "Vial C");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 39);
    \u0275\u0275text(8, "Vial D");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275repeaterCreate(10, EmergencyResponseComponent_Conditional_37_For_11_Template, 7, 3, "tr", null, _forTrack23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r1.priorRecords);
  }
}
function EmergencyResponseComponent_For_56_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Running\u2026 ");
  }
}
function EmergencyResponseComponent_For_56_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", ctx, " ");
  }
}
function EmergencyResponseComponent_For_56_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Buy ");
  }
}
function EmergencyResponseComponent_For_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 41);
    \u0275\u0275listener("click", function EmergencyResponseComponent_For_56_Template_button_click_1_listener() {
      const test_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runTest(test_r8));
    });
    \u0275\u0275elementStart(2, "span", 42);
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5, "min");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 43)(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "em");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "span", 44);
    \u0275\u0275conditionalCreate(14, EmergencyResponseComponent_For_56_Conditional_14_Template, 1, 0)(15, EmergencyResponseComponent_For_56_Conditional_15_Template, 1, 1)(16, EmergencyResponseComponent_For_56_Conditional_16_Template, 1, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_17_0;
    const test_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("done", ctx_r1.hasRun(test_r8.id))("busy", ctx_r1.running() === test_r8.id);
    \u0275\u0275property("disabled", ctx_r1.blockedReason(test_r8) !== void 0 || ctx_r1.running() !== void 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(test_r8.cost);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(test_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(test_r8.instrument);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(test_r8.prompt);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.running() === test_r8.id ? 14 : (tmp_17_0 = ctx_r1.blockedReason(test_r8)) ? 15 : 16, tmp_17_0);
  }
}
function EmergencyResponseComponent_Conditional_57_For_5_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const field_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r9.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r9.value);
  }
}
function EmergencyResponseComponent_Conditional_57_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "header")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "dl");
    \u0275\u0275repeaterCreate(9, EmergencyResponseComponent_Conditional_57_For_5_For_10_Template, 5, 2, "div", null, _forTrack3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r10 = ctx.$implicit;
    \u0275\u0275classProp("decisive", result_r10.decisive);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(result_r10.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("\u2212", result_r10.cost, " min \xB7 ", result_r10.clockAfter, " min left");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r10.reading);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(result_r10.fields);
  }
}
function EmergencyResponseComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 26)(1, "span", 6);
    \u0275\u0275text(2, "What the bench reported");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ol");
    \u0275\u0275repeaterCreate(4, EmergencyResponseComponent_Conditional_57_For_5_Template, 11, 6, "li", 45, _forTrack04);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.ran());
  }
}
function EmergencyResponseComponent_For_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function EmergencyResponseComponent_For_65_Template_button_click_0_listener() {
      const option_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.chooseCall(option_r12.id));
    });
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const option_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ctx_r1.call() === option_r12.id);
    \u0275\u0275property("disabled", ctx_r1.verdict() !== void 0);
    \u0275\u0275attribute("aria-pressed", ctx_r1.call() === option_r12.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r12.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r12.detail);
  }
}
function EmergencyResponseComponent_Conditional_66_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function EmergencyResponseComponent_Conditional_66_For_4_Template_button_click_0_listener() {
      const result_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleCitation(result_r14.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r1.cited(result_r14.id));
    \u0275\u0275property("disabled", ctx_r1.verdict() !== void 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", result_r14.title, " ");
  }
}
function EmergencyResponseComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1, "Evidence you are standing on");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 47);
    \u0275\u0275repeaterCreate(3, EmergencyResponseComponent_Conditional_66_For_4_Template, 2, 4, "button", 30, _forTrack04);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.ran());
  }
}
function EmergencyResponseComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 48);
    \u0275\u0275text(1, " Why does your evidence say that? ");
    \u0275\u0275elementStart(2, "textarea", 49);
    \u0275\u0275listener("ngModelChange", function EmergencyResponseComponent_Conditional_67_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reasoning.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label", 50);
    \u0275\u0275text(4, " Confidence before the pour ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 51);
    \u0275\u0275listener("input", function EmergencyResponseComponent_Conditional_67_Template_input_input_7_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setConfidence($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.reasoning())("disabled", ctx_r1.verdict() !== void 0);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.confidence(), "%");
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.confidence())("disabled", ctx_r1.verdict() !== void 0);
  }
}
function EmergencyResponseComponent_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function EmergencyResponseComponent_Conditional_68_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.fileCall());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r1.canFile());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.preview ? "Simulate response" : "Radio the marshal", " ");
  }
}
function EmergencyResponseComponent_Conditional_69_Conditional_7_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "circle");
  }
  if (rf & 2) {
    const bubble_r17 = ctx.$implicit;
    \u0275\u0275attribute("cx", bubble_r17.x)("cy", bubble_r17.y)("r", bubble_r17.size);
  }
}
function EmergencyResponseComponent_Conditional_69_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 55);
    \u0275\u0275element(2, "rect", 56)(3, "rect", 57);
    \u0275\u0275repeaterCreate(4, EmergencyResponseComponent_Conditional_69_Conditional_7_For_5_Template, 1, 3, ":svg:circle", null, _forTrack04);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "p", 58)(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " carbon dioxide particles released ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.fizz());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.gasCount());
  }
}
function EmergencyResponseComponent_Conditional_69_Conditional_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function EmergencyResponseComponent_Conditional_69_Conditional_9_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.tryAgain());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" The crew is still outside \u2014 ", ctx_r1.retryMinutes, " minutes left ");
  }
}
function EmergencyResponseComponent_Conditional_69_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, EmergencyResponseComponent_Conditional_69_Conditional_9_Conditional_0_Template, 2, 1, "button", 59);
    \u0275\u0275elementStart(1, "button", 37);
    \u0275\u0275listener("click", function EmergencyResponseComponent_Conditional_69_Conditional_9_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.captureRecord());
    });
    \u0275\u0275text(2, " File the incident record ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r20 = \u0275\u0275nextContext();
    \u0275\u0275conditional(result_r20.id === "wrong" ? 0 : -1);
  }
}
function EmergencyResponseComponent_Conditional_69_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Simulated consequence only. No assessment or submission recorded.");
    \u0275\u0275elementEnd();
  }
}
function EmergencyResponseComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 32)(1, "span", 52);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, EmergencyResponseComponent_Conditional_69_Conditional_7_Template, 10, 1, "div", 53);
    \u0275\u0275elementStart(8, "div", 54);
    \u0275\u0275conditionalCreate(9, EmergencyResponseComponent_Conditional_69_Conditional_9_Template, 3, 1)(10, EmergencyResponseComponent_Conditional_69_Conditional_10_Template, 2, 0, "p");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r20 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("data-tone", result_r20.tone);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r20.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r20.headline);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r20.detail);
    \u0275\u0275advance();
    \u0275\u0275conditional(result_r20.neutralises ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.preview ? 9 : 10);
  }
}
var runDurationMs2 = 1400;
var tickMs3 = 40;
var neutraliseTargetCount = 24;
var EmergencyResponseComponent = class _EmergencyResponseComponent {
  preview = inject(LAB_AUTHORING_PREVIEW);
  captured = output();
  /** What the teacher loaded into the tub. Never shown until the call is filed. */
  tub = input(
    defaultTubIdentity,
    ...ngDevMode ? [{ debugName: "tub" }] : (
      /* istanbul ignore next */
      []
    )
  );
  briefing = emergencyBriefing;
  tests = emergencyTests;
  calls = emergencyCalls;
  priorRecords = priorRecords;
  retryMinutes = emergencyRetryMinutes;
  renderQuality = inject(RenderQualityService);
  briefingOpen = signal(
    !this.preview,
    ...ngDevMode ? [{ debugName: "briefingOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  attemptHistory = signal(
    [],
    ...ngDevMode ? [{ debugName: "attemptHistory" }] : (
      /* istanbul ignore next */
      []
    )
  );
  minutesLeft = signal(
    emergencyBudgetMinutes,
    ...ngDevMode ? [{ debugName: "minutesLeft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  running = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "running" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ran = signal(
    [],
    ...ngDevMode ? [{ debugName: "ran" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showPrior = signal(
    false,
    ...ngDevMode ? [{ debugName: "showPrior" }] : (
      /* istanbul ignore next */
      []
    )
  );
  call = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "call" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reasoning = signal(
    "",
    ...ngDevMode ? [{ debugName: "reasoning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  confidence = signal(
    50,
    ...ngDevMode ? [{ debugName: "confidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  citedTestIds = signal(
    [],
    ...ngDevMode ? [{ debugName: "citedTestIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  verdict = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "verdict" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Second attempt after a rejected call — the crew is still outside. */
  attempt = signal(
    1,
    ...ngDevMode ? [{ debugName: "attempt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fizz = signal(
    [],
    ...ngDevMode ? [{ debugName: "fizz" }] : (
      /* istanbul ignore next */
      []
    )
  );
  gasCount = signal(
    0,
    ...ngDevMode ? [{ debugName: "gasCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  timer;
  checkpoint;
  constructor() {
    persistWorkspaceDraft("emergency-response", () => {
      if (!this.running())
        this.checkpoint = this.readDraft();
      return this.checkpoint;
    }, (saved) => {
      if (!saved || saved.tub !== this.tub())
        return;
      this.minutesLeft.set(saved.minutesLeft);
      this.ran.set(saved.ran);
      this.call.set(saved.call);
      this.reasoning.set(saved.reasoning);
      this.confidence.set(saved.confidence);
      this.citedTestIds.set(saved.citedTestIds);
      this.verdict.set(saved.verdict);
      this.attempt.set(saved.attempt);
      this.briefingOpen.set(saved.briefingOpen);
      if (Array.isArray(saved.attemptHistory))
        this.attemptHistory.set(saved.attemptHistory);
    });
  }
  readDraft() {
    return {
      tub: this.tub(),
      minutesLeft: this.minutesLeft(),
      ran: this.ran(),
      call: this.call(),
      reasoning: this.reasoning(),
      confidence: this.confidence(),
      citedTestIds: this.citedTestIds(),
      verdict: this.verdict(),
      attempt: this.attempt(),
      briefingOpen: this.briefingOpen(),
      attemptHistory: this.attemptHistory()
    };
  }
  ngOnDestroy() {
    this.stop();
  }
  clockLabel = computed(
    () => {
      const minutes = Math.max(this.minutesLeft(), 0);
      return `${String(minutes).padStart(2, "0")}:00`;
    },
    ...ngDevMode ? [{ debugName: "clockLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  clockPercent = computed(
    () => Math.max(this.minutesLeft() / emergencyBudgetMinutes * 100, 0),
    ...ngDevMode ? [{ debugName: "clockPercent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  outOfTime = computed(
    () => this.minutesLeft() <= 0,
    ...ngDevMode ? [{ debugName: "outOfTime" }] : (
      /* istanbul ignore next */
      []
    )
  );
  decisiveRun = computed(
    () => this.ran().filter((test) => test.decisive).length,
    ...ngDevMode ? [{ debugName: "decisiveRun" }] : (
      /* istanbul ignore next */
      []
    )
  );
  spent = computed(
    () => this.ran().reduce((total, test) => total + test.cost, 0),
    ...ngDevMode ? [{ debugName: "spent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canFile = computed(
    () => this.verdict() === void 0 && this.call() !== void 0 && (this.preview || this.reasoning().trim().length > 0),
    ...ngDevMode ? [{ debugName: "canFile" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hint = computed(
    () => {
      if (this.verdict() !== void 0) {
        if (this.preview)
          return "Simulation outcome retained locally. Restart the incident to try another test sequence.";
        return "File the record so the review board can read what you did.";
      }
      if (this.outOfTime()) {
        return "The clock is gone. Make the call you can defend with what you already have.";
      }
      if (this.ran().length === 0) {
        return "Twenty-five minutes buys about three tests. Choose the ones that could tell the two apart.";
      }
      return "Every test costs the crew time. Before you buy one, say what it could rule out.";
    },
    ...ngDevMode ? [{ debugName: "hint" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Reasons a test cannot be bought right now, in the order they bite. */
  blockedReason(test) {
    if (this.hasRun(test.id)) {
      return "Already run";
    }
    if (this.verdict() !== void 0) {
      return "Call filed";
    }
    if (test.cost > this.minutesLeft()) {
      return "Not enough time left";
    }
    if (test.requires !== void 0 && !this.hasRun(test.requires)) {
      const required = this.tests.find((item) => item.id === test.requires);
      return `Needs ${required?.title ?? test.requires} first`;
    }
    return void 0;
  }
  hasRun(id) {
    return this.ran().some((test) => test.id === id);
  }
  cited(id) {
    return this.citedTestIds().includes(id);
  }
  toggleCitation(id) {
    this.citedTestIds.update((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }
  chooseCall(id) {
    if (this.verdict() !== void 0) {
      return;
    }
    this.call.set(id);
  }
  setConfidence(event) {
    this.confidence.set(Number(event.target.value));
  }
  /** Buys one test: the clock runs down for its cost, then the bench reports. */
  async runTest(test) {
    if (this.running() !== void 0 || this.blockedReason(test) !== void 0) {
      return;
    }
    this.running.set(test.id);
    this.renderQuality.probe();
    const from = this.minutesLeft();
    const to = Math.max(from - test.cost, 0);
    await this.drainClock(from, to);
    const outcome = emergencyOutcomes[this.tub()][test.id];
    const _a = outcome, { reading } = _a, rest = __objRest(_a, ["reading"]);
    this.ran.update((current) => [
      ...current,
      {
        id: test.id,
        title: test.title,
        cost: test.cost,
        decisive: test.decisive,
        reading,
        fields: Object.entries(rest).map(([label, value]) => ({
          label: readableLabel3(label),
          value
        })),
        clockAfter: to
      }
    ]);
    this.citedTestIds.update((current) => [...current, test.id]);
    this.running.set(void 0);
  }
  /** Files the call with the marshal and plays out what happens in Bay 3. */
  fileCall() {
    const call = this.call();
    if (call === void 0 || !this.canFile()) {
      return;
    }
    const verdict = judgeCall(call, this.tub(), this.decisiveRun());
    this.verdict.set(verdict);
    if (verdict.neutralises) {
      this.neutralise();
    }
  }
  /**
   * A rejected call does not end the investigation — the crew is still outside
   * and the clock restarts short. The log of what they already ran stays.
   */
  tryAgain() {
    this.verdict.set(void 0);
    this.call.set(void 0);
    this.attempt.update((value) => value + 1);
    this.minutesLeft.set(emergencyRetryMinutes);
    this.stop();
    this.fizz.set([]);
    this.gasCount.set(0);
  }
  restartPreview() {
    if (!this.preview || this.running())
      return;
    this.attemptHistory.update((history) => [...history.slice(-19), {
      attempt: this.attempt(),
      minutesLeft: this.minutesLeft(),
      tests: [...this.ran()],
      call: this.call()
    }]);
    this.stop();
    this.minutesLeft.set(emergencyBudgetMinutes);
    this.ran.set([]);
    this.citedTestIds.set([]);
    this.call.set(void 0);
    this.verdict.set(void 0);
    this.reasoning.set("");
    this.attempt.update((value) => value + 1);
    this.fizz.set([]);
    this.gasCount.set(0);
    this.briefingOpen.set(false);
  }
  /** Sends the incident record to the evidence locker. */
  captureRecord() {
    const verdict = this.verdict();
    if (verdict === void 0) {
      return;
    }
    this.captured.emit({
      activityId: "activity-emergency-response",
      evidenceId: "evidence-emergency-response",
      result: {
        call: this.call(),
        verdict: verdict.id,
        confidence: this.confidence(),
        attempt: this.attempt(),
        minutesSpent: this.spent(),
        minutesLeft: this.minutesLeft(),
        testsRun: this.ran().map((test) => `${test.title}: ${test.reading}`),
        decisiveTestsRun: this.decisiveRun(),
        citedTestIds: [...this.citedTestIds()]
      },
      note: this.reasoning()
    });
  }
  drainClock(from, to) {
    return new Promise((resolve) => {
      const started = Date.now();
      this.stop();
      this.timer = setInterval(() => {
        const ratio = Math.min((Date.now() - started) / runDurationMs2, 1);
        this.minutesLeft.set(Math.round(from - (from - to) * ratio));
        if (ratio >= 1) {
          this.minutesLeft.set(to);
          this.stop();
          resolve();
        }
      }, tickMs3);
    });
  }
  /**
   * The payoff. Carbon dioxide rises off the Bay 3 floor and the counter climbs
   * — the same particles the sealed chamber held in, now leaving an acid that
   * is being neutralised.
   */
  neutralise() {
    this.stop();
    this.fizz.set([]);
    this.gasCount.set(0);
    let released = 0;
    this.timer = setInterval(() => {
      if (released < neutraliseTargetCount) {
        released += 1;
        this.gasCount.set(released);
        this.fizz.update((current) => [...current, seedFizz(released)]);
      }
      this.fizz.update((current) => current.map((bubble) => __spreadProps(__spreadValues({}, bubble), { y: bubble.y - bubble.speed })).filter((bubble) => bubble.y > -6));
      if (released >= neutraliseTargetCount && this.fizz().length === 0) {
        this.stop();
      }
    }, 90);
  }
  stop() {
    if (this.timer !== void 0) {
      clearInterval(this.timer);
      this.timer = void 0;
    }
  }
  static \u0275fac = function EmergencyResponseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmergencyResponseComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmergencyResponseComponent, selectors: [["app-emergency-response"]], hostVars: 2, hostBindings: function EmergencyResponseComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("lab-preview", ctx.preview);
    }
  }, inputs: { tub: [1, "tub"] }, outputs: { captured: "captured" }, decls: 70, vars: 20, consts: [[1, "bay-canvas"], ["aria-hidden", "true", 1, "bay-scene"], ["aria-hidden", "true", 1, "bay-shade"], [1, "briefing-scrim"], [1, "bay-grid"], ["aria-labelledby", "rack-title", 1, "rack"], [1, "kicker"], ["id", "rack-title"], ["aria-hidden", "true", 1, "tub"], ["viewBox", "0 0 120 108", "role", "presentation"], ["x", "18", "y", "26", "width", "84", "height", "72", "rx", "7", 1, "tub-body"], ["x", "12", "y", "16", "width", "96", "height", "14", "rx", "5", 1, "tub-lid"], ["x", "30", "y", "44", "width", "60", "height", "34", "rx", "3", 1, "tub-label"], ["d", "M34 54h44M34 62h30M34 70h38", 1, "tub-smear"], ["d", "M30 44l60 34M90 44l-60 34", 1, "tub-water"], [1, "tub-note"], ["aria-live", "polite", 1, "clock"], [1, "clock-bar"], [1, "clock-foot"], ["type", "button", 1, "ghost", 3, "click"], ["aria-label", "Supplied specimen comparison records", 1, "prior"], [1, "stage"], [1, "stage-head"], ["aria-live", "polite", 1, "decisive-count"], ["aria-live", "polite", 1, "hint"], [1, "test-list"], ["aria-label", "Bench results", 1, "results"], ["aria-labelledby", "console-title", 1, "console"], ["id", "console-title"], [1, "call-options"], ["type", "button", 3, "selected", "disabled"], ["type", "button", 1, "primary", 3, "disabled"], ["aria-live", "assertive", 1, "verdict"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "briefing-title", 1, "briefing"], [1, "stamp"], ["id", "briefing-title"], [1, "constraint"], ["type", "button", 1, "primary", 3, "click"], ["type", "button", 1, "primary", 3, "click", "disabled"], ["scope", "col"], ["scope", "row"], ["type", "button", 1, "test", 3, "click", "disabled"], [1, "test-cost"], [1, "test-body"], [1, "test-state"], [3, "decisive"], ["type", "button", 3, "click", "disabled"], [1, "citations"], [1, "reasoning-field"], ["rows", "4", "placeholder", "We ran\u2026 and it showed\u2026 which matches Vial\u2026 because\u2026", 3, "ngModelChange", "ngModel", "disabled"], [1, "confidence-field"], ["type", "range", "min", "0", "max", "100", "step", "10", 3, "input", "value", "disabled"], [1, "verdict-label"], ["role", "img", "aria-label", "Carbon dioxide leaving the Bay 3 floor", 1, "bay-floor"], [1, "verdict-actions"], ["viewBox", "0 0 160 100", "role", "presentation"], ["x", "0", "y", "84", "width", "160", "height", "16", 1, "floor"], ["x", "0", "y", "80", "width", "160", "height", "6", 1, "spill"], ["aria-live", "polite", 1, "gas-count"], ["type", "button", 1, "ghost"]], template: function EmergencyResponseComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275element(1, "div", 1)(2, "div", 2);
      \u0275\u0275conditionalCreate(3, EmergencyResponseComponent_Conditional_3_Template, 22, 9, "div", 3);
      \u0275\u0275elementStart(4, "div", 4)(5, "aside", 5)(6, "span", 6);
      \u0275\u0275text(7, "Unidentified shipment");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "h2", 7);
      \u0275\u0275text(9, "The tub");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 8);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(11, "svg", 9);
      \u0275\u0275element(12, "rect", 10)(13, "rect", 11)(14, "rect", 12)(15, "path", 13)(16, "path", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(17, "p", 15);
      \u0275\u0275text(18, " Legible on the label: ");
      \u0275\u0275elementStart(19, "strong");
      \u0275\u0275text(20, "SODIUM BICARB\u2014");
      \u0275\u0275elementEnd();
      \u0275\u0275text(21, " \xB7 ");
      \u0275\u0275elementStart(22, "strong");
      \u0275\u0275text(23, "NaHCO");
      \u0275\u0275elementEnd();
      \u0275\u0275text(24, " \xB7 seal intact. Harbor Ridge will not confirm it. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 16)(26, "small");
      \u0275\u0275text(27, "Crew waiting");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "strong");
      \u0275\u0275text(29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 17);
      \u0275\u0275element(31, "span");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "small", 18);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "button", 19);
      \u0275\u0275listener("click", function EmergencyResponseComponent_Template_button_click_34_listener() {
        return ctx.showPrior.set(!ctx.showPrior());
      });
      \u0275\u0275text(35);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(36, EmergencyResponseComponent_Conditional_36_Template, 9, 2);
      \u0275\u0275conditionalCreate(37, EmergencyResponseComponent_Conditional_37_Template, 12, 0, "table", 20);
      \u0275\u0275elementStart(38, "button", 19);
      \u0275\u0275listener("click", function EmergencyResponseComponent_Template_button_click_38_listener() {
        return ctx.briefingOpen.set(true);
      });
      \u0275\u0275text(39, " Re-read the incident brief ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div", 21)(41, "header", 22)(42, "div")(43, "span", 6);
      \u0275\u0275text(44, "Bay 3 \xB7 unidentified white powder");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "h1");
      \u0275\u0275text(46, "Which test is worth the crew's time?");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "div", 23)(48, "small");
      \u0275\u0275text(49, "Tests that could separate the two");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "strong");
      \u0275\u0275text(51);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(52, "p", 24);
      \u0275\u0275text(53);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "ul", 25);
      \u0275\u0275repeaterCreate(55, EmergencyResponseComponent_For_56_Template, 17, 10, "li", null, _forTrack04);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(57, EmergencyResponseComponent_Conditional_57_Template, 6, 0, "section", 26);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "aside", 27)(59, "span", 6);
      \u0275\u0275text(60, "Radio \xB7 fire marshal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "h2", 28);
      \u0275\u0275text(62);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "div", 29);
      \u0275\u0275repeaterCreate(64, EmergencyResponseComponent_For_65_Template, 5, 6, "button", 30, _forTrack04);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(66, EmergencyResponseComponent_Conditional_66_Template, 5, 0);
      \u0275\u0275conditionalCreate(67, EmergencyResponseComponent_Conditional_67_Template, 8, 5);
      \u0275\u0275conditionalCreate(68, EmergencyResponseComponent_Conditional_68_Template, 2, 2, "button", 31);
      \u0275\u0275conditionalCreate(69, EmergencyResponseComponent_Conditional_69_Template, 11, 6, "article", 32);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_17_0;
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.briefingOpen() ? 3 : -1);
      \u0275\u0275advance(22);
      \u0275\u0275classProp("spent", ctx.outOfTime());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.clockLabel());
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.clockPercent(), "%");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2(" ", ctx.spent(), " min spent \xB7 attempt ", ctx.attempt(), " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2(" ", ctx.showPrior() ? "Hide" : "Open", " ", ctx.preview ? "supplied comparison records" : "your shelf records", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.preview ? 36 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showPrior() ? 37 : -1);
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate(ctx.decisiveRun());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.hint());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tests);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.ran().length > 0 ? 57 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.preview ? "Try a response" : "File your call");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.calls);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.ran().length > 0 ? 66 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.preview ? 67 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.verdict() === void 0 ? 68 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_17_0 = ctx.verdict()) ? 69 : -1, tmp_17_0);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n[_nghost-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: block;\n}\nbutton[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  color: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #ffb45c;\n  outline-offset: 2px;\n}\n.bay-canvas[_ngcontent-%COMP%], \n.bay-scene[_ngcontent-%COMP%], \n.bay-shade[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.bay-canvas[_ngcontent-%COMP%] {\n  overflow: auto;\n  color: #f6ede4;\n  background: #150a06;\n}\n.bay-scene[_ngcontent-%COMP%] {\n  z-index: 0;\n  background:\n    repeating-linear-gradient(\n      118deg,\n      rgba(255, 156, 62, 0.05) 0 22px,\n      transparent 22px 46px),\n    radial-gradient(\n      circle at 22% 18%,\n      rgba(255, 138, 48, 0.2),\n      transparent 55%),\n    radial-gradient(\n      circle at 78% 76%,\n      rgba(122, 58, 20, 0.32),\n      transparent 60%);\n}\n.bay-shade[_ngcontent-%COMP%] {\n  z-index: 1;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(15, 7, 4, 0.68),\n      rgba(12, 6, 3, 0.94));\n}\n.kicker[_ngcontent-%COMP%] {\n  display: block;\n  color: #ffab5e;\n  font-size: 0.6rem;\n  font-weight: 850;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%] {\n  margin: 0.15rem 0 0.5rem;\n  font-weight: 760;\n  line-height: 1.15;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n}\n.primary[_ngcontent-%COMP%], \n.ghost[_ngcontent-%COMP%] {\n  border-radius: 0.55rem;\n  cursor: pointer;\n  font-size: 0.78rem;\n  font-weight: 700;\n  padding: 0.5rem 0.8rem;\n}\n.primary[_ngcontent-%COMP%] {\n  border: 1px solid #ff9a3c;\n  background:\n    linear-gradient(\n      180deg,\n      #ff9d40,\n      #e2701a);\n  color: #200d02;\n}\n.primary[_ngcontent-%COMP%]:disabled {\n  border-color: rgba(255, 154, 60, 0.28);\n  background: rgba(255, 154, 60, 0.14);\n  color: rgba(246, 237, 228, 0.44);\n  cursor: not-allowed;\n}\n.ghost[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 171, 94, 0.36);\n  background: rgba(255, 171, 94, 0.08);\n  color: #ffcf9f;\n  text-align: left;\n  width: 100%;\n}\n.briefing-scrim[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 5;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  padding: 1rem;\n  background: rgba(9, 4, 2, 0.86);\n}\n.briefing[_ngcontent-%COMP%] {\n  max-width: 34rem;\n  border: 1px solid rgba(255, 154, 60, 0.4);\n  border-radius: 0.9rem;\n  background:\n    linear-gradient(\n      180deg,\n      #22110a,\n      #170b06);\n  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);\n  padding: 1.1rem 1.2rem;\n}\n.briefing[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 0.6rem;\n  font-size: 0.82rem;\n  line-height: 1.5;\n}\n.stamp[_ngcontent-%COMP%] {\n  display: inline-block;\n  border: 1px solid rgba(255, 154, 60, 0.5);\n  border-radius: 0.3rem;\n  color: #ffab5e;\n  font-size: 0.6rem;\n  font-weight: 850;\n  letter-spacing: 0.14em;\n  padding: 0.16rem 0.4rem;\n  text-transform: uppercase;\n}\n.briefing[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 0 0 0.7rem;\n  border-left: 3px solid rgba(255, 154, 60, 0.6);\n  padding: 0.35rem 0 0.35rem 0.7rem;\n  font-size: 0.85rem;\n  font-style: italic;\n}\n.briefing[_ngcontent-%COMP%]   cite[_ngcontent-%COMP%] {\n  display: block;\n  color: rgba(246, 237, 228, 0.6);\n  font-size: 0.66rem;\n  font-style: normal;\n  margin-top: 0.3rem;\n}\n.constraint[_ngcontent-%COMP%] {\n  border-radius: 0.45rem;\n  background: rgba(255, 90, 60, 0.12);\n  color: #ffc7ae;\n  font-weight: 650;\n  padding: 0.45rem 0.6rem;\n}\n.briefing[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.8rem;\n  margin-top: 0.9rem;\n  font-size: 0.72rem;\n}\n.bay-grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: grid;\n  min-height: 100%;\n  align-items: start;\n  gap: 0.85rem;\n  grid-template-columns: minmax(12rem, 0.85fr) minmax(0, 1.9fr) minmax(13rem, 1fr);\n  padding: 0.9rem;\n}\n.rack[_ngcontent-%COMP%], \n.stage[_ngcontent-%COMP%], \n.console[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 171, 94, 0.16);\n  border-radius: 0.8rem;\n  background: rgba(28, 14, 8, 0.66);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  padding: 0.8rem;\n}\n.tub[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 8.5rem;\n  margin: 0.2rem auto 0.4rem;\n}\n.tub-body[_ngcontent-%COMP%] {\n  fill: #e9e2d6;\n  stroke: #b9ac99;\n}\n.tub-lid[_ngcontent-%COMP%] {\n  fill: #cfc5b5;\n  stroke: #a2957f;\n}\n.tub-label[_ngcontent-%COMP%] {\n  fill: #fdfaf3;\n  stroke: #cbbfa9;\n}\n.tub-smear[_ngcontent-%COMP%] {\n  stroke: #9a8a72;\n  stroke-width: 2.4;\n  stroke-linecap: round;\n  opacity: 0.45;\n  filter: blur(1.1px);\n}\n.tub-water[_ngcontent-%COMP%] {\n  stroke: #b6a288;\n  stroke-width: 1.1;\n  opacity: 0.3;\n}\n.tub-note[_ngcontent-%COMP%] {\n  margin: 0 0 0.7rem;\n  color: rgba(246, 237, 228, 0.76);\n  font-size: 0.68rem;\n  line-height: 1.45;\n}\n.clock[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 154, 60, 0.34);\n  border-radius: 0.6rem;\n  background: rgba(255, 154, 60, 0.07);\n  margin-bottom: 0.7rem;\n  padding: 0.5rem 0.6rem;\n  text-align: center;\n}\n.clock[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: rgba(246, 237, 228, 0.62);\n  font-size: 0.58rem;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.clock[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #ffc98c;\n  font-size: 1.7rem;\n  font-variant-numeric: tabular-nums;\n  line-height: 1.1;\n}\n.clock.spent[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ff8163;\n}\n.clock-bar[_ngcontent-%COMP%] {\n  height: 4px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.12);\n  margin: 0.35rem 0 0.3rem;\n  overflow: hidden;\n}\n.clock-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #ff8163,\n      #ffc98c);\n  transition: width 120ms linear;\n}\n.clock-foot[_ngcontent-%COMP%] {\n  letter-spacing: 0.06em;\n  text-transform: none;\n}\n.prior[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.62rem;\n  margin: 0.5rem 0 0.7rem;\n}\n.prior[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.prior[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(255, 171, 94, 0.16);\n  padding: 0.3rem 0.25rem;\n  text-align: left;\n  vertical-align: top;\n}\n.prior[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: #ffab5e;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.prior[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: rgba(246, 237, 228, 0.86);\n  font-weight: 650;\n}\n.prior[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: rgba(246, 237, 228, 0.7);\n}\n.stage-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.8rem;\n}\n.decisive-count[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 171, 94, 0.28);\n  border-radius: 0.5rem;\n  flex: none;\n  padding: 0.35rem 0.55rem;\n  text-align: center;\n}\n.decisive-count[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 8rem;\n  color: rgba(246, 237, 228, 0.6);\n  font-size: 0.56rem;\n  line-height: 1.25;\n}\n.decisive-count[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffc98c;\n  font-size: 1.2rem;\n}\n.hint[_ngcontent-%COMP%] {\n  margin: 0 0 0.7rem;\n  color: rgba(246, 237, 228, 0.78);\n  font-size: 0.72rem;\n  line-height: 1.45;\n}\n.test-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n  list-style: none;\n  margin: 0 0 0.9rem;\n  padding: 0;\n}\n.test[_ngcontent-%COMP%] {\n  display: grid;\n  width: 100%;\n  align-items: center;\n  border: 1px solid rgba(255, 171, 94, 0.2);\n  border-radius: 0.6rem;\n  background: rgba(255, 171, 94, 0.05);\n  cursor: pointer;\n  gap: 0.6rem;\n  grid-template-columns: 3rem minmax(0, 1fr) auto;\n  padding: 0.5rem 0.6rem;\n  text-align: left;\n}\n.test[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: rgba(255, 171, 94, 0.5);\n  background: rgba(255, 171, 94, 0.11);\n}\n.test[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.test.done[_ngcontent-%COMP%] {\n  border-color: rgba(122, 214, 160, 0.4);\n  background: rgba(122, 214, 160, 0.07);\n  opacity: 0.78;\n}\n.test.busy[_ngcontent-%COMP%] {\n  border-color: rgba(255, 154, 60, 0.7);\n  opacity: 1;\n}\n.test-cost[_ngcontent-%COMP%] {\n  border-radius: 0.45rem;\n  background: rgba(255, 154, 60, 0.16);\n  color: #ffc98c;\n  font-size: 1.05rem;\n  font-weight: 800;\n  font-variant-numeric: tabular-nums;\n  padding: 0.25rem 0;\n  text-align: center;\n}\n.test-cost[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.5rem;\n  font-weight: 700;\n  letter-spacing: 0.1em;\n  opacity: 0.75;\n  text-transform: uppercase;\n}\n.test-body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.8rem;\n}\n.test-body[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: rgba(246, 237, 228, 0.58);\n  font-size: 0.62rem;\n}\n.test-body[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  display: block;\n  color: rgba(246, 237, 228, 0.72);\n  font-size: 0.66rem;\n  font-style: normal;\n  margin-top: 0.15rem;\n}\n.test-state[_ngcontent-%COMP%] {\n  color: #ffab5e;\n  font-size: 0.62rem;\n  font-weight: 750;\n  letter-spacing: 0.08em;\n  text-align: right;\n  text-transform: uppercase;\n}\n.results[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n  list-style: none;\n  margin: 0.4rem 0 0;\n  padding: 0;\n}\n.results[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  border-left: 3px solid rgba(255, 171, 94, 0.35);\n  border-radius: 0 0.5rem 0.5rem 0;\n  background: rgba(0, 0, 0, 0.25);\n  padding: 0.45rem 0.6rem;\n}\n.results[_ngcontent-%COMP%]   li.decisive[_ngcontent-%COMP%] {\n  border-left-color: #7ad6a0;\n}\n.results[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.results[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.76rem;\n}\n.results[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: rgba(246, 237, 228, 0.55);\n  font-size: 0.6rem;\n  font-variant-numeric: tabular-nums;\n}\n.results[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0.3rem;\n  color: #ffe0c1;\n  font-size: 0.8rem;\n  font-weight: 650;\n}\n.results[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.15rem 0.9rem;\n  margin: 0;\n}\n.results[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.3rem;\n}\n.results[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: rgba(246, 237, 228, 0.5);\n  font-size: 0.62rem;\n}\n.results[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(246, 237, 228, 0.85);\n  font-size: 0.62rem;\n}\n.call-options[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  margin: 0.35rem 0 0.8rem;\n}\n.call-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.citations[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 171, 94, 0.2);\n  border-radius: 0.55rem;\n  background: rgba(255, 171, 94, 0.05);\n  cursor: pointer;\n  padding: 0.45rem 0.55rem;\n  text-align: left;\n}\n.call-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.76rem;\n}\n.call-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: rgba(246, 237, 228, 0.6);\n  font-size: 0.62rem;\n  line-height: 1.35;\n  margin-top: 0.1rem;\n}\n.call-options[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%], \n.citations[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: #ff9a3c;\n  background: rgba(255, 154, 60, 0.18);\n}\n.call-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled, \n.citations[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.citations[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.3rem;\n  margin: 0.35rem 0 0.8rem;\n}\n.citations[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 0.64rem;\n  padding: 0.25rem 0.45rem;\n}\n.reasoning-field[_ngcontent-%COMP%], \n.confidence-field[_ngcontent-%COMP%] {\n  display: block;\n  color: rgba(246, 237, 228, 0.72);\n  font-size: 0.66rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  margin-bottom: 0.7rem;\n  text-transform: uppercase;\n}\n.reasoning-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  border: 1px solid rgba(255, 171, 94, 0.24);\n  border-radius: 0.5rem;\n  background: rgba(0, 0, 0, 0.3);\n  color: #f6ede4;\n  font-size: 0.74rem;\n  letter-spacing: normal;\n  margin-top: 0.3rem;\n  padding: 0.45rem 0.55rem;\n  resize: vertical;\n  text-transform: none;\n}\n.confidence-field[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffc98c;\n  margin-left: 0.35rem;\n}\n.confidence-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-top: 0.3rem;\n  accent-color: #ff9a3c;\n}\n.verdict[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 171, 94, 0.3);\n  border-radius: 0.65rem;\n  background: rgba(0, 0, 0, 0.32);\n  margin-top: 0.8rem;\n  padding: 0.6rem 0.7rem;\n}\n.verdict[data-tone=good][_ngcontent-%COMP%] {\n  border-color: rgba(122, 214, 160, 0.55);\n  background: rgba(122, 214, 160, 0.09);\n}\n.verdict[data-tone=warn][_ngcontent-%COMP%] {\n  border-color: rgba(255, 201, 140, 0.55);\n  background: rgba(255, 201, 140, 0.09);\n}\n.verdict[data-tone=bad][_ngcontent-%COMP%] {\n  border-color: rgba(255, 129, 99, 0.6);\n  background: rgba(255, 129, 99, 0.1);\n}\n.verdict-label[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 0.58rem;\n  font-weight: 850;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\n.verdict[data-tone=good][_ngcontent-%COMP%]   .verdict-label[_ngcontent-%COMP%] {\n  color: #7ad6a0;\n}\n.verdict[data-tone=warn][_ngcontent-%COMP%]   .verdict-label[_ngcontent-%COMP%] {\n  color: #ffc98c;\n}\n.verdict[data-tone=bad][_ngcontent-%COMP%]   .verdict-label[_ngcontent-%COMP%] {\n  color: #ff8163;\n}\n.verdict[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0.5rem;\n  color: rgba(246, 237, 228, 0.86);\n  font-size: 0.74rem;\n  line-height: 1.5;\n}\n.verdict-actions[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  margin-top: 0.6rem;\n}\n.verdict-actions[_ngcontent-%COMP%]   .ghost[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.bay-floor[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  border-radius: 0.5rem;\n  background: rgba(0, 0, 0, 0.4);\n}\n.bay-floor[_ngcontent-%COMP%]   .floor[_ngcontent-%COMP%] {\n  fill: #3a2116;\n}\n.bay-floor[_ngcontent-%COMP%]   .spill[_ngcontent-%COMP%] {\n  fill: #d6e36a;\n  opacity: 0.55;\n}\n.bay-floor[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: rgba(226, 245, 255, 0.8);\n}\n.gas-count[_ngcontent-%COMP%] {\n  margin: 0.3rem 0 0;\n  color: rgba(246, 237, 228, 0.78);\n  font-size: 0.66rem;\n  text-align: center;\n}\n.gas-count[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #7ad6a0;\n  font-size: 0.9rem;\n  font-variant-numeric: tabular-nums;\n}\n@media (prefers-reduced-motion: reduce) {\n  .clock-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n@container (max-width: 60rem) {\n  .bay-grid[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n[_nghost-%COMP%] {\n  container-type: inline-size;\n}\n.workbench-station[_nghost-%COMP%] {\n  position: relative;\n  inset: auto;\n}\n.workbench-station[_nghost-%COMP%]   .bay-canvas[_ngcontent-%COMP%] {\n  position: relative;\n  inset: auto;\n  min-height: 34rem;\n  overflow: visible;\n}\n.lab-preview[_nghost-%COMP%] {\n  position: relative;\n  inset: auto;\n  display: block;\n  container-type: inline-size;\n}\n.lab-preview[_nghost-%COMP%]   .lab-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bay-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .station-canvas[_ngcontent-%COMP%] {\n  position: relative;\n  inset: auto;\n  min-height: 0;\n  overflow: visible;\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%] {\n  padding: 14px;\n  min-height: 0;\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n  gap: 12px;\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%] {\n  display: block;\n}\n.lab-preview[_nghost-%COMP%]   .record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .console[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.lab-preview[_nghost-%COMP%]   .record[hidden][_ngcontent-%COMP%] {\n  display: none;\n}\n.lab-preview[_nghost-%COMP%]   .stage[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rig[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .console[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.lab-preview[_nghost-%COMP%]   .kicker[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .instrument-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .trial-log[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .procedure-log[_ngcontent-%COMP%] {\n  display: block;\n}\n.lab-preview[_nghost-%COMP%]   .trial-log[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .procedure-log[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow: auto;\n}\n.lab-preview[_nghost-%COMP%]   .instrument-well[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .chamber-well[_ngcontent-%COMP%] {\n  min-height: 230px;\n}\n.lab-preview[_nghost-%COMP%]   .instrument-well[_ngcontent-%COMP%] {\n  height: 245px;\n}\n.lab-preview[_nghost-%COMP%]   .stage-controls[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%] {\n  width: auto;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  flex-basis: 100%;\n  margin: 0;\n}\n.lab-preview[_nghost-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.lab-preview[_nghost-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.lab-preview[_nghost-%COMP%]   button[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 44px;\n  font-size: 0.87rem;\n}\n.lab-preview[_nghost-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .record-note[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .stage-hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rig-hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout-stack[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout-stack[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rack-note[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.lab-preview[_nghost-%COMP%]   input[type=range][_ngcontent-%COMP%] {\n  min-height: 32px;\n}\n.lab-preview[_nghost-%COMP%]   .prior[_ngcontent-%COMP%] {\n  width: 100%;\n  table-layout: fixed;\n  overflow-wrap: anywhere;\n}\n.lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%]   .stage[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.lab-preview[_nghost-%COMP%]   .test-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n}\n.lab-preview[_nghost-%COMP%]   .test[_ngcontent-%COMP%] {\n  height: 100%;\n  min-width: 0;\n}\n.lab-preview[_nghost-%COMP%]   .briefing-scrim[_ngcontent-%COMP%] {\n  position: relative;\n}\n.lab-preview[_nghost-%COMP%]   [_ngcontent-%COMP%]:is(button, select, summary, input):focus-visible {\n  outline: 3px solid #a9efdc;\n  outline-offset: 3px;\n}\n@container (max-width: 640px) {\n  .lab-preview[_nghost-%COMP%]   .lab-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bench-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .matter-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .restoration-stage[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 10px;\n  }\n  .lab-preview[_nghost-%COMP%]   .stage[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .rig[_ngcontent-%COMP%] {\n    grid-row: 1;\n  }\n  .lab-preview[_nghost-%COMP%]   .rack[_ngcontent-%COMP%] {\n    grid-row: 2;\n  }\n  .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%] {\n    grid-row: 1;\n  }\n  .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%]   .stage[_ngcontent-%COMP%] {\n    grid-row: 2;\n  }\n  .lab-preview[_nghost-%COMP%]   .test-list[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .shelf-plan[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .lab-preview[_nghost-%COMP%]   .instrument-list[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .chamber-list[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .lab-preview[_nghost-%COMP%]   .focus-specimen[_ngcontent-%COMP%] {\n    max-width: 130px;\n    justify-self: center;\n  }\n  .lab-preview[_nghost-%COMP%]   .focus-specimen[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    max-height: 150px;\n  }\n  .lab-preview[_nghost-%COMP%]   .chamber-well[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .lab-preview[_nghost-%COMP%]   .probe-rig[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=emergency-response.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmergencyResponseComponent, [{
    type: Component,
    args: [{ selector: "app-emergency-response", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, host: { "[class.lab-preview]": "preview" }, template: `<section class="bay-canvas">
  <div class="bay-scene" aria-hidden="true"></div>
  <div class="bay-shade" aria-hidden="true"></div>

  <!-- ---- Incident briefing ------------------------------------------------ -->
  @if (briefingOpen()) {
    <div class="briefing-scrim">
      <article class="briefing" role="dialog" aria-modal="true" aria-labelledby="briefing-title">
        <header>
          <span class="stamp">Incident \xB7 {{ briefing.time }} \xB7 {{ briefing.location }}</span>
          <h1 id="briefing-title">{{ briefing.headline }}</h1>
        </header>
        <p>{{ briefing.situation }}</p>
        <p>{{ briefing.shipment }}</p>
        <blockquote>
          {{ briefing.quote }}
          <cite>{{ briefing.attribution }}</cite>
        </blockquote>
        <p class="constraint">{{ briefing.constraint }}</p>
        <footer>
          <span>You have {{ minutesLeft() }} minutes of bench time. The crew is waiting.</span>
          <button type="button" class="primary" (click)="briefingOpen.set(false)">
            Take the bench
          </button>
        </footer>
      </article>
    </div>
  }

  <div class="bay-grid">
    <!-- ---- The tub and the clock ----------------------------------------- -->
    <aside class="rack" aria-labelledby="rack-title">
      <span class="kicker">Unidentified shipment</span>
      <h2 id="rack-title">The tub</h2>

      <div class="tub" aria-hidden="true">
        <svg viewBox="0 0 120 108" role="presentation">
          <rect x="18" y="26" width="84" height="72" rx="7" class="tub-body" />
          <rect x="12" y="16" width="96" height="14" rx="5" class="tub-lid" />
          <rect x="30" y="44" width="60" height="34" rx="3" class="tub-label" />
          <path d="M34 54h44M34 62h30M34 70h38" class="tub-smear" />
          <path d="M30 44l60 34M90 44l-60 34" class="tub-water" />
        </svg>
      </div>
      <p class="tub-note">
        Legible on the label: <strong>SODIUM BICARB\u2014</strong> \xB7 <strong>NaHCO</strong> \xB7 seal
        intact. Harbor Ridge will not confirm it.
      </p>

      <div class="clock" [class.spent]="outOfTime()" aria-live="polite">
        <small>Crew waiting</small>
        <strong>{{ clockLabel() }}</strong>
        <div class="clock-bar"><span [style.width.%]="clockPercent()"></span></div>
        <small class="clock-foot"> {{ spent() }} min spent \xB7 attempt {{ attempt() }} </small>
      </div>

      <button type="button" class="ghost" (click)="showPrior.set(!showPrior())">
        {{ showPrior() ? 'Hide' : 'Open' }} {{ preview ? 'supplied comparison records' : 'your shelf records' }}
      </button>
      @if (preview) {
        <p>Supplied C/D comparison records \xB7 sample reference data</p>
        <button type="button" class="primary" [disabled]="!!running()" (click)="restartPreview()">Restart with 25 minutes</button>
        <details><summary>Earlier attempts ({{ attemptHistory().length }})</summary>
          @for (entry of attemptHistory(); track entry.attempt) {
            <p>Attempt {{ entry.attempt }} \xB7 {{ entry.minutesLeft }} minutes left \xB7 {{ entry.call ?? 'No response chosen' }}</p>
            <ul>@for (test of entry.tests; track test.id) { <li>{{ test.title }}: {{ test.reading }}</li> }</ul>
          }
        </details>
      }

      @if (showPrior()) {
        <table class="prior" aria-label="Supplied specimen comparison records">
          <thead>
            <tr>
              <th scope="col">Test</th>
              <th scope="col">Vial C</th>
              <th scope="col">Vial D</th>
            </tr>
          </thead>
          <tbody>
            @for (record of priorRecords; track record.testId) {
              <tr>
                <th scope="row">{{ record.label }}</th>
                <td>{{ record.vialC }}</td>
                <td>{{ record.vialD }}</td>
              </tr>
            }
          </tbody>
        </table>
      }

      <button type="button" class="ghost" (click)="briefingOpen.set(true)">
        Re-read the incident brief
      </button>
    </aside>

    <!-- ---- Bench: buy a test --------------------------------------------- -->
    <div class="stage">
      <header class="stage-head">
        <div>
          <span class="kicker">Bay 3 \xB7 unidentified white powder</span>
          <h1>Which test is worth the crew's time?</h1>
        </div>
        <div class="decisive-count" aria-live="polite">
          <small>Tests that could separate the two</small>
          <strong>{{ decisiveRun() }}</strong>
        </div>
      </header>

      <p class="hint" aria-live="polite">{{ hint() }}</p>

      <ul class="test-list">
        @for (test of tests; track test.id) {
          <li>
            <button
              type="button"
              class="test"
              [class.done]="hasRun(test.id)"
              [class.busy]="running() === test.id"
              [disabled]="blockedReason(test) !== undefined || running() !== undefined"
              (click)="runTest(test)"
            >
              <span class="test-cost">{{ test.cost }}<small>min</small></span>
              <span class="test-body">
                <strong>{{ test.title }}</strong>
                <small>{{ test.instrument }}</small>
                <em>{{ test.prompt }}</em>
              </span>
              <span class="test-state">
                @if (running() === test.id) {
                  Running\u2026
                } @else if (blockedReason(test); as reason) {
                  {{ reason }}
                } @else {
                  Buy
                }
              </span>
            </button>
          </li>
        }
      </ul>

      @if (ran().length > 0) {
        <section class="results" aria-label="Bench results">
          <span class="kicker">What the bench reported</span>
          <ol>
            @for (result of ran(); track result.id) {
              <li [class.decisive]="result.decisive">
                <header>
                  <strong>{{ result.title }}</strong>
                  <small>\u2212{{ result.cost }} min \xB7 {{ result.clockAfter }} min left</small>
                </header>
                <p>{{ result.reading }}</p>
                <dl>
                  @for (field of result.fields; track field.label) {
                    <div>
                      <dt>{{ field.label }}</dt>
                      <dd>{{ field.value }}</dd>
                    </div>
                  }
                </dl>
              </li>
            }
          </ol>
        </section>
      }
    </div>

    <!-- ---- The call ------------------------------------------------------- -->
    <aside class="console" aria-labelledby="console-title">
      <span class="kicker">Radio \xB7 fire marshal</span>
      <h2 id="console-title">{{ preview ? 'Try a response' : 'File your call' }}</h2>

      <div class="call-options">
        @for (option of calls; track option.id) {
          <button
            type="button"
            [class.selected]="call() === option.id"
            [disabled]="verdict() !== undefined"
            [attr.aria-pressed]="call() === option.id"
            (click)="chooseCall(option.id)"
          >
            <strong>{{ option.title }}</strong>
            <small>{{ option.detail }}</small>
          </button>
        }
      </div>

      @if (ran().length > 0) {
        <span class="kicker">Evidence you are standing on</span>
        <div class="citations">
          @for (result of ran(); track result.id) {
            <button
              type="button"
              [class.selected]="cited(result.id)"
              [disabled]="verdict() !== undefined"
              (click)="toggleCitation(result.id)"
            >
              {{ result.title }}
            </button>
          }
        </div>
      }

      @if (!preview) {
      <label class="reasoning-field">
        Why does your evidence say that?
        <textarea
          rows="4"
          [ngModel]="reasoning()"
          (ngModelChange)="reasoning.set($event)"
          [disabled]="verdict() !== undefined"
          placeholder="We ran\u2026 and it showed\u2026 which matches Vial\u2026 because\u2026"
        ></textarea>
      </label>

      <label class="confidence-field">
        Confidence before the pour
        <strong>{{ confidence() }}%</strong>
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          [value]="confidence()"
          [disabled]="verdict() !== undefined"
          (input)="setConfidence($event)"
        />
      </label>

      }
      @if (verdict() === undefined) {
        <button type="button" class="primary" [disabled]="!canFile()" (click)="fileCall()">
          {{ preview ? 'Simulate response' : 'Radio the marshal' }}
        </button>
      }

      @if (verdict(); as result) {
        <article class="verdict" [attr.data-tone]="result.tone" aria-live="assertive">
          <span class="verdict-label">{{ result.label }}</span>
          <h3>{{ result.headline }}</h3>
          <p>{{ result.detail }}</p>

          @if (result.neutralises) {
            <div class="bay-floor" role="img" aria-label="Carbon dioxide leaving the Bay 3 floor">
              <svg viewBox="0 0 160 100" role="presentation">
                <rect x="0" y="84" width="160" height="16" class="floor" />
                <rect x="0" y="80" width="160" height="6" class="spill" />
                @for (bubble of fizz(); track bubble.id) {
                  <circle [attr.cx]="bubble.x" [attr.cy]="bubble.y" [attr.r]="bubble.size" />
                }
              </svg>
              <p class="gas-count" aria-live="polite">
                <strong>{{ gasCount() }}</strong> carbon dioxide particles released
              </p>
            </div>
          }

          <div class="verdict-actions">
            @if (!preview) {
            @if (result.id === 'wrong') {
              <button type="button" class="ghost" (click)="tryAgain()">
                The crew is still outside \u2014 {{ retryMinutes }} minutes left
              </button>
            }
            <button type="button" class="primary" (click)="captureRecord()">
              File the incident record
            </button>
            } @else { <p>Simulated consequence only. No assessment or submission recorded.</p> }
          </div>
        </article>
      }
    </aside>
  </div>
</section>
`, styles: ["/* src/app/projects/mystery-substance/emergency-response.component.scss */\n:host {\n  position: absolute;\n  inset: 0;\n  display: block;\n}\nbutton,\ntextarea,\ninput {\n  font: inherit;\n}\nbutton {\n  color: inherit;\n}\nbutton:focus-visible,\ntextarea:focus-visible,\ninput:focus-visible {\n  outline: 2px solid #ffb45c;\n  outline-offset: 2px;\n}\n.bay-canvas,\n.bay-scene,\n.bay-shade {\n  position: absolute;\n  inset: 0;\n}\n.bay-canvas {\n  overflow: auto;\n  color: #f6ede4;\n  background: #150a06;\n}\n.bay-scene {\n  z-index: 0;\n  background:\n    repeating-linear-gradient(\n      118deg,\n      rgba(255, 156, 62, 0.05) 0 22px,\n      transparent 22px 46px),\n    radial-gradient(\n      circle at 22% 18%,\n      rgba(255, 138, 48, 0.2),\n      transparent 55%),\n    radial-gradient(\n      circle at 78% 76%,\n      rgba(122, 58, 20, 0.32),\n      transparent 60%);\n}\n.bay-shade {\n  z-index: 1;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(15, 7, 4, 0.68),\n      rgba(12, 6, 3, 0.94));\n}\n.kicker {\n  display: block;\n  color: #ffab5e;\n  font-size: 0.6rem;\n  font-weight: 850;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n}\nh1,\nh2,\nh3 {\n  margin: 0.15rem 0 0.5rem;\n  font-weight: 760;\n  line-height: 1.15;\n}\nh1 {\n  font-size: 1.15rem;\n}\nh2 {\n  font-size: 0.95rem;\n}\nh3 {\n  font-size: 0.95rem;\n}\n.primary,\n.ghost {\n  border-radius: 0.55rem;\n  cursor: pointer;\n  font-size: 0.78rem;\n  font-weight: 700;\n  padding: 0.5rem 0.8rem;\n}\n.primary {\n  border: 1px solid #ff9a3c;\n  background:\n    linear-gradient(\n      180deg,\n      #ff9d40,\n      #e2701a);\n  color: #200d02;\n}\n.primary:disabled {\n  border-color: rgba(255, 154, 60, 0.28);\n  background: rgba(255, 154, 60, 0.14);\n  color: rgba(246, 237, 228, 0.44);\n  cursor: not-allowed;\n}\n.ghost {\n  border: 1px solid rgba(255, 171, 94, 0.36);\n  background: rgba(255, 171, 94, 0.08);\n  color: #ffcf9f;\n  text-align: left;\n  width: 100%;\n}\n.briefing-scrim {\n  position: absolute;\n  z-index: 5;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  padding: 1rem;\n  background: rgba(9, 4, 2, 0.86);\n}\n.briefing {\n  max-width: 34rem;\n  border: 1px solid rgba(255, 154, 60, 0.4);\n  border-radius: 0.9rem;\n  background:\n    linear-gradient(\n      180deg,\n      #22110a,\n      #170b06);\n  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);\n  padding: 1.1rem 1.2rem;\n}\n.briefing p {\n  margin: 0 0 0.6rem;\n  font-size: 0.82rem;\n  line-height: 1.5;\n}\n.stamp {\n  display: inline-block;\n  border: 1px solid rgba(255, 154, 60, 0.5);\n  border-radius: 0.3rem;\n  color: #ffab5e;\n  font-size: 0.6rem;\n  font-weight: 850;\n  letter-spacing: 0.14em;\n  padding: 0.16rem 0.4rem;\n  text-transform: uppercase;\n}\n.briefing blockquote {\n  margin: 0 0 0.7rem;\n  border-left: 3px solid rgba(255, 154, 60, 0.6);\n  padding: 0.35rem 0 0.35rem 0.7rem;\n  font-size: 0.85rem;\n  font-style: italic;\n}\n.briefing cite {\n  display: block;\n  color: rgba(246, 237, 228, 0.6);\n  font-size: 0.66rem;\n  font-style: normal;\n  margin-top: 0.3rem;\n}\n.constraint {\n  border-radius: 0.45rem;\n  background: rgba(255, 90, 60, 0.12);\n  color: #ffc7ae;\n  font-weight: 650;\n  padding: 0.45rem 0.6rem;\n}\n.briefing footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.8rem;\n  margin-top: 0.9rem;\n  font-size: 0.72rem;\n}\n.bay-grid {\n  position: relative;\n  z-index: 2;\n  display: grid;\n  min-height: 100%;\n  align-items: start;\n  gap: 0.85rem;\n  grid-template-columns: minmax(12rem, 0.85fr) minmax(0, 1.9fr) minmax(13rem, 1fr);\n  padding: 0.9rem;\n}\n.rack,\n.stage,\n.console {\n  border: 1px solid rgba(255, 171, 94, 0.16);\n  border-radius: 0.8rem;\n  background: rgba(28, 14, 8, 0.66);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  padding: 0.8rem;\n}\n.tub svg {\n  display: block;\n  width: 100%;\n  max-width: 8.5rem;\n  margin: 0.2rem auto 0.4rem;\n}\n.tub-body {\n  fill: #e9e2d6;\n  stroke: #b9ac99;\n}\n.tub-lid {\n  fill: #cfc5b5;\n  stroke: #a2957f;\n}\n.tub-label {\n  fill: #fdfaf3;\n  stroke: #cbbfa9;\n}\n.tub-smear {\n  stroke: #9a8a72;\n  stroke-width: 2.4;\n  stroke-linecap: round;\n  opacity: 0.45;\n  filter: blur(1.1px);\n}\n.tub-water {\n  stroke: #b6a288;\n  stroke-width: 1.1;\n  opacity: 0.3;\n}\n.tub-note {\n  margin: 0 0 0.7rem;\n  color: rgba(246, 237, 228, 0.76);\n  font-size: 0.68rem;\n  line-height: 1.45;\n}\n.clock {\n  border: 1px solid rgba(255, 154, 60, 0.34);\n  border-radius: 0.6rem;\n  background: rgba(255, 154, 60, 0.07);\n  margin-bottom: 0.7rem;\n  padding: 0.5rem 0.6rem;\n  text-align: center;\n}\n.clock small {\n  display: block;\n  color: rgba(246, 237, 228, 0.62);\n  font-size: 0.58rem;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.clock strong {\n  display: block;\n  color: #ffc98c;\n  font-size: 1.7rem;\n  font-variant-numeric: tabular-nums;\n  line-height: 1.1;\n}\n.clock.spent strong {\n  color: #ff8163;\n}\n.clock-bar {\n  height: 4px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.12);\n  margin: 0.35rem 0 0.3rem;\n  overflow: hidden;\n}\n.clock-bar span {\n  display: block;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #ff8163,\n      #ffc98c);\n  transition: width 120ms linear;\n}\n.clock-foot {\n  letter-spacing: 0.06em;\n  text-transform: none;\n}\n.prior {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.62rem;\n  margin: 0.5rem 0 0.7rem;\n}\n.prior th,\n.prior td {\n  border-bottom: 1px solid rgba(255, 171, 94, 0.16);\n  padding: 0.3rem 0.25rem;\n  text-align: left;\n  vertical-align: top;\n}\n.prior thead th {\n  color: #ffab5e;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.prior tbody th {\n  color: rgba(246, 237, 228, 0.86);\n  font-weight: 650;\n}\n.prior td {\n  color: rgba(246, 237, 228, 0.7);\n}\n.stage-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.8rem;\n}\n.decisive-count {\n  border: 1px solid rgba(255, 171, 94, 0.28);\n  border-radius: 0.5rem;\n  flex: none;\n  padding: 0.35rem 0.55rem;\n  text-align: center;\n}\n.decisive-count small {\n  display: block;\n  max-width: 8rem;\n  color: rgba(246, 237, 228, 0.6);\n  font-size: 0.56rem;\n  line-height: 1.25;\n}\n.decisive-count strong {\n  color: #ffc98c;\n  font-size: 1.2rem;\n}\n.hint {\n  margin: 0 0 0.7rem;\n  color: rgba(246, 237, 228, 0.78);\n  font-size: 0.72rem;\n  line-height: 1.45;\n}\n.test-list {\n  display: grid;\n  gap: 0.4rem;\n  list-style: none;\n  margin: 0 0 0.9rem;\n  padding: 0;\n}\n.test {\n  display: grid;\n  width: 100%;\n  align-items: center;\n  border: 1px solid rgba(255, 171, 94, 0.2);\n  border-radius: 0.6rem;\n  background: rgba(255, 171, 94, 0.05);\n  cursor: pointer;\n  gap: 0.6rem;\n  grid-template-columns: 3rem minmax(0, 1fr) auto;\n  padding: 0.5rem 0.6rem;\n  text-align: left;\n}\n.test:hover:not(:disabled) {\n  border-color: rgba(255, 171, 94, 0.5);\n  background: rgba(255, 171, 94, 0.11);\n}\n.test:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.test.done {\n  border-color: rgba(122, 214, 160, 0.4);\n  background: rgba(122, 214, 160, 0.07);\n  opacity: 0.78;\n}\n.test.busy {\n  border-color: rgba(255, 154, 60, 0.7);\n  opacity: 1;\n}\n.test-cost {\n  border-radius: 0.45rem;\n  background: rgba(255, 154, 60, 0.16);\n  color: #ffc98c;\n  font-size: 1.05rem;\n  font-weight: 800;\n  font-variant-numeric: tabular-nums;\n  padding: 0.25rem 0;\n  text-align: center;\n}\n.test-cost small {\n  display: block;\n  font-size: 0.5rem;\n  font-weight: 700;\n  letter-spacing: 0.1em;\n  opacity: 0.75;\n  text-transform: uppercase;\n}\n.test-body strong {\n  display: block;\n  font-size: 0.8rem;\n}\n.test-body small {\n  display: block;\n  color: rgba(246, 237, 228, 0.58);\n  font-size: 0.62rem;\n}\n.test-body em {\n  display: block;\n  color: rgba(246, 237, 228, 0.72);\n  font-size: 0.66rem;\n  font-style: normal;\n  margin-top: 0.15rem;\n}\n.test-state {\n  color: #ffab5e;\n  font-size: 0.62rem;\n  font-weight: 750;\n  letter-spacing: 0.08em;\n  text-align: right;\n  text-transform: uppercase;\n}\n.results ol {\n  display: grid;\n  gap: 0.5rem;\n  list-style: none;\n  margin: 0.4rem 0 0;\n  padding: 0;\n}\n.results li {\n  border-left: 3px solid rgba(255, 171, 94, 0.35);\n  border-radius: 0 0.5rem 0.5rem 0;\n  background: rgba(0, 0, 0, 0.25);\n  padding: 0.45rem 0.6rem;\n}\n.results li.decisive {\n  border-left-color: #7ad6a0;\n}\n.results header {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.results header strong {\n  font-size: 0.76rem;\n}\n.results header small {\n  color: rgba(246, 237, 228, 0.55);\n  font-size: 0.6rem;\n  font-variant-numeric: tabular-nums;\n}\n.results p {\n  margin: 0.2rem 0 0.3rem;\n  color: #ffe0c1;\n  font-size: 0.8rem;\n  font-weight: 650;\n}\n.results dl {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.15rem 0.9rem;\n  margin: 0;\n}\n.results dl div {\n  display: flex;\n  gap: 0.3rem;\n}\n.results dt {\n  color: rgba(246, 237, 228, 0.5);\n  font-size: 0.62rem;\n}\n.results dd {\n  margin: 0;\n  color: rgba(246, 237, 228, 0.85);\n  font-size: 0.62rem;\n}\n.call-options {\n  display: grid;\n  gap: 0.35rem;\n  margin: 0.35rem 0 0.8rem;\n}\n.call-options button,\n.citations button {\n  border: 1px solid rgba(255, 171, 94, 0.2);\n  border-radius: 0.55rem;\n  background: rgba(255, 171, 94, 0.05);\n  cursor: pointer;\n  padding: 0.45rem 0.55rem;\n  text-align: left;\n}\n.call-options button strong {\n  display: block;\n  font-size: 0.76rem;\n}\n.call-options button small {\n  display: block;\n  color: rgba(246, 237, 228, 0.6);\n  font-size: 0.62rem;\n  line-height: 1.35;\n  margin-top: 0.1rem;\n}\n.call-options button.selected,\n.citations button.selected {\n  border-color: #ff9a3c;\n  background: rgba(255, 154, 60, 0.18);\n}\n.call-options button:disabled,\n.citations button:disabled {\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.citations {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.3rem;\n  margin: 0.35rem 0 0.8rem;\n}\n.citations button {\n  font-size: 0.64rem;\n  padding: 0.25rem 0.45rem;\n}\n.reasoning-field,\n.confidence-field {\n  display: block;\n  color: rgba(246, 237, 228, 0.72);\n  font-size: 0.66rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  margin-bottom: 0.7rem;\n  text-transform: uppercase;\n}\n.reasoning-field textarea {\n  display: block;\n  width: 100%;\n  border: 1px solid rgba(255, 171, 94, 0.24);\n  border-radius: 0.5rem;\n  background: rgba(0, 0, 0, 0.3);\n  color: #f6ede4;\n  font-size: 0.74rem;\n  letter-spacing: normal;\n  margin-top: 0.3rem;\n  padding: 0.45rem 0.55rem;\n  resize: vertical;\n  text-transform: none;\n}\n.confidence-field strong {\n  color: #ffc98c;\n  margin-left: 0.35rem;\n}\n.confidence-field input {\n  display: block;\n  width: 100%;\n  margin-top: 0.3rem;\n  accent-color: #ff9a3c;\n}\n.verdict {\n  border: 1px solid rgba(255, 171, 94, 0.3);\n  border-radius: 0.65rem;\n  background: rgba(0, 0, 0, 0.32);\n  margin-top: 0.8rem;\n  padding: 0.6rem 0.7rem;\n}\n.verdict[data-tone=good] {\n  border-color: rgba(122, 214, 160, 0.55);\n  background: rgba(122, 214, 160, 0.09);\n}\n.verdict[data-tone=warn] {\n  border-color: rgba(255, 201, 140, 0.55);\n  background: rgba(255, 201, 140, 0.09);\n}\n.verdict[data-tone=bad] {\n  border-color: rgba(255, 129, 99, 0.6);\n  background: rgba(255, 129, 99, 0.1);\n}\n.verdict-label {\n  display: inline-block;\n  font-size: 0.58rem;\n  font-weight: 850;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\n.verdict[data-tone=good] .verdict-label {\n  color: #7ad6a0;\n}\n.verdict[data-tone=warn] .verdict-label {\n  color: #ffc98c;\n}\n.verdict[data-tone=bad] .verdict-label {\n  color: #ff8163;\n}\n.verdict p {\n  margin: 0.25rem 0 0.5rem;\n  color: rgba(246, 237, 228, 0.86);\n  font-size: 0.74rem;\n  line-height: 1.5;\n}\n.verdict-actions {\n  display: grid;\n  gap: 0.35rem;\n  margin-top: 0.6rem;\n}\n.verdict-actions .ghost {\n  text-align: center;\n}\n.bay-floor svg {\n  display: block;\n  width: 100%;\n  border-radius: 0.5rem;\n  background: rgba(0, 0, 0, 0.4);\n}\n.bay-floor .floor {\n  fill: #3a2116;\n}\n.bay-floor .spill {\n  fill: #d6e36a;\n  opacity: 0.55;\n}\n.bay-floor circle {\n  fill: rgba(226, 245, 255, 0.8);\n}\n.gas-count {\n  margin: 0.3rem 0 0;\n  color: rgba(246, 237, 228, 0.78);\n  font-size: 0.66rem;\n  text-align: center;\n}\n.gas-count strong {\n  color: #7ad6a0;\n  font-size: 0.9rem;\n  font-variant-numeric: tabular-nums;\n}\n@media (prefers-reduced-motion: reduce) {\n  .clock-bar span {\n    transition: none;\n  }\n}\n@container (max-width: 60rem) {\n  .bay-grid {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n:host {\n  container-type: inline-size;\n}\n:host(.workbench-station) {\n  position: relative;\n  inset: auto;\n}\n:host(.workbench-station) .bay-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 34rem;\n  overflow: visible;\n}\n:host(.lab-preview) {\n  position: relative;\n  inset: auto;\n  display: block;\n  container-type: inline-size;\n}\n:host(.lab-preview) .lab-canvas,\n:host(.lab-preview) .bench-canvas,\n:host(.lab-preview) .matter-canvas,\n:host(.lab-preview) .bay-canvas,\n:host(.lab-preview) .station-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 0;\n  overflow: visible;\n}\n:host(.lab-preview) .lab-grid,\n:host(.lab-preview) .bench-grid,\n:host(.lab-preview) .matter-grid,\n:host(.lab-preview) .bay-grid {\n  padding: 14px;\n  min-height: 0;\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n  gap: 12px;\n}\n:host(.lab-preview) .lab-grid.has-record,\n:host(.lab-preview) .bench-grid.has-record,\n:host(.lab-preview) .matter-grid.has-record {\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n}\n:host(.lab-preview) .lab-grid.has-record .rack,\n:host(.lab-preview) .bench-grid.has-record .rack,\n:host(.lab-preview) .matter-grid.has-record .rack {\n  display: block;\n}\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  grid-column: 1/-1;\n}\n:host(.lab-preview) .record[hidden] {\n  display: none;\n}\n:host(.lab-preview) .stage,\n:host(.lab-preview) .rig,\n:host(.lab-preview) .rack,\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  min-width: 0;\n}\n:host(.lab-preview) .kicker,\n:host(.lab-preview) .instrument-copy small,\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  display: block;\n}\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  max-height: 200px;\n  overflow: auto;\n}\n:host(.lab-preview) .instrument-well,\n:host(.lab-preview) .chamber-well {\n  min-height: 230px;\n}\n:host(.lab-preview) .instrument-well {\n  height: 245px;\n}\n:host(.lab-preview) .stage-controls {\n  margin-top: 10px;\n}\n:host(.lab-preview) .preview-run {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0;\n}\n:host(.lab-preview) .preview-run .primary-action {\n  width: auto;\n}\n:host(.lab-preview) .preview-run p {\n  flex-basis: 100%;\n  margin: 0;\n}\n:host(.lab-preview) h1 {\n  font-size: 1.2rem;\n}\n:host(.lab-preview) h2 {\n  font-size: 1rem;\n}\n:host(.lab-preview) button,\n:host(.lab-preview) select {\n  min-height: 44px;\n  font-size: 0.87rem;\n}\n:host(.lab-preview) small,\n:host(.lab-preview) .record-note,\n:host(.lab-preview) .stage-hint,\n:host(.lab-preview) .rig-hint,\n:host(.lab-preview) .hint,\n:host(.lab-preview) .readout small,\n:host(.lab-preview) .readout strong,\n:host(.lab-preview) .readout-stack small,\n:host(.lab-preview) .readout-stack strong,\n:host(.lab-preview) .rack-note {\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n:host(.lab-preview) input[type=range] {\n  min-height: 32px;\n}\n:host(.lab-preview) .prior {\n  width: 100%;\n  table-layout: fixed;\n  overflow-wrap: anywhere;\n}\n:host(.lab-preview) .bay-grid .rack {\n  grid-column: 1/-1;\n}\n:host(.lab-preview) .bay-grid .stage {\n  grid-column: 1/-1;\n}\n:host(.lab-preview) .test-list {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n}\n:host(.lab-preview) .test {\n  height: 100%;\n  min-width: 0;\n}\n:host(.lab-preview) .briefing-scrim {\n  position: relative;\n}\n:host(.lab-preview) :is(button, select, summary, input):focus-visible {\n  outline: 3px solid #a9efdc;\n  outline-offset: 3px;\n}\n@container (max-width: 640px) {\n  :host(.lab-preview) .lab-grid,\n  :host(.lab-preview) .bench-grid,\n  :host(.lab-preview) .matter-grid,\n  :host(.lab-preview) .bay-grid,\n  :host(.lab-preview) .lab-grid.has-record,\n  :host(.lab-preview) .bench-grid.has-record,\n  :host(.lab-preview) .matter-grid.has-record,\n  :host(.lab-preview) .restoration-stage {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 10px;\n  }\n  :host(.lab-preview) .stage,\n  :host(.lab-preview) .rig {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .rack {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .bay-grid .rack {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .bay-grid .stage {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .test-list,\n  :host(.lab-preview) .shelf-plan {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  :host(.lab-preview) .instrument-list,\n  :host(.lab-preview) .chamber-list {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  :host(.lab-preview) .focus-specimen {\n    max-width: 130px;\n    justify-self: center;\n  }\n  :host(.lab-preview) .focus-specimen img {\n    max-height: 150px;\n  }\n  :host(.lab-preview) .chamber-well {\n    gap: 8px;\n  }\n  :host(.lab-preview) .probe-rig {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=emergency-response.component.css.map */\n"] }]
  }], () => [], { captured: [{ type: Output, args: ["captured"] }], tub: [{ type: Input, args: [{ isSignal: true, alias: "tub", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmergencyResponseComponent, { className: "EmergencyResponseComponent", filePath: "src/app/projects/mystery-substance/emergency-response.component.ts", lineNumber: 67 });
})();
function seedFizz(index) {
  return {
    id: index,
    x: 8 + index * 37 % 144,
    y: 86 + index * 13 % 8,
    size: 1.4 + index * 7 % 5 * 0.4,
    speed: 1.1 + index * 11 % 6 * 0.25
  };
}
function readableLabel3(value) {
  const spaced = value.replace(/([a-z])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

// src/app/projects/mystery-substance/station-workspaces.ts
var _forTrack05 = ($index, $item) => $item.id;
function EvidenceWorkspaceComponent_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article", 3)(1, "button", 4);
    \u0275\u0275domListener("click", function EvidenceWorkspaceComponent_Conditional_3_Conditional_0_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activeId.set(void 0));
    });
    \u0275\u0275text(2, " \u2190 Case files ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "figure");
    \u0275\u0275domElement(4, "img", 5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "span", 6);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "h1");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "div", 7)(12, "a", 8);
    \u0275\u0275text(13, "Open raw file \u2197");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "button", 9);
    \u0275\u0275domListener("click", function EvidenceWorkspaceComponent_Conditional_3_Conditional_0_Template_button_click_14_listener() {
      const item_r3 = \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.save(item_r3.id));
    });
    \u0275\u0275text(15, " Capture this record ");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const item_r3 = ctx;
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("src", item_r3.asset, \u0275\u0275sanitizeUrl)("alt", item_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r3.type, " \xB7 recovered record");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.text);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("href", item_r3.file, \u0275\u0275sanitizeUrl);
  }
}
function EvidenceWorkspaceComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EvidenceWorkspaceComponent_Conditional_3_Conditional_0_Template, 16, 6, "article", 3);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_2_0 = ctx_r1.evidence(ctx)) ? 0 : -1, tmp_2_0);
  }
}
function EvidenceWorkspaceComponent_Conditional_4_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 13);
    \u0275\u0275domListener("click", function EvidenceWorkspaceComponent_Conditional_4_For_9_Template_button_click_0_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activeId.set(item_r5.id));
    });
    \u0275\u0275domElement(1, "img", 14);
    \u0275\u0275domElementStart(2, "span")(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275domProperty("src", item_r5.asset, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r5.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.title);
  }
}
function EvidenceWorkspaceComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 10)(1, "span", 6);
    \u0275\u0275text(2, "Evidence Locker \xB7 ten recovered records");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h1");
    \u0275\u0275text(4, "Choose one case file to inspect.");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6, " Compare direct observations, measurements, references, and recollections without deciding the answer yet. ");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "div", 11);
    \u0275\u0275repeaterCreate(8, EvidenceWorkspaceComponent_Conditional_4_For_9_Template, 7, 3, "button", 12, _forTrack05);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.evidenceFiles);
  }
}
var _forTrack14 = ($index, $item) => $item.vialId;
function RestorationWorkspaceComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vial_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", vial_r1.vialId)("selected", ctx_r1.activeVialId() === vial_r1.vialId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Vial ", vial_r1.code);
  }
}
function RestorationWorkspaceComponent_Conditional_11_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const label_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", label_r4.id)("selected", ctx_r1.activeAssignment().labelId === label_r4.id)("disabled", ctx_r1.usedByOther(label_r4.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(label_r4.title);
  }
}
function RestorationWorkspaceComponent_Conditional_11_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const zone_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", zone_r5.id)("selected", ctx_r1.activeAssignment().zoneId === zone_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(zone_r5.title);
  }
}
function RestorationWorkspaceComponent_Conditional_11_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", item_r6.id)("selected", ctx_r1.activeAssignment().recommendationId === item_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r6.title);
  }
}
function RestorationWorkspaceComponent_Conditional_11_For_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function RestorationWorkspaceComponent_Conditional_11_For_29_Template_button_click_0_listener() {
      const vial_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectVial(vial_r8.vialId));
    });
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const vial_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.activeVialId() === vial_r8.vialId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Vial ", vial_r8.code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.assignmentTitle(vial_r8.vialId, "labelId"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.assignmentTitle(vial_r8.vialId, "zoneId"), " \xB7 ", ctx_r1.assignmentTitle(vial_r8.vialId, "recommendationId"));
  }
}
function RestorationWorkspaceComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h1");
    \u0275\u0275text(1, "Build the shelf plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Editable local product \xB7 no submission or assessment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "label");
    \u0275\u0275text(5, "Label ");
    \u0275\u0275elementStart(6, "select", 10);
    \u0275\u0275listener("change", function RestorationWorkspaceComponent_Conditional_11_Template_select_change_6_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setField("labelId", $event.target.value));
    });
    \u0275\u0275elementStart(7, "option", 11);
    \u0275\u0275text(8, "Unlabelled");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, RestorationWorkspaceComponent_Conditional_11_For_10_Template, 2, 4, "option", 12, _forTrack05);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "label");
    \u0275\u0275text(12, "Shelf position ");
    \u0275\u0275elementStart(13, "select", 13);
    \u0275\u0275listener("change", function RestorationWorkspaceComponent_Conditional_11_Template_select_change_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setField("zoneId", $event.target.value));
    });
    \u0275\u0275elementStart(14, "option", 11);
    \u0275\u0275text(15, "Unassigned");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(16, RestorationWorkspaceComponent_Conditional_11_For_17_Template, 2, 3, "option", 8, _forTrack05);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "label");
    \u0275\u0275text(19, "Handling plan ");
    \u0275\u0275elementStart(20, "select", 14);
    \u0275\u0275listener("change", function RestorationWorkspaceComponent_Conditional_11_Template_select_change_20_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setField("recommendationId", $event.target.value));
    });
    \u0275\u0275elementStart(21, "option", 11);
    \u0275\u0275text(22, "Undecided");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(23, RestorationWorkspaceComponent_Conditional_11_For_24_Template, 2, 3, "option", 8, _forTrack05);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "button", 15);
    \u0275\u0275listener("click", function RestorationWorkspaceComponent_Conditional_11_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearAssignment());
    });
    \u0275\u0275text(26, "Clear this vial's plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 16);
    \u0275\u0275repeaterCreate(28, RestorationWorkspaceComponent_Conditional_11_For_29_Template, 7, 5, "button", 17, _forTrack14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r1.activeAssignment().labelId ?? "");
    \u0275\u0275advance();
    \u0275\u0275property("selected", !ctx_r1.activeAssignment().labelId);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.labels);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.activeAssignment().zoneId ?? "");
    \u0275\u0275advance();
    \u0275\u0275property("selected", !ctx_r1.activeAssignment().zoneId);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.zones);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.activeAssignment().recommendationId ?? "");
    \u0275\u0275advance();
    \u0275\u0275property("selected", !ctx_r1.activeAssignment().recommendationId);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.recommendations);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.vials);
  }
}
function RestorationWorkspaceComponent_Conditional_12_Conditional_3_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Already assigned");
    \u0275\u0275elementEnd();
  }
}
function RestorationWorkspaceComponent_Conditional_12_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function RestorationWorkspaceComponent_Conditional_12_Conditional_3_For_2_Template_button_click_0_listener() {
      const label_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setField("labelId", label_r10.id));
    });
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, RestorationWorkspaceComponent_Conditional_12_Conditional_3_For_2_Conditional_3_Template, 2, 0, "small");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const label_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r1.activeAssignment().labelId === label_r10.id);
    \u0275\u0275property("disabled", ctx_r1.usedByOther(label_r10.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(label_r10.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.usedByOther(label_r10.id) ? 3 : -1);
  }
}
function RestorationWorkspaceComponent_Conditional_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275repeaterCreate(1, RestorationWorkspaceComponent_Conditional_12_Conditional_3_For_2_Template, 4, 5, "button", 24, _forTrack05);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.labels);
  }
}
function RestorationWorkspaceComponent_Conditional_12_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function RestorationWorkspaceComponent_Conditional_12_Conditional_4_For_2_Template_button_click_0_listener() {
      const zone_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setField("zoneId", zone_r12.id));
    });
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const zone_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r1.activeAssignment().zoneId === zone_r12.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(zone_r12.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(zone_r12.note);
  }
}
function RestorationWorkspaceComponent_Conditional_12_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275repeaterCreate(1, RestorationWorkspaceComponent_Conditional_12_Conditional_4_For_2_Template, 5, 4, "button", 26, _forTrack05);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.zones);
  }
}
function RestorationWorkspaceComponent_Conditional_12_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function RestorationWorkspaceComponent_Conditional_12_Conditional_5_For_2_Template_button_click_0_listener() {
      const recommendation_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setField("recommendationId", recommendation_r14.id));
    });
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const recommendation_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r1.activeAssignment().recommendationId === recommendation_r14.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(recommendation_r14.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(recommendation_r14.note);
  }
}
function RestorationWorkspaceComponent_Conditional_12_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275repeaterCreate(1, RestorationWorkspaceComponent_Conditional_12_Conditional_5_For_2_Template, 5, 4, "button", 26, _forTrack05);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.recommendations);
  }
}
function RestorationWorkspaceComponent_Conditional_12_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 27);
    \u0275\u0275text(1, "Which test supports your choice? ");
    \u0275\u0275elementStart(2, "textarea", 28);
    \u0275\u0275listener("ngModelChange", function RestorationWorkspaceComponent_Conditional_12_Conditional_6_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setField("reasoning", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "details", 29)(4, "summary");
    \u0275\u0275text(5, "How sure are you?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "label", 30);
    \u0275\u0275text(7, "Evidence confidence ");
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 31);
    \u0275\u0275listener("input", function RestorationWorkspaceComponent_Conditional_12_Conditional_6_Template_input_input_10_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setField("confidence", ctx_r1.numberValue($event)));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.activeAssignment().reasoning ?? "");
    \u0275\u0275control();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", ctx_r1.activeAssignment().confidence ?? 50, "%");
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.activeAssignment().confidence ?? 50);
  }
}
function RestorationWorkspaceComponent_Conditional_12_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function RestorationWorkspaceComponent_Conditional_12_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      \u0275\u0275nextContext();
      const question_r17 = \u0275\u0275reference(1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.previous();
      return \u0275\u0275resetView(question_r17.focus());
    });
    \u0275\u0275text(1, " \u2190 Back ");
    \u0275\u0275elementEnd();
  }
}
function RestorationWorkspaceComponent_Conditional_12_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function RestorationWorkspaceComponent_Conditional_12_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveCase());
    });
    \u0275\u0275text(1, " Save case draft ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r1.canContinue());
  }
}
function RestorationWorkspaceComponent_Conditional_12_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function RestorationWorkspaceComponent_Conditional_12_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      \u0275\u0275nextContext();
      const question_r17 = \u0275\u0275reference(1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.next();
      return \u0275\u0275resetView(question_r17.focus());
    });
    \u0275\u0275text(1, " Continue \u2192 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r1.canContinue());
  }
}
function RestorationWorkspaceComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h1", 19, 0);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, RestorationWorkspaceComponent_Conditional_12_Conditional_3_Template, 3, 0, "div", 20)(4, RestorationWorkspaceComponent_Conditional_12_Conditional_4_Template, 3, 0, "div", 20)(5, RestorationWorkspaceComponent_Conditional_12_Conditional_5_Template, 3, 0, "div", 20)(6, RestorationWorkspaceComponent_Conditional_12_Conditional_6_Template, 11, 3);
    \u0275\u0275elementStart(7, "div", 21);
    \u0275\u0275conditionalCreate(8, RestorationWorkspaceComponent_Conditional_12_Conditional_8_Template, 2, 0, "button", 22);
    \u0275\u0275conditionalCreate(9, RestorationWorkspaceComponent_Conditional_12_Conditional_9_Template, 2, 1, "button", 23)(10, RestorationWorkspaceComponent_Conditional_12_Conditional_10_Template, 2, 1, "button", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.questionText());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.mode() === "label" ? 3 : ctx_r1.mode() === "position" ? 4 : ctx_r1.mode() === "decision" ? 5 : 6);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.mode() !== "label" ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.mode() === "explain" ? 9 : 10);
  }
}
var _c03 = '\n[_nghost-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: block;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  color: inherit;\n}\n.station-canvas[_ngcontent-%COMP%], \n.atlas[_ngcontent-%COMP%], \n.station-shade[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.station-canvas[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: #ebf7fc;\n  background: #04101a;\n}\n.atlas[_ngcontent-%COMP%] {\n  z-index: 0;\n  background-color: #04101a;\n  background-repeat: no-repeat;\n  background-size: cover;\n  filter: saturate(0.91) contrast(1.04) brightness(0.72);\n}\n.atlas--evidence[_ngcontent-%COMP%], \n.atlas--showcase[_ngcontent-%COMP%] {\n  background-image: url(/evidence-artwork/e10-shelf-audit.webp);\n  background-position: center;\n}\n.atlas--week2[_ngcontent-%COMP%] {\n  background-image: url(/week2-test-scenes-v2.webp);\n  background-size: 200% 200%;\n}\n.atlas--week3[_ngcontent-%COMP%] {\n  background-image: url(/week3-test-scenes-v2.webp);\n  background-size: 200% 100%;\n}\n.atlas--conservation[_ngcontent-%COMP%] {\n  background-image: url(/conservation-test-scenes-v2.webp);\n  background-size: 200% 100%;\n}\n.atlas--week4[_ngcontent-%COMP%] {\n  background-image: url(/week4-test-scenes-v2.webp);\n  background-size: 200% 200%;\n}\n.station-shade[_ngcontent-%COMP%] {\n  z-index: 1;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(3, 12, 19, 0.9),\n      rgba(3, 12, 19, 0.25) 58%,\n      rgba(3, 12, 19, 0.52)),\n    linear-gradient(\n      180deg,\n      rgba(2, 10, 17, 0.2),\n      rgba(2, 10, 17, 0.65));\n}\n.station-kicker[_ngcontent-%COMP%] {\n  color: #79d8d5;\n  font-size: 0.65rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0.48rem 0 0.35rem;\n  color: #f1f8fc;\n  font-size: clamp(1.55rem, 3vw, 2.8rem);\n  line-height: 1.03;\n  letter-spacing: -0.035em;\n}\np[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #adc3cf;\n  line-height: 1.5;\n}\n.station-intro[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  top: 11%;\n  left: 6%;\n  width: min(34rem, 48vw);\n  border-left: 2px solid #6ddad7;\n  padding: 1rem 1.25rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(4, 16, 25, 0.84),\n      transparent);\n}\n.evidence-filmstrip[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 4;\n  right: 4%;\n  bottom: 5%;\n  left: 4%;\n  display: grid;\n  grid-template-columns: repeat(5, minmax(8rem, 1fr));\n  gap: 0.45rem;\n}\n.evidence-filmstrip[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  grid-template-columns: 3.8rem 1fr;\n  align-items: center;\n  gap: 0.55rem;\n  overflow: hidden;\n  border: 1px solid rgba(140, 190, 207, 0.22);\n  border-radius: 0.55rem;\n  padding: 0.35rem;\n  text-align: left;\n  background: rgba(5, 20, 30, 0.9);\n  cursor: pointer;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.evidence-filmstrip[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  border-color: rgba(104, 220, 216, 0.56);\n  transform: translateY(-2px);\n}\n.evidence-filmstrip[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 3.8rem;\n  height: 3rem;\n  border-radius: 0.32rem;\n  object-fit: cover;\n}\n.evidence-filmstrip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.evidence-filmstrip[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.evidence-filmstrip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.evidence-filmstrip[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: #7196a8;\n  font-size: 0.55rem;\n  text-overflow: ellipsis;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.evidence-filmstrip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: #dceaf0;\n  font-size: 0.72rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.evidence-inspector[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 4;\n  top: 5%;\n  right: 6%;\n  bottom: 5%;\n  width: min(31rem, 44vw);\n  overflow: auto;\n  border: 1px solid rgba(139, 189, 206, 0.28);\n  border-radius: 0.8rem;\n  padding: 1rem;\n  background: rgba(4, 16, 25, 0.94);\n  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);\n  -webkit-backdrop-filter: blur(14px);\n  backdrop-filter: blur(14px);\n}\n.evidence-inspector[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%] {\n  margin: 0.75rem 0 1rem;\n  overflow: hidden;\n  border-radius: 0.55rem;\n}\n.evidence-inspector[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16/9;\n  object-fit: cover;\n}\n.back-button[_ngcontent-%COMP%] {\n  border: 0;\n  color: #91ddda;\n  background: transparent;\n  cursor: pointer;\n}\n.inspector-actions[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.7rem;\n  margin-top: 1rem;\n}\n.inspector-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #85d8d6;\n}\n.lab-console[_ngcontent-%COMP%], \n.reaction-console[_ngcontent-%COMP%], \n.conservation-console[_ngcontent-%COMP%], \n.restoration-console[_ngcontent-%COMP%], \n.showcase-console[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 4;\n  overflow: auto;\n  border: 1px solid rgba(140, 190, 207, 0.27);\n  border-radius: 0.78rem;\n  padding: clamp(1rem, 2vw, 1.6rem);\n  background: rgba(4, 16, 25, 0.93);\n  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.45);\n  -webkit-backdrop-filter: blur(15px);\n  backdrop-filter: blur(15px);\n}\n.lab-console[_ngcontent-%COMP%] {\n  top: 10%;\n  right: 5%;\n  bottom: 5%;\n  width: min(34rem, 47vw);\n}\n.instrument-tabs[_ngcontent-%COMP%], \n.reaction-selector[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 5;\n  top: 9%;\n  left: 3.5%;\n  display: grid;\n  width: min(19rem, 37vw);\n  gap: 0.45rem;\n}\n.instrument-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.reaction-selector[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.12rem;\n  border: 1px solid rgba(140, 188, 204, 0.22);\n  border-radius: 0.5rem;\n  padding: 0.65rem 0.8rem;\n  text-align: left;\n  background: rgba(4, 17, 27, 0.84);\n  cursor: pointer;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.instrument-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%], \n.reaction-selector[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #74dcd8;\n  background: rgba(31, 99, 106, 0.54);\n}\n.instrument-tabs[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.reaction-selector[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #6f98a8;\n  font-size: 0.58rem;\n  text-transform: uppercase;\n}\n.instrument-tabs[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.reaction-selector[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.specimen-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.42rem;\n  margin: 1rem 0;\n}\n.specimen-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: 2.1rem 1fr;\n  align-items: center;\n  gap: 0.3rem;\n  overflow: hidden;\n  border: 1px solid rgba(137, 184, 201, 0.22);\n  border-radius: 0.48rem;\n  padding: 0.3rem;\n  text-align: left;\n  background: rgba(15, 36, 48, 0.82);\n  cursor: pointer;\n}\n.specimen-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]::after {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 2px;\n  background: var(--%NS%vial-color);\n  content: "";\n}\n.specimen-row[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: color-mix(in srgb, var(--%NS%vial-color), white 25%);\n  background: rgba(36, 72, 85, 0.95);\n}\n.specimen-row[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 1.9rem;\n  height: 3rem;\n  grid-row: span 2;\n  object-fit: contain;\n}\n.specimen-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  align-self: end;\n}\n.specimen-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  align-self: start;\n  color: #7393a3;\n  font-size: 0.58rem;\n}\n.raw-readout[_ngcontent-%COMP%], \n.comparison-readout[_ngcontent-%COMP%], \n.mass-display[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n  border: 1px solid rgba(116, 205, 207, 0.22);\n  border-radius: 0.55rem;\n  padding: 0.75rem;\n  background: rgba(2, 11, 18, 0.77);\n}\n.raw-readout[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.raw-readout[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  color: #75ceca;\n  font-size: 0.6rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.raw-readout[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], \n.comparison-readout[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.1rem;\n  border-left: 1px solid rgba(117, 190, 197, 0.25);\n  padding-left: 0.55rem;\n}\n.raw-readout[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.comparison-readout[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.mass-display[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #718e9e;\n  font-size: 0.57rem;\n  text-transform: uppercase;\n}\n.raw-readout[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.comparison-readout[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e1eff4;\n  font-size: 0.74rem;\n}\n.empty-readout[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 7.5rem;\n  place-content: center;\n  justify-items: center;\n  border: 1px dashed rgba(133, 185, 201, 0.24);\n  border-radius: 0.55rem;\n  padding: 1rem;\n  color: #a9c0cc;\n  text-align: center;\n  background: rgba(3, 13, 21, 0.58);\n}\n.empty-readout[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  width: 0.7rem;\n  height: 0.7rem;\n  margin-bottom: 0.55rem;\n  border: 2px solid #75d7d4;\n  border-radius: 50%;\n  box-shadow: 0 0 15px rgba(83, 218, 211, 0.6);\n}\n.empty-readout[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  color: #6f8c9c;\n}\n.station-primary[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  min-height: 2.8rem;\n  align-items: center;\n  justify-content: center;\n  margin-top: 0.75rem;\n  border: 1px solid #79dedb;\n  border-radius: 0.5rem;\n  color: #042125;\n  background:\n    linear-gradient(\n      135deg,\n      #a0f1e8,\n      #5dc9d0);\n  font-weight: 850;\n  cursor: pointer;\n}\n.station-primary[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  filter: grayscale(0.75);\n  opacity: 0.58;\n}\n.reaction-console[_ngcontent-%COMP%] {\n  top: 7%;\n  right: 4%;\n  bottom: 5%;\n  width: min(38rem, 52vw);\n}\n.reaction-selector[_ngcontent-%COMP%] {\n  top: 14%;\n  width: min(15rem, 29vw);\n}\n.beaker-pair[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: end;\n  gap: 0.7rem;\n  margin: 1rem 0;\n}\n.beaker-pair[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n  color: #7796a6;\n  font-size: 0.62rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.beaker-pair[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  border: 1px solid rgba(129, 187, 203, 0.3);\n  border-radius: 0.42rem;\n  padding: 0.58rem;\n  color: #e7f4f8;\n  background: #0b2432;\n}\n.beaker-pair[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  padding-bottom: 0.6rem;\n  color: #70d1ce;\n}\n.comparison-readout[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.comparison-readout[_ngcontent-%COMP%]   section[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n}\n.comparison-readout[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #76d8d4;\n  font-weight: 850;\n}\n.conservation-console[_ngcontent-%COMP%] {\n  top: 8%;\n  right: 5%;\n  bottom: 6%;\n  width: min(37rem, 51vw);\n}\n.trial-toggle[_ngcontent-%COMP%], \n.mode-tabs[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.45rem;\n  margin: 1rem 0;\n}\n.trial-toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.mode-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.12rem;\n  border: 1px solid rgba(135, 184, 200, 0.23);\n  border-radius: 0.45rem;\n  padding: 0.6rem;\n  text-align: left;\n  background: rgba(14, 37, 49, 0.78);\n  cursor: pointer;\n}\n.trial-toggle[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%], \n.mode-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #72d8d5;\n  background: rgba(33, 104, 108, 0.45);\n}\n.trial-toggle[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7694a3;\n  font-size: 0.58rem;\n  text-transform: uppercase;\n}\n.mass-display[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  text-align: center;\n}\n.mass-display[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.18rem;\n}\n.mass-display[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dff9f4;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  font-size: 1.45rem;\n}\n.mass-display[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #6d8e9d;\n  font-size: 0.66rem;\n}\n.raw-observation[_ngcontent-%COMP%] {\n  margin: 0.65rem 0;\n  border-left: 2px solid #72d7d3;\n  padding: 0.5rem 0.7rem;\n  background: rgba(5, 20, 29, 0.72);\n  font-size: 0.76rem;\n}\n.restoration-console[_ngcontent-%COMP%] {\n  top: 4%;\n  right: 4%;\n  bottom: 4%;\n  width: min(43rem, 58vw);\n}\n.restoration-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(1.35rem, 2.5vw, 2.25rem);\n}\n.specimen-row--compact[_ngcontent-%COMP%] {\n  margin: 0.75rem 0;\n}\n.mode-tabs[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, 1fr);\n  margin: 0.6rem 0;\n}\n.mode-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: block;\n  text-align: center;\n  font-size: 0.68rem;\n}\n.decision-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.45rem;\n}\n.decision-grid[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 4rem;\n  gap: 0.2rem;\n  border: 1px solid rgba(134, 184, 200, 0.23);\n  border-radius: 0.46rem;\n  padding: 0.65rem;\n  text-align: left;\n  background: rgba(12, 34, 46, 0.82);\n  cursor: pointer;\n}\n.decision-grid[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: #72d9d5;\n  background: rgba(31, 103, 108, 0.48);\n}\n.decision-grid[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.46;\n}\n.decision-grid[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7795a4;\n  font-size: 0.62rem;\n}\n.reasoning-field[_ngcontent-%COMP%], \n.confidence-field[_ngcontent-%COMP%], \n.showcase-console[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  color: #91aeba;\n  font-size: 0.68rem;\n  font-weight: 750;\n}\ntextarea[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 100%;\n  resize: vertical;\n  border: 1px solid rgba(133, 185, 201, 0.27);\n  border-radius: 0.45rem;\n  padding: 0.65rem;\n  color: #e8f4f8;\n  outline: none;\n  background: rgba(2, 12, 19, 0.76);\n}\ntextarea[_ngcontent-%COMP%]:focus {\n  border-color: #77d8d5;\n  box-shadow: 0 0 0 3px rgba(82, 202, 201, 0.12);\n}\n.confidence-field[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr auto;\n  margin-top: 0.65rem;\n}\n.confidence-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  width: 100%;\n  accent-color: #68d1cf;\n}\n.showcase-console[_ngcontent-%COMP%] {\n  top: 4%;\n  right: 4%;\n  bottom: 4%;\n  width: min(47rem, 64vw);\n}\n.showcase-evidence[_ngcontent-%COMP%] {\n  display: flex;\n  max-height: 7.3rem;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  overflow: auto;\n  margin: 0.8rem 0;\n}\n.showcase-evidence[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid rgba(136, 184, 200, 0.24);\n  border-radius: 999px;\n  padding: 0.38rem 0.6rem;\n  color: #9cb7c3;\n  background: rgba(13, 37, 49, 0.83);\n  font-size: 0.63rem;\n  cursor: pointer;\n}\n.showcase-evidence[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: #78dad6;\n  color: #e6fffb;\n  background: rgba(34, 111, 114, 0.5);\n}\n.showcase-console[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    + label[_ngcontent-%COMP%] {\n  margin-top: 0.65rem;\n}\n.showcase-footer[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr minmax(13rem, 0.65fr);\n  align-items: center;\n  gap: 0.75rem;\n  margin-top: 0.7rem;\n}\n.showcase-footer[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #7e9aa7;\n  font-size: 0.65rem;\n}\n.showcase-footer[_ngcontent-%COMP%]   .station-primary[_ngcontent-%COMP%] {\n  margin: 0;\n}\n@container (max-width: 820px) {\n  .station-intro[_ngcontent-%COMP%] {\n    top: 7%;\n    left: 4%;\n    width: 82%;\n  }\n  .evidence-filmstrip[_ngcontent-%COMP%] {\n    top: 41%;\n    right: 3%;\n    bottom: 3%;\n    left: 3%;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    overflow: auto;\n  }\n  .evidence-inspector[_ngcontent-%COMP%], \n   .lab-console[_ngcontent-%COMP%], \n   .reaction-console[_ngcontent-%COMP%], \n   .conservation-console[_ngcontent-%COMP%], \n   .restoration-console[_ngcontent-%COMP%], \n   .showcase-console[_ngcontent-%COMP%] {\n    top: 2%;\n    right: 3%;\n    bottom: 2%;\n    width: auto;\n  }\n  .instrument-tabs[_ngcontent-%COMP%], \n   .reaction-selector[_ngcontent-%COMP%] {\n    z-index: 6;\n    top: auto;\n    right: 4%;\n    bottom: 3%;\n    left: 4%;\n    width: auto;\n    grid-template-columns: repeat(4, 1fr);\n  }\n  .instrument-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n   .reaction-selector[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 0;\n    padding: 0.42rem;\n  }\n  .instrument-tabs[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n   .reaction-selector[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .lab-console[_ngcontent-%COMP%], \n   .reaction-console[_ngcontent-%COMP%] {\n    bottom: 5.3rem;\n  }\n  .reaction-selector[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .specimen-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    grid-template-columns: 1.65rem 1fr;\n  }\n  .specimen-row[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 1.55rem;\n    height: 2.5rem;\n  }\n  .comparison-readout[_ngcontent-%COMP%], \n   .decision-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .mode-tabs[_ngcontent-%COMP%] {\n    position: sticky;\n    z-index: 2;\n    top: -1rem;\n    background: #071824;\n  }\n  .showcase-footer[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n  }\n}\n[_nghost-%COMP%] {\n  container-type: inline-size;\n}\n.workbench-station[_nghost-%COMP%] {\n  position: relative;\n  inset: auto;\n}\n.workbench-station[_nghost-%COMP%]   .station-canvas[_ngcontent-%COMP%] {\n  position: relative;\n  inset: auto;\n  min-height: 34rem;\n  overflow: visible;\n}\n.workbench-station[_nghost-%COMP%]   .restoration-console[_ngcontent-%COMP%] {\n  position: relative;\n  inset: auto;\n  width: min(42rem, 100% - 2rem);\n  max-height: none;\n  margin: 1rem 1rem 1rem auto;\n  overflow: visible;\n}\n.workbench-station[_nghost-%COMP%]   .restoration-workspace[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n}\n.restoration-workspace[_ngcontent-%COMP%]   .atlas[_ngcontent-%COMP%] {\n  filter: saturate(1.05) brightness(0.9);\n}\n.restoration-workspace[_ngcontent-%COMP%]   .station-shade[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(3, 16, 26, 0.2),\n      rgba(3, 16, 26, 0.1333333333) 40%,\n      rgba(3, 16, 26, 0.6666666667));\n}\n.restoration-stage[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 3;\n  min-height: 100dvh;\n  box-sizing: border-box;\n  display: grid;\n  grid-template-columns: 1fr minmax(300px, 470px);\n  align-items: center;\n  gap: clamp(24px, 7vw, 110px);\n  max-width: 1160px;\n  margin: auto;\n  padding: 86px 36px 40px;\n}\n.workbench-station[_nghost-%COMP%]   .restoration-console[_ngcontent-%COMP%] {\n  width: auto;\n  margin: 0;\n  padding: clamp(24px, 3vw, 40px);\n  background: rgba(8, 28, 41, 0.9098039216);\n  border-radius: 22px;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4666666667);\n}\n.restoration-console[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(25px, 3vw, 38px);\n  line-height: 1.12;\n  margin: 0 0 26px;\n}\n.restoration-console[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.focus-specimen[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  gap: 22px;\n  margin: 0;\n}\n.focus-specimen[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 100%;\n  width: 250px;\n  height: min(48dvh, 410px);\n  object-fit: contain;\n  filter: drop-shadow(0 24px 34px rgba(0, 0, 0, 0.6));\n}\n.focus-specimen[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  min-height: 44px;\n  color: #f0fafa;\n  background: rgba(16, 43, 53, 0.9098039216);\n  border: 1px solid #7ea4ad;\n  border-radius: 24px;\n}\n.restoration-console[_ngcontent-%COMP%]   .decision-grid[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n  gap: 10px;\n}\n.restoration-console[_ngcontent-%COMP%]   .decision-grid[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 56px;\n  padding: 14px 16px;\n  font-size: 16px;\n}\n.restoration-console[_ngcontent-%COMP%]   .decision-grid[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.4;\n}\n.decision-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-top: 24px;\n}\n.decision-actions[_ngcontent-%COMP%]   .station-primary[_ngcontent-%COMP%] {\n  margin: 0 0 0 auto;\n  width: auto;\n  min-width: 140px;\n  min-height: 48px;\n  font-size: 15px;\n}\n.decision-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.confidence-details[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-size: 13px;\n}\n.confidence-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n@media (max-width: 700px) {\n  .restoration-stage[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 20px;\n    padding: 82px 18px 24px;\n  }\n  .focus-specimen[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  .focus-specimen[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n    height: 190px;\n    width: 160px;\n  }\n  .workbench-station[_nghost-%COMP%]   .restoration-console[_ngcontent-%COMP%] {\n    width: auto;\n    padding: 24px;\n  }\n}\n.lab-preview[_nghost-%COMP%] {\n  position: relative;\n  inset: auto;\n  display: block;\n  container-type: inline-size;\n}\n.lab-preview[_nghost-%COMP%]   .lab-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bay-canvas[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .station-canvas[_ngcontent-%COMP%] {\n  position: relative;\n  inset: auto;\n  min-height: 0;\n  overflow: visible;\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%] {\n  padding: 14px;\n  min-height: 0;\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n  gap: 12px;\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n}\n.lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%] {\n  display: block;\n}\n.lab-preview[_nghost-%COMP%]   .record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .console[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.lab-preview[_nghost-%COMP%]   .record[hidden][_ngcontent-%COMP%] {\n  display: none;\n}\n.lab-preview[_nghost-%COMP%]   .stage[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rig[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rack[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .record[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .console[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.lab-preview[_nghost-%COMP%]   .kicker[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .instrument-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .trial-log[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .procedure-log[_ngcontent-%COMP%] {\n  display: block;\n}\n.lab-preview[_nghost-%COMP%]   .trial-log[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .procedure-log[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow: auto;\n}\n.lab-preview[_nghost-%COMP%]   .instrument-well[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .chamber-well[_ngcontent-%COMP%] {\n  min-height: 230px;\n}\n.lab-preview[_nghost-%COMP%]   .instrument-well[_ngcontent-%COMP%] {\n  height: 245px;\n}\n.lab-preview[_nghost-%COMP%]   .stage-controls[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%] {\n  width: auto;\n}\n.lab-preview[_nghost-%COMP%]   .preview-run[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  flex-basis: 100%;\n  margin: 0;\n}\n.lab-preview[_nghost-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.lab-preview[_nghost-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.lab-preview[_nghost-%COMP%]   button[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 44px;\n  font-size: 0.87rem;\n}\n.lab-preview[_nghost-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .record-note[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .stage-hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rig-hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .hint[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout-stack[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .readout-stack[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.lab-preview[_nghost-%COMP%]   .rack-note[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.lab-preview[_nghost-%COMP%]   input[type=range][_ngcontent-%COMP%] {\n  min-height: 32px;\n}\n.lab-preview[_nghost-%COMP%]   .restoration-stage[_ngcontent-%COMP%] {\n  position: relative;\n  inset: auto;\n  display: grid;\n  grid-template-columns: minmax(110px, 0.6fr) minmax(0, 1.7fr);\n  padding: 20px;\n  min-height: 0;\n  gap: 20px;\n}\n.lab-preview[_nghost-%COMP%]   .restoration-console[_ngcontent-%COMP%] {\n  position: relative;\n  width: auto;\n  max-width: none;\n  min-width: 0;\n}\n.lab-preview[_nghost-%COMP%]   .restoration-console[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  margin: 12px 0;\n}\n.lab-preview[_nghost-%COMP%]   .restoration-console[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #102b38;\n  border: 1px solid #527888;\n  color: #eefaff;\n  padding: 8px;\n  border-radius: 6px;\n}\n.lab-preview[_nghost-%COMP%]   .focus-specimen[_ngcontent-%COMP%] {\n  width: auto;\n  align-self: start;\n  margin: 0;\n}\n.lab-preview[_nghost-%COMP%]   .focus-specimen[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 260px;\n  object-fit: contain;\n}\n.lab-preview[_nghost-%COMP%]   .focus-specimen[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  max-width: 100%;\n}\n.lab-preview[_nghost-%COMP%]   .shelf-plan[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n  margin-top: 20px;\n}\n.lab-preview[_nghost-%COMP%]   .shelf-plan[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n  text-align: left;\n  border: 1px solid #4b7181;\n  border-radius: 8px;\n  background: #173848;\n  color: #e9f6fb;\n  padding: 10px;\n  overflow-wrap: anywhere;\n}\n.lab-preview[_nghost-%COMP%]   .shelf-plan[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  border: 2px solid #8be5d7;\n}\n.lab-preview[_nghost-%COMP%]   [_ngcontent-%COMP%]:is(button, select, summary, input):focus-visible {\n  outline: 3px solid #a9efdc;\n  outline-offset: 3px;\n}\n@container (max-width: 640px) {\n  .lab-preview[_nghost-%COMP%]   .lab-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bench-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .matter-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .lab-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .bench-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .matter-grid.has-record[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .restoration-stage[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 10px;\n  }\n  .lab-preview[_nghost-%COMP%]   .stage[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .rig[_ngcontent-%COMP%] {\n    grid-row: 1;\n  }\n  .lab-preview[_nghost-%COMP%]   .rack[_ngcontent-%COMP%] {\n    grid-row: 2;\n  }\n  .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%]   .rack[_ngcontent-%COMP%] {\n    grid-row: 1;\n  }\n  .lab-preview[_nghost-%COMP%]   .bay-grid[_ngcontent-%COMP%]   .stage[_ngcontent-%COMP%] {\n    grid-row: 2;\n  }\n  .lab-preview[_nghost-%COMP%]   .test-list[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .shelf-plan[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .lab-preview[_nghost-%COMP%]   .instrument-list[_ngcontent-%COMP%], \n   .lab-preview[_nghost-%COMP%]   .chamber-list[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .lab-preview[_nghost-%COMP%]   .focus-specimen[_ngcontent-%COMP%] {\n    max-width: 130px;\n    justify-self: center;\n  }\n  .lab-preview[_nghost-%COMP%]   .focus-specimen[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    max-height: 150px;\n  }\n  .lab-preview[_nghost-%COMP%]   .chamber-well[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .lab-preview[_nghost-%COMP%]   .probe-rig[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=station-workspaces.css.map */';
function ShowcaseWorkspaceComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function ShowcaseWorkspaceComponent_For_12_Template_button_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleEvidence(item_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ctx_r2.selectedEvidence().includes(item_r2.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.title, " ");
  }
}
var EvidenceWorkspaceComponent = class _EvidenceWorkspaceComponent {
  captured = new EventEmitter();
  evidenceFiles = mysteryEvidenceFiles;
  activeId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "activeId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidence(id) {
    return this.evidenceFiles.find((item) => item.id === id);
  }
  save(id) {
    this.captured.emit(id);
  }
  static \u0275fac = function EvidenceWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EvidenceWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EvidenceWorkspaceComponent, selectors: [["app-evidence-workspace"]], outputs: { captured: "captured" }, decls: 5, vars: 1, consts: [[1, "station-canvas", "evidence-workspace"], ["role", "img", "aria-label", "Chain-of-evidence laboratory board", 1, "atlas", "atlas--evidence"], [1, "station-shade"], [1, "evidence-inspector"], ["type", "button", 1, "back-button", 3, "click"], [3, "src", "alt"], [1, "station-kicker"], [1, "inspector-actions"], ["target", "_blank", "rel", "noopener", 3, "href"], ["type", "button", 1, "station-primary", 3, "click"], [1, "station-intro"], ["aria-label", "Recovered case files", 1, "evidence-filmstrip"], ["type", "button"], ["type", "button", 3, "click"], ["alt", "", 3, "src"]], template: function EvidenceWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0);
      \u0275\u0275domElement(1, "div", 1)(2, "div", 2);
      \u0275\u0275conditionalCreate(3, EvidenceWorkspaceComponent_Conditional_3_Template, 1, 1)(4, EvidenceWorkspaceComponent_Conditional_4_Template, 10, 0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_0_0 = ctx.activeId()) ? 3 : 4, tmp_0_0);
    }
  }, dependencies: [CommonModule], styles: [_c03] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EvidenceWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-evidence-workspace", imports: [CommonModule], template: `
    <section class="station-canvas evidence-workspace">
      <div
        class="atlas atlas--evidence"
        role="img"
        aria-label="Chain-of-evidence laboratory board"
      ></div>
      <div class="station-shade"></div>
      @if (activeId(); as id) {
        @if (evidence(id); as item) {
          <article class="evidence-inspector">
            <button type="button" class="back-button" (click)="activeId.set(undefined)">
              \u2190 Case files
            </button>
            <figure><img [src]="item.asset" [alt]="item.title" /></figure>
            <span class="station-kicker">{{ item.type }} \xB7 recovered record</span>
            <h1>{{ item.title }}</h1>
            <p>{{ item.text }}</p>
            <div class="inspector-actions">
              <a [href]="item.file" target="_blank" rel="noopener">Open raw file \u2197</a>
              <button type="button" class="station-primary" (click)="save(item.id)">
                Capture this record
              </button>
            </div>
          </article>
        }
      } @else {
        <div class="station-intro">
          <span class="station-kicker">Evidence Locker \xB7 ten recovered records</span>
          <h1>Choose one case file to inspect.</h1>
          <p>
            Compare direct observations, measurements, references, and recollections without
            deciding the answer yet.
          </p>
        </div>
        <div class="evidence-filmstrip" aria-label="Recovered case files">
          @for (item of evidenceFiles; track item.id) {
            <button type="button" (click)="activeId.set(item.id)">
              <img [src]="item.asset" alt="" />
              <span
                ><small>{{ item.type }}</small
                ><strong>{{ item.title }}</strong></span
              >
            </button>
          }
        </div>
      }
    </section>
  `, styles: ['/* src/app/projects/mystery-substance/station-workspaces.scss */\n:host {\n  position: absolute;\n  inset: 0;\n  display: block;\n}\nbutton,\nselect,\ntextarea,\ninput {\n  font: inherit;\n}\nbutton {\n  color: inherit;\n}\n.station-canvas,\n.atlas,\n.station-shade {\n  position: absolute;\n  inset: 0;\n}\n.station-canvas {\n  overflow: hidden;\n  color: #ebf7fc;\n  background: #04101a;\n}\n.atlas {\n  z-index: 0;\n  background-color: #04101a;\n  background-repeat: no-repeat;\n  background-size: cover;\n  filter: saturate(0.91) contrast(1.04) brightness(0.72);\n}\n.atlas--evidence,\n.atlas--showcase {\n  background-image: url(/evidence-artwork/e10-shelf-audit.webp);\n  background-position: center;\n}\n.atlas--week2 {\n  background-image: url(/week2-test-scenes-v2.webp);\n  background-size: 200% 200%;\n}\n.atlas--week3 {\n  background-image: url(/week3-test-scenes-v2.webp);\n  background-size: 200% 100%;\n}\n.atlas--conservation {\n  background-image: url(/conservation-test-scenes-v2.webp);\n  background-size: 200% 100%;\n}\n.atlas--week4 {\n  background-image: url(/week4-test-scenes-v2.webp);\n  background-size: 200% 200%;\n}\n.station-shade {\n  z-index: 1;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(3, 12, 19, 0.9),\n      rgba(3, 12, 19, 0.25) 58%,\n      rgba(3, 12, 19, 0.52)),\n    linear-gradient(\n      180deg,\n      rgba(2, 10, 17, 0.2),\n      rgba(2, 10, 17, 0.65));\n}\n.station-kicker {\n  color: #79d8d5;\n  font-size: 0.65rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh1 {\n  margin: 0.48rem 0 0.35rem;\n  color: #f1f8fc;\n  font-size: clamp(1.55rem, 3vw, 2.8rem);\n  line-height: 1.03;\n  letter-spacing: -0.035em;\n}\np {\n  margin: 0;\n  color: #adc3cf;\n  line-height: 1.5;\n}\n.station-intro {\n  position: absolute;\n  z-index: 3;\n  top: 11%;\n  left: 6%;\n  width: min(34rem, 48vw);\n  border-left: 2px solid #6ddad7;\n  padding: 1rem 1.25rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(4, 16, 25, 0.84),\n      transparent);\n}\n.evidence-filmstrip {\n  position: absolute;\n  z-index: 4;\n  right: 4%;\n  bottom: 5%;\n  left: 4%;\n  display: grid;\n  grid-template-columns: repeat(5, minmax(8rem, 1fr));\n  gap: 0.45rem;\n}\n.evidence-filmstrip button {\n  display: grid;\n  min-width: 0;\n  grid-template-columns: 3.8rem 1fr;\n  align-items: center;\n  gap: 0.55rem;\n  overflow: hidden;\n  border: 1px solid rgba(140, 190, 207, 0.22);\n  border-radius: 0.55rem;\n  padding: 0.35rem;\n  text-align: left;\n  background: rgba(5, 20, 30, 0.9);\n  cursor: pointer;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.evidence-filmstrip button:hover {\n  border-color: rgba(104, 220, 216, 0.56);\n  transform: translateY(-2px);\n}\n.evidence-filmstrip img {\n  width: 3.8rem;\n  height: 3rem;\n  border-radius: 0.32rem;\n  object-fit: cover;\n}\n.evidence-filmstrip span,\n.evidence-filmstrip small,\n.evidence-filmstrip strong {\n  display: block;\n  min-width: 0;\n}\n.evidence-filmstrip small {\n  overflow: hidden;\n  color: #7196a8;\n  font-size: 0.55rem;\n  text-overflow: ellipsis;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.evidence-filmstrip strong {\n  overflow: hidden;\n  color: #dceaf0;\n  font-size: 0.72rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.evidence-inspector {\n  position: absolute;\n  z-index: 4;\n  top: 5%;\n  right: 6%;\n  bottom: 5%;\n  width: min(31rem, 44vw);\n  overflow: auto;\n  border: 1px solid rgba(139, 189, 206, 0.28);\n  border-radius: 0.8rem;\n  padding: 1rem;\n  background: rgba(4, 16, 25, 0.94);\n  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);\n  -webkit-backdrop-filter: blur(14px);\n  backdrop-filter: blur(14px);\n}\n.evidence-inspector figure {\n  margin: 0.75rem 0 1rem;\n  overflow: hidden;\n  border-radius: 0.55rem;\n}\n.evidence-inspector img {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16/9;\n  object-fit: cover;\n}\n.back-button {\n  border: 0;\n  color: #91ddda;\n  background: transparent;\n  cursor: pointer;\n}\n.inspector-actions {\n  display: grid;\n  gap: 0.7rem;\n  margin-top: 1rem;\n}\n.inspector-actions a {\n  color: #85d8d6;\n}\n.lab-console,\n.reaction-console,\n.conservation-console,\n.restoration-console,\n.showcase-console {\n  position: absolute;\n  z-index: 4;\n  overflow: auto;\n  border: 1px solid rgba(140, 190, 207, 0.27);\n  border-radius: 0.78rem;\n  padding: clamp(1rem, 2vw, 1.6rem);\n  background: rgba(4, 16, 25, 0.93);\n  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.45);\n  -webkit-backdrop-filter: blur(15px);\n  backdrop-filter: blur(15px);\n}\n.lab-console {\n  top: 10%;\n  right: 5%;\n  bottom: 5%;\n  width: min(34rem, 47vw);\n}\n.instrument-tabs,\n.reaction-selector {\n  position: absolute;\n  z-index: 5;\n  top: 9%;\n  left: 3.5%;\n  display: grid;\n  width: min(19rem, 37vw);\n  gap: 0.45rem;\n}\n.instrument-tabs button,\n.reaction-selector button {\n  display: grid;\n  gap: 0.12rem;\n  border: 1px solid rgba(140, 188, 204, 0.22);\n  border-radius: 0.5rem;\n  padding: 0.65rem 0.8rem;\n  text-align: left;\n  background: rgba(4, 17, 27, 0.84);\n  cursor: pointer;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.instrument-tabs button.active,\n.reaction-selector button.active {\n  border-color: #74dcd8;\n  background: rgba(31, 99, 106, 0.54);\n}\n.instrument-tabs small,\n.reaction-selector small {\n  color: #6f98a8;\n  font-size: 0.58rem;\n  text-transform: uppercase;\n}\n.instrument-tabs strong,\n.reaction-selector strong {\n  font-size: 0.8rem;\n}\n.specimen-row {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.42rem;\n  margin: 1rem 0;\n}\n.specimen-row button {\n  position: relative;\n  display: grid;\n  grid-template-columns: 2.1rem 1fr;\n  align-items: center;\n  gap: 0.3rem;\n  overflow: hidden;\n  border: 1px solid rgba(137, 184, 201, 0.22);\n  border-radius: 0.48rem;\n  padding: 0.3rem;\n  text-align: left;\n  background: rgba(15, 36, 48, 0.82);\n  cursor: pointer;\n}\n.specimen-row button::after {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 2px;\n  background: var(--vial-color);\n  content: "";\n}\n.specimen-row button.active {\n  border-color: color-mix(in srgb, var(--vial-color), white 25%);\n  background: rgba(36, 72, 85, 0.95);\n}\n.specimen-row img {\n  width: 1.9rem;\n  height: 3rem;\n  grid-row: span 2;\n  object-fit: contain;\n}\n.specimen-row strong {\n  align-self: end;\n}\n.specimen-row small {\n  align-self: start;\n  color: #7393a3;\n  font-size: 0.58rem;\n}\n.raw-readout,\n.comparison-readout,\n.mass-display {\n  display: grid;\n  gap: 0.4rem;\n  border: 1px solid rgba(116, 205, 207, 0.22);\n  border-radius: 0.55rem;\n  padding: 0.75rem;\n  background: rgba(2, 11, 18, 0.77);\n}\n.raw-readout {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.raw-readout > span {\n  grid-column: 1/-1;\n  color: #75ceca;\n  font-size: 0.6rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.raw-readout div,\n.comparison-readout section div {\n  display: grid;\n  gap: 0.1rem;\n  border-left: 1px solid rgba(117, 190, 197, 0.25);\n  padding-left: 0.55rem;\n}\n.raw-readout small,\n.comparison-readout small,\n.mass-display small {\n  color: #718e9e;\n  font-size: 0.57rem;\n  text-transform: uppercase;\n}\n.raw-readout strong,\n.comparison-readout strong {\n  color: #e1eff4;\n  font-size: 0.74rem;\n}\n.empty-readout {\n  display: grid;\n  min-height: 7.5rem;\n  place-content: center;\n  justify-items: center;\n  border: 1px dashed rgba(133, 185, 201, 0.24);\n  border-radius: 0.55rem;\n  padding: 1rem;\n  color: #a9c0cc;\n  text-align: center;\n  background: rgba(3, 13, 21, 0.58);\n}\n.empty-readout > span {\n  width: 0.7rem;\n  height: 0.7rem;\n  margin-bottom: 0.55rem;\n  border: 2px solid #75d7d4;\n  border-radius: 50%;\n  box-shadow: 0 0 15px rgba(83, 218, 211, 0.6);\n}\n.empty-readout small {\n  margin-top: 0.25rem;\n  color: #6f8c9c;\n}\n.station-primary {\n  display: flex;\n  width: 100%;\n  min-height: 2.8rem;\n  align-items: center;\n  justify-content: center;\n  margin-top: 0.75rem;\n  border: 1px solid #79dedb;\n  border-radius: 0.5rem;\n  color: #042125;\n  background:\n    linear-gradient(\n      135deg,\n      #a0f1e8,\n      #5dc9d0);\n  font-weight: 850;\n  cursor: pointer;\n}\n.station-primary:disabled {\n  cursor: not-allowed;\n  filter: grayscale(0.75);\n  opacity: 0.58;\n}\n.reaction-console {\n  top: 7%;\n  right: 4%;\n  bottom: 5%;\n  width: min(38rem, 52vw);\n}\n.reaction-selector {\n  top: 14%;\n  width: min(15rem, 29vw);\n}\n.beaker-pair {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: end;\n  gap: 0.7rem;\n  margin: 1rem 0;\n}\n.beaker-pair label {\n  display: grid;\n  gap: 0.3rem;\n  color: #7796a6;\n  font-size: 0.62rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.beaker-pair select {\n  border: 1px solid rgba(129, 187, 203, 0.3);\n  border-radius: 0.42rem;\n  padding: 0.58rem;\n  color: #e7f4f8;\n  background: #0b2432;\n}\n.beaker-pair > span {\n  padding-bottom: 0.6rem;\n  color: #70d1ce;\n}\n.comparison-readout {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.comparison-readout section {\n  display: grid;\n  gap: 0.35rem;\n}\n.comparison-readout section > span {\n  color: #76d8d4;\n  font-weight: 850;\n}\n.conservation-console {\n  top: 8%;\n  right: 5%;\n  bottom: 6%;\n  width: min(37rem, 51vw);\n}\n.trial-toggle,\n.mode-tabs {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.45rem;\n  margin: 1rem 0;\n}\n.trial-toggle button,\n.mode-tabs button {\n  display: grid;\n  gap: 0.12rem;\n  border: 1px solid rgba(135, 184, 200, 0.23);\n  border-radius: 0.45rem;\n  padding: 0.6rem;\n  text-align: left;\n  background: rgba(14, 37, 49, 0.78);\n  cursor: pointer;\n}\n.trial-toggle button.active,\n.mode-tabs button.active {\n  border-color: #72d8d5;\n  background: rgba(33, 104, 108, 0.45);\n}\n.trial-toggle small {\n  color: #7694a3;\n  font-size: 0.58rem;\n  text-transform: uppercase;\n}\n.mass-display {\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  text-align: center;\n}\n.mass-display div {\n  display: grid;\n  gap: 0.18rem;\n}\n.mass-display strong {\n  color: #dff9f4;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  font-size: 1.45rem;\n}\n.mass-display span {\n  color: #6d8e9d;\n  font-size: 0.66rem;\n}\n.raw-observation {\n  margin: 0.65rem 0;\n  border-left: 2px solid #72d7d3;\n  padding: 0.5rem 0.7rem;\n  background: rgba(5, 20, 29, 0.72);\n  font-size: 0.76rem;\n}\n.restoration-console {\n  top: 4%;\n  right: 4%;\n  bottom: 4%;\n  width: min(43rem, 58vw);\n}\n.restoration-heading h1 {\n  font-size: clamp(1.35rem, 2.5vw, 2.25rem);\n}\n.specimen-row--compact {\n  margin: 0.75rem 0;\n}\n.mode-tabs {\n  grid-template-columns: repeat(4, 1fr);\n  margin: 0.6rem 0;\n}\n.mode-tabs button {\n  display: block;\n  text-align: center;\n  font-size: 0.68rem;\n}\n.decision-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.45rem;\n}\n.decision-grid button {\n  display: grid;\n  min-height: 4rem;\n  gap: 0.2rem;\n  border: 1px solid rgba(134, 184, 200, 0.23);\n  border-radius: 0.46rem;\n  padding: 0.65rem;\n  text-align: left;\n  background: rgba(12, 34, 46, 0.82);\n  cursor: pointer;\n}\n.decision-grid button.selected {\n  border-color: #72d9d5;\n  background: rgba(31, 103, 108, 0.48);\n}\n.decision-grid button:disabled {\n  cursor: not-allowed;\n  opacity: 0.46;\n}\n.decision-grid small {\n  color: #7795a4;\n  font-size: 0.62rem;\n}\n.reasoning-field,\n.confidence-field,\n.showcase-console label {\n  display: grid;\n  gap: 0.35rem;\n  color: #91aeba;\n  font-size: 0.68rem;\n  font-weight: 750;\n}\ntextarea {\n  box-sizing: border-box;\n  width: 100%;\n  resize: vertical;\n  border: 1px solid rgba(133, 185, 201, 0.27);\n  border-radius: 0.45rem;\n  padding: 0.65rem;\n  color: #e8f4f8;\n  outline: none;\n  background: rgba(2, 12, 19, 0.76);\n}\ntextarea:focus {\n  border-color: #77d8d5;\n  box-shadow: 0 0 0 3px rgba(82, 202, 201, 0.12);\n}\n.confidence-field {\n  grid-template-columns: 1fr auto;\n  margin-top: 0.65rem;\n}\n.confidence-field input {\n  grid-column: 1/-1;\n  width: 100%;\n  accent-color: #68d1cf;\n}\n.showcase-console {\n  top: 4%;\n  right: 4%;\n  bottom: 4%;\n  width: min(47rem, 64vw);\n}\n.showcase-evidence {\n  display: flex;\n  max-height: 7.3rem;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  overflow: auto;\n  margin: 0.8rem 0;\n}\n.showcase-evidence button {\n  border: 1px solid rgba(136, 184, 200, 0.24);\n  border-radius: 999px;\n  padding: 0.38rem 0.6rem;\n  color: #9cb7c3;\n  background: rgba(13, 37, 49, 0.83);\n  font-size: 0.63rem;\n  cursor: pointer;\n}\n.showcase-evidence button.selected {\n  border-color: #78dad6;\n  color: #e6fffb;\n  background: rgba(34, 111, 114, 0.5);\n}\n.showcase-console label + label {\n  margin-top: 0.65rem;\n}\n.showcase-footer {\n  display: grid;\n  grid-template-columns: 1fr minmax(13rem, 0.65fr);\n  align-items: center;\n  gap: 0.75rem;\n  margin-top: 0.7rem;\n}\n.showcase-footer > span {\n  color: #7e9aa7;\n  font-size: 0.65rem;\n}\n.showcase-footer .station-primary {\n  margin: 0;\n}\n@container (max-width: 820px) {\n  .station-intro {\n    top: 7%;\n    left: 4%;\n    width: 82%;\n  }\n  .evidence-filmstrip {\n    top: 41%;\n    right: 3%;\n    bottom: 3%;\n    left: 3%;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    overflow: auto;\n  }\n  .evidence-inspector,\n  .lab-console,\n  .reaction-console,\n  .conservation-console,\n  .restoration-console,\n  .showcase-console {\n    top: 2%;\n    right: 3%;\n    bottom: 2%;\n    width: auto;\n  }\n  .instrument-tabs,\n  .reaction-selector {\n    z-index: 6;\n    top: auto;\n    right: 4%;\n    bottom: 3%;\n    left: 4%;\n    width: auto;\n    grid-template-columns: repeat(4, 1fr);\n  }\n  .instrument-tabs button,\n  .reaction-selector button {\n    min-width: 0;\n    padding: 0.42rem;\n  }\n  .instrument-tabs small,\n  .reaction-selector small {\n    display: none;\n  }\n  .lab-console,\n  .reaction-console {\n    bottom: 5.3rem;\n  }\n  .reaction-selector {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .specimen-row button {\n    grid-template-columns: 1.65rem 1fr;\n  }\n  .specimen-row img {\n    width: 1.55rem;\n    height: 2.5rem;\n  }\n  .comparison-readout,\n  .decision-grid {\n    grid-template-columns: 1fr;\n  }\n  .mode-tabs {\n    position: sticky;\n    z-index: 2;\n    top: -1rem;\n    background: #071824;\n  }\n  .showcase-footer {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n  }\n}\n:host {\n  container-type: inline-size;\n}\n:host(.workbench-station) {\n  position: relative;\n  inset: auto;\n}\n:host(.workbench-station) .station-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 34rem;\n  overflow: visible;\n}\n:host(.workbench-station) .restoration-console {\n  position: relative;\n  inset: auto;\n  width: min(42rem, 100% - 2rem);\n  max-height: none;\n  margin: 1rem 1rem 1rem auto;\n  overflow: visible;\n}\n:host(.workbench-station) .restoration-workspace {\n  min-height: 100dvh;\n}\n.restoration-workspace .atlas {\n  filter: saturate(1.05) brightness(0.9);\n}\n.restoration-workspace .station-shade {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(3, 16, 26, 0.2),\n      rgba(3, 16, 26, 0.1333333333) 40%,\n      rgba(3, 16, 26, 0.6666666667));\n}\n.restoration-stage {\n  position: relative;\n  z-index: 3;\n  min-height: 100dvh;\n  box-sizing: border-box;\n  display: grid;\n  grid-template-columns: 1fr minmax(300px, 470px);\n  align-items: center;\n  gap: clamp(24px, 7vw, 110px);\n  max-width: 1160px;\n  margin: auto;\n  padding: 86px 36px 40px;\n}\n:host(.workbench-station) .restoration-console {\n  width: auto;\n  margin: 0;\n  padding: clamp(24px, 3vw, 40px);\n  background: rgba(8, 28, 41, 0.9098039216);\n  border-radius: 22px;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4666666667);\n}\n.restoration-console h1 {\n  font-size: clamp(25px, 3vw, 38px);\n  line-height: 1.12;\n  margin: 0 0 26px;\n}\n.restoration-console h1:focus {\n  outline: none;\n}\n.focus-specimen {\n  display: grid;\n  justify-items: center;\n  gap: 22px;\n  margin: 0;\n}\n.focus-specimen > img {\n  display: block;\n  max-width: 100%;\n  width: 250px;\n  height: min(48dvh, 410px);\n  object-fit: contain;\n  filter: drop-shadow(0 24px 34px rgba(0, 0, 0, 0.6));\n}\n.focus-specimen select {\n  padding: 10px 16px;\n  min-height: 44px;\n  color: #f0fafa;\n  background: rgba(16, 43, 53, 0.9098039216);\n  border: 1px solid #7ea4ad;\n  border-radius: 24px;\n}\n.restoration-console .decision-grid {\n  grid-template-columns: 1fr;\n  gap: 10px;\n}\n.restoration-console .decision-grid button {\n  min-height: 56px;\n  padding: 14px 16px;\n  font-size: 16px;\n}\n.restoration-console .decision-grid small {\n  font-size: 12px;\n  line-height: 1.4;\n}\n.decision-actions {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-top: 24px;\n}\n.decision-actions .station-primary {\n  margin: 0 0 0 auto;\n  width: auto;\n  min-width: 140px;\n  min-height: 48px;\n  font-size: 15px;\n}\n.decision-actions button:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.confidence-details {\n  margin-top: 16px;\n  font-size: 13px;\n}\n.confidence-details summary {\n  cursor: pointer;\n}\n@media (max-width: 700px) {\n  .restoration-stage {\n    grid-template-columns: 1fr;\n    gap: 20px;\n    padding: 82px 18px 24px;\n  }\n  .focus-specimen {\n    gap: 10px;\n  }\n  .focus-specimen > img {\n    height: 190px;\n    width: 160px;\n  }\n  :host(.workbench-station) .restoration-console {\n    width: auto;\n    padding: 24px;\n  }\n}\n:host(.lab-preview) {\n  position: relative;\n  inset: auto;\n  display: block;\n  container-type: inline-size;\n}\n:host(.lab-preview) .lab-canvas,\n:host(.lab-preview) .bench-canvas,\n:host(.lab-preview) .matter-canvas,\n:host(.lab-preview) .bay-canvas,\n:host(.lab-preview) .station-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 0;\n  overflow: visible;\n}\n:host(.lab-preview) .lab-grid,\n:host(.lab-preview) .bench-grid,\n:host(.lab-preview) .matter-grid,\n:host(.lab-preview) .bay-grid {\n  padding: 14px;\n  min-height: 0;\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n  gap: 12px;\n}\n:host(.lab-preview) .lab-grid.has-record,\n:host(.lab-preview) .bench-grid.has-record,\n:host(.lab-preview) .matter-grid.has-record {\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n}\n:host(.lab-preview) .lab-grid.has-record .rack,\n:host(.lab-preview) .bench-grid.has-record .rack,\n:host(.lab-preview) .matter-grid.has-record .rack {\n  display: block;\n}\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  grid-column: 1/-1;\n}\n:host(.lab-preview) .record[hidden] {\n  display: none;\n}\n:host(.lab-preview) .stage,\n:host(.lab-preview) .rig,\n:host(.lab-preview) .rack,\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  min-width: 0;\n}\n:host(.lab-preview) .kicker,\n:host(.lab-preview) .instrument-copy small,\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  display: block;\n}\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  max-height: 200px;\n  overflow: auto;\n}\n:host(.lab-preview) .instrument-well,\n:host(.lab-preview) .chamber-well {\n  min-height: 230px;\n}\n:host(.lab-preview) .instrument-well {\n  height: 245px;\n}\n:host(.lab-preview) .stage-controls {\n  margin-top: 10px;\n}\n:host(.lab-preview) .preview-run {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0;\n}\n:host(.lab-preview) .preview-run .primary-action {\n  width: auto;\n}\n:host(.lab-preview) .preview-run p {\n  flex-basis: 100%;\n  margin: 0;\n}\n:host(.lab-preview) h1 {\n  font-size: 1.2rem;\n}\n:host(.lab-preview) h2 {\n  font-size: 1rem;\n}\n:host(.lab-preview) button,\n:host(.lab-preview) select {\n  min-height: 44px;\n  font-size: 0.87rem;\n}\n:host(.lab-preview) small,\n:host(.lab-preview) .record-note,\n:host(.lab-preview) .stage-hint,\n:host(.lab-preview) .rig-hint,\n:host(.lab-preview) .hint,\n:host(.lab-preview) .readout small,\n:host(.lab-preview) .readout strong,\n:host(.lab-preview) .readout-stack small,\n:host(.lab-preview) .readout-stack strong,\n:host(.lab-preview) .rack-note {\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n:host(.lab-preview) input[type=range] {\n  min-height: 32px;\n}\n:host(.lab-preview) .restoration-stage {\n  position: relative;\n  inset: auto;\n  display: grid;\n  grid-template-columns: minmax(110px, 0.6fr) minmax(0, 1.7fr);\n  padding: 20px;\n  min-height: 0;\n  gap: 20px;\n}\n:host(.lab-preview) .restoration-console {\n  position: relative;\n  width: auto;\n  max-width: none;\n  min-width: 0;\n}\n:host(.lab-preview) .restoration-console label {\n  display: grid;\n  gap: 6px;\n  margin: 12px 0;\n}\n:host(.lab-preview) .restoration-console select {\n  width: 100%;\n  background: #102b38;\n  border: 1px solid #527888;\n  color: #eefaff;\n  padding: 8px;\n  border-radius: 6px;\n}\n:host(.lab-preview) .focus-specimen {\n  width: auto;\n  align-self: start;\n  margin: 0;\n}\n:host(.lab-preview) .focus-specimen img {\n  max-width: 100%;\n  max-height: 260px;\n  object-fit: contain;\n}\n:host(.lab-preview) .focus-specimen select {\n  max-width: 100%;\n}\n:host(.lab-preview) .shelf-plan {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n  margin-top: 20px;\n}\n:host(.lab-preview) .shelf-plan button {\n  display: grid;\n  gap: 5px;\n  text-align: left;\n  border: 1px solid #4b7181;\n  border-radius: 8px;\n  background: #173848;\n  color: #e9f6fb;\n  padding: 10px;\n  overflow-wrap: anywhere;\n}\n:host(.lab-preview) .shelf-plan button[aria-pressed=true] {\n  border: 2px solid #8be5d7;\n}\n:host(.lab-preview) :is(button, select, summary, input):focus-visible {\n  outline: 3px solid #a9efdc;\n  outline-offset: 3px;\n}\n@container (max-width: 640px) {\n  :host(.lab-preview) .lab-grid,\n  :host(.lab-preview) .bench-grid,\n  :host(.lab-preview) .matter-grid,\n  :host(.lab-preview) .bay-grid,\n  :host(.lab-preview) .lab-grid.has-record,\n  :host(.lab-preview) .bench-grid.has-record,\n  :host(.lab-preview) .matter-grid.has-record,\n  :host(.lab-preview) .restoration-stage {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 10px;\n  }\n  :host(.lab-preview) .stage,\n  :host(.lab-preview) .rig {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .rack {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .bay-grid .rack {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .bay-grid .stage {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .test-list,\n  :host(.lab-preview) .shelf-plan {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  :host(.lab-preview) .instrument-list,\n  :host(.lab-preview) .chamber-list {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  :host(.lab-preview) .focus-specimen {\n    max-width: 130px;\n    justify-self: center;\n  }\n  :host(.lab-preview) .focus-specimen img {\n    max-height: 150px;\n  }\n  :host(.lab-preview) .chamber-well {\n    gap: 8px;\n  }\n  :host(.lab-preview) .probe-rig {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=station-workspaces.css.map */\n'] }]
  }], null, { captured: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EvidenceWorkspaceComponent, { className: "EvidenceWorkspaceComponent", filePath: "src/app/projects/mystery-substance/station-workspaces.ts", lineNumber: 82 });
})();
var RestorationWorkspaceComponent = class _RestorationWorkspaceComponent {
  preview = inject(LAB_AUTHORING_PREVIEW);
  captured = new EventEmitter();
  vialChanged = new EventEmitter();
  selectedVialId = input(
    ...ngDevMode ? [void 0, { debugName: "selectedVialId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  vials = mysteryVials;
  labels = recoveredLabels;
  zones = shelfZones;
  recommendations = handlingRecommendations;
  activeVialId = signal(
    "vial-a",
    ...ngDevMode ? [{ debugName: "activeVialId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mode = signal(
    "label",
    ...ngDevMode ? [{ debugName: "mode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  assignments = signal(
    {},
    ...ngDevMode ? [{ debugName: "assignments" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    let restored = false;
    persistWorkspaceDraft("shelf-restoration", () => ({ assignments: this.assignments(), mode: this.mode(), vialId: this.activeVialId() }), (saved) => {
      restored = true;
      if (saved.assignments && typeof saved.assignments === "object")
        this.assignments.set(saved.assignments);
      if (["label", "position", "decision", "explain"].includes(saved.mode))
        this.mode.set(saved.mode);
      if (this.vials.some((v) => v.vialId === saved.vialId))
        this.activeVialId.set(saved.vialId);
    });
    if (this.preview && !restored) {
      this.assignments.set({ "vial-a": { zoneId: this.zones[0].id } });
    }
    effect(() => {
      const id = this.selectedVialId();
      untracked(() => {
        if (id && id !== this.activeVialId())
          this.selectVial(id);
      });
    });
  }
  selectVial(id) {
    if (!this.vials.some((v) => v.vialId === id))
      return;
    this.activeVialId.set(id);
    this.mode.set("label");
    this.vialChanged.emit(id);
  }
  steps = ["label", "position", "decision", "explain"];
  activeVial() {
    return this.vials.find((vial) => vial.vialId === this.activeVialId()) ?? this.vials[0];
  }
  questionText() {
    switch (this.mode()) {
      case "label":
        return `Which label fits Vial ${this.activeCode()}?`;
      case "position":
        return "Where does it belong?";
      case "decision":
        return "How should it be handled?";
      case "explain":
        return "What is your evidence?";
    }
  }
  canContinue() {
    const assignment = this.activeAssignment();
    switch (this.mode()) {
      case "label":
        return !!assignment.labelId;
      case "position":
        return !!assignment.zoneId;
      case "decision":
        return !!assignment.recommendationId;
      case "explain":
        return !!(assignment.labelId && assignment.zoneId && assignment.recommendationId && assignment.reasoning?.trim());
    }
  }
  next() {
    if (this.canContinue())
      this.mode.set(this.steps[Math.min(3, this.steps.indexOf(this.mode()) + 1)]);
  }
  previous() {
    this.mode.set(this.steps[Math.max(0, this.steps.indexOf(this.mode()) - 1)]);
  }
  activeCode() {
    return this.vials.find((vial) => vial.vialId === this.activeVialId())?.code ?? "?";
  }
  activeAssignment() {
    return this.assignments()[this.activeVialId()] ?? { confidence: 50 };
  }
  usedByOther(labelId) {
    return Object.entries(this.assignments()).some(([vialId, assignment]) => vialId !== this.activeVialId() && assignment.labelId === labelId);
  }
  setField(field, value) {
    const vialId = this.activeVialId();
    this.assignments.update((current) => __spreadProps(__spreadValues({}, current), {
      [vialId]: __spreadProps(__spreadValues({}, current[vialId] ?? { confidence: 50 }), { [field]: value })
    }));
  }
  clearAssignment() {
    this.assignments.update((current) => __spreadProps(__spreadValues({}, current), { [this.activeVialId()]: {} }));
  }
  assignmentTitle(vialId, field) {
    const id = this.assignments()[vialId]?.[field];
    const options = field === "labelId" ? this.labels : field === "zoneId" ? this.zones : this.recommendations;
    return options.find((option) => option.id === id)?.title ?? "Unassigned";
  }
  numberValue(event) {
    return Number(event.target.value);
  }
  saveCase() {
    if (!this.canContinue() || this.mode() !== "explain")
      return;
    const assignment = this.activeAssignment() ?? { confidence: 50 };
    this.captured.emit({
      activityId: "activity-shelf-restoration",
      evidenceId: "evidence-shelf-case",
      result: __spreadValues({ vialId: this.activeVialId() }, assignment),
      note: assignment.reasoning
    });
  }
  static \u0275fac = function RestorationWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RestorationWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RestorationWorkspaceComponent, selectors: [["app-restoration-workspace"]], hostVars: 2, hostBindings: function RestorationWorkspaceComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("lab-preview", ctx.preview);
    }
  }, inputs: { selectedVialId: [1, "selectedVialId"] }, outputs: { captured: "captured", vialChanged: "vialChanged" }, decls: 13, vars: 6, consts: [["question", ""], [1, "station-canvas", "restoration-workspace"], ["role", "img", "aria-label", "Professional shelf restoration investigation bench", 1, "atlas", "atlas--week4"], [1, "station-shade"], [1, "restoration-stage"], [1, "focus-specimen"], [3, "src", "alt"], ["aria-label", "Choose a vial case", 3, "change", "value"], [3, "value", "selected"], [1, "restoration-console"], ["aria-label", "Shelf label", 3, "change", "value"], ["value", "", 3, "selected"], [3, "value", "selected", "disabled"], ["aria-label", "Shelf position", 3, "change", "value"], ["aria-label", "Handling plan", 3, "change", "value"], ["type", "button", 1, "back-button", 3, "click"], ["aria-label", "Current shelf plan", 1, "shelf-plan"], ["type", "button"], ["type", "button", 3, "click"], ["tabindex", "-1"], [1, "decision-grid"], [1, "decision-actions"], ["type", "button", 1, "back-button"], ["type", "button", 1, "station-primary", 3, "disabled"], ["type", "button", 3, "selected", "disabled"], ["type", "button", 3, "click", "disabled"], ["type", "button", 3, "selected"], [1, "reasoning-field"], ["rows", "5", "placeholder", "The measured pattern supports or limits this draft because\u2026", 3, "ngModelChange", "ngModel"], [1, "confidence-details"], [1, "confidence-field"], ["type", "range", "min", "0", "max", "100", "step", "10", 3, "input", "value"], ["type", "button", 1, "station-primary", 3, "click", "disabled"]], template: function RestorationWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 1);
      \u0275\u0275element(1, "div", 2)(2, "div", 3);
      \u0275\u0275elementStart(3, "div", 4)(4, "figure", 5);
      \u0275\u0275element(5, "img", 6);
      \u0275\u0275elementStart(6, "figcaption")(7, "select", 7);
      \u0275\u0275listener("change", function RestorationWorkspaceComponent_Template_select_change_7_listener($event) {
        return ctx.selectVial($event.target.value);
      });
      \u0275\u0275repeaterCreate(8, RestorationWorkspaceComponent_For_9_Template, 2, 3, "option", 8, _forTrack14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "article", 9);
      \u0275\u0275conditionalCreate(11, RestorationWorkspaceComponent_Conditional_11_Template, 30, 6)(12, RestorationWorkspaceComponent_Conditional_12_Template, 11, 4);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275styleProp("background-position", ctx.mode() === "label" ? "left top" : ctx.mode() === "position" ? "right top" : "left bottom");
      \u0275\u0275advance(4);
      \u0275\u0275property("src", ctx.activeVial().image, \u0275\u0275sanitizeUrl)("alt", "Vial " + ctx.activeCode() + " for identification");
      \u0275\u0275advance(2);
      \u0275\u0275property("value", ctx.activeVialId());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.vials);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.preview ? 11 : 12);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NgControlStatus, NgModel], styles: [_c03] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RestorationWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-restoration-workspace", host: { "[class.lab-preview]": "preview" }, imports: [CommonModule, FormsModule], template: `
    <section class="station-canvas restoration-workspace">
      <div
        class="atlas atlas--week4"
        [style.background-position]="
          mode() === 'label' ? 'left top' : mode() === 'position' ? 'right top' : 'left bottom'
        "
        role="img"
        aria-label="Professional shelf restoration investigation bench"
      ></div>
      <div class="station-shade"></div>
      <div class="restoration-stage">
        <figure class="focus-specimen">
          <img [src]="activeVial().image" [alt]="'Vial ' + activeCode() + ' for identification'" />
          <figcaption>
            <select
              aria-label="Choose a vial case"
              [value]="activeVialId()"
              (change)="selectVial($any($event.target).value)"
            >
              @for (vial of vials; track vial.vialId) {
                <option [value]="vial.vialId" [selected]="activeVialId() === vial.vialId">Vial {{ vial.code }}</option>
              }
            </select>
          </figcaption>
        </figure>
        <article class="restoration-console">
          @if (preview) {
            <h1>Build the shelf plan</h1>
            <p>Editable local product \xB7 no submission or assessment</p>
            <label>Label
              <select aria-label="Shelf label" [value]="activeAssignment().labelId ?? ''" (change)="setField('labelId', $any($event.target).value)">
                <option value="" [selected]="!activeAssignment().labelId">Unlabelled</option>
                @for (label of labels; track label.id) { <option [value]="label.id" [selected]="activeAssignment().labelId === label.id" [disabled]="usedByOther(label.id)">{{ label.title }}</option> }
              </select>
            </label>
            <label>Shelf position
              <select aria-label="Shelf position" [value]="activeAssignment().zoneId ?? ''" (change)="setField('zoneId', $any($event.target).value)">
                <option value="" [selected]="!activeAssignment().zoneId">Unassigned</option>
                @for (zone of zones; track zone.id) { <option [value]="zone.id" [selected]="activeAssignment().zoneId === zone.id">{{ zone.title }}</option> }
              </select>
            </label>
            <label>Handling plan
              <select aria-label="Handling plan" [value]="activeAssignment().recommendationId ?? ''" (change)="setField('recommendationId', $any($event.target).value)">
                <option value="" [selected]="!activeAssignment().recommendationId">Undecided</option>
                @for (item of recommendations; track item.id) { <option [value]="item.id" [selected]="activeAssignment().recommendationId === item.id">{{ item.title }}</option> }
              </select>
            </label>
            <button type="button" class="back-button" (click)="clearAssignment()">Clear this vial's plan</button>
            <div class="shelf-plan" aria-label="Current shelf plan">
              @for (vial of vials; track vial.vialId) {
                <button type="button" [attr.aria-pressed]="activeVialId() === vial.vialId" (click)="selectVial(vial.vialId)">
                  <strong>Vial {{ vial.code }}</strong>
                  <span>{{ assignmentTitle(vial.vialId, 'labelId') }}</span>
                  <small>{{ assignmentTitle(vial.vialId, 'zoneId') }} \xB7 {{ assignmentTitle(vial.vialId, 'recommendationId') }}</small>
                </button>
              }
            </div>
          } @else {
          <h1 tabindex="-1" #question>{{ questionText() }}</h1>
          @if (mode() === 'label') {
            <div class="decision-grid">
              @for (label of labels; track label.id) {
                <button
                  type="button"
                  [class.selected]="activeAssignment().labelId === label.id"
                  [disabled]="usedByOther(label.id)"
                  (click)="setField('labelId', label.id)"
                >
                  <strong>{{ label.title }}</strong>
                  @if (usedByOther(label.id)) {
                    <small>Already assigned</small>
                  }
                </button>
              }
            </div>
          } @else if (mode() === 'position') {
            <div class="decision-grid">
              @for (zone of zones; track zone.id) {
                <button
                  type="button"
                  [class.selected]="activeAssignment().zoneId === zone.id"
                  (click)="setField('zoneId', zone.id)"
                >
                  <strong>{{ zone.title }}</strong
                  ><small>{{ zone.note }}</small>
                </button>
              }
            </div>
          } @else if (mode() === 'decision') {
            <div class="decision-grid">
              @for (recommendation of recommendations; track recommendation.id) {
                <button
                  type="button"
                  [class.selected]="activeAssignment().recommendationId === recommendation.id"
                  (click)="setField('recommendationId', recommendation.id)"
                >
                  <strong>{{ recommendation.title }}</strong
                  ><small>{{ recommendation.note }}</small>
                </button>
              }
            </div>
          } @else {
            <label class="reasoning-field"
              >Which test supports your choice?
              <textarea
                rows="5"
                [ngModel]="activeAssignment().reasoning ?? ''"
                (ngModelChange)="setField('reasoning', $event)"
                placeholder="The measured pattern supports or limits this draft because\u2026"
              ></textarea>
            </label>
            <details class="confidence-details">
              <summary>How sure are you?</summary>
              <label class="confidence-field"
                >Evidence confidence
                <strong>{{ activeAssignment().confidence ?? 50 }}%</strong>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  [value]="activeAssignment().confidence ?? 50"
                  (input)="setField('confidence', numberValue($event))"
                />
              </label>
            </details>
          }
          <div class="decision-actions">
            @if (mode() !== 'label') {
              <button type="button" class="back-button" (click)="previous(); question.focus()">
                \u2190 Back
              </button>
            }
            @if (mode() === 'explain') {
              <button
                type="button"
                class="station-primary"
                [disabled]="!canContinue()"
                (click)="saveCase()"
              >
                Save case draft
              </button>
            } @else {
              <button
                type="button"
                class="station-primary"
                [disabled]="!canContinue()"
                (click)="next(); question.focus()"
              >
                Continue \u2192
              </button>
            }
          </div>
          }
        </article>
      </div>
    </section>
  `, styles: ['/* src/app/projects/mystery-substance/station-workspaces.scss */\n:host {\n  position: absolute;\n  inset: 0;\n  display: block;\n}\nbutton,\nselect,\ntextarea,\ninput {\n  font: inherit;\n}\nbutton {\n  color: inherit;\n}\n.station-canvas,\n.atlas,\n.station-shade {\n  position: absolute;\n  inset: 0;\n}\n.station-canvas {\n  overflow: hidden;\n  color: #ebf7fc;\n  background: #04101a;\n}\n.atlas {\n  z-index: 0;\n  background-color: #04101a;\n  background-repeat: no-repeat;\n  background-size: cover;\n  filter: saturate(0.91) contrast(1.04) brightness(0.72);\n}\n.atlas--evidence,\n.atlas--showcase {\n  background-image: url(/evidence-artwork/e10-shelf-audit.webp);\n  background-position: center;\n}\n.atlas--week2 {\n  background-image: url(/week2-test-scenes-v2.webp);\n  background-size: 200% 200%;\n}\n.atlas--week3 {\n  background-image: url(/week3-test-scenes-v2.webp);\n  background-size: 200% 100%;\n}\n.atlas--conservation {\n  background-image: url(/conservation-test-scenes-v2.webp);\n  background-size: 200% 100%;\n}\n.atlas--week4 {\n  background-image: url(/week4-test-scenes-v2.webp);\n  background-size: 200% 200%;\n}\n.station-shade {\n  z-index: 1;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(3, 12, 19, 0.9),\n      rgba(3, 12, 19, 0.25) 58%,\n      rgba(3, 12, 19, 0.52)),\n    linear-gradient(\n      180deg,\n      rgba(2, 10, 17, 0.2),\n      rgba(2, 10, 17, 0.65));\n}\n.station-kicker {\n  color: #79d8d5;\n  font-size: 0.65rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh1 {\n  margin: 0.48rem 0 0.35rem;\n  color: #f1f8fc;\n  font-size: clamp(1.55rem, 3vw, 2.8rem);\n  line-height: 1.03;\n  letter-spacing: -0.035em;\n}\np {\n  margin: 0;\n  color: #adc3cf;\n  line-height: 1.5;\n}\n.station-intro {\n  position: absolute;\n  z-index: 3;\n  top: 11%;\n  left: 6%;\n  width: min(34rem, 48vw);\n  border-left: 2px solid #6ddad7;\n  padding: 1rem 1.25rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(4, 16, 25, 0.84),\n      transparent);\n}\n.evidence-filmstrip {\n  position: absolute;\n  z-index: 4;\n  right: 4%;\n  bottom: 5%;\n  left: 4%;\n  display: grid;\n  grid-template-columns: repeat(5, minmax(8rem, 1fr));\n  gap: 0.45rem;\n}\n.evidence-filmstrip button {\n  display: grid;\n  min-width: 0;\n  grid-template-columns: 3.8rem 1fr;\n  align-items: center;\n  gap: 0.55rem;\n  overflow: hidden;\n  border: 1px solid rgba(140, 190, 207, 0.22);\n  border-radius: 0.55rem;\n  padding: 0.35rem;\n  text-align: left;\n  background: rgba(5, 20, 30, 0.9);\n  cursor: pointer;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.evidence-filmstrip button:hover {\n  border-color: rgba(104, 220, 216, 0.56);\n  transform: translateY(-2px);\n}\n.evidence-filmstrip img {\n  width: 3.8rem;\n  height: 3rem;\n  border-radius: 0.32rem;\n  object-fit: cover;\n}\n.evidence-filmstrip span,\n.evidence-filmstrip small,\n.evidence-filmstrip strong {\n  display: block;\n  min-width: 0;\n}\n.evidence-filmstrip small {\n  overflow: hidden;\n  color: #7196a8;\n  font-size: 0.55rem;\n  text-overflow: ellipsis;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.evidence-filmstrip strong {\n  overflow: hidden;\n  color: #dceaf0;\n  font-size: 0.72rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.evidence-inspector {\n  position: absolute;\n  z-index: 4;\n  top: 5%;\n  right: 6%;\n  bottom: 5%;\n  width: min(31rem, 44vw);\n  overflow: auto;\n  border: 1px solid rgba(139, 189, 206, 0.28);\n  border-radius: 0.8rem;\n  padding: 1rem;\n  background: rgba(4, 16, 25, 0.94);\n  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);\n  -webkit-backdrop-filter: blur(14px);\n  backdrop-filter: blur(14px);\n}\n.evidence-inspector figure {\n  margin: 0.75rem 0 1rem;\n  overflow: hidden;\n  border-radius: 0.55rem;\n}\n.evidence-inspector img {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16/9;\n  object-fit: cover;\n}\n.back-button {\n  border: 0;\n  color: #91ddda;\n  background: transparent;\n  cursor: pointer;\n}\n.inspector-actions {\n  display: grid;\n  gap: 0.7rem;\n  margin-top: 1rem;\n}\n.inspector-actions a {\n  color: #85d8d6;\n}\n.lab-console,\n.reaction-console,\n.conservation-console,\n.restoration-console,\n.showcase-console {\n  position: absolute;\n  z-index: 4;\n  overflow: auto;\n  border: 1px solid rgba(140, 190, 207, 0.27);\n  border-radius: 0.78rem;\n  padding: clamp(1rem, 2vw, 1.6rem);\n  background: rgba(4, 16, 25, 0.93);\n  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.45);\n  -webkit-backdrop-filter: blur(15px);\n  backdrop-filter: blur(15px);\n}\n.lab-console {\n  top: 10%;\n  right: 5%;\n  bottom: 5%;\n  width: min(34rem, 47vw);\n}\n.instrument-tabs,\n.reaction-selector {\n  position: absolute;\n  z-index: 5;\n  top: 9%;\n  left: 3.5%;\n  display: grid;\n  width: min(19rem, 37vw);\n  gap: 0.45rem;\n}\n.instrument-tabs button,\n.reaction-selector button {\n  display: grid;\n  gap: 0.12rem;\n  border: 1px solid rgba(140, 188, 204, 0.22);\n  border-radius: 0.5rem;\n  padding: 0.65rem 0.8rem;\n  text-align: left;\n  background: rgba(4, 17, 27, 0.84);\n  cursor: pointer;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.instrument-tabs button.active,\n.reaction-selector button.active {\n  border-color: #74dcd8;\n  background: rgba(31, 99, 106, 0.54);\n}\n.instrument-tabs small,\n.reaction-selector small {\n  color: #6f98a8;\n  font-size: 0.58rem;\n  text-transform: uppercase;\n}\n.instrument-tabs strong,\n.reaction-selector strong {\n  font-size: 0.8rem;\n}\n.specimen-row {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.42rem;\n  margin: 1rem 0;\n}\n.specimen-row button {\n  position: relative;\n  display: grid;\n  grid-template-columns: 2.1rem 1fr;\n  align-items: center;\n  gap: 0.3rem;\n  overflow: hidden;\n  border: 1px solid rgba(137, 184, 201, 0.22);\n  border-radius: 0.48rem;\n  padding: 0.3rem;\n  text-align: left;\n  background: rgba(15, 36, 48, 0.82);\n  cursor: pointer;\n}\n.specimen-row button::after {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 2px;\n  background: var(--vial-color);\n  content: "";\n}\n.specimen-row button.active {\n  border-color: color-mix(in srgb, var(--vial-color), white 25%);\n  background: rgba(36, 72, 85, 0.95);\n}\n.specimen-row img {\n  width: 1.9rem;\n  height: 3rem;\n  grid-row: span 2;\n  object-fit: contain;\n}\n.specimen-row strong {\n  align-self: end;\n}\n.specimen-row small {\n  align-self: start;\n  color: #7393a3;\n  font-size: 0.58rem;\n}\n.raw-readout,\n.comparison-readout,\n.mass-display {\n  display: grid;\n  gap: 0.4rem;\n  border: 1px solid rgba(116, 205, 207, 0.22);\n  border-radius: 0.55rem;\n  padding: 0.75rem;\n  background: rgba(2, 11, 18, 0.77);\n}\n.raw-readout {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.raw-readout > span {\n  grid-column: 1/-1;\n  color: #75ceca;\n  font-size: 0.6rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.raw-readout div,\n.comparison-readout section div {\n  display: grid;\n  gap: 0.1rem;\n  border-left: 1px solid rgba(117, 190, 197, 0.25);\n  padding-left: 0.55rem;\n}\n.raw-readout small,\n.comparison-readout small,\n.mass-display small {\n  color: #718e9e;\n  font-size: 0.57rem;\n  text-transform: uppercase;\n}\n.raw-readout strong,\n.comparison-readout strong {\n  color: #e1eff4;\n  font-size: 0.74rem;\n}\n.empty-readout {\n  display: grid;\n  min-height: 7.5rem;\n  place-content: center;\n  justify-items: center;\n  border: 1px dashed rgba(133, 185, 201, 0.24);\n  border-radius: 0.55rem;\n  padding: 1rem;\n  color: #a9c0cc;\n  text-align: center;\n  background: rgba(3, 13, 21, 0.58);\n}\n.empty-readout > span {\n  width: 0.7rem;\n  height: 0.7rem;\n  margin-bottom: 0.55rem;\n  border: 2px solid #75d7d4;\n  border-radius: 50%;\n  box-shadow: 0 0 15px rgba(83, 218, 211, 0.6);\n}\n.empty-readout small {\n  margin-top: 0.25rem;\n  color: #6f8c9c;\n}\n.station-primary {\n  display: flex;\n  width: 100%;\n  min-height: 2.8rem;\n  align-items: center;\n  justify-content: center;\n  margin-top: 0.75rem;\n  border: 1px solid #79dedb;\n  border-radius: 0.5rem;\n  color: #042125;\n  background:\n    linear-gradient(\n      135deg,\n      #a0f1e8,\n      #5dc9d0);\n  font-weight: 850;\n  cursor: pointer;\n}\n.station-primary:disabled {\n  cursor: not-allowed;\n  filter: grayscale(0.75);\n  opacity: 0.58;\n}\n.reaction-console {\n  top: 7%;\n  right: 4%;\n  bottom: 5%;\n  width: min(38rem, 52vw);\n}\n.reaction-selector {\n  top: 14%;\n  width: min(15rem, 29vw);\n}\n.beaker-pair {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: end;\n  gap: 0.7rem;\n  margin: 1rem 0;\n}\n.beaker-pair label {\n  display: grid;\n  gap: 0.3rem;\n  color: #7796a6;\n  font-size: 0.62rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.beaker-pair select {\n  border: 1px solid rgba(129, 187, 203, 0.3);\n  border-radius: 0.42rem;\n  padding: 0.58rem;\n  color: #e7f4f8;\n  background: #0b2432;\n}\n.beaker-pair > span {\n  padding-bottom: 0.6rem;\n  color: #70d1ce;\n}\n.comparison-readout {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.comparison-readout section {\n  display: grid;\n  gap: 0.35rem;\n}\n.comparison-readout section > span {\n  color: #76d8d4;\n  font-weight: 850;\n}\n.conservation-console {\n  top: 8%;\n  right: 5%;\n  bottom: 6%;\n  width: min(37rem, 51vw);\n}\n.trial-toggle,\n.mode-tabs {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.45rem;\n  margin: 1rem 0;\n}\n.trial-toggle button,\n.mode-tabs button {\n  display: grid;\n  gap: 0.12rem;\n  border: 1px solid rgba(135, 184, 200, 0.23);\n  border-radius: 0.45rem;\n  padding: 0.6rem;\n  text-align: left;\n  background: rgba(14, 37, 49, 0.78);\n  cursor: pointer;\n}\n.trial-toggle button.active,\n.mode-tabs button.active {\n  border-color: #72d8d5;\n  background: rgba(33, 104, 108, 0.45);\n}\n.trial-toggle small {\n  color: #7694a3;\n  font-size: 0.58rem;\n  text-transform: uppercase;\n}\n.mass-display {\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  text-align: center;\n}\n.mass-display div {\n  display: grid;\n  gap: 0.18rem;\n}\n.mass-display strong {\n  color: #dff9f4;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  font-size: 1.45rem;\n}\n.mass-display span {\n  color: #6d8e9d;\n  font-size: 0.66rem;\n}\n.raw-observation {\n  margin: 0.65rem 0;\n  border-left: 2px solid #72d7d3;\n  padding: 0.5rem 0.7rem;\n  background: rgba(5, 20, 29, 0.72);\n  font-size: 0.76rem;\n}\n.restoration-console {\n  top: 4%;\n  right: 4%;\n  bottom: 4%;\n  width: min(43rem, 58vw);\n}\n.restoration-heading h1 {\n  font-size: clamp(1.35rem, 2.5vw, 2.25rem);\n}\n.specimen-row--compact {\n  margin: 0.75rem 0;\n}\n.mode-tabs {\n  grid-template-columns: repeat(4, 1fr);\n  margin: 0.6rem 0;\n}\n.mode-tabs button {\n  display: block;\n  text-align: center;\n  font-size: 0.68rem;\n}\n.decision-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.45rem;\n}\n.decision-grid button {\n  display: grid;\n  min-height: 4rem;\n  gap: 0.2rem;\n  border: 1px solid rgba(134, 184, 200, 0.23);\n  border-radius: 0.46rem;\n  padding: 0.65rem;\n  text-align: left;\n  background: rgba(12, 34, 46, 0.82);\n  cursor: pointer;\n}\n.decision-grid button.selected {\n  border-color: #72d9d5;\n  background: rgba(31, 103, 108, 0.48);\n}\n.decision-grid button:disabled {\n  cursor: not-allowed;\n  opacity: 0.46;\n}\n.decision-grid small {\n  color: #7795a4;\n  font-size: 0.62rem;\n}\n.reasoning-field,\n.confidence-field,\n.showcase-console label {\n  display: grid;\n  gap: 0.35rem;\n  color: #91aeba;\n  font-size: 0.68rem;\n  font-weight: 750;\n}\ntextarea {\n  box-sizing: border-box;\n  width: 100%;\n  resize: vertical;\n  border: 1px solid rgba(133, 185, 201, 0.27);\n  border-radius: 0.45rem;\n  padding: 0.65rem;\n  color: #e8f4f8;\n  outline: none;\n  background: rgba(2, 12, 19, 0.76);\n}\ntextarea:focus {\n  border-color: #77d8d5;\n  box-shadow: 0 0 0 3px rgba(82, 202, 201, 0.12);\n}\n.confidence-field {\n  grid-template-columns: 1fr auto;\n  margin-top: 0.65rem;\n}\n.confidence-field input {\n  grid-column: 1/-1;\n  width: 100%;\n  accent-color: #68d1cf;\n}\n.showcase-console {\n  top: 4%;\n  right: 4%;\n  bottom: 4%;\n  width: min(47rem, 64vw);\n}\n.showcase-evidence {\n  display: flex;\n  max-height: 7.3rem;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  overflow: auto;\n  margin: 0.8rem 0;\n}\n.showcase-evidence button {\n  border: 1px solid rgba(136, 184, 200, 0.24);\n  border-radius: 999px;\n  padding: 0.38rem 0.6rem;\n  color: #9cb7c3;\n  background: rgba(13, 37, 49, 0.83);\n  font-size: 0.63rem;\n  cursor: pointer;\n}\n.showcase-evidence button.selected {\n  border-color: #78dad6;\n  color: #e6fffb;\n  background: rgba(34, 111, 114, 0.5);\n}\n.showcase-console label + label {\n  margin-top: 0.65rem;\n}\n.showcase-footer {\n  display: grid;\n  grid-template-columns: 1fr minmax(13rem, 0.65fr);\n  align-items: center;\n  gap: 0.75rem;\n  margin-top: 0.7rem;\n}\n.showcase-footer > span {\n  color: #7e9aa7;\n  font-size: 0.65rem;\n}\n.showcase-footer .station-primary {\n  margin: 0;\n}\n@container (max-width: 820px) {\n  .station-intro {\n    top: 7%;\n    left: 4%;\n    width: 82%;\n  }\n  .evidence-filmstrip {\n    top: 41%;\n    right: 3%;\n    bottom: 3%;\n    left: 3%;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    overflow: auto;\n  }\n  .evidence-inspector,\n  .lab-console,\n  .reaction-console,\n  .conservation-console,\n  .restoration-console,\n  .showcase-console {\n    top: 2%;\n    right: 3%;\n    bottom: 2%;\n    width: auto;\n  }\n  .instrument-tabs,\n  .reaction-selector {\n    z-index: 6;\n    top: auto;\n    right: 4%;\n    bottom: 3%;\n    left: 4%;\n    width: auto;\n    grid-template-columns: repeat(4, 1fr);\n  }\n  .instrument-tabs button,\n  .reaction-selector button {\n    min-width: 0;\n    padding: 0.42rem;\n  }\n  .instrument-tabs small,\n  .reaction-selector small {\n    display: none;\n  }\n  .lab-console,\n  .reaction-console {\n    bottom: 5.3rem;\n  }\n  .reaction-selector {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .specimen-row button {\n    grid-template-columns: 1.65rem 1fr;\n  }\n  .specimen-row img {\n    width: 1.55rem;\n    height: 2.5rem;\n  }\n  .comparison-readout,\n  .decision-grid {\n    grid-template-columns: 1fr;\n  }\n  .mode-tabs {\n    position: sticky;\n    z-index: 2;\n    top: -1rem;\n    background: #071824;\n  }\n  .showcase-footer {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n  }\n}\n:host {\n  container-type: inline-size;\n}\n:host(.workbench-station) {\n  position: relative;\n  inset: auto;\n}\n:host(.workbench-station) .station-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 34rem;\n  overflow: visible;\n}\n:host(.workbench-station) .restoration-console {\n  position: relative;\n  inset: auto;\n  width: min(42rem, 100% - 2rem);\n  max-height: none;\n  margin: 1rem 1rem 1rem auto;\n  overflow: visible;\n}\n:host(.workbench-station) .restoration-workspace {\n  min-height: 100dvh;\n}\n.restoration-workspace .atlas {\n  filter: saturate(1.05) brightness(0.9);\n}\n.restoration-workspace .station-shade {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(3, 16, 26, 0.2),\n      rgba(3, 16, 26, 0.1333333333) 40%,\n      rgba(3, 16, 26, 0.6666666667));\n}\n.restoration-stage {\n  position: relative;\n  z-index: 3;\n  min-height: 100dvh;\n  box-sizing: border-box;\n  display: grid;\n  grid-template-columns: 1fr minmax(300px, 470px);\n  align-items: center;\n  gap: clamp(24px, 7vw, 110px);\n  max-width: 1160px;\n  margin: auto;\n  padding: 86px 36px 40px;\n}\n:host(.workbench-station) .restoration-console {\n  width: auto;\n  margin: 0;\n  padding: clamp(24px, 3vw, 40px);\n  background: rgba(8, 28, 41, 0.9098039216);\n  border-radius: 22px;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4666666667);\n}\n.restoration-console h1 {\n  font-size: clamp(25px, 3vw, 38px);\n  line-height: 1.12;\n  margin: 0 0 26px;\n}\n.restoration-console h1:focus {\n  outline: none;\n}\n.focus-specimen {\n  display: grid;\n  justify-items: center;\n  gap: 22px;\n  margin: 0;\n}\n.focus-specimen > img {\n  display: block;\n  max-width: 100%;\n  width: 250px;\n  height: min(48dvh, 410px);\n  object-fit: contain;\n  filter: drop-shadow(0 24px 34px rgba(0, 0, 0, 0.6));\n}\n.focus-specimen select {\n  padding: 10px 16px;\n  min-height: 44px;\n  color: #f0fafa;\n  background: rgba(16, 43, 53, 0.9098039216);\n  border: 1px solid #7ea4ad;\n  border-radius: 24px;\n}\n.restoration-console .decision-grid {\n  grid-template-columns: 1fr;\n  gap: 10px;\n}\n.restoration-console .decision-grid button {\n  min-height: 56px;\n  padding: 14px 16px;\n  font-size: 16px;\n}\n.restoration-console .decision-grid small {\n  font-size: 12px;\n  line-height: 1.4;\n}\n.decision-actions {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-top: 24px;\n}\n.decision-actions .station-primary {\n  margin: 0 0 0 auto;\n  width: auto;\n  min-width: 140px;\n  min-height: 48px;\n  font-size: 15px;\n}\n.decision-actions button:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.confidence-details {\n  margin-top: 16px;\n  font-size: 13px;\n}\n.confidence-details summary {\n  cursor: pointer;\n}\n@media (max-width: 700px) {\n  .restoration-stage {\n    grid-template-columns: 1fr;\n    gap: 20px;\n    padding: 82px 18px 24px;\n  }\n  .focus-specimen {\n    gap: 10px;\n  }\n  .focus-specimen > img {\n    height: 190px;\n    width: 160px;\n  }\n  :host(.workbench-station) .restoration-console {\n    width: auto;\n    padding: 24px;\n  }\n}\n:host(.lab-preview) {\n  position: relative;\n  inset: auto;\n  display: block;\n  container-type: inline-size;\n}\n:host(.lab-preview) .lab-canvas,\n:host(.lab-preview) .bench-canvas,\n:host(.lab-preview) .matter-canvas,\n:host(.lab-preview) .bay-canvas,\n:host(.lab-preview) .station-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 0;\n  overflow: visible;\n}\n:host(.lab-preview) .lab-grid,\n:host(.lab-preview) .bench-grid,\n:host(.lab-preview) .matter-grid,\n:host(.lab-preview) .bay-grid {\n  padding: 14px;\n  min-height: 0;\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n  gap: 12px;\n}\n:host(.lab-preview) .lab-grid.has-record,\n:host(.lab-preview) .bench-grid.has-record,\n:host(.lab-preview) .matter-grid.has-record {\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n}\n:host(.lab-preview) .lab-grid.has-record .rack,\n:host(.lab-preview) .bench-grid.has-record .rack,\n:host(.lab-preview) .matter-grid.has-record .rack {\n  display: block;\n}\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  grid-column: 1/-1;\n}\n:host(.lab-preview) .record[hidden] {\n  display: none;\n}\n:host(.lab-preview) .stage,\n:host(.lab-preview) .rig,\n:host(.lab-preview) .rack,\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  min-width: 0;\n}\n:host(.lab-preview) .kicker,\n:host(.lab-preview) .instrument-copy small,\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  display: block;\n}\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  max-height: 200px;\n  overflow: auto;\n}\n:host(.lab-preview) .instrument-well,\n:host(.lab-preview) .chamber-well {\n  min-height: 230px;\n}\n:host(.lab-preview) .instrument-well {\n  height: 245px;\n}\n:host(.lab-preview) .stage-controls {\n  margin-top: 10px;\n}\n:host(.lab-preview) .preview-run {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0;\n}\n:host(.lab-preview) .preview-run .primary-action {\n  width: auto;\n}\n:host(.lab-preview) .preview-run p {\n  flex-basis: 100%;\n  margin: 0;\n}\n:host(.lab-preview) h1 {\n  font-size: 1.2rem;\n}\n:host(.lab-preview) h2 {\n  font-size: 1rem;\n}\n:host(.lab-preview) button,\n:host(.lab-preview) select {\n  min-height: 44px;\n  font-size: 0.87rem;\n}\n:host(.lab-preview) small,\n:host(.lab-preview) .record-note,\n:host(.lab-preview) .stage-hint,\n:host(.lab-preview) .rig-hint,\n:host(.lab-preview) .hint,\n:host(.lab-preview) .readout small,\n:host(.lab-preview) .readout strong,\n:host(.lab-preview) .readout-stack small,\n:host(.lab-preview) .readout-stack strong,\n:host(.lab-preview) .rack-note {\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n:host(.lab-preview) input[type=range] {\n  min-height: 32px;\n}\n:host(.lab-preview) .restoration-stage {\n  position: relative;\n  inset: auto;\n  display: grid;\n  grid-template-columns: minmax(110px, 0.6fr) minmax(0, 1.7fr);\n  padding: 20px;\n  min-height: 0;\n  gap: 20px;\n}\n:host(.lab-preview) .restoration-console {\n  position: relative;\n  width: auto;\n  max-width: none;\n  min-width: 0;\n}\n:host(.lab-preview) .restoration-console label {\n  display: grid;\n  gap: 6px;\n  margin: 12px 0;\n}\n:host(.lab-preview) .restoration-console select {\n  width: 100%;\n  background: #102b38;\n  border: 1px solid #527888;\n  color: #eefaff;\n  padding: 8px;\n  border-radius: 6px;\n}\n:host(.lab-preview) .focus-specimen {\n  width: auto;\n  align-self: start;\n  margin: 0;\n}\n:host(.lab-preview) .focus-specimen img {\n  max-width: 100%;\n  max-height: 260px;\n  object-fit: contain;\n}\n:host(.lab-preview) .focus-specimen select {\n  max-width: 100%;\n}\n:host(.lab-preview) .shelf-plan {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n  margin-top: 20px;\n}\n:host(.lab-preview) .shelf-plan button {\n  display: grid;\n  gap: 5px;\n  text-align: left;\n  border: 1px solid #4b7181;\n  border-radius: 8px;\n  background: #173848;\n  color: #e9f6fb;\n  padding: 10px;\n  overflow-wrap: anywhere;\n}\n:host(.lab-preview) .shelf-plan button[aria-pressed=true] {\n  border: 2px solid #8be5d7;\n}\n:host(.lab-preview) :is(button, select, summary, input):focus-visible {\n  outline: 3px solid #a9efdc;\n  outline-offset: 3px;\n}\n@container (max-width: 640px) {\n  :host(.lab-preview) .lab-grid,\n  :host(.lab-preview) .bench-grid,\n  :host(.lab-preview) .matter-grid,\n  :host(.lab-preview) .bay-grid,\n  :host(.lab-preview) .lab-grid.has-record,\n  :host(.lab-preview) .bench-grid.has-record,\n  :host(.lab-preview) .matter-grid.has-record,\n  :host(.lab-preview) .restoration-stage {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 10px;\n  }\n  :host(.lab-preview) .stage,\n  :host(.lab-preview) .rig {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .rack {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .bay-grid .rack {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .bay-grid .stage {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .test-list,\n  :host(.lab-preview) .shelf-plan {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  :host(.lab-preview) .instrument-list,\n  :host(.lab-preview) .chamber-list {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  :host(.lab-preview) .focus-specimen {\n    max-width: 130px;\n    justify-self: center;\n  }\n  :host(.lab-preview) .focus-specimen img {\n    max-height: 150px;\n  }\n  :host(.lab-preview) .chamber-well {\n    gap: 8px;\n  }\n  :host(.lab-preview) .probe-rig {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=station-workspaces.css.map */\n'] }]
  }], () => [], { captured: [{
    type: Output
  }], vialChanged: [{
    type: Output
  }], selectedVialId: [{ type: Input, args: [{ isSignal: true, alias: "selectedVialId", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RestorationWorkspaceComponent, { className: "RestorationWorkspaceComponent", filePath: "src/app/projects/mystery-substance/station-workspaces.ts", lineNumber: 261 });
})();
var ShowcaseWorkspaceComponent = class _ShowcaseWorkspaceComponent {
  captured = new EventEmitter();
  initialVersion = 1;
  evidenceFiles = mysteryEvidenceFiles;
  selectedEvidence = signal(
    [],
    ...ngDevMode ? [{ debugName: "selectedEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  version = signal(
    1,
    ...ngDevMode ? [{ debugName: "version" }] : (
      /* istanbul ignore next */
      []
    )
  );
  claim = "";
  reasoning = "";
  ngOnInit() {
    this.version.set(this.initialVersion);
  }
  toggleEvidence(id) {
    this.selectedEvidence.update((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }
  saveVersion() {
    this.captured.emit({
      activityId: "activity-case-showcase",
      evidenceId: "evidence-final-case-file",
      result: {
        version: this.version(),
        claim: this.claim,
        reasoning: this.reasoning,
        evidenceIds: this.selectedEvidence()
      },
      note: this.reasoning
    });
    this.version.update((value) => value + 1);
  }
  static \u0275fac = function ShowcaseWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShowcaseWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShowcaseWorkspaceComponent, selectors: [["app-showcase-workspace"]], inputs: { initialVersion: "initialVersion" }, outputs: { captured: "captured" }, decls: 24, vars: 4, consts: [[1, "station-canvas", "showcase-workspace"], ["role", "img", "aria-label", "Professional chain-of-evidence presentation board", 1, "atlas", "atlas--showcase"], [1, "station-shade"], [1, "showcase-console"], [1, "station-kicker"], ["aria-label", "Evidence picker", 1, "showcase-evidence"], ["type", "button", 3, "selected"], ["rows", "2", "placeholder", "Our shelf restoration identifies\u2026", 3, "ngModelChange", "ngModel"], ["rows", "4", "placeholder", "The evidence pattern supports the claim because\u2026", 3, "ngModelChange", "ngModel"], [1, "showcase-footer"], ["type", "button", 1, "station-primary", 3, "click"], ["type", "button", 3, "click"]], template: function ShowcaseWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275element(1, "div", 1)(2, "div", 2);
      \u0275\u0275elementStart(3, "article", 3)(4, "span", 4);
      \u0275\u0275text(5, "Versioned performance artifact \xB7 case-file showcase");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "h1");
      \u0275\u0275text(7, "Defend the restored shelf.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p");
      \u0275\u0275text(9, "Choose the evidence your audience should inspect, then connect it to the claim.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 5);
      \u0275\u0275repeaterCreate(11, ShowcaseWorkspaceComponent_For_12_Template, 2, 3, "button", 6, _forTrack05);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "label");
      \u0275\u0275text(14, "Claim ");
      \u0275\u0275elementStart(15, "textarea", 7);
      \u0275\u0275twoWayListener("ngModelChange", function ShowcaseWorkspaceComponent_Template_textarea_ngModelChange_15_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.claim, $event) || (ctx.claim = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "label");
      \u0275\u0275text(17, "Scientific reasoning ");
      \u0275\u0275elementStart(18, "textarea", 8);
      \u0275\u0275twoWayListener("ngModelChange", function ShowcaseWorkspaceComponent_Template_textarea_ngModelChange_18_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.reasoning, $event) || (ctx.reasoning = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 9)(20, "span");
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "button", 10);
      \u0275\u0275listener("click", function ShowcaseWorkspaceComponent_Template_button_click_22_listener() {
        return ctx.saveVersion();
      });
      \u0275\u0275text(23, " Save case-file version ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.evidenceFiles);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.claim);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.reasoning);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("Draft version ", ctx.version(), " \xB7 ", ctx.selectedEvidence().length, " evidence records selected");
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: [_c03] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShowcaseWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-showcase-workspace", imports: [CommonModule, FormsModule], template: `
    <section class="station-canvas showcase-workspace">
      <div
        class="atlas atlas--showcase"
        role="img"
        aria-label="Professional chain-of-evidence presentation board"
      ></div>
      <div class="station-shade"></div>
      <article class="showcase-console">
        <span class="station-kicker">Versioned performance artifact \xB7 case-file showcase</span>
        <h1>Defend the restored shelf.</h1>
        <p>Choose the evidence your audience should inspect, then connect it to the claim.</p>

        <div class="showcase-evidence" aria-label="Evidence picker">
          @for (item of evidenceFiles; track item.id) {
            <button
              type="button"
              [class.selected]="selectedEvidence().includes(item.id)"
              (click)="toggleEvidence(item.id)"
            >
              {{ item.title }}
            </button>
          }
        </div>

        <label
          >Claim
          <textarea
            rows="2"
            [(ngModel)]="claim"
            placeholder="Our shelf restoration identifies\u2026"
          ></textarea>
        </label>
        <label
          >Scientific reasoning
          <textarea
            rows="4"
            [(ngModel)]="reasoning"
            placeholder="The evidence pattern supports the claim because\u2026"
          ></textarea>
        </label>

        <div class="showcase-footer">
          <span
            >Draft version {{ version() }} \xB7 {{ selectedEvidence().length }} evidence records
            selected</span
          ><button type="button" class="station-primary" (click)="saveVersion()">
            Save case-file version
          </button>
        </div>
      </article>
    </section>
  `, styles: ['/* src/app/projects/mystery-substance/station-workspaces.scss */\n:host {\n  position: absolute;\n  inset: 0;\n  display: block;\n}\nbutton,\nselect,\ntextarea,\ninput {\n  font: inherit;\n}\nbutton {\n  color: inherit;\n}\n.station-canvas,\n.atlas,\n.station-shade {\n  position: absolute;\n  inset: 0;\n}\n.station-canvas {\n  overflow: hidden;\n  color: #ebf7fc;\n  background: #04101a;\n}\n.atlas {\n  z-index: 0;\n  background-color: #04101a;\n  background-repeat: no-repeat;\n  background-size: cover;\n  filter: saturate(0.91) contrast(1.04) brightness(0.72);\n}\n.atlas--evidence,\n.atlas--showcase {\n  background-image: url(/evidence-artwork/e10-shelf-audit.webp);\n  background-position: center;\n}\n.atlas--week2 {\n  background-image: url(/week2-test-scenes-v2.webp);\n  background-size: 200% 200%;\n}\n.atlas--week3 {\n  background-image: url(/week3-test-scenes-v2.webp);\n  background-size: 200% 100%;\n}\n.atlas--conservation {\n  background-image: url(/conservation-test-scenes-v2.webp);\n  background-size: 200% 100%;\n}\n.atlas--week4 {\n  background-image: url(/week4-test-scenes-v2.webp);\n  background-size: 200% 200%;\n}\n.station-shade {\n  z-index: 1;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(3, 12, 19, 0.9),\n      rgba(3, 12, 19, 0.25) 58%,\n      rgba(3, 12, 19, 0.52)),\n    linear-gradient(\n      180deg,\n      rgba(2, 10, 17, 0.2),\n      rgba(2, 10, 17, 0.65));\n}\n.station-kicker {\n  color: #79d8d5;\n  font-size: 0.65rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh1 {\n  margin: 0.48rem 0 0.35rem;\n  color: #f1f8fc;\n  font-size: clamp(1.55rem, 3vw, 2.8rem);\n  line-height: 1.03;\n  letter-spacing: -0.035em;\n}\np {\n  margin: 0;\n  color: #adc3cf;\n  line-height: 1.5;\n}\n.station-intro {\n  position: absolute;\n  z-index: 3;\n  top: 11%;\n  left: 6%;\n  width: min(34rem, 48vw);\n  border-left: 2px solid #6ddad7;\n  padding: 1rem 1.25rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(4, 16, 25, 0.84),\n      transparent);\n}\n.evidence-filmstrip {\n  position: absolute;\n  z-index: 4;\n  right: 4%;\n  bottom: 5%;\n  left: 4%;\n  display: grid;\n  grid-template-columns: repeat(5, minmax(8rem, 1fr));\n  gap: 0.45rem;\n}\n.evidence-filmstrip button {\n  display: grid;\n  min-width: 0;\n  grid-template-columns: 3.8rem 1fr;\n  align-items: center;\n  gap: 0.55rem;\n  overflow: hidden;\n  border: 1px solid rgba(140, 190, 207, 0.22);\n  border-radius: 0.55rem;\n  padding: 0.35rem;\n  text-align: left;\n  background: rgba(5, 20, 30, 0.9);\n  cursor: pointer;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.evidence-filmstrip button:hover {\n  border-color: rgba(104, 220, 216, 0.56);\n  transform: translateY(-2px);\n}\n.evidence-filmstrip img {\n  width: 3.8rem;\n  height: 3rem;\n  border-radius: 0.32rem;\n  object-fit: cover;\n}\n.evidence-filmstrip span,\n.evidence-filmstrip small,\n.evidence-filmstrip strong {\n  display: block;\n  min-width: 0;\n}\n.evidence-filmstrip small {\n  overflow: hidden;\n  color: #7196a8;\n  font-size: 0.55rem;\n  text-overflow: ellipsis;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.evidence-filmstrip strong {\n  overflow: hidden;\n  color: #dceaf0;\n  font-size: 0.72rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.evidence-inspector {\n  position: absolute;\n  z-index: 4;\n  top: 5%;\n  right: 6%;\n  bottom: 5%;\n  width: min(31rem, 44vw);\n  overflow: auto;\n  border: 1px solid rgba(139, 189, 206, 0.28);\n  border-radius: 0.8rem;\n  padding: 1rem;\n  background: rgba(4, 16, 25, 0.94);\n  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);\n  -webkit-backdrop-filter: blur(14px);\n  backdrop-filter: blur(14px);\n}\n.evidence-inspector figure {\n  margin: 0.75rem 0 1rem;\n  overflow: hidden;\n  border-radius: 0.55rem;\n}\n.evidence-inspector img {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16/9;\n  object-fit: cover;\n}\n.back-button {\n  border: 0;\n  color: #91ddda;\n  background: transparent;\n  cursor: pointer;\n}\n.inspector-actions {\n  display: grid;\n  gap: 0.7rem;\n  margin-top: 1rem;\n}\n.inspector-actions a {\n  color: #85d8d6;\n}\n.lab-console,\n.reaction-console,\n.conservation-console,\n.restoration-console,\n.showcase-console {\n  position: absolute;\n  z-index: 4;\n  overflow: auto;\n  border: 1px solid rgba(140, 190, 207, 0.27);\n  border-radius: 0.78rem;\n  padding: clamp(1rem, 2vw, 1.6rem);\n  background: rgba(4, 16, 25, 0.93);\n  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.45);\n  -webkit-backdrop-filter: blur(15px);\n  backdrop-filter: blur(15px);\n}\n.lab-console {\n  top: 10%;\n  right: 5%;\n  bottom: 5%;\n  width: min(34rem, 47vw);\n}\n.instrument-tabs,\n.reaction-selector {\n  position: absolute;\n  z-index: 5;\n  top: 9%;\n  left: 3.5%;\n  display: grid;\n  width: min(19rem, 37vw);\n  gap: 0.45rem;\n}\n.instrument-tabs button,\n.reaction-selector button {\n  display: grid;\n  gap: 0.12rem;\n  border: 1px solid rgba(140, 188, 204, 0.22);\n  border-radius: 0.5rem;\n  padding: 0.65rem 0.8rem;\n  text-align: left;\n  background: rgba(4, 17, 27, 0.84);\n  cursor: pointer;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.instrument-tabs button.active,\n.reaction-selector button.active {\n  border-color: #74dcd8;\n  background: rgba(31, 99, 106, 0.54);\n}\n.instrument-tabs small,\n.reaction-selector small {\n  color: #6f98a8;\n  font-size: 0.58rem;\n  text-transform: uppercase;\n}\n.instrument-tabs strong,\n.reaction-selector strong {\n  font-size: 0.8rem;\n}\n.specimen-row {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.42rem;\n  margin: 1rem 0;\n}\n.specimen-row button {\n  position: relative;\n  display: grid;\n  grid-template-columns: 2.1rem 1fr;\n  align-items: center;\n  gap: 0.3rem;\n  overflow: hidden;\n  border: 1px solid rgba(137, 184, 201, 0.22);\n  border-radius: 0.48rem;\n  padding: 0.3rem;\n  text-align: left;\n  background: rgba(15, 36, 48, 0.82);\n  cursor: pointer;\n}\n.specimen-row button::after {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 2px;\n  background: var(--vial-color);\n  content: "";\n}\n.specimen-row button.active {\n  border-color: color-mix(in srgb, var(--vial-color), white 25%);\n  background: rgba(36, 72, 85, 0.95);\n}\n.specimen-row img {\n  width: 1.9rem;\n  height: 3rem;\n  grid-row: span 2;\n  object-fit: contain;\n}\n.specimen-row strong {\n  align-self: end;\n}\n.specimen-row small {\n  align-self: start;\n  color: #7393a3;\n  font-size: 0.58rem;\n}\n.raw-readout,\n.comparison-readout,\n.mass-display {\n  display: grid;\n  gap: 0.4rem;\n  border: 1px solid rgba(116, 205, 207, 0.22);\n  border-radius: 0.55rem;\n  padding: 0.75rem;\n  background: rgba(2, 11, 18, 0.77);\n}\n.raw-readout {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.raw-readout > span {\n  grid-column: 1/-1;\n  color: #75ceca;\n  font-size: 0.6rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.raw-readout div,\n.comparison-readout section div {\n  display: grid;\n  gap: 0.1rem;\n  border-left: 1px solid rgba(117, 190, 197, 0.25);\n  padding-left: 0.55rem;\n}\n.raw-readout small,\n.comparison-readout small,\n.mass-display small {\n  color: #718e9e;\n  font-size: 0.57rem;\n  text-transform: uppercase;\n}\n.raw-readout strong,\n.comparison-readout strong {\n  color: #e1eff4;\n  font-size: 0.74rem;\n}\n.empty-readout {\n  display: grid;\n  min-height: 7.5rem;\n  place-content: center;\n  justify-items: center;\n  border: 1px dashed rgba(133, 185, 201, 0.24);\n  border-radius: 0.55rem;\n  padding: 1rem;\n  color: #a9c0cc;\n  text-align: center;\n  background: rgba(3, 13, 21, 0.58);\n}\n.empty-readout > span {\n  width: 0.7rem;\n  height: 0.7rem;\n  margin-bottom: 0.55rem;\n  border: 2px solid #75d7d4;\n  border-radius: 50%;\n  box-shadow: 0 0 15px rgba(83, 218, 211, 0.6);\n}\n.empty-readout small {\n  margin-top: 0.25rem;\n  color: #6f8c9c;\n}\n.station-primary {\n  display: flex;\n  width: 100%;\n  min-height: 2.8rem;\n  align-items: center;\n  justify-content: center;\n  margin-top: 0.75rem;\n  border: 1px solid #79dedb;\n  border-radius: 0.5rem;\n  color: #042125;\n  background:\n    linear-gradient(\n      135deg,\n      #a0f1e8,\n      #5dc9d0);\n  font-weight: 850;\n  cursor: pointer;\n}\n.station-primary:disabled {\n  cursor: not-allowed;\n  filter: grayscale(0.75);\n  opacity: 0.58;\n}\n.reaction-console {\n  top: 7%;\n  right: 4%;\n  bottom: 5%;\n  width: min(38rem, 52vw);\n}\n.reaction-selector {\n  top: 14%;\n  width: min(15rem, 29vw);\n}\n.beaker-pair {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: end;\n  gap: 0.7rem;\n  margin: 1rem 0;\n}\n.beaker-pair label {\n  display: grid;\n  gap: 0.3rem;\n  color: #7796a6;\n  font-size: 0.62rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.beaker-pair select {\n  border: 1px solid rgba(129, 187, 203, 0.3);\n  border-radius: 0.42rem;\n  padding: 0.58rem;\n  color: #e7f4f8;\n  background: #0b2432;\n}\n.beaker-pair > span {\n  padding-bottom: 0.6rem;\n  color: #70d1ce;\n}\n.comparison-readout {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.comparison-readout section {\n  display: grid;\n  gap: 0.35rem;\n}\n.comparison-readout section > span {\n  color: #76d8d4;\n  font-weight: 850;\n}\n.conservation-console {\n  top: 8%;\n  right: 5%;\n  bottom: 6%;\n  width: min(37rem, 51vw);\n}\n.trial-toggle,\n.mode-tabs {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.45rem;\n  margin: 1rem 0;\n}\n.trial-toggle button,\n.mode-tabs button {\n  display: grid;\n  gap: 0.12rem;\n  border: 1px solid rgba(135, 184, 200, 0.23);\n  border-radius: 0.45rem;\n  padding: 0.6rem;\n  text-align: left;\n  background: rgba(14, 37, 49, 0.78);\n  cursor: pointer;\n}\n.trial-toggle button.active,\n.mode-tabs button.active {\n  border-color: #72d8d5;\n  background: rgba(33, 104, 108, 0.45);\n}\n.trial-toggle small {\n  color: #7694a3;\n  font-size: 0.58rem;\n  text-transform: uppercase;\n}\n.mass-display {\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  text-align: center;\n}\n.mass-display div {\n  display: grid;\n  gap: 0.18rem;\n}\n.mass-display strong {\n  color: #dff9f4;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  font-size: 1.45rem;\n}\n.mass-display span {\n  color: #6d8e9d;\n  font-size: 0.66rem;\n}\n.raw-observation {\n  margin: 0.65rem 0;\n  border-left: 2px solid #72d7d3;\n  padding: 0.5rem 0.7rem;\n  background: rgba(5, 20, 29, 0.72);\n  font-size: 0.76rem;\n}\n.restoration-console {\n  top: 4%;\n  right: 4%;\n  bottom: 4%;\n  width: min(43rem, 58vw);\n}\n.restoration-heading h1 {\n  font-size: clamp(1.35rem, 2.5vw, 2.25rem);\n}\n.specimen-row--compact {\n  margin: 0.75rem 0;\n}\n.mode-tabs {\n  grid-template-columns: repeat(4, 1fr);\n  margin: 0.6rem 0;\n}\n.mode-tabs button {\n  display: block;\n  text-align: center;\n  font-size: 0.68rem;\n}\n.decision-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.45rem;\n}\n.decision-grid button {\n  display: grid;\n  min-height: 4rem;\n  gap: 0.2rem;\n  border: 1px solid rgba(134, 184, 200, 0.23);\n  border-radius: 0.46rem;\n  padding: 0.65rem;\n  text-align: left;\n  background: rgba(12, 34, 46, 0.82);\n  cursor: pointer;\n}\n.decision-grid button.selected {\n  border-color: #72d9d5;\n  background: rgba(31, 103, 108, 0.48);\n}\n.decision-grid button:disabled {\n  cursor: not-allowed;\n  opacity: 0.46;\n}\n.decision-grid small {\n  color: #7795a4;\n  font-size: 0.62rem;\n}\n.reasoning-field,\n.confidence-field,\n.showcase-console label {\n  display: grid;\n  gap: 0.35rem;\n  color: #91aeba;\n  font-size: 0.68rem;\n  font-weight: 750;\n}\ntextarea {\n  box-sizing: border-box;\n  width: 100%;\n  resize: vertical;\n  border: 1px solid rgba(133, 185, 201, 0.27);\n  border-radius: 0.45rem;\n  padding: 0.65rem;\n  color: #e8f4f8;\n  outline: none;\n  background: rgba(2, 12, 19, 0.76);\n}\ntextarea:focus {\n  border-color: #77d8d5;\n  box-shadow: 0 0 0 3px rgba(82, 202, 201, 0.12);\n}\n.confidence-field {\n  grid-template-columns: 1fr auto;\n  margin-top: 0.65rem;\n}\n.confidence-field input {\n  grid-column: 1/-1;\n  width: 100%;\n  accent-color: #68d1cf;\n}\n.showcase-console {\n  top: 4%;\n  right: 4%;\n  bottom: 4%;\n  width: min(47rem, 64vw);\n}\n.showcase-evidence {\n  display: flex;\n  max-height: 7.3rem;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  overflow: auto;\n  margin: 0.8rem 0;\n}\n.showcase-evidence button {\n  border: 1px solid rgba(136, 184, 200, 0.24);\n  border-radius: 999px;\n  padding: 0.38rem 0.6rem;\n  color: #9cb7c3;\n  background: rgba(13, 37, 49, 0.83);\n  font-size: 0.63rem;\n  cursor: pointer;\n}\n.showcase-evidence button.selected {\n  border-color: #78dad6;\n  color: #e6fffb;\n  background: rgba(34, 111, 114, 0.5);\n}\n.showcase-console label + label {\n  margin-top: 0.65rem;\n}\n.showcase-footer {\n  display: grid;\n  grid-template-columns: 1fr minmax(13rem, 0.65fr);\n  align-items: center;\n  gap: 0.75rem;\n  margin-top: 0.7rem;\n}\n.showcase-footer > span {\n  color: #7e9aa7;\n  font-size: 0.65rem;\n}\n.showcase-footer .station-primary {\n  margin: 0;\n}\n@container (max-width: 820px) {\n  .station-intro {\n    top: 7%;\n    left: 4%;\n    width: 82%;\n  }\n  .evidence-filmstrip {\n    top: 41%;\n    right: 3%;\n    bottom: 3%;\n    left: 3%;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    overflow: auto;\n  }\n  .evidence-inspector,\n  .lab-console,\n  .reaction-console,\n  .conservation-console,\n  .restoration-console,\n  .showcase-console {\n    top: 2%;\n    right: 3%;\n    bottom: 2%;\n    width: auto;\n  }\n  .instrument-tabs,\n  .reaction-selector {\n    z-index: 6;\n    top: auto;\n    right: 4%;\n    bottom: 3%;\n    left: 4%;\n    width: auto;\n    grid-template-columns: repeat(4, 1fr);\n  }\n  .instrument-tabs button,\n  .reaction-selector button {\n    min-width: 0;\n    padding: 0.42rem;\n  }\n  .instrument-tabs small,\n  .reaction-selector small {\n    display: none;\n  }\n  .lab-console,\n  .reaction-console {\n    bottom: 5.3rem;\n  }\n  .reaction-selector {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .specimen-row button {\n    grid-template-columns: 1.65rem 1fr;\n  }\n  .specimen-row img {\n    width: 1.55rem;\n    height: 2.5rem;\n  }\n  .comparison-readout,\n  .decision-grid {\n    grid-template-columns: 1fr;\n  }\n  .mode-tabs {\n    position: sticky;\n    z-index: 2;\n    top: -1rem;\n    background: #071824;\n  }\n  .showcase-footer {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n  }\n}\n:host {\n  container-type: inline-size;\n}\n:host(.workbench-station) {\n  position: relative;\n  inset: auto;\n}\n:host(.workbench-station) .station-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 34rem;\n  overflow: visible;\n}\n:host(.workbench-station) .restoration-console {\n  position: relative;\n  inset: auto;\n  width: min(42rem, 100% - 2rem);\n  max-height: none;\n  margin: 1rem 1rem 1rem auto;\n  overflow: visible;\n}\n:host(.workbench-station) .restoration-workspace {\n  min-height: 100dvh;\n}\n.restoration-workspace .atlas {\n  filter: saturate(1.05) brightness(0.9);\n}\n.restoration-workspace .station-shade {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(3, 16, 26, 0.2),\n      rgba(3, 16, 26, 0.1333333333) 40%,\n      rgba(3, 16, 26, 0.6666666667));\n}\n.restoration-stage {\n  position: relative;\n  z-index: 3;\n  min-height: 100dvh;\n  box-sizing: border-box;\n  display: grid;\n  grid-template-columns: 1fr minmax(300px, 470px);\n  align-items: center;\n  gap: clamp(24px, 7vw, 110px);\n  max-width: 1160px;\n  margin: auto;\n  padding: 86px 36px 40px;\n}\n:host(.workbench-station) .restoration-console {\n  width: auto;\n  margin: 0;\n  padding: clamp(24px, 3vw, 40px);\n  background: rgba(8, 28, 41, 0.9098039216);\n  border-radius: 22px;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4666666667);\n}\n.restoration-console h1 {\n  font-size: clamp(25px, 3vw, 38px);\n  line-height: 1.12;\n  margin: 0 0 26px;\n}\n.restoration-console h1:focus {\n  outline: none;\n}\n.focus-specimen {\n  display: grid;\n  justify-items: center;\n  gap: 22px;\n  margin: 0;\n}\n.focus-specimen > img {\n  display: block;\n  max-width: 100%;\n  width: 250px;\n  height: min(48dvh, 410px);\n  object-fit: contain;\n  filter: drop-shadow(0 24px 34px rgba(0, 0, 0, 0.6));\n}\n.focus-specimen select {\n  padding: 10px 16px;\n  min-height: 44px;\n  color: #f0fafa;\n  background: rgba(16, 43, 53, 0.9098039216);\n  border: 1px solid #7ea4ad;\n  border-radius: 24px;\n}\n.restoration-console .decision-grid {\n  grid-template-columns: 1fr;\n  gap: 10px;\n}\n.restoration-console .decision-grid button {\n  min-height: 56px;\n  padding: 14px 16px;\n  font-size: 16px;\n}\n.restoration-console .decision-grid small {\n  font-size: 12px;\n  line-height: 1.4;\n}\n.decision-actions {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-top: 24px;\n}\n.decision-actions .station-primary {\n  margin: 0 0 0 auto;\n  width: auto;\n  min-width: 140px;\n  min-height: 48px;\n  font-size: 15px;\n}\n.decision-actions button:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.confidence-details {\n  margin-top: 16px;\n  font-size: 13px;\n}\n.confidence-details summary {\n  cursor: pointer;\n}\n@media (max-width: 700px) {\n  .restoration-stage {\n    grid-template-columns: 1fr;\n    gap: 20px;\n    padding: 82px 18px 24px;\n  }\n  .focus-specimen {\n    gap: 10px;\n  }\n  .focus-specimen > img {\n    height: 190px;\n    width: 160px;\n  }\n  :host(.workbench-station) .restoration-console {\n    width: auto;\n    padding: 24px;\n  }\n}\n:host(.lab-preview) {\n  position: relative;\n  inset: auto;\n  display: block;\n  container-type: inline-size;\n}\n:host(.lab-preview) .lab-canvas,\n:host(.lab-preview) .bench-canvas,\n:host(.lab-preview) .matter-canvas,\n:host(.lab-preview) .bay-canvas,\n:host(.lab-preview) .station-canvas {\n  position: relative;\n  inset: auto;\n  min-height: 0;\n  overflow: visible;\n}\n:host(.lab-preview) .lab-grid,\n:host(.lab-preview) .bench-grid,\n:host(.lab-preview) .matter-grid,\n:host(.lab-preview) .bay-grid {\n  padding: 14px;\n  min-height: 0;\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n  gap: 12px;\n}\n:host(.lab-preview) .lab-grid.has-record,\n:host(.lab-preview) .bench-grid.has-record,\n:host(.lab-preview) .matter-grid.has-record {\n  grid-template-columns: minmax(145px, 0.8fr) minmax(0, 2fr);\n}\n:host(.lab-preview) .lab-grid.has-record .rack,\n:host(.lab-preview) .bench-grid.has-record .rack,\n:host(.lab-preview) .matter-grid.has-record .rack {\n  display: block;\n}\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  grid-column: 1/-1;\n}\n:host(.lab-preview) .record[hidden] {\n  display: none;\n}\n:host(.lab-preview) .stage,\n:host(.lab-preview) .rig,\n:host(.lab-preview) .rack,\n:host(.lab-preview) .record,\n:host(.lab-preview) .console {\n  min-width: 0;\n}\n:host(.lab-preview) .kicker,\n:host(.lab-preview) .instrument-copy small,\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  display: block;\n}\n:host(.lab-preview) .trial-log,\n:host(.lab-preview) .procedure-log {\n  max-height: 200px;\n  overflow: auto;\n}\n:host(.lab-preview) .instrument-well,\n:host(.lab-preview) .chamber-well {\n  min-height: 230px;\n}\n:host(.lab-preview) .instrument-well {\n  height: 245px;\n}\n:host(.lab-preview) .stage-controls {\n  margin-top: 10px;\n}\n:host(.lab-preview) .preview-run {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0;\n}\n:host(.lab-preview) .preview-run .primary-action {\n  width: auto;\n}\n:host(.lab-preview) .preview-run p {\n  flex-basis: 100%;\n  margin: 0;\n}\n:host(.lab-preview) h1 {\n  font-size: 1.2rem;\n}\n:host(.lab-preview) h2 {\n  font-size: 1rem;\n}\n:host(.lab-preview) button,\n:host(.lab-preview) select {\n  min-height: 44px;\n  font-size: 0.87rem;\n}\n:host(.lab-preview) small,\n:host(.lab-preview) .record-note,\n:host(.lab-preview) .stage-hint,\n:host(.lab-preview) .rig-hint,\n:host(.lab-preview) .hint,\n:host(.lab-preview) .readout small,\n:host(.lab-preview) .readout strong,\n:host(.lab-preview) .readout-stack small,\n:host(.lab-preview) .readout-stack strong,\n:host(.lab-preview) .rack-note {\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n:host(.lab-preview) input[type=range] {\n  min-height: 32px;\n}\n:host(.lab-preview) .restoration-stage {\n  position: relative;\n  inset: auto;\n  display: grid;\n  grid-template-columns: minmax(110px, 0.6fr) minmax(0, 1.7fr);\n  padding: 20px;\n  min-height: 0;\n  gap: 20px;\n}\n:host(.lab-preview) .restoration-console {\n  position: relative;\n  width: auto;\n  max-width: none;\n  min-width: 0;\n}\n:host(.lab-preview) .restoration-console label {\n  display: grid;\n  gap: 6px;\n  margin: 12px 0;\n}\n:host(.lab-preview) .restoration-console select {\n  width: 100%;\n  background: #102b38;\n  border: 1px solid #527888;\n  color: #eefaff;\n  padding: 8px;\n  border-radius: 6px;\n}\n:host(.lab-preview) .focus-specimen {\n  width: auto;\n  align-self: start;\n  margin: 0;\n}\n:host(.lab-preview) .focus-specimen img {\n  max-width: 100%;\n  max-height: 260px;\n  object-fit: contain;\n}\n:host(.lab-preview) .focus-specimen select {\n  max-width: 100%;\n}\n:host(.lab-preview) .shelf-plan {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n  margin-top: 20px;\n}\n:host(.lab-preview) .shelf-plan button {\n  display: grid;\n  gap: 5px;\n  text-align: left;\n  border: 1px solid #4b7181;\n  border-radius: 8px;\n  background: #173848;\n  color: #e9f6fb;\n  padding: 10px;\n  overflow-wrap: anywhere;\n}\n:host(.lab-preview) .shelf-plan button[aria-pressed=true] {\n  border: 2px solid #8be5d7;\n}\n:host(.lab-preview) :is(button, select, summary, input):focus-visible {\n  outline: 3px solid #a9efdc;\n  outline-offset: 3px;\n}\n@container (max-width: 640px) {\n  :host(.lab-preview) .lab-grid,\n  :host(.lab-preview) .bench-grid,\n  :host(.lab-preview) .matter-grid,\n  :host(.lab-preview) .bay-grid,\n  :host(.lab-preview) .lab-grid.has-record,\n  :host(.lab-preview) .bench-grid.has-record,\n  :host(.lab-preview) .matter-grid.has-record,\n  :host(.lab-preview) .restoration-stage {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 10px;\n  }\n  :host(.lab-preview) .stage,\n  :host(.lab-preview) .rig {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .rack {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .bay-grid .rack {\n    grid-row: 1;\n  }\n  :host(.lab-preview) .bay-grid .stage {\n    grid-row: 2;\n  }\n  :host(.lab-preview) .test-list,\n  :host(.lab-preview) .shelf-plan {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  :host(.lab-preview) .instrument-list,\n  :host(.lab-preview) .chamber-list {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  :host(.lab-preview) .focus-specimen {\n    max-width: 130px;\n    justify-self: center;\n  }\n  :host(.lab-preview) .focus-specimen img {\n    max-height: 150px;\n  }\n  :host(.lab-preview) .chamber-well {\n    gap: 8px;\n  }\n  :host(.lab-preview) .probe-rig {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=station-workspaces.css.map */\n'] }]
  }], null, { captured: [{
    type: Output
  }], initialVersion: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShowcaseWorkspaceComponent, { className: "ShowcaseWorkspaceComponent", filePath: "src/app/projects/mystery-substance/station-workspaces.ts", lineNumber: 466 });
})();

export {
  physicalTests,
  reactionTests,
  persistWorkspaceDraft,
  PropertiesLabComponent,
  ReactionBenchComponent,
  ConservationChamberComponent,
  EmergencyResponseComponent,
  RestorationWorkspaceComponent
};
//# debugId=654f8869-446c-509e-84e6-c07ff1f490ea
//# sourceMappingURL=chunk-TNCQS45K.js.map
