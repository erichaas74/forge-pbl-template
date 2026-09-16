import {
  selectedRepair
} from "./chunk-YYZUZM6Q.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  computed,
  input,
  output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-E2VJWGUE.js";

// src/app/shared/restoration/painting-canvas.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PaintingCanvasComponent_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "img", 7);
    \u0275\u0275domListener("error", function PaintingCanvasComponent_For_3_Conditional_1_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.mediaFailed.emit());
    });
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const region_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("src", ctx, \u0275\u0275sanitizeUrl)("alt", ctx_r1.option(region_r3).label);
  }
}
function PaintingCanvasComponent_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PaintingCanvasComponent_For_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 8);
    \u0275\u0275domListener("click", function PaintingCanvasComponent_For_3_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const region_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.select.emit(region_r3.id));
    });
    \u0275\u0275domElementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    const region_r3 = ctx_r4.$implicit;
    const \u0275$index_5_r6 = ctx_r4.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("guided", ctx_r1.guides())("selected", ctx_r1.state().selectedRegionId === region_r3.id);
    \u0275\u0275attribute("aria-label", "Inspect " + region_r3.title)("aria-pressed", ctx_r1.state().selectedRegionId === region_r3.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_5_r6 + 1);
  }
}
function PaintingCanvasComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 3);
    \u0275\u0275conditionalCreate(1, PaintingCanvasComponent_For_3_Conditional_1_Template, 1, 2, "img", 4);
    \u0275\u0275conditionalCreate(2, PaintingCanvasComponent_For_3_Conditional_2_Template, 2, 1, "span", 5);
    \u0275\u0275conditionalCreate(3, PaintingCanvasComponent_For_3_Conditional_3_Template, 3, 7, "button", 6);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_17_0;
    let tmp_18_0;
    const region_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("left", region_r3.x, "%")("top", region_r3.y, "%")("width", region_r3.width, "%")("height", region_r3.height, "%");
    \u0275\u0275attribute("data-region", region_r3.id)("data-option", ctx_r1.option(region_r3).id);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_17_0 = ctx_r1.option(region_r3).image) ? 1 : -1, tmp_17_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_18_0 = ctx_r1.option(region_r3).text) ? 2 : -1, tmp_18_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.interactive() ? 3 : -1);
  }
}
var PaintingCanvasComponent = class _PaintingCanvasComponent {
  definition = input.required(
    ...ngDevMode ? [{ debugName: "definition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  state = input.required(
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  original = input(
    false,
    ...ngDevMode ? [{ debugName: "original" }] : (
      /* istanbul ignore next */
      []
    )
  );
  interactive = input(
    true,
    ...ngDevMode ? [{ debugName: "interactive" }] : (
      /* istanbul ignore next */
      []
    )
  );
  guides = input(
    true,
    ...ngDevMode ? [{ debugName: "guides" }] : (
      /* istanbul ignore next */
      []
    )
  );
  select = output();
  mediaFailed = output();
  backgroundSize = computed(
    () => `${this.definition().image.grid * 100}% ${this.definition().image.grid * 100}%`,
    ...ngDevMode ? [{ debugName: "backgroundSize" }] : (
      /* istanbul ignore next */
      []
    )
  );
  position = computed(
    () => {
      const { frame, grid } = this.definition().image;
      return grid === 1 ? "center" : `${frame % grid * 100 / (grid - 1)}% ${Math.floor(frame / grid) * 100 / (grid - 1)}%`;
    },
    ...ngDevMode ? [{ debugName: "position" }] : (
      /* istanbul ignore next */
      []
    )
  );
  option(region) {
    return this.original() ? region.options.find((o) => o.id === region.originalOptionId) : selectedRepair(region, this.state());
  }
  static \u0275fac = function PaintingCanvasComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaintingCanvasComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaintingCanvasComponent, selectors: [["app-restoration-canvas"]], inputs: { definition: [1, "definition"], state: [1, "state"], original: [1, "original"], interactive: [1, "interactive"], guides: [1, "guides"] }, outputs: { select: "select", mediaFailed: "mediaFailed" }, decls: 4, vars: 8, consts: [["role", "group", 1, "painting"], ["alt", "", "hidden", "", 3, "error", "src"], [1, "paint-layer", 3, "left", "top", "width", "height"], [1, "paint-layer"], [3, "src", "alt"], [1, "inscription"], [1, "region-target", 3, "guided", "selected"], [3, "error", "src", "alt"], [1, "region-target", 3, "click"]], template: function PaintingCanvasComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "img", 1);
      \u0275\u0275domListener("error", function PaintingCanvasComponent_Template_img_error_1_listener() {
        return ctx.mediaFailed.emit();
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(2, PaintingCanvasComponent_For_3_Template, 4, 13, "div", 2, _forTrack0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275styleProp("background-image", "url(" + ctx.definition().image.src + ")")("background-size", ctx.backgroundSize())("background-position", ctx.position());
      \u0275\u0275attribute("aria-label", (ctx.original() ? "Original study: " : "Reconstruction: ") + ctx.definition().imageAlt);
      \u0275\u0275advance();
      \u0275\u0275domProperty("src", ctx.definition().image.src, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.definition().regions);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.painting[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 1;\n  background-color: #314438;\n  background-repeat: no-repeat;\n  overflow: hidden;\n  isolation: isolate;\n}\n.paint-layer[_ngcontent-%COMP%] {\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.paint-layer[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  pointer-events: none;\n  filter: drop-shadow(0 3px 3px rgba(26, 24, 12, 0.4));\n}\n.inscription[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  white-space: pre-line;\n  padding: 4px 8px;\n  background: rgba(232, 213, 164, 0.9294117647);\n  border: 2px solid #755d2f;\n  box-shadow: 0 3px 8px rgba(23, 32, 22, 0.4);\n  color: #302513;\n  font: clamp(11px, 1.3vw, 18px)/1.25 Georgia, serif;\n}\n.region-target[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  border: 2px solid transparent;\n  background: transparent;\n  color: #192c24;\n  cursor: pointer;\n  border-radius: 3px;\n  min-width: 30px;\n  min-height: 30px;\n}\n.region-target.guided[_ngcontent-%COMP%] {\n  border: 2px dashed rgba(255, 240, 186, 0.6666666667);\n}\n.region-target.selected[_ngcontent-%COMP%] {\n  border: 3px solid #ffe095;\n  background: rgba(255, 209, 126, 0.0705882353);\n}\n.region-target[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  width: 27px;\n  height: 27px;\n  border-radius: 0 0 8px 0;\n  background: #f3d392;\n  display: grid;\n  place-items: center;\n  font: 700 13px Arial;\n  box-shadow: 0 2px 8px rgba(23, 32, 22, 0.4666666667);\n}\n.region-target[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #fff;\n  outline-offset: -6px;\n}\n.region-target[_ngcontent-%COMP%]:hover {\n  border-color: #ffe095;\n}\n@media (max-width: 600px) {\n  .inscription[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 3px 5px;\n  }\n  .region-target[_ngcontent-%COMP%] {\n    min-width: 44px;\n    min-height: 44px;\n  }\n}\n/*# sourceMappingURL=painting-canvas.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaintingCanvasComponent, [{
    type: Component,
    args: [{ selector: "app-restoration-canvas", changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="painting" [style.background-image]="'url(' + definition().image.src + ')'" [style.background-size]="backgroundSize()" [style.background-position]="position()" role="group" [attr.aria-label]="(original() ? 'Original study: ' : 'Reconstruction: ') + definition().imageAlt">
  <img [src]="definition().image.src" alt="" hidden (error)="mediaFailed.emit()">
  @for (region of definition().regions; track region.id; let i = $index) {
    <div class="paint-layer" [style.left.%]="region.x" [style.top.%]="region.y" [style.width.%]="region.width" [style.height.%]="region.height" [attr.data-region]="region.id" [attr.data-option]="option(region).id">
      @if (option(region).image; as src) { <img [src]="src" [alt]="option(region).label" (error)="mediaFailed.emit()"> }
      @if (option(region).text; as text) { <span class="inscription">{{ text }}</span> }
      @if (interactive()) { <button class="region-target" [class.guided]="guides()" [class.selected]="state().selectedRegionId === region.id" [attr.aria-label]="'Inspect ' + region.title" [attr.aria-pressed]="state().selectedRegionId === region.id" (click)="select.emit(region.id)"><span>{{ i + 1 }}</span></button> }
    </div>
  }
</div>
`, styles: ["/* src/app/shared/restoration/painting-canvas.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n}\n.painting {\n  position: relative;\n  aspect-ratio: 1;\n  background-color: #314438;\n  background-repeat: no-repeat;\n  overflow: hidden;\n  isolation: isolate;\n}\n.paint-layer {\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.paint-layer img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  pointer-events: none;\n  filter: drop-shadow(0 3px 3px rgba(26, 24, 12, 0.4));\n}\n.inscription {\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  white-space: pre-line;\n  padding: 4px 8px;\n  background: rgba(232, 213, 164, 0.9294117647);\n  border: 2px solid #755d2f;\n  box-shadow: 0 3px 8px rgba(23, 32, 22, 0.4);\n  color: #302513;\n  font: clamp(11px, 1.3vw, 18px)/1.25 Georgia, serif;\n}\n.region-target {\n  position: absolute;\n  inset: 0;\n  border: 2px solid transparent;\n  background: transparent;\n  color: #192c24;\n  cursor: pointer;\n  border-radius: 3px;\n  min-width: 30px;\n  min-height: 30px;\n}\n.region-target.guided {\n  border: 2px dashed rgba(255, 240, 186, 0.6666666667);\n}\n.region-target.selected {\n  border: 3px solid #ffe095;\n  background: rgba(255, 209, 126, 0.0705882353);\n}\n.region-target span {\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  width: 27px;\n  height: 27px;\n  border-radius: 0 0 8px 0;\n  background: #f3d392;\n  display: grid;\n  place-items: center;\n  font: 700 13px Arial;\n  box-shadow: 0 2px 8px rgba(23, 32, 22, 0.4666666667);\n}\n.region-target:focus-visible {\n  outline: 3px solid #fff;\n  outline-offset: -6px;\n}\n.region-target:hover {\n  border-color: #ffe095;\n}\n@media (max-width: 600px) {\n  .inscription {\n    font-size: 11px;\n    padding: 3px 5px;\n  }\n  .region-target {\n    min-width: 44px;\n    min-height: 44px;\n  }\n}\n/*# sourceMappingURL=painting-canvas.component.css.map */\n"] }]
  }], null, { definition: [{ type: Input, args: [{ isSignal: true, alias: "definition", required: true }] }], state: [{ type: Input, args: [{ isSignal: true, alias: "state", required: true }] }], original: [{ type: Input, args: [{ isSignal: true, alias: "original", required: false }] }], interactive: [{ type: Input, args: [{ isSignal: true, alias: "interactive", required: false }] }], guides: [{ type: Input, args: [{ isSignal: true, alias: "guides", required: false }] }], select: [{ type: Output, args: ["select"] }], mediaFailed: [{ type: Output, args: ["mediaFailed"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaintingCanvasComponent, { className: "PaintingCanvasComponent", filePath: "src/app/shared/restoration/painting-canvas.component.ts", lineNumber: 5 });
})();

// src/app/shared/restoration/restoration-export.ts
var images = /* @__PURE__ */ new Map();
function loadImage(src) {
  let promise = images.get(src);
  if (!promise) {
    promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => {
        images.delete(src);
        reject(new Error("A painting layer could not load. Retry the download when it is available."));
      };
      img.src = src;
    });
    images.set(src, promise);
  }
  return promise;
}
function wrap(ctx, text, width) {
  return text.split("\n").flatMap((paragraph) => {
    const lines = [];
    let line = "";
    for (const word of paragraph.split(/\s+/)) {
      const next = line ? line + " " + word : word;
      if (ctx.measureText(next).width > width && line) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    return [...lines, line];
  });
}
async function renderRestoration(definition, state, original = false, size = 1024) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Image export is not available in this browser.");
  const base = await loadImage(definition.image.src), { frame, grid } = definition.image;
  const sw = base.naturalWidth / grid, sh = base.naturalHeight / grid;
  ctx.drawImage(base, frame % grid * sw, Math.floor(frame / grid) * sh, sw, sh, 0, 0, size, size);
  for (const region of definition.regions) {
    const option = original ? region.options.find((o) => o.id === region.originalOptionId) : selectedRepair(region, state);
    const x = size * region.x / 100, y = size * region.y / 100, w = size * region.width / 100, h = size * region.height / 100;
    if (option.image) {
      const img = await loadImage(option.image), scale = Math.min(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
      ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
    }
    if (option.text) {
      ctx.fillStyle = "#e8d5a4";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#755d2f";
      ctx.lineWidth = size / 350;
      ctx.strokeRect(x, y, w, h);
      let font = Math.round(size / 32);
      ctx.font = `${font}px Georgia`;
      let lines = wrap(ctx, option.text, w - 24);
      while (lines.length * font * 1.25 > h - 8 && font > 10) {
        font--;
        ctx.font = `${font}px Georgia`;
        lines = wrap(ctx, option.text, w - 24);
      }
      ctx.fillStyle = "#302513";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      lines.forEach((line, i) => ctx.fillText(line, x + w / 2, y + h / 2 + (i - (lines.length - 1) / 2) * font * 1.25));
    }
  }
  return canvas;
}
async function comparisonImage(definition, state) {
  const before = await renderRestoration(definition, state, true), after = await renderRestoration(definition, state);
  const canvas = document.createElement("canvas");
  canvas.width = 2108;
  canvas.height = 1136;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#16251f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f2dfb3";
  ctx.font = "24px Georgia";
  ctx.fillText("Original forged study", 20, 36);
  ctx.fillText("Student reconstruction", 1064, 36);
  ctx.drawImage(before, 20, 52);
  ctx.drawImage(after, 1064, 52);
  ctx.font = "20px Arial";
  ctx.fillText(`${definition.title} \xB7 ${definition.location} \xB7 ${definition.date}`, 20, 1112);
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not create the comparison image.")), "image/png"));
}
function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
var escapeHtml = (value) => value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export {
  PaintingCanvasComponent,
  renderRestoration,
  comparisonImage,
  downloadFile,
  escapeHtml
};
//# debugId=4c183be5-feec-5fd6-908d-916987054d09
//# sourceMappingURL=chunk-DZQKVJPO.js.map
