import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { DebateVoteCategory } from '../domain/debate-studio.models';
import { DebateStudioRuntimeService } from '../runtime/debate-studio-runtime.service';

@Component({
  selector: 'app-debate-showcase',
  imports: [RouterLink],
  templateUrl: './debate-showcase.component.html',
  styleUrl: './debate-showcase.component.scss',
})
export class DebateShowcaseComponent {
  readonly runtime = inject(DebateStudioRuntimeService);

  updateReflection(event: Event): void {
    this.runtime.updateReflection((event.target as HTMLTextAreaElement).value);
  }

  choiceLabel(category: DebateVoteCategory, choiceId: string | undefined): string {
    return (
      this.runtime.voteOptions(category).find((option) => option.id === choiceId)?.label ??
      'No votes yet'
    );
  }

  tally(categoryId: string, choiceId: string): number {
    return this.runtime.categoryTally(categoryId)[choiceId] ?? 0;
  }

  percentage(categoryId: string, choiceId: string): number {
    const tally = this.runtime.categoryTally(categoryId);
    const total = Object.values(tally).reduce((sum, value) => sum + value, 0);
    return total === 0 ? 0 : Math.round(((tally[choiceId] ?? 0) / total) * 100);
  }
}
