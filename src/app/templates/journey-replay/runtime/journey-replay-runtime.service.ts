import { computed, inject, Injectable, signal } from '@angular/core';
import type { Subscription } from 'rxjs';

import type {
  JourneyAuthoritySession,
  JourneyClassSummary,
  JourneyMasteryAssessment,
  JourneyResponseMode,
  JourneySubmission,
  StudentJourneyRecord,
} from '../domain/journey-replay.models';
import {
  completeJourneyStep,
  createInitialJourneyRecord,
  currentStep,
  selectJourneyChoice,
  selectedChoice,
  setReplaySceneHidden,
  updateJourneyResponseDraft,
} from '../core/journey-replay.engine';
import {
  journeyAuthorityLocator,
  type JourneySubmissionReviewRequest,
} from '../persistence/journey-replay.authority';
import {
  JOURNEY_REPLAY_AUTHORITY,
  JOURNEY_REPLAY_CONFIG,
  JOURNEY_REPLAY_ENROLLMENT,
  JOURNEY_REPLAY_MEDIA,
  JOURNEY_REPLAY_PERSISTENCE,
} from './journey-replay.tokens';

@Injectable()
export class JourneyReplayRuntimeService {
  readonly config = inject(JOURNEY_REPLAY_CONFIG);
  readonly enrollment = inject(JOURNEY_REPLAY_ENROLLMENT);
  private readonly persistence = inject(JOURNEY_REPLAY_PERSISTENCE);
  private readonly media = inject(JOURNEY_REPLAY_MEDIA, { optional: true });
  private readonly authority = inject(JOURNEY_REPLAY_AUTHORITY, { optional: true });
  private eventSequence = 0;
  private saveTimer?: ReturnType<typeof setTimeout>;
  private serverRevision = 0;
  private authoritySaveQueue: Promise<void> = Promise.resolve();

  readonly state = signal(this.load());
  readonly step = computed(() => currentStep(this.config, this.state()));
  readonly choice = computed(() => selectedChoice(this.config, this.state()));
  readonly progressPercent = computed(() =>
    Math.round((this.state().completedSteps.length / this.config.steps.length) * 100),
  );
  readonly canComplete = computed(() => {
    const draft = this.state().responseDraft;
    return (
      this.choice() !== undefined &&
      (draft.text.trim().length >= 12 ||
        draft.transcript.trim().length >= 12 ||
        draft.mediaAssetId !== undefined)
    );
  });
  readonly session = signal<JourneyAuthoritySession | undefined>(undefined);
  readonly submission = signal<JourneySubmission | undefined>(undefined);
  readonly classSummary = signal<JourneyClassSummary | undefined>(undefined);
  readonly authorityState = signal<
    'local' | 'connecting' | 'synced' | 'offline' | 'conflict' | 'error'
  >(this.authority === null ? 'local' : 'connecting');
  readonly isTeacher = computed(() => this.session()?.role === 'teacher');
  readonly actorDisplayName = computed(
    () => this.session()?.actor.displayName ?? this.enrollment.studentDisplayName,
  );
  readonly canSubmit = computed(
    () =>
      this.session() !== undefined &&
      this.state().completionStatus === 'complete' &&
      this.submission()?.status !== 'approved',
  );
  readonly saveState = signal<'saved' | 'saving' | 'error'>('saved');
  readonly mediaState = signal<'idle' | 'uploading' | 'ready' | 'error'>('idle');
  readonly mediaPreviewUrl = signal<string | undefined>(undefined);
  readonly notice = signal<string | undefined>(undefined);
  readonly error = signal<string | undefined>(undefined);

  constructor() {
    if (this.authority !== null) void this.initializeAuthority();
  }

  selectChoice(choiceId: string): void {
    try {
      this.commit(
        'journey.choice.selected',
        selectJourneyChoice(this.config, this.state(), choiceId),
        { stepId: this.step()?.id, choiceId },
      );
      this.clearMediaPreview();
      this.mediaState.set('idle');
      this.notice.set('Decision marked. Explain why before the voyage continues.');
    } catch (error) {
      this.setError(error);
    }
  }

  setResponseMode(responseMode: JourneyResponseMode): void {
    this.updateDraft({ responseMode });
  }

  setResponseText(text: string): void {
    this.updateDraft({ text });
  }

  setTranscript(transcript: string): void {
    this.updateDraft({ transcript });
  }

  async attachAudio(file: Blob, fileName = 'journey-response.webm'): Promise<void> {
    if (this.media === null) {
      this.error.set('CAPABILITY_NOT_INSTALLED: Audio storage is unavailable. Use a text response.');
      return;
    }
    this.mediaState.set('uploading');
    this.error.set(undefined);
    try {
      const asset = await this.media.upload({
        file,
        fileName,
        contentType: file.type || 'audio/webm',
        metadata: {
          projectId: this.config.projectId,
          studentId: this.state().studentId,
          stepId: this.step()?.id ?? 'complete',
        },
      });
      this.updateDraft({ responseMode: 'audio', mediaAssetId: asset.id });
      await this.loadMediaPreview(asset.id);
      this.mediaState.set('ready');
      this.notice.set('Audio answer attached to this journey step.');
    } catch (error) {
      this.mediaState.set('error');
      this.setError(error);
    }
  }

