import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { completedSampleProjectIds, loadCompletedSample } from './completed-sample.registry';
import { samplePersistence } from './completed-sample';
import {
  createInvestigationSample,
  investigationSampleEvidence,
} from '../../projects/completed-samples/investigation.sample-data';
import { createSimulationSample } from '../../projects/completed-samples/simulation.sample-data';
import {
  createExhibitSample,
  exhibitCurators,
} from '../../projects/completed-samples/exhibit.sample-data';
import { createBroadcastSample } from '../../projects/completed-samples/broadcast.sample-data';
import {
  createDebateSample,
  debateSampleConfig,
} from '../../projects/completed-samples/debate.sample-data';
import { createJourneySample } from '../../projects/completed-samples/journey.sample-data';
import { survivalIslandSampleStory } from '../../projects/completed-samples/narrative.sample-data';
import { survivalIslandStoryLabConfig } from '../../projects/survival-island-story-lab/survival-island.config';
import { frontierTradingConfig } from '../../projects/frontier-trading/frontier-trading.config';
import { ageOfExplorationJourneyConfig } from '../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import {
  ledgerReconciles,
  seasonResults,
  reportMissingRequirements,
} from '../../templates/simulation-decision/domain/simulation-decision.engine';
import { validateJourneyRecord } from '../../templates/journey-replay/core/journey-record-validation';
import { responseFingerprint } from '../../templates/journey-replay/domain/journey-tutor.contracts';
import { tallyVotes } from '../../templates/debate-studio/core/debate-studio-state';

