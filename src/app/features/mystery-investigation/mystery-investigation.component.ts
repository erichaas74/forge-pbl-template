import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MysteryInvestigationService } from '../../projects/mystery-substance/mystery-investigation.service';
import {
  mysteryEvidenceCatalog,
  mysteryInvestigationActivities,
  mysteryInvestigationPhases,
  mysteryObservationTags,
  mysteryVials,
  type MysteryVial,
} from '../../projects/mystery-substance/mystery-substance.package';
import {
  ConservationWorkspaceComponent,
  PropertiesWorkspaceComponent,
  ReactionWorkspaceComponent,
  RestorationWorkspaceComponent,
  type StationCapture,
} from '../../projects/mystery-substance/station-workspaces';
import { InvestigationAnalysisPanelComponent } from '../../templates/investigation/ui/analysis-panel.component';
import { InvestigationEvidenceLockerComponent } from '../../templates/investigation/ui/evidence-locker.component';
import { InvestigationFinalCaseComponent } from '../../templates/investigation/ui/final-investigation.component';
import { InvestigationOptionsPanelComponent } from '../../templates/investigation/ui/investigate-panel.component';
import type {
  AnalysisClassification,
  EvidenceClassificationChange,
  FinalCaseDraft,
  InvestigationActivityView,
  InvestigationEvidenceItem,
  InvestigationPhaseView,
  InvestigationQuestionItem,
  InvestigationWorkspacePair,
  StudentEvidenceDraft,
  TheoryDraft,
} from '../../templates/investigation/ui/investigation-ui.models';
import { InvestigationWorkingTheoryComponent } from '../../templates/investigation/ui/working-theory.component';

type UtilityDrawer = 'mission' | 'notebook' | 'help' | 'lockedPhase' | undefined;

interface ContextAlert {
  label: string;
  title: string;
  evidenceId?: string;
}

const requiredFinalActivityIds = [
  'activity-scan-vial-a',
  'activity-scan-vial-b',
  'activity-scan-vial-c',
  'activity-scan-vial-d',
  'activity-evidence-locker',
  'activity-property-comparison',
  'activity-reaction-comparison',
  'activity-conservation-model',
  'activity-shelf-restoration',
] as const;

@Component({
  selector: 'app-mystery-investigation',
  imports: [
    FormsModule,
    InvestigationAnalysisPanelComponent,
    InvestigationEvidenceLockerComponent,
    InvestigationFinalCaseComponent,
    InvestigationOptionsPanelComponent,
    InvestigationWorkingTheoryComponent,
    PropertiesWorkspaceComponent,
    ReactionWorkspaceComponent,
    ConservationWorkspaceComponent,
    RestorationWorkspaceComponent,
  ],
  templateUrl: './mystery-investigation.component.html',
  styleUrl: './mystery-investigation.component.scss',
})
export class MysteryInvestigationComponent {
  readonly investigation = inject(MysteryInvestigationService);
  readonly phaseDefinitions = mysteryInvestigationPhases;
  readonly observationTags = mysteryObservationTags;
  readonly vials = mysteryVials;

  readonly workspacePair = signal<InvestigationWorkspacePair>('evidence-analysis');
  readonly activePhaseId = signal<string>(mysteryInvestigationPhases[0].id);
  readonly selectedEvidenceId = signal<string | undefined>(undefined);
  readonly activeActivityId = signal<string | undefined>(undefined);
  readonly drawer = signal<UtilityDrawer>(undefined);
  readonly lockedPhaseId = signal<string | undefined>(undefined);
  readonly mobilePanel = signal<'left' | 'right'>('left');
  readonly contextAlert = signal<ContextAlert | undefined>(undefined);
  readonly notebookQuestion = signal('');

  readonly selectedVial = signal<MysteryVial | undefined>(undefined);
  readonly observation = signal('');
  readonly selectedTags = signal<string[]>([]);
  readonly scanState = signal<'ready' | 'scanning' | 'captured'>('ready');

