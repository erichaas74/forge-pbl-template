import { Component, ElementRef, computed, input, output, signal, viewChild } from '@angular/core';

import { wordCount } from '../core/artifact-validator';
import type {
  ArtifactValidationResult,
  ExhibitSnapshot,
  MuseumBoardSnapshotData,
} from '../domain/exhibit-types';
import { ExhibitRenderHostComponent } from './exhibit-render-host.component';

interface ComposerStepDefinition {
  readonly shortLabel: string;
  readonly title: string;
  readonly guidance: string;
  readonly prompts: readonly string[];
}

const COMPOSER_STEPS: readonly ComposerStepDefinition[] = [
  {
    shortLabel: 'Story',
    title: 'Choose the collection story',
    guidance: 'Decide what these artifacts reveal when a visitor sees them together.',
    prompts: [
      'Name the collection in 12 words or fewer.',
      'Make one claim that every artifact can help prove.',
      'Write for students and families—not only for the teacher.',
    ],
  },
  {
    shortLabel: 'Labels',
    title: 'Write the artifact labels',
    guidance: 'Turn research notes into clear museum labels that support the collection claim.',
    prompts: [
      'Identify each artifact precisely.',
      'Explain material, use, date, or context.',
      'Show how each artifact connects to the central claim.',
    ],
  },
  {
    shortLabel: 'Sources',
    title: 'Credit the research',
    guidance: 'Give visitors a trustworthy trail back to museum and scholarly sources.',
    prompts: [
      'Include at least two reliable sources.',
      'Name the museum, author, collection, or resource.',
      'Check that every citation is understandable on its own.',
    ],
  },
  {
    shortLabel: '3D wing',
    title: 'Connect the MetaSteps wing',
    guidance: 'Attach the shared 3D space visitors will enter from the exhibit hall.',
    prompts: [
      'Give the wing a visitor-friendly title.',
      'Paste the public MetaSteps embed code or viewer URL.',
      'Test sharing without using a private account or password.',
    ],
  },
  {
    shortLabel: 'Video',
    title: 'Prepare the curator presentation',
    guidance: 'Add the short explanation that will greet students and family visitors.',
    prompts: [
      'Use a title that tells visitors what they will learn.',
      'Explain why the artifacts belong together.',
      'Check public sharing and protect student privacy.',
    ],
  },
  {
    shortLabel: 'Review',
    title: 'Inspect and showcase',
    guidance: 'Check the complete visitor experience before creating the next snapshot.',
    prompts: [
      'Read the exhibit once as a first-time visitor.',
      'Open the 3D wing and verify the presentation station.',
      'Fix every flagged item before showcasing.',
    ],
  },
] as const;

@Component({
  selector: 'app-artifact-composer',
  imports: [ExhibitRenderHostComponent],
  templateUrl: './artifact-composer.component.html',
  styleUrl: './artifact-composer.component.scss',
})
export class ArtifactComposerComponent {
  readonly draft = input.required<MuseumBoardSnapshotData>();
  readonly previewSnapshot = input.required<ExhibitSnapshot>();
  readonly validation = input.required<ArtifactValidationResult>();
  readonly publishLabel = input('Publish');
  readonly published = input(false);
  readonly rehangsRemaining = input(0);
  readonly submissionLocked = input(false);
  readonly closed = output<void>();
  readonly titleChanged = output<string>();
  readonly claimChanged = output<string>();
  readonly objectChanged = output<{
    objectId: string;
    field: 'title' | 'description' | 'evidenceConnection';
    value: string;
  }>();
  readonly sourceChanged = output<{ sourceId: string; citation: string }>();
  readonly galleryTitleChanged = output<string>();
  readonly galleryEmbedChanged = output<string>();
  readonly videoTitleChanged = output<string>();
  readonly videoUrlChanged = output<string>();
  readonly publishedRequested = output<void>();
  readonly steps = COMPOSER_STEPS;
  readonly activeStep = signal(0);
  readonly lastEditingStep = signal(0);
  readonly stepHeading = viewChild<ElementRef<HTMLElement>>('stepHeading');
  readonly currentStep = computed(() => this.steps[this.activeStep()]!);
  readonly completedStepCount = computed(
    () => this.steps.slice(0, -1).filter((_, index) => this.isStepComplete(index)).length,
  );
  readonly editingStepCount = this.steps.length - 1;
  readonly completionPercent = computed(() =>
    Math.round((this.completedStepCount() / this.editingStepCount) * 100),
  );

  words(value: string): number {
    return wordCount(value);
  }

  value(event: Event): string {
    return (event.target as HTMLInputElement | HTMLTextAreaElement).value;
  }

  goToStep(index: number): void {
    const next = Math.min(Math.max(index, 0), this.steps.length - 1);
    if (next === this.steps.length - 1 && this.activeStep() < this.steps.length - 1) {
      this.lastEditingStep.set(this.activeStep());
    }
    this.activeStep.set(next);
    queueMicrotask(() => this.stepHeading()?.nativeElement.focus());
  }

  backToEditing(): void {
    this.goToStep(this.lastEditingStep());
  }

  isStepComplete(index: number): boolean {
    const draft = this.draft();
    switch (index) {
      case 0:
        return draft.title.trim().length > 0 && draft.centralClaim.trim().length > 0;
      case 1:
        return (
          draft.objects.length >= 2 &&
          draft.objects.every(
            (object) =>
              object.title.trim().length > 0 &&
              object.description.trim().length > 0 &&
              object.evidenceConnection.trim().length > 0,
          )
        );
      case 2:
        return (
          draft.sources.length >= 2 &&
          draft.sources.every((source) => source.citation.trim().length > 0)
        );
      case 3:
        return (
          (draft.immersiveGallery?.title.trim().length ?? 0) > 0 &&
          (draft.immersiveGallery?.embedUrl.trim().length ?? 0) > 0
        );
      case 4:
        return (
          (draft.videoPresentation?.title.trim().length ?? 0) > 0 &&
          (draft.videoPresentation?.prototype === true ||
            (draft.videoPresentation?.videoUrl?.trim().length ?? 0) > 0)
        );
      case 5:
        return this.validation().valid;
      default:
        return false;
    }
  }
}
