import { afterNextRender, Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import type { CourseDefinition, ReplaySample, RunResult } from '../domain/automation.models';
import { PhaserRobotCourseComponent } from './robot-course-engine/phaser-robot-course.component';
import type { RobotCourseView } from './robot-course-engine/robot-course-view';
import { sampleCourseActor } from '../core/course-actors';

let nextArenaId = 0;
@Component({
  selector: 'app-robot-course',
  imports: [PhaserRobotCourseComponent],
  templateUrl: './robot-course.component.html',
  styleUrl: './robot-course.component.css',
})
export class RobotCourseComponent {
  readonly renderer = signal<'game' | 'map'>('game');
  readonly rendererStatus = signal<'loading' | 'ready' | 'failed'>('loading');
  readonly follow = signal(false);
  readonly zoom = signal(1);
  readonly fullOverview = signal(false);
  readonly result = input<RobotCourseView['result']>();
  readonly reducedMotion = signal(false);
  readonly events = input<RunResult['events']>([]);
  readonly gameView = computed<RobotCourseView>(() => ({
    course: this.course(), robotRadiusCm: this.robotRadiusCm(), targetIndex: this.targetIndex(), sample: this.sample(),
    samples: this.samples(), events: this.events(), showTrace: this.showTrace(),
    follow: this.follow(), zoom: this.zoom(), reducedMotion: this.reducedMotion(),
    overview: this.fullOverview(), result: this.result(),
  }));
  readonly description = computed(() => {
    const pose = this.pose();
    return `${this.course().name}. Robot at ${pose.xCm.toFixed(1)}, ${pose.yCm.toFixed(1)} centimeters, heading ${pose.headingDeg.toFixed(0)} degrees. ${this.sample()?.deliveredPackageIds.length ?? 0} of ${this.course().packages.length} packages delivered. ${this.actorStates().map(({ actor, pose }) => `${actor.label} at (${pose.xCm.toFixed(1)}, ${pose.yCm.toFixed(1)}) cm.`).join(' ')}`;
  });
  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (typeof window.matchMedia !== 'function') return;
      const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      const update = () => this.reducedMotion.set(preference.matches);
      update();
      preference.addEventListener('change', update);
      destroy.onDestroy(() => preference.removeEventListener('change', update));
    });
  }
  setRendererStatus(status: 'loading' | 'ready' | 'failed'): void {
    this.rendererStatus.set(status);
    if (status === 'failed') this.renderer.set('map');
  }
  overview(): void {
    this.follow.set(false);
    this.zoom.set(1);
    this.fullOverview.set(true);
  }
  objectiveView(): void {
    this.follow.set(false);
    this.zoom.set(1);
    this.fullOverview.set(false);
  }
  followRobot(): void {
    this.follow.set(!this.follow());
    if (this.follow()) this.zoom.set(Math.max(1.8, this.zoom()));
  }
  changeZoom(amount: number): void {
    this.zoom.update((zoom) => Math.max(1, Math.min(3, zoom + amount)));
  }
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
  readonly robotRadiusCm = input(8);
  readonly targetIndex = input(0);
  readonly sample = input<ReplaySample>();
  readonly samples = input<readonly ReplaySample[]>([]);
  readonly showTrace = input(true);
  readonly pose = computed(() => this.sample() ?? this.course().startPose);
  readonly actorStates = computed(() => (this.course().actors ?? []).map(actor => ({
    actor, pose: sampleCourseActor(actor, this.sample()?.timeMs ?? 0),
    route: [...actor.path, ...(actor.patrol === 'loop' ? [actor.path[0]] : [])].map(point => `${point.xCm},${this.flip(point.yCm)}`).join(' '),
  })));
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