  readonly evidence = computed<readonly InvestigationEvidenceItem[]>(() => {
    const runtime = this.investigation.snapshot();
    if (runtime === undefined) {
      return [];
    }
    const configured = mysteryEvidenceCatalog
      .map((definition): InvestigationEvidenceItem | undefined => {
        const state = runtime.evidence[definition.id];
        if (state === undefined || state.status === 'hidden') {
          return undefined;
        }
        return {
          id: definition.id,
          title: definition.title,
          type: readableType(definition.type),
          summary: definition.summary,
          source: definition.source,
          asset: 'asset' in definition ? definition.asset : undefined,
          file: 'file' in definition ? definition.file : undefined,
          status: state.status,
          classification: asClassification(state.classification),
          notes: state.notes ?? [],
          important: state.important ?? false,
          studentCreated: false,
        };
      })
      .filter((item): item is InvestigationEvidenceItem => item !== undefined);
    const studentCreated = Object.values(runtime.studentEvidence).map(
      (record): InvestigationEvidenceItem => ({
        id: record.id,
        title: record.title,
        type: readableType(record.evidenceType),
        summary: studentEvidenceText(record.content),
        source: 'Created by you · Investigation workspace',
        status: record.usedInFinalClaim ? 'usedInClaim' : 'studentCreated',
        classification: asClassification(record.classification),
        notes: record.notes ?? [],
        important: record.important ?? false,
        studentCreated: true,
      }),
    );
    return [...configured, ...studentCreated];
  });

  readonly capturedCount = computed(
    () =>
      this.evidence().filter(
        (item) =>
          item.status !== 'locked' && item.status !== 'available' && item.status !== 'unopened',
      ).length,
  );

  readonly currentTheory = computed(() => {
    const theories = this.investigation.snapshot()?.hypotheses ?? [];
    return theories.find((theory) => theory.selected) ?? theories.at(-1);
  });

  readonly questions = computed<readonly InvestigationQuestionItem[]>(() =>
    (this.investigation.snapshot()?.board.questions ?? []).map((question) => ({
      id: question.id,
      text: question.text,
      sourceEvidenceId: question.sourceEvidenceId,
      status: question.status ?? 'open',
    })),
  );

  readonly activityViews = computed<readonly InvestigationActivityView[]>(() => {
    const activities = this.investigation.snapshot()?.activities ?? {};
    return mysteryInvestigationActivities.map((activity) => ({
      ...activity,
      runtime: activities[activity.id],
      locked: false,
    }));
  });

  readonly finalReadinessMissing = computed<readonly string[]>(() => {
    const runtime = this.investigation.snapshot();
    if (runtime === undefined) {
      return ['Load the investigation record'];
    }
    const missing: string[] = [];
    if (this.capturedCount() < 4) {
      missing.push(`Collect ${4 - this.capturedCount()} more evidence record(s)`);
    }
    if (this.currentTheory() === undefined) {
      missing.push('Create a working theory');
    }
    const incompleteActivities = requiredFinalActivityIds.filter(
      (id) => runtime.activities[id]?.status !== 'complete',
    );
    if (incompleteActivities.length > 0) {
      missing.push(`Complete ${incompleteActivities.length} required investigation(s)`);
    }
    return missing;
  });

  readonly finalReady = computed(() => this.finalReadinessMissing().length === 0);

  readonly phases = computed<readonly InvestigationPhaseView[]>(() => {
    const activities = this.investigation.snapshot()?.activities ?? {};
    return mysteryInvestigationPhases.map((phase) => {
      const complete = phase.activityIds.every((id) => activities[id]?.status === 'complete');
      const finalLocked = phase.id === 'phase-showcase' && !this.finalReady();
      return {
        ...phase,
        status: complete
          ? 'complete'
          : phase.id === this.activePhaseId()
            ? 'current'
            : finalLocked
              ? 'locked'
              : 'available',
      };
    });
  });

  readonly currentPhase = computed(
    () => this.phases().find((phase) => phase.id === this.activePhaseId()) ?? this.phases()[0],
  );

  readonly activeActivity = computed(() =>
    this.activityViews().find((activity) => activity.id === this.activeActivityId()),
  );

