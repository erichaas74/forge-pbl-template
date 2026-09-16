import {
  ExpeditionNavigation,
  worldDistance
} from "./chunk-GAXYVDGI.js";
import {
  ESCAPE_MISSION
} from "./chunk-RWLVM3VX.js";
import "./chunk-7HMNGV54.js";
import "./chunk-RRITUMP7.js";
import "./chunk-YQ5R4IZP.js";
import "./chunk-RAYONVPN.js";
import "./chunk-NRR2X4JL.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  setClassMetadata,
  signal,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-E2VJWGUE.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/escape/domain/expedition-tour.ts
function expeditionTour(mission) {
  if (!mission.world) throw new Error("The route example needs an expedition map.");
  const world = mission.world;
  const navigation = new ExpeditionNavigation(world, world.spawn, true);
  return mission.steps.map((step) => {
    const destination = { x: step.x * world.width / 100, y: step.y * world.height / 100 };
    if (!navigation.navigate(destination)) throw new Error(`No map route reaches ${step.place}.`);
    const points = [
      __spreadValues({}, navigation.position),
      ...navigation.route.map((point) => ({ x: point.x, y: point.y }))
    ];
    navigation.position = destination;
    return {
      points,
      length: points.slice(1).reduce((sum, point, i) => sum + worldDistance(points[i], point), 0)
    };
  });
}
function traceTourLeg(leg, progress) {
  if (progress >= 1) return leg.points;
  let remaining = Math.max(0, Math.min(1, progress)) * leg.length;
  const points = [leg.points[0]];
  for (let i = 1; i < leg.points.length; i++) {
    const a = leg.points[i - 1], b = leg.points[i], distance = worldDistance(a, b);
    if (remaining >= distance) {
      points.push(b);
      remaining -= distance;
    } else {
      const t = distance ? remaining / distance : 1;
      points.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
      break;
    }
  }
  return points;
}

