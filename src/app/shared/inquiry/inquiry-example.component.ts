import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import type { InquiryExample } from './inquiry-example.models';

@Component({
  selector: 'app-inquiry-example',
  templateUrl: './inquiry-example.component.html',
  styleUrl: './inquiry-example.component.scss',
})
export class InquiryExampleComponent {
  readonly example = input.required<InquiryExample>();
  readonly sources =
    input.required<
      readonly { id: string; title: string; citation: string; sourceUrl?: string }[]
    >();
  readonly player = viewChild<ElementRef<HTMLVideoElement>>('player');
  readonly failed = signal(false);
  readonly ready = signal(false);
  readonly activeChapter = signal<number | undefined>(undefined);
  time(seconds: number): string {
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  }
  jump(index: number): void {
    const video = this.player()?.nativeElement;
    if (!video || !this.ready() || !this.example().chapters[index]) return;
    video.pause();
    video.currentTime = this.example().chapters[index].startSeconds;
    this.activeChapter.set(index);
    video.focus();
  }
  credit(id: string) {
    return this.sources().find((s) => s.id === id);
  }
}
