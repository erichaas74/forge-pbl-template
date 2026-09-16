import {
  DESIGN_CAPTURE,
  DESIGN_CAPTURE_BATCH,
  DESIGN_CHANGE,
  DESIGN_CHECKS_CHANGE,
  DESIGN_CHROME,
  DESIGN_EDITOR,
  DESIGN_QUEST_PROGRESS,
  DESIGN_VIEW_REQUEST,
  isBlockDesign,
  isDesignCapture,
  transformBlocks
} from "./chunk-T7GOLBBA.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-UW6DFD2Z.js";
import {
  NgTemplateOutlet
} from "./chunk-ENCFJY7U.js";
import {
  Component,
  DestroyRef,
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
  untracked,
  viewChild,
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
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
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
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtrustConstantResourceUrl,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/plugins/simulations/solar-monument/solar-time-dial.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function SolarTimeDialComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "ellipse");
  }
  if (rf & 2) {
    const blob_r1 = ctx.$implicit;
    \u0275\u0275attribute("cx", blob_r1.x)("cy", blob_r1.y)("rx", blob_r1.rx)("ry", blob_r1.ry)("transform", "rotate(" + blob_r1.rotate + " " + blob_r1.x + " " + blob_r1.y + ")")("fill", blob_r1.id % 2 ? "#6cc47a" : "#58b368");
  }
}
function SolarTimeDialComponent_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "line", 27);
  }
  if (rf & 2) {
    const angle_r2 = ctx.$implicit;
    \u0275\u0275attribute("transform", "rotate(" + angle_r2 + ")");
  }
}
function SolarTimeDialComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g", 32);
    \u0275\u0275domElement(1, "rect", 33);
    \u0275\u0275domElementStart(2, "text", 34);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.clock());
  }
}
var dialCount = 0;
var viewWidth = 960;
var viewHeight = 160;
var centerX = 480;
var horizonY = 128;
var arcX = 420;
var arcY = 108;
var earthRadius = 3e3;
var landBases = Array.from({ length: 12 }, (_, i) => -0.36 + i * 0.06);
var round = (value) => Math.round(value * 100) / 100;
var SolarTimeDialComponent = class _SolarTimeDialComponent {
  start = input(
    0,
    ...ngDevMode ? [{ debugName: "start" }] : (
      /* istanbul ignore next */
      []
    )
  );
  end = input(
    1440,
    ...ngDevMode ? [{ debugName: "end" }] : (
      /* istanbul ignore next */
      []
    )
  );
  minutes = input(
    720,
    ...ngDevMode ? [{ debugName: "minutes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  disabled = input(
    false,
    ...ngDevMode ? [{ debugName: "disabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  clock = input(
    "",
    ...ngDevMode ? [{ debugName: "clock" }] : (
      /* istanbul ignore next */
      []
    )
  );
  startLabel = input(
    "Sunrise",
    ...ngDevMode ? [{ debugName: "startLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  endLabel = input(
    "Sunset",
    ...ngDevMode ? [{ debugName: "endLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  changed = output();
  ids = (() => {
    const n = ++dialCount;
    return {
      dawn: `dial-dawn-${n}`,
      day: `dial-day-${n}`,
      glow: `dial-glow-${n}`,
      earth: `dial-earth-${n}`
    };
  })();
  rays = [0, 45, 90, 135, 180, 225, 270, 315];
  dragging = signal(
    false,
    ...ngDevMode ? [{ debugName: "dragging" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** The dragged time shows immediately while the lab catches up. */
  preview = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "preview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pending;
  frame = 0;
  value = computed(
    () => this.preview() ?? this.minutes(),
    ...ngDevMode ? [{ debugName: "value" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fraction = computed(
    () => {
      const span = this.end() - this.start();
      return span > 0 ? Math.min(1, Math.max(0, (this.value() - this.start()) / span)) : 0.5;
    },
    ...ngDevMode ? [{ debugName: "fraction" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sun = computed(
    () => {
      const angle = Math.PI * (1 - this.fraction());
      return {
        x: round(centerX + arcX * Math.cos(angle)),
        y: round(horizonY - arcY * Math.sin(angle))
      };
    },
    ...ngDevMode ? [{ debugName: "sun" }] : (
      /* istanbul ignore next */
      []
    )
  );
  skyDay = computed(
    () => Math.min(1, Math.sin(Math.PI * this.fraction()) * 1.6),
    ...ngDevMode ? [{ debugName: "skyDay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Earth's land drifts toward the east as the day passes; the Sun appears to cross the sky. */
  land = computed(
    () => {
      const shift = -this.fraction() * 0.24, r = earthRadius - 12;
      return landBases.map((base, id) => {
        const a = ((base + shift + 0.36) % 0.72 + 0.72) % 0.72 - 0.36;
        return {
          id,
          x: round(centerX + r * Math.sin(a)),
          y: round(horizonY + earthRadius - r * Math.cos(a)),
          rotate: round(a * 180 / Math.PI),
          rx: id % 2 ? 30 : 46,
          ry: id % 3 ? 7 : 9
        };
      });
    },
    ...ngDevMode ? [{ debugName: "land" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** The figure's shadow points away from the Sun and shrinks as the Sun climbs. */
  shadowEnd = computed(
    () => {
      const f = this.fraction(), elevation = Math.PI * Math.min(f, 1 - f), side = f < 0.5 ? 1 : -1;
      if (elevation < 0.02)
        return round(centerX + side * 160);
      return round(centerX + side * Math.min(160, 18 / Math.tan(elevation)));
    },
    ...ngDevMode ? [{ debugName: "shadowEnd" }] : (
      /* istanbul ignore next */
      []
    )
  );
  down(event) {
    if (this.disabled())
      return;
    event.preventDefault();
    try {
      event.currentTarget.setPointerCapture?.(event.pointerId);
    } catch {
    }
    this.dragging.set(true);
    this.emit(this.pointerMinutes(event), true);
  }
  move(event) {
    if (this.dragging() && !this.disabled())
      this.emit(this.pointerMinutes(event), false);
  }
  up(event) {
    if (!this.dragging())
      return;
    this.dragging.set(false);
    try {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    } catch {
    }
    this.flush();
    this.preview.set(void 0);
  }
  key(event) {
    if (this.disabled())
      return;
    const steps = {
      ArrowLeft: -5,
      ArrowDown: -5,
      ArrowRight: 5,
      ArrowUp: 5,
      PageDown: -60,
      PageUp: 60
    };
    let next;
    if (event.key in steps)
      next = this.minutes() + steps[event.key];
    if (event.key === "Home")
      next = this.start();
    if (event.key === "End")
      next = this.end();
    if (next === void 0)
      return;
    event.preventDefault();
    this.emit(next, true);
    this.preview.set(void 0);
  }
  pointerMinutes(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height)
      return this.value();
    const x = (event.clientX - rect.left) / rect.width * viewWidth;
    const y = (event.clientY - rect.top) / rect.height * viewHeight;
    const angle = Math.atan2((horizonY - y) / arcY, (x - centerX) / arcX);
    const onArc = angle < 0 ? x < centerX ? Math.PI : 0 : angle;
    return this.start() + (1 - onArc / Math.PI) * (this.end() - this.start());
  }
  emit(minutes, immediate) {
    const value = Math.min(this.end(), Math.max(this.start(), minutes));
    this.preview.set(value);
    this.pending = value;
    if (immediate || typeof requestAnimationFrame !== "function") {
      this.flush();
      return;
    }
    if (!this.frame)
      this.frame = requestAnimationFrame(() => this.flush());
  }
  flush() {
    if (this.frame && typeof cancelAnimationFrame === "function")
      cancelAnimationFrame(this.frame);
    this.frame = 0;
    const value = this.pending;
    this.pending = void 0;
    if (value !== void 0 && Math.abs(value - this.minutes()) > 1e-6)
      this.changed.emit(value);
  }
  static \u0275fac = function SolarTimeDialComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SolarTimeDialComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SolarTimeDialComponent, selectors: [["app-solar-time-dial"]], inputs: { start: [1, "start"], end: [1, "end"], minutes: [1, "minutes"], disabled: [1, "disabled"], clock: [1, "clock"], startLabel: [1, "startLabel"], endLabel: [1, "endLabel"] }, outputs: { changed: "changed" }, decls: 47, vars: 21, consts: [["viewBox", "0 0 960 160", "role", "slider", "tabindex", "0", "aria-label", "Time of day. Drag the Sun across the sky.", 3, "pointerdown", "pointermove", "pointerup", "pointercancel", "keydown"], ["x1", "0", "y1", "0", "x2", "0", "y2", "1"], ["offset", "0", "stop-color", "#5d6fa8"], ["offset", "1", "stop-color", "#f6ad6b"], ["offset", "0", "stop-color", "#4fa9e8"], ["offset", "1", "stop-color", "#bfe8fb"], ["offset", "0", "stop-color", "#fff3b0", "stop-opacity", ".9"], ["offset", "1", "stop-color", "#ffd23f", "stop-opacity", "0"], ["cx", "480", "cy", "3128", "r", "3000"], ["width", "960", "height", "160", "rx", "14"], ["d", "M 60 128 A 420 108 0 0 1 900 128", "fill", "none", "stroke", "#fff6c9", "stroke-width", "2.5", "stroke-dasharray", "6 7"], ["cx", "480", "cy", "3128", "r", "3000", "fill", "#2f7fbf"], ["cx", "480", "cy", "3128", "r", "3000", "fill", "none", "stroke", "#1d5f93", "stroke-width", "3"], ["d", "M 600 153 Q 572 143 546 150", "fill", "none", "stroke", "#fff", "stroke-width", "2.5", "stroke-linecap", "round"], ["d", "M 554 144 L 546 150 L 555 155", "fill", "none", "stroke", "#fff", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "480", "y1", "128", "y2", "128", "stroke", "#1f2a33", "stroke-width", "4", "stroke-linecap", "round", "opacity", ".55"], ["transform", "translate(480 128)"], ["x1", "0", "y1", "0", "x2", "0", "y2", "-12", "stroke", "#3b2f1a", "stroke-width", "3", "stroke-linecap", "round"], ["x1", "-5", "y1", "-7", "x2", "5", "y2", "-7", "stroke", "#3b2f1a", "stroke-width", "2.5", "stroke-linecap", "round"], ["cx", "0", "cy", "-16", "r", "3.8", "fill", "#3b2f1a"], [1, "labels"], ["x", "40", "y", "124", "text-anchor", "middle"], ["x", "920", "y", "124", "text-anchor", "middle"], ["x", "16", "y", "20"], ["x", "944", "y", "20", "text-anchor", "end"], ["r", "34"], [1, "rays"], ["x1", "0", "y1", "-21", "x2", "0", "y2", "-29", "stroke", "#ffb703", "stroke-width", "3.5", "stroke-linecap", "round"], ["r", "16", "fill", "#ffd23f", "stroke", "#f59f00", "stroke-width", "2.5"], ["cx", "-5", "cy", "-3", "r", "1.9", "fill", "#7a4b00"], ["cx", "5", "cy", "-3", "r", "1.9", "fill", "#7a4b00"], ["d", "M -6 4 Q 0 9 6 4", "fill", "none", "stroke", "#7a4b00", "stroke-width", "1.8", "stroke-linecap", "round"], [1, "clock"], ["x", "410", "y", "136", "width", "140", "height", "21", "rx", "10.5", "fill", "#1d3b53", "opacity", ".78"], ["x", "480", "y", "151", "text-anchor", "middle"]], template: function SolarTimeDialComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0);
      \u0275\u0275domListener("pointerdown", function SolarTimeDialComponent_Template_svg_pointerdown_0_listener($event) {
        return ctx.down($event);
      })("pointermove", function SolarTimeDialComponent_Template_svg_pointermove_0_listener($event) {
        return ctx.move($event);
      })("pointerup", function SolarTimeDialComponent_Template_svg_pointerup_0_listener($event) {
        return ctx.up($event);
      })("pointercancel", function SolarTimeDialComponent_Template_svg_pointercancel_0_listener($event) {
        return ctx.up($event);
      })("keydown", function SolarTimeDialComponent_Template_svg_keydown_0_listener($event) {
        return ctx.key($event);
      });
      \u0275\u0275domElementStart(1, "defs")(2, "linearGradient", 1);
      \u0275\u0275domElement(3, "stop", 2)(4, "stop", 3);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "linearGradient", 1);
      \u0275\u0275domElement(6, "stop", 4)(7, "stop", 5);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "radialGradient");
      \u0275\u0275domElement(9, "stop", 6)(10, "stop", 7);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(11, "clipPath");
      \u0275\u0275domElement(12, "circle", 8);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElement(13, "rect", 9)(14, "rect", 9)(15, "path", 10);
      \u0275\u0275domElementStart(16, "g");
      \u0275\u0275domElement(17, "circle", 11);
      \u0275\u0275repeaterCreate(18, SolarTimeDialComponent_For_19_Template, 1, 6, ":svg:ellipse", null, _forTrack0);
      \u0275\u0275domElement(20, "circle", 12);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElement(21, "path", 13)(22, "path", 14)(23, "line", 15);
      \u0275\u0275domElementStart(24, "g", 16);
      \u0275\u0275domElement(25, "line", 17)(26, "line", 18)(27, "circle", 19);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(28, "g", 20)(29, "text", 21);
      \u0275\u0275text(30, "E");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(31, "text", 22);
      \u0275\u0275text(32, "W");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(33, "text", 23);
      \u0275\u0275text(34);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(35, "text", 24);
      \u0275\u0275text(36);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(37, "g");
      \u0275\u0275domElement(38, "circle", 25);
      \u0275\u0275domElementStart(39, "g", 26);
      \u0275\u0275repeaterCreate(40, SolarTimeDialComponent_For_41_Template, 1, 1, ":svg:line", 27, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElement(42, "circle", 28)(43, "circle", 29)(44, "circle", 30)(45, "path", 31);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(46, SolarTimeDialComponent_Conditional_46_Template, 4, 1, ":svg:g", 32);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("dragging", ctx.dragging());
      \u0275\u0275attribute("aria-valuemin", ctx.start())("aria-valuemax", ctx.end())("aria-valuenow", ctx.value())("aria-valuetext", ctx.clock() || null)("aria-disabled", ctx.disabled());
      \u0275\u0275advance(2);
      \u0275\u0275attribute("id", ctx.ids.dawn);
      \u0275\u0275advance(3);
      \u0275\u0275attribute("id", ctx.ids.day);
      \u0275\u0275advance(3);
      \u0275\u0275attribute("id", ctx.ids.glow);
      \u0275\u0275advance(3);
      \u0275\u0275attribute("id", ctx.ids.earth);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("fill", "url(#" + ctx.ids.dawn + ")");
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", "url(#" + ctx.ids.day + ")")("opacity", ctx.skyDay());
      \u0275\u0275advance(2);
      \u0275\u0275attribute("clip-path", "url(#" + ctx.ids.earth + ")");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.land());
      \u0275\u0275advance(5);
      \u0275\u0275attribute("x2", ctx.shadowEnd());
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate(ctx.startLabel());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.endLabel());
      \u0275\u0275advance();
      \u0275\u0275attribute("transform", "translate(" + ctx.sun().x + " " + ctx.sun().y + ")");
      \u0275\u0275advance();
      \u0275\u0275attribute("fill", "url(#" + ctx.ids.glow + ")");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.rays);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.clock() ? 46 : -1);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\nsvg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: auto;\n  touch-action: none;\n  cursor: grab;\n  border-radius: 14px;\n  -webkit-user-select: none;\n  user-select: none;\n}\nsvg.dragging[_ngcontent-%COMP%] {\n  cursor: grabbing;\n}\nsvg[aria-disabled=true][_ngcontent-%COMP%] {\n  cursor: default;\n  opacity: 0.6;\n}\nsvg[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #ba761f;\n  outline-offset: 2px;\n}\n.rays[_ngcontent-%COMP%] {\n  transform-box: fill-box;\n  transform-origin: center;\n  animation: _ngcontent-%COMP%_sun-spin 14s linear infinite;\n}\n.labels[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  font: 700 13px system-ui, sans-serif;\n  fill: #22303b;\n}\n.clock[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  font: 700 13px system-ui, sans-serif;\n  fill: #fff;\n}\n@keyframes _ngcontent-%COMP%_sun-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .rays[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=solar-time-dial.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SolarTimeDialComponent, [{
    type: Component,
    args: [{ selector: "app-solar-time-dial", template: `<svg
    viewBox="0 0 960 160"
    role="slider"
    tabindex="0"
    aria-label="Time of day. Drag the Sun across the sky."
    [attr.aria-valuemin]="start()"
    [attr.aria-valuemax]="end()"
    [attr.aria-valuenow]="value()"
    [attr.aria-valuetext]="clock() || null"
    [attr.aria-disabled]="disabled()"
    [class.dragging]="dragging()"
    (pointerdown)="down($event)"
    (pointermove)="move($event)"
    (pointerup)="up($event)"
    (pointercancel)="up($event)"
    (keydown)="key($event)"
  >
    <defs>
      <linearGradient [attr.id]="ids.dawn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5d6fa8" />
        <stop offset="1" stop-color="#f6ad6b" />
      </linearGradient>
      <linearGradient [attr.id]="ids.day" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4fa9e8" />
        <stop offset="1" stop-color="#bfe8fb" />
      </linearGradient>
      <radialGradient [attr.id]="ids.glow">
        <stop offset="0" stop-color="#fff3b0" stop-opacity=".9" />
        <stop offset="1" stop-color="#ffd23f" stop-opacity="0" />
      </radialGradient>
      <clipPath [attr.id]="ids.earth">
        <circle cx="480" cy="3128" r="3000" />
      </clipPath>
    </defs>
    <rect width="960" height="160" rx="14" [attr.fill]="'url(#' + ids.dawn + ')'" />
    <rect
      width="960"
      height="160"
      rx="14"
      [attr.fill]="'url(#' + ids.day + ')'"
      [attr.opacity]="skyDay()"
    />
    <path
      d="M 60 128 A 420 108 0 0 1 900 128"
      fill="none"
      stroke="#fff6c9"
      stroke-width="2.5"
      stroke-dasharray="6 7"
    />
    <g [attr.clip-path]="'url(#' + ids.earth + ')'">
      <circle cx="480" cy="3128" r="3000" fill="#2f7fbf" />
      @for (blob of land(); track blob.id) {
        <ellipse
          [attr.cx]="blob.x"
          [attr.cy]="blob.y"
          [attr.rx]="blob.rx"
          [attr.ry]="blob.ry"
          [attr.transform]="'rotate(' + blob.rotate + ' ' + blob.x + ' ' + blob.y + ')'"
          [attr.fill]="blob.id % 2 ? '#6cc47a' : '#58b368'"
        />
      }
      <circle cx="480" cy="3128" r="3000" fill="none" stroke="#1d5f93" stroke-width="3" />
    </g>
    <path
      d="M 600 153 Q 572 143 546 150"
      fill="none"
      stroke="#fff"
      stroke-width="2.5"
      stroke-linecap="round"
    />
    <path
      d="M 554 144 L 546 150 L 555 155"
      fill="none"
      stroke="#fff"
      stroke-width="2.5"
      stroke-linecap="round"
    />
    <line
      x1="480"
      y1="128"
      [attr.x2]="shadowEnd()"
      y2="128"
      stroke="#1f2a33"
      stroke-width="4"
      stroke-linecap="round"
      opacity=".55"
    />
    <g transform="translate(480 128)">
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="-12"
        stroke="#3b2f1a"
        stroke-width="3"
        stroke-linecap="round"
      />
      <line
        x1="-5"
        y1="-7"
        x2="5"
        y2="-7"
        stroke="#3b2f1a"
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <circle cx="0" cy="-16" r="3.8" fill="#3b2f1a" />
    </g>
    <g class="labels">
      <text x="40" y="124" text-anchor="middle">E</text>
      <text x="920" y="124" text-anchor="middle">W</text>
      <text x="16" y="20">{{ startLabel() }}</text>
      <text x="944" y="20" text-anchor="end">{{ endLabel() }}</text>
    </g>
    <g [attr.transform]="'translate(' + sun().x + ' ' + sun().y + ')'">
      <circle r="34" [attr.fill]="'url(#' + ids.glow + ')'" />
      <g class="rays">
        @for (angle of rays; track angle) {
          <line
            x1="0"
            y1="-21"
            x2="0"
            y2="-29"
            stroke="#ffb703"
            stroke-width="3.5"
            stroke-linecap="round"
            [attr.transform]="'rotate(' + angle + ')'"
          />
        }
      </g>
      <circle r="16" fill="#ffd23f" stroke="#f59f00" stroke-width="2.5" />
      <circle cx="-5" cy="-3" r="1.9" fill="#7a4b00" />
      <circle cx="5" cy="-3" r="1.9" fill="#7a4b00" />
      <path
        d="M -6 4 Q 0 9 6 4"
        fill="none"
        stroke="#7a4b00"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </g>
    @if (clock()) {
      <g class="clock">
        <rect x="410" y="136" width="140" height="21" rx="10.5" fill="#1d3b53" opacity=".78" />
        <text x="480" y="151" text-anchor="middle">{{ clock() }}</text>
      </g>
    }
  </svg>`, styles: ["/* angular:styles/component:scss;a0dec1c558b57d2f074042133e52406eee6bcce93045638412932e8feae66af6;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/plugins/simulations/solar-monument/solar-time-dial.component.ts */\n:host {\n  display: block;\n  min-width: 0;\n}\nsvg {\n  display: block;\n  width: 100%;\n  height: auto;\n  touch-action: none;\n  cursor: grab;\n  border-radius: 14px;\n  -webkit-user-select: none;\n  user-select: none;\n}\nsvg.dragging {\n  cursor: grabbing;\n}\nsvg[aria-disabled=true] {\n  cursor: default;\n  opacity: 0.6;\n}\nsvg:focus-visible {\n  outline: 3px solid #ba761f;\n  outline-offset: 2px;\n}\n.rays {\n  transform-box: fill-box;\n  transform-origin: center;\n  animation: sun-spin 14s linear infinite;\n}\n.labels text {\n  font: 700 13px system-ui, sans-serif;\n  fill: #22303b;\n}\n.clock text {\n  font: 700 13px system-ui, sans-serif;\n  fill: #fff;\n}\n@keyframes sun-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .rays {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=solar-time-dial.component.css.map */\n"] }]
  }], null, { start: [{ type: Input, args: [{ isSignal: true, alias: "start", required: false }] }], end: [{ type: Input, args: [{ isSignal: true, alias: "end", required: false }] }], minutes: [{ type: Input, args: [{ isSignal: true, alias: "minutes", required: false }] }], disabled: [{ type: Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], clock: [{ type: Input, args: [{ isSignal: true, alias: "clock", required: false }] }], startLabel: [{ type: Input, args: [{ isSignal: true, alias: "startLabel", required: false }] }], endLabel: [{ type: Input, args: [{ isSignal: true, alias: "endLabel", required: false }] }], changed: [{ type: Output, args: ["changed"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SolarTimeDialComponent, { className: "SolarTimeDialComponent", filePath: "src/app/plugins/simulations/solar-monument/solar-time-dial.component.ts", lineNumber: 223 });
})();

// src/app/plugins/simulations/solar-monument/solar-marker-record.ts
var markerLights = [
  "shadow",
  "sunlight",
  "red light",
  "amber light",
  "green light",
  "blue light",
  "violet light",
  "mixed filters"
];
function solarMarkerRecord(target) {
  const s = target?.settings;
  if (!s || ![
    "calendar-observation",
    "calendar-march",
    "calendar-june",
    "calendar-sept",
    "calendar-dec"
  ].includes(String(s["markerKind"])))
    return;
  if (typeof s["utcInstant"] !== "string" || !/^20(2[5-9]|30)-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(s["utcInstant"]) || !Number.isFinite(Date.parse(s["utcInstant"])) || new Date(s["utcInstant"]).toISOString() !== s["utcInstant"] || typeof s["zone"] !== "string")
    return;
  const bounds = [
    ["latitude", -89.9, 89.9],
    ["longitude", -180, 180],
    ["sunAltitude", 1e-6, 90],
    ["sunAzimuth", 0, 359.999999]
  ];
  if (bounds.some(
    ([key, min, max]) => typeof s[key] !== "number" || !Number.isFinite(s[key]) || Number(s[key]) < min || Number(s[key]) > max
  ) || !markerLights.includes(String(s["light"])))
    return;
  try {
    new Intl.DateTimeFormat("en", { timeZone: s["zone"] }).format(new Date(s["utcInstant"]));
  } catch {
    return;
  }
  return s;
}
function markerClock(record) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: record.zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(new Date(record.utcInstant));
  const value = (type) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return value("hour") * 60 + value("minute") + value("second") / 60 + new Date(record.utcInstant).getUTCMilliseconds() / 6e4;
}

// src/app/plugins/simulations/solar-monument/solar-monument.component.ts
var _c0 = ["toolbar"];
var _c1 = ["guide"];
var _c2 = ["pictureClose"];
var _c3 = ["markerPanel"];
var _c4 = ["markerNameInput"];
var _c5 = ["frame"];
var _c6 = () => ["sundial-build", "sundial-seasons"];
var _forTrack02 = ($index, $item) => $item.id;
function SolarMonumentComponent_ng_template_0_Conditional_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, SolarMonumentComponent_ng_template_0_Conditional_0_ng_container_0_Template, 1, 0, "ng-container", 18);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const weeklyToolbar_r1 = \u0275\u0275reference(3);
    \u0275\u0275property("ngTemplateOutlet", weeklyToolbar_r1);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_1_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.command("targetView"));
    });
    \u0275\u0275text(1, "Inspect pillar");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", !ctx_r2.ready());
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.event("june"));
    });
    \u0275\u0275text(1, " June solstice ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_1_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.event("dec"));
    });
    \u0275\u0275text(3, " December solstice ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_1_Conditional_4_Template, 2, 1, "button", 20);
    \u0275\u0275elementStart(5, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.command("shadowView"));
    });
    \u0275\u0275text(6, "View whole model");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.reviewOpen.set(!ctx_r2.reviewOpen()));
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "output", 22);
    \u0275\u0275text(10);
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", !ctx_r2.ready() || ctx_r2.reviewing());
    \u0275\u0275attribute("aria-pressed", ctx_r2.selected() === 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r2.ready() || ctx_r2.reviewing());
    \u0275\u0275attribute("aria-pressed", ctx_r2.selected() === 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.surfaceTargets().length ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.ready());
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-expanded", ctx_r2.reviewOpen());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Compare ", ctx_r2.matches(), "/4 ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.ui().date, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.ui().clock);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "details", 25, 5)(2, "summary");
    \u0275\u0275text(3, "Build");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 26)(5, "label");
    \u0275\u0275text(6, "Post height (cm)");
    \u0275\u0275element(7, "input", 29, 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_2_Conditional_0_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r6);
      const postMenu_r7 = \u0275\u0275reference(1);
      const post_r8 = \u0275\u0275reference(8);
      const ctx_r2 = \u0275\u0275nextContext(5);
      ctx_r2.command("post", +post_r8.value);
      return \u0275\u0275resetView(postMenu_r7.open = false);
    });
    \u0275\u0275text(10, " Build sundial ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r2.ui().height);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_2_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.chooseMode("build"));
    });
    \u0275\u0275text(1, " Build ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275classProp("current", ctx_r2.ui().mode === "build");
    \u0275\u0275property("disabled", !ctx_r2.ready());
    \u0275\u0275attribute("aria-pressed", ctx_r2.ui().mode === "build");
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_2_Conditional_0_Template, 11, 1, "details", 25)(1, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_2_Conditional_1_Template, 2, 4, "button", 28);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275conditional(ctx_r2.activity() === "sundial-build" ? 0 : !ctx_r2.activity().startsWith("sundial-") ? 1 : -1);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_9_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.command("morningLight"));
    });
    \u0275\u0275text(1, " Morning light ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275property("disabled", !ctx_r2.ready());
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_9_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.command("targetView"));
    });
    \u0275\u0275text(1, "Inspect pillar");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275property("disabled", !ctx_r2.ready());
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_9_Conditional_0_Template, 2, 1, "button", 30);
    \u0275\u0275elementStart(1, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_9_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.command("alignmentToggle"));
    });
    \u0275\u0275text(2, "Ray guide");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_9_Conditional_3_Template, 2, 1, "button", 20);
    \u0275\u0275elementStart(4, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_9_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.toggleMarkers());
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275conditional(!ctx_r2.presentation() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.ready());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.surfaceTargets().length ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.ready());
    \u0275\u0275attribute("aria-expanded", ctx_r2.markersOpen());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2316 Markers \xB7 ", ctx_r2.design().targets.length, " ");
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_10_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.command("markDial"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275property("disabled", !ctx_r2.ready());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.activity() === "sundial-calendar" ? "Mark date" : "Mark time", " ");
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.command("playBtn"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_10_Conditional_2_Template, 2, 2, "button", 20);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", !ctx_r2.ready() || !ctx_r2.ui().canPlay);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.ui().play, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.readOnly() && (ctx_r2.activity() === "sundial-build" || ctx_r2.activity() === "sundial-calendar") ? 2 : -1);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1, "Events & time");
    \u0275\u0275elementEnd();
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Conditional_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r16 = ctx.$implicit;
    \u0275\u0275property("value", item_r16.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r16.label);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Conditional_2_For_1_Template, 2, 2, "option", 37, _forTrack02);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275repeater(ctx_r2.cases);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Conditional_3_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "optgroup", 35)(1, "option", 44);
    \u0275\u0275text(2, "A week before");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "option", 45);
    \u0275\u0275text(4, "A week after");
    \u0275\u0275elementEnd()();
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "optgroup", 38)(1, "option", 39);
    \u0275\u0275text(2, "Sunrise");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "option", 40);
    \u0275\u0275text(4, "9 AM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 41);
    \u0275\u0275text(6, "Solar noon");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 42);
    \u0275\u0275text(8, "3 PM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 43);
    \u0275\u0275text(10, "Sunset");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Conditional_3_Conditional_11_Template, 5, 0, "optgroup", 35);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(11);
    \u0275\u0275conditional(ctx_r2.activity() === "sundial-calendar" ? 11 : -1);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "optgroup", 35)(1, "option", 46);
    \u0275\u0275text(2, "A week before");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "option", 47);
    \u0275\u0275text(4, "Back to special date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 48);
    \u0275\u0275text(6, "A week after");
    \u0275\u0275elementEnd()();
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 33);
    \u0275\u0275listener("ngModelChange", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.event($event));
    });
    \u0275\u0275conditionalCreate(1, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Conditional_1_Template, 2, 0, "option", 34);
    \u0275\u0275conditionalCreate(2, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Conditional_2_Template, 2, 0);
    \u0275\u0275conditionalCreate(3, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Conditional_3_Template, 12, 1);
    \u0275\u0275conditionalCreate(4, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Conditional_4_Template, 7, 0, "optgroup", 35);
    \u0275\u0275elementStart(5, "option", 36);
    \u0275\u0275text(6, "Place & date\u2026");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", !ctx_r2.ready())("ngModel", ctx_r2.eventSelection());
    \u0275\u0275attribute("aria-label", ctx_r2.presentation() ? "Special date" : "Sun events");
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.presentation() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activity() !== "sundial-build" || ctx_r2.ui().centerView ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.presentation() && !ctx_r2.ui().centerView ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.presentation() ? 4 : -1);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.event("june"));
    });
    \u0275\u0275text(1, " June solstice ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_16_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.event("dec"));
    });
    \u0275\u0275text(3, " December solstice ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", !ctx_r2.ready() || ctx_r2.reviewing());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r2.ready() || ctx_r2.reviewing());
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_17_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_17_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.recordReview());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275property("disabled", !ctx_r2.configured() || ctx_r2.recorded() || ctx_r2.reviewing());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.recorded() ? "Saved" : "Save comparison", " ");
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.reviewOpen.set(!ctx_r2.reviewOpen()));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_17_Conditional_2_Template, 2, 2, "button", 20);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275attribute("aria-expanded", ctx_r2.reviewOpen());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Compare ", ctx_r2.matches(), "/4 ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.readOnly() ? 2 : -1);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.capture());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", !ctx_r2.ready() || ctx_r2.busy() || !ctx_r2.design().blocks.length && !ctx_r2.design().displayObject);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.busy() ? "Saving\u2026" : "Save test", " ");
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_30_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_30_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      \u0275\u0275nextContext(2);
      const viewMenu_r21 = \u0275\u0275reference(20);
      const ctx_r2 = \u0275\u0275nextContext(3);
      ctx_r2.command("undoDial");
      return \u0275\u0275resetView(viewMenu_r21.open = false);
    });
    \u0275\u0275text(1, " Remove last mark ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275property("disabled", ctx_r2.readOnly() || !ctx_r2.ui().canUndo);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_30_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r22);
      \u0275\u0275nextContext();
      const viewMenu_r21 = \u0275\u0275reference(20);
      const ctx_r2 = \u0275\u0275nextContext(3);
      ctx_r2.command("returnDial");
      return \u0275\u0275resetView(viewMenu_r21.open = false);
    });
    \u0275\u0275text(1, " Return to marking day ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_30_Conditional_2_Template, 2, 1, "button", 20);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", !ctx_r2.ui().canReturn);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.activity() === "sundial-build" || ctx_r2.activity() === "sundial-calendar" ? 2 : -1);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Playback speed");
    \u0275\u0275elementStart(2, "select", 49);
    \u0275\u0275listener("change", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_31_Template_select_change_2_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.command("speed", $event.target.value));
    });
    \u0275\u0275elementStart(3, "option", 50);
    \u0275\u0275text(4, "Slow");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 51);
    \u0275\u0275text(6, "Normal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 52);
    \u0275\u0275text(8, "Fast");
    \u0275\u0275elementEnd()()();
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_32_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r25);
      \u0275\u0275nextContext();
      const viewMenu_r21 = \u0275\u0275reference(20);
      const ctx_r2 = \u0275\u0275nextContext(3);
      ctx_r2.runReview();
      return \u0275\u0275resetView(viewMenu_r21.open = false);
    });
    \u0275\u0275text(1, " Recheck four dates ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", !ctx_r2.ready() || ctx_r2.reviewing());
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-solar-time-dial", 53);
    \u0275\u0275listener("changed", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_33_Template_app_solar_time_dial_changed_0_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.command("minutes", $event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("start", ctx_r2.ui().start)("end", ctx_r2.ui().end)("minutes", ctx_r2.ui().minutes)("clock", ctx_r2.ui().clock)("startLabel", ctx_r2.ui().startLabel)("endLabel", ctx_r2.ui().endLabel)("disabled", !ctx_r2.ready() || !ctx_r2.ui().canPlay);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.chooseMode("explore"));
    });
    \u0275\u0275text(1, " Explore Earth ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_2_Template, 2, 1);
    \u0275\u0275elementStart(3, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.chooseMode("test"));
    });
    \u0275\u0275text(4, " Test sunlight ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Template_button_click_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.toggleSunDay($event));
    });
    \u0275\u0275text(6, " Sunrise & sunset ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Template_button_click_7_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.toggleCenterView($event));
    });
    \u0275\u0275text(8, " From center ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_9_Template, 6, 6);
    \u0275\u0275conditionalCreate(10, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_10_Template, 3, 3);
    \u0275\u0275conditionalCreate(11, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_11_Template, 7, 7, "select", 23);
    \u0275\u0275elementStart(12, "output", 24);
    \u0275\u0275text(13);
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(16, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_16_Template, 4, 2);
    \u0275\u0275conditionalCreate(17, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_17_Template, 3, 3)(18, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_18_Template, 2, 2, "button", 20);
    \u0275\u0275elementStart(19, "details", 25, 4)(21, "summary");
    \u0275\u0275text(22, "Tools");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 26)(24, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r5);
      const viewMenu_r21 = \u0275\u0275reference(20);
      const ctx_r2 = \u0275\u0275nextContext(3);
      ctx_r2.command("shadowView");
      return \u0275\u0275resetView(viewMenu_r21.open = false);
    });
    \u0275\u0275text(25, "See shadows");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r5);
      const viewMenu_r21 = \u0275\u0275reference(20);
      const ctx_r2 = \u0275\u0275nextContext(3);
      ctx_r2.command("topView");
      return \u0275\u0275resetView(viewMenu_r21.open = false);
    });
    \u0275\u0275text(27, "View from above");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r5);
      const viewMenu_r21 = \u0275\u0275reference(20);
      const ctx_r2 = \u0275\u0275nextContext(3);
      ctx_r2.command("fitView");
      return \u0275\u0275resetView(viewMenu_r21.open = false);
    });
    \u0275\u0275text(29, "Fit model");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(30, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_30_Template, 3, 2);
    \u0275\u0275conditionalCreate(31, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_31_Template, 9, 0, "label");
    \u0275\u0275conditionalCreate(32, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_32_Template, 2, 1, "button", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(33, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Conditional_33_Template, 1, 7, "app-solar-time-dial", 27);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("current", ctx_r2.ui().mode === "explore");
    \u0275\u0275property("disabled", !ctx_r2.ready() || ctx_r2.busy() || ctx_r2.reviewing());
    \u0275\u0275attribute("aria-pressed", ctx_r2.ui().mode === "explore");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.presentation() && !ctx_r2.readOnly() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("current", ctx_r2.ui().mode === "test");
    \u0275\u0275property("disabled", !ctx_r2.ready());
    \u0275\u0275attribute("aria-pressed", ctx_r2.ui().mode === "test");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("current", ctx_r2.ui().sunDay);
    \u0275\u0275property("disabled", !ctx_r2.ready());
    \u0275\u0275attribute("aria-expanded", ctx_r2.ui().sunDay);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("current", ctx_r2.ui().centerView);
    \u0275\u0275property("disabled", !ctx_r2.ready() || ctx_r2.busy() || ctx_r2.reviewing());
    \u0275\u0275attribute("aria-pressed", ctx_r2.ui().centerView);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.activity().startsWith("sundial-") && !ctx_r2.ui().centerView && ctx_r2.ui().mode === "test" ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.presentation() && !ctx_r2.ui().centerView && ctx_r2.ui().mode === "test" ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.ui().mode !== "explore" ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.ui().date, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.ui().clock);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.presentation() && ctx_r2.ui().mode === "test" ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.presentation() && !ctx_r2.ui().centerView && ctx_r2.ui().mode === "test" ? 17 : !ctx_r2.readOnly() && !ctx_r2.ui().centerView && ctx_r2.ui().mode === "test" ? 18 : -1);
    \u0275\u0275advance(13);
    \u0275\u0275conditional(ctx_r2.activity().startsWith("sundial-") && !ctx_r2.ui().centerView ? 30 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.presentation() && !ctx_r2.ui().centerView ? 31 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.presentation() && !ctx_r2.ui().centerView ? 32 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.presentation() && !ctx_r2.ui().centerView && ctx_r2.ui().mode === "test" ? 33 : -1);
  }
}
function SolarMonumentComponent_ng_template_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275conditionalCreate(1, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_1_Template, 13, 10)(2, SolarMonumentComponent_ng_template_0_Conditional_1_Conditional_2_Template, 34, 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.presentation() && ctx_r2.readOnly() ? 1 : 2);
  }
}
function SolarMonumentComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, SolarMonumentComponent_ng_template_0_Conditional_0_Template, 1, 1, "ng-container")(1, SolarMonumentComponent_ng_template_0_Conditional_1_Template, 3, 1, "div", 17);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.weeklyControls() ? 0 : 1);
  }
}
function SolarMonumentComponent_ng_template_2_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "details", 25, 5)(2, "summary");
    \u0275\u0275text(3, "Post height");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 26)(5, "label");
    \u0275\u0275text(6, "Post height (cm)");
    \u0275\u0275element(7, "input", 58, 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_2_Conditional_2_Conditional_1_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r28);
      const postMenu_r29 = \u0275\u0275reference(1);
      const height_r30 = \u0275\u0275reference(8);
      const ctx_r2 = \u0275\u0275nextContext(3);
      ctx_r2.command("post", +height_r30.value);
      return \u0275\u0275resetView(postMenu_r29.open = false);
    });
    \u0275\u0275text(10, " Build sundial ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r2.ui().height);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r2.ready() || ctx_r2.ui().centerView);
  }
}
function SolarMonumentComponent_ng_template_2_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_2_Conditional_2_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.chooseMode(ctx_r2.ui().mode === "build" ? "test" : "build"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", !ctx_r2.ready());
    \u0275\u0275attribute("aria-pressed", ctx_r2.ui().mode === "build");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.ui().mode === "build" ? "Done editing" : "Edit build", " ");
  }
}
function SolarMonumentComponent_ng_template_2_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_2_Conditional_2_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.toggleMarkers());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", !ctx_r2.canMark());
    \u0275\u0275attribute("aria-expanded", ctx_r2.markersOpen());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Markers \xB7 ", ctx_r2.design().targets.length, " ");
  }
}
function SolarMonumentComponent_ng_template_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275conditionalCreate(1, SolarMonumentComponent_ng_template_2_Conditional_2_Conditional_1_Template, 11, 2, "details", 25);
    \u0275\u0275conditionalCreate(2, SolarMonumentComponent_ng_template_2_Conditional_2_Conditional_2_Template, 2, 3, "button", 20);
    \u0275\u0275conditionalCreate(3, SolarMonumentComponent_ng_template_2_Conditional_2_Conditional_3_Template, 2, 3, "button", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.questTools().includes("post") && ctx_r2.activity() === "sundial-build" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.questTools().includes("build") && !ctx_r2.activity().startsWith("sundial-") ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.questTools().includes("markers") && !ctx_r2.activity().startsWith("sundial-") ? 3 : -1);
  }
}
function SolarMonumentComponent_ng_template_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_2_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r34);
      \u0275\u0275nextContext();
      const more_r33 = \u0275\u0275reference(11);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.command("targetView");
      return \u0275\u0275resetView(more_r33.open = false);
    });
    \u0275\u0275text(1, "Inspect pillar");
    \u0275\u0275elementEnd();
  }
}
function SolarMonumentComponent_ng_template_2_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_2_Conditional_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.command("undoDial"));
    });
    \u0275\u0275text(1, " Remove last mark ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r2.ui().canUndo);
  }
}
function SolarMonumentComponent_ng_template_2_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Earth view has day/year options below. Play day returns to the monument\u2019s daily Sun.");
    \u0275\u0275elementEnd();
  }
}
function SolarMonumentComponent_ng_template_2_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Play the full day from the center, or use the sunrise offset below. Return to model to save a test.");
    \u0275\u0275elementEnd();
  }
}
function SolarMonumentComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54)(1, "app-solar-time-dial", 55);
    \u0275\u0275listener("changed", function SolarMonumentComponent_ng_template_2_Template_app_solar_time_dial_changed_1_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.command("minutes", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, SolarMonumentComponent_ng_template_2_Conditional_2_Template, 4, 3, "div", 56);
    \u0275\u0275elementStart(3, "div", 57)(4, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_2_Template_button_click_4_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSunDay($event));
    });
    \u0275\u0275text(5, " Sun path \xB7 sunrise & sunset ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_2_Template_button_click_6_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleCenterView($event));
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 19);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_2_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.chooseMode("explore"));
    });
    \u0275\u0275text(9, " Earth & Sun view ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "details", 25, 7)(12, "summary");
    \u0275\u0275text(13, "More tools");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 26)(15, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_2_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r27);
      const more_r33 = \u0275\u0275reference(11);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.command("morningLight");
      return \u0275\u0275resetView(more_r33.open = false);
    });
    \u0275\u0275text(16, " Morning light \xB7 sunrise +30 min ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_2_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r27);
      const more_r33 = \u0275\u0275reference(11);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.command("alignmentToggle");
      return \u0275\u0275resetView(more_r33.open = false);
    });
    \u0275\u0275text(18, "Ray guide");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(19, SolarMonumentComponent_ng_template_2_Conditional_19_Template, 2, 0, "button");
    \u0275\u0275elementStart(20, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_2_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r27);
      const more_r33 = \u0275\u0275reference(11);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.command("topView");
      return \u0275\u0275resetView(more_r33.open = false);
    });
    \u0275\u0275text(21, "View from above");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_2_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r27);
      const more_r33 = \u0275\u0275reference(11);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.command("fitView");
      return \u0275\u0275resetView(more_r33.open = false);
    });
    \u0275\u0275text(23, "Fit model");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, SolarMonumentComponent_ng_template_2_Conditional_24_Template, 2, 1, "button", 20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(25, SolarMonumentComponent_ng_template_2_Conditional_25_Template, 2, 0, "small");
    \u0275\u0275conditionalCreate(26, SolarMonumentComponent_ng_template_2_Conditional_26_Template, 2, 0, "small");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("start", ctx_r2.ui().start)("end", ctx_r2.ui().end)("minutes", ctx_r2.ui().minutes)("clock", ctx_r2.ui().clock)("startLabel", ctx_r2.ui().startLabel)("endLabel", ctx_r2.ui().endLabel)("disabled", !ctx_r2.ready() || !ctx_r2.ui().canPlay);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.questTools().length ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r2.ready());
    \u0275\u0275attribute("aria-expanded", ctx_r2.ui().sunDay);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r2.ready());
    \u0275\u0275attribute("aria-pressed", ctx_r2.ui().centerView);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.ui().centerView ? "Return to model" : "From center", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.ready());
    \u0275\u0275attribute("aria-pressed", ctx_r2.ui().mode === "explore");
    \u0275\u0275advance(11);
    \u0275\u0275conditional(ctx_r2.surfaceTargets().length ? 19 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.activity().startsWith("sundial-") ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.ui().mode === "explore" ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.ui().centerView ? 26 : -1);
  }
}
function SolarMonumentComponent_Conditional_4_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "figure");
    \u0275\u0275element(1, "img", 63);
    \u0275\u0275elementStart(2, "figcaption");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const picture_r37 = ctx.$implicit;
    const $index_r38 = ctx.$index;
    \u0275\u0275advance();
    \u0275\u0275property("src", picture_r37.src, \u0275\u0275sanitizeUrl)("alt", $index_r38 === 0 ? "The monument under June sunlight" : "The monument under December sunlight");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(picture_r37.caption);
  }
}
function SolarMonumentComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 59);
    \u0275\u0275listener("keydown.escape", function SolarMonumentComponent_Conditional_4_Template_section_keydown_escape_0_listener($event) {
      \u0275\u0275restoreView(_r36);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.closePictures();
      return \u0275\u0275resetView($event.stopPropagation());
    })("keydown.tab", function SolarMonumentComponent_Conditional_4_Template_section_keydown_tab_0_listener($event) {
      return $event.preventDefault();
    });
    \u0275\u0275elementStart(1, "header")(2, "div")(3, "small");
    \u0275\u0275text(4, "SAME DESIGN \xB7 SAME CAMERA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2", 60);
    \u0275\u0275text(6, "June & December");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 61, 9);
    \u0275\u0275listener("click", function SolarMonumentComponent_Conditional_4_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closePictures());
    });
    \u0275\u0275text(9, " \xD7 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 62);
    \u0275\u0275repeaterCreate(11, SolarMonumentComponent_Conditional_4_For_12_Template, 4, 3, "figure", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14, " Frozen previews from the current viewpoint. These pictures are separate from recorded tests. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.seasonPictures());
  }
}
function SolarMonumentComponent_Conditional_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function SolarMonumentComponent_Conditional_5_Conditional_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function SolarMonumentComponent_Conditional_5_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "aside", 65);
    \u0275\u0275template(1, SolarMonumentComponent_Conditional_5_Conditional_4_ng_container_1_Template, 1, 0, "ng-container", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const guide_r40 = \u0275\u0275reference(13);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", guide_r40);
  }
}
function SolarMonumentComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 64);
    \u0275\u0275template(1, SolarMonumentComponent_Conditional_5_ng_container_1_Template, 1, 0, "ng-container", 18);
    \u0275\u0275elementStart(2, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_Conditional_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r39);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toolsOpen.set(!ctx_r2.toolsOpen()));
    });
    \u0275\u0275text(3, " Guide ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(4, SolarMonumentComponent_Conditional_5_Conditional_4_Template, 2, 1, "aside", 65);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    const toolbar_r41 = \u0275\u0275reference(1);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", toolbar_r41);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r2.toolsOpen());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.toolsOpen() ? 4 : -1);
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_7_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Your court has 12 markers. Remove one to make space.");
    \u0275\u0275elementEnd();
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 75);
    \u0275\u0275text(1, " Click the floor, or use the canvas arrow keys and Enter. Shift makes smaller steps. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_Conditional_8_Conditional_7_Conditional_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r44);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cancelMarkerDraft());
    });
    \u0275\u0275text(3, "Cancel placing");
    \u0275\u0275elementEnd();
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Carve a ring around a light patch or shadow. Its arrow remembers where the Sun was.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 72);
    \u0275\u0275listener("click", function SolarMonumentComponent_Conditional_8_Conditional_7_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.startMarker());
    });
    \u0275\u0275text(3, " \u2316 Place on the floor ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, SolarMonumentComponent_Conditional_8_Conditional_7_Conditional_4_Template, 2, 0, "p");
    \u0275\u0275conditionalCreate(5, SolarMonumentComponent_Conditional_8_Conditional_7_Conditional_5_Template, 4, 0);
    \u0275\u0275elementStart(6, "details")(7, "summary");
    \u0275\u0275text(8, "Place by measurements");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 73)(10, "label");
    \u0275\u0275text(11, "East / west (cm)");
    \u0275\u0275elementStart(12, "input", 74);
    \u0275\u0275twoWayListener("ngModelChange", function SolarMonumentComponent_Conditional_8_Conditional_7_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r43);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.markerX, $event) || (ctx_r2.markerX = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "label");
    \u0275\u0275text(14, "South / north (cm)");
    \u0275\u0275elementStart(15, "input", 74);
    \u0275\u0275twoWayListener("ngModelChange", function SolarMonumentComponent_Conditional_8_Conditional_7_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r43);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.markerZ, $event) || (ctx_r2.markerZ = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "small");
    \u0275\u0275text(17, "Negative numbers mean west and north.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_Conditional_8_Conditional_7_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.measuredMarker());
    });
    \u0275\u0275text(19, "Preview this position");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.design().targets.length >= 12);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.design().targets.length >= 12 ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.markerPlacing() ? 5 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.markerX);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.markerZ);
    \u0275\u0275control();
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Stone name");
    \u0275\u0275elementStart(2, "input", 77, 11);
    \u0275\u0275twoWayListener("ngModelChange", function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_1_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r45);
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.markerName, $event) || (ctx_r2.markerName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_1_Template_input_change_2_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.renameMarker());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.markerName);
    \u0275\u0275control();
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const target_r46 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(target_r46.label);
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_3_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 79)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const record_r47 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Light here now: ", ctx_r2.markerNow());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.markerNow() === record_r47.light ? "Same light as your record." : "Different from your record. What changed?", " ");
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 78);
    \u0275\u0275text(1);
    \u0275\u0275element(2, "br");
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "dl")(6, "dt");
    \u0275\u0275text(7, "Recorded light");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "dd");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "dt");
    \u0275\u0275text(11, "Sun height");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "dd");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "dt");
    \u0275\u0275text(15, "Sun direction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "dd");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "dt");
    \u0275\u0275text(19, "Place");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "dd");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(22, SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_3_Conditional_22_Template, 5, 2, "p", 79);
  }
  if (rf & 2) {
    const record_r47 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.markerWhen(record_r47));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(record_r47.zone);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(record_r47.light);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", record_r47.sunAltitude.toFixed(1), "\xB0 above the horizon");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", record_r47.sunAzimuth.toFixed(1), "\xB0 clockwise from north");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", record_r47.latitude.toFixed(2), "\xB0, ", record_r47.longitude.toFixed(2), "\xB0");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.markerDraft() && ctx_r2.markerNow() ? 22 : -1);
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 75)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Light here now: ", ctx_r2.markerNow());
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_4_Conditional_2_Template, 3, 1, "p", 75);
  }
  if (rf & 2) {
    const target_r46 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" This is a fixed ", target_r46.y ? "surface" : "ground", " target without a saved Sun observation. ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.markerNow() ? 2 : -1);
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 76)(1, "button", 80);
    \u0275\u0275listener("click", function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_7_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r48);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.saveMarker());
    });
    \u0275\u0275text(2, "Carve marker");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_7_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r48);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cancelMarkerDraft());
    });
    \u0275\u0275text(4, "Discard");
    \u0275\u0275elementEnd()();
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_8_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.revisitMarker());
    });
    \u0275\u0275text(1, "\u21B6 Show recorded Sun");
    \u0275\u0275elementEnd();
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_8_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r50);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.useMarkerForTest());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Use for ", ctx.label);
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_8_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r51);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.removeMarker());
    });
    \u0275\u0275text(1, "Remove stone");
    \u0275\u0275elementEnd();
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76);
    \u0275\u0275conditionalCreate(1, SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_8_Conditional_1_Template, 2, 0, "button");
    \u0275\u0275conditionalCreate(2, SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_8_Conditional_2_Template, 2, 1, "button");
    \u0275\u0275conditionalCreate(3, SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_8_Conditional_3_Template, 2, 0, "button");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_10_0;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.markerRecord() && !ctx_r2.presentation() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_10_0 = ctx_r2.canMark() && ctx_r2.markerSeason()) ? 2 : -1, tmp_10_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canMark() ? 3 : -1);
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 68);
    \u0275\u0275conditionalCreate(1, SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_1_Template, 4, 1, "label")(2, SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_2_Template, 2, 1, "h3");
    \u0275\u0275conditionalCreate(3, SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_3_Template, 23, 8)(4, SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_4_Template, 3, 2);
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_7_Template, 5, 0, "div", 76)(8, SolarMonumentComponent_Conditional_8_Conditional_8_Conditional_8_Template, 4, 3, "div", 76);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_9_0;
    const target_r46 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canMark() ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_9_0 = ctx_r2.markerRecord()) ? 3 : 4, tmp_9_0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3("Target: ", (target_r46.x * 100).toFixed(1), " cm east, ", (target_r46.z * 100).toFixed(1), " cm south, ", ((target_r46.y ?? 0) * 100).toFixed(1), " cm high.");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.markerDraft() ? 7 : 8);
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 69);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.markerFeedback());
  }
}
function SolarMonumentComponent_Conditional_8_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_Conditional_8_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r52);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.undoMarker());
    });
    \u0275\u0275text(1, "Undo remove");
    \u0275\u0275elementEnd();
  }
}
function SolarMonumentComponent_Conditional_8_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_Conditional_8_For_13_Template_button_click_0_listener() {
      const target_r54 = \u0275\u0275restoreView(_r53).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectMarker(target_r54));
    });
    \u0275\u0275elementStart(1, "span", 81);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const target_r54 = ctx.$implicit;
    const \u0275$index_499_r55 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("current", ctx_r2.markerSelected() === target_r54.id && !ctx_r2.markerDraft());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_499_r55 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(target_r54.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.markerWhen(ctx_r2.recordFor(target_r54)));
  }
}
function SolarMonumentComponent_Conditional_8_ForEmpty_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Your first sunstone will appear here.");
    \u0275\u0275elementEnd();
  }
}
function SolarMonumentComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 66, 10);
    \u0275\u0275listener("keydown.escape", function SolarMonumentComponent_Conditional_8_Template_aside_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeMarkers());
    });
    \u0275\u0275elementStart(2, "header")(3, "h2");
    \u0275\u0275text(4, "Calendar sunstones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 67);
    \u0275\u0275listener("click", function SolarMonumentComponent_Conditional_8_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeMarkers());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, SolarMonumentComponent_Conditional_8_Conditional_7_Template, 20, 5);
    \u0275\u0275conditionalCreate(8, SolarMonumentComponent_Conditional_8_Conditional_8_Template, 9, 6, "section", 68);
    \u0275\u0275conditionalCreate(9, SolarMonumentComponent_Conditional_8_Conditional_9_Template, 2, 1, "p", 69);
    \u0275\u0275conditionalCreate(10, SolarMonumentComponent_Conditional_8_Conditional_10_Template, 2, 0, "button");
    \u0275\u0275elementStart(11, "div", 70);
    \u0275\u0275repeaterCreate(12, SolarMonumentComponent_Conditional_8_For_13_Template, 7, 5, "button", 71, _forTrack02, false, SolarMonumentComponent_Conditional_8_ForEmpty_14_Template, 2, 0, "p");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r2.canMark() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = ctx_r2.markerTarget()) ? 8 : -1, tmp_7_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.markerFeedback() ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.removedMarker() && ctx_r2.canMark() ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.design().targets);
  }
}
function SolarMonumentComponent_Conditional_9_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const target_r57 = ctx.$implicit;
    \u0275\u0275property("value", target_r57.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(target_r57.label);
  }
}
function SolarMonumentComponent_Conditional_9_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Return to building and open Markers to carve a seasonal target into the floor.");
    \u0275\u0275elementEnd();
  }
}
function SolarMonumentComponent_Conditional_9_Conditional_31_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r60 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Local clock time");
    \u0275\u0275elementStart(2, "input", 101);
    \u0275\u0275listener("change", function SolarMonumentComponent_Conditional_9_Conditional_31_Conditional_12_Template_input_change_2_listener($event) {
      \u0275\u0275restoreView(_r60);
      const check_r59 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.changeTime(check_r59.scenarioId, "clock", $event.target.value));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const check_r59 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.readOnly())("value", ctx_r2.clockFor(check_r59.scenarioId));
  }
}
function SolarMonumentComponent_Conditional_9_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 82)(1, "label");
    \u0275\u0275text(2, "When to test");
    \u0275\u0275elementStart(3, "select", 83);
    \u0275\u0275listener("ngModelChange", function SolarMonumentComponent_Conditional_9_Conditional_31_Template_select_ngModelChange_3_listener($event) {
      const check_r59 = \u0275\u0275restoreView(_r58);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.changeTime(check_r59.scenarioId, $event));
    });
    \u0275\u0275elementStart(4, "option", 97);
    \u0275\u0275text(5, "Solar noon \xB7 highest Sun");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 98);
    \u0275\u0275text(7, "30 minutes after sunrise");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "option", 99);
    \u0275\u0275text(9, "30 minutes before sunset");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "option", 100);
    \u0275\u0275text(11, "Choose a clock time");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, SolarMonumentComponent_Conditional_9_Conditional_31_Conditional_12_Template, 3, 2, "label");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const check_r59 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.readOnly())("ngModel", check_r59.settings?.["observationRule"] || "noon");
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275conditional(check_r59.settings?.["observationRule"] === "clock" ? 12 : -1);
  }
}
function SolarMonumentComponent_Conditional_9_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "Sculpture at this Sun angle:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.measurement(ctx_r2.current(), "Sculpture surface samples"), ". Samples describe face centres; compare the full illuminated surface in the canvas. ");
  }
}
function SolarMonumentComponent_Conditional_9_For_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r61 = ctx.$implicit;
    const \u0275$index_657_r62 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r2.selected() === \u0275$index_657_r62);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.cases[\u0275$index_657_r62].label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.measurement(result_r61, "Sun altitude"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.measurement(result_r61, "Observation"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.measurement(result_r61, "Height-only shadow reference"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.measurement(result_r61, "Target"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.measurement(result_r61, "Expected"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.measurement(result_r61, "Observed at target centre"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.resultLabel(result_r61));
  }
}
function SolarMonumentComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r56 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 15)(1, "div", 82)(2, "label");
    \u0275\u0275text(3, "Target for this date");
    \u0275\u0275elementStart(4, "select", 83);
    \u0275\u0275listener("ngModelChange", function SolarMonumentComponent_Conditional_9_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r56);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.changeCheck(ctx_r2.cases[ctx_r2.selected()].id, "targetId", $event));
    });
    \u0275\u0275elementStart(5, "option", 34);
    \u0275\u0275text(6, "Choose a ground target");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, SolarMonumentComponent_Conditional_9_For_8_Template, 2, 2, "option", 37, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "label");
    \u0275\u0275text(10, "What should happen?");
    \u0275\u0275elementStart(11, "select", 83);
    \u0275\u0275listener("ngModelChange", function SolarMonumentComponent_Conditional_9_Template_select_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r56);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.changeCheck(ctx_r2.cases[ctx_r2.selected()].id, "expectedValue", $event));
    });
    \u0275\u0275elementStart(12, "option", 84);
    \u0275\u0275text(13, "Target centre is in shadow");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 85);
    \u0275\u0275text(15, "Target centre receives sunlight");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 86);
    \u0275\u0275text(17, "Ruby red light reaches the target");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 87);
    \u0275\u0275text(19, "Amber light reaches the target");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 88);
    \u0275\u0275text(21, "Emerald green light reaches the target");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 89);
    \u0275\u0275text(23, "Sapphire blue light reaches the target");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 90);
    \u0275\u0275text(25, "Amethyst violet light reaches the target");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 91);
    \u0275\u0275text(27, "Light passes through multiple colors");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p", 92);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(30, SolarMonumentComponent_Conditional_9_Conditional_30_Template, 2, 0, "p");
    \u0275\u0275conditionalCreate(31, SolarMonumentComponent_Conditional_9_Conditional_31_Template, 13, 3, "div", 82);
    \u0275\u0275elementStart(32, "details", 93)(33, "summary");
    \u0275\u0275text(34, "Does it mark this date precisely?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p");
    \u0275\u0275text(36, " Use the same time rule a week before and after. If all three dates match, the monument marks a range of dates. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p");
    \u0275\u0275text(38, " One week before: ");
    \u0275\u0275elementStart(39, "strong");
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275text(41, ". One week after: ");
    \u0275\u0275elementStart(42, "strong");
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275text(44, ". ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(45, SolarMonumentComponent_Conditional_9_Conditional_45_Template, 4, 1, "p");
    \u0275\u0275elementStart(46, "div", 94)(47, "table")(48, "caption");
    \u0275\u0275text(49, " Compare the same monument at all four seasonal dates ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "thead")(51, "tr")(52, "th");
    \u0275\u0275text(53, "Special date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "th");
    \u0275\u0275text(55, "Sun altitude");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "th");
    \u0275\u0275text(57, "Observation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "th");
    \u0275\u0275text(59, "Shadow reference");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "th");
    \u0275\u0275text(61, "Target");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "th");
    \u0275\u0275text(63, "Expected");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "th");
    \u0275\u0275text(65, "Observed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "th");
    \u0275\u0275text(67, "Result");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(68, "tbody");
    \u0275\u0275repeaterCreate(69, SolarMonumentComponent_Conditional_9_For_70_Template, 17, 10, "tr", 95, _forTrack02);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(71, "div", 96)(72, "p");
    \u0275\u0275text(73);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_17_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("hidden", !ctx_r2.reviewOpen());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.readOnly())("ngModel", ctx_r2.checkFor(ctx_r2.cases[ctx_r2.selected()].id)?.targetId || "");
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.design().targets);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.readOnly())("ngModel", ctx_r2.checkFor(ctx_r2.cases[ctx_r2.selected()].id)?.expectedValue || "shadow");
    \u0275\u0275control();
    \u0275\u0275advance(17);
    \u0275\u0275classProp("met", ctx_r2.outcome() === "met")("missed", ctx_r2.outcome() === "missed");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.reviewing() ? "Calculating\u2026" : ctx_r2.resultLabel(ctx_r2.current()), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.design().targets.length ? 30 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_17_0 = ctx_r2.checkFor(ctx_r2.cases[ctx_r2.selected()].id)) ? 31 : -1, tmp_17_0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.measurement(ctx_r2.current(), "7 days before"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.measurement(ctx_r2.current(), "7 days after"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.design().displayObject ? 45 : -1);
    \u0275\u0275advance(24);
    \u0275\u0275repeater(ctx_r2.results());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.matches(), "/4 expectations match. A match tests the target centre; nearby-date tests show how precisely your monument marks the calendar. ");
  }
}
function SolarMonumentComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.status());
  }
}
function SolarMonumentComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.ui().message);
  }
}
function SolarMonumentComponent_ng_template_12_Conditional_2_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r65 = ctx.$implicit;
    \u0275\u0275property("value", item_r65.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r65.label);
  }
}
function SolarMonumentComponent_ng_template_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r64 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Compare another date ");
    \u0275\u0275elementStart(2, "select", 103);
    \u0275\u0275listener("ngModelChange", function SolarMonumentComponent_ng_template_12_Conditional_2_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r64);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.event($event));
    });
    \u0275\u0275repeaterCreate(3, SolarMonumentComponent_ng_template_12_Conditional_2_For_4_Template, 2, 2, "option", 37, _forTrack02);
    \u0275\u0275elementStart(5, "option", 46);
    \u0275\u0275text(6, "A week before");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 47);
    \u0275\u0275text(8, "Back to special date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 48);
    \u0275\u0275text(10, "A week after");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 102)(12, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_12_Conditional_2_Template_button_click_12_listener($event) {
      \u0275\u0275restoreView(_r64);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleSunDay($event));
    });
    \u0275\u0275text(13, " Sunrise & sunset ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_12_Conditional_2_Template_button_click_14_listener($event) {
      \u0275\u0275restoreView(_r64);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleCenterView($event));
    });
    \u0275\u0275text(15, " From center ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_12_Conditional_2_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r64);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.command("alignmentToggle"));
    });
    \u0275\u0275text(17, "Ray guide");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.eventSelection())("disabled", !ctx_r2.ready());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.cases);
    \u0275\u0275advance(9);
    \u0275\u0275attribute("aria-expanded", ctx_r2.ui().sunDay);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r2.ui().centerView);
  }
}
function SolarMonumentComponent_ng_template_12_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r66 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_12_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r66);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.command("earthToggle"));
    });
    \u0275\u0275text(1, "Earth\u2019s tilt");
    \u0275\u0275elementEnd();
  }
}
function SolarMonumentComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "Canvas guide");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, SolarMonumentComponent_ng_template_12_Conditional_2_Template, 18, 4);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 102);
    \u0275\u0275conditionalCreate(6, SolarMonumentComponent_ng_template_12_Conditional_6_Template, 2, 0, "button");
    \u0275\u0275elementStart(7, "button", 21);
    \u0275\u0275listener("click", function SolarMonumentComponent_ng_template_12_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r63);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.command("extras"));
    });
    \u0275\u0275text(8, "Views & measurements");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "details", 93)(10, "summary");
    \u0275\u0275text(11, "How to interpret the model");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13, " Level ground, true north and direct sunlight. Each target checks its centre. A longer shadow may cover several markers, so test nearby dates too. Trees, terrain, clouds and block stability are not simulated. Compare with an outdoor build before claiming a physical accuracy tolerance. Cylindrical holes have their measured depth. Glass and jewel inserts filter parallel sunlight; displayed colors are illustrative RGB transmission. Lens focusing, refraction, prism rainbows, the Sun\u2019s finite disk and soft shadow edges are not modeled. Sculpture shapes and materials are selectable built-in models, and the saved design includes their dimensions and orientation. The stone court has decorative compass carvings; its rings are not calibrated seasonal markers. Surface texture adds the look of shallow carving while the measured floor stays level. Sunrise and sunset labels use the apparent horizon; direct rays use the Sun\u2019s centre above the geometric horizon. Very long shadows can extend beyond the view near sunrise and sunset. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.presentation() && ctx_r2.readOnly() ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.presentation() ? "Compare June and December in the header. Use the date options in this guide to inspect nearby days." : "Play a day, pause, and follow the shadow.", " Drag to turn the scene; scroll or use + / \u2212 to zoom. ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!\u0275\u0275pureFunction0(3, _c6).includes(ctx_r2.activity()) ? 6 : -1);
  }
}
var SolarMonumentComponent = class _SolarMonumentComponent {
  design = input.required(
    ...ngDevMode ? [{ debugName: "design" }] : (
      /* istanbul ignore next */
      []
    )
  );
  surfaceTargets = computed(
    () => this.design().targets.filter((target) => target.y && target.normal),
    ...ngDevMode ? [{ debugName: "surfaceTargets" }] : (
      /* istanbul ignore next */
      []
    )
  );
  restore = input(
    ...ngDevMode ? [void 0, { debugName: "restore" }] : (
      /* istanbul ignore next */
      []
    )
  );
  checks = input(
    [],
    ...ngDevMode ? [{ debugName: "checks" }] : (
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
  presentation = input(
    false,
    ...ngDevMode ? [{ debugName: "presentation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readOnly = input(
    false,
    ...ngDevMode ? [{ debugName: "readOnly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  building = input(
    false,
    ...ngDevMode ? [{ debugName: "building" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activity = input(
    "",
    ...ngDevMode ? [{ debugName: "activity" }] : (
      /* istanbul ignore next */
      []
    )
  );
  weeklyControls = input(
    false,
    ...ngDevMode ? [{ debugName: "weeklyControls" }] : (
      /* istanbul ignore next */
      []
    )
  );
  workspaceKey = input(
    "",
    ...ngDevMode ? [{ debugName: "workspaceKey" }] : (
      /* istanbul ignore next */
      []
    )
  );
  walkthrough = input(
    ...ngDevMode ? [void 0, { debugName: "walkthrough" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Simulation-owned level challenge data for a weekly session. */
  quest = input(
    ...ngDevMode ? [void 0, { debugName: "quest" }] : (
      /* istanbul ignore next */
      []
    )
  );
  questCompleted = input(
    false,
    ...ngDevMode ? [{ debugName: "questCompleted" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Weekly tools appear only when the current level needs them to be solved. */
  questTools = computed(
    () => {
      const tools = this.quest()?.["tools"];
      return Array.isArray(tools) ? tools.filter((tool) => typeof tool === "string" && ["post", "build", "markers"].includes(tool)) : [];
    },
    ...ngDevMode ? [{ debugName: "questTools" }] : (
      /* istanbul ignore next */
      []
    )
  );
  walkthroughReadings = signal(
    [],
    ...ngDevMode ? [{ debugName: "walkthroughReadings" }] : (
      /* istanbul ignore next */
      []
    )
  );
  walkthroughReady = signal(
    false,
    ...ngDevMode ? [{ debugName: "walkthroughReady" }] : (
      /* istanbul ignore next */
      []
    )
  );
  walkthroughId = "";
  guidedReviewId = "";
  frameHeight = signal(
    850,
    ...ngDevMode ? [{ debugName: "frameHeight" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onChrome = inject(DESIGN_CHROME, { optional: true });
  editor = inject(DESIGN_EDITOR, { optional: true });
  toolbar = viewChild(
    "toolbar",
    ...ngDevMode ? [{ debugName: "toolbar" }] : (
      /* istanbul ignore next */
      []
    )
  );
  guide = viewChild(
    "guide",
    ...ngDevMode ? [{ debugName: "guide" }] : (
      /* istanbul ignore next */
      []
    )
  );
  toolsOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "toolsOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  seasonPictures = signal(
    [],
    ...ngDevMode ? [{ debugName: "seasonPictures" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pictureClose = viewChild(
    "pictureClose",
    ...ngDevMode ? [{ debugName: "pictureClose" }] : (
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
  eventSelection = signal(
    "",
    ...ngDevMode ? [{ debugName: "eventSelection" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markersOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "markersOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markerPlacing = signal(
    false,
    ...ngDevMode ? [{ debugName: "markerPlacing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markerDraft = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "markerDraft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markerSelected = signal(
    "",
    ...ngDevMode ? [{ debugName: "markerSelected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markerNow = signal(
    "",
    ...ngDevMode ? [{ debugName: "markerNow" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markerFeedback = signal(
    "",
    ...ngDevMode ? [{ debugName: "markerFeedback" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markerTarget = computed(
    () => this.markerDraft() ?? this.design().targets.find((t) => t.id === this.markerSelected()),
    ...ngDevMode ? [{ debugName: "markerTarget" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markerRecord = computed(
    () => solarMarkerRecord(this.markerTarget()),
    ...ngDevMode ? [{ debugName: "markerRecord" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canMark = computed(
    () => this.ready() && this.active() && !this.readOnly() && !this.presentation() && !this.ui().centerView && this.ui().mode !== "explore" && !this.activity().startsWith("sundial-") && !!this.onDesign,
    ...ngDevMode ? [{ debugName: "canMark" }] : (
      /* istanbul ignore next */
      []
    )
  );
  removedMarker = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "removedMarker" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markerSeason = computed(
    () => this.cases.find((c) => "calendar-" + c.id === this.markerRecord()?.markerKind),
    ...ngDevMode ? [{ debugName: "markerSeason" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markerName = "";
  markerX = 0;
  markerZ = 0;
  markerRequestId = "";
  markerPanel = viewChild(
    "markerPanel",
    ...ngDevMode ? [{ debugName: "markerPanel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markerNameInput = viewChild(
    "markerNameInput",
    ...ngDevMode ? [{ debugName: "markerNameInput" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  ui = signal(
    {
      date: "",
      clock: "",
      minutes: 720,
      start: 0,
      end: 1440,
      play: "Play day",
      canPlay: true,
      noon: true,
      sun: true,
      sunDay: false,
      centerView: false,
      mode: "test",
      season: "",
      height: 60,
      marks: 0,
      canUndo: false,
      canReturn: false,
      message: "",
      startLabel: "Sunrise",
      endLabel: "Sunset"
    },
    ...ngDevMode ? [{ debugName: "ui" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onCapture = inject(DESIGN_CAPTURE, { optional: true });
  onBatch = inject(DESIGN_CAPTURE_BATCH, { optional: true });
  onChecks = inject(DESIGN_CHECKS_CHANGE, { optional: true });
  onView = inject(DESIGN_VIEW_REQUEST, { optional: true });
  onDesign = inject(DESIGN_CHANGE, { optional: true });
  onQuest = inject(DESIGN_QUEST_PROGRESS, { optional: true });
  frame = viewChild(
    "frame",
    ...ngDevMode ? [{ debugName: "frame" }] : (
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
  connection = signal(
    0,
    ...ngDevMode ? [{ debugName: "connection" }] : (
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
  reviewing = signal(
    false,
    ...ngDevMode ? [{ debugName: "reviewing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  status = signal(
    "Loading the monument\u2026",
    ...ngDevMode ? [{ debugName: "status" }] : (
      /* istanbul ignore next */
      []
    )
  );
  results = signal(
    [],
    ...ngDevMode ? [{ debugName: "results" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = signal(
    0,
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  savedReview = signal(
    "",
    ...ngDevMode ? [{ debugName: "savedReview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cases = [
    { id: "march", label: "March equinox" },
    { id: "june", label: "June solstice" },
    { id: "sept", label: "September equinox" },
    { id: "dec", label: "December solstice" }
  ];
  current = computed(
    () => this.results()[this.selected()],
    ...ngDevMode ? [{ debugName: "current" }] : (
      /* istanbul ignore next */
      []
    )
  );
  outcome = computed(
    () => this.current()?.settings["outcome"] ?? "unconfigured",
    ...ngDevMode ? [{ debugName: "outcome" }] : (
      /* istanbul ignore next */
      []
    )
  );
  matches = computed(
    () => this.results().filter((r) => r.settings["outcome"] === "met").length,
    ...ngDevMode ? [{ debugName: "matches" }] : (
      /* istanbul ignore next */
      []
    )
  );
  configured = computed(
    () => this.results().length === 4 && this.results().every((r) => r.settings["outcome"] !== "unconfigured"),
    ...ngDevMode ? [{ debugName: "configured" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recorded = computed(
    () => !!this.results().length && this.savedReview() === this.results()[0].settings["reviewId"],
    ...ngDevMode ? [{ debugName: "recorded" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingId = "";
  reviewId = "";
  contextKey = "";
  sunDayTrigger;
  centerViewTrigger;
  timer;
  reviewTimer;
  constructor() {
    const listener = (event) => this.receive(event);
    window.addEventListener("message", listener);
    inject(DestroyRef).onDestroy(() => {
      window.removeEventListener("message", listener);
      clearTimeout(this.timer);
      clearTimeout(this.reviewTimer);
      this.onChrome?.(void 0);
    });
    effect(() => {
      const toolbar = this.toolbar(), guide = this.guide();
      if (toolbar && guide)
        this.onChrome?.({
          toolbar,
          guide,
          walkthrough: {
            ready: () => this.ready() && this.walkthroughReady() && !this.busy() && !this.reviewing(),
            readings: this.walkthroughReadings,
            status: () => this.ui().message || this.status(),
            run: (action) => this.runWalkthroughAction(action)
          }
        });
    });
    effect(() => {
      if (this.connected())
        this.send({ type: "hosted-chrome", active: true });
    });
    effect(() => {
      const active = this.weeklyControls();
      if (this.connected())
        this.send({ type: "weekly-preview", active });
    });
    effect(() => {
      if (!this.editor)
        return;
      const ids = this.editor.selection(), snap = this.editor.snap(), assemblies = this.editor.assemblies();
      this.design();
      if (this.connected())
        this.send({ type: "editor-state", ids, snap, assemblies });
    });
    effect(() => {
      const design = this.design();
      untracked(() => this.cancelMarkerDraft());
      if (this.connected()) {
        this.send({ type: "design", design });
        if (this.editor)
          untracked(() => this.send({
            type: "editor-state",
            ids: this.editor.selection(),
            snap: this.editor.snap(),
            assemblies: this.editor.assemblies()
          }));
        const targetId = untracked(this.markerSelected);
        if (design.targets.some((t) => t.id === targetId))
          this.send({ type: "marker-focus", targetId });
      }
    });
    effect(() => {
      const capture = this.restore();
      const index = this.cases.findIndex((item) => item.id === capture?.settings["scenarioId"]);
      if (this.presentation() && index >= 0)
        this.selected.set(index);
      if (this.connected() && capture)
        this.send({ type: "restore", capture });
    });
    effect(() => {
      const active = this.active();
      if (!active)
        untracked(() => this.closeMarkers());
      if (this.connected())
        this.send({ type: "visibility", active });
    });
    effect(() => {
      const activity = this.activity();
      this.workspaceKey();
      untracked(() => {
        this.closeMarkers();
        this.removedMarker.set(void 0);
        this.markerSelected.set("");
      });
      this.eventSelection.set("");
      if (!this.connected())
        return;
      clearTimeout(this.timer);
      clearTimeout(this.reviewTimer);
      this.pendingId = "";
      this.reviewId = "";
      this.busy.set(false);
      this.reviewing.set(false);
      this.send({ type: "design", design: untracked(this.design) });
      this.send({ type: "lesson", activity });
      const capture = untracked(this.restore);
      if (capture)
        this.send({ type: "restore", capture });
      this.status.set(activity.startsWith("sundial-") ? "Play day to follow your post\u2019s shadow. Your sundial and its marks save automatically." : "Build your monument, then Show Sun. Play day follows sunrise to sunset.");
    });
    effect(() => {
      const readOnly = this.readOnly(), building = this.building();
      if (readOnly)
        untracked(() => this.cancelMarkerDraft());
      if (this.connected()) {
        this.send({ type: "view-policy", readOnly });
        this.send({ type: "build-view", building: building && !readOnly });
      }
    });
    effect(() => {
      this.design();
      this.checks();
      const presenting = this.presentation(), ready = this.connected();
      this.results.set([]);
      if (!presenting) {
        clearTimeout(this.reviewTimer);
        this.reviewId = "";
        this.reviewing.set(false);
      }
      if (presenting)
        untracked(() => this.cancelMarkerDraft());
      if (ready)
        this.send({ type: "presentation", active: presenting });
      if (presenting && ready)
        this.runReview();
    });
    effect(() => {
      const quest = this.quest(), completed = this.questCompleted();
      if (this.connected())
        this.send({ type: "quest", quest: quest ?? null, completed });
    });
    effect(() => {
      const setup = this.walkthrough();
      if (!this.connected() || !setup)
        return;
      this.walkthroughId = crypto.randomUUID();
      this.guidedReviewId = "";
      this.walkthroughReady.set(false);
      this.walkthroughReadings.set([]);
      this.status.set("");
      this.send({ type: "walkthrough-setup", id: this.walkthroughId, setup });
    });
  }
  runWalkthroughAction(action) {
    const setup = this.walkthrough();
    if (!setup || !this.walkthroughReady() || !this.active() || this.readOnly() || this.presentation() || this.busy() || this.reviewing())
      return;
    this.status.set("");
    if (action.command === "capture") {
      this.status.set("Saving this observation\u2026");
      this.capture();
    } else if (action.command === "review-save") {
      this.status.set("Checking all four dates\u2026");
      this.runReview();
      this.guidedReviewId = this.reviewId;
    } else if (action.command === "nudge") {
      const id = setup["blockId"];
      if (typeof id !== "string" || !this.design().blocks.some((b) => b.id === id) || ![-0.05, 0.05].includes(Number(action.value)) || !this.editor) {
        this.status.set("Load the starting challenge before moving the window.");
        return;
      }
      const next = transformBlocks(this.design(), [id], { dz: Number(action.value) });
      if (this.editor.commit(next))
        this.status.set("Window moved 5 cm " + (Number(action.value) < 0 ? "north." : "south."));
      else
        this.status.set(this.editor.message());
    } else if (["markDial", "post", "shadowView", "targetView"].includes(action.command))
      this.command(action.command, action.value);
  }
  toggleMarkers() {
    if (this.markersOpen()) {
      this.closeMarkers();
      return;
    }
    this.markersOpen.set(true);
    if (!this.markerSelected() && this.design().targets[0])
      this.selectMarker(this.design().targets[0]);
    this.focusMarkerPanel();
  }
  closeMarkers() {
    this.markersOpen.set(false);
    this.cancelMarkerDraft();
  }
  cancelMarkerDraft() {
    this.markerRequestId = "";
    this.markerPlacing.set(false);
    this.markerDraft.set(void 0);
    if (this.ready())
      this.send({ type: "marker-cancel" });
  }
  startMarker(point) {
    if (!this.canMark() || this.design().targets.length >= 12)
      return;
    this.cancelMarkerDraft();
    this.markerFeedback.set("");
    this.markerNow.set("");
    this.markerRequestId = crypto.randomUUID();
    this.markerPlacing.set(true);
    this.send(__spreadValues({
      type: "marker-start",
      requestId: this.markerRequestId
    }, point ? { point } : {}));
  }
  measuredMarker() {
    this.startMarker({ x: this.markerX / 100, z: this.markerZ / 100 });
  }
  saveMarker() {
    const target = this.markerDraft();
    if (!this.canMark() || !target || !solarMarkerRecord(target))
      return;
    const label = this.markerName.trim();
    if (!label || label.length > 80) {
      this.markerFeedback.set("Give your stone a name, up to 80 letters.");
      return;
    }
    const design = __spreadProps(__spreadValues({}, this.design()), { targets: [...this.design().targets, __spreadProps(__spreadValues({}, target), { label })] });
    if (!isBlockDesign(design)) {
      this.markerFeedback.set("Check the marker position and the 12-marker limit.");
      return;
    }
    try {
      this.onDesign?.(design);
      this.cancelMarkerDraft();
      this.selectMarker(__spreadProps(__spreadValues({}, target), { label }));
      this.markerFeedback.set("Sunstone saved. Its place and observation stay fixed.");
    } catch (error) {
      this.markerFeedback.set(error instanceof Error ? error.message : "The marker could not be saved.");
    }
  }
  selectMarker(target) {
    this.cancelMarkerDraft();
    this.markerSelected.set(target.id);
    this.markerName = target.label;
    this.markerNow.set("");
    this.markerFeedback.set("");
    this.send({ type: "marker-focus", targetId: target.id });
  }
  renameMarker() {
    if (!this.canMark() || this.markerDraft())
      return;
    const label = this.markerName.trim(), target = this.markerTarget();
    if (!target || !label || label.length > 80)
      return;
    this.onDesign?.(__spreadProps(__spreadValues({}, this.design()), {
      targets: this.design().targets.map((t) => t.id === target.id ? __spreadProps(__spreadValues({}, t), { label }) : t)
    }));
  }
  removeMarker() {
    const target = this.markerTarget();
    if (!this.canMark() || !target || this.markerDraft())
      return;
    this.onDesign?.(__spreadProps(__spreadValues({}, this.design()), {
      targets: this.design().targets.filter((t) => t.id !== target.id)
    }));
    this.removedMarker.set(target);
    this.markerSelected.set("");
    this.markerFeedback.set("Marker removed. You can undo this.");
  }
  undoMarker() {
    const target = this.removedMarker();
    if (!target || !this.canMark())
      return;
    const next = __spreadProps(__spreadValues({}, this.design()), { targets: [...this.design().targets, target] });
    if (!isBlockDesign(next)) {
      this.markerFeedback.set("Make room for this marker first.");
      return;
    }
    this.onDesign?.(next);
    this.removedMarker.set(void 0);
    this.selectMarker(target);
  }
  revisitMarker() {
    const target = this.markerTarget();
    if (!target || !this.markerRecord() || this.presentation())
      return;
    this.cancelMarkerDraft();
    this.send({ type: "marker-revisit", targetId: target.id });
    this.markerFeedback.set("Returned to this stone\u2019s recorded date, time and place. Compare the light now.");
  }
  useMarkerForTest() {
    const target = this.markerTarget(), record = this.markerRecord(), season = this.markerSeason();
    if (!this.canMark() || !target || !record || !season || this.markerDraft() || !this.onChecks)
      return;
    const check = {
      scenarioId: season.id,
      targetId: target.id,
      expectedValue: record.light,
      settings: { observationRule: "clock", minutes: markerClock(record) }
    };
    this.onChecks([...this.checks().filter((c) => c.scenarioId !== season.id), check]);
    this.markerFeedback.set(`${season.label} test set to this marker, light and local clock time.`);
  }
  markerWhen(record) {
    return record ? new Intl.DateTimeFormat("en", {
      timeZone: record.zone,
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(record.utcInstant)) : "No observation recorded";
  }
  recordFor(target) {
    return solarMarkerRecord(target);
  }
  focusMarkerPanel(name = false) {
    afterNextRender(() => (name ? this.markerNameInput()?.nativeElement : this.markerPanel()?.nativeElement)?.focus({
      preventScroll: true
    }), { injector: this.injector });
  }
  connected() {
    this.connection();
    return this.ready();
  }
  connect() {
    this.send({ type: "connect" });
  }
  toggleSunDay(event) {
    if (event.currentTarget instanceof HTMLElement)
      this.sunDayTrigger = event.currentTarget;
    this.command("sunDayToggle");
  }
  toggleCenterView(event) {
    if (event.currentTarget instanceof HTMLElement)
      this.centerViewTrigger = event.currentTarget;
    this.cancelMarkerDraft();
    this.markersOpen.set(false);
    this.reviewOpen.set(false);
    this.command("centerViewToggle");
  }
  command(action, value) {
    if (!this.ready())
      return;
    this.send({ type: "toolbar-action", action, value });
  }
  chooseMode(mode) {
    this.seasonPictures.set([]);
    this.closeMarkers();
    this.reviewOpen.set(false);
    this.command(mode === "build" ? "buildMode" : mode === "explore" ? "exploreToggle" : "showSun");
  }
  closePictures() {
    this.seasonPictures.set([]);
    this.command("closeSeasonPictures");
  }
  event(value) {
    this.eventSelection.set(value);
    if (this.presentation() && ["nearby-before", "nearby-after", "special-return"].includes(value)) {
      if (value === "special-return")
        this.viewCase(this.selected());
      else
        this.viewNearby(value === "nearby-before" ? -7 : 7);
    } else if (this.presentation() && this.cases.some((c) => c.id === value)) {
      this.viewCase(this.cases.findIndex((c) => c.id === value));
    } else
      this.command(value);
    if (!this.presentation())
      queueMicrotask(() => this.eventSelection.set(""));
  }
  capture() {
    if (this.ui().mode === "explore" || this.ui().centerView || this.busy() || !this.ready() || this.readOnly() || !this.onCapture)
      return;
    this.onView?.("observe");
    this.pendingId = crypto.randomUUID();
    this.busy.set(true);
    this.send({ type: "capture", id: this.pendingId, design: this.design() });
    this.timer = setTimeout(() => {
      this.busy.set(false);
      this.pendingId = "";
      this.status.set("The lab did not return a trial. Try again once the canvas has loaded.");
    }, 1e4);
  }
  runReview() {
    if (!this.ready())
      return;
    clearTimeout(this.reviewTimer);
    this.reviewId = crypto.randomUUID();
    this.results.set([]);
    this.reviewing.set(true);
    this.send({ type: "review", id: this.reviewId, design: this.design(), checks: this.checks() });
    this.reviewTimer = setTimeout(() => {
      this.reviewing.set(false);
      this.reviewId = "";
      this.status.set("The seasonal comparison did not load. Select Recheck all four dates to try again.");
    }, 1e4);
  }
  viewCase(index) {
    this.selected.set((index + 4) % 4);
    this.eventSelection.set(this.cases[this.selected()].id);
    const capture = this.results()[this.selected()];
    if (capture) {
      this.send({ type: "restore", capture });
      const target = this.design().targets.find((target2) => target2.id === capture.settings["targetId"]);
      if (target?.y)
        this.selectMarker(target);
    }
  }
  checkFor(id) {
    return this.checks().find((check) => check.scenarioId === id);
  }
  changeCheck(id, field, value) {
    if (this.readOnly() || !this.onChecks)
      return;
    const check = __spreadProps(__spreadValues({
      scenarioId: id,
      targetId: "",
      expectedValue: "shadow"
    }, this.checkFor(id)), {
      [field]: value
    });
    const checks = this.checks().filter((item) => item.scenarioId !== id);
    this.onChecks(check.targetId ? [...checks, check] : checks);
  }
  changeTime(id, rule, clock) {
    if (this.readOnly() || !this.onChecks || !["noon", "morning", "evening", "clock"].includes(rule))
      return;
    const existing = this.checkFor(id);
    if (!existing)
      return;
    if (clock !== void 0 && !/^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,3})?)?$/.test(clock))
      return;
    const parts = clock?.split(":").map(Number);
    const minutes = parts ? parts[0] * 60 + parts[1] + (parts[2] ?? 0) / 60 : Number(existing.settings?.["minutes"] ?? 720);
    if (!Number.isFinite(minutes) || minutes < 0 || minutes >= 1440)
      return;
    this.onChecks(this.checks().map((check) => check.scenarioId === id ? __spreadProps(__spreadValues({}, check), { settings: { observationRule: rule, minutes } }) : check));
  }
  clockFor(id) {
    const minutes = Number(this.checkFor(id)?.settings?.["minutes"] ?? 720);
    const milliseconds = Math.round(minutes * 6e4);
    const time = `${String(Math.floor(milliseconds / 36e5)).padStart(2, "0")}:${String(Math.floor(milliseconds / 6e4) % 60).padStart(2, "0")}`;
    const remainder = milliseconds % 6e4;
    return remainder ? `${time}:${String(Math.floor(remainder / 1e3)).padStart(2, "0")}.${String(remainder % 1e3).padStart(3, "0")}` : time;
  }
  viewNearby(offset) {
    const capture = this.current();
    if (capture)
      this.send({ type: "nearby", capture, offset });
  }
  resultLabel(result) {
    switch (result?.settings["outcome"]) {
      case "met":
        return "Matches expectation";
      case "missed":
        return "Does not match yet";
      case "unavailable":
        return "No direct Sun / no design";
      default:
        return "Choose a target";
    }
  }
  measurement(result, label) {
    return result?.measurements.find((m) => m.label === label)?.value ?? "\u2014";
  }
  recordReview() {
    if (this.ui().mode === "explore" || this.ui().centerView || !this.configured() || this.recorded() || this.readOnly() || !this.onBatch)
      return;
    try {
      this.onBatch(this.results());
      this.savedReview.set(String(this.results()[0].settings["reviewId"]));
      this.status.set("Four seasonal tests added to your evidence notebook, with this design and its expectations.");
    } catch (error) {
      this.status.set(error instanceof Error ? error.message : "The comparison could not be recorded.");
    }
  }
  send(payload) {
    this.frame()?.nativeElement.contentWindow?.postMessage(__spreadValues({ channel: "forge.design-simulation.v1" }, payload), window.location.origin);
  }
  receive(event) {
    if (event.origin !== window.location.origin || event.source !== this.frame()?.nativeElement.contentWindow || !event.data || typeof event.data !== "object")
      return;
    const data = event.data;
    if (data["channel"] !== "forge.design-simulation.v1")
      return;
    if (data["type"] === "walkthrough-readings" && data["id"] === this.walkthroughId && this.walkthroughId) {
      const readings = data["readings"];
      if (Array.isArray(readings) && readings.length <= 8 && readings.every((r) => r && typeof r === "object" && ["label", "value"].every((k) => typeof r[k] === "string" && r[k].length <= 200))) {
        this.walkthroughReadings.set(readings);
        this.walkthroughReady.set(true);
      }
      return;
    }
    if (data["type"] === "quest-state") {
      const quest = this.quest(), progress = data["progress"];
      if (quest && data["questId"] === quest["id"] && typeof data["complete"] === "boolean" && Array.isArray(progress) && progress.length <= 8 && progress.every((p) => !!p && typeof p === "object" && typeof p.id === "string" && p.id.length <= 80 && typeof p.label === "string" && p.label.length <= 120 && typeof p.done === "boolean"))
        this.onQuest?.({ questId: String(quest["id"]), complete: data["complete"], progress });
      return;
    }
    if (data["type"] === "marker-selected" && !this.activity().startsWith("sundial-")) {
      const target = this.design().targets.find((t) => t.id === data["targetId"]);
      if (target) {
        this.markersOpen.set(true);
        this.selectMarker(target);
        this.focusMarkerPanel();
      }
      return;
    }
    if (data["type"] === "marker-reading" && data["targetId"] === this.markerSelected() && markerLights.concat("unavailable").includes(String(data["light"]))) {
      this.markerNow.set(String(data["light"]));
      return;
    }
    if (data["requestId"] === this.markerRequestId && this.markerRequestId) {
      if (data["type"] === "marker-cancelled") {
        this.cancelMarkerDraft();
        return;
      }
      if (data["type"] === "marker-error" && typeof data["message"] === "string" && data["message"].length <= 300) {
        this.markerFeedback.set(data["message"]);
        return;
      }
      if (data["type"] === "marker-picked" && this.canMark() && isBlockDesign({ blocks: [], targets: [data["target"]] })) {
        const target = data["target"];
        if (target.id !== "sunstone-" + this.markerRequestId || !solarMarkerRecord(target))
          return;
        this.markerDraft.set(target);
        this.markerName = target.label;
        this.markerPlacing.set(false);
        this.markerX = target.x * 100;
        this.markerZ = target.z * 100;
        this.markerFeedback.set("Name your sunstone, then carve it into the floor.");
        this.focusMarkerPanel(true);
        return;
      }
    }
    if (data["type"] === "toolbar-state") {
      const s = data["state"];
      if (s && ["date", "clock", "play", "season", "message", "startLabel", "endLabel"].every((k) => typeof s[k] === "string" && s[k].length <= 300) && ["minutes", "start", "end", "height", "marks"].every((k) => typeof s[k] === "number" && Number.isFinite(s[k]) && Math.abs(s[k]) <= 3e3) && ["canPlay", "noon", "sun", "canUndo", "canReturn"].every((k) => typeof s[k] === "boolean") && (s["sunDay"] === void 0 || typeof s["sunDay"] === "boolean") && (s["centerView"] === void 0 || typeof s["centerView"] === "boolean") && (s["mode"] === void 0 || ["build", "explore", "test"].includes(String(s["mode"]))) && Number(s["end"]) >= Number(s["start"])) {
        const wasOpen = this.ui().sunDay;
        const wasCenter = this.ui().centerView;
        this.ui.set(__spreadProps(__spreadValues({}, s), {
          mode: s["mode"] ?? (s["sun"] ? "test" : "build"),
          sunDay: s["sunDay"] === true,
          centerView: s["centerView"] === true
        }));
        if (wasOpen && !this.ui().sunDay && this.sunDayTrigger?.isConnected)
          this.sunDayTrigger.focus({ preventScroll: true });
        if (wasCenter && !this.ui().centerView && this.centerViewTrigger?.isConnected)
          this.centerViewTrigger.focus({ preventScroll: true });
      }
      return;
    }
    if (data["type"] === "season-pictures" && this.active() && this.ui().mode === "explore") {
      const pictures = data["pictures"];
      if (!Array.isArray(pictures) || pictures.length !== 2 || !pictures.every((p) => p && typeof p === "object" && typeof p.src === "string" && p.src.length < 16e6 && /^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(p.src) && typeof p.caption === "string" && p.caption.length <= 160))
        return;
      this.seasonPictures.set(pictures);
      afterNextRender(() => this.pictureClose()?.nativeElement.focus({ preventScroll: true }), {
        injector: this.injector
      });
      return;
    }
    if (data["type"] === "editor-select" || data["type"] === "editor-transform") {
      if (!this.editor || !this.building() || this.readOnly() || this.presentation() || !this.active() || this.ui().centerView || this.ui().mode === "explore")
        return;
      if (data["type"] === "editor-select") {
        const id = data["id"];
        if (typeof id === "string" && (id === "" || this.design().blocks.some((b) => b.id === id)) && typeof data["additive"] === "boolean")
          this.editor.select(id, data["additive"]);
      } else {
        const ids = data["ids"], op = data["operation"];
        if (!Array.isArray(ids) || !ids.length || ids.length > 100 || !ids.every((id) => typeof id === "string" && this.editor.selection().includes(id)) || data["expected"] !== JSON.stringify(this.design()))
          return;
        if (!op || typeof op !== "object" || Array.isArray(op) || !Object.entries(op).every(([k, v]) => ["dx", "dy", "dz", "turn"].includes(k) && typeof v === "number" && Number.isFinite(v) && Math.abs(v) <= (k === "turn" ? 360 : 24)))
          return;
        this.editor.commit(transformBlocks(this.design(), ids, op));
      }
      return;
    }
    if (data["type"] === "design-change" && data["activity"] === this.activity() && !this.readOnly() && ["sundial-build", "sundial-calendar"].includes(this.activity()) && isBlockDesign(data["design"])) {
      try {
        this.onDesign?.(data["design"]);
        if (this.walkthrough())
          this.status.set(`Sundial saved \xB7 ${data["design"].targets.length} fixed marks.`);
      } catch (error) {
        this.status.set(error instanceof Error ? error.message : "The sundial could not be saved.");
      }
      return;
    }
    if (data["type"] === "size" && typeof data["height"] === "number" && Number.isFinite(data["height"])) {
      this.frameHeight.set(Math.ceil(Math.min(2200, Math.max(500, data["height"]))) + 2);
    }
    if (data["type"] === "view-request" && (data["view"] === "observe" || data["view"] === "build" && !this.readOnly())) {
      this.onView?.(data["view"]);
    }
    if (data["type"] === "ready") {
      this.ready.set(true);
      this.connection.update((value) => value + 1);
      this.status.set(this.activity().startsWith("sundial-") ? "Play day to test your sundial. Your post and marks save automatically." : "Build your monument, then Show Sun. Play day follows the Sun from sunrise to sunset.");
      this.send({ type: "design", design: this.design() });
    }
    if (data["type"] === "context" && typeof data["key"] === "string" && data["key"] !== this.contextKey) {
      this.contextKey = data["key"];
      this.results.set([]);
      if (this.presentation() && this.ready())
        this.runReview();
    }
    if (data["type"] === "review-error" && data["id"] === this.reviewId) {
      clearTimeout(this.reviewTimer);
      this.reviewing.set(false);
      this.status.set("The comparison could not be calculated. Check the location and year, then recheck.");
    }
    if (data["type"] === "review" && data["id"] === this.reviewId && Array.isArray(data["captures"]) && data["captures"].length === 4 && data["captures"].every((capture, i) => isDesignCapture(capture) && capture.pluginId === "simulation.solar-monument" && capture.id === this.reviewId + ":" + this.cases[i].id && capture.settings["scenarioId"] === this.cases[i].id && ["met", "missed", "unavailable", "unconfigured"].includes(String(capture.settings["outcome"])) && JSON.stringify(capture.design) === JSON.stringify(this.design()))) {
      clearTimeout(this.reviewTimer);
      this.reviewing.set(false);
      this.results.set(data["captures"]);
      if (this.guidedReviewId === data["id"]) {
        this.guidedReviewId = "";
        this.recordReview();
        if (this.recorded())
          this.status.set(`${this.matches()} of 4 expectations met. Four measured tests saved to your notebook.`);
        else if (!this.configured())
          this.status.set("Load the starting challenge to include all four expectations, then run the check again.");
      } else
        this.viewCase(this.selected());
    }
    if (data["type"] === "capture" && isDesignCapture(data["capture"]) && data["capture"].id === this.pendingId) {
      clearTimeout(this.timer);
      this.busy.set(false);
      this.pendingId = "";
      try {
        this.onCapture?.(data["capture"]);
        this.status.set("Trial added to your evidence notebook.");
      } catch (error) {
        this.status.set(error instanceof Error ? error.message : "This trial could not be recorded.");
      }
    }
  }
  static \u0275fac = function SolarMonumentComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SolarMonumentComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SolarMonumentComponent, selectors: [["app-solar-monument"]], viewQuery: function SolarMonumentComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.toolbar, _c0, 5)(ctx.guide, _c1, 5)(ctx.pictureClose, _c2, 5)(ctx.markerPanel, _c3, 5)(ctx.markerNameInput, _c4, 5)(ctx.frame, _c5, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(6);
    }
  }, inputs: { design: [1, "design"], restore: [1, "restore"], checks: [1, "checks"], active: [1, "active"], presentation: [1, "presentation"], readOnly: [1, "readOnly"], building: [1, "building"], activity: [1, "activity"], weeklyControls: [1, "weeklyControls"], workspaceKey: [1, "workspaceKey"], walkthrough: [1, "walkthrough"], quest: [1, "quest"], questCompleted: [1, "questCompleted"] }, decls: 14, vars: 8, consts: [["toolbar", ""], ["weeklyToolbar", ""], ["frame", ""], ["guide", ""], ["viewMenu", ""], ["postMenu", ""], ["post", ""], ["more", ""], ["height", ""], ["pictureClose", ""], ["markerPanel", ""], ["markerNameInput", ""], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "pictureTitle", 1, "season-pictures"], ["title", "Interactive globe, Sun and Moon paths, and monument shadows", "src", \u0275\u0275trustConstantResourceUrl`/simulations/solar-monument/index.html`, 3, "load"], ["aria-label", "Solar calendar markers", "tabindex", "-1", 1, "marker-panel"], ["aria-label", "Comparison and expectations", 1, "demonstration", 3, "hidden"], ["role", "status", 1, "status"], [1, "toolbar-controls"], [4, "ngTemplateOutlet"], [3, "click", "disabled"], [3, "disabled"], [3, "click"], [1, "observation"], [1, "event-select", 3, "disabled", "ngModel"], ["aria-label", "Current observation", 1, "observation"], [1, "toolbar-menu"], [1, "popover"], [1, "header-time-dial", 3, "start", "end", "minutes", "clock", "startLabel", "endLabel", "disabled"], [3, "current", "disabled"], ["type", "number", "min", "10", "max", "200", "step", "1", 3, "value"], ["title", "30 minutes after sunrise", 3, "disabled"], ["title", "30 minutes after sunrise", 3, "click", "disabled"], [1, "play", 3, "click", "disabled"], [1, "event-select", 3, "ngModelChange", "disabled", "ngModel"], ["value", ""], ["label", "Nearby dates"], ["value", "controlsToggle"], [3, "value"], ["label", "Time of day"], ["value", "dayStart"], ["value", "dialMorning"], ["value", "noonBtn"], ["value", "dialAfternoon"], ["value", "dayEnd"], ["value", "dialWeekBefore"], ["value", "dialWeekAfter"], ["value", "nearby-before"], ["value", "special-return"], ["value", "nearby-after"], ["aria-label", "Playback speed", 3, "change"], ["value", "0.5"], ["value", "1", "selected", ""], ["value", "2"], [1, "header-time-dial", 3, "changed", "start", "end", "minutes", "clock", "startLabel", "endLabel", "disabled"], [1, "week-controls"], [1, "time-dial", 3, "changed", "start", "end", "minutes", "clock", "startLabel", "endLabel", "disabled"], ["aria-label", "Level tools", 1, "week-actions"], ["aria-label", "Sun views", 1, "week-views"], ["type", "number", "min", "10", "max", "200", 3, "value"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "pictureTitle", 1, "season-pictures", 3, "keydown.escape", "keydown.tab"], ["id", "pictureTitle"], ["aria-label", "Close seasonal pictures", 3, "click"], [1, "picture-grid"], [3, "src", "alt"], ["aria-label", "Simulation controls", 1, "standalone-header"], [1, "standalone-guide"], ["aria-label", "Solar calendar markers", "tabindex", "-1", 1, "marker-panel", 3, "keydown.escape"], ["aria-label", "Close markers", 3, "click"], ["aria-label", "Marker observation", 1, "marker-observation"], ["role", "status", 1, "marker-feedback"], ["aria-label", "Saved calendar stones", 1, "marker-list"], [3, "current"], [1, "place-marker", 3, "click", "disabled"], [1, "marker-coordinates"], ["type", "number", "min", "-1200", "max", "1200", "step", "1", 3, "ngModelChange", "ngModel"], ["role", "status"], [1, "marker-actions"], ["maxlength", "80", 3, "ngModelChange", "change", "ngModel"], [1, "marker-date"], ["role", "status", 1, "marker-live"], [1, "place-marker", 3, "click"], [1, "stone-number"], [1, "expectation"], [3, "ngModelChange", "disabled", "ngModel"], ["value", "shadow"], ["value", "sunlight"], ["value", "red light"], ["value", "amber light"], ["value", "green light"], ["value", "blue light"], ["value", "violet light"], ["value", "mixed filters"], ["role", "status", 1, "verdict"], [1, "model-note"], [1, "table-scroll"], [3, "selected"], [1, "review-actions"], ["value", "noon"], ["value", "morning"], ["value", "evening"], ["value", "clock"], ["type", "time", "step", "any", 3, "change", "disabled", "value"], [1, "guide-actions"], ["aria-label", "Special date", 1, "event-select", 3, "ngModelChange", "ngModel", "disabled"]], template: function SolarMonumentComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, SolarMonumentComponent_ng_template_0_Template, 2, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(2, SolarMonumentComponent_ng_template_2_Template, 27, 19, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
      \u0275\u0275conditionalCreate(4, SolarMonumentComponent_Conditional_4_Template, 15, 0, "section", 12);
      \u0275\u0275conditionalCreate(5, SolarMonumentComponent_Conditional_5_Template, 5, 3);
      \u0275\u0275elementStart(6, "iframe", 13, 2);
      \u0275\u0275listener("load", function SolarMonumentComponent_Template_iframe_load_6_listener() {
        return ctx.connect();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(8, SolarMonumentComponent_Conditional_8_Template, 15, 5, "aside", 14);
      \u0275\u0275conditionalCreate(9, SolarMonumentComponent_Conditional_9_Template, 74, 16, "section", 15);
      \u0275\u0275conditionalCreate(10, SolarMonumentComponent_Conditional_10_Template, 2, 1, "p", 16);
      \u0275\u0275conditionalCreate(11, SolarMonumentComponent_Conditional_11_Template, 2, 1, "p", 16);
      \u0275\u0275template(12, SolarMonumentComponent_ng_template_12_Template, 14, 4, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.seasonPictures().length ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.onChrome ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275styleProp("height", ctx.frameHeight(), "px");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.markersOpen() && !ctx.ui().centerView ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.presentation() ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.status().includes("could not") || ctx.status().includes("did not") || ctx.status().includes("Trial added") || ctx.status().includes("recorded") || ctx.status().includes("STATE_") ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.ui().message ? 11 : -1);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel, NgTemplateOutlet, SolarTimeDialComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n  color: #3b3e32;\n}\n.week-controls[_ngcontent-%COMP%] {\n  display: contents;\n}\n.week-controls[_ngcontent-%COMP%]    > :is(div[_ngcontent-%COMP%], label[_ngcontent-%COMP%], small[_ngcontent-%COMP%]) {\n  padding: 8px 14px;\n  background: #fffdf7;\n}\n.week-controls[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  display: block;\n}\n.week-controls[_ngcontent-%COMP%]   .week-actions[_ngcontent-%COMP%] {\n  position: sticky;\n  top: var(--%NS%solar-toolbar-top, 0px);\n  z-index: 35;\n  border-bottom: 1px solid #dce0d4;\n}\n.week-controls[_ngcontent-%COMP%]   :is(button[_ngcontent-%COMP%], select[_ngcontent-%COMP%], summary[_ngcontent-%COMP%], input[_ngcontent-%COMP%]) {\n  scroll-margin-top: calc(var(--%NS%solar-toolbar-top, 0px) + 110px);\n}\n.week-actions[_ngcontent-%COMP%], \n.week-views[_ngcontent-%COMP%], \n.week-time[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 7px;\n}\n.week-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.week-controls[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%], \n.week-controls[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 38px;\n  font-size: 12px;\n}\n.week-controls[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin: 0;\n  font-size: 12px;\n}\n.week-controls[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  max-width: 175px;\n}\n.week-controls[_ngcontent-%COMP%]   .play[_ngcontent-%COMP%] {\n  background: #295e52;\n  color: white;\n  border-color: #295e52;\n  font-weight: 700;\n}\n.week-controls[_ngcontent-%COMP%]   .week-timeline[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(60px, 1fr) auto;\n  gap: 8px;\n}\n.week-timeline[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n  accent-color: #a36b20;\n}\n.week-timeline[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.week-controls[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.week-time[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.time-dial[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  box-sizing: border-box;\n  padding: 8px 14px 4px;\n  background: #fffdf7;\n}\n.header-time-dial[_ngcontent-%COMP%] {\n  display: block;\n  flex: 1 0 100%;\n  width: 100%;\n}\n@media (max-width: 520px) {\n  .week-controls[_ngcontent-%COMP%]   .week-timeline[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .week-timeline[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n    grid-row: 1;\n  }\n  .week-timeline[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n    text-align: right;\n  }\n  .week-time[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n    flex-basis: 100%;\n  }\n}\n.season-pictures[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 12px;\n  z-index: 200;\n  padding: 18px;\n  overflow: auto;\n  background: #fffaf0;\n  color: #264b4e;\n  border: 1px solid #b8b49c;\n  border-radius: 12px;\n  box-shadow: 0 0 0 100vmax rgba(21, 56, 64, 0.6901960784);\n}\n.season-pictures[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: -18px;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  background: #fffaf0;\n  padding: 10px 0;\n}\n.season-pictures[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 0.12em;\n}\n.season-pictures[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 4px 0;\n  font: 28px Georgia, serif;\n}\n.season-pictures[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 44px;\n  font-size: 26px;\n}\n.picture-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.picture-grid[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%] {\n  min-width: 0;\n  margin: 0;\n}\n.picture-grid[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  display: block;\n  border-radius: 8px;\n}\n.picture-grid[_ngcontent-%COMP%]   figcaption[_ngcontent-%COMP%], \n.season-pictures[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  font: 12px/1.5 system-ui, sans-serif;\n}\n@media (max-width: 650px) {\n  .season-pictures[_ngcontent-%COMP%] {\n    inset: 8px;\n    padding: 12px;\n  }\n  .season-pictures[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n    top: -12px;\n  }\n  .picture-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.lab-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  padding: 12px 16px;\n  background:\n    linear-gradient(\n      120deg,\n      #363e33,\n      #535342);\n  color: #fcf4df;\n  border: 1px solid #a99265;\n  border-radius: 12px 12px 0 0;\n}\n.lab-toolbar[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin: 4px 0 0;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  font: inherit;\n  min-height: 42px;\n  border: 1px solid #c4b699;\n  border-radius: 7px;\n  padding: 8px 12px;\n  color: #3b3e32;\n  background: #fffdf7;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #be7920;\n  outline-offset: 3px;\n}\n.lab-toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.review-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-child {\n  background: #f4c363;\n}\niframe[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 790px;\n  border: 1px solid #b3a381;\n  box-sizing: border-box;\n  display: block;\n  background: #07131a;\n}\n.season-steps[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 6px;\n  padding: 10px 0;\n}\n.season-steps[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.season-steps[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.season-steps[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n.season-steps[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 11px;\n  margin-top: 5px;\n}\n.current[_ngcontent-%COMP%] {\n  background: #454c3c;\n  color: white;\n}\n.demonstration[_ngcontent-%COMP%] {\n  background: #fffdf7;\n  padding: 16px;\n  border: 1px solid #c5d0bd;\n  border-radius: 0 0 12px 12px;\n}\n.step-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 0;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.5;\n}\n.step-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin: 5px 0;\n}\n.expectation[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  align-items: end;\n  gap: 16px;\n  margin: 16px 0;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 650;\n}\nselect[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.verdict[_ngcontent-%COMP%] {\n  background: #eee7d1;\n  margin: 0;\n  padding: 12px;\n  border-radius: 7px;\n  font-weight: 700;\n}\n.met[_ngcontent-%COMP%] {\n  background: #dcedd8;\n}\n.missed[_ngcontent-%COMP%] {\n  background: #ffe5c5;\n}\n.table-scroll[_ngcontent-%COMP%] {\n  overflow: auto;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n  font-size: 13px;\n}\ncaption[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 16px;\n  font-weight: 700;\n  padding: 12px 0;\n}\nth[_ngcontent-%COMP%], \ntd[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 1px solid #d8dfd1;\n}\nth[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 6px;\n  text-align: left;\n  font-size: 13px;\n}\n.selected[_ngcontent-%COMP%] {\n  background: #eef3e5;\n}\n.review-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 12px;\n}\n.review-actions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  flex: 1 1 350px;\n  font-size: 13px;\n}\n.status[_ngcontent-%COMP%], \n.model-note[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin: 10px 0;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n@media (max-width: 700px) {\n  .season-steps[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .expectation[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .step-heading[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .step-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    order: -1;\n    flex-basis: 100%;\n  }\n  .lab-toolbar[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  iframe[_ngcontent-%COMP%] {\n    height: 920px;\n  }\n}\n.toolbar-controls[_ngcontent-%COMP%] {\n  display: contents;\n}\n.marker-panel[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 135px;\n  right: 16px;\n  width: 315px;\n  max-width: calc(100vw - 48px);\n  max-height: calc(100dvh - 165px);\n  overflow: auto;\n  z-index: 55;\n  padding: 15px;\n  color: #423a2c;\n  background: #fbf5e7;\n  border: 1px solid #ae9670;\n  border-radius: 12px;\n  box-shadow: 0 15px 50px rgba(43, 36, 25, 0.2509803922);\n  font-size: 13px;\n}\n.marker-panel[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.marker-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font: 700 21px Georgia, serif;\n  margin: 0;\n}\n.marker-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font: 700 17px Georgia, serif;\n}\n.marker-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  line-height: 1.55;\n}\n.marker-panel[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  line-height: 1.5;\n  color: #6e6351;\n}\n.marker-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 38px;\n  font-size: 13px;\n}\n.marker-panel[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  min-width: 0;\n}\n.marker-panel[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  padding: 12px 0;\n}\n.marker-panel[_ngcontent-%COMP%]   .place-marker[_ngcontent-%COMP%] {\n  background: #5b6646;\n  color: #fffdf2;\n  border-color: #5b6646;\n}\n.marker-coordinates[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.marker-observation[_ngcontent-%COMP%] {\n  border: 1px solid #d6c7a7;\n  border-radius: 9px;\n  padding: 12px;\n  margin-top: 14px;\n  background: #fffaf0;\n}\n.marker-observation[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 95px 1fr;\n  gap: 7px;\n  line-height: 1.4;\n}\n.marker-observation[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #76664d;\n}\n.marker-observation[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.marker-live[_ngcontent-%COMP%] {\n  padding: 8px;\n  background: #e8ead7;\n  border-radius: 5px;\n}\n.marker-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 12px;\n}\n.marker-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  margin-top: 14px;\n}\n.marker-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  text-align: left;\n}\n.marker-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.stone-number[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  min-width: 27px;\n  height: 27px;\n  border: 2px solid #bc9f60;\n  border-radius: 50%;\n  font: 700 15px Georgia, serif;\n}\n.marker-feedback[_ngcontent-%COMP%] {\n  padding: 8px;\n  border-left: 3px solid #b39353;\n}\n@media (max-width: 600px) {\n  .marker-panel[_ngcontent-%COMP%] {\n    top: 150px;\n    right: 8px;\n    max-height: calc(100dvh - 170px);\n  }\n}\n.toolbar-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.toolbar-controls[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.toolbar-menu[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%], \n.standalone-header[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  min-height: 36px;\n  padding: 7px 10px;\n  font-size: 13px;\n}\n.event-select[_ngcontent-%COMP%] {\n  width: 160px;\n}\n.observation[_ngcontent-%COMP%] {\n  font-size: 12px;\n  white-space: nowrap;\n  padding: 0 4px;\n}\n.play[_ngcontent-%COMP%] {\n  background: #e9ce91;\n}\n.toolbar-menu[_ngcontent-%COMP%] {\n  position: relative;\n}\n.toolbar-menu[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  list-style: none;\n  display: grid;\n  place-items: center;\n  box-sizing: border-box;\n  border: 1px solid #c4b699;\n  border-radius: 6px;\n  background: #fffdf7;\n  font-weight: 400;\n}\n.popover[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  width: 225px;\n  display: grid;\n  gap: 6px;\n  padding: 10px;\n  border: 1px solid #bba984;\n  border-radius: 8px;\n  box-shadow: 0 12px 32px rgba(50, 45, 37, 0.2);\n  background: #fffdf7;\n  z-index: 50;\n}\n.popover[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.header-timeline[_ngcontent-%COMP%] {\n  flex: 1 0 100%;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 10px;\n  font-weight: 400;\n}\n.header-timeline[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.header-timeline[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  width: 0;\n  min-height: 16px;\n  padding: 0;\n  margin: 0;\n  accent-color: #9b762f;\n}\n.standalone-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px;\n  padding: 8px;\n  background: #f7f3e8;\n  border: 1px solid #c2b69d;\n}\n.standalone-guide[_ngcontent-%COMP%] {\n  padding: 16px;\n  border: 1px solid #c2b69d;\n  background: #fffaf0;\n}\n.guide-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.demonstration[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 650;\n}\niframe[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 6px;\n  background: #f3efe5;\n}\n@media (max-width: 600px) {\n  .toolbar-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n   .toolbar-controls[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n   .toolbar-menu[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n    padding: 6px 8px;\n    font-size: 12px;\n  }\n  .event-select[_ngcontent-%COMP%] {\n    width: 145px;\n  }\n  .observation[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .header-timeline[_ngcontent-%COMP%] {\n    gap: 6px;\n    font-size: 9px;\n  }\n}\n@media (max-width: 600px) {\n  .popover[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 120px;\n    right: 8px;\n    max-width: calc(100vw - 32px);\n    max-height: calc(100dvh - 140px);\n    overflow: auto;\n  }\n}\n/*# sourceMappingURL=solar-monument.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SolarMonumentComponent, [{
    type: Component,
    args: [{ selector: "app-solar-monument", imports: [FormsModule, NgTemplateOutlet, SolarTimeDialComponent], template: `<ng-template #toolbar>
  @if (weeklyControls()) {
    <ng-container *ngTemplateOutlet="weeklyToolbar" />
  } @else {
    <div class="toolbar-controls">
      @if (presentation() && readOnly()) {
        <button
          (click)="event('june')"
          [disabled]="!ready() || reviewing()"
          [attr.aria-pressed]="selected() === 1"
        >
          June solstice
        </button>
        <button
          (click)="event('dec')"
          [disabled]="!ready() || reviewing()"
          [attr.aria-pressed]="selected() === 3"
        >
          December solstice
        </button>
        @if (surfaceTargets().length) {
          <button (click)="command('targetView')" [disabled]="!ready()">Inspect pillar</button>
        }
        <button (click)="command('shadowView')" [disabled]="!ready()">View whole model</button>
        <button (click)="reviewOpen.set(!reviewOpen())" [attr.aria-expanded]="reviewOpen()">
          Compare {{ matches() }}/4
        </button>
        <output class="observation"
          >{{ ui().date }} <strong>{{ ui().clock }}</strong></output
        >
      } @else {
        <button
          (click)="chooseMode('explore')"
          [class.current]="ui().mode === 'explore'"
          [attr.aria-pressed]="ui().mode === 'explore'"
          [disabled]="!ready() || busy() || reviewing()"
        >
          Explore Earth
        </button>
        @if (!presentation() && !readOnly()) {
          @if (activity() === 'sundial-build') {
            <details class="toolbar-menu" #postMenu>
              <summary>Build</summary>
              <div class="popover">
                <label
                  >Post height (cm)<input
                    #post
                    type="number"
                    min="10"
                    max="200"
                    step="1"
                    [value]="ui().height"
                /></label>
                <button (click)="command('post', +post.value); postMenu.open = false">
                  Build sundial
                </button>
              </div>
            </details>
          } @else if (!activity().startsWith('sundial-')) {
            <button
              (click)="chooseMode('build')"
              [class.current]="ui().mode === 'build'"
              [attr.aria-pressed]="ui().mode === 'build'"
              [disabled]="!ready()"
            >
              Build
            </button>
          }
        }
        <button
          (click)="chooseMode('test')"
          [class.current]="ui().mode === 'test'"
          [attr.aria-pressed]="ui().mode === 'test'"
          [disabled]="!ready()"
        >
          Test sunlight
        </button>
        <button
          (click)="toggleSunDay($event)"
          [attr.aria-expanded]="ui().sunDay"
          [class.current]="ui().sunDay"
          [disabled]="!ready()"
        >
          Sunrise & sunset
        </button>
        <button
          (click)="toggleCenterView($event)"
          [attr.aria-pressed]="ui().centerView"
          [class.current]="ui().centerView"
          [disabled]="!ready() || busy() || reviewing()"
        >
          From center
        </button>
        @if (!activity().startsWith('sundial-') && !ui().centerView && ui().mode === 'test') {
          @if (!presentation()) {
            <button
              (click)="command('morningLight')"
              [disabled]="!ready()"
              title="30 minutes after sunrise"
            >
              Morning light
            </button>
          }
          <button (click)="command('alignmentToggle')" [disabled]="!ready()">Ray guide</button>
          @if (surfaceTargets().length) {
            <button (click)="command('targetView')" [disabled]="!ready()">Inspect pillar</button>
          }
          <button
            (click)="toggleMarkers()"
            [attr.aria-expanded]="markersOpen()"
            [disabled]="!ready()"
          >
            \u2316 Markers \xB7 {{ design().targets.length }}
          </button>
        }
        @if (!presentation() && !ui().centerView && ui().mode === 'test') {
          <button class="play" (click)="command('playBtn')" [disabled]="!ready() || !ui().canPlay">
            {{ ui().play }}
          </button>
          @if (
            !readOnly() && (activity() === 'sundial-build' || activity() === 'sundial-calendar')
          ) {
            <button (click)="command('markDial')" [disabled]="!ready()">
              {{ activity() === 'sundial-calendar' ? 'Mark date' : 'Mark time' }}
            </button>
          }
        }
        @if (ui().mode !== 'explore') {
          <select
            class="event-select"
            [attr.aria-label]="presentation() ? 'Special date' : 'Sun events'"
            [disabled]="!ready()"
            [ngModel]="eventSelection()"
            (ngModelChange)="event($event)"
          >
            @if (!presentation()) {
              <option value="">Events & time</option>
            }
            @if (activity() !== 'sundial-build' || ui().centerView) {
              @for (item of cases; track item.id) {
                <option [value]="item.id">{{ item.label }}</option>
              }
            }
            @if (!presentation() && !ui().centerView) {
              <optgroup label="Time of day">
                <option value="dayStart">Sunrise</option>
                <option value="dialMorning">9 AM</option>
                <option value="noonBtn">Solar noon</option>
                <option value="dialAfternoon">3 PM</option>
                <option value="dayEnd">Sunset</option>
              </optgroup>
              @if (activity() === 'sundial-calendar') {
                <optgroup label="Nearby dates">
                  <option value="dialWeekBefore">A week before</option>
                  <option value="dialWeekAfter">A week after</option>
                </optgroup>
              }
            }
            @if (presentation()) {
              <optgroup label="Nearby dates">
                <option value="nearby-before">A week before</option>
                <option value="special-return">Back to special date</option>
                <option value="nearby-after">A week after</option>
              </optgroup>
            }
            <option value="controlsToggle">Place & date\u2026</option>
          </select>
        }
        <output class="observation" aria-label="Current observation"
          >{{ ui().date }} <strong>{{ ui().clock }}</strong></output
        >
        @if (presentation() && ui().mode === 'test') {
          <button (click)="event('june')" [disabled]="!ready() || reviewing()">
            June solstice
          </button>
          <button (click)="event('dec')" [disabled]="!ready() || reviewing()">
            December solstice
          </button>
        }
        @if (presentation() && !ui().centerView && ui().mode === 'test') {
          <button (click)="reviewOpen.set(!reviewOpen())" [attr.aria-expanded]="reviewOpen()">
            Compare {{ matches() }}/4
          </button>
          @if (!readOnly()) {
            <button
              (click)="recordReview()"
              [disabled]="!configured() || recorded() || reviewing()"
            >
              {{ recorded() ? 'Saved' : 'Save comparison' }}
            </button>
          }
        } @else if (!readOnly() && !ui().centerView && ui().mode === 'test') {
          <button
            (click)="capture()"
            [disabled]="!ready() || busy() || (!design().blocks.length && !design().displayObject)"
          >
            {{ busy() ? 'Saving\u2026' : 'Save test' }}
          </button>
        }
        <details class="toolbar-menu" #viewMenu>
          <summary>Tools</summary>
          <div class="popover">
            <button (click)="command('shadowView'); viewMenu.open = false">See shadows</button>
            <button (click)="command('topView'); viewMenu.open = false">View from above</button>
            <button (click)="command('fitView'); viewMenu.open = false">Fit model</button>
            @if (activity().startsWith('sundial-') && !ui().centerView) {
              <button
                (click)="command('returnDial'); viewMenu.open = false"
                [disabled]="!ui().canReturn"
              >
                Return to marking day
              </button>
              @if (activity() === 'sundial-build' || activity() === 'sundial-calendar') {
                <button
                  (click)="command('undoDial'); viewMenu.open = false"
                  [disabled]="readOnly() || !ui().canUndo"
                >
                  Remove last mark
                </button>
              }
            }
            @if (!presentation() && !ui().centerView) {
              <label
                >Playback speed<select
                  aria-label="Playback speed"
                  (change)="command('speed', $any($event.target).value)"
                >
                  <option value="0.5">Slow</option>
                  <option value="1" selected>Normal</option>
                  <option value="2">Fast</option>
                </select></label
              >
            }
            @if (presentation() && !ui().centerView) {
              <button
                (click)="runReview(); viewMenu.open = false"
                [disabled]="!ready() || reviewing()"
              >
                Recheck four dates
              </button>
            }
          </div>
        </details>
        @if (!presentation() && !ui().centerView && ui().mode === 'test') {
          <app-solar-time-dial
            class="header-time-dial"
            [start]="ui().start"
            [end]="ui().end"
            [minutes]="ui().minutes"
            [clock]="ui().clock"
            [startLabel]="ui().startLabel"
            [endLabel]="ui().endLabel"
            [disabled]="!ready() || !ui().canPlay"
            (changed)="command('minutes', $event)"
          />
        }
      }
    </div>
  }
</ng-template>
<ng-template #weeklyToolbar>
  <div class="week-controls">
    <app-solar-time-dial
      class="time-dial"
      [start]="ui().start"
      [end]="ui().end"
      [minutes]="ui().minutes"
      [clock]="ui().clock"
      [startLabel]="ui().startLabel"
      [endLabel]="ui().endLabel"
      [disabled]="!ready() || !ui().canPlay"
      (changed)="command('minutes', $event)"
    />
    @if (questTools().length) {
      <div class="week-actions" aria-label="Level tools">
        @if (questTools().includes('post') && activity() === 'sundial-build') {
          <details class="toolbar-menu" #postMenu>
            <summary>Post height</summary>
            <div class="popover">
              <label
                >Post height (cm)<input
                  #height
                  type="number"
                  min="10"
                  max="200"
                  [value]="ui().height"
              /></label>
              <button
                (click)="command('post', +height.value); postMenu.open = false"
                [disabled]="!ready() || ui().centerView"
              >
                Build sundial
              </button>
            </div>
          </details>
        }
        @if (questTools().includes('build') && !activity().startsWith('sundial-')) {
          <button
            (click)="chooseMode(ui().mode === 'build' ? 'test' : 'build')"
            [disabled]="!ready()"
            [attr.aria-pressed]="ui().mode === 'build'"
          >
            {{ ui().mode === 'build' ? 'Done editing' : 'Edit build' }}
          </button>
        }
        @if (questTools().includes('markers') && !activity().startsWith('sundial-')) {
          <button
            (click)="toggleMarkers()"
            [disabled]="!canMark()"
            [attr.aria-expanded]="markersOpen()"
          >
            Markers \xB7 {{ design().targets.length }}
          </button>
        }
      </div>
    }
    <div class="week-views" aria-label="Sun views">
      <button
        (click)="toggleSunDay($event)"
        [disabled]="!ready()"
        [attr.aria-expanded]="ui().sunDay"
      >
        Sun path \xB7 sunrise & sunset
      </button>
      <button
        (click)="toggleCenterView($event)"
        [disabled]="!ready()"
        [attr.aria-pressed]="ui().centerView"
      >
        {{ ui().centerView ? 'Return to model' : 'From center' }}
      </button>
      <button
        (click)="chooseMode('explore')"
        [disabled]="!ready()"
        [attr.aria-pressed]="ui().mode === 'explore'"
      >
        Earth & Sun view
      </button>
      <details class="toolbar-menu" #more>
        <summary>More tools</summary>
        <div class="popover">
          <button (click)="command('morningLight'); more.open = false">
            Morning light \xB7 sunrise +30 min
          </button>
          <button (click)="command('alignmentToggle'); more.open = false">Ray guide</button>
          @if (surfaceTargets().length) {
            <button (click)="command('targetView'); more.open = false">Inspect pillar</button>
          }
          <button (click)="command('topView'); more.open = false">View from above</button>
          <button (click)="command('fitView'); more.open = false">Fit model</button>
          @if (activity().startsWith('sundial-')) {
            <button (click)="command('undoDial')" [disabled]="!ui().canUndo">
              Remove last mark
            </button>
          }
        </div>
      </details>
    </div>
    @if (ui().mode === 'explore') {
      <small
        >Earth view has day/year options below. Play day returns to the monument\u2019s daily Sun.</small
      >
    }
    @if (ui().centerView) {
      <small
        >Play the full day from the center, or use the sunrise offset below. Return to model to save
        a test.</small
      >
    }
  </div>
</ng-template>
@if (seasonPictures().length) {
  <section
    class="season-pictures"
    role="dialog"
    aria-modal="true"
    aria-labelledby="pictureTitle"
    (keydown.escape)="closePictures(); $event.stopPropagation()"
    (keydown.tab)="$event.preventDefault()"
  >
    <header>
      <div>
        <small>SAME DESIGN \xB7 SAME CAMERA</small>
        <h2 id="pictureTitle">June & December</h2>
      </div>
      <button #pictureClose (click)="closePictures()" aria-label="Close seasonal pictures">
        \xD7
      </button>
    </header>
    <div class="picture-grid">
      @for (picture of seasonPictures(); track $index) {
        <figure>
          <img
            [src]="picture.src"
            [alt]="
              $index === 0
                ? 'The monument under June sunlight'
                : 'The monument under December sunlight'
            "
          />
          <figcaption>{{ picture.caption }}</figcaption>
        </figure>
      }
    </div>
    <p>
      Frozen previews from the current viewpoint. These pictures are separate from recorded tests.
    </p>
  </section>
}
@if (!onChrome) {
  <header class="standalone-header" aria-label="Simulation controls">
    <ng-container *ngTemplateOutlet="toolbar" /><button
      (click)="toolsOpen.set(!toolsOpen())"
      [attr.aria-expanded]="toolsOpen()"
    >
      Guide
    </button>
  </header>
  @if (toolsOpen()) {
    <aside class="standalone-guide"><ng-container *ngTemplateOutlet="guide" /></aside>
  }
}
<iframe
  #frame
  title="Interactive globe, Sun and Moon paths, and monument shadows"
  src="/simulations/solar-monument/index.html"
  [style.height.px]="frameHeight()"
  (load)="connect()"
></iframe>
@if (markersOpen() && !ui().centerView) {
  <aside
    #markerPanel
    class="marker-panel"
    aria-label="Solar calendar markers"
    tabindex="-1"
    (keydown.escape)="closeMarkers()"
  >
    <header>
      <h2>Calendar sunstones</h2>
      <button (click)="closeMarkers()" aria-label="Close markers">\xD7</button>
    </header>
    @if (canMark()) {
      <p>Carve a ring around a light patch or shadow. Its arrow remembers where the Sun was.</p>
      <button
        class="place-marker"
        (click)="startMarker()"
        [disabled]="design().targets.length >= 12"
      >
        \u2316 Place on the floor
      </button>
      @if (design().targets.length >= 12) {
        <p>Your court has 12 markers. Remove one to make space.</p>
      }
      @if (markerPlacing()) {
        <p role="status">
          Click the floor, or use the canvas arrow keys and Enter. Shift makes smaller steps.
        </p>
        <button (click)="cancelMarkerDraft()">Cancel placing</button>
      }
      <details>
        <summary>Place by measurements</summary>
        <div class="marker-coordinates">
          <label
            >East / west (cm)<input
              type="number"
              min="-1200"
              max="1200"
              step="1"
              [(ngModel)]="markerX"
          /></label>
          <label
            >South / north (cm)<input
              type="number"
              min="-1200"
              max="1200"
              step="1"
              [(ngModel)]="markerZ"
          /></label>
        </div>
        <small>Negative numbers mean west and north.</small>
        <button (click)="measuredMarker()">Preview this position</button>
      </details>
    }
    @if (markerTarget(); as target) {
      <section class="marker-observation" aria-label="Marker observation">
        @if (canMark()) {
          <label
            >Stone name<input
              #markerNameInput
              maxlength="80"
              [(ngModel)]="markerName"
              (change)="renameMarker()"
          /></label>
        } @else {
          <h3>{{ target.label }}</h3>
        }
        @if (markerRecord(); as record) {
          <p class="marker-date">
            {{ markerWhen(record) }}<br /><small>{{ record.zone }}</small>
          </p>
          <dl>
            <dt>Recorded light</dt>
            <dd>{{ record.light }}</dd>
            <dt>Sun height</dt>
            <dd>{{ record.sunAltitude.toFixed(1) }}\xB0 above the horizon</dd>
            <dt>Sun direction</dt>
            <dd>{{ record.sunAzimuth.toFixed(1) }}\xB0 clockwise from north</dd>
            <dt>Place</dt>
            <dd>{{ record.latitude.toFixed(2) }}\xB0, {{ record.longitude.toFixed(2) }}\xB0</dd>
          </dl>
          @if (!markerDraft() && markerNow()) {
            <p class="marker-live" role="status">
              <strong>Light here now: {{ markerNow() }}</strong
              ><br />{{
                markerNow() === record.light
                  ? 'Same light as your record.'
                  : 'Different from your record. What changed?'
              }}
            </p>
          }
        } @else {
          <p>
            This is a fixed {{ target.y ? 'surface' : 'ground' }} target without a saved Sun
            observation.
          </p>
          @if (markerNow()) {
            <p role="status">
              <strong>Light here now: {{ markerNow() }}</strong>
            </p>
          }
        }
        <small
          >Target: {{ (target.x * 100).toFixed(1) }} cm east, {{ (target.z * 100).toFixed(1) }} cm
          south, {{ ((target.y ?? 0) * 100).toFixed(1) }} cm high.</small
        >
        @if (markerDraft()) {
          <div class="marker-actions">
            <button class="place-marker" (click)="saveMarker()">Carve marker</button
            ><button (click)="cancelMarkerDraft()">Discard</button>
          </div>
        } @else {
          <div class="marker-actions">
            @if (markerRecord() && !presentation()) {
              <button (click)="revisitMarker()">\u21B6 Show recorded Sun</button>
            }
            @if (canMark() && markerSeason(); as season) {
              <button (click)="useMarkerForTest()">Use for {{ season.label }}</button>
            }
            @if (canMark()) {
              <button (click)="removeMarker()">Remove stone</button>
            }
          </div>
        }
      </section>
    }
    @if (markerFeedback()) {
      <p class="marker-feedback" role="status">{{ markerFeedback() }}</p>
    }
    @if (removedMarker() && canMark()) {
      <button (click)="undoMarker()">Undo remove</button>
    }
    <div class="marker-list" aria-label="Saved calendar stones">
      @for (target of design().targets; track target.id; let i = $index) {
        <button
          [class.current]="markerSelected() === target.id && !markerDraft()"
          (click)="selectMarker(target)"
        >
          <span class="stone-number">{{ i + 1 }}</span
          ><span
            >{{ target.label }}<small>{{ markerWhen(recordFor(target)) }}</small></span
          >
        </button>
      } @empty {
        <p>Your first sunstone will appear here.</p>
      }
    </div>
  </aside>
}
@if (presentation()) {
  <section class="demonstration" [hidden]="!reviewOpen()" aria-label="Comparison and expectations">
    <div class="expectation">
      <label
        >Target for this date<select
          [disabled]="readOnly()"
          [ngModel]="checkFor(cases[selected()].id)?.targetId || ''"
          (ngModelChange)="changeCheck(cases[selected()].id, 'targetId', $event)"
        >
          <option value="">Choose a ground target</option>
          @for (target of design().targets; track target.id) {
            <option [value]="target.id">{{ target.label }}</option>
          }
        </select></label
      >
      <label
        >What should happen?<select
          [disabled]="readOnly()"
          [ngModel]="checkFor(cases[selected()].id)?.expectedValue || 'shadow'"
          (ngModelChange)="changeCheck(cases[selected()].id, 'expectedValue', $event)"
        >
          <option value="shadow">Target centre is in shadow</option>
          <option value="sunlight">Target centre receives sunlight</option>
          <option value="red light">Ruby red light reaches the target</option>
          <option value="amber light">Amber light reaches the target</option>
          <option value="green light">Emerald green light reaches the target</option>
          <option value="blue light">Sapphire blue light reaches the target</option>
          <option value="violet light">Amethyst violet light reaches the target</option>
          <option value="mixed filters">Light passes through multiple colors</option>
        </select></label
      >
      <p
        class="verdict"
        [class.met]="outcome() === 'met'"
        [class.missed]="outcome() === 'missed'"
        role="status"
      >
        {{ reviewing() ? 'Calculating\u2026' : resultLabel(current()) }}
      </p>
    </div>
    @if (!design().targets.length) {
      <p>Return to building and open Markers to carve a seasonal target into the floor.</p>
    }
    @if (checkFor(cases[selected()].id); as check) {
      <div class="expectation">
        <label
          >When to test<select
            [disabled]="readOnly()"
            [ngModel]="check.settings?.['observationRule'] || 'noon'"
            (ngModelChange)="changeTime(check.scenarioId, $event)"
          >
            <option value="noon">Solar noon \xB7 highest Sun</option>
            <option value="morning">30 minutes after sunrise</option>
            <option value="evening">30 minutes before sunset</option>
            <option value="clock">Choose a clock time</option>
          </select></label
        >
        @if (check.settings?.['observationRule'] === 'clock') {
          <label
            >Local clock time<input
              type="time"
              step="any"
              [disabled]="readOnly()"
              [value]="clockFor(check.scenarioId)"
              (change)="changeTime(check.scenarioId, 'clock', $any($event.target).value)"
          /></label>
        }
      </div>
    }
    <details class="model-note">
      <summary>Does it mark this date precisely?</summary>
      <p>
        Use the same time rule a week before and after. If all three dates match, the monument marks
        a range of dates.
      </p>
      <p>
        One week before: <strong>{{ measurement(current(), '7 days before') }}</strong
        >. One week after: <strong>{{ measurement(current(), '7 days after') }}</strong
        >.
      </p>
    </details>
    @if (design().displayObject) {
      <p>
        <strong>Sculpture at this Sun angle:</strong>
        {{ measurement(current(), 'Sculpture surface samples') }}. Samples describe face centres;
        compare the full illuminated surface in the canvas.
      </p>
    }
    <div class="table-scroll">
      <table>
        <caption>
          Compare the same monument at all four seasonal dates
        </caption>
        <thead>
          <tr>
            <th>Special date</th>
            <th>Sun altitude</th>
            <th>Observation</th>
            <th>Shadow reference</th>
            <th>Target</th>
            <th>Expected</th>
            <th>Observed</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          @for (result of results(); track result.id; let i = $index) {
            <tr [class.selected]="selected() === i">
              <th>
                {{ cases[i].label }}
              </th>
              <td>{{ measurement(result, 'Sun altitude') }}</td>
              <td>{{ measurement(result, 'Observation') }}</td>
              <td>{{ measurement(result, 'Height-only shadow reference') }}</td>
              <td>{{ measurement(result, 'Target') }}</td>
              <td>{{ measurement(result, 'Expected') }}</td>
              <td>{{ measurement(result, 'Observed at target centre') }}</td>
              <td>{{ resultLabel(result) }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    <div class="review-actions">
      <p>
        {{ matches() }}/4 expectations match. A match tests the target centre; nearby-date tests
        show how precisely your monument marks the calendar.
      </p>
    </div>
  </section>
}
@if (
  status().includes('could not') ||
  status().includes('did not') ||
  status().includes('Trial added') ||
  status().includes('recorded') ||
  status().includes('STATE_')
) {
  <p class="status" role="status">{{ status() }}</p>
}
@if (ui().message) {
  <p class="status" role="status">{{ ui().message }}</p>
}
<ng-template #guide>
  <h3>Canvas guide</h3>
  @if (presentation() && readOnly()) {
    <label
      >Compare another date
      <select
        class="event-select"
        aria-label="Special date"
        [ngModel]="eventSelection()"
        (ngModelChange)="event($event)"
        [disabled]="!ready()"
      >
        @for (item of cases; track item.id) {
          <option [value]="item.id">{{ item.label }}</option>
        }
        <option value="nearby-before">A week before</option>
        <option value="special-return">Back to special date</option>
        <option value="nearby-after">A week after</option>
      </select>
    </label>
    <div class="guide-actions">
      <button (click)="toggleSunDay($event)" [attr.aria-expanded]="ui().sunDay">
        Sunrise & sunset
      </button>
      <button (click)="toggleCenterView($event)" [attr.aria-pressed]="ui().centerView">
        From center
      </button>
      <button (click)="command('alignmentToggle')">Ray guide</button>
    </div>
  }
  <p>
    {{
      presentation()
        ? 'Compare June and December in the header. Use the date options in this guide to inspect nearby days.'
        : 'Play a day, pause, and follow the shadow.'
    }}
    Drag to turn the scene; scroll or use + / \u2212 to zoom.
  </p>
  <div class="guide-actions">
    @if (!['sundial-build', 'sundial-seasons'].includes(activity())) {
      <button (click)="command('earthToggle')">Earth\u2019s tilt</button>
    }
    <button (click)="command('extras')">Views & measurements</button>
  </div>
  <details class="model-note">
    <summary>How to interpret the model</summary>
    <p>
      Level ground, true north and direct sunlight. Each target checks its centre. A longer shadow
      may cover several markers, so test nearby dates too. Trees, terrain, clouds and block
      stability are not simulated. Compare with an outdoor build before claiming a physical accuracy
      tolerance. Cylindrical holes have their measured depth. Glass and jewel inserts filter
      parallel sunlight; displayed colors are illustrative RGB transmission. Lens focusing,
      refraction, prism rainbows, the Sun\u2019s finite disk and soft shadow edges are not modeled.
      Sculpture shapes and materials are selectable built-in models, and the saved design includes
      their dimensions and orientation. The stone court has decorative compass carvings; its rings
      are not calibrated seasonal markers. Surface texture adds the look of shallow carving while
      the measured floor stays level. Sunrise and sunset labels use the apparent horizon; direct
      rays use the Sun\u2019s centre above the geometric horizon. Very long shadows can extend beyond the
      view near sunrise and sunset.
    </p>
  </details>
</ng-template>
`, styles: ["/* src/app/plugins/simulations/solar-monument/solar-monument.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n  color: #3b3e32;\n}\n.week-controls {\n  display: contents;\n}\n.week-controls > :is(div, label, small) {\n  padding: 8px 14px;\n  background: #fffdf7;\n}\n.week-controls > small {\n  display: block;\n}\n.week-controls .week-actions {\n  position: sticky;\n  top: var(--solar-toolbar-top, 0px);\n  z-index: 35;\n  border-bottom: 1px solid #dce0d4;\n}\n.week-controls :is(button, select, summary, input) {\n  scroll-margin-top: calc(var(--solar-toolbar-top, 0px) + 110px);\n}\n.week-actions,\n.week-views,\n.week-time {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 7px;\n}\n.week-controls button,\n.week-controls summary,\n.week-controls select {\n  min-height: 38px;\n  font-size: 12px;\n}\n.week-controls label {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin: 0;\n  font-size: 12px;\n}\n.week-controls select {\n  max-width: 175px;\n}\n.week-controls .play {\n  background: #295e52;\n  color: white;\n  border-color: #295e52;\n  font-weight: 700;\n}\n.week-controls .week-timeline {\n  display: grid;\n  grid-template-columns: auto minmax(60px, 1fr) auto;\n  gap: 8px;\n}\n.week-timeline input {\n  width: 100%;\n  min-width: 0;\n  accent-color: #a36b20;\n}\n.week-timeline span,\n.week-controls small {\n  font-size: 11px;\n}\n.week-time output {\n  font-size: 12px;\n}\n.time-dial {\n  display: block;\n  width: 100%;\n  box-sizing: border-box;\n  padding: 8px 14px 4px;\n  background: #fffdf7;\n}\n.header-time-dial {\n  display: block;\n  flex: 1 0 100%;\n  width: 100%;\n}\n@media (max-width: 520px) {\n  .week-controls .week-timeline {\n    grid-template-columns: 1fr 1fr;\n  }\n  .week-timeline input {\n    grid-column: 1/-1;\n    grid-row: 1;\n  }\n  .week-timeline span:last-child {\n    text-align: right;\n  }\n  .week-time output {\n    flex-basis: 100%;\n  }\n}\n.season-pictures {\n  position: fixed;\n  inset: 12px;\n  z-index: 200;\n  padding: 18px;\n  overflow: auto;\n  background: #fffaf0;\n  color: #264b4e;\n  border: 1px solid #b8b49c;\n  border-radius: 12px;\n  box-shadow: 0 0 0 100vmax rgba(21, 56, 64, 0.6901960784);\n}\n.season-pictures header {\n  position: sticky;\n  top: -18px;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  background: #fffaf0;\n  padding: 10px 0;\n}\n.season-pictures small {\n  font-size: 10px;\n  letter-spacing: 0.12em;\n}\n.season-pictures h2 {\n  margin: 4px 0;\n  font: 28px Georgia, serif;\n}\n.season-pictures header button {\n  min-width: 44px;\n  font-size: 26px;\n}\n.picture-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.picture-grid figure {\n  min-width: 0;\n  margin: 0;\n}\n.picture-grid img {\n  width: 100%;\n  display: block;\n  border-radius: 8px;\n}\n.picture-grid figcaption,\n.season-pictures p {\n  margin: 8px 0;\n  font: 12px/1.5 system-ui, sans-serif;\n}\n@media (max-width: 650px) {\n  .season-pictures {\n    inset: 8px;\n    padding: 12px;\n  }\n  .season-pictures header {\n    top: -12px;\n  }\n  .picture-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.lab-toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  padding: 12px 16px;\n  background:\n    linear-gradient(\n      120deg,\n      #363e33,\n      #535342);\n  color: #fcf4df;\n  border: 1px solid #a99265;\n  border-radius: 12px 12px 0 0;\n}\n.lab-toolbar p {\n  font-size: 13px;\n  margin: 4px 0 0;\n}\nbutton,\nselect,\ninput {\n  font: inherit;\n  min-height: 42px;\n  border: 1px solid #c4b699;\n  border-radius: 7px;\n  padding: 8px 12px;\n  color: #3b3e32;\n  background: #fffdf7;\n}\nbutton {\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.55;\n  cursor: default;\n}\nbutton:focus-visible,\nselect:focus-visible,\ninput:focus-visible {\n  outline: 3px solid #be7920;\n  outline-offset: 3px;\n}\n.lab-toolbar button,\n.review-actions button:last-child {\n  background: #f4c363;\n}\niframe {\n  width: 100%;\n  height: 790px;\n  border: 1px solid #b3a381;\n  box-sizing: border-box;\n  display: block;\n  background: #07131a;\n}\n.season-steps {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 6px;\n  padding: 10px 0;\n}\n.season-steps button {\n  text-align: left;\n}\n.season-steps span,\n.season-steps small {\n  display: block;\n}\n.season-steps small {\n  font-size: 11px;\n  margin-top: 5px;\n}\n.current {\n  background: #454c3c;\n  color: white;\n}\n.demonstration {\n  background: #fffdf7;\n  padding: 16px;\n  border: 1px solid #c5d0bd;\n  border-radius: 0 0 12px 12px;\n}\n.step-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\nh3 {\n  margin: 0;\n}\np {\n  line-height: 1.5;\n}\n.step-heading p {\n  font-size: 13px;\n  margin: 5px 0;\n}\n.expectation {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  align-items: end;\n  gap: 16px;\n  margin: 16px 0;\n}\nlabel {\n  display: grid;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 650;\n}\nselect {\n  width: 100%;\n}\n.verdict {\n  background: #eee7d1;\n  margin: 0;\n  padding: 12px;\n  border-radius: 7px;\n  font-weight: 700;\n}\n.met {\n  background: #dcedd8;\n}\n.missed {\n  background: #ffe5c5;\n}\n.table-scroll {\n  overflow: auto;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n  font-size: 13px;\n}\ncaption {\n  text-align: left;\n  font-size: 16px;\n  font-weight: 700;\n  padding: 12px 0;\n}\nth,\ntd {\n  padding: 10px;\n  border-bottom: 1px solid #d8dfd1;\n}\nth button {\n  padding: 6px;\n  text-align: left;\n  font-size: 13px;\n}\n.selected {\n  background: #eef3e5;\n}\n.review-actions {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 12px;\n}\n.review-actions p {\n  flex: 1 1 350px;\n  font-size: 13px;\n}\n.status,\n.model-note {\n  font-size: 13px;\n  margin: 10px 0;\n}\nsummary {\n  cursor: pointer;\n}\n@media (max-width: 700px) {\n  .season-steps {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .expectation {\n    grid-template-columns: 1fr;\n  }\n  .step-heading {\n    flex-wrap: wrap;\n  }\n  .step-heading > div {\n    order: -1;\n    flex-basis: 100%;\n  }\n  .lab-toolbar {\n    flex-wrap: wrap;\n  }\n  iframe {\n    height: 920px;\n  }\n}\n.toolbar-controls {\n  display: contents;\n}\n.marker-panel {\n  position: fixed;\n  top: 135px;\n  right: 16px;\n  width: 315px;\n  max-width: calc(100vw - 48px);\n  max-height: calc(100dvh - 165px);\n  overflow: auto;\n  z-index: 55;\n  padding: 15px;\n  color: #423a2c;\n  background: #fbf5e7;\n  border: 1px solid #ae9670;\n  border-radius: 12px;\n  box-shadow: 0 15px 50px rgba(43, 36, 25, 0.2509803922);\n  font-size: 13px;\n}\n.marker-panel header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.marker-panel h2 {\n  font: 700 21px Georgia, serif;\n  margin: 0;\n}\n.marker-panel h3 {\n  font: 700 17px Georgia, serif;\n}\n.marker-panel p {\n  line-height: 1.55;\n}\n.marker-panel small {\n  display: block;\n  line-height: 1.5;\n  color: #6e6351;\n}\n.marker-panel button {\n  min-height: 38px;\n  font-size: 13px;\n}\n.marker-panel input {\n  width: 100%;\n  box-sizing: border-box;\n  min-width: 0;\n}\n.marker-panel summary {\n  padding: 12px 0;\n}\n.marker-panel .place-marker {\n  background: #5b6646;\n  color: #fffdf2;\n  border-color: #5b6646;\n}\n.marker-coordinates {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.marker-observation {\n  border: 1px solid #d6c7a7;\n  border-radius: 9px;\n  padding: 12px;\n  margin-top: 14px;\n  background: #fffaf0;\n}\n.marker-observation dl {\n  display: grid;\n  grid-template-columns: 95px 1fr;\n  gap: 7px;\n  line-height: 1.4;\n}\n.marker-observation dt {\n  color: #76664d;\n}\n.marker-observation dd {\n  margin: 0;\n}\n.marker-live {\n  padding: 8px;\n  background: #e8ead7;\n  border-radius: 5px;\n}\n.marker-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 12px;\n}\n.marker-list {\n  display: grid;\n  gap: 6px;\n  margin-top: 14px;\n}\n.marker-list button {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  text-align: left;\n}\n.marker-list small {\n  font-size: 11px;\n}\n.stone-number {\n  display: grid;\n  place-items: center;\n  min-width: 27px;\n  height: 27px;\n  border: 2px solid #bc9f60;\n  border-radius: 50%;\n  font: 700 15px Georgia, serif;\n}\n.marker-feedback {\n  padding: 8px;\n  border-left: 3px solid #b39353;\n}\n@media (max-width: 600px) {\n  .marker-panel {\n    top: 150px;\n    right: 8px;\n    max-height: calc(100dvh - 170px);\n  }\n}\n.toolbar-controls button,\n.toolbar-controls select,\n.toolbar-menu > summary,\n.standalone-header > button {\n  min-height: 36px;\n  padding: 7px 10px;\n  font-size: 13px;\n}\n.event-select {\n  width: 160px;\n}\n.observation {\n  font-size: 12px;\n  white-space: nowrap;\n  padding: 0 4px;\n}\n.play {\n  background: #e9ce91;\n}\n.toolbar-menu {\n  position: relative;\n}\n.toolbar-menu > summary {\n  list-style: none;\n  display: grid;\n  place-items: center;\n  box-sizing: border-box;\n  border: 1px solid #c4b699;\n  border-radius: 6px;\n  background: #fffdf7;\n  font-weight: 400;\n}\n.popover {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  width: 225px;\n  display: grid;\n  gap: 6px;\n  padding: 10px;\n  border: 1px solid #bba984;\n  border-radius: 8px;\n  box-shadow: 0 12px 32px rgba(50, 45, 37, 0.2);\n  background: #fffdf7;\n  z-index: 50;\n}\n.popover button {\n  text-align: left;\n}\n.header-timeline {\n  flex: 1 0 100%;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 10px;\n  font-weight: 400;\n}\n.header-timeline span {\n  white-space: nowrap;\n}\n.header-timeline input {\n  flex: 1;\n  width: 0;\n  min-height: 16px;\n  padding: 0;\n  margin: 0;\n  accent-color: #9b762f;\n}\n.standalone-header {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px;\n  padding: 8px;\n  background: #f7f3e8;\n  border: 1px solid #c2b69d;\n}\n.standalone-guide {\n  padding: 16px;\n  border: 1px solid #c2b69d;\n  background: #fffaf0;\n}\n.guide-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.demonstration > summary {\n  font-size: 13px;\n  font-weight: 650;\n}\niframe {\n  border: 0;\n  border-radius: 6px;\n  background: #f3efe5;\n}\n@media (max-width: 600px) {\n  .toolbar-controls button,\n  .toolbar-controls select,\n  .toolbar-menu > summary {\n    padding: 6px 8px;\n    font-size: 12px;\n  }\n  .event-select {\n    width: 145px;\n  }\n  .observation {\n    font-size: 11px;\n  }\n  .header-timeline {\n    gap: 6px;\n    font-size: 9px;\n  }\n}\n@media (max-width: 600px) {\n  .popover {\n    position: fixed;\n    top: 120px;\n    right: 8px;\n    max-width: calc(100vw - 32px);\n    max-height: calc(100dvh - 140px);\n    overflow: auto;\n  }\n}\n/*# sourceMappingURL=solar-monument.component.css.map */\n"] }]
  }], () => [], { design: [{ type: Input, args: [{ isSignal: true, alias: "design", required: true }] }], restore: [{ type: Input, args: [{ isSignal: true, alias: "restore", required: false }] }], checks: [{ type: Input, args: [{ isSignal: true, alias: "checks", required: false }] }], active: [{ type: Input, args: [{ isSignal: true, alias: "active", required: false }] }], presentation: [{ type: Input, args: [{ isSignal: true, alias: "presentation", required: false }] }], readOnly: [{ type: Input, args: [{ isSignal: true, alias: "readOnly", required: false }] }], building: [{ type: Input, args: [{ isSignal: true, alias: "building", required: false }] }], activity: [{ type: Input, args: [{ isSignal: true, alias: "activity", required: false }] }], weeklyControls: [{ type: Input, args: [{ isSignal: true, alias: "weeklyControls", required: false }] }], workspaceKey: [{ type: Input, args: [{ isSignal: true, alias: "workspaceKey", required: false }] }], walkthrough: [{ type: Input, args: [{ isSignal: true, alias: "walkthrough", required: false }] }], quest: [{ type: Input, args: [{ isSignal: true, alias: "quest", required: false }] }], questCompleted: [{ type: Input, args: [{ isSignal: true, alias: "questCompleted", required: false }] }], toolbar: [{ type: ViewChild, args: ["toolbar", { isSignal: true }] }], guide: [{ type: ViewChild, args: ["guide", { isSignal: true }] }], pictureClose: [{ type: ViewChild, args: ["pictureClose", { isSignal: true }] }], markerPanel: [{ type: ViewChild, args: ["markerPanel", { isSignal: true }] }], markerNameInput: [{ type: ViewChild, args: ["markerNameInput", { isSignal: true }] }], frame: [{ type: ViewChild, args: ["frame", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SolarMonumentComponent, { className: "SolarMonumentComponent", filePath: "src/app/plugins/simulations/solar-monument/solar-monument.component.ts", lineNumber: 58 });
})();

export {
  SolarMonumentComponent
};
//# debugId=33746c8b-6c75-5f39-a900-bddc674a457c
//# sourceMappingURL=chunk-L272B73U.js.map
