import { afterRenderEffect, Component, computed, effect, ElementRef, inject, signal, untracked } from '@angular/core';
import { PROJECT_LESSON_FOCUS } from '../../../shared/project-lessons/project-lesson-focus';
import { wordCount } from '../core/narrative-studio-state';
import type { NarrativePreviewTool } from '../domain/narrative-preview.models';
import type { NarrativeSceneDraft, NarrativeStudioProjectConfig } from '../domain/narrative-studio.models';
import { NarrativeWeekRuntimeService } from '../runtime/narrative-week-runtime.service';
import { NarrativeStoryMapComponent } from './narrative-story-map.component';

interface TemporaryReading {
  readonly path: readonly string[];
  readonly title: string;
  readonly config: NarrativeStudioProjectConfig;
  readonly scenes: Readonly<Record<string, NarrativeSceneDraft>>;
}

@Component({
  selector: 'app-narrative-week-workspace',
  imports: [NarrativeStoryMapComponent],
  providers: [NarrativeWeekRuntimeService],
  templateUrl: './narrative-week-workspace.component.html',
  styleUrl: './narrative-week-workspace.component.scss',
})
export class NarrativeWeekWorkspaceComponent {
  readonly studio = inject(NarrativeWeekRuntimeService);
  private readonly lesson = inject(PROJECT_LESSON_FOCUS, { optional: true });
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly focusRequest = signal(0);
  readonly selectedLesson = signal(1);
  readonly weeks = this.studio.config.previewWeeks!;
  readonly week = computed(() => this.weeks[Math.floor((this.selectedLesson() - 1) / 2)]);
  readonly sessionIndex = computed(() => (this.selectedLesson() - 1) % 2);
  readonly session = computed(() => this.week().sessions[this.sessionIndex()]);
  readonly runtime = computed(() => this.studio.forWeek(this.week()));
  readonly tool = signal<NarrativePreviewTool>('write');
  readonly tools = [ { id: 'write', label: 'Scene writer' }, { id: 'map', label: 'Branch map' },
    { id: 'revise', label: 'Compare & revise' }, { id: 'read', label: 'Play story' } ] as const;
  readonly extraTool = computed(() => this.tool() !== this.session().tool);
  readonly wordCount = wordCount;
  readonly sample = computed(() => this.week().scenes.find((scene) => scene.id === this.runtime().state().selectedNodeId));
  readonly path = signal<readonly string[]>([]);
  readonly replay = signal<TemporaryReading | undefined>(undefined);
  readonly readings = signal<Readonly<Record<string, readonly TemporaryReading[]>>>({});
  readonly currentReadings = computed(() => this.readings()[this.week().id] ?? []);
  readonly readerConfig = computed(() => this.replay()?.config ?? this.runtime().storyConfig());
  readonly readerScenes = computed(() => this.replay()?.scenes ?? this.runtime().state().scenes);
  readonly readerId = computed(() => this.path().at(-1) ?? this.week().startNodeId);
  readonly readerNode = computed(() => this.readerConfig().nodes.find((node) => node.id === this.readerId())!);
  readonly readerScene = computed(() => this.readerScenes()[this.readerId()]);
  readonly inputValue = (event: Event): string => (event.target as HTMLInputElement).value;

  constructor() {
    effect(() => {
      const number = this.lesson?.()?.number ?? 1;
      untracked(() => this.openLesson(number));
    });
    afterRenderEffect(() => {
      this.selectedLesson();
      // Keep the interactive activity in view without changing the shared standards header.
      this.element.nativeElement.scrollIntoView?.({ block: 'start', behavior: 'instant' });
    });
    afterRenderEffect(() => {
      if (!this.focusRequest()) return;
      const region = this.element.nativeElement.querySelector<HTMLElement>('.active-surface');
      region?.focus({ preventScroll: true });
      region?.scrollIntoView?.({ block: 'nearest', behavior: 'instant' });
    });
  }

  openLesson(number: number): void {
    if (!Number.isInteger(number) || number < 1 || number > 8) return;
    this.selectedLesson.set(number);
    const preferred = this.session().nodeId;
    const target = this.runtime().storyConfig().nodes.some((node) => node.id === preferred) ? preferred : this.week().startNodeId;
    this.runtime().selectNode(target);
    this.tool.set(this.session().tool);
    this.restart();
  }
  chooseTool(tool: NarrativePreviewTool): void {
    this.tool.set(tool);
    if (tool === 'read') this.restart();
    this.reveal();
  }
  selectScene(id: string): void {
    this.runtime().selectNode(id);
    if (this.tool() !== 'revise') this.tool.set('write');
    this.reveal();
  }
  changeBranch(action: 'branch' | 'end' | 'finish'): void { this.runtime().changeBranch(action); }
  restart(): void { this.replay.set(undefined); this.path.set([this.week().startNodeId]); }
  choosePath(id: string): void {
    if (!this.readerNode().choices.some((choice) => choice.nextNodeId === id)) return;
    this.path.update((path) => [...path, id]);
    if (this.readerNode().kind === 'ending' && !this.replay()) {
      const reading: TemporaryReading = {
        path: [...this.path()], title: this.runtime().state().storyTitle,
        config: structuredClone(this.runtime().storyConfig()),
        scenes: Object.fromEntries(Object.entries(this.runtime().state().scenes).map(([key, scene]) => [key, { ...structuredClone(scene), revisions: [] }])),
      };
      this.readings.update((history) => ({ ...history, [this.week().id]: [...this.currentReadings(), reading].slice(-20) }));
    }
    this.reveal();
  }
  replayPath(reading: TemporaryReading): void {
    this.replay.set(reading); this.path.set([reading.path[0]]); this.tool.set('read'); this.reveal();
  }
  stepBack(index: number): void { this.path.update((path) => path.slice(0, index + 1)); this.reveal(); }
  editReaderScene(): void {
    const id = this.readerId();
    this.replay.set(undefined);
    this.selectScene(this.runtime().storyConfig().nodes.some((node) => node.id === id) ? id : this.week().startNodeId);
  }
  sceneTitle(id: string): string { return this.runtime().state().scenes[id]?.title || 'Untitled scene'; }
  private reveal(): void { this.focusRequest.update((value) => value + 1); }
}
