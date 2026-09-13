import { Component, computed, input } from '@angular/core';
import type { BlockDesign } from '../../../shared/engineering/block-design';
import type { DesignEditor } from '../../../shared/engineering/design-editor';
@Component({
  selector: 'app-block-plan',
  template: `<figure>
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
        ↑ N
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
      North ↑ · grid = 20 cm · stacked stones share a footprint
      @if (editor()) {
        <br />Drag stones or the round rotation handle. Arrow keys move 1 cm; Shift = 5 cm.
      }
    </figcaption>
  </figure>`,
  styles: [
    `
      figure {
        margin: 18px 0;
        padding: 18px;
        background: #eaf0df;
        border: 1px solid #ccd7c1;
        border-radius: 12px;
      }
      svg {
        display: block;
        width: 100%;
        height: 300px;
        touch-action: none;
      }
      [role='button'] {
        cursor: grab;
      }
      [role='button']:focus {
        outline: none;
        stroke: #c17c14;
        stroke-width: 3;
      }
      figcaption {
        font: 12px system-ui;
        color: #405d50;
        margin-top: 10px;
      }
    `,
  ],
})
export class BlockPlanComponent {
  readonly design = input.required<BlockDesign>();
  readonly editor = input<DesignEditor>();
  readonly shown = computed(() => this.editor()?.draft() ?? this.design());
  readonly handle = computed(() => {
    const blocks = this.shown().blocks.filter((b) => this.editor()?.selection().includes(b.id));
    if (!blocks.length) return undefined;
    const x = (blocks.reduce((s, b) => s + b.x, 0) / blocks.length) * 100,
      z = (blocks.reduce((s, b) => s + b.z, 0) / blocks.length) * 100;
    return {
      x,
      z,
      radius: Math.max(
        22,
        ...blocks.map(
          (b) => Math.hypot(b.x * 100 - x, b.z * 100 - z) + Math.hypot(b.width, b.depth) * 50 + 12,
        ),
      ),
    };
  });
  private drag?: {
    x: number;
    z: number;
    rotate: boolean;
    angle: number;
    center: { x: number; z: number };
    pointer: number;
    moved: boolean;
  };
  private point(event: PointerEvent): { x: number; z: number } {
    const svg = (event.currentTarget as Element).closest('svg') as SVGSVGElement;
    const p = svg.createSVGPoint();
    p.x = event.clientX;
    p.y = event.clientY;
    const local = p.matrixTransform(svg.getScreenCTM()!.inverse());
    return { x: local.x, z: local.y };
  }
  start(event: PointerEvent, id: string, rotate = false): void {
    const edit = this.editor();
    if (!edit || !edit.editable() || event.button !== 0) return;
    event.preventDefault();
    if (id && (!edit.selection().includes(id) || event.shiftKey)) edit.select(id, event.shiftKey);
    const p = this.point(event),
      center = this.handle() ?? { x: 0, z: 0 };
    edit.begin();
    this.drag = {
      ...p,
      rotate,
      center,
      angle: Math.atan2(p.z - center.z, p.x - center.x),
      pointer: event.pointerId,
      moved: false,
    };
    (event.currentTarget as Element).closest('svg')!.setPointerCapture(event.pointerId);
  }
  move(event: PointerEvent): void {
    const d = this.drag;
    if (!d) return;
    const p = this.point(event);
    d.moved ||= Math.hypot(p.x - d.x, p.z - d.z) > 0.3;
    this.editor()?.preview(
      d.rotate
        ? { turn: (-(Math.atan2(p.z - d.center.z, p.x - d.center.x) - d.angle) * 180) / Math.PI }
        : { dx: (p.x - d.x) / 100, dz: (p.z - d.z) / 100 },
      !event.altKey,
    );
  }
  finish(event: PointerEvent): void {
    if (!this.drag || event.pointerId !== this.drag.pointer) return;
    if (this.drag.moved) this.editor()?.commitDraft();
    else this.editor()?.cancel();
    this.drag = undefined;
  }
  cancel(): void {
    this.drag = undefined;
    this.editor()?.cancel();
  }
  key(event: KeyboardEvent, id: string): void {
    const edit = this.editor();
    if (!edit) return;
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      edit.select(id, event.shiftKey);
    }
    if (event.key === 'Escape') this.cancel();
    if (event.key.startsWith('Arrow')) {
      event.preventDefault();
      if (!edit.selection().includes(id)) edit.select(id);
      const d = event.shiftKey ? 0.05 : 0.01;
      edit.transform({
        dx: event.key === 'ArrowRight' ? d : event.key === 'ArrowLeft' ? -d : 0,
        dz: event.key === 'ArrowDown' ? d : event.key === 'ArrowUp' ? -d : 0,
      });
    }
  }
  rotateKey(event: KeyboardEvent): void {
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      this.editor()?.transform({
        turn: (event.key === 'ArrowLeft' ? 1 : -1) * (event.shiftKey ? 1 : 15),
      });
    }
  }
  readonly gridId = `plan-${crypto.randomUUID()}`;
  readonly bounds = computed(() => {
    const xs = [
      0,
      ...(this.design().displayObject
        ? [
            this.design().displayObject!.x - this.design().displayObject!.width,
            this.design().displayObject!.x + this.design().displayObject!.width,
          ]
        : []),
      ...this.design().blocks.flatMap((b) => [
        b.x - Math.hypot(b.width, b.depth) / 2,
        b.x + Math.hypot(b.width, b.depth) / 2,
      ]),
      ...this.design().targets.map((t) => t.x),
    ];
    const zs = [
      0,
      ...(this.design().displayObject
        ? [
            this.design().displayObject!.z - this.design().displayObject!.width,
            this.design().displayObject!.z + this.design().displayObject!.width,
          ]
        : []),
      ...this.design().blocks.flatMap((b) => [
        b.z - Math.hypot(b.width, b.depth) / 2,
        b.z + Math.hypot(b.width, b.depth) / 2,
      ]),
      ...this.design().targets.map((t) => t.z),
    ];
    return {
      x: Math.min(...xs) * 100 - 35,
      z: Math.min(...zs) * 100 - 30,
      width: (Math.max(...xs) - Math.min(...xs)) * 100 + 170,
      height: Math.max(130, (Math.max(...zs) - Math.min(...zs)) * 100 + 60),
    };
  });
  readonly viewBox = computed(() => {
    const b = this.bounds();
    return `${b.x} ${b.z} ${b.width} ${b.height}`;
  });
}
