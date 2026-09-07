import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  input,
  OnDestroy,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { routeForScene } from '../core/journey-replay.engine';
import type { ReplayScene } from '../domain/journey-replay.models';
import { JourneyReplayRuntimeService } from '../runtime/journey-replay-runtime.service';
import { LivingJourneyMapComponent } from './map/living-journey-map.component';

@Component({
  selector: 'app-journey-replay-player',
  host: { '[class.embedded]': 'readOnly() || embedded()' },
  imports: [LivingJourneyMapComponent],
  templateUrl: './journey-replay-player.component.html',
  styleUrl: './journey-replay-player.component.scss',
})
export class JourneyReplayPlayerComponent implements OnDestroy {
  readonly runtime = inject(JourneyReplayRuntimeService);
  readonly readOnly = input(false);
  readonly embedded = input(false);
  private readonly injector = inject(Injector);
  private readonly sceneHeading = viewChild<ElementRef<HTMLElement>>('sceneHeading');
  readonly closed = output<void>();
  readonly playableScenes = computed(() =>
    this.runtime.state().replayTimeline.filter((scene) => !scene.hidden),
  );
  readonly requestedSceneIndex = signal(0);
  readonly sceneIndex = computed(() =>
    Math.min(this.requestedSceneIndex(), Math.max(0, this.playableScenes().length - 1)),
  );
  readonly scene = computed<ReplayScene | undefined>(
    () => this.playableScenes()[this.sceneIndex()],
  );
  readonly route = computed(() => routeForScene(this.runtime.state(), this.scene()));
  readonly stepRecord = computed(() =>
    this.runtime.state().completedSteps.find((record) => record.stepId === this.scene()?.stepId),
  );
  playing = false;
  private timer?: ReturnType<typeof setInterval>;

  togglePlayback(): void {
    if (this.playing) this.pause();
    else this.play();
  }

  play(): void {
    if (this.playableScenes().length === 0 || this.playing) return;
    if (this.requestedSceneIndex() >= this.playableScenes().length - 1)
      this.requestedSceneIndex.set(0);
    this.playing = true;
    this.loadSceneAudio();
    this.timer = setInterval(
      () => this.next(false),
      this.runtime.config.replay.sceneDurationSeconds * 1000,
    );
  }

  pause(): void {
    this.playing = false;
    if (this.timer !== undefined) clearInterval(this.timer);
    this.timer = undefined;
  }

  next(focus = true): void {
    if (this.requestedSceneIndex() >= this.playableScenes().length - 1) {
      this.pause();
      return;
    }
    this.requestedSceneIndex.update((index) => index + 1);
    this.loadSceneAudio();
    if (focus) this.focusScene();
  }

  previous(): void {
    this.pause();
    this.requestedSceneIndex.update((index) => Math.max(0, index - 1));
    this.loadSceneAudio();
    this.focusScene();
  }

  selectScene(sceneId: string): void {
    const index = this.playableScenes().findIndex((scene) => scene.id === sceneId);
    if (index < 0) return;
    this.pause();
    this.requestedSceneIndex.set(index);
    this.loadSceneAudio();
    this.focusScene();
  }

  private focusScene(): void {
    afterNextRender(
      () => {
        const element = this.sceneHeading()?.nativeElement;
        element?.scrollIntoView({ block: 'nearest' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }

  toggleScene(sceneId: string, event: Event): void {
    if (this.readOnly()) return;
    this.pause();
    this.runtime.setSceneHidden(sceneId, !(event.target as HTMLInputElement).checked);
    this.requestedSceneIndex.set(
      Math.min(this.requestedSceneIndex(), Math.max(0, this.playableScenes().length - 1)),
    );
  }

  source(id: string) {
    return this.runtime.config.evidence.find((item) => item.id === id);
  }
  paragraph(evidenceId: string, paragraphId: string): string {
    return this.source(evidenceId)?.paragraphs?.find((item) => item.id === paragraphId)?.text ?? '';
  }
  resourceValue(id: string, after: boolean): number | undefined {
    return (after ? this.stepRecord()?.resourceAfter : this.stepRecord()?.resourceBefore)?.[id];
  }

  close(): void {
    this.pause();
    this.closed.emit();
  }

  ngOnDestroy(): void {
    this.pause();
  }

  private loadSceneAudio(): void {
    const response = this.stepRecord()?.studentResponse;
    if (response?.mediaAssetId !== undefined)
      void this.runtime.loadMediaPreview(response.mediaAssetId);
  }
}
