import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MysteryInvestigationService } from '../../projects/mystery-substance/mystery-investigation.service';
import {
  mysteryEvidenceCatalog,
  mysteryInvestigationActivities,
  mysteryInvestigationPhases,
  mysteryObservationTags,
  mysteryVials,
  type MysteryVial,
} from '../../projects/mystery-substance/mystery-substance.package';
import { ConservationChamberComponent } from '../../projects/mystery-substance/conservation-chamber.component';
import { EmergencyResponseComponent } from '../../projects/mystery-substance/emergency-response.component';
import { PropertiesLabComponent } from '../../projects/mystery-substance/properties-lab.component';
import { ReactionBenchComponent } from '../../projects/mystery-substance/reaction-bench.component';
import {
  RestorationWorkspaceComponent,
  type StationCapture,
} from '../../projects/mystery-substance/station-workspaces';
import {
  physicalTests,
  reactionTests,
} from '../../projects/mystery-substance/mystery-science.config';
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
  InvestigationEvidenceResultMatrix,
  InvestigationPhaseView,
  InvestigationQuestionItem,
  InvestigationWorkspacePair,
  StudentEvidenceDraft,
  TheoryDraft,
} from '../../templates/investigation/ui/investigation-ui.models';
import { InvestigationWorkingTheoryComponent } from '../../templates/investigation/ui/working-theory.component';

type UtilityDrawer = 'mission' | 'notebook' | 'help' | 'route' | 'lockedPhase' | undefined;

/**
 * TESTING OVERRIDE — set back to `false` before this goes near a classroom.
 *
 * Opens the final investigation without completing the lab, so the final case
 * and showcase can be worked on without replaying nine activities first. While
 * it is on, the route guide says so in the drawer rather than hiding it.
 */
const finalUnlockedForTesting = true;

/** One stop on the path through the lab, and what actually closes it. */
interface RouteStep {
  id: string;
  number: string;
  title: string;
  where: string;
  todo: string;
  completes: string;
  status: 'complete' | 'current' | 'todo';
}

/** What each phase asks for, in the words of the thing the student clicks. */
const routeGuide: Readonly<Record<string, { where: string; todo: string; completes: string }>> = {
  'phase-inventory': {
    where: 'Specimen Scanner',
    todo: 'Open each of the four sealed vials in turn and describe what the optical channel shows.',
    completes:
      'All four scans captured. Each needs the observation box filled in — tags alone will not file it.',
  },
  'phase-evidence': {
    where: 'Evidence Locker',
    todo: 'Open the recovered records and sort each into supports, uncertain, or contradicts.',
    completes: 'The locker activity is marked complete once you have reviewed the case files.',
  },
  'phase-properties': {
    where: 'Properties Lab',
    todo: 'Run the magnifier, water, probe and scanner trials across all four vials under equal conditions.',
    completes:
      'One captured trial files the activity — but the 4 × 4 matrix only fills in as you run more.',
  },
  'phase-reactions': {
    where: 'Reaction Bench',
    todo: 'Drag a vial onto the bench, measure and weigh, then run Solution A and Indicator B in a sealed vessel.',
    completes: 'A finished screening with your own observation typed in.',
  },
  'phase-conservation': {
    where: 'Matter Tracker',
    todo: 'Run the sealed chamber and the open chamber, and watch the particle count against the balance.',
    completes:
      'A settled run plus a written observation of what happened to the particles and the mass.',
  },
  'phase-restore': {
    where: 'Shelf Restoration',
    todo: 'Give every vial a label, a shelf position, a handling plan and the reasoning behind it.',
    completes: 'A captured case draft. Each label may only be used once across the four vials.',
  },
  'phase-emergency': {
    where: 'Bay 3 Response',
    todo: 'Spend the 25-minute clock on the tests that can separate the two candidates, then file your call.',
    completes: 'A call filed with the marshal and the incident record captured.',
  },
  'phase-showcase': {
    where: 'Final case',
    todo: 'Build the claim, the evidence trail, the reasoning and the shelf plan.',
    completes: 'Submitting the final investigation for teacher review.',
  },
};

interface ContextAlert {
  label: string;
  title: string;
  evidenceId?: string;
}

/** One physical place in the lab that the student can walk into from the bench rail. */
export interface LabStation {
  id: string;
  name: string;
  instrument: string;
  purpose: string;
  key: string;
  trials: number;
  done: number;
  total: number;
  complete: boolean;
}

