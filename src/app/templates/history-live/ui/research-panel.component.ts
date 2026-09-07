import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import type { ResearchCategory } from '../domain/history-live-research';
import { researchItems } from '../domain/history-live-research';
import { HistoryLiveRuntimeService } from '../runtime/history-live-runtime.service';
import { ResearchShelfState } from './research-shelf-state';

@Component({
  selector: 'app-history-live-research-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './research-panel.component.html',
  styleUrl: './research-panel.component.scss',
})
export class ResearchPanelComponent {
  readonly side = input.required<'left' | 'right'>();
  readonly runtime = inject(HistoryLiveRuntimeService);
  readonly shelf = inject(ResearchShelfState);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly groups = computed(() =>
    this.side() === 'left'
      ? [
          {
            id: 'documents' as const,
            title: 'Primary source documents',
            description: 'Letters, laws, orders, treaties, and maps.',
          },
          {
            id: 'witnesses' as const,
            title: 'Witness testimony',
            description: 'Recorded accounts by people connected to an event.',
          },
        ]
      : [
          {
            id: 'interviews' as const,
            title: 'Interviews',
            description: 'Scripted questions and answers drawn from cited records.',
          },
          {
            id: 'events' as const,
            title: 'Live events',
            description: 'Dated event records. These are written summaries, not live footage.',
          },
        ],
  );
  private readonly resources = researchItems(this.runtime.config);
  items(category: ResearchCategory) {
    return this.resources.filter((item) => item.category === category);
  }
  sources(ids: readonly string[]) {
    return this.runtime.config.sources.filter((source) => ids.includes(source.id));
  }
  constructor() {
    afterRenderEffect(() => {
      const request = this.shelf.focusRequest();
      if (!request || !this.groups().some((group) => group.id === request.category)) return;
      const button = this.element.nativeElement.querySelector<HTMLElement>(
        `#research-${request.category}-button`,
      );
      button?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      button?.focus({ preventScroll: true });
    });
  }
}