  readonly currentQuestion = computed(
    () =>
      this.currentTheory()?.remainingQuestion ??
      this.questions()
        .filter((question) => question.status === 'open')
        .at(-1)?.text ??
      '',
  );

  readonly nextAction = computed(() => {
    if (this.finalReady()) {
      return 'Build your final evidence-based case';
    }
    if (this.capturedCount() === 0) {
      return 'Inspect a sealed vial or open the first recovered record';
    }
    if (this.currentTheory() === undefined) {
      return 'Use your analyzed evidence to create a working theory';
    }
    return 'Choose an investigation that can address your remaining uncertainty';
  });

  readonly workspaceHelp = computed(() => {
    switch (this.workspacePair()) {
      case 'evidence-analysis':
        return 'Open a piece of evidence, record what you notice, then decide whether it supports, challenges, or leaves your explanation uncertain.';
      case 'analysis-theory':
        return 'Use evidence from every zone. Strong theories explain support and address evidence that does not fit.';
      case 'theory-investigate':
        return 'Start with what your theory cannot explain. Choose a test that may provide useful evidence about that uncertainty.';
      case 'final-investigation':
        return 'Build the final case from evidence and theory already in your Investigation Record.';
    }
  });

  constructor() {
    void this.investigation.initialize();
  }

  selectWorkspace(pair: InvestigationWorkspacePair): void {
    if (pair === 'final-investigation') {
      void this.openFinalInvestigation();
      return;
    }
    this.workspacePair.set(pair);
    this.activeActivityId.set(undefined);
    this.drawer.set(undefined);
    this.mobilePanel.set('left');
  }

  selectPhase(phase: InvestigationPhaseView): void {
    if (phase.status === 'locked') {
      this.lockedPhaseId.set(phase.id);
      this.drawer.set('lockedPhase');
      return;
    }
    this.activePhaseId.set(phase.id);
    this.contextAlert.set(undefined);
    if (phase.id === 'phase-showcase') {
      void this.openFinalInvestigation();
    }
  }

  async inspectEvidence(evidenceId: string | undefined): Promise<void> {
    this.selectedEvidenceId.set(evidenceId);
    if (evidenceId === undefined) {
      return;
    }
    const item = this.evidence().find((evidence) => evidence.id === evidenceId);
    if (item !== undefined && item.status !== 'locked' && !item.studentCreated) {
      await this.investigation.reviewEvidence(evidenceId);
    }
  }

  async classifyEvidence(change: EvidenceClassificationChange): Promise<void> {
    await this.investigation.classifyEvidence(change.evidenceId, change.classification);
    this.selectedEvidenceId.set(change.evidenceId);
  }

  async saveEvidenceNote(change: { evidenceId: string; note: string }): Promise<void> {
    await this.investigation.annotateEvidence(change.evidenceId, change.note);
  }

  async setEvidenceImportance(change: { evidenceId: string; important: boolean }): Promise<void> {
    await this.investigation.setEvidenceImportance(change.evidenceId, change.important);
  }

  async addEvidenceToFinal(evidenceId: string): Promise<void> {
    await this.investigation.addEvidenceToFinal(evidenceId);
    this.contextAlert.set({
      label: 'Final case updated',
      title: 'Evidence added to your final set',
    });
  }

  async createEvidenceQuestion(change: { evidenceId: string; text: string }): Promise<void> {
    await this.investigation.createQuestion(change.text, change.evidenceId);
  }

  async createQuestion(text: string): Promise<void> {
    await this.investigation.createQuestion(text);
  }

  async addNotebookQuestion(): Promise<void> {
    const question = this.notebookQuestion().trim();
    if (question.length === 0) {
      return;
    }
    await this.createQuestion(question);
    this.notebookQuestion.set('');
  }

  async createStudentEvidence(draft: StudentEvidenceDraft): Promise<void> {
    await this.investigation.createStudentEvidence(draft.title, draft.observation);
    this.contextAlert.set({ label: 'New evidence', title: draft.title });
  }

