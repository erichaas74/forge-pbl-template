import { Injectable, signal } from '@angular/core';

import type { RuntimeEvent } from '../../core/events/runtime-event';
import type { RuntimeScope } from '../../core/state/runtime-state-contracts';
import { InMemoryProjectPackageSource } from '../../infrastructure/persistence/in-memory-project-package-source';
import { BrowserRuntimePersistenceAdapter } from '../../infrastructure/persistence/browser-runtime-persistence.adapter';
import { InMemoryRuntimePersistenceAdapter } from '../../infrastructure/persistence/in-memory-runtime-persistence.adapter';
import { LocalInvestigationRuntime } from '../../runtime/local-investigation-runtime';
import type { RuntimeStateSnapshot } from '../../templates/investigation/domain/runtime-state';
import type { ProjectDefinitionGraph } from '../../templates/investigation/package/project-definition-graph';
import type {
  AnalysisClassification,
  FinalCaseDraft,
  TheoryDraft,
} from '../../templates/investigation/ui/investigation-ui.models';
import { SystemClock } from '../../core/time/clock';
import { LegacyMysteryStateAdapter } from './legacy-mystery-state.adapter';
import {
  mysterySubstanceLocation,
  mysterySubstanceProjectPackage,
} from './mystery-substance.package';

@Injectable({ providedIn: 'root' })
export class MysteryInvestigationService {
  private readonly source = new InMemoryProjectPackageSource({
    [mysterySubstanceLocation.reference]: mysterySubstanceProjectPackage,
  });
  private readonly clock = new SystemClock();
  private readonly storage = browserStorage();
  private readonly persistence =
    this.storage === undefined
      ? new InMemoryRuntimePersistenceAdapter<RuntimeStateSnapshot>(this.clock)
      : new BrowserRuntimePersistenceAdapter<RuntimeStateSnapshot>(this.storage, this.clock);
  private readonly runtime = new LocalInvestigationRuntime(
    this.source,
    this.clock,
    this.persistence,
  );
  private readonly scope: RuntimeScope = {
    tenantId: mysterySubstanceLocation.tenantId,
    projectId: mysterySubstanceLocation.projectId,
    projectVersion: mysterySubstanceLocation.projectVersion,
    classId: 'local-class',
    studentId: 'local-investigator',
    scopeType: 'student',
  };
  private graph?: ProjectDefinitionGraph;
  private initialization?: Promise<void>;

  readonly snapshot = signal<RuntimeStateSnapshot | undefined>(undefined);
  readonly loading = signal(true);
  readonly errors = signal<string[]>([]);
  readonly legacyDrafts = signal<Record<string, string>>({});
  readonly importedLegacyState = signal(false);
  readonly saveState = signal<'saved' | 'saving' | 'pending'>('saved');

  async initialize(): Promise<void> {
    if (this.initialization !== undefined) {
      return this.initialization;
    }
    this.initialization = this.initializeRuntime();
    return this.initialization;
  }

  async startActivity(activityId: string): Promise<void> {
    await this.dispatch('activity.started', activityId);
  }

  async reviewEvidence(evidenceId: string): Promise<void> {
    await this.collectEvidence(evidenceId);
    if (this.snapshot()?.activities['activity-evidence-locker']?.status !== 'complete') {
      await this.dispatch('activity.completed', 'activity-evidence-locker');
    }
  }

  async classifyEvidence(
    evidenceId: string,
    classification: AnalysisClassification,
  ): Promise<void> {
    await this.dispatch('evidence.classified', evidenceId, { classification });
  }

  async annotateEvidence(evidenceId: string, note: string): Promise<void> {
    if (note.trim().length > 0) {
      await this.dispatch('evidence.annotationAdded', evidenceId, { note: note.trim() });
    }
  }

  async setEvidenceImportance(evidenceId: string, important: boolean): Promise<void> {
    await this.dispatch('evidence.importanceChanged', evidenceId, { important });
  }

