import { Component, computed, input, output } from '@angular/core';
import type { CourseDefinition, ReplaySample } from '../domain/automation.models';

@Component({
  selector: 'app-robot-course',
  template: ` <svg
      [attr.viewBox]="'-28 -22 ' + (course().widthCm + 50) + ' ' + (course().heightCm + 50)"
      role="img"
      [attr.aria-label]="
        course().name +
        '. Robot at ' +
        pose().xCm.toFixed(1) +
        ', ' +
        pose().yCm.toFixed(1) +
        ' centimeters, heading ' +
        pose().headingDeg.toFixed(0) +
        ' degrees.'
      "
    >
      <defs>
        <pattern
          id="course-grid"
          [attr.width]="course().gridSizeCm"
          [attr.height]="course().gridSizeCm"
          patternUnits="userSpaceOnUse"
        >
          <path
            [attr.d]="'M ' + course().gridSizeCm + ' 0 H 0 V ' + course().gridSizeCm"
            fill="none"
            stroke="#cfdee2"
            stroke-width=".7"
          />
        </pattern>
      </defs>
      <rect
        x="0"
        y="0"
        [attr.width]="course().widthCm"
        [attr.height]="course().heightCm"
        rx="3"
        fill="#f3f8f8"
        stroke="#8faab2"
      />
      <rect
        x="0"
        y="0"
        [attr.width]="course().widthCm"
        [attr.height]="course().heightCm"
        fill="url(#course-grid)"
      />
      @for (x of xTicks(); track x) {
        <text [attr.x]="x" [attr.y]="course().heightCm + 15" text-anchor="middle">{{ x }}</text>
      }
      @for (y of yTicks(); track y) {
        <text x="-9" [attr.y]="flip(y) + 3" text-anchor="end">{{ y }}</text>
      }
      <text [attr.x]="course().widthCm" y="-10" text-anchor="end">N ↑ · cm</text>
      @for (zone of course().deliveryZones; track zone.id) {
        <rect
          [attr.x]="zone.xCm"
          [attr.y]="flip(zone.yCm + zone.heightCm)"
          [attr.width]="zone.widthCm"
          [attr.height]="zone.heightCm"
          rx="3"
          fill="#d0f1db"
          stroke="#268055"
          stroke-dasharray="3 2"
        />
        <text
          [attr.x]="zone.xCm + zone.widthCm / 2"
          [attr.y]="flip(zone.yCm + zone.heightCm) - 5"
          text-anchor="middle"
        >
          {{ zone.label }}
        </text>
      }
      @for (wall of course().obstacles; track wall.id) {
        <rect
          [attr.x]="wall.xCm"
          [attr.y]="flip(wall.yCm + wall.heightCm)"
          [attr.width]="wall.widthCm"
          [attr.height]="wall.heightCm"
          rx="3"
          fill="#344959"
          stroke="#172e3f"
        />
        <text
          [attr.x]="wall.xCm + wall.widthCm / 2"
          [attr.y]="flip(wall.yCm + wall.heightCm / 2)"
          text-anchor="middle"
          fill="white"
        >
          {{ wall.label }}
        </text>
      }
      @for (point of course().checkpoints; track point.id) {
        <circle
          [attr.cx]="point.xCm"
          [attr.cy]="flip(point.yCm)"
          [attr.r]="point.radiusCm"
          fill="#fff3cf"
          stroke="#ae7d18"
          stroke-dasharray="3 2"
        />
      }
      <circle
        [attr.cx]="course().startPose.xCm"
        [attr.cy]="flip(course().startPose.yCm)"
        r="11"
        fill="none"
        stroke="#819ba8"
        stroke-dasharray="2 3"
      />
      <circle
        [attr.cx]="target().xCm"
        [attr.cy]="flip(target().yCm)"
        r="13"
        fill="#fde6c0"
        stroke="#cc7412"
        stroke-width="2"
      />
      <path
        [attr.d]="
          'M ' +
          (target().xCm - 5) +
          ' ' +
          flip(target().yCm) +
          ' h 10 M ' +
          target().xCm +
          ' ' +
          (flip(target().yCm) - 5) +
          ' v 10'
        "
        stroke="#a46011"
      />
      <text [attr.x]="target().xCm + 17" [attr.y]="flip(target().yCm) + 3">Park</text>
      @if (showTrace()) {
        <polyline
          [attr.points]="trace()"
          fill="none"
          stroke="#099589"
          stroke-width="2.5"
          stroke-linejoin="round"
          opacity=".65"
        />
      }
      @for (pkg of course().packages; track pkg.id) {
        @if (
          !sample()?.carryingPackageIds?.includes(pkg.id) &&
          !sample()?.deliveredPackageIds?.includes(pkg.id)
        ) {
          <g [attr.transform]="'translate(' + pkg.xCm + ' ' + flip(pkg.yCm) + ')'">
            <rect x="-7" y="-7" width="14" height="14" rx="2" fill="#f7bd66" stroke="#9b5e11" />
            <text y="3" text-anchor="middle">{{ pkg.label.split(' ')[0] }}</text>
          </g>
        }
      }
      <g
        [attr.transform]="
          'translate(' + pose().xCm + ' ' + flip(pose().yCm) + ') rotate(' + pose().headingDeg + ')'
        "
      >
        <rect x="-11" y="-7" width="4" height="14" rx="1" fill="#203944" />
        <rect x="7" y="-7" width="4" height="14" rx="1" fill="#203944" />
        <rect
          x="-8"
          y="-10"
          width="16"
          height="20"
          rx="5"
          fill="#087f82"
          stroke="white"
          stroke-width="1.3"
        />
        <path d="M -4 -2 L 0 -7 L 4 -2" fill="none" stroke="white" stroke-width="1.8" />
        @if (sample()?.carryingPackageIds?.length) {
          <rect x="-4" y="2" width="8" height="7" fill="#ffc972" />
        }
      </g>
    </svg>
    <div class="legend">
      <span><i class="robot"></i>Robot</span><span><i class="target"></i>Parking target</span
      ><span><i class="trace"></i>Travelled path</span
      ><span>Each square = {{ course().gridSizeCm }} cm</span>
    </div>`,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    svg {
      width: 100%;
      max-height: 510px;
      display: block;
    }
    text {
      font: 8px system-ui;
      fill: #3c5663;
    }
    text[fill='white'] {
      fill: white;
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 11px;
      color: #536b78;
      padding: 8px;
    }
    .legend span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    i {
      display: inline-block;
      width: 9px;
      height: 9px;
      border-radius: 2px;
    }
    .robot {
      background: #087f82;
    }
    .target {
      background: #f1ac4e;
    }
    .trace {
      background: #099589;
    }
  `,
})
export class RobotCourseComponent {
  readonly course = input.required<CourseDefinition>();
  readonly targetIndex = input(0);
  readonly sample = input<ReplaySample>();
  readonly samples = input<readonly ReplaySample[]>([]);
  readonly showTrace = input(true);
  readonly pose = computed(() => this.sample() ?? this.course().startPose);
  readonly target = computed(
    () => this.course().targets[this.targetIndex()] ?? this.course().targets[0],
  );
  readonly xTicks = computed(() =>
    Array.from({ length: Math.floor(this.course().widthCm / 50) + 1 }, (_, i) => i * 50),
  );
  readonly yTicks = computed(() =>
    Array.from({ length: Math.floor(this.course().heightCm / 50) + 1 }, (_, i) => i * 50),
  );
  readonly trace = computed(() =>
    this.samples()
      .filter((point) => point.timeMs <= (this.sample()?.timeMs ?? Infinity))
      .map((p) => `${p.xCm},${this.flip(p.yCm)}`)
      .join(' '),
  );
  flip(y: number): number {
    return this.course().heightCm - y;
  }
}
