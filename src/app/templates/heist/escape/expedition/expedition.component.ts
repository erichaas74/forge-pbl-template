import { GearLockComponent } from '../gear-lock/gear-lock.component';
import { BalanceLockComponent } from '../balance-lock/balance-lock.component';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  InjectionToken,
  ViewChild,
  effect,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ExpeditionRuntime } from '../runtime/expedition-runtime';
import { ExpeditionAudio } from '../game/expedition-audio';
import type { ExpeditionSceneHandle, MountExpeditionScene } from '../game/expedition-scene.models';
import type { ExpeditionInput } from '../domain/expedition.models';

export const EXPEDITION_SCENE_LOADER = new InjectionToken<
  () => Promise<{ mountExpeditionScene: MountExpeditionScene }>
>('EXPEDITION_SCENE_LOADER', {
  providedIn: 'root',
  factory: () => () => import('../game/expedition-scene'),
});
@Component({
  selector: 'app-heist-expedition',
  imports: [FormsModule, RouterLink, BalanceLockComponent, GearLockComponent],
  templateUrl: './expedition.component.html',
  styleUrl: './expedition.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpeditionComponent implements AfterViewInit {
  readonly runtime = inject(ExpeditionRuntime);
  readonly mission = this.runtime.mission;
  readonly balancePuzzle = computed(() => {
    const p = this.runtime.current().puzzle;
    return p.type === 'balance-lock' && ['puzzle', 'celebrate'].includes(this.runtime.phase())
      ? p
      : null;
  });
  readonly gearPuzzle = computed(() => {
    const p = this.runtime.current().puzzle;
    return p.type === 'gear-lock' && ['puzzle', 'celebrate'].includes(this.runtime.phase())
      ? p
      : null;
  });
  readonly ready = signal(false);
  readonly error = signal('');
  readonly settings = signal(false);
  readonly restartQuestion = signal(false);
  readonly overview = signal(false);
  readonly audio = new ExpeditionAudio();
  readonly Math = Math;
  private readonly loader = inject(EXPEDITION_SCENE_LOADER);
  private scene?: ExpeditionSceneHandle;
  private destroyed = false;
  private previousPhase = '';
  @ViewChild('worldHost', { static: true }) private host!: ElementRef<HTMLElement>;
  @ViewChild('panel') private panel?: ElementRef<HTMLElement>;
  @ViewChild('settingsPanel') private settingsPanel?: ElementRef<HTMLElement>;
  constructor() {
    effect(() => {
      const phase = this.runtime.phase();
      if (
        this.previousPhase &&
        phase !== this.previousPhase &&
        ['puzzle', 'celebrate', 'complete', 'journal'].includes(phase)
      )
        setTimeout(() => this.panel?.nativeElement.focus({ preventScroll: true }), 0);
      this.previousPhase = phase;
    });
    const key = (event: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'CANVAS' &&
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)
      )
        event.preventDefault();
      if (event.key === 'Tab' && this.settings()) {
        const controls =
          this.settingsPanel?.nativeElement.querySelectorAll<HTMLElement>('button:not(:disabled)');
        if (controls?.length) {
          const first = controls[0],
            last = controls[controls.length - 1];
          if (
            event.shiftKey &&
            (document.activeElement === first ||
              document.activeElement === this.settingsPanel?.nativeElement)
          ) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
      if (event.key === 'Escape') {
        if (this.settings()) this.closeSettings();
        else if (this.runtime.phase() === 'puzzle') this.closePuzzle();
        else if (this.runtime.phase() === 'journal') this.runtime.closeJournal();
        else if (this.runtime.phase() === 'explore') this.openSettings();
      }
    };
    const visibility = () =>
      this.audio.setEnabled(
        !document.hidden && !this.runtime.paused() && this.runtime.audioEnabled(),
      );
    document.addEventListener('keydown', key);
    document.addEventListener('visibilitychange', visibility);
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.scene?.destroy();
      this.audio.destroy();
      document.removeEventListener('keydown', key);
      document.removeEventListener('visibilitychange', visibility);
    });
  }
  async ngAfterViewInit(): Promise<void> {
    try {
      const { mountExpeditionScene } = await this.loader();
      if (this.destroyed) return;
      this.scene = mountExpeditionScene(
        this.host.nativeElement,
        this.mission,
        () => ({
          phase: this.runtime.phase(),
          players: this.runtime.players,
          localPlayerId: this.runtime.localIdentity.id,
          currentIndex: this.runtime.engine().index,
          solved: this.runtime.engine().solved,
          released: this.runtime.engine().released,
          draft: this.runtime.draft(),
          reducedMotion: this.runtime.reducedMotion(),
          paused: this.runtime.paused(),
          route: this.runtime.navigation.route,
          celebration: this.runtime.celebration(),
        }),
        {
          input: (input) => this.input(input),
          frame: (seconds, direction) => {
            if (document.hidden) return;
            this.runtime.tick(seconds, direction);
            if (this.runtime.navigation.moving && !this.runtime.paused())
              this.audio.step(performance.now() / 1000);
          },
          interact: () => {
            if (this.runtime.phase() === 'explore') this.runtime.inspect();
          },
          ready: () => this.ready.set(true),
          failed: (message) => this.error.set(message),
        },
      );
    } catch {
      this.error.set(
        'The game renderer could not start. Reload to try again in a browser with canvas support.',
      );
    }
  }
  start(): void {
    this.audio.start();
    if (this.runtime.start()) this.scene?.focus();
  }
  input(input: ExpeditionInput): void {
    this.runtime.input(input);
    if (['dial', 'weight', 'count'].includes(input.type)) this.audio.cue('turn');
  }
  submit(): void {
    const result = this.runtime.submit();
    if (result === 'correct') this.audio.cue('open');
    else if (result === 'incorrect') this.audio.cue('wrong');
  }
  next(): void {
    this.runtime.next();
    this.overview.set(false);
    this.scene?.follow();
    if (this.runtime.engine().complete) this.audio.cue('finish');
    else this.scene?.focus();
  }
  closePuzzle(): void {
    this.runtime.closePuzzle();
    this.scene?.focus();
  }
  sequence(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
  setQuantity(value: number | null): void {
    this.runtime.setNumber(value);
  }
  adjustQuantity(delta: number): void {
    const p = this.runtime.current().puzzle;
    if (p.type === 'number')
      this.setQuantity(Math.max(0, Math.min(p.max, (this.runtime.draft().quantity ?? 0) + delta)));
    this.audio.cue('turn');
  }
  weightTotal(): number {
    const p = this.runtime.current().puzzle;
    return p.type === 'balance'
      ? this.runtime.draft().weights.reduce((sum, i) => sum + p.weights[i], 0)
      : 0;
  }
  toggleMap(): void {
    this.overview.update((v) => !v);
    if (this.overview()) this.scene?.overview();
    else this.scene?.follow();
  }
  openSettings(): void {
    this.settings.set(true);
    this.runtime.paused.set(true);
    this.audio.setEnabled(false);
    setTimeout(() => this.settingsPanel?.nativeElement.focus({ preventScroll: true }), 0);
  }
  closeSettings(): void {
    this.settings.set(false);
    this.restartQuestion.set(false);
    this.runtime.paused.set(false);
    this.audio.setEnabled(this.runtime.audioEnabled());
    this.scene?.focus();
  }
  toggleSound(): void {
    this.runtime.audioEnabled.update((v) => !v);
    this.audio.setEnabled(this.runtime.audioEnabled() && !this.settings());
  }
  restart(): void {
    this.runtime.reset();
    this.closeSettings();
    this.scene?.follow();
    this.overview.set(false);
  }
  reload(): void {
    globalThis.location.reload();
  }
  spriteFrame(id: string): readonly [number, number, number, number] {
    const row = this.runtime.definition.animalRows[id];
    return this.runtime.definition.animalFrames?.[row * 4 + 2] ?? [0.5, row / 3, 0.25, 1 / 3];
  }
  spriteViewBox(id: string): string {
    const frame = this.spriteFrame(id);
    return `0 0 ${frame[2]} ${frame[3]}`;
  }
}
