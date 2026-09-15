import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InquiryWorkspaceComponent } from '../../../shared/inquiry/inquiry-workspace.component';
import {
  INQUIRY_WORKSPACE,
  type InquiryWorkspacePort,
} from '../../../shared/inquiry/inquiry-workspace.port';
import { bindLessonFocus } from '../../../shared/project-lessons/project-lesson-focus';
import { HistoryLiveRuntimeService } from '../runtime/history-live-runtime.service';

export function historyInquiryPort(): InquiryWorkspacePort {
  const runtime = inject(HistoryLiveRuntimeService);
  return {
    config: {
      title: runtime.config.title,
      projectId: runtime.config.projectId,
      historicalSetting: runtime.config.historicalWindow,
      centralQuestion: runtime.config.drivingQuestion,
      inquiry: runtime.config.inquiry,
      viewer: {
        studentDisplayName: runtime.viewer.studentDisplayName,
        allowTeacherPreview: runtime.isDemo,
      },
      evidence: runtime.config.sources.map((s) => ({ ...s, sourceUrl: s.url })),
    },
    inquiryState: () => runtime.inquiryState(),
    saveState: () =>
      runtime.saveState() === 'error'
        ? 'local'
        : runtime.saveState() === 'saved'
          ? 'saved'
          : 'saving',
    inquiryGate: (id) => runtime.inquiryGate(id),
    updateInquiryDraft: (key, value) => runtime.updateInquiryDraft(key, value),
    saveInquiryDrafts: () => runtime.flushDrafts(),
    submitInquiryAttempt: (lesson, prompt, response, targetId) =>
      runtime.submitInquiryAttempt(lesson, prompt, response, targetId),
    reviewInquiryAttempt: (id, decision, feedback, performance) =>
      runtime.reviewInquiryAttempt(id, decision, feedback, performance),
    teacherPreview: () => runtime.canProduce(),
    canManageModerator: () => runtime.canProduce(),
    toggleTeacherPreview: () => runtime.setRole(runtime.canProduce() ? 'student' : 'producer'),
  };
}

/** Configured field reporting profile; contains no project IDs or curriculum decisions. */
@Component({
  selector: 'app-field-newsroom',
  imports: [FormsModule, InquiryWorkspaceComponent],
  providers: [{ provide: INQUIRY_WORKSPACE, useFactory: historyInquiryPort }],
  templateUrl: './field-newsroom.component.html',
  styleUrl: './field-newsroom.component.scss',
})
export class FieldNewsroomComponent {
  readonly runtime = inject(HistoryLiveRuntimeService);
  readonly studio = this.runtime.config.fieldStudio!;
  readonly studioOpen = signal(false);
  readonly network = this.runtime.config.networks.find((n) => n.side === this.studio.networkSide)!;
  readonly visuals = this.runtime.config.sources.filter((s) =>
    this.studio.visualSourceIds.includes(s.id),
  );
  readonly selectedVisual = computed(() =>
    this.visuals.find((s) => s.id === this.draft('studio-visual')),
  );
  readonly mayRecord = computed(() => this.runtime.inquiryGate(this.studio.recordingGateId));
  readonly mayRelease = computed(() => this.runtime.inquiryGate(this.studio.finalGateId));
  readonly segment = computed(() =>
    this.runtime.state().schedule.find((s) => s.id === this.runtime.currentStudentSegmentId),
  );
  readonly wordCount = computed(
    () => this.runtime.state().transcript?.trim().split(/\s+/).filter(Boolean).length ?? 0,
  );
  constructor() {
    bindLessonFocus(() => this.closeStudio());
  }
  draft(key: string): string {
    return this.runtime.inquiryState().drafts[key] ?? '';
  }
  openStudio(): void {
    this.runtime.flushDrafts();
    if (this.mayRecord()) this.studioOpen.set(true);
  }
  closeStudio(): void {
    this.runtime.stopRecording();
    this.runtime.flushDrafts();
    this.studioOpen.set(false);
  }
  copyReport(): void {
    if (!this.mayRecord()) return;
    const drafts = this.runtime.inquiryState().drafts;
    this.runtime.updateTranscript(
      drafts['lesson-7-final-report'] ||
        drafts['lesson-5-revision'] ||
        drafts['lesson-4-report'] ||
        '',
    );
    this.runtime.flushDrafts();
  }
  async upload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) await this.runtime.storeRecording(file);
    input.value = '';
  }
}
