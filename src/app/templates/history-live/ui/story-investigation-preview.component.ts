import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { ResearchShelfState } from './research-shelf-state';
import type { ResearchCategory } from '../domain/history-live-research';

@Component({
  selector: 'app-history-live-story-investigation-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './story-investigation-preview.component.html',
  styleUrl: './story-investigation-preview.component.scss',
})
export class StoryInvestigationPreviewComponent {
  readonly shelf = inject(ResearchShelfState);
  readonly guide: readonly {
    category: ResearchCategory;
    label: string;
    title: string;
    lookFor: string;
  }[] = [
    {
      category: 'documents',
      label: 'Primary source documents',
      title: 'Examine the record',
      lookFor:
        'Look for the creator, date, recipient, place, and document type. Read the original wording or inspect the document image.',
    },
    {
      category: 'witnesses',
      label: 'Witness testimony',
      title: 'Read an account',
      lookFor:
        'Look for who gave the account, when it was recorded, where the person was, and what they say they saw or heard.',
    },
    {
      category: 'events',
      label: 'Live events',
      title: 'Follow the sequence',
      lookFor:
        'Look at the dates, locations, people, and recorded actions. Check which source is attached to each event record.',
    },
    {
      category: 'interviews',
      label: 'Interviews',
      title: 'Explore questions and answers',
      lookFor:
        'Read the speaker’s name and role, the question, and the cited record. These scripted summaries are separate from the original documents.',
    },
  ];
  readonly historicalEvent = input.required<string>();
  readonly headline = input('');
  readonly buildStory = output<void>();
}