  async loadMediaPreview(assetId: string): Promise<void> {
    if (this.media === null) return;
    try {
      const asset = await this.media.getReference(assetId);
      this.clearMediaPreview();
      this.mediaPreviewUrl.set(asset.reference);
    } catch (error) {
      this.setError(error);
    }
  }

  completeCurrentStep(): boolean {
    try {
      this.flushDraft();
      const step = this.step();
      const choice = this.choice();
      const completed = completeJourneyStep(this.config, this.state());
      this.commit(
        'journey.step.completed',
        completed,
        { stepId: step?.id, choiceId: choice?.id },
      );
      this.clearMediaPreview();
      this.mediaState.set('idle');
      this.notice.set(
        completed.completionStatus === 'complete'
          ? 'Journey recorded. Your replay is ready.'
          : `Chapter recorded. ${this.step()?.title ?? 'The next chapter'} is ready.`,
      );
      return true;
    } catch (error) {
      this.setError(error);
      return false;
    }
  }

  async submitJourney(): Promise<boolean> {
    if (this.authority === null) {
      this.error.set('Sign-in and the authoritative journey service are required to submit.');
      return false;
    }
    if (this.state().completionStatus !== 'complete') {
      this.error.set('Complete every journey chapter before submitting for review.');
      return false;
    }
    this.flushDraft();
    await this.authoritySaveQueue;
    this.authorityState.set('connecting');
    try {
      const submission = await this.authority.submitJourney({
        locator: this.locator(),
        record: this.state(),
        totalStepCount: this.config.steps.length,
        idempotencyKey: this.nextClientEventId('submission'),
      });
      this.submission.set(submission);
      this.authorityState.set('synced');
      this.notice.set('Journey submitted for teacher review. Your recorded voyage is locked to this submission.');
      return true;
    } catch (error) {
      this.authorityState.set('error');
      this.setError(error);
      return false;
    }
  }

  connectClassSummary(): Subscription | undefined {
    if (this.authority === null || !this.isTeacher()) return undefined;
    return this.authority.classSummary(this.locator()).subscribe({
      next: (summary) => {
        this.classSummary.set(summary);
        this.authorityState.set('synced');
      },
      error: (error: unknown) => {
        this.authorityState.set('error');
        this.setError(error);
      },
    });
  }

  async reviewSubmission(
    submissionId: string,
    decision: JourneySubmissionReviewRequest['decision'],
    teacherFeedback: string,
    mastery: readonly JourneyMasteryAssessment[],
  ): Promise<boolean> {
    if (this.authority === null || !this.isTeacher()) {
      this.error.set('Teacher authorization is required to review a journey.');
      return false;
    }
    try {
      const reviewed = await this.authority.reviewSubmission({
        locator: this.locator(),
        submissionId,
        decision,
        teacherFeedback,
        mastery,
        idempotencyKey: this.nextClientEventId(`review-${submissionId}`),
      });
      this.classSummary.update((summary) =>
        summary === undefined
          ? summary
          : {
              ...summary,
              members: summary.members.map((member) =>
                member.submission?.id === reviewed.id ? { ...member, submission: reviewed } : member,
              ),
            },
      );
      this.notice.set(
        decision === 'approved' ? 'Journey approved and mastery recorded.' : 'Revision request sent to the student.',
      );
      return true;
    } catch (error) {
      this.setError(error);
      return false;
    }
  }

  setSceneHidden(sceneId: string, hidden: boolean): void {
    try {
      this.commit(
        'journey.replay.scene.updated',
        setReplaySceneHidden(this.state(), sceneId, hidden),
        { sceneId, hidden },
      );
    } catch (error) {
      this.setError(error);
    }
  }

  reset(): void {
    if (this.saveTimer !== undefined) clearTimeout(this.saveTimer);
    this.persistence.clear(
      this.config.projectId,
      this.config.projectVersion,
      this.state().studentId,
    );
    const initial = createInitialJourneyRecord(this.config, this.state().studentId);
    this.commit('journey.reset', initial, undefined, 'system');
    this.clearMediaPreview();
    this.notice.set('Journey reset to Lisbon.');
  }

  clearMessages(): void {
    this.notice.set(undefined);
    this.error.set(undefined);
  }

  flushDraft(): void {
    if (this.saveTimer !== undefined) clearTimeout(this.saveTimer);
    this.saveTimer = undefined;
    this.save(this.state());
  }

