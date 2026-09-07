import { Component, computed, input } from '@angular/core';
import type { BlockDesign } from '../../../shared/engineering/block-design';
@Component({
  selector: 'app-block-plan',
  template: `<figure>
    <svg
      [attr.viewBox]="viewBox()"
      role="img"
      aria-label="Measured footprint from above. North is up, east is right. Rings are target centres."
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
      @for (block of design().blocks; track block.id) {
        <rect
          [attr.x]="(block.x - block.width / 2) * 100"
          [attr.y]="(block.z - block.depth / 2) * 100"
          [attr.width]="block.width * 100"
          [attr.height]="block.depth * 100"
          [attr.transform]="
            'rotate(' + -block.rotation + ' ' + block.x * 100 + ' ' + block.z * 100 + ')'
          "
          fill="#d4bc8d"
          stroke="#6a593b"
          stroke-width="1"
        />
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
    </svg>
    <figcaption>
      Footprint from above · one grid square = 20 cm · stacked blocks share a footprint
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
  readonly gridId = `plan-${crypto.randomUUID()}`;
  readonly bounds = computed(() => {
    const xs = [
      0,
      ...this.design().blocks.flatMap((b) => [
        b.x - Math.hypot(b.width, b.depth) / 2,
        b.x + Math.hypot(b.width, b.depth) / 2,
      ]),
      ...this.design().targets.map((t) => t.x),
    ];
    const zs = [
      0,
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
