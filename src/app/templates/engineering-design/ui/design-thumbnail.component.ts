import { Component, computed, input } from '@angular/core';
import type { BlockDesign, DesignBlock } from '../../../shared/engineering/block-design';

type Point = readonly [number, number, number];
interface Face {
  points: readonly Point[];
  fill: string;
  hole?: readonly Point[];
  holeFill?: string;
  depth: number;
}
const tint: Record<string, string> = {
  clear: '#bde7e6',
  red: '#d74d53',
  amber: '#eaba38',
  green: '#32a57a',
  blue: '#497de1',
  violet: '#a373d5',
};
const project = (p: Point) => [(p[0] - p[2]) * 0.866, (p[0] + p[2]) * 0.43 - p[1]];
const path = (points: readonly Point[]) =>
  points.map((p, i) => `${i ? 'L' : 'M'}${project(p).join(',')}`).join(' ') + 'Z';
const depth = (points: readonly Point[]) =>
  points.reduce((sum, p) => sum + p[0] + p[1] + p[2], 0) / points.length;
let nextTexture = 0;

@Component({
  selector: 'app-design-thumbnail',
  template: `<svg [attr.viewBox]="drawing().viewBox" aria-hidden="true" focusable="false">
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
  </svg>`,
  styles: [
    `
      :host {
        display: block;
        height: 94px;
      }
      svg {
        display: block;
        width: 100%;
        height: 100%;
        overflow: visible;
      }
    `,
  ],
})
export class DesignThumbnailComponent {
  readonly textureId = `stone-thumbnail-${nextTexture++}`;
  readonly glassTints = Object.entries(tint).map(([name, color]) => ({ name, color }));
  readonly design = input.required<BlockDesign>();
  readonly shape = path;
  readonly drawing = computed(() => {
    const faces: Face[] = [];
    for (const b of this.design().blocks) this.blockFaces(b, faces);
    const o = this.design().displayObject;
    if (o) {
      const transform = (p: Point): Point =>
        this.world([(p[0] * o.width) / 2, (p[1] * o.height) / 2, (p[2] * o.width) / 2], o);
      if (o.model === 'crystal') {
        for (const x of [-1, 1])
          for (const y of [-1, 1])
            for (const z of [-1, 1]) {
              const points = (
                [
                  [x, 0, 0],
                  [0, y, 0],
                  [0, 0, z],
                ] as Point[]
              ).map(transform);
              faces.push({
                points,
                fill: y > 0 ? (x > 0 ? '#9dcbc9' : '#d8ece8') : '#678c97',
                depth: depth(points),
              });
            }
      } else if (o.model === 'sphere') {
        const sphere = (lat: number, lon: number): Point => [
          Math.cos(lat) * Math.sin(lon),
          Math.sin(lat),
          Math.cos(lat) * Math.cos(lon),
        ];
        for (let i = 0; i < 8; i++)
          for (let j = 0; j < 16; j++) {
            const a = (i * Math.PI) / 8 - Math.PI / 2,
              b = ((i + 1) * Math.PI) / 8 - Math.PI / 2,
              l = (j * Math.PI) / 8;
            const points = [
              sphere(a, l),
              sphere(a, l + Math.PI / 8),
              sphere(b, l + Math.PI / 8),
              sphere(b, l),
            ].map(transform);
            faces.push({ points, fill: `hsl(162 17% ${56 + i * 4}%)`, depth: depth(points) });
          }
      } else this.blockFaces({ ...o, id: 'object-thumbnail', depth: o.width }, faces, 0.45);
    }
    faces.sort((a, b) => a.depth - b.depth);
    const pts = faces.flatMap((f) => f.points.map(project));
    const xs = pts.map((p) => p[0]),
      ys = pts.map((p) => p[1]);
    const minX = Math.min(0, ...xs),
      minY = Math.min(0, ...ys);
    const width = Math.max(0.2, Math.max(0, ...xs) - minX),
      height = Math.max(0.2, Math.max(0, ...ys) - minY);
    return { faces, viewBox: `${minX - 0.15} ${minY - 0.15} ${width + 0.3} ${height + 0.3}` };
  });
  private world(
    p: Point,
    b: { x: number; y: number; z: number; height: number; rotation: number },
  ): Point {
    const r = (b.rotation * Math.PI) / 180;
    return [
      b.x + p[0] * Math.cos(r) + p[2] * Math.sin(r),
      b.y + b.height / 2 + p[1],
      b.z - p[0] * Math.sin(r) + p[2] * Math.cos(r),
    ];
  }
  private blockFaces(b: DesignBlock, out: Face[], taper = 1): void {
    const h = [b.width / 2, b.height / 2, b.depth / 2];
    for (let axis = 0; axis < 3; axis++)
      for (const sign of [-1, 1]) {
        const r = (b.rotation * Math.PI) / 180;
        const facing =
          sign *
          (axis === 0 ? Math.cos(r) - Math.sin(r) : axis === 1 ? 1 : Math.sin(r) + Math.cos(r));
        if (facing < 1e-8) continue;
        const other = [0, 1, 2].filter((i) => i !== axis);
        const points = [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
        ].map(([u, v]) => {
          const p = [0, 0, 0];
          p[axis] = h[axis] * sign;
          p[other[0]] = h[other[0]] * u;
          p[other[1]] = h[other[1]] * v;
          if (p[1] > 0) {
            p[0] *= taper;
            p[2] *= taper;
          }
          return this.world(p as unknown as Point, b);
        });
        const face: Face = {
          points,
          depth: depth(points),
          fill: axis === 1 ? '#e9dfc8' : axis === 0 ? '#a99b82' : '#c9bda2',
        };
        if (b.aperture && ['x', 'y', 'z'][axis] === b.aperture.axis) {
          face.hole = Array.from({ length: 40 }, (_, i) => {
            const p = [0, 0, 0];
            p[axis] = h[axis] * sign;
            p[other[0]] = (b.aperture!.diameter / 2) * Math.cos((i * Math.PI) / 20);
            p[other[1]] = (b.aperture!.diameter / 2) * Math.sin((i * Math.PI) / 20);
            return this.world(p as unknown as Point, b);
          });
          face.holeFill = b.aperture.insert === 'open' ? '#38443e' : `url(#${this.textureId}-${b.aperture.color})`;
        }
        out.push(face);
      }
  }
}