  async addEvidenceToFinal(evidenceId: string): Promise<void> {
    await this.dispatch('evidence.usedInClaim', evidenceId);
    const draft = this.snapshot()?.finalSubmission.argumentDraft;
    const evidenceIds = [...new Set([...(draft?.evidenceIds ?? []), evidenceId])];
    await this.dispatch('finalSubmission.draftUpdated', 'final-submission-case-file', {
      draft: { ...structuredClone(draft ?? { evidenceIds: [] }), evidenceIds },
    });
  }

  async createQuestion(text: string, sourceEvidenceId?: string): Promise<void> {
    const question = text.trim();
    if (question.length === 0) {
      return;
    }
    await this.dispatch('board.questionCreated', `question-${createId()}`, {
      text: question,
      sourceEvidenceId,
    });
  }

  async createStudentEvidence(title: string, observation: string): Promise<void> {
    await this.dispatch('evidence.studentCreated', `student-evidence-${createId()}`, {
      evidenceType: 'observation',
      title: title.trim(),
      content: { text: observation.trim() },
    });
  }

  async saveTheory(draft: TheoryDraft): Promise<void> {
    const current = this.currentTheory();
    const payload = {
      statement: draft.statement,
      confidence: draft.confidence,
      reasoning: draft.reasoning,
      remainingQuestion: draft.remainingQuestion,
      evidenceIds: [...draft.evidenceIds],
      reasonForChange: draft.reasonForChange,
    };
    if (current === undefined || draft.createNew === true) {
      const hypothesisId = `hypothesis-${createId()}`;
      await this.dispatch('hypothesis.created', hypothesisId, payload);
      await this.selectTheory(hypothesisId);
      return;
    }
    await this.dispatch('hypothesis.revised', current.id, payload);
  }

  async selectTheory(hypothesisId: string): Promise<void> {
    await this.dispatch('hypothesis.selected', hypothesisId);
  }

  async openFinalInvestigation(): Promise<void> {
    if (this.snapshot()?.finalSubmission.status === 'closed') {
      await this.dispatch('finalSubmission.openRequested', 'final-submission-case-file');
    }
  }

  async saveFinalDraft(draft: FinalCaseDraft): Promise<void> {
    await this.dispatch('finalSubmission.draftUpdated', 'final-submission-case-file', {
      draft: { ...draft, evidenceIds: [...draft.evidenceIds] },
    });
    for (const evidenceId of draft.evidenceIds) {
      const state = this.snapshot();
      if (
        state?.evidence[evidenceId]?.status !== 'usedInClaim' &&
        state?.studentEvidence[evidenceId]?.usedInFinalClaim !== true
      ) {
        await this.dispatch('evidence.usedInClaim', evidenceId);
      }
    }
  }

  async submitFinalInvestigation(): Promise<void> {
    await this.openFinalInvestigation();
    await this.dispatch('finalSubmission.submitted', 'final-submission-case-file');
    await this.dispatch('activity.completed', 'activity-case-showcase');
    await this.dispatch('artifact.versionSaved', 'artifact-final-investigation', {
      sourceActivityId: 'activity-case-showcase',
      evidenceIds: this.snapshot()?.finalSubmission.argumentDraft.evidenceIds ?? [],
      content: this.snapshot()?.finalSubmission.argumentDraft ?? {},
    });
  }

  private currentTheory() {
    const hypotheses = this.snapshot()?.hypotheses ?? [];
    return hypotheses.find((hypothesis) => hypothesis.selected) ?? hypotheses.at(-1);
  }

  private async initializeRuntime(): Promise<void> {
    const loaded = await this.runtime.loadProject(mysterySubstanceLocation);
    const errors = loaded.issues
      .filter((issue) => issue.severity === 'error')
      .map((issue) => issue.message);
    if (loaded.graph === undefined || errors.length > 0) {
      this.errors.set(errors.length > 0 ? errors : ['The project package could not be loaded.']);
      this.loading.set(false);
      return;
    }

    this.graph = loaded.graph;
    const initialized = await this.runtime.initializeScope(loaded.graph, this.scope, false);
    this.snapshot.set(initialized.snapshot);
    this.errors.set((initialized.errors ?? []).map((error) => error.message));
    await this.importLegacyState();
    this.loading.set(false);
  }