// src/app/templates/heist/escape/expedition/expedition-example.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ExpeditionExampleComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "polyline", 17)(1, "polyline", 18);
  }
  if (rf & 2) {
    const leg_r1 = ctx.$implicit;
    const \u0275$index_17_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("points", ctx_r2.points(leg_r1.points));
    \u0275\u0275advance();
    \u0275\u0275classProp("visited", \u0275$index_17_r2 < ctx_r2.index());
    \u0275\u0275attribute("points", ctx_r2.points(leg_r1.points));
  }
}
function ExpeditionExampleComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "g");
    \u0275\u0275domElement(1, "circle", 19);
    \u0275\u0275domElementStart(2, "text", 20);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const stop_r4 = ctx.$implicit;
    const \u0275$index_24_r5 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("current", \u0275$index_24_r5 === ctx_r2.index());
    \u0275\u0275attribute("transform", "translate(" + stop_r4.x * ctx_r2.world.width / 100 + "," + stop_r4.y * ctx_r2.world.height / 100 + ")");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275$index_24_r5 + 1);
  }
}
function ExpeditionExampleComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 21);
    \u0275\u0275domListener("click", function ExpeditionExampleComponent_Conditional_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.playing.set(!ctx_r2.playing()));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r2.finished());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.playing() ? "Pause" : "Play", " ");
  }
}
function ExpeditionExampleComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 12);
    \u0275\u0275domListener("click", function ExpeditionExampleComponent_For_28_Template_button_click_0_listener() {
      const \u0275$index_57_r8 = \u0275\u0275restoreView(_r7).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.select(\u0275$index_57_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const stop_r9 = ctx.$implicit;
    const \u0275$index_57_r8 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-current", ctx_r2.index() === \u0275$index_57_r8 ? "step" : null)("aria-label", "Lock " + (\u0275$index_57_r8 + 1) + ": " + stop_r9.place);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275$index_57_r8 + 1, " ");
  }
}
var ExpeditionExampleComponent = class _ExpeditionExampleComponent {
  mission = inject(ESCAPE_MISSION);
  world = this.mission.world;
  legs = expeditionTour(this.mission);
  index = signal(
    0,
    ...ngDevMode ? [{ debugName: "index" }] : (
      /* istanbul ignore next */
      []
    )
  );
  elapsed = signal(
    0,
    ...ngDevMode ? [{ debugName: "elapsed" }] : (
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
  playing = signal(
    !this.reducedMotion(),
    ...ngDevMode ? [{ debugName: "playing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finished = signal(
    false,
    ...ngDevMode ? [{ debugName: "finished" }] : (
      /* istanbul ignore next */
      []
    )
  );
  step = computed(
    () => this.mission.steps[this.index()],
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  trace = computed(
    () => traceTourLeg(this.legs[this.index()], this.elapsed() / 3),
    ...ngDevMode ? [{ debugName: "trace" }] : (
      /* istanbul ignore next */
      []
    )
  );
  position = computed(
    () => this.trace().at(-1),
    ...ngDevMode ? [{ debugName: "position" }] : (
      /* istanbul ignore next */
      []
    )
  );
  arrived = computed(
    () => this.elapsed() >= 3,
    ...ngDevMode ? [{ debugName: "arrived" }] : (
      /* istanbul ignore next */
      []
    )
  );
  route = computed(
    () => this.points(this.trace()),
    ...ngDevMode ? [{ debugName: "route" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    let frame = 0, previous = 0;
    const animate = (time) => {
      if (previous && !document.hidden)
        this.advance(Math.min((time - previous) / 1e3, 0.1));
      previous = time;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(frame));
  }
  points(points) {
    return points.map((point) => `${point.x},${point.y}`).join(" ");
  }
  advance(seconds) {
    if (!this.playing() || !Number.isFinite(seconds) || seconds <= 0)
      return;
    this.elapsed.update((time) => time + seconds);
    if (this.elapsed() < 4.5)
      return;
    if (this.index() === this.legs.length - 1) {
      this.finished.set(true);
      this.playing.set(false);
    } else {
      this.index.update((index) => index + 1);
      this.elapsed.set(0);
    }
  }
  select(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.legs.length)
      return;
    this.playing.set(false);
    this.finished.set(false);
    this.index.set(index);
    this.elapsed.set(3);
  }
  replay() {
    this.index.set(0);
    this.elapsed.set(this.reducedMotion() ? 3 : 0);
    this.finished.set(false);
    this.playing.set(!this.reducedMotion());
  }
  static \u0275fac = function ExpeditionExampleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExpeditionExampleComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExpeditionExampleComponent, selectors: [["app-expedition-example"]], decls: 33, vars: 14, consts: [[1, "route-example"], [1, "tour-question"], [1, "map"], ["role", "img"], [1, "route-active"], [3, "current"], ["r", "17", 1, "traveler-glow"], ["r", "8", 1, "traveler"], [1, "tour-controls"], ["aria-live", "polite", "aria-atomic", "true", 1, "stop-caption"], [1, "playback"], ["type", "button", 3, "disabled"], ["type", "button", 3, "click"], ["aria-label", "Example route stops", 1, "stops"], ["type", "button"], [1, "stop-note"], [1, "example-note"], [1, "route-shadow"], [1, "route-base"], ["r", "23", 1, "stop"], ["text-anchor", "middle", "dy", "7", 1, "stop-number"], ["type", "button", 3, "click", "disabled"]], template: function ExpeditionExampleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "main", 0)(1, "div", 1)(2, "span");
      \u0275\u0275text(3, "Final example \xB7 Rescue route");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "h1");
      \u0275\u0275text(5, "How does the rescue reach every lock?");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(6, "div", 2);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(7, "svg", 3);
      \u0275\u0275domElement(8, "image");
      \u0275\u0275repeaterCreate(9, ExpeditionExampleComponent_For_10_Template, 2, 4, null, null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275domElement(11, "polyline", 4);
      \u0275\u0275repeaterCreate(12, ExpeditionExampleComponent_For_13_Template, 4, 4, ":svg:g", 5, _forTrack0);
      \u0275\u0275domElement(14, "circle", 6)(15, "circle", 7);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(16, "div", 8)(17, "div", 9)(18, "small");
      \u0275\u0275text(19);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(20, "strong");
      \u0275\u0275text(21);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(22, "div", 10);
      \u0275\u0275conditionalCreate(23, ExpeditionExampleComponent_Conditional_23_Template, 2, 2, "button", 11);
      \u0275\u0275domElementStart(24, "button", 12);
      \u0275\u0275domListener("click", function ExpeditionExampleComponent_Template_button_click_24_listener() {
        return ctx.replay();
      });
      \u0275\u0275text(25, "Replay route");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElementStart(26, "nav", 13);
      \u0275\u0275repeaterCreate(27, ExpeditionExampleComponent_For_28_Template, 2, 3, "button", 14, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(29, "p", 15);
      \u0275\u0275text(30);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(31, "small", 16);
      \u0275\u0275text(32, "Illustrated example \xB7 Your rescue progress is unchanged");
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275attribute("viewBox", "0 0 " + ctx.world.width + " " + ctx.world.height)("aria-label", "Castle map with a rescue path from the entrance to all " + ctx.mission.steps.length + " locks");
      \u0275\u0275advance();
      \u0275\u0275attribute("href", ctx.mission.environment)("width", ctx.world.width)("height", ctx.world.height);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.legs);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("points", ctx.route());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.mission.steps);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("cx", ctx.position().x)("cy", ctx.position().y);
      \u0275\u0275advance();
      \u0275\u0275attribute("cx", ctx.position().x)("cy", ctx.position().y);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.finished() ? "Route complete" : "Lock " + (ctx.index() + 1) + " / " + ctx.mission.steps.length);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.step().place);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.reducedMotion() ? 23 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.mission.steps);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.arrived() ? ctx.step().explanation : "Follow the gold path to the next lock.", " ");
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  background: #071c25;\n  color: #f6ebd2;\n  font-family: "Trebuchet MS", sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.route-example[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  padding: 20px 20px 24px;\n  text-align: center;\n}\n.tour-question[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n}\n.tour-question[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #bdc8bf;\n  font-size: 12px;\n}\n.tour-question[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 7px 0;\n  font: 500 clamp(20px, 3vw, 30px) Georgia, serif;\n}\n.map[_ngcontent-%COMP%] {\n  position: relative;\n  margin: auto;\n  max-width: min(1120px, (100dvh - 260px) * 1.5);\n  min-width: min(100%, 320px);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid rgba(187, 166, 120, 0.3333333333);\n  background: #0c2027;\n}\nsvg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: auto;\n}\npolyline[_ngcontent-%COMP%] {\n  fill: none;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.route-shadow[_ngcontent-%COMP%] {\n  stroke: rgba(4, 22, 29, 0.8784313725);\n  stroke-width: 13;\n}\n.route-base[_ngcontent-%COMP%] {\n  stroke: #ffe3a2;\n  stroke-opacity: 0.25;\n  stroke-width: 5;\n  stroke-dasharray: 7 10;\n}\n.visited[_ngcontent-%COMP%] {\n  stroke: #87dbbb;\n  stroke-opacity: 0.9;\n  stroke-dasharray: none;\n}\n.route-active[_ngcontent-%COMP%] {\n  stroke: #ffdc88;\n  stroke-width: 7;\n}\n.stop[_ngcontent-%COMP%] {\n  fill: #102e37;\n  stroke: #c4b389;\n  stroke-width: 3;\n}\n.current[_ngcontent-%COMP%]   .stop[_ngcontent-%COMP%] {\n  fill: #eaca82;\n  stroke: #fff0c0;\n  stroke-width: 5;\n}\n.stop-number[_ngcontent-%COMP%] {\n  fill: #fff1cd;\n  font: bold 22px Arial, sans-serif;\n}\n.current[_ngcontent-%COMP%]   .stop-number[_ngcontent-%COMP%] {\n  fill: #112d35;\n}\n.traveler-glow[_ngcontent-%COMP%] {\n  fill: rgba(255, 226, 150, 0.3137254902);\n}\n.traveler[_ngcontent-%COMP%] {\n  fill: #fff8d5;\n  stroke: #d9943c;\n  stroke-width: 3;\n}\n.tour-controls[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  padding: 12px 16px;\n  background: rgba(10, 35, 43, 0.9607843137);\n}\n.stop-caption[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 3px;\n}\n.stop-caption[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #b9c6bd;\n}\n.stop-caption[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.playback[_ngcontent-%COMP%], \n.stops[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  justify-content: center;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 44px;\n  min-width: 44px;\n  border: 1px solid rgba(152, 181, 165, 0.4);\n  border-radius: 7px;\n  color: inherit;\n  background: #14363e;\n  padding: 8px 12px;\n  font: inherit;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #a3efdb;\n  outline-offset: 3px;\n}\nbutton[aria-current][_ngcontent-%COMP%] {\n  background: #eaca82;\n  color: #0e2b35;\n  border-color: #ffe7aa;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.stops[_ngcontent-%COMP%] {\n  margin: 16px auto 0;\n  flex-wrap: wrap;\n}\n.stop-note[_ngcontent-%COMP%] {\n  max-width: 740px;\n  margin: 12px auto;\n  line-height: 1.5;\n  min-height: 3em;\n  color: #d2dfd5;\n}\n.example-note[_ngcontent-%COMP%] {\n  color: #9caea8;\n}\n@media (max-width: 600px) {\n  .route-example[_ngcontent-%COMP%] {\n    padding: 20px 10px 20px;\n  }\n  .map[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .tour-controls[_ngcontent-%COMP%] {\n    padding: 10px;\n    flex-wrap: wrap;\n  }\n  .stops[_ngcontent-%COMP%] {\n    gap: 4px;\n  }\n  .stops[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 6px;\n  }\n  .stop-note[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=expedition-example.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExpeditionExampleComponent, [{
    type: Component,
    args: [{ selector: "app-expedition-example", changeDetection: ChangeDetectionStrategy.OnPush, template: `<main class="route-example">
  <div class="tour-question">
    <span>Final example \xB7 Rescue route</span>
    <h1>How does the rescue reach every lock?</h1>
  </div>
  <div class="map">
    <svg
      [attr.viewBox]="'0 0 ' + world.width + ' ' + world.height"
      role="img"
      [attr.aria-label]="
        'Castle map with a rescue path from the entrance to all ' + mission.steps.length + ' locks'
      "
    >
      <image
        [attr.href]="mission.environment"
        [attr.width]="world.width"
        [attr.height]="world.height"
      />
      @for (leg of legs; track $index; let i = $index) {
        <polyline class="route-shadow" [attr.points]="points(leg.points)" />
        <polyline
          class="route-base"
          [class.visited]="i < index()"
          [attr.points]="points(leg.points)"
        />
      }
      <polyline class="route-active" [attr.points]="route()" />
      @for (stop of mission.steps; track stop.id; let i = $index) {
        <g
          [attr.transform]="
            'translate(' + (stop.x * world.width) / 100 + ',' + (stop.y * world.height) / 100 + ')'
          "
          [class.current]="i === index()"
        >
          <circle class="stop" r="23" />
          <text class="stop-number" text-anchor="middle" dy="7">{{ i + 1 }}</text>
        </g>
      }
      <circle class="traveler-glow" [attr.cx]="position().x" [attr.cy]="position().y" r="17" />
      <circle class="traveler" [attr.cx]="position().x" [attr.cy]="position().y" r="8" />
    </svg>
    <div class="tour-controls">
      <div class="stop-caption" aria-live="polite" aria-atomic="true">
        <small>{{
          finished() ? 'Route complete' : 'Lock ' + (index() + 1) + ' / ' + mission.steps.length
        }}</small>
        <strong>{{ step().place }}</strong>
      </div>
      <div class="playback">
        @if (!reducedMotion()) {
          <button type="button" (click)="playing.set(!playing())" [disabled]="finished()">
            {{ playing() ? 'Pause' : 'Play' }}
          </button>
        }
        <button type="button" (click)="replay()">Replay route</button>
      </div>
    </div>
  </div>
  <nav class="stops" aria-label="Example route stops">
    @for (stop of mission.steps; track stop.id; let i = $index) {
      <button
        type="button"
        (click)="select(i)"
        [attr.aria-current]="index() === i ? 'step' : null"
        [attr.aria-label]="'Lock ' + (i + 1) + ': ' + stop.place"
      >
        {{ i + 1 }}
      </button>
    }
  </nav>
  <p class="stop-note">
    {{ arrived() ? step().explanation : 'Follow the gold path to the next lock.' }}
  </p>
  <small class="example-note">Illustrated example \xB7 Your rescue progress is unchanged</small>
</main>
`, styles: ['/* src/app/templates/heist/escape/expedition/expedition-example.component.scss */\n:host {\n  display: block;\n  background: #071c25;\n  color: #f6ebd2;\n  font-family: "Trebuchet MS", sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.route-example {\n  min-height: 100dvh;\n  padding: 20px 20px 24px;\n  text-align: center;\n}\n.tour-question {\n  margin-bottom: 14px;\n}\n.tour-question span {\n  color: #bdc8bf;\n  font-size: 12px;\n}\n.tour-question h1 {\n  margin: 7px 0;\n  font: 500 clamp(20px, 3vw, 30px) Georgia, serif;\n}\n.map {\n  position: relative;\n  margin: auto;\n  max-width: min(1120px, (100dvh - 260px) * 1.5);\n  min-width: min(100%, 320px);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid rgba(187, 166, 120, 0.3333333333);\n  background: #0c2027;\n}\nsvg {\n  display: block;\n  width: 100%;\n  height: auto;\n}\npolyline {\n  fill: none;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.route-shadow {\n  stroke: rgba(4, 22, 29, 0.8784313725);\n  stroke-width: 13;\n}\n.route-base {\n  stroke: #ffe3a2;\n  stroke-opacity: 0.25;\n  stroke-width: 5;\n  stroke-dasharray: 7 10;\n}\n.visited {\n  stroke: #87dbbb;\n  stroke-opacity: 0.9;\n  stroke-dasharray: none;\n}\n.route-active {\n  stroke: #ffdc88;\n  stroke-width: 7;\n}\n.stop {\n  fill: #102e37;\n  stroke: #c4b389;\n  stroke-width: 3;\n}\n.current .stop {\n  fill: #eaca82;\n  stroke: #fff0c0;\n  stroke-width: 5;\n}\n.stop-number {\n  fill: #fff1cd;\n  font: bold 22px Arial, sans-serif;\n}\n.current .stop-number {\n  fill: #112d35;\n}\n.traveler-glow {\n  fill: rgba(255, 226, 150, 0.3137254902);\n}\n.traveler {\n  fill: #fff8d5;\n  stroke: #d9943c;\n  stroke-width: 3;\n}\n.tour-controls {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  padding: 12px 16px;\n  background: rgba(10, 35, 43, 0.9607843137);\n}\n.stop-caption {\n  display: grid;\n  gap: 3px;\n}\n.stop-caption small {\n  color: #b9c6bd;\n}\n.stop-caption strong {\n  font-size: 17px;\n}\n.playback,\n.stops {\n  display: flex;\n  gap: 7px;\n  justify-content: center;\n}\nbutton {\n  min-height: 44px;\n  min-width: 44px;\n  border: 1px solid rgba(152, 181, 165, 0.4);\n  border-radius: 7px;\n  color: inherit;\n  background: #14363e;\n  padding: 8px 12px;\n  font: inherit;\n  cursor: pointer;\n}\nbutton:focus-visible {\n  outline: 3px solid #a3efdb;\n  outline-offset: 3px;\n}\nbutton[aria-current] {\n  background: #eaca82;\n  color: #0e2b35;\n  border-color: #ffe7aa;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.stops {\n  margin: 16px auto 0;\n  flex-wrap: wrap;\n}\n.stop-note {\n  max-width: 740px;\n  margin: 12px auto;\n  line-height: 1.5;\n  min-height: 3em;\n  color: #d2dfd5;\n}\n.example-note {\n  color: #9caea8;\n}\n@media (max-width: 600px) {\n  .route-example {\n    padding: 20px 10px 20px;\n  }\n  .map {\n    max-width: 100%;\n  }\n  .tour-controls {\n    padding: 10px;\n    flex-wrap: wrap;\n  }\n  .stops {\n    gap: 4px;\n  }\n  .stops button {\n    padding: 6px;\n  }\n  .stop-note {\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=expedition-example.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExpeditionExampleComponent, { className: "ExpeditionExampleComponent", filePath: "src/app/templates/heist/escape/expedition/expedition-example.component.ts", lineNumber: 19 });
})();
export {
  ExpeditionExampleComponent
};
//# debugId=88bfdb0b-f1a2-58ac-ae89-3baf7134c7f3
//# sourceMappingURL=chunk-UJIPMYAC.js.map
