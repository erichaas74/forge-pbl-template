import {
  Component,
  Input,
  computed,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate4
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/engineering-design/ui/block-plan.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function BlockPlanComponent_For_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "circle", 8)(1, "title");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const a_r4 = ctx;
    const block_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("cx", block_r2.x * 100)("cy", block_r2.z * 100)("r", a_r4.axis === "y" ? a_r4.diameter * 50 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate4(" Centered ", a_r4.axis, " bore, diameter ", a_r4.diameter, " m; ", a_r4.insert, " ", a_r4.color, " ");
  }
}
function BlockPlanComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "rect", 7);
    \u0275\u0275domListener("pointerdown", function BlockPlanComponent_For_7_Template_rect_pointerdown_0_listener($event) {
      const block_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.start($event, block_r2.id));
    })("keydown", function BlockPlanComponent_For_7_Template_rect_keydown_0_listener($event) {
      const block_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.key($event, block_r2.id));
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(1, BlockPlanComponent_For_7_Conditional_1_Template, 3, 7, ":svg:circle", 8);
  }
  if (rf & 2) {
    let tmp_23_0;
    const block_r2 = ctx.$implicit;
    const \u0275$index_13_r5 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("role", ctx_r2.editor() ? "button" : null)("tabindex", ctx_r2.editor() ? 0 : null)("aria-label", block_r2.label || "Block " + (\u0275$index_13_r5 + 1))("aria-pressed", ctx_r2.editor() ? ctx_r2.editor().selection().includes(block_r2.id) : null)("x", (block_r2.x - block_r2.width / 2) * 100)("y", (block_r2.z - block_r2.depth / 2) * 100)("width", block_r2.width * 100)("height", block_r2.depth * 100)("transform", "rotate(" + -block_r2.rotation + " " + block_r2.x * 100 + " " + block_r2.z * 100 + ")")("fill", ctx_r2.editor()?.selection()?.includes(block_r2.id) ? "#8ad7ce" : "#d4bc8d")("stroke", ctx_r2.editor()?.selection()?.includes(block_r2.id) ? ctx_r2.editor()?.draftError() ? "#bc3038" : "#166d71" : "#6a593b")("stroke-width", ctx_r2.editor()?.selection()?.includes(block_r2.id) ? 3 : 1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_23_0 = block_r2.aperture) ? 1 : -1, tmp_23_0);
  }
}
function BlockPlanComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "circle", 9);
    \u0275\u0275domElementStart(1, "text", 10);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const o_r6 = ctx;
    \u0275\u0275attribute("cx", o_r6.x * 100)("cy", o_r6.z * 100)("r", o_r6.width * 50);
    \u0275\u0275advance();
    \u0275\u0275attribute("x", o_r6.x * 100)("y", o_r6.z * 100 + 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", o_r6.model, " ");
  }
}
function BlockPlanComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "circle", 11);
    \u0275\u0275domElementStart(1, "text", 12);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const target_r7 = ctx.$implicit;
    \u0275\u0275attribute("cx", target_r7.x * 100)("cy", target_r7.z * 100);
    \u0275\u0275advance();
    \u0275\u0275attribute("x", target_r7.x * 100 + 8)("y", target_r7.z * 100 + 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", target_r7.label, " ");
  }
}
function BlockPlanComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "line", 13);
    \u0275\u0275domElementStart(1, "circle", 14);
    \u0275\u0275domListener("pointerdown", function BlockPlanComponent_Conditional_17_Template_circle_pointerdown_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.start($event, "", true));
    })("keydown", function BlockPlanComponent_Conditional_17_Template_circle_keydown_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.rotateKey($event));
    });
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const h_r9 = ctx;
    \u0275\u0275attribute("x1", h_r9.x)("y1", h_r9.z)("x2", h_r9.x)("y2", h_r9.z - h_r9.radius);
    \u0275\u0275advance();
    \u0275\u0275attribute("cx", h_r9.x)("cy", h_r9.z - h_r9.radius);
  }
}
function BlockPlanComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "br");
    \u0275\u0275text(1, "Drag stones or the round rotation handle. Arrow keys move 1 cm; Shift = 5 cm. ");
  }
}
var BlockPlanComponent = class _BlockPlanComponent {
  design = input.required(
    ...ngDevMode ? [{ debugName: "design" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editor = input(
    ...ngDevMode ? [void 0, { debugName: "editor" }] : (
      /* istanbul ignore next */
      []
    )
  );
  shown = computed(
    () => this.editor()?.draft() ?? this.design(),
    ...ngDevMode ? [{ debugName: "shown" }] : (
      /* istanbul ignore next */
      []
    )
  );
  handle = computed(
    () => {
      const blocks = this.shown().blocks.filter((b) => this.editor()?.selection().includes(b.id));
      if (!blocks.length)
        return void 0;
      const x = blocks.reduce((s, b) => s + b.x, 0) / blocks.length * 100, z = blocks.reduce((s, b) => s + b.z, 0) / blocks.length * 100;
      return {
        x,
        z,
        radius: Math.max(22, ...blocks.map((b) => Math.hypot(b.x * 100 - x, b.z * 100 - z) + Math.hypot(b.width, b.depth) * 50 + 12))
      };
    },
    ...ngDevMode ? [{ debugName: "handle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  drag;
  point(event) {
    const svg = event.currentTarget.closest("svg");
    const p = svg.createSVGPoint();
    p.x = event.clientX;
    p.y = event.clientY;
    const local = p.matrixTransform(svg.getScreenCTM().inverse());
    return { x: local.x, z: local.y };
  }
  start(event, id, rotate = false) {
    const edit = this.editor();
    if (!edit || !edit.editable() || event.button !== 0)
      return;
    event.preventDefault();
    if (id && (!edit.selection().includes(id) || event.shiftKey))
      edit.select(id, event.shiftKey);
    const p = this.point(event), center = this.handle() ?? { x: 0, z: 0 };
    edit.begin();
    this.drag = __spreadProps(__spreadValues({}, p), {
      rotate,
      center,
      angle: Math.atan2(p.z - center.z, p.x - center.x),
      pointer: event.pointerId,
      moved: false
    });
    event.currentTarget.closest("svg").setPointerCapture(event.pointerId);
  }
  move(event) {
    const d = this.drag;
    if (!d)
      return;
    const p = this.point(event);
    d.moved ||= Math.hypot(p.x - d.x, p.z - d.z) > 0.3;
    this.editor()?.preview(d.rotate ? { turn: -(Math.atan2(p.z - d.center.z, p.x - d.center.x) - d.angle) * 180 / Math.PI } : { dx: (p.x - d.x) / 100, dz: (p.z - d.z) / 100 }, !event.altKey);
  }
  finish(event) {
    if (!this.drag || event.pointerId !== this.drag.pointer)
      return;
    if (this.drag.moved)
      this.editor()?.commitDraft();
    else
      this.editor()?.cancel();
    this.drag = void 0;
  }
  cancel() {
    this.drag = void 0;
    this.editor()?.cancel();
  }
  key(event, id) {
    const edit = this.editor();
    if (!edit)
      return;
    if (["Enter", " "].includes(event.key)) {
      event.preventDefault();
      edit.select(id, event.shiftKey);
    }
    if (event.key === "Escape")
      this.cancel();
    if (event.key.startsWith("Arrow")) {
      event.preventDefault();
      if (!edit.selection().includes(id))
        edit.select(id);
      const d = event.shiftKey ? 0.05 : 0.01;
      edit.transform({
        dx: event.key === "ArrowRight" ? d : event.key === "ArrowLeft" ? -d : 0,
        dz: event.key === "ArrowDown" ? d : event.key === "ArrowUp" ? -d : 0
      });
    }
  }
  rotateKey(event) {
    if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      this.editor()?.transform({
        turn: (event.key === "ArrowLeft" ? 1 : -1) * (event.shiftKey ? 1 : 15)
      });
    }
  }
  gridId = `plan-${crypto.randomUUID()}`;
  bounds = computed(
    () => {
      const xs = [
        0,
        ...this.design().displayObject ? [
          this.design().displayObject.x - this.design().displayObject.width,
          this.design().displayObject.x + this.design().displayObject.width
        ] : [],
        ...this.design().blocks.flatMap((b) => [
          b.x - Math.hypot(b.width, b.depth) / 2,
          b.x + Math.hypot(b.width, b.depth) / 2
        ]),
        ...this.design().targets.map((t) => t.x)
      ];
      const zs = [
        0,
        ...this.design().displayObject ? [
          this.design().displayObject.z - this.design().displayObject.width,
          this.design().displayObject.z + this.design().displayObject.width
        ] : [],
        ...this.design().blocks.flatMap((b) => [
          b.z - Math.hypot(b.width, b.depth) / 2,
          b.z + Math.hypot(b.width, b.depth) / 2
        ]),
        ...this.design().targets.map((t) => t.z)
      ];
      return {
        x: Math.min(...xs) * 100 - 35,
        z: Math.min(...zs) * 100 - 30,
        width: (Math.max(...xs) - Math.min(...xs)) * 100 + 170,
        height: Math.max(130, (Math.max(...zs) - Math.min(...zs)) * 100 + 60)
      };
    },
    ...ngDevMode ? [{ debugName: "bounds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  viewBox = computed(
    () => {
      const b = this.bounds();
      return `${b.x} ${b.z} ${b.width} ${b.height}`;
    },
    ...ngDevMode ? [{ debugName: "viewBox" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function BlockPlanComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BlockPlanComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BlockPlanComponent, selectors: [["app-block-plan"]], inputs: { design: [1, "design"], editor: [1, "editor"] }, decls: 21, vars: 13, consts: [["aria-label", "Measured footprint from above. North is up, east is right. Rings are target centres.", 3, "pointermove", "pointerup", "pointercancel"], ["width", "20", "height", "20", "patternUnits", "userSpaceOnUse", 3, "id"], ["d", "M20 0H0V20", "fill", "none", "stroke", "#bcc9b6", "stroke-width", ".5"], ["font-size", "10", "fill", "#193f36"], ["pointer-events", "none", "stroke", "#166d71", "stroke-width", "1"], ["d", "M-8 0H8M0 -8V8"], ["x", "10", "y", "12", "stroke", "none", "fill", "#166d71", "font-size", "8"], ["vector-effect", "non-scaling-stroke", 3, "pointerdown", "keydown"], ["pointer-events", "none", "fill", "#fff6e5", "stroke", "#9d3653", "stroke-width", "1"], ["fill", "#b4cbc8", "stroke", "#315e60", "stroke-width", "1"], ["text-anchor", "middle", "font-size", "8", "fill", "#193f36"], ["r", "3", "fill", "#aa6922"], ["font-size", "8", "fill", "#193f36"], ["stroke", "#166d71", "stroke-dasharray", "3 3"], ["r", "7", "fill", "#166d71", "stroke", "#fff", "stroke-width", "2", "role", "button", "tabindex", "0", "aria-label", "Rotate selected stones", 3, "pointerdown", "keydown"]], template: function BlockPlanComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "figure");
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(1, "svg", 0);
      \u0275\u0275domListener("pointermove", function BlockPlanComponent_Template_svg_pointermove_1_listener($event) {
        return ctx.move($event);
      })("pointerup", function BlockPlanComponent_Template_svg_pointerup_1_listener($event) {
        return ctx.finish($event);
      })("pointercancel", function BlockPlanComponent_Template_svg_pointercancel_1_listener() {
        return ctx.cancel();
      });
      \u0275\u0275domElementStart(2, "defs")(3, "pattern", 1);
      \u0275\u0275domElement(4, "path", 2);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElement(5, "rect");
      \u0275\u0275repeaterCreate(6, BlockPlanComponent_For_7_Template, 2, 13, null, null, _forTrack0);
      \u0275\u0275conditionalCreate(8, BlockPlanComponent_Conditional_8_Template, 3, 6);
      \u0275\u0275repeaterCreate(9, BlockPlanComponent_For_10_Template, 3, 5, null, null, _forTrack0);
      \u0275\u0275domElementStart(11, "text", 3);
      \u0275\u0275text(12, " \u2191 N ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(13, "g", 4);
      \u0275\u0275domElement(14, "path", 5);
      \u0275\u0275domElementStart(15, "text", 6);
      \u0275\u0275text(16, "0,0");
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(17, BlockPlanComponent_Conditional_17_Template, 2, 6);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(18, "figcaption");
      \u0275\u0275text(19, " North \u2191 \xB7 grid = 20 cm \xB7 stacked stones share a footprint ");
      \u0275\u0275conditionalCreate(20, BlockPlanComponent_Conditional_20_Template, 2, 0);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      let tmp_9_0;
      let tmp_13_0;
      \u0275\u0275advance();
      \u0275\u0275attribute("viewBox", ctx.viewBox())("role", ctx.editor() ? "group" : "img");
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("id", ctx.gridId);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("x", ctx.bounds().x)("y", ctx.bounds().z)("width", ctx.bounds().width)("height", ctx.bounds().height)("fill", "url(#" + ctx.gridId + ")");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.shown().blocks);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_9_0 = ctx.design().displayObject) ? 8 : -1, tmp_9_0);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.design().targets);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("x", ctx.bounds().x + 6)("y", ctx.bounds().z + 14);
      \u0275\u0275advance(6);
      \u0275\u0275conditional((tmp_13_0 = ctx.handle()) ? 17 : -1, tmp_13_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.editor() ? 20 : -1);
    }
  }, styles: ["\nfigure[_ngcontent-%COMP%] {\n  margin: 18px 0;\n  padding: 18px;\n  background: #eaf0df;\n  border: 1px solid #ccd7c1;\n  border-radius: 12px;\n}\nsvg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 300px;\n  touch-action: none;\n}\n[role=button][_ngcontent-%COMP%] {\n  cursor: grab;\n}\n[role=button][_ngcontent-%COMP%]:focus {\n  outline: none;\n  stroke: #c17c14;\n  stroke-width: 3;\n}\nfigcaption[_ngcontent-%COMP%] {\n  font: 12px system-ui;\n  color: #405d50;\n  margin-top: 10px;\n}\n/*# sourceMappingURL=block-plan.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BlockPlanComponent, [{
    type: Component,
    args: [{ selector: "app-block-plan", template: `<figure>
    <svg
      [attr.viewBox]="viewBox()"
      [attr.role]="editor() ? 'group' : 'img'"
      aria-label="Measured footprint from above. North is up, east is right. Rings are target centres."
      (pointermove)="move($event)"
      (pointerup)="finish($event)"
      (pointercancel)="cancel()"
    >
      <defs>
        <pattern [id]="gridId" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#bcc9b6" stroke-width=".5" />
        </pattern>
      </defs>
      <rect
        [attr.x]="bounds().x"
        [attr.y]="bounds().z"
        [attr.width]="bounds().width"
        [attr.height]="bounds().height"
        [attr.fill]="'url(#' + gridId + ')'"
      />
      @for (block of shown().blocks; track block.id; let i = $index) {
        <rect
          [attr.role]="editor() ? 'button' : null"
          [attr.tabindex]="editor() ? 0 : null"
          [attr.aria-label]="block.label || 'Block ' + (i + 1)"
          [attr.aria-pressed]="editor() ? editor()!.selection().includes(block.id) : null"
          (pointerdown)="start($event, block.id)"
          (keydown)="key($event, block.id)"
          [attr.x]="(block.x - block.width / 2) * 100"
          [attr.y]="(block.z - block.depth / 2) * 100"
          [attr.width]="block.width * 100"
          [attr.height]="block.depth * 100"
          [attr.transform]="
            'rotate(' + -block.rotation + ' ' + block.x * 100 + ' ' + block.z * 100 + ')'
          "
          [attr.fill]="editor()?.selection()?.includes(block.id) ? '#8ad7ce' : '#d4bc8d'"
          [attr.stroke]="
            editor()?.selection()?.includes(block.id)
              ? editor()?.draftError()
                ? '#bc3038'
                : '#166d71'
              : '#6a593b'
          "
          [attr.stroke-width]="editor()?.selection()?.includes(block.id) ? 3 : 1"
          vector-effect="non-scaling-stroke"
        />
        @if (block.aperture; as a) {
          <circle
            pointer-events="none"
            [attr.cx]="block.x * 100"
            [attr.cy]="block.z * 100"
            [attr.r]="a.axis === 'y' ? a.diameter * 50 : 3"
            fill="#fff6e5"
            stroke="#9d3653"
            stroke-width="1"
          >
            <title>
              Centered {{ a.axis }} bore, diameter {{ a.diameter }} m; {{ a.insert }} {{ a.color }}
            </title>
          </circle>
        }
      }
      @if (design().displayObject; as o) {
        <circle
          [attr.cx]="o.x * 100"
          [attr.cy]="o.z * 100"
          [attr.r]="o.width * 50"
          fill="#b4cbc8"
          stroke="#315e60"
          stroke-width="1"
        />
        <text
          [attr.x]="o.x * 100"
          [attr.y]="o.z * 100 + 3"
          text-anchor="middle"
          font-size="8"
          fill="#193f36"
        >
          {{ o.model }}
        </text>
      }
      @for (target of design().targets; track target.id) {
        <circle [attr.cx]="target.x * 100" [attr.cy]="target.z * 100" r="3" fill="#aa6922" />
        <text
          [attr.x]="target.x * 100 + 8"
          [attr.y]="target.z * 100 + 3"
          font-size="8"
          fill="#193f36"
        >
          {{ target.label }}
        </text>
      }
      <text [attr.x]="bounds().x + 6" [attr.y]="bounds().z + 14" font-size="10" fill="#193f36">
        \u2191 N
      </text>
      <g pointer-events="none" stroke="#166d71" stroke-width="1">
        <path d="M-8 0H8M0 -8V8" />
        <text x="10" y="12" stroke="none" fill="#166d71" font-size="8">0,0</text>
      </g>
      @if (handle(); as h) {
        <line
          [attr.x1]="h.x"
          [attr.y1]="h.z"
          [attr.x2]="h.x"
          [attr.y2]="h.z - h.radius"
          stroke="#166d71"
          stroke-dasharray="3 3"
        />
        <circle
          [attr.cx]="h.x"
          [attr.cy]="h.z - h.radius"
          r="7"
          fill="#166d71"
          stroke="#fff"
          stroke-width="2"
          role="button"
          tabindex="0"
          aria-label="Rotate selected stones"
          (pointerdown)="start($event, '', true)"
          (keydown)="rotateKey($event)"
        />
      }
    </svg>
    <figcaption>
      North \u2191 \xB7 grid = 20 cm \xB7 stacked stones share a footprint
      @if (editor()) {
        <br />Drag stones or the round rotation handle. Arrow keys move 1 cm; Shift = 5 cm.
      }
    </figcaption>
  </figure>`, styles: ["/* angular:styles/component:scss;3fe736b7e5955bdb8010e72ed75159c82b5d08deb3d7b46191533e2195242fe5;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/engineering-design/ui/block-plan.component.ts */\nfigure {\n  margin: 18px 0;\n  padding: 18px;\n  background: #eaf0df;\n  border: 1px solid #ccd7c1;\n  border-radius: 12px;\n}\nsvg {\n  display: block;\n  width: 100%;\n  height: 300px;\n  touch-action: none;\n}\n[role=button] {\n  cursor: grab;\n}\n[role=button]:focus {\n  outline: none;\n  stroke: #c17c14;\n  stroke-width: 3;\n}\nfigcaption {\n  font: 12px system-ui;\n  color: #405d50;\n  margin-top: 10px;\n}\n/*# sourceMappingURL=block-plan.component.css.map */\n"] }]
  }], null, { design: [{ type: Input, args: [{ isSignal: true, alias: "design", required: true }] }], editor: [{ type: Input, args: [{ isSignal: true, alias: "editor", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BlockPlanComponent, { className: "BlockPlanComponent", filePath: "src/app/templates/engineering-design/ui/block-plan.component.ts", lineNumber: 168 });
})();

export {
  BlockPlanComponent
};
//# debugId=e32f951c-7dfa-5a60-97d0-cb27a66f380b
//# sourceMappingURL=chunk-5NMHGW4V.js.map
