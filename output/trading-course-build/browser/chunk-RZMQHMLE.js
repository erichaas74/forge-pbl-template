import {
  EngineeringExhibitComponent
} from "./chunk-QNAGWBLA.js";
import {
  BlockBuilderComponent
} from "./chunk-SCMANZFT.js";
import "./chunk-5NMHGW4V.js";
import {
  ENGINEERING_CONFIG,
  EngineeringDesignRuntime
} from "./chunk-S4ZXE6OE.js";
import {
  DESIGN_CAPTURE,
  DESIGN_CAPTURE_BATCH,
  DESIGN_CHANGE,
  DESIGN_CHROME,
  DESIGN_EDITOR,
  DESIGN_SIMULATIONS,
  DESIGN_VIEW_REQUEST,
  DesignEditor
} from "./chunk-T7GOLBBA.js";
import {
  WorkspaceToolsComponent
} from "./chunk-NDJR5R7S.js";
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
  bindLessonFocus
} from "./chunk-3C62DQOL.js";
import "./chunk-2WXJ5NX3.js";
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
  ɵɵdomProperty,
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
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtextInterpolate4,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/engineering-design/ui/design-thumbnail.component.ts
var _forTrack0 = ($index, $item) => $item.name;
function DesignThumbnailComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "linearGradient", 1);
    \u0275\u0275domElement(1, "stop", 8)(2, "stop", 9)(3, "stop", 10)(4, "stop", 11)(5, "stop", 12);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const glass_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("id", ctx_r1.textureId + "-" + glass_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("stop-color", glass_r1.color);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("stop-color", glass_r1.color);
  }
}
function DesignThumbnailComponent_For_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 14);
  }
  if (rf & 2) {
    const face_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("d", ctx_r1.shape(face_r3.hole))("fill", face_r3.holeFill);
  }
}
function DesignThumbnailComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 13);
    \u0275\u0275conditionalCreate(1, DesignThumbnailComponent_For_14_Conditional_1_Template, 1, 2, ":svg:path", 14);
  }
  if (rf & 2) {
    const face_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("d", ctx_r1.shape(face_r3.points))("fill", face_r3.fill)("filter", "url(#" + ctx_r1.textureId + ")");
    \u0275\u0275advance();
    \u0275\u0275conditional(face_r3.hole ? 1 : -1);
  }
}
var tint = {
  clear: "#bde7e6",
  red: "#d74d53",
  amber: "#eaba38",
  green: "#32a57a",
  blue: "#497de1",
  violet: "#a373d5"
};
var project = (p) => [(p[0] - p[2]) * 0.866, (p[0] + p[2]) * 0.43 - p[1]];
var path = (points) => points.map((p, i) => `${i ? "L" : "M"}${project(p).join(",")}`).join(" ") + "Z";
var depth = (points) => points.reduce((sum, p) => sum + p[0] + p[1] + p[2], 0) / points.length;
var nextTexture = 0;
var DesignThumbnailComponent = class _DesignThumbnailComponent {
  textureId = `stone-thumbnail-${nextTexture++}`;
  glassTints = Object.entries(tint).map(([name, color]) => ({ name, color }));
  design = input.required(
    ...ngDevMode ? [{ debugName: "design" }] : (
      /* istanbul ignore next */
      []
    )
  );
  shape = path;
  drawing = computed(
    () => {
      const faces = [];
      for (const b of this.design().blocks)
        this.blockFaces(b, faces);
      const o = this.design().displayObject;
      if (o) {
        const transform = (p) => this.world([p[0] * o.width / 2, p[1] * o.height / 2, p[2] * o.width / 2], o);
        if (o.model === "crystal") {
          for (const x of [-1, 1])
            for (const y of [-1, 1])
              for (const z of [-1, 1]) {
                const points = [
                  [x, 0, 0],
                  [0, y, 0],
                  [0, 0, z]
                ].map(transform);
                faces.push({
                  points,
                  fill: y > 0 ? x > 0 ? "#9dcbc9" : "#d8ece8" : "#678c97",
                  depth: depth(points)
                });
              }
        } else if (o.model === "sphere") {
          const sphere = (lat, lon) => [
            Math.cos(lat) * Math.sin(lon),
            Math.sin(lat),
            Math.cos(lat) * Math.cos(lon)
          ];
          for (let i = 0; i < 8; i++)
            for (let j = 0; j < 16; j++) {
              const a = i * Math.PI / 8 - Math.PI / 2, b = (i + 1) * Math.PI / 8 - Math.PI / 2, l = j * Math.PI / 8;
              const points = [
                sphere(a, l),
                sphere(a, l + Math.PI / 8),
                sphere(b, l + Math.PI / 8),
                sphere(b, l)
              ].map(transform);
              faces.push({ points, fill: `hsl(162 17% ${56 + i * 4}%)`, depth: depth(points) });
            }
        } else
          this.blockFaces(__spreadProps(__spreadValues({}, o), { id: "object-thumbnail", depth: o.width }), faces, 0.45);
      }
      faces.sort((a, b) => a.depth - b.depth);
      const pts = faces.flatMap((f) => f.points.map(project));
      const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
      const minX = Math.min(0, ...xs), minY = Math.min(0, ...ys);
      const width = Math.max(0.2, Math.max(0, ...xs) - minX), height = Math.max(0.2, Math.max(0, ...ys) - minY);
      return { faces, viewBox: `${minX - 0.15} ${minY - 0.15} ${width + 0.3} ${height + 0.3}` };
    },
    ...ngDevMode ? [{ debugName: "drawing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  world(p, b) {
    const r = b.rotation * Math.PI / 180;
    return [
      b.x + p[0] * Math.cos(r) + p[2] * Math.sin(r),
      b.y + b.height / 2 + p[1],
      b.z - p[0] * Math.sin(r) + p[2] * Math.cos(r)
    ];
  }
  blockFaces(b, out, taper = 1) {
    const h = [b.width / 2, b.height / 2, b.depth / 2];
    for (let axis = 0; axis < 3; axis++)
      for (const sign of [-1, 1]) {
        const r = b.rotation * Math.PI / 180;
        const facing = sign * (axis === 0 ? Math.cos(r) - Math.sin(r) : axis === 1 ? 1 : Math.sin(r) + Math.cos(r));
        if (facing < 1e-8)
          continue;
        const other = [0, 1, 2].filter((i) => i !== axis);
        const points = [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1]
        ].map(([u, v]) => {
          const p = [0, 0, 0];
          p[axis] = h[axis] * sign;
          p[other[0]] = h[other[0]] * u;
          p[other[1]] = h[other[1]] * v;
          if (p[1] > 0) {
            p[0] *= taper;
            p[2] *= taper;
          }
          return this.world(p, b);
        });
        const face = {
          points,
          depth: depth(points),
          fill: axis === 1 ? "#e9dfc8" : axis === 0 ? "#a99b82" : "#c9bda2"
        };
        if (b.aperture && ["x", "y", "z"][axis] === b.aperture.axis) {
          face.hole = Array.from({ length: 40 }, (_, i) => {
            const p = [0, 0, 0];
            p[axis] = h[axis] * sign;
            p[other[0]] = b.aperture.diameter / 2 * Math.cos(i * Math.PI / 20);
            p[other[1]] = b.aperture.diameter / 2 * Math.sin(i * Math.PI / 20);
            return this.world(p, b);
          });
          face.holeFill = b.aperture.insert === "open" ? "#38443e" : `url(#${this.textureId}-${b.aperture.color})`;
        }
        out.push(face);
      }
  }
  static \u0275fac = function DesignThumbnailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DesignThumbnailComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DesignThumbnailComponent, selectors: [["app-design-thumbnail"]], inputs: { design: [1, "design"] }, decls: 15, vars: 2, consts: [["aria-hidden", "true", "focusable", "false"], ["x1", "0", "y1", "0", "x2", "1", "y2", "1"], ["x", "0", "y", "0", "width", "100%", "height", "100%"], ["type", "fractalNoise", "baseFrequency", "55", "numOctaves", "3", "seed", "8", "result", "grain"], ["in", "grain", "type", "saturate", "values", "0"], ["type", "linear", "slope", "0.3", "intercept", "0.7"], ["in2", "SourceGraphic", "operator", "in"], ["in", "SourceGraphic", "mode", "multiply"], ["offset", "0", "stop-color", "#fffbea"], ["offset", "0.28"], ["offset", "0.36", "stop-color", "#e5f4ee"], ["offset", "0.45"], ["offset", "1", "stop-color", "#343f4b"], ["stroke", "#948873", "stroke-width", "0.005", "stroke-linejoin", "round"], ["stroke", "#715747", "stroke-width", "0.012"]], template: function DesignThumbnailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0)(1, "defs");
      \u0275\u0275repeaterCreate(2, DesignThumbnailComponent_For_3_Template, 6, 3, ":svg:linearGradient", 1, _forTrack0);
      \u0275\u0275domElementStart(4, "filter", 2);
      \u0275\u0275domElement(5, "feTurbulence", 3)(6, "feColorMatrix", 4);
      \u0275\u0275domElementStart(7, "feComponentTransfer");
      \u0275\u0275domElement(8, "feFuncR", 5)(9, "feFuncG", 5)(10, "feFuncB", 5);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElement(11, "feComposite", 6)(12, "feBlend", 7);
      \u0275\u0275domElementEnd()();
      \u0275\u0275repeaterCreate(13, DesignThumbnailComponent_For_14_Template, 2, 4, null, null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("viewBox", ctx.drawing().viewBox);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.glassTints);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("id", ctx.textureId);
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.drawing().faces);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  height: 94px;\n}\nsvg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n}\n/*# sourceMappingURL=design-thumbnail.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DesignThumbnailComponent, [{
    type: Component,
    args: [{ selector: "app-design-thumbnail", template: `<svg [attr.viewBox]="drawing().viewBox" aria-hidden="true" focusable="false">
    <defs>
      @for (glass of glassTints; track glass.name) {
        <linearGradient [attr.id]="textureId + '-' + glass.name" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fffbea" />
          <stop offset="0.28" [attr.stop-color]="glass.color" />
          <stop offset="0.36" stop-color="#e5f4ee" />
          <stop offset="0.45" [attr.stop-color]="glass.color" />
          <stop offset="1" stop-color="#343f4b" />
        </linearGradient>
      }
      <filter [attr.id]="textureId" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="55" numOctaves="3" seed="8" result="grain" />
        <feColorMatrix in="grain" type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="0.3" intercept="0.7" />
          <feFuncG type="linear" slope="0.3" intercept="0.7" />
          <feFuncB type="linear" slope="0.3" intercept="0.7" />
        </feComponentTransfer>
        <feComposite in2="SourceGraphic" operator="in" />
        <feBlend in="SourceGraphic" mode="multiply" />
      </filter>
    </defs>
    @for (face of drawing().faces; track $index) {
      <path
        [attr.d]="shape(face.points)"
        [attr.fill]="face.fill"
        [attr.filter]="'url(#' + textureId + ')'"
        stroke="#948873"
        stroke-width="0.005"
        stroke-linejoin="round"
      />
      @if (face.hole) {
        <path
          [attr.d]="shape(face.hole)"
          [attr.fill]="face.holeFill"
          stroke="#715747"
          stroke-width="0.012"
        />
      }
    }
  </svg>`, styles: ["/* angular:styles/component:scss;774b0f60b663e71bad82a169455c830828870585a424008083890d2e90d01e47;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/engineering-design/ui/design-thumbnail.component.ts */\n:host {\n  display: block;\n  height: 94px;\n}\nsvg {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n}\n/*# sourceMappingURL=design-thumbnail.component.css.map */\n"] }]
  }], null, { design: [{ type: Input, args: [{ isSignal: true, alias: "design", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DesignThumbnailComponent, { className: "DesignThumbnailComponent", filePath: "src/app/templates/engineering-design/ui/design-thumbnail.component.ts", lineNumber: 86 });
})();

// src/app/templates/engineering-design/ui/design-sample-gallery.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function DesignSampleGalleryComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DesignSampleGalleryComponent_For_8_Template_button_click_0_listener() {
      const sample_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.preview.emit(sample_r2.id));
    });
    \u0275\u0275element(1, "app-design-thumbnail", 4);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sample_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", "Preview " + sample_r2.title)("aria-pressed", ctx_r2.selectedId() === sample_r2.id);
    \u0275\u0275advance();
    \u0275\u0275property("design", sample_r2.design);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sample_r2.title);
  }
}
var DesignSampleGalleryComponent = class _DesignSampleGalleryComponent {
  samples = input.required(
    ...ngDevMode ? [{ debugName: "samples" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedId = input(
    "",
    ...ngDevMode ? [{ debugName: "selectedId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  preview = output();
  static \u0275fac = function DesignSampleGalleryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DesignSampleGalleryComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DesignSampleGalleryComponent, selectors: [["app-design-sample-gallery"]], inputs: { samples: [1, "samples"], selectedId: [1, "selectedId"] }, outputs: { preview: "preview" }, decls: 9, vars: 0, consts: [["aria-label", "Sample monument models"], [1, "heading"], [1, "samples"], [3, "click"], [3, "design"]], template: function DesignSampleGalleryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Try a sample monument");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5, "Pick a shape. Explore its shadow. Your own design stays saved.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 2);
      \u0275\u0275repeaterCreate(7, DesignSampleGalleryComponent_For_8_Template, 4, 4, "button", null, _forTrack02);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.samples());
    }
  }, dependencies: [DesignThumbnailComponent], styles: ["\nsection[_ngcontent-%COMP%] {\n  margin: 8px 0 16px;\n  padding: 14px;\n  background:\n    linear-gradient(\n      110deg,\n      #e9e3d3,\n      #f1eadc);\n  border: 1px solid #c7b795;\n  border-radius: 12px;\n}\n.heading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px 18px;\n  align-items: baseline;\n  margin-bottom: 10px;\n}\nh2[_ngcontent-%COMP%] {\n  font: 700 19px Georgia, serif;\n  margin: 0;\n}\np[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin: 0;\n  color: #655e4e;\n}\n.samples[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(6, minmax(0, 1fr));\n  gap: 9px;\n}\nbutton[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 8px;\n  background:\n    radial-gradient(\n      ellipse at 50% 67%,\n      #dcd3be 0,\n      #f8f3e8 60%);\n  border: 1px solid #cbbd9d;\n  border-radius: 9px;\n  cursor: pointer;\n  color: #494738;\n  font: 600 13px/1.35 system-ui;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #f7edd1;\n  border-color: #a97b2c;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #f4e5ba;\n  border: 2px solid #966f24;\n  padding: 7px;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #ad6b14;\n  outline-offset: 2px;\n}\nspan[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 4px;\n}\n@media (max-width: 700px) {\n  .samples[_ngcontent-%COMP%] {\n    display: flex;\n    overflow-x: auto;\n    padding: 3px 3px 10px;\n    scroll-snap-type: x proximity;\n  }\n  button[_ngcontent-%COMP%] {\n    flex: 0 0 144px;\n    scroll-snap-align: start;\n  }\n}\n/*# sourceMappingURL=design-sample-gallery.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DesignSampleGalleryComponent, [{
    type: Component,
    args: [{ selector: "app-design-sample-gallery", imports: [DesignThumbnailComponent], template: `<section aria-label="Sample monument models">
    <div class="heading">
      <h2>Try a sample monument</h2>
      <p>Pick a shape. Explore its shadow. Your own design stays saved.</p>
    </div>
    <div class="samples">
      @for (sample of samples(); track sample.id) {
        <button
          [attr.aria-label]="'Preview ' + sample.title"
          [attr.aria-pressed]="selectedId() === sample.id"
          (click)="preview.emit(sample.id)"
        >
          <app-design-thumbnail [design]="sample.design" /><span>{{ sample.title }}</span>
        </button>
      }
    </div>
  </section>`, styles: ["/* angular:styles/component:scss;e963558c75bb98b879649a69099bba467e6333763ac93bb291b2c8755402044f;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/engineering-design/ui/design-sample-gallery.component.ts */\nsection {\n  margin: 8px 0 16px;\n  padding: 14px;\n  background:\n    linear-gradient(\n      110deg,\n      #e9e3d3,\n      #f1eadc);\n  border: 1px solid #c7b795;\n  border-radius: 12px;\n}\n.heading {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px 18px;\n  align-items: baseline;\n  margin-bottom: 10px;\n}\nh2 {\n  font: 700 19px Georgia, serif;\n  margin: 0;\n}\np {\n  font-size: 13px;\n  margin: 0;\n  color: #655e4e;\n}\n.samples {\n  display: grid;\n  grid-template-columns: repeat(6, minmax(0, 1fr));\n  gap: 9px;\n}\nbutton {\n  min-width: 0;\n  padding: 8px;\n  background:\n    radial-gradient(\n      ellipse at 50% 67%,\n      #dcd3be 0,\n      #f8f3e8 60%);\n  border: 1px solid #cbbd9d;\n  border-radius: 9px;\n  cursor: pointer;\n  color: #494738;\n  font: 600 13px/1.35 system-ui;\n}\nbutton:hover {\n  background: #f7edd1;\n  border-color: #a97b2c;\n}\nbutton[aria-pressed=true] {\n  background: #f4e5ba;\n  border: 2px solid #966f24;\n  padding: 7px;\n}\nbutton:focus-visible {\n  outline: 3px solid #ad6b14;\n  outline-offset: 2px;\n}\nspan {\n  display: block;\n  margin-top: 4px;\n}\n@media (max-width: 700px) {\n  .samples {\n    display: flex;\n    overflow-x: auto;\n    padding: 3px 3px 10px;\n    scroll-snap-type: x proximity;\n  }\n  button {\n    flex: 0 0 144px;\n    scroll-snap-align: start;\n  }\n}\n/*# sourceMappingURL=design-sample-gallery.component.css.map */\n"] }]
  }], null, { samples: [{ type: Input, args: [{ isSignal: true, alias: "samples", required: true }] }], selectedId: [{ type: Input, args: [{ isSignal: true, alias: "selectedId", required: false }] }], preview: [{ type: Output, args: ["preview"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DesignSampleGalleryComponent, { className: "DesignSampleGalleryComponent", filePath: "src/app/templates/engineering-design/ui/design-sample-gallery.component.ts", lineNumber: 99 });
})();

// src/app/templates/engineering-design/ui/engineering-learning-guide.component.ts
function EngineeringLearningGuideComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const instruction_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(instruction_r1);
  }
}
function EngineeringLearningGuideComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function EngineeringLearningGuideComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "label", 3);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "textarea", 4);
    \u0275\u0275domListener("change", function EngineeringLearningGuideComponent_Conditional_13_Template_textarea_change_2_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.answered.emit($event.target.value));
    });
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.prompt);
    \u0275\u0275advance();
    \u0275\u0275domProperty("value", ctx_r2.answer());
  }
}
var EngineeringLearningGuideComponent = class _EngineeringLearningGuideComponent {
  steps = input.required(
    ...ngDevMode ? [{ debugName: "steps" }] : (
      /* istanbul ignore next */
      []
    )
  );
  step = input.required(
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  index = input(
    0,
    ...ngDevMode ? [{ debugName: "index" }] : (
      /* istanbul ignore next */
      []
    )
  );
  answer = input(
    "",
    ...ngDevMode ? [{ debugName: "answer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  answered = output();
  static \u0275fac = function EngineeringLearningGuideComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EngineeringLearningGuideComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EngineeringLearningGuideComponent, selectors: [["app-engineering-learning-guide"]], inputs: { steps: [1, "steps"], step: [1, "step"], index: [1, "index"], answer: [1, "answer"] }, outputs: { answered: "answered" }, decls: 14, vars: 6, consts: [["aria-label", "Current learning step"], [1, "heading"], [1, "eyebrow"], ["for", "learning-answer"], ["id", "learning-answer", "rows", "2", "maxlength", "10000", "placeholder", "I noticed\u2026 I think\u2026", 3, "change", "value"]], template: function EngineeringLearningGuideComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "p", 2);
      \u0275\u0275text(4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "h2");
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "p");
      \u0275\u0275text(8);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(9, "ol");
      \u0275\u0275repeaterCreate(10, EngineeringLearningGuideComponent_For_11_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(12, EngineeringLearningGuideComponent_Conditional_12_Template, 2, 1, "p");
      \u0275\u0275conditionalCreate(13, EngineeringLearningGuideComponent_Conditional_13_Template, 3, 2);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_4_0;
      let tmp_5_0;
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate2("STEP ", ctx.index() + 1, " OF ", ctx.steps().length);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.step().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.step().introduction);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.step().instructions);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_4_0 = ctx.step().explanation) ? 12 : -1, tmp_4_0);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_5_0 = ctx.step().question) ? 13 : -1, tmp_5_0);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #393c30;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  margin: 4px 0;\n}\nh2[_ngcontent-%COMP%] {\n  font: 700 23px Georgia, serif;\n  margin: 4px 0;\n}\np[_ngcontent-%COMP%], \nli[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.55;\n}\nol[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\nli[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 12px;\n  font-size: 14px;\n  font-weight: 650;\n}\ntextarea[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 100%;\n  font: inherit;\n  font-size: 14px;\n  margin: 6px 0 12px;\n  padding: 8px;\n  border: 1px solid #bdb49b;\n  border-radius: 6px;\n  background: #fffdf7;\n  resize: vertical;\n}\ntextarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #bc812c;\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=engineering-learning-guide.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EngineeringLearningGuideComponent, [{
    type: Component,
    args: [{ selector: "app-engineering-learning-guide", template: `
    <section aria-label="Current learning step">
      <div class="heading">
        <div>
          <p class="eyebrow">STEP {{ index() + 1 }} OF {{ steps().length }}</p>
          <h2>{{ step().title }}</h2>
          <p>{{ step().introduction }}</p>
        </div>
      </div>
      <ol>
        @for (instruction of step().instructions; track instruction) {
          <li>{{ instruction }}</li>
        }
      </ol>
      @if (step().explanation; as explanation) {
        <p>{{ explanation }}</p>
      }
      @if (step().question; as question) {
        <label for="learning-answer">{{ question.prompt }}</label>
        <textarea
          id="learning-answer"
          rows="2"
          maxlength="10000"
          [value]="answer()"
          (change)="answered.emit($any($event.target).value)"
          placeholder="I noticed\u2026 I think\u2026"
        ></textarea>
      }
    </section>
  `, styles: ["/* angular:styles/component:scss;eca19757ee4018cf79b69b200baf835a496f47785aac360cc8a9e51a30d5e433;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/engineering-design/ui/engineering-learning-guide.component.ts */\n:host {\n  display: block;\n  color: #393c30;\n}\n.eyebrow {\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  margin: 4px 0;\n}\nh2 {\n  font: 700 23px Georgia, serif;\n  margin: 4px 0;\n}\np,\nli {\n  font-size: 14px;\n  line-height: 1.55;\n}\nol {\n  padding-left: 20px;\n}\nli {\n  margin-bottom: 8px;\n}\nlabel {\n  display: block;\n  margin-top: 12px;\n  font-size: 14px;\n  font-weight: 650;\n}\ntextarea {\n  box-sizing: border-box;\n  width: 100%;\n  font: inherit;\n  font-size: 14px;\n  margin: 6px 0 12px;\n  padding: 8px;\n  border: 1px solid #bdb49b;\n  border-radius: 6px;\n  background: #fffdf7;\n  resize: vertical;\n}\ntextarea:focus-visible {\n  outline: 3px solid #bc812c;\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=engineering-learning-guide.component.css.map */\n"] }]
  }], null, { steps: [{ type: Input, args: [{ isSignal: true, alias: "steps", required: true }] }], step: [{ type: Input, args: [{ isSignal: true, alias: "step", required: true }] }], index: [{ type: Input, args: [{ isSignal: true, alias: "index", required: false }] }], answer: [{ type: Input, args: [{ isSignal: true, alias: "answer", required: false }] }], answered: [{ type: Output, args: ["answered"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EngineeringLearningGuideComponent, { className: "EngineeringLearningGuideComponent", filePath: "src/app/templates/engineering-design/ui/engineering-learning-guide.component.ts", lineNumber: 48 });
})();

// src/app/templates/engineering-design/ui/engineering-design-page.component.ts
var _c0 = ["supportPanel"];
var _c1 = ["canvasRegion"];
var _c2 = (a0) => ["/projects", a0];
var _c3 = (a0) => ["/projects", a0, "final-demo"];
var _c4 = () => [];
var _forTrack03 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
var _forTrack2 = ($index, $item) => $item.title;
function EngineeringDesignPageComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 13);
    \u0275\u0275text(1, "\u2190 Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h1");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 14);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_3_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglePanel("trials"));
    });
    \u0275\u0275text(5, " Notebook ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(3, _c2, ctx_r1.config.projectId));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.config.title);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r1.panel() === "trials");
  }
}
function EngineeringDesignPageComponent_Conditional_4_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const \u0275$index_23_r6 = ctx.$index;
    \u0275\u0275property("value", item_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", \u0275$index_23_r6 + 1, " \xB7 ", item_r5.title);
  }
}
function EngineeringDesignPageComponent_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 25);
    \u0275\u0275listener("ngModelChange", function EngineeringDesignPageComponent_Conditional_4_Conditional_1_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectStep($event));
    });
    \u0275\u0275repeaterCreate(1, EngineeringDesignPageComponent_Conditional_4_Conditional_1_For_2_Template, 2, 3, "option", 26, _forTrack03);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngModel", ctx.id);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.learningSteps);
  }
}
function EngineeringDesignPageComponent_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h1");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.config.title);
  }
}
function EngineeringDesignPageComponent_Conditional_4_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_4_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePanel("samples"));
    });
    \u0275\u0275text(1, "Sample models");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 17);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_4_Conditional_10_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.presenting.set(!ctx_r1.presenting());
      return \u0275\u0275resetView(ctx_r1.panel.set(""));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 17);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_4_Conditional_10_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePanel("explain"));
    });
    \u0275\u0275text(5, "My explanation");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.presenting() ? "Back to building" : "Final demonstration", " ");
  }
}
function EngineeringDesignPageComponent_Conditional_4_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function EngineeringDesignPageComponent_Conditional_4_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 17);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_4_Conditional_22_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.useSample());
    });
    \u0275\u0275text(4, "Use model");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 17);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_4_Conditional_22_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.stopPreview());
    });
    \u0275\u0275text(6, "My design");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Preview: ", ctx.title);
  }
}
function EngineeringDesignPageComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275conditionalCreate(1, EngineeringDesignPageComponent_Conditional_4_Conditional_1_Template, 3, 1, "select", 16)(2, EngineeringDesignPageComponent_Conditional_4_Conditional_2_Template, 2, 1, "h1");
    \u0275\u0275elementStart(3, "button", 17);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_4_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglePanel("guide"));
    });
    \u0275\u0275text(4, " Guide ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "details", 18, 1)(7, "summary", 19);
    \u0275\u0275text(8, "\u2022\u2022\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 20);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_4_Template_div_click_9_listener() {
      \u0275\u0275restoreView(_r3);
      const menu_r7 = \u0275\u0275reference(6);
      return \u0275\u0275resetView(menu_r7.open = false);
    });
    \u0275\u0275conditionalCreate(10, EngineeringDesignPageComponent_Conditional_4_Conditional_10_Template, 6, 1);
    \u0275\u0275elementStart(11, "button", 17);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_4_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglePanel("trials"));
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 17);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_4_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportNotebook());
    });
    \u0275\u0275text(14, "Export notebook & blueprint");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "a", 21);
    \u0275\u0275text(16, "Project opening");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "a", 21);
    \u0275\u0275text(18, "Example");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "a", 22);
    \u0275\u0275text(20, "All projects");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(21, EngineeringDesignPageComponent_Conditional_4_ng_container_21_Template, 1, 0, "ng-container", 23);
    \u0275\u0275conditionalCreate(22, EngineeringDesignPageComponent_Conditional_4_Conditional_22_Template, 7, 1, "div", 24);
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_10_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx_r1.learningStep()) ? 1 : 2, tmp_3_0);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-expanded", ctx_r1.panel() === "guide");
    \u0275\u0275advance(7);
    \u0275\u0275conditional(!ctx_r1.practicing() ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Notebook \xB7 ", ctx_r1.runtime.snapshot().trials.length, " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(8, _c2, ctx_r1.config.projectId));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(10, _c3, ctx_r1.config.projectId));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.chrome()?.toolbar ?? null);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_10_0 = ctx_r1.preview()) ? 22 : -1, tmp_10_0);
  }
}
function EngineeringDesignPageComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_5_For_2_Template_button_click_0_listener() {
      const step_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectStep(step_r11.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r11 = ctx.$implicit;
    const \u0275$index_85_r12 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r1.chrome()?.walkthrough?.ready());
    \u0275\u0275attribute("aria-current", ctx_r1.stepIndex() === \u0275$index_85_r12 ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_85_r12 + 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", step_r11.title, " ");
  }
}
function EngineeringDesignPageComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 5);
    \u0275\u0275repeaterCreate(1, EngineeringDesignPageComponent_Conditional_5_For_2_Template, 4, 4, "button", 27, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.learningSteps);
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const reading_r14 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(reading_r14.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(reading_r14.value);
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_14_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_7_Conditional_14_Conditional_4_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.restorePreviousDesign());
    });
    \u0275\u0275text(1, "Restore my previous monument");
    \u0275\u0275elementEnd();
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_14_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_7_Conditional_14_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.loadTaskSample());
    });
    \u0275\u0275text(1, " Load the starting challenge ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, EngineeringDesignPageComponent_Conditional_7_Conditional_14_Conditional_4_Conditional_2_Template, 2, 0, "button");
  }
  if (rf & 2) {
    const controls_r17 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !controls_r17.ready());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.runtime.snapshot().designBackup ? 2 : -1);
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_14_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_7_Conditional_14_For_6_Template_button_click_0_listener() {
      const action_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runTaskAction(action_r19));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r19 = ctx.$implicit;
    const controls_r17 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !controls_r17.ready());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", action_r19.label, " ");
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dl", 39);
    \u0275\u0275repeaterCreate(1, EngineeringDesignPageComponent_Conditional_7_Conditional_14_For_2_Template, 5, 2, "div", null, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 40);
    \u0275\u0275conditionalCreate(4, EngineeringDesignPageComponent_Conditional_7_Conditional_14_Conditional_4_Template, 3, 2);
    \u0275\u0275repeaterCreate(5, EngineeringDesignPageComponent_Conditional_7_Conditional_14_For_6_Template, 2, 2, "button", 27, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 41);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const controls_r17 = ctx;
    const task_r20 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(controls_r17.readings());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(task_r20.sampleId ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(task_r20.actions ?? \u0275\u0275pureFunction0(2, _c4));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.walkthroughStatus() || controls_r17.status(), " ");
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_15_Conditional_2_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r22 = ctx.$implicit;
    \u0275\u0275property("value", option_r22);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r22);
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_15_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 46);
    \u0275\u0275listener("ngModelChange", function EngineeringDesignPageComponent_Conditional_7_Conditional_15_Conditional_2_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.answerTask($event));
    });
    \u0275\u0275elementStart(1, "option", 47);
    \u0275\u0275text(2, "Choose what you observed");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, EngineeringDesignPageComponent_Conditional_7_Conditional_15_Conditional_2_For_4_Template, 2, 2, "option", 26, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const response_r23 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngModel", ctx_r1.taskAnswer());
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(response_r23.options);
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_15_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "input", 48);
    \u0275\u0275listener("ngModelChange", function EngineeringDesignPageComponent_Conditional_7_Conditional_15_Conditional_3_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.answerTask($event == null ? "" : "" + $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const response_r23 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.taskAnswer());
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(response_r23.unit);
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_15_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "textarea", 49);
    \u0275\u0275listener("ngModelChange", function EngineeringDesignPageComponent_Conditional_7_Conditional_15_Conditional_4_Template_textarea_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.answerTask($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngModel", ctx_r1.taskAnswer());
    \u0275\u0275control();
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, EngineeringDesignPageComponent_Conditional_7_Conditional_15_Conditional_2_Template, 5, 1, "select", 43)(3, EngineeringDesignPageComponent_Conditional_7_Conditional_15_Conditional_3_Template, 4, 2, "div", 44)(4, EngineeringDesignPageComponent_Conditional_7_Conditional_15_Conditional_4_Template, 1, 1, "textarea", 45);
  }
  if (rf & 2) {
    const response_r23 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(response_r23.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(response_r23.options ? 2 : response_r23.unit ? 3 : 4);
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r20 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", task_r20.requiredTargetId ? "Place this date mark before continuing." : task_r20.requiredEvidenceCount ? "Save the four-date check and your explanation to finish." : task_r20.response ? "Record your observation before continuing." : "Loading this task\u2019s view\u2026", " ");
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 37);
    \u0275\u0275text(1, " Walkthrough finished. Your notes and recorded tests are in the Notebook. ");
    \u0275\u0275elementEnd();
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_23_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const note_r26 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(note_r26.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", note_r26.answer, " ");
  }
}
function EngineeringDesignPageComponent_Conditional_7_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 38)(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, EngineeringDesignPageComponent_Conditional_7_Conditional_23_For_4_Template, 5, 2, "p", null, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("My observations \xB7 ", ctx_r1.previousNotes().length);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.previousNotes());
  }
}
function EngineeringDesignPageComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 7)(1, "div", 29)(2, "p", 30);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 31);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 32)(9, "strong");
    \u0275\u0275text(10, "Look for");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 33);
    \u0275\u0275conditionalCreate(14, EngineeringDesignPageComponent_Conditional_7_Conditional_14_Template, 9, 3);
    \u0275\u0275conditionalCreate(15, EngineeringDesignPageComponent_Conditional_7_Conditional_15_Template, 5, 2);
    \u0275\u0275conditionalCreate(16, EngineeringDesignPageComponent_Conditional_7_Conditional_16_Template, 2, 1, "p", 34);
    \u0275\u0275elementStart(17, "div", 35)(18, "button", 28);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_7_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.moveTask(-1));
    });
    \u0275\u0275text(19, " \u2190 Back ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 36);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_7_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.moveTask(1));
    });
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(22, EngineeringDesignPageComponent_Conditional_7_Conditional_22_Template, 2, 0, "p", 37);
    \u0275\u0275conditionalCreate(23, EngineeringDesignPageComponent_Conditional_7_Conditional_23_Template, 5, 1, "details", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_7_0;
    let tmp_8_0;
    const task_r20 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate4(" STEP ", ctx_r1.stepIndex() + 1, " OF ", ctx_r1.learningSteps.length, " \xB7 TASK ", ctx_r1.taskIndex() + 1, " OF ", ctx_r1.tasks().length, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(task_r20.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(task_r20.instruction);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(task_r20.lookFor);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_7_0 = ctx_r1.chrome()?.walkthrough) ? 14 : -1, tmp_7_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_8_0 = task_r20.response) ? 15 : -1, tmp_8_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.canContinue() ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.chrome()?.walkthrough?.ready() || ctx_r1.stepIndex() === 0 && ctx_r1.taskIndex() === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.canContinue() || ctx_r1.finished());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.stepIndex() === ctx_r1.learningSteps.length - 1 && ctx_r1.taskIndex() === ctx_r1.tasks().length - 1 ? "Finish walkthrough" : "Continue \u2192", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.finished() ? 22 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.previousNotes().length ? 23 : -1);
  }
}
function EngineeringDesignPageComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_11_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePanel("samples"));
    });
    \u0275\u0275text(1, "Start from a sample model");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3, "Blocks & targets");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "details")(5, "summary");
    \u0275\u0275text(6, "Design brief");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "app-block-builder", 52);
    \u0275\u0275listener("changed", function EngineeringDesignPageComponent_Conditional_11_Conditional_4_Template_app_block_builder_changed_9_listener($event) {
      \u0275\u0275restoreView(_r28);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveActiveDesign($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.config.designBrief);
    \u0275\u0275advance();
    \u0275\u0275property("design", ctx_r1.activeDesign())("editor", ctx_r1.editor);
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-engineering-learning-guide", 54);
    \u0275\u0275listener("answered", function EngineeringDesignPageComponent_Conditional_11_Conditional_5_Conditional_0_Template_app_engineering_learning_guide_answered_0_listener($event) {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.answerStep($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r30 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("steps", ctx_r1.learningSteps)("step", step_r30)("index", ctx_r1.stepIndex())("answer", ctx_r1.runtime.snapshot().research[step_r30.question?.researchId || ""] || "");
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 55);
    \u0275\u0275text(1, "My prediction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "textarea", 56);
    \u0275\u0275listener("change", function EngineeringDesignPageComponent_Conditional_11_Conditional_5_Conditional_2_Template_textarea_change_2_listener($event) {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.saveText("prediction", $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.runtime.snapshot().prediction);
    \u0275\u0275control();
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EngineeringDesignPageComponent_Conditional_11_Conditional_5_Conditional_0_Template, 1, 4, "app-engineering-learning-guide", 53);
    \u0275\u0275template(1, EngineeringDesignPageComponent_Conditional_11_Conditional_5_ng_container_1_Template, 1, 0, "ng-container", 23);
    \u0275\u0275conditionalCreate(2, EngineeringDesignPageComponent_Conditional_11_Conditional_5_Conditional_2_Template, 3, 1);
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional((tmp_4_0 = ctx_r1.learningStep()) ? 0 : -1, tmp_4_0);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.chrome()?.guide ?? null);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.practicing() ? 2 : -1);
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_11_Conditional_6_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.restorePreviousDesign());
    });
    \u0275\u0275text(1, "Restore previous design");
    \u0275\u0275elementEnd();
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1, "Sample models");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "app-design-sample-gallery", 57);
    \u0275\u0275listener("preview", function EngineeringDesignPageComponent_Conditional_11_Conditional_6_Template_app_design_sample_gallery_preview_2_listener($event) {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.previewSample($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, EngineeringDesignPageComponent_Conditional_11_Conditional_6_Conditional_3_Template, 2, 0, "button");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("samples", ctx_r1.config.designSamples ?? \u0275\u0275pureFunction0(3, _c4))("selectedId", ctx_r1.sampleId());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.snapshot().designBackup ? 3 : -1);
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_7_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const instruction_r34 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(instruction_r34);
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_7_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "details")(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 58);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "label", 59);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "textarea", 60);
    \u0275\u0275listener("change", function EngineeringDesignPageComponent_Conditional_11_Conditional_7_For_9_Template_textarea_change_9_listener($event) {
      const item_r36 = \u0275\u0275restoreView(_r35).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.saveResearch(item_r36.id, $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r36 = ctx.$implicit;
    const \u0275$index_271_r37 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275$index_271_r37 + 1, " \xB7 ", item_r36.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r36.explanation);
    \u0275\u0275advance();
    \u0275\u0275property("href", item_r36.source.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", item_r36.source.label, " \u2197");
    \u0275\u0275advance();
    \u0275\u0275property("for", "research-" + item_r36.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r36.prompt);
    \u0275\u0275advance();
    \u0275\u0275property("id", "research-" + item_r36.id)("ngModel", ctx_r1.runtime.snapshot().research[item_r36.id] || "");
    \u0275\u0275control();
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1, "More to explore");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "details")(3, "summary");
    \u0275\u0275text(4, "How to test your monument");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ol");
    \u0275\u0275repeaterCreate(6, EngineeringDesignPageComponent_Conditional_11_Conditional_7_For_7_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(8, EngineeringDesignPageComponent_Conditional_11_Conditional_7_For_9_Template, 10, 9, "details", null, _forTrack03);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.config.testInstructions);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.config.research);
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_8_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const note_r39 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(note_r39.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", note_r39.answer, " ");
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_8_For_9_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r41 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r41.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r41.value);
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_8_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "details")(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "dl");
    \u0275\u0275repeaterCreate(6, EngineeringDesignPageComponent_Conditional_11_Conditional_8_For_9_For_7_Template, 4, 2, null, null, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 17);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_11_Conditional_8_For_9_Template_button_click_8_listener() {
      const trial_r42 = \u0275\u0275restoreView(_r40).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.replay(trial_r42));
    });
    \u0275\u0275text(9, "Load this design & test again");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trial_r42 = ctx.$implicit;
    const \u0275$index_307_r43 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Test ", \u0275$index_307_r43 + 1, " \xB7 ", trial_r42.settings["workspace"] === "practice" ? "Sundial" : "Monument", " \xB7 ", trial_r42.settings["localDate"], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trial_r42.prediction || "No prediction recorded.");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(trial_r42.measurements);
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_8_ForEmpty_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Record a test in the lab, or record all four dates from Final demonstration.");
    \u0275\u0275elementEnd();
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1, "Evidence notebook");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 17);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_11_Conditional_8_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.exportNotebook());
    });
    \u0275\u0275text(3, "Export notebook & blueprint");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, EngineeringDesignPageComponent_Conditional_11_Conditional_8_For_5_Template, 5, 2, "p", null, _forTrack2);
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Each record keeps its own design, prediction and measurements.");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, EngineeringDesignPageComponent_Conditional_11_Conditional_8_For_9_Template, 10, 4, "details", null, _forTrack03, false, EngineeringDesignPageComponent_Conditional_11_Conditional_8_ForEmpty_10_Template, 2, 0, "p");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.previousNotes());
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.runtime.snapshot().trials);
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_9_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const prompt_r45 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(prompt_r45);
  }
}
function EngineeringDesignPageComponent_Conditional_11_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1, "Explain your demonstration");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ul");
    \u0275\u0275repeaterCreate(3, EngineeringDesignPageComponent_Conditional_11_Conditional_9_For_4_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label", 61);
    \u0275\u0275text(6, "My design, evidence and revisions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "textarea", 62);
    \u0275\u0275listener("change", function EngineeringDesignPageComponent_Conditional_11_Conditional_9_Template_textarea_change_7_listener($event) {
      \u0275\u0275restoreView(_r44);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.saveText("exhibit", $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.config.exhibitPrompts);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.runtime.snapshot().exhibit);
    \u0275\u0275control();
  }
}
function EngineeringDesignPageComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 50, 2);
    \u0275\u0275listener("keydown.escape", function EngineeringDesignPageComponent_Conditional_11_Template_aside_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglePanel(ctx_r1.panel()));
    });
    \u0275\u0275elementStart(2, "button", 51);
    \u0275\u0275listener("click", function EngineeringDesignPageComponent_Conditional_11_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglePanel(ctx_r1.panel()));
    });
    \u0275\u0275text(3, "Close panel \xD7");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, EngineeringDesignPageComponent_Conditional_11_Conditional_4_Template, 10, 3);
    \u0275\u0275conditionalCreate(5, EngineeringDesignPageComponent_Conditional_11_Conditional_5_Template, 3, 3);
    \u0275\u0275conditionalCreate(6, EngineeringDesignPageComponent_Conditional_11_Conditional_6_Template, 4, 4);
    \u0275\u0275conditionalCreate(7, EngineeringDesignPageComponent_Conditional_11_Conditional_7_Template, 10, 0);
    \u0275\u0275conditionalCreate(8, EngineeringDesignPageComponent_Conditional_11_Conditional_8_Template, 11, 1);
    \u0275\u0275conditionalCreate(9, EngineeringDesignPageComponent_Conditional_11_Conditional_9_Template, 8, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.panel() === "build" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.panel() === "guide" ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.panel() === "samples" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.panel() === "guide" && ctx_r1.learningStep()?.showGuides !== false ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.panel() === "trials" ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.panel() === "explain" ? 9 : -1);
  }
}
function EngineeringDesignPageComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate2(" ", ctx_r1.researchCount(), "/", ctx_r1.config.research.length, " research notes \xB7 ");
  }
}
function EngineeringDesignPageComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 12)(1, "summary");
    \u0275\u0275text(2, "Supporting explanation, blueprint & recorded evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "app-engineering-exhibit", 63);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("title", ctx_r1.config.title)("snapshot", ctx_r1.runtime.snapshot());
  }
}
var EngineeringDesignPageComponent = class _EngineeringDesignPageComponent {
  config = inject(ENGINEERING_CONFIG);
  runtime = inject(EngineeringDesignRuntime);
  simulation = inject(DESIGN_SIMULATIONS).require(this.config.simulationId);
  panel = signal(
    "",
    ...ngDevMode ? [{ debugName: "panel" }] : (
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
  presenting = signal(
    false,
    ...ngDevMode ? [{ debugName: "presenting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sampleId = signal(
    "",
    ...ngDevMode ? [{ debugName: "sampleId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  learningSteps = this.config.learningSequence?.steps ?? [];
  learningStep = computed(
    () => this.learningSteps.find((step) => step.id === this.runtime.snapshot().learningStepId) ?? this.learningSteps[0],
    ...ngDevMode ? [{ debugName: "learningStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stepIndex = computed(
    () => this.learningSteps.findIndex((step) => step.id === this.learningStep()?.id),
    ...ngDevMode ? [{ debugName: "stepIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  practicing = computed(
    () => this.learningStep()?.workspace === "practice",
    ...ngDevMode ? [{ debugName: "practicing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tasks = computed(
    () => this.learningStep()?.tasks ?? [],
    ...ngDevMode ? [{ debugName: "tasks" }] : (
      /* istanbul ignore next */
      []
    )
  );
  taskIndex = computed(
    () => Math.max(0, this.tasks().findIndex((t) => t.id === this.runtime.snapshot().learningTaskId)),
    ...ngDevMode ? [{ debugName: "taskIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  task = computed(
    () => this.tasks()[this.taskIndex()],
    ...ngDevMode ? [{ debugName: "task" }] : (
      /* istanbul ignore next */
      []
    )
  );
  guided = computed(
    () => !!this.task(),
    ...ngDevMode ? [{ debugName: "guided" }] : (
      /* istanbul ignore next */
      []
    )
  );
  taskAnswer = computed(
    () => this.runtime.snapshot().walkthroughNotes?.[this.learningStep()?.id + "/" + this.task()?.id] ?? "",
    ...ngDevMode ? [{ debugName: "taskAnswer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  walkthroughStatus = signal(
    "",
    ...ngDevMode ? [{ debugName: "walkthroughStatus" }] : (
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
  canContinue = computed(
    () => {
      const task = this.task();
      if (!task)
        return false;
      if (!this.chrome()?.walkthrough?.ready())
        return false;
      if (task.requiredEvidenceCount && this.runtime.snapshot().trials.filter((t) => t.settings["learningStepId"] === this.learningStep()?.id && t.settings["learningTaskId"] === task.id && JSON.stringify(t.design) === JSON.stringify(this.activeDesign())).length < task.requiredEvidenceCount)
        return false;
      if (task.requiredTargetId && !this.activeDesign().targets.some((t) => t.id === task.requiredTargetId))
        return false;
      if (!task.response)
        return true;
      const answer = this.taskAnswer().trim();
      return !!answer && (!task.response.unit || Number.isFinite(Number(answer)) && Number(answer) >= 0 && Number(answer) <= 2400);
    },
    ...ngDevMode ? [{ debugName: "canContinue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previousNotes = computed(
    () => this.learningSteps.flatMap((step) => (step.tasks ?? []).flatMap((task) => {
      const answer = this.runtime.snapshot().walkthroughNotes?.[step.id + "/" + task.id];
      return answer ? [
        {
          title: task.title,
          answer: answer + (task.response?.unit ? " " + task.response.unit : "")
        }
      ] : [];
    })),
    ...ngDevMode ? [{ debugName: "previousNotes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeDesign = computed(
    () => this.practicing() ? this.runtime.snapshot().practiceDesign ?? this.config.learningSequence.practiceDesign : this.runtime.snapshot().design,
    ...ngDevMode ? [{ debugName: "activeDesign" }] : (
      /* istanbul ignore next */
      []
    )
  );
  preview = computed(
    () => this.config.designSamples?.find((s) => s.id === this.sampleId()),
    ...ngDevMode ? [{ debugName: "preview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editor = new DesignEditor(() => this.activeDesign(), (d) => this.saveActiveDesign(d), () => !this.preview() && !this.presenting());
  constructor() {
    bindLessonFocus((lesson) => {
      const target = lesson.focusTarget;
      if (this.learningSteps.some((step) => step.id === target))
        this.selectStep(target);
      else if (target === "explanation" || target === "presentation") {
        const last = this.learningSteps.at(-1);
        if (last)
          this.selectStep(last.id);
        if (target === "explanation")
          this.panel.set("explain");
        else
          this.presenting.set(true);
      }
    });
    effect(() => {
      this.activeDesign();
      const scope = this.practicing() ? "practice" : "project";
      untracked(() => this.editor.sync(scope));
    });
  }
  injector = inject(Injector);
  simulationInjector = Injector.create({
    parent: this.injector,
    providers: [
      { provide: DESIGN_EDITOR, useValue: this.editor },
      {
        provide: DESIGN_CHROME,
        useValue: (chrome) => this.chrome.set(chrome)
      },
      {
        provide: DESIGN_CHANGE,
        useValue: (design) => {
          if (!this.preview())
            this.saveActiveDesign(design);
        }
      },
      {
        provide: DESIGN_CAPTURE,
        useValue: (capture) => {
          if (!this.preview())
            this.runtime.capture(this.tagCapture(capture));
        }
      },
      {
        provide: DESIGN_CAPTURE_BATCH,
        useValue: (captures) => {
          if (!this.preview())
            this.runtime.captureBatch(captures.map((c) => this.tagCapture(c)));
        }
      },
      {
        provide: DESIGN_VIEW_REQUEST,
        useValue: (view) => {
          if (view === "build" && !this.preview() && !this.practicing()) {
            if (this.panel() !== "build")
              this.togglePanel("build");
          } else if (view === "observe") {
            this.panel.set("");
            this.focusCanvas();
          }
        }
      }
    ]
  });
  supportPanel = viewChild(
    "supportPanel",
    ...ngDevMode ? [{ debugName: "supportPanel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canvasRegion = viewChild(
    "canvasRegion",
    ...ngDevMode ? [{ debugName: "canvasRegion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  restore = signal(
    this.savedContext(),
    ...ngDevMode ? [{ debugName: "restore" }] : (
      /* istanbul ignore next */
      []
    )
  );
  simulationInputs = computed(
    () => __spreadValues(__spreadValues({
      design: this.preview()?.design ?? this.activeDesign(),
      restore: this.restore(),
      active: true,
      presentation: this.presenting(),
      checks: this.preview() || this.practicing() ? [] : this.runtime.snapshot().checks ?? [],
      readOnly: !!this.preview(),
      building: this.panel() === "build"
    }, this.learningStep() ? { activity: this.learningStep().activity } : {}), this.guided() ? { walkthrough: this.task().setup } : {}),
    ...ngDevMode ? [{ debugName: "simulationInputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectStep(id) {
    this.runtime.selectLearningStep(id);
    this.sampleId.set("");
    this.restore.set(void 0);
    this.panel.set("");
    this.presenting.set(false);
    this.finished.set(false);
    this.walkthroughStatus.set("");
  }
  moveTask(direction) {
    if (direction === 1 && !this.canContinue())
      return;
    let step = this.stepIndex(), task = this.taskIndex() + direction;
    if (task < 0) {
      step--;
      task = (this.learningSteps[step]?.tasks?.length ?? 1) - 1;
    }
    if (task >= this.tasks().length && direction === 1) {
      step++;
      task = 0;
    }
    const next = this.learningSteps[step], nextTask = next?.tasks?.[task];
    if (!nextTask) {
      if (direction === 1)
        this.finished.set(true);
      return;
    }
    this.selectStep(next.id);
    this.runtime.selectLearningTask(next.id, nextTask.id);
  }
  answerTask(answer) {
    this.runtime.saveWalkthroughNote(this.learningStep().id, this.task().id, answer);
    if (this.task().response?.saveAs === "exhibit")
      this.runtime.saveText("exhibit", answer);
  }
  runTaskAction(action) {
    this.walkthroughStatus.set("");
    this.chrome()?.walkthrough?.run(action);
  }
  loadTaskSample() {
    const id = this.task()?.sampleId;
    if (!id)
      return;
    this.runtime.useDesignSample(id);
    this.walkthroughStatus.set("Starting challenge loaded. Your previous monument is backed up.");
  }
  answerStep(answer) {
    const question = this.learningStep()?.question;
    if (question)
      this.runtime.saveResearch(question.researchId, answer);
  }
  saveActiveDesign(design) {
    this.runtime.saveDesign(design, this.practicing() ? "practice" : "project");
  }
  tagCapture(capture) {
    const step = this.learningStep();
    return step ? __spreadProps(__spreadValues({}, capture), {
      settings: __spreadValues(__spreadProps(__spreadValues({}, capture.settings), {
        workspace: step.workspace,
        learningStepId: step.id
      }), this.task() ? { learningTaskId: this.task().id } : {})
    }) : capture;
  }
  researchCount = computed(
    () => this.config.research.filter((r) => this.runtime.snapshot().research[r.id]?.trim()).length,
    ...ngDevMode ? [{ debugName: "researchCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  togglePanel(panel) {
    if (panel === "build")
      this.presenting.set(false);
    this.panel.set(this.panel() === panel ? "" : panel);
    afterNextRender(() => {
      const element = (this.panel() ? this.supportPanel() : this.canvasRegion())?.nativeElement;
      element?.scrollIntoView({ block: "nearest" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  previewSample(id) {
    if (this.practicing())
      return;
    if (!this.config.designSamples?.some((s) => s.id === id))
      return;
    this.sampleId.set(id);
    this.restore.set(void 0);
    this.presenting.set(false);
    this.panel.set("");
    this.focusCanvas();
  }
  stopPreview() {
    this.sampleId.set("");
    this.restore.set(void 0);
    this.presenting.set(false);
    this.focusCanvas();
  }
  useSample() {
    const sample = this.preview();
    if (!sample)
      return;
    this.runtime.useDesignSample(sample.id);
    this.stopPreview();
    this.togglePanel("build");
  }
  restorePreviousDesign() {
    this.runtime.restoreDesignBackup();
    this.stopPreview();
  }
  focusCanvas() {
    afterNextRender(() => {
      const element = this.canvasRegion()?.nativeElement;
      element?.scrollIntoView({ block: "nearest" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  savedContext() {
    const snapshot = this.runtime.snapshot();
    const last = [...snapshot.trials].reverse().find((trial) => trial.settings["workspace"] === "practice" === this.practicing());
    return last ? __spreadProps(__spreadValues({}, last), { design: this.activeDesign() }) : void 0;
  }
  replay(trial) {
    this.sampleId.set("");
    const workspace = trial.settings["workspace"] === "practice" ? "practice" : "project";
    const step = this.learningSteps.find((s) => s.id === trial.settings["learningStepId"]) ?? this.learningSteps.find((s) => s.workspace === workspace);
    if (step)
      this.runtime.selectLearningStep(step.id);
    this.runtime.saveDesign(trial.design, workspace);
    this.restore.set(trial);
    this.presenting.set(false);
    this.panel.set("");
  }
  exportNotebook() {
    const blob = new Blob([
      JSON.stringify(__spreadValues({
        projectId: this.config.projectId,
        projectVersion: this.config.version
      }, this.runtime.snapshot()), null, 2)
    ], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${this.config.projectId}-notebook.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
  static \u0275fac = function EngineeringDesignPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EngineeringDesignPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EngineeringDesignPageComponent, selectors: [["app-engineering-design-page"]], viewQuery: function EngineeringDesignPageComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.supportPanel, _c0, 5)(ctx.canvasRegion, _c1, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, decls: 17, vars: 19, consts: [["canvasRegion", ""], ["menu", ""], ["supportPanel", ""], [1, "design-studio"], ["aria-label", "Lab navigation and controls", 1, "lab-header"], ["aria-label", "Five-step walkthrough", 1, "lesson-path"], [1, "workspace"], ["aria-label", "Current walkthrough task", 1, "walkthrough-card"], ["tabindex", "-1", "aria-label", "Monument canvas workspace", 1, "simulation"], [4, "ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector"], ["tabindex", "-1", "aria-label", "Project tools and guides", 1, "support-panel"], ["role", "status", 1, "save-status"], [1, "supporting-record"], [1, "project-return", 3, "routerLink"], [1, "notebook-button", 3, "click"], [1, "workspace-navigation"], ["aria-label", "Lab step", 3, "ngModel"], [3, "click"], [1, "workspace-menu"], ["aria-label", "Workspace menu"], [1, "menu-items", 3, "click"], [3, "routerLink"], ["routerLink", "/projects"], [4, "ngTemplateOutlet"], [1, "preview-actions"], ["aria-label", "Lab step", 3, "ngModelChange", "ngModel"], [3, "value"], [3, "disabled"], [3, "click", "disabled"], [1, "task-brief"], [1, "task-eyebrow"], [1, "task-instruction"], [1, "look-for"], [1, "task-work"], [1, "next-hint"], [1, "task-navigation"], [1, "continue", 3, "click", "disabled"], ["role", "status", 1, "completion"], [1, "measurement-notes"], ["aria-label", "Live measurements", 1, "live-readings"], [1, "task-actions"], ["role", "status", 1, "task-feedback"], ["for", "task-answer", 1, "response-label"], ["id", "task-answer", 3, "ngModel"], [1, "measurement-input"], ["id", "task-answer", "rows", "3", "maxlength", "2000", 3, "ngModel"], ["id", "task-answer", 3, "ngModelChange", "ngModel"], ["value", ""], ["id", "task-answer", "type", "number", "min", "0", "max", "2400", "step", "0.1", 3, "ngModelChange", "ngModel"], ["id", "task-answer", "rows", "3", "maxlength", "2000", 3, "ngModelChange", "ngModel"], ["tabindex", "-1", "aria-label", "Project tools and guides", 1, "support-panel", 3, "keydown.escape"], [1, "close", 3, "click"], [3, "changed", "design", "editor"], [3, "steps", "step", "index", "answer"], [3, "answered", "steps", "step", "index", "answer"], ["for", "prediction"], ["id", "prediction", "rows", "3", "maxlength", "10000", "placeholder", "On this date, I expect\u2026", 3, "change", "ngModel"], [3, "preview", "samples", "selectedId"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], [3, "for"], ["rows", "5", "maxlength", "10000", "placeholder", "My observations and explanation\u2026", 3, "change", "id", "ngModel"], ["for", "exhibit"], ["id", "exhibit", "rows", "10", "maxlength", "10000", 3, "change", "ngModel"], [3, "title", "snapshot"]], template: function EngineeringDesignPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 3)(1, "app-workspace-tools")(2, "header", 4);
      \u0275\u0275conditionalCreate(3, EngineeringDesignPageComponent_Conditional_3_Template, 6, 5)(4, EngineeringDesignPageComponent_Conditional_4_Template, 23, 12);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, EngineeringDesignPageComponent_Conditional_5_Template, 3, 0, "nav", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 6);
      \u0275\u0275conditionalCreate(7, EngineeringDesignPageComponent_Conditional_7_Template, 24, 15, "aside", 7);
      \u0275\u0275elementStart(8, "section", 8, 0);
      \u0275\u0275template(10, EngineeringDesignPageComponent_ng_container_10_Template, 1, 0, "ng-container", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(11, EngineeringDesignPageComponent_Conditional_11_Template, 10, 6, "aside", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p", 11);
      \u0275\u0275text(13);
      \u0275\u0275conditionalCreate(14, EngineeringDesignPageComponent_Conditional_14_Template, 1, 2);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, EngineeringDesignPageComponent_Conditional_16_Template, 4, 2, "details", 12);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_7_0;
      \u0275\u0275classProp("guided-studio", ctx.guided());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.guided() ? 3 : 4);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.guided() ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("guided-workspace", ctx.guided())("with-panel", !!ctx.panel())("building-panel", ctx.panel() === "build");
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_7_0 = ctx.task()) ? 7 : -1, tmp_7_0);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngComponentOutlet", ctx.simulation)("ngComponentOutletInputs", ctx.simulationInputs())("ngComponentOutletInjector", ctx.simulationInjector);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.panel() ? 11 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.runtime.saveStatus(), " \xB7 ");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.guided() ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.runtime.snapshot().trials.length, " recorded tests ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.presenting() && !ctx.preview() ? 16 : -1);
    }
  }, dependencies: [
    WorkspaceToolsComponent,
    NgComponentOutlet,
    NgTemplateOutlet,
    RouterLink,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    NumberValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    MaxLengthValidator,
    MinValidator,
    MaxValidator,
    NgModel,
    BlockBuilderComponent,
    EngineeringExhibitComponent,
    DesignSampleGalleryComponent,
    EngineeringLearningGuideComponent
  ], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  background: #f3efe5;\n  color: #393b31;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\n.guided-studio[_ngcontent-%COMP%] {\n  max-width: 1500px;\n}\n.guided-studio[_ngcontent-%COMP%]   .lab-header[_ngcontent-%COMP%] {\n  padding: 12px 8px;\n  border: 0;\n  border-bottom: 1px solid #d4cbb6;\n  border-radius: 0;\n  gap: 18px;\n}\n.guided-studio[_ngcontent-%COMP%]   .project-return[_ngcontent-%COMP%] {\n  color: #4d645b;\n  text-decoration: none;\n  font-size: 13px;\n}\n.guided-studio[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font: 600 17px system-ui;\n}\n.guided-studio[_ngcontent-%COMP%]   .notebook-button[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.guided-studio[_ngcontent-%COMP%]   .simulation[_ngcontent-%COMP%] {\n  min-width: 0;\n  overflow: hidden;\n  border-radius: 12px;\n  background: #eee8d9;\n}\n.lesson-path[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  gap: 6px;\n  padding: 16px 0;\n}\n.lesson-path[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  text-align: left;\n  padding: 10px;\n  border-color: transparent;\n  background: transparent;\n  font-size: 12px;\n  line-height: 1.4;\n}\n.lesson-path[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  border: 1px solid #b5b7a6;\n  border-radius: 50%;\n  width: 26px;\n  height: 26px;\n}\n.lesson-path[_ngcontent-%COMP%]   [aria-current=step][_ngcontent-%COMP%] {\n  background: #e0e9dd;\n  color: #214e40;\n  font-weight: 700;\n}\n.lesson-path[_ngcontent-%COMP%]   [aria-current=step][_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: #315c4a;\n  color: white;\n  border-color: #315c4a;\n}\n.workspace.guided-workspace[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 345px minmax(0, 1fr);\n  gap: 16px;\n  align-items: start;\n}\n.walkthrough-card[_ngcontent-%COMP%] {\n  padding: 22px;\n  background: #fffdf7;\n  border: 1px solid #d9cfb8;\n  border-radius: 12px;\n  min-width: 0;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .task-eyebrow[_ngcontent-%COMP%] {\n  color: #657963;\n  font: 700 10px/1.5 system-ui;\n  letter-spacing: 0.1em;\n  margin: 0 0 10px;\n}\n.walkthrough-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  color: #253d35;\n  font: 600 27px/1.12 Georgia, serif;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .task-instruction[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.65;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .look-for[_ngcontent-%COMP%] {\n  border-left: 3px solid #ccad62;\n  padding: 3px 0 3px 12px;\n  margin: 18px 0;\n  font-size: 13px;\n  line-height: 1.5;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .look-for[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .look-for[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #7e652f;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .live-readings[_ngcontent-%COMP%] {\n  background: #edf2e8;\n  border-radius: 8px;\n  padding: 10px 12px;\n  margin: 14px 0;\n  font-size: 12px;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .live-readings[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 10px;\n  padding: 5px 0;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .live-readings[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #5d6e59;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .live-readings[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #254b3b;\n  font-weight: 700;\n  text-align: right;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .task-actions[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .task-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  background: #f5f1e4;\n  min-height: 42px;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .response-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 650;\n  line-height: 1.5;\n  margin: 16px 0 7px;\n}\n.walkthrough-card[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.walkthrough-card[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.walkthrough-card[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 100%;\n  max-width: 100%;\n  border: 1px solid #aaaf98;\n  border-radius: 6px;\n  padding: 10px;\n  background: white;\n  color: #304436;\n  font: 14px system-ui;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .measurement-input[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .measurement-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 130px;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .task-feedback[_ngcontent-%COMP%], \n.walkthrough-card[_ngcontent-%COMP%]   .next-hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.5;\n  color: #5e6b55;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .task-feedback[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .task-navigation[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  border-top: 1px solid #ded8c9;\n  padding-top: 16px;\n  margin-top: 20px;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .continue[_ngcontent-%COMP%] {\n  background: #315c4a;\n  color: white;\n  border-color: #315c4a;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .measurement-notes[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .measurement-notes[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.walkthrough-card[_ngcontent-%COMP%]   .completion[_ngcontent-%COMP%] {\n  padding: 12px;\n  background: #e0e9dd;\n  color: #214e40;\n  font-size: 13px;\n}\n@media (max-width: 1000px) {\n  .workspace.guided-workspace[_ngcontent-%COMP%] {\n    grid-template-columns: 300px minmax(0, 1fr);\n    gap: 10px;\n  }\n  .walkthrough-card[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n@media (max-width: 760px) {\n  .workspace.guided-workspace[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n  }\n  .guided-workspace[_ngcontent-%COMP%]    > .walkthrough-card[_ngcontent-%COMP%] {\n    display: contents;\n  }\n  .task-brief[_ngcontent-%COMP%], \n   .task-work[_ngcontent-%COMP%] {\n    box-sizing: border-box;\n    width: 100%;\n    padding: 16px;\n    background: #fffdf7;\n    border: 1px solid #d9cfb8;\n    border-radius: 10px;\n  }\n  .task-brief[_ngcontent-%COMP%] {\n    order: 0;\n  }\n  .guided-workspace[_ngcontent-%COMP%]    > .simulation[_ngcontent-%COMP%] {\n    order: 1;\n  }\n  .task-work[_ngcontent-%COMP%] {\n    order: 2;\n  }\n  .guided-workspace[_ngcontent-%COMP%]    > .simulation[_ngcontent-%COMP%], \n   .walkthrough-card[_ngcontent-%COMP%] {\n    box-sizing: border-box;\n    width: 100%;\n  }\n  .lesson-path[_ngcontent-%COMP%] {\n    gap: 2px;\n    padding: 8px 0;\n  }\n  .lesson-path[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex-direction: column;\n    font-size: 10px;\n    padding: 5px 2px;\n    text-align: center;\n  }\n  .guided-studio[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .walkthrough-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .task-actions[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  }\n}\n.design-studio[_ngcontent-%COMP%] {\n  max-width: 1800px;\n  margin: auto;\n  padding: 0 10px 10px;\n}\n.lab-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 30;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px;\n  padding: 8px;\n  background: #f7f3e8;\n  border: 1px solid #c2b69d;\n  border-top: 0;\n  border-radius: 0 0 8px 8px;\n}\n.workspace-navigation[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.workspace-navigation[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 210px;\n  max-width: 48vw;\n}\nh1[_ngcontent-%COMP%] {\n  font: 700 16px Georgia, serif;\n  margin: 0;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \nsummary[_ngcontent-%COMP%] {\n  font: inherit;\n  color: inherit;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \n.workspace-menu[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  min-height: 36px;\n  padding: 7px 10px;\n  border: 1px solid #c2b69d;\n  border-radius: 6px;\n  background: #fffdf7;\n  cursor: pointer;\n  font-size: 13px;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nbutton[aria-expanded=true][_ngcontent-%COMP%] {\n  background: #454c3c;\n  color: white;\n}\n.workspace-menu[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 0;\n  border: 0;\n}\n.workspace-menu[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%] {\n  list-style: none;\n  display: grid;\n  place-items: center;\n  box-sizing: border-box;\n}\n.menu-items[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  left: 0;\n  width: 235px;\n  display: grid;\n  gap: 4px;\n  padding: 8px;\n  border: 1px solid #c2b69d;\n  border-radius: 8px;\n  background: #fffdf7;\n  box-shadow: 0 12px 32px rgba(50, 45, 37, 0.2);\n  z-index: 50;\n}\n.menu-items[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.menu-items[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 9px 10px;\n  font-size: 13px;\n}\na[_ngcontent-%COMP%] {\n  color: #236654;\n}\n.preview-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n  font-size: 12px;\n}\n.workspace[_ngcontent-%COMP%], \n.workspace.with-panel[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n}\n.simulation[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.workspace.building-panel[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1fr) 370px;\n  gap: 8px;\n  align-items: start;\n}\n.building-panel[_ngcontent-%COMP%]   .support-panel[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 105px;\n  width: 100%;\n  max-width: none;\n  max-height: calc(100dvh - 115px);\n  box-shadow: none;\n  z-index: 10;\n}\n@media (max-width: 900px) {\n  .workspace.building-panel[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .building-panel[_ngcontent-%COMP%]   .support-panel[_ngcontent-%COMP%] {\n    position: static;\n    max-height: none;\n  }\n}\n.support-panel[_ngcontent-%COMP%] {\n  position: fixed;\n  right: 18px;\n  top: calc(var(--%NS%project-navigation-height, 0px) + 78px);\n  z-index: 40;\n  box-sizing: border-box;\n  width: 370px;\n  max-width: calc(100vw - 24px);\n  max-height: calc(100dvh - var(--%NS%project-navigation-height, 0px) - 96px);\n  overflow: auto;\n  padding: 14px;\n  border: 1px solid #b8aa8e;\n  border-radius: 10px;\n  background: #fffdf7;\n  box-shadow: 0 15px 55px rgba(40, 42, 38, 0.2509803922);\n}\n.close[_ngcontent-%COMP%] {\n  display: block;\n  margin-left: auto;\n  font-size: 12px;\n}\nh2[_ngcontent-%COMP%] {\n  font: 700 22px Georgia, serif;\n  margin: 14px 0;\n}\np[_ngcontent-%COMP%], \nli[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.6;\n}\nol[_ngcontent-%COMP%], \nul[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\nli[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n}\ndetails[_ngcontent-%COMP%] {\n  padding: 10px 0;\n  border-bottom: 1px solid #d8dfd0;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-weight: 650;\n  font-size: 13px;\n  line-height: 1.5;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  margin: 14px 0 6px;\n  font-size: 14px;\n  font-weight: 650;\n}\ntextarea[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 100%;\n  font: inherit;\n  line-height: 1.5;\n  padding: 8px;\n  border: 1px solid #afbfaf;\n  border-radius: 6px;\n  resize: vertical;\n}\ndt[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 13px;\n}\ndd[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin: 2px 0 10px;\n}\n.save-status[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #546b5e;\n  margin: 4px 0;\n}\n*[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #ba761b;\n  outline-offset: 2px;\n}\n@media (max-width: 600px) {\n  .design-studio[_ngcontent-%COMP%] {\n    padding: 0 4px 6px;\n  }\n  .lab-header[_ngcontent-%COMP%] {\n    gap: 4px;\n    padding: 5px;\n  }\n  .workspace-navigation[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n    width: 185px;\n  }\n  .support-panel[_ngcontent-%COMP%] {\n    right: 8px;\n    top: calc(var(--%NS%project-navigation-height, 0px) + 62px);\n    max-height: calc(100dvh - var(--%NS%project-navigation-height, 0px) - 76px);\n  }\n  .menu-items[_ngcontent-%COMP%] {\n    left: auto;\n    right: 0;\n  }\n}\n@media print {\n  .lab-header[_ngcontent-%COMP%], \n   .support-panel[_ngcontent-%COMP%], \n   .save-status[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=engineering-design-page.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EngineeringDesignPageComponent, [{
    type: Component,
    args: [{ selector: "app-engineering-design-page", imports: [
      WorkspaceToolsComponent,
      NgComponentOutlet,
      NgTemplateOutlet,
      RouterLink,
      FormsModule,
      BlockBuilderComponent,
      EngineeringExhibitComponent,
      DesignSampleGalleryComponent,
      EngineeringLearningGuideComponent
    ], template: `<main class="design-studio" [class.guided-studio]="guided()">\r
  <app-workspace-tools>  <header class="lab-header" aria-label="Lab navigation and controls">\r
    @if (guided()) {\r
      <a class="project-return" [routerLink]="['/projects', config.projectId]">\u2190 Project</a>\r
      <h1>{{ config.title }}</h1>\r
      <button\r
        class="notebook-button"\r
        [attr.aria-expanded]="panel() === 'trials'"\r
        (click)="togglePanel('trials')"\r
      >\r
        Notebook\r
      </button>\r
    } @else {\r
      <div class="workspace-navigation">\r
        @if (learningStep(); as step) {\r
          <select aria-label="Lab step" [ngModel]="step.id" (ngModelChange)="selectStep($event)">\r
            @for (item of learningSteps; track item.id; let i = $index) {\r
              <option [value]="item.id">{{ i + 1 }} \xB7 {{ item.title }}</option>\r
            }\r
          </select>\r
        } @else {\r
          <h1>{{ config.title }}</h1>\r
        }\r
        <button [attr.aria-expanded]="panel() === 'guide'" (click)="togglePanel('guide')">\r
          Guide\r
        </button>\r
        <details class="workspace-menu" #menu>\r
          <summary aria-label="Workspace menu">\u2022\u2022\u2022</summary>\r
          <div class="menu-items" (click)="menu.open = false">\r
            @if (!practicing()) {\r
              <button (click)="togglePanel('samples')">Sample models</button>\r
              <button (click)="presenting.set(!presenting()); panel.set('')">\r
                {{ presenting() ? 'Back to building' : 'Final demonstration' }}\r
              </button>\r
              <button (click)="togglePanel('explain')">My explanation</button>\r
            }\r
            <button (click)="togglePanel('trials')">\r
              Notebook \xB7 {{ runtime.snapshot().trials.length }}\r
            </button>\r
            <button (click)="exportNotebook()">Export notebook & blueprint</button>\r
            <a [routerLink]="['/projects', config.projectId]">Project opening</a>\r
            <a [routerLink]="['/projects', config.projectId, 'final-demo']">Example</a>\r
            <a routerLink="/projects">All projects</a>\r
          </div>\r
        </details>\r
      </div>\r
      <ng-container *ngTemplateOutlet="chrome()?.toolbar ?? null" />\r
      @if (preview(); as sample) {\r
        <div class="preview-actions">\r
          <span>Preview: {{ sample.title }}</span> <button (click)="useSample()">Use model</button\r
          ><button (click)="stopPreview()">My design</button>\r
        </div>\r
      }\r
    }\r
  </header>  @if (guided()) {\r
    <nav class="lesson-path" aria-label="Five-step walkthrough">\r
      @for (step of learningSteps; track step.id; let i = $index) {\r
        <button\r
          [disabled]="!chrome()?.walkthrough?.ready()"\r
          [attr.aria-current]="stepIndex() === i ? 'step' : null"\r
          (click)="selectStep(step.id)"\r
        >\r
          <span>{{ i + 1 }}</span\r
          >{{ step.title }}\r
        </button>\r
      }\r
    </nav>\r
  }</app-workspace-tools>\r
  <div\r
    class="workspace"\r
    [class.guided-workspace]="guided()"\r
    [class.with-panel]="!!panel()"\r
    [class.building-panel]="panel() === 'build'"\r
  >\r
    @if (task(); as task) {\r
      <aside class="walkthrough-card" aria-label="Current walkthrough task">\r
        <div class="task-brief">\r
          <p class="task-eyebrow">\r
            STEP {{ stepIndex() + 1 }} OF {{ learningSteps.length }} \xB7 TASK {{ taskIndex() + 1 }} OF\r
            {{ tasks().length }}\r
          </p>\r
          <h2>{{ task.title }}</h2>\r
          <p class="task-instruction">{{ task.instruction }}</p>\r
          <div class="look-for">\r
            <strong>Look for</strong>\r
            <p>{{ task.lookFor }}</p>\r
          </div>\r
        </div>\r
        <div class="task-work">\r
          @if (chrome()?.walkthrough; as controls) {\r
            <dl class="live-readings" aria-label="Live measurements">\r
              @for (reading of controls.readings(); track reading.label) {\r
                <div>\r
                  <dt>{{ reading.label }}</dt>\r
                  <dd>{{ reading.value }}</dd>\r
                </div>\r
              }\r
            </dl>\r
            <div class="task-actions">\r
              @if (task.sampleId) {\r
                <button [disabled]="!controls.ready()" (click)="loadTaskSample()">\r
                  Load the starting challenge\r
                </button>\r
                @if (runtime.snapshot().designBackup) {\r
                  <button (click)="restorePreviousDesign()">Restore my previous monument</button>\r
                }\r
              }\r
              @for (action of task.actions ?? []; track action.label) {\r
                <button [disabled]="!controls.ready()" (click)="runTaskAction(action)">\r
                  {{ action.label }}\r
                </button>\r
              }\r
            </div>\r
            <p class="task-feedback" role="status">\r
              {{ walkthroughStatus() || controls.status() }}\r
            </p>\r
          }\r
          @if (task.response; as response) {\r
            <label class="response-label" for="task-answer">{{ response.label }}</label>\r
            @if (response.options) {\r
              <select\r
                id="task-answer"\r
                [ngModel]="taskAnswer()"\r
                (ngModelChange)="answerTask($event)"\r
              >\r
                <option value="">Choose what you observed</option>\r
                @for (option of response.options; track option) {\r
                  <option [value]="option">{{ option }}</option>\r
                }\r
              </select>\r
            } @else if (response.unit) {\r
              <div class="measurement-input">\r
                <input\r
                  id="task-answer"\r
                  type="number"\r
                  min="0"\r
                  max="2400"\r
                  step="0.1"\r
                  [ngModel]="taskAnswer()"\r
                  (ngModelChange)="answerTask($event == null ? '' : '' + $event)"\r
                /><span>{{ response.unit }}</span>\r
              </div>\r
            } @else {\r
              <textarea\r
                id="task-answer"\r
                rows="3"\r
                maxlength="2000"\r
                [ngModel]="taskAnswer()"\r
                (ngModelChange)="answerTask($event)"\r
              ></textarea>\r
            }\r
          }\r
          @if (!canContinue()) {\r
            <p class="next-hint">\r
              {{\r
                task.requiredTargetId\r
                  ? 'Place this date mark before continuing.'\r
                  : task.requiredEvidenceCount\r
                    ? 'Save the four-date check and your explanation to finish.'\r
                    : task.response\r
                      ? 'Record your observation before continuing.'\r
                      : 'Loading this task\u2019s view\u2026'\r
              }}\r
            </p>\r
          }\r
          <div class="task-navigation">\r
            <button\r
              [disabled]="\r
                !chrome()?.walkthrough?.ready() || (stepIndex() === 0 && taskIndex() === 0)\r
              "\r
              (click)="moveTask(-1)"\r
            >\r
              \u2190 Back\r
            </button>\r
            <button\r
              class="continue"\r
              [disabled]="!canContinue() || finished()"\r
              (click)="moveTask(1)"\r
            >\r
              {{\r
                stepIndex() === learningSteps.length - 1 && taskIndex() === tasks().length - 1\r
                  ? 'Finish walkthrough'\r
                  : 'Continue \u2192'\r
              }}\r
            </button>\r
          </div>\r
          @if (finished()) {\r
            <p class="completion" role="status">\r
              Walkthrough finished. Your notes and recorded tests are in the Notebook.\r
            </p>\r
          }\r
          @if (previousNotes().length) {\r
            <details class="measurement-notes">\r
              <summary>My observations \xB7 {{ previousNotes().length }}</summary>\r
              @for (note of previousNotes(); track note.title) {\r
                <p>\r
                  <strong>{{ note.title }}</strong\r
                  ><br />{{ note.answer }}\r
                </p>\r
              }\r
            </details>\r
          }\r
        </div>\r
      </aside>\r
    }\r
    <section #canvasRegion class="simulation" tabindex="-1" aria-label="Monument canvas workspace">\r
      <ng-container\r
        *ngComponentOutlet="simulation; inputs: simulationInputs(); injector: simulationInjector"\r
      />\r
    </section>\r
    @if (panel()) {\r
      <aside\r
        #supportPanel\r
        class="support-panel"\r
        tabindex="-1"\r
        aria-label="Project tools and guides"\r
        (keydown.escape)="togglePanel(panel())"\r
      >\r
        <button class="close" (click)="togglePanel(panel())">Close panel \xD7</button>\r
        @if (panel() === 'build') {\r
          <button (click)="togglePanel('samples')">Start from a sample model</button>\r
          <h2>Blocks & targets</h2>\r
          <details>\r
            <summary>Design brief</summary>\r
            <p>{{ config.designBrief }}</p>\r
          </details>\r
          <app-block-builder\r
            [design]="activeDesign()"\r
            [editor]="editor"\r
            (changed)="saveActiveDesign($event)"\r
          />\r
        }\r
        @if (panel() === 'guide') {\r
          @if (learningStep(); as step) {\r
            <app-engineering-learning-guide\r
              [steps]="learningSteps"\r
              [step]="step"\r
              [index]="stepIndex()"\r
              [answer]="runtime.snapshot().research[step.question?.researchId || ''] || ''"\r
              (answered)="answerStep($event)"\r
            />\r
          }\r
          <ng-container *ngTemplateOutlet="chrome()?.guide ?? null" />\r
          @if (!practicing()) {\r
            <label for="prediction">My prediction</label>\r
            <textarea\r
              id="prediction"\r
              rows="3"\r
              maxlength="10000"\r
              [ngModel]="runtime.snapshot().prediction"\r
              (change)="runtime.saveText('prediction', $any($event.target).value)"\r
              placeholder="On this date, I expect\u2026"\r
            ></textarea>\r
          }\r
        }\r
        @if (panel() === 'samples') {\r
          <h2>Sample models</h2>\r
          <app-design-sample-gallery\r
            [samples]="config.designSamples ?? []"\r
            [selectedId]="sampleId()"\r
            (preview)="previewSample($event)"\r
          />\r
          @if (runtime.snapshot().designBackup) {\r
            <button (click)="restorePreviousDesign()">Restore previous design</button>\r
          }\r
        }\r
        @if (panel() === 'guide' && learningStep()?.showGuides !== false) {\r
          <h2>More to explore</h2>\r
\r
          <details>\r
            <summary>How to test your monument</summary>\r
            <ol>\r
              @for (instruction of config.testInstructions; track instruction) {\r
                <li>{{ instruction }}</li>\r
              }\r
            </ol>\r
          </details>\r
          @for (item of config.research; track item.id; let i = $index) {\r
            <details>\r
              <summary>{{ i + 1 }} \xB7 {{ item.title }}</summary>\r
              <p>{{ item.explanation }}</p>\r
              <a [href]="item.source.url" target="_blank" rel="noopener noreferrer"\r
                >{{ item.source.label }} \u2197</a\r
              >\r
              <label [for]="'research-' + item.id">{{ item.prompt }}</label>\r
              <textarea\r
                [id]="'research-' + item.id"\r
                rows="5"\r
                maxlength="10000"\r
                [ngModel]="runtime.snapshot().research[item.id] || ''"\r
                (change)="runtime.saveResearch(item.id, $any($event.target).value)"\r
                placeholder="My observations and explanation\u2026"\r
              ></textarea>\r
            </details>\r
          }\r
        }\r
        @if (panel() === 'trials') {\r
          <h2>Evidence notebook</h2>\r
          <button (click)="exportNotebook()">Export notebook & blueprint</button>\r
          @for (note of previousNotes(); track note.title) {\r
            <p>\r
              <strong>{{ note.title }}</strong\r
              ><br />{{ note.answer }}\r
            </p>\r
          }\r
          <p>Each record keeps its own design, prediction and measurements.</p>\r
          @for (trial of runtime.snapshot().trials; track trial.id; let i = $index) {\r
            <details>\r
              <summary>\r
                Test {{ i + 1 }} \xB7\r
                {{ trial.settings['workspace'] === 'practice' ? 'Sundial' : 'Monument' }} \xB7\r
                {{ trial.settings['localDate'] }}\r
              </summary>\r
              <p>{{ trial.prediction || 'No prediction recorded.' }}</p>\r
              <dl>\r
                @for (m of trial.measurements; track m.label) {\r
                  <dt>{{ m.label }}</dt>\r
                  <dd>{{ m.value }}</dd>\r
                }\r
              </dl>\r
              <button (click)="replay(trial)">Load this design & test again</button>\r
            </details>\r
          } @empty {\r
            <p>Record a test in the lab, or record all four dates from Final demonstration.</p>\r
          }\r
        }\r
        @if (panel() === 'explain') {\r
          <h2>Explain your demonstration</h2>\r
          <ul>\r
            @for (prompt of config.exhibitPrompts; track prompt) {\r
              <li>{{ prompt }}</li>\r
            }\r
          </ul>\r
          <label for="exhibit">My design, evidence and revisions</label>\r
          <textarea\r
            id="exhibit"\r
            rows="10"\r
            maxlength="10000"\r
            [ngModel]="runtime.snapshot().exhibit"\r
            (change)="runtime.saveText('exhibit', $any($event.target).value)"\r
          ></textarea>\r
        }\r
      </aside>\r
    }\r
  </div>\r
  <p class="save-status" role="status">\r
    {{ runtime.saveStatus() }} \xB7\r
    @if (!guided()) {\r
      {{ researchCount() }}/{{ config.research.length }} research notes \xB7\r
    }\r
    {{ runtime.snapshot().trials.length }} recorded tests\r
  </p>\r
  @if (presenting() && !preview()) {\r
    <details class="supporting-record">\r
      <summary>Supporting explanation, blueprint & recorded evidence</summary>\r
      <app-engineering-exhibit [title]="config.title" [snapshot]="runtime.snapshot()" />\r
    </details>\r
  }\r
</main>\r
`, styles: ["/* src/app/templates/engineering-design/ui/engineering-design-page.component.scss */\n:host {\n  display: block;\n  min-height: 100vh;\n  background: #f3efe5;\n  color: #393b31;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\n.guided-studio {\n  max-width: 1500px;\n}\n.guided-studio .lab-header {\n  padding: 12px 8px;\n  border: 0;\n  border-bottom: 1px solid #d4cbb6;\n  border-radius: 0;\n  gap: 18px;\n}\n.guided-studio .project-return {\n  color: #4d645b;\n  text-decoration: none;\n  font-size: 13px;\n}\n.guided-studio h1 {\n  font: 600 17px system-ui;\n}\n.guided-studio .notebook-button {\n  margin-left: auto;\n}\n.guided-studio .simulation {\n  min-width: 0;\n  overflow: hidden;\n  border-radius: 12px;\n  background: #eee8d9;\n}\n.lesson-path {\n  display: grid;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  gap: 6px;\n  padding: 16px 0;\n}\n.lesson-path button {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  text-align: left;\n  padding: 10px;\n  border-color: transparent;\n  background: transparent;\n  font-size: 12px;\n  line-height: 1.4;\n}\n.lesson-path span {\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  border: 1px solid #b5b7a6;\n  border-radius: 50%;\n  width: 26px;\n  height: 26px;\n}\n.lesson-path [aria-current=step] {\n  background: #e0e9dd;\n  color: #214e40;\n  font-weight: 700;\n}\n.lesson-path [aria-current=step] span {\n  background: #315c4a;\n  color: white;\n  border-color: #315c4a;\n}\n.workspace.guided-workspace {\n  display: grid;\n  grid-template-columns: 345px minmax(0, 1fr);\n  gap: 16px;\n  align-items: start;\n}\n.walkthrough-card {\n  padding: 22px;\n  background: #fffdf7;\n  border: 1px solid #d9cfb8;\n  border-radius: 12px;\n  min-width: 0;\n}\n.walkthrough-card .task-eyebrow {\n  color: #657963;\n  font: 700 10px/1.5 system-ui;\n  letter-spacing: 0.1em;\n  margin: 0 0 10px;\n}\n.walkthrough-card h2 {\n  margin: 0 0 12px;\n  color: #253d35;\n  font: 600 27px/1.12 Georgia, serif;\n}\n.walkthrough-card .task-instruction {\n  font-size: 14px;\n  line-height: 1.65;\n}\n.walkthrough-card .look-for {\n  border-left: 3px solid #ccad62;\n  padding: 3px 0 3px 12px;\n  margin: 18px 0;\n  font-size: 13px;\n  line-height: 1.5;\n}\n.walkthrough-card .look-for p {\n  margin: 4px 0;\n}\n.walkthrough-card .look-for strong {\n  color: #7e652f;\n}\n.walkthrough-card .live-readings {\n  background: #edf2e8;\n  border-radius: 8px;\n  padding: 10px 12px;\n  margin: 14px 0;\n  font-size: 12px;\n}\n.walkthrough-card .live-readings div {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 10px;\n  padding: 5px 0;\n}\n.walkthrough-card .live-readings dt {\n  color: #5d6e59;\n}\n.walkthrough-card .live-readings dd {\n  margin: 0;\n  color: #254b3b;\n  font-weight: 700;\n  text-align: right;\n}\n.walkthrough-card .task-actions {\n  display: grid;\n  gap: 7px;\n}\n.walkthrough-card .task-actions button {\n  text-align: left;\n  background: #f5f1e4;\n  min-height: 42px;\n}\n.walkthrough-card .response-label {\n  display: block;\n  font-size: 13px;\n  font-weight: 650;\n  line-height: 1.5;\n  margin: 16px 0 7px;\n}\n.walkthrough-card input,\n.walkthrough-card select,\n.walkthrough-card textarea {\n  box-sizing: border-box;\n  width: 100%;\n  max-width: 100%;\n  border: 1px solid #aaaf98;\n  border-radius: 6px;\n  padding: 10px;\n  background: white;\n  color: #304436;\n  font: 14px system-ui;\n}\n.walkthrough-card .measurement-input {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.walkthrough-card .measurement-input input {\n  width: 130px;\n}\n.walkthrough-card .task-feedback,\n.walkthrough-card .next-hint {\n  font-size: 12px;\n  line-height: 1.5;\n  color: #5e6b55;\n}\n.walkthrough-card .task-feedback:empty {\n  display: none;\n}\n.walkthrough-card .task-navigation {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  border-top: 1px solid #ded8c9;\n  padding-top: 16px;\n  margin-top: 20px;\n}\n.walkthrough-card .continue {\n  background: #315c4a;\n  color: white;\n  border-color: #315c4a;\n}\n.walkthrough-card .measurement-notes {\n  margin-top: 18px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.walkthrough-card .measurement-notes summary {\n  cursor: pointer;\n}\n.walkthrough-card .completion {\n  padding: 12px;\n  background: #e0e9dd;\n  color: #214e40;\n  font-size: 13px;\n}\n@media (max-width: 1000px) {\n  .workspace.guided-workspace {\n    grid-template-columns: 300px minmax(0, 1fr);\n    gap: 10px;\n  }\n  .walkthrough-card {\n    padding: 16px;\n  }\n}\n@media (max-width: 760px) {\n  .workspace.guided-workspace {\n    display: flex;\n    flex-direction: column;\n  }\n  .guided-workspace > .walkthrough-card {\n    display: contents;\n  }\n  .task-brief,\n  .task-work {\n    box-sizing: border-box;\n    width: 100%;\n    padding: 16px;\n    background: #fffdf7;\n    border: 1px solid #d9cfb8;\n    border-radius: 10px;\n  }\n  .task-brief {\n    order: 0;\n  }\n  .guided-workspace > .simulation {\n    order: 1;\n  }\n  .task-work {\n    order: 2;\n  }\n  .guided-workspace > .simulation,\n  .walkthrough-card {\n    box-sizing: border-box;\n    width: 100%;\n  }\n  .lesson-path {\n    gap: 2px;\n    padding: 8px 0;\n  }\n  .lesson-path button {\n    flex-direction: column;\n    font-size: 10px;\n    padding: 5px 2px;\n    text-align: center;\n  }\n  .guided-studio h1 {\n    font-size: 13px;\n  }\n  .walkthrough-card h2 {\n    font-size: 24px;\n  }\n  .task-actions {\n    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  }\n}\n.design-studio {\n  max-width: 1800px;\n  margin: auto;\n  padding: 0 10px 10px;\n}\n.lab-header {\n  position: sticky;\n  top: 0;\n  z-index: 30;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px;\n  padding: 8px;\n  background: #f7f3e8;\n  border: 1px solid #c2b69d;\n  border-top: 0;\n  border-radius: 0 0 8px 8px;\n}\n.workspace-navigation {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.workspace-navigation select {\n  width: 210px;\n  max-width: 48vw;\n}\nh1 {\n  font: 700 16px Georgia, serif;\n  margin: 0;\n}\nbutton,\nselect,\nsummary {\n  font: inherit;\n  color: inherit;\n}\nbutton,\nselect,\n.workspace-menu > summary {\n  min-height: 36px;\n  padding: 7px 10px;\n  border: 1px solid #c2b69d;\n  border-radius: 6px;\n  background: #fffdf7;\n  cursor: pointer;\n  font-size: 13px;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nbutton[aria-expanded=true] {\n  background: #454c3c;\n  color: white;\n}\n.workspace-menu {\n  position: relative;\n  padding: 0;\n  border: 0;\n}\n.workspace-menu > summary {\n  list-style: none;\n  display: grid;\n  place-items: center;\n  box-sizing: border-box;\n}\n.menu-items {\n  position: absolute;\n  top: calc(100% + 8px);\n  left: 0;\n  width: 235px;\n  display: grid;\n  gap: 4px;\n  padding: 8px;\n  border: 1px solid #c2b69d;\n  border-radius: 8px;\n  background: #fffdf7;\n  box-shadow: 0 12px 32px rgba(50, 45, 37, 0.2);\n  z-index: 50;\n}\n.menu-items button,\n.menu-items a {\n  text-align: left;\n  padding: 9px 10px;\n  font-size: 13px;\n}\na {\n  color: #236654;\n}\n.preview-actions {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n  font-size: 12px;\n}\n.workspace,\n.workspace.with-panel {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n}\n.simulation {\n  min-width: 0;\n}\n.workspace.building-panel {\n  grid-template-columns: minmax(0, 1fr) 370px;\n  gap: 8px;\n  align-items: start;\n}\n.building-panel .support-panel {\n  position: sticky;\n  top: 105px;\n  width: 100%;\n  max-width: none;\n  max-height: calc(100dvh - 115px);\n  box-shadow: none;\n  z-index: 10;\n}\n@media (max-width: 900px) {\n  .workspace.building-panel {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .building-panel .support-panel {\n    position: static;\n    max-height: none;\n  }\n}\n.support-panel {\n  position: fixed;\n  right: 18px;\n  top: calc(var(--project-navigation-height, 0px) + 78px);\n  z-index: 40;\n  box-sizing: border-box;\n  width: 370px;\n  max-width: calc(100vw - 24px);\n  max-height: calc(100dvh - var(--project-navigation-height, 0px) - 96px);\n  overflow: auto;\n  padding: 14px;\n  border: 1px solid #b8aa8e;\n  border-radius: 10px;\n  background: #fffdf7;\n  box-shadow: 0 15px 55px rgba(40, 42, 38, 0.2509803922);\n}\n.close {\n  display: block;\n  margin-left: auto;\n  font-size: 12px;\n}\nh2 {\n  font: 700 22px Georgia, serif;\n  margin: 14px 0;\n}\np,\nli {\n  font-size: 14px;\n  line-height: 1.6;\n}\nol,\nul {\n  padding-left: 20px;\n}\nli {\n  margin-bottom: 6px;\n}\ndetails {\n  padding: 10px 0;\n  border-bottom: 1px solid #d8dfd0;\n}\nsummary {\n  cursor: pointer;\n  font-weight: 650;\n  font-size: 13px;\n  line-height: 1.5;\n}\nlabel {\n  display: block;\n  margin: 14px 0 6px;\n  font-size: 14px;\n  font-weight: 650;\n}\ntextarea {\n  box-sizing: border-box;\n  width: 100%;\n  font: inherit;\n  line-height: 1.5;\n  padding: 8px;\n  border: 1px solid #afbfaf;\n  border-radius: 6px;\n  resize: vertical;\n}\ndt {\n  font-weight: 700;\n  font-size: 13px;\n}\ndd {\n  font-size: 13px;\n  margin: 2px 0 10px;\n}\n.save-status {\n  font-size: 11px;\n  color: #546b5e;\n  margin: 4px 0;\n}\n*:focus-visible {\n  outline: 3px solid #ba761b;\n  outline-offset: 2px;\n}\n@media (max-width: 600px) {\n  .design-studio {\n    padding: 0 4px 6px;\n  }\n  .lab-header {\n    gap: 4px;\n    padding: 5px;\n  }\n  .workspace-navigation select {\n    width: 185px;\n  }\n  .support-panel {\n    right: 8px;\n    top: calc(var(--project-navigation-height, 0px) + 62px);\n    max-height: calc(100dvh - var(--project-navigation-height, 0px) - 76px);\n  }\n  .menu-items {\n    left: auto;\n    right: 0;\n  }\n}\n@media print {\n  .lab-header,\n  .support-panel,\n  .save-status {\n    display: none;\n  }\n}\n/*# sourceMappingURL=engineering-design-page.component.css.map */\n"] }]
  }], () => [], { supportPanel: [{ type: ViewChild, args: ["supportPanel", { isSignal: true }] }], canvasRegion: [{ type: ViewChild, args: ["canvasRegion", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EngineeringDesignPageComponent, { className: "EngineeringDesignPageComponent", filePath: "src/app/templates/engineering-design/ui/engineering-design-page.component.ts", lineNumber: 54 });
})();
export {
  EngineeringDesignPageComponent
};
//# debugId=e092ed18-df72-572c-81c0-4edd68f1cd5d
//# sourceMappingURL=chunk-RZMQHMLE.js.map
