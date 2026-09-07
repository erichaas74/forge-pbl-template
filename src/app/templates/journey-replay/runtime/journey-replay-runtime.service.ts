import { computed, inject, Injectable, OnDestroy, signal } from '@angular/core';
import type { Subscription } from 'rxjs';

import type {
  JourneyAuthoritySession,
  JourneyClassSummary,
  JourneyMasteryAssessment,
  JourneyResponseMode,
  JourneySubmission,
  StudentJourneyRecord,
  JourneyResponseDraft,
  JourneyCitation,
} from '../domain/journey-replay.models';
import {
  completeJourneyStep,
  createInitialJourneyRecord,
  currentStep,
  selectJourneyChoice,
  selectedChoice,
  setReplaySceneHidden,
  updateJourneyResponseDraft,
  assertResponse,
  reviseJourneyResponse,
} from '../core/journey-replay.engine';
import { validateJourneyRecord } from '../core/journey-record-validation';
import { responseFingerprint } from '../domain/journey-tutor.contracts';
import type { JourneySaveCheckpoint } from '../persistence/journey-replay.persistence';
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
  JOURNEY_TUTOR,
} from './journey-replay.tokens';

@Injectable()
export class JourneyReplayRuntimeService implements OnDestroy {
  readonly config = inject(JOURNEY_REPLAY_CONFIG);
  readonly enrollment = inject(JOURNEY_REPLAY_ENROLLMENT);
  private readonly persistence = inject(JOURNEY_REPLAY_PERSISTENCE);
  private readonly media = inject(JOURNEY_REPLAY_MEDIA, { optional: true });
  private readonly authority = inject(JOURNEY_REPLAY_AUTHORITY, { optional: true });
  private readonly tutor = inject(JOURNEY_TUTOR, { optional: true });
  private checkpoint: JourneySaveCheckpoint = { acknowledgedRevision: 0 };
  private syncing = false;
  private loadFailure?: string;
  private tutorAbort?: AbortController;
  private previewSequence = 0;
  private readonly reconnect = () => {
    if (this.session()) void this.retrySave();
    else if (this.enrollment.mode !== 'demo') void this.initializeAuthority();
  };
  private readonly pageHide = () => this.flushDraft();
  private eventSequence = 0;
  private saveTimer?: ReturnType<typeof setTimeout>;
  private serverRevision = 0;

