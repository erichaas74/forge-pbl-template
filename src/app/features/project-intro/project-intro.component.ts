import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PROJECT_CATALOG_ENTRY } from '../../runtime/project-launch/project-launch.tokens';
import { PROJECT_INTRO_CONFIG } from '../../shared/project-intro/project-intro.runtime';
import type { OpeningMedia, OpeningSpeech } from '../../shared/project-intro/decision-scene.models';
import { OpeningMediaComponent } from '../../plugins/intro-scenes/opening-media.component';
import { ProjectTeaserHostComponent } from './project-teaser-host.component';

/** A read-only invitation. Starting opens the workspace without creating learner records. */
@Component({
  selector: 'app-project-intro',
  imports: [RouterLink, OpeningMediaComponent, ProjectTeaserHostComponent],
  templateUrl: './project-intro.component.html',
  styleUrl: './project-intro.component.scss',
})
export class ProjectIntroComponent {
  readonly project = inject(PROJECT_CATALOG_ENTRY);
  readonly config = inject(PROJECT_INTRO_CONFIG, { optional: true });
  private readonly router = inject(Router);
  readonly entering = signal(false);
  readonly error = signal<string | undefined>(undefined);
  readonly media = this.openingMedia();
  readonly illustratedOpening =
    this.config?.teaser?.type === 'illustrated-comparison' ? this.config.teaser : undefined;
  readonly speeches =
    this.config?.teaser?.type === 'decision-scene' ? (this.config.teaser.speeches ?? []) : [];
  readonly activeSpeech = signal(this.speeches[0]);
  readonly speechFailed = signal(false);
  readonly practiceOpen = signal(false);
  readonly practice =
    this.config?.teaser?.type === 'decision-scene' && this.config.teaser.cargo
      ? { ...this.config.teaser, prologue: undefined }
      : undefined;
  private readonly practiceDialog = viewChild<ElementRef<HTMLDialogElement>>('practiceDialog');
  private readonly practiceButton = viewChild<ElementRef<HTMLButtonElement>>('practiceButton');
  private readonly openingClip = viewChild<ElementRef<HTMLVideoElement>>('openingClip');

  openPractice(): void {
    this.openingClip()?.nativeElement.pause();
    this.practiceOpen.set(true);
    this.practiceDialog()?.nativeElement.showModal();
  }

  closePractice(): void {
    this.practiceOpen.set(false);
    this.practiceDialog()?.nativeElement.close();
    this.practiceButton()?.nativeElement.focus();
  }

  selectSpeech(speech: OpeningSpeech): void {
    this.activeSpeech.set(speech);
    this.speechFailed.set(false);
  }

  async enter(): Promise<void> {
    if (this.entering()) return;
    this.entering.set(true);
    this.error.set(undefined);
    try {
      const opened = await this.router.navigate(['/projects', this.project.id, 'experience']);
      if (!opened) this.error.set('Your project did not open. Please try Start Project again.');
    } catch {
      this.error.set('Your project could not open. Please try Start Project again.');
    } finally {
      this.entering.set(false);
    }
  }

  private openingMedia(): OpeningMedia | undefined {
    const teaser = this.config?.teaser;
    const scene =
      teaser?.type === 'decision-scene' ? (teaser.prologue?.media ?? teaser.media) : undefined;
    // Reuse the opening film without mounting its multi-step practice activity.
    if (scene?.video) return scene;
    if (this.config?.model) return { model: this.config.model, alt: this.config.imageAlt };
    const image = this.config?.image ?? this.project.coverImage;
    return image ? { image, alt: this.config?.imageAlt ?? this.project.title } : undefined;
  }
}
