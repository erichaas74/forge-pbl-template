import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  viewChild,
} from '@angular/core';
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
  readonly readOnly = input(false);
  private readonly injector = inject(Injector);
  private readonly entryHeading = viewChild<ElementRef<HTMLElement>>('entryHeading');
  constructor() {
    effect(() => {
      if (this.readOnly() && this.runtime.state().room === 'ballot')
        this.runtime.enterRoom('verdict');
    });
  }

  selectEntry(index: number): void {
    this.runtime.pauseSession();
    this.runtime.state.update((state) => ({
      ...state,
      room: 'premiere',
      activeSegmentIndex: index,
    }));
    afterNextRender(
      () => {
        const element = this.entryHeading()?.nativeElement;
        element?.scrollIntoView({ block: 'nearest' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
  revealSample(): void {
    this.runtime.pauseSession();
    this.runtime.enterRoom('verdict');
  }
  evidence(id: string) {
    return this.runtime.config.evidence.find((item) => item.id === id);
  }

  updateReflection(event: Event): void {
    if (this.readOnly()) return;
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
