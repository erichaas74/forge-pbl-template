import {
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';

import { wordCount } from '../core/narrative-studio-state';
import type {
  NarrativeChoiceBlueprint,
  NarrativeSceneDraft,
  NarrativeStudioProjectConfig,
} from '../domain/narrative-studio.models';
import {
  createNarrativeStoryMapLayout,
  type NarrativeStoryMapNodeLayout,
} from './narrative-story-map.layout';

@Component({
  selector: 'app-narrative-story-map',
  templateUrl: './narrative-story-map.component.html',
  styleUrl: './narrative-story-map.component.scss',
})
export class NarrativeStoryMapComponent {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  constructor() {
    afterRenderEffect(() => {
      this.activeNodeId();
      this.layout();
      const host = this.element.nativeElement;
      const selected = host.querySelector<HTMLElement>('.tree-node.active');
      const viewport = host.querySelector<HTMLElement>('.map-scroll');
      if (selected && viewport)
        viewport.scrollTo({
          left: Math.max(0, selected.offsetLeft - viewport.clientWidth / 2),
          top: Math.max(0, selected.offsetTop - viewport.clientHeight / 2),
          behavior: 'instant',
        });
    });
  }
  readonly config = input.required<NarrativeStudioProjectConfig>();
  readonly scenes = input.required<Readonly<Record<string, NarrativeSceneDraft>>>();
  readonly activeNodeId = input('');
  readonly recommendedNodeId = input('');
  readonly compact = input(false);
  readonly nodeSelected = output<string>();

  readonly layout = computed(() => createNarrativeStoryMapLayout(this.config(), this.compact()));
  readonly activeNode = computed(() =>
    this.config().nodes.find((node) => node.id === this.activeNodeId()),
  );

  scene(nodeId: string): NarrativeSceneDraft | undefined {
    return this.scenes()[nodeId];
  }

  words(nodeId: string): number {
    return wordCount(this.scene(nodeId)?.text ?? '');
  }

  destinationTitle(nodeId: string): string {
    return (
      this.scene(nodeId)?.title ||
      this.config().nodes.find((node) => node.id === nodeId)?.mapLabel ||
      nodeId
    );
  }

  choiceLabel(nodeId: string, choice: NarrativeChoiceBlueprint): string {
    return this.scene(nodeId)?.choiceLabels[choice.id]?.trim() || choice.prompt;
  }

  nodeState(item: NarrativeStoryMapNodeLayout): string {
    if (item.node.id === this.activeNodeId() && this.compact()) return 'Writing here';
    if (item.node.id === this.recommendedNodeId()) return 'Write next';
    if (item.node.id === this.activeNodeId()) return 'Selected';
    if (this.words(item.node.id) >= 20) return 'Saved';
    return item.node.kind === 'ending' ? 'Ending' : 'Scene';
  }

  nodeAccessibleLabel(item: NarrativeStoryMapNodeLayout): string {
    const options = item.node.choices
      .map((choice, index) => `option ${index + 1}: ${this.choiceLabel(item.node.id, choice)}`)
      .join(', ');
    return `${item.node.endingOutcome === 'death' ? 'Dead end, character dies. ' : ''}${this.nodeState(item)}: ${this.scene(item.node.id)?.title || item.node.suggestedTitle}, ${this.words(item.node.id)} words${options ? `. ${item.node.choiceQuestion} ${options}` : ''}`;
  }
}
