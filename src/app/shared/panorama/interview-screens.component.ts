import { ChangeDetectionStrategy, Component, ElementRef, input, signal, viewChild } from '@angular/core';

export interface InterviewScreen {
  readonly id: string;
  readonly title: string;
  readonly poster: string;
  readonly video?: { readonly src: string; readonly captions: string };
}

@Component({
  selector: 'app-interview-screens',
  templateUrl: './interview-screens.component.html',
  styleUrl: './interview-screens.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewScreensComponent {
  readonly interviews = input<readonly InterviewScreen[]>([]);
  readonly active = signal<InterviewScreen | undefined>(undefined);
  readonly failed = signal(false);
  readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  readonly player = viewChild<ElementRef<HTMLVideoElement>>('player');
  private trigger?: HTMLButtonElement;

  open(interview: InterviewScreen, event: Event): void {
    if (!interview.video) return;
    this.player()?.nativeElement.pause();
    this.trigger = event.currentTarget as HTMLButtonElement;
    this.failed.set(false);
    this.active.set(interview);
    this.dialog()?.nativeElement.showModal();
  }
  close(): void {
    this.player()?.nativeElement.pause();
    this.dialog()?.nativeElement.close();
    this.active.set(undefined);
    this.trigger?.focus();
  }
}
