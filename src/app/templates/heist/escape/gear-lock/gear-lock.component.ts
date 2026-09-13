import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  InjectionToken,
  ViewChild,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  emptyGears,
  evaluateGearLock,
  fractionLabel,
  gearFeedback,
  gearMotion,
  moveGear,
  type GearLockDefinition,
  type ReleaseModule,
} from './gear-lock.domain';
import type { GearSceneHandle, MountGearScene } from './gear-lock.scene';

export const GEAR_SCENE_LOADER = new InjectionToken<
  () => Promise<{ mountGearScene: MountGearScene }>
>('GEAR_SCENE_LOADER', {
  providedIn: 'root',
  factory: () => () => import('./gear-lock.scene'),
});
@Component({
  selector: 'app-gear-lock',
  templateUrl: './gear-lock.component.html',
  styleUrl: './gear-lock.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GearLockComponent implements AfterViewInit {
  readonly definition = input.required<GearLockDefinition>();
  readonly answer = input<readonly number[]>([]);
  readonly completed = input(false);
  readonly paused = input(false);
  readonly reducedMotion = input(false);
  readonly saveWarning = input('');
  readonly changed = output<readonly number[]>();
  readonly solved = output<void>();
  readonly leave = output<void>();
  readonly pauseRequested = output<void>();
  readonly sound = output<'turn' | 'open' | 'wrong'>();
  readonly selected = signal<number | null>(null);
  readonly running = signal(false);
  readonly runId = signal(0);
  readonly passed = signal(false);
  readonly ready = signal(false);
  readonly error = signal(false);
  readonly controls = signal(false);
  readonly help = signal(false);
  readonly notice = signal('Drag a cog onto A or B. The sliding axles adjust to its size.');
  readonly module = signal<ReleaseModule>('drive');
  readonly positions = computed(() => (this.answer().length ? this.answer() : emptyGears()));
  readonly locked = computed(() => this.running() || this.completed() || this.paused());
  readonly motion = computed(() =>
    gearMotion(this.definition(), this.positions(), this.positions()[2]),
  );
  readonly fraction = fractionLabel;
  readonly captions: Readonly<Record<ReleaseModule, string>> = {
    drive: 'The repaired train winds the belt. The release drum reaches its mark.',
    ball: 'The drum opens the ball catch. Gravity carries the ball down the brass rail.',
    hammer: 'The ball tips the hammer. The hammer knocks the retaining peg clear.',
    weight: 'The freed counterweight descends, pulling the release cord taut.',
    domino: 'The cord tips the first domino. One impact passes to the next.',
    gate: 'The last domino trips the gate catch. The pen rises. The way is clear!',
  };
  private readonly loader = inject(GEAR_SCENE_LOADER);
  private scene?: GearSceneHandle;
  private destroyed = false;
  @ViewChild('stage', { static: true }) private stage!: ElementRef<HTMLElement>;
  @ViewChild('heading', { static: true }) private heading!: ElementRef<HTMLElement>;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.scene?.destroy();
    });
  }
  async ngAfterViewInit(): Promise<void> {
    this.controls.set(
      this.stage.nativeElement.clientWidth > 0 && this.stage.nativeElement.clientWidth < 700,
    );
    this.heading.nativeElement.focus({ preventScroll: true });
    try {
      const { mountGearScene } = await this.loader();
      if (this.destroyed) return;
      this.scene = mountGearScene(
        this.stage.nativeElement,
        this.definition(),
        () => ({
          answer: this.positions(),
          selected: this.selected(),
          running: this.running(),
          runId: this.runId(),
          passed: this.passed(),
          completed: this.completed(),
          paused: this.paused(),
          reducedMotion: this.reducedMotion(),
        }),
        {
          select: (index) => this.select(index),
          place: (index, socket) => this.place(index, socket),
          ready: () => this.ready.set(true),
          failed: () => {
            this.error.set(true);
            this.controls.set(true);
          },
          beat: (module) => {
            this.module.set(module);
            this.sound.emit(module === 'hammer' ? 'turn' : 'open');
          },
          finished: () => this.finish(),
        },
      );
    } catch {
      this.error.set(true);
      this.controls.set(true);
    }
  }
  select(index: number): void {
    if (this.locked() || !this.definition().gears[index]) return;
    this.selected.set(index);
    this.notice.set(
      `${this.definition().gears[index].teeth}-tooth cog selected. Choose axle A, axle B, or the tray.`,
    );
  }
  place(index: number, socket: -1 | 0 | 1): void {
    if (this.locked()) return;
    this.changed.emit(moveGear(this.definition(), this.positions(), index, socket));
    this.selected.set(null);
    this.sound.emit('turn');
    this.notice.set(
      socket === -1
        ? 'Cog returned to the tray.'
        : `Cog fitted to axle ${socket === 0 ? 'A' : 'B'}. Check its tooth-count clue.`,
    );
  }
  placeSelected(socket: -1 | 0 | 1): void {
    const i = this.selected();
    if (i !== null) this.place(i, socket);
  }
  crank(delta: number): void {
    if (this.locked()) return;
    const a = [...this.positions()];
    a[2] = Math.max(1, Math.min(this.definition().maxCrank, a[2] + delta));
    this.changed.emit(a);
  }
  reset(): void {
    if (this.locked()) return;
    this.changed.emit(emptyGears());
    this.selected.set(null);
    this.notice.set(
      'Cogs returned. Follow both calibration clues, then calculate the crank turns.',
    );
  }
  test(): void {
    if (this.locked()) return;
    if (this.positions()[0] < 0 || this.positions()[1] < 0) {
      this.notice.set(gearFeedback(this.definition(), this.positions()));
      return;
    }
    this.passed.set(evaluateGearLock(this.definition(), this.positions()));
    this.selected.set(null);
    this.module.set('drive');
    this.running.set(true);
    this.runId.update((n) => n + 1);
    this.notice.set('Testing the drive train. Watch the rotation markers.');
    this.sound.emit('turn');
    if (this.error()) this.finish();
  }
  finish(): void {
    if (!this.running() || this.paused()) return;
    this.running.set(false);
    this.notice.set(gearFeedback(this.definition(), this.positions()));
    if (this.passed()) {
      if (!this.completed()) this.solved.emit();
      this.sound.emit('open');
    } else this.sound.emit('wrong');
  }
  replay(): void {
    if (!this.completed() || this.paused() || this.running()) return;
    this.passed.set(true);
    this.module.set('drive');
    this.running.set(true);
    this.runId.update((n) => n + 1);
    if (this.error()) this.finish();
  }
  retrySave(): void {
    if (!this.paused() && evaluateGearLock(this.definition(), this.positions())) this.solved.emit();
  }
}
