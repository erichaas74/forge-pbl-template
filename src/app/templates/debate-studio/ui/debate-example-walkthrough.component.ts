import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import type { DebateBroadcastSegment, DebateFaction } from '../domain/debate-studio.models';
import { DebateStudioRuntimeService } from '../runtime/debate-studio-runtime.service';

type BuilderStage = 'plan' | 'evidence' | 'write' | 'feedback' | 'file';

@Component({
  selector: 'app-debate-example-walkthrough',
  templateUrl: './debate-example-walkthrough.component.html',
  styleUrl: './debate-example-walkthrough.component.scss',
})
export class DebateExampleWalkthroughComponent {
  readonly runtime = inject(DebateStudioRuntimeService);
  readonly readOnly = input(true);
  readonly scene = signal(0);
  readonly playing = signal(!this.prefersReducedMotion());
  readonly typedCharacters = signal(0);
  readonly expandedArchiveId = signal<string | undefined>(undefined);
  readonly resultsOpen = signal(false);
  readonly threadScroller = viewChild<ElementRef<HTMLElement>>('threadScroller');
  private readonly destroyRef = inject(DestroyRef);
  private sceneTimer?: ReturnType<typeof setTimeout>;
  private typingTimer?: ReturnType<typeof setInterval>;

  readonly timeline = computed(() =>
    this.runtime.program().filter((segment) => ['student', 'moderator'].includes(segment.kind)),
  );
  readonly maxScene = computed(() => Math.max(9, 9 + Math.max(0, this.timeline().length - 4)));
  readonly visibleTimeline = computed(() => {
    const scene = this.scene();
    const count = scene <= 2 ? scene : scene <= 8 ? 3 : 4 + (scene - 9);
    return this.timeline().slice(0, Math.max(0, count));
  });
  readonly builderOpen = computed(() => this.scene() >= 4 && this.scene() <= 8);
  readonly builderStage = computed<BuilderStage>(() => {
    const stages: readonly BuilderStage[] = ['plan', 'evidence', 'write', 'feedback', 'file'];
    return stages[Math.max(0, Math.min(4, this.scene() - 4))];
  });
  readonly responseSegment = computed(() =>
    this.timeline().find((segment, index) => index >= 3 && segment.kind === 'student'),
  );
  readonly responseDraft = computed(() => this.responseSegment()?.transcript ?? '');
  readonly typedDraft = computed(() => this.responseDraft().slice(0, this.typedCharacters()));
  readonly leftArchive = computed(() =>
    this.visibleTimeline().filter(
      (segment) =>
        segment.kind === 'student' && segment.factionId === this.runtime.config.factions[0].id,
    ),
  );
  readonly rightArchive = computed(() =>
    this.visibleTimeline().filter(
      (segment) =>
        segment.kind === 'student' && segment.factionId === this.runtime.config.factions[1].id,
    ),
  );
  readonly currentSegment = computed(() => this.visibleTimeline().at(-1));
  readonly walkthroughLabel = computed(() => {
    const scene = this.scene();
    if (scene === 0) return 'The finished class debate is ready to replay';
    if (scene <= 2) return 'Opening arguments enter the shared thread';
    if (scene === 3) return 'The moderator creates a neutral break';
    if (scene >= 4 && scene <= 8) return 'A student builds and files the next response';
    if (scene < this.maxScene()) return 'The class debate continues argument by argument';
    return 'The complete class record is ready for review';
  });

  constructor() {
    effect(() => {
      this.visibleTimeline().length;
      queueMicrotask(() => {
        const scroller = this.threadScroller()?.nativeElement;
        if (scroller !== undefined) scroller.scrollTop = scroller.scrollHeight;
      });
    });
    this.destroyRef.onDestroy(() => this.clearTimers());
    if (this.playing()) this.sceneTimer = setTimeout(() => this.advance(), 900);
  }

  faction(segment: DebateBroadcastSegment): DebateFaction | undefined {
    return this.runtime.config.factions.find((faction) => faction.id === segment.factionId);
  }

  isLeft(segment: DebateBroadcastSegment): boolean {
    return segment.factionId === this.runtime.config.factions[0].id;
  }

  evidenceTitle(evidenceId: string): string {
    return this.runtime.config.evidence.find((item) => item.id === evidenceId)?.title ?? evidenceId;
  }

  toggleArchive(segment: DebateBroadcastSegment): void {
    this.expandedArchiveId.update((id) => (id === segment.id ? undefined : segment.id));
  }

  hear(segment: DebateBroadcastSegment): void {
    this.runtime.speak(segment.transcript);
  }

  togglePlayback(): void {
    if (this.playing()) {
      this.playing.set(false);
      this.clearTimers();
      return;
    }
    if (this.scene() >= this.maxScene()) this.scene.set(0);
    this.playing.set(true);
    this.beginSceneTimers();
  }

  next(): void {
    this.playing.set(false);
    this.clearTimers();
    this.advance(false);
    if (this.scene() === 6) this.typedCharacters.set(this.responseDraft().length);
  }

  restart(): void {
    this.clearTimers();
    this.scene.set(0);
    this.typedCharacters.set(0);
    this.expandedArchiveId.set(undefined);
    this.resultsOpen.set(false);
    this.playing.set(!this.prefersReducedMotion());
    if (this.playing()) this.sceneTimer = setTimeout(() => this.advance(), 900);
  }

  private advance(reschedule = true): void {
    if (this.scene() >= this.maxScene()) {
      this.playing.set(false);
      this.clearTimers();
      return;
    }
    this.scene.update((scene) => scene + 1);
    if (reschedule && this.playing()) this.beginSceneTimers();
  }

  private beginSceneTimers(): void {
    this.clearTimers();
    if (this.scene() === 6) {
      this.typedCharacters.set(0);
      this.typingTimer = setInterval(() => {
        this.typedCharacters.update((length) => Math.min(this.responseDraft().length, length + 4));
        if (this.typedCharacters() >= this.responseDraft().length) {
          if (this.typingTimer !== undefined) clearInterval(this.typingTimer);
          this.typingTimer = undefined;
        }
      }, 32);
    } else if (this.scene() > 6) {
      this.typedCharacters.set(this.responseDraft().length);
    }
    const delay = this.scene() >= 10 ? 1250 : this.scene() === 6 ? 4300 : 2400;
    this.sceneTimer = setTimeout(() => this.advance(), delay);
  }

  private clearTimers(): void {
    if (this.sceneTimer !== undefined) clearTimeout(this.sceneTimer);
    if (this.typingTimer !== undefined) clearInterval(this.typingTimer);
    this.sceneTimer = undefined;
    this.typingTimer = undefined;
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
