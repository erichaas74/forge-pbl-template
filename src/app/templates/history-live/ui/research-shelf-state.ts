import { Injectable, signal } from '@angular/core';
import type { ResearchCategory } from '../domain/history-live-research';

/** Presentation state lives above the work-step switch; source pins use the runtime adapter. */
@Injectable({ providedIn: 'root' })
export class ResearchShelfState {
  readonly categories = signal<readonly ResearchCategory[]>([]);
  readonly items = signal<readonly string[]>([]);
  readonly focusRequest = signal<{ category: ResearchCategory } | undefined>(undefined);
  open(category: ResearchCategory): void {
    if (!this.categories().includes(category)) this.categories.update((ids) => [...ids, category]);
    this.focusRequest.set({ category });
  }
  toggleCategory(category: ResearchCategory): void {
    this.categories.update((ids) =>
      ids.includes(category) ? ids.filter((id) => id !== category) : [...ids, category],
    );
  }
  toggleItem(id: string): void {
    this.items.update((ids) =>
      ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id],
    );
  }
}
