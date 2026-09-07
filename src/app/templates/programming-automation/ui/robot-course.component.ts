import { Component, computed, input } from '@angular/core';
import type { CourseDefinition, ReplaySample } from '../domain/automation.models';

let nextArenaId = 0;
@Component({
  selector: 'app-robot-course',
  templateUrl: './robot-course.component.html',
  styleUrl: './robot-course.component.css',
})
export class RobotCourseComponent {
  readonly artId = `delivery-arena-${nextArenaId++}`;
  readonly targetDistance = computed(() =>
    Math.hypot(this.pose().xCm - this.target().xCm, this.pose().yCm - this.target().yCm).toFixed(1),
  );
  paint(name: string): string {
    return `url(#${this.artId}-${name})`;
  }
  zoneDelivered(id: string): boolean {
    const packages = this.course().packages.filter((item) => item.deliveryZoneId === id);
    return (
      packages.length > 0 &&
      packages.every((item) => this.sample()?.deliveredPackageIds.includes(item.id))
    );
  }
  rackCrates(width: number, height: number): readonly { x: number; y: number }[] {
    const columns = Math.max(0, Math.floor((width - 8) / 18)),
      rows = Math.max(0, Math.floor((height - 22) / 20));
    return Array.from({ length: columns * rows }, (_, i) => ({
      x: 5 + (i % columns) * 18,
      y: 5 + Math.floor(i / columns) * 20,
    }));
  }
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
