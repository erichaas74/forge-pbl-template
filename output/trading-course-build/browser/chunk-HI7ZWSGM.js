import {
  EngineeringExhibitComponent
} from "./chunk-QNAGWBLA.js";
import "./chunk-5NMHGW4V.js";
import {
  SolarMonumentComponent
} from "./chunk-L272B73U.js";
import {
  DESIGN_CHROME,
  DESIGN_SIMULATIONS,
  DesignSimulationRegistry
} from "./chunk-T7GOLBBA.js";
import "./chunk-UW6DFD2Z.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import {
  NgComponentOutlet,
  NgTemplateOutlet
} from "./chunk-ENCFJY7U.js";
import {
  Component,
  Injector,
  Input,
  computed,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-E2VJWGUE.js";
import {
  solsticeGatesChecks,
  solsticeGatesDesign
} from "./chunk-G4P4QDGV.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/projects/calendar-monument/calendar-monument.solstice-observations.ts
var solsticeObservations = [
  {
    "settings": {
      "latitude": 38.83,
      "longitude": -104.82,
      "zone": "America/Denver",
      "localDate": "2026-03-20",
      "minutes": 454.0987333333333,
      "utcInstant": "2026-03-20T13:34:05.924Z",
      "modelVersion": "solar-optics-2.0",
      "scenarioId": "march",
      "reviewId": "solstice-gates-example",
      "targetId": "observer",
      "expectedValue": "sunlight",
      "actualValue": "sunlight",
      "outcome": "met",
      "observationRule": "morning",
      "clockMinutes": 720,
      "observationAvailable": 1
    },
    "measurements": [
      {
        "label": "Seasonal event",
        "value": "March equinox"
      },
      {
        "label": "Observation",
        "value": "2026-03-20 \xB7 7:34:05 AM \xB7 30 min after sunrise \xB7 America/Denver"
      },
      {
        "label": "Sun altitude",
        "value": "5.11\xB0"
      },
      {
        "label": "Sun direction",
        "value": "94.38\xB0 clockwise from north"
      },
      {
        "label": "Height-only shadow reference",
        "value": "17.892 m"
      },
      {
        "label": "Target",
        "value": "Center \xB7 face east"
      },
      {
        "label": "Expected",
        "value": "sunlight"
      },
      {
        "label": "Observed at target centre",
        "value": "sunlight"
      },
      {
        "label": "Sculpture surface samples",
        "value": "No central object"
      },
      {
        "label": "Comparison",
        "value": "Matches expectation"
      },
      {
        "label": "7 days before",
        "value": "2026-03-13: sunlight \xB7 also matches"
      },
      {
        "label": "7 days after",
        "value": "2026-03-27: sunlight \xB7 also matches"
      }
    ]
  },
  {
    "settings": {
      "latitude": 38.83,
      "longitude": -104.82,
      "zone": "America/Denver",
      "localDate": "2026-06-21",
      "minutes": 365.6435666666667,
      "utcInstant": "2026-06-21T12:05:38.614Z",
      "modelVersion": "solar-optics-2.0",
      "scenarioId": "june",
      "reviewId": "solstice-gates-example",
      "targetId": "summer-carving",
      "expectedValue": "sunlight",
      "actualValue": "sunlight",
      "outcome": "met",
      "observationRule": "morning",
      "clockMinutes": 720,
      "observationAvailable": 1
    },
    "measurements": [
      {
        "label": "Seasonal event",
        "value": "June solstice"
      },
      {
        "label": "Observation",
        "value": "2026-06-21 \xB7 6:05:38 AM \xB7 30 min after sunrise \xB7 America/Denver"
      },
      {
        "label": "Sun altitude",
        "value": "4.45\xB0"
      },
      {
        "label": "Sun direction",
        "value": "63.29\xB0 clockwise from north"
      },
      {
        "label": "Height-only shadow reference",
        "value": "20.551 m"
      },
      {
        "label": "Target",
        "value": "Summer carving"
      },
      {
        "label": "Target height",
        "value": "0.566 m above the base \xB7 fixed surface mark"
      },
      {
        "label": "Expected",
        "value": "sunlight"
      },
      {
        "label": "Observed at target centre",
        "value": "sunlight"
      },
      {
        "label": "Sculpture surface samples",
        "value": "No central object"
      },
      {
        "label": "Comparison",
        "value": "Matches expectation"
      },
      {
        "label": "7 days before",
        "value": "2026-06-14: sunlight \xB7 also matches"
      },
      {
        "label": "7 days after",
        "value": "2026-06-28: sunlight \xB7 also matches"
      }
    ]
  },
  {
    "settings": {
      "latitude": 38.83,
      "longitude": -104.82,
      "zone": "America/Denver",
      "localDate": "2026-09-22",
      "minutes": 438.2022,
      "utcInstant": "2026-09-22T13:18:12.132Z",
      "modelVersion": "solar-optics-2.0",
      "scenarioId": "sept",
      "reviewId": "solstice-gates-example",
      "targetId": "observer",
      "expectedValue": "sunlight",
      "actualValue": "sunlight",
      "outcome": "met",
      "observationRule": "morning",
      "clockMinutes": 720,
      "observationAvailable": 1
    },
    "measurements": [
      {
        "label": "Seasonal event",
        "value": "September equinox"
      },
      {
        "label": "Observation",
        "value": "2026-09-22 \xB7 7:18:12 AM \xB7 30 min after sunrise \xB7 America/Denver"
      },
      {
        "label": "Sun altitude",
        "value": "5.24\xB0"
      },
      {
        "label": "Sun direction",
        "value": "93.77\xB0 clockwise from north"
      },
      {
        "label": "Height-only shadow reference",
        "value": "17.449 m"
      },
      {
        "label": "Target",
        "value": "Center \xB7 face east"
      },
      {
        "label": "Expected",
        "value": "sunlight"
      },
      {
        "label": "Observed at target centre",
        "value": "sunlight"
      },
      {
        "label": "Sculpture surface samples",
        "value": "No central object"
      },
      {
        "label": "Comparison",
        "value": "Matches expectation"
      },
      {
        "label": "7 days before",
        "value": "2026-09-15: sunlight \xB7 also matches"
      },
      {
        "label": "7 days after",
        "value": "2026-09-29: sunlight \xB7 also matches"
      }
    ]
  },
  {
    "settings": {
      "latitude": 38.83,
      "longitude": -104.82,
      "zone": "America/Denver",
      "localDate": "2026-12-21",
      "minutes": 465.40506666666664,
      "utcInstant": "2026-12-21T14:45:24.304Z",
      "modelVersion": "solar-optics-2.0",
      "scenarioId": "dec",
      "reviewId": "solstice-gates-example",
      "targetId": "winter-carving",
      "expectedValue": "sunlight",
      "actualValue": "sunlight",
      "outcome": "met",
      "observationRule": "morning",
      "clockMinutes": 720,
      "observationAvailable": 1
    },
    "measurements": [
      {
        "label": "Seasonal event",
        "value": "December solstice"
      },
      {
        "label": "Observation",
        "value": "2026-12-21 \xB7 7:45:24 AM \xB7 30 min after sunrise \xB7 America/Denver"
      },
      {
        "label": "Sun altitude",
        "value": "4.28\xB0"
      },
      {
        "label": "Sun direction",
        "value": "124.91\xB0 clockwise from north"
      },
      {
        "label": "Height-only shadow reference",
        "value": "21.360 m"
      },
      {
        "label": "Target",
        "value": "Winter carving"
      },
      {
        "label": "Target height",
        "value": "0.575 m above the base \xB7 fixed surface mark"
      },
      {
        "label": "Expected",
        "value": "sunlight"
      },
      {
        "label": "Observed at target centre",
        "value": "sunlight"
      },
      {
        "label": "Sculpture surface samples",
        "value": "No central object"
      },
      {
        "label": "Comparison",
        "value": "Matches expectation"
      },
      {
        "label": "7 days before",
        "value": "2026-12-14: sunlight \xB7 also matches"
      },
      {
        "label": "7 days after",
        "value": "2026-12-28: sunlight \xB7 also matches"
      }
    ]
  }
];

// src/app/projects/calendar-monument/calendar-monument.solstice-sample.ts
var design = __spreadProps(__spreadValues({}, solsticeGatesDesign), {
  targets: solsticeGatesDesign.targets.map((target) => {
    const row = solsticeObservations.find((r) => r.settings.targetId === target.id);
    if (!row) return target;
    const value = (label) => Number.parseFloat(row.measurements.find((m) => m.label === label).value);
    return __spreadProps(__spreadValues({}, target), {
      settings: {
        markerKind: "calendar-" + row.settings.scenarioId,
        utcInstant: row.settings.utcInstant,
        zone: row.settings.zone,
        latitude: row.settings.latitude,
        longitude: row.settings.longitude,
        sunAltitude: value("Sun altitude"),
        sunAzimuth: value("Sun direction"),
        light: row.settings.actualValue
      }
    });
  })
});
var solsticeGatesSample = {
  schemaVersion: "1.0",
  revision: 2,
  learningStepId: "sun-monument",
  design,
  checks: solsticeGatesChecks,
  research: {
    seasons: "Earth\u2019s tilt and yearly orbit change where the morning Sun appears. Summer and winter morning light arrive from different directions at Colorado Springs.",
    calendar: "A fixed mark on a receiving pillar gives us a repeatable test. Move the window until its light patch reaches the mark, then keep the stonework fixed when comparing seasons.",
    "colored-light": "The empty circular holes run horizontally through the upright stones. Sunlight must clear the full tunnel and travel across the court to reach the central pillar.",
    moon: "The Moon\u2019s monthly cycle is different from the Sun\u2019s yearly pattern."
  },
  prediction: "Thirty minutes after sunrise, the summer window illuminates the summer carving in June; the winter window illuminates the winter carving in December. The opposite mark stays in shadow.",
  exhibit: [
    "Solstice Windows \u2014 aim a hole at a mark",
    "Our monument has just three stones: two upright window stones and a receiving pillar beside the center. Each empty round hole faces sideways through its stone. A small patch of real simulated sunlight passes through the hole and lands on an engraved guide on the pillar\u2019s east face.",
    "Choose June solstice or December solstice. These tests use 30 minutes after sunrise at Colorado Springs, 2026. The summer window points toward a morning bearing of 63.29\xB0 from true north; the winter window points toward 124.91\xB0. These are morning directions, not the exact horizon-rise bearings. Compare the lit carving with the other carving, which stays in shadow.",
    "Turn on Ray guide, then open Markers and choose a carving to follow incoming sunlight to that fixed point. Turn Ray guide off to inspect the actual light patch inside its ring. The ring is an engraved reference guide; it does not emit light or affect the ray calculation.",
    "Starting challenge: load Align the solstice window from Sample models. The summer window starts 40 cm too far south; the winter alignment is a working comparison. Select June and Morning light. Keep the pillar and its marks fixed, then move only the summer window until its patch reaches the summer carving. Check December after your change. Save before and after evidence.",
    "Both window stones measure 140 \xD7 160 \xD7 25 cm, with an 18 cm horizontal bore centered 80 cm above the base. Their bore centers are 3 m horizontally from the matching pillar marks. The central pillar is 30 \xD7 120 \xD7 80 cm. Its east face is at X \u221235 cm; its summer and winter marks are 20 cm north and south of the middle, about 56.64 and 57.53 cm high. The slight drop from hole to mark follows the Sun\u2019s elevation.",
    "March and September records check unfiltered morning sunlight at the open observation point. They are comparison baselines, not additional solstice-hole alignments. Tests also seal each hole, turn it vertically, shift a window, and check the opposite solstice. Every changed geometry must produce new evidence.",
    "For a model at one tenth scale, use two 14 \xD7 16 \xD7 2.5 cm window stones with 1.8 cm holes, and a 3 \xD7 12 \xD7 8 cm receiving pillar. Scale the 30 cm gap, all coordinates and the mark heights together; keep the same angles. A card screen with a punched hole is useful for an initial light-alignment experiment.",
    "These are computed observations using parallel sunlight on a level base. Nearby dates can also align, particularly close to a solstice. The marks identify a seasonal pattern, not one unique day. Physical construction and outdoor measurements still need to be tested."
  ].join("\n\n"),
  // Open the finished exhibit on its main summer alignment.
  trials: [
    solsticeObservations[1],
    solsticeObservations[3],
    solsticeObservations[0],
    solsticeObservations[2]
  ].map((row, i) => ({
    id: `solstice-gates-example-${i}`,
    pluginId: "simulation.solar-monument",
    capturedAt: "2026-09-12T12:00:00Z",
    design: structuredClone(design),
    settings: __spreadValues({}, row.settings),
    prediction: row.settings.scenarioId === "june" ? "The summer carving receives light through the summer window." : row.settings.scenarioId === "dec" ? "The winter carving receives light through the winter window." : "The open center receives morning sunlight.",
    measurements: row.measurements
  })),
  events: []
};

// src/app/templates/engineering-design/ui/engineering-final-demo.component.ts
var _c0 = (a0) => ["/projects", a0, "experience"];
function EngineeringFinalDemoComponent_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function EngineeringFinalDemoComponent_Conditional_8_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function EngineeringFinalDemoComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 5)(1, "button", 7);
    \u0275\u0275listener("click", function EngineeringFinalDemoComponent_Conditional_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.guideOpen.set(false));
    });
    \u0275\u0275text(2, "Close \xD7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "This example is read only. Choose a special date to compare its Sun and shadow.");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, EngineeringFinalDemoComponent_Conditional_8_ng_container_7_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementStart(8, "button", 3);
    \u0275\u0275listener("click", function EngineeringFinalDemoComponent_Conditional_8_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.hostGuide()());
    });
    \u0275\u0275text(9, "Teacher guide");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "details")(11, "summary");
    \u0275\u0275text(12, "Blueprint & evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "app-engineering-exhibit", 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.title());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.chrome()?.guide ?? null);
    \u0275\u0275advance(6);
    \u0275\u0275property("title", ctx_r1.title())("snapshot", ctx_r1.snapshot());
  }
}
function EngineeringFinalDemoComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
var EngineeringFinalDemoComponent = class _EngineeringFinalDemoComponent {
  title = input.required(
    ...ngDevMode ? [{ debugName: "title" }] : (
      /* istanbul ignore next */
      []
    )
  );
  projectId = input(
    "",
    ...ngDevMode ? [{ debugName: "projectId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hostGuide = input(
    () => {
    },
    ...ngDevMode ? [{ debugName: "hostGuide" }] : (
      /* istanbul ignore next */
      []
    )
  );
  snapshot = input.required(
    ...ngDevMode ? [{ debugName: "snapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  simulationId = input.required(
    ...ngDevMode ? [{ debugName: "simulationId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  chrome = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "chrome" }] : (
      /* istanbul ignore next */
      []
    )
  );
  guideOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "guideOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  simulationInjector = Injector.create({
    parent: inject(Injector),
    providers: [
      {
        provide: DESIGN_CHROME,
        useValue: (chrome) => this.chrome.set(chrome)
      }
    ]
  });
  registry = inject(DESIGN_SIMULATIONS);
  simulation = computed(
    () => this.registry.require(this.simulationId()),
    ...ngDevMode ? [{ debugName: "simulation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  simulationInputs = computed(
    () => {
      const snapshot = this.snapshot();
      return {
        design: snapshot.design,
        checks: snapshot.checks ?? [],
        presentation: true,
        readOnly: true,
        active: true,
        restore: snapshot.trials[0] ? __spreadProps(__spreadValues({}, snapshot.trials[0]), { design: snapshot.design }) : void 0
      };
    },
    ...ngDevMode ? [{ debugName: "simulationInputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function EngineeringFinalDemoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EngineeringFinalDemoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EngineeringFinalDemoComponent, selectors: [["app-engineering-final-demo"]], inputs: { title: [1, "title"], projectId: [1, "projectId"], hostGuide: [1, "hostGuide"], snapshot: [1, "snapshot"], simulationId: [1, "simulationId"] }, decls: 10, vars: 10, consts: [["aria-label", "Example navigation and controls"], [3, "routerLink"], [1, "example-label", 3, "title"], [3, "click"], [4, "ngTemplateOutlet"], ["aria-label", "Example guide"], [4, "ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector"], [1, "close", 3, "click"], [3, "title", "snapshot"]], template: function EngineeringFinalDemoComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0)(1, "a", 1);
      \u0275\u0275text(2, "\u2190 Lab");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "span", 2);
      \u0275\u0275text(4, "Fictional example");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 3);
      \u0275\u0275listener("click", function EngineeringFinalDemoComponent_Template_button_click_5_listener() {
        return ctx.guideOpen.set(!ctx.guideOpen());
      });
      \u0275\u0275text(6, " Guide ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(7, EngineeringFinalDemoComponent_ng_container_7_Template, 1, 0, "ng-container", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(8, EngineeringFinalDemoComponent_Conditional_8_Template, 14, 4, "aside", 5);
      \u0275\u0275template(9, EngineeringFinalDemoComponent_ng_container_9_Template, 1, 0, "ng-container", 6);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(8, _c0, ctx.projectId()));
      \u0275\u0275advance(2);
      \u0275\u0275property("title", ctx.title());
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-expanded", ctx.guideOpen());
      \u0275\u0275advance(2);
      \u0275\u0275property("ngTemplateOutlet", ctx.chrome()?.toolbar ?? null);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.guideOpen() ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("ngComponentOutlet", ctx.simulation())("ngComponentOutletInputs", ctx.simulationInputs())("ngComponentOutletInjector", ctx.simulationInjector);
    }
  }, dependencies: [NgComponentOutlet, NgTemplateOutlet, RouterLink, EngineeringExhibitComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #393b31;\n}\nheader[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 30;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px;\n  padding: 8px;\n  border: 1px solid #c2b69d;\n  background: #f7f3e8;\n}\na[_ngcontent-%COMP%] {\n  color: #385a44;\n  font-size: 13px;\n  padding: 7px;\n}\n.example-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #66624e;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  cursor: pointer;\n  min-height: 36px;\n  padding: 7px 10px;\n  font-size: 13px;\n  color: inherit;\n  border: 1px solid #c2b69d;\n  border-radius: 6px;\n  background: #fffdf7;\n}\naside[_ngcontent-%COMP%] {\n  position: fixed;\n  right: 16px;\n  top: calc(var(--%NS%project-navigation-height, 0px) + 72px);\n  z-index: 40;\n  width: 345px;\n  max-width: calc(100vw - 48px);\n  max-height: calc(100dvh - var(--%NS%project-navigation-height, 0px) - 110px);\n  overflow: auto;\n  padding: 14px;\n  border: 1px solid #b8aa8e;\n  border-radius: 8px;\n  background: #fffdf7;\n  box-shadow: 0 15px 55px rgba(40, 42, 38, 0.2509803922);\n}\n.close[_ngcontent-%COMP%] {\n  display: block;\n  margin-left: auto;\n}\nh2[_ngcontent-%COMP%] {\n  font: 700 22px Georgia, serif;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.5;\n  font-size: 14px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 12px 0;\n}\n/*# sourceMappingURL=engineering-final-demo.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EngineeringFinalDemoComponent, [{
    type: Component,
    args: [{ selector: "app-engineering-final-demo", imports: [NgComponentOutlet, NgTemplateOutlet, RouterLink, EngineeringExhibitComponent], template: `
    <header aria-label="Example navigation and controls">
      <a [routerLink]="['/projects', projectId(), 'experience']">\u2190 Lab</a>
      <span class="example-label" [title]="title()">Fictional example</span>
      <button (click)="guideOpen.set(!guideOpen())" [attr.aria-expanded]="guideOpen()">
        Guide
      </button>
      <ng-container *ngTemplateOutlet="chrome()?.toolbar ?? null" />
    </header>
    @if (guideOpen()) {
      <aside aria-label="Example guide">
        <button class="close" (click)="guideOpen.set(false)">Close \xD7</button>
        <h2>{{ title() }}</h2>
        <p>This example is read only. Choose a special date to compare its Sun and shadow.</p>
        <ng-container *ngTemplateOutlet="chrome()?.guide ?? null" />
        <button (click)="hostGuide()()">Teacher guide</button>
        <details>
          <summary>Blueprint & evidence</summary>
          <app-engineering-exhibit [title]="title()" [snapshot]="snapshot()" />
        </details>
      </aside>
    }
    <ng-container
      *ngComponentOutlet="simulation(); inputs: simulationInputs(); injector: simulationInjector"
    />
  `, styles: ["/* angular:styles/component:scss;e40322ab43a0d923ca329ea8748dc06c8b05706d5c1d1807abb31b109d3bab9f;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/engineering-design/ui/engineering-final-demo.component.ts */\n:host {\n  display: block;\n  color: #393b31;\n}\nheader {\n  position: sticky;\n  top: 0;\n  z-index: 30;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px;\n  padding: 8px;\n  border: 1px solid #c2b69d;\n  background: #f7f3e8;\n}\na {\n  color: #385a44;\n  font-size: 13px;\n  padding: 7px;\n}\n.example-label {\n  font-size: 12px;\n  color: #66624e;\n}\nbutton {\n  font: inherit;\n  cursor: pointer;\n  min-height: 36px;\n  padding: 7px 10px;\n  font-size: 13px;\n  color: inherit;\n  border: 1px solid #c2b69d;\n  border-radius: 6px;\n  background: #fffdf7;\n}\naside {\n  position: fixed;\n  right: 16px;\n  top: calc(var(--project-navigation-height, 0px) + 72px);\n  z-index: 40;\n  width: 345px;\n  max-width: calc(100vw - 48px);\n  max-height: calc(100dvh - var(--project-navigation-height, 0px) - 110px);\n  overflow: auto;\n  padding: 14px;\n  border: 1px solid #b8aa8e;\n  border-radius: 8px;\n  background: #fffdf7;\n  box-shadow: 0 15px 55px rgba(40, 42, 38, 0.2509803922);\n}\n.close {\n  display: block;\n  margin-left: auto;\n}\nh2 {\n  font: 700 22px Georgia, serif;\n}\np {\n  line-height: 1.5;\n  font-size: 14px;\n}\nsummary {\n  cursor: pointer;\n  padding: 12px 0;\n}\n/*# sourceMappingURL=engineering-final-demo.component.css.map */\n"] }]
  }], null, { title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: true }] }], projectId: [{ type: Input, args: [{ isSignal: true, alias: "projectId", required: false }] }], hostGuide: [{ type: Input, args: [{ isSignal: true, alias: "hostGuide", required: false }] }], snapshot: [{ type: Input, args: [{ isSignal: true, alias: "snapshot", required: true }] }], simulationId: [{ type: Input, args: [{ isSignal: true, alias: "simulationId", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EngineeringFinalDemoComponent, { className: "EngineeringFinalDemoComponent", filePath: "src/app/templates/engineering-design/ui/engineering-final-demo.component.ts", lineNumber: 115 });
})();

// src/app/runtime/project-showcase/engineering.sample.ts
function loadSample() {
  const registry = new DesignSimulationRegistry();
  registry.register("simulation.solar-monument", SolarMonumentComponent);
  return {
    integratedHeader: true,
    title: "Solstice Windows",
    subtitle: "Horizontal holes send summer and winter morning sunlight onto marks on a central pillar.",
    audience: "Classmates and families",
    duration: "3\u20135 minute exhibit",
    trail: [
      {
        label: "Research",
        title: "Find the cause",
        text: "Connect Earth\u2019s tilt to Sun altitude and shadow length."
      },
      {
        label: "Design",
        title: "Make it reproducible",
        text: "Build two upright window stones and one receiving pillar. Aim each horizontal bore at its fixed summer or winter mark, 3 m away."
      },
      {
        label: "Revision",
        title: "Question the precision",
        text: "The starter\u2019s summer window misses its mark. Move that window until light reaches the fixed carving, then retest December and nearby dates."
      }
    ],
    review: {
      strength: "Verified rays pass through the complete horizontal bores and land on the central pillar\u2019s marks. Each mark misses the opposite solstice.",
      question: "How many nearby dates reach each target?",
      revision: "Seal a hole or shift its window, then compare the mark. Explain why nearby solstice dates can also align.",
      assessment: "Assess science, reproducibility, evidence, and revision. This is a fictional sample, not a verified physical test."
    },
    component: EngineeringFinalDemoComponent,
    providers: [{ provide: DESIGN_SIMULATIONS, useValue: registry }],
    inputs: {
      projectId: "calendar-monument",
      title: "Solstice Windows",
      snapshot: structuredClone(solsticeGatesSample),
      simulationId: "simulation.solar-monument"
    }
  };
}
export {
  loadSample
};
//# debugId=f6c09ee8-7f02-57d9-90f6-519eb9617849
//# sourceMappingURL=chunk-HI7ZWSGM.js.map
