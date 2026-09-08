import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  untracked,
} from '@angular/core';
import { CrisisRuntimeService } from '../runtime/crisis-runtime.service';
import { nextCompanionStop } from '../domain/crisis-companion';
import type { CrisisRoamPoint, CrisisView } from '../domain/crisis.models';

@Component({
  selector: 'app-crisis-robot',
  templateUrl: './crisis-robot.component.html',
  styleUrl: './crisis-robot.component.scss',
})
export class CrisisRobotComponent implements AfterViewInit, OnDestroy {
  readonly runtime = inject(CrisisRuntimeService);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly view = input<CrisisView>('room');
  readonly roaming = input(true);
  readonly open = output<void>();
  readonly ready = signal(false);
  readonly moving = signal(false);
  readonly hovered = signal(false);
  readonly focused = signal(false);
  readonly facing = signal(1);
  readonly duration = signal(1150);
  readonly reduced = signal(false);
  readonly compact = signal(false);
  readonly narrow = signal(false);
  readonly pose = signal<CrisisRoamPoint>(
    this.runtime.config.companion?.roamPoints[0] ?? { x: 78, y: 75, scale: 1 },
  );
  readonly companion = this.runtime.config.companion;
  readonly attention = computed(() =>
    this.runtime.unread() > 0
      ? `${this.runtime.unread()} ${this.runtime.unread() === 1 ? 'signal' : 'signals'} to review`
      : 'Ready when you are',
  );
  readonly activity = computed(() =>
    this.view() === 'argus'
      ? 'With you'
      : this.hovered() || this.focused()
        ? 'You have my attention'
        : this.moving()
          ? 'On my rounds'
          : this.attention(),
  );
  private stop = 0;
  private timer?: ReturnType<typeof setTimeout>;
  private readonly motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  private readonly sizeQuery = window.matchMedia('(max-width: 700px)');
  private readonly narrowQuery = window.matchMedia('(max-width: 1050px)');
  private readonly preferences = () => {
    this.reduced.set(this.motionQuery.matches);
    this.compact.set(this.sizeQuery.matches);
    this.narrow.set(this.narrowQuery.matches);
  };
  private readonly visibility = () => this.sync();
  constructor() {
    this.preferences();
    this.motionQuery.addEventListener?.('change', this.preferences);
    this.sizeQuery.addEventListener?.('change', this.preferences);
    this.narrowQuery.addEventListener?.('change', this.preferences);
    document.addEventListener('visibilitychange', this.visibility);
    effect(() => {
      this.view();
      this.roaming();
      this.reduced();
      this.compact();
      this.narrow();
      if (this.ready()) untracked(() => this.sync());
    });
  }
  ngAfterViewInit(): void {
    this.ready.set(true);
  }
  private points(): readonly CrisisRoamPoint[] {
    return this.compact()
      ? [
          { x: 54, y: 72, scale: 0.9 },
          { x: 53, y: 78, scale: 1 },
          { x: 48, y: 80, scale: 1.03 },
          { x: 45, y: 76, scale: 0.95 },
        ]
      : this.narrow()
        ? [
            { x: 70, y: 79, scale: 0.9 },
            { x: 65, y: 83, scale: 1 },
            { x: 53, y: 85, scale: 1.1 },
            { x: 42, y: 85, scale: 1.1 },
            { x: 34, y: 81, scale: 1 },
          ]
        : (this.companion?.roamPoints ?? []);
  }
  private freeze(): void {
    clearTimeout(this.timer);
    if (this.moving()) {
      const node = this.element.nativeElement.querySelector<HTMLElement>('.robot-travel');
      if (node && node.offsetParent instanceof HTMLElement) {
        const style = getComputedStyle(node),
          parent = node.offsetParent;
        if (parent.clientWidth && parent.clientHeight)
          this.pose.set({
            ...this.pose(),
            x: (parseFloat(style.left) / parent.clientWidth) * 100,
            y: (parseFloat(style.top) / parent.clientHeight) * 100,
          });
      }
    }
    this.moving.set(false);
    this.duration.set(0);
  }
  private sync(): void {
    if (!this.ready() || !this.companion) return;
    this.freeze();
    if (this.view() === 'argus') {
      this.duration.set(this.reduced() ? 0 : 1150);
      this.facing.set(1);
      this.pose.set(
        this.compact()
          ? { x: 50, y: 32, scale: 0.85 }
          : this.narrow()
            ? { x: 33, y: 80, scale: 1.55 }
            : { x: 27, y: 80, scale: 2.1 },
      );
      return;
    }
    if (this.view() !== 'room') return;
    const points = this.points();
    this.stop = Math.min(this.stop, points.length - 1);
    this.duration.set(this.reduced() ? 0 : 1150);
    this.pose.set(points[Math.max(0, this.stop)]);
    if (this.canMove()) this.schedule(2200);
  }
  private canMove(): boolean {
    return (
      this.view() === 'room' &&
      this.roaming() &&
      !this.reduced() &&
      !document.hidden &&
      !this.hovered() &&
      !this.focused()
    );
  }
  private schedule(delay: number): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.step(), delay);
  }
  private step(): void {
    if (!this.canMove()) return;
    const points = this.points();
    this.stop = nextCompanionStop(this.stop, points.length, Math.random());
    const next = points[this.stop],
      duration = 3200 + Math.random() * 2000;
    this.facing.set(next.x < this.pose().x ? 1 : -1);
    this.duration.set(duration);
    this.moving.set(true);
    this.pose.set(next);
    this.timer = setTimeout(() => {
      this.moving.set(false);
      if (this.canMove()) this.schedule(3500 + Math.random() * 5500);
    }, duration);
  }
  engage(kind: 'hover' | 'focus', value: boolean): void {
    (kind === 'hover' ? this.hovered : this.focused).set(value);
    if (value) this.freeze();
    else if (this.canMove()) this.schedule(1200);
  }
  ngOnDestroy(): void {
    clearTimeout(this.timer);
    document.removeEventListener('visibilitychange', this.visibility);
    this.motionQuery.removeEventListener?.('change', this.preferences);
    this.sizeQuery.removeEventListener?.('change', this.preferences);
    this.narrowQuery.removeEventListener?.('change', this.preferences);
  }
}
