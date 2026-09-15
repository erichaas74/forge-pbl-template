import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bindLessonFocus } from '../project-lessons/project-lesson-focus';
import { inquiryTargetReady, latestInquiryAttempt } from './inquiry.models';
import { INQUIRY_WORKSPACE } from './inquiry-workspace.port';
import { InquiryExampleComponent } from './inquiry-example.component';

@Component({
  selector: 'app-inquiry-workspace',
  imports: [FormsModule, InquiryExampleComponent],
  templateUrl: './inquiry-workspace.component.html',
  styleUrl: './inquiry-workspace.component.scss',
})
export class InquiryWorkspaceComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  readonly runtime = inject(INQUIRY_WORKSPACE);
  readonly config = this.runtime.config.inquiry!;
  readonly hearingRequested = output<void>();
  readonly lessonNumber = signal(1);
  readonly lesson = computed(() => this.config.lessons[this.lessonNumber() - 1]!);
  readonly examples = computed(() => this.config.examples?.filter(e => e.lesson === this.lessonNumber()) ?? []);
  readonly selectedSourceId = signal('');
  readonly source = computed(
    () =>
      this.runtime.config.evidence.find((e) => e.id === this.selectedSourceId()) ??
      this.runtime.config.evidence.find((e) => e.id === this.lesson().sourceIds[0])!,
  );
  readonly tab = signal<'work' | 'record'>('work');
  readonly targetId = signal(this.config.targets[0]!.id);
  readonly target = computed(() => this.config.targets.find((t) => t.id === this.targetId())!);
  readonly checking = signal(false);
  readonly feedback = signal('');
  readonly performanceEvidence = signal('');
  readonly needsPerformance = computed(
    () =>
      !!this.latest()?.targetId &&
      !!this.config.targets.find((t) => t.id === this.latest()?.targetId)
        ?.requiresPerformanceEvidence,
  );
  readonly message = signal('');
  readonly blocked = computed(
    () => !!this.lesson().requiresGate && !this.runtime.inquiryGate(this.lesson().requiresGate!),
  );
  readonly latest = computed(() =>
    this.tab() === 'record'
      ? [...this.runtime.inquiryState().attempts]
          .reverse()
          .find((a) => a.targetId === this.targetId())
      : latestInquiryAttempt(this.runtime.inquiryState(), this.lessonNumber()),
  );
  readonly checkPrompt = computed(() =>
    this.tab() === 'record'
      ? `${this.latest() ? 'Use a different example or source detail from your last response. ' : ''}${this.target().prompt}`
      : this.latest()
        ? this.lesson().retry
        : this.lesson().check,
  );
  readonly standards = [...new Set(this.config.targets.map((t) => t.standardId))];
  readonly confirmedCount = computed(
    () => this.config.targets.filter((t) => this.targetReady(t.id)).length,
  );
  readonly checkKey = computed(
    () => `check-${this.tab() === 'record' ? this.targetId() : this.lessonNumber()}`,
  );

  constructor() {
    bindLessonFocus((lesson) => {
      this.runtime.saveInquiryDrafts();
      this.lessonNumber.set(lesson.number);
      this.selectedSourceId.set('');
      this.checking.set(false);
      this.tab.set('work');
      this.message.set('');
    });
  }
  draft(key: string): string {
    return this.runtime.inquiryState().drafts[key] ?? '';
  }
  fieldKey(id: string): string {
    return `lesson-${this.lessonNumber()}-${id}`;
  }
  targetReady(id: string): boolean {
    return inquiryTargetReady(this.runtime.inquiryState(), id);
  }
  standardReady(id: string): boolean {
    return this.config.targets
      .filter((t) => t.standardId === id)
      .every((t) => this.targetReady(t.id));
  }
  changeTab(tab: 'work' | 'record'): void {
    this.runtime.saveInquiryDrafts();
    this.tab.set(tab);
    this.checking.set(false);
    this.message.set('');
    this.reveal(tab === 'record' ? '#concept' : '.response-card');
  }
  selectTarget(id: string): void {
    this.runtime.saveInquiryDrafts();
    this.targetId.set(id);
    this.checking.set(false);
    this.selectedSourceId.set(this.target().sourceIds[0]!);
    this.message.set('');
    this.reveal('.response-card');
  }
  startCheck(): void {
    this.checking.set(true);
    this.message.set('');
    this.reveal('#independent-response');
  }
  saveWork(): void {
    this.runtime.saveInquiryDrafts();
    this.message.set(
      this.runtime.saveState() === 'local'
        ? 'Work is still on this page, but could not be saved. Keep the page open and download your portfolio.'
        : 'Draft saved on this device. A saved draft is not a completed standard.',
    );
  }
  private reveal(selector: string): void {
    afterNextRender(
      () => {
        const element = this.host.nativeElement.querySelector<HTMLElement>(selector);
        element?.scrollIntoView?.({ block: 'nearest', behavior: 'instant' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
  submit(): void {
    if (!this.checking()) return;
    if (
      this.runtime.submitInquiryAttempt(
        this.lessonNumber(),
        this.checkPrompt(),
        this.draft(this.checkKey()),
        this.tab() === 'record' ? this.targetId() : undefined,
      )
    ) {
      this.checking.set(false);
      this.runtime.updateInquiryDraft(this.checkKey(), '');
      this.runtime.saveInquiryDrafts();
      this.message.set(
        this.runtime.saveState() === 'local'
          ? 'Response kept on this page, but storage is unavailable. Keep the page open and download your portfolio.'
          : 'Response saved for demo review. Earlier attempts are kept. This is not an official submission.',
      );
    }
  }
  review(decision: 'ready' | 'revise'): void {
    const attempt = this.latest();
    if (!attempt) return;
    if (decision === 'ready' && this.needsPerformance() && !this.performanceEvidence().trim())
      return;
    this.runtime.reviewInquiryAttempt(
      attempt.id,
      decision,
      this.feedback(),
      this.performanceEvidence(),
    );
    this.performanceEvidence.set('');
    this.feedback.set('');
    this.message.set(
      this.runtime.saveState() === 'local'
        ? 'Demo review could not be saved. Keep this page open and download the portfolio.'
        : 'Demo review saved. Official mastery is unchanged.',
    );
  }
  exportPortfolio(): void {
    this.runtime.saveInquiryDrafts();
    const state = this.runtime.inquiryState();
    const lines = [
      `# ${this.runtime.config.title} — individual portfolio`,
      '',
      `Learner: ${this.runtime.config.viewer.studentDisplayName}`,
      'Local demonstration export. Reviews are not official mastery.',
      '',
    ];
    for (const lesson of this.config.lessons) {
      lines.push(`## Lesson ${lesson.number}: ${lesson.title}`);
      for (const field of lesson.fields)
        lines.push(
          `### ${field.label}`,
          state.drafts[`lesson-${lesson.number}-${field.id}`] ?? '(No draft)',
          '',
        );
      const extension = state.drafts[`lesson-${lesson.number}-side-quest`];
      if (extension) lines.push('### Side quest', extension, '');
    }
    for (const target of this.config.targets)
      lines.push(
        `## ${target.label} — ${target.standardId}`,
        state.drafts[`target-${target.id}`] ?? '(No practice note)',
        '',
      );
    for (const attempt of state.attempts) {
      const review = state.reviews[attempt.id];
      lines.push(
        `## ${attempt.targetId ?? `Lesson ${attempt.lesson}`} — ${attempt.createdAt}`,
        attempt.prompt,
        '',
        attempt.response,
        '',
        review ? `Demo review: ${review.decision}. ${review.feedback}` : 'Awaiting review.',
        ...(attempt.evidenceDrafts
          ? [
              '### Work at the time of this response',
              ...Object.entries(attempt.evidenceDrafts)
                .filter(([key]) => !key.startsWith('check-'))
                .map(([key, value]) => `${key}\n${value}\n`),
            ]
          : []),
        '',
      );
    }
    lines.push(
      '## Review history',
      ...(state.reviewHistory ?? []).map(
        (r) =>
          `${r.createdAt} | ${r.attemptId} | ${r.reviewerId} | demo: ${r.decision} | ${r.feedback} | ${r.performanceEvidence ?? ''}`,
      ),
      '',
      '## Source packet',
      ...this.runtime.config.evidence.map(
        (e) => `${e.title}: ${e.citation}\n${e.sourceUrl ?? ''}\n`,
      ),
    );
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/markdown' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.runtime.config.projectId}-portfolio.md`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