  private updateDraft(update: Parameters<typeof updateJourneyResponseDraft>[1]): void {
    this.state.update((record) => updateJourneyResponseDraft(record, update));
    this.saveState.set('saving');
    if (this.saveTimer !== undefined) clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => this.flushDraft(), 700);
  }

  private commit(
    eventType: StudentJourneyRecord['eventHistory'][number]['eventType'],
    next: StudentJourneyRecord,
    payload?: Readonly<Record<string, unknown>>,
    actor: 'student' | 'system' = 'student',
  ): void {
    const event = this.event(eventType, payload, actor);
    const committed: StudentJourneyRecord = {
      ...next,
      revision: this.state().revision + 1,
      eventHistory: [...this.state().eventHistory.slice(-99), event],
    };
    this.state.set(committed);
    this.save(committed, event.clientEventId);
    this.error.set(undefined);
  }

  private event(
    eventType: StudentJourneyRecord['eventHistory'][number]['eventType'],
    payload?: Readonly<Record<string, unknown>>,
    actor: 'student' | 'system' = 'student',
  ): StudentJourneyRecord['eventHistory'][number] {
    const clientEventId = this.nextClientEventId('event');
    return {
      id: clientEventId,
      clientEventId,
      eventType,
      timestamp: new Date().toISOString(),
      projectId: this.config.projectId,
      actor: { type: actor, id: actor === 'student' ? this.state().studentId : 'journey-runtime' },
      payload,
    };
  }

  private load(): StudentJourneyRecord {
    const loaded = this.persistence.load(
      this.config.projectId,
      this.config.projectVersion,
      this.enrollment.studentId,
    );
    return loaded?.projectVersion === this.config.projectVersion
      ? loaded
      : createInitialJourneyRecord(this.config, this.enrollment.studentId);
  }

  private save(record: StudentJourneyRecord, idempotencyKey = this.nextClientEventId('draft')): void {
    this.saveState.set('saving');
    try {
      this.persistence.save(record);
      this.saveState.set('saved');
      this.enqueueAuthoritySave(record, idempotencyKey);
    } catch (error) {
      this.saveState.set('error');
      this.setError(error);
    }
  }

  private async initializeAuthority(): Promise<void> {
    if (this.authority === null) return;
    this.authorityState.set('connecting');
    try {
      const session = await this.authority.openSession(this.locator(), this.enrollment);
      this.session.set(session);
      const authoritative = await this.authority.loadRecord(this.locator());
      if (authoritative !== undefined) {
        this.serverRevision = authoritative.serverRevision;
        this.state.set(authoritative.record);
        this.persistence.save(authoritative.record);
      } else {
        const local = this.persistence.load(
          this.config.projectId,
          this.config.projectVersion,
          session.actor.id,
        );
        const record = local ?? createInitialJourneyRecord(this.config, session.actor.id);
        this.state.set(record);
        this.persistence.save(record);
        this.enqueueAuthoritySave(record, this.nextClientEventId('initialize'));
      }
      this.submission.set(await this.authority.loadSubmission(this.locator()));
      this.authorityState.set('synced');
    } catch (error) {
      this.authorityState.set(isAuthenticationError(error) ? 'error' : 'offline');
      if (isAuthenticationError(error)) this.setError(error);
    }
  }

  private enqueueAuthoritySave(record: StudentJourneyRecord, idempotencyKey: string): void {
    if (this.authority === null || this.session() === undefined) return;
    this.authorityState.set('connecting');
    this.authoritySaveQueue = this.authoritySaveQueue
      .catch(() => undefined)
      .then(async () => {
        if (this.authority === null) return;
        try {
          const saved = await this.authority.saveRecord({
            locator: this.locator(),
            record,
            expectedServerRevision: this.serverRevision,
            idempotencyKey,
            totalStepCount: this.config.steps.length,
          });
          this.serverRevision = saved.serverRevision;
          this.authorityState.set('synced');
        } catch (error) {
          this.authorityState.set(isConflictError(error) ? 'conflict' : 'offline');
          if (isConflictError(error)) this.setError(error);
        }
      });
  }

  private locator() {
    return journeyAuthorityLocator(this.enrollment, this.config.projectId, this.config.projectVersion);
  }

  private nextClientEventId(kind: string): string {
    this.eventSequence += 1;
    const random = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${this.eventSequence}`;
    return `journey-${kind}-${random}`;
  }

  private clearMediaPreview(): void {
    const previous = this.mediaPreviewUrl();
    if (previous?.startsWith('blob:')) URL.revokeObjectURL(previous);
    this.mediaPreviewUrl.set(undefined);
  }

  private setError(error: unknown): void {
    const message = error instanceof Error ? error.message : 'JOURNEY_RUNTIME_ERROR';
    const friendly: Record<string, string> = {
      CHOICE_REQUIRED: 'Choose a course before continuing.',
      RESPONSE_REQUIRED: 'Add at least one complete sentence or an audio answer before continuing.',
      ASSET_NOT_FOUND: 'The saved audio could not be loaded. Attach it again or use text.',
      AUTHENTICATION_REQUIRED: 'Sign in to save and submit an authoritative journey.',
      JOURNEY_RECORD_CONFLICT: 'This journey changed in another session. Reload before continuing.',
      TEACHER_AUTHORIZATION_REQUIRED: 'Only the class teacher can review submissions and open the live class summary.',
    };
    this.error.set(friendly[message] ?? message);
  }
}

function isConflictError(error: unknown): boolean {
  return error instanceof Error && error.message === 'JOURNEY_RECORD_CONFLICT';
}

function isAuthenticationError(error: unknown): boolean {
  return error instanceof Error && error.message === 'AUTHENTICATION_REQUIRED';
}
