import { bindLessonFocus } from '../../../shared/project-lessons/project-lesson-focus';
import { WorkspaceToolsComponent } from '../../../shared/project-lessons/workspace-tools.component';
import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
  effect,
  untracked,
} from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  ENGINEERING_CONFIG,
  EngineeringDesignRuntime,
} from '../runtime/engineering-design.runtime';
import {
  DESIGN_SIMULATIONS,
  DESIGN_VIEW_REQUEST,
  DESIGN_CHANGE,
  DESIGN_CAPTURE,
  DESIGN_CAPTURE_BATCH,
  DESIGN_CHROME,
  type DesignChrome,
} from '../../../shared/engineering/design-simulation.registry';
import { BlockBuilderComponent } from './block-builder.component';
import { EngineeringExhibitComponent } from './engineering-exhibit.component';
import { DesignSampleGalleryComponent } from './design-sample-gallery.component';
import { EngineeringLearningGuideComponent } from './engineering-learning-guide.component';
import type { EngineeringLearningStep } from '../domain/engineering-design.models';
import type { DesignCapture, BlockDesign } from '../../../shared/engineering/block-design';
import { DESIGN_EDITOR, DesignEditor } from '../../../shared/engineering/design-editor';
import type { DesignWalkthroughAction } from '../../../shared/engineering/design-walkthrough';
@Component({
  selector: 'app-engineering-design-page',
  imports: [WorkspaceToolsComponent,
    NgComponentOutlet,
    NgTemplateOutlet,
    RouterLink,
    FormsModule,
    BlockBuilderComponent,
    EngineeringExhibitComponent,
    DesignSampleGalleryComponent,
    EngineeringLearningGuideComponent,
  ],
  templateUrl: './engineering-design-page.component.html',
  styleUrl: './engineering-design-page.component.scss',
})
export class EngineeringDesignPageComponent {
  readonly config = inject(ENGINEERING_CONFIG);
  readonly runtime = inject(EngineeringDesignRuntime);
  readonly simulation = inject(DESIGN_SIMULATIONS).require(this.config.simulationId);
  readonly panel = signal('');
  readonly chrome = signal<DesignChrome | undefined>(undefined);
  readonly presenting = signal(false);
  readonly sampleId = signal('');
  readonly learningSteps = this.config.learningSequence?.steps ?? [];
  readonly learningStep = computed<EngineeringLearningStep | undefined>(
    () =>
      this.learningSteps.find((step) => step.id === this.runtime.snapshot().learningStepId) ??
      this.learningSteps[0],
  );
  readonly stepIndex = computed(() =>
    this.learningSteps.findIndex((step) => step.id === this.learningStep()?.id),
  );
  readonly practicing = computed(() => this.learningStep()?.workspace === 'practice');
  readonly tasks = computed(() => this.learningStep()?.tasks ?? []);
  readonly taskIndex = computed(() =>
    Math.max(
      0,
      this.tasks().findIndex((t) => t.id === this.runtime.snapshot().learningTaskId),
    ),
  );
  readonly task = computed(() => this.tasks()[this.taskIndex()]);
  readonly guided = computed(() => !!this.task());
  readonly taskAnswer = computed(
    () =>
      this.runtime.snapshot().walkthroughNotes?.[this.learningStep()?.id + '/' + this.task()?.id] ??
      '',
  );
  readonly walkthroughStatus = signal('');
  readonly finished = signal(false);
  readonly canContinue = computed(() => {
    const task = this.task();
    if (!task) return false;
    if (!this.chrome()?.walkthrough?.ready()) return false;
    if (
      task.requiredEvidenceCount &&
      this.runtime
        .snapshot()
        .trials.filter(
          (t) =>
            t.settings['learningStepId'] === this.learningStep()?.id &&
            t.settings['learningTaskId'] === task.id &&
            JSON.stringify(t.design) === JSON.stringify(this.activeDesign()),
        ).length < task.requiredEvidenceCount
    )
      return false;
    if (
      task.requiredTargetId &&
      !this.activeDesign().targets.some((t) => t.id === task.requiredTargetId)
    )
      return false;
    if (!task.response) return true;
    const answer = this.taskAnswer().trim();
    return (
      !!answer &&
      (!task.response.unit ||
        (Number.isFinite(Number(answer)) && Number(answer) >= 0 && Number(answer) <= 2400))
    );
  });
  readonly previousNotes = computed(() =>
    this.learningSteps.flatMap((step) =>
      (step.tasks ?? []).flatMap((task) => {
        const answer = this.runtime.snapshot().walkthroughNotes?.[step.id + '/' + task.id];
        return answer
          ? [
              {
                title: task.title,
                answer: answer + (task.response?.unit ? ' ' + task.response.unit : ''),
              },
            ]
          : [];
      }),
    ),
  );
  readonly activeDesign = computed(() =>
    this.practicing()
      ? (this.runtime.snapshot().practiceDesign ?? this.config.learningSequence!.practiceDesign)
      : this.runtime.snapshot().design,
  );
  readonly preview = computed(() =>
    this.config.designSamples?.find((s) => s.id === this.sampleId()),
  );
  readonly editor = new DesignEditor(
    () => this.activeDesign(),
    (d) => this.saveActiveDesign(d),
    () => !this.preview() && !this.presenting(),
  );
  constructor() {
    bindLessonFocus((lesson) => {
      const target = lesson.focusTarget;
      if (this.learningSteps.some(step => step.id === target)) this.selectStep(target!);
      else if (target === 'explanation' || target === 'presentation') {
        const last = this.learningSteps.at(-1);
        if (last) this.selectStep(last.id);
        if (target === 'explanation') this.panel.set('explain');
        else this.presenting.set(true);
      }
    });
    effect(() => {
      this.activeDesign();
      const scope = this.practicing() ? 'practice' : 'project';
      untracked(() => this.editor.sync(scope));
    });
  }
  private readonly injector = inject(Injector);
  readonly simulationInjector = Injector.create({
    parent: this.injector,
    providers: [
      { provide: DESIGN_EDITOR, useValue: this.editor },
      {
        provide: DESIGN_CHROME,
        useValue: (chrome: DesignChrome | undefined) => this.chrome.set(chrome),
      },
      {
        provide: DESIGN_CHANGE,
        useValue: (design: BlockDesign) => {
          if (!this.preview()) this.saveActiveDesign(design);
        },
      },
      {
        provide: DESIGN_CAPTURE,
        useValue: (capture: DesignCapture) => {
          if (!this.preview()) this.runtime.capture(this.tagCapture(capture));
        },
      },
      {
        provide: DESIGN_CAPTURE_BATCH,
        useValue: (captures: readonly DesignCapture[]) => {
          if (!this.preview()) this.runtime.captureBatch(captures.map((c) => this.tagCapture(c)));
        },
      },
      {
        provide: DESIGN_VIEW_REQUEST,
        useValue: (view: 'build' | 'observe') => {
          if (view === 'build' && !this.preview() && !this.practicing()) {
            if (this.panel() !== 'build') this.togglePanel('build');
          } else if (view === 'observe') {
            this.panel.set('');
            this.focusCanvas();
          }
        },
      },
    ],
  });
  private readonly supportPanel = viewChild<ElementRef<HTMLElement>>('supportPanel');
  private readonly canvasRegion = viewChild<ElementRef<HTMLElement>>('canvasRegion');
  readonly restore = signal<DesignCapture | undefined>(this.savedContext());
  readonly simulationInputs = computed(() => ({
    design: this.preview()?.design ?? this.activeDesign(),
    restore: this.restore(),
    active: true,
    presentation: this.presenting(),
    checks: this.preview() || this.practicing() ? [] : (this.runtime.snapshot().checks ?? []),
    readOnly: !!this.preview(),
    building: this.panel() === 'build',
    ...(this.learningStep() ? { activity: this.learningStep()!.activity } : {}),
    ...(this.guided() ? { walkthrough: this.task().setup } : {}),
  }));
  selectStep(id: string): void {
    this.runtime.selectLearningStep(id);
    this.sampleId.set('');
    this.restore.set(undefined);
    this.panel.set('');
    this.presenting.set(false);
    this.finished.set(false);
    this.walkthroughStatus.set('');
  }
  moveTask(direction: -1 | 1): void {
    if (direction === 1 && !this.canContinue()) return;
    let step = this.stepIndex(),
      task = this.taskIndex() + direction;
    if (task < 0) {
      step--;
      task = (this.learningSteps[step]?.tasks?.length ?? 1) - 1;
    }
    if (task >= this.tasks().length && direction === 1) {
      step++;
      task = 0;
    }
    const next = this.learningSteps[step],
      nextTask = next?.tasks?.[task];
    if (!nextTask) {
      if (direction === 1) this.finished.set(true);
      return;
    }
    this.selectStep(next.id);
    this.runtime.selectLearningTask(next.id, nextTask.id);
  }
  answerTask(answer: string): void {
    this.runtime.saveWalkthroughNote(this.learningStep()!.id, this.task().id, answer);
    if (this.task().response?.saveAs === 'exhibit') this.runtime.saveText('exhibit', answer);
  }
  runTaskAction(action: DesignWalkthroughAction): void {
    this.walkthroughStatus.set('');
    this.chrome()?.walkthrough?.run(action);
  }
  loadTaskSample(): void {
    const id = this.task()?.sampleId;
    if (!id) return;
    this.runtime.useDesignSample(id);
    this.walkthroughStatus.set('Starting challenge loaded. Your previous monument is backed up.');
  }
  answerStep(answer: string): void {
    const question = this.learningStep()?.question;
    if (question) this.runtime.saveResearch(question.researchId, answer);
  }
  saveActiveDesign(design: BlockDesign): void {
    this.runtime.saveDesign(design, this.practicing() ? 'practice' : 'project');
  }
  private tagCapture(capture: DesignCapture): DesignCapture {
    const step = this.learningStep();
    return step
      ? {
          ...capture,
          settings: {
            ...capture.settings,
            workspace: step.workspace,
            learningStepId: step.id,
            ...(this.task() ? { learningTaskId: this.task().id } : {}),
          },
        }
      : capture;
  }
  readonly researchCount = computed(
    () => this.config.research.filter((r) => this.runtime.snapshot().research[r.id]?.trim()).length,
  );
  togglePanel(panel: string): void {
    if (panel === 'build') this.presenting.set(false);
    this.panel.set(this.panel() === panel ? '' : panel);
    afterNextRender(
      () => {
        const element = (this.panel() ? this.supportPanel() : this.canvasRegion())?.nativeElement;
        element?.scrollIntoView({ block: 'nearest' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
  previewSample(id: string): void {
    if (this.practicing()) return;
    if (!this.config.designSamples?.some((s) => s.id === id)) return;
    this.sampleId.set(id);
    this.restore.set(undefined);
    this.presenting.set(false);
    this.panel.set('');
    this.focusCanvas();
  }
  stopPreview(): void {
    this.sampleId.set('');
    this.restore.set(undefined);
    this.presenting.set(false);
    this.focusCanvas();
  }
  useSample(): void {
    const sample = this.preview();
    if (!sample) return;
    this.runtime.useDesignSample(sample.id);
    this.stopPreview();
    this.togglePanel('build');
  }
  restorePreviousDesign(): void {
    this.runtime.restoreDesignBackup();
    this.stopPreview();
  }
  private focusCanvas(): void {
    afterNextRender(
      () => {
        const element = this.canvasRegion()?.nativeElement;
        element?.scrollIntoView({ block: 'nearest' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
  private savedContext(): DesignCapture | undefined {
    const snapshot = this.runtime.snapshot();
    const last = [...snapshot.trials]
      .reverse()
      .find((trial) => (trial.settings['workspace'] === 'practice') === this.practicing());
    return last ? { ...last, design: this.activeDesign() } : undefined;
  }
  replay(trial: DesignCapture): void {
    this.sampleId.set('');
    const workspace = trial.settings['workspace'] === 'practice' ? 'practice' : 'project';
    const step =
      this.learningSteps.find((s) => s.id === trial.settings['learningStepId']) ??
      this.learningSteps.find((s) => s.workspace === workspace);
    if (step) this.runtime.selectLearningStep(step.id);
    this.runtime.saveDesign(trial.design, workspace);
    this.restore.set(trial);
    this.presenting.set(false);
    this.panel.set('');
  }
  exportNotebook(): void {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            projectId: this.config.projectId,
            projectVersion: this.config.version,
            ...this.runtime.snapshot(),
          },
          null,
          2,
        ),
      ],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.config.projectId}-notebook.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
