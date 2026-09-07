import {
  afterNextRender,
  Component,
  inject,
  ElementRef,
  Injector,
  signal,
  computed,
} from '@angular/core';

import { pitchMissingRequirements } from '../core/history-live-state';
import type { HistoryLiveAssignmentAdvocate } from '../domain/history-live.models';
import { HistoryLiveRuntimeService } from '../runtime/history-live-runtime.service';
import { StoryInvestigationPreviewComponent } from './story-investigation-preview.component';

@Component({
  selector: 'app-history-live-assignment-desk',
  imports: [StoryInvestigationPreviewComponent],
  templateUrl: './assignment-desk.component.html',
  styleUrl: './assignment-desk.component.scss',
})
export class AssignmentDeskComponent {
  readonly runtime = inject(HistoryLiveRuntimeService);
  readonly pitchStep = signal(0);
  readonly pitchSteps = [
    'Enter the Moment',
    'Question',
    'Evidence',
    'Perspective',
    'Prediction',
    'Audience',
    'Review',
  ];
  private readonly injector = inject(Injector);
  readonly missingRequirements = computed(() =>
    pitchMissingRequirements(this.runtime.state().pitch),
  );
  setPitchStep(index: number): void {
    this.pitchStep.set(index);
    afterNextRender(
      () => {
        const target = this.element.nativeElement.querySelector<HTMLElement>(
          index === 0
            ? '#assignment-title'
            : '.pitch-form label:not([hidden]) input, .pitch-form label:not([hidden]) textarea, .pitch-form label:not([hidden]) select',
        );
        target?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        target?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }

  updatePitch(
    field:
      | 'asOfDate'
      | 'reportingMode'
      | 'beatId'
      | 'headline'
      | 'storyQuestion'
      | 'whyAirtime'
      | 'evidenceNeeded'
      | 'initialPrediction'
      | 'opposingChallenge',
    event: Event,
  ): void {
    const control = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    this.runtime.updatePitch(field, control.value);
  }

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  openBeat(beatId: string): void {
    const lead = this.firstLead(beatId);
    if (!lead) {
      this.runtime.pitchOwnStory(beatId);
      return;
    }
    const target = this.element.nativeElement.querySelector<HTMLElement>(`[id="lead-${lead}"]`);
    target?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    target?.focus({ preventScroll: true });
  }
  firstLead(beatId: string): string {
    return this.runtime.availableLeads().find((lead) => lead.beatId === beatId)?.id ?? '';
  }

  advocateFor(leadId: string): HistoryLiveAssignmentAdvocate | undefined {
    return this.runtime.assignmentScene()?.advocates.find((advocate) => advocate.leadId === leadId);
  }
}
