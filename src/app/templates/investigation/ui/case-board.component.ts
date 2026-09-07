import { Component, computed, input, output } from '@angular/core';

import type { CaseBoardInputs } from '../case-board/case-board-contracts';

export interface CaseBoardMoveRequest {
  readonly itemId: string;
  readonly sectionId: string;
}

@Component({
  selector: 'app-investigation-case-board',
  templateUrl: './case-board.component.html',
  styleUrl: './case-board.component.scss',
})
export class InvestigationCaseBoardComponent {
  readonly model = input.required<CaseBoardInputs>();
  readonly itemSelected = output<string>();
  readonly moveRequested = output<CaseBoardMoveRequest>();
  readonly noteRequested = output<string>();
  readonly questionRequested = output<string>();

  readonly sections = computed(() =>
    [...this.model().config.sections]
      .sort((left, right) => left.order - right.order)
      .map((section) => ({
        ...section,
        evidence: this.model().evidence.filter(
          (item) => this.model().runtimeState.itemLocations[item.definition.id] === section.id,
        ),
        hypotheses: this.model().hypotheses.filter(
          (item) => this.model().runtimeState.itemLocations[item.id] === section.id,
        ),
      })),
  );

  move(itemId: string, event: Event): void {
    const sectionId = (event.target as HTMLSelectElement).value;
    if (sectionId.length > 0) this.moveRequested.emit({ itemId, sectionId });
  }
}
