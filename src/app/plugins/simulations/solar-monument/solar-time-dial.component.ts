import { Component, computed, input, output, signal } from '@angular/core';

let dialCount = 0;
// A wide illustration in SVG units: the Sun travels a long half-ellipse above a gently curved Earth.
const viewWidth = 960,
  viewHeight = 160,
  centerX = 480,
  horizonY = 128,
  arcX = 420,
  arcY = 108,
  earthRadius = 3000;
const landBases = Array.from({ length: 12 }, (_, i) => -0.36 + i * 0.06);
const round = (value: number) => Math.round(value * 100) / 100;

/**
 * Drag the Sun across the sky above a turning Earth to choose a time between sunrise and sunset.
 * A picture of the day, not a measured sky: time maps evenly along the arc.
 */
@Component({
  selector: 'app-solar-time-dial',
  template: `<svg
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
  </svg>`,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
      touch-action: none;
      cursor: grab;
      border-radius: 14px;
      user-select: none;
    }
    svg.dragging {
      cursor: grabbing;
    }
    svg[aria-disabled='true'] {
      cursor: default;
      opacity: 0.6;
    }
    svg:focus-visible {
      outline: 3px solid #ba761f;
      outline-offset: 2px;
    }
    .rays {
      transform-box: fill-box;
      transform-origin: center;
      animation: sun-spin 14s linear infinite;
    }
    .labels text {
      font:
        700 13px system-ui,
        sans-serif;
      fill: #22303b;
    }
    .clock text {
      font:
        700 13px system-ui,
        sans-serif;
      fill: #fff;
    }
    @keyframes sun-spin {
      to {
        transform: rotate(360deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .rays {
        animation: none;
      }
    }
  `,
})
export class SolarTimeDialComponent {
  readonly start = input(0);
  readonly end = input(1440);
  readonly minutes = input(720);
  readonly disabled = input(false);
  readonly clock = input('');
  readonly startLabel = input('Sunrise');
  readonly endLabel = input('Sunset');
  readonly changed = output<number>();

  readonly ids = (() => {
    const n = ++dialCount;
    return {
      dawn: `dial-dawn-${n}`,
      day: `dial-day-${n}`,
      glow: `dial-glow-${n}`,
      earth: `dial-earth-${n}`,
    };
  })();
  readonly rays = [0, 45, 90, 135, 180, 225, 270, 315];
  readonly dragging = signal(false);
  /** The dragged time shows immediately while the lab catches up. */
  private readonly preview = signal<number | undefined>(undefined);
  private pending?: number;
  private frame = 0;

  readonly value = computed(() => this.preview() ?? this.minutes());
  readonly fraction = computed(() => {
    const span = this.end() - this.start();
    return span > 0 ? Math.min(1, Math.max(0, (this.value() - this.start()) / span)) : 0.5;
  });
  readonly sun = computed(() => {
    const angle = Math.PI * (1 - this.fraction());
    return {
      x: round(centerX + arcX * Math.cos(angle)),
      y: round(horizonY - arcY * Math.sin(angle)),
    };
  });
  readonly skyDay = computed(() => Math.min(1, Math.sin(Math.PI * this.fraction()) * 1.6));
  /** Earth's land drifts toward the east as the day passes; the Sun appears to cross the sky. */
  readonly land = computed(() => {
    const shift = -this.fraction() * 0.24,
      r = earthRadius - 12;
    return landBases.map((base, id) => {
      const a = ((((base + shift + 0.36) % 0.72) + 0.72) % 0.72) - 0.36;
      return {
        id,
        x: round(centerX + r * Math.sin(a)),
        y: round(horizonY + earthRadius - r * Math.cos(a)),
        rotate: round((a * 180) / Math.PI),
        rx: id % 2 ? 30 : 46,
        ry: id % 3 ? 7 : 9,
      };
    });
  });
  /** The figure's shadow points away from the Sun and shrinks as the Sun climbs. */
  readonly shadowEnd = computed(() => {
    const f = this.fraction(),
      elevation = Math.PI * Math.min(f, 1 - f),
      side = f < 0.5 ? 1 : -1;
    if (elevation < 0.02) return round(centerX + side * 160);
    return round(centerX + side * Math.min(160, 18 / Math.tan(elevation)));
  });

  down(event: PointerEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    try {
      (event.currentTarget as Element).setPointerCapture?.(event.pointerId);
    } catch {
      // Pointer capture is optional; dragging still follows pointer moves over the dial.
    }
    this.dragging.set(true);
    this.emit(this.pointerMinutes(event), true);
  }
  move(event: PointerEvent): void {
    if (this.dragging() && !this.disabled()) this.emit(this.pointerMinutes(event), false);
  }
  up(event: PointerEvent): void {
    if (!this.dragging()) return;
    this.dragging.set(false);
    try {
      (event.currentTarget as Element).releasePointerCapture?.(event.pointerId);
    } catch {
      // Already released.
    }
    this.flush();
    this.preview.set(undefined);
  }
  key(event: KeyboardEvent): void {
    if (this.disabled()) return;
    const steps: Record<string, number> = {
      ArrowLeft: -5,
      ArrowDown: -5,
      ArrowRight: 5,
      ArrowUp: 5,
      PageDown: -60,
      PageUp: 60,
    };
    let next: number | undefined;
    if (event.key in steps) next = this.minutes() + steps[event.key];
    if (event.key === 'Home') next = this.start();
    if (event.key === 'End') next = this.end();
    if (next === undefined) return;
    event.preventDefault();
    this.emit(next, true);
    this.preview.set(undefined);
  }

  private pointerMinutes(event: PointerEvent): number {
    const rect = (event.currentTarget as Element).getBoundingClientRect();
    if (!rect.width || !rect.height) return this.value();
    const x = ((event.clientX - rect.left) / rect.width) * viewWidth;
    const y = ((event.clientY - rect.top) / rect.height) * viewHeight;
    const angle = Math.atan2((horizonY - y) / arcY, (x - centerX) / arcX);
    const onArc = angle < 0 ? (x < centerX ? Math.PI : 0) : angle;
    return this.start() + (1 - onArc / Math.PI) * (this.end() - this.start());
  }
  private emit(minutes: number, immediate: boolean): void {
    const value = Math.min(this.end(), Math.max(this.start(), minutes));
    this.preview.set(value);
    this.pending = value;
    if (immediate || typeof requestAnimationFrame !== 'function') {
      this.flush();
      return;
    }
    if (!this.frame) this.frame = requestAnimationFrame(() => this.flush());
  }
  private flush(): void {
    if (this.frame && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(this.frame);
    this.frame = 0;
    const value = this.pending;
    this.pending = undefined;
    if (value !== undefined && Math.abs(value - this.minutes()) > 1e-6) this.changed.emit(value);
  }
}
