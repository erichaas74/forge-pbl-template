import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  OnDestroy,
  signal,
} from '@angular/core';

import { assertResponse, hasResponse } from '../core/journey-replay.engine';
import { JourneyReplayRuntimeService } from '../runtime/journey-replay-runtime.service';
import type { JourneyPlanningTargetDefinition } from '../domain/journey-replay.models';

@Component({
  selector: 'app-journey-decision-panel',
  templateUrl: './journey-decision-panel.component.html',
  styleUrl: './journey-decision-panel.component.scss',
})
export class JourneyDecisionPanelComponent implements OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  readonly runtime = inject(JourneyReplayRuntimeService);
  readonly evidence = computed(() => {
    const ids = this.runtime.choice()?.evidenceIds ?? [];
    return this.runtime.config.evidence.filter((item) => ids.includes(item.id));
  });
  readonly recording = this.runtime.recording;
  readonly workStep = signal(0);
  readonly completionHint = computed(() => {
    if (!this.runtime.ready()) return 'Wait for the journey to finish connecting before recording.';
    if (this.runtime.mediaBusy()) return 'Stop the recording and wait for audio to save.';
    const choice = this.runtime.choice();
    if (!choice) return 'Choose a mission first.';
    try {
      assertResponse(this.runtime.config, choice, this.runtime.state().responseDraft);
      return 'Your explanation and source connection are ready to record.';
    } catch (error) {
      const code = error instanceof Error ? error.message : '';
      if (code === 'PREDICTION_REQUIRED') return 'Add your prediction before recording.';
      if (code === 'CITATION_REQUIRED')
        return 'Add an explained source paragraph in Explain and cite.';
      if (code === 'CITATION_INVALID')
        return 'Check the cited paragraph and explain its relevance in at least three words and twelve characters.';
      if (code === 'PLANNING_TARGET_REQUIRED') return 'Choose a map option before recording.';
      if (code === 'PLANNING_TEXT_REQUIRED')
        return 'Write a specific sponsor plan before sending it.';
      if (code === 'PLANNING_SUBMISSION_REQUIRED')
        return 'Confirm the mission plan before continuing.';
      return 'Write an explanation or transcript of at least three words and twelve characters, or attach your recorded answer.';
    }
  });
  readonly workSteps = ['Choose', 'Read', 'Predict', 'Explain', 'Record'];
  goToWorkStep(step: number): void {
    if (!this.canVisitWorkStep(step)) return;
    this.workStep.set(step);
    afterNextRender(
      () => {
        const panel = this.element.nativeElement.querySelector<HTMLElement>('.step-body');
        if (panel) {
          panel.scrollTop = 0;
          panel.focus({ preventScroll: true });
        }
      },
      { injector: this.injector },
    );
  }
  async recordChapter(): Promise<void> {
    await this.runtime.completeCurrentStep();
    if (!this.runtime.choice()) this.goToWorkStep(0);
  }
  readonly routeOptions = computed(
    () =>
      this.runtime
        .step()
        ?.choices.map((choice) => ({
          choice,
          route: this.runtime.config.map.routes.find((route) => route.id === choice.routeId),
        }))
        .filter((item) => item.route) ?? [],
  );
  readonly inspectedPlanningTargetId = signal<string | undefined>(undefined);
  readonly planning = computed(() => this.runtime.choice()?.planning);
  readonly inspectedPlanningTarget = computed<JourneyPlanningTargetDefinition | undefined>(() => {
    const id =
      this.inspectedPlanningTargetId() ?? this.runtime.state().responseDraft.planningTargetId;
    return this.planning()?.targets.find((target) => target.id === id);
  });
  readonly planningRoute = computed(() => {
    const routeId = this.inspectedPlanningTarget()?.routeId;
    return this.runtime.config.map.routes.find((route) => route.id === routeId);
  });
  readonly selectedPlanningTarget = computed(() =>
    this.planning()?.targets.find(
      (target) => target.id === this.runtime.state().responseDraft.planningTargetId,
    ),
  );
  readonly planningReady = computed(() =>
    Boolean(
      this.runtime.choice()?.planning && this.runtime.state().responseDraft.planningSubmitted,
    ),
  );
  readonly canSubmitPlanning = computed(() => {
    const draft = this.runtime.state().responseDraft;
    if (!draft.planningTargetId) return false;
    return (
      !this.planning()?.planPrompt ||
      hasResponse({ responseMode: 'text', text: draft.planningText ?? '', transcript: '' })
    );
  });
  readonly citationEvidence = computed(() =>
    this.evidence().find((item) => item.id === this.citationSource()),
  );
  readonly citationParagraphs = computed(() => this.citationEvidence()?.paragraphs ?? []);
  readonly citationSource = signal('');
  readonly citationParagraph = signal('');
  readonly citationExplanation = signal('');
  private destroyed = false;
  readonly recordingSupported =
    typeof navigator !== 'undefined' &&
    navigator.mediaDevices !== undefined &&
    typeof MediaRecorder !== 'undefined';
  private mediaRecorder?: MediaRecorder;
  private mediaStream?: MediaStream;
  private chunks: Blob[] = [];

  choose(id: string): void {
    this.runtime.selectChoice(id);
    this.inspectedPlanningTargetId.set(this.runtime.state().responseDraft.planningTargetId);
    const firstSource = this.runtime.choice()?.evidenceIds[0] ?? '';
    this.sourceChanged(firstSource);
    this.goToWorkStep(0);
  }

  canVisitWorkStep(step: number): boolean {
    if (step === 0) return true;
    const choice = this.runtime.choice();
    return Boolean(choice && (!choice.planning || this.planningReady()));
  }

  inspectPlanningTarget(id: string): void {
    if (!this.planning()?.targets.some((target) => target.id === id)) return;
    this.inspectedPlanningTargetId.set(id);
    this.goToWorkStep(0);
  }

  selectPlanningTarget(id: string): void {
    const planning = this.planning();
    if (!planning?.targets.some((target) => target.id === id)) return;
    this.inspectedPlanningTargetId.set(id);
    this.runtime.setPlanningTarget(id);
    if (!planning.planPrompt) this.runtime.submitPlanning();
  }

  planningTextInput(event: Event): void {
    this.runtime.setPlanningText((event.target as HTMLTextAreaElement).value);
  }

  sendPlanning(): void {
    const draft = this.runtime.state().responseDraft;
    if (!draft.planningTargetId) return;
    if (
      this.planning()?.planPrompt &&
      !hasResponse({ responseMode: 'text', text: draft.planningText ?? '', transcript: '' })
    )
      return;
    this.runtime.submitPlanning();
  }
  addCitation(): void {
    const evidenceId = this.citationSource();
    const paragraphId = this.citationParagraph();
    const explanation = this.citationExplanation().trim();
    if (!this.citationReady()) return;
    const prior = this.runtime.state().responseDraft.citations ?? [];
    this.runtime.setCitations([
      ...prior.filter(
        (citation) => citation.evidenceId !== evidenceId || citation.paragraphId !== paragraphId,
      ),
      { evidenceId, paragraphId, explanation },
    ]);
    this.citationExplanation.set('');
    this.runtime.flushDraft();
  }
  removeCitation(index: number): void {
    this.runtime.setCitations(
      this.runtime.state().responseDraft.citations?.filter((_, i) => i !== index) ?? [],
    );
    this.runtime.flushDraft();
  }
  sourceChanged(id: string): void {
    this.citationSource.set(id);
    this.citationParagraph.set(
      this.evidence().find((item) => item.id === id)?.paragraphs?.[0]?.id ?? '',
    );
  }
  evidenceToggled(evidenceId: string, event: Event): void {
    if ((event.target as HTMLDetailsElement).open) this.runtime.markEvidenceViewed(evidenceId);
  }
  evidenceTitle(evidenceId: string): string {
    return this.runtime.config.evidence.find((item) => item.id === evidenceId)?.title ?? evidenceId;
  }
  paragraphLabel(evidenceId: string, paragraphId: string): string {
    const source = this.runtime.config.evidence.find((item) => item.id === evidenceId);
    const index = source?.paragraphs?.findIndex((paragraph) => paragraph.id === paragraphId) ?? -1;
    return index >= 0 ? `paragraph ${index + 1}` : paragraphId;
  }
  citationReady(): boolean {
    return Boolean(
      this.citationSource() &&
      this.citationParagraph() &&
      hasResponse({ responseMode: 'text', text: this.citationExplanation(), transcript: '' }),
    );
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.mediaRecorder?.state === 'recording') this.mediaRecorder.stop();
    this.stopTracks();
    this.recording.set(false);
  }

  responseInput(event: Event): void {
    this.runtime.setResponseText((event.target as HTMLTextAreaElement).value);
  }

  transcriptInput(event: Event): void {
    this.runtime.setTranscript((event.target as HTMLTextAreaElement).value);
  }

  async audioFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file !== undefined) await this.runtime.attachAudio(file, file.name);
    input.value = '';
  }

  async startRecording(): Promise<void> {
    if (!this.recordingSupported || this.runtime.mediaBusy()) return;
    this.recording.set(true);
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (this.destroyed) {
        this.stopTracks();
        this.recording.set(false);
        return;
      }
      this.chunks = [];
      this.mediaRecorder = new MediaRecorder(this.mediaStream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) this.chunks.push(event.data);
      };
      this.mediaRecorder.onstop = async () => {
        const type = this.mediaRecorder?.mimeType || 'audio/webm';
        const blob = new Blob(this.chunks, { type });
        this.stopTracks();
        this.recording.set(false);
        if (!this.destroyed && blob.size > 0) await this.runtime.attachAudio(blob);
      };
      this.mediaRecorder.start();
      this.recording.set(true);
    } catch {
      this.stopTracks();
      this.recording.set(false);
      this.runtime.error.set(
        'Microphone access was unavailable. Attach an audio file or use text.',
      );
    }
  }

  stopRecording(): void {
    if (this.mediaRecorder?.state === 'recording') this.mediaRecorder.stop();
  }

  private stopTracks(): void {
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.mediaStream = undefined;
  }
}