describe('completed curriculum samples', () => {
  it('registers all eight projects and rejects an unknown capability', async () => {
    expect(completedSampleProjectIds).toHaveLength(8);
    await expect(loadCompletedSample('missing-project')).rejects.toThrow('not installed');
  });
  it('keeps the lab case open for inspection with a complete draft and contrary evidence', () => {
    const record = createInvestigationSample();
    expect(record.finalSubmission.status).toBe('open');
    expect(record.finalSubmission.argumentDraft.evidenceIds).toHaveLength(7);
    expect(record.hypotheses[0].revisions.map((revision) => revision.confidence)).toEqual([55, 90]);
    expect(investigationSampleEvidence.some((item) => item.classification === 'contradicts')).toBe(
      true,
    );
    expect(investigationSampleEvidence.some((item) => item.classification === 'uncertain')).toBe(
      true,
    );
    expect(investigationSampleEvidence.filter((item) => item.resultMatrix)).toHaveLength(3);
  });
  it('builds a reproducible season through real rules and reconciles its full ledger', () => {
    const state = createSimulationSample(),
      result = seasonResults(frontierTradingConfig, state);
    expect(createSimulationSample()).toEqual(state);
    expect(ledgerReconciles(state)).toBe(true);
    expect(reportMissingRequirements(frontierTradingConfig, state)).toEqual([]);
    expect(state.report.status).toBe('submitted');
    expect(state.routeHistory[0].dayArrived).toBeDefined();
    expect(state.inventory.every((item) => item.quantity === 0)).toBe(true);
    expect(state.eventHistory.map((event) => event.eventId)).toEqual(
      expect.arrayContaining(['event-river-crossing', 'event-supply-bundle']),
    );
    expect(result.netProfitCents).toBe(result.endingCashCents - result.startingCashCents);
    expect(result.netProfitCents).toBeLessThan(0);
    const actual =
      result.salesRevenueCents -
      result.goodsPurchasedCents -
      result.supplyCostsCents -
      result.eventExpensesCents +
      result.eventIncomeCents;
    expect(actual - state.routeHistory[0].forecast!.expectedTripProfitCents).toBe(
      -result.eventExpensesCents,
    );
  });
  it('opens four sourced museum wings with complete tours and no placeholder media', () => {
    const locations = createExhibitSample();
    expect(locations).toHaveLength(4);
    for (const location of locations) {
      expect(location.snapshot?.corridorPreview).toBeUndefined();
      expect(location.snapshot?.accessibleData.sections).toHaveLength(2);
      for (const section of location.snapshot!.accessibleData.sections)
        expect(section.sourceLinks?.length).toBeGreaterThan(0);
      expect(location.snapshot?.visitorSafeData).not.toHaveProperty('videoPresentation');
      expect(location.snapshot?.visitorSafeData).not.toHaveProperty('immersiveGallery');
      expect(
        exhibitCurators.find((curator) => curator.hangingId === location.hanging?.id)?.transcript
          .length,
      ).toBeGreaterThan(300);
    }
  });
  it('preserves a broadcast claim-source chain and the producer-requested revision', () => {
    const state = createBroadcastSample();
    expect(state.schedule[0].recordingPoster?.src).toBe(
      '/history-live/final-broadcast-video-stand-in.png',
    );
    expect(state.packageStatus).toBe('approved');
    expect(state.visualSequence).toHaveLength(3);
    expect(state.claims.every((claim) => claim.evidence?.length)).toBe(true);
    expect(state.reviewHistory?.map((review) => review.decision)).toEqual(['revise', 'approved']);
    expect(state.reflectionHistory).toHaveLength(2);
    expect(state.schedule[0].transcript).toBe(state.transcript);
    expect(state.schedule[0].recordingAssetId).toBeUndefined();
  });
  it('completes every Senate turn and category with balanced arguments and aggregate 58/42 persuasion', () => {
    const session = createDebateSample();
    expect(
      session.turns.every((turn) => turn.status === 'filed' && turn.evidenceIds.length >= 1),
    ).toBe(true);
    expect(
      session.turns
        .filter((turn) => turn.moderatorRequired)
        .every((turn) =>
          session.moderatorQueue.some(
            (prompt) => prompt.targetTurnId === turn.id && prompt.status === 'released',
          ),
        ),
    ).toBe(true);
    expect(Object.keys(session.categoryVotes)).toHaveLength(
      debateSampleConfig.voteCategories.length,
    );
    expect(tallyVotes(session.categoryVotes['final-verdict'])).toEqual({
      'republic-defenders': 7,
      'caesarian-reformers': 5,
    });
    for (const turn of session.turns)
      for (const annotation of turn.opponentAnnotations)
        expect(
          session.turns.find((source) => source.id === annotation.sourceTurnId)?.transcript,
        ).toBe(annotation.excerpt);
  });
  it('validates the full voyage, its geography, exact citations and bound scaffold revision', () => {
    const record = createJourneySample();
    expect(createJourneySample()).toEqual(record);
    const valid = validateJourneyRecord(ageOfExplorationJourneyConfig, record);
    expect(valid.completedSteps).toHaveLength(5);
    expect(valid.completionStatus).toBe('complete');
    expect(valid.replayTimeline.every((scene) => !scene.hidden)).toBe(true);
    const storm = record.completedSteps.find((step) => step.stepId === 'step-storm')!;
    expect(storm.resourceBefore).not.toEqual(storm.resourceAfter);
    expect(storm.responseRevisions).toHaveLength(1);
    const prior = storm.responseRevisions![0].response;
    const turn = prior.tutorTurns![0];
    expect(turn.responseFingerprint).toBe(
      responseFingerprint({
        responseMode: prior.responseMode,
        text: prior.text ?? '',
        transcript: prior.transcript ?? '',
        citations: prior.citations,
        prediction: prior.prediction,
      }),
    );
    expect(
      record.completedSteps[4].studentResponse.citations?.map((citation) => citation.paragraphId),
    ).toEqual(['account-ship', 'account-community']);
  });
  it('provides a complete Grade 5 branching story that protects Selkirk’s rescue', () => {
    expect(Object.keys(survivalIslandSampleStory.scenes)).toHaveLength(
      survivalIslandSampleStory.nodes!.length,
    );
    for (const node of survivalIslandSampleStory.nodes!) {
      const sampleScene = survivalIslandSampleStory.scenes[node.id];
      expect(sampleScene.text.split(/\s+/).length).toBeGreaterThan(35);
      expect(Object.keys(sampleScene.choiceLabels)).toHaveLength(node.choices.length);
    }
    const prose = Object.values(survivalIslandSampleStory.scenes)
      .map((sampleScene) => sampleScene.text)
      .join(' ');
    const words = prose.match(/[A-Za-zÀ-ÿ]+(?:['’][A-Za-zÀ-ÿ]+)?/g) ?? [];
    const sentences = prose.split(/[.!?]+/).filter((value) => value.trim());
    expect(words.length / sentences.length).toBeLessThan(15);
    for (const ending of survivalIslandSampleStory.nodes!.filter(
      (node) => node.kind === 'ending',
    )) {
      expect(survivalIslandSampleStory.scenes[ending.id].text).toMatch(/Selkirk/);
      expect(survivalIslandSampleStory.scenes[ending.id].text).toMatch(/Duke|rescue|safe aboard/);
    }
  });
  it('clones sample records and ignores every persistence mutation', () => {
    const source = { items: [1, 2] },
      adapter = samplePersistence(source),
      copy = adapter.load();
    copy.items.push(3);
    adapter.save();
    adapter.clear();
    expect(adapter.load()).toEqual({ items: [1, 2] });
    expect(source).toEqual({ items: [1, 2] });
  });
  for (const projectId of completedSampleProjectIds) {
    it('renders the native completed view without browser persistence: ' + projectId, async () => {
      const sample = await loadCompletedSample(projectId);
      TestBed.configureTestingModule({
        imports: [sample.component],
        providers: [provideRouter([]), ...sample.providers],
      });
      const storageRead = vi.spyOn(Storage.prototype, 'getItem');
      const storageWrite = vi.spyOn(Storage.prototype, 'setItem');
      const fixture = TestBed.createComponent(sample.component);
      for (const [key, value] of Object.entries(sample.inputs ?? {}))
        fixture.componentRef.setInput(key, value);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent.trim().length).toBeGreaterThan(200);
      expect(
        fixture.nativeElement.querySelectorAll('textarea:not([readonly]),input:not([disabled])'),
      ).toHaveLength(0);
      expect(storageRead).not.toHaveBeenCalled();
      expect(storageWrite).not.toHaveBeenCalled();
      fixture.destroy();
      TestBed.resetTestingModule();
      vi.restoreAllMocks();
    });
  }
});
