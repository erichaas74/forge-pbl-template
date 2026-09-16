import {
  AutomationRuntimeService,
  allCommands,
  calculate,
  commandExpression,
  compileProgram,
  decimalAndFraction,
  evidenceIsCorrect,
  expectedMath,
  mathTools,
  moveMathOperations,
  transformCommands
} from "./chunk-IORUS3HC.js";
import {
  sampleRobotReplay
} from "./chunk-4K7YHKFF.js";
import {
  sampleCourseActor
} from "./chunk-3ZI5RM4E.js";
import {
  WorkspaceToolsComponent
} from "./chunk-NDJR5R7S.js";
import {
  PROJECT_LESSON_FOCUS,
  bindLessonFocus
} from "./chunk-3C62DQOL.js";
import {
  TaskGuideComponent
} from "./chunk-FBZ4EUOY.js";
import {
  DecimalPipe,
  NgTemplateOutlet
} from "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgZone,
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
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryAdvance,
  ɵɵreadContextLet,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstoreLet,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtextInterpolate4,
  ɵɵtextInterpolate5,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/programming-automation/runtime/robot-replay.service.ts
var RobotReplayService = class _RobotReplayService {
  trial = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "trial" }] : (
      /* istanbul ignore next */
      []
    )
  );
  timeMs = signal(
    0,
    ...ngDevMode ? [{ debugName: "timeMs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playing = signal(
    false,
    ...ngDevMode ? [{ debugName: "playing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  speed = signal(
    1,
    ...ngDevMode ? [{ debugName: "speed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  frame;
  last = 0;
  current = computed(
    () => sampleRobotReplay(this.trial()?.pathSamples ?? [], this.timeMs()),
    ...ngDevMode ? [{ debugName: "current" }] : (
      /* istanbul ignore next */
      []
    )
  );
  duration = computed(
    () => this.trial()?.pathSamples.at(-1)?.timeMs ?? 0,
    ...ngDevMode ? [{ debugName: "duration" }] : (
      /* istanbul ignore next */
      []
    )
  );
  load(trial, autoplay = false) {
    this.pause();
    this.trial.set(trial);
    this.timeMs.set(0);
    if (autoplay)
      this.play();
  }
  play() {
    if (!this.trial() || this.playing())
      return;
    if (this.timeMs() >= this.duration())
      this.timeMs.set(0);
    this.playing.set(true);
    this.last = performance.now();
    this.frame = requestAnimationFrame((time) => this.tick(time));
  }
  pause() {
    this.playing.set(false);
    if (this.frame !== void 0)
      cancelAnimationFrame(this.frame);
  }
  reset() {
    this.pause();
    this.timeMs.set(0);
  }
  seek(value) {
    this.pause();
    this.timeMs.set(Math.max(0, Math.min(value, this.duration())));
  }
  step() {
    this.pause();
    const next = this.commandBoundaries().find((time) => time > this.timeMs());
    this.timeMs.set(next ?? this.duration());
  }
  stepBack() {
    this.pause();
    const previous = [...this.commandBoundaries()].reverse().find((time) => time < this.timeMs());
    this.timeMs.set(previous ?? 0);
  }
  // Completion events preserve boundaries even when a loop repeats the same command ID.
  commandBoundaries = computed(
    () => {
      const trial = this.trial();
      const completions = trial?.events.filter((event) => event.message.includes(" complete \xB7 (")) ?? [];
      const samples = trial?.pathSamples ?? [];
      const times = completions.length ? completions.map((event) => event.timeMs) : samples.filter((sample, index) => index === 0 || sample.activeCommandId !== samples[index - 1].activeCommandId).map((sample) => sample.timeMs);
      return [0, ...times];
    },
    ...ngDevMode ? [{ debugName: "commandBoundaries" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ngOnDestroy() {
    this.pause();
  }
  tick(time) {
    if (!this.playing())
      return;
    const next = Math.min(this.duration(), this.timeMs() + (time - this.last) * this.speed());
    this.last = time;
    this.timeMs.set(next);
    if (next >= this.duration())
      this.pause();
    else
      this.frame = requestAnimationFrame((now) => this.tick(now));
  }
  static \u0275fac = function RobotReplayService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RobotReplayService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RobotReplayService, factory: _RobotReplayService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RobotReplayService, [{
    type: Injectable
  }], null, null);
})();

// src/app/templates/programming-automation/ui/robot-course-engine/phaser-robot-course.component.ts
var _c0 = ["host"];
var ROBOT_COURSE_RENDERER = new InjectionToken("ROBOT_COURSE_RENDERER", {
  providedIn: "root",
  factory: () => async (host, view, ready, failed) => {
    if (typeof CanvasRenderingContext2D === "undefined" || typeof ResizeObserver === "undefined") {
      throw new Error("ROBOT_GRAPHICS_UNAVAILABLE");
    }
    const { createRobotCourseRenderer } = await import("./chunk-FAX64INR.js");
    return createRobotCourseRenderer(host, view, ready, failed);
  }
});
var PhaserRobotCourseComponent = class _PhaserRobotCourseComponent {
  view = input.required(
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  status = output();
  host = viewChild.required(
    "host",
    ...ngDevMode ? [{ debugName: "host" }] : (
      /* istanbul ignore next */
      []
    )
  );
  factory = inject(ROBOT_COURSE_RENDERER);
  zone = inject(NgZone);
  renderer;
  disposed = false;
  constructor() {
    const publish = (status) => {
      if (!this.disposed)
        this.zone.run(() => this.status.emit(status));
    };
    afterNextRender(() => {
      publish("loading");
      this.zone.runOutsideAngular(() => {
        void this.factory(this.host().nativeElement, this.view(), () => publish("ready"), () => publish("failed")).then((renderer) => {
          if (this.disposed)
            renderer.destroy();
          else {
            this.renderer = renderer;
            renderer.update(this.view());
          }
        }).catch(() => publish("failed"));
      });
    });
    effect(() => {
      const view = this.view();
      this.zone.runOutsideAngular(() => this.renderer?.update(view));
    });
    inject(DestroyRef).onDestroy(() => {
      this.disposed = true;
      this.zone.runOutsideAngular(() => this.renderer?.destroy());
    });
  }
  static \u0275fac = function PhaserRobotCourseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PhaserRobotCourseComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PhaserRobotCourseComponent, selectors: [["app-phaser-robot-course"]], viewQuery: function PhaserRobotCourseComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.host, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, hostVars: 6, hostBindings: function PhaserRobotCourseComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("aspect-ratio", ctx.view().course.visualTheme === "tabletop" ? (ctx.view().course.widthCm + 46) / (ctx.view().course.heightCm + 46) : null);
      \u0275\u0275classProp("workshop", ctx.view().course.visualTheme === "workshop")("tabletop", ctx.view().course.visualTheme === "tabletop");
    }
  }, inputs: { view: [1, "view"] }, outputs: { status: "status" }, decls: 2, vars: 0, consts: [["host", ""], ["aria-hidden", "true", 1, "game-host"]], template: function PhaserRobotCourseComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "div", 1, 0);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: clamp(300px, 48vw, 570px);\n}\n.workshop[_nghost-%COMP%] {\n  height: clamp(400px, 62vh, 680px);\n}\n.tabletop[_nghost-%COMP%] {\n  height: auto;\n  aspect-ratio: 1/1;\n  max-height: 740px;\n  min-height: 300px;\n}\n.game-host[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  border-radius: 8px;\n}\n/*# sourceMappingURL=phaser-robot-course.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PhaserRobotCourseComponent, [{
    type: Component,
    args: [{ selector: "app-phaser-robot-course", template: '<div #host class="game-host" aria-hidden="true"></div>', host: {
      "[class.workshop]": "view().course.visualTheme === 'workshop'",
      "[class.tabletop]": "view().course.visualTheme === 'tabletop'",
      "[style.aspect-ratio]": "view().course.visualTheme === 'tabletop' ? (view().course.widthCm + 46) / (view().course.heightCm + 46) : null"
    }, styles: ["/* angular:styles/component:scss;21796e722dbc8a0a4d171a1716bbfcf70237ee78561307d061618d2787f98a88;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/programming-automation/ui/robot-course-engine/phaser-robot-course.component.ts */\n:host {\n  display: block;\n  width: 100%;\n  height: clamp(300px, 48vw, 570px);\n}\n:host.workshop {\n  height: clamp(400px, 62vh, 680px);\n}\n:host.tabletop {\n  height: auto;\n  aspect-ratio: 1/1;\n  max-height: 740px;\n  min-height: 300px;\n}\n.game-host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  border-radius: 8px;\n}\n/*# sourceMappingURL=phaser-robot-course.component.css.map */\n"] }]
  }], () => [], { view: [{ type: Input, args: [{ isSignal: true, alias: "view", required: true }] }], status: [{ type: Output, args: ["status"] }], host: [{ type: ViewChild, args: ["host", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PhaserRobotCourseComponent, { className: "PhaserRobotCourseComponent", filePath: "src/app/templates/programming-automation/ui/robot-course-engine/phaser-robot-course.component.ts", lineNumber: 37 });
})();

// src/app/templates/programming-automation/ui/robot-course.component.ts
var _c02 = ["*"];
var _c1 = (a0, a1) => [a0, a1, 1, 4, 7];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.actor.id;
function RobotCourseComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.sample() ? "Patrols follow the run timeline. Use WAIT to time your crossing." : ctx_r0.renderer() === "game" ? "Patrol preview \u2014 every run resets the routes. Use WAIT to time your crossing." : "Patrols shown at their starting positions. Run a program to watch their movement.");
  }
}
function RobotCourseComponent_Conditional_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "Preparing the course\u2026");
    \u0275\u0275elementEnd();
  }
}
function RobotCourseComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, RobotCourseComponent_Conditional_9_Conditional_0_Template, 2, 0, "p", 9);
    \u0275\u0275elementStart(1, "div", 10)(2, "app-phaser-robot-course", 11);
    \u0275\u0275listener("status", function RobotCourseComponent_Conditional_9_Template_app_phaser_robot_course_status_2_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setRendererStatus($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.rendererStatus() === "loading" ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r0.description());
    \u0275\u0275advance();
    \u0275\u0275property("view", ctx_r0.gameView());
  }
}
function RobotCourseComponent_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "Game graphics are unavailable. The course map and replay controls are still available.");
    \u0275\u0275elementEnd();
  }
}
function RobotCourseComponent_Conditional_10_For_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "text", 90);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275element(2, "path", 91);
  }
  if (rf & 2) {
    const x_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("x", x_r3)("y", ctx_r0.course().heightCm + 19);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", x_r3, " ");
    \u0275\u0275advance();
    \u0275\u0275attribute("d", "M " + x_r3 + " " + (ctx_r0.course().heightCm + 5) + " v 4");
  }
}
function RobotCourseComponent_Conditional_10_For_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "text", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const y_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("y", ctx_r0.flip(y_r4) + 2.5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(y_r4);
  }
}
function RobotCourseComponent_Conditional_10_For_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 92);
    \u0275\u0275element(1, "rect", 93)(2, "rect", 94)(3, "rect", 95);
    \u0275\u0275elementStart(4, "text", 96);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "text", 97);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const zone_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("delivered", ctx_r0.zoneDelivered(zone_r5.id));
    \u0275\u0275advance();
    \u0275\u0275attribute("x", zone_r5.xCm)("y", ctx_r0.flip(zone_r5.yCm + zone_r5.heightCm) + 2)("width", zone_r5.widthCm)("height", zone_r5.heightCm);
    \u0275\u0275advance();
    \u0275\u0275attribute("x", zone_r5.xCm)("y", ctx_r0.flip(zone_r5.yCm + zone_r5.heightCm))("width", zone_r5.widthCm)("height", zone_r5.heightCm)("filter", ctx_r0.paint("glow"));
    \u0275\u0275advance();
    \u0275\u0275attribute("x", zone_r5.xCm + 3)("y", ctx_r0.flip(zone_r5.yCm + zone_r5.heightCm) + 3)("width", zone_r5.widthCm - 6)("height", zone_r5.heightCm - 6);
    \u0275\u0275advance();
    \u0275\u0275attribute("x", zone_r5.xCm + zone_r5.widthCm / 2)("y", ctx_r0.flip(zone_r5.yCm + zone_r5.heightCm / 2) + 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.zoneDelivered(zone_r5.id) ? "\u2713" : zone_r5.label, " ");
    \u0275\u0275advance();
    \u0275\u0275attribute("x", zone_r5.xCm + zone_r5.widthCm / 2)("y", ctx_r0.flip(zone_r5.yCm + zone_r5.heightCm) - 7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", zone_r5.label, " \xB7 ", ctx_r0.zoneDelivered(zone_r5.id) ? "DELIVERED" : "DELIVERY", " ");
  }
}
function RobotCourseComponent_Conditional_10_For_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g");
    \u0275\u0275element(1, "circle", 98)(2, "path", 99);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const point_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("transform", "translate(" + point_r6.xCm + " " + ctx_r0.flip(point_r6.yCm) + ")");
    \u0275\u0275advance();
    \u0275\u0275attribute("r", point_r6.radiusCm + 3);
  }
}
function RobotCourseComponent_Conditional_10_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "polyline", 100)(1, "polyline", 101);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("points", ctx_r0.trace());
    \u0275\u0275advance();
    \u0275\u0275attribute("points", ctx_r0.trace())("filter", ctx_r0.paint("glow"));
  }
}
function RobotCourseComponent_Conditional_10_For_78_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "use", 106);
  }
  if (rf & 2) {
    const crate_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("href", "#" + ctx_r0.artId + "-crate")("x", crate_r7.x)("y", crate_r7.y);
  }
}
function RobotCourseComponent_Conditional_10_For_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 72);
    \u0275\u0275element(1, "rect", 102)(2, "rect", 103)(3, "rect", 104)(4, "path", 105);
    \u0275\u0275repeaterCreate(5, RobotCourseComponent_Conditional_10_For_78_For_6_Template, 1, 3, ":svg:use", 106, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275element(7, "rect", 107);
    \u0275\u0275elementStart(8, "text", 108);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "circle", 109)(11, "circle", 110);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const wall_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("transform", "translate(" + wall_r8.xCm + " " + ctx_r0.flip(wall_r8.yCm + wall_r8.heightCm) + ")");
    \u0275\u0275advance();
    \u0275\u0275attribute("width", wall_r8.widthCm)("height", wall_r8.heightCm);
    \u0275\u0275advance();
    \u0275\u0275attribute("width", wall_r8.widthCm)("height", wall_r8.heightCm)("fill", ctx_r0.paint("metal"));
    \u0275\u0275advance();
    \u0275\u0275attribute("y", wall_r8.heightCm - 5)("width", wall_r8.widthCm)("fill", ctx_r0.paint("hazard"));
    \u0275\u0275advance();
    \u0275\u0275attribute("d", "M 3 " + (wall_r8.heightCm - 6) + " V 3 H " + (wall_r8.widthCm - 3) + " V " + (wall_r8.heightCm - 6));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.rackCrates(wall_r8.widthCm, wall_r8.heightCm));
    \u0275\u0275advance(2);
    \u0275\u0275attribute("y", wall_r8.heightCm - 17)("width", wall_r8.widthCm - 8);
    \u0275\u0275advance();
    \u0275\u0275attribute("x", wall_r8.widthCm / 2)("y", wall_r8.heightCm - 10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", wall_r8.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("cx", wall_r8.widthCm - 3);
  }
}
function RobotCourseComponent_Conditional_10_For_80_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g");
    \u0275\u0275element(1, "ellipse", 111)(2, "use", 112);
    \u0275\u0275elementStart(3, "text", 113);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pkg_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("transform", "translate(" + pkg_r9.xCm + " " + ctx_r0.flip(pkg_r9.yCm) + ")");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("href", "#" + ctx_r0.artId + "-crate")("filter", ctx_r0.paint("shadow"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(pkg_r9.label);
  }
}
function RobotCourseComponent_Conditional_10_For_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, RobotCourseComponent_Conditional_10_For_80_Conditional_0_Template, 5, 4, ":svg:g");
  }
  if (rf & 2) {
    const pkg_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!ctx_r0.sample()?.carryingPackageIds?.includes(pkg_r9.id) && !ctx_r0.sample()?.deliveredPackageIds?.includes(pkg_r9.id) ? 0 : -1);
  }
}
function RobotCourseComponent_Conditional_10_For_82_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "circle", 117)(1, "path", 118);
  }
  if (rf & 2) {
    const state_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("r", state_r10.actor.radiusCm);
    \u0275\u0275advance();
    \u0275\u0275attribute("transform", "rotate(" + state_r10.pose.headingDeg + ")");
  }
}
function RobotCourseComponent_Conditional_10_For_82_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "rect", 115);
  }
  if (rf & 2) {
    const state_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("x", -state_r10.actor.widthCm / 2)("y", -state_r10.actor.heightCm / 2)("width", state_r10.actor.widthCm)("height", state_r10.actor.heightCm)("fill", ctx_r0.paint("hazard"));
  }
}
function RobotCourseComponent_Conditional_10_For_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "polyline", 114);
    \u0275\u0275elementStart(1, "g");
    \u0275\u0275conditionalCreate(2, RobotCourseComponent_Conditional_10_For_82_Conditional_2_Template, 2, 2)(3, RobotCourseComponent_Conditional_10_For_82_Conditional_3_Template, 1, 5, ":svg:rect", 115);
    \u0275\u0275elementStart(4, "text", 116);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const state_r10 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("points", state_r10.route);
    \u0275\u0275advance();
    \u0275\u0275attribute("transform", "translate(" + state_r10.pose.xCm + " " + ctx_r0.flip(state_r10.pose.yCm) + ")");
    \u0275\u0275advance();
    \u0275\u0275conditional(state_r10.actor.kind === "robot" ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(state_r10.actor.label);
  }
}
function RobotCourseComponent_Conditional_10_For_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 79);
  }
  if (rf & 2) {
    const y_r11 = ctx.$implicit;
    \u0275\u0275attribute("d", "M -10 " + y_r11 + " h 3 M 7 " + y_r11 + " h 3");
  }
}
function RobotCourseComponent_Conditional_10_Conditional_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "use", 89);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("href", "#" + ctx_r0.artId + "-crate");
  }
}
function RobotCourseComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, RobotCourseComponent_Conditional_10_Conditional_0_Template, 2, 0, "p", 9);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 10)(2, "defs")(3, "linearGradient", 12);
    \u0275\u0275element(4, "stop", 13)(5, "stop", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "linearGradient", 15);
    \u0275\u0275element(7, "stop", 16)(8, "stop", 17)(9, "stop", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "linearGradient", 19);
    \u0275\u0275element(11, "stop", 20)(12, "stop", 21)(13, "stop", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "linearGradient", 23);
    \u0275\u0275element(15, "stop", 24)(16, "stop", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "linearGradient", 26);
    \u0275\u0275element(18, "stop", 27)(19, "stop", 28)(20, "stop", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "radialGradient");
    \u0275\u0275element(22, "stop", 30)(23, "stop", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "radialGradient");
    \u0275\u0275element(25, "stop", 32)(26, "stop", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "linearGradient", 34);
    \u0275\u0275element(28, "stop", 35)(29, "stop", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "pattern", 37);
    \u0275\u0275element(31, "rect", 38)(32, "path", 39)(33, "circle", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "pattern", 41);
    \u0275\u0275element(35, "rect", 42)(36, "rect", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "filter", 44);
    \u0275\u0275element(38, "feGaussianBlur", 45);
    \u0275\u0275elementStart(39, "feMerge");
    \u0275\u0275element(40, "feMergeNode")(41, "feMergeNode", 46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "filter", 47);
    \u0275\u0275element(43, "feDropShadow", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "symbol", 49);
    \u0275\u0275element(45, "path", 50)(46, "rect", 51)(47, "path", 52)(48, "path", 53)(49, "rect", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(50, "rect", 55)(51, "rect", 56)(52, "ellipse", 57);
    \u0275\u0275repeaterCreate(53, RobotCourseComponent_Conditional_10_For_54_Template, 3, 4, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275repeaterCreate(55, RobotCourseComponent_Conditional_10_For_56_Template, 2, 2, ":svg:text", 58, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(57, "text", 59);
    \u0275\u0275text(58, " N \u2191 \xB7 CENTIMETERS ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(59, "path", 60);
    \u0275\u0275repeaterCreate(60, RobotCourseComponent_Conditional_10_For_61_Template, 8, 22, ":svg:g", 61, _forTrack0);
    \u0275\u0275repeaterCreate(62, RobotCourseComponent_Conditional_10_For_63_Template, 3, 2, ":svg:g", null, _forTrack0);
    \u0275\u0275element(64, "circle", 62);
    \u0275\u0275elementStart(65, "text", 63);
    \u0275\u0275text(66, " START ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "g", 64);
    \u0275\u0275element(68, "circle", 65)(69, "circle", 66)(70, "circle", 67)(71, "circle", 68)(72, "path", 69)(73, "path", 70);
    \u0275\u0275elementStart(74, "text", 71);
    \u0275\u0275text(75, "PARK");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(76, RobotCourseComponent_Conditional_10_Conditional_76_Template, 2, 3);
    \u0275\u0275repeaterCreate(77, RobotCourseComponent_Conditional_10_For_78_Template, 12, 16, ":svg:g", 72, _forTrack0);
    \u0275\u0275repeaterCreate(79, RobotCourseComponent_Conditional_10_For_80_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275repeaterCreate(81, RobotCourseComponent_Conditional_10_For_82_Template, 6, 4, null, null, _forTrack1);
    \u0275\u0275elementStart(83, "g", 73);
    \u0275\u0275element(84, "ellipse", 74)(85, "ellipse", 75)(86, "path", 76);
    \u0275\u0275elementStart(87, "g");
    \u0275\u0275element(88, "rect", 77)(89, "rect", 78);
    \u0275\u0275repeaterCreate(90, RobotCourseComponent_Conditional_10_For_91_Template, 1, 1, ":svg:path", 79, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275element(92, "rect", 80)(93, "path", 81)(94, "rect", 82)(95, "rect", 83)(96, "rect", 84)(97, "path", 85)(98, "rect", 86)(99, "rect", 87)(100, "path", 88);
    \u0275\u0275conditionalCreate(101, RobotCourseComponent_Conditional_10_Conditional_101_Template, 1, 1, ":svg:use", 89);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.rendererStatus() === "failed" ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275attribute("viewBox", "-30 -22 " + (ctx_r0.course().widthCm + 52) + " " + (ctx_r0.course().heightCm + 50))("aria-label", ctx_r0.course().name + ". Robot at " + ctx_r0.pose().xCm.toFixed(1) + ", " + ctx_r0.pose().yCm.toFixed(1) + " centimeters, heading " + ctx_r0.pose().headingDeg.toFixed(0) + " degrees.");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("id", ctx_r0.artId + "-floor");
    \u0275\u0275advance(3);
    \u0275\u0275attribute("id", ctx_r0.artId + "-metal");
    \u0275\u0275advance(4);
    \u0275\u0275attribute("id", ctx_r0.artId + "-robot");
    \u0275\u0275advance(4);
    \u0275\u0275attribute("id", ctx_r0.artId + "-armor");
    \u0275\u0275advance(3);
    \u0275\u0275attribute("id", ctx_r0.artId + "-cargo");
    \u0275\u0275advance(4);
    \u0275\u0275attribute("id", ctx_r0.artId + "-spot");
    \u0275\u0275advance(3);
    \u0275\u0275attribute("id", ctx_r0.artId + "-dock");
    \u0275\u0275advance(3);
    \u0275\u0275attribute("id", ctx_r0.artId + "-beam");
    \u0275\u0275advance(3);
    \u0275\u0275attribute("id", ctx_r0.artId + "-tiles")("width", ctx_r0.course().gridSizeCm)("height", ctx_r0.course().gridSizeCm);
    \u0275\u0275advance();
    \u0275\u0275attribute("width", ctx_r0.course().gridSizeCm - 1)("height", ctx_r0.course().gridSizeCm - 1)("fill", ctx_r0.paint("floor"));
    \u0275\u0275advance();
    \u0275\u0275attribute("d", "M 1 " + (ctx_r0.course().gridSizeCm - 1) + " V 1 H " + (ctx_r0.course().gridSizeCm - 1));
    \u0275\u0275advance(2);
    \u0275\u0275attribute("id", ctx_r0.artId + "-hazard");
    \u0275\u0275advance(3);
    \u0275\u0275attribute("id", ctx_r0.artId + "-glow")("width", ctx_r0.course().widthCm + 100)("height", ctx_r0.course().heightCm + 100);
    \u0275\u0275advance(5);
    \u0275\u0275attribute("id", ctx_r0.artId + "-shadow");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("id", ctx_r0.artId + "-crate");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("fill", ctx_r0.paint("cargo"));
    \u0275\u0275advance(4);
    \u0275\u0275attribute("width", ctx_r0.course().widthCm + 10)("height", ctx_r0.course().heightCm + 12);
    \u0275\u0275advance();
    \u0275\u0275attribute("width", ctx_r0.course().widthCm)("height", ctx_r0.course().heightCm)("fill", ctx_r0.paint("tiles"));
    \u0275\u0275advance();
    \u0275\u0275attribute("cx", ctx_r0.course().widthCm * 0.5)("cy", ctx_r0.course().heightCm * 0.35)("rx", ctx_r0.course().widthCm * 0.65)("ry", ctx_r0.course().heightCm * 0.6)("fill", ctx_r0.paint("spot"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.xTicks());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.yTicks());
    \u0275\u0275advance(2);
    \u0275\u0275attribute("x", ctx_r0.course().widthCm);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("d", "M 3 18 V 3 H 18 M " + (ctx_r0.course().widthCm - 18) + " 3 H " + (ctx_r0.course().widthCm - 3) + " V 18 M 3 " + (ctx_r0.course().heightCm - 18) + " V " + (ctx_r0.course().heightCm - 3) + " H 18 M " + (ctx_r0.course().widthCm - 18) + " " + (ctx_r0.course().heightCm - 3) + " H " + (ctx_r0.course().widthCm - 3) + " V " + (ctx_r0.course().heightCm - 18));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.course().deliveryZones);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.course().checkpoints);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("cx", ctx_r0.course().startPose.xCm)("cy", ctx_r0.flip(ctx_r0.course().startPose.yCm));
    \u0275\u0275advance();
    \u0275\u0275attribute("x", ctx_r0.course().startPose.xCm)("y", ctx_r0.flip(ctx_r0.course().startPose.yCm) + 21);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("transform", "translate(" + ctx_r0.target().xCm + " " + ctx_r0.flip(ctx_r0.target().yCm) + ")");
    \u0275\u0275advance();
    \u0275\u0275attribute("fill", ctx_r0.paint("dock"));
    \u0275\u0275advance(2);
    \u0275\u0275attribute("filter", ctx_r0.paint("glow"));
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r0.showTrace() ? 76 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.course().obstacles);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.course().packages);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.actorStates());
    \u0275\u0275advance(2);
    \u0275\u0275attribute("transform", "translate(" + ctx_r0.pose().xCm + " " + ctx_r0.flip(ctx_r0.pose().yCm) + ") rotate(" + ctx_r0.pose().headingDeg + ")");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("fill", ctx_r0.paint("spot"));
    \u0275\u0275advance();
    \u0275\u0275attribute("fill", ctx_r0.paint("beam"));
    \u0275\u0275advance();
    \u0275\u0275attribute("filter", ctx_r0.paint("shadow"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(\u0275\u0275pureFunction2(52, _c1, -5, -2));
    \u0275\u0275advance(2);
    \u0275\u0275attribute("fill", ctx_r0.paint("robot"));
    \u0275\u0275advance();
    \u0275\u0275attribute("fill", ctx_r0.paint("armor"));
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r0.sample()?.carryingPackageIds?.length ? 101 : -1);
  }
}
function RobotCourseComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.sample()?.deliveredPackageIds?.length ?? 0, " / ", ctx_r0.course().packages.length, " deliveries");
  }
}
function RobotCourseComponent_Conditional_20_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function RobotCourseComponent_Conditional_20_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.objectiveView());
    });
    \u0275\u0275text(1, "Parking lane");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", !ctx_r0.fullOverview() && !ctx_r0.follow());
  }
}
function RobotCourseComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, RobotCourseComponent_Conditional_20_Conditional_0_Template, 2, 1, "button", 119);
    \u0275\u0275elementStart(1, "button", 8);
    \u0275\u0275listener("click", function RobotCourseComponent_Conditional_20_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.overview());
    });
    \u0275\u0275text(2, "Overview");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 8);
    \u0275\u0275listener("click", function RobotCourseComponent_Conditional_20_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.followRobot());
    });
    \u0275\u0275text(4, "Follow robot");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 120);
    \u0275\u0275listener("click", function RobotCourseComponent_Conditional_20_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.changeZoom(-0.25));
    });
    \u0275\u0275text(6, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 121);
    \u0275\u0275listener("click", function RobotCourseComponent_Conditional_20_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.changeZoom(0.25));
    });
    \u0275\u0275text(8, "+");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.course().visualTheme === "workshop" ? 0 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275attribute("aria-pressed", ctx_r0.follow());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.zoom() <= 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.zoom() >= 3);
  }
}
function RobotCourseComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const target_r14 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4("", target_r14.label, ": (", target_r14.xCm, ", ", target_r14.yCm, ") cm, heading ", target_r14.headingDeg, "\xB0.");
  }
}
function RobotCourseComponent_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const wall_r15 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate5("", wall_r15.label, ": obstacle from (", wall_r15.xCm, ", ", wall_r15.yCm, ") cm, ", wall_r15.widthCm, " \xD7 ", wall_r15.heightCm, " cm.");
  }
}
function RobotCourseComponent_For_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pkg_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", pkg_r16.label, ": pickup at (", pkg_r16.xCm, ", ", pkg_r16.yCm, ") cm.");
  }
}
function RobotCourseComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const zone_r17 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate5("", zone_r17.label, ": delivery zone from (", zone_r17.xCm, ", ", zone_r17.yCm, ") cm, ", zone_r17.widthCm, " \xD7 ", zone_r17.heightCm, " cm.");
  }
}
function RobotCourseComponent_For_36_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const point_r18 = ctx.$implicit;
    const \u0275$index_353_r19 = ctx.$index;
    const \u0275$count_353_r20 = ctx.$count;
    \u0275\u0275textInterpolate3(" (", point_r18.xCm, ", ", point_r18.yCm, ") cm", \u0275$index_353_r19 === \u0275$count_353_r20 - 1 ? "." : " \u2192 ", " ");
  }
}
function RobotCourseComponent_For_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275repeaterCreate(2, RobotCourseComponent_For_36_For_3_Template, 1, 3, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const state_r21 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4("", state_r21.actor.label, ": ", state_r21.actor.speedCmPerSecond, " cm/s, ", state_r21.actor.patrol, " route, ", state_r21.actor.pauseSeconds ?? 0, " second pause at each waypoint. Route: ");
    \u0275\u0275advance();
    \u0275\u0275repeater(state_r21.actor.path);
  }
}
function RobotCourseComponent_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const checkpoint_r22 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("Checkpoint: (", checkpoint_r22.xCm, ", ", checkpoint_r22.yCm, ") cm, radius ", checkpoint_r22.radiusCm, " cm.");
  }
}
var nextArenaId = 0;
var RobotCourseComponent = class _RobotCourseComponent {
  renderer = signal(
    "game",
    ...ngDevMode ? [{ debugName: "renderer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rendererStatus = signal(
    "loading",
    ...ngDevMode ? [{ debugName: "rendererStatus" }] : (
      /* istanbul ignore next */
      []
    )
  );
  follow = signal(
    false,
    ...ngDevMode ? [{ debugName: "follow" }] : (
      /* istanbul ignore next */
      []
    )
  );
  zoom = signal(
    1,
    ...ngDevMode ? [{ debugName: "zoom" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fullOverview = signal(
    false,
    ...ngDevMode ? [{ debugName: "fullOverview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  result = input(
    ...ngDevMode ? [void 0, { debugName: "result" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reducedMotion = signal(
    false,
    ...ngDevMode ? [{ debugName: "reducedMotion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  events = input(
    [],
    ...ngDevMode ? [{ debugName: "events" }] : (
      /* istanbul ignore next */
      []
    )
  );
  gameView = computed(
    () => ({
      course: this.course(),
      robotRadiusCm: this.robotRadiusCm(),
      targetIndex: this.targetIndex(),
      sample: this.sample(),
      samples: this.samples(),
      events: this.events(),
      showTrace: this.showTrace(),
      follow: this.follow(),
      zoom: this.zoom(),
      reducedMotion: this.reducedMotion(),
      overview: this.fullOverview(),
      result: this.result()
    }),
    ...ngDevMode ? [{ debugName: "gameView" }] : (
      /* istanbul ignore next */
      []
    )
  );
  description = computed(
    () => {
      const pose = this.pose();
      return `${this.course().name}. Robot at ${pose.xCm.toFixed(1)}, ${pose.yCm.toFixed(1)} centimeters, heading ${pose.headingDeg.toFixed(0)} degrees. ${this.sample()?.deliveredPackageIds.length ?? 0} of ${this.course().packages.length} packages delivered. ${this.actorStates().map(({ actor, pose: pose2 }) => `${actor.label} at (${pose2.xCm.toFixed(1)}, ${pose2.yCm.toFixed(1)}) cm.`).join(" ")}`;
    },
    ...ngDevMode ? [{ debugName: "description" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (typeof window.matchMedia !== "function")
        return;
      const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
      const update = () => this.reducedMotion.set(preference.matches);
      update();
      preference.addEventListener("change", update);
      destroy.onDestroy(() => preference.removeEventListener("change", update));
    });
  }
  setRendererStatus(status) {
    this.rendererStatus.set(status);
    if (status === "failed")
      this.renderer.set("map");
  }
  overview() {
    this.follow.set(false);
    this.zoom.set(1);
    this.fullOverview.set(true);
  }
  objectiveView() {
    this.follow.set(false);
    this.zoom.set(1);
    this.fullOverview.set(false);
  }
  followRobot() {
    this.follow.set(!this.follow());
    if (this.follow())
      this.zoom.set(Math.max(1.8, this.zoom()));
  }
  changeZoom(amount) {
    this.zoom.update((zoom) => Math.max(1, Math.min(3, zoom + amount)));
  }
  artId = `delivery-arena-${nextArenaId++}`;
  targetDistance = computed(
    () => Math.hypot(this.pose().xCm - this.target().xCm, this.pose().yCm - this.target().yCm).toFixed(1),
    ...ngDevMode ? [{ debugName: "targetDistance" }] : (
      /* istanbul ignore next */
      []
    )
  );
  paint(name) {
    return `url(#${this.artId}-${name})`;
  }
  zoneDelivered(id) {
    const packages = this.course().packages.filter((item) => item.deliveryZoneId === id);
    return packages.length > 0 && packages.every((item) => this.sample()?.deliveredPackageIds.includes(item.id));
  }
  rackCrates(width, height) {
    const columns = Math.max(0, Math.floor((width - 8) / 18)), rows = Math.max(0, Math.floor((height - 22) / 20));
    return Array.from({ length: columns * rows }, (_, i) => ({
      x: 5 + i % columns * 18,
      y: 5 + Math.floor(i / columns) * 20
    }));
  }
  course = input.required(
    ...ngDevMode ? [{ debugName: "course" }] : (
      /* istanbul ignore next */
      []
    )
  );
  robotRadiusCm = input(
    8,
    ...ngDevMode ? [{ debugName: "robotRadiusCm" }] : (
      /* istanbul ignore next */
      []
    )
  );
  targetIndex = input(
    0,
    ...ngDevMode ? [{ debugName: "targetIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sample = input(
    ...ngDevMode ? [void 0, { debugName: "sample" }] : (
      /* istanbul ignore next */
      []
    )
  );
  samples = input(
    [],
    ...ngDevMode ? [{ debugName: "samples" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showTrace = input(
    true,
    ...ngDevMode ? [{ debugName: "showTrace" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pose = computed(
    () => this.sample() ?? this.course().startPose,
    ...ngDevMode ? [{ debugName: "pose" }] : (
      /* istanbul ignore next */
      []
    )
  );
  actorStates = computed(
    () => (this.course().actors ?? []).map((actor) => ({
      actor,
      pose: sampleCourseActor(actor, this.sample()?.timeMs ?? 0),
      route: [...actor.path, ...actor.patrol === "loop" ? [actor.path[0]] : []].map((point) => `${point.xCm},${this.flip(point.yCm)}`).join(" ")
    })),
    ...ngDevMode ? [{ debugName: "actorStates" }] : (
      /* istanbul ignore next */
      []
    )
  );
  target = computed(
    () => this.course().targets[this.targetIndex()] ?? this.course().targets[0],
    ...ngDevMode ? [{ debugName: "target" }] : (
      /* istanbul ignore next */
      []
    )
  );
  xTicks = computed(
    () => Array.from({ length: Math.floor(this.course().widthCm / 50) + 1 }, (_, i) => i * 50),
    ...ngDevMode ? [{ debugName: "xTicks" }] : (
      /* istanbul ignore next */
      []
    )
  );
  yTicks = computed(
    () => Array.from({ length: Math.floor(this.course().heightCm / 50) + 1 }, (_, i) => i * 50),
    ...ngDevMode ? [{ debugName: "yTicks" }] : (
      /* istanbul ignore next */
      []
    )
  );
  trace = computed(
    () => this.samples().filter((point) => point.timeMs <= (this.sample()?.timeMs ?? Infinity)).map((p) => `${p.xCm},${this.flip(p.yCm)}`).join(" "),
    ...ngDevMode ? [{ debugName: "trace" }] : (
      /* istanbul ignore next */
      []
    )
  );
  flip(y) {
    return this.course().heightCm - y;
  }
  static \u0275fac = function RobotCourseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RobotCourseComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RobotCourseComponent, selectors: [["app-robot-course"]], inputs: { result: [1, "result"], events: [1, "events"], course: [1, "course"], robotRadiusCm: [1, "robotRadiusCm"], targetIndex: [1, "targetIndex"], sample: [1, "sample"], samples: [1, "samples"], showTrace: [1, "showTrace"] }, ngContentSelectors: _c02, decls: 39, vars: 14, consts: [[1, "arena"], [1, "arena-hud"], [1, "arena-id"], [1, "target-distance"], [1, "patrol-notice"], [1, "arena-bottom"], [1, "course-description"], ["aria-label", "Course view controls", 1, "view-controls"], ["type", "button", 3, "click"], ["role", "status", 1, "renderer-message"], ["role", "img"], [3, "status", "view"], ["x2", "0.7", "y2", "1"], ["stop-color", "#253f53"], ["offset", "1", "stop-color", "#142635"], ["x2", "0.2", "y2", "1"], ["stop-color", "#668298"], ["offset", ".25", "stop-color", "#3f5b72"], ["offset", "1", "stop-color", "#243c50"], ["x2", "1", "y2", "1"], ["stop-color", "#66e5cd"], ["offset", ".45", "stop-color", "#169c96"], ["offset", "1", "stop-color", "#095669"], ["x2", "0.5", "y2", "1"], ["stop-color", "#ffffff"], ["offset", "1", "stop-color", "#a7c5cd"], ["x2", ".4", "y2", "1"], ["stop-color", "#ffce80"], ["offset", ".35", "stop-color", "#eda950"], ["offset", "1", "stop-color", "#bd6927"], ["stop-color", "#33ccb8", "stop-opacity", ".2"], ["offset", "1", "stop-color", "#33ccb8", "stop-opacity", "0"], ["stop-color", "#ffbf59", "stop-opacity", ".28"], ["offset", "1", "stop-color", "#ffbf59", "stop-opacity", "0"], ["x2", "0", "y2", "1"], ["stop-color", "#affff0", "stop-opacity", "0"], ["offset", "1", "stop-color", "#affff0", "stop-opacity", ".26"], ["patternUnits", "userSpaceOnUse"], ["x", ".5", "y", ".5", "rx", "1"], ["stroke", "#7597aa", "stroke-opacity", ".28", "stroke-width", ".5", "fill", "none"], ["cx", "2.5", "cy", "2.5", "r", ".5", "fill", "#7696a5", "opacity", ".4"], ["width", "8", "height", "8", "patternUnits", "userSpaceOnUse", "patternTransform", "rotate(45)"], ["width", "8", "height", "8", "fill", "#f8b752"], ["width", "4", "height", "8", "fill", "#283945"], ["filterUnits", "userSpaceOnUse", "x", "-50", "y", "-50"], ["stdDeviation", "1.5"], ["in", "SourceGraphic"], ["x", "-50%", "y", "-50%", "width", "200%", "height", "220%"], ["dx", "1.5", "dy", "3", "stdDeviation", "2", "flood-color", "#030d17", "flood-opacity", ".7"], ["viewBox", "-9 -10 18 20"], ["d", "M-8-7H8V8L5 10H-6L-9 7Z", "fill", "#8f501e"], ["x", "-8", "y", "-9", "width", "16", "height", "16", "rx", "2", "stroke", "#ffe0a1", "stroke-width", ".5"], ["d", "M-3-9V7M3-9V7", "stroke", "#724e2f", "stroke-width", "1.5", "opacity", ".6"], ["d", "M-7-7H7", "stroke", "#ffdfa2", "stroke-width", ".7"], ["x", "-2.5", "y", "-4", "width", "5", "height", "4", "rx", ".4", "fill", "#ffe9ba"], ["x", "-5", "y", "-5", "rx", "7", "fill", "#081624", "stroke", "#4d6b7e", "stroke-width", "1.2"], ["x", "0", "y", "0", "rx", "2", "stroke", "#477789", "stroke-width", ".8"], ["pointer-events", "none"], ["x", "-11", "text-anchor", "end", 1, "ruler"], ["y", "-12", "text-anchor", "end", 1, "north"], ["stroke", "#66e5d6", "stroke-width", "2", "fill", "none", "opacity", ".8"], [1, "delivery-zone", 3, "delivered"], ["r", "12", "fill", "#14343b", "stroke", "#5bacae", "stroke-dasharray", "2 2"], ["text-anchor", "middle", 1, "start-label"], [1, "parking-dock"], ["r", "27"], ["cy", "2", "r", "15", "fill", "#151f2a", "stroke", "#704c29"], ["r", "15", "fill", "#3d3430", "stroke", "#ffbc55", "stroke-width", "1.6"], ["r", "11.5", "fill", "none", "stroke", "#ffdc97", "stroke-width", ".8", "stroke-dasharray", "5 3"], ["d", "M -6 0 H 6 M 0 -6 V 6", "stroke", "#ffdfaa", "stroke-width", "1.5"], ["d", "M -19 -6 V -19 H -6 M 6 -19 H 19 V -6 M -19 6 V 19 H -6 M 6 19 H 19 V 6", "fill", "none", "stroke", "#ffc96b", "stroke-width", ".8", "opacity", ".7"], ["y", "-25", "text-anchor", "middle", 1, "dock-label"], [1, "storage-rack"], [1, "rover"], ["cy", "3", "rx", "14", "ry", "14", "fill", "#06101b", "opacity", ".65"], ["rx", "22", "ry", "24"], ["d", "M-7-8 L-16-35 H16 L7-8Z", "pointer-events", "none"], ["x", "-11", "y", "-8", "width", "5", "height", "17", "rx", "2", "fill", "#071722", "stroke", "#527483", "stroke-width", ".5"], ["x", "6", "y", "-8", "width", "5", "height", "17", "rx", "2", "fill", "#071722", "stroke", "#527483", "stroke-width", ".5"], ["stroke", "#45606c", "stroke-width", ".8"], ["x", "-8", "y", "-10", "width", "16", "height", "21", "rx", "5", "stroke", "#8af5de", "stroke-width", ".6"], ["d", "M-6-7Q-6-10 0-10Q6-10 6-7L5 1H-5Z"], ["x", "-5.5", "y", "-8", "width", "11", "height", "5.5", "rx", "2.3", "fill", "#0b2535", "stroke", "#72999f", "stroke-width", ".4"], ["x", "-3.5", "y", "-6.5", "width", "2.3", "height", "2", "rx", ".5", "fill", "#79ffdf"], ["x", "1.2", "y", "-6.5", "width", "2.3", "height", "2", "rx", ".5", "fill", "#79ffdf"], ["d", "M-5 4H5V8H-5Z", "fill", "#153944", "stroke", "#70b9b5", "stroke-width", ".4"], ["x", "-7", "y", "-9", "width", "2", "height", "1.5", "rx", ".5", "fill", "#ffe29c"], ["x", "5", "y", "-9", "width", "2", "height", "1.5", "rx", ".5", "fill", "#ffe29c"], ["d", "M-6 9H6", "stroke", "#36e0ba", "stroke-width", "1.2"], ["x", "-5", "y", "1", "width", "10", "height", "11"], ["text-anchor", "middle", 1, "ruler"], ["stroke", "#7192a5", "stroke-width", ".7"], [1, "delivery-zone"], ["rx", "3", "fill", "#091a22"], ["rx", "3", "fill", "#183e3d", "stroke", "#62e6b0", "stroke-width", "1.4"], ["rx", "1", "fill", "none", "stroke", "#80e9bb", "stroke-opacity", ".45", "stroke-dasharray", "2 2"], ["text-anchor", "middle", 1, "zone-letter"], ["text-anchor", "middle", 1, "zone-label"], ["fill", "#312e31", "stroke", "#ddb066", "stroke-dasharray", "2 2"], ["d", "M -3 0 H 3 M 0 -3 V 3", "stroke", "#ffd681"], ["fill", "none", "stroke", "#39dbc7", "stroke-width", "6", "stroke-opacity", ".14", "stroke-linejoin", "round"], ["fill", "none", "stroke", "#70f4df", "stroke-width", "1.5", "stroke-linejoin", "round", "stroke-linecap", "round"], ["x", "2", "y", "4", "rx", "3", "fill", "#030b13", "opacity", ".65"], ["x", "0", "y", "0", "rx", "2", "stroke", "#7d98a9", "stroke-width", ".8"], ["x", "0", "height", "5"], ["stroke", "#9db3bd", "stroke-width", "2", "fill", "none"], ["width", "16", "height", "18"], ["x", "4", "height", "10", "rx", "1", "fill", "#122839"], ["text-anchor", "middle", 1, "rack-label"], ["cx", "3", "cy", "3", "r", "1", "fill", "#d8e6e9"], ["cy", "3", "r", "1", "fill", "#d8e6e9"], ["cy", "7", "rx", "11", "ry", "6", "fill", "#030d16", "opacity", ".7"], ["x", "-9", "y", "-10", "width", "18", "height", "20"], ["y", "-15", "text-anchor", "middle", 1, "package-label"], ["fill", "none", "stroke", "#eaa574", "stroke-width", "1", "stroke-dasharray", "3 3"], ["stroke", "#ffe0a3"], ["y", "-23", "text-anchor", "middle", "fill", "#ffe0a3", "font-size", "7"], ["fill", "#c97453", "stroke", "#ffe0a3", "stroke-width", "1"], ["d", "M -4 3 L 0 -6 L 4 3 Z", "fill", "#2c3a36"], ["type", "button"], ["type", "button", "aria-label", "Zoom out", 3, "click", "disabled"], ["type", "button", "aria-label", "Zoom in", 3, "click", "disabled"]], template: function RobotCourseComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 3);
      \u0275\u0275text(5, "TO TARGET ");
      \u0275\u0275elementStart(6, "strong");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(8, RobotCourseComponent_Conditional_8_Template, 2, 1, "p", 4);
      \u0275\u0275conditionalCreate(9, RobotCourseComponent_Conditional_9_Template, 3, 3)(10, RobotCourseComponent_Conditional_10_Template, 102, 55);
      \u0275\u0275conditionalCreate(11, RobotCourseComponent_Conditional_11_Template, 3, 2, "div", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "details", 6)(13, "summary");
      \u0275\u0275text(14, "Map & view options");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 7)(16, "button", 8);
      \u0275\u0275listener("click", function RobotCourseComponent_Template_button_click_16_listener() {
        return ctx.renderer.set("game");
      });
      \u0275\u0275text(17, "Game view");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 8);
      \u0275\u0275listener("click", function RobotCourseComponent_Template_button_click_18_listener() {
        return ctx.renderer.set("map");
      });
      \u0275\u0275text(19, "Map view");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(20, RobotCourseComponent_Conditional_20_Template, 9, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275projection(21);
      \u0275\u0275elementStart(22, "p");
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "p");
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "ul");
      \u0275\u0275repeaterCreate(27, RobotCourseComponent_For_28_Template, 2, 4, "li", null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275repeaterCreate(29, RobotCourseComponent_For_30_Template, 2, 5, "li", null, _forTrack0);
      \u0275\u0275repeaterCreate(31, RobotCourseComponent_For_32_Template, 2, 3, "li", null, _forTrack0);
      \u0275\u0275repeaterCreate(33, RobotCourseComponent_For_34_Template, 2, 5, "li", null, _forTrack0);
      \u0275\u0275repeaterCreate(35, RobotCourseComponent_For_36_Template, 4, 4, "li", null, _forTrack1);
      \u0275\u0275repeaterCreate(37, RobotCourseComponent_For_38_Template, 2, 3, "li", null, _forTrack0);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("workshop", ctx.course().visualTheme === "workshop" && ctx.renderer() === "game")("tabletop", ctx.course().visualTheme === "tabletop" && ctx.renderer() === "game");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.target().label);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("", ctx.targetDistance(), " cm");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.course().actors?.length ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.renderer() === "game" ? 9 : 10);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.course().packages.length ? 11 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275attribute("aria-pressed", ctx.renderer() === "game");
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-pressed", ctx.renderer() === "map");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.renderer() === "game" ? 20 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Each square = ", ctx.course().gridSizeCm, " cm");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.description(), " Heading 0\xB0 points north; 90\xB0 points east.");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.course().targets);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.course().obstacles);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.course().packages);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.course().deliveryZones);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.actorStates());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.course().checkpoints);
    }
  }, dependencies: [PhaserRobotCourseComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.arena.workshop[_ngcontent-%COMP%] {\n  padding: 0;\n  border-radius: 2px;\n  background: #142d2c;\n  box-shadow: none;\n  border-color: #647970;\n}\n.arena.tabletop[_ngcontent-%COMP%] {\n  padding: 0;\n  background: #bebeb0;\n  border-color: #a2a798;\n  border-radius: 4px;\n  box-shadow: none;\n}\n.tabletop[_ngcontent-%COMP%]   .arena-hud[_ngcontent-%COMP%], \n.tabletop[_ngcontent-%COMP%]   .arena-bottom[_ngcontent-%COMP%] {\n  padding: 9px 12px;\n  background: #243c37;\n}\n.tabletop[_ngcontent-%COMP%]   .view-controls[_ngcontent-%COMP%] {\n  padding: 7px 10px;\n  background: #243c37;\n}\n.tabletop[_ngcontent-%COMP%]   .arena-hud[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.tabletop[_ngcontent-%COMP%]   .arena-bottom[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.patrol-notice[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 9px 12px;\n  color: #f4e6c2;\n  background: #3e4b3c;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.workshop[_ngcontent-%COMP%]   .arena-hud[_ngcontent-%COMP%], \n.workshop[_ngcontent-%COMP%]   .arena-bottom[_ngcontent-%COMP%] {\n  display: none;\n}\n.workshop[_ngcontent-%COMP%]   .view-controls[_ngcontent-%COMP%] {\n  padding: 7px 10px;\n  background: #152b2b;\n  gap: 4px;\n}\n.workshop[_ngcontent-%COMP%]   .view-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border-radius: 2px;\n  min-height: 32px;\n  padding: 5px 8px;\n}\n.workshop[_ngcontent-%COMP%]   .course-description[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n}\n.view-controls[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  padding: 4px 0 12px;\n}\n.view-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 36px;\n  padding: 6px 10px;\n  color: #daedf1;\n  background: #1b3545;\n  border: 1px solid #547583;\n  border-radius: 6px;\n  cursor: pointer;\n  font: 600 11px system-ui, sans-serif;\n}\n.view-controls[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #215b58;\n  border-color: #77dcc8;\n  color: #d6fff2;\n}\n.view-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.view-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, \n.course-description[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #ffcf7d;\n  outline-offset: 3px;\n}\n.renderer-message[_ngcontent-%COMP%] {\n  color: #ffdda4;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.course-description[_ngcontent-%COMP%] {\n  color: #c0d7df;\n  font-size: 12px;\n  line-height: 1.6;\n  padding-top: 10px;\n}\n.course-description[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 32px;\n}\n.course-description[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\n.arena[_ngcontent-%COMP%] {\n  position: relative;\n  background:\n    radial-gradient(\n      ellipse at 60% 30%,\n      #203e50,\n      #0b1b2b 80%);\n  border: 1px solid #527f8f;\n  border-radius: 16px;\n  padding: 13px 10px 10px;\n  box-shadow:\n    inset 0 1px 0 #b0f7e950,\n    inset 0 -2px 16px #03132070,\n    0 12px 40px #020d2050,\n    0 0 24px #35d4c010;\n  overflow: hidden;\n}\n.arena-hud[_ngcontent-%COMP%], \n.arena-bottom[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n  font: 600 9px ui-monospace, monospace;\n  letter-spacing: 1px;\n  color: #97b4c6;\n  padding: 0 5px;\n}\n.arena-hud[_ngcontent-%COMP%] {\n  padding: 6px 5px 15px;\n  border-bottom: 1px solid #6994a02b;\n  margin-bottom: 8px;\n}\n.arena-id[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n  color: #d7edf0;\n  font-size: 10px;\n  letter-spacing: 1.7px;\n}\n.arena-id[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.robot-dot[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: #66e9cb;\n  box-shadow: 0 0 8px #66e9cb;\n}\n.target-distance[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: #a7b9c6;\n}\n.target-distance[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffce7e;\n  font-size: 10px;\n  letter-spacing: 0;\n  margin-left: 4px;\n}\n.arena-bottom[_ngcontent-%COMP%] {\n  border-top: 1px solid #54768a40;\n  padding-top: 9px;\n  margin-top: 4px;\n  font-size: 8px;\n  letter-spacing: 0.6px;\n}\n.arena-bottom[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\nsvg[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 510px;\n  display: block;\n  overflow: visible;\n}\ntext[_ngcontent-%COMP%] {\n  font: 7px ui-monospace, monospace;\n  fill: #c5d9e3;\n}\n.ruler[_ngcontent-%COMP%] {\n  fill: #94b1c4;\n  font-size: 7px;\n}\n.north[_ngcontent-%COMP%] {\n  font-size: 6px;\n  letter-spacing: 0.8px;\n  fill: #99bbc9;\n}\n.zone-letter[_ngcontent-%COMP%] {\n  fill: #b3ffce;\n  font: bold 10px system-ui;\n}\n.zone-label[_ngcontent-%COMP%] {\n  fill: #a1e9be;\n  font-size: 5.5px;\n  letter-spacing: 0.4px;\n}\n.start-label[_ngcontent-%COMP%] {\n  fill: #91b8c7;\n  font-size: 5.5px;\n  letter-spacing: 0.8px;\n}\n.dock-label[_ngcontent-%COMP%] {\n  fill: #ffdc98;\n  font: bold 6px ui-monospace, monospace;\n  letter-spacing: 1px;\n}\n.rack-label[_ngcontent-%COMP%] {\n  fill: #d9e5e9;\n  font-size: 5.5px;\n}\n.package-label[_ngcontent-%COMP%] {\n  fill: #ffce87;\n  font-size: 7px;\n  font-weight: 700;\n  paint-order: stroke;\n  stroke: #14293a;\n  stroke-width: 2px;\n  stroke-linejoin: round;\n}\n.legend[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  font-size: 10px;\n  color: #648291;\n  padding: 12px 2px;\n}\n.legend[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.legend[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 2px;\n}\n.robot[_ngcontent-%COMP%] {\n  background: #20af9e;\n}\n.target[_ngcontent-%COMP%] {\n  background: #e4a54d;\n}\n.trace[_ngcontent-%COMP%] {\n  background: #32cab7;\n}\n@media (max-width: 700px) {\n  .arena[_ngcontent-%COMP%] {\n    padding: 10px 6px;\n  }\n  .arena-hud[_ngcontent-%COMP%] {\n    font-size: 8px;\n    letter-spacing: 0.5px;\n  }\n  .arena-bottom[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n  .legend[_ngcontent-%COMP%] {\n    font-size: 9px;\n    gap: 8px;\n  }\n}\n/*# sourceMappingURL=robot-course.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RobotCourseComponent, [{
    type: Component,
    args: [{ selector: "app-robot-course", imports: [PhaserRobotCourseComponent], template: `<div class="arena" [class.workshop]="course().visualTheme === 'workshop' && renderer() === 'game'" [class.tabletop]="course().visualTheme === 'tabletop' && renderer() === 'game'">\r
  <div class="arena-hud">\r
    <span class="arena-id">{{ target().label }}</span\r
    ><span class="target-distance"\r
      >TO TARGET <strong>{{ targetDistance() }} cm</strong></span\r
    >\r
  </div>\r
  @if (course().actors?.length) {\r
    <p class="patrol-notice">{{ sample() ? 'Patrols follow the run timeline. Use WAIT to time your crossing.' : (renderer() === 'game' ? 'Patrol preview \u2014 every run resets the routes. Use WAIT to time your crossing.' : 'Patrols shown at their starting positions. Run a program to watch their movement.') }}</p>\r
  }\r
  @if (renderer() === 'game') {\r
    @if (rendererStatus() === 'loading') { <p class="renderer-message" role="status">Preparing the course\u2026</p> }\r
    <div role="img" [attr.aria-label]="description()">\r
      <app-phaser-robot-course [view]="gameView()" (status)="setRendererStatus($event)" />\r
    </div>\r
  } @else {\r
  @if (rendererStatus() === 'failed') {\r
    <p class="renderer-message" role="status">Game graphics are unavailable. The course map and replay controls are still available.</p>\r
  }\r
  <svg\r
    [attr.viewBox]="'-30 -22 ' + (course().widthCm + 52) + ' ' + (course().heightCm + 50)"\r
    role="img"\r
    [attr.aria-label]="\r
      course().name +\r
      '. Robot at ' +\r
      pose().xCm.toFixed(1) +\r
      ', ' +\r
      pose().yCm.toFixed(1) +\r
      ' centimeters, heading ' +\r
      pose().headingDeg.toFixed(0) +\r
      ' degrees.'\r
    "\r
  >\r
    <defs>\r
      <linearGradient [attr.id]="artId + '-floor'" x2="0.7" y2="1">\r
        <stop stop-color="#253f53" />\r
        <stop offset="1" stop-color="#142635" />\r
      </linearGradient>\r
      <linearGradient [attr.id]="artId + '-metal'" x2="0.2" y2="1">\r
        <stop stop-color="#668298" />\r
        <stop offset=".25" stop-color="#3f5b72" />\r
        <stop offset="1" stop-color="#243c50" />\r
      </linearGradient>\r
      <linearGradient [attr.id]="artId + '-robot'" x2="1" y2="1">\r
        <stop stop-color="#66e5cd" />\r
        <stop offset=".45" stop-color="#169c96" />\r
        <stop offset="1" stop-color="#095669" />\r
      </linearGradient>\r
      <linearGradient [attr.id]="artId + '-armor'" x2="0.5" y2="1">\r
        <stop stop-color="#ffffff" />\r
        <stop offset="1" stop-color="#a7c5cd" />\r
      </linearGradient>\r
      <linearGradient [attr.id]="artId + '-cargo'" x2=".4" y2="1">\r
        <stop stop-color="#ffce80" />\r
        <stop offset=".35" stop-color="#eda950" />\r
        <stop offset="1" stop-color="#bd6927" />\r
      </linearGradient>\r
      <radialGradient [attr.id]="artId + '-spot'">\r
        <stop stop-color="#33ccb8" stop-opacity=".2" />\r
        <stop offset="1" stop-color="#33ccb8" stop-opacity="0" />\r
      </radialGradient>\r
      <radialGradient [attr.id]="artId + '-dock'">\r
        <stop stop-color="#ffbf59" stop-opacity=".28" />\r
        <stop offset="1" stop-color="#ffbf59" stop-opacity="0" />\r
      </radialGradient>\r
      <linearGradient [attr.id]="artId + '-beam'" x2="0" y2="1">\r
        <stop stop-color="#affff0" stop-opacity="0" />\r
        <stop offset="1" stop-color="#affff0" stop-opacity=".26" />\r
      </linearGradient>\r
      <pattern\r
        [attr.id]="artId + '-tiles'"\r
        [attr.width]="course().gridSizeCm"\r
        [attr.height]="course().gridSizeCm"\r
        patternUnits="userSpaceOnUse"\r
      >\r
        <rect\r
          x=".5"\r
          y=".5"\r
          [attr.width]="course().gridSizeCm - 1"\r
          [attr.height]="course().gridSizeCm - 1"\r
          rx="1"\r
          [attr.fill]="paint('floor')"\r
        />\r
        <path\r
          [attr.d]="'M 1 ' + (course().gridSizeCm - 1) + ' V 1 H ' + (course().gridSizeCm - 1)"\r
          stroke="#7597aa"\r
          stroke-opacity=".28"\r
          stroke-width=".5"\r
          fill="none"\r
        />\r
        <circle cx="2.5" cy="2.5" r=".5" fill="#7696a5" opacity=".4" />\r
      </pattern>\r
      <pattern\r
        [attr.id]="artId + '-hazard'"\r
        width="8"\r
        height="8"\r
        patternUnits="userSpaceOnUse"\r
        patternTransform="rotate(45)"\r
      >\r
        <rect width="8" height="8" fill="#f8b752" />\r
        <rect width="4" height="8" fill="#283945" />\r
      </pattern>\r
      <filter\r
        [attr.id]="artId + '-glow'"\r
        filterUnits="userSpaceOnUse"\r
        x="-50"\r
        y="-50"\r
        [attr.width]="course().widthCm + 100"\r
        [attr.height]="course().heightCm + 100"\r
      >\r
        <feGaussianBlur stdDeviation="1.5" />\r
        <feMerge>\r
          <feMergeNode />\r
          <feMergeNode in="SourceGraphic" />\r
        </feMerge>\r
      </filter>\r
      <filter [attr.id]="artId + '-shadow'" x="-50%" y="-50%" width="200%" height="220%">\r
        <feDropShadow dx="1.5" dy="3" stdDeviation="2" flood-color="#030d17" flood-opacity=".7" />\r
      </filter>\r
      <symbol [attr.id]="artId + '-crate'" viewBox="-9 -10 18 20">\r
        <path d="M-8-7H8V8L5 10H-6L-9 7Z" fill="#8f501e" />\r
        <rect\r
          x="-8"\r
          y="-9"\r
          width="16"\r
          height="16"\r
          rx="2"\r
          [attr.fill]="paint('cargo')"\r
          stroke="#ffe0a1"\r
          stroke-width=".5"\r
        />\r
        <path d="M-3-9V7M3-9V7" stroke="#724e2f" stroke-width="1.5" opacity=".6" />\r
        <path d="M-7-7H7" stroke="#ffdfa2" stroke-width=".7" />\r
        <rect x="-2.5" y="-4" width="5" height="4" rx=".4" fill="#ffe9ba" />\r
      </symbol>\r
    </defs>\r
\r
    <rect\r
      x="-5"\r
      y="-5"\r
      [attr.width]="course().widthCm + 10"\r
      [attr.height]="course().heightCm + 12"\r
      rx="7"\r
      fill="#081624"\r
      stroke="#4d6b7e"\r
      stroke-width="1.2"\r
    />\r
    <rect\r
      x="0"\r
      y="0"\r
      [attr.width]="course().widthCm"\r
      [attr.height]="course().heightCm"\r
      rx="2"\r
      [attr.fill]="paint('tiles')"\r
      stroke="#477789"\r
      stroke-width=".8"\r
    />\r
    <ellipse\r
      [attr.cx]="course().widthCm * 0.5"\r
      [attr.cy]="course().heightCm * 0.35"\r
      [attr.rx]="course().widthCm * 0.65"\r
      [attr.ry]="course().heightCm * 0.6"\r
      [attr.fill]="paint('spot')"\r
      pointer-events="none"\r
    />\r
    @for (x of xTicks(); track x) {\r
      <text [attr.x]="x" [attr.y]="course().heightCm + 19" text-anchor="middle" class="ruler">\r
        {{ x }}\r
      </text>\r
      <path\r
        [attr.d]="'M ' + x + ' ' + (course().heightCm + 5) + ' v 4'"\r
        stroke="#7192a5"\r
        stroke-width=".7"\r
      />\r
    }\r
    @for (y of yTicks(); track y) {\r
      <text x="-11" [attr.y]="flip(y) + 2.5" text-anchor="end" class="ruler">{{ y }}</text>\r
    }\r
    <text [attr.x]="course().widthCm" y="-12" text-anchor="end" class="north">\r
      N \u2191 \xB7 CENTIMETERS\r
    </text>\r
    <path\r
      [attr.d]="\r
        'M 3 18 V 3 H 18 M ' +\r
        (course().widthCm - 18) +\r
        ' 3 H ' +\r
        (course().widthCm - 3) +\r
        ' V 18 M 3 ' +\r
        (course().heightCm - 18) +\r
        ' V ' +\r
        (course().heightCm - 3) +\r
        ' H 18 M ' +\r
        (course().widthCm - 18) +\r
        ' ' +\r
        (course().heightCm - 3) +\r
        ' H ' +\r
        (course().widthCm - 3) +\r
        ' V ' +\r
        (course().heightCm - 18)\r
      "\r
      stroke="#66e5d6"\r
      stroke-width="2"\r
      fill="none"\r
      opacity=".8"\r
    />\r
\r
    @for (zone of course().deliveryZones; track zone.id) {\r
      <g class="delivery-zone" [class.delivered]="zoneDelivered(zone.id)">\r
        <rect\r
          [attr.x]="zone.xCm"\r
          [attr.y]="flip(zone.yCm + zone.heightCm) + 2"\r
          [attr.width]="zone.widthCm"\r
          [attr.height]="zone.heightCm"\r
          rx="3"\r
          fill="#091a22"\r
        />\r
        <rect\r
          [attr.x]="zone.xCm"\r
          [attr.y]="flip(zone.yCm + zone.heightCm)"\r
          [attr.width]="zone.widthCm"\r
          [attr.height]="zone.heightCm"\r
          rx="3"\r
          fill="#183e3d"\r
          stroke="#62e6b0"\r
          stroke-width="1.4"\r
          [attr.filter]="paint('glow')"\r
        />\r
        <rect\r
          [attr.x]="zone.xCm + 3"\r
          [attr.y]="flip(zone.yCm + zone.heightCm) + 3"\r
          [attr.width]="zone.widthCm - 6"\r
          [attr.height]="zone.heightCm - 6"\r
          rx="1"\r
          fill="none"\r
          stroke="#80e9bb"\r
          stroke-opacity=".45"\r
          stroke-dasharray="2 2"\r
        />\r
        <text\r
          [attr.x]="zone.xCm + zone.widthCm / 2"\r
          [attr.y]="flip(zone.yCm + zone.heightCm / 2) + 3"\r
          text-anchor="middle"\r
          class="zone-letter"\r
        >\r
          {{ zoneDelivered(zone.id) ? '\u2713' : zone.label }}\r
        </text>\r
        <text\r
          [attr.x]="zone.xCm + zone.widthCm / 2"\r
          [attr.y]="flip(zone.yCm + zone.heightCm) - 7"\r
          text-anchor="middle"\r
          class="zone-label"\r
        >\r
          {{ zone.label }} \xB7 {{ zoneDelivered(zone.id) ? 'DELIVERED' : 'DELIVERY' }}\r
        </text>\r
      </g>\r
    }\r
    @for (point of course().checkpoints; track point.id) {\r
      <g [attr.transform]="'translate(' + point.xCm + ' ' + flip(point.yCm) + ')'">\r
        <circle\r
          [attr.r]="point.radiusCm + 3"\r
          fill="#312e31"\r
          stroke="#ddb066"\r
          stroke-dasharray="2 2"\r
        />\r
        <path d="M -3 0 H 3 M 0 -3 V 3" stroke="#ffd681" />\r
      </g>\r
    }\r
\r
    <circle\r
      [attr.cx]="course().startPose.xCm"\r
      [attr.cy]="flip(course().startPose.yCm)"\r
      r="12"\r
      fill="#14343b"\r
      stroke="#5bacae"\r
      stroke-dasharray="2 2"\r
    />\r
    <text\r
      [attr.x]="course().startPose.xCm"\r
      [attr.y]="flip(course().startPose.yCm) + 21"\r
      text-anchor="middle"\r
      class="start-label"\r
    >\r
      START\r
    </text>\r
    <g\r
      [attr.transform]="'translate(' + target().xCm + ' ' + flip(target().yCm) + ')'"\r
      class="parking-dock"\r
    >\r
      <circle r="27" [attr.fill]="paint('dock')" />\r
      <circle cy="2" r="15" fill="#151f2a" stroke="#704c29" />\r
      <circle\r
        r="15"\r
        fill="#3d3430"\r
        stroke="#ffbc55"\r
        stroke-width="1.6"\r
        [attr.filter]="paint('glow')"\r
      />\r
      <circle r="11.5" fill="none" stroke="#ffdc97" stroke-width=".8" stroke-dasharray="5 3" />\r
      <path d="M -6 0 H 6 M 0 -6 V 6" stroke="#ffdfaa" stroke-width="1.5" />\r
      <path\r
        d="M -19 -6 V -19 H -6 M 6 -19 H 19 V -6 M -19 6 V 19 H -6 M 6 19 H 19 V 6"\r
        fill="none"\r
        stroke="#ffc96b"\r
        stroke-width=".8"\r
        opacity=".7"\r
      />\r
      <text y="-25" text-anchor="middle" class="dock-label">PARK</text>\r
    </g>\r
    @if (showTrace()) {\r
      <polyline\r
        [attr.points]="trace()"\r
        fill="none"\r
        stroke="#39dbc7"\r
        stroke-width="6"\r
        stroke-opacity=".14"\r
        stroke-linejoin="round"\r
      />\r
      <polyline\r
        [attr.points]="trace()"\r
        fill="none"\r
        stroke="#70f4df"\r
        stroke-width="1.5"\r
        stroke-linejoin="round"\r
        stroke-linecap="round"\r
        [attr.filter]="paint('glow')"\r
      />\r
    }\r
    @for (wall of course().obstacles; track wall.id) {\r
      <g\r
        class="storage-rack"\r
        [attr.transform]="'translate(' + wall.xCm + ' ' + flip(wall.yCm + wall.heightCm) + ')'"\r
      >\r
        <rect\r
          x="2"\r
          y="4"\r
          [attr.width]="wall.widthCm"\r
          [attr.height]="wall.heightCm"\r
          rx="3"\r
          fill="#030b13"\r
          opacity=".65"\r
        />\r
        <rect\r
          x="0"\r
          y="0"\r
          [attr.width]="wall.widthCm"\r
          [attr.height]="wall.heightCm"\r
          rx="2"\r
          [attr.fill]="paint('metal')"\r
          stroke="#7d98a9"\r
          stroke-width=".8"\r
        />\r
        <rect\r
          x="0"\r
          [attr.y]="wall.heightCm - 5"\r
          [attr.width]="wall.widthCm"\r
          height="5"\r
          [attr.fill]="paint('hazard')"\r
        />\r
        <path\r
          [attr.d]="\r
            'M 3 ' +\r
            (wall.heightCm - 6) +\r
            ' V 3 H ' +\r
            (wall.widthCm - 3) +\r
            ' V ' +\r
            (wall.heightCm - 6)\r
          "\r
          stroke="#9db3bd"\r
          stroke-width="2"\r
          fill="none"\r
        />\r
        @for (crate of rackCrates(wall.widthCm, wall.heightCm); track $index) {\r
          <use\r
            [attr.href]="'#' + artId + '-crate'"\r
            [attr.x]="crate.x"\r
            [attr.y]="crate.y"\r
            width="16"\r
            height="18"\r
          />\r
        }\r
        <rect\r
          x="4"\r
          [attr.y]="wall.heightCm - 17"\r
          [attr.width]="wall.widthCm - 8"\r
          height="10"\r
          rx="1"\r
          fill="#122839"\r
        />\r
        <text\r
          [attr.x]="wall.widthCm / 2"\r
          [attr.y]="wall.heightCm - 10"\r
          text-anchor="middle"\r
          class="rack-label"\r
        >\r
          {{ wall.label }}\r
        </text>\r
        <circle cx="3" cy="3" r="1" fill="#d8e6e9" />\r
        <circle [attr.cx]="wall.widthCm - 3" cy="3" r="1" fill="#d8e6e9" />\r
      </g>\r
    }\r
    @for (pkg of course().packages; track pkg.id) {\r
      @if (\r
        !sample()?.carryingPackageIds?.includes(pkg.id) &&\r
        !sample()?.deliveredPackageIds?.includes(pkg.id)\r
      ) {\r
        <g [attr.transform]="'translate(' + pkg.xCm + ' ' + flip(pkg.yCm) + ')'">\r
          <ellipse cy="7" rx="11" ry="6" fill="#030d16" opacity=".7" />\r
          <use\r
            [attr.href]="'#' + artId + '-crate'"\r
            x="-9"\r
            y="-10"\r
            width="18"\r
            height="20"\r
            [attr.filter]="paint('shadow')"\r
          />\r
          <text y="-15" text-anchor="middle" class="package-label">{{ pkg.label }}</text>\r
        </g>\r
      }\r
    }\r
    @for (state of actorStates(); track state.actor.id) {\r
      <polyline [attr.points]="state.route" fill="none" stroke="#eaa574" stroke-width="1" stroke-dasharray="3 3" />\r
      <g [attr.transform]="'translate(' + state.pose.xCm + ' ' + flip(state.pose.yCm) + ')'">\r
        @if (state.actor.kind === 'robot') {\r
          <circle [attr.r]="state.actor.radiusCm" fill="#c97453" stroke="#ffe0a3" stroke-width="1" />\r
          <path d="M -4 3 L 0 -6 L 4 3 Z" fill="#2c3a36" [attr.transform]="'rotate(' + state.pose.headingDeg + ')'" />\r
        } @else {\r
          <rect [attr.x]="-state.actor.widthCm / 2" [attr.y]="-state.actor.heightCm / 2" [attr.width]="state.actor.widthCm" [attr.height]="state.actor.heightCm" [attr.fill]="paint('hazard')" stroke="#ffe0a3" />\r
        }\r
        <text y="-23" text-anchor="middle" fill="#ffe0a3" font-size="7">{{ state.actor.label }}</text>\r
      </g>\r
    }\r
    <g\r
      class="rover"\r
      [attr.transform]="\r
        'translate(' + pose().xCm + ' ' + flip(pose().yCm) + ') rotate(' + pose().headingDeg + ')'\r
      "\r
    >\r
      <ellipse cy="3" rx="14" ry="14" fill="#06101b" opacity=".65" />\r
      <ellipse rx="22" ry="24" [attr.fill]="paint('spot')" />\r
      <path d="M-7-8 L-16-35 H16 L7-8Z" [attr.fill]="paint('beam')" pointer-events="none" />\r
      <g [attr.filter]="paint('shadow')">\r
        <rect\r
          x="-11"\r
          y="-8"\r
          width="5"\r
          height="17"\r
          rx="2"\r
          fill="#071722"\r
          stroke="#527483"\r
          stroke-width=".5"\r
        />\r
        <rect\r
          x="6"\r
          y="-8"\r
          width="5"\r
          height="17"\r
          rx="2"\r
          fill="#071722"\r
          stroke="#527483"\r
          stroke-width=".5"\r
        />\r
        @for (y of [-5, -2, 1, 4, 7]; track y) {\r
          <path\r
            [attr.d]="'M -10 ' + y + ' h 3 M 7 ' + y + ' h 3'"\r
            stroke="#45606c"\r
            stroke-width=".8"\r
          />\r
        }\r
        <rect\r
          x="-8"\r
          y="-10"\r
          width="16"\r
          height="21"\r
          rx="5"\r
          [attr.fill]="paint('robot')"\r
          stroke="#8af5de"\r
          stroke-width=".6"\r
        />\r
        <path d="M-6-7Q-6-10 0-10Q6-10 6-7L5 1H-5Z" [attr.fill]="paint('armor')" />\r
        <rect\r
          x="-5.5"\r
          y="-8"\r
          width="11"\r
          height="5.5"\r
          rx="2.3"\r
          fill="#0b2535"\r
          stroke="#72999f"\r
          stroke-width=".4"\r
        />\r
        <rect x="-3.5" y="-6.5" width="2.3" height="2" rx=".5" fill="#79ffdf" />\r
        <rect x="1.2" y="-6.5" width="2.3" height="2" rx=".5" fill="#79ffdf" />\r
        <path d="M-5 4H5V8H-5Z" fill="#153944" stroke="#70b9b5" stroke-width=".4" />\r
        <rect x="-7" y="-9" width="2" height="1.5" rx=".5" fill="#ffe29c" />\r
        <rect x="5" y="-9" width="2" height="1.5" rx=".5" fill="#ffe29c" />\r
        <path d="M-6 9H6" stroke="#36e0ba" stroke-width="1.2" />\r
        @if (sample()?.carryingPackageIds?.length) {\r
          <use [attr.href]="'#' + artId + '-crate'" x="-5" y="1" width="10" height="11" />\r
        }\r
      </g>\r
    </g>\r
  </svg>\r
  }\r
  @if (course().packages.length) {\r
    <div class="arena-bottom"><span>{{ sample()?.deliveredPackageIds?.length ?? 0 }} / {{ course().packages.length }} deliveries</span></div>\r
  }\r
</div>\r
<details class="course-description">\r
  <summary>Map & view options</summary>\r
  <div class="view-controls" aria-label="Course view controls">\r
    <button type="button" [attr.aria-pressed]="renderer() === 'game'" (click)="renderer.set('game')">Game view</button>\r
    <button type="button" [attr.aria-pressed]="renderer() === 'map'" (click)="renderer.set('map')">Map view</button>\r
    @if (renderer() === 'game') {\r
      @if (course().visualTheme === 'workshop') {\r
        <button type="button" [attr.aria-pressed]="!fullOverview() && !follow()" (click)="objectiveView()">Parking lane</button>\r
      }\r
      <button type="button" (click)="overview()">Overview</button>\r
      <button type="button" [attr.aria-pressed]="follow()" (click)="followRobot()">Follow robot</button>\r
      <button type="button" aria-label="Zoom out" [disabled]="zoom() <= 1" (click)="changeZoom(-0.25)">\u2212</button>\r
      <button type="button" aria-label="Zoom in" [disabled]="zoom() >= 3" (click)="changeZoom(0.25)">+</button>\r
    }\r
  </div>\r
  <ng-content />\r
  <p>Each square = {{ course().gridSizeCm }} cm</p>\r
  <p>{{ description() }} Heading 0\xB0 points north; 90\xB0 points east.</p>\r
  <ul>\r
    @for (target of course().targets; track $index) {\r
      <li>{{ target.label }}: ({{ target.xCm }}, {{ target.yCm }}) cm, heading {{ target.headingDeg }}\xB0.</li>\r
    }\r
    @for (wall of course().obstacles; track wall.id) {\r
      <li>{{ wall.label }}: obstacle from ({{ wall.xCm }}, {{ wall.yCm }}) cm, {{ wall.widthCm }} \xD7 {{ wall.heightCm }} cm.</li>\r
    }\r
    @for (pkg of course().packages; track pkg.id) {\r
      <li>{{ pkg.label }}: pickup at ({{ pkg.xCm }}, {{ pkg.yCm }}) cm.</li>\r
    }\r
    @for (zone of course().deliveryZones; track zone.id) {\r
      <li>{{ zone.label }}: delivery zone from ({{ zone.xCm }}, {{ zone.yCm }}) cm, {{ zone.widthCm }} \xD7 {{ zone.heightCm }} cm.</li>\r
    }\r
    @for (state of actorStates(); track state.actor.id) {\r
      <li>{{ state.actor.label }}: {{ state.actor.speedCmPerSecond }} cm/s, {{ state.actor.patrol }} route, {{ state.actor.pauseSeconds ?? 0 }} second pause at each waypoint. Route:\r
        @for (point of state.actor.path; track $index) { ({{ point.xCm }}, {{ point.yCm }}) cm{{ $last ? '.' : ' \u2192 ' }} }\r
      </li>\r
    }\r
    @for (checkpoint of course().checkpoints; track checkpoint.id) {\r
      <li>Checkpoint: ({{ checkpoint.xCm }}, {{ checkpoint.yCm }}) cm, radius {{ checkpoint.radiusCm }} cm.</li>\r
    }\r
  </ul>\r
</details>\r
`, styles: ["/* src/app/templates/programming-automation/ui/robot-course.component.css */\n:host {\n  display: block;\n  min-width: 0;\n}\n.arena.workshop {\n  padding: 0;\n  border-radius: 2px;\n  background: #142d2c;\n  box-shadow: none;\n  border-color: #647970;\n}\n.arena.tabletop {\n  padding: 0;\n  background: #bebeb0;\n  border-color: #a2a798;\n  border-radius: 4px;\n  box-shadow: none;\n}\n.tabletop .arena-hud,\n.tabletop .arena-bottom {\n  padding: 9px 12px;\n  background: #243c37;\n}\n.tabletop .view-controls {\n  padding: 7px 10px;\n  background: #243c37;\n}\n.tabletop .arena-hud {\n  margin-bottom: 0;\n}\n.tabletop .arena-bottom {\n  margin-top: 0;\n}\n.patrol-notice {\n  margin: 0;\n  padding: 9px 12px;\n  color: #f4e6c2;\n  background: #3e4b3c;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.workshop .arena-hud,\n.workshop .arena-bottom {\n  display: none;\n}\n.workshop .view-controls {\n  padding: 7px 10px;\n  background: #152b2b;\n  gap: 4px;\n}\n.workshop .view-controls button {\n  border-radius: 2px;\n  min-height: 32px;\n  padding: 5px 8px;\n}\n.workshop .course-description {\n  padding: 8px 12px;\n}\n.view-controls {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  padding: 4px 0 12px;\n}\n.view-controls button {\n  min-height: 36px;\n  padding: 6px 10px;\n  color: #daedf1;\n  background: #1b3545;\n  border: 1px solid #547583;\n  border-radius: 6px;\n  cursor: pointer;\n  font: 600 11px system-ui, sans-serif;\n}\n.view-controls button[aria-pressed=true] {\n  background: #215b58;\n  border-color: #77dcc8;\n  color: #d6fff2;\n}\n.view-controls button:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.view-controls button:focus-visible,\n.course-description summary:focus-visible {\n  outline: 2px solid #ffcf7d;\n  outline-offset: 3px;\n}\n.renderer-message {\n  color: #ffdda4;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.course-description {\n  color: #c0d7df;\n  font-size: 12px;\n  line-height: 1.6;\n  padding-top: 10px;\n}\n.course-description summary {\n  cursor: pointer;\n  min-height: 32px;\n}\n.course-description ul {\n  padding-left: 20px;\n}\n.arena {\n  position: relative;\n  background:\n    radial-gradient(\n      ellipse at 60% 30%,\n      #203e50,\n      #0b1b2b 80%);\n  border: 1px solid #527f8f;\n  border-radius: 16px;\n  padding: 13px 10px 10px;\n  box-shadow:\n    inset 0 1px 0 #b0f7e950,\n    inset 0 -2px 16px #03132070,\n    0 12px 40px #020d2050,\n    0 0 24px #35d4c010;\n  overflow: hidden;\n}\n.arena-hud,\n.arena-bottom {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n  font: 600 9px ui-monospace, monospace;\n  letter-spacing: 1px;\n  color: #97b4c6;\n  padding: 0 5px;\n}\n.arena-hud {\n  padding: 6px 5px 15px;\n  border-bottom: 1px solid #6994a02b;\n  margin-bottom: 8px;\n}\n.arena-id {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n  color: #d7edf0;\n  font-size: 10px;\n  letter-spacing: 1.7px;\n}\n.arena-id i,\n.robot-dot {\n  display: inline-block;\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: #66e9cb;\n  box-shadow: 0 0 8px #66e9cb;\n}\n.target-distance {\n  font-size: 8px;\n  color: #a7b9c6;\n}\n.target-distance strong {\n  color: #ffce7e;\n  font-size: 10px;\n  letter-spacing: 0;\n  margin-left: 4px;\n}\n.arena-bottom {\n  border-top: 1px solid #54768a40;\n  padding-top: 9px;\n  margin-top: 4px;\n  font-size: 8px;\n  letter-spacing: 0.6px;\n}\n.arena-bottom span {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\nsvg {\n  width: 100%;\n  max-height: 510px;\n  display: block;\n  overflow: visible;\n}\ntext {\n  font: 7px ui-monospace, monospace;\n  fill: #c5d9e3;\n}\n.ruler {\n  fill: #94b1c4;\n  font-size: 7px;\n}\n.north {\n  font-size: 6px;\n  letter-spacing: 0.8px;\n  fill: #99bbc9;\n}\n.zone-letter {\n  fill: #b3ffce;\n  font: bold 10px system-ui;\n}\n.zone-label {\n  fill: #a1e9be;\n  font-size: 5.5px;\n  letter-spacing: 0.4px;\n}\n.start-label {\n  fill: #91b8c7;\n  font-size: 5.5px;\n  letter-spacing: 0.8px;\n}\n.dock-label {\n  fill: #ffdc98;\n  font: bold 6px ui-monospace, monospace;\n  letter-spacing: 1px;\n}\n.rack-label {\n  fill: #d9e5e9;\n  font-size: 5.5px;\n}\n.package-label {\n  fill: #ffce87;\n  font-size: 7px;\n  font-weight: 700;\n  paint-order: stroke;\n  stroke: #14293a;\n  stroke-width: 2px;\n  stroke-linejoin: round;\n}\n.legend {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  font-size: 10px;\n  color: #648291;\n  padding: 12px 2px;\n}\n.legend span {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.legend i {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 2px;\n}\n.robot {\n  background: #20af9e;\n}\n.target {\n  background: #e4a54d;\n}\n.trace {\n  background: #32cab7;\n}\n@media (max-width: 700px) {\n  .arena {\n    padding: 10px 6px;\n  }\n  .arena-hud {\n    font-size: 8px;\n    letter-spacing: 0.5px;\n  }\n  .arena-bottom {\n    font-size: 7px;\n  }\n  .legend {\n    font-size: 9px;\n    gap: 8px;\n  }\n}\n/*# sourceMappingURL=robot-course.component.css.map */\n"] }]
  }], () => [], { result: [{ type: Input, args: [{ isSignal: true, alias: "result", required: false }] }], events: [{ type: Input, args: [{ isSignal: true, alias: "events", required: false }] }], course: [{ type: Input, args: [{ isSignal: true, alias: "course", required: true }] }], robotRadiusCm: [{ type: Input, args: [{ isSignal: true, alias: "robotRadiusCm", required: false }] }], targetIndex: [{ type: Input, args: [{ isSignal: true, alias: "targetIndex", required: false }] }], sample: [{ type: Input, args: [{ isSignal: true, alias: "sample", required: false }] }], samples: [{ type: Input, args: [{ isSignal: true, alias: "samples", required: false }] }], showTrace: [{ type: Input, args: [{ isSignal: true, alias: "showTrace", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RobotCourseComponent, { className: "RobotCourseComponent", filePath: "src/app/templates/programming-automation/ui/robot-course.component.ts", lineNumber: 14 });
})();

// src/app/templates/programming-automation/ui/command-graphic.component.ts
var diagrams = {
  "move-distance": {
    detail: "M12 44h40v10H12z M20 44v5 M28 44v7 M36 44v5 M44 44v7",
    accent: "M14 24h21v13H14z M18 20v4 M30 20v4 M18 37v3 M30 37v3",
    arrow: "M38 30h15 M47 24l6 6-6 6"
  },
  "move-rotations": {
    detail: "M46 34a14 14 0 1 1-28 0 14 14 0 0 1 28 0 M32 20v28 M18 34h28",
    accent: "M37 34a5 5 0 1 1-10 0 5 5 0 0 1 10 0",
    arrow: "M12 24a22 22 0 0 1 40-2 M43 21l9 1 1-9"
  },
  "turn-degrees": {
    detail: "M16 15v35h35 M16 39h11v11",
    accent: "M12 43h8v10h-8z",
    arrow: "M25 20c16 0 23 8 23 20 M42 34l6 6 6-6"
  },
  "turn-fraction": {
    detail: "M32 12a20 20 0 1 0 20 20 M32 32H12 M32 32v20",
    accent: "M32 32V12a20 20 0 0 1 20 20z",
    arrow: "M40 8a25 25 0 0 1 17 17 M50 20l7 5 3-8"
  },
  wait: {
    detail: "M52 34a20 20 0 1 1-40 0 20 20 0 0 1 40 0 M27 8h10 M32 8v6",
    accent: "M23 27h5v15h-5z M36 27h5v15h-5z",
    arrow: "M46 13l5 5"
  },
  "pick-up": {
    detail: "M12 36l14-7 14 7v17l-14 7-14-7z M12 36l14 7 14-7 M26 43v17",
    accent: "M19 33l14 7v7l-7-4v-7z",
    arrow: "M49 38V10 M42 17l7-7 7 7"
  },
  "drop-off": {
    detail: "M10 25l14-7 14 7v17l-14 7-14-7z M10 25l14 7 14-7 M24 32v17 M9 55h47",
    accent: "M17 21l14 7v7l-7-4v-7z",
    arrow: "M49 12v31 M42 36l7 7 7-7"
  },
  repeat: {
    detail: "M21 26h22v13H21z M27 32h10",
    accent: "M24 43h16v6H24z",
    arrow: "M13 34V23a9 9 0 0 1 9-9h27 M43 8l6 6-6 6 M51 30v13a9 9 0 0 1-9 9H15 M21 46l-6 6 6 6"
  }
};
var CommandGraphicComponent = class _CommandGraphicComponent {
  type = input.required(
    ...ngDevMode ? [{ debugName: "type" }] : (
      /* istanbul ignore next */
      []
    )
  );
  direction = input(
    "right",
    ...ngDevMode ? [{ debugName: "direction" }] : (
      /* istanbul ignore next */
      []
    )
  );
  diagrams = diagrams;
  static \u0275fac = function CommandGraphicComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CommandGraphicComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CommandGraphicComponent, selectors: [["app-command-graphic"]], hostAttrs: ["aria-hidden", "true"], inputs: { type: [1, "type"], direction: [1, "direction"] }, decls: 5, vars: 4, consts: [["viewBox", "0 0 64 64", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true", "focusable", "false"], ["fill", "currentColor", "fill-opacity", "0.2"], ["stroke-width", "3.5"]], template: function CommandGraphicComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0)(1, "g");
      \u0275\u0275domElement(2, "path")(3, "path", 1)(4, "path", 2);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275attribute("transform", ctx.direction() === "left" ? "translate(64 0) scale(-1 1)" : null);
      \u0275\u0275advance();
      \u0275\u0275attribute("d", ctx.diagrams[ctx.type()].detail);
      \u0275\u0275advance();
      \u0275\u0275attribute("d", ctx.diagrams[ctx.type()].accent);
      \u0275\u0275advance();
      \u0275\u0275attribute("d", ctx.diagrams[ctx.type()].arrow);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  flex: 0 0 auto;\n  width: 64px;\n  height: 64px;\n}\nsvg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=command-graphic.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CommandGraphicComponent, [{
    type: Component,
    args: [{ selector: "app-command-graphic", changeDetection: ChangeDetectionStrategy.OnPush, host: { "aria-hidden": "true" }, template: `
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <g [attr.transform]="direction() === 'left' ? 'translate(64 0) scale(-1 1)' : null">
        <path [attr.d]="diagrams[type()].detail" />
        <path [attr.d]="diagrams[type()].accent" fill="currentColor" fill-opacity="0.2" />
        <path [attr.d]="diagrams[type()].arrow" stroke-width="3.5" />
      </g>
    </svg>
  `, styles: ["/* angular:styles/component:scss;a7ab121f1bc776c679d504d82ca7ca61005961c36cb7904cbcd52f656e2a6029;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/programming-automation/ui/command-graphic.component.ts */\n:host {\n  display: block;\n  flex: 0 0 auto;\n  width: 64px;\n  height: 64px;\n}\nsvg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=command-graphic.component.css.map */\n"] }]
  }], null, { type: [{ type: Input, args: [{ isSignal: true, alias: "type", required: true }] }], direction: [{ type: Input, args: [{ isSignal: true, alias: "direction", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CommandGraphicComponent, { className: "CommandGraphicComponent", filePath: "src/app/templates/programming-automation/ui/command-graphic.component.ts", lineNumber: 84 });
})();

// src/app/templates/programming-automation/ui/command-catalog.ts
var commandLabels = {
  "move-distance": "Move distance",
  "move-rotations": "Move rotations",
  "turn-degrees": "Turn degrees",
  "turn-fraction": "Turn fraction",
  wait: "Wait",
  "pick-up": "Pick up",
  "drop-off": "Drop off",
  repeat: "Repeat"
};
var commandDescriptions = {
  "move-distance": "Drive forward a distance in centimeters.",
  "move-rotations": "Drive forward by spinning the wheels.",
  "turn-degrees": "Turn left or right by an angle.",
  "turn-fraction": "Turn left or right by part of a full circle.",
  wait: "Pause before the next block.",
  "pick-up": "Collect a package at the robot\u2019s position.",
  "drop-off": "Deliver a package to its matching zone.",
  repeat: "Run the blocks inside a set number of times."
};
var commandGroups = [
  { id: "motion", label: "Motion", types: ["move-distance", "move-rotations"] },
  { id: "turning", label: "Turning", types: ["turn-degrees", "turn-fraction"] },
  { id: "cargo", label: "Cargo", types: ["pick-up", "drop-off"] },
  { id: "control", label: "Control", types: ["repeat", "wait"] }
];

// src/app/templates/programming-automation/ui/command-palette.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function CommandPaletteComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275listener("click", function CommandPaletteComponent_For_7_Template_button_click_0_listener() {
      const group_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.filter.set(group_r2.id));
    });
    \u0275\u0275element(1, "i", 7);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("data-group", group_r2.id)("aria-pressed", ctx_r2.activeFilter() === group_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", group_r2.label, " ");
  }
}
function CommandPaletteComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.destination());
  }
}
function CommandPaletteComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function CommandPaletteComponent_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.programEnd.emit());
    });
    \u0275\u0275text(1, " Use program end ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r2.readOnly());
  }
}
function CommandPaletteComponent_For_13_For_7_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "b");
    \u0275\u0275text(4, "?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const math_r7 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", math_r7.given, " ", math_r7.symbol);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(math_r7.unit);
  }
}
function CommandPaletteComponent_For_13_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function CommandPaletteComponent_For_13_For_7_Template_button_click_0_listener() {
      const type_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.add(type_r6));
    });
    \u0275\u0275elementStart(1, "span", 11);
    \u0275\u0275element(2, "app-command-graphic", 12);
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "b", 7);
    \u0275\u0275text(6, "+");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, CommandPaletteComponent_For_13_For_7_Conditional_7_Template, 7, 3, "span", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_25_0;
    const type_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", ctx_r2.descriptions[type_r6])("disabled", ctx_r2.readOnly());
    \u0275\u0275attribute("aria-label", "Add " + ctx_r2.labels[type_r6] + " to " + ctx_r2.destination());
    \u0275\u0275advance(2);
    \u0275\u0275property("type", type_r6);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.labels[type_r6]);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_25_0 = ctx_r2.mathPreview(type_r6)) ? 7 : -1, tmp_25_0);
  }
}
function CommandPaletteComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section")(1, "h4");
    \u0275\u0275element(2, "i", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(6, CommandPaletteComponent_For_13_For_7_Template, 8, 6, "button", 9, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r8 = ctx.$implicit;
    \u0275\u0275attribute("data-group", group_r8.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", group_r8.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r8.types.length);
    \u0275\u0275advance();
    \u0275\u0275repeater(group_r8.types);
  }
}
function CommandPaletteComponent_ForEmpty_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No blocks are available for this mission.");
    \u0275\u0275elementEnd();
  }
}
var CommandPaletteComponent = class _CommandPaletteComponent {
  allowed = input.required(
    ...ngDevMode ? [{ debugName: "allowed" }] : (
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
  moveMath = input(
    ...ngDevMode ? [void 0, { debugName: "moveMath" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mathPreview(type) {
    if (type !== "move-distance" && type !== "move-rotations")
      return void 0;
    const problem = this.moveMath()?.[type];
    return problem ? {
      given: problem.given,
      symbol: moveMathOperations[problem.operation].symbol,
      unit: type === "move-distance" ? "cm" : "rotations"
    } : void 0;
  }
  destination = input(
    "Program end",
    ...ngDevMode ? [{ debugName: "destination" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inLoop = input(
    false,
    ...ngDevMode ? [{ debugName: "inLoop" }] : (
      /* istanbul ignore next */
      []
    )
  );
  addBlock = output();
  programEnd = output();
  filter = signal(
    "all",
    ...ngDevMode ? [{ debugName: "filter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  labels = commandLabels;
  descriptions = commandDescriptions;
  groups = computed(
    () => commandGroups.map((group) => __spreadProps(__spreadValues({}, group), {
      types: group.types.filter((type) => this.allowed().includes(type))
    })).filter((group) => group.types.length),
    ...ngDevMode ? [{ debugName: "groups" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeFilter = computed(
    () => this.groups().some((group) => group.id === this.filter()) ? this.filter() : "all",
    ...ngDevMode ? [{ debugName: "activeFilter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visibleGroups = computed(
    () => this.groups().filter((group) => this.activeFilter() === "all" || group.id === this.activeFilter()),
    ...ngDevMode ? [{ debugName: "visibleGroups" }] : (
      /* istanbul ignore next */
      []
    )
  );
  add(type) {
    if (!this.readOnly() && this.allowed().includes(type))
      this.addBlock.emit(type);
  }
  static \u0275fac = function CommandPaletteComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CommandPaletteComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CommandPaletteComponent, selectors: [["app-command-palette"]], inputs: { allowed: [1, "allowed"], readOnly: [1, "readOnly"], moveMath: [1, "moveMath"], destination: [1, "destination"], inLoop: [1, "inLoop"] }, outputs: { addBlock: "addBlock", programEnd: "programEnd" }, decls: 15, vars: 6, consts: [["aria-label", "Code block library", 1, "palette"], ["role", "group", "aria-label", "Block categories", 1, "categories"], ["type", "button", 3, "click"], ["type", "button"], [1, "destination"], ["type", "button", 3, "disabled"], [1, "palette-list"], ["aria-hidden", "true"], ["type", "button", 3, "click", "disabled"], ["type", "button", 1, "palette-block", 3, "title", "disabled"], ["type", "button", 1, "palette-block", 3, "click", "title", "disabled"], [1, "block-title"], [3, "type"], [1, "math-preview"]], template: function CommandPaletteComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "aside", 0)(1, "h3");
      \u0275\u0275text(2, "Which block comes next?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1)(4, "button", 2);
      \u0275\u0275listener("click", function CommandPaletteComponent_Template_button_click_4_listener() {
        return ctx.filter.set("all");
      });
      \u0275\u0275text(5, " All ");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(6, CommandPaletteComponent_For_7_Template, 3, 3, "button", 3, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 4);
      \u0275\u0275conditionalCreate(9, CommandPaletteComponent_Conditional_9_Template, 2, 1, "strong");
      \u0275\u0275conditionalCreate(10, CommandPaletteComponent_Conditional_10_Template, 2, 1, "button", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 6);
      \u0275\u0275repeaterCreate(12, CommandPaletteComponent_For_13_Template, 8, 3, "section", null, _forTrack02, false, CommandPaletteComponent_ForEmpty_14_Template, 2, 0, "p");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-pressed", ctx.activeFilter() === "all");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.groups());
      \u0275\u0275advance(2);
      \u0275\u0275classProp("inside-loop", ctx.inLoop());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.inLoop() ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.inLoop() ? 10 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.visibleGroups());
    }
  }, dependencies: [CommandGraphicComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.palette[_ngcontent-%COMP%] {\n  background: #f8faff;\n  border: 1px solid #cfdaea;\n  border-radius: 14px;\n  overflow: hidden;\n}\nheader[_ngcontent-%COMP%] {\n  padding: 16px 14px 10px;\n  background:\n    linear-gradient(\n      130deg,\n      #e9efff,\n      #f8faff);\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font: 800 10px system-ui;\n  letter-spacing: 1.5px;\n  color: #5b6590;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 4px 0;\n  font-size: 19px;\n  color: #233e58;\n}\np[_ngcontent-%COMP%] {\n  margin: 6px 0;\n  font-size: 12px;\n  line-height: 1.5;\n  color: #5b7188;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #c77c08;\n  outline-offset: 3px;\n}\n.categories[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  padding: 8px 12px 12px;\n}\n.categories[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 6px 8px;\n  min-height: 32px;\n  border: 1px solid #d0dae9;\n  border-radius: 16px;\n  background: #fff;\n  color: #405a73;\n  font-size: 11px;\n}\n.categories[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: #425d89;\n  background: #233e61;\n  color: #fff;\n}\n[data-group=motion][_ngcontent-%COMP%] {\n  --%NS%group: #316ed5;\n  --%NS%edge: #1d50a6;\n}\n[data-group=turning][_ngcontent-%COMP%] {\n  --%NS%group: #7052cc;\n  --%NS%edge: #513799;\n}\n[data-group=cargo][_ngcontent-%COMP%] {\n  --%NS%group: #19824f;\n  --%NS%edge: #0f623a;\n}\n[data-group=control][_ngcontent-%COMP%] {\n  --%NS%group: #a45c13;\n  --%NS%edge: #7f440a;\n}\ni[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: var(--%NS%group);\n}\n.destination[_ngcontent-%COMP%] {\n  margin: 0 12px 8px;\n  padding: 9px;\n  background: #eaf0f7;\n  border-radius: 7px;\n  color: #65758a;\n  font-size: 9px;\n  letter-spacing: .7px;\n}\n.destination[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #29495f;\n  font-size: 12px;\n  letter-spacing: 0;\n  margin-top: 2px;\n}\n.destination.inside-loop[_ngcontent-%COMP%] {\n  background: #fff0d9;\n}\n.destination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 5px;\n  padding: 5px 0;\n  border: 0;\n  color: #7c4308;\n  background: transparent;\n  font-size: 11px;\n  text-decoration: underline;\n  min-height: 30px;\n}\n.palette-list[_ngcontent-%COMP%] {\n  padding: 0 12px 14px;\n  max-height: min(56vh, 600px);\n  overflow-y: auto;\n  scrollbar-width: thin;\n}\nh4[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: #4a6079;\n  margin: 12px 0 9px;\n  font-size: 12px;\n}\nh4[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 10px;\n  font-weight: 400;\n  color: #74869a;\n}\n.palette-block[_ngcontent-%COMP%] {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 10px 9px 12px;\n  margin: 0 0 13px;\n  border: 1px solid var(--%NS%edge);\n  border-radius: 7px;\n  color: white;\n  background: var(--%NS%group);\n  box-shadow: inset 0 2px 1px #ffffff30, 0 3px 0 var(--%NS%edge);\n  text-align: left;\n  transition: transform 120ms, filter 120ms;\n}\n.palette-block[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -6px;\n  left: 22px;\n  width: 26px;\n  height: 7px;\n  border-radius: 0 0 4px 4px;\n  background: var(--%NS%group);\n  border: 1px solid var(--%NS%edge);\n  border-top: 0;\n}\n.palette-block[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  filter: brightness(1.09);\n}\n.palette-block[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(1px);\n}\n.block-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\napp-command-graphic[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  flex: 0 0 30px;\n}\nstrong[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.25;\n}\n.block-title[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 19px;\n  font-weight: 400;\n}\n.block-description[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n  font-size: 11px;\n  line-height: 1.45;\n  color: #ffffffeb;\n}\n.math-preview[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 5px;\n  margin-top: 7px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.math-preview[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  min-width: 25px;\n  padding: 4px;\n  border-radius: 12px;\n  background: #fffdf3;\n  color: #344d72;\n  text-align: center;\n}\n@media (prefers-reduced-motion: reduce) {\n  .palette-block[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=command-palette.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CommandPaletteComponent, [{
    type: Component,
    args: [{ selector: "app-command-palette", imports: [CommandGraphicComponent], template: `<aside class="palette" aria-label="Code block library">
  <h3>Which block comes next?</h3>
  <div class="categories" role="group" aria-label="Block categories">
    <button
      type="button"
      [attr.aria-pressed]="activeFilter() === 'all'"
      (click)="filter.set('all')"
    >
      All
    </button>
    @for (group of groups(); track group.id) {
      <button
        type="button"
        [attr.data-group]="group.id"
        [attr.aria-pressed]="activeFilter() === group.id"
        (click)="filter.set(group.id)"
      >
        <i aria-hidden="true"></i>{{ group.label }}
      </button>
    }
  </div>
  <div class="destination" [class.inside-loop]="inLoop()">
    @if (inLoop()) {
      <strong>{{ destination() }}</strong>
    }
    @if (inLoop()) {
      <button type="button" [disabled]="readOnly()" (click)="programEnd.emit()">
        Use program end
      </button>
    }
  </div>
  <div class="palette-list">
    @for (group of visibleGroups(); track group.id) {
      <section [attr.data-group]="group.id">
        <h4>
          <i aria-hidden="true"></i>{{ group.label }} <span>{{ group.types.length }}</span>
        </h4>
        @for (type of group.types; track type) {
          <button
            class="palette-block"
            type="button"
            [title]="descriptions[type]"
            [disabled]="readOnly()"
            [attr.aria-label]="'Add ' + labels[type] + ' to ' + destination()"
            (click)="add(type)"
          >
            <span class="block-title"
              ><app-command-graphic [type]="type" /><strong>{{ labels[type] }}</strong
              ><b aria-hidden="true">+</b></span
            >
            @if (mathPreview(type); as math) {
              <span class="math-preview"
                ><span>{{ math.given }} {{ math.symbol }}</span
                ><b>?</b><span>{{ math.unit }}</span></span
              >
            }
          </button>
        }
      </section>
    } @empty {
      <p>No blocks are available for this mission.</p>
    }
  </div>
</aside>
`, styles: ['/* src/app/templates/programming-automation/ui/command-palette.component.css */\n:host {\n  display: block;\n  min-width: 0;\n}\n* {\n  box-sizing: border-box;\n}\n.palette {\n  background: #f8faff;\n  border: 1px solid #cfdaea;\n  border-radius: 14px;\n  overflow: hidden;\n}\nheader {\n  padding: 16px 14px 10px;\n  background:\n    linear-gradient(\n      130deg,\n      #e9efff,\n      #f8faff);\n}\n.eyebrow {\n  font: 800 10px system-ui;\n  letter-spacing: 1.5px;\n  color: #5b6590;\n}\nh3 {\n  margin: 4px 0;\n  font-size: 19px;\n  color: #233e58;\n}\np {\n  margin: 6px 0;\n  font-size: 12px;\n  line-height: 1.5;\n  color: #5b7188;\n}\nbutton {\n  cursor: pointer;\n  font: inherit;\n}\nbutton:disabled {\n  opacity: .5;\n  cursor: default;\n}\nbutton:focus-visible {\n  outline: 3px solid #c77c08;\n  outline-offset: 3px;\n}\n.categories {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  padding: 8px 12px 12px;\n}\n.categories button {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 6px 8px;\n  min-height: 32px;\n  border: 1px solid #d0dae9;\n  border-radius: 16px;\n  background: #fff;\n  color: #405a73;\n  font-size: 11px;\n}\n.categories button[aria-pressed=true] {\n  border-color: #425d89;\n  background: #233e61;\n  color: #fff;\n}\n[data-group=motion] {\n  --group: #316ed5;\n  --edge: #1d50a6;\n}\n[data-group=turning] {\n  --group: #7052cc;\n  --edge: #513799;\n}\n[data-group=cargo] {\n  --group: #19824f;\n  --edge: #0f623a;\n}\n[data-group=control] {\n  --group: #a45c13;\n  --edge: #7f440a;\n}\ni {\n  width: 7px;\n  height: 7px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  background: var(--group);\n}\n.destination {\n  margin: 0 12px 8px;\n  padding: 9px;\n  background: #eaf0f7;\n  border-radius: 7px;\n  color: #65758a;\n  font-size: 9px;\n  letter-spacing: .7px;\n}\n.destination strong {\n  display: block;\n  color: #29495f;\n  font-size: 12px;\n  letter-spacing: 0;\n  margin-top: 2px;\n}\n.destination.inside-loop {\n  background: #fff0d9;\n}\n.destination button {\n  margin-top: 5px;\n  padding: 5px 0;\n  border: 0;\n  color: #7c4308;\n  background: transparent;\n  font-size: 11px;\n  text-decoration: underline;\n  min-height: 30px;\n}\n.palette-list {\n  padding: 0 12px 14px;\n  max-height: min(56vh, 600px);\n  overflow-y: auto;\n  scrollbar-width: thin;\n}\nh4 {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: #4a6079;\n  margin: 12px 0 9px;\n  font-size: 12px;\n}\nh4 span {\n  margin-left: auto;\n  font-size: 10px;\n  font-weight: 400;\n  color: #74869a;\n}\n.palette-block {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 10px 9px 12px;\n  margin: 0 0 13px;\n  border: 1px solid var(--edge);\n  border-radius: 7px;\n  color: white;\n  background: var(--group);\n  box-shadow: inset 0 2px 1px #ffffff30, 0 3px 0 var(--edge);\n  text-align: left;\n  transition: transform 120ms, filter 120ms;\n}\n.palette-block::after {\n  content: "";\n  position: absolute;\n  bottom: -6px;\n  left: 22px;\n  width: 26px;\n  height: 7px;\n  border-radius: 0 0 4px 4px;\n  background: var(--group);\n  border: 1px solid var(--edge);\n  border-top: 0;\n}\n.palette-block:hover:not(:disabled) {\n  transform: translateY(-2px);\n  filter: brightness(1.09);\n}\n.palette-block:active:not(:disabled) {\n  transform: translateY(1px);\n}\n.block-title {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\napp-command-graphic {\n  width: 30px;\n  height: 30px;\n  flex: 0 0 30px;\n}\nstrong {\n  font-size: 13px;\n  line-height: 1.25;\n}\n.block-title b {\n  margin-left: auto;\n  font-size: 19px;\n  font-weight: 400;\n}\n.block-description {\n  display: block;\n  margin-top: 6px;\n  font-size: 11px;\n  line-height: 1.45;\n  color: #ffffffeb;\n}\n.math-preview {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 5px;\n  margin-top: 7px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.math-preview b {\n  min-width: 25px;\n  padding: 4px;\n  border-radius: 12px;\n  background: #fffdf3;\n  color: #344d72;\n  text-align: center;\n}\n@media (prefers-reduced-motion: reduce) {\n  .palette-block {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=command-palette.component.css.map */\n'] }]
  }], null, { allowed: [{ type: Input, args: [{ isSignal: true, alias: "allowed", required: true }] }], readOnly: [{ type: Input, args: [{ isSignal: true, alias: "readOnly", required: false }] }], moveMath: [{ type: Input, args: [{ isSignal: true, alias: "moveMath", required: false }] }], destination: [{ type: Input, args: [{ isSignal: true, alias: "destination", required: false }] }], inLoop: [{ type: Input, args: [{ isSignal: true, alias: "inLoop", required: false }] }], addBlock: [{ type: Output, args: ["addBlock"] }], programEnd: [{ type: Output, args: ["programEnd"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CommandPaletteComponent, { className: "CommandPaletteComponent", filePath: "src/app/templates/programming-automation/ui/command-palette.component.ts", lineNumber: 13 });
})();

// src/app/templates/programming-automation/ui/command-editor.component.ts
var _c03 = ["paletteHost"];
var _c12 = (a0) => ({ $implicit: a0 });
var _c2 = () => [];
var _c3 = (a0) => ({ $implicit: a0, nested: true });
var _forTrack03 = ($index, $item) => $item.id;
var _forTrack12 = ($index, $item) => $item.type;
function CommandEditorComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.snapshot() ? "Recorded program \xB7 replay only" : "This program is locked.", " ");
  }
}
function CommandEditorComponent_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "input", 19);
    \u0275\u0275listener("change", function CommandEditorComponent_Conditional_1_For_4_Template_input_change_1_listener($event) {
      const \u0275$index_11_r4 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateVariable(\u0275$index_11_r4, "name", $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "=");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 20);
    \u0275\u0275listener("change", function CommandEditorComponent_Conditional_1_For_4_Template_input_change_4_listener($event) {
      const \u0275$index_11_r4 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateVariable(\u0275$index_11_r4, "value", $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 21);
    \u0275\u0275listener("change", function CommandEditorComponent_Conditional_1_For_4_Template_input_change_5_listener($event) {
      const \u0275$index_11_r4 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateVariable(\u0275$index_11_r4, "unit", $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 22);
    \u0275\u0275listener("click", function CommandEditorComponent_Conditional_1_For_4_Template_button_click_6_listener() {
      const \u0275$index_11_r4 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeVariable(\u0275$index_11_r4));
    });
    \u0275\u0275text(7, " \xD7 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const variable_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("value", variable_r5.name)("disabled", ctx_r1.readOnly());
    \u0275\u0275advance(3);
    \u0275\u0275property("value", variable_r5.value)("disabled", ctx_r1.readOnly());
    \u0275\u0275advance();
    \u0275\u0275property("value", variable_r5.unit)("disabled", ctx_r1.readOnly());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.readOnly());
  }
}
function CommandEditorComponent_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function CommandEditorComponent_Conditional_1_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.addVariable());
    });
    \u0275\u0275text(1, "+ Variable");
    \u0275\u0275elementEnd();
  }
}
function CommandEditorComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 3)(1, "summary");
    \u0275\u0275text(2, "Variables \xB7 named values");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, CommandEditorComponent_Conditional_1_For_4_Template, 8, 7, "div", 18, _forTrack03);
    \u0275\u0275conditionalCreate(5, CommandEditorComponent_Conditional_1_Conditional_5_Template, 2, 0, "button");
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Use a name in a command, such as DISTANCE / 2.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.program().variables);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.readOnly() ? 5 : -1);
  }
}
function CommandEditorComponent_Conditional_2_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const issue_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("error", issue_r7.severity === "error");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(issue_r7.message);
  }
}
function CommandEditorComponent_Conditional_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CommandEditorComponent_Conditional_2_For_1_Conditional_0_Template, 2, 3, "p", 24);
  }
  if (rf & 2) {
    const issue_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!issue_r7.commandId && issue_r7.code !== "PROGRAM_EMPTY" && (ctx_r1.assessmentLinks() && ctx_r1.runtime.reasoningOpened() || issue_r7.code !== "MATH_EVIDENCE") ? 0 : -1);
  }
}
function CommandEditorComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CommandEditorComponent_Conditional_2_For_1_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.runtime.compiled().issues);
  }
}
function CommandEditorComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function CommandEditorComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function CommandEditorComponent_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.focusPalette());
    });
    \u0275\u0275text(1, "+ Add block");
    \u0275\u0275elementEnd();
  }
}
function CommandEditorComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "details", 14)(1, "summary");
    \u0275\u0275text(2, "Program options");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 16);
    \u0275\u0275listener("click", function CommandEditorComponent_Conditional_18_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addVariable());
    });
    \u0275\u0275text(4, "+ Named variable");
    \u0275\u0275elementEnd()();
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 49);
    \u0275\u0275listener("change", function CommandEditorComponent_ng_template_24_For_2_Conditional_8_Template_select_change_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const command_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.edit(command_r11.id, { direction: $event.target.value }));
    });
    \u0275\u0275elementStart(1, "option", 50);
    \u0275\u0275text(2, "right \u21BB");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "option", 51);
    \u0275\u0275text(4, "left \u21BA");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const command_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", command_r11.direction ?? "right")("disabled", ctx_r1.readOnly());
    \u0275\u0275advance();
    \u0275\u0275property("selected", command_r11.direction !== "left");
    \u0275\u0275advance(2);
    \u0275\u0275property("selected", command_r11.direction === "left");
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pkg_r14 = ctx.$implicit;
    const command_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("value", pkg_r14.id)("selected", pkg_r14.id === command_r11.packageId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pkg_r14.label, " ");
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 52);
    \u0275\u0275listener("change", function CommandEditorComponent_ng_template_24_For_2_Conditional_9_Template_select_change_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const command_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.edit(command_r11.id, { packageId: $event.target.value }));
    });
    \u0275\u0275repeaterCreate(1, CommandEditorComponent_ng_template_24_For_2_Conditional_9_For_2_Template, 2, 3, "option", 53, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const command_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", command_r11.packageId ?? "")("disabled", ctx_r1.readOnly());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.runtime.course().packages);
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 37)(1, "span", 54)(2, "small");
    \u0275\u0275text(3, "Given");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 55);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "label", 56)(9, "small");
    \u0275\u0275text(10, "Your number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 57);
    \u0275\u0275listener("focus", function CommandEditorComponent_ng_template_24_For_2_Conditional_10_Template_input_focus_11_listener() {
      \u0275\u0275restoreView(_r15);
      const command_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.selectCommand(command_r11.id));
    })("input", function CommandEditorComponent_ng_template_24_For_2_Conditional_10_Template_input_input_11_listener($event) {
      \u0275\u0275restoreView(_r15);
      const command_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.edit(command_r11.id, { value: $event.target.value, mathEvidenceId: void 0 }));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "span", 58);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const problem_r16 = ctx;
    const command_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275attribute("aria-label", "Given number: " + problem_r16.given);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(problem_r16.given);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r1.mathOperation(problem_r16.operation).label);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.mathOperation(problem_r16.operation).symbol);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", ctx_r1.valueWidth(command_r11.value), "ch");
    \u0275\u0275property("value", command_r11.value)("disabled", ctx_r1.readOnly());
    \u0275\u0275attribute("aria-label", ctx_r1.label(command_r11.type) + " your number");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(command_r11.type === "move-distance" ? "cm" : "rotations");
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_11_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r19 = ctx.$implicit;
    const command_r11 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275property("value", choice_r19.type)("selected", choice_r19.type === command_r11.type);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", choice_r19.label, " ");
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 61);
    \u0275\u0275listener("change", function CommandEditorComponent_ng_template_24_For_2_Conditional_11_Conditional_2_Template_select_change_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      const command_r11 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.changeUnit(command_r11, $event.target.value));
    });
    \u0275\u0275repeaterCreate(1, CommandEditorComponent_ng_template_24_For_2_Conditional_11_Conditional_2_For_2_Template, 2, 3, "option", 53, _forTrack12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const command_r11 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", command_r11.type)("disabled", ctx_r1.readOnly());
    \u0275\u0275attribute("aria-label", command_r11.type.startsWith("move") ? "Move units" : "Turn units");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.unitOptions(command_r11.type));
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_11_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const command_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(command_r11.type === "repeat" ? "times" : "seconds");
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 38)(1, "input", 59);
    \u0275\u0275listener("focus", function CommandEditorComponent_ng_template_24_For_2_Conditional_11_Template_input_focus_1_listener() {
      \u0275\u0275restoreView(_r17);
      const command_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.selectCommand(command_r11.id));
    })("input", function CommandEditorComponent_ng_template_24_For_2_Conditional_11_Template_input_input_1_listener($event) {
      \u0275\u0275restoreView(_r17);
      const command_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.edit(command_r11.id, { value: $event.target.value }));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, CommandEditorComponent_ng_template_24_For_2_Conditional_11_Conditional_2_Template, 3, 3, "select", 60)(3, CommandEditorComponent_ng_template_24_For_2_Conditional_11_Conditional_3_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const command_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r1.valueWidth(command_r11.value), "ch");
    \u0275\u0275property("value", command_r11.value)("disabled", ctx_r1.readOnly());
    \u0275\u0275attribute("aria-label", ctx_r1.label(command_r11.type) + " value");
    \u0275\u0275advance();
    \u0275\u0275conditional(command_r11.type.startsWith("move") || command_r11.type.startsWith("turn") ? 2 : 3);
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, "Change the white slot");
    \u0275\u0275elementEnd();
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u25B6 Replay step");
    \u0275\u0275elementEnd();
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Skipped");
    \u0275\u0275elementEnd();
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275conditionalCreate(1, CommandEditorComponent_ng_template_24_For_2_Conditional_12_Conditional_1_Template, 2, 0, "span", 62);
    \u0275\u0275conditionalCreate(2, CommandEditorComponent_ng_template_24_For_2_Conditional_12_Conditional_2_Template, 2, 0, "span");
    \u0275\u0275conditionalCreate(3, CommandEditorComponent_ng_template_24_For_2_Conditional_12_Conditional_3_Template, 2, 0, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const command_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.runtime.reasoningOpened() && command_r11.id === ctx_r1.runtime.challenge().discovery?.focusCommandId ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeId() === command_r11.id ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(command_r11.disabled ? 3 : -1);
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 63);
    \u0275\u0275listener("click", function CommandEditorComponent_ng_template_24_For_2_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const command_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.runtime.selectCommand(command_r11.id);
      return \u0275\u0275resetView(ctx_r1.reasoning.emit());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const command_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.mathLabel(command_r11), " ");
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 45);
    \u0275\u0275text(1, "Speed ");
    \u0275\u0275elementStart(2, "input", 64);
    \u0275\u0275listener("input", function CommandEditorComponent_ng_template_24_For_2_Conditional_21_Template_input_input_2_listener($event) {
      \u0275\u0275restoreView(_r21);
      const command_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.edit(command_r11.id, { rate: $event.target.value }));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const command_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", command_r11.type.startsWith("turn") ? "45" : "20")("value", command_r11.rate ?? "")("disabled", ctx_r1.readOnly());
    \u0275\u0275attribute("aria-label", ctx_r1.label(command_r11.type) + " speed");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(command_r11.type.startsWith("turn") ? "\xB0/second" : "cm/second");
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "button", 65);
    \u0275\u0275listener("click", function CommandEditorComponent_ng_template_24_For_2_Conditional_25_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r22);
      const command_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.move(command_r11.id, -1));
    });
    \u0275\u0275text(2, " \u2191 Up ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 66);
    \u0275\u0275listener("click", function CommandEditorComponent_ng_template_24_For_2_Conditional_25_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r22);
      const command_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.move(command_r11.id, 1));
    });
    \u0275\u0275text(4, " \u2193 Down ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 67);
    \u0275\u0275listener("click", function CommandEditorComponent_ng_template_24_For_2_Conditional_25_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r22);
      const command_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.duplicate(command_r11.id));
    });
    \u0275\u0275text(6, " \u29C9 Copy ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 68);
    \u0275\u0275listener("click", function CommandEditorComponent_ng_template_24_For_2_Conditional_25_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r22);
      const command_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.remove(command_r11.id));
    });
    \u0275\u0275text(8, "\xD7 Remove");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const \u0275$index_89_r23 = \u0275\u0275nextContext().$index;
    const commands_r24 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("aria-label", "Step " + (\u0275$index_89_r23 + 1) + " actions");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", \u0275$index_89_r23 === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", \u0275$index_89_r23 === commands_r24.length - 1);
  }
}
function CommandEditorComponent_ng_template_24_For_2_For_27_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const issue_r25 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("error", issue_r25.severity === "error");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(issue_r25.message);
  }
}
function CommandEditorComponent_ng_template_24_For_2_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CommandEditorComponent_ng_template_24_For_2_For_27_Conditional_0_Template, 2, 3, "p", 24);
  }
  if (rf & 2) {
    const issue_r25 = ctx.$implicit;
    const command_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!ctx_r1.snapshot() && issue_r25.commandId === command_r11.id && issue_r25.code !== "MATH_EVIDENCE" ? 0 : -1);
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_28_Conditional_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_28_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 73);
    \u0275\u0275listener("click", function CommandEditorComponent_ng_template_24_For_2_Conditional_28_Conditional_2_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r27);
      const command_r11 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.focusPalette(command_r11.id));
    });
    \u0275\u0275text(1, " + Add inside loop ");
    \u0275\u0275elementEnd();
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_28_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275template(1, CommandEditorComponent_ng_template_24_For_2_Conditional_28_Conditional_2_ng_container_1_Template, 1, 0, "ng-container", 12);
    \u0275\u0275conditionalCreate(2, CommandEditorComponent_ng_template_24_For_2_Conditional_28_Conditional_2_Conditional_2_Template, 2, 0, "button", 72);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const command_r11 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    const list_r28 = \u0275\u0275reference(25);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", list_r28)("ngTemplateOutletContext", \u0275\u0275pureFunction1(4, _c3, command_r11.commands ?? \u0275\u0275pureFunction0(3, _c2)));
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.readOnly() ? 2 : -1);
  }
}
function CommandEditorComponent_ng_template_24_For_2_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 69);
    \u0275\u0275listener("click", function CommandEditorComponent_ng_template_24_For_2_Conditional_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r26);
      const command_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggle(command_r11.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, CommandEditorComponent_ng_template_24_For_2_Conditional_28_Conditional_2_Template, 3, 6, "div", 70);
    \u0275\u0275elementStart(3, "div", 71);
    \u0275\u0275text(4, "\u21BB");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const command_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-expanded", !ctx_r1.collapsed().has(command_r11.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.collapsed().has(command_r11.id) ? "\u25B8 Show blocks inside" : "\u25BE Blocks inside", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.collapsed().has(command_r11.id) ? 2 : -1);
  }
}
function CommandEditorComponent_ng_template_24_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 30);
    \u0275\u0275listener("dragover", function CommandEditorComponent_ng_template_24_For_2_Template_li_dragover_0_listener($event) {
      return $event.preventDefault();
    })("drop", function CommandEditorComponent_ng_template_24_For_2_Template_li_drop_0_listener($event) {
      const command_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.drop(command_r11.id, $event));
    });
    \u0275\u0275elementStart(1, "span", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 32)(4, "button", 33);
    \u0275\u0275listener("dragstart", function CommandEditorComponent_ng_template_24_For_2_Template_button_dragstart_4_listener($event) {
      const command_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startDrag(command_r11.id, $event));
    })("click", function CommandEditorComponent_ng_template_24_For_2_Template_button_click_4_listener() {
      const command_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.selectCommand(command_r11.id));
    });
    \u0275\u0275element(5, "app-command-graphic", 34);
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, CommandEditorComponent_ng_template_24_For_2_Conditional_8_Template, 5, 4, "select", 35);
    \u0275\u0275conditionalCreate(9, CommandEditorComponent_ng_template_24_For_2_Conditional_9_Template, 3, 2, "select", 36)(10, CommandEditorComponent_ng_template_24_For_2_Conditional_10_Template, 14, 10, "span", 37)(11, CommandEditorComponent_ng_template_24_For_2_Conditional_11_Template, 4, 6, "span", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, CommandEditorComponent_ng_template_24_For_2_Conditional_12_Template, 4, 3, "div", 39);
    \u0275\u0275conditionalCreate(13, CommandEditorComponent_ng_template_24_For_2_Conditional_13_Template, 2, 1, "button", 40);
    \u0275\u0275elementStart(14, "details", 41)(15, "summary", 42)(16, "span", 43);
    \u0275\u0275text(17, "\u2022\u2022\u2022");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 44)(19, "p");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, CommandEditorComponent_ng_template_24_For_2_Conditional_21_Template, 5, 5, "label", 45);
    \u0275\u0275elementStart(22, "label", 46)(23, "input", 47);
    \u0275\u0275listener("change", function CommandEditorComponent_ng_template_24_For_2_Template_input_change_23_listener($event) {
      const command_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.edit(command_r11.id, { disabled: !$event.target.checked }));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(25, CommandEditorComponent_ng_template_24_For_2_Conditional_25_Template, 9, 3, "div", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(26, CommandEditorComponent_ng_template_24_For_2_For_27_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275conditionalCreate(28, CommandEditorComponent_ng_template_24_For_2_Conditional_28_Template, 5, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_32_0;
    const command_r11 = ctx.$implicit;
    const \u0275$index_89_r23 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("insertion-target", ctx_r1.insertionParent()?.id === command_r11.id)("selected", ctx_r1.runtime.selectedCommandId() === command_r11.id)("active", ctx_r1.activeId() === command_r11.id)("disabled", command_r11.disabled)("guess-command", !ctx_r1.runtime.reasoningOpened() && command_r11.id === ctx_r1.runtime.challenge().discovery?.focusCommandId);
    \u0275\u0275attribute("data-command-type", command_r11.type)("data-command-id", command_r11.id);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Step " + (\u0275$index_89_r23 + 1));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275$index_89_r23 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("draggable", !ctx_r1.readOnly())("title", ctx_r1.readOnly() ? ctx_r1.label(command_r11.type) : "Select or drag to reorder this block");
    \u0275\u0275attribute("aria-label", "Select " + ctx_r1.label(command_r11.type) + " block")("aria-pressed", ctx_r1.runtime.selectedCommandId() === command_r11.id);
    \u0275\u0275advance();
    \u0275\u0275property("type", command_r11.type)("direction", command_r11.direction ?? "right");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.verb(command_r11.type));
    \u0275\u0275advance();
    \u0275\u0275conditional(command_r11.type.startsWith("turn") ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(command_r11.type === "pick-up" || command_r11.type === "drop-off" ? 9 : (tmp_32_0 = command_r11.moveMath) ? 10 : 11, tmp_32_0);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!ctx_r1.runtime.reasoningOpened() && command_r11.id === ctx_r1.runtime.challenge().discovery?.focusCommandId || ctx_r1.activeId() === command_r11.id || command_r11.disabled ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.assessmentLinks() && ctx_r1.runtime.reasoningOpened() && command_r11.type !== "repeat" && command_r11.type !== "pick-up" && command_r11.type !== "drop-off" ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", "Options for step " + (\u0275$index_89_r23 + 1) + ": " + ctx_r1.label(command_r11.type));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.description(command_r11.type));
    \u0275\u0275advance();
    \u0275\u0275conditional(command_r11.type.startsWith("move") || command_r11.type.startsWith("turn") ? 21 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", !command_r11.disabled)("disabled", ctx_r1.readOnly());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(command_r11.disabled ? "Skipped" : "Enabled");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.readOnly() ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.runtime.compiled().issues);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(command_r11.type === "repeat" ? 28 : -1);
  }
}
function CommandEditorComponent_ng_template_24_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 29);
    \u0275\u0275text(1, "Add a block to start your route.");
    \u0275\u0275elementEnd();
  }
}
function CommandEditorComponent_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ol", 27);
    \u0275\u0275repeaterCreate(1, CommandEditorComponent_ng_template_24_For_2_Template, 29, 33, "li", 28, _forTrack03, false, CommandEditorComponent_ng_template_24_ForEmpty_3_Template, 2, 0, "li", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const commands_r24 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(commands_r24);
  }
}
var CommandEditorComponent = class _CommandEditorComponent {
  element = inject(ElementRef);
  injector = inject(Injector);
  palette = viewChild(
    "paletteHost",
    ...ngDevMode ? [{ debugName: "palette" }] : (
      /* istanbul ignore next */
      []
    )
  );
  insertion = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "insertion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  addedMessage = signal(
    "",
    ...ngDevMode ? [{ debugName: "addedMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  paletteOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "paletteOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reasoning = output();
  paletteTrigger;
  insertionParent = computed(
    () => {
      const insertion = this.insertion();
      if (!insertion || insertion.challengeId !== this.runtime.challenge().id)
        return void 0;
      const command = this.commandPath(this.program().commands, insertion.parentId).at(-1);
      return command?.type === "repeat" ? command : void 0;
    },
    ...ngDevMode ? [{ debugName: "insertionParent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  insertionLabel = computed(
    () => {
      const parent = this.insertionParent();
      return parent ? `Inside Repeat (${parent.value || "?"} times)` : "Program end";
    },
    ...ngDevMode ? [{ debugName: "insertionLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  shownIssues = computed(
    () => compileProgram(this.program(), this.runtime.config.robot, this.runtime.challenge(), this.runtime.state().math).issues,
    ...ngDevMode ? [{ debugName: "shownIssues" }] : (
      /* istanbul ignore next */
      []
    )
  );
  runtime = inject(AutomationRuntimeService);
  snapshot = input(
    ...ngDevMode ? [void 0, { debugName: "snapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  assessmentLinks = input(
    true,
    ...ngDevMode ? [{ debugName: "assessmentLinks" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeId = input(
    "",
    ...ngDevMode ? [{ debugName: "activeId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  labels = commandLabels;
  verbs = {
    "move-distance": "Move",
    "move-rotations": "Move",
    "turn-degrees": "Turn",
    "turn-fraction": "Turn",
    wait: "Wait",
    "pick-up": "Pick up",
    "drop-off": "Drop off",
    repeat: "Repeat"
  };
  motionUnits = [
    { type: "move-distance", label: "cm" },
    { type: "move-rotations", label: "rotations" }
  ];
  turnUnits = [
    { type: "turn-degrees", label: "degrees" },
    { type: "turn-fraction", label: "turns" }
  ];
  descriptions = commandDescriptions;
  collapsed = signal(
    /* @__PURE__ */ new Set(),
    ...ngDevMode ? [{ debugName: "collapsed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dragged = "";
  program = computed(
    () => this.snapshot() ?? this.runtime.draft().program,
    ...ngDevMode ? [{ debugName: "program" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readOnly = computed(
    () => !!this.snapshot() || !this.runtime.canEdit(),
    ...ngDevMode ? [{ debugName: "readOnly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      this.runtime.challenge().id;
      this.snapshot();
      this.insertion.set(void 0);
      this.paletteOpen.set(false);
      this.addedMessage.set("");
    });
  }
  label(type) {
    return commandLabels[type];
  }
  verb(type) {
    return this.verbs[type];
  }
  description(type) {
    return this.descriptions[type];
  }
  valueWidth(value) {
    return Math.min(18, Math.max(5, value.length + 2));
  }
  mathOperation(operation) {
    return moveMathOperations[operation];
  }
  unitOptions(type) {
    return (type.startsWith("move") ? this.motionUnits : this.turnUnits).filter((choice) => choice.type === type || this.runtime.challenge().allowedCommands.includes(choice.type));
  }
  changeUnit(command, type) {
    if (type !== command.type && this.unitOptions(command.type).some((choice) => choice.type === type))
      this.edit(command.id, { type, mathEvidenceId: void 0 });
  }
  startDrag(id, event) {
    event.stopPropagation();
    if (this.readOnly()) {
      event.preventDefault();
      return;
    }
    this.dragged = id;
  }
  edit(id, patch) {
    if (!this.readOnly())
      this.runtime.editCommand(id, patch);
  }
  commandPath(commands, id) {
    for (const command of commands) {
      if (command.id === id)
        return [command];
      const path = this.commandPath(command.commands ?? [], id);
      if (path.length)
        return [command, ...path];
    }
    return [];
  }
  focusPalette(parentId) {
    if (this.readOnly())
      return;
    this.paletteTrigger = this.element.nativeElement.ownerDocument.activeElement;
    this.paletteOpen.set(true);
    this.insertion.set(parentId ? { challengeId: this.runtime.challenge().id, parentId } : void 0);
    afterNextRender(() => {
      const palette = this.palette()?.nativeElement;
      palette?.scrollIntoView({ block: "nearest", behavior: "instant" });
      palette?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  closePalette() {
    this.paletteOpen.set(false);
    afterNextRender(() => this.paletteTrigger?.focus(), { injector: this.injector });
  }
  addBlock(type) {
    if (this.readOnly() || !this.runtime.challenge().allowedCommands.includes(type))
      return;
    const parent = this.insertionParent();
    this.runtime.addCommand(type, parent?.id);
    const id = this.runtime.selectedCommandId();
    const path = this.commandPath(this.program().commands, id);
    if (!path.length)
      return;
    this.paletteOpen.set(false);
    this.collapsed.update((collapsed) => {
      const next = new Set(collapsed);
      path.forEach((command) => next.delete(command.id));
      return next;
    });
    this.addedMessage.set(`${this.labels[type]} added ${parent ? "inside Repeat" : "to your program"}.`);
    afterNextRender(() => {
      const block = Array.from(this.element.nativeElement.querySelectorAll("[data-command-id]")).find((element) => element.dataset["commandId"] === id);
      block?.scrollIntoView({ block: "nearest", behavior: "instant" });
      const control = block?.querySelector(".block-input, .package") ?? block?.querySelector(".choose");
      control?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  remove(id) {
    this.runtime.setCommands(transformCommands(this.program().commands, id, () => []));
  }
  duplicate(id) {
    const copy = (cmd) => __spreadProps(__spreadValues({}, cmd), {
      id: crypto.randomUUID(),
      commands: cmd.commands?.map(copy)
    });
    this.runtime.setCommands(transformCommands(this.program().commands, id, (c) => [c, copy(c)]));
  }
  move(id, direction) {
    const walk = (commands) => {
      const index = commands.findIndex((c) => c.id === id);
      if (index >= 0) {
        const result = [...commands];
        const next = index + direction;
        if (next >= 0 && next < result.length)
          [result[index], result[next]] = [result[next], result[index]];
        return result;
      }
      return commands.map((c) => c.commands ? __spreadProps(__spreadValues({}, c), { commands: walk(c.commands) }) : c);
    };
    this.runtime.setCommands(walk(this.program().commands));
  }
  drop(target, event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.readOnly())
      return;
    const walk = (commands) => {
      const from = commands.findIndex((c) => c.id === this.dragged), to = commands.findIndex((c) => c.id === target);
      if (from >= 0 && to >= 0) {
        const result = [...commands];
        result.splice(to, 0, result.splice(from, 1)[0]);
        return result;
      }
      return commands.map((c) => c.commands ? __spreadProps(__spreadValues({}, c), { commands: walk(c.commands) }) : c);
    };
    this.runtime.setCommands(walk(this.program().commands));
    this.dragged = "";
  }
  toggle(id) {
    this.collapsed.update((s) => {
      const next = new Set(s);
      if (next.has(id))
        next.delete(id);
      else
        next.add(id);
      return next;
    });
  }
  mathLabel(command) {
    const evidence = this.runtime.state().math.find((item) => item.id === command.mathEvidenceId);
    return evidence ? evidenceIsCorrect(evidence) && !this.shownIssues().some((issue) => issue.commandId === command.id && issue.code === "MATH_EVIDENCE") ? "\u2713 Math linked" : "\u25B3 Check math" : "\u2197 Link a calculation";
  }
  addVariable() {
    this.runtime.updateVariables([
      ...this.program().variables,
      { id: crypto.randomUUID(), name: "", value: "", unit: "cm" }
    ]);
  }
  updateVariable(index, key, value) {
    this.runtime.updateVariables(this.program().variables.map((v, i) => i === index ? __spreadProps(__spreadValues({}, v), { [key]: value }) : v));
  }
  removeVariable(index) {
    this.runtime.updateVariables(this.program().variables.filter((_, i) => i !== index));
  }
  static \u0275fac = function CommandEditorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CommandEditorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CommandEditorComponent, selectors: [["app-command-editor"]], viewQuery: function CommandEditorComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.palette, _c03, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { snapshot: [1, "snapshot"], assessmentLinks: [1, "assessmentLinks"], activeId: [1, "activeId"] }, outputs: { reasoning: "reasoning" }, decls: 26, vars: 19, consts: [["paletteHost", ""], ["list", ""], [1, "notice"], ["open", "", 1, "variables"], ["role", "status", "aria-live", "polite", 1, "addition-status"], [1, "editor-layout"], [1, "program-column", 3, "hidden"], [1, "script-canvas"], [1, "start-block"], ["viewBox", "0 0 24 24", "aria-hidden", "true", "focusable", "false"], ["d", "M8 4v16l12-8z"], [1, "start-slot"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "button", 1, "add"], [1, "program-options"], ["tabindex", "-1", "aria-label", "Choose a code block", 1, "palette-host", 3, "keydown.escape", "hidden"], [1, "secondary", 3, "click"], [3, "addBlock", "programEnd", "allowed", "moveMath", "readOnly", "destination", "inLoop"], [1, "variable"], ["aria-label", "Variable name", "placeholder", "DISTANCE", 3, "change", "value", "disabled"], ["aria-label", "Variable value", "placeholder", "100", 3, "change", "value", "disabled"], ["aria-label", "Variable unit", "placeholder", "cm", 3, "change", "value", "disabled"], ["aria-label", "Remove variable", 3, "click", "disabled"], [3, "click"], [1, "issue", 3, "error"], [1, "issue"], ["type", "button", 1, "add", 3, "click"], [1, "commands"], [1, "command", 3, "insertion-target", "selected", "active", "disabled", "guess-command"], [1, "empty"], [1, "command", 3, "dragover", "drop"], [1, "step-number"], [1, "block-line"], [1, "choose", 3, "dragstart", "click", "draggable", "title"], [3, "type", "direction"], ["aria-label", "Direction", 1, "block-select", "direction", 3, "value", "disabled"], ["aria-label", "Package", 1, "block-select", "package", 3, "value", "disabled"], ["role", "group", "aria-label", "Move math problem", 1, "move-equation"], [1, "value-slot"], [1, "block-status"], [1, "math-link"], [1, "block-options"], ["title", "Block options"], ["aria-hidden", "true"], [1, "options-content"], [1, "speed-field"], [1, "check"], ["type", "checkbox", 3, "change", "checked", "disabled"], ["role", "group", 1, "tools"], ["aria-label", "Direction", 1, "block-select", "direction", 3, "change", "value", "disabled"], ["value", "right", 3, "selected"], ["value", "left", 3, "selected"], ["aria-label", "Package", 1, "block-select", "package", 3, "change", "value", "disabled"], [3, "value", "selected"], [1, "given-number"], [1, "math-operation"], [1, "student-number"], ["inputmode", "decimal", "autocomplete", "off", "placeholder", "?", 1, "block-input", 3, "focus", "input", "value", "disabled"], [1, "math-unit"], ["placeholder", "?", 1, "block-input", 3, "focus", "input", "value", "disabled"], [1, "block-select", "units", 3, "value", "disabled"], [1, "block-select", "units", 3, "change", "value", "disabled"], [1, "guess-label"], [1, "math-link", 3, "click"], [3, "input", "placeholder", "value", "disabled"], ["aria-label", "Move command up", 3, "click", "disabled"], ["aria-label", "Move command down", 3, "click", "disabled"], ["aria-label", "Duplicate command", 3, "click"], ["aria-label", "Remove command", 3, "click"], [1, "collapse", 3, "click"], [1, "loop-body"], ["aria-hidden", "true", 1, "loop-end"], ["type", "button", "aria-label", "Add command inside loop", 1, "add", "loop-add"], ["type", "button", "aria-label", "Add command inside loop", 1, "add", "loop-add", 3, "click"]], template: function CommandEditorComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275conditionalCreate(0, CommandEditorComponent_Conditional_0_Template, 2, 1, "p", 2);
      \u0275\u0275conditionalCreate(1, CommandEditorComponent_Conditional_1_Template, 8, 1, "details", 3);
      \u0275\u0275conditionalCreate(2, CommandEditorComponent_Conditional_2_Template, 2, 0);
      \u0275\u0275elementStart(3, "p", 4);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 5)(6, "div", 6)(7, "div", 7)(8, "div", 8);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(9, "svg", 9);
      \u0275\u0275element(10, "path", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(11, "span");
      \u0275\u0275text(12, "When ");
      \u0275\u0275elementStart(13, "strong", 11);
      \u0275\u0275text(14, "Run program");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15, " clicked");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(16, CommandEditorComponent_ng_container_16_Template, 1, 0, "ng-container", 12);
      \u0275\u0275conditionalCreate(17, CommandEditorComponent_Conditional_17_Template, 2, 0, "button", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(18, CommandEditorComponent_Conditional_18_Template, 5, 0, "details", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 15, 0);
      \u0275\u0275listener("keydown.escape", function CommandEditorComponent_Template_div_keydown_escape_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        ctx.closePalette();
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(21, "button", 16);
      \u0275\u0275listener("click", function CommandEditorComponent_Template_button_click_21_listener() {
        return ctx.closePalette();
      });
      \u0275\u0275text(22, "\u2190 Back to program");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "app-command-palette", 17);
      \u0275\u0275listener("addBlock", function CommandEditorComponent_Template_app_command_palette_addBlock_23_listener($event) {
        return ctx.addBlock($event);
      })("programEnd", function CommandEditorComponent_Template_app_command_palette_programEnd_23_listener() {
        return ctx.insertion.set(void 0);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(24, CommandEditorComponent_ng_template_24_Template, 4, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const list_r28 = \u0275\u0275reference(25);
      \u0275\u0275conditional(ctx.readOnly() ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.challenge().requiresVariable || ctx.program().variables.length ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.snapshot() ? 2 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.addedMessage());
      \u0275\u0275advance();
      \u0275\u0275classProp("choosing-block", ctx.paletteOpen());
      \u0275\u0275advance();
      \u0275\u0275property("hidden", ctx.paletteOpen());
      \u0275\u0275advance(10);
      \u0275\u0275property("ngTemplateOutlet", list_r28)("ngTemplateOutletContext", \u0275\u0275pureFunction1(17, _c12, ctx.program().commands));
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.readOnly() ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.readOnly() && !ctx.runtime.challenge().requiresVariable ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("hidden", !ctx.paletteOpen());
      \u0275\u0275advance(4);
      \u0275\u0275property("allowed", ctx.runtime.challenge().allowedCommands)("moveMath", ctx.runtime.challenge().moveMath)("readOnly", ctx.readOnly())("destination", ctx.insertionLabel())("inLoop", !!ctx.insertionParent());
    }
  }, dependencies: [NgTemplateOutlet, CommandGraphicComponent, CommandPaletteComponent], styles: ['\n[_nghost-%COMP%] {\n  --%NS%canvas: #e9eef5;\n  display: block;\n  container-type: inline-size;\n  color: #253d51;\n  font-family:\n    "Nunito",\n    "Trebuchet MS",\n    system-ui,\n    sans-serif;\n  font-size: 14px;\n  line-height: 1.5;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 21px;\n  margin: 3px 0;\n}\nsmall[_ngcontent-%COMP%] {\n  font-size: 11px;\n  letter-spacing: 1.6px;\n  color: #52717c;\n  font-weight: 800;\n}\n.section-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n.tag[_ngcontent-%COMP%] {\n  font-size: 12px;\n  background: #e9f1f2;\n  padding: 5px 10px;\n  border-radius: 20px;\n}\n.addition-status[_ngcontent-%COMP%] {\n  min-height: 18px;\n  margin: 6px 0;\n  color: #296253;\n  font-size: 12px;\n}\n.editor-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 14px;\n  align-items: start;\n}\n.program-column[_ngcontent-%COMP%] {\n  min-width: 0;\n  overflow: visible;\n  padding: 4px;\n  scrollbar-width: thin;\n}\n.palette-host[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 12px;\n  min-width: 0;\n  border-radius: 14px;\n}\n.palette-host[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #bd790b;\n  outline-offset: 3px;\n}\n.command.insertion-target[_ngcontent-%COMP%]    > .collapse[_ngcontent-%COMP%] {\n  color: #fff0a0;\n}\n.command.insertion-target[_ngcontent-%COMP%]    > .loop-body[_ngcontent-%COMP%] {\n  box-shadow: inset 4px 0 #e8a126;\n}\n.move-equation[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  gap: 8px;\n  max-width: 100%;\n}\n.given-number[_ngcontent-%COMP%], \n.student-number[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 3px;\n  justify-items: center;\n}\n.move-equation[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: inherit;\n  font-size: 9px;\n  letter-spacing: 0.3px;\n  white-space: nowrap;\n}\n.given-number[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  min-height: 38px;\n  min-width: 42px;\n  padding: 3px 9px;\n  background: #ffffff26;\n  border: 1px solid #ffffff60;\n  border-radius: 8px;\n  font-size: 18px;\n}\n.math-operation[_ngcontent-%COMP%] {\n  align-self: center;\n  padding-top: 14px;\n  font-size: 24px;\n  font-weight: 800;\n}\n.math-unit[_ngcontent-%COMP%] {\n  align-self: flex-end;\n  padding-bottom: 9px;\n  font-weight: 700;\n  font-size: 13px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-weight: 700;\n  padding: 8px 0;\n}\n[data-command-type][_ngcontent-%COMP%] {\n  --%NS%block-color: #326dce;\n  --%NS%block-edge: #2455a5;\n}\n[data-command-type^=turn][_ngcontent-%COMP%] {\n  --%NS%block-color: #6351c9;\n  --%NS%block-edge: #49369f;\n}\n[data-command-type=wait][_ngcontent-%COMP%] {\n  --%NS%block-color: #996212;\n  --%NS%block-edge: #77470b;\n}\n[data-command-type=pick-up][_ngcontent-%COMP%], \n[data-command-type=drop-off][_ngcontent-%COMP%] {\n  --%NS%block-color: #188049;\n  --%NS%block-edge: #106135;\n}\n[data-command-type=repeat][_ngcontent-%COMP%] {\n  --%NS%block-color: #a65b13;\n  --%NS%block-edge: #82450c;\n}\n.script-canvas[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 24px 12px 24px 32px;\n  border: 1px solid #d2dce7;\n  border-radius: 12px;\n  background-color: var(--%NS%canvas);\n  background-image: radial-gradient(#b7c7d8 0.8px, transparent 0.8px);\n  background-size: 16px 16px;\n}\n.commands[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0 0 18px;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.command[_ngcontent-%COMP%], \n.start-block[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 0;\n  padding: 14px 10px 12px;\n  border: 1px solid var(--%NS%block-edge);\n  border-radius: 7px;\n  color: #fff;\n  background: var(--%NS%block-color);\n  box-shadow: inset 1px 2px 2px #ffffff38, inset -1px -2px 2px #00000029;\n}\n.command[_ngcontent-%COMP%] {\n  container-type: inline-size;\n}\n.command[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: -1px;\n  left: 27px;\n  width: 30px;\n  height: 8px;\n  border-radius: 0 0 5px 5px;\n  background: #00000024;\n  box-shadow: inset 0 2px 3px #00000030;\n}\n.command[_ngcontent-%COMP%]::after, \n.start-block[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -7px;\n  left: 27px;\n  width: 30px;\n  height: 8px;\n  background: var(--%NS%block-color);\n  border: 1px solid var(--%NS%block-edge);\n  border-top: 0;\n  border-radius: 0 0 5px 5px;\n  box-shadow: inset 0 -2px 2px #00000020;\n  z-index: 2;\n  pointer-events: none;\n}\n.start-block[_ngcontent-%COMP%] {\n  --%NS%block-color: #ffc43d;\n  --%NS%block-edge: #d49919;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-height: 68px;\n  border-radius: 24px 24px 7px 7px;\n  padding: 20px 12px 14px;\n  color: #513606;\n  font-weight: 800;\n  font-size: 14px;\n}\n.start-block[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex: 0 0 22px;\n  width: 22px;\n  height: 22px;\n  fill: currentColor;\n}\n.start-slot[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 8px;\n  border-radius: 14px;\n  background: #ffffff61;\n  border: 1px solid #a6752540;\n}\n.step-number[_ngcontent-%COMP%] {\n  position: absolute;\n  left: -25px;\n  top: 24px;\n  width: 18px;\n  color: #526779;\n  font-size: 11px;\n  font-weight: 800;\n  text-align: center;\n}\n.block-line[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px;\n  padding-right: 28px;\n  min-height: 40px;\n  font-size: 16px;\n  font-weight: 750;\n}\n.choose[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 0;\n  min-height: 40px;\n  max-width: 100%;\n  border: 0;\n  border-radius: 5px;\n  background: transparent;\n  color: inherit;\n  text-align: left;\n  font-size: inherit;\n}\n.choose[draggable=true][_ngcontent-%COMP%] {\n  cursor: grab;\n}\n.choose[draggable=true][_ngcontent-%COMP%]:active {\n  cursor: grabbing;\n}\n.choose[_ngcontent-%COMP%]   app-command-graphic[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n}\n.choose[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow-wrap: anywhere;\n}\n.value-slot[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px;\n  max-width: 100%;\n}\ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  max-width: 100%;\n  min-width: 0;\n  border: 1px solid #a9bec9;\n  border-radius: 8px;\n  padding: 8px;\n  font: inherit;\n  font-size: 16px;\n  color: #203a51;\n  background: #fff;\n  min-height: 40px;\n}\n.block-input[_ngcontent-%COMP%] {\n  text-align: center;\n  border-radius: 20px;\n  font-weight: 800;\n  border-color: #00000030;\n  box-shadow: inset 0 2px 3px #142e4924;\n  padding: 7px 8px;\n}\n.block-input[_ngcontent-%COMP%]::placeholder {\n  color: #63788b;\n  opacity: 1;\n}\n.block-select[_ngcontent-%COMP%] {\n  width: auto;\n  color: #fff;\n  border-color: #00000026;\n  background-color: #ffffff12;\n  border-radius: 18px;\n  font-size: 14px;\n  font-weight: 750;\n  padding: 8px 5px 8px 8px;\n  box-shadow: inset 0 2px 3px #00000014;\n}\n.block-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  color: #203a51;\n  background: #fff;\n}\n.block-select[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #ffffff28;\n}\n.block-select[_ngcontent-%COMP%]:focus {\n  color: #203a51;\n  background-color: #fff;\n}\n.block-select[_ngcontent-%COMP%]:disabled, \n.block-input[_ngcontent-%COMP%]:disabled {\n  opacity: 1;\n  cursor: default;\n}\n.block-select[_ngcontent-%COMP%]:disabled {\n  appearance: none;\n  padding-right: 10px;\n}\n.command.selected[_ngcontent-%COMP%] {\n  outline: 3px solid #f6c84d;\n  outline-offset: 1px;\n  z-index: 3;\n}\n.command.active[_ngcontent-%COMP%] {\n  outline: 3px solid #ffdf5e;\n  outline-offset: 1px;\n  z-index: 3;\n}\n.command.disabled[_ngcontent-%COMP%] {\n  --%NS%block-color: #617389;\n  --%NS%block-edge: #48586c;\n  border-style: dashed;\n}\n.command.guess-command[_ngcontent-%COMP%]   .block-input[_ngcontent-%COMP%] {\n  background: #fff8d9;\n  outline: 2px solid #ffcf4c;\n  outline-offset: 1px;\n}\n.block-status[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 6px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.guess-label[_ngcontent-%COMP%] {\n  color: #fff3bc;\n}\n.math-link[_ngcontent-%COMP%] {\n  display: block;\n  padding: 5px 2px;\n  border: 0;\n  background: none;\n  color: #fff;\n  font-size: 12px;\n  text-align: left;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n  min-height: 30px;\n}\n.block-options[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  list-style: none;\n  position: absolute;\n  top: 17px;\n  right: 6px;\n  display: grid;\n  place-items: center;\n  min-height: 36px;\n  width: 30px;\n  border-radius: 6px;\n  padding: 0;\n  color: #fff;\n  font-size: 12px;\n  letter-spacing: 1px;\n}\n.block-options[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]::-webkit-details-marker {\n  display: none;\n}\n.block-options[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]:hover, \n.block-options[open][_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  background: #0000001f;\n}\n.options-content[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  padding-top: 10px;\n  border-top: 1px solid #ffffff45;\n  font-size: 13px;\n}\n.options-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n}\n.speed-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 7px;\n}\n.speed-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 7ch;\n  border-radius: 18px;\n  text-align: center;\n}\n.check[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  min-height: 40px;\n}\n.check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  min-height: 0;\n  margin: 0;\n  accent-color: #254571;\n}\n.tools[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1 0 auto;\n  min-height: 36px;\n  padding: 5px 7px;\n  font-size: 12px;\n  border: 1px solid #ffffff65;\n  border-radius: 6px;\n  background: #ffffff14;\n  color: #fff;\n}\n.tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #ffffff30;\n}\n.collapse[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 2px;\n  min-height: 30px;\n  border: 0;\n  background: none;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  padding: 3px;\n  text-align: left;\n}\n.loop-body[_ngcontent-%COMP%] {\n  background: var(--%NS%canvas);\n  margin: 4px -11px 0 6px;\n  padding: 12px 0 12px 22px;\n  border: 1px solid var(--%NS%block-edge);\n  border-right: 0;\n  border-radius: 6px 0 0 6px;\n  box-shadow: inset 2px 2px 3px #2638491a;\n}\n.loop-body[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.loop-body[_ngcontent-%COMP%]   .commands[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.loop-end[_ngcontent-%COMP%] {\n  height: 17px;\n  text-align: right;\n  font-size: 21px;\n  line-height: 22px;\n}\n.add[_ngcontent-%COMP%] {\n  display: block;\n  color: #3d5a75;\n  font-size: 13px;\n  font-weight: 750;\n  border: 1px dashed #93abc1;\n  border-radius: 8px;\n  padding: 10px;\n  background: #f5f8fc;\n  width: 100%;\n  min-height: 48px;\n  text-align: left;\n}\n.add[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 4px;\n  font-size: 11px;\n  font-weight: 400;\n}\n.add[_ngcontent-%COMP%]:hover {\n  background: #e5effd;\n  border-color: #628ebd;\n}\n.add[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 7px;\n  width: 100%;\n  font-size: 13px;\n}\n.loop-add[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  padding: 8px;\n  width: calc(100% - 8px);\n}\n.empty[_ngcontent-%COMP%] {\n  padding: 16px 10px;\n  color: #526779;\n  font-size: 13px;\n}\n.issue[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #805714;\n  margin: 8px 0;\n}\n.issue.error[_ngcontent-%COMP%] {\n  color: #9c3535;\n}\n.command[_ngcontent-%COMP%]    > .issue[_ngcontent-%COMP%] {\n  padding: 8px;\n  border-radius: 6px;\n  background: #fff4d5;\n}\n.command[_ngcontent-%COMP%]    > .issue.error[_ngcontent-%COMP%] {\n  background: #fff0ef;\n}\n.variables[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  padding: 12px;\n  background: #eeeafb;\n  border-radius: 8px;\n}\n.variable[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  align-items: center;\n  margin-top: 5px;\n}\n.variable[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 30%;\n}\n.variable[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:nth-last-child(2) {\n  width: 18%;\n}\n.variables[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #5b6884;\n}\n.notice[_ngcontent-%COMP%] {\n  font-size: 13px;\n  background: #fff1d4;\n  padding: 10px;\n  border-radius: 8px;\n}\n.secondary[_ngcontent-%COMP%], \n.variables[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  min-height: 36px;\n  border: 1px solid #bdcfd4;\n  border-radius: 6px;\n  padding: 7px;\n  background: #fff;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  cursor: pointer;\n  color: #234758;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n[_ngcontent-%COMP%]:is(button, input, select, summary):focus-visible {\n  outline: 3px solid #bd790b;\n  outline-offset: 3px;\n}\n.command[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:is(button, input, select, summary):focus-visible {\n  outline-color: #ffdf5e;\n}\n@container (max-width: 300px) {\n  .block-line[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .block-select[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .choose[_ngcontent-%COMP%]   app-command-graphic[_ngcontent-%COMP%] {\n    width: 24px;\n    height: 24px;\n  }\n}\n@container (max-width: 559px) {\n  .editor-layout[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n}\n@container (max-width: 220px) {\n  .block-line[_ngcontent-%COMP%] {\n    padding-right: 24px;\n  }\n  .value-slot[_ngcontent-%COMP%] {\n    flex-basis: 100%;\n  }\n  .loop-body[_ngcontent-%COMP%] {\n    margin-left: 0;\n    padding-left: 18px;\n  }\n  .step-number[_ngcontent-%COMP%] {\n    left: -19px;\n    width: 14px;\n  }\n}\n[hidden][_ngcontent-%COMP%] {\n  display: none !important;\n}\n.addition-status[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.palette-host[_ngcontent-%COMP%] {\n  position: static;\n}\n.palette-host[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n}\n.program-options[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.program-options[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%], \n.secondary[_ngcontent-%COMP%] {\n  min-height: 44px;\n}\n/*# sourceMappingURL=command-editor.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CommandEditorComponent, [{
    type: Component,
    args: [{ selector: "app-command-editor", imports: [NgTemplateOutlet, CommandGraphicComponent, CommandPaletteComponent], template: `@if (readOnly()) {\r
  <p class="notice">\r
    {{ snapshot() ? 'Recorded program \xB7 replay only' : 'This program is locked.' }}\r
  </p>\r
}\r
@if (runtime.challenge().requiresVariable || program().variables.length) {\r
  <details class="variables" open>\r
    <summary>Variables \xB7 named values</summary>\r
    @for (variable of program().variables; track variable.id; let i = $index) {\r
      <div class="variable">\r
        <input\r
          aria-label="Variable name"\r
          placeholder="DISTANCE"\r
          [value]="variable.name"\r
          [disabled]="readOnly()"\r
          (change)="updateVariable(i, 'name', $any($event.target).value)"\r
        />\r
        <span>=</span>\r
        <input\r
          aria-label="Variable value"\r
          placeholder="100"\r
          [value]="variable.value"\r
          [disabled]="readOnly()"\r
          (change)="updateVariable(i, 'value', $any($event.target).value)"\r
        />\r
        <input\r
          aria-label="Variable unit"\r
          placeholder="cm"\r
          [value]="variable.unit"\r
          [disabled]="readOnly()"\r
          (change)="updateVariable(i, 'unit', $any($event.target).value)"\r
        />\r
        <button aria-label="Remove variable" [disabled]="readOnly()" (click)="removeVariable(i)">\r
          \xD7\r
        </button>\r
      </div>\r
    }\r
    @if (!readOnly()) {\r
      <button (click)="addVariable()">+ Variable</button>\r
    }\r
    <p>Use a name in a command, such as DISTANCE / 2.</p>\r
  </details>\r
}\r
@if (!snapshot()) {\r
  @for (issue of runtime.compiled().issues; track $index) {\r
    @if (\r
      !issue.commandId &&\r
      issue.code !== 'PROGRAM_EMPTY' &&\r
      ((assessmentLinks() && runtime.reasoningOpened()) || issue.code !== 'MATH_EVIDENCE')
    ) {\r
      <p class="issue" [class.error]="issue.severity === 'error'">{{ issue.message }}</p>\r
    }\r
  }\r
}\r
<p class="addition-status" role="status" aria-live="polite">{{ addedMessage() }}</p>\r
<div class="editor-layout" [class.choosing-block]="paletteOpen()">\r
  <div class="program-column" [hidden]="paletteOpen()">\r
    <div class="script-canvas">\r
      <div class="start-block">\r
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">\r
          <path d="M8 4v16l12-8z" />\r
        </svg>\r
        <span>When <strong class="start-slot">Run program</strong> clicked</span>\r
      </div>\r
      <ng-container *ngTemplateOutlet="list; context: { $implicit: program().commands }" />\r
      @if (!readOnly()) {\r
        <button type="button" class="add" (click)="focusPalette()">+ Add block</button>\r
      }\r
    </div>\r
    @if (!readOnly() && !runtime.challenge().requiresVariable) {\r
      <details class="program-options">\r
        <summary>Program options</summary>\r
        <button class="secondary" (click)="addVariable()">+ Named variable</button>\r
      </details>\r
    }\r
  </div>\r
  <div\r
    #paletteHost\r
    class="palette-host"\r
    tabindex="-1"\r
    aria-label="Choose a code block"\r
    [hidden]="!paletteOpen()"\r
    (keydown.escape)="closePalette(); $event.stopPropagation()"\r
  >\r
    <button class="secondary" (click)="closePalette()">\u2190 Back to program</button>\r
    <app-command-palette\r
      [allowed]="runtime.challenge().allowedCommands"\r
      [moveMath]="runtime.challenge().moveMath"\r
      [readOnly]="readOnly()"\r
      [destination]="insertionLabel()"\r
      [inLoop]="!!insertionParent()"\r
      (addBlock)="addBlock($event)"\r
      (programEnd)="insertion.set(undefined)"\r
    />\r
  </div>\r
</div>\r
<ng-template #list let-commands>\r
  <ol class="commands">\r
    @for (command of commands; track command.id; let i = $index) {\r
      <li\r
        class="command"\r
        [attr.data-command-type]="command.type"\r
        [attr.data-command-id]="command.id"\r
        [class.insertion-target]="insertionParent()?.id === command.id"\r
        [class.selected]="runtime.selectedCommandId() === command.id"\r
        [class.active]="activeId() === command.id"\r
        [class.disabled]="command.disabled"\r
        [class.guess-command]="\r
          !runtime.reasoningOpened() && command.id === runtime.challenge().discovery?.focusCommandId\r
        "\r
        (dragover)="$event.preventDefault()"\r
        (drop)="drop(command.id, $event)"\r
      >\r
        <span class="step-number" [attr.aria-label]="'Step ' + (i + 1)">{{ i + 1 }}</span>\r
        <div class="block-line">\r
          <button\r
            class="choose"\r
            [draggable]="!readOnly()"\r
            (dragstart)="startDrag(command.id, $event)"\r
            (click)="runtime.selectCommand(command.id)"\r
            [attr.aria-label]="'Select ' + label(command.type) + ' block'"\r
            [attr.aria-pressed]="runtime.selectedCommandId() === command.id"\r
            [title]="readOnly() ? label(command.type) : 'Select or drag to reorder this block'"\r
          >\r
            <app-command-graphic [type]="command.type" [direction]="command.direction ?? 'right'" />\r
            <strong>{{ verb(command.type) }}</strong>\r
          </button>\r
          @if (command.type.startsWith('turn')) {\r
            <select\r
              class="block-select direction"\r
              aria-label="Direction"\r
              [value]="command.direction ?? 'right'"\r
              [disabled]="readOnly()"\r
              (change)="edit(command.id, { direction: $any($event.target).value })"\r
            >\r
              <option value="right" [selected]="command.direction !== 'left'">right \u21BB</option>\r
              <option value="left" [selected]="command.direction === 'left'">left \u21BA</option>\r
            </select>\r
          }\r
          @if (command.type === 'pick-up' || command.type === 'drop-off') {\r
            <select\r
              class="block-select package"\r
              aria-label="Package"\r
              [value]="command.packageId ?? ''"\r
              [disabled]="readOnly()"\r
              (change)="edit(command.id, { packageId: $any($event.target).value })"\r
            >\r
              @for (pkg of runtime.course().packages; track pkg.id) {\r
                <option [value]="pkg.id" [selected]="pkg.id === command.packageId">\r
                  {{ pkg.label }}\r
                </option>\r
              }\r
            </select>\r
          } @else if (command.moveMath; as problem) {\r
            <span class="move-equation" role="group" aria-label="Move math problem">\r
              <span class="given-number">\r
                <small>Given</small>\r
                <strong [attr.aria-label]="'Given number: ' + problem.given">{{\r
                  problem.given\r
                }}</strong>\r
              </span>\r
              <span\r
                class="math-operation"\r
                [attr.aria-label]="mathOperation(problem.operation).label"\r
                >{{ mathOperation(problem.operation).symbol }}</span\r
              >\r
              <label class="student-number">\r
                <small>Your number</small>\r
                <input\r
                  class="block-input"\r
                  inputmode="decimal"\r
                  autocomplete="off"\r
                  [attr.aria-label]="label(command.type) + ' your number'"\r
                  placeholder="?"\r
                  [style.width.ch]="valueWidth(command.value)"\r
                  [value]="command.value"\r
                  [disabled]="readOnly()"\r
                  (focus)="runtime.selectCommand(command.id)"\r
                  (input)="\r
                    edit(command.id, {\r
                      value: $any($event.target).value,\r
                      mathEvidenceId: undefined,\r
                    })\r
                  "\r
                />\r
              </label>\r
              <span class="math-unit">{{\r
                command.type === 'move-distance' ? 'cm' : 'rotations'\r
              }}</span>\r
            </span>\r
          } @else {\r
            <span class="value-slot">\r
              <input\r
                class="block-input"\r
                [attr.aria-label]="label(command.type) + ' value'"\r
                placeholder="?"\r
                [style.width.ch]="valueWidth(command.value)"\r
                [value]="command.value"\r
                [disabled]="readOnly()"\r
                (focus)="runtime.selectCommand(command.id)"\r
                (input)="edit(command.id, { value: $any($event.target).value })"\r
              />\r
              @if (command.type.startsWith('move') || command.type.startsWith('turn')) {\r
                <select\r
                  class="block-select units"\r
                  [attr.aria-label]="command.type.startsWith('move') ? 'Move units' : 'Turn units'"\r
                  [value]="command.type"\r
                  [disabled]="readOnly()"\r
                  (change)="changeUnit(command, $any($event.target).value)"\r
                >\r
                  @for (choice of unitOptions(command.type); track choice.type) {\r
                    <option [value]="choice.type" [selected]="choice.type === command.type">\r
                      {{ choice.label }}\r
                    </option>\r
                  }\r
                </select>\r
              } @else {\r
                <span>{{ command.type === 'repeat' ? 'times' : 'seconds' }}</span>\r
              }\r
            </span>\r
          }\r
        </div>\r
        @if (\r
          (!runtime.reasoningOpened() &&\r
            command.id === runtime.challenge().discovery?.focusCommandId) ||\r
          activeId() === command.id ||\r
          command.disabled\r
        ) {\r
          <div class="block-status">\r
            @if (\r
              !runtime.reasoningOpened() &&\r
              command.id === runtime.challenge().discovery?.focusCommandId\r
            ) {\r
              <span class="guess-label">Change the white slot</span>\r
            }\r
            @if (activeId() === command.id) {\r
              <span>\u25B6 Replay step</span>\r
            }\r
            @if (command.disabled) {\r
              <span>Skipped</span>\r
            }\r
          </div>\r
        }\r
        @if (\r
          assessmentLinks() && runtime.reasoningOpened() &&
          command.type !== 'repeat' &&\r
          command.type !== 'pick-up' &&\r
          command.type !== 'drop-off'\r
        ) {\r
          <button class="math-link" (click)="runtime.selectCommand(command.id); reasoning.emit()">\r
            {{ mathLabel(command) }}\r
          </button>\r
        }\r
        <details class="block-options">\r
          <summary\r
            [attr.aria-label]="'Options for step ' + (i + 1) + ': ' + label(command.type)"\r
            title="Block options"\r
          >\r
            <span aria-hidden="true">\u2022\u2022\u2022</span>\r
          </summary>\r
          <div class="options-content">\r
            <p>{{ description(command.type) }}</p>\r
            @if (command.type.startsWith('move') || command.type.startsWith('turn')) {\r
              <label class="speed-field"\r
                >Speed\r
                <input\r
                  [attr.aria-label]="label(command.type) + ' speed'"\r
                  [placeholder]="command.type.startsWith('turn') ? '45' : '20'"\r
                  [value]="command.rate ?? ''"\r
                  [disabled]="readOnly()"\r
                  (input)="edit(command.id, { rate: $any($event.target).value })"\r
                />\r
                <span>{{ command.type.startsWith('turn') ? '\xB0/second' : 'cm/second' }}</span>\r
              </label>\r
            }\r
            <label class="check"\r
              ><input\r
                type="checkbox"\r
                [checked]="!command.disabled"\r
                [disabled]="readOnly()"\r
                (change)="edit(command.id, { disabled: !$any($event.target).checked })"\r
              />{{ command.disabled ? 'Skipped' : 'Enabled' }}</label\r
            >\r
            @if (!readOnly()) {\r
              <div class="tools" role="group" [attr.aria-label]="'Step ' + (i + 1) + ' actions'">\r
                <button\r
                  [disabled]="i === 0"\r
                  aria-label="Move command up"\r
                  (click)="move(command.id, -1)"\r
                >\r
                  \u2191 Up\r
                </button>\r
                <button\r
                  [disabled]="i === commands.length - 1"\r
                  aria-label="Move command down"\r
                  (click)="move(command.id, 1)"\r
                >\r
                  \u2193 Down\r
                </button>\r
                <button aria-label="Duplicate command" (click)="duplicate(command.id)">\r
                  \u29C9 Copy\r
                </button>\r
                <button aria-label="Remove command" (click)="remove(command.id)">\xD7 Remove</button>\r
              </div>\r
            }\r
          </div>\r
        </details>\r
        @for (issue of runtime.compiled().issues; track $index) {\r
          @if (\r
            !snapshot() &&\r
            issue.commandId === command.id &&\r
            issue.code !== 'MATH_EVIDENCE'\r
          ) {\r
            <p class="issue" [class.error]="issue.severity === 'error'">{{ issue.message }}</p>\r
          }\r
        }\r
        @if (command.type === 'repeat') {\r
          <button\r
            class="collapse"\r
            [attr.aria-expanded]="!collapsed().has(command.id)"\r
            (click)="toggle(command.id)"\r
          >\r
            {{ collapsed().has(command.id) ? '\u25B8 Show blocks inside' : '\u25BE Blocks inside' }}\r
          </button>\r
          @if (!collapsed().has(command.id)) {\r
            <div class="loop-body">\r
              <ng-container\r
                *ngTemplateOutlet="\r
                  list;\r
                  context: { $implicit: command.commands ?? [], nested: true }\r
                "\r
              />\r
              @if (!readOnly()) {\r
                <button\r
                  type="button"\r
                  class="add loop-add"\r
                  aria-label="Add command inside loop"\r
                  (click)="focusPalette(command.id)"\r
                >\r
                  + Add inside loop\r
                </button>\r
              }\r
            </div>\r
          }\r
          <div class="loop-end" aria-hidden="true">\u21BB</div>\r
        }\r
      </li>\r
    } @empty {\r
      <li class="empty">Add a block to start your route.</li>\r
    }\r
  </ol>\r
</ng-template>\r
`, styles: ['/* src/app/templates/programming-automation/ui/command-editor.component.css */\n:host {\n  --canvas: #e9eef5;\n  display: block;\n  container-type: inline-size;\n  color: #253d51;\n  font-family:\n    "Nunito",\n    "Trebuchet MS",\n    system-ui,\n    sans-serif;\n  font-size: 14px;\n  line-height: 1.5;\n}\n* {\n  box-sizing: border-box;\n}\nh2 {\n  font-size: 21px;\n  margin: 3px 0;\n}\nsmall {\n  font-size: 11px;\n  letter-spacing: 1.6px;\n  color: #52717c;\n  font-weight: 800;\n}\n.section-top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n.tag {\n  font-size: 12px;\n  background: #e9f1f2;\n  padding: 5px 10px;\n  border-radius: 20px;\n}\n.addition-status {\n  min-height: 18px;\n  margin: 6px 0;\n  color: #296253;\n  font-size: 12px;\n}\n.editor-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 14px;\n  align-items: start;\n}\n.program-column {\n  min-width: 0;\n  overflow: visible;\n  padding: 4px;\n  scrollbar-width: thin;\n}\n.palette-host {\n  position: sticky;\n  top: 12px;\n  min-width: 0;\n  border-radius: 14px;\n}\n.palette-host:focus-visible {\n  outline: 3px solid #bd790b;\n  outline-offset: 3px;\n}\n.command.insertion-target > .collapse {\n  color: #fff0a0;\n}\n.command.insertion-target > .loop-body {\n  box-shadow: inset 4px 0 #e8a126;\n}\n.move-equation {\n  display: flex;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  gap: 8px;\n  max-width: 100%;\n}\n.given-number,\n.student-number {\n  display: grid;\n  gap: 3px;\n  justify-items: center;\n}\n.move-equation small {\n  color: inherit;\n  font-size: 9px;\n  letter-spacing: 0.3px;\n  white-space: nowrap;\n}\n.given-number strong {\n  display: grid;\n  place-items: center;\n  min-height: 38px;\n  min-width: 42px;\n  padding: 3px 9px;\n  background: #ffffff26;\n  border: 1px solid #ffffff60;\n  border-radius: 8px;\n  font-size: 18px;\n}\n.math-operation {\n  align-self: center;\n  padding-top: 14px;\n  font-size: 24px;\n  font-weight: 800;\n}\n.math-unit {\n  align-self: flex-end;\n  padding-bottom: 9px;\n  font-weight: 700;\n  font-size: 13px;\n}\nsummary {\n  cursor: pointer;\n  font-weight: 700;\n  padding: 8px 0;\n}\n[data-command-type] {\n  --block-color: #326dce;\n  --block-edge: #2455a5;\n}\n[data-command-type^=turn] {\n  --block-color: #6351c9;\n  --block-edge: #49369f;\n}\n[data-command-type=wait] {\n  --block-color: #996212;\n  --block-edge: #77470b;\n}\n[data-command-type=pick-up],\n[data-command-type=drop-off] {\n  --block-color: #188049;\n  --block-edge: #106135;\n}\n[data-command-type=repeat] {\n  --block-color: #a65b13;\n  --block-edge: #82450c;\n}\n.script-canvas {\n  min-width: 0;\n  padding: 24px 12px 24px 32px;\n  border: 1px solid #d2dce7;\n  border-radius: 12px;\n  background-color: var(--canvas);\n  background-image: radial-gradient(#b7c7d8 0.8px, transparent 0.8px);\n  background-size: 16px 16px;\n}\n.commands {\n  list-style: none;\n  margin: 0 0 18px;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.command,\n.start-block {\n  position: relative;\n  min-width: 0;\n  padding: 14px 10px 12px;\n  border: 1px solid var(--block-edge);\n  border-radius: 7px;\n  color: #fff;\n  background: var(--block-color);\n  box-shadow: inset 1px 2px 2px #ffffff38, inset -1px -2px 2px #00000029;\n}\n.command {\n  container-type: inline-size;\n}\n.command::before {\n  content: "";\n  position: absolute;\n  top: -1px;\n  left: 27px;\n  width: 30px;\n  height: 8px;\n  border-radius: 0 0 5px 5px;\n  background: #00000024;\n  box-shadow: inset 0 2px 3px #00000030;\n}\n.command::after,\n.start-block::after {\n  content: "";\n  position: absolute;\n  bottom: -7px;\n  left: 27px;\n  width: 30px;\n  height: 8px;\n  background: var(--block-color);\n  border: 1px solid var(--block-edge);\n  border-top: 0;\n  border-radius: 0 0 5px 5px;\n  box-shadow: inset 0 -2px 2px #00000020;\n  z-index: 2;\n  pointer-events: none;\n}\n.start-block {\n  --block-color: #ffc43d;\n  --block-edge: #d49919;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-height: 68px;\n  border-radius: 24px 24px 7px 7px;\n  padding: 20px 12px 14px;\n  color: #513606;\n  font-weight: 800;\n  font-size: 14px;\n}\n.start-block svg {\n  flex: 0 0 22px;\n  width: 22px;\n  height: 22px;\n  fill: currentColor;\n}\n.start-slot {\n  display: inline-block;\n  padding: 4px 8px;\n  border-radius: 14px;\n  background: #ffffff61;\n  border: 1px solid #a6752540;\n}\n.step-number {\n  position: absolute;\n  left: -25px;\n  top: 24px;\n  width: 18px;\n  color: #526779;\n  font-size: 11px;\n  font-weight: 800;\n  text-align: center;\n}\n.block-line {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px;\n  padding-right: 28px;\n  min-height: 40px;\n  font-size: 16px;\n  font-weight: 750;\n}\n.choose {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 0;\n  min-height: 40px;\n  max-width: 100%;\n  border: 0;\n  border-radius: 5px;\n  background: transparent;\n  color: inherit;\n  text-align: left;\n  font-size: inherit;\n}\n.choose[draggable=true] {\n  cursor: grab;\n}\n.choose[draggable=true]:active {\n  cursor: grabbing;\n}\n.choose app-command-graphic {\n  width: 28px;\n  height: 28px;\n}\n.choose strong {\n  overflow-wrap: anywhere;\n}\n.value-slot {\n  display: inline-flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px;\n  max-width: 100%;\n}\ninput,\nselect {\n  max-width: 100%;\n  min-width: 0;\n  border: 1px solid #a9bec9;\n  border-radius: 8px;\n  padding: 8px;\n  font: inherit;\n  font-size: 16px;\n  color: #203a51;\n  background: #fff;\n  min-height: 40px;\n}\n.block-input {\n  text-align: center;\n  border-radius: 20px;\n  font-weight: 800;\n  border-color: #00000030;\n  box-shadow: inset 0 2px 3px #142e4924;\n  padding: 7px 8px;\n}\n.block-input::placeholder {\n  color: #63788b;\n  opacity: 1;\n}\n.block-select {\n  width: auto;\n  color: #fff;\n  border-color: #00000026;\n  background-color: #ffffff12;\n  border-radius: 18px;\n  font-size: 14px;\n  font-weight: 750;\n  padding: 8px 5px 8px 8px;\n  box-shadow: inset 0 2px 3px #00000014;\n}\n.block-select option {\n  color: #203a51;\n  background: #fff;\n}\n.block-select:hover:not(:disabled) {\n  background-color: #ffffff28;\n}\n.block-select:focus {\n  color: #203a51;\n  background-color: #fff;\n}\n.block-select:disabled,\n.block-input:disabled {\n  opacity: 1;\n  cursor: default;\n}\n.block-select:disabled {\n  appearance: none;\n  padding-right: 10px;\n}\n.command.selected {\n  outline: 3px solid #f6c84d;\n  outline-offset: 1px;\n  z-index: 3;\n}\n.command.active {\n  outline: 3px solid #ffdf5e;\n  outline-offset: 1px;\n  z-index: 3;\n}\n.command.disabled {\n  --block-color: #617389;\n  --block-edge: #48586c;\n  border-style: dashed;\n}\n.command.guess-command .block-input {\n  background: #fff8d9;\n  outline: 2px solid #ffcf4c;\n  outline-offset: 1px;\n}\n.block-status {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 6px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.guess-label {\n  color: #fff3bc;\n}\n.math-link {\n  display: block;\n  padding: 5px 2px;\n  border: 0;\n  background: none;\n  color: #fff;\n  font-size: 12px;\n  text-align: left;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n  min-height: 30px;\n}\n.block-options > summary {\n  list-style: none;\n  position: absolute;\n  top: 17px;\n  right: 6px;\n  display: grid;\n  place-items: center;\n  min-height: 36px;\n  width: 30px;\n  border-radius: 6px;\n  padding: 0;\n  color: #fff;\n  font-size: 12px;\n  letter-spacing: 1px;\n}\n.block-options > summary::-webkit-details-marker {\n  display: none;\n}\n.block-options > summary:hover,\n.block-options[open] > summary {\n  background: #0000001f;\n}\n.options-content {\n  margin-top: 12px;\n  padding-top: 10px;\n  border-top: 1px solid #ffffff45;\n  font-size: 13px;\n}\n.options-content p {\n  margin: 0 0 10px;\n}\n.speed-field {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 7px;\n}\n.speed-field input {\n  width: 7ch;\n  border-radius: 18px;\n  text-align: center;\n}\n.check {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  min-height: 40px;\n}\n.check input {\n  width: 18px;\n  height: 18px;\n  min-height: 0;\n  margin: 0;\n  accent-color: #254571;\n}\n.tools {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.tools button {\n  flex: 1 0 auto;\n  min-height: 36px;\n  padding: 5px 7px;\n  font-size: 12px;\n  border: 1px solid #ffffff65;\n  border-radius: 6px;\n  background: #ffffff14;\n  color: #fff;\n}\n.tools button:hover:not(:disabled) {\n  background: #ffffff30;\n}\n.collapse {\n  display: block;\n  margin-top: 2px;\n  min-height: 30px;\n  border: 0;\n  background: none;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  padding: 3px;\n  text-align: left;\n}\n.loop-body {\n  background: var(--canvas);\n  margin: 4px -11px 0 6px;\n  padding: 12px 0 12px 22px;\n  border: 1px solid var(--block-edge);\n  border-right: 0;\n  border-radius: 6px 0 0 6px;\n  box-shadow: inset 2px 2px 3px #2638491a;\n}\n.loop-body .commands {\n  margin-bottom: 12px;\n}\n.loop-body .commands:last-child {\n  margin-bottom: 0;\n}\n.loop-end {\n  height: 17px;\n  text-align: right;\n  font-size: 21px;\n  line-height: 22px;\n}\n.add {\n  display: block;\n  color: #3d5a75;\n  font-size: 13px;\n  font-weight: 750;\n  border: 1px dashed #93abc1;\n  border-radius: 8px;\n  padding: 10px;\n  background: #f5f8fc;\n  width: 100%;\n  min-height: 48px;\n  text-align: left;\n}\n.add span {\n  display: block;\n  margin-top: 4px;\n  font-size: 11px;\n  font-weight: 400;\n}\n.add:hover {\n  background: #e5effd;\n  border-color: #628ebd;\n}\n.add select {\n  display: block;\n  margin-top: 7px;\n  width: 100%;\n  font-size: 13px;\n}\n.loop-add {\n  margin-right: 8px;\n  padding: 8px;\n  width: calc(100% - 8px);\n}\n.empty {\n  padding: 16px 10px;\n  color: #526779;\n  font-size: 13px;\n}\n.issue {\n  font-size: 13px;\n  color: #805714;\n  margin: 8px 0;\n}\n.issue.error {\n  color: #9c3535;\n}\n.command > .issue {\n  padding: 8px;\n  border-radius: 6px;\n  background: #fff4d5;\n}\n.command > .issue.error {\n  background: #fff0ef;\n}\n.variables {\n  margin: 12px 0;\n  padding: 12px;\n  background: #eeeafb;\n  border-radius: 8px;\n}\n.variable {\n  display: flex;\n  gap: 5px;\n  align-items: center;\n  margin-top: 5px;\n}\n.variable input {\n  width: 30%;\n}\n.variable input:nth-last-child(2) {\n  width: 18%;\n}\n.variables p {\n  font-size: 13px;\n  color: #5b6884;\n}\n.notice {\n  font-size: 13px;\n  background: #fff1d4;\n  padding: 10px;\n  border-radius: 8px;\n}\n.secondary,\n.variables button {\n  margin-top: 8px;\n  min-height: 36px;\n  border: 1px solid #bdcfd4;\n  border-radius: 6px;\n  padding: 7px;\n  background: #fff;\n}\nbutton {\n  font: inherit;\n  cursor: pointer;\n  color: #234758;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n:is(button, input, select, summary):focus-visible {\n  outline: 3px solid #bd790b;\n  outline-offset: 3px;\n}\n.command :is(button, input, select, summary):focus-visible {\n  outline-color: #ffdf5e;\n}\n@container (max-width: 300px) {\n  .block-line {\n    font-size: 14px;\n  }\n  .block-select {\n    font-size: 13px;\n  }\n  .choose app-command-graphic {\n    width: 24px;\n    height: 24px;\n  }\n}\n@container (max-width: 559px) {\n  .editor-layout {\n    gap: 8px;\n  }\n}\n@container (max-width: 220px) {\n  .block-line {\n    padding-right: 24px;\n  }\n  .value-slot {\n    flex-basis: 100%;\n  }\n  .loop-body {\n    margin-left: 0;\n    padding-left: 18px;\n  }\n  .step-number {\n    left: -19px;\n    width: 14px;\n  }\n}\n[hidden] {\n  display: none !important;\n}\n.addition-status:empty {\n  display: none;\n}\n.palette-host {\n  position: static;\n}\n.palette-host > button {\n  margin: 0 0 12px;\n}\n.program-options {\n  font-size: 13px;\n}\n.program-options summary,\n.secondary {\n  min-height: 44px;\n}\n/*# sourceMappingURL=command-editor.component.css.map */\n'] }]
  }], () => [], { palette: [{ type: ViewChild, args: ["paletteHost", { isSignal: true }] }], reasoning: [{ type: Output, args: ["reasoning"] }], snapshot: [{ type: Input, args: [{ isSignal: true, alias: "snapshot", required: false }] }], assessmentLinks: [{ type: Input, args: [{ isSignal: true, alias: "assessmentLinks", required: false }] }], activeId: [{ type: Input, args: [{ isSignal: true, alias: "activeId", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CommandEditorComponent, { className: "CommandEditorComponent", filePath: "src/app/templates/programming-automation/ui/command-editor.component.ts", lineNumber: 36 });
})();

// src/app/templates/programming-automation/ui/automation-week-workspace.component.ts
var _c04 = () => [];
var _forTrack04 = ($index, $item) => $item.id;
var _forTrack13 = ($index, $item) => $item.challengeId;
function AutomationWeekWorkspaceComponent_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const challenge_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", challenge_r1.id)("selected", challenge_r1.id === ctx_r1.runtime.challenge().id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", challenge_r1.title, " ");
  }
}
function AutomationWeekWorkspaceComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const target_r3 = ctx.$implicit;
    const $index_r4 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", $index_r4)("selected", $index_r4 === ctx_r1.runtime.draft().targetIndex);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", target_r3.label, " ");
  }
}
function AutomationWeekWorkspaceComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Extra challenge open. The planning panel still describes Week ", ctx_r1.week().week, ". ");
  }
}
function AutomationWeekWorkspaceComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 34)(2, "button", 35);
    \u0275\u0275listener("click", function AutomationWeekWorkspaceComponent_Conditional_30_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.replay.playing() ? ctx_r1.replay.pause() : ctx_r1.replay.play());
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 36);
    \u0275\u0275listener("click", function AutomationWeekWorkspaceComponent_Conditional_30_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.replay.step());
    });
    \u0275\u0275text(5, "Step");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 35);
    \u0275\u0275listener("click", function AutomationWeekWorkspaceComponent_Conditional_30_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.edit());
    });
    \u0275\u0275text(7, "Back to live code");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "label", 37);
    \u0275\u0275text(9, "Replay timeline ");
    \u0275\u0275elementStart(10, "input", 38);
    \u0275\u0275listener("input", function AutomationWeekWorkspaceComponent_Conditional_30_Template_input_input_10_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.replay.seek(+$event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 39);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 40)(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const trial_r6 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.replay.playing() ? "Pause" : "Play replay", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.replay.playing());
    \u0275\u0275advance(6);
    \u0275\u0275property("max", ctx_r1.replay.duration())("value", ctx_r1.replay.timeMs());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.finished() ? trial_r6.completedMission ? "Course goal reached" : trial_r6.stoppedReason : "Replaying this trial", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(16, 9, trial_r6.distanceCm, "1.0-1"), " cm");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(19, 12, trial_r6.elapsedSeconds, "1.0-1"), " s");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", trial_r6.collisions, " collisions");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", trial_r6.deliveriesCompleted, " deliveries");
  }
}
function AutomationWeekWorkspaceComponent_For_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function AutomationWeekWorkspaceComponent_For_35_Template_button_click_0_listener() {
      const trial_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.watch(trial_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trial_r8 = ctx.$implicit;
    const \u0275$index_99_r9 = ctx.$index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" Replay ", \u0275$index_99_r9 + 1, " \xB7 ", \u0275\u0275pipeBind2(2, 3, trial_r8.distanceCm, "1.0-0"), " cm \xB7 ", trial_r8.collisions, " collisions ");
  }
}
function AutomationWeekWorkspaceComponent_ForEmpty_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Run the program to create a local test replay.");
    \u0275\u0275elementEnd();
  }
}
function AutomationWeekWorkspaceComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function AutomationWeekWorkspaceComponent_Conditional_46_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.edit());
    });
    \u0275\u0275text(1, "Edit program");
    \u0275\u0275elementEnd();
  }
}
function AutomationWeekWorkspaceComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function AutomationWeekWorkspaceComponent_Conditional_47_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.run());
    });
    \u0275\u0275text(1, " \u25B6 Run program ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r1.runtime.draft().program.commands.length);
  }
}
function AutomationWeekWorkspaceComponent_For_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const session_r12 = ctx.$implicit;
    const \u0275$index_158_r13 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("current", ctx_r1.sessionIndex() === \u0275$index_158_r13);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Session ", \u0275$index_158_r13 + 1, " \xB7 ", \u0275$index_158_r13 === 0 ? "Individual learning" : "Group activity");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(session_r12.product);
  }
}
function AutomationWeekWorkspaceComponent_For_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const question_r14 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(question_r14);
  }
}
function AutomationWeekWorkspaceComponent_For_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r15 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r15);
  }
}
function AutomationWeekWorkspaceComponent_For_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r16);
  }
}
function AutomationWeekWorkspaceComponent_Conditional_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "Extra challenge focus");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.challenge().discovery?.reasoningPrompt ?? ctx_r1.runtime.challenge().hint);
  }
}
var AutomationWeekWorkspaceComponent = class _AutomationWeekWorkspaceComponent {
  runtime = inject(AutomationRuntimeService);
  replay = inject(RobotReplayService);
  lesson = inject(PROJECT_LESSON_FOCUS, { optional: true });
  selectedLesson = signal(
    1,
    ...ngDevMode ? [{ debugName: "selectedLesson" }] : (
      /* istanbul ignore next */
      []
    )
  );
  weeks = this.runtime.config.previewWeeks;
  week = computed(
    () => this.weeks[Math.floor((this.selectedLesson() - 1) / 2)],
    ...ngDevMode ? [{ debugName: "week" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sessionIndex = computed(
    () => (this.selectedLesson() - 1) % 2,
    ...ngDevMode ? [{ debugName: "sessionIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  trace = signal(
    true,
    ...ngDevMode ? [{ debugName: "trace" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finished = computed(
    () => !!this.replay.trial() && this.replay.timeMs() >= this.replay.duration(),
    ...ngDevMode ? [{ debugName: "finished" }] : (
      /* istanbul ignore next */
      []
    )
  );
  course = computed(
    () => this.replay.trial()?.version.course ?? this.runtime.course(),
    ...ngDevMode ? [{ debugName: "course" }] : (
      /* istanbul ignore next */
      []
    )
  );
  target = computed(
    () => this.replay.trial()?.version.targetIndex ?? this.runtime.draft().targetIndex,
    ...ngDevMode ? [{ debugName: "target" }] : (
      /* istanbul ignore next */
      []
    )
  );
  extraChallenge = computed(
    () => !this.week().sessions.some((session) => session.challengeId === this.runtime.challenge().id),
    ...ngDevMode ? [{ debugName: "extraChallenge" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const number = this.lesson?.()?.number ?? 1;
      untracked(() => this.openLesson(number));
    });
  }
  openLesson(number) {
    if (!Number.isInteger(number) || number < 1 || number > 8)
      return;
    this.selectedLesson.set(number);
    this.choose(this.week().sessions[this.sessionIndex()].challengeId);
  }
  choose(id) {
    this.edit();
    this.runtime.selectChallenge(id);
    const starter = this.weeks.flatMap((week) => week.sessions).find((session) => session.challengeId === id);
    if (starter?.starterCommands && !this.runtime.draft().program.commands.length && this.runtime.draft().program.version === 0 && !this.runtime.currentTrials().length) {
      this.runtime.setCommands(structuredClone(starter.starterCommands));
      if (starter.starterVariables)
        this.runtime.updateVariables(structuredClone(starter.starterVariables));
    }
  }
  run() {
    const trial = this.runtime.runPractice();
    if (trial)
      this.watch(trial);
  }
  watch(trial) {
    const reduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.replay.load(trial, !reduced);
  }
  edit() {
    this.replay.pause();
    this.replay.trial.set(void 0);
    this.replay.timeMs.set(0);
  }
  setTarget(value) {
    this.edit();
    this.runtime.setTarget(Number(value));
  }
  static \u0275fac = function AutomationWeekWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AutomationWeekWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AutomationWeekWorkspaceComponent, selectors: [["app-automation-week-workspace"]], features: [\u0275\u0275ProvidersFeature([RobotReplayService])], decls: 94, vars: 31, consts: [[1, "week-workspace"], ["aria-label", "Interactive robot workspace", 1, "interactive"], [1, "mission-header"], [1, "eyebrow"], [1, "preview-badge"], [1, "challenge-bar"], ["aria-label", "Robot challenge", 3, "change", "value"], [3, "value", "selected"], ["aria-label", "Parking target", 3, "change", "value"], [1, "trace"], ["type", "checkbox", 3, "change", "checked"], [1, "extra-note"], [1, "activity-grid"], ["aria-label", "Live course and replay", 1, "course-stage"], [3, "course", "robotRadiusCm", "targetIndex", "sample", "samples", "events", "result", "showTrace"], [1, "replay-panel"], [1, "trial-history"], ["aria-label", "Robot program", 1, "code-panel"], [1, "mission"], [1, "run-actions"], [1, "primary"], [1, "primary", 3, "disabled"], ["role", "status", 1, "save-status"], [1, "code-scroll"], [3, "snapshot", "activeId", "assessmentLinks"], [1, "sample-note"], ["aria-label", "Weekly work and AI tutor planning", 1, "planning"], ["open", "", 1, "plan-card", "weekly-card"], [1, "muted"], [1, "products"], [3, "current"], [1, "footnote"], ["open", "", 1, "plan-card", "tutor-card"], [1, "offline"], [1, "replay-actions"], [3, "click"], [3, "click", "disabled"], [1, "timeline"], ["aria-label", "Replay timeline", "type", "range", "min", "0", "step", "50", 3, "input", "max", "value"], ["role", "status"], [1, "metrics"], [1, "primary", 3, "click"], [1, "primary", 3, "click", "disabled"]], template: function AutomationWeekWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "section", 1)(2, "header", 2)(3, "div")(4, "p", 3);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "h1");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p");
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "span", 4);
      \u0275\u0275text(11, "Testing \xB7 all access");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 5)(13, "label");
      \u0275\u0275text(14, "Challenge ");
      \u0275\u0275elementStart(15, "select", 6);
      \u0275\u0275listener("change", function AutomationWeekWorkspaceComponent_Template_select_change_15_listener($event) {
        return ctx.choose($event.target.value);
      });
      \u0275\u0275repeaterCreate(16, AutomationWeekWorkspaceComponent_For_17_Template, 2, 3, "option", 7, _forTrack04);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "label");
      \u0275\u0275text(19, "Target ");
      \u0275\u0275elementStart(20, "select", 8);
      \u0275\u0275listener("change", function AutomationWeekWorkspaceComponent_Template_select_change_20_listener($event) {
        return ctx.setTarget($event.target.value);
      });
      \u0275\u0275repeaterCreate(21, AutomationWeekWorkspaceComponent_For_22_Template, 2, 3, "option", 7, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "label", 9)(24, "input", 10);
      \u0275\u0275listener("change", function AutomationWeekWorkspaceComponent_Template_input_change_24_listener($event) {
        return ctx.trace.set($event.target.checked);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275text(25, "Path");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(26, AutomationWeekWorkspaceComponent_Conditional_26_Template, 2, 1, "p", 11);
      \u0275\u0275elementStart(27, "div", 12)(28, "section", 13);
      \u0275\u0275element(29, "app-robot-course", 14);
      \u0275\u0275conditionalCreate(30, AutomationWeekWorkspaceComponent_Conditional_30_Template, 24, 15, "div", 15);
      \u0275\u0275elementStart(31, "details", 16)(32, "summary");
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(34, AutomationWeekWorkspaceComponent_For_35_Template, 3, 6, "button", null, _forTrack04, false, AutomationWeekWorkspaceComponent_ForEmpty_36_Template, 2, 0, "p");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "section", 17)(38, "header")(39, "h2");
      \u0275\u0275text(40);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "span");
      \u0275\u0275text(42);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "p", 18);
      \u0275\u0275text(44);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 19);
      \u0275\u0275conditionalCreate(46, AutomationWeekWorkspaceComponent_Conditional_46_Template, 2, 0, "button", 20)(47, AutomationWeekWorkspaceComponent_Conditional_47_Template, 2, 1, "button", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "p", 22);
      \u0275\u0275text(49);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "div", 23);
      \u0275\u0275element(51, "app-command-editor", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "p", 25);
      \u0275\u0275text(53, " Starter code is a sample to experiment with. Test runs do not complete or assess a lesson. ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(54, "aside", 26)(55, "details", 27)(56, "summary")(57, "span", 3);
      \u0275\u0275text(58);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "h2");
      \u0275\u0275text(60, "To be completed");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(61, "p", 28);
      \u0275\u0275text(62, "Proposed products \xB7 no completion tracking yet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "ol", 29);
      \u0275\u0275repeaterCreate(64, AutomationWeekWorkspaceComponent_For_65_Template, 5, 5, "li", 30, _forTrack13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "p", 31);
      \u0275\u0275text(67, " The future tutor will guide and review each product for standards alignment before completion is recorded. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "details", 32)(69, "summary")(70, "span", 3);
      \u0275\u0275text(71, "BUILD PLANNING");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "h2");
      \u0275\u0275text(73, "AI Tutor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "span", 33);
      \u0275\u0275text(75, "Not connected");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(76, "h3");
      \u0275\u0275text(77, "Questions the tutor will use");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "ul");
      \u0275\u0275repeaterCreate(79, AutomationWeekWorkspaceComponent_For_80_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "h3");
      \u0275\u0275text(82, "Evidence to review");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "ul");
      \u0275\u0275repeaterCreate(84, AutomationWeekWorkspaceComponent_For_85_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "h3");
      \u0275\u0275text(87, "Future model control");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "ul");
      \u0275\u0275repeaterCreate(89, AutomationWeekWorkspaceComponent_For_90_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(91, AutomationWeekWorkspaceComponent_Conditional_91_Template, 4, 1);
      \u0275\u0275elementStart(92, "p", 31);
      \u0275\u0275text(93, " Planning lists only. Tutor conversations, automatic adjustments, assessment, and shared work are future builds. ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_18_0;
      \u0275\u0275attribute("data-week", ctx.week().week);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("ROBOT DELIVERY CODE LAB \xB7 WEEK ", ctx.week().week);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.week().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.week().setting);
      \u0275\u0275advance(6);
      \u0275\u0275property("value", ctx.runtime.challenge().id);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.runtime.config.challenges);
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.target());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.runtime.course().targets);
      \u0275\u0275advance(3);
      \u0275\u0275property("checked", ctx.trace());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.extraChallenge() ? 26 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("course", ctx.course())("robotRadiusCm", ctx.runtime.config.robot.radiusCm)("targetIndex", ctx.target())("sample", ctx.replay.current())("samples", ctx.replay.trial()?.pathSamples ?? \u0275\u0275pureFunction0(29, _c04))("events", ctx.replay.trial()?.events ?? \u0275\u0275pureFunction0(30, _c04))("result", ctx.replay.trial())("showTrace", ctx.trace());
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_18_0 = ctx.replay.trial()) ? 30 : -1, tmp_18_0);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Trial replays (", ctx.runtime.currentTrials().length, ")");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.runtime.currentTrials());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.replay.trial() ? "Recorded code" : "Your program");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.replay.trial() ? "Replay only" : "Editable test code");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.challenge().mission);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.replay.trial() ? 46 : 47);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.runtime.message() || ctx.runtime.saveStatus());
      \u0275\u0275advance(2);
      \u0275\u0275property("snapshot", ctx.replay.trial()?.version?.program)("activeId", ctx.replay.current()?.activeCommandId ?? "")("assessmentLinks", false);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("WEEK ", ctx.week().week);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.week().sessions);
      \u0275\u0275advance(15);
      \u0275\u0275repeater(ctx.week().questions);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.week().evidence);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.week().adjustments);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.extraChallenge() ? 91 : -1);
    }
  }, dependencies: [RobotCourseComponent, CommandEditorComponent, DecimalPipe], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #e4eeeb;\n  font-family:\n    Inter,\n    system-ui,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.week-workspace[_ngcontent-%COMP%] {\n  --%NS%accent: #77d8c3;\n  --%NS%surface: #152e32;\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(295px, 3fr);\n  gap: 20px;\n  padding: 24px;\n  min-height: calc(100dvh - 110px);\n  background: #0c1e24;\n}\n.week-workspace[data-week="2"][_ngcontent-%COMP%] {\n  --%NS%accent: #efc676;\n  --%NS%surface: #343026;\n}\n.week-workspace[data-week="3"][_ngcontent-%COMP%] {\n  --%NS%accent: #8fc5fa;\n  --%NS%surface: #1a2d48;\n}\n.week-workspace[data-week="4"][_ngcontent-%COMP%] {\n  --%NS%accent: #d1a8ff;\n  --%NS%surface: #302544;\n}\n.interactive[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.mission-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 4px 0 20px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  font-weight: 800;\n  letter-spacing: 1.6px;\n  color: var(--%NS%accent);\n  margin: 0 0 7px;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: clamp(24px, 2.3vw, 36px);\n  letter-spacing: -1px;\n  margin: 0 0 8px;\n}\n.mission-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:not(.eyebrow) {\n  font-size: 13px;\n  color: #b6c9cf;\n  margin: 0;\n  line-height: 1.5;\n}\n.preview-badge[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: var(--%NS%accent);\n  border: 1px solid #476068;\n  border-radius: 24px;\n  padding: 7px 10px;\n  font-size: 11px;\n}\n.challenge-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: end;\n  padding: 14px;\n  border-radius: 14px 14px 0 0;\n  background: var(--%NS%surface);\n  border-top: 2px solid var(--%NS%accent);\n}\nlabel[_ngcontent-%COMP%] {\n  font-size: 11px;\n  display: grid;\n  gap: 5px;\n}\n.challenge-bar[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:not(.trace) {\n  flex: 1 1 155px;\n  min-width: 0;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  font: inherit;\n  font-size: 12px;\n  min-height: 44px;\n  border: 1px solid #52666e;\n  border-radius: 8px;\n  padding: 9px 11px;\n  color: #203d45;\n  background: #f4f7f3;\n  cursor: pointer;\n  max-width: 100%;\n}\nselect[_ngcontent-%COMP%] {\n  width: 100%;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.trace[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  min-height: 44px;\n}\n.activity-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.35fr) minmax(290px, 1fr);\n  gap: 14px;\n  background: var(--%NS%surface);\n  padding: 14px;\n  border-radius: 0 0 16px 16px;\n}\n.course-stage[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.code-panel[_ngcontent-%COMP%] {\n  color: #223f45;\n  background: #eff3ed;\n  border-radius: 12px;\n  padding: 16px;\n  min-width: 0;\n}\n.code-panel[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px 12px;\n  justify-content: space-between;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 19px;\n}\n.code-panel[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #526964;\n}\n.mission[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.6;\n  margin: 12px 0;\n}\n.code-scroll[_ngcontent-%COMP%] {\n  max-height: clamp(220px, calc(100dvh - 470px), 440px);\n  overflow: auto;\n  padding: 3px;\n}\n.run-actions[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.primary[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #dbeaa9;\n  border-color: #8da465;\n  color: #233b2b;\n  font-weight: 800;\n}\n.save-status[_ngcontent-%COMP%], \n.sample-note[_ngcontent-%COMP%] {\n  font-size: 11px;\n  line-height: 1.5;\n}\n.sample-note[_ngcontent-%COMP%] {\n  color: #56695e;\n}\n.replay-panel[_ngcontent-%COMP%] {\n  padding: 12px 0;\n}\n.replay-actions[_ngcontent-%COMP%], \n.metrics[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.metrics[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #b6c9cf;\n}\n.metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 5px 7px;\n  border: 1px solid #49616a;\n  border-radius: 6px;\n}\n.timeline[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.timeline[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  accent-color: var(--%NS%accent);\n}\n.replay-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 44px;\n}\n.trial-history[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin-top: 12px;\n}\n.trial-history[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin: 6px 0;\n  text-align: left;\n}\n.planning[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.plan-card[_ngcontent-%COMP%] {\n  padding: 20px;\n  border: 1px solid #3d5260;\n  border-radius: 16px;\n  background: #172b35;\n}\n.plan-card[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  position: relative;\n}\n.plan-card[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  display: inline;\n}\n.plan-card[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  margin-left: 15px;\n}\n.muted[_ngcontent-%COMP%], \n.footnote[_ngcontent-%COMP%] {\n  color: #aec2cb;\n  font-size: 11px;\n  line-height: 1.6;\n}\n.products[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 16px 0;\n}\n.products[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 12px;\n  border-left: 2px solid #455a60;\n  margin: 8px 0;\n  background: #10232d;\n  border-radius: 0 8px 8px 0;\n}\n.products[_ngcontent-%COMP%]   li.current[_ngcontent-%COMP%] {\n  border-color: var(--%NS%accent);\n}\n.products[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--%NS%accent);\n}\n.products[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 7px 0 0;\n  font-size: 13px;\n  line-height: 1.6;\n}\n.offline[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 0 0 0 8px;\n  font-size: 10px;\n  color: #e2c692;\n  border: 1px solid #746343;\n  border-radius: 12px;\n  padding: 3px 6px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 20px 0 8px;\n  color: var(--%NS%accent);\n}\n.tutor-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding-left: 17px;\n  margin: 0;\n}\n.tutor-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], \n.tutor-card[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(.footnote) {\n  font-size: 12px;\n  line-height: 1.65;\n  margin-bottom: 9px;\n}\n.footnote[_ngcontent-%COMP%] {\n  border-top: 1px solid #344d58;\n  padding-top: 12px;\n  margin-bottom: 0;\n}\n.extra-note[_ngcontent-%COMP%] {\n  font-size: 12px;\n  padding: 10px;\n  margin: 0;\n  background: #293d48;\n}\n[_ngcontent-%COMP%]:is(button, select, input, summary):focus-visible {\n  outline: 3px solid #ecb955;\n  outline-offset: 3px;\n}\n@media (min-width: 1600px) {\n  .code-scroll[_ngcontent-%COMP%] {\n    max-height: 540px;\n  }\n}\n@media (max-width: 1100px) {\n  .week-workspace[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 16px;\n    gap: 14px;\n  }\n  .planning[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 820px) {\n  .week-workspace[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .activity-grid[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .code-scroll[_ngcontent-%COMP%] {\n    max-height: none;\n  }\n  .preview-badge[_ngcontent-%COMP%] {\n    white-space: normal;\n  }\n}\n@media (max-width: 540px) {\n  .planning[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .mission-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .plan-card[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=automation-week-workspace.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutomationWeekWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-automation-week-workspace", imports: [DecimalPipe, RobotCourseComponent, CommandEditorComponent], providers: [RobotReplayService], template: `<main class="week-workspace" [attr.data-week]="week().week">
  <section class="interactive" aria-label="Interactive robot workspace">
    <header class="mission-header">
      <div>
        <p class="eyebrow">ROBOT DELIVERY CODE LAB \xB7 WEEK {{ week().week }}</p>
        <h1>{{ week().title }}</h1>
        <p>{{ week().setting }}</p>
      </div>
      <span class="preview-badge">Testing \xB7 all access</span>
    </header>
    <div class="challenge-bar">
      <label
        >Challenge
        <select
          aria-label="Robot challenge"
          [value]="runtime.challenge().id"
          (change)="choose($any($event.target).value)"
        >
          @for (challenge of runtime.config.challenges; track challenge.id) {
            <option [value]="challenge.id" [selected]="challenge.id === runtime.challenge().id">
              {{ challenge.title }}
            </option>
          }
        </select>
      </label>
      <label
        >Target
        <select
          aria-label="Parking target"
          [value]="target()"
          (change)="setTarget($any($event.target).value)"
        >
          @for (target of runtime.course().targets; track $index) {
            <option [value]="$index" [selected]="$index === runtime.draft().targetIndex">
              {{ target.label }}
            </option>
          }
        </select>
      </label>
      <label class="trace"
        ><input
          type="checkbox"
          [checked]="trace()"
          (change)="trace.set($any($event.target).checked)"
        />Path</label
      >
    </div>
    @if (extraChallenge()) {
      <p class="extra-note">
        Extra challenge open. The planning panel still describes Week {{ week().week }}.
      </p>
    }
    <div class="activity-grid">
      <section class="course-stage" aria-label="Live course and replay">
        <app-robot-course
          [course]="course()"
          [robotRadiusCm]="runtime.config.robot.radiusCm"
          [targetIndex]="target()"
          [sample]="replay.current()"
          [samples]="replay.trial()?.pathSamples ?? []"
          [events]="replay.trial()?.events ?? []"
          [result]="replay.trial()"
          [showTrace]="trace()"
        />
        @if (replay.trial(); as trial) {
          <div class="replay-panel">
            <div class="replay-actions">
              <button (click)="replay.playing() ? replay.pause() : replay.play()">
                {{ replay.playing() ? 'Pause' : 'Play replay' }}
              </button>
              <button (click)="replay.step()" [disabled]="replay.playing()">Step</button>
              <button (click)="edit()">Back to live code</button>
            </div>
            <label class="timeline"
              >Replay timeline
              <input
                aria-label="Replay timeline"
                type="range"
                min="0"
                [max]="replay.duration()"
                step="50"
                [value]="replay.timeMs()"
                (input)="replay.seek(+$any($event.target).value)"
              />
            </label>
            <p role="status">
              {{
                finished()
                  ? trial.completedMission
                    ? 'Course goal reached'
                    : trial.stoppedReason
                  : 'Replaying this trial'
              }}
            </p>
            <div class="metrics">
              <span>{{ trial.distanceCm | number: '1.0-1' }} cm</span
              ><span>{{ trial.elapsedSeconds | number: '1.0-1' }} s</span
              ><span>{{ trial.collisions }} collisions</span
              ><span>{{ trial.deliveriesCompleted }} deliveries</span>
            </div>
          </div>
        }
        <details class="trial-history">
          <summary>Trial replays ({{ runtime.currentTrials().length }})</summary>
          @for (trial of runtime.currentTrials(); track trial.id; let i = $index) {
            <button (click)="watch(trial)">
              Replay {{ i + 1 }} \xB7 {{ trial.distanceCm | number: '1.0-0' }} cm \xB7
              {{ trial.collisions }} collisions
            </button>
          } @empty {
            <p>Run the program to create a local test replay.</p>
          }
        </details>
      </section>
      <section class="code-panel" aria-label="Robot program">
        <header>
          <h2>{{ replay.trial() ? 'Recorded code' : 'Your program' }}</h2>
          <span>{{ replay.trial() ? 'Replay only' : 'Editable test code' }}</span>
        </header>
        <p class="mission">{{ runtime.challenge().mission }}</p>
        <div class="run-actions">
          @if (replay.trial()) {
            <button class="primary" (click)="edit()">Edit program</button>
          } @else {
            <button
              class="primary"
              (click)="run()"
              [disabled]="!runtime.draft().program.commands.length"
            >
              \u25B6 Run program
            </button>
          }
        </div>
        <p class="save-status" role="status">{{ runtime.message() || runtime.saveStatus() }}</p>
        <div class="code-scroll">
          <app-command-editor
            [snapshot]="replay.trial()?.version?.program"
            [activeId]="replay.current()?.activeCommandId ?? ''"
            [assessmentLinks]="false"
          />
        </div>
        <p class="sample-note">
          Starter code is a sample to experiment with. Test runs do not complete or assess a lesson.
        </p>
      </section>
    </div>
  </section>
  <aside class="planning" aria-label="Weekly work and AI tutor planning">
    <details class="plan-card weekly-card" open>
      <summary>
        <span class="eyebrow">WEEK {{ week().week }}</span>
        <h2>To be completed</h2>
      </summary>
      <p class="muted">Proposed products \xB7 no completion tracking yet</p>
      <ol class="products">
        @for (session of week().sessions; track session.challengeId; let i = $index) {
          <li [class.current]="sessionIndex() === i">
            <strong
              >Session {{ i + 1 }} \xB7
              {{ i === 0 ? 'Individual learning' : 'Group activity' }}</strong
            >
            <p>{{ session.product }}</p>
          </li>
        }
      </ol>
      <p class="footnote">
        The future tutor will guide and review each product for standards alignment before
        completion is recorded.
      </p>
    </details>
    <details class="plan-card tutor-card" open>
      <summary>
        <span class="eyebrow">BUILD PLANNING</span>
        <h2>AI Tutor</h2>
        <span class="offline">Not connected</span>
      </summary>
      <h3>Questions the tutor will use</h3>
      <ul>
        @for (question of week().questions; track question) {
          <li>{{ question }}</li>
        }
      </ul>
      <h3>Evidence to review</h3>
      <ul>
        @for (item of week().evidence; track item) {
          <li>{{ item }}</li>
        }
      </ul>
      <h3>Future model control</h3>
      <ul>
        @for (item of week().adjustments; track item) {
          <li>{{ item }}</li>
        }
      </ul>
      @if (extraChallenge()) {
        <h3>Extra challenge focus</h3>
        <p>{{ runtime.challenge().discovery?.reasoningPrompt ?? runtime.challenge().hint }}</p>
      }
      <p class="footnote">
        Planning lists only. Tutor conversations, automatic adjustments, assessment, and shared work
        are future builds.
      </p>
    </details>
  </aside>
</main>
`, styles: ['/* src/app/templates/programming-automation/ui/automation-week-workspace.component.css */\n:host {\n  display: block;\n  color: #e4eeeb;\n  font-family:\n    Inter,\n    system-ui,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.week-workspace {\n  --accent: #77d8c3;\n  --surface: #152e32;\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(295px, 3fr);\n  gap: 20px;\n  padding: 24px;\n  min-height: calc(100dvh - 110px);\n  background: #0c1e24;\n}\n.week-workspace[data-week="2"] {\n  --accent: #efc676;\n  --surface: #343026;\n}\n.week-workspace[data-week="3"] {\n  --accent: #8fc5fa;\n  --surface: #1a2d48;\n}\n.week-workspace[data-week="4"] {\n  --accent: #d1a8ff;\n  --surface: #302544;\n}\n.interactive {\n  min-width: 0;\n}\n.mission-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 4px 0 20px;\n}\n.eyebrow {\n  display: block;\n  font-size: 10px;\n  font-weight: 800;\n  letter-spacing: 1.6px;\n  color: var(--accent);\n  margin: 0 0 7px;\n}\nh1 {\n  font-size: clamp(24px, 2.3vw, 36px);\n  letter-spacing: -1px;\n  margin: 0 0 8px;\n}\n.mission-header p:not(.eyebrow) {\n  font-size: 13px;\n  color: #b6c9cf;\n  margin: 0;\n  line-height: 1.5;\n}\n.preview-badge {\n  flex-shrink: 0;\n  color: var(--accent);\n  border: 1px solid #476068;\n  border-radius: 24px;\n  padding: 7px 10px;\n  font-size: 11px;\n}\n.challenge-bar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: end;\n  padding: 14px;\n  border-radius: 14px 14px 0 0;\n  background: var(--surface);\n  border-top: 2px solid var(--accent);\n}\nlabel {\n  font-size: 11px;\n  display: grid;\n  gap: 5px;\n}\n.challenge-bar label:not(.trace) {\n  flex: 1 1 155px;\n  min-width: 0;\n}\nbutton,\nselect {\n  font: inherit;\n  font-size: 12px;\n  min-height: 44px;\n  border: 1px solid #52666e;\n  border-radius: 8px;\n  padding: 9px 11px;\n  color: #203d45;\n  background: #f4f7f3;\n  cursor: pointer;\n  max-width: 100%;\n}\nselect {\n  width: 100%;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.trace {\n  display: flex;\n  align-items: center;\n  min-height: 44px;\n}\n.activity-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1.35fr) minmax(290px, 1fr);\n  gap: 14px;\n  background: var(--surface);\n  padding: 14px;\n  border-radius: 0 0 16px 16px;\n}\n.course-stage {\n  min-width: 0;\n}\n.code-panel {\n  color: #223f45;\n  background: #eff3ed;\n  border-radius: 12px;\n  padding: 16px;\n  min-width: 0;\n}\n.code-panel header {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px 12px;\n  justify-content: space-between;\n}\nh2 {\n  margin: 0;\n  font-size: 19px;\n}\n.code-panel header span {\n  font-size: 10px;\n  color: #526964;\n}\n.mission {\n  font-size: 12px;\n  line-height: 1.6;\n  margin: 12px 0;\n}\n.code-scroll {\n  max-height: clamp(220px, calc(100dvh - 470px), 440px);\n  overflow: auto;\n  padding: 3px;\n}\n.run-actions {\n  margin-top: 12px;\n}\n.primary {\n  width: 100%;\n  background: #dbeaa9;\n  border-color: #8da465;\n  color: #233b2b;\n  font-weight: 800;\n}\n.save-status,\n.sample-note {\n  font-size: 11px;\n  line-height: 1.5;\n}\n.sample-note {\n  color: #56695e;\n}\n.replay-panel {\n  padding: 12px 0;\n}\n.replay-actions,\n.metrics {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.metrics {\n  font-size: 11px;\n  color: #b6c9cf;\n}\n.metrics span {\n  padding: 5px 7px;\n  border: 1px solid #49616a;\n  border-radius: 6px;\n}\n.timeline {\n  margin-top: 12px;\n}\n.timeline input {\n  width: 100%;\n  accent-color: var(--accent);\n}\n.replay-panel p {\n  font-size: 13px;\n}\nsummary {\n  cursor: pointer;\n  min-height: 44px;\n}\n.trial-history {\n  font-size: 12px;\n  margin-top: 12px;\n}\n.trial-history button {\n  display: block;\n  width: 100%;\n  margin: 6px 0;\n  text-align: left;\n}\n.planning {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.plan-card {\n  padding: 20px;\n  border: 1px solid #3d5260;\n  border-radius: 16px;\n  background: #172b35;\n}\n.plan-card summary {\n  position: relative;\n}\n.plan-card summary h2 {\n  display: inline;\n}\n.plan-card summary .eyebrow {\n  margin-left: 15px;\n}\n.muted,\n.footnote {\n  color: #aec2cb;\n  font-size: 11px;\n  line-height: 1.6;\n}\n.products {\n  list-style: none;\n  padding: 0;\n  margin: 16px 0;\n}\n.products li {\n  padding: 12px;\n  border-left: 2px solid #455a60;\n  margin: 8px 0;\n  background: #10232d;\n  border-radius: 0 8px 8px 0;\n}\n.products li.current {\n  border-color: var(--accent);\n}\n.products strong {\n  font-size: 11px;\n  color: var(--accent);\n}\n.products p {\n  margin: 7px 0 0;\n  font-size: 13px;\n  line-height: 1.6;\n}\n.offline {\n  display: inline-block;\n  margin: 0 0 0 8px;\n  font-size: 10px;\n  color: #e2c692;\n  border: 1px solid #746343;\n  border-radius: 12px;\n  padding: 3px 6px;\n}\nh3 {\n  font-size: 12px;\n  margin: 20px 0 8px;\n  color: var(--accent);\n}\n.tutor-card ul {\n  padding-left: 17px;\n  margin: 0;\n}\n.tutor-card li,\n.tutor-card > p:not(.footnote) {\n  font-size: 12px;\n  line-height: 1.65;\n  margin-bottom: 9px;\n}\n.footnote {\n  border-top: 1px solid #344d58;\n  padding-top: 12px;\n  margin-bottom: 0;\n}\n.extra-note {\n  font-size: 12px;\n  padding: 10px;\n  margin: 0;\n  background: #293d48;\n}\n:is(button, select, input, summary):focus-visible {\n  outline: 3px solid #ecb955;\n  outline-offset: 3px;\n}\n@media (min-width: 1600px) {\n  .code-scroll {\n    max-height: 540px;\n  }\n}\n@media (max-width: 1100px) {\n  .week-workspace {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 16px;\n    gap: 14px;\n  }\n  .planning {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 820px) {\n  .week-workspace {\n    padding: 12px;\n  }\n  .activity-grid {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .code-scroll {\n    max-height: none;\n  }\n  .preview-badge {\n    white-space: normal;\n  }\n}\n@media (max-width: 540px) {\n  .planning {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .mission-header {\n    flex-direction: column;\n  }\n  .plan-card {\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=automation-week-workspace.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AutomationWeekWorkspaceComponent, { className: "AutomationWeekWorkspaceComponent", filePath: "src/app/templates/programming-automation/ui/automation-week-workspace.component.ts", lineNumber: 17 });
})();

// src/app/templates/programming-automation/ui/math-workbench.component.ts
var _forTrack05 = ($index, $item) => $item.id;
function MathWorkbenchComponent_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const trial_r2 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Observed run: ", ctx_r2.format(trial_r2.distanceCm), " cm travelled. ", trial_r2.stoppedReason, ". ");
  }
}
function MathWorkbenchComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 2);
    \u0275\u0275conditionalCreate(1, MathWorkbenchComponent_Conditional_2_Conditional_1_Template, 2, 2, "p");
    \u0275\u0275domElementStart(2, "details")(3, "summary");
    \u0275\u0275text(4, "Need a clue?");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "label");
    \u0275\u0275text(8, "My observation");
    \u0275\u0275domElementStart(9, "textarea", 8);
    \u0275\u0275domListener("input", function MathWorkbenchComponent_Conditional_2_Template_textarea_input_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.updateDraft({ diagnosis: $event.target.value }));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "button", 9);
    \u0275\u0275domListener("click", function MathWorkbenchComponent_Conditional_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.go("calculate"));
    });
    \u0275\u0275text(11, " Continue ");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("hidden", ctx_r2.step() !== "observe");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx_r2.runtime.observedTrial()) ? 1 : -1, tmp_3_0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.challenge().discovery?.reasoningPrompt ?? "Which command first took the robot away from your plan? Should its number increase or decrease? Use the course measurements and trial results to explain a new estimate.", " ");
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", ctx_r2.runtime.draft().diagnosis);
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", !ctx_r2.runtime.draft().diagnosis.trim());
  }
}
function MathWorkbenchComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "details", 10)(1, "summary");
    \u0275\u0275text(2, "Linked calculation");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const selected_r4 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("correct", selected_r4.status === "correct");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3("", ctx_r2.title(selected_r4.tool), " \xB7 ", ctx_r2.format(selected_r4.answer), " ", selected_r4.unit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(selected_r4.explanation);
  }
}
function MathWorkbenchComponent_Conditional_4_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const tool_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("value", tool_r6.id)("selected", tool_r6.id === ctx_r2.toolId());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tool_r6.title);
  }
}
function MathWorkbenchComponent_Conditional_4_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "label");
    \u0275\u0275text(1);
    \u0275\u0275domElementStart(2, "input", 20);
    \u0275\u0275domListener("input", function MathWorkbenchComponent_Conditional_4_For_14_Template_input_input_2_listener($event) {
      const \u0275$index_62_r8 = \u0275\u0275restoreView(_r7).$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setValue(\u0275$index_62_r8, $event.target.value));
    });
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const label_r9 = ctx.$implicit;
    const \u0275$index_62_r8 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(label_r9);
    \u0275\u0275advance();
    \u0275\u0275domProperty("value", ctx_r2.values().at(\u0275$index_62_r8) ?? "")("disabled", ctx_r2.runtime.sample);
    \u0275\u0275attribute("aria-label", label_r9);
  }
}
function MathWorkbenchComponent_Conditional_4_Conditional_33_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1, " Check which quantities you used, their units, and the operation. Use the hint if you need another starting point, then try your own calculation again. ");
    \u0275\u0275domElementEnd();
  }
}
function MathWorkbenchComponent_Conditional_4_Conditional_33_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 16);
    \u0275\u0275domListener("click", function MathWorkbenchComponent_Conditional_4_Conditional_33_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const evidence_r11 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.link(evidence_r11.id));
    });
    \u0275\u0275text(1, "Link to selected command");
    \u0275\u0275domElementEnd();
  }
}
function MathWorkbenchComponent_Conditional_4_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 10)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(3, MathWorkbenchComponent_Conditional_4_Conditional_33_Conditional_3_Template, 2, 0, "p");
    \u0275\u0275domElementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(6, MathWorkbenchComponent_Conditional_4_Conditional_33_Conditional_6_Template, 2, 0, "button");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const evidence_r11 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("correct", evidence_r11.status === "correct");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(evidence_r11.status === "correct" ? "\u2713 Calculation supported" : "Revise your calculation");
    \u0275\u0275advance();
    \u0275\u0275conditional(evidence_r11.status === "needs-revision" ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Your answer: ", ctx_r2.format(evidence_r11.answer), " ", evidence_r11.unit);
    \u0275\u0275advance();
    \u0275\u0275conditional(evidence_r11.status === "correct" && ctx_r2.runtime.selectedCommand() && ctx_r2.runtime.canEdit() && ctx_r2.allowLink() ? 6 : -1);
  }
}
function MathWorkbenchComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 11)(1, "label");
    \u0275\u0275text(2, "Calculation");
    \u0275\u0275domElementStart(3, "select", 12);
    \u0275\u0275domListener("change", function MathWorkbenchComponent_Conditional_4_Template_select_change_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.choose($event.target.value));
    });
    \u0275\u0275repeaterCreate(4, MathWorkbenchComponent_Conditional_4_For_5_Template, 2, 3, "option", 13, _forTrack05);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "details")(7, "summary");
    \u0275\u0275text(8, "Need a math hint?");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "p", 14);
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd()();
    \u0275\u0275repeaterCreate(13, MathWorkbenchComponent_Conditional_4_For_14_Template, 3, 4, "label", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275domElementStart(15, "label");
    \u0275\u0275text(16);
    \u0275\u0275domElementStart(17, "input", 15);
    \u0275\u0275domListener("input", function MathWorkbenchComponent_Conditional_4_Template_input_input_17_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.answer.set($event.target.value);
      return \u0275\u0275resetView(ctx_r2.result.set(void 0));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(18, "div", 7)(19, "button", 16);
    \u0275\u0275domListener("click", function MathWorkbenchComponent_Conditional_4_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.go("observe"));
    });
    \u0275\u0275text(20, "Back");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(21, "button", 17);
    \u0275\u0275domListener("click", function MathWorkbenchComponent_Conditional_4_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.go("explain"));
    });
    \u0275\u0275text(22, "Continue");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(23, "div", 11)(24, "label");
    \u0275\u0275text(25, "Explain your thinking");
    \u0275\u0275domElementStart(26, "textarea", 18);
    \u0275\u0275domListener("input", function MathWorkbenchComponent_Conditional_4_Template_textarea_input_26_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.explanation.set($event.target.value);
      return \u0275\u0275resetView(ctx_r2.result.set(void 0));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(27, "button", 16);
    \u0275\u0275domListener("click", function MathWorkbenchComponent_Conditional_4_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.go("calculate"));
    });
    \u0275\u0275text(28, "Back");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(29, "button", 9);
    \u0275\u0275domListener("click", function MathWorkbenchComponent_Conditional_4_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.check());
    });
    \u0275\u0275text(30, " Check & save calculation ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(31, "p", 19);
    \u0275\u0275text(32);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(33, MathWorkbenchComponent_Conditional_4_Conditional_33_Template, 7, 7, "div", 3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_17_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("hidden", ctx_r2.step() !== "calculate");
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", ctx_r2.toolId());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.tools);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.tool().formula);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.challenge().hint);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.tool().inputs);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Your answer (", ctx_r2.tool().unit, ")");
    \u0275\u0275advance();
    \u0275\u0275domProperty("value", ctx_r2.answer())("disabled", ctx_r2.runtime.sample);
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("disabled", !ctx_r2.calculationReady());
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("hidden", ctx_r2.step() !== "explain");
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", ctx_r2.explanation())("disabled", ctx_r2.runtime.sample);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("disabled", ctx_r2.runtime.sample);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.feedback());
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_17_0 = ctx_r2.result()) ? 33 : -1, tmp_17_0);
  }
}
function MathWorkbenchComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "article")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "button", 17);
    \u0275\u0275domListener("click", function MathWorkbenchComponent_For_12_Template_button_click_7_listener() {
      const evidence_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.link(evidence_r13.id));
    });
    \u0275\u0275text(8, " Link to selected command ");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const evidence_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.title(evidence_r13.tool));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", ctx_r2.format(evidence_r13.answer), " ", evidence_r13.unit, " \xB7 ", evidence_r13.status === "correct" ? "Checked" : "Needs revision", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(evidence_r13.explanation);
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", evidence_r13.status !== "correct" || !ctx_r2.runtime.selectedCommand() || !ctx_r2.runtime.canEdit() || !ctx_r2.allowLink());
  }
}
function MathWorkbenchComponent_ForEmpty_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1, "Your calculations will appear here, including revisions.");
    \u0275\u0275domElementEnd();
  }
}
function MathWorkbenchComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "label");
    \u0275\u0275text(1, "Measured distance per rotation (cm)");
    \u0275\u0275domElementStart(2, "input", 21);
    \u0275\u0275domListener("input", function MathWorkbenchComponent_Conditional_20_Template_input_input_2_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.updateCalibration("measuredDistancePerRotation", $event.target.value));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(3, "details")(4, "summary");
    \u0275\u0275text(5, "Measurement clue");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("value", ctx_r2.runtime.state().measuredDistancePerRotation)("disabled", ctx_r2.runtime.sample);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" Wheel diameter: ", ctx_r2.runtime.config.robot.wheelDiameterCm, " cm. Use \u03C0 = 3.14. Test one rotation and compare its measured distance. ");
  }
}
function MathWorkbenchComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "label");
    \u0275\u0275text(1, "Measured turn rate (\xB0/second)");
    \u0275\u0275domElementStart(2, "input", 22);
    \u0275\u0275domListener("input", function MathWorkbenchComponent_Conditional_21_Template_input_input_2_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.updateCalibration("measuredTurnRate", $event.target.value));
    });
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("value", ctx_r2.runtime.state().measuredTurnRate)("disabled", ctx_r2.runtime.sample);
  }
}
function MathWorkbenchComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "label");
    \u0275\u0275text(1, "Your explanation");
    \u0275\u0275domElementStart(2, "textarea", 23);
    \u0275\u0275domListener("input", function MathWorkbenchComponent_Conditional_22_Template_textarea_input_2_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.updateCalibration("measurementExplanation", $event.target.value));
    });
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("value", ctx_r2.runtime.state().measurementExplanation)("disabled", ctx_r2.runtime.sample);
  }
}
function MathWorkbenchComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 16);
    \u0275\u0275domListener("click", function MathWorkbenchComponent_Conditional_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goCalibration(ctx_r2.calibrationStep() - 1));
    });
    \u0275\u0275text(1, "Back");
    \u0275\u0275domElementEnd();
  }
}
function MathWorkbenchComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 16);
    \u0275\u0275domListener("click", function MathWorkbenchComponent_Conditional_25_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goCalibration(ctx_r2.calibrationStep() + 1));
    });
    \u0275\u0275text(1, "Continue");
    \u0275\u0275domElementEnd();
  }
}
function MathWorkbenchComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 16);
    \u0275\u0275domListener("click", function MathWorkbenchComponent_Conditional_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      \u0275\u0275nextContext();
      const calibration_r20 = \u0275\u0275reference(15);
      calibration_r20.open = false;
      return \u0275\u0275resetView(calibration_r20.querySelector("summary")?.focus());
    });
    \u0275\u0275text(1, " Done ");
    \u0275\u0275domElementEnd();
  }
}
var MathWorkbenchComponent = class _MathWorkbenchComponent {
  element = inject(ElementRef);
  injector = inject(Injector);
  step = signal(
    "observe",
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  calculationReady = computed(
    () => !!this.answer().trim() && this.tool().inputs.every((_, i) => !!this.values()[i]?.trim()),
    ...ngDevMode ? [{ debugName: "calculationReady" }] : (
      /* istanbul ignore next */
      []
    )
  );
  go(step) {
    this.step.set(step);
    afterNextRender(() => {
      const heading = this.element.nativeElement.querySelector("h2");
      heading?.scrollIntoView({ block: "nearest" });
      heading?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  calibrationStep = signal(
    0,
    ...ngDevMode ? [{ debugName: "calibrationStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  goCalibration(step) {
    this.calibrationStep.set(Math.max(0, Math.min(2, step)));
    afterNextRender(() => {
      const heading = this.element.nativeElement.querySelector(".calibration h3");
      heading?.scrollIntoView({ block: "nearest" });
      heading?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  allowLink = input(
    true,
    ...ngDevMode ? [{ debugName: "allowLink" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedEvidence = computed(
    () => this.runtime.state().math.find((e) => e.id === this.runtime.selectedCommand()?.mathEvidenceId),
    ...ngDevMode ? [{ debugName: "selectedEvidence" }] : (
      /* istanbul ignore next */
      []
    )
  );
  runtime = inject(AutomationRuntimeService);
  tools = mathTools;
  toolId = signal(
    "distance-rotations",
    ...ngDevMode ? [{ debugName: "toolId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  values = signal(
    [],
    ...ngDevMode ? [{ debugName: "values" }] : (
      /* istanbul ignore next */
      []
    )
  );
  answer = signal(
    "",
    ...ngDevMode ? [{ debugName: "answer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  explanation = signal(
    "",
    ...ngDevMode ? [{ debugName: "explanation" }] : (
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
  feedback = signal(
    "",
    ...ngDevMode ? [{ debugName: "feedback" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tool = computed(
    () => mathTools.find((t) => t.id === this.toolId()),
    ...ngDevMode ? [{ debugName: "tool" }] : (
      /* istanbul ignore next */
      []
    )
  );
  format = decimalAndFraction;
  constructor() {
    effect(() => {
      const challenge = this.runtime.challenge();
      this.step.set("observe");
      this.choose(challenge.discovery?.mathTool ?? challenge.requiredMath[0] ?? "distance-rotations");
      this.explanation.set("");
    });
  }
  link(id) {
    if (this.allowLink())
      this.runtime.linkEvidence(id);
  }
  title(id) {
    return mathTools.find((t) => t.id === id).title;
  }
  choose(id) {
    this.toolId.set(id);
    this.values.set([]);
    this.result.set(void 0);
    this.answer.set("");
    this.feedback.set("");
  }
  setValue(index, value) {
    this.values.update((values) => {
      const next = [...values];
      next[index] = value;
      return next;
    });
    this.result.set(void 0);
  }
  check() {
    if (this.runtime.sample)
      return;
    try {
      if (!this.answer().trim() || this.explanation().trim().length < 8 || this.tool().inputs.some((_, i) => !this.values()[i]?.trim()))
        throw new Error("Enter the inputs, your answer, and an explanation before checking.");
      const inputs = this.values().map((v) => calculate(v));
      const expected = expectedMath(this.toolId(), inputs);
      const answer = calculate(this.answer());
      const evidence = {
        id: crypto.randomUUID(),
        studentId: this.runtime.session.actorId,
        tool: this.toolId(),
        inputs,
        answer,
        expected,
        unit: this.tool().unit,
        explanation: this.explanation().trim(),
        status: Math.abs(answer - expected) <= 0.01 ? "correct" : "needs-revision",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.runtime.saveEvidence(evidence);
      this.result.set(evidence);
      this.feedback.set("Calculation saved to your evidence notebook.");
    } catch (error) {
      this.feedback.set(error instanceof Error ? error.message : "Check your numbers.");
    }
  }
  static \u0275fac = function MathWorkbenchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MathWorkbenchComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MathWorkbenchComponent, selectors: [["app-math-workbench"]], inputs: { allowLink: [1, "allowLink"] }, decls: 27, vars: 11, consts: [["calibration", ""], ["tabindex", "-1"], [1, "observation", 3, "hidden"], [1, "result", 3, "correct"], [1, "reference-notebooks"], [1, "evidence", 3, "open"], [1, "calibration"], [1, "step-actions"], ["aria-label", "My observation", "rows", "2", "placeholder", "The robot\u2026 so my next number should\u2026", 3, "input", "value"], [1, "primary", 3, "click", "disabled"], [1, "result"], [3, "hidden"], ["aria-label", "Math calculation", 3, "change", "value"], [3, "value", "selected"], [1, "formula"], ["aria-label", "Your math answer", "placeholder", "Calculate before checking", 3, "input", "value", "disabled"], [3, "click"], [3, "click", "disabled"], ["aria-label", "Math explanation", "placeholder", "I multiplied\u2026 because\u2026", "rows", "3", 3, "input", "value", "disabled"], ["role", "status", 1, "feedback"], ["placeholder", "Enter a number or fraction", 3, "input", "value", "disabled"], ["aria-label", "Measured distance per rotation", 3, "input", "value", "disabled"], ["aria-label", "Measured turn rate", 3, "input", "value", "disabled"], ["aria-label", "Measurement explanation", "rows", "3", 3, "input", "value", "disabled"]], template: function MathWorkbenchComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "h2", 1);
      \u0275\u0275text(1);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(2, MathWorkbenchComponent_Conditional_2_Template, 12, 5, "div", 2);
      \u0275\u0275conditionalCreate(3, MathWorkbenchComponent_Conditional_3_Template, 7, 6, "details", 3);
      \u0275\u0275conditionalCreate(4, MathWorkbenchComponent_Conditional_4_Template, 34, 14);
      \u0275\u0275domElementStart(5, "details", 4)(6, "summary");
      \u0275\u0275text(7, "Measurements & saved work");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "details", 5)(9, "summary");
      \u0275\u0275text(10);
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(11, MathWorkbenchComponent_For_12_Template, 9, 6, "article", null, _forTrack05, false, MathWorkbenchComponent_ForEmpty_13_Template, 2, 0, "p");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(14, "details", 6, 0)(16, "summary");
      \u0275\u0275text(17, "Robot calibration notebook");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(18, "h3", 1);
      \u0275\u0275text(19);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(20, MathWorkbenchComponent_Conditional_20_Template, 8, 3)(21, MathWorkbenchComponent_Conditional_21_Template, 3, 2, "label")(22, MathWorkbenchComponent_Conditional_22_Template, 3, 2, "label");
      \u0275\u0275domElementStart(23, "div", 7);
      \u0275\u0275conditionalCreate(24, MathWorkbenchComponent_Conditional_24_Template, 2, 0, "button");
      \u0275\u0275conditionalCreate(25, MathWorkbenchComponent_Conditional_25_Template, 2, 0, "button")(26, MathWorkbenchComponent_Conditional_26_Template, 2, 0, "button");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.runtime.sample ? "Saved calculations" : ctx.step() === "observe" ? "What did you notice?" : ctx.step() === "calculate" ? "What number will you try next?" : "Why does your calculation work?", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.runtime.sample ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_3_0 = ctx.selectedEvidence()) ? 3 : -1, tmp_3_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.runtime.sample ? 4 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275domProperty("open", ctx.runtime.sample);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Saved calculations (", ctx.runtime.state().math.length, ")");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.runtime.state().math);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1(" ", ctx.calibrationStep() === 0 ? "How far does one rotation move the robot?" : ctx.calibrationStep() === 1 ? "How far does it turn in one second?" : "Why might your measurement differ?", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.calibrationStep() === 0 ? 20 : ctx.calibrationStep() === 1 ? 21 : 22);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.calibrationStep() > 0 ? 24 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.calibrationStep() < 2 ? 25 : 26);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n[hidden][_ngcontent-%COMP%] {\n  display: none !important;\n}\n.step-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 16px;\n}\n.observation[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.6;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \nsummary[_ngcontent-%COMP%] {\n  min-height: 44px;\n}\nsmall[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 1.6px;\n  color: #62707f;\n  font-weight: 800;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin: 3px 0;\n}\n.intro[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.6;\n  color: #546b79;\n}\nlabel[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 650;\n  display: block;\n  margin-top: 12px;\n  color: #4b6574;\n}\ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n  font-size: 12px;\n  box-sizing: border-box;\n  width: 100%;\n  min-width: 0;\n  padding: 9px;\n  border-radius: 6px;\n  border: 1px solid #bdced4;\n  background: #fff;\n  color: #183748;\n  margin-top: 5px;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.formula[_ngcontent-%COMP%] {\n  padding: 10px;\n  background: #edf2fb;\n  border-radius: 6px;\n  color: #465b7b;\n  font-size: 12px;\n  line-height: 1.6;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  font-size: 11px;\n  padding: 9px;\n  border: 1px solid #b7cdd1;\n  border-radius: 6px;\n  cursor: pointer;\n  background: #fff;\n  color: #17626b;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #137c7b;\n  color: white;\n  border: 0;\n  margin-top: 14px;\n  width: 100%;\n  font-weight: 700;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.feedback[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9c4d28;\n}\n.result[_ngcontent-%COMP%] {\n  font-size: 12px;\n  border-left: 3px solid #d59036;\n  background: #fff3df;\n  padding: 12px;\n}\n.result.correct[_ngcontent-%COMP%] {\n  background: #e8f6ec;\n  border-color: #318357;\n}\n.result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0;\n}\ndetails[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  font-size: 12px;\n}\nsummary[_ngcontent-%COMP%] {\n  font-weight: 700;\n  cursor: pointer;\n  color: #294e60;\n}\narticle[_ngcontent-%COMP%] {\n  padding: 10px 0;\n  border-bottom: 1px solid #dbe6e9;\n  line-height: 1.6;\n}\narticle[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0;\n}\n.calibration[_ngcontent-%COMP%] {\n  line-height: 1.6;\n}\ninput[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nbutton[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #dda039;\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=math-workbench.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MathWorkbenchComponent, [{
    type: Component,
    args: [{ selector: "app-math-workbench", template: `
    <h2 tabindex="-1">
      {{
        runtime.sample
          ? 'Saved calculations'
          : step() === 'observe'
            ? 'What did you notice?'
            : step() === 'calculate'
              ? 'What number will you try next?'
              : 'Why does your calculation work?'
      }}
    </h2>
    @if (!runtime.sample) {
      <div class="observation" [hidden]="step() !== 'observe'">
        @if (runtime.observedTrial(); as trial) {
          <p>
            Observed run: {{ format(trial.distanceCm) }} cm travelled. {{ trial.stoppedReason }}.
          </p>
        }
        <details>
          <summary>Need a clue?</summary>
          <p>
            {{
              runtime.challenge().discovery?.reasoningPrompt ??
                'Which command first took the robot away from your plan? Should its number increase or decrease? Use the course measurements and trial results to explain a new estimate.'
            }}
          </p>
        </details>
        <label
          >My observation<textarea
            aria-label="My observation"
            rows="2"
            placeholder="The robot\u2026 so my next number should\u2026"
            [value]="runtime.draft().diagnosis"
            (input)="runtime.updateDraft({ diagnosis: $any($event.target).value })"
          ></textarea>
        </label>
        <button
          class="primary"
          [disabled]="!runtime.draft().diagnosis.trim()"
          (click)="go('calculate')"
        >
          Continue
        </button>
      </div>
    }
    @if (selectedEvidence(); as selected) {
      <details class="result" [class.correct]="selected.status === 'correct'">
        <summary>Linked calculation</summary>
        <p>{{ title(selected.tool) }} \xB7 {{ format(selected.answer) }} {{ selected.unit }}</p>
        <p>{{ selected.explanation }}</p>
      </details>
    }
    @if (!runtime.sample) {
      <div [hidden]="step() !== 'calculate'">
        <label
          >Calculation<select
            aria-label="Math calculation"
            [value]="toolId()"
            (change)="choose($any($event.target).value)"
          >
            @for (tool of tools; track tool.id) {
              <option [value]="tool.id" [selected]="tool.id === toolId()">{{ tool.title }}</option>
            }
          </select></label
        >
        <details>
          <summary>Need a math hint?</summary>
          <p class="formula">{{ tool().formula }}</p>
          <p>{{ runtime.challenge().hint }}</p>
        </details>
        @for (label of tool().inputs; track $index; let i = $index) {
          <label
            >{{ label
            }}<input
              [attr.aria-label]="label"
              placeholder="Enter a number or fraction"
              [value]="values().at(i) ?? ''"
              (input)="setValue(i, $any($event.target).value)"
              [disabled]="runtime.sample"
          /></label>
        }
        <label
          >Your answer ({{ tool().unit }})<input
            aria-label="Your math answer"
            placeholder="Calculate before checking"
            [value]="answer()"
            (input)="answer.set($any($event.target).value); result.set(undefined)"
            [disabled]="runtime.sample"
        /></label>
        <div class="step-actions">
          <button (click)="go('observe')">Back</button>
          <button [disabled]="!calculationReady()" (click)="go('explain')">Continue</button>
        </div>
      </div>
      <div [hidden]="step() !== 'explain'">
        <label
          >Explain your thinking<textarea
            aria-label="Math explanation"
            placeholder="I multiplied\u2026 because\u2026"
            rows="3"
            [value]="explanation()"
            (input)="explanation.set($any($event.target).value); result.set(undefined)"
            [disabled]="runtime.sample"
          ></textarea>
        </label>
        <button (click)="go('calculate')">Back</button>
        <button class="primary" [disabled]="runtime.sample" (click)="check()">
          Check & save calculation
        </button>
        <p class="feedback" role="status">{{ feedback() }}</p>
        @if (result(); as evidence) {
          <div class="result" [class.correct]="evidence.status === 'correct'">
            <strong>{{
              evidence.status === 'correct' ? '\u2713 Calculation supported' : 'Revise your calculation'
            }}</strong>
            @if (evidence.status === 'needs-revision') {
              <p>
                Check which quantities you used, their units, and the operation. Use the hint if you
                need another starting point, then try your own calculation again.
              </p>
            }
            <p>Your answer: {{ format(evidence.answer) }} {{ evidence.unit }}</p>
            @if (
              evidence.status === 'correct' &&
              runtime.selectedCommand() &&
              runtime.canEdit() &&
              allowLink()
            ) {
              <button (click)="link(evidence.id)">Link to selected command</button>
            }
          </div>
        }
      </div>
    }
    <details class="reference-notebooks">
      <summary>Measurements & saved work</summary>
      <details class="evidence" [open]="runtime.sample">
        <summary>Saved calculations ({{ runtime.state().math.length }})</summary>
        @for (evidence of runtime.state().math; track evidence.id) {
          <article>
            <strong>{{ title(evidence.tool) }}</strong>
            <p>
              {{ format(evidence.answer) }} {{ evidence.unit }} \xB7
              {{ evidence.status === 'correct' ? 'Checked' : 'Needs revision' }}
            </p>
            <p>{{ evidence.explanation }}</p>
            <button
              [disabled]="
                evidence.status !== 'correct' ||
                !runtime.selectedCommand() ||
                !runtime.canEdit() ||
                !allowLink()
              "
              (click)="link(evidence.id)"
            >
              Link to selected command
            </button>
          </article>
        } @empty {
          <p>Your calculations will appear here, including revisions.</p>
        }
      </details>
      <details class="calibration" #calibration>
        <summary>Robot calibration notebook</summary>
        <h3 tabindex="-1">
          {{
            calibrationStep() === 0
              ? 'How far does one rotation move the robot?'
              : calibrationStep() === 1
                ? 'How far does it turn in one second?'
                : 'Why might your measurement differ?'
          }}
        </h3>
        @if (calibrationStep() === 0) {
          <label
            >Measured distance per rotation (cm)<input
              aria-label="Measured distance per rotation"
              [value]="runtime.state().measuredDistancePerRotation"
              (input)="
                runtime.updateCalibration('measuredDistancePerRotation', $any($event.target).value)
              "
              [disabled]="runtime.sample"
          /></label>
          <details>
            <summary>Measurement clue</summary>
            <p>
              Wheel diameter: {{ runtime.config.robot.wheelDiameterCm }} cm. Use \u03C0 = 3.14. Test one
              rotation and compare its measured distance.
            </p>
          </details>
        } @else if (calibrationStep() === 1) {
          <label
            >Measured turn rate (\xB0/second)<input
              aria-label="Measured turn rate"
              [value]="runtime.state().measuredTurnRate"
              (input)="runtime.updateCalibration('measuredTurnRate', $any($event.target).value)"
              [disabled]="runtime.sample"
          /></label>
        } @else {
          <label
            >Your explanation<textarea
              aria-label="Measurement explanation"
              rows="3"
              [value]="runtime.state().measurementExplanation"
              (input)="
                runtime.updateCalibration('measurementExplanation', $any($event.target).value)
              "
              [disabled]="runtime.sample"
            ></textarea>
          </label>
        }
        <div class="step-actions">
          @if (calibrationStep() > 0) {
            <button (click)="goCalibration(calibrationStep() - 1)">Back</button>
          }
          @if (calibrationStep() < 2) {
            <button (click)="goCalibration(calibrationStep() + 1)">Continue</button>
          } @else {
            <button
              (click)="calibration.open = false; calibration.querySelector('summary')?.focus()"
            >
              Done
            </button>
          }
        </div>
      </details>
    </details>
  `, styles: ["/* angular:styles/component:scss;dc735ae50f4843e13f5b1535f87290903f97ed0074576e8a9afdb36a72cfcf2d;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/programming-automation/ui/math-workbench.component.ts */\n:host {\n  display: block;\n}\n[hidden] {\n  display: none !important;\n}\n.step-actions {\n  display: flex;\n  gap: 10px;\n  margin-top: 16px;\n}\n.observation p {\n  font-size: 14px;\n  line-height: 1.6;\n}\nbutton,\ninput,\nselect,\nsummary {\n  min-height: 44px;\n}\nsmall {\n  font-size: 10px;\n  letter-spacing: 1.6px;\n  color: #62707f;\n  font-weight: 800;\n}\nh2 {\n  font-size: 18px;\n  margin: 3px 0;\n}\n.intro {\n  font-size: 12px;\n  line-height: 1.6;\n  color: #546b79;\n}\nlabel {\n  font-size: 11px;\n  font-weight: 650;\n  display: block;\n  margin-top: 12px;\n  color: #4b6574;\n}\ninput,\nselect,\ntextarea {\n  font: inherit;\n  font-size: 12px;\n  box-sizing: border-box;\n  width: 100%;\n  min-width: 0;\n  padding: 9px;\n  border-radius: 6px;\n  border: 1px solid #bdced4;\n  background: #fff;\n  color: #183748;\n  margin-top: 5px;\n}\ntextarea {\n  resize: vertical;\n}\n.formula {\n  padding: 10px;\n  background: #edf2fb;\n  border-radius: 6px;\n  color: #465b7b;\n  font-size: 12px;\n  line-height: 1.6;\n}\nbutton {\n  font: inherit;\n  font-size: 11px;\n  padding: 9px;\n  border: 1px solid #b7cdd1;\n  border-radius: 6px;\n  cursor: pointer;\n  background: #fff;\n  color: #17626b;\n}\n.primary {\n  background: #137c7b;\n  color: white;\n  border: 0;\n  margin-top: 14px;\n  width: 100%;\n  font-weight: 700;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.feedback {\n  font-size: 12px;\n  color: #9c4d28;\n}\n.result {\n  font-size: 12px;\n  border-left: 3px solid #d59036;\n  background: #fff3df;\n  padding: 12px;\n}\n.result.correct {\n  background: #e8f6ec;\n  border-color: #318357;\n}\n.result p {\n  margin: 6px 0;\n}\ndetails {\n  margin-top: 18px;\n  font-size: 12px;\n}\nsummary {\n  font-weight: 700;\n  cursor: pointer;\n  color: #294e60;\n}\narticle {\n  padding: 10px 0;\n  border-bottom: 1px solid #dbe6e9;\n  line-height: 1.6;\n}\narticle p {\n  margin: 4px 0;\n}\n.calibration {\n  line-height: 1.6;\n}\ninput:focus-visible,\nselect:focus-visible,\ntextarea:focus-visible,\nbutton:focus-visible,\nsummary:focus-visible {\n  outline: 3px solid #dda039;\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=math-workbench.component.css.map */\n"] }]
  }], () => [], { allowLink: [{ type: Input, args: [{ isSignal: true, alias: "allowLink", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MathWorkbenchComponent, { className: "MathWorkbenchComponent", filePath: "src/app/templates/programming-automation/ui/math-workbench.component.ts", lineNumber: 386 });
})();

// src/app/templates/programming-automation/ui/automation-evidence.component.ts
var _c05 = () => [];
var _c13 = () => [0, 1];
var _forTrack06 = ($index, $item) => $item.id;
var _forTrack14 = ($index, $item) => $item.key;
var _forTrack2 = ($index, $item) => $item.title;
function AutomationEvidenceComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 6);
    \u0275\u0275listener("click", function AutomationEvidenceComponent_Conditional_3_Template_button_click_2_listener() {
      const trial_r2 = \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.replay.emit(trial_r2));
    });
    \u0275\u0275text(3, "\u25B6 Replay this run");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Recorded run \xB7 ", ctx.distanceCm.toFixed(1), " cm travelled");
  }
}
function AutomationEvidenceComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Run your program to collect evidence.");
    \u0275\u0275elementEnd();
  }
}
function AutomationEvidenceComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article")(1, "div")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 6);
    \u0275\u0275listener("click", function AutomationEvidenceComponent_For_10_Template_button_click_6_listener() {
      const trial_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.replay.emit(trial_r5));
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trial_r5 = ctx.$implicit;
    const \u0275$index_25_r6 = ctx.$index;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Trial ", \u0275$index_25_r6 + 1, " \xB7 ", trial_r5.completedMission ? "Mission complete" : "Keep testing");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("v", trial_r5.version.program.version, " \xB7 ", trial_r5.stoppingErrorCm.toFixed(1), " cm from target");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Replay trial ", \u0275$index_25_r6 + 1);
  }
}
function AutomationEvidenceComponent_ForEmpty_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No trials yet.");
    \u0275\u0275elementEnd();
  }
}
function AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_2_For_2_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trial_r11 = ctx.$implicit;
    const \u0275$index_59_r12 = ctx.$index;
    const side_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("value", trial_r11.id)("selected", trial_r11.id === ctx_r2.comparison()[side_r10]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Trial ", \u0275$index_59_r12 + 1, " \xB7 v", trial_r11.version.program.version, " ");
  }
}
function AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "select", 11);
    \u0275\u0275listener("change", function AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_2_For_2_Template_select_change_2_listener($event) {
      const side_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.selectComparison(side_r10, $event.target.value));
    });
    \u0275\u0275repeaterCreate(3, AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_2_For_2_For_4_Template, 2, 4, "option", 12, _forTrack06);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const side_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Trial ", side_r10 === 0 ? "A" : "B");
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.comparison()[side_r10]);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.runtime.currentTrials());
  }
}
function AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_2_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th");
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
    const metric_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(metric_r13.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.metricValue(ctx_r2.compared()[0], metric_r13.key));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.metricValue(ctx_r2.compared()[1], metric_r13.key));
  }
}
function AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_2_For_2_Template, 5, 2, "label", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table")(4, "caption");
    \u0275\u0275text(5, " Run comparison ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "Measure");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "B");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_2_For_16_Template, 7, 3, "tr", null, _forTrack14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "label");
    \u0275\u0275text(18, "Your explanation");
    \u0275\u0275elementStart(19, "textarea", 10);
    \u0275\u0275listener("input", function AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_2_Template_textarea_input_19_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.updateDraft({ reflection: $event.target.value }));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(2, _c13));
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r2.metrics.slice(0, 3));
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.runtime.draft().reflection)("disabled", !ctx_r2.runtime.canEdit());
  }
}
function AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Your observation");
    \u0275\u0275elementStart(2, "textarea", 13);
    \u0275\u0275listener("input", function AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_3_Template_textarea_input_2_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.updateDraft({ diagnosis: $event.target.value }));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r2.runtime.draft().diagnosis)("disabled", !ctx_r2.runtime.canEdit());
  }
}
function AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_9_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th");
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
    const metric_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(metric_r16.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.metricValue(ctx_r2.compared()[0], metric_r16.key));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.metricValue(ctx_r2.compared()[1], metric_r16.key));
  }
}
function AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "table")(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Measure");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "B");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275repeaterCreate(10, AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_9_For_11_Template, 7, 3, "tr", null, _forTrack14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "label");
    \u0275\u0275text(13, "Earlier observation");
    \u0275\u0275elementStart(14, "textarea", 14);
    \u0275\u0275listener("input", function AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_9_Template_textarea_input_14_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.updateDraft({ diagnosis: $event.target.value }));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r2.metrics.slice(3));
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.runtime.draft().diagnosis)("disabled", !ctx_r2.runtime.canEdit());
  }
}
function AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Testing explanation");
    \u0275\u0275elementStart(2, "textarea", 14);
    \u0275\u0275listener("input", function AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_10_Template_textarea_input_2_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.updateDraft({ reflection: $event.target.value }));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r2.runtime.draft().reflection)("disabled", !ctx_r2.runtime.canEdit());
  }
}
function AutomationEvidenceComponent_Conditional_13_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_2_Template, 20, 3)(3, AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_3_Template, 3, 2, "label");
    \u0275\u0275elementStart(4, "button", 8);
    \u0275\u0275listener("click", function AutomationEvidenceComponent_Conditional_13_Conditional_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.go("review"));
    });
    \u0275\u0275text(5, "Review mission");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "details")(7, "summary");
    \u0275\u0275text(8, "More evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_9_Template, 15, 2)(10, AutomationEvidenceComponent_Conditional_13_Conditional_0_Conditional_10_Template, 3, 2, "label");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.currentTrials().length >= 2 ? "What changed between your runs?" : "What happened in your run?", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.currentTrials().length >= 2 ? 2 : 3);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r2.runtime.currentTrials().length >= 2 ? 9 : 10);
  }
}
function AutomationEvidenceComponent_Conditional_13_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const problem_r19 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(problem_r19);
  }
}
function AutomationEvidenceComponent_Conditional_13_Conditional_1_ForEmpty_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1, "Your code, test and explanation are ready.");
    \u0275\u0275elementEnd();
  }
}
function AutomationEvidenceComponent_Conditional_13_Conditional_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function AutomationEvidenceComponent_Conditional_13_Conditional_1_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.completeChallenge());
    });
    \u0275\u0275text(1, " Save completed mission ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r2.runtime.readiness().length > 0 || !ctx_r2.runtime.canEdit());
  }
}
function AutomationEvidenceComponent_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ul", 15);
    \u0275\u0275repeaterCreate(3, AutomationEvidenceComponent_Conditional_13_Conditional_1_For_4_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity, false, AutomationEvidenceComponent_Conditional_13_Conditional_1_ForEmpty_5_Template, 2, 0, "li");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 16)(7, "button", 6);
    \u0275\u0275listener("click", function AutomationEvidenceComponent_Conditional_13_Conditional_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.go("explain"));
    });
    \u0275\u0275text(8, "Back");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, AutomationEvidenceComponent_Conditional_13_Conditional_1_Conditional_9_Template, 2, 1, "button", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.draft().completedAt ? "Mission saved" : "Is your evidence ready?", " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.runtime.readiness());
    \u0275\u0275advance(6);
    \u0275\u0275conditional(!ctx_r2.runtime.draft().completedAt ? 9 : -1);
  }
}
function AutomationEvidenceComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AutomationEvidenceComponent_Conditional_13_Conditional_0_Template, 11, 3)(1, AutomationEvidenceComponent_Conditional_13_Conditional_1_Template, 10, 3);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.step() === "explain" ? 0 : 1);
  }
}
function AutomationEvidenceComponent_Conditional_14_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const command_r22 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4(" ", ctx_r2.labels[command_r22.type], " ", ctx_r2.expression(command_r22), " ", command_r22.packageId ?? "", " ", command_r22.disabled ? "(disabled)" : "", " ");
  }
}
function AutomationEvidenceComponent_Conditional_14_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const skill_r23 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", skill_r23.achieved ? "\u2713" : "\u25CB", " ", skill_r23.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(skill_r23.achieved ? "Evidence recorded" : "Evidence needed");
  }
}
function AutomationEvidenceComponent_Conditional_14_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const evidence_r24 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", evidence_r24.tool, ": ", evidence_r24.answer, " ", evidence_r24.unit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", evidence_r24.status, " \xB7 ", evidence_r24.explanation);
  }
}
function AutomationEvidenceComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 7);
    \u0275\u0275text(1, "How does your evidence support your design?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "label");
    \u0275\u0275text(3, "Your final defense");
    \u0275\u0275elementStart(4, "textarea", 19);
    \u0275\u0275listener("input", function AutomationEvidenceComponent_Conditional_14_Template_textarea_input_4_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.updateCalibration("defense", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 8);
    \u0275\u0275listener("click", function AutomationEvidenceComponent_Conditional_14_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.download());
    });
    \u0275\u0275text(6, "Download portfolio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "details")(8, "summary");
    \u0275\u0275text(9, "Your collected evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "h3");
    \u0275\u0275text(15, "Testing explanation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "h3");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "ol");
    \u0275\u0275repeaterCreate(21, AutomationEvidenceComponent_Conditional_14_For_22_Template, 2, 4, "li", null, _forTrack06);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "h3");
    \u0275\u0275text(24, "Math evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "ul", 20);
    \u0275\u0275repeaterCreate(26, AutomationEvidenceComponent_Conditional_14_For_27_Template, 4, 3, "li", null, _forTrack2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p");
    \u0275\u0275text(29, "Robot performance and academic reasoning are assessed separately.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "h3");
    \u0275\u0275text(31, "Calibration");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p");
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "h3");
    \u0275\u0275text(37, "Calculations");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(38, AutomationEvidenceComponent_Conditional_14_For_39_Template, 5, 5, "article", null, _forTrack06);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.runtime.state().defense)("disabled", ctx_r2.runtime.sample);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("", ctx_r2.runtime.session.actorDisplayName, " \xB7 ", ctx_r2.runtime.config.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", ctx_r2.runtime.state().trials.length, " trials \xB7 ", ctx_r2.runtime.state().math.length, " calculations \xB7 ", ctx_r2.runtime.state().versions.length, " locked versions ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.runtime.draft().reflection || "No explanation recorded yet.");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Current program \xB7 v", ctx_r2.runtime.draft().program.version);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.flatProgram());
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.runtime.mastery());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2(" ", ctx_r2.runtime.state().measuredDistancePerRotation || "\u2014", " cm/rotation \xB7 ", ctx_r2.runtime.state().measuredTurnRate || "\u2014", " \xB0/s ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.state().measurementExplanation || "No measurement explanation recorded.", " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.runtime.state().math);
  }
}
var AutomationEvidenceComponent = class _AutomationEvidenceComponent {
  runtime = inject(AutomationRuntimeService);
  replay = output();
  view = input(
    "trials",
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  step = signal(
    "explain",
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  element = inject(ElementRef);
  injector = inject(Injector);
  shownTrial = computed(
    () => this.compared()[1] ?? this.compared()[0] ?? this.runtime.currentTrials().at(-1),
    ...ngDevMode ? [{ debugName: "shownTrial" }] : (
      /* istanbul ignore next */
      []
    )
  );
  shownCourse = computed(
    () => this.shownTrial()?.version.course ?? this.runtime.course(),
    ...ngDevMode ? [{ debugName: "shownCourse" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      this.runtime.challenge().id;
      this.view();
      this.step.set("explain");
      this.selected.set([]);
    });
  }
  go(step) {
    this.step.set(step);
    afterNextRender(() => {
      const heading = this.element.nativeElement.querySelector(".question-card h2");
      heading?.scrollIntoView({ block: "nearest" });
      heading?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  selected = signal(
    [],
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  labels = commandLabels;
  expression = commandExpression;
  flatProgram = computed(
    () => allCommands(this.runtime.draft().program.commands),
    ...ngDevMode ? [{ debugName: "flatProgram" }] : (
      /* istanbul ignore next */
      []
    )
  );
  comparison = computed(
    () => {
      const all = this.runtime.currentTrials();
      const practice = all.filter((trial) => trial.mode === "practice");
      const trials = practice.length >= 2 ? practice : all;
      return [
        this.selected()[0] ?? trials.at(-2)?.id ?? "",
        this.selected()[1] ?? trials.at(-1)?.id ?? ""
      ];
    },
    ...ngDevMode ? [{ debugName: "comparison" }] : (
      /* istanbul ignore next */
      []
    )
  );
  compared = computed(
    () => this.comparison().map((id) => this.runtime.currentTrials().find((trial) => trial.id === id)),
    ...ngDevMode ? [{ debugName: "compared" }] : (
      /* istanbul ignore next */
      []
    )
  );
  metrics = [
    { key: "elapsedSeconds", label: "Time (s)" },
    { key: "distanceCm", label: "Distance (cm)" },
    { key: "stoppingErrorCm", label: "Parking error (cm)" },
    { key: "collisions", label: "Collisions" },
    { key: "deliveriesCompleted", label: "Deliveries" },
    { key: "batteryUsed", label: "Battery used" },
    { key: "score", label: "Performance / 100" }
  ];
  selectComparison(side, id) {
    const ids = [...this.comparison()];
    ids[side] = id;
    this.selected.set(ids);
  }
  metricValue(trial, key) {
    return trial ? trial[key].toFixed(1) : "\u2014";
  }
  download() {
    const payload = __spreadValues({
      title: this.runtime.config.title,
      student: this.runtime.session.actorDisplayName,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      mastery: this.runtime.mastery()
    }, this.runtime.state());
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${this.runtime.config.projectId}-portfolio.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  static \u0275fac = function AutomationEvidenceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AutomationEvidenceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AutomationEvidenceComponent, selectors: [["app-automation-evidence"]], inputs: { view: [1, "view"] }, outputs: { replay: "replay" }, decls: 15, vars: 13, consts: [[1, "review-layout"], ["aria-label", "Recorded robot evidence", 1, "visual-panel"], [3, "course", "robotRadiusCm", "targetIndex", "sample", "samples", "events", "result"], [1, "visual-caption"], [1, "trial-list"], [1, "question-card"], [3, "click"], ["tabindex", "-1"], [1, "primary", 3, "click"], [1, "compare-select"], ["aria-label", "Trial comparison explanation", "rows", "4", "placeholder", "I changed\u2026 The two runs show\u2026", 3, "input", "value", "disabled"], [3, "change", "value"], [3, "value", "selected"], ["aria-label", "Trial observation", "rows", "4", "placeholder", "The robot\u2026 Next I will\u2026", 3, "input", "value", "disabled"], ["rows", "3", 3, "input", "value", "disabled"], [1, "readiness"], [1, "actions"], [1, "primary", 3, "disabled"], [1, "primary", 3, "click", "disabled"], ["aria-label", "Final engineering defense", "rows", "6", "placeholder", "My design works because\u2026 My tests show\u2026", 3, "input", "value", "disabled"], [1, "mastery"]], template: function AutomationEvidenceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "section", 1);
      \u0275\u0275element(2, "app-robot-course", 2);
      \u0275\u0275conditionalCreate(3, AutomationEvidenceComponent_Conditional_3_Template, 4, 1)(4, AutomationEvidenceComponent_Conditional_4_Template, 2, 0, "p", 3);
      \u0275\u0275elementStart(5, "details")(6, "summary");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 4);
      \u0275\u0275repeaterCreate(9, AutomationEvidenceComponent_For_10_Template, 8, 5, "article", null, _forTrack06, false, AutomationEvidenceComponent_ForEmpty_11_Template, 2, 0, "p");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "section", 5);
      \u0275\u0275conditionalCreate(13, AutomationEvidenceComponent_Conditional_13_Template, 2, 1)(14, AutomationEvidenceComponent_Conditional_14_Template, 40, 12);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_7_0;
      \u0275\u0275advance(2);
      \u0275\u0275property("course", ctx.shownCourse())("robotRadiusCm", ctx.shownTrial()?.version?.robot?.radiusCm ?? ctx.runtime.config.robot.radiusCm)("targetIndex", ctx.shownTrial()?.version?.targetIndex ?? ctx.runtime.draft().targetIndex)("sample", ctx.shownTrial()?.pathSamples?.at(-1))("samples", ctx.shownTrial()?.pathSamples ?? \u0275\u0275pureFunction0(11, _c05))("events", ctx.shownTrial()?.events ?? \u0275\u0275pureFunction0(12, _c05))("result", ctx.shownTrial());
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_7_0 = ctx.shownTrial()) ? 3 : 4, tmp_7_0);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("All recorded trials (", ctx.runtime.currentTrials().length, ")");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.runtime.currentTrials());
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.view() === "trials" ? 13 : 14);
    }
  }, dependencies: [RobotCourseComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #203e36;\n  font:\n    14px/1.5 Inter,\n    system-ui,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n[hidden][_ngcontent-%COMP%] {\n  display: none !important;\n}\n.review-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 1fr);\n  gap: 32px;\n  align-items: start;\n}\n.visual-panel[_ngcontent-%COMP%] {\n  min-width: 0;\n  color: #d7e6df;\n}\n.visual-caption[_ngcontent-%COMP%] {\n  color: #c2d7cc;\n  font-size: 13px;\n  margin: 12px 0;\n}\n.question-card[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 28px;\n  border-radius: 16px;\n  background: #eef0e7;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: clamp(22px, 2.1vw, 29px);\n  line-height: 1.3;\n  letter-spacing: -0.4px;\n  margin: 0 0 24px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin: 20px 0 8px;\n}\np[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n  color: #203e36;\n  border: 1px solid #acbdb5;\n  border-radius: 8px;\n  background: #fff;\n  padding: 10px 14px;\n  min-height: 44px;\n}\nbutton[_ngcontent-%COMP%], \nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n  opacity: 0.45;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #e6bb6e;\n  border-color: #d7a753;\n  color: #202e29;\n  font-weight: 750;\n}\n.question-card[_ngcontent-%COMP%]    > .primary[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 12px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  margin: 16px 0;\n}\nlabel[_ngcontent-%COMP%]   :is(input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]) {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  margin-top: 7px;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-top: 20px;\n}\n.actions[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%] {\n  flex: 1 1 150px;\n}\ndetails[_ngcontent-%COMP%] {\n  margin-top: 14px;\n}\nsummary[_ngcontent-%COMP%] {\n  padding: 12px 0;\n  font-size: 13px;\n  min-height: 44px;\n}\ndetails[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \ndetails[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.compare-select[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.compare-select[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n  margin: 12px 0;\n}\ncaption[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 13px;\n  color: #496158;\n}\nth[_ngcontent-%COMP%], \ntd[_ngcontent-%COMP%] {\n  padding: 9px 5px;\n  text-align: left;\n  border-bottom: 1px solid #bdccc3;\n  overflow-wrap: anywhere;\n}\n.trial-list[_ngcontent-%COMP%] {\n  max-height: 360px;\n  overflow: auto;\n}\n.trial-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: center;\n  border-bottom: 1px solid #57746b;\n  padding: 12px 0;\n  font-size: 13px;\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  opacity: 0.85;\n}\n.readiness[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\n.readiness[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n.mastery[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n}\n.mastery[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 8px 0;\n  border-bottom: 1px solid #bdccc3;\n}\ndl[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n  font-size: 13px;\n}\ndd[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.review-support[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  color: #d7e6df;\n}\n.review-support[_ngcontent-%COMP%]    > details[_ngcontent-%COMP%] {\n  max-width: 100%;\n}\n.settings[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.settings[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.settings[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 20px;\n  min-height: 20px;\n  margin: 0;\n}\n.settings[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%] {\n  width: 90px;\n}\ndialog[_ngcontent-%COMP%] {\n  width: min(480px, calc(100vw - 32px));\n  max-height: calc(100dvh - 32px);\n  overflow: auto;\n  padding: 28px;\n  border-radius: 16px;\n  background: #eef0e7;\n  color: #203e36;\n  border: 1px solid #acbdb5;\n}\ndialog[_ngcontent-%COMP%]::backdrop {\n  background: #102a27bb;\n}\n[_ngcontent-%COMP%]:is(button, input, select, textarea, summary):focus-visible {\n  outline: 3px solid #bd790b;\n  outline-offset: 3px;\n}\n@media (max-width: 850px) {\n  .review-layout[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n    gap: 16px;\n  }\n  .question-card[_ngcontent-%COMP%] {\n    padding: 22px 16px;\n  }\n  h2[_ngcontent-%COMP%] {\n    font-size: 23px;\n  }\n  .trial-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=automation-panels.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutomationEvidenceComponent, [{
    type: Component,
    args: [{ selector: "app-automation-evidence", imports: [RobotCourseComponent], template: `<div class="review-layout">
  <section class="visual-panel" aria-label="Recorded robot evidence">
    <app-robot-course
      [course]="shownCourse()"
      [robotRadiusCm]="shownTrial()?.version?.robot?.radiusCm ?? runtime.config.robot.radiusCm"
      [targetIndex]="shownTrial()?.version?.targetIndex ?? runtime.draft().targetIndex"
      [sample]="shownTrial()?.pathSamples?.at(-1)"
      [samples]="shownTrial()?.pathSamples ?? []"
      [events]="shownTrial()?.events ?? []"
      [result]="shownTrial()"
    />
    @if (shownTrial(); as trial) {
      <p class="visual-caption">Recorded run \xB7 {{ trial.distanceCm.toFixed(1) }} cm travelled</p>
      <button (click)="replay.emit(trial)">\u25B6 Replay this run</button>
    } @else {
      <p class="visual-caption">Run your program to collect evidence.</p>
    }
    <details>
      <summary>All recorded trials ({{ runtime.currentTrials().length }})</summary>
      <div class="trial-list">
        @for (trial of runtime.currentTrials(); track trial.id; let i = $index) {
          <article>
            <div>
              <strong
                >Trial {{ i + 1 }} \xB7
                {{ trial.completedMission ? 'Mission complete' : 'Keep testing' }}</strong
              >
              <small
                >v{{ trial.version.program.version }} \xB7 {{ trial.stoppingErrorCm.toFixed(1) }} cm
                from target</small
              >
            </div>
            <button (click)="replay.emit(trial)">Replay trial {{ i + 1 }}</button>
          </article>
        } @empty {
          <p>No trials yet.</p>
        }
      </div>
    </details>
  </section>
  <section class="question-card">
    @if (view() === 'trials') {
      @if (step() === 'explain') {
        <h2 tabindex="-1">
          {{
            runtime.currentTrials().length >= 2
              ? 'What changed between your runs?'
              : 'What happened in your run?'
          }}
        </h2>
        @if (runtime.currentTrials().length >= 2) {
          <div class="compare-select">
            @for (side of [0, 1]; track side) {
              <label
                >Trial {{ side === 0 ? 'A' : 'B'
                }}<select
                  [value]="comparison()[side]"
                  (change)="selectComparison(side, $any($event.target).value)"
                >
                  @for (trial of runtime.currentTrials(); track trial.id; let i = $index) {
                    <option [value]="trial.id" [selected]="trial.id === comparison()[side]">
                      Trial {{ i + 1 }} \xB7 v{{ trial.version.program.version }}
                    </option>
                  }
                </select></label
              >
            }
          </div>
          <table>
            <caption>
              Run comparison
            </caption>
            <thead>
              <tr>
                <th>Measure</th>
                <th>A</th>
                <th>B</th>
              </tr>
            </thead>
            <tbody>
              @for (metric of metrics.slice(0, 3); track metric.key) {
                <tr>
                  <th>{{ metric.label }}</th>
                  <td>{{ metricValue(compared()[0], metric.key) }}</td>
                  <td>{{ metricValue(compared()[1], metric.key) }}</td>
                </tr>
              }
            </tbody>
          </table>
          <label
            >Your explanation<textarea
              aria-label="Trial comparison explanation"
              rows="4"
              [value]="runtime.draft().reflection"
              (input)="runtime.updateDraft({ reflection: $any($event.target).value })"
              [disabled]="!runtime.canEdit()"
              placeholder="I changed\u2026 The two runs show\u2026"
            ></textarea>
          </label>
        } @else {
          <label
            >Your observation<textarea
              aria-label="Trial observation"
              rows="4"
              [value]="runtime.draft().diagnosis"
              (input)="runtime.updateDraft({ diagnosis: $any($event.target).value })"
              [disabled]="!runtime.canEdit()"
              placeholder="The robot\u2026 Next I will\u2026"
            ></textarea>
          </label>
        }
        <button class="primary" (click)="go('review')">Review mission</button>
        <details>
          <summary>More evidence</summary>
          @if (runtime.currentTrials().length >= 2) {
            <table>
              <thead>
                <tr>
                  <th>Measure</th>
                  <th>A</th>
                  <th>B</th>
                </tr>
              </thead>
              <tbody>
                @for (metric of metrics.slice(3); track metric.key) {
                  <tr>
                    <th>{{ metric.label }}</th>
                    <td>{{ metricValue(compared()[0], metric.key) }}</td>
                    <td>{{ metricValue(compared()[1], metric.key) }}</td>
                  </tr>
                }
              </tbody>
            </table>
            <label
              >Earlier observation<textarea
                rows="3"
                [value]="runtime.draft().diagnosis"
                (input)="runtime.updateDraft({ diagnosis: $any($event.target).value })"
                [disabled]="!runtime.canEdit()"
              ></textarea>
            </label>
          } @else {
            <label
              >Testing explanation<textarea
                rows="3"
                [value]="runtime.draft().reflection"
                (input)="runtime.updateDraft({ reflection: $any($event.target).value })"
                [disabled]="!runtime.canEdit()"
              ></textarea>
            </label>
          }
        </details>
      } @else {
        <h2 tabindex="-1">
          {{ runtime.draft().completedAt ? 'Mission saved' : 'Is your evidence ready?' }}
        </h2>
        <ul class="readiness">
          @for (problem of runtime.readiness(); track problem) {
            <li>{{ problem }}</li>
          } @empty {
            <li>Your code, test and explanation are ready.</li>
          }
        </ul>
        <div class="actions">
          <button (click)="go('explain')">Back</button>
          @if (!runtime.draft().completedAt) {
            <button
              class="primary"
              [disabled]="runtime.readiness().length > 0 || !runtime.canEdit()"
              (click)="runtime.completeChallenge()"
            >
              Save completed mission
            </button>
          }
        </div>
      }
    } @else {
      <h2 tabindex="-1">How does your evidence support your design?</h2>
      <label
        >Your final defense<textarea
          aria-label="Final engineering defense"
          rows="6"
          [value]="runtime.state().defense"
          (input)="runtime.updateCalibration('defense', $any($event.target).value)"
          [disabled]="runtime.sample"
          placeholder="My design works because\u2026 My tests show\u2026"
        ></textarea>
      </label>
      <button class="primary" (click)="download()">Download portfolio</button>
      <details>
        <summary>Your collected evidence</summary>
        <p>{{ runtime.session.actorDisplayName }} \xB7 {{ runtime.config.title }}</p>
        <p>
          {{ runtime.state().trials.length }} trials \xB7
          {{ runtime.state().math.length }} calculations \xB7
          {{ runtime.state().versions.length }} locked versions
        </p>
        <h3>Testing explanation</h3>
        <p>{{ runtime.draft().reflection || 'No explanation recorded yet.' }}</p>
        <h3>Current program \xB7 v{{ runtime.draft().program.version }}</h3>
        <ol>
          @for (command of flatProgram(); track command.id) {
            <li>
              {{ labels[command.type] }} {{ expression(command) }} {{ command.packageId ?? '' }}
              {{ command.disabled ? '(disabled)' : '' }}
            </li>
          }
        </ol>
        <h3>Math evidence</h3>
        <ul class="mastery">
          @for (skill of runtime.mastery(); track skill.title) {
            <li>
              {{ skill.achieved ? '\u2713' : '\u25CB' }} {{ skill.title
              }}<small>{{ skill.achieved ? 'Evidence recorded' : 'Evidence needed' }}</small>
            </li>
          }
        </ul>
        <p>Robot performance and academic reasoning are assessed separately.</p>
        <h3>Calibration</h3>
        <p>
          {{ runtime.state().measuredDistancePerRotation || '\u2014' }} cm/rotation \xB7
          {{ runtime.state().measuredTurnRate || '\u2014' }} \xB0/s
        </p>
        <p>
          {{ runtime.state().measurementExplanation || 'No measurement explanation recorded.' }}
        </p>
        <h3>Calculations</h3>
        @for (evidence of runtime.state().math; track evidence.id) {
          <article>
            <strong>{{ evidence.tool }}: {{ evidence.answer }} {{ evidence.unit }}</strong>
            <p>{{ evidence.status }} \xB7 {{ evidence.explanation }}</p>
          </article>
        }
      </details>
    }
  </section>
</div>
`, styles: ["/* src/app/templates/programming-automation/ui/automation-panels.css */\n:host {\n  display: block;\n  color: #203e36;\n  font:\n    14px/1.5 Inter,\n    system-ui,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n[hidden] {\n  display: none !important;\n}\n.review-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 1fr);\n  gap: 32px;\n  align-items: start;\n}\n.visual-panel {\n  min-width: 0;\n  color: #d7e6df;\n}\n.visual-caption {\n  color: #c2d7cc;\n  font-size: 13px;\n  margin: 12px 0;\n}\n.question-card {\n  min-width: 0;\n  padding: 28px;\n  border-radius: 16px;\n  background: #eef0e7;\n}\nh2 {\n  font-size: clamp(22px, 2.1vw, 29px);\n  line-height: 1.3;\n  letter-spacing: -0.4px;\n  margin: 0 0 24px;\n}\nh3 {\n  font-size: 16px;\n  margin: 20px 0 8px;\n}\np {\n  margin: 12px 0;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit;\n  color: #203e36;\n  border: 1px solid #acbdb5;\n  border-radius: 8px;\n  background: #fff;\n  padding: 10px 14px;\n  min-height: 44px;\n}\nbutton,\nsummary {\n  cursor: pointer;\n}\nbutton:disabled {\n  cursor: default;\n  opacity: 0.45;\n}\n.primary {\n  background: #e6bb6e;\n  border-color: #d7a753;\n  color: #202e29;\n  font-weight: 750;\n}\n.question-card > .primary {\n  width: 100%;\n  margin-top: 12px;\n}\nlabel {\n  display: block;\n  font-size: 14px;\n  margin: 16px 0;\n}\nlabel :is(input, select, textarea) {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  margin-top: 7px;\n}\ntextarea {\n  resize: vertical;\n}\n.actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-top: 20px;\n}\n.actions .primary {\n  flex: 1 1 150px;\n}\ndetails {\n  margin-top: 14px;\n}\nsummary {\n  padding: 12px 0;\n  font-size: 13px;\n  min-height: 44px;\n}\ndetails p,\ndetails li {\n  font-size: 13px;\n}\n.compare-select {\n  display: flex;\n  gap: 12px;\n}\n.compare-select label {\n  flex: 1;\n  min-width: 0;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n  margin: 12px 0;\n}\ncaption {\n  text-align: left;\n  font-size: 13px;\n  color: #496158;\n}\nth,\ntd {\n  padding: 9px 5px;\n  text-align: left;\n  border-bottom: 1px solid #bdccc3;\n  overflow-wrap: anywhere;\n}\n.trial-list {\n  max-height: 360px;\n  overflow: auto;\n}\n.trial-list article {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: center;\n  border-bottom: 1px solid #57746b;\n  padding: 12px 0;\n  font-size: 13px;\n}\nsmall {\n  display: block;\n  font-size: 12px;\n  opacity: 0.85;\n}\n.readiness {\n  padding-left: 20px;\n}\n.readiness li {\n  margin: 12px 0;\n}\n.mastery {\n  list-style: none;\n  padding: 0;\n}\n.mastery li {\n  padding: 8px 0;\n  border-bottom: 1px solid #bdccc3;\n}\ndl {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n  font-size: 13px;\n}\ndd {\n  margin: 0;\n}\n.review-support {\n  margin-top: 20px;\n  color: #d7e6df;\n}\n.review-support > details {\n  max-width: 100%;\n}\n.settings {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.settings label {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.settings input[type=checkbox] {\n  width: 20px;\n  min-height: 20px;\n  margin: 0;\n}\n.settings input[type=number] {\n  width: 90px;\n}\ndialog {\n  width: min(480px, calc(100vw - 32px));\n  max-height: calc(100dvh - 32px);\n  overflow: auto;\n  padding: 28px;\n  border-radius: 16px;\n  background: #eef0e7;\n  color: #203e36;\n  border: 1px solid #acbdb5;\n}\ndialog::backdrop {\n  background: #102a27bb;\n}\n:is(button, input, select, textarea, summary):focus-visible {\n  outline: 3px solid #bd790b;\n  outline-offset: 3px;\n}\n@media (max-width: 850px) {\n  .review-layout {\n    grid-template-columns: minmax(0, 1fr);\n    gap: 16px;\n  }\n  .question-card {\n    padding: 22px 16px;\n  }\n  h2 {\n    font-size: 23px;\n  }\n  .trial-list article {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=automation-panels.css.map */\n"] }]
  }], () => [], { replay: [{ type: Output, args: ["replay"] }], view: [{ type: Input, args: [{ isSignal: true, alias: "view", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AutomationEvidenceComponent, { className: "AutomationEvidenceComponent", filePath: "src/app/templates/programming-automation/ui/automation-evidence.component.ts", lineNumber: 25 });
})();

// src/app/templates/programming-automation/ui/championship-panel.component.ts
var _c06 = () => [];
var _forTrack07 = ($index, $item) => $item.key;
var _forTrack15 = ($index, $item) => $item.id;
function ChampionshipPanelComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function ChampionshipPanelComponent_Conditional_5_Template_button_click_0_listener() {
      const trial_r3 = \u0275\u0275restoreView(_r2);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.replay.emit(trial_r3));
    });
    \u0275\u0275text(1, "\u25B6 Replay final run");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipPanelComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 12);
    \u0275\u0275text(1, "Your teacher will reveal the final course.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Keep testing your program while you wait.");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipPanelComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 12);
    \u0275\u0275text(1, "How will you complete the final route?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 13);
    \u0275\u0275listener("click", function ChampionshipPanelComponent_Conditional_10_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.begin());
    });
    \u0275\u0275text(5, "Plan the final run");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.finalChallenge().mission);
  }
}
function ChampionshipPanelComponent_Conditional_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.finalTrial() ? ctx_r3.runtime.sample ? "Review the recorded run and its saved defense." : "Review your recorded run and explain your design in the final defense." : "Your recorded version is in the launch queue.", " ");
  }
}
function ChampionshipPanelComponent_Conditional_11_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const problem_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(problem_r6);
  }
}
function ChampionshipPanelComponent_Conditional_11_Conditional_3_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1, "Your evidence is ready.");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipPanelComponent_Conditional_11_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 15);
    \u0275\u0275repeaterCreate(1, ChampionshipPanelComponent_Conditional_11_Conditional_3_For_2_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity, false, ChampionshipPanelComponent_Conditional_11_Conditional_3_ForEmpty_3_Template, 2, 0, "li");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Locking keeps this exact code and evidence for the final run.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.runtime.readiness());
  }
}
function ChampionshipPanelComponent_Conditional_11_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(field_r7.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.draft().prediction[field_r7.key] || "Not recorded");
  }
}
function ChampionshipPanelComponent_Conditional_11_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "button", 6);
    \u0275\u0275listener("click", function ChampionshipPanelComponent_Conditional_11_Conditional_12_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.go(0));
    });
    \u0275\u0275text(2, "Edit predictions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 16);
    \u0275\u0275listener("click", function ChampionshipPanelComponent_Conditional_11_Conditional_12_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r8);
      \u0275\u0275nextContext(2);
      const lockDialog_r9 = \u0275\u0275reference(26);
      return \u0275\u0275resetView(lockDialog_r9.showModal());
    });
    \u0275\u0275text(4, " Review & lock program ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r3.runtime.sample || ctx_r3.runtime.readiness().length > 0 || ctx_r3.runtime.state().championship.finalized);
  }
}
function ChampionshipPanelComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, ChampionshipPanelComponent_Conditional_11_Conditional_2_Template, 2, 1, "p", 14)(3, ChampionshipPanelComponent_Conditional_11_Conditional_3_Template, 6, 1);
    \u0275\u0275elementStart(4, "details")(5, "summary");
    \u0275\u0275text(6, "Your predictions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "dl");
    \u0275\u0275repeaterCreate(10, ChampionshipPanelComponent_Conditional_11_For_11_Template, 4, 2, null, null, _forTrack07);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, ChampionshipPanelComponent_Conditional_11_Conditional_12_Template, 5, 1, "div", 11);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.runtime.draft().lockedVersionId ? ctx_r3.finalTrial() ? "Your final run is recorded" : "Your program is locked" : "Ready for your final run?", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.runtime.draft().lockedVersionId ? 2 : 3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r3.runtime.draft().prediction.route);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.predictionFields);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r3.runtime.draft().lockedVersionId ? 12 : -1);
  }
}
function ChampionshipPanelComponent_Conditional_12_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 12);
    \u0275\u0275text(1, "What route will your robot follow?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "label");
    \u0275\u0275text(3, "Your route");
    \u0275\u0275elementStart(4, "textarea", 17);
    \u0275\u0275listener("input", function ChampionshipPanelComponent_Conditional_12_Conditional_0_Template_textarea_input_4_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.updatePrediction("route", $event.target.value));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r3.runtime.draft().prediction.route)("disabled", !ctx_r3.runtime.canEdit());
  }
}
function ChampionshipPanelComponent_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275declareLet(0);
    \u0275\u0275elementStart(1, "h2", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label");
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "input", 18);
    \u0275\u0275listener("input", function ChampionshipPanelComponent_Conditional_12_Conditional_1_Template_input_input_5_listener($event) {
      \u0275\u0275restoreView(_r12);
      const field_r13 = \u0275\u0275readContextLet(0);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.updatePrediction(field_r13.key, $event.target.value));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    const field_r14 = \u0275\u0275storeLet(ctx_r3.predictionFields[ctx_r3.activeStep() - 1]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r14.question);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r14.label);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r3.runtime.draft().prediction[field_r14.key])("disabled", !ctx_r3.runtime.canEdit());
    \u0275\u0275attribute("aria-label", field_r14.label);
  }
}
function ChampionshipPanelComponent_Conditional_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function ChampionshipPanelComponent_Conditional_12_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.go(ctx_r3.activeStep() - 1));
    });
    \u0275\u0275text(1, "Back");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipPanelComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, ChampionshipPanelComponent_Conditional_12_Conditional_0_Template, 5, 2)(1, ChampionshipPanelComponent_Conditional_12_Conditional_1_Template, 6, 6);
    \u0275\u0275elementStart(2, "div", 11);
    \u0275\u0275conditionalCreate(3, ChampionshipPanelComponent_Conditional_12_Conditional_3_Template, 2, 0, "button");
    \u0275\u0275elementStart(4, "button", 16);
    \u0275\u0275listener("click", function ChampionshipPanelComponent_Conditional_12_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.go(ctx_r3.activeStep() + 1));
    });
    \u0275\u0275text(5, " Continue ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r3.activeStep() === 0 ? 0 : 1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r3.activeStep() > 0 ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r3.canContinue());
  }
}
function ChampionshipPanelComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r16 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r3.owner(id_r16), " \xB7 ", ctx_r3.status(id_r16));
  }
}
function ChampionshipPanelComponent_ForEmpty_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1, "No programs locked yet.");
    \u0275\u0275elementEnd();
  }
}
function ChampionshipPanelComponent_Conditional_23_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
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
    \u0275\u0275elementStart(9, "td")(10, "button", 6);
    \u0275\u0275listener("click", function ChampionshipPanelComponent_Conditional_23_For_17_Template_button_click_10_listener() {
      const trial_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.replay.emit(trial_r18));
    });
    \u0275\u0275text(11, "Replay");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const trial_r18 = ctx.$implicit;
    const \u0275$index_160_r19 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_160_r19 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trial_r18.version.ownerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", trial_r18.score.toFixed(1), " / 100");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", trial_r18.elapsedSeconds.toFixed(1), " s");
  }
}
function ChampionshipPanelComponent_Conditional_23_ForEmpty_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 19);
    \u0275\u0275text(2, "Launch a locked program to record a result.");
    \u0275\u0275elementEnd()();
  }
}
function ChampionshipPanelComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "Rehearsal standings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "table")(3, "thead")(4, "tr")(5, "th");
    \u0275\u0275text(6, "Place");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Engineer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Performance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Review");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, ChampionshipPanelComponent_Conditional_23_For_17_Template, 12, 4, "tr", null, _forTrack15, false, ChampionshipPanelComponent_Conditional_23_ForEmpty_18_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "p");
    \u0275\u0275text(20, " Performance: delivery 35 \xB7 navigation 20 \xB7 efficiency 20 \xB7 reliability 15 \xB7 prediction 10. Academic assessment uses the portfolio. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r3.runtime.standings());
  }
}
function ChampionshipPanelComponent_Conditional_24_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "details")(1, "summary");
    \u0275\u0275text(2, "Teacher rehearsal controls");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20)(4, "label")(5, "input", 21);
    \u0275\u0275listener("change", function ChampionshipPanelComponent_Conditional_24_Conditional_3_Template_input_change_5_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.control({ revealed: $event.target.checked }));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, "Reveal course");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "label")(8, "input", 21);
    \u0275\u0275listener("change", function ChampionshipPanelComponent_Conditional_24_Conditional_3_Template_input_change_8_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.control({ practiceOpen: $event.target.checked }));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, "Practice open");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "label");
    \u0275\u0275text(11, "Practice limit (0 = unlimited)");
    \u0275\u0275elementStart(12, "input", 22);
    \u0275\u0275listener("change", function ChampionshipPanelComponent_Conditional_24_Conditional_3_Template_input_change_12_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.limit($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "label")(14, "input", 23);
    \u0275\u0275listener("change", function ChampionshipPanelComponent_Conditional_24_Conditional_3_Template_input_change_14_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.control({ showStandings: $event.target.checked }));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, "Show standings");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 11)(17, "button", 24);
    \u0275\u0275listener("click", function ChampionshipPanelComponent_Conditional_24_Conditional_3_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.control({ paused: !ctx_r3.runtime.state().championship.paused }));
    });
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 24);
    \u0275\u0275listener("click", function ChampionshipPanelComponent_Conditional_24_Conditional_3_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.launch());
    });
    \u0275\u0275text(20, " Launch next locked program");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 24);
    \u0275\u0275listener("click", function ChampionshipPanelComponent_Conditional_24_Conditional_3_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r20);
      \u0275\u0275nextContext(2);
      const finalizeDialog_r21 = \u0275\u0275reference(39);
      return \u0275\u0275resetView(finalizeDialog_r21.showModal());
    });
    \u0275\u0275text(22, " Finalize rehearsal ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("checked", ctx_r3.runtime.state().championship.revealed)("disabled", ctx_r3.runtime.state().championship.finalized);
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx_r3.runtime.state().championship.practiceOpen)("disabled", ctx_r3.runtime.state().championship.finalized);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r3.runtime.state().championship.practiceLimit)("disabled", ctx_r3.runtime.state().championship.finalized);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r3.runtime.state().championship.showStandings);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r3.runtime.state().championship.finalized);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.runtime.state().championship.paused ? "Resume queue" : "Pause queue");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.runtime.state().championship.paused || ctx_r3.runtime.state().championship.finalized);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.runtime.state().championship.finalized || !ctx_r3.runtime.standings().length);
  }
}
function ChampionshipPanelComponent_Conditional_24_Conditional_4_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function ChampionshipPanelComponent_Conditional_24_Conditional_4_Conditional_9_Template_button_click_0_listener() {
      const versionId_r24 = \u0275\u0275restoreView(_r23);
      const ctx_r3 = \u0275\u0275nextContext(3);
      ctx_r3.runtime.unlock(versionId_r24, ctx_r3.reason());
      return \u0275\u0275resetView(ctx_r3.reason.set(""));
    });
    \u0275\u0275text(1, " Unlock current version ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r3.reason().trim().length < 8 || ctx_r3.runtime.state().championship.finalized);
  }
}
function ChampionshipPanelComponent_Conditional_24_Conditional_4_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function ChampionshipPanelComponent_Conditional_24_Conditional_4_For_11_Template_button_click_0_listener() {
      const trial_r26 = \u0275\u0275restoreView(_r25).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      ctx_r3.runtime.technicalRerun(trial_r26.id, ctx_r3.reason());
      return \u0275\u0275resetView(ctx_r3.reason.set(""));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trial_r26 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r3.reason().trim().length < 8 || ctx_r3.runtime.state().championship.finalized);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Technical rerun \xB7 ", trial_r26.version.ownerName, " ");
  }
}
function ChampionshipPanelComponent_Conditional_24_Conditional_4_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r27 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r27.action);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 ", event_r27.reason, " ");
  }
}
function ChampionshipPanelComponent_Conditional_24_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "details")(1, "summary");
    \u0275\u0275text(2, "Unlock or record a technical rerun");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, " Original versions and results stay in the history. A technical rerun excludes the original result from standings and queues that same program again. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label");
    \u0275\u0275text(6, "Reason");
    \u0275\u0275elementStart(7, "input", 25);
    \u0275\u0275listener("input", function ChampionshipPanelComponent_Conditional_24_Conditional_4_Template_input_input_7_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.reason.set($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 11);
    \u0275\u0275conditionalCreate(9, ChampionshipPanelComponent_Conditional_24_Conditional_4_Conditional_9_Template, 2, 1, "button", 26);
    \u0275\u0275repeaterCreate(10, ChampionshipPanelComponent_Conditional_24_Conditional_4_For_11_Template, 2, 2, "button", 26, _forTrack15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "details")(13, "summary");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(15, ChampionshipPanelComponent_Conditional_24_Conditional_4_For_16_Template, 4, 2, "p", null, _forTrack15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r3.reason());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_5_0 = ctx_r3.runtime.draft().lockedVersionId) ? 9 : -1, tmp_5_0);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.runtime.standings());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Rehearsal audit history (", ctx_r3.runtime.state().audit.length, ")");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.runtime.state().audit);
  }
}
function ChampionshipPanelComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details")(1, "summary");
    \u0275\u0275text(2, "Teacher tools");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, ChampionshipPanelComponent_Conditional_24_Conditional_3_Template, 23, 11, "details");
    \u0275\u0275conditionalCreate(4, ChampionshipPanelComponent_Conditional_24_Conditional_4_Template, 17, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r3.runtime.canControl() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.runtime.canControl() ? 4 : -1);
  }
}
var ChampionshipPanelComponent = class _ChampionshipPanelComponent {
  runtime = inject(AutomationRuntimeService);
  replay = output();
  selected = output();
  reason = signal(
    "",
    ...ngDevMode ? [{ debugName: "reason" }] : (
      /* istanbul ignore next */
      []
    )
  );
  step = signal(
    0,
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  element = inject(ElementRef);
  injector = inject(Injector);
  finalChallenge = computed(
    () => this.runtime.config.challenges.find((c) => c.id === this.runtime.config.championshipChallengeId),
    ...ngDevMode ? [{ debugName: "finalChallenge" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finalTrial = computed(
    () => this.runtime.currentTrials().find((t) => t.mode === "championship" && t.version.id === this.runtime.draft().lockedVersionId && !t.technicalInvalidReason),
    ...ngDevMode ? [{ debugName: "finalTrial" }] : (
      /* istanbul ignore next */
      []
    )
  );
  shownCourse = computed(
    () => this.finalTrial()?.version.course ?? (this.runtime.state().championship.revealed ? this.runtime.config.courses.find((c) => c.id === this.finalChallenge().courseId) : this.runtime.course()),
    ...ngDevMode ? [{ debugName: "shownCourse" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeStep = computed(
    () => this.runtime.draft().lockedVersionId || this.runtime.sample ? 5 : this.step(),
    ...ngDevMode ? [{ debugName: "activeStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canContinue = computed(
    () => {
      if (this.activeStep() === 0)
        return this.runtime.draft().prediction.route.trim().length >= 15;
      const field = this.predictionFields[this.activeStep() - 1];
      if (!field)
        return false;
      const value = this.runtime.draft().prediction[field.key];
      return !!value.trim() && Number.isFinite(Number(value)) && Number(value) >= 0;
    },
    ...ngDevMode ? [{ debugName: "canContinue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    if (this.runtime.isChampionship())
      this.step.set(this.nextUnanswered());
  }
  nextUnanswered() {
    const prediction = this.runtime.draft().prediction;
    if (prediction.route.trim().length < 15)
      return 0;
    const missing = this.predictionFields.findIndex((field) => {
      const value = prediction[field.key];
      return !value.trim() || !Number.isFinite(Number(value)) || Number(value) < 0;
    });
    return missing < 0 ? 5 : missing + 1;
  }
  begin() {
    this.runtime.selectChallenge(this.runtime.config.championshipChallengeId);
    if (this.runtime.isChampionship())
      this.go(this.nextUnanswered());
  }
  practice() {
    if (this.runtime.state().championship.revealed)
      this.runtime.selectChallenge(this.runtime.config.championshipChallengeId);
    this.selected.emit();
  }
  go(step) {
    this.step.set(Math.max(0, Math.min(5, step)));
    afterNextRender(() => {
      const heading = this.element.nativeElement.querySelector(".question-card h2");
      heading?.scrollIntoView({ block: "nearest" });
      heading?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  confirmLock(dialog) {
    this.runtime.lockProgram();
    dialog.close();
    this.go(5);
  }
  predictionFields = [
    { key: "distance", label: "Distance (cm)", question: "How far will your robot travel?" },
    { key: "turns", label: "Total turn (\xB0)", question: "How much will your robot turn?" },
    { key: "seconds", label: "Time (s)", question: "How long will the run take?" },
    { key: "battery", label: "Battery used", question: "How much battery will you use?" }
  ];
  limit(value) {
    const limit = Number(value);
    if (Number.isInteger(limit) && limit >= 0 && limit <= 100)
      this.runtime.control({ practiceLimit: limit });
  }
  launch() {
    const trial = this.runtime.launchNext();
    if (trial)
      this.replay.emit(trial);
  }
  owner(id) {
    const version = this.runtime.state().versions.find((v) => v.id === id);
    return version ? `${version.ownerName} \xB7 program v${version.program.version}` : "Version unavailable";
  }
  status(id) {
    return this.runtime.state().trials.some((t) => t.version.id === id && t.mode === "championship" && !t.technicalInvalidReason) ? "Run recorded" : "Waiting to launch";
  }
  static \u0275fac = function ChampionshipPanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChampionshipPanelComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChampionshipPanelComponent, selectors: [["app-championship-panel"]], outputs: { replay: "replay", selected: "selected" }, decls: 49, vars: 20, consts: [["lockDialog", ""], ["finalizeDialog", ""], [1, "review-layout"], ["aria-label", "Championship course", 1, "visual-panel"], [3, "course", "robotRadiusCm", "targetIndex", "sample", "samples", "events", "result"], [1, "visual-caption"], [3, "click"], [1, "question-card"], [1, "review-support"], ["aria-labelledby", "robot-lock-title"], ["id", "robot-lock-title"], [1, "actions"], ["tabindex", "-1"], [1, "primary", 3, "click"], ["role", "status"], [1, "readiness"], [1, "primary", 3, "click", "disabled"], ["aria-label", "Planned route", "rows", "5", "placeholder", "First\u2026 Then\u2026 Finally\u2026", 3, "input", "value", "disabled"], ["type", "number", "min", "0", 3, "input", "value", "disabled"], ["colspan", "5"], [1, "settings"], ["type", "checkbox", 3, "change", "checked", "disabled"], ["type", "number", "min", "0", "max", "100", 3, "change", "value", "disabled"], ["type", "checkbox", 3, "change", "checked"], [3, "click", "disabled"], ["placeholder", "Describe what happened (at least 8 characters)", 3, "input", "value"], [3, "disabled"]], template: function ChampionshipPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "section", 3);
      \u0275\u0275element(2, "app-robot-course", 4);
      \u0275\u0275elementStart(3, "p", 5);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, ChampionshipPanelComponent_Conditional_5_Template, 2, 0, "button");
      \u0275\u0275elementStart(6, "button", 6);
      \u0275\u0275listener("click", function ChampionshipPanelComponent_Template_button_click_6_listener() {
        return ctx.practice();
      });
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "section", 7);
      \u0275\u0275conditionalCreate(9, ChampionshipPanelComponent_Conditional_9_Template, 4, 0)(10, ChampionshipPanelComponent_Conditional_10_Template, 6, 1)(11, ChampionshipPanelComponent_Conditional_11_Template, 13, 4)(12, ChampionshipPanelComponent_Conditional_12_Template, 6, 3);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 8)(14, "details")(15, "summary");
      \u0275\u0275text(16, "Launch queue & results");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "h3");
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "ol");
      \u0275\u0275repeaterCreate(20, ChampionshipPanelComponent_For_21_Template, 2, 2, "li", null, \u0275\u0275repeaterTrackByIdentity, false, ChampionshipPanelComponent_ForEmpty_22_Template, 2, 0, "li");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(23, ChampionshipPanelComponent_Conditional_23_Template, 21, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(24, ChampionshipPanelComponent_Conditional_24_Template, 5, 2, "details");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "dialog", 9, 0)(27, "h2", 10);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "p");
      \u0275\u0275text(30, " Your code and evidence will become read-only. Your teacher can unlock the program with a recorded reason. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "p");
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 11)(34, "button", 6);
      \u0275\u0275listener("click", function ChampionshipPanelComponent_Template_button_click_34_listener() {
        \u0275\u0275restoreView(_r1);
        const lockDialog_r9 = \u0275\u0275reference(26);
        return \u0275\u0275resetView(lockDialog_r9.close());
      });
      \u0275\u0275text(35, "Keep editing");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 6);
      \u0275\u0275listener("click", function ChampionshipPanelComponent_Template_button_click_36_listener() {
        \u0275\u0275restoreView(_r1);
        const lockDialog_r9 = \u0275\u0275reference(26);
        return \u0275\u0275resetView(ctx.confirmLock(lockDialog_r9));
      });
      \u0275\u0275text(37, "Confirm lock");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(38, "dialog", null, 1)(40, "h2");
      \u0275\u0275text(41, "Finalize these rehearsal results?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "p");
      \u0275\u0275text(43, "This closes launches, practice, and unlocks for this rehearsal.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 11)(45, "button", 6);
      \u0275\u0275listener("click", function ChampionshipPanelComponent_Template_button_click_45_listener() {
        \u0275\u0275restoreView(_r1);
        const finalizeDialog_r21 = \u0275\u0275reference(39);
        return \u0275\u0275resetView(finalizeDialog_r21.close());
      });
      \u0275\u0275text(46, "Keep rehearsal open");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "button", 6);
      \u0275\u0275listener("click", function ChampionshipPanelComponent_Template_button_click_47_listener() {
        \u0275\u0275restoreView(_r1);
        const finalizeDialog_r21 = \u0275\u0275reference(39);
        ctx.runtime.control({ finalized: true, practiceOpen: false, paused: true });
        return \u0275\u0275resetView(finalizeDialog_r21.close());
      });
      \u0275\u0275text(48, " Confirm final results ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_10_0;
      \u0275\u0275advance(2);
      \u0275\u0275property("course", ctx.shownCourse())("robotRadiusCm", ctx.runtime.config.robot.radiusCm)("targetIndex", ctx.finalTrial()?.version?.targetIndex ?? (ctx.runtime.isChampionship() || !ctx.runtime.state().championship.revealed ? ctx.runtime.draft().targetIndex : 0))("sample", ctx.finalTrial()?.pathSamples?.at(-1))("samples", ctx.finalTrial()?.pathSamples ?? \u0275\u0275pureFunction0(18, _c06))("events", ctx.finalTrial()?.events ?? \u0275\u0275pureFunction0(19, _c06))("result", ctx.finalTrial());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.runtime.state().championship.revealed ? "Final course \xB7 local rehearsal" : "Your current practice course", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_10_0 = ctx.finalTrial()) ? 5 : -1, tmp_10_0);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", !ctx.runtime.canEdit() ? "View recorded program" : ctx.runtime.state().championship.revealed ? "Practice this course" : "Keep practicing", " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.runtime.state().championship.revealed ? 9 : !ctx.runtime.isChampionship() ? 10 : ctx.activeStep() === 5 ? 11 : 12);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1(" Launch queue \xB7 ", ctx.runtime.state().championship.finalized ? "Finalized" : ctx.runtime.state().championship.paused ? "Paused" : "Ready", " ");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.runtime.state().championship.queue);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.runtime.state().championship.showStandings ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.canControl() ? 24 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("Lock version ", ctx.runtime.draft().program.version, "?");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate2(" ", ctx.runtime.draft().program.commands.length, " top-level commands \xB7 ", ctx.runtime.state().math.length, " calculations. ");
    }
  }, dependencies: [RobotCourseComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #203e36;\n  font:\n    14px/1.5 Inter,\n    system-ui,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n[hidden][_ngcontent-%COMP%] {\n  display: none !important;\n}\n.review-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 1fr);\n  gap: 32px;\n  align-items: start;\n}\n.visual-panel[_ngcontent-%COMP%] {\n  min-width: 0;\n  color: #d7e6df;\n}\n.visual-caption[_ngcontent-%COMP%] {\n  color: #c2d7cc;\n  font-size: 13px;\n  margin: 12px 0;\n}\n.question-card[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 28px;\n  border-radius: 16px;\n  background: #eef0e7;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: clamp(22px, 2.1vw, 29px);\n  line-height: 1.3;\n  letter-spacing: -0.4px;\n  margin: 0 0 24px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin: 20px 0 8px;\n}\np[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n  color: #203e36;\n  border: 1px solid #acbdb5;\n  border-radius: 8px;\n  background: #fff;\n  padding: 10px 14px;\n  min-height: 44px;\n}\nbutton[_ngcontent-%COMP%], \nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n  opacity: 0.45;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #e6bb6e;\n  border-color: #d7a753;\n  color: #202e29;\n  font-weight: 750;\n}\n.question-card[_ngcontent-%COMP%]    > .primary[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 12px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  margin: 16px 0;\n}\nlabel[_ngcontent-%COMP%]   :is(input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]) {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  margin-top: 7px;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-top: 20px;\n}\n.actions[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%] {\n  flex: 1 1 150px;\n}\ndetails[_ngcontent-%COMP%] {\n  margin-top: 14px;\n}\nsummary[_ngcontent-%COMP%] {\n  padding: 12px 0;\n  font-size: 13px;\n  min-height: 44px;\n}\ndetails[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \ndetails[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.compare-select[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.compare-select[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n  margin: 12px 0;\n}\ncaption[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 13px;\n  color: #496158;\n}\nth[_ngcontent-%COMP%], \ntd[_ngcontent-%COMP%] {\n  padding: 9px 5px;\n  text-align: left;\n  border-bottom: 1px solid #bdccc3;\n  overflow-wrap: anywhere;\n}\n.trial-list[_ngcontent-%COMP%] {\n  max-height: 360px;\n  overflow: auto;\n}\n.trial-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: center;\n  border-bottom: 1px solid #57746b;\n  padding: 12px 0;\n  font-size: 13px;\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  opacity: 0.85;\n}\n.readiness[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\n.readiness[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n.mastery[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n}\n.mastery[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 8px 0;\n  border-bottom: 1px solid #bdccc3;\n}\ndl[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n  font-size: 13px;\n}\ndd[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.review-support[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  color: #d7e6df;\n}\n.review-support[_ngcontent-%COMP%]    > details[_ngcontent-%COMP%] {\n  max-width: 100%;\n}\n.settings[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.settings[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.settings[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 20px;\n  min-height: 20px;\n  margin: 0;\n}\n.settings[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%] {\n  width: 90px;\n}\ndialog[_ngcontent-%COMP%] {\n  width: min(480px, calc(100vw - 32px));\n  max-height: calc(100dvh - 32px);\n  overflow: auto;\n  padding: 28px;\n  border-radius: 16px;\n  background: #eef0e7;\n  color: #203e36;\n  border: 1px solid #acbdb5;\n}\ndialog[_ngcontent-%COMP%]::backdrop {\n  background: #102a27bb;\n}\n[_ngcontent-%COMP%]:is(button, input, select, textarea, summary):focus-visible {\n  outline: 3px solid #bd790b;\n  outline-offset: 3px;\n}\n@media (max-width: 850px) {\n  .review-layout[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n    gap: 16px;\n  }\n  .question-card[_ngcontent-%COMP%] {\n    padding: 22px 16px;\n  }\n  h2[_ngcontent-%COMP%] {\n    font-size: 23px;\n  }\n  .trial-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=automation-panels.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChampionshipPanelComponent, [{
    type: Component,
    args: [{ selector: "app-championship-panel", imports: [RobotCourseComponent], template: `<div class="review-layout">
  <section class="visual-panel" aria-label="Championship course">
    <app-robot-course
      [course]="shownCourse()"
      [robotRadiusCm]="runtime.config.robot.radiusCm"
      [targetIndex]="
        finalTrial()?.version?.targetIndex ??
        (runtime.isChampionship() || !runtime.state().championship.revealed
          ? runtime.draft().targetIndex
          : 0)
      "
      [sample]="finalTrial()?.pathSamples?.at(-1)"
      [samples]="finalTrial()?.pathSamples ?? []"
      [events]="finalTrial()?.events ?? []"
      [result]="finalTrial()"
    />
    <p class="visual-caption">
      {{
        runtime.state().championship.revealed
          ? 'Final course \xB7 local rehearsal'
          : 'Your current practice course'
      }}
    </p>
    @if (finalTrial(); as trial) {
      <button (click)="replay.emit(trial)">\u25B6 Replay final run</button>
    }
    <button (click)="practice()">
      {{
        !runtime.canEdit()
          ? 'View recorded program'
          : runtime.state().championship.revealed
            ? 'Practice this course'
            : 'Keep practicing'
      }}
    </button>
  </section>
  <section class="question-card">
    @if (!runtime.state().championship.revealed) {
      <h2 tabindex="-1">Your teacher will reveal the final course.</h2>
      <p>Keep testing your program while you wait.</p>
    } @else if (!runtime.isChampionship()) {
      <h2 tabindex="-1">How will you complete the final route?</h2>
      <p>{{ finalChallenge().mission }}</p>
      <button class="primary" (click)="begin()">Plan the final run</button>
    } @else if (activeStep() === 5) {
      <h2 tabindex="-1">
        {{
          runtime.draft().lockedVersionId
            ? finalTrial()
              ? 'Your final run is recorded'
              : 'Your program is locked'
            : 'Ready for your final run?'
        }}
      </h2>
      @if (runtime.draft().lockedVersionId) {
        <p role="status">
          {{
            finalTrial()
              ? runtime.sample
                ? 'Review the recorded run and its saved defense.'
                : 'Review your recorded run and explain your design in the final defense.'
              : 'Your recorded version is in the launch queue.'
          }}
        </p>
      } @else {
        <ul class="readiness">
          @for (problem of runtime.readiness(); track problem) {
            <li>{{ problem }}</li>
          } @empty {
            <li>Your evidence is ready.</li>
          }
        </ul>
        <p>Locking keeps this exact code and evidence for the final run.</p>
      }
      <details>
        <summary>Your predictions</summary>
        <p>{{ runtime.draft().prediction.route }}</p>
        <dl>
          @for (field of predictionFields; track field.key) {
            <dt>{{ field.label }}</dt>
            <dd>{{ runtime.draft().prediction[field.key] || 'Not recorded' }}</dd>
          }
        </dl>
      </details>
      @if (!runtime.draft().lockedVersionId) {
        <div class="actions">
          <button (click)="go(0)">Edit predictions</button
          ><button
            class="primary"
            [disabled]="
              runtime.sample ||
              runtime.readiness().length > 0 ||
              runtime.state().championship.finalized
            "
            (click)="lockDialog.showModal()"
          >
            Review & lock program
          </button>
        </div>
      }
    } @else {
      @if (activeStep() === 0) {
        <h2 tabindex="-1">What route will your robot follow?</h2>
        <label
          >Your route<textarea
            aria-label="Planned route"
            rows="5"
            [value]="runtime.draft().prediction.route"
            (input)="runtime.updatePrediction('route', $any($event.target).value)"
            [disabled]="!runtime.canEdit()"
            placeholder="First\u2026 Then\u2026 Finally\u2026"
          ></textarea>
        </label>
      } @else {
        @let field = predictionFields[activeStep() - 1];
        <h2 tabindex="-1">{{ field.question }}</h2>
        <label
          >{{ field.label
          }}<input
            type="number"
            min="0"
            [attr.aria-label]="field.label"
            [value]="runtime.draft().prediction[field.key]"
            (input)="runtime.updatePrediction(field.key, $any($event.target).value)"
            [disabled]="!runtime.canEdit()"
        /></label>
      }
      <div class="actions">
        @if (activeStep() > 0) {
          <button (click)="go(activeStep() - 1)">Back</button>
        }
        <button class="primary" [disabled]="!canContinue()" (click)="go(activeStep() + 1)">
          Continue
        </button>
      </div>
    }
  </section>
</div>
<div class="review-support">
  <details>
    <summary>Launch queue & results</summary>
    <h3>
      Launch queue \xB7
      {{
        runtime.state().championship.finalized
          ? 'Finalized'
          : runtime.state().championship.paused
            ? 'Paused'
            : 'Ready'
      }}
    </h3>
    <ol>
      @for (id of runtime.state().championship.queue; track id) {
        <li>{{ owner(id) }} \xB7 {{ status(id) }}</li>
      } @empty {
        <li>No programs locked yet.</li>
      }
    </ol>
    @if (runtime.state().championship.showStandings) {
      <h3>Rehearsal standings</h3>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Engineer</th>
            <th>Performance</th>
            <th>Time</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          @for (trial of runtime.standings(); track trial.id; let i = $index) {
            <tr>
              <td>{{ i + 1 }}</td>
              <td>{{ trial.version.ownerName }}</td>
              <td>{{ trial.score.toFixed(1) }} / 100</td>
              <td>{{ trial.elapsedSeconds.toFixed(1) }} s</td>
              <td><button (click)="replay.emit(trial)">Replay</button></td>
            </tr>
          } @empty {
            <tr>
              <td colspan="5">Launch a locked program to record a result.</td>
            </tr>
          }
        </tbody>
      </table>
      <p>
        Performance: delivery 35 \xB7 navigation 20 \xB7 efficiency 20 \xB7 reliability 15 \xB7 prediction 10.
        Academic assessment uses the portfolio.
      </p>
    }
  </details>
  @if (runtime.canControl()) {
    <details>
      <summary>Teacher tools</summary>
      @if (runtime.canControl()) {
        <details>
          <summary>Teacher rehearsal controls</summary>
          <div class="settings">
            <label
              ><input
                type="checkbox"
                [checked]="runtime.state().championship.revealed"
                (change)="runtime.control({ revealed: $any($event.target).checked })"
                [disabled]="runtime.state().championship.finalized"
              />Reveal course</label
            ><label
              ><input
                type="checkbox"
                [checked]="runtime.state().championship.practiceOpen"
                (change)="runtime.control({ practiceOpen: $any($event.target).checked })"
                [disabled]="runtime.state().championship.finalized"
              />Practice open</label
            ><label
              >Practice limit (0 = unlimited)<input
                type="number"
                min="0"
                max="100"
                [value]="runtime.state().championship.practiceLimit"
                (change)="limit($any($event.target).value)"
                [disabled]="runtime.state().championship.finalized" /></label
            ><label
              ><input
                type="checkbox"
                [checked]="runtime.state().championship.showStandings"
                (change)="runtime.control({ showStandings: $any($event.target).checked })"
              />Show standings</label
            >
          </div>
          <div class="actions">
            <button
              (click)="runtime.control({ paused: !runtime.state().championship.paused })"
              [disabled]="runtime.state().championship.finalized"
            >
              {{ runtime.state().championship.paused ? 'Resume queue' : 'Pause queue' }}</button
            ><button
              (click)="launch()"
              [disabled]="
                runtime.state().championship.paused || runtime.state().championship.finalized
              "
            >
              Launch next locked program</button
            ><button
              (click)="finalizeDialog.showModal()"
              [disabled]="runtime.state().championship.finalized || !runtime.standings().length"
            >
              Finalize rehearsal
            </button>
          </div>
        </details>
      }
      @if (runtime.canControl()) {
        <details>
          <summary>Unlock or record a technical rerun</summary>
          <p>
            Original versions and results stay in the history. A technical rerun excludes the
            original result from standings and queues that same program again.
          </p>
          <label
            >Reason<input
              placeholder="Describe what happened (at least 8 characters)"
              [value]="reason()"
              (input)="reason.set($any($event.target).value)"
          /></label>
          <div class="actions">
            @if (runtime.draft().lockedVersionId; as versionId) {
              <button
                [disabled]="reason().trim().length < 8 || runtime.state().championship.finalized"
                (click)="runtime.unlock(versionId, reason()); reason.set('')"
              >
                Unlock current version
              </button>
            }
            @for (trial of runtime.standings(); track trial.id) {
              <button
                [disabled]="reason().trim().length < 8 || runtime.state().championship.finalized"
                (click)="runtime.technicalRerun(trial.id, reason()); reason.set('')"
              >
                Technical rerun \xB7 {{ trial.version.ownerName }}
              </button>
            }
          </div>
        </details>
        <details>
          <summary>Rehearsal audit history ({{ runtime.state().audit.length }})</summary>
          @for (event of runtime.state().audit; track event.id) {
            <p>
              <strong>{{ event.action }}</strong> \xB7 {{ event.reason }}
            </p>
          }
        </details>
      }
    </details>
  }
</div>
<dialog #lockDialog aria-labelledby="robot-lock-title">
  <h2 id="robot-lock-title">Lock version {{ runtime.draft().program.version }}?</h2>
  <p>
    Your code and evidence will become read-only. Your teacher can unlock the program with a
    recorded reason.
  </p>
  <p>
    {{ runtime.draft().program.commands.length }} top-level commands \xB7
    {{ runtime.state().math.length }} calculations.
  </p>
  <div class="actions">
    <button (click)="lockDialog.close()">Keep editing</button
    ><button (click)="confirmLock(lockDialog)">Confirm lock</button>
  </div>
</dialog>
<dialog #finalizeDialog>
  <h2>Finalize these rehearsal results?</h2>
  <p>This closes launches, practice, and unlocks for this rehearsal.</p>
  <div class="actions">
    <button (click)="finalizeDialog.close()">Keep rehearsal open</button
    ><button
      (click)="
        runtime.control({ finalized: true, practiceOpen: false, paused: true });
        finalizeDialog.close()
      "
    >
      Confirm final results
    </button>
  </div>
</dialog>
`, styles: ["/* src/app/templates/programming-automation/ui/automation-panels.css */\n:host {\n  display: block;\n  color: #203e36;\n  font:\n    14px/1.5 Inter,\n    system-ui,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n[hidden] {\n  display: none !important;\n}\n.review-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 1fr);\n  gap: 32px;\n  align-items: start;\n}\n.visual-panel {\n  min-width: 0;\n  color: #d7e6df;\n}\n.visual-caption {\n  color: #c2d7cc;\n  font-size: 13px;\n  margin: 12px 0;\n}\n.question-card {\n  min-width: 0;\n  padding: 28px;\n  border-radius: 16px;\n  background: #eef0e7;\n}\nh2 {\n  font-size: clamp(22px, 2.1vw, 29px);\n  line-height: 1.3;\n  letter-spacing: -0.4px;\n  margin: 0 0 24px;\n}\nh3 {\n  font-size: 16px;\n  margin: 20px 0 8px;\n}\np {\n  margin: 12px 0;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit;\n  color: #203e36;\n  border: 1px solid #acbdb5;\n  border-radius: 8px;\n  background: #fff;\n  padding: 10px 14px;\n  min-height: 44px;\n}\nbutton,\nsummary {\n  cursor: pointer;\n}\nbutton:disabled {\n  cursor: default;\n  opacity: 0.45;\n}\n.primary {\n  background: #e6bb6e;\n  border-color: #d7a753;\n  color: #202e29;\n  font-weight: 750;\n}\n.question-card > .primary {\n  width: 100%;\n  margin-top: 12px;\n}\nlabel {\n  display: block;\n  font-size: 14px;\n  margin: 16px 0;\n}\nlabel :is(input, select, textarea) {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  margin-top: 7px;\n}\ntextarea {\n  resize: vertical;\n}\n.actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-top: 20px;\n}\n.actions .primary {\n  flex: 1 1 150px;\n}\ndetails {\n  margin-top: 14px;\n}\nsummary {\n  padding: 12px 0;\n  font-size: 13px;\n  min-height: 44px;\n}\ndetails p,\ndetails li {\n  font-size: 13px;\n}\n.compare-select {\n  display: flex;\n  gap: 12px;\n}\n.compare-select label {\n  flex: 1;\n  min-width: 0;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n  margin: 12px 0;\n}\ncaption {\n  text-align: left;\n  font-size: 13px;\n  color: #496158;\n}\nth,\ntd {\n  padding: 9px 5px;\n  text-align: left;\n  border-bottom: 1px solid #bdccc3;\n  overflow-wrap: anywhere;\n}\n.trial-list {\n  max-height: 360px;\n  overflow: auto;\n}\n.trial-list article {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: center;\n  border-bottom: 1px solid #57746b;\n  padding: 12px 0;\n  font-size: 13px;\n}\nsmall {\n  display: block;\n  font-size: 12px;\n  opacity: 0.85;\n}\n.readiness {\n  padding-left: 20px;\n}\n.readiness li {\n  margin: 12px 0;\n}\n.mastery {\n  list-style: none;\n  padding: 0;\n}\n.mastery li {\n  padding: 8px 0;\n  border-bottom: 1px solid #bdccc3;\n}\ndl {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n  font-size: 13px;\n}\ndd {\n  margin: 0;\n}\n.review-support {\n  margin-top: 20px;\n  color: #d7e6df;\n}\n.review-support > details {\n  max-width: 100%;\n}\n.settings {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.settings label {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.settings input[type=checkbox] {\n  width: 20px;\n  min-height: 20px;\n  margin: 0;\n}\n.settings input[type=number] {\n  width: 90px;\n}\ndialog {\n  width: min(480px, calc(100vw - 32px));\n  max-height: calc(100dvh - 32px);\n  overflow: auto;\n  padding: 28px;\n  border-radius: 16px;\n  background: #eef0e7;\n  color: #203e36;\n  border: 1px solid #acbdb5;\n}\ndialog::backdrop {\n  background: #102a27bb;\n}\n:is(button, input, select, textarea, summary):focus-visible {\n  outline: 3px solid #bd790b;\n  outline-offset: 3px;\n}\n@media (max-width: 850px) {\n  .review-layout {\n    grid-template-columns: minmax(0, 1fr);\n    gap: 16px;\n  }\n  .question-card {\n    padding: 22px 16px;\n  }\n  h2 {\n    font-size: 23px;\n  }\n  .trial-list article {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=automation-panels.css.map */\n"] }]
  }], () => [], { replay: [{ type: Output, args: ["replay"] }], selected: [{ type: Output, args: ["selected"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChampionshipPanelComponent, { className: "ChampionshipPanelComponent", filePath: "src/app/templates/programming-automation/ui/championship-panel.component.ts", lineNumber: 20 });
})();

// src/app/templates/programming-automation/ui/automation-lab.component.ts
var _c07 = ["taskPanel"];
var _c14 = ["mathPanel"];
var _c22 = ["courseView"];
var _c32 = () => [];
var _forTrack08 = ($index, $item) => $item.id;
function AutomationLabComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-automation-week-workspace");
  }
}
function AutomationLabComponent_Conditional_1_Conditional_17_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const challenge_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("value", challenge_r5.id)("selected", challenge_r5.id === ctx_r2.runtime.challenge().id)("disabled", challenge_r5.id === ctx_r2.runtime.config.championshipChallengeId && !ctx_r2.runtime.state().championship.revealed);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", challenge_r5.title, "", ctx_r2.runtime.state().drafts[challenge_r5.id].completedAt ? " \u2713" : "", " ");
  }
}
function AutomationLabComponent_Conditional_1_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 15);
    \u0275\u0275text(1, "Mission ");
    \u0275\u0275elementStart(2, "select", 34);
    \u0275\u0275listener("change", function AutomationLabComponent_Conditional_1_Conditional_17_Template_select_change_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      \u0275\u0275nextContext();
      const workspaceTools_r2 = \u0275\u0275reference(2);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.choose($event.target.value);
      return \u0275\u0275resetView(workspaceTools_r2.close());
    });
    \u0275\u0275repeaterCreate(3, AutomationLabComponent_Conditional_1_Conditional_17_For_4_Template, 2, 5, "option", 35, _forTrack08);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r2.runtime.challenge().id);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.runtime.config.challenges);
  }
}
function AutomationLabComponent_Conditional_1_Conditional_24_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " This is a recorded student example. Use Play replay, Step, and the timeline to follow each block. Switch missions to explore another recorded program; its code and saved calculations are read-only. ");
    \u0275\u0275elementEnd();
  }
}
function AutomationLabComponent_Conditional_1_Conditional_24_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ol", 36)(1, "li")(2, "strong");
    \u0275\u0275text(3, "Make a guess.");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "li")(6, "strong");
    \u0275\u0275text(7, "Run and watch.");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Press Run program beside the course. Notice where the robot stops and which way it faces. Pause, step, or use the timeline to review the whole run. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "li")(10, "strong");
    \u0275\u0275text(11, "Reason and revise.");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " After watching a run to its end, open reasoning & math. Use your observations to calculate and explain your next change. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.challenge().discovery?.instructions ?? "Add blocks to build your route. Enter a number you think could work.", " ");
  }
}
function AutomationLabComponent_Conditional_1_Conditional_24_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275element(1, "app-command-graphic", 39);
    \u0275\u0275elementStart(2, "div")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const type_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("type", type_r6);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.commandLabels[type_r6]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.commandDescriptions[type_r6]);
  }
}
function AutomationLabComponent_Conditional_1_Conditional_24_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 37)(1, "summary");
    \u0275\u0275text(2, "Mission hint");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.runtime.challenge().hint);
  }
}
function AutomationLabComponent_Conditional_1_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AutomationLabComponent_Conditional_1_Conditional_24_Conditional_0_Template, 2, 0, "p")(1, AutomationLabComponent_Conditional_1_Conditional_24_Conditional_1_Template, 13, 1, "ol", 36);
    \u0275\u0275elementStart(2, "details", 37)(3, "summary");
    \u0275\u0275text(4, "How the coding blocks work");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, " Blocks run from top to bottom. Fill the white slots with numbers, fractions, or named values. In a Move math block, the mission supplies the given number and operation; enter your number in the white slot. The result controls how far the robot moves. Drag a block by its icon/name, or use its \u2022\u2022\u2022 options to move, copy, remove, or disable it. Speed is also in the options. ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, AutomationLabComponent_Conditional_1_Conditional_24_For_8_Template, 7, 3, "div", 38, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, AutomationLabComponent_Conditional_1_Conditional_24_Conditional_9_Template, 5, 1, "details", 37);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r2.runtime.sample ? 0 : 1);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r2.runtime.challenge().allowedCommands);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.runtime.reasoningOpened() ? 9 : -1);
  }
}
function AutomationLabComponent_Conditional_1_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " Compare your recorded trials, replay a run, and explain what you changed. Your portfolio brings together the code, math, and evidence you have already saved. ");
    \u0275\u0275elementEnd();
  }
}
function AutomationLabComponent_Conditional_1_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " Use the championship controls to practice, review your evidence, and lock your tested program when it is ready. ");
    \u0275\u0275elementEnd();
  }
}
function AutomationLabComponent_Conditional_1_For_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const target_r7 = ctx.$implicit;
    const $index_r8 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", $index_r8)("selected", $index_r8 === ctx_r2.shownTarget());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", target_r7.label, " ");
  }
}
function AutomationLabComponent_Conditional_1_Conditional_40_Conditional_35_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_40_Conditional_35_For_1_Template_button_click_0_listener() {
      const event_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      ctx_r2.replay.seek(event_r11.timeMs);
      return \u0275\u0275resetView(ctx_r2.runtime.selectCommand(event_r11.commandId));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(2, 2, event_r11.timeMs / 1e3, "1.1-1"), " s \xB7 ", event_r11.message, " ");
  }
}
function AutomationLabComponent_Conditional_1_Conditional_40_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, AutomationLabComponent_Conditional_1_Conditional_40_Conditional_35_For_1_Template, 3, 5, "button", 49, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(ctx_r2.replay.trial()?.events);
  }
}
function AutomationLabComponent_Conditional_1_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "button", 40);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_40_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.replay.playing() ? ctx_r2.replay.pause() : ctx_r2.replay.play());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "details")(4, "summary");
    \u0275\u0275text(5, "Replay details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 21)(7, "button", 41);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_40_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.replay.stepBack());
    });
    \u0275\u0275text(8, " Step back ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 41);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_40_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.replay.step());
    });
    \u0275\u0275text(10, "Step");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 40);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_40_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.replay.reset());
    });
    \u0275\u0275text(12, "Reset replay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "label");
    \u0275\u0275text(14, "Speed");
    \u0275\u0275elementStart(15, "select", 42);
    \u0275\u0275listener("change", function AutomationLabComponent_Conditional_1_Conditional_40_Template_select_change_15_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.replay.speed.set(+$event.target.value));
    });
    \u0275\u0275elementStart(16, "option", 43);
    \u0275\u0275text(17, "0.5\xD7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 44);
    \u0275\u0275text(19, "1\xD7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 45);
    \u0275\u0275text(21, "2\xD7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 46);
    \u0275\u0275text(23, "4\xD7");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(24, "label", 47);
    \u0275\u0275text(25, "Replay timeline");
    \u0275\u0275elementStart(26, "input", 48);
    \u0275\u0275listener("input", function AutomationLabComponent_Conditional_1_Conditional_40_Template_input_input_26_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.replay.seek(+$event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "p");
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "number");
    \u0275\u0275pipe(30, "number");
    \u0275\u0275pipe(31, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p");
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(35, AutomationLabComponent_Conditional_1_Conditional_40_Conditional_35_Template, 2, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.replay.playing() ? "\u2161 Pause" : "\u25B6 Play replay", " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r2.replay.playing() || ctx_r2.replay.timeMs() <= 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.replay.playing());
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r2.replay.speed());
    \u0275\u0275advance(11);
    \u0275\u0275property("max", ctx_r2.replay.duration())("value", ctx_r2.replay.timeMs());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Position ", \u0275\u0275pipeBind2(29, 12, ctx_r2.pose().xCm, "1.0-1"), ", ", \u0275\u0275pipeBind2(30, 15, ctx_r2.pose().yCm, "1.0-1"), " cm \xB7 Heading ", \u0275\u0275pipeBind2(31, 18, ctx_r2.pose().headingDeg, "1.0-0"), "\xB0 ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" Battery ", \u0275\u0275pipeBind2(34, 21, ctx_r2.replay.current()?.batteryUsed ?? 0, "1.1-1"), " / ", ctx_r2.runtime.challenge().batteryCapacity ?? ctx_r2.runtime.config.robot.batteryCapacity, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.replayFinished() ? 35 : -1);
  }
}
function AutomationLabComponent_Conditional_1_Conditional_50_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_50_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.openReasoning());
    });
    \u0275\u0275text(1, "Reasoning");
    \u0275\u0275elementEnd();
  }
}
function AutomationLabComponent_Conditional_1_Conditional_50_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_50_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.watchLatest());
    });
    \u0275\u0275text(1, "Watch latest attempt");
    \u0275\u0275elementEnd();
  }
}
function AutomationLabComponent_Conditional_1_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_50_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.run());
    });
    \u0275\u0275text(1, " \u25B6 Run program ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, AutomationLabComponent_Conditional_1_Conditional_50_Conditional_2_Template, 2, 0, "button")(3, AutomationLabComponent_Conditional_1_Conditional_50_Conditional_3_Template, 2, 0, "button");
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r2.runtime.canEdit() || !ctx_r2.runtime.draft().program.commands.length);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.runtime.reasoningOpened() ? 2 : ctx_r2.runtime.currentTrials().length ? 3 : -1);
  }
}
function AutomationLabComponent_Conditional_1_Conditional_51_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trial_r15 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", trial_r15.deliveriesCompleted, " deliveries \xB7 ", trial_r15.collisions, " collisions ");
  }
}
function AutomationLabComponent_Conditional_1_Conditional_51_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_51_Conditional_0_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.openReasoning());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.reasoningOpened() ? "Reason & revise" : "Explain what happened", " ");
  }
}
function AutomationLabComponent_Conditional_1_Conditional_51_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_51_Conditional_0_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.panel.set("evidence"));
    });
    \u0275\u0275text(1, "Compare trials");
    \u0275\u0275elementEnd();
  }
}
function AutomationLabComponent_Conditional_1_Conditional_51_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, AutomationLabComponent_Conditional_1_Conditional_51_Conditional_0_Conditional_6_Template, 2, 2, "p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 56);
    \u0275\u0275conditionalCreate(8, AutomationLabComponent_Conditional_1_Conditional_51_Conditional_0_Conditional_8_Template, 2, 1, "button", 57);
    \u0275\u0275conditionalCreate(9, AutomationLabComponent_Conditional_1_Conditional_51_Conditional_0_Conditional_9_Template, 2, 0, "button");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trial_r15 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trial_r15.completedMission ? "\u2713 Mission complete" : trial_r15.stoppedReason);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(5, 5, trial_r15.distanceCm, "1.0-1"), " cm travelled");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.shownCourse().packages.length ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.runtime.sample ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.currentTrials().length >= 2 ? 9 : -1);
  }
}
function AutomationLabComponent_Conditional_1_Conditional_51_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 52);
    \u0275\u0275text(1, "Watch your run. Then explain what happened.");
    \u0275\u0275elementEnd();
  }
}
function AutomationLabComponent_Conditional_1_Conditional_51_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_51_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.edit());
    });
    \u0275\u0275text(1, "Edit program");
    \u0275\u0275elementEnd();
  }
}
function AutomationLabComponent_Conditional_1_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AutomationLabComponent_Conditional_1_Conditional_51_Conditional_0_Template, 10, 8)(1, AutomationLabComponent_Conditional_1_Conditional_51_Conditional_1_Template, 2, 0, "p", 52);
    \u0275\u0275elementStart(2, "details", 53)(3, "summary");
    \u0275\u0275text(4, "Recorded code");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "app-command-editor", 54);
    \u0275\u0275conditionalCreate(6, AutomationLabComponent_Conditional_1_Conditional_51_Conditional_6_Template, 2, 0, "button");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r2.replayFinished() ? 0 : 1);
    \u0275\u0275advance(5);
    \u0275\u0275property("snapshot", ctx.version.program)("activeId", ctx_r2.replay.current()?.activeCommandId ?? "");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.runtime.sample ? 6 : -1);
  }
}
function AutomationLabComponent_Conditional_1_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 31, 4)(2, "button", 59);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_52_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.edit());
    });
    \u0275\u0275text(3, "\u2190 Back to code");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "app-math-workbench", 60);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("hidden", !ctx_r2.reasoningView());
    \u0275\u0275advance(4);
    \u0275\u0275property("allowLink", ctx_r2.reasoningView() || !ctx_r2.replayMode());
  }
}
function AutomationLabComponent_Conditional_1_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.runtime.message());
  }
}
function AutomationLabComponent_Conditional_1_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 33)(1, "button", 59);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_54_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.panel.set("workspace"));
    });
    \u0275\u0275text(2, "\u2190 Back to robot");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-automation-evidence", 61);
    \u0275\u0275listener("replay", function AutomationLabComponent_Conditional_1_Conditional_54_Template_app_automation_evidence_replay_3_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.showTrial($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("view", ctx_r2.panel() === "portfolio" ? "portfolio" : "trials");
  }
}
function AutomationLabComponent_Conditional_1_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 33)(1, "button", 59);
    \u0275\u0275listener("click", function AutomationLabComponent_Conditional_1_Conditional_55_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.panel.set("workspace"));
    });
    \u0275\u0275text(2, "\u2190 Back to robot");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-championship-panel", 62);
    \u0275\u0275listener("replay", function AutomationLabComponent_Conditional_1_Conditional_55_Template_app_championship_panel_replay_3_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.showTrial($event));
    })("selected", function AutomationLabComponent_Conditional_1_Conditional_55_Template_app_championship_panel_selected_3_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.edit();
      return \u0275\u0275resetView(ctx_r2.panel.set("workspace"));
    });
    \u0275\u0275elementEnd()();
  }
}
function AutomationLabComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "main", 5)(1, "app-workspace-tools", 6, 0)(3, "span", 7);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 8)(6, "label", 9);
    \u0275\u0275text(7, "View ");
    \u0275\u0275elementStart(8, "select", 10);
    \u0275\u0275listener("change", function AutomationLabComponent_Conditional_1_Template_select_change_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const workspaceTools_r2 = \u0275\u0275reference(2);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.panel.set($event.target.value);
      return \u0275\u0275resetView(workspaceTools_r2.close(true));
    });
    \u0275\u0275elementStart(9, "option", 11);
    \u0275\u0275text(10, "Workspace");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 12);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 13);
    \u0275\u0275text(14, "Final defense & portfolio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 14);
    \u0275\u0275text(16, "Championship");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(17, AutomationLabComponent_Conditional_1_Conditional_17_Template, 5, 1, "label", 15);
    \u0275\u0275elementStart(18, "app-task-guide", 16)(19, "section", 17)(20, "h3");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, AutomationLabComponent_Conditional_1_Conditional_24_Template, 10, 2)(25, AutomationLabComponent_Conditional_1_Conditional_25_Template, 2, 0, "p")(26, AutomationLabComponent_Conditional_1_Conditional_26_Template, 2, 0, "p");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(27, "div", 18)(28, "section", 19)(29, "app-robot-course", 20, 1)(31, "div", 21)(32, "label");
    \u0275\u0275text(33, "Parking target");
    \u0275\u0275elementStart(34, "select", 22);
    \u0275\u0275listener("change", function AutomationLabComponent_Conditional_1_Template_select_change_34_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.changeTarget($event.target.value));
    });
    \u0275\u0275repeaterCreate(35, AutomationLabComponent_Conditional_1_For_36_Template, 2, 3, "option", 23, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "label", 24)(38, "input", 25);
    \u0275\u0275listener("change", function AutomationLabComponent_Conditional_1_Template_input_change_38_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.trace.set($event.target.checked));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(39, "Show path");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(40, AutomationLabComponent_Conditional_1_Conditional_40_Template, 36, 24, "div", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "section", 27, 2)(43, "div", 28)(44, "h1", 28);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 28)(47, "app-command-editor", 29, 3);
    \u0275\u0275listener("reasoning", function AutomationLabComponent_Conditional_1_Template_app_command_editor_reasoning_47_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openReasoning());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 30);
    \u0275\u0275conditionalCreate(50, AutomationLabComponent_Conditional_1_Conditional_50_Template, 4, 2);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(51, AutomationLabComponent_Conditional_1_Conditional_51_Template, 7, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(52, AutomationLabComponent_Conditional_1_Conditional_52_Template, 5, 2, "section", 31);
    \u0275\u0275conditionalCreate(53, AutomationLabComponent_Conditional_1_Conditional_53_Template, 2, 1, "p", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(54, AutomationLabComponent_Conditional_1_Conditional_54_Template, 4, 1, "section", 33)(55, AutomationLabComponent_Conditional_1_Conditional_55_Template, 4, 0, "section", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_34_0;
    const programEditor_r22 = \u0275\u0275reference(48);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("error", ctx_r2.runtime.saveStatus().startsWith("Save failed") ? ctx_r2.runtime.saveStatus() : void 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.runtime.sample ? "Finished student example" : ctx_r2.runtime.saveStatus());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.panel());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Trial review (", ctx_r2.runtime.state().trials.length, ")");
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.panel() === "workspace" ? 17 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.runtime.challenge().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.challenge().mission);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.panel() === "workspace" ? 24 : ctx_r2.panel() === "evidence" ? 25 : 26);
    \u0275\u0275advance(3);
    \u0275\u0275property("hidden", ctx_r2.panel() !== "workspace");
    \u0275\u0275advance(2);
    \u0275\u0275property("course", ctx_r2.shownCourse())("robotRadiusCm", ctx_r2.replay.trial()?.version?.robot?.radiusCm ?? ctx_r2.runtime.config.robot.radiusCm)("targetIndex", ctx_r2.shownTarget())("sample", ctx_r2.replay.current())("samples", ctx_r2.replay.trial()?.pathSamples ?? \u0275\u0275pureFunction0(32, _c32))("events", ctx_r2.replay.trial()?.events ?? \u0275\u0275pureFunction0(33, _c32))("result", ctx_r2.replay.trial())("showTrace", ctx_r2.trace());
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r2.shownTarget())("disabled", !ctx_r2.runtime.canEdit() || ctx_r2.replayMode());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.shownCourse().targets);
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx_r2.trace());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.replayMode() ? 40 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("hidden", ctx_r2.reasoningView());
    \u0275\u0275advance();
    \u0275\u0275property("hidden", !ctx_r2.replayMode() && programEditor_r22.paletteOpen());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.replayMode() ? ctx_r2.replayFinished() ? ctx_r2.runtime.sample ? "What does this run show?" : "What will you change?" : "Where does the robot stop?" : ctx_r2.runtime.challenge().mission, " ");
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r2.replayMode());
    \u0275\u0275advance();
    \u0275\u0275property("snapshot", ctx_r2.replayMode() ? ctx_r2.runtime.draft().program : void 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("hidden", programEditor_r22.paletteOpen());
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.runtime.sample ? 50 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_34_0 = ctx_r2.replay.trial()) ? 51 : -1, tmp_34_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.reasoningOpened() ? 52 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.message() && !ctx_r2.replayMode() ? 53 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.panel() === "evidence" || ctx_r2.panel() === "portfolio" ? 54 : ctx_r2.panel() === "championship" ? 55 : -1);
  }
}
var AutomationLabComponent = class _AutomationLabComponent {
  runtime = inject(AutomationRuntimeService);
  commandLabels = commandLabels;
  commandDescriptions = commandDescriptions;
  replay = inject(RobotReplayService);
  panel = signal(
    "workspace",
    ...ngDevMode ? [{ debugName: "panel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reasoningView = signal(
    false,
    ...ngDevMode ? [{ debugName: "reasoningView" }] : (
      /* istanbul ignore next */
      []
    )
  );
  taskPanel = viewChild(
    "taskPanel",
    ...ngDevMode ? [{ debugName: "taskPanel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  trace = signal(
    true,
    ...ngDevMode ? [{ debugName: "trace" }] : (
      /* istanbul ignore next */
      []
    )
  );
  replayMode = signal(
    false,
    ...ngDevMode ? [{ debugName: "replayMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  mathPanel = viewChild(
    "mathPanel",
    ...ngDevMode ? [{ debugName: "mathPanel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  courseView = viewChild("courseView", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "courseView" } : (
    /* istanbul ignore next */
    {}
  )), { read: ElementRef }));
  replayFinished = computed(
    () => !!this.replay.trial() && this.replay.timeMs() >= this.replay.duration(),
    ...ngDevMode ? [{ debugName: "replayFinished" }] : (
      /* istanbul ignore next */
      []
    )
  );
  shownCourse = computed(
    () => this.replayMode() && this.replay.trial() ? this.replay.trial().version.course : this.runtime.course(),
    ...ngDevMode ? [{ debugName: "shownCourse" }] : (
      /* istanbul ignore next */
      []
    )
  );
  shownTarget = computed(
    () => this.replayMode() && this.replay.trial() ? this.replay.trial().version.targetIndex : this.runtime.draft().targetIndex,
    ...ngDevMode ? [{ debugName: "shownTarget" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pose = computed(
    () => this.replay.current() ?? this.shownCourse().startPose,
    ...ngDevMode ? [{ debugName: "pose" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    bindLessonFocus((lesson) => {
      if (this.runtime.testingWorkspace)
        return;
      const target = lesson.focusTarget;
      if (target === "workspace" || target === "evidence" || target === "championship")
        this.panel.set(target);
    });
    effect(() => {
      if (this.panel() !== "workspace")
        this.replay.pause();
    });
    effect(() => {
      const trial = this.replay.trial();
      if (this.panel() === "workspace" && trial && this.replayFinished())
        this.runtime.observeTrial(trial.id);
    });
    if (this.runtime.sample) {
      const trial = this.runtime.currentTrials().at(-1);
      if (trial) {
        this.replay.load(trial);
        this.replayMode.set(true);
        this.replay.seek(this.replay.duration());
      }
    }
  }
  choose(id) {
    this.edit();
    this.runtime.selectChallenge(id);
    if (this.runtime.sample) {
      const trial = this.runtime.currentTrials().at(-1);
      if (trial) {
        this.replay.load(trial);
        this.replayMode.set(true);
        this.replay.seek(this.replay.duration());
      }
    }
  }
  run() {
    const trial = this.runtime.runPractice();
    if (trial)
      this.showTrial(trial);
  }
  openReasoning() {
    this.runtime.openReasoning();
    if (!this.runtime.reasoningOpened())
      return;
    this.replay.pause();
    this.reasoningView.set(true);
    afterNextRender(() => {
      const panel = this.mathPanel()?.nativeElement;
      panel?.querySelector("h2")?.scrollIntoView({ block: "nearest" });
      panel?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  watchLatest() {
    const trial = this.runtime.currentTrials().filter((t) => t.mode === "practice").at(-1);
    if (trial)
      this.showTrial(trial);
  }
  showTrial(trial) {
    this.reasoningView.set(false);
    if (this.runtime.challenge().id !== trial.challengeId)
      this.runtime.selectChallenge(trial.challengeId);
    this.replayMode.set(true);
    this.replay.load(trial, !(typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches));
    this.panel.set("workspace");
    afterNextRender(() => {
      const course = this.courseView()?.nativeElement;
      course?.scrollIntoView({ block: "nearest" });
      course?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  edit() {
    this.replay.pause();
    this.replay.timeMs.set(0);
    this.replay.trial.set(void 0);
    this.replayMode.set(false);
    this.reasoningView.set(false);
    afterNextRender(() => {
      const task = this.taskPanel()?.nativeElement;
      task?.scrollIntoView({ block: "nearest" });
      task?.querySelector("input:not(:disabled), button")?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  changeTarget(index) {
    this.edit();
    this.runtime.setTarget(Number(index));
  }
  static \u0275fac = function AutomationLabComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AutomationLabComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AutomationLabComponent, selectors: [["app-automation-lab"]], viewQuery: function AutomationLabComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.taskPanel, _c07, 5)(ctx.mathPanel, _c14, 5)(ctx.courseView, _c22, 5, ElementRef);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(3);
    }
  }, features: [\u0275\u0275ProvidersFeature([RobotReplayService])], decls: 2, vars: 1, consts: [["workspaceTools", ""], ["courseView", ""], ["taskPanel", ""], ["programEditor", ""], ["mathPanel", ""], [1, "lab"], [3, "error"], ["role", "status", 1, "save"], [1, "header-controls"], [1, "view-choice"], ["aria-label", "Lab section", 3, "change", "value"], ["value", "workspace"], ["value", "evidence"], ["value", "portfolio"], ["value", "championship"], ["for", "robot-mission", 1, "mission-choice"], ["title", "Robot workspace guide"], [1, "guide-section"], [1, "workspace", 3, "hidden"], ["aria-label", "Robot course", 1, "course-panel"], ["tabindex", "-1", 3, "course", "robotRadiusCm", "targetIndex", "sample", "samples", "events", "result", "showTrace"], [1, "settings"], ["aria-label", "Parking target", 3, "change", "value", "disabled"], [3, "value", "selected"], [1, "check"], ["type", "checkbox", 3, "change", "checked"], [1, "replay-controls"], ["tabindex", "-1", "aria-label", "Current robot task", 1, "task-panel"], [3, "hidden"], [3, "reasoning", "snapshot"], [1, "task-actions", 3, "hidden"], ["tabindex", "-1", "aria-label", "Reasoning and math", 3, "hidden"], ["role", "status", 1, "action-status"], [1, "wide-panel"], ["id", "robot-mission", 3, "change", "value"], [3, "value", "selected", "disabled"], [1, "guide-steps"], [1, "guide-reference"], [1, "reference-command"], [3, "type"], [3, "click"], [3, "click", "disabled"], ["aria-label", "Replay speed", 3, "change", "value"], ["value", "0.5"], ["value", "1"], ["value", "2"], ["value", "4"], [1, "scrubber"], ["type", "range", "min", "0", "step", "50", 3, "input", "max", "value"], [1, "event"], [1, "event", 3, "click"], [1, "run", 3, "click", "disabled"], ["role", "status", 1, "watch-prompt"], [1, "recorded-code"], [3, "snapshot", "activeId"], ["role", "status", 1, "run-result"], [1, "task-actions"], [1, "run"], [1, "run", 3, "click"], [1, "back", 3, "click"], [3, "allowLink"], [3, "replay", "view"], [3, "replay", "selected"]], template: function AutomationLabComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, AutomationLabComponent_Conditional_0_Template, 1, 0, "app-automation-week-workspace")(1, AutomationLabComponent_Conditional_1_Template, 56, 34, "main", 5);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.runtime.testingWorkspace ? 0 : 1);
    }
  }, dependencies: [
    AutomationWeekWorkspaceComponent,
    WorkspaceToolsComponent,
    RobotCourseComponent,
    CommandEditorComponent,
    MathWorkbenchComponent,
    AutomationEvidenceComponent,
    ChampionshipPanelComponent,
    CommandGraphicComponent,
    TaskGuideComponent,
    DecimalPipe
  ], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #203b4d;\n  font-family:\n    Inter,\n    system-ui,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n[hidden][_ngcontent-%COMP%] {\n  display: none !important;\n}\n.lab[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  background: #152b2b;\n}\n.workspace[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 1fr);\n  max-width: 1560px;\n  margin: auto;\n  padding: 72px 24px 24px;\n  gap: 32px;\n  align-items: start;\n}\n.course-panel[_ngcontent-%COMP%] {\n  min-width: 0;\n  color: #d7e6df;\n}\n.task-panel[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 28px;\n  border-radius: 16px;\n  background: #eef0e7;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: clamp(21px, 2.1vw, 29px);\n  line-height: 1.3;\n  font-weight: 650;\n  margin: 0 0 24px;\n  letter-spacing: -0.5px;\n}\n.task-actions[_ngcontent-%COMP%], \n.settings[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-items: center;\n}\n.task-actions[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  font: inherit;\n  font-size: 14px;\n  min-height: 44px;\n  border: 1px solid #acbdb5;\n  border-radius: 8px;\n  padding: 10px 14px;\n  background: #fff;\n  color: #203e36;\n}\nbutton[_ngcontent-%COMP%], \nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.run[_ngcontent-%COMP%] {\n  background: #e6bb6e;\n  border-color: #d7a753;\n  color: #202e29;\n  font-weight: 750;\n}\n.task-actions[_ngcontent-%COMP%]   .run[_ngcontent-%COMP%] {\n  flex: 1 1 160px;\n}\nsummary[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 12px 0;\n  font-size: 13px;\n}\n.course-options[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.settings[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  font-size: 13px;\n}\n.replay-controls[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n.replay-controls[_ngcontent-%COMP%]    > details[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.replay-controls[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.scrubber[_ngcontent-%COMP%] {\n  display: block;\n  margin: 12px 0;\n  font-size: 13px;\n}\n.scrubber[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  accent-color: #e6bb6e;\n}\n.event[_ngcontent-%COMP%] {\n  display: block;\n  text-align: left;\n  width: 100%;\n  margin-top: 6px;\n}\n.run-result[_ngcontent-%COMP%] {\n  line-height: 1.5;\n}\n.run-result[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.run-result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #496158;\n}\n.recorded-code[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.watch-prompt[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.6;\n}\n.back[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  padding-left: 0;\n  margin-bottom: 12px;\n}\n.action-status[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.5;\n  margin: 20px 0 0;\n}\n.wide-panel[_ngcontent-%COMP%] {\n  max-width: 1560px;\n  margin: auto;\n  min-height: 100dvh;\n  padding: 72px 24px 24px;\n  background: #152b2b;\n}\n.wide-panel[_ngcontent-%COMP%]    > .back[_ngcontent-%COMP%] {\n  color: #d7e6df;\n}\n.header-controls[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n}\n.header-controls[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  font-size: 13px;\n}\n.header-controls[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.save[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 16px;\n  font-size: 13px;\n}\n.guide-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.guide-steps[_ngcontent-%COMP%] {\n  line-height: 1.6;\n}\n.guide-steps[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n.reference-command[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin: 16px 0;\n}\n.reference-command[_ngcontent-%COMP%]   app-command-graphic[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  flex-shrink: 0;\n}\n.reference-command[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0;\n}\n[_ngcontent-%COMP%]:is(button, input, select, summary):focus-visible {\n  outline: 3px solid #bd790b;\n  outline-offset: 3px;\n}\n@media (max-width: 850px) {\n  .workspace[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n    max-width: 650px;\n    padding: 70px 14px 24px;\n    gap: 16px;\n  }\n  .task-panel[_ngcontent-%COMP%] {\n    padding: 20px 16px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 22px;\n    margin-bottom: 18px;\n  }\n  .wide-panel[_ngcontent-%COMP%] {\n    padding: 70px 16px 24px;\n  }\n}\n/*# sourceMappingURL=automation-lab.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutomationLabComponent, [{
    type: Component,
    args: [{ selector: "app-automation-lab", imports: [
      AutomationWeekWorkspaceComponent,
      WorkspaceToolsComponent,
      DecimalPipe,
      RobotCourseComponent,
      CommandEditorComponent,
      MathWorkbenchComponent,
      AutomationEvidenceComponent,
      ChampionshipPanelComponent,
      CommandGraphicComponent,
      TaskGuideComponent
    ], providers: [RobotReplayService], template: `@if (runtime.testingWorkspace) {
  <app-automation-week-workspace />
} @else {
<main class="lab">
  <app-workspace-tools
    #workspaceTools
    [error]="runtime.saveStatus().startsWith('Save failed') ? runtime.saveStatus() : undefined"
  >
    <span class="save" role="status">{{
      runtime.sample ? 'Finished student example' : runtime.saveStatus()
    }}</span>
    <div class="header-controls">
      <label class="view-choice"
        >View
        <select
          aria-label="Lab section"
          [value]="panel()"
          (change)="panel.set($any($event.target).value); workspaceTools.close(true)"
        >
          <option value="workspace">Workspace</option>
          <option value="evidence">Trial review ({{ runtime.state().trials.length }})</option>
          <option value="portfolio">Final defense & portfolio</option>
          <option value="championship">Championship</option>
        </select>
      </label>
      @if (panel() === 'workspace') {
        <label class="mission-choice" for="robot-mission"
          >Mission
          <select
            id="robot-mission"
            [value]="runtime.challenge().id"
            (change)="choose($any($event.target).value); workspaceTools.close()"
          >
            @for (challenge of runtime.config.challenges; track challenge.id) {
              <option
                [value]="challenge.id"
                [selected]="challenge.id === runtime.challenge().id"
                [disabled]="
                  challenge.id === runtime.config.championshipChallengeId &&
                  !runtime.state().championship.revealed
                "
              >
                {{ challenge.title
                }}{{ runtime.state().drafts[challenge.id].completedAt ? ' \u2713' : '' }}
              </option>
            }
          </select>
        </label>
      }
      <app-task-guide title="Robot workspace guide">
        <section class="guide-section">
          <h3>{{ runtime.challenge().title }}</h3>
          <p>{{ runtime.challenge().mission }}</p>
          @if (panel() === 'workspace') {
            @if (runtime.sample) {
              <p>
                This is a recorded student example. Use Play replay, Step, and the timeline to
                follow each block. Switch missions to explore another recorded program; its code and
                saved calculations are read-only.
              </p>
            } @else {
              <ol class="guide-steps">
                <li>
                  <strong>Make a guess.</strong>
                  {{
                    runtime.challenge().discovery?.instructions ??
                      'Add blocks to build your route. Enter a number you think could work.'
                  }}
                </li>
                <li>
                  <strong>Run and watch.</strong> Press Run program beside the course. Notice where
                  the robot stops and which way it faces. Pause, step, or use the timeline to review
                  the whole run.
                </li>
                <li>
                  <strong>Reason and revise.</strong> After watching a run to its end, open
                  reasoning & math. Use your observations to calculate and explain your next change.
                </li>
              </ol>
            }
            <details class="guide-reference">
              <summary>How the coding blocks work</summary>
              <p>
                Blocks run from top to bottom. Fill the white slots with numbers, fractions, or
                named values. In a Move math block, the mission supplies the given number and
                operation; enter your number in the white slot. The result controls how far the
                robot moves. Drag a block by its icon/name, or use its \u2022\u2022\u2022 options to move, copy,
                remove, or disable it. Speed is also in the options.
              </p>
              @for (type of runtime.challenge().allowedCommands; track type) {
                <div class="reference-command">
                  <app-command-graphic [type]="type" />
                  <div>
                    <strong>{{ commandLabels[type] }}</strong>
                    <p>{{ commandDescriptions[type] }}</p>
                  </div>
                </div>
              }
            </details>
            @if (runtime.reasoningOpened()) {
              <details class="guide-reference">
                <summary>Mission hint</summary>
                <p>{{ runtime.challenge().hint }}</p>
              </details>
            }
          } @else if (panel() === 'evidence') {
            <p>
              Compare your recorded trials, replay a run, and explain what you changed. Your
              portfolio brings together the code, math, and evidence you have already saved.
            </p>
          } @else {
            <p>
              Use the championship controls to practice, review your evidence, and lock your tested
              program when it is ready.
            </p>
          }
        </section>
      </app-task-guide>
    </div>
  </app-workspace-tools>
  <div class="workspace" [hidden]="panel() !== 'workspace'">
    <section class="course-panel" aria-label="Robot course">
      <app-robot-course
        #courseView
        tabindex="-1"
        [course]="shownCourse()"
        [robotRadiusCm]="replay.trial()?.version?.robot?.radiusCm ?? runtime.config.robot.radiusCm"
        [targetIndex]="shownTarget()"
        [sample]="replay.current()"
        [samples]="replay.trial()?.pathSamples ?? []"
        [events]="replay.trial()?.events ?? []"
        [result]="replay.trial()"
        [showTrace]="trace()"
      >
        <div class="settings">
          <label
            >Parking target<select
              aria-label="Parking target"
              [value]="shownTarget()"
              (change)="changeTarget($any($event.target).value)"
              [disabled]="!runtime.canEdit() || replayMode()"
            >
              @for (target of shownCourse().targets; track $index) {
                <option [value]="$index" [selected]="$index === shownTarget()">
                  {{ target.label }}
                </option>
              }
            </select></label
          >
          <label class="check"
            ><input
              type="checkbox"
              [checked]="trace()"
              (change)="trace.set($any($event.target).checked)"
            />Show path</label
          >
        </div>
      </app-robot-course>
      @if (replayMode()) {
        <div class="replay-controls">
          <button (click)="replay.playing() ? replay.pause() : replay.play()">
            {{ replay.playing() ? '\u2161 Pause' : '\u25B6 Play replay' }}
          </button>
          <details>
            <summary>Replay details</summary>
            <div class="settings">
              <button
                (click)="replay.stepBack()"
                [disabled]="replay.playing() || replay.timeMs() <= 0"
              >
                Step back
              </button>
              <button (click)="replay.step()" [disabled]="replay.playing()">Step</button>
              <button (click)="replay.reset()">Reset replay</button>
              <label
                >Speed<select
                  aria-label="Replay speed"
                  [value]="replay.speed()"
                  (change)="replay.speed.set(+$any($event.target).value)"
                >
                  <option value="0.5">0.5\xD7</option>
                  <option value="1">1\xD7</option>
                  <option value="2">2\xD7</option>
                  <option value="4">4\xD7</option>
                </select></label
              >
            </div>
            <label class="scrubber"
              >Replay timeline<input
                type="range"
                min="0"
                [max]="replay.duration()"
                step="50"
                [value]="replay.timeMs()"
                (input)="replay.seek(+$any($event.target).value)"
            /></label>
            <p>
              Position {{ pose().xCm | number: '1.0-1' }}, {{ pose().yCm | number: '1.0-1' }} cm \xB7
              Heading {{ pose().headingDeg | number: '1.0-0' }}\xB0
            </p>
            <p>
              Battery {{ replay.current()?.batteryUsed ?? 0 | number: '1.1-1' }} /
              {{ runtime.challenge().batteryCapacity ?? runtime.config.robot.batteryCapacity }}
            </p>
            @if (replayFinished()) {
              @for (event of replay.trial()?.events; track $index) {
                <button
                  class="event"
                  (click)="replay.seek(event.timeMs); runtime.selectCommand(event.commandId)"
                >
                  {{ event.timeMs / 1000 | number: '1.1-1' }} s \xB7 {{ event.message }}
                </button>
              }
            }
          </details>
        </div>
      }
    </section>
    <section class="task-panel" #taskPanel tabindex="-1" aria-label="Current robot task">
      <div [hidden]="reasoningView()">
        <h1 [hidden]="!replayMode() && programEditor.paletteOpen()">
          {{
            replayMode()
              ? replayFinished()
                ? runtime.sample
                  ? 'What does this run show?'
                  : 'What will you change?'
                : 'Where does the robot stop?'
              : runtime.challenge().mission
          }}
        </h1>
        <div [hidden]="replayMode()">
          <app-command-editor
            #programEditor
            [snapshot]="replayMode() ? runtime.draft().program : undefined"
            (reasoning)="openReasoning()"
          />
          <div class="task-actions" [hidden]="programEditor.paletteOpen()">
            @if (!runtime.sample) {
              <button
                class="run"
                (click)="run()"
                [disabled]="!runtime.canEdit() || !runtime.draft().program.commands.length"
              >
                \u25B6 Run program
              </button>
              @if (runtime.reasoningOpened()) {
                <button (click)="openReasoning()">Reasoning</button>
              } @else if (runtime.currentTrials().length) {
                <button (click)="watchLatest()">Watch latest attempt</button>
              }
            }
          </div>
        </div>
        @if (replay.trial(); as trial) {
          @if (replayFinished()) {
            <div class="run-result" role="status">
              <strong>{{
                trial.completedMission ? '\u2713 Mission complete' : trial.stoppedReason
              }}</strong>
              <p>{{ trial.distanceCm | number: '1.0-1' }} cm travelled</p>
              @if (shownCourse().packages.length) {
                <p>
                  {{ trial.deliveriesCompleted }} deliveries \xB7 {{ trial.collisions }} collisions
                </p>
              }
            </div>
            <div class="task-actions">
              @if (!runtime.sample) {
                <button class="run" (click)="openReasoning()">
                  {{ runtime.reasoningOpened() ? 'Reason & revise' : 'Explain what happened' }}
                </button>
              }
              @if (runtime.currentTrials().length >= 2) {
                <button (click)="panel.set('evidence')">Compare trials</button>
              }
            </div>
          } @else {
            <p class="watch-prompt" role="status">Watch your run. Then explain what happened.</p>
          }
          <details class="recorded-code">
            <summary>Recorded code</summary>
            <app-command-editor
              [snapshot]="trial.version.program"
              [activeId]="replay.current()?.activeCommandId ?? ''"
            />
            @if (!runtime.sample) {
              <button (click)="edit()">Edit program</button>
            }
          </details>
        }
      </div>
      @if (runtime.reasoningOpened()) {
        <section
          #mathPanel
          tabindex="-1"
          aria-label="Reasoning and math"
          [hidden]="!reasoningView()"
        >
          <button class="back" (click)="edit()">\u2190 Back to code</button>
          <app-math-workbench [allowLink]="reasoningView() || !replayMode()" />
        </section>
      }
      @if (runtime.message() && !replayMode()) {
        <p class="action-status" role="status">{{ runtime.message() }}</p>
      }
    </section>
  </div>
  @if (panel() === 'evidence' || panel() === 'portfolio') {
    <section class="wide-panel">
      <button class="back" (click)="panel.set('workspace')">\u2190 Back to robot</button
      ><app-automation-evidence
        [view]="panel() === 'portfolio' ? 'portfolio' : 'trials'"
        (replay)="showTrial($event)"
      />
    </section>
  } @else if (panel() === 'championship') {
    <section class="wide-panel">
      <button class="back" (click)="panel.set('workspace')">\u2190 Back to robot</button>
      <app-championship-panel
        (replay)="showTrial($event)"
        (selected)="edit(); panel.set('workspace')"
      />
    </section>
  }
</main>
}
`, styles: ["/* src/app/templates/programming-automation/ui/automation-lab.component.css */\n:host {\n  display: block;\n  color: #203b4d;\n  font-family:\n    Inter,\n    system-ui,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n[hidden] {\n  display: none !important;\n}\n.lab {\n  min-height: 100dvh;\n  background: #152b2b;\n}\n.workspace {\n  display: grid;\n  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 1fr);\n  max-width: 1560px;\n  margin: auto;\n  padding: 72px 24px 24px;\n  gap: 32px;\n  align-items: start;\n}\n.course-panel {\n  min-width: 0;\n  color: #d7e6df;\n}\n.task-panel {\n  min-width: 0;\n  padding: 28px;\n  border-radius: 16px;\n  background: #eef0e7;\n}\nh1 {\n  font-size: clamp(21px, 2.1vw, 29px);\n  line-height: 1.3;\n  font-weight: 650;\n  margin: 0 0 24px;\n  letter-spacing: -0.5px;\n}\n.task-actions,\n.settings {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-items: center;\n}\n.task-actions {\n  margin-top: 20px;\n}\nbutton,\nselect {\n  font: inherit;\n  font-size: 14px;\n  min-height: 44px;\n  border: 1px solid #acbdb5;\n  border-radius: 8px;\n  padding: 10px 14px;\n  background: #fff;\n  color: #203e36;\n}\nbutton,\nsummary {\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.run {\n  background: #e6bb6e;\n  border-color: #d7a753;\n  color: #202e29;\n  font-weight: 750;\n}\n.task-actions .run {\n  flex: 1 1 160px;\n}\nsummary {\n  min-height: 44px;\n  padding: 12px 0;\n  font-size: 13px;\n}\n.course-options {\n  margin-top: 8px;\n}\n.settings label {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  font-size: 13px;\n}\n.replay-controls {\n  margin-top: 10px;\n}\n.replay-controls > details {\n  margin-top: 8px;\n}\n.replay-controls p {\n  font-size: 13px;\n}\n.scrubber {\n  display: block;\n  margin: 12px 0;\n  font-size: 13px;\n}\n.scrubber input {\n  display: block;\n  width: 100%;\n  accent-color: #e6bb6e;\n}\n.event {\n  display: block;\n  text-align: left;\n  width: 100%;\n  margin-top: 6px;\n}\n.run-result {\n  line-height: 1.5;\n}\n.run-result strong {\n  font-size: 18px;\n}\n.run-result p {\n  font-size: 14px;\n  color: #496158;\n}\n.recorded-code {\n  margin-top: 24px;\n}\n.watch-prompt {\n  font-size: 15px;\n  line-height: 1.6;\n}\n.back {\n  border: 0;\n  background: transparent;\n  padding-left: 0;\n  margin-bottom: 12px;\n}\n.action-status {\n  font-size: 13px;\n  line-height: 1.5;\n  margin: 20px 0 0;\n}\n.wide-panel {\n  max-width: 1560px;\n  margin: auto;\n  min-height: 100dvh;\n  padding: 72px 24px 24px;\n  background: #152b2b;\n}\n.wide-panel > .back {\n  color: #d7e6df;\n}\n.header-controls {\n  display: grid;\n  gap: 16px;\n}\n.header-controls label {\n  display: grid;\n  gap: 6px;\n  font-size: 13px;\n}\n.header-controls select {\n  width: 100%;\n}\n.save {\n  display: block;\n  margin-bottom: 16px;\n  font-size: 13px;\n}\n.guide-section p,\n.guide-steps {\n  line-height: 1.6;\n}\n.guide-steps li {\n  margin: 12px 0;\n}\n.reference-command {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin: 16px 0;\n}\n.reference-command app-command-graphic {\n  width: 36px;\n  height: 36px;\n  flex-shrink: 0;\n}\n.reference-command p {\n  margin: 4px 0;\n}\n:is(button, input, select, summary):focus-visible {\n  outline: 3px solid #bd790b;\n  outline-offset: 3px;\n}\n@media (max-width: 850px) {\n  .workspace {\n    grid-template-columns: minmax(0, 1fr);\n    max-width: 650px;\n    padding: 70px 14px 24px;\n    gap: 16px;\n  }\n  .task-panel {\n    padding: 20px 16px;\n  }\n  h1 {\n    font-size: 22px;\n    margin-bottom: 18px;\n  }\n  .wide-panel {\n    padding: 70px 16px 24px;\n  }\n}\n/*# sourceMappingURL=automation-lab.component.css.map */\n"] }]
  }], () => [], { taskPanel: [{ type: ViewChild, args: ["taskPanel", { isSignal: true }] }], mathPanel: [{ type: ViewChild, args: ["mathPanel", { isSignal: true }] }], courseView: [{ type: ViewChild, args: ["courseView", __spreadProps(__spreadValues({}, {
    read: ElementRef
  }), { isSignal: true })] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AutomationLabComponent, { className: "AutomationLabComponent", filePath: "src/app/templates/programming-automation/ui/automation-lab.component.ts", lineNumber: 48 });
})();

export {
  AutomationLabComponent
};
//# debugId=d76435dd-bc1a-564c-953a-0aa8cf1798f7
//# sourceMappingURL=chunk-Q2AA6IYB.js.map
