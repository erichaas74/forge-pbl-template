import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
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
@Component({
  selector: 'app-engineering-design-page',
  imports: [
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
  readonly activeDesign = computed(() =>
    this.practicing()
      ? (this.runtime.snapshot().practiceDesign ?? this.config.learningSequence!.practiceDesign)
      : this.runtime.snapshot().design,
  );
  readonly preview = computed(() =>
    this.config.designSamples?.find((s) => s.id === this.sampleId()),
  );
  private readonly injector = inject(Injector);
  readonly simulationInjector = Injector.create({
    parent: this.injector,
    providers: [
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
  }));
  selectStep(id: string): void {
    this.runtime.selectLearningStep(id);
    this.sampleId.set('');
    this.restore.set(undefined);
    this.panel.set('');
    this.presenting.set(false);
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
          settings: { ...capture.settings, workspace: step.workspace, learningStepId: step.id },
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
