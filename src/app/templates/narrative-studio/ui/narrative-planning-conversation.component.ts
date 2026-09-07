import { Component, computed, inject, signal } from '@angular/core';

import { NarrativeStudioRuntimeService } from '../runtime/narrative-studio-runtime.service';

@Component({
  selector: 'app-narrative-planning-conversation',
  templateUrl: './narrative-planning-conversation.component.html',
  styleUrl: './narrative-planning-conversation.component.scss',
})
export class NarrativePlanningConversationComponent {
  readonly runtime = inject(NarrativeStudioRuntimeService);
  readonly draft = signal('');
  readonly questionNumber = computed(() =>
    Math.min(this.runtime.planningAnswerCount() + 1, this.runtime.config.planningQuestions.length),
  );

  updateDraft(event: Event): void {
    this.draft.set((event.target as HTMLTextAreaElement).value);
  }

  async send(): Promise<void> {
    const answer = this.draft();
    if (!answer.trim()) return;
    this.draft.set('');
    await this.runtime.answerPlanningQuestion(answer);
  }

  async handleKeydown(event: KeyboardEvent): Promise<void> {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      await this.send();
    }
  }
}