  readonly state = signal(this.load());
  readonly step = computed(() => currentStep(this.config, this.state()));
  readonly choice = computed(() => selectedChoice(this.config, this.state()));
  readonly progressPercent = computed(() =>
    Math.round((this.state().completedSteps.length / this.config.steps.length) * 100),
  );
  readonly canComplete = computed(() => {
    if (!this.ready() || this.mediaBusy() || !this.choice()) return false;
    try {
      assertResponse(this.config, this.choice()!, this.state().responseDraft);
      return true;
    } catch {
      return false;
    }
  });
  readonly ready = signal(this.enrollment.mode === 'demo');
  readonly tutorBusy = signal(false);
  readonly tutorAvailable = this.tutor !== null;
  readonly recording = signal(false);
  readonly mediaBusy = computed(() => this.recording() || this.mediaState() === 'uploading');
  readonly conflictRecord = signal<StudentJourneyRecord | undefined>(undefined);
  readonly revisionStepId = signal<string | undefined>(undefined);
  readonly revisionDraft = signal<JourneyResponseDraft>({
    responseMode: 'text',
    text: '',
    transcript: '',
  });
  readonly saveLabel = computed(() =>
    this.saveState() === 'error'
      ? 'Not saved — retry or download a backup'
      : this.saveState() === 'saving'
        ? 'Saving on this device…'
        : this.authorityState() === 'synced'
          ? 'Synced to your class'
          : this.authorityState() === 'conflict'
            ? 'Two saved copies need review'
            : 'Saved on this device',
  );
  readonly session = signal<JourneyAuthoritySession | undefined>(undefined);
  readonly submission = signal<JourneySubmission | undefined>(undefined);
  readonly classSummary = signal<JourneyClassSummary | undefined>(undefined);
  readonly authorityState = signal<
    'local' | 'connecting' | 'synced' | 'offline' | 'conflict' | 'error'
  >(this.enrollment.mode === 'demo' ? 'local' : 'connecting');
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
    if (this.loadFailure) this.error.set(this.loadFailure);
    if (this.authority !== null && this.enrollment.mode !== 'demo') void this.initializeAuthority();
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.reconnect);
      window.addEventListener('pagehide', this.pageHide);
    }
  }

  ngOnDestroy(): void {
    this.flushDraft();
    this.tutorAbort?.abort();
    this.clearMediaPreview();
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.reconnect);
      window.removeEventListener('pagehide', this.pageHide);
    }
  }

  selectChoice(choiceId: string): void {
    if (!this.ready() || this.mediaBusy() || choiceId === this.state().selectedChoiceId) return;
    try {
      this.tutorAbort?.abort();
      this.tutorBusy.set(false);
      this.commit(
        'journey.choice.selected',
        selectJourneyChoice(this.config, this.state(), choiceId),
        { stepId: this.step()?.id, choiceId },
      );
      this.clearMediaPreview();
      this.mediaState.set('idle');
      if (this.state().responseDraft.mediaAssetId)
        void this.loadMediaPreview(this.state().responseDraft.mediaAssetId!);
      this.notice.set(
        this.choice()?.planning
          ? 'Goal selected. Explore the highlighted map options to build the mission.'
          : 'Decision marked. Explain why before the voyage continues.',
      );
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
    const stepId = this.step()?.id;
    const choiceId = this.choice()?.id;
    if (!stepId || !choiceId) return;
    if (this.media === null) {
      this.error.set(
        'CAPABILITY_NOT_INSTALLED: Audio storage is unavailable. Use a text response.',
      );
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
          stepId,
          choiceId,
        },
      });
      if (this.step()?.id !== stepId || this.choice()?.id !== choiceId) {
        this.mediaState.set('idle');
        return;
      }
      this.updateDraft({ responseMode: 'audio', mediaAssetId: asset.id });
      if (!this.flushDraft()) return;
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
    const request = ++this.previewSequence;
    this.clearMediaPreview(false);
    try {
      const asset = await this.media.getReference(assetId);
      if (request !== this.previewSequence) {
        if (asset.reference.startsWith('blob:')) URL.revokeObjectURL(asset.reference);
        return;
      }
      this.mediaPreviewUrl.set(asset.reference);
    } catch (error) {
      this.setError(error);
    }
  }

  completeCurrentStep(): boolean {
    if (!this.canComplete()) return false;
    try {
      this.flushDraft();
      const step = this.step();
      const choice = this.choice();
      const completed = completeJourneyStep(this.config, this.state());
      this.commit('journey.step.completed', completed, { stepId: step?.id, choiceId: choice?.id });
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
    if (!this.flushDraft()) return false;
    await this.syncPending();
    if (this.checkpoint.pendingId || this.syncing || this.saveState() === 'error') {
      this.error.set('Sync your saved work before submitting.');
      return false;
    }
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
      this.notice.set(
        'Journey submitted for teacher review. Your recorded voyage is locked to this submission.',
      );
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
                member.submission?.id === reviewed.id
                  ? { ...member, submission: reviewed }
                  : member,
              ),
            },
      );
      this.notice.set(
        decision === 'approved'
          ? 'Journey approved and mastery recorded.'
          : 'Revision request sent to the student.',
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

  flushDraft(): boolean {
    if (this.saveTimer !== undefined) clearTimeout(this.saveTimer);
    this.saveTimer = undefined;
    if (!this.ready() || this.loadFailure) return false;
    try {
      this.save(this.state());
      return true;
    } catch {
      return false;
    }
  }

  private updateDraft(update: Parameters<typeof updateJourneyResponseDraft>[1]): void {
    if (!this.ready()) return;
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
    this.save(committed, event.clientEventId);
    this.state.set(committed);
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
    if (this.enrollment.mode !== 'demo')
      return createInitialJourneyRecord(this.config, this.enrollment.studentId);
    try {
      const loaded = this.persistence.load(
        this.config.projectId,
        this.config.projectVersion,
        this.enrollment.studentId,
      );
      this.checkpoint = this.persistence.loadCheckpoint?.(
        this.config.projectId,
        this.config.projectVersion,
        this.enrollment.studentId,
      ) ?? { acknowledgedRevision: 0 };
      return loaded?.projectVersion === this.config.projectVersion
        ? validateJourneyRecord(this.config, loaded)
        : createInitialJourneyRecord(this.config, this.enrollment.studentId);
    } catch {
      this.loadFailure =
        'Saved data could not be read. Keep this browser data and recover from an exported backup.';
      return createInitialJourneyRecord(this.config, this.enrollment.studentId);
    }
  }

  private save(
    record: StudentJourneyRecord,
    idempotencyKey = this.nextClientEventId('draft'),
  ): void {
    this.saveState.set('saving');
    try {
      const checkpoint = { ...this.checkpoint, pendingId: idempotencyKey };
      this.persist(record, checkpoint);
      this.checkpoint = checkpoint;
      this.saveState.set('saved');
      queueMicrotask(() => {
        void this.syncPending();
      });
    } catch (error) {
      this.saveState.set('error');
      this.setError(error);
      throw error;
    }
  }

  private persist(record: StudentJourneyRecord, checkpoint: JourneySaveCheckpoint): void {
    if (this.persistence.saveCheckpoint) this.persistence.saveCheckpoint(record, checkpoint);
    else this.persistence.save(record);
  }

  private async initializeAuthority(): Promise<void> {
    if (!this.authority || this.enrollment.mode === 'demo') return;
    this.authorityState.set('connecting');
    try {
      const session = await this.authority.openSession(this.locator(), this.enrollment);
      this.session.set(session);
      const local = this.persistence.load(
        this.config.projectId,
        this.config.projectVersion,
        session.actor.id,
      );
      this.checkpoint = this.persistence.loadCheckpoint?.(
        this.config.projectId,
        this.config.projectVersion,
        session.actor.id,
      ) ?? {
        acknowledgedRevision: 0,
        pendingId: local ? this.nextClientEventId('recover') : undefined,
      };
      if (local) this.state.set(validateJourneyRecord(this.config, local));
      else this.state.set(createInitialJourneyRecord(this.config, session.actor.id));
      this.ready.set(true);
      const remote = await this.authority.loadRecord(this.locator());
      if (this.checkpoint.pendingId && local) {
        // Preserve pending work even when the remote copy is newer. Retry the same operation ID first.
        if (remote) this.conflictRecord.set(remote.record);
      } else if (remote) {
        const record = validateJourneyRecord(this.config, remote.record);
        this.checkpoint = {
          acknowledgedRevision: remote.serverRevision,
          acknowledgedRecord: record,
        };
        this.persist(record, this.checkpoint);
        this.state.set(record);
      } else {
        this.save(this.state());
      }
      this.submission.set(await this.authority.loadSubmission(this.locator()));
      await this.syncPending();
      if (!this.checkpoint.pendingId) this.authorityState.set('synced');
    } catch (error) {
      this.authorityState.set(isAuthenticationError(error) ? 'error' : 'offline');
      this.setError(error);
    }
  }

  async retrySave(): Promise<void> {
    if (this.saveState() === 'error' && !this.flushDraft()) return;
    if (!this.session() && this.enrollment.mode !== 'demo') {
      await this.initializeAuthority();
      return;
    }
    await this.syncPending();
  }

  private async syncPending(): Promise<void> {
    if (!this.authority || !this.session() || this.syncing || this.authorityState() === 'conflict')
      return;
    this.syncing = true;
    try {
      while (this.checkpoint.pendingId) {
        const id = this.checkpoint.pendingId;
        let record = this.state();
        const localIds = [...new Set(JSON.stringify(record).match(/local:[a-zA-Z0-9_-]+/g) ?? [])];
        if (
          localIds.length &&
          this.media &&
          'promoteLocalAsset' in this.media &&
          typeof this.media.promoteLocalAsset === 'function'
        ) {
          for (const assetId of localIds) {
            const promoted = await (
              this.media as { promoteLocalAsset(id: string): Promise<{ id: string }> }
            ).promoteLocalAsset(assetId);
            const latest = JSON.stringify(this.state())
              .split(JSON.stringify(assetId))
              .join(JSON.stringify(promoted.id));
            this.state.set(JSON.parse(latest) as StudentJourneyRecord);
          }
          record = this.state();
          this.persist(record, this.checkpoint);
        }
        this.authorityState.set('connecting');
        const saved = await this.authority.saveRecord({
          locator: this.locator(),
          record,
          expectedServerRevision: this.checkpoint.acknowledgedRevision,
          idempotencyKey: id,
          totalStepCount: this.config.steps.length,
        });
        const pendingId = this.checkpoint.pendingId === id ? undefined : this.checkpoint.pendingId;
        const checkpoint = {
          ...this.checkpoint,
          acknowledgedRevision: saved.serverRevision,
          acknowledgedRecord: saved.record,
          pendingId,
        };
        this.persist(this.state(), checkpoint);
        this.checkpoint = checkpoint;
        this.conflictRecord.set(undefined);
        this.authorityState.set('synced');
      }
    } catch (error) {
      this.authorityState.set(isConflictError(error) ? 'conflict' : 'offline');
      this.setError(error);
      if (isConflictError(error)) {
        try {
          const remote = await this.authority.loadRecord(this.locator());
          if (remote) {
            this.conflictRecord.set(remote.record);
            this.serverRevision = remote.serverRevision;
          }
        } catch {
          /* Preserve both available copies. */
        }
      }
    } finally {
      this.syncing = false;
    }
  }

  resolveConflict(use: 'device' | 'class'): void {
    const remote = this.conflictRecord();
    if (!remote) return;
    const selected = use === 'device' ? this.state() : remote;
    try {
      if (use === 'device') validateJourneyRecord(this.config, selected, remote);
      const checkpoint: JourneySaveCheckpoint = {
        acknowledgedRevision: this.serverRevision,
        acknowledgedRecord: remote,
        pendingId: use === 'device' ? this.nextClientEventId('resolve') : undefined,
        recoveryRecords: [
          ...(this.checkpoint.recoveryRecords ?? []).slice(-4),
          use === 'device' ? remote : this.state(),
        ],
      };
      this.persist(selected, checkpoint);
      this.checkpoint = checkpoint;
      this.state.set(selected);
      this.conflictRecord.set(undefined);
      this.authorityState.set('local');
      this.error.set(undefined);
      void this.syncPending();
    } catch {
      this.error.set(
        'These copies contain different recorded decisions. Download both copies before choosing the class copy; the device copy will also remain in recovery history.',
      );
    }
  }

  setPrediction(prediction: string): void {
    this.updateDraft({ prediction });
  }
  setPlanningTarget(planningTargetId: string): void {
    if (this.state().responseDraft.planningTargetId === planningTargetId) return;
    this.updateDraft({ planningTargetId, planningText: '', planningSubmitted: false });
  }
  setPlanningText(planningText: string): void {
    this.updateDraft({ planningText, planningSubmitted: false });
  }
  submitPlanning(): void {
    this.updateDraft({ planningSubmitted: true });
    this.flushDraft();
  }
  markEvidenceViewed(evidenceId: string): void {
    if (!this.choice()?.evidenceIds.includes(evidenceId)) return;
    this.updateDraft({
      evidenceViewed: [
        ...new Set([...(this.state().responseDraft.evidenceViewed ?? []), evidenceId]),
      ],
    });
  }
  setCitations(citations: readonly JourneyCitation[]): void {
    this.updateDraft({ citations });
  }

  async askTutor(): Promise<void> {
    const step = this.step();
    const choice = this.choice();
    const draft = this.state().responseDraft;
    if (!step || !choice || this.tutorBusy() || (draft.tutorTurns?.length ?? 0) >= 20) return;
    const fingerprint = responseFingerprint(draft);
    const requestId = this.nextClientEventId('tutor');
    const criteria = this.config.learning?.criteria ?? [];
    const criterion = criteria[(draft.tutorTurns?.length ?? 0) % Math.max(1, criteria.length)];
    if (!criterion) return;
    this.tutorBusy.set(true);
    this.tutorAbort?.abort();
    const abort = new AbortController();
    this.tutorAbort = abort;
    try {
      const result = this.tutor
        ? await this.tutor.question(
            {
              requestId,
              projectId: this.config.projectId,
              projectVersion: this.config.projectVersion,
              stepId: step.id,
              choice,
              alternatives: step.choices,
              sources: this.config.evidence.filter((s) => choice.evidenceIds.includes(s.id)),
              response: draft,
              responseFingerprint: fingerprint,
              previousDecisions: this.state().completedSteps,
              criteria,
            },
            abort.signal,
          )
        : {
            requestId,
            responseFingerprint: fingerprint,
            criterionId: criterion.id,
            question: criterion.question,
            explanation: criterion.proficient,
          };
      if (
        abort.signal.aborted ||
        this.step()?.id !== step.id ||
        this.choice()?.id !== choice.id ||
        responseFingerprint(this.state().responseDraft) !== fingerprint
      )
        return;
      if (
        result.requestId !== requestId ||
        result.responseFingerprint !== fingerprint ||
        !criteria.some((c) => c.id === result.criterionId) ||
        typeof result.question !== 'string' ||
        result.question.length > 4000 ||
        !result.question.trim() ||
        (result.explanation !== undefined &&
          (typeof result.explanation !== 'string' || result.explanation.length > 6000))
      )
        throw new Error('TUTOR_RESPONSE_INVALID');
      const turn = {
        ...result,
        id: requestId,
        stepId: step.id,
        choiceId: choice.id,
        createdAt: new Date().toISOString(),
        source: this.tutor ? ('tutor' as const) : ('scaffold' as const),
      };
      this.updateDraft({ tutorTurns: [...(draft.tutorTurns ?? []), turn] });
      this.flushDraft();
    } catch (error) {
      if (!abort.signal.aborted) this.setError(error);
    } finally {
      if (this.tutorAbort === abort) this.tutorBusy.set(false);
    }
  }

  answerTutor(id: string, answer: string): void {
    this.updateDraft({
      tutorTurns: this.state().responseDraft.tutorTurns?.map((turn) =>
        turn.id === id ? { ...turn, answer } : turn,
      ),
    });
  }

  openRevision(stepId: string): void {
    const record = this.state().completedSteps.find((item) => item.stepId === stepId);
    if (!record || this.submission()?.status === 'approved') return;
    this.revisionStepId.set(stepId);
    this.revisionDraft.set({
      ...record.studentResponse,
      text: record.studentResponse.text ?? '',
      transcript: record.studentResponse.transcript ?? '',
    });
  }
  saveRevision(reason: string): boolean {
    const stepId = this.revisionStepId();
    if (!stepId) return false;
    try {
      this.commit(
        'journey.response.revised',
        reviseJourneyResponse(this.config, this.state(), stepId, this.revisionDraft(), reason),
        { stepId },
      );
      this.revisionStepId.set(undefined);
      this.notice.set('Revision saved. Your earlier explanation remains in the record.');
      return true;
    } catch (error) {
      this.setError(error);
      return false;
    }
  }

  exportRecord(which: 'device' | 'class' = 'device'): string {
    return JSON.stringify(
      {
        format: 'journey-backup',
        version: 1,
        scope: this.locator(),
        record: which === 'class' ? this.conflictRecord() : this.state(),
        recoveryRecords: this.checkpoint.recoveryRecords ?? [],
        audioNote:
          'Local audio stays on this device. Audio assets require separate storage backup.',
      },
      null,
      2,
    );
  }
  importRecord(json: string): void {
    try {
      const backup = JSON.parse(json) as {
        format?: string;
        scope?: { tenantId?: string; classId?: string };
        record?: unknown;
      };
      if (
        backup.format !== 'journey-backup' ||
        backup.scope?.tenantId !== this.enrollment.tenantId ||
        backup.scope?.classId !== this.enrollment.classId
      )
        throw new Error('BACKUP_SCOPE_MISMATCH');
      const record = validateJourneyRecord(this.config, backup.record);
      if (record.studentId !== this.state().studentId && this.enrollment.mode !== 'demo')
        throw new Error('BACKUP_OWNER_MISMATCH');
      const restored = validateJourneyRecord(this.config, {
        ...record,
        studentId: this.state().studentId,
      });
      this.checkpoint = {
        ...this.checkpoint,
        recoveryRecords: [...(this.checkpoint.recoveryRecords ?? []).slice(-4), this.state()],
      };
      this.save(restored);
      this.state.set(restored);
      this.notice.set('Backup restored. The previous device copy is retained in recovery history.');
    } catch (error) {
      this.setError(error);
    }
  }

  private locator() {
    return journeyAuthorityLocator(
      this.enrollment,
      this.config.projectId,
      this.config.projectVersion,
    );
  }

  private nextClientEventId(kind: string): string {
    this.eventSequence += 1;
    const random =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${this.eventSequence}`;
    return `journey-${kind}-${random}`;
  }

  clearMediaPreview(invalidate = true): void {
    if (invalidate) this.previewSequence++;
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
      JOURNEY_RECORD_CONFLICT:
        'This journey changed in another session. Both copies are preserved. Review them before continuing.',
      CITATION_REQUIRED: 'Choose a source paragraph and explain how it supports your decision.',
      CITATION_INVALID: 'Check the source paragraph and add a sentence explaining why it matters.',
      JOURNEY_STORAGE_UNAVAILABLE:
        'This device cannot save right now. Download a backup and retry.',
      TEACHER_AUTHORIZATION_REQUIRED:
        'Only the class teacher can review submissions and open the live class summary.',
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
