import { Component, computed, input } from '@angular/core';
import type { ChoiceProgressionView } from '../../domain/choice-progression';

@Component({
  selector: 'app-choice-progression-panel',
  templateUrl: './choice-progression-panel.component.html',
  styleUrl: './choice-progression-panel.component.scss',
})
export class ChoiceProgressionPanelComponent {
  readonly progression = input.required<ChoiceProgressionView>();
  readonly choiceLabel = input.required<string>();
  readonly availableCount = input.required<number>();
  readonly totalCount = input.required<number>();
  readonly stageIndexes = computed(() =>
    Array.from({ length: this.progression().stageCount }, (_, index) => index),
  );
}