const stationCatalogue = [
  {
    key: 'scanner',
    activityId: 'activity-scan-vial-a',
    name: 'Specimen Scanner',
    instrument: '6x optical channel',
    purpose: 'Look at each sealed vial and record what you can actually see.',
  },
  {
    key: 'properties',
    activityId: 'activity-property-comparison',
    name: 'Properties Lab',
    instrument: 'Magnifier / water / probe / scanner',
    purpose: 'Test all four vials under equal conditions and fill the property grid.',
  },
  {
    key: 'reaction',
    activityId: 'activity-reaction-comparison',
    name: 'Reaction Bench',
    instrument: 'Solution A / Indicator B',
    purpose: 'Run two vials side by side in sealed vessels and compare the change.',
  },
  {
    key: 'conservation',
    activityId: 'activity-conservation-model',
    name: 'Matter Tracker',
    instrument: 'Balance and particle counter',
    purpose: 'Weigh a sealed and an open chamber to find where the mass went.',
  },
  {
    key: 'restoration',
    activityId: 'activity-shelf-restoration',
    name: 'Shelf Restoration',
    instrument: 'Label clips and shelf zones',
    purpose: 'Commit a label, a position, and a handling plan for every vial.',
  },
  {
    key: 'emergency',
    activityId: 'activity-emergency-response',
    name: 'Bay 3 Response',
    instrument: 'Incident clock and marshal radio',
    purpose: 'Identify an unlabeled shipment against the clock before a crew enters a spill.',
  },
] as const;

const scanActivityIds = [
  'activity-scan-vial-a',
  'activity-scan-vial-b',
  'activity-scan-vial-c',
  'activity-scan-vial-d',
] as const;

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
  'activity-emergency-response',
] as const;

@Component({
  selector: 'app-mystery-investigation',
  imports: [
    FormsModule,
    RouterLink,
    InvestigationAnalysisPanelComponent,
    InvestigationEvidenceLockerComponent,
    InvestigationFinalCaseComponent,
    InvestigationOptionsPanelComponent,
    InvestigationWorkingTheoryComponent,
    PropertiesLabComponent,
    ReactionBenchComponent,
    ConservationChamberComponent,
    RestorationWorkspaceComponent,
    EmergencyResponseComponent,
  ],
  templateUrl: './mystery-investigation.component.html',
  styleUrls: ['./mystery-investigation.component.scss', './case-wall.scss'],
})
export class MysteryInvestigationComponent {
  readonly investigation = inject(MysteryInvestigationService);
  readonly observationTags = mysteryObservationTags;
  readonly vials = mysteryVials;

  readonly workspacePair = signal<InvestigationWorkspacePair>('bench');
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
          resultMatrix: evidenceResultMatrix(definition.id, runtime.activities),
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

  /** The lab stations shown on the bench rail and the bench landing view. */
  readonly labStations = computed<readonly LabStation[]>(() => {
    const activities = this.investigation.snapshot()?.activities ?? {};
    return stationCatalogue.map((station) => {
      const isScanner = station.activityId === scanActivityIds[0];
      const memberIds = isScanner ? scanActivityIds : [station.activityId];
      const done = memberIds.filter((id) => activities[id]?.status === 'complete').length;
      const trials = memberIds.reduce(
        (total, id) => total + (activities[id]?.resultHistory?.length ?? 0),
        0,
      );
      const nextId = isScanner
        ? (scanActivityIds.find((id) => activities[id]?.status !== 'complete') ??
          scanActivityIds[0])
        : station.activityId;
      return {
        id: nextId,
        name: station.name,
        instrument: station.instrument,
        purpose: station.purpose,
        key: station.key,
        trials,
        done,
        total: memberIds.length,
        complete: done === memberIds.length,
      };
    });
  });

  /** Evidence the student can actually open, newest-looking first. */
  readonly benchEvidence = computed<readonly InvestigationEvidenceItem[]>(() =>
    this.evidence().filter((item) => item.status !== 'locked'),
  );

  readonly newEvidenceCount = computed(
    () =>
      this.evidence().filter((item) => item.status === 'available' || item.status === 'unopened')
        .length,
  );

  readonly phasesComplete = computed(
    () => this.phases().filter((phase) => phase.status === 'complete').length,
  );

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

  readonly finalReady = computed(
    () => finalUnlockedForTesting || this.finalReadinessMissing().length === 0,
  );

  /** True while the final case is open only because the override is on. */
  readonly finalUnlockedForTesting = finalUnlockedForTesting;
  readonly testingOverrideActive = computed(
    () => finalUnlockedForTesting && this.finalReadinessMissing().length > 0,
  );

  /**
   * The path through the lab, in order, with live status. Built from the same
   * phase and activity state the rest of the shell reads, so it can never drift
   * from what the workspace actually requires.
   */
  readonly labRoute = computed<readonly RouteStep[]>(() =>
    this.phases().map((phase) => {
      const guide = routeGuide[phase.id];
      return {
        id: phase.id,
        number: phase.number,
        title: phase.title,
        where: guide?.where ?? 'Lab bench',
        todo: guide?.todo ?? phase.instruction,
        completes: guide?.completes ?? 'Capture a result from this station.',
        status:
          phase.status === 'complete'
            ? 'complete'
            : phase.id === this.activePhaseId()
              ? 'current'
              : 'todo',
      };
    }),
  );

