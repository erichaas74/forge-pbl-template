import { Component, inject, ElementRef } from '@angular/core';

import type { HistoryLiveAssignmentAdvocate } from '../domain/history-live.models';
import { HistoryLiveRuntimeService } from '../runtime/history-live-runtime.service';

@Component({
  selector: 'app-history-live-assignment-desk',
  templateUrl: './assignment-desk.component.html',
  styleUrl: './assignment-desk.component.scss',
})
export class AssignmentDeskComponent {
  readonly runtime = inject(HistoryLiveRuntimeService);

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