  async startScan(vialId: string): Promise<void> {
    await this.startActivity(`activity-scan-${vialId}`);
  }

  async captureScan(vialId: string, observation: string, tags: readonly string[]): Promise<void> {
    const activityId = `activity-scan-${vialId}`;
    const evidenceId = `evidence-scan-${vialId}`;
    await this.dispatch('activity.resultSubmitted', activityId, {
      result: {
        activityId,
        completed: true,
        outputs: { vialId, observation, tags: [...tags] },
        evidenceProduced: [{ evidenceId }],
      },
    });
    await this.dispatch('activity.completed', activityId);
    await this.dispatch('evidence.collected', evidenceId);
    if (observation.trim().length > 0) {
      await this.dispatch('evidence.annotationAdded', evidenceId, {
        note: observation.trim(),
      });
    }
  }

  async collectEvidence(evidenceId: string): Promise<void> {
    const status = this.snapshot()?.evidence[evidenceId]?.status;
    if (status === 'available' || status === 'unopened' || status === 'viewed') {
      await this.dispatch('evidence.collected', evidenceId);
    }
  }

  async captureActivity(
    activityId: string,
    evidenceId: string,
    result: Record<string, unknown>,
    note?: string,
  ): Promise<void> {
    await this.dispatch('activity.started', activityId);
    await this.dispatch('activity.resultSubmitted', activityId, {
      result: {
        activityId,
        completed: true,
        outputs: structuredClone(result),
        evidenceProduced: [{ evidenceId }],
      },
    });
    await this.dispatch('activity.completed', activityId);
    await this.collectEvidence(evidenceId);
    if (note?.trim()) {
      await this.dispatch('evidence.annotationAdded', evidenceId, {
        note: note.trim(),
      });
    }
    if (evidenceId === 'evidence-shelf-case' || evidenceId === 'evidence-final-case-file') {
      await this.dispatch('artifact.versionSaved', `artifact-${evidenceId}`, {
        sourceActivityId: activityId,
        evidenceIds: [evidenceId],
        content: structuredClone(result),
      });
    }
  }

  nextArtifactVersion(artifactId: string): number {
    return (this.snapshot()?.artifacts?.[artifactId]?.latestVersion ?? 0) + 1;
  }

  private async importLegacyState(): Promise<void> {
    const storage = typeof localStorage === 'undefined' ? undefined : localStorage;
    const projection = new LegacyMysteryStateAdapter().read(storage);
    if (projection === undefined) {
      return;
    }
    this.legacyDrafts.set(projection.vialObservations);
    for (const evidenceId of projection.savedEvidenceIds) {
      await this.collectEvidence(evidenceId);
    }
    this.importedLegacyState.set(
      projection.savedEvidenceIds.length > 0 || Object.keys(projection.vialObservations).length > 0,
    );
  }

  private async dispatch(
    eventType: string,
    sourceId: string,
    payload?: Record<string, unknown>,
  ): Promise<void> {
    if (this.graph === undefined) {
      return;
    }
    this.saveState.set(isOnline() ? 'saving' : 'pending');
    const id = createId();
    const event: RuntimeEvent = {
      id,
      clientEventId: `client-${id}`,
      tenantId: mysterySubstanceLocation.tenantId,
      eventType,
      projectId: mysterySubstanceLocation.projectId,
      timestamp: new Date().toISOString(),
      actor: { type: 'student', id: this.scope.studentId },
      sourceId,
      payload,
    };
    const result = await this.runtime.dispatch(this.scope, event, this.graph);
    if (result.snapshot !== undefined) {
      this.snapshot.set(result.snapshot);
    }
    const errors = (result.errors ?? [])
      .filter((error) => error.severity === 'error' || error.severity === 'fatal')
      .map((error) => error.message);
    if (errors.length > 0) {
      this.errors.update((current) => [...current, ...errors]);
    }
    this.saveState.set(isOnline() ? 'saved' : 'pending');
  }
}

function createId(): string {
  return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function browserStorage(): Storage | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
}

function isOnline(): boolean {
  return typeof navigator === 'undefined' || navigator.onLine;
}
