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
import { initialMachine, machineReading, reduceMachine } from './machine.rules';
import type { MachineAnswer, MachineDefinition, MachineInput, MathGrade } from './machine.models';
import type { MachineSceneHandle, MountMachineScene } from './machine.scene';
export const MACHINE_SCENE_LOADER = new InjectionToken<
  () => Promise<{ mountMachineScene: MountMachineScene }>
>('MACHINE_SCENE_LOADER', { providedIn: 'root', factory: () => () => import('./machine.scene') });
@Component({
  selector: 'app-machine-workshop',
  templateUrl: './machine-workshop.component.html',
  styleUrl: './machine-workshop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MachineWorkshopComponent implements AfterViewInit {
  readonly definition = input.required<MachineDefinition>();
  readonly answer = input<MachineAnswer | null>(null);
  readonly grade = input<MathGrade>(5);
  readonly completed = input(false);
  readonly paused = input(false);
  readonly reducedMotion = input(false);
  readonly saveWarning = input('');
  readonly changed = output<MachineAnswer>();
  readonly solved = output<void>();
  readonly leave = output<void>();
  readonly pauseRequested = output<void>();
  readonly retrySave = output<void>();
  readonly sound = output<'turn' | 'open' | 'wrong'>();
  readonly active = signal(0);
  readonly selected = signal<number | null>(null);
  readonly ready = signal(false);
  readonly error = signal(false);
  readonly controls = signal(false);
  readonly help = signal(false);
  readonly testing = signal(false);
  readonly passed = signal(false);
  readonly trial = signal(0);
  readonly settled = signal(true);
  readonly notice = signal('Explore the mechanism. Its measurements are your clues.');
  readonly state = computed(() => this.answer() ?? initialMachine(this.definition()));
  readonly stage = computed(() => this.definition().stages[this.active()]);
  readonly stageAnswer = computed(() => this.state().stages[this.active()]);
  readonly reading = computed(() => machineReading(this.stage(), this.stageAnswer()));
  readonly sealed = computed(
    () => this.completed() || this.state().seals.includes(this.stage().id),
  );
  readonly locked = computed(() => this.paused() || this.testing() || this.sealed());
  readonly Math = Math;
  private readonly loader = inject(MACHINE_SCENE_LOADER);
  private scene?: MachineSceneHandle;
  private destroyed = false;
  @ViewChild('stageHost', { static: true }) private host!: ElementRef<HTMLElement>;
  @ViewChild('heading', { static: true }) private heading!: ElementRef<HTMLElement>;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.scene?.destroy();
    });
  }
  async ngAfterViewInit(): Promise<void> {
    this.active.set(Math.min(this.state().seals.length, this.definition().stages.length - 1));
    this.controls.set(
      this.host.nativeElement.clientWidth > 0 && this.host.nativeElement.clientWidth < 700,
    );
    this.heading.nativeElement.focus({ preventScroll: true });
    // A reload can occur between the last saved seal and the final submit command.
    if (!this.completed() && this.state().seals.length === this.definition().stages.length)
      this.solved.emit();
    try {
      const { mountMachineScene } = await this.loader();
      if (this.destroyed) return;
      this.scene = mountMachineScene(
        this.host.nativeElement,
        this.definition(),
        () => ({
          active: this.active(),
          answer: this.stageAnswer(),
          selected: this.selected(),
          testing: this.testing(),
          trial: this.trial(),
          passed: this.passed(),
          completed: this.sealed(),
          paused: this.paused(),
          reducedMotion: this.reducedMotion(),
        }),
        {
          input: (i) => this.operate(i),
          select: (i) => this.select(i),
          ready: () => this.ready.set(true),
          failed: () => {
            this.error.set(true);
            this.controls.set(true);
            this.settled.set(true);
          },
          settled: (v) => this.settled.set(v),
          finished: () => this.finish(),
        },
      );
    } catch {
      this.error.set(true);
      this.controls.set(true);
    }
  }
  select(index: number): void {
    if (!this.locked()) {
      this.selected.set(index);
      this.notice.set('Selected. Use the mechanism or its matching controls below.');
    }
  }
  operate(input: MachineInput): void {
    if (this.locked()) return;
    const current = this.stageAnswer(),
      next = reduceMachine(this.stage(), current, input);
    if (next === current) return;
    this.changed.emit({
      ...this.state(),
      stages: this.state().stages.map((a, i) => (i === this.active() ? next : a)),
    });
    this.sound.emit('turn');
    this.notice.set('Watch the mechanism respond, then engage the release when it is ready.');
  }
  turnPiece(delta: number): void {
    const a = this.stageAnswer(),
      d = this.stage(),
      i = this.selected();
    if (i !== null && d.kind === 'fraction-gear' && a.kind === 'fraction-gear')
      this.operate({
        type: 'piece',
        index: i,
        offset: a.offsets[i] < 0 ? 0 : (a.offsets[i] + delta + d.slots) % d.slots,
      });
  }
  seatPiece(): void {
    const a = this.stageAnswer(),
      d = this.stage(),
      i = this.selected();
    if (i === null || d.kind !== 'fraction-gear' || a.kind !== 'fraction-gear') return;
    let offset = 0;
    d.pieces.forEach((p, j) => {
      if (j !== i && a.offsets[j] >= 0)
        offset = Math.max(offset, a.offsets[j] + (d.slots * p.numerator) / p.denominator);
    });
    this.operate({ type: 'piece', index: i, offset: offset % d.slots });
  }
  removePiece(): void {
    const i = this.selected();
    if (i !== null) this.operate({ type: 'piece', index: i, offset: -1 });
  }
  moveHead(axis: 'x' | 'y', delta: number): void {
    const a = this.stageAnswer();
    if (a.kind === 'coordinate')
      this.operate({
        type: 'point',
        x: a.x + (axis === 'x' ? delta : 0),
        y: a.y + (axis === 'y' ? delta : 0),
      });
  }
  turnMirror(index: number, delta: number): void {
    const a = this.stageAnswer(),
      d = this.stage();
    if (a.kind === 'reflection' && d.kind === 'reflection')
      this.operate({
        type: 'mirror',
        index,
        angle: (a.angles[index] + delta * d.mirrors[index].step + 180) % 180,
      });
  }
  test(): void {
    if (this.locked()) return;
    if (!this.settled() && !this.error()) {
      this.notice.set('Let the liquid settle before testing the float.');
      return;
    }
    const reading = this.reading();
    this.passed.set(reading.solved);
    this.testing.set(true);
    this.trial.update((n) => n + 1);
    this.selected.set(null);
    this.sound.emit(reading.solved ? 'open' : 'turn');
    if (reading.solved) {
      const state = { ...this.state(), seals: [...this.state().seals, this.stage().id] };
      this.changed.emit(state);
      if (state.seals.length === this.definition().stages.length) this.solved.emit();
    }
    if (this.error()) this.finish();
  }
  finish(): void {
    if (this.paused() || !this.testing()) return;
    this.testing.set(false);
    this.notice.set(this.reading().feedback);
    if (!this.passed()) this.sound.emit('wrong');
  }
  nextStage(): void {
    if (this.paused() || this.testing() || !this.sealed()) return;
    const next = this.active() + 1;
    if (next < this.definition().stages.length) {
      this.active.set(next);
      this.selected.set(null);
      this.settled.set(true);
      this.notice.set(this.stage().instruction);
    }
  }
  replay(): void {
    if (!this.sealed() || this.testing() || this.paused()) return;
    this.passed.set(true);
    this.testing.set(true);
    this.trial.update((n) => n + 1);
    if (this.error()) this.finish();
  }
  reset(): void {
    this.operate({ type: 'reset' });
    this.selected.set(null);
  }
}
