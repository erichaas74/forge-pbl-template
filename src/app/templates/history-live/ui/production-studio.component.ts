import { EvidenceSceneComponent } from './evidence-scene.component';
import { Component, inject, signal } from '@angular/core';

import type { CameraState, MediaType } from '../domain/history-live.models';
import { HistoryLiveRuntimeService } from '../runtime/history-live-runtime.service';

@Component({
  selector: 'app-history-live-production-studio',
  imports: [EvidenceSceneComponent],
  templateUrl: './production-studio.component.html',
  styleUrl: './production-studio.component.scss',
})
export class ProductionStudioComponent {
  readonly runtime = inject(HistoryLiveRuntimeService);
  readonly cameraStates: readonly { readonly id: CameraState; readonly label: string }[] = [
    { id: 'studio-wide', label: 'Studio Wide' },
    { id: 'reporter', label: 'Reporter' },
    { id: 'media-wall', label: 'Media Wall' },
  ];
  readonly mediaTypes: readonly { readonly id: MediaType; readonly label: string }[] = [
    { id: 'image', label: 'Image' },
    { id: 'historical-map', label: 'Historical map' },
    { id: 'quote', label: 'Evidence caption' },
    { id: 'timeline', label: 'Timeline' },
  ];

  readonly selectedScene = signal(0);
  upload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) void this.runtime.storeRecording(file);
  }
  updateCamera(sceneId: string, event: Event): void {
    this.runtime.updateScene(
      sceneId,
      'camera',
      (event.target as HTMLSelectElement).value as CameraState,
    );
  }

  updateMedia(sceneId: string, event: Event): void {
    this.runtime.updateScene(
      sceneId,
      'mediaType',
      (event.target as HTMLSelectElement).value as MediaType,
    );
  }
}
