import {
  Component,
  computed,
  effect,
  inject,
  signal,
  OnDestroy,
  untracked,
  viewChild,
  ElementRef,
} from '@angular/core';
import type { BroadcastSegment } from '../domain/history-live.models';
import { HistoryLiveRuntimeService } from '../runtime/history-live-runtime.service';
import { EvidenceSceneComponent } from './evidence-scene.component';

@Component({
  selector: 'app-history-live-broadcast-player',
  imports: [EvidenceSceneComponent],
  templateUrl: './broadcast-player.component.html',
  styleUrl: './broadcast-player.component.scss',
})
export class BroadcastPlayerComponent implements OnDestroy {
  readonly runtime = inject(HistoryLiveRuntimeService);
  readonly sceneIndex = signal(0);
  readonly mediaUrl = signal<string | undefined>(undefined);
  private request = 0;
  readonly video = viewChild<ElementRef<HTMLVideoElement>>('reportVideo');
  readonly previewSegment = computed<BroadcastSegment | undefined>(() => {
    const state = this.runtime.state();
    if (state.stage === 'showcase') return this.runtime.activeSegment();
    const network = this.runtime.selectedNetwork();
    if (!network) return undefined;
    return {
      id: this.runtime.currentStudentSegmentId,
      reporter: this.runtime.viewer.studentDisplayName,
      side: network.side,
      networkName: network.name,
      headline: state.pitch.headline,
      desk: this.runtime.beatLabel(state.pitch.beatId),
      durationSeconds: 0,
      startLabel: 'PREVIEW',
      ready: state.studentSegmentReady,
      visualLabel: state.visualSequence[0]?.caption ?? '',
      script: state.scriptBlocks,
      scenes: state.visualSequence,
      recordingAssetId: state.recordingAssetId,
      transcript: state.transcript || state.scriptBlocks.map((block) => block.text).join('\n'),
    };
  });
  readonly playbackKey = computed(
    () => `${this.previewSegment()?.id}:${this.previewSegment()?.recordingAssetId ?? ''}`,
  );
  constructor() {
    effect(() => {
      const status = this.runtime.state().showStatus;
      if (status === 'held' || status === 'ended') this.video()?.nativeElement.pause();
    });
    effect(() => {
      this.playbackKey();
      const segment = untracked(this.previewSegment);
      this.sceneIndex.set(0);
      const request = ++this.request;
      untracked(() => this.clearMedia());
      if (segment?.recordingAssetId && this.runtime.media) {
        void this.runtime.media
          .getReference(segment.recordingAssetId)
          .then((asset) => {
            if (request !== this.request) {
              if (asset.reference.startsWith('blob:')) URL.revokeObjectURL(asset.reference);
              return;
            }
            this.mediaUrl.set(asset.reference);
          })
          .catch(() =>
            this.runtime.error.set(
              'Recording unavailable. Read the transcript or restore the media before presenting.',
            ),
          );
      }
    });
  }
  reactionCount(reaction: string): number {
    return this.runtime.state().audienceReactions[`${this.previewSegment()?.id}:${reaction}`] ?? 0;
  }
  private clearMedia(): void {
    const url = this.mediaUrl();
    if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
    this.mediaUrl.set(undefined);
  }
  ngOnDestroy(): void {
    this.request++;
    this.clearMedia();
  }
}
