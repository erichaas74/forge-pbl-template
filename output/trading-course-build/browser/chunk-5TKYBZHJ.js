import {
  balancePlacements,
  balanceReading,
  canPlaceBalanceWeight,
  emptyBalance,
  evaluateBalanceLock,
  formatPiece,
  scaleOffset,
  usesPiston
} from "./chunk-YQ5R4IZP.js";
import {
  emptyGears,
  evaluateGearLock,
  fractionLabel,
  gearFeedback,
  gearMotion,
  moveGear
} from "./chunk-RAYONVPN.js";
import {
  initialMachine,
  machineReading,
  reduceMachine
} from "./chunk-NRR2X4JL.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  InjectionToken,
  Input,
  Output,
  ViewChild,
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
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4,
  ɵɵviewQuery
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/escape/balance-lock/balance-lock.component.ts
var _c0 = ["stage"];
var _c1 = ["heading"];
var _c2 = ["expandButton"];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.index;
function BalanceLockComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 31);
    \u0275\u0275domListener("click", function BalanceLockComponent_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.leave.emit());
    });
    \u0275\u0275text(1, "\u2190 Back to castle");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r1.paused());
  }
}
function BalanceLockComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 29);
    \u0275\u0275domListener("click", function BalanceLockComponent_For_19_Template_button_click_0_listener() {
      const \u0275$index_30_r4 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.changeScale(\u0275$index_30_r4));
    });
    \u0275\u0275domElementStart(1, "span", 32);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275domElementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const scale_r5 = ctx.$implicit;
    const \u0275$index_30_r4 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r1.active() === \u0275$index_30_r4)("sealed", ctx_r1.readings()[\u0275$index_30_r4].balanced);
    \u0275\u0275domProperty("disabled", ctx_r1.paused());
    \u0275\u0275attribute("aria-current", ctx_r1.active() === \u0275$index_30_r4 ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.readings()[\u0275$index_30_r4].balanced ? "\u2713" : \u0275$index_30_r4 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(scale_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.readings()[\u0275$index_30_r4].balanced ? "PIN ALIGNED" : ctx_r1.readings()[\u0275$index_30_r4].difference < 0 ? "PIN TOO HIGH" : "PIN TOO LOW");
  }
}
function BalanceLockComponent_Conditional_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "strong");
    \u0275\u0275text(1, "The piston is the counterweight.");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(2, " Add weights to the left pan to match the mass printed on the hanging piston. A light pan lets the piston drop; a heavy pan lifts it. Equal mass levels the beam and lines up the piston cutout. Match all three pistons and the shared bolt opens automatically. Drag weights back to the tray to remove them. ");
  }
}
function BalanceLockComponent_Conditional_20_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "strong");
    \u0275\u0275text(1, "Equal mass opens the lock.");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(2, " Drag a weight onto either pan; drag it back to the tray to remove it. Each scale has its own rope and hanging brass pin. The heavier pan drops, moving that pin's middle cutout up or down. When every scale balances, the cutouts line up and the steel master bolt opens automatically. You can also select a block and tap a pan. ");
  }
}
function BalanceLockComponent_Conditional_20_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 33)(1, "button", 29);
    \u0275\u0275domListener("click", function BalanceLockComponent_Conditional_20_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.resetScale());
    });
    \u0275\u0275text(2, "Reset this scale");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.paused() || ctx_r1.locked());
  }
}
function BalanceLockComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "aside", 14);
    \u0275\u0275conditionalCreate(1, BalanceLockComponent_Conditional_20_Conditional_1_Template, 3, 0)(2, BalanceLockComponent_Conditional_20_Conditional_2_Template, 3, 0);
    \u0275\u0275conditionalCreate(3, BalanceLockComponent_Conditional_20_Conditional_3_Template, 3, 1, "div", 33);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.piston() ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.authoringPreview() ? 3 : -1);
  }
}
function BalanceLockComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "aside", 14);
    \u0275\u0275text(1, " Weights previously added beside the fixed load have returned to the tray. ");
    \u0275\u0275domElementEnd();
  }
}
function BalanceLockComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 19);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.error() ? "The mechanism could not load. The accessible weight controls below still work." : "Lighting the 3D workshop\u2026", " ");
  }
}
function BalanceLockComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 34);
    \u0275\u0275domListener("click", function BalanceLockComponent_Conditional_40_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.continued.emit());
    });
    \u0275\u0275text(1, " Return to the rescue \u2192 ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r1.paused());
  }
}
function BalanceLockComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 35);
    \u0275\u0275domListener("click", function BalanceLockComponent_Conditional_41_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.engage());
    });
    \u0275\u0275text(1, " Record this setup ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r1.paused());
  }
}
function BalanceLockComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 26);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.saveWarning());
  }
}
function BalanceLockComponent_Conditional_50_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 29);
    \u0275\u0275domListener("click", function BalanceLockComponent_Conditional_50_For_3_Template_button_click_0_listener() {
      const block_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.select(block_r11.index));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementStart(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const block_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || ctx_r1.paused());
    \u0275\u0275attribute("aria-pressed", ctx_r1.selected() === block_r11.index)("aria-label", "Select weight " + ctx_r1.format(block_r11.piece) + ", piece " + (block_r11.index - ctx_r1.offset() + 1));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.format(block_r11.piece));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(block_r11.side === 1 ? "LEFT PAN" : block_r11.side === 2 ? ctx_r1.piston() ? "WEIGHT PAN" : "RIGHT PAN" : "TRAY");
  }
}
function BalanceLockComponent_Conditional_50_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 29);
    \u0275\u0275domListener("click", function BalanceLockComponent_Conditional_50_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.placeSelected(1));
    });
    \u0275\u0275text(1, " Place on left pan ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("disabled", ctx_r1.selected() === null || ctx_r1.locked() || ctx_r1.paused());
  }
}
function BalanceLockComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 30)(1, "div", 36);
    \u0275\u0275repeaterCreate(2, BalanceLockComponent_Conditional_50_For_3_Template, 4, 5, "button", 37, _forTrack1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "div", 38);
    \u0275\u0275conditionalCreate(5, BalanceLockComponent_Conditional_50_Conditional_5_Template, 2, 1, "button", 37);
    \u0275\u0275domElementStart(6, "button", 29);
    \u0275\u0275domListener("click", function BalanceLockComponent_Conditional_50_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.placeSelected(2));
    });
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "button", 29);
    \u0275\u0275domListener("click", function BalanceLockComponent_Conditional_50_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.placeSelected(0));
    });
    \u0275\u0275text(9, " Return to tray ");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.blocks());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!ctx_r1.piston() ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.selected() === null || ctx_r1.locked() || ctx_r1.paused());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.piston() ? "Place on weight pan" : "Place on right pan");
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.selected() === null || ctx_r1.locked() || ctx_r1.paused());
  }
}
var BALANCE_SCENE_LOADER = new InjectionToken("BALANCE_SCENE_LOADER", {
  providedIn: "root",
  factory: () => () => import("./chunk-JQ3525MN.js")
});
var BalanceLockComponent = class _BalanceLockComponent {
  definition = input.required(
    ...ngDevMode ? [{ debugName: "definition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  authoringPreview = input(
    false,
    ...ngDevMode ? [{ debugName: "authoringPreview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  initialScale = input(
    0,
    ...ngDevMode ? [{ debugName: "initialScale" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tested = output();
  title = input(
    "Balance lock",
    ...ngDevMode ? [{ debugName: "title" }] : (
      /* istanbul ignore next */
      []
    )
  );
  placements = input(
    [],
    ...ngDevMode ? [{ debugName: "placements" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completed = input(
    false,
    ...ngDevMode ? [{ debugName: "completed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  paused = input(
    false,
    ...ngDevMode ? [{ debugName: "paused" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reducedMotion = input(
    false,
    ...ngDevMode ? [{ debugName: "reducedMotion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveWarning = input(
    "",
    ...ngDevMode ? [{ debugName: "saveWarning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  moved = output();
  solved = output();
  leave = output();
  pauseRequested = output();
  continued = output();
  sound = output();
  active = signal(
    0,
    ...ngDevMode ? [{ debugName: "active" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = signal(
    null,
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readings = computed(
    () => this.definition().scales.map((_, i) => balanceReading(this.definition(), i, this.positions())),
    ...ngDevMode ? [{ debugName: "readings" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sealed = computed(
    () => this.readings().flatMap((reading, i) => reading.balanced ? [i] : []),
    ...ngDevMode ? [{ debugName: "sealed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  allBalanced = computed(
    () => evaluateBalanceLock(this.definition(), this.positions()),
    ...ngDevMode ? [{ debugName: "allBalanced" }] : (
      /* istanbul ignore next */
      []
    )
  );
  released = signal(
    false,
    ...ngDevMode ? [{ debugName: "released" }] : (
      /* istanbul ignore next */
      []
    )
  );
  attempt = signal(
    0,
    ...ngDevMode ? [{ debugName: "attempt" }] : (
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
  error = signal(
    false,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  help = signal(
    false,
    ...ngDevMode ? [{ debugName: "help" }] : (
      /* istanbul ignore next */
      []
    )
  );
  controls = signal(
    false,
    ...ngDevMode ? [{ debugName: "controls" }] : (
      /* istanbul ignore next */
      []
    )
  );
  expanded = signal(
    false,
    ...ngDevMode ? [{ debugName: "expanded" }] : (
      /* istanbul ignore next */
      []
    )
  );
  notice = signal(
    "Pick up a weight. Drop it on a pan. Watch the beam settle.",
    ...ngDevMode ? [{ debugName: "notice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  piston = computed(
    () => usesPiston(this.definition()),
    ...ngDevMode ? [{ debugName: "piston" }] : (
      /* istanbul ignore next */
      []
    )
  );
  positions = computed(
    () => balancePlacements(this.definition(), this.placements().length ? this.placements() : emptyBalance(this.definition())),
    ...ngDevMode ? [{ debugName: "positions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scale = computed(
    () => this.definition().scales[this.active()],
    ...ngDevMode ? [{ debugName: "scale" }] : (
      /* istanbul ignore next */
      []
    )
  );
  offset = computed(
    () => scaleOffset(this.definition(), this.active()),
    ...ngDevMode ? [{ debugName: "offset" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reading = computed(
    () => balanceReading(this.definition(), this.active(), this.positions()),
    ...ngDevMode ? [{ debugName: "reading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  locked = computed(
    () => !this.authoringPreview() && this.completed(),
    ...ngDevMode ? [{ debugName: "locked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  blocks = computed(
    () => this.scale().pieces.map((piece, i) => ({
      piece,
      index: this.offset() + i,
      side: this.positions()[this.offset() + i]
    })),
    ...ngDevMode ? [{ debugName: "blocks" }] : (
      /* istanbul ignore next */
      []
    )
  );
  format = formatPiece;
  loader = inject(BALANCE_SCENE_LOADER);
  scene;
  destroyed = false;
  edited = false;
  stage;
  heading;
  expandButton;
  element = inject(ElementRef);
  constructor() {
    effect((onCleanup) => {
      if (!this.expanded())
        return;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      onCleanup(() => {
        document.body.style.overflow = previousOverflow;
      });
    });
    effect(() => {
      const balanced = this.allBalanced(), paused = this.paused();
      if (paused)
        return;
      untracked(() => {
        if (!balanced) {
          this.released.set(false);
          return;
        }
        if (this.released())
          return;
        this.released.set(true);
        this.notice.set("All cutouts align. The master bolt slides free automatically.");
        this.sound.emit("open");
        if (this.edited) {
          this.definition().scales.forEach((_, i) => this.tested.emit(i));
          this.edited = false;
        }
        if (!this.authoringPreview() && !this.completed())
          this.solved.emit();
      });
    });
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.scene?.destroy();
    });
  }
  async ngAfterViewInit() {
    if (this.authoringPreview() && Number.isInteger(this.initialScale()) && this.definition().scales[this.initialScale()])
      this.active.set(this.initialScale());
    if (this.stage.nativeElement.clientWidth > 0 && this.stage.nativeElement.clientWidth <= 600)
      this.controls.set(true);
    this.heading.nativeElement.focus({ preventScroll: true });
    try {
      const { mountBalanceScene } = await this.loader();
      if (this.destroyed)
        return;
      this.scene = mountBalanceScene(this.stage.nativeElement, this.definition(), () => ({
        active: this.active(),
        placements: this.positions(),
        selected: this.selected(),
        sealed: this.sealed(),
        completed: this.locked(),
        reducedMotion: this.reducedMotion(),
        paused: this.paused(),
        attempt: this.attempt()
      }), {
        select: (index) => this.select(index),
        place: (index, side) => this.place(index, side),
        ready: () => this.ready.set(true),
        failed: () => this.error.set(true),
        focus: (index) => this.changeScale(index)
      });
    } catch {
      this.error.set(true);
    }
  }
  select(index) {
    if (this.paused() || this.locked() || !this.blocks().some((b) => b.index === index))
      return;
    this.selected.set(index);
    this.notice.set(`${formatPiece(this.scale().pieces[index - this.offset()])} selected. Choose a pan or return it to the tray.`);
  }
  place(index, side) {
    if (this.paused() || this.locked() || !canPlaceBalanceWeight(this.definition(), side) || !this.blocks().some((b) => b.index === index))
      return;
    this.edited = true;
    this.moved.emit({ index, side });
    this.selected.set(null);
    this.sound.emit("turn");
    this.notice.set(side === 0 ? "Weight returned to its tray slot." : this.piston() ? "Weight placed. The pan and piston move in opposite directions." : "Weight placed. Watch which pan moves down.");
  }
  placeSelected(side) {
    const index = this.selected();
    if (index !== null)
      this.place(index, side);
  }
  changeScale(index) {
    if (this.paused() || !this.definition().scales[index])
      return;
    this.active.set(index);
    this.selected.set(null);
    this.attempt.set(0);
    this.notice.set(this.scale().instruction);
  }
  resetScale() {
    if (this.paused() || this.locked())
      return;
    this.edited = true;
    for (const b of this.blocks())
      this.moved.emit({ index: b.index, side: 0 });
    this.selected.set(null);
    this.attempt.set(0);
    this.notice.set("This scale is reset. Try a different combination.");
    this.sound.emit("turn");
  }
  engage() {
    if (this.paused() || this.locked())
      return;
    this.attempt.update((n) => n + 1);
    this.tested.emit(this.active());
    if (!this.reading().balanced) {
      this.notice.set(this.reading().feedback);
      this.sound.emit("wrong");
      return;
    }
    this.selected.set(null);
    this.notice.set(this.allBalanced() ? "Setup recorded. All cutouts align and the master bolt is open." : `${this.scale().title} is aligned. Balance every scale to open the master bolt.`);
  }
  nextSeal() {
    const index = this.definition().scales.findIndex((_, i) => !this.sealed().includes(i));
    if (index >= 0)
      this.changeScale(index);
  }
  retrySave() {
    if (!this.authoringPreview() && !this.paused() && evaluateBalanceLock(this.definition(), this.positions()))
      this.solved.emit();
  }
  toggleExpanded() {
    this.expanded.update((value) => !value);
    this.expandButton.nativeElement.focus({ preventScroll: true });
  }
  workshopKey(event) {
    if (!this.expanded())
      return;
    if (event.key === "Escape") {
      event.preventDefault();
      this.expanded.set(false);
      this.expandButton.nativeElement.focus({ preventScroll: true });
    } else if (event.key === "Tab") {
      const controls = Array.from(this.element.nativeElement.querySelectorAll('button:not(:disabled), input:not(:disabled), [tabindex="0"]')).filter((element) => element.getClientRects().length > 0);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  }
  static \u0275fac = function BalanceLockComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BalanceLockComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BalanceLockComponent, selectors: [["app-balance-lock"]], viewQuery: function BalanceLockComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7)(_c1, 7)(_c2, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.stage = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.heading = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.expandButton = _t.first);
    }
  }, hostVars: 4, hostBindings: function BalanceLockComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("week-preview", ctx.authoringPreview())("expanded-workshop", ctx.expanded());
    }
  }, inputs: { definition: [1, "definition"], authoringPreview: [1, "authoringPreview"], initialScale: [1, "initialScale"], title: [1, "title"], placements: [1, "placements"], completed: [1, "completed"], paused: [1, "paused"], reducedMotion: [1, "reducedMotion"], saveWarning: [1, "saveWarning"] }, outputs: { tested: "tested", moved: "moved", solved: "solved", leave: "leave", pauseRequested: "pauseRequested", continued: "continued", sound: "sound" }, decls: 51, vars: 37, consts: [["heading", ""], ["expandButton", ""], ["stage", ""], ["aria-label", "Balance lock workshop", 1, "chamber", "hanging-pin-chamber", 3, "keydown"], [1, "workshop-header"], [1, "back", 3, "disabled"], [1, "eyebrow"], ["tabindex", "-1"], [1, "header-tools"], [1, "help", "expand-workshop", 3, "click"], [1, "help", 3, "click"], ["aria-label", "Reset this scale", 1, "help", 3, "click", "disabled"], ["aria-label", "Connected balance seals", 1, "seals"], [3, "disabled", "active", "sealed"], [1, "instructions"], [1, "mechanism-brief", 3, "hidden"], ["role", "status"], [1, "stage-shell"], [1, "stage"], ["role", "status", 1, "loading"], [1, "workbench"], [1, "equilibrium"], [1, "equation"], ["role", "status", "aria-live", "polite", 1, "status"], [1, "primary", 3, "disabled"], [1, "record-trial", 3, "disabled"], ["role", "alert", 1, "save-warning"], [1, "tools-row"], [3, "click"], [3, "click", "disabled"], ["aria-label", "Weight placement controls", 1, "accessible-controls"], [1, "back", 3, "click", "disabled"], [1, "seal-medal"], [1, "preview-reset"], [1, "primary", 3, "click", "disabled"], [1, "record-trial", 3, "click", "disabled"], [1, "piece-buttons"], [3, "disabled"], [1, "pan-buttons"]], template: function BalanceLockComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 3);
      \u0275\u0275domListener("keydown", function BalanceLockComponent_Template_section_keydown_0_listener($event) {
        return ctx.workshopKey($event);
      });
      \u0275\u0275domElementStart(1, "header", 4);
      \u0275\u0275conditionalCreate(2, BalanceLockComponent_Conditional_2_Template, 2, 1, "button", 5);
      \u0275\u0275domElementStart(3, "div")(4, "p", 6);
      \u0275\u0275text(5, "THE KEEPER\u2019S WORKSHOP");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "h1", 7, 0);
      \u0275\u0275text(8);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(9, "div", 8)(10, "button", 9, 1);
      \u0275\u0275domListener("click", function BalanceLockComponent_Template_button_click_10_listener() {
        return ctx.toggleExpanded();
      });
      \u0275\u0275text(12);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(13, "button", 10);
      \u0275\u0275domListener("click", function BalanceLockComponent_Template_button_click_13_listener() {
        return ctx.pauseRequested.emit();
      });
      \u0275\u0275text(14);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(15, "button", 11);
      \u0275\u0275domListener("click", function BalanceLockComponent_Template_button_click_15_listener() {
        return ctx.resetScale();
      });
      \u0275\u0275text(16, "\u21BA");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(17, "nav", 12);
      \u0275\u0275repeaterCreate(18, BalanceLockComponent_For_19_Template, 7, 9, "button", 13, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(20, BalanceLockComponent_Conditional_20_Template, 4, 2, "aside", 14);
      \u0275\u0275domElementStart(21, "div", 15)(22, "p");
      \u0275\u0275text(23);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(24, "span", 16);
      \u0275\u0275text(25);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(26, BalanceLockComponent_Conditional_26_Template, 2, 0, "aside", 14);
      \u0275\u0275domElementStart(27, "div", 17);
      \u0275\u0275domElement(28, "div", 18, 2);
      \u0275\u0275conditionalCreate(30, BalanceLockComponent_Conditional_30_Template, 2, 1, "p", 19);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(31, "footer", 20)(32, "div", 21)(33, "div")(34, "p", 6);
      \u0275\u0275text(35);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(36, "p", 22);
      \u0275\u0275text(37);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(38, "p", 23);
      \u0275\u0275text(39);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(40, BalanceLockComponent_Conditional_40_Template, 2, 1, "button", 24)(41, BalanceLockComponent_Conditional_41_Template, 2, 1, "button", 25);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(42, BalanceLockComponent_Conditional_42_Template, 2, 1, "p", 26);
      \u0275\u0275domElementStart(43, "div", 27)(44, "button", 28);
      \u0275\u0275domListener("click", function BalanceLockComponent_Template_button_click_44_listener() {
        return ctx.controls.set(!ctx.controls());
      });
      \u0275\u0275text(45);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(46, "span");
      \u0275\u0275text(47);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(48, "button", 29);
      \u0275\u0275domListener("click", function BalanceLockComponent_Template_button_click_48_listener() {
        return ctx.resetScale();
      });
      \u0275\u0275text(49, "Reset this scale");
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(50, BalanceLockComponent_Conditional_50_Template, 10, 4, "div", 30);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("is-complete", ctx.released() || ctx.completed())("reduced-motion", ctx.reducedMotion())("has-renderer", ctx.ready() && !ctx.error());
      \u0275\u0275attribute("role", ctx.expanded() ? "dialog" : null)("aria-modal", ctx.expanded() ? "true" : null);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.authoringPreview() ? 2 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.title());
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-expanded", ctx.expanded())("aria-label", ctx.expanded() ? "Close expanded view" : "Expand workshop");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.expanded() ? "Close" : "Expand", " ");
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.paused() ? "Resume machine" : "Pause machine");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.paused() ? "Resume" : "Pause", " ");
      \u0275\u0275advance();
      \u0275\u0275domProperty("disabled", ctx.paused() || ctx.locked());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.definition().scales);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.help() && !ctx.authoringPreview() ? 20 : -1);
      \u0275\u0275advance();
      \u0275\u0275domProperty("hidden", ctx.authoringPreview());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.scale().instruction);
      \u0275\u0275advance();
      \u0275\u0275classProp("aligned", ctx.allBalanced());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.allBalanced() ? "ALL PINS ALIGNED \xB7 AUTO UNLOCK" : ctx.sealed().length + " / " + ctx.definition().scales.length + " PINS ALIGNED");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.piston() && ctx.placements().includes(1) ? 26 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(!ctx.ready() || ctx.error() ? 30 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.released() ? "MASTER BOLT RELEASED" : "LIVE BALANCE");
      \u0275\u0275advance();
      \u0275\u0275classProp("equal", ctx.reading().balanced);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.reading().equation);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.notice());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.completed() ? 40 : 41);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.saveWarning() ? 42 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-expanded", ctx.controls());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.controls() ? "Hide" : "Show", " keyboard / tap controls ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2("", ctx.piston() ? "Match the piston mass using the weight pan" : "Drag between either pan and the tray", " \xB7 ", ctx.scale().unit);
      \u0275\u0275advance();
      \u0275\u0275domProperty("disabled", ctx.paused() || ctx.locked());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.controls() || ctx.error() ? 50 : -1);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  color: #f6edcf;\n  font-family: Arial, sans-serif;\n  background: #091d26;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  color: inherit;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #a4f3d3;\n  outline-offset: 4px;\n}\nh1[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.chamber[_ngcontent-%COMP%] {\n  height: var(--%NS%expedition-lock-height, 100dvh);\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n  background:\n    radial-gradient(\n      ellipse at 50% 40%,\n      #29434b,\n      #081b24 75%);\n}\n.workshop-header[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n  padding: 20px 32px 14px;\n  border-bottom: 1px solid rgba(209, 184, 119, 0.1882352941);\n  background: #0b2028;\n}\n.workshop-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 2.7px;\n  color: #cdb983;\n  margin: 0 0 7px;\n}\nh1[_ngcontent-%COMP%] {\n  font: 30px Georgia, serif;\n  margin: 0;\n}\n.back[_ngcontent-%COMP%], \n.help[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px solid rgba(203, 182, 123, 0.3137254902);\n  border-radius: 7px;\n  padding: 11px 15px;\n  font-size: 13px;\n}\n.back[_ngcontent-%COMP%] {\n  border-color: transparent;\n}\n.seals[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 12px;\n  padding: 12px 18px;\n  background: #0b2028;\n  flex-shrink: 0;\n}\n.seals[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 216px;\n  padding: 10px 18px;\n  text-align: left;\n  border: 1px solid rgba(180, 161, 119, 0.2078431373);\n  background: #112a33;\n  border-radius: 8px;\n  font: 16px Georgia, serif;\n  transition: background 0.2s;\n}\n.seals[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #e8c57d;\n  background: #243941;\n  box-shadow: 0 0 22px rgba(232, 197, 125, 0.0705882353);\n}\n.seals[_ngcontent-%COMP%]   button.sealed[_ngcontent-%COMP%] {\n  border-color: #94d7b4;\n}\n.seals[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 4px;\n  font: 8px Arial, sans-serif;\n  letter-spacing: 1.8px;\n  color: #a9bcb6;\n}\n.seal-medal[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 31px;\n  height: 31px;\n  border: 1px solid #b9a373;\n  border-radius: 50%;\n  color: #f1d28e;\n}\n.sealed[_ngcontent-%COMP%]   .seal-medal[_ngcontent-%COMP%] {\n  color: #9ef1c8;\n  border-color: #9ef1c8;\n}\n.instructions[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 12px 30px;\n  background: #27434c;\n  line-height: 1.6;\n  font-size: 13px;\n}\n.instructions[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #f5d692;\n}\n.stage-shell[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  min-height: 300px;\n  overflow: hidden;\n  background: #091c25;\n}\n.stage[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.stage-instruction[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 15%;\n  right: 15%;\n  text-align: center;\n  font-size: 13px;\n  letter-spacing: 0.3px;\n  color: #f1e6c9;\n  text-shadow: 0 2px 8px #000;\n  padding: 10px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(11, 32, 40, 0.8666666667),\n      transparent);\n  pointer-events: none;\n  margin: 0;\n}\n.loading[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 35% 20% auto;\n  text-align: center;\n  background: #142f39;\n  padding: 20px;\n  border: 1px solid rgba(225, 199, 136, 0.4);\n}\n.release-banner[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10%;\n  left: 25%;\n  right: 25%;\n  padding: 22px;\n  text-align: center;\n  background: rgba(13, 42, 48, 0.9215686275);\n  border: 1px solid rgba(177, 241, 203, 0.6666666667);\n  border-radius: 12px;\n  box-shadow: 0 0 70px rgba(144, 255, 208, 0.2);\n  pointer-events: none;\n}\n.release-banner[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  color: #a7f7ce;\n  font-size: 23px;\n  margin-bottom: 5px;\n}\n.release-banner[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 30px Georgia, serif;\n  color: #d7ffe6;\n}\n.release-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #b1d6c6;\n}\n.workbench[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  background: linear-gradient(#132b32, #0a2029);\n  border-top: 1px solid rgba(215, 183, 115, 0.4);\n  padding: 14px 26px 9px;\n  box-shadow: 0 -10px 36px rgba(6, 20, 29, 0.4392156863);\n  z-index: 2;\n}\n.equilibrium[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 25px;\n}\n.equilibrium[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 260px;\n}\n.equation[_ngcontent-%COMP%] {\n  font: 27px Georgia, serif;\n  margin: 0;\n  color: #efd59a;\n}\n.equation.equal[_ngcontent-%COMP%] {\n  color: #b4f6d7;\n}\n.status[_ngcontent-%COMP%] {\n  flex: 1;\n  color: #afc7c6;\n  font-size: 12px;\n  line-height: 1.6;\n  max-width: 560px;\n  margin: 0 auto;\n}\n.primary[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  margin-left: auto;\n  border: 1px solid #f9dda0;\n  border-radius: 7px;\n  padding: 15px 23px;\n  background:\n    linear-gradient(\n      135deg,\n      #f1d792,\n      #b18a48);\n  color: #253238;\n  font-weight: bold;\n  font-size: 13px;\n  box-shadow: 0 4px 0 #776035, 0 0 22px rgba(231, 189, 107, 0.1254901961);\n}\n.primary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: 12px;\n  font-size: 18px;\n}\n.tools-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 15px;\n  margin-top: 10px;\n  font-size: 10px;\n  color: #8aacab;\n}\n.tools-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 0;\n  padding: 7px 0;\n  color: #c2d3ca;\n  font-size: 11px;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n}\n.accessible-controls[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(180, 182, 149, 0.1882352941);\n  margin-top: 8px;\n  padding-top: 10px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 25px;\n}\n.piece-buttons[_ngcontent-%COMP%], \n.pan-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.piece-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 60px;\n  background: #31434a;\n  border: 1px solid #9f916d;\n  border-radius: 5px;\n  padding: 7px 12px;\n  font: 17px Georgia, serif;\n}\n.piece-buttons[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: #aff4d9;\n  background: #35675f;\n}\n.piece-buttons[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 8px Arial, sans-serif;\n  margin-top: 5px;\n  color: #c4d1c8;\n  letter-spacing: 1px;\n}\n.pan-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: #183941;\n  border: 1px solid #6b9993;\n  border-radius: 5px;\n  padding: 12px;\n  font-size: 11px;\n}\n.save-warning[_ngcontent-%COMP%] {\n  color: #ffd29a;\n  font-size: 12px;\n}\n@media (max-width: 800px) {\n  .workshop-header[_ngcontent-%COMP%] {\n    padding: 12px;\n    gap: 8px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .eyebrow[_ngcontent-%COMP%] {\n    font-size: 8px;\n    letter-spacing: 1.5px;\n  }\n  .back[_ngcontent-%COMP%], \n   .help[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 8px;\n  }\n  .seals[_ngcontent-%COMP%] {\n    gap: 6px;\n    padding: 8px;\n  }\n  .seals[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    gap: 6px;\n    padding: 8px;\n    font-size: 12px;\n  }\n  .seals[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 6px;\n    letter-spacing: 0.5px;\n  }\n  .seal-medal[_ngcontent-%COMP%] {\n    width: 25px;\n    height: 25px;\n    flex-shrink: 0;\n  }\n  .stage-shell[_ngcontent-%COMP%] {\n    min-height: 290px;\n  }\n  .stage-instruction[_ngcontent-%COMP%] {\n    font-size: 11px;\n    left: 3%;\n    right: 3%;\n  }\n  .equilibrium[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 10px;\n  }\n  .equilibrium[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n  }\n  .equation[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .status[_ngcontent-%COMP%] {\n    order: 3;\n    flex-basis: 100%;\n    max-width: none;\n  }\n  .workbench[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .primary[_ngcontent-%COMP%] {\n    padding: 12px;\n    font-size: 11px;\n  }\n  .tools-row[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .accessible-controls[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 10px;\n  }\n  .piece-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 50px;\n    padding: 6px 10px;\n  }\n  .release-banner[_ngcontent-%COMP%] {\n    left: 12%;\n    right: 12%;\n  }\n  .release-banner[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 23px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    transition: none !important;\n  }\n}\n.header-tools[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n@media (max-width: 520px) {\n  .header-tools[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 3px;\n  }\n  .header-tools[_ngcontent-%COMP%]   .help[_ngcontent-%COMP%] {\n    padding: 5px 8px;\n  }\n}\n.release-banner[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_release-reveal 2.1s both;\n  left: 32%;\n  right: 32%;\n  padding: 16px;\n}\n@keyframes _ngcontent-%COMP%_release-reveal {\n  0%, 80% {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n.reduced-motion[_ngcontent-%COMP%]   .release-banner[_ngcontent-%COMP%] {\n  animation: none;\n}\n@media (max-width: 800px) {\n  .release-banner[_ngcontent-%COMP%] {\n    left: 12%;\n    right: 12%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .release-banner[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n@media (max-width: 600px) {\n  .stage-shell[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    height: calc(68vw + 24px);\n    min-height: 0;\n  }\n  .workbench[_ngcontent-%COMP%] {\n    flex: 1 0 auto;\n  }\n  .stage-instruction[_ngcontent-%COMP%] {\n    font-size: 10px;\n    padding: 5px;\n  }\n  .equilibrium[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%] {\n    padding: 12px 10px;\n  }\n  .accessible-controls[_ngcontent-%COMP%] {\n    gap: 14px;\n    padding-top: 15px;\n  }\n  .piece-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 55px;\n    min-height: 52px;\n  }\n  .pan-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-height: 44px;\n    padding: 10px;\n  }\n}\n/*# sourceMappingURL=balance-lock.component.css.map */", "\n.week-preview[_nghost-%COMP%]   .preview-action[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 10px 16px;\n  background: #23443f;\n  border-block: 1px solid rgba(140, 158, 117, 0.3333333333);\n  flex-shrink: 0;\n  font-size: 13px;\n}\n.week-preview[_nghost-%COMP%]   .preview-action[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  min-height: 44px;\n}\n.week-preview[_nghost-%COMP%]   .preview-action[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 12px;\n  color: #d1dfd4;\n}\n@media (max-width: 600px) {\n  .week-preview[_nghost-%COMP%]   .preview-action[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n.week-preview[_nghost-%COMP%] {\n  display: block;\n  position: relative;\n  inset: auto;\n  z-index: auto;\n  min-width: 0;\n}\n.week-preview[_nghost-%COMP%]   .workshop[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .chamber[_ngcontent-%COMP%] {\n  height: auto;\n  overflow: visible;\n}\n.week-preview[_nghost-%COMP%]   header[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .workshop-header[_ngcontent-%COMP%] {\n  padding: 12px 18px;\n  gap: 10px;\n}\n.week-preview[_nghost-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(20px, 2vw, 26px);\n}\n.week-preview[_nghost-%COMP%]   nav[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .seals[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 8px;\n}\n.week-preview[_nghost-%COMP%]   nav[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #315850;\n  border-color: #efcb82;\n}\n.week-preview[_nghost-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  height: clamp(250px, 30vw, 400px);\n  min-height: 250px;\n}\n.week-preview[_nghost-%COMP%]   .stage[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.week-preview[_nghost-%COMP%]   footer[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .workbench[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding: 12px 16px;\n}\n.week-preview[_nghost-%COMP%]   .operation[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .equilibrium[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .toolbar[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .tools-row[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .calibrations[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n}\n.week-preview[_nghost-%COMP%]   .mission[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .stage-instruction[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.5;\n}\n.week-preview[_nghost-%COMP%]   .control-card[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .inventory[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .actions[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .operation[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.week-preview[_nghost-%COMP%]   .loading[_ngcontent-%COMP%] {\n  left: 8%;\n  right: 8%;\n  padding: 12px;\n}\n@media (max-width: 600px) {\n  .week-preview[_nghost-%COMP%]   header[_ngcontent-%COMP%], \n   .week-preview[_nghost-%COMP%]   .workshop-header[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .week-preview[_nghost-%COMP%]   .workshop-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    text-align: left;\n  }\n  .week-preview[_nghost-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n    height: 270px;\n  }\n  .week-preview[_nghost-%COMP%]   .run-caption[_ngcontent-%COMP%] {\n    left: 8px;\n    right: 8px;\n  }\n  .week-preview[_nghost-%COMP%]   .calibrations[_ngcontent-%COMP%] {\n    gap: 8px;\n    padding: 10px;\n  }\n  .week-preview[_nghost-%COMP%]   .calibrations[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1 1 130px;\n  }\n  .week-preview[_nghost-%COMP%]   .seals[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1 1 95px;\n    min-width: 0;\n  }\n  .week-preview[_nghost-%COMP%]   button[_ngcontent-%COMP%] {\n    overflow-wrap: anywhere;\n  }\n}\n/*# sourceMappingURL=preview-machine.css.map */", "\n[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .mechanism-brief[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  padding: 12px 18px;\n  background: #203b3c;\n  border-block: 1px solid rgba(180, 160, 109, 0.2666666667);\n}\n[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .mechanism-brief[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  line-height: 1.5;\n  color: #e9dec6;\n}\n[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .mechanism-brief[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 0.7px;\n  color: #c1d1c8;\n  flex-shrink: 0;\n}\n[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .mechanism-brief[_ngcontent-%COMP%]    > span.aligned[_ngcontent-%COMP%] {\n  color: #acface;\n}\n[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n  height: auto;\n  min-height: 0;\n  flex: 0 0 auto;\n  overflow: visible;\n}\n[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .stage[_ngcontent-%COMP%] {\n  position: relative;\n  inset: auto;\n  width: 100%;\n  height: auto;\n}\n[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .record-trial[_ngcontent-%COMP%] {\n  padding: 10px 15px;\n  min-height: 44px;\n  border: 1px solid #788b7f;\n  border-radius: 6px;\n  background: #213c42;\n  color: #dfdac6;\n  font-size: 12px;\n}\n[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .seals[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .seals[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 0;\n  gap: 9px;\n  padding: 10px 12px;\n  font-size: 14px;\n}\n[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .seals[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 0.8px;\n}\n[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .equilibrium[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .equation[_ngcontent-%COMP%] {\n  font-size: 23px;\n}\n[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .workbench[_ngcontent-%COMP%] {\n  box-shadow: none;\n}\n@media (max-width: 600px) {\n  [_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .mechanism-brief[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 6px;\n    padding: 10px 12px;\n  }\n  [_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .seals[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: start;\n    gap: 5px;\n    font-size: 12px;\n    padding: 9px;\n  }\n  [_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .seals[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 8px;\n    letter-spacing: 0.2px;\n  }\n  [_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .tools-row[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n  height: auto;\n  min-height: 0;\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .stage[_ngcontent-%COMP%] {\n  position: relative;\n  height: auto;\n}\n[_nghost-%COMP%]   .expand-workshop[_ngcontent-%COMP%] {\n  border-color: #b9ae81;\n  background: #2b4545;\n  color: #f0e1b9;\n}\n.expanded-workshop[_nghost-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 2000;\n  overflow: auto;\n  background: #0b151b;\n  --%NS%balance-3d-height: clamp(420px, 58dvh, 780px);\n}\n.expanded-workshop[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  height: auto;\n  max-width: 1480px;\n  margin: 0 auto;\n}\n.expanded-workshop[_nghost-%COMP%]   .workshop-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 5;\n  background: #17282f;\n}\n.expanded-workshop[_nghost-%COMP%]   .workbench[_ngcontent-%COMP%] {\n  padding-bottom: 22px;\n}\n.expanded-workshop[_nghost-%COMP%]   .seals[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%] {\n  position: relative;\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .workshop-header[_ngcontent-%COMP%] {\n  padding: 9px 12px;\n  min-height: 52px;\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .workshop-header[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  display: none;\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .workshop-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0;\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .header-tools[_ngcontent-%COMP%] {\n  gap: 5px;\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .header-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 6px 8px;\n  min-height: 38px;\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .seals[_ngcontent-%COMP%] {\n  padding: 5px 9px;\n  gap: 6px;\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .seals[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 6px 9px;\n  font-size: 12px;\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .mechanism-brief[_ngcontent-%COMP%] {\n  display: none;\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .instructions[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  top: 58px;\n  width: min(370px, 100% - 24px);\n  padding: 16px;\n  z-index: 8;\n  border: 1px solid #96a992;\n  border-radius: 8px;\n  background: #19343e;\n  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4666666667);\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .preview-reset[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.week-preview[_nghost-%COMP%]   .hanging-pin-chamber.has-renderer[_ngcontent-%COMP%]   .workbench[_ngcontent-%COMP%] {\n  display: none;\n}\n.week-preview.expanded-workshop[_nghost-%COMP%] {\n  inset: 8px;\n  border: 1px solid #859787;\n  border-radius: 10px;\n  --%NS%balance-3d-height: max(300px,calc(100dvh - 340px));\n}\n.week-preview.expanded-workshop[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%] {\n  min-height: 0;\n}\n@media (max-width: 680px) {\n  .week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .workshop-header[_ngcontent-%COMP%] {\n    display: block;\n    padding: 8px;\n  }\n  .week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .workshop-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .header-tools[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n    margin-top: 6px;\n    gap: 4px;\n  }\n  .week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .header-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n    min-height: 40px;\n    padding: 5px;\n    font-size: 10px;\n  }\n  .week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .seals[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex-direction: row;\n    align-items: center;\n    padding: 6px;\n    gap: 4px;\n    font-size: 10px;\n  }\n  .week-preview[_nghost-%COMP%]   .hanging-pin-chamber[_ngcontent-%COMP%]   .seal-medal[_ngcontent-%COMP%] {\n    width: 19px;\n    height: 19px;\n    font-size: 11px;\n  }\n  .week-preview.expanded-workshop[_nghost-%COMP%] {\n    --%NS%balance-3d-height: 345px;\n  }\n}\n/*# sourceMappingURL=balance-lock.rebuild.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BalanceLockComponent, [{
    type: Component,
    args: [{ selector: "app-balance-lock", host: { "[class.week-preview]": "authoringPreview()", "[class.expanded-workshop]": "expanded()" }, changeDetection: ChangeDetectionStrategy.OnPush, template: `<section\r
  class="chamber hanging-pin-chamber"\r
  aria-label="Balance lock workshop"\r
  [class.is-complete]="released() || completed()"\r
  [class.reduced-motion]="reducedMotion()"\r
  [class.has-renderer]="ready() && !error()"\r
  [attr.role]="expanded() ? 'dialog' : null"\r
  [attr.aria-modal]="expanded() ? 'true' : null"\r
  (keydown)="workshopKey($event)"\r
>\r
  <header class="workshop-header">\r
    @if (!authoringPreview()) {\r
      <button class="back" (click)="leave.emit()" [disabled]="paused()">\u2190 Back to castle</button>\r
    }\r
    <div>\r
      <p class="eyebrow">THE KEEPER\u2019S WORKSHOP</p>\r
      <h1 #heading tabindex="-1">{{ title() }}</h1>\r
    </div>\r
    <div class="header-tools">\r
      <button\r
        #expandButton\r
        class="help expand-workshop"\r
        (click)="toggleExpanded()"\r
        [attr.aria-expanded]="expanded()"\r
        [attr.aria-label]="expanded() ? 'Close expanded view' : 'Expand workshop'"\r
      >\r
        {{ expanded() ? 'Close' : 'Expand' }}\r
      </button>\r
        <button class="help" (click)="pauseRequested.emit()" [attr.aria-label]="paused() ? 'Resume machine' : 'Pause machine'">
          {{ paused() ? 'Resume' : 'Pause' }}
        </button>
        <button class="help" (click)="resetScale()" [disabled]="paused() || locked()" aria-label="Reset this scale">\u21BA</button>
    </div>\r
  </header>\r
  <nav class="seals" aria-label="Connected balance seals">\r
    @for (scale of definition().scales; track scale.id; let i = $index) {\r
      <button\r
        (click)="changeScale(i)"\r
        [disabled]="paused()"\r
        [class.active]="active() === i"\r
        [class.sealed]="readings()[i].balanced"\r
        [attr.aria-current]="active() === i ? 'step' : null"\r
      >\r
        <span class="seal-medal">{{ readings()[i].balanced ? '\u2713' : i + 1 }}</span\r
        ><span\r
          >{{ scale.title\r
          }}<small>{{\r
            readings()[i].balanced\r
              ? 'PIN ALIGNED'\r
              : readings()[i].difference < 0\r
                ? 'PIN TOO HIGH'\r
                : 'PIN TOO LOW'\r
          }}</small></span\r
        >\r
      </button>\r
    }\r
  </nav>\r
  @if (help() && !authoringPreview()) {\r
    <aside class="instructions">\r
      @if (piston()) {\r
        <strong>The piston is the counterweight.</strong> Add weights to the left pan to match the\r
        mass printed on the hanging piston. A light pan lets the piston drop; a heavy pan lifts it.\r
        Equal mass levels the beam and lines up the piston cutout. Match all three pistons and the\r
        shared bolt opens automatically. Drag weights back to the tray to remove them.\r
      } @else {\r
        <strong>Equal mass opens the lock.</strong> Drag a weight onto either pan; drag it back to\r
        the tray to remove it. Each scale has its own rope and hanging brass pin. The heavier pan\r
        drops, moving that pin's middle cutout up or down. When every scale balances, the cutouts\r
        line up and the steel master bolt opens automatically. You can also select a block and tap a\r
        pan.\r
      }\r
      @if (authoringPreview()) {\r
        <div class="preview-reset"><button (click)="resetScale()" [disabled]="paused() || locked()">Reset this scale</button></div>\r
      }\r
    </aside>\r
  }\r
  <div class="mechanism-brief" [hidden]="authoringPreview()">\r
    <p>{{ scale().instruction }}</p>\r
    <span role="status" [class.aligned]="allBalanced()">{{\r
      allBalanced()\r
        ? 'ALL PINS ALIGNED \xB7 AUTO UNLOCK'\r
        : sealed().length + ' / ' + definition().scales.length + ' PINS ALIGNED'\r
    }}</span>\r
  </div>\r
  @if (piston() && placements().includes(1)) {\r
    <aside class="instructions">\r
      Weights previously added beside the fixed load have returned to the tray.\r
    </aside>\r
  }\r
  <div class="stage-shell">\r
    <div #stage class="stage"></div>\r
    @if (!ready() || error()) {\r
      <p class="loading" role="status">\r
        {{\r
          error()\r
            ? 'The mechanism could not load. The accessible weight controls below still work.'\r
            : 'Lighting the 3D workshop\u2026'\r
        }}\r
      </p>\r
    }\r
  </div>\r
  <footer class="workbench">\r
    <div class="equilibrium">\r
      <div>\r
        <p class="eyebrow">{{ released() ? 'MASTER BOLT RELEASED' : 'LIVE BALANCE' }}</p>\r
        <p class="equation" [class.equal]="reading().balanced">{{ reading().equation }}</p>\r
      </div>\r
      <p class="status" role="status" aria-live="polite">{{ notice() }}</p>\r
      @if (completed()) {\r
        <button class="primary" (click)="continued.emit()" [disabled]="paused()">\r
          Return to the rescue \u2192\r
        </button>\r
      } @else {\r
        <button class="record-trial" (click)="engage()" [disabled]="paused()">\r
          Record this setup\r
        </button>\r
      }\r
    </div>\r
    @if (saveWarning()) {\r
      <p class="save-warning" role="alert">{{ saveWarning() }}</p>\r
    }\r
    <div class="tools-row">\r
      <button (click)="controls.set(!controls())" [attr.aria-expanded]="controls()">\r
        {{ controls() ? 'Hide' : 'Show' }} keyboard / tap controls\r
      </button>\r
      <span\r
        >{{\r
          piston()\r
            ? 'Match the piston mass using the weight pan'\r
            : 'Drag between either pan and the tray'\r
        }}\r
        \xB7 {{ scale().unit }}</span\r
      >\r
      <button (click)="resetScale()" [disabled]="paused() || locked()">Reset this scale</button>\r
    </div>\r
    @if (controls() || error()) {\r
      <div class="accessible-controls" aria-label="Weight placement controls">\r
        <div class="piece-buttons">\r
          @for (block of blocks(); track block.index) {\r
            <button\r
              (click)="select(block.index)"\r
              [disabled]="locked() || paused()"\r
              [attr.aria-pressed]="selected() === block.index"\r
              [attr.aria-label]="\r
                'Select weight ' + format(block.piece) + ', piece ' + (block.index - offset() + 1)\r
              "\r
            >\r
              {{ format(block.piece)\r
              }}<small>{{\r
                block.side === 1\r
                  ? 'LEFT PAN'\r
                  : block.side === 2\r
                    ? piston()\r
                      ? 'WEIGHT PAN'\r
                      : 'RIGHT PAN'\r
                    : 'TRAY'\r
              }}</small>\r
            </button>\r
          }\r
        </div>\r
        <div class="pan-buttons">\r
          @if (!piston()) {\r
            <button\r
              (click)="placeSelected(1)"\r
              [disabled]="selected() === null || locked() || paused()"\r
            >\r
              Place on left pan\r
            </button>\r
          }\r
          <button\r
            (click)="placeSelected(2)"\r
            [disabled]="selected() === null || locked() || paused()"\r
          >\r
            {{ piston() ? 'Place on weight pan' : 'Place on right pan' }}</button\r
          ><button\r
            (click)="placeSelected(0)"\r
            [disabled]="selected() === null || locked() || paused()"\r
          >\r
            Return to tray\r
          </button>\r
        </div>\r
      </div>\r
    }\r
  </footer>\r
</section>\r
`, styles: ["/* src/app/templates/heist/escape/balance-lock/balance-lock.component.scss */\n:host {\n  display: block;\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  color: #f6edcf;\n  font-family: Arial, sans-serif;\n  background: #091d26;\n}\n* {\n  box-sizing: border-box;\n}\nbutton {\n  font: inherit;\n  color: inherit;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nbutton:focus-visible {\n  outline: 3px solid #a4f3d3;\n  outline-offset: 4px;\n}\nh1:focus {\n  outline: none;\n}\n.chamber {\n  height: var(--expedition-lock-height, 100dvh);\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n  background:\n    radial-gradient(\n      ellipse at 50% 40%,\n      #29434b,\n      #081b24 75%);\n}\n.workshop-header {\n  flex-shrink: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n  padding: 20px 32px 14px;\n  border-bottom: 1px solid rgba(209, 184, 119, 0.1882352941);\n  background: #0b2028;\n}\n.workshop-header > div {\n  text-align: center;\n}\n.eyebrow {\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 2.7px;\n  color: #cdb983;\n  margin: 0 0 7px;\n}\nh1 {\n  font: 30px Georgia, serif;\n  margin: 0;\n}\n.back,\n.help {\n  background: none;\n  border: 1px solid rgba(203, 182, 123, 0.3137254902);\n  border-radius: 7px;\n  padding: 11px 15px;\n  font-size: 13px;\n}\n.back {\n  border-color: transparent;\n}\n.seals {\n  display: flex;\n  justify-content: center;\n  gap: 12px;\n  padding: 12px 18px;\n  background: #0b2028;\n  flex-shrink: 0;\n}\n.seals button {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 216px;\n  padding: 10px 18px;\n  text-align: left;\n  border: 1px solid rgba(180, 161, 119, 0.2078431373);\n  background: #112a33;\n  border-radius: 8px;\n  font: 16px Georgia, serif;\n  transition: background 0.2s;\n}\n.seals button.active {\n  border-color: #e8c57d;\n  background: #243941;\n  box-shadow: 0 0 22px rgba(232, 197, 125, 0.0705882353);\n}\n.seals button.sealed {\n  border-color: #94d7b4;\n}\n.seals small {\n  display: block;\n  margin-top: 4px;\n  font: 8px Arial, sans-serif;\n  letter-spacing: 1.8px;\n  color: #a9bcb6;\n}\n.seal-medal {\n  display: grid;\n  place-items: center;\n  width: 31px;\n  height: 31px;\n  border: 1px solid #b9a373;\n  border-radius: 50%;\n  color: #f1d28e;\n}\n.sealed .seal-medal {\n  color: #9ef1c8;\n  border-color: #9ef1c8;\n}\n.instructions {\n  margin: 0;\n  padding: 12px 30px;\n  background: #27434c;\n  line-height: 1.6;\n  font-size: 13px;\n}\n.instructions strong {\n  color: #f5d692;\n}\n.stage-shell {\n  position: relative;\n  flex: 1;\n  min-height: 300px;\n  overflow: hidden;\n  background: #091c25;\n}\n.stage {\n  position: absolute;\n  inset: 0;\n}\n.stage-instruction {\n  position: absolute;\n  top: 0;\n  left: 15%;\n  right: 15%;\n  text-align: center;\n  font-size: 13px;\n  letter-spacing: 0.3px;\n  color: #f1e6c9;\n  text-shadow: 0 2px 8px #000;\n  padding: 10px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(11, 32, 40, 0.8666666667),\n      transparent);\n  pointer-events: none;\n  margin: 0;\n}\n.loading {\n  position: absolute;\n  inset: 35% 20% auto;\n  text-align: center;\n  background: #142f39;\n  padding: 20px;\n  border: 1px solid rgba(225, 199, 136, 0.4);\n}\n.release-banner {\n  position: absolute;\n  top: 10%;\n  left: 25%;\n  right: 25%;\n  padding: 22px;\n  text-align: center;\n  background: rgba(13, 42, 48, 0.9215686275);\n  border: 1px solid rgba(177, 241, 203, 0.6666666667);\n  border-radius: 12px;\n  box-shadow: 0 0 70px rgba(144, 255, 208, 0.2);\n  pointer-events: none;\n}\n.release-banner > span {\n  display: block;\n  color: #a7f7ce;\n  font-size: 23px;\n  margin-bottom: 5px;\n}\n.release-banner strong {\n  font: 30px Georgia, serif;\n  color: #d7ffe6;\n}\n.release-banner p {\n  font-size: 13px;\n  color: #b1d6c6;\n}\n.workbench {\n  flex-shrink: 0;\n  background: linear-gradient(#132b32, #0a2029);\n  border-top: 1px solid rgba(215, 183, 115, 0.4);\n  padding: 14px 26px 9px;\n  box-shadow: 0 -10px 36px rgba(6, 20, 29, 0.4392156863);\n  z-index: 2;\n}\n.equilibrium {\n  display: flex;\n  align-items: center;\n  gap: 25px;\n}\n.equilibrium > div {\n  min-width: 260px;\n}\n.equation {\n  font: 27px Georgia, serif;\n  margin: 0;\n  color: #efd59a;\n}\n.equation.equal {\n  color: #b4f6d7;\n}\n.status {\n  flex: 1;\n  color: #afc7c6;\n  font-size: 12px;\n  line-height: 1.6;\n  max-width: 560px;\n  margin: 0 auto;\n}\n.primary {\n  white-space: nowrap;\n  margin-left: auto;\n  border: 1px solid #f9dda0;\n  border-radius: 7px;\n  padding: 15px 23px;\n  background:\n    linear-gradient(\n      135deg,\n      #f1d792,\n      #b18a48);\n  color: #253238;\n  font-weight: bold;\n  font-size: 13px;\n  box-shadow: 0 4px 0 #776035, 0 0 22px rgba(231, 189, 107, 0.1254901961);\n}\n.primary span {\n  margin-left: 12px;\n  font-size: 18px;\n}\n.tools-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 15px;\n  margin-top: 10px;\n  font-size: 10px;\n  color: #8aacab;\n}\n.tools-row button {\n  background: transparent;\n  border: 0;\n  padding: 7px 0;\n  color: #c2d3ca;\n  font-size: 11px;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n}\n.accessible-controls {\n  border-top: 1px solid rgba(180, 182, 149, 0.1882352941);\n  margin-top: 8px;\n  padding-top: 10px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 25px;\n}\n.piece-buttons,\n.pan-buttons {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.piece-buttons button {\n  min-width: 60px;\n  background: #31434a;\n  border: 1px solid #9f916d;\n  border-radius: 5px;\n  padding: 7px 12px;\n  font: 17px Georgia, serif;\n}\n.piece-buttons button[aria-pressed=true] {\n  border-color: #aff4d9;\n  background: #35675f;\n}\n.piece-buttons small {\n  display: block;\n  font: 8px Arial, sans-serif;\n  margin-top: 5px;\n  color: #c4d1c8;\n  letter-spacing: 1px;\n}\n.pan-buttons button {\n  background: #183941;\n  border: 1px solid #6b9993;\n  border-radius: 5px;\n  padding: 12px;\n  font-size: 11px;\n}\n.save-warning {\n  color: #ffd29a;\n  font-size: 12px;\n}\n@media (max-width: 800px) {\n  .workshop-header {\n    padding: 12px;\n    gap: 8px;\n  }\n  h1 {\n    font-size: 22px;\n  }\n  .eyebrow {\n    font-size: 8px;\n    letter-spacing: 1.5px;\n  }\n  .back,\n  .help {\n    font-size: 11px;\n    padding: 8px;\n  }\n  .seals {\n    gap: 6px;\n    padding: 8px;\n  }\n  .seals button {\n    min-width: 0;\n    flex: 1;\n    gap: 6px;\n    padding: 8px;\n    font-size: 12px;\n  }\n  .seals small {\n    font-size: 6px;\n    letter-spacing: 0.5px;\n  }\n  .seal-medal {\n    width: 25px;\n    height: 25px;\n    flex-shrink: 0;\n  }\n  .stage-shell {\n    min-height: 290px;\n  }\n  .stage-instruction {\n    font-size: 11px;\n    left: 3%;\n    right: 3%;\n  }\n  .equilibrium {\n    flex-wrap: wrap;\n    gap: 10px;\n  }\n  .equilibrium > div {\n    min-width: 0;\n    flex: 1;\n  }\n  .equation {\n    font-size: 22px;\n  }\n  .status {\n    order: 3;\n    flex-basis: 100%;\n    max-width: none;\n  }\n  .workbench {\n    padding: 12px;\n  }\n  .primary {\n    padding: 12px;\n    font-size: 11px;\n  }\n  .tools-row > span {\n    display: none;\n  }\n  .accessible-controls {\n    flex-wrap: wrap;\n    gap: 10px;\n  }\n  .piece-buttons button {\n    min-width: 50px;\n    padding: 6px 10px;\n  }\n  .release-banner {\n    left: 12%;\n    right: 12%;\n  }\n  .release-banner strong {\n    font-size: 23px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    transition: none !important;\n  }\n}\n.header-tools {\n  display: flex;\n  gap: 8px;\n}\n@media (max-width: 520px) {\n  .header-tools {\n    flex-direction: column;\n    gap: 3px;\n  }\n  .header-tools .help {\n    padding: 5px 8px;\n  }\n}\n.release-banner {\n  animation: release-reveal 2.1s both;\n  left: 32%;\n  right: 32%;\n  padding: 16px;\n}\n@keyframes release-reveal {\n  0%, 80% {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  100% {\n    opacity: 1;\n    transform: none;\n  }\n}\n.reduced-motion .release-banner {\n  animation: none;\n}\n@media (max-width: 800px) {\n  .release-banner {\n    left: 12%;\n    right: 12%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .release-banner {\n    animation: none;\n  }\n}\n@media (max-width: 600px) {\n  .stage-shell {\n    flex: 0 0 auto;\n    height: calc(68vw + 24px);\n    min-height: 0;\n  }\n  .workbench {\n    flex: 1 0 auto;\n  }\n  .stage-instruction {\n    font-size: 10px;\n    padding: 5px;\n  }\n  .equilibrium .primary {\n    padding: 12px 10px;\n  }\n  .accessible-controls {\n    gap: 14px;\n    padding-top: 15px;\n  }\n  .piece-buttons button {\n    min-width: 55px;\n    min-height: 52px;\n  }\n  .pan-buttons button {\n    min-height: 44px;\n    padding: 10px;\n  }\n}\n/*# sourceMappingURL=balance-lock.component.css.map */\n", "/* src/app/templates/heist/escape/weekly/preview-machine.scss */\n:host(.week-preview) .preview-action {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 10px 16px;\n  background: #23443f;\n  border-block: 1px solid rgba(140, 158, 117, 0.3333333333);\n  flex-shrink: 0;\n  font-size: 13px;\n}\n:host(.week-preview) .preview-action .primary {\n  flex-shrink: 0;\n  min-height: 44px;\n}\n:host(.week-preview) .preview-action p {\n  margin: 3px 0 0;\n  font-size: 12px;\n  color: #d1dfd4;\n}\n@media (max-width: 600px) {\n  :host(.week-preview) .preview-action {\n    flex-wrap: wrap;\n  }\n}\n:host(.week-preview) {\n  display: block;\n  position: relative;\n  inset: auto;\n  z-index: auto;\n  min-width: 0;\n}\n:host(.week-preview) .workshop,\n:host(.week-preview) .chamber {\n  height: auto;\n  overflow: visible;\n}\n:host(.week-preview) header,\n:host(.week-preview) .workshop-header {\n  padding: 12px 18px;\n  gap: 10px;\n}\n:host(.week-preview) h1 {\n  font-size: clamp(20px, 2vw, 26px);\n}\n:host(.week-preview) nav,\n:host(.week-preview) .seals {\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 8px;\n}\n:host(.week-preview) nav button[aria-pressed=true] {\n  background: #315850;\n  border-color: #efcb82;\n}\n:host(.week-preview) .stage-shell {\n  flex: 0 0 auto;\n  height: clamp(250px, 30vw, 400px);\n  min-height: 250px;\n}\n:host(.week-preview) .stage {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n:host(.week-preview) footer,\n:host(.week-preview) .workbench {\n  flex: 0 0 auto;\n  padding: 12px 16px;\n}\n:host(.week-preview) .operation,\n:host(.week-preview) .equilibrium,\n:host(.week-preview) .toolbar,\n:host(.week-preview) .tools-row,\n:host(.week-preview) .calibrations {\n  flex-wrap: wrap;\n}\n:host(.week-preview) .mission,\n:host(.week-preview) .stage-instruction {\n  font-size: 14px;\n  line-height: 1.5;\n}\n:host(.week-preview) .control-card,\n:host(.week-preview) .inventory,\n:host(.week-preview) .actions,\n:host(.week-preview) .operation > div {\n  min-width: 0;\n}\n:host(.week-preview) .loading {\n  left: 8%;\n  right: 8%;\n  padding: 12px;\n}\n@media (max-width: 600px) {\n  :host(.week-preview) header,\n  :host(.week-preview) .workshop-header {\n    flex-wrap: wrap;\n  }\n  :host(.week-preview) .workshop-header > div {\n    text-align: left;\n  }\n  :host(.week-preview) .stage-shell {\n    height: 270px;\n  }\n  :host(.week-preview) .run-caption {\n    left: 8px;\n    right: 8px;\n  }\n  :host(.week-preview) .calibrations {\n    gap: 8px;\n    padding: 10px;\n  }\n  :host(.week-preview) .calibrations > div {\n    min-width: 0;\n    flex: 1 1 130px;\n  }\n  :host(.week-preview) .seals button {\n    flex: 1 1 95px;\n    min-width: 0;\n  }\n  :host(.week-preview) button {\n    overflow-wrap: anywhere;\n  }\n}\n/*# sourceMappingURL=preview-machine.css.map */\n", "/* src/app/templates/heist/escape/balance-lock/balance-lock.rebuild.scss */\n:host .hanging-pin-chamber .mechanism-brief {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  padding: 12px 18px;\n  background: #203b3c;\n  border-block: 1px solid rgba(180, 160, 109, 0.2666666667);\n}\n:host .hanging-pin-chamber .mechanism-brief p {\n  margin: 0;\n  font-size: 13px;\n  line-height: 1.5;\n  color: #e9dec6;\n}\n:host .hanging-pin-chamber .mechanism-brief > span {\n  font-size: 10px;\n  letter-spacing: 0.7px;\n  color: #c1d1c8;\n  flex-shrink: 0;\n}\n:host .hanging-pin-chamber .mechanism-brief > span.aligned {\n  color: #acface;\n}\n:host .hanging-pin-chamber .stage-shell {\n  height: auto;\n  min-height: 0;\n  flex: 0 0 auto;\n  overflow: visible;\n}\n:host .hanging-pin-chamber .stage {\n  position: relative;\n  inset: auto;\n  width: 100%;\n  height: auto;\n}\n:host .hanging-pin-chamber .record-trial {\n  padding: 10px 15px;\n  min-height: 44px;\n  border: 1px solid #788b7f;\n  border-radius: 6px;\n  background: #213c42;\n  color: #dfdac6;\n  font-size: 12px;\n}\n:host .hanging-pin-chamber .seals {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n:host .hanging-pin-chamber .seals button {\n  min-width: 0;\n  gap: 9px;\n  padding: 10px 12px;\n  font-size: 14px;\n}\n:host .hanging-pin-chamber .seals small {\n  font-size: 9px;\n  letter-spacing: 0.8px;\n}\n:host .hanging-pin-chamber .equilibrium > div {\n  min-width: 0;\n}\n:host .hanging-pin-chamber .equation {\n  font-size: 23px;\n}\n:host .hanging-pin-chamber .workbench {\n  box-shadow: none;\n}\n@media (max-width: 600px) {\n  :host .hanging-pin-chamber .mechanism-brief {\n    flex-wrap: wrap;\n    gap: 6px;\n    padding: 10px 12px;\n  }\n  :host .hanging-pin-chamber .seals button {\n    flex-direction: column;\n    align-items: start;\n    gap: 5px;\n    font-size: 12px;\n    padding: 9px;\n  }\n  :host .hanging-pin-chamber .seals small {\n    font-size: 8px;\n    letter-spacing: 0.2px;\n  }\n  :host .hanging-pin-chamber .tools-row {\n    flex-wrap: wrap;\n  }\n}\n:host(.week-preview) .hanging-pin-chamber .stage-shell {\n  height: auto;\n  min-height: 0;\n}\n:host(.week-preview) .hanging-pin-chamber .stage {\n  position: relative;\n  height: auto;\n}\n:host .expand-workshop {\n  border-color: #b9ae81;\n  background: #2b4545;\n  color: #f0e1b9;\n}\n:host(.expanded-workshop) {\n  position: fixed;\n  inset: 0;\n  z-index: 2000;\n  overflow: auto;\n  background: #0b151b;\n  --balance-3d-height: clamp(420px, 58dvh, 780px);\n}\n:host(.expanded-workshop) .hanging-pin-chamber {\n  min-height: 100dvh;\n  height: auto;\n  max-width: 1480px;\n  margin: 0 auto;\n}\n:host(.expanded-workshop) .workshop-header {\n  position: sticky;\n  top: 0;\n  z-index: 5;\n  background: #17282f;\n}\n:host(.expanded-workshop) .workbench {\n  padding-bottom: 22px;\n}\n:host(.expanded-workshop) .seals button {\n  padding: 8px 14px;\n}\n:host(.week-preview) .hanging-pin-chamber {\n  position: relative;\n}\n:host(.week-preview) .hanging-pin-chamber .workshop-header {\n  padding: 9px 12px;\n  min-height: 52px;\n}\n:host(.week-preview) .hanging-pin-chamber .workshop-header .eyebrow {\n  display: none;\n}\n:host(.week-preview) .hanging-pin-chamber .workshop-header h1 {\n  font-size: 14px;\n  margin: 0;\n}\n:host(.week-preview) .hanging-pin-chamber .header-tools {\n  gap: 5px;\n}\n:host(.week-preview) .hanging-pin-chamber .header-tools button {\n  font-size: 11px;\n  padding: 6px 8px;\n  min-height: 38px;\n}\n:host(.week-preview) .hanging-pin-chamber .seals {\n  padding: 5px 9px;\n  gap: 6px;\n}\n:host(.week-preview) .hanging-pin-chamber .seals button {\n  padding: 6px 9px;\n  font-size: 12px;\n}\n:host(.week-preview) .hanging-pin-chamber .mechanism-brief {\n  display: none;\n}\n:host(.week-preview) .hanging-pin-chamber .instructions {\n  position: absolute;\n  right: 12px;\n  top: 58px;\n  width: min(370px, 100% - 24px);\n  padding: 16px;\n  z-index: 8;\n  border: 1px solid #96a992;\n  border-radius: 8px;\n  background: #19343e;\n  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4666666667);\n}\n:host(.week-preview) .hanging-pin-chamber .preview-reset {\n  margin-top: 12px;\n}\n:host(.week-preview) .hanging-pin-chamber.has-renderer .workbench {\n  display: none;\n}\n:host(.week-preview.expanded-workshop) {\n  inset: 8px;\n  border: 1px solid #859787;\n  border-radius: 10px;\n  --balance-3d-height: max(300px,calc(100dvh - 340px));\n}\n:host(.week-preview.expanded-workshop) .hanging-pin-chamber {\n  min-height: 0;\n}\n@media (max-width: 680px) {\n  :host(.week-preview) .hanging-pin-chamber .workshop-header {\n    display: block;\n    padding: 8px;\n  }\n  :host(.week-preview) .hanging-pin-chamber .workshop-header h1 {\n    font-size: 12px;\n  }\n  :host(.week-preview) .hanging-pin-chamber .header-tools {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n    margin-top: 6px;\n    gap: 4px;\n  }\n  :host(.week-preview) .hanging-pin-chamber .header-tools button {\n    flex: 1;\n    min-height: 40px;\n    padding: 5px;\n    font-size: 10px;\n  }\n  :host(.week-preview) .hanging-pin-chamber .seals button {\n    flex-direction: row;\n    align-items: center;\n    padding: 6px;\n    gap: 4px;\n    font-size: 10px;\n  }\n  :host(.week-preview) .hanging-pin-chamber .seal-medal {\n    width: 19px;\n    height: 19px;\n    font-size: 11px;\n  }\n  :host(.week-preview.expanded-workshop) {\n    --balance-3d-height: 345px;\n  }\n}\n/*# sourceMappingURL=balance-lock.rebuild.css.map */\n"] }]
  }], () => [], { definition: [{ type: Input, args: [{ isSignal: true, alias: "definition", required: true }] }], authoringPreview: [{ type: Input, args: [{ isSignal: true, alias: "authoringPreview", required: false }] }], initialScale: [{ type: Input, args: [{ isSignal: true, alias: "initialScale", required: false }] }], tested: [{ type: Output, args: ["tested"] }], title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: false }] }], placements: [{ type: Input, args: [{ isSignal: true, alias: "placements", required: false }] }], completed: [{ type: Input, args: [{ isSignal: true, alias: "completed", required: false }] }], paused: [{ type: Input, args: [{ isSignal: true, alias: "paused", required: false }] }], reducedMotion: [{ type: Input, args: [{ isSignal: true, alias: "reducedMotion", required: false }] }], saveWarning: [{ type: Input, args: [{ isSignal: true, alias: "saveWarning", required: false }] }], moved: [{ type: Output, args: ["moved"] }], solved: [{ type: Output, args: ["solved"] }], leave: [{ type: Output, args: ["leave"] }], pauseRequested: [{ type: Output, args: ["pauseRequested"] }], continued: [{ type: Output, args: ["continued"] }], sound: [{ type: Output, args: ["sound"] }], stage: [{
    type: ViewChild,
    args: ["stage", { static: true }]
  }], heading: [{
    type: ViewChild,
    args: ["heading", { static: true }]
  }], expandButton: [{
    type: ViewChild,
    args: ["expandButton", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BalanceLockComponent, { className: "BalanceLockComponent", filePath: "src/app/templates/heist/escape/balance-lock/balance-lock.component.ts", lineNumber: 49 });
})();

// src/app/templates/heist/escape/gear-lock/gear-lock.component.ts
var _c02 = ["stage"];
var _c12 = ["heading"];
var _forTrack02 = ($index, $item) => $item.id;
function GearLockComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 24);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.leave.emit());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r1.running() || ctx_r1.paused());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2190 ", ctx_r1.completed() ? "Return to rescue" : "Back to map", " ");
  }
}
function GearLockComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 21);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pauseRequested.emit());
    });
    \u0275\u0275text(1, "Pause");
    \u0275\u0275domElementEnd();
  }
}
function GearLockComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 7)(1, "button", 25);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_32_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.test());
    });
    \u0275\u0275text(2, "Test gear train");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p", 15);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.locked());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.positions()[2], " input turns");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.notice());
  }
}
function GearLockComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 10);
    \u0275\u0275text(1, "Lighting the clockwork workshop...");
    \u0275\u0275domElementEnd();
  }
}
function GearLockComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 10);
    \u0275\u0275text(1, " The animated workshop could not load. The cog controls below operate the same lock. ");
    \u0275\u0275domElementEnd();
  }
}
function GearLockComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 11)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementStart(4, "button", 24);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_38_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.finish());
    });
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.passed() ? "RELEASE RUN" : "CALIBRATION TEST");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.passed() ? ctx_r1.captions[ctx_r1.module()] : "The gears turn at the speed set by their tooth counts...");
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.paused());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.passed() ? "Skip animation" : "Finish test", " ");
  }
}
function GearLockComponent_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 25);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_56_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.leave.emit());
    });
    \u0275\u0275text(1, " Return to rescue \u2192 ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r1.running() || ctx_r1.paused());
  }
}
function GearLockComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 25);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_57_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.test());
    });
    \u0275\u0275text(1, " Wind & test machine \u2192 ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r1.locked());
  }
}
function GearLockComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 24);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_63_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.replay());
    });
    \u0275\u0275text(1, "Replay release run");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r1.running() || ctx_r1.paused());
  }
}
function GearLockComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 24);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_64_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reset());
    });
    \u0275\u0275text(1, "Reset workbench");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r1.locked());
  }
}
function GearLockComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "aside")(1, "strong");
    \u0275\u0275text(2, "Same teeth passing. Different turns.");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" A 12-tooth gear turns twice while a 24-tooth gear turns once. Meshing gears turn in opposite directions. Cog A and the small ", ctx_r1.definition().pinionTeeth, "-tooth pinion share an axle, so they make the same number of turns. Work through both pairs to find the crank turns. The rails slide to fit each cog; fitting alone does not mean its calibration is right. ");
  }
}
function GearLockComponent_Conditional_66_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 24);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_66_For_3_Template_button_click_0_listener() {
      const \u0275$index_156_r12 = \u0275\u0275restoreView(_r11).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.select(\u0275$index_156_r12));
    });
    \u0275\u0275domElementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3, " teeth");
    \u0275\u0275domElementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const g_r13 = ctx.$implicit;
    const \u0275$index_156_r12 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("disabled", ctx_r1.locked());
    \u0275\u0275attribute("aria-pressed", ctx_r1.selected() === \u0275$index_156_r12);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(g_r13.teeth);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.positions()[0] === \u0275$index_156_r12 ? "On axle A" : ctx_r1.positions()[1] === \u0275$index_156_r12 ? "On axle B" : "In tray");
  }
}
function GearLockComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 22)(1, "div", 26);
    \u0275\u0275repeaterCreate(2, GearLockComponent_Conditional_66_For_3_Template, 6, 4, "button", 3, _forTrack02);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "div", 27)(5, "button", 24);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_66_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.placeSelected(0));
    });
    \u0275\u0275text(6, " Place on A");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "button", 24);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_66_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.placeSelected(1));
    });
    \u0275\u0275text(8, " Place on B");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "button", 24);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_66_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.placeSelected(-1));
    });
    \u0275\u0275text(10, " Return to tray ");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.definition().gears);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || ctx_r1.selected() === null);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || ctx_r1.selected() === null);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || ctx_r1.selected() === null);
  }
}
function GearLockComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 24);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_67_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.leave.emit());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r1.running() || ctx_r1.paused());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.completed() ? "Return to rescue" : "Back to map", " ");
  }
}
function GearLockComponent_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "p", 23);
    \u0275\u0275text(1);
    \u0275\u0275domElementStart(2, "button", 24);
    \u0275\u0275domListener("click", function GearLockComponent_Conditional_68_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retrySave());
    });
    \u0275\u0275text(3, " Retry saving release ");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saveWarning(), " ");
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.paused() || ctx_r1.running());
  }
}
var GEAR_SCENE_LOADER = new InjectionToken("GEAR_SCENE_LOADER", {
  providedIn: "root",
  factory: () => () => import("./chunk-BEV7MLPV.js")
});
var GearLockComponent = class _GearLockComponent {
  definition = input.required(
    ...ngDevMode ? [{ debugName: "definition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  authoringPreview = input(
    false,
    ...ngDevMode ? [{ debugName: "authoringPreview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tested = output();
  answer = input(
    [],
    ...ngDevMode ? [{ debugName: "answer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completed = input(
    false,
    ...ngDevMode ? [{ debugName: "completed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  paused = input(
    false,
    ...ngDevMode ? [{ debugName: "paused" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reducedMotion = input(
    false,
    ...ngDevMode ? [{ debugName: "reducedMotion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveWarning = input(
    "",
    ...ngDevMode ? [{ debugName: "saveWarning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  changed = output();
  solved = output();
  leave = output();
  pauseRequested = output();
  sound = output();
  selected = signal(
    null,
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  running = signal(
    false,
    ...ngDevMode ? [{ debugName: "running" }] : (
      /* istanbul ignore next */
      []
    )
  );
  runId = signal(
    0,
    ...ngDevMode ? [{ debugName: "runId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  passed = signal(
    false,
    ...ngDevMode ? [{ debugName: "passed" }] : (
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
  error = signal(
    false,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  controls = signal(
    false,
    ...ngDevMode ? [{ debugName: "controls" }] : (
      /* istanbul ignore next */
      []
    )
  );
  help = signal(
    false,
    ...ngDevMode ? [{ debugName: "help" }] : (
      /* istanbul ignore next */
      []
    )
  );
  notice = signal(
    "Drag a cog onto A or B. The sliding axles adjust to its size.",
    ...ngDevMode ? [{ debugName: "notice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  module = signal(
    "drive",
    ...ngDevMode ? [{ debugName: "module" }] : (
      /* istanbul ignore next */
      []
    )
  );
  positions = computed(
    () => this.answer().length ? this.answer() : emptyGears(),
    ...ngDevMode ? [{ debugName: "positions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  diorama = computed(
    () => this.definition().presentation?.kind === "gear-cage",
    ...ngDevMode ? [{ debugName: "diorama" }] : (
      /* istanbul ignore next */
      []
    )
  );
  locked = computed(
    () => this.running() || this.completed() || this.paused(),
    ...ngDevMode ? [{ debugName: "locked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  motion = computed(
    () => gearMotion(this.definition(), this.positions(), this.positions()[2]),
    ...ngDevMode ? [{ debugName: "motion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fraction = fractionLabel;
  captions = {
    drive: "The repaired train winds the belt. The release drum reaches its mark.",
    ball: "The drum opens the ball catch. Gravity carries the ball down the brass rail.",
    hammer: "The ball tips the hammer. The hammer knocks the retaining peg clear.",
    weight: "The freed counterweight descends, pulling the release cord taut.",
    domino: "The cord tips the first domino. One impact passes to the next.",
    gate: "The last domino trips the gate catch. The pen rises. The way is clear!"
  };
  loader = inject(GEAR_SCENE_LOADER);
  scene;
  destroyed = false;
  stage;
  heading;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.scene?.destroy();
    });
  }
  async ngAfterViewInit() {
    this.controls.set(this.stage.nativeElement.clientWidth > 0 && this.stage.nativeElement.clientWidth < 700);
    this.heading.nativeElement.focus({ preventScroll: true });
    try {
      const { mountGearScene } = await this.loader();
      if (this.destroyed)
        return;
      this.scene = mountGearScene(this.stage.nativeElement, this.definition(), () => ({
        answer: this.positions(),
        selected: this.selected(),
        running: this.running(),
        runId: this.runId(),
        passed: this.passed(),
        completed: this.completed(),
        paused: this.paused(),
        reducedMotion: this.reducedMotion()
      }), {
        select: (index) => this.select(index),
        place: (index, socket) => this.place(index, socket),
        ready: () => this.ready.set(true),
        failed: () => {
          this.error.set(true);
          this.controls.set(true);
        },
        beat: (module) => {
          this.module.set(module);
          this.sound.emit(module === "hammer" ? "turn" : "open");
        },
        finished: () => this.finish(),
        crank: (delta) => this.crank(delta),
        test: () => this.test(),
        replay: () => this.replay(),
        reset: () => this.reset(),
        pause: () => this.pauseRequested.emit()
      });
    } catch {
      this.error.set(true);
      this.controls.set(true);
    }
  }
  select(index) {
    if (this.locked() || !this.definition().gears[index])
      return;
    this.selected.set(index);
    this.notice.set(`${this.definition().gears[index].teeth}-tooth cog selected. Choose axle A, axle B, or the tray.`);
  }
  place(index, socket) {
    if (this.locked())
      return;
    this.changed.emit(moveGear(this.definition(), this.positions(), index, socket));
    this.selected.set(null);
    this.sound.emit("turn");
    this.notice.set(socket === -1 ? "Cog returned to the tray." : `Cog fitted to axle ${socket === 0 ? "A" : "B"}. Check its tooth-count clue.`);
  }
  placeSelected(socket) {
    const i = this.selected();
    if (i !== null)
      this.place(i, socket);
  }
  crank(delta) {
    if (this.locked())
      return;
    const a = [...this.positions()];
    a[2] = Math.max(1, Math.min(this.definition().maxCrank, a[2] + delta));
    this.changed.emit(a);
  }
  reset() {
    if (this.locked())
      return;
    this.changed.emit(emptyGears());
    this.selected.set(null);
    this.notice.set("Cogs returned. Follow both calibration clues, then calculate the crank turns.");
  }
  test() {
    if (this.locked())
      return;
    this.tested.emit(0);
    if (this.positions()[0] < 0 || this.positions()[1] < 0) {
      this.notice.set(gearFeedback(this.definition(), this.positions()));
      return;
    }
    this.passed.set(evaluateGearLock(this.definition(), this.positions()));
    this.selected.set(null);
    this.module.set("drive");
    this.running.set(true);
    this.runId.update((n) => n + 1);
    this.notice.set("Testing the drive train. Watch the rotation markers.");
    this.sound.emit("turn");
    if (this.error())
      this.finish();
  }
  finish() {
    if (!this.running() || this.paused())
      return;
    this.running.set(false);
    this.notice.set(gearFeedback(this.definition(), this.positions()));
    if (this.passed()) {
      if (!this.completed() && !this.authoringPreview())
        this.solved.emit();
      this.sound.emit("open");
    } else
      this.sound.emit("wrong");
  }
  replay() {
    if (!this.completed() && !(this.authoringPreview() && this.diorama() && evaluateGearLock(this.definition(), this.positions())) || this.paused() || this.running())
      return;
    this.passed.set(true);
    this.module.set("drive");
    this.running.set(true);
    this.runId.update((n) => n + 1);
    if (this.error())
      this.finish();
  }
  retrySave() {
    if (!this.paused() && evaluateGearLock(this.definition(), this.positions()))
      this.solved.emit();
  }
  static \u0275fac = function GearLockComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GearLockComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GearLockComponent, selectors: [["app-gear-lock"]], viewQuery: function GearLockComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 7)(_c12, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.stage = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.heading = _t.first);
    }
  }, hostVars: 2, hostBindings: function GearLockComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("week-preview", ctx.authoringPreview());
    }
  }, inputs: { definition: [1, "definition"], authoringPreview: [1, "authoringPreview"], answer: [1, "answer"], completed: [1, "completed"], paused: [1, "paused"], reducedMotion: [1, "reducedMotion"], saveWarning: [1, "saveWarning"] }, outputs: { tested: "tested", changed: "changed", solved: "solved", leave: "leave", pauseRequested: "pauseRequested", sound: "sound" }, decls: 69, vars: 29, consts: [["heading", ""], ["stage", ""], ["aria-label", "Gear restoration workshop", 1, "workshop"], [3, "disabled"], [1, "heading"], ["tabindex", "-1"], ["aria-label", "Machine calibration clues", 1, "calibrations"], [1, "preview-action"], [1, "stage-shell"], ["aria-label", "Interactive compound gear train. Drag cogs to A and B, or use the buttons below.", 1, "stage"], ["role", "status", 1, "loading"], ["role", "status", 1, "run-caption"], [1, "operation"], [1, "crank"], ["aria-label", "Fewer crank turns", 3, "click", "disabled"], ["aria-live", "polite"], ["aria-label", "More crank turns", 3, "click", "disabled"], [1, "status"], [1, "instruction"], [1, "primary", 3, "disabled"], [1, "toolbar"], [3, "click"], ["aria-label", "Cog controls", 1, "accessible-controls"], ["role", "alert", 1, "save-warning"], [3, "click", "disabled"], [1, "primary", 3, "click", "disabled"], [1, "inventory"], [1, "destinations"]], template: function GearLockComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 2)(1, "header");
      \u0275\u0275conditionalCreate(2, GearLockComponent_Conditional_2_Template, 2, 2, "button", 3);
      \u0275\u0275domElementStart(3, "div", 4)(4, "span");
      \u0275\u0275text(5, "CLOCKWORK RESCUE / GEAR RESTORATION");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "h1", 5, 0);
      \u0275\u0275text(8);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(9, GearLockComponent_Conditional_9_Template, 2, 0, "button");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "div", 6)(11, "div")(12, "b");
      \u0275\u0275text(13, "A");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(14, "p");
      \u0275\u0275text(15, " First missing cog");
      \u0275\u0275domElementStart(16, "strong");
      \u0275\u0275text(17);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(18, "div")(19, "b");
      \u0275\u0275text(20, "B");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "p");
      \u0275\u0275text(22, " Second missing cog");
      \u0275\u0275domElementStart(23, "strong");
      \u0275\u0275text(24);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(25, "div")(26, "b");
      \u0275\u0275text(27, "\u21BB");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(28, "p");
      \u0275\u0275text(29, " Release drum target");
      \u0275\u0275domElementStart(30, "strong");
      \u0275\u0275text(31);
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275conditionalCreate(32, GearLockComponent_Conditional_32_Template, 8, 3, "div", 7);
      \u0275\u0275domElementStart(33, "div", 8);
      \u0275\u0275domElement(34, "div", 9, 1);
      \u0275\u0275conditionalCreate(36, GearLockComponent_Conditional_36_Template, 2, 0, "p", 10);
      \u0275\u0275conditionalCreate(37, GearLockComponent_Conditional_37_Template, 2, 0, "p", 10);
      \u0275\u0275conditionalCreate(38, GearLockComponent_Conditional_38_Template, 6, 4, "div", 11);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(39, "footer")(40, "div", 12)(41, "div", 13)(42, "span");
      \u0275\u0275text(43, "CRANK TURNS");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(44, "div")(45, "button", 14);
      \u0275\u0275domListener("click", function GearLockComponent_Template_button_click_45_listener() {
        return ctx.crank(-1);
      });
      \u0275\u0275text(46, " \u2212");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(47, "output", 15);
      \u0275\u0275text(48);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(49, "button", 16);
      \u0275\u0275domListener("click", function GearLockComponent_Template_button_click_49_listener() {
        return ctx.crank(1);
      });
      \u0275\u0275text(50, " + ");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(51, "div", 17)(52, "p", 18);
      \u0275\u0275text(53);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(54, "p", 15);
      \u0275\u0275text(55);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(56, GearLockComponent_Conditional_56_Template, 2, 1, "button", 19)(57, GearLockComponent_Conditional_57_Template, 2, 1, "button", 19);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(58, "div", 20)(59, "button", 21);
      \u0275\u0275domListener("click", function GearLockComponent_Template_button_click_59_listener() {
        return ctx.controls.set(!ctx.controls());
      });
      \u0275\u0275text(60);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(61, "button", 21);
      \u0275\u0275domListener("click", function GearLockComponent_Template_button_click_61_listener() {
        return ctx.help.set(!ctx.help());
      });
      \u0275\u0275text(62, "How gears work");
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(63, GearLockComponent_Conditional_63_Template, 2, 1, "button", 3)(64, GearLockComponent_Conditional_64_Template, 2, 1, "button", 3);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(65, GearLockComponent_Conditional_65_Template, 4, 1, "aside");
      \u0275\u0275conditionalCreate(66, GearLockComponent_Conditional_66_Template, 11, 3, "div", 22);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(67, GearLockComponent_Conditional_67_Template, 2, 2, "button", 3);
      \u0275\u0275conditionalCreate(68, GearLockComponent_Conditional_68_Template, 4, 2, "p", 23);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("gear-diorama", ctx.diorama() && !ctx.error());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.authoringPreview() ? 2 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.definition().title);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.authoringPreview() ? 9 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate2("", ctx.fraction(ctx.definition().firstMultiplier), " \xD7 ", ctx.definition().driverTeeth, " teeth");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate2("", ctx.fraction(ctx.definition().secondMultiplier), " \xD7 ", ctx.definition().pinionTeeth, " teeth");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate2("", ctx.fraction(ctx.definition().outputTurns), " full turn", ctx.definition().outputTurns.numerator > ctx.definition().outputTurns.denominator ? "s" : "");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.authoringPreview() ? 32 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(!ctx.ready() && !ctx.error() ? 36 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 37 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.running() ? 38 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275domProperty("disabled", ctx.locked() || ctx.positions()[2] === 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.positions()[2]);
      \u0275\u0275advance();
      \u0275\u0275domProperty("disabled", ctx.locked() || ctx.positions()[2] === ctx.definition().maxCrank);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.definition().instruction);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.completed() ? ctx.definition().success : ctx.notice());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.completed() ? 56 : 57);
      \u0275\u0275advance(3);
      \u0275\u0275attribute("aria-expanded", ctx.controls());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.controls() ? "Hide" : "Show", " cog controls ");
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-expanded", ctx.help());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.completed() ? 63 : 64);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.help() ? 65 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.controls() ? 66 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.diorama() && !ctx.error() && !ctx.authoringPreview() ? 67 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.saveWarning() ? 68 : -1);
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  color: #f8edd4;\n  font-family: "Trebuchet MS", sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.workshop[_ngcontent-%COMP%] {\n  height: var(--%NS%expedition-lock-height, 100dvh);\n  display: flex;\n  flex-direction: column;\n  background: #071b21;\n  overflow: auto;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  color: #e9e4d8;\n  border: 1px solid #57716e;\n  background: #163139;\n  border-radius: 6px;\n  min-height: 44px;\n  padding: 9px 15px;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #275055;\n  border-color: #ead295;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #ffe3a2;\n  outline-offset: 3px;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 22px;\n  align-items: center;\n  padding: 15px 28px;\n  border-bottom: 1px solid rgba(198, 155, 71, 0.3019607843);\n  background:\n    linear-gradient(\n      110deg,\n      #0a222c,\n      #172b2a);\n  flex-shrink: 0;\n}\n.heading[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d6b577;\n  font-size: 10px;\n  letter-spacing: 0.2em;\n}\nh1[_ngcontent-%COMP%] {\n  font: 27px Georgia, serif;\n  margin: 3px 0 0;\n}\nh1[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.calibrations[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 70px;\n  padding: 10px 20px;\n  background: #10262a;\n  flex-shrink: 0;\n  border-bottom: 1px solid rgba(177, 139, 67, 0.2509803922);\n}\n.calibrations[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.calibrations[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: grid;\n  place-items: center;\n  border: 1px solid #b99a61;\n  border-radius: 50%;\n  color: #f0cf86;\n  font: 22px Georgia, serif;\n}\n.calibrations[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11px;\n  color: #a3b8b6;\n}\n.calibrations[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #f8e5b6;\n  font-size: 18px;\n  margin-top: 3px;\n}\n.stage-shell[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  min-height: 220px;\n  overflow: hidden;\n  background: #06151c;\n}\n.stage[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.stage[_ngcontent-%COMP%]     canvas {\n  display: block;\n  touch-action: none;\n}\n.loading[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 30% 15%;\n  text-align: center;\n  background: rgba(11, 37, 46, 0.9333333333);\n  padding: 25px;\n  height: fit-content;\n}\n.run-caption[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 14px;\n  left: 15%;\n  right: 15%;\n  background: rgba(6, 27, 34, 0.9607843137);\n  border: 1px solid #bfa366;\n  padding: 12px 18px;\n  text-align: center;\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5333333333);\n  font-size: 15px;\n}\n.run-caption[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #f6cf7b;\n  font-size: 10px;\n  letter-spacing: 0.16em;\n  margin-bottom: 6px;\n}\n.run-caption[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: 14px;\n  font-size: 12px;\n}\nfooter[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 12px 28px 9px;\n  border-top: 1px solid #b6944d;\n  background:\n    linear-gradient(\n      110deg,\n      #122d33,\n      #091e27);\n}\n.operation[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 25px;\n  align-items: center;\n}\n.crank[_ngcontent-%COMP%] {\n  text-align: center;\n  flex-shrink: 0;\n}\n.crank[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 0.14em;\n  color: #d4b576;\n}\n.crank[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-top: 5px;\n}\n.crank[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  font: 30px Georgia, serif;\n  width: 28px;\n}\n.crank[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 22px;\n  padding: 3px 13px;\n}\n.status[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.status[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 5px 0;\n  font-size: 13px;\n  color: #bfd4cf;\n}\n.status[_ngcontent-%COMP%]   .instruction[_ngcontent-%COMP%] {\n  color: #f1e8d3;\n  font-size: 15px;\n}\n.primary[_ngcontent-%COMP%] {\n  background: linear-gradient(#f0d18e, #c5984b);\n  color: #14232a;\n  font-weight: bold;\n  border-color: #fae4b3;\n  padding: 16px 23px;\n}\n.primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #ffe1a0;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  justify-content: center;\n  margin-top: 7px;\n}\n.toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  font-size: 12px;\n  text-decoration: underline;\n  min-height: 32px;\n  padding: 5px;\n}\naside[_ngcontent-%COMP%] {\n  padding: 12px;\n  line-height: 1.6;\n  font-size: 13px;\n  background: rgba(255, 255, 255, 0.031372549);\n  border-left: 2px solid #d3b274;\n}\naside[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n}\n.accessible-controls[_ngcontent-%COMP%] {\n  padding: 10px 0;\n}\n.inventory[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.inventory[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 94px;\n  font-size: 12px;\n}\n.inventory[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.inventory[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 4px;\n  color: #a6c7c2;\n}\n.inventory[_ngcontent-%COMP%]   [aria-pressed=true][_ngcontent-%COMP%] {\n  outline: 2px solid #f3cf82;\n  background: #305053;\n}\n.destinations[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  margin-top: 10px;\n}\n.save-warning[_ngcontent-%COMP%] {\n  color: #ffd1a4;\n}\n@media (max-width: 800px) {\n  header[_ngcontent-%COMP%] {\n    padding: 10px 14px;\n    gap: 10px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 21px;\n  }\n  .heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .calibrations[_ngcontent-%COMP%] {\n    gap: 20px;\n  }\n  .calibrations[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n  footer[_ngcontent-%COMP%] {\n    padding: 10px 14px;\n  }\n  .operation[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .status[_ngcontent-%COMP%]   .instruction[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .primary[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n}\n@media (max-width: 600px) {\n  header[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .heading[_ngcontent-%COMP%] {\n    order: -1;\n    flex-basis: 100%;\n  }\n  header[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]:last-child {\n    margin-left: auto;\n  }\n  .calibrations[_ngcontent-%COMP%] {\n    gap: 8px;\n    padding: 8px;\n  }\n  .calibrations[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n    width: 25px;\n    height: 25px;\n    font-size: 16px;\n  }\n  .calibrations[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  .calibrations[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .calibrations[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .stage-shell[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    height: 48vw;\n    min-height: 0;\n  }\n  .operation[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .crank[_ngcontent-%COMP%] {\n    order: 1;\n  }\n  .status[_ngcontent-%COMP%] {\n    flex-basis: 100%;\n  }\n  .primary[_ngcontent-%COMP%] {\n    order: 2;\n    flex: 1;\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    gap: 14px;\n  }\n  .toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-height: 44px;\n  }\n  .run-caption[_ngcontent-%COMP%] {\n    inset: 8px;\n    bottom: auto;\n    font-size: 12px;\n  }\n  .run-caption[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    margin: 5px 0 0;\n  }\n  .inventory[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 86px;\n  }\n  .destinations[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  .destinations[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 8px;\n    font-size: 12px;\n  }\n}\n/*# sourceMappingURL=gear-lock.component.css.map */', "\n.week-preview[_nghost-%COMP%]   .preview-action[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 10px 16px;\n  background: #23443f;\n  border-block: 1px solid rgba(140, 158, 117, 0.3333333333);\n  flex-shrink: 0;\n  font-size: 13px;\n}\n.week-preview[_nghost-%COMP%]   .preview-action[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  min-height: 44px;\n}\n.week-preview[_nghost-%COMP%]   .preview-action[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 12px;\n  color: #d1dfd4;\n}\n@media (max-width: 600px) {\n  .week-preview[_nghost-%COMP%]   .preview-action[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n.week-preview[_nghost-%COMP%] {\n  display: block;\n  position: relative;\n  inset: auto;\n  z-index: auto;\n  min-width: 0;\n}\n.week-preview[_nghost-%COMP%]   .workshop[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .chamber[_ngcontent-%COMP%] {\n  height: auto;\n  overflow: visible;\n}\n.week-preview[_nghost-%COMP%]   header[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .workshop-header[_ngcontent-%COMP%] {\n  padding: 12px 18px;\n  gap: 10px;\n}\n.week-preview[_nghost-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(20px, 2vw, 26px);\n}\n.week-preview[_nghost-%COMP%]   nav[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .seals[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 8px;\n}\n.week-preview[_nghost-%COMP%]   nav[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #315850;\n  border-color: #efcb82;\n}\n.week-preview[_nghost-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  height: clamp(250px, 30vw, 400px);\n  min-height: 250px;\n}\n.week-preview[_nghost-%COMP%]   .stage[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.week-preview[_nghost-%COMP%]   footer[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .workbench[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding: 12px 16px;\n}\n.week-preview[_nghost-%COMP%]   .operation[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .equilibrium[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .toolbar[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .tools-row[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .calibrations[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n}\n.week-preview[_nghost-%COMP%]   .mission[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .stage-instruction[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.5;\n}\n.week-preview[_nghost-%COMP%]   .control-card[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .inventory[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .actions[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .operation[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.week-preview[_nghost-%COMP%]   .loading[_ngcontent-%COMP%] {\n  left: 8%;\n  right: 8%;\n  padding: 12px;\n}\n@media (max-width: 600px) {\n  .week-preview[_nghost-%COMP%]   header[_ngcontent-%COMP%], \n   .week-preview[_nghost-%COMP%]   .workshop-header[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .week-preview[_nghost-%COMP%]   .workshop-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    text-align: left;\n  }\n  .week-preview[_nghost-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n    height: 270px;\n  }\n  .week-preview[_nghost-%COMP%]   .run-caption[_ngcontent-%COMP%] {\n    left: 8px;\n    right: 8px;\n  }\n  .week-preview[_nghost-%COMP%]   .calibrations[_ngcontent-%COMP%] {\n    gap: 8px;\n    padding: 10px;\n  }\n  .week-preview[_nghost-%COMP%]   .calibrations[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1 1 130px;\n  }\n  .week-preview[_nghost-%COMP%]   .seals[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1 1 95px;\n    min-width: 0;\n  }\n  .week-preview[_nghost-%COMP%]   button[_ngcontent-%COMP%] {\n    overflow-wrap: anywhere;\n  }\n}\n/*# sourceMappingURL=preview-machine.css.map */", "\n.workshop.gear-diorama[_ngcontent-%COMP%] {\n  height: auto;\n  overflow: visible;\n}\n.workshop.gear-diorama[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n.workshop.gear-diorama[_ngcontent-%COMP%]    > .calibrations[_ngcontent-%COMP%], \n.workshop.gear-diorama[_ngcontent-%COMP%]    > .preview-action[_ngcontent-%COMP%], \n.workshop.gear-diorama[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%], \n.workshop.gear-diorama[_ngcontent-%COMP%]   .run-caption[_ngcontent-%COMP%] {\n  display: none;\n}\n.workshop.gear-diorama[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n  height: 660px;\n  min-height: 660px;\n  flex: none;\n}\n.workshop.gear-diorama[_ngcontent-%COMP%]   .stage[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.week-preview[_nghost-%COMP%]   .workshop.gear-diorama[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n  height: 660px;\n  min-height: 660px;\n}\n@media (max-width: 600px) {\n  .week-preview[_nghost-%COMP%]   .workshop.gear-diorama[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n    height: 710px;\n    min-height: 710px;\n  }\n}\n/*# sourceMappingURL=gear-cage.host.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GearLockComponent, [{
    type: Component,
    args: [{ selector: "app-gear-lock", host: { "[class.week-preview]": "authoringPreview()" }, changeDetection: ChangeDetectionStrategy.OnPush, template: `<section class="workshop" [class.gear-diorama]="diorama() && !error()" aria-label="Gear restoration workshop">
  <header>
    @if (!authoringPreview()) { <button (click)="leave.emit()" [disabled]="running() || paused()">
      &#8592; {{ completed() ? 'Return to rescue' : 'Back to map' }}
    </button> }
    <div class="heading">
      <span>CLOCKWORK RESCUE / GEAR RESTORATION</span>
      <h1 #heading tabindex="-1">{{ definition().title }}</h1>
    </div>
    @if (!authoringPreview()) { <button (click)="pauseRequested.emit()">Pause</button> }
  </header>
  <div class="calibrations" aria-label="Machine calibration clues">
    <div>
      <b>A</b>
      <p>
        First missing cog<strong
          >{{ fraction(definition().firstMultiplier) }} &#215;
          {{ definition().driverTeeth }} teeth</strong
        >
      </p>
    </div>
    <div>
      <b>B</b>
      <p>
        Second missing cog<strong
          >{{ fraction(definition().secondMultiplier) }} &#215;
          {{ definition().pinionTeeth }} teeth</strong
        >
      </p>
    </div>
    <div>
      <b>&#8635;</b>
      <p>
        Release drum target<strong
          >{{ fraction(definition().outputTurns) }} full turn{{
            definition().outputTurns.numerator > definition().outputTurns.denominator ? 's' : ''
          }}</strong
        >
      </p>
    </div>
  </div>
  @if (authoringPreview()) {
    <div class="preview-action">
      <button class="primary" (click)="test()" [disabled]="locked()">Test gear train</button>
      <div><strong>{{ positions()[2] }} input turns</strong><p aria-live="polite">{{ notice() }}</p></div>
    </div>
  }
  <div class="stage-shell">
    <div
      #stage
      class="stage"
      aria-label="Interactive compound gear train. Drag cogs to A and B, or use the buttons below."
    ></div>
    @if (!ready() && !error()) {
      <p class="loading" role="status">Lighting the clockwork workshop...</p>
    }
    @if (error()) {
      <p class="loading" role="status">
        The animated workshop could not load. The cog controls below operate the same lock.
      </p>
    }
    @if (running()) {
      <div class="run-caption" role="status">
        <span>{{ passed() ? 'RELEASE RUN' : 'CALIBRATION TEST' }}</span
        >{{
          passed()
            ? captions[module()]
            : 'The gears turn at the speed set by their tooth counts...'
        }}<button (click)="finish()" [disabled]="paused()">
          {{ passed() ? 'Skip animation' : 'Finish test' }}
        </button>
      </div>
    }
  </div>
  <footer>
    <div class="operation">
      <div class="crank">
        <span>CRANK TURNS</span>
        <div>
          <button
            (click)="crank(-1)"
            [disabled]="locked() || positions()[2] === 1"
            aria-label="Fewer crank turns"
          >
            &#8722;</button
          ><output aria-live="polite">{{ positions()[2] }}</output
          ><button
            (click)="crank(1)"
            [disabled]="locked() || positions()[2] === definition().maxCrank"
            aria-label="More crank turns"
          >
            +
          </button>
        </div>
      </div>
      <div class="status">
        <p class="instruction">{{ definition().instruction }}</p>
        <p aria-live="polite">{{ completed() ? definition().success : notice() }}</p>
      </div>
      @if (completed()) {
        <button class="primary" (click)="leave.emit()" [disabled]="running() || paused()">
          Return to rescue &#8594;
        </button>
      } @else {
        <button class="primary" (click)="test()" [disabled]="locked()">
          Wind &amp; test machine &#8594;
        </button>
      }
    </div>
    <div class="toolbar">
      <button (click)="controls.set(!controls())" [attr.aria-expanded]="controls()">
        {{ controls() ? 'Hide' : 'Show' }} cog controls
      </button>
      <button (click)="help.set(!help())" [attr.aria-expanded]="help()">How gears work</button>
      @if (completed()) {
        <button (click)="replay()" [disabled]="running() || paused()">Replay release run</button>
      } @else {
        <button (click)="reset()" [disabled]="locked()">Reset workbench</button>
      }
    </div>
    @if (help()) {
      <aside>
        <strong>Same teeth passing. Different turns.</strong> A 12-tooth gear turns twice while a
        24-tooth gear turns once. Meshing gears turn in opposite directions. Cog A and the small
        {{ definition().pinionTeeth }}-tooth pinion share an axle, so they make the same number of
        turns. Work through both pairs to find the crank turns. The rails slide to fit each cog;
        fitting alone does not mean its calibration is right.
      </aside>
    }
    @if (controls()) {
      <div class="accessible-controls" aria-label="Cog controls">
        <div class="inventory">
          @for (g of definition().gears; track g.id; let i = $index) {
            <button
              [disabled]="locked()"
              [attr.aria-pressed]="selected() === i"
              (click)="select(i)"
            >
              <strong>{{ g.teeth }}</strong> teeth<small>{{
                positions()[0] === i ? 'On axle A' : positions()[1] === i ? 'On axle B' : 'In tray'
              }}</small>
            </button>
          }
        </div>
        <div class="destinations">
          <button (click)="placeSelected(0)" [disabled]="locked() || selected() === null">
            Place on A</button
          ><button (click)="placeSelected(1)" [disabled]="locked() || selected() === null">
            Place on B</button
          ><button (click)="placeSelected(-1)" [disabled]="locked() || selected() === null">
            Return to tray
          </button>
        </div>
      </div>
    }
  </footer>
  @if (diorama() && !error() && !authoringPreview()) {
    <button (click)="leave.emit()" [disabled]="running() || paused()">
      {{ completed() ? 'Return to rescue' : 'Back to map' }}
    </button>
  }
    @if (saveWarning()) {
      <p class="save-warning" role="alert">
        {{ saveWarning() }}
        <button (click)="retrySave()" [disabled]="paused() || running()">
          Retry saving release
        </button>
      </p>
    }
</section>
`, styles: ['/* src/app/templates/heist/escape/gear-lock/gear-lock.component.scss */\n:host {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  color: #f8edd4;\n  font-family: "Trebuchet MS", sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.workshop {\n  height: var(--expedition-lock-height, 100dvh);\n  display: flex;\n  flex-direction: column;\n  background: #071b21;\n  overflow: auto;\n}\nbutton {\n  font: inherit;\n  color: #e9e4d8;\n  border: 1px solid #57716e;\n  background: #163139;\n  border-radius: 6px;\n  min-height: 44px;\n  padding: 9px 15px;\n  cursor: pointer;\n}\nbutton:hover:not(:disabled) {\n  background: #275055;\n  border-color: #ead295;\n}\nbutton:focus-visible {\n  outline: 3px solid #ffe3a2;\n  outline-offset: 3px;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nheader {\n  display: flex;\n  gap: 22px;\n  align-items: center;\n  padding: 15px 28px;\n  border-bottom: 1px solid rgba(198, 155, 71, 0.3019607843);\n  background:\n    linear-gradient(\n      110deg,\n      #0a222c,\n      #172b2a);\n  flex-shrink: 0;\n}\n.heading {\n  flex: 1;\n}\n.heading span {\n  color: #d6b577;\n  font-size: 10px;\n  letter-spacing: 0.2em;\n}\nh1 {\n  font: 27px Georgia, serif;\n  margin: 3px 0 0;\n}\nh1:focus {\n  outline: none;\n}\n.calibrations {\n  display: flex;\n  justify-content: center;\n  gap: 70px;\n  padding: 10px 20px;\n  background: #10262a;\n  flex-shrink: 0;\n  border-bottom: 1px solid rgba(177, 139, 67, 0.2509803922);\n}\n.calibrations > div {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.calibrations b {\n  width: 36px;\n  height: 36px;\n  display: grid;\n  place-items: center;\n  border: 1px solid #b99a61;\n  border-radius: 50%;\n  color: #f0cf86;\n  font: 22px Georgia, serif;\n}\n.calibrations p {\n  margin: 0;\n  font-size: 11px;\n  color: #a3b8b6;\n}\n.calibrations strong {\n  display: block;\n  color: #f8e5b6;\n  font-size: 18px;\n  margin-top: 3px;\n}\n.stage-shell {\n  position: relative;\n  flex: 1;\n  min-height: 220px;\n  overflow: hidden;\n  background: #06151c;\n}\n.stage {\n  position: absolute;\n  inset: 0;\n}\n.stage ::ng-deep canvas {\n  display: block;\n  touch-action: none;\n}\n.loading {\n  position: absolute;\n  inset: 30% 15%;\n  text-align: center;\n  background: rgba(11, 37, 46, 0.9333333333);\n  padding: 25px;\n  height: fit-content;\n}\n.run-caption {\n  position: absolute;\n  bottom: 14px;\n  left: 15%;\n  right: 15%;\n  background: rgba(6, 27, 34, 0.9607843137);\n  border: 1px solid #bfa366;\n  padding: 12px 18px;\n  text-align: center;\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5333333333);\n  font-size: 15px;\n}\n.run-caption span {\n  display: block;\n  color: #f6cf7b;\n  font-size: 10px;\n  letter-spacing: 0.16em;\n  margin-bottom: 6px;\n}\n.run-caption button {\n  margin-left: 14px;\n  font-size: 12px;\n}\nfooter {\n  flex-shrink: 0;\n  padding: 12px 28px 9px;\n  border-top: 1px solid #b6944d;\n  background:\n    linear-gradient(\n      110deg,\n      #122d33,\n      #091e27);\n}\n.operation {\n  display: flex;\n  gap: 25px;\n  align-items: center;\n}\n.crank {\n  text-align: center;\n  flex-shrink: 0;\n}\n.crank > span {\n  font-size: 10px;\n  letter-spacing: 0.14em;\n  color: #d4b576;\n}\n.crank > div {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-top: 5px;\n}\n.crank output {\n  font: 30px Georgia, serif;\n  width: 28px;\n}\n.crank button {\n  font-size: 22px;\n  padding: 3px 13px;\n}\n.status {\n  flex: 1;\n}\n.status p {\n  margin: 5px 0;\n  font-size: 13px;\n  color: #bfd4cf;\n}\n.status .instruction {\n  color: #f1e8d3;\n  font-size: 15px;\n}\n.primary {\n  background: linear-gradient(#f0d18e, #c5984b);\n  color: #14232a;\n  font-weight: bold;\n  border-color: #fae4b3;\n  padding: 16px 23px;\n}\n.primary:hover:not(:disabled) {\n  background: #ffe1a0;\n}\n.toolbar {\n  display: flex;\n  gap: 16px;\n  justify-content: center;\n  margin-top: 7px;\n}\n.toolbar button {\n  border: 0;\n  background: transparent;\n  font-size: 12px;\n  text-decoration: underline;\n  min-height: 32px;\n  padding: 5px;\n}\naside {\n  padding: 12px;\n  line-height: 1.6;\n  font-size: 13px;\n  background: rgba(255, 255, 255, 0.031372549);\n  border-left: 2px solid #d3b274;\n}\naside strong {\n  display: block;\n}\n.accessible-controls {\n  padding: 10px 0;\n}\n.inventory {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.inventory button {\n  min-width: 94px;\n  font-size: 12px;\n}\n.inventory strong {\n  font-size: 20px;\n}\n.inventory small {\n  display: block;\n  margin-top: 4px;\n  color: #a6c7c2;\n}\n.inventory [aria-pressed=true] {\n  outline: 2px solid #f3cf82;\n  background: #305053;\n}\n.destinations {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  margin-top: 10px;\n}\n.save-warning {\n  color: #ffd1a4;\n}\n@media (max-width: 800px) {\n  header {\n    padding: 10px 14px;\n    gap: 10px;\n  }\n  h1 {\n    font-size: 21px;\n  }\n  .heading span {\n    font-size: 8px;\n  }\n  .calibrations {\n    gap: 20px;\n  }\n  .calibrations strong {\n    font-size: 15px;\n  }\n  footer {\n    padding: 10px 14px;\n  }\n  .operation {\n    gap: 12px;\n  }\n  .status .instruction {\n    font-size: 13px;\n  }\n  .primary {\n    padding: 14px;\n  }\n}\n@media (max-width: 600px) {\n  header {\n    flex-wrap: wrap;\n  }\n  .heading {\n    order: -1;\n    flex-basis: 100%;\n  }\n  header > button:last-child {\n    margin-left: auto;\n  }\n  .calibrations {\n    gap: 8px;\n    padding: 8px;\n  }\n  .calibrations b {\n    width: 25px;\n    height: 25px;\n    font-size: 16px;\n  }\n  .calibrations > div {\n    gap: 5px;\n  }\n  .calibrations p {\n    font-size: 9px;\n  }\n  .calibrations strong {\n    font-size: 12px;\n  }\n  .stage-shell {\n    flex: 0 0 auto;\n    height: 48vw;\n    min-height: 0;\n  }\n  .operation {\n    flex-wrap: wrap;\n  }\n  .crank {\n    order: 1;\n  }\n  .status {\n    flex-basis: 100%;\n  }\n  .primary {\n    order: 2;\n    flex: 1;\n  }\n  .toolbar {\n    gap: 14px;\n  }\n  .toolbar button {\n    min-height: 44px;\n  }\n  .run-caption {\n    inset: 8px;\n    bottom: auto;\n    font-size: 12px;\n  }\n  .run-caption button {\n    margin: 5px 0 0;\n  }\n  .inventory button {\n    min-width: 86px;\n  }\n  .destinations {\n    gap: 5px;\n  }\n  .destinations button {\n    padding: 8px;\n    font-size: 12px;\n  }\n}\n/*# sourceMappingURL=gear-lock.component.css.map */\n', "/* src/app/templates/heist/escape/weekly/preview-machine.scss */\n:host(.week-preview) .preview-action {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 10px 16px;\n  background: #23443f;\n  border-block: 1px solid rgba(140, 158, 117, 0.3333333333);\n  flex-shrink: 0;\n  font-size: 13px;\n}\n:host(.week-preview) .preview-action .primary {\n  flex-shrink: 0;\n  min-height: 44px;\n}\n:host(.week-preview) .preview-action p {\n  margin: 3px 0 0;\n  font-size: 12px;\n  color: #d1dfd4;\n}\n@media (max-width: 600px) {\n  :host(.week-preview) .preview-action {\n    flex-wrap: wrap;\n  }\n}\n:host(.week-preview) {\n  display: block;\n  position: relative;\n  inset: auto;\n  z-index: auto;\n  min-width: 0;\n}\n:host(.week-preview) .workshop,\n:host(.week-preview) .chamber {\n  height: auto;\n  overflow: visible;\n}\n:host(.week-preview) header,\n:host(.week-preview) .workshop-header {\n  padding: 12px 18px;\n  gap: 10px;\n}\n:host(.week-preview) h1 {\n  font-size: clamp(20px, 2vw, 26px);\n}\n:host(.week-preview) nav,\n:host(.week-preview) .seals {\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 8px;\n}\n:host(.week-preview) nav button[aria-pressed=true] {\n  background: #315850;\n  border-color: #efcb82;\n}\n:host(.week-preview) .stage-shell {\n  flex: 0 0 auto;\n  height: clamp(250px, 30vw, 400px);\n  min-height: 250px;\n}\n:host(.week-preview) .stage {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n:host(.week-preview) footer,\n:host(.week-preview) .workbench {\n  flex: 0 0 auto;\n  padding: 12px 16px;\n}\n:host(.week-preview) .operation,\n:host(.week-preview) .equilibrium,\n:host(.week-preview) .toolbar,\n:host(.week-preview) .tools-row,\n:host(.week-preview) .calibrations {\n  flex-wrap: wrap;\n}\n:host(.week-preview) .mission,\n:host(.week-preview) .stage-instruction {\n  font-size: 14px;\n  line-height: 1.5;\n}\n:host(.week-preview) .control-card,\n:host(.week-preview) .inventory,\n:host(.week-preview) .actions,\n:host(.week-preview) .operation > div {\n  min-width: 0;\n}\n:host(.week-preview) .loading {\n  left: 8%;\n  right: 8%;\n  padding: 12px;\n}\n@media (max-width: 600px) {\n  :host(.week-preview) header,\n  :host(.week-preview) .workshop-header {\n    flex-wrap: wrap;\n  }\n  :host(.week-preview) .workshop-header > div {\n    text-align: left;\n  }\n  :host(.week-preview) .stage-shell {\n    height: 270px;\n  }\n  :host(.week-preview) .run-caption {\n    left: 8px;\n    right: 8px;\n  }\n  :host(.week-preview) .calibrations {\n    gap: 8px;\n    padding: 10px;\n  }\n  :host(.week-preview) .calibrations > div {\n    min-width: 0;\n    flex: 1 1 130px;\n  }\n  :host(.week-preview) .seals button {\n    flex: 1 1 95px;\n    min-width: 0;\n  }\n  :host(.week-preview) button {\n    overflow-wrap: anywhere;\n  }\n}\n/*# sourceMappingURL=preview-machine.css.map */\n", "/* src/app/templates/heist/escape/gear-lock/gear-cage/gear-cage.host.scss */\n.workshop.gear-diorama {\n  height: auto;\n  overflow: visible;\n}\n.workshop.gear-diorama > header,\n.workshop.gear-diorama > .calibrations,\n.workshop.gear-diorama > .preview-action,\n.workshop.gear-diorama > footer,\n.workshop.gear-diorama .run-caption {\n  display: none;\n}\n.workshop.gear-diorama .stage-shell {\n  height: 660px;\n  min-height: 660px;\n  flex: none;\n}\n.workshop.gear-diorama .stage {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n:host(.week-preview) .workshop.gear-diorama .stage-shell {\n  height: 660px;\n  min-height: 660px;\n}\n@media (max-width: 600px) {\n  :host(.week-preview) .workshop.gear-diorama .stage-shell {\n    height: 710px;\n    min-height: 710px;\n  }\n}\n/*# sourceMappingURL=gear-cage.host.css.map */\n"] }]
  }], () => [], { definition: [{ type: Input, args: [{ isSignal: true, alias: "definition", required: true }] }], authoringPreview: [{ type: Input, args: [{ isSignal: true, alias: "authoringPreview", required: false }] }], tested: [{ type: Output, args: ["tested"] }], answer: [{ type: Input, args: [{ isSignal: true, alias: "answer", required: false }] }], completed: [{ type: Input, args: [{ isSignal: true, alias: "completed", required: false }] }], paused: [{ type: Input, args: [{ isSignal: true, alias: "paused", required: false }] }], reducedMotion: [{ type: Input, args: [{ isSignal: true, alias: "reducedMotion", required: false }] }], saveWarning: [{ type: Input, args: [{ isSignal: true, alias: "saveWarning", required: false }] }], changed: [{ type: Output, args: ["changed"] }], solved: [{ type: Output, args: ["solved"] }], leave: [{ type: Output, args: ["leave"] }], pauseRequested: [{ type: Output, args: ["pauseRequested"] }], sound: [{ type: Output, args: ["sound"] }], stage: [{
    type: ViewChild,
    args: ["stage", { static: true }]
  }], heading: [{
    type: ViewChild,
    args: ["heading", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GearLockComponent, { className: "GearLockComponent", filePath: "src/app/templates/heist/escape/gear-lock/gear-lock.component.ts", lineNumber: 40 });
})();

// src/app/templates/heist/escape/locks/machine-presentation.ts
function isBridgeDiorama(definition) {
  return definition.presentation?.kind === "bridge-cage";
}
function isCageDiorama(stage) {
  return stage.kind === "timing-wheels" && stage.presentation?.kind === "timing-cage" || stage.kind === "fraction-gear" && stage.presentation?.kind === "fraction-cage" || stage.kind === "reflection" && stage.presentation?.kind === "optics-cage";
}

// src/app/templates/heist/escape/locks/machine-workshop.component.ts
var _c03 = ["stageHost"];
var _c13 = ["heading"];
var _forTrack03 = ($index, $item) => $item.id;
function MachineWorkshopComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.leave.emit());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r1.testing() || ctx_r1.paused());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2190 ", ctx_r1.completed() ? "Return to rescue" : "Back to map", " ");
  }
}
function MachineWorkshopComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 15);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pauseRequested.emit());
    });
    \u0275\u0275text(1, "Pause");
    \u0275\u0275domElementEnd();
  }
}
function MachineWorkshopComponent_For_12_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_For_12_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const \u0275$index_23_r5 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectStage(\u0275$index_23_r5));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    const s_r7 = ctx_r5.$implicit;
    const \u0275$index_23_r5 = ctx_r5.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r1.testing() || ctx_r1.paused());
    \u0275\u0275attribute("aria-pressed", \u0275$index_23_r5 === ctx_r1.active());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", \u0275$index_23_r5 + 1, " \xB7 ", s_r7.title);
  }
}
function MachineWorkshopComponent_For_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    const s_r7 = ctx_r5.$implicit;
    const \u0275$index_23_r5 = ctx_r5.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", \u0275$index_23_r5 === ctx_r1.active())("sealed", ctx_r1.state().seals.includes(s_r7.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r1.state().seals.includes(s_r7.id) ? "\u2713" : \u0275$index_23_r5 + 1, " \xB7 ", s_r7.title);
  }
}
function MachineWorkshopComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MachineWorkshopComponent_For_12_Conditional_0_Template, 2, 4, "button", 3)(1, MachineWorkshopComponent_For_12_Conditional_1_Template, 2, 6, "span", 16);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.authoringPreview() ? 0 : 1);
  }
}
function MachineWorkshopComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.stage().instruction);
  }
}
function MachineWorkshopComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 9);
    \u0275\u0275text(1, "Preparing the workshop...");
    \u0275\u0275domElementEnd();
  }
}
function MachineWorkshopComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 9);
    \u0275\u0275text(1, " The animated workshop could not load. The same mathematical machine works with the controls below. ");
    \u0275\u0275domElementEnd();
  }
}
function MachineWorkshopComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 10)(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_19_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.finish());
    });
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.passed() ? "MECHANISM ENGAGED" : "TESTING THE MECHANISM");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.passed() ? ctx_r1.stage().success : ctx_r1.reading().feedback);
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.paused());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.passed() ? "Skip release animation" : "Finish test", " ");
  }
}
function MachineWorkshopComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 11)(1, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_21_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.test());
    });
    \u0275\u0275text(2, "Test");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "button", 17);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_21_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reset());
    });
    \u0275\u0275text(4, "\u21BA");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 15);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_21_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.pauseRequested.emit());
    });
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || !ctx_r1.settled());
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.locked());
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.paused());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.paused() ? "Resume" : "Pause");
  }
}
function MachineWorkshopComponent_Conditional_22_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 23);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_22_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.leave.emit());
    });
    \u0275\u0275text(1, " Return to rescue \u2192 ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("disabled", ctx_r1.testing() || ctx_r1.paused());
  }
}
function MachineWorkshopComponent_Conditional_22_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 23);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_22_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nextStage());
    });
    \u0275\u0275text(1, " Next mechanism \u2192 ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("disabled", ctx_r1.testing() || ctx_r1.paused());
  }
}
function MachineWorkshopComponent_Conditional_22_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 23);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_22_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.test());
    });
    \u0275\u0275text(1, " Engage release \u2192 ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || !ctx_r1.settled());
  }
}
function MachineWorkshopComponent_Conditional_22_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_22_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.replay());
    });
    \u0275\u0275text(1, "Replay release");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("disabled", ctx_r1.testing() || ctx_r1.paused());
  }
}
function MachineWorkshopComponent_Conditional_22_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_22_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.reset());
    });
    \u0275\u0275text(1, "Reset this mechanism");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("disabled", ctx_r1.locked());
  }
}
function MachineWorkshopComponent_Conditional_22_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "aside");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.stage().hint);
  }
}
function MachineWorkshopComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 18)(1, "div")(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p", 19);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p", 20);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(8, MachineWorkshopComponent_Conditional_22_Conditional_8_Template, 2, 1, "button", 21)(9, MachineWorkshopComponent_Conditional_22_Conditional_9_Template, 2, 1, "button", 21)(10, MachineWorkshopComponent_Conditional_22_Conditional_10_Template, 2, 1, "button", 21);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "div", 22)(12, "button", 15);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_22_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.controls.set(!ctx_r1.controls()));
    });
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "button", 15);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_22_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.help.set(!ctx_r1.help()));
    });
    \u0275\u0275text(15, " Show the mechanic's clue ");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(16, MachineWorkshopComponent_Conditional_22_Conditional_16_Template, 2, 1, "button", 3)(17, MachineWorkshopComponent_Conditional_22_Conditional_17_Template, 2, 1, "button", 3);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(18, MachineWorkshopComponent_Conditional_22_Conditional_18_Template, 2, 1, "aside");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.sealed() ? "MECHANISM RELEASED" : "LIVE MEASUREMENTS");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.reading().equation);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.notice());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.completed() ? 8 : ctx_r1.sealed() ? 9 : 10);
    \u0275\u0275advance(4);
    \u0275\u0275attribute("aria-expanded", ctx_r1.controls());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.controls() ? "Hide" : "Show", " machine controls");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r1.help());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.sealed() ? 16 : 17);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.help() ? 18 : -1);
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_0_For_2_Template_button_click_0_listener() {
      const \u0275$index_128_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.select(\u0275$index_128_r18));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementStart(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const p_r19 = ctx.$implicit;
    const \u0275$index_128_r18 = ctx.$index;
    const a_r20 = \u0275\u0275nextContext(2);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275domProperty("disabled", ctx_r1.locked());
    \u0275\u0275attribute("aria-pressed", ctx_r1.selected() === \u0275$index_128_r18);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", p_r19.numerator, "/", p_r19.denominator);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Piece ", \u0275$index_128_r18 + 1, " \xB7 ", a_r20.offsets[\u0275$index_128_r18] < 0 ? "tray" : "on ring");
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_0_For_2_Template, 4, 6, "button", 3, _forTrack03);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 25)(4, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.seatPiece());
    });
    \u0275\u0275text(5, " Seat selected sector");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.turnPiece(-1));
    });
    \u0275\u0275text(7, " Rotate sector left");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_0_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.turnPiece(1));
    });
    \u0275\u0275text(9, " Rotate sector right");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_0_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.removePiece());
    });
    \u0275\u0275text(11, " Return sector to tray ");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const d_r21 = \u0275\u0275nextContext(2);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(d_r21.pieces);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || ctx_r1.selected() === null);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || ctx_r1.selected() === null);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || ctx_r1.selected() === null);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || ctx_r1.selected() === null);
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 26)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_1_For_2_Template_button_click_5_listener() {
      const \u0275$index_152_r23 = \u0275\u0275restoreView(_r22).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.operate({ type: "pour", index: \u0275$index_152_r23, delta: 1 }));
    });
    \u0275\u0275text(6, " +");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_1_For_2_Template_button_click_7_listener() {
      const \u0275$index_152_r23 = \u0275\u0275restoreView(_r22).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.operate({ type: "pour", index: \u0275$index_152_r23, delta: -1 }));
    });
    \u0275\u0275text(8, " \u2212 ");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const v_r24 = ctx.$implicit;
    const \u0275$index_152_r23 = ctx.$index;
    const a_r20 = \u0275\u0275nextContext(2);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r24.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", v_r24.uses - a_r20.pours[\u0275$index_152_r23], " left");
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || a_r20.pours[\u0275$index_152_r23] >= v_r24.uses);
    \u0275\u0275attribute("aria-label", "Pour " + v_r24.label);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || a_r20.pours[\u0275$index_152_r23] === 0);
    \u0275\u0275attribute("aria-label", "Remove one " + v_r24.label + " pour");
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_1_For_2_Template, 9, 6, "div", 26, _forTrack03);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const d_r21 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(d_r21.vessels);
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 25)(1, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_2_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r25);
      const a_r20 = \u0275\u0275nextContext();
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.operate({ type: "steps", value: a_r20.steps - 1 }));
    });
    \u0275\u0275text(2, " Rewind one step");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_2_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r25);
      const a_r20 = \u0275\u0275nextContext();
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.operate({ type: "steps", value: a_r20.steps + 1 }));
    });
    \u0275\u0275text(6, " Advance one step ");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "label", 27);
    \u0275\u0275text(8);
    \u0275\u0275domElementStart(9, "input", 28);
    \u0275\u0275domListener("change", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_2_Template_input_change_9_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.operate({ type: "steps", value: +$event.target.value }));
    });
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const a_r20 = \u0275\u0275nextContext();
    const d_r21 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || a_r20.steps === 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", a_r20.steps, " steps");
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || a_r20.steps === d_r21.maxSteps);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Crank run: ", a_r20.steps, " steps");
    \u0275\u0275advance();
    \u0275\u0275domProperty("max", d_r21.maxSteps)("value", a_r20.steps)("disabled", ctx_r1.locked());
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 25)(1, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.moveHead("x", -1));
    });
    \u0275\u0275text(2, " X left");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_3_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.moveHead("x", 1));
    });
    \u0275\u0275text(6, " X right");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_3_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.moveHead("y", -1));
    });
    \u0275\u0275text(8, " Y down");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_3_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.moveHead("y", 1));
    });
    \u0275\u0275text(12, " Y up ");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const a_r20 = \u0275\u0275nextContext();
    const d_r21 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || a_r20.x === d_r21.min);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("X = ", a_r20.x);
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || a_r20.x === d_r21.max);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || a_r20.y === d_r21.min);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Y = ", a_r20.y);
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || a_r20.y === d_r21.max);
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 26)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "small");
    \u0275\u0275text(4, "Mirror surface angle; 0\xB0 is horizontal.");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_4_For_2_Template_button_click_5_listener() {
      const \u0275$index_208_r28 = \u0275\u0275restoreView(_r27).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.turnMirror(\u0275$index_208_r28, -1));
    });
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_4_For_2_Template_button_click_7_listener() {
      const \u0275$index_208_r28 = \u0275\u0275restoreView(_r27).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.turnMirror(\u0275$index_208_r28, 1));
    });
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const m_r29 = ctx.$implicit;
    const \u0275$index_208_r28 = ctx.$index;
    const a_r20 = \u0275\u0275nextContext(2);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Mirror ", \u0275$index_208_r28 + 1, " \xB7 ", a_r20.angles[\u0275$index_208_r28], "\xB0");
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("disabled", ctx_r1.locked());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Mirror ", \u0275$index_208_r28 + 1, " minus ", m_r29.step, "\xB0");
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.locked());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Mirror ", \u0275$index_208_r28 + 1, " plus ", m_r29.step, "\xB0 ");
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_4_For_2_Template, 9, 8, "div", 26, _forTrack03);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const d_r21 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(d_r21.mirrors);
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 26)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_5_For_2_Template_button_click_5_listener() {
      const \u0275$index_226_r31 = \u0275\u0275restoreView(_r30).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.operate({ type: "measure", index: \u0275$index_226_r31, delta: 1 }));
    });
    \u0275\u0275text(6, " +");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_5_For_2_Template_button_click_7_listener() {
      const \u0275$index_226_r31 = \u0275\u0275restoreView(_r30).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.operate({ type: "measure", index: \u0275$index_226_r31, delta: -1 }));
    });
    \u0275\u0275text(8, " \u2212 ");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const v_r32 = ctx.$implicit;
    const \u0275$index_226_r31 = ctx.$index;
    const a_r20 = \u0275\u0275nextContext(2);
    const d_r21 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r32.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate4("", a_r20.measures[\u0275$index_226_r31] * v_r32.measure / d_r21.unitTicks, " ", d_r21.unit, " in mix \xB7 ", v_r32.measure / d_r21.unitTicks, " ", d_r21.unit, " per pump");
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || (a_r20.measures[\u0275$index_226_r31] + 1) * v_r32.measure > v_r32.supply);
    \u0275\u0275attribute("aria-label", "Pump " + v_r32.label);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.locked() || a_r20.measures[\u0275$index_226_r31] === 0);
    \u0275\u0275attribute("aria-label", "Remove " + v_r32.label + " measure");
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_5_For_2_Template, 9, 9, "div", 26, _forTrack03);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const d_r21 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(d_r21.ingredients);
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_6_For_2_Template_button_click_0_listener() {
      const \u0275$index_244_r34 = \u0275\u0275restoreView(_r33).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.operate({ type: "cable", index: \u0275$index_244_r34 }));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const c_r35 = ctx.$implicit;
    const \u0275$index_244_r34 = ctx.$index;
    const a_r20 = \u0275\u0275nextContext(2);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275domProperty("disabled", ctx_r1.locked());
    \u0275\u0275attribute("aria-pressed", a_r20.cable === \u0275$index_244_r34);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Attach ", c_r35.label, " cable ");
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_6_For_2_Template, 2, 3, "button", 3, _forTrack03);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const d_r21 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(d_r21.cables);
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_0_Template, 12, 4);
    \u0275\u0275conditionalCreate(1, MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_1_Template, 3, 0, "div", 24);
    \u0275\u0275conditionalCreate(2, MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_2_Template, 10, 7);
    \u0275\u0275conditionalCreate(3, MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_3_Template, 13, 6, "div", 25);
    \u0275\u0275conditionalCreate(4, MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_4_Template, 3, 0, "div", 24);
    \u0275\u0275conditionalCreate(5, MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_5_Template, 3, 0, "div", 24);
    \u0275\u0275conditionalCreate(6, MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Conditional_6_Template, 3, 0, "div", 24);
  }
  if (rf & 2) {
    const a_r20 = ctx;
    const d_r21 = \u0275\u0275nextContext();
    \u0275\u0275conditional(d_r21.kind === "fraction-gear" && a_r20.kind === "fraction-gear" ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(d_r21.kind === "volume" && a_r20.kind === "volume" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(d_r21.kind === "timing-wheels" && a_r20.kind === "timing-wheels" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(d_r21.kind === "coordinate" && a_r20.kind === "coordinate" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(d_r21.kind === "reflection" && a_r20.kind === "reflection" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(d_r21.kind === "mixing" && a_r20.kind === "mixing" ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(d_r21.kind === "cable" && a_r20.kind === "cable" ? 6 : -1);
  }
}
function MachineWorkshopComponent_Conditional_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MachineWorkshopComponent_Conditional_23_Conditional_1_Conditional_0_Template, 7, 7);
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional((tmp_5_0 = ctx_r1.stageAnswer()) ? 0 : -1, tmp_5_0);
  }
}
function MachineWorkshopComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 12);
    \u0275\u0275conditionalCreate(1, MachineWorkshopComponent_Conditional_23_Conditional_1_Template, 1, 1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx_r1.stage()) ? 1 : -1, tmp_3_0);
  }
}
function MachineWorkshopComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275domElementStart(2, "button", 14);
    \u0275\u0275domListener("click", function MachineWorkshopComponent_Conditional_24_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retrySave.emit());
    });
    \u0275\u0275text(3, "Retry save");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saveWarning(), " ");
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.paused());
  }
}
var MACHINE_SCENE_LOADER = new InjectionToken("MACHINE_SCENE_LOADER", { providedIn: "root", factory: () => () => import("./chunk-LC3XGVP5.js") });
var MachineWorkshopComponent = class _MachineWorkshopComponent {
  definition = input.required(
    ...ngDevMode ? [{ debugName: "definition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  authoringPreview = input(
    false,
    ...ngDevMode ? [{ debugName: "authoringPreview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  initialStage = input(
    0,
    ...ngDevMode ? [{ debugName: "initialStage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tested = output();
  answer = input(
    null,
    ...ngDevMode ? [{ debugName: "answer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  grade = input(
    5,
    ...ngDevMode ? [{ debugName: "grade" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completed = input(
    false,
    ...ngDevMode ? [{ debugName: "completed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  paused = input(
    false,
    ...ngDevMode ? [{ debugName: "paused" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reducedMotion = input(
    false,
    ...ngDevMode ? [{ debugName: "reducedMotion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveWarning = input(
    "",
    ...ngDevMode ? [{ debugName: "saveWarning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  changed = output();
  solved = output();
  leave = output();
  pauseRequested = output();
  retrySave = output();
  sound = output();
  active = signal(
    0,
    ...ngDevMode ? [{ debugName: "active" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = signal(
    null,
    ...ngDevMode ? [{ debugName: "selected" }] : (
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
  error = signal(
    false,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  controls = signal(
    false,
    ...ngDevMode ? [{ debugName: "controls" }] : (
      /* istanbul ignore next */
      []
    )
  );
  help = signal(
    false,
    ...ngDevMode ? [{ debugName: "help" }] : (
      /* istanbul ignore next */
      []
    )
  );
  testing = signal(
    false,
    ...ngDevMode ? [{ debugName: "testing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  passed = signal(
    false,
    ...ngDevMode ? [{ debugName: "passed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  trial = signal(
    0,
    ...ngDevMode ? [{ debugName: "trial" }] : (
      /* istanbul ignore next */
      []
    )
  );
  settled = signal(
    true,
    ...ngDevMode ? [{ debugName: "settled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  notice = signal(
    "Explore the mechanism. Its measurements are your clues.",
    ...ngDevMode ? [{ debugName: "notice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  state = computed(
    () => this.answer() ?? initialMachine(this.definition()),
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stage = computed(
    () => this.definition().stages[this.active()],
    ...ngDevMode ? [{ debugName: "stage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  diorama = computed(
    () => isCageDiorama(this.stage()) || isBridgeDiorama(this.definition()),
    ...ngDevMode ? [{ debugName: "diorama" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stageAnswer = computed(
    () => this.state().stages[this.active()],
    ...ngDevMode ? [{ debugName: "stageAnswer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reading = computed(
    () => machineReading(this.stage(), this.stageAnswer()),
    ...ngDevMode ? [{ debugName: "reading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sealed = computed(
    () => !this.authoringPreview() && (this.completed() || this.state().seals.includes(this.stage().id)),
    ...ngDevMode ? [{ debugName: "sealed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  locked = computed(
    () => this.paused() || this.testing() || this.sealed(),
    ...ngDevMode ? [{ debugName: "locked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  Math = Math;
  loader = inject(MACHINE_SCENE_LOADER);
  scene;
  destroyed = false;
  host;
  heading;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.scene?.destroy();
    });
  }
  async ngAfterViewInit() {
    this.active.set(Math.min(this.state().seals.length, this.definition().stages.length - 1));
    if (this.authoringPreview() && Number.isInteger(this.initialStage()) && this.definition().stages[this.initialStage()])
      this.active.set(this.initialStage());
    this.controls.set(this.host.nativeElement.clientWidth > 0 && this.host.nativeElement.clientWidth < 700);
    this.heading.nativeElement.focus({ preventScroll: true });
    if (!this.authoringPreview() && !this.completed() && this.state().seals.length === this.definition().stages.length)
      this.solved.emit();
    try {
      const { mountMachineScene } = await this.loader();
      if (this.destroyed)
        return;
      this.scene = mountMachineScene(this.host.nativeElement, this.definition(), () => ({
        stages: this.state().stages,
        freelySelectStages: this.authoringPreview(),
        active: this.active(),
        answer: this.stageAnswer(),
        selected: this.selected(),
        testing: this.testing(),
        trial: this.trial(),
        passed: this.passed(),
        completed: this.sealed(),
        paused: this.paused(),
        reducedMotion: this.reducedMotion()
      }), {
        stage: (i) => {
          if (this.authoringPreview())
            this.selectStage(i);
          else if (i === this.active() + 1)
            this.nextStage();
        },
        input: (i) => this.operate(i),
        select: (i) => this.select(i),
        ready: () => this.ready.set(true),
        failed: () => {
          this.error.set(true);
          this.controls.set(true);
          this.settled.set(true);
        },
        settled: (v) => this.settled.set(v),
        finished: () => this.finish(),
        engage: () => this.test(),
        replay: () => this.replay(),
        pause: () => this.pauseRequested.emit()
      });
    } catch {
      this.error.set(true);
      this.controls.set(true);
    }
  }
  select(index) {
    if (!this.locked()) {
      this.selected.set(index);
      this.notice.set("Selected. Use the mechanism or its matching controls below.");
    }
  }
  operate(input2) {
    if (this.locked())
      return;
    const current = this.stageAnswer(), next = reduceMachine(this.stage(), current, input2);
    if (next === current)
      return;
    this.changed.emit(__spreadProps(__spreadValues({}, this.state()), {
      stages: this.state().stages.map((a, i) => i === this.active() ? next : a)
    }));
    this.sound.emit("turn");
    this.notice.set("Watch the mechanism respond, then engage the release when it is ready.");
  }
  turnPiece(delta) {
    const a = this.stageAnswer(), d = this.stage(), i = this.selected();
    if (i !== null && d.kind === "fraction-gear" && a.kind === "fraction-gear")
      this.operate({
        type: "piece",
        index: i,
        offset: a.offsets[i] < 0 ? 0 : (a.offsets[i] + delta + d.slots) % d.slots
      });
  }
  seatPiece() {
    const a = this.stageAnswer(), d = this.stage(), i = this.selected();
    if (i === null || d.kind !== "fraction-gear" || a.kind !== "fraction-gear")
      return;
    let offset = 0;
    d.pieces.forEach((p, j) => {
      if (j !== i && a.offsets[j] >= 0)
        offset = Math.max(offset, a.offsets[j] + d.slots * p.numerator / p.denominator);
    });
    this.operate({ type: "piece", index: i, offset: offset % d.slots });
  }
  removePiece() {
    const i = this.selected();
    if (i !== null)
      this.operate({ type: "piece", index: i, offset: -1 });
  }
  moveHead(axis, delta) {
    const a = this.stageAnswer();
    if (a.kind === "coordinate")
      this.operate({
        type: "point",
        x: a.x + (axis === "x" ? delta : 0),
        y: a.y + (axis === "y" ? delta : 0)
      });
  }
  turnMirror(index, delta) {
    const a = this.stageAnswer(), d = this.stage();
    if (a.kind === "reflection" && d.kind === "reflection")
      this.operate({
        type: "mirror",
        index,
        angle: (a.angles[index] + delta * d.mirrors[index].step + 180) % 180
      });
  }
  test() {
    if (this.locked())
      return;
    if (!this.settled() && !this.error()) {
      this.notice.set("Let the liquid settle before testing the float.");
      return;
    }
    const reading = this.reading();
    this.passed.set(reading.solved);
    this.testing.set(true);
    this.trial.update((n) => n + 1);
    this.selected.set(null);
    this.sound.emit(reading.solved ? "open" : "turn");
    this.tested.emit(this.active());
    if (reading.solved && !this.authoringPreview()) {
      const state = __spreadProps(__spreadValues({}, this.state()), { seals: [...this.state().seals, this.stage().id] });
      this.changed.emit(state);
      if (state.seals.length === this.definition().stages.length)
        this.solved.emit();
    }
    if (this.error())
      this.finish();
  }
  finish() {
    if (this.paused() || !this.testing())
      return;
    this.testing.set(false);
    this.notice.set(this.reading().feedback);
    if (!this.passed())
      this.sound.emit("wrong");
  }
  nextStage() {
    if (this.paused() || this.testing() || !this.sealed())
      return;
    const next = this.active() + 1;
    if (next < this.definition().stages.length) {
      this.active.set(next);
      this.selected.set(null);
      this.settled.set(true);
      this.notice.set(this.stage().instruction);
    }
  }
  selectStage(index) {
    if (!this.authoringPreview() || this.paused() || this.testing() || !this.definition().stages[index])
      return;
    this.active.set(index);
    this.selected.set(null);
    this.settled.set(true);
    this.notice.set(this.stage().instruction);
  }
  replay() {
    if (!this.sealed() && !(this.diorama() && this.reading().solved) || this.testing() || this.paused())
      return;
    this.passed.set(true);
    this.testing.set(true);
    this.trial.update((n) => n + 1);
    if (this.error())
      this.finish();
  }
  reset() {
    this.operate({ type: "reset" });
    this.selected.set(null);
  }
  static \u0275fac = function MachineWorkshopComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MachineWorkshopComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MachineWorkshopComponent, selectors: [["app-machine-workshop"]], viewQuery: function MachineWorkshopComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c03, 7)(_c13, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.host = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.heading = _t.first);
    }
  }, hostVars: 2, hostBindings: function MachineWorkshopComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("week-preview", ctx.authoringPreview());
    }
  }, inputs: { definition: [1, "definition"], authoringPreview: [1, "authoringPreview"], initialStage: [1, "initialStage"], answer: [1, "answer"], grade: [1, "grade"], completed: [1, "completed"], paused: [1, "paused"], reducedMotion: [1, "reducedMotion"], saveWarning: [1, "saveWarning"] }, outputs: { tested: "tested", changed: "changed", solved: "solved", leave: "leave", pauseRequested: "pauseRequested", retrySave: "retrySave", sound: "sound" }, decls: 25, vars: 19, consts: [["heading", ""], ["stageHost", ""], ["aria-label", "Math machine workshop", 1, "workshop"], [3, "disabled"], ["tabindex", "-1"], ["aria-label", "Workshop stages", 3, "hidden"], [1, "mission"], [1, "stage-shell"], [1, "stage"], ["role", "status", 1, "loading"], ["role", "status", 1, "run-caption"], [1, "preview-operation"], ["aria-label", "Accessible machine controls", 1, "controls"], ["role", "alert", 1, "warning"], [3, "click", "disabled"], [3, "click"], [3, "active", "sealed"], ["aria-label", "Reset mechanism", 3, "click", "disabled"], [1, "operation"], [1, "equation"], ["aria-live", "polite", 1, "notice"], [1, "primary", 3, "disabled"], [1, "toolbar"], [1, "primary", 3, "click", "disabled"], [1, "inventory"], [1, "actions"], [1, "control-card"], [1, "slider"], ["type", "range", "min", "0", "aria-label", "Crank step count", 3, "change", "max", "value", "disabled"]], template: function MachineWorkshopComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 2)(1, "header");
      \u0275\u0275conditionalCreate(2, MachineWorkshopComponent_Conditional_2_Template, 2, 2, "button", 3);
      \u0275\u0275domElementStart(3, "div")(4, "p");
      \u0275\u0275text(5);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "h1", 4, 0);
      \u0275\u0275text(8);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(9, MachineWorkshopComponent_Conditional_9_Template, 2, 0, "button");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "nav", 5);
      \u0275\u0275repeaterCreate(11, MachineWorkshopComponent_For_12_Template, 2, 1, null, null, _forTrack03);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(13, MachineWorkshopComponent_Conditional_13_Template, 2, 1, "p", 6);
      \u0275\u0275domElementStart(14, "div", 7);
      \u0275\u0275domElement(15, "div", 8, 1);
      \u0275\u0275conditionalCreate(17, MachineWorkshopComponent_Conditional_17_Template, 2, 0, "p", 9);
      \u0275\u0275conditionalCreate(18, MachineWorkshopComponent_Conditional_18_Template, 2, 0, "p", 9);
      \u0275\u0275conditionalCreate(19, MachineWorkshopComponent_Conditional_19_Template, 7, 4, "div", 10);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(20, "footer");
      \u0275\u0275conditionalCreate(21, MachineWorkshopComponent_Conditional_21_Template, 7, 4, "div", 11);
      \u0275\u0275conditionalCreate(22, MachineWorkshopComponent_Conditional_22_Template, 19, 9);
      \u0275\u0275conditionalCreate(23, MachineWorkshopComponent_Conditional_23_Template, 2, 1, "div", 12);
      \u0275\u0275conditionalCreate(24, MachineWorkshopComponent_Conditional_24_Template, 4, 2, "p", 13);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("timing-diorama", ctx.diorama() && !ctx.error())("optics-diorama", ctx.stage().kind === "reflection" && ctx.diorama() && !ctx.error())("bridge-diorama", ctx.definition().presentation?.kind === "bridge-cage" && !ctx.error());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.authoringPreview() ? 2 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("THE KEEPER'S WORKSHOPS / GRADE ", ctx.grade());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.stage().title);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.authoringPreview() ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275domProperty("hidden", ctx.definition().stages.length === 1 || ctx.diorama() && !ctx.error());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.definition().stages);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.authoringPreview() ? 13 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(!ctx.ready() && !ctx.error() ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.testing() && !ctx.authoringPreview() ? 19 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.authoringPreview() ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.authoringPreview() ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.controls() || ctx.authoringPreview() && (!ctx.diorama() || ctx.error()) ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.saveWarning() ? 24 : -1);
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  color: #f5e8cd;\n  font-family: "Trebuchet MS", sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.workshop[_ngcontent-%COMP%] {\n  height: var(--%NS%expedition-lock-height, 100dvh);\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n  background: #081d25;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  cursor: pointer;\n  color: #e9eadc;\n  background: #16343c;\n  border: 1px solid #6b827a;\n  border-radius: 6px;\n  min-height: 44px;\n  padding: 9px 15px;\n}\nbutton[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #2c5053;\n  border-color: #f4d596;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #ffe1a0;\n  outline-offset: 3px;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 22px;\n  align-items: center;\n  padding: 14px 28px;\n  background:\n    linear-gradient(\n      110deg,\n      #0c2934,\n      #21322e);\n  border-bottom: 1px solid rgba(163, 130, 71, 0.3137254902);\n  flex-shrink: 0;\n}\nheader[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  flex: 1;\n}\nheader[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 0.19em;\n  color: #c5ae77;\n  margin: 0 0 5px;\n}\nh1[_ngcontent-%COMP%] {\n  font: 28px Georgia, serif;\n  margin: 0;\n}\nh1[_ngcontent-%COMP%]:focus {\n  outline: 0;\n}\nnav[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 22px;\n  padding: 9px;\n  background: #102b31;\n  flex-shrink: 0;\n  font-size: 12px;\n}\nnav[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #a1b9b6;\n}\nnav[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%] {\n  color: #f5d08b;\n}\nnav[_ngcontent-%COMP%]   .sealed[_ngcontent-%COMP%] {\n  color: #a3e7c4;\n}\n.mission[_ngcontent-%COMP%] {\n  padding: 9px 25px;\n  text-align: center;\n  font-size: 15px;\n  line-height: 1.5;\n  margin: 0;\n  background: #153138;\n  flex-shrink: 0;\n}\n.stage-shell[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  min-height: 240px;\n  background: #06151c;\n  overflow: hidden;\n}\n.stage[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.stage[_ngcontent-%COMP%]     canvas {\n  display: block;\n  touch-action: none;\n}\n.loading[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 30%;\n  left: 20%;\n  right: 20%;\n  padding: 20px;\n  background: rgba(12, 38, 56, 0.9333333333);\n  text-align: center;\n}\n.run-caption[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 12px;\n  left: 20%;\n  right: 20%;\n  text-align: center;\n  background: rgba(9, 33, 44, 0.9607843137);\n  border: 1px solid #c4a36a;\n  padding: 12px 18px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5333333333);\n}\n.run-caption[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-size: 11px;\n  letter-spacing: 0.16em;\n  color: #e7c275;\n}\n.run-caption[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  font-size: 14px;\n}\nfooter[_ngcontent-%COMP%] {\n  padding: 12px 26px 8px;\n  background:\n    linear-gradient(\n      110deg,\n      #132e36,\n      #0c222c);\n  border-top: 1px solid #b19158;\n  flex-shrink: 0;\n}\n.operation[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 25px;\n  align-items: center;\n}\n.operation[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.operation[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 0.16em;\n  color: #c3ad75;\n}\n.equation[_ngcontent-%COMP%] {\n  font: 21px Georgia, serif;\n  margin: 5px 0;\n}\n.notice[_ngcontent-%COMP%] {\n  color: #b6d1ca;\n  font-size: 13px;\n  margin: 4px 0;\n}\n.primary[_ngcontent-%COMP%] {\n  background: linear-gradient(#f7dea1, #c79c50);\n  color: #132831;\n  font-weight: bold;\n  padding: 15px 24px;\n  border-color: #f2d592;\n}\n.primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #ffe7b0;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  justify-content: center;\n  margin-top: 7px;\n}\n.toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  text-decoration: underline;\n  font-size: 12px;\n  min-height: 32px;\n  padding: 5px;\n}\n.controls[_ngcontent-%COMP%] {\n  padding: 10px 0 3px;\n}\n.inventory[_ngcontent-%COMP%], \n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.inventory[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  min-width: 100px;\n}\n.inventory[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  margin-top: 5px;\n  color: #bfd6cb;\n}\n.inventory[_ngcontent-%COMP%]   [aria-pressed=true][_ngcontent-%COMP%] {\n  outline: 2px solid #ffe1a0;\n  background: #31565b;\n}\n.actions[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n.control-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  padding: 10px;\n  background: rgba(255, 255, 255, 0.0235294118);\n  border: 1px solid rgba(151, 175, 164, 0.2);\n  border-radius: 6px;\n  max-width: 270px;\n  flex: 1;\n  min-width: 135px;\n}\n.control-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 17px;\n}\n.control-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.control-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.slider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 20px;\n  margin: 15px auto;\n  max-width: 650px;\n}\n.slider[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 120px;\n  accent-color: #ecc583;\n}\naside[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.031372549);\n  border-left: 2px solid #b69d64;\n  padding: 12px;\n  font-size: 14px;\n  line-height: 1.5;\n}\n.warning[_ngcontent-%COMP%] {\n  color: #ffd394;\n}\n@media (max-width: 800px) {\n  header[_ngcontent-%COMP%] {\n    padding: 10px 14px;\n    gap: 12px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .mission[_ngcontent-%COMP%] {\n    font-size: 13px;\n    padding: 8px 15px;\n  }\n  .operation[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .equation[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  footer[_ngcontent-%COMP%] {\n    padding: 10px 14px;\n  }\n  .primary[_ngcontent-%COMP%] {\n    padding: 12px 16px;\n  }\n  .run-caption[_ngcontent-%COMP%] {\n    left: 10%;\n    right: 10%;\n  }\n}\n@media (max-width: 600px) {\n  header[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    order: -1;\n    flex-basis: 100%;\n  }\n  header[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]:last-child {\n    margin-left: auto;\n  }\n  nav[_ngcontent-%COMP%] {\n    gap: 10px;\n    padding: 7px;\n    font-size: 10px;\n  }\n  .stage-shell[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    height: 50vw;\n    min-height: 0;\n  }\n  .mission[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .operation[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .operation[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    flex-basis: 100%;\n  }\n  .primary[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-height: 44px;\n  }\n  .run-caption[_ngcontent-%COMP%] {\n    inset: 4px;\n    bottom: auto;\n    font-size: 12px;\n    padding: 6px;\n  }\n  .run-caption[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 12px;\n    margin: 4px;\n  }\n  .run-caption[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-height: 36px;\n    padding: 5px;\n  }\n  .control-card[_ngcontent-%COMP%] {\n    min-width: 120px;\n  }\n  .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 12px;\n    padding: 8px;\n  }\n  .inventory[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n    min-width: 85px;\n  }\n  .equation[_ngcontent-%COMP%] {\n    font-size: 17px;\n  }\n  .slider[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n}\n.week-preview[_nghost-%COMP%]   .workshop[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: none;\n}\n[hidden][_ngcontent-%COMP%] {\n  display: none !important;\n}\n.preview-operation[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n  margin-bottom: 10px;\n}\n/*# sourceMappingURL=machine-workshop.component.css.map */', "\n.week-preview[_nghost-%COMP%]   .preview-action[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 10px 16px;\n  background: #23443f;\n  border-block: 1px solid rgba(140, 158, 117, 0.3333333333);\n  flex-shrink: 0;\n  font-size: 13px;\n}\n.week-preview[_nghost-%COMP%]   .preview-action[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  min-height: 44px;\n}\n.week-preview[_nghost-%COMP%]   .preview-action[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 3px 0 0;\n  font-size: 12px;\n  color: #d1dfd4;\n}\n@media (max-width: 600px) {\n  .week-preview[_nghost-%COMP%]   .preview-action[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n.week-preview[_nghost-%COMP%] {\n  display: block;\n  position: relative;\n  inset: auto;\n  z-index: auto;\n  min-width: 0;\n}\n.week-preview[_nghost-%COMP%]   .workshop[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .chamber[_ngcontent-%COMP%] {\n  height: auto;\n  overflow: visible;\n}\n.week-preview[_nghost-%COMP%]   header[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .workshop-header[_ngcontent-%COMP%] {\n  padding: 12px 18px;\n  gap: 10px;\n}\n.week-preview[_nghost-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(20px, 2vw, 26px);\n}\n.week-preview[_nghost-%COMP%]   nav[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .seals[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 8px;\n}\n.week-preview[_nghost-%COMP%]   nav[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #315850;\n  border-color: #efcb82;\n}\n.week-preview[_nghost-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  height: clamp(250px, 30vw, 400px);\n  min-height: 250px;\n}\n.week-preview[_nghost-%COMP%]   .stage[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.week-preview[_nghost-%COMP%]   footer[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .workbench[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding: 12px 16px;\n}\n.week-preview[_nghost-%COMP%]   .operation[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .equilibrium[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .toolbar[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .tools-row[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .calibrations[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n}\n.week-preview[_nghost-%COMP%]   .mission[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .stage-instruction[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.5;\n}\n.week-preview[_nghost-%COMP%]   .control-card[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .inventory[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .actions[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .operation[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.week-preview[_nghost-%COMP%]   .loading[_ngcontent-%COMP%] {\n  left: 8%;\n  right: 8%;\n  padding: 12px;\n}\n@media (max-width: 600px) {\n  .week-preview[_nghost-%COMP%]   header[_ngcontent-%COMP%], \n   .week-preview[_nghost-%COMP%]   .workshop-header[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .week-preview[_nghost-%COMP%]   .workshop-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    text-align: left;\n  }\n  .week-preview[_nghost-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n    height: 270px;\n  }\n  .week-preview[_nghost-%COMP%]   .run-caption[_ngcontent-%COMP%] {\n    left: 8px;\n    right: 8px;\n  }\n  .week-preview[_nghost-%COMP%]   .calibrations[_ngcontent-%COMP%] {\n    gap: 8px;\n    padding: 10px;\n  }\n  .week-preview[_nghost-%COMP%]   .calibrations[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1 1 130px;\n  }\n  .week-preview[_nghost-%COMP%]   .seals[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1 1 95px;\n    min-width: 0;\n  }\n  .week-preview[_nghost-%COMP%]   button[_ngcontent-%COMP%] {\n    overflow-wrap: anywhere;\n  }\n}\n/*# sourceMappingURL=preview-machine.css.map */", "\n.workshop.timing-diorama[_ngcontent-%COMP%] {\n  height: auto;\n  overflow: visible;\n}\n.workshop.timing-diorama[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%], \n.workshop.timing-diorama[_ngcontent-%COMP%]    > nav[_ngcontent-%COMP%], \n.workshop.timing-diorama[_ngcontent-%COMP%]    > .mission[_ngcontent-%COMP%], \n.workshop.timing-diorama[_ngcontent-%COMP%]    > .preview-action[_ngcontent-%COMP%], \n.workshop.timing-diorama[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%], \n.workshop.timing-diorama[_ngcontent-%COMP%]   .run-caption[_ngcontent-%COMP%] {\n  display: none;\n}\n.workshop.timing-diorama[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n  height: 620px;\n  min-height: 620px;\n  flex: none;\n}\n.workshop.timing-diorama[_ngcontent-%COMP%]   .stage[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.week-preview[_nghost-%COMP%]   .workshop.timing-diorama[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n  height: 620px;\n  min-height: 620px;\n}\n@media (max-width: 600px) {\n  .week-preview[_nghost-%COMP%]   .workshop.timing-diorama[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n    height: 650px;\n    min-height: 650px;\n  }\n}\n/*# sourceMappingURL=timing-cage.host.css.map */", "\n.workshop.optics-diorama[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .workshop.optics-diorama[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n  height: 680px;\n  min-height: 680px;\n}\n@media (max-width: 600px) {\n  .week-preview[_nghost-%COMP%]   .workshop.optics-diorama[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n    height: 700px;\n    min-height: 700px;\n  }\n}\n/*# sourceMappingURL=optics-cage.host.css.map */", "\n.workshop.bridge-diorama[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%], \n.week-preview[_nghost-%COMP%]   .workshop.bridge-diorama[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n  height: 720px;\n  min-height: 720px;\n}\n@media (max-width: 600px) {\n  .week-preview[_nghost-%COMP%]   .workshop.bridge-diorama[_ngcontent-%COMP%]   .stage-shell[_ngcontent-%COMP%] {\n    height: 740px;\n    min-height: 740px;\n  }\n}\n/*# sourceMappingURL=bridge-cage.host.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MachineWorkshopComponent, [{
    type: Component,
    args: [{ selector: "app-machine-workshop", host: { "[class.week-preview]": "authoringPreview()" }, changeDetection: ChangeDetectionStrategy.OnPush, template: `<section class="workshop" [class.timing-diorama]="diorama() && !error()" [class.optics-diorama]="stage().kind === 'reflection' && diorama() && !error()" [class.bridge-diorama]="definition().presentation?.kind === 'bridge-cage' && !error()" aria-label="Math machine workshop">\r
  <header>\r
    @if (!authoringPreview()) { <button (click)="leave.emit()" [disabled]="testing() || paused()">\r
      &#8592; {{ completed() ? 'Return to rescue' : 'Back to map' }}\r
    </button> }\r
    <div>\r
      <p>THE KEEPER'S WORKSHOPS / GRADE {{ grade() }}</p>\r
      <h1 #heading tabindex="-1">{{ stage().title }}</h1>\r
    </div>\r
    @if (!authoringPreview()) { <button (click)="pauseRequested.emit()">Pause</button> }\r
  </header>\r
  <nav aria-label="Workshop stages" [hidden]="definition().stages.length === 1 || (diorama() && !error())">\r
    @for (s of definition().stages; track s.id; let i = $index) {\r
      @if (authoringPreview()) {\r
        <button (click)="selectStage(i)" [disabled]="testing() || paused()" [attr.aria-pressed]="i === active()">{{ i + 1 }} \xB7 {{ s.title }}</button>\r
      } @else {\r
      <span [class.active]="i === active()" [class.sealed]="state().seals.includes(s.id)"\r
        >{{ state().seals.includes(s.id) ? '\u2713' : i + 1 }} \xB7 {{ s.title }}</span\r
      >\r
      }\r
    }\r
  </nav>\r
  @if (!authoringPreview()) { <p class="mission">{{ stage().instruction }}</p> }\r
  <div class="stage-shell">\r
    <div #stageHost class="stage"></div>\r
    @if (!ready() && !error()) {\r
      <p class="loading" role="status">Preparing the workshop...</p>\r
    }\r
    @if (error()) {\r
      <p class="loading" role="status">\r
        The animated workshop could not load. The same mathematical machine works with the controls\r
        below.\r
      </p>\r
    }\r
    @if (testing() && !authoringPreview()) {\r
      <div class="run-caption" role="status">\r
        <b>{{ passed() ? 'MECHANISM ENGAGED' : 'TESTING THE MECHANISM' }}</b>\r
        <p>{{ passed() ? stage().success : reading().feedback }}</p>\r
        <button (click)="finish()" [disabled]="paused()">\r
          {{ passed() ? 'Skip release animation' : 'Finish test' }}\r
        </button>\r
      </div>\r
    }\r
  </div>\r
  <footer>\r
    @if (authoringPreview()) {\r
      <div class="preview-operation">\r
        <button (click)="test()" [disabled]="locked() || !settled()">Test</button>\r
        <button (click)="reset()" [disabled]="locked()" aria-label="Reset mechanism">\u21BA</button>\r
        <button (click)="pauseRequested.emit()" [attr.aria-pressed]="paused()">{{ paused() ? 'Resume' : 'Pause' }}</button>\r
      </div>\r
    }\r
    @if (!authoringPreview()) {\r
    <div class="operation">\r
      <div>\r
        <small>{{ sealed() ? 'MECHANISM RELEASED' : 'LIVE MEASUREMENTS' }}</small>\r
        <p class="equation">{{ reading().equation }}</p>\r
        <p class="notice" aria-live="polite">{{ notice() }}</p>\r
      </div>\r
      @if (completed()) {\r
        <button class="primary" (click)="leave.emit()" [disabled]="testing() || paused()">\r
          Return to rescue &#8594;\r
        </button>\r
      } @else if (sealed()) {\r
        <button class="primary" (click)="nextStage()" [disabled]="testing() || paused()">\r
          Next mechanism &#8594;\r
        </button>\r
      } @else {\r
        <button class="primary" (click)="test()" [disabled]="locked() || !settled()">\r
          Engage release &#8594;\r
        </button>\r
      }\r
    </div>\r
    <div class="toolbar">\r
      <button (click)="controls.set(!controls())" [attr.aria-expanded]="controls()">\r
        {{ controls() ? 'Hide' : 'Show' }} machine controls</button\r
      ><button (click)="help.set(!help())" [attr.aria-expanded]="help()">\r
        Show the mechanic's clue\r
      </button>\r
      @if (sealed()) {\r
        <button (click)="replay()" [disabled]="testing() || paused()">Replay release</button>\r
      } @else {\r
        <button (click)="reset()" [disabled]="locked()">Reset this mechanism</button>\r
      }\r
    </div>\r
    @if (help()) {\r
      <aside>{{ stage().hint }}</aside>\r
    }\r
    }\r
    @if (controls() || (authoringPreview() && (!diorama() || error()))) {\r
      <div class="controls" aria-label="Accessible machine controls">\r
        @if (stage(); as d) {\r
          @if (stageAnswer(); as a) {\r
            @if (d.kind === 'fraction-gear' && a.kind === 'fraction-gear') {\r
              <div class="inventory">\r
                @for (p of d.pieces; track p.id; let i = $index) {\r
                  <button\r
                    (click)="select(i)"\r
                    [disabled]="locked()"\r
                    [attr.aria-pressed]="selected() === i"\r
                  >\r
                    {{ p.numerator }}/{{ p.denominator\r
                    }}<small>Piece {{ i + 1 }} \xB7 {{ a.offsets[i] < 0 ? 'tray' : 'on ring' }}</small>\r
                  </button>\r
                }\r
              </div>\r
              <div class="actions">\r
                <button (click)="seatPiece()" [disabled]="locked() || selected() === null">\r
                  Seat selected sector</button\r
                ><button (click)="turnPiece(-1)" [disabled]="locked() || selected() === null">\r
                  Rotate sector left</button\r
                ><button (click)="turnPiece(1)" [disabled]="locked() || selected() === null">\r
                  Rotate sector right</button\r
                ><button (click)="removePiece()" [disabled]="locked() || selected() === null">\r
                  Return sector to tray\r
                </button>\r
              </div>\r
            }\r
            @if (d.kind === 'volume' && a.kind === 'volume') {\r
              <div class="inventory">\r
                @for (v of d.vessels; track v.id; let i = $index) {\r
                  <div class="control-card">\r
                    <strong>{{ v.label }}</strong\r
                    ><small>{{ v.uses - a.pours[i] }} left</small\r
                    ><button\r
                      (click)="operate({ type: 'pour', index: i, delta: 1 })"\r
                      [disabled]="locked() || a.pours[i] >= v.uses"\r
                      [attr.aria-label]="'Pour ' + v.label"\r
                    >\r
                      +</button\r
                    ><button\r
                      (click)="operate({ type: 'pour', index: i, delta: -1 })"\r
                      [disabled]="locked() || a.pours[i] === 0"\r
                      [attr.aria-label]="'Remove one ' + v.label + ' pour'"\r
                    >\r
                      \u2212\r
                    </button>\r
                  </div>\r
                }\r
              </div>\r
            }\r
            @if (d.kind === 'timing-wheels' && a.kind === 'timing-wheels') {\r
              <div class="actions">\r
                <button\r
                  (click)="operate({ type: 'steps', value: a.steps - 1 })"\r
                  [disabled]="locked() || a.steps === 0"\r
                >\r
                  Rewind one step</button\r
                ><strong>{{ a.steps }} steps</strong\r
                ><button\r
                  (click)="operate({ type: 'steps', value: a.steps + 1 })"\r
                  [disabled]="locked() || a.steps === d.maxSteps"\r
                >\r
                  Advance one step\r
                </button>\r
              </div>\r
              <label class="slider"\r
                >Crank run: {{ a.steps }} steps<input\r
                  type="range"\r
                  min="0"\r
                  [max]="d.maxSteps"\r
                  [value]="a.steps"\r
                  [disabled]="locked()"\r
                  (change)="operate({ type: 'steps', value: +$any($event.target).value })"\r
                  aria-label="Crank step count"\r
              /></label>\r
            }\r
            @if (d.kind === 'coordinate' && a.kind === 'coordinate') {\r
              <div class="actions">\r
                <button (click)="moveHead('x', -1)" [disabled]="locked() || a.x === d.min">\r
                  X left</button\r
                ><strong>X = {{ a.x }}</strong\r
                ><button (click)="moveHead('x', 1)" [disabled]="locked() || a.x === d.max">\r
                  X right</button\r
                ><button (click)="moveHead('y', -1)" [disabled]="locked() || a.y === d.min">\r
                  Y down</button\r
                ><strong>Y = {{ a.y }}</strong\r
                ><button (click)="moveHead('y', 1)" [disabled]="locked() || a.y === d.max">\r
                  Y up\r
                </button>\r
              </div>\r
            }\r
            @if (d.kind === 'reflection' && a.kind === 'reflection') {\r
              <div class="inventory">\r
                @for (m of d.mirrors; track m.id; let i = $index) {\r
                  <div class="control-card">\r
                    <strong>Mirror {{ i + 1 }} \xB7 {{ a.angles[i] }}\xB0</strong\r
                    ><small>Mirror surface angle; 0\xB0 is horizontal.</small\r
                    ><button (click)="turnMirror(i, -1)" [disabled]="locked()">\r
                      Mirror {{ i + 1 }} minus {{ m.step }}\xB0</button\r
                    ><button (click)="turnMirror(i, 1)" [disabled]="locked()">\r
                      Mirror {{ i + 1 }} plus {{ m.step }}\xB0\r
                    </button>\r
                  </div>\r
                }\r
              </div>\r
            }\r
            @if (d.kind === 'mixing' && a.kind === 'mixing') {\r
              <div class="inventory">\r
                @for (v of d.ingredients; track v.id; let i = $index) {\r
                  <div class="control-card">\r
                    <strong>{{ v.label }}</strong\r
                    ><small\r
                      >{{ (a.measures[i] * v.measure) / d.unitTicks }} {{ d.unit }} in mix \xB7\r
                      {{ v.measure / d.unitTicks }} {{ d.unit }} per pump</small\r
                    ><button\r
                      (click)="operate({ type: 'measure', index: i, delta: 1 })"\r
                      [disabled]="locked() || (a.measures[i] + 1) * v.measure > v.supply"\r
                      [attr.aria-label]="'Pump ' + v.label"\r
                    >\r
                      +</button\r
                    ><button\r
                      (click)="operate({ type: 'measure', index: i, delta: -1 })"\r
                      [disabled]="locked() || a.measures[i] === 0"\r
                      [attr.aria-label]="'Remove ' + v.label + ' measure'"\r
                    >\r
                      \u2212\r
                    </button>\r
                  </div>\r
                }\r
              </div>\r
            }\r
            @if (d.kind === 'cable' && a.kind === 'cable') {\r
              <div class="inventory">\r
                @for (c of d.cables; track c.id; let i = $index) {\r
                  <button\r
                    (click)="operate({ type: 'cable', index: i })"\r
                    [disabled]="locked()"\r
                    [attr.aria-pressed]="a.cable === i"\r
                  >\r
                    Attach {{ c.label }} cable\r
                  </button>\r
                }\r
              </div>\r
            }\r
          }\r
        }\r
      </div>\r
    }\r
    @if (saveWarning()) {\r
      <p role="alert" class="warning">\r
        {{ saveWarning() }}\r
        <button (click)="retrySave.emit()" [disabled]="paused()">Retry save</button>\r
      </p>\r
    }\r
  </footer>\r
</section>\r
`, styles: ['/* src/app/templates/heist/escape/locks/machine-workshop.component.scss */\n:host {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  color: #f5e8cd;\n  font-family: "Trebuchet MS", sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.workshop {\n  height: var(--expedition-lock-height, 100dvh);\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n  background: #081d25;\n}\nbutton {\n  font: inherit;\n  cursor: pointer;\n  color: #e9eadc;\n  background: #16343c;\n  border: 1px solid #6b827a;\n  border-radius: 6px;\n  min-height: 44px;\n  padding: 9px 15px;\n}\nbutton:hover:not(:disabled) {\n  background: #2c5053;\n  border-color: #f4d596;\n}\nbutton:focus-visible {\n  outline: 3px solid #ffe1a0;\n  outline-offset: 3px;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nheader {\n  display: flex;\n  gap: 22px;\n  align-items: center;\n  padding: 14px 28px;\n  background:\n    linear-gradient(\n      110deg,\n      #0c2934,\n      #21322e);\n  border-bottom: 1px solid rgba(163, 130, 71, 0.3137254902);\n  flex-shrink: 0;\n}\nheader > div {\n  flex: 1;\n}\nheader p {\n  font-size: 10px;\n  letter-spacing: 0.19em;\n  color: #c5ae77;\n  margin: 0 0 5px;\n}\nh1 {\n  font: 28px Georgia, serif;\n  margin: 0;\n}\nh1:focus {\n  outline: 0;\n}\nnav {\n  display: flex;\n  justify-content: center;\n  gap: 22px;\n  padding: 9px;\n  background: #102b31;\n  flex-shrink: 0;\n  font-size: 12px;\n}\nnav span {\n  color: #a1b9b6;\n}\nnav .active {\n  color: #f5d08b;\n}\nnav .sealed {\n  color: #a3e7c4;\n}\n.mission {\n  padding: 9px 25px;\n  text-align: center;\n  font-size: 15px;\n  line-height: 1.5;\n  margin: 0;\n  background: #153138;\n  flex-shrink: 0;\n}\n.stage-shell {\n  position: relative;\n  flex: 1;\n  min-height: 240px;\n  background: #06151c;\n  overflow: hidden;\n}\n.stage {\n  position: absolute;\n  inset: 0;\n}\n.stage ::ng-deep canvas {\n  display: block;\n  touch-action: none;\n}\n.loading {\n  position: absolute;\n  top: 30%;\n  left: 20%;\n  right: 20%;\n  padding: 20px;\n  background: rgba(12, 38, 56, 0.9333333333);\n  text-align: center;\n}\n.run-caption {\n  position: absolute;\n  bottom: 12px;\n  left: 20%;\n  right: 20%;\n  text-align: center;\n  background: rgba(9, 33, 44, 0.9607843137);\n  border: 1px solid #c4a36a;\n  padding: 12px 18px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5333333333);\n}\n.run-caption b {\n  font-size: 11px;\n  letter-spacing: 0.16em;\n  color: #e7c275;\n}\n.run-caption p {\n  margin: 8px 0;\n  font-size: 14px;\n}\nfooter {\n  padding: 12px 26px 8px;\n  background:\n    linear-gradient(\n      110deg,\n      #132e36,\n      #0c222c);\n  border-top: 1px solid #b19158;\n  flex-shrink: 0;\n}\n.operation {\n  display: flex;\n  gap: 25px;\n  align-items: center;\n}\n.operation > div {\n  flex: 1;\n}\n.operation small {\n  font-size: 10px;\n  letter-spacing: 0.16em;\n  color: #c3ad75;\n}\n.equation {\n  font: 21px Georgia, serif;\n  margin: 5px 0;\n}\n.notice {\n  color: #b6d1ca;\n  font-size: 13px;\n  margin: 4px 0;\n}\n.primary {\n  background: linear-gradient(#f7dea1, #c79c50);\n  color: #132831;\n  font-weight: bold;\n  padding: 15px 24px;\n  border-color: #f2d592;\n}\n.primary:hover:not(:disabled) {\n  background: #ffe7b0;\n}\n.toolbar {\n  display: flex;\n  gap: 24px;\n  justify-content: center;\n  margin-top: 7px;\n}\n.toolbar button {\n  border: 0;\n  background: transparent;\n  text-decoration: underline;\n  font-size: 12px;\n  min-height: 32px;\n  padding: 5px;\n}\n.controls {\n  padding: 10px 0 3px;\n}\n.inventory,\n.actions {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.inventory > button {\n  min-width: 100px;\n}\n.inventory small {\n  display: block;\n  font-size: 11px;\n  margin-top: 5px;\n  color: #bfd6cb;\n}\n.inventory [aria-pressed=true] {\n  outline: 2px solid #ffe1a0;\n  background: #31565b;\n}\n.actions {\n  margin-top: 10px;\n}\n.control-card {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  padding: 10px;\n  background: rgba(255, 255, 255, 0.0235294118);\n  border: 1px solid rgba(151, 175, 164, 0.2);\n  border-radius: 6px;\n  max-width: 270px;\n  flex: 1;\n  min-width: 135px;\n}\n.control-card strong {\n  text-align: center;\n  font-size: 17px;\n}\n.control-card small {\n  text-align: center;\n}\n.control-card button {\n  font-size: 12px;\n}\n.slider {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 20px;\n  margin: 15px auto;\n  max-width: 650px;\n}\n.slider input {\n  flex: 1;\n  min-width: 120px;\n  accent-color: #ecc583;\n}\naside {\n  background: rgba(255, 255, 255, 0.031372549);\n  border-left: 2px solid #b69d64;\n  padding: 12px;\n  font-size: 14px;\n  line-height: 1.5;\n}\n.warning {\n  color: #ffd394;\n}\n@media (max-width: 800px) {\n  header {\n    padding: 10px 14px;\n    gap: 12px;\n  }\n  h1 {\n    font-size: 22px;\n  }\n  .mission {\n    font-size: 13px;\n    padding: 8px 15px;\n  }\n  .operation {\n    gap: 12px;\n  }\n  .equation {\n    font-size: 18px;\n  }\n  footer {\n    padding: 10px 14px;\n  }\n  .primary {\n    padding: 12px 16px;\n  }\n  .run-caption {\n    left: 10%;\n    right: 10%;\n  }\n}\n@media (max-width: 600px) {\n  header {\n    flex-wrap: wrap;\n  }\n  header > div {\n    order: -1;\n    flex-basis: 100%;\n  }\n  header > button:last-child {\n    margin-left: auto;\n  }\n  nav {\n    gap: 10px;\n    padding: 7px;\n    font-size: 10px;\n  }\n  .stage-shell {\n    flex: 0 0 auto;\n    height: 50vw;\n    min-height: 0;\n  }\n  .mission {\n    font-size: 12px;\n  }\n  .operation {\n    flex-wrap: wrap;\n  }\n  .operation > div {\n    flex-basis: 100%;\n  }\n  .primary {\n    width: 100%;\n  }\n  .toolbar {\n    gap: 12px;\n  }\n  .toolbar button {\n    min-height: 44px;\n  }\n  .run-caption {\n    inset: 4px;\n    bottom: auto;\n    font-size: 12px;\n    padding: 6px;\n  }\n  .run-caption p {\n    font-size: 12px;\n    margin: 4px;\n  }\n  .run-caption button {\n    min-height: 36px;\n    padding: 5px;\n  }\n  .control-card {\n    min-width: 120px;\n  }\n  .actions button {\n    font-size: 12px;\n    padding: 8px;\n  }\n  .inventory > button {\n    min-width: 85px;\n  }\n  .equation {\n    font-size: 17px;\n  }\n  .slider {\n    gap: 10px;\n  }\n}\n:host(.week-preview) .workshop > header {\n  display: none;\n}\n[hidden] {\n  display: none !important;\n}\n.preview-operation {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n  margin-bottom: 10px;\n}\n/*# sourceMappingURL=machine-workshop.component.css.map */\n', "/* src/app/templates/heist/escape/weekly/preview-machine.scss */\n:host(.week-preview) .preview-action {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 10px 16px;\n  background: #23443f;\n  border-block: 1px solid rgba(140, 158, 117, 0.3333333333);\n  flex-shrink: 0;\n  font-size: 13px;\n}\n:host(.week-preview) .preview-action .primary {\n  flex-shrink: 0;\n  min-height: 44px;\n}\n:host(.week-preview) .preview-action p {\n  margin: 3px 0 0;\n  font-size: 12px;\n  color: #d1dfd4;\n}\n@media (max-width: 600px) {\n  :host(.week-preview) .preview-action {\n    flex-wrap: wrap;\n  }\n}\n:host(.week-preview) {\n  display: block;\n  position: relative;\n  inset: auto;\n  z-index: auto;\n  min-width: 0;\n}\n:host(.week-preview) .workshop,\n:host(.week-preview) .chamber {\n  height: auto;\n  overflow: visible;\n}\n:host(.week-preview) header,\n:host(.week-preview) .workshop-header {\n  padding: 12px 18px;\n  gap: 10px;\n}\n:host(.week-preview) h1 {\n  font-size: clamp(20px, 2vw, 26px);\n}\n:host(.week-preview) nav,\n:host(.week-preview) .seals {\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 8px;\n}\n:host(.week-preview) nav button[aria-pressed=true] {\n  background: #315850;\n  border-color: #efcb82;\n}\n:host(.week-preview) .stage-shell {\n  flex: 0 0 auto;\n  height: clamp(250px, 30vw, 400px);\n  min-height: 250px;\n}\n:host(.week-preview) .stage {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n:host(.week-preview) footer,\n:host(.week-preview) .workbench {\n  flex: 0 0 auto;\n  padding: 12px 16px;\n}\n:host(.week-preview) .operation,\n:host(.week-preview) .equilibrium,\n:host(.week-preview) .toolbar,\n:host(.week-preview) .tools-row,\n:host(.week-preview) .calibrations {\n  flex-wrap: wrap;\n}\n:host(.week-preview) .mission,\n:host(.week-preview) .stage-instruction {\n  font-size: 14px;\n  line-height: 1.5;\n}\n:host(.week-preview) .control-card,\n:host(.week-preview) .inventory,\n:host(.week-preview) .actions,\n:host(.week-preview) .operation > div {\n  min-width: 0;\n}\n:host(.week-preview) .loading {\n  left: 8%;\n  right: 8%;\n  padding: 12px;\n}\n@media (max-width: 600px) {\n  :host(.week-preview) header,\n  :host(.week-preview) .workshop-header {\n    flex-wrap: wrap;\n  }\n  :host(.week-preview) .workshop-header > div {\n    text-align: left;\n  }\n  :host(.week-preview) .stage-shell {\n    height: 270px;\n  }\n  :host(.week-preview) .run-caption {\n    left: 8px;\n    right: 8px;\n  }\n  :host(.week-preview) .calibrations {\n    gap: 8px;\n    padding: 10px;\n  }\n  :host(.week-preview) .calibrations > div {\n    min-width: 0;\n    flex: 1 1 130px;\n  }\n  :host(.week-preview) .seals button {\n    flex: 1 1 95px;\n    min-width: 0;\n  }\n  :host(.week-preview) button {\n    overflow-wrap: anywhere;\n  }\n}\n/*# sourceMappingURL=preview-machine.css.map */\n", "/* src/app/templates/heist/escape/locks/timing-cage/timing-cage.host.scss */\n.workshop.timing-diorama {\n  height: auto;\n  overflow: visible;\n}\n.workshop.timing-diorama > header,\n.workshop.timing-diorama > nav,\n.workshop.timing-diorama > .mission,\n.workshop.timing-diorama > .preview-action,\n.workshop.timing-diorama > footer,\n.workshop.timing-diorama .run-caption {\n  display: none;\n}\n.workshop.timing-diorama .stage-shell {\n  height: 620px;\n  min-height: 620px;\n  flex: none;\n}\n.workshop.timing-diorama .stage {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n:host(.week-preview) .workshop.timing-diorama .stage-shell {\n  height: 620px;\n  min-height: 620px;\n}\n@media (max-width: 600px) {\n  :host(.week-preview) .workshop.timing-diorama .stage-shell {\n    height: 650px;\n    min-height: 650px;\n  }\n}\n/*# sourceMappingURL=timing-cage.host.css.map */\n", "/* src/app/templates/heist/escape/locks/optics-cage/optics-cage.host.scss */\n.workshop.optics-diorama .stage-shell,\n:host(.week-preview) .workshop.optics-diorama .stage-shell {\n  height: 680px;\n  min-height: 680px;\n}\n@media (max-width: 600px) {\n  :host(.week-preview) .workshop.optics-diorama .stage-shell {\n    height: 700px;\n    min-height: 700px;\n  }\n}\n/*# sourceMappingURL=optics-cage.host.css.map */\n", "/* src/app/templates/heist/escape/locks/bridge-cage/bridge-cage.host.scss */\n.workshop.bridge-diorama .stage-shell,\n:host(.week-preview) .workshop.bridge-diorama .stage-shell {\n  height: 720px;\n  min-height: 720px;\n}\n@media (max-width: 600px) {\n  :host(.week-preview) .workshop.bridge-diorama .stage-shell {\n    height: 740px;\n    min-height: 740px;\n  }\n}\n/*# sourceMappingURL=bridge-cage.host.css.map */\n"] }]
  }], () => [], { definition: [{ type: Input, args: [{ isSignal: true, alias: "definition", required: true }] }], authoringPreview: [{ type: Input, args: [{ isSignal: true, alias: "authoringPreview", required: false }] }], initialStage: [{ type: Input, args: [{ isSignal: true, alias: "initialStage", required: false }] }], tested: [{ type: Output, args: ["tested"] }], answer: [{ type: Input, args: [{ isSignal: true, alias: "answer", required: false }] }], grade: [{ type: Input, args: [{ isSignal: true, alias: "grade", required: false }] }], completed: [{ type: Input, args: [{ isSignal: true, alias: "completed", required: false }] }], paused: [{ type: Input, args: [{ isSignal: true, alias: "paused", required: false }] }], reducedMotion: [{ type: Input, args: [{ isSignal: true, alias: "reducedMotion", required: false }] }], saveWarning: [{ type: Input, args: [{ isSignal: true, alias: "saveWarning", required: false }] }], changed: [{ type: Output, args: ["changed"] }], solved: [{ type: Output, args: ["solved"] }], leave: [{ type: Output, args: ["leave"] }], pauseRequested: [{ type: Output, args: ["pauseRequested"] }], retrySave: [{ type: Output, args: ["retrySave"] }], sound: [{ type: Output, args: ["sound"] }], host: [{
    type: ViewChild,
    args: ["stageHost", { static: true }]
  }], heading: [{
    type: ViewChild,
    args: ["heading", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MachineWorkshopComponent, { className: "MachineWorkshopComponent", filePath: "src/app/templates/heist/escape/locks/machine-workshop.component.ts", lineNumber: 29 });
})();

export {
  BalanceLockComponent,
  GearLockComponent,
  MachineWorkshopComponent
};
//# debugId=6dbd72d9-39b7-5dfb-a728-8d8c2ac85ec1
//# sourceMappingURL=chunk-5TKYBZHJ.js.map