  async saveTheory(draft: TheoryDraft): Promise<void> {
    await this.investigation.saveTheory(draft);
    this.contextAlert.set({
      label:
        this.currentTheory()?.revisions.length === 1 ? 'Working theory saved' : 'Theory revised',
      title: 'Your earlier thinking remains in theory history',
    });
  }

  async openFinalInvestigation(): Promise<void> {
    if (!this.finalReady()) {
      this.lockedPhaseId.set('phase-showcase');
      this.drawer.set('lockedPhase');
      return;
    }
    await this.investigation.openFinalInvestigation();
    this.workspacePair.set('final-investigation');
    this.activePhaseId.set('phase-showcase');
    this.activeActivityId.set(undefined);
    this.drawer.set(undefined);
  }

  async saveFinalDraft(draft: FinalCaseDraft): Promise<void> {
    await this.investigation.saveFinalDraft(draft);
  }

  async submitFinalInvestigation(): Promise<void> {
    await this.investigation.submitFinalInvestigation();
    this.contextAlert.set({
      label: 'Investigation complete',
      title: 'Your final case has been recorded for teacher review',
    });
  }

  async launchActivity(activityId: string): Promise<void> {
    if (activityId === 'activity-evidence-locker') {
      this.selectWorkspace('evidence-analysis');
      return;
    }
    this.activeActivityId.set(activityId);
    this.drawer.set(undefined);
    const scanVialId = activityId.startsWith('activity-scan-')
      ? activityId.replace('activity-scan-', '')
      : undefined;
    if (scanVialId !== undefined) {
      const vial = this.vials.find((item) => item.vialId === scanVialId);
      if (vial !== undefined) {
        await this.selectVial(vial);
      }
      return;
    }
    await this.investigation.startActivity(activityId);
  }

  returnFromActivity(): void {
    this.activeActivityId.set(undefined);
    this.workspacePair.set('theory-investigate');
  }

  async selectVial(vial: MysteryVial): Promise<void> {
    this.selectedVial.set(vial);
    this.observation.set(this.investigation.legacyDrafts()[vial.vialId] ?? '');
    this.selectedTags.set([]);
    this.scanState.set('ready');
    await this.investigation.startScan(vial.vialId);
  }

  toggleTag(tag: string): void {
    this.selectedTags.update((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  }

  async captureScan(): Promise<void> {
    const vial = this.selectedVial();
    if (vial === undefined || this.scanState() === 'scanning') {
      return;
    }
    this.scanState.set('scanning');
    await new Promise((resolve) => setTimeout(resolve, 500));
    await this.investigation.captureScan(vial.vialId, this.observation(), this.selectedTags());
    this.scanState.set('captured');
    this.returnWithEvidence(`evidence-scan-${vial.vialId}`, `Vial ${vial.code} optical scan`);
  }

  async captureStationResult(capture: StationCapture): Promise<void> {
    await this.investigation.captureActivity(
      capture.activityId,
      capture.evidenceId,
      capture.result,
      capture.note,
    );
    this.returnWithEvidence(capture.evidenceId, evidenceTitle(capture.evidenceId));
  }

  private returnWithEvidence(evidenceId: string, title: string): void {
    this.activeActivityId.set(undefined);
    this.workspacePair.set('evidence-analysis');
    this.selectedEvidenceId.set(evidenceId);
    this.mobilePanel.set('left');
    this.contextAlert.set({ label: 'New evidence collected', title, evidenceId });
  }
}

function asClassification(value: string | undefined): AnalysisClassification | undefined {
  return value === 'supports' || value === 'uncertain' || value === 'contradicts'
    ? value
    : undefined;
}

function readableType(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
}

function studentEvidenceText(content: unknown): string {
  if (
    typeof content === 'object' &&
    content !== null &&
    'text' in content &&
    typeof content.text === 'string'
  ) {
    return content.text;
  }
  return typeof content === 'string' ? content : 'Student-created investigation record';
}

function evidenceTitle(evidenceId: string): string {
  return (
    mysteryEvidenceCatalog.find((evidence) => evidence.id === evidenceId)?.title ??
    'Investigation result'
  );
}
