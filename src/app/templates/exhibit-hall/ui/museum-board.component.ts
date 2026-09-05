import { Component, Input, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';

import type { ExhibitRendererComponentInputs } from '../runtime/exhibit-hall.tokens';
import type { MuseumBoardSnapshotData } from '../domain/exhibit-types';
import { isMuseumBoardSnapshotData } from '../renderers/museum-board/museum-board-renderer';
import { parseMetaStepsEmbed } from '../renderers/metasteps/metasteps-embed';
import {
  parsePresentationVideo,
  type PresentationVideoParseResult,
} from '../renderers/video/presentation-video';

@Component({
  selector: 'app-museum-board',
  templateUrl: './museum-board.component.html',
  styleUrl: './museum-board.component.scss',
})
export class MuseumBoardComponent implements ExhibitRendererComponentInputs {
  private readonly sanitizer = inject(DomSanitizer);

  @Input({ required: true }) data: unknown;
  @Input() mode: 'thumbnail' | 'walkup' | 'preview' = 'thumbnail';
  readonly prototypePlaying = signal(false);

  get board(): MuseumBoardSnapshotData | undefined {
    return isMuseumBoardSnapshotData(this.data) ? this.data : undefined;
  }

  get galleryUrl(): string | undefined {
    const value = this.board?.immersiveGallery?.embedUrl;
    if (value === undefined) return undefined;
    return parseMetaStepsEmbed(value).normalizedUrl;
  }

  get galleryEmbedUrl(): SafeResourceUrl | undefined {
    const value = this.galleryUrl;
    return value === undefined ? undefined : this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  get presentationVideo(): PresentationVideoParseResult | undefined {
    const value = this.board?.videoPresentation?.videoUrl;
    if (value === undefined) return undefined;
    const parsed = parsePresentationVideo(value);
    return parsed.valid ? parsed : undefined;
  }

  get presentationEmbedUrl(): SafeResourceUrl | undefined {
    const video = this.presentationVideo;
    return video?.kind === 'embedded' && video.normalizedUrl !== undefined
      ? this.sanitizer.bypassSecurityTrustResourceUrl(video.normalizedUrl)
      : undefined;
  }

  objectMark(index: number): string {
    return ['☥', '≋', '△', '◈', '✺'][index % 5] ?? '◈';
  }

  togglePrototypeVideo(): void {
    this.prototypePlaying.update((playing) => !playing);
  }
}
