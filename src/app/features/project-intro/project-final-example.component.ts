import { NgComponentOutlet } from '@angular/common';
import { PresentationExamplesComponent } from '../../shared/media/presentation-examples.component';
import {
  afterNextRender,
  Component,
  createEnvironmentInjector,
  DestroyRef,
  ElementRef,
  EnvironmentInjector,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECT_INTRO_CONFIG } from '../../shared/project-intro/project-intro.runtime';
import { loadCompletedSample } from '../../runtime/project-showcase/completed-sample.registry';
import type { CompletedSample } from '../../runtime/project-showcase/completed-sample';

@Component({
  selector: 'app-project-final-example',
  imports: [RouterLink, NgComponentOutlet, PresentationExamplesComponent],
  templateUrl: './project-final-example.component.html',
  styleUrl: './project-final-example.component.scss',
})
export class ProjectFinalExampleComponent {
  readonly config = inject(PROJECT_INTRO_CONFIG);
  readonly sample = signal<CompletedSample | undefined>(undefined);
  readonly previewInjector = signal<EnvironmentInjector | undefined>(undefined);
  readonly error = signal('');
  readonly reviewOpen = signal(false);
  private readonly reviewDialog = viewChild<ElementRef<HTMLDialogElement>>('reviewDialog');
  private readonly parent = inject(EnvironmentInjector);
  private readonly injector = inject(Injector);
  private readonly heading = viewChild<ElementRef<HTMLElement>>('sampleHeading');
  private readonly reviewHeading = viewChild<ElementRef<HTMLElement>>('reviewHeading');
  private generation = 0;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.generation++;
      this.previewInjector()?.destroy();
    });
    void this.restart(false);
  }
  async restart(focus = true): Promise<void> {
    const generation = ++this.generation;
    this.sample.set(undefined);
    this.error.set('');
    this.reviewOpen.set(false);
    this.previewInjector()?.destroy();
    this.previewInjector.set(undefined);
    try {
      const sample = await loadCompletedSample(this.config.projectId);
      if (generation !== this.generation) return;
      this.previewInjector.set(createEnvironmentInjector(sample.providers, this.parent));
      this.sample.set(sample);
      if (focus) this.focusAfterRender(false);
    } catch {
      if (generation === this.generation)
        this.error.set('This sample could not load. Please try again.');
    }
  }
  toggleReview(): void {
    this.reviewDialog()?.nativeElement.showModal();
    this.reviewOpen.set(true);
  }
  private focusAfterRender(review: boolean): void {
    afterNextRender(
      () => {
        const element = (review ? this.reviewHeading() : this.heading())?.nativeElement;
        element?.scrollIntoView({ block: 'nearest' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
}
