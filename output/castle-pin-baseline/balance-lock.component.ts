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
  balanceReading,
  emptyBalance,
  evaluateBalanceLock,
  formatPiece,
  scaleOffset,
  type BalanceLockDefinition,
  type BalanceSide,
} from './balance-lock.domain';
import type { BalanceSceneHandle, MountBalanceScene } from './balance-lock.scene';

export const BALANCE_SCENE_LOADER = new InjectionToken<
  () => Promise<{ mountBalanceScene: MountBalanceScene }>
>('BALANCE_SCENE_LOADER', {
  providedIn: 'root',
  factory: () => () => import('./balance-lock.scene'),
});

@Component({
  selector: 'app-balance-lock',
  templateUrl: './balance-lock.component.html',
  styleUrls: ['./balance-lock.component.scss', '../weekly/preview-machine.scss'],
  host: { '[class.week-preview]': 'authoringPreview()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceLockComponent implements AfterViewInit {
  readonly definition = input.required<BalanceLockDefinition>();
  readonly authoringPreview = input(false);
  readonly initialScale = input(0);
  readonly tested = output<number>();
  readonly title = input('Balance lock');
  readonly placements = input<readonly number[]>([]);
  readonly completed = input(false);
  readonly paused = input(false);
  readonly reducedMotion = input(false);
  readonly saveWarning = input('');
  readonly moved = output<{ index: number; side: BalanceSide }>();
  readonly solved = output<void>();
  readonly leave = output<void>();
  readonly pauseRequested = output<void>();
  readonly continued = output<void>();
  readonly sound = output<'turn' | 'open' | 'wrong'>();
  readonly active = signal(0);
  readonly selected = signal<number | null>(null);
  readonly sealed = signal<readonly number[]>([]);
  readonly attempt = signal(0);
  readonly ready = signal(false);
  readonly error = signal(false);
  readonly help = signal(false);
  readonly controls = signal(false);
  readonly notice = signal('Pick up a weight. Drop it on a pan. Watch the beam settle.');
  readonly positions = computed(() =>
    this.placements().length ? this.placements() : emptyBalance(this.definition()),
  );
  readonly scale = computed(() => this.definition().scales[this.active()]);
  readonly offset = computed(() => scaleOffset(this.definition(), this.active()));
  readonly reading = computed(() =>
    balanceReading(this.definition(), this.active(), this.positions()),
  );
  readonly locked = computed(() => !this.authoringPreview() && (this.completed() || this.sealed().includes(this.active())));
  readonly blocks = computed(() =>
    this.scale().pieces.map((piece, i) => ({
      piece,
      index: this.offset() + i,
      side: this.positions()[this.offset() + i],
    })),
  );
  readonly format = formatPiece;
  private readonly loader = inject(BALANCE_SCENE_LOADER);
  private scene?: BalanceSceneHandle;
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
    if (this.authoringPreview() && Number.isInteger(this.initialScale()) && this.definition().scales[this.initialScale()])
      this.active.set(this.initialScale());
    if (this.stage.nativeElement.clientWidth > 0 && this.stage.nativeElement.clientWidth <= 600)
      this.controls.set(true);
    this.heading.nativeElement.focus({ preventScroll: true });
    try {
      const { mountBalanceScene } = await this.loader();
      if (this.destroyed) return;
      this.scene = mountBalanceScene(
        this.stage.nativeElement,
        this.definition(),
        () => ({
          active: this.active(),
          placements: this.positions(),
          selected: this.selected(),
          sealed: this.sealed(),
          completed: this.completed(),
          reducedMotion: this.reducedMotion(),
          paused: this.paused(),
          attempt: this.attempt(),
        }),
        {
          select: (index) => this.select(index),
          place: (index, side) => this.place(index, side),
          ready: () => this.ready.set(true),
          failed: () => this.error.set(true),
        },
      );
    } catch {
      this.error.set(true);
    }
  }
  select(index: number): void {
    if (this.paused() || this.locked() || !this.blocks().some((b) => b.index === index)) return;
    this.selected.set(index);
    this.notice.set(
      `${formatPiece(this.scale().pieces[index - this.offset()])} selected. Choose a pan or return it to the tray.`,
    );
  }
  place(index: number, side: BalanceSide): void {
    if (this.paused() || this.locked() || !this.blocks().some((b) => b.index === index)) return;
    this.moved.emit({ index, side });
    this.selected.set(null);
    this.sound.emit('turn');
    this.notice.set(
      side === 0
        ? 'Weight returned to its tray slot.'
        : 'Weight placed. Watch which pan moves down.',
    );
  }
  placeSelected(side: BalanceSide): void {
    const index = this.selected();
    if (index !== null) this.place(index, side);
  }
  changeScale(index: number): void {
    if (this.paused() || !this.definition().scales[index]) return;
    this.active.set(index);
    this.selected.set(null);
    this.attempt.set(0);
    this.notice.set(this.scale().instruction);
  }
  resetScale(): void {
    if (this.paused() || this.completed()) return;
    this.sealed.update((values) => values.filter((v) => v !== this.active()));
    for (const b of this.blocks()) this.moved.emit({ index: b.index, side: 0 });
    this.selected.set(null);
    this.attempt.set(0);
    this.notice.set('This scale is reset. Try a different combination.');
    this.sound.emit('turn');
  }
  engage(): void {
    if (this.paused() || this.locked()) return;
    this.attempt.update((n) => n + 1);
    this.tested.emit(this.active());
    if (!this.reading().balanced) {
      this.notice.set(this.reading().feedback);
      this.sound.emit('wrong');
      return;
    }
    const next = [...this.sealed(), this.active()];
    if (!this.authoringPreview()) this.sealed.set(next);
    this.selected.set(null);
    this.sound.emit('open');
    this.notice.set(`${this.scale().title} released. ${this.reading().equation}`);
    if (
      !this.authoringPreview() && next.length === this.definition().scales.length &&
      evaluateBalanceLock(this.definition(), this.positions())
    )
      this.solved.emit();
  }
  nextSeal(): void {
    const index = this.definition().scales.findIndex((_, i) => !this.sealed().includes(i));
    if (index >= 0) this.changeScale(index);
  }
  retrySave(): void {
    if (!this.paused() && evaluateBalanceLock(this.definition(), this.positions()))
      this.solved.emit();
  }
}
