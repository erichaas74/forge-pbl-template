import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { PROJECT_LESSON_FOCUS } from '../../../shared/project-lessons/project-lesson-focus';
import {
  DESIGN_CAPTURE,
  DESIGN_CHANGE,
  DESIGN_CHROME,
  DESIGN_SIMULATIONS,
  DESIGN_QUEST_PROGRESS,
  DESIGN_VIEW_REQUEST,
  type DesignChrome,
  type DesignQuestProgress,
} from '../../../shared/engineering/design-simulation.registry';
import { DESIGN_EDITOR, DesignEditor } from '../../../shared/engineering/design-editor';
import type { BlockDesign, DesignCapture } from '../../../shared/engineering/block-design';
import {
  ENGINEERING_CONFIG,
  EngineeringDesignRuntime,
} from '../runtime/engineering-design.runtime';
import { BlockBuilderComponent } from './block-builder.component';

@Component({
  selector: 'app-engineering-week-workspace',
  imports: [NgComponentOutlet, NgTemplateOutlet, BlockBuilderComponent],
  templateUrl: './engineering-week-workspace.component.html',
  styleUrl: './engineering-week-workspace.component.scss',
})
export class EngineeringWeekWorkspaceComponent {
  readonly config = inject(ENGINEERING_CONFIG);
  readonly runtime = inject(EngineeringDesignRuntime);
  private readonly lesson = inject(PROJECT_LESSON_FOCUS, { optional: true });
  private readonly injector = inject(Injector);
  readonly selectedLesson = signal(1);
  readonly weekNumber = computed(() => Math.floor((this.selectedLesson() - 1) / 2) + 1);
  readonly week = computed(
    () => this.config.previewWeeks![Math.floor((this.selectedLesson() - 1) / 2)],
  );
  readonly session = computed(() => this.week().sessions[(this.selectedLesson() - 1) % 2]);
  readonly draft = computed(() => this.runtime.snapshot().previewDrafts?.[this.week().id]);
  readonly design = computed(() => this.draft()?.design ?? this.week().starter);
  /** The simulation measures a win; the runtime keeps it once for this week's draft. */
  questReported(state: DesignQuestProgress): void {
    const quest = this.session().quest;
    if (!quest || state.questId !== quest.id) return;
    this.questProgress.set(state);
    if (!state.complete || this.levelComplete()) return;
    try {
      this.runtime.completeQuest(this.week().id, quest.id);
    } catch {
      this.notice.set('The level result could not be saved. Your work is still on this page.');
    }
  }
  readonly chrome = signal<DesignChrome | undefined>(undefined);
  readonly editing = signal(false);
  readonly restore = signal<DesignCapture | undefined>(undefined);
  readonly notice = signal('');
  readonly questProgress = signal<DesignQuestProgress | undefined>(undefined);
  readonly levelComplete = computed(() => {
    const quest = this.session().quest;
    return !!quest && !!this.draft()?.quests?.[quest.id];
  });
  private readonly editorPanel = viewChild<ElementRef<HTMLElement>>('editorPanel');
  private readonly stage = viewChild<ElementRef<HTMLElement>>('stage');
  readonly simulation = inject(DESIGN_SIMULATIONS).require(this.config.simulationId);
  readonly editor = new DesignEditor(
    () => this.design(),
    (design) => this.saveDesign(design),
    () => this.runtime.authoringPreview,
  );
  readonly simulationInjector = Injector.create({
    parent: this.injector,
    providers: [
      { provide: DESIGN_EDITOR, useValue: this.editor },
      {
        provide: DESIGN_CHROME,
        useValue: (chrome: DesignChrome | undefined) => this.chrome.set(chrome),
      },
      { provide: DESIGN_CHANGE, useValue: (design: BlockDesign) => this.saveDesign(design) },
      {
        provide: DESIGN_CAPTURE,
        useValue: (capture: DesignCapture) =>
          this.runtime.capturePreview(this.week().id, {
            ...capture,
            settings: {
              ...capture.settings,
              previewWeekId: this.week().id,
              previewSession: this.selectedLesson(),
            },
          }),
      },
      {
        provide: DESIGN_VIEW_REQUEST,
        useValue: (view: 'build' | 'observe') => this.setEditing(view === 'build'),
      },
      {
        provide: DESIGN_QUEST_PROGRESS,
        useValue: (state: DesignQuestProgress) => this.questReported(state),
      },
    ],
  });
  readonly simulationInputs = computed(() => ({
    design: this.design(),
    activity: this.session().activity,
    restore: this.restore(),
    active: true,
    building: this.editing(),
    weeklyControls: true,
    workspaceKey: String(this.selectedLesson()),
    presentation: false,
    quest: this.session().quest,
    questCompleted: this.levelComplete(),
  }));
  constructor() {
    effect(() => {
      const number = this.lesson?.()?.number ?? 1;
      untracked(() => this.openLesson(number));
    });
  }
  openLesson(number: number): void {
    if (!Number.isInteger(number) || number < 1 || number > 8) return;
    this.selectedLesson.set(number);
    this.runtime.openPreviewWeek(this.week().id);
    this.editor.sync(this.week().id);
    this.editing.set(false);
    this.notice.set('');
    this.questProgress.set(undefined);
    const last = [...(this.draft()?.trials ?? [])]
      .reverse()
      .find((t) => t.settings['previewSession'] === number);
    this.restore.set(
      last
        ? { ...last, design: this.design() }
        : {
            id: 'preview-start-' + number,
            pluginId: this.config.simulationId,
            capturedAt: new Date().toISOString(),
            design: this.design(),
            settings: this.session().settings,
            measurements: [],
          },
    );
  }
  saveDesign(design: BlockDesign): void {
    this.runtime.savePreviewDesign(this.week().id, design);
  }
  setEditing(editing: boolean): void {
    if (this.editing() === editing) return;
    this.editing.set(editing);
    afterNextRender(
      () => {
        const region = (editing ? this.editorPanel() : this.stage())?.nativeElement;
        region?.scrollIntoView({ block: 'nearest' });
        region?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
  replay(trial: DesignCapture): void {
    this.saveDesign(trial.design);
    this.restore.set({ ...trial });
    this.setEditing(false);
    this.notice.set('Recorded design and Sun restored. You can edit it or play the day again.');
  }
}
