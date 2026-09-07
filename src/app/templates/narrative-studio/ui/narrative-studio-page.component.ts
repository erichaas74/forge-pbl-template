import { TaskGuideComponent } from '../../../shared/learning/task-guide.component';
import {
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { NARRATIVE_STAGES, wordCount } from '../core/narrative-studio-state';
import type {
  NarrativeChoiceBlueprint,
  NarrativeStudioStage,
  NarrativeStoryBible,
} from '../domain/narrative-studio.models';
import { NarrativeStudioRuntimeService } from '../runtime/narrative-studio-runtime.service';
import { NarrativeCoachPanelComponent } from './narrative-coach-panel.component';
import { NarrativePlanningConversationComponent } from './narrative-planning-conversation.component';
import { NarrativeStoryMapComponent } from './narrative-story-map.component';

@Component({
  selector: 'app-narrative-studio-page',
  imports: [
    TaskGuideComponent,
    RouterLink,
    NarrativeCoachPanelComponent,
    NarrativePlanningConversationComponent,
    NarrativeStoryMapComponent,
  ],
  templateUrl: './narrative-studio-page.component.html',
  styleUrl: './narrative-studio-page.component.scss',
})
export class NarrativeStudioPageComponent implements OnDestroy {
  readonly runtime = inject(NarrativeStudioRuntimeService);
  readonly stages = NARRATIVE_STAGES;
  readonly wordCount = wordCount;
  readonly chooseNextBranch = signal(false);
  readonly lastSavedNodeId = signal<string | undefined>(undefined);
  readonly nextBranchId = computed(() => {
    const state = this.runtime.state();
    const selectedIsOpen = wordCount(state.scenes[state.selectedNodeId].text) < 20;
    if (!this.chooseNextBranch() && selectedIsOpen) return state.selectedNodeId;
    const sourceId = this.lastSavedNodeId() ?? state.selectedNodeId;
    const source = this.runtime.storyConfig().nodes.find((node) => node.id === sourceId);
    const openChild = source?.choices
      .map((choice) => choice.nextNodeId)
      .find((nodeId) => wordCount(state.scenes[nodeId].text) < 20);
    if (openChild) return openChild;
    return (
      this.runtime
        .storyConfig()
        .nodes.find(
          (node) =>
            node.id !== this.lastSavedNodeId() && wordCount(state.scenes[node.id].text) < 20,
        )?.id ?? state.selectedNodeId
    );
  });
  readonly nextBranchTitle = computed(() => this.destinationTitle(this.nextBranchId()));
  readonly recommendation = computed(() => {
    if (this.runtime.completedSceneCount() < this.runtime.storyConfig().nodes.length)
      return {
        stage: 'map' as const,
        label: 'Choose the next branch',
        purpose: 'Use the map to choose a branch, then write what changes there.',
        ready: `${this.runtime.completedSceneCount()} of ${this.runtime.storyConfig().nodes.length} scenes drafted`,
      };
    if (this.runtime.readiness().length)
      return {
        stage: 'publish' as const,
        label: 'Finish publication checks',
        purpose: 'Read different routes and check that each ending follows from the choices.',
        ready: `${this.runtime.readiness().length} publication checks remain — see Publish for the exact list`,
      };
    return {
      stage: 'publish' as const,
      label: 'Review and publish',
      purpose: 'Share a complete story someone can play.',
      ready: 'Publication checks complete',
    };
  });
  openRecommended(): void {
    this.openStage(this.recommendation().stage);
  }
  destinationTitle(id: string): string {
    return (
      this.runtime.state().scenes[id]?.title ||
      this.runtime.storyConfig().nodes.find((node) => node.id === id)?.mapLabel ||
      id
    );
  }
  readonly playNodeId = signal(this.runtime.config.startNodeId);
  readonly playPath = signal<readonly string[]>([this.runtime.config.startNodeId]);
  readonly publishedPreview = signal(false);
  readonly readerConfig = computed(() =>
    this.publishedPreview() && this.runtime.state().published?.nodes
      ? { ...this.runtime.config, nodes: this.runtime.state().published!.nodes! }
      : this.runtime.storyConfig(),
  );
  readonly playNode = computed(() =>
    this.readerConfig().nodes.find((node) => node.id === this.playNodeId())!,
  );
  readonly playScene = computed(() => {
    const source = this.publishedPreview()
      ? this.runtime.state().published?.scenes
      : this.runtime.state().scenes;
    return source?.[this.playNodeId()];
  });
  readonly playStorm = computed(() =>
    this.runtime.config.stormStages.find((stage) => stage.id === this.playNode().stormStageId)!,
  );
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private priorStage?: string;
  private priorNode?: string;

  constructor() {
    afterRenderEffect(() => {
      const stage = this.runtime.state().stage;
      const nodeId = stage === 'playtest' ? this.playNodeId() : this.runtime.state().selectedNodeId;
      if (stage === this.priorStage && nodeId === this.priorNode) return;
      const interacted = this.priorStage !== undefined;
      this.priorStage = stage;
      this.priorNode = nodeId;
      const host = this.element.nativeElement;
      const view = host.ownerDocument.defaultView;
      view?.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      const navigation = host.querySelector<HTMLElement>('.stage-nav');
      const activeStage = navigation?.querySelector<HTMLElement>('button.active');
      if (navigation && activeStage) {
        navigation.scrollTo({
          left: Math.max(
            0,
            activeStage.offsetLeft - (navigation.clientWidth - activeStage.offsetWidth) / 2,
          ),
          behavior: 'instant',
        });
      }

      const panel = host.querySelector<HTMLElement>('.work-overlay');
      if (panel) {
        panel.scrollTop = 0;
        if (interacted && view?.matchMedia('(max-width: 780px)').matches)
          panel.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      }
      const heading = panel?.querySelector<HTMLElement>('h1, h2');
      if (!heading) return;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    });
  }

  ngOnDestroy(): void {
    this.runtime.destroy();
  }

  canLeave(): boolean {
    this.runtime.flushSave();
    return true;
  }

  openStage(stage: NarrativeStudioStage): void {
    this.chooseNextBranch.set(false);
    this.lastSavedNodeId.set(undefined);
    this.runtime.setStage(stage);
    if (stage === 'playtest') this.restartStory(false);
  }

  selectBranch(nodeId: string): void {
    this.chooseNextBranch.set(false);
    this.lastSavedNodeId.set(undefined);
    this.runtime.selectNode(nodeId);
  }

  checkpointAndChooseNext(): void {
    this.runtime.checkpointScene();
    this.lastSavedNodeId.set(this.runtime.state().selectedNodeId);
    this.chooseNextBranch.set(true);
    const next = this.nextBranchId();
    if (next !== this.runtime.state().selectedNodeId) this.selectBranch(next);
  }

  selectMapNode(nodeId: string): void {
    if (this.runtime.state().stage === 'playtest') {
      this.playNodeId.set(nodeId);
      this.playPath.set([nodeId]);
      return;
    }
    this.selectBranch(nodeId);
  }

  changeBranch(action: 'branch' | 'end' | 'finish'): void {
    this.runtime.changeBranch(action);
    const host = this.element.nativeElement;
    host.ownerDocument.defaultView?.requestAnimationFrame(() => {
      const target = host.querySelector<HTMLElement>(
        action === 'branch' ? '.choice-writer input' : '.branch-outcome',
      );
      target?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      target?.focus({ preventScroll: true });
    });
  }

  inputValue(event: Event): string {
    return (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
  }

  updateBible(key: keyof NarrativeStoryBible, event: Event): void {
    this.runtime.updateBible(key, this.inputValue(event) as never);
  }

  sceneWords(): number {
    return wordCount(this.runtime.selectedScene().text);
  }

  choosePath(choice: NarrativeChoiceBlueprint): void {
    const nextPath = [...this.playPath(), choice.nextNodeId];
    this.playPath.set(nextPath);
    this.playNodeId.set(choice.nextNodeId);
    const next = this.readerConfig().nodes.find((node) => node.id === choice.nextNodeId);
    if (next?.kind === 'ending' && !this.publishedPreview()) this.runtime.recordPlaytest(nextPath);
  }

  restartStory(published: boolean): void {
    this.publishedPreview.set(published);
    this.playNodeId.set(this.runtime.config.startNodeId);
    this.playPath.set([this.runtime.config.startNodeId]);
  }

  playPublished(): void {
    this.runtime.setStage('playtest');
    this.restartStory(true);
  }

  publish(): void {
    if (this.runtime.publish()) this.restartStory(true);
  }
}