  /** The first thing still standing between the student and the final case. */
  readonly nextRouteStep = computed(() =>
    this.labRoute().find((step) => step.status !== 'complete'),
  );

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
      case 'bench':
        return 'Walk into a lab station to run a test, or open a record in the evidence rail. Every test you run adds a record you can reason with.';
      case 'evidence-analysis':
        return 'Open a piece of evidence, record what you notice, then decide whether it supports, challenges, or leaves your explanation uncertain.';
      case 'analysis-theory':
        return 'Use evidence from every zone. Strong theories explain support and address evidence that does not fit.';
      case 'theory-investigate':
        return 'Choose a test that can answer an important question, then use the new evidence to strengthen or revise your working theory.';
      case 'final-investigation':
        return 'Build the final case from evidence and theory already in your Investigation Record.';
    }
  });

  constructor() {
    void this.investigation.initialize();
  }

  openBench(): void {
    this.workspacePair.set('bench');
    this.activeActivityId.set(undefined);
    this.drawer.set(undefined);
  }

  async launchStation(station: LabStation): Promise<void> {
    await this.launchActivity(station.id);
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
    this.openBench();
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
    this.noteEvidence(`evidence-scan-${vial.vialId}`, `Vial ${vial.code} optical scan`);
  }

  async captureStationResult(capture: StationCapture): Promise<void> {
    await this.investigation.captureActivity(
      capture.activityId,
      capture.evidenceId,
      capture.result,
      capture.note,
    );
    this.noteEvidence(capture.evidenceId, evidenceTitle(capture.evidenceId));
  }

  /**
   * Records the new evidence without closing the station. Students stay at the
   * bench so they can run the next trial; the rail and the alert show what they
   * just captured.
   */
  private noteEvidence(evidenceId: string, title: string): void {
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

function evidenceResultMatrix(
  evidenceId: string,
  activities: Readonly<
    Record<
      string,
      {
        lastResult?: { outputs?: Record<string, unknown> };
        resultHistory?: readonly { outputs?: Record<string, unknown> }[];
      }
    >
  >,
): InvestigationEvidenceResultMatrix | undefined {
  if (evidenceId === 'evidence-property-trials') {
    const activity = activities['activity-property-comparison'];
    const results = activity?.resultHistory ?? (activity?.lastResult ? [activity.lastResult] : []);
    const cells = new Map<string, string>();
    for (const result of results) {
      const trial = asRecord(result.outputs);
      const inputs = asRecord(trial?.['inputs']);
      const outputs = asRecord(trial?.['outputs']);
      const vialId = stringValue(inputs?.['specimen']);
      const testId = stringValue(inputs?.['test']);
      if (vialId !== undefined && testId !== undefined && outputs !== undefined) {
        cells.set(`${testId}::${vialId}`, summarizeResult(outputs));
      }
    }
    return resultMatrix('Four-vial physical-property record', physicalTests, cells);
  }

  if (evidenceId === 'evidence-reaction-trials') {
    const activity = activities['activity-reaction-comparison'];
    const results = activity?.resultHistory ?? (activity?.lastResult ? [activity.lastResult] : []);
    const cells = new Map<string, string>();
    for (const result of results) {
      const trial = asRecord(result.outputs);
      // One sealed-vessel screening files both stages for a single vial.
      const stages = trial?.['stages'];
      const trialVialId = stringValue(trial?.['vialId']);
      if (Array.isArray(stages)) {
        for (const stage of stages) {
          const record = asRecord(stage);
          const testId = stringValue(record?.['reagent']);
          const vialId = stringValue(record?.['vialId']) ?? trialVialId;
          const output = asRecord(record?.['output']);
          if (testId !== undefined && vialId !== undefined && output !== undefined) {
            cells.set(`${testId}::${vialId}`, summarizeResult(output));
          }
        }
        continue;
      }
      // Older records captured one reagent across a pair of vessels.
      const testId = stringValue(trial?.['reagent']);
      const comparisons = trial?.['comparisons'];
      if (testId === undefined || !Array.isArray(comparisons)) {
        continue;
      }
      for (const comparison of comparisons) {
        const record = asRecord(comparison);
        const vialId = stringValue(record?.['vialId']);
        const output = asRecord(record?.['output']);
        if (vialId !== undefined && output !== undefined) {
          cells.set(`${testId}::${vialId}`, summarizeResult(output));
        }
      }
    }
    return resultMatrix('Four-vial chemical-screening record', reactionTests, cells);
  }

  return undefined;
}

function resultMatrix(
  title: string,
  tests: readonly { id: string; title: string }[],
  values: ReadonlyMap<string, string>,
): InvestigationEvidenceResultMatrix {
  const vialIds = mysteryVials.map((vial) => vial.vialId);
  return {
    title,
    columnLabels: mysteryVials.map((vial) => `Vial ${vial.code}`),
    rows: tests.map((test) => ({
      id: test.id,
      label: test.title,
      cells: vialIds.map((vialId) => values.get(`${test.id}::${vialId}`)),
    })),
  };
}

function summarizeResult(result: Readonly<Record<string, unknown>>): string {
  return Object.entries(result)
    .map(([key, value]) => `${readableResultLabel(key)}: ${String(value)}`)
    .join(' · ');
}

function readableResultLabel(value: string): string {
  const spaced = value.replace(/([a-z])([A-Z])/g, '$1 $2');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}
