import {
  Component,
  computed,
  input,
  signal,
  afterRenderEffect,
  ElementRef,
  inject,
} from '@angular/core';

import type {
  NarrativeChoiceBlueprint,
  NarrativeStudioProjectConfig,
  PublishedNarrative,
} from '../domain/narrative-studio.models';
import { NarrativeStoryMapComponent } from './narrative-story-map.component';

@Component({
  selector: 'app-narrative-showcase-player',
  imports: [NarrativeStoryMapComponent],
  templateUrl: './narrative-showcase-player.component.html',
  styleUrl: './narrative-showcase-player.component.scss',
})
export class NarrativeShowcasePlayerComponent {
  readonly config = input.required<NarrativeStudioProjectConfig>();
  readonly publication = input.required<PublishedNarrative>();
  readonly currentNodeId = signal('');
  readonly storyConfig = computed(() => ({
    ...this.config(),
    nodes: this.publication().nodes ?? this.config().nodes,
  }));
  readonly endingCount = computed(
    () => this.storyConfig().nodes.filter((node) => node.kind === 'ending').length,
  );
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  constructor() {
    afterRenderEffect(() => {
      this.currentNodeId();
      const text = this.element.nativeElement.querySelector<HTMLElement>('.scene-text');
      if (text) text.scrollTop = 0;
      if (
        this.currentNodeId() &&
        this.element.nativeElement.ownerDocument.defaultView?.matchMedia('(max-width: 780px)')
          .matches
      ) {
        this.element.nativeElement
          .querySelector('.sample-reading')
          ?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      }
      this.element.nativeElement
        .querySelector<HTMLElement>('.sample-scene h2')
        ?.focus({ preventScroll: true });
    });
  }
  readonly path = signal<readonly string[]>([]);
  readonly currentNode = computed(() => {
    const id = this.currentNodeId() || this.config().startNodeId;
    return this.storyConfig().nodes.find((node) => node.id === id)!;
  });
  readonly currentScene = computed(() => this.publication().scenes[this.currentNode().id]);
  readonly historicalSetting = computed(() =>
    this.config().historicalSettings.find(
      (setting) => setting.id === this.publication().historicalSettingId,
    ),
  );
  readonly pathLength = computed(() => Math.max(this.path().length, 1));

  choose(choice: NarrativeChoiceBlueprint): void {
    const path = this.path().length ? this.path() : [this.config().startNodeId];
    this.path.set([...path, choice.nextNodeId]);
    this.currentNodeId.set(choice.nextNodeId);
  }

  inspectScene(nodeId: string): void {
    this.currentNodeId.set(nodeId);
    this.path.set([nodeId]);
  }

  back(): void {
    const path = this.path().slice(0, -1);
    if (!path.length) return;
    this.path.set(path);
    this.currentNodeId.set(path.at(-1)!);
  }

  restart(): void {
    this.currentNodeId.set(this.config().startNodeId);
    this.path.set([this.config().startNodeId]);
  }
}
